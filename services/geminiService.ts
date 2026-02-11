import { GoogleGenAI } from "@google/genai";

/**
 * Initializes and calls the Gemini API to provide intelligent support for SmartWiFi users.
 * Handles system instructions for troubleshooting, plan explanations, and general usage help.
 */
export const getWifiAssistance = async (userPrompt: string) => {
  // Always use a named parameter to initialize GoogleGenAI.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: `You are the SmartWiFi Assistant for a hotspot service in Kenya. 
        Provide helpful, concise troubleshooting steps for connection issues.
        Explain data plans clearly. 
        The currency is KES (Kenyan Shillings).
        Keep the tone professional yet friendly.
        SmartWiFi features: 1 Hour (10 KES), 24 Hours (50 KES), 7 Days (250 KES), 30 Days (800 KES).`,
        temperature: 0.7,
        topK: 40,
        topP: 0.8
      }
    });

    // Access the .text property directly as it returns the string output.
    return response.text || "I'm sorry, I couldn't process your request right now.";
  } catch (error) {
    console.error("Gemini Assistance Error:", error);
    return "I encountered an error connecting to my services. Please try again or contact support directly.";
  }
};