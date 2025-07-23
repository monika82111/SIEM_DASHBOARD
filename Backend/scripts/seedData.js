const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/siem_dashboard", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  event_type: { type: String, required: true },
  username: { type: String, required: true },
  source_ip: { type: String, required: true },
  destination_ip: { type: String, required: true },
  details: { type: String, required: true },
});

const Log = mongoose.model("Log", logSchema);

// Generate sample data if JSONL file doesn't exist
const generateSampleData = () => {
  const eventTypes = [
    "LoginFailure",
    "LoginSuccess",
    "DataAccess",
    "SecurityAlert",
    "NetworkAnomaly",
  ];
  const users = ["alice", "bob", "charlie", "david", "eve"];
  const sourceIPs = ["192.168.1.10", "192.168.1.11", "10.0.0.1", "172.16.0.5"];
  const destIPs = ["10.0.0.5", "192.168.2.1", "172.16.1.10", "10.1.1.1"];

  const logs = [];

  for (let i = 0; i < 1000; i++) {
    const randomHoursAgo = Math.floor(Math.random() * 168); // Last 7 days
    const timestamp = new Date(Date.now() - randomHoursAgo * 60 * 60 * 1000);

    logs.push({
      timestamp,
      event_type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      username: users[Math.floor(Math.random() * users.length)],
      source_ip: sourceIPs[Math.floor(Math.random() * sourceIPs.length)],
      destination_ip: destIPs[Math.floor(Math.random() * destIPs.length)],
      details: "Synthetic log entry for simulation purposes.",
    });
  }

  return logs;
};

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Log.deleteMany({});
    console.log("Cleared existing logs");

const jsonPath = path.join(__dirname, "..", "siem_logs.json");
let logs;

if (fs.existsSync(jsonPath)) {
  // Read from JSON array file
  const fileContent = fs.readFileSync(jsonPath, "utf8");
  logs = JSON.parse(fileContent).map((log) => ({
    ...log,
    timestamp: new Date(log.timestamp),
  }));
  console.log(`Loaded ${logs.length} logs from JSON file`);
} else {
  // Generate sample data
  logs = generateSampleData();
  console.log(`Generated ${logs.length} sample logs`);
}

    // Insert logs
    await Log.insertMany(logs);
    console.log("Database seeded successfully");

    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
