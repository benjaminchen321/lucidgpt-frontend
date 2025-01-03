import { useSearchParams } from "react-router-dom";
// EnhancedAssistance.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EnhancedAssistance.css";

const EnhancedAssistance = () => {
  const [searchParams] = useSearchParams();
  const initialClientId = searchParams.get("client_id") || "";
  const [query, setQuery] = useState(initialClientId);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFetchMetadata = async () => {
    if (!query) return;

    setLoading(true);
    setResponse(null);
    setError("");
    setSuccess(false);
    try {
      const res = await axios.get(`https://localhost:8000/client/${query}/metadata`);
      setResponse(res.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      setError("Failed to fetch metadata. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialClientId) {
      handleFetchMetadata(); // Auto-fetch if client_id is passed in the URL
    }
  }, [initialClientId]);

  return (
    <div className="enhanced-assistance">
      <h1>LucidGPT Enhanced Assistance</h1>
      <div className="chat-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter Client ID"
          className={error ? "input-error" : success ? "input-success" : ""}
          aria-invalid={error ? "true" : "false"}
        />
        <button onClick={handleFetchMetadata} disabled={loading || !query.trim()}>
          {loading ? "Fetching..." : "Get Metadata"}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {success && !error && (
        <div className="response-box">
          {/* Response Content */}
        </div>
      )}
    </div>
  );
};

export default EnhancedAssistance;
