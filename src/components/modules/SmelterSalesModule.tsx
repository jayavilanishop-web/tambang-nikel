import React, { useState } from 'react';
import { Coins, TrendingUp, Calculator, ShieldCheck, DollarSign, ArrowRight, FileText } from 'lucide-react';
import { HPMPriceBenchmark, Language } from '../../types';
import { calculateHPM, formatIDR, formatUSD } from '../../utils/hpmCalculator';

interface SmelterSalesModuleProps {
  hpm: HPMPriceBenchmark;
  language: Language;
}

export const SmelterSalesModule: React.FC<SmelterSalesModuleProps> = ({
  hpm,
  language
}) => {
  const [calcHma, setCalcHma] = useState(16450);
  const [calcNi, setCalcNi] = useState(1.80);
  const [calcMc, setCalcMc] = useState(29.0);
  const [calcTonnage, setCalcTonnage] = useState(7800);

  const calcResult = calculateHPM({
    hmaUSDPerDMT: calcHma,
    niGradePercent: calcNi,
    moisturePercent: calcMc,
    tonnageMT: calcTonnage
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Penjualan Smelter & Regulasi ESDM
            </span>
            <span className="text-slate-400 text-xs">• Harga Patokan Mineral (HPM) & Royalty PNBP</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Kalkulator HPM Nikel & Pemenuhan DMO Smelter' : 'ESDM HPM Nickel Benchmark & DMO Sales Engine'}
          </h2>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-300 font-semibold shrink-0">
          DMO Quota Compliance: <strong className="text-emerald-400 font-extrabold">{hpm.dmoComplianceRatePercent}%</strong>
        </div>
      </div>

      {/* Main Interactive Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form Controls */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4 text-purple-400" />
              <span>Input Parameter Transaksi Ore</span>
            </h3>
            <p className="text-xs text-slate-400">Formula resmi Kepmen ESDM No. 294.K/2020</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Harga Mineral Acuan (HMA Nikel $/dmt):</label>
              <input
                type="number"
                value={calcHma}
                onChange={(e) => setCalcHma(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Kadar Ni (Nickel %):</label>
              <input
                type="number"
                step="0.05"
                value={calcNi}
                onChange={(e) => setCalcNi(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Moisture Content (MC %):</label>
              <input
                type="number"
                step="0.5"
                value={calcMc}
                onChange={(e) => setCalcMc(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Volume Pengiriman (MT):</label>
              <input
                type="number"
                value={calcTonnage}
                onChange={(e) => setCalcTonnage(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Right 2 Cols Result Breakdown */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 border border-purple-500/40 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Hasil Kalkulasi Harga HPM & Estimasi Pendapatan</h3>
              <p className="text-xs text-slate-400">Rincian Gross Value, Royalti PNBP & Net Revenue</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/40">
              {calcResult.isSaprolite ? 'Saprolite Grade (RKEF)' : 'Limonite Grade (HPAL)'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] block">Harga Patokan HPM per dmt:</span>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono">{formatUSD(calcResult.hpmPriceUSDPerDMT)}</p>
              <span className="text-[11px] text-slate-500 block">Atau {formatIDR(calcResult.hpmPriceIDRPerMT)} / MT</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] block">Total Nilai Bruto Transaksi:</span>
              <p className="text-2xl font-extrabold text-slate-100 font-mono">{formatUSD(calcResult.totalGrossValueUSD)}</p>
              <span className="text-[11px] text-slate-500 block">Est. IDR: {formatIDR(calcResult.totalGrossValueIDR)}</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Royalti PNBP Kas Negara ({calcResult.royaltyPnbpPercent}%):</span>
              <strong className="text-rose-400 font-mono text-sm">{formatUSD(calcResult.royaltyPnbpUSD)} ({formatIDR(calcResult.royaltyPnbpIDR)})</strong>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-200 font-bold">Pendapatan Bersih Perusahaan (Net Revenue):</span>
              <strong className="text-emerald-400 font-mono text-base font-extrabold">{formatUSD(calcResult.netRevenueUSD)}</strong>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs leading-relaxed">
            <strong>Kepatuhan DMO ESDM:</strong> Seluruh transaksi ke smelter dalam negeri wajib mengacu pada HPM minimum untuk mencegah pelanggaran KP3.
          </div>
        </div>

      </div>

    </div>
  );
};
