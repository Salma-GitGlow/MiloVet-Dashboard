import React from "react";
import GenericViewCard from "./GenericViewCard";

const VetView = ({ vet }) => {
  return (
    <div className="owner-view">
      <GenericViewCard data={vet} type="vet" />
    </div>
  );
};

export default VetView;
