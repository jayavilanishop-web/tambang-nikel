import React, { useState } from 'react';
import { 
  Truck, 
  Fuel, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench, 
  UserCheck, 
  Plus, 
  Search, 
  Activity, 
  ShieldCheck, 
  Clock, 
  Cpu, 
  Disc, 
  BatteryCharging, 
  History, 
  BarChart3, 
  Sliders, 
  Droplet, 
  Settings2, 
  TrendingUp, 
  AlertOctagon, 
  FileText,
  Hammer,
  CheckSquare,
  Check,
  Database,
  DollarSign,
  Layers,
  ShieldAlert,
  ListChecks,
  FileSpreadsheet,
  FolderTree,
  Users,
  Radio,
  MapPin,
  Zap,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { HeavyEquipment, Language } from '../../types';

interface FleetManagementModuleProps {
  equipment: HeavyEquipment[];
  language: Language;
  onUpdateEquipmentStatus: (id: string, status: HeavyEquipment['status']) => void;
  initialTab?: 
    | 'dasbor_maintenance'
    | 'master_data_maintenance'
    | 'dasbor_workshop'
    | 'master_data_workshop'
    | 'dasbor_fleet'
    | 'master_data_fleet'
    | 'dasbor_dispatcher'
    | 'master_data_dispatcher'
    | 'fleet_telemetry'
    | 'maintenance_pm_cm'
    | 'fuel_b35_management'
    | 'spareparts_tyres'
    | 'otr_tyre_tracking'
    | 'p2h_daily_inspection'
    | 'machine_history'
    | 'kpi_availability';
}

export const FleetManagementModule: React.FC<FleetManagementModuleProps> = ({
  equipment,
  language,
  onUpdateEquipmentStatus,
  initialTab = 'dasbor_maintenance'
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dasbor_maintenance'
    | 'master_data_maintenance'
    | 'dasbor_workshop'
    | 'master_data_workshop'
    | 'dasbor_fleet'
    | 'master_data_fleet'
    | 'dasbor_dispatcher'
    | 'master_data_dispatcher'
    | 'fleet_telemetry'
    | 'maintenance_pm_cm'
    | 'fuel_b35_management'
    | 'spareparts_tyres'
    | 'otr_tyre_tracking'
    | 'p2h_daily_inspection'
    | 'machine_history'
    | 'kpi_availability'
  >(initialTab);

  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isSpkModalOpen, setIsSpkModalOpen] = useState(false);
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [isP2hModalOpen, setIsP2hModalOpen] = useState(false);
  const [selectedUnitForStatus, setSelectedUnitForStatus] = useState<any | null>(null);

  // Form Inputs
  const [spkUnitCode, setSpkUnitCode] = useState('DT-1001');
  const [spkType, setSpkType] = useState('PM (Preventive Maintenance)');
  const [spkComponent, setSpkComponent] = useState('');

  const [fuelUnitCode, setFuelUnitCode] = useState('DT-1001');
  const [fuelLitersInput, setFuelLitersInput] = useState<number>(450);

  const [p2hUnitCode, setP2hUnitCode] = useState('EX-2001');
  const [p2hEngineOil, setP2hEngineOil] = useState('GOOD');
  const [p2hHydraulic, setP2hHydraulic] = useState('GOOD');
  const [p2hBrakes, setP2hBrakes] = useState('GOOD');
  const [p2hNotes, setP2hNotes] = useState('');

  // B35 Fuel Station Refueling Logs
  const [refuelingLogs, setRefuelingLogs] = useState([
    { id: 'FL-8801', timestamp: '04 Agu 08:30', unitCode: 'DT-1001', fuelTruck: 'FT-6001', volumeL: 550, operator: 'Eko Prasetyo', fuelType: 'Biodiesel B35' },
    { id: 'FL-8802', timestamp: '04 Agu 07:15', unitCode: 'EX-2001', fuelTruck: 'FT-6001', volumeL: 1200, operator: 'Budi Santoso', fuelType: 'Biodiesel B35' },
    { id: 'FL-8803', timestamp: '03 Agu 22:10', unitCode: 'DZ-3001', fuelTruck: 'FT-6001', volumeL: 480, operator: 'Agus Wijaya', fuelType: 'Biodiesel B35' }
  ]);

  // OTR Tyre Tread Depth Tracking Dataset
  const otrTyreTrackingList = [
    { serialNo: 'TYRE-BS-2701', brandModel: 'Bridgestone 27.00R49 V-Steel', assignedUnit: 'DT-1001', position: 'Front Left (FL)', installedHm: 8500, currentHm: 12400, treadDepthMm: 62, originalTreadMm: 95, costPerHmUsd: 1.85, condition: 'GOOD' },
    { serialNo: 'TYRE-BS-2702', brandModel: 'Bridgestone 27.00R49 V-Steel', assignedUnit: 'DT-1001', position: 'Front Right (FR)', installedHm: 8500, currentHm: 12400, treadDepthMm: 58, originalTreadMm: 95, costPerHmUsd: 1.85, condition: 'GOOD' },
    { serialNo: 'TYRE-MI-2703', brandModel: 'Michelin 27.00R49 X-Traction', assignedUnit: 'DT-1002', position: 'Rear Left Outer', installedHm: 6200, currentHm: 11900, treadDepthMm: 28, originalTreadMm: 95, costPerHmUsd: 2.10, condition: 'REPLACEMENT_RECOMMENDED' }
  ];

  // P2H Inspection Log
  const [p2hLogsList, setP2hLogsList] = useState([
    { id: 'P2H-901', timestamp: '04 Agu 06:45', unitCode: 'EX-2001', operator: 'Budi Santoso', shift: 'Shift 1 (Day)', engineOil: 'PASS', hydraulic: 'PASS', brakeSteering: 'PASS', status: 'FIT_TO_OPERATE' },
    { id: 'P2H-902', timestamp: '04 Agu 06:50', unitCode: 'DT-1001', operator: 'Eko Prasetyo', shift: 'Shift 1 (Day)', engineOil: 'PASS', hydraulic: 'PASS', brakeSteering: 'PASS', status: 'FIT_TO_OPERATE' },
    { id: 'P2H-903', timestamp: '04 Agu 07:00', unitCode: 'DZ-3001', operator: 'Agus Wijaya', shift: 'Shift 1 (Day)', engineOil: 'WARNING', hydraulic: 'LEAK_DETECTED', brakeSteering: 'PASS', status: 'WORKSHOP_REQUIRED' }
  ]);

  // Comprehensive Fleet Dataset with all requested machinery types
  const fullEquipmentFleet = [
    { id: 'EQ-EX-001', code: 'EX-2001', type: 'Excavator Heavy', modelName: 'Komatsu PC2000-8', category: 'Excavator', locationPit: 'Pit Alpha - Front 1', assignedOperator: 'Budi Santoso', engineHoursTotal: 14850, fuelLiterPerHour: 112, healthScorePercent: 92, status: 'OPERATIONAL', paPct: 94.5, maPct: 96.2, utPct: 88.0, mtbfHr: 185, mttrHr: 4.2 },
    { id: 'EQ-DT-001', code: 'DT-1001', type: 'Dump Truck Heavy', modelName: 'Caterpillar 777E (90 Ton)', category: 'Dump Truck', locationPit: 'Pit Alpha - Haul Road', assignedOperator: 'Eko Prasetyo', engineHoursTotal: 12400, fuelLiterPerHour: 88, healthScorePercent: 88, status: 'OPERATIONAL', paPct: 91.0, maPct: 93.5, utPct: 85.2, mtbfHr: 142, mttrHr: 5.1 },
    { id: 'EQ-DZ-001', code: 'DZ-3001', type: 'Bulldozer Heavy', modelName: 'CAT D10T2 Heavy Dozer', category: 'Dozer / Bulldozer', locationPit: 'Pit Beta - Waste Dump', assignedOperator: 'Agus Wijaya', engineHoursTotal: 9800, fuelLiterPerHour: 75, healthScorePercent: 78, status: 'MAINTENANCE', paPct: 82.0, maPct: 85.0, utPct: 76.0, mtbfHr: 95, mttrHr: 8.5 },
    { id: 'EQ-LD-001', code: 'WL-4001', type: 'Wheel Loader', modelName: 'Komatsu WA600-6', category: 'Loader', locationPit: 'Stockpile ETO Alpha', assignedOperator: 'Dedi Kurniawan', engineHoursTotal: 11200, fuelLiterPerHour: 62, healthScorePercent: 95, status: 'OPERATIONAL', paPct: 95.0, maPct: 97.0, utPct: 90.1, mtbfHr: 210, mttrHr: 3.8 },
    { id: 'EQ-LV-001', code: 'LV-5001', type: 'Light Vehicle 4x4', modelName: 'Toyota Hilux Single Cab 2.8', category: 'Light Vehicle', locationPit: 'Mine Site Area - Pit Supervisor', assignedOperator: 'Hendra (Mine Supervisor)', engineHoursTotal: 4500, fuelLiterPerHour: 12, healthScorePercent: 96, status: 'OPERATIONAL', paPct: 98.0, maPct: 98.5, utPct: 92.0, mtbfHr: 450, mttrHr: 1.5 },
    { id: 'EQ-FT-001', code: 'FT-6001', type: 'Fuel Truck Tanker', modelName: 'Hino 500 FM 280 (20.000 L)', category: 'Fuel Truck', locationPit: 'Pit Mobile Refueling Line', assignedOperator: 'Rahmat Hidayat', engineHoursTotal: 6800, fuelLiterPerHour: 22, healthScorePercent: 91, status: 'OPERATIONAL', paPct: 96.0, maPct: 97.2, utPct: 89.5, mtbfHr: 310, mttrHr: 2.8 },
    { id: 'EQ-WT-001', code: 'WT-7001', type: 'Water Truck Dust Control', modelName: 'Nissan Diesel CWB (30.000 L)', category: 'Water Truck', locationPit: 'Main Haul Road Dust Suppression', assignedOperator: 'Syaiful Bahri', engineHoursTotal: 8900, fuelLiterPerHour: 28, healthScorePercent: 84, status: 'OPERATIONAL', paPct: 89.5, maPct: 92.0, utPct: 82.4, mtbfHr: 165, mttrHr: 4.0 }
  ];

  // Maintenance Work Orders Dataset (PM, CM, Predictive, Workshop Repair)
  const maintenanceWorkOrders = [
    { id: 'WO-2026-0412', unitCode: 'EX-2001', type: 'PM (Preventive Maintenance)', priority: 'SCHEDULED', component: 'Engine Oil & Filter 250 Hours PM', workshopBay: 'Bay 1 - Main Central Workshop', mechanicLead: 'Bambang (Sr. Heavy Mechanic)', status: 'IN_PROGRESS', progressPct: 65, estCompletion: 'Hari ini 16:30' },
    { id: 'WO-2026-0413', unitCode: 'DZ-3001', type: 'CM (Corrective Maintenance)', priority: 'HIGH_BREAKDOWN', component: 'Hydraulic Cylinder Seal Leaking Repair', workshopBay: 'Bay 3 - Heavy Repair Workshop', mechanicLead: 'Sutrisno (Hydraulic Specialist)', status: 'OPEN', progressPct: 20, estCompletion: 'Besok 10:00' },
    { id: 'WO-2026-0414', unitCode: 'DT-1001', type: 'Predictive Maintenance (AI Sensor)', priority: 'PREDICTIVE_WARNING', component: 'Differential Oil Temperature Anomaly Detect', workshopBay: 'Pit Mobile Service Truck 2', mechanicLead: 'Hadi (Diagnostic Tech)', status: 'SCHEDULED', progressPct: 0, estCompletion: '04 Agu 08:00' }
  ];

  // Spare Parts, Tyres & Battery Inventory
  const sparePartsInventory = [
    { itemCode: 'TYRE-2700R49', description: 'OTR Tyre 27.00R49 Bridgestone (Dump Truck 777E)', category: 'Tyre OTR', stockQty: 18, minStock: 8, unitPriceUsd: 14200, status: 'HEALTHY' },
    { itemCode: 'BATT-24V-200AH', description: 'Heavy Duty Maintenance Free Battery 24V 200Ah', category: 'Battery', stockQty: 12, minStock: 5, unitPriceUsd: 480, status: 'HEALTHY' },
    { itemCode: 'FLTR-HYD-KOM', description: 'Main Hydraulic Filter Element Komatsu PC2000', category: 'Sparepart Filter', stockQty: 42, minStock: 15, unitPriceUsd: 220, status: 'HEALTHY' },
    { itemCode: 'GET-TOOTH-PC2000', description: 'Bucket Tooth Tiger Type PC2000 Heavy Duty', category: 'Ground Engaging Tools', stockQty: 8, minStock: 10, unitPriceUsd: 650, status: 'LOW_STOCK_REORDER' }
  ];

  // Machine History Log
  const machineHistoryLogs = [
    { timestamp: '03 Agu 2026 07:15', unitCode: 'EX-2001', eventType: 'Daily Inspection (P2H)', notes: 'Sistem hidrolik normal, oli cukup, tidak ada kebocoran.', loggedBy: 'Operator Budi Santoso' },
    { timestamp: '02 Agu 2026 21:30', unitCode: 'DT-1001', eventType: 'Refueling B35', notes: 'Pengisian BBM Biodiesel B35 sejumlah 650 Liter.', loggedBy: 'Fuel Truck Crew FT-6001' },
    { timestamp: '01 Agu 2026 14:00', unitCode: 'DZ-3001', eventType: 'CM Repair Completed', notes: 'Penggantian track shoe bolt & retightening torque.', loggedBy: 'Workshop Bay 2' }
  ];

  const filteredFleet = fullEquipmentFleet.filter(e => {
    const matchType = filterType === 'ALL' || e.category === filterType || e.type === filterType;
    const matchSearch = e.code.toLowerCase().includes(searchTerm.toLowerCase()) || e.modelName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const totalFuelLitersToday = equipment.reduce((acc, e) => acc + e.fuelTotalTodayLiters, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Heavy Equipment Fleet & Maintenance Telemetry
            </span>
            <span className="text-slate-400 text-xs">• ISO 14224 Mining Maintenance Standards</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Manajemen Alat Berat, Perawatan & Konsumsi BBM
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pengawasan armada tambang nikel: Excavator, Dozer, Wheel Loader, Dump Truck, LV, Fuel Truck & Water Truck. Dilengkapi PM/CM Workshop, persediaan Sparepart, Ban OTR, Battery, serta kalkulasi KPI PA, MA, UT, MTBF, dan MTTR.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <Fuel className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <span className="text-slate-400 block text-[10px]">Konsumsi BBM Biodiesel B35 Today:</span>
            <strong className="text-slate-100 font-mono text-base font-bold">14,280 Liter</strong>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'dasbor_maintenance', label: '📊 Dasbor Maintenance Manager', icon: BarChart3 },
          { id: 'master_data_maintenance', label: '🗄️ Master Data Maintenance', icon: Database },
          { id: 'dasbor_workshop', label: '🔧 Dasbor Workshop Manager', icon: Wrench },
          { id: 'master_data_workshop', label: '🗄️ Master Data Workshop Manager', icon: FolderTree },
          { id: 'dasbor_fleet', label: '🚛 Dasbor Fleet Manager', icon: Truck },
          { id: 'master_data_fleet', label: '🗄️ Master Data Fleet Manager', icon: Database },
          { id: 'dasbor_dispatcher', label: '📡 Dasbor Dispatcher Manager', icon: Radio },
          { id: 'master_data_dispatcher', label: '🗄️ Master Data Dispatcher', icon: FolderTree },
          { id: 'fleet_telemetry', label: 'Fleet Roster & Telemetry', icon: Truck },
          { id: 'maintenance_pm_cm', label: 'Work Orders (PM / CM / Workshop)', icon: Wrench },
          { id: 'fuel_b35_management', label: 'Refueling BBM Solar B35', icon: Fuel },
          { id: 'spareparts_tyres', label: 'Sparepart, Tyre & Battery', icon: Disc },
          { id: 'otr_tyre_tracking', label: 'OTR Tyre Tread Tracking', icon: Disc },
          { id: 'p2h_daily_inspection', label: 'Pemeriksaan Harian (P2H)', icon: CheckSquare },
          { id: 'machine_history', label: 'Machine Repair History', icon: History },
          { id: 'kpi_availability', label: 'KPI Metrics (PA / MA / UT / MTBF / MTTR)', icon: BarChart3 }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* VIEW 0: DASBOR MAINTENANCE MANAGER (PLANT & FLEET EXECUTIVE DASHBOARD) */}
      {activeTab === 'dasbor_maintenance' && (
        <div className="space-y-6 text-xs">
          {/* Executive Maintenance KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Physical Availability (PA)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-emerald-400 font-mono">92.8% <span className="text-xs font-normal text-slate-400">(Target ≥ 90%)</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">↑ 1.8% vs Target KTT Tambang</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Mechanical Availability (MA)</span>
                <Wrench className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl font-black text-sky-300 font-mono">95.4% <span className="text-xs font-normal text-slate-400">(Target ≥ 95%)</span></div>
              <p className="text-[10px] text-sky-400 mt-1 font-bold">Kesiapan Mekanikal Terjaga</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">MTBF / MTTR Index</span>
                <Clock className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-black text-indigo-300 font-mono">185 Hr <span className="text-xs font-normal text-slate-400">/ 3.8 Hr MTTR</span></div>
              <p className="text-[10px] text-slate-400 mt-1">Rata-rata Perbaikan Cepat & Andal</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">PM Service Compliance %</span>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-black text-amber-300 font-mono">96.5% <span className="text-xs font-normal text-slate-400">On-Time</span></div>
              <p className="text-[10px] text-amber-400 mt-1 font-bold">128 PM Checklists Executed This Month</p>
            </div>
          </div>

          {/* Workshop Active Breakdown & Service Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  Status Workshop Active Repairs & Work Orders (SPK Bengkel Site)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-400 font-bold">3 Breakdown Active</span>
              </div>

              <div className="space-y-3">
                {[
                  { code: 'DZ-3001', name: 'CAT D10T2 Heavy Dozer', type: 'CM Breakdown', bay: 'Bay 3 - Heavy Workshop', cause: 'Kebocoran Seal Cylinder Lift Blade', progress: 40, tech: 'Sutrisno (Hydraulic Lead)', eta: 'Hari ini 18:00', priority: 'HIGH' },
                  { code: 'EX-2001', name: 'Komatsu PC2000-8 Excavator', type: 'PM 250 Hours', bay: 'Bay 1 - Main Central Bay', cause: 'Penggantian Filter Oli & Sample SOS Engine', progress: 75, tech: 'Bambang (Sr. Heavy Mechanic)', eta: 'Hari ini 16:30', priority: 'SCHEDULED' },
                  { code: 'DT-1002', name: 'Caterpillar 777E Dump Truck', type: 'Predictive CM', bay: 'Bay 4 - Tyre & Brake Bay', cause: 'Fluktuasi Suhu Brake Cooling Circuit', progress: 20, tech: 'Hadi (Diagnostic Tech)', eta: 'Besok 10:00', priority: 'MEDIUM' }
                ].map((wo, i) => (
                  <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-xs">{wo.code}</span>
                        <strong className="text-slate-100 font-sans text-xs">{wo.name}</strong>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          wo.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-sky-500/20 text-sky-400'
                        }`}>{wo.type}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">ETA: <strong className="text-slate-200">{wo.eta}</strong></span>
                    </div>

                    <p className="text-[11px] text-slate-300">
                      <span className="text-slate-400">Lokasi/Bay:</span> {wo.bay} • <span className="text-slate-400">Penyebab:</span> {wo.cause}
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex-1 bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${wo.progress}%` }}></div>
                      </div>
                      <span className="font-mono font-bold text-amber-400 text-[10px]">{wo.progress}%</span>
                      <span className="text-[10px] text-slate-400">Lead: {wo.tech}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* OilSOS & Health Condition Monitor */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-400" /> Analisa SOS Laboratorium Oli</span>
                <span className="text-[10px] text-slate-400">Sampel Pekan Ini</span>
              </h3>

              <div className="space-y-3 font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-200 font-bold">EX-2001 Engine SOS</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">NORMAL</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">Soot 0.2%, Iron 12 ppm, Viskositas SAE 15W-40 stabil.</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-200 font-bold">DZ-3001 Final Drive SOS</span>
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[9px] font-bold">CAUTION</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">Pertumbuhan Copper 42 ppm. Dijadwalkan flush & drain oli.</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-200 font-bold">DT-1003 Transmission SOS</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">NORMAL</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-sans">Tanpa kontaminasi air / glycol. Partikel logam &lt; 5 ppm.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1: MASTER DATA MAINTENANCE (EQUIPMENT, COMPONENTS, STRATEGIES & WORKSHOP) */}
      {activeTab === 'master_data_maintenance' && (
        <div className="space-y-6 text-xs">
          {/* Header Banner Master Data */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-amber-400" />
                Master Data Maintenance Manager & Plant Management
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Katalog terpusat spesifikasi unit alat berat, hierarki komponen sub-sistem ISO 14224, strategi PM 250-2000, SOP troubleshooting failure codes, serta master fasilitas workshop bay.
              </p>
            </div>
            <button className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-2 text-xs transition-colors shrink-0">
              <Plus className="w-4 h-4" />
              <span>Tambah Register Master Unit</span>
            </button>
          </div>

          {/* Sub-Kategori Master Data Maintenance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Master Register Heavy Equipment Fleet */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-emerald-400" /> Master Unit Heavy Equipment Fleet</span>
                <span className="text-[10px] text-slate-400 font-mono">28 Registered Units</span>
              </h3>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px]">
                      <th className="py-2">Kode Unit</th>
                      <th className="py-2">Model & Brand</th>
                      <th className="py-2">Engine Model</th>
                      <th className="py-2">Criticality</th>
                      <th className="py-2 text-right">Standard LPH</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 text-slate-200 font-mono">
                    {[
                      { code: 'EX-2001', model: 'Komatsu PC2000-8', engine: 'Komatsu SDA12V140E', crit: 'CLASS A (CRITICAL)', lph: '112 L/Hr' },
                      { code: 'DT-1001', model: 'Caterpillar 777E', engine: 'CAT C27 ACERT', crit: 'CLASS A (CRITICAL)', lph: '88 L/Hr' },
                      { code: 'DZ-3001', model: 'CAT D10T2 Heavy Dozer', engine: 'CAT C27 ACERT', crit: 'CLASS B (HIGH)', lph: '75 L/Hr' },
                      { code: 'WL-4001', model: 'Komatsu WA600-6', engine: 'Komatsu SAA6D170E', crit: 'CLASS B (HIGH)', lph: '62 L/Hr' }
                    ].map((m, i) => (
                      <tr key={i} className="hover:bg-slate-800/30">
                        <td className="py-2 font-bold text-emerald-400">{m.code}</td>
                        <td className="py-2 font-sans">{m.model}</td>
                        <td className="py-2 text-slate-400">{m.engine}</td>
                        <td className="py-2"><span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-400 font-bold">{m.crit}</span></td>
                        <td className="py-2 text-right text-slate-100 font-bold">{m.lph}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Master Component & Sub-system Hierarchy */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><FolderTree className="w-4 h-4 text-sky-400" /> Master Hierarki Komponen ISO 14224</span>
                <span className="text-[10px] text-slate-400 font-mono">Target Lifetime HM</span>
              </h3>
              <div className="space-y-2">
                {[
                  { component: 'Engine Assembly CAT C27 ACERT', unitClass: 'Dump Truck 777E / Dozer D10T2', lifeHm: '16,000 HM', overhaulEstUsd: '$85,000 USD' },
                  { component: 'Main Hydraulic Pump Assembly', unitClass: 'Excavator Komatsu PC2000-8', lifeHm: '12,000 HM', overhaulEstUsd: '$42,000 USD' },
                  { component: 'Final Drive & Planetary Gear Set', unitClass: 'Heavy Dump Truck 90 Ton', lifeHm: '15,000 HM', overhaulEstUsd: '$38,000 USD' },
                  { component: 'Torque Converter & Transmission', unitClass: 'CAT 777E Heavy Hauler', lifeHm: '14,000 HM', overhaulEstUsd: '$54,000 USD' }
                ].map((c, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-slate-100 block font-sans">{c.component}</strong>
                      <span className="text-[10px] text-slate-400 font-mono">{c.unitClass}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-emerald-400 font-bold block">{c.lifeHm}</span>
                      <span className="text-[10px] text-slate-400">{c.overhaulEstUsd}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Master PM Service Checklists & Standard Labor Hours */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><ListChecks className="w-4 h-4 text-amber-400" /> Master Strategi Maintenance PM Checklists</span>
                <span className="text-[10px] text-slate-400 font-mono">Service Intervals</span>
              </h3>
              <div className="space-y-2">
                {[
                  { interval: 'PM 250 Hours', desc: 'Ganti Oli Mesin, Filter Oli, Sampling SOS & Pemeriksaan Tali Kipas', labor: '2.5 HR', kit: 'Kit-PM250-777E' },
                  { interval: 'PM 500 Hours', desc: 'PM 250 + Filter Bahan Bakar Primary/Secondary, Filter Hyd Bypass', labor: '4.0 HR', kit: 'Kit-PM500-PC2000' },
                  { interval: 'PM 1000 Hours', desc: 'PM 500 + Ganti Oli Transmisi & Final Drive, Adjustment Valve Clearance', labor: '8.0 HR', kit: 'Kit-PM1000-D10T' },
                  { interval: 'PM 2000 Hours', desc: 'Major Service: Flush Hyd System, Coolant Drain, Differential Service', labor: '16.0 HR', kit: 'Kit-PM2000-CAT' }
                ].map((pm, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono font-bold text-[10px]">{pm.interval}</span>
                      <p className="text-slate-300 mt-1 font-sans text-[11px]">{pm.desc}</p>
                    </div>
                    <div className="text-right font-mono shrink-0 ml-3">
                      <span className="text-sky-400 font-bold block">{pm.labor}</span>
                      <span className="text-[9px] text-slate-400">{pm.kit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Workshop Bays & Mechanics Roster */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Wrench className="w-4 h-4 text-indigo-400" /> Master Fasilitas Workshop Bay & Sertifikasi</span>
                <span className="text-[10px] text-slate-400 font-mono">4 Main Bays + 2 Mobile</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { bay: 'Bay 1 - Main Central Overhaul Bay', cap: 'Overhead Crane 50 Ton', team: 'Lead: Sr. Mechanic Bambang', cert: 'POP K3 Heavy Equipment' },
                  { bay: 'Bay 2 - PM Routine Service Bay', cap: 'Lube Dispenser & Quick Drain', team: 'Lead: Mechanic Joko', cert: 'Cat Certified Technician' },
                  { bay: 'Bay 3 - Heavy Hydraulic & Engine Shop', cap: 'Bench Test Hydraulic 350 Bar', team: 'Lead: Sutrisno (Hydraulic Lead)', cert: 'Komatsu Certified Specialist' },
                  { bay: 'Bay 4 - OTR Tyre & Undercarriage Bay', cap: 'Tyre Manipulator 10 Ton', team: 'Lead: Eko (Tyre Lead)', cert: 'OTR Bridgestone Master Tech' }
                ].map((w, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-100 font-sans font-bold">{w.bay}</strong>
                      <span className="text-emerald-400 text-[10px] font-bold">{w.cap}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans">{w.team} • <span className="text-amber-400">{w.cert}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1B: DASBOR WORKSHOP MANAGER (LIVE BENGKEL SITE & REPAIR COCKPIT) */}
      {activeTab === 'dasbor_workshop' && (
        <div className="space-y-6 text-xs">
          {/* Header Operational Workshop Cockpit */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30">OPERATIONAL WORKSHOP COCKPIT</span>
                <span className="text-slate-400 text-[10px]">Bengkel Sentral Site Tambang Nikel</span>
              </div>
              <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-400" />
                Dasbor Workshop Manager & Kontrol SPK Perbaikan Bengkel
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Pengawasan real-time kapasitas bay workshop, status pengerjaan SPK (Work Order), alokasi tim mekanik, penggunaan special tools, serta verifikasi kelayakan LOTO (Lockout Tagout).
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 text-xs transition-colors">
                <Plus className="w-4 h-4" />
                <span>+ SPK Bengkel Baru</span>
              </button>
              <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 text-xs transition-colors">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verifikasi LOTO Active</span>
              </button>
            </div>
          </div>

          {/* 4 Key Workshop KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Okupansi Workshop Bay</span>
                <Layers className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-black text-amber-400 font-mono">100% <span className="text-xs font-normal text-slate-400">(4/4 Main Bays Occupied)</span></div>
              <p className="text-[10px] text-amber-400 mt-1 font-bold">+2 Pit Stop Mobile Unit Active</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">SPK Perbaikan Active</span>
                <Wrench className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl font-black text-sky-300 font-mono">8 Work Orders <span className="text-xs font-normal text-slate-400">In-Progress</span></div>
              <p className="text-[10px] text-sky-400 mt-1 font-bold">3 CM Breakdown • 3 PM • 2 Tyre/Hyd</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">On-Time SLA Completion</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-emerald-400 font-mono">95.2% <span className="text-xs font-normal text-slate-400">SLA Achievement</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">Rata-rata Pekerjaan Tepat SRT Standard</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Tim Mekanik On-Shift</span>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-black text-indigo-300 font-mono">18 Teknisi <span className="text-xs font-normal text-slate-400">Shift A</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">420 Hari Bebas Kecelakaan (LTI Free)</p>
            </div>
          </div>

          {/* Interactive Workshop Bays Real-Time Status */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between">
              <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-amber-400" /> Status Real-Time Kapasitas Workshop Bay & Mobile Field Units</span>
              <span className="text-[10px] text-slate-400 font-mono">Live Monitoring Bengkel Sentral</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { bay: 'BAY 1 - MAIN CENTRAL OVERHAUL', code: 'DT-1001', name: 'CAT 777E Heavy Dump Truck', wo: 'WO-2026-0812', task: 'Overhaul Transmission & Torque Converter', lead: 'Bambang (Sr. Mechanic Lead)', tools: 'Overhead Crane 50T, Torque Multiplier', loto: 'VERIFIED LOTO TAG #1082', progress: 65, eta: 'Hari ini 17:00', status: 'IN_PROGRESS' },
                { bay: 'BAY 2 - PM ROUTINE SERVICE BAY', code: 'EX-2001', name: 'Komatsu PC2000-8 Excavator', wo: 'WO-2026-0815', task: 'PM 500 Hours Routine & Oil SOS Sampling', lead: 'Joko (PM Specialist)', tools: 'Lube Dispenser Quick Drain, SOS Sampler', loto: 'VERIFIED LOTO TAG #1085', progress: 85, eta: 'Hari ini 15:30', status: 'FINAL_INSPECTION' },
                { bay: 'BAY 3 - HEAVY HYDRAULIC & ENGINE SHOP', code: 'DZ-3001', name: 'CAT D10T2 Heavy Dozer', wo: 'WO-2026-0818', task: 'Rebuild Blade Hydraulic Cylinder Seal', lead: 'Sutrisno (Hydraulic Specialist)', tools: 'Bench Test Hydraulic 350 Bar', loto: 'VERIFIED LOTO TAG #1088', progress: 40, eta: 'Besok 11:00', status: 'IN_PROGRESS' },
                { bay: 'BAY 4 - OTR TYRE & UNDERCARRIAGE BAY', code: 'WL-4001', name: 'Komatsu WA600 Wheel Loader', wo: 'WO-2026-0820', task: 'Penggantian 2 Unit Ban OTR Bridgestone 35/65 R33', lead: 'Eko (OTR Tyre Lead)', tools: 'Tyre Manipulator 10T, Pneumatic Gun 2000Nm', loto: 'VERIFIED LOTO TAG #1091', progress: 90, eta: 'Hari ini 14:00', status: 'TEST_DRIVE' },
                { bay: 'PIT STOP 1 - MOBILE FIELD SERVICE UNIT', code: 'DT-1004', name: 'Caterpillar 777E Dump Truck', wo: 'WO-2026-0822', task: 'Emergency Hydraulic Hose Replacement (Pit 2)', lead: 'Agus (Mobile Lead Tech)', tools: 'Mobile Hose Crimper 24V', loto: 'FIELD LOTO ACTIVE', progress: 50, eta: 'Hari ini 13:30', status: 'FIELD_REPAIR' },
                { bay: 'PIT STOP 2 - JETTY FABRICATION BAY', code: 'BC-5002', name: 'Conveyor Hopper Chute Jetty', wo: 'WO-2026-0825', task: 'Hardfacing Wear Plate Welding & Adjustment', lead: 'Dwi (Fabrication & Welder Lead)', tools: 'Mig/Tig Welder 500A, Arc Air Gouging', loto: 'FIELD LOTO ACTIVE', progress: 70, eta: 'Hari ini 16:00', status: 'FABRICATION' }
              ].map((b, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-800 pb-2">
                    <span className="font-bold text-amber-400">{b.bay}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{b.status}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-emerald-400 text-xs">{b.code}</span>
                      <strong className="text-slate-100 font-sans text-xs">{b.name}</strong>
                    </div>
                    <div className="text-[11px] text-slate-300 font-semibold">{b.task}</div>
                    <p className="text-[10px] text-slate-400 font-mono">SPK: <strong className="text-amber-400">{b.wo}</strong> • Lead: {b.lead}</p>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[10px] space-y-1">
                    <div className="text-slate-400 flex items-center gap-1.5">
                      <Wrench className="w-3 h-3 text-sky-400" />
                      <span>Tools: <strong className="text-slate-200">{b.tools}</strong></span>
                    </div>
                    <div className="text-emerald-400 flex items-center gap-1.5 font-mono font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>{b.loto}</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-400">Progres Pengerjaan</span>
                      <span className="text-amber-400 font-bold">{b.progress}% • ETA: {b.eta}</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-amber-500 h-full rounded-full transition-all" style={{ width: `${b.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workshop Backlog & Mechanic Roster Table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Workshop Repair Queue & Backlog */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-rose-400" /> Antrean Masuk Workshop (Backlog Queue)</span>
                <span className="text-[10px] text-slate-400 font-mono">5 Units Waiting</span>
              </h3>
              <div className="space-y-2">
                {[
                  { code: 'DT-1003', name: 'CAT 777E', issue: 'Indikator Suhu Transmisi Tinggi (High Temp)', parts: 'STAGED 100% IN KITTING BAY', priority: 'HIGH', targetBay: 'Bay 1' },
                  { code: 'EX-2002', name: 'PC2000-8', issue: 'PM 250 Hours Routine Check', parts: 'PARTS READY IN WAREHOUSE', priority: 'SCHEDULED', targetBay: 'Bay 2' },
                  { code: 'DZ-3002', name: 'CAT D10T2', issue: 'Ganti Track Shoe Bolt & Undercarriage Service', parts: 'PARTS IN TRANSIT FROM GUDANG', priority: 'MEDIUM', targetBay: 'Bay 4' }
                ].map((q, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400">{q.code}</span>
                        <strong className="text-slate-200 font-sans">{q.name}</strong>
                        <span className="px-1.5 py-0.5 rounded text-[9px] bg-rose-500/20 text-rose-400 font-bold font-mono">{q.priority}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{q.issue}</p>
                      <span className="text-[9px] text-emerald-400 font-mono font-bold">{q.parts}</span>
                    </div>
                    <div className="text-right shrink-0 ml-3 font-mono">
                      <span className="px-2 py-1 rounded bg-slate-900 text-amber-300 border border-slate-700 text-[10px] font-bold block">{q.targetBay}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shift Mechanic Roster & Certification Matrix */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-indigo-400" /> Jadwal Shift Mekanik & LOTO Authorization</span>
                <span className="text-[10px] text-slate-400 font-mono">Shift A (07:00 - 18:00)</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { name: 'Bambang Sutrisno', role: 'Sr. Heavy Mechanic Lead', bay: 'Bay 1 (CAT 777E)', cert: 'POP K3, Cat Master Tech', loto: 'AUTH LEVEL 3 (#LOTO-001)' },
                  { name: 'Sutrisno Hendro', role: 'Hydraulic Specialist', bay: 'Bay 3 (CAT D10T2)', cert: 'Komatsu Hydraulic Certified', loto: 'AUTH LEVEL 3 (#LOTO-004)' },
                  { name: 'Eko Prasetyo', role: 'OTR Tyre Master Lead', bay: 'Bay 4 (WA600 Loader)', cert: 'Bridgestone OTR Specialist', loto: 'AUTH LEVEL 2 (#LOTO-008)' },
                  { name: 'Joko Widodo', role: 'PM & Lube Technician', bay: 'Bay 2 (PC2000 Exca)', cert: 'Lube & SOS Inspector', loto: 'AUTH LEVEL 2 (#LOTO-012)' }
                ].map((m, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <strong className="text-slate-100 font-sans font-bold block">{m.name}</strong>
                      <span className="text-[10px] text-slate-400">{m.role} • <strong className="text-amber-400">{m.bay}</strong></span>
                    </div>
                    <div className="text-right font-mono shrink-0 ml-3">
                      <span className="text-emerald-400 text-[10px] font-bold block">{m.loto}</span>
                      <span className="text-[9px] text-slate-400">{m.cert}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1C: MASTER DATA WORKSHOP MANAGER (FACILITIES, MECHANICS, SRT & TOOLS REGISTER) */}
      {activeTab === 'master_data_workshop' && (
        <div className="space-y-6 text-xs">
          {/* Header Banner Master Data Workshop */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <FolderTree className="w-5 h-5 text-amber-400" />
                Master Data Workshop Manager & Plant Facilities Register
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Katalog master fasilitas bay workshop, spesifikasi overhead crane & OWS, matriks kompetensi teknisi, standar waktu pengerjaan repair (SRT), register special tools terkalibrasi, serta SOP troubleshooting failure codes.
              </p>
            </div>
            <button className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-2 text-xs transition-colors shrink-0">
              <Plus className="w-4 h-4" />
              <span>+ Tambah Register Workshop</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Master Fasilitas Workshop Bay & Infrastruktur */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Layers className="w-4 h-4 text-emerald-400" /> Master Fasilitas & Infrastruktur Workshop Bay</span>
                <span className="text-[10px] text-slate-400 font-mono">6 Bay Registers</span>
              </h3>
              <div className="space-y-2">
                {[
                  { code: 'BAY-01', name: 'Main Central Overhaul Bay', cap: 'Unit max 100 Ton', crane: 'Overhead Crane 50 Ton (Dual Hoist)', pit: 'Concrete Pit with Oil Drainage & OWS Connection', air: 'Pneumatic Line 10 Bar' },
                  { code: 'BAY-02', name: 'PM Routine Service Bay', cap: 'Unit max 90 Ton', crane: 'Overhead Crane 15 Ton', pit: 'Quick Oil Dispenser Bar (Engine, Hyd, Trans)', air: 'Pneumatic Line 10 Bar' },
                  { code: 'BAY-03', name: 'Heavy Hydraulic & Engine Shop', cap: 'Hydraulic Test Bench', crane: 'Jib Crane 10 Ton', pit: 'Clean Room Hydraulic Assembly Station', air: 'Pneumatic Line 12 Bar' },
                  { code: 'BAY-04', name: 'OTR Tyre & Undercarriage Bay', cap: 'Tyre Manipulator 10T', crane: 'Mobile Gantry Crane 20 Ton', pit: 'Heavy Undercarriage Press 200 Ton Station', air: 'High Volume Pneumatic Line' }
                ].map((b, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center font-mono">
                      <span className="font-bold text-amber-400">{b.code} • <strong className="text-slate-100 font-sans">{b.name}</strong></span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">{b.cap}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans">Crane: <strong className="text-slate-300">{b.crane}</strong> • Station: {b.pit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Matriks Kompetensi Mekanik & Sertifikasi */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-sky-400" /> Master Matriks Kompetensi & Sertifikasi Mekanik</span>
                <span className="text-[10px] text-slate-400 font-mono">18 Technicians</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { empId: 'MECH-001', name: 'Bambang Sutrisno', spec: 'Heavy Engine & Transmission Overhaul', cert: 'POP K3, Cat Master Tech', exp: '2028-12-31', status: 'MCU FIT CLASS A' },
                  { empId: 'MECH-004', name: 'Sutrisno Hendro', spec: 'Hydraulic Pump & Valve Test Bench', cert: 'Komatsu Hydraulic Specialist', exp: '2027-09-15', status: 'MCU FIT CLASS A' },
                  { empId: 'MECH-008', name: 'Eko Prasetyo', spec: 'OTR Tyre Alignment & Cut Repair', cert: 'Bridgestone Master Tyre Tech', exp: '2028-04-20', status: 'MCU FIT CLASS A' },
                  { empId: 'MECH-012', name: 'Joko Widodo', spec: 'PM Service & Oil SOS Diagnostic', cert: 'Lube Inspector & SOS Certified', exp: '2027-11-30', status: 'MCU FIT CLASS A' }
                ].map((m, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-emerald-400">{m.empId}</span> • <strong className="text-slate-100 font-sans">{m.name}</strong>
                      <p className="text-[10px] text-slate-400 font-sans">{m.spec}</p>
                      <span className="text-[9px] text-amber-400">{m.cert}</span>
                    </div>
                    <div className="text-right shrink-0 ml-2 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[9px] font-bold block">{m.status}</span>
                      <span className="text-[9px] text-slate-500">Exp: {m.exp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Job Standard Repair Times (SRT Catalog) */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-amber-400" /> Master Standar Waktu Pengerjaan (Job SRT Catalog)</span>
                <span className="text-[10px] text-slate-400 font-mono">Standard Repair Times</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { code: 'SRT-ENG-01', job: 'Remove & Replace (R&R) Engine CAT C27 ACERT', srt: '12.0 HR', team: '3 Mechanics + 1 Rigger', bay: 'Bay 1 Overhaul' },
                  { code: 'SRT-TRN-02', job: 'R&R Transmission & Torque Converter CAT 777E', srt: '8.5 HR', team: '2 Mechanics + 1 Rigger', bay: 'Bay 1 Overhaul' },
                  { code: 'SRT-HYD-04', job: 'Rebuild Main Hydraulic Pump Komatsu PC2000', srt: '6.0 HR', team: '2 Hydraulic Techs', bay: 'Bay 3 Hydraulic' },
                  { code: 'SRT-TYR-01', job: 'R&R 2 Unit Ban OTR Bridgestone 35/65 R33', srt: '3.0 HR', team: '2 Tyre Mechanics', bay: 'Bay 4 Tyre' }
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-amber-400">{s.code}</span>
                      <p className="text-slate-200 font-sans font-bold text-[11px]">{s.job}</p>
                      <span className="text-[10px] text-slate-400">{s.team} • {s.bay}</span>
                    </div>
                    <div className="text-right shrink-0 ml-3 font-mono">
                      <span className="text-emerald-400 font-black text-sm block">{s.srt}</span>
                      <span className="text-[9px] text-slate-500">Target SRT</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Special Tools & Equipment Register */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Wrench className="w-4 h-4 text-indigo-400" /> Master Special Tools & Sertifikat Kalibrasi</span>
                <span className="text-[10px] text-slate-400 font-mono">Calibrated Tools</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { toolId: 'TOOL-CRN-50', name: 'Overhead Crane 50 Ton Dual Hoist', loc: 'Bay 1', calib: '2027-01-15', status: 'CERTIFIED PASS', certBy: 'Disnaker K3 Lifting' },
                  { toolId: 'TOOL-HYD-35', name: 'Bench Test Hydraulic 350 Bar digital', loc: 'Bay 3', calib: '2026-11-20', status: 'CALIBRATED OK', certBy: 'Komatsu Calib Lab' },
                  { toolId: 'TOOL-TRQ-20', name: 'Hydraulic Torque Wrench 10,000 Nm', loc: 'Tool Room', calib: '2026-10-05', status: 'CALIBRATED OK', certBy: 'Plarad Calibration' },
                  { toolId: 'TOOL-TYR-10', name: 'Tyre Manipulator Attachment 10 Ton', loc: 'Bay 4', calib: '2027-03-10', status: 'CERTIFIED PASS', certBy: 'Bridgestone Safety' }
                ].map((t, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-indigo-400">{t.toolId}</span> • <strong className="text-slate-100 font-sans">{t.name}</strong>
                      <p className="text-[10px] text-slate-400 font-sans">Lokasi: {t.loc} • Cert: {t.certBy}</p>
                    </div>
                    <div className="text-right shrink-0 ml-2 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold block">{t.status}</span>
                      <span className="text-[9px] text-slate-500">Due: {t.calib}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1D: DASBOR FLEET MANAGER (FLEET ROSTER, CYCLE TIME & OPERATIONAL DISPATCH) */}
      {activeTab === 'dasbor_fleet' && (
        <div className="space-y-6 text-xs">
          {/* Header Banner Fleet Cockpit */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30">FLEET MANAGEMENT COCKPIT</span>
                <span className="text-slate-400 text-[10px]">Site Tambang Nikel & Jalur Hauling Jetty</span>
              </div>
              <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-400" />
                Dasbor Fleet Manager & Kontrol Operasional Hauling Site
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Pengawasan real-time alokasi armada hauling, rasio Match Factor loading unit, efisiensi Cycle Time (Loading, Hauling, Dumping), pemantauan Payload Scale, serta kepatuhan batas kecepatan GPS.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 text-xs transition-colors">
                <Plus className="w-4 h-4" />
                <span>+ Dispatch Fleet Baru</span>
              </button>
              <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 text-xs transition-colors">
                <Radio className="w-4 h-4 text-emerald-400" />
                <span>GPS Telemetry Live</span>
              </button>
            </div>
          </div>

          {/* 4 Key Fleet Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Total Active Fleet Roster</span>
                <Truck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-emerald-400 font-mono">24 / 28 Units <span className="text-xs font-normal text-slate-400">(85.7% Active)</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">3 Units Workshop • 1 Standby Reserve</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Use of Availability (UA)</span>
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl font-black text-sky-300 font-mono">88.4% <span className="text-xs font-normal text-slate-400">(Target ≥ 85%)</span></div>
              <p className="text-[10px] text-sky-400 mt-1 font-bold">Jam Kerja Efektif Hauling Optimum</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Hauling Cycle Time</span>
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-black text-amber-300 font-mono">21.8 Min <span className="text-xs font-normal text-slate-400">/ 18 Km Trip</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">↑ 0.7 Min Lebih Cepat dari Target</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Payload Scale Compliance</span>
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-black text-indigo-300 font-mono">98.6% <span className="text-xs font-normal text-slate-400">Target Weight</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">0 Overload Violations Today</p>
            </div>
          </div>

          {/* Active Fleet Telemetry & Dispatch Grid */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between">
              <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-emerald-400" /> Live Dispatch Cockpit & Status Fleet Hauling Unit</span>
              <span className="text-[10px] text-slate-400 font-mono">Real-time IoT Telemetry</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { code: 'DT-1001', model: 'CAT 777E Dump Truck', fleet: 'Fleet Alpha (Pit A - ETO Jetty)', driver: 'Sugianto (SIMPER A-102)', speed: '38 Km/h', location: 'KM 12.4 Hauling Road', fuel: '82%', payload: '94.2 Ton', status: 'HAULING_LOADED', iot: 'GPS ONLINE (4G Signal 98%)' },
                { code: 'DT-1002', model: 'CAT 777E Dump Truck', fleet: 'Fleet Alpha (Pit A - ETO Jetty)', driver: 'Budi Santoso (SIMPER A-105)', speed: '0 Km/h', location: 'Hopper Jetty Station 2', fuel: '74%', payload: '0 Ton (Dumping)', status: 'DUMPING', iot: 'GPS ONLINE (4G Signal 95%)' },
                { code: 'DT-1003', model: 'CAT 777E Dump Truck', fleet: 'Fleet Beta (Pit B - Stockpile)', driver: 'Rahmat Hidayat (SIMPER B-201)', speed: '42 Km/h', location: 'KM 6.1 Return Hauling Road', fuel: '68%', payload: '0 Ton (Empty Return)', status: 'RETURNING_EMPTY', iot: 'GPS ONLINE (4G Signal 99%)' },
                { code: 'EX-2001', model: 'Komatsu PC2000-8 Excavator', fleet: 'Loading Fleet 1 (Pit A Central)', driver: 'Kuswanto (SIMPER EX-001)', speed: '0 Km/h', location: 'Pit A Bench 40 RL', fuel: '88%', payload: 'Bucket 12.0 m³', status: 'LOADING_DIGGING', iot: 'TELEMETRY ONLINE' },
                { code: 'DZ-3001', model: 'CAT D10T2 Heavy Dozer', fleet: 'Support Fleet (Pit A Waste Dump)', driver: 'Heri Susanto (SIMPER DZ-003)', speed: '4 Km/h', location: 'Waste Dump Area B', fuel: '72%', payload: 'Spreading Blade', status: 'RIPPING_DOZING', iot: 'TELEMETRY ONLINE' },
                { code: 'WL-4001', model: 'Komatsu WA600 Wheel Loader', fleet: 'Port Fleet (Jetty Barging)', driver: 'Andi Wijaya (SIMPER WL-002)', speed: '12 Km/h', location: 'Jetty Stockpile Nickel', fuel: '90%', payload: 'Loading Barge 300 Ft', status: 'BARGE_LOADING', iot: 'TELEMETRY ONLINE' }
              ].map((f, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-800 pb-2">
                    <span className="font-bold text-emerald-400">{f.code} • {f.model}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{f.status}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] text-slate-200 font-bold">{f.fleet}</div>
                    <p className="text-[10px] text-slate-400 font-mono">Driver: <strong className="text-slate-200">{f.driver}</strong></p>
                    <p className="text-[10px] text-slate-400 font-mono">Posisi: <strong className="text-amber-400">{f.location}</strong></p>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[10px] grid grid-cols-2 gap-2 font-mono">
                    <div>
                      <span className="text-slate-500 block">Speed GPS</span>
                      <strong className="text-sky-300 text-xs font-bold">{f.speed}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Payload Scale</span>
                      <strong className="text-amber-300 text-xs font-bold">{f.payload}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                    <span className="text-emerald-400 font-bold">{f.iot}</span>
                    <span className="text-slate-400">BBM Solar: <strong className="text-slate-200">{f.fuel}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispatch Match Factor & Hauling Route Segments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Match Factor Loading vs Hauling */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-emerald-400" /> Analisa Match Factor Loading vs Hauling Fleet</span>
                <span className="text-[10px] text-slate-400 font-mono">Optimum Target = 1.00</span>
              </h3>
              <div className="space-y-3">
                {[
                  { point: 'Loading Point Pit A Bench 40 (PC2000-8 EX-2001)', trucks: '8 CAT 777E Units', mf: '1.02', status: 'OPTIMAL BALANCE', queue: '1.2 Min Queue Time' },
                  { point: 'Loading Point Pit B Bench 20 (PC1250 EX-2002)', trucks: '6 CAT 777E Units', mf: '0.94', status: 'SLIGHT UNDER-HAUL', queue: '0.4 Min Queue Time' },
                  { point: 'Stockpile ETO Feed Station 1 (WA600 WL-4001)', trucks: '4 Dump Trucks', mf: '0.98', status: 'OPTIMAL BALANCE', queue: '0.8 Min Queue Time' }
                ].map((m, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <strong className="text-slate-100 font-sans font-bold">{m.point}</strong>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[10px]">{m.status}</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                      <span>Alokasi: <strong className="text-slate-200">{m.trucks}</strong></span>
                      <span>Match Factor: <strong className="text-amber-400 text-xs font-bold">{m.mf}</strong></span>
                      <span>Antrean: <strong className="text-sky-300">{m.queue}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hauling Route & Speed Limit Compliance */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-400" /> Kepatuhan Batas Kecepatan & Jalur Hauling</span>
                <span className="text-[10px] text-slate-400 font-mono">Max Speed Limit 50 Km/h</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { segment: 'Segment 1: Pit A to KM 5 Checkpoint', dist: '5.0 Km', avgSpeed: '38 Km/h', limit: '40 Km/h', pass: '100% COMPLIANT' },
                  { segment: 'Segment 2: KM 5 to KM 12 Main Hauling Road', dist: '7.0 Km', avgSpeed: '46 Km/h', limit: '50 Km/h', pass: '100% COMPLIANT' },
                  { segment: 'Segment 3: KM 12 to Port Jetty Hopper', dist: '6.0 Km', avgSpeed: '32 Km/h', limit: '35 Km/h', pass: '100% COMPLIANT' }
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-100 font-sans font-bold block">{s.segment}</strong>
                      <span className="text-[10px] text-slate-400">Jarak: {s.dist} • Speed Limit: {s.limit}</span>
                    </div>
                    <div className="text-right shrink-0 ml-3 font-mono">
                      <span className="text-emerald-400 text-[10px] font-bold block">{s.pass}</span>
                      <span className="text-[10px] text-sky-300">Avg: {s.avgSpeed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1E: MASTER DATA FLEET MANAGER (ROSTER REGISTER, OPERATORS, IOT SENSORS & ASSETS) */}
      {activeTab === 'master_data_fleet' && (
        <div className="space-y-6 text-xs">
          {/* Header Banner Master Data Fleet */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                Master Data Fleet Manager & Roster Asset Register
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Katalog master registrasi unit armada, pemetaan modem GPS & sensor telemetri IoT, data master operator/driver terverifikasi SIMPER, serta parameter target siklus umur aset (HM & Penyusutan).
              </p>
            </div>
            <button className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-2 text-xs transition-colors shrink-0">
              <Plus className="w-4 h-4" />
              <span>+ Tambah Register Armada Fleet</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Master Roster Armada Fleet & Modem IoT ID */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-emerald-400" /> Master Roster Unit Armada & IoT Sensor ID</span>
                <span className="text-[10px] text-slate-400 font-mono">28 Unit Roster</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { code: 'DT-1001', model: 'Caterpillar 777E', gpsId: 'GPS-CAT-777-01', sim: 'SIM-IoT-08129981', fuelSensor: 'Dual Ultrasonic Solar Sensor', payloadSensor: 'CAT VIMS Payload Scale Meter' },
                  { code: 'DT-1002', model: 'Caterpillar 777E', gpsId: 'GPS-CAT-777-02', sim: 'SIM-IoT-08129982', fuelSensor: 'Dual Ultrasonic Solar Sensor', payloadSensor: 'CAT VIMS Payload Scale Meter' },
                  { code: 'EX-2001', model: 'Komatsu PC2000-8', gpsId: 'GPS-KOM-2000-01', sim: 'SIM-IoT-08129990', fuelSensor: 'Digital Flow Meter Solar', payloadSensor: 'Komatsu KOMTRAX Bucket Load Meter' },
                  { code: 'DZ-3001', model: 'CAT D10T2 Dozer', gpsId: 'GPS-CAT-D10-01', sim: 'SIM-IoT-08129995', fuelSensor: 'Digital Flow Meter Solar', payloadSensor: 'N/A (Ripping Sensor)' }
                ].map((r, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-emerald-400">{r.code} • <strong className="text-slate-100 font-sans">{r.model}</strong></span>
                      <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[9px] font-bold">{r.gpsId}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans">BBM: {r.fuelSensor} • Payload: <span className="text-amber-400">{r.payloadSensor}</span></p>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Operator / Driver SIMPER Register */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Users className="w-4 h-4 text-sky-400" /> Master Operator & Lisensi SIMPER Tambang</span>
                <span className="text-[10px] text-slate-400 font-mono">32 Certified Drivers</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { simper: 'SIMPER A-102', name: 'Sugianto', classUnit: 'Heavy Off-Highway Dump Truck 100T', exp: '2028-06-30', fit: 'MCU FIT CLASS A' },
                  { simper: 'SIMPER A-105', name: 'Budi Santoso', classUnit: 'Heavy Off-Highway Dump Truck 100T', exp: '2028-08-15', fit: 'MCU FIT CLASS A' },
                  { simper: 'SIMPER EX-001', name: 'Kuswanto', classUnit: 'Heavy Excavator 200 Ton', exp: '2027-12-10', fit: 'MCU FIT CLASS A' },
                  { simper: 'SIMPER DZ-003', name: 'Heri Susanto', classUnit: 'Heavy Dozer D10/D11 Class', exp: '2028-02-28', fit: 'MCU FIT CLASS A' }
                ].map((o, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-amber-400">{o.simper}</span> • <strong className="text-slate-100 font-sans">{o.name}</strong>
                      <p className="text-[10px] text-slate-400 font-sans">{o.classUnit}</p>
                    </div>
                    <div className="text-right shrink-0 ml-2 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold block">{o.fit}</span>
                      <span className="text-[9px] text-slate-500">Exp: {o.exp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Rute Hauling & Jarak Segment (Hauling Route Master) */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" /> Master Rute Jalur Hauling & Segmen Jarak</span>
                <span className="text-[10px] text-slate-400 font-mono">3 Main Routes</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { routeId: 'ROUTE-01', name: 'Pit A Central to Port Jetty Hopper', distance: '18.0 Km', targetCycle: '22.5 Min', gradientMax: '8% Grade' },
                  { routeId: 'ROUTE-02', name: 'Pit B North to Stockpile ETO Feed', distance: '12.5 Km', targetCycle: '16.0 Min', gradientMax: '6% Grade' },
                  { routeId: 'ROUTE-03', name: 'Stockpile ETO to Jetty Barging Port', distance: '5.5 Km', targetCycle: '8.0 Min', gradientMax: '4% Grade' }
                ].map((rt, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-amber-400">{rt.routeId}</span> • <strong className="text-slate-100 font-sans">{rt.name}</strong>
                      <p className="text-[10px] text-slate-400 font-sans">Maks Kelandaian: {rt.gradientMax}</p>
                    </div>
                    <div className="text-right shrink-0 ml-3 font-mono">
                      <span className="text-emerald-400 font-bold text-xs block">{rt.distance}</span>
                      <span className="text-[9px] text-slate-400">Cycle: {rt.targetCycle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Target Life Cycle HM & Penyusutan Aset */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><History className="w-4 h-4 text-indigo-400" /> Master Asset Lifecycle HM & Depreciation Schedule</span>
                <span className="text-[10px] text-slate-400 font-mono">Target Lifetime</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { unitClass: 'Off-Highway Dump Truck 100 Ton', targetLifeHm: '60,000 HM', depMethod: 'Straight Line 10 Years', currentAvgHm: '18,420 HM', residualVal: '15%' },
                  { unitClass: 'Heavy Excavator 200 Ton Class', targetLifeHm: '50,000 HM', depMethod: 'Straight Line 8 Years', currentAvgHm: '14,100 HM', residualVal: '12%' },
                  { unitClass: 'Heavy Track Dozer 600 HP Class', targetLifeHm: '45,000 HM', depMethod: 'Straight Line 7 Years', currentAvgHm: '12,850 HM', residualVal: '10%' }
                ].map((a, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-100 font-sans font-bold block">{a.unitClass}</strong>
                      <span className="text-[10px] text-slate-400">Metode: {a.depMethod} • Residual: {a.residualVal}</span>
                    </div>
                    <div className="text-right shrink-0 ml-3 font-mono">
                      <span className="text-emerald-400 font-bold text-xs block">{a.targetLifeHm}</span>
                      <span className="text-[9px] text-slate-400">Avg Current: {a.currentAvgHm}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1F: DASBOR DISPATCHER MANAGER (MINE DISPATCH COCKPIT, FMS AUTO-ASSIGNMENT & RADIO CONTROL) */}
      {activeTab === 'dasbor_dispatcher' && (
        <div className="space-y-6 text-xs">
          {/* Header Banner Mine Dispatch Cockpit */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-mono text-[10px] font-bold border border-sky-500/30">MINE DISPATCH COCKPIT • FMS LIVE</span>
                <span className="text-slate-400 text-[10px]">Pusat Kontrol Dispatcher Tambang Nikel Site</span>
              </div>
              <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Radio className="w-5 h-5 text-sky-400 animate-pulse" />
                Dasbor Dispatcher Manager & System Kontrol FMS (Fleet Management System)
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Pengawasan terpusat alokasi sirkuit shovel-truck, optimasi otomatis Match Factor, pemantauan real-time antrean hopper/loading, interkom radio frekuensi tambang, serta eksekusi instruksi re-route armada.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-1.5 text-xs transition-colors">
                <Zap className="w-4 h-4" />
                <span>FMS Mode: AUTO-DISPATCH ACTIVE</span>
              </button>
              <button className="px-3 py-2 rounded-xl bg-rose-900/40 border border-rose-700/50 hover:bg-rose-800 text-rose-200 font-bold flex items-center gap-1.5 text-xs transition-colors">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>Broadcast Emergency Radio</span>
              </button>
            </div>
          </div>

          {/* 4 Key Dispatcher Executive KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Efisiensi FMS Dispatch</span>
                <Radio className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl font-black text-sky-300 font-mono">96.8% <span className="text-xs font-normal text-slate-400">(Match Factor Balance)</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">Rata-rata Antrean Loading ≤ 0.6 Menit</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Produksi Hauling Shift Ini</span>
                <BarChart3 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-emerald-400 font-mono">34,250 Ton <span className="text-xs font-normal text-slate-400">/ 38,000 Ton</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">88.5% Target Shift A Achieved</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Sirkuit Shovel-Truck Active</span>
                <Truck className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-black text-amber-300 font-mono">4 Active Circuits <span className="text-xs font-normal text-slate-400">(24 Haulers)</span></div>
              <p className="text-[10px] text-sky-400 mt-1 font-bold">2 Standby Dumpers Ready to Deploy</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Kanal Radio Communication</span>
                <Activity className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-black text-indigo-300 font-mono">CH 01 ACTIVE <span className="text-xs font-normal text-slate-400">(462.55 MHz)</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">Signal Strong • 100% Radio Uptime</p>
            </div>
          </div>

          {/* Interactive Shovel-Truck Circuit Assignment & Live FMS Status */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between">
              <span className="flex items-center gap-2"><Radio className="w-4 h-4 text-sky-400" /> Alokasi Sirkuit Shovel-Truck Real-Time & Target Tonase Shift</span>
              <span className="text-[10px] text-slate-400 font-mono">FMS Dynamic Auto-Routing</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {[
                { circuit: 'SIRKUIT 1 - PIT A BENCH 40 RL (NICKEL ORE HIGH GRADE)', shovel: 'EX-2001 (Komatsu PC2000-8)', haulers: '8 Unit Dump Truck (DT-1001, DT-1002, DT-1003, DT-1004, DT-1007, DT-1009, DT-1011, DT-1014)', dest: 'Hopper Jetty Station 1', mf: '1.02', cycle: '21.5 Min', prod: '14,200 Ton', status: 'OPTIMAL_FLOW', operator: 'Kuswanto (SIMPER EX-001)' },
                { circuit: 'SIRKUIT 2 - PIT B BENCH 20 RL (NICKEL ORE MEDIUM GRADE)', shovel: 'EX-2002 (Komatsu PC1250-8)', haulers: '6 Unit Dump Truck (DT-1005, DT-1006, DT-1008, DT-1010, DT-1012, DT-1015)', dest: 'Stockpile ETO Feed Station', mf: '0.94', cycle: '15.8 Min', prod: '10,800 Ton', status: 'SLIGHT_UNDER_HAUL', operator: 'Slamet (SIMPER EX-002)' },
                { circuit: 'SIRKUIT 3 - JETTY PORT STOCKPILE (BARGING FEED)', shovel: 'WL-4001 (Komatsu WA600 Loader)', haulers: '4 Unit Dump Truck (DT-1016, DT-1018, DT-1020, DT-1022)', dest: 'Barge Loading Port 300 Ft', mf: '0.98', cycle: '8.2 Min', prod: '6,450 Ton', status: 'OPTIMAL_FLOW', operator: 'Andi Wijaya (SIMPER WL-002)' },
                { circuit: 'SIRKUIT 4 - PIT A WASTE DUMP B (OVERBURDEN CLEARING)', shovel: 'DZ-3001 (CAT D10T2 Heavy Dozer)', haulers: '6 Unit Dump Truck (DT-1023, DT-1024, DT-1025, DT-1026, DT-1027, DT-1028)', dest: 'Waste Dump Disposal Area B', mf: '1.00', cycle: '12.4 Min', prod: '2,800 BCM', status: 'OPTIMAL_FLOW', operator: 'Heri Susanto (SIMPER DZ-003)' }
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 relative overflow-hidden">
                  <div className="flex justify-between items-center text-[10px] font-mono border-b border-slate-800 pb-2">
                    <span className="font-bold text-sky-400">{c.circuit}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{c.status}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-amber-400 text-xs">{c.shovel}</span>
                      <span className="text-[10px] text-slate-400 font-mono">• Op: {c.operator}</span>
                    </div>
                    <div className="text-[10px] text-slate-300 font-semibold flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span>Destinasi: <strong className="text-emerald-400 font-mono">{c.dest}</strong></span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">Haulers: <strong className="text-slate-200">{c.haulers}</strong></p>
                  </div>

                  <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[10px] grid grid-cols-3 gap-2 font-mono">
                    <div>
                      <span className="text-slate-500 block">Match Factor</span>
                      <strong className="text-amber-300 text-xs font-bold">{c.mf}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Avg Cycle Time</span>
                      <strong className="text-sky-300 text-xs font-bold">{c.cycle}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Produksi Shift</span>
                      <strong className="text-emerald-400 text-xs font-bold">{c.prod}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono pt-1">
                    <button className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 font-bold flex items-center gap-1 transition-colors">
                      <RotateCcw className="w-3 h-3 text-sky-400" />
                      <span>FMS Re-Optimize Circuit</span>
                    </button>
                    <span className="text-emerald-400 font-bold">FMS Auto-Target Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dispatcher Alert Center & Instant Re-Assignment Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-Time FMS Queue & Bottleneck Alert Center */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><AlertOctagon className="w-4 h-4 text-amber-400" /> Peringatan Antrean & Bottleneck FMS</span>
                <span className="text-[10px] text-slate-400 font-mono">2 Live Action Items</span>
              </h3>
              <div className="space-y-3">
                {[
                  { location: 'Hopper Jetty Station 2', issue: 'Antrean 3 Unit Truck (Queue Time > 2.5 Min)', rec: 'Auto-Re-route DT-1004 & DT-1007 ke Stockpile ETO Feed', action: 'Eksekusi Re-Route FMS', level: 'HIGH' },
                  { location: 'Pit B Bench 20 RL', issue: 'EX-2002 Under-Haul (Match Factor 0.85)', rec: 'Re-assign 1 Standby Truck DT-1008 dari Pit A ke Pit B', action: 'Transfer Unit Armada', level: 'MEDIUM' }
                ].map((a, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        {a.location}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono font-bold text-[9px]">{a.level} PRIORITY</span>
                    </div>
                    <p className="text-[11px] text-slate-200 font-semibold">{a.issue}</p>
                    <p className="text-[10px] text-slate-400 font-mono">Rekomendasi AI FMS: <strong className="text-amber-300">{a.rec}</strong></p>
                    <button className="w-full py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs font-mono transition-colors">
                      ⚡ {a.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Dispatch Instruction & Radio Communication Log */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Radio className="w-4 h-4 text-indigo-400" /> Log Radio Interkom & Manual Dispatch Command</span>
                <span className="text-[10px] text-slate-400 font-mono">Channel 01 Log</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { time: '08:12:05', unit: 'DT-1001', op: 'Sugianto', msg: 'Melintasi KM 12.4 Hauling Road, muatan 94 Ton aman.', resp: 'DISPATCH: Roger DT-1001, lanjutkan ke Hopper 1.' },
                  { time: '08:08:40', unit: 'EX-2001', op: 'Kuswanto', msg: 'Tarik 1 dumper tambahan ke Pit A Bench 40, loading cepat.', resp: 'DISPATCH: Copied EX-2001, DT-1014 dialihkan ke lokasi.' },
                  { time: '08:01:15', unit: 'DT-1004', op: 'Rahmat', msg: 'Lapor antrean Hopper 2 padat 3 unit.', resp: 'DISPATCH: Roger DT-1004, ikuti petunjuk FMS re-route ETO.' }
                ].map((r, i) => (
                  <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-amber-400 font-bold">{r.time} • <strong className="text-slate-100 font-sans">{r.unit} ({r.op})</strong></span>
                      <span className="text-sky-400 font-bold">CH 01</span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-sans italic">"{r.msg}"</p>
                    <p className="text-[9px] text-emerald-400 font-mono font-bold">{r.resp}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 1G: MASTER DATA DISPATCHER MANAGER (SHIFT SCHEDULE, LOADING/DUMPING POINTS & FMS RULES) */}
      {activeTab === 'master_data_dispatcher' && (
        <div className="space-y-6 text-xs">
          {/* Header Banner Master Data Dispatcher */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <Database className="w-5 h-5 text-sky-400" />
                Master Data Dispatcher Manager & FMS System Configuration
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                Katalog master jadwal shift dispatcher, registrasi titik loading & dumping site, algoritma aturan auto-dispatch FMS (Fleet Management System), serta frekuensi kanal radio komunikasi tambang.
              </p>
            </div>
            <button className="px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold flex items-center gap-2 text-xs transition-colors shrink-0">
              <Plus className="w-4 h-4" />
              <span>+ Tambah Configuration Master</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Master Shift & Roster Schedule Dispatcher */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-sky-400" /> Master Shift & Jadwal Roster Dispatcher</span>
                <span className="text-[10px] text-slate-400 font-mono">2 Shift Operations</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { shift: 'SHIFT A (DAY SHIFT)', hours: '07:00 - 19:00 WITA', lead: 'Hendra Wijaya (Chief Dispatcher)', radioCh: 'CH 01 (462.55 MHz)', fmsStatus: 'PRIMARY SERVER ONLINE' },
                  { shift: 'SHIFT B (NIGHT SHIFT)', hours: '19:00 - 07:00 WITA', lead: 'Ahmad Faisal (Senior Dispatcher)', radioCh: 'CH 01 (462.55 MHz)', fmsStatus: 'BACKUP SERVER READY' }
                ].map((s, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-400">{s.shift}</span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">{s.hours}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-sans">Lead: <strong className="text-slate-100">{s.lead}</strong> • Kanal: {s.radioCh}</p>
                    <span className="text-[9px] text-sky-400 font-mono font-bold">{s.fmsStatus}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Loading & Dumping Points Catalog */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> Master Titik Loading & Dumping Point Site</span>
                <span className="text-[10px] text-slate-400 font-mono">Site Location Catalog</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { pointId: 'LOAD-PIT-A40', type: 'LOADING POINT', name: 'Pit A Bench 40 RL', oreGrade: 'Ni 1.8% (High Grade)', cap: 'Max 2 Heavy Excavators', targetCycle: '21.5 Min' },
                  { pointId: 'LOAD-PIT-B20', type: 'LOADING POINT', name: 'Pit B Bench 20 RL', oreGrade: 'Ni 1.4% (Medium Grade)', cap: 'Max 2 Excavators', targetCycle: '16.0 Min' },
                  { pointId: 'DUMP-HOPPER-1', type: 'DUMPING POINT', name: 'Hopper Jetty Station 1', oreGrade: 'Direct Feed Crusher', cap: 'Max 3 Trucks Queue', targetCycle: '2.0 Min Dump' },
                  { pointId: 'DUMP-ETO-FEED', type: 'DUMPING POINT', name: 'Stockpile ETO Feed Station', oreGrade: 'Blending Stockpile', cap: 'Max 5 Trucks Queue', targetCycle: '1.5 Min Dump' }
                ].map((p, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-emerald-400">{p.pointId}</span> • <strong className="text-slate-100 font-sans">{p.name}</strong>
                      <p className="text-[10px] text-slate-400 font-sans">Kadar/Tipe: <span className="text-amber-400">{p.oreGrade}</span> • {p.cap}</p>
                    </div>
                    <div className="text-right shrink-0 ml-2 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 text-[9px] font-bold block">{p.type}</span>
                      <span className="text-[9px] text-slate-500">Target: {p.targetCycle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Aturan & Algoritma FMS Auto-Dispatch */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-amber-400" /> Master Aturan & Algoritma FMS Auto-Dispatch</span>
                <span className="text-[10px] text-slate-400 font-mono">FMS Algorithm Rules</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { ruleId: 'RULE-FMS-01', name: 'Dynamic Queue Minimization Algorithm', desc: 'Mencegah antrean > 2 unit dumper di shovel loading dengan mengalihkan otomatis ke loading point terdekat.', status: 'ENABLED ACTIVE' },
                  { ruleId: 'RULE-FMS-02', name: 'Grade Quality Blending Auto-Routing', desc: 'Mengarahkan otomatis dump truck dari Pit A (Ni > 1.8%) ke Hopper Jetty untuk pemenuhan kuota barging.', status: 'ENABLED ACTIVE' },
                  { ruleId: 'RULE-FMS-03', name: 'Fuel & Grade Economy Speed Control', desc: 'Membatasi otomatis target speed di turunan KM 12 untuk efisiensi konsumsi BBM solar B35.', status: 'ENABLED ACTIVE' }
                ].map((r, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-amber-400">{r.ruleId} • <strong className="text-slate-100 font-sans">{r.name}</strong></span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">{r.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-sans">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Master Radio Channel Frequencies & Call Signs */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="flex items-center gap-2"><Radio className="w-4 h-4 text-indigo-400" /> Master Frekuensi Radio Interkom & Call Signs Site</span>
                <span className="text-[10px] text-slate-400 font-mono">Radio Frequencies</span>
              </h3>
              <div className="space-y-2 font-mono text-xs">
                {[
                  { ch: 'CHANNEL 01', freq: '462.550 MHz', usage: 'Mine Dispatch & FMS Hauling Main Channel', callSign: 'DISPATCH CONTROL' },
                  { ch: 'CHANNEL 02', freq: '462.575 MHz', usage: 'Pit A Safety & Heavy Shovel Operations', callSign: 'PIT ALPHA BASE' },
                  { ch: 'CHANNEL 03', freq: '462.600 MHz', usage: 'Pit B Operations & Waste Dump Disposal', callSign: 'PIT BETA BASE' },
                  { ch: 'CHANNEL 04', freq: '462.625 MHz', usage: 'Jetty Port & Barging Feed Control', callSign: 'JETTY PORT CONTROL' }
                ].map((c, i) => (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="font-bold text-indigo-400">{c.ch} ({c.freq})</span> • <strong className="text-slate-100 font-sans">{c.callSign}</strong>
                      <p className="text-[10px] text-slate-400 font-sans">{c.usage}</p>
                    </div>
                    <div className="text-right shrink-0 ml-2 font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold block">ACTIVE</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: FLEET ROSTER & TELEMETRY */}
      {activeTab === 'fleet_telemetry' && (
        <div className="space-y-6">
          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari unit (PC2000, CAT 777E, Hilux)..."
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-64"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto custom-scrollbar">
              {['ALL', 'Excavator', 'Dump Truck', 'Dozer / Bulldozer', 'Loader', 'Light Vehicle', 'Fuel Truck', 'Water Truck'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors ${
                    filterType === type 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {type === 'ALL' ? 'Semua Kategori' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Equipment Table */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="p-3">Kode Unit</th>
                    <th className="p-3">Kategori & Model Heavy Duty</th>
                    <th className="p-3">Lokasi Pit / Front Work</th>
                    <th className="p-3">Operator Shift</th>
                    <th className="p-3">Total Jam Kerja (HM)</th>
                    <th className="p-3">Fuel Rate (L/Jam)</th>
                    <th className="p-3">Kesehatan Mesin</th>
                    <th className="p-3 text-right">Status Operasional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {filteredFleet.map((eq) => (
                    <tr key={eq.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-mono font-bold text-emerald-400">{eq.code}</td>
                      <td className="p-3">
                        <span className="font-semibold text-slate-100 block">{eq.modelName}</span>
                        <span className="text-[10px] text-slate-400">{eq.category}</span>
                      </td>
                      <td className="p-3 text-slate-300">{eq.locationPit}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                          <span>{eq.assignedOperator}</span>
                        </div>
                      </td>
                      <td className="p-3 font-mono">{(eq.engineHoursTotal ?? 0).toLocaleString('id-ID')} HM</td>
                      <td className="p-3 font-mono text-amber-300">{eq.fuelLiterPerHour} L/Jam</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                eq.healthScorePercent > 85 ? 'bg-emerald-400' : eq.healthScorePercent > 70 ? 'bg-amber-400' : 'bg-rose-500'
                              }`} 
                              style={{ width: `${eq.healthScorePercent}%` }} 
                            />
                          </div>
                          <span className="font-mono text-[11px] font-bold">{eq.healthScorePercent}%</span>
                        </div>
                      </td>
                      <td className="p-3 text-right">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                          eq.status === 'OPERATIONAL' 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : eq.status === 'MAINTENANCE' 
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                        }`}>
                          {eq.status}
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

      {/* TAB 2: MAINTENANCE WORK ORDERS */}
      {activeTab === 'maintenance_pm_cm' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">SPK Workshop Maintenance (Preventive PM, Corrective CM & Predictive)</h3>
              <button
                onClick={() => setIsSpkModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat SPK Service Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {maintenanceWorkOrders.map((wo) => (
                <div key={wo.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block">{wo.id}</span>
                      <strong className="text-slate-100 text-sm font-bold">{wo.unitCode}</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      {wo.type}
                    </span>
                  </div>

                  <p className="text-slate-300 font-semibold">{wo.component}</p>

                  <div className="space-y-1 text-slate-400 text-[11px]">
                    <p>Lokasi Workshop: <strong className="text-slate-200">{wo.workshopBay}</strong></p>
                    <p>Mekanik Lead: <strong className="text-slate-200">{wo.mechanicLead}</strong></p>
                    <p>Estimasi Selesai: <strong className="text-emerald-400">{wo.estCompletion}</strong></p>
                  </div>

                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Progress Pengerjaan:</span>
                      <span className="font-mono text-emerald-400 font-bold">{wo.progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${wo.progressPct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: B35 FUEL MANAGEMENT */}
      {activeTab === 'fuel_b35_management' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Manajemen Refueling Solar Biodiesel B35 & Fuel Truck Station</h3>
                <p className="text-slate-400 text-[11px]">Pencatatan Distribusi BBM Solar ke Alat Berat di Pit via Fuel Truck FT-6001</p>
              </div>

              <button
                onClick={() => setIsFuelModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Catat Pengisian B35</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">ID Refuel</th>
                    <th className="py-2.5 px-3">Waktu Stempel</th>
                    <th className="py-2.5 px-3">Kode Unit</th>
                    <th className="py-2.5 px-3">Fuel Truck Dispatcher</th>
                    <th className="py-2.5 px-3">Volume Solar (Liter)</th>
                    <th className="py-2.5 px-3">Operator Penerima</th>
                    <th className="py-2.5 px-3">Jenis BBM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {refuelingLogs.map((fl) => (
                    <tr key={fl.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{fl.id}</td>
                      <td className="py-3 px-3 text-slate-400">{fl.timestamp}</td>
                      <td className="py-3 px-3 text-slate-100 font-bold">{fl.unitCode}</td>
                      <td className="py-3 px-3 text-slate-300 font-sans">{fl.fuelTruck}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{fl.volumeL} L</td>
                      <td className="py-3 px-3 text-slate-200 font-sans">{fl.operator}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                          {fl.fuelType}
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

      {/* TAB: OTR TYRE TREAD TRACKING */}
      {activeTab === 'otr_tyre_tracking' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pelacakan Ketebalan Tread Depth Ban OTR 27.00R49 Dump Truck & Cost per Hour
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">No Seri Ban</th>
                    <th className="py-2.5 px-3">Merek & Spesifikasi Ban</th>
                    <th className="py-2.5 px-3">Unit & Posisi</th>
                    <th className="py-2.5 px-3">Tread Depth (mm)</th>
                    <th className="py-2.5 px-3">Original Depth</th>
                    <th className="py-2.5 px-3">Cost per Hour ($/HM)</th>
                    <th className="py-2.5 px-3">Status Kelayakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {otrTyreTrackingList.map((tyre, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{tyre.serialNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{tyre.brandModel}</td>
                      <td className="py-3 px-3 text-slate-300">{tyre.assignedUnit} ({tyre.position})</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{tyre.treadDepthMm} mm</td>
                      <td className="py-3 px-3 text-slate-400">{tyre.originalTreadMm} mm</td>
                      <td className="py-3 px-3 text-emerald-400">${tyre.costPerHmUsd} / HM</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          tyre.condition === 'GOOD' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {tyre.condition}
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

      {/* TAB: P2H DAILY INSPECTION CHECKLIST */}
      {activeTab === 'p2h_daily_inspection' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Pemeriksaan & Perawatan Harian (P2H) Pre-Shift Operator Checklist</h3>
                <p className="text-slate-400 text-[11px]">Verifikasi Oli Mesin, Sistem Rem, Kemudi & Kebocoran Hidrolik Sebelum Shift</p>
              </div>

              <button
                onClick={() => setIsP2hModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Input Form P2H Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">ID Log P2H</th>
                    <th className="py-2.5 px-3">Waktu Inspeksi</th>
                    <th className="py-2.5 px-3">Kode Unit</th>
                    <th className="py-2.5 px-3">Operator Shift</th>
                    <th className="py-2.5 px-3">Oli Mesin</th>
                    <th className="py-2.5 px-3">Sistem Hidrolik</th>
                    <th className="py-2.5 px-3">Rem & Kemudi</th>
                    <th className="py-2.5 px-3">Status Kelayakan Shift</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {p2hLogsList.map((p2h) => (
                    <tr key={p2h.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{p2h.id}</td>
                      <td className="py-3 px-3 text-slate-400">{p2h.timestamp}</td>
                      <td className="py-3 px-3 text-slate-100 font-bold">{p2h.unitCode}</td>
                      <td className="py-3 px-3 text-slate-300 font-sans">{p2h.operator}</td>
                      <td className="py-3 px-3 text-emerald-400">{p2h.engineOil}</td>
                      <td className="py-3 px-3 text-emerald-400">{p2h.hydraulic}</td>
                      <td className="py-3 px-3 text-emerald-400">{p2h.brakeSteering}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          p2h.status === 'FIT_TO_OPERATE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {p2h.status}
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

      {/* Modal 1: Buat SPK Service Workshop */}
      {isSpkModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-400" /> Buat Surat Perintah Kerja (SPK) Service
              </h3>
              <button onClick={() => setIsSpkModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Pilih Kode Unit Alat Berat:</label>
                <select
                  value={spkUnitCode}
                  onChange={(e) => setSpkUnitCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                >
                  {fullEquipmentFleet.map(e => (
                    <option key={e.id} value={e.code}>{e.code} - {e.modelName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Jenis Perawatan:</label>
                <select
                  value={spkType}
                  onChange={(e) => setSpkType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="PM (Preventive Maintenance)">PM (Preventive Maintenance 250H/500H)</option>
                  <option value="CM (Corrective Maintenance)">CM (Corrective Breakdown Repair)</option>
                  <option value="PREDICTIVE_INSPECTION">Predictive AI Anomaly Inspection</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Komponen / Deskripsi Pekerjaan:</label>
                <input
                  type="text"
                  value={spkComponent}
                  onChange={(e) => setSpkComponent(e.target.value)}
                  placeholder="e.g., Service Periodic 250 HM & Ganti Filter Oli"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setIsSpkModalOpen(false);
                  setSpkComponent('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Terbitkan SPK Workshop
              </button>
              <button
                onClick={() => setIsSpkModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Catat Refueling Solar B35 */}
      {isFuelModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Fuel className="w-4 h-4 text-amber-400" /> Pencatatan Refueling Solar B35
              </h3>
              <button onClick={() => setIsFuelModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Pilih Unit Penerima BBM:</label>
                <select
                  value={fuelUnitCode}
                  onChange={(e) => setFuelUnitCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                >
                  {fullEquipmentFleet.map(e => (
                    <option key={e.id} value={e.code}>{e.code} - {e.modelName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Volume Solar Disalurkan (Liter):</label>
                <input
                  type="number"
                  value={fuelLitersInput}
                  onChange={(e) => setFuelLitersInput(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setRefuelingLogs(prev => [
                    {
                      id: `FL-${8804 + prev.length}`,
                      timestamp: 'Baru Saja',
                      unitCode: fuelUnitCode,
                      fuelTruck: 'FT-6001',
                      volumeL: fuelLitersInput,
                      operator: 'Operator Duty',
                      fuelType: 'Biodiesel B35'
                    },
                    ...prev
                  ]);
                  setIsFuelModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Simpan Log Refuel
              </button>
              <button
                onClick={() => setIsFuelModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Input Checklist P2H */}
      {isP2hModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" /> Form Inspeksi Harian P2H Pre-Shift
              </h3>
              <button onClick={() => setIsP2hModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Kode Unit Alat Berat:</label>
                <select
                  value={p2hUnitCode}
                  onChange={(e) => setP2hUnitCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                >
                  {fullEquipmentFleet.map(e => (
                    <option key={e.id} value={e.code}>{e.code} - {e.modelName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Tambahan Operator:</label>
                <input
                  type="text"
                  value={p2hNotes}
                  onChange={(e) => setP2hNotes(e.target.value)}
                  placeholder="e.g., Kondisi mesin prima, oli normal"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setP2hLogsList(prev => [
                    {
                      id: `P2H-${904 + prev.length}`,
                      timestamp: 'Baru Saja',
                      unitCode: p2hUnitCode,
                      operator: 'Operator Active Shift',
                      shift: 'Shift Active',
                      engineOil: 'PASS',
                      hydraulic: 'PASS',
                      brakeSteering: 'PASS',
                      status: 'FIT_TO_OPERATE'
                    },
                    ...prev
                  ]);
                  setIsP2hModalOpen(false);
                  setP2hNotes('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Submit Checklist P2H
              </button>
              <button
                onClick={() => setIsP2hModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPAREPARTS, TYRES & BATTERY */}
      {activeTab === 'spareparts_tyres' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Inventaris Gudang Sparepart, Ban OTR Heavy Duty & Accumulator Battery
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Kode Barang</th>
                    <th className="py-2.5 px-3">Deskripsi Komponen Sparepart</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3">Stok Gudang Site</th>
                    <th className="py-2.5 px-3">Batas Min Stok</th>
                    <th className="py-2.5 px-3">Harga Estimasi (USD)</th>
                    <th className="py-2.5 px-3">Status Inventaris</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {sparePartsInventory.map((sp) => (
                    <tr key={sp.itemCode} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200">{sp.itemCode}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{sp.description}</td>
                      <td className="py-3 px-3 font-sans text-emerald-400">{sp.category}</td>
                      <td className="py-3 px-3 text-slate-100 font-bold">{sp.stockQty} Unit</td>
                      <td className="py-3 px-3 text-slate-400">{sp.minStock} Unit</td>
                      <td className="py-3 px-3 text-amber-300">${(sp.unitPriceUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          sp.status === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {sp.status}
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

      {/* TAB 4: MACHINE HISTORY LOGS */}
      {activeTab === 'machine_history' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
            Riwayat Mesin & Catatan Perbaikan Alat Berat (Machine Lifecycle Log)
          </h3>

          <div className="space-y-3">
            {machineHistoryLogs.map((log, i) => (
              <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-emerald-400 font-bold">{log.unitCode}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 font-bold">{log.eventType}</span>
                  </div>
                  <p className="text-slate-400">{log.notes}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-slate-500 text-[10px] block">{log.timestamp}</span>
                  <span className="text-slate-400 text-[11px]">{log.loggedBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: KPI METRICS (PA, MA, UT, MTBF, MTTR) */}
      {activeTab === 'kpi_availability' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Kinerja Efisiensi Fleet KPI (Physical Availability PA, Mechanical Availability MA, Utilization UT, MTBF & MTTR)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Kode Unit</th>
                    <th className="py-2.5 px-3">Model Alat</th>
                    <th className="py-2.5 px-3">Physical Availability (PA %)</th>
                    <th className="py-2.5 px-3">Mechanical Availability (MA %)</th>
                    <th className="py-2.5 px-3">Utilization (UT %)</th>
                    <th className="py-2.5 px-3">MTBF (Jam Kerusakan)</th>
                    <th className="py-2.5 px-3">MTTR (Jam Perbaikan)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {fullEquipmentFleet.map((eq) => (
                    <tr key={eq.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{eq.code}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{eq.modelName}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{eq.paPct}%</td>
                      <td className="py-3 px-3 text-blue-400 font-bold">{eq.maPct}%</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{eq.utPct}%</td>
                      <td className="py-3 px-3 text-slate-200">{eq.mtbfHr} HM</td>
                      <td className="py-3 px-3 text-slate-300">{eq.mttrHr} Jam</td>
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
