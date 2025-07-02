import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useGoogleAuth } from "../context/GoogleAuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, loading } = useGoogleAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = (result) => {
    // The navigation will be handled by the useEffect below
    // when isAuthenticated becomes true
  };

  const handleLoginError = (error) => {
    // Handle login error (you can add toast notifications here)
  };

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #4285f4",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 20px",
            }}
          />
          <p style={{ color: "#666", margin: 0 }}>Loading...</p>
        </div>
      </div>
    );
  }

  // If already authenticated, don't render the login form
  if (isAuthenticated) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h1
          style={{
            marginBottom: "30px",
            color: "#333",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            marginBottom: "30px",
            color: "#666",
            fontSize: "16px",
            lineHeight: "1.5",
          }}
        >
          Sign in to your account to continue
        </p>

        <GoogleLoginButton
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          text="Sign in with Google"
        />
      </div>
    </div>
  );
};

export default LoginPage;
