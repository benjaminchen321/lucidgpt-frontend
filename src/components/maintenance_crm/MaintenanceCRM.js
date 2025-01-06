// Updated MaintenanceCRM.js

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./MaintenanceCRM.css"; // Updated CSS import

const MaintenanceCRM = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [, setPage] = useState(1); // Tracks the current page for infinite scrolling
  const resultsPerPage = 10; // Number of results per page
  const observerRef = useRef(); // Tracks the intersection observer

  const handleError = (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.detail || error.message;

    if (status === 404) {
      setError("No customers found.");
      setResults([]);
      setVisibleResults([]);
    } else if (status === 500) {
      setError("Server error. Please try again later.");
    } else {
      setError(message || "An unexpected error occurred. Please try again.");
    }
  };

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/customers`);
      setResults(res.data);
      setVisibleResults(res.data.slice(0, resultsPerPage));
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [resultsPerPage]);

  const loadMoreData = useCallback(() => {
    if (visibleResults.length >= results.length) return;

    const nextPageStart = visibleResults.length;
    const nextPageEnd = nextPageStart + resultsPerPage;
    setVisibleResults((prev) => [...prev, ...results.slice(nextPageStart, nextPageEnd)]);
    setPage((prev) => prev + 1);
  }, [visibleResults, results, resultsPerPage]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleResults.length < results.length) {
          loadMoreData();
        }
      },
      { threshold: 1.0 }
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) observer.observe(currentObserverRef);

    return () => {
      if (currentObserverRef) observer.unobserve(currentObserverRef);
    };
  }, [visibleResults, results, loadMoreData]);

  return (
    <div className="maintenance-crm">
      <h1>Customer CRM</h1>
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadCustomers} className="retry-button">
            Retry
          </button>
        </div>
      )}
      {loading && <div className="loading-animation">Loading...</div>}
      <div className="results-container">
        {visibleResults.map((customer) => (
          <div key={customer.id} className="result-card">
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>
            <button
              className="view-details"
              onClick={() => navigate(`/dashboard/${customer.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
        <div ref={observerRef} style={{ height: "1px" }}></div>
      </div>
    </div>
  );
};

export default MaintenanceCRM;
