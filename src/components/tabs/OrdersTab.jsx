import React, { useState, useEffect } from "react";
import GenericTab from "./GenericTab";
import "./products.css";
import "./table.css";

import axois from "../../utils/axoisConfig";

const OrdersTab = ({ searchTerm }) => {
  const [ownersData, setOwnersData] = useState({});

  useEffect(() => {
    const fetchOwners = async () => {
      try {
        const response = await axois.get(
          "https://milovetapi.onrender.com/api/owners"
        );
        const owners = response.data.data?.owners || response.data.data || [];

        const ownersMap = {};
        owners.forEach((owner) => {
          ownersMap[owner._id] = `${owner.firstName} ${owner.lastName}`;
        });

        setOwnersData(ownersMap);
      } catch (err) {
        console.error("Failed to fetch owners:", err);
      }
    };

    fetchOwners();
  }, []);

  const columns = [
    {
      key: "_id",
      header: "ID",
      render: (item) => <span className="truncate-id">{item._id}</span>,
    },
    {
      key: "ownerId",
      header: "Owner ID",
      render: (item) => item.ownerId || "Unknown Owner",
    },
    {
      key: "owner",
      header: "Owner Name",
      render: (item) => ownersData[item.ownerId] || "Unknown Owner",
    },
    {
      key: "items",
      header: "Items Count",
      render: (item) => item.items?.length || 0,
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      render: (item) => `$${item.totalAmount?.toFixed(2) || "0.00"}`,
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <span className={`status-badge ${item.status}`}>{item.status}</span>
      ),
    },
    { key: "address", header: "Address" },
    {
      key: "createdAt",
      header: "Created Time",
      render: (item) => new Date(item.createdAt).toLocaleString(),
    },
  ];

  return (
    <GenericTab
      endpoint="https://milovetapi.onrender.com/api/orders/"
      columns={columns}
      title="Orders"
      searchTerm={searchTerm}
      searchFields={["status", "address", "ownerID"]}
    />
  );
};

export default OrdersTab;
