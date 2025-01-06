import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner"; // Optional: To show a spinner while loading
import Navbar from "./components/Navbar"; // Ensure Navbar is correctly implemented
import ErrorBoundary from './components/common/ErrorBoundary'; // Import ErrorBoundary

// Lazy-loaded components
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const EnhancedAssistance = lazy(() =>
  import("./components/enhanced_assistance/EnhancedAssistance")
);
const MaintenanceCRM = lazy(() =>
  import("./components/maintenance_crm/MaintenanceCRM")
);

function App() {
  return (
    <Router>
        <Navbar /> {/* Navbar is inside Router */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crm" element={<MaintenanceCRM />} />
              <Route path="/assist" element={<EnhancedAssistance />} />
              <Route path="/" element={<Navigate to="/dashboard" />} /> 
            </Routes>
          </Suspense>
        </ErrorBoundary>
    </Router>
  );
}

export default App;