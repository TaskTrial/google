import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "react-google-button";
import googleAuthService from "../services/googleAuthService";
import { useGoogleAuth } from "../context/GoogleAuthContext";
import axios from "axios";

/**
 * Google Login Button Component
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSuccess - Callback function when login is successful
 * @param {Function} props.onError - Callback function when login fails
 * @param {string} props.text - Custom text for the button (optional)
 * @param {string} props.type - Button type: 'standard' or 'dark' (optional)
 * @param {boolean} props.disabled - Whether the button is disabled (optional)
 */
const GoogleLoginButton = ({
  onSuccess,
  onError,
  text = "Sign in with Google",
  type = "standard",
  disabled = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { updateAuthState } = useGoogleAuth();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Configure Google login hook
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      setIsLoading(true);
      setError(null);

      try {
        // If using auth-code flow
        if (codeResponse.code) {
          // Send the authorization code to your backend
          const result = await axios.post(
            `${API_URL}/api/auth/google/callback`,
            {
              code: codeResponse.code,
            }
          );

          if (result.data && result.data.accessToken) {
            localStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("refreshToken", result.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(result.data.user));

            // Immediately update the auth context state
            updateAuthState();
          }

          if (onSuccess && typeof onSuccess === "function") {
            onSuccess(result.data);
          }
        }
        // If using implicit flow with access_token
        else if (codeResponse.access_token) {
          // Use existing service with access token
          const result = await googleAuthService.loginWithGoogle(
            codeResponse.access_token
          );

          // Immediately update the auth context state
          updateAuthState();

          if (onSuccess && typeof onSuccess === "function") {
            onSuccess(result);
          }
        }
      } catch (err) {
        setError(err);
        if (onError && typeof onError === "function") {
          onError(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      setError(error);
      if (onError && typeof onError === "function") {
        onError(error);
      }
    },
    flow: "auth-code",
    ux_mode: "popup",
    redirect_uri: "postmessage",
    scope: "email profile openid",
    select_account: true,
  });

  return (
    <div className="google-login-container">
      <GoogleButton
        onClick={login}
        disabled={disabled || isLoading}
        type={type}
        label={isLoading ? "Loading..." : text}
      />
      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginTop: "10px", textAlign: "center" }}
        >
          Authentication failed. Please try again.
        </div>
      )}
    </div>
  );
};

export default GoogleLoginButton;
