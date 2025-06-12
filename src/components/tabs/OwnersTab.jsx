import React from "react";
import GenericTab from "./GenericTab";

const OwnersTab = ({ searchTerm }) => {
  const columns = [
    { key: "_id", header: "ID" },
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "address", header: "Address" },
    {
      key: "animals",
      header: "Animals Count",
      render: (item) => item.animals?.length || 0,
    },
  ];

  return (
    <GenericTab
      endpoint="https://milovetapi.onrender.com/api/owners"
      columns={columns}
      title="Owner"
      searchTerm={searchTerm}
      searchFields={["firstName", "lastName", "email", "phone"]}
    />
  );
};

export default OwnersTab;
