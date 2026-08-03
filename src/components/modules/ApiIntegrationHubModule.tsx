import React, { useState } from 'react';
import { Webhook, KeyRound, CheckCircle2, RefreshCw, Copy, Check, Plus, Server } from 'lucide-react';
import { APIToken, Language } from '../../types';

interface ApiIntegrationHubModuleProps {
  apiTokens: APIToken[];
  language: Language;
  onAddToken: (token: APIToken) => void;
}

export const ApiIntegrationHubModule: React.FC<ApiIntegrationHubModuleProps> = ({
  apiTokens,
  language,
  onAddToken
}) => {
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);
  const [newTokenName, setNewTokenName] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleTestEndpoint = async (url: string) => {
    setIsTesting(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setTestResult({ url, data });
    } catch (err) {
      console.error("API Test Error:", err);
    } finally {
      setIsTesting(false);
    }
  };

  const handleCreateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTokenName.trim()) return;

    const newToken: APIToken = {
      id: `TOK-${Date.now()}`,
      name: newTokenName,
      keySnippet: `sm_live_${Math.random().toString(36).substring(2, 10)}****************`,
      rolePermissions: ['inventory.read', 'stockpile.read'],
      createdDate: new Date().toISOString().split('T')[0],
      lastUsedDate: 'Belum Pernah',
      status: 'ACTIVE'
    };

    onAddToken(newToken);
    setShowAddModal(false);
    setNewTokenName('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Integrasi Enterprise API
            </span>
            <span className="text-slate-400 text-xs">• REST JSON & Webhooks Sync Connector</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Pusat Integrasi API Hub & Third-Party System' : 'Enterprise API Hub & Third-Party Connectors'}
          </h2>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat API Key Baru</span>
        </button>
      </div>

      {/* Preset API Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-100 text-xs">SAP S/4HANA Inventory API</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">ONLINE</span>
          </div>
          <p className="text-slate-400 text-xs">Sinkronisasi stok BBM, suku cadang alat berat, dan inventaris gudang site.</p>
          <button
            onClick={() => handleTestEndpoint('/api/v1/inventory/sync')}
            disabled={isTesting}
            className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Server className="w-3.5 h-3.5" />
            <span>Tes Endpoint SAP (/api/v1/inventory)</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-100 text-xs">Sucofindo / Carsurin COA Webhook</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">ONLINE</span>
          </div>
          <p className="text-slate-400 text-xs">Penerimaan sertifikat kadar ore nikel otomatis dari laboratorium independen.</p>
          <button
            onClick={() => handleTestEndpoint('/api/v1/surveyor/coa')}
            disabled={isTesting}
            className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Webhook className="w-3.5 h-3.5" />
            <span>Tes Webhook COA (/api/v1/surveyor)</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-bold text-slate-100 text-xs">ESDM MODI & MOMAP API</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">ONLINE</span>
          </div>
          <p className="text-slate-400 text-xs">Validasi kuota sisa RKAB & status legalitas IUP-OP pertambangan.</p>
          <button
            onClick={() => handleTestEndpoint('/api/v1/modi/rkab-status')}
            disabled={isTesting}
            className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center justify-center gap-1.5"
          >
            <Server className="w-3.5 h-3.5" />
            <span>Tes Endpoint ESDM (/api/v1/modi)</span>
          </button>
        </div>

      </div>

      {/* API Test JSON Response View */}
      {testResult && (
        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
            <span className="text-cyan-400 font-mono font-bold">GET {testResult.url} [200 OK]</span>
            <span className="text-slate-500">Response JSON</span>
          </div>
          <pre className="p-3 rounded-xl bg-slate-950 text-emerald-400 text-xs font-mono overflow-x-auto custom-scrollbar">
            {JSON.stringify(testResult.data, null, 2)}
          </pre>
        </div>
      )}

      {/* API Tokens List Table */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <h3 className="font-bold text-slate-100 text-sm">Daftar Token API Aktif</h3>
        <div className="space-y-2 text-xs">
          {apiTokens.map((tok) => (
            <div key={tok.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="font-bold text-slate-100 block">{tok.name}</span>
                <code className="text-cyan-400 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {tok.keySnippet}
                </code>
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-[11px]">
                <span>Dibuat: {tok.createdDate}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">{tok.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-100 text-lg">Buat Token API Hub Baru</h3>
            <form onSubmit={handleCreateToken} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Nama Sistem / Konektor:</label>
                <input
                  type="text"
                  required
                  value={newTokenName}
                  onChange={(e) => setNewTokenName(e.target.value)}
                  placeholder="e.g. Oracle WMS Connector"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold"
                >
                  Generasikan Token API
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
