import { useNavigate } from "react-router-dom";
// EnhancedAssistance.js
import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./EnhancedAssistance.css";

const EnhancedAssistance = () => {
  const navigate = useNavigate();
  const [metadataType, setMetadataType] = useState("name"); // Default to searching by name
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [visibleResults, setVisibleResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Tracks the current page for infinite scrolling
  const initialResultsCount = 10; // Adjusted initial number of results to display based on typical screen sizes
  const resultsPerPage = 4; // Number of results to load per scroll
  const lastValidQuery = useRef(""); // Tracks the last valid query
  const observerRef = useRef(); // Tracks the intersection observer
  const isThrottling = useRef(false); // Prevents rapid loading of new data
  const throttleDuration = 600; // Configurable throttle duration in milliseconds

  const handleError = (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 400) {
      setError("Invalid input. Please refine your search.");
    } else if (status === 404) {
      setError("No results found for the given search criteria.");
      setResults([]); // Clear results when no records are found
      setVisibleResults([]);
    } else if (status === 500) {
      setError("Server error. Please try again later.");
    } else {
      setError(message || "An unexpected error occurred. Please try again.");
    }
  };

  const loadInitialData = useCallback(async () => {
    if (!query.trim()) {
      setResults([]);
      setVisibleResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/client/metadata/search`,
        {
          params: { [metadataType]: query, page: 1 },
        },
      );
      setResults(res.data);
      setVisibleResults(res.data.slice(0, initialResultsCount));
      setPage(1);
      lastValidQuery.current = query; // Update the last valid query
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [query, metadataType]);

  const loadMoreData = useCallback(async () => {
    if (isThrottling.current) return; // Prevent rapid loading

    isThrottling.current = true;
    setTimeout(() => {
      isThrottling.current = false;
    }, throttleDuration); // Use configurable throttle duration

    setLoading(true);
    try {
      const nextPage = page + 1;
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/client/metadata/search`,
        {
          params: { [metadataType]: query, page: nextPage },
        },
      );
      setResults((prevResults) => {
        const uniqueResults = new Map();
        [...prevResults, ...res.data].forEach((item) => {
          uniqueResults.set(item.id, item);
        });
        return Array.from(uniqueResults.values());
      });
      setVisibleResults((prevVisible) => {
        const newVisibleResults = new Map();
        [...prevVisible, ...res.data].forEach((item) => {
          newVisibleResults.set(item.id, item);
        });
        return Array.from(newVisibleResults.values()).slice(
          0,
          prevVisible.length + resultsPerPage,
        );
      });
      setPage(nextPage);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [page, metadataType, query, resultsPerPage]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      loadInitialData();
    }, 300); // Debounce input handling
    return () => clearTimeout(debounceTimeout);
  }, [query, metadataType, loadInitialData]);

  const highlightQuery = (text) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <strong key={index}>{part}</strong>
      ) : (
        part
      ),
    );
  };

  const handleNavigate = (id) => {
    navigate(`/dashboard/${id}`);
  };

  const handleRetry = () => {
    setError("");
    setQuery("");
    setResults([]);
    setVisibleResults([]);
    setPage(1);
    lastValidQuery.current = "";
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleResults.length < results.length
        ) {
          loadMoreData();
        }
      },
      { threshold: 0.5 }, // Trigger loading when halfway visible
    );

    const currentObserverRef = observerRef.current;
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [visibleResults, results, loadMoreData]);

  return (
    <div className="enhanced-assistance">
      <h1>LucidGPT Enhanced Assistance</h1>
      <div className="search-container">
        <select
          value={metadataType}
          onChange={(e) => setMetadataType(e.target.value)}
          aria-label="Select Metadata Type"
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search by ${metadataType}`}
          className="search-input"
        />
      </div>
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Retry
          </button>
        </div>
      )}
      {loading && (
        <div className="loading-animation">Loading more results...</div>
      )}
      <div className="results-container">
        {visibleResults.map((result, index) => (
          <div key={index} className="result-card">
            <p>
              <strong>Name:</strong> {highlightQuery(result.name)}
            </p>
            {metadataType === "email" && (
              <p>
                <strong>Email:</strong> {highlightQuery(result.email)}
              </p>
            )}
            {metadataType === "phone" && (
              <p>
                <strong>Phone:</strong> {highlightQuery(result.phone)}
              </p>
            )}
            <button
              className="view-details"
              onClick={() => handleNavigate(result.id)}
            >
              View Details
            </button>
          </div>
        ))}
        {loading && <div className="loading-animation">Loading...</div>}
        <div ref={observerRef} style={{ height: "1px" }}></div>
      </div>
    </div>
  );
};

export default EnhancedAssistance;
