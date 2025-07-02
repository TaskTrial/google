import React, { createContext, useState, useEffect, useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import googleAuthService from "../services/googleAuthService";

// Create context
const GoogleAuthContext = createContext(null);

/**
 * Google Auth Provider Component
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.clientId - Google OAuth client ID
 */
export const GoogleAuthProvider = ({ children, clientId }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = () => {
      const isAuth = googleAuthService.isAuthenticated();
      const currentUser = googleAuthService.getCurrentUser();

      setIsAuthenticated(isAuth);
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Handle successful login
  const handleLoginSuccess = (result) => {
    setUser(result.user);
    setIsAuthenticated(true);
    return result;
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await googleAuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      // Handle logout error silently
    }
  };

  // Update auth state from localStorage (for immediate updates)
  const updateAuthState = () => {
    const isAuth = googleAuthService.isAuthenticated();
    const currentUser = googleAuthService.getCurrentUser();

    setIsAuthenticated(isAuth);
    setUser(currentUser);
  };

  // Context value
  const contextValue = {
    user,
    isAuthenticated,
    loading,
    updateAuthState, // Expose this method to update auth state
    login: async (idToken) => {
      try {
        const result = await googleAuthService.loginWithGoogle(idToken);
        return handleLoginSuccess(result);
      } catch (error) {
        throw error;
      }
    },
    logout: handleLogout,
  };

  return (
    <GoogleOAuthProvider
      clientId={clientId}
      onScriptLoadError={() => {
        // Handle script load error silently
      }}
    >
      <GoogleAuthContext.Provider value={contextValue}>
        {children}
      </GoogleAuthContext.Provider>
    </GoogleOAuthProvider>
  );
};

// Custom hook to use the Google Auth context
export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error("useGoogleAuth must be used within a GoogleAuthProvider");
  }
  return context;
};

export default GoogleAuthContext;
