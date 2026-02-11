
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getWifiAssistance = async (query: string, currentPlanName?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: `You are a helpful WiFi Hotspot Assistant for "SmartWiFi". 
        Our plans are: 
        1. Quick Access (1 hr, 10 KES)
        2. Daily Power (24 hrs, 50 KES)
        3. Weekly Stream (7 days, 250 KES)
        4. Unlimited Home (30 days, 800 KES).
        Payments are processed via Lipana.dev (M-Pesa STK Push).
        Help users choose a plan based on their needs (streaming, gaming, emails).
        Keep responses concise, friendly, and professional. 
        User is currently on: ${currentPlanName || 'No active plan'}.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my brain right now, but I recommend the Daily Power plan for most users!";
  }
};
