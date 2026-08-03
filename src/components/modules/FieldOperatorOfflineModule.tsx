import React, { useState, useEffect } from 'react';
import { Smartphone, Wifi, WifiOff, RefreshCw, CheckCircle2, Clock, Plus, Database, Send } from 'lucide-react';
import { OfflineSyncItem, Language } from '../../types';
import { getOfflineQueue, addOfflineItem, saveOfflineQueue, clearSyncedOfflineItems } from '../../utils/offlineStorage';

interface FieldOperatorOfflineModuleProps {
  isOnline: boolean;
  onToggleOnlineStatus: () => void;
  language: Language;
}

export const FieldOperatorOfflineModule: React.FC<FieldOperatorOfflineModuleProps> = ({
  isOnline,
  onToggleOnlineStatus,
  language
}) => {
  const [queue, setQueue] = useState<OfflineSyncItem[]>([]);
  const [dumpTruckCode, setDumpTruckCode] = useState('DT-CAT777-04');
  const [tripsCount, setTripsCount] = useState(12);
  const [pitLocation, setPitLocation] = useState('Pit Alpha Utamaro');
  const [oreType, setOreType] = useState('Saprolite High Grade');

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);

  useEffect(() => {
    setQueue(getOfflineQueue());
  }, []);

  const handleAddHaulageEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const item = addOfflineItem('FLEET_HAULAGE', 'RECORD_TRIPS', {
      dumpTruckCode,
      tripsCount,
      pitLocation,
      oreType,
      operator: 'Field Operator Site A'
    });

    setQueue(getOfflineQueue());
    setSyncNotice(`Data Ritase Truck (${dumpTruckCode}: ${tripsCount} Rit) tersimpan di memori offline lokal.`);
    setTimeout(() => setSyncNotice(null), 3000);
  };

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      const updated = queue.map(i => ({ ...i, status: 'SYNCED' as const }));
      saveOfflineQueue(updated);
      setQueue(updated);
      setIsSyncing(false);
      setSyncNotice("Seluruh data offline berhasil tersinkronisasi otomatis ke Database Pusat!");
      setTimeout(() => setSyncNotice(null), 4000);
    }, 1500);
  };

  const handleClearSynced = () => {
    clearSyncedOfflineItems();
    setQueue(getOfflineQueue());
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
              isOnline ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
            }`}>
              {isOnline ? 'Status: ONLINE CENTRAL' : 'Status: OFFLINE MODE ACTIVE'}
            </span>
            <span className="text-slate-400 text-xs">• Native Field Touch Controls</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Mode Operator Lapangan Offline & Queue Sync' : 'Field Operator Offline Mode & Auto Sync'}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleOnlineStatus}
            className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              isOnline ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-amber-950 border-amber-700 text-amber-300'
            }`}
          >
            {isOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-amber-400" />}
            <span>{isOnline ? 'Simulasikan Putus Koneksi (Offline)' : 'Simulasikan Terhubung (Online)'}</span>
          </button>
        </div>
      </div>

      {syncNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{syncNotice}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Touch Form */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Form Cepat Operator Front Pit (Simpan Lokal)</span>
          </h3>

          <form onSubmit={handleAddHaulageEntry} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Kode Dump Truck:</label>
              <select
                value={dumpTruckCode}
                onChange={(e) => setDumpTruckCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 font-mono"
              >
                <option value="DT-CAT777-04">DT-CAT777-04 (Caterpillar 777D)</option>
                <option value="DT-SCANIA-12">DT-SCANIA-12 (Scania P410)</option>
                <option value="DT-VOLVO-08">DT-VOLVO-08 (Volvo FMX 440)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Jumlah Ritase (Trips):</label>
              <input
                type="number"
                value={tripsCount}
                onChange={(e) => setTripsCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100 font-mono text-sm font-bold"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Lokasi Pit Pengambilan:</label>
              <input
                type="text"
                value={pitLocation}
                onChange={(e) => setPitLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Jenis Ore Nikel:</label>
              <select
                value={oreType}
                onChange={(e) => setOreType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-100"
              >
                <option value="Saprolite High Grade">Saprolite High Grade (Ni ≥ 1.8%)</option>
                <option value="Saprolite Mid Grade">Saprolite Mid Grade (Ni 1.5-1.79%)</option>
                <option value="Limonite HPAL Feed">Limonite HPAL Feed (&lt;1.5% Ni)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Input Ritase (Antrian Offline)</span>
            </button>
          </form>
        </div>

        {/* Offline Queue Log */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-slate-100 text-sm">Antrian Data LocalStorage Offline ({queue.length})</h3>
              </div>
              {queue.length > 0 && (
                <button
                  onClick={handleClearSynced}
                  className="text-xs text-slate-400 hover:text-rose-400"
                >
                  Bersihkan Antrian Ter-Sync
                </button>
              )}
            </div>

            {queue.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                Antrian offline kosong. Data terkirim secara instan saat online.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[350px] overflow-y-auto custom-scrollbar">
                {queue.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200">{item.action} ({item.payload?.dumpTruckCode})</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        item.status === 'SYNCED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Ritase: {item.payload?.tripsCount} Rit | Lokasi: {item.payload?.pitLocation} | Jenis: {item.payload?.oreType}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">{item.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleTriggerSync}
            disabled={isSyncing || queue.length === 0}
            className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSyncing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>Sinkronkan {queue.filter(q => q.status === 'QUEUED').length} Data ke Server Central</span>
          </button>
        </div>

      </div>

    </div>
  );
};
