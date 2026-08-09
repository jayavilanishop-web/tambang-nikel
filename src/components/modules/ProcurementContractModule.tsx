import React, { useState } from 'react';
import { 
  ShoppingBag, 
  FileText, 
  FileSpreadsheet, 
  Building2, 
  ShoppingCart, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Gavel, 
  Star, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Send, 
  UserCheck, 
  ShieldCheck, 
  Award, 
  BarChart3, 
  Sliders 
} from 'lucide-react';
import { Language } from '../../types';

interface ProcurementContractModuleProps {
  language: Language;
  initialTab?: 
    | 'dasbor_purchasing'
    | 'master_purchasing'
    | 'purchase_requisition'
    | 'rfq_quotations'
    | 'vendor_management'
    | 'purchase_orders'
    | 'approval_workflow'
    | 'contracts_management'
    | 'tender_bidding'
    | 'vendor_evaluation'
    | 'supplier_performance';
}

export const ProcurementContractModule: React.FC<ProcurementContractModuleProps> = ({
  language,
  initialTab = 'dasbor_purchasing'
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dasbor_purchasing'
    | 'master_purchasing'
    | 'purchase_requisition'
    | 'rfq_quotations'
    | 'vendor_management'
    | 'purchase_orders'
    | 'approval_workflow'
    | 'contracts_management'
    | 'tender_bidding'
    | 'vendor_evaluation'
    | 'supplier_performance'
  >(initialTab);

  const [masterSubTab, setMasterSubTab] = useState<'vendor_master' | 'top_master' | 'blanket_po' | 'pricelist_master'>('vendor_master');

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Master Data Purchasing Datasets
  const [masterVendors, setMasterVendors] = useState([
    { code: 'VND-001', companyName: 'PT Trakindo Utama (Caterpillar Dealer)', category: 'Heavy Equipment OEM', npwp: '01.345.678.9-012.000', contactPerson: 'Ir. Budi Santoso', emailPhone: 'budi.santoso@trakindo.co.id / +62 811-2345-678', topTerms: 'TOP 30 Hari after GRN', ratingScore: 4.8, isoCertified: 'ISO 9001 / ISO 14001', status: 'ACTIVE_GOLD' },
    { code: 'VND-002', companyName: 'PT United Tractors Tbk (Komatsu Dealer)', category: 'Heavy Equipment OEM', npwp: '01.234.567.8-011.000', contactPerson: 'Hendra Gunawan, ST', emailPhone: 'hendra.g@unitedtractors.com / +62 812-3456-789', topTerms: 'TOP 45 Hari after Invoice', ratingScore: 4.7, isoCertified: 'ISO 9001 / ISO 45001', status: 'ACTIVE_GOLD' },
    { code: 'VND-003', companyName: 'PT Pertamina Patra Niaga', category: 'High Speed Diesel B35 Fuel', npwp: '01.000.111.2-022.000', contactPerson: 'Dicky Prasetyo', emailPhone: 'dicky.p@pertaminapatraniaga.com / +62 813-9876-543', topTerms: 'CBD (Cash Before Delivery)', ratingScore: 4.9, isoCertified: 'ISO 9001 / SKK Migas Approved', status: 'ACTIVE_STRATEGIC' },
    { code: 'VND-004', companyName: 'PT Bridgestone Mining Solutions', category: 'OTR Tyres & Vulcanizing', npwp: '02.555.444.3-033.000', contactPerson: 'Takeshi Yamamoto / Anita', emailPhone: 'anita@bridgestone-mining.co.id / +62 815-7890-123', topTerms: 'TOP 30 Hari after GRN', ratingScore: 4.6, isoCertified: 'ISO 9001:2015 Certified', status: 'ACTIVE_VERIFIED' },
    { code: 'VND-005', companyName: 'PT Dahana (Persero) - Explosives', category: 'ANFO & Blending Chemicals', npwp: '01.888.777.6-044.000', contactPerson: 'Dr. Agus Supriyanto', emailPhone: 'agus.s@dahana.id / +62 811-9988-776', topTerms: 'TOP 14 Hari after GRN', ratingScore: 4.8, isoCertified: 'Kemenhan & Mabes Polri Licensed', status: 'ACTIVE_STRATEGIC' }
  ]);

  const [masterTopList, setMasterTopList] = useState([
    { topCode: 'TOP-CBD', name: 'Cash Before Delivery (CBD / Advance)', daysLimit: 0, earlyDiscountPct: 2.0, gracePeriodDays: 0, description: 'Pembayaran Lunas 100% Sebelum Barang Dikirim dari Vendor Storage', activeUsageCount: 8 },
    { topCode: 'TOP-014', name: 'Net 14 Days after GRN', daysLimit: 14, earlyDiscountPct: 1.5, gracePeriodDays: 3, description: 'Pembayaran 14 Hari Setelah Berita Acara Penerimaan Barang Site Store', activeUsageCount: 15 },
    { topCode: 'TOP-030', name: 'Net 30 Days after GRN', daysLimit: 30, earlyDiscountPct: 1.0, gracePeriodDays: 5, description: 'Standard TOP Mining Sparepart 30 Hari Setelah Barang Tiba di Site', activeUsageCount: 42 },
    { topCode: 'TOP-045', name: 'Net 45 Days after Tax Invoice', daysLimit: 45, earlyDiscountPct: 0.5, gracePeriodDays: 7, description: 'Pembayaran 45 Hari Setelah Invoice & Faktur Pajak Lengkap Terverifikasi', activeUsageCount: 24 },
    { topCode: 'TOP-060', name: 'Net 60 Days (Contractor Blanket PO)', daysLimit: 60, earlyDiscountPct: 0.0, gracePeriodDays: 10, description: 'TOP Kontrak Payung 60 Hari Pasca Lampiran BAP BAST Bulanan', activeUsageCount: 12 },
    { topCode: 'TOP-LC90', name: 'Letter of Credit (Usance LC 90 Days)', daysLimit: 90, earlyDiscountPct: 0.0, gracePeriodDays: 0, description: 'Pembayaran via Usance LC Bank Mandiri/BNI 90 Hari Import Sparepart', activeUsageCount: 6 }
  ]);

  const [masterBlanketPo, setMasterBlanketPo] = useState([
    { contractCode: 'LTA-2026-FUEL-01', title: 'Kontrak Payung Pasokan Solar B35 Mandiri (1.2M Liter/Bulan)', vendorName: 'PT Pertamina Patra Niaga', category: 'High Speed Diesel Fuel', contractValueUsd: 12500000, spentValueUsd: 8900000, validFrom: '2026-01-01', validTo: '2026-12-31', autoRenewal: 'Ya (Tier 1 Status)', status: 'ACTIVE_ON_TRACK' },
    { contractCode: 'LTA-2026-CAT-04', title: 'Blanket PO Master Sparepart & Engine Rebuild Excavator CAT 6020B', vendorName: 'PT Trakindo Utama', category: 'Heavy Equipment OEM', contractValueUsd: 4800000, spentValueUsd: 2450000, validFrom: '2026-02-01', validTo: '2027-01-31', autoRenewal: 'Ya (Review Evaluasi SLA)', status: 'ACTIVE_ON_TRACK' },
    { contractCode: 'LTA-2026-TYRE-02', title: 'Blanket PO Pasokan OTR Tyre 27.00R49 & Services Dump Truck HD785', vendorName: 'PT Bridgestone Mining Solutions', category: 'OTR Tyres & Maintenance', contractValueUsd: 1800000, spentValueUsd: 640000, validFrom: '2026-03-01', validTo: '2027-02-28', autoRenewal: 'Tidak (Syarat Retender)', status: 'ACTIVE_ON_TRACK' }
  ]);

  const [masterPricelist, setMasterPricelist] = useState([
    { skuCode: 'SKU-CAT-3512-FLT', itemName: 'Filter Oli Lube CAT 3512 Engine (Part #1R-1808)', category: 'Heavy Equipment Spares', uom: 'PCS', vendorName: 'PT Trakindo Utama', contractUnitPriceUsd: 48.50, historicalLastPriceUsd: 52.00, moq: 20, leadTimeDays: 5, validUntil: '2026-12-31' },
    { skuCode: 'SKU-KOM-HD785-BRK', itemName: 'Brake Disc Friction Assembly Komatsu HD785-7', category: 'Heavy Equipment Spares', uom: 'SET', vendorName: 'PT United Tractors Tbk', contractUnitPriceUsd: 850.00, historicalLastPriceUsd: 890.00, moq: 4, leadTimeDays: 10, validUntil: '2026-12-31' },
    { skuCode: 'SKU-BS-27R49-VSDL', itemName: 'OTR Tyre 27.00R49 Bridgestone VSDL E4 Steel Radial', category: 'OTR Tyres', uom: 'UNIT', vendorName: 'PT Bridgestone Mining', contractUnitPriceUsd: 14200.00, historicalLastPriceUsd: 14800.00, moq: 2, leadTimeDays: 14, validUntil: '2026-11-30' },
    { skuCode: 'SKU-PERT-HSD-B35', itemName: 'High Speed Diesel (HSD) B35 Industri Pertamina', category: 'Fuel B35', uom: 'LITER', vendorName: 'PT Pertamina Patra Niaga', contractUnitPriceUsd: 0.88, historicalLastPriceUsd: 0.92, moq: 10000, leadTimeDays: 3, validUntil: '2026-12-31' }
  ]);

  // Purchase Requisitions (PR) Dataset
  const [purchaseRequisitions, setPurchaseRequisitions] = useState([
    { prNo: 'PR-2026-0481', requester: 'Hendra (Pit Supervisor)', dept: 'Mining Operations', requestDate: '2026-08-01', itemCategory: 'Heavy Equipment Sparepart', estBudgetUsd: 142000, priority: 'HIGH_URGENT', status: 'APPROVED_BY_GM', currentApprover: 'Finance Controller' },
    { prNo: 'PR-2026-0482', requester: 'Bambang (Head Mechanic)', dept: 'Maintenance Workshop', requestDate: '2026-08-02', itemCategory: 'Lubricant & Filter Consumables', estBudgetUsd: 45000, priority: 'NORMAL', status: 'PENDING_APPROVAL', currentApprover: 'Mine Site Manager' },
    { prNo: 'PR-2026-0483', requester: 'Dedi (Jetty Port Master)', dept: 'Logistics & Shipping', requestDate: '2026-08-03', itemCategory: 'Barge Tugboat Mooring Lines', estBudgetUsd: 28000, priority: 'NORMAL', status: 'DRAFT', currentApprover: 'Requester Draft' }
  ]);

  // Request for Quotation (RFQ) & Quotations Dataset
  const [rfqQuotations, setRfqQuotations] = useState([
    { rfqNo: 'RFQ-2026-0112', title: 'Supply 10x Heavy OTR Tyres 27.00R49 Bridgestone VSDL', prRef: 'PR-2026-0481', targetDeliveryDays: 14, invitedVendorsCount: 4, quotesReceivedCount: 3, lowestQuoteUsd: 142000, status: 'EVALUATION_STAGE' },
    { rfqNo: 'RFQ-2026-0113', title: 'Supply 200x Drums Engine Oil SAE 15W-40 Chevron Delo', prRef: 'PR-2026-0482', targetDeliveryDays: 7, invitedVendorsCount: 3, quotesReceivedCount: 3, lowestQuoteUsd: 43500, status: 'PO_PENDING' }
  ]);

  // Vendor Master & Supplier Performance Dataset
  const [vendorsList, setVendorsList] = useState([
    { vendorId: 'VND-001', companyName: 'PT Trakindo Utama (Caterpillar Dealer)', category: 'Heavy Equipment & Spares', ratingScore: 4.8, onTimeDeliveryPct: 98.2, qualityCompliancePct: 99.5, totalPoValueUsd: 2450000, status: 'VERIFIED_GOLD_SUPPLIER' },
    { vendorId: 'VND-002', companyName: 'PT United Tractors Tbk (Komatsu Dealer)', category: 'Mining Equipment Spares', ratingScore: 4.7, onTimeDeliveryPct: 96.5, qualityCompliancePct: 98.8, totalPoValueUsd: 1820000, status: 'VERIFIED_GOLD_SUPPLIER' },
    { vendorId: 'VND-003', companyName: 'PT Pertamina Patra Niaga', category: 'High Speed Diesel B35 Fuel', ratingScore: 4.9, onTimeDeliveryPct: 99.8, qualityCompliancePct: 100.0, totalPoValueUsd: 8900000, status: 'STRATEGIC_PARTNER' },
    { vendorId: 'VND-004', companyName: 'PT Bridgestone Mining Solutions', category: 'OTR Tyres & Technical Service', ratingScore: 4.6, onTimeDeliveryPct: 94.0, qualityCompliancePct: 97.5, totalPoValueUsd: 640000, status: 'VERIFIED_SUPPLIER' }
  ]);

  // Purchase Orders (PO) Dataset
  const [purchaseOrders, setPurchaseOrders] = useState([
    { poNo: 'PO-2026-0811', rfqRef: 'RFQ-2026-0112', vendorName: 'PT Bridgestone Mining Solutions', poDate: '2026-08-02', totalAmountUsd: 142000, paymentTerms: 'Net 30 Days', estArrivalSite: '2026-08-15', approvalState: 'APPROVED_EXECUTED' },
    { poNo: 'PO-2026-0812', rfqRef: 'RFQ-2026-0113', vendorName: 'PT Shell Indonesia', poDate: '2026-08-03', totalAmountUsd: 43500, paymentTerms: 'Net 14 Days', estArrivalSite: '2026-08-10', approvalState: 'PENDING_DIRECTOR' }
  ]);

  // Contracts & Tender Bidding Dataset
  const [contractsTender, setContractsTender] = useState([
    { contractNo: 'CTR-2026-MINE-01', title: 'Kontrak Jasa Mining Contractor Pit Alpha (Overburden & Ore Hauling)', vendor: 'PT Hillcon Jaya Sakti Tbk', valueUsd: 18500000, startDate: '2026-01-01', endDate: '2028-12-31', status: 'ACTIVE_LONG_TERM' },
    { tenderNo: 'TND-2026-JETTY-04', title: 'Tender Pembangunan Extension Breakwater Jetty Pier B', budgetUsd: 3200000, biddersCount: 5, closingDate: '2026-08-20', status: 'BID_SUBMISSION_OPEN' }
  ]);

  // Modals state
  const [showPrModal, setShowPrModal] = useState(false);
  const [prRequester, setPrRequester] = useState('');
  const [prDept, setPrDept] = useState('Mining Operations');
  const [prCategory, setPrCategory] = useState('Heavy Equipment Sparepart');
  const [prBudget, setPrBudget] = useState(50000);

  const [showRfqModal, setShowRfqModal] = useState(false);
  const [rfqTitle, setRfqTitle] = useState('');
  const [rfqPrRef, setRfqPrRef] = useState('PR-2026-0481');
  const [rfqEstUsd, setRfqEstUsd] = useState(75000);

  const [showVendorModal, setShowVendorModal] = useState(false);
  const [vendorName, setVendorName] = useState('');
  const [vendorCategory, setVendorCategory] = useState('Spareparts & Heavy Equipment');

  const [showPoModal, setShowPoModal] = useState(false);
  const [poVendorName, setPoVendorName] = useState('PT Trakindo Utama');
  const [poAmountUsd, setPoAmountUsd] = useState(120000);

  const [showTenderModal, setShowTenderModal] = useState(false);
  const [tenderTitle, setTenderTitle] = useState('');
  const [tenderBudgetUsd, setTenderBudgetUsd] = useState(1500000);

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Mining Supply Chain & Strategic Procurement Hub
            </span>
            <span className="text-slate-400 text-xs">• Governance, Bidding & Vendor Performance</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Pengadaan Barang, Tender, Kontrak & Vendor Performance
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Pusat manajemen pengadaan tambang nikel: Purchase Requisition (PR), Request for Quotation (RFQ), evaluasi Penawaran, Purchase Order (PO), hirarki persetujuan (Approval), Kontrak jangka panjang, dan penilaian kinerja Supplier.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <ShoppingBag className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Total PO Exchanged YTD 2026:</span>
            <strong className="text-slate-100 font-mono text-base font-bold">$13.81 Juta USD</strong>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'dasbor_purchasing', label: '📊 Dasbor Purchasing', icon: BarChart3 },
          { id: 'master_purchasing', label: '🗂️ Master Data Purchasing', icon: Building2 },
          { id: 'purchase_requisition', label: 'Purchase Requisition (PR)', icon: FileText },
          { id: 'rfq_quotations', label: 'RFQ & Vendor Quotations', icon: FileSpreadsheet },
          { id: 'vendor_management', label: 'Vendor Directory', icon: Building2 },
          { id: 'purchase_orders', label: 'Purchase Orders (PO)', icon: ShoppingCart },
          { id: 'approval_workflow', label: 'Approval Matrix', icon: CheckCircle2 },
          { id: 'contracts_management', label: 'Contracts Management', icon: FileCheck },
          { id: 'tender_bidding', label: 'Tender Bidding & Evaluation', icon: Gavel },
          { id: 'supplier_performance', label: 'Supplier Performance', icon: Star }
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

      {/* VIEW 1: DASBOR PURCHASING (PURCHASING MANAGER ANALYTICS) */}
      {activeTab === 'dasbor_purchasing' && (
        <div className="space-y-6 text-xs">
          {/* Key Executive Procurement Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Total Strategic Spend YTD</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-slate-100 font-mono">$14.82 M <span className="text-xs font-normal text-slate-400">USD</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">↑ 8.4% Effisiensi Negosiasi vs Anggaran RKAB</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Active PO Outstanding</span>
                <ShoppingCart className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-black text-amber-300 font-mono">48 Orders <span className="text-xs font-normal text-slate-400">($3.25M USD)</span></div>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">28 Transit Site • 15 Pending Clearing • 5 Delayed</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">PR Lead Time (Cycle Time)</span>
                <Clock className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl font-black text-sky-300 font-mono">4.2 Hari <span className="text-xs font-normal text-slate-400">(PR → PO)</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">Target SLA Site: &lt; 5.0 Hari (Compliant)</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Vendor On-Time SLA</span>
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-black text-indigo-300 font-mono">97.8% <span className="text-xs font-normal text-slate-400">Compliance</span></div>
              <p className="text-[10px] text-slate-400 mt-1">45/48 Vendor Memenuhi Toleransi Waktu Pengiriman</p>
            </div>
          </div>

          {/* Purchasing Pipeline & Spend Category Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* PR to PO Pipeline Status */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  Alur Operasional Pengadaan Site Tambang (Procurement Pipeline Tracker)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">Realtime Stream</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">1. PR Permintaan Site</span>
                  <strong className="text-lg font-mono text-amber-400">12 Pending</strong>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Est. $215K USD</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">2. Evaluasi RFQ / Bidding</span>
                  <strong className="text-lg font-mono text-sky-400">6 Active RFQ</strong>
                  <span className="text-[9px] text-slate-500 block mt-0.5">18 Quotations</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">3. Executed Purchase Orders</span>
                  <strong className="text-lg font-mono text-emerald-400">48 Issued PO</strong>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Val. $3.25M USD</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">4. Goods Receipt (GRN Site)</span>
                  <strong className="text-lg font-mono text-indigo-400">38 Received</strong>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Verified Warehouse</span>
                </div>
              </div>

              {/* Spend Allocation Progress Bars */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-slate-200 text-xs">Alokasi Anggaran Belanja (Spend Category Allocation YTD):</h4>
                <div className="space-y-2 font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">⛽ High Speed Diesel (HSD B35) Solar Fuel</span>
                      <span className="text-emerald-400 font-bold">$5,800,000 USD (39.1%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '39.1%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">🚜 Heavy Equipment OEM Spareparts (CAT & Komatsu)</span>
                      <span className="text-sky-400 font-bold">$3,450,000 USD (23.3%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: '23.3%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">🛞 OTR Tyres Dump Truck 27.00R49 & 33.00R51</span>
                      <span className="text-amber-400 font-bold">$1,850,000 USD (12.5%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '12.5%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">💥 Explosives & ANFO Blending Chemicals</span>
                      <span className="text-rose-400 font-bold">$1,200,000 USD (8.1%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-rose-500 h-full rounded-full" style={{ width: '8.1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Vendor Risk & SLA Ranking */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-amber-400" /> Key Vendors & SLA Score</span>
                <button onClick={() => setActiveTab('supplier_performance')} className="text-[10px] text-emerald-400 hover:underline">Lihat Semua</button>
              </h3>

              <div className="space-y-3">
                {vendorsList.map((vnd) => (
                  <div key={vnd.vendorId} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-100 block font-sans text-xs">{vnd.companyName}</strong>
                      <span className="text-[10px] text-slate-400 block font-mono">{vnd.category}</span>
                    </div>
                    <div className="text-right font-mono">
                      <div className="flex items-center justify-end gap-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{vnd.ratingScore}</span>
                      </div>
                      <span className="text-[9px] text-emerald-400 block">{vnd.onTimeDeliveryPct}% On-Time</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: MASTER DATA PURCHASING */}
      {activeTab === 'master_purchasing' && (
        <div className="space-y-6 text-xs">
          {/* Sub-Tabs Selector for Master Data Purchasing */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-400" />
                  Database Master Data Purchasing & Pengadaan
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Kelola Master Supplier, Master Syarat Pembayaran (TOP), Master Kontrak Payung (Blanket PO), dan Katalog Pricelist Pembelian.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowVendorModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Master Data</span>
                </button>
              </div>
            </div>

            {/* 4 Inner Sub-tabs for Master Data Purchasing */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => setMasterSubTab('vendor_master')}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  masterSubTab === 'vendor_master'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>1. Master Vendor / Supplier</span>
              </button>

              <button
                onClick={() => setMasterSubTab('top_master')}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  masterSubTab === 'top_master'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>2. Master Syarat Pembayaran (TOP)</span>
              </button>

              <button
                onClick={() => setMasterSubTab('blanket_po')}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  masterSubTab === 'blanket_po'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>3. Master Kontrak Payung (Blanket PO)</span>
              </button>

              <button
                onClick={() => setMasterSubTab('pricelist_master')}
                className={`p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  masterSubTab === 'pricelist_master'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>4. Master Katalog Pricelist</span>
              </button>
            </div>
          </div>

          {/* MASTER SUB-TAB 1: VENDOR / SUPPLIER MASTER */}
          {masterSubTab === 'vendor_master' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider text-emerald-400">Master Direktori Rekanan / Vendor Supplier Tambang:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                      <th className="py-2.5 px-3">Kode Vendor</th>
                      <th className="py-2.5 px-3">Nama Perusahaan / Rekanan</th>
                      <th className="py-2.5 px-3">NPWP & Sertifikasi</th>
                      <th className="py-2.5 px-3">Contact Person & Kontak</th>
                      <th className="py-2.5 px-3">Terms of Payment (TOP)</th>
                      <th className="py-2.5 px-3">Rating SLA</th>
                      <th className="py-2.5 px-3">Status Master</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {masterVendors.map((vnd) => (
                      <tr key={vnd.code} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-bold text-emerald-400">{vnd.code}</td>
                        <td className="py-3 px-3 font-sans">
                          <strong className="text-slate-100 block">{vnd.companyName}</strong>
                          <span className="text-[10px] text-slate-400">{vnd.category}</span>
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-300 text-[10px]">
                          <div>{vnd.npwp}</div>
                          <span className="text-[9px] text-sky-400">{vnd.isoCertified}</span>
                        </td>
                        <td className="py-3 px-3 font-sans text-slate-300">
                          <div className="font-bold">{vnd.contactPerson}</div>
                          <span className="text-[10px] text-slate-400">{vnd.emailPhone}</span>
                        </td>
                        <td className="py-3 px-3 font-sans text-amber-300 font-bold">{vnd.topTerms}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400 font-bold">
                            ★ {vnd.ratingScore} / 5.0
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                            {vnd.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MASTER SUB-TAB 2: SYARAT PEMBAYARAN (TOP MASTER) */}
          {masterSubTab === 'top_master' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider text-emerald-400">Master Terms of Payment (TOP) & Skema Pembayaran Supplier:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                      <th className="py-2.5 px-3">Kode TOP</th>
                      <th className="py-2.5 px-3">Nama / Skema TOP</th>
                      <th className="py-2.5 px-3">Jatuh Tempo (Hari)</th>
                      <th className="py-2.5 px-3">Diskon Pelunasan Awal (%)</th>
                      <th className="py-2.5 px-3">Penjelasan & Ketentuan</th>
                      <th className="py-2.5 px-3">Penggunaan Aktif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {masterTopList.map((top) => (
                      <tr key={top.topCode} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-bold text-amber-400">{top.topCode}</td>
                        <td className="py-3 px-3 font-sans font-bold text-slate-100">{top.name}</td>
                        <td className="py-3 px-3 font-bold text-sky-300">{top.daysLimit} Hari</td>
                        <td className="py-3 px-3 font-bold text-emerald-400">{top.earlyDiscountPct}%</td>
                        <td className="py-3 px-3 font-sans text-slate-300 text-[11px]">{top.description}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-bold">
                            {top.activeUsageCount} Kontrak / PO
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MASTER SUB-TAB 3: KONTRAK PAYUNG (BLANKET PO MASTER) */}
          {masterSubTab === 'blanket_po' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider text-emerald-400">Master Kontrak Payung (Blanket PO & Long Term Agreement):</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                      <th className="py-2.5 px-3">No. Kontrak LTA</th>
                      <th className="py-2.5 px-3">Judul Kontrak Payung</th>
                      <th className="py-2.5 px-3">Vendor Utama</th>
                      <th className="py-2.5 px-3">Pagu Anggaran LTA ($)</th>
                      <th className="py-2.5 px-3">Realisasi Cermin ($)</th>
                      <th className="py-2.5 px-3">Masa Berlaku</th>
                      <th className="py-2.5 px-3">Status Kontrak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {masterBlanketPo.map((lta) => (
                      <tr key={lta.contractCode} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-bold text-emerald-400">{lta.contractCode}</td>
                        <td className="py-3 px-3 font-sans">
                          <strong className="text-slate-100 block">{lta.title}</strong>
                          <span className="text-[10px] text-slate-400">{lta.category}</span>
                        </td>
                        <td className="py-3 px-3 font-sans text-slate-200">{lta.vendorName}</td>
                        <td className="py-3 px-3 text-amber-300 font-bold">${lta.contractValueUsd.toLocaleString('en-US')}</td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">${lta.spentValueUsd.toLocaleString('en-US')}</td>
                        <td className="py-3 px-3 text-slate-300 text-[10px]">{lta.validFrom} s/d {lta.validTo}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-bold">
                            {lta.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MASTER SUB-TAB 4: KATALOG PRICELIST HARGA PEMBELIAN MASTER */}
          {masterSubTab === 'pricelist_master' && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h4 className="font-bold text-slate-100 text-xs uppercase tracking-wider text-emerald-400">Master Katalog & Pricelist Terkunci Pembelian Sparepart:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                      <th className="py-2.5 px-3">Kode SKU</th>
                      <th className="py-2.5 px-3">Nama Barangan & Spesifikasi</th>
                      <th className="py-2.5 px-3">Vendor Disetujui</th>
                      <th className="py-2.5 px-3">Harga Kontrak ($)</th>
                      <th className="py-2.5 px-3">Harga Terakhir ($)</th>
                      <th className="py-2.5 px-3">MOQ & Lead Time</th>
                      <th className="py-2.5 px-3">Masa Berlaku Harga</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {masterPricelist.map((item) => (
                      <tr key={item.skuCode} className="hover:bg-slate-800/40">
                        <td className="py-3 px-3 font-bold text-sky-400">{item.skuCode}</td>
                        <td className="py-3 px-3 font-sans">
                          <strong className="text-slate-100 block">{item.itemName}</strong>
                          <span className="text-[10px] text-slate-400">{item.category} • UOM: {item.uom}</span>
                        </td>
                        <td className="py-3 px-3 font-sans text-slate-200">{item.vendorName}</td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">${item.contractUnitPriceUsd.toLocaleString('en-US')} / {item.uom}</td>
                        <td className="py-3 px-3 text-slate-400 font-bold">${item.historicalLastPriceUsd.toLocaleString('en-US')}</td>
                        <td className="py-3 px-3 text-amber-300 font-bold">MOQ: {item.moq} • {item.leadTimeDays} Hari</td>
                        <td className="py-3 px-3 text-slate-300 text-[10px]">{item.validUntil}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: PURCHASE REQUISITION (PR) */}
      {activeTab === 'purchase_requisition' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Permintaan Pembelian Permintaan Site (Purchase Requisition - PR)</h3>
              <button 
                onClick={() => setShowPrModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat PR Permintaan Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. PR</th>
                    <th className="py-2.5 px-3">Requester & Departemen</th>
                    <th className="py-2.5 px-3">Kategori Barangan</th>
                    <th className="py-2.5 px-3">Estimasi Anggaran ($)</th>
                    <th className="py-2.5 px-3">Prioritas</th>
                    <th className="py-2.5 px-3">Status Persetujuan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {purchaseRequisitions.map((pr) => (
                    <tr key={pr.prNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{pr.prNo}</td>
                      <td className="py-3 px-3 font-sans">
                        <strong className="text-slate-100 block">{pr.requester}</strong>
                        <span className="text-[10px] text-slate-400">{pr.dept}</span>
                      </td>
                      <td className="py-3 px-3 font-sans text-slate-200">{pr.itemCategory}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">${(pr.estBudgetUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          pr.priority === 'HIGH_URGENT' ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {pr.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {pr.status}
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

      {/* TAB 2: RFQ & QUOTATIONS */}
      {activeTab === 'rfq_quotations' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Permintaan Penawaran Harga (Request for Quotation - RFQ) & Perbandingan Vendor
              </h3>
              <button 
                onClick={() => setShowRfqModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat RFQ Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rfqQuotations.map((rfq) => (
                <div key={rfq.rfqNo} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-emerald-400">{rfq.rfqNo}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                      {rfq.status}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{rfq.title}</strong>

                  <div className="space-y-1 text-slate-400 text-[11px] font-mono">
                    <p>Referensi PR: <strong className="text-slate-200">{rfq.prRef}</strong></p>
                    <p>Vendor Diundang: <strong className="text-slate-200">{rfq.invitedVendorsCount} Supplier</strong></p>
                    <p>Penawaran Terendah: <strong className="text-emerald-400 font-bold">${(rfq.lowestQuoteUsd ?? 0).toLocaleString('en-US')}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: VENDOR MASTER */}
      {activeTab === 'vendor_management' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Direktori Vendor Terverifikasi & Rekanan Tambang (Vendor Master Data)
              </h3>
              <button 
                onClick={() => setShowVendorModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Registrasi Vendor Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Kode Vendor</th>
                    <th className="py-2.5 px-3">Nama Perusahaan Vendor</th>
                    <th className="py-2.5 px-3">Kategori Produk / Jasa</th>
                    <th className="py-2.5 px-3">Rating Kinerja</th>
                    <th className="py-2.5 px-3">Ketepatan Pengiriman (%)</th>
                    <th className="py-2.5 px-3">Total Transaksi (USD)</th>
                    <th className="py-2.5 px-3">Status Sertifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {vendorsList.map((v) => (
                    <tr key={v.vendorId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{v.vendorId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{v.companyName}</td>
                      <td className="py-3 px-3 font-sans text-emerald-300">{v.category}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{v.ratingScore} / 5.0</span>
                      </td>
                      <td className="py-3 px-3 text-slate-200">{v.onTimeDeliveryPct}%</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">${(v.totalPoValueUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {v.status}
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

      {/* TAB 4: PURCHASE ORDERS (PO) */}
      {activeTab === 'purchase_orders' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Surat Pesanan Pembelian Resmi (Purchase Order - PO)
              </h3>
              <button 
                onClick={() => setShowPoModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Terbitkan PO Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. PO</th>
                    <th className="py-2.5 px-3">Nama Vendor Supplier</th>
                    <th className="py-2.5 px-3">Tgl PO</th>
                    <th className="py-2.5 px-3">Total Nilai ($)</th>
                    <th className="py-2.5 px-3">Termin Pembayaran</th>
                    <th className="py-2.5 px-3">Est. Tiba di Site</th>
                    <th className="py-2.5 px-3">Status PO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {purchaseOrders.map((po) => (
                    <tr key={po.poNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{po.poNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{po.vendorName}</td>
                      <td className="py-3 px-3 text-slate-400">{po.poDate}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">${(po.totalAmountUsd ?? 0).toLocaleString('en-US')}</td>
                      <td className="py-3 px-3 text-slate-300">{po.paymentTerms}</td>
                      <td className="py-3 px-3 text-slate-200">{po.estArrivalSite}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {po.approvalState}
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

      {/* TAB 5: APPROVAL MATRIX WORKFLOW */}
      {activeTab === 'approval_workflow' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Hirarki Matriks Persetujuan Berjenjang (Delegation of Authority - DOA)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-100 block">Batas $0 - $10,000 USD</span>
                <p className="text-slate-400">Persetujuan: <strong className="text-emerald-400">Department Head / Superintendent</strong></p>
                <span className="text-[10px] text-slate-500 block">SLA Persetujuan: Maks 24 Jam</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-100 block">Batas $10,001 - $100,000 USD</span>
                <p className="text-slate-400">Persetujuan: <strong className="text-emerald-400">General Manager Site & Finance Controller</strong></p>
                <span className="text-[10px] text-slate-500 block">SLA Persetujuan: Maks 48 Jam</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-slate-100 block">Batas &gt; $100,000 USD</span>
                <p className="text-slate-400">Persetujuan: <strong className="text-emerald-400">Board of Directors & CEO</strong></p>
                <span className="text-[10px] text-slate-500 block">SLA Persetujuan: Maks 72 Jam</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CONTRACTS & TENDER */}
      {(activeTab === 'contracts_management' || activeTab === 'tender_bidding') && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Manajemen Kontrak Jangka Panjang & Lelang Tender Pekerjaan Tambang
              </h3>
              <button 
                onClick={() => setShowTenderModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Tender / Kontrak Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contractsTender.map((c, i) => (
                <div key={i} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-emerald-400">{c.contractNo || c.tenderNo}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">
                      {c.status}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{c.title}</strong>

                  <div className="space-y-1 text-slate-300 font-mono text-[11px]">
                    <p>Nilai Kontrak: <strong className="text-amber-300">${(c.valueUsd || c.budgetUsd)?.toLocaleString('en-US')} USD</strong></p>
                    <p>Penyedia / Peserta: <strong className="text-slate-100">{c.vendor || `${c.biddersCount} Bidders`}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SUPPLIER PERFORMANCE */}
      {activeTab === 'supplier_performance' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Evaluasi KPI Kinerja Supplier & Vendor Scorecard (OTD, QC Compliance & SLA)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Nama Vendor</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3">On-Time Delivery (%)</th>
                    <th className="py-2.5 px-3">Quality Compliance (%)</th>
                    <th className="py-2.5 px-3">Overall Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {vendorsList.map((v) => (
                    <tr key={v.vendorId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{v.companyName}</td>
                      <td className="py-3 px-3 font-sans text-emerald-300">{v.category}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{v.onTimeDeliveryPct}%</td>
                      <td className="py-3 px-3 text-blue-400 font-bold">{v.qualityCompliancePct}%</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{v.ratingScore} / 5.0</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: INPUT PR BARU */}
      {showPrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Buat Purchase Requisition (PR) Baru
              </h3>
              <button onClick={() => setShowPrModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Pemohon (Requester):</label>
                <input
                  type="text"
                  placeholder="Hendra (Pit Supt)"
                  value={prRequester}
                  onChange={(e) => setPrRequester(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Departemen Pemohon:</label>
                <select
                  value={prDept}
                  onChange={(e) => setPrDept(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Mining Operations">Mining Operations</option>
                  <option value="Maintenance Workshop">Maintenance Workshop</option>
                  <option value="Logistics & Shipping">Logistics & Shipping</option>
                  <option value="HSE & Environment">HSE & Environment</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kategori Barangan / Jasa:</label>
                <input
                  type="text"
                  placeholder="Heavy Equipment Spareparts / Oils"
                  value={prCategory}
                  onChange={(e) => setPrCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Estimasi Anggaran ($ USD):</label>
                <input
                  type="number"
                  value={prBudget}
                  onChange={(e) => setPrBudget(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setPurchaseRequisitions(prev => [
                    {
                      prNo: `PR-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                      requester: prRequester || 'User Site Supervisor',
                      dept: prDept,
                      requestDate: new Date().toISOString().slice(0, 10),
                      itemCategory: prCategory,
                      estBudgetUsd: prBudget,
                      priority: 'NORMAL',
                      status: 'PENDING_APPROVAL',
                      currentApprover: 'Department Superintendent'
                    },
                    ...prev
                  ]);
                  setShowPrModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Ajukan PR Permintaan
              </button>
              <button
                onClick={() => setShowPrModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INPUT RFQ BARU */}
      {showRfqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Terbitkan RFQ Penawaran Vendor
              </h3>
              <button onClick={() => setShowRfqModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Judul Permintaan Penawaran (RFQ):</label>
                <input
                  type="text"
                  placeholder="Supply 5x Hydraulic Pump Komatsu PC2000"
                  value={rfqTitle}
                  onChange={(e) => setRfqTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Referensi Nomor PR:</label>
                <input
                  type="text"
                  value={rfqPrRef}
                  onChange={(e) => setRfqPrRef(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Estimasi Nilai Penawaran ($ USD):</label>
                <input
                  type="number"
                  value={rfqEstUsd}
                  onChange={(e) => setRfqEstUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setRfqQuotations(prev => [
                    {
                      rfqNo: `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                      title: rfqTitle || 'Supply Components & Spareparts',
                      prRef: rfqPrRef,
                      targetDeliveryDays: 10,
                      invitedVendorsCount: 4,
                      quotesReceivedCount: 1,
                      lowestQuoteUsd: rfqEstUsd,
                      status: 'EVALUATION_STAGE'
                    },
                    ...prev
                  ]);
                  setShowRfqModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Kirim Undangan RFQ
              </button>
              <button
                onClick={() => setShowRfqModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: REGISTRASI VENDOR */}
      {showVendorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-400" /> Registrasi Master Data Vendor
              </h3>
              <button onClick={() => setShowVendorModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Perusahaan Vendor:</label>
                <input
                  type="text"
                  placeholder="PT Hexindo Adiperkasa Tbk"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kategori Layanan / Produk:</label>
                <input
                  type="text"
                  value={vendorCategory}
                  onChange={(e) => setVendorCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setVendorsList(prev => [
                    {
                      vendorId: `VND-00${prev.length + 1}`,
                      companyName: vendorName || 'PT Vendor Rekanan Tambang',
                      category: vendorCategory,
                      ratingScore: 4.5,
                      onTimeDeliveryPct: 95.0,
                      qualityCompliancePct: 98.0,
                      totalPoValueUsd: 0,
                      status: 'VERIFIED_SUPPLIER'
                    },
                    ...prev
                  ]);
                  setShowVendorModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Verifikasi & Simpan Vendor
              </button>
              <button
                onClick={() => setShowVendorModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: TERBITKAN PO */}
      {showPoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-emerald-400" /> Penerbitan Purchase Order (PO)
              </h3>
              <button onClick={() => setShowPoModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Vendor Pilihan:</label>
                <input
                  type="text"
                  value={poVendorName}
                  onChange={(e) => setPoVendorName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Total Nilai Pesanan ($ USD):</label>
                <input
                  type="number"
                  value={poAmountUsd}
                  onChange={(e) => setPoAmountUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setPurchaseOrders(prev => [
                    {
                      poNo: `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                      rfqRef: 'RFQ-2026-0112',
                      vendorName: poVendorName,
                      poDate: new Date().toISOString().slice(0, 10),
                      totalAmountUsd: poAmountUsd,
                      paymentTerms: 'Net 30 Days',
                      estArrivalSite: '2026-08-25',
                      approvalState: 'APPROVED_EXECUTED'
                    },
                    ...prev
                  ]);
                  setShowPoModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Eksekusi & Terbitkan PO
              </button>
              <button
                onClick={() => setShowPoModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: INPUT TENDER / KONTRAK */}
      {showTenderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Gavel className="w-4 h-4 text-emerald-400" /> Buka Tender / Kontrak Pekerjaan Baru
              </h3>
              <button onClick={() => setShowTenderModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Judul Tender Pekerjaan Tambang:</label>
                <input
                  type="text"
                  placeholder="Tender Pengangkutan Ore Nikel Route Pit to Port"
                  value={tenderTitle}
                  onChange={(e) => setTenderTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Nilai Pagu Anggaran ($ USD):</label>
                <input
                  type="number"
                  value={tenderBudgetUsd}
                  onChange={(e) => setTenderBudgetUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setContractsTender(prev => [
                    {
                      tenderNo: `TND-2026-MINE-${Math.floor(10 + Math.random() * 90)}`,
                      title: tenderTitle || 'Tender Kontraktor Pekerjaan Tambang',
                      budgetUsd: tenderBudgetUsd,
                      biddersCount: 3,
                      closingDate: '2026-08-30',
                      status: 'BID_SUBMISSION_OPEN'
                    },
                    ...prev
                  ]);
                  setShowTenderModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Publikasi Lelang Tender
              </button>
              <button
                onClick={() => setShowTenderModal(false)}
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
