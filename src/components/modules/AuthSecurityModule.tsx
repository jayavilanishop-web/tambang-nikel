import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Lock, 
  Mail, 
  Smartphone, 
  Fingerprint, 
  QrCode, 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  Laptop, 
  Building, 
  Check, 
  X, 
  ChevronRight, 
  Sliders, 
  Sparkles,
  Download,
  Search,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserRole, UserSession, AuditLoginLog, Language } from '../../types';

interface AuthSecurityModuleProps {
  currentUserRole: UserRole;
  onChangeUserRole: (role: UserRole) => void;
  sessions: UserSession[];
  auditLogs: AuditLoginLog[];
  language: Language;
  onRevokeSession: (sessionId: string) => void;
}

export const AuthSecurityModule: React.FC<AuthSecurityModuleProps> = ({
  currentUserRole,
  onChangeUserRole,
  sessions,
  auditLogs,
  language,
  onRevokeSession
}) => {
  const [activeTab, setActiveTab] = useState<'login_portal' | 'otp_2fa' | 'biometrics' | 'rbac_matrix' | 'session_audit'>('login_portal');

  // Login Simulator State
  const [loginMethod, setLoginMethod] = useState<'EMAIL' | 'PHONE' | 'GOOGLE' | 'MICROSOFT'>('EMAIL');
  const [emailInput, setEmailInput] = useState('p.soebagyo@nickelsmart.co.id');
  const [phoneInput, setPhoneInput] = useState('+62 812-8899-2026');
  const [passwordInput, setPasswordInput] = useState('NickelSmart#2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(60);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  // Biometric State
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [fingerprintEnabled, setFingerprintEnabled] = useState(true);
  const [biometricTesting, setBiometricTesting] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState<string | null>(null);

  // RBAC Filter
  const [selectedRoleForMatrix, setSelectedRoleForMatrix] = useState<UserRole>('Mine Manager');

  // Matrix Permissions Data Structure
  const SYSTEM_MODULES = [
    { id: 'dashboard', name: 'Dashboard & Executive KPI' },
    { id: 'multi_company', name: 'Struktur Multi-Company & Holding' },
    { id: 'exploration', name: 'Pit & Ore Block Model (Kadar Ni/Fe)' },
    { id: 'fleet', name: 'Heavy Equipment Fleet & Telemetri BBM' },
    { id: 'stockpile', name: 'Stockpile & Smart Ore Blending AI' },
    { id: 'jetty', name: 'Jetty Barging & Sucofindo COA' },
    { id: 'hpm', name: 'Kalkulator HPM Nikel & Royalty ESDM' },
    { id: 'rkab', name: 'Generator Laporan RKAB ESDM AI' },
    { id: 'offline', name: 'Field Operator Offline Sync' },
    { id: 'license', name: 'License Server & Device Limit' },
    { id: 'api_hub', name: 'API Integration Hub (SAP/Oracle)' },
    { id: 'security', name: 'Authentication & Session Audit' }
  ];

  // Role Default Permissions Map Simulation
  const [permissionsMap, setPermissionsMap] = useState<Record<string, { read: boolean; write: boolean; delete: boolean; admin: boolean }>>(() => {
    const map: Record<string, { read: boolean; write: boolean; delete: boolean; admin: boolean }> = {};
    SYSTEM_MODULES.forEach(mod => {
      map[mod.id] = {
        read: true,
        write: mod.id !== 'license' && mod.id !== 'security',
        delete: mod.id === 'exploration' || mod.id === 'fleet',
        admin: false
      };
    });
    return map;
  });

  const handleTogglePermission = (moduleId: string, permType: 'read' | 'write' | 'delete' | 'admin') => {
    setPermissionsMap(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        [permType]: !prev[moduleId][permType]
      }
    }));
  };

  const handleSimulateLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setOtpStep(true);
    }, 1000);
  };

  const handleVerifyOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === '123456' || otpCode.length === 6) {
      setLoginSuccessMessage('Autentikasi 2FA Berhasil! Sesi JWT Terbit.');
      setTimeout(() => {
        setOtpStep(false);
        setOtpCode('');
      }, 2000);
    } else {
      alert('Kode OTP salah! Gunakan kode 123456 untuk simulasi.');
    }
  };

  const handleTestBiometric = () => {
    setBiometricTesting(true);
    setBiometricStatus(null);
    setTimeout(() => {
      setBiometricTesting(false);
      setBiometricStatus('Sertifikat Biometrik WebAuthn Valid! Passkey Terkonfirmasi.');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Identity & Access Management (IAM)
            </span>
            <span className="text-slate-400 text-xs">• SSO, 2FA, Biometrics & Granular RBAC Matrix</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Sistem Autentikasi, Keamanan & Hak Akses (RBAC)' : 'Authentication, Security & RBAC Engine'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Aktif Peran:</span>
          <span className="px-3 py-1.5 rounded-xl bg-purple-500/20 text-purple-300 font-bold text-xs border border-purple-500/40 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4" />
            {currentUserRole}
          </span>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('login_portal')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'login_portal' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>Multi-Method SSO Login</span>
        </button>

        <button
          onClick={() => setActiveTab('otp_2fa')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'otp_2fa' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>2FA & OTP Authenticator</span>
        </button>

        <button
          onClick={() => setActiveTab('biometrics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'biometrics' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Fingerprint className="w-4 h-4" />
          <span>Biometric & Passkey</span>
        </button>

        <button
          onClick={() => setActiveTab('rbac_matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'rbac_matrix' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Matriks Hak Akses RBAC (42 Roles)</span>
        </button>

        <button
          onClick={() => setActiveTab('session_audit')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'session_audit' ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Sessions & Audit Log ({sessions.length})</span>
        </button>
      </div>

      {/* TAB 1: MULTI-METHOD LOGIN PORTAL */}
      {activeTab === 'login_portal' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-base">Portal Autentikasi Pengguna Enterprise</h3>
              <p className="text-xs text-slate-400">Dukungan Email, SMS/WhatsApp OTP, Google Workspace & Microsoft Entra ID</p>
            </div>

            {/* Method Select Buttons */}
            <div className="grid grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setLoginMethod('EMAIL')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  loginMethod === 'EMAIL' ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod('PHONE')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  loginMethod === 'PHONE' ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>Phone OTP</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod('GOOGLE')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  loginMethod === 'GOOGLE' ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Shield className="w-4 h-4 text-rose-400" />
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMethod('MICROSOFT')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                  loginMethod === 'MICROSOFT' ? 'bg-purple-600/20 border-purple-500 text-purple-300 font-bold' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Building className="w-4 h-4 text-blue-400" />
                <span>Microsoft</span>
              </button>
            </div>

            {/* Form Fields */}
            {!otpStep ? (
              <form onSubmit={handleSimulateLoginSubmit} className="space-y-4 text-xs">
                {loginMethod === 'EMAIL' && (
                  <>
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">Alamat Email Perusahaan:</label>
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">Kata Sandi (Password):</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {loginMethod === 'PHONE' && (
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Nomor WhatsApp / HP Operator (+62):</label>
                    <input
                      type="text"
                      required
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono"
                    />
                  </div>
                )}

                {(loginMethod === 'GOOGLE' || loginMethod === 'MICROSOFT') && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                    <p className="text-slate-300">
                      Anda akan dialihkan ke SSO {loginMethod === 'GOOGLE' ? 'Google Workspace' : 'Microsoft Entra ID'}.
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono">Domain: smartmine.co.id</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isLoggingIn ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Memproses Autentikasi...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Masuk & Minta Kode 2FA OTP</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtpSubmit} className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold">
                    <Smartphone className="w-4 h-4 text-purple-400" />
                    <span>Masukkan 6-Digit Kode OTP 2FA:</span>
                  </div>
                  <p className="text-[11px] text-purple-300">
                    Kode verifikasi telah dikirim ke {loginMethod === 'PHONE' ? phoneInput : emailInput}.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="1 2 3 4 5 6"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-center text-xl font-mono tracking-widest text-emerald-400 font-bold focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2">
                    <button
                      type="button"
                      onClick={() => setOtpCode('123456')}
                      className="text-purple-400 hover:underline font-semibold"
                    >
                      + Isi Kode Demo (123456)
                    </button>
                    <span>Kirim Ulang: {otpCountdown}s</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verifikasi & Terbitkan Token Sesi</span>
                </button>
              </form>
            )}

            {loginSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{loginSuccessMessage}</span>
              </div>
            )}
          </div>

          {/* Security Features Info Card */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-100 text-base border-b border-slate-800 pb-2">Fitur Keamanan Identity Provider (IdP)</h3>
            
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Enkripsi Token JWT RS256</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Aktif</span>
                </div>
                <p className="text-slate-400 text-[11px]">Setiap sesi terenkripsi dengan private key RSA 2048-bit dan kadaluarsa otomatis dalam 8 jam.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">Perlindungan Brute-Force & IP Throttling</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Aktif</span>
                </div>
                <p className="text-slate-400 text-[11px]">Membatasi percobaan login maksimum 5x gagal sebelum memblokir alamat IP selama 15 menit.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">WebAuthn Biometric Passkey Ready</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">Hardware Level</span>
                </div>
                <p className="text-slate-400 text-[11px]">Dukungan sensor sidik jari Touch ID / Windows Hello / Face ID pada perangkat lapangan.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 2FA & OTP AUTHENTICATOR */}
      {activeTab === 'otp_2fa' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-slate-100 text-base">Two-Factor Authentication (2FA) & TOTP App Sync</h3>
              <p className="text-xs text-slate-400">Konfigurasi Google Authenticator, Microsoft Authenticator, atau WhatsApp OTP</p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
              STATUS: 2FA ENFORCED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* TOTP Secret Key Generator */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-slate-200 font-bold">
                <QrCode className="w-5 h-5 text-purple-400" />
                <span>Pindai QR Code di Aplikasi Authenticator:</span>
              </div>

              <div className="flex items-center justify-center p-4 bg-white rounded-xl w-40 h-40 mx-auto shadow-lg">
                {/* QR Code Graphic Placeholder */}
                <div className="w-32 h-32 bg-slate-900 rounded p-2 flex flex-col items-center justify-center text-center text-[10px] text-purple-300 font-mono">
                  <QrCode className="w-16 h-16 text-purple-400 mb-1" />
                  <span>SMARTMINE-2FA</span>
                </div>
              </div>

              <div className="space-y-1 text-center">
                <span className="text-slate-400 text-[11px]">Kunci Rahasia Manual (Secret Key):</span>
                <code className="block bg-slate-900 border border-slate-800 px-3 py-1.5 rounded font-mono font-bold text-purple-300 text-xs">
                  JBSWY3DPEHPK3PXP
                </code>
              </div>
            </div>

            {/* OTP Channels */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 text-sm">Saluran Pengiriman OTP Yang Tersedia:</h4>
              
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200">WhatsApp Gateway (Morowali Node)</span>
                  <p className="text-[11px] text-slate-400">Terkirim ke +62 812-8899-2026</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Aktif</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200">SMS Gateway Seluler (Telkomsel Site)</span>
                  <p className="text-[11px] text-slate-400">Backup otomatis saat sinyal internet lemah</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">Aktif</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-200">Time-based One-Time Password (TOTP)</span>
                  <p className="text-[11px] text-slate-400">Aplikasi Authenticator tanpa membutuhkan sinyal seluler</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">Direkomendasikan</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BIOMETRIC & PASSKEY */}
      {activeTab === 'biometrics' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-slate-100 text-base">Modul Biometrik Wajah & Sidik Jari (WebAuthn)</h3>
            <p className="text-xs text-slate-400">Akses tanpa kata sandi (Passwordless) untuk perangkat Toughbook & Tablet Lapangan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-slate-200">Sensor Sidik Jari (Fingerprint Scanner)</span>
                </div>
                <input
                  type="checkbox"
                  checked={fingerprintEnabled}
                  onChange={(e) => setFingerprintEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-purple-600"
                />
              </div>
              <p className="text-slate-400 text-[11px]">Mengizinkan operator lapangan membuka aplikasi menggunakan scanner biometrik USB / Toughbook hardware.</p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-slate-200">Pengenalan Wajah (Face ID Ready)</span>
                </div>
                <input
                  type="checkbox"
                  checked={faceIdEnabled}
                  onChange={(e) => setFaceIdEnabled(e.target.checked)}
                  className="w-4 h-4 rounded accent-purple-600"
                />
              </div>
              <p className="text-slate-400 text-[11px]">Pengenalan wajah otomatis untuk otorisasi cepat di area pengimbangan Jetty dan Control Room.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-200 text-sm">Uji Verifikasi Biometrik Perangkat</h4>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleTestBiometric}
                disabled={biometricTesting}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
              >
                {biometricTesting ? <Sparkles className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
                <span>Simulasi Sensitivitas Biometrik</span>
              </button>
              {biometricStatus && (
                <span className="text-xs text-emerald-400 font-semibold">{biometricStatus}</span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: RBAC PERMISSION MATRIX (42 ROLES) */}
      {activeTab === 'rbac_matrix' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-slate-100 text-base">Matriks Granular Hak Akses Peran (RBAC)</h3>
              <p className="text-xs text-slate-400">Atur izin Read / Write / Delete / Admin untuk 42 Peran Struktur Organisasi Tambang</p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedRoleForMatrix}
                onChange={(e) => setSelectedRoleForMatrix(e.target.value as UserRole)}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 text-xs font-bold"
              >
                {[
                  'Super Admin', 'License Owner', 'Company Owner', 'Corporate Director', 'Mine Manager',
                  'Operation Manager', 'Production Manager', 'Geologist', 'Mine Engineer', 'Surveyor',
                  'Dispatcher', 'Fleet Manager', 'Workshop Manager', 'Maintenance Manager', 'Warehouse',
                  'Safety Officer', 'HSE Manager', 'Laboratory', 'Quality Control', 'Vendor', 'Employee'
                ].map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>

              <button
                onClick={() => {
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(permissionsMap, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `rbac_matrix_${selectedRoleForMatrix}.json`);
                  downloadAnchor.click();
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
            </div>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto custom-scrollbar border border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Modul Sistem NickelSmart AI</th>
                  <th className="p-3 text-center">Read (Lihat)</th>
                  <th className="p-3 text-center">Write (Ubah/Input)</th>
                  <th className="p-3 text-center">Delete (Hapus)</th>
                  <th className="p-3 text-center">Admin (Otorisasi Khusus)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {SYSTEM_MODULES.map(mod => {
                  const perm = permissionsMap[mod.id] || { read: true, write: false, delete: false, admin: false };
                  return (
                    <tr key={mod.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3 font-sans font-semibold text-slate-200">{mod.name}</td>
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={perm.read}
                          onChange={() => handleTogglePermission(mod.id, 'read')}
                          className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={perm.write}
                          onChange={() => handleTogglePermission(mod.id, 'write')}
                          className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={perm.delete}
                          onChange={() => handleTogglePermission(mod.id, 'delete')}
                          className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                        />
                      </td>
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={perm.admin}
                          onChange={() => handleTogglePermission(mod.id, 'admin')}
                          className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: SESSIONS & AUDIT LOG */}
      {activeTab === 'session_audit' && (
        <div className="space-y-6">
          {/* Active Sessions List */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-base border-b border-slate-800 pb-3">Sesi Login Pengguna Aktif</h3>
            <div className="space-y-2 text-xs">
              {sessions.map(ses => (
                <div key={ses.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100">{ses.userName}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">
                        {ses.role}
                      </span>
                      {ses.isCurrent && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Sesi Perangkat Ini
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 font-mono text-[11px]">{ses.userEmail} • {ses.deviceInfo}</p>
                    <p className="text-slate-500 text-[10px]">IP: {ses.ipAddress} | Lokasi: {ses.location}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-[11px] font-mono">{ses.lastActivity}</span>
                    <button
                      onClick={() => onRevokeSession(ses.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold flex items-center gap-1.5 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Putuskan Sesi</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-base border-b border-slate-800 pb-3">Audit Log Login & Keamanan</h3>
            <div className="overflow-x-auto custom-scrollbar border border-slate-800 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3">Waktu</th>
                    <th className="p-3">User Email</th>
                    <th className="p-3">Peran</th>
                    <th className="p-3">Metode Autentikasi</th>
                    <th className="p-3">IP Address</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {auditLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-800/30">
                      <td className="p-3 text-slate-400 text-[11px]">{log.timestamp}</td>
                      <td className="p-3 text-slate-200 font-bold">{log.userEmail}</td>
                      <td className="p-3 text-purple-300">{log.role}</td>
                      <td className="p-3 text-slate-300">{log.method}</td>
                      <td className="p-3 text-slate-400">{log.ipAddress}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'SUCCESS' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
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

    </div>
  );
};
