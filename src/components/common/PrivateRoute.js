// src/components/common/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  return auth.isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
