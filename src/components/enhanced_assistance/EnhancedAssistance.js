import React, { useState } from "react";
import axios from "../../utils/axiosConfig";
import ReactMarkdown from "react-markdown"; // Import ReactMarkdown for Markdown rendering
import LoadingSpinner from "../common/LoadingSpinner";
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
    <div className="enhanced-assistance max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg" style={{marginTop: "13vh"}}>
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        LucidGPT Enhanced Assistance
      </h2>
      <p className="mb-4 text-gray-600">
        Welcome to LucidGPT Enhanced Assistance! You can ask questions about
        your vehicle, maintenance schedules, or other queries related to Lucid
        Motors. Examples of queries:
      </p>
      <ul className="instruction-list list-disc list-inside text-gray-800 mb-6">
        <li className="mb-2">What are the features of the latest Lucid vehicle models?</li>
        <li className="mb-2">How does Lucid compare with other electric car manufacturers?</li>
        <li className="mb-2">What are the benefits of Lucid's battery technology?</li>
        <li className="mb-2">Where can I find a Lucid service center near me?</li>
      </ul>
      <div className="conversation space-y-4 mb-6">
        {conversation.map((entry, index) => (
          <div
            key={index}
            className="conversation-entry p-4 bg-gray-50 shadow rounded-lg"
          >
            <div className="user-query mb-2">
              <strong className="text-blue-600">You:</strong> {entry.query}
            </div>
            <div className="ai-response">
              <strong className="text-blue-600">LucidGPT:</strong>
              <ReactMarkdown className="markdown mt-2 text-gray-800">
                {entry.answer}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="conversation-entry p-4 bg-gray-50 shadow rounded-lg">
            <div className="ai-response">
              <strong className="text-blue-600">LucidGPT:</strong> <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleAssist} className="assist-form space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question related to Lucid Motor..."
          required
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Send"}
        </button>
      </form>
      {error && (
        <div className="error-message mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default EnhancedAssistance;
