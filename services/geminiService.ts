import { GoogleGenAI, Chat, GenerativeModel } from "@google/genai";
import { RiskLevel } from '../types';

const apiKey = process.env.API_KEY || '';
let ai: GoogleGenAI | null = null;

try {
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }
} catch (error) {
  console.error("Failed to initialize Gemini Client", error);
}

const MODEL_NAME = 'gemini-2.5-flash';

export const createRiskChatSession = (): Chat | null => {
  if (!ai) return null;

  try {
    return ai.chats.create({
      model: MODEL_NAME,
      config: {
        systemInstruction: `You are the EasyWealth Financial Psychologist. Your goal is to determine a user's financial risk tolerance (Low, Moderate, or Aggressive) through a natural, empathetic conversation. 
        Do not ask for a list of numbers. Ask behavioral questions like "How would you feel if your portfolio dropped 20% overnight?" or "Do you prefer stability over high growth?". 
        Keep responses concise (under 50 words). Be encouraging.
        At the end of the conversation, if you have determined the risk profile, explicitly state: "Based on our chat, your risk profile is [RISK_LEVEL]."`,
      },
    });
  } catch (error) {
    console.error("Error creating chat session", error);
    return null;
  }
};

export const getInvestmentAdvice = async (
  riskProfile: RiskLevel,
  goals: string,
  currentSavings: string
): Promise<string> => {
  if (!ai) return "AI Service Unavailable. Please check API Key.";

  const prompt = `
    Act as a senior wealth manager for EasyWealth.
    User Risk Profile: ${riskProfile}
    Current Savings/Portfolio: ${currentSavings}
    Financial Goals: ${goals}

    Provide a concise, actionable investment plan.
    Include specific asset allocation percentages (e.g., Equity, Debt, Gold).
    Suggest 2-3 specific types of instruments (e.g., "Index Funds", "Sovereign Gold Bonds") relevant to the Indian market context if applicable, or general global context otherwise.
    Keep it under 200 words. Format with bullet points.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "Could not generate advice.";
  } catch (error) {
    console.error("Error fetching advice", error);
    return "An error occurred while generating your investment plan.";
  }
};