import React, { useState } from 'react';
import { FileText, Sparkles, Download, Copy, Check, RefreshCw } from 'lucide-react';
import { Language } from '../../types';

interface RkabAIGeneratorModuleProps {
  language: Language;
}

export const RkabAIGeneratorModule: React.FC<RkabAIGeneratorModuleProps> = ({ language }) => {
  const [period, setPeriod] = useState('Triwulan III (Q3 2026)');
  const [pitName, setPitName] = useState('Pit Alpha Utamaro');
  const [targetProductionMT, setTargetProductionMT] = useState('250,000');
  const [actualProductionMT, setActualProductionMT] = useState('242,500');
  const [strippingRatio, setStrippingRatio] = useState('3.8');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateRkab = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/rkab-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          period,
          pitName,
          targetProductionMT,
          actualProductionMT,
          strippingRatio
        })
      });

      const data = await response.json();
      setGeneratedReport(data.reportText);
    } catch (err) {
      console.error("RKAB AI Error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyReport = () => {
    if (generatedReport) {
      navigator.clipboard.writeText(generatedReport);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Generator Laporan ESDM AI
            </span>
            <span className="text-slate-400 text-xs">• Format RKAB Rencana Kerja dan Anggaran Biaya</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Generator Laporan Kinerja Pertambangan RKAB AI' : 'AI ESDM RKAB Production Report Compiler'}
          </h2>
        </div>

        <button
          onClick={handleGenerateRkab}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
              <span>Memproses AI Compiler...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Komposisikan Laporan RKAB AI</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">Parameter Laporan RKAB</h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Periode Pelaporan:</label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Nama Pit Penambangan:</label>
              <input
                type="text"
                value={pitName}
                onChange={(e) => setPitName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Target Produksi Ore (MT):</label>
              <input
                type="text"
                value={targetProductionMT}
                onChange={(e) => setTargetProductionMT(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Realisasi Produksi Ore (MT):</label>
              <input
                type="text"
                value={actualProductionMT}
                onChange={(e) => setActualProductionMT(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Stripping Ratio Actual (BCM/MT):</label>
              <input
                type="text"
                value={strippingRatio}
                onChange={(e) => setStrippingRatio(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100"
              />
            </div>

            <button
              onClick={handleGenerateRkab}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Buat Draf RKAB AI</span>
            </button>
          </div>
        </div>

        {/* Report Preview Output */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-slate-100 text-sm">Draf Laporan Narasi Kinerja RKAB ESDM</h3>
              </div>
              {generatedReport && (
                <button
                  onClick={handleCopyReport}
                  className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin!' : 'Salin Teks Laporan'}</span>
                </button>
              )}
            </div>

            {!generatedReport ? (
              <div className="p-12 text-center text-slate-500 text-xs space-y-2">
                <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
                <p>Klik <strong>"Komposisikan Laporan RKAB AI"</strong> untuk menghasilkan narasi laporan standar Direktorat Jenderal Minerba ESDM.</p>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto custom-scrollbar">
                {generatedReport}
              </div>
            )}
          </div>

          <div className="text-[11px] text-slate-500 text-center pt-2 border-t border-slate-800">
            Compliant with Direktorat Jenderal Mineral dan Batubara (Kementerian ESDM RI)
          </div>
        </div>

      </div>

    </div>
  );
};
