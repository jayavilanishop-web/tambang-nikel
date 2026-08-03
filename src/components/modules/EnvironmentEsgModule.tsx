import React, { useState } from 'react';
import { 
  Leaf, 
  Droplets, 
  Wind, 
  Volume2, 
  Trash2, 
  TreePine, 
  ShieldCheck, 
  Activity, 
  Factory, 
  BarChart3, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Plus, 
  Download, 
  Filter, 
  Search, 
  Sparkles, 
  Building2, 
  MapPin, 
  Clock, 
  RefreshCw, 
  TrendingDown, 
  Sun,
  Globe
} from 'lucide-react';
import { Language } from '../../types';

interface EnvironmentEsgModuleProps {
  language: Language;
}

export const EnvironmentEsgModule: React.FC<EnvironmentEsgModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview_esg'
    | 'waste_management'
    | 'water_quality'
    | 'air_emission'
    | 'noise_vibration'
    | 'rehabilitation_trees'
    | 'compliance_audit'
  >('overview_esg');

  // Waste Management Dataset (Limbah B3 & Domestic Waste)
  const wasteData = [
    { id: 'WST-2026-081', wasteType: 'Oli Bekas (Used Engine Oil - B105d)', category: 'HAZARDOUS_B3', qtyTon: 18.5, storageLocation: 'TPS Limbah B3 Central Workshop', transporter: 'PT Trans B3 Indonesia (Licensed KLHK)', status: 'MANIFEST_ISSUED' },
    { id: 'WST-2026-082', wasteType: 'Filter Filter Bekas & Majun Terkontaminasi (B107d)', category: 'HAZARDOUS_B3', qtyTon: 4.2, storageLocation: 'TPS Limbah B3 Central Workshop', transporter: 'PT Trans B3 Indonesia (Licensed KLHK)', status: 'STORED_SAFE' },
    { id: 'WST-2026-083', wasteType: 'Lumpur Sedimentasi Settling Pond (Non-B3)', category: 'NON_HAZARDOUS', qtyTon: 420.0, storageLocation: 'Disposal Area Pit Alpha', transporter: 'Internal Dump Truck Crew', status: 'RECYCLED_SOIL' }
  ];

  // Water Quality Monitoring Dataset (Air Limbah Tambang & Settling Ponds)
  const waterQualityData = [
    { pondId: 'POND-PIT-01', location: 'Settling Pond Outlet Pit Alpha', pH: 7.2, tssMgL: 42, feMgL: 0.8, mnMgL: 0.3, dischargeRate: '120 m³/h', status: 'COMPLIANT_KLHK' },
    { pondId: 'POND-JETTY-02', location: 'Settling Pond Outlet Stockpile Jetty', pH: 6.9, tssMgL: 58, feMgL: 1.1, mnMgL: 0.4, dischargeRate: '85 m³/h', status: 'COMPLIANT_KLHK' },
    { pondId: 'POND-CAMP-03', location: 'IPAL Effluent Mess Karyawan', pH: 7.5, tssMgL: 28, feMgL: 0.2, mnMgL: 0.1, dischargeRate: '35 m³/h', status: 'COMPLIANT_KLHK' }
  ];

  // Air Quality & Dust Emission Dataset
  const airEmissionData = [
    { pointId: 'AIR-HAUL-KM12', location: 'Haul Road Segment km 12 (Debu Terdispersi)', pm10: '45 µg/m³ (Standard < 75)', pm25: '22 µg/m³ (Standard < 55)', wateringFrequency: 'Tiap 45 Menit (Water Truck 20KL)', status: 'GOOD_AIR_QUALITY' },
    { pointId: 'AIR-GENSET-01', location: 'Cerobong Power Plant Genset 2MW', so2: '32 mg/Nm³', nox: '180 mg/Nm³', opacity: '< 10%', status: 'EMISSION_COMPLIANT' }
  ];

  // Noise & Blasting Vibration Monitoring
  const noiseData = [
    { pointId: 'NOISE-VILLAGE-01', location: 'Desa Ring 1 Terdekat (Batas Area Tambang)', noiseLevelDb: 52.4, standardMaxDb: 55.0, blastingPPV: '1.8 mm/s (Safe < 5 mm/s)', status: 'SAFE_BELOW_THRESHOLD' },
    { pointId: 'NOISE-CRUSHER-02', location: 'In-Pit Crusher Area Station', noiseLevelDb: 82.1, standardMaxDb: 85.0, blastingPPV: 'N/A', status: 'HEARING_PROTECTION_REQ' }
  ];

  // Rehabilitation, Reforestation & Tree Planting
  const rehabTreesData = [
    { blockId: 'REHAB-BLOCK-A4', areaHa: 24.5, targetTrees: 15000, plantedTrees: 15200, species: 'Kayu Putih (Melaleuca), Mahoni, Sengon Laut', survivalRate: '94.8%', phase: 'MAINTENANCE_YEAR_2' },
    { blockId: 'NURSERY-SITE-01', areaHa: 3.0, targetTrees: 50000, plantedTrees: 42000, species: 'Bibit Tanaman Lokal Fast Growing & Cover Crop', survivalRate: '98.1%', phase: 'NURSERY_SEEDLING_PROPAGATION' }
  ];

  // Compliance, AMDAL & PROPER Ratings
  const complianceAudits = [
    { auditId: 'AUD-KLHK-2026', scope: 'Evaluasi Penilaian Peringkat Kinerja (PROPER KLHK)', resultRating: 'PROPER_HIJAU (Beyond Compliance)', auditDate: '2026-06-15', status: 'PASSED' },
    { auditId: 'AMDAL-Q2-2026', scope: 'Laporan RKL-RPL Semester I (Dinas Lingkungan Hidup)', resultRating: 'FULL_COMPLIANCE', auditDate: '2026-07-10', status: 'SUBMITTED' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Environmental, Social & Governance (ESG) Mining Compliance
            </span>
            <span className="text-slate-400 text-xs">• ISO 14001 & Standard KLHK RI</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Pengelolaan Lingkungan Tambang, Emisi Karbon, Reklamasi & ESG
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Modul lengkap pemantauan lingkungan hidup: Pengelolaan Limbah B3, Kualitas Air Limbah & Settling Pond, Emisi Udara & Debu, Kebisingan & Getaran Peledakan, Penanaman Pohon Reklamasi Lahan, Audit AMDAL & Kepatuhan KLHK.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <Leaf className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Peringkat PROPER KLHK:</span>
            <strong className="text-emerald-400 font-mono text-base font-bold">PROPER HIJAU</strong>
          </div>
        </div>
      </div>

      {/* Sustainability Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Total Emisi Karbon (Scope 1 & 2)</span>
          <p className="text-2xl font-extrabold text-emerald-400">14,250 <span className="text-xs font-normal text-slate-400">tCO2e</span></p>
          <span className="text-[11px] text-slate-500 block">-12.4% vs Target Penurunan 2026</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Daur Ulang Air Tambang (Recycle)</span>
          <p className="text-2xl font-extrabold text-cyan-400">88.5% <span className="text-xs font-normal text-slate-400">Pond Efficiency</span></p>
          <span className="text-[11px] text-slate-500 block">Kualitas Baku Mutu pH 7.2 Compliant</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Lahan Reklamasi & Penanaman Pohon</span>
          <p className="text-2xl font-extrabold text-amber-300">142.5 Ha <span className="text-xs font-normal text-slate-400">(85,200 Pohon)</span></p>
          <span className="text-[11px] text-slate-500 block">Tingkat Keberhasilan Hidup 94.8%</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Pengelolaan Limbah B3</span>
          <p className="text-2xl font-extrabold text-emerald-400">100% <span className="text-xs font-normal text-slate-400">Licensed</span></p>
          <span className="text-[11px] text-slate-500 block">Manifest Festronik KLHK Verified</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs covering all 12 requested keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'overview_esg', label: 'Ringkasan ESG & Karbon', icon: Globe },
          { id: 'waste_management', label: 'Pengelolaan Limbah (Waste)', icon: Trash2 },
          { id: 'water_quality', label: 'Kualitas Air & Settling Pond', icon: Droplets },
          { id: 'air_emission', label: 'Kualitas Udara & Emisi (Air)', icon: Wind },
          { id: 'noise_vibration', label: 'Kebisingan & Getaran (Noise)', icon: Volume2 },
          { id: 'rehabilitation_trees', label: 'Reklamasi & Pohon (Tree Planting)', icon: TreePine },
          { id: 'compliance_audit', label: 'Audit AMDAL & Compliance KLHK', icon: ShieldCheck }
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

      {/* TAB 1: OVERVIEW ESG & CARBON FOOTPRINT */}
      {activeTab === 'overview_esg' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Kinerja ESG, Jejak Emisi Karbon & Net Zero Roadmap 2030
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-emerald-400 font-bold block border-b border-slate-800 pb-2">
                  Breakdown Emisi Karbon (Scope 1 & 2 GHG Emissions)
                </span>
                <div className="space-y-2 text-slate-300 font-mono">
                  <div className="flex justify-between items-center">
                    <span>Scope 1 (BBM Alat Berat Heavy Equipment):</span>
                    <strong className="text-amber-300">11,800 tCO2e</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Scope 1 (Peledakan Blasting Explosives):</span>
                    <strong className="text-amber-300">1,250 tCO2e</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Scope 2 (Listrik Genset & Power Grid):</span>
                    <strong className="text-emerald-400">1,200 tCO2e</strong>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-800 pt-2 font-bold text-slate-100">
                    <span>Kredit Karbon Serapan Pohon Reklamasi:</span>
                    <strong className="text-emerald-400">-3,450 tCO2e</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-emerald-400 font-bold block border-b border-slate-800 pb-2">
                  Pilar Keberlanjutan ESG Tambang Nikel
                </span>
                <div className="space-y-2 text-slate-300 text-[11px]">
                  <p>• <strong className="text-slate-100">Environmental:</strong> 100% settling pond memenuhi baku mutu cair, penanaman 85k pohon lokal.</p>
                  <p>• <strong className="text-slate-100">Social:</strong> Program Pengembangan Masyarakat (PPM) & CSR lokal 92% penyerapan tenaga kerja lokal.</p>
                  <p>• <strong className="text-slate-100">Governance:</strong> Audit AMDAL transparan, sertifikasi ISO 14001:2015 & ISO 45001.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: WASTE MANAGEMENT (LIMBAH B3 & NON-B3) */}
      {activeTab === 'waste_management' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pengelolaan & Penyimpanan TPS Limbah B3, Oily Sludge & Waste Non-B3
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">ID Waste Manifest</th>
                    <th className="py-2.5 px-3">Jenis Limbah B3 / Non-B3</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3">Volume / Berat (Ton)</th>
                    <th className="py-2.5 px-3">Lokasi Penyimpanan TPS</th>
                    <th className="py-2.5 px-3">Vendor Pengangkut Resmi</th>
                    <th className="py-2.5 px-3">Status Manifest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {wasteData.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{w.id}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{w.wasteType}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{w.category}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{w.qtyTon} Ton</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{w.storageLocation}</td>
                      <td className="py-3 px-3 font-sans text-slate-400">{w.transporter}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {w.status}
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

      {/* TAB 3: WATER QUALITY MONITORING */}
      {activeTab === 'water_quality' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemantauan Kualitas Air Tambang, Settling Pond, Kadar Besi (Fe), Mangan (Mn) & pH
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Pond ID</th>
                    <th className="py-2.5 px-3">Titik Titik Penaatan (Discharge Point)</th>
                    <th className="py-2.5 px-3">pH (Baku Mutu 6 - 9)</th>
                    <th className="py-2.5 px-3">TSS Total Suspended Solid</th>
                    <th className="py-2.5 px-3">Kadar Besi (Fe)</th>
                    <th className="py-2.5 px-3">Kadar Mangan (Mn)</th>
                    <th className="py-2.5 px-3">Status Baku Mutu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {waterQualityData.map((wq) => (
                    <tr key={wq.pondId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{wq.pondId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{wq.location}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{wq.pH}</td>
                      <td className="py-3 px-3 text-slate-200">{wq.tssMgL} mg/L</td>
                      <td className="py-3 px-3 text-slate-300">{wq.feMgL} mg/L</td>
                      <td className="py-3 px-3 text-slate-300">{wq.mnMgL} mg/L</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {wq.status}
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

      {/* TAB 4: AIR EMISSION & DUST */}
      {activeTab === 'air_emission' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemantauan Udara Ambien, Partikulat Debu (PM10/PM2.5) & Emisi Cerobong Power Plant
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Point ID</th>
                    <th className="py-2.5 px-3">Lokasi Titik Uji Udara</th>
                    <th className="py-2.5 px-3">Partikulat PM10 / SO2</th>
                    <th className="py-2.5 px-3">Partikulat PM2.5 / NOx</th>
                    <th className="py-2.5 px-3">Frekuensi Penyiraman Debu (Road Watering)</th>
                    <th className="py-2.5 px-3">Status Kepatuhan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {airEmissionData.map((a) => (
                    <tr key={a.pointId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{a.pointId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{a.location}</td>
                      <td className="py-3 px-3 text-emerald-300 font-bold">{a.pm10 || a.so2}</td>
                      <td className="py-3 px-3 text-emerald-300 font-bold">{a.pm25 || a.nox}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{a.wateringFrequency || a.opacity}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {a.status}
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

      {/* TAB 5: NOISE & BLASTING VIBRATION */}
      {activeTab === 'noise_vibration' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemantauan Kebisingan Lingkungan (Noise Level) & Getaran Peledakan (Blasting Vibration)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Point ID</th>
                    <th className="py-2.5 px-3">Lokasi Titik Pantau Kebisingan</th>
                    <th className="py-2.5 px-3">Tingkat Kebisingan (dBA)</th>
                    <th className="py-2.5 px-3">Standar Maksimal Kepmen LH</th>
                    <th className="py-2.5 px-3">Getaran Peledakan PPV (mm/s)</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {noiseData.map((n) => (
                    <tr key={n.pointId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{n.pointId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{n.location}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{n.noiseLevelDb} dBA</td>
                      <td className="py-3 px-3 text-slate-400">{n.standardMaxDb} dBA</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{n.blastingPPV}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {n.status}
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

      {/* TAB 6: REHABILITATION & TREE PLANTING */}
      {activeTab === 'rehabilitation_trees' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Reklamasi Lahan Bekas Tambang, Penanaman Pohon (Tree Planting) & Nursery
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Block / Site ID</th>
                    <th className="py-2.5 px-3">Luas Lahan (Ha)</th>
                    <th className="py-2.5 px-3">Target Jumlah Pohon</th>
                    <th className="py-2.5 px-3">Pohon Ditanam (Real)</th>
                    <th className="py-2.5 px-3">Spesies Tanaman Lokal & Cover Crop</th>
                    <th className="py-2.5 px-3">Tingkat Keberhasilan Hidup</th>
                    <th className="py-2.5 px-3">Fase Reklamasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {rehabTreesData.map((r) => (
                    <tr key={r.blockId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{r.blockId}</td>
                      <td className="py-3 px-3 text-slate-100 font-bold">{r.areaHa} Ha</td>
                      <td className="py-3 px-3 text-slate-400">{r.targetTrees.toLocaleString()} Pohon</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{r.plantedTrees.toLocaleString()} Pohon</td>
                      <td className="py-3 px-3 font-sans text-amber-300">{r.species}</td>
                      <td className="py-3 px-3 text-emerald-300 font-bold">{r.survivalRate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {r.phase}
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

      {/* TAB 7: COMPLIANCE & AMDAL AUDIT */}
      {activeTab === 'compliance_audit' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Laporan Kepatuhan Lingkungan AMDAL, RKL-RPL & Audit PROPER KLHK
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">ID Audit / Doc</th>
                    <th className="py-2.5 px-3">Scope Evaluasi Lingkungan</th>
                    <th className="py-2.5 px-3">Hasil Evaluasi / Rating</th>
                    <th className="py-2.5 px-3">Tanggal Penyerahan</th>
                    <th className="py-2.5 px-3">Status Kepatuhan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {complianceAudits.map((c) => (
                    <tr key={c.auditId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{c.auditId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{c.scope}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{c.resultRating}</td>
                      <td className="py-3 px-3 text-slate-400">{c.auditDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {c.status}
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

    </div>
  );
};
