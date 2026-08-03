import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Truck, 
  Activity, 
  UserCheck, 
  ShieldAlert, 
  Zap, 
  Play, 
  Pause, 
  RotateCcw, 
  Compass, 
  Fuel, 
  Gauge, 
  Clock, 
  Radio, 
  Layers, 
  Eye, 
  Search, 
  Filter, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Globe, 
  Maximize2, 
  Download, 
  Sliders, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  BellRing, 
  Video, 
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  ComposedChart 
} from 'recharts';
import { HeavyEquipment, Language } from '../../types';

interface GpsTelemetryTrackingModuleProps {
  equipment: HeavyEquipment[];
  language: Language;
}

export const GpsTelemetryTrackingModule: React.FC<GpsTelemetryTrackingModuleProps> = ({
  equipment,
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'live_tracking'
    | 'fleet_monitoring'
    | 'driver_monitoring'
    | 'speed_idle_analysis'
    | 'fuel_telemetry'
    | 'geofence_zones'
    | 'route_replay'
  >('live_tracking');

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('DT-1001');
  const [isPlayingReplay, setIsPlayingReplay] = useState<boolean>(false);
  const [replayProgress, setReplayProgress] = useState<number>(35);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Auto animation loop for route replay
  useEffect(() => {
    let interval: any = null;
    if (isPlayingReplay) {
      interval = setInterval(() => {
        setReplayProgress((prev) => (prev >= 100 ? 0 : prev + 2));
      }, 300);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlayingReplay]);

  // GPS Live Tracking Fleet Vehicles Dataset
  const gpsFleetUnits = [
    { id: 'DT-1001', code: 'DT-1001 (Caterpillar 777E)', category: 'Dump Truck', driverName: 'Eko Prasetyo', status: 'MOVING', speedKmh: 34, maxSpeedLimitKmh: 35, idleTimeMin: 4, fuelLevelPct: 82, fuelLiterPerHour: 88, geofenceZone: 'Haul Road KM 06', lat: -2.5210, lng: 121.3420, fatigueAlert: 'NORMAL', signalRssi: 'EXCELLENT' },
    { id: 'DT-1002', code: 'DT-1002 (Caterpillar 777E)', category: 'Dump Truck', driverName: 'Andi Suherman', status: 'SPEEDING', speedKmh: 42, maxSpeedLimitKmh: 35, idleTimeMin: 2, fuelLevelPct: 74, fuelLiterPerHour: 96, geofenceZone: 'Haul Road KM 09 Hill', lat: -2.5255, lng: 121.3480, fatigueAlert: 'WARNING_EYE_CLOSURE', signalRssi: 'GOOD' },
    { id: 'EX-2001', code: 'EX-2001 (Komatsu PC2000)', category: 'Excavator', driverName: 'Budi Santoso', status: 'OPERATIONAL_IDLE', speedKmh: 0, maxSpeedLimitKmh: 10, idleTimeMin: 18, fuelLevelPct: 68, fuelLiterPerHour: 45, geofenceZone: 'Pit Alpha - Front Bench +120', lat: -2.5180, lng: 121.3390, fatigueAlert: 'NORMAL', signalRssi: 'EXCELLENT' },
    { id: 'DZ-3001', code: 'DZ-3001 (CAT D10T2)', category: 'Bulldozer', driverName: 'Agus Wijaya', status: 'STOPPED', speedKmh: 0, maxSpeedLimitKmh: 15, idleTimeMin: 42, fuelLevelPct: 52, fuelLiterPerHour: 18, geofenceZone: 'Pit Beta - Waste Dump West', lat: -2.5310, lng: 121.3520, fatigueAlert: 'NORMAL', signalRssi: 'MODERATE' },
    { id: 'LV-5001', code: 'LV-5001 (Toyota Hilux 4x4)', category: 'Light Vehicle', driverName: 'Hendra (Pit Supervisor)', status: 'MOVING', speedKmh: 28, maxSpeedLimitKmh: 40, idleTimeMin: 0, fuelLevelPct: 91, fuelLiterPerHour: 12, geofenceZone: 'Pit Corridor Main Gate', lat: -2.5150, lng: 121.3350, fatigueAlert: 'NORMAL', signalRssi: 'EXCELLENT' },
    { id: 'FT-6001', code: 'FT-6001 (Hino 500 Fuel Tanker)', category: 'Fuel Truck', driverName: 'Rahmat Hidayat', status: 'MOVING', speedKmh: 22, maxSpeedLimitKmh: 30, idleTimeMin: 6, fuelLevelPct: 88, fuelLiterPerHour: 22, geofenceZone: 'Haul Road Refueling Station', lat: -2.5220, lng: 121.3440, fatigueAlert: 'NORMAL', signalRssi: 'EXCELLENT' }
  ];

  // Geofence Zones Config Dataset
  const geofenceZonesData = [
    { zoneId: 'GEO-PIT-ALPHA', name: 'Pit Alpha Highwall Excavation Area', type: 'RESTRICTED_MINE_PIT', maxSpeedKmh: 25, activeVehiclesCount: 8, safetyRule: 'Helmet & High-Vis Vest Mandatory', status: 'ACTIVE' },
    { zoneId: 'GEO-HAUL-MAIN', name: 'Main Haul Road Corridor (KM 00 - KM 18)', type: 'HAUL_CORRIDOR', maxSpeedKmh: 35, activeVehiclesCount: 18, safetyRule: 'Overtaking Restricted on Hills', status: 'ACTIVE' },
    { zoneId: 'GEO-ETO-STOCKPILE', name: 'Stockpile ETO Alpha & Crusher Station', type: 'DUMPING_ZONE', maxSpeedKmh: 15, activeVehiclesCount: 5, safetyRule: 'Spotter Control Mandatory', status: 'ACTIVE' },
    { zoneId: 'GEO-JETTY-PORT', name: 'Port Jetty Terminal & Barge Loading', type: 'PORT_TERMINAL', maxSpeedKmh: 20, activeVehiclesCount: 4, safetyRule: 'Life Jacket Area On Pier', status: 'ACTIVE' }
  ];

  // Driver Fatigue & AI Camera Safety Monitoring
  const driverSafetyMonitoring = [
    { driverId: 'DRV-102', name: 'Andi Suherman', vehicleCode: 'DT-1002', fatigueLevel: 'HIGH_RISK', microSleepAlertsToday: 3, distractionYawning: 14, speedViolationsToday: 2, aiCameraStatus: 'ACTIVE_WARNING' },
    { driverId: 'DRV-105', name: 'Eko Prasetyo', vehicleCode: 'DT-1001', fatigueLevel: 'NORMAL', microSleepAlertsToday: 0, distractionYawning: 1, speedViolationsToday: 0, aiCameraStatus: 'NORMAL' },
    { driverId: 'DRV-108', name: 'Budi Santoso', vehicleCode: 'EX-2001', fatigueLevel: 'NORMAL', microSleepAlertsToday: 0, distractionYawning: 2, speedViolationsToday: 0, aiCameraStatus: 'NORMAL' },
    { driverId: 'DRV-112', name: 'Agus Wijaya', vehicleCode: 'DZ-3001', fatigueLevel: 'ATTENTION', microSleepAlertsToday: 1, distractionYawning: 6, speedViolationsToday: 1, aiCameraStatus: 'CAUTION' }
  ];

  // Realtime Speed & Fuel Flow Telemetry Graph Data
  const speedFuelTelemetryGraph = [
    { time: '07:00', speedKmh: 22, fuelRateLh: 65, idleMin: 0 },
    { time: '07:15', speedKmh: 34, fuelRateLh: 88, idleMin: 0 },
    { time: '07:30', speedKmh: 38, fuelRateLh: 98, idleMin: 0 },
    { time: '07:45', speedKmh: 0, fuelRateLh: 18, idleMin: 12 },
    { time: '08:00', speedKmh: 28, fuelRateLh: 72, idleMin: 0 },
    { time: '08:15', speedKmh: 35, fuelRateLh: 89, idleMin: 0 }
  ];

  // Route Replay Waypoints
  const routeWaypoints = [
    { step: 1, location: 'Pit Alpha - Front 1 Excavator EX-2001', timestamp: '07:05:12', speed: '0 km/h', note: 'Loading Saprolite Ore' },
    { step: 2, location: 'Haul Road KM 02 Junction', timestamp: '07:12:45', speed: '32 km/h', note: 'In Transit to ETO' },
    { step: 3, location: 'Haul Road KM 08 Hill Section', timestamp: '07:22:10', speed: '24 km/h', note: 'Uphill Loaded Dump' },
    { step: 4, location: 'Stockpile ETO Alpha Block C', timestamp: '07:34:00', speed: '5 km/h', note: 'Dumping Ore at Stockpile' },
    { step: 5, location: 'Return Haul Road Empty Travel', timestamp: '07:45:20', speed: '35 km/h', note: 'Returning to Pit Alpha' }
  ];

  const filteredGpsUnits = gpsFleetUnits.filter((u) => {
    return (
      u.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.geofenceZone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              GPS Telemetry & AI Driver Safety Command Center
            </span>
            <span className="text-slate-400 text-xs">• Real-time Satellite & Sensor Tracking</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Pusat Pengawasan GPS, Live Fleet & AI Fatigue Driver
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pemantauan posisi GPS waktu-nyata, pembatasan kecepatan (speeding alert), waktu idle mesin, sensor konsumsi BBM solar, zona geofence otomatis, kamera AI pencegah kantuk operator, serta fitur pemutaran ulang rute (Route Replay).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 text-xs shadow-inner">
            <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
            <div>
              <span className="text-slate-400 text-[10px] block">Sinyal GPS Satelit Active:</span>
              <strong className="text-emerald-400 font-mono text-sm">48 Unit Online</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs covering all 10 requested keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'live_tracking', label: 'Live GPS Map Tracking', icon: MapPin },
          { id: 'fleet_monitoring', label: 'Fleet Vehicle Monitoring', icon: Truck },
          { id: 'driver_monitoring', label: 'Driver Monitoring & Fatigue AI', icon: Eye },
          { id: 'speed_idle_analysis', label: 'Speeding & Idle Time Analysis', icon: Gauge },
          { id: 'fuel_telemetry', label: 'Fuel Sensor Telemetry', icon: Fuel },
          { id: 'geofence_zones', label: 'Geofence Zone Config', icon: Compass },
          { id: 'route_replay', label: 'Route Historical Replay', icon: RotateCcw }
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

      {/* TAB 1: LIVE GPS MAP TRACKING */}
      {activeTab === 'live_tracking' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          {/* Map Simulation Viewer */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-sm">Peta Geospasial Tracking GPS Satelit Waktu-Nyata</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                LIVE TELEMETRY 100ms
              </span>
            </div>

            {/* Canvas/Map Container */}
            <div className="relative h-96 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
              {/* Radial map grid background */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] opacity-25" />
              
              {/* Geofence Overlay outlines */}
              <div className="absolute top-8 left-12 w-48 h-32 border-2 border-emerald-500/40 bg-emerald-500/10 rounded-2xl flex items-start p-2">
                <span className="text-[10px] font-bold text-emerald-400 font-mono">GEOFENCE: PIT ALPHA</span>
              </div>

              <div className="absolute bottom-10 right-16 w-56 h-36 border-2 border-amber-500/40 bg-amber-500/10 rounded-2xl flex items-start p-2">
                <span className="text-[10px] font-bold text-amber-400 font-mono">GEOFENCE: ETO STOCKPILE</span>
              </div>

              {/* Vehicle Markers */}
              {gpsFleetUnits.map((v, idx) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicleId(v.id)}
                  style={{ top: `${25 + idx * 12}%`, left: `${20 + idx * 14}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2 rounded-xl border shadow-xl transition-all hover:scale-110 flex items-center gap-2 ${
                    selectedVehicleId === v.id
                      ? 'bg-emerald-600 border-white text-white z-20 shadow-emerald-500/30'
                      : v.status === 'SPEEDING'
                      ? 'bg-rose-900/90 border-rose-500 text-rose-200 z-10'
                      : 'bg-slate-900/90 border-slate-700 text-slate-200 z-10'
                  }`}
                >
                  <Navigation className={`w-4 h-4 ${v.status === 'MOVING' ? 'text-emerald-400 animate-spin' : ''}`} />
                  <div>
                    <span className="font-bold block text-[11px]">{v.id}</span>
                    <span className="text-[9px] opacity-80">{v.speedKmh} km/h</span>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-slate-800 text-[10px] text-slate-400 space-y-1">
                <p className="font-bold text-slate-200">Keterangan Marker Map:</p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Operasional Normal</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Speeding Warning</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Idle Mesin</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Fleet List Panel */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Armada GPS Terhubung</h3>
              <span className="text-slate-400 font-mono">{filteredGpsUnits.length} Unit</span>
            </div>

            <div className="space-y-2.5 max-h-[380px] overflow-y-auto custom-scrollbar">
              {filteredGpsUnits.map((u) => (
                <div
                  key={u.id}
                  onClick={() => setSelectedVehicleId(u.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    selectedVehicleId === u.id
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-slate-100'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-100">{u.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      u.status === 'MOVING' ? 'bg-emerald-500/20 text-emerald-400' :
                      u.status === 'SPEEDING' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {u.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                    <div>Kecepatan: <strong className="text-emerald-400 font-mono">{u.speedKmh} km/h</strong></div>
                    <div>BBM Solar: <strong className="text-amber-300 font-mono">{u.fuelLevelPct}%</strong></div>
                    <div>Operator: <strong className="text-slate-200">{u.driverName}</strong></div>
                    <div>Geofence: <strong className="text-slate-200">{u.geofenceZone}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FLEET VEHICLE MONITORING */}
      {activeTab === 'fleet_monitoring' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Status Telemetri Kendaraan & Alat Berat (Vehicle Monitoring Dashboard)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {gpsFleetUnits.map((v) => (
                <div key={v.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-slate-100">{v.code}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono text-[10px]">
                      {v.signalRssi}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-slate-300 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Pengemudi (Driver):</span>
                      <strong className="text-slate-100">{v.driverName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Kecepatan Realtime:</span>
                      <strong className="text-emerald-400 font-mono">{v.speedKmh} km/h (Limit: {v.maxSpeedLimitKmh})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Waktu Idle Mesin:</span>
                      <strong className="text-amber-400 font-mono">{v.idleTimeMin} Menit</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Konsumsi BBM:</span>
                      <strong className="text-amber-300 font-mono">{v.fuelLiterPerHour} L/Jam ({v.fuelLevelPct}%)</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DRIVER MONITORING & FATIGUE AI */}
      {activeTab === 'driver_monitoring' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Kamera AI Safety Driver Fatigue & Micro-Sleep Prevention</h3>
                <p className="text-slate-400 text-[11px]">Deteksi Dini Kantuk, Menguap & Gangguan Fokus Operator Shift</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-bold">
                DSM AI Camera ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {driverSafetyMonitoring.map((d) => (
                <div key={d.driverId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div>
                      <strong className="text-slate-100 text-sm font-bold block">{d.name}</strong>
                      <span className="text-slate-400 text-[10px]">Unit Assigned: {d.vehicleCode}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                      d.fatigueLevel === 'HIGH_RISK' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                      d.fatigueLevel === 'ATTENTION' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {d.fatigueLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] text-center">
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Micro-Sleep Alert</span>
                      <strong className="text-rose-400 font-mono text-sm">{d.microSleepAlertsToday}x</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Menguap / Yawn</span>
                      <strong className="text-amber-400 font-mono text-sm">{d.distractionYawning}x</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Speeding Violation</span>
                      <strong className="text-slate-100 font-mono text-sm">{d.speedViolationsToday}x</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SPEED & IDLE ANALYSIS */}
      {activeTab === 'speed_idle_analysis' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Grafik Analisis Kecepatan (Speed km/h) & Waktu Idle Mesin (Menit) Jam-jaman
            </h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={speedFuelTelemetryGraph}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="idleMin" name="Idle Mesin (Menit)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="speedKmh" name="Kecepatan DT (km/h)" stroke="#10B981" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FUEL TELEMETRY */}
      {activeTab === 'fuel_telemetry' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Sensor Kapasitif BBM Solar & Deteksi Siphoning / Kebocoran Tangki
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 block">Status Aliran BBM Normal:</span>
                <p className="text-slate-300">
                  Seluruh unit Dump Truck 777E & PC2000 beroperasi dengan rata-rata konsumsi 88 L/Jam. Tidak ada anomali penurunan mendadak level tangki.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400 block">Sistem Anti-Fuel Theft Alert:</span>
                <p className="text-slate-300">
                  Sensor tangki GPS mengirim notifikasi otomatis jika terdapat indikasi penyedotan BBM ilegal (Siphoning) saat mesin mati.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: GEOFENCE ZONES */}
      {activeTab === 'geofence_zones' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {geofenceZonesData.map((g) => (
              <div key={g.zoneId} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div>
                    <span className="font-bold text-slate-100 text-sm block">{g.name}</span>
                    <span className="text-slate-400 text-[10px]">Kode: {g.zoneId}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                    {g.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-slate-300 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Batas Kecepatan Maksimum:</span>
                    <strong className="text-emerald-400 font-mono">{g.maxSpeedKmh} km/h</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Armada Aktif di Zona:</span>
                    <strong className="text-slate-100 font-mono">{g.activeVehiclesCount} Unit</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Aturan Keselamatan:</span>
                    <strong className="text-amber-300">{g.safetyRule}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: ROUTE REPLAY */}
      {activeTab === 'route_replay' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-base">Pemutaran Ulang Histori Rute Perjalanan (Historical Route Replay)</h3>
                <p className="text-slate-400 text-[11px]">Unit: DT-1001 (Caterpillar 777E) • Tanggal: 03 Agustus 2026 Shift 1</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingReplay(!isPlayingReplay)}
                  className={`px-4 py-2 rounded-xl text-white font-bold transition-all flex items-center gap-2 ${
                    isPlayingReplay ? 'bg-amber-600 hover:bg-amber-500' : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  {isPlayingReplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlayingReplay ? 'Jeda Replay' : 'Putar Replay'}</span>
                </button>

                <button
                  onClick={() => { setIsPlayingReplay(false); setReplayProgress(0); }}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Timeline Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>07:00:00 (Start Pit)</span>
                <span className="text-emerald-400 font-bold font-mono">Progress: {replayProgress}%</span>
                <span>08:00:00 (Return Pit)</span>
              </div>
              <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${replayProgress}%` }}
                />
              </div>
            </div>

            {/* Waypoints Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Step</th>
                    <th className="py-2.5 px-3">Lokasi / Titik GPS</th>
                    <th className="py-2.5 px-3">Waktu Stempel</th>
                    <th className="py-2.5 px-3">Kecepatan</th>
                    <th className="py-2.5 px-3">Catatan Operasional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {routeWaypoints.map((w) => (
                    <tr key={w.step} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">#{w.step}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{w.location}</td>
                      <td className="py-3 px-3 text-slate-400">{w.timestamp}</td>
                      <td className="py-3 px-3 text-amber-300">{w.speed}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{w.note}</td>
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
