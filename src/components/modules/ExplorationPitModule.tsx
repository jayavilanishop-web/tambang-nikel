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
  X,
  ShieldCheck,
  Check,
  Lock,
  BarChart3,
  Flame,
  TrendingUp,
  Zap,
  Clock,
  Truck,
  Scale,
  Wrench,
  AlertCircle,
  Building2,
  Users
} from 'lucide-react';
import { PitOperation, MineSite, Language } from '../../types';

interface ExplorationPitModuleProps {
  pits?: PitOperation[];
  sites?: MineSite[];
  language?: Language;
  onAddPitOperation?: (newPit: PitOperation) => void;
  initialTab?: string;
}

export const ExplorationPitModule: React.FC<ExplorationPitModuleProps> = ({
  pits = [],
  sites = [],
  language = 'id',
  onAddPitOperation,
  initialTab
}) => {
  const [activeGeoTab, setActiveGeoTab] = useState<
    | 'dasbor_geologist'
    | 'master_data_geologist'
    | 'dasbor_mine_engineer'
    | 'master_data_mine_engineer'
    | 'resource_reserve'
    | 'drill_holes'
    | 'core_logging'
    | 'sampling_quality'
    | 'grade_control'
    | 'block_model'
    | 'lithology_profile'
    | 'geotech_mapping'
    | 'gis_integration'
  >((initialTab as any) || 'dasbor_geologist');

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
          { id: 'dasbor_geologist', label: '🪨 Dasbor Geologist', icon: Compass, badge: 'Chief Geology Cockpit' },
          { id: 'master_data_geologist', label: '🗄️ Master Data Geologist', icon: Database, badge: 'Drill & Assay' },
          { id: 'dasbor_mine_engineer', label: '⛏️ Dasbor Mine Engineer', icon: Pickaxe, badge: 'Planning Cockpit' },
          { id: 'master_data_mine_engineer', label: '🗄️ Master Data Mine Engineer', icon: Database, badge: 'Pit & Blast' },
          { id: 'resource_reserve', label: 'Resource & Reserve (JORC)', icon: Database, badge: '56.8M WMT' },
          { id: 'drill_holes', label: 'Drill Hole Database', icon: Grid, badge: '4,820m' },
          { id: 'core_logging', label: 'Core Logging & RQD', icon: Ruler, badge: '4 Interval' },
          { id: 'sampling_quality', label: 'Sampling & Ore Quality', icon: TestTube, badge: 'COA Cert' },
          { id: 'grade_control', label: 'Grade Control & Pit Front', icon: Pickaxe, badge: 'Active Pit' },
          { id: 'block_model', label: 'Block Model & Heatmap', icon: Layers, badge: '3D Matrix' },
          { id: 'lithology_profile', label: 'Lithology Stratigraphy', icon: Trees, badge: '4 Horizon' },
          { id: 'geotech_mapping', label: 'Geotech Slope Stability', icon: ShieldAlert, badge: 'FoS 1.45' },
          { id: 'gis_integration', label: 'GIS Spatial Mapping', icon: Globe, badge: 'WGS84 51S' }
        ].filter((tab) => {
          if (initialTab === 'dasbor_mine_engineer' || initialTab === 'master_data_mine_engineer') {
            return tab.id !== 'dasbor_geologist' && tab.id !== 'master_data_geologist';
          }
          if (initialTab === 'dasbor_geologist' || initialTab === 'master_data_geologist') {
            return tab.id !== 'dasbor_mine_engineer' && tab.id !== 'master_data_mine_engineer';
          }
          return true;
        }).map((tab) => {
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

      {/* SUB-MODULE: DASBOR AKUN GEOLOGIST */}
      {activeGeoTab === 'dasbor_geologist' && (
        <div className="space-y-6">
          {/* Top KPI Cards Geologist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Total Estimasi JORC Resource</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Measured + Indicated
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400 font-mono">56.8M</span>
                <span className="text-slate-400 text-[11px]">WMT Ore Nikel</span>
              </div>
              <span className="text-emerald-400 text-[11px] block mt-1 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saprolite 32.4M WMT | Limonite 24.4M WMT
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Kemajuan Pengeboran (Drill Holes)</span>
                <span className="text-slate-500 text-[10px] font-mono">Infill & Exploration</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-100 font-mono">4,820</span>
                <span className="text-slate-400 text-[11px]">Meter / 120 Titik</span>
              </div>
              <span className="text-blue-400 text-[11px] block mt-1 font-semibold">
                Pencapaian Target RKAB: 96.4%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Rata-Rata Kadar Ni (Assay Lab)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Grade Control
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400 font-mono">1.82%</span>
                <span className="text-slate-400 text-[11px]">Ni Saprolite</span>
              </div>
              <span className="text-slate-400 text-[11px] block mt-1">
                Limonite: Ni 1.25% | Fe 46.2% | SiO2/MgO: 1.85
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Akurasi QA/QC Sample Assay</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  CRM Standard
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-teal-400 font-mono">99.4%</span>
                <span className="text-slate-400 text-[11px]">Compliance Rate</span>
              </div>
              <span className="text-teal-400 text-[11px] block mt-1 font-semibold">
                Duplicate & Blank Pass Rate: OK
              </span>
            </div>
          </div>

          {/* MATRIKS WEWENANG & AKSES MODUL GEOLOGIST */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-base">Matriks Hak Akses & Fitur Akun Geologist (Chief & Mine Geologist)</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Kebijakan otorisasi sistem untuk peran <span className="text-emerald-400 font-bold">Chief Geologist, Exploration Geologist & Grade Control Geologist</span>.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Role: Geologist (Technical Category)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
              {/* FULL ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Boleh Diakses Penuh (Full Access)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px]">
                    CRUD FULL
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Database Titik Bor (Drill Holes):</strong> Perencanaan titik bor infill & eksplorasi, koordinat X/Y/Z, azimuth/dip, & logging kemajuan bor.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Core Logging & RQD:</strong> Deskripsi litologi per interval (Limonite, Transition, Saprolite, Bedrock), core recovery %, RQD %, & foto core box.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Sampling & QA/QC Assay Lab:</strong> Manajemen sampel core/channel, insersi Certified Reference Material (CRM), duplicate & blank sample.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Block Model & Estimasi Sumber Daya:</strong> Geostatistik Ordinary Kriging & IDW, pemodelan blok kadar Ni, Fe, SiO2, MgO, & estimasi JORC/KCMI.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Penentuan Grade Shell & Boundary Ore:</strong> Memetakan batas lapisan Saprolite High Grade (Ni &gt;= 1.6%) vs Limonite Low Grade HPAL (Ni 1.0 - 1.4%).
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Grade Control & Boundary Tagging:</strong> Pemasangan pita pita pita boundary ore di front pit untuk mengarahkan excavator penambangan.
                    </div>
                  </li>
                </ul>
              </div>

              {/* LIMITED / READ-VERIFY ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
                    <Eye className="w-4 h-4" /> Akses Terbatas (Read & Verify)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[10px]">
                    READ / VIEW ONLY
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Peta GIS & Topografi Drone (Surveyor):</strong> Melihat kontur As-Built pit & peta orthophoto hasil pemetaan drone.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Pit Design & Blasting Plan (Mine Engineer):</strong> Melihat peta desain ramp & sekuens peledakan untuk koordinasi pit front.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Stockpile Ore Blending:</strong> Monitoring kadar rata-rata stockpile EFO & Dome untuk penyesuaian target pengiriman smelter.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Sertifikat COA Lab Surveyor:</strong> Melihat hasil analisis kadar ore tongkang dari surveyor independen (Sucosindo/Carsurin).
                    </div>
                  </li>
                </ul>
              </div>

              {/* RESTRICTED ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5 text-sm">
                    <Lock className="w-4 h-4" /> Akses Dibatasi (No Access)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-extrabold text-[10px]">
                    RESTRICTED
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Payroll & Gaji SDM:</strong> Tidak dapat mengakses rekapan gaji, slip gaji, & insentif karyawan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Jurnal Akuntansi GL & Bank:</strong> Restriksi penuh dari transaksi kas/bank & neraca laporan keuangan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Procurement & Payment Commercial:</strong> Tidak dapat mengubah nilai kontrak & invoice supplier/vendor.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Modul e-Faktur Pajak & PNBP:</strong> Pengelolaan sistem pajak & royalti minerba khusus divisi Finance/Tax.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Activity Drilling Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-base">Status Rig Pengeboran & Log Geologi Terkini</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Pengeboran Aktif: IUP Nikel Block Alpha & Beta
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">ID Titik Bor & Rig</th>
                    <th className="p-3">Lokasi / Pit Block</th>
                    <th className="p-3">Total Depth (m)</th>
                    <th className="p-3">Interseksi Ore (Saprolite)</th>
                    <th className="p-3">Kadar Ni / Fe Rata-Rata</th>
                    <th className="p-3">Core Recovery / RQD</th>
                    <th className="p-3">Status Logging</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      DH-ALPHA-102 (Rig Jacro-01)
                    </td>
                    <td className="p-3 text-slate-300">Pit Alpha Central Main</td>
                    <td className="p-3 font-bold text-slate-100">32.5 m</td>
                    <td className="p-3 text-amber-400 font-semibold">12.0m - 24.5m (Thick: 12.5m)</td>
                    <td className="p-3 text-emerald-400 font-bold">Ni 1.92% | Fe 18.5%</td>
                    <td className="p-3 text-teal-400 font-bold">98.5% / RQD 88%</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        COMPLETED LOGGING
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      DH-BETA-088 (Rig Jacro-03)
                    </td>
                    <td className="p-3 text-slate-300">Pit Beta North HPAL Area</td>
                    <td className="p-3 font-bold text-slate-100">28.0 m</td>
                    <td className="p-3 text-blue-400 font-semibold">4.0m - 18.5m (Limonite 14.5m)</td>
                    <td className="p-3 text-blue-400 font-bold">Ni 1.32% | Fe 48.1%</td>
                    <td className="p-3 text-teal-400 font-bold">96.0% / RQD 75%</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        COMPLETED LOGGING
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      DH-GAMMA-014 (Rig Jacro-02)
                    </td>
                    <td className="p-3 text-slate-300">Pit Gamma South Exploration</td>
                    <td className="p-3 font-bold text-amber-300">18.5 m (In Progress)</td>
                    <td className="p-3 text-slate-400">Sedang Penetrasi Limonite Horizon</td>
                    <td className="p-3 text-slate-400">Assay In Lab</td>
                    <td className="p-3 text-slate-300">97.2% / RQD 82%</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        DRILLING IN PROGRESS
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN GEOLOGIST */}
      {activeGeoTab === 'master_data_geologist' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-base">Master Data Register Geologist (Exploration & Ore Quality)</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Database master titik bor (drill hole master), log litologi core box, serta register kontrol kualitas sampel laboratorium (Assay QA/QC).
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Registrasi Titik Bor Baru</span>
              </button>
            </div>

            {/* TABEL 1: MASTER DRILL HOLE DATABASE */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <Grid className="w-4 h-4 text-emerald-400" />
                1. Master Register Titik Pengeboran Eksplorasi & Infill (Drill Hole Master)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">ID Titik Bor</th>
                      <th className="p-3">Pit Block / Lokasi</th>
                      <th className="p-3">Koordinat Northing (mN)</th>
                      <th className="p-3">Koordinat Easting (mE)</th>
                      <th className="p-3">Elevasi RL</th>
                      <th className="p-3">Total Depth</th>
                      <th className="p-3">Azimuth / Dip</th>
                      <th className="p-3">Status Logging</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">DH-ALPHA-102</td>
                      <td className="p-3 font-bold text-slate-100">Pit Alpha Central</td>
                      <td className="p-3">9,682,450.12</td>
                      <td className="p-3">345,120.85</td>
                      <td className="p-3">215.4m RL</td>
                      <td className="p-3 font-bold text-slate-100">32.5 m</td>
                      <td className="p-3 text-slate-400">0° / -90° (Vertical)</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          VERIFIED & ASSAYED
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">DH-BETA-088</td>
                      <td className="p-3 font-bold text-slate-100">Pit Beta North</td>
                      <td className="p-3">9,683,110.45</td>
                      <td className="p-3">346,015.30</td>
                      <td className="p-3">168.2m RL</td>
                      <td className="p-3 font-bold text-slate-100">28.0 m</td>
                      <td className="p-3 text-slate-400">0° / -90° (Vertical)</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          VERIFIED & ASSAYED
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">DH-GAMMA-014</td>
                      <td className="p-3 font-bold text-slate-100">Pit Gamma South</td>
                      <td className="p-3">9,681,890.60</td>
                      <td className="p-3">344,800.10</td>
                      <td className="p-3">240.0m RL</td>
                      <td className="p-3 font-bold text-slate-100">18.5 m</td>
                      <td className="p-3 text-slate-400">0° / -90° (Vertical)</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          DRILLING IN PROGRESS
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 2: MASTER CORE LOGGING & STRATIGRAFI LITOLOGI */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-400" />
                2. Master Register Interval Core Logging & Stratigrafi Horizon
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">ID Core Box</th>
                      <th className="p-3">ID Titik Bor</th>
                      <th className="p-3">Horizon Litologi</th>
                      <th className="p-3">Interval Depth (From - To)</th>
                      <th className="p-3">Tebal Layer</th>
                      <th className="p-3">Core Recovery %</th>
                      <th className="p-3">RQD %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">BOX-ALP-102-01</td>
                      <td className="p-3 text-slate-100">DH-ALPHA-102</td>
                      <td className="p-3 text-amber-400 font-bold">Overburden & Red Limonite</td>
                      <td className="p-3">0.0m - 4.5m</td>
                      <td className="p-3">4.5 Meter</td>
                      <td className="p-3 text-emerald-400 font-bold">99.0%</td>
                      <td className="p-3 text-slate-300">45% (Unconsolidated)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">BOX-ALP-102-02</td>
                      <td className="p-3 text-slate-100">DH-ALPHA-102</td>
                      <td className="p-3 text-blue-400 font-bold">Yellow Limonite (HPAL Grade)</td>
                      <td className="p-3">4.5m - 12.0m</td>
                      <td className="p-3">7.5 Meter</td>
                      <td className="p-3 text-emerald-400 font-bold">98.5%</td>
                      <td className="p-3 text-slate-300">65% (Friable)</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">BOX-ALP-102-03</td>
                      <td className="p-3 text-slate-100">DH-ALPHA-102</td>
                      <td className="p-3 text-emerald-400 font-bold">Saprolite High Grade Ore</td>
                      <td className="p-3">12.0m - 24.5m</td>
                      <td className="p-3 text-emerald-400 font-bold">12.5 Meter</td>
                      <td className="p-3 text-emerald-400 font-bold">98.8%</td>
                      <td className="p-3 text-teal-400 font-bold">88% (Highly Competent)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 3: DETAILED PERMISSION MATRIX TABLE GEOLOGIST */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                3. Matriks Otorisasi Modul & Operasi CRUD Sistem ERP untuk Akun Geologist
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Nama Modul ERP</th>
                      <th className="p-3">Fitur / Sub-Sistem</th>
                      <th className="p-3">Level Akses</th>
                      <th className="p-3">Flags (C / R / U / D)</th>
                      <th className="p-3">Catatan Otorisasi Geologi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Database Pengeboran & Infill Drilling</td>
                      <td className="p-3 text-slate-300">Register Titik Bor, Azimuth, Dip, Depth & Status Logging</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Otoritas penuh pembuatan & pengeditan log bor.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Core Logging & Stratigrafi RQD</td>
                      <td className="p-3 text-slate-300">Deskripsi Litologi, Interval Horizon, Core Recovery & RQD</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Manajemen foto core box & interval litologi.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Sampling & QA/QC Assay Lab</td>
                      <td className="p-3 text-slate-300">Register Sample, Insersi CRM Standard, Blank & Duplicates</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Kontrol penuh akurasi laboratorium geologi.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Block Model JORC & Heatmap Kadar</td>
                      <td className="p-3 text-slate-300">Kriging Interpolation, Grade Shell Ni/Fe & Resource Category</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Penyusunan estimasi cadangan JORC/KCMI.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Survey Drone Topografi & GIS</td>
                      <td className="p-3 text-slate-300">Peta As-Built Surface, Kontur Topografi & Orthophoto</td>
                      <td className="p-3 text-amber-400 font-bold">READ ONLY</td>
                      <td className="p-3 text-amber-300 font-bold">_ / R / _ / _</td>
                      <td className="p-3 text-slate-400">Memerlukan sinkronisasi dari data tim Surveyor.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Financial Ledger & Payroll HR</td>
                      <td className="p-3 text-slate-300">Gaji Karyawan, Jurnal Kas/Bank & Tax PNBP Minerba</td>
                      <td className="p-3 text-rose-400 font-bold">RESTRICTED</td>
                      <td className="p-3 text-rose-300 font-bold">_ / _ / _ / _</td>
                      <td className="p-3 text-slate-400">Restriksi penuh dari area finansial & HR.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN MINE ENGINEER */}
      {activeGeoTab === 'dasbor_mine_engineer' && (
        <div className="space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Stripping Ratio (SR) Actual</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Target: 3.80
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400 font-mono">3.42</span>
                <span className="text-slate-400 text-[11px]">BCM / WMT</span>
              </div>
              <span className="text-emerald-400 text-[11px] block mt-1 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Optimal (-10% Waste Volume)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Material Moved (Overburden)</span>
                <span className="text-slate-500 text-[10px] font-mono">Shift 1 & 2</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-100 font-mono">42,500</span>
                <span className="text-slate-400 text-[11px]">BCM / Hari</span>
              </div>
              <span className="text-blue-400 text-[11px] block mt-1 font-semibold">
                Target Plan RKAB: 40,000 BCM
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Ore Production Target</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Ni 1.82%
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400 font-mono">12,800</span>
                <span className="text-slate-400 text-[11px]">WMT / Hari</span>
              </div>
              <span className="text-slate-400 text-[11px] block mt-1">
                Saprolite: 7,500 WMT | Limonite: 5,300 WMT
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Geotech Slope Safety (FoS)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  Radar SSR
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-teal-400 font-mono">1.45</span>
                <span className="text-slate-400 text-[11px]">Safety Factor</span>
              </div>
              <span className="text-teal-400 text-[11px] block mt-1 font-semibold">
                Batas Aman KTT: &gt;= 1.30 (Status: Normal)
              </span>
            </div>
          </div>

          {/* MATRIKS WEWENANG & AKSES MODUL MINE ENGINEER */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Pickaxe className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-slate-100 text-base">Matriks Hak Akses & Fitur Akun Mining Engineer</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Kebijakan keamanan sistem & otorisasi akses modul untuk peran <span className="text-amber-400 font-bold">Mining Engineer & Mine Planning Specialist</span>.
                </p>
              </div>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Role: Mine Engineer (Technical Category)
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
              {/* FULL ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-sm">
                    <CheckCircle2 className="w-4 h-4" /> Boleh Diakses Penuh (Full Access)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px]">
                    CRUD FULL
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Perencanaan & Desain Pit 3D:</strong> Pembuatan kontur design pit, geometri bench (tinggi bench, lebar berm), ramp access & cut & fill surface reconciliation.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Stripping Ratio & Overburden Dump:</strong> Kalkulasi SR harian/mingguan, kapasitas waste dump, haul road gradient & distance analysis.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Skenario Peledakan (D&B Pattern):</strong> Merancang spacing, burden, kedalaman lubang bor, charge ANFO, serta evaluasi fragmentasi D50.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Block Model & Estimasi JORC:</strong> Geostatistik Kriging/IDW, grade shell (Ni &gt;= 1.6% & Ni &gt;= 1.2%), interpolasi block model.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Geoteknik Lereng Pit (Slope Stability):</strong> Pemantauan Factor of Safety (FoS), Slope Radar (SSR) displacement, & rekomendasi lereng aman.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Plan RKAB & Production Schedule:</strong> Menyusun rencana kerja tahunan ke ESDM, sekuens tambang bulanan, & pit closure plan.
                    </div>
                  </li>
                </ul>
              </div>

              {/* LIMITED / READ-VERIFY ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5 text-sm">
                    <Eye className="w-4 h-4" /> Akses Terbatas (Read & Verify)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[10px]">
                    READ / VIEW ONLY
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Survei Topografi & LiDAR:</strong> Melihat peta kontur As-Built hasil survei drone untuk rekonsiliasi volume galian tambang.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Fleet Telemetry & Dispatch FMS:</strong> Melihat status pengerahan unit, queuing time di loading point, & cycle time real-time.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Stockpile Ore Blending:</strong> Melihat ketersediaan stock di EFO/Dome & koordinasi target formula blending smelter.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Jetty Barging & COA Surveyor:</strong> Track shipment tongkang & kualitas akhir ore yang dimuat.
                    </div>
                  </li>
                </ul>
              </div>

              {/* RESTRICTED ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-rose-400 flex items-center gap-1.5 text-sm">
                    <Lock className="w-4 h-4" /> Akses Dibatasi (No Access)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-extrabold text-[10px]">
                    RESTRICTED
                  </span>
                </div>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Payroll & Gaji SDM:</strong> Tidak dapat melihat daftar gaji, bonus, & rekapan finansial karyawan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Jurnal Akuntansi GL & Bank:</strong> Restriksi dari transaksi kas/bank & neraca laporan keuangan perusahaan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Procurement Commercial Payments:</strong> Tidak dapat mengedit kontrak nilai vendor/supplier.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">PNBP & Tax Reporting:</strong> Modul perpajakan & pendaftaran e-Faktur dikunci khusus tim Finance.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Active Fronts & Sequence Overview Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Pickaxe className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-base">Status Front Penambangan & Jadwal Peledakan Mine Engineering</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Lokasi: IUP Nikel Bahodopi Block Alpha & Beta
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">ID Pit & Bench Elevation</th>
                    <th className="p-3">Jenis Material & Lithology</th>
                    <th className="p-3">Target SR</th>
                    <th className="p-3">Actual SR</th>
                    <th className="p-3">Jadwal Blasting</th>
                    <th className="p-3">Geotech FoS</th>
                    <th className="p-3">Status Operasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      Pit Alpha Central (Bench 180m RL)
                    </td>
                    <td className="p-3 text-amber-400 font-semibold">Saprolite High Grade (Ni 1.88%)</td>
                    <td className="p-3">3.80 BCM/WMT</td>
                    <td className="p-3 text-emerald-400 font-bold">3.42 BCM/WMT</td>
                    <td className="p-3 text-slate-200">14:00 WITA (ANFO 24.5 kg/hole)</td>
                    <td className="p-3 text-teal-400 font-bold">1.45 (Normal)</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ACTIVE MINING
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      Pit Beta North (Bench 140m RL)
                    </td>
                    <td className="p-3 text-blue-400 font-semibold">Limonite HPAL Feed (Ni 1.25%, Fe 46%)</td>
                    <td className="p-3">3.20 BCM/WMT</td>
                    <td className="p-3 text-emerald-400 font-bold">3.10 BCM/WMT</td>
                    <td className="p-3 text-slate-200">Ripping Heavy Excavator (No Blast)</td>
                    <td className="p-3 text-teal-400 font-bold">1.52 (Normal)</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ACTIVE MINING
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      Pit Gamma South (Bench 210m RL)
                    </td>
                    <td className="p-3 text-slate-400">Overburden & Topsoil Top Cut</td>
                    <td className="p-3">4.10 BCM/WMT</td>
                    <td className="p-3 text-amber-400 font-bold">4.25 BCM/WMT</td>
                    <td className="p-3 text-amber-300">Persiapan Drilling Pattern D&B-003</td>
                    <td className="p-3 text-teal-400 font-bold">1.38 (Stable)</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        PIT PREPARATION
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN MINE ENGINEER */}
      {activeGeoTab === 'master_data_mine_engineer' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-base">Master Data Register Mining Engineering</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Database master pit design, geometri bench, register pola peledakan (D&B), dan kriteria block model JORC.
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Registrasi Design Pit Baru</span>
              </button>
            </div>

            {/* TABEL 1: MASTER PIT DESIGN & BENCH GEOMETRY */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <Pickaxe className="w-4 h-4 text-emerald-400" />
                1. Master Register Geometri Pit & Bench Boundary
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">ID Design Pit</th>
                      <th className="p-3">Nama Front Pit</th>
                      <th className="p-3">Elevasi Bench (RL)</th>
                      <th className="p-3">Bench Height x Width</th>
                      <th className="p-3">Overall Slope Angle</th>
                      <th className="p-3">Target SR</th>
                      <th className="p-3">Status Design</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">DSGN-PIT-ALPHA-2026</td>
                      <td className="p-3 font-bold text-slate-100">Pit Alpha Central Main Ore</td>
                      <td className="p-3">180m - 220m RL</td>
                      <td className="p-3">Tinggi: 6m | Lebar Berm: 4m</td>
                      <td className="p-3 text-amber-400">42° Slope Angle</td>
                      <td className="p-3 font-bold text-slate-100">3.80 BCM/WMT</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          APPROVED KTT
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">DSGN-PIT-BETA-2026</td>
                      <td className="p-3 font-bold text-slate-100">Pit Beta North HPAL Feed</td>
                      <td className="p-3">120m - 160m RL</td>
                      <td className="p-3">Tinggi: 5m | Lebar Berm: 3.5m</td>
                      <td className="p-3 text-amber-400">40° Slope Angle</td>
                      <td className="p-3 font-bold text-slate-100">3.20 BCM/WMT</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          APPROVED KTT
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">DSGN-PIT-GAMMA-2026</td>
                      <td className="p-3 font-bold text-slate-100">Pit Gamma South Expansion</td>
                      <td className="p-3">200m - 240m RL</td>
                      <td className="p-3">Tinggi: 6m | Lebar Berm: 4m</td>
                      <td className="p-3 text-amber-400">45° Slope Angle</td>
                      <td className="p-3 font-bold text-slate-100">4.10 BCM/WMT</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          REVIEW GEOTEK
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 2: MASTER DRILL & BLAST PATTERN */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                2. Master Register Pola Peledakan (Drill & Blast Pattern)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">ID Pola Peledakan</th>
                      <th className="p-3">Formasi Batuan</th>
                      <th className="p-3">Spacing x Burden</th>
                      <th className="p-3">Kedalaman Lubang</th>
                      <th className="p-3">Isian ANFO per Hole</th>
                      <th className="p-3">Target Powder Factor</th>
                      <th className="p-3">Target Fragment D50</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">D&B-PAT-001</td>
                      <td className="p-3 font-bold text-slate-100">Hard Peridotite Bedrock</td>
                      <td className="p-3">3.5m x 3.0m</td>
                      <td className="p-3">8.5 Meter</td>
                      <td className="p-3 text-emerald-400 font-bold">24.5 kg ANFO</td>
                      <td className="p-3 text-slate-100 font-bold">0.30 kg/m³</td>
                      <td className="p-3 text-slate-300">&lt;= 25 cm</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">D&B-PAT-002</td>
                      <td className="p-3 font-bold text-slate-100">Medium Serpentinite Boulders</td>
                      <td className="p-3">4.0m x 3.5m</td>
                      <td className="p-3">7.0 Meter</td>
                      <td className="p-3 text-emerald-400 font-bold">18.0 kg ANFO</td>
                      <td className="p-3 text-slate-100 font-bold">0.25 kg/m³</td>
                      <td className="p-3 text-slate-300">&lt;= 20 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 3: DETAILED PERMISSION MATRIX TABLE */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                3. Matriks Otorisasi Modul & Operasi CRUD Sistem ERP untuk Akun Mine Engineer
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Nama Modul ERP</th>
                      <th className="p-3">Fitur / Sub-Sistem</th>
                      <th className="p-3">Level Akses</th>
                      <th className="p-3">Flags (C / R / U / D)</th>
                      <th className="p-3">Catatan Otorisasi KTT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Perencanaan & Desain Pit 3D</td>
                      <td className="p-3 text-slate-300">Design Kontur, Bench, Ramp Access & Cut Surface</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Hak pembuatan & pengeditan desain pit utama.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Stripping Ratio & Overburden Dump</td>
                      <td className="p-3 text-slate-300">Perhitungan SR, Capacity Dump, & Distance Optimization</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Otoritas penuh manajemen volume galian.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Skenario Peledakan (D&B Pattern)</td>
                      <td className="p-3 text-slate-300">Spacing, Burden, ANFO Charge & Powder Factor</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Memerlukan persetujuan akhir KTT sebelum eksekusi.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Block Model & Estimasi JORC</td>
                      <td className="p-3 text-slate-300">Kriging / IDW Interpolation, Grade Shell & Resource</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Integrasi data assay laboratorium & eksplorasi.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Fleet Telemetry & Dispatch FMS</td>
                      <td className="p-3 text-slate-300">Cycle Time, Payload, & Queuing Time Loading Point</td>
                      <td className="p-3 text-amber-400 font-bold">READ ONLY</td>
                      <td className="p-3 text-amber-300 font-bold">_ / R / _ / _</td>
                      <td className="p-3 text-slate-400">Hanya untuk verifikasi kebutuhan match factor.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Financial Ledger & Payroll HR</td>
                      <td className="p-3 text-slate-300">Gaji Karyawan, Jurnal Kas/Bank & Tax PNBP</td>
                      <td className="p-3 text-rose-400 font-bold">RESTRICTED</td>
                      <td className="p-3 text-rose-300 font-bold">_ / _ / _ / _</td>
                      <td className="p-3 text-slate-400">Dikunci penuh dari sistem keuangan & HR.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

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
