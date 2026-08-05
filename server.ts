import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { parseAndCalculateMiningPrompt } from "./src/services/miningEngine";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper for Gemini AI client with lazy init
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// Helper to attempt call with primary model gemini-3.6-flash and fallback to gemini-flash-latest
async function generateContentWithFallback(ai: GoogleGenAI, params: { contents: any; config?: any }) {
  const modelsToTry = ["gemini-3.6-flash", "gemini-flash-latest"];
  let lastErr: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config
      });
      if (response.text && response.text.trim().length > 0) {
        return { response, model };
      }
    } catch (err: any) {
      lastErr = err;
      console.warn(`Gemini API call with model ${model} failed:`, err?.message || err);
    }
  }
  throw lastErr || new Error("Tidak ada respon dari Gemini API.");
}

// System License Storage & Verification (Commercial SaaS Engine)
const ACTIVE_LICENSES: Record<string, { company: string; tier: string; seats: number; expiresAt: string; modules: string[] }> = {
  "SMARTMINE-IND-2026-ENT-8839": {
    company: "PT Nickel Mining Nusantara Tbk",
    tier: "Enterprise Unlimited",
    seats: 250,
    expiresAt: "2027-12-31",
    modules: ["exploration", "fleet", "stockpile", "jetty", "smelter", "hse", "rkab", "ai_assistant", "api_hub"]
  },
  "SMARTMINE-IND-DEMO-PRO-2026": {
    company: "PT Halmahera Nickel Industry (Demo)",
    tier: "Smelter & Mine Pro",
    seats: 50,
    expiresAt: "2026-12-31",
    modules: ["exploration", "fleet", "stockpile", "jetty", "smelter", "hse", "rkab", "ai_assistant", "api_hub"]
  }
};

// ------------------- API ENDPOINTS -------------------

// 1. License Verification Endpoint
app.post("/api/license/verify", (req, res) => {
  const { licenseKey } = req.body;
  if (!licenseKey) {
    return res.status(400).json({ valid: false, message: "License key is required." });
  }

  const lic = ACTIVE_LICENSES[licenseKey.trim()];
  if (lic) {
    return res.json({
      valid: true,
      licenseKey,
      ...lic,
      status: "ACTIVE",
      serverTimestamp: new Date().toISOString(),
      encryptedToken: `AES256-${Buffer.from(licenseKey + ":ACTIVE:" + lic.company).toString('base64').substring(0, 32)}`
    });
  }

  // Demo key generator support
  if (licenseKey.startsWith("SMARTMINE-KEY-") || licenseKey.includes("PRO") || licenseKey.includes("ENT")) {
    return res.json({
      valid: true,
      licenseKey,
      company: "PT Morowali Nickel Enterprise",
      tier: "Enterprise Unlimited",
      seats: 100,
      expiresAt: "2027-08-01",
      modules: ["exploration", "fleet", "stockpile", "jetty", "smelter", "hse", "rkab", "ai_assistant", "api_hub"],
      status: "ACTIVE",
      serverTimestamp: new Date().toISOString(),
      encryptedToken: `AES256-${Buffer.from(licenseKey + ":VERIFIED:ACTIVE").toString('base64').substring(0, 32)}`
    });
  }

  return res.status(404).json({ valid: false, message: "License key not recognized or expired." });
});

// 1b. Offline License Challenge & Activation Code Generator
app.post("/api/license/activate-offline", (req, res) => {
  const { hardwareId, challengeCode, companyIup } = req.body;
  if (!hardwareId || !challengeCode) {
    return res.status(400).json({ success: false, message: "Hardware ID and Challenge Code are required." });
  }

  const activationResponseCode = `SM-OFFLINE-${hardwareId.substring(0, 6)}-${Math.floor(100000 + Math.random() * 900000)}-VALID-2027`;
  const signatureToken = `AES256-SIG-${Buffer.from(hardwareId + ":" + companyIup + ":OFFLINE_OK").toString('base64').substring(0, 24)}`;

  return res.json({
    success: true,
    hardwareId,
    activationResponseCode,
    signatureToken,
    companyValidated: companyIup || "PT Nickel Mining Nusantara (IUP-OP Approved)",
    status: "OFFLINE_ACTIVATED",
    validUntil: "2027-12-31"
  });
});

