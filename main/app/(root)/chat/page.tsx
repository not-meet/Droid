
"use client";

import React, { useState } from "react";
import { getAIResponse } from "@/lib/actions"; // Adjust path if utils is elsewhere
import { motion } from "framer-motion"; // Animation library for smoother transitions

const ChatPage = () => {
  const [input, setInput] = useState<string>(""); // User input
  const [response, setResponse] = useState<string>(""); // AI response
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [isTyping, setIsTyping] = useState<boolean>(false); // Typing indicator

  // Predefined prompts
  const prompts = [
    "I need a roadmap for becoming a software developer.",
    "I want platforms to learn web development.",
    "How do I improve my problem-solving skills?",
    "Can you suggest some career paths in technology?",
    "What are the top skills for a data scientist?",
    "How to create a standout resume for tech jobs?",
  ];

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

  const handlePromptClick = (prompt: string) => {
    setInput(prevInput => prevInput + " " + prompt); // Append the selected prompt to the input
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        AI Career Guidance Assistant
      </h1>

      {/* Predefined Prompts as List with Numbered Indexes */}
      <div className="space-y-4 mb-6">
        {prompts.map((prompt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center space-x-2"
          >
            <span className="text-blue-600 font-semibold">{index + 1}.</span>
            <span className="text-gray-800">{prompt}</span>
            <motion.button
              onClick={() => handlePromptClick(prompt)}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {index + 1}
            </motion.button>
          </motion.div>
        ))}
      </div>

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
        className={`mt-4 px-6 py-3 rounded-lg text-white text-lg shadow-md transition-all duration-300 ease-in-out ${loading ? "bg-gray-500 cursor-wait" : "bg-blue-600 hover:bg-blue-500"
          }`}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
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
