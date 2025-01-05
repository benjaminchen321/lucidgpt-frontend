import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EnhancedAssistance from "./components/enhanced_assistance/EnhancedAssistance";
import Dashboard from "./components/dashboard/Dashboard";
import ErrorBoundary from "./components/common/ErrorBoundary";
import "./App.css";

const App = () => {
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
            <li>
              <Link to="/dashboard">Customer Dashboard</Link>
            </li>
          </ul>
        </nav>
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
