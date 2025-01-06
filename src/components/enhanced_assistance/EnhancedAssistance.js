// frontend/src/components/enhanced_assistance/EnhancedAssistance.js

import React, { useState } from "react";
import axios from "../../utils/axiosConfig";
import LoadingSpinner from "../common/LoadingSpinner"; // Import LoadingSpinner
import "./EnhancedAssistance.css";

const EnhancedAssistance = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAssist = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a valid query.");
      return;
    }
    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await axios.post("/assist", { query });
      setAnswer(response.data.answer);
    } catch (err) {
      if (err.response && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError("An error occurred while fetching assistance.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enhanced-assistance">
      <h2>LucidGPT Enhanced Assistance</h2>
      <form onSubmit={handleAssist}>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question related to Lucid Motor..."
          required
          rows="4"
        ></textarea>
        <button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Get Assistance"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {answer && (
        <div className="assist-answer">
          <h3>Answer:</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedAssistance;
