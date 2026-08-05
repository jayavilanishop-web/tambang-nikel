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
  Briefcase 
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
      
      {/* Top Floating Glass Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-100 tracking-tight">NickelSmart AI</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Enterprise Mining ERP v3.8
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Enterprise Mining Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#fitur" className="hover:text-indigo-400 transition-colors">Fitur Utama</a>
            <a href="#manfaat" className="hover:text-indigo-400 transition-colors">Manfaat Kunci</a>
            <a href="#kalkulator-roi" className="hover:text-indigo-400 transition-colors">Kalkulator ROI</a>
            <a href="#modul-erp" className="hover:text-indigo-400 transition-colors">27+ Modul ERP</a>
            <a href="#keamanan" className="hover:text-indigo-400 transition-colors">Keamanan Siber & API</a>
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
              <span>Menu Login</span>
            </button>

            <button
              onClick={() => onEnterApp('Super Admin')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white text-xs font-extrabold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Masuk Aplikasi ERP</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* High CTR Hook Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/40 text-xs font-bold text-indigo-300 shadow-xl shadow-indigo-500/10 animate-pulse">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Satu-Satunya Platform Mining AI Terpadu Indonesia: Otomasi RKAB ESDM Dalam 10 Detik</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        {/* Powerful Catchy Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight max-w-5xl mx-auto leading-[1.15]">
          Hemat Solar B35 Hingga <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">18%</span> & Tingkatkan Efisiensi Tambang Nikel Anda Hingga <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">400%</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
          Platform ERP pertambangan berbasis <strong className="text-slate-100">AI Generatif (MineGPT)</strong> & <strong className="text-slate-100">IoT Telemetry</strong> terintegrasi dari Pit Exploration, Hauling Road, Stockpile Blending, Dermaga Jetty hingga Penjualan Smelter Morowali & Weda Bay.
        </p>

        {/* CTR Action Buttons Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          
          <button
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-extrabold text-sm shadow-2xl shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 hover:scale-[1.03] active:scale-95 group"
          >
            <Key className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>🚀 BUKA MENU LOGIN & DEMO VIP</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onEnterApp('Super Admin')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-100 font-extrabold text-sm transition-all flex items-center justify-center gap-2 hover:bg-slate-800"
          >
            <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>⚡ Masuk Langsung ke Aplikasi</span>
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

      {/* Feature Highlights Matrix */}
      <section id="fitur" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80">
        
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Fitur Utama NickelSmart AI
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
            Arsitektur Fitur Canggih untuk Operasional Tambang Modern
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Solusi end-to-end terintegrasi yang menghubungkan pit eksplorasi, telematika armada hauling, blending stockpile, hingga kepatuhan regulasi ESDM.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4 hover:border-indigo-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">AI MineGPT & Otomasi RKAB ESDM</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Penyusunan dokumen RKAB otomatis dalam hitungan detik, asisten AI interaktif untuk regulasi Permen ESDM No. 10/2023, serta prediksi kadar ore nikel secara preskriptif.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4 hover:border-emerald-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Smart Fleet Telemetry & Efisiensi B35</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tracking GPS real-time Dump Truck & Excavator, sensor flowmeter BBM B35 anti-pencurian, geofencing pit-to-port, dan pengurangan idle time hauling hingga 35%.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4 hover:border-amber-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">AI Blending Stockpile & Demurrage Jetty</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Algoritma AI blending nikel presisi tinggi (Saprolit/Limonit) agar lolos spesifikasi smelter (ITSS, Vale, Huayou) dan eliminasi denda demurrage tongkang.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4 hover:border-rose-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Keamanan Siber ISO 27001 & Pos Guard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enkripsi data pertambangan kelas militer AES-256, Zero-Trust Access Control, audit log tamper-proof, dan verifikasi Pos Guard biometrik terpadu.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4 hover:border-sky-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">API Integration Hub & Multi-System Sync</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              REST & GraphQL API Gateway untuk integrasi instan dengan SAP, Oracle, Minerba ESDM, GPS Telematika Vendor, dan alat ukur laboratorium Sucofindo/Carsurin.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-4 hover:border-purple-500/50 transition-all hover:shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Lisensi SaaS & Offline Field Operator</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Manajemen lisensi SaaS multi-tenant konsesi IUP, deployment Server Engine Hybrid Cloud/On-Premise, dan input data lapangan offline tanpa sinyal internet.
            </p>
          </div>

        </div>

      </section>

      {/* Benefits Section (Manfaat Utama Aplikasi) */}
      <section id="manfaat" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto space-y-12 border-t border-slate-800/80">
        
        <div className="text-center space-y-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Manfaat Kunci Aplikasi
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100">
            Dampak Nyata Terhadap Kinerja Operasional & Finansial Tambang
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Transformasi digital terukur yang memberikan keuntungan strategis bagi manajemen, KTT, dan pemilik konsesi pertambangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg">
              💰
            </div>
            <h3 className="text-sm font-extrabold text-slate-100">Penghematan Biaya Operasional (OPEX)</h3>
            <p className="text-slate-400 leading-relaxed">
              Mengurangi konsumsi solar B35 hingga 18% per tahun melalui optimasi siklus hauling, pencegahan kebocoran BBM, dan penghapusan denda demurrage tongkang di jetty port.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-emerald-400 font-bold font-mono text-[11px]">
              <TrendingUp className="w-3.5 h-3.5" /> Est. ROI &lt; 3 Bulan
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
            <h3 className="text-sm font-extrabold text-slate-100">Kecepatan Pelaporan Regulasi ESDM</h3>
            <p className="text-slate-400 leading-relaxed">
              Penyusunan dan rekapitulasi laporan RKAB harian, mingguan, dan tahunan yang dipangkas dari 30 hari kerja menjadi hitungan detik dengan garansi kepatuhan 100%.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-indigo-400 font-bold font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5" /> 99.9% Efisiensi Waktu
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg">
              🎯
            </div>
            <h3 className="text-sm font-extrabold text-slate-100">Zero Rejected Barges di Smelter</h3>
            <p className="text-slate-400 leading-relaxed">
              Presisi formulasi blending ore nikel menjaga stabilitas grade (Ni &gt; 1.8%, Fe, Co) sehingga terhindar dari pemotongan harga (penalty claim) atau penolakan oleh smelter.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-amber-300 font-bold font-mono text-[11px]">
              <Award className="w-3.5 h-3.5" /> Kualitas Sesuai Kontrak Offtake
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-lg">
              🛡️
            </div>
            <h3 className="text-sm font-extrabold text-slate-100">Transparansi & Keamanan Data Total</h3>
            <p className="text-slate-400 leading-relaxed">
              Visibilitas 360° dari ruang kerja KTT hingga Direksi Utama. Data cadangan ore dan keuangan terlindungi dengan ISO 27001 & POS Guard biometrik.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-rose-400 font-bold font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO 27001 Certified Security
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-lg">
              📶
            </div>
            <h3 className="text-sm font-extrabold text-slate-100">Operasional Tanpa Hambatan Sinyal</h3>
            <p className="text-slate-400 leading-relaxed">
              Operator lapangan di pit terdalam tetap dapat mencatat ritase hauling dan data sampel ore tanpa internet. Data otomatis tersinkronisasi saat kembali ke coverage area.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-sky-400 font-bold font-mono text-[11px]">
              <Zap className="w-3.5 h-3.5" /> Multi-Tenant Offline Engine
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg">
              🌱
            </div>
            <h3 className="text-sm font-extrabold text-slate-100">Kepatuhan ESG & Baku Mutu BPLH</h3>
            <p className="text-slate-400 leading-relaxed">
              Pemantauan baku mutu efluen air limpasan settling pond, jejak karbon armada hauling, dan kemajuan reklamasi lahan tambang sesuai standar hijau internasional.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-purple-400 font-bold font-mono text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" /> BPLH & Audit ESG Ready
            </div>
          </div>

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

      {/* Footer Section */}
      <footer className="border-t border-slate-800/80 py-12 px-4 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-slate-300">NickelSmart AI Enterprise Mining Suite 2026</span>
        </div>

        <p>© 2026 NickelSmart AI Technologies. Permen ESDM Compliant & ISO 27001 Certified.</p>

        <div className="flex items-center gap-4 text-slate-400">
          <a href="#fitur" className="hover:text-slate-200">Syarat Ketentuan</a>
          <a href="#keamanan" className="hover:text-slate-200">Keamanan Cloud</a>
          <button onClick={() => setIsLoginModalOpen(true)} className="text-amber-400 font-bold hover:underline">Portal Login</button>
        </div>
      </footer>

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
