// frontend/src/components/common/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner'; // Optional: To show a spinner while loading

const PrivateRoute = ({ children, requiredRole }) => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return <LoadingSpinner />; // Show a spinner while authentication state is loading
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If requiredRole is an array, check if user's role is in the array
  if (Array.isArray(requiredRole)) {
    if (!requiredRole.includes(auth.role)) {
      return <Navigate to="/" replace />; // Redirect to home or unauthorized page
    }
  } else {
    if (auth.role !== requiredRole) {
      return <Navigate to="/" replace />; // Redirect to home or unauthorized page
    }
  }

  return children;
};

export default PrivateRoute;
