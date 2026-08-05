import { GoogleGenAI } from "@google/genai";
import { parseAndCalculateMiningPrompt } from "../../src/services/miningEngine";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, mineData } = req.body || {};
    const userPrompt = message || "Halo NickelSmart AI";

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `Anda adalah "NickelSmart AI", Asisten Pintar Operasional Tambang Nikel Indonesia berstandar Enterprise.
Konstruksi jawaban Anda harus sangat detail, ramah, profesional, dan menyertakan data kalkulasi atau langkah konkret untuk masalah operasional nikel (RKAB ESDM, Blending Ore, Fleet Dispatch, HPM Nikel, K3LH).`;

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: [
            {
              role: "user",
              parts: [{ text: `${systemPrompt}\n\n[Site Context: ${JSON.stringify(mineData || {})}]\n\nPertanyaan User: ${userPrompt}` }]
            }
          ],
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192
          }
        });

        if (response.text && response.text.trim().length > 0) {
          return res.status(200).json({
            success: true,
            modelUsed: "gemini-3.6-flash",
            reply: response.text
          });
        }
      } catch (geminiError: any) {
        console.warn("Vercel Gemini API call issue, using dynamic mining engine fallback:", geminiError?.message || geminiError);
      }
    }

    const engineRes = parseAndCalculateMiningPrompt(userPrompt, "chat");
    return res.status(200).json({
      success: true,
      modelUsed: "dynamic-mining-engine",
      reply: engineRes.formattedResponse
    });
  } catch (err: any) {
    console.error("Vercel Serverless Function error:", err);
    return res.status(500).json({ error: "Server error", message: err?.message || err });
  }
}
