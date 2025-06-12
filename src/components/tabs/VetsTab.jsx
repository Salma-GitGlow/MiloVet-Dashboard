import React from "react";
import GenericTab from "./GenericTab";

const OwnersTab = ({ searchTerm }) => {
  const columns = [
    { key: "_id", header: "ID" },
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "email", header: "Email" },
    { key: "speciality", header: "Speciality" },
  ];

  return (
    <GenericTab
      endpoint="https://milovetapi.onrender.com/api/vets"
      columns={columns}
      title="Vets"
      searchTerm={searchTerm}
      searchFields={["firstName", "lastName", "email", "speciality"]}
    />
  );
};

export default OwnersTab;
