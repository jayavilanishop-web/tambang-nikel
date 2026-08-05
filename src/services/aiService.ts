import { GoogleGenAI } from "@google/genai";
import { parseAndCalculateMiningPrompt } from "./miningEngine";

// Get optional client-side Gemini key if provided in Vercel environment variables
function getClientGeminiKey(): string | null {
  try {
    const key = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env?.GEMINI_API_KEY : null);
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim().length > 5) {
      return key.trim();
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export async function askMineGPT(params: {
  mode: string;
  prompt: string;
  payload?: any;
}): Promise<string> {
  const { mode, prompt, payload } = params;

  // 1. Try backend API first (works on Express & Vercel Serverless Functions)
  try {
    const res = await fetch("/api/ai/mine-gpt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, prompt, payload })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.result && data.result.trim().length > 0) {
        return data.result;
      }
    }
  } catch (backendErr) {
    console.warn("Backend API endpoint unavailable, trying direct client AI / engine fallback...", backendErr);
  }

  // 2. Client-side Gemini fallback if VITE_GEMINI_API_KEY is defined in Vercel
  const clientKey = getClientGeminiKey();
  if (clientKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: clientKey });
      const systemPrompt = `Anda adalah "MineGPT", AI Assistant Operasional Pertambangan Nikel Indonesia.
ATURAN KETAT: Anda HANYA BERHAK MENJAWAB pertanyaan seputar PERTAMBANGAN NIKEL INDONESIA (RKAB Nikel, HPM Nikel, Ore Blending Saprolit/Limonit, Fleet Hauling Nikel, K3LH Tambang Nikel, Smelter RKEF/HPAL). Jika pertanyaan user di luar topik pertambangan nikel, Anda WAJIB MENOLAK DENGAN SOPAN dan menjelaskan bahwa Anda hanya melayani operasional pertambangan nikel Indonesia.`;
      
      const modelsToTry = ["gemini-3.6-flash", "gemini-flash-latest"];
      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [
              { role: "user", parts: [{ text: `${systemPrompt}\n\nUser query: ${prompt}` }] }
            ],
            config: {
              temperature: 0.3,
              maxOutputTokens: 8192
            }
          });

          if (response.text && response.text.trim().length > 0) {
            return response.text;
          }
        } catch (mErr) {
          console.warn(`Client model ${modelName} call failed:`, mErr);
        }
      }
    } catch (geminiClientErr) {
      console.warn("Client-side Gemini API call failed, using dynamic mining calculation engine...", geminiClientErr);
    }
  }

  // 3. Dynamic Calculation & Mining Intelligence Engine Fallback
  const engineResult = parseAndCalculateMiningPrompt(prompt, mode);
  return engineResult.formattedResponse;
}

export async function askAIChat(params: {
  message: string;
  mineData?: any;
}): Promise<string> {
  const { message, mineData } = params;

  // 1. Try backend API first
  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, mineData })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply && data.reply.trim().length > 0) {
        return data.reply;
      }
    }
  } catch (backendErr) {
    console.warn("Backend /api/ai/chat endpoint unavailable, trying direct client AI / engine fallback...", backendErr);
  }

  // 2. Client-side Gemini fallback
  const clientKey = getClientGeminiKey();
  if (clientKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: clientKey });
      const systemPrompt = `Anda adalah "NickelSmart AI", Asisten Pintar Operasional Tambang Nikel Indonesia berstandar Enterprise.
ATURAN KETAT: Anda HANYA BERHAK MENJAWAB pertanyaan seputar PERTAMBANGAN NIKEL INDONESIA (RKAB Nikel, Blending Ore Saprolit/Limonit, Fleet Dispatch Nikel, HPM Nikel, K3LH Tambang Nikel, Smelter RKEF/HPAL). Jika pertanyaan user di luar topik pertambangan nikel, Anda WAJIB MENOLAK DENGAN SOPAN dan menjelaskan bahwa Anda hanya melayani operasional pertambangan nikel Indonesia.`;

      const modelsToTry = ["gemini-3.6-flash", "gemini-flash-latest"];
      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [
              { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Query: ${message}` }] }
            ],
            config: {
              temperature: 0.3,
              maxOutputTokens: 8192
            }
          });

          if (response.text && response.text.trim().length > 0) {
            return response.text;
          }
        } catch (mErr) {
          console.warn(`Client chat model ${modelName} call failed:`, mErr);
        }
      }
    } catch (geminiClientErr) {
      console.warn("Client-side Gemini API call failed, using dynamic mining calculation engine...", geminiClientErr);
    }
  }

  // 3. Dynamic Calculation Engine Fallback
  const engineResult = parseAndCalculateMiningPrompt(message, "chat");
  return engineResult.formattedResponse;
}
