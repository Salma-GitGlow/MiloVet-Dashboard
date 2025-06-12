import React from "react";
import GenericTab from "./GenericTab";

const ArticlesTab = ({ searchTerm }) => {
  const columns = [
    { key: "_id", header: "ID" },
    { key: "title", header: "Article Title" },
    { key: "content", header: "Article Content" },
    { key: "category", header: "Category" },
    { key: "createdTime", header: "Created Time" },
    { key: "vetId", header: "VetId" },
  ];

  return (
    <GenericTab
      endpoint="https://milovetapi.onrender.com/api/articles"
      columns={columns}
      title="Articles"
      searchTerm={searchTerm}
      searchFields={["title", "category"]}
    />
  );
};

export default ArticlesTab;
