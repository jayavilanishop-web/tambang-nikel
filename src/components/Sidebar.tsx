import React from 'react';
import { 
  LayoutDashboard, 
  Pickaxe, 
  Truck, 
  Layers, 
  Ship, 
  Coins, 
  ShieldAlert, 
  FileText, 
  Smartphone, 
  Webhook, 
  KeyRound, 
  Building2,
  ChevronRight,
  X,
  Sparkles,
  Lock,
  Compass,
  Ruler,
  MapPin,
  Cpu,
  Warehouse,
  ShoppingBag,
  DollarSign,
  Users,
  Leaf,
  Briefcase,
  BarChart3,
  Bell,
  Scale,
  ShieldCheck,
  Crown
} from 'lucide-react';
import { Language, UserRole } from '../types';
import { 
  getRolePermissionConfig, 
  isModuleAllowedForRole 
} from '../utils/rolePermissions';

export type ActiveModule = 
  | 'dashboard' 
  | 'corporate_director'
  | 'commissioner'
  | 'ceo'
  | 'coo'
  | 'finance_director'
  | 'hr_director'
  | 'mine_manager'
  | 'operation_manager'
  | 'production_manager'
  | 'geologist'
  | 'mine_engineer'
  | 'mine_gpt'
  | 'operation'
  | 'multi_company'
  | 'exploration' 
  | 'survey'
  | 'weighbridge'
  | 'gps_telemetry'
  | 'iot_telemetry'
  | 'warehouse'
  | 'procurement'
  | 'finance'
  | 'hr'
  | 'fleet' 
  | 'stockpile' 
  | 'jetty' 
  | 'smelter' 
  | 'hse' 
  | 'environment'
  | 'security'
  | 'document'
  | 'project'
  | 'crm'
  | 'report'
  | 'notification'
  | 'rkab' 
  | 'offline' 
  | 'api_hub' 
  | 'saas_license'
  | 'auth_security';