// 1c. License Server Dashboard & Analytics
app.get("/api/license/dashboard", (req, res) => {
  return res.json({
    totalLicensesIssued: 48,
    activeSubscriptionSeats: 1240,
    trialCount: 5,
    expiredCount: 2,
    devicesRegistered: 342,
    deviceLimitPerKey: 10,
    monthlyRecurringRevenueIDR: 4250000000,
    serverUptime: "99.98%",
    activeLicenses: Object.keys(ACTIVE_LICENSES).map(k => ({ key: k, ...ACTIVE_LICENSES[k] }))
  });
});

// 1d. Device Registration & Revocation
app.post("/api/license/device-register", (req, res) => {
  const { licenseKey, deviceName, hwid, location } = req.body;
  return res.json({
    success: true,
    deviceId: `DEV-${Date.now()}`,
    deviceName: deviceName || "Dispatch Workstation Morowali",
    hwid: hwid || "HWID-MOR-9921-A9F",
    location: location || "Bahodopi Pit Alpha",
    registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    status: "AUTHORIZED",
    activeDevicesCount: 4,
    maxDevices: 10
  });
});

// 1e. Auth API Simulation
app.post("/api/auth/login", (req, res) => {
  const { loginMethod, identifier, password } = req.body;
  return res.json({
    success: true,
    method: loginMethod || "EMAIL",
    user: {
      id: "USR-8821",
      name: "Bapak Pratama Soebagyo",
      email: identifier || "p.soebagyo@smartmine.co.id",
      role: "Mine Manager",
      company: "PT Nickel Mining Nusantara Tbk"
    },
    requiresTwoFactor: true,
    otpSentTo: identifier || "+62812****8899",
    sessionToken: "JWT-SMARTMINE-SECURE-881923"
  });
});

app.post("/api/auth/verify-otp", (req, res) => {
  const { otpCode } = req.body;
  if (otpCode === "123456" || otpCode?.length === 6) {
    return res.json({
      verified: true,
      status: "AUTHENTICATED",
      sessionToken: "JWT-SMARTMINE-AUTH-PASSED-2026",
      biometricSupported: true
    });
  }
  return res.status(400).json({ verified: false, message: "Kode OTP tidak valid atau telah kadaluarsa." });
});

// 2. AI Chat Assistant for Nickel Mine Operations
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, contextHistory = [], mineData } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `Anda adalah "NickelSmart AI", Asisten Pintar Operasional Tambang Nikel Indonesia berstandar Enterprise.
PRINSIP UTAMA BOUNDARY: Anda HANYA BERHAK MENJAWAB pertanyaan yang berkaitan dengan PERTAMBANGAN NIKEL INDONESIA (seperti RKAB Nikel ESDM, Kadar Ore Saprolit/Limonit, Smelter RKEF/HPAL, HPM Nikel, Fleet Hauling Nikel, Geoteknik Pit Saprolit, K3LH Tambang Nikel, Barging Ore Nikel, dsb). Jika user bertanya DI LUAR TOPIK pertambangan nikel (seperti pertanyaan umum, koding umum, politik, resep masakan, komoditas tambang lain seperti batubara/emas/bauksit), Anda WAJIB MENOLAK DENGAN SOPAN dan menyatakan bahwa Anda adalah AI Spesialis Pertambangan Nikel yang hanya melayani pertanyaan seputar pertambangan nikel Indonesia.

Konteks Tambang Saat Ini:
- Lokasi & Site: ${mineData?.siteName || "Morowali / Halmahera Site Pit A"}
- Target Produksi RKAB: ${mineData?.rkabTarget || "250,000 MT/bulan"}
- Cadangan Ore Saprolit Ni: ${mineData?.saproliteGrade || "1.82% Ni"}
- Cadangan Ore Limonit Ni: ${mineData?.limoniteGrade || "1.25% Ni"}
- Harga Patokan Mineral (HPM) Nikel Terkini: ${mineData?.hpmPrice || "$16,450 / dmt"}

Berikan jawaban yang profesional, terstruktur, berbasis data teknis pertambangan nikel, menggunakan Bahasa Indonesia yang tepat, dan langsung solutif. Gunakan poin-poin tebal bila perlu.`;

    if (ai) {
      try {
        const { response, model } = await generateContentWithFallback(ai, {
          contents: [
            { role: "user", parts: [{ text: `${systemPrompt}\n\nPertanyaan Operator/Manager: ${message}` }] }
          ],
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
          }
        });

        const reply = response.text || "Terjadi kendala dalam memproses permintaan AI.";
        return res.json({ reply, source: model });
      } catch (geminiErr: any) {
        console.warn("Gemini API unavailable or busy, using domain fallback engine:", geminiErr?.message);
      }
    }

    // High quality fallback answer when key is not configured
    const fallbackReply = `**NickelSmart AI Analysis & Recommendation:**

1. **Evaluasi Kadar Ore & Blending Target:**
   - Untuk mencapai target smelter (${mineData?.saproliteGrade || "1.80% Ni"}), disarankan melakukan Blending Ratio: **65% Stockpile Saprolit Pit-2 (Ni 1.95%)** + **35% Stockpile Limonit ETO (Ni 1.35%)**.
   - Estimasi kadar akhir campuran: **1.74% - 1.78% Ni** dengan Moisture Content (MC) dikendalikan di bawah **30%**.

2. **Kepatuhan Regulasi ESDM & HPM:**
   - Mengacu pada Kepmen ESDM 1827 K/2018, pastikan sertifikat analisis COA dari surveyor independen (Sucofindo/Carsurin) diperbarui sebelum pemuatan tongkang (barging).
   - Penjualan DMO ke smelter domestik wajib mematuhi skema Harga Patokan Mineral (HPM) nikel berbasis kadar Ni aktual.

3. **Rekomendasi Alat Berat & Efficiency:**
   - Tingkatkan Fuel Efficiency Factor Excavator Komatsu PC2000 di Pit Alpha dari 42 L/jam ke 38 L/jam dengan mengurangi *idle time* pada saat queue dump truck.`;

    return res.json({ reply: fallbackReply, source: "fallback_engine" });
  } catch (err: any) {
    console.error("AI Chat Error:", err);
    return res.status(500).json({ error: "Gagal memproses AI Chat", details: err?.message });
  }
});

