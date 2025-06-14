import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Admin/Login";
import Dashboard from "./components/Dashboard/Dashboard";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const shouldForceLogin = sessionStorage.getItem("dev_force_login");
      if (!shouldForceLogin) {
        sessionStorage.setItem("dev_force_login", "true");
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        return;
      }
    }

    const token = localStorage.getItem("token");
    const adminData = localStorage.getItem("admin");

    if (token && adminData) {
      setIsAuthenticated(true);
      setAdmin(JSON.parse(adminData));
    }
  }, []);

  const handleLogin = (loginResponse) => {
    if (!loginResponse?.token) {
      console.error("Invalid login data");
      return;
    }

    setIsAuthenticated(true);
    setAdmin(loginResponse.admin);
    localStorage.setItem("token", loginResponse.token);
    localStorage.setItem("admin", JSON.stringify(loginResponse.admin));

    if (process.env.NODE_ENV === "development") {
      sessionStorage.setItem("dev_force_login", "false");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setAdmin(null);

    if (process.env.NODE_ENV === "development") {
      sessionStorage.setItem("dev_force_login", "true");
    }
  };

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isAuthenticated ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/dashboard/*"
        element={
          isAuthenticated ? (
            <Dashboard admin={admin} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
