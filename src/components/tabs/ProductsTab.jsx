import React from "react";
import GenericTab from "./GenericTab";

const OwnersTab = () => {
  const columns = [
    { key: "_id", header: "ID" },
    { key: "title", header: "Title" },
    { key: "description", header: "Description" },
    { key: "category", header: "Category" },
    { key: "price", header: "Price" },
    { key: "quantity", header: "Quantity" },
    { key: "rating", header: "Rating" },
    { key: "sold", header: "Sold" },
  ];

  return (
    <GenericTab
      endpoint="https://milovetapi.onrender.com/api/products"
      columns={columns}
      title="Products"
    />
  );
};

export default OwnersTab;