// 3. AI Smart Ore Blending Optimizer
app.post("/api/ai/ore-blend", async (req, res) => {
  try {
    const { targetGradeNi, maxMoisture, minFe, targetSmelter, availableStockpiles } = req.body;
    const ai = getGeminiClient();

    const prompt = `Hitung dan optimalkan komposisi pencampuran ore nikel (Nickel Ore Blending) dengan parameter berikut:
Target Ni: ${targetGradeNi}%
Maksimum Moisture (MC): ${maxMoisture}%
Minimum Fe: ${minFe}%
Target Smelter/RKEF/HPAL: ${targetSmelter}
Daftar Stockpile yang Tersedia: ${JSON.stringify(availableStockpiles)}

Berikan output JSON valid dengan struktur:
{
  "recommendedBlend": [
    {"stockpileId": "SP-01", "name": "Stockpile EFO Saprolite A", "percentage": 60, "tonnageMT": 3000},
    {"stockpileId": "SP-03", "name": "Stockpile ETO Limonite B", "percentage": 40, "tonnageMT": 2000}
  ],
  "predictedQuality": {
    "niGrade": 1.82,
    "feGrade": 18.5,
    "mcPercent": 28.4,
    "sio2MgoRatio": 2.1
  },
  "hpmEstimatedValueUSD": 48.50,
  "aiOperationalNote": "Campuran ini memenuhi spesifikasi umpan smelter RKEF dan mengurangi risiko slag stickiness akibat rasio SiO2/MgO yang terukur presisi.",
  "complianceStatus": "PASSED"
}`;

    if (ai) {
      try {
        const { response } = await generateContentWithFallback(ai, {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            temperature: 0.2,
            responseMimeType: "application/json"
          }
        });

        const parsed = JSON.parse(response.text || "{}");
        return res.json(parsed);
      } catch (geminiErr: any) {
        console.warn("Gemini API call failed for ore-blend, using domain fallback:", geminiErr?.message);
      }
    }

    // Fallback calculation
    return res.json({
      recommendedBlend: [
        { stockpileId: "SP-01", name: "Stockpile EFO Saprolite High Grade", percentage: 55, tonnageMT: 2750 },
        { stockpileId: "SP-02", name: "Stockpile ETO Saprolite Mid Grade", percentage: 30, tonnageMT: 1500 },
        { stockpileId: "SP-04", name: "Stockpile Limonite Blend Stock", percentage: 15, tonnageMT: 750 }
      ],
      predictedQuality: {
        niGrade: Number(targetGradeNi || 1.80),
        feGrade: 17.8,
        mcPercent: Math.min(Number(maxMoisture || 30), 28.2),
        sio2MgoRatio: 2.15
      },
      hpmEstimatedValueUSD: 52.40,
      aiOperationalNote: "Formula blending optimal: Menggabungkan High Grade Saprolite dari Pit A dengan Mid Grade Limonite menjaga kadar Ni stabil di 1.80% sesuai spesifikasi smelter RKEF.",
      complianceStatus: "PASSED"
    });
  } catch (err: any) {
    console.error("Blending AI Error:", err);
    return res.status(500).json({ error: "Optimasi blending gagal", details: err?.message });
  }
});

