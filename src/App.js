// frontend/src/App.js

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";
import LoadingSpinner from "./components/common/LoadingSpinner"; // Optional: To show a spinner while loading
import Navbar from "./components/Navbar"; // Ensure Navbar is correctly implemented
import ErrorBoundary from './components/common/ErrorBoundary'; // Import ErrorBoundary

// Lazy-loaded components
const Login = lazy(() => import("./components/Login"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const EnhancedAssistance = lazy(() =>
  import("./components/enhanced_assistance/EnhancedAssistance")
);
const MaintenanceCRM = lazy(() =>
  import("./components/maintenance_crm/MaintenanceCRM")
);
const NotFound = lazy(() => import("./components/NotFound")); // Optional: 404 Page
const Home = lazy(() => import("./components/Home")); // Newly created Home component
const Logout = lazy(() => import("./components/Logout")); // Logout component

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {/* Navbar is inside Router and AuthProvider */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            {" "}
            {/* Use LoadingSpinner as fallback */}
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              {/* Home Route */}
              <Route path="/" element={<Home />} />
              {/* Protected Routes for Employees and Superusers */}
              <Route
                path="/dashboard/*" // Adjust if Dashboard has nested routes
                element={
                  <PrivateRoute requiredRole={["employee", "superuser"]}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/crm"
                element={
                  <PrivateRoute requiredRole={["employee", "superuser"]}>
                    <MaintenanceCRM />
                  </PrivateRoute>
                }
              />
              {/* Protected Routes for Customers */}
              <Route
                path="/assist"
                element={
                  <PrivateRoute requiredRole="customer">
                    <EnhancedAssistance />
                  </PrivateRoute>
                }
              />
              {/* Fallback Route */}
              <Route path="*" element={<NotFound />} />{" "}
              {/* Optional: 404 Page */}
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;
