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
  Layers 
} from 'lucide-react';
import { Language } from '../../types';

interface NotificationAlertCenterModuleProps {
  language: Language;
}

export const NotificationAlertCenterModule: React.FC<NotificationAlertCenterModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'realtime_alerts'
    | 'push_notification'
    | 'whatsapp_ready'
    | 'email_alerts'
    | 'sms_gateway'
    | 'telegram_bot'
    | 'in_app_notifications'
  >('realtime_alerts');

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

  // Realtime Emergency & Operational Alerts Dataset
  const realtimeAlerts = [
    { alertId: 'ALT-2026-901', source: 'IoT Sensor Settling Pond #4', severity: 'CRITICAL', title: 'Level Efluen Air Limpasan Melewati Ambang BPLH (pH 5.2)', timestamp: '2026-08-03 10:14:22', channelsDispatched: ['WhatsApp', 'Push', 'Telegram', 'In-App'], status: 'ACTIVE_DISPATCHED' },
    { alertId: 'ALT-2026-902', source: 'Geofence GPS Dump Truck DT-88', severity: 'HIGH', title: 'Unit DT-88 Keluar Koridor Hauling Pit Alpha (Speed 62 km/h)', timestamp: '2026-08-03 09:45:10', channelsDispatched: ['WhatsApp', 'SMS', 'In-App'], status: 'ACTIVE_DISPATCHED' },
    { alertId: 'ALT-2026-903', source: 'Jetty Barging Demurrage Timer', severity: 'MEDIUM', title: 'Sisa Waktu Muat Tongkang PST-08 Tinggal 2 Jam (Risiko Demurrage)', timestamp: '2026-08-03 08:30:00', channelsDispatched: ['Email', 'Telegram', 'In-App'], status: 'ACKNOWLEDGED' }
  ];

  // Push Notification Templates & Log Dataset
  const pushLogs = [
    { id: 'PUSH-101', title: 'Inspeksi K3LH Highwall Pit Alpha', body: 'Diingatkan untuk KTT & Safety Inspector menghadiri audit K3LH pukul 14:00 WITA.', targetRole: 'KTT & Safety Officers', sentTime: '2026-08-03 08:00', status: 'DELIVERED_100%' }
  ];

  // WhatsApp Gateway Dataset
  const whatsappTemplates = [
    { templateName: 'wa_esdm_rkab_alert', recipientGroup: 'KTT & Direksi Tambang', sampleText: 'ALERT ESDM: Laporan RKAB Harian Nikel Tanggal 2026-08-03 Telah Siap. Total Produksi: 14,250 WMT.', status: 'APPROVED_META_API' },
    { templateName: 'wa_emergency_incident', recipientGroup: 'Tim Tanggap Darurat (ERT)', sampleText: 'EMERGENCY: Terjadi penurunan stabilitas lereng di Block 4 Pit Alpha. Tim ERT mohon siaga.', status: 'APPROVED_META_API' }
  ];

  // SMS Gateway Dataset
  const smsAlertsLog = [
    { smsId: 'SMS-8812', recipientNumber: '+628114059xxxx', content: 'URGENT SITE: Dump Truck DT-12 Overheating Engine di Kilometer 14 Hauling Road.', provider: 'Telkomsel Enterprise Gateway', status: 'DELIVERED_SENT' }
  ];

  // Telegram Mining Bot Dataset
  const telegramBotCmds = [
    { command: '/status_pit', description: 'Menampilkan tonase produksi ore & waste per pit real-time', responseType: 'Interactive Graph & Summary' },
    { command: '/barge_queue', description: 'Cek antrean tongkang & status mooring Jetty Berth A & B', responseType: 'Live Status List' }
  ];

  // In-App Notification Feed
  const inAppNotifications = [
    { notifId: 'N-001', category: 'APPROVAL', message: 'Revisi Rencana RKAB 2026 v2.1 membutuhkan persetujuan digital KTT Bambang Wijaya.', timeAgo: '5 mins ago', read: false },
    { notifId: 'N-002', category: 'QUALITY', message: 'Assay Lab Report #421 Saprolite High Grade Ni 1.92% telah terverifikasi.', timeAgo: '25 mins ago', read: false },
    { notifId: 'N-003', category: 'FINANCE', message: 'Invoice Proforma $614,250 USD PT ITSS telah diterbitkan.', timeAgo: '1 hour ago', read: true }
  ];

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

      {/* Module Sub-Tabs covering all 8 Notification keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'realtime_alerts', label: 'Peringatan Darurat Realtime (Realtime Alert)', icon: ShieldAlert },
          { id: 'push_notification', label: 'Push Notification App/Web', icon: Bell },
          { id: 'whatsapp_ready', label: 'WhatsApp Business Gateway (WhatsApp Ready)', icon: MessageSquare },
          { id: 'email_alerts', label: 'Email Alerts ESDM', icon: Mail },
          { id: 'sms_gateway', label: 'SMS Gateway Lapangan Offline', icon: Smartphone },
          { id: 'telegram_bot', label: 'Telegram Mining Bot', icon: Bot },
          { id: 'in_app_notifications', label: 'Feeds Notifikasi (In-App Notification)', icon: Radio }
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

      {/* TAB 1: REALTIME ALERTS */}
      {activeTab === 'realtime_alerts' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pusat Kendali Peringatan Dini Operasional & K3LH Realtime (Realtime Alert Dispatcher)
            </h3>

            <div className="space-y-3 font-mono">
              {realtimeAlerts.map((alt) => (
                <div key={alt.alertId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-rose-400">{alt.alertId} • {alt.source}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      alt.severity === 'CRITICAL' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {alt.severity} SEVERITY
                    </span>
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
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Layanan Push Notification Perangkat Seluler & Browser
            </h3>

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
                  <span className="text-sky-400 font-bold text-sm block">{cmd.command}</span>
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
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Feed Notifikasi Dalam Aplikasi (In-App Activity Notifications)
            </h3>

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

    </div>
  );
};
