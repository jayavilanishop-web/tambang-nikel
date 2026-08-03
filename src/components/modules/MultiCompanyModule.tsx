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
  Filter
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
  const [activeTab, setActiveTab] = useState<'companies' | 'sites' | 'pits' | 'departments' | 'users'>('companies');
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

      {/* Navigation Tabs Bar */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('companies')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'companies' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Multi-Company ({companies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('sites')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'sites' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Sites ({sites.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('pits')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'pits' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Pickaxe className="w-4 h-4" />
            <span>Mine Pits ({pits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'departments' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Departments ({departments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'users' ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Users & Staff ({users.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-48 shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari entitas..."
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
                    <strong className="text-slate-200 font-mono">{site.concessionSizeHa.toLocaleString()} Ha</strong>
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
                    <strong className="text-slate-200 font-mono">{pit.overburdenMTToday.toLocaleString()} MT</strong>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Produksi Ore Saprolite:</span>
                    <strong className="text-emerald-400 font-mono">{pit.saproliteMTToday.toLocaleString()} MT</strong>
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
