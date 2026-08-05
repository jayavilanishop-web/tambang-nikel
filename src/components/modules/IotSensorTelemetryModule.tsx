import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  Fuel, 
  Scale, 
  Thermometer, 
  Gauge, 
  Zap, 
  Radio, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  Sliders, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  ShieldAlert, 
  Waves, 
  Flame, 
  Wifi, 
  Search, 
  Filter, 
  Layers, 
  Clock, 
  Server, 
  BarChart3, 
  SlidersHorizontal,
  Disc,
  BellRing,
  Plus,
  PlusCircle,
  Check
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
  ComposedChart, 
  Bar 
} from 'recharts';
import { HeavyEquipment, Language } from '../../types';

interface IotSensorTelemetryModuleProps {
  equipment: HeavyEquipment[];
  language: Language;
}

export const IotSensorTelemetryModule: React.FC<IotSensorTelemetryModuleProps> = ({
  equipment,
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'iot_gateways'
    | 'fuel_sensors'
    | 'weight_payload'
    | 'temperature_sensors'
    | 'pressure_sensors'
    | 'vibration_sensors'
    | 'engine_ecu'
    | 'realtime_monitoring'
    | 'tpms_tyres'
    | 'alert_rule_engine'
  >('realtime_monitoring');

  const [selectedUnit, setSelectedUnit] = useState<string>('DT-1001');
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [tick, setTick] = useState<number>(0);

  // New Rule Modal State
  const [isAddRuleOpen, setIsAddRuleOpen] = useState<boolean>(false);
  const [ruleName, setRuleName] = useState<string>('');
  const [sensorTypeInput, setSensorTypeInput] = useState<string>('SUHU_COOLANT');
  const [thresholdValInput, setThresholdValInput] = useState<number>(100);
  const [customRulesList, setCustomRulesList] = useState([
    { id: 'RL-101', name: 'Coolant Engine High Temp Siren Alert', sensor: 'Caterpillar C27 Coolant', threshold: '> 102 °C', action: 'WhatsApp & SMS Ke Pit Supervisor', status: 'ACTIVE' },
    { id: 'RL-102', name: 'Anti-Siphoning Fuel Drop Detection', sensor: 'Ultrasonic Fuel Tank Meter', threshold: 'Penurunan > 15 L / min (Mesin Mati)', action: 'Trigger Siren & Lock Gate', status: 'ACTIVE' },
    { id: 'RL-103', name: 'Payload Overload 110% Warning', sensor: 'Strut Pressure Payload Meter', threshold: '> 99.0 Ton', action: 'Lampu Strobo Merah Nyala', status: 'ACTIVE' }
  ]);

  // TPMS OTR Tyre Telemetry Dataset
  const tpmsTyreData = [
    { unitCode: 'DT-1001', tyrePosition: 'Front Left (FL)', serialNo: 'TYRE-BS-2701', pressurePsi: 110 + (tick % 2), tempC: 62, status: 'OPTIMAL' },
    { unitCode: 'DT-1001', tyrePosition: 'Front Right (FR)', serialNo: 'TYRE-BS-2702', pressurePsi: 108 + (tick % 2), tempC: 64, status: 'OPTIMAL' },
    { unitCode: 'DT-1001', tyrePosition: 'Rear Outer Left (ROL)', serialNo: 'TYRE-BS-2703', pressurePsi: 98, tempC: 72, status: 'LOW_PRESSURE_WARNING' },
    { unitCode: 'DT-1002', tyrePosition: 'Front Left (FL)', serialNo: 'TYRE-MI-2704', pressurePsi: 112, tempC: 58, status: 'OPTIMAL' }
  ];

  // Auto tick to simulate real-time sensor fluctuation
  useEffect(() => {
    if (!isLiveStreaming) return;
    const interval = setInterval(() => {
      setTick((t) => t + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // IoT Edge Gateway Hardware Nodes
  const iotEdgeGateways = [
    { id: 'GW-EDGE-001', name: 'Mine Edge Gateway #1 (Pit Alpha)', protocol: '4G LTE + LoRaWAN', meshStatus: 'CONNECTED', latencyMs: 14, connectedSensors: 42, signalStrength: -68, uptimePct: 99.98 },
    { id: 'GW-EDGE-002', name: 'Fleet Mobile Telemetry Node #12', protocol: 'CAN-Bus J1939 + Satellite', meshStatus: 'CONNECTED', latencyMs: 32, connectedSensors: 18, signalStrength: -75, uptimePct: 99.95 },
    { id: 'GW-EDGE-003', name: 'Crusher Plant Vibration Hub', protocol: 'Industrial Ethernet / Modbus', meshStatus: 'CONNECTED', latencyMs: 8, connectedSensors: 36, signalStrength: -55, uptimePct: 100.0 }
  ];

  // Fuel Sensor Telemetry Data
  const fuelSensorData = [
    { unitCode: 'DT-1001', tankCapacityL: 1200, currentFuelL: 984 + (tick % 3), fuelPct: 82, flowRateLh: 88 + (tick % 2), antiTheftAlert: 'NORMAL', fuelQualityMoisture: '0.02%' },
    { unitCode: 'EX-2001', tankCapacityL: 2800, currentFuelL: 1904 + (tick % 4), fuelPct: 68, flowRateLh: 112 + (tick % 3), antiTheftAlert: 'NORMAL', fuelQualityMoisture: '0.01%' },
    { unitCode: 'DZ-3001', tankCapacityL: 950, currentFuelL: 494 + (tick % 2), fuelPct: 52, flowRateLh: 75, antiTheftAlert: 'NORMAL', fuelQualityMoisture: '0.03%' },
    { unitCode: 'WL-4001', tankCapacityL: 1100, currentFuelL: 1012, fuelPct: 92, flowRateLh: 62, antiTheftAlert: 'NORMAL', fuelQualityMoisture: '0.01%' }
  ];

  // Weight / Payload Scale Sensor Data
  const weightSensorData = [
    { unitCode: 'DT-1001', payloadTargetTon: 90, actualPayloadTon: 92.4 + (tick % 2) * 0.3, loadPct: 102.6, sensorType: 'Strut Pressure Payload Meter', status: 'OPTIMAL_LOAD' },
    { unitCode: 'DT-1002', payloadTargetTon: 90, actualPayloadTon: 98.2, loadPct: 109.1, sensorType: 'Strut Pressure Payload Meter', status: 'OVERLOAD_WARNING' },
    { unitCode: 'CV-BELT-01', payloadTargetTon: 1500, actualPayloadTon: 1420 + (tick % 5) * 8, loadPct: 94.6, sensorType: 'Belt Conveyor Load Cell Scale', status: 'OPTIMAL_LOAD' }
  ];

  // Temperature Sensors Data
  const temperatureSensors = [
    { sensorId: 'TMP-ENG-101', component: 'Caterpillar C27 Engine Coolant', currentTempC: 88 + (tick % 2), maxThresholdC: 102, status: 'NORMAL' },
    { sensorId: 'TMP-HYD-102', component: 'Komatsu PC2000 Main Hydraulic Oil', currentTempC: 74 + (tick % 3), maxThresholdC: 88, status: 'NORMAL' },
    { sensorId: 'TMP-BRG-103', component: 'Primary Crusher Jaw Bearing #2', currentTempC: 84 + (tick % 2), maxThresholdC: 85, status: 'ELEVATED_WARNING' }
  ];

  // Pressure Sensors Data
  const pressureSensors = [
    { sensorId: 'PRS-HYD-201', location: 'Main Hydraulic Pump Discharge', currentPressureBar: 345 + (tick % 4), nominalBar: 350, status: 'STABLE' },
    { sensorId: 'PRS-TRB-202', location: 'Engine Turbo Boost Intake', currentPressureBar: 2.8, nominalBar: 2.9, status: 'STABLE' },
    { sensorId: 'PRS-TPM-203', location: 'OTR Tyre Front-Left TPMS', currentPressureBar: 7.2, nominalBar: 7.5, status: 'STABLE' }
  ];

  // Vibration Accelerometer Sensors Data
  const vibrationSensors = [
    { sensorId: 'VIB-ACC-301', machinePart: 'Secondary Screen Vibrating Motor', rmsVelocityMms: 4.2 + (tick % 2) * 0.2, maxAllowableMms: 7.1, status: 'GOOD' },
    { sensorId: 'VIB-ACC-302', machinePart: 'HPAL Slurry Pump Impeller Bearing', rmsVelocityMms: 6.8 + (tick % 2) * 0.3, maxAllowableMms: 7.0, status: 'PREDICTIVE_MAINTENANCE_REQUIRED' }
  ];

  // ECU CAN-Bus Engine Telemetry
  const engineEcuData = [
    { param: 'Engine Speed RPM', value: `${1850 + (tick % 3) * 15} RPM`, nominal: '1200 - 2100 RPM', status: 'HEALTHY' },
    { param: 'Engine Oil Pressure', value: `${4.2 + (tick % 2) * 0.1} Bar`, nominal: '3.5 - 5.0 Bar', status: 'HEALTHY' },
    { param: 'Exhaust Gas Temp (EGT)', value: `${420 + (tick % 4)} °C`, nominal: '< 550 °C', status: 'HEALTHY' },
    { param: 'ECU Active Fault Codes (DTC)', value: '0 Active Faults', nominal: '0 DTC', status: 'CLEAN' }
  ];

  // Live Telemetry Chart Feed
  const liveTelemetryChartData = [
    { time: '08:40', coolantTemp: 86, hydPressure: 342, vibrationRms: 4.1, payloadTon: 91.2 },
    { time: '08:42', coolantTemp: 87, hydPressure: 345, vibrationRms: 4.2, payloadTon: 92.0 },
    { time: '08:44', coolantTemp: 88, hydPressure: 348, vibrationRms: 4.3, payloadTon: 92.4 },
    { time: '08:46', coolantTemp: 88 + (tick % 2), hydPressure: 345 + (tick % 3), vibrationRms: 4.2 + (tick % 2) * 0.1, payloadTon: 92.5 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Industrial IoT Telemetry & Predictive Sensor Network
            </span>
            <span className="text-slate-400 text-xs">• ISO 13374 Condition Monitoring</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            IoT Telemetri Sensor & Monitoring Mesin Realtime
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pengawasan sensor Industri tambang: sensor level BBM, timbangan muatan payload, suhu mesin, tekanan hidrolik, getaran tri-axial accelerometer, dan ECU CAN-bus J1939 secara waktu-nyata.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-md ${
              isLiveStreaming
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <Radio className={`w-4 h-4 ${isLiveStreaming ? 'text-amber-300 animate-pulse' : 'text-slate-400'}`} />
            <span>{isLiveStreaming ? 'LIVE TELEMETRY STREAMING' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs covering all 9 requested keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'realtime_monitoring', label: 'Realtime Live Dashboard', icon: Activity },
          { id: 'iot_gateways', label: 'IoT Edge Gateways', icon: Cpu },
          { id: 'fuel_sensors', label: 'Fuel Sensors', icon: Fuel },
          { id: 'weight_payload', label: 'Weight & Payload Sensors', icon: Scale },
          { id: 'temperature_sensors', label: 'Temperature Sensors', icon: Thermometer },
          { id: 'pressure_sensors', label: 'Pressure Sensors', icon: Gauge },
          { id: 'vibration_sensors', label: 'Vibration Sensors', icon: Waves },
          { id: 'engine_ecu', label: 'Engine ECU Telemetry', icon: Zap },
          { id: 'tpms_tyres', label: 'TPMS Tyre Sensors', icon: Disc },
          { id: 'alert_rule_engine', label: 'IoT Rule Engine & Alerts', icon: BellRing }
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

      {/* TAB 1: REALTIME MONITORING */}
      {activeTab === 'realtime_monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Sensor Aktif Terhubung</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">128 Sensor</span>
              <span className="text-emerald-400 block mt-1">Status: 100% Signal Online</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Rata-rata Suhu Coolant</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">{88 + (tick % 2)} °C</span>
              <span className="text-slate-400 block mt-1">Normal Operating Range</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Tekanan Hidrolik Utama</span>
              <span className="text-2xl font-bold text-amber-300 font-mono">{345 + (tick % 3)} Bar</span>
              <span className="text-slate-400 block mt-1">Nominal Target 350 Bar</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Amplitudo Getaran RMS</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">4.2 mm/s</span>
              <span className="text-emerald-400 block mt-1">Vibration Health: Good</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Grafik Telemetri Realtime Sensor Unit DT-1001 (Suhu, Tekanan, Getaran & Payload)
            </h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={liveTelemetryChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="payloadTon" name="Muatan Payload (Ton)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="coolantTemp" name="Suhu Coolant (°C)" stroke="#EF4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="hydPressure" name="Tekanan Hidrolik (Bar)" stroke="#10B981" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: IOT GATEWAYS */}
      {activeTab === 'iot_gateways' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Node Perangkat IoT Edge Gateways & Protokol Komunikasi Tambang
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {iotEdgeGateways.map((g) => (
                <div key={g.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <strong className="text-slate-100 font-bold">{g.name}</strong>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      {g.meshStatus}
                    </span>
                  </div>

                  <div className="space-y-1 text-slate-400 text-[11px]">
                    <p>Protokol: <strong className="text-emerald-400">{g.protocol}</strong></p>
                    <p>Sensor Terhubung: <strong className="text-slate-200">{g.connectedSensors} Sensor</strong></p>
                    <p>Latency: <strong className="text-amber-300">{g.latencyMs} ms</strong></p>
                    <p>Uptime System: <strong className="text-slate-100">{g.uptimePct}%</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FUEL SENSORS */}
      {activeTab === 'fuel_sensors' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Sensor Kapasitif Level BBM & Sensor Debit Solar Aliran Mesin
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Kode Unit</th>
                    <th className="py-2.5 px-3">Kapasitas Tangki (L)</th>
                    <th className="py-2.5 px-3">Volume BBM Saat Ini (L)</th>
                    <th className="py-2.5 px-3">Persentase (%)</th>
                    <th className="py-2.5 px-3">Debit Solar (L/Jam)</th>
                    <th className="py-2.5 px-3">Siphoning Alert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {fuelSensorData.map((f) => (
                    <tr key={f.unitCode} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{f.unitCode}</td>
                      <td className="py-3 px-3 text-slate-300">{f.tankCapacityL} L</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{f.currentFuelL} L</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{f.fuelPct}%</td>
                      <td className="py-3 px-3 text-slate-200">{f.flowRateLh} L/h</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-sans font-bold text-[10px]">
                          {f.antiTheftAlert}
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

      {/* TAB 4: WEIGHT / PAYLOAD SENSORS */}
      {activeTab === 'weight_payload' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Sensor Timbangan Onboard Strut Pressure Payload & Weight Scale Conveyor
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                    <th className="py-2.5 px-3">Kode Unit / Conveyor</th>
                    <th className="py-2.5 px-3">Jenis Sensor Timbangan</th>
                    <th className="py-2.5 px-3">Target Payload (Ton)</th>
                    <th className="py-2.5 px-3">Muatan Aktual (Ton)</th>
                    <th className="py-2.5 px-3">Persentase Beban (%)</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {weightSensorData.map((w, i) => (
                    <tr key={i} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{w.unitCode}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{w.sensorType}</td>
                      <td className="py-3 px-3 text-slate-400">{w.payloadTargetTon} Ton</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{w.actualPayloadTon} Ton</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{w.loadPct}%</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded font-sans font-bold text-[10px] ${
                          w.status === 'OPTIMAL_LOAD' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {w.status}
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

      {/* TAB 5: TEMPERATURE SENSORS */}
      {activeTab === 'temperature_sensors' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Sensor Suhu Digital (Engine Coolant, Hydraulic Oil & Bearing Thermal)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {temperatureSensors.map((t) => (
                <div key={t.sensorId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-mono text-slate-400 text-[10px] block">{t.sensorId}</span>
                  <strong className="text-slate-100 font-bold block">{t.component}</strong>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-2xl font-bold text-emerald-400 font-mono">{t.currentTempC} °C</span>
                    <span className="text-slate-400 text-[11px]">Max Limit: {t.maxThresholdC} °C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: PRESSURE SENSORS */}
      {activeTab === 'pressure_sensors' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Sensor Tekanan Hidrolik, Turbo Boost & Pressure Ban TPMS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pressureSensors.map((p) => (
                <div key={p.sensorId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-mono text-slate-400 text-[10px] block">{p.sensorId}</span>
                  <strong className="text-slate-100 font-bold block">{p.location}</strong>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-2xl font-bold text-amber-300 font-mono">{p.currentPressureBar} Bar</span>
                    <span className="text-slate-400 text-[11px]">Nominal: {p.nominalBar} Bar</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: VIBRATION ACCELEROMETER SENSORS */}
      {activeTab === 'vibration_sensors' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Sensor Getaran Tri-Axial Accelerometer (Predictive Bearing Wear ISO 10816)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vibrationSensors.map((v) => (
                <div key={v.sensorId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-mono text-slate-400 text-[10px] block">{v.sensorId}</span>
                  <strong className="text-slate-100 font-bold block">{v.machinePart}</strong>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-2xl font-bold text-slate-100 font-mono">{v.rmsVelocityMms} mm/s</span>
                    <span className="text-slate-400 text-[11px]">Max Limit: {v.maxAllowableMms} mm/s</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: ENGINE ECU CAN-BUS */}
      {activeTab === 'engine_ecu' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Telemetri Langsung Mesin ECU CAN-Bus J1939 Protocol (Unit DT-1001)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {engineEcuData.map((e, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-slate-400 text-[11px] block">{e.param}</span>
                  <strong className="text-xl font-bold text-emerald-400 font-mono block">{e.value}</strong>
                  <span className="text-slate-500 text-[10px]">Standard Target: {e.nominal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: TPMS TYRE SENSORS */}
      {activeTab === 'tpms_tyres' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Sensor Tekanan & Suhu Ban OTR TPMS (Tyre Pressure Monitoring)</h3>
                <p className="text-slate-400 text-[11px]">Monitoring Tekanan Angin (PSI) & Suhu Inner Liner Ban 27.00R49 Dump Truck</p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold font-mono">
                TPMS 433MHz Wireless
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tpmsTyreData.map((t, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-emerald-400 font-mono block">{t.unitCode}</span>
                      <span className="text-slate-100 text-xs font-bold">{t.tyrePosition}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      t.status === 'OPTIMAL' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {t.status}
                    </span>
                  </div>

                  <div className="space-y-1 pt-2 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">No Seri Ban:</span>
                      <strong className="text-slate-200">{t.serialNo}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Tekanan PSI:</span>
                      <strong className="text-amber-300 font-bold">{t.pressurePsi} PSI</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-sans">Suhu Ban:</span>
                      <strong className="text-rose-400">{t.tempC} °C</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 10: IOT RULE ENGINE & ALERTS */}
      {activeTab === 'alert_rule_engine' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Mesin Aturan Ambang Batas Sensor (IoT Threshold Rule Engine)</h3>
                <p className="text-slate-400 text-[11px]">Konfigurasi Pemicu Otomatis Notifikasi WhatsApp, Sirine & Auto Shutdown</p>
              </div>

              <button
                onClick={() => setIsAddRuleOpen(true)}
                className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Tambah Rule IoT
              </button>
            </div>

            <div className="space-y-3">
              {customRulesList.map((rule) => (
                <div key={rule.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-400 font-bold">{rule.id}</span>
                      <span className="text-slate-500">•</span>
                      <strong className="text-slate-100 text-sm font-bold">{rule.name}</strong>
                    </div>
                    <p className="text-slate-400">
                      Sensor: <strong className="text-slate-200">{rule.sensor}</strong> | Threshold: <strong className="text-amber-300 font-mono">{rule.threshold}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-500/30">
                      Action: {rule.action}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      {rule.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Rule IoT */}
      {isAddRuleOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <BellRing className="w-4 h-4 text-emerald-400" /> Tambah Rule Threshold IoT
              </h3>
              <button onClick={() => setIsAddRuleOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Rule Trigger:</label>
                <input
                  type="text"
                  value={ruleName}
                  onChange={(e) => setRuleName(e.target.value)}
                  placeholder="e.g., Peringatan Suhu Mesin High Temp"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Pilih Jenis Sensor:</label>
                <select
                  value={sensorTypeInput}
                  onChange={(e) => setSensorTypeInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="SUHU_COOLANT">Suhu Coolant Engine (°C)</option>
                  <option value="TEKANAN_HIDROLIK">Tekanan Hidrolik Pump (Bar)</option>
                  <option value="FUEL_SIPHONING">Kebocoran BBM Solar (L/min)</option>
                  <option value="OVERLOAD_PAYLOAD">Muatan Overload (Ton)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Batas Nilai Threshold:</label>
                <input
                  type="number"
                  value={thresholdValInput}
                  onChange={(e) => setThresholdValInput(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  if (ruleName) {
                    setCustomRulesList(prev => [
                      {
                        id: `RL-${104 + prev.length}`,
                        name: ruleName,
                        sensor: sensorTypeInput,
                        threshold: `> ${thresholdValInput}`,
                        action: 'Notifikasi Otomatis Dispatch & WA Alert',
                        status: 'ACTIVE'
                      },
                      ...prev
                    ]);
                  }
                  setIsAddRuleOpen(false);
                  setRuleName('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Simpan Rule Baru
              </button>
              <button
                onClick={() => setIsAddRuleOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
