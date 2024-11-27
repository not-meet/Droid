"use client";

import React, { useState } from "react";
import { getAIResponse } from "@/lib/actions"; // Adjust path if utils is elsewhere
import { motion } from "framer-motion"; // Animation library for smoother transitions

const ChatPage = () => {
  const [input, setInput] = useState<string>(""); // User input
  const [response, setResponse] = useState<string>(""); // AI response
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [isTyping, setIsTyping] = useState<boolean>(false); // Typing indicator

  const handleSubmit = async () => {
    if (!input.trim()) {
      alert("Please enter a query.");
      return;
    }

    setLoading(true); // Start loading
    setIsTyping(true); // Show typing indicator
    try {
      const aiResponse = await getAIResponse(input); // Fetch AI response
      setResponse(aiResponse); // Update the response
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Stop loading
      setIsTyping(false); // Hide typing indicator
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        AI Career Guidance Assistant
      </h1>

      {/* Input Box with Instructions */}
      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your career..."
          className="w-full border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          rows={6}
        />
        <div className="text-gray-500 text-sm">
          <p>Try asking about career paths, resume tips, or interview preparation!</p>
          <p className="mt-2 italic">Examples: "What are the top skills for software developers?" or "How can I improve my resume?"</p>
        </div>
      </div>

      {/* Submit Button with Loading State */}
      <motion.button
        onClick={handleSubmit}
        className={`mt-4 px-6 py-3 rounded-lg text-white text-lg shadow-md transition-all duration-300 ease-in-out ${loading ? "bg-gray-500 cursor-wait" : "bg-blue-500 hover:bg-blue-600"
          }`}
        disabled={loading}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Fetching..." : "Submit"}
      </motion.button>

      {/* AI Response Section with Animations */}
      <motion.div
        className="mt-6 bg-white p-6 rounded-lg shadow-lg space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-bold text-xl text-blue-600">AI Response:</h2>
        <p className="text-gray-700">{isTyping ? "AI is typing..." : response || "The AI's response will appear here."}</p>
      </motion.div>

      {/* Typing Indicator */}
      {isTyping && (
        <div className="text-center mt-4 text-gray-500 text-sm animate-pulse">
          <span>...</span>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
