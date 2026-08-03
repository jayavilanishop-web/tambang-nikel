import React, { useState } from 'react';
import { Ship, FileCheck, Anchor, Clock, AlertCircle, CheckCircle2, Download } from 'lucide-react';
import { BargeShipment, Language } from '../../types';

interface JettyBargingModuleProps {
  barges: BargeShipment[];
  language: Language;
}

export const JettyBargingModule: React.FC<JettyBargingModuleProps> = ({
  barges,
  language
}) => {
  const [coaData, setCoaData] = useState<any>(null);
  const [isLoadingCoa, setIsLoadingCoa] = useState(false);

  const handleFetchSurveyorCoa = async () => {
    setIsLoadingCoa(true);
    try {
      const response = await fetch('/api/v1/surveyor/coa');
      const data = await response.json();
      setCoaData(data);
    } catch (err) {
      console.error("COA Sync Error:", err);
    } finally {
      setIsLoadingCoa(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-teal-500/20 text-teal-400 border border-teal-500/30">
              Logistik Jetty & Port
            </span>
            <span className="text-slate-400 text-xs">• Tongkang Barging & Sertifikat COA Surveyor</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Pengiriman Tongkang (Barging) & COA Surveyor' : 'Jetty Barging Operations & Surveyor COA'}
          </h2>
        </div>

        <button
          onClick={handleFetchSurveyorCoa}
          disabled={isLoadingCoa}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 disabled:opacity-50"
        >
          <FileCheck className="w-4 h-4" />
          <span>{isLoadingCoa ? 'Singkronisasi API...' : 'Sinkronkan COA Sucofindo / Carsurin'}</span>
        </button>
      </div>

      {/* COA Live Sync Result Banner */}
      {coaData && (
        <div className="p-4 rounded-xl bg-slate-900 border border-teal-500/40 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Sertifikat COA Terbaru Terintegrasi ({coaData.surveyorCompany})</span>
            </div>
            <span className="font-mono text-slate-300 text-xs font-semibold">{coaData.lastCertificateNo}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] block">Tongkang:</span>
              <strong className="text-slate-200 truncate block">{coaData.vesselName}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Total Ore COA:</span>
              <strong className="text-slate-100 font-mono">{coaData.analyzedTonnage} MT</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Kadar Ni (Surveyor):</span>
              <strong className="text-emerald-400 font-mono font-extrabold">{coaData.grades?.ni}% Ni</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Moisture (MC):</span>
              <strong className="text-amber-300 font-mono">{coaData.grades?.mc}% MC</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">Status HPM:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                {coaData.statusHPM}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Barging Shipment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {barges.map((b) => (
          <div key={b.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="font-mono text-emerald-400 font-bold text-xs">{b.shipmentCode}</span>
                <h3 className="font-bold text-slate-100 text-base">{b.bargeName}</h3>
                <p className="text-xs text-slate-400">{b.tugboatName}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                b.status === 'DEPARTED' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                {b.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Smelter Tujuan:</span>
                <strong className="text-slate-200">{b.targetSmelterName}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Pelabuhan Pembongkaran:</span>
                <strong className="text-slate-200">{b.destinationPort}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Perkiraan Tiba (ETA):</span>
                <strong className="text-slate-200 font-mono">{b.etaDate}</strong>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Progres Pemuatan (Loading):</span>
                <strong className="font-mono text-emerald-400">
                  {b.loadedTonnageMT.toLocaleString('id-ID')} / {b.targetTonnageMT.toLocaleString('id-ID')} MT
                </strong>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full" 
                  style={{ width: `${Math.min((b.loadedTonnageMT / b.targetTonnageMT) * 100, 100)}%` }} 
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
              <span>Sertifikat COA: <strong className="text-slate-200 font-mono">{b.coalSurveyorCertNo}</strong></span>
              <span className="text-rose-400 font-mono text-[11px]">Demurrage: ${b.demurrageUSDPerDay}/Hari</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
