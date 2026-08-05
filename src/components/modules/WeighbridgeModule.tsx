import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Truck, 
  FileText, 
  QrCode, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  Play, 
  Pause, 
  ShieldCheck, 
  Layers, 
  MapPin, 
  ArrowRight, 
  TrendingUp, 
  BarChart3, 
  Radio, 
  Camera, 
  Zap, 
  HardDrive, 
  Plus, 
  X, 
  Check, 
  Sparkles,
  Info,
  DollarSign,
  Sliders,
  RotateCcw,
  Navigation,
  Activity
} from 'lucide-react';
import { Language, MineSite, OreStockpile, HeavyEquipment } from '../../types';

export interface WeighbridgeTicket {
  id: string;
  ticketNo: string;
  timestampIn: string;
  timestampOut: string;
  truckUnitNo: string;
  truckType: string;
  driverName: string;
  contractorName: string;
  gateNo: 'POS 1 (Pit-to-Stockpile)' | 'POS 2 (Stockpile-to-Jetty)' | 'POS 3 (OB Dump Site)';
  materialType: 'Saprolite High Grade (>=1.8% Ni)' | 'Saprolite Mid Grade (1.5-1.79% Ni)' | 'Limonite HPAL Feed' | 'Overburden (OB)';
  originLocation: string;
  destinationLocation: string;
  grossWeightKg: number;
  tareWeightKg: number;
  netWeightKg: number;
  netWeightMT: number;
  moistureContentPct: number;
  estimatedNiGradePct: number;
  status: 'COMPLETED' | 'IN_QUEUE' | 'WEIGHING' | 'OVERLOADED_REJECT';
  operatorName: string;
  notes?: string;
}

interface WeighbridgeModuleProps {
  sites?: MineSite[];
  stockpiles?: OreStockpile[];
  equipment?: HeavyEquipment[];
  language?: Language;
  onOpenAIDrawer?: () => void;
  onNavigateModule?: (mod: any) => void;
  onNewTicketProcessed?: (ticket: WeighbridgeTicket) => void;
}

