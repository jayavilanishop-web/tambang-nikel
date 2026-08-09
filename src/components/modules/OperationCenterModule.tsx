import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  ComposedChart 
} from 'recharts';
import { 
  Pickaxe, 
  Truck, 
  Layers, 
  Ship, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Activity, 
  Compass, 
  MapPin, 
  RefreshCw, 
  Zap, 
  Download, 
  FileText, 
  ShieldCheck, 
  Filter, 
  Search, 
  Plus, 
  ChevronRight, 
  Check, 
  Radio, 
  Fuel, 
  Sliders,
  Database,
  Eye,
  Lock,
  Grid,
  Ruler,
  Users,
  UserCheck,
  GraduationCap,
  Briefcase,
  DollarSign,
  Stethoscope,
  Award,
  CreditCard,
  Receipt,
  Wallet,
  Landmark,
  TrendingDown,
  Building2
} from 'lucide-react';
import { MineSite, OreStockpile, HeavyEquipment, BargeShipment, Language } from '../../types';

interface OperationCenterModuleProps {
  sites: MineSite[];
  stockpiles: OreStockpile[];
  equipment: HeavyEquipment[];
  barges: BargeShipment[];
  language: Language;
  initialTab?: string;
}

export const OperationCenterModule: React.FC<OperationCenterModuleProps> = ({
  sites,
  stockpiles,
  equipment,
  barges,
  language,
  initialTab
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dasbor_corporate_director'
    | 'master_data_corporate_director'
    | 'dasbor_commissioner'
    | 'master_data_commissioner'
    | 'dasbor_ceo'
    | 'master_data_ceo'
    | 'dasbor_coo'
    | 'master_data_coo'
    | 'dasbor_finance_director'
    | 'master_data_finance_director'
    | 'dasbor_hr_director'
    | 'master_data_hr_director'
    | 'dasbor_mine_manager'
    | 'master_data_mine_manager'
    | 'dasbor_operation_manager'
    | 'master_data_operation_manager'
    | 'dasbor_production_manager'
    | 'master_data_production_manager'
    | 'production'
    | 'hauling_loading'
    | 'crusher_movement'
    | 'stockpile_blending'
    | 'jetty_port'
    | 'pit_road'
    | 'shift_report'
    | 'productivity_downtime'
  >((initialTab as any) || 'dasbor_mine_manager');

  const [selectedShift, setSelectedShift] = useState<'SHIFT_1' | 'SHIFT_2'>('SHIFT_1');
  const [selectedPitFilter, setSelectedPitFilter] = useState<string>('ALL');
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [dispatchSuccessMsg, setDispatchSuccessMsg] = useState<string | null>(null);
  const [searchTripTerm, setSearchTripTerm] = useState('');

  // Shift Handover Notes State
  const [shiftNotes, setShiftNotes] = useState([
    '1. Produksi Ore Getting Pit Alpha berjalan lancar mencapai 4,840 MT dengan kadar Ni rata-rata 1.83%.',
    '2. Unit Dump Truck DT-09 telah dikirim ke Workshop untuk penggantian ban belakang kanan.',
    '3. Penyiraman air dust suppression di KM 04 - KM 09 telah dilakukan 4 kali menggunakan Water Truck WT-01.',
    '4. Pompa dewatering Dewater-02 di Pit Beta Sump aktif 24 jam dengan debit 450 m³/jam.'
  ]);
  const [newNoteInput, setNewNoteInput] = useState('');

  // Datasets for Operations
  const hourlyProductionTargetVsActual = [
    { time: '07:00', targetMT: 800, actualMT: 820, targetBCM: 1500, actualBCM: 1540 },
    { time: '09:00', targetMT: 800, actualMT: 790, targetBCM: 1500, actualBCM: 1480 },
    { time: '11:00', targetMT: 800, actualMT: 840, targetBCM: 1500, actualBCM: 1560 },
    { time: '13:00', targetMT: 800, actualMT: 750, targetBCM: 1500, actualBCM: 1410 },
    { time: '15:00', targetMT: 800, actualMT: 830, targetBCM: 1500, actualBCM: 1520 },
    { time: '17:00', targetMT: 800, actualMT: 810, targetBCM: 1500, actualBCM: 1500 }
  ];

  const cycleTimeBreakdown = [
    { name: 'Spot & Queue Excavator', durationMin: 2.5, percentage: 10 },
    { name: 'Loading Ore (PC2000)', durationMin: 3.2, percentage: 13 },
    { name: 'Hauling (Loaded DT)', durationMin: 9.8, percentage: 40 },
    { name: 'Dumping Crusher/ETO', durationMin: 1.8, percentage: 7 },
    { name: 'Return Travel (Empty)', durationMin: 7.2, percentage: 30 }
  ];

  const downtimeDelayData = [
    { reason: 'Kerusakan Mekanis (Hydraulic/Engine)', hours: 14.5, count: 6, category: 'UNPLANNED_DOWNTIME' },
    { reason: 'Hujan & Jalan Licin (Weather Delay)', hours: 8.2, count: 3, category: 'WEATHER_DELAY' },
    { reason: 'Tunggu Queue Excavator (Queue Delay)', hours: 6.4, count: 12, category: 'OPERATIONAL_DELAY' },
    { reason: 'Refueling BBM Solar B35', hours: 3.5, count: 8, category: 'PLANNED_DELAY' },
    { reason: 'Pergantian Shift Operator (Shift Change)', hours: 2.0, count: 2, category: 'PLANNED_DELAY' }
  ];

  const crusherPerformance = [
    { name: 'Crusher Unit 01 (Primary Jaw)', status: 'OPERATIONAL', feedCapacityTPH: 850, currentTPH: 820, sizeMm: '0-50mm' },
    { name: 'Crusher Unit 02 (Secondary Cone)', status: 'OPERATIONAL', feedCapacityTPH: 600, currentTPH: 580, sizeMm: '0-25mm' },
    { name: 'Crusher Unit 03 (Mobile Crusher)', status: 'MAINTENANCE', feedCapacityTPH: 450, currentTPH: 0, sizeMm: '0-50mm' }
  ];

  const haulRoadMonitoringData = [
    { section: 'KM 00 - KM 04 (Pit Alpha to Junction)', status: 'GOOD', speedLimitKmh: 35, avgSpeedKmh: 32, dustLevel: 'LOW' },
    { section: 'KM 04 - KM 09 (Main Haul Road Hill)', status: 'WARNING', speedLimitKmh: 25, avgSpeedKmh: 21, dustLevel: 'MEDIUM' },
    { section: 'KM 09 - KM 14 (Stockpile ETO Corridor)', status: 'GOOD', speedLimitKmh: 35, avgSpeedKmh: 34, dustLevel: 'LOW' },
    { section: 'KM 14 - KM 18 (Jetty Port Terminal)', status: 'GOOD', speedLimitKmh: 30, avgSpeedKmh: 28, dustLevel: 'LOW' }
  ];

  const oreMovementTracking = [
    { id: 'TRK-901', material: 'Saprolite High Grade (1.85% Ni)', origin: 'Pit Alpha - Bench +120', destination: 'Stockpile ETO - Block A', tonnageMT: 240, status: 'IN_TRANSIT', dtUnit: 'DT-14' },
    { id: 'TRK-902', material: 'Saprolite Mid Grade (1.72% Ni)', origin: 'Pit Beta - Bench +85', destination: 'Stockpile ETO - Block C', tonnageMT: 210, status: 'DUMPED', dtUnit: 'DT-08' },
    { id: 'TRK-903', material: 'Limonite HPAL Feed (1.25% Ni)', origin: 'Pit Alpha - Overburden Limonite', destination: 'Limonite Heap Pad 2', tonnageMT: 310, status: 'LOADING', dtUnit: 'DT-22' },
    { id: 'TRK-904', material: 'Overburden (Waste Rock)', origin: 'Pit Alpha - North Wall', destination: 'Waste Dump Area West', tonnageMT: 450, status: 'IN_TRANSIT', dtUnit: 'DT-31' },
    { id: 'TRK-905', material: 'Saprolite High Grade (1.92% Ni)', origin: 'Pit Alpha - Bench +115', destination: 'Stockpile ETO - Block A', tonnageMT: 280, status: 'DUMPED', dtUnit: 'DT-05' }
  ];

  const filteredTrips = oreMovementTracking.filter(t => 
    t.id.toLowerCase().includes(searchTripTerm.toLowerCase()) ||
    t.material.toLowerCase().includes(searchTripTerm.toLowerCase()) ||
    t.dtUnit.toLowerCase().includes(searchTripTerm.toLowerCase())
  );

  const handleRunDispatchAI = () => {
    setDispatchSuccessMsg('AI Dispatching mengoptimalkan alokasi 24 Dump Truck. Estimasi penghematan cycle time: -1.8 menit/trip.');
    setTimeout(() => setDispatchSuccessMsg(null), 6000);
    setShowDispatchModal(false);
  };

  const handleAddShiftNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    setShiftNotes([...shiftNotes, `${shiftNotes.length + 1}. ${newNoteInput}`]);
    setNewNoteInput('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Pusat Komando Operasional Pertambangan
            </span>
            <span className="text-slate-400 text-xs">• Pit, Hauling, Crusher & Shipping Operations</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Integrated Mine Operation Center (IMOC)
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Manajemen rantai pasok operasional nikel dari peledakan & ore getting, pengangkutan hauling DT, crusher, blending stockpile, hingga pemuatan barging di jetty port.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center">
            <button
              onClick={() => setSelectedShift('SHIFT_1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedShift === 'SHIFT_1' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Shift 1 (Siang)
            </button>
            <button
              onClick={() => setSelectedShift('SHIFT_2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedShift === 'SHIFT_2' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Shift 2 (Malam)
            </button>
          </div>

          <button 
            onClick={() => setShowDispatchModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>AI Optimasi Dispatch Fleet</span>
          </button>
        </div>
      </div>

      {dispatchSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{dispatchSuccessMsg}</span>
        </div>
      )}

      {/* Navigation Sub-Modules Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'dasbor_corporate_director', label: '👑 Dasbor Corporate Director', icon: ShieldCheck, badge: 'Holding Executive' },
          { id: 'master_data_corporate_director', label: '🗄️ Master Data Corporate Director', icon: Database, badge: 'Corporate Master' },
          { id: 'dasbor_commissioner', label: '👑 Dasbor Commissioner', icon: ShieldCheck, badge: 'Commissioners Board' },
          { id: 'master_data_commissioner', label: '🗄️ Master Data Commissioner', icon: Database, badge: 'Audit & Governance' },
          { id: 'dasbor_ceo', label: '👑 Dasbor CEO', icon: ShieldCheck, badge: 'CEO Level' },
          { id: 'master_data_ceo', label: '🗄️ Master Data CEO', icon: Database, badge: 'Holding Master' },
          { id: 'dasbor_coo', label: '👑 Dasbor COO', icon: ShieldCheck, badge: 'COO Level' },
          { id: 'master_data_coo', label: '🗄️ Master Data COO', icon: Database, badge: 'Ops Master' },
          { id: 'dasbor_finance_director', label: '👑 Dasbor Finance Director', icon: ShieldCheck, badge: 'CFO Level' },
          { id: 'master_data_finance_director', label: '🗄️ Master Data Finance Director', icon: Database, badge: 'Finance Master' },
          { id: 'dasbor_hr_director', label: '👑 Dasbor HR Director', icon: ShieldCheck, badge: 'Human Capital' },
          { id: 'master_data_hr_director', label: '🗄️ Master Data HR Director', icon: Database, badge: 'HR Master' },
          { id: 'dasbor_mine_manager', label: '👑 Dasbor Mine Manager / KTT', icon: ShieldCheck, badge: 'KTT Statutory' },
          { id: 'master_data_mine_manager', label: '🗄️ Master Data Mine Manager', icon: Database, badge: 'ESDM Master' },
          { id: 'dasbor_operation_manager', label: '🧭 Dasbor Operation Manager', icon: Compass, badge: 'Site Chief' },
          { id: 'master_data_operation_manager', label: '🗄️ Master Data Operation Manager', icon: Database, badge: 'Site Master' },
          { id: 'dasbor_production_manager', label: '🏭 Dasbor Production Manager', icon: Pickaxe, badge: 'Operations Chief' },
          { id: 'master_data_production_manager', label: '🗄️ Master Data Production Manager', icon: Database, badge: 'Target & Pit' },
          { id: 'production', label: 'Production & Target', icon: Pickaxe, badge: 'Target 102%' },
          { id: 'hauling_loading', label: 'Loading, Hauling & Dumping', icon: Truck, badge: '24 DT' },
          { id: 'crusher_movement', label: 'Crusher & Material Tracking', icon: Zap, badge: '3 Station' },
          { id: 'stockpile_blending', label: 'Stockpile & Ore Blending', icon: Layers, badge: '3 Block' },
          { id: 'jetty_port', label: 'Jetty, Port & Shipping', icon: Ship, badge: '2 Barge' },
          { id: 'pit_road', label: 'Pit & Road Monitoring', icon: Compass, badge: '18 KM' },
          { id: 'shift_report', label: 'Shift & Daily Report', icon: FileText, badge: 'Kepmen 1827' },
          { id: 'productivity_downtime', label: 'Utilization & Downtime', icon: Activity, badge: 'PA 92.4%' }
        ].filter(tab => {
          const currentRole = (initialTab || activeTab || '')
            .replace('dasbor_', '')
            .replace('master_data_', '')
            .replace('master_', '');

          if (tab.id.startsWith('dasbor_')) {
            const roleForTab = tab.id.replace('dasbor_', '');
            return roleForTab === currentRole;
          }

          if (tab.id.startsWith('master_data_')) {
            const roleForTab = tab.id.replace('master_data_', '');
            return roleForTab === currentRole;
          }

          return true;
        }).map(tab => {
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
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* SUB-MODULE: DASBOR AKUN CORPORATE DIRECTOR (DIREKSI KORPORAT) */}
      {activeTab === 'dasbor_corporate_director' && (
        <div className="space-y-6">
          {/* Header Banner Corporate Director */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Dasbor Akun Corporate Director (Direksi Korporat)</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      CORPORATE DIRECTOR EXECUTIVE & HOLDING STRATEGY
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Komando Strategi Korporat & Holding Multi-Site Mining: Konsolidasi Investasi Portofolio, Eksekusi M&A, Sinergi Anak Perusahaan, Pencapaian RKAB ESDM, Governance & Risk Management.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Mengunduh Laporan Corporate Strategy Board Pack (P&L, Investments, Operations & Portfolio)...')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Executive Strategy Pack</span>
                </button>
                <button 
                  onClick={() => alert('Sinkronisasi data strategi holdings, sinergi multi-site & investasi korporat terkini...')}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Corporate ERP</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 4 KPI Cards Corporate Director */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Portfolio Consolidated Revenue & EBITDA</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Margin 39.2%
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 620.5 M <span className="text-xs text-slate-400 font-normal">/ Bln</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Consolidated Net EBITDA: <strong>Rp 243.2 M (Above Target)</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Cross-Entity Ore Production & Sales</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  104.2% RKAB Target
                </span>
              </div>
              <div className="text-2xl font-black text-white">380,000 MT <span className="text-xs text-slate-400 font-normal">/ Bln Nikel</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Pickaxe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Smelter Suplai & Barging: <strong>On-Schedule 100%</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Strategic Capex & Expansion Capital</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ROI 24.5% Est.
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 350.0 M <span className="text-xs text-slate-400 font-normal">Approved Capex</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Ekspansi Pit Baru & Heavy Fleet: <strong>In Progress</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Corporate ESG & Governance Index</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PROPER Hijau
                </span>
              </div>
              <div className="text-2xl font-black text-white">100% Valid <span className="text-xs text-slate-400 font-normal">IUP OP & Legal</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Status Sengketa & Legal: <strong>Zero Material Dispute</strong></span>
              </div>
            </div>
          </div>

          {/* Matriks Wewenang & Modul Hak Akses Corporate Director */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Modul, Fitur, & Menu Hak Akses Corporate Director (Direksi Korporat)</h3>
                  <p className="text-[11px] text-slate-400">Rincian wewenang strategis, otorisasi holding, & akses penuh sistem ERP untuk Direksi Korporat</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                Statutory Level: Corporate Director Governance
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: FULL ACCESS STRATEGIC */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold border-b border-emerald-500/20 pb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AKSES PENUH STRATEGIS KORPORAT (CRUD FULL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Tata Kelola Holding & Strategi Portofolio:</strong> Perencanaan arah bisnis korporat, konsolidasi entitas, & pembentukan anak perusahaan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Capex Utama & Alokasi Investasi:</strong> Otorisasi anggaran ekspansi tambang, pembelian armada alat berat, & infrastruktur jetty.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Kontrak Penjualan Offtaker & Smelter:</strong> Penandatanganan & negosiasi kontrak suplai ore nikel jangka panjang.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Sinergi Joint Venture & M&A:</strong> Evaluasi akuisisi konsesi baru, aliansi strategis HPAL/smelter, & restrukturisasi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Struktur Organisasi & KPI Eksekutif:</strong> Penetapan jajaran manajemen senior, KPI lintas unit, & remunerasi.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: MONITORING & EXECUTIVE GOVERNANCE */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold border-b border-purple-500/20 pb-2">
                  <Eye className="w-4 h-4" />
                  <span>AKSES MONITORING & EXECUTIVE GOVERNANCE</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Laporan Keuangan Konsolidasi:</strong> Peninjauan Neraca, P&L, Cash Flow, Working Capital, & Margin EBITDA.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Kinerja Operasional Multi-Site:</strong> Pemantauan produksi pit, Stripping Ratio, efisiensi fleet, & logistik barging.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Kepatuhan ESDM & Audit ESG:</strong> Pemantauan status perizinan IUP OP, persetujuan RKAB, AMDAL, & sertifikasi PROPER.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Prediksi AI Mine GPT & Risk Analytics:</strong> Simulasi sensitivitas harga nikel LME/Argus terhadap arus kas holding.</span>
                  </li>
                </ul>
              </div>

              {/* Box 3: RESTRICTED LOW-LEVEL */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold border-b border-rose-500/20 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AKSES DIBATASI (RESTRICTED LOW-LEVEL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Direct Manual Journal Entry:</strong> Penginputan voucher akuntansi harian (Diserahkan ke CFO & Accounting).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Raw Telemetry Log Adjustment:</strong> Pengubahan data sensor timbangan / GPS truk mentah (Diserahkan ke Dispatcher/KTT).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Infrastructure & DB Encryption:</strong> Pengaturan kunci enkripsi backend server (Diserahkan ke IT Admin).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabel Live Stream Summary Multi-Entity Corporate Portfolio */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Portofolio Entitas Korporat & Sinergi Bisnis Holding</h3>
                <p className="text-[11px] text-slate-400">Pemantauan konsolidasi lintas unit bisnis, kontribusi revenue, margin EBITDA, & status perizinan</p>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                Corporate Portfolio Stream
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Entitas / Unit Bisnis Korporat</th>
                  <th className="py-2.5 px-3">Revenue & EBITDA Margin</th>
                  <th className="py-2.5 px-3">Volume Produksi & Penjualan</th>
                  <th className="py-2.5 px-3">Status Perizinan & ESDM</th>
                  <th className="py-2.5 px-3">Sinergi Strategic & ESG</th>
                  <th className="py-2.5 px-3 text-right">Otorisasi Director</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    PT Mineral Nikel Utama (Site Morowali)
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 320 M (EBITDA 41.2%)</td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">185,000 MT Saprolite High-Grade</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      IUP OP VALID / RKAB 105%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Offtaker TSI Active / PROPER Hijau</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail portofolio Site Morowali')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Audit Entity
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    PT Halmahera Mining Resource (Site Halmahera)
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 245 M (EBITDA 37.8%)</td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">145,000 MT Saprolite & Limonite</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      IUP OP VALID / RKAB 103%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">HPAL Feed Contract / PROPER Biru</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail portofolio Site Halmahera')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Audit Entity
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Ship className="w-3.5 h-3.5 text-amber-400" />
                    PT Nusantara Logistics & Jetty
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">Rp 32.5 M (EBITDA 35.0%)</td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">28 Tongkang & Transshipment</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      TERSUS JETTY VALID
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Zero Demurrage / Safe Port</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail portofolio anak perusahaan logistik')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Audit Entity
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    PT Smelter Nikel Sinergi (JV Processing)
                  </td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">Rp 180 M (Equity Share 40%)</td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">50,000 MT NPI & MHP Equivalent</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      IUI / SMELTER PERMIT VALID
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">HPAL Green Nickel Tech</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail portofolio Joint Venture Smelter')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Audit Entity
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN CORPORATE DIRECTOR (CORPORATE DIRECTOR HOLDING REGISTER) */}
      {activeTab === 'master_data_corporate_director' && (
        <div className="space-y-6">
          {/* Header Banner Master Data Corporate Director */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Master Data Akun Corporate Director (Direksi Korporat)</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      CORPORATE STRATEGY REGISTER & PORTFOLIO DIRECTORY
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Database Terpusat Direksi Korporat: Register Entitas Holding, Alokasi Investasi Capex, Lisensi Konsesi Tambang, Kontrak Sinergi Joint Venture, & Matriks Otorisasi CRUD.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Menambah registrasi entitas korporat / portofolio investasi baru...')}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Corporate Register / Entity</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Register 1: Master Register Entitas Korporat, Investasi & Joint Ventures */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Master Register Entitas Korporat, Portofolio Investasi & Sinergi Joint Ventures</h3>
                <p className="text-[11px] text-slate-400">Daftar legalitas entitas korporat, porsi kepemilikan saham holding, alokasi capex, & direktur penanggung jawab</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Cari Entitas / Portofolio..." 
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Kode Entitas</th>
                  <th className="py-2.5 px-3">Nama Entitas & Portofolio Bisnis</th>
                  <th className="py-2.5 px-3">Alokasi Investasi & Ownership</th>
                  <th className="py-2.5 px-3">Direktur Penanggung Jawab</th>
                  <th className="py-2.5 px-3">Status Legalitas & Governance</th>
                  <th className="py-2.5 px-3 text-right">Aksi Master</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">ENT-CORP-01</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>PT Mineral Nikel Nusantara (Holding Utama)</div>
                    <div className="text-[10px] text-slate-400">Headquarters Jakarta & Holding Morowali Operations (100% Owned)</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 1.2 Triliun Capital / 100% Share</td>
                  <td className="py-2.5 px-3 text-slate-300">Ir. Bambang Trihatmono, M.M. (CEO)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      HOLDING ACTIVE / IUP VALID
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Holding ENT-CORP-01')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">ENT-CORP-02</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>PT Halmahera Mining Resource (Anak Perusahaan Tambang)</div>
                    <div className="text-[10px] text-slate-400">Halmahera East Mine Block & Transport Hub (85% Owned)</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 650 Milar Capex / 85% Share</td>
                  <td className="py-2.5 px-3 text-slate-300">Dr. Hendra Wijaya, S.T. (Director)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      SUBSIDIARY ACTIVE / IUP VALID
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Sub ENT-CORP-02')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">ENT-CORP-03</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>PT Smelter Nikel Sinergi (Joint Venture Processing)</div>
                    <div className="text-[10px] text-slate-400">Smelter RKEF & HPAL Battery Grade Project (40% Equity Partner)</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">Rp 450 Milar JV Equity / 40% Share</td>
                  <td className="py-2.5 px-3 text-slate-300">Faisal Rahman, M.B.A. (Corporate Director)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      JV PARTNER ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master JV ENT-CORP-03')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Master Register 2: Matriks Detail Otorisasi CRUD & Modul ERP Akun Corporate Director */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Matriks Otorisasi CRUD Sistem ERP untuk Akun Corporate Director (Direksi Korporat)</h3>
                <p className="text-[11px] text-slate-400">Rincian lengkap modul, sub-sistem, dan batas izin Create, Read, Update, Delete untuk Direksi Korporat</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20">
                ERP Role: Corporate Director / Executive
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Nama Modul ERP</th>
                  <th className="py-2.5 px-3">Sub-Sistem & Fitur Utamanya</th>
                  <th className="py-2.5 px-3 text-center">Create (C)</th>
                  <th className="py-2.5 px-3 text-center">Read (R)</th>
                  <th className="py-2.5 px-3 text-center">Update (U)</th>
                  <th className="py-2.5 px-3 text-center">Delete (D)</th>
                  <th className="py-2.5 px-3">Catatan Wewenang Corporate Director</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Tata Kelola Holding & Strategi Portofolio</td>
                  <td className="py-2.5 px-3 text-slate-300">Pengaturan Entitas Perusahaan, Konsolidasi Anak Perusahaan, Deviden & Shares</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES (Archive)</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas tertinggi strategi & portofolio holding.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Alokasi Investasi Capex & Expansion</td>
                  <td className="py-2.5 px-3 text-slate-300">Persetujuan Capex Alat Berat, Pengembangan Pit Baru, Joint Venture Smelter</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Persetujuan anggaran investasi strategis korporat.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Kontrak Penjualan Offtaker & Smelter</td>
                  <td className="py-2.5 px-3 text-slate-300">Kontrak Offtaker Smelter Long-Term, Penetapan Acuan Harga Ore, Sales Barging</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otorisasi perjanjian komersial penjualan utama.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Laporan Keuangan Konsolidasi</td>
                  <td className="py-2.5 px-3 text-slate-300">Konsolidasi P&L Multi-Site, Cashflow Management, EBITDA Margin Audit</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Akses pemantauan & analisis keuangan konsolidasi.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Perizinan ESDM & Legalitas IUP OP</td>
                  <td className="py-2.5 px-3 text-slate-300">Persetujuan Dokumen RKAB ESDM, Ekstensi IUP OP, AMDAL, License Governance</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Persetujuan perizinan legalitas pemerintah.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Mine GPT AI & Predictive Analytics</td>
                  <td className="py-2.5 px-3 text-slate-300">Executive AI Strategy Assistant, Risk Modelling Price Nickel, Multi-site BI</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-slate-400">Akses penuh intelijen buatan & analisis risiko.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN DEWAN KOMISARIS (BOARD OF COMMISSIONERS) */}
      {activeTab === 'dasbor_commissioner' && (
        <div className="space-y-6">
          {/* Header Banner Dewan Komisaris */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Dasbor Akun Dewan Komisaris (Board of Commissioners)</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      BOARD OF COMMISSIONERS & INDEPENDENT OVERSIGHT
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pengawasan Independen Dewan Komisaris: Tata Kelola GCG, Audit Laporan Keuangan Konsolidasi, Kepatuhan Perizinan ESDM, Pengawasan Kinerja Direksi, & Risk Advisory.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Mengunduh Laporan Independent Audit & Board Oversight Pack (GCG, Finansial & Legal)...')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Audit Board Pack</span>
                </button>
                <button 
                  onClick={() => alert('Sinkronisasi data audit independen & kepatuhanholding terkini...')}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Independent Audit ERP</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 4 KPI Cards Dewan Komisaris */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Skor Tata Kelola GCG & Compliance</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  98.8% Compliant
                </span>
              </div>
              <div className="text-2xl font-black text-white">WTP Grade <span className="text-xs text-slate-400 font-normal">(Unqualified)</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Status Audit KAP: <strong>WTP Tanpa Paragraf Penjelas</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Pengawasan Finansial & EBITDA</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  EBITDA 38.5%
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 485.2 M <span className="text-xs text-slate-400 font-normal">/ Bln</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Rasio Utang / Debt Equity: <strong>0.42x (Sangat Sehat)</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Kepatuhan Perizinan ESDM & Legal</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Valid
                </span>
              </div>
              <div className="text-2xl font-black text-white">248,500 MT <span className="text-xs text-slate-400 font-normal">RKAB Production</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Lisensi IUP OP: <strong>Berlaku s/d 2034 (Tanpa Sengketa)</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">ESG, Risk Advisory & Safety Index</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PROPER Hijau
                </span>
              </div>
              <div className="text-2xl font-black text-white">TRIFR 0.00 <span className="text-xs text-slate-400 font-normal">Safe Hours</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Risiko Hukum & Lingkungan: <strong>Low Risk Category</strong></span>
              </div>
            </div>
          </div>

          {/* Matriks Wewenang & Modul Hak Akses Dewan Komisaris */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Modul, Fitur, & Menu Hak Akses Dewan Komisaris (Board of Commissioners)</h3>
                  <p className="text-[11px] text-slate-400">Rincian wewenang pengawasan independen, hak peninjauan laporan, & batasan non-operasional untuk Dewan Komisaris</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                Statutory Level: Board Oversight & GCG Governance
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: FULL READ-ONLY OVERSIGHT */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold border-b border-emerald-500/20 pb-2">
                  <Eye className="w-4 h-4" />
                  <span>AKSES PENGAWASAN INDEPENDEN (READ-ONLY FULL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Laporan Keuangan Audit Konsolidasi:</strong> Neraca, Laporan Laba/Rugi, Cash Flow, Audit Trail, & Kertas Kerja KAP.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Pengawasan Kinerja Direksi (CEO/COO/CFO):</strong> Pemantauan pencapaian KPI eksekutif, efisiensi biaya, & RKAB.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Kepatuhan Hukum, Legal & ESDM:</strong> Status legalitas IUP OP, Dokumen RKAB, AMDAL, Tersus Jetty, & AMDAL/K3LH.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Audit Pajak, Royalti & PNBP ESDM:</strong> Peninjauan bukti setor e-PNBP, e-Faktur Pajak, & retribusi daerah.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Simulasi AI Mine GPT & Analytics:</strong> Proyeksi dampak fluktuasi harga nikel LME/Argus terhadap dividen.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: ADVISORY & BOARD APPROVAL */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold border-b border-purple-500/20 pb-2">
                  <FileText className="w-4 h-4" />
                  <span>REKOMENDASI ADVISORY & BOARD APPROVAL</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Persetujuan Rencana Kerja & Anggaran (RKAT):</strong> Memberikan rekomendasi & persetujuan atas usulan RKAT Direksi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Penandatanganan Laporan Tahunan (Board Sign-off):</strong> Pengesahan Laporan Keuangan Konsolidasi untuk RUPS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Persetujuan Transaksi Material / Capex Utama:</strong> Rekomendasi ekspansi konsesi tambang & pembelian alat berat utama.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Komite Audit & Manajemen Risiko:</strong> Pengawasan independen kinerja Komite Audit & Pemantau Risiko.</span>
                  </li>
                </ul>
              </div>

              {/* Box 3: RESTRICTED NON-OPERATIONAL */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold border-b border-rose-500/20 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AKSES DIBATASI (NON-OPERATIONAL RESTRICTED)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Direct Transaction Execution:</strong> Tidak diperkenankan membuat Purchase Order, Surat Jalan, atau Vouching Kas harian.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Raw Mine Telemetry Adjustment:</strong> Tidak diperkenankan mengedit log ritase truk atau sensor GPS alat berat.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Backend System & Database Encryption:</strong> Pengaturan teknis infrastruktur server (Diserahkan ke IT Admin).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabel Live Stream Summary Audit Korporat & Independent Oversight Dewan Komisaris */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Audit Korporat & Pengawasan Independen Dewan Komisaris</h3>
                <p className="text-[11px] text-slate-400">Pemantauan lintas anak perusahaan, opini audit KAP, status kepatuhan RKAB, & penilaian risiko GCG</p>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                Board Oversight Stream
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Entitas / Site Tambang</th>
                  <th className="py-2.5 px-3">Revenue & EBITDA Margin</th>
                  <th className="py-2.5 px-3">Opini Audit KAP & Finansial</th>
                  <th className="py-2.5 px-3">Kepatuhan Perizinan ESDM</th>
                  <th className="py-2.5 px-3">Grade ESG & Risk Index</th>
                  <th className="py-2.5 px-3 text-right">Otorisasi Board</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    PT Mineral Nikel Utama (Site Morowali)
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 280 M (EBITDA 40%)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      WTP (Deloitte Audited)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">IUP OP Valid / RKAB 104%</td>
                  <td className="py-2.5 px-3 text-slate-300">PROPER Hijau / Low Risk</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat berkas laporan audit Board untuk Site Morowali')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Review Audit
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    PT Halmahera Nikel Mining (Site Halmahera)
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 205 M (EBITDA 36.5%)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      WTP (EY Audited)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">IUP OP Valid / RKAB 102.8%</td>
                  <td className="py-2.5 px-3 text-slate-300">PROPER Biru / Zero Fatality</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat berkas laporan audit Board untuk Site Halmahera')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Review Audit
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Ship className="w-3.5 h-3.5 text-amber-400" />
                    PT Nusantara Logistics & Jetty
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">Rp 18.5 M (EBITDA 33.5%)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      WTP (PwC Audited)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-blue-300 font-bold">TERSUS JETTY VALID</td>
                  <td className="py-2.5 px-3 text-slate-300">Zero Demurrage / Safe Port</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat berkas laporan audit Board untuk anak perusahaan logistik')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Review Audit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN DEWAN KOMISARIS (BOARD OF COMMISSIONERS REGISTER) */}
      {activeTab === 'master_data_commissioner' && (
        <div className="space-y-6">
          {/* Header Banner Master Data Dewan Komisaris */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Master Data Akun Dewan Komisaris (Board of Commissioners)</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      BOARD REGISTER & STATUTORY AUDIT DIRECTORY
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Database Terpusat Dewan Komisaris: Register Anggota Board, Komite Audit & Pemantau Risiko, Dokumen Akta Pendirian Korporat, & Matriks Otorisasi CRUD.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Menambah registrasi anggota Dewan Komisaris / Komite Audit baru...')}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Register Dewan Komisaris</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Register 1: Master Register Dewan Komisaris & Komite Audit */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Master Register Anggota Dewan Komisaris & Komite Audit Korporat</h3>
                <p className="text-[11px] text-slate-400">Daftar legalitas anggota Board, penetapan Komite Audit, status independensi, & sertifikasi profesi</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Cari Komisaris / Komite..." 
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Kode Register</th>
                  <th className="py-2.5 px-3">Nama Anggota Dewan Komisaris</th>
                  <th className="py-2.5 px-3">Komite & Jabatan Assigned</th>
                  <th className="py-2.5 px-3">Status Independensi</th>
                  <th className="py-2.5 px-3">Sertifikasi & Lisensi Audit</th>
                  <th className="py-2.5 px-3 text-right">Aksi Master</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">REG-COMM-01</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Prof. Dr. Ir. H. Soebagyo, M.Sc.</div>
                    <div className="text-[10px] text-slate-400">Presiden Komisaris / Komisaris Utama Holding</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">Komite Audit & Komite Nominasi (Chair)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      INDEPENDENT / NON-EXECUTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Certified Risk Professional (QGRM) & ESDM Inspector</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Komisaris Utama')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">REG-COMM-02</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Dra. Ratna Kusuma, Ak., M.A.</div>
                    <div className="text-[10px] text-slate-400">Komisaris Independen Holding</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Komite Audit & Pemantau Risiko (Member)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      INDEPENDENT / EX-KAP SENIOR
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Certified Public Accountant (CPA) & IFRS Auditor</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Komisaris Independen')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">REG-COMM-03</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Ir. Faisal Rahman, M.B.A.</div>
                    <div className="text-[10px] text-slate-400">Komisaris Utusan Pemegang Saham Utamanya</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">Komite Remunerasi & Investasi Strategis</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      NON-INDEPENDENT / HOLDING REP
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Certified Mining Auditor & Corporate Valuator</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Komisaris Utusan')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Master Register 2: Matriks Detail Otorisasi CRUD & Modul ERP Akun Dewan Komisaris */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Matriks Otorisasi CRUD Sistem ERP untuk Akun Dewan Komisaris (Board of Commissioners)</h3>
                <p className="text-[11px] text-slate-400">Rincian lengkap modul, sub-sistem, dan batas izin Create, Read, Update, Delete untuk Dewan Komisaris</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20">
                ERP Role: Commissioner / Board Oversight
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Nama Modul ERP</th>
                  <th className="py-2.5 px-3">Sub-Sistem & Fitur Utamanya</th>
                  <th className="py-2.5 px-3 text-center">Create (C)</th>
                  <th className="py-2.5 px-3 text-center">Read (R)</th>
                  <th className="py-2.5 px-3 text-center">Update (U)</th>
                  <th className="py-2.5 px-3 text-center">Delete (D)</th>
                  <th className="py-2.5 px-3">Catatan Wewenang Dewan Komisaris</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Laporan Keuangan Konsolidasi & Neraca Audit</td>
                  <td className="py-2.5 px-3 text-slate-300">Neraca Audit, Laporan P&L, Cash Flow, Kertas Kerja KAP, Audit Trail Audit</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Read-Only lengkap untuk pengawasan audit independen.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Tata Kelola GCG & Komite Audit Advisory</td>
                  <td className="py-2.5 px-3 text-slate-300">Laporan Komite Audit, Pengawasan Risiko Korporat, Board Sign-off Report</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Dapat membuat & mengedit rekomendasi advisory Board.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Pengawasan Kinerja Direksi (CEO/COO/CFO)</td>
                  <td className="py-2.5 px-3 text-slate-300">Evaluasi KPI Direksi, Pemantauan EBITDA Target, Peninjauan RKAT Korporat</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES (Review)</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Penilaian kinerja & rekomendasi remunerasi RUPS.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Audit Royalti, Pajak & Perizinan ESDM</td>
                  <td className="py-2.5 px-3 text-slate-300">e-PNBP Setoran Royalti, e-Faktur Pajak, Dokumen RKAB & IUP OP</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Peninjauan kepatuhan legalitas statutory pemerintah.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Mine GPT AI & Strategic BI Analytics</td>
                  <td className="py-2.5 px-3 text-slate-300">Executive AI Risk Advisor, Dashboard Analytics Multi-Site, Proyeksi Dividen</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-slate-400">Simulasi risiko & analisis prediktif AI Board.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN CEO (CHIEF EXECUTIVE OFFICER) */}
      {activeTab === 'dasbor_ceo' && (
        <div className="space-y-6">
          {/* Header Banner CEO */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Dasbor Akun CEO (Chief Executive Officer)</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      CEO EXECUTIVE COMMAND & STRATEGIC HOLDING
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Komando Tertinggi Eksekutif Holding Mining: Konsolidasi Finansial EBITDA, Target Produksi RKAB ESDM, ESG Governance, & Keputusan Strategis Korporat.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Mengunduh Laporan Executive Consolidated Board Pack (P&L, Ops & ESG)...')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-purple-400" />
                  <span>Executive Board Pack</span>
                </button>
                <button 
                  onClick={() => alert('Konsolidasi data keuangan & operasional holding multi-site terbaru...')}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync Consolidated ERP</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 4 KPI Cards CEO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Consolidated Revenue & EBITDA</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Margin 38.5%
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 485.2 M <span className="text-xs text-slate-400 font-normal">/ Bln</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>EBITDA Net: <strong>Rp 186.8 Miliar (On Target)</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Pencapaian Production RKAB ESDM</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  103.5% Achieved
                </span>
              </div>
              <div className="text-2xl font-black text-white">248,500 MT <span className="text-xs text-slate-400 font-normal">/ 240k Plan</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Pickaxe className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Kuoata RKAB Terpakai: <strong>68.2% Sisa Kuota Aman</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Free Cashflow & Working Capital</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Current Ratio 2.45
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 124.8 M <span className="text-xs text-slate-400 font-normal">Free Cash</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Net Debt to EBITDA: <strong>0.85x (Sehat S&P Standard)</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">ESG, Health & Environmental Compliance</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  TRIFR 0.00
                </span>
              </div>
              <div className="text-2xl font-black text-white">1,850,000 <span className="text-xs text-slate-400 font-normal">Safe Hours</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Audit ESDM & AMDAL: <strong>PROPER Hijau Grade</strong></span>
              </div>
            </div>
          </div>

          {/* Matriks Wewenang & Modul Hak Akses CEO */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Modul, Fitur, & Menu Hak Akses CEO (Chief Executive Officer)</h3>
                  <p className="text-[11px] text-slate-400">Rincian wewenang strategis, otorisasi holding, & akses penuh sistem ERP untuk Direktur Utama</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                Statutory Level: CEO Full Executive Governance
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: FULL ACCESS (CRUD FULL STRATEGIC) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold border-b border-emerald-500/20 pb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AKSES PENUH STRATEGIS (CRUD FULL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Multi-Company & Holding Governance:</strong> Pengaturan struktur korporat, konsolidasi entitas, & anak perusahaan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>RKAB ESDM & Perizinan IUP:</strong> Otorisasi submission dokumen RKAB, revisi target tahunan, & lisensi IUP.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Capex & Investment Approval:</strong> Persetujuan investasi modal, pembelian alat berat baru, & ekspansi tambang.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Kontrak Penjualan Nikel & Offtaker:</strong> Otorisasi akhir Kontrak Offtaker Smelter & Penjualan Ekspor/Lokal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>C-Level HR & SOT Organisasi:</strong> Pengangkatan jajaran direksi, manajemen senior, & kebijakan kompensasi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Dividen & Kebijakan Keuangan:</strong> Otorisasi alokasi laba ditahan, dividen pemegang saham, & struktur utang.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: MONITORING & EXECUTIVE APPROVAL */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 space-y-3">
                <div className="flex items-center gap-2 text-purple-400 text-xs font-bold border-b border-purple-500/20 pb-2">
                  <Eye className="w-4 h-4" />
                  <span>AKSES MONITORING & EXECUTIVE APPROVAL</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Laporan Keuangan Konsolidasi (P&L, Cashflow):</strong> Real-time audit neraca, margin EBITDA, & Working Capital.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Performa Operasional Pit & Fleet:</strong> Pemantauan efisiensi OEE alat berat, Stripping Ratio, & Barging.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Audit ESG, K3LH, & AMDAL:</strong> Peninjauan skor sertifikasi PROPER, TRIFR keselamatan, & reklamasi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0"></span>
                    <span><strong>Analisis Risiko & AI Mine GPT:</strong> Simulasi proyeksi pendapatan berdasarkan harga nikel LME & Argus.</span>
                  </li>
                </ul>
              </div>

              {/* Box 3: RESTRICTED ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold border-b border-rose-500/20 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AKSES DIBATASI (RESTRICTED LOW-LEVEL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Direct Raw Ledger Entry:</strong> Pengeditan manual entri jurnal akuntansi harian (Diserahkan ke CFO & Finance).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Raw Mine Telemetry Adjustment:</strong> Pengubahan langsung log GPS/sensor mentah (Diserahkan ke Dispatcher/KTT).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Low-Level System Code & Database Key:</strong> Pengaturan enkripsi backend database (Diserahkan ke IT Admin).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabel Live Stream Summary Multi-Site & Holding Governance */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Konsolidasi Entitas Holding & Site Tambang Nikel</h3>
                <p className="text-[11px] text-slate-400">Pemantauan lintas anak perusahaan, IUP OP, EBITDA margin, & kepatuhan RKAB ESDM</p>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
                Holding Stream
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Entitas / Site Tambang</th>
                  <th className="py-2.5 px-3">Produksi & Revenue</th>
                  <th className="py-2.5 px-3">EBITDA & Net Profit</th>
                  <th className="py-2.5 px-3">Status RKAB & Perizinan</th>
                  <th className="py-2.5 px-3">ESG & K3LH Grade</th>
                  <th className="py-2.5 px-3 text-right">Otorisasi CEO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    PT Mineral Nikel Utama (Site Morowali)
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">145,000 MT (Rp 280 M)</td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">Rp 112 M (EBITDA 40%)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      IUP OP VALID / RKAB 104%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">PROPER Hijau / TRIFR 0.00</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail konsolidasi Site Morowali')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Audit Site
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    PT Halmahera Nikel Mining (Site Halmahera)
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">103,500 MT (Rp 205 M)</td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">Rp 74.8 M (EBITDA 36.5%)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      IUP OP VALID / RKAB 102.8%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">PROPER Biru / Zero Fatality</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail konsolidasi Site Halmahera')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Audit Site
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Ship className="w-3.5 h-3.5 text-amber-400" />
                    PT Nusantara Logistics & Jetty
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">18 Tongkang (Rp 18.5 M)</td>
                  <td className="py-2.5 px-3 font-mono text-purple-300 font-bold">Rp 6.2 M (EBITDA 33.5%)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      TERSUS JETTY VALID
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Zero Demurrage / Safe Port</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail anak perusahaan logistik')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Audit Logistics
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN CEO (CEO HOLDING REGISTER) */}
      {activeTab === 'master_data_ceo' && (
        <div className="space-y-6">
          {/* Header Banner Master Data CEO */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-900 border border-purple-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Master Data Akun CEO (Chief Executive Officer)</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      HOLDING MASTER REGISTER & CORPORATE DIRECTORY
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Database Terpusat Holding Company, Registrasi Legalitas Konsesi IUP OP, Dokumen RKAB ESDM, Offtaker Master, & Struktur Otorisasi Direksi.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Menambah registrasi entitas holding / konsesi tambang baru...')}
                  className="px-3.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Holding Entity / IUP Master</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Register 1: Master Corporate Entities & Mining Licenses */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Master Register Entitas Korporat, Konsesi IUP & Legalitas ESDM</h3>
                <p className="text-[11px] text-slate-400">Daftar legalitas IUP OP, kuota persetujuan RKAB, & struktur direksi anak perusahaan</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Cari Entitas / Nomor IUP..." 
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Kode Entitas</th>
                  <th className="py-2.5 px-3">Nama Perusahaan & Konsesi IUP</th>
                  <th className="py-2.5 px-3">Persetujuan RKAB ESDM</th>
                  <th className="py-2.5 px-3">Direktur Utama & KTT Assigned</th>
                  <th className="py-2.5 px-3">Status Legalitas</th>
                  <th className="py-2.5 px-3 text-right">Aksi Master</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">ENT-HOLD-01</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>PT Mineral Nikel Nusantara (Holding)</div>
                    <div className="text-[10px] text-slate-400">Head Office Jakarta, Kapitalisasi Lahan 4,800 Ha (Morowali)</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">IUP OP No. 540/321/ESDM (2024-2034)</td>
                  <td className="py-2.5 px-3 text-slate-300">Ir. Bambang Trihatmono, M.M. (CEO)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      VERIFIED & ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Holding ENT-01')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">ENT-SUB-02</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>PT Halmahera Mining Resource (Subsidiary)</div>
                    <div className="text-[10px] text-slate-400">Site Halmahera Timur, Konsesi 2,500 Ha Saprolite/Limonite</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">IUP OP No. 503/118/ESDM (2023-2033)</td>
                  <td className="py-2.5 px-3 text-slate-300">Dr. Hendra Wijaya, S.T. (Director)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      VERIFIED & ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Sub-02')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-purple-400 font-bold">ENT-OFF-01</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>PT Tsingshan Steel Indonesia (Offtaker)</div>
                    <div className="text-[10px] text-slate-400">Kontrak Suplai Long-Term Ore Nikel Saprolite High Grade (1.80%)</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">MoU No. OFF/TSI/2025/088 (1.5M MT/Thn)</td>
                  <td className="py-2.5 px-3 text-slate-300">Mr. Chen Wei (Offtaker Rep)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      CONTRACT ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Offtaker')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Master Register 2: Matriks Detail Otorisasi CRUD & Modul ERP Akun CEO */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Matriks Otorisasi CRUD Sistem ERP untuk Akun CEO (Chief Executive Officer)</h3>
                <p className="text-[11px] text-slate-400">Rincian lengkap modul, sub-sistem, dan batas izin Create, Read, Update, Delete untuk Direktur Utama</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20">
                ERP Role: CEO / Chief Executive Officer
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Nama Modul ERP</th>
                  <th className="py-2.5 px-3">Sub-Sistem & Fitur Utamanya</th>
                  <th className="py-2.5 px-3 text-center">Create (C)</th>
                  <th className="py-2.5 px-3 text-center">Read (R)</th>
                  <th className="py-2.5 px-3 text-center">Update (U)</th>
                  <th className="py-2.5 px-3 text-center">Delete (D)</th>
                  <th className="py-2.5 px-3">Catatan Wewenang CEO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Multi-Company & Holding Governance</td>
                  <td className="py-2.5 px-3 text-slate-300">Entitas Anak Perusahaan, P&L Konsolidasi, Dividen & Shareholding</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES (Archive)</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas tertinggi tata kelola holding.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Dokumen RKAB ESDM & Perizinan IUP</td>
                  <td className="py-2.5 px-3 text-slate-300">Submission RKAB, Revisi Target Tonase, Lisensi IUP OP, AMDAL</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Persetujuan akhir submission pemerintah.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Finance, Capex & Investment</td>
                  <td className="py-2.5 px-3 text-slate-300">Persetujuan Investment Alat Berat, Pinjaman Bank, Working Capital</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Persetujuan Capex di atas batas wewenang CFO.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Penjualan Nikel & Offtaker Contracts</td>
                  <td className="py-2.5 px-3 text-slate-300">Kontrak Jangka Panjang Smelter, Harga Acuan HMA/HPM, Barging Sales</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Penandatanganan kontrak komersial utama.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">HR C-Level & Struktur Organisasi</td>
                  <td className="py-2.5 px-3 text-slate-300">Pengangkatan Direksi (COO, CFO, HRD), SOT Holding, Bonus Eksekutif</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas penetapan jajaran manajemen kunci.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-purple-400">Mine GPT AI & Real-time BI Dashboard</td>
                  <td className="py-2.5 px-3 text-slate-300">Simulasi Risiko LME, Executive AI Assistant, Multi-Site Analytics</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-slate-400">Akses tanpa batas analisis prediktif AI.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN COO (CHIEF OPERATING OFFICER) */}
      {activeTab === 'dasbor_coo' && (
        <div className="space-y-6">
          {/* Header Banner COO */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Dasbor Akun COO (Chief Operating Officer)</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      COO OPERATIONAL COMMAND & SITE CONTROLLER
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Komando Tertinggi Operasional Tambang Nikel: Target Produksi Ore, Fleet Management OEE, Stripping Ratio, Hauling-Barging, & K3LH/HSE Site.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Mengunduh Laporan Eksekutif Operasional Tambang & Fleet OEE...')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Executive Ops Report</span>
                </button>
                <button 
                  onClick={() => alert('Menyingkronkan data telemetri GPS Fleet & IoT Sensor Alat Berat...')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sinkronisasi Telemetri GPS Fleet</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 4 KPI Cards COO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Target Produksi Ore & SR</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  103.5% Achieved
                </span>
              </div>
              <div className="text-2xl font-black text-white">248,500 MT <span className="text-xs text-slate-400 font-normal">/ Bln</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Pickaxe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Stripping Ratio: <strong>3.2:1 (Target 3.5:1)</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Fleet Efficiency OEE & Availability</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  PA 92.4%
                </span>
              </div>
              <div className="text-2xl font-black text-white">88.5% MA <span className="text-xs text-slate-400 font-normal">UA 78.2%</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Armada Aktif: <strong>38 Units Excavator & DT</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Barging & Port Throughput</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  18 Tongkang
                </span>
              </div>
              <div className="text-2xl font-black text-white">135,000 WMT <span className="text-xs text-slate-400 font-normal">Shipped</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Ship className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Avg Speed Loading: <strong>980 MT/Jam (Zero Demurrage)</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">HSE Safe Hours & AMDAL Compliance</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  TRIFR 0.00
                </span>
              </div>
              <div className="text-2xl font-black text-white">1,850,000 <span className="text-xs text-slate-400 font-normal">Safe Hours</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Settling Pond: <strong>100% Quality Compliant</strong></span>
              </div>
            </div>
          </div>

          {/* Matriks Wewenang & Modul Hak Akses COO */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Modul, Fitur, & Menu Hak Akses COO (Chief Operating Officer)</h3>
                  <p className="text-[11px] text-slate-400">Rincian wewenang operasi CRUD sistem ERP untuk Direktur Operasional Tambang & Logistik</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Statutory Level: COO Full Operations Authority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: FULL ACCESS (CRUD FULL) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold border-b border-emerald-500/20 pb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AKSES PENUH OPERASIONAL (CRUD FULL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Operasi Tambang & Pit Mining:</strong> Eksekusi penggalian ore, overburden removal, & stripping ratio target.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Fleet Management & Dispatch GPS:</strong> Pengalokasian alat berat, siklus hauling, OEE, & telemetri IoT.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Perawatan Alat Berat & Workshop:</strong> Penjadwalan maintenance preventif, jam jalan, & penanganan breakdown.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Stockpile EFO & Quality Control:</strong> Blending ore nikel, verifikasi sampling assay lab, & stok EFO.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Barging & Pelabuhan Jetty:</strong> Kecepatan muat conveyor, dispatch tongkang, draft survey, & throughput.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>K3LH & Lingkungan AMDAL:</strong> Keselamatan kerja, pengelolaan settling pond, & inspeksi K3 pertambangan.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: READ & APPROVAL ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold border-b border-blue-500/20 pb-2">
                  <Eye className="w-4 h-4" />
                  <span>AKSES BACA & APPROVAL OPERASIONAL</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Anggaran Capex / Opex Operasional:</strong> Review & persetujuan belanja operasional alat berat & bahan bakar.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Purchase Order (PO) Procurement:</strong> Approval pengadaan sparepart & solar industri B35 Pertamina.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Payroll & Overtime Operator:</strong> Verifikasi jam kerja & lembur operator alat berat / driver hauling.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>RKAB ESDM Operational Target:</strong> Evaluasi bulanan pencapaian target fisik produksi vs dokumen RKAB.</span>
                  </li>
                </ul>
              </div>

              {/* Box 3: RESTRICTED ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold border-b border-rose-500/20 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AKSES DIBATASI (RESTRICTED)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Master COA & General Ledger:</strong> Pengaturan bagan akun akuntansi & jurnal penutup akhir tahun.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Restitusi Pajak & e-Faktur:</strong> Pengeditan e-Faktur Pajak PPN WAPU & SPT PPh Badan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Server Core & Master License:</strong> Konfigurasi lisensi SaaS ERP & kunci enkripsi database.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabel Live Stream Ops Tambang & Logistik Site */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Operasi Tambang, Fleet & Logistik Site</h3>
                <p className="text-[11px] text-slate-400">Pemantauan real-time front produksi pit, kesehatan armada alat berat, & barging jetty</p>
              </div>
              <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                Live Ops Stream
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Sektor Operasional</th>
                  <th className="py-2.5 px-3">Metrik Utama / Kapasitas</th>
                  <th className="py-2.5 px-3">Status Operasi / Efisiensi</th>
                  <th className="py-2.5 px-3">Target RKAB Variance</th>
                  <th className="py-2.5 px-3">Catatan K3LH & Standar Ops</th>
                  <th className="py-2.5 px-3 text-right">Otorisasi COO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Pickaxe className="w-3.5 h-3.5 text-blue-400" />
                    Pit A Alpha - Front Production
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">125,400 MT Ore Nikel</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      OPTIMAL (SR 3.1:1)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">+4.5% Above Plan</td>
                  <td className="py-2.5 px-3 text-slate-300">Jenjang Pit & Slope Stability Aman</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail kemajuan Pit A Alpha')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Cek Front
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-blue-400" />
                    Fleet Alat Berat & Maintenance
                  </td>
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">38 Units (CAT/Scania)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      PA 92.4% / MA 88.5%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">+2.4% PA Target</td>
                  <td className="py-2.5 px-3 text-slate-300">2 Units Service Routine di Workshop</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail FMS Alat Berat')} className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold">
                      Fleet Control
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    Stockpile EFO Blending
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">85,000 WMT (Ni 1.80%)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      BLENDED & COS READY
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">0.0% Grade Variance</td>
                  <td className="py-2.5 px-3 text-slate-300">Kadar Ni 1.80%, Fe 18.5%, Co 0.02%</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat sertifikat COS Stockpile')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Assay Lab
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Ship className="w-3.5 h-3.5 text-indigo-400" />
                    Jetty Port A & Barging
                  </td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300 font-bold">BG-301 Loading (7,500 WMT)</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      LOADING (980 MT/JAM)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">+5.0% Loading Speed</td>
                  <td className="py-2.5 px-3 text-slate-300">Draft Survey & Clearance On Time</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat status pemuatan tongkang Jetty A')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Jetty Clearance
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN COO (OPERATIONAL MASTER REGISTER) */}
      {activeTab === 'master_data_coo' && (
        <div className="space-y-6">
          {/* Header Banner Master Data COO */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Master Data Akun COO (Chief Operating Officer)</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      OPERATIONAL MASTER REGISTER & SITE CONTROL
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Database Terpusat Master Pit Mining, Master Fleet & Heavy Equipment, Master Stockpile EFO, Master Barging Tugboat, & Register Quality Control.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Menambah data master unit Fleet / Site Pit baru...')}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Master Fleet / Mining Pit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Register 1: Master Pit, Fleet, Stockpile & Jetty Operational Data */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Master Register Operasional Site (Pit, Fleet, Stockpile & Jetty)</h3>
                <p className="text-[11px] text-slate-400">Daftar entitas fisik lokasi tambang, armada alat berat, & fasilitas pengapalan</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Cari Kode Master / Nama Entitas..." 
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Kode Master</th>
                  <th className="py-2.5 px-3">Nama Entitas & Deskripsi</th>
                  <th className="py-2.5 px-3">Kategori Sektor</th>
                  <th className="py-2.5 px-3">Kapasitas / Status Operasi</th>
                  <th className="py-2.5 px-3">Status Otorisasi</th>
                  <th className="py-2.5 px-3 text-right">Aksi Master</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">PIT-001-A</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Pit Alpha Front Mining Zone</div>
                    <div className="text-[10px] text-slate-400">Lokasi Penambangan Ore Nikel High Grade Saprolite (Ni 1.80% - 2.00%)</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Mine Operations (Pit)</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">150,000 MT/Bln Target</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE & OPERATIONAL
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Pit A Alpha')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">FLT-EXC-390</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Excavator Heavy Fleet CAT 390D (6 Units)</div>
                    <div className="text-[10px] text-slate-400">Armada Excavator Loading Bucket 5.5 m3 untuk Overburden & Ore Getting</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Fleet Heavy Equipment</td>
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">PA 94.2% / MA 90.1%</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master armada CAT 390D')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">STK-EFO-01</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Stockpile EFO Dome 01 High Grade</div>
                    <div className="text-[10px] text-slate-400">Area Penampungan & Blending Ore Nikel Siap Muat Tongkang Jetty</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Stockpile & Blending EFO</td>
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">100,000 WMT Max Capacity</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Stockpile EFO 01')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-blue-400 font-bold">JTY-PORT-01</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Jetty Conveyor Loading Station A</div>
                    <div className="text-[10px] text-slate-400">Fasilitas Pelabuhan Muat Ore Nikel ke Tongkang 300 Feet</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Jetty Port Infrastructure</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300 font-bold">1,200 MT/Jam Speed Rate</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail master Jetty Port A')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Master Register 2: Matriks Detail Otorisasi CRUD & Modul ERP Akun COO */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Matriks Otorisasi CRUD Sistem ERP untuk Akun COO (Chief Operating Officer)</h3>
                <p className="text-[11px] text-slate-400">Daftar lengkap modul, sub-sistem, dan batas izin Create, Read, Update, Delete untuk Direktur Operasional</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono text-blue-400 bg-blue-500/10 border border-blue-500/20">
                ERP Role: COO / Chief Operating Officer
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Nama Modul ERP</th>
                  <th className="py-2.5 px-3">Sub-Sistem & Fitur Utamanya</th>
                  <th className="py-2.5 px-3 text-center">Create (C)</th>
                  <th className="py-2.5 px-3 text-center">Read (R)</th>
                  <th className="py-2.5 px-3 text-center">Update (U)</th>
                  <th className="py-2.5 px-3 text-center">Delete (D)</th>
                  <th className="py-2.5 px-3">Catatan Wewenang COO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Operasi Tambang & Pit Mining</td>
                  <td className="py-2.5 px-3 text-slate-300">Desain Pit, Stripping Ratio, Target Tonase, Stripping OB</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO (Soft Archive)</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas tertinggi eksekusi target produksi pit.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Fleet Management & Telemetri GPS</td>
                  <td className="py-2.5 px-3 text-slate-300">Dispatch Armada, FMS, OEE, Rute Hauling, Maintenance Workshop</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas alokasi alat berat & jadwal perbaikan.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Stockpile & Quality Control Ore</td>
                  <td className="py-2.5 px-3 text-slate-300">Target Blending Ore Nikel, Verifikasi COS, Assay Lab QA/QC</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas persetujuan blending & sertifikat COS.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Barging & Pelabuhan Jetty</td>
                  <td className="py-2.5 px-3 text-slate-300">Loading Speed Conveyor, Dispatch Tongkang, Draft Survey</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas clearance pemuatan tongkang jetty.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Keselamatan K3LH & AMDAL Lingkungan</td>
                  <td className="py-2.5 px-3 text-slate-300">Inspeksi Safety, Jam Selamat, Outflow Settling Pond, Reklamasi</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas kepatuhan K3 & baku mutu lingkungan.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">Pengadaan PO & Biaya Kontraktor</td>
                  <td className="py-2.5 px-3 text-slate-300">Purchase Order (PO) Sparepart/BBM, Tagihan Kontraktor Alat</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES (Approval)</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Approval teknis operasional PO & kontraktor.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN FINANCE DIRECTOR (FINANCE DIRECTOR & CFO) */}
      {activeTab === 'dasbor_finance_director' && (
        <div className="space-y-6">
          {/* Header Banner Finance Director */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Landmark className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Dasbor Akun Finance Director</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      CFO FINANCIAL & TAX CONTROLLER
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Otoritas tertinggi Keuangan Tambang untuk Arus Kas (Cash Flow), EBITDA, Royalty PNBP e-PNBP ESDM, Laporan PSAK/IFRS, & Tax Compliance.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Mengunduh Laporan Keuangan Konsolidasi PSAK/IFRS...')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Financial Statement (PSAK)</span>
                </button>
                <button 
                  onClick={() => alert('Menyingkronkan data tagihan e-PNBP Royalti KESDM & SIMPONI...')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sinkronisasi e-SIMPONI Royalti</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 4 KPI Cards Finance Director */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Working Capital & Liquidity</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Current Ratio 2.45x
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 184.2M <span className="text-xs text-slate-400 font-normal">Working Cap</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Cash & Equivalent: <strong>Rp 85.4M Mandiri/BCA</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Monthly EBITDA & Margin</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Margin 34.2%
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 42.8M <span className="text-xs text-slate-400 font-normal">/ Bln</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Target RKAB: <strong>+2.2% Above Target</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Royalti PNBP ESDM & SIMPONI</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% Settled
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 14.2M <span className="text-xs text-slate-400 font-normal">Paid</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>HPM Ref ESDM: <strong>NPT Verified</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Free Cash Flow & DSCR</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  DSCR 1.85x
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 28.5M <span className="text-xs text-slate-400 font-normal">FCF</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Capex Allocation: <strong>On Schedule</strong></span>
              </div>
            </div>
          </div>

          {/* Matriks Wewenang & Modul Hak Akses Finance Director */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Modul, Fitur, & Menu Hak Akses Finance Director</h3>
                  <p className="text-[11px] text-slate-400">Rincian wewenang operasi CRUD sistem ERP Finance & Accounting berdasarkan standar PSAK & regulasi ESDM</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Statutory Level: Finance Director Full Authority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: FULL ACCESS (CRUD FULL) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold border-b border-emerald-500/20 pb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AKSES PENUH (CRUD FULL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Master COA & General Ledger:</strong> Pengaturan bagan akun, jurnal penutup, & penyusunan Neraca / Laba-Rugi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Kas & Rekening Bank Korporat:</strong> Otorisasi pencairan dana, transfer vendor, PV, & rekonsiliasi kas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Invoicing Penjualan Ore Nikel:</strong> Pengesahan Invoice Sales, Surat Kredit L/C, & konfirmasi pembayaran Smelter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Pembayaran PNBP Royalti e-PNBP:</strong> Otorisasi pembayaran royalti KESDM via portal e-SIMPONI.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Tax Compliance & e-Faktur:</strong> Pengesahan SPT Masa PPh 22/21/25, PPN WAPU, & e-Faktur pajak.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: READ & VERIFY ONLY */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold border-b border-blue-500/20 pb-2">
                  <Eye className="w-4 h-4" />
                  <span>AKSES BACA & VERIFIKASI (READ ONLY)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Tonase Ritase & Stripping Ratio:</strong> Monitoring data fisik produksi untuk verifikasi tagihan kontraktor.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Rekapitulasi Payroll & Overtime:</strong> Verifikasi data penggajian dari HR Director sebelum disbursement.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Konsumsi Solar B35 & Sparepart:</strong> Verifikasi log pemakaian BBM & stok gudang dari Logistics Lead.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Realisasi Anggaran RKAB ESDM:</strong> Audit realisasi anggaran operasional vs RKAB tahunan disetujui.</span>
                  </li>
                </ul>
              </div>

              {/* Box 3: RESTRICTED ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold border-b border-rose-500/20 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AKSES DIBATASI (RESTRICTED)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Raw Mine Engineering Design:</strong> Desain jenjang pit, lereng geoteknik, & simulasi peledakan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Alterasi Data Assay Lab:</strong> Pengeditan kadar kimia Ni/Fe/Co laboratorium secara manual.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Infrastructure & Source Code:</strong> Kunci enkripsi database & konfigurasi dasar server.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabel Live Stream Arus Kas & Finansial Tambang */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Pos Inflow & Outflow Finansial Site</h3>
                <p className="text-[11px] text-slate-400">Pemantauan arus kas pendapatan penjualan ore, beban operasional kontraktor, & royalti ESDM</p>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                Live Finance Stream
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Kategori Finansial</th>
                  <th className="py-2.5 px-3">Nilai Nominal (IDR)</th>
                  <th className="py-2.5 px-3">Status Pembayaran / Settlement</th>
                  <th className="py-2.5 px-3">Target RKAB Variance</th>
                  <th className="py-2.5 px-3">Ketentuan Pajak & Legal</th>
                  <th className="py-2.5 px-3 text-right">Otorisasi CFO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                    Penjualan Ore Nikel (Smelter Inflow)
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 125,400,000,000</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      RECEIVED 92% (L/C SETTLED)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">+3.5% Above Budget</td>
                  <td className="py-2.5 px-3 text-slate-300">PPh 22 Terpungut & e-Faktur WAPU</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail invoice penjualan ore')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Cek Invoice
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-rose-400" />
                    Beban Kontraktor Heavy Equipment
                  </td>
                  <td className="py-2.5 px-3 font-mono text-rose-400 font-bold">Rp 32,500,000,000</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      SCHEDULED PAYMENT
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">-1.2% Under Budget</td>
                  <td className="py-2.5 px-3 text-slate-300">PPh 23 Jasa Penambangan (2%)</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail tagihan kontraktor')} className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold">
                      Approve PV
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-rose-400" />
                    Beban Solar Industri B35 Pertamina
                  </td>
                  <td className="py-2.5 px-3 font-mono text-rose-400 font-bold">Rp 18,200,000,000</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      SETTLED (PAID)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">0.0% On Target</td>
                  <td className="py-2.5 px-3 text-slate-300">PPN 11% & PBBKB Daerah</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat bukti bayar BBM Pertamina')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Bukti Bayar
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                    Royalti PNBP KESDM & e-SIMPONI
                  </td>
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">Rp 14,200,000,000</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      NTPN VERIFIED (100%)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">+1.8% (Matching Revenue)</td>
                  <td className="py-2.5 px-3 text-slate-300">PNBP Mining Production Tariff</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat NTPN SIMPONI ESDM')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Bukti NTPN
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN FINANCE DIRECTOR (FINANCIAL MASTER REGISTER) */}
      {activeTab === 'master_data_finance_director' && (
        <div className="space-y-6">
          {/* Header Banner Master Data Finance Director */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Master Data Akun Finance Director</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      FINANCIAL MASTER REGISTER & TAX CONTROL
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Database terpusat Chart of Accounts (COA), Ledger Vendor Kontraktor, Tarif Royalti HPM Nikel ESDM, & Matriks Otorisasi ERP Finance.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Menambah data master COA / Vendor Account baru...')}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Master COA / Vendor</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Register 1: Master COA & Tarif Referensi HPM Nikel ESDM */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Master Chart of Accounts (COA) & Referensi HPM ESDM</h3>
                <p className="text-[11px] text-slate-400">Daftar akun buku besar, rekening bank, & struktur penetapan royalti HPM Nikel KESDM</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Cari Kode COA / Nama Akun..." 
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Kode COA</th>
                  <th className="py-2.5 px-3">Nama Akun & Deskripsi</th>
                  <th className="py-2.5 px-3">Kategori Akun</th>
                  <th className="py-2.5 px-3">Saldo / Rate Referensi</th>
                  <th className="py-2.5 px-3">Status Otorisasi</th>
                  <th className="py-2.5 px-3 text-right">Aksi Master</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">1101-001</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Bank Mandiri IDR Main Escrow Account</div>
                    <div className="text-[10px] text-slate-400">Rekening Operasional Penampungan Hasil Penjualan Ore Nikel</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Cash & Bank (Current Asset)</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 85,420,000,000</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE & LOCKED
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat rincian akun Mandiri Escrow')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">1102-005</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Trade Receivable - Smelter Nickel Buyer A</div>
                    <div className="text-[10px] text-slate-400">Piutang Dagang Penjualan Ore Nikel Ni 1.8% FOB Jetty</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Accounts Receivable</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">Rp 42,100,000,000</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat rincian piutang Smelter A')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">2101-010</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Accounts Payable - Heavy Equipment Contractor</div>
                    <div className="text-[10px] text-slate-400">Hutang Dagang Jasa Penambangan Overburden & Ore Getting</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Accounts Payable (Liability)</td>
                  <td className="py-2.5 px-3 font-mono text-rose-400 font-bold">Rp 18,500,000,000</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat rincian hutang kontraktor')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Edit Master
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">5101-001</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>HPM Nickel Royalty Tariff (ESDM SIMPONI 10%)</div>
                    <div className="text-[10px] text-slate-400">Tarif Acuan PNBP Hasil Tambang Nikel Berdasarkan Permen ESDM</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Statutory Tariff Reference</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300 font-bold">10.0% Tariff Rate</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      STATUTORY ESDM
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat parameter acuan HPM ESDM')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Cek Tarif
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Master Register 2: Matriks Detail Otorisasi CRUD & Modul ERP Akun Finance Director */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Matriks Otorisasi CRUD Sistem ERP untuk Akun Finance Director</h3>
                <p className="text-[11px] text-slate-400">Daftar lengkap modul, sub-sistem, dan batas izin Create, Read, Update, Delete</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                ERP Role: Finance Director / CFO
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Nama Modul ERP</th>
                  <th className="py-2.5 px-3">Sub-Sistem & Fitur Utamanya</th>
                  <th className="py-2.5 px-3 text-center">Create (C)</th>
                  <th className="py-2.5 px-3 text-center">Read (R)</th>
                  <th className="py-2.5 px-3 text-center">Update (U)</th>
                  <th className="py-2.5 px-3 text-center">Delete (D)</th>
                  <th className="py-2.5 px-3">Catatan Wewenang CFO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">Laporan Keuangan PSAK & General Ledger</td>
                  <td className="py-2.5 px-3 text-slate-300">Bagan Akun COA, Jurnal Umum, Neraca, Laba Rugi, Cashflow</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO (Soft Archive)</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas penutupan buku & pengesahan laporan audit.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">Penjualan Ore & L/C Invoicing</td>
                  <td className="py-2.5 px-3 text-slate-300">Penetapan Harga HPM ESDM, Invoicing Smelter, Surat Kredit L/C</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas penagihan & settlement penjualan ore.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">Kas, Bank, & Disbursement Approval</td>
                  <td className="py-2.5 px-3 text-slate-300">Pencairan Dana Vendor, Payment Voucher (PV), Transfer Bank</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas tunggal persetujuan pembayaran kas/bank.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-emerald-400">Royalti PNBP e-PNBP SIMPONI ESDM</td>
                  <td className="py-2.5 px-3 text-slate-300">Perhitungan Royalti Hasil Tambang Nikel, Kode Billing SIMPONI</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas kewajiban PNBP ke kas negara KESDM.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Pengadaan Barang & Kontrak Vendor</td>
                  <td className="py-2.5 px-3 text-slate-300">Purchase Order (PO), Evaluasi Tender, Kontrak Alat Berat</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES (Approval)</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Approval finansial PO/Kontrak di atas batas nominal.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Gaji Karyawan & Payroll Site</td>
                  <td className="py-2.5 px-3 text-slate-300">Rekapitulasi Gaji Pokok, Lembur, Insentif, BPJS</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES (Approval)</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas disbursement transfer gaji karyawan.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN HR DIRECTOR (HUMAN CAPITAL DIRECTOR) */}
      {activeTab === 'dasbor_hr_director' && (
        <div className="space-y-6">
          {/* Header Banner HR Director */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
                  <Users className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Dasbor Akun HR Director</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      UU KETENAGAKERJAAN & ESDM COMPLIANT
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Otoritas tertinggi Human Capital untuk tata kelola Tenaga Kerja Site, Sertifikasi K3/POP/POM/POU KESDM, Roster Kerja, BPJS, & Industrial Relations.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Mengunduh Laporan Rekap Headcount & Payroll Site...')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Rekap Headcount & Payroll</span>
                </button>
                <button 
                  onClick={() => alert('Menyingkronkan telemetry presensi, roster, & status MCU Karyawan...')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sinkronisasi Roster & MCU</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 4 KPI Cards HR Director */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Total Headcount & Roster</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  98.2% Present
                </span>
              </div>
              <div className="text-2xl font-black text-white">845 <span className="text-xs text-slate-400 font-normal">Karyawan Site</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Roster Field: <strong>65% Site / 35% HO</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Sertifikasi POP/POM/POU ESDM</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  94.2% Certified
                </span>
              </div>
              <div className="text-2xl font-black text-white">150 <span className="text-xs text-slate-400 font-normal">Pengawas KESDM</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Rincian: <strong>128 POP | 18 POM | 4 POU</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">MCU Fit-For-Duty & BPJS</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  100% BPJS Covered
                </span>
              </div>
              <div className="text-2xl font-black text-white">98.6% <span className="text-xs text-slate-400 font-normal">Fit Duty</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Site Clinic: <strong>833 Fit / 12 Restriksi</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Payroll & Overtime Ratio</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  OT Ratio 2.1%
                </span>
              </div>
              <div className="text-2xl font-black text-white">Rp 12.4M <span className="text-xs text-slate-400 font-normal">/ Bln</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Anggaran: <strong>3.5% Under Budget</strong></span>
              </div>
            </div>
          </div>

          {/* Matriks Wewenang & Modul Hak Akses HR Director */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Modul, Fitur, & Menu Hak Akses HR Director</h3>
                  <p className="text-[11px] text-slate-400">Rincian wewenang operasi CRUD sistem ERP Human Capital berdasarkan UU Ketenagakerjaan & Regulasi ESDM</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                Statutory Level: HR Director Full Authority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: FULL ACCESS (CRUD FULL) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold border-b border-emerald-500/20 pb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AKSES PENUH (CRUD FULL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Master Database Karyawan:</strong> Tambah, edit, mutasi jabatan, promosi, & SOT organisasi site.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Payroll & Insentif Ritase:</strong> Pengesahan slip gaji bulanan, lembur, bonus produksi, & klaim BPJS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Sertifikasi POP/POM/POU ESDM:</strong> Pendaftaran diklat kompetensi K3 tambang & SIMPER operator.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Sistem Rekrutmen (ATS) & MCU:</strong> Approval penerimaan karyawan baru, Onboarding, & Fit-For-Duty MCU.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Roster Field & Cuti Periodik:</strong> Jadwal kerja site (6:2, 4:2, 2:1), tiket penerbangan, & izin sakit.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: READ & VERIFY ONLY */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold border-b border-blue-500/20 pb-2">
                  <Eye className="w-4 h-4" />
                  <span>AKSES BACA & VERIFIKASI (READ ONLY)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Jam Selamat K3LH (Safe Hours Worked):</strong> Monitoring data akumulasi jam kerja selamat dari HSE Manager.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Presensi GPS & Fingerprint Operator:</strong> Verifikasi jam kerja aktual operator dari Dispatcher & Pit Lead.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Biaya Agregat Tenaga Kerja:</strong> Laporan integrasi beban gaji ke laporan rugi laba finansial korporat.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Rencana Tenaga Kerja RKAB ESDM:</strong> Verifikasi kuota Manpower Planning untuk laporan tahunan ESDM.</span>
                  </li>
                </ul>
              </div>

              {/* Box 3: RESTRICTED ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold border-b border-rose-500/20 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AKSES DIBATASI (RESTRICTED)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Raw Pit Engineering & Blasting:</strong> Formula bahan peledak & parameter lereng geoteknik.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Lab Assay Chemical Modifiers:</strong> Pengeditan kadar Ni/Fe laboratorium secara manual.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Core Code & Infrastructure API:</strong> Konfigurasi dasar cloud server & kunci enkripsi database.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabel Live Monitoring Ketenagakerjaan Site per Departemen */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Ketenagakerjaan & Sertifikasi K3 per Departemen</h3>
                <p className="text-[11px] text-slate-400">Pemantauan langsung distribusi tenaga kerja site, pemenuhan POP/POM, & status kelaikan kerja MCU</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">
                Live HR Stream
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Departemen Site</th>
                  <th className="py-2.5 px-3">Headcount Total</th>
                  <th className="py-2.5 px-3">Sertifikasi POP/POM ESDM</th>
                  <th className="py-2.5 px-3">Status Kelaikan MCU</th>
                  <th className="py-2.5 px-3">Roster Status</th>
                  <th className="py-2.5 px-3 text-right">Tindakan HR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    Mining Operations
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-200">420 Karyawan</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">68 POP | 8 POM | 2 POU</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      412 FIT / 8 RESTRIKSI
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300">280 Field / 140 Roster Off</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail HR Mining Operations')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Detail Roster
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    Plant & Workshop Maintenance
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-200">185 Karyawan</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">32 POP | 5 POM</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      183 FIT / 2 RESTRIKSI
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300">125 Field / 60 Roster Off</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail HR Plant & Maintenance')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Cek MCU
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    HSE & K3LH Environment
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-200">65 Karyawan</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">18 POP | 3 POM | 1 POU</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      65 FIT (100%)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300">45 Field / 20 Roster Off</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat sertifikasi K3LH')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Verifikasi POP
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                    Supply Chain & Warehouse
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-200">110 Karyawan</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">10 POP | 2 POM</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      108 FIT / 2 RESTRIKSI
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300">75 Field / 35 Roster Off</td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat sertifikasi SIMPER Forklift & Crane')} className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold">
                      Cek SIMPER
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN HR DIRECTOR (MASTER REGISTER & HR CONTROL) */}
      {activeTab === 'master_data_hr_director' && (
        <div className="space-y-6">
          {/* Header Banner Master Data HR Director */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-400">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Master Data Akun HR Director</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                      HUMAN CAPITAL MASTER REGISTER
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Database terpusat profil karyawan, sertifikasi POP/POM/POU ESDM, SOT organisasi site, BPJS Ketenagakerjaan, & matriks otorisasi ERP HR.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Menambah data master karyawan / sertifikasi K3 baru...')}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Master Karyawan</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Register 1: Master Database Karyawan & Sertifikasi Competency ESDM */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Master Database Karyawan & Sertifikasi K3 ESDM</h3>
                <p className="text-[11px] text-slate-400">Daftar lengkap profil karyawan, lisensi K3, status MCU, & BPJS Ketenagakerjaan</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Cari NIK / Nama / Jabatan..." 
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">ID Karyawan</th>
                  <th className="py-2.5 px-3">Nama & Jabatan Karyawan</th>
                  <th className="py-2.5 px-3">Departemen & Roster</th>
                  <th className="py-2.5 px-3">Sertifikasi K3 ESDM</th>
                  <th className="py-2.5 px-3">Status MCU</th>
                  <th className="py-2.5 px-3">BPJS Status</th>
                  <th className="py-2.5 px-3 text-right">Aksi Master</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-indigo-400 font-bold">EMP-2024-001</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Eko Prasetyo</div>
                    <div className="text-[10px] text-slate-400">Senior Heavy Equipment Operator (CAT 777E)</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Mining Ops (6:2 Roster)</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">POP ESDM Certified</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      FIT CLASS A
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE COVERED
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail profil Eko Prasetyo')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Detail Karyawan
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-indigo-400 font-bold">EMP-2022-012</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Hendra Setiawan</div>
                    <div className="text-[10px] text-slate-400">Pit Mining Superintendent</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">Mining Ops (4:2 Roster)</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300 font-bold">POM ESDM Senior Certified</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      FIT CLASS A
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE COVERED
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail profil Hendra Setiawan')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Detail Karyawan
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-indigo-400 font-bold">EMP-2023-045</td>
                  <td className="py-2.5 px-3 font-medium text-white">
                    <div>Dr. Farhan Syahputra</div>
                    <div className="text-[10px] text-slate-400">Chief Site Occupational Health Doctor</div>
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">HSE & Medical (4:2 Roster)</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-bold">HIPERKES & POP Certified</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      FIT CLASS A
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      ACTIVE COVERED
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat detail profil Dr. Farhan')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Detail Karyawan
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Master Register 2: Matriks Detail Otorisasi CRUD & Modul ERP Akun HR Director */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Matriks Otorisasi CRUD Sistem ERP untuk Akun HR Director</h3>
                <p className="text-[11px] text-slate-400">Daftar lengkap modul, sub-sistem, dan batas izin Create, Read, Update, Delete</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">
                ERP Role: HR Director
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Nama Modul ERP</th>
                  <th className="py-2.5 px-3">Sub-Sistem & Fitur Utamanya</th>
                  <th className="py-2.5 px-3 text-center">Create (C)</th>
                  <th className="py-2.5 px-3 text-center">Read (R)</th>
                  <th className="py-2.5 px-3 text-center">Update (U)</th>
                  <th className="py-2.5 px-3 text-center">Delete (D)</th>
                  <th className="py-2.5 px-3">Catatan Wewenang HR Director</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-indigo-400">Master Data Karyawan & SOT</td>
                  <td className="py-2.5 px-3 text-slate-300">Profil NIK, Struktur Organisasi, Mutasi, Promosi</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO (Soft Archive)</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas tunggal pengelolaan struktur SDM korporat.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-indigo-400">Payroll & Slip Gaji Bulanan</td>
                  <td className="py-2.5 px-3 text-slate-300">Komponen Gaji Pokok, Tunjangan Site, Lembur, BPJS</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Persetujuan akhir pengeluaran gaji & bonus karyawan.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-indigo-400">Rekrutmen ATS & MCU Fit-Duty</td>
                  <td className="py-2.5 px-3 text-slate-300">Lowongan Kerja, Interview, Hasil MCU Clinic, Onboarding</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Pengesahan pelamar baru & persetujuan hasil MCU.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-indigo-400">Diklat Sertifikasi POP/POM/POU</td>
                  <td className="py-2.5 px-3 text-slate-300">Pendaftaran Uji Kompetensi KESDM, Masa Validitas POP</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Pengelolaan kompetensi pengawas operasional tambang.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Operasi Penambangan & Hauling</td>
                  <td className="py-2.5 px-3 text-slate-300">Ritase Ore, Tonase Pit, Jam Kerja Unit Alat Berat</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Monitoring produktivitas untuk insentif ritase.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Laporan Keuangan & Akuntansi</td>
                  <td className="py-2.5 px-3 text-slate-300">Jurnal Umum, Laba Rugi, Cashflow Korporat</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Akses rekapitulasi beban gaji dalam laporan finansial.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN MINE MANAGER (KEPALA TEKNIK TAMBANG / KTT) */}
      {activeTab === 'dasbor_mine_manager' && (
        <div className="space-y-6">
          {/* Header Banner Mine Manager */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Dasbor Akun Mine Manager / KTT</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      KEPMEN ESDM 1827.K / 2018
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Otoritas tertinggi Kepala Teknik Tambang untuk pengawasan K3LH, Buku Tambang ESDM, Kestabilan Geoteknik, & Produksi Site.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Mengunduh Laporan Buku Tambang ESDM & Status KTT...')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Buku Tambang ESDM</span>
                </button>
                <button 
                  onClick={() => alert('Menyingkronkan telemetry geoteknik & status legalitas KTT...')}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sinkronisasi Datum KTT</span>
                </button>
              </div>
            </div>
          </div>

          {/* Top 4 KPI Cards Mine Manager */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Realisasi & RKAB ESDM</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  99.0% Compliant
                </span>
              </div>
              <div className="text-2xl font-black text-white">148,500 <span className="text-xs text-slate-400 font-normal">WMT Ore</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Buku Tambang: <strong>Aktif / Green Zone</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Kestabilan Geoteknik Pit</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  FK = 1.38 (Aman)
                </span>
              </div>
              <div className="text-2xl font-black text-white">0.2 <span className="text-xs text-slate-400 font-normal">mm/hari Radar</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Displacement: <strong>Pit Highwall Stable</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">K3LH & Environment</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Zero LTI
                </span>
              </div>
              <div className="text-2xl font-black text-white">1.82M <span className="text-xs text-slate-400 font-normal">Safe Hours</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Settling Pond: <strong>pH 7.2 Compliant</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-medium">Economics & Strip Ratio</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  SR 1.62 BCM/MT
                </span>
              </div>
              <div className="text-2xl font-black text-white">$18.40 <span className="text-xs text-slate-400 font-normal">/ WMT Ore</span></div>
              <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Cash Cost: <strong>3.2% Below Budget</strong></span>
              </div>
            </div>
          </div>

          {/* Matriks Wewenang & Modul Akses Akun Mine Manager (KTT) */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Modul, Fitur, & Menu Hak Akses Mine Manager (KTT)</h3>
                  <p className="text-[11px] text-slate-400">Rincian wewenang operasi CRUD sistem ERP berdasarkan Regulasi Kepmen ESDM 1827.K/2018</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Statutory Level: KTT Full Authority
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Box 1: FULL ACCESS (CRUD FULL) */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold border-b border-emerald-500/20 pb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>AKSES PENUH (CRUD FULL)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Buku Tambang ESDM:</strong> Pengesahan temuan inspeksi, instruksi KTT, & sertifikasi safety.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Persetujuan Peledakan (Blasting Permit):</strong> Otorisasi SIP, gudang bahan peledak, & jadwal pit blasting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Geoteknik & Pit Highwall:</strong> Penetapan limit aman slope stability, radar monitoring, & penghentian darurat.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>Pengesahan RKAB & LHP:</strong> Tanda tangan digital Laporan Hasil Penambangan & RKAB tahunan ESDM.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                    <span><strong>K3LH & Settling Pond:</strong> Izin baku mutu air limbah tambang, AMDAL, & reklamasi area pit.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: READ & VERIFY ONLY */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold border-b border-blue-500/20 pb-2">
                  <Eye className="w-4 h-4" />
                  <span>AKSES BACA & VERIFIKASI (READ ONLY)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Peta Geologi & Core Drill:</strong> Verifikasi batas ore nikel & model geostatistik JORC dari Chief Geologist.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Survei Drone & Topografi Pit:</strong> Verifikasi peta kontur As-Built pit & kemajuan volume tambang bulanan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>Biaya Penambangan (Aggregated Cost):</strong> Evaluasi cash cost per WMT ore & variansi budget operasional.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1 shrink-0"></span>
                    <span><strong>SDM & SOT Operasional Site:</strong> Verifikasi sertifikasi POP/POM/POU pengawas operasional tambang.</span>
                  </li>
                </ul>
              </div>

              {/* Box 3: RESTRICTED ACCESS */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold border-b border-rose-500/20 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>AKSES DIBATASI (RESTRICTED)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Payroll Individual Detail:</strong> Komponen rincian slip gaji individual karyawan (hanya rekap biaya agregat).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>SaaS Core Code & Billing License:</strong> Pengaturan arsitektur dasar cloud & lisensi pembayaran SaaS.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1 shrink-0"></span>
                    <span><strong>Perubahan Raw Assay Data:</strong> Modifikasi angka kadar Ni/Fe laboratorium tanpa re-assay terverifikasi.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tabel Pengawasan Sektor Site & Status Compliance KTT */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Ringkasan Status Pengawasan Lapangan KTT ESDM</h3>
                <p className="text-[11px] text-slate-400">Pemantauan langsung kestabilan pit, lingkungan, bahan peledak, & buku tambang</p>
              </div>
              <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                Live Audit Stream
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Sektor Penambangan</th>
                  <th className="py-2.5 px-3">Aspek Pengawasan KTT</th>
                  <th className="py-2.5 px-3">Parameter / Nilai Realtime</th>
                  <th className="py-2.5 px-3">Status Kepatuhan ESDM</th>
                  <th className="py-2.5 px-3 text-right">Tindakan KTT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    Pit Alpha Central
                  </td>
                  <td className="py-2.5 px-3">Geoteknik & Kestabilan Highwall</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">FK = 1.38 | Disp 0.2mm/day</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      AMAM (APPROVED)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Detail verifikasi geoteknik Pit Alpha')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Verifikasi Radar
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Gudang Bahan Peledak
                  </td>
                  <td className="py-2.5 px-3">Keamanan Stok Handak & SIP</td>
                  <td className="py-2.5 px-3 font-mono text-amber-300">ANFO 12.5 Ton | Detonator 450 Pcs</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      SIP VALID (TERTUTUP)
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Membuka register izin peledakan KTT')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Izin Blasting
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    Settling Pond SP-02
                  </td>
                  <td className="py-2.5 px-3">Kualitas Air Outlet Tambang</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400">pH = 7.2 | TSS = 85 mg/L</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      BAKU MUTU COMPLIANT
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Detail laporan lingkungan settling pond')} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Cek pH Telemetry
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-medium text-white flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    Buku Tambang ESDM
                  </td>
                  <td className="py-2.5 px-3">Sertifikasi Inspektur Tambang</td>
                  <td className="py-2.5 px-3 font-mono text-blue-300">Catatan No. KTT/2026/08</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                      REGISTERED
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Membuka lembar Buku Tambang ESDM')} className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold">
                      Tanda Tangan KTT
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN MINE MANAGER (MINE MANAGER REGISTER & KTT CONTROL) */}
      {activeTab === 'master_data_mine_manager' && (
        <div className="space-y-6">
          {/* Header Banner Master Data Mine Manager */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border border-amber-500/30 shadow-lg">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400">
                  <Database className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">Master Data Akun Mine Manager / KTT</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      MASTER STATUTORY REGISTER
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Database terpusat legalitas penunjukan KTT, izin peledakan, stasiun pemantauan geoteknik, & matriks otorisasi modul ERP.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert('Menambah data master legalitas / stasiun geoteknik KTT baru...')}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Master Legalitas KTT</span>
                </button>
              </div>
            </div>
          </div>

          {/* Master Register 1: Legalitas Penunjukan KTT & RKAB ESDM */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">Master Legalitas KTT, Buku Tambang & RKAB ESDM</h3>
                <p className="text-[11px] text-slate-400">Daftar izin operasional resmi, keputusan Dirjen Minerba, & sertifikasi K3LH KTT</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input 
                    type="text" 
                    placeholder="Cari nomor SK / Izin..." 
                    className="pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">ID Register</th>
                  <th className="py-2.5 px-3">Nama Dokumen Legalitas</th>
                  <th className="py-2.5 px-3">Nomor Surat / SK Resmi</th>
                  <th className="py-2.5 px-3">Instansi Penerbit</th>
                  <th className="py-2.5 px-3">Masa Berlaku</th>
                  <th className="py-2.5 px-3">Status Compliance</th>
                  <th className="py-2.5 px-3 text-right">Aksi Master</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">KTT-SK-2026-001</td>
                  <td className="py-2.5 px-3 font-medium text-white">Surat Penunjukan KTT Resmi ESDM</td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">540/1827/DJB.MINERBA/2026</td>
                  <td className="py-2.5 px-3">Kementrian ESDM RI</td>
                  <td className="py-2.5 px-3">31 Des 2028</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      AKTIF / SAH
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat dokumen SK KTT')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Detail SK
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">RKAB-NIKEL-2026</td>
                  <td className="py-2.5 px-3 font-medium text-white">Persetujuan RKAB Tahun 2026 (1.8M WMT)</td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">B-1049/MB.05/DJB.B/2026</td>
                  <td className="py-2.5 px-3">Dirjen Minerba ESDM</td>
                  <td className="py-2.5 px-3">31 Des 2026</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      APPROVED
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat dokumen Persetujuan RKAB')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Cek Kuota
                    </button>
                  </td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">SIP-HANDAK-042</td>
                  <td className="py-2.5 px-3 font-medium text-white">Izin Penimbunan & Penggunaan Bahan Peledak</td>
                  <td className="py-2.5 px-3 font-mono text-slate-300">SIP/POLRI/BAM-WEST/2026</td>
                  <td className="py-2.5 px-3">Mabes Polri & Kapolda</td>
                  <td className="py-2.5 px-3">15 Okt 2026</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      SIP AKTIF
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button onClick={() => alert('Melihat dokumen Izin Blasting')} className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold">
                      Cek Handak
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Master Register 2: Matriks Detail Otorisasi CRUD & Modul ERP Akun Mine Manager */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">Matriks Otorisasi CRUD Sistem ERP untuk Akun Mine Manager</h3>
                <p className="text-[11px] text-slate-400">Daftar lengkap modul, sub-sistem, dan batas izin Create, Read, Update, Delete</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20">
                ERP Role: Mine Manager (KTT)
              </span>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/50">
                  <th className="py-2.5 px-3">Nama Modul ERP</th>
                  <th className="py-2.5 px-3">Sub-Sistem & Fitur Utamanya</th>
                  <th className="py-2.5 px-3 text-center">Create (C)</th>
                  <th className="py-2.5 px-3 text-center">Read (R)</th>
                  <th className="py-2.5 px-3 text-center">Update (U)</th>
                  <th className="py-2.5 px-3 text-center">Delete (D)</th>
                  <th className="py-2.5 px-3">Catatan Wewenang KTT ESDM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-amber-400">Buku Tambang ESDM</td>
                  <td className="py-2.5 px-3 text-slate-300">Sertifikasi Inspeksi, Catatan KTT, Emergency Stop</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO (Audit Trail)</td>
                  <td className="py-2.5 px-3 text-slate-400">Otoritas tunggal penandatanganan catatan resmi ESDM.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-amber-400">RKAB & LHP Reporting</td>
                  <td className="py-2.5 px-3 text-slate-300">Penyusunan Realisasi RKAB, Approval LHP Bulanan</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Pengesahan resmi tonase & laporan pemerintah.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-amber-400">Geoteknik & Blasting</td>
                  <td className="py-2.5 px-3 text-slate-300">Batas Slope Highwall, SIP Peledakan, Radar Monitoring</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-rose-400 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Persetujuan rencana peledakan & batas lereng aman.</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Eksplorasi & Geologi</td>
                  <td className="py-2.5 px-3 text-slate-300">Blok Model JORC, Pemodelan Kadar Ni/Fe, Drill Holes</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Akses baca & verifikasi cadangan (Chief Geologist edit).</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-blue-400">Survei Topografi</td>
                  <td className="py-2.5 px-3 text-slate-300">Peta As-Built Pit, Drone Contour, Ore Volume Measurement</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-emerald-400 font-bold">YES</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Verifikasi progres kemajuan pit (Chief Surveyor edit).</td>
                </tr>

                <tr className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-rose-400">HR & Payroll Individual</td>
                  <td className="py-2.5 px-3 text-slate-300">Rincian Slip Gaji Karyawan, Tunjangan Perorangan</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-amber-300 font-bold">AGGREGATE</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 font-bold">NO</td>
                  <td className="py-2.5 px-3 text-slate-400">Privasi HR: Hanya membaca total rekapitulasi biaya.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN OPERATION MANAGER */}
      {activeTab === 'dasbor_operation_manager' && (
        <div className="space-y-6">
          {/* Top KPI Cards Operation Manager */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Total Produksi Tambang Site (MTD)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  103.3% Target RKAB
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400 font-mono">310,000</span>
                <span className="text-slate-400 text-[11px]">BCM OB / 148.5K WMT Ore</span>
              </div>
              <span className="text-emerald-400 text-[11px] block mt-1 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saprolite 82.1K WMT | Limonite 66.4K WMT
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Ketersediaan & Efisiensi Armada (Fleet)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Match Factor 1.06
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-100 font-mono">94.8%</span>
                <span className="text-slate-400 text-[11px]">Physical Availability</span>
              </div>
              <span className="text-blue-400 text-[11px] block mt-1 font-semibold">
                Mechanical Avail: 91.2% | 24 Dump Truck & 6 Heavy Excavator
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Keselamatan Kerja & HSE Index</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  Zero Harm
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-teal-400 font-mono">1.24M</span>
                <span className="text-slate-400 text-[11px]">Safe Working Hours</span>
              </div>
              <span className="text-teal-400 text-[11px] block mt-1 font-semibold">
                Lost Time Injury (LTI): 0 | Safety Inspection Pass Rate: 99.1%
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Efisiensi Biaya Operasional & Fuel</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  -3.2% Variance
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400 font-mono">2.85 L</span>
                <span className="text-slate-400 text-[11px]">Fuel Ratio / WMT Ore</span>
              </div>
              <span className="text-slate-400 text-[11px] block mt-1">
                Stock Tank Fuel: 185,000 Liter | Realisasi Biaya under-budget
              </span>
            </div>
          </div>

          {/* MATRIKS WEWENANG & AKSES MODUL OPERATION MANAGER */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-base">Matriks Hak Akses & Fitur Akun Operation Manager (Site Operations Chief)</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Kebijakan otorisasi sistem untuk peran <span className="text-emerald-400 font-bold">Operation Manager Site, Deputy Operation Manager & Site General Superintendent</span>.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Role: Operation Manager (Site Operations Category)
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
                      <strong className="text-slate-100">Target & Realisasi Pit Operations:</strong> Approval & eksekusi target penambangan OB BCM, Ore WMT, & Strip Ratio (SR).
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Fleet Dispatch & Work Shift Cycles:</strong> Otorisasi alokasi armada excavator/DT, rotasi shift operator, & manajemen jalan tambang.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Stockpile Blending & Quality Control:</strong> Pengawasan blending kadar ore EFO/Dome sesuai spesifikasi smelter.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Crusher & Conveyor Material Flow:</strong> Monitoring throughput crusher station TPH, feeder, & sizing material.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Jetty Port & Shipping Barging:</strong> Pengawasan komitmen tongkang, loading jetty conveyor, & draught survey.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">HSE & Environmental Operations:</strong> Eksekusi K3LH tambang, pemantauan kolam pengendap (settling pond), & inspeksi K3 harian.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Operational Fuel & Cost Inventory:</strong> Manajemen tangki BBM solar site, pemakaian fuel per alat, & efisiensi biaya.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Laporan Operasional Tambang (LHP):</strong> Pengesahan Laporan Harian Penambangan & pelaporan berkala ESDM.
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
                      <strong className="text-slate-100">Model Geostatistik Cadangan JORC (Geologi):</strong> Melihat data blok model & estimasi cadangan terukur.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Peta Topografi Drone As-Built (Surveyor):</strong> Melihat peta kontur & kemajuan volume tambang hasil survey.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Sertifikat COA Lab Surveyor Independen:</strong> Melihat hasil analisis kadar tongkang Sucofindo / Carsurin.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Jadwal Maintenance Workshop:</strong> Monitoring breakdown alat berat & jadwal overhaul berkala.
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
                      <strong className="text-slate-100">Payroll & Gaji SDM:</strong> Terestriksi penuh dari slip gaji, gaji pokok, & komponen insentif karyawan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">General Ledger & Kas/Bank Korporat:</strong> Terestriksi dari neraca keuangan & jurnal transaksi kas bank.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Pajak e-Faktur & PNBP Royalti:</strong> Pengelolaan sistem pajak & perhitungan royalti khusus Finance/Tax.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">SaaS License & System Core Architecture:</strong> Konfigurasi dasar sistem ERP khusus Administrator.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Operational Command Summary Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-base">Ringkasan Komando Operasional Tambang & Port Site Terkini</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Site Location: IUP Nikel Block Alpha & Beta | Real-time Stream
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Sektor Operasional Site</th>
                    <th className="p-3">Status Aktivitas & Fleet</th>
                    <th className="p-3">Pencapaian Tonase / Output</th>
                    <th className="p-3">Kualitas / Spesifikasi Kadar</th>
                    <th className="p-3">Status HSE & K3LH</th>
                    <th className="p-3">Ketersediaan BBM / Fuel</th>
                    <th className="p-3">Status Operasional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">Pit Alpha (Bench 210 & 225)</td>
                    <td className="p-3 text-emerald-400 font-bold">2 Excavator + 18 Dump Truck</td>
                    <td className="p-3 text-emerald-400 font-bold">14,030 MT OB & Ore / Shift</td>
                    <td className="p-3 text-amber-400 font-bold">Ni 1.83% | Fe 17.8%</td>
                    <td className="p-3 text-teal-400 font-bold">Zero Nearmiss / Green Zone</td>
                    <td className="p-3 text-slate-300">Fuel Tank Pit: 45,000 L</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        NORMAL OPERATIONAL
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">Crusher Station CRS-01 & EFO</td>
                    <td className="p-3 text-blue-400 font-bold">Hopper Feeder + Conveyor 500 TPH</td>
                    <td className="p-3 text-emerald-400 font-bold">3,850 MT Crusher Output</td>
                    <td className="p-3 text-amber-400 font-bold">Sizing &lt; 50mm Passed</td>
                    <td className="p-3 text-teal-400 font-bold">Dust Suppression Active</td>
                    <td className="p-3 text-slate-300">Genset Fuel: 12,000 L</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        CRUSHING ACTIVE
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">Jetty Port Wharf 02</td>
                    <td className="p-3 text-purple-400 font-bold">Barge Loading (TB Sinar 08)</td>
                    <td className="p-3 text-emerald-400 font-bold">7,500 WMT Loaded (3,200 WMT Left)</td>
                    <td className="p-3 text-amber-400 font-bold">Grade Ni 1.81% COA Certified</td>
                    <td className="p-3 text-teal-400 font-bold">Marine Safety Compliant</td>
                    <td className="p-3 text-slate-300">Tug Fuel: OK</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        BARGING IN PROGRESS
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN OPERATION MANAGER */}
      {activeTab === 'master_data_operation_manager' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-base">Master Data Register Operation Manager (Site Operations & Capacity Master)</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Database master sektor pit tambang, kapasitas jalan hauling, feeder stasiun crusher, ketersediaan tangki BBM site, & matriks otorisasi operasional.
                </p>
              </div>
              <button
                onClick={() => setShowDispatchModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Registrasi Sektor Site Baru</span>
              </button>
            </div>

            {/* TABEL 1: MASTER REGISTER SEKTOR PIT, HAUL ROAD & JETTY PORT */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <Grid className="w-4 h-4 text-emerald-400" />
                1. Master Register Sektor Pit Tambang, Jalur Hauling & Pelabuhan Jetty
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">ID Sektor / Site Unit</th>
                      <th className="p-3">Lokasi / Elevasi RL</th>
                      <th className="p-3">Target Kapasitas Bulanan</th>
                      <th className="p-3">Spesifikasi Material / Jalur</th>
                      <th className="p-3">Armada Alat Berat Ditugaskan</th>
                      <th className="p-3">Penanggung Jawab Field</th>
                      <th className="p-3">Status Sektor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">PIT-ALPHA-SECTOR-01</td>
                      <td className="p-3 font-bold text-slate-100">Pit Alpha (Bench 210-230)</td>
                      <td className="p-3 font-bold text-emerald-400">195,000 WMT (OB + Ore)</td>
                      <td className="p-3 text-amber-400 font-bold">Saprolite High Grade & OB</td>
                      <td className="p-3 text-slate-100 font-bold">Fleet Alpha-01 (18 DT & 2 Excavator)</td>
                      <td className="p-3 text-slate-300">Supt. Supriatna</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          OPERATIONAL ACTIVE
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">HAUL-MAIN-ROAD-01</td>
                      <td className="p-3 font-bold text-slate-100">Pit Alpha to Jetty (12.5 KM)</td>
                      <td className="p-3 font-bold text-emerald-400">15,000 MT / Hari Traffic</td>
                      <td className="p-3 text-blue-400 font-bold">Lebar Road 14m | Max Grade 8%</td>
                      <td className="p-3 text-slate-100 font-bold">2 Motor Grader + 2 Water Truck</td>
                      <td className="p-3 text-slate-300">Foreman Road Herman</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          OPERATIONAL ACTIVE
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">PORT-JETTY-WHARF-02</td>
                      <td className="p-3 font-bold text-slate-100">Morowali Coastal Jetty Wharf</td>
                      <td className="p-3 font-bold text-emerald-400">120,000 WMT Barging / Bbl</td>
                      <td className="p-3 text-emerald-400 font-bold">Conveyor Loading Rate 800 TPH</td>
                      <td className="p-3 text-slate-100 font-bold">2 Wheel Loader + 1 Jetty Crane</td>
                      <td className="p-3 text-slate-300">Port Capt. Budi</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          OPERATIONAL ACTIVE
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 2: MASTER REGISTER TANGKI BBM & CRUSHER STATIONS */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-400" />
                2. Master Register Tangki Stok BBM Site & Crusher Feeder Stations
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">ID Fasilitas / Tangki Site</th>
                      <th className="p-3">Lokasi Fasilitas</th>
                      <th className="p-3">Kapasitas Maksimal Storage</th>
                      <th className="p-3">Spesifikasi Unit / Material</th>
                      <th className="p-3">Throughput Rate / Dispenser</th>
                      <th className="p-3">Status Kontrol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">FUEL-TANK-MAIN-01</td>
                      <td className="p-3 text-slate-100">Central Basecamp & Workshop</td>
                      <td className="p-3 text-emerald-400 font-bold">200,000 Liter High Speed Diesel</td>
                      <td className="p-3 text-slate-300">B35 Biosolar Industri Standard</td>
                      <td className="p-3 text-slate-100 font-bold">2 Nozzle Dispenser High Flow (200 L/min)</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          STOCK OK (185K L)
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">CRS-STATION-PRIMARY-01</td>
                      <td className="p-3 text-slate-100">Stockpile EFO Central Station</td>
                      <td className="p-3 text-emerald-400 font-bold">500 Ton Per Hour (TPH) Crusher</td>
                      <td className="p-3 text-amber-400 font-bold">Primary Jaw Crusher & Vibrating Screen</td>
                      <td className="p-3 text-slate-100 font-bold">Conveyor Belt 1,200 mm Width</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          OPERATIONAL ACTIVE
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 3: DETAILED PERMISSION MATRIX TABLE OPERATION MANAGER */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                3. Matriks Otorisasi Modul & Operasi CRUD Sistem ERP untuk Akun Operation Manager
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Nama Modul ERP</th>
                      <th className="p-3">Fitur / Sub-Sistem</th>
                      <th className="p-3">Level Akses</th>
                      <th className="p-3">Flags (C / R / U / D)</th>
                      <th className="p-3">Catatan Otorisasi Site Operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Pit Mining Operations & Targets</td>
                      <td className="p-3 text-slate-300">Target OB/Ore Harian, Strip Ratio Target, Bench Execution</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Otoritas tertinggi pengawasan & jadwal penambangan pit site.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Fleet Dispatch & Hauling Management</td>
                      <td className="p-3 text-slate-300">Pengaturan Alokasi DT/Excavator, Shift Cycles, Maintenance Interlock</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Otoritas alokasi alat berat & rotasi giliran kerja driver/operator.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Stockpile Ore Blending & EFO</td>
                      <td className="p-3 text-slate-300">Blending Ratio Ni/Fe, Stockpile Dome Management, Sizing Spec</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Pengawasan penuh pencampuran kadar ore nikel sebelum muat.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Jetty Port & Shipping Barging</td>
                      <td className="p-3 text-slate-300">Jadwal Tongkang, Jetty Conveyor Flow, Draught Survey Verification</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Otoritas penuh pemuatan ore nikel ke tongkang pelanggan.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">HSE K3LH & Safety Operations</td>
                      <td className="p-3 text-slate-300">Safety Patrol, Inspeksi K3, Settlement Pond Water Discharge Quality</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Penanggung jawab operasional Zero Harm & standar lingkungan.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Model Cadangan Geostatistik JORC</td>
                      <td className="p-3 text-slate-300">Block Model Kriging, Estimasi Cadangan Terukur, & Core Logging</td>
                      <td className="p-3 text-amber-400 font-bold">READ ONLY</td>
                      <td className="p-3 text-amber-300 font-bold">_ / R / _ / _</td>
                      <td className="p-3 text-slate-400">Dua arah sinkronisasi dengan Tim Chief Geologist.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Payroll HR & General Ledger Finance</td>
                      <td className="p-3 text-slate-300">Gaji Pokok HR, Slip Gaji, Neraca Finance, & Tax PNBP Minerba</td>
                      <td className="p-3 text-rose-400 font-bold">RESTRICTED</td>
                      <td className="p-3 text-rose-300 font-bold">_ / _ / _ / _</td>
                      <td className="p-3 text-slate-400">Restriksi penuh dari area finansial & kompensasi SDM.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE: DASBOR AKUN PRODUCTION MANAGER */}
      {activeTab === 'dasbor_production_manager' && (
        <div className="space-y-6">
          {/* Top KPI Cards Production Manager */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Total Tonase Produksi Nikel (MTD)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  RKAB Compliant
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400 font-mono">148,500</span>
                <span className="text-slate-400 text-[11px]">WMT Ore Nikel</span>
              </div>
              <span className="text-emerald-400 text-[11px] block mt-1 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saprolite 82,100 WMT | Limonite 66,400 WMT (99% Target)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Kontrol Blending Kadar Ore (Lab)</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Grade Spec
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-400 font-mono">1.81%</span>
                <span className="text-slate-400 text-[11px]">Ni Saprolite</span>
              </div>
              <span className="text-slate-400 text-[11px] block mt-1">
                Limonite: Ni 1.32% | Fe 46.8% | Ratio SiO2/MgO: 1.82
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">Produktivitas Fleet & Dispatch</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Match Factor 1.05
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-100 font-mono">94.2%</span>
                <span className="text-slate-400 text-[11px]">Physical Availability</span>
              </div>
              <span className="text-blue-400 text-[11px] block mt-1 font-semibold">
                24 Dump Truck Aktif | Cycle Time: 18.4 Menit
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="text-slate-400 font-semibold">EFO Stockpile & Barging Sales</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  Shipping Active
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-teal-400 font-mono">32,400</span>
                <span className="text-slate-400 text-[11px]">WMT Ready Cargo</span>
              </div>
              <span className="text-teal-400 text-[11px] block mt-1 font-semibold">
                Tongkang Berlayar: 2 Vessel | Demurrage: 0 Hari
              </span>
            </div>
          </div>

          {/* MATRIKS WEWENANG & AKSES MODUL PRODUCTION MANAGER */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Pickaxe className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-base">Matriks Hak Akses & Fitur Akun Production Manager (Mining Operations)</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Kebijakan otorisasi sistem untuk peran <span className="text-emerald-400 font-bold">Production Manager, Mining Superintendent & Chief Dispatcher</span>.
                </p>
              </div>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Role: Production Manager (Operations Category)
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
                      <strong className="text-slate-100">Target Produksi Nikel & RKAB Schedule:</strong> Pembuatan, pengeditan, & approval target tonase OB/Ore harian, bulanan, & tahunan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Fleet Allocation & Shift Dispatching:</strong> Pengaturan alokasi excavator, dump truck, loader, & rotasi giliran kerja driver/operator.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Blending Stockpile EFO & Dome:</strong> Perencanaan percampuran kadar (Ni % & Fe %) antara stockpile EFO & Dome sebelum muat tongkang.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Loading Point & Crusher Movement:</strong> Monitoring produktivitas loading point, feeder crusher station, & kecepatan conveyor belt.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Jetty & Barging Operations:</strong> Pengawasan alur barging tongkang, komitmen tonase pengiriman smelter, & draft survey.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Shift & Daily Production Reports:</strong> Penyusunan & otorisasi Laporan Harian Penambangan (LHP) sesuai standar Kepmen ESDM 1827.
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
                      <strong className="text-slate-100">Peta GIS Topografi Drone (Surveyor):</strong> Melihat kontur As-Built pit & kemajuan volume tambang hasil survey drone.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Drill Hole & Assay Lab QA/QC:</strong> Melihat data kadar Ni/Fe per titik bor geologi untuk koordinasi penambangan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Asset Maintenance & Workshop Downtime:</strong> Monitoring status breakdown alat berat, ketersediaan fisik (PA/MA), & jadwal PM.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Sertifikat COA Surveyor Independen:</strong> Melihat verifikasi kadar akhir ore tongkang dari Sucofindo / Carsurin.
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
                      <strong className="text-slate-100">Payroll & Gaji SDM:</strong> Terestriksi dari komponen gaji, slip gaji, & bonus insentif karyawan.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Financial General Ledger & Bank:</strong> Restriksi penuh dari laporan neraca, kas/bank, & jurnal keuangan umum.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">Tax e-Faktur & Royalti PNBP Minerba:</strong> Pengelolaan sistem pajak & perhitungan PNBP royalti khusus divisi Finance/Tax.
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-100">SaaS License & System Core Code:</strong> Konfigurasi arsitektur sistem ERP & lisensi khusus Administrator.
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Active Production Fronts Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Grid className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-base">Status Front Penambangan & Alokasi Fleet Aktif</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Shift Status: SHIFT 1 (Day) - Live Monitoring
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Front Penambangan</th>
                    <th className="p-3">Target Material</th>
                    <th className="p-3">Alokasi Excavator & DT</th>
                    <th className="p-3">Pencapaian Tonase / Shift</th>
                    <th className="p-3">Kadar Ni / Fe Rata-Rata</th>
                    <th className="p-3">Tujuan Dumping (Hauling)</th>
                    <th className="p-3">Status Operasional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      Pit Alpha Front 1 (Bench 210)
                    </td>
                    <td className="p-3 text-emerald-400 font-bold">Ore Saprolite High Grade</td>
                    <td className="p-3 font-bold text-slate-100">EX-200-01 + 8 DT Scania</td>
                    <td className="p-3 text-emerald-400 font-bold">4,840 MT / 5,000 MT</td>
                    <td className="p-3 text-amber-400 font-bold">Ni 1.83% | Fe 17.8%</td>
                    <td className="p-3 text-slate-300">Stockpile EFO Block A</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ACTIVE DIGGING
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      Pit Alpha Front 2 (Bench 225)
                    </td>
                    <td className="p-3 text-amber-400 font-bold">Overburden (OB) Stripping</td>
                    <td className="p-3 font-bold text-slate-100">EX-300-02 + 10 DT Volvo</td>
                    <td className="p-3 text-blue-400 font-bold">9,190 BCM / 9,000 BCM</td>
                    <td className="p-3 text-slate-500">Waste Material</td>
                    <td className="p-3 text-slate-300">Waste Dump Area North</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ACTIVE HAULING
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-100">
                      Pit Beta North (Bench 160)
                    </td>
                    <td className="p-3 text-blue-400 font-bold">Limonite Ore (HPAL Spec)</td>
                    <td className="p-3 font-bold text-slate-100">EX-200-03 + 6 DT Mercedes</td>
                    <td className="p-3 text-emerald-400 font-bold">3,200 MT / 3,000 MT</td>
                    <td className="p-3 text-blue-400 font-bold">Ni 1.32% | Fe 46.8%</td>
                    <td className="p-3 text-slate-300">Stockpile Dome 02</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ACTIVE DIGGING
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE: MASTER DATA AKUN PRODUCTION MANAGER */}
      {activeTab === 'master_data_production_manager' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-base">Master Data Register Production Manager (Target RKAB & Loading Points)</h3>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Database master target produksi harian RKAB per pit, master register loading point front, stasiun crusher, & alokasi armada penambangan.
                </p>
              </div>
              <button
                onClick={() => setShowDispatchModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Registrasi Target RKAB Baru</span>
              </button>
            </div>

            {/* TABEL 1: MASTER TARGET PRODUKSI RKAB PER PIT */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <Grid className="w-4 h-4 text-emerald-400" />
                1. Master Register Target Produksi RKAB per Pit & Bench
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Pit Block / Bench ID</th>
                      <th className="p-3">Target OB (BCM/Bulan)</th>
                      <th className="p-3">Target Ore (WMT/Bulan)</th>
                      <th className="p-3">Target Strip Ratio (SR)</th>
                      <th className="p-3">Spesifikasi Kadar (Ni % / Fe %)</th>
                      <th className="p-3">Alokasi Fleet Excavator</th>
                      <th className="p-3">Status Target</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">Pit Alpha Central (Bench 210)</td>
                      <td className="p-3 font-bold text-slate-100">120,000 BCM</td>
                      <td className="p-3 font-bold text-emerald-400">75,000 WMT</td>
                      <td className="p-3 text-slate-300">1.60 BCM/WMT</td>
                      <td className="p-3 text-amber-400 font-bold">Ni &gt;= 1.80% | Fe &lt; 20%</td>
                      <td className="p-3 font-bold text-slate-100">Fleet Alpha-01 (EX-200-01)</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          APPROVED RKAB
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">Pit Beta North (Bench 160)</td>
                      <td className="p-3 font-bold text-slate-100">90,000 BCM</td>
                      <td className="p-3 font-bold text-emerald-400">55,000 WMT</td>
                      <td className="p-3 text-slate-300">1.63 BCM/WMT</td>
                      <td className="p-3 text-blue-400 font-bold">Ni 1.30% - 1.40% | Fe &gt;= 45%</td>
                      <td className="p-3 font-bold text-slate-100">Fleet Beta-03 (EX-300-02)</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          APPROVED RKAB
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-emerald-400">Pit Gamma South (Bench 240)</td>
                      <td className="p-3 font-bold text-slate-100">60,000 BCM</td>
                      <td className="p-3 font-bold text-emerald-400">30,000 WMT</td>
                      <td className="p-3 text-slate-300">2.00 BCM/WMT</td>
                      <td className="p-3 text-amber-400 font-bold">Ni &gt;= 1.75% | Fe &lt; 22%</td>
                      <td className="p-3 font-bold text-slate-100">Fleet Gamma-02 (EX-200-03)</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          PROPOSED RKAB
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 2: MASTER REGISTER LOADING POINTS & CRUSHER STATIONS */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <Ruler className="w-4 h-4 text-amber-400" />
                2. Master Register Loading Points, Crusher Stations & Stockpile Blocks
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">ID Loading Point / Station</th>
                      <th className="p-3">Lokasi Pit Front</th>
                      <th className="p-3">Unit Excavator Loading</th>
                      <th className="p-3">Kategori Material</th>
                      <th className="p-3">Tujuan Feeder Crusher / EFO</th>
                      <th className="p-3">Kapasitas Feeder (TPH)</th>
                      <th className="p-3">Status Stasiun</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">LP-ALPHA-01</td>
                      <td className="p-3 text-slate-100">Pit Alpha Bench 210</td>
                      <td className="p-3 text-slate-100">EX-200-01 (Komatsu)</td>
                      <td className="p-3 text-emerald-400 font-bold">Saprolite High Grade</td>
                      <td className="p-3 font-bold text-slate-100">Crusher Station CRS-01 / EFO-01</td>
                      <td className="p-3 text-emerald-400 font-bold">500 TPH</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          OPERATIONAL ACTIVE
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">LP-BETA-02</td>
                      <td className="p-3 text-slate-100">Pit Beta Bench 160</td>
                      <td className="p-3 text-slate-100">EX-300-02 (Hitachi)</td>
                      <td className="p-3 text-blue-400 font-bold">Limonite HPAL Ore</td>
                      <td className="p-3 font-bold text-slate-100">Stockpile Dome 02</td>
                      <td className="p-3 text-blue-400 font-bold">400 TPH</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          OPERATIONAL ACTIVE
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-amber-400">CRS-PRIMARY-01</td>
                      <td className="p-3 text-slate-100">Port Crusher Station Area</td>
                      <td className="p-3 text-slate-100">Hopper Feeder Loader-01</td>
                      <td className="p-3 text-amber-400 font-bold">Ore Sizing & Crushing</td>
                      <td className="p-3 font-bold text-slate-100">Stockpile EFO Export Dome</td>
                      <td className="p-3 text-amber-400 font-bold">650 TPH</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          OPERATIONAL ACTIVE
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABEL 3: DETAILED PERMISSION MATRIX TABLE PRODUCTION MANAGER */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h4 className="font-bold text-slate-200 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                3. Matriks Otorisasi Modul & Operasi CRUD Sistem ERP untuk Akun Production Manager
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Nama Modul ERP</th>
                      <th className="p-3">Fitur / Sub-Sistem</th>
                      <th className="p-3">Level Akses</th>
                      <th className="p-3">Flags (C / R / U / D)</th>
                      <th className="p-3">Catatan Otorisasi Operasional</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300 font-mono">
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Target Produksi Nikel & RKAB</td>
                      <td className="p-3 text-slate-300">Target Tonase OB/Ore Harian & Bulanan, SR Target, & Schedule</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Otoritas penuh perencanaan & persetujuan target produksi.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Alokasi Fleet & Shift Dispatch</td>
                      <td className="p-3 text-slate-300">Dispatching Dump Truck, Excavator Assignment, & Driver Shift</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Otoritas penuh pengaturan alat berat & rotasi shift tambang.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Ore Blending & Stockpile EFO</td>
                      <td className="p-3 text-slate-300">Kalkulasi Ratio Blending, Blending Dome, & Quality Control Fe/Ni</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Manajemen pencampuran kadar ore sebelum pemuatan tongkang.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Crusher Station & Conveyor</td>
                      <td className="p-3 text-slate-300">Monitoring Feeder TPH, Crusher Sizing, & Material Flow</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Otoritas penuh kelancaran operasional stasiun crusher.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Jetty Port & Barging Shipments</td>
                      <td className="p-3 text-slate-300">Jadwal Muat Tongkang, Conveyor Jetty, & Shipping Commitment</td>
                      <td className="p-3 text-emerald-400 font-bold">FULL ACCESS</td>
                      <td className="p-3 text-emerald-300 font-bold">C / R / U / D</td>
                      <td className="p-3 text-slate-400">Pengawasan pengiriman ore nikel ke pelanggan smelter.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Peta Topografi Drone & GIS Surface</td>
                      <td className="p-3 text-slate-300">Peta As-Built Pit, Volume Progress Topo, & Surface Boundary</td>
                      <td className="p-3 text-amber-400 font-bold">READ ONLY</td>
                      <td className="p-3 text-amber-300 font-bold">_ / R / _ / _</td>
                      <td className="p-3 text-slate-400">Sinkronisasi data topo dari tim Mine Surveyor.</td>
                    </tr>
                    <tr className="hover:bg-slate-800/50">
                      <td className="p-3 font-bold text-slate-100">Payroll HR & Finance Ledger</td>
                      <td className="p-3 text-slate-300">Komponen Gaji Karyawan, Jurnal Kas/Bank & PNBP Tax Royalti</td>
                      <td className="p-3 text-rose-400 font-bold">RESTRICTED</td>
                      <td className="p-3 text-rose-300 font-bold">_ / _ / _ / _</td>
                      <td className="p-3 text-slate-400">Restriksi penuh dari finansial & penggajian SDM.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 1: PRODUCTION & TARGET VS ACTUAL */}
      {activeTab === 'production' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Target Production Overburden (OB) Shift</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-100 font-mono">9,000 BCM</span>
                <span className="text-emerald-400 font-bold">102% Achieved</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Realisasi Aktual: 9,190 BCM</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Target Production Ore Getting (Nikel)</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-emerald-400 font-mono">4,800 MT</span>
                <span className="text-emerald-400 font-bold">100.8% Achieved</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Realisasi Aktual: 4,840 MT</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Stripping Ratio (SR) Realtime</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-amber-400 font-mono">1.90 : 1</span>
                <span className="text-slate-400 font-bold">Optimal Pit</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Rencana RKAB: 2.10 : 1</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Rata-rata Kadar Nikel Ore Production</span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-slate-100 font-mono">1.83% Ni</span>
                <span className="text-emerald-400 font-bold">High Grade</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Uji XRF Lab Xpress Site</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Grafik Produksi Jam-jaman: Target vs Actual (MT Ore & BCM OB)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={hourlyProductionTargetVsActual}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="targetMT" name="Target Ore (MT)" fill="#334155" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actualMT" name="Aktual Ore (MT)" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="actualBCM" name="Aktual OB (BCM)" stroke="#F59E0B" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 2: HAULING, LOADING & DUMPING */}
      {activeTab === 'hauling_loading' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Pickaxe className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-slate-200">Loading Points (Excavators)</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pit Alpha Bench +120:</span>
                  <span className="font-bold text-emerald-400 font-mono">EX-201 (PC2000) Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pit Beta Bench +85:</span>
                  <span className="font-bold text-emerald-400 font-mono">EX-104 (PC1250) Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stockpile Rehandling:</span>
                  <span className="font-bold text-amber-400 font-mono">WL-02 (WA500) Active</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Truck className="w-4 h-4 text-blue-400" />
                <span className="font-bold text-slate-200">Hauling Fleet Route Monitoring</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rute Pit Alpha -&gt; Crusher:</span>
                  <span className="font-bold text-slate-100 font-mono">14 Unit Dump Truck</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rute Pit Beta -&gt; ETO:</span>
                  <span className="font-bold text-slate-100 font-mono">10 Unit Dump Truck</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Kecepatan Rata-Rata:</span>
                  <span className="font-bold text-emerald-400 font-mono">28.4 km/jam</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-slate-200">Dumping Points Status</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Crusher Station Primary:</span>
                  <span className="font-bold text-emerald-400 font-mono">OPEN (No Queue)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Stockpile ETO Alpha:</span>
                  <span className="font-bold text-emerald-400 font-mono">OPEN (Dozer Ready)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Waste Dump West:</span>
                  <span className="font-bold text-emerald-400 font-mono">OPEN (Compactor Active)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cycle Time Breakdown */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Rincian Cycle Time Pengangkutan Hauling Dump Truck (Total: 24.5 Menit)
            </h3>

            <div className="space-y-3">
              {cycleTimeBreakdown.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 font-medium">{item.name}</span>
                    <span className="text-emerald-400 font-bold font-mono">{item.durationMin} Menit ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all"
                      style={{ width: `${item.percentage * 2.5}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 3: CRUSHER & MATERIAL TRACKING */}
      {activeTab === 'crusher_movement' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Status & Throughput Station Crusher Ore Nikel
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {crusherPerformance.map((c, i) => (
                <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{c.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      c.status === 'OPERATIONAL' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-slate-400">Throughput:</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">{c.currentTPH} / {c.feedCapacityTPH} TPH</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Ukuran Produk Out: {c.sizeMm}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Material Tracking & Ore Movement Realtime GPS Telemetri
              </h3>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari Trip ID / DT Unit..."
                  value={searchTripTerm}
                  onChange={(e) => setSearchTripTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Trip ID</th>
                    <th className="py-2.5 px-3">Unit DT</th>
                    <th className="py-2.5 px-3">Material & Grade</th>
                    <th className="py-2.5 px-3">Asal (Origin)</th>
                    <th className="py-2.5 px-3">Tujuan (Destination)</th>
                    <th className="py-2.5 px-3">Tonnage</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filteredTrips.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200">{t.id}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{t.dtUnit}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{t.material}</td>
                      <td className="py-3 px-3 text-slate-400 font-sans">{t.origin}</td>
                      <td className="py-3 px-3 text-slate-400 font-sans">{t.destination}</td>
                      <td className="py-3 px-3 font-bold text-slate-100">{t.tonnageMT} MT</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.status === 'DUMPED' ? 'bg-emerald-500/20 text-emerald-400' :
                          t.status === 'IN_TRANSIT' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {t.status}
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

      {/* SUB-MODULE 4: STOCKPILE & ORE BLENDING */}
      {activeTab === 'stockpile_blending' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {stockpiles.map((st) => (
              <div key={st.id} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-100">{st.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    {st.type}
                  </span>
                </div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">
                  {(st.currentTonnageMT ?? 0).toLocaleString('id-ID')} MT
                </div>
                <div className="space-y-1 text-[11px] text-slate-400">
                  <div className="flex justify-between">
                    <span>Kadar Nikel (Ni):</span>
                    <strong className="text-slate-200 font-mono">{st.avgGradeNi}% Ni</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Kadar Besi (Fe):</span>
                    <strong className="text-slate-200 font-mono">{st.avgGradeFe}% Fe</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Silica-Magnesia (SM):</span>
                    <strong className="text-slate-200 font-mono">{st.smRatio}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-MODULE 5: JETTY, PORT & SHIPPING */}
      {activeTab === 'jetty_port' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {barges.map((bg) => (
              <div key={bg.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div>
                    <span className="font-bold text-slate-100 text-sm block">{bg.bargeName}</span>
                    <span className="text-slate-400 text-[11px]">Tujuan: {bg.destinationSmelter}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                    bg.status === 'LOADING' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    bg.status === 'SAILING' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {bg.status}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-slate-400">Tonase Pemuatan:</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">
                    {(bg.loadedTonnageMT ?? 0).toLocaleString('id-ID')} / {(bg.capacityMT ?? 0).toLocaleString('id-ID')} MT
                  </span>
                </div>

                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${Math.min(100, (bg.loadedTonnageMT / bg.capacityMT) * 100)}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Kecepatan Conveyor: <strong className="text-slate-200 font-mono">1,250 MT/jam</strong></span>
                  <span>Draft Kedalaman Port: <strong className="text-emerald-400 font-mono">8.5 Meter</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-MODULE 6: PIT & ROAD MONITORING */}
      {activeTab === 'pit_road' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Kondisi Keamanan Jalur Haul Road & Dust Suppression
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {haulRoadMonitoringData.map((h, i) => (
                <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{h.section}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      h.status === 'GOOD' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {h.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400">Kecepatan DT: <strong className="text-emerald-400 font-mono">{h.avgSpeedKmh} km/h</strong> (Limit: {h.speedLimitKmh})</span>
                    <span className="text-slate-400">Kadar Debu: <strong className="text-amber-400 font-mono">{h.dustLevel}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODULE 7: SHIFT & DAILY REPORT */}
      {activeTab === 'shift_report' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-100 text-base">Laporan Harian Operasional Tambang & Serah Terima Shift</h3>
              <p className="text-slate-400 text-[11px]">Format Standar Kepmen ESDM 1827 K/2018</p>
            </div>
            <button className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Ekspor PDF Daily Report</span>
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <span className="font-bold text-emerald-400 block">Catatan Handover Supervisor Shift 1 -&gt; Shift 2:</span>
            <div className="space-y-1.5 text-slate-300">
              {shiftNotes.map((note, index) => (
                <p key={index} className="leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800">{note}</p>
              ))}
            </div>

            <form onSubmit={handleAddShiftNote} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Tambah catatan operasional shift..."
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-1 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Catatan</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MODULE 8: UTILIZATION & DOWNTIME */}
      {activeTab === 'productivity_downtime' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Physical Availability (PA)</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">92.4%</span>
              <span className="text-slate-500 block mt-1">Batas Kategori Baik: &gt;90%</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Use of Availability (UA)</span>
              <span className="text-3xl font-extrabold text-blue-400 font-mono">86.1%</span>
              <span className="text-slate-500 block mt-1">Efisiensi Jam Kerja Unit</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Overall Equipment Effectiveness (OEE)</span>
              <span className="text-3xl font-extrabold text-amber-400 font-mono">79.5%</span>
              <span className="text-slate-500 block mt-1">Produktivitas Alat Berat</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Analisis Jam Downtime & Delay Operasional Shift
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Penyebab Delay / Downtime</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3">Frekuensi Occur</th>
                    <th className="py-2.5 px-3">Total Jam Downtime</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {downtimeDelayData.map((d, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200 font-sans">{d.reason}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                          {d.category}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300">{d.count} kali</td>
                      <td className="py-3 px-3 text-red-400 font-bold">{d.hours} Jam</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Dispatch AI Modal */}
      {showDispatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-emerald-400 border-b border-slate-800 pb-3">
              <Sparkles className="w-6 h-6 animate-pulse" />
              <div>
                <h3 className="font-bold text-slate-100 text-lg">AI Fleet Dispatch Optimizer</h3>
                <p className="text-slate-400 text-xs">Simulasi Alokasi Truk Hauling & Excavator Matched Pair</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 block">Rekomendasi AI:</span>
                <p>• Pindahkan 3 DT dari Pit Beta ke Pit Alpha untuk mengeliminasi antrean Excavator EX-201 (PC2000).</p>
                <p>• Buka jalur bypass KM 06 untuk menghindari pengerjaan perbaikan jalan di KM 05.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Potensi Efisiensi Cycle Time</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">-1.8 Menit</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">Peningkatan Throughput</span>
                  <span className="text-xl font-bold text-amber-400 font-mono">+380 MT/Shift</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowDispatchModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 text-xs"
              >
                Batal
              </button>
              <button
                onClick={handleRunDispatchAI}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Terapkan Dispatch AI</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
