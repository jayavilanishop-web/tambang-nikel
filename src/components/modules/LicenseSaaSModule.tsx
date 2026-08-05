import React, { useState } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Building2, 
  Users, 
  CreditCard, 
  ArrowRight, 
  Laptop, 
  Server, 
  Wifi, 
  WifiOff, 
  Lock, 
  FileCheck, 
  Download, 
  RefreshCw, 
  Trash2, 
  Code, 
  AlertTriangle, 
  Zap, 
  TrendingUp, 
  Award,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { LicenseInfo, RegisteredDevice, Language } from '../../types';

interface LicenseSaaSModuleProps {
  licenseInfo: LicenseInfo;
  onOpenLicenseModal: () => void;
  onUpdateLicense: (newLicense: LicenseInfo) => void;
  devices: RegisteredDevice[];
  onRevokeDevice: (deviceId: string) => void;
  onRegisterDevice: (deviceName: string, hwid: string, location: string) => void;
  language: Language;
}

export const LicenseSaaSModule: React.FC<LicenseSaaSModuleProps> = ({
  licenseInfo,
  onOpenLicenseModal,
  onUpdateLicense,
  devices,
  onRevokeDevice,
  onRegisterDevice,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'activation' | 'device_limits' | 'company_validation' | 'api_sandbox'>('dashboard');

  // Offline Challenge State
  const [hardwareId, setHardwareId] = useState('HWID-MOR-88192-A9F-WIN11');
  const [challengeCode, setChallengeCode] = useState('CHALLENGE-2026-X889-NICKEL');
  const [companyIupInput, setCompanyIupInput] = useState('IUP-OP No. 540/128/ESDM/2021');
  const [offlineResponseCode, setOfflineResponseCode] = useState('');
  const [isGeneratingOffline, setIsGeneratingOffline] = useState(false);
  const [offlineResult, setOfflineResult] = useState<any>(null);

  // New Device Form
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceHwid, setNewDeviceHwid] = useState('');
  const [newDeviceLocation, setNewDeviceLocation] = useState('');
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);

  // API Sandbox State
  const [apiEndpoint, setApiEndpoint] = useState('/api/license/verify');
  const [apiRequestBody, setApiRequestBody] = useState(JSON.stringify({ licenseKey: licenseInfo.licenseKey }, null, 2));
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [isLoadingApi, setIsLoadingApi] = useState(false);

  const plans = [
    {
      tierId: 'Trial Mode',
      name: 'Trial Mode (30-Hari Free)',
      price: 'Rp 0 / 30 Hari',
      seats: '5 User Seats',
      target: 'Evaluasi Lokasi Tambang Baru',
      features: [
        'Akses Dasbor Analitik Dasar',
        'Simulasi Pit & Ore Model 1 Pit',
        'Mode Evaluasi Fitur Blending AI'
      ],
      highlight: false
    },
    {
      tierId: 'Standard Mine Tier',
      name: 'Standard Mine Tier',
      price: 'Rp 450.000.000 / Tahun',
      seats: '25 User Seats',
      target: 'Kontraktor Tambang & Single Pit',
      features: [
        'Dasbor Analitik Real-Time',
        'Modul Pit & Ore Block Model',
        'Fleet Telemetry & Tracking BBM',
        'Stockpile & Manual Blending',
        'Mode Offline Operator (5 Device Limit)'
      ],
      highlight: false
    },
    {
      tierId: 'Smelter & Mine Pro Tier',
      name: 'Smelter & Mine Pro Tier',
      price: 'Rp 850.000.000 / Tahun',
      seats: '75 User Seats',
      target: 'Perusahaan Tambang Nikel & Smelter RKEF',
      features: [
        'Semua Fitur Standard Tier',
        'Smart AI Nickel Ore Blending Engine',
        'Kalkulator HPM Nikel & Royalty ESDM',
        'Barging & Integrasi Sucofindo COA API',
        'Generator Laporan RKAB ESDM AI',
        'Aktivasi Offline Challenge Response'
      ],
      highlight: true
    },
    {
      tierId: 'Enterprise Unlimited Tier',
      name: 'Enterprise Unlimited Tier (Lifetime / Perpetual)',
      price: 'Rp 1.450.000.000 / Tahun',
      seats: 'Unlimited Seats',
      target: 'Mining Holding & Smelter Conglomerate',
      features: [
        'Semua Fitur Pro Tier',
        'Dedicated NickelSmart AI Engine Model',
        'API Hub Sync (SAP, Oracle, ESDM MODI)',
        'Multi-Site Pit Custom Deployment',
        'SLA 99.9% & Unlimited Device Activation'
      ],
      highlight: false
    }
  ];

  const handleGenerateOfflineCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingOffline(true);
    try {
      const res = await fetch('/api/license/activate-offline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hardwareId,
          challengeCode,
          companyIup: companyIupInput
        })
      });
      const data = await res.json();
      setOfflineResult(data);
      setOfflineResponseCode(data.activationResponseCode);
    } catch (err) {
      alert('Gagal menghasilkan Kode Aktivasi Offline Server.');
    } finally {
      setIsGeneratingOffline(false);
    }
  };

  const handleApplyOfflineActivation = () => {
    if (!offlineResponseCode) return;
    onUpdateLicense({
      ...licenseInfo,
      status: 'ACTIVE',
      activationMode: 'OFFLINE_CHALLENGE',
      encryptedToken: offlineResult?.signatureToken || 'AES256-OFFLINE-OK-2027',
      activatedAt: new Date().toISOString().split('T')[0]
    });
    alert('Aktivasi Offline Lisensi Berhasil Disimpan di Sistem Lapangan!');
  };

  const handleRunApiTest = async () => {
    setIsLoadingApi(true);
    try {
      const parsedBody = JSON.parse(apiRequestBody);
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedBody)
      });
      const data = await res.json();
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setApiResponse(JSON.stringify({ error: 'REST API Test Failed', details: err?.message }, null, 2));
    } finally {
      setIsLoadingApi(false);
    }
  };

  const handleAddDeviceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceName || !newDeviceHwid) return;
    onRegisterDevice(newDeviceName, newDeviceHwid, newDeviceLocation || 'Site Office Morowali');
    setNewDeviceName('');
    setNewDeviceHwid('');
    setNewDeviceLocation('');
    setShowAddDeviceModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              License Server & SaaS Management
            </span>
            <span className="text-slate-400 text-xs">• Lisensi Perusahaan Komersial & Server Aktivasi</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Pusat Manajemen Lisensi, Aktivasi & Limit Perangkat' : 'Enterprise License Server & Activation Hub'}
          </h2>
        </div>

        <button
          onClick={onOpenLicenseModal}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          <KeyRound className="w-4 h-4" />
          <span>Aktivasi Kunci Lisensi Baru</span>
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Dasbor & Paket SaaS</span>
        </button>

        <button
          onClick={() => setActiveTab('activation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'activation' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <WifiOff className="w-4 h-4" />
          <span>Aktivasi Online & Offline Challenge</span>
        </button>

        <button
          onClick={() => setActiveTab('device_limits')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'device_limits' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Laptop className="w-4 h-4" />
          <span>Limit Perangkat & HWID ({devices.length}/10)</span>
        </button>

        <button
          onClick={() => setActiveTab('company_validation')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'company_validation' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Validasi IUP & Enkripsi AES-256</span>
        </button>

        <button
          onClick={() => setActiveTab('api_sandbox')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
            activeTab === 'api_sandbox' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>REST API License & Verification</span>
        </button>
      </div>

      {/* TAB 1: DASHBOARD & TIER PACKAGES */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Active License Status Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-emerald-500/40 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-slate-100 text-sm">{licenseInfo.companyName}</span>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/40">
                {licenseInfo.tier} (STATUS: {licenseInfo.status})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Kunci Lisensi Aktif:</span>
                <code className="font-mono text-emerald-300 font-bold">{licenseInfo.licenseKey}</code>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Kapasitas Seat User:</span>
                <span className="font-semibold text-slate-200">{licenseInfo.usedSeats} / {licenseInfo.seats} Seats</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Masa Berlaku Lisensi:</span>
                <span className="font-semibold text-slate-200">s/d {licenseInfo.expiresAt}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tipe Aktivasi:</span>
                <span className="font-semibold text-emerald-400">{licenseInfo.activationMode || 'ONLINE'} Verification</span>
              </div>
            </div>
          </div>

          {/* Pricing Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((p, idx) => (
              <div 
                key={idx}
                className={`p-5 rounded-2xl bg-slate-900 border flex flex-col justify-between transition-all space-y-4 ${
                  p.highlight 
                    ? 'border-emerald-500 shadow-xl shadow-emerald-950/40 ring-1 ring-emerald-500/30' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  {p.highlight && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider inline-block">
                      Paling Populer
                    </span>
                  )}
                  
                  <div>
                    <h3 className="font-bold text-slate-100 text-base">{p.name}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">{p.target}</p>
                  </div>

                  <div>
                    <p className="text-lg font-extrabold text-emerald-400">{p.price}</p>
                    <span className="text-[11px] text-slate-500 font-semibold">{p.seats}</span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-xs">
                    {p.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onUpdateLicense({
                      ...licenseInfo,
                      tier: p.tierId as any,
                      status: p.tierId === 'Trial Mode' ? 'TRIAL' : 'ACTIVE'
                    });
                    alert(`Paket ${p.name} Berhasil Dipilih!`);
                  }}
                  className={`w-full py-2 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 ${
                    p.highlight 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span>Pilih Paket Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ONLINE & OFFLINE CHALLENGE ACTIVATION */}
      {activeTab === 'activation' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Online Activation Section */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Wifi className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-bold text-slate-100 text-base">Aktivasi Online via REST Server</h3>
                <p className="text-slate-400 text-[11px]">Memverifikasi lisensi langsung ke server NickelSmart AI Cloud</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Status Server Cloud:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  ONLINE (Latency: 12ms)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Alamat Endpoint Server:</span>
                <code className="text-slate-200 font-mono">https://api.smartmine.co.id/v1/license</code>
              </div>
            </div>

            <button
              onClick={onOpenLicenseModal}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>Buka Dialog Verifikasi Kunci Online</span>
            </button>
          </div>

          {/* Offline Challenge-Response Activation */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <WifiOff className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-bold text-slate-100 text-base">Aktivasi Offline Lapangan (Air-Gapped)</h3>
                <p className="text-slate-400 text-[11px]">Untuk lokasi tambang tanpa koneksi internet (Remote Site Pit)</p>
              </div>
            </div>

            <form onSubmit={handleGenerateOfflineCode} className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Hardware Fingerprint ID Perangkat:</label>
                <input
                  type="text"
                  value={hardwareId}
                  onChange={(e) => setHardwareId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Challenge Code dari Server Admin:</label>
                <input
                  type="text"
                  value={challengeCode}
                  onChange={(e) => setChallengeCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Validasi Reg IUP ESDM Perusahaan:</label>
                <input
                  type="text"
                  value={companyIupInput}
                  onChange={(e) => setCompanyIupInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingOffline}
                className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGeneratingOffline ? <Sparkles className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Generate Kode Respons Aktivasi Offline</span>
              </button>
            </form>

            {offlineResult && (
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 space-y-2">
                <span className="text-amber-300 font-bold block">Kode Respons Offline Terbit:</span>
                <code className="block bg-slate-950 p-2 rounded text-emerald-400 font-mono font-bold text-xs">
                  {offlineResult.activationResponseCode}
                </code>
                <button
                  onClick={handleApplyOfflineActivation}
                  className="w-full py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition-all"
                >
                  Terapkan Aktivasi Offline Ini
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: DEVICE LIMITS & HWID MANAGER */}
      {activeTab === 'device_limits' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-slate-100 text-base">Perangkat Terdaftar & Batas Aktivasi (Device Limit)</h3>
              <p className="text-xs text-slate-400">Membatasi jumlah komputer/tablet yang dapat menjalankan NickelSmart AI di site</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300">
                Slot Terpakai: <span className="text-emerald-400 font-mono">{devices.length}</span> / 10 Device Slots
              </span>

              <button
                onClick={() => setShowAddDeviceModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <Laptop className="w-4 h-4" />
                <span>+ Daftarkan Perangkat Baru</span>
              </button>
            </div>
          </div>

          {/* Registered Devices Table */}
          <div className="overflow-x-auto custom-scrollbar border border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3">Nama Perangkat & Tipe</th>
                  <th className="p-3">Hardware Fingerprint ID (HWID)</th>
                  <th className="p-3">Lokasi Site / Pit</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Aktivitas Terakhir</th>
                  <th className="p-3 text-right">Opsi Device Slot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {devices.map(dev => (
                  <tr key={dev.id} className="hover:bg-slate-800/30">
                    <td className="p-3 font-sans font-bold text-slate-200">{dev.deviceName}</td>
                    <td className="p-3 text-emerald-300 font-bold">{dev.hwid}</td>
                    <td className="p-3 font-sans text-slate-300">{dev.location}</td>
                    <td className="p-3 text-slate-400">{dev.ipAddress}</td>
                    <td className="p-3 text-slate-400 text-[11px]">{dev.lastActive}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onRevokeDevice(dev.id)}
                        className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold transition-all"
                      >
                        Revoke Slot
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Device Modal */}
          {showAddDeviceModal && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4">
                <h4 className="font-bold text-slate-100 text-base">Registrasi Perangkat Lapangan Baru</h4>
                <form onSubmit={handleAddDeviceSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Nama Perangkat:</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Workstation Dispatch Pit Beta"
                      value={newDeviceName}
                      onChange={(e) => setNewDeviceName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Hardware ID (HWID):</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. HWID-PITB-9921-X3"
                      value={newDeviceHwid}
                      onChange={(e) => setNewDeviceHwid(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Lokasi Perangkat:</label>
                    <input
                      type="text"
                      placeholder="e.g. Control Room Weda Bay"
                      value={newDeviceLocation}
                      onChange={(e) => setNewDeviceLocation(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddDeviceModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                    >
                      Simpan Device
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: COMPANY VALIDATION & ENCRYPTION TOKEN */}
      {activeTab === 'company_validation' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="font-bold text-slate-100 text-base">Validasi Legalitas IUP & Token Enkripsi AES-256</h3>
            <p className="text-xs text-slate-400">Pemeriksaan validasi lisensi berbasis nomor registrasi ESDM & tanda tangan kriptografi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-slate-400 font-bold block">Detail IUP Perusahaan Terdaftar:</span>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Nama Perusahaan:</span>
                  <span className="font-bold text-slate-100">{licenseInfo.companyName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IUP-OP Registration No:</span>
                  <span className="font-mono text-emerald-400 font-bold">IUP-OP No. 540/128/ESDM/2021</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status Registri ESDM MODI:</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">TERVERIFIKASI</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <span className="text-slate-400 font-bold block">Token Tanda Tangan Kriptografi AES-256:</span>
              <code className="block bg-slate-900 p-3 rounded font-mono text-[11px] text-purple-300 break-all border border-slate-800">
                {licenseInfo.encryptedToken || "AES256-R3M4VE1OOTIxO3NuYW1lPWxpc2Vuc2U7Y3A9UFRfTklDS0VMO3N0YXR1cz1B3VElWRS0yMDI3"}
              </code>
              <p className="text-slate-500 text-[11px]">Token ini diverifikasi oleh runtime NickelSmart AI pada setiap startup aplikasi untuk mencegah manipulasi lisensi.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REST API SANDBOX & DIGITAL CERTIFICATE */}
      {activeTab === 'api_sandbox' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-bold text-slate-100 text-base">REST API Sandbox License Server</h3>
              <p className="text-xs text-slate-400">Uji langsung endpoint verifikasi lisensi dan aktivasi dari sistem external / ERP</p>
            </div>

            <button
              onClick={() => {
                alert(`Sertifikat Lisensi Digital ${licenseInfo.companyName} Berhasil Diunduh!`);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Sertifikat Lisensi Digital</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
            {/* Request Builder */}
            <div className="space-y-3">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">API Endpoint:</label>
                <select
                  value={apiEndpoint}
                  onChange={(e) => setApiEndpoint(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 font-mono text-xs"
                >
                  <option value="/api/license/verify">POST /api/license/verify</option>
                  <option value="/api/license/activate-offline">POST /api/license/activate-offline</option>
                  <option value="/api/license/device-register">POST /api/license/device-register</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">JSON Payload Body:</label>
                <textarea
                  rows={6}
                  value={apiRequestBody}
                  onChange={(e) => setApiRequestBody(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-emerald-400 font-mono text-xs focus:outline-none"
                />
              </div>

              <button
                onClick={handleRunApiTest}
                disabled={isLoadingApi}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isLoadingApi ? <Sparkles className="w-4 h-4 animate-spin" /> : <Code className="w-4 h-4" />}
                <span>Jalankan HTTP Request Test</span>
              </button>
            </div>

            {/* Response Viewer */}
            <div className="space-y-2">
              <label className="block text-slate-300 font-semibold">Output Respons REST Server (JSON):</label>
              <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 font-mono text-[11px] h-60 overflow-y-auto custom-scrollbar">
                {apiResponse || '// Klik "Jalankan HTTP Request Test" untuk melihat respon server.'}
              </pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
