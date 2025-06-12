import React, { useEffect, useState } from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import ConfirmModel from "./ConfirmModel";
import GenericViewCard from "./view/GenericViewCard";
import "./table.css";
import "./confirmModel.css";

const GenericTab = ({
  endpoint,
  columns,
  title,
  searchTerm,
  searchFields = [],
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
        const response = await fetch(endpoint);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        const dataKey = title.toLowerCase();
        const extractedData = result.data?.[dataKey] || result.data || result;
        const finalData = Array.isArray(extractedData)
          ? extractedData
          : [extractedData];
        setData(finalData);
        setFilteredData(finalData); // Initialize filteredData
      } catch (err) {
        setError(`Failed to load ${title} data`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint, title]);

  useEffect(() => {
    if (searchTerm && searchFields.length > 0) {
      const filtered = data.filter((item) =>
        searchFields.some((field) =>
          String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
        )
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
      const response = await fetch(`${endpoint}/${itemToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Delete failed");
      const updatedData = data.filter((item) => item._id !== itemToDelete);
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (err) {
      console.error(`Failed to delete ${title}:`, err);
      alert(`Failed to delete ${title}`);
    } finally {
      setShowModal(false);
      setItemToDelete(null);
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowViewCard(true);
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading {title} data...</p>
      </div>
    );

  if (error)
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
              {columns.map((column) => (
                <th key={column.key}>{column.header}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item._id}>
                {columns.map((column) => (
                  <td className="truncate-id" key={`${item._id}-${column.key}`}>
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                <td className="actions-cell">
                  <button className="view-btn" onClick={() => handleView(item)}>
                    <FaEye /> View
                  </button>
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
