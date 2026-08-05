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
  Sliders 
} from 'lucide-react';
import { MineSite, OreStockpile, HeavyEquipment, BargeShipment, Language } from '../../types';

interface OperationCenterModuleProps {
  sites: MineSite[];
  stockpiles: OreStockpile[];
  equipment: HeavyEquipment[];
  barges: BargeShipment[];
  language: Language;
}

export const OperationCenterModule: React.FC<OperationCenterModuleProps> = ({
  sites,
  stockpiles,
  equipment,
  barges,
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'production'
    | 'hauling_loading'
    | 'crusher_movement'
    | 'stockpile_blending'
    | 'jetty_port'
    | 'pit_road'
    | 'shift_report'
    | 'productivity_downtime'
  >('production');

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
          { id: 'production', label: 'Production & Target', icon: Pickaxe, badge: 'Target 102%' },
          { id: 'hauling_loading', label: 'Loading, Hauling & Dumping', icon: Truck, badge: '24 DT' },
          { id: 'crusher_movement', label: 'Crusher & Material Tracking', icon: Zap, badge: '3 Station' },
          { id: 'stockpile_blending', label: 'Stockpile & Ore Blending', icon: Layers, badge: '3 Block' },
          { id: 'jetty_port', label: 'Jetty, Port & Shipping', icon: Ship, badge: '2 Barge' },
          { id: 'pit_road', label: 'Pit & Road Monitoring', icon: Compass, badge: '18 KM' },
          { id: 'shift_report', label: 'Shift & Daily Report', icon: FileText, badge: 'Kepmen 1827' },
          { id: 'productivity_downtime', label: 'Utilization & Downtime', icon: Activity, badge: 'PA 92.4%' }
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
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

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
