import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Lock, 
  UserCheck, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3, 
  Truck, 
  Layers, 
  Cpu, 
  Key, 
  Activity, 
  Globe, 
  Flame, 
  DollarSign, 
  FileText, 
  Database, 
  ChevronRight, 
  Play, 
  Bot, 
  Award, 
  Clock, 
  Sliders, 
  X, 
  Users, 
  Briefcase,
  AlertTriangle,
  XCircle,
  Check,
  PhoneCall,
  Boxes,
  Compass,
  Scale
} from 'lucide-react';
import { Language, UserRole } from '../types';

interface LandingPageProps {
  onEnterApp: (selectedRole?: UserRole) => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  language,
  onToggleLanguage
}) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginTab, setLoginTab] = useState<'quick_sso' | 'credentials' | 'company_code'>('quick_sso');
  const [selectedDemoRole, setSelectedDemoRole] = useState<UserRole>('Super Admin');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);

  // ROI Calculator State
  const [monthlyProductionWmt, setMonthlyProductionWmt] = useState<number>(100000); // 100k WMT/month
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState<number>(15000); // Rp 15,000 / Liter B35

  // ROI Calculations
  const estimatedFuelSavingsLiters = Math.round(monthlyProductionWmt * 0.45 * 12); // ~0.45L saved per WMT * 12 months
  const estimatedFuelSavingsIdr = estimatedFuelSavingsLiters * fuelPricePerLiter;
  const estimatedRkabHoursSaved = Math.round((monthlyProductionWmt / 1000) * 8); // Hours saved per year
  const estimatedTotalAnnualValueUsd = Math.round((estimatedFuelSavingsIdr / 15800) + (monthlyProductionWmt * 1.2 * 12));

  const demoRolesList: { role: UserRole; title: string; desc: string; icon: string }[] = [
    { role: 'Super Admin', title: 'Super Admin / Enterprise Director', desc: 'Akses penuh ke 27+ modul, multi-company & lisensi SaaS', icon: '👑' },
    { role: 'Mine Manager', title: 'KTT / Kepala Teknik Tambang', desc: 'Pengawasan pit, inspeksi K3LH, persetujuan RKAB & ESG', icon: '👷' },
    { role: 'Operation Manager', title: 'Manager Operasi & Fleet', desc: 'Monitoring GPS Dump Truck, konsumsi BBM & efisiensi hauling', icon: '🚛' },
    { role: 'Finance Director', title: 'Direktur Keuangan & Commercial', desc: 'Cashflow, invoice smelter, penetapan HPM & analisis LME', icon: '💎' },
    { role: 'Geologist', title: 'Chief Geologist & QC Lab', desc: 'Survey topografi, kadar nikel (Ni, Fe, MC) & blending stockpile', icon: '🔬' }
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEnterApp(selectedDemoRole);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Glows & Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onEnterApp('Super Admin')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-100 tracking-tight">NickelSmart AI</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ESDM V3.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Enterprise Mining Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#hook" className="hover:text-indigo-400 transition-colors">Utama</a>
            <a href="#masalah" className="hover:text-rose-400 transition-colors">Masalah Tambang</a>
            <a href="#solusi" className="hover:text-emerald-400 transition-colors">Solusi AI</a>
            <a href="#perbandingan" className="hover:text-amber-400 transition-colors">Perbandingan</a>
            <a href="#kalkulator-roi" className="hover:text-indigo-400 transition-colors">Kalkulator ROI</a>
            <a href="#modul-erp" className="hover:text-indigo-400 transition-colors">27+ Modul</a>
            <a href="#cta" className="hover:text-emerald-300 transition-colors font-bold">Mulai Demo</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleLanguage}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{language === 'ID' ? 'Bahasa ID' : 'English'}</span>
            </button>

            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-100 text-xs font-bold transition-all flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Portal Login</span>
            </button>

            <button
              onClick={() => onEnterApp('Super Admin')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Masuk ERP System</span>
            </button>
          </div>

        </div>
      </header>

      {/* 1. HOOK SECTION */}
      <section id="hook" className="relative pt-12 pb-20 px-4 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* High CTR Hook Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/40 text-xs font-bold text-indigo-300 shadow-xl shadow-indigo-500/10 animate-pulse">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Satu-Satunya Platform AI Pertambangan Nikel Terpadu Indonesia</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        {/* Powerful Hook Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight max-w-5xl mx-auto leading-[1.15]">
          Pangkas Biaya Solar B35 Hingga <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">18%</span> & Eliminasi Denda Demurrage Tongkang Sekali Klik
        </h1>

        {/* Hook Subheadline */}
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Platform AI Mining Operating System terintegrasi dari <strong className="text-white">Pit Exploration</strong>, <strong className="text-white">GPS Hauling Telemetry</strong>, <strong className="text-white">AI Stockpile Blending</strong>, hingga <strong className="text-white">Otomasi RKAB ESDM</strong> dan Penjualan Smelter (Morowali & Weda Bay).
        </p>

        {/* Hook CTA Action Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-extrabold text-sm shadow-2xl shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 group"
          >
            <Key className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>🚀 BUKA MENU DEMO VIP & LOGIN</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onEnterApp('Super Admin')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-100 font-extrabold text-sm transition-all flex items-center justify-center gap-2 hover:bg-slate-800"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>⚡ Masuk Langsung ke Dashboard Real-Time</span>
          </button>
        </div>

        {/* Live Market Ticker */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-2xl max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-mono">
          <div className="border-r border-slate-800 pr-2">
            <span className="text-[10px] text-slate-400 block">HARGA NIKEL LME</span>
            <strong className="text-emerald-400 text-sm font-bold">$16,840 / MT</strong>
            <span className="text-[10px] text-emerald-500 block">▲ +2.4% (Spot)</span>
          </div>
          <div className="border-r border-slate-800 pr-2">
            <span className="text-[10px] text-slate-400 block">HPM ESDM SAPROLITE</span>
            <strong className="text-indigo-300 text-sm font-bold">$32.40 / WMT</strong>
            <span className="text-[10px] text-slate-400 block">FOB Jetty Standard</span>
          </div>
          <div className="border-r border-slate-800 pr-2">
            <span className="text-[10px] text-slate-400 block">TOTAL TONASE OPERASIONAL</span>
            <strong className="text-amber-300 text-sm font-bold">12,850,000 WMT</strong>
            <span className="text-[10px] text-slate-400 block">Across 45 Mines</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">KEPATUHAN RKAB ESDM</span>
            <strong className="text-emerald-400 text-sm font-bold">100% GARANSI</strong>
            <span className="text-[10px] text-emerald-500 block">Verified Compliance</span>
          </div>
        </div>

      </section>

      {/* 2. MASALAH (PROBLEM) SECTION */}
      <section id="masalah" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-10 border-t border-slate-800/80">
        
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 inline-flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Tantangan & Masalah Utama Industri Nikel
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
            Mengapa Cara Manual & Spreadsheet Membunuh Margin Tambang Anda?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Hampir 80% perusahaan tambang nikel di Indonesia mengalami kerugian finansial tersembunyi akibat pengelolaan data operasional yang terpisah-pisah.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-900 border border-rose-900/40 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-lg">
              ⛽
            </div>
            <h3 className="text-sm font-extrabold text-rose-200">1. Kebocoran BBM Solar B35 & Fraud Ritase</h3>
            <p className="text-slate-400 leading-relaxed">
              Tanpa sensor flowmeter dan telemetri GPS real-time, pencurian solar B35 dan manipulasi jumlah ritase oleh kontraktor hauling menyedot hingga 15-20% anggaran OPEX harian.
            </p>
            <div className="pt-2 text-rose-400 font-bold font-mono text-[11px] flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Kerugian: Ratusan Juta Rupiah / Bulan
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-900 border border-rose-900/40 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg">
              🚢
            </div>
            <h3 className="text-sm font-extrabold text-amber-200">2. Pembengkakan Denda Demurrage Tongkang</h3>
            <p className="text-slate-400 leading-relaxed">
              Antrean tongkang di jetty yang tidak terprediksi serta hambatan sertifikat COA/COI menyebabkan denda demurrage mahal ($5,000 - $15,000 / hari per tongkang).
            </p>
            <div className="pt-2 text-amber-400 font-bold font-mono text-[11px] flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Denda: USD $50,000+ Per Kapal
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-900 border border-rose-900/40 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-lg">
              🔬
            </div>
            <h3 className="text-sm font-extrabold text-rose-200">3. Penolakan Smelter (Off-Spec Ore Penalty)</h3>
            <p className="text-slate-400 leading-relaxed">
              Formulasi blending stockpile secara manual sering meleset dari spesifikasi pembeli (Ni &lt; 1.8%, Fe tinggi, Moisture tinggi), berujung klaim pinalti dan penolakan kargo.
            </p>
            <div className="pt-2 text-rose-400 font-bold font-mono text-[11px] flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Penolakan Kargo & Pemotongan HPM
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-900 border border-rose-900/40 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-lg">
              📜
            </div>
            <h3 className="text-sm font-extrabold text-rose-200">4. Lambatnya Pelaporan RKAB ESDM</h3>
            <p className="text-slate-400 leading-relaxed">
              Konsolidasi data manual dari berbagai divisi untuk dokumen RKAB memakan waktu 3-4 minggu, berisiko keterlambatan persetujuan dan penghentian sementara izin operasi tambang.
            </p>
            <div className="pt-2 text-rose-400 font-bold font-mono text-[11px] flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Risiko Sanksi Administrasi ESDM
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-900 border border-rose-900/40 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg">
              📊
            </div>
            <h3 className="text-sm font-extrabold text-amber-200">5. Data Terisolasi & Keputusan Berisiko</h3>
            <p className="text-slate-400 leading-relaxed">
              Tim Pit, QC Lab, Timbangan, dan Keuangan bekerja di spreadsheet terpisah. Direksi tidak memiliki visibilitas real-time terhadap arus kas dan cadangan ore site.
            </p>
            <div className="pt-2 text-amber-400 font-bold font-mono text-[11px] flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Blind Spot Manajemen & Decision Delay
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-rose-950/30 to-slate-900 border border-rose-900/40 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-lg">
              🛡️
            </div>
            <h3 className="text-sm font-extrabold text-rose-200">6. Kerentanan Audit Compliance & SIMBARA</h3>
            <p className="text-slate-400 leading-relaxed">
              Pencatatan nota angkut dan sertifikat surveyor independen (Sucofindo/Carsurin) yang tidak terintegrasi rentan terhadap selisih audit PNBP dan royalti minerba.
            </p>
            <div className="pt-2 text-rose-400 font-bold font-mono text-[11px] flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Potensi Denda & Temuan Audit
            </div>
          </div>

        </div>

      </section>

      {/* 3. SOLUSI (SOLUTION) SECTION */}
      <section id="solusi" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-10 border-t border-slate-800/80">
        
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Solusi Terpadu NickelSmart AI Mining OS
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
            Ekosistem Cerdas Memaksimalkan Profitabilitas Site Tambang
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Menghubungkan seluruh lini operasional dalam satu platform AI terpadu, dari pit tambang hingga penagihan ke smelter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-emerald-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Otomasi RKAB AI Generator (10 Detik)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mengompilasi data target produksi, cadangan ore, dan anggaran lingkungan menjadi dokumen resmi RKAB ESDM otomatis yang 100% patuh Permen ESDM No. 10/2023.
            </p>
            <div className="text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1 pt-2">
              <Check className="w-3.5 h-3.5" /> Pangkas 30 Hari Kerja Jadi Hitungan Detik
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-indigo-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Telemetri Flowmeter B35 Anti-Theft</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Integrasi sensor flowmeter BBM digital & GPS Geofencing Hauling Road untuk memantau konsumsi solar B35 per liter/tonase dan memblokir potensi kecurangan BBM.
            </p>
            <div className="text-indigo-400 font-mono text-[11px] font-bold flex items-center gap-1 pt-2">
              <Check className="w-3.5 h-3.5" /> Garansi Hemat Solar Hingga 18%
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">AI Stockpile Blending Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Algoritma AI preskriptif yang mengkalkulasi komposisi percampuran ore Saprolit & Limonit secara presisi agar persis sesuai target kontrak smelter (Zero Off-Spec).
            </p>
            <div className="text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1 pt-2">
              <Check className="w-3.5 h-3.5" /> Akurasi Blending 99.8% On-Spec
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-teal-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Jetty Queue & Demurrage Eliminator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Manajemen antrean tongkang otomatis, pemantauan pasang surut dermaga, dan penerbitan nota muat digital untuk mengeliminasi denda keterlambatan tongkang.
            </p>
            <div className="text-teal-300 font-mono text-[11px] font-bold flex items-center gap-1 pt-2">
              <Check className="w-3.5 h-3.5" /> Zero Demurrage Fine Guarantee
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-purple-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">API Integration Hub (SIMBARA & SAP)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sinkronisasi data otomatis via REST API dengan SIMBARA ESDM, ERP SAP/Oracle, Timbangan Digital, serta sistem survey Sucofindo/Carsurin secara real-time.
            </p>
            <div className="text-purple-400 font-mono text-[11px] font-bold flex items-center gap-1 pt-2">
              <Check className="w-3.5 h-3.5" /> Direct Automated API Sync
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-sky-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">ISO 27001 & Offline Field Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Keamanan data kelas enterprise bersertifikat ISO 27001 dengan dukungan aplikasi lapangan offline-first bagi operator pit di lokasi minim sinyal internet.
            </p>
            <div className="text-sky-300 font-mono text-[11px] font-bold flex items-center gap-1 pt-2">
              <Check className="w-3.5 h-3.5" /> 100% Offline-Ready Field App
            </div>
          </div>

        </div>

      </section>

      {/* 4. PERBANDINGAN (COMPARISON TABLE) SECTION */}
      <section id="perbandingan" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-10 border-t border-slate-800/80">
        
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            Matriks Perbandingan Langsung
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
            Metode Manual/Spreadsheet vs. NickelSmart AI Mining OS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Bandingkan bagaimana transformasi digital NickelSmart AI memberikan keunggulan kompetitif mutlak bagi perusahaan tambang Anda.
          </p>
        </div>

        {/* Comparison Table Container */}
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-4 w-1/4">Parameter Operasional Site</th>
                <th className="p-4 w-1/3 bg-rose-950/20 text-rose-300 border-x border-slate-800">
                  ❌ Metode Konvensional / Spreadsheet
                </th>
                <th className="p-4 w-1/3 bg-emerald-950/40 text-emerald-300">
                  ✨ NickelSmart AI Mining OS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-sans">
              
              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-extrabold text-slate-200">Waktu Pembuatan Dokumen RKAB ESDM</td>
                <td className="p-4 text-rose-300 bg-rose-950/10 border-x border-slate-800">
                   Lambat (3 - 4 Minggu), butuh rekapitulasi manual ribuan file Excel
                </td>
                <td className="p-4 font-bold text-emerald-300 bg-emerald-950/20">
                  ⚡ Otomatis 10 Detik berbasis AI Generator Permen ESDM No. 10/2023
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-extrabold text-slate-200">Akurasi Blending Ore Stockpile</td>
                <td className="p-4 text-rose-300 bg-rose-950/10 border-x border-slate-800">
                   Rendah (75-80%), sering terjadi claim pinalti off-spec dari smelter
                </td>
                <td className="p-4 font-bold text-emerald-300 bg-emerald-950/20">
                  🎯 Presisi 99.8% On-Spec (Optimalisasi Kadar Ni, Fe, MC & SiO2/MgO)
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-extrabold text-slate-200">Pengawasan Konsumsi Solar B35</td>
                <td className="p-4 text-rose-300 bg-rose-950/10 border-x border-slate-800">
                   Rawan kebocoran BBM & pencurian ritase (Sticker manual)
                </td>
                <td className="p-4 font-bold text-emerald-300 bg-emerald-950/20">
                  ⛽ Sensor Digital Flowmeter + GPS Telemetry (Hemat Solar 18%)
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-extrabold text-slate-200">Risiko Denda Demurrage Tongkang Jetty</td>
                <td className="p-4 text-rose-300 bg-rose-950/10 border-x border-slate-800">
                   Tinggi ($5,000 - $15,000 / hari per tongkang akibat antrean macet)
                </td>
                <td className="p-4 font-bold text-emerald-300 bg-emerald-950/20">
                  🚢 Zero Demurrage Guarantee via AI Jetty Scheduling Engine
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-extrabold text-slate-200">Sinkronisasi Data Pit - Lab - Finance</td>
                <td className="p-4 text-rose-300 bg-rose-950/10 border-x border-slate-800">
                   Data terisolasi (Silo), terlambat 1-3 hari hingga laporan diterima
                </td>
                <td className="p-4 font-bold text-emerald-300 bg-emerald-950/20">
                  📡 Real-Time IoT Cloud Sync & Dashboard Executive 360°
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-extrabold text-slate-200">Kepatuhan SIMBARA & Audit Minerba</td>
                <td className="p-4 text-rose-300 bg-rose-950/10 border-x border-slate-800">
                   Manual input, berisiko selisih tonase royalti dan koreksi pajak
                </td>
                <td className="p-4 font-bold text-emerald-300 bg-emerald-950/20">
                  🔗 Direct API Gateway SIMBARA & e-PNBP Kemenkeu Ready
                </td>
              </tr>

              <tr className="hover:bg-slate-800/30">
                <td className="p-4 font-extrabold text-slate-200">Operasional Area Minim Sinyal Internet</td>
                <td className="p-4 text-rose-300 bg-rose-950/10 border-x border-slate-800">
                   Kertas & Nota Fisik hilang/rusak terkena lumpur tambang
                </td>
                <td className="p-4 font-bold text-emerald-300 bg-emerald-950/20">
                  📱 Offline-First Mobile App untuk Operator Pit & Driver Hauling
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </section>

      {/* Interactive Live ROI Calculator Section */}
      <section id="kalkulator-roi" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-8 border-t border-slate-800/80">
        
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/80 border border-slate-700 shadow-2xl space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Simulasi Hemat Biaya
                </span>
                <span className="text-slate-400 text-xs">• Real-Time ROI Engine</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                Kalkulator Estimasi Penghematan Operasional Tambang
              </h2>
              <p className="text-xs text-slate-400 max-w-xl mt-1">
                Hitung langsung proyeksi efisiensi bahan bakar B35, waktu pembuatan RKAB ESDM, dan pencegahan denda demurrage tongkang.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 shrink-0 text-right font-mono">
              <span className="text-xs text-slate-400 block">ESTIMASI EFISIENSI NILAI TAHUNAN:</span>
              <strong className="text-3xl font-black text-emerald-400">${(estimatedTotalAnnualValueUsd ?? 0).toLocaleString()} USD</strong>
              <span className="text-[10px] text-slate-500 block">≈ Rp {(estimatedTotalAnnualValueUsd * 15800).toLocaleString('id-ID')} IDR</span>
            </div>
          </div>

          {/* Slider Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="space-y-4 p-5 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-200">Volume Produksi Nikel Bulanan (WMT):</label>
                <span className="font-mono text-indigo-400 font-extrabold text-sm">{(monthlyProductionWmt ?? 0).toLocaleString()} WMT</span>
              </div>
              <input 
                type="range" 
                min={20000} 
                max={500000} 
                step={10000}
                value={monthlyProductionWmt}
                onChange={(e) => setMonthlyProductionWmt(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>20,000 WMT</span>
                <span>250,000 WMT</span>
                <span>500,000 WMT</span>
              </div>
            </div>

            <div className="space-y-4 p-5 bg-slate-950 rounded-2xl border border-slate-800">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold text-slate-200">Harga Solar Industri B35 (Rp/Liter):</label>
                <span className="font-mono text-emerald-400 font-extrabold text-sm">Rp {(fuelPricePerLiter ?? 0).toLocaleString('id-ID')}</span>
              </div>
              <input 
                type="range" 
                min={12000} 
                max={20000} 
                step={500}
                value={fuelPricePerLiter}
                onChange={(e) => setFuelPricePerLiter(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>Rp 12,000</span>
                <span>Rp 15,000</span>
                <span>Rp 20,000</span>
              </div>
            </div>

          </div>

          {/* Calculated Output Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px]">PENGHEMATAN SOLAR B35 TAHUNAN</span>
              <p className="text-lg font-bold text-emerald-400">{(estimatedFuelSavingsLiters ?? 0).toLocaleString()} Liter</p>
              <span className="text-[10px] text-slate-500">Nilai: Rp {(estimatedFuelSavingsIdr ?? 0).toLocaleString('id-ID')}</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px]">WAKTU PENYUSUNAN RKAB ESDM</span>
              <p className="text-lg font-bold text-indigo-300">{(estimatedRkabHoursSaved ?? 0).toLocaleString()} Jam Dihemat</p>
              <span className="text-[10px] text-slate-500">Dari 30 Hari menjadi 10 Detik</span>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px]">PENCEGAHAN PENALTY CLIMATE & MOISTURE</span>
              <p className="text-lg font-bold text-amber-300">100% Akurat</p>
              <span className="text-[10px] text-slate-500">Zero Rejected Barges</span>
            </div>
          </div>

        </div>

      </section>

      {/* 27+ Enterprise Modules Showcase Grid */}
      <section id="modul-erp" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-8 border-t border-slate-800/80">
        
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Ekosistem Komprehensif
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
            27+ Modul Terintegrasi Dalam Satu Suite Pertambangan
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Semua fungsi perusahaan tambang nikel tersedia dan siap digunakan secara langsung.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {[
            { name: 'Operation Center 360°', icon: '📡' },
            { name: 'Penyusunan RKAB AI', icon: '📜' },
            { name: 'Eksplorasi Pit & Ore', icon: '⛏️' },
            { name: 'Survey Topografi', icon: '📐' },
            { name: 'Telemetri GPS Dump Truck', icon: '🚛' },
            { name: 'Sensor IoT Site', icon: '📟' },
            { name: 'Stockpile Blending', icon: '⛰️' },
            { name: 'Jetty & Demurrage Barging', icon: '🚢' },
            { name: 'Penjualan Smelter & HPM', icon: '🏭' },
            { name: 'CRM & Kontrak Offtake', icon: '💼' },
            { name: 'Pengadaan & Tender', icon: '📦' },
            { name: 'Manajemen Proyek CAPEX', icon: '📋' },
            { name: 'SDM & Capital Human', icon: '👥' },
            { name: 'Pusat Laporan & Dashboard', icon: '📊' },
            { name: 'Keamanan Siber & ISO 27001', icon: '🛡️' },
            { name: 'API Hub & Third-Party Sync', icon: '🔗' },
            { name: 'Lisensi SaaS & Server Engine', icon: '💻' },
            { name: 'Notifikasi WA/SMS/Alert', icon: '🔔' },
            { name: 'Manajemen Dokumen', icon: '📁' },
            { name: 'HSE & K3LH Safety', icon: '🦺' },
            { name: 'Environment ESG', icon: '🌱' },
            { name: 'Pos Guard & Pos Keamanan', icon: '👮' },
            { name: 'Offline Field Operator', icon: '📱' },
            { name: 'Asisten AI MineGPT', icon: '🤖' }
          ].map((m, idx) => (
            <div key={idx} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-center gap-2 hover:border-indigo-500/40 transition-all cursor-pointer" onClick={() => onEnterApp('Super Admin')}>
              <span className="text-base">{m.icon}</span>
              <span className="font-bold text-slate-200 text-[11px] truncate">{m.name}</span>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onEnterApp('Super Admin')}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-xl transition-all inline-flex items-center gap-2"
          >
            <span>Jelajahi Semua Modul di Aplikasi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </section>

      {/* 5. CALL TO ACTION (CTA) SECTION */}
      <section id="cta" className="py-20 px-4 lg:px-8 max-w-7xl mx-auto relative">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/40 shadow-2xl relative overflow-hidden text-center space-y-6">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Siap Mentransformasi Operasional Tambang Nikel Anda?
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white max-w-4xl mx-auto leading-tight">
            Tingkatkan Profitabilitas Site & Jadwalkan Demo Platform Hari Ini
          </h2>

          <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dengan puluhan konsesi pertambangan nikel di Sulawesi & Halmahera yang telah mengotomatisasi RKAB, menghemat solar B35, dan mencapai zero demurrage.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-2xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-95"
            >
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>DAPATKAN DEMO VIP & SIMULASI GRATIS</span>
            </button>

            <button
              onClick={() => {
                const message = encodeURIComponent("Halo NickelSmart AI, saya ingin konsultasi mengenai integrasi site konsesi tambang nikel.");
                window.open(`https://wa.me/6285187869164?text=${message}`, '_blank');
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-100 font-bold text-sm transition-all flex items-center justify-center gap-2 hover:bg-slate-800 shadow-xl hover:shadow-emerald-500/10 group"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Jadwalkan Konsultasi Site Konsesi (WA 085187869164)</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Check className="w-4 h-4" /> Tanpa Biaya Setup
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Check className="w-4 h-4" /> Integrasi &lt; 48 Jam
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Check className="w-4 h-4" /> Garansi Compliance ESDM
            </span>
          </div>

        </div>
      </section>

      {/* Footer Section */}
      <footer className="border-t border-slate-800/80 py-12 px-4 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-slate-300">NickelSmart AI Enterprise Mining Suite 2026</span>
        </div>

        <p>© 2026 NickelSmart AI Technologies. Permen ESDM Compliant & ISO 27001 Certified.</p>

        <div className="flex items-center gap-4 text-slate-400">
          <a href="#hook" className="hover:text-slate-200">Syarat Ketentuan</a>
          <a href="#solusi" className="hover:text-slate-200">Keamanan Cloud</a>
          <button onClick={() => setIsLoginModalOpen(true)} className="text-amber-400 font-bold hover:underline">Portal Login</button>
        </div>
      </footer>

      {/* Modal Consultation Form */}
      {isConsultModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4 relative">
            <button onClick={() => setIsConsultModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">✕</button>
            
            <div className="text-center space-y-1">
              <PhoneCall className="w-8 h-8 text-indigo-400 mx-auto" />
              <h3 className="text-lg font-bold text-white">Konsultasi Integrasi Site Tambang</h3>
              <p className="text-xs text-slate-400">Tim spesialis solusi AI Mining kami siap membantu pemetaan kebutuhan konsesi Anda.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name') || 'Bambang Wijaya (KTT)';
              const company = formData.get('company') || 'PT Nikel Morowali Sejahtera';
              const phone = formData.get('phone') || '+62 812 3456 7890';
              const message = encodeURIComponent(`Halo NickelSmart AI, saya ingin konsultasi integrasi site konsesi tambang.\n\n*Nama:* ${name}\n*Perusahaan/IUP:* ${company}\n*No. HP:* ${phone}`);
              window.open(`https://wa.me/6285187869164?text=${message}`, '_blank');
              setIsConsultModalOpen(false);
            }} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nama Lengkap & Jabatan:</label>
                <input type="text" name="name" defaultValue="Bambang Wijaya (KTT)" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nama Perusahaan / IUP Konsesi:</label>
                <input type="text" name="company" defaultValue="PT Nikel Morowali Sejahtera" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-slate-300 font-bold block mb-1">Nomor WhatsApp / Telepon:</label>
                <input type="tel" name="phone" defaultValue="+62 812 3456 7890" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-lg flex items-center justify-center gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>KIRIM VIA WHATSAPP (085187869164)</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sleek Luxury Login Modal / Menu */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6 relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 p-0.5 mx-auto">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Key className="w-6 h-6 text-amber-300" />
                </div>
              </div>
              <h3 className="text-xl font-extrabold text-slate-100">Portal Akses Login Enterprise</h3>
              <p className="text-xs text-slate-400">Pilih metode autentikasi atau Quick SSO Demo untuk masuk</p>
            </div>

            {/* Login Mode Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl text-xs font-bold border border-slate-800">
              <button
                onClick={() => setLoginTab('quick_sso')}
                className={`py-2 rounded-lg transition-all ${loginTab === 'quick_sso' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Quick SSO
              </button>
              <button
                onClick={() => setLoginTab('credentials')}
                className={`py-2 rounded-lg transition-all ${loginTab === 'credentials' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Credentials
              </button>
              <button
                onClick={() => setLoginTab('company_code')}
                className={`py-2 rounded-lg transition-all ${loginTab === 'company_code' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Tenant PIN
              </button>
            </div>

            {/* Tab 1: Quick Demo Role Selector */}
            {loginTab === 'quick_sso' && (
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-300 block">Pilih Role Pengguna / Jabatan Demo:</label>
                
                <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar pr-1">
                  {demoRolesList.map((r) => (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => setSelectedDemoRole(r.role)}
                      className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                        selectedDemoRole === r.role 
                          ? 'bg-indigo-600/20 border-indigo-500 text-slate-100 shadow-md ring-1 ring-indigo-500' 
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className="text-xl">{r.icon}</span>
                      <div>
                        <strong className="text-xs font-bold block text-slate-100">{r.title}</strong>
                        <span className="text-[10px] text-slate-400 block">{r.desc}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onEnterApp(selectedDemoRole)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <UnlockIcon className="w-4 h-4" />
                  <span>MASUK SEBAGAI {selectedDemoRole.toUpperCase()}</span>
                </button>
              </div>
            )}

            {/* Tab 2: Standard Credentials */}
            {loginTab === 'credentials' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Email Corporate ESDM:</label>
                  <input 
                    type="email" 
                    defaultValue="ktt.bambang@nikelsite.co.id" 
                    required 
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Password Enkripsi:</label>
                  <input 
                    type="password" 
                    defaultValue="••••••••••••" 
                    required 
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-lg transition-all"
                >
                  VERIFIKASI & MASUK APLIKASI
                </button>
              </form>
            )}

            {/* Tab 3: Tenant Company Code */}
            {loginTab === 'company_code' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Kode Perusahaan Multi-Tenant:</label>
                  <input 
                    type="text" 
                    defaultValue="PT-NIKEL-MOROWALI-01" 
                    required 
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">PIN Keamanan Site:</label>
                  <input 
                    type="password" 
                    defaultValue="8899" 
                    required 
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-indigo-500 font-mono text-center tracking-widest"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-lg transition-all"
                >
                  MASUK PORTAL TENANT
                </button>
              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

const UnlockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
  </svg>
);