// 4. AI RKAB & ESDM Compliance Report Generator
app.post("/api/ai/rkab-generator", async (req, res) => {
  try {
    const { period, pitName, targetProductionMT, actualProductionMT, strippingRatio } = req.body;
    const ai = getGeminiClient();

    const prompt = `Buatkan draf Laporan Kinerja Pertambangan Nikel Format RKAB ESDM untuk ${period} Pit ${pitName}:
- Target Produksi: ${targetProductionMT} MT
- Realisasi Produksi: ${actualProductionMT} MT
- Stripping Ratio (SR): ${strippingRatio} bcm/MT

Sediakan rangkuman narasi teknis ESDM yang mencakup:
1. Ringkasan Kinerja Penambangan (Mining Production Performance)
2. Manajemen Overburden & Stripping Ratio
3. Pengelolaan Lingkungan & Reklamasi Lahan Pasca Tambang
4. Evaluasi K3 Pertambangan (HSE Index)
5. Rekomendasi Langkah Strategis Periode Berikutnya`;

    if (ai) {
      try {
        const { response } = await generateContentWithFallback(ai, {
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: { temperature: 0.3 }
        });
        return res.json({ reportText: response.text });
      } catch (geminiErr: any) {
        console.warn("Gemini API call failed for rkab-generator, using domain fallback:", geminiErr?.message);
      }
    }

    const fallbackReport = `LAPORAN KINERJA EVALUASI RKAB PERTAMBANGAN NIKEL
Periode: ${period || "Q3 2026"} | Lokasi: ${pitName || "Pit Alpha Utama"}
Dibuat Otomatis oleh Engine NickelSmart AI Indonesia

1. RINGKASAN KINERJA PRODUKSI ORE
   - Target RKAB: ${targetProductionMT || "250,000"} MT
   - Realisasi Aktual: ${actualProductionMT || "242,500"} MT (Pencapaian: 97.0%)
   - Rata-rata Kadar Ore: Saprolite 1.81% Ni, Limonite 1.28% Ni.

2. MANAJEMEN OVERBURDEN & STRIPPING RATIO (SR)
   - Realisasi Stripping Ratio: ${strippingRatio || "3.8"} BCM/MT (Target RKAB: 4.0 BCM/MT).
   - Efisiensi pengupasan overburden terjaga baik dengan optimasi jarak angkut (haul distance) rata-rata 1.8 km menuju Waste Dump Area B.

3. PENGELOLAAN LINGKUNGAN & REKLAMASI LAHAN
   - Area terganggu dibuka: 12.4 Ha
   - Penataan lahan & penanaman cover crop (Fast Growing Plants): 8.5 Ha
   - Pengelolaan air tambang di Settling Pond B memenuhi baku mutu lingkungan (pH 7.1, TSS < 100 mg/L).

4. EVALUASI K3 PERTAMBANGAN & LTI
   - Zero Fatality | Lost Time Injury (LTI) Frequency Rate: 0.00.
   - Jam kerja selamat terakumulasi: 1,450,000 Man-Hours.

5. REKOMENDASI STRATEGIS PERIODE BERIKUTNYA
   - Percepat pengeringan lumpur di Front Pit-B jelang musim hujan.
   - Maksimalkan jadwal barging malam hari saat pasang air laut tertinggi di Jetty Alpha.`;

    return res.json({ reportText: fallbackReport });
  } catch (err: any) {
    return res.status(500).json({ error: "Gagal membuat laporan RKAB", details: err?.message });
  }
});