interface SidebarProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  language: Language;
  currentUserRole?: UserRole;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  language,
  currentUserRole = 'Mine Manager',
  isOpenMobile,
  onCloseMobile
}) => {
  const [showAllModules, setShowAllModules] = React.useState(false);
  const [restrictedNoticeModule, setRestrictedNoticeModule] = React.useState<string | null>(null);

  const roleConfig = getRolePermissionConfig(currentUserRole);

  const menuItems = [
    {
      id: 'dashboard' as ActiveModule,
      labelId: 'Dasbor Analitik Real-Time',
      labelEn: 'Executive Analytics Dashboard',
      icon: LayoutDashboard,
      badge: '15 Sub-Modul',
      category: 'CORE'
    },
    {
      id: 'corporate_director' as ActiveModule,
      labelId: 'Dasbor Corporate Director',
      labelEn: 'Corporate Director Dashboard',
      icon: ShieldCheck,
      badge: 'Direksi Korporat',
      category: 'CORE'
    },
    {
      id: 'commissioner' as ActiveModule,
      labelId: 'Dasbor Commissioner',
      labelEn: 'Commissioner Dashboard',
      icon: Scale,
      badge: 'Dewan Komisaris',
      category: 'CORE'
    },
    {
      id: 'ceo' as ActiveModule,
      labelId: 'Dasbor CEO',
      labelEn: 'CEO Dashboard',
      icon: Crown,
      badge: 'Direktur Utama',
      category: 'CORE'
    },
    {
      id: 'coo' as ActiveModule,
      labelId: 'Dasbor COO',
      labelEn: 'COO Dashboard',
      icon: ShieldCheck,
      badge: 'Chief Operating Officer',
      category: 'CORE'
    },
    {
      id: 'finance_director' as ActiveModule,
      labelId: 'Dasbor Finance Director',
      labelEn: 'Finance Director Dashboard',
      icon: DollarSign,
      badge: 'Director Finance',
      category: 'CORE'
    },
    {
      id: 'hr_director' as ActiveModule,
      labelId: 'Dasbor HR Director',
      labelEn: 'HR Director Dashboard',
      icon: Users,
      badge: 'Director HR',
      category: 'CORE'
    },
    {
      id: 'mine_manager' as ActiveModule,
      labelId: 'Dasbor Mine Manager / KTT',
      labelEn: 'Mine Manager / KTT Dashboard',
      icon: Briefcase,
      badge: 'Kepala Teknik Tambang',
      category: 'CORE'
    },
    {
      id: 'operation_manager' as ActiveModule,
      labelId: 'Dasbor Operation Manager',
      labelEn: 'Operation Manager Dashboard',
      icon: Compass,
      badge: 'Ops Manager',
      category: 'CORE'
    },
    {
      id: 'production_manager' as ActiveModule,
      labelId: 'Dasbor Production Manager',
      labelEn: 'Production Manager Dashboard',
      icon: Pickaxe,
      badge: 'Production Manager',
      category: 'CORE'
    },
    {
      id: 'geologist' as ActiveModule,
      labelId: 'Dasbor Chief Geologist',
      labelEn: 'Chief Geologist Dashboard',
      icon: Compass,
      badge: 'Exploration & Geology',
      category: 'CORE'
    },
    {
      id: 'mine_engineer' as ActiveModule,
      labelId: 'Dasbor Mine Engineer',
      labelEn: 'Mine Engineer Dashboard',
      icon: Pickaxe,
      badge: 'Engineering & Pit',
      category: 'CORE'
    },
    {
      id: 'mine_gpt' as ActiveModule,
      labelId: 'MineGPT - Asisten Smart AI',
      labelEn: 'MineGPT Smart AI Assistant',
      icon: Sparkles,
      badge: '29 Engine AI',
      category: 'CORE'
    },
    {
      id: 'multi_company' as ActiveModule,
      labelId: 'Struktur Multi-Company & Site',
      labelEn: 'Multi-Company & Hierarchy',
      icon: Building2,
      badge: '13 Sub-Modul',
      category: 'CORE'
    },

    // OPERATIONS - MINE & PIT
    {
      id: 'operation' as ActiveModule,
      labelId: 'Pusat Operasional Pit & Hauling',
      labelEn: 'Integrated Mine Operations',
      icon: Compass,
      badge: '8 Sub-Modul',
      category: 'OPERATIONS'
    },
    {
      id: 'exploration' as ActiveModule,
      labelId: 'Pit & Model Blok Kadar',
      labelEn: 'Pit & Ore Block Model',
      icon: Pickaxe,
      badge: '9 Sub-Modul',
      category: 'OPERATIONS'
    },
    {
      id: 'survey' as ActiveModule,
      labelId: 'Survei Topografi & Drone',
      labelEn: 'Survey Topography & Drone',
      icon: Ruler,
      badge: '8 Sub-Modul',
      category: 'OPERATIONS'
    },
    {
      id: 'gps_telemetry' as ActiveModule,
      labelId: 'GPS & Telemetri Tracking',
      labelEn: 'GPS & Telemetry Tracking',
      icon: MapPin,
      badge: 'Live Satelit',
      category: 'OPERATIONS'
    },
    {
      id: 'iot_telemetry' as ActiveModule,
      labelId: 'IoT Sensor & Mesin Realtime',
      labelEn: 'IoT Sensor & Realtime Engine',
      icon: Cpu,
      badge: '128 Sensor',
      category: 'OPERATIONS'
    },
    {
      id: 'fleet' as ActiveModule,
      labelId: 'Fleet Alat Berat & BBM',
      labelEn: 'Heavy Fleet & Fuel',
      icon: Truck,
      badge: '42 Unit',
      category: 'OPERATIONS'
    },
    {
      id: 'stockpile' as ActiveModule,
      labelId: 'Stockpile & Blending AI',
      labelEn: 'Stockpile & Ore Blending AI',
      icon: Layers,
      badge: 'AI Smart',
      category: 'OPERATIONS'
    },
    {
      id: 'weighbridge' as ActiveModule,
      labelId: 'Pos Timbangan (Weighbridge)',
      labelEn: 'Digital Weighbridge Gate',
      icon: Scale,
      badge: 'IoT Realtime',
      category: 'OPERATIONS'
    },

    // SUPPLY CHAIN, WAREHOUSE & FINANCE
    {
      id: 'warehouse' as ActiveModule,
      labelId: 'Gudang & Inventaris FIFO',
      labelEn: 'Warehouse & Inventory FIFO',
      icon: Warehouse,
      badge: 'Barcode/QR',
      category: 'SUPPLY_FINANCE'
    },
    {
      id: 'procurement' as ActiveModule,
      labelId: 'Pengadaan, Tender & Vendor',
      labelEn: 'Procurement, Tender & Vendor',
      icon: ShoppingBag,
      badge: 'PR / RFQ / PO',
      category: 'SUPPLY_FINANCE'
    },
    {
      id: 'finance' as ActiveModule,
      labelId: 'Keuangan, Akuntansi & Pajak',
      labelEn: 'Finance, Accounting & Tax',
      icon: DollarSign,
      badge: 'IFRS / PSAK',
      category: 'SUPPLY_FINANCE'
    },
    {
      id: 'hr' as ActiveModule,
      labelId: 'SDM, Payroll, MCU & K3',
      labelEn: 'HR, Payroll, MCU & Safety',
      icon: Users,
      badge: '1.4k SDM',
      category: 'SUPPLY_FINANCE'
    },

    // COMMERCIAL & LOGISTICS
    {
      id: 'jetty' as ActiveModule,
      labelId: 'Jetty Barging & COA',
      labelEn: 'Jetty & Surveyor COA',
      icon: Ship,
      category: 'COMMERCIAL'
    },
    {
      id: 'smelter' as ActiveModule,
      labelId: 'Harga HPM & Royalty ESDM',
      labelEn: 'ESDM HPM & Smelter Sales',
      icon: Coins,
      category: 'COMMERCIAL'
    },
    {
      id: 'crm' as ActiveModule,
      labelId: 'CRM, Pelanggan & Kontrak',
      labelEn: 'CRM, Customer & Contract',
      icon: Users,
      badge: 'Commercial',
      category: 'COMMERCIAL'
    },

    // COMPLIANCE, SAFETY & REGULATORY
    {
      id: 'rkab' as ActiveModule,
      labelId: 'Generator Laporan RKAB AI',
      labelEn: 'AI ESDM RKAB Compiler',
      icon: FileText,
      badge: 'ESDM Format',
      category: 'COMPLIANCE'
    },
    {
      id: 'hse' as ActiveModule,
      labelId: 'Keselamatan K3LH & ESG',
      labelEn: 'HSE & ESG Safety',
      icon: ShieldAlert,
      badge: 'Zero LTI',
      category: 'COMPLIANCE'
    },
    {
      id: 'environment' as ActiveModule,
      labelId: 'Lingkungan, Karbon & Reklamasi',
      labelEn: 'Environment, Carbon & Rehab',
      icon: Leaf,
      badge: 'PROPER HIJAU',
      category: 'COMPLIANCE'
    },
    {
      id: 'security' as ActiveModule,
      labelId: 'Keamanan Site, Gate Pass & CCTV',
      labelEn: 'Site Security, Gate Pass & CCTV',
      icon: Lock,
      badge: 'CCTV AI',
      category: 'COMPLIANCE'
    },
    {
      id: 'document' as ActiveModule,
      labelId: 'Dokumen, CAD, OCR & Kontrak',
      labelEn: 'Document, CAD, OCR & Contract',
      icon: FileText,
      badge: 'EDMS Vault',
      category: 'COMPLIANCE'
    },
    {
      id: 'project' as ActiveModule,
      labelId: 'Proyek, Kanban, Gantt & Risiko',
      labelEn: 'Project, Kanban, Gantt & Risk',
      icon: Briefcase,
      badge: 'CAPEX PMO',
      category: 'COMPLIANCE'
    },

    // ANALYTICS & MOBILE
    {
      id: 'report' as ActiveModule,
      labelId: 'Laporan, Dashboard & Ekspor',
      labelEn: 'Report, Dashboard & Export',
      icon: BarChart3,
      badge: 'Analytics',
      category: 'ANALYTICS_MOBILE'
    },
    {
      id: 'notification' as ActiveModule,
      labelId: 'Notifikasi & Alert Realtime',
      labelEn: 'Notification & Realtime Alert',
      icon: Bell,
      badge: 'Omni-Channel',
      category: 'ANALYTICS_MOBILE'
    },
    {
      id: 'offline' as ActiveModule,
      labelId: 'Mode Offline Operator & PWA',
      labelEn: 'Field Operator Offline PWA',
      icon: Smartphone,
      category: 'ANALYTICS_MOBILE'
    },

    // SYSTEM, SECURITY & INTEGRATION
    {
      id: 'auth_security' as ActiveModule,
      labelId: 'Keamanan Siber & Modul RBAC',
      labelEn: 'Cyber Security & RBAC Module',
      icon: Lock,
      badge: 'AES-256 / WAF',
      category: 'ENTERPRISE'
    },
    {
      id: 'api_hub' as ActiveModule,
      labelId: 'API Hub & Third-Party Sync',
      labelEn: 'API Integration Hub',
      icon: Webhook,
      category: 'ENTERPRISE'
    },
    {
      id: 'saas_license' as ActiveModule,
      labelId: 'Lisensi & Server Engine',
      labelEn: 'License Key Manager',
      icon: KeyRound,
      badge: 'Server',
      category: 'ENTERPRISE'
    }
  ];

  const allowedCount = menuItems.filter(item => isModuleAllowedForRole(currentUserRole, item.id)).length;

  const categories = [
    { id: 'CORE', titleId: 'UTAMA & SMART AI', titleEn: 'CORE & AI SYSTEM' },
    { id: 'OPERATIONS', titleId: 'OPERASIONAL PIT & ALAT BERAT', titleEn: 'PIT & FLEET OPERATIONS' },
    { id: 'SUPPLY_FINANCE', titleId: 'LOGISTIK, GUDANG & KEUANGAN', titleEn: 'SUPPLY CHAIN & FINANCE' },
    { id: 'COMMERCIAL', titleId: 'KOMERSIAL, JETTY & SMELTER', titleEn: 'COMMERCIAL & JETTY SALES' },
    { id: 'COMPLIANCE', titleId: 'KEPATUHAN ESDM, K3LH & REKLAMASI', titleEn: 'ESDM COMPLIANCE & ESG' },
    { id: 'ANALYTICS_MOBILE', titleId: 'ANALITIK & MOBILE LAPANGAN', titleEn: 'ANALYTICS & FIELD PWA' },
    { id: 'ENTERPRISE', titleId: 'KEAMANAN SIBER & SISTEM', titleEn: 'CYBER SECURITY & SYSTEM' }
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    const isAllowed = isModuleAllowedForRole(currentUserRole, item.id);
    if (!isAllowed && !showAllModules) {
      setRestrictedNoticeModule(language === 'id' ? item.labelId : item.labelEn);
      return;
    }
    onSelectModule(item.id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Responsive Drawer Component */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-16 left-0 z-50 lg:z-10
        h-screen lg:h-[calc(100vh-4rem)] w-72
        bg-slate-900 border-r border-slate-800 text-slate-300
        flex flex-col transition-transform duration-300 ease-out
        ${isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Mobile Header Inside Sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
              NS
            </div>
            <span className="font-bold text-slate-100 text-sm">NickelSmart AI Navigation</span>
          </div>
          <button 
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List grouped by Category */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar">
          
          {/* Role Access Information Banner */}
          <div className="p-3 rounded-xl bg-slate-950/90 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AKSES ROLE AKTIF</span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                {allowedCount} / {menuItems.length} MODUL
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-extrabold text-white text-xs truncate" title={currentUserRole}>
                {roleConfig.label}
              </span>
            </div>

            <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed">
              {roleConfig.description}
            </p>

            <div className="pt-1.5 flex items-center justify-between border-t border-slate-800/80 text-[10px]">
              <button
                onClick={() => setShowAllModules(!showAllModules)}
                className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
              >
                {showAllModules ? '🔒 Filter Hanya Akses Role' : '👁️ Tampilkan Semua (Super Admin)'}
              </button>
            </div>
          </div>

          <div className="px-3 pb-1 border-b border-slate-800 flex items-center justify-between text-[10px] font-bold tracking-wider text-slate-400 uppercase">
            <span>{language === 'id' ? 'KATEGORI MODUL DILINDUNGI RBAC' : 'RBAC PROTECTED MODULES'}</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono font-bold text-[9px]">
              ROLE: {currentUserRole}
            </span>
          </div>

          {categories.map((cat) => {
            const rawCategoryItems = menuItems.filter(item => item.category === cat.id);
            const categoryItems = showAllModules 
              ? rawCategoryItems 
              : rawCategoryItems.filter(item => isModuleAllowedForRole(currentUserRole, item.id));

            if (categoryItems.length === 0) return null;
            const catTitle = language === 'id' ? cat.titleId : cat.titleEn;

            return (
              <div key={cat.id} className="space-y-1">
                <div className="px-3 pt-2 pb-1 text-[10px] font-extrabold tracking-wider text-emerald-400/90 uppercase flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>{catTitle}</span>
                </div>

                <div className="space-y-1 pl-1">
                  {categoryItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeModule === item.id;
                    const isAllowed = isModuleAllowedForRole(currentUserRole, item.id);
                    const label = language === 'id' ? item.labelId : item.labelEn;

                    return (
                      <button
                        key={item.id}
                        id={`btn-nav-module-${item.id}`}
                        onClick={() => handleItemClick(item)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold
                          transition-all group relative
                          ${isActive 
                            ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-950/50 ring-1 ring-emerald-400/30' 
                            : isAllowed 
                              ? 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/80'
                              : 'text-slate-500 hover:text-slate-400 bg-slate-950/40 opacity-70 hover:opacity-100'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${
                            isActive ? 'text-white' : isAllowed ? 'text-slate-400 group-hover:text-emerald-400' : 'text-slate-600'
                          }`} />
                          <span className="truncate text-left">{label}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {!isAllowed && (
                            <span className="p-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30" title="Akses Dibatasi Role">
                              <Lock className="w-3 h-3" />
                            </span>
                          )}

                          {isAllowed && item.badge && (
                            <span className={`
                              text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider
                              ${isActive 
                                ? 'bg-white/20 text-white' 
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }
                            `}>
                              {item.badge}
                            </span>
                          )}
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Notice: Restricted Access */}
        {restrictedNoticeModule && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border-2 border-rose-500/50 shadow-2xl text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  AKSES MODUL DIBATASI (RBAC)
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Akses Modul "{restrictedNoticeModule}" Diperlukan
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Peran aktif Anda saat ini (<strong className="text-emerald-400">{currentUserRole}</strong>) tidak memiliki kewenangan membuka modul ini. Silakan ubah peran di Header atau minta hak akses dari Super Admin.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setRestrictedNoticeModule(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    setShowAllModules(true);
                    setRestrictedNoticeModule(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold transition-all shadow-lg"
                >
                  Buka Dalam Mode Super Admin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sidebar Footer Info */}
        <div className="p-3 m-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NickelSmart AI Engine</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {language === 'id' 
              ? 'Sistem terintegrasi ESDM RKAB, HPM Benchmark & Sucofindo COA.' 
              : 'Integrated ESDM RKAB, HPM Benchmark & Surveyor COA.'}
          </p>
        </div>

      </aside>

      {/* Mobile Bottom Quick Access Bar for Field Operators */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around lg:hidden text-[10px]">
        <button
          onClick={() => onSelectModule('dashboard')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg ${activeModule === 'dashboard' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dasbor</span>
        </button>
        <button
          onClick={() => onSelectModule('stockpile')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg ${activeModule === 'stockpile' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          <Layers className="w-4 h-4" />
          <span>Blending</span>
        </button>
        <button
          onClick={() => onSelectModule('fleet')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg ${activeModule === 'fleet' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          <Truck className="w-4 h-4" />
          <span>Fleet</span>
        </button>
        <button
          onClick={() => onSelectModule('offline')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg ${activeModule === 'offline' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Offline</span>
        </button>
        <button
          onClick={() => onSelectModule('saas_license')}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg ${activeModule === 'saas_license' ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Lisensi</span>
        </button>
      </nav>
    </>
  );
};
