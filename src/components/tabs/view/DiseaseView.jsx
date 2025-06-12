import React from "react";
import GenericViewCard from "./GenericViewCard";

const DiseaseView = ({ disease }) => {
  return (
    <div className="owner-view">
      <GenericViewCard data={disease} type="disease" />
    </div>
  );
};

export default DiseaseView;
