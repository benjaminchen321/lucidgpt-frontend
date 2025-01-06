import React, { useState } from "react";
import axios from "../../utils/axiosConfig";
import LoadingSpinner from "../common/LoadingSpinner"; // Import LoadingSpinner
import "./EnhancedAssistance.css";

const EnhancedAssistance = () => {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
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

    try {
      console.log("query:", { query: query });
      console.log("Payload:", { query: query.trim() });
      
      const response = await axios.post("/assist", { query: query.trim() });
      if (response.data && response.data.answer) {
        setConversation((prev) => [
          ...prev,
          { query, answer: response.data.answer },
        ]);
        setQuery("");
      } else {
        setError("No answer received from the server.");
      }
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
      <p>
        Welcome to LucidGPT Enhanced Assistance! You can ask questions about
        your vehicle, maintenance schedules, or other queries related to Lucid
        Motors. Examples of queries:
      </p>
      <ul className="instruction-list">
        <li>When is my next maintenance appointment?</li>
        <li>What services are available for my car?</li>
        <li>How can I update my contact information?</li>
      </ul>
      <div className="conversation">
        {conversation.map((entry, index) => (
          <div key={index} className="conversation-entry">
            <div className="user-query">
              <strong>You:</strong> {entry.query}
            </div>
            <div className="ai-response">
              <strong>LucidGPT:</strong> {entry.answer}
            </div>
          </div>
        ))}
        {loading && (
          <div className="conversation-entry">
            <div className="ai-response">
              <strong>LucidGPT:</strong> <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleAssist} className="assist-form">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question related to Lucid Motor..."
          required
          rows="3"
        ></textarea>
        <button type="submit" className="assist-button" disabled={loading}>
          {loading ? <LoadingSpinner /> : "Send"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default EnhancedAssistance;
