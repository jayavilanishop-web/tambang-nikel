import React, { useState } from 'react';
import { 
  Building2, 
  KeyRound, 
  Sparkles, 
  Bell, 
  Wifi, 
  WifiOff, 
  Sun, 
  Moon, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  UserCheck, 
  ChevronDown,
  Menu,
  Activity,
  Search
} from 'lucide-react';
import { LicenseInfo, Language, ThemeMode, UserRole, PushNotification } from '../types';
import { formatUSD } from '../utils/hpmCalculator';
import { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  licenseInfo: LicenseInfo;
  onOpenLicenseModal: () => void;
  onOpenAIDrawer: () => void;
  onToggleNotifications: () => void;
  notifications: PushNotification[];
  isOnline: boolean;
  onToggleOnlineStatus: () => void;
  language: Language;
  onToggleLanguage: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  onToggleMobileSidebar: () => void;
  onGoToLandingPage?: () => void;
  firebaseUser?: FirebaseUser | null;
  onGoogleSignIn?: () => void;
  onSignOut?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  licenseInfo,
  onOpenLicenseModal,
  onOpenAIDrawer,
  onToggleNotifications,
  notifications,
  isOnline,
  onToggleOnlineStatus,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  currentUserRole,
  onChangeUserRole,
  onToggleMobileSidebar,
  onGoToLandingPage,
  firebaseUser,
  onGoogleSignIn,
  onSignOut
}) => {
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [roleSearch, setRoleSearch] = useState('');
  const unreadCount = notifications.filter(n => !n.read).length;

  const rolesList: UserRole[] = [
    'Super Admin',
    'License Owner',
    'Company Owner',
    'Corporate Director',
    'Commissioner',
    'CEO',
    'COO',
    'Finance Director',
    'HR Director',
    'Mine Manager',
    'Operation Manager',
    'Production Manager',
    'Geologist',
    'Mine Engineer',
    'Surveyor',
    'Dispatcher',
    'Fleet Manager',
    'Workshop Manager',
    'Maintenance Manager',
    'Warehouse',
    'Purchasing',
    'Inventory',
    'Quality Control',
    'Laboratory',
    'Safety Officer',
    'HSE Manager',
    'Security',
    'Medical',
    'Environment Officer',
    'Community Development',
    'Legal',
    'Accounting',
    'Finance',
    'Payroll',
    'Tax',
    'Auditor',
    'Vendor',
    'Supplier',
    'Transporter',
    'Client',
    'Guest',
    'Employee'
  ];

  const filteredRoles = rolesList.filter(role => 
    role.toLowerCase().includes(roleSearch.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md border-b transition-colors duration-200 bg-slate-900/95 border-slate-800 text-slate-100 shadow-lg">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          
          {/* Left: Mobile Menu Trigger & Logo Branding */}
          <div className="flex items-center gap-3">
            <button
              id="btn-mobile-sidebar-toggle"
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900 p-0.5 shadow-md shadow-emerald-900/30">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
                    NickelSmart AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  {language === 'id' ? 'Enterprise Nickel Mining ERP & AI' : 'Enterprise Nickel ERP Platform'}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Live HPM Price Ticker (Hidden on small mobile) */}
          <div className="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>HPM Nikel ESDM:</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200 font-mono">
              <span>HMA: <strong className="text-white">$16,450/dmt</strong></span>
              <span className="text-slate-600">|</span>
              <span>Saprolite 1.8% Ni: <strong className="text-emerald-400">$52.64/dmt</strong></span>
            </div>
          </div>

          {/* Right: Commercial Controls & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Landing Page Toggle */}
            {onGoToLandingPage && (
              <button
                onClick={onGoToLandingPage}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-900/60 border border-indigo-700/80 text-indigo-200 hover:bg-indigo-800 text-xs font-semibold shadow-sm transition-all"
                title="Kembali ke Landing Page / Portal Login"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Landing Page</span>
              </button>
            )}

            {/* License Key Badge */}
            <button
              id="btn-header-license-modal"
              onClick={onOpenLicenseModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/90 border border-emerald-700/50 text-emerald-300 text-xs font-medium transition-all shadow-sm"
              title="Kelola Lisensi Komersial NickelSmart AI"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline font-mono text-[11px] font-semibold">{licenseInfo.tier}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-200">
                {licenseInfo.status}
              </span>
            </button>

            {/* AI Assistant Quick Trigger */}
            <button
              id="btn-header-ai-assistant"
              onClick={onOpenAIDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-md shadow-emerald-900/30 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
              <span className="hidden xs:inline">Smart AI</span>
            </button>

            {/* Offline/Online Network Switcher Simulator */}
            <button
              id="btn-header-online-status-toggle"
              onClick={onToggleOnlineStatus}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                isOnline 
                  ? 'bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700' 
                  : 'bg-amber-950 border-amber-700 text-amber-300 animate-pulse'
              }`}
              title={isOnline ? 'Online (Terhubung Sistem Central)' : 'Mode Offline Lapangan Active (Simulasi)'}
            >
              {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            </button>

            {/* Real-Time Push Notification Bell */}
            <button
              id="btn-header-notifications-toggle"
              onClick={onToggleNotifications}
              className="relative p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Push Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <button
              id="btn-header-language-toggle"
              onClick={onToggleLanguage}
              className="hidden sm:flex items-center gap-1 p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 text-xs font-semibold uppercase"
              title="Ganti Bahasa (ID / EN)"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{language}</span>
            </button>

            {/* User Role Switcher Dropdown */}
            <div className="relative">
              <button
                id="btn-header-user-role-dropdown"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 text-xs font-medium"
              >
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline max-w-[110px] truncate">{currentUserRole}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-2 z-50 text-xs">
                  <div className="px-3 py-1.5 border-b border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>{language === 'id' ? 'Pilih Peran Pengguna' : 'Switch Role View'}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{rolesList.length} Roles</span>
                  </div>
                  
                  {/* Search Input */}
                  <div className="p-2 border-b border-slate-800">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={roleSearch}
                        onChange={(e) => setRoleSearch(e.target.value)}
                        placeholder="Cari peran..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="max-h-64 overflow-y-auto custom-scrollbar">
                    {filteredRoles.length === 0 ? (
                      <div className="px-3 py-3 text-slate-500 text-center text-xs">
                        Tidak ada peran ditemukan
                      </div>
                    ) : (
                      filteredRoles.map(role => (
                        <button
                          key={role}
                          onClick={() => {
                            onChangeUserRole(role);
                            setShowRoleDropdown(false);
                            setRoleSearch('');
                          }}
                          className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-slate-800 transition-colors ${
                            currentUserRole === role ? 'text-emerald-400 font-bold bg-slate-800/50' : 'text-slate-300'
                          }`}
                        >
                          <span>{role}</span>
                          {currentUserRole === role && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Firebase Google Auth User Profile / Sign In */}
            {firebaseUser ? (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
                {firebaseUser.photoURL ? (
                  <img 
                    src={firebaseUser.photoURL} 
                    alt={firebaseUser.displayName || 'User'} 
                    className="w-7 h-7 rounded-full border border-emerald-500/50 object-cover" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    {(firebaseUser.displayName || firebaseUser.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-slate-200 leading-tight max-w-[120px] truncate">
                    {firebaseUser.displayName || firebaseUser.email?.split('@')[0]}
                  </span>
                  <span className="text-[9px] text-emerald-400 font-mono">Firebase Verified</span>
                </div>
                {onSignOut && (
                  <button 
                    onClick={onSignOut} 
                    className="text-[10px] text-slate-400 hover:text-red-400 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 transition-colors"
                    title="Sign Out Firebase"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : onGoogleSignIn ? (
              <button
                onClick={onGoogleSignIn}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-indigo-200 text-xs font-semibold transition-all"
                title="Login with Google Cloud Auth"
              >
                <span>Google Auth</span>
              </button>
            ) : null}

          </div>

        </div>
      </div>
    </header>
  );
};
