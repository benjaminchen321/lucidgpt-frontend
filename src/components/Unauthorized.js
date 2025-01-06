// frontend/src/components/Unauthorized.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Unauthorized.css'; // Ensure Unauthorized.css is correctly implemented

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h2>Unauthorized</h2>
      <p>You do not have permission to view this page.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Unauthorized;
