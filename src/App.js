import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/common/LoadingSpinner";
import Navbar from "./components/Navbar";
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy-loaded components
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const EnhancedAssistance = lazy(() => import("./components/enhanced_assistance/EnhancedAssistance"));
const MaintenanceCRM = lazy(() => import("./components/maintenance_crm/MaintenanceCRM"));
const CustomerDetails = lazy(() => import("./components/dashboard/components/CustomerDetails")); // Import CustomerDetails

function App() {
  return (
    <Router>
      <Navbar />
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/crm" element={<MaintenanceCRM />} />
            <Route path="/assist" element={<EnhancedAssistance />} />
            <Route path="/customers/:customer_id" element={<CustomerDetails />} /> {/* Added route */}
            <Route path="/" element={<Navigate to="/assist" />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
