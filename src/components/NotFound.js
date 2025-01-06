// frontend/src/components/NotFound.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Create and style as needed

const NotFound = () => {
  return (
    <div className="not-found-container h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link mt-4 text-blue-500 hover:underline">Go to Home</Link>
    </div>
  );
};

export default NotFound;
