
import { GoogleGenAI } from "@google/genai";

/**
 * Initializes and calls the Gemini API to provide intelligent support for SmartWiFi users.
 * Uses gemini-3-flash-preview for optimal performance and logic.
 */
export const getWifiAssistance = async (userPrompt: string) => {
  try {
    // Ensure API_KEY exists to avoid crash on initialization
    if (!process.env.API_KEY) {
      console.warn("API Key is missing. Assistant is in demo mode.");
      return "I'm currently in demo mode. Please set up the API key to get live troubleshooting assistance.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the SmartWiFi Assistant for a hotspot service in Kenya. 
        Provide helpful, concise troubleshooting steps for connection issues.
        Explain data plans clearly. 
        The currency is KES (Kenyan Shillings), often called 'Bob'.
        SmartWiFi features: 1 Hour (10 Bob), 24 Hours (50 Bob), 7 Days (250 Bob), 30 Days (800 Bob).
        Payment is simple: The user just selects their preferred plan and clicks the 'Buy' button to pay via Lipana.`,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process your request right now.";
  } catch (error) {
    console.error("Gemini Assistance Error:", error);
    return "The assistant is currently unavailable. Please check the network plans below or contact support.";
  }
};
