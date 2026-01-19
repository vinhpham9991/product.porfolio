
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiResponse = async (userMessage: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: `You are the AI Assistant for PHAM LE VINH's portfolio. 
          Information about Vinh: 
          Name: ${PERSONAL_INFO.name}, 
          Title: ${PERSONAL_INFO.title}, 
          DoB: ${PERSONAL_INFO.dob}, 
          Mobile: ${PERSONAL_INFO.mobile}, 
          Email: ${PERSONAL_INFO.email}, 
          Summary: ${PERSONAL_INFO.summary}. 
          Answer questions about Vinh professionally. Keep answers concise and engaging.` }]
        },
        ...history,
        {
          role: 'user',
          parts: [{ text: userMessage }]
        }
      ],
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The assistant is currently offline. Please contact Vinh directly via email!";
  }
};
