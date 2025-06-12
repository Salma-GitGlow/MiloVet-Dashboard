import React from "react";

import "./AdminProfile.css";

const AdminProfile = ({ currentUser, onLogout }) => {
  return (
    <div className="admin-profile">
      <div className="profile-info">
        <span className="username">{currentUser.username}</span>
        <span className="role">{currentUser.role}</span>
      </div>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminProfile;
