const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/siem_dashboard",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Log Schema
const logSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  event_type: { type: String, required: true },
  username: { type: String, required: true },
  source_ip: { type: String, required: true },
  destination_ip: { type: String, required: true },
  details: { type: String, required: true },
});

const Log = mongoose.model("Log", logSchema);

// API Routes

// Get paginated logs
app.get("/api/logs", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.event_type) {
      filter.event_type = req.query.event_type;
    }
    if (req.query.username) {
      filter.username = { $regex: req.query.username, $options: "i" };
    }

    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Log.countDocuments(filter);

    res.json({
      logs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalLogs: total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get event count for bar chart
app.get("/api/event-count", async (req, res) => {
  try {
    const eventCounts = await Log.aggregate([
      {
        $group: {
          _id: "$event_type",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    res.json(
      eventCounts.map((item) => ({
        event_type: item._id,
        count: item.count,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get events by hour for line chart
app.get("/api/events-by-hour", async (req, res) => {
  try {
    const eventsByHour = await Log.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" },
            hour: { $hour: "$timestamp" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.hour": 1 },
      },
      {
        $limit: 24, // Last 24 hours
      },
    ]);

    const formattedData = eventsByHour.map((item) => ({
      hour: `${item._id.hour}:00`,
      date: `${item._id.year}-${item._id.month
        .toString()
        .padStart(2, "0")}-${item._id.day.toString().padStart(2, "0")}`,
      count: item.count,
    }));

    res.json(formattedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get unique event types for filter dropdown
app.get("/api/event-types", async (req, res) => {
  try {
    const eventTypes = await Log.distinct("event_type");
    res.json(eventTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
