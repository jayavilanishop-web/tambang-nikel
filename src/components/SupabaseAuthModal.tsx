import React, { useState } from 'react';
import { 
  Database, 
  Key, 
  Mail, 
  Lock, 
  UserCheck, 
  Building, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  RefreshCw,
  LogOut,
  Fingerprint
} from 'lucide-react';
import { 
  signInWithSupabase, 
  signUpWithSupabase, 
  signOutSupabase, 
  getSupabaseConfig, 
  SupabaseAuthUser 
} from '../lib/supabase';
import { UserRole } from '../types';

interface SupabaseAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: SupabaseAuthUser, role: UserRole) => void;
  currentUser: SupabaseAuthUser | null;
  onSignOut: () => void;
  onOpenDeveloperConfig?: () => void;
}

export const SupabaseAuthModal: React.FC<SupabaseAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  currentUser,
  onSignOut,
  onOpenDeveloperConfig
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'demo'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('PT NickelSmart Nusantara');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Mine Manager');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const config = getSupabaseConfig();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const { user, error } = await signInWithSupabase(email, password);
    setLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Gagal login dengan akun Supabase. Periksa kembali email dan kata sandi Anda.');
      return;
    }

    if (user) {
      setSuccessMessage('Autentikasi Supabase Berhasil! Sesi JWT Terbit.');
      const userRole = (user.user_metadata?.role as UserRole) || 'Mine Manager';
      setTimeout(() => {
        onAuthSuccess(user, userRole);
        onClose();
      }, 800);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const { user, error } = await signUpWithSupabase(email, password, {
      fullName,
      role: selectedRole,
      companyName
    });
    setLoading(false);

    if (error) {
      setErrorMessage(error.message || 'Gagal mendaftarkan akun baru ke Supabase.');
      return;
    }

    if (user) {
      setSuccessMessage('Pendaftaran berhasil! Akun Enterprise Anda terdaftar di Supabase Auth.');
      setTimeout(() => {
        onAuthSuccess(user, selectedRole);
        onClose();
      }, 1000);
    }
  };

  const handleQuickDemoLogin = (role: UserRole, demoEmail: string) => {
    const mockUser: SupabaseAuthUser = {
      id: `sp-usr-${Date.now()}`,
      email: demoEmail,
      role: 'authenticated',
      user_metadata: {
        full_name: demoEmail.split('@')[0].toUpperCase(),
        role: role,
        company_name: 'PT NickelSmart Nusantara'
      },
      app_metadata: {
        provider: 'supabase',
        providers: ['supabase', 'email']
      }
    };
    onAuthSuccess(mockUser, role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-slate-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 p-0.5 flex-shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Database className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-slate-100">Supabase Enterprise Auth</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PostgreSQL IdP
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autentikasi multi-provider terpadu dengan Firebase & Supabase Database
            </p>
          </div>
        </div>

        {/* Status Info / Config Warning */}
        {!config.isConfigured && (
          <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <p className="font-semibold">Supabase Client Belum Dikonfigurasi URL & Anon Key</p>
              <p className="text-[11px] text-amber-300/80">
                Anda dapat menggunakan <strong>Quick Demo SSO</strong> di bawah, atau masukkan kredensial Supabase di Developer Hub.
              </p>
              {onOpenDeveloperConfig && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenDeveloperConfig();
                  }}
                  className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-white underline"
                >
                  Buka Konfigurasi Supabase ➔
                </button>
              )}
            </div>
          </div>
        )}

        {/* If user is already logged in with Supabase */}
        {currentUser ? (
          <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Status Sesi Supabase Aktif:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                JWT VALID
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <p className="text-slate-200 font-bold">{currentUser.user_metadata?.full_name || currentUser.email}</p>
              <p className="text-slate-400 font-mono text-[11px]">{currentUser.email}</p>
              <p className="text-emerald-400 text-[11px]">Role: {currentUser.user_metadata?.role || 'Mine Manager'}</p>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onSignOut}
                className="flex-1 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-bold text-xs border border-rose-500/30 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout Supabase</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl text-xs font-bold border border-slate-800">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'signin' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'signup' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('demo')}
                className={`py-2 rounded-lg transition-all ${
                  authMode === 'demo' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Quick Demo
              </button>
            </div>

            {/* Error & Success Messages */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
            {successMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* TAB 1: SIGN IN */}
            {authMode === 'signin' && (
              <form onSubmit={handleSignIn} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Email Perusahaan / Akun Supabase:</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="mine.manager@nickelsmart.co.id"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                    />
                    <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Kata Sandi (Password):</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Memverifikasi Akun Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Masuk dengan Supabase Auth</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: REGISTER */}
            {authMode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Nama Lengkap Pengguna:</label>
                  <input
                    type="text"
                    required
                    placeholder="Bambang Setyadi, S.T."
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Alamat Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="bambang.s@miningholding.co.id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Peran / Jabatan Tambang:</label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Mine Manager">Mine Manager</option>
                      <option value="Operation Manager">Operation Manager</option>
                      <option value="Production Manager">Production Manager</option>
                      <option value="Geologist">Geologist</option>
                      <option value="Mine Engineer">Mine Engineer</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Perusahaan:</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-semibold">Kata Sandi (Min. 6 Karakter):</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Mendaftarkan ke Supabase...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      <span>Daftar Akun Enterprise Baru</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 3: QUICK DEMO ENTERPRISE ROLES */}
            {authMode === 'demo' && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-400 text-[11px]">
                  Pilih salah satu profil enterprise untuk menguji autentikasi instan Supabase tanpa perlu setup database terlebih dahulu:
                </p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('Super Admin', 'superadmin@halmaheranickel.co.id')}
                    className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100">Super Admin (Enterprise)</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-500/20 text-purple-300">Full Access</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">superadmin@halmaheranickel.co.id</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('Mine Manager', 'mine.manager@morowalinickel.co.id')}
                    className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100">Mine Manager (Pit & Hauling)</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-300">Site Operator</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">mine.manager@morowalinickel.co.id</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin('Corporate Director', 'director@nusantaraholding.com')}
                    className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500 text-left transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-100">Corporate Director (Executive)</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-500/20 text-amber-300">Executive KPI</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">director@nusantaraholding.com</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
