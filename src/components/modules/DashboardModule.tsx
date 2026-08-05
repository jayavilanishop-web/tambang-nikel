import React, { useState, useEffect } from 'react';
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
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { 
  Pickaxe, 
  Truck, 
  Layers, 
  Ship, 
  Coins, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Trees,
  Droplets,
  AlertTriangle,
  Clock,
  MapPin,
  Compass,
  Zap,
  Gauge,
  Flame,
  FileCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
  DollarSign,
  BarChart3,
  Globe,
  Radio,
  RefreshCw,
  Award,
  Download,
  Play,
  Pause,
  Filter,
  Check,
  Scale,
  FileText
} from 'lucide-react';
import { MineSite, OreStockpile, HeavyEquipment, BargeShipment, HPMPriceBenchmark, Language } from '../../types';
import { formatIDR, formatUSD } from '../../utils/hpmCalculator';

interface DashboardModuleProps {
  sites: MineSite[];
  stockpiles: OreStockpile[];
  equipment: HeavyEquipment[];
  barges: BargeShipment[];
  hpm: HPMPriceBenchmark;
  language: Language;
  onOpenAIDrawer: () => void;
  onNavigateModule: (mod: any) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  sites,
  stockpiles,
  equipment,
  barges,
  hpm,
  language,
  onOpenAIDrawer,
  onNavigateModule
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'executive' 
    | 'bi_analytics'
    | 'production_analytics'
    | 'fuel_analytics'
    | 'cost_analytics'
    | 'profitability'
    | 'forecast_ai'
    | 'operational' 
    | 'financial' 
    | 'production' 
    | 'safety' 
    | 'environment' 
    | 'equipment' 
    | 'ai' 
    | 'realtime_kpi' 
    | 'gis_map'
  >('executive');

  const [selectedSiteFilter, setSelectedSiteFilter] = useState<string>('ALL');
  const [shiftFilter, setShiftFilter] = useState<'ALL' | 'SHIFT_1' | 'SHIFT_2'>('ALL');
  const [periodFilter, setPeriodFilter] = useState<'TODAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'YTD'>('TODAY');

  // Real-time live simulation stream state
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [autoRefreshIntervalSec, setAutoRefreshIntervalSec] = useState<number>(3);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');
  const [tickCounter, setTickCounter] = useState<number>(0);

  // Live dynamic telemetry state
  const [liveMetrics, setLiveMetrics] = useState({
    hourlyObBCM: 14850,
    hourlyOreMT: 8420,
    jettyConveyorTph: 1250,
    averageNiGrade: 1.84,
    fuelConsumptionLph: 42.5,
    activeEquipmentCount: 38,
    settlingPondPh: 7.2
  });

