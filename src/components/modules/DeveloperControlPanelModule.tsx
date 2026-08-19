import React, { useState } from 'react';
import { 
  Terminal, 
  Globe, 
  Users, 
  Key, 
  Settings, 
  Image as ImageIcon, 
  Video, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Download, 
  Upload, 
  Play, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink,
  Search,
  Lock,
  Unlock,
  Radio,
  Sliders,
  DollarSign,
  Activity,
  Layers,
  Sparkles,
  Smartphone,
  Server
} from 'lucide-react';
import { useDevConfig } from '../../services/devConfigService';
import { ClientUserAccount, MediaGalleryItem, PricingPlanItem, UserRole, Language } from '../../types';

interface DeveloperControlPanelModuleProps {
  language?: Language;
  onGoToLandingPage?: () => void;
}

export const DeveloperControlPanelModule: React.FC<DeveloperControlPanelModuleProps> = ({
  language = 'id',
  onGoToLandingPage
}) => {
  const { config, saveConfig, saveApiKeys, saveClientUser, deleteClientUser, resetToDefaults } = useDevConfig();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'cms_website' | 'media_video' | 'crm_users' | 'api_keys' | 'pricing_plans' | 'system_flags'>('cms_website');

  // Local draft state for quick editing
  const [draftWebsite, setDraftWebsite] = useState(config.website);
  const [draftApiKeys, setDraftApiKeys] = useState(config.apiKeys);
  const [draftSettings, setDraftSettings] = useState(config.systemSettings);

  // Status & Notification
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [testApiResult, setTestApiResult] = useState<{ status: 'idle' | 'loading' | 'success' | 'error'; message: string }>({ status: 'idle', message: '' });

  // CRM User Management Modal State
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ClientUserAccount | null>(null);
  const [userSearch, setUserSearch] = useState('');
  const [userStatusFilter, setUserStatusFilter] = useState<'ALL' | 'ACTIVE' | 'SUSPENDED' | 'TRIAL' | 'EXPIRED'>('ALL');

  // Media Gallery Modal State
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaCategory, setNewMediaCategory] = useState<MediaGalleryItem['category']>('Pit Mining');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaDesc, setNewMediaDesc] = useState('');

  // Password visibility state for API keys
  const [showGeminiKey, setShowGeminiKey] = useState(false);
  const [showMapsKey, setShowMapsKey] = useState(false);
  const [showWaKey, setShowWaKey] = useState(false);

  // Sync draft whenever config from service changes
  React.useEffect(() => {
    setDraftWebsite(config.website);
    setDraftApiKeys(config.apiKeys);
    setDraftSettings(config.systemSettings);
  }, [config]);

  // Handle Global Save & Broadcast
  const handleSaveAll = async () => {
    setIsSaving(true);
    const updatedFullConfig = {
      ...config,
      website: draftWebsite,
      apiKeys: draftApiKeys,
      systemSettings: draftSettings
    };

    const ok = await saveConfig(updatedFullConfig);
    setIsSaving(false);
    if (ok) {
      setSaveSuccessMsg("✅ Perubahan Berhasil Disimpan & Langsung Aktif di Semua Akun Pengguna!");
      setTimeout(() => setSaveSuccessMsg(null), 5000);
    }
  };

  // Test Gemini Key
  const handleTestGeminiKey = async () => {
    setTestApiResult({ status: 'loading', message: 'Menguji koneksi ke Google Gemini AI Engine...' });
    try {
      const res = await fetch('/api/dev/test-key', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: draftApiKeys.geminiApiKey })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestApiResult({ status: 'success', message: `${data.message} - Respon AI: "${data.reply}"` });
      } else {
        setTestApiResult({ status: 'error', message: data.message || 'Gagal terhubung dengan API' });
      }
    } catch (err: any) {
      setTestApiResult({ status: 'error', message: err?.message || 'Gagal menghubungi server API.' });
    }
  };

  // Export JSON Backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `NickelSmart_Developer_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON Backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.website && parsed.apiKeys) {
          await saveConfig(parsed);
          alert("Backup database developer berhasil dipulihkan!");
        } else {
          alert("Format file JSON tidak valid.");
        }
      } catch (err) {
        alert("Gagal membaca file backup JSON.");
      }
    };
    reader.readAsText(file);
  };

  // Filtered Users
  const filteredUsers = config.clientUsers.filter(u => {
    const matchQuery = u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.companyName.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.iupNumber.toLowerCase().includes(userSearch.toLowerCase());
    const matchStatus = userStatusFilter === 'ALL' || u.status === userStatusFilter;
    return matchQuery && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Control Bar */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-500/30 p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-wider border border-indigo-500/40 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                Developer Control Panel & CRM Master Hub
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                Live Runtime Sync Active (No Redeploy)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
              Pusat Kendali Pengembang & Pengaturan Aplikasi Pasca-Deploy
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
              Ubah tulisan landing page, kelola media foto/video, atur API Key secara langsung, dan kelola akun klien/user. Seluruh perubahan langsung terdistribusi ke semua akun pengguna tanpa perlu build atau deploy ulang!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin text-slate-950" /> : <Save className="w-4 h-4 text-slate-950" />}
              <span>Simpan & Terapkan Live</span>
            </button>

            {onGoToLandingPage && (
              <button
                onClick={onGoToLandingPage}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>Lihat Landing Page</span>
              </button>
            )}

            <button
              onClick={handleExportBackup}
              title="Download Backup JSON"
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Backup</span>
            </button>

            <label className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Restore</span>
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>
          </div>
        </div>

        {/* Success Alert Toast */}
        {saveSuccessMsg && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{saveSuccessMsg}</span>
            </div>
            <button onClick={() => setSaveSuccessMsg(null)} className="text-emerald-400 hover:text-white text-xs">✕</button>
          </div>
        )}
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto text-xs font-bold scrollbar-thin">
        <button
          onClick={() => setActiveTab('cms_website')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'cms_website'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>1. Edit Tulisan Landing Page (CMS)</span>
        </button>

        <button
          onClick={() => setActiveTab('media_video')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'media_video'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>2. Gambar & Video Embed</span>
        </button>

        <button
          onClick={() => setActiveTab('crm_users')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'crm_users'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>3. CRM & Akun Pelanggan ({config.clientUsers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('api_keys')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'api_keys'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>4. Pengaturan API Key Live</span>
        </button>

        <button
          onClick={() => setActiveTab('pricing_plans')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'pricing_plans'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>5. Paket Layanan & Harga</span>
        </button>

        <button
          onClick={() => setActiveTab('system_flags')}
          className={`px-4 py-2.5 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'system_flags'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>6. Pengaturan Sistem & Fitur</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: WEBSITE CMS & VISUAL TEXT EDITOR */}
      {/* ======================================================== */}
      {activeTab === 'cms_website' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Hero & Copy Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    Teks Utama & Hero Header Website
                  </h2>
                  <span className="text-[11px] text-slate-400">Live Editor</span>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Nama Brand Aplikasi:</label>
                    <input
                      type="text"
                      value={draftWebsite.brandName}
                      onChange={(e) => setDraftWebsite({ ...draftWebsite, brandName: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Tagline Singkat Brand:</label>
                    <input
                      type="text"
                      value={draftWebsite.brandTagline}
                      onChange={(e) => setDraftWebsite({ ...draftWebsite, brandTagline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Badge Highlight di Atas Judul:</label>
                    <input
                      type="text"
                      value={draftWebsite.heroBadge}
                      onChange={(e) => setDraftWebsite({ ...draftWebsite, heroBadge: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Judul Utama Halaman Depan (Hero Headline):</label>
                    <textarea
                      rows={2}
                      value={draftWebsite.heroTitle}
                      onChange={(e) => setDraftWebsite({ ...draftWebsite, heroTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">Deskripsi / Sub-headline:</label>
                    <textarea
                      rows={3}
                      value={draftWebsite.heroSubtitle}
                      onChange={(e) => setDraftWebsite({ ...draftWebsite, heroSubtitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Tombol Aksi Utama (CTA 1):</label>
                      <input
                        type="text"
                        value={draftWebsite.ctaPrimaryText}
                        onChange={(e) => setDraftWebsite({ ...draftWebsite, ctaPrimaryText: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 font-bold text-emerald-400"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 font-semibold block mb-1">Tombol Aksi Kedua (CTA 2):</label>
                      <input
                        type="text"
                        value={draftWebsite.ctaSecondaryText}
                        onChange={(e) => setDraftWebsite({ ...draftWebsite, ctaSecondaryText: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500 font-bold text-slate-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Announcement Bar & Ticker Banner */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Papan Pengumuman & Ticker Banner Atas
                  </h2>
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={draftWebsite.announcement.enabled}
                      onChange={(e) => setDraftWebsite({
                        ...draftWebsite,
                        announcement: { ...draftWebsite.announcement, enabled: e.target.checked }
                      })}
                      className="rounded accent-emerald-500 w-4 h-4"
                    />
                    <span className="text-slate-300 font-semibold">Tampilkan Pengumuman</span>
                  </label>
                </div>

                {draftWebsite.announcement.enabled && (
                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-slate-400 block mb-1">Badge Teks:</label>
                        <input
                          type="text"
                          value={draftWebsite.announcement.badgeText}
                          onChange={(e) => setDraftWebsite({
                            ...draftWebsite,
                            announcement: { ...draftWebsite.announcement, badgeText: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Tipe Banner:</label>
                        <select
                          value={draftWebsite.announcement.type}
                          onChange={(e) => setDraftWebsite({
                            ...draftWebsite,
                            announcement: { ...draftWebsite.announcement, type: e.target.value as any }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                        >
                          <option value="promo">Promo & Diskon</option>
                          <option value="info">Informasi / Rilis</option>
                          <option value="warning">Peringatan / Maintenance</option>
                          <option value="alert">Pemberitahuan Mendesak</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Teks Link Tombol:</label>
                        <input
                          type="text"
                          value={draftWebsite.announcement.linkText}
                          onChange={(e) => setDraftWebsite({
                            ...draftWebsite,
                            announcement: { ...draftWebsite.announcement, linkText: e.target.value }
                          })}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Isi Pesan Pengumuman:</label>
                      <input
                        type="text"
                        value={draftWebsite.announcement.text}
                        onChange={(e) => setDraftWebsite({
                          ...draftWebsite,
                          announcement: { ...draftWebsite.announcement, text: e.target.value }
                        })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-semibold"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Contact & Live Preview Card */}
            <div className="space-y-6">
              {/* Contact Info Editor */}
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
                <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-teal-400" />
                  Informasi Kontak & Perusahaan
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Nama Perusahaan Pengembang:</label>
                    <input
                      type="text"
                      value={draftWebsite.contactInfo.companyName}
                      onChange={(e) => setDraftWebsite({
                        ...draftWebsite,
                        contactInfo: { ...draftWebsite.contactInfo, companyName: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Email Resmi Sales / Support:</label>
                    <input
                      type="email"
                      value={draftWebsite.contactInfo.email}
                      onChange={(e) => setDraftWebsite({
                        ...draftWebsite,
                        contactInfo: { ...draftWebsite.contactInfo, email: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Nomor Telepon Kantor:</label>
                    <input
                      type="text"
                      value={draftWebsite.contactInfo.phone}
                      onChange={(e) => setDraftWebsite({
                        ...draftWebsite,
                        contactInfo: { ...draftWebsite.contactInfo, phone: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Nomor WhatsApp Resmi:</label>
                    <input
                      type="text"
                      value={draftWebsite.contactInfo.whatsappNumber}
                      onChange={(e) => setDraftWebsite({
                        ...draftWebsite,
                        contactInfo: { ...draftWebsite.contactInfo, whatsappNumber: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Alamat Kantor / Headquarters:</label>
                    <textarea
                      rows={2}
                      value={draftWebsite.contactInfo.address}
                      onChange={(e) => setDraftWebsite({
                        ...draftWebsite,
                        contactInfo: { ...draftWebsite.contactInfo, address: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Quick Save Card */}
              <div className="rounded-2xl bg-indigo-950/40 border border-indigo-500/30 p-5 space-y-3 text-xs">
                <h4 className="font-bold text-indigo-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Penyebaran Otomatis (Live Sync)
                </h4>
                <p className="text-slate-400">
                  Setiap kali tombol <strong className="text-emerald-400">"Simpan & Terapkan Live"</strong> ditekan, seluruh pengunjung website dan pengguna yang sedang login akan langsung melihat teks baru secara instan.
                </p>
                <button
                  onClick={handleSaveAll}
                  disabled={isSaving}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Teks</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: MEDIA FOTO & VIDEO EMBED MANAGER */}
      {/* ======================================================== */}
      {activeTab === 'media_video' && (
        <div className="space-y-6">
          
          {/* Video Promo Section */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Video className="w-4 h-4 text-rose-400" />
                Pengaturan Video Promo & Simulasi Tambang (YouTube / MP4 Embed)
              </h2>
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={draftWebsite.videoPromo.enabled}
                  onChange={(e) => setDraftWebsite({
                    ...draftWebsite,
                    videoPromo: { ...draftWebsite.videoPromo, enabled: e.target.checked }
                  })}
                  className="rounded accent-rose-500 w-4 h-4"
                />
                <span className="text-slate-300 font-semibold">Tampilkan Video di Landing Page</span>
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Judul Video Promo:</label>
                  <input
                    type="text"
                    value={draftWebsite.videoPromo.title}
                    onChange={(e) => setDraftWebsite({
                      ...draftWebsite,
                      videoPromo: { ...draftWebsite.videoPromo, title: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    URL Video Embed (YouTube Embed atau Link Video MP4):
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.youtube-nocookie.com/embed/VIDEO_ID atau https://example.com/video.mp4"
                    value={draftWebsite.videoPromo.videoUrl}
                    onChange={(e) => setDraftWebsite({
                      ...draftWebsite,
                      videoPromo: { ...draftWebsite.videoPromo, videoUrl: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-indigo-300 font-mono"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">
                    Tips: Untuk YouTube, gunakan format embed <code className="text-slate-400">https://www.youtube-nocookie.com/embed/ID_VIDEO</code>
                  </span>
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Poster Thumbnail Image URL:</label>
                  <input
                    type="text"
                    value={draftWebsite.videoPromo.posterUrl}
                    onChange={(e) => setDraftWebsite({
                      ...draftWebsite,
                      videoPromo: { ...draftWebsite.videoPromo, posterUrl: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-semibold block mb-1">Deskripsi Narasi Video:</label>
                  <textarea
                    rows={2}
                    value={draftWebsite.videoPromo.description}
                    onChange={(e) => setDraftWebsite({
                      ...draftWebsite,
                      videoPromo: { ...draftWebsite.videoPromo, description: e.target.value }
                    })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              {/* Video Player Live Preview */}
              <div className="space-y-2">
                <label className="text-slate-400 font-semibold block">Pratinjau Pemutar Video (Live Preview):</label>
                <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video relative flex items-center justify-center shadow-2xl">
                  {draftWebsite.videoPromo.videoUrl ? (
                    draftWebsite.videoPromo.videoUrl.includes('youtube') ? (
                      <iframe
                        src={draftWebsite.videoPromo.videoUrl}
                        title="Live Video Preview"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={draftWebsite.videoPromo.videoUrl}
                        poster={draftWebsite.videoPromo.posterUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="text-center p-6 text-slate-500">
                      <Video className="w-10 h-10 mx-auto mb-2 opacity-40" />
                      <p>Masukkan URL video untuk melihat pratinjau</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Banner & Background Image */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
            <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
              <ImageIcon className="w-4 h-4 text-emerald-400" />
              Gambar Hero Banner & Logo
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">URL Gambar Banner Hero Utama:</label>
                <input
                  type="text"
                  value={draftWebsite.heroBannerImage}
                  onChange={(e) => setDraftWebsite({ ...draftWebsite, heroBannerImage: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
                {draftWebsite.heroBannerImage && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-slate-800 h-28 bg-slate-950">
                    <img
                      src={draftWebsite.heroBannerImage}
                      alt="Banner Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">URL Custom Logo Brand (Opsional):</label>
                <input
                  type="text"
                  placeholder="Biarkan kosong untuk menggunakan logo vektor sistem default"
                  value={draftWebsite.logoUrl}
                  onChange={(e) => setDraftWebsite({ ...draftWebsite, logoUrl: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
                {draftWebsite.logoUrl ? (
                  <div className="mt-2 rounded-xl overflow-hidden border border-slate-800 h-28 bg-slate-950 flex items-center justify-center p-2">
                    <img
                      src={draftWebsite.logoUrl}
                      alt="Logo Preview"
                      referrerPolicy="no-referrer"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="mt-2 rounded-xl border border-dashed border-slate-800 h-28 flex items-center justify-center text-slate-500">
                    Logo Sistem Default Aktif
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feature Media Gallery Items */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  Galeri Foto & Dokumentasi Fitur Tambang ({draftWebsite.mediaGallery.length} Foto)
                </h2>
                <p className="text-[11px] text-slate-400">Foto-foto ini akan ditampilkan pada galeri showcase di halaman landing page</p>
              </div>

              <button
                onClick={() => setIsMediaModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Foto Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {draftWebsite.mediaGallery.map((item, idx) => (
                <div key={item.id || idx} className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden group hover:border-indigo-500/50 transition-all flex flex-col justify-between">
                  <div className="h-36 bg-slate-900 relative overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-indigo-300 border border-indigo-500/30">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3 space-y-1.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-100 text-xs line-clamp-1">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 line-clamp-2">{item.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[9px] font-mono text-slate-500">{item.id}</span>
                      <button
                        onClick={() => {
                          const updated = draftWebsite.mediaGallery.filter((_, i) => i !== idx);
                          setDraftWebsite({ ...draftWebsite, mediaGallery: updated });
                        }}
                        className="text-rose-400 hover:text-rose-300 text-xs p-1 rounded hover:bg-rose-500/10"
                        title="Hapus foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: CRM & MANAJEMEN AKUN USER / PELANGGAN */}
      {/* ======================================================== */}
      {activeTab === 'crm_users' && (
        <div className="space-y-6">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Akun Pelanggan</span>
              <p className="text-2xl font-black text-slate-100">{config.clientUsers.length}</p>
              <span className="text-[10px] text-emerald-400 font-semibold">Tersimpan di Cloud</span>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pelanggan Aktif</span>
              <p className="text-2xl font-black text-emerald-400">
                {config.clientUsers.filter(u => u.status === 'ACTIVE').length}
              </p>
              <span className="text-[10px] text-slate-400">Lisensi Terverifikasi</span>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Masa Trial Evaluasi</span>
              <p className="text-2xl font-black text-amber-400">
                {config.clientUsers.filter(u => u.status === 'TRIAL').length}
              </p>
              <span className="text-[10px] text-slate-400">30 Hari Akses</span>
            </div>
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Kapasitas Seat</span>
              <p className="text-2xl font-black text-indigo-400">
                {config.clientUsers.reduce((acc, u) => acc + (u.seatsAllocated || 1), 0)} Seats
              </p>
              <span className="text-[10px] text-slate-400">Multi-Site Holding</span>
            </div>
          </div>

          {/* User List Table & Controls */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari nama, email, perusahaan, IUP..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <select
                  value={userStatusFilter}
                  onChange={(e) => setUserStatusFilter(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="ACTIVE">Aktif (ACTIVE)</option>
                  <option value="TRIAL">Trial Mode</option>
                  <option value="SUSPENDED">Ditangguhkan</option>
                  <option value="EXPIRED">Kadaluarsa</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingUser({
                    id: `CLI-${Date.now()}`,
                    name: '',
                    email: '',
                    phone: '',
                    companyName: '',
                    iupNumber: '',
                    role: 'Mine Manager',
                    subscriptionTier: 'Smelter & Mine Pro',
                    status: 'ACTIVE',
                    seatsAllocated: 25,
                    expiresAt: '2027-12-31',
                    createdAt: new Date().toISOString().slice(0, 10),
                    lastActive: 'Baru saja',
                    notes: '',
                    apiAccessAllowed: true
                  });
                  setIsUserModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Akun Pelanggan Baru</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Nama & Email</th>
                    <th className="py-2.5 px-3">Perusahaan & No. IUP</th>
                    <th className="py-2.5 px-3">Role Akses</th>
                    <th className="py-2.5 px-3">Paket Langganan</th>
                    <th className="py-2.5 px-3">Seats</th>
                    <th className="py-2.5 px-3">Status Akun</th>
                    <th className="py-2.5 px-3">Kadaluarsa</th>
                    <th className="py-2.5 px-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        Tidak ada data akun pelanggan yang cocok dengan pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3">
                          <strong className="text-slate-100 block">{user.name}</strong>
                          <span className="text-slate-400 text-[11px]">{user.email}</span>
                          <span className="text-slate-500 text-[10px] block font-mono">{user.phone}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-slate-200 block font-semibold">{user.companyName}</span>
                          <span className="text-slate-400 text-[10px] font-mono">{user.iupNumber || '-'}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-bold border border-slate-700">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            user.subscriptionTier === 'Enterprise Unlimited'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : user.subscriptionTier === 'Smelter & Mine Pro'
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                              : 'bg-slate-800 text-slate-300'
                          }`}>
                            {user.subscriptionTier}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-300 font-mono font-bold">
                          {user.seatsAllocated}
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            user.status === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : user.status === 'TRIAL'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                          {user.expiresAt}
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setIsUserModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
                              title="Edit Akun Pelanggan"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm(`Hapus akun pelanggan "${user.name}" dari sistem?`)) {
                                  await deleteClientUser(user.id);
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-400"
                              title="Hapus Akun"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: API KEY MANAGEMENT (LIVE OVERWRITE) */}
      {/* ======================================================== */}
      {activeTab === 'api_keys' && (
        <div className="space-y-6">
          
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-400" />
                  Pengaturan API Key & Kunci Integrasi Gateway
                </h2>
                <p className="text-[11px] text-slate-400">
                  Semua API Key yang diinput di sini akan langsung aktif di server Node.js backend dan klien tanpa perlu build atau deploy ulang!
                </p>
              </div>

              <button
                onClick={handleTestGeminiKey}
                className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold text-xs flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Uji Koneksi Gemini AI</span>
              </button>
            </div>

            {/* Test Result Toast */}
            {testApiResult.status !== 'idle' && (
              <div className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                testApiResult.status === 'loading'
                  ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300'
                  : testApiResult.status === 'success'
                  ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/20 border-rose-500/30 text-rose-300'
              }`}>
                <div className="flex items-center gap-2">
                  {testApiResult.status === 'loading' && <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />}
                  {testApiResult.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  {testApiResult.status === 'error' && <AlertTriangle className="w-4 h-4 text-rose-400" />}
                  <span>{testApiResult.message}</span>
                </div>
                <button onClick={() => setTestApiResult({ status: 'idle', message: '' })} className="text-xs opacity-70 hover:opacity-100">✕</button>
              </div>
            )}

            <div className="space-y-4 text-xs">
              {/* Google Gemini AI Key */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    Google Gemini AI API Key (Server-Side Secret):
                  </label>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    draftApiKeys.geminiApiKey ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {draftApiKeys.geminiApiKey ? 'KEY CONFIGURED' : 'USING DEFAULT ENGINE'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showGeminiKey ? 'text' : 'password'}
                    placeholder="AIzaSy..."
                    value={draftApiKeys.geminiApiKey}
                    onChange={(e) => setDraftApiKeys({ ...draftApiKeys, geminiApiKey: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 pr-10 text-emerald-400 font-mono font-bold focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowGeminiKey(!showGeminiKey)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showGeminiKey ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Digunakan untuk asisten cerdas <strong>NickelSmart AI</strong>, optimasi formula <strong>Ore Blending Ni/Fe/MC</strong>, dan draf otomatis laporan <strong>RKAB ESDM</strong>.
                </p>
              </div>

              {/* Google Maps API Key */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-bold flex items-center gap-2">
                    <Globe className="w-4 h-4 text-teal-400" />
                    Google Maps Platform / Satellite Pit Key:
                  </label>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    draftApiKeys.googleMapsApiKey && draftApiKeys.googleMapsApiKey.startsWith('AIza')
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {draftApiKeys.googleMapsApiKey && draftApiKeys.googleMapsApiKey.startsWith('AIza') ? 'TERHUBUNG' : 'OPSIONAL'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showMapsKey ? 'text' : 'password'}
                    placeholder="AIzaSy... (Masukkan API Key Google Maps)"
                    value={draftApiKeys.googleMapsApiKey}
                    onChange={(e) => setDraftApiKeys({ ...draftApiKeys, googleMapsApiKey: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 pr-10 text-slate-200 font-mono focus:outline-none focus:border-teal-500 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowMapsKey(!showMapsKey)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showMapsKey ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Untuk visualisasi kontur 3D Pit, topografi elevasi jenjang tambang, dan pelacakan rute hauling armada truk.
                </p>
              </div>

              {/* WhatsApp Gateway Token */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-bold flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    WhatsApp Business API Gateway Token:
                  </label>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                    WEBHOOK READY
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showWaKey ? 'text' : 'password'}
                    value={draftApiKeys.whatsappGatewayToken}
                    onChange={(e) => setDraftApiKeys({ ...draftApiKeys, whatsappGatewayToken: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 pr-10 text-slate-200 font-mono focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowWaKey(!showWaKey)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showWaKey ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Untuk pengiriman otomatis Surat Jalan Timbangan QR, notifikasi insiden K3LH darurat, dan rekap ritase harian ke WhatsApp Mine Manager.
                </p>
              </div>

              {/* Weather & IoT Keys */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-slate-200 font-bold block">
                    BMKG & OpenWeather Radar API Key:
                  </label>
                  <input
                    type="text"
                    value={draftApiKeys.weatherApiKey}
                    onChange={(e) => setDraftApiKeys({ ...draftApiKeys, weatherApiKey: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-mono text-xs"
                  />
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-slate-200 font-bold block">
                    IoT Telemetry MQTT Broker URL:
                  </label>
                  <input
                    type="text"
                    value={draftApiKeys.iotMqttBrokerUrl}
                    onChange={(e) => setDraftApiKeys({ ...draftApiKeys, iotMqttBrokerUrl: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-mono text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: PRICING PLANS & PACKAGES */}
      {/* ======================================================== */}
      {activeTab === 'pricing_plans' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Pengaturan Paket Layanan & Harga Langganan Website
                </h2>
                <p className="text-[11px] text-slate-400">Edit tarif bulanan, tahunan, kapasitas seats, dan daftar fitur masing-masing tier paket.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {draftWebsite.pricingPlans.map((plan, planIdx) => (
                <div key={plan.tierId} className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <strong className="text-slate-100 text-sm">{plan.name}</strong>
                    <span className="text-indigo-400 font-mono font-bold">{plan.tierId}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Tarif Bulanan:</label>
                      <input
                        type="text"
                        value={plan.monthlyPrice}
                        onChange={(e) => {
                          const updated = [...draftWebsite.pricingPlans];
                          updated[planIdx].monthlyPrice = e.target.value;
                          setDraftWebsite({ ...draftWebsite, pricingPlans: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-emerald-400 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Tarif Tahunan (Eqv):</label>
                      <input
                        type="text"
                        value={plan.yearlyPrice}
                        onChange={(e) => {
                          const updated = [...draftWebsite.pricingPlans];
                          updated[planIdx].yearlyPrice = e.target.value;
                          setDraftWebsite({ ...draftWebsite, pricingPlans: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-emerald-400 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Kapasitas Seats:</label>
                      <input
                        type="text"
                        value={plan.seats}
                        onChange={(e) => {
                          const updated = [...draftWebsite.pricingPlans];
                          updated[planIdx].seats = e.target.value;
                          setDraftWebsite({ ...draftWebsite, pricingPlans: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-slate-400 block mb-1">Catatan Promo:</label>
                      <input
                        type="text"
                        value={plan.note}
                        onChange={(e) => {
                          const updated = [...draftWebsite.pricingPlans];
                          updated[planIdx].note = e.target.value;
                          setDraftWebsite({ ...draftWebsite, pricingPlans: updated });
                        }}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-amber-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 6: PENGATURAN SISTEM & FEATURE FLAGS */}
      {/* ======================================================== */}
      {activeTab === 'system_flags' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 shadow-xl">
            <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sliders className="w-4 h-4 text-purple-400" />
              Feature Flags & Pengaturan Global Server
            </h2>

            <div className="space-y-4 text-xs">
              {/* Maintenance Mode */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <strong className="text-slate-200 block">Mode Pemeliharaan (Maintenance Mode)</strong>
                  <p className="text-slate-400 text-[11px]">Kunci akses publik sementara ketika sedang update database besar</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftSettings.maintenanceMode}
                    onChange={(e) => setDraftSettings({ ...draftSettings, maintenanceMode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                </label>
              </div>

              {/* Offline Capability */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <strong className="text-slate-200 block">Dukungan Mode Offline Front Tambang</strong>
                  <p className="text-slate-400 text-[11px]">Izinkan operator tablet lapangan input data saat sinyal GSM blank spot</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draftSettings.offlineModeEnabled}
                    onChange={(e) => setDraftSettings({ ...draftSettings, offlineModeEnabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Reset to Factory Defaults */}
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 flex items-center justify-between">
                <div>
                  <strong className="text-rose-300 block">Reset Konfigurasi ke Pengaturan Awal Pabrik</strong>
                  <p className="text-slate-400 text-[11px]">Kembalikan semua teks website, foto, dan akun contoh ke format standar bawaan</p>
                </div>
                <button
                  onClick={async () => {
                    if (confirm("Apakah Anda yakin ingin mereset seluruh konfigurasi developer ke setelan awal pabrik?")) {
                      await resetToDefaults();
                      alert("Konfigurasi berhasil direset ke standar pabrik.");
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Default</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: TAMBAH / EDIT AKUN PELANGGAN */}
      {/* ======================================================== */}
      {isUserModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                {editingUser.name ? `Edit Akun: ${editingUser.name}` : 'Buat Akun Pelanggan Baru'}
              </h3>
              <button onClick={() => setIsUserModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Nama Lengkap Penanggung Jawab:</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    placeholder="Contoh: Ir. Pratama Soebagyo"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Email Perusahaan / Login:</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    placeholder="p.soebagyo@perusahaan.co.id"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Nama Perusahaan / IUP Konsesi:</label>
                  <input
                    type="text"
                    value={editingUser.companyName}
                    onChange={(e) => setEditingUser({ ...editingUser, companyName: e.target.value })}
                    placeholder="PT Nickel Mining Nusantara Tbk"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Nomor IUP-OP / Izin ESDM:</label>
                  <input
                    type="text"
                    value={editingUser.iupNumber}
                    onChange={(e) => setEditingUser({ ...editingUser, iupNumber: e.target.value })}
                    placeholder="IUP-OP No. 540/128/ESDM"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Role / Jabatan:</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as UserRole })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                  >
                    <option value="Mine Manager">Mine Manager</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Corporate Director">Corporate Director</option>
                    <option value="Geologist">Geologist</option>
                    <option value="Mine Engineer">Mine Engineer</option>
                    <option value="Operation Manager">Operation Manager</option>
                    <option value="HSE Manager">HSE Manager</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Paket Langganan:</label>
                  <select
                    value={editingUser.subscriptionTier}
                    onChange={(e) => setEditingUser({ ...editingUser, subscriptionTier: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-bold"
                  >
                    <option value="Trial Mode">Trial Mode (30 Hari)</option>
                    <option value="Standard Mine">Standard Mine Tier</option>
                    <option value="Smelter & Mine Pro">Smelter & Mine Pro Tier</option>
                    <option value="Enterprise Unlimited">Enterprise Unlimited</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Status Akun:</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold"
                  >
                    <option value="ACTIVE">ACTIVE (Aktif)</option>
                    <option value="TRIAL">TRIAL (Evaluasi)</option>
                    <option value="SUSPENDED">SUSPENDED (Ditangguhkan)</option>
                    <option value="EXPIRED">EXPIRED (Kadaluarsa)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Jumlah Seats Dialokasikan:</label>
                  <input
                    type="number"
                    value={editingUser.seatsAllocated}
                    onChange={(e) => setEditingUser({ ...editingUser, seatsAllocated: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Tanggal Berakhir Lisensi:</label>
                  <input
                    type="date"
                    value={editingUser.expiresAt}
                    onChange={(e) => setEditingUser({ ...editingUser, expiresAt: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan Khusus Klien:</label>
                <textarea
                  rows={2}
                  value={editingUser.notes || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, notes: e.target.value })}
                  placeholder="Catatan kontrak khusus, modul yang di-request, dll."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={async () => {
                  if (!editingUser.name || !editingUser.email) {
                    alert("Nama dan Email wajib diisi.");
                    return;
                  }
                  await saveClientUser(editingUser);
                  setIsUserModalOpen(false);
                  alert(`Akun ${editingUser.name} berhasil disimpan!`);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simpan Akun Pelanggan</span>
              </button>
              <button
                onClick={() => setIsUserModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: TAMBAH FOTO MEDIA BARU */}
      {/* ======================================================== */}
      {isMediaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-indigo-400" />
                Tambah Foto Galeri Baru
              </h3>
              <button onClick={() => setIsMediaModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Judul Foto:</label>
                <input
                  type="text"
                  placeholder="Contoh: Operasi Jetty Loading Tongkang 300 Feet"
                  value={newMediaTitle}
                  onChange={(e) => setNewMediaTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kategori:</label>
                <select
                  value={newMediaCategory}
                  onChange={(e) => setNewMediaCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                >
                  <option value="Pit Mining">Penambangan Pit (Pit Mining)</option>
                  <option value="Smelter RKEF">Smelter & Pengolahan RKEF</option>
                  <option value="Jetty Port">Jetty & Pemuatan Tongkang</option>
                  <option value="Heavy Equipment">Alat Berat & Workshop</option>
                  <option value="Laboratory">Laboratorium XRF</option>
                  <option value="Drone Survey">Survey Topografi & Drone</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">URL Gambar (Image URL):</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Deskripsi Singkat:</label>
                <textarea
                  rows={2}
                  placeholder="Keterangan singkat aktivitas tambang..."
                  value={newMediaDesc}
                  onChange={(e) => setNewMediaDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  if (!newMediaTitle || !newMediaUrl) {
                    alert("Judul dan URL Foto wajib diisi.");
                    return;
                  }
                  const newItem: MediaGalleryItem = {
                    id: `MG-${Date.now()}`,
                    title: newMediaTitle,
                    category: newMediaCategory,
                    imageUrl: newMediaUrl,
                    description: newMediaDesc
                  };
                  setDraftWebsite({
                    ...draftWebsite,
                    mediaGallery: [newItem, ...draftWebsite.mediaGallery]
                  });
                  setIsMediaModalOpen(false);
                  setNewMediaTitle('');
                  setNewMediaUrl('');
                  setNewMediaDesc('');
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Tambahkan Foto ke Galeri</span>
              </button>
              <button
                onClick={() => setIsMediaModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
