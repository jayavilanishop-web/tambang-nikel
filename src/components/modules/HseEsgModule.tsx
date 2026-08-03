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
  ArrowRight
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
  >('incidents_nearmiss');

  const [showAddModal, setShowAddModal] = useState(false);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<SafetyIncidentLog['severityLevel']>('MEDIUM');

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
          { id: 'safety_meetings', label: 'Safety Meeting & P5M', icon: Users }
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
