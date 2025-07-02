import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Service to handle Google OAuth authentication
 */
const googleAuthService = {
  /**
   * Send Google access token to backend for verification and login/signup
   * @param {string} access_token - The Google access token
   * @returns {Promise} Promise containing user data and tokens
   */
  async loginWithGoogle(access_token) {
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/google`,
        {
          access_token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Store tokens in local storage
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check if user is authenticated with Google
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem("accessToken");
  },

  /**
   * Get the current user from local storage
   * @returns {Object|null} User object or null if not authenticated
   */
  getCurrentUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  /**
   * Logout the user by clearing local storage
   */
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    // Optional: Call backend logout endpoint
    return axios.post(`${API_URL}/api/auth/logout`);
  },
};

export default googleAuthService;
