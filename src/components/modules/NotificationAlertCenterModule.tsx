import React, { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  Send, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  AlertOctagon, 
  Settings, 
  Wifi, 
  Search, 
  Filter, 
  Plus, 
  Clock, 
  Radio, 
  ShieldAlert, 
  Bot, 
  Share2, 
  Sparkles, 
  ToggleLeft, 
  ToggleRight, 
  Layers,
  GitFork,
  CheckSquare,
  ArrowUpRight,
  ShieldCheck,
  Users,
  Calendar,
  TrendingUp,
  Trash2,
  Edit,
  Play,
  RotateCcw
} from 'lucide-react';
import { Language } from '../../types';

interface NotificationAlertCenterModuleProps {
  language: Language;
}

export const NotificationAlertCenterModule: React.FC<NotificationAlertCenterModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'workflow_builder'
    | 'approval_builder'
    | 'automation_builder'
    | 'reminders'
    | 'escalations'
    | 'sla_metrics'
    | 'realtime_alerts'
    | 'push_notification'
    | 'whatsapp_ready'
    | 'email_alerts'
    | 'sms_gateway'
    | 'telegram_bot'
    | 'in_app_notifications'
  >('workflow_builder');

  // Channel toggles state
  const [channelsEnabled, setChannelsEnabled] = useState({
    push: true,
    whatsapp: true,
    email: true,
    sms: true,
    telegram: true,
    inApp: true
  });

  const toggleChannel = (key: keyof typeof channelsEnabled) => {
    setChannelsEnabled(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // WORKFLOW BUILDER DATASET
  const [workflows, setWorkflows] = useState([
    {
      id: 'WF-101',
      name: 'Persetujuan Pengajuan RKAB ESDM & Revisi Kuota',
      category: 'COMPLIANCE',
      status: 'ACTIVE',
      trigger: 'Trigger Pengajuan RKAB Baru',
      stepsCount: 4,
      steps: [
        { stepOrder: 1, name: 'Review Kepala Teknik Tambang (KTT)', role: 'KTT Site', slaHours: 24, type: 'APPROVAL' },
        { stepOrder: 2, name: 'Validasi Kadar Ore & Lab Assay', role: 'Chief Geologist', slaHours: 12, type: 'VERIFICATION' },
        { stepOrder: 3, name: 'Otorisasi Direktur Operasional', role: 'VP Operations', slaHours: 48, type: 'APPROVAL' },
        { stepOrder: 4, name: 'Pengiriman Otomatis ke Portal ESDM', role: 'System Automation', slaHours: 1, type: 'ACTION' }
      ],
      lastExecuted: '2026-08-03 09:15',
      executionsTotal: 142
    },
    {
      id: 'WF-102',
      name: 'Procurement PO Parts & BBM Solar > Rp 500 Juta',
      category: 'FINANCE',
      status: 'ACTIVE',
      trigger: 'Nilai Requisition > Rp 500,000,000',
      stepsCount: 3,
      steps: [
        { stepOrder: 1, name: 'Verifikasi Budgeting Cost Control', role: 'Finance Manager', slaHours: 8, type: 'VERIFICATION' },
        { stepOrder: 2, name: 'Persetujuan General Manager Site', role: 'GM Site', slaHours: 24, type: 'APPROVAL' },
        { stepOrder: 3, name: 'Notifikasi WA & Auto Release PO', role: 'System Automation', slaHours: 1, type: 'ACTION' }
      ],
      lastExecuted: '2026-08-03 11:30',
      executionsTotal: 389
    },
    {
      id: 'WF-103',
      name: 'Insiden K3LH Emergency & Pelaporan Fatality / High Risk',
      category: 'HSE_SAFETY',
      status: 'ACTIVE',
      trigger: 'Laporan LTI / Near-Miss High Severity',
      stepsCount: 4,
      steps: [
        { stepOrder: 1, name: 'Broadcast WA / SMS Tim ERT & KTT', role: 'System Alert', slaHours: 0.1, type: 'ACTION' },
        { stepOrder: 2, name: 'Investigasi Lapangan Safety Officer', role: 'HSE Manager', slaHours: 4, type: 'VERIFICATION' },
        { stepOrder: 3, name: 'Persetujuan Tindakan Koreksi (CAPA)', role: 'KTT', slaHours: 12, type: 'APPROVAL' },
        { stepOrder: 4, name: 'Laporan Otomatis ke Inspector Minerba', role: 'System Dispatch', slaHours: 24, type: 'ACTION' }
      ],
      lastExecuted: '2026-08-02 16:45',
      executionsTotal: 28
    }
  ]);

  // APPROVAL BUILDER DATASET
  const [approvals, setApprovals] = useState([
    {
      id: 'APR-2026-881',
      title: 'Permohonan Pengeluaran BBM Solar 25,000 Liter (Pit Alpha Fleet)',
      requester: 'Rudi Hermawan (Logistics Manager)',
      department: 'Logistik & BBM',
      amountOrDetail: '25,000 Liters B35 Solar ($21,250 USD)',
      currentLevel: 'Level 2: GM Site Approval',
      slaMinutesLeft: 85,
      status: 'PENDING',
      levels: [
        { level: 1, approver: 'Budi Santoso (Logistics Supervisor)', status: 'APPROVED', time: '08:30 WITA' },
        { level: 2, approver: 'Ir. Bambang Wijaya (GM Site)', status: 'PENDING', time: 'Waiting' },
        { level: 3, approver: 'Hendra Tan (Finance Director)', status: 'WAITING', time: 'Waiting' }
      ]
    },
    {
      id: 'APR-2026-882',
      title: 'Revisi Target Cut-off Grade Saprolite Pit Beta (1.8% -> 1.75% Ni)',
      requester: 'Dewi Rahma (Chief Mine Geologist)',
      department: 'Exploration & Mine Plan',
      amountOrDetail: 'Penyesuaian Blending Stockpile 180,000 WMT',
      currentLevel: 'Level 1: KTT Approval',
      slaMinutesLeft: 210,
      status: 'PENDING',
      levels: [
        { level: 1, approver: 'KTT Ir. Bambang Wijaya', status: 'PENDING', time: 'Waiting' },
        { level: 2, approver: 'VP Mining Operations', status: 'WAITING', time: 'Waiting' }
      ]
    }
  ]);

  // AUTOMATION BUILDER DATASET (IFTTT)
  const [automations, setAutomations] = useState([
    {
      id: 'AUTO-01',
      name: 'Auto-Alert KTT jika Speeding Dump Truck > 60 km/h di Hauling Road',
      trigger: 'GPS Telemetry Speed > 60 km/h',
      condition: 'Durasi > 15 detik di Zona Hauling',
      action: 'Kirim WhatsApp Broadcast ke Safety Team & Log Otomatis Spoor System',
      enabled: true,
      triggerCountToday: 3
    },
    {
      id: 'AUTO-02',
      name: 'Auto-Trigger Ore Blending Recalculation jika Kadar Saprolite < 1.70% Ni',
      trigger: 'Assay Lab Result Integrated',
      condition: 'Kadar Ni Saprolite Lot < 1.70%',
      action: 'Jalankan Algorithm AI Blending Optimization di Stockpile & Notif Mine Planner',
      enabled: true,
      triggerCountToday: 1
    },
    {
      id: 'AUTO-03',
      name: 'Auto Lock Gate Timbangan jika Overload Tonase Dump Truck > 55 Ton',
      trigger: 'Weighbridge Sensor Load Cell',
      condition: 'Net Weight > 55.0 MT',
      action: 'Pintu Palang Otomatis Terkunci, Kirim Alert Ke Pos Keamanan',
      enabled: true,
      triggerCountToday: 0
    }
  ]);

  // REMINDERS DATASET
  const [reminders, setReminders] = useState([
    {
      id: 'REM-101',
      title: 'Submit Laporan Harian RKAB ESDM (Produksi & Pengapalan)',
      frequency: 'Daily (Setiap Hari Pukul 17:00 WITA)',
      recipientGroup: 'Tim KTT & Admin Compliance',
      channel: 'WhatsApp & Email',
      nextDue: 'Hari ini, 17:00 WITA',
      status: 'ACTIVE'
    },
    {
      id: 'REM-102',
      title: 'Inspeksi Kalibrasi Sensor Weighbridge & Timbangan Digital',
      frequency: 'Weekly (Setiap Hari Senin Pukul 08:00 WITA)',
      recipientGroup: 'Tim Maintenance & Metrologi',
      channel: 'In-App & WhatsApp',
      nextDue: 'Senin, 10 Aug 2026',
      status: 'ACTIVE'
    },
    {
      id: 'REM-103',
      title: 'Perpanjangan Izin Lingkungan AMDAL / PROPER Hijau',
      frequency: 'Monthly (Tanggal 1 Setiap Bulan)',
      recipientGroup: 'HSE & Legal Manager',
      channel: 'Email & Push Notification',
      nextDue: '1 Sep 2026',
      status: 'ACTIVE'
    }
  ]);

  // ESCALATION RULES DATASET
  const [escalationRules, setEscalationRules] = useState([
    {
      id: 'ESC-01',
      policyName: 'Eskalasi Insiden Safety K3LH Level Fatality / LTI',
      level1: 'Safety Inspector (SLA 5 menit)',
      level2: 'HSE Manager & KTT (SLA 15 menit)',
      level3: 'Direktur Utama & Kemen ESDM Minerba (SLA 60 menit)',
      activeIncidents: 0,
      status: 'ACTIVE'
    },
    {
      id: 'ESC-02',
      policyName: 'Eskalasi Approval PO Purchasing BBM / Sparepart Tertahan',
      level1: 'Purchasing Lead (SLA 4 Jam)',
      level2: 'Finance Manager (SLA 12 Jam)',
      level3: 'General Manager Site (SLA 24 Jam)',
      activeIncidents: 1,
      status: 'ACTIVE'
    }
  ]);

  // SLA METRICS DATASET
  const slaMetrics = {
    overallSlaCompliancePct: 98.6,
    avgResponseTimeMinutes: 14.2,
    ticketsResolvedWithinSla: 428,
    ticketsBreached: 6,
    prioritySla: [
      { priority: 'CRITICAL (Emergency / LTI)', targetSlaMin: 15, actualAvgMin: 4.5, compliancePct: 100 },
      { priority: 'HIGH (Produksi / Breakdown)', targetSlaMin: 60, actualAvgMin: 22.0, compliancePct: 97.8 },
      { priority: 'MEDIUM (Requisition / Approval)', targetSlaMin: 240, actualAvgMin: 110.0, compliancePct: 98.2 },
      { priority: 'LOW (General Inquiry)', targetSlaMin: 1440, actualAvgMin: 480.0, compliancePct: 99.1 }
    ]
  };

  // Realtime Emergency & Operational Alerts Dataset State
  const [realtimeAlerts, setRealtimeAlerts] = useState([
    { alertId: 'ALT-2026-901', source: 'IoT Sensor Settling Pond #4', severity: 'CRITICAL', title: 'Level Efluen Air Limpasan Melewati Ambang BPLH (pH 5.2)', timestamp: '2026-08-03 10:14:22', channelsDispatched: ['WhatsApp', 'Push', 'Telegram', 'In-App'], status: 'ACTIVE_DISPATCHED' },
    { alertId: 'ALT-2026-902', source: 'Geofence GPS Dump Truck DT-88', severity: 'HIGH', title: 'Unit DT-88 Keluar Koridor Hauling Pit Alpha (Speed 62 km/h)', timestamp: '2026-08-03 09:45:10', channelsDispatched: ['WhatsApp', 'SMS', 'In-App'], status: 'ACTIVE_DISPATCHED' },
    { alertId: 'ALT-2026-903', source: 'Jetty Barging Demurrage Timer', severity: 'MEDIUM', title: 'Sisa Waktu Muat Tongkang PST-08 Tinggal 2 Jam (Risiko Demurrage)', timestamp: '2026-08-03 08:30:00', channelsDispatched: ['Email', 'Telegram', 'In-App'], status: 'ACKNOWLEDGED' }
  ]);

  // Push Notification Templates & Log Dataset State
  const [pushLogs, setPushLogs] = useState([
    { id: 'PUSH-101', title: 'Inspeksi K3LH Highwall Pit Alpha', body: 'Diingatkan untuk KTT & Safety Inspector menghadiri audit K3LH pukul 14:00 WITA.', targetRole: 'KTT & Safety Officers', sentTime: '2026-08-03 08:00', status: 'DELIVERED_100%' }
  ]);

  // WhatsApp Gateway Dataset
  const [whatsappTemplates] = useState([
    { templateName: 'wa_esdm_rkab_alert', recipientGroup: 'KTT & Direksi Tambang', sampleText: 'ALERT ESDM: Laporan RKAB Harian Nikel Tanggal 2026-08-03 Telah Siap. Total Produksi: 14,250 WMT.', status: 'APPROVED_META_API' },
    { templateName: 'wa_emergency_incident', recipientGroup: 'Tim Tanggap Darurat (ERT)', sampleText: 'EMERGENCY: Terjadi penurunan stabilitas lereng di Block 4 Pit Alpha. Tim ERT mohon siaga.', status: 'APPROVED_META_API' }
  ]);

  // SMS Gateway Dataset State
  const [smsAlertsLog, setSmsAlertsLog] = useState([
    { smsId: 'SMS-8812', recipientNumber: '+628114059xxxx', content: 'URGENT SITE: Dump Truck DT-12 Overheating Engine di Kilometer 14 Hauling Road.', provider: 'Telkomsel Enterprise Gateway', status: 'DELIVERED_SENT' }
  ]);

  // Telegram Mining Bot Dataset
  const [telegramBotCmds] = useState([
    { command: '/status_pit', description: 'Menampilkan tonase produksi ore & waste per pit real-time', responseType: 'Interactive Graph & Summary' },
    { command: '/barge_queue', description: 'Cek antrean tongkang & status mooring Jetty Berth A & B', responseType: 'Live Status List' }
  ]);

  // In-App Notification Feed State
  const [inAppNotifications, setInAppNotifications] = useState([
    { notifId: 'N-001', category: 'APPROVAL', message: 'Revisi Rencana RKAB 2026 v2.1 membutuhkan persetujuan digital KTT Bambang Wijaya.', timeAgo: '5 mins ago', read: false },
    { notifId: 'N-002', category: 'QUALITY', message: 'Assay Lab Report #421 Saprolite High Grade Ni 1.92% telah terverifikasi.', timeAgo: '25 mins ago', read: false },
    { notifId: 'N-003', category: 'FINANCE', message: 'Invoice Proforma $614,250 USD PT ITSS telah diterbitkan.', timeAgo: '1 hour ago', read: true }
  ]);

  // Interactive Modals State
  const [activeNotifModal, setActiveNotifModal] = useState<'NEW_WORKFLOW' | 'NEW_AUTOMATION' | 'NEW_REMINDER' | 'DISPATCH_ALERT' | 'NEW_PUSH' | null>(null);

  // Forms
  const [workflowForm, setWorkflowForm] = useState({ name: '', category: 'COMPLIANCE', trigger: 'Pengajuan Baru' });
  const [autoForm, setAutoForm] = useState({ name: '', trigger: 'Speeding GPS', condition: 'Speed > 60 km/h', action: 'WhatsApp Alert' });
  const [reminderForm, setReminderForm] = useState({ title: '', frequency: 'Daily 08:00 WITA', recipientGroup: 'Tim KTT Site' });
  const [alertForm, setAlertForm] = useState({ source: 'IoT Sensor Site', severity: 'CRITICAL', title: 'Peringatan Darurat Stabilitas Highwall Pit' });
  const [pushForm, setPushForm] = useState({ title: '', body: '', targetRole: 'KTT & Safety Officers' });

  // Handlers
  const handleApproveRequest = (aprId: string) => {
    setApprovals(prev => prev.map(a => a.id === aprId ? { ...a, status: 'APPROVED', currentLevel: 'APPROVED ALL LEVELS' } : a));
    alert(`✓ Permohonan ${aprId} telah disetujui secara digital!`);
  };

  const handleRejectRequest = (aprId: string) => {
    setApprovals(prev => prev.map(a => a.id === aprId ? { ...a, status: 'REJECTED' } : a));
    alert(`✕ Permohonan ${aprId} telah ditolak.`);
  };

  const handleAcknowledgeAlert = (altId: string) => {
    setRealtimeAlerts(prev => prev.map(a => a.alertId === altId ? { ...a, status: 'RESOLVED_ACK' } : a));
  };

  const handleCreateWorkflow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workflowForm.name) return;
    const newWf = {
      id: `WF-10${workflows.length + 4}`,
      name: workflowForm.name,
      category: workflowForm.category,
      status: 'ACTIVE',
      trigger: workflowForm.trigger,
      stepsCount: 3,
      steps: [
        { stepOrder: 1, name: 'Review Manager', role: 'Department Manager', slaHours: 12, type: 'APPROVAL' },
        { stepOrder: 2, name: 'Otorisasi KTT', role: 'KTT Site', slaHours: 24, type: 'APPROVAL' },
        { stepOrder: 3, name: 'Auto Dispatch System', role: 'System Engine', slaHours: 1, type: 'ACTION' }
      ],
      lastExecuted: 'Baru saja',
      executionsTotal: 0
    };
    setWorkflows(prev => [newWf, ...prev]);
    setWorkflowForm({ name: '', category: 'COMPLIANCE', trigger: 'Pengajuan Baru' });
    setActiveNotifModal(null);
  };

  const handleCreateAutomation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autoForm.name) return;
    const newAuto = {
      id: `AUTO-0${automations.length + 1}`,
      name: autoForm.name,
      trigger: autoForm.trigger,
      condition: autoForm.condition,
      action: autoForm.action,
      enabled: true,
      triggerCountToday: 0
    };
    setAutomations(prev => [newAuto, ...prev]);
    setAutoForm({ name: '', trigger: 'Speeding GPS', condition: 'Speed > 60 km/h', action: 'WhatsApp Alert' });
    setActiveNotifModal(null);
  };

  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reminderForm.title) return;
    const newRem = {
      id: `REM-10${reminders.length + 4}`,
      title: reminderForm.title,
      frequency: reminderForm.frequency,
      recipientGroup: reminderForm.recipientGroup,
      channel: 'WhatsApp & Email',
      nextDue: 'Besok 08:00 WITA',
      status: 'ACTIVE'
    };
    setReminders(prev => [newRem, ...prev]);
    setReminderForm({ title: '', frequency: 'Daily 08:00 WITA', recipientGroup: 'Tim KTT Site' });
    setActiveNotifModal(null);
  };

  const handleDispatchAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertForm.title) return;
    const newAlt = {
      alertId: `ALT-2026-90${realtimeAlerts.length + 4}`,
      source: alertForm.source,
      severity: alertForm.severity,
      title: alertForm.title,
      timestamp: new Date().toISOString().substring(0, 19).replace('T', ' '),
      channelsDispatched: ['WhatsApp', 'Push', 'Telegram', 'SMS', 'In-App'],
      status: 'ACTIVE_DISPATCHED'
    };
    setRealtimeAlerts(prev => [newAlt, ...prev]);
    setAlertForm({ source: 'IoT Sensor Site', severity: 'CRITICAL', title: 'Peringatan Darurat Stabilitas Highwall Pit' });
    setActiveNotifModal(null);
    alert('🚨 Peringatan Darurat Berhasil Disebarkan ke Seluruh Saluran Omni-Channel!');
  };

  const handleSendTestPush = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pushForm.title) return;
    const newPush = {
      id: `PUSH-10${pushLogs.length + 2}`,
      title: pushForm.title,
      body: pushForm.body,
      targetRole: pushForm.targetRole,
      sentTime: 'Baru saja',
      status: 'DELIVERED_100%'
    };
    setPushLogs(prev => [newPush, ...prev]);
    setPushForm({ title: '', body: '', targetRole: 'KTT & Safety Officers' });
    setActiveNotifModal(null);
    alert('✓ Push Notification berhasil disiarkan!');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Omni-Channel Mining Notification & Emergency Dispatch Engine
            </span>
            <span className="text-slate-400 text-xs">• WhatsApp, SMS, Telegram, Push, Email & Realtime Alert</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Pusat Notifikasi Omni-Channel, WhatsApp Ready, SMS, Telegram & Peringatan Realtime
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pengiriman notifikasi terpadu: Peringatan Darurat Realtime (Realtime Alert), Push Notification Browser/App, Integrasi WhatsApp Business API, Email Otomatis, SMS Gateway Lapangan, Bot Telegram Operations & Feed Notifikasi Dalam Aplikasi (In-App).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <Bell className="w-6 h-6 text-indigo-400 shrink-0 animate-bounce" />
          <div>
            <span className="text-slate-400 text-[10px] block">Status Sistem Dispatch:</span>
            <strong className="text-emerald-400 font-mono text-base font-bold">100% Online Active</strong>
          </div>
        </div>
      </div>

      {/* Multi-Channel Active Status Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { key: 'push', name: 'Push Notif', icon: Bell, color: 'text-blue-400' },
          { key: 'whatsapp', name: 'WhatsApp Ready', icon: MessageSquare, color: 'text-emerald-400' },
          { key: 'email', name: 'Email Dispatch', icon: Mail, color: 'text-indigo-300' },
          { key: 'sms', name: 'SMS Gateway', icon: Smartphone, color: 'text-amber-300' },
          { key: 'telegram', name: 'Telegram Bot', icon: Send, color: 'text-sky-400' },
          { key: 'inApp', name: 'In-App Feed', icon: Radio, color: 'text-purple-400' }
        ].map((ch) => {
          const IconComp = ch.icon;
          const isEnabled = channelsEnabled[ch.key as keyof typeof channelsEnabled];
          return (
            <div key={ch.key} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <IconComp className={`w-4 h-4 ${ch.color}`} />
                <span className="text-xs font-bold text-slate-200">{ch.name}</span>
              </div>
              <button onClick={() => toggleChannel(ch.key as any)}>
                {isEnabled ? (
                  <ToggleRight className="w-6 h-6 text-emerald-400 cursor-pointer" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-600 cursor-pointer" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Module Sub-Tabs covering Workflow, Approval, Automation, Reminder, Escalation, SLA & Omni-Channel Notifications */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'workflow_builder', label: 'Workflow Builder', icon: GitFork },
          { id: 'approval_builder', label: 'Approval Builder', icon: CheckSquare },
          { id: 'automation_builder', label: 'Automation Builder', icon: Zap },
          { id: 'reminders', label: 'Reminder & Scheduling', icon: Clock },
          { id: 'escalations', label: 'Escalation Policy', icon: ArrowUpRight },
          { id: 'sla_metrics', label: 'SLA Metrics & Performance', icon: ShieldCheck },
          { id: 'realtime_alerts', label: 'Peringatan Darurat Realtime', icon: ShieldAlert },
          { id: 'push_notification', label: 'Push Notification App/Web', icon: Bell },
          { id: 'whatsapp_ready', label: 'WhatsApp Business Gateway', icon: MessageSquare },
          { id: 'email_alerts', label: 'Email Alerts ESDM', icon: Mail },
          { id: 'sms_gateway', label: 'SMS Gateway Lapangan', icon: Smartphone },
          { id: 'telegram_bot', label: 'Telegram Mining Bot', icon: Bot },
          { id: 'in_app_notifications', label: 'Feeds Notifikasi In-App', icon: Radio }
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

      {/* WORKFLOW BUILDER TAB */}
      {activeTab === 'workflow_builder' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <GitFork className="w-4 h-4 text-emerald-400" /> Perancang Alur Kerja Operasional & Compliance (Workflow Builder)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Konfigurasi visual alur kerja tambang: Pengajuan RKAB, Requisition PO, & Penanganan Insiden K3LH</p>
              </div>
              <button 
                onClick={() => setActiveNotifModal('NEW_WORKFLOW')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Buat Workflow Baru
              </button>
            </div>

            <div className="space-y-4">
              {workflows.map((wf) => (
                <div key={wf.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">{wf.id}</span>
                      <strong className="text-slate-100 font-sans text-sm font-bold">{wf.name}</strong>
                    </div>
                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">{wf.category}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{wf.status}</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 space-y-1">
                    <p><strong className="text-slate-400">Trigger Pemicu:</strong> <span className="text-amber-300 font-mono">{wf.trigger}</span></p>
                    <p><strong className="text-slate-400">Total Eksekusi:</strong> <span className="text-slate-100 font-mono">{wf.executionsTotal} kali</span> • Terakhir: <span className="text-slate-400 font-mono">{wf.lastExecuted}</span></p>
                  </div>

                  {/* Flow Steps Diagram */}
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-2">
                    <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Visual Workflow Node Diagram ({wf.stepsCount} Langkah):</span>
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      {wf.steps.map((st, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 flex items-center gap-2">
                            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[9px] flex items-center justify-center shrink-0">
                              {st.stepOrder}
                            </span>
                            <div>
                              <strong className="text-slate-200 block text-[10px]">{st.name}</strong>
                              <span className="text-slate-400 text-[9px]">{st.role} • SLA: {st.slaHours}h</span>
                            </div>
                          </div>
                          {sIdx < wf.steps.length - 1 && (
                            <span className="text-slate-600 font-bold">➔</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1 text-[10px]">
                    <button onClick={() => alert(`Pengujian simulasi workflow ${wf.id} berhasil!`)} className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center gap-1">
                      <Play className="w-3 h-3 text-emerald-400" /> Uji Simulasi
                    </button>
                    <button onClick={() => alert(`Membuka editor node ${wf.id}`)} className="px-2.5 py-1 rounded bg-indigo-600/80 text-white flex items-center gap-1">
                      <Edit className="w-3 h-3" /> Edit Node
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* APPROVAL BUILDER TAB */}
      {activeTab === 'approval_builder' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-400" /> Matriks Otorisasi & Persetujuan Berjenjang (Approval Builder)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Pengaturan persetujuan multi-level untuk Requisition, Anggaran, & Dokumen Operasional</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                2 Persetujuan Pending
              </span>
            </div>

            <div className="space-y-3 font-mono">
              {approvals.map((apr) => (
                <div key={apr.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div>
                      <span className="text-indigo-400 font-bold">{apr.id} • {apr.department}</span>
                      <strong className="text-slate-100 font-sans text-sm font-bold block">{apr.title}</strong>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                      SLA: {apr.slaMinutesLeft} Menit Tersisa
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-sans text-slate-300">
                    <p><strong className="text-slate-400">Pemohon (Requester):</strong> {apr.requester}</p>
                    <p><strong className="text-slate-400">Detail / Nilai:</strong> <span className="text-amber-300 font-mono font-bold">{apr.amountOrDetail}</span></p>
                  </div>

                  {/* Multi-Level Approver Hierarchy */}
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2 font-sans">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Hirarki Level Persetujuan:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px]">
                      {apr.levels.map((lvl) => (
                        <div key={lvl.level} className={`p-2 rounded-lg border ${
                          lvl.status === 'APPROVED' ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' :
                          lvl.status === 'PENDING' ? 'bg-amber-950/40 border-amber-500/40 text-amber-300 font-bold animate-pulse' :
                          'bg-slate-950 border-slate-800 text-slate-500'
                        }`}>
                          <span className="block font-mono text-[9px]">Level {lvl.level}: {lvl.status}</span>
                          <strong className="text-slate-200 block truncate">{lvl.approver}</strong>
                          <span className="text-[9px] opacity-80">{lvl.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end items-center gap-2 pt-1 font-sans">
                    <button 
                      onClick={() => {
                        setApprovals(prev => prev.map(a => a.id === apr.id ? { ...a, status: 'APPROVED' } : a));
                        alert(`Approval ${apr.id} telah disetujui secara digital!`);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 transition-all"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Disetujui (Approve)
                    </button>
                    <button 
                      onClick={() => alert(`Approval ${apr.id} ditolak.`)}
                      className="px-3 py-1.5 rounded-lg bg-rose-900/80 hover:bg-rose-800 text-rose-200 font-bold flex items-center gap-1 transition-all"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> Tolak (Reject)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AUTOMATION BUILDER TAB (IFTTT) */}
      {activeTab === 'automation_builder' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-300" /> Engine Otomatisasi Terpemicu (Automation Builder - IFTTT)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Aturan otomatisasi logika "Jika Terjadi X, Maka Eksekusi Y" untuk sensor & IoT site</p>
              </div>
              <button 
                onClick={() => setActiveNotifModal('NEW_AUTOMATION')}
                className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Aturan Otomatis
              </button>
            </div>

            <div className="space-y-3 font-mono">
              {automations.map((auto) => (
                <div key={auto.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-amber-300 font-bold">{auto.id} • {auto.name}</span>
                    <button 
                      onClick={() => setAutomations(prev => prev.map(a => a.id === auto.id ? { ...a, enabled: !a.enabled } : a))}
                      className="flex items-center gap-1"
                    >
                      {auto.enabled ? (
                        <ToggleRight className="w-6 h-6 text-emerald-400 cursor-pointer" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-slate-600 cursor-pointer" />
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-sans">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-mono text-[9px] block">IF (TRIGGER):</span>
                      <strong className="text-indigo-300">{auto.trigger}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-mono text-[9px] block">AND (CONDITION):</span>
                      <strong className="text-amber-300">{auto.condition}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-mono text-[9px] block">THEN (ACTION):</span>
                      <strong className="text-emerald-300">{auto.action}</strong>
                    </div>
                  </div>

                  <span className="text-slate-500 text-[10px] block pt-1">
                    Dipemicu Hari Ini: <strong className="text-slate-200">{auto.triggerCountToday} kali</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REMINDERS TAB */}
      {activeTab === 'reminders' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" /> Pengingat & Jadwal compliance Berkala (Reminder Engine)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Penjadwalan pengingat otomatis untuk laporan RKAB, kalibrasi sensor, & lisensi</p>
              </div>
              <button 
                onClick={() => setActiveNotifModal('NEW_REMINDER')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Buat Pengingat
              </button>
            </div>

            <div className="space-y-3 font-mono">
              {reminders.map((rem) => (
                <div key={rem.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-bold">{rem.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      Jatuh Tempo: {rem.nextDue}
                    </span>
                  </div>
                  <strong className="text-slate-100 font-sans text-sm font-bold block">{rem.title}</strong>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 font-sans pt-1 border-t border-slate-800">
                    <span>Frekuensi: <strong className="text-amber-300 font-mono">{rem.frequency}</strong></span>
                    <span>Penerima: <strong className="text-slate-200">{rem.recipientGroup}</strong></span>
                    <span>Saluran: <strong className="text-indigo-300">{rem.channel}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ESCALATIONS TAB */}
      {activeTab === 'escalations' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4 text-rose-400" /> Kebijakan Eskalasi Insiden Berjenjang (Escalation Policy)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Aturan penanganan otomatis jika laporan atau approval tidak ditanggapi dalam kurun waktu SLA</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-mono font-bold">
                1 Insiden Ter-eskalasi Active
              </span>
            </div>

            <div className="space-y-3 font-mono">
              {escalationRules.map((esc) => (
                <div key={esc.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-rose-400 font-bold">{esc.id} • {esc.policyName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {esc.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[10px] font-sans">
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-mono text-[9px] block">TIER 1 (Awal):</span>
                      <strong className="text-slate-200">{esc.level1}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-mono text-[9px] block">TIER 2 (Eskalasi 1):</span>
                      <strong className="text-amber-300">{esc.level2}</strong>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-mono text-[9px] block">TIER 3 (Eskalasi Puncak):</span>
                      <strong className="text-rose-300">{esc.level3}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SLA METRICS TAB */}
      {activeTab === 'sla_metrics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Analitik Kepatuhan SLA & Waktu Respon (SLA Performance)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Monitoring pencapaian Service Level Agreement (SLA) penanganan tiket & approval site</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                SLA Compliance: {slaMetrics.overallSlaCompliancePct}%
              </span>
            </div>

            {/* SLA Key Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Tingkat Kepatuhan SLA</span>
                <span className="text-3xl font-extrabold text-emerald-400 block">{slaMetrics.overallSlaCompliancePct}%</span>
                <span className="text-emerald-400 text-[10px]">▲ +1.2% vs Target 95%</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Rata-Rata Waktu Respon</span>
                <span className="text-3xl font-extrabold text-indigo-300 block">{slaMetrics.avgResponseTimeMinutes} min</span>
                <span className="text-slate-400 text-[10px]">Tepat Waktu Cepat</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Selesai Dalam SLA</span>
                <span className="text-3xl font-extrabold text-slate-100 block">{slaMetrics.ticketsResolvedWithinSla}</span>
                <span className="text-slate-400 text-[10px]">Tiket & Approval</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">SLA Breached (Terlewat)</span>
                <span className="text-3xl font-extrabold text-rose-400 block">{slaMetrics.ticketsBreached}</span>
                <span className="text-rose-400 text-[10px]">Ter-eskalasi Otomatis</span>
              </div>
            </div>

            {/* SLA Matrix Table */}
            <div className="space-y-2 pt-2">
              <h4 className="font-bold text-slate-200 text-xs">Pencapaian SLA Berdasarkan Tingkat Prioritas Tiket:</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-[11px]">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">PRIORITAS TIKET</th>
                      <th className="p-2.5">TARGET SLA</th>
                      <th className="p-2.5">AKTUAL RATA-RATA</th>
                      <th className="p-2.5">PERSENTASE KEPATUHAN</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {slaMetrics.prioritySla.map((p, idx) => (
                      <tr key={idx} className="hover:bg-slate-950/50">
                        <td className="p-2.5 text-slate-100 font-bold">{p.priority}</td>
                        <td className="p-2.5 text-amber-300">{p.targetSlaMin} Menit</td>
                        <td className="p-2.5 text-indigo-300">{p.actualAvgMin} Menit</td>
                        <td className="p-2.5 text-emerald-400 font-bold">{p.compliancePct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: REALTIME ALERTS */}
      {activeTab === 'realtime_alerts' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">
                  Pusat Kendali Peringatan Dini Operasional & K3LH Realtime (Realtime Alert Dispatcher)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Sistem pengiriman peringatan darurat otomatis multi-saluran</p>
              </div>
              <button 
                onClick={() => setActiveNotifModal('DISPATCH_ALERT')}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <AlertTriangle className="w-3.5 h-3.5" /> Sebar Alert Darurat Baru
              </button>
            </div>

            <div className="space-y-3 font-mono">
              {realtimeAlerts.map((alt) => (
                <div key={alt.alertId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-rose-400">{alt.alertId} • {alt.source}</span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        alt.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {alt.severity} SEVERITY
                      </span>
                      {alt.status === 'ACTIVE_DISPATCHED' ? (
                        <button 
                          onClick={() => handleAcknowledgeAlert(alt.alertId)}
                          className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 text-[10px] font-bold border border-amber-500/30"
                        >
                          Konfirmasi (Ack)
                        </button>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          TERKONFIRMASI
                        </span>
                      )}
                    </div>
                  </div>

                  <strong className="text-slate-100 font-sans text-sm block font-bold">{alt.title}</strong>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-[10px]">
                    <span className="text-slate-400">Saluran Terkirim: <span className="text-indigo-300 font-bold">{alt.channelsDispatched.join(', ')}</span></span>
                    <span className="text-slate-500">{alt.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PUSH NOTIFICATION */}
      {activeTab === 'push_notification' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">
                  Layanan Push Notification Perangkat Seluler & Browser
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Penyiaran pesan langsung ke perangkat seluler seluruh kru site</p>
              </div>
              <button 
                onClick={() => setActiveNotifModal('NEW_PUSH')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Plus className="w-3.5 h-3.5" /> Kirim Push Broadcast
              </button>
            </div>

            <div className="space-y-3">
              {pushLogs.map((p) => (
                <div key={p.id} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-indigo-400 font-bold">{p.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                      {p.status}
                    </span>
                  </div>
                  <strong className="text-slate-100 text-sm font-bold block">{p.title}</strong>
                  <p className="text-slate-300 text-[11px]">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WHATSAPP READY */}
      {activeTab === 'whatsapp_ready' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Integrasi WhatsApp Business API Gateway Ready (WhatsApp Broadcast)
            </h3>

            <div className="space-y-3 font-mono">
              {whatsappTemplates.map((wa, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-emerald-400 font-bold">Template: {wa.templateName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {wa.status}
                    </span>
                  </div>
                  <strong className="text-slate-300 font-sans block text-xs">Penerima: {wa.recipientGroup}</strong>
                  <div className="p-3 bg-slate-900 rounded-lg text-slate-200 text-[11px] italic">
                    "{wa.sampleText}"
                  </div>
                  <div className="flex justify-end pt-1">
                    <button 
                      onClick={() => alert(`✓ WhatsApp Broadcast "${wa.templateName}" berhasil disimulasikan terkirim ke ${wa.recipientGroup}!`)}
                      className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-sans text-[10px] font-bold flex items-center gap-1"
                    >
                      <Send className="w-3 h-3" /> Uji Kirim Broadcast
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EMAIL ALERTS */}
      {activeTab === 'email_alerts' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Laporan Email Otomatis ESDM & Management Summaries
            </h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono">
              <span className="text-indigo-400 font-bold block">Status Gateway Email SMTP: CONNECTED</span>
              <p className="text-slate-300 font-sans text-xs">
                Pengiriman laporan berkala harian, mingguan, dan bulanan melalui Email server terenkripsi SSL/TLS.
              </p>
              <div className="pt-2">
                <button 
                  onClick={() => alert('✓ Email Ringkasan Manajemen ESDM disimulasikan terkirim!')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs"
                >
                  Kirim Email Ringkasan Hari Ini
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SMS GATEWAY */}
      {activeTab === 'sms_gateway' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              SMS Gateway Darurat Lapangan Tambang (Offline Critical SMS)
            </h3>

            <div className="space-y-3 font-mono">
              {smsAlertsLog.map((s) => (
                <div key={s.smsId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-300 font-bold">{s.smsId} • {s.recipientNumber}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {s.status}
                    </span>
                  </div>
                  <p className="text-slate-200 font-sans text-xs">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TELEGRAM BOT */}
      {activeTab === 'telegram_bot' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Bot Telegram Operasional Tambang & Perintah Interaktif (@NikelMineOpsBot)
            </h3>

            <div className="space-y-3 font-mono">
              {telegramBotCmds.map((cmd, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sky-400 font-bold text-sm block">{cmd.command}</span>
                    <button 
                      onClick={() => alert(`Simulasi Bot Telegram Command ${cmd.command}: Response dikirim ke chat Telegram!`)}
                      className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-sans text-[10px] font-bold"
                    >
                      Uji Perintah
                    </button>
                  </div>
                  <p className="text-slate-300 font-sans text-xs">{cmd.description}</p>
                  <span className="text-slate-500 text-[10px] block">Output: {cmd.responseType}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: IN-APP NOTIFICATIONS */}
      {activeTab === 'in_app_notifications' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Feed Notifikasi Dalam Aplikasi (In-App Activity Notifications)
              </h3>
              <button 
                onClick={() => setInAppNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Tandai Semua Dibaca
              </button>
            </div>

            <div className="space-y-3">
              {inAppNotifications.map((n) => (
                <div key={n.notifId} className={`p-4 rounded-xl border flex justify-between items-center ${
                  n.read ? 'bg-slate-950 border-slate-800/80 text-slate-400' : 'bg-slate-900 border-indigo-500/40 text-slate-100 font-bold'
                }`}>
                  <div>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] mr-2">
                      {n.category}
                    </span>
                    <span>{n.message}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-4">{n.timeAgo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NEW WORKFLOW */}
      {activeNotifModal === 'NEW_WORKFLOW' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <GitFork className="w-4 h-4 text-emerald-400" /> Buat Workflow Operasional Baru
              </h3>
              <button onClick={() => setActiveNotifModal(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateWorkflow} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Nama Workflow</label>
                <input 
                  type="text" 
                  value={workflowForm.name} 
                  onChange={e => setWorkflowForm({ ...workflowForm, name: e.target.value })}
                  placeholder="mis. Workflow Pengajuan RKAB ESDM" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Kategori</label>
                  <select 
                    value={workflowForm.category}
                    onChange={e => setWorkflowForm({ ...workflowForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="COMPLIANCE">COMPLIANCE</option>
                    <option value="SAFETY">SAFETY K3LH</option>
                    <option value="PROCUREMENT">PROCUREMENT</option>
                    <option value="PRODUCTION">PRODUCTION</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Pemicu (Trigger)</label>
                  <input 
                    type="text" 
                    value={workflowForm.trigger} 
                    onChange={e => setWorkflowForm({ ...workflowForm, trigger: e.target.value })}
                    placeholder="mis. Submit Dokumen" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setActiveNotifModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold">Simpan Workflow</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW AUTOMATION */}
      {activeNotifModal === 'NEW_AUTOMATION' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-300" /> Tambah Aturan Otomatisasi (IFTTT)
              </h3>
              <button onClick={() => setActiveNotifModal(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateAutomation} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Nama Aturan</label>
                <input 
                  type="text" 
                  value={autoForm.name} 
                  onChange={e => setAutoForm({ ...autoForm, name: e.target.value })}
                  placeholder="mis. Peringatan Kecepatan Hauling Road" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">IF (Trigger Pemicu Sensor/Sistem)</label>
                <input 
                  type="text" 
                  value={autoForm.trigger} 
                  onChange={e => setAutoForm({ ...autoForm, trigger: e.target.value })}
                  placeholder="mis. Speeding Telematics GPS" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">AND (Kondisi Ambang Batas)</label>
                <input 
                  type="text" 
                  value={autoForm.condition} 
                  onChange={e => setAutoForm({ ...autoForm, condition: e.target.value })}
                  placeholder="mis. Speed > 60 km/h selama > 30 detik" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">THEN (Tindakan Eksekusi Otomatis)</label>
                <input 
                  type="text" 
                  value={autoForm.action} 
                  onChange={e => setAutoForm({ ...autoForm, action: e.target.value })}
                  placeholder="mis. WhatsApp Alert ke Pengawas Pit" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setActiveNotifModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold">Simpan Aturan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW REMINDER */}
      {activeNotifModal === 'NEW_REMINDER' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" /> Buat Jadwal Pengingat Compliance
              </h3>
              <button onClick={() => setActiveNotifModal(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <form onSubmit={handleCreateReminder} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Judul Pengingat</label>
                <input 
                  type="text" 
                  value={reminderForm.title} 
                  onChange={e => setReminderForm({ ...reminderForm, title: e.target.value })}
                  placeholder="mis. Pengingat Kalibrasi Timbangan Pit Alpha" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Frekuensi Penjadwalan</label>
                  <input 
                    type="text" 
                    value={reminderForm.frequency} 
                    onChange={e => setReminderForm({ ...reminderForm, frequency: e.target.value })}
                    placeholder="mis. Harian 08:00 WITA" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Grup Penerima</label>
                  <input 
                    type="text" 
                    value={reminderForm.recipientGroup} 
                    onChange={e => setReminderForm({ ...reminderForm, recipientGroup: e.target.value })}
                    placeholder="mis. Tim KTT & Chief Lab" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setActiveNotifModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold">Buat Pengingat</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DISPATCH ALERT */}
      {activeNotifModal === 'DISPATCH_ALERT' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" /> Kirim Peringatan Darurat Realtime
              </h3>
              <button onClick={() => setActiveNotifModal(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <form onSubmit={handleDispatchAlert} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Judul / Deskripsi Peringatan</label>
                <input 
                  type="text" 
                  value={alertForm.title} 
                  onChange={e => setAlertForm({ ...alertForm, title: e.target.value })}
                  placeholder="mis. Penurunan Stabilitas Lereng Pit Alpha Block 4" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Sumber Alert</label>
                  <input 
                    type="text" 
                    value={alertForm.source} 
                    onChange={e => setAlertForm({ ...alertForm, source: e.target.value })}
                    placeholder="mis. Radar Geoteknik Highwall" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Tingkat Keparahan (Severity)</label>
                  <select 
                    value={alertForm.severity}
                    onChange={e => setAlertForm({ ...alertForm, severity: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-rose-500"
                  >
                    <option value="CRITICAL">CRITICAL (Emergency)</option>
                    <option value="HIGH">HIGH (Warning)</option>
                    <option value="MEDIUM">MEDIUM (Caution)</option>
                  </select>
                </div>
              </div>
              <p className="text-rose-400 text-[10px] italic bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/30">
                ⚠️ Peringatan ini akan disiarkan secara instant via WhatsApp, Push Notification, Telegram Bot, SMS Gateway, & In-App Feed.
              </p>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setActiveNotifModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold">Sebarkan Peringatan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: NEW PUSH */}
      {activeNotifModal === 'NEW_PUSH' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-400" /> Broadcast Push Notification Baru
              </h3>
              <button onClick={() => setActiveNotifModal(null)} className="text-slate-400 hover:text-white font-bold">✕</button>
            </div>
            <form onSubmit={handleSendTestPush} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Judul Notifikasi</label>
                <input 
                  type="text" 
                  value={pushForm.title} 
                  onChange={e => setPushForm({ ...pushForm, title: e.target.value })}
                  placeholder="mis. Safety Talk Mingguan K3LH" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Isi Pesan Notification</label>
                <textarea 
                  rows={3}
                  value={pushForm.body} 
                  onChange={e => setPushForm({ ...pushForm, body: e.target.value })}
                  placeholder="Tuliskan detail pesan..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Target Peran User</label>
                <input 
                  type="text" 
                  value={pushForm.targetRole} 
                  onChange={e => setPushForm({ ...pushForm, targetRole: e.target.value })}
                  placeholder="mis. KTT & Safety Officers" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setActiveNotifModal(null)} className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold">Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold">Kirim Push Notification</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
