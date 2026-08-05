import { GoogleGenAI } from "@google/genai";
import { parseAndCalculateMiningPrompt } from "../../src/services/miningEngine";

export default async function handler(req: any, res: any) {
  // CORS headers
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
    const { mode, prompt, payload } = req.body || {};
    const userPrompt = prompt || `Analisis operasional nikel untuk mode: ${mode}`;

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `Anda adalah "MineGPT", AI Assistant Spesialis Operasional Pertambangan Nikel Indonesia.
ATURAN KETAT: Anda HANYA BERHAK MENJAWAB pertanyaan seputar PERTAMBANGAN NIKEL INDONESIA (RKAB Nikel, HPM Nikel, Ore Blending Saprolit/Limonit, Fleet Hauling Nikel, Geoteknik Pit Saprolit, K3LH Tambang Nikel, Smelter RKEF/HPAL). Jika user bertanya di luar topik pertambangan nikel (seperti batubara, emas, resep, koding, politik, dsb), Anda WAJIB MENOLAK DENGAN SOPAN dan menjelaskan bahwa Anda hanya melayani topik pertambangan nikel Indonesia.

Berikan jawaban teknis, mendalam, dan komprehensif seputar pertambangan nikel. Jelaskan rincian kalkulasi teknis (waktu edar, trip/jam, jam kerja efektif, efisiensi, PA/MA, unit cadangan) secara lengkap.`;

        const modelsToTry = ["gemini-3.6-flash", "gemini-flash-latest"];
        for (const modelName of modelsToTry) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: [
                {
                  role: "user",
                  parts: [{ text: `${systemInstruction}\n\n[Mode: ${mode}]\n[Payload: ${JSON.stringify(payload || {})}]\n\nUser Question:\n${userPrompt}` }]
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
                mode,
                modelUsed: modelName,
                result: response.text
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

    // Dynamic Engine Fallback
    const engineRes = parseAndCalculateMiningPrompt(userPrompt, mode);
    return res.status(200).json({
      success: true,
      mode,
      modelUsed: "dynamic-mining-engine",
      result: engineRes.formattedResponse
    });
  } catch (err: any) {
    console.error("Vercel Serverless Function error:", err);
    return res.status(500).json({ error: "Server error", message: err?.message || err });
  }
}
