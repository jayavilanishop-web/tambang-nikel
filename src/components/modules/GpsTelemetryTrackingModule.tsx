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
  Cpu,
  Map,
  Anchor,
  Pickaxe,
  Route,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Layers3
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
import { GoogleMiningMap } from '../maps/GoogleMiningMap';

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

  // Interactive Inspector Modal & Dispatch Alert
  const [inspectVehicle, setInspectVehicle] = useState<any | null>(null);
  const [dispatchAlertNotice, setDispatchAlertNotice] = useState<string | null>(null);

  // GIS Interactive Map View State (MAP, Google Maps, Satellite, Mining Area, Geofence, Pit, Hauling Road, Stockpile, Jetty, Equipment Position)
  const [mapMode, setMapMode] = useState<'GOOGLE_MAPS' | 'SATELLITE' | 'MINING_AREA' | 'TERRAIN'>('SATELLITE');
  const [mapZoom, setMapZoom] = useState<number>(14);
  const [activeLayers, setActiveLayers] = useState({
    geofence: true,
    pit: true,
    haulingRoad: true,
    stockpile: true,
    jetty: true,
    equipmentPos: true
  });

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
        <div className="space-y-4 text-xs">
          
          {/* Map Controls Top Header Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            
            {/* Map Type Switcher (MAP, Google Maps, Satellite, Mining Area) */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold text-[11px] flex items-center gap-1.5 shrink-0">
                <Map className="w-3.5 h-3.5 text-emerald-400" /> Mode Peta:
              </span>
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setMapMode('SATELLITE')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    mapMode === 'SATELLITE'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" /> Satellite
                </button>
                <button
                  onClick={() => setMapMode('GOOGLE_MAPS')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    mapMode === 'GOOGLE_MAPS'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Map className="w-3.5 h-3.5" /> Google Maps
                </button>
                <button
                  onClick={() => setMapMode('MINING_AREA')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    mapMode === 'MINING_AREA'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Pickaxe className="w-3.5 h-3.5" /> Mining Area CAD
                </button>
                <button
                  onClick={() => setMapMode('TERRAIN')}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                    mapMode === 'TERRAIN'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" /> 3D Terrain
                </button>
              </div>
            </div>

            {/* GIS Layer Toggles (Geofence, Pit, Hauling Road, Stockpile, Jetty, Equipment Position) */}
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="text-slate-400 font-bold flex items-center gap-1 shrink-0">
                <Layers3 className="w-3.5 h-3.5 text-blue-400" /> Layer GIS:
              </span>
              
              <button
                onClick={() => setActiveLayers(p => ({ ...p, geofence: !p.geofence }))}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1 ${
                  activeLayers.geofence 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                <ShieldAlert className="w-3 h-3" /> Geofence
              </button>

              <button
                onClick={() => setActiveLayers(p => ({ ...p, pit: !p.pit }))}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1 ${
                  activeLayers.pit 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                <Pickaxe className="w-3 h-3" /> Pit Area
              </button>

              <button
                onClick={() => setActiveLayers(p => ({ ...p, haulingRoad: !p.haulingRoad }))}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1 ${
                  activeLayers.haulingRoad 
                    ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' 
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                <Route className="w-3 h-3" /> Hauling Road
              </button>

              <button
                onClick={() => setActiveLayers(p => ({ ...p, stockpile: !p.stockpile }))}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1 ${
                  activeLayers.stockpile 
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' 
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                <Layers className="w-3 h-3" /> Stockpile
              </button>

              <button
                onClick={() => setActiveLayers(p => ({ ...p, jetty: !p.jetty }))}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1 ${
                  activeLayers.jetty 
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                <Anchor className="w-3 h-3" /> Jetty Port
              </button>

              <button
                onClick={() => setActiveLayers(p => ({ ...p, equipmentPos: !p.equipmentPos }))}
                className={`px-2.5 py-1 rounded-lg font-bold border transition-all flex items-center gap-1 ${
                  activeLayers.equipmentPos 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' 
                    : 'bg-slate-950 text-slate-500 border-slate-800'
                }`}
              >
                <Truck className="w-3 h-3" /> Equipment Pos
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Interactive Geospatial Map Screen */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-slate-100 text-sm">
                    {mapMode === 'SATELLITE' && 'Live High-Res Satellite Orthophoto Stream (WGS84)'}
                    {mapMode === 'GOOGLE_MAPS' && 'Google Maps API Hybrid Layer (Mining Road & Labels)'}
                    {mapMode === 'MINING_AREA' && 'Mining Area CAD Mine Plan Spatial Vector Map'}
                    {mapMode === 'TERRAIN' && '3D Digital Elevation Model Topographical Contour'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    ZOOM {mapZoom}x
                  </span>

                  <button
                    onClick={() => setMapZoom(z => Math.min(z + 1, 20))}
                    className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setMapZoom(z => Math.max(z - 1, 8))}
                    className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setSelectedVehicleId('DT-1001')}
                    className="p-1.5 rounded bg-emerald-600 text-white font-bold text-[10px] flex items-center gap-1"
                  >
                    <Crosshair className="w-3.5 h-3.5" /> Center
                  </button>
                </div>
              </div>

              {/* Dynamic Map Canvas Render Engine */}
              {(mapMode === 'GOOGLE_MAPS' || mapMode === 'SATELLITE') ? (
                <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                  <GoogleMiningMap
                    height="460px"
                    equipmentList={equipment}
                    language={language}
                    onSelectEquipment={(eq) => {
                      setSelectedVehicleId(eq.code);
                    }}
                  />
                </div>
              ) : (
                <div className={`relative h-[440px] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl transition-all ${
                  mapMode === 'MINING_AREA' ? 'bg-slate-950 border-emerald-900/40' : 'bg-slate-950'
                }`}>
                  
                  {mapMode === 'MINING_AREA' && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#064e3b_1px,transparent_1px),linear-gradient(to_bottom,#064e3b_1px,transparent_1px)] bg-[size:16px_16px] opacity-30" />
                  )}

                  {/* SVG GEOSPATIAL LAYERS (Hauling Road Curve, Pit Polygons, Stockpile, Jetty) */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    
                    {/* HAULING ROAD NETWORK LAYER */}
                    {activeLayers.haulingRoad && (
                      <>
                        <path
                          d="M 60 80 Q 180 120 280 200 T 480 280 T 640 340"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeDasharray="6 4"
                          className="animate-pulse opacity-70"
                        />
                        <path
                          d="M 60 80 Q 180 120 280 200 T 480 280 T 640 340"
                          fill="none"
                          stroke="#60a5fa"
                          strokeWidth="3"
                        />
                        <text x="300" y="210" fill="#93c5fd" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          🛣️ MAIN HAUL ROAD CORRIDOR (KM 00 - KM 18)
                        </text>
                      </>
                    )}

                    {/* PIT AREA CONTOUR POLYGONS LAYER */}
                    {activeLayers.pit && (
                      <>
                        {/* Pit Alpha Polygon */}
                        <polygon
                          points="50,40 180,30 220,130 90,150"
                          fill="rgba(245, 158, 11, 0.15)"
                          stroke="#f59e0b"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                        <text x="70" y="60" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          ⛏️ PIT ALPHA FRONT +120M
                        </text>

                        {/* Pit Beta Polygon */}
                        <polygon
                          points="220,240 340,220 380,320 260,340"
                          fill="rgba(234, 179, 8, 0.12)"
                          stroke="#eab308"
                          strokeWidth="2"
                        />
                        <text x="240" y="260" fill="#fde047" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          ⛏️ PIT BETA BENCH
                        </text>
                      </>
                    )}

                    {/* STOCKPILE DEPOT POLYGON LAYER */}
                    {activeLayers.stockpile && (
                      <g>
                        <rect
                          x="420"
                          y="230"
                          width="130"
                          height="90"
                          rx="12"
                          fill="rgba(168, 85, 247, 0.15)"
                          stroke="#a855f7"
                          strokeWidth="2"
                        />
                        <text x="430" y="250" fill="#c084fc" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          🏔️ STOCKPILE ETO
                        </text>
                        <text x="430" y="265" fill="#e9d5ff" fontSize="9" fontFamily="monospace">
                          Kapasitas: 145,000 MT
                        </text>
                      </g>
                    )}

                    {/* JETTY PORT TERMINAL LAYER */}
                    {activeLayers.jetty && (
                      <g>
                        <rect
                          x="580"
                          y="300"
                          width="130"
                          height="95"
                          rx="12"
                          fill="rgba(6, 182, 212, 0.15)"
                          stroke="#06b6d4"
                          strokeWidth="2"
                        />
                        <text x="590" y="320" fill="#22d3ee" fontSize="10" fontFamily="monospace" fontWeight="bold">
                          🚢 JETTY PORT TERMINAL
                        </text>
                        <text x="590" y="335" fill="#a5f3fc" fontSize="9" fontFamily="monospace">
                          Pier 1 & Pier 2 Docks
                        </text>
                      </g>
                    )}
                  </svg>

                  {/* GEOFENCE BOUNDARY OVERLAYS */}
                  {activeLayers.geofence && (
                    <>
                      <div className="absolute top-4 left-6 px-3 py-1.5 rounded-xl border-2 border-emerald-500/50 bg-emerald-950/40 backdrop-blur-sm text-emerald-300 font-mono text-[10px] font-bold shadow-lg">
                        🛡️ GEOFENCE: PIT ALPHA EXCAVATION (LIMIT: 25 km/h)
                      </div>

                      <div className="absolute bottom-12 right-12 px-3 py-1.5 rounded-xl border-2 border-cyan-500/50 bg-cyan-950/40 backdrop-blur-sm text-cyan-300 font-mono text-[10px] font-bold shadow-lg">
                        🛡️ GEOFENCE: JETTY PORT DRAINAGE ZONE
                      </div>
                    </>
                  )}

                  {/* REALTIME EQUIPMENT POSITIONS MARKERS LAYER */}
                  {activeLayers.equipmentPos && gpsFleetUnits.map((v, idx) => (
                    <div
                      key={v.id}
                      onClick={() => setSelectedVehicleId(v.id)}
                      style={{ top: `${22 + idx * 13}%`, left: `${18 + idx * 13}%` }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer p-2 rounded-xl border shadow-2xl transition-all hover:scale-125 flex items-center gap-2 z-20 ${
                        selectedVehicleId === v.id
                          ? 'bg-emerald-600 border-white text-white scale-110 shadow-emerald-500/50 ring-4 ring-emerald-500/30'
                          : v.status === 'SPEEDING'
                          ? 'bg-rose-900/90 border-rose-500 text-rose-200 animate-bounce'
                          : 'bg-slate-900/90 border-slate-700 text-slate-200'
                      }`}
                    >
                      <Navigation className={`w-4 h-4 ${v.status === 'MOVING' ? 'text-emerald-300 animate-spin' : ''}`} />
                      <div>
                        <span className="font-bold block text-[11px] font-mono">{v.id}</span>
                        <span className="text-[9px] opacity-90 font-mono">{v.speedKmh} km/h</span>
                      </div>
                    </div>
                  ))}

                  {/* Map Bottom Legend Status Bar */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-[10px] text-slate-400 space-y-1 shadow-xl">
                    <p className="font-bold text-slate-200 flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-emerald-400" /> Koordinat Geospasial Aktif:
                      <span className="text-emerald-400 font-mono">-2.5210° S, 121.3420° E (UTM 51S WGS84)</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-slate-300 pt-1">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Operasional Normal</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Speeding Overlimit</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Engine Idle Time</span>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Right Side Fleet Status List */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm">Armada GPS Terhubung</h3>
                <span className="text-slate-400 font-mono">{filteredGpsUnits.length} Unit</span>
              </div>

              <div className="space-y-2.5 max-h-[400px] overflow-y-auto custom-scrollbar">
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
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setInspectVehicle(u);
                          }}
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-[9px] flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-emerald-400" /> Detail
                        </button>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          u.status === 'MOVING' ? 'bg-emerald-500/20 text-emerald-400' :
                          u.status === 'SPEEDING' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {u.status}
                        </span>
                      </div>
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

      {/* Dispatch Alert Toast Notification */}
      {dispatchAlertNotice && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-emerald-900/90 border border-emerald-500/50 text-white shadow-2xl flex items-center gap-3 backdrop-blur-md animate-bounce">
          <Radio className="w-5 h-5 text-amber-300 animate-pulse" />
          <div>
            <strong className="text-xs font-bold block">Panggilan Dispatch Terkirim:</strong>
            <p className="text-[11px] text-emerald-200">{dispatchAlertNotice}</p>
          </div>
          <button 
            onClick={() => setDispatchAlertNotice(null)}
            className="ml-2 text-xs bg-emerald-950 px-2 py-1 rounded hover:bg-emerald-800"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Equipment Telemetry Inspector Modal */}
      {inspectVehicle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                  Telemetry Inspector
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">{inspectVehicle.code}</h3>
                <p className="text-slate-400 text-[11px]">Operator: {inspectVehicle.driverName} • {inspectVehicle.category}</p>
              </div>
              <button 
                onClick={() => setInspectVehicle(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Status Telemetri</span>
                <strong className="text-emerald-400 font-mono text-sm">{inspectVehicle.status}</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Kecepatan Live</span>
                <strong className="text-amber-300 font-mono text-sm">{inspectVehicle.speedKmh} km/h</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">BBM Level</span>
                <strong className="text-slate-100 font-mono text-sm">{inspectVehicle.fuelLevelPct}% ({inspectVehicle.fuelLiterPerHour} L/Jam)</strong>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-400 text-[10px] block">Zona Geofence</span>
                <strong className="text-slate-100 font-mono text-sm">{inspectVehicle.geofenceZone}</strong>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 font-mono text-[10px] text-slate-400">
              <p>📍 Koordinat Lat/Lng: <strong className="text-emerald-400">{inspectVehicle.lat}° S, {inspectVehicle.lng}° E</strong></p>
              <p>📡 Sinyal Satelit GPS: <strong className="text-blue-400">{inspectVehicle.signalRssi} (Starlink Mobile)</strong></p>
              <p>⏱️ Idle Time: <strong className="text-amber-400">{inspectVehicle.idleTimeMin} Menit</strong></p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  setDispatchAlertNotice(`Instruksi radio dikirim ke ${inspectVehicle.code} (Operator ${inspectVehicle.driverName}) via Channel 4 Pit Control.`);
                  setInspectVehicle(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4" /> Panggil Radio Dispatch
              </button>
              <button
                onClick={() => setInspectVehicle(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
