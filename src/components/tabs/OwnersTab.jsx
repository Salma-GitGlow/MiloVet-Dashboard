import React from "react";
import GenericTab from "./GenericTab";

const OwnersTab = () => {
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
    />
  );
};

export default OwnersTab;

// import React, { useEffect, useState } from "react";
// import OwnersTable from "../Tables/OwnersTable";

// const OwnersTab = () => {
//   const [owners, setOwners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOwners = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           "https://milovetapi.onrender.com/api/owners"
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setOwners(data.data);
//       } catch (err) {
//         setError("Failed to load owners data");
//         console.error("Error fetching owners:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOwners();
//   }, []);

//   const handleView = (id) => {
//     console.log("View owner with id:", id);
//     // يمكنك التنقل لصفحة التفاصيل هنا
//     // window.location.href = `/owners/${id}`;
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this owner?")) {
//       try {
//         // هنا يمكنك إضافة كود الحذف
//         console.log("Deleting owner with id:", id);
//         setOwners(owners.filter((owner) => owner._id !== id));
//       } catch (err) {
//         console.error("Failed to delete owner:", err);
//       }
//     }
//   };

//   if (loading) return <div className="loading">Loading owners data...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="tab-container">
//       <OwnersTable
//         owners={owners}
//         onView={handleView}
//         onDelete={handleDelete}
//       />
//     </div>
//   );
// };

// export default OwnersTab;
