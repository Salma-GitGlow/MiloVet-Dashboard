import React, { useEffect, useState } from "react";
import { FaEye, FaTrash, FaEdit } from "react-icons/fa";
import ConfirmModel from "./ConfirmModel";
import GenericViewCard from "./view/GenericViewCard";
import axios from "../../utils/axoisConfig.js";
import "./table.css";
import "./confirmModel.css";

const GenericTab = ({
  endpoint,
  columns,
  title,
  searchTerm,
  searchFields = [],
  refreshTrigger,
  allowEdit = false,
  onEdit,
}) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showViewCard, setShowViewCard] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(endpoint);

        let responseData = response.data.data;

        if (title.toLowerCase() === "orders" && responseData?.orders) {
          responseData = responseData.orders;
        } else {
          const dataKey = title.toLowerCase();
          if (responseData && responseData[dataKey]) {
            responseData = responseData[dataKey];
          }
        }

        const finalData = Array.isArray(responseData)
          ? responseData
          : [responseData];
        setData(finalData);
        setFilteredData(finalData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.response?.data?.message || `Failed to load ${title}`);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, title, refreshTrigger]);

  useEffect(() => {
    if (searchTerm && searchFields.length > 0) {
      const filtered = data.filter((item) =>
        searchFields.some((field) => {
          const fieldValue = item[field];
          if (typeof fieldValue === "string") {
            return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
          }
          if (typeof fieldValue === "number") {
            return fieldValue.toString().includes(searchTerm);
          }
          return false;
        })
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchTerm, data, searchFields]);

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${endpoint}/${itemToDelete}`);

      const updatedData = data.filter((item) => item._id !== itemToDelete);
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (err) {
      console.error(`Failed to delete ${title}:`, err);
      alert(
        `Failed to delete ${title}: ${
          err.response?.data?.message || err.message
        }`
      );
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowViewCard(true);
  };

  const handleEdit = (item) => {
    if (onEdit) {
      onEdit(item);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading {title} data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">!</div>
        <h3 className="error-title">Error</h3>
        <p className="error-message">{error}</p>
        <button
          className="error-retry-btn"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="table-container">
      {filteredData.length === 0 ? (
        <div className="no-data-found">
          No {title.toLowerCase()} found matching your search
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              {columns.map((column) => (
                <th key={column.key}>{column.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                {columns.map((column) => (
                  <td key={`${item._id}-${column.key}`} className="truncate-id">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                <td className="actions-cell">
                  <button className="view-btn" onClick={() => handleView(item)}>
                    <FaEye /> View
                  </button>

                  {allowEdit && (
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      <FaEdit /> Edit
                    </button>
                  )}

                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmModel
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        title={`Delete ${title}`}
        message={`Are you sure you want to delete this ${title.toLowerCase()}?`}
      />

      {showViewCard && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-btn"
              onClick={() => setShowViewCard(false)}
            >
              &times;
            </button>
            <GenericViewCard data={selectedItem} type={title.toLowerCase()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericTab;
