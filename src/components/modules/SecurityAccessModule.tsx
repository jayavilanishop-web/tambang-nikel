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
  Maximize2,
  Shield,
  Globe,
  Zap,
  Database,
  HardDrive,
  RotateCcw,
  ShieldAlert,
  Terminal,
  Activity,
  Cpu,
  FileCheck,
  Layers,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { Language } from '../../types';

interface SecurityAccessModuleProps {
  language: Language;
}

export const SecurityAccessModule: React.FC<SecurityAccessModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'cyber_security'
    | 'auth_jwt_oauth'
    | 'threat_protection'
    | 'audit_trail'
    | 'disaster_recovery'
    | 'visitor_management'
    | 'gate_pass'
    | 'cctv_monitoring'
    | 'security_patrol'
    | 'security_incidents'
    | 'blacklist_registry'
    | 'access_control'
    | 'master_data_security'
  >('cyber_security');

  // MASTER DATA SECURITY DATASETS & SUB-TAB STATE
  const [masterSecuritySubTab, setMasterSecuritySubTab] = useState<'POS_JAGA' | 'PERSONEL_PAM' | 'INVENTARIS_ALPAL' | 'HARDWARE_CCTV'>('POS_JAGA');
  const [masterSecuritySearch, setMasterSecuritySearch] = useState('');

  // Master Pos Jaga & Gate
  const [masterPosJagaList, setMasterPosJagaList] = useState([
    { posId: 'POS-01', name: 'Pos Utama Gate 01', location: 'Pintu Masuk Site KM 0', gateType: 'Boom Barrier + ANPR + RFID', guardsOnDuty: 6, status: 'OPERATIONAL_ACTIVE' },
    { posId: 'POS-02', name: 'Pos Gate Jetty Port', location: 'Pelabuhan Barging Jetty', gateType: 'Turnstile RFID + Metal Detector', guardsOnDuty: 4, status: 'OPERATIONAL_ACTIVE' },
    { posId: 'POS-03', name: 'Pos Pit Alpha', location: 'Ramp Entrance Pit Alpha', gateType: 'Boom Barrier Manual & CCTV PTZ', guardsOnDuty: 3, status: 'OPERATIONAL_ACTIVE' },
    { posId: 'POS-04', name: 'Pos Workshop & Heavy Equipment', location: 'Workshop Tambang Central', gateType: 'Turnstile Card + Guard Booth', guardsOnDuty: 3, status: 'OPERATIONAL_ACTIVE' },
    { posId: 'POS-05', name: 'Pos Mess & Field Camp', location: 'Mess Karyawan & Executive Clinic', gateType: 'Security Gate + RFID Scanner', guardsOnDuty: 2, status: 'OPERATIONAL_ACTIVE' }
  ]);

  // Master Personel Security & PAM TNI/POLRI
  const [masterPersonelPamList, setMasterPersonelPamList] = useState([
    { nik: 'SEC-1001', name: 'Sertu Dani Prasetyo', category: 'PAM TNI AD Obvitnas', qualification: 'Gada Madya', sioNo: 'SIO-POLRI-2025/9921', posAssignment: 'Pos Utama Gate 01', status: 'ON_DUTY_SHIFT' },
    { nik: 'SEC-1002', name: 'Aipda Hendra Kurniawan', category: 'PAM POLRI Brimob', qualification: 'Gada Utama', sioNo: 'SIO-POLRI-2024/8812', posAssignment: 'Pos Gate Jetty Port', status: 'ON_DUTY_SHIFT' },
    { nik: 'SEC-1003', name: 'Rudi Santoso', category: 'Satpam Internal Site', qualification: 'Gada Pratama', sioNo: 'SIO-POLRI-2025/1102', posAssignment: 'Pos Utama Gate 01', status: 'ON_DUTY_SHIFT' },
    { nik: 'SEC-1004', name: 'Bambang Irawan', category: 'Satpam Contractor PAM', qualification: 'Gada Pratama', sioNo: 'SIO-POLRI-2025/3342', posAssignment: 'Pos Pit Alpha', status: 'OFF_DUTY_ROSTER' }
  ]);

  // Master Inventaris Alpal Security
  const [masterAlpalList, setMasterAlpalList] = useState([
    { assetId: 'ALP-001', name: 'Motorola Digital Radio HT DP4801e', category: 'Komunikasi Radio', condition: 'SANGAT_BAIK', location: 'Pos Utama Gate 01' },
    { assetId: 'ALP-002', name: 'Rompi Anti Peluru Tactically Level IIIA', category: 'Proteksi Perorangan', condition: 'SANGAT_BAIK', location: 'Pos Gate Jetty Port' },
    { assetId: 'ALP-003', name: 'Handheld Metal Detector Garrett SuperScanner', category: 'Inspeksi Gate', condition: 'SANGAT_BAIK', location: 'Pos Utama Gate 01' },
    { assetId: 'ALP-004', name: 'Mobil Patroli Ford Ranger 4x4 Double Cabin', category: 'Kendaraan Patroli', condition: 'SANGAT_BAIK', location: 'Patroli Unit 1' },
    { assetId: 'ALP-005', name: 'Senter LED High Lumens Tactical 10,000 LM', category: 'Penerangan Ronda', condition: 'SANGAT_BAIK', location: 'Pos Workshop' }
  ]);

  // Master Hardware CCTV & Gate Barriers
  const [masterCctvList, setMasterCctvList] = useState([
    { devId: 'HW-CCTV-01', name: 'Kamera Hikvision 4K PTZ Thermal AI', ipAddress: '10.200.12.101', area: 'Gate 01 Main Perimeter', aiFeature: 'ANPR + Thermal Intrusion', streamStatus: 'ONLINE_ACTIVE' },
    { devId: 'HW-CCTV-02', name: 'Kamera Bullet ANPR Speed Dome', ipAddress: '10.200.12.102', area: 'Jetty Port Weighbridge', aiFeature: 'ANPR License Plate 99% Acc', streamStatus: 'ONLINE_ACTIVE' },
    { devId: 'HW-GATE-01', name: 'Automatic Heavy Duty Boom Barrier Gate', ipAddress: '10.200.12.201', area: 'Gate 01 Entrance Portal', aiFeature: 'Automatic License Trigger', streamStatus: 'ONLINE_ACTIVE' },
    { devId: 'HW-TURNSTILE-01', name: 'Tripod Turnstile Gate RFID Reader', ipAddress: '10.200.12.202', area: 'Mess & Office Turnstile', aiFeature: 'RFID Card + Face Match', streamStatus: 'ONLINE_ACTIVE' }
  ]);

  // CYBER SECURITY & AES-256 ENCRYPTION DATASET
  const [encryptionStatus] = useState({
    databaseEncryption: 'AES-256-GCM (Hardware Accelerated KMS)',
    fileStorageEncryption: 'AES-256 Envelope Encryption',
    transitEncryption: 'TLS 1.3 (ECDHE-RSA-AES256-GCM-SHA384)',
    sslCertificateStatus: 'VALID (DigiCert Wildcard SSL - Expires in 280 Days)',
    hstsEnabled: true,
    keyRotationPolicy: 'Automatic 90-Day Rotation'
  });

  // JWT & OAUTH2 CONFIGURATION DATASET
  const [jwtOauthConfig, setJwtOauthConfig] = useState({
    jwtAlgorithm: 'RS256 (RSA Public/Private Keypair)',
    jwtExpiryMinutes: 15,
    refreshTokenRotation: true,
    oauthProviders: [
      { id: 'GOOGLE', name: 'Google Workspace SSO', domain: 'smartmine.co.id', status: 'CONNECTED_ACTIVE' },
      { id: 'MICROSOFT', name: 'Microsoft Entra ID (Azure AD)', domain: 'mining-holding.com', status: 'CONNECTED_ACTIVE' },
      { id: 'OKTA', name: 'Okta Enterprise IdP', domain: 'sso.smartmine.io', status: 'STANDBY_READY' }
    ]
  });

  // RBAC MATRIX DATASET
  const [rbacMatrix, setRbacMatrix] = useState([
    { role: 'System Super Admin', read: true, write: true, approve: true, delete: true, audit: true },
    { role: 'Kepala Teknik Tambang (KTT)', read: true, write: true, approve: true, delete: false, audit: true },
    { role: 'Mine Operations Manager', read: true, write: true, approve: true, delete: false, audit: false },
    { role: 'Chief Geologist', read: true, write: true, approve: false, delete: false, audit: false },
    { role: 'Safety & HSE Inspector', read: true, write: true, approve: true, delete: false, audit: true },
    { role: 'Weighbridge Gate Operator', read: true, write: true, approve: false, delete: false, audit: false }
  ]);

  // THREAT PROTECTION & WAF DATASET (XSS, CSRF, SQL Injection, Rate Limit)
  const [threatProtection, setThreatProtection] = useState({
    rateLimitRequestsPerMin: 100,
    rateLimitAlgorithm: 'Token Bucket & Leaky Bucket Hybrid',
    rateLimitBlockedToday: 42,
    xssProtectionEnabled: true,
    xssPolicy: 'Strict Content-Security-Policy (CSP) + DOMPurify Sanitization',
    csrfProtectionEnabled: true,
    csrfMethod: 'SameSite=Strict Cookies + Anti-CSRF Synchronizer Token',
    sqlInjectionProtectionEnabled: true,
    sqlInjectionEngine: 'ORM Parameterized Queries + WAF Regex Inspection',
    blockedSqlInjectionAttemptsToday: 8
  });

  // AUDIT TRAIL DATASET
  const [auditTrailLogs] = useState([
    { eventId: 'AUD-88120', timestamp: '2026-08-03 12:45:10', actor: 'Ir. Bambang Wijaya (KTT)', action: 'UPDATE_RKAB_TARGET', module: 'RKAB Generator', ip: '180.252.12.98', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { eventId: 'AUD-88121', timestamp: '2026-08-03 11:30:22', actor: 'Dewi Rahma (Geologist)', action: 'APPROVE_ORE_ASSAY', module: 'Pit Exploration', ip: '180.252.12.102', hash: '5feceb66ffc86f38d952786c6d696c79c2dbc239dd4e91b46729d73a27fb57e9' },
    { eventId: 'AUD-88122', timestamp: '2026-08-03 10:15:05', actor: 'Ahmad (Weighbridge)', action: 'MODIFY_TRUCK_TARE_WEIGHT', module: 'Weighbridge Gate', ip: '10.8.0.44', hash: '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b' }
  ]);

  // BACKUP & DISASTER RECOVERY DATASET
  const [backupDrConfig, setBackupDrConfig] = useState({
    backupFrequency: 'Hourly Incremental + Daily Full Snapshot',
    backupStorage: 'AWS S3 Glacier Multi-Region Vault + GCP Cloud Storage',
    lastSuccessfulBackup: '2026-08-03 12:00:00 (Size: 1.42 GB)',
    rpoTarget: '5 Menit (Recovery Point Objective)',
    rtoTarget: '15 Menit (Recovery Time Objective)',
    drClusterStatus: 'ACTIVE_HOT_STANDBY (Jakarta & Singapore Multi-AZ)',
    lastDrDrillDate: '2026-07-15 (Passed - Failover Time: 4.2 Min)'
  });

  // Visitor Management Dataset
  const [visitorsList, setVisitorsList] = useState([
    { badgeNo: 'VIS-2026-081', visitorName: 'Rudi Hermawan', company: 'PT Sucofindo Surveyor', hostPerson: 'Mine Geologist Lead', purpose: 'Pengambilan Sampel Check Ore Assay', checkInTime: '2026-08-03 08:15', status: 'ON_SITE_ACTIVE', safetyInduction: 'PASSED' },
    { badgeNo: 'VIS-2026-082', visitorName: 'Tim Inspektur ESDM KESDM', company: 'Direktorat Teknik Tambang', hostPerson: 'KTT Ir. Bambang Wijaya', purpose: 'Inspeksi K3LH & Audit RKAB', checkInTime: '2026-08-03 09:00', status: 'ON_SITE_ACTIVE', safetyInduction: 'PASSED' }
  ]);

  // Gate Pass Dataset (Material & Heavy Vehicle Clearance)
  const [gatePassList, setGatePassList] = useState([
    { passNo: 'GP-2026-0412', passType: 'MATERIAL_OUTBOUND', driverName: 'Sulaeman', vehiclePlate: 'B 9412 UT', vehicleType: 'Volvo FMX Dump Truck', cargoDetail: 'Sparepart Engine CAT 3512 Bekas Rebuilt', destination: 'Jakarta Central Workshop', clearanceStatus: 'APPROVED_GATE_PASSED', verifiedBy: 'Pos Gate 1 (Bambang)' },
    { passNo: 'GP-2026-0413', passType: 'VEHICLE_INBOUND', driverName: 'Jaka', vehiclePlate: 'KT 8812 FB', vehicleType: 'Fuel Tanker B35 Pertamina (20KL)', cargoDetail: 'High Speed Diesel B35 Fuel Supply', destination: 'Main Fuel Storage Station', clearanceStatus: 'INSPECTION_OK_PASSED', verifiedBy: 'Pos Gate 1 (Bambang)' }
  ]);

  // CCTV Cameras Feed Monitoring Dataset
  const [cctvFeeds] = useState([
    { camId: 'CAM-GATE-01', name: 'Kamera Pos Utama Main Gate 1 (LPR License Plate AI)', area: 'Main Portal Gate Entry', resolution: '4K Ultra HD 60fps', status: 'LIVE_STREAMING', aiDetection: 'LPR_LICENSE_PLATE_AUTO' },
    { camId: 'CAM-JETTY-02', name: 'Kamera Jetty Pier Barging Pier A (Thermal IR)', area: 'Jetty Port Berth 1', resolution: '1080p Thermal Night Vision', status: 'LIVE_STREAMING', aiDetection: 'PERIMETER_INTRUSION_OFF' },
    { camId: 'CAM-FUEL-03', name: 'Kamera Tangki Induk BBM Diesel Storage (ATEX Explosive Proof)', area: 'Fuel Farm Depot', resolution: '4K Ultra HD', status: 'LIVE_STREAMING', aiDetection: 'SMOKE_FLAME_AI_ACTIVE' },
    { camId: 'CAM-EXPLOSIVE-04', name: 'Kamera Gudang Handak Peledakan (ANFO Bunker)', area: 'Explosive Magazine Security Zone', resolution: '4K Night Vision', status: 'LIVE_STREAMING', aiDetection: 'MOTION_DETECTION_ARMED' }
  ]);

  // Security Patrol & Checkpoint Logs
  const [patrolCheckpoints, setPatrolCheckpoints] = useState([
    { patrolId: 'PTR-2026-881', patrolRoute: 'Ronda Shift Malam - Perbatasan Area Tambang Pit Alpha & Land Boundary', guardName: 'Danru Supriatna + 2 Personel', startTime: '2026-08-03 02:00', endTime: '2026-08-03 04:30', qrScannedPoints: '12 / 12 Points', status: 'PATROL_COMPLETED_NORMAL' },
    { patrolId: 'PTR-2026-882', patrolRoute: 'Ronda Patroli Dermaga Jetty & Stockpile Rom Area', guardName: 'Regu Bravo Security', startTime: '2026-08-03 06:00', endTime: '2026-08-03 08:00', qrScannedPoints: '8 / 8 Points', status: 'PATROL_COMPLETED_NORMAL' }
  ]);

  // Security Incidents & Theft Attempt Logs
  const [securityIncidents, setSecurityIncidents] = useState([
    { incNo: 'SEC-2026-012', incidentDate: '2026-07-28 23:45', location: 'Stockpile Ore Yard Segment B', category: 'PERIMETER_INTRUSION_ATTEMPT', description: 'Terdeteksi 2 orang tanpa identitas mendekati pagar perbatasan. Dihadang tim patroli & diserahkan ke Polsek setempat.', severity: 'MEDIUM', status: 'CLOSED_POLICE_HANDLED' }
  ]);

  // Blacklist Registry (Personnel & Vehicles)
  const [blacklistRegistry, setBlacklistRegistry] = useState([
    { entryId: 'BLK-2025-004', subjectName: 'Herman (Ex-Subkon)', subjectType: 'PERSONNEL', nationalId: '7302192001192', reason: 'Tindakan Pelanggaran Berat K3 & Pencurian Kabel Tembaga', blacklistedDate: '2025-11-10', alertLevel: 'BLOCK_ALL_GATES' },
    { entryId: 'BLK-2026-001', subjectName: 'Dump Truck KT 7712 AA', subjectType: 'VEHICLE', licensePlate: 'KT 7712 AA', reason: 'Surat Uji Kir Kadaluarsa & SIMPER Driver Dicabut', blacklistedDate: '2026-02-14', alertLevel: 'BLOCK_GATE_ENTRY' }
  ]);

  // Access Control & RFID Turnstile Systems
  const [accessControlLogs] = useState([
    { cardId: 'RFID-884120', holderName: 'Eko Prasetyo', zoneName: 'Zone 1 - Pit Alpha Heavy Equipment Zone', timeStamp: '2026-08-03 06:45:12', result: 'ACCESS_GRANTED' },
    { cardId: 'RFID-112049', holderName: 'Unidentified Tag', zoneName: 'Zone 4 - Magazine Handak Explosive Bunker', timeStamp: '2026-08-03 07:12:05', result: 'ACCESS_DENIED_ALERT' }
  ]);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [activeModal, setActiveModal] = useState<'VISITOR' | 'GATE_PASS' | 'INCIDENT' | 'BLACKLIST' | 'CCTV_VIEW' | null>(null);
  const [selectedCam, setSelectedCam] = useState<any>(null);

  // Form States
  const [visitorForm, setVisitorForm] = useState({ name: '', company: '', host: '', purpose: '', safetyInduction: 'PASSED' });
  const [gatePassForm, setGatePassForm] = useState({ passType: 'MATERIAL_OUTBOUND', driver: '', plate: '', vehicleType: 'Dump Truck', cargo: '', destination: '' });
  const [incidentForm, setIncidentForm] = useState({ category: 'INTRUSION_ATTEMPT', location: 'Main Gate 1', severity: 'HIGH', description: '' });
  const [blacklistForm, setBlacklistForm] = useState({ subjectType: 'PERSONNEL', name: '', idOrPlate: '', reason: '' });

  // Add Visitor
  const handleAddVisitor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorForm.name) return;
    const newV = {
      badgeNo: `VIS-2026-${Math.floor(100 + Math.random() * 900)}`,
      visitorName: visitorForm.name,
      company: visitorForm.company || 'Tamu External',
      hostPerson: visitorForm.host || 'Kepala Pos Security',
      purpose: visitorForm.purpose || 'Kunjungan Site',
      checkInTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'ON_SITE_ACTIVE',
      safetyInduction: visitorForm.safetyInduction
    };
    setVisitorsList(prev => [newV, ...prev]);
    setVisitorForm({ name: '', company: '', host: '', purpose: '', safetyInduction: 'PASSED' });
    setActiveModal(null);
  };

  // Add Gate Pass
  const handleAddGatePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatePassForm.driver || !gatePassForm.plate) return;
    const newGP = {
      passNo: `GP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      passType: gatePassForm.passType,
      driverName: gatePassForm.driver,
      vehiclePlate: gatePassForm.plate,
      vehicleType: gatePassForm.vehicleType,
      cargoDetail: gatePassForm.cargo || 'Pemeriksaan Rutin Gate Clearance',
      destination: gatePassForm.destination || 'Site Warehouse',
      clearanceStatus: 'INSPECTION_OK_PASSED',
      verifiedBy: 'Pos Gate Utama'
    };
    setGatePassList(prev => [newGP, ...prev]);
    setGatePassForm({ passType: 'MATERIAL_OUTBOUND', driver: '', plate: '', vehicleType: 'Dump Truck', cargo: '', destination: '' });
    setActiveModal(null);
  };

  // Add Security Incident
  const handleAddIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incidentForm.description) return;
    const newInc = {
      incNo: `SEC-2026-${Math.floor(100 + Math.random() * 900)}`,
      incidentDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      location: incidentForm.location,
      category: incidentForm.category,
      description: incidentForm.description,
      severity: incidentForm.severity,
      status: 'OPEN_PATROL_INVESTIGATING'
    };
    setSecurityIncidents(prev => [newInc, ...prev]);
    setIncidentForm({ category: 'INTRUSION_ATTEMPT', location: 'Main Gate 1', severity: 'HIGH', description: '' });
    setActiveModal(null);
  };

  // Add Blacklist
  const handleAddBlacklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blacklistForm.name) return;
    const newBlk = {
      entryId: `BLK-2026-${Math.floor(100 + Math.random() * 900)}`,
      subjectName: blacklistForm.name,
      subjectType: blacklistForm.subjectType,
      nationalId: blacklistForm.idOrPlate,
      reason: blacklistForm.reason || 'Pelanggaran Aturan K3LH / Keamanan Tambang',
      blacklistedDate: new Date().toISOString().substring(0, 10),
      alertLevel: 'BLOCK_ALL_GATES'
    };
    setBlacklistRegistry(prev => [newBlk, ...prev]);
    setBlacklistForm({ subjectType: 'PERSONNEL', name: '', idOrPlate: '', reason: '' });
    setActiveModal(null);
  };

  // Scan Checkpoint Patrol
  const handleScanCheckpoint = () => {
    const newP = {
      patrolId: `PTR-2026-${Math.floor(100 + Math.random() * 900)}`,
      patrolRoute: 'Patroli QR Instant Checkpoint - Sektor Gudang & Fuel Farm',
      guardName: 'Petugas Security Shift Aktif',
      startTime: new Date().toISOString().replace('T', ' ').substring(0, 16),
      endTime: 'In Progress',
      qrScannedPoints: '1 / 1 Point Verified',
      status: 'PATROL_COMPLETED_NORMAL'
    };
    setPatrolCheckpoints(prev => [newP, ...prev]);
    alert('✓ Scan QR Checkpoint Patroli Berhasil Dilakukan!');
  };

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

      {/* Module Navigation Tabs covering all Security & Cyber Protection keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'cyber_security', label: 'Enkripsi Data (AES-256 & SSL)', icon: Lock },
          { id: 'auth_jwt_oauth', label: 'Autentikasi (JWT, OAuth2 & RBAC)', icon: Shield },
          { id: 'threat_protection', label: 'Proteksi WAF (XSS, CSRF, SQLi & Rate Limit)', icon: Zap },
          { id: 'audit_trail', label: 'Jejak Audit (Audit Trail)', icon: FileText },
          { id: 'disaster_recovery', label: 'Backup & Disaster Recovery', icon: HardDrive },
          { id: 'visitor_management', label: 'Buku Tamu (Visitor)', icon: UserCheck },
          { id: 'gate_pass', label: 'Izin Keluar Masuk (Gate Pass)', icon: Truck },
          { id: 'cctv_monitoring', label: 'CCTV Live AI Feeds', icon: Video },
          { id: 'security_patrol', label: 'Patroli Security & Ronda', icon: Radio },
          { id: 'security_incidents', label: 'Insiden Keamanan', icon: AlertTriangle },
          { id: 'blacklist_registry', label: 'Daftar Hitam (Blacklist)', icon: UserX },
          { id: 'access_control', label: 'Akses Kontrol RFID', icon: Key },
          { id: 'master_data_security', label: '🗄️ Master Data Security & Pos PAM', icon: Database }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-indigo-400' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: CYBER SECURITY & DATA ENCRYPTION (AES-256, DATA ENCRYPTION, SSL) */}
      {activeTab === 'cyber_security' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" /> Arsitektur Enkripsi Data Kriptografis (AES-256 Encryption & SSL/TLS)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Perlindungan data sensitif tambang (RKAB, Assay Ore, Finansial) di penyimpanan & transit</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                ENCRYPTION: AES-256 ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-mono block">ENKRIPSI DATABASE AT REST (DATA ENCRYPTION):</span>
                <strong className="text-emerald-400 font-mono text-sm block">{encryptionStatus.databaseEncryption}</strong>
                <p className="text-slate-400 text-[11px]">Seluruh tabel database terenkripsi dengan kunci AES 256-bit tingkat perangkat keras (FIPS 140-2 Level 3 HSM).</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-mono block">ENKRIPSI FILE AT REST (ENVELOPE ENCRYPTION):</span>
                <strong className="text-indigo-300 font-mono text-sm block">{encryptionStatus.fileStorageEncryption}</strong>
                <p className="text-slate-400 text-[11px]">Dokumen CAD, PDF RKAB, dan foto CCTV terenkripsi per-file menggunakan data key unik.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-mono block">ENKRIPSI TRANSIT IN-FLIGHT (SSL / TLS v1.3):</span>
                <strong className="text-cyan-400 font-mono text-sm block">{encryptionStatus.transitEncryption}</strong>
                <p className="text-slate-400 text-[11px]">Semua koneksi API dan lalu lintas web dienkripsi menggunakan TLS v1.3 dengan cipher suite modern.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-mono block">STATUS SERTIFIKAT SSL/TLS:</span>
                <strong className="text-emerald-400 font-mono text-sm block">{encryptionStatus.sslCertificateStatus}</strong>
                <p className="text-slate-400 text-[11px]">Sertifikat SSL Wildcard aktif dengan HTTP Strict Transport Security (HSTS) max-age 31536000.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: AUTHENTICATION, JWT, OAUTH2 & RBAC */}
      {activeTab === 'auth_jwt_oauth' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-400" /> Autentikasi JWT, OAuth2 Single Sign-On (SSO) & RBAC Matrix
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Manajemen token JWT RS256, integrasi OAuth2 Enterprise, & otorisasi berdasar peran (RBAC)</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                JWT RS256 + OAUTH2
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-mono block">ALGORITMA SIGNATURE JWT:</span>
                <strong className="text-indigo-300 font-mono text-sm block">{jwtOauthConfig.jwtAlgorithm}</strong>
                <p className="text-slate-400 text-[11px]">Masa berlaku token: <strong className="text-slate-100 font-mono">{jwtOauthConfig.jwtExpiryMinutes} Menit</strong> dengan Refresh Token Rotation.</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 col-span-2 space-y-2">
                <span className="text-slate-400 text-[10px] font-mono block">PENYEDIA IDENTITAS OAUTH2 SSO (ENTERPRISE IDP):</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {jwtOauthConfig.oauthProviders.map(p => (
                    <div key={p.id} className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <strong className="text-slate-100 block text-xs">{p.name}</strong>
                      <span className="text-slate-400 text-[10px] font-mono block">{p.domain}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold inline-block mt-1">{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RBAC Table */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-200 text-xs">Matriks Otorisasi Berbasis Peran (RBAC - Role-Based Access Control):</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">PERAN PERSONEL (RBAC ROLE)</th>
                      <th className="p-2.5 text-center">READ</th>
                      <th className="p-2.5 text-center">WRITE</th>
                      <th className="p-2.5 text-center">APPROVE</th>
                      <th className="p-2.5 text-center">DELETE</th>
                      <th className="p-2.5 text-center">AUDIT LOG</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {rbacMatrix.map((r, idx) => (
                      <tr key={idx} className="hover:bg-slate-950/50">
                        <td className="p-2.5 text-slate-100 font-bold">{r.role}</td>
                        <td className="p-2.5 text-center"><span className="text-emerald-400 font-bold">{r.read ? '✔' : '✘'}</span></td>
                        <td className="p-2.5 text-center"><span className="text-emerald-400 font-bold">{r.write ? '✔' : '✘'}</span></td>
                        <td className="p-2.5 text-center"><span className="text-indigo-400 font-bold">{r.approve ? '✔' : '✘'}</span></td>
                        <td className="p-2.5 text-center"><span className={r.delete ? 'text-emerald-400 font-bold' : 'text-slate-600'}>{r.delete ? '✔' : '✘'}</span></td>
                        <td className="p-2.5 text-center"><span className="text-amber-300 font-bold">{r.audit ? '✔' : '✘'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: THREAT PROTECTION & WAF (XSS, CSRF, SQL INJECTION, RATE LIMIT) */}
      {activeTab === 'threat_protection' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300" /> Web Application Firewall (WAF) & Proteksi Serangan Cyber
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Perlindungan berlapis terhadap XSS, CSRF, SQL Injection, & Pembatasan Akses Rate Limiting</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                WAF ENGINE: SHIELD ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-slate-300">
              {/* RATE LIMITING */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <strong className="text-amber-300 text-xs flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-amber-400" /> Rate Limiting API Protection
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">ENFORCED</span>
                </div>
                <p><strong className="text-slate-400">Batas Kuota:</strong> <span className="text-slate-100 font-mono font-bold">{threatProtection.rateLimitRequestsPerMin} Requests / Menit per IP</span></p>
                <p><strong className="text-slate-400">Algoritma Throttling:</strong> <span className="text-slate-300 font-mono">{threatProtection.rateLimitAlgorithm}</span></p>
                <p><strong className="text-slate-400">IP Diblokir Hari Ini:</strong> <span className="text-rose-400 font-mono font-bold">{threatProtection.rateLimitBlockedToday} Alamat IP</span></p>
              </div>

              {/* XSS PROTECTION */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <strong className="text-indigo-300 text-xs flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-indigo-400" /> XSS (Cross-Site Scripting) Protection
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">ACTIVE</span>
                </div>
                <p><strong className="text-slate-400">Kebijakan Keamanan CSP:</strong> <span className="text-slate-200 text-[11px]">{threatProtection.xssPolicy}</span></p>
                <p className="text-slate-400 text-[11px]">Sanitasi otomatis semua input string, stripping tag skrip berbahaya, dan penolakan eksekusi inline script.</p>
              </div>

              {/* CSRF PROTECTION */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <strong className="text-cyan-300 text-xs flex items-center gap-1.5">
                    <Lock className="w-4 h-4 text-cyan-400" /> CSRF (Cross-Site Request Forgery) Guard
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">PROTECTED</span>
                </div>
                <p><strong className="text-slate-400">Metode Verifikasi:</strong> <span className="text-slate-200 text-[11px]">{threatProtection.csrfMethod}</span></p>
                <p className="text-slate-400 text-[11px]">Setiap permintaan HTTP POST/PUT/DELETE wajib menyertakan token Anti-CSRF cryptographic nonce valid.</p>
              </div>

              {/* SQL INJECTION PROTECTION */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
                  <strong className="text-emerald-300 text-xs flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-emerald-400" /> SQL Injection Protection
                  </strong>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">HARDENED</span>
                </div>
                <p><strong className="text-slate-400">Engine Sanitasi Query:</strong> <span className="text-slate-200 text-[11px]">{threatProtection.sqlInjectionEngine}</span></p>
                <p><strong className="text-slate-400">Serangan SQLi Dicegah Hari Ini:</strong> <span className="text-emerald-400 font-mono font-bold">{threatProtection.blockedSqlInjectionAttemptsToday} Percobaan Neutralized</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: AUDIT TRAIL LOGS */}
      {activeTab === 'audit_trail' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-300" /> Jejak Audit Kriptografis (Cryptographic Audit Trail)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Catatan transaksi data tidak terbantahkan (immutable) dengan hash SHA-256 tamper-proof</p>
              </div>
              <button 
                onClick={() => alert('Log audit trail berhasil diekspor!')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" /> Ekspor Log Audit
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">EVENT ID</th>
                    <th className="p-2.5">WAKTU (STAMP)</th>
                    <th className="p-2.5">AKTOR / USER</th>
                    <th className="p-2.5">AKSI DIJALANKAN</th>
                    <th className="p-2.5">MODUL SISTEM</th>
                    <th className="p-2.5">CRYPTOGRAPHIC HASH (SHA-256)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {auditTrailLogs.map(log => (
                    <tr key={log.eventId} className="hover:bg-slate-950/50">
                      <td className="p-2.5 text-amber-300 font-bold">{log.eventId}</td>
                      <td className="p-2.5 text-slate-400">{log.timestamp}</td>
                      <td className="p-2.5 text-slate-100 font-bold font-sans">{log.actor}</td>
                      <td className="p-2.5 text-indigo-300 font-bold">{log.action}</td>
                      <td className="p-2.5 text-slate-300 font-sans">{log.module}</td>
                      <td className="p-2.5 text-emerald-400 text-[9px] truncate max-w-[180px] font-mono">{log.hash}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB: BACKUP & DISASTER RECOVERY */}
      {activeTab === 'disaster_recovery' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-400" /> Cadangan Data (Backup) & Disaster Recovery (DR Cluster)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Strategi keberlangsungan bisnis (Business Continuity) dengan target RPO 5 min & RTO 15 min</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                DR CLUSTER: HOT STANDBY READY
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-mono block">FREKUENSI CADANGAN DATA (BACKUP):</span>
                <strong className="text-emerald-400 font-mono text-sm block">{backupDrConfig.backupFrequency}</strong>
                <p className="text-slate-400 text-[11px]">Penyimpanan: <strong className="text-slate-200">{backupDrConfig.backupStorage}</strong></p>
                <p className="text-slate-400 text-[11px]">Backup Terakhir: <strong className="text-indigo-300 font-mono">{backupDrConfig.lastSuccessfulBackup}</strong></p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 text-[10px] font-mono block">METRIK DISASTER RECOVERY (RPO & RTO TARGET):</span>
                <div className="flex items-center gap-4 py-1">
                  <div>
                    <span className="text-slate-400 text-[10px] block">RPO Target:</span>
                    <strong className="text-amber-300 font-mono text-base block">{backupDrConfig.rpoTarget}</strong>
                  </div>
                  <div className="border-l border-slate-800 pl-4">
                    <span className="text-slate-400 text-[10px] block">RTO Target:</span>
                    <strong className="text-emerald-400 font-mono text-base block">{backupDrConfig.rtoTarget}</strong>
                  </div>
                </div>
                <p className="text-slate-400 text-[11px]">Status DR Cluster: <strong className="text-emerald-400 font-mono">{backupDrConfig.drClusterStatus}</strong></p>
                <p className="text-slate-400 text-[11px]">Simulasi DR Terakhir: <strong className="text-slate-200 font-mono">{backupDrConfig.lastDrDrillDate}</strong></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: VISITOR MANAGEMENT */}
      {activeTab === 'visitor_management' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Registrasi Tamu Site (Visitor Management & Badge Issuance)</h3>
              <button 
                onClick={() => setActiveModal('VISITOR')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
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
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Surat Izin Keluar Masuk Kendaraan & Barang (Gate Pass System)
              </h3>
              <button 
                onClick={() => setActiveModal('GATE_PASS')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Gate Pass Baru</span>
              </button>
            </div>

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

                  <div 
                    onClick={() => { setSelectedCam(cam); setActiveModal('CCTV_VIEW'); }}
                    className="p-8 bg-slate-900 hover:bg-slate-850 rounded-lg border border-slate-800/80 text-center space-y-2 cursor-pointer transition-all hover:border-indigo-500/50 group"
                  >
                    <Video className="w-8 h-8 text-indigo-400 mx-auto opacity-70 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-400 text-[11px] block font-mono">Klik Untuk Buka Feed Video Interaktif • {cam.resolution}</span>
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
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Jadwal Ronda Patroli Security, Scan QR Checkpoint & Laporan Guard
              </h3>
              <button 
                onClick={handleScanCheckpoint}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Simulasi Scan QR Checkpoint</span>
              </button>
            </div>

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
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Laporan Insiden Keamanan, Gangguan Ketertiban & Percobaan Pencurian
              </h3>
              <button 
                onClick={() => setActiveModal('INCIDENT')}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Laporkan Insiden Baru</span>
              </button>
            </div>

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
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Daftar Hitam Personel & Kendaraan Dilarang Masuk Area Tambang (Blacklist)
              </h3>
              <button 
                onClick={() => setActiveModal('BLACKLIST')}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Ke Blacklist</span>
              </button>
            </div>

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

      {/* MODAL DIALOGS */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                {activeModal === 'VISITOR' && 'Registrasi Visitor Baru'}
                {activeModal === 'GATE_PASS' && 'Buat Gate Pass Baru'}
                {activeModal === 'INCIDENT' && 'Laporkan Insiden Keamanan'}
                {activeModal === 'BLACKLIST' && 'Tambah Ke Daftar Hitam (Blacklist)'}
                {activeModal === 'CCTV_VIEW' && `Live Camera Feed: ${selectedCam?.name || 'CCTV'}`}
              </h3>
              <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>

            {/* VISITOR FORM */}
            {activeModal === 'VISITOR' && (
              <form onSubmit={handleAddVisitor} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Nama Visitor:</label>
                  <input type="text" required value={visitorForm.name} onChange={e => setVisitorForm({...visitorForm, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="Contoh: Ahmad Wijaya" />
                </div>
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Instansi / Perusahaan:</label>
                  <input type="text" value={visitorForm.company} onChange={e => setVisitorForm({...visitorForm, company: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="PT Sucofindo" />
                </div>
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Host Personel Penanggung Jawab:</label>
                  <input type="text" value={visitorForm.host} onChange={e => setVisitorForm({...visitorForm, host: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="Ir. Bambang (KTT)" />
                </div>
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Tujuan Kunjungan:</label>
                  <input type="text" value={visitorForm.purpose} onChange={e => setVisitorForm({...visitorForm, purpose: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="Inspeksi K3LH" />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300">Batal</button>
                  <button type="submit" className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold">Simpan Visitor</button>
                </div>
              </form>
            )}

            {/* GATE PASS FORM */}
            {activeModal === 'GATE_PASS' && (
              <form onSubmit={handleAddGatePass} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Nama Driver:</label>
                  <input type="text" required value={gatePassForm.driver} onChange={e => setGatePassForm({...gatePassForm, driver: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="Contoh: Budi Prasetyo" />
                </div>
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Plat Nomor Kendaraan:</label>
                  <input type="text" required value={gatePassForm.plate} onChange={e => setGatePassForm({...gatePassForm, plate: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="KT 8492 FC" />
                </div>
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Rincian Muatan Cargo:</label>
                  <input type="text" value={gatePassForm.cargo} onChange={e => setGatePassForm({...gatePassForm, cargo: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="Muatan Fuel B35 / Sparepart" />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300">Batal</button>
                  <button type="submit" className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold">Terbitkan Gate Pass</button>
                </div>
              </form>
            )}

            {/* INCIDENT FORM */}
            {activeModal === 'INCIDENT' && (
              <form onSubmit={handleAddIncident} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Lokasi Kejadiaan:</label>
                  <input type="text" required value={incidentForm.location} onChange={e => setIncidentForm({...incidentForm, location: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="Stockpile B / Main Gate" />
                </div>
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Deskripsi Kejadian / Rincian:</label>
                  <textarea required value={incidentForm.description} onChange={e => setIncidentForm({...incidentForm, description: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" rows={3} placeholder="Penjelasan kronologi singkat..."></textarea>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300">Batal</button>
                  <button type="submit" className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 rounded-lg text-white font-bold">Laporkan Insiden</button>
                </div>
              </form>
            )}

            {/* BLACKLIST FORM */}
            {activeModal === 'BLACKLIST' && (
              <form onSubmit={handleAddBlacklist} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Nama Subjek / Plat No:</label>
                  <input type="text" required value={blacklistForm.name} onChange={e => setBlacklistForm({...blacklistForm, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" placeholder="Nama Personel / Plat Truck" />
                </div>
                <div>
                  <label className="text-slate-300 block font-bold mb-1">Alasan Blacklist:</label>
                  <textarea required value={blacklistForm.reason} onChange={e => setBlacklistForm({...blacklistForm, reason: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-100" rows={2} placeholder="Sebab pelanggaran berat..."></textarea>
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-3 py-1.5 bg-slate-800 rounded-lg text-slate-300">Batal</button>
                  <button type="submit" className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 rounded-lg text-white font-bold">Blacklist Sekarang</button>
                </div>
              </form>
            )}

            {/* CCTV VIEW MODAL */}
            {activeModal === 'CCTV_VIEW' && selectedCam && (
              <div className="space-y-3 text-xs">
                <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
                  <div className="relative aspect-video bg-black rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                    <Video className="w-12 h-12 text-indigo-400 animate-pulse" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[9px] font-bold">REC ● LIVE</span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-emerald-400 font-mono text-[9px]">AI Detection: {selectedCam.aiDetection}</span>
                  </div>
                  <p className="text-slate-400 font-mono">Area Zone: {selectedCam.area} • Resolution: {selectedCam.resolution}</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <button onClick={() => alert('Snapshot gambar CCTV berhasil disimpan!')} className="px-3 py-1.5 bg-indigo-600 text-white font-bold rounded-lg">Ambil Snapshot Image</button>
                  <button onClick={() => setActiveModal(null)} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg font-bold">Tutup Stream</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB MASTER DATA SECURITY & POS PAM */}
      {activeTab === 'master_data_security' && (
        <div className="space-y-6">
          {/* Sub-Header Banner */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Master Data Pengamanan Site Tambang
                </span>
                <span className="text-slate-400 text-xs">• Sesuai SMP Kapolri No. 24/2007 & Perpol No. 4/2020</span>
              </div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-indigo-400" />
                Master Data Pos Jaga, Personel PAM, Inventaris & Hardware CCTV
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Pusat pendaftaran dan manajemen master data pos penjagaan gate, anggota Satpam & PAM TNI/POLRI, alpal perlengkapan taktis, serta sensor hardware CCTV AI.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (masterSecuritySubTab === 'POS_JAGA') {
                    const newPos = { posId: `POS-0${masterPosJagaList.length + 1}`, name: 'Pos Gate Baru', location: 'KM Pit East', gateType: 'Boom Barrier', guardsOnDuty: 2, status: 'OPERATIONAL_ACTIVE' };
                    setMasterPosJagaList([...masterPosJagaList, newPos]);
                    alert("Master Pos Jaga baru berhasil ditambahkan!");
                  } else if (masterSecuritySubTab === 'PERSONEL_PAM') {
                    const newPersonel = { nik: `SEC-${1000 + masterPersonelPamList.length + 1}`, name: 'Personel Baru PAM', category: 'Satpam Internal Site', qualification: 'Gada Pratama', sioNo: 'SIO-POLRI-2026/0011', posAssignment: 'Pos Utama Gate 01', status: 'ON_DUTY_SHIFT' };
                    setMasterPersonelPamList([...masterPersonelPamList, newPersonel]);
                    alert("Master Personel PAM Satpam baru berhasil mendaftar!");
                  } else if (masterSecuritySubTab === 'INVENTARIS_ALPAL') {
                    const newAlpal = { assetId: `ALP-00${masterAlpalList.length + 1}`, name: 'Alpal Peralatan Baru', category: 'Proteksi Site', condition: 'SANGAT_BAIK', location: 'Pos Utama Gate 01' };
                    setMasterAlpalList([...masterAlpalList, newAlpal]);
                    alert("Master Inventaris Peralatan PAM baru berhasil dicatat!");
                  } else {
                    const newHardware = { devId: `HW-CCTV-0${masterCctvList.length + 1}`, name: 'Kamera CCTV AI Baru', ipAddress: `10.200.12.${100 + masterCctvList.length + 1}`, area: 'Perimeter East', aiFeature: 'ANPR License Detect', streamStatus: 'ONLINE_ACTIVE' };
                    setMasterCctvList([...masterCctvList, newHardware]);
                    alert("Master Perangkat Hardware CCTV / Gate baru berhasil dipasangkan!");
                  }
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md shrink-0"
              >
                <Plus className="w-4 h-4" />
                Tambah Data Master Security
              </button>
            </div>
          </div>

          {/* Master Sub-Tabs Selector */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'POS_JAGA', label: '1. Master Pos Jaga & Gate Access', count: masterPosJagaList.length },
              { id: 'PERSONEL_PAM', label: '2. Master Personel Satpam & TNI/POLRI', count: masterPersonelPamList.length },
              { id: 'INVENTARIS_ALPAL', label: '3. Master Inventaris Peralatan PAM', count: masterAlpalList.length },
              { id: 'HARDWARE_CCTV', label: '4. Master Hardware CCTV AI & Gate', count: masterCctvList.length }
            ].map((sub) => (
              <button
                key={sub.id}
                onClick={() => setMasterSecuritySubTab(sub.id as any)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  masterSecuritySubTab === sub.id
                    ? 'bg-indigo-600 text-white shadow-lg ring-1 ring-indigo-400'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <span>{sub.label}</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-950 font-mono text-indigo-300 border border-slate-700">
                  {sub.count}
                </span>
              </button>
            ))}
          </div>

          {/* Sub-Tab 1: Master Pos Jaga */}
          {masterSecuritySubTab === 'POS_JAGA' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    Daftar Master Pos Penjagaan Gate & Barikade Akses
                  </h3>
                  <p className="text-[11px] text-slate-400">Master Data Pos Security Jaga, Gate Barrier, Turnstile RFID & Jumlah Guard Shift</p>
                </div>
                <input
                  type="text"
                  placeholder="Cari Pos Jaga..."
                  value={masterSecuritySearch}
                  onChange={(e) => setMasterSecuritySearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <th className="p-3">Pos ID</th>
                      <th className="p-3">Nama Pos Jaga</th>
                      <th className="p-3">Lokasi Site</th>
                      <th className="p-3">Tipe Gate / Barikade</th>
                      <th className="p-3">Guard Duty Shift</th>
                      <th className="p-3">Status Operasional</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    {masterPosJagaList
                      .filter(p => !masterSecuritySearch || p.name.toLowerCase().includes(masterSecuritySearch.toLowerCase()))
                      .map((pos, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-indigo-400">{pos.posId}</td>
                          <td className="p-3 text-white font-bold font-sans">{pos.name}</td>
                          <td className="p-3 text-slate-300 font-sans">{pos.location}</td>
                          <td className="p-3 font-sans text-emerald-400 font-bold">{pos.gateType}</td>
                          <td className="p-3 text-slate-300">{pos.guardsOnDuty} Personel Guard</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ✓ {pos.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button onClick={() => alert(`Mengedit Master Pos ${pos.name}`)} className="text-indigo-400 hover:underline font-bold text-[11px]">Edit Master</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Master Personel PAM */}
          {masterSecuritySubTab === 'PERSONEL_PAM' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    Daftar Master Personel Security, Satpam & PAM TNI/POLRI Obvitnas
                  </h3>
                  <p className="text-[11px] text-slate-400">Database Lisensi Gada Pratama/Madya, SIO Polri, serta Pos Tugas Anggota PAM</p>
                </div>
                <input
                  type="text"
                  placeholder="Cari NIK / Nama Anggota..."
                  value={masterSecuritySearch}
                  onChange={(e) => setMasterSecuritySearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <th className="p-3">NIK Security</th>
                      <th className="p-3">Nama Personel</th>
                      <th className="p-3">Kategori Instansi</th>
                      <th className="p-3">Kualifikasi Lisensi</th>
                      <th className="p-3">No. SIO Polri</th>
                      <th className="p-3">Pos Tugas</th>
                      <th className="p-3">Status Kesiapan</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    {masterPersonelPamList
                      .filter(p => !masterSecuritySearch || p.name.toLowerCase().includes(masterSecuritySearch.toLowerCase()))
                      .map((person, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-indigo-400">{person.nik}</td>
                          <td className="p-3 text-white font-bold font-sans">{person.name}</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {person.category}
                            </span>
                          </td>
                          <td className="p-3 text-amber-300 font-bold font-sans">{person.qualification}</td>
                          <td className="p-3 text-slate-400">{person.sioNo}</td>
                          <td className="p-3 text-slate-300 font-sans">{person.posAssignment}</td>
                          <td className="p-3 font-sans">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              person.status === 'ON_DUTY_SHIFT' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {person.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button onClick={() => alert(`Mengedit Master Personel ${person.name}`)} className="text-indigo-400 hover:underline font-bold text-[11px]">Edit Master</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Master Inventaris Alpal Security */}
          {masterSecuritySubTab === 'INVENTARIS_ALPAL' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-sky-400" />
                    Daftar Master Inventaris Peralatan PAM / Alpal Security
                  </h3>
                  <p className="text-[11px] text-slate-400">Master Aset Radio HT, Rompi Anti Peluru, Senter Tactical, Vehicle Patroli & Borgol</p>
                </div>
                <input
                  type="text"
                  placeholder="Cari Alat PAM / Kode..."
                  value={masterSecuritySearch}
                  onChange={(e) => setMasterSecuritySearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <th className="p-3">Kode Aset</th>
                      <th className="p-3">Nama Peralatan Alpal</th>
                      <th className="p-3">Kategori Perlengkapan</th>
                      <th className="p-3">Kondisi Aset</th>
                      <th className="p-3">Pos Penempatan</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    {masterAlpalList
                      .filter(a => !masterSecuritySearch || a.name.toLowerCase().includes(masterSecuritySearch.toLowerCase()))
                      .map((alpal, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-indigo-400">{alpal.assetId}</td>
                          <td className="p-3 text-white font-bold font-sans">{alpal.name}</td>
                          <td className="p-3 font-sans text-sky-300">{alpal.category}</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ✓ {alpal.condition}
                            </span>
                          </td>
                          <td className="p-3 text-slate-300 font-sans">{alpal.location}</td>
                          <td className="p-3 text-right font-sans">
                            <button onClick={() => alert(`Mengedit Aset Alpal ${alpal.name}`)} className="text-indigo-400 hover:underline font-bold text-[11px]">Edit Master</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Sub-Tab 4: Master Hardware CCTV AI */}
          {masterSecuritySubTab === 'HARDWARE_CCTV' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Video className="w-4 h-4 text-emerald-400" />
                    Daftar Master Hardware Kamera CCTV AI, Turnstile & Boom Barrier Gate
                  </h3>
                  <p className="text-[11px] text-slate-400">Pusat Pendaftaran IP Address, Sensor ANPR, PTZ Thermal Kamera & Boom Barriers</p>
                </div>
                <input
                  type="text"
                  placeholder="Cari IP / Device CCTV..."
                  value={masterSecuritySearch}
                  onChange={(e) => setMasterSecuritySearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                      <th className="p-3">Device ID</th>
                      <th className="p-3">Nama Perangkat</th>
                      <th className="p-3">IP Address</th>
                      <th className="p-3">Area Installation</th>
                      <th className="p-3">AI Fitur Analytics</th>
                      <th className="p-3">Status Connection</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                    {masterCctvList
                      .filter(c => !masterSecuritySearch || c.name.toLowerCase().includes(masterSecuritySearch.toLowerCase()))
                      .map((cctv, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50">
                          <td className="p-3 font-bold text-indigo-400">{cctv.devId}</td>
                          <td className="p-3 text-white font-bold font-sans">{cctv.name}</td>
                          <td className="p-3 text-emerald-400">{cctv.ipAddress}</td>
                          <td className="p-3 text-slate-300 font-sans">{cctv.area}</td>
                          <td className="p-3 font-sans text-amber-300 font-bold">{cctv.aiFeature}</td>
                          <td className="p-3 font-sans">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              ● {cctv.streamStatus}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button onClick={() => alert(`Mengedit Hardware CCTV ${cctv.name}`)} className="text-indigo-400 hover:underline font-bold text-[11px]">Edit Master</button>
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

    </div>
  );
};
