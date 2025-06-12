import React from "react";
import GenericTab from "./GenericTab";

const AnimalsTab = ({ searchTerm }) => {
  const columns = [
    { key: "_id", header: "ID" },
    { key: "animalName", header: "Name" },
    { key: "species", header: "Species" },
    { key: "breed", header: "Breed" },
    { key: "age", header: "Age" },
    { key: "gender", header: "Gender" },
    { key: "status", header: "Status" },

    {
      key: "medicalHistory",
      header: "Medical History",
      render: (item) => item.medicalHistory || "No history",
    },
  ];

  return (
    <GenericTab
      endpoint="https://milovetapi.onrender.com/api/animals"
      columns={columns}
      title="Animal"
      searchTerm={searchTerm}
      searchFields={["species", "status"]}
    />
  );
};

export default AnimalsTab;
