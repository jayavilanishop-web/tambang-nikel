import React, { useState } from 'react';
import { 
  FileText, 
  FolderArchive, 
  History, 
  CheckCircle2, 
  FileCheck, 
  Scan, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Compass, 
  Layers, 
  Briefcase, 
  Archive, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  Lock, 
  Clock, 
  ShieldCheck, 
  PenTool, 
  Share2, 
  Sparkles, 
  AlertTriangle, 
  Building2, 
  Upload 
} from 'lucide-react';
import { Language } from '../../types';

interface DocumentManagementModuleProps {
  language: Language;
}

export const DocumentManagementModule: React.FC<DocumentManagementModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'doc_repository'
    | 'versioning_history'
    | 'approval_workflow'
    | 'digital_signature'
    | 'ocr_extractor'
    | 'pdf_image_viewer'
    | 'cad_drawings'
    | 'contracts_leases'
    | 'digital_archive'
  >('doc_repository');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedDocCategory, setSelectedDocCategory] = useState<string>('ALL');

  // Document Repository Dataset
  const documentsList = [
    { docId: 'DOC-RKAB-2026-v2.1', title: 'Laporan RKAB Teknis & Lingkungan ESDM 2026', category: 'ESDM_COMPLIANCE', type: 'PDF', version: 'v2.1', sizeMb: '14.2 MB', author: 'Ir. Bambang Wijaya (KTT)', approvalStatus: 'APPROVED', lastModified: '2026-08-01 14:20' },
    { docId: 'DOC-CAD-PIT-ALPHA-3D', title: 'Desain Mine Plan Pit Alpha Block 4 (DWG/CAD)', category: 'CAD_DRAWING', type: 'CAD_DWG', version: 'v3.0', sizeMb: '42.8 MB', author: 'Sutrisno (Chief Mine Plan)', approvalStatus: 'APPROVED', lastModified: '2026-07-28 09:15' },
    { docId: 'DOC-CTR-PERTA-2026', title: 'Kontrak Suplai BBM Solar B35 Pertamina Patra Niaga', category: 'CONTRACT', type: 'PDF_SIGNED', version: 'v1.0', sizeMb: '5.6 MB', author: 'Procurement Legal Team', approvalStatus: 'APPROVED_DIGITAL_SIGNED', lastModified: '2026-07-15 11:30' },
    { docId: 'DOC-OCR-SURVEY-042', title: 'Hasil Scan OCR Sertifikat Kalibrasi Total Station', category: 'OCR_SCANNED', type: 'SCAN_IMAGE', version: 'v1.0', sizeMb: '3.1 MB', author: 'Survey Dept Crew', approvalStatus: 'VERIFIED', lastModified: '2026-08-02 16:45' }
  ];

  // Document Version History Dataset
  const versionHistory = [
    { version: 'v2.1', date: '2026-08-01 14:20', author: 'Ir. Bambang Wijaya', changeLog: 'Penyesuaian Kuota Produksi Bijih Nikel Rencana 5.2 Juta Ton', fileSize: '14.2 MB', status: 'ACTIVE_CURRENT' },
    { version: 'v2.0', date: '2026-07-20 10:15', author: 'Hendra Setiawan', changeLog: 'Tambahan Lampiran Peta Topografi Batas IUP & Settling Pond', fileSize: '12.8 MB', status: 'SUPERSEDED' },
    { version: 'v1.0', date: '2026-07-01 08:30', author: 'Hendra Setiawan', changeLog: 'Draft Awal Laporan RKAB 2026 Internal Review', fileSize: '10.5 MB', status: 'SUPERSEDED' }
  ];

  // Multi-Stage Approval Workflow Dataset
  const approvalWorkflows = [
    { wfId: 'WF-2026-092', docTitle: 'Adendum Kontrak Jasa Pengangkutan Barging Jetty Berth B', currentStage: 'Stage 2: Persetujuan Direktur Keuangan', totalStages: '3 Stages', initiator: 'Procurement Lead', submitDate: '2026-08-02', status: 'PENDING_APPROVAL' },
    { wfId: 'WF-2026-091', docTitle: 'Laporan Hasil Inspeksi K3LH Pit Highwall Slope', currentStage: 'Stage 3: Persetujuan KTT (Kepala Teknik Tambang)', totalStages: '3 Stages', initiator: 'Safety Inspector', submitDate: '2026-08-01', status: 'APPROVED' }
  ];

  // Digital Signatures Verification Dataset
  const digitalSignatures = [
    { sigId: 'SIG-SHA256-8812', signerName: 'Ir. Bambang Wijaya', roleTitle: 'Kepala Teknik Tambang (KTT)', certAuthority: 'BSrE / e-Sign KESDM Certified', timestamp: '2026-08-01 14:22:05 WIB', hashVerification: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', status: 'VALID_VERIFIED' }
  ];

  // OCR Text Extraction Dataset
  const ocrExtractions = [
    { scanId: 'OCR-2026-102', docName: 'Surat Izin Mengangkut Bahan Peledakan (SIMP-ANFO)', extractedFields: { nomorIzin: 'SIMP/1042/ESDM/2026', masaBerlaku: '2027-08-01', instansi: 'Direktorat Teknik Tambang KESDM', confidenceScore: '99.4%' }, scanDate: '2026-08-02 11:10' }
  ];

  // CAD / Technical Drawings Metadata Dataset
  const cadDrawings = [
    { cadId: 'CAD-DWG-ALPHA-2026', title: 'Cross-Section Geologi & Contour Elevation Pit Alpha', format: 'AutoCAD DWG / DXF 3D', layersCount: 18, projection: 'UTM Zone 51S (WGS 84)', engineer: 'Mine Geologist & Survey Team', status: 'RELEASED_FOR_MINING' }
  ];

  // Contracts & Mining Leases Dataset
  const contractsLeases = [
    { contractId: 'CTR-IUP-2022-88', title: 'Izin Usaha Pertambangan (IUP) Operasi Produksi Nikel', partner: 'Kementerian ESDM Republik Indonesia', startDate: '2022-05-10', expiryDate: '2042-05-10', valueUsd: 'N/A (Government Permit)', status: 'ACTIVE_COMPLIANT' },
    { contractId: 'CTR-LEASE-LAND-041', title: 'Sewa Lahan Pelabuhan Jetty & Stockpile Rom', partner: 'Masyarakat Adat & Pemda Lokal', startDate: '2024-01-01', expiryDate: '2034-01-01', valueUsd: '$1,200,000 USD', status: 'ACTIVE_COMPLIANT' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Enterprise Mining Document Management System (EDMS)
            </span>
            <span className="text-slate-400 text-xs">• Digital Archiving & ESDM Compliance Audit Trail</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Manajemen Dokumen Tambang, CAD, OCR, Tanda Tangan Digital & Arsip
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem dokumen pertambangan terintegrasi: Repositori Dokumen, Versi & Histori, Alur Persetujuan (Workflow), Tanda Tangan Digital SHA-256, OCR Scan Dokumen Fisik, Gambar CAD/DWG, Kontrak Legaliasi & Arsip Digital ESDM.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <FileText className="w-6 h-6 text-blue-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Total Dokumen Terarsip:</span>
            <strong className="text-slate-100 font-mono text-base font-bold">4,280 Dokumen</strong>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Active Approved Documents</span>
          <p className="text-2xl font-extrabold text-blue-400 font-mono">3,890 <span className="text-xs font-normal text-slate-400">Files</span></p>
          <span className="text-[11px] text-slate-500 block">Version Controlled v2.0+</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">Pending Approval Workflows</span>
          <p className="text-2xl font-extrabold text-amber-300 font-mono">12 <span className="text-xs font-normal text-slate-400">In Review</span></p>
          <span className="text-[11px] text-slate-500 block">Multi-Level KTT Signatures</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">OCR Scanned Certificates</span>
          <p className="text-2xl font-extrabold text-emerald-400 font-mono">99.4% <span className="text-xs font-normal text-slate-400">Accuracy</span></p>
          <span className="text-[11px] text-slate-500 block">Auto Metadata Indexing</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <span className="text-slate-400 text-xs font-semibold block">CAD / 3D Mine Design Files</span>
          <p className="text-2xl font-extrabold text-blue-300 font-mono">142 <span className="text-xs font-normal text-slate-400">DWG Files</span></p>
          <span className="text-[11px] text-slate-500 block">Geospatial UTM Coordinates</span>
        </div>
      </div>

      {/* Module Navigation Sub-Tabs covering all 11 Document keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'doc_repository', label: 'Repositori Dokumen (Document)', icon: FileText },
          { id: 'versioning_history', label: 'Versi & Histori (Versioning)', icon: History },
          { id: 'approval_workflow', label: 'Alur Persetujuan (Approval)', icon: FileCheck },
          { id: 'digital_signature', label: 'Tanda Tangan Digital (Signature)', icon: PenTool },
          { id: 'ocr_extractor', label: 'Ekstraksi Teks OCR', icon: Scan },
          { id: 'pdf_image_viewer', label: 'PDF & File Gambar (Viewer)', icon: ImageIcon },
          { id: 'cad_drawings', label: 'Gambar Teknik & CAD / DWG', icon: Compass },
          { id: 'contracts_leases', label: 'Kontrak & IUP (Contract)', icon: Briefcase },
          { id: 'digital_archive', label: 'Arsip Digital (Archive)', icon: Archive }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DOCUMENT REPOSITORY */}
      {activeTab === 'doc_repository' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Pusat Repositori Master Dokumen Tambang Nikel</h3>
              <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Dokumen Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Doc ID</th>
                    <th className="py-2.5 px-3">Judul Dokumen</th>
                    <th className="py-2.5 px-3">Kategori</th>
                    <th className="py-2.5 px-3">Format File</th>
                    <th className="py-2.5 px-3">Versi</th>
                    <th className="py-2.5 px-3">Penulis / Author</th>
                    <th className="py-2.5 px-3">Status Persetujuan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {documentsList.map((doc) => (
                    <tr key={doc.docId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-blue-400">{doc.docId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{doc.title}</td>
                      <td className="py-3 px-3 font-sans text-emerald-300">{doc.category}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{doc.type}</td>
                      <td className="py-3 px-3 text-slate-200">{doc.version}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{doc.author}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {doc.approvalStatus}
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

      {/* TAB 2: VERSIONING & HISTORY */}
      {activeTab === 'versioning_history' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pelacak Versi Dokumen & Catatan Perubahan (Versioning & Revision Log)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Versi</th>
                    <th className="py-2.5 px-3">Tanggal Revisi</th>
                    <th className="py-2.5 px-3">Penyunting (Author)</th>
                    <th className="py-2.5 px-3">Catatan Perubahan (Change Log)</th>
                    <th className="py-2.5 px-3">Ukuran File</th>
                    <th className="py-2.5 px-3">Status Versi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {versionHistory.map((v) => (
                    <tr key={v.version} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-blue-400">{v.version}</td>
                      <td className="py-3 px-3 text-slate-400">{v.date}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{v.author}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{v.changeLog}</td>
                      <td className="py-3 px-3 text-slate-300">{v.fileSize}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          v.status.includes('ACTIVE') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {v.status}
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

      {/* TAB 3: APPROVAL WORKFLOW */}
      {activeTab === 'approval_workflow' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Alur Persetujuan Berjenjang (Multi-Stage Approval Workflow)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Workflow ID</th>
                    <th className="py-2.5 px-3">Judul Dokumen Membutuhkan Persetujuan</th>
                    <th className="py-2.5 px-3">Tahap Persetujuan Saat Ini</th>
                    <th className="py-2.5 px-3">Pengaju (Initiator)</th>
                    <th className="py-2.5 px-3">Tanggal Pengajuan</th>
                    <th className="py-2.5 px-3">Status Persetujuan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {approvalWorkflows.map((w) => (
                    <tr key={w.wfId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-blue-400">{w.wfId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{w.docTitle}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{w.currentStage}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{w.initiator}</td>
                      <td className="py-3 px-3 text-slate-400">{w.submitDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-amber-500/20 text-amber-300">
                          {w.status}
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

      {/* TAB 4: DIGITAL SIGNATURE */}
      {activeTab === 'digital_signature' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Verifikasi Tanda Tangan Digital SHA-256 & Sertifikat KESDM (Digital Signature)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Signature ID</th>
                    <th className="py-2.5 px-3">Nama Penandatangan & Jabatan</th>
                    <th className="py-2.5 px-3">Otoritas Sertifikat (CA)</th>
                    <th className="py-2.5 px-3">Timestamp Digital Waktu</th>
                    <th className="py-2.5 px-3">Hash Enkripsi SHA-256</th>
                    <th className="py-2.5 px-3">Status Verifikasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {digitalSignatures.map((s) => (
                    <tr key={s.sigId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-blue-400">{s.sigId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">
                        <span className="block">{s.signerName}</span>
                        <span className="text-[10px] text-slate-400">{s.roleTitle}</span>
                      </td>
                      <td className="py-3 px-3 font-sans text-emerald-300">{s.certAuthority}</td>
                      <td className="py-3 px-3 text-slate-400">{s.timestamp}</td>
                      <td className="py-3 px-3 text-slate-500 text-[9px] truncate max-w-[150px]">{s.hashVerification}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {s.status}
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

      {/* TAB 5: OCR EXTRACTOR */}
      {activeTab === 'ocr_extractor' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemindai OCR (Optical Character Recognition) Kertas Fisik ke Data Digital
            </h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              {ocrExtractions.map((o) => (
                <div key={o.scanId} className="space-y-2">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <strong className="text-blue-400 font-bold">{o.docName}</strong>
                    <span className="text-emerald-400 font-bold font-mono">Akurasi OCR: {o.extractedFields.confidenceScore}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-slate-300">
                    <p>Nomor Izin Extracted: <strong className="text-slate-100">{o.extractedFields.nomorIzin}</strong></p>
                    <p>Masa Berlaku: <strong className="text-amber-300">{o.extractedFields.masaBerlaku}</strong></p>
                    <p>Instansi Penerbit: <strong className="text-slate-100">{o.extractedFields.instansi}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CAD & TECHNICAL DRAWINGS */}
      {activeTab === 'cad_drawings' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Gambar Teknik Tambang & Berkas AutoCAD (CAD / DWG 3D Mesh)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">CAD ID</th>
                    <th className="py-2.5 px-3">Judul Berkas Gambar Teknik</th>
                    <th className="py-2.5 px-3">Format DWG/DXF</th>
                    <th className="py-2.5 px-3">Jumlah Layer</th>
                    <th className="py-2.5 px-3">Sistem Proyeksi Peta</th>
                    <th className="py-2.5 px-3">Status Rilis Desain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {cadDrawings.map((c) => (
                    <tr key={c.cadId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-blue-400">{c.cadId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{c.title}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{c.format}</td>
                      <td className="py-3 px-3 text-slate-200">{c.layersCount} Layers</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{c.projection}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {c.status}
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

      {/* TAB 7: CONTRACTS & LEASES */}
      {activeTab === 'contracts_leases' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pengelolaan Kontrak Legal, IUP Tambang & Perjanjian Sewa Lahan
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Kontrak / IUP</th>
                    <th className="py-2.5 px-3">Judul Perjanjian Kontrak</th>
                    <th className="py-2.5 px-3">Mitra / Instansi</th>
                    <th className="py-2.5 px-3">Mulai Berlaku</th>
                    <th className="py-2.5 px-3">Jatuh Tempo Kadaluarsa</th>
                    <th className="py-2.5 px-3">Status Kepatuhan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {contractsLeases.map((ct) => (
                    <tr key={ct.contractId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-blue-400">{ct.contractId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{ct.title}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{ct.partner}</td>
                      <td className="py-3 px-3 text-slate-400">{ct.startDate}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{ct.expiryDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {ct.status}
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

      {/* TAB 8: DIGITAL ARCHIVE */}
      {activeTab === 'digital_archive' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Arsip Digital Vault Permanen & Retensi Dokumen ESDM (Digital Archive)
            </h3>

            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-3">
              <Archive className="w-10 h-10 text-blue-400 mx-auto opacity-80" />
              <strong className="text-slate-100 text-sm font-bold block">Digital Archive Vault Encrypted</strong>
              <p className="text-slate-400 text-xs max-w-xl mx-auto">
                Arsip digital dokumen terlindungi dengan sistem enkripsi AES-256 bits, kebijakan retensi dokumen 30 tahun sesuai peraturan KESDM RI.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
