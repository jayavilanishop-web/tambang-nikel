import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  FileSpreadsheet, 
  FileText, 
  FileCode, 
  Presentation, 
  Printer, 
  Mail, 
  Sliders, 
  LayoutGrid, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Send, 
  Share2, 
  Sparkles, 
  Layers, 
  Copy, 
  Trash2, 
  RefreshCw, 
  Eye, 
  Settings 
} from 'lucide-react';
import { Language } from '../../types';

interface ReportDashboardBuilderModuleProps {
  language: Language;
}

export const ReportDashboardBuilderModule: React.FC<ReportDashboardBuilderModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'custom_report_builder'
    | 'dashboard_builder'
    | 'multi_export_hub'
    | 'print_email_distribution'
  >('custom_report_builder');

  const [selectedReportType, setSelectedReportType] = useState<string>('PRODUCTION_ESDM');
  const [selectedExportFormat, setSelectedExportFormat] = useState<'EXCEL' | 'PDF' | 'WORD' | 'CSV' | 'POWERPOINT'>('EXCEL');
  const [emailScheduleActive, setEmailScheduleActive] = useState<boolean>(true);

  // Custom Built Reports Dataset
  const customReportsList = [
    { reportId: 'RPT-2026-081', title: 'Laporan Rekapitulasi Produksi & Grade Ore Nikel Harian (ESDM Format)', dataset: 'Pit Exploration & Stockpile Blending', metrics: 'Total WMT, Ni %, Fe %, Moisture Content %', createdBy: 'KTT Ir. Bambang Wijaya', lastGenerated: '2026-08-03 08:00', frequency: 'Daily Auto-Generated' },
    { reportId: 'RPT-2026-082', title: 'Laporan Rekap Biaya Operasional CAPEX & Fuel Consumption B35', dataset: 'Fleet Telemetry & Finance Ledger', metrics: 'Liters Consumed, Fuel Ratio, Cost per Ton', createdBy: 'Finance Controller', lastGenerated: '2026-08-01 17:30', frequency: 'Weekly' },
    { reportId: 'RPT-2026-083', title: 'Laporan Kepatuhan K3LH & Efluat Limpasan Settling Pond (BPLH)', dataset: 'HSE Environment Telemetry', metrics: 'pH Water, Total Suspended Solids (TSS), Heavy Metals', createdBy: 'Siti Nurhaliza (HSE Lead)', lastGenerated: '2026-08-02 12:00', frequency: 'Monthly' }
  ];

  // Custom Dashboard Widgets Config Dataset
  const dashboardWidgets = [
    { widgetId: 'WGT-01', title: 'Grafik Tonase Produksi Nickel Ore vs Target RKAB 2026', type: 'Bar Chart (Bar)', source: 'Production Database', span: 'col-span-2' },
    { widgetId: 'WGT-02', title: 'Distribusi Grade Ore (High Saprolite vs Limonite)', type: 'Donut Chart (Pie)', source: 'Assay Lab Analytics', span: 'col-span-1' },
    { widgetId: 'WGT-03', title: 'KPI Konsumsi BBM Fuel Ratio Dump Truck (L/Ton)', type: 'Gauge Metric', source: 'IoT GPS Telemetry', span: 'col-span-1' },
    { widgetId: 'WGT-04', title: 'Status Demurrage Barging Jetty Pier A & B', type: 'Real-Time Table', source: 'Jetty Barging Module', span: 'col-span-2' }
  ];

  // Scheduled Email & Distribution Automation Dataset
  const scheduledEmails = [
    { scheduleId: 'SCH-EMAIL-01', reportName: 'Ringkasan Eksekutif Harian KTT Tambang Nikel', recipients: 'ktt@nikelsite.co.id, direksi@nikelsite.co.id, esdm.inspector@esdm.go.id', format: 'PDF & EXCEL', sendTime: 'Setiap Hari Pukul 06:00 WITA', status: 'ACTIVE_AUTOMATED' },
    { scheduleId: 'SCH-EMAIL-02', reportName: 'Laporan Realisasi Penjualan & Tagihan Offtaker Smelter', recipients: 'commercial@nikelsite.co.id, finance@nikelsite.co.id', format: 'EXCEL & WORD', sendTime: 'Setiap Hari Senin Pukul 08:00 WITA', status: 'ACTIVE_AUTOMATED' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Enterprise Mining BI & Custom Reporting Center
            </span>
            <span className="text-slate-400 text-xs">• Cross-Module Data Synthesis & Multi-Format Export</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Pembangun Laporan Custom, Dashboard Interactive, Ekspor & Distribusi Email
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pembuatan laporan kustom: Pembuat Laporan (Custom Report Builder), Pembangun Dashboard (Dashboard Builder), Pusat Ekspor Serbaguna (Excel, PDF, Word, CSV, PowerPoint), Cetak Langsung (Print) & Pengiriman Otomatis Email.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <BarChart3 className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Laporan Kustom Dibuat:</span>
            <strong className="text-indigo-400 font-mono text-base font-bold">128 Laporan Active</strong>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Custom Reports Generated</span>
          <p className="text-2xl font-extrabold text-indigo-400 font-mono">1,420 <span className="text-xs font-normal text-slate-400">Reports</span></p>
          <span className="text-[11px] text-slate-500 block">ESDM, RKAB & Operational</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Interactive Dashboards</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">12 <span className="text-xs font-normal text-slate-400">Layouts</span></p>
          <span className="text-[11px] text-slate-500 block">Drag & Drop Widgets Active</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Supported Export Formats</span>
          <p className="text-2xl font-extrabold text-amber-300 font-mono">5 Formats <span className="text-xs font-normal text-slate-400">Formats</span></p>
          <span className="text-[11px] text-slate-500 block">Excel, PDF, Word, CSV, PPT</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Automated Email Dispatch</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">100% <span className="text-xs font-normal text-slate-400">Sent OK</span></p>
          <span className="text-[11px] text-slate-500 block">Daily 06:00 WITA Dispatch</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs covering all 10 Report keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'custom_report_builder', label: 'Pembangun Laporan (Custom Report Builder)', icon: Sliders },
          { id: 'dashboard_builder', label: 'Pembangun Dashboard (Dashboard Builder)', icon: LayoutGrid },
          { id: 'multi_export_hub', label: 'Pusat Ekspor Multi-Format (Excel, PDF, Word, CSV, PPT)', icon: Download },
          { id: 'print_email_distribution', label: 'Cetak & Pengiriman Email (Print / Email)', icon: Mail }
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

      {/* TAB 1: CUSTOM REPORT BUILDER */}
      {activeTab === 'custom_report_builder' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Pembuat Laporan Kustom Lintas Modul Tambang (Custom Report Builder)</h3>
              <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Desain Laporan Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {customReportsList.map((rpt) => (
                <div key={rpt.reportId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-indigo-400">{rpt.reportId}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {rpt.frequency}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{rpt.title}</strong>
                  <p className="text-slate-400 text-[11px]">Sumber Data: <span className="text-slate-200 font-bold">{rpt.dataset}</span></p>
                  <p className="text-slate-400 text-[11px]">Metrik Ditampilkan: <span className="text-amber-300 font-bold">{rpt.metrics}</span></p>

                  <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>Penulis: {rpt.createdBy}</span>
                    <span>Generasi Terakhir: {rpt.lastGenerated}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DASHBOARD BUILDER */}
      {activeTab === 'dashboard_builder' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Pembangun Tata Letak Dashboard Interaktif (Dashboard Builder)</h3>
              <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Widget Grafik</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dashboardWidgets.map((wgt) => (
                <div key={wgt.widgetId} className={`p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3 ${wgt.span}`}>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-indigo-400">{wgt.widgetId}</span>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                      {wgt.type}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{wgt.title}</strong>
                  <div className="p-6 bg-slate-900 rounded-lg border border-slate-800 text-center text-slate-500 font-mono">
                    [ Canvas Widget Graphics Live Stream: {wgt.source} ]
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MULTI EXPORT HUB */}
      {activeTab === 'multi_export_hub' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pusat Unduhan & Ekspor Berkas Laporan Multi-Format (Export Center)
            </h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
              <span className="text-slate-300 font-bold block">Pilih Format Unduhan Laporan Laporan Operasional Tambang:</span>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { fmt: 'EXCEL', label: 'Excel (.xlsx)', icon: FileSpreadsheet, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
                  { fmt: 'PDF', label: 'Document PDF', icon: FileText, color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
                  { fmt: 'WORD', label: 'Word (.docx)', icon: FileCode, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
                  { fmt: 'CSV', label: 'Raw CSV Data', icon: Layers, color: 'text-amber-300 border-amber-500/30 bg-amber-500/10' },
                  { fmt: 'POWERPOINT', label: 'PowerPoint (.pptx)', icon: Presentation, color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' }
                ].map((item) => {
                  const IconComp = item.icon;
                  const isSelected = selectedExportFormat === item.fmt;
                  return (
                    <button
                      key={item.fmt}
                      onClick={() => setSelectedExportFormat(item.fmt as any)}
                      className={`p-3.5 rounded-xl border flex flex-col items-center justify-center gap-2 font-bold transition-all ${
                        isSelected 
                          ? `${item.color} shadow-lg ring-2 ring-indigo-500` 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <IconComp className="w-6 h-6" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 text-xs shadow-lg">
                  <Download className="w-4 h-4" />
                  <span>Generate & Unduh Laporan ({selectedExportFormat})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PRINT & EMAIL DISTRIBUTION */}
      {activeTab === 'print_email_distribution' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Cetak Langsung & Otomasi Pengiriman Email Laporan (Print / Email Scheduler)</h3>
              <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Dokumen Laporan (Print)</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Schedule ID</th>
                    <th className="py-2.5 px-3">Nama Laporan Distribusi</th>
                    <th className="py-2.5 px-3">Daftar Email Penerima (Recipients)</th>
                    <th className="py-2.5 px-3">Format Attachment</th>
                    <th className="py-2.5 px-3">Jadwal Rutin Pengiriman</th>
                    <th className="py-2.5 px-3">Status Otomasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {scheduledEmails.map((se) => (
                    <tr key={se.scheduleId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{se.scheduleId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{se.reportName}</td>
                      <td className="py-3 px-3 font-sans text-slate-300 max-w-[200px] truncate">{se.recipients}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{se.format}</td>
                      <td className="py-3 px-3 text-slate-400">{se.sendTime}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {se.status}
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
