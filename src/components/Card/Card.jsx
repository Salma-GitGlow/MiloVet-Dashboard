import React from "react";
import CountData from "../../hooks/countData.js";
import "./card.css";

const Card = ({ title, icon: Icon, endpoint }) => {
  const count = CountData(endpoint);

  return (
    <div className="card">
      <div className="title">
        <Icon className="icon" />
        <h4>Total {title}</h4>
      </div>
      <span>{count}</span>
    </div>
  );
};

export default Card;
