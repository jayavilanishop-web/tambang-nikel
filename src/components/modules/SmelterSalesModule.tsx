import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  Calculator, 
  ShieldCheck, 
  DollarSign, 
  ArrowRight, 
  FileText,
  Building2,
  Receipt,
  CheckCircle2,
  AlertCircle,
  Plus,
  BarChart3,
  Scale
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'hpm_calculator' | 'hma_history' | 'royalty_pnbp' | 'dmo_compliance'>('hpm_calculator');

  // Calculator State
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

  // HMA History dataset
  const [hmaHistory, setHmaHistory] = useState([
    { period: 'Agustus 2026 (Kepmen ESDM No. 294.K)', hmaUSD: 16450, saprolite1_8_FOB: 46.85, limonite1_3_FOB: 22.10, status: 'BERLAKU_AKTIF' },
    { period: 'Juli 2026', hmaUSD: 16800, saprolite1_8_FOB: 47.90, limonite1_3_FOB: 22.50, status: 'ARSIP_LAMPAU' },
    { period: 'Juni 2026', hmaUSD: 17100, saprolite1_8_FOB: 48.75, limonite1_3_FOB: 23.00, status: 'ARSIP_LAMPAU' },
    { period: 'Mei 2026', hmaUSD: 16950, saprolite1_8_FOB: 48.30, limonite1_3_FOB: 22.80, status: 'ARSIP_LAMPAU' }
  ]);

  // SIMPONI Royalty PNBP Dataset
  const [pnbpRecords, setPnbpRecords] = useState([
    { billingCode: '82026080491023', vesselRef: 'BG. Megah 300', smelterBuyer: 'PT ITSS Morowali', royaltyValIDR: 1250000000, royaltyValUSD: 78125, pnbpRate: '10% (Saprolite Ore)', status: 'PAID_SETTLED', paymentDate: '2026-08-02' },
    { billingCode: '82026080491099', vesselRef: 'BG. Samudra 330', smelterBuyer: 'PT Vale Indonesia', royaltyValIDR: 980000000, royaltyValUSD: 61250, pnbpRate: '10% (Saprolite Ore)', status: 'PAID_SETTLED', paymentDate: '2026-08-03' },
    { billingCode: '82026080491200', vesselRef: 'LCT. Bahari 04', smelterBuyer: 'PT Huayou Nickel HPAL', royaltyValIDR: 210000000, royaltyValUSD: 13125, pnbpRate: '2% (Limonite Ore)', status: 'UNPAID_PENDING_BILLING', paymentDate: '-' }
  ]);

  // DMO Smelter Allocations Dataset
  const [dmoAllocations, setDmoAllocations] = useState([
    { smelterId: 'SMELTER-IMIP-01', name: 'PT Indonesia Tsingshan Stainless Steel (ITSS)', targetAnnualMT: 1200000, fulfilledMT: 780000, complianceRate: 65, minHpmNi: 1.80, auditStatus: 'COMPLIANT_PASSED' },
    { smelterId: 'SMELTER-VALE-02', name: 'PT Vale Indonesia Tbk (Pomalaa)', targetAnnualMT: 800000, fulfilledMT: 540000, complianceRate: 67.5, minHpmNi: 1.75, auditStatus: 'COMPLIANT_PASSED' },
    { smelterId: 'SMELTER-WEDA-03', name: 'PT Weda Bay Nickel Smelter', targetAnnualMT: 500000, fulfilledMT: 350000, complianceRate: 70, minHpmNi: 1.80, auditStatus: 'COMPLIANT_PASSED' }
  ]);

  // Modals
  const [showSimponiModal, setShowSimponiModal] = useState(false);
  const [simponiVessel, setSimponiVessel] = useState('BG. Megah 300');
  const [simponiSmelter, setSimponiSmelter] = useState('PT ITSS Morowali');
  const [simponiRoyaltyIDR, setSimponiRoyaltyIDR] = useState(850000000);

  const [showDmoModal, setShowDmoModal] = useState(false);
  const [dmoSmelterName, setDmoSmelterName] = useState('PT Smelter Nickel Utama');
  const [dmoTargetMT, setDmoTargetMT] = useState(300000);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Penjualan Smelter & Regulasi ESDM
            </span>
            <span className="text-slate-400 text-xs">• Harga Patokan Mineral (HPM) & Royalty PNBP SIMPONI</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Kalkulator HPM Nikel, Royalti PNBP & Pemenuhan DMO Smelter' : 'ESDM HPM Nickel Benchmark, PNBP Royalty & DMO Sales Engine'}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-300 font-semibold shadow-inner">
            DMO Quota Compliance: <strong className="text-emerald-400 font-extrabold">{hpm.dmoComplianceRatePercent}%</strong>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'hpm_calculator', label: 'Kalkulator HPM Nikel ESDM', icon: Calculator },
          { id: 'hma_history', label: 'Histori HMA & Benchmark HPM', icon: BarChart3 },
          { id: 'royalty_pnbp', label: 'Royalti PNBP SIMPONI ESDM', icon: Receipt },
          { id: 'dmo_compliance', label: 'Kepatuhan DMO Smelter', icon: ShieldCheck }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HPM CALCULATOR */}
      {activeTab === 'hpm_calculator' && (
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
      )}

      {/* TAB 2: HMA HISTORY */}
      {activeTab === 'hma_history' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Histori Harga Mineral Acuan (HMA) Nikel & Benchmark FOB HPM Kementerian ESDM
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Periode Kepmen ESDM</th>
                    <th className="py-2.5 px-3">HMA Nikel ($/dmt)</th>
                    <th className="py-2.5 px-3">HPM Saprolite 1.8% FOB ($/dmt)</th>
                    <th className="py-2.5 px-3">HPM Limonite 1.3% FOB ($/dmt)</th>
                    <th className="py-2.5 px-3">Status Kepmen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {hmaHistory.map((h, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-sans font-bold text-purple-300">{h.period}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">${(h.hmaUSD ?? 0).toLocaleString()} USD</td>
                      <td className="py-3 px-3 text-slate-100 font-bold">${h.saprolite1_8_FOB} USD</td>
                      <td className="py-3 px-3 text-amber-300">${h.limonite1_3_FOB} USD</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          h.status === 'BERLAKU_AKTIF' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {h.status}
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

      {/* TAB 3: ROYALTY PNBP */}
      {activeTab === 'royalty_pnbp' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Modul Setoran Royalti PNBP & Sistem e-PNBP SIMPONI ESDM</h3>
                <p className="text-slate-400 text-xs">Penerbitan kode billing royalti, verifikasi NTPN setoran kas negara & PPh 22 mineral</p>
              </div>
              <button
                onClick={() => setShowSimponiModal(true)}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Terbitkan Kode Billing SIMPONI</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Kode Billing SIMPONI</th>
                    <th className="py-2.5 px-3">Pengapalan Tongkang</th>
                    <th className="py-2.5 px-3">Smelter Pembeli</th>
                    <th className="py-2.5 px-3">Tarif PNBP</th>
                    <th className="py-2.5 px-3">Nilai Royalti (IDR Rp)</th>
                    <th className="py-2.5 px-3">Nilai Royalti (USD $)</th>
                    <th className="py-2.5 px-3">Status Setoran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {pnbpRecords.map((p) => (
                    <tr key={p.billingCode} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-purple-400">{p.billingCode}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{p.vesselRef}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{p.smelterBuyer}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{p.pnbpRate}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">Rp {(p.royaltyValIDR ?? 0).toLocaleString('id-ID')}</td>
                      <td className="py-3 px-3 text-slate-200 font-bold">${(p.royaltyValUSD ?? 0).toLocaleString()} USD</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          p.status === 'PAID_SETTLED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {p.status}
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

      {/* TAB 4: DMO COMPLIANCE */}
      {activeTab === 'dmo_compliance' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Pelacak Kepatuhan Domestic Market Obligation (DMO) Pasokan Smelter</h3>
                <p className="text-slate-400 text-xs">Pemenuhan alokasi kewajiban pasokan ore dalam negeri sesuai kuota RKAB ESDM</p>
              </div>
              <button
                onClick={() => setShowDmoModal(true)}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Alokasi DMO Smelter Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dmoAllocations.map((d) => (
                <div key={d.smelterId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-purple-400 font-mono">{d.smelterId}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {d.auditStatus}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm block font-sans">{d.name}</strong>

                  <div className="space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Target DMO Tahunan:</span>
                      <strong className="font-mono text-slate-100">{(d.targetAnnualMT ?? 0).toLocaleString()} MT</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Realisasi Pasokan:</span>
                      <strong className="font-mono text-emerald-400">{(d.fulfilledMT ?? 0).toLocaleString()} MT</strong>
                    </div>
                    
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden my-2">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${d.complianceRate}%` }} />
                    </div>

                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Progres Kepatuhan:</span>
                      <strong className="text-purple-300 font-bold">{d.complianceRate}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: KODE BILLING SIMPONI */}
      {showSimponiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Receipt className="w-4 h-4 text-purple-400" /> Terbitkan Kode Billing SIMPONI ESDM
              </h3>
              <button onClick={() => setShowSimponiModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Pengapalan Tongkang:</label>
                <input
                  type="text"
                  value={simponiVessel}
                  onChange={(e) => setSimponiVessel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Smelter Pembeli:</label>
                <input
                  type="text"
                  value={simponiSmelter}
                  onChange={(e) => setSimponiSmelter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nilai Royalti PNBP (IDR Rp):</label>
                <input
                  type="number"
                  value={simponiRoyaltyIDR}
                  onChange={(e) => setSimponiRoyaltyIDR(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setPnbpRecords(prev => [
                    {
                      billingCode: `8202608${Math.floor(1000000 + Math.random() * 9000000)}`,
                      vesselRef: simponiVessel,
                      smelterBuyer: simponiSmelter,
                      royaltyValIDR: simponiRoyaltyIDR,
                      royaltyValUSD: Math.round(simponiRoyaltyIDR / 16000),
                      pnbpRate: '10% (Saprolite Ore)',
                      status: 'UNPAID_PENDING_BILLING',
                      paymentDate: '-'
                    },
                    ...prev
                  ]);
                  setShowSimponiModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Terbitkan Kode Billing
              </button>
              <button
                onClick={() => setShowSimponiModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ALOKASI DMO SMELTER */}
      {showDmoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> Alokasi DMO Smelter Baru
              </h3>
              <button onClick={() => setShowDmoModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Smelter Domestik:</label>
                <input
                  type="text"
                  value={dmoSmelterName}
                  onChange={(e) => setDmoSmelterName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Target Kuota DMO (MT/Tahun):</label>
                <input
                  type="number"
                  value={dmoTargetMT}
                  onChange={(e) => setDmoTargetMT(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setDmoAllocations(prev => [
                    {
                      smelterId: `SMELTER-NEW-0${prev.length + 1}`,
                      name: dmoSmelterName,
                      targetAnnualMT: dmoTargetMT,
                      fulfilledMT: 0,
                      complianceRate: 0,
                      minHpmNi: 1.80,
                      auditStatus: 'ALLOCATED_PENDING_DELIVERY'
                    },
                    ...prev
                  ]);
                  setShowDmoModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Simpan Alokasi DMO
              </button>
              <button
                onClick={() => setShowDmoModal(false)}
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
