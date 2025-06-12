import React, { useState } from "react";

import Sidebar from "../Sidebar/Sidebar";
import Content from "../Content/Content";
import "./dashboard.css";

const Dashboard = ({ admin, onLogout }) => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="dashboard">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />
      <div className="dashboard--content">
        <Content activeTab={activeTab} admin={admin} />
      </div>
    </div>
  );
};

export default Dashboard;
