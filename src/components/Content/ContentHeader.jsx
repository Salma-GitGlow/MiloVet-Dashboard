import React from "react";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import "./content.css";

const ContentHeader = ({ title, currentUser, onSearch, showSearch }) => {
  const [localSearchTerm, setLocalSearchTerm] = React.useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    onSearch(value);
  };

  const getSearchPlaceholder = () => {
    switch (title) {
      case "Animal Owners":
        return "Search owner by name, email, phone...";
      case "Veterinarians":
        return "Search vet by name, speciality or email...";
      case "Animals":
        return "Search animal by species, status...";
      case "Articles":
        return "Search by category or title...";
      case "Diseases":
        return "Search by title...";
      case "Products":
        return "Search by title or category...";
      case "Orders":
        return "Search by status, address, ownerID";
      default:
        return "Search...";
    }
  };

  return (
    <div className="content--header">
      <h1 className="header--title">{title}</h1>
      <div className="header-right">
        {showSearch && (
          <div className="search-box">
            <input
              type="text"
              placeholder={getSearchPlaceholder()}
              value={localSearchTerm}
              onChange={handleSearchChange}
            />
            <BiSearch className="icon-search" />
          </div>
        )}

        <div className="admin-profile">
          <FaUserCircle className="admin-avatar" />
          <span className="greeting">
            Hi, {currentUser?.username || "Admin"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;
