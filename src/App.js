// frontend/src/App.js

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import LoadingSpinner from './components/common/LoadingSpinner'; // Import LoadingSpinner
import Navbar from './components/Navbar'; // Ensure Navbar is correctly implemented

// Lazy-loaded components
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const EnhancedAssistance = lazy(() => import('./components/enhanced_assistance/EnhancedAssistance')); // New AI Assistance component
const MaintenanceCRM = lazy(() => import('./components/maintenance_crm/MaintenanceCRM')); // Renamed MaintenanceCRM component

function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<LoadingSpinner />}> {/* Use LoadingSpinner as fallback */}
          <Navbar /> {/* Add Navbar here for consistent navigation */}
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route
              path="/dashboard/*" // Adjust if Dashboard has nested routes
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/assist"
              element={
                <PrivateRoute>
                  <EnhancedAssistance />
                </PrivateRoute>
              }
            />
            <Route
              path="/crm"
              element={
                <PrivateRoute>
                  <MaintenanceCRM />
                </PrivateRoute>
              }
            />
            
            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
