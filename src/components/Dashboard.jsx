import React from "react";
import { useGoogleAuth } from "../context/GoogleAuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useGoogleAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      // Handle logout error
    }
  };

  if (!user) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "white",
          borderRadius: "12px",
          padding: "40px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            paddingBottom: "20px",
            borderBottom: "1px solid #eee",
          }}
        >
          <h1 style={{ margin: 0, color: "#333", fontSize: "32px" }}>
            Dashboard
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Logout
          </button>
        </div>

        {/* User Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          {user.profilePic && (
            <img
              src={user.profilePic}
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                marginRight: "20px",
                border: "3px solid #fff",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          )}
          <div>
            <h2
              style={{
                margin: "0 0 8px 0",
                color: "#333",
                fontSize: "24px",
              }}
            >
              Welcome, {user.firstName} {user.lastName}!
            </h2>
            <p style={{ margin: "0 0 4px 0", color: "#666" }}>
              Email: {user.email}
            </p>
            <p style={{ margin: 0, color: "#666" }}>Role: {user.role}</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div>
          <h3 style={{ color: "#333", marginBottom: "20px" }}>
            Your Dashboard
          </h3>
          <p style={{ color: "#666", lineHeight: "1.6" }}>
            You have successfully logged in with Google OAuth! This is your
            dashboard where you can add your application content.
          </p>

          {/* Add your dashboard content here */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#e3f2fd",
              borderRadius: "8px",
              border: "1px solid #bbdefb",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", color: "#1565c0" }}>
              Getting Started
            </h4>
            <p style={{ margin: 0, color: "#1976d2" }}>
              This is a clean, production-ready Google OAuth implementation. You
              can now integrate this into your main application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
