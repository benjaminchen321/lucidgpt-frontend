import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      className="loading-spinner flex justify-center items-center h-16 w-16 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"
      role="status"
      aria-label="Loading"
    />
  );
};

export default LoadingSpinner;
