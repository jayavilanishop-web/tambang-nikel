import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckSquare, 
  Kanban, 
  Calendar, 
  BarChart2, 
  Flag, 
  DollarSign, 
  AlertOctagon, 
  AlertTriangle, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Users, 
  TrendingUp, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  MoreVertical, 
  ChevronRight, 
  Building2 
} from 'lucide-react';
import { Language } from '../../types';

interface ProjectManagementModuleProps {
  language: Language;
}

export const ProjectManagementModule: React.FC<ProjectManagementModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'project_overview'
    | 'task_kanban'
    | 'gantt_timeline'
    | 'milestones'
    | 'project_budget'
    | 'issue_log'
    | 'risk_register'
  >('project_overview');

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Mining Projects Dataset
  const projectsList = [
    { projId: 'PRJ-2026-01', title: 'Pembangunan Conveyor Belt & Crusher Station #3', manager: 'Ir. Agus Pratama', budgetUsd: 4200000, spentUsd: 2850000, progressPct: 68, startDate: '2026-02-10', endDate: '2026-11-30', status: 'IN_PROGRESS' },
    { projId: 'PRJ-2026-02', title: 'Ekspansi Dermaga Jetty Berth B (Kapasitas Tongkang 330ft)', manager: 'Hendra Setiawan', budgetUsd: 8500000, spentUsd: 6200000, progressPct: 75, startDate: '2026-01-15', endDate: '2026-09-30', status: 'IN_PROGRESS' },
    { projId: 'PRJ-2026-03', title: 'Pembangunan Settling Pond 4 Tahap Pit Beta', manager: 'Siti Nurhaliza (HSE Lead)', budgetUsd: 1200000, spentUsd: 1180000, progressPct: 95, startDate: '2026-03-01', endDate: '2026-08-15', status: 'NEAR_COMPLETION' }
  ];

  // Kanban Tasks Dataset
  const initialKanbanTasks = [
    { id: 'TSK-101', title: 'Pemasangan Gantry Frame Conveyor #3', category: 'Civil Construction', assignee: 'PT Wijaya Konstruksi', priority: 'HIGH', column: 'IN_PROGRESS' },
    { id: 'TSK-102', title: 'Pengujian Hydrotest Pipa Dewatering Pit Alpha', category: 'Piping & Mechanical', assignee: 'Tim Utility Site', priority: 'MEDIUM', column: 'IN_PROGRESS' },
    { id: 'TSK-103', title: 'Sertifikasi Kalibrasi Jembatan Timbang Jetty', category: 'ESDM Compliance', assignee: 'Metrologi & Quality', priority: 'HIGH', column: 'TO_DO' },
    { id: 'TSK-104', title: 'Pengecoran Tapak Substation Genset 2MW', category: 'Electrical', assignee: 'Civil Team', priority: 'LOW', column: 'DONE' }
  ];

  const [kanbanTasks, setKanbanTasks] = useState(initialKanbanTasks);

  // Milestones Dataset
  const milestonesData = [
    { msId: 'MS-01', project: 'Ekspansi Dermaga Jetty B', title: 'Pemancangan Tiang Pancang Steel Pipe Pile 100%', targetDate: '2026-06-30', achievedDate: '2026-06-28', status: 'ACHIEVED_ON_TIME' },
    { msId: 'MS-02', project: 'Conveyor Station #3', title: 'Pemasangan Motor Drive & Belt Pulley Alignment', targetDate: '2026-08-20', achievedDate: 'PENDING', status: 'UPCOMING_CRITICAL' },
    { msId: 'MS-03', project: 'Settling Pond 4 Pit Beta', title: 'Uji Coba Dosing Alum & Effluent Water Sampling', targetDate: '2026-08-10', achievedDate: 'PENDING', status: 'UPCOMING_ON_SCHEDULE' }
  ];

  // Budget Variance Dataset
  const projectBudgets = [
    { category: 'Pekerjaan Sipil & Infrastruktur Main Haul Road', allocatedBudget: 3500000, actualSpent: 3100000, variance: 400000, status: 'UNDER_BUDGET' },
    { category: 'Pengadaan Mesin Crusher & Spare Conveyor', allocatedBudget: 5000000, actualSpent: 5200000, variance: -200000, status: 'OVER_BUDGET_SLIGHT' },
    { category: 'Studi AMDAL & Penataan Lahan Reklamasi', allocatedBudget: 800000, actualSpent: 720000, variance: 80000, status: 'UNDER_BUDGET' }
  ];

  // Issues Log Dataset
  const projectIssues = [
    { issueId: 'ISS-2026-041', project: 'Conveyor Station #3', issueTitle: 'Keterlambatan Pengiriman Motor Gearbox Siemens dari Surabaya Port', severity: 'HIGH', owner: 'Logistics Procurement', status: 'IN_PROGRESS_EXPEDITED' },
    { issueId: 'ISS-2026-042', project: 'Ekspansi Dermaga Jetty B', issueTitle: 'Cuaca Gelombang Tinggi Hambat Pengoperasian Crane Barge', severity: 'MEDIUM', owner: 'Port Master Crew', status: 'MONITORING_WEATHER' }
  ];

  // Risk Register Dataset
  const riskRegister = [
    { riskId: 'RSK-2026-012', project: 'Ekspansi Dermaga Jetty B', riskEvent: 'Longsoran Tebing Pantai akibat Abrasi & Beban Berat Crane', likelihood: 'LOW (2)', impact: 'HIGH (4)', riskScore: 'MEDIUM (8)', mitigationPlan: 'Pemasangan Retaining Wall Sheet Pile & Sensor Inclinometer AI', status: 'MITIGATED' },
    { riskId: 'RSK-2026-013', project: 'Conveyor Station #3', riskEvent: 'Fluktuasi Harga Baja Konstruksi & Komponen Elektrikal', likelihood: 'MEDIUM (3)', impact: 'MEDIUM (3)', riskScore: 'MEDIUM (9)', mitigationPlan: 'Kontrak Fixed-Price Lock-in dengan Supplier Utama', status: 'ACTIVE_MONITORED' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Mine Expansion & Engineering Project Management
            </span>
            <span className="text-slate-400 text-xs">• CAPEX Infrastructure & Construction Tracking</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Manajemen Proyek Konstruksi Tambang, Kanban, Gantt & Risiko
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pengawasan proyek ekspansi pertambangan: Ringkasan Proyek CAPEX, Papan Kanban Tugas, Jadwal Timeline Gantt Chart, Milestone Kunci, Anggaran (Budget), Isu Konstruksi & Pendaftaran Risiko (Risk Register).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <Briefcase className="w-6 h-6 text-indigo-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Total Portofolio Proyek CAPEX:</span>
            <strong className="text-indigo-400 font-mono text-base font-bold">$13.9 Juta USD</strong>
          </div>
        </div>
      </div>

      {/* High-Level Project KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Total Proyek Konstruksi Aktif</span>
          <p className="text-2xl font-extrabold text-indigo-400 font-mono">3 <span className="text-xs font-normal text-slate-400">Proyek Utama</span></p>
          <span className="text-[11px] text-slate-500 block">Progres Rata-rata 79.3%</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Tugas Kanban In-Progress</span>
          <p className="text-2xl font-extrabold text-amber-300 font-mono">14 <span className="text-xs font-normal text-slate-400">Tasks</span></p>
          <span className="text-[11px] text-slate-500 block">Sipil, Mekanikal & Elektrikal</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Milestone Achieved</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">8 / 10 <span className="text-xs font-normal text-slate-400">On Time</span></p>
          <span className="text-[11px] text-slate-500 block">Dermaga Jetty & Crusher OK</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Budget Variance CAPEX</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">+$280,000 <span className="text-xs font-normal text-slate-400">USD</span></p>
          <span className="text-[11px] text-slate-500 block">Hemat Anggaran Kontingensi</span>
        </div>
      </div>

      {/* Module Navigation Sub-Tabs covering all 9 Project keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'project_overview', label: 'Ringkasan Proyek (Project)', icon: Briefcase },
          { id: 'task_kanban', label: 'Papan Kanban Tugas (Task/Kanban)', icon: Kanban },
          { id: 'gantt_timeline', label: 'Jadwal & Timeline (Gantt)', icon: Calendar },
          { id: 'milestones', label: 'Milestone Pencapaian', icon: Flag },
          { id: 'project_budget', label: 'Anggaran & Biaya (Budget)', icon: DollarSign },
          { id: 'issue_log', label: 'Log Isu Kendala (Issue)', icon: AlertOctagon },
          { id: 'risk_register', label: 'Register Risiko (Risk)', icon: AlertTriangle }
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

      {/* TAB 1: PROJECT OVERVIEW */}
      {activeTab === 'project_overview' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Daftar Proyek Konstruksi & Ekspansi Infrastructure Mining Site</h3>
              <button className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Proyek Baru</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projectsList.map((p) => (
                <div key={p.projId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-indigo-400">{p.projId}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {p.status}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{p.title}</strong>
                  <p className="text-slate-400 text-[11px]">Project Manager: <span className="text-slate-200 font-bold">{p.manager}</span></p>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Progres Fisik:</span>
                      <span className="text-indigo-300 font-bold font-mono">{p.progressPct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${p.progressPct}%` }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div>
                      <span className="text-slate-500 block">Anggaran (USD):</span>
                      <strong className="text-slate-200">${p.budgetUsd.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Realisasi Spent:</span>
                      <strong className="text-emerald-400">${p.spentUsd.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TASK KANBAN BOARD */}
      {activeTab === 'task_kanban' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Papan Kanban Tugas Lapangan (Task Management Board)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['TO_DO', 'IN_PROGRESS', 'DONE'].map((col) => (
                <div key={col} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-indigo-300 uppercase tracking-wider">{col.replace('_', ' ')}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold text-[10px]">
                      {kanbanTasks.filter(t => t.column === col).length} Tasks
                    </span>
                  </div>

                  <div className="space-y-2">
                    {kanbanTasks.filter(t => t.column === col).map((t) => (
                      <div key={t.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[10px] text-indigo-400 font-bold">{t.id}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            t.priority === 'HIGH' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-300'
                          }`}>
                            {t.priority}
                          </span>
                        </div>
                        <strong className="text-slate-100 block font-bold">{t.title}</strong>
                        <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                          <span>{t.category}</span>
                          <span className="text-slate-300 font-semibold">{t.assignee}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GANTT TIMELINE */}
      {activeTab === 'gantt_timeline' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Jadwal Timeline Gantt Chart Proyek Pertambangan 2026
            </h3>

            <div className="space-y-3 font-mono">
              {projectsList.map((p) => (
                <div key={p.projId} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-100">{p.title}</span>
                    <span className="text-slate-400 text-[10px]">{p.startDate} s/d {p.endDate}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800 flex items-center">
                    <div className="bg-indigo-500 h-full rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{ width: `${p.progressPct}%` }}>
                      {p.progressPct}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MILESTONES */}
      {activeTab === 'milestones' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pencapaian Milestone Kunci (Project Milestone Tracker)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Milestone ID</th>
                    <th className="py-2.5 px-3">Nama Proyek</th>
                    <th className="py-2.5 px-3">Deskripsi Target Milestone</th>
                    <th className="py-2.5 px-3">Target Tanggal</th>
                    <th className="py-2.5 px-3">Tanggal Terealisasi</th>
                    <th className="py-2.5 px-3">Status Pencapaian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {milestonesData.map((m) => (
                    <tr key={m.msId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-indigo-400">{m.msId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{m.project}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{m.title}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{m.targetDate}</td>
                      <td className="py-3 px-3 text-slate-300">{m.achievedDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {m.status}
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

      {/* TAB 5: PROJECT BUDGET */}
      {activeTab === 'project_budget' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Analisis Anggaran CAPEX vs Realisasi Biaya (Project Budget Variance)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Kategori Pos Anggaran</th>
                    <th className="py-2.5 px-3">Anggaran Alokasi (USD)</th>
                    <th className="py-2.5 px-3">Realisasi Biaya Spent (USD)</th>
                    <th className="py-2.5 px-3">Selisih Variance (USD)</th>
                    <th className="py-2.5 px-3">Status Variance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {projectBudgets.map((b, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-sans font-bold text-slate-100">{b.category}</td>
                      <td className="py-3 px-3 text-slate-300">${b.allocatedBudget.toLocaleString()}</td>
                      <td className="py-3 px-3 text-indigo-300 font-bold">${b.actualSpent.toLocaleString()}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">${b.variance.toLocaleString()}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {b.status}
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

      {/* TAB 6: ISSUE LOG */}
      {activeTab === 'issue_log' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Log Isu Kendala Lapangan & Engineering Bottleneck
            </h3>

            <div className="space-y-3">
              {projectIssues.map((iss) => (
                <div key={iss.issueId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-rose-400">{iss.issueId}</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      {iss.status}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{iss.issueTitle}</strong>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono pt-1">
                    <span>Proyek: {iss.project}</span>
                    <span>Penanggung Jawab: {iss.owner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: RISK REGISTER */}
      {activeTab === 'risk_register' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Matriks Penilaian Risiko Proyek Konstruksi (Risk Register & Mitigation Plan)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Risk ID</th>
                    <th className="py-2.5 px-3">Nama Proyek</th>
                    <th className="py-2.5 px-3">Potensi Kejadian Risiko</th>
                    <th className="py-2.5 px-3">Likelihood / Impact</th>
                    <th className="py-2.5 px-3">Rencana Mitigasi Risiko</th>
                    <th className="py-2.5 px-3">Status Mitigasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {riskRegister.map((r) => (
                    <tr key={r.riskId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-rose-400">{r.riskId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{r.project}</td>
                      <td className="py-3 px-3 font-sans text-amber-300">{r.riskEvent}</td>
                      <td className="py-3 px-3 text-slate-300">{r.likelihood} / {r.impact}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{r.mitigationPlan}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {r.status}
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
