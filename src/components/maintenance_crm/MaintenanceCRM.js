import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./MaintenanceCRM.css"; // Updated CSS import

const MaintenanceCRM = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
      setFilteredResults(res.data); // Initially set filtered results to all results
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [resultsPerPage]);

  const loadMoreData = useCallback(() => {
    if (visibleResults.length >= filteredResults.length) return;

    const nextPageStart = visibleResults.length;
    const nextPageEnd = nextPageStart + resultsPerPage;
    setVisibleResults((prev) => [
      ...prev,
      ...filteredResults.slice(nextPageStart, nextPageEnd),
    ]);
    setPage((prev) => prev + 1);
  }, [visibleResults, filteredResults, resultsPerPage]);

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredResults(results);
      setVisibleResults(results.slice(0, resultsPerPage));
    } else {
      const filtered = results.filter((customer) => {
        const nameMatch = customer.name?.toLowerCase().includes(query);
        const emailMatch = customer.email?.toLowerCase().includes(query);
        const phoneMatch = customer.phone?.includes(query);

        // Use fuzzy matching (example: partially matching 'Luc')
        const fuzzyMatch = customer.name?.toLowerCase().startsWith(query) ||
          customer.email?.toLowerCase().startsWith(query);

        return nameMatch || emailMatch || phoneMatch || fuzzyMatch;
      });

      if (filtered.length === 0) {
        setError("No matching customers found.");
      } else {
        setError("");
      }

      setFilteredResults(filtered);
      setVisibleResults(filtered.slice(0, resultsPerPage));
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleResults.length < filteredResults.length) {
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
  }, [visibleResults, filteredResults, loadMoreData]);

  return (
    <div className="max-w-screen-lg mx-auto mt-20 p-6 bg-white shadow rounded-lg" style={{ marginTop: "13vh" }}>
      <h1 className="text-3xl font-bold text-[#a47b5b] mb-6">Maintenance Hub</h1>
      <p className="text-gray-700 mb-4">
        Browse the list of customers to view their contact details and navigate to their
        full profile for additional insights, including appointments and vehicle information.
      </p>
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a47b5b] focus:border-[#a47b5b]"
      />
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded mb-4">
          <p>{error}</p>
          <button
            onClick={loadCustomers}
            className="mt-2 px-4 py-2 bg-[#a47b5b] text-white rounded shadow hover:bg-[#7b5b42]"
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
            onClick={() => navigate(`/customers/${customer.id}`)}
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