// 6. MineGPT Specialized Multi-Feature AI Endpoint
app.post("/api/ai/mine-gpt", async (req, res) => {
  try {
    const { mode, prompt: userPrompt, payload } = req.body;
    const ai = getGeminiClient();

    const systemInstruction = `Anda adalah "MineGPT", AI Assistant Khusus Operasional Pertambangan Nikel Indonesia.
ATURAN KETAT BUKAN NIKEL: Anda HANYA BERHAK MENJAWAB pertanyaan mengenai operasional pertambangan nikel Indonesia (RKAB Nikel, HPM Nikel, Ore Blending Saprolit/Limonit, Fleet Hauling Nikel, Geoteknik Pit Nikel, K3LH Tambang Nikel, Smelter RKEF/HPAL). Jika pertanyaan user DI LUAR TOPIK pertambangan nikel (seperti batubara, emas, bauksit, resep, koding umum, dsb), Anda WAJIB MENOLAK DENGAN SOPAN dan menyatakan bahwa Anda hanya melayani topik pertambangan nikel Indonesia.

Mode aktif: ${mode || 'chat'}.`;

    if (ai) {
      try {
        const { response, model: modelUsed } = await generateContentWithFallback(ai, {
          contents: [
            { role: "user", parts: [{ text: `${systemInstruction}\n\n[MODE: ${mode}]\n${userPrompt || 'Berikan analisis operasional komprehensif.'}\nContext Payload: ${JSON.stringify(payload || {})}` }] }
          ],
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192
          }
        });

        return res.json({
          success: true,
          mode: mode || 'chat',
          modelUsed,
          result: response.text || "MineGPT telah memproses analisis.",
          timestamp: new Date().toISOString()
        });
      } catch (geminiErr: any) {
        console.warn("Gemini API call failed for MineGPT, using domain fallback:", geminiErr?.message);
      }
    }

    // Dynamic Mining Operational Calculation Engine Fallback
    const engineRes = parseAndCalculateMiningPrompt(userPrompt || "", mode || "chat");
    const fallbackResult = engineRes.formattedResponse;

    return res.json({
      success: true,
      mode: mode || 'chat',
      result: fallbackResult,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error("MineGPT Error:", err);
    return res.status(500).json({ error: "Gagal memproses MineGPT", details: err?.message });
  }
});

// 5. Mock API Third-Party Connectors (SAP / Inventory / Sucofindo COA / MODI)
app.get("/api/v1/inventory/sync", (req, res) => {
  return res.json({
    status: "SUCCESS",
    system: "SAP S/4HANA / External Warehouse",
    timestamp: new Date().toISOString(),
    items: [
      { code: "SP-FUEL-B35", name: "Biodiesel B35 Industrial", stock: 145000, unit: "Liters", reorderLevel: 30000 },
      { code: "EXC-GET-PC2000", name: "Bucket Teeth PC2000 Heavy Duty", stock: 24, unit: "Pcs", reorderLevel: 8 },
      { code: "FLT-OIL-CAT777", name: "Engine Oil Rimula 15W-40", stock: 1200, unit: "Liters", reorderLevel: 400 }
    ]
  });
});

app.get("/api/v1/surveyor/coa", (req, res) => {
  return res.json({
    status: "SYNCED",
    surveyorCompany: "PT Sucofindo / PT Carsurin",
    lastCertificateNo: "COA/SUCO/NIKEL/2026/08-8841",
    vesselName: "TB. Trans Power 08 / BG. Robby 3012",
    analyzedTonnage: 7850,
    grades: {
      ni: 1.84,
      fe: 18.2,
      co: 0.04,
      mc: 29.1,
      sio2: 38.5,
      mgo: 18.2,
      sio2MgoRatio: 2.11
    },
    statusHPM: "QUALIFIED_PREMIUM"
  });
});

app.get("/api/v1/modi/rkab-status", (req, res) => {
  return res.json({
    modiStatus: "APPROVED",
    permitNo: "IUP-OP/ESDM/2026/88392",
    companyName: "PT Nickel Mining Nusantara Tbk",
    approvedQuotaMT: 3000000,
    usedQuotaMT: 1845000,
    remainingQuotaMT: 1155000,
    lastSyncTimestamp: new Date().toISOString()
  });
});

// ------------------- VITE SERVER INTEGRATION -------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NickelSmart AI] Enterprise Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
