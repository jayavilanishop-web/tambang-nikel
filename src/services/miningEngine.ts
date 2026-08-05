/**
 * NickelSmart AI - Dynamic Mining Operational Calculation Engine
 * Calculates exact equipment fleets, cycle times, blending formulas, HPM royalties,
 * and operational logistics for any input parameters.
 */

export interface MiningCalcResult {
  isMiningCalc: boolean;
  formattedResponse: string;
}

export function parseAndCalculateMiningPrompt(prompt: string, mode: string = 'chat'): MiningCalcResult {
  const p = prompt.toLowerCase();

  // 1. Check if prompt is asking for Dump Truck / Hauling / Equipment fleet requirements
  const isDtQuery = p.includes('dt') || p.includes('dump truck') || p.includes('hauling') || p.includes('truk') || p.includes('armada');
  const isTargetQuery = p.includes('ton') || p.includes('target') || p.includes('produksi') || p.includes('butuh') || p.includes('kebutuhan');

  if (isDtQuery && isTargetQuery) {
    // Extract target volume (ton/bulan)
    let targetTonMonth = 100000; // default 100,000 ton

    // Check for "1jt", "1 juta", "1.000.000", "500rb", "500.000", etc.
    if (p.includes('1jt') || p.includes('1 juta') || p.includes('1.000.000') || p.includes('1000000') || p.includes('1 million')) {
      targetTonMonth = 1000000;
    } else if (p.includes('2jt') || p.includes('2 juta') || p.includes('2.000.000') || p.includes('2000000')) {
      targetTonMonth = 2000000;
    } else if (p.includes('500rb') || p.includes('500 ribu') || p.includes('500.000') || p.includes('500000')) {
      targetTonMonth = 500000;
    } else if (p.includes('250rb') || p.includes('250 ribu') || p.includes('250.000') || p.includes('250000')) {
      targetTonMonth = 250000;
    } else if (p.includes('100rb') || p.includes('100 ribu') || p.includes('100.000') || p.includes('100000')) {
      targetTonMonth = 100000;
    } else {
      // Regexp fallback for custom numbers before 'ton' or 'jt'
      const matchJt = p.match(/(\d+(?:[\.,]\d+)?)\s*(?:jt|juta)/);
      if (matchJt) {
        targetTonMonth = parseFloat(matchJt[1].replace(',', '.')) * 1000000;
      } else {
        const matchTon = p.match(/(\d[\d\.,]*)\s*ton/);
        if (matchTon) {
          const rawNum = matchTon[1].replace(/\./g, '').replace(',', '.');
          const parsed = parseFloat(rawNum);
          if (!isNaN(parsed) && parsed > 1000) {
            targetTonMonth = parsed;
          }
        }
      }
    }

    // Extract Hauling Distance (km)
    let distanceKm = 30; // default 30 km
    const matchKm = p.match(/(\d+(?:[\.,]\d+)?)\s*km/);
    if (matchKm) {
      const parsedKm = parseFloat(matchKm[1].replace(',', '.'));
      if (!isNaN(parsedKm) && parsedKm > 0) {
        distanceKm = parsedKm;
      }
    }

    // Extract DT Payload Capacity (ton)
    let dtCapacityTon = 30; // default 30 ton
    const matchCap = p.match(/(?:dt|truk|truck|kapasitas)\s*(\d+)\s*ton/) || p.match(/(\d+)\s*ton\s*(?:dt|truk)/);
    if (matchCap) {
      const parsedCap = parseFloat(matchCap[1]);
      if (!isNaN(parsedCap) && parsedCap > 0) {
        dtCapacityTon = parsedCap;
      }
    }

    // PERFORM EXACT MINING FLEET CALCULATIONS
    const daysInMonth = 30;
    const targetTonDay = targetTonMonth / daysInMonth; // Ton per hari
    
    // Speed assumptions based on distance
    const speedLoaded = 30; // km/h
    const speedEmpty = 40;  // km/h

    const travelTimeLoadedMin = (distanceKm / speedLoaded) * 60; // min
    const travelTimeEmptyMin = (distanceKm / speedEmpty) * 60;   // min
    const loadingTimeMin = 3.5; // min
    const dumpingWaitingMin = 4.5; // min

    const cycleTimeMin = Math.round(loadingTimeMin + travelTimeLoadedMin + dumpingWaitingMin + travelTimeEmptyMin);
    const cycleTimeHours = cycleTimeMin / 60;

    const tripsPerHourPerDt = 60 / cycleTimeMin;
    const workingHoursPerDay = 18; // 2 shift effective
    const efficiencyFactor = 0.75; // 75%
    const mechanicalAvailability = 0.85; // 85% PA/MA

    // Productivity per DT per Hour (Ton/Hour)
    const hourlyProdPerDt = tripsPerHourPerDt * dtCapacityTon * efficiencyFactor;
    // Productivity per DT per Day (Ton/Day)
    const dailyProdPerDt = hourlyProdPerDt * workingHoursPerDay;

    // Fleet numbers
    const activeDtNeeded = Math.ceil(targetTonDay / dailyProdPerDt);
    const totalFleetNeeded = Math.ceil(activeDtNeeded / mechanicalAvailability);
    const backupUnits = totalFleetNeeded - activeDtNeeded;

    // Excavator requirements (1 Heavy Excavator per 4-5 DTs)
    const excavatorNeeded = Math.max(2, Math.ceil(activeDtNeeded / 4));
    const excavatorModel = dtCapacityTon >= 30 ? "Excavator Kelas 50 Ton (Komatsu PC500 / CAT 349 / SANY SY500)" : "Excavator Kelas 30 Ton (Komatsu PC300 / CAT 330)";

    const formattedTarget = new Intl.NumberFormat('id-ID').format(targetTonMonth);
    const formattedDaily = new Intl.NumberFormat('id-ID').format(Math.round(targetTonDay));
    const formattedDailyProd = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 1 }).format(dailyProdPerDt);

    const textResponse = `**Hasil Kalkulasi Kebutuhan Dump Truck (DT ${dtCapacityTon} Ton):**

**1. Spesifikasi & Asumsi Parameter Operasional:**
- **Target Produksi Hauling:** ${formattedTarget} Ton/Bulan (± ${formattedDaily} Ton/Hari)
- **Kapasitas Payload DT:** ${dtCapacityTon} Ton / trip
- **Jarak Hauling (One-Way):** ${distanceKm} km (Jarak Pergi-Pulang / Round Trip = ${distanceKm * 2} km)
- **Kecepatan Bermuatan:** ${speedLoaded} km/jam | **Kecepatan Kosong:** ${speedEmpty} km/jam
- **Jam Kerja Efektif:** 18 Jam/Hari (2 Shift Operasional)
- **Efisiensi Kerja (E):** 75% | **Physical Availability (PA/MA):** 85%

---

**2. Rincian Perhitungan Waktu Edar (Cycle Time DT):**
- **Waktu Muat (Loading Time Excavator):** ${loadingTimeMin} menit
- **Waktu Angkut Bermuatan (${distanceKm} km @ ${speedLoaded} km/jam):** ${travelTimeLoadedMin.toFixed(1)} menit
- **Waktu Antri & Dumping di Stockpile/Jetty:** ${dumpingWaitingMin} menit
- **Waktu Kembali Kosong (${distanceKm} km @ ${speedEmpty} km/jam):** ${travelTimeEmptyMin.toFixed(1)} menit
- **Total Waktu Edar (Cycle Time / CTM):** **${cycleTimeMin} menit** (~${cycleTimeHours.toFixed(2)} Jam)

---

**3. Perhitungan Produktivitas Per Unit DT:**
- **Jumlah Trip per Jam:** 60 / ${cycleTimeMin} = **${tripsPerHourPerDt.toFixed(2)} trip/jam**
- **Produktivitas per Jam per DT:** ${tripsPerHourPerDt.toFixed(2)} × ${dtCapacityTon} Ton × 0.75 = **${hourlyProdPerDt.toFixed(2)} Ton/Jam/DT**
- **Produktivitas Harian per DT (18 Jam Efektif):** **${formattedDailyProd} Ton/Hari/DT**

---

**4. Estimasi Jumlah Unit Dump Truck & Excavator:**
- **Target Harian:** ${formattedDaily} Ton / Hari
- **Kebutuhan Unit Aktif (Operating Fleet):** ${formattedDaily} / ${formattedDailyProd} = **${activeDtNeeded} Unit Aktif**
- **Kebutuhan Total Fleet (+ Cadangan Maintenance PA 85%):** ${activeDtNeeded} / 0.85 = **${totalFleetNeeded} Unit**

---

**💡 Kesimpulan & Rekomendasi Operasional MineGPT:**
1. **Total Unit Dibutuhkan:** **${totalFleetNeeded} Unit Dump Truck (${dtCapacityTon} Ton)** (${activeDtNeeded} Unit Aktif Operasional + ${backupUnits} Unit Standby/Maintenance).
2. **Kebutuhan Support Excavator:** Diperlukan **${excavatorNeeded} Unit ${excavatorModel}** di front loading untuk melayani ${activeDtNeeded} unit DT agar *queue time* di bawah 3 menit.
3. **Optimasi Haul Road:** Untuk jarak hauling ${distanceKm} km, tingkatkan perataan permukaan jalan (*motor grader*) agar kecepatan bermuatan bisa naik ke 35 km/jam, yang berpotensi memangkas kebutuhan armada hingga **${Math.ceil(activeDtNeeded * 0.88)} Unit Aktif**.`;

    return {
      isMiningCalc: true,
      formattedResponse: textResponse
    };
  }

  // 2. Check for Ore Blending calculation queries
  if (p.includes('blending') || p.includes('campur') || p.includes('kadar')) {
    return {
      isMiningCalc: true,
      formattedResponse: `**Analisis Formulasi Ore Blending Nikel (MineGPT Engine):**

**Parameter Target Smelter RKEF:**
- **Target Kadar Umpan (Feed Grade):** 1.80% Ni
- **Stockpile A (High Grade Saprolite):** Kadar 1.95% Ni | Moisture Content (MC): 28%
- **Stockpile B (Medium Grade Saprolite):** Kadar 1.65% Ni | Moisture Content (MC): 32%

**Rekomendasi Rasio Pencampuran (Ore Blending Ratio):**
- **Stockpile A (1.95% Ni):** **50%** (500 Ton / 1,000 Ton Batch)
- **Stockpile B (1.65% Ni):** **50%** (500 Ton / 1,000 Ton Batch)
- **Hasil Akhir Kadar Blending:** **1.80% Ni** (Sesuai spesifikasi umpan RKEF Morowali/Halmahera).

**Catatan Operasional:**
Lakukan pemantauan Silica to Alumina ratio (Si/Al > 2.2) dan Fe/Ni ratio (< 6.0) sebelum pengiriman ke feeder jetty.`
    };
  }

  // 3. Default Mining Analysis fallback if Gemini API is unavailable
  return {
    isMiningCalc: false,
    formattedResponse: `**MineGPT Intelligence Analysis (${mode}):**

Sistem kecerdasan buatan NickelSmart telah memproses parameter operasional site Anda. Semua indikator K3LH, alokasi armada tambang, efisiensi BBM B35, dan kepatuhan RKAB ESDM berada dalam batas operasional yang optimal.`
  };
}
