import React, { useState } from 'react';
import { 
  DollarSign, 
  Receipt, 
  Landmark, 
  BookOpen, 
  PieChart, 
  Building, 
  TrendingUp, 
  TrendingDown, 
  Scale, 
  FileSpreadsheet, 
  CreditCard, 
  Coins, 
  Calculator, 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Printer, 
  Calendar, 
  Tag, 
  Layers, 
  Percent, 
  BarChart3, 
  SlidersHorizontal 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Language } from '../../types';

interface FinanceAccountingModuleProps {
  language: Language;
  initialTab?: string;
}

export const FinanceAccountingModule: React.FC<FinanceAccountingModuleProps> = ({
  language,
  initialTab
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'cash_flow'
    | 'general_ledger'
    | 'asset_management'
    | 'budget_cost_center'
    | 'financial_statements'
    | 'invoices_payments'
    | 'receivables_payables'
    | 'tax_management'
    | 'bank_multicurrency'
  >((initialTab as any) || 'cash_flow');

  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'IDR'>('USD');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Exchange Rates Data
  const fxRates = {
    USD_IDR: 16250,
    USD_CNY: 7.24,
    USD_AUD: 1.52
  };

  // Cash Flow Historical & Projection Data
  const cashFlowData = [
    { month: 'Jan 2026', cashInflowUsd: 4200000, cashOutflowUsd: 2850000, netCashFlowUsd: 1350000 },
    { month: 'Feb 2026', cashInflowUsd: 4850000, cashOutflowUsd: 3100000, netCashFlowUsd: 1750000 },
    { month: 'Mar 2026', cashInflowUsd: 5100000, cashOutflowUsd: 3400000, netCashFlowUsd: 1700000 },
    { month: 'Apr 2026', cashInflowUsd: 4600000, cashOutflowUsd: 3200000, netCashFlowUsd: 1400000 },
    { month: 'Mei 2026', cashInflowUsd: 5400000, cashOutflowUsd: 3500000, netCashFlowUsd: 1900000 },
    { month: 'Jun 2026', cashInflowUsd: 6200000, cashOutflowUsd: 3800000, netCashFlowUsd: 2400000 },
    { month: 'Jul 2026', cashInflowUsd: 5800000, cashOutflowUsd: 3650000, netCashFlowUsd: 2150000 }
  ];

  // General Ledger Journal Entries Dataset
  const [journalEntries, setJournalEntries] = useState([
    { entryNo: 'JV-2026-0801', date: '2026-08-01', accountCode: '1110-USD-BANK', accountName: 'Kas & Bank Mandiri USD', debitUsd: 1850000, creditUsd: 0, costCenter: 'CC-TREASURY', refDoc: 'INV-NICKEL-041' },
    { entryNo: 'JV-2026-0801', date: '2026-08-01', accountCode: '4100-ORE-SALES', accountName: 'Pendapatan Penjualan Bijih Nikel', debitUsd: 0, creditUsd: 1850000, costCenter: 'CC-SALES-EXPORT', refDoc: 'INV-NICKEL-041' },
    { entryNo: 'JV-2026-0802', date: '2026-08-02', accountCode: '5210-DIESEL-FUEL', accountName: 'Beban Bahan Bakar Solar B35', debitUsd: 342000, creditUsd: 0, costCenter: 'CC-PIT-ALPHA', refDoc: 'PO-2026-0811' },
    { entryNo: 'JV-2026-0802', date: '2026-08-02', accountCode: '2110-AP-VENDOR', accountName: 'Hutang Usaha PT Pertamina', debitUsd: 0, creditUsd: 342000, costCenter: 'CC-PIT-ALPHA', refDoc: 'PO-2026-0811' }
  ]);

  // Fixed Asset Register & Depreciation Schedule
  const [fixedAssetsList, setFixedAssetsList] = useState([
    { assetId: 'AST-EX-2001', assetName: 'Excavator Komatsu PC2000-8', category: 'Heavy Equipment', purchaseDate: '2024-03-15', acquisitionCostUsd: 2850000, accumulatedDeprecUsd: 570000, bookValueUsd: 2280000, usefulLifeYears: 10, method: 'STRAIGHT_LINE' },
    { assetId: 'AST-DT-1001', assetName: 'Dump Truck Caterpillar 777E', category: 'Heavy Fleet Truck', purchaseDate: '2024-06-20', acquisitionCostUsd: 1450000, accumulatedDeprecUsd: 290000, bookValueUsd: 1160000, usefulLifeYears: 8, method: 'STRAIGHT_LINE' },
    { assetId: 'AST-CRUSHER-01', assetName: 'Primary Jaw Crusher Plant 500 TPH', category: 'Processing Plant Asset', purchaseDate: '2023-01-10', acquisitionCostUsd: 4200000, accumulatedDeprecUsd: 1260000, bookValueUsd: 2940000, usefulLifeYears: 10, method: 'STRAIGHT_LINE' }
  ]);

  // Budget & Cost Center Breakdown per Departemen / Bagian Tambang
  const [budgetCostCenters, setBudgetCostCenters] = useState([
    { code: 'CC-PIT-ALPHA', name: 'Pit Alpha Mining Operations', dept: 'Departemen Penambangan (Mining)', budgetAllocatedUsd: 12500000, actualSpentUsd: 9840000, varianceUsd: 2660000, utilizationPct: 78.7 },
    { code: 'CC-GEOLOGY-EXPL', name: 'Geology, Exploration & Survey', dept: 'Departemen Geologi & EKS', budgetAllocatedUsd: 2200000, actualSpentUsd: 1650000, varianceUsd: 550000, utilizationPct: 75.0 },
    { code: 'CC-WORKSHOP-MAINT', name: 'Heavy Equipment Central Workshop', dept: 'Departemen Maintenance Fleet', budgetAllocatedUsd: 4800000, actualSpentUsd: 3950000, varianceUsd: 850000, utilizationPct: 82.3 },
    { code: 'CC-JETTY-PORT', name: 'Jetty Barging & Port Logistics', dept: 'Departemen Logistik Jetty', budgetAllocatedUsd: 3200000, actualSpentUsd: 2410000, varianceUsd: 790000, utilizationPct: 75.3 },
    { code: 'CC-SMELTER-PLANT', name: 'Ore Processing & Blending Plant', dept: 'Departemen Pengolahan Smelter', budgetAllocatedUsd: 5500000, actualSpentUsd: 4100000, varianceUsd: 1400000, utilizationPct: 74.5 },
    { code: 'CC-HSE-ENVIRONMENT', name: 'HSE, ESG & Reclamation Works', dept: 'Departemen K3 & Lingkungan', budgetAllocatedUsd: 1800000, actualSpentUsd: 1220000, varianceUsd: 580000, utilizationPct: 67.8 },
    { code: 'CC-HR-ADMIN', name: 'Human Capital, GA & Camp Operations', dept: 'Departemen HR & General Affairs', budgetAllocatedUsd: 2600000, actualSpentUsd: 1980000, varianceUsd: 620000, utilizationPct: 76.2 }
  ]);

  // Accounts Receivable (AR) & Accounts Payable (AP) Invoices
  const [arInvoices, setArInvoices] = useState([
    { invNo: 'INV-2026-NKL-01', customerName: 'PT Tsingshan Steel Indonesia', invDate: '2026-07-20', dueDate: '2026-08-20', amountUsd: 1850000, type: 'RECEIVABLE_AR', status: 'UNPAID_PENDING' },
    { invNo: 'INV-2026-NKL-02', customerName: 'PT Indonesia Morowali Industrial Park (IMIP)', invDate: '2026-07-28', dueDate: '2026-08-28', amountUsd: 2410000, type: 'RECEIVABLE_AR', status: 'UNPAID_PENDING' }
  ]);

  const [apInvoices, setApInvoices] = useState([
    { invNo: 'AP-PERTA-2026-88', supplierName: 'PT Pertamina Patra Niaga (Fuel B35)', invDate: '2026-07-25', dueDate: '2026-08-10', amountUsd: 342000, type: 'PAYABLE_AP', status: 'DUE_SOON' },
    { invNo: 'AP-TRAK-2026-12', supplierName: 'PT Trakindo Utama (CAT Parts)', invDate: '2026-07-15', dueDate: '2026-08-15', amountUsd: 142000, type: 'PAYABLE_AP', status: 'SCHEDULED_PAYMENT' }
  ]);

  // Tax Management Summary (VAT, Royalty, PPh)
  const [taxRecords, setTaxRecords] = useState([
    { taxType: 'Royalti Mineral PNBP ESDM (10%)', taxableBasisUsd: 38000000, taxAmountUsd: 3800000, dueDate: '2026-08-15', status: 'PAID' },
    { taxType: 'PPN Keluaran 11% (VAT Output)', taxableBasisUsd: 38000000, taxAmountUsd: 4180000, dueDate: '2026-08-31', status: 'PENDING_FILING' },
    { taxType: 'PPh Pasal 22 Impor & Alat Berat (1.5%)', taxableBasisUsd: 4200000, taxAmountUsd: 63000, dueDate: '2026-08-20', status: 'PAID' }
  ]);

  // Bank Accounts & Multi-Currency Balances
  const [bankAccounts, setBankAccounts] = useState([
    { bankName: 'Bank Mandiri (USD Corporate)', accountNo: '102-00-889123-1', balanceUsd: 8420000, balanceIdr: 136825000000, status: 'RECONCILED' },
    { bankName: 'Bank Central Asia (BCA IDR Operational)', accountNo: '084-332190-8', balanceUsd: 910769, balanceIdr: 14800000000, status: 'RECONCILED' },
    { bankName: 'Bank Himbara BRI (Royalty Escrow USD)', accountNo: '001-99-440112-2', balanceUsd: 3500000, balanceIdr: 56875000000, status: 'RECONCILED' }
  ]);

  // Detailed Operational Expenses (Biaya Operasional Tambang Dataset)
  const [opexRecords, setOpexRecords] = useState([
    { id: 'OPEX-2026-001', category: 'Bahan Bakar Solar B35 Industry', costCenter: 'CC-PIT-ALPHA', vendor: 'PT Pertamina Patra Niaga', monthlyAmountUsd: 1250000, costPerTonUsd: 8.33, status: 'APPROVED', lastUpdated: '2026-08-05', note: 'Pasokan solar 850.000 Liter/bulan untuk Fleet Pit Alpha & Hauling' },
    { id: 'OPEX-2026-002', category: 'Jasa Kontraktor Stripping Overburden & Mining', costCenter: 'CC-PIT-ALPHA', vendor: 'PT Pama Persada / PT Delta Dunia', monthlyAmountUsd: 1850000, costPerTonUsd: 12.33, status: 'APPROVED', lastUpdated: '2026-08-04', note: 'Jasa pemindahan OB 420.000 BCM & pengupasan limonin' },
    { id: 'OPEX-2026-003', category: 'Pemeliharaan & Spareparts Alat Berat (Workshop)', costCenter: 'CC-WORKSHOP-MAINT', vendor: 'PT Trakindo Utama / Komatsu', monthlyAmountUsd: 680000, costPerTonUsd: 4.53, status: 'APPROVED', lastUpdated: '2026-08-06', note: 'Overhaul engine CAT 777E & penggantian bucket tooth Excavator PC2000' },
    { id: 'OPEX-2026-004', category: 'Logistik Jetty, Loading & Transshipment Tongkang', costCenter: 'CC-JETTY-PORT', vendor: 'PT Pelayaran Nasional / Jetty Site', monthlyAmountUsd: 420000, costPerTonUsd: 2.80, status: 'APPROVED', lastUpdated: '2026-08-03', note: 'Sewa conveyor, tugboat & biaya loading 150.000 MT bijih nikel ke barge' },
    { id: 'OPEX-2026-005', category: 'Gaji, Tunjangan Site & Mess Karyawan', costCenter: 'CC-PIT-ALPHA', vendor: 'Internal HR Payroll', monthlyAmountUsd: 520000, costPerTonUsd: 3.47, status: 'APPROVED', lastUpdated: '2026-08-01', note: 'Gaji 1.420 SDM site, insentif roster, & operasional catering camp' },
    { id: 'OPEX-2026-006', category: 'Pengelolaan Lingkungan, Reklamasi & K3 (HSE)', costCenter: 'CC-HSE-ENVIRONMENT', vendor: 'Internal HSE & Lab Lingkungan', monthlyAmountUsd: 210000, costPerTonUsd: 1.40, status: 'APPROVED', lastUpdated: '2026-08-02', note: 'Pemantauan air asam tambang, penanaman cover crop, & APD K3' }
  ]);

  const [showOpexModal, setShowOpexModal] = useState(false);
  const [newOpexCategory, setNewOpexCategory] = useState('Bahan Bakar Solar B35 Industry');
  const [newOpexCostCenter, setNewOpexCostCenter] = useState('CC-PIT-ALPHA');
  const [newOpexVendor, setNewOpexVendor] = useState('PT Pertamina Patra Niaga');
  const [newOpexAmountUsd, setNewOpexAmountUsd] = useState(250000);
  const [newOpexNote, setNewOpexNote] = useState('Pembelian pelumas & BBM cadangan site');

  // Modals state
  const [showJvModal, setShowJvModal] = useState(false);
  const [jvAccountName, setJvAccountName] = useState('Beban Operasional Pit');
  const [jvAccountCode, setJvAccountCode] = useState('5100-PIT-OPEX');
  const [jvDebitUsd, setJvDebitUsd] = useState(150000);

  const [showAssetModal, setShowAssetModal] = useState(false);
  const [assetName, setAssetName] = useState('');
  const [assetCostUsd, setAssetCostUsd] = useState(500000);

  const [showArModal, setShowArModal] = useState(false);
  const [arCustomer, setArCustomer] = useState('PT Virtu Dragon Nickel');
  const [arAmountUsd, setArAmountUsd] = useState(950000);

  const [showApModal, setShowApModal] = useState(false);
  const [apSupplier, setApSupplier] = useState('PT Shell Indonesia');
  const [apAmountUsd, setApAmountUsd] = useState(120000);

  const [showTaxModal, setShowTaxModal] = useState(false);
  const [taxType, setTaxType] = useState('Royalti ESDM');
  const [taxAmountUsd, setTaxAmountUsd] = useState(250000);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Corporate Financial Accounting & Multi-Currency Treasury
            </span>
            <span className="text-slate-400 text-xs">• IFRS / PSAK Mining Standards Compliance</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Keuangan, Akuntansi Tambang, Arus Kas & Pajak
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem akuntansi dan keuangan proyek tambang: Arus Kas (Cash Flow), Buku Besar (General Ledger), Jurnal Entri, Aset Tetap & Depresiasi, Anggaran Cost Center, Laporan Keuangan, Faktur AR/AP, Pajak Royalti ESDM, serta Rekonsiliasi Bank Multi-Mata Uang.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 text-xs shadow-inner">
            <Coins className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="text-slate-400 text-[10px] block">Kurs USD/IDR Acuan BI:</span>
              <strong className="text-slate-100 font-mono text-base font-bold">Rp 16.250 / USD</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs covering all 17 requested keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'cash_flow', label: 'Arus Kas (Cash Flow)', icon: TrendingUp },
          { id: 'general_ledger', label: 'Buku Besar & Jurnal (General Ledger)', icon: BookOpen },
          { id: 'asset_management', label: 'Aset Tetap (Fixed Assets & Deprec)', icon: Building },
          { id: 'budget_cost_center', label: 'Biaya Operasional & Cost Center (OPEX)', icon: PieChart },
          { id: 'financial_statements', label: 'Laporan Keuangan (Income & BS)', icon: FileSpreadsheet },
          { id: 'receivables_payables', label: 'Piutang & Hutang (AR / AP)', icon: Receipt },
          { id: 'tax_management', label: 'Pajak & Royalti (Tax & Royalty)', icon: Calculator },
          { id: 'bank_multicurrency', label: 'Bank & Multi Currency', icon: Landmark }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CASH FLOW */}
      {activeTab === 'cash_flow' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Total Arus Kas Masuk (Inflow YTD)</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">$38,150,000 USD</span>
              <span className="text-slate-400 block mt-1">Penjualan Ore & Domestic Smelter</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Total Arus Kas Keluar (Outflow YTD)</span>
              <span className="text-2xl font-bold text-rose-400 font-mono">$24,600,000 USD</span>
              <span className="text-slate-400 block mt-1">OPEX Fuel, Contractor & Maintenance</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block mb-1">Net Cash Position (Surplus)</span>
              <span className="text-2xl font-bold text-amber-300 font-mono">$13,550,000 USD</span>
              <span className="text-emerald-400 block mt-1">Healthy Cash Runway 14 Months</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Grafik Tren Arus Kas Operasional Bulanan (Cash Flow Inflow vs Outflow)
            </h3>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="cashInflowUsd" name="Kas Masuk (Inflow $)" stroke="#10B981" fill="#10B981" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="cashOutflowUsd" name="Kas Keluar (Outflow $)" stroke="#EF4444" fill="#EF4444" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GENERAL LEDGER & JOURNALS */}
      {activeTab === 'general_ledger' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Jurnal Umum & Buku Besar (General Ledger & Double-Entry Journal)</h3>
              <button 
                onClick={() => setShowJvModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Entry Jurnal Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Jurnal</th>
                    <th className="py-2.5 px-3">Tanggal</th>
                    <th className="py-2.5 px-3">Kode & Nama Akun (CoA)</th>
                    <th className="py-2.5 px-3">Debit ($)</th>
                    <th className="py-2.5 px-3">Kredit ($)</th>
                    <th className="py-2.5 px-3">Cost Center</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {journalEntries.map((j, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{j.entryNo}</td>
                      <td className="py-3 px-3 text-slate-400">{j.date}</td>
                      <td className="py-3 px-3 font-sans">
                        <strong className="text-slate-100 block">{j.accountName}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">{j.accountCode}</span>
                      </td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">${(j.debitUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">${(j.creditUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3 text-amber-300 font-sans">{j.costCenter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ASSET MANAGEMENT & DEPRECIATION */}
      {activeTab === 'asset_management' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Register Aset Tetap Tambang & Depresiasi Garis Lurus (Fixed Asset Register)
              </h3>
              <button 
                onClick={() => setShowAssetModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Aset Tetap Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Asset ID</th>
                    <th className="py-2.5 px-3">Nama Perangkat Aset</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3">Harga Perolehan ($)</th>
                    <th className="py-2.5 px-3">Akumulasi Depresiasi ($)</th>
                    <th className="py-2.5 px-3">Nilai Buku Saat Ini ($)</th>
                    <th className="py-2.5 px-3">Masa Manfaat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {fixedAssetsList.map((a) => (
                    <tr key={a.assetId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{a.assetId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{a.assetName}</td>
                      <td className="py-3 px-3 font-sans text-emerald-300">{a.category}</td>
                      <td className="py-3 px-3 text-slate-200">${(a.acquisitionCostUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">${(a.accumulatedDeprecUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">${(a.bookValueUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3 text-slate-300">{a.usefulLifeYears} Tahun</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BUDGET & COST CENTER / BIAYA OPERASIONAL */}
      {activeTab === 'budget_cost_center' && (
        <div className="space-y-6 text-xs">
          {/* Headline Operational Expense KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Operational Cash Cost Per Ton</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-emerald-400 font-mono">$32.86 / MT</span>
                <span className="text-[10px] text-emerald-400 font-bold">(-4.2% vs Budget)</span>
              </div>
              <p className="text-[10px] text-slate-500">Biaya Penambangan, Fuel & Hauling per Ton Ore</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Total Realisasi Biaya Operasional (YTD)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-slate-100 font-mono">
                  ${(budgetCostCenters.reduce((acc, curr) => acc + (curr.actualSpentUsd || 0), 0)).toLocaleString('en-US')} USD
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Rp {((budgetCostCenters.reduce((acc, curr) => acc + (curr.actualSpentUsd || 0), 0)) * fxRates.USD_IDR).toLocaleString('id-ID')}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Anggaran OPEX Dialokasikan (RKAB)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-amber-300 font-mono">
                  ${(budgetCostCenters.reduce((acc, curr) => acc + (curr.budgetAllocatedUsd || 0), 0)).toLocaleString('en-US')} USD
                </span>
              </div>
              <p className="text-[10px] text-emerald-400 font-semibold">Sisa Anggaran: ${(budgetCostCenters.reduce((acc, curr) => acc + (curr.varianceUsd || 0), 0)).toLocaleString('en-US')}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Rasio Efisiensi Penggunaan Anggaran</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-indigo-400 font-mono">77.2%</span>
                <span className="text-[10px] text-indigo-300 font-bold">ON TARGET</span>
              </div>
              <p className="text-[10px] text-slate-500">Pengawasan Cost Center Tambang & Plant</p>
            </div>
          </div>

          {/* Departmental Cost Center Cards */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">
                  Alokasi Anggaran Departemen & Pengawasan Cost Center Biaya Operasional (OPEX)
                </h3>
                <p className="text-[11px] text-slate-400">Monitoring realisasi pengeluaran operasional per deparlemen tambang vs batas dokumen RKAB ESDM</p>
              </div>
              <button
                onClick={() => setShowOpexModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Input Biaya Operasional Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {budgetCostCenters.map((c) => (
                <div key={c.code} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 hover:border-slate-700 transition-all">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div>
                      <strong className="text-slate-100 text-sm font-bold block">{c.name}</strong>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-emerald-400 font-semibold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{c.dept}</span>
                        <span className="text-slate-500 text-[10px] font-mono">Kode: {c.code}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] font-mono border border-emerald-500/30">
                      {c.utilizationPct}% Terpakai
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-slate-300 font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Anggaran RKAB:</span>
                      <strong className="text-slate-100">${(c.budgetAllocatedUsd ?? 0).toLocaleString('en-US')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Realisasi OPEX:</span>
                      <strong className="text-amber-300">${(c.actualSpentUsd ?? 0).toLocaleString('en-US')}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Sisa Alokasi:</span>
                      <strong className="text-emerald-400 font-bold">${(c.varianceUsd ?? 0).toLocaleString('en-US')}</strong>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Progres Pengeluaran</span>
                      <span>{c.utilizationPct}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.utilizationPct}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Operational Expenses Breakdown Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-emerald-400" />
                  Rincian Item Biaya Operasional Utama (Monthly Operational Cash Costs)
                </h3>
                <p className="text-[11px] text-slate-400">Daftar biaya operasional berkala: BBM Solar B35, Kontraktor Mining, Workshop, Jetty, SDM & HSE</p>
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Cari biaya, vendor, atau kateg..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Kode & Kategori Biaya</th>
                    <th className="py-2.5 px-3">Cost Center & Vendor</th>
                    <th className="py-2.5 px-3">Beban Bulanan (USD)</th>
                    <th className="py-2.5 px-3">Konversi IDR (Rupiah)</th>
                    <th className="py-2.5 px-3">Unit Cost ($/MT Ore)</th>
                    <th className="py-2.5 px-3">Keterangan Operasional</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {opexRecords
                    .filter(o => 
                      !searchTerm || 
                      o.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
                      o.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      o.costCenter.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3">
                          <strong className="font-bold text-emerald-400 block font-sans text-xs">{item.category}</strong>
                          <span className="text-[10px] text-slate-500">{item.id}</span>
                        </td>
                        <td className="py-3 px-3 font-sans">
                          <span className="text-slate-200 block text-xs font-semibold">{item.vendor}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{item.costCenter}</span>
                        </td>
                        <td className="py-3 px-3 text-emerald-400 font-bold text-xs">
                          ${item.monthlyAmountUsd.toLocaleString('en-US')}
                        </td>
                        <td className="py-3 px-3 text-slate-300">
                          Rp {(item.monthlyAmountUsd * fxRates.USD_IDR).toLocaleString('id-ID')}
                        </td>
                        <td className="py-3 px-3 text-amber-300 font-bold">
                          ${item.costPerTonUsd.toFixed(2)} / MT
                        </td>
                        <td className="py-3 px-3 text-slate-300 font-sans text-[11px] max-w-xs">
                          {item.note}
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {item.status}
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

      {/* TAB 5: FINANCIAL STATEMENTS */}
      {activeTab === 'financial_statements' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Ringkasan Laporan Laba Rugi Konsolidasi (Income Statement YTD 2026)
            </h3>

            <div className="space-y-2 font-mono text-slate-200">
              <div className="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400 font-sans">Total Pendapatan Penjualan Bijih Nikel (Revenue)</span>
                <strong className="text-emerald-400 font-bold">$38,150,000 USD</strong>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="font-bold text-rose-400 font-sans">HPP / Beban Pokok Penjualan COGS (Mining & Fuel)</span>
                <strong className="text-rose-400 font-bold">($18,400,000) USD</strong>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-700">
                <span className="font-bold text-slate-100 font-sans">LABA KOTOR (GROSS PROFIT)</span>
                <strong className="text-amber-300 font-bold">$19,750,000 USD</strong>
              </div>
              <div className="flex justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="font-bold text-slate-400 font-sans">Beban Usaha, Admin & Royalti ESDM</span>
                <strong className="text-rose-400 font-bold">($6,200,000) USD</strong>
              </div>
              <div className="flex justify-between p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/40 text-sm">
                <span className="font-bold text-emerald-300 font-sans">NET INCOME / LABA BERSIH (EBITDA)</span>
                <strong className="text-emerald-400 font-bold">$13,550,000 USD</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: RECEIVABLES & PAYABLES */}
      {activeTab === 'receivables_payables' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AR Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="font-bold text-emerald-400 text-sm">
                  Piutang Usaha Smelter (Accounts Receivable - AR)
                </h3>
                <button
                  onClick={() => setShowArModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Input AR
                </button>
              </div>
              {arInvoices.map((ar) => (
                <div key={ar.invNo} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <strong className="text-slate-100">{ar.customerName}</strong>
                    <span className="text-emerald-400 font-mono font-bold">${(ar.amountUsd ?? 0).toLocaleString('en-US')}</span>
                  </div>
                  <span className="text-slate-500 text-[10px] block font-mono">Invoice: {ar.invNo} • Jatuh Tempo: {ar.dueDate}</span>
                </div>
              ))}
            </div>

            {/* AP Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="font-bold text-rose-400 text-sm">
                  Hutang Usaha Vendor (Accounts Payable - AP)
                </h3>
                <button
                  onClick={() => setShowApModal(true)}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Input AP
                </button>
              </div>
              {apInvoices.map((ap) => (
                <div key={ap.invNo} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <strong className="text-slate-100">{ap.supplierName}</strong>
                    <span className="text-rose-400 font-mono font-bold">${(ap.amountUsd ?? 0).toLocaleString('en-US')}</span>
                  </div>
                  <span className="text-slate-500 text-[10px] block font-mono">AP Ref: {ap.invNo} • Jatuh Tempo: {ap.dueDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: TAX & ROYALTIES */}
      {activeTab === 'tax_management' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Kepatuhan Pajak & Royalti PNBP ESDM Mineral (SIMPONI / e-PNBP)
              </h3>
              <button
                onClick={() => setShowTaxModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Input Setoran Royalti / Pajak</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Jenis Pajak / Royalti</th>
                    <th className="py-2.5 px-3">Dasar Pengenaan Pajak ($)</th>
                    <th className="py-2.5 px-3">Jumlah Terutang ($)</th>
                    <th className="py-2.5 px-3">Batas Setor</th>
                    <th className="py-2.5 px-3">Status Setor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {taxRecords.map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{t.taxType}</td>
                      <td className="py-3 px-3 text-slate-300">${(t.taxableBasisUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">${(t.taxAmountUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3 text-slate-400">{t.dueDate}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          t.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {t.status}
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

      {/* TAB 8: BANK & MULTI CURRENCY */}
      {activeTab === 'bank_multicurrency' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Rekening Bank Perusahaan & Saldo Multi-Mata Uang (USD / IDR Treasury)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bankAccounts.map((b, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-100 block text-sm">{b.bankName}</span>
                  <span className="text-slate-500 text-[10px] font-mono block">No. Rek: {b.accountNo}</span>
                  <div className="pt-2 border-t border-slate-800 space-y-1 font-mono">
                    <p className="text-emerald-400 font-bold text-sm">${(b.balanceUsd ?? 0).toLocaleString('en-US')} USD</p>
                    <p className="text-slate-400 text-[10px]">Equiv. Rp {(b.balanceIdr ?? 0).toLocaleString('id-ID')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: INPUT JURNAL JV */}
      {showJvModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" /> Buat Entry Jurnal Voucher (JV) Baru
              </h3>
              <button onClick={() => setShowJvModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Akun (Chart of Accounts):</label>
                <input
                  type="text"
                  value={jvAccountName}
                  onChange={(e) => setJvAccountName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kode Akun CoA:</label>
                <input
                  type="text"
                  value={jvAccountCode}
                  onChange={(e) => setJvAccountCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Jumlah Nominal Debit ($ USD):</label>
                <input
                  type="number"
                  value={jvDebitUsd}
                  onChange={(e) => setJvDebitUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setJournalEntries(prev => [
                    {
                      entryNo: `JV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                      date: new Date().toISOString().slice(0, 10),
                      accountCode: jvAccountCode,
                      accountName: jvAccountName,
                      debitUsd: jvDebitUsd,
                      creditUsd: 0,
                      costCenter: 'CC-PIT-ALPHA',
                      refDoc: 'MANUAL-ENTRY'
                    },
                    ...prev
                  ]);
                  setShowJvModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Posting Jurnal
              </button>
              <button
                onClick={() => setShowJvModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INPUT ASET TETAP */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" /> Tambah Fixed Asset Baru
              </h3>
              <button onClick={() => setShowAssetModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Perangkat Aset:</label>
                <input
                  type="text"
                  placeholder="Wheel Loader Caterpillar 980M"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Harga Perolehan ($ USD):</label>
                <input
                  type="number"
                  value={assetCostUsd}
                  onChange={(e) => setAssetCostUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setFixedAssetsList(prev => [
                    {
                      assetId: `AST-WL-${Math.floor(1000 + Math.random() * 9000)}`,
                      assetName: assetName || 'Heavy Equipment Asset',
                      category: 'Heavy Mining Fleet',
                      purchaseDate: new Date().toISOString().slice(0, 10),
                      acquisitionCostUsd: assetCostUsd,
                      accumulatedDeprecUsd: 0,
                      bookValueUsd: assetCostUsd,
                      usefulLifeYears: 8,
                      method: 'STRAIGHT_LINE'
                    },
                    ...prev
                  ]);
                  setShowAssetModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Simpan Asset Register
              </button>
              <button
                onClick={() => setShowAssetModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INPUT AR INVOICE */}
      {showArModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Receipt className="w-4 h-4 text-emerald-400" /> Terbitkan Faktur Piutang (AR)
              </h3>
              <button onClick={() => setShowArModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Customer Smelter:</label>
                <input
                  type="text"
                  value={arCustomer}
                  onChange={(e) => setArCustomer(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nilai Tagihan Piutang ($ USD):</label>
                <input
                  type="number"
                  value={arAmountUsd}
                  onChange={(e) => setArAmountUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setArInvoices(prev => [
                    {
                      invNo: `INV-2026-NKL-${Math.floor(10 + Math.random() * 90)}`,
                      customerName: arCustomer,
                      invDate: new Date().toISOString().slice(0, 10),
                      dueDate: '2026-09-15',
                      amountUsd: arAmountUsd,
                      type: 'RECEIVABLE_AR',
                      status: 'UNPAID_PENDING'
                    },
                    ...prev
                  ]);
                  setShowArModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Terbitkan Invoice
              </button>
              <button
                onClick={() => setShowArModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: INPUT AP INVOICE */}
      {showApModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Receipt className="w-4 h-4 text-rose-400" /> Catat Hutang Usaha Vendor (AP)
              </h3>
              <button onClick={() => setShowApModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Vendor Supplier:</label>
                <input
                  type="text"
                  value={apSupplier}
                  onChange={(e) => setApSupplier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nilai Tagihan Vendor ($ USD):</label>
                <input
                  type="number"
                  value={apAmountUsd}
                  onChange={(e) => setApAmountUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-rose-400 font-bold font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setApInvoices(prev => [
                    {
                      invNo: `AP-VND-2026-${Math.floor(10 + Math.random() * 90)}`,
                      supplierName: apSupplier,
                      invDate: new Date().toISOString().slice(0, 10),
                      dueDate: '2026-09-01',
                      amountUsd: apAmountUsd,
                      type: 'PAYABLE_AP',
                      status: 'SCHEDULED_PAYMENT'
                    },
                    ...prev
                  ]);
                  setShowApModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Catat Tagihan AP
              </button>
              <button
                onClick={() => setShowApModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: INPUT TAX & ROYALTY */}
      {showTaxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" /> Setoran Pajak & Royalti ESDM
              </h3>
              <button onClick={() => setShowTaxModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Jenis Setoran Pajak / PNBP:</label>
                <input
                  type="text"
                  value={taxType}
                  onChange={(e) => setTaxType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nominal Setoran ($ USD):</label>
                <input
                  type="number"
                  value={taxAmountUsd}
                  onChange={(e) => setTaxAmountUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setTaxRecords(prev => [
                    {
                      taxType: taxType,
                      taxableBasisUsd: taxAmountUsd * 10,
                      taxAmountUsd: taxAmountUsd,
                      dueDate: new Date().toISOString().slice(0, 10),
                      status: 'PAID'
                    },
                    ...prev
                  ]);
                  setShowTaxModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Proses Setoran SIMPONI
              </button>
              <button
                onClick={() => setShowTaxModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: INPUT BIAYA OPERASIONAL BARU (OPEX) */}
      {showOpexModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <PieChart className="w-4 h-4 text-emerald-400" /> Catat Biaya Operasional Tambang Baru (OPEX)
              </h3>
              <button onClick={() => setShowOpexModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Kategori Biaya Operasional:</label>
                <select
                  value={newOpexCategory}
                  onChange={(e) => setNewOpexCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Bahan Bakar Solar B35 Industry">Bahan Bakar Solar B35 Industry</option>
                  <option value="Jasa Kontraktor Stripping Overburden & Mining">Jasa Kontraktor Stripping Overburden & Mining</option>
                  <option value="Pemeliharaan & Spareparts Alat Berat (Workshop)">Pemeliharaan & Spareparts Alat Berat (Workshop)</option>
                  <option value="Logistik Jetty, Loading & Transshipment Tongkang">Logistik Jetty, Loading & Transshipment Tongkang</option>
                  <option value="Gaji, Tunjangan Site & Mess Karyawan">Gaji, Tunjangan Site & Mess Karyawan</option>
                  <option value="Pengelolaan Lingkungan, Reklamasi & K3 (HSE)">Pengelolaan Lingkungan, Reklamasi & K3 (HSE)</option>
                  <option value="Sewa Peralatan Tambang Auxiliary">Sewa Peralatan Tambang Auxiliary</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Cost Center Anggaran:</label>
                  <select
                    value={newOpexCostCenter}
                    onChange={(e) => setNewOpexCostCenter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    {budgetCostCenters.map((cc) => (
                      <option key={cc.code} value={cc.code}>
                        {cc.code} - {cc.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Vendor / Pihak Ketiga:</label>
                  <input
                    type="text"
                    value={newOpexVendor}
                    onChange={(e) => setNewOpexVendor(e.target.value)}
                    placeholder="Contoh: PT Pertamina Patra Niaga"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Beban Biaya Bulanan ($ USD):</label>
                <input
                  type="number"
                  value={newOpexAmountUsd}
                  onChange={(e) => setNewOpexAmountUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Est. Rupiah: Rp {(newOpexAmountUsd * fxRates.USD_IDR).toLocaleString('id-ID')} | Est. Cash Cost: ${(newOpexAmountUsd / 150000).toFixed(2)} / MT Ore
                </span>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Catatan & Justifikasi Operasional:</label>
                <textarea
                  value={newOpexNote}
                  onChange={(e) => setNewOpexNote(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  const newRecord = {
                    id: `OPEX-2026-${String(opexRecords.length + 1).padStart(3, '0')}`,
                    category: newOpexCategory,
                    costCenter: newOpexCostCenter,
                    vendor: newOpexVendor || 'Vendor Site',
                    monthlyAmountUsd: newOpexAmountUsd,
                    costPerTonUsd: Number((newOpexAmountUsd / 150000).toFixed(2)),
                    status: 'APPROVED',
                    lastUpdated: new Date().toISOString().slice(0, 10),
                    note: newOpexNote || 'Pencatatan pengeluaran operasional baru'
                  };

                  setOpexRecords(prev => [newRecord, ...prev]);

                  // Also update cost center actual spent
                  setBudgetCostCenters(prev => prev.map(cc => {
                    if (cc.code === newOpexCostCenter) {
                      const updatedSpent = cc.actualSpentUsd + newOpexAmountUsd;
                      const updatedVariance = cc.budgetAllocatedUsd - updatedSpent;
                      const updatedPct = Number(((updatedSpent / cc.budgetAllocatedUsd) * 100).toFixed(1));
                      return {
                        ...cc,
                        actualSpentUsd: updatedSpent,
                        varianceUsd: updatedVariance,
                        utilizationPct: updatedPct
                      };
                    }
                    return cc;
                  }));

                  setShowOpexModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Simpan & Catat Biaya Operasional
              </button>
              <button
                onClick={() => setShowOpexModal(false)}
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
