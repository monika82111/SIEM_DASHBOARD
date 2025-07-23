import React from "react";
import { Table, Select, Input, Tag, Card, Pagination, Space } from "antd";
import moment from "moment";

const { Option } = Select;

const eventTypeColors = {
  LoginFailure: "red",
  LoginSuccess: "green",
  DataAccess: "blue",
  SecurityAlert: "gold",
  NetworkAnomaly: "purple",
};

const LogTable = ({
  logs,
  loading,
  currentPage,
  totalPages,
  filters,
  eventTypes,
  onFilterChange,
  onPageChange,
}) => {
  const handleFilterChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => (
        <>
          <div>{moment(timestamp).format("MMM DD, HH:mm:ss")}</div>
          <div style={{ color: "#888", fontSize: 12 }}>
            {moment(timestamp).fromNow()}
          </div>
        </>
      ),
    },
    {
      title: "Event Type",
      dataIndex: "event_type",
      key: "event_type",
      render: (event_type) => (
        <Tag
          color={eventTypeColors[event_type] || "default"}
          style={{ fontWeight: 500 }}
        >
          {event_type}
        </Tag>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Source IP",
      dataIndex: "source_ip",
      key: "source_ip",
      render: (ip) => <span style={{ fontFamily: "monospace" }}>{ip}</span>,
    },
    {
      title: "Destination IP",
      dataIndex: "destination_ip",
      key: "destination_ip",
      render: (ip) => <span style={{ fontFamily: "monospace" }}>{ip}</span>,
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Select
          allowClear
          placeholder="Event Type"
          value={filters.event_type || undefined}
          onChange={(value) => handleFilterChange("event_type", value)}
          style={{ minWidth: 160 }}
        >
          <Option value="">All Types</Option>
          {eventTypes.map((type) => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Filter by username..."
          value={filters.username}
          onChange={(e) => handleFilterChange("username", e.target.value)}
          style={{ minWidth: 180 }}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={logs}
        loading={loading}
        rowKey={(record, idx) => idx}
        pagination={false}
        bordered
        size="middle"
        style={{ background: "#fff", borderRadius: 8 }}
      />
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 , marginBottom: 16 }}
      >
        <Pagination
          current={currentPage}
          total={totalPages * 10}
          pageSize={10}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      </div>
    </>
  );
};

export default LogTable;
