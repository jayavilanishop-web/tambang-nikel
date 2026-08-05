import React, { useState } from 'react';
import { 
  Ship, 
  FileCheck, 
  Anchor, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Plus, 
  X, 
  Navigation, 
  BarChart2, 
  Calendar, 
  DollarSign, 
  Building2, 
  FileText,
  Search,
  Layers
} from 'lucide-react';
import { BargeShipment, Language } from '../../types';

interface JettyBargingModuleProps {
  barges: BargeShipment[];
  language: Language;
}

export const JettyBargingModule: React.FC<JettyBargingModuleProps> = ({
  barges,
  language
}) => {
  const [bargeList, setBargeList] = useState<BargeShipment[]>(barges);
  const [activeTab, setActiveTab] = useState<'barging_shipments' | 'coa_surveyor' | 'jetty_berths' | 'laytime_demurrage'>('barging_shipments');

  const [coaDataList, setCoaDataList] = useState([
    { certNo: 'SUCOFINDO/COA/2026/089', vesselName: 'BG. Megah 300 / TB. Ocean 01', surveyor: 'PT Sucofindo (Persero)', issueDate: '2026-08-02', niGrade: 1.88, feGrade: 18.5, mcPercent: 31.2, sio2MgoRatio: 2.15, tonnageMT: 7850, statusHPM: 'PATOH_MINIMUM_HPM', status: 'VERIFIED_OFFICIAL' },
    { certNo: 'CARSURIN/COA/2026/112', vesselName: 'BG. Samudra 330 / TB. Royal 88', surveyor: 'PT Carsurin Tbk', issueDate: '2026-08-03', niGrade: 1.76, feGrade: 19.2, mcPercent: 32.8, sio2MgoRatio: 2.30, tonnageMT: 8200, statusHPM: 'PATOH_MINIMUM_HPM', status: 'VERIFIED_OFFICIAL' },
    { certNo: 'ANINDYA/COA/2026/045', vesselName: 'BG. Trans Power 08 / TB. Celebes', surveyor: 'PT Anindya Wiraputra', issueDate: '2026-08-01', niGrade: 1.62, feGrade: 22.1, mcPercent: 34.0, sio2MgoRatio: 2.45, tonnageMT: 6500, statusHPM: 'PATOH_MINIMUM_HPM', status: 'VERIFIED_OFFICIAL' }
  ]);

  const [jettyBerths, setJettyBerths] = useState([
    { berthId: 'BERTH-JETTY-01', name: 'Dermaga Heavy Jetty 01 (Max 10,000 DWT)', conveyorCapacityTPH: 1200, currentVessel: 'BG. Megah 300', loadedTodayMT: 3450, draftDepthMeters: 8.5, status: 'LOADING_ACTIVE' },
    { berthId: 'BERTH-JETTY-02', name: 'Dermaga Barging 02 (Max 7,500 DWT)', conveyorCapacityTPH: 800, currentVessel: 'BG. Samudra 330', loadedTodayMT: 1200, draftDepthMeters: 7.2, status: 'LOADING_ACTIVE' },
    { berthId: 'BERTH-JETTY-03', name: 'Dermaga LCT Auxiliary Jetty 03', conveyorCapacityTPH: 500, currentVessel: 'LCT. Bahari 04', loadedTodayMT: 0, draftDepthMeters: 5.5, status: 'IDLE_STANDBY' }
  ]);

  const [laytimeLogs, setLaytimeLogs] = useState([
    { logId: 'SOF-2026-041', vesselName: 'BG. Megah 300', norTendered: '2026-08-01 08:00', loadingCommenced: '2026-08-01 10:30', allowedLaytimeHours: 48, elapsedHours: 26, demurrageRateUSD: 2500, estDemurrageUSD: 0, status: 'WITHIN_LAYTIME' },
    { logId: 'SOF-2026-042', vesselName: 'BG. Trans Power 08', norTendered: '2026-07-29 14:00', loadingCommenced: '2026-07-30 09:00', allowedLaytimeHours: 48, elapsedHours: 64, demurrageRateUSD: 3000, estDemurrageUSD: 2000, status: 'DEMURRAGE_INCURRED' }
  ]);

  const [isLoadingCoa, setIsLoadingCoa] = useState(false);
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCoaModal, setShowCoaModal] = useState(false);
  const [showBerthModal, setShowBerthModal] = useState(false);
  const [showSofModal, setShowSofModal] = useState(false);

  // Form State Barge
  const [bargeName, setBargeName] = useState('');
  const [tugboatName, setTugboatName] = useState('');
  const [shipmentCode, setShipmentCode] = useState('');
  const [targetSmelterName, setTargetSmelterName] = useState('Smelter IMIP Morowali');
  const [destinationPort, setDestinationPort] = useState('Pelabuhan Jetty IMIP');
  const [targetTonnageMT, setTargetTonnageMT] = useState(7500);
  const [loadedTonnageMT, setLoadedTonnageMT] = useState(4200);
  const [status, setStatus] = useState<'LOADING' | 'DEPARTED' | 'ANCHORED'>('LOADING');
  const [coalSurveyorCertNo, setCoalSurveyorCertNo] = useState('SUCOFINDO/COA/2026/089');

  // Form State COA
  const [coaCertNoInput, setCoaCertNoInput] = useState('');
  const [coaVesselInput, setCoaVesselInput] = useState('BG. Megah 300');
  const [coaSurveyorInput, setCoaSurveyorInput] = useState('PT Sucofindo (Persero)');
  const [coaNiInput, setCoaNiInput] = useState(1.85);
  const [coaFeInput, setCoaFeInput] = useState(18.2);
  const [coaMcInput, setCoaMcInput] = useState(30.5);
  const [coaTonnageInput, setCoaTonnageInput] = useState(7500);

  // Form State Berth
  const [berthNameInput, setBerthNameInput] = useState('');
  const [berthTphInput, setBerthTphInput] = useState(1000);

  // Form State SOF
  const [sofVesselInput, setSofVesselInput] = useState('BG. Megah 300');
  const [sofAllowedHours, setSofAllowedHours] = useState(48);
  const [sofRateUSD, setSofRateUSD] = useState(2500);

  const handleFetchSurveyorCoa = async () => {
    setIsLoadingCoa(true);
    try {
      const response = await fetch('/api/v1/surveyor/coa');
      const data = await response.json();
      if (data && data.lastCertificateNo) {
        setCoaDataList(prev => [
          {
            certNo: data.lastCertificateNo,
            vesselName: data.vesselName || 'BG. Megah 300',
            surveyor: data.surveyorCompany || 'PT Sucofindo',
            issueDate: new Date().toISOString().slice(0, 10),
            niGrade: data.grades?.ni || 1.85,
            feGrade: 18.2,
            mcPercent: data.grades?.mc || 30.5,
            sio2MgoRatio: 2.1,
            tonnageMT: data.analyzedTonnage || 7500,
            statusHPM: data.statusHPM || 'PATOH_MINIMUM_HPM',
            status: 'VERIFIED_OFFICIAL'
          },
          ...prev
        ]);
      }
    } catch (err) {
      console.error("COA Sync Error:", err);
    } finally {
      setIsLoadingCoa(false);
    }
  };

  const handleCreateBarge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bargeName.trim()) return;

    const newBarge: BargeShipment = {
      id: `BG-${Date.now()}`,
      shipmentCode: shipmentCode || `BARGE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      bargeName,
      tugboatName: tugboatName || 'TB. Ocean Warrior',
      targetSmelterName,
      destinationPort,
      targetTonnageMT: Number(targetTonnageMT),
      loadedTonnageMT: Number(loadedTonnageMT),
      status,
      etaDate: '2026-08-08',
      coalSurveyorCertNo,
      demurrageUSDPerDay: 2500,
      niGradeSurveyor: 1.85,
      moistureSurveyor: 32.0
    };

    setBargeList(prev => [newBarge, ...prev]);
    setShowAddModal(false);
    setBargeName('');
    setTugboatName('');
    setShipmentCode('');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-teal-500/20 text-teal-400 border border-teal-500/30">
              Logistik Jetty & Port
            </span>
            <span className="text-slate-400 text-xs">• Tongkang Barging, Dermaga Jetty & Sertifikat COA Surveyor</span>
          </div>
          <h2 className="text-xl font-bold text-slate-100">
            {language === 'id' ? 'Pengiriman Tongkang (Barging), Jetty & COA Surveyor' : 'Jetty Barging Operations, Berth & Surveyor COA'}
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Input Data Tongkang Baru</span>
          </button>

          <button
            onClick={handleFetchSurveyorCoa}
            disabled={isLoadingCoa}
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <FileCheck className="w-4 h-4" />
            <span>{isLoadingCoa ? 'Sinkronisasi API...' : 'Sinkronkan COA Surveyor'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'barging_shipments', label: 'Pengiriman Tongkang (Barging)', icon: Ship },
          { id: 'coa_surveyor', label: 'Sertifikat Analisis COA', icon: FileCheck },
          { id: 'jetty_berths', label: 'Manajemen Dermaga Jetty', icon: Anchor },
          { id: 'laytime_demurrage', label: 'Laytime & Demurrage (SOF)', icon: Clock }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-teal-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BARGING SHIPMENTS */}
      {activeTab === 'barging_shipments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {bargeList.map((b) => (
              <div key={b.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg">
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
                      {(b.loadedTonnageMT ?? 0).toLocaleString('id-ID')} / {(b.targetTonnageMT ?? 0).toLocaleString('id-ID')} MT
                    </strong>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full" 
                      style={{ width: `${Math.min(((b.loadedTonnageMT || 0) / (b.targetTonnageMT || 1)) * 100, 100)}%` }} 
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
      )}

      {/* TAB 2: COA SURVEYOR */}
      {activeTab === 'coa_surveyor' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Sertifikat Analisis Kadar Ore (Certificate of Sampling & Analysis - COA)</h3>
                <p className="text-slate-400 text-xs">Hasil pengujian resmi lembaga surveyor independen Sucofindo, Carsurin, Anindya</p>
              </div>
              <button
                onClick={() => setShowCoaModal(true)}
                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Input Sertifikat COA</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Sertifikat COA</th>
                    <th className="py-2.5 px-3">Tongkang / Armada</th>
                    <th className="py-2.5 px-3">Lembaga Surveyor</th>
                    <th className="py-2.5 px-3">Kadar Ni (%)</th>
                    <th className="py-2.5 px-3">Kadar Fe (%)</th>
                    <th className="py-2.5 px-3">Moisture (MC %)</th>
                    <th className="py-2.5 px-3">Rasio SiO2/MgO</th>
                    <th className="py-2.5 px-3">Tonase Surveyor (MT)</th>
                    <th className="py-2.5 px-3">Status Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {coaDataList.map((coa) => (
                    <tr key={coa.certNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-teal-400">{coa.certNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{coa.vesselName}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{coa.surveyor}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{coa.niGrade}% Ni</td>
                      <td className="py-3 px-3 text-amber-300">{coa.feGrade}% Fe</td>
                      <td className="py-3 px-3 text-rose-300">{coa.mcPercent}% MC</td>
                      <td className="py-3 px-3 text-slate-300">{coa.sio2MgoRatio}</td>
                      <td className="py-3 px-3 text-slate-100 font-bold">{(coa.tonnageMT ?? 0).toLocaleString()} MT</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {coa.status}
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

      {/* TAB 3: JETTY BERTHS */}
      {activeTab === 'jetty_berths' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Manajemen Dermaga Jetty & Kapasitas Pemuatan (Conveyor Rate)</h3>
                <p className="text-slate-400 text-xs">Alokasi sandar kapal tongkang, kapasitas conveyor TPH & kedalaman draft water</p>
              </div>
              <button
                onClick={() => setShowBerthModal(true)}
                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Dermaga Jetty</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {jettyBerths.map((j) => (
                <div key={j.berthId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-teal-400 font-mono">{j.berthId}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      j.status === 'LOADING_ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {j.status}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm block font-sans">{j.name}</strong>
                  
                  <div className="space-y-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kapal Sandar:</span>
                      <strong className="text-emerald-400">{j.currentVessel}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kapasitas Conveyor:</span>
                      <strong className="font-mono text-amber-300">{j.conveyorCapacityTPH} TPH</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kedalaman Draft Water:</span>
                      <strong className="font-mono text-slate-200">{j.draftDepthMeters} Meter</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pemuatan Hari Ini:</span>
                      <strong className="font-mono text-emerald-400">{(j.loadedTodayMT ?? 0).toLocaleString()} MT</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LAYTIME & DEMURRAGE */}
      {activeTab === 'laytime_demurrage' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Pelacak Laytime & Statement of Facts (SOF) Demurrage</h3>
                <p className="text-slate-400 text-xs">Kalkulasi penalti keterlambatan pemuatan tongkang & klaim despatch</p>
              </div>
              <button
                onClick={() => setShowSofModal(true)}
                className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Log SOF Laytime</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Log SOF ID</th>
                    <th className="py-2.5 px-3">Nama Tongkang</th>
                    <th className="py-2.5 px-3">NOR Tendered</th>
                    <th className="py-2.5 px-3">Loading Commenced</th>
                    <th className="py-2.5 px-3">Laytime diizinkan</th>
                    <th className="py-2.5 px-3">Waktu Terpakai</th>
                    <th className="py-2.5 px-3">Tarif Demurrage ($/Hari)</th>
                    <th className="py-2.5 px-3">Estimasi Demurrage</th>
                    <th className="py-2.5 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {laytimeLogs.map((sof) => (
                    <tr key={sof.logId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-teal-400">{sof.logId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{sof.vesselName}</td>
                      <td className="py-3 px-3 text-slate-300">{sof.norTendered}</td>
                      <td className="py-3 px-3 text-slate-300">{sof.loadingCommenced}</td>
                      <td className="py-3 px-3 text-slate-200">{sof.allowedLaytimeHours} Jam</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{sof.elapsedHours} Jam</td>
                      <td className="py-3 px-3 text-slate-300">${sof.demurrageRateUSD}</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">${sof.estDemurrageUSD}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          sof.status === 'WITHIN_LAYTIME' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {sof.status}
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

      {/* MODAL 1: INPUT DATA TONGKANG */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Ship className="w-5 h-5" />
                <span>Input Data Tongkang & Pengapalan Baru</span>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBarge} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Tongkang (Barge Name)*</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: BG. Megah 300 / BG. Samudra 330"
                  value={bargeName}
                  onChange={(e) => setBargeName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nama Kapal Tunda (Tugboat)</label>
                  <input
                    type="text"
                    placeholder="Contoh: TB. Royal 88"
                    value={tugboatName}
                    onChange={(e) => setTugboatName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Kode Pengiriman</label>
                  <input
                    type="text"
                    placeholder="Contoh: BARGE-2026-09"
                    value={shipmentCode}
                    onChange={(e) => setShipmentCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Smelter Tujuan</label>
                  <input
                    type="text"
                    value={targetSmelterName}
                    onChange={(e) => setTargetSmelterName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Pelabuhan Pembongkaran</label>
                  <input
                    type="text"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Kapasitas (MT)</label>
                  <input
                    type="number"
                    value={targetTonnageMT}
                    onChange={(e) => setTargetTonnageMT(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tonase Termuat Sekarang (MT)</label>
                  <input
                    type="number"
                    value={loadedTonnageMT}
                    onChange={(e) => setLoadedTonnageMT(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Simpan Data Tongkang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: INPUT SERTIFIKAT COA */}
      {showCoaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-teal-400" /> Terbitkan Sertifikat COA Surveyor
              </h3>
              <button onClick={() => setShowCoaModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Tongkang / Kapal:</label>
                <input
                  type="text"
                  value={coaVesselInput}
                  onChange={(e) => setCoaVesselInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Lembaga Surveyor:</label>
                <select
                  value={coaSurveyorInput}
                  onChange={(e) => setCoaSurveyorInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-teal-500"
                >
                  <option value="PT Sucofindo (Persero)">PT Sucofindo (Persero)</option>
                  <option value="PT Carsurin Tbk">PT Carsurin Tbk</option>
                  <option value="PT Anindya Wiraputra">PT Anindya Wiraputra</option>
                  <option value="SGS Indonesia">SGS Indonesia</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Kadar Nickel (Ni %):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={coaNiInput}
                    onChange={(e) => setCoaNiInput(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Moisture (MC %):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={coaMcInput}
                    onChange={(e) => setCoaMcInput(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-rose-300 font-bold font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setCoaDataList(prev => [
                    {
                      certNo: `COA-2026-${Math.floor(100 + Math.random() * 900)}`,
                      vesselName: coaVesselInput,
                      surveyor: coaSurveyorInput,
                      issueDate: new Date().toISOString().slice(0, 10),
                      niGrade: coaNiInput,
                      feGrade: coaFeInput,
                      mcPercent: coaMcInput,
                      sio2MgoRatio: 2.15,
                      tonnageMT: coaTonnageInput,
                      statusHPM: 'PATOH_MINIMUM_HPM',
                      status: 'VERIFIED_OFFICIAL'
                    },
                    ...prev
                  ]);
                  setShowCoaModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Simpan Sertifikat COA
              </button>
              <button
                onClick={() => setShowCoaModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INPUT DERMAGA JETTY */}
      {showBerthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Anchor className="w-4 h-4 text-teal-400" /> Tambah Dermaga Jetty Baru
              </h3>
              <button onClick={() => setShowBerthModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Dermaga Jetty:</label>
                <input
                  type="text"
                  placeholder="Dermaga Jetty 04 Extension"
                  value={berthNameInput}
                  onChange={(e) => setBerthNameInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kapasitas Conveyor Loader (TPH):</label>
                <input
                  type="number"
                  value={berthTphInput}
                  onChange={(e) => setBerthTphInput(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setJettyBerths(prev => [
                    {
                      berthId: `BERTH-JETTY-0${prev.length + 1}`,
                      name: berthNameInput || 'Dermaga Jetty Baru',
                      conveyorCapacityTPH: berthTphInput,
                      currentVessel: 'Standby',
                      loadedTodayMT: 0,
                      draftDepthMeters: 8.0,
                      status: 'IDLE_STANDBY'
                    },
                    ...prev
                  ]);
                  setShowBerthModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Simpan Dermaga
              </button>
              <button
                onClick={() => setShowBerthModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: INPUT SOF LAYTIME */}
      {showSofModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400" /> Terbitkan Statement of Facts (SOF) Laytime
              </h3>
              <button onClick={() => setShowSofModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nama Tongkang / Kapal:</label>
                <input
                  type="text"
                  value={sofVesselInput}
                  onChange={(e) => setSofVesselInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Batas Laytime (Jam):</label>
                  <input
                    type="number"
                    value={sofAllowedHours}
                    onChange={(e) => setSofAllowedHours(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Demurrage ($/Hari):</label>
                  <input
                    type="number"
                    value={sofRateUSD}
                    onChange={(e) => setSofRateUSD(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-rose-300 font-bold font-mono focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setLaytimeLogs(prev => [
                    {
                      logId: `SOF-2026-0${prev.length + 40}`,
                      vesselName: sofVesselInput,
                      norTendered: new Date().toISOString().slice(0, 16).replace('T', ' '),
                      loadingCommenced: new Date().toISOString().slice(0, 16).replace('T', ' '),
                      allowedLaytimeHours: sofAllowedHours,
                      elapsedHours: 12,
                      demurrageRateUSD: sofRateUSD,
                      estDemurrageUSD: 0,
                      status: 'WITHIN_LAYTIME'
                    },
                    ...prev
                  ]);
                  setShowSofModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Simpan Log SOF
              </button>
              <button
                onClick={() => setShowSofModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
