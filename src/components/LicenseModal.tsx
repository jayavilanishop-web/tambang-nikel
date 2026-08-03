import React, { useState } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Building2, 
  Users, 
  Calendar, 
  Copy, 
  Check, 
  Download, 
  Sparkles 
} from 'lucide-react';
import { LicenseInfo, Language } from '../types';

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  licenseInfo: LicenseInfo;
  onUpdateLicense: (newLicense: LicenseInfo) => void;
  language: Language;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({
  isOpen,
  onClose,
  licenseInfo,
  onUpdateLicense,
  language
}) => {
  const [inputKey, setInputKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [copiedKey, setCopiedKey] = useState(false);

  if (!isOpen) return null;

  const handleCopyKey = () => {
    navigator.clipboard.writeText(licenseInfo.licenseKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleVerifyAndActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) return;

    setIsVerifying(true);
    setVerifyMessage(null);

    try {
      const response = await fetch('/api/license/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey: inputKey.trim() })
      });

      const data = await response.json();

      if (data.valid) {
        setVerifyMessage({ text: `Lisensi Berhasil Diaktifkan untuk ${data.company}!`, success: true });
        onUpdateLicense({
          licenseKey: data.licenseKey,
          companyName: data.company,
          tier: data.tier,
          seats: data.seats,
          usedSeats: Math.floor(data.seats * 0.2),
          status: 'ACTIVE',
          expiresAt: data.expiresAt,
          activatedAt: new Date().toISOString().split('T')[0],
          modules: data.modules
        });
      } else {
        setVerifyMessage({ text: data.message || 'Kunci Lisensi Tidak Valid.', success: false });
      }
    } catch (err) {
      setVerifyMessage({ text: 'Gagal menghubungkan ke Server Lisensi Komersial.', success: false });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDemoKey = () => {
    setInputKey("SMARTMINE-IND-DEMO-PRO-2026");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-lg">
                {language === 'id' ? 'Aktivasi Lisensi Komersial SmartMine AI' : 'SmartMine AI Commercial License Activation'}
              </h3>
              <p className="text-xs text-slate-400">
                {language === 'id' ? 'Sistem Manajemen Lisensi & Hak Akses Enterprise' : 'Enterprise SaaS License Key Manager'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Active License Details Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-slate-800 to-slate-950 border border-emerald-500/30 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-slate-100 text-sm">{licenseInfo.companyName}</span>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                {licenseInfo.tier}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-slate-500" />
                  Kunci Lisensi Aktif:
                </span>
                <div className="flex items-center gap-2">
                  <code className="font-mono font-bold text-emerald-300 bg-slate-900 px-2 py-1 rounded border border-slate-700">
                    {licenseInfo.licenseKey}
                  </code>
                  <button
                    onClick={handleCopyKey}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title="Salin Kunci Lisensi"
                  >
                    {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  Kapasitas Seat / User:
                </span>
                <p className="font-semibold text-slate-200">
                  {licenseInfo.usedSeats} / {licenseInfo.seats} Seats Dipakai
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Berlaku Sampai:
                </span>
                <p className="font-semibold text-slate-200">{licenseInfo.expiresAt}</p>
              </div>
            </div>
          </div>

          {/* Key Activation Form */}
          <form onSubmit={handleVerifyAndActivate} className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">
              {language === 'id' ? 'Masukkan License Key Baru untuk Aktivasi Perusahaan:' : 'Enter License Key for Activation:'}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="e.g. SMARTMINE-IND-2026-ENT-XXXX"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={isVerifying}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Aktifkan Kunci</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={handleDemoKey}
                className="text-emerald-400 hover:underline text-[11px] font-semibold"
              >
                + Gunakan License Key Demo (PT Halmahera Nickel)
              </button>
              <span className="text-slate-500 text-[11px]">SaaS Commercial Tier v2.5</span>
            </div>
          </form>

          {verifyMessage && (
            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
              verifyMessage.success 
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300' 
                : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
            }`}>
              {verifyMessage.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              <span>{verifyMessage.text}</span>
            </div>
          )}

          {/* Module Privileges Overview */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {language === 'id' ? 'Hak Akses Modul Terlisensi:' : 'Licensed Module Privileges:'}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Fitur Blending Nikel AI',
                'Generator RKAB ESDM AI',
                'Integrasi Sucofindo COA',
                'Kalkulator HPM & Royalty',
                'Modul Offline Lapangan',
                'API Hub & SAP Connector'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px]">PT SmartMine Technology Indonesia &copy; 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold"
          >
            Tutup Dialog
          </button>
        </div>

      </div>
    </div>
  );
};
