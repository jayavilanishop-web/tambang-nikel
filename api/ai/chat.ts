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
ATURAN KETAT: Anda HANYA BERHAK MENJAWAB pertanyaan seputar PERTAMBANGAN NIKEL INDONESIA (RKAB Nikel ESDM, Blending Ore Saprolit/Limonit, Fleet Dispatch Nikel, HPM Nikel, K3LH Tambang Nikel, Smelter RKEF/HPAL). Jika user bertanya di luar topik pertambangan nikel (seperti batubara, emas, resep, koding, politik, dsb), Anda WAJIB MENOLAK DENGAN SOPAN dan menjelaskan bahwa Anda hanya dikhususkan untuk pertambangan nikel Indonesia.

Konstruksi jawaban Anda harus sangat detail, ramah, profesional, dan menyertakan data kalkulasi atau langkah konkret untuk masalah operasional pertambangan nikel.`;

        const modelsToTry = ["gemini-3.6-flash", "gemini-flash-latest"];
        for (const modelName of modelsToTry) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
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
                modelUsed: modelName,
                reply: response.text
              });
            }
          } catch (mErr: any) {
            console.warn(`Model ${modelName} call failed:`, mErr?.message || mErr);
          }
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