export const WeighbridgeModule: React.FC<WeighbridgeModuleProps> = ({
  sites = [],
  stockpiles = [],
  equipment = [],
  language = 'id',
  onOpenAIDrawer,
  onNavigateModule,
  onNewTicketProcessed
}) => {
  // Live Tickets Mock State
  const [tickets, setTickets] = useState<WeighbridgeTicket[]>([
    {
      id: 'WB-001',
      ticketNo: 'SJT-20260803-0182',
      timestampIn: '08:15:22',
      timestampOut: '08:18:05',
      truckUnitNo: 'DT-MOR-012',
      truckType: 'Scania P410 (10-Wheeler)',
      driverName: 'Budi Santoso',
      contractorName: 'PT Mandiri Jaya Mining',
      gateNo: 'POS 1 (Pit-to-Stockpile)',
      materialType: 'Saprolite High Grade (>=1.8% Ni)',
      originLocation: 'Pit Alpha Block 4',
      destinationLocation: 'Stockpile ETO Alpha-1',
      grossWeightKg: 42800,
      tareWeightKg: 14200,
      netWeightKg: 28600,
      netWeightMT: 28.6,
      moistureContentPct: 32.4,
      estimatedNiGradePct: 1.86,
      status: 'COMPLETED',
      operatorName: 'Rian Hidayat',
      notes: 'Lolos uji timbang, tidak ada indikasi basah ekstrim'
    },
    {
      id: 'WB-002',
      ticketNo: 'SJT-20260803-0183',
      timestampIn: '08:22:10',
      timestampOut: '08:24:40',
      truckUnitNo: 'DT-MOR-018',
      truckType: 'Volvo FMX 440 (8x4)',
      driverName: 'Agus Setiawan',
      contractorName: 'PT Halmahera Hauling Pro',
      gateNo: 'POS 2 (Stockpile-to-Jetty)',
      materialType: 'Saprolite Mid Grade (1.5-1.79% Ni)',
      originLocation: 'Stockpile EFO Beta-2',
      destinationLocation: 'Port Jetty 1 (Barge BG-MOR-09)',
      grossWeightKg: 48500,
      tareWeightKg: 15100,
      netWeightKg: 33400,
      netWeightMT: 33.4,
      moistureContentPct: 30.1,
      estimatedNiGradePct: 1.68,
      status: 'COMPLETED',
      operatorName: 'Rian Hidayat'
    },
    {
      id: 'WB-003',
      ticketNo: 'SJT-20260803-0184',
      timestampIn: '08:35:12',
      timestampOut: '08:37:20',
      truckUnitNo: 'DT-MOR-025',
      truckType: 'Shacman X3000 (10-Wheeler)',
      driverName: 'Dedi Kurniawan',
      contractorName: 'PT Nusantara Transport',
      gateNo: 'POS 3 (OB Dump Site)',
      materialType: 'Overburden (OB)',
      originLocation: 'Pit Beta Layer 3',
      destinationLocation: 'Disposal Area West',
      grossWeightKg: 38200,
      tareWeightKg: 13800,
      netWeightKg: 24400,
      netWeightMT: 24.4,
      moistureContentPct: 0,
      estimatedNiGradePct: 0,
      status: 'COMPLETED',
      operatorName: 'Siti Aminah'
    },
    {
      id: 'WB-004',
      ticketNo: 'SJT-20260803-0185',
      timestampIn: '08:42:00',
      timestampOut: '08:44:15',
      truckUnitNo: 'DT-MOR-008',
      truckType: 'CAT 777D Rigid Hauler',
      driverName: 'Eko Prasetyo',
      contractorName: 'PT Mandiri Jaya Mining',
      gateNo: 'POS 1 (Pit-to-Stockpile)',
      materialType: 'Saprolite High Grade (>=1.8% Ni)',
      originLocation: 'Pit Alpha Block 2',
      destinationLocation: 'Stockpile ETO Alpha-2',
      grossWeightKg: 54100,
      tareWeightKg: 15000,
      netWeightKg: 39100,
      netWeightMT: 39.1,
      moistureContentPct: 33.0,
      estimatedNiGradePct: 1.84,
      status: 'OVERLOADED_REJECT',
      operatorName: 'Rian Hidayat',
      notes: 'Melebihi batas Muatan Sumbu Terijinkan (Overload +2.1 MT). Ditolak masuk stockpile.'
    }
  ]);

  // Terminal Simulator Active Values
  const [simTruckUnit, setSimTruckUnit] = useState<string>('DT-MOR-014');
  const [simDriverName, setSimDriverName] = useState<string>('Rahmat Hidayat');
  const [simContractor, setSimContractor] = useState<string>('PT Mandiri Jaya Mining');
  const [simGate, setSimGate] = useState<'POS 1 (Pit-to-Stockpile)' | 'POS 2 (Stockpile-to-Jetty)' | 'POS 3 (OB Dump Site)'>('POS 1 (Pit-to-Stockpile)');
  const [simMaterial, setSimMaterial] = useState<'Saprolite High Grade (>=1.8% Ni)' | 'Saprolite Mid Grade (1.5-1.79% Ni)' | 'Limonite HPAL Feed' | 'Overburden (OB)'>('Saprolite High Grade (>=1.8% Ni)');
  const [simOrigin, setSimOrigin] = useState<string>('Pit Alpha Block 3');
  const [simDestination, setSimDestination] = useState<string>('Stockpile ETO Alpha-1');
  const [simGrossWeight, setSimGrossWeight] = useState<number>(43200);
  const [simTareWeight, setSimTareWeight] = useState<number>(14100);
  const [simMoisture, setSimMoisture] = useState<number>(31.5);
  const [simNiGrade, setSimNiGrade] = useState<number>(1.85);

  // Active Tab Mode
  const [activeTab, setActiveTab] = useState<'TRAFFIC_DISPATCH' | 'TERMINAL' | 'ANPR_RFID' | 'CALIBRATION'>('TRAFFIC_DISPATCH');

  // Traffic Dispatcher & Anti-Queue State
  const [dispatchMode, setDispatchMode] = useState<'AUTO' | 'STAGGERED' | 'PAUSED'>('STAGGERED');
  const [releaseIntervalMin, setReleaseIntervalMin] = useState<number>(3);
  const [isAutoRerouteEnabled, setIsAutoRerouteEnabled] = useState<boolean>(true);
  
  // Live Active Fleet Traffic List
  const [fleetTraffic, setFleetTraffic] = useState([
    {
      id: 'TR-01',
      unitNo: 'DT-MOR-012',
      driver: 'Budi Santoso',
      status: 'HAULING',
      currentZone: 'Jalur Hauling (KM 6.2)',
      targetZone: 'POS 1 (Pos Timbangan)',
      speedKmH: 38,
      spacingMeters: 350,
      etaMinutes: 2,
      origin: 'Pit Alpha Block 4',
      destination: 'Stockpile ETO Alpha-1',
      queueStatus: 'NORMAL'
    },
    {
      id: 'TR-02',
      unitNo: 'DT-MOR-018',
      driver: 'Agus Setiawan',
      status: 'WEIGHING',
      currentZone: 'POS 2 (Pos Timbangan)',
      targetZone: 'Stockpile EFO Beta-2',
      speedKmH: 0,
      spacingMeters: 0,
      etaMinutes: 1,
      origin: 'Stockpile EFO Beta-2',
      destination: 'Port Jetty 1',
      queueStatus: 'NORMAL'
    },
    {
      id: 'TR-03',
      unitNo: 'DT-MOR-025',
      driver: 'Dedi Kurniawan',
      status: 'PIT_LOADING',
      currentZone: 'Pit Alpha Excavator EX-301',
      targetZone: 'Jalur Hauling (KM 0)',
      speedKmH: 0,
      spacingMeters: 120,
      etaMinutes: 4,
      origin: 'Pit Alpha Block 2',
      destination: 'Stockpile ETO Alpha-2',
      queueStatus: 'NORMAL'
    },
    {
      id: 'TR-04',
      unitNo: 'DT-MOR-008',
      driver: 'Eko Prasetyo',
      status: 'DUMPING',
      currentZone: 'Stockpile ETO Alpha-1 Unloading Bay',
      targetZone: 'Kembali Ke Pit Alpha',
      speedKmH: 5,
      spacingMeters: 280,
      etaMinutes: 3,
      origin: 'Pit Alpha Block 3',
      destination: 'Stockpile ETO Alpha-1',
      queueStatus: 'NORMAL'
    },
    {
      id: 'TR-05',
      unitNo: 'DT-MOR-014',
      driver: 'Rahmat Hidayat',
      status: 'QUEUED_PIT',
      currentZone: 'Antrean Pit Beta Front 2',
      targetZone: 'Pit Beta Loading Bay',
      speedKmH: 0,
      spacingMeters: 20,
      etaMinutes: 6,
      origin: 'Pit Beta Layer 3',
      destination: 'Stockpile EFO Alpha-2',
      queueStatus: 'QUEUED'
    }
  ]);

  const handleReleaseNextTruck = (unitNoToRelease?: string) => {
    const targetUnit = unitNoToRelease || 'DT-MOR-014';
    setFleetTraffic(prev => prev.map(t => {
      if (t.unitNo === targetUnit) {
        return {
          ...t,
          status: 'HAULING',
          currentZone: 'Jalur Hauling (KM 0.5)',
          targetZone: 'POS 1 (Pos Timbangan)',
          speedKmH: 35,
          spacingMeters: 300,
          etaMinutes: 5,
          queueStatus: 'NORMAL'
        };
      }
      return t;
    }));
    setStatusNotice(`🚀 Truk ${targetUnit} Berhasil Dirilis Ke Jalur Hauling! (Interval Staggered ${releaseIntervalMin} Menit Terjaga)`);
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const handlePauseDispatch = () => {
    setDispatchMode('PAUSED');
    setStatusNotice('🛑 Sinyal Tahan (Hold All Dispatch) Diaktifkan! Pelepasan Truk Dari Pit Ditunda Untuk Mengurai Antrean.');
    setTimeout(() => setStatusNotice(null), 5000);
  };

  const handleResumeDispatch = () => {
    setDispatchMode('STAGGERED');
    setStatusNotice('🟢 Dispatch Staggered Normal Diaktifkan Kembali.');
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const handleRerouteTruck = (unitNo: string) => {
    setFleetTraffic(prev => prev.map(t => {
      if (t.unitNo === unitNo) {
        return {
          ...t,
          destination: 'Stockpile EFO Beta-2 (Pengalihan Rute Ops)',
          targetZone: 'POS 2 (Pos Timbangan Alternatif)',
          queueStatus: 'NORMAL'
        };
      }
      return t;
    }));
    setStatusNotice(`🔀 Truk ${unitNo} Berhasil Di-Reroute Ke POS 2 & Stockpile Beta-2 Untuk Menghindari Antrean!`);
    setTimeout(() => setStatusNotice(null), 4000);
  };

  // Live Loadcell Simulation Timer toggle
  const [isLiveSensorsConnected, setIsLiveSensorsConnected] = useState<boolean>(true);
  const [selectedTicketForPrint, setSelectedTicketForPrint] = useState<WeighbridgeTicket | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [gateFilter, setGateFilter] = useState<string>('ALL');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Auto fluctuating loadcell weight when active
  useEffect(() => {
    if (!isLiveSensorsConnected) return;
    const interval = setInterval(() => {
      setSimGrossWeight(prev => Math.round(prev + (Math.random() * 40 - 20)));
    }, 1500);
    return () => clearInterval(interval);
  }, [isLiveSensorsConnected]);

  const simNetWeightKg = Math.max(0, simGrossWeight - simTareWeight);
  const simNetWeightMT = Number((simNetWeightKg / 1000).toFixed(2));

  const handleProcessWeighing = () => {
    const isOverloaded = simNetWeightMT > 36.0 && simGate !== 'POS 3 (OB Dump Site)';
    const newTicket: WeighbridgeTicket = {
      id: `WB-${Date.now().toString().slice(-4)}`,
      ticketNo: `SJT-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(1000 + Math.random() * 9000)}`,
      timestampIn: new Date().toLocaleTimeString('id-ID'),
      timestampOut: new Date(Date.now() + 180000).toLocaleTimeString('id-ID'),
      truckUnitNo: simTruckUnit,
      truckType: 'Scania Heavy Hauler 10W',
      driverName: simDriverName,
      contractorName: simContractor,
      gateNo: simGate,
      materialType: simMaterial,
      originLocation: simOrigin,
      destinationLocation: simDestination,
      grossWeightKg: simGrossWeight,
      tareWeightKg: simTareWeight,
      netWeightKg: simNetWeightKg,
      netWeightMT: simNetWeightMT,
      moistureContentPct: simMaterial === 'Overburden (OB)' ? 0 : simMoisture,
      estimatedNiGradePct: simMaterial === 'Overburden (OB)' ? 0 : simNiGrade,
      status: isOverloaded ? 'OVERLOADED_REJECT' : 'COMPLETED',
      operatorName: 'Operator Pos Timbangan 1',
      notes: isOverloaded ? 'Peringatan: Berat bersih melebihi kapasitas aman sumbu jalan (Overload)' : 'Timbang digital terverifikasi lolos'
    };

    setTickets(prev => [newTicket, ...prev]);
    setSelectedTicketForPrint(newTicket);
    if (onNewTicketProcessed) {
      onNewTicketProcessed(newTicket);
    }
    setStatusNotice(`Surat Jalan Timbangan Baru (${newTicket.ticketNo}) Berhasil Diterbitkan!`);
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.ticketNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.truckUnitNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        t.contractorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGate = gateFilter === 'ALL' || t.gateNo === gateFilter;
    return matchSearch && matchGate;
  });

  const totalTodayMT = tickets.reduce((acc, t) => t.status === 'COMPLETED' ? acc + t.netWeightMT : acc, 0);
  const completedTicketsCount = tickets.filter(t => t.status === 'COMPLETED').length;
  const overloadCount = tickets.filter(t => t.status === 'OVERLOADED_REJECT').length;

  return (
    <div className="space-y-6 text-slate-100">
      
      {/* Top Banner Notice */}
      {statusNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{statusNotice}</span>
          </div>
          <button onClick={() => setStatusNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Module Title Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                IoT Loadcell Digital Weighbridge Active
              </span>
              <span className="text-slate-400 text-xs">• Pos Timbangan Utama Site Morowali</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
              <Scale className="w-7 h-7 text-indigo-400" />
              Pos Timbangan Jembatan Timbang (Truck Weighbridge Gate)
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Sistem otomatisasi pencatatan timbangan truk hauling (Gross, Tare, Nett), integrasi RFID auto-scan, moisture content, serta penerbitan e-Surat Jalan Timbangan resmi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLiveSensorsConnected(!isLiveSensorsConnected)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                isLiveSensorsConnected 
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              <Radio className={`w-4 h-4 ${isLiveSensorsConnected ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              <span>{isLiveSensorsConnected ? 'Sensor Digital Online' : 'Sensor Offline'}</span>
            </button>

            {onOpenAIDrawer && (
              <button
                onClick={onOpenAIDrawer}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analisis AI Timbangan</span>
              </button>
            )}
          </div>
        </div>

        {/* Key Metrics Tally */}
        <div className="pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-mono block">Total Tonase Ditimbang Hari Ini</span>
            <strong className="text-xl font-bold text-emerald-400 font-mono">{(totalTodayMT ?? 0).toLocaleString('id-ID')} MT</strong>
            <span className="text-[10px] text-slate-500 block">Saprolite + Limonite + OB</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-mono block">Jumlah Surat Jalan Terbit</span>
            <strong className="text-xl font-bold text-slate-100 font-mono">{completedTicketsCount} Truk</strong>
            <span className="text-[10px] text-emerald-400 block">▲ 100% Terverifikasi Digital</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-mono block">Rata-Rata Durasi Timbang</span>
            <strong className="text-xl font-bold text-indigo-300 font-mono">42 Detik</strong>
            <span className="text-[10px] text-slate-500 block">Auto RFID & Loadcell Camera</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[10px] uppercase font-mono block">Pelanggaran Overload</span>
            <strong className="text-xl font-bold text-rose-400 font-mono">{overloadCount} Kasus</strong>
            <span className="text-[10px] text-rose-300/80 block">Ditolak demi keamanan jalan</span>
          </div>
        </div>

        {/* Quick Cross-Module Integration Links */}
        {onNavigateModule && (
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Integrasi & Navigasi Cepat Modul Terkait:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigateModule('stockpile')}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                <Layers className="w-3 h-3" /> Stockpile & Blending Ore
              </button>
              <button
                onClick={() => onNavigateModule('gps_telemetry')}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-indigo-300 font-mono text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                <Truck className="w-3 h-3" /> Telemetri GPS Hauling
              </button>
              <button
                onClick={() => onNavigateModule('jetty')}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-blue-400 font-mono text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                <MapPin className="w-3 h-3" /> Pengapalan Jetty Port
              </button>
              <button
                onClick={() => onNavigateModule('operation')}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                <BarChart3 className="w-3 h-3" /> Pusat Kendali Operasi
              </button>
              <button
                onClick={() => onNavigateModule('dashboard')}
                className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-purple-300 font-mono text-[11px] font-bold flex items-center gap-1 transition-all"
              >
                <TrendingUp className="w-3 h-3" /> Dasbor Utama
              </button>
            </div>
          </div>
        )}
      </div>

      {/* TAB SELECTOR: TRAFFIC DISPATCH vs TERMINAL TIMBANGAN vs ANPR RFID vs CALIBRATION */}
      <div className="flex flex-col md:flex-row items-center gap-2 p-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg overflow-x-auto">
        <button
          onClick={() => setActiveTab('TRAFFIC_DISPATCH')}
          className={`w-full md:w-auto flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
            activeTab === 'TRAFFIC_DISPATCH'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Sliders className="w-4 h-4 text-amber-300" />
          <span>Traffic Dispatch & Anti-Antrean</span>
        </button>

        <button
          onClick={() => setActiveTab('TERMINAL')}
          className={`w-full md:w-auto flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
            activeTab === 'TERMINAL'
              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Scale className="w-4 h-4 text-indigo-300" />
          <span>Terminal Operator Timbangan & Surat Jalan</span>
        </button>

        <button
          onClick={() => setActiveTab('ANPR_RFID')}
          className={`w-full md:w-auto flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
            activeTab === 'ANPR_RFID'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Camera className="w-4 h-4 text-purple-300" />
          <span>Kamera ANPR & Scan RFID Truk</span>
        </button>

        <button
          onClick={() => setActiveTab('CALIBRATION')}
          className={`w-full md:w-auto flex-1 py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
            activeTab === 'CALIBRATION'
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
          }`}
        >
          <Activity className="w-4 h-4 text-amber-300" />
          <span>Kalibrasi & Metrologi Legal</span>
        </button>
      </div>

      {/* ==================================================================== */}
      {/* TAB 1: PENGATURAN KELUAR-MASUK & ANTI-ANtrean HAULING (TRAFFIC CONTROL) */}
      {/* ==================================================================== */}
      {activeTab === 'TRAFFIC_DISPATCH' && (
        <div className="space-y-6 animate-in fade-in">
          
          {/* Dispatcher Control Console Banner */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-100">
                      Sistem Kontrol Pengaturan Arus & Anti-Antrean Hauling
                    </h2>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      dispatchMode === 'PAUSED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {dispatchMode === 'PAUSED' ? '🛑 DISPATCH HOLD (TAHAN)' : `🟢 STAGGERED RELEASE (${releaseIntervalMin} MIN)`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Pengaturan ritme keluar-masuk kendaraan dari Pit ➔ Pos Timbangan ➔ Jalur Hauling ➔ Stockpile untuk mencegah penumpukan & bottleneck.
                  </p>
                </div>
              </div>

              {/* Action Buttons Console */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => handleReleaseNextTruck()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                >
                  <Play className="w-4 h-4 text-emerald-200 fill-emerald-200" />
                  <span>Rilis Truk Berikutnya dari Pit</span>
                </button>

                {dispatchMode === 'PAUSED' ? (
                  <button
                    onClick={handleResumeDispatch}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Lanjutkan Dispatch Normal</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePauseDispatch}
                    className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <Pause className="w-4 h-4 text-rose-200 fill-rose-200" />
                    <span>Tahan Dispatch (Hold Release)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Config Sliders & Interval Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Target Interval Staggered
                  </span>
                  <strong className="text-amber-300 font-bold">{releaseIntervalMin} Menit / Unit</strong>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  {[1.5, 3.0, 5.0].map((min) => (
                    <button
                      key={min}
                      onClick={() => {
                        setReleaseIntervalMin(min);
                        setStatusNotice(`Interval rilis truk disetel ke ${min} menit per unit.`);
                        setTimeout(() => setStatusNotice(null), 3000);
                      }}
                      className={`flex-1 py-1 rounded text-[10px] font-bold border transition-all ${
                        releaseIntervalMin === min
                          ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {min} Min
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" /> Auto-Reroute Bila Padat
                  </span>
                  <strong className={isAutoRerouteEnabled ? 'text-emerald-400' : 'text-slate-500'}>
                    {isAutoRerouteEnabled ? 'AKTIF (AI Routing)' : 'NONAKTIF'}
                  </strong>
                </div>
                <button
                  onClick={() => setIsAutoRerouteEnabled(!isAutoRerouteEnabled)}
                  className={`w-full py-1 rounded text-[10px] font-bold border transition-all mt-1 ${
                    isAutoRerouteEnabled
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {isAutoRerouteEnabled ? '✓ Auto-Pengalihan Ke Gate Kosong' : 'Atur Manual Manual'}
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-indigo-400" /> Beban Arus Keseluruhan
                  </span>
                  <strong className="text-emerald-400">LANCAR (32% Capacity)</strong>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mt-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-[32%]" />
                </div>
              </div>
            </div>
          </div>

          {/* 4 ZONE MONITORING CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* AREA 1: PIT FRONT LOADING */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-xs">1. Pit Front Loading</h3>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                  LANCAR
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Antrean Front Pit:</span>
                  <strong className="text-slate-100">2 Truk Waiting</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Excavator Active:</span>
                  <span className="text-indigo-300">EX-301 & EX-304</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Laju Pemuatan:</span>
                  <span className="text-emerald-400 font-bold">4.2 Min / Truk</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => handleReleaseNextTruck('DT-MOR-014')}
                  className="w-full py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-mono text-[11px] font-bold flex items-center justify-center gap-1"
                >
                  <ArrowRight className="w-3 h-3" /> Rilis Truk Pit Beta (DT-MOR-014)
                </button>
              </div>
            </div>

            {/* AREA 2: POS TIMBANGAN GATES */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-xs">2. Pos Timbangan Gate</h3>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                  BEBAS ANTREAN
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Gate POS 1:</span>
                  <strong className="text-indigo-300">Terisi (DT-MOR-012)</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Gate POS 2:</span>
                  <span className="text-emerald-400 font-bold">KOSONG (SIAP)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Gate POS 3 (OB):</span>
                  <span className="text-slate-300">Terisi (DT-MOR-025)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => handleRerouteTruck('DT-MOR-012')}
                  className="w-full py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-indigo-300 font-mono text-[11px] font-bold flex items-center justify-center gap-1"
                >
                  <Zap className="w-3 h-3 text-amber-300" /> Buka Express Gate POS 2
                </button>
              </div>
            </div>

            {/* AREA 3: JALUR HAULING MAIN CORRIDOR */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-xs">3. Jalur Hauling Koridor</h3>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                  SPACING AMAN
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Unit Aktif Berlayar:</span>
                  <strong className="text-slate-100">8 Truk On Road</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Kecepatan Rata-Rata:</span>
                  <span className="text-amber-300 font-bold">38 km/h (Limit 40)</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Jarak Iringan (Spacing):</span>
                  <span className="text-emerald-400 font-bold">350 Meter</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                  <span>Speed Governor Telemetri:</span>
                  <span className="text-emerald-400 font-bold">✓ AUTO LIMIT 40 KM/H</span>
                </div>
              </div>
            </div>

            {/* AREA 4: STOCKPILE & UNLOADING BAY */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-xs">4. Unloading Stockpile</h3>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">
                  LANCAR
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Stockpile ETO 1:</span>
                  <strong className="text-indigo-300">1 Unit Dumping</strong>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Stockpile EFO 2:</span>
                  <span className="text-emerald-400 font-bold">BAY KOSONG</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Jetty Port Unloader:</span>
                  <span className="text-slate-300">1 Unit Dumping</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => handleRerouteTruck('DT-MOR-014')}
                  className="w-full py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-700 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center gap-1"
                >
                  <MapPin className="w-3 h-3" /> Alihkan Ke Stockpile EFO 2
                </button>
              </div>
            </div>

          </div>

          {/* LIVE FLEET TRAFFIC CONTROL TABLE */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-sm">Monitor & Kontrol Arus Kendaraan Real-Time</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Menampilkan 5 Unit Terkoneksi GPS & RFID Sensor
              </span>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-xs text-left font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">No. Lambung Truk</th>
                    <th className="p-3">Driver & Kontraktor</th>
                    <th className="p-3">Lokasi Sekarang</th>
                    <th className="p-3">Tujuan Pengiriman</th>
                    <th className="p-3 text-center">Kecepatan</th>
                    <th className="p-3 text-center">Jarak Spacing</th>
                    <th className="p-3 text-center">Status Arus</th>
                    <th className="p-3 text-center">Tindakan Dispatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {fleetTraffic.map((unit) => (
                    <tr key={unit.id} className="hover:bg-slate-800/40 transition-all">
                      <td className="p-3 font-bold text-emerald-300 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-slate-400" />
                        <span>{unit.unitNo}</span>
                      </td>
                      <td className="p-3 text-slate-200">
                        <div>{unit.driver}</div>
                        <span className="text-[10px] text-slate-500 font-sans">{unit.origin}</span>
                      </td>
                      <td className="p-3 text-indigo-300 font-bold">{unit.currentZone}</td>
                      <td className="p-3 text-slate-300">➔ {unit.destination}</td>
                      <td className="p-3 text-center font-bold text-amber-300">
                        {unit.speedKmH} <span className="text-[10px] text-slate-500">km/h</span>
                      </td>
                      <td className="p-3 text-center text-slate-300">
                        {unit.spacingMeters > 0 ? `${unit.spacingMeters} m` : '-'}
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          unit.queueStatus === 'QUEUED'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {unit.queueStatus === 'QUEUED' ? '⏳ MENGANTRI' : '✓ LANCAR'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {unit.queueStatus === 'QUEUED' ? (
                            <button
                              onClick={() => handleReleaseNextTruck(unit.unitNo)}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px]"
                            >
                              Rilis Truk
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRerouteTruck(unit.unitNo)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-[10px] border border-slate-700"
                            >
                              Alihkan Rute
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 2: POS TIMBANGAN OPERATOR TERMINAL INTERFACE */}
      {/* ==================================================================== */}
      {activeTab === 'TERMINAL' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Digital Loadcell Terminal Controller (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-slate-100 text-sm">Terminal Timbang Operator & Sensor Telemetri Live</h3>
            </div>
            <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-[10px] font-mono font-bold">
              Scale Calibration ID: JTB-MOR-2026-A1
            </span>
          </div>

          {/* Big Digital Weight Screen */}
          <div className="p-6 bg-slate-950 rounded-2xl border-2 border-indigo-500/50 shadow-inner space-y-4">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                SENSOR LOADCELL WEIGHBRIDGE #1 (CAPACITY 80 TON)
              </span>
              <span className="text-emerald-400 font-bold">CALIBRATED & STABLE</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block uppercase">Gross Weight (Kotor)</span>
                <span className="text-2xl font-black text-amber-300 font-mono">{(simGrossWeight ?? 0).toLocaleString('id-ID')} <span className="text-xs text-slate-500">kg</span></span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-mono block uppercase">Tare Weight (Kosong)</span>
                <span className="text-2xl font-black text-slate-300 font-mono">{(simTareWeight ?? 0).toLocaleString('id-ID')} <span className="text-xs text-slate-500">kg</span></span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-indigo-500/50 bg-indigo-950/30">
                <span className="text-[10px] text-indigo-300 font-mono block uppercase font-bold">NET ORE WEIGHT</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{(simNetWeightKg ?? 0).toLocaleString('id-ID')} <span className="text-xs text-slate-400">kg</span></span>
                <span className="text-xs text-emerald-300 font-bold block mt-0.5">({simNetWeightMT} MT)</span>
              </div>
            </div>

            {/* Visual Overload Safety Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>Kapasitas Sumbu Jalan (Max Safe GVW: 36.0 MT)</span>
                <span className={simNetWeightMT > 36.0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {simNetWeightMT > 36.0 ? '⚠️ OVERLOADED (+ ' + (simNetWeightMT - 36.0).toFixed(1) + ' MT)' : '✓ AMAN (SAFE GVW)'}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                <div 
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    simNetWeightMT > 36.0 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (simNetWeightMT / 40.0) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form Entry Parameters for New Ticket */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Pos / Lokasi Timbangan Gate:</label>
              <select
                value={simGate}
                onChange={(e) => setSimGate(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-bold focus:border-indigo-500"
              >
                <option value="POS 1 (Pit-to-Stockpile)">POS 1 (Pit-to-Stockpile)</option>
                <option value="POS 2 (Stockpile-to-Jetty)">POS 2 (Stockpile-to-Jetty)</option>
                <option value="POS 3 (OB Dump Site)">POS 3 (OB Dump Site)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Nomor Lambung Truk (RFID Auto):</label>
              <input
                type="text"
                value={simTruckUnit}
                onChange={(e) => setSimTruckUnit(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-indigo-300 font-bold focus:border-indigo-500"
                placeholder="Contoh: DT-MOR-014"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Nama Driver Dump Truck:</label>
              <input
                type="text"
                value={simDriverName}
                onChange={(e) => setSimDriverName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Perusahaan Kontraktor Hauling:</label>
              <input
                type="text"
                value={simContractor}
                onChange={(e) => setSimContractor(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Jenis Material Ore / Waste:</label>
              <select
                value={simMaterial}
                onChange={(e) => setSimMaterial(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-bold focus:border-indigo-500"
              >
                <option value="Saprolite High Grade (>=1.8% Ni)">Saprolite High Grade (&gt;=1.8% Ni)</option>
                <option value="Saprolite Mid Grade (1.5-1.79% Ni)">Saprolite Mid Grade (1.5-1.79% Ni)</option>
                <option value="Limonite HPAL Feed">Limonite HPAL Feed</option>
                <option value="Overburden (OB)">Overburden (OB Waste)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Kadar Ni (%) & MC Moisture (%):</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  step="0.01"
                  value={simNiGrade}
                  onChange={(e) => setSimNiGrade(Number(e.target.value))}
                  className="w-1/2 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-emerald-400 font-bold"
                  placeholder="Ni %"
                />
                <input
                  type="number"
                  step="0.1"
                  value={simMoisture}
                  onChange={(e) => setSimMoisture(Number(e.target.value))}
                  className="w-1/2 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-amber-300 font-bold"
                  placeholder="MC %"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Lokasi Asal (Origin):</label>
              <input
                type="text"
                value={simOrigin}
                onChange={(e) => setSimOrigin(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Lokasi Tujuan (Destination):</label>
              <input
                type="text"
                value={simDestination}
                onChange={(e) => setSimDestination(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Process Weighing Button */}
          <button
            onClick={handleProcessWeighing}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider"
          >
            <Printer className="w-4 h-4" />
            <span>Proses Timbang & Terbitkan Surat Jalan (E-Ticket)</span>
          </button>
        </div>

        {/* Right Column: Live Printable E-Ticket Slip Preview & Camera Feed (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Automatic License Plate Recognition Camera View */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-200 flex items-center gap-2">
                <Camera className="w-4 h-4 text-emerald-400" />
                ANPR Camera Gate #1 Snapshot
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                Plate Read 99.4%
              </span>
            </div>

            <div className="relative h-36 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:12px_12px] opacity-30"></div>
              <div className="text-center z-10 space-y-1">
                <Truck className="w-12 h-12 text-indigo-400 mx-auto opacity-80" />
                <span className="px-3 py-1 bg-amber-400 text-slate-950 font-mono font-extrabold text-sm rounded border border-amber-300 tracking-widest block">
                  {simTruckUnit}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">Driver Verified: {simDriverName}</span>
              </div>
            </div>
          </div>

          {/* E-Ticket Preview Card */}
          {selectedTicketForPrint ? (
            <div className="p-5 bg-slate-950 rounded-2xl border border-emerald-500/50 shadow-xl space-y-4 text-xs font-mono">
              <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold block uppercase">SURAT JALAN TIMBANGAN RESMI</span>
                  <h4 className="font-bold text-slate-100 text-sm">{selectedTicketForPrint.ticketNo}</h4>
                </div>
                <QrCode className="w-10 h-10 text-slate-200" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div><span className="text-slate-500 block">Waktu:</span> {selectedTicketForPrint.timestampIn}</div>
                <div><span className="text-slate-500 block">Unit DT:</span> <strong className="text-indigo-300">{selectedTicketForPrint.truckUnitNo}</strong></div>
                <div><span className="text-slate-500 block">Driver:</span> {selectedTicketForPrint.driverName}</div>
                <div><span className="text-slate-500 block">Kontraktor:</span> {selectedTicketForPrint.contractorName}</div>
                <div><span className="text-slate-500 block">Asal:</span> {selectedTicketForPrint.originLocation}</div>
                <div><span className="text-slate-500 block">Tujuan:</span> {selectedTicketForPrint.destinationLocation}</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1 text-slate-200">
                <div className="flex justify-between">
                  <span>Gross Weight:</span>
                  <strong>{(selectedTicketForPrint.grossWeightKg ?? 0).toLocaleString('id-ID')} kg</strong>
                </div>
                <div className="flex justify-between">
                  <span>Tare Weight:</span>
                  <strong>{(selectedTicketForPrint.tareWeightKg ?? 0).toLocaleString('id-ID')} kg</strong>
                </div>
                <div className="flex justify-between text-emerald-400 border-t border-slate-800 pt-1 font-bold">
                  <span>Nett Ore Weight:</span>
                  <span>{(selectedTicketForPrint.netWeightKg ?? 0).toLocaleString('id-ID')} kg ({selectedTicketForPrint.netWeightMT} MT)</span>
                </div>
              </div>

              {selectedTicketForPrint.notes && (
                <p className="text-[10px] text-slate-400 italic bg-slate-900 p-2 rounded border border-slate-800">
                  Catatan: {selectedTicketForPrint.notes}
                </p>
              )}

              <button
                onClick={() => alert(`Mencetak E-Ticket Surat Jalan ${selectedTicketForPrint.ticketNo} ke printer thermal Pos Timbangan...`)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4 text-emerald-400" />
                <span>Cetak Ulang Ticket Thermal</span>
              </button>
            </div>
          ) : (
            <div className="p-8 bg-slate-900/50 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-xs">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <span>Proses penimbangan di sebelah kiri untuk melihat preview e-Surat Jalan Timbangan.</span>
            </div>
          )}

        </div>

      </div>

      {/* TABLE HISTORY LOG TIKET TIMBANGAN */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-base">Riwayat Transaksi Surat Jalan Timbangan (Log Real-Time)</h3>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Tiket / Truk / Driver..."
                className="bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <select
              value={gateFilter}
              onChange={(e) => setGateFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 font-bold focus:outline-none"
            >
              <option value="ALL">Semua Pos Gate</option>
              <option value="POS 1 (Pit-to-Stockpile)">POS 1 (Pit-to-Stockpile)</option>
              <option value="POS 2 (Stockpile-to-Jetty)">POS 2 (Stockpile-to-Jetty)</option>
              <option value="POS 3 (OB Dump Site)">POS 3 (OB Dump Site)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[10px]">
              <tr>
                <th className="p-3">No. Surat Jalan</th>
                <th className="p-3">Waktu</th>
                <th className="p-3">No. Lambung Truk</th>
                <th className="p-3">Kontraktor & Driver</th>
                <th className="p-3">Jenis Material</th>
                <th className="p-3">Asal & Tujuan</th>
                <th className="p-3 text-right">Gross (kg)</th>
                <th className="p-3 text-right">Tare (kg)</th>
                <th className="p-3 text-right">Nett (MT)</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40 transition-all">
                  <td className="p-3 font-bold text-indigo-300">{t.ticketNo}</td>
                  <td className="p-3 text-slate-400">{t.timestampIn}</td>
                  <td className="p-3 font-bold text-slate-100">{t.truckUnitNo}</td>
                  <td className="p-3 text-slate-300">
                    <div>{t.driverName}</div>
                    <span className="text-[10px] text-slate-500 font-sans">{t.contractorName}</span>
                  </td>
                  <td className="p-3 text-slate-300">{t.materialType}</td>
                  <td className="p-3 text-slate-400 text-[11px]">
                    <div>{t.originLocation}</div>
                    <div className="text-emerald-400 font-bold">➔ {t.destinationLocation}</div>
                  </td>
                  <td className="p-3 text-right text-slate-300">{(t.grossWeightKg ?? 0).toLocaleString('id-ID')}</td>
                  <td className="p-3 text-right text-slate-400">{(t.tareWeightKg ?? 0).toLocaleString('id-ID')}</td>
                  <td className="p-3 text-right font-bold text-emerald-400 text-sm">{t.netWeightMT} MT</td>
                  <td className="p-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      t.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {t.status === 'COMPLETED' ? 'COMPLETED' : 'OVERLOAD REJECT'}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => setSelectedTicketForPrint(t)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                      title="Lihat Ticket"
                    >
                      <FileText className="w-4 h-4 text-emerald-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 3: KAMERA ANPR PLAT NOMOR & RFID SCANNER TRUK HAULING */}
      {/* ==================================================================== */}
      {activeTab === 'ANPR_RFID' && (
        <div className="space-y-6 animate-in fade-in text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Camera className="w-4 h-4 text-purple-400" /> Optical Camera ANPR (Automatic Number Plate Recognition) & RFID Tag Logs
                </h3>
                <p className="text-slate-400 text-[11px]">Verifikasi otomatis plat nomor truk hauling dan pencocokan ID RFID Driver sebelum penimbangan</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold font-mono">
                AI Vision Rate: 99.4%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-slate-200 font-bold border-b border-slate-800 pb-2">
                  <span>POS 1 (Gate In) - Dual ANPR Camera</span>
                  <span className="text-emerald-400 text-[10px] font-mono">ONLINE (1080p 60fps)</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-300 font-mono space-y-1 text-[11px]">
                  <div>Truk Terdeteksi: <strong className="text-amber-300">DT-MOR-012 (Plat B 9812 XRF)</strong></div>
                  <div>Status RFID Tag: <strong className="text-emerald-400 font-bold">VERIFIED (Tag-ID: 8841-RFID-2026)</strong></div>
                  <div>Match Score: <strong className="text-purple-300">99.8% Match</strong></div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-slate-200 font-bold border-b border-slate-800 pb-2">
                  <span>POS 2 (Gate Out Jetty) - Dual ANPR Camera</span>
                  <span className="text-emerald-400 text-[10px] font-mono">ONLINE (1080p 60fps)</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-300 font-mono space-y-1 text-[11px]">
                  <div>Truk Terdeteksi: <strong className="text-amber-300">DT-MOR-018 (Plat L 7721 MOR)</strong></div>
                  <div>Status RFID Tag: <strong className="text-emerald-400 font-bold">VERIFIED (Tag-ID: 9912-RFID-2026)</strong></div>
                  <div>Match Score: <strong className="text-purple-300">99.5% Match</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TAB 4: KALIBRASI LOADCELL & LEGAL METROLOGI AUDIT */}
      {/* ==================================================================== */}
      {activeTab === 'CALIBRATION' && (
        <div className="space-y-6 animate-in fade-in text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" /> Sensus Kalibrasi Sensitivitas Loadcell & Sertifikat Legal Metrologi
                </h3>
                <p className="text-slate-400 text-[11px]">Uji akurasi sensor jembatan timbang 80 Ton & sertifikat tera ulang resmi pemerintah</p>
              </div>

              <button
                onClick={() => alert("Menginisiasi prosedur pengujian beban tera anak timbangan standar 20 Ton...")}
                className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" /> Uji Akurasi Loadcell
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Kode Timbangan</th>
                    <th className="py-2.5 px-3">Kapasitas Max</th>
                    <th className="py-2.5 px-3">Deviasi Toleransi</th>
                    <th className="py-2.5 px-3">Tanggal Kalibrasi Terakhir</th>
                    <th className="py-2.5 px-3">Expired Sertifikat Tera</th>
                    <th className="py-2.5 px-3">Auditor Metrologi</th>
                    <th className="py-2.5 px-3">Status Kelayakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-bold text-amber-300">POS 1 - Pit Weighbridge A</td>
                    <td className="py-3 px-3 text-slate-200">80.000 kg (80 Ton)</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">± 5 kg (0.006%)</td>
                    <td className="py-3 px-3 text-slate-400">2026-06-15</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">2027-06-15</td>
                    <td className="py-3 px-3 font-sans text-slate-300">Dinas Metrologi Morowali</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                        TERA_PASSED_LEGAL
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-bold text-amber-300">POS 2 - Jetty Weighbridge B</td>
                    <td className="py-3 px-3 text-slate-200">80.000 kg (80 Ton)</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">± 8 kg (0.010%)</td>
                    <td className="py-3 px-3 text-slate-400">2026-05-10</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">2027-05-10</td>
                    <td className="py-3 px-3 font-sans text-slate-300">Dinas Metrologi Morowali</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                        TERA_PASSED_LEGAL
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
