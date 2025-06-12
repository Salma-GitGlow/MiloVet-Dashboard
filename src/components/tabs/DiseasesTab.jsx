import React from "react";
import GenericTab from "./GenericTab";

const DiseasesTab = ({ searchTerm }) => {
  const columns = [
    { key: "_id", header: "ID" },
    { key: "title", header: "Disease Title" },
    { key: "content", header: "Content" },
    { key: "createdTime", header: "Created Time" },
  ];

  return (
    <GenericTab
      endpoint="https://milovetapi.onrender.com/api/diseases"
      columns={columns}
      title="Diseases"
      searchTerm={searchTerm}
      searchFields={["title"]}
    />
  );
};

export default DiseasesTab;
