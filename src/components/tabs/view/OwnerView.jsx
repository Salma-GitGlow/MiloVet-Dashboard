import React from "react";
import GenericViewCard from "./GenericViewCard";

const OwnerView = ({ owner }) => {
  return (
    <div className="owner-view">
      <GenericViewCard data={owner} type="owner" />
    </div>
  );
};

export default OwnerView;
