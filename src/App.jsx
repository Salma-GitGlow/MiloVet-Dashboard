import React, { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import "./App.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="dashboard">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="dashboard--content">
        <Content activeTab={activeTab} />
      </div>
    </div>
  );
};

export default App;