  // Export notification feedback
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Live simulation tick timer
  useEffect(() => {
    setLastUpdatedTime(new Date().toLocaleTimeString('id-ID'));

    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setTickCounter(prev => prev + 1);
      setLastUpdatedTime(new Date().toLocaleTimeString('id-ID'));

      // Micro fluctuations to simulate real IoT sensors
      setLiveMetrics(prev => ({
        hourlyObBCM: Math.round(prev.hourlyObBCM + (Math.random() * 40 - 20)),
        hourlyOreMT: Math.round(prev.hourlyOreMT + (Math.random() * 30 - 15)),
        jettyConveyorTph: Math.min(1500, Math.max(900, Math.round(prev.jettyConveyorTph + (Math.random() * 20 - 10)))),
        averageNiGrade: Number((Math.min(1.95, Math.max(1.75, prev.averageNiGrade + (Math.random() * 0.02 - 0.01)))).toFixed(2)),
        fuelConsumptionLph: Number((Math.min(50, Math.max(38, prev.fuelConsumptionLph + (Math.random() * 0.4 - 0.2)))).toFixed(1)),
        activeEquipmentCount: Math.min(equipment.length, Math.max(30, Math.round(prev.activeEquipmentCount + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0)))),
        settlingPondPh: Number((Math.min(7.8, Math.max(6.8, prev.settlingPondPh + (Math.random() * 0.04 - 0.02)))).toFixed(1))
      }));
    }, autoRefreshIntervalSec * 1000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, autoRefreshIntervalSec, equipment.length]);

  const handleManualRefresh = () => {
    setLastUpdatedTime(new Date().toLocaleTimeString('id-ID'));
    setLiveMetrics(prev => ({
      ...prev,
      hourlyObBCM: Math.round(14850 + (Math.random() * 200 - 100)),
      hourlyOreMT: Math.round(8420 + (Math.random() * 150 - 75))
    }));
  };

  const triggerExport = (type: 'PDF' | 'EXCEL') => {
    setExportNotice(`Laporan Dasbor Analitik Real-Time (${type}) berhasil disiapkan & diunduh!`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  // Datasets
  const rkabProductionData = [
    { month: 'Jan', targetMT: 250000, actualMT: 242000, saproliteNi: 1.81, costPerTon: 28.5 },
    { month: 'Feb', targetMT: 250000, actualMT: 248000, saproliteNi: 1.83, costPerTon: 27.8 },
    { month: 'Mar', targetMT: 250000, actualMT: 255000, saproliteNi: 1.80, costPerTon: 27.2 },
    { month: 'Apr', targetMT: 250000, actualMT: 238000, saproliteNi: 1.79, costPerTon: 29.1 },
    { month: 'Mei', targetMT: 250000, actualMT: 261000, saproliteNi: 1.84, costPerTon: 26.9 },
    { month: 'Jun', targetMT: 250000, actualMT: 265000, saproliteNi: 1.85, costPerTon: 26.5 },
    { month: 'Jul', targetMT: 250000, actualMT: 258000, saproliteNi: 1.82, costPerTon: 27.0 },
    { month: 'Agu (Est)', targetMT: 250000, actualMT: 262000, saproliteNi: 1.84, costPerTon: 26.8 }
  ];

  const gradeDistributionData = [
    { name: 'Saprolite High Grade (>=1.8% Ni)', value: 45, color: '#10B981' },
    { name: 'Saprolite Mid Grade (1.5-1.79% Ni)', value: 30, color: '#F59E0B' },
    { name: 'Limonite HPAL Feed (<1.5% Ni)', value: 25, color: '#3B82F6' }
  ];

  const hpmTrendData = [
    { period: 'Jan 26', hma: 15800, saproliteUSD: 50.56, royaltyRate: 10 },
    { period: 'Mar 26', hma: 16100, saproliteUSD: 51.52, royaltyRate: 10 },
    { period: 'Mei 26', hma: 16250, saproliteUSD: 52.00, royaltyRate: 10 },
    { period: 'Jul 26', hma: 16400, saproliteUSD: 52.48, royaltyRate: 10 },
    { period: 'Agu 26', hma: 16450, saproliteUSD: 52.64, royaltyRate: 10 }
  ];

  const radarKPIPerformance = [
    { subject: 'Produksi', A: 96, fullMark: 100 },
    { subject: 'Keselamatan HSE', A: 99, fullMark: 100 },
    { subject: 'Efisiensi BBM', A: 88, fullMark: 100 },
    { subject: 'Kadar Ni Grade', A: 94, fullMark: 100 },
    { subject: 'OEE Equipment', A: 91, fullMark: 100 },
    { subject: 'Revegetasi ESG', A: 92, fullMark: 100 }
  ];

  const cycleTimeHourly = [
    { hour: '07:00', avgCycleMin: 22, dtSpeedKmh: 32, congestionLevel: 'LOW' },
    { hour: '09:00', avgCycleMin: 24, dtSpeedKmh: 30, congestionLevel: 'LOW' },
    { hour: '11:00', avgCycleMin: 28, dtSpeedKmh: 26, congestionLevel: 'MEDIUM' },
    { hour: '13:00', avgCycleMin: 25, dtSpeedKmh: 29, congestionLevel: 'LOW' },
    { hour: '15:00', avgCycleMin: 29, dtSpeedKmh: 24, congestionLevel: 'HIGH' },
    { hour: '17:00', avgCycleMin: 23, dtSpeedKmh: 31, congestionLevel: 'LOW' }
  ];

  const environmentPondMetrics = [
    { pond: 'Settling Pond Pit Alpha', ph: liveMetrics.settlingPondPh, ntu: 18, status: 'NORMAL' },
    { pond: 'Settling Pond Pit Beta', ph: 6.9, ntu: 24, status: 'NORMAL' },
    { pond: 'Settling Pond EFO Stockpile', ph: 7.4, ntu: 15, status: 'NORMAL' },
    { pond: 'Settling Pond Jetty Port', ph: 7.1, ntu: 32, status: 'WARNING' }
  ];

  const totalStockpileTonnage = stockpiles.reduce((acc, s) => acc + s.currentTonnageMT, 0);
  const totalBargeTonnageLoaded = barges.reduce((acc, b) => acc + b.loadedTonnageMT, 0);
  const operationalFleetCount = equipment.filter(e => e.status === 'OPERATIONAL').length;

  return (
    <div className="space-y-6">
      
      {/* Export Notification Popover */}
      {exportNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Top Banner & Live Control Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl space-y-4">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isLiveStreaming ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                {isLiveStreaming ? 'Dasbor Analitik Stream Real-Time Active' : 'Real-Time Stream Paused'}
              </span>
              <span className="text-slate-400 text-xs">• Site Morowali & Halmahera Tbk</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              {language === 'id' ? 'NickelSmart Dasbor Analitik & Pusat Kendali Real-Time' : 'NickelSmart Real-Time Analytics & Control Hub'}
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Pemantauan telemetry live IoT, tren produksi ore, fluktuasi HPM, efisiensi BBM B35, status tongkang jetty, hingga peta GIS lokasi pit secara real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Live Stream Toggle */}
            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isLiveStreaming 
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isLiveStreaming ? 'Pause Streaming' : 'Start Live Stream'}</span>
            </button>

            {/* Manual Refresh */}
            <button
              onClick={handleManualRefresh}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500 transition-all"
              title="Refresh Data Sekarang"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Export Buttons */}
            <button
              onClick={() => triggerExport('PDF')}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export PDF</span>
            </button>

            <button
              onClick={onOpenAIDrawer}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Analisis AI NickelSmart</span>
            </button>
          </div>
        </div>

        {/* Real-time Ticker & Global Filters */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-slate-400">Update Terakhir:</span>
              <strong className="text-emerald-400 font-bold">{lastUpdatedTime}</strong>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-[11px]">
              <span className="text-slate-400">Interval Stream:</span>
              <select
                value={autoRefreshIntervalSec}
                onChange={(e) => setAutoRefreshIntervalSec(Number(e.target.value))}
                className="bg-transparent text-indigo-300 font-bold focus:outline-none"
              >
                <option value={1} className="bg-slate-900">1 Detik</option>
                <option value={3} className="bg-slate-900">3 Detik</option>
                <option value={5} className="bg-slate-900">5 Detik</option>
                <option value={10} className="bg-slate-900">10 Detik</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            {/* Filter Site */}
            <select
              value={selectedSiteFilter}
              onChange={(e) => setSelectedSiteFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-bold focus:border-indigo-500"
            >
              <option value="ALL">Semua Site (Morowali + Halmahera)</option>
              <option value="MOROWALI">Site Morowali Bahodopi</option>
              <option value="HALMAHERA">Site Weda Bay Halmahera</option>
            </select>

            {/* Filter Shift */}
            <select
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-bold focus:border-indigo-500"
            >
              <option value="ALL">Semua Shift (24 Jam)</option>
              <option value="SHIFT_1">Shift 1 (07:00 - 19:00)</option>
              <option value="SHIFT_2">Shift 2 (19:00 - 07:00)</option>
            </select>

            {/* Filter Period */}
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-bold focus:border-indigo-500"
            >
              <option value="TODAY">Hari Ini (Live)</option>
              <option value="THIS_WEEK">Minggu Ini</option>
              <option value="THIS_MONTH">Bulan Ini</option>
              <option value="YTD">Year To Date (YTD)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Dynamic Streaming KPI Bar across top */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Stripping OB Rate</span>
          <strong className="text-lg font-bold text-slate-100 font-mono">{(liveMetrics.hourlyObBCM ?? 0).toLocaleString('id-ID')}</strong>
          <span className="text-[10px] text-emerald-400 block font-mono">BCM / Shift</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Ore Production Rate</span>
          <strong className="text-lg font-bold text-emerald-400 font-mono">{(liveMetrics.hourlyOreMT ?? 0).toLocaleString('id-ID')}</strong>
          <span className="text-[10px] text-slate-400 block font-mono">WMT / Shift</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Jetty Conveyor Rate</span>
          <strong className="text-lg font-bold text-amber-300 font-mono">{liveMetrics.jettyConveyorTph}</strong>
          <span className="text-[10px] text-slate-400 block font-mono">MT / Hour</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Average Ni Grade</span>
          <strong className="text-lg font-bold text-indigo-300 font-mono">{liveMetrics.averageNiGrade}% Ni</strong>
          <span className="text-[10px] text-emerald-400 block font-mono">High Grade Blend</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Konsumsi BBM B35</span>
          <strong className="text-lg font-bold text-sky-400 font-mono">{liveMetrics.fuelConsumptionLph}</strong>
          <span className="text-[10px] text-slate-400 block font-mono">Liters / Hour</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Active Equipment</span>
          <strong className="text-lg font-bold text-purple-300 font-mono">{liveMetrics.activeEquipmentCount} / {equipment.length}</strong>
          <span className="text-[10px] text-emerald-400 block font-mono">92.8% Availability</span>
        </div>
      </div>

      {/* Navigation Sub-Dashboard Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'executive', label: 'Executive Analytics', icon: BarChart3 },
          { id: 'bi_analytics', label: 'Business Intelligence (BI)', icon: Activity },
          { id: 'production_analytics', label: 'Production Analytics', icon: Pickaxe },
          { id: 'fuel_analytics', label: 'Fuel Analytics', icon: Flame },
          { id: 'cost_analytics', label: 'Cost Analytics', icon: DollarSign },
          { id: 'profitability', label: 'Profitability', icon: TrendingUp },
          { id: 'forecast_ai', label: 'Forecast & AI Insight', icon: Sparkles },
          { id: 'realtime_kpi', label: 'Realtime Live KPI Stream', icon: Radio },
          { id: 'operational', label: 'Operational Pit & Hauling', icon: Compass },
          { id: 'financial', label: 'Financial & HPM Benchmark', icon: Coins },
          { id: 'production', label: 'Production & Ore Blending', icon: Layers },
          { id: 'safety', label: 'Safety HSE', icon: ShieldCheck },
          { id: 'environment', label: 'Environment ESG', icon: Trees },
          { id: 'equipment', label: 'Equipment Telemetry', icon: Truck },
          { id: 'ai', label: 'AI MineGPT Insights', icon: Zap },
          { id: 'gis_map', label: 'GIS Pit Live Map', icon: MapPin }
        ].map(tab => {
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

      {/* DASHBOARD TAB 1: EXECUTIVE */}
      {activeTab === 'executive' && (
        <div className="space-y-6">
          {/* Executive Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div 
              onClick={() => onNavigateModule('exploration')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Produksi Ore YTD</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Pickaxe className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-slate-100">1,845k</span>
                <span className="text-[11px] text-emerald-400 font-bold flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> 97%
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Target RKAB: 2.5M MT</p>
            </div>

            <div 
              onClick={() => onNavigateModule('stockpile')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Stockpile Volume</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-slate-100">{(totalStockpileTonnage ?? 0).toLocaleString('id-ID')}</span>
                <span className="text-[11px] text-amber-400 font-bold">MT</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Avg Grade: {liveMetrics.averageNiGrade}% Ni</p>
            </div>

            <div 
              onClick={() => onNavigateModule('weighbridge')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Pos Timbangan Gate</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Scale className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-slate-100">Pos 1, 2, 3</span>
                <span className="text-[11px] text-indigo-300 font-bold">IoT Live</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">▲ Timbang Digital Active</p>
            </div>

            <div 
              onClick={() => onNavigateModule('fleet')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Kesiapan Fleet</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-slate-100">{operationalFleetCount} / {equipment.length}</span>
                <span className="text-[11px] text-emerald-400 font-bold">92% PA</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">CAT 777, Scania DT</p>
            </div>

            <div 
              onClick={() => onNavigateModule('smelter')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Nilai HPM ESDM</span>
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Coins className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-emerald-400">{formatUSD(hpm.saproliteBaseNi1_8)}</span>
                <span className="text-[10px] text-slate-300 font-mono">/dmt</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">HMA Nikel: $16,450</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">
                    Realisasi Produksi Ore Nikel vs Target RKAB ESDM (MT)
                  </h3>
                  <p className="text-xs text-slate-400">Pencapaian bulanan pit penambangan nikel 2026</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-slate-800 text-emerald-400 rounded-lg font-bold">
                  Target Tercaver 97.2%
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rkabProductionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} 
                      formatter={(value: any) => [`${value?.toLocaleString('id-ID')} MT`, '']}
                    />
                    <Bar dataKey="targetMT" name="Target RKAB" fill="#334155" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actualMT" name="Realisasi Produksi" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Chart Overall Performance */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="border-b border-slate-800 pb-3 mb-3">
                  <h3 className="font-bold text-slate-100 text-sm">Peta Keseimbangan KPI Operational</h3>
                  <p className="text-xs text-slate-400">Pencapaian multi-dimensi site tambang</p>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarKPIPerformance}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                      <Radar name="Skor Site" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: BUSINESS INTELLIGENCE (BI) */}
      {activeTab === 'bi_analytics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Executive Business Intelligence (BI) Analytics Hub
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Sintesis Data Lintas Modul: Pit, Stockpile, Jetty, BBM & Keuangan</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                OLAP Engine Active
              </span>
            </div>

            {/* BI Key Drivers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Cross-Site Revenue YTD</span>
                <p className="text-2xl font-extrabold text-emerald-400 font-mono">{formatUSD(1845000 * hpm.saproliteBaseNi1_8)}</p>
                <span className="text-emerald-400 text-[10px]">▲ +12.4% vs Budget 2026</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Rata-Rata Cash Cost</span>
                <p className="text-2xl font-extrabold text-amber-300 font-mono">$26.80 / MT</p>
                <span className="text-emerald-400 text-[10px]">▼ -3.5% Efisiensi Biaya</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Margin EBITDA Operasional</span>
                <p className="text-2xl font-extrabold text-indigo-300 font-mono">48.5%</p>
                <span className="text-slate-400 text-[10px]">Laba Bersih $48.2M</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Efisiensi Fuel Ratio B35</span>
                <p className="text-2xl font-extrabold text-blue-300 font-mono">2.82 L / Ton</p>
                <span className="text-emerald-400 text-[10px]">Target RKAB ≤ 3.00 L/Ton</span>
              </div>
            </div>

            {/* BI Chart: Production vs Cash Cost Trend */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-100 text-xs">Visualisasi BI: Tren Produksi Ore vs Cash Cost Per Ton ($ USD)</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={rkabProductionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis yAxisId="left" stroke="#10b981" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} domain={[20, 35]} tickFormatter={(v) => `$${v}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Bar yAxisId="left" dataKey="actualMT" name="Produksi Ore Actual (MT)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="costPerTon" name="Cash Cost ($/MT)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: PRODUCTION ANALYTICS */}
      {activeTab === 'production_analytics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Pickaxe className="w-4 h-4 text-emerald-400" /> Analitik Produksi & Ore Mining (Production Analytics)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Evaluasi Realisasi Produksi Pit, Stripping Ratio (SR), & Recovery Grade</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                SR Actual: 3.8 BCM/MT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-mono text-[10px]">Total Overburden (OB) Removal</span>
                <p className="text-2xl font-extrabold text-slate-100 font-mono">7,011,000 <span className="text-xs font-normal text-slate-400">BCM</span></p>
                <span className="text-emerald-400 text-[10px]">Stripping Ratio Target 4.0 BCM/MT</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-mono text-[10px]">Total Ore Getting Produced</span>
                <p className="text-2xl font-extrabold text-emerald-400 font-mono">1,845,000 <span className="text-xs font-normal text-slate-400">WMT</span></p>
                <span className="text-emerald-400 text-[10px]">High Grade Saprolite 1.84% Ni Avg</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-mono text-[10px]">Ore Recovery Rate Pit</span>
                <p className="text-2xl font-extrabold text-amber-300 font-mono">96.8%</p>
                <span className="text-slate-400 text-[10px]">Dilusi Ore Terkontrol ≤ 3.2%</span>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-100 text-xs">Grafik Produksi Ore Bulanan vs Target RKAB ESDM 2026</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rkabProductionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Bar dataKey="targetMT" name="Target RKAB (MT)" fill="#334155" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actualMT" name="Realisasi Actual (MT)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: FUEL ANALYTICS */}
      {activeTab === 'fuel_analytics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" /> Analitik Konsumsi BBM & Fuel Ratio B35 (Fuel Analytics)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Pemantauan Konsumsi Solar B35, Sensor IoT Tanki & Deteksi Susut BBM</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold">
                Fuel Stock: 145,000 Liters (Ready 18 Hari)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Rata-Rata Fuel Ratio (Liters / Ton Ore)</span>
                <span className="text-3xl font-extrabold text-amber-300 block">2.82 L/Ton</span>
                <span className="text-emerald-400 text-[10px]">Optimal vs Standard (3.0 L/Ton)</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Konsumsi Solar B35 Per Jam</span>
                <span className="text-3xl font-extrabold text-blue-300 block">{liveMetrics.fuelConsumptionLph} L/Jam</span>
                <span className="text-slate-400 text-[10px]">Telemetri Live 38 Unit Fleet</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Anomali Susut/Theft Rate</span>
                <span className="text-3xl font-extrabold text-emerald-400 block">0.02%</span>
                <span className="text-emerald-400 text-[10px]">Anti-Theft Flowmeter Active</span>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-100 text-xs">Konsumsi BBM Per Kategori Unit Alat Berat (Liters/Shift)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 font-bold block">Dump Truck (Scania / Volvo)</strong>
                    <span className="text-slate-400 text-[10px]">Hauling Road KM 0-18</span>
                  </div>
                  <span className="text-amber-300 font-bold text-sm">3,850 L/Shift</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 font-bold block">Excavator PC2000 / PC800</strong>
                    <span className="text-slate-400 text-[10px]">Pit Digging & Loading</span>
                  </div>
                  <span className="text-amber-300 font-bold text-sm">2,920 L/Shift</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 font-bold block">Bulldozer & Motor Grader</strong>
                    <span className="text-slate-400 text-[10px]">Road Maintenance</span>
                  </div>
                  <span className="text-amber-300 font-bold text-sm">1,240 L/Shift</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: COST ANALYTICS */}
      {activeTab === 'cost_analytics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Analitik Biaya Operasional & HPP (Cost Analytics)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Rincian Cash Cost Per Ton ($ USD/MT) & Analisis Varian Anggaran CAPEX/OPEX</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                Target Cost: ≤ $28.00 / MT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Biaya Kontraktor Tambang</span>
                <span className="text-2xl font-extrabold text-slate-100 block">$14.20 / MT</span>
                <span className="text-slate-400 text-[10px]">OB Removal + Ore Getting</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Biaya Pengangkutan (Hauling)</span>
                <span className="text-2xl font-extrabold text-slate-100 block">$5.80 / MT</span>
                <span className="text-slate-400 text-[10px]">Jarak 18 KM ke Jetty</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Royalty ESDM (PNBP)</span>
                <span className="text-2xl font-extrabold text-amber-300 block">$3.90 / MT</span>
                <span className="text-slate-400 text-[10px]">Tarif Royalty 10% HPM</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Barging & Jetty Transshipment</span>
                <span className="text-2xl font-extrabold text-slate-100 block">$2.90 / MT</span>
                <span className="text-slate-400 text-[10px]">Demurrage Zero Risk</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center font-mono">
              <span className="text-slate-200 font-bold">Total Cash Cost All-In Per Ton Ore:</span>
              <span className="text-2xl font-extrabold text-emerald-400">$26.80 / MT</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: PROFITABILITY */}
      {activeTab === 'profitability' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Analitik Profitabilitas & Realisasi Penjualan Offtaker
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Evaluasi Pendapatan Penjualan vs HPM ESDM & Analisis Margin Laba</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                Harga HPM 1.8% Ni: {formatUSD(hpm.saproliteBaseNi1_8)} / dmt
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Realisasi Pendapatan Kotor</span>
                <span className="text-3xl font-extrabold text-emerald-400 block">$98.2M</span>
                <span className="text-emerald-400 text-[10px]">Kontrak Offtaker Smelter IMIP</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Margin EBITDA (%)</span>
                <span className="text-3xl font-extrabold text-indigo-300 block">48.5%</span>
                <span className="text-emerald-400 text-[10px]">▲ +4.2% vs Industri Avg</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Laba Bersih Operasional (EAT)</span>
                <span className="text-3xl font-extrabold text-slate-100 block">$48.2M</span>
                <span className="text-slate-400 text-[10px]">Pajak & Royalty Deducted</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: FORECAST & AI INSIGHT */}
      {activeTab === 'forecast_ai' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> Proyeksi Prediktif (Forecast) & AI NickelSmart Insights
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Model Machine Learning Prediksi Produksi 30/60/90 Hari & Rekomendasi AI</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono font-bold">
                MineGPT AI Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 text-sm block">Proyeksi Produksi 30 Hari Mendatang</span>
                <p className="text-slate-300">
                  Model AI memproyeksikan estimasi produksi ore sebesar <strong className="text-emerald-400 font-mono">265,000 WMT</strong> untuk bulan depan dengan tingkat kepastian confidence index 94.2%.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 text-sm block">Analisis Risiko Cuaca & Curah Hujan (La Nina)</span>
                <p className="text-slate-300">
                  Potensi hujan lebat diprediksi terjadi pada pertengahan bulan. Direkomendasikan melakukan perbaikan sump pit & pompa dewatering di Pit Beta sebelum tanggal 12.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: REALTIME KPI STREAM */}
      {activeTab === 'realtime_kpi' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
              <h3 className="font-bold text-slate-100 text-base">Live Ticker & Realtime Operational Telemetry Stream</h3>
            </div>
            <span className="text-emerald-400 font-mono text-xs font-bold">
              Stream Telemetry Tick #{tickCounter} • Updated {lastUpdatedTime}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Stripping Overburden (OB) Shift Ini</span>
              <span className="text-3xl font-extrabold text-slate-100 font-mono">{(liveMetrics.hourlyObBCM ?? 0).toLocaleString('id-ID')} BCM</span>
              <span className="text-[10px] text-emerald-400 block font-mono">▲ +3.2% vs target shift</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Ore Production (Ore Getting)</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">{(liveMetrics.hourlyOreMT ?? 0).toLocaleString('id-ID')} MT</span>
              <span className="text-[10px] text-slate-400 block font-mono">Pit Alpha + Pit Beta</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Kecepatan Pemuatan Jetty Conveyor</span>
              <span className="text-3xl font-extrabold text-amber-300 font-mono">{liveMetrics.jettyConveyorTph} MT/jam</span>
              <span className="text-[10px] text-slate-400 block font-mono">Barge BG-MOR-09 Loading</span>
            </div>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-2">
              Streaming Real-Time Alert & Anomaly Event Log
            </h4>
            
            <div className="space-y-3 font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-rose-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">CRITICAL</span>
                  <span className="text-slate-200 text-xs">Efluen Settling Pond #4 pH 5.2 (Melewati Ambang BPLH)</span>
                </div>
                <span className="text-slate-500 text-[10px]">{lastUpdatedTime}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">WARNING</span>
                  <span className="text-slate-200 text-xs">Unit Excavator EX-201 Suhu Hidrolik +14°C Normal Range</span>
                </div>
                <span className="text-slate-500 text-[10px]">{lastUpdatedTime}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">NORMAL</span>
                  <span className="text-slate-200 text-xs">Stockpile Blending Saprolite High Grade Ni 1.84% Verified</span>
                </div>
                <span className="text-slate-500 text-[10px]">{lastUpdatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 2: OPERATIONAL PIT */}
      {activeTab === 'operational' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Rata-Rata Waktu Siklus (Cycle Time) DT</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">24.5 Min</span>
              <span className="text-[11px] text-emerald-400 block mt-1">Pit Alpha ke Stockpile ETO</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Kecepatan Rata-Rata Jalur Haul Road</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">28.4 km/jam</span>
              <span className="text-[11px] text-amber-400 block mt-1">Kondisi Jalan: Kering (Disiram Dust Suppression)</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Status Dewatering Settling Pond</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">3 Pompa Aktif</span>
              <span className="text-[11px] text-slate-400 block mt-1">Kapasitas Buang: 450 m³/jam</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Fluktuasi Cycle Time & Kepadatan Haul Road per Jam
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cycleTimeHourly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="avgCycleMin" name="Cycle Time (Menit)" stroke="#3B82F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="dtSpeedKmh" name="Kecepatan DT (km/h)" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 3: FINANCIAL & HPM */}
      {activeTab === 'financial' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">HMA Nikel ESDM</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">$16,450 / dmt</span>
              <span className="text-[11px] text-slate-400 block mt-1">Patokan LME Spot Rate</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">HPM Saprolite Ni 1.8% FOB</span>
              <span className="text-2xl font-bold text-indigo-300 font-mono">{formatUSD(hpm.saproliteBaseNi1_8)}</span>
              <span className="text-[11px] text-slate-400 block mt-1">≈ Rp 828,000 / wmt</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Estimasi Cash Cost Per Ton</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">$26.80 / MT</span>
              <span className="text-[11px] text-emerald-400 block mt-1">Margin Keuntungan 48.5%</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Tren HMA Nikel ESDM & Patokan Harga Saprolite ($ USD/dmt)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hpmTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="hma" name="HMA Nikel ($)" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="saproliteUSD" name="Saprolite HPM ($)" stroke="#6366F1" fill="#6366F1" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 4: PRODUCTION & ORE */}
      {activeTab === 'production' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
                Distribusi Kategori Grade Ore Stockpile
              </h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 text-xs">
                {gradeDistributionData.map((g, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                      {g.name}
                    </span>
                    <strong className="text-slate-100 font-mono">{g.value}%</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
                Ringkasan Tonase Stockpile ETO & EFO (WMT)
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {stockpiles.map(s => (
                  <div key={s.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-200 font-bold block">{s.name}</strong>
                      <span className="text-slate-400 text-[10px]">Ni Grade: {s.averageGradeNi}% | MC: {s.moistureContent}%</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-sm">{(s.currentTonnageMT ?? 0).toLocaleString('id-ID')} MT</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 5: SAFETY HSE */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Total Jam Kerja Tanpa Kecelakaan (LTI Free)</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">4,820,000</span>
              <span className="text-slate-500 block mt-1">Jam Kerja Selamat Non-Stop</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Fatality & Major Injury Rate</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">0.00</span>
              <span className="text-slate-500 block mt-1">Zero Incident Compliance</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Temuan Near Miss & Inspeksi Safety</span>
              <span className="text-3xl font-extrabold text-amber-300 font-mono">14 Terselesaikan</span>
              <span className="text-slate-500 block mt-1">Closed-loop Remediation 100%</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 6: ENVIRONMENT ESG */}
      {activeTab === 'environment' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Monitoring Kualitas Air Settling Pond Limpasan Tambang (Sensor BPLH Real-Time)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {environmentPondMetrics.map((p, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-200 font-sans block text-xs font-bold">{p.pond}</strong>
                    <span className="text-slate-400 text-[10px]">Tingkat Kekeruhan (Turbidity): {p.ntu} NTU</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-400 block">pH {p.ph}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      p.status === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-300 block">Capaian Revegetasi & Reklamasi Lahan</span>
                <span className="text-slate-300 text-[11px]">Total Lahan Ditanami Pohon Sengon & Mahoni: 142.5 Hektar</span>
              </div>
              <span className="text-xl font-bold text-emerald-400 font-mono">102% dari Target ESDM</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 7: EQUIPMENT & FLEET */}
      {activeTab === 'equipment' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Physical Availability (PA)</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">92.4%</span>
              <span className="text-slate-500 block mt-1">Ketersediaan Fisik Unit</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Use of Availability (UA)</span>
              <span className="text-3xl font-extrabold text-blue-400 font-mono">86.1%</span>
              <span className="text-slate-500 block mt-1">Jam Kerja Efektif vs Standby</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Konsumsi BBM Solar (Liters/Hour)</span>
              <span className="text-3xl font-extrabold text-amber-400 font-mono">{liveMetrics.fuelConsumptionLph} L/jam</span>
              <span className="text-slate-500 block mt-1">Telemetri Sensor IoT BBM</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 8: AI ANALYTICS */}
      {activeTab === 'ai' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h3 className="font-bold text-slate-100 text-base">Mesin Prediktif AI NickelSmart Operational</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">Prediksi Anomali Pemeliharaan Alat</span>
              <p className="text-slate-300">
                Unit Excavator EX-201 (Komatsu PC2000) terdeteksi mengalami kenaikan suhu transmisi hidrolik +14°C di atas normal. Direkomendasikan ganti oli filter dalam 24 jam.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400">Optimasi Formula Blending EFO</span>
              <p className="text-slate-300">
                Untuk mempertahankan kadar Ni {liveMetrics.averageNiGrade}% pada shipment Tongkang BG-MOR-09, campurkan 600 MT Stockpile Alpha-High dengan 400 MT Stockpile Beta-Mid.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 10: GIS PIT MAP */}
      {activeTab === 'gis_map' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-base">Peta GIS Operasional Pit & Posisi GPS Perangkat</h3>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg font-mono text-[11px] font-bold">
              Koor: 2°31'44"S 121°58'12"E (Bahodopi Morowali)
            </span>
          </div>

          <div className="relative h-80 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Visual GIS Map Graphic Representation */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            {/* Pit Nodes */}
            <div className="absolute top-12 left-1/4 p-3 rounded-xl bg-slate-900/90 border border-emerald-500 text-center shadow-lg">
              <MapPin className="w-5 h-5 text-emerald-400 mx-auto mb-1 animate-bounce" />
              <span className="font-bold text-slate-100 text-[11px] block">Pit Alpha Saprolite</span>
              <span className="text-[10px] text-emerald-300 font-mono">Ni: {liveMetrics.averageNiGrade}% | {liveMetrics.activeEquipmentCount} DT Active</span>
            </div>

            <div className="absolute top-28 right-1/4 p-3 rounded-xl bg-slate-900/90 border border-amber-500 text-center shadow-lg">
              <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-1 animate-bounce" />
              <span className="font-bold text-slate-100 text-[11px] block">Stockpile EFO Blending</span>
              <span className="text-[10px] text-amber-300 font-mono">48,500 MT Ready</span>
            </div>

            <div className="absolute bottom-8 left-1/3 p-3 rounded-xl bg-slate-900/90 border border-blue-500 text-center shadow-lg">
              <Ship className="w-5 h-5 text-blue-400 mx-auto mb-1 animate-pulse" />
              <span className="font-bold text-slate-100 text-[11px] block">Jetty Port Terminal</span>
              <span className="text-[10px] text-blue-300 font-mono">Barge Loading BG-MOR-09 ({liveMetrics.jettyConveyorTph} TPH)</span>
            </div>

            <span className="text-slate-500 text-[11px]">GIS Layer: Satelit Topografi TopoMap v2.4 (GPS Real-Time Active)</span>
          </div>
        </div>
      )}

    </div>
  );
};
