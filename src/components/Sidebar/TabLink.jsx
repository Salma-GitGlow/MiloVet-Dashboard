import React from "react";
import "./sidebar.css";

const TabLink = ({ isSelected, onClick, icon: Icon, label }) => {
  return (
    <div className={`item ${isSelected ? "active" : ""}`} onClick={onClick}>
      <Icon className="icon" />
      <span>{label}</span>
    </div>
  );
};

export default TabLink;
