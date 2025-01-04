// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EnhancedAssistance from "./components/enhanced_assistance/EnhancedAssistance";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./App.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "true");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "false");
      }
      return newMode;
    });
  };

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
              text-anchor="middle"
              fill="white"
              font-size="14"
              font-family="Arial"
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
            <li>
              <Link to="/dashboard">Customer Dashboard</Link>
            </li>
          </ul>
        </nav>
        <button
          className="toggle-dark-mode"
          onClick={toggleDarkMode}
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? (
            // Sun Icon SVG
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M6.76 4.84l-1.8-1.79-1.42 1.42 1.79 1.8 1.43-1.43zm10.48 0l1.43 1.43 1.8-1.8-1.42-1.42-1.79 1.79zM12 5a7 7 0 100 14 7 7 0 000-14zm0 12a5 5 0 110-10 5 5 0 010 10zm6.36 2.36l1.79 1.8 1.42-1.42-1.8-1.79-1.41 1.41zM4 12a1 1 0 011-1h2a1 1 0 110 2H5a1 1 0 01-1-1zm14 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-6.36 6.36l1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8zM12 19a1 1 0 011-1v-2a1 1 0 11-2 0v2a1 1 0 011 1zm0-16a1 1 0 011-1V2a1 1 0 11-2 0v2a1 1 0 011 1z" />
            </svg>
          ) : (
            // Moon Icon SVG
            <svg
              className="icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.752 15.002A9 9 0 1111.002 2a7 7 0 109.75 13.002z" />
            </svg>
          )}
        </button>
      </header>
      <main className="App-main">
        <ErrorBoundary>
          <Routes>
            <Route
              path="/enhanced-assistance"
              element={<EnhancedAssistance />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </ErrorBoundary>
      </main>
    </Router>
  );
};

export default App;
