import React, { useState } from 'react';
import { Layers, Sparkles, Sliders, CheckCircle2, TrendingUp, AlertTriangle, Plus, RefreshCw } from 'lucide-react';
import { OreStockpile, Language } from '../../types';
import { formatUSD } from '../../utils/hpmCalculator';

interface StockpileBlendingModuleProps {
  stockpiles: OreStockpile[];
  language: Language;
}

export const StockpileBlendingModule: React.FC<StockpileBlendingModuleProps> = ({
  stockpiles,
  language
}) => {
  const [targetNiGrade, setTargetNiGrade] = useState(1.80);
  const [maxMoisture, setMaxMoisture] = useState(30.0);
  const [targetSmelter, setTargetSmelter] = useState('Smelter RKEF SMI Morowali');

  const [isCalculating, setIsCalculating] = useState(false);
  const [blendResult, setBlendResult] = useState<any>(null);

  const handleRunAiBlending = async () => {
    setIsCalculating(true);
    try {
      const response = await fetch('/api/ai/ore-blend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetGradeNi: targetNiGrade,
          maxMoisture,
          minFe: 17.5,
          targetSmelter,
          availableStockpiles: stockpiles.map(s => ({
            id: s.id,
            name: s.name,
            ni: s.niGradePercent,
            fe: s.feGradePercent,
            mc: s.moistureContentPercent,
            tonnage: s.currentTonnageMT
          }))
        })
      });

      const data = await response.json();
      setBlendResult(data);
    } catch (err) {
      console.error("Blending Error:", err);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Smart AI Blending Engine
            </span>
            <span className="text-slate-400 text-xs">• ETO & EFO Ore Quality Optimization</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Manajemen Stockpile & AI Optimasi Pencampuran Kadar Nikel' : 'Stockpile Management & AI Nickel Ore Blending'}
          </h2>
        </div>

        <button
          onClick={handleRunAiBlending}
          disabled={isCalculating}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          {isCalculating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
              <span>Menghitung Formulasi AI...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Jalankan Optimasi Blending AI</span>
            </>
          )}
        </button>
      </div>

      {/* Stockpile Inventory Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stockpiles.map((sp) => (
          <div key={sp.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-start justify-between border-b border-slate-800 pb-2">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold block">{sp.code}</span>
                <h4 className="font-bold text-slate-100 text-xs truncate">{sp.name}</h4>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                {sp.locationType}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Total Tonnage:</span>
                <strong className="text-slate-100 font-mono">{sp.currentTonnageMT.toLocaleString('id-ID')} MT</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Kadar Ni (Nickel):</span>
                <strong className="text-emerald-400 font-mono font-bold">{sp.niGradePercent}% Ni</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Kadar Fe (Iron):</span>
                <strong className="text-slate-200 font-mono">{sp.feGradePercent}% Fe</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Moisture Content (MC):</span>
                <strong className="text-amber-300 font-mono">{sp.moistureContentPercent}% MC</strong>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>SiO2/MgO Ratio:</span>
                <strong className="text-slate-200 font-mono">{sp.sio2MgoRatio}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive AI Blending Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Col: Controls Form */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Target Spesifikasi Umpan Smelter</span>
            </h3>
            <p className="text-xs text-slate-400">Atur parameter target pencampuran ore</p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Target Smelter / Buyer:</label>
              <select
                value={targetSmelter}
                onChange={(e) => setTargetSmelter(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Smelter RKEF SMI Morowali">Smelter RKEF SMI Morowali (Ni ≥ 1.80%)</option>
                <option value="Smelter HPAL Lygend Obi">Smelter HPAL Lygend Obi (Limonite Ni 1.25-1.35%)</option>
                <option value="Smelter ITSS Bahodopi">Smelter ITSS Bahodopi (Ni ≥ 1.85%)</option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-semibold">Target Kadar Ni Akhir:</span>
                <span className="font-mono font-bold text-emerald-400">{targetNiGrade}% Ni</span>
              </div>
              <input
                type="range"
                min="1.20"
                max="2.10"
                step="0.05"
                value={targetNiGrade}
                onChange={(e) => setTargetNiGrade(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span className="font-semibold">Batas Maksimum Moisture (MC):</span>
                <span className="font-mono font-bold text-amber-300">{maxMoisture}% MC</span>
              </div>
              <input
                type="range"
                min="22"
                max="35"
                step="0.5"
                value={maxMoisture}
                onChange={(e) => setMaxMoisture(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <button
              onClick={handleRunAiBlending}
              disabled={isCalculating}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Hitung Formulasi AI</span>
            </button>
          </div>
        </div>

        {/* Right 2 Cols: AI Optimized Output Card */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 border border-emerald-500/40 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Hasil Rekomendasi Blending AI SmartMine</h3>
                <p className="text-xs text-slate-400">Rasio pencampuran paling optimal dari stockpile aktif</p>
              </div>
            </div>
            {blendResult && (
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                STATUS: {blendResult.complianceStatus}
              </span>
            )}
          </div>

          {!blendResult ? (
            <div className="p-8 text-center text-slate-400 text-xs space-y-2">
              <Layers className="w-8 h-8 text-emerald-400 mx-auto animate-bounce" />
              <p>Klik tombol <strong>"Jalankan Optimasi Blending AI"</strong> untuk menghasilkan rasio pencampuran optimal berbasis data kadar nikel aktual.</p>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              
              {/* Blending Proportion Bars */}
              <div className="space-y-2.5">
                <span className="font-bold text-slate-200 uppercase tracking-wider text-[10px] block">Rasio Komposisi Stockpile:</span>
                {blendResult.recommendedBlend?.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-slate-200">
                      <span className="font-bold">{item.name}</span>
                      <span className="font-mono text-emerald-400 font-extrabold">{item.percentage}% ({item.tonnageMT} MT)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Predicted Quality Summary */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div>
                  <span className="text-slate-500 text-[10px] block">Estimasi Kadar Ni:</span>
                  <strong className="text-emerald-400 font-extrabold text-sm">{blendResult.predictedQuality?.niGrade}% Ni</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Estimasi Kadar Fe:</span>
                  <strong className="text-slate-200 font-extrabold text-sm">{blendResult.predictedQuality?.feGrade}% Fe</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Moisture Akhir:</span>
                  <strong className="text-amber-300 font-extrabold text-sm">{blendResult.predictedQuality?.mcPercent}% MC</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Nilai Est. HPM:</span>
                  <strong className="text-emerald-300 font-extrabold text-sm">{formatUSD(blendResult.hpmEstimatedValueUSD || 52.4)}/dmt</strong>
                </div>
              </div>

              {/* AI Commentary Note */}
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed">
                <strong>Catatan Operasional AI:</strong> {blendResult.aiOperationalNote}
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
