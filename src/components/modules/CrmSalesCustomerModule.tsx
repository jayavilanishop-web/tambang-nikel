import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  Target, 
  FileCheck2, 
  Receipt, 
  HelpCircle, 
  AlertCircle, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Globe, 
  DollarSign, 
  BarChart3, 
  Phone, 
  Mail, 
  Tag, 
  Send, 
  Sparkles 
} from 'lucide-react';
import { Language } from '../../types';

interface CrmSalesCustomerModuleProps {
  language: Language;
}

export const CrmSalesCustomerModule: React.FC<CrmSalesCustomerModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'crm_overview'
    | 'customer_management'
    | 'contracts'
    | 'sales_deals'
    | 'marketing'
    | 'quotation'
    | 'invoice'
    | 'support_tickets'
    | 'complaint_claims'
  >('crm_overview');

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Customer / Buyers Dataset
  const customersList = [
    { custId: 'CUST-SMELTER-01', companyName: 'PT Indonesia Tsingshan Stainless Steel (ITSS)', contactPerson: 'Chen Wei / Procurement Director', country: 'Indonesia (Morowali)', category: 'TIER_1_SMELTER_OFFTAKER', totalContractVal: '$124,500,000 USD', creditLimit: '$15,000,000 USD', status: 'ACTIVE_VIP' },
    { custId: 'CUST-VALE-02', companyName: 'PT Vale Indonesia Tbk (Pomalaa)', contactPerson: 'Ahmad Subagja', country: 'Indonesia (Sultra)', category: 'HIGH_GRADE_SAPROLITE_BUYER', totalContractVal: '$88,000,000 USD', creditLimit: '$10,000,000 USD', status: 'ACTIVE_VIP' },
    { custId: 'CUST-TRADER-03', companyName: 'Glencore International AG', contactPerson: 'Markus Vance', country: 'Switzerland', category: 'GLOBAL_COMMODITY_TRADER', totalContractVal: '$45,200,000 USD', creditLimit: '$5,000,000 USD', status: 'ACTIVE' }
  ];

  // Contracts Dataset
  const contractsList = [
    { contractNo: 'CTR-OFFTAKE-2026-01', buyerName: 'PT Indonesia Tsingshan (ITSS)', targetVolumeWmt: 1200000, gradeSpec: 'Ni >= 1.80%, Fe >= 15%, MC <= 35%', incoterm: 'FOB Jetty Morowali', pricingBasis: 'HPM ESDM Index + Premium', startDate: '2026-01-01', expiryDate: '2026-12-31', status: 'EXECUTING_ON_SCHEDULE' },
    { contractNo: 'CTR-SPOT-2026-04', buyerName: 'Glencore International AG', targetVolumeWmt: 150000, gradeSpec: 'Ni >= 1.90% High Grade Saprolite', incoterm: 'CIF Weda Bay Port', pricingBasis: 'LME Nickel Index Floating', startDate: '2026-06-01', expiryDate: '2026-09-30', status: 'ACTIVE' }
  ];

  // Sales Deals Dataset
  const salesDeals = [
    { dealId: 'DEAL-2026-081', dealName: 'Pengapalan Saprolite Shipment #18 (Barge 330ft)', buyer: 'PT Indonesia Tsingshan (ITSS)', volumeWmt: 10500, estRevenueUsd: 682500, dealStage: 'BARGE_DISPATCHED', salesRep: 'Dedi Kurniawan' },
    { dealId: 'DEAL-2026-082', dealName: 'Penjualan Spot Limonite Low Grade (LCT-04)', buyer: 'PT Vale Indonesia', volumeWmt: 7800, estRevenueUsd: 312000, dealStage: 'NEGOTIATION_FINAL', salesRep: 'Rina Sugiarto' }
  ];

  // Marketing Campaigns Dataset
  const marketingCampaigns = [
    { campaignId: 'MKT-2026-Q3', title: 'Promosi Nickel Ore Kadar Ni >= 1.9% Pasar Asia Pasifik', targetAudience: 'Global Battery Smelter & HPAL Plants', leadsGenerated: 24, channel: 'Mining Conference Jakarta & Direct Outreach', budgetUsd: 45000, status: 'CAMPAIGN_ACTIVE' }
  ];

  // Quotation Dataset
  const quotationsList = [
    { quoteNo: 'QUO-2026-091', recipientName: 'Zhejiang Huayou Cobalt Co.', oreGradeRequested: 'Limoni Ni 1.30% (HPAL Feedstock)', qtyRequestedWmt: 300000, pricePerWmt: '$32.50 USD / WMT', validUntil: '2026-08-30', status: 'OFFER_SENT' }
  ];

  // Invoices Dataset
  const invoicesList = [
    { invNo: 'INV-2026-0412', buyerName: 'PT Indonesia Tsingshan (ITSS)', dealRef: 'DEAL-2026-081', invType: 'PROFORMA_INVOICE_90%', amountUsd: 614250, dueDate: '2026-08-15', paymentStatus: 'UNPAID_PENDING_DUE' },
    { invNo: 'INV-2026-0399', buyerName: 'PT Vale Indonesia', dealRef: 'DEAL-2026-072', invType: 'FINAL_COMMERCIAL_INVOICE_100%', amountUsd: 428000, dueDate: '2026-07-30', paymentStatus: 'PAID_FULL' }
  ];

  // Support Tickets Dataset
  const supportTickets = [
    { ticketId: 'SUP-2026-014', buyerName: 'PT Indonesia Tsingshan', subject: 'Permintaan Dokumen COA (Certificate of Analysis) Independen', priority: 'HIGH', assignedTo: 'Quality Assurance Sales', status: 'IN_PROGRESS' }
  ];

  // Complaints & Assay Claims Dataset
  const complaintsList = [
    { claimNo: 'CLM-2026-003', buyerName: 'Glencore International', shipmentRef: 'Barge PST-08', claimType: 'MOISTURE_PENALTY_CLAIM', description: 'Moisture Content hasil lab discharge port 36.2% (Kontrak max 35.0%). Penyesuaian potongan bobot 1.2%.', claimValUsd: 12400, resolutionStatus: 'SETTLED_CREDIT_NOTE_ISSUED' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Mining Commercial & CRM Sales Management
            </span>
            <span className="text-slate-400 text-xs">• Offtaker Contracts & Global Trader Relations</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            CRM Tambang, Pelanggan, Kontrak Offtake, Penjualan & Invoice
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Manajemen hubungan pembeli bijih nikel (Smelter & Trader): Pelanggan (Customer), Kontrak Jangka Panjang, Deal Sales Pipeline, Kampanye Marketing, Penawaran Harga (Quotation), Tagihan Invoice, Layanan Dukungan (Support) & Klaim Kadar Ore (Complaint).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <Users className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Nilai Pipeline Sales 2026:</span>
            <strong className="text-indigo-400 font-mono text-base font-bold">$257.7 Juta USD</strong>
          </div>
        </div>
      </div>

      {/* Commercial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Total Active Buyers (Smelters)</span>
          <p className="text-2xl font-extrabold text-indigo-400 font-mono">14 <span className="text-xs font-normal text-slate-400">Companies</span></p>
          <span className="text-[11px] text-slate-500 block">3 VIP Long-term Offtakers</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Active Offtake Contracts</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">1.35M <span className="text-xs font-normal text-slate-400">WMT Target</span></p>
          <span className="text-[11px] text-slate-500 block">HPM ESDM Index Pricing</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Pending Invoices Payment</span>
          <p className="text-2xl font-extrabold text-amber-300 font-mono">$1.85M <span className="text-xs font-normal text-slate-400">USD</span></p>
          <span className="text-[11px] text-slate-500 block">Proforma 90% Issued</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Customer Complaint Claims</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">100% <span className="text-xs font-normal text-slate-400">Settled</span></p>
          <span className="text-[11px] text-slate-500 block">Moisture Penalty Adjusted</span>
        </div>
      </div>

      {/* Module Navigation Sub-Tabs covering all 9 CRM keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'crm_overview', label: 'Ringkasan CRM Pipeline', icon: TrendingUp },
          { id: 'customer_management', label: 'Pelanggan & Smelter (Customer)', icon: Users },
          { id: 'contracts', label: 'Kontrak Offtake (Contract)', icon: Briefcase },
          { id: 'sales_deals', label: 'Penjualan & Shipment (Sales)', icon: Target },
          { id: 'marketing', label: 'Kampanye Pemasaran (Marketing)', icon: Sparkles },
          { id: 'quotation', label: 'Penawaran Harga (Quotation)', icon: FileCheck2 },
          { id: 'invoice', label: 'Tagihan & Invoice', icon: Receipt },
          { id: 'support_tickets', label: 'Dukungan Pelanggan (Support)', icon: HelpCircle },
          { id: 'complaint_claims', label: 'Klaim & Keluhan (Complaint)', icon: AlertCircle }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CRM OVERVIEW PIPELINE */}
      {activeTab === 'crm_overview' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Kinerja CRM Commercial Sales Pipeline & Offtake Distribution 2026
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-indigo-400 font-bold block border-b border-slate-800 pb-2">
                  Penjualan Berdasarkan Tipe Pembeli (Offtaker Class)
                </span>
                <div className="space-y-2 font-mono text-slate-300">
                  <div className="flex justify-between items-center">
                    <span>Domestic Smelter (Morowali & Weda Bay):</span>
                    <strong className="text-indigo-300">65% (850,000 WMT)</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Export & Global Commodity Traders:</span>
                    <strong className="text-amber-300">25% (320,000 WMT)</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Local HPAL Processing Plants:</span>
                    <strong className="text-emerald-400">10% (130,000 WMT)</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-indigo-400 font-bold block border-b border-slate-800 pb-2">
                  Metode Penentuan Harga (Pricing Formula)
                </span>
                <div className="space-y-2 text-slate-300 text-[11px]">
                  <p>• <strong className="text-slate-100">Harga Patokan Mineral (HPM ESDM):</strong> Acuan utama transaksi domestik nikel Indonesia.</p>
                  <p>• <strong className="text-slate-100">London Metal Exchange (LME Nickel):</strong> Acuan dasar untuk kontrak ekspor & kesepakatan trader internasional.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMER MANAGEMENT */}
      {activeTab === 'customer_management' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Direktori Pelanggan & Pembeli Bijih Nikel (Customer Registry)</h3>
              <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Pelanggan Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Customer ID</th>
                    <th className="py-2.5 px-3">Nama Perusahaan Pembeli (Smelter/Trader)</th>
                    <th className="py-2.5 px-3">Penanggung Jawab / Kontak</th>
                    <th className="py-2.5 px-3">Negara / Lokasi</th>
                    <th className="py-2.5 px-3">Kategori Buyer</th>
                    <th className="py-2.5 px-3">Nilai Kontrak Total</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {customersList.map((c) => (
                    <tr key={c.custId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{c.custId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{c.companyName}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{c.contactPerson}</td>
                      <td className="py-3 px-3 font-sans text-slate-400">{c.country}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{c.category}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{c.totalContractVal}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {c.status}
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

      {/* TAB 3: CONTRACTS */}
      {activeTab === 'contracts' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Kontrak Penjualan Long-Term Offtake & Agreement Spot (Contract Management)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Kontrak</th>
                    <th className="py-2.5 px-3">Nama Pembeli (Buyer)</th>
                    <th className="py-2.5 px-3">Target Volume (WMT)</th>
                    <th className="py-2.5 px-3">Spesifikasi Kualitas Grade Nikel</th>
                    <th className="py-2.5 px-3">Syarat Penyerahan Incoterms</th>
                    <th className="py-2.5 px-3">Status Kontrak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {contractsList.map((ct) => (
                    <tr key={ct.contractNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{ct.contractNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{ct.buyerName}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{ct.targetVolumeWmt.toLocaleString()} WMT</td>
                      <td className="py-3 px-3 font-sans text-amber-300">{ct.gradeSpec}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{ct.incoterm}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {ct.status}
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

      {/* TAB 4: SALES DEALS */}
      {activeTab === 'sales_deals' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pelacak Transaksi Penjualan & Pengapalan Ore (Sales Deal Pipeline)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Deal ID</th>
                    <th className="py-2.5 px-3">Nama Transaksi Penjualan</th>
                    <th className="py-2.5 px-3">Pembeli</th>
                    <th className="py-2.5 px-3">Volume Ore (WMT)</th>
                    <th className="py-2.5 px-3">Estimasi Nilai (USD)</th>
                    <th className="py-2.5 px-3">Tahap Transaksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {salesDeals.map((d) => (
                    <tr key={d.dealId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{d.dealId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{d.dealName}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{d.buyer}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{d.volumeWmt.toLocaleString()} WMT</td>
                      <td className="py-3 px-3 text-indigo-300 font-bold">${d.estRevenueUsd.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-indigo-500/20 text-indigo-300">
                          {d.dealStage}
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

      {/* TAB 5: MARKETING */}
      {activeTab === 'marketing' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Kampanye Pemasaran Komoditas & Outreach Smelter Global (Marketing)
            </h3>

            <div className="space-y-3">
              {marketingCampaigns.map((m) => (
                <div key={m.campaignId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-indigo-400">{m.campaignId}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {m.status}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{m.title}</strong>
                  <p className="text-slate-300">Target Audiens: <span className="text-amber-300 font-bold">{m.targetAudience}</span></p>
                  <span className="text-slate-500 text-[10px] block font-mono">Channel: {m.channel} • Prospek Lead Masuk: {m.leadsGenerated} Smelters</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: QUOTATION */}
      {activeTab === 'quotation' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Penawaran Harga Resmi Komoditas Bijih Nikel (Quotation / Commercial Offer)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Penawaran</th>
                    <th className="py-2.5 px-3">Calon Pembeli</th>
                    <th className="py-2.5 px-3">Spesifikasi Kadar Ore</th>
                    <th className="py-2.5 px-3">Volume Permintaan</th>
                    <th className="py-2.5 px-3">Harga Penawaran</th>
                    <th className="py-2.5 px-3">Status Offer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {quotationsList.map((q) => (
                    <tr key={q.quoteNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{q.quoteNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{q.recipientName}</td>
                      <td className="py-3 px-3 font-sans text-amber-300">{q.oreGradeRequested}</td>
                      <td className="py-3 px-3 text-slate-200">{q.qtyRequestedWmt.toLocaleString()} WMT</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{q.pricePerWmt}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-amber-500/20 text-amber-300">
                          {q.status}
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

      {/* TAB 7: INVOICE */}
      {activeTab === 'invoice' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Tagihan & Faktur Komersial (Proforma vs Final Commercial Invoice)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Invoice</th>
                    <th className="py-2.5 px-3">Nama Pembeli</th>
                    <th className="py-2.5 px-3">Tipe Tagihan</th>
                    <th className="py-2.5 px-3">Jumlah Tagihan (USD)</th>
                    <th className="py-2.5 px-3">Jatuh Tempo</th>
                    <th className="py-2.5 px-3">Status Pembayaran</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {invoicesList.map((inv) => (
                    <tr key={inv.invNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{inv.invNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{inv.buyerName}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{inv.invType}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">${inv.amountUsd.toLocaleString()}</td>
                      <td className="py-3 px-3 text-slate-400">{inv.dueDate}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          inv.paymentStatus.includes('PAID_FULL') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {inv.paymentStatus}
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

      {/* TAB 8: SUPPORT TICKETS */}
      {activeTab === 'support_tickets' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Layanan Bantuan & Permintaan Layanan Pembeli (Customer Support)
            </h3>

            <div className="space-y-3 font-mono">
              {supportTickets.map((st) => (
                <div key={st.ticketId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-indigo-400">{st.ticketId}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      {st.status}
                    </span>
                  </div>
                  <strong className="text-slate-100 text-sm font-sans font-bold block">{st.subject}</strong>
                  <p className="text-slate-300 text-[11px] font-sans">Pembeli: <span className="text-indigo-300 font-bold">{st.buyerName}</span></p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: COMPLAINT CLAIMS */}
      {activeTab === 'complaint_claims' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Penanganan Keluhan & Sengketa Klaim Kadar/Kadar Air (Complaint & Assay Claim Settlement)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Klaim</th>
                    <th className="py-2.5 px-3">Nama Pembeli</th>
                    <th className="py-2.5 px-3">Tipe Keluhan / Claim</th>
                    <th className="py-2.5 px-3">Deskripsi Sengketa Lab</th>
                    <th className="py-2.5 px-3">Nilai Penyesuaian Klaim</th>
                    <th className="py-2.5 px-3">Status Penyelesaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {complaintsList.map((c) => (
                    <tr key={c.claimNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-rose-400">{c.claimNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{c.buyerName}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{c.claimType}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{c.description}</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">${c.claimValUsd.toLocaleString()} USD</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {c.resolutionStatus}
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
