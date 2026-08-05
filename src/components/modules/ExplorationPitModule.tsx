import React, { useState } from 'react';
import { 
  Pickaxe, 
  ShieldAlert, 
  Activity, 
  Layers, 
  Plus, 
  Search, 
  Filter, 
  Compass, 
  FileText, 
  Database, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Eye, 
  Grid, 
  Ruler, 
  TestTube, 
  Trees, 
  Globe, 
  Download, 
  ChevronRight, 
  RefreshCw, 
  Calculator, 
  X 
} from 'lucide-react';
import { PitOperation, MineSite, Language } from '../../types';

interface ExplorationPitModuleProps {
  pits: PitOperation[];
  sites: MineSite[];
  language: Language;
  onAddPitOperation: (newPit: PitOperation) => void;
}

export const ExplorationPitModule: React.FC<ExplorationPitModuleProps> = ({
  pits,
  sites,
  language,
  onAddPitOperation
}) => {
  const [activeGeoTab, setActiveGeoTab] = useState<
    | 'resource_reserve'
    | 'drill_holes'
    | 'core_logging'
    | 'sampling_quality'
    | 'grade_control'
    | 'block_model'
    | 'lithology_profile'
    | 'geotech_mapping'
    | 'gis_integration'
  >('resource_reserve');

  const [selectedSiteId, setSelectedSiteId] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [drillSearchTerm, setDrillSearchTerm] = useState('');
  const [drillStatusFilter, setDrillStatusFilter] = useState<string>('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBlockDetail, setSelectedBlockDetail] = useState<any | null>(null);

  // JORC Calculator State
  const [calcSaproliteTon, setCalcSaproliteTon] = useState<number>(18500000);
  const [calcSapGradeNi, setCalcSapGradeNi] = useState<number>(1.84);
  const [calcLimoniteTon, setCalcLimoniteTon] = useState<number>(12200000);
  const [calcLimGradeNi, setCalcLimGradeNi] = useState<number>(1.25);

  const [newPitName, setNewPitName] = useState('');
  const [newElevation, setNewElevation] = useState(250);
  const [newSaproliteMT, setNewSaproliteMT] = useState(3500);
  const [newLimoniteMT, setNewLimoniteMT] = useState(2200);
  const [newOverburdenMT, setNewOverburdenMT] = useState(15000);

  // Geology Datasets
  const resourceReserveJORCData = [
    { category: 'Terukur (Measured Resource)', saproliteWMT: 18500000, limoniteWMT: 12200000, avgNiGrade: 1.84, avgFeGrade: 18.2, status: 'KCMI Certified' },
    { category: 'Tunjuk (Indicated Resource)', saproliteWMT: 24200000, limoniteWMT: 16800000, avgNiGrade: 1.78, avgFeGrade: 19.5, status: 'KCMI Certified' },
    { category: 'Terekam (Inferred Resource)', saproliteWMT: 14100000, limoniteWMT: 9500000, avgNiGrade: 1.65, avgFeGrade: 21.0, status: 'In-Progress' },
    { category: 'Cadangan Terbukti (Proven Reserve)', saproliteWMT: 14200000, limoniteWMT: 9800000, avgNiGrade: 1.85, avgFeGrade: 18.0, status: 'Mineable Reserve' },
    { category: 'Cadangan Terkira (Probable Reserve)', saproliteWMT: 18100000, limoniteWMT: 12500000, avgNiGrade: 1.79, avgFeGrade: 19.1, status: 'Mineable Reserve' }
  ];

  const drillHolesDatabase = [
    { id: 'DH-BH-2026-001', easting: 384520, northing: 9720450, elevation: 185, totalDepthM: 32.5, azimuth: 0, dip: -90, status: 'COMPLETED', mainLitho: 'Saprolite High Grade' },
    { id: 'DH-BH-2026-002', easting: 384570, northing: 9720450, elevation: 188, totalDepthM: 28.0, azimuth: 0, dip: -90, status: 'COMPLETED', mainLitho: 'Limonite HPAL Feed' },
    { id: 'DH-BH-2026-003', easting: 384620, northing: 9720500, elevation: 192, totalDepthM: 35.0, azimuth: 0, dip: -90, status: 'DRILLING_NOW', mainLitho: 'Transition Zone' },
    { id: 'DH-BH-2026-004', easting: 384670, northing: 9720550, elevation: 195, totalDepthM: 30.0, azimuth: 0, dip: -90, status: 'PLANNED', mainLitho: 'Unexplored' }
  ];

  const filteredDrillHoles = drillHolesDatabase.filter(d => {
    const matchSearch = d.id.toLowerCase().includes(drillSearchTerm.toLowerCase()) || d.mainLitho.toLowerCase().includes(drillSearchTerm.toLowerCase());
    const matchStatus = drillStatusFilter === 'ALL' || d.status === drillStatusFilter;
    return matchSearch && matchStatus;
  });

  const coreLoggingIntervals = [
    { holeId: 'DH-BH-2026-001', depthFromM: 0.0, depthToM: 4.5, lithology: 'Overburden (Topsoil & Clay)', rqdPct: 15, niPct: 0.45, fePct: 38.5, smRatio: 0.8 },
    { holeId: 'DH-BH-2026-001', depthFromM: 4.5, depthToM: 14.0, lithology: 'Limonite (High Fe, Low Ni)', rqdPct: 45, niPct: 1.25, fePct: 46.2, smRatio: 1.2 },
    { holeId: 'DH-BH-2026-001', depthFromM: 14.0, depthToM: 26.5, lithology: 'Saprolite Ore (High Ni)', rqdPct: 75, niPct: 1.88, fePct: 16.8, smRatio: 2.15 },
    { holeId: 'DH-BH-2026-001', depthFromM: 26.5, depthToM: 32.5, lithology: 'Bedrock (Peridotite / Serpentinite)', rqdPct: 92, niPct: 0.35, fePct: 8.4, smRatio: 3.80 }
  ];

  const samplingLabQuality = [
    { sampleId: 'SMP-2026-0881', pit: 'Pit Alpha', holeId: 'DH-001', labCOA: 'Sucofindo Lab', niPct: 1.86, fePct: 17.5, coPct: 0.04, mcPct: 34.2, status: 'CERTIFIED' },
    { sampleId: 'SMP-2026-0882', pit: 'Pit Alpha', holeId: 'DH-001', labCOA: 'Intertek Lab', niPct: 1.82, fePct: 18.1, coPct: 0.05, mcPct: 33.8, status: 'CERTIFIED' },
    { sampleId: 'SMP-2026-0883', pit: 'Pit Beta', holeId: 'DH-002', labCOA: 'Site XRF Fast Test', niPct: 1.74, fePct: 20.4, coPct: 0.06, mcPct: 35.0, status: 'PRELIMINARY' }
  ];

  const blockModelMatrix = [
    { blockId: 'BLK-120-01', elevationBench: 'Bench +120m', niGrade: 1.88, feGrade: 16.5, smRatio: 2.2, densityTonM3: 1.6, category: 'SAPROLITE_HIGH', volumeM3: 1250, tonnageMT: 2000 },
    { blockId: 'BLK-120-02', elevationBench: 'Bench +120m', niGrade: 1.82, feGrade: 17.8, smRatio: 2.1, densityTonM3: 1.6, category: 'SAPROLITE_MID', volumeM3: 1250, tonnageMT: 2000 },
    { blockId: 'BLK-115-01', elevationBench: 'Bench +115m', niGrade: 1.79, feGrade: 18.4, smRatio: 1.9, densityTonM3: 1.6, category: 'SAPROLITE_MID', volumeM3: 1250, tonnageMT: 2000 },
    { blockId: 'BLK-115-02', elevationBench: 'Bench +115m', niGrade: 1.28, feGrade: 44.5, smRatio: 1.1, densityTonM3: 1.4, category: 'LIMONITE_HPAL', volumeM3: 1250, tonnageMT: 1750 }
  ];

  const geotechSlopeStability = [
    { slopeSector: 'Pit Alpha Highwall North', factorOfSafetyFoS: 1.45, status: 'SAFE', groundwaterM: 12.5, inclinometerMmPerDay: 0.4 },
    { slopeSector: 'Pit Alpha East Wall Bench +100', factorOfSafetyFoS: 1.18, status: 'WARNING', groundwaterM: 6.2, inclinometerMmPerDay: 2.1 },
    { slopeSector: 'Pit Beta South Wall', factorOfSafetyFoS: 1.52, status: 'SAFE', groundwaterM: 18.0, inclinometerMmPerDay: 0.2 }
  ];

  const filteredPits = pits.filter(p => {
    const matchSite = selectedSiteId === 'ALL' || p.siteId === selectedSiteId;
    const matchSearch = p.pitName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSite && matchSearch;
  });

  const handleCreatePit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPitName.trim()) return;

    const newPit: PitOperation = {
      id: `PIT-${Date.now()}`,
      pitName: newPitName,
      siteId: selectedSiteId === 'ALL' ? sites[0].id : selectedSiteId,
      elevationM: Number(newElevation),
      strippingRatioTarget: 3.8,
      strippingRatioActual: Number((newOverburdenMT / (newSaproliteMT + newLimoniteMT)).toFixed(2)),
      overburdenMTToday: Number(newOverburdenMT),
      saproliteMTToday: Number(newSaproliteMT),
      limoniteMTToday: Number(newLimoniteMT),
      weatherCondition: 'Cerah',
      safetyStatus: 'SAFE'
    };

    onAddPitOperation(newPit);
    setShowAddModal(false);
    setNewPitName('');
  };

  const calcContainedNiMetal = (
    (calcSaproliteTon * (calcSapGradeNi / 100)) + 
    (calcLimoniteTon * (calcLimGradeNi / 100))
  ).toLocaleString('id-ID', { maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Modul Geologi & Eksplorasi Terpadu
            </span>
            <span className="text-slate-400 text-xs">• JORC & KCMI Resource Estimator</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Geology, Exploration & Core Logging Hub
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem informasi geologi nikel: drill hole logging, sampling assay Sucofindo/Intertek, grade control, 3D block model, stratigrafi litologi, geoteknik lereng pit, dan integrasi peta GIS spatial.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Front Pit Baru</span>
          </button>
        </div>
      </div>

      {/* Geology Sub-Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'resource_reserve', label: 'Resource & Reserve (JORC)', icon: Database, badge: '56.8M WMT' },
          { id: 'drill_holes', label: 'Drill Hole Database', icon: Grid, badge: '4,820m' },
          { id: 'core_logging', label: 'Core Logging & RQD', icon: Ruler, badge: '4 Interval' },
          { id: 'sampling_quality', label: 'Sampling & Ore Quality', icon: TestTube, badge: 'COA Cert' },
          { id: 'grade_control', label: 'Grade Control & Pit Front', icon: Pickaxe, badge: 'Active Pit' },
          { id: 'block_model', label: 'Block Model & Heatmap', icon: Layers, badge: '3D Matrix' },
          { id: 'lithology_profile', label: 'Lithology Stratigraphy', icon: Trees, badge: '4 Horizon' },
          { id: 'geotech_mapping', label: 'Geotech Slope Stability', icon: ShieldAlert, badge: 'FoS 1.45' },
          { id: 'gis_integration', label: 'GIS Spatial Mapping', icon: Globe, badge: 'WGS84 51S' }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeGeoTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveGeoTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* SUB-MODULE 1: RESOURCE & RESERVE (JORC / KCMI) */}
      {activeGeoTab === 'resource_reserve' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Total Sumber Daya Nikel (Resource)</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">56.8 Juta WMT</span>
              <span className="text-emerald-400 block mt-1">Status: KCMI Certified 2026</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Total Cadangan Tambang (Reserve)</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">32.3 Juta WMT</span>
              <span className="text-slate-400 block mt-1">Proven + Probable</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Rata-rata Kadar Saprolit Ore</span>
              <span className="text-2xl font-bold text-amber-400 font-mono">1.83% Ni</span>
              <span className="text-slate-400 block mt-1">Umpan Smelter RKEF</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Estimasi Sisa Umur Tambang (LoM)</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">18.5 Tahun</span>
              <span className="text-slate-400 block mt-1">Target Produksi 2.5M MT/Tahun</span>
            </div>
          </div>

          {/* JORC Interactive Calculator */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Calculator className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-sm">Simulator Kalkulasi Logam Nikel Terkandung (Contained Nickel Metal)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Tonase Saprolit (WMT):</label>
                <input
                  type="number"
                  value={calcSaproliteTon}
                  onChange={(e) => setCalcSaproliteTon(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Kadar Ni Saprolit (%):</label>
                <input
                  type="number"
                  step="0.01"
                  value={calcSapGradeNi}
                  onChange={(e) => setCalcSapGradeNi(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Tonase Limonit (WMT):</label>
                <input
                  type="number"
                  value={calcLimoniteTon}
                  onChange={(e) => setCalcLimoniteTon(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Kadar Ni Limonit (%):</label>
                <input
                  type="number"
                  step="0.01"
                  value={calcLimGradeNi}
                  onChange={(e) => setCalcLimGradeNi(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-blue-400 font-mono font-bold"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300 font-bold">Hasil Contained Nickel Metal:</span>
              <span className="text-2xl font-bold text-amber-400 font-mono">{calcContainedNiMetal} MT Metal Ni</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Klasifikasi Mineral Resource & Ore Reserve (JORC / KCMI Code)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Kategori Sumber Daya & Cadangan</th>
                    <th className="py-2.5 px-3">Tonase Saprolit (WMT)</th>
                    <th className="py-2.5 px-3">Tonase Limonit (WMT)</th>
                    <th className="py-2.5 px-3">Kadar Rata-Rata Ni (%)</th>
                    <th className="py-2.5 px-3">Kadar Besi Fe (%)</th>
                    <th className="py-2.5 px-3">Sertifikasi KCMI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {resourceReserveJORCData.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200 font-sans">{r.category}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{(r.saproliteWMT ?? 0).toLocaleString('id-ID')} MT</td>
                      <td className="py-3 px-3 text-blue-400">{(r.limoniteWMT ?? 0).toLocaleString('id-ID')} MT</td>
                      <td className="py-3 px-3 text-amber-400 font-bold">{r.avgNiGrade}% Ni</td>
                      <td className="py-3 px-3 text-slate-300">{r.avgFeGrade}% Fe</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
                          {r.status}
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

      {/* SUB-MODULE 2: DRILL HOLE DATABASE */}
      {activeGeoTab === 'drill_holes' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Database Titik Bor Eksplorasi (Drill Hole Geodatabase)</h3>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={drillStatusFilter}
                  onChange={(e) => setDrillStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 text-xs focus:outline-none"
                >
                  <option value="ALL">Semua Status Bor</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="DRILLING_NOW">DRILLING_NOW</option>
                  <option value="PLANNED">PLANNED</option>
                </select>

                <div className="relative flex-1 sm:w-48">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari Hole ID..."
                    value={drillSearchTerm}
                    onChange={(e) => setDrillSearchTerm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Hole ID</th>
                    <th className="py-2.5 px-3">Koordinat Easting (X)</th>
                    <th className="py-2.5 px-3">Koordinat Northing (Y)</th>
                    <th className="py-2.5 px-3">Elevasi (Z)</th>
                    <th className="py-2.5 px-3">Kedalaman (m)</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Litologi Utama</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredDrillHoles.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200">{d.id}</td>
                      <td className="py-3 px-3 text-slate-400">{d.easting}</td>
                      <td className="py-3 px-3 text-slate-400">{d.northing}</td>
                      <td className="py-3 px-3 text-slate-300">{d.elevation} m</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{d.totalDepthM} m</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          d.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-sans text-slate-300">{d.mainLitho}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 3: CORE LOGGING & RQD */}
      {activeGeoTab === 'core_logging' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Catatan Core Logging Interval & RQD (Rock Quality Designation) - Hole DH-BH-2026-001
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Depth From (m)</th>
                    <th className="py-2.5 px-3">Depth To (m)</th>
                    <th className="py-2.5 px-3">Litologi Core</th>
                    <th className="py-2.5 px-3">RQD (%)</th>
                    <th className="py-2.5 px-3">Ni (%)</th>
                    <th className="py-2.5 px-3">Fe (%)</th>
                    <th className="py-2.5 px-3">SM Ratio (SiO2/MgO)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {coreLoggingIntervals.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 text-slate-300">{c.depthFromM} m</td>
                      <td className="py-3 px-3 text-slate-300">{c.depthToM} m</td>
                      <td className="py-3 px-3 font-bold font-sans text-slate-100">{c.lithology}</td>
                      <td className="py-3 px-3 text-blue-400">{c.rqdPct}%</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{c.niPct}%</td>
                      <td className="py-3 px-3 text-amber-400">{c.fePct}%</td>
                      <td className="py-3 px-3 text-slate-200">{c.smRatio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 4: SAMPLING & ORE QUALITY */}
      {activeGeoTab === 'sampling_quality' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Hasil Lab Uji Sampel Ore Quality Assays (Sucofindo / Intertek COA)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Sample ID</th>
                    <th className="py-2.5 px-3">Pit Asal</th>
                    <th className="py-2.5 px-3">Laboratorium Uji</th>
                    <th className="py-2.5 px-3">Kadar Ni (%)</th>
                    <th className="py-2.5 px-3">Kadar Fe (%)</th>
                    <th className="py-2.5 px-3">Kadar Co (%)</th>
                    <th className="py-2.5 px-3">Moisture Content (MC)</th>
                    <th className="py-2.5 px-3">Status COA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {samplingLabQuality.map((s) => (
                    <tr key={s.sampleId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200">{s.sampleId}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{s.pit}</td>
                      <td className="py-3 px-3 font-sans text-emerald-400">{s.labCOA}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{s.niPct}%</td>
                      <td className="py-3 px-3 text-amber-400">{s.fePct}%</td>
                      <td className="py-3 px-3 text-slate-300">{s.coPct}%</td>
                      <td className="py-3 px-3 text-blue-400">{s.mcPct}%</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
                          {s.status}
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

      {/* SUB-MODULE 5: GRADE CONTROL & PIT FRONT */}
      {activeGeoTab === 'grade_control' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPits.map((pit) => (
              <div key={pit.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-100 text-base">{pit.pitName}</h3>
                    <p className="text-slate-400">Cut-off Grade: 1.5% Ni</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    GRADE ACTIVE
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                    <span className="text-slate-400">Ore Saprolit Hari Ini:</span>
                    <strong className="text-emerald-400 font-mono">{pit.saproliteMTToday} MT</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                    <span className="text-slate-400">Ore Limonit Hari Ini:</span>
                    <strong className="text-blue-400 font-mono">{pit.limoniteMTToday} MT</strong>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                    <span className="text-slate-400">Overburden Waste:</span>
                    <strong className="text-slate-300 font-mono">{pit.overburdenMTToday} MT</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-MODULE 6: BLOCK MODEL & HEATMAP */}
      {activeGeoTab === 'block_model' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              3D Geological Ore Block Model Matrix (Klik Blok Untuk Detail)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {blockModelMatrix.map((b) => (
                <div 
                  key={b.blockId} 
                  onClick={() => setSelectedBlockDetail(b)}
                  className="p-4 bg-slate-950 hover:bg-slate-800/80 rounded-xl border border-slate-800 space-y-2 cursor-pointer transition-all hover:border-emerald-500/50"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{b.blockId}</span>
                    <span className="text-slate-500 text-[10px]">{b.elevationBench}</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 font-mono">
                    {b.niGrade}% Ni
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Fe: {b.feGrade}%</span>
                    <span>SM: {b.smRatio}</span>
                  </div>
                  <p className="text-[10px] text-emerald-400 font-semibold pt-1">Klik inspeksi blok &rarr;</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 7: LITHOLOGY STRATIGRAPHY */}
      {activeGeoTab === 'lithology_profile' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
            Profil Lapisan Litologi Nickel Laterite Deposit (Profil Horizon Tambang)
          </h3>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1">
              <span className="font-bold text-amber-400 block">1. Overburden / Topsoil Layer (0 - 4.5m)</span>
              <p className="text-slate-300">Tanah penutup merah laterit, kadar Ni &lt; 0.8%, Fe tinggi. Dipindahkan ke Waste Dump.</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-1">
              <span className="font-bold text-blue-400 block">2. Limonite Layer (4.5m - 14.0m)</span>
              <p className="text-slate-300">Endapan halus oksida besi (Fe ~46%), kadar Ni 1.1% - 1.4%. Umpan pabrik HPAL baterai EV.</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1">
              <span className="font-bold text-emerald-400 block">3. Saprolite Layer (14.0m - 26.5m)</span>
              <p className="text-slate-300">Zona bijih kaya silikat nikel (Ni ≥ 1.8%, Fe ~16%). Umpan utama Smelter RKEF Feronikel/NPI.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-bold text-slate-400 block">4. Bedrock / Peridotite Serpentinized (&gt; 26.5m)</span>
              <p className="text-slate-500">Batuan dasar induk ultramafik unweathered bedrock.</p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 8: GEOTECH SLOPE STABILITY */}
      {activeGeoTab === 'geotech_mapping' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemantauan Kestabilan Lereng Geoteknik Pit (Factor of Safety - FoS)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {geotechSlopeStability.map((g, i) => (
                <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{g.slopeSector}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      g.status === 'SAFE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {g.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-400">Factor of Safety (FoS):</span>
                    <span className="text-xl font-bold text-emerald-400 font-mono">{g.factorOfSafetyFoS}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Muka Air Tanah: {g.groundwaterM} m</span>
                    <span>Inclinometer: {g.inclinometerMmPerDay} mm/day</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 9: GIS SPATIAL MAPPING */}
      {activeGeoTab === 'gis_integration' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">GIS Spatial Integration & Map Overlay</h3>
            <span className="text-emerald-400 font-mono">Projection: UTM WGS84 Zone 51S Morowali</span>
          </div>

          <div className="relative h-80 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            
            <div className="text-center space-y-2 z-10 p-4">
              <Globe className="w-10 h-10 text-emerald-400 mx-auto animate-pulse" />
              <p className="font-bold text-slate-200 text-sm">Overlay Peta Topografi, Boundary IUP & Titik Bor Eksplorasi</p>
              <p className="text-slate-400 text-xs max-w-md">
                Terhubung otomatis dengan database spatial GIS ArcGIS / QGIS Server site pertambangan.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Block Inspector Modal */}
      {selectedBlockDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Inspeksi Detail Block Model {selectedBlockDetail.blockId}</h3>
              <button 
                onClick={() => setSelectedBlockDetail(null)}
                className="text-slate-400 hover:text-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Elevasi Bench:</span>
                <span className="font-bold text-slate-100 font-mono">{selectedBlockDetail.elevationBench}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Kadar Nikel (Ni):</span>
                <span className="font-bold text-emerald-400 font-mono">{selectedBlockDetail.niGrade}% Ni</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Kadar Besi (Fe):</span>
                <span className="font-bold text-amber-400 font-mono">{selectedBlockDetail.feGrade}% Fe</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Rasio Silica-Magnesia (SM):</span>
                <span className="font-bold text-slate-200 font-mono">{selectedBlockDetail.smRatio}</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-950 rounded">
                <span className="text-slate-400">Density & Volume:</span>
                <span className="font-bold text-slate-200 font-mono">{selectedBlockDetail.densityTonM3} t/m³ | {selectedBlockDetail.volumeM3} m³</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedBlockDetail(null)}
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500"
              >
                Tutup Inspeksi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Pit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-lg">Tambah Front Pit Penambangan Baru</h3>
            
            <form onSubmit={handleCreatePit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nama Front Pit:</label>
                <input
                  type="text"
                  required
                  value={newPitName}
                  onChange={(e) => setNewPitName(e.target.value)}
                  placeholder="e.g. Pit Delta High-Grade"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Target Saprolit (MT):</label>
                  <input
                    type="number"
                    value={newSaproliteMT}
                    onChange={(e) => setNewSaproliteMT(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Target Limonit (MT):</label>
                  <input
                    type="number"
                    value={newLimoniteMT}
                    onChange={(e) => setNewLimoniteMT(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Volume Overburden (MT):</label>
                <input
                  type="number"
                  value={newOverburdenMT}
                  onChange={(e) => setNewOverburdenMT(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                >
                  Simpan Pit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
