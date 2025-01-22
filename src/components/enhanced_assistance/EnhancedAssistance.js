import React, { useState } from "react";
// We keep your axios config import if used elsewhere, 
// but we'll use fetch here to handle streaming.
import ReactMarkdown from "react-markdown";
import LoadingSpinner from "../common/LoadingSpinner";

const EnhancedAssistance = () => {
  const [query, setQuery] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const handleAssist = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a valid query.");
      return;
    }

    setLoading(true);
    setError("");

    // **(NEW)** Temporarily add a blank answer to show loading/streaming
    setConversation((prev) => [
      ...prev,
      { query, answer: "" },
    ]);

    try {
      // **(NEW)** Use fetch to stream text instead of axios.post
      const response = await fetch(`${REACT_APP_BACKEND_URL}/assist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: query.trim() }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || "No answer received from the server.");
      } else {
        // **(NEW)** Read the response body as a stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;
        let accumulatedText = "";

        while (!done) {
          const { value, done: isDone } = await reader.read();
          done = isDone;
          if (value) {
            // Decode the current chunk
            const chunk = decoder.decode(value);
            accumulatedText += chunk;

            // Update the last answer in conversation on the fly
            // eslint-disable-next-line no-loop-func
            setConversation((prev) => {
              const updated = [...prev];
              const lastIndex = updated.length - 1;
              // Overwrite the blank or partial answer with the new chunk
              updated[lastIndex] = {
                ...updated[lastIndex],
                answer: accumulatedText,
              };
              return updated;
            });
          }
        }
      }

      setQuery("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
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
              <strong className="text-[#a47b5b]">LucidGPT:</strong> 
              <LoadingSpinner />
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
