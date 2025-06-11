import React from "react";
import GenericViewCard from "./GenericViewCard";

const AnimalView = ({ animal }) => {
  return (
    <div className="owner-view">
      <GenericViewCard data={animal} type="animal" />
    </div>
  );
};

export default AnimalView;
