import React, { useState, useEffect } from "react";
import GenericTab from "./GenericTab";
import { FaPlus } from "react-icons/fa";
import AddProductModal from "./AddProductModal";
import axios from "../../utils/axoisConfig.js";
import { useNavigate } from "react-router-dom";
import "./products.css";

const ProductsTab = ({ searchTerm }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminData = JSON.parse(localStorage.getItem("admin") || "{}");
    if (!token || adminData.role !== "MANAGER") navigate("/login");
  }, [navigate]);

  const columns = [
    { key: "_id", header: "ID" },
    { key: "title", header: "Title" },
    { key: "description", header: "Description" },
    { key: "category", header: "Category" },
    {
      key: "price",
      header: "Price",
      render: (item) => `$${item.price?.toFixed(2) || "0.00"}`,
    },
    { key: "quantity", header: "Quantity" },
    { key: "rating", header: "Rating" },
    { key: "sold", header: "Sold" },
  ];

  const handleAddProduct = async (productData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const formData = new FormData();
      Object.keys(productData).forEach((key) => {
        if (key === "images") {
          productData.images.forEach((image) => {
            formData.append("images", image);
          });
        } else {
          formData.append(key, productData[key]);
        }
      });

      await axios.post("/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setRefreshData((prev) => !prev);
      setShowAddModal(false);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Failed to add product");
      }
    }
  };

  return (
    <div className="products-tab-container">
      <div className="products-actions">
        <button
          className="add-product-btn"
          onClick={() => setShowAddModal(true)}
        >
          <FaPlus className="icon" />
          Add Product
        </button>
      </div>

      <GenericTab
        endpoint="/products"
        columns={columns}
        title="Products"
        searchTerm={searchTerm}
        searchFields={["title", "category"]}
        refreshTrigger={refreshData}
      />

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddProduct}
        />
      )}
    </div>
  );
};

export default ProductsTab;

// import React from "react";
// import GenericTab from "./GenericTab";

// const OwnersTab = ({ searchTerm }) => {
//   const columns = [
//     { key: "_id", header: "ID" },
//     { key: "title", header: "Title" },
//     { key: "description", header: "Description" },
//     { key: "category", header: "Category" },
//     { key: "price", header: "Price" },
//     { key: "quantity", header: "Quantity" },
//     { key: "rating", header: "Rating" },
//     { key: "sold", header: "Sold" },
//   ];

//   return (
//     <GenericTab
//       endpoint="https://milovetapi.onrender.com/api/products"
//       columns={columns}
//       title="Products"
//       searchTerm={searchTerm}
//       searchFields={["title", "category"]}
//     />
//   );
// };

// export default OwnersTab;
