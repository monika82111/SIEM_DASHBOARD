import React from "react";
import { Card, Row, Col, Typography } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = ({ eventCounts, eventsByHour }) => {
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
      {/* Bar Chart - Events by Type */}
      <Col xs={24} lg={12}>
        {/* <Card style={{ borderRadius: 12, boxShadow: "0 2px 8px #f0f1f2" }}> */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventCounts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="event_type"
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
        <Typography.Title
          level={4}
          style={{
            textAlign: "center",
            // fontWeight: "bold",
            marginBottom: 24,
          }}
        >
          Events by Type
        </Typography.Title>
        {/* </Card> */}
      </Col>
      {/* Line Chart - Events Over Time */}
      <Col xs={24} lg={12}>
        {/* <Card
          bordered={false}
          style={{ borderRadius: 12, boxShadow: "0 2px 8px #f0f1f2" }}
        > */}

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={eventsByHour}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <Typography.Title
          level={4}
          style={{
            textAlign: "center",
            // fontWeight: "bold",
            marginBottom: 24,
          }}
        >
          Events Over Time (Last 24 Hours)
        </Typography.Title>
        {/* </Card> */}
      </Col>
    </Row>
  );
};

export default Dashboard;
