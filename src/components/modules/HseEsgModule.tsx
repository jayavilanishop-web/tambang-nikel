import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  CheckCircle2, 
  Leaf, 
  AlertTriangle, 
  Activity, 
  Plus, 
  FileText, 
  ClipboardCheck, 
  HardHat, 
  Eye, 
  Flame, 
  Siren, 
  Users, 
  Radio, 
  Search, 
  FileSpreadsheet, 
  Building2, 
  Sparkles,
  MapPin,
  Clock,
  Zap,
  ArrowRight,
  Database,
  Award,
  UserCheck,
  Stethoscope
} from 'lucide-react';
import { SafetyIncidentLog, Language } from '../../types';

interface HseEsgModuleProps {
  incidents: SafetyIncidentLog[];
  language: Language;
  onAddIncident: (newIncident: SafetyIncidentLog) => void;
}

export const HseEsgModule: React.FC<HseEsgModuleProps> = ({
  incidents,
  language,
  onAddIncident
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'incidents_nearmiss'
    | 'permits_jsa'
    | 'hazard_observations'
    | 'risk_assessment'
    | 'inspection_ppe'
    | 'emergency_fire_evac'
    | 'safety_meetings'
    | 'master_data_hse'
  >('incidents_nearmiss');

  const [showAddModal, setShowAddModal] = useState(false);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SafetyIncidentLog['severityLevel']>('MEDIUM');

  // Master Data HSE Manager & K3LH States
  const [masterHseSubTab, setMasterHseSubTab] = useState<'HIRADC' | 'STANDAR_APD' | 'LOKASI_HAZARD' | 'KOMPETENSI_K3'>('HIRADC');
  const [masterHseSearch, setMasterHseSearch] = useState('');

  // Master Data HIRADC / IBPR
  const [masterHiradcList, setMasterHiradcList] = useState([
    { code: 'HIR-001', activity: 'Pengangkutan Ore Nikel Haul Road km 0-18', hazard: 'Blindspot & Jalan Licin Pasca Hujan', riskLevel: 'HIGH', controls: 'Speed Limit 30 km/h, Radio Ch 4, Escort Truck', status: 'ACTIVE_APPROVED' },
    { code: 'HIR-002', activity: 'Pengoperasian Excavator PC2000 Pit Highwall', hazard: 'Longsoran Dinding Pit & Rockfall', riskLevel: 'CRITICAL', controls: 'Radar Geoteknik, Slope Angle 45 Deg, Safety Berm 3m', status: 'ACTIVE_APPROVED' },
    { code: 'HIR-003', activity: 'Peledakan Overburden (Blasting) Pit Alpha', hazard: 'Flyrock Terbang & Vibro Vibration', riskLevel: 'CRITICAL', controls: 'Evakuasi 500m, Siren Warning, Blasting Mat', status: 'ACTIVE_APPROVED' },
    { code: 'HIR-004', activity: 'Hot Work Las Tangki Solar Fuel Station', hazard: 'Kebakaran & Semburan Gas Terbakar', riskLevel: 'HIGH', controls: 'LOTO, Gas Detector 4-Gas, APAR CO2 Standby', status: 'ACTIVE_APPROVED' }
  ]);

  // Master Data Standar APD & Peralatan K3LH
  const [masterPpeStandardsList, setMasterPpeStandardsList] = useState([
    { code: 'APD-001', name: 'Helm K3 Mining ANSI Z89.1 Class E', standard: 'Tahan Benturan 5000N, Chinstrap 4-Point', category: 'Proteksi Kepala', inspectionPeriod: 'Bulanan', status: 'MANDATORY_SITE' },
    { code: 'APD-002', name: 'Sepatu Safety Steel Toe Cap ISO 20345', standard: 'Ketahanan Tekan 15kN, Outsole Anti-Slip Oil Resistant', category: 'Proteksi Kaki', inspectionPeriod: '6 Bulan', status: 'MANDATORY_SITE' },
    { code: 'APD-003', name: 'Full Body Harness Double Lanyard EN 361', standard: 'Absorber Shock Absorber, Kapasitas Beban 140kg', category: 'Bekerja Ketinggian', inspectionPeriod: 'Mingguan', status: 'MANDATORY_SITE' },
    { code: 'APD-004', name: 'Detektor 4-Gas Portabel (H2S, CO, O2, LEL)', standard: 'Sensor Respon < 10 Detik, IP68 Waterproof', category: 'Gas Detection', inspectionPeriod: 'Kalibrasi 3 Bulan', status: 'MANDATORY_SITE' }
  ]);

  // Master Data Zona Risiko & Lokasi Hazard
  const [masterHazardZonesList, setMasterHazardZonesList] = useState([
    { zoneId: 'ZON-01', locationName: 'Highwall Pit Alpha Segment 3', hazardCategory: 'Potensi Longsoran Geoteknik Highwall', riskLevel: 'CRITICAL_ZONE', accessRequirement: 'Izin Khusus Geoteknik & KTT', status: 'WARNING_MONITORED' },
    { zoneId: 'ZON-02', locationName: 'Fuel Storage Station 100,000L', hazardCategory: 'Bahan Mudah Terbakar B3 & Explosive', riskLevel: 'HIGH_FLAMMABLE', accessRequirement: 'Hot Work Permit & Grounding', status: 'RESTRICTED_ACCESS' },
    { zoneId: 'ZON-03', locationName: 'Stockpile Crusher Plant EFO #1', hazardCategory: 'Kebisingan > 85dB & Debu Silika', riskLevel: 'MEDIUM_HEALTH', accessRequirement: 'Earplug & Respirator N95 Wajib', status: 'OPERATIONAL_SAFE' }
  ]);

  // Master Data Kompetensi & Sertifikasi K3
  const [masterK3CertificationsList, setMasterK3CertificationsList] = useState([
    { certId: 'CERT-001', certName: 'Pengawas Operasional Pertama (POP) ESDM', requirementRole: 'Foreman & Supervisor Pit', validityYears: '5 Tahun', issuingBody: 'LSP Minerba / ESDM', status: 'REQUIRED_SUPERVISOR' },
    { certId: 'CERT-002', certName: 'Pengawas Operasional Madya (POM) ESDM', requirementRole: 'Superintendent & Manager Mine', validityYears: '5 Tahun', issuingBody: 'LSP Minerba / ESDM', status: 'REQUIRED_MANAGEMENT' },
    { certId: 'CERT-003', certName: 'Ahli K3 Umum Kemenaker', requirementRole: 'HSE Officer & Safety Inspector', validityYears: '3 Tahun', issuingBody: 'Kemenaker RI', status: 'REQUIRED_HSE_OFFICER' },
    { certId: 'CERT-004', certName: 'ERT First Aider & Firefighter Level 2', requirementRole: 'Tim Rescue ERT Site', validityYears: '2 Tahun', issuingBody: 'BASARNAS / BNSP', status: 'REQUIRED_RESCUE' }
  ]);

  // Permit to Work (PTW) & Job Safety Analysis (JSA) Dataset
  const permitsData = [
    { ptwId: 'PTW-2026-081', workType: 'Izin Kerja Panas (Hot Work Permit - Welding Fuel Tank)', location: 'Workshop Main Haul Road km 12', supervisor: 'Budi Santoso (Senior Mechanic)', jsaStatus: 'JSA_APPROVED', ptwStatus: 'ACTIVE_APPROVED', validUntil: '2026-08-03 18:00' },
    { ptwId: 'PTW-2026-082', workType: 'Izin Masuk Ruang Terbatas (Confined Space Permit)', location: 'Chute Crusher Station #2', supervisor: 'Rahmat Hidayat (Process Lead)', jsaStatus: 'JSA_APPROVED', ptwStatus: 'ACTIVE_APPROVED', validUntil: '2026-08-03 17:00' },
    { ptwId: 'PTW-2026-083', workType: 'Izin Ketinggian (Working at Height > 2m)', location: 'Stockpile Conveyor Gantry', supervisor: 'Agus Wijaya (Civil Engineer)', jsaStatus: 'PENDING_REVIEW', ptwStatus: 'PENDING_APPROVAL', validUntil: '2026-08-04 12:00' }
  ];

  // JSA (Job Safety Analysis) Sample
  const jsaSteps = [
    { stepNo: 1, taskStep: 'Persiapan & Pengangkatan Komponen Loader PC2000', potentialHazard: 'Sling Baja Putus, Beban Terjatuh', riskLevel: 'HIGH', controlMeasure: 'Cek Sertifikat Rigging, Gunakan Tag Line, Barikade Area Radius 15m' },
    { stepNo: 2, taskStep: 'Penyambungan Selang Hidrolik Tekanan Tinggi', potentialHazard: 'Semburan Cairan Panas (Pin Hole Injection)', riskLevel: 'MEDIUM', controlMeasure: 'Rilis Tekanan Akumulator, Gunakan Sarung Tangan Kulit Tahan Tekanan & Safety Goggles' }
  ];

  // Hazard Identification & Safety Observation (STOP Card)
  const hazardObservations = [
    { obsId: 'HAZ-2026-112', type: 'UNSAFE_CONDITION', category: 'Fasilitas & Jalan Tambang', location: 'Haul Road Segment B Pit Alpha', hazardDetail: 'Tanggul Pengaman (Safety Berm) Kurang dari 3/4 Diameter Ban CAT 777E', observer: 'Doni (Safety Inspector)', status: 'CORRECTIVE_IN_PROGRESS' },
    { obsId: 'HAZ-2026-113', type: 'UNSAFE_ACTION', category: 'Kepatuhan Alat Pelindung Diri (PPE)', location: 'Conveyor Jetty Berth 1', hazardDetail: 'Operator Tidak Mengunci Chinstrap Helm Keselamatan & Belum Memakai Harness', observer: 'Siti (HSE Officer)', status: 'ACTIONED_CLOSED' }
  ];

  // Risk Assessment (HIRADC Matrix)
  const hiradcItems = [
    { activity: 'Pengangkutan Ore Nikel dengan Dump Truck CAT 777E', hazard: 'Jalan Licin Pasca Hujan & Blind Spot', initialRisk: 'HIGH (15)', riskControls: 'Pemasangan Guardrail, Speed Limit 30 km/h, Kamera Fatigue AI, Radio Channel 4', residualRisk: 'LOW (4)' },
    { activity: 'Peledakan Batuan Penutup (Overburden Blasting)', hazard: 'Flyrock (Lempangan Batu Terbang) & Vibro Vibration', initialRisk: 'CRITICAL (20)', riskControls: 'Radius Evakuasi 500m, Siren Warning 3x, Blasting Mat Covering', residualRisk: 'MEDIUM (8)' }
  ];

  // Safety Inspection & PPE Inventory
  const ppeInventory = [
    { item: 'Helm Keselamatan K3 Mining (Hard Hat - White/Yellow)', stockCount: 420, minReorder: 100, status: 'SUFFICIENT' },
    { item: 'Sepatu Safety Steel Toe Cap 8 Inch', stockCount: 185, minReorder: 50, status: 'SUFFICIENT' },
    { item: 'Full Body Harness Double Lanyard Absorber', stockCount: 64, minReorder: 20, status: 'SUFFICIENT' },
    { item: 'Detektor Gas Berbahaya (4-Gas Detector H2S/CO/O2/LEL)', stockCount: 18, minReorder: 10, status: 'CALIBRATION_OK' }
  ];

  // Emergency Response, Fire Protection & Evacuation Plan
  const emergencyRoster = [
    { teamRole: 'Emergency Response Team (ERT) Commander', personName: 'Kapten Haryanto', contactRadio: 'VHF Channel 1 Emergency', status: 'ON_DUTY_STANDBY' },
    { teamRole: 'Fire & Rescue Specialist Crew', personName: 'Tim Rescue 4 Personel', contactRadio: 'VHF Channel 1 Emergency', status: 'READY_FIRE_TRUCK_1' }
  ];

  // Safety Meetings & Toolbox Talk (P5M)
  const safetyMeetings = [
    { meetingId: 'P5M-2026-0803', title: 'P5M Morning Toolbox Talk - Prosedur Bekerja Dekat Tebing Pit Highwall', dept: 'Mining Operations Shift 1', attendeesCount: 142, speaker: 'Hendra Setiawan (Mine Supt)', date: '2026-08-03 06:30' },
    { meetingId: 'P5M-2026-0802', title: 'Safety Committee Meeting (P2K3) Bulanan', dept: 'Manajemen & K3LH Site', attendeesCount: 28, speaker: 'Ir. Bambang Wijaya (KTT)', date: '2026-08-01 14:00' }
  ];

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newLog: SafetyIncidentLog = {
      id: `INC-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      type: 'NEAR_MISS',
      location: location || 'Pit Area Site',
      description,
      investigationStatus: 'OPEN',
      severityLevel: severity,
      reporter: 'HSE Field Inspector'
    };

    onAddIncident(newLog);
    setShowAddModal(false);
    setDescription('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Sistem Manajemen K3LH Tambang (Safety & HSE)
            </span>
            <span className="text-slate-400 text-xs">• Kepmen ESDM No. 1827 K/30/MEM/2018</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Keselamatan Pertambangan, K3LH, Izin Kerja & Tanggap Darurat
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Modul terintegrasi K3: Pelaporan Insiden & Near Miss, Izin Kerja PTW & JSA, Inspeksi K3 & APD, Matriks Risiko HIRADC, Pos Tanggap Darurat Evakuasi & P5M Safety Toolbox Meeting.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Laporkan Near Miss / Bahaya</span>
        </button>
      </div>

      {/* High-Level Safety KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Lost Time Injury (LTI) Rate</span>
          <p className="text-2xl font-extrabold text-emerald-400">0.00 <span className="text-xs font-normal text-slate-400">/ 1M Hours</span></p>
          <span className="text-[11px] text-slate-500 block">1,450,000 Jam Kerja Selamat</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Active PTW & JSA Approved</span>
          <p className="text-2xl font-extrabold text-amber-300">14 <span className="text-xs font-normal text-slate-400">Permits</span></p>
          <span className="text-[11px] text-slate-500 block">Confined Space, Hot Work & Height</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Inspeksi APD (PPE) Compliance</span>
          <p className="text-2xl font-extrabold text-emerald-400">99.2% <span className="text-xs font-normal text-slate-400">Patuh</span></p>
          <span className="text-[11px] text-slate-500 block">Stockpile & Pit Audit OK</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Kesiapan Tim Tanggap Darurat</span>
          <p className="text-2xl font-extrabold text-rose-400">READY <span className="text-xs font-normal text-slate-400">24/7</span></p>
          <span className="text-[11px] text-slate-500 block">Mobil Damkar & Rescue Standby</span>
        </div>
      </div>

      {/* Module Navigation Tabs covering all 15 Safety keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'incidents_nearmiss', label: 'Insiden & Near Miss (Incident)', icon: ShieldAlert },
          { id: 'permits_jsa', label: 'Izin Kerja & JSA (Permit)', icon: FileText },
          { id: 'hazard_observations', label: 'Observasi Bahaya & Hazard', icon: Eye },
          { id: 'risk_assessment', label: 'Penilaian Risiko (Risk/HIRADC)', icon: AlertTriangle },
          { id: 'inspection_ppe', label: 'Inspeksi K3 & APD (PPE)', icon: HardHat },
          { id: 'emergency_fire_evac', label: 'Emergency, Fire & Evakuasi', icon: Flame },
          { id: 'safety_meetings', label: 'Safety Meeting & P5M', icon: Users },
          { id: 'master_data_hse', label: '🗄️ Master Data HSE Manager & K3LH', icon: Database }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-rose-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INCIDENTS & NEAR MISS */}
      {activeTab === 'incidents_nearmiss' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Log Laporan Insiden, Kecelakaan Tambang & Incident Near Miss Log
            </h3>

            <div className="space-y-3">
              {incidents.map((inc) => (
                <div key={inc.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-slate-200">{inc.location}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inc.severityLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {inc.severityLevel}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{inc.description}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/80">
                    <span>Pelapor: {inc.reporter}</span>
                    <span className="font-mono">{inc.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PERMITS & JSA */}
      {activeTab === 'permits_jsa' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Izin Kerja Khusus (Permit To Work - PTW) & Analisis Keselamatan Kerja (JSA)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">PTW ID</th>
                    <th className="py-2.5 px-3">Jenis Pekerjaan Berrisiko</th>
                    <th className="py-2.5 px-3">Lokasi Tambang</th>
                    <th className="py-2.5 px-3">Pengawas K3</th>
                    <th className="py-2.5 px-3">Dokumen JSA</th>
                    <th className="py-2.5 px-3">Status Izin (Permit)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {permitsData.map((p) => (
                    <tr key={p.ptwId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-rose-400">{p.ptwId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{p.workType}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{p.location}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{p.supervisor}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {p.jsaStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {p.ptwStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-200">Sample Job Safety Analysis (JSA) Steps & Control Measures</h4>
              <div className="space-y-2">
                {jsaSteps.map((step) => (
                  <div key={step.stepNo} className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="font-bold text-rose-400">Langkah {step.stepNo}: {step.taskStep}</span>
                    <p className="text-slate-300 text-[11px]">Potensi Bahaya: <span className="text-amber-300 font-semibold">{step.potentialHazard}</span></p>
                    <p className="text-slate-400 text-[11px]">Mitigasi & Pengendalian K3: <span className="text-emerald-400 font-semibold">{step.controlMeasure}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HAZARD OBSERVATIONS & STOP CARDS */}
      {activeTab === 'hazard_observations' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Observasi Bahaya, STOP Card & Unsafe Condition / Action Reports
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Hazard ID</th>
                    <th className="py-2.5 px-3">Kategori Temuan</th>
                    <th className="py-2.5 px-3">Detail Kondisi / Tindakan Bahaya</th>
                    <th className="py-2.5 px-3">Lokasi Pit/Plant</th>
                    <th className="py-2.5 px-3">Inspektur K3</th>
                    <th className="py-2.5 px-3">Status Perbaikan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {hazardObservations.map((h) => (
                    <tr key={h.obsId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-rose-400">{h.obsId}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{h.type}</td>
                      <td className="py-3 px-3 font-sans text-slate-100">{h.hazardDetail}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{h.location}</td>
                      <td className="py-3 px-3 font-sans text-slate-400">{h.observer}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-amber-500/20 text-amber-300">
                          {h.status}
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

      {/* TAB 4: RISK ASSESSMENT (HIRADC) */}
      {activeTab === 'risk_assessment' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Matriks Penilaian Risiko Dampak K3 (HIRADC - Hazard Identification & Risk Assessment)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Aktivitas Pekerjaan Tambang</th>
                    <th className="py-2.5 px-3">Potensi Bahaya K3</th>
                    <th className="py-2.5 px-3">Risiko Awal</th>
                    <th className="py-2.5 px-3">Hierarki Pengendalian Risiko</th>
                    <th className="py-2.5 px-3">Sisa Risiko (Residual)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {hiradcItems.map((hr, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-sans font-bold text-slate-100">{hr.activity}</td>
                      <td className="py-3 px-3 font-sans text-amber-300">{hr.hazard}</td>
                      <td className="py-3 px-3 font-bold text-rose-400">{hr.initialRisk}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{hr.riskControls}</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">{hr.residualRisk}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: INSPECTION & PPE */}
      {activeTab === 'inspection_ppe' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Inspeksi K3 Routine Safety Inspection & Gudang Alat Pelindung Diri (PPE)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Nama Alat Pelindung Diri (PPE)</th>
                    <th className="py-2.5 px-3">Jumlah Stok Gudang K3</th>
                    <th className="py-2.5 px-3">Batas Minimal Reorder</th>
                    <th className="py-2.5 px-3">Status Ketersediaan & Kalibrasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {ppeInventory.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-sans font-bold text-slate-100">{p.item}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{p.stockCount} Pcs</td>
                      <td className="py-3 px-3 text-slate-400">{p.minReorder} Pcs</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {p.status}
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

      {/* TAB 6: EMERGENCY, FIRE & EVACUATION */}
      {activeTab === 'emergency_fire_evac' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Sistem Tanggap Darurat (Emergency), Mobil Damkar (Fire) & Rute Evakuasi Muster Point
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emergencyRoster.map((e, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <strong className="text-rose-400 font-bold">{e.teamRole}</strong>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {e.status}
                    </span>
                  </div>
                  <p className="text-slate-100 font-bold text-sm">{e.personName}</p>
                  <p className="text-slate-400">Radio Darurat: <span className="text-emerald-300 font-mono font-bold">{e.contactRadio}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SAFETY MEETINGS */}
      {activeTab === 'safety_meetings' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Safety Meeting, Pembinaan 5 Menit (P5M) & Safety Induction Visitors
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Meeting ID</th>
                    <th className="py-2.5 px-3">Topik Safety Meeting / P5M</th>
                    <th className="py-2.5 px-3">Departemen / Shift</th>
                    <th className="py-2.5 px-3">Jumlah Kehadiran</th>
                    <th className="py-2.5 px-3">Pemateri / Supervisor</th>
                    <th className="py-2.5 px-3">Waktu Pelaksanaan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {safetyMeetings.map((sm) => (
                    <tr key={sm.meetingId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-rose-400">{sm.meetingId}</td>
                      <td className="py-3 px-3 font-sans font-bold text-slate-100">{sm.title}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{sm.dept}</td>
                      <td className="py-3 px-3 font-bold text-emerald-400">{sm.attendeesCount} Peserta</td>
                      <td className="py-3 px-3 font-sans text-slate-400">{sm.speaker}</td>
                      <td className="py-3 px-3 text-slate-400">{sm.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: MASTER DATA HSE MANAGER & K3LH */}
      {activeTab === 'master_data_hse' && (
        <div className="space-y-6 text-xs">
          {/* Sub-Header Banner */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Master Data K3LH & Safety Pertambangan
                </span>
                <span className="text-slate-400 text-xs">• Sesuai Kepmen ESDM No. 1827 K/30/MEM/2018</span>
              </div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-rose-400" />
                Master Data Risk Matrix HIRADC, Standar APD, Lokasi Hazard & Lisensi K3
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pusat data induk matriks penilaian risiko HIRADC/IBPR, spesifikasi standar APD wajib site, peta zona hazard kritis, serta kualifikasi sertifikasi K3 (POP, POM, POU, ERT).
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (masterHseSubTab === 'HIRADC') {
                    const newCode = `HIR-00${masterHiradcList.length + 1}`;
                    setMasterHiradcList([...masterHiradcList, { code: newCode, activity: 'Aktivitas Baru Pit', hazard: 'Potensi Hazard Baru', riskLevel: 'MEDIUM', controls: 'Prosedur SOP & APD Wajib', status: 'ACTIVE_APPROVED' }]);
                    alert("Master Data HIRADC baru berhasil ditambahkan!");
                  } else if (masterHseSubTab === 'STANDAR_APD') {
                    const newCode = `APD-00${masterPpeStandardsList.length + 1}`;
                    setMasterPpeStandardsList([...masterPpeStandardsList, { code: newCode, name: 'Peralatan APD K3 Baru', standard: 'Standar SNI / ANSI Z89', category: 'Proteksi K3', inspectionPeriod: 'Bulanan', status: 'MANDATORY_SITE' }]);
                    alert("Master Standar APD K3 baru berhasil dicatat!");
                  } else if (masterHseSubTab === 'LOKASI_HAZARD') {
                    const newZone = `ZON-0${masterHazardZonesList.length + 1}`;
                    setMasterHazardZonesList([...masterHazardZonesList, { zoneId: newZone, locationName: 'Area Hazard Baru', hazardCategory: 'Kategori Risiko Site', riskLevel: 'HIGH_RISK', accessRequirement: 'Izin APD & PTW', status: 'WARNING_MONITORED' }]);
                    alert("Master Lokasi Hazard Kritis baru berhasil dicatat!");
                  } else {
                    const newCert = `CERT-00${masterK3CertificationsList.length + 1}`;
                    setMasterK3CertificationsList([...masterK3CertificationsList, { certId: newCert, certName: 'Sertifikasi K3 Mining Baru', requirementRole: 'Pengawas / Technical Staff', validityYears: '3 Tahun', issuingBody: 'LSP / ESDM', status: 'REQUIRED_SUPERVISOR' }]);
                    alert("Master Sertifikasi K3 Baru berhasil ditambahkan!");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shrink-0"
              >
                <Plus className="w-4 h-4" />
                Tambah Master Data HSE
              </button>
            </div>
          </div>

          {/* Master Sub-Tabs Selector */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
            {[
              { id: 'HIRADC', label: '1. Master Matriks Risk HIRADC / IBPR', count: masterHiradcList.length },
              { id: 'STANDAR_APD', label: '2. Master Standar APD & Peralatan K3', count: masterPpeStandardsList.length },
              { id: 'LOKASI_HAZARD', label: '3. Master Zona Hazard & Area Kritis', count: masterHazardZonesList.length },
              { id: 'KOMPETENSI_K3', label: '4. Master Sertifikasi & Kompetensi K3', count: masterK3CertificationsList.length }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setMasterHseSubTab(sub.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                  masterHseSubTab === sub.id
                    ? 'bg-rose-600 text-white shadow-lg ring-1 ring-rose-400'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{sub.label}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 font-mono text-rose-300 border border-slate-700">
                  {sub.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sub-Tab 1: Master HIRADC / IBPR */}
          {masterHseSubTab === 'HIRADC' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Daftar Master HIRADC (Hazard Identification, Risk Assessment & Risk Control)
                  </h3>
                  <p className="text-[11px] text-slate-400">Database Penilaian Potensi Bahaya Pekerjaan Tambang, Risiko Sisa & Mitigasi Pengendalian</p>
                </div>
                <input
                  type="text"
                  placeholder="Cari Kode / Aktivitas..."
                  value={masterHseSearch}
                  onChange={(e) => setMasterHseSearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-rose-500 font-mono"
                />
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <th className="p-3">Kode HIRADC</th>
                      <th className="p-3">Uraian Aktivitas Pekerjaan</th>
                      <th className="p-3">Identifikasi Bahaya Utama</th>
                      <th className="p-3">Level Risiko</th>
                      <th className="p-3">Mitigasi & Hirarki Pengendalian</th>
                      <th className="p-3">Status Matriks</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    {masterHiradcList
                      .filter(h => !masterHseSearch || h.activity.toLowerCase().includes(masterHseSearch.toLowerCase()) || h.code.toLowerCase().includes(masterHseSearch.toLowerCase()))
                      .map((hir, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-rose-400">{hir.code}</td>
                          <td className="p-3 text-white font-bold font-sans">{hir.activity}</td>
                          <td className="p-3 font-sans text-slate-300">{hir.hazard}</td>
                          <td className="p-3 font-sans">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              hir.riskLevel === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            }`}>
                              {hir.riskLevel}
                            </span>
                          </td>
                          <td className="p-3 font-sans text-emerald-300">{hir.controls}</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ✓ {hir.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button onClick={() => alert(`Mengedit Master HIRADC ${hir.code}`)} className="text-rose-400 hover:underline font-bold text-[11px]">Edit Master</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Master Standar APD & Peralatan K3 */}
          {masterHseSubTab === 'STANDAR_APD' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HardHat className="w-4 h-4 text-amber-400" />
                    Daftar Master Standar Spesifikasi APD & Alat Deteksi Gas K3
                  </h3>
                  <p className="text-[11px] text-slate-400">Master Sertifikasi SNI/ANSI Helm, Sepatu Steel Toe, Full Body Harness & Detektor Gas</p>
                </div>
                <input
                  type="text"
                  placeholder="Cari Alat APD..."
                  value={masterHseSearch}
                  onChange={(e) => setMasterHseSearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-rose-500 font-mono"
                />
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <th className="p-3">Kode APD</th>
                      <th className="p-3">Nama Alat Pelindung Diri</th>
                      <th className="p-3">Kategori Proteksi</th>
                      <th className="p-3">Standar Spesifikasi Teknis</th>
                      <th className="p-3">Periode Inspeksi</th>
                      <th className="p-3">Status Kepatuhan</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    {masterPpeStandardsList
                      .filter(a => !masterHseSearch || a.name.toLowerCase().includes(masterHseSearch.toLowerCase()))
                      .map((ppe, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-rose-400">{ppe.code}</td>
                          <td className="p-3 text-white font-bold font-sans">{ppe.name}</td>
                          <td className="p-3 font-sans text-amber-300 font-bold">{ppe.category}</td>
                          <td className="p-3 text-slate-300 font-sans">{ppe.standard}</td>
                          <td className="p-3 text-sky-400 font-bold">{ppe.inspectionPeriod}</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ✓ {ppe.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button onClick={() => alert(`Mengedit Master APD ${ppe.name}`)} className="text-rose-400 hover:underline font-bold text-[11px]">Edit Master</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Master Lokasi Hazard & Area Kritis */}
          {masterHseSubTab === 'LOKASI_HAZARD' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    Daftar Master Zona Kritis & Peta Area Berbahaya Tambang
                  </h3>
                  <p className="text-[11px] text-slate-400">Pusat Pendaftaran Highwall Rawan Longsor, Tangki Bahan Bakar B3 & Area Kebisingan Tinggi</p>
                </div>
                <input
                  type="text"
                  placeholder="Cari Lokasi Hazard..."
                  value={masterHseSearch}
                  onChange={(e) => setMasterHseSearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-rose-500 font-mono"
                />
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <th className="p-3">ID Zona</th>
                      <th className="p-3">Nama Lokasi Area Site</th>
                      <th className="p-3">Kategori Bahaya & Hazard</th>
                      <th className="p-3">Klasifikasi Risiko Area</th>
                      <th className="p-3">Persyaratan Akses Masuk</th>
                      <th className="p-3">Status Pengawasan</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    {masterHazardZonesList
                      .filter(z => !masterHseSearch || z.locationName.toLowerCase().includes(masterHseSearch.toLowerCase()))
                      .map((zone, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-rose-400">{zone.zoneId}</td>
                          <td className="p-3 text-white font-bold font-sans">{zone.locationName}</td>
                          <td className="p-3 font-sans text-rose-300">{zone.hazardCategory}</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                              {zone.riskLevel}
                            </span>
                          </td>
                          <td className="p-3 font-sans text-slate-300">{zone.accessRequirement}</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              ● {zone.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button onClick={() => alert(`Mengedit Area Hazard ${zone.locationName}`)} className="text-rose-400 hover:underline font-bold text-[11px]">Edit Master</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-Tab 4: Master Sertifikasi & Kompetensi K3 */}
          {masterHseSubTab === 'KOMPETENSI_K3' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-400" />
                    Daftar Master Kualifikasi Lisensi & Sertifikasi K3 Pertambangan
                  </h3>
                  <p className="text-[11px] text-slate-400">Master Lisensi POP/POM/POU ESDM, Ahli K3 Umum Kemenaker & Sertifikat Tim ERT Rescue</p>
                </div>
                <input
                  type="text"
                  placeholder="Cari Sertifikasi..."
                  value={masterHseSearch}
                  onChange={(e) => setMasterHseSearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-rose-500 font-mono"
                />
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <th className="p-3">ID Lisensi</th>
                      <th className="p-3">Nama Sertifikasi / Lisensi K3</th>
                      <th className="p-3">Persyaratan Jabatan / Role</th>
                      <th className="p-3">Masa Berlaku</th>
                      <th className="p-3">Lembaga Sertifikasi (LSP/Pemerintah)</th>
                      <th className="p-3">Status Kebutuhan</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    {masterK3CertificationsList
                      .filter(c => !masterHseSearch || c.certName.toLowerCase().includes(masterHseSearch.toLowerCase()))
                      .map((cert, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-rose-400">{cert.certId}</td>
                          <td className="p-3 text-white font-bold font-sans">{cert.certName}</td>
                          <td className="p-3 font-sans text-indigo-300 font-bold">{cert.requirementRole}</td>
                          <td className="p-3 text-emerald-400 font-bold">{cert.validityYears}</td>
                          <td className="p-3 text-slate-300 font-sans">{cert.issuingBody}</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ✓ {cert.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button onClick={() => alert(`Mengedit Lisensi ${cert.certName}`)} className="text-rose-400 hover:underline font-bold text-[11px]">Edit Master</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-lg">Laporkan Insiden / Near Miss K3LH</h3>
            <form onSubmit={handleCreateIncident} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Lokasi Kejadian:</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Haul Road km 3 Pit Beta"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Deskripsi Kejadian / Potensi Bahaya:</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan kondisi jalan, peralatan, atau tindakan..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Tingkat Keparahan (Severity):</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                >
                  <option value="LOW">LOW (Rendah)</option>
                  <option value="MEDIUM">MEDIUM (Sedang)</option>
                  <option value="HIGH">HIGH (Tinggi)</option>
                  <option value="CRITICAL">CRITICAL (Kritis)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold"
                >
                  Kirim Laporan K3
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
