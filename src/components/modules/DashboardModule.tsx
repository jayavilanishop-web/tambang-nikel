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
  Award
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
    { pond: 'Settling Pond Pit Alpha', ph: 7.2, ntu: 18, status: 'NORMAL' },
    { pond: 'Settling Pond Pit Beta', ph: 6.9, ntu: 24, status: 'NORMAL' },
    { pond: 'Settling Pond EFO Stockpile', ph: 7.4, ntu: 15, status: 'NORMAL' },
    { pond: 'Settling Pond Jetty Port', ph: 7.1, ntu: 32, status: 'WARNING' }
  ];

  const totalStockpileTonnage = stockpiles.reduce((acc, s) => acc + s.currentTonnageMT, 0);
  const totalBargeTonnageLoaded = barges.reduce((acc, b) => acc + b.loadedTonnageMT, 0);
  const operationalFleetCount = equipment.filter(e => e.status === 'OPERATIONAL').length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Pusat Kendali Utama Tambang
            </span>
            <span className="text-slate-400 text-xs">• Site Morowali & Halmahera Tbk</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            {language === 'id' ? 'SmartMine Control Center & Multi-Dashboard' : 'SmartMine Multi-Dashboard Operations Hub'}
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pemantauan terpadu eksekutif, operasional pit, keuangan HPM, produksi ore, HSE keselamatan kerja, lingkungan ESG, telemetri alat berat, serta peta GIS real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSiteFilter}
            onChange={(e) => setSelectedSiteFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 text-xs font-bold"
          >
            <option value="ALL">Semua Site (Morowali + Halmahera)</option>
            <option value="MOROWALI">Site Morowali Bahodopi</option>
            <option value="HALMAHERA">Site Weda Bay Halmahera</option>
          </select>

          <button
            onClick={onOpenAIDrawer}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Analisis AI SmartMine</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Dashboard Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'executive', label: 'Executive', icon: BarChart3 },
          { id: 'operational', label: 'Operational Pit', icon: Pickaxe },
          { id: 'financial', label: 'Financial & HPM', icon: Coins },
          { id: 'production', label: 'Production & Ore', icon: Layers },
          { id: 'safety', label: 'Safety HSE', icon: ShieldCheck },
          { id: 'environment', label: 'Environment ESG', icon: Trees },
          { id: 'equipment', label: 'Equipment & Fleet', icon: Truck },
          { id: 'ai', label: 'AI Analytics', icon: Sparkles },
          { id: 'realtime_kpi', label: 'Realtime KPI', icon: Gauge },
          { id: 'gis_map', label: 'GIS Pit Map', icon: MapPin }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => onNavigateModule('exploration')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Produksi Ore YTD (RKAB)</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Pickaxe className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-slate-100">1,845,000</span>
                <span className="text-xs text-emerald-400 font-bold flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> 97.2% Target
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Kuota ESDM: 2,500,000 MT / Tahun</p>
            </div>

            <div 
              onClick={() => onNavigateModule('stockpile')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Volume Stockpile ETO/EFO</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-slate-100">{totalStockpileTonnage.toLocaleString('id-ID')}</span>
                <span className="text-xs text-amber-400 font-bold">MT Ready Blend</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Rata-rata Ni Grade: 1.82%</p>
            </div>

            <div 
              onClick={() => onNavigateModule('fleet')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Kesiapan Fleet Alat Berat</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-slate-100">{operationalFleetCount} / {equipment.length}</span>
                <span className="text-xs text-emerald-400 font-bold">92% PA Rate</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">CAT 777, Komatsu PC2000, Scania DT</p>
            </div>

            <div 
              onClick={() => onNavigateModule('smelter')}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Nilai Penjualan HPM ESDM</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-emerald-400">{formatUSD(hpm.saproliteBaseNi1_8)}</span>
                <span className="text-xs text-slate-300 font-mono">/ dmt</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">HMA Nikel: $16,450 / dmt</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Harga Acuan Nikel (HMA)</span>
              <span className="text-2xl font-bold text-slate-100">{formatUSD(hpm.hmaPriceUSD)}</span>
              <span className="text-emerald-400 block mt-1">/ dmt ESDM</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Harga Patokan Saprolite 1.8%</span>
              <span className="text-2xl font-bold text-emerald-400">{formatUSD(hpm.saproliteBaseNi1_8)}</span>
              <span className="text-slate-400 block mt-1">FOB Point Morowali</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Estimasi Royalti ESDM (10%)</span>
              <span className="text-2xl font-bold text-amber-400">{formatUSD(hpm.saproliteBaseNi1_8 * 0.10)}</span>
              <span className="text-slate-400 block mt-1">PNBP Kementerian ESDM</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Mining Cash Cost (COSR)</span>
              <span className="text-2xl font-bold text-slate-100">$26.80</span>
              <span className="text-slate-400 block mt-1">Per Wet Metric Ton</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Proyeksi Pendapatan vs Beban Produksi (USD/MT)
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hpmTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="period" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="saproliteUSD" name="Pendapatan Penjualan ($)" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 4: PRODUCTION & ORE */}
      {activeTab === 'production' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
                Distribusi Kadar Ore Nikel Stockpile ETO & EFO
              </h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={4}
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
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs">
              <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
                Spesifikasi Kualitas Ore Nikel Rata-Rata Site
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Kadar Ni (Nickel Grade):</span>
                  <span className="font-bold text-emerald-400 font-mono">1.83% Ni</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Kadar Fe (Iron Content):</span>
                  <span className="font-bold text-amber-400 font-mono">18.5% Fe</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">SM Ratio (SiO2 / MgO):</span>
                  <span className="font-bold text-slate-200 font-mono">2.12 (Ideal Smelter)</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Moisture Content (MC):</span>
                  <span className="font-bold text-blue-400 font-mono">34.2% MC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 5: SAFETY HSE */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
              <span className="text-emerald-300 font-bold block mb-1">LTI-Free Days (Bebas Kecelakaan)</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">842 Hari</span>
              <span className="text-[11px] text-slate-400 block mt-1">Target Zero Harm 2026</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">TRIFR Rate (Per 1 Juta Jam)</span>
              <span className="text-3xl font-extrabold text-slate-100 font-mono">0.12</span>
              <span className="text-emerald-400 block mt-1">Di bawah batas ESDM (0.50)</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Inspeksi HSE Selesai</span>
              <span className="text-3xl font-extrabold text-slate-100 font-mono">148 / 150</span>
              <span className="text-slate-400 block mt-1">Audit APD & Fatigue Check</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Near-Miss Logged</span>
              <span className="text-3xl font-extrabold text-amber-400 font-mono">12 Report</span>
              <span className="text-slate-400 block mt-1">Telah Ditindaklanjuti Tim HSE</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 6: ENVIRONMENT ESG */}
      {activeTab === 'environment' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemantauan Kualitas Air Settling Pond & Reklamasi Lahan
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {environmentPondMetrics.map((p, i) => (
                <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-200 block">{p.pond}</span>
                    <span className="text-slate-400 text-[11px]">pH Level: <strong className="text-emerald-400 font-mono">{p.ph}</strong> | Turbidity: <strong className="text-amber-400 font-mono">{p.ntu} NTU</strong></span>
                  </div>
                  <span className={`px-2 py-1 rounded font-bold text-[10px] ${p.status === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {p.status}
                  </span>
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
              <span className="text-3xl font-extrabold text-amber-400 font-mono">42.5 L/jam</span>
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
            <h3 className="font-bold text-slate-100 text-base">Mesin Prediktif AI SmartMine Operational</h3>
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
                Untuk mempertahankan kadar Ni 1.82% pada shipment Tongkang BG-MOR-09, campurkan 600 MT Stockpile Alpha-High dengan 400 MT Stockpile Beta-Mid.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 9: REALTIME KPI */}
      {activeTab === 'realtime_kpi' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="font-bold text-slate-100 text-base">Live Ticker & Realtime Operational KPI</h3>
            </div>
            <span className="text-emerald-400 font-mono text-[11px]">Updated 5 detik yang lalu</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Tonnage Stripping Overburden (OB) Shift Ini</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">14,850 BCM</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Tonnage Ore Getting (Ore Production)</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">8,420 MT</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block">Kecepatan Pemuatan Jetty Conveyor</span>
              <span className="text-2xl font-bold text-amber-400 font-mono">1,250 MT/jam</span>
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
              <span className="text-[10px] text-emerald-300 font-mono">Ni: 1.84% | 12 DT Active</span>
            </div>

            <div className="absolute top-28 right-1/4 p-3 rounded-xl bg-slate-900/90 border border-amber-500 text-center shadow-lg">
              <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-1 animate-bounce" />
              <span className="font-bold text-slate-100 text-[11px] block">Stockpile EFO Blending</span>
              <span className="text-[10px] text-amber-300 font-mono">48,500 MT Ready</span>
            </div>

            <div className="absolute bottom-8 left-1/3 p-3 rounded-xl bg-slate-900/90 border border-blue-500 text-center shadow-lg">
              <Ship className="w-5 h-5 text-blue-400 mx-auto mb-1 animate-pulse" />
              <span className="font-bold text-slate-100 text-[11px] block">Jetty Port Terminal</span>
              <span className="text-[10px] text-blue-300 font-mono">Barge Loading BG-MOR-09</span>
            </div>

            <span className="text-slate-500 text-[11px]">GIS Layer: Satelit Topografi TopoMap v2.4 (GPS Real-Time Active)</span>
          </div>
        </div>
      )}

    </div>
  );
};
