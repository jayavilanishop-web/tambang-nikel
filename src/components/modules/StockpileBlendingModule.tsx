import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  Plus, 
  RefreshCw, 
  X,
  TestTube,
  Anchor,
  MapPin,
  FileCheck2,
  Check,
  BarChart3,
  Calendar,
  Filter,
  Search,
  Droplets,
  Zap,
  ArrowRight
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<
    | 'stockpile_overview'
    | 'ai_blending_simulator'
    | 'barge_loading_plan'
    | 'lab_sampling_coa'
    | 'spatial_pad_map'
  >('stockpile_overview');

  const [stockpileList, setStockpileList] = useState<OreStockpile[]>(stockpiles);
  const [targetNiGrade, setTargetNiGrade] = useState(1.80);
  const [maxMoisture, setMaxMoisture] = useState(30.0);
  const [targetSmelter, setTargetSmelter] = useState('Smelter RKEF SMI Morowali');

  const [isCalculating, setIsCalculating] = useState(false);
  const [blendResult, setBlendResult] = useState<any>(null);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBargeModal, setShowBargeModal] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);

  // Form State: Stockpile Baru
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [locationType, setLocationType] = useState<'ETO' | 'EFO' | 'PORT'>('ETO');
  const [capacityMT, setCapacityMT] = useState(100000);
  const [currentTonnageMT, setCurrentTonnageMT] = useState(25000);
  const [niGradePercent, setNiGradePercent] = useState(1.85);
  const [feGradePercent, setFeGradePercent] = useState(18.2);
  const [moistureContentPercent, setMoistureContentPercent] = useState(32.5);
  const [smRatio, setSmRatio] = useState(2.1);

  // Form State: Barge Order
  const [bargeNameInput, setBargeNameInput] = useState('TB Marina 88 / BG 3001');
  const [targetBargeTonnage, setTargetBargeTonnage] = useState(7500);
  const [selectedEfoPad, setSelectedEfoPad] = useState('EFO Beta-1 (Grade High Saprolite)');

  // Form State: Lab COA
  const [labSampleId, setLabSampleId] = useState('SPL-20260804-001');
  const [labPadCode, setLabPadCode] = useState('STK-ETO-01');
  const [labNi, setLabNi] = useState(1.82);
  const [labFe, setLabFe] = useState(18.4);
  const [labMc, setLabMc] = useState(31.2);

  // Lab Sampling Records Dataset
  const [labSampleLogs, setLabSampleLogs] = useState([
    { id: 'SPL-20260803-091', padCode: 'STK-ETO-01', sampleType: 'XRF Assay Analysis', niPct: 1.84, fePct: 18.2, mcPct: 31.0, sio2Pct: 38.4, mgoPct: 18.1, status: 'QUALIFIED_SMELTER', tester: 'Anwar (Chief Chemist)' },
    { id: 'SPL-20260803-092', padCode: 'STK-EFO-02', sampleType: 'ICP-OES Grade Audit', niPct: 1.78, fePct: 19.1, mcPct: 29.5, sio2Pct: 37.8, mgoPct: 17.9, status: 'QUALIFIED_SMELTER', tester: 'Siti (Lab Tech)' },
    { id: 'SPL-20260802-088', padCode: 'STK-PORT-01', sampleType: 'Moisture Test Post-Rain', niPct: 1.80, fePct: 18.0, mcPct: 34.2, sio2Pct: 38.0, mgoPct: 18.0, status: 'MOISTURE_EXCEEDED_WARNING', tester: 'Budi (Lab Tech)' }
  ]);

  // Barge Loading Schedule Dataset
  const [bargeLoadingOrders, setBargeLoadingOrders] = useState([
    { id: 'BLO-2026-0811', bargeName: 'TB Titan 02 / BG 3008', targetTonnageMT: 8000, loadedTonnageMT: 5200, sourcePad: 'Stockpile EFO Beta-1', destinationSmelter: 'Smelter IMIP Morowali', status: 'LOADING_IN_PROGRESS', estFinish: 'Hari Ini 18:00' },
    { id: 'BLO-2026-0812', bargeName: 'TB Ocean Star 05 / BG 3302', targetTonnageMT: 7500, loadedTonnageMT: 0, sourcePad: 'Stockpile EFO Alpha-2', destinationSmelter: 'Smelter HPAL Lygend Obi', status: 'QUEUED_BERTH', estFinish: 'Besok 08:00' }
  ]);

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
          availableStockpiles: stockpileList.map(s => ({
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
      // Fallback AI simulation logic
      setBlendResult({
        complianceStatus: 'OPTIMAL COMPLIANT',
        recommendedBlend: [
          { name: 'Stockpile ETO Alpha-1 (1.85% Ni)', percentage: 60, tonnageMT: 3000 },
          { name: 'Stockpile ETO Alpha-2 (1.72% Ni)', percentage: 40, tonnageMT: 2000 }
        ],
        predictedQuality: {
          niGrade: targetNiGrade,
          feGrade: 18.1,
          mcPercent: maxMoisture - 1.5,
          sio2MgoRatio: 2.12
        },
        hpmEstimatedValueUSD: 54.80,
        aiOperationalNote: `Formulasi blending aman untuk ${targetSmelter}. Rasio S/M 2.12 memenuhi batas melting point furnace RKEF.`
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleCreateStockpile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newStockpile: OreStockpile = {
      id: `SP-${Date.now()}`,
      name,
      code: code || `STK-${Math.floor(100 + Math.random() * 900)}`,
      locationType,
      maxCapacityMT: Number(capacityMT),
      currentTonnageMT: Number(currentTonnageMT),
      niGradePercent: Number(niGradePercent),
      feGradePercent: Number(feGradePercent),
      moistureContentPercent: Number(moistureContentPercent),
      sio2Percent: 38.2,
      mgoPercent: 18.2,
      sio2MgoRatio: Number(smRatio),
      qualityTag: Number(niGradePercent) >= 1.8 ? 'High Grade Saprolite (>=1.8%)' : 'Medium Grade Saprolite (1.5-1.79%)',
      lastUpdated: 'Baru Saja'
    };

    setStockpileList(prev => [newStockpile, ...prev]);
    setShowAddModal(false);
    setName('');
    setCode('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-300 animate-spin" />
              Smart AI Ore Blending & Quality Control Engine
            </span>
            <span className="text-slate-400 text-xs">• ETO, EFO & Jetty Stockpiles</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            {language === 'id' ? 'Manajemen Stockpile & AI Optimasi Pencampuran Kadar Nikel' : 'Stockpile Management & AI Nickel Ore Blending'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Sistem pengawasan volume tumpukan ore ETO/EFO, optimasi blending AI berbasis target Ni/Fe/MC smelter, verifikasi lab COA/XRF, dan penjadwalan pemuatan tongkang (barge loading).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Tambah Stockpile</span>
          </button>

          <button
            onClick={() => setShowBargeModal(true)}
            className="px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Anchor className="w-4 h-4" />
            <span>Rencana Loading Tongkang</span>
          </button>

          <button
            onClick={handleRunAiBlending}
            disabled={isCalculating}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
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
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'stockpile_overview', label: 'Ringkasan Stockpile ETO, EFO & Jetty', icon: Layers },
          { id: 'ai_blending_simulator', label: 'Simulator Optimasi Blending AI', icon: Sliders },
          { id: 'barge_loading_plan', label: 'Rencana Loading Tongkang (Barging)', icon: Anchor },
          { id: 'lab_sampling_coa', label: 'Hasil Lab Sampling & COA XRF', icon: TestTube },
          { id: 'spatial_pad_map', label: 'Peta Spatial Pad & Kapasitas Grid', icon: MapPin }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: STOCKPILE OVERVIEW */}
      {activeTab === 'stockpile_overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stockpileList.map((sp) => (
              <div key={sp.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 shadow-md hover:border-slate-700 transition-all">
                <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">{sp.code}</span>
                    <h4 className="font-bold text-slate-100 text-xs truncate">{sp.name}</h4>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                    {sp.locationType}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Volume Terisi:</span>
                    <strong className="text-slate-100 font-mono">{(sp.currentTonnageMT ?? 0).toLocaleString('id-ID')} MT</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Kadar Ni:</span>
                    <strong className="text-emerald-400 font-mono font-bold">{sp.niGradePercent}% Ni</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Kadar Fe / MC:</span>
                    <span className="text-slate-300 font-mono text-[11px]">{sp.feGradePercent}% Fe | {sp.moistureContentPercent}% MC</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Ratio S/M:</span>
                    <span className="text-amber-300 font-mono text-[11px]">{sp.sio2MgoRatio}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Updated: {sp.lastUpdated}</span>
                  <span className="text-emerald-400/80 font-mono">
                    {Math.round((sp.currentTonnageMT / sp.maxCapacityMT) * 100)}% Kapasitas
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AI BLENDING SIMULATOR */}
      {activeTab === 'ai_blending_simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Col: Target Controls */}
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

          {/* Right 2 Cols: AI Result Output */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 border border-emerald-500/40 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Hasil Rekomendasi Blending AI NickelSmart</h3>
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
                    <strong className="text-emerald-300 font-extrabold text-sm">{formatUSD(blendResult.hpmEstimatedValueUSD || 54.8)}/dmt</strong>
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
      )}

      {/* TAB 3: BARGE LOADING PLAN */}
      {activeTab === 'barge_loading_plan' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Penjadwalan & Perintah Pemuatan Tongkang (Barge Loading Orders)</h3>
                <p className="text-slate-400 text-[11px]">Transfer Ore Nikel dari Stockpile EFO ke Jetty Port untuk Pengapalan Smelter</p>
              </div>

              <button
                onClick={() => setShowBargeModal(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Buat Order Barging Baru
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Order ID</th>
                    <th className="py-2.5 px-3">Nama Tongkang / Tugboat</th>
                    <th className="py-2.5 px-3">Stockpile Asal</th>
                    <th className="py-2.5 px-3">Smelter Tujuan</th>
                    <th className="py-2.5 px-3">Target Tonase (MT)</th>
                    <th className="py-2.5 px-3">Progres Muat</th>
                    <th className="py-2.5 px-3">Estimasi Selesai</th>
                    <th className="py-2.5 px-3">Status Loading</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {bargeLoadingOrders.map((blo) => (
                    <tr key={blo.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-blue-400">{blo.id}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{blo.bargeName}</td>
                      <td className="py-3 px-3 text-slate-300 font-sans">{blo.sourcePad}</td>
                      <td className="py-3 px-3 text-emerald-300 font-sans">{blo.destinationSmelter}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{blo.targetTonnageMT} MT</td>
                      <td className="py-3 px-3 text-slate-200">
                        {blo.loadedTonnageMT} / {blo.targetTonnageMT} MT ({Math.round((blo.loadedTonnageMT / blo.targetTonnageMT) * 100)}%)
                      </td>
                      <td className="py-3 px-3 text-slate-400">{blo.estFinish}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          blo.status === 'LOADING_IN_PROGRESS' ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {blo.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LAB SAMPLING & COA */}
      {activeTab === 'lab_sampling_coa' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Laboratorium Quality Assurance & Certificate of Analysis (COA)</h3>
                <p className="text-slate-400 text-[11px]">Hasil Uji Assay XRF / ICP Kadar Ni, Fe, SiO2, MgO & Moisture Test Stockpile</p>
              </div>

              <button
                onClick={() => setShowLabModal(true)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Input Hasil Uji Lab XRF
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Sample ID</th>
                    <th className="py-2.5 px-3">Kode Pad Stockpile</th>
                    <th className="py-2.5 px-3">Metode Uji</th>
                    <th className="py-2.5 px-3">Ni (%)</th>
                    <th className="py-2.5 px-3">Fe (%)</th>
                    <th className="py-2.5 px-3">Moisture (%)</th>
                    <th className="py-2.5 px-3">Ratio S/M</th>
                    <th className="py-2.5 px-3">Analis Lab</th>
                    <th className="py-2.5 px-3">Status Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {labSampleLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{log.id}</td>
                      <td className="py-3 px-3 text-slate-200">{log.padCode}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{log.sampleType}</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">{log.niPct}%</td>
                      <td className="py-3 px-3 text-slate-200">{log.fePct}%</td>
                      <td className="py-3 px-3 text-amber-300">{log.mcPct}%</td>
                      <td className="py-3 px-3 text-slate-300">{(log.sio2Pct / log.mgoPct).toFixed(2)}</td>
                      <td className="py-3 px-3 font-sans text-slate-400">{log.tester}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          log.status === 'QUALIFIED_SMELTER' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SPATIAL PAD MAP */}
      {activeTab === 'spatial_pad_map' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Peta Layout GIS Area Stockpile ETO, EFO & Kapasitas Tumpukan Pad
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase">
                  PAD ETO ALPHA (Export Transit Ore)
                </span>
                <h4 className="font-bold text-slate-100">Area Tumpukan ETO Alpha 1-4</h4>
                <p className="text-slate-400 text-[11px]">Terhubung langsung dari Pit Excavator EX-2001 & EX-2002 via Hauling Road KM 8.2</p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-slate-300 space-y-1">
                  <div>Tonnage Status: <strong>112,500 MT / 200,000 MT</strong></div>
                  <div>Avg Grade Ni: <strong className="text-emerald-400">1.82% Ni</strong></div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold text-[10px] uppercase">
                  PAD EFO BETA (Export Final Ore)
                </span>
                <h4 className="font-bold text-slate-100">Area Tumpukan EFO Final Blending</h4>
                <p className="text-slate-400 text-[11px]">Siap muat ke conveyor Jetty Port untuk pengapalan tongkang 300 Feet</p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-slate-300 space-y-1">
                  <div>Tonnage Status: <strong>85,000 MT / 150,000 MT</strong></div>
                  <div>Avg Grade Ni: <strong className="text-emerald-400">1.80% Ni (Smelter Compliant)</strong></div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold text-[10px] uppercase">
                  DOME COVERED STOCKPILE
                </span>
                <h4 className="font-bold text-slate-100">Dome Bebas Hujan (Dry Ore Moisture Control)</h4>
                <p className="text-slate-400 text-[11px]">Kubah tertutup untuk menjaga moisture ore tetep ≤ 28% saat musim hujan</p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-slate-300 space-y-1">
                  <div>Tonnage Status: <strong>35,000 MT / 50,000 MT</strong></div>
                  <div>Avg Moisture: <strong className="text-amber-300">26.5% MC</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: INPUT DATA STOCKPILE BARU */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <Layers className="w-5 h-5" />
                <span>Input Data Stockpile / Batch Ore Baru</span>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStockpile} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Stockpile / Batch Ore*</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Stockpile ETO Pit Alpha Batch 05"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kode Stockpile</label>
                  <input
                    type="text"
                    placeholder="Contoh: STK-ETO-05"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tipe Tumpukan</label>
                  <select
                    value={locationType}
                    onChange={(e: any) => setLocationType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="ETO">ETO (Export Transit Ore)</option>
                    <option value="EFO">EFO (Export Final Ore)</option>
                    <option value="PORT">PORT (Jetty Stockpile)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tonase Saat Ini (MT)</label>
                  <input
                    type="number"
                    value={currentTonnageMT}
                    onChange={(e) => setCurrentTonnageMT(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kapasitas Maksimal (MT)</label>
                  <input
                    type="number"
                    value={capacityMT}
                    onChange={(e) => setCapacityMT(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kadar Ni (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={niGradePercent}
                    onChange={(e) => setNiGradePercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-bold font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kadar Fe (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={feGradePercent}
                    onChange={(e) => setFeGradePercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Moisture / MC (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={moistureContentPercent}
                    onChange={(e) => setMoistureContentPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Rasio Silica / Magnesia (S/M)</label>
                <input
                  type="number"
                  step="0.01"
                  value={smRatio}
                  onChange={(e) => setSmRatio(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Simpan Stockpile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: RENCANA LOADING TONGKANG */}
      {showBargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Anchor className="w-4 h-4 text-blue-400" /> Buat Order Pemuatan Tongkang Baru
              </h3>
              <button onClick={() => setShowBargeModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Tongkang / Tugboat:</label>
                <input
                  type="text"
                  value={bargeNameInput}
                  onChange={(e) => setBargeNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Pilih Stockpile Asal Ore:</label>
                <select
                  value={selectedEfoPad}
                  onChange={(e) => setSelectedEfoPad(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                >
                  <option value="EFO Beta-1 (Grade High Saprolite)">EFO Beta-1 (Grade High Saprolite 1.82% Ni)</option>
                  <option value="EFO Alpha-2 (Grade Mid Saprolite)">EFO Alpha-2 (Grade Mid Saprolite 1.70% Ni)</option>
                  <option value="Dome Covered Pad 1">Dome Covered Pad 1 (Dry Ore Moisture Control)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Tonase Muat (MT):</label>
                <input
                  type="number"
                  value={targetBargeTonnage}
                  onChange={(e) => setTargetBargeTonnage(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setBargeLoadingOrders(prev => [
                    {
                      id: `BLO-2026-${813 + prev.length}`,
                      bargeName: bargeNameInput,
                      targetTonnageMT: targetBargeTonnage,
                      loadedTonnageMT: 0,
                      sourcePad: selectedEfoPad,
                      destinationSmelter: 'Smelter Morowali Direct',
                      status: 'LOADING_IN_PROGRESS',
                      estFinish: 'Besok 14:00'
                    },
                    ...prev
                  ]);
                  setShowBargeModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Terbitkan Order Barging
              </button>
              <button
                onClick={() => setShowBargeModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INPUT HASIL LAB SAMPLING XRF */}
      {showLabModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <TestTube className="w-4 h-4 text-emerald-400" /> Input Hasil Uji Assay XRF
              </h3>
              <button onClick={() => setShowLabModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Sample ID / No Barcode:</label>
                <input
                  type="text"
                  value={labSampleId}
                  onChange={(e) => setLabSampleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Pad Stockpile Ditest:</label>
                <input
                  type="text"
                  value={labPadCode}
                  onChange={(e) => setLabPadCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Ni (%):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={labNi}
                    onChange={(e) => setLabNi(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Fe (%):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={labFe}
                    onChange={(e) => setLabFe(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Moisture (%):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={labMc}
                    onChange={(e) => setLabMc(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setLabSampleLogs(prev => [
                    {
                      id: labSampleId,
                      padCode: labPadCode,
                      sampleType: 'XRF Rapid Assay Test',
                      niPct: labNi,
                      fePct: labFe,
                      mcPct: labMc,
                      sio2Pct: 38.2,
                      mgoPct: 18.0,
                      status: 'QUALIFIED_SMELTER',
                      tester: 'Anwar (Lab Officer)'
                    },
                    ...prev
                  ]);
                  setShowLabModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Simpan Hasil Uji XRF
              </button>
              <button
                onClick={() => setShowLabModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
