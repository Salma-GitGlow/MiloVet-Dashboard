import React from "react";
import GenericViewCard from "./GenericViewCard";

const OrderView = ({ order }) => {
  return (
    <div className="owner-view">
      <GenericViewCard data={order} type="order" />
    </div>
  );
};

export default OrderView;
