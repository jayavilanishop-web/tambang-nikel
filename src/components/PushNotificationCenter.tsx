import React from 'react';
import { Bell, ShieldAlert, CheckCircle2, TrendingUp, X, Check, Trash2 } from 'lucide-react';
import { PushNotification, Language } from '../types';

interface PushNotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: PushNotification[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  language: Language;
}

export const PushNotificationCenter: React.FC<PushNotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-sm bg-slate-900 border-l border-slate-700 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-slate-100 text-sm">
              {language === 'id' ? 'Notifikasi Peringatan System' : 'Real-Time System Alerts'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions Bar */}
        <div className="px-4 py-2 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={onMarkAllAsRead}
            className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Tandai Semua Dibaca</span>
          </button>
          <button
            onClick={onClearNotifications}
            className="text-slate-400 hover:text-rose-400 flex items-center gap-1 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Bersihkan</span>
          </button>
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5 custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              <CheckCircle2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p>Tidak ada notifikasi sistem baru.</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const isUrgent = notif.priority === 'URGENT';
              return (
                <div
                  key={notif.id}
                  className={`p-3 rounded-xl border text-xs transition-all ${
                    !notif.read ? 'bg-slate-800/90 border-slate-700 shadow-sm' : 'bg-slate-950/40 border-slate-800/80 opacity-75'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      {notif.category === 'SAFETY' && <ShieldAlert className="w-4 h-4 text-rose-400" />}
                      {notif.category === 'HPM' && <TrendingUp className="w-4 h-4 text-amber-400" />}
                      {notif.category === 'OPERATIONS' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      <span className={isUrgent ? 'text-rose-300' : 'text-slate-200'}>
                        {notif.title}
                      </span>
                    </div>
                    {isUrgent && (
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[9px] font-extrabold uppercase">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed mb-2">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono">{notif.time}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[11px] text-slate-500">
          SmartMine AI WebSocket Real-time Connector v2.5
        </div>

      </div>
    </div>
  );
};
