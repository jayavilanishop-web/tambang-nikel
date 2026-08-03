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
  Bell
} from 'lucide-react';
import { Language } from '../types';

export type ActiveModule = 
  | 'dashboard' 
  | 'mine_gpt'
  | 'operation'
  | 'multi_company'
  | 'exploration' 
  | 'survey'
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
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onSelectModule,
  language,
  isOpenMobile,
  onCloseMobile
}) => {
  const menuItems = [
    {
      id: 'dashboard' as ActiveModule,
      labelId: 'Dasbor Analitik Real-Time',
      labelEn: 'Executive Dashboard',
      icon: LayoutDashboard,
      badge: 'Live',
      category: 'CORE'
    },
    {
      id: 'mine_gpt' as ActiveModule,
      labelId: 'MineGPT - Asisten Smart AI',
      labelEn: 'MineGPT Smart AI Assistant',
      icon: Sparkles,
      badge: '29 Engine',
      category: 'CORE'
    },
    {
      id: 'multi_company' as ActiveModule,
      labelId: 'Struktur Multi-Company & Site',
      labelEn: 'Multi-Company & Hierarchy',
      icon: Building2,
      badge: 'Holding',
      category: 'CORE'
    },
    {
      id: 'operation' as ActiveModule,
      labelId: 'Pusat Operasional Pit & Hauling',
      labelEn: 'Integrated Mine Operations',
      icon: Compass,
      badge: 'IMOC',
      category: 'OPERATIONS'
    },
    {
      id: 'exploration' as ActiveModule,
      labelId: 'Pit & Model Blok Kadar',
      labelEn: 'Pit & Ore Block Model',
      icon: Pickaxe,
      category: 'OPERATIONS'
    },
    {
      id: 'survey' as ActiveModule,
      labelId: 'Survei Topografi & Drone',
      labelEn: 'Survey Topography & Drone',
      icon: Ruler,
      badge: 'Drone LiDAR',
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
      id: 'warehouse' as ActiveModule,
      labelId: 'Gudang & Inventaris FIFO',
      labelEn: 'Warehouse & Inventory FIFO',
      icon: Warehouse,
      badge: 'Barcode/QR',
      category: 'OPERATIONS'
    },
    {
      id: 'procurement' as ActiveModule,
      labelId: 'Pengadaan, Tender & Vendor',
      labelEn: 'Procurement, Tender & Vendor',
      icon: ShoppingBag,
      badge: 'PR / RFQ / PO',
      category: 'OPERATIONS'
    },
    {
      id: 'finance' as ActiveModule,
      labelId: 'Keuangan, Akuntansi & Pajak',
      labelEn: 'Finance, Accounting & Tax',
      icon: DollarSign,
      badge: 'IFRS / PSAK',
      category: 'OPERATIONS'
    },
    {
      id: 'hr' as ActiveModule,
      labelId: 'SDM, Payroll, MCU & K3',
      labelEn: 'HR, Payroll, MCU & Safety',
      icon: Users,
      badge: '1.4k SDM',
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
      id: 'jetty' as ActiveModule,
      labelId: 'Jetty Barging & COA',
      labelEn: 'Jetty & Surveyor COA',
      icon: Ship,
      category: 'LOGISTICS'
    },
    {
      id: 'smelter' as ActiveModule,
      labelId: 'Harga HPM & Royalty ESDM',
      labelEn: 'ESDM HPM & Smelter Sales',
      icon: Coins,
      category: 'COMMERCIAL'
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
    {
      id: 'crm' as ActiveModule,
      labelId: 'CRM, Pelanggan, Kontrak & Invoice',
      labelEn: 'CRM, Customer, Contract & Invoice',
      icon: Users,
      badge: 'Commercial',
      category: 'BUSINESS'
    },
    {
      id: 'report' as ActiveModule,
      labelId: 'Laporan, Dashboard, Ekspor & Email',
      labelEn: 'Report, Dashboard, Export & Email',
      icon: BarChart3,
      badge: 'Analytics',
      category: 'ANALYTICS'
    },
    {
      id: 'notification' as ActiveModule,
      labelId: 'Notifikasi, WA, SMS & Alert Realtime',
      labelEn: 'Notification, WA, SMS & Realtime Alert',
      icon: Bell,
      badge: 'Omni-Channel',
      category: 'ANALYTICS'
    },
    {
      id: 'rkab' as ActiveModule,
      labelId: 'Generator Laporan RKAB AI',
      labelEn: 'AI ESDM RKAB Compiler',
      icon: FileText,
      badge: 'ESDM Format',
      category: 'COMPLIANCE'
    },
    {
      id: 'offline' as ActiveModule,
      labelId: 'Mode Offline Operator',
      labelEn: 'Field Operator Offline',
      icon: Smartphone,
      category: 'MOBILE_FIELD'
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
    },
    {
      id: 'auth_security' as ActiveModule,
      labelId: 'Autentikasi & RBAC Security',
      labelEn: 'Auth, SSO & Permissions',
      icon: Lock,
      badge: '2FA/SSO',
      category: 'ENTERPRISE'
    }
  ];

  const handleItemClick = (id: ActiveModule) => {
    onSelectModule(id);
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
              SM
            </div>
            <span className="font-bold text-slate-100 text-sm">SmartMine AI Navigation</span>
          </div>
          <button 
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
          
          <div className="px-3 pb-2 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            {language === 'id' ? 'MODUL ERP TAMBANG NIKEL' : 'NICKEL ERP MODULES'}
          </div>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            const label = language === 'id' ? item.labelId : item.labelEn;

            return (
              <button
                key={item.id}
                id={`btn-nav-module-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold
                  transition-all group relative
                  ${isActive 
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md shadow-emerald-950/50' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                  }
                `}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                  <span className="truncate text-left">{label}</span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {item.badge && (
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

        {/* Sidebar Footer Info */}
        <div className="p-3 m-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SmartMine AI Engine</span>
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
