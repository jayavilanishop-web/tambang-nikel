import React, { useState } from 'react';
import { 
  Camera, 
  Compass, 
  MapPin, 
  Ruler, 
  Layers, 
  Layers3, 
  Globe, 
  BarChart3, 
  Box, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Crosshair, 
  Zap, 
  Play, 
  RefreshCw, 
  Plane, 
  Satellite, 
  FileCheck2, 
  PieChart as PieChartIcon, 
  Radio, 
  Maximize2, 
  Grid, 
  TrendingUp, 
  TrendingDown, 
  ListOrdered
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  ComposedChart, 
  Line 
} from 'recharts';
import { Language, OreStockpile } from '../../types';

interface SurveyTopographyModuleProps {
  stockpiles: OreStockpile[];
  language: Language;
}

export const SurveyTopographyModule: React.FC<SurveyTopographyModuleProps> = ({
  stockpiles,
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'drone_uav'
    | 'gps_rtk'
    | 'total_station'
    | 'volume_calculation'
    | 'topography_contours'
    | 'cut_fill'
    | 'stockpile_measurement'
    | 'terrain_model'
  >('drone_uav');

  const [selectedStockpile, setSelectedStockpile] = useState<string>('ALL');

  // Drone UAV Mission Log Dataset
  const droneMissions = [
    { id: 'UAV-FLIGHT-088', droneModel: 'DJI Matrice 300 RTK + Zenmuse L1 LiDAR', operator: 'Lalu Hendra (Surveyor Principal)', coverageHa: 145.2, flightAltM: 120, totalPhotos: 1240, status: 'PROCESSED', groundResolution: '1.8 cm/px' },
    { id: 'UAV-FLIGHT-089', droneModel: 'WingtraOne GEN II VTOL Photogrammetry', operator: 'Ahmad Basri (UAV Pilot)', coverageHa: 320.5, flightAltM: 180, totalPhotos: 2180, status: 'PROCESSED', groundResolution: '2.5 cm/px' },
    { id: 'UAV-FLIGHT-090', droneModel: 'DJI Mavic 3 Enterprise RTK', operator: 'Rizky Kurniawan', coverageHa: 45.0, flightAltM: 80, totalPhotos: 580, status: 'IN_FLIGHT', groundResolution: '1.2 cm/px' }
  ];

  // GPS RTK Control Points
  const gpsControlPoints = [
    { code: 'GCP-MOR-001', easting: 384512.482, northing: 9720412.105, elevationZ: 185.420, fixStatus: 'RTK_FIXED', satellites: 28, accuracyMm: 4.2 },
    { code: 'GCP-MOR-002', easting: 384890.115, northing: 9720880.340, elevationZ: 210.150, fixStatus: 'RTK_FIXED', satellites: 31, accuracyMm: 3.8 },
    { code: 'GCP-MOR-003', easting: 385100.820, northing: 9721200.510, elevationZ: 245.890, fixStatus: 'RTK_FIXED', satellites: 26, accuracyMm: 5.1 },
    { code: 'GCP-MOR-004', easting: 385450.230, northing: 9721650.120, elevationZ: 198.300, fixStatus: 'FLOAT', satellites: 18, accuracyMm: 24.5 }
  ];

  // Total Station Boundary Survey Points
  const totalStationPoints = [
    { ptId: 'TS-PT-101', targetFeature: 'IUP Boundary Benchmark No. 12', prismHeightM: 2.15, horizAngle: '124° 15\' 42"', vertAngle: '88° 10\' 12"', distM: 142.85, status: 'VERIFIED' },
    { ptId: 'TS-PT-102', targetFeature: 'Highwall Toe Pit Alpha', prismHeightM: 2.15, horizAngle: '182° 40\' 10"', vertAngle: '92° 30\' 05"', distM: 88.40, status: 'VERIFIED' },
    { ptId: 'TS-PT-103', targetFeature: 'Jetty Pier Anchor Pile C', prismHeightM: 1.80, horizAngle: '045° 12\' 30"', vertAngle: '90° 02\' 00"', distM: 210.12, status: 'VERIFIED' }
  ];

  // Stockpile LiDAR Volume Measurements
  const stockpileMeasurements = [
    { stockpileName: 'Stockpile ETO Alpha - Block A (High Grade Saprolite)', volumeM3: 42150, bulkDensity: 1.6, tonnageMT: 67440, laserPoints: 4850000, lastSurveyDate: '03 Agu 2026 06:30' },
    { stockpileName: 'Stockpile ETO Alpha - Block B (Mid Grade Saprolite)', volumeM3: 28400, bulkDensity: 1.6, tonnageMT: 45440, laserPoints: 3200000, lastSurveyDate: '03 Agu 2026 06:30' },
    { stockpileName: 'Stockpile Limonite HPAL Feed Pad 2', volumeM3: 58200, bulkDensity: 1.4, tonnageMT: 81480, laserPoints: 6100000, lastSurveyDate: '02 Agu 2026 18:00' },
    { stockpileName: 'Low Grade Ore Dump West', volumeM3: 18500, bulkDensity: 1.55, tonnageMT: 28675, laserPoints: 2100000, lastSurveyDate: '02 Agu 2026 18:00' }
  ];

  // Cut & Fill Volumetric Data
  const cutAndFillData = [
    { pitSector: 'Pit Alpha - Bench +120 Cutting', designVolumeM3: 15000, actualCutM3: 15420, fillM3: 0, balanceM3: +420 },
    { pitSector: 'Pit Beta - Ramp Access Extension', designVolumeM3: 8200, actualCutM3: 7900, fillM3: 2100, balanceM3: -300 },
    { pitSector: 'Haul Road KM 04 Embankment Fill', designVolumeM3: 12000, actualCutM3: 0, fillM3: 12150, balanceM3: +150 },
    { pitSector: 'Settling Pond 3 Excavation', designVolumeM3: 6500, actualCutM3: 6480, fillM3: 0, balanceM3: -20 }
  ];

  // Topography Profile Cross Section
  const crossSectionData = [
    { distanceM: 0, originalTerrainZ: 250, currentPitZ: 250, designBenchZ: 250 },
    { distanceM: 50, originalTerrainZ: 245, currentPitZ: 220, designBenchZ: 220 },
    { distanceM: 100, originalTerrainZ: 238, currentPitZ: 195, designBenchZ: 195 },
    { distanceM: 150, originalTerrainZ: 230, currentPitZ: 170, designBenchZ: 170 },
    { distanceM: 200, originalTerrainZ: 222, currentPitZ: 150, designBenchZ: 150 },
    { distanceM: 250, originalTerrainZ: 215, currentPitZ: 150, designBenchZ: 150 },
    { distanceM: 300, originalTerrainZ: 208, currentPitZ: 170, designBenchZ: 170 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Mine Survey & Topography Engineering
            </span>
            <span className="text-slate-400 text-xs">• Geodetic, Photogrammetry & Volumetric Hub</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Survei Pemetaan Topografi & Volume Audit Tambang
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-0.5">
            Pusat kendali survei tambang nikel: foto udara drone UAV LiDAR, pengukuran titik kontrol GPS RTK, Total Station presisi tinggi, kalkulasi volume stockpile, analisis Cut & Fill, serta Digital Terrain Model 3D (DTM/DEM).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center gap-2 border border-slate-700">
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Ekspor DXF / LandXML</span>
          </button>

          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Auto Mesh Volumetric</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs covering all 8 Survey keywords requested */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'drone_uav', label: 'Drone UAV & LiDAR Flight', icon: Plane },
          { id: 'gps_rtk', label: 'GPS RTK Geodetic Control', icon: Satellite },
          { id: 'total_station', label: 'Total Station Survey', icon: Crosshair },
          { id: 'volume_calculation', label: 'Volume Calculation Audit', icon: Box },
          { id: 'topography_contours', label: 'Topography & Cross Section', icon: Layers },
          { id: 'cut_fill', label: 'Cut & Fill Volumetrics', icon: TrendingUp },
          { id: 'stockpile_measurement', label: 'Stockpile Measurement', icon: Grid },
          { id: 'terrain_model', label: '3D Terrain Model (DTM/DEM)', icon: Globe }
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

      {/* TAB 1: DRONE UAV & LIDAR */}
      {activeTab === 'drone_uav' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Cakupan Misi Drone Hari Ini</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">510.7 Hektar</span>
              <span className="text-emerald-400 block mt-1">3 Misi Selesai Diproses</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Akurasi Spasial (GSD)</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">1.8 cm / pixel</span>
              <span className="text-slate-400 block mt-1">Tingkat Ketelitian Tinggi</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Kerapatan Point Cloud LiDAR</span>
              <span className="text-2xl font-bold text-amber-400 font-mono">240 pts / m²</span>
              <span className="text-slate-400 block mt-1">Zenmuse L1 Laser Sensor</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Sertifikasi UAV Pilot ESDM</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">3 Pilot License</span>
              <span className="text-emerald-400 block mt-1">Status: Active Compliant</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Log Misi Mampu Terbang Drone UAV & Pemrosesan Orthophoto
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Flight ID</th>
                    <th className="py-2.5 px-3">Unit Drone & Sensor</th>
                    <th className="py-2.5 px-3">Pilot Surveyor</th>
                    <th className="py-2.5 px-3">Area (Ha)</th>
                    <th className="py-2.5 px-3">Ketinggian (m)</th>
                    <th className="py-2.5 px-3">Total Foto Aerial</th>
                    <th className="py-2.5 px-3">GSD Resolusi</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {droneMissions.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200">{d.id}</td>
                      <td className="py-3 px-3 font-sans text-emerald-400 font-bold">{d.droneModel}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{d.operator}</td>
                      <td className="py-3 px-3 text-slate-100 font-bold">{d.coverageHa} Ha</td>
                      <td className="py-3 px-3 text-slate-300">{d.flightAltM} m AGL</td>
                      <td className="py-3 px-3 text-slate-400">{d.totalPhotos} frame</td>
                      <td className="py-3 px-3 text-amber-400 font-bold">{d.groundResolution}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          d.status === 'PROCESSED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {d.status}
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

      {/* TAB 2: GPS RTK GEODETIC */}
      {activeTab === 'gps_rtk' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Titik Kontrol Tanah GCP (Ground Control Points) GPS GNSS RTK Multi-Constellation
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">GCP Code</th>
                    <th className="py-2.5 px-3">Koordinat Easting (X)</th>
                    <th className="py-2.5 px-3">Koordinat Northing (Y)</th>
                    <th className="py-2.5 px-3">Elevasi Z (m)</th>
                    <th className="py-2.5 px-3">Jumlah Satelit</th>
                    <th className="py-2.5 px-3">Akurasi Vertikal (mm)</th>
                    <th className="py-2.5 px-3">Fix Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {gpsControlPoints.map((g) => (
                    <tr key={g.code} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200">{g.code}</td>
                      <td className="py-3 px-3 text-slate-400">{g.easting}</td>
                      <td className="py-3 px-3 text-slate-400">{g.northing}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{g.elevationZ} m</td>
                      <td className="py-3 px-3 text-slate-300">{g.satellites} Satellites</td>
                      <td className="py-3 px-3 text-amber-400 font-bold">±{g.accuracyMm} mm</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          g.fixStatus === 'RTK_FIXED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {g.fixStatus}
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

      {/* TAB 3: TOTAL STATION */}
      {activeTab === 'total_station' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pengukuran Sudut & Jarak Presisi Total Station Boundary Patok IUP & Konstruksi Jetty
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Point ID</th>
                    <th className="py-2.5 px-3">Fitur Objek Survei</th>
                    <th className="py-2.5 px-3">Tinggi Prisma (m)</th>
                    <th className="py-2.5 px-3">Sudut Horisontal (H.Ang)</th>
                    <th className="py-2.5 px-3">Sudut Vertikal (V.Ang)</th>
                    <th className="py-2.5 px-3">Jarak Miring (S.Dist)</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {totalStationPoints.map((t) => (
                    <tr key={t.ptId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-slate-200">{t.ptId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{t.targetFeature}</td>
                      <td className="py-3 px-3 text-slate-400">{t.prismHeightM} m</td>
                      <td className="py-3 px-3 text-emerald-400">{t.horizAngle}</td>
                      <td className="py-3 px-3 text-slate-300">{t.vertAngle}</td>
                      <td className="py-3 px-3 text-amber-400 font-bold">{t.distM} m</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
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

      {/* TAB 4: VOLUME CALCULATION & STOCKPILE MEASUREMENT */}
      {(activeTab === 'volume_calculation' || activeTab === 'stockpile_measurement') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Total Volume Ore Stockpile ETO</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">147,250 m³</span>
              <span className="text-slate-400 block mt-1">Setara 223,035 MT Ore</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Rata-Rata Density Ore (WMT/m³)</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">1.60 t/m³</span>
              <span className="text-slate-400 block mt-1">Hasil Uji Laboratorium Wet Bulk</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Total Laser Point Cloud Audited</span>
              <span className="text-2xl font-bold text-amber-400 font-mono">16.25 Juta Pts</span>
              <span className="text-emerald-400 block mt-1">Metode Mesh Triangulation DTM</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Hasil Pengukuran Volumetrik Stockpile Ore Nikel & Audit Tonase
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Nama Blok Stockpile</th>
                    <th className="py-2.5 px-3">Volume Survey (m³)</th>
                    <th className="py-2.5 px-3">Bulk Density (t/m³)</th>
                    <th className="py-2.5 px-3">Total Tonase (MT)</th>
                    <th className="py-2.5 px-3">Jumlah Titik Laser</th>
                    <th className="py-2.5 px-3">Waktu Audit Survei</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {stockpileMeasurements.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold font-sans text-slate-100">{s.stockpileName}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{s.volumeM3.toLocaleString('id-ID')} m³</td>
                      <td className="py-3 px-3 text-slate-300">{s.bulkDensity} t/m³</td>
                      <td className="py-3 px-3 text-amber-400 font-bold">{s.tonnageMT.toLocaleString('id-ID')} MT</td>
                      <td className="py-3 px-3 text-slate-400">{(s.laserPoints / 1000000).toFixed(2)} M Pts</td>
                      <td className="py-3 px-3 font-sans text-slate-400">{s.lastSurveyDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: TOPOGRAPHY & CROSS SECTION */}
      {activeTab === 'topography_contours' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Profil Potongan Melintang (Cross Section) Contour Elevasi Pit Alpha (Original Terrain vs Current Pit vs Design)
            </h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={crossSectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="distanceM" stroke="#94a3b8" fontSize={11} unit="m" />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="m" domain={[100, 300]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="originalTerrainZ" name="Original Topography (Z)" stroke="#94a3b8" fill="#334155" fillOpacity={0.4} />
                  <Area type="monotone" dataKey="currentPitZ" name="Current Pit Surface (Z)" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CUT & FILL VOLUMETRICS */}
      {activeTab === 'cut_fill' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Analisis Volumetrik Galian (Cut) & Timbunan (Fill) Sektor Tambang vs Desain Pit
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Sektor Workfront</th>
                    <th className="py-2.5 px-3">Volume Desain (m³)</th>
                    <th className="py-2.5 px-3">Aktual Cut (m³)</th>
                    <th className="py-2.5 px-3">Aktual Fill (m³)</th>
                    <th className="py-2.5 px-3">Deviasi Balance (m³)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {cutAndFillData.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold font-sans text-slate-100">{c.pitSector}</td>
                      <td className="py-3 px-3 text-slate-300">{c.designVolumeM3.toLocaleString('id-ID')} m³</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{c.actualCutM3.toLocaleString('id-ID')} m³</td>
                      <td className="py-3 px-3 text-blue-400 font-bold">{c.fillM3.toLocaleString('id-ID')} m³</td>
                      <td className="py-3 px-3">
                        <span className={`font-bold ${c.balanceM3 >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {c.balanceM3 > 0 ? `+${c.balanceM3}` : c.balanceM3} m³
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

      {/* TAB 7: 3D TERRAIN MODEL (DTM / DEM / DSM) */}
      {activeTab === 'terrain_model' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-base">Digital Terrain Model (DTM) & Digital Elevation Model (DEM) Viewer</h3>
            <span className="text-emerald-400 font-mono">Triangulated Irregular Network (TIN) Mesh</span>
          </div>

          <div className="relative h-80 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
            
            <div className="text-center space-y-2 z-10 p-4">
              <Globe className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <p className="font-bold text-slate-100 text-base">Interactive 3D Terrain Model DTM / DEM Surface Mesh</p>
              <p className="text-slate-400 text-xs max-w-md">
                Format file raster DEM 0.5m & Surface Mesh 3D siap diekspor ke Civil 3D, Surpac, Datamine, dan Maptek Vulcan.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
