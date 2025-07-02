import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GoogleAuthProvider } from "./context/GoogleAuthContext";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

// Read client ID from environment variables
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

console.log("App.jsx - GOOGLE_CLIENT_ID:", GOOGLE_CLIENT_ID);

function App() {
  return (
    <GoogleAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Redirect any unknown route to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GoogleAuthProvider>
  );
}

export default App;
