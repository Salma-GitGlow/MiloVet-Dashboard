import React from "react";
import GenericViewCard from "./GenericViewCard";

const ArtilceView = ({ article }) => {
  return (
    <div className="owner-view">
      <GenericViewCard data={article} type="article" />
    </div>
  );
};

export default ArtilceView;
