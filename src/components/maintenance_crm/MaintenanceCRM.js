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
    <div className="container mx-auto mt-6 p-6 bg-white shadow-lg rounded-lg" style={{marginTop: "13vh"}}>
      <h1 className="text-2xl font-bold text-blue-600 mb-4">Customer CRM</h1>
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
          <p>{error}</p>
          <button
            onClick={loadCustomers}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      )}
      {loading && <p className="text-gray-600">Loading...</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleResults.map((customer) => (
          <div
            key={customer.id}
            className="p-4 bg-gray-50 shadow-md rounded-lg hover:shadow-lg transition-all duration-200 cursor-pointer"
            onClick={() => navigate(`/dashboard/${customer.id}`)}
          >
            <h2 className="text-lg font-semibold text-gray-800">{customer.name}</h2>
            <p className="text-sm text-gray-500">{customer.email}</p>
            <p className="text-sm text-gray-500">{customer.phone}</p>
          </div>
        ))}
      </div>
      <div ref={observerRef} style={{ height: "1px" }}></div>
    </div>
  );
};

export default MaintenanceCRM;
