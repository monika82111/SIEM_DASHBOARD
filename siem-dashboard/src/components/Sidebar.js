import React from "react";
import { Layout, Menu } from "antd";
import {
  SecurityScanOutlined,
  AlertOutlined,
  BarChartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const navItems = [
  { key: "dashboard", name: "Dashboard", icon: <SecurityScanOutlined /> },
  { key: "logs", name: "Logs", icon: <FileTextOutlined /> },
  { key: "alerts", name: "Alerts", icon: <AlertOutlined /> },
  { key: "reports", name: "Reports", icon: <BarChartOutlined /> },
];

const Sidebar = ({ selectedKey, onMenuSelect }) => {
  return (
    <Sider
      width={220}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #1e3a8a, #111827)",
        color: "#fff",
        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
        border: "1px solid white",
        position: "fixed",
      }}
    >
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 22,
          letterSpacing: 1,
          color: "#fff",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: 8,
        }}
      >
        <SecurityScanOutlined
          style={{ fontSize: 28, color: "#1890ff", marginRight: 10 }}
        />
        SIEM
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        style={{
          background: "transparent",
          border: "none",
          color: "#fff",
          fontWeight: 500,
        }}
        onClick={({ key }) => onMenuSelect && onMenuSelect(key)}
      >
        {navItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={item.icon}
            style={{ borderRadius: 6, margin: "8px 12px" }}
          >
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
          color: "rgba(255,255,255,0.5)",
          fontSize: 12,
          padding: 12,
        }}
      >
        &copy; {new Date().getFullYear()} SIEM Dashboard
      </div>
    </Sider>
  );
};

export default Sidebar;
