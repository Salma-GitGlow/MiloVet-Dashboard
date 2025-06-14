import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://milovetapi.onrender.com/api/admins/login",
        { username, password }
      );

      if (!response.data?.data?.admin?.token) {
        throw new Error("Token not found in response");
      }

      const { admin } = response.data.data;

      localStorage.setItem("token", admin.token);
      localStorage.setItem(
        "admin",
        JSON.stringify({
          _id: admin._id,
          username: admin.username,
          role: admin.role,
        })
      );

      onLogin({
        token: admin.token,
        admin: {
          _id: admin._id,
          username: admin.username,
          role: admin.role,
        },
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });
      setError(err.response?.data?.message || "Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
