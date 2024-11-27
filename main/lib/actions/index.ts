import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyDiIIdedn3CkhZSF-uYEBKAcamx-jZKV0E'; // Use environment variables for security

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

/**
 * Fetches AI response using the Google Generative AI SDK.
 * @param {string} input - The user input message to send to AI.
 * @returns {Promise<string>} - The AI-generated response as a string.
 */
export const getAIResponse = async (input: string): Promise<string> => {
  if (!input) {
    throw new Error("Input message is required");
  }

  try {
    // Start a chat session with the AI model
    const chatSession = model.startChat({
      generationConfig,
      history: [], // Add conversation history here if needed
    });

    // Send the input message to the AI
    const result = await chatSession.sendMessage(input);

    // Extract and return the AI-generated response
    return result.response.text() || "No response received.";
  } catch (error) {
    console.error("Error fetching AI response:");

    if (error instanceof Error) {
      console.error("Error Message:", error.message);
      throw new Error("Error while generating AI response");
    } else if (axios.isAxiosError(error)) {
      console.error("Error Response Data:", error.response?.data);
      throw new Error("Error with AI service request");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unknown error occurred");
    }
  }
};
