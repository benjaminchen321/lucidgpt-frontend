// frontend/src/components/common/LoadingSpinner.js

import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container" role="status" aria-label="Loading">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
