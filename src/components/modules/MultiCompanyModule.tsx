import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Pickaxe, 
  Users, 
  Briefcase, 
  Plus, 
  Search, 
  Building, 
  Layers, 
  CheckCircle2, 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  UserPlus,
  ChevronRight,
  Filter,
  Lock,
  Database,
  Languages,
  Sun,
  Moon,
  HardDrive,
  RotateCcw,
  FileText,
  Settings,
  Key,
  Sliders,
  Clock,
  Download,
  Upload,
  RefreshCw,
  GitBranch,
  Shield,
  Palette,
  Server,
  Terminal,
  FileCode
} from 'lucide-react';
import { Company, Department, CompanyUser, MineSite, PitOperation, Language, UserRole } from '../../types';

interface MultiCompanyModuleProps {
  companies: Company[];
  sites: MineSite[];
  pits: PitOperation[];
  departments: Department[];
  users: CompanyUser[];
  language: Language;
  onAddCompany: (company: Company) => void;
  onAddSite: (site: MineSite) => void;
  onAddPit: (pit: PitOperation) => void;
  onAddDepartment: (dept: Department) => void;
  onAddUser: (user: CompanyUser) => void;
}

export const MultiCompanyModule: React.FC<MultiCompanyModuleProps> = ({
  companies,
  sites,
  pits,
  departments,
  users,
  language,
  onAddCompany,
  onAddSite,
  onAddPit,
  onAddDepartment,
  onAddUser
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'companies' 
    | 'branch' 
    | 'sites'
    | 'departments' 
    | 'roles' 
    | 'permissions' 
    | 'users'
    | 'master_data' 
    | 'database_engine'
    | 'localization' 
    | 'language' 
    | 'theme' 
    | 'backup_restore' 
    | 'audit_log'
  >('companies');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [showAddSiteModal, setShowAddSiteModal] = useState(false);
  const [showAddPitModal, setShowAddPitModal] = useState(false);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // New Company Form State
  const [newCompName, setNewCompName] = useState('');
  const [newCompCode, setNewCompCode] = useState('');
  const [newCompType, setNewCompType] = useState<Company['type']>('IUP-OP Nickel Mine');
  const [newCompReg, setNewCompReg] = useState('');
  const [newCompHq, setNewCompHq] = useState('');
  const [newCompRkab, setNewCompRkab] = useState('2500000');

  // New Site Form State
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteLocation, setNewSiteLocation] = useState('');
  const [newSiteConcession, setNewSiteConcession] = useState('3500');
  const [newSiteRkab, setNewSiteRkab] = useState('2000000');

  // New Pit Form State
  const [newPitName, setNewPitName] = useState('');
  const [newPitSiteId, setNewPitSiteId] = useState(sites[0]?.id || 'SITE-MOROWALI');
  const [newPitSR, setNewPitSR] = useState('3.5');

  // New Dept Form State
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptCode, setNewDeptCode] = useState('');
  const [newDeptHead, setNewDeptHead] = useState('');
  const [newDeptCompanyId, setNewDeptCompanyId] = useState(companies[0]?.id || 'COMP-MOROWALI');

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('Mine Manager');
  const [newUserCompId, setNewUserCompId] = useState(companies[0]?.id || 'COMP-MOROWALI');
  const [newUserDeptId, setNewUserDeptId] = useState(departments[0]?.id || 'DEPT-MINE-ENG');

  // BRANCHES DATASET
  const [branches, setBranches] = useState([
    { id: 'BR-01', code: 'BR-MOROWALI', name: 'Cabang Utama Morowali Site & Jetty', company: 'PT Morowali Nickel Mining', location: 'Bahodopi, Morowali, Sulawesi Tengah', head: 'Ir. Bambang Wijaya (GM)', phone: '+62 811-4522-881', staffCount: 840, status: 'OPERATIONAL' },
    { id: 'BR-02', code: 'BR-HALMAHERA', name: 'Cabang Eksplorasi Halmahera Selatan', company: 'PT Halmahera Mining Energy', location: 'Weda Bay, Halmahera Selatan', head: 'Eko Prasetyo, S.T.', phone: '+62 812-9844-112', staffCount: 320, status: 'OPERATIONAL' },
    { id: 'BR-03', code: 'BR-JAKARTA', name: 'Kantor Cabang Pusat Jakarta (Commercial & Legal)', company: 'PT Morowali Nickel Mining', location: 'Gedung Menara Palma Lt. 28, Jakarta Selatan', head: 'Hendra Tan (Finance Director)', phone: '+62 21-5290-8800', staffCount: 65, status: 'HEADQUARTERS' },
    { id: 'BR-04', code: 'BR-KENDARI', name: 'Basecamp Logistik & Transit Kendari Port', company: 'PT Morowali Nickel Mining', location: 'Kawasan Pelabuhan Bungkutoko, Kendari', head: 'Agus Wijaya (Logistics Supervisor)', phone: '+62 852-4110-992', staffCount: 42, status: 'LOGISTICS_BASE' }
  ]);

  // ROLES DATASET
  const [rolesList, setRolesList] = useState([
    { id: 'ROLE-01', name: 'System Super Admin', level: 'Level 0 - Root', usersAssigned: 3, description: 'Akses penuh tanpa batas ke seluruh konfigurasi, audit log, & database', permissionsCount: 128 },
    { id: 'ROLE-02', name: 'Kepala Teknik Tambang (KTT)', level: 'Level 1 - Executive Site', usersAssigned: 2, description: 'Otorisasi tertinggi keselamatan K3LH, pengajuan RKAB, & legalitas ESDM', permissionsCount: 114 },
    { id: 'ROLE-03', name: 'Mine Operations Manager', level: 'Level 2 - Operations', usersAssigned: 8, description: 'Pengelolaan fleet, pit digging, ore getting, & stripping ratio', permissionsCount: 92 },
    { id: 'ROLE-04', name: 'Chief Geologist & Mine Planner', level: 'Level 2 - Technical', usersAssigned: 12, description: 'Model geologi 3D, cut-off grade, ore blending, & lab assay validation', permissionsCount: 86 },
    { id: 'ROLE-05', name: 'HSE & Safety Lead Inspector', level: 'Level 2 - Compliance', usersAssigned: 15, description: 'Inspeksi K3LH, AMDAL, pemantauan efluen air, & pelaporan insiden', permissionsCount: 78 },
    { id: 'ROLE-06', name: 'Finance & Cost Control Manager', level: 'Level 2 - Financial', usersAssigned: 6, description: 'Approval PO Purchasing, invoice offtaker, pajak royalty HPM, & cash cost', permissionsCount: 84 },
    { id: 'ROLE-07', name: 'Operator Lapangan & Weighbridge', level: 'Level 3 - Field Staff', usersAssigned: 180, description: 'Input data timbangan, ritase dump truck, & checklist telemetry alat berat', permissionsCount: 24 }
  ]);

  // PERMISSION MATRIX DATASET
  const [permissionMatrix, setPermissionMatrix] = useState([
    { module: 'Laporan & Dokumen RKAB ESDM', read: true, write: true, approve: true, export: true, delete: false },
    { module: 'Eksplorasi Pit & Model Geologi', read: true, write: true, approve: true, export: true, delete: true },
    { module: 'Dispatch Fleet & Telemetri Alat Berat', read: true, write: true, approve: false, export: true, delete: false },
    { module: 'Timbangan Digital & Gate Weighbridge', read: true, write: true, approve: false, export: true, delete: false },
    { module: 'Stockpile & Algoritma Ore Blending AI', read: true, write: true, approve: true, export: true, delete: false },
    { module: 'Jetty Barging & COA Surveyor', read: true, write: true, approve: true, export: true, delete: false },
    { module: 'Keuangan, Penjualan HPM & Royalty', read: true, write: false, approve: true, export: true, delete: false },
    { module: 'Konfigurasi Sistem & Audit Log', read: true, write: false, approve: false, export: false, delete: false }
  ]);

  // MASTER DATA CATEGORIES
  const [masterDataCategories] = useState([
    { code: 'MD-01', name: 'Master Grade Ore Nickel (Saprolite & Limonite)', itemsCount: 12, lastUpdated: '2026-08-01' },
    { code: 'MD-02', name: 'Master Kode Akun Keuangan (Chart of Accounts - COA)', itemsCount: 148, lastUpdated: '2026-07-28' },
    { code: 'MD-03', name: 'Master Kategori Fleet Alat Berat & Dump Truck', itemsCount: 24, lastUpdated: '2026-08-02' },
    { code: 'MD-04', name: 'Master Bahan Bakar BBM (B35, B40, Pertamina Dex)', itemsCount: 6, lastUpdated: '2026-08-03' },
    { code: 'MD-05', name: 'Master Pelabuhan Jetty & Dermaga Transshipment', itemsCount: 8, lastUpdated: '2026-07-15' },
    { code: 'MD-06', name: 'Master Kode Bahaya K3LH & APD Safety', itemsCount: 42, lastUpdated: '2026-07-20' }
  ]);

  // DATABASE ENGINE DATASETS (Highly Normalized, Migration, Seeder, Replication Ready)
  const [dbMigrations, setDbMigrations] = useState([
    { id: 'MIG-001', file: '001_create_normalized_entities.sql', date: '2026-07-01 08:00', status: 'APPLIED_3NF', tablesCreated: 18 },
    { id: 'MIG-002', file: '002_add_rkab_esdm_audit_fk.sql', date: '2026-07-15 10:30', status: 'APPLIED_3NF', tablesCreated: 4 },
    { id: 'MIG-003', file: '003_partition_telemetry_haulage.sql', date: '2026-08-01 12:00', status: 'APPLIED_3NF', tablesCreated: 6 }
  ]);

  const [dbSeeders] = useState([
    { id: 'SEED-01', name: 'Mining Master Dictionaries Seeder', records: 1420, status: 'EXECUTED_SUCCESS' },
    { id: 'SEED-02', name: 'Default Chart of Accounts (COA) Seeder', records: 148, status: 'EXECUTED_SUCCESS' },
    { id: 'SEED-03', name: 'Initial Pit Operations & Dump Truck Fleet Seeder', records: 280, status: 'EXECUTED_SUCCESS' }
  ]);

  const [replicationNodes] = useState([
    { name: 'Primary DB Node (Jakarta - RW)', type: 'PRIMARY_MASTER', role: 'READ_WRITE', lagMs: 0, status: 'HEALTHY_ACTIVE' },
    { name: 'Replica Node 1 (Surabaya - Hot Standby)', type: 'READ_REPLICA', role: 'READ_ONLY', lagMs: 0.8, status: 'SYNCED_REPLICATION_READY' },
    { name: 'Replica Node 2 (Singapore - DR Vault)', type: 'READ_REPLICA', role: 'READ_ONLY', lagMs: 12.4, status: 'SYNCED_REPLICATION_READY' }
  ]);

  const [normalizedEntities] = useState([
    { name: 'companies (Entity Level 1)', nf: '3NF Normalized', pk: 'id (UUID)', fk: 'None', recordCount: 12 },
    { name: 'mine_sites (Entity Level 2)', nf: '3NF Normalized', pk: 'id (UUID)', fk: 'company_id -> companies(id)', recordCount: 38 },
    { name: 'pit_operations (Entity Level 3)', nf: '3NF Normalized', pk: 'id (UUID)', fk: 'site_id -> mine_sites(id)', recordCount: 84 },
    { name: 'dump_truck_fleet (Equipment Table)', nf: '3NF Normalized', pk: 'id (UUID)', fk: 'company_id -> companies(id)', recordCount: 240 },
    { name: 'haulage_logs (Partitioned Fact Table)', nf: 'BCNF Normalized', pk: 'log_id (UUID)', fk: 'truck_id, pit_id, driver_id', recordCount: 1420000 }
  ]);

  // LOCALIZATION STATE
  const [localization, setLocalization] = useState({
    defaultTimezone: 'WITA (UTC+8 - Makasar/Morowali)',
    currencyPrimary: 'USD ($)',
    currencySecondary: 'IDR (Rp)',
    dateFormat: 'YYYY-MM-DD (Standard ISO)',
    timeFormat: '24-Hour (HH:mm:ss)',
    numberFormat: 'US Standard (1,000,000.00)',
    temperatureUnit: 'Celsius (°C)'
  });

  // LANGUAGE CONFIG STATE
  const [languageSetting, setLanguageSetting] = useState({
    defaultLanguage: 'Bahasa Indonesia (ID)',
    supportedLanguages: ['Bahasa Indonesia (ID)', 'English (US)', 'Mandarin Chinese (ZH)'],
    autoTranslateAi: true,
    fallbackLanguage: 'English (US)',
    dictionaryCoveragePct: 99.4
  });

  // THEME CONFIG STATE
  const [themeSetting, setThemeSetting] = useState({
    consoleTheme: 'Dark Mining Obsidian (Default)',
    accentColor: 'Emerald Green (#10b981)',
    uiDensity: 'Compact Mining View (11px text)',
    highContrastMode: false,
    cardBorderGlow: true,
    backgroundPattern: 'Mining Topo Lines Grid'
  });

  // BACKUP & RESTORE STATE
  const [backupLogs, setBackupLogs] = useState([
    { id: 'BK-2026-0803', type: 'AUTOMATIC_NIGHTLY', sizeMB: 1420, date: '2026-08-03 00:00:14', storageLocation: 'GCP Cloud Storage (asia-southeast1)', status: 'COMPLETED_SUCCESS' },
    { id: 'BK-2026-0802', type: 'AUTOMATIC_NIGHTLY', sizeMB: 1412, date: '2026-08-02 00:00:10', storageLocation: 'GCP Cloud Storage (asia-southeast1)', status: 'COMPLETED_SUCCESS' },
    { id: 'BK-2026-0801', type: 'MANUAL_SNAPSHOT', sizeMB: 1405, date: '2026-08-01 14:30:00', storageLocation: 'AWS S3 Offsite Cold Vault', status: 'COMPLETED_SUCCESS' }
  ]);

  // AUDIT LOG DATASET
  const [auditLogs] = useState([
    { logId: 'LOG-88102', timestamp: '2026-08-03 11:24:05', user: 'Ir. Bambang Wijaya (KTT)', action: 'UPDATE_RKAB_TARGET', module: 'RKAB ESDM Generator', ipAddress: '180.252.12.98', device: 'Chrome on macOS', status: 'SUCCESS' },
    { logId: 'LOG-88103', timestamp: '2026-08-03 10:15:30', user: 'Dewi Rahma (Geologist)', action: 'APPROVE_ORE_BLENDING_LOT', module: 'Stockpile Blending AI', ipAddress: '180.252.12.102', device: 'Firefox on Windows 11', status: 'SUCCESS' },
    { logId: 'LOG-88104', timestamp: '2026-08-03 09:42:18', user: 'Ahmad Fauzi (Weighbridge)', action: 'OVERRIDE_WEIGHBRIDGE_TARE', module: 'Weighbridge Gate', ipAddress: '10.8.0.44 (VPN Site)', device: 'NickelSmart Mobile App', status: 'AUDIT_FLAGGED' },
    { logId: 'LOG-88105', timestamp: '2026-08-03 08:30:11', user: 'System Bot AI', action: 'AUTO_DISPATCH_EMERGENCY_ALERT', module: 'Notification Alert Hub', ipAddress: 'Server Internal', device: 'NodeJS Engine', status: 'SUCCESS' }
  ]);

  // Form Submit Handlers
  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) return;

    const comp: Company = {
      id: `COMP-${Date.now()}`,
      code: newCompCode || `COMP-${companies.length + 1}`,
      name: newCompName,
      type: newCompType,
      registrationNo: newCompReg || 'IUP-OP/ESDM/2026',
      headquarters: newCompHq || 'Jakarta Office',
      sitesCount: 1,
      pitsCount: 2,
      departmentsCount: 4,
      usersCount: 12,
      annualRkabMT: Number(newCompRkab) || 2000000,
      status: 'ACTIVE'
    };

    onAddCompany(comp);
    setShowAddCompanyModal(false);
    setNewCompName('');
    setNewCompCode('');
  };

  const handleCreateSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSiteName.trim()) return;

    const site: MineSite = {
      id: `SITE-${Date.now()}`,
      name: newSiteName,
      location: newSiteLocation || 'Sulawesi Tengah',
      concessionSizeHa: Number(newSiteConcession),
      rkabTargetMTAnnual: Number(newSiteRkab),
      rkabActualMTYTD: Math.floor(Number(newSiteRkab) * 0.4),
      activePitsCount: 2,
      status: 'Operational'
    };

    onAddSite(site);
    setShowAddSiteModal(false);
    setNewSiteName('');
  };

  const handleCreatePit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPitName.trim()) return;

    const pit: PitOperation = {
      id: `PIT-${Date.now()}`,
      pitName: newPitName,
      siteId: newPitSiteId,
      elevationM: 250,
      strippingRatioTarget: Number(newPitSR),
      strippingRatioActual: Number(newPitSR),
      overburdenMTToday: 15000,
      saproliteMTToday: 3500,
      limoniteMTToday: 2000,
      weatherCondition: 'Cerah',
      safetyStatus: 'SAFE'
    };

    onAddPit(pit);
    setShowAddPitModal(false);
    setNewPitName('');
  };

  const handleCreateDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;

    const dept: Department = {
      id: `DEPT-${Date.now()}`,
      companyId: newDeptCompanyId,
      code: newDeptCode || `DEPT-${Date.now()}`,
      name: newDeptName,
      headOfDepartment: newDeptHead || 'Departemen Head',
      budgetAllocatedIDR: 15000000000,
      activeStaffCount: 8,
      status: 'ACTIVE'
    };

    onAddDepartment(dept);
    setShowAddDeptModal(false);
    setNewDeptName('');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const user: CompanyUser = {
      id: `USR-${Date.now()}`,
      companyId: newUserCompId,
      departmentId: newUserDeptId,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'ACTIVE',
      lastLogin: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    onAddUser(user);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Hirarki Multi-Tenant & Holding
            </span>
            <span className="text-slate-400 text-xs">• Unlimited Companies, Sites, Pits, Departments & Users</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Manajemen Multi-Company & Struktur Organisasi' : 'Multi-Company Architecture & Organization Hierarchy'}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              if (activeTab === 'companies') setShowAddCompanyModal(true);
              if (activeTab === 'sites') setShowAddSiteModal(true);
              if (activeTab === 'pits') setShowAddPitModal(true);
              if (activeTab === 'departments') setShowAddDeptModal(true);
              if (activeTab === 'users') setShowAddUserModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>
              {activeTab === 'companies' && 'Tambah Perusahaan Baru'}
              {activeTab === 'sites' && 'Tambah Site Tambang Baru'}
              {activeTab === 'pits' && 'Tambah Pit Penambangan'}
              {activeTab === 'departments' && 'Tambah Departemen'}
              {activeTab === 'users' && 'Undang / Tambah User Seats'}
            </span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-blue-400">
            <Building2 className="w-4 h-4" />
            <span className="font-semibold text-slate-400">Companies</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-100">{companies.length} <span className="text-xs text-blue-400 font-normal">Entities</span></p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <MapPin className="w-4 h-4" />
            <span className="font-semibold text-slate-400">Mine Sites</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-100">{sites.length} <span className="text-xs text-emerald-400 font-normal">Locations</span></p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Pickaxe className="w-4 h-4" />
            <span className="font-semibold text-slate-400">Operating Pits</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-100">{pits.length} <span className="text-xs text-amber-400 font-normal">Active Pits</span></p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-purple-400">
            <Briefcase className="w-4 h-4" />
            <span className="font-semibold text-slate-400">Departments</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-100">{departments.length} <span className="text-xs text-purple-400 font-normal">Units</span></p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-teal-400">
            <Users className="w-4 h-4" />
            <span className="font-semibold text-slate-400">Enrolled Users</span>
          </div>
          <p className="text-2xl font-extrabold text-slate-100">{users.length + 240} <span className="text-xs text-teal-400 font-normal">Seats</span></p>
        </div>
      </div>

      {/* Navigation Tabs Bar covering all Settings & Organization Administration keywords */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar py-1">
          {[
            { id: 'companies', label: 'Company', icon: Building2 },
            { id: 'branch', label: 'Branch / Site', icon: GitBranch },
            { id: 'departments', label: 'Department', icon: Briefcase },
            { id: 'roles', label: 'Role Hierarchy', icon: Shield },
            { id: 'permissions', label: 'Permission Matrix', icon: Lock },
            { id: 'users', label: 'Users & Staff', icon: Users },
            { id: 'master_data', label: 'Master Data', icon: Database },
            { id: 'database_engine', label: 'Database & Migration', icon: Server },
            { id: 'localization', label: 'Localization', icon: Globe },
            { id: 'language', label: 'Language', icon: Languages },
            { id: 'theme', label: 'Theme & Console', icon: Palette },
            { id: 'backup_restore', label: 'Backup & Restore', icon: HardDrive },
            { id: 'audit_log', label: 'Audit Log', icon: FileText }
          ].map(tab => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-1 ring-blue-400' 
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <IconComp className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-44 shrink-0 hidden md:block">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengaturan..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* TAB 1: COMPANIES */}
      {activeTab === 'companies' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {companies
            .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(comp => (
              <div key={comp.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-blue-500/50 transition-all">
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-blue-400 font-bold text-xs">{comp.code}</span>
                    <h3 className="font-bold text-slate-100 text-base">{comp.name}</h3>
                    <p className="text-xs text-slate-400">{comp.type}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {comp.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>No. Registrasi IUP / Legal:</span>
                    <strong className="text-slate-200 font-mono text-[11px]">{comp.registrationNo}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Lokasi Kantor Pusat:</span>
                    <strong className="text-slate-200">{comp.headquarters}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Target RKAB Tahunan:</span>
                    <strong className="text-emerald-400 font-mono">{(comp.annualRkabMT / 1000000).toFixed(1)} Juta MT</strong>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-950">
                    <span className="text-[10px] text-slate-500 block">Sites</span>
                    <strong className="text-slate-200 font-mono">{comp.sitesCount}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950">
                    <span className="text-[10px] text-slate-500 block">Pits</span>
                    <strong className="text-slate-200 font-mono">{comp.pitsCount}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950">
                    <span className="text-[10px] text-slate-500 block">Depts</span>
                    <strong className="text-slate-200 font-mono">{comp.departmentsCount}</strong>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950">
                    <span className="text-[10px] text-slate-500 block">Users</span>
                    <strong className="text-blue-400 font-mono">{comp.usersCount}</strong>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* TAB 2: SITES */}
      {activeTab === 'sites' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {sites
            .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(site => (
              <div key={site.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="font-mono text-emerald-400 font-bold text-xs">{site.id}</span>
                    <h3 className="font-bold text-slate-100 text-base">{site.name}</h3>
                    <p className="text-xs text-slate-400">{site.location}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                    {site.status}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Luas Konsesi IUP:</span>
                    <strong className="text-slate-200 font-mono">{(site.concessionSizeHa ?? 0).toLocaleString()} Ha</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Target RKAB Ore:</span>
                    <strong className="text-slate-200 font-mono">{(site.rkabTargetMTAnnual / 1000000).toFixed(1)} Juta MT</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Realisasi YTD:</span>
                    <strong className="text-emerald-400 font-mono">{(site.rkabActualMTYTD / 1000000).toFixed(2)} Juta MT</strong>
                  </div>
                </div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full" 
                    style={{ width: `${Math.min((site.rkabActualMTYTD / site.rkabTargetMTAnnual) * 100, 100)}%` }} 
                  />
                </div>
              </div>
            ))}
        </div>
      )}

      {/* TAB 3: PITS */}
      {activeTab === 'pits' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pits
            .filter(p => p.pitName.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(pit => (
              <div key={pit.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                  <div>
                    <span className="font-mono text-amber-400 font-bold text-xs">{pit.id}</span>
                    <h3 className="font-bold text-slate-100 text-sm">{pit.pitName}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                    {pit.weatherCondition}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-slate-950">
                    <span className="text-slate-500 text-[10px] block">Elevasi Tambang:</span>
                    <strong className="text-slate-200 font-mono">{pit.elevationM} m RL</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-950">
                    <span className="text-slate-500 text-[10px] block">Stripping Ratio (SR):</span>
                    <strong className="text-emerald-400 font-mono">{pit.strippingRatioActual} BCM/MT</strong>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Produksi Overburden:</span>
                    <strong className="text-slate-200 font-mono">{(pit.overburdenMTToday ?? 0).toLocaleString()} MT</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Produksi Ore Saprolite:</span>
                    <strong className="text-emerald-400 font-mono">{(pit.saproliteMTToday ?? 0).toLocaleString()} MT</strong>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* TAB 4: DEPARTMENTS */}
      {activeTab === 'departments' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {departments
            .filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.code.toLowerCase().includes(searchQuery.toLowerCase()))
            .map(dept => (
              <div key={dept.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between border-b border-slate-800 pb-2">
                  <div>
                    <span className="font-mono text-purple-400 font-bold text-xs">{dept.code}</span>
                    <h3 className="font-bold text-slate-100 text-sm">{dept.name}</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                    {dept.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Head of Department:</span>
                    <strong className="text-slate-200">{dept.headOfDepartment}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Jumlah Staf Aktif:</span>
                    <strong className="text-purple-300 font-mono">{dept.activeStaffCount} Staf</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Anggaran Alokasi:</span>
                    <strong className="text-emerald-400 font-mono">Rp {(dept.budgetAllocatedIDR / 1000000000).toFixed(1)} Miliar</strong>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* TAB 5: USERS & STAFF DIRECTORY */}
      {activeTab === 'users' && (
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm">Direktori Pengguna & User Seats Multi-Company</h3>
          <div className="space-y-2 text-xs">
            {users
              .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.role.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(usr => (
                <div key={usr.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm">{usr.name}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
                        {usr.role}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs font-mono">{usr.email}</p>
                  </div>

                  <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                    <span>Login Terakhir: <strong className="text-slate-300 font-mono">{usr.lastLogin}</strong></span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{usr.status}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* BRANCH MANAGEMENT TAB */}
      {activeTab === 'branch' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-indigo-400" /> Manajemen Cabang & Basecamp Site (Branch Setup)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Pengaturan kantor cabang, basecamp pertambangan, & jaringan kantor operasional</p>
              </div>
              <button 
                onClick={() => alert('Membuka Form Pendaftaran Cabang Baru...')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Cabang
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
              {branches.map((br) => (
                <div key={br.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 hover:border-indigo-500/50 transition-all">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-indigo-400 font-bold text-[10px]">{br.code}</span>
                      <strong className="text-slate-100 font-sans text-sm font-bold block">{br.name}</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {br.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-[11px] font-sans text-slate-300">
                    <p><strong className="text-slate-400">Entitas Perusahaan:</strong> {br.company}</p>
                    <p><strong className="text-slate-400">Alamat Cabang:</strong> {br.location}</p>
                    <p><strong className="text-slate-400">Pimpinan / Head:</strong> {br.head} ({br.phone})</p>
                    <p><strong className="text-slate-400">Total Personel:</strong> <span className="text-indigo-300 font-mono font-bold">{br.staffCount} Personel</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ROLE HIERARCHY TAB */}
      {activeTab === 'roles' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" /> Matriks Peran & Hirarki Jabatan (Role Architecture)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Definisi peran sistem, tingkat otorisasi, & pembatasan wewenang personel tambang</p>
              </div>
              <button 
                onClick={() => alert('Membuka Editor Peran Baru...')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Buat Peran Baru
              </button>
            </div>

            <div className="space-y-3 font-mono">
              {rolesList.map((rl) => (
                <div key={rl.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex flex-wrap justify-between items-center gap-2 border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">{rl.id}</span>
                      <strong className="text-slate-100 font-sans text-sm font-bold">{rl.name}</strong>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                      {rl.level}
                    </span>
                  </div>

                  <p className="text-slate-300 font-sans text-[11px]">{rl.description}</p>

                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1 font-sans">
                    <span>Pengguna Terdaftar: <strong className="text-slate-100 font-mono">{rl.usersAssigned} Personel</strong></span>
                    <span>Izin Aktif: <strong className="text-emerald-400 font-mono">{rl.permissionsCount} Hak Akses</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* PERMISSIONS MATRIX TAB */}
      {activeTab === 'permissions' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Lock className="w-4 h-4 text-rose-400" /> Matriks Akses RBAC & Granular Permissions
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Pengaturan hak baca, tulis, persetujuan, ekspor, & hapus untuk modul sistem</p>
              </div>
              <button 
                onClick={() => alert('Perubahan matriks akses berhasil disimpan!')}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Simpan Matriks
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">MODUL SISTEM TAMBANG</th>
                    <th className="p-2.5 text-center">READ (BACA)</th>
                    <th className="p-2.5 text-center">WRITE (EDIT)</th>
                    <th className="p-2.5 text-center">APPROVE (ACC)</th>
                    <th className="p-2.5 text-center">EXPORT (PDF/XLS)</th>
                    <th className="p-2.5 text-center">DELETE (HAPUS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {permissionMatrix.map((pm, pIdx) => (
                    <tr key={pIdx} className="hover:bg-slate-950/50">
                      <td className="p-2.5 text-slate-100 font-bold">{pm.module}</td>
                      <td className="p-2.5 text-center">
                        <input 
                          type="checkbox" 
                          checked={pm.read} 
                          onChange={() => {
                            const updated = [...permissionMatrix];
                            updated[pIdx].read = !updated[pIdx].read;
                            setPermissionMatrix(updated);
                          }}
                          className="w-4 h-4 accent-emerald-500 rounded cursor-pointer" 
                        />
                      </td>
                      <td className="p-2.5 text-center">
                        <input 
                          type="checkbox" 
                          checked={pm.write} 
                          onChange={() => {
                            const updated = [...permissionMatrix];
                            updated[pIdx].write = !updated[pIdx].write;
                            setPermissionMatrix(updated);
                          }}
                          className="w-4 h-4 accent-blue-500 rounded cursor-pointer" 
                        />
                      </td>
                      <td className="p-2.5 text-center">
                        <input 
                          type="checkbox" 
                          checked={pm.approve} 
                          onChange={() => {
                            const updated = [...permissionMatrix];
                            updated[pIdx].approve = !updated[pIdx].approve;
                            setPermissionMatrix(updated);
                          }}
                          className="w-4 h-4 accent-indigo-500 rounded cursor-pointer" 
                        />
                      </td>
                      <td className="p-2.5 text-center">
                        <input 
                          type="checkbox" 
                          checked={pm.export} 
                          onChange={() => {
                            const updated = [...permissionMatrix];
                            updated[pIdx].export = !updated[pIdx].export;
                            setPermissionMatrix(updated);
                          }}
                          className="w-4 h-4 accent-amber-500 rounded cursor-pointer" 
                        />
                      </td>
                      <td className="p-2.5 text-center">
                        <input 
                          type="checkbox" 
                          checked={pm.delete} 
                          onChange={() => {
                            const updated = [...permissionMatrix];
                            updated[pIdx].delete = !updated[pIdx].delete;
                            setPermissionMatrix(updated);
                          }}
                          className="w-4 h-4 accent-rose-500 rounded cursor-pointer" 
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MASTER DATA MANAGEMENT TAB */}
      {activeTab === 'master_data' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" /> Kelola Kamus Master Data Pertambangan (Master Data)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Pengaturan standar data master COA, Kategori Alat Berat, Kadar Ore, & Pelabuhan</p>
              </div>
              <button 
                onClick={() => alert('Membuka Form Tambah Item Master Data...')}
                className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Kamus Master
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
              {masterDataCategories.map((md) => (
                <div key={md.code} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <span className="text-cyan-400 font-bold text-[10px] block">{md.code}</span>
                  <strong className="text-slate-100 font-sans text-xs font-bold block">{md.name}</strong>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-800 font-sans">
                    <span>Item Terdaftar: <strong className="text-slate-100 font-mono">{md.itemsCount} Records</strong></span>
                    <span>Update: <strong className="text-slate-300 font-mono">{md.lastUpdated}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LOCALIZATION SETTINGS TAB */}
      {activeTab === 'localization' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" /> Regional & Pengaturan Lokalisasi System (Localization)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Zona waktu site tambang, format mata uang, format tanggal ISO, & satuan unit</p>
              </div>
              <button 
                onClick={() => alert('Pengaturan Lokalisasi berhasil diperbarui!')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md"
              >
                Simpan Lokalisasi
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-slate-400 text-[11px] font-bold">Zona Waktu Operasional Site (Default Timezone):</label>
                <select 
                  value={localization.defaultTimezone}
                  onChange={(e) => setLocalization({ ...localization, defaultTimezone: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono"
                >
                  <option value="WITA (UTC+8 - Makasar/Morowali)">WITA (UTC+8 - Makasar / Morowali / Kendari)</option>
                  <option value="WIB (UTC+7 - Jakarta Office)">WIB (UTC+7 - Jakarta Office)</option>
                  <option value="WIT (UTC+9 - Papua/Maluku)">WIT (UTC+9 - Maluku Utara / Halmahera)</option>
                </select>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-slate-400 text-[11px] font-bold">Mata Uang Utama Komersial (Primary Currency):</label>
                <select 
                  value={localization.currencyPrimary}
                  onChange={(e) => setLocalization({ ...localization, currencyPrimary: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono"
                >
                  <option value="USD ($)">USD ($) - Dolar Amerika (Kontrak Ekspor & Offtaker)</option>
                  <option value="IDR (Rp)">IDR (Rp) - Rupiah (Transaksi Lokal & Royalty ESDM)</option>
                </select>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-slate-400 text-[11px] font-bold">Format Tanggal Sistem (Date Format):</label>
                <select 
                  value={localization.dateFormat}
                  onChange={(e) => setLocalization({ ...localization, dateFormat: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono"
                >
                  <option value="YYYY-MM-DD (Standard ISO)">YYYY-MM-DD (Standard ISO Mining Report)</option>
                  <option value="DD/MM/YYYY (Indonesian Standard)">DD/MM/YYYY (Standard Indonesia)</option>
                </select>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-slate-400 text-[11px] font-bold">Satuan Suhu Sensor Telemetri (Temperature Unit):</label>
                <select 
                  value={localization.temperatureUnit}
                  onChange={(e) => setLocalization({ ...localization, temperatureUnit: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono"
                >
                  <option value="Celsius (°C)">Celsius (°C)</option>
                  <option value="Fahrenheit (°F)">Fahrenheit (°F)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGE SETTINGS TAB */}
      {activeTab === 'language' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Languages className="w-4 h-4 text-emerald-400" /> Bahasa & Penerjemahan Otomatis (Language Settings)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Konfigurasi bahasa antarmuka konsol, istilah teknis tambang, & translate AI</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                Kamus Terjemahan: {languageSetting.dictionaryCoveragePct}%
              </span>
            </div>

            <div className="space-y-4 font-sans text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-slate-400 text-[11px] font-bold">Bahasa Utama Tampilan (Default Console Language):</label>
                <select 
                  value={languageSetting.defaultLanguage}
                  onChange={(e) => setLanguageSetting({ ...languageSetting, defaultLanguage: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono"
                >
                  <option value="Bahasa Indonesia (ID)">Bahasa Indonesia (ID) - Standar ESDM & K3LH</option>
                  <option value="English (US)">English (US) - International Commercial & Board</option>
                  <option value="Mandarin Chinese (ZH)">Mandarin Chinese (ZH) - Smelter & Offtaker Partner</option>
                </select>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <strong className="text-slate-100 block text-xs">Penerjemahan Otomatis Laporan AI (AI Auto-Translate)</strong>
                  <p className="text-slate-400 text-[11px]">Terjemahkan dokumen RKAB & laporan teknis otomatis ke Bahasa Inggris / Mandarin saat diekspor</p>
                </div>
                <button 
                  onClick={() => setLanguageSetting({ ...languageSetting, autoTranslateAi: !languageSetting.autoTranslateAi })}
                  className={`px-3 py-1.5 rounded-lg font-bold text-xs ${
                    languageSetting.autoTranslateAi ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {languageSetting.autoTranslateAi ? 'AKTIF' : 'NONAKTIF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THEME & CONSOLE CUSTOMIZATION TAB */}
      {activeTab === 'theme' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Palette className="w-4 h-4 text-purple-400" /> Tampilan Konsol & Kustomisasi Tema (Theme & Console Setup)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Pengaturan kontras tinggi safety, aksen warna, kepadatan layout, & efek visual</p>
              </div>
              <button 
                onClick={() => alert('Tema tampilan berhasil disimpan!')}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md"
              >
                Terapkan Tema
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans text-slate-300">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-slate-400 text-[11px] font-bold">Tema Konsol Utama (Console Theme):</label>
                <select 
                  value={themeSetting.consoleTheme}
                  onChange={(e) => setThemeSetting({ ...themeSetting, consoleTheme: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono"
                >
                  <option value="Dark Mining Obsidian (Default)">Dark Mining Obsidian (Default - Eye-Safe)</option>
                  <option value="Slate Enterprise Dark">Slate Enterprise Dark (Standard Corporate)</option>
                  <option value="High Contrast Safety Console">High Contrast Safety Console (Outdoor Field)</option>
                </select>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <label className="block text-slate-400 text-[11px] font-bold">Warna Aksen Utama (Primary Accent):</label>
                <select 
                  value={themeSetting.accentColor}
                  onChange={(e) => setThemeSetting({ ...themeSetting, accentColor: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-mono"
                >
                  <option value="Emerald Green (#10b981)">Emerald Green (#10b981 - Eco Safety)</option>
                  <option value="Electric Blue (#3b82f6)">Electric Blue (#3b82f6 - Corporate Tech)</option>
                  <option value="Amber Gold (#f59e0b)">Amber Gold (#f59e0b - Mining Pit)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DATABASE ENGINE & MIGRATION TAB */}
      {activeTab === 'database_engine' && (
        <div className="space-y-6 text-xs">
          
          {/* Header Banner */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" /> Arsitektur Database Enterprise, Migrasi & Replikasi Multi-Node
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Skema Highly Normalized (3NF/BCNF), eksekutor Migration, Seeder otomatis, & kluster Replication Ready</p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                  SCHEMA: 3NF & BCNF NORMALIZED
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                  REPLICATION: READY (3 NODES)
                </span>
              </div>
            </div>

            {/* 1. Highly Normalized Entities Table */}
            <div className="space-y-3 font-sans">
              <span className="text-slate-300 text-xs font-bold flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-400" /> Struktur Tabel Highly Normalized (3NF / BCNF Entity Relationship):
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">NAMA TABEL / ENTITAS</th>
                      <th className="p-2.5">TINGKAT NORMALISASI</th>
                      <th className="p-2.5">PRIMARY KEY (PK)</th>
                      <th className="p-2.5">FOREIGN KEY (FK) RELASI</th>
                      <th className="p-2.5 text-right">TOTAL RECORD</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {normalizedEntities.map(ent => (
                      <tr key={ent.name} className="hover:bg-slate-950/50">
                        <td className="p-2.5 text-slate-100 font-mono font-bold">{ent.name}</td>
                        <td className="p-2.5">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[9px] font-bold">
                            {ent.nf}
                          </span>
                        </td>
                        <td className="p-2.5 text-emerald-400 font-mono">{ent.pk}</td>
                        <td className="p-2.5 text-indigo-300 font-mono">{ent.fk}</td>
                        <td className="p-2.5 text-right font-mono text-slate-300 font-bold">{(ent.recordCount ?? 0).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. Migration & Seeder Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-3 border-t border-slate-800">
              
              {/* Migration Runner */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-200 text-xs flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-amber-400" /> Database Migration Versioning
                  </span>
                  <button 
                    onClick={() => {
                      const newMig = {
                        id: `MIG-00${dbMigrations.length + 1}`,
                        file: `00${dbMigrations.length + 1}_add_custom_indexes.sql`,
                        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
                        status: 'APPLIED_3NF',
                        tablesCreated: 2
                      };
                      setDbMigrations([...dbMigrations, newMig]);
                      alert('Migrasi SQL versi terbaru berhasil dieksekusi di database!');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-[10px] flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3 h-3" /> Jalankan Migrasi Baru
                  </button>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  {dbMigrations.map(mig => (
                    <div key={mig.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="text-amber-400 font-bold block">{mig.file}</span>
                        <span className="text-slate-400 text-[10px]">{mig.date} | +{mig.tablesCreated} Schema Elements</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px]">
                        {mig.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Seeder Manager */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-200 text-xs flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" /> Automated Database Seeder Engine
                  </span>
                  <button 
                    onClick={() => alert('Seeder master data tambang berhasil diisi ulang!')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 transition-all"
                  >
                    <RefreshCw className="w-3 h-3" /> Re-Seed Master Data
                  </button>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  {dbSeeders.map(sd => (
                    <div key={sd.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div>
                        <span className="text-emerald-400 font-bold block">{sd.name}</span>
                        <span className="text-slate-400 text-[10px]">{sd.records} Records Inserted</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9px]">
                        {sd.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. Replication Ready Topology Cluster */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 font-sans pt-3 border-t border-slate-800">
              <span className="font-bold text-slate-200 text-xs flex items-center gap-2 border-b border-slate-800 pb-2">
                <GitBranch className="w-4 h-4 text-indigo-400" /> Status Replikasi Master-Replica Cluster (Replication Ready)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
                {replicationNodes.map(node => (
                  <div key={node.name} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-200 font-bold text-[11px]">{node.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        node.role === 'READ_WRITE' ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'
                      }`}>
                        {node.role}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between pt-1">
                      <span>Replication Lag:</span>
                      <strong className="text-emerald-400">{node.lagMs} ms</strong>
                    </div>
                    <div className="text-[10px] text-slate-400 flex justify-between">
                      <span>Status Kluster:</span>
                      <strong className="text-emerald-400">{node.status}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* BACKUP & RESTORE TAB */}
      {activeTab === 'backup_restore' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-400" /> Cadangan Data & Restorasi Sistem (Backup & Restore Engine)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Cadangan otomatis database harian, snapshot manual, & titik pemulihan sistem</p>
              </div>
              <button 
                onClick={() => {
                  const newBk = {
                    id: `BK-${Date.now()}`,
                    type: 'MANUAL_SNAPSHOT',
                    sizeMB: 1425,
                    date: new Date().toISOString().replace('T', ' ').substring(0, 19),
                    storageLocation: 'GCP Cloud Storage (asia-southeast1)',
                    status: 'COMPLETED_SUCCESS'
                  };
                  setBackupLogs([newBk, ...backupLogs]);
                  alert('Snapshot manual baru berhasil dibuat dan disimpan ke Cloud Storage!');
                }}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <HardDrive className="w-3.5 h-3.5" /> Buat Backup Manual
              </button>
            </div>

            <div className="space-y-3 font-mono">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Riwayat Snapshot Cadangan Data Database:</span>
              {backupLogs.map((bk) => (
                <div key={bk.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">{bk.id}</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                        {bk.type}
                      </span>
                      <span className="text-slate-400 text-[10px]">({bk.sizeMB} MB)</span>
                    </div>
                    <p className="text-slate-300 text-[11px] font-sans">
                      Lokasi Penyimpanan: <strong className="text-slate-100">{bk.storageLocation}</strong> • Waktu: <span className="text-slate-400">{bk.date}</span>
                    </p>
                  </div>

                  <button 
                    onClick={() => alert(`Proses simulasi restorasi dari snapshot ${bk.id} berhasil teruji!`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-bold flex items-center gap-1 shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" /> Restorasi Snapshot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AUDIT LOG TAB */}
      {activeTab === 'audit_log' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-300" /> Jejak Audit Sistem & Catatan Aktivitas (Audit Log Vault)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Catatan tidak terbantahkan (immutable audit log) untuk semua perubahan data & akses user</p>
              </div>
              <button 
                onClick={() => alert('Log audit berhasil diekspor ke format CSV / PDF!')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" /> Ekspor Audit Log
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2.5">WAKTU (STAMP)</th>
                    <th className="p-2.5">USER / OPERATOR</th>
                    <th className="p-2.5">AKSI PERUBAHAN</th>
                    <th className="p-2.5">MODUL SISTEM</th>
                    <th className="p-2.5">ALAMAT IP & PERANGKAT</th>
                    <th className="p-2.5">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {auditLogs.map((log) => (
                    <tr key={log.logId} className="hover:bg-slate-950/50">
                      <td className="p-2.5 text-slate-400">{log.timestamp}</td>
                      <td className="p-2.5 text-slate-100 font-bold font-sans">{log.user}</td>
                      <td className="p-2.5 text-amber-300 font-bold">{log.action}</td>
                      <td className="p-2.5 text-indigo-300 font-sans">{log.module}</td>
                      <td className="p-2.5 text-slate-400 text-[10px]">{log.ipAddress} ({log.device})</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          log.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {log.status}
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

      {/* MODAL: ADD COMPANY */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-lg">Tambah Perusahaan Entitas Baru</h3>
            <form onSubmit={handleCreateCompany} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nama Perusahaan:</label>
                <input
                  type="text"
                  required
                  value={newCompName}
                  onChange={(e) => setNewCompName(e.target.value)}
                  placeholder="e.g. PT Halmahera Nickel Resource"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Kode Singkatan:</label>
                <input
                  type="text"
                  value={newCompCode}
                  onChange={(e) => setNewCompCode(e.target.value)}
                  placeholder="e.g. PT-HNR"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Tipe Entitas Bisnis:</label>
                <select
                  value={newCompType}
                  onChange={(e) => setNewCompType(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                >
                  <option value="IUP-OP Nickel Mine">IUP-OP Nickel Mine</option>
                  <option value="Smelter RKEF/HPAL">Smelter RKEF/HPAL</option>
                  <option value="Mining Holding">Mining Holding</option>
                  <option value="Mining Contractor">Mining Contractor</option>
                  <option value="Jetty & Logistics">Jetty & Logistics</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Target RKAB Ore (MT):</label>
                <input
                  type="number"
                  value={newCompRkab}
                  onChange={(e) => setNewCompRkab(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCompanyModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Simpan Perusahaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SITE */}
      {showAddSiteModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-lg">Tambah Site Tambang Baru</h3>
            <form onSubmit={handleCreateSite} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nama Mine Site:</label>
                <input
                  type="text"
                  required
                  value={newSiteName}
                  onChange={(e) => setNewSiteName(e.target.value)}
                  placeholder="e.g. Block South Morowali Pit 04"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Lokasi Wilayah:</label>
                <input
                  type="text"
                  value={newSiteLocation}
                  onChange={(e) => setNewSiteLocation(e.target.value)}
                  placeholder="e.g. Morowali, Sulawesi Tengah"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Luas Konsesi (Hektar):</label>
                <input
                  type="number"
                  value={newSiteConcession}
                  onChange={(e) => setNewSiteConcession(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSiteModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Simpan Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PIT */}
      {showAddPitModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-lg">Tambah Pit Penambangan Baru</h3>
            <form onSubmit={handleCreatePit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nama Pit:</label>
                <input
                  type="text"
                  required
                  value={newPitName}
                  onChange={(e) => setNewPitName(e.target.value)}
                  placeholder="e.g. Pit Delta Limonite Cut"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Pilih Site Induk:</label>
                <select
                  value={newPitSiteId}
                  onChange={(e) => setNewPitSiteId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                >
                  {sites.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.location})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Target Stripping Ratio (SR):</label>
                <input
                  type="number"
                  step="0.1"
                  value={newPitSR}
                  onChange={(e) => setNewPitSR(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddPitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Simpan Pit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DEPARTMENT */}
      {showAddDeptModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-lg">Tambah Departemen Baru</h3>
            <form onSubmit={handleCreateDept} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nama Departemen:</label>
                <input
                  type="text"
                  required
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  placeholder="e.g. Quality Control & Laboratory"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Kepala Departemen (HOD):</label>
                <input
                  type="text"
                  value={newDeptHead}
                  onChange={(e) => setNewDeptHead(e.target.value)}
                  placeholder="e.g. Dr. Ir. Gunawan, M.T."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddDeptModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Simpan Departemen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD USER */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-lg">Undang / Tambah User Seat Baru</h3>
            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nama Lengkap User:</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Ahmad Fauzi, S.T."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Email Perusahaan:</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="e.g. a.fauzi@smartmine.co.id"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Peran (Role Akses):</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                >
                  <option value="Mine Manager">Mine Manager</option>
                  <option value="Geologist">Geologist</option>
                  <option value="Operation Manager">Operation Manager</option>
                  <option value="Safety Officer">Safety Officer</option>
                  <option value="Fleet Manager">Fleet Manager</option>
                  <option value="Corporate Director">Corporate Director</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Kirim Undangan User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
