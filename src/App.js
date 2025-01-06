// src/App.js

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext"; // Import AuthContext
import PrivateRoute from "./components/common/PrivateRoute"; // Import PrivateRoute
import EnhancedAssistance from "./components/enhanced_assistance/EnhancedAssistance";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Login from "./components/Login"; // Import Login component
import DarkModeToggle from "./components/DarkModeToggle"; // Import DarkModeToggle
import Logout from "./components/Logout"; // Import Logout component
import "./App.css";

const AppContent = () => {
  const { auth } = useContext(AuthContext); // Access auth state

  return (
    <Router>
      <header className="App-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="app-logo"
          >
            <rect width="100" height="100" fill="#007bff" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              fill="white"
              fontSize="14"
              fontFamily="Arial"
              dy=".3em"
            >
              Lucid
            </text>
          </svg>
          <h1>LucidGPT</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/enhanced-assistance">Enhanced Assistance</Link>
            </li>
            {auth.isAuthenticated ? (
              <>
                <li>
                  <Link to="/dashboard">Customer Dashboard</Link>
                </li>
                <li>
                  <Link to="/assist">Assistance</Link>
                </li>
                <li>
                  <Logout />
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
        <DarkModeToggle /> {/* Add Dark Mode Toggle */}
      </header>
      <main className="App-main">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/enhanced-assistance"
              element={
                <PrivateRoute>
                  <EnhancedAssistance />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            {/* Add other routes as needed */}
            {/* Redirect unknown routes to a default page */}
            <Route path="*" element={<Navigate to="/enhanced-assistance" replace />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
