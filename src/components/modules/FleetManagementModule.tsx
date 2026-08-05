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
  Check
} from 'lucide-react';
import { HeavyEquipment, Language } from '../../types';

interface FleetManagementModuleProps {
  equipment: HeavyEquipment[];
  language: Language;
  onUpdateEquipmentStatus: (id: string, status: HeavyEquipment['status']) => void;
}

export const FleetManagementModule: React.FC<FleetManagementModuleProps> = ({
  equipment,
  language,
  onUpdateEquipmentStatus
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'fleet_telemetry'
    | 'maintenance_pm_cm'
    | 'fuel_b35_management'
    | 'spareparts_tyres'
    | 'otr_tyre_tracking'
    | 'p2h_daily_inspection'
    | 'machine_history'
    | 'kpi_availability'
  >('fleet_telemetry');

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

      {/* Navigation Sub-Tabs covering all requested keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'fleet_telemetry', label: 'Fleet Roster & Telemetry', icon: Truck },
          { id: 'maintenance_pm_cm', label: 'Maintenance (PM / CM / Workshop)', icon: Wrench },
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
