import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layout, Typography } from "antd";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import LogTable from "./components/LogTable";
import "./App.css";

const { Sider, Header: AntHeader, Content } = Layout;

const App = () => {
  const [logs, setLogs] = useState([]);
  const [eventCounts, setEventCounts] = useState([]);
  const [eventsByHour, setEventsByHour] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    event_type: "",
    username: "",
  });
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchDashboardData();
    fetchEventTypes();
  }, []);

  useEffect(() => {
    if (selectedKey === "logs") {
      fetchLogs();
    }
  }, [currentPage, filters, selectedKey]);

  const fetchDashboardData = async () => {
    try {
      const [eventCountRes, eventsByHourRes] = await Promise.all([
        axios.get(`${API_BASE}/event-count`),
        axios.get(`${API_BASE}/events-by-hour`),
      ]);
      setEventCounts(eventCountRes.data);
      setEventsByHour(eventsByHourRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "20",
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
      });
      const response = await axios.get(`${API_BASE}/logs?${params}`);
      setLogs(response.data.logs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventTypes = async () => {
    try {
      const response = await axios.get(`${API_BASE}/event-types`);
      setEventTypes(response.data);
    } catch (error) {
      console.error("Error fetching event types:", error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleMenuSelect = (key) => {
    setSelectedKey(key);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f5f7fa"  }}>
      <Sider  style={{ background: "#1e293b" }}>
        <Sidebar selectedKey={selectedKey} onMenuSelect={handleMenuSelect} />
      </Sider>
      <Layout>
       <Header />
        <Content>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Typography.Title
              style={{ marginBottom: 50, color: "darkblue", fontWeight: 400  , textAlign: "center"}}
            >
              {selectedKey === "dashboard" && "Cybersecurity Dashboard"}
              {selectedKey === "logs" && "Logs"}
              {selectedKey === "alerts" && "Alerts"}
              {selectedKey === "reports" && "Reports"}
            </Typography.Title>
            {selectedKey === "dashboard" && (
              <Dashboard
                eventCounts={eventCounts}
                eventsByHour={eventsByHour}
              />
            )}
            {selectedKey === "logs" && (
                <LogTable
                  logs={logs}
                  loading={loading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  filters={filters}
                  eventTypes={eventTypes}
                  onFilterChange={handleFilterChange}
                  onPageChange={handlePageChange}
                />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
