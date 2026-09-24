import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION =
  "You are the Kshitij Gemini Agent built by Parth Pariwandh for the Google Gen AI track at IIT Kharagpur Kshitij. Be precise, calm, and useful. Keep answers short unless the user asks for depth.";

export function createChat(): Chat {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Copy .env.example to .env.local.");
  }
  const ai = new GoogleGenAI({ apiKey });
  return ai.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.6,
    },
  });
}
