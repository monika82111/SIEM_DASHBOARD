import React, { useState } from "react";
import { Layout, Typography, Badge, Avatar, Dropdown, Menu, Space } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const userMenu = (
  <Menu>
    <Menu.Item key="profile">Profile</Menu.Item>
    <Menu.Item key="settings">Settings</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">Logout</Menu.Item>
  </Menu>
);

const Header = () => {
  return (
    <AntHeader
      style={{
        background: "#fff",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 72,
        borderBottom: "1px solid #e8e8e8",
        width: "100%",
    
      }}
    >
      <Space align="center">
        <Typography.Title
          level={4}
          style={{ margin: 0, color: "#1e293b", fontWeight: 700 }}
        >
          Security Operations Center
        </Typography.Title>
        <Badge color="green" text="Online" style={{ marginLeft: 12 }} />
      </Space>
      <Space align="center" size={32}>
        <Typography.Text type="secondary" style={{ fontSize: 14 }}>
          Last updated: {new Date().toLocaleString()}
        </Typography.Text>
        <Dropdown
          overlay={userMenu}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Space style={{ cursor: "pointer" }}>
            <Avatar
              style={{ backgroundColor: "#1677ff" }}
              icon={<UserOutlined />}
            />
            <Typography.Text strong style={{ color: "#1e293b" }}>
              Admin
            </Typography.Text>
            <DownOutlined style={{ color: "#888" }} />
          </Space>
        </Dropdown>
      </Space>
    </AntHeader>
  );
};

export default Header;
