import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Camera, 
  UserCheck, 
  UserX, 
  Key, 
  Radio, 
  AlertTriangle, 
  Eye, 
  Video, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Building2, 
  MapPin, 
  QrCode, 
  Truck, 
  BadgeAlert, 
  Maximize2 
} from 'lucide-react';
import { Language } from '../../types';

interface SecurityAccessModuleProps {
  language: Language;
}

export const SecurityAccessModule: React.FC<SecurityAccessModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'visitor_management'
    | 'gate_pass'
    | 'cctv_monitoring'
    | 'security_patrol'
    | 'security_incidents'
    | 'blacklist_registry'
    | 'access_control'
  >('visitor_management');

  // Visitor Management Dataset
  const visitorsList = [
    { badgeNo: 'VIS-2026-081', visitorName: 'Rudi Hermawan', company: 'PT Sucofindo Surveyor', hostPerson: 'Mine Geologist Lead', purpose: 'Pengambilan Sampel Check Ore Assay', checkInTime: '2026-08-03 08:15', status: 'ON_SITE_ACTIVE', safetyInduction: 'PASSED' },
    { badgeNo: 'VIS-2026-082', badgeType: 'VIP', visitorName: 'Tim Inspektur ESDM KESDM', company: 'Direktorat Teknik Tambang', hostPerson: 'KTT Ir. Bambang Wijaya', purpose: 'Inspeksi K3LH & Audit RKAB', checkInTime: '2026-08-03 09:00', status: 'ON_SITE_ACTIVE', safetyInduction: 'PASSED' }
  ];

  // Gate Pass Dataset (Material & Heavy Vehicle Clearance)
  const gatePassList = [
    { passNo: 'GP-2026-0412', passType: 'MATERIAL_OUTBOUND', driverName: 'Sulaeman', vehiclePlate: 'B 9412 UT', vehicleType: 'Volvo FMX Dump Truck', cargoDetail: 'Sparepart Engine CAT 3512 Bekas Rebuilt', destination: 'Jakarta Central Workshop', clearanceStatus: 'APPROVED_GATE_PASSED', verifiedBy: 'Pos Gate 1 (Bambang)' },
    { passNo: 'GP-2026-0413', passType: 'VEHICLE_INBOUND', driverName: 'Jaka', vehiclePlate: 'KT 8812 FB', vehicleType: 'Fuel Tanker B35 Pertamina (20KL)', cargoDetail: 'High Speed Diesel B35 Fuel Supply', destination: 'Main Fuel Storage Station', clearanceStatus: 'INSPECTION_OK_PASSED', verifiedBy: 'Pos Gate 1 (Bambang)' }
  ];

  // CCTV Cameras Feed Monitoring Dataset
  const cctvFeeds = [
    { camId: 'CAM-GATE-01', name: 'Kamera Pos Utama Main Gate 1 (LPR License Plate AI)', area: 'Main Portal Gate Entry', resolution: '4K Ultra HD 60fps', status: 'LIVE_STREAMING', aiDetection: 'LPR_LICENSE_PLATE_AUTO' },
    { camId: 'CAM-JETTY-02', name: 'Kamera Jetty Pier Barging Pier A (Thermal IR)', area: 'Jetty Port Berth 1', resolution: '1080p Thermal Night Vision', status: 'LIVE_STREAMING', aiDetection: 'PERIMETER_INTRUSION_OFF' },
    { camId: 'CAM-FUEL-03', name: 'Kamera Tangki Induk BBM Diesel Storage (ATEX Explosive Proof)', area: 'Fuel Farm Depot', resolution: '4K Ultra HD', status: 'LIVE_STREAMING', aiDetection: 'SMOKE_FLAME_AI_ACTIVE' },
    { camId: 'CAM-EXPLOSIVE-04', name: 'Kamera Gudang Handak Peledakan (ANFO Bunker)', area: 'Explosive Magazine Security Zone', resolution: '4K Night Vision', status: 'LIVE_STREAMING', aiDetection: 'MOTION_DETECTION_ARMED' }
  ];

  // Security Patrol & Checkpoint Logs
  const patrolCheckpoints = [
    { patrolId: 'PTR-2026-881', patrolRoute: 'Ronda Shift Malam - Perbatasan Area Tambang Pit Alpha & Land Boundary', guardName: 'Danru Supriatna + 2 Personel', startTime: '2026-08-03 02:00', endTime: '2026-08-03 04:30', qrScannedPoints: '12 / 12 Points', status: 'PATROL_COMPLETED_NORMAL' },
    { patrolId: 'PTR-2026-882', patrolRoute: 'Ronda Patroli Dermaga Jetty & Stockpile Rom Area', guardName: 'Regu Bravo Security', startTime: '2026-08-03 06:00', endTime: '2026-08-03 08:00', qrScannedPoints: '8 / 8 Points', status: 'PATROL_COMPLETED_NORMAL' }
  ];

  // Security Incidents & Theft Attempt Logs
  const securityIncidents = [
    { incNo: 'SEC-2026-012', incidentDate: '2026-07-28 23:45', location: 'Stockpile Ore Yard Segment B', category: 'PERIMETER_INTRUSION_ATTEMPT', description: 'Terdeteksi 2 orang tanpa identitas mendekati pagar perbatasan. Dihadang tim patroli & diserahkan ke Polsek setempat.', severity: 'MEDIUM', status: 'CLOSED_POLICE_HANDLED' }
  ];

  // Blacklist Registry (Personnel & Vehicles)
  const blacklistRegistry = [
    { entryId: 'BLK-2025-004', subjectName: 'Herman (Ex-Subkon)', subjectType: 'PERSONNEL', nationalId: '7302192001192', reason: 'Tindakan Pelanggaran Berat K3 & Pencurian Kabel Tembaga', blacklistedDate: '2025-11-10', alertLevel: 'BLOCK_ALL_GATES' },
    { entryId: 'BLK-2026-001', subjectName: 'Dump Truck KT 7712 AA', subjectType: 'VEHICLE', licensePlate: 'KT 7712 AA', reason: 'Surat Uji Kir Kadaluarsa & SIMPER Driver Dicabut', blacklistedDate: '2026-02-14', alertLevel: 'BLOCK_GATE_ENTRY' }
  ];

  // Access Control & RFID Turnstile Systems
  const accessControlLogs = [
    { cardId: 'RFID-884120', holderName: 'Eko Prasetyo', zoneName: 'Zone 1 - Pit Alpha Heavy Equipment Zone', timeStamp: '2026-08-03 06:45:12', result: 'ACCESS_GRANTED' },
    { cardId: 'RFID-112049', holderName: 'Unidentified Tag', zoneName: 'Zone 4 - Magazine Handak Explosive Bunker', timeStamp: '2026-08-03 07:12:05', result: 'ACCESS_DENIED_ALERT' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Mine Site Physical Security & Smart Access Control
            </span>
            <span className="text-slate-400 text-xs">• Perkap Kapolri No. 24 / 2007 SMP Security Management</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Keamanan Tambang, Akses Portal, CCTV AI & Patroli Security
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pengamanan site tambang nikel: Manajemen Buku Tamu (Visitor), Surat Izin Keluar Masuk (Gate Pass), Pemantauan CCTV AI 24/7, Patroli QR Checkpoint Security, Penanganan Insiden Keamanan, Daftar Hitam (Blacklist) & Akses Kontrol RFID.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Status Pengamanan Site:</span>
            <strong className="text-emerald-400 font-mono text-base font-bold">KONDUSIF (SIAGA 1 NORMAL)</strong>
          </div>
        </div>
      </div>

      {/* Security System Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Active Visitors On Site</span>
          <p className="text-2xl font-extrabold text-indigo-400 font-mono">18 <span className="text-xs font-normal text-slate-400">Personel</span></p>
          <span className="text-[11px] text-slate-500 block">Induksi Safety Check Valid</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">CCTV Live Camera Feeds</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">24 / 24 <span className="text-xs font-normal text-slate-400">Online</span></p>
          <span className="text-[11px] text-slate-500 block">LPR License Plate AI Active</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Patroli Security Scanned</span>
          <p className="text-2xl font-extrabold text-amber-300 font-mono">100% <span className="text-xs font-normal text-slate-400">Ronda OK</span></p>
          <span className="text-[11px] text-slate-500 block">20 Checkpoint QR Scanned</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Blacklist Blocked Vehicles</span>
          <p className="text-2xl font-extrabold text-rose-400 font-mono">2 <span className="text-xs font-normal text-slate-400">Blocked</span></p>
          <span className="text-[11px] text-slate-500 block">Automatic Gate Boom Barrier</span>
        </div>
      </div>

      {/* Module Navigation Tabs covering all 7 Security keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'visitor_management', label: 'Buku Tamu (Visitor)', icon: UserCheck },
          { id: 'gate_pass', label: 'Izin Keluar Masuk (Gate Pass)', icon: Truck },
          { id: 'cctv_monitoring', label: 'CCTV Live AI Feeds', icon: Video },
          { id: 'security_patrol', label: 'Patroli Security & Ronda', icon: Radio },
          { id: 'security_incidents', label: 'Insiden Keamanan', icon: AlertTriangle },
          { id: 'blacklist_registry', label: 'Daftar Hitam (Blacklist)', icon: UserX },
          { id: 'access_control', label: 'Akses Kontrol RFID', icon: Key }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: VISITOR MANAGEMENT */}
      {activeTab === 'visitor_management' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Registrasi Tamu Site (Visitor Management & Badge Issuance)</h3>
              <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Registrasi Visitor Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Badge</th>
                    <th className="py-2.5 px-3">Nama Tamu / Visitor</th>
                    <th className="py-2.5 px-3">Instansi / Perusahaan</th>
                    <th className="py-2.5 px-3">Personel Penanggung Jawab (Host)</th>
                    <th className="py-2.5 px-3">Tujuan Kunjungan</th>
                    <th className="py-2.5 px-3">Waktu Masuk</th>
                    <th className="py-2.5 px-3">Induksi Safety</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {visitorsList.map((v) => (
                    <tr key={v.badgeNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{v.badgeNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{v.visitorName}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{v.company}</td>
                      <td className="py-3 px-3 font-sans text-indigo-300">{v.hostPerson}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{v.purpose}</td>
                      <td className="py-3 px-3 text-slate-400">{v.checkInTime}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {v.safetyInduction}
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

      {/* TAB 2: GATE PASS */}
      {activeTab === 'gate_pass' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Surat Izin Keluar Masuk Kendaraan & Barang (Gate Pass System)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Gate Pass</th>
                    <th className="py-2.5 px-3">Tipe Izin Gate</th>
                    <th className="py-2.5 px-3">Driver & Plat Nomor Kendaraan</th>
                    <th className="py-2.5 px-3">Rincian Muatan / Cargo</th>
                    <th className="py-2.5 px-3">Tujuan</th>
                    <th className="py-2.5 px-3">Status Gate Clearance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {gatePassList.map((g) => (
                    <tr key={g.passNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{g.passNo}</td>
                      <td className="py-3 px-3 font-sans font-bold text-amber-300">{g.passType}</td>
                      <td className="py-3 px-3 font-sans text-slate-100">
                        <strong className="block">{g.driverName}</strong>
                        <span className="text-[10px] font-mono text-slate-400">{g.vehiclePlate} ({g.vehicleType})</span>
                      </td>
                      <td className="py-3 px-3 font-sans text-slate-300">{g.cargoDetail}</td>
                      <td className="py-3 px-3 font-sans text-slate-400">{g.destination}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {g.clearanceStatus}
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

      {/* TAB 3: CCTV LIVE FEEDS */}
      {activeTab === 'cctv_monitoring' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemantauan Kamera CCTV Live Streaming AI Detection Center
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cctvFeeds.map((cam) => (
                <div key={cam.camId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-indigo-400">{cam.camId}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{cam.status}</span>
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{cam.name}</strong>

                  <div className="p-8 bg-slate-900 rounded-lg border border-slate-800/80 text-center space-y-2">
                    <Video className="w-8 h-8 text-indigo-400 mx-auto opacity-70" />
                    <span className="text-slate-400 text-[11px] block font-mono">Live Video Feed • Resolution: {cam.resolution}</span>
                    <span className="text-indigo-300 text-[10px] font-mono font-bold bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800 inline-block">
                      AI Module: {cam.aiDetection}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY PATROL */}
      {activeTab === 'security_patrol' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Jadwal Ronda Patroli Security, Scan QR Checkpoint & Laporan Guard
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Patrol ID</th>
                    <th className="py-2.5 px-3">Rute Patroli Security</th>
                    <th className="py-2.5 px-3">Komandan Regu (Danru)</th>
                    <th className="py-2.5 px-3">Waktu Mulai - Selesai</th>
                    <th className="py-2.5 px-3">Scan QR Checkpoint</th>
                    <th className="py-2.5 px-3">Status Ronda</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {patrolCheckpoints.map((p) => (
                    <tr key={p.patrolId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{p.patrolId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{p.patrolRoute}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{p.guardName}</td>
                      <td className="py-3 px-3 text-slate-400">{p.startTime} - {p.endTime}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{p.qrScannedPoints}</td>
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

      {/* TAB 5: SECURITY INCIDENTS */}
      {activeTab === 'security_incidents' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Laporan Insiden Keamanan, Gangguan Ketertiban & Percobaan Pencurian
            </h3>

            <div className="space-y-3">
              {securityIncidents.map((sec) => (
                <div key={sec.incNo} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-rose-400">{sec.incNo}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {sec.status}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{sec.category}</strong>
                  <p className="text-slate-300 leading-relaxed">{sec.description}</p>
                  <span className="text-slate-500 text-[10px] block font-mono">Waktu: {sec.incidentDate} • Lokasi: {sec.location}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: BLACKLIST REGISTRY */}
      {activeTab === 'blacklist_registry' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Daftar Hitam Personel & Kendaraan Dilarang Masuk Area Tambang (Blacklist)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Entry ID</th>
                    <th className="py-2.5 px-3">Kategori Subjek</th>
                    <th className="py-2.5 px-3">Nama Personel / Plat Kendaraan</th>
                    <th className="py-2.5 px-3">Alasan Penolakan (Blacklist Cause)</th>
                    <th className="py-2.5 px-3">Tanggal Ditetapkan</th>
                    <th className="py-2.5 px-3">Status Alert Gate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {blacklistRegistry.map((b) => (
                    <tr key={b.entryId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-rose-400">{b.entryId}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{b.subjectType}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{b.subjectName}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{b.reason}</td>
                      <td className="py-3 px-3 text-slate-400">{b.blacklistedDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-rose-500/20 text-rose-300">
                          {b.alertLevel}
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

      {/* TAB 7: ACCESS CONTROL RFID */}
      {activeTab === 'access_control' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Log Real-Time Akses Kontrol Turnstile & RFID Smart Card Readers
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Card RFID ID</th>
                    <th className="py-2.5 px-3">Pemegang Kartu / Personel</th>
                    <th className="py-2.5 px-3">Zona Pintu Akses</th>
                    <th className="py-2.5 px-3">Waktu Tapping</th>
                    <th className="py-2.5 px-3">Hasil Akses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {accessControlLogs.map((a, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{a.cardId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{a.holderName}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{a.zoneName}</td>
                      <td className="py-3 px-3 text-slate-400">{a.timeStamp}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          a.result.includes('GRANTED') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-300'
                        }`}>
                          {a.result}
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

    </div>
  );
};
