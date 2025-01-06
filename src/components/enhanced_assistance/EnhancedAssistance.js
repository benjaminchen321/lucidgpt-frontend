import React, { useState } from "react";
import axios from "../../utils/axiosConfig";
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "../common/LoadingSpinner";

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
    <div className="max-w-screen-lg mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-[#a47b5b] mb-6">LucidGPT Assistance</h2>
      <p className="text-gray-700 mb-4">
        Welcome to LucidGPT! Ask any questions about Lucid Motors, including vehicles, maintenance, and more. Examples:
      </p>
      <ul className="list-disc list-inside text-gray-800 mb-6">
        <li>What are the features of the latest Lucid vehicles?</li>
        <li>Where can I find a Lucid service center near me?</li>
        <li>What are the benefits of Lucid's battery technology?</li>
      </ul>
      <div className="space-y-4 mb-6">
        {conversation.map((entry, index) => (
          <div key={index} className="p-4 bg-gray-50 shadow rounded-lg">
            <div className="mb-2">
              <strong className="text-[#a47b5b]">You:</strong> {entry.query}
            </div>
            <div>
              <strong className="text-[#a47b5b]">LucidGPT:</strong>
              <ReactMarkdown className="markdown mt-2 text-gray-800">
                {entry.answer}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="p-4 bg-gray-50 shadow rounded-lg">
            <div>
              <strong className="text-[#a47b5b]">LucidGPT:</strong> <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleAssist} className="space-y-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask your question related to Lucid Motors..."
          required
          rows="3"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a47b5b] focus:border-[#a47b5b]"
        ></textarea>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#a47b5b] text-white font-semibold rounded-lg shadow hover:bg-[#7b5b42] focus:outline-none focus:ring-2 focus:ring-[#a47b5b] focus:ring-offset-1"
          disabled={loading}
        >
          {loading ? <LoadingSpinner /> : "Send"}
        </button>
      </form>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default EnhancedAssistance;
