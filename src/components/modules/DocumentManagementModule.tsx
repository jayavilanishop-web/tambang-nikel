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
  Upload,
  Video,
  FileCode,
  Cloud,
  CloudUpload,
  X,
  Check,
  HardDrive,
  Folder,
  RefreshCw,
  Sliders,
  Database,
  ExternalLink,
  Film
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

  // Document Repository Dataset State
  const [documentsList, setDocumentsList] = useState([
    { docId: 'DOC-RKAB-2026-v2.1', title: 'Laporan RKAB Teknis & Lingkungan ESDM 2026', category: 'ESDM_COMPLIANCE', type: 'PDF', version: 'v2.1', sizeMb: '14.2 MB', author: 'Ir. Bambang Wijaya (KTT)', approvalStatus: 'APPROVED', lastModified: '2026-08-01 14:20' },
    { docId: 'DOC-CAD-PIT-ALPHA-3D', title: 'Desain Mine Plan Pit Alpha Block 4 (DWG/CAD)', category: 'CAD_DRAWING', type: 'CAD_DWG', version: 'v3.0', sizeMb: '42.8 MB', author: 'Sutrisno (Chief Mine Plan)', approvalStatus: 'APPROVED', lastModified: '2026-07-28 09:15' },
    { docId: 'DOC-CTR-PERTA-2026', title: 'Kontrak Suplai BBM Solar B35 Pertamina Patra Niaga', category: 'CONTRACT', type: 'PDF_SIGNED', version: 'v1.0', sizeMb: '5.6 MB', author: 'Procurement Legal Team', approvalStatus: 'APPROVED_DIGITAL_SIGNED', lastModified: '2026-07-15 11:30' },
    { docId: 'DOC-OCR-SURVEY-042', title: 'Hasil Scan OCR Sertifikat Kalibrasi Total Station', category: 'OCR_SCANNED', type: 'SCAN_IMAGE', version: 'v1.0', sizeMb: '3.1 MB', author: 'Survey Dept Crew', approvalStatus: 'VERIFIED', lastModified: '2026-08-02 16:45' }
  ]);

  // Universal File Upload & Drag-and-Drop state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadSource, setUploadSource] = useState<'LOCAL' | 'CLOUD'>('LOCAL');
  const [selectedFileTypeFilter, setSelectedFileTypeFilter] = useState<'ALL' | 'PDF' | 'EXCEL' | 'IMAGE' | 'VIDEO' | 'CAD_DWG' | 'ZIP'>('ALL');
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // File Upload Form Input
  const [newDocCategory, setNewDocCategory] = useState<string>('ESDM_COMPLIANCE');
  const [newDocAuthor, setNewDocAuthor] = useState<string>('Mine Operations Team');

  // Pending Upload File Queue
  const [uploadQueue, setUploadQueue] = useState<Array<{
    id: string;
    name: string;
    size: string;
    type: 'PDF' | 'EXCEL' | 'IMAGE' | 'VIDEO' | 'CAD_DWG' | 'ZIP';
    category: string;
    progress: number;
    status: 'READY' | 'UPLOADING' | 'PARSED' | 'DONE';
    metaParsed?: string;
  }>>([
    { id: 'FILE-01', name: 'Pit_Alpha_Drone_Survey_HD.mp4', size: '240.5 MB', type: 'VIDEO', category: 'SURVEY_DRONE', progress: 100, status: 'PARSED', metaParsed: '4K 60FPS / 12 Min Duration / GPS Embedded' },
    { id: 'FILE-02', name: 'Assay_Lab_Sucofindo_Aug2026.xlsx', size: '3.8 MB', type: 'EXCEL', category: 'ORE_QUALITY', progress: 100, status: 'PARSED', metaParsed: '1,420 Samples / Ni 1.85% / Fe 38.2%' },
    { id: 'FILE-03', name: 'Pit_Highwall_Contour_Mesh_2026.dwg', size: '54.1 MB', type: 'CAD_DWG', category: 'MINE_DESIGN', progress: 100, status: 'PARSED', metaParsed: '18 Layers / UTM 51S WGS84' },
    { id: 'FILE-04', name: 'Geological_Core_Drill_Photos_Archive.zip', size: '128.4 MB', type: 'ZIP', category: 'EXPLORATION', progress: 100, status: 'PARSED', metaParsed: '24 Core Box Photos / Compressed ZIP' }
  ]);

  // Cloud Storage Integration Providers
  const [cloudProviders, setCloudProviders] = useState([
    { id: 'gdrive', name: 'Google Drive Enterprise', icon: '☁️', connected: true, account: 'mining-data@nickelsmart.ai', filesCount: 1420 },
    { id: 'onedrive', name: 'Microsoft OneDrive Pro', icon: '🔷', connected: true, account: 'ktt-archive@nickelsmart.co.id', filesCount: 890 },
    { id: 's3', name: 'AWS S3 Mining Data Bucket', icon: '🪣', connected: true, account: 's3://nickelsmart-esdm-vault-2026', filesCount: 12500 },
    { id: 'mining_cloud', name: 'NickelSmart Private Hybrid Cloud', icon: '⚡', connected: true, account: 'https://cloud.nickelsmart.app/vault', filesCount: 4280 }
  ]);

  // Handle Local File Selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArr: File[] = Array.from(e.target.files);
      const newItems = filesArr.map((f: File, idx: number) => {
        const ext = f.name.split('.').pop()?.toLowerCase() || '';
        let fileType: 'PDF' | 'EXCEL' | 'IMAGE' | 'VIDEO' | 'CAD_DWG' | 'ZIP' = 'PDF';
        let meta = 'Parsed metadata successfully';

        if (['xlsx', 'xls', 'csv'].includes(ext)) {
          fileType = 'EXCEL';
          meta = 'Data Spreadsheet Rows & Columns Parsed';
        } else if (['jpg', 'jpeg', 'png', 'webp', 'tiff'].includes(ext)) {
          fileType = 'IMAGE';
          meta = 'High-Res Photo / OCR Ready';
        } else if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
          fileType = 'VIDEO';
          meta = 'Drone Inspection Footage Streamable';
        } else if (['dwg', 'dxf', 'cad', '3ds'].includes(ext)) {
          fileType = 'CAD_DWG';
          meta = '3D AutoCAD Mesh & Spatial Layers';
        } else if (['zip', '7z', 'rar', 'gz'].includes(ext)) {
          fileType = 'ZIP';
          meta = 'Compressed Archive Package';
        }

        return {
          id: `FILE-${Date.now()}-${idx}`,
          name: f.name,
          size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
          type: fileType,
          category: newDocCategory,
          progress: 100,
          status: 'PARSED' as const,
          metaParsed: meta
        };
      });

      setUploadQueue(prev => [...newItems, ...prev]);
      setStatusNotice(`✓ ${filesArr.length} File Berhasil Dimuat & Dielaborasi Metadata-nya!`);
      setTimeout(() => setStatusNotice(null), 4000);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArr: File[] = Array.from(e.dataTransfer.files);
      const newItems = filesArr.map((f: File, idx: number) => {
        const ext = f.name.split('.').pop()?.toLowerCase() || '';
        let fileType: 'PDF' | 'EXCEL' | 'IMAGE' | 'VIDEO' | 'CAD_DWG' | 'ZIP' = 'PDF';
        let meta = 'Parsed metadata successfully';

        if (['xlsx', 'xls', 'csv'].includes(ext)) {
          fileType = 'EXCEL';
          meta = 'Data Spreadsheet Rows & Columns Parsed';
        } else if (['jpg', 'jpeg', 'png', 'webp', 'tiff'].includes(ext)) {
          fileType = 'IMAGE';
          meta = 'High-Res Photo / OCR Ready';
        } else if (['mp4', 'mov', 'avi', 'mkv'].includes(ext)) {
          fileType = 'VIDEO';
          meta = 'Drone Inspection Footage Streamable';
        } else if (['dwg', 'dxf', 'cad', '3ds'].includes(ext)) {
          fileType = 'CAD_DWG';
          meta = '3D AutoCAD Mesh & Spatial Layers';
        } else if (['zip', '7z', 'rar', 'gz'].includes(ext)) {
          fileType = 'ZIP';
          meta = 'Compressed Archive Package';
        }

        return {
          id: `FILE-${Date.now()}-${idx}`,
          name: f.name,
          size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
          type: fileType,
          category: newDocCategory,
          progress: 100,
          status: 'PARSED' as const,
          metaParsed: meta
        };
      });

      setUploadQueue(prev => [...newItems, ...prev]);
      setStatusNotice(`✓ ${filesArr.length} File Berhasil Dihapus/Dropped Ke Antrean Upload!`);
      setTimeout(() => setStatusNotice(null), 4000);
    }
  };

  // Commit Queue to Document Repository
  const handleSaveQueueToRepo = () => {
    if (uploadQueue.length === 0) return;

    const newDocs = uploadQueue.map((item) => ({
      docId: `DOC-${item.type}-${Math.floor(1000 + Math.random() * 9000)}`,
      title: item.name,
      category: item.category,
      type: item.type,
      version: 'v1.0',
      sizeMb: item.size,
      author: newDocAuthor,
      approvalStatus: 'VERIFIED',
      lastModified: new Date().toISOString().replace('T', ' ').substring(0, 16)
    }));

    setDocumentsList(prev => [...newDocs, ...prev]);
    setStatusNotice(`🚀 ${newDocs.length} File Berhasil Diunggah & Disimpan Ke Master Repositori EDMS Vault!`);
    setIsUploadModalOpen(false);
    setTimeout(() => setStatusNotice(null), 5000);
  };

  // Toggle Cloud Connection
  const handleToggleCloudConnect = (providerId: string) => {
    setCloudProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        return { ...p, connected: !p.connected };
      }
      return p;
    }));
    setStatusNotice('Koneksi Cloud Storage Berhasil Diperbarui!');
    setTimeout(() => setStatusNotice(null), 3000);
  };

  // Document Version History Dataset
  const versionHistory = [
    { version: 'v2.1', date: '2026-08-01 14:20', author: 'Ir. Bambang Wijaya', changeLog: 'Penyesuaian Kuota Produksi Bijih Nikel Rencana 5.2 Juta Ton', fileSize: '14.2 MB', status: 'ACTIVE_CURRENT' },
    { version: 'v2.0', date: '2026-07-20 10:15', author: 'Hendra Setiawan', changeLog: 'Tambahan Lampiran Peta Topografi Batas IUP & Settling Pond', fileSize: '12.8 MB', status: 'SUPERSEDED' },
    { version: 'v1.0', date: '2026-07-01 08:30', author: 'Hendra Setiawan', changeLog: 'Draft Awal Laporan RKAB 2026 Internal Review', fileSize: '10.5 MB', status: 'SUPERSEDED' }
  ];

  // Multi-Stage Approval Workflow Dataset
  const [approvalWorkflows, setApprovalWorkflows] = useState([
    { wfId: 'WF-2026-092', docTitle: 'Adendum Kontrak Jasa Pengangkutan Barging Jetty Berth B', currentStage: 'Stage 2: Persetujuan Direktur Keuangan', totalStages: '3 Stages', initiator: 'Procurement Lead', submitDate: '2026-08-02', status: 'PENDING_APPROVAL' },
    { wfId: 'WF-2026-091', docTitle: 'Laporan Hasil Inspeksi K3LH Pit Highwall Slope', currentStage: 'Stage 3: Persetujuan KTT (Kepala Teknik Tambang)', totalStages: '3 Stages', initiator: 'Safety Inspector', submitDate: '2026-08-01', status: 'APPROVED' }
  ]);

  // Digital Signatures Verification Dataset
  const [digitalSignatures, setDigitalSignatures] = useState([
    { sigId: 'SIG-SHA256-8812', signerName: 'Ir. Bambang Wijaya', roleTitle: 'Kepala Teknik Tambang (KTT)', certAuthority: 'BSrE / e-Sign KESDM Certified', timestamp: '2026-08-01 14:22:05 WIB', hashVerification: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', status: 'VALID_VERIFIED' }
  ]);

  // OCR Text Extraction Dataset
  const [ocrExtractions, setOcrExtractions] = useState([
    { scanId: 'OCR-2026-102', docName: 'Surat Izin Mengangkut Bahan Peledakan (SIMP-ANFO)', extractedFields: { nomorIzin: 'SIMP/1042/ESDM/2026', masaBerlaku: '2027-08-01', instansi: 'Direktorat Teknik Tambang KESDM', confidenceScore: '99.4%' }, scanDate: '2026-08-02 11:10' }
  ]);

  // CAD / Technical Drawings Metadata Dataset
  const [cadDrawings, setCadDrawings] = useState([
    { cadId: 'CAD-DWG-ALPHA-2026', title: 'Cross-Section Geologi & Contour Elevation Pit Alpha', format: 'AutoCAD DWG / DXF 3D', layersCount: 18, projection: 'UTM Zone 51S (WGS 84)', engineer: 'Mine Geologist & Survey Team', status: 'RELEASED_FOR_MINING' }
  ]);

  // Contracts & Mining Leases Dataset
  const [contractsLeases, setContractsLeases] = useState([
    { contractId: 'CTR-IUP-2022-88', title: 'Izin Usaha Pertambangan (IUP) Operasi Produksi Nikel', partner: 'Kementerian ESDM Republik Indonesia', startDate: '2022-05-10', expiryDate: '2042-05-10', valueUsd: 'N/A (Government Permit)', status: 'ACTIVE_COMPLIANT' },
    { contractId: 'CTR-LEASE-LAND-041', title: 'Sewa Lahan Pelabuhan Jetty & Stockpile Rom', partner: 'Masyarakat Adat & Pemda Lokal', startDate: '2024-01-01', expiryDate: '2034-01-01', valueUsd: '$1,200,000 USD', status: 'ACTIVE_COMPLIANT' }
  ]);

  // Modal Viewer State
  const [viewingDoc, setViewingDoc] = useState<any>(null);
  const [cadActiveLayer, setCadActiveLayer] = useState({ contour: true, pitBoundary: true, settlingPond: true, blockModel: true });

  // Approve Workflow
  const handleApproveWorkflow = (wfId: string) => {
    setApprovalWorkflows(prev => prev.map(w => w.wfId === wfId ? { ...w, status: 'APPROVED', currentStage: 'Selesai Disetujui' } : w));
    alert('✓ Dokumen Berhasil Disetujui & Diberi Stempel Tanda Tangan Digital!');
  };

  // Reject Workflow
  const handleRejectWorkflow = (wfId: string) => {
    setApprovalWorkflows(prev => prev.map(w => w.wfId === wfId ? { ...w, status: 'REJECTED', currentStage: 'Ditolak (Perlu Revisi)' } : w));
    alert('✕ Dokumen Dikembalikan Ke Pemohon Untuk Revisi.');
  };

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

      {/* Status Notification Toast */}
      {statusNotice && (
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950 to-teal-900 border border-emerald-500/40 text-emerald-200 text-xs font-mono shadow-xl flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-bold">{statusNotice}</span>
          </div>
          <button onClick={() => setStatusNotice(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Module Navigation Sub-Tabs covering all Document keywords */}
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Pusat Repositori Master Dokumen Tambang Nikel</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Dukungan format: PDF, Excel, Image, Video, CAD / DWG, ZIP, dan Cloud Storage Sync.</p>
              </div>
              <button 
                onClick={() => setIsUploadModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-950/50 transition-all shrink-0"
              >
                <CloudUpload className="w-4 h-4 text-blue-200" />
                <span>Upload File & Cloud Sync</span>
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
                    <th className="py-2.5 px-3">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {documentsList.map((doc) => (
                    <tr key={doc.docId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-blue-400">{doc.docId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{doc.title}</td>
                      <td className="py-3 px-3 font-sans text-emerald-300">{doc.category}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          {doc.type}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-200">{doc.version}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{doc.author}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {doc.approvalStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button 
                          onClick={() => setViewingDoc(doc)}
                          className="px-2.5 py-1 bg-blue-600/80 hover:bg-blue-500 text-white font-bold rounded text-[10px] flex items-center gap-1 shadow transition-all"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Preview</span>
                        </button>
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
                    <th className="py-2.5 px-3">Aksi Persetujuan</th>
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
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          w.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400' : 
                          w.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {w.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 flex items-center gap-2">
                        {w.status === 'PENDING_APPROVAL' ? (
                          <>
                            <button onClick={() => handleApproveWorkflow(w.wfId)} className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[10px]">Setujui</button>
                            <button onClick={() => handleRejectWorkflow(w.wfId)} className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded text-[10px]">Tolak</button>
                          </>
                        ) : (
                          <span className="text-slate-500 text-[10px]">Tindakan Selesai</span>
                        )}
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

      {/* ==================================================================== */}
      {/* UNIVERSAL MULTI-FORMAT FILE UPLOAD & CLOUD STORAGE MODAL */}
      {/* ==================================================================== */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 space-y-0">
            
            {/* Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                  <CloudUpload className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-100">
                    Upload File Multiformat & Cloud Storage Integration
                  </h2>
                  <p className="text-xs text-slate-400">
                    Unggah & Parsing Otomatis: PDF, Excel, Image, Video, CAD/DWG, ZIP, dan Cloud Sync.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Source Toggle Tabs: Local Computer vs Cloud Storage */}
            <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setUploadSource('LOCAL')}
                  className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                    uploadSource === 'LOCAL'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <HardDrive className="w-4 h-4" />
                  <span>File Komputer / Local</span>
                </button>

                <button
                  onClick={() => setUploadSource('CLOUD')}
                  className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
                    uploadSource === 'CLOUD'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Cloud className="w-4 h-4" />
                  <span>Cloud Storage Sync</span>
                </button>
              </div>

              {/* Supported Format Badges */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 flex items-center gap-1">
                  <FileText className="w-3 h-3" /> PDF
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1">
                  <FileSpreadsheet className="w-3 h-3" /> EXCEL
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> IMAGE
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center gap-1">
                  <Film className="w-3 h-3" /> VIDEO
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 flex items-center gap-1">
                  <Compass className="w-3 h-3" /> CAD/DWG
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 flex items-center gap-1">
                  <FolderArchive className="w-3 h-3" /> ZIP
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              {/* LOCAL FILE DRAG & DROP ZONE */}
              {uploadSource === 'LOCAL' && (
                <div className="space-y-5">
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                      isDragging 
                        ? 'border-blue-400 bg-blue-950/30 scale-[1.01]' 
                        : 'border-slate-700 hover:border-slate-500 bg-slate-950/50'
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={handleFileSelect}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    <div className="space-y-3 pointer-events-none">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                        <Upload className="w-6 h-6" />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-100">
                          Tarik & Lepaskan File Di Sini (Drag & Drop)
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Atau <span className="text-blue-400 font-bold underline">Klik Untuk Memilih File</span> Dari Komputer Anda
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-500 font-mono">
                        Mendukung Gambar, Rekaman Video Drone, Laporan PDF, Spreadsheet Excel, AutoCAD DWG 3D, Archive ZIP (Ukuran Maksimal per File: 2GB)
                      </div>
                    </div>
                  </div>

                  {/* Document Category & Author Metadata Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold block">Kategori Dokumen Tambang:</label>
                      <select
                        value={newDocCategory}
                        onChange={(e) => setNewDocCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                      >
                        <option value="ESDM_COMPLIANCE">ESDM Compliance & RKAB</option>
                        <option value="CAD_DRAWING">CAD / DWG Design Pit Mine Plan</option>
                        <option value="SURVEY_DRONE">Hasil Survei Topografi & Drone Footage</option>
                        <option value="ORE_QUALITY">Laboratorium Kualitas Ore & Assay</option>
                        <option value="CONTRACT">Kontrak Legal & Perjanjian IUP</option>
                        <option value="EXPLORATION">Eksplorasi & Log Core Drill</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-slate-300 font-bold block">Penyunting / Departemen Penulis:</label>
                      <input
                        type="text"
                        value={newDocAuthor}
                        onChange={(e) => setNewDocAuthor(e.target.value)}
                        placeholder="Contoh: KTT / Mine Geologist / Engineering"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Upload Queue List */}
                  {uploadQueue.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Daftar File Dalam Antrean ({uploadQueue.length} File Loaded)</span>
                        </h4>
                        <button
                          onClick={() => setUploadQueue([])}
                          className="text-[11px] text-rose-400 hover:underline font-mono"
                        >
                          Bersihkan Antrean
                        </button>
                      </div>

                      <div className="space-y-2 max-h-56 overflow-y-auto custom-scrollbar">
                        {uploadQueue.map((item) => (
                          <div
                            key={item.id}
                            className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 shrink-0">
                                {item.type === 'PDF' && <FileText className="w-4 h-4 text-rose-400" />}
                                {item.type === 'EXCEL' && <FileSpreadsheet className="w-4 h-4 text-emerald-400" />}
                                {item.type === 'IMAGE' && <ImageIcon className="w-4 h-4 text-indigo-400" />}
                                {item.type === 'VIDEO' && <Film className="w-4 h-4 text-amber-400" />}
                                {item.type === 'CAD_DWG' && <Compass className="w-4 h-4 text-blue-400" />}
                                {item.type === 'ZIP' && <FolderArchive className="w-4 h-4 text-purple-400" />}
                              </div>

                              <div className="min-w-0">
                                <strong className="text-slate-100 font-bold block truncate">{item.name}</strong>
                                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                                  <span>{item.size}</span>
                                  <span>•</span>
                                  <span className="text-emerald-400 font-bold">{item.metaParsed}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 font-mono">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ✓ READY
                              </span>
                              <button
                                onClick={() => setUploadQueue(prev => prev.filter(q => q.id !== item.id))}
                                className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-slate-900"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* CLOUD STORAGE CONNECTOR PANEL */}
              {uploadSource === 'CLOUD' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-indigo-200 text-xs">
                    <strong className="font-bold flex items-center gap-2 text-indigo-300 mb-1">
                      <Cloud className="w-4 h-4" /> Integrasi Cloud Storage Otomatis & Terenkripsi
                    </strong>
                    <p className="text-slate-300 text-[11px]">
                      Hubungkan akun Google Drive, Microsoft OneDrive, AWS S3 Mining Bucket, atau NickelSmart Private Cloud untuk melakukan otomasisasi sinkronisasi berkas tambang secara real-time.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cloudProviders.map((provider) => (
                      <div
                        key={provider.id}
                        className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{provider.icon}</span>
                            <div>
                              <h4 className="font-bold text-slate-100 text-xs">{provider.name}</h4>
                              <span className="text-[10px] text-slate-400 font-mono">{provider.account}</span>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            provider.connected 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {provider.connected ? '✓ CONNECTED' : 'DISCONNECTED'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                          <span className="text-slate-400 font-mono text-[11px]">
                            {(provider.filesCount ?? 0).toLocaleString()} File Terdeteksi
                          </span>
                          <button
                            onClick={() => handleToggleCloudConnect(provider.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              provider.connected
                                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                            }`}
                          >
                            {provider.connected ? 'Putuskan' : 'Hubungkan Cloud'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer Controls */}
            <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {uploadSource === 'LOCAL' 
                  ? `${uploadQueue.length} File Dalam Queue Siap Disimpan` 
                  : '4 Penyedia Cloud Storage Aktif'}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Batal
                </button>

                <button
                  onClick={handleSaveQueueToRepo}
                  disabled={uploadQueue.length === 0 && uploadSource === 'LOCAL'}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Unggah & Simpan Ke Repositori Master</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* INTERACTIVE DOCUMENT / CAD / OCR PREVIEWER MODAL */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold uppercase">{viewingDoc.type || 'DOCUMENT'}</span>
                <h3 className="font-bold text-slate-100 text-sm mt-1">{viewingDoc.title}</h3>
              </div>
              <button onClick={() => setViewingDoc(null)} className="p-2 text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            {/* CAD DWG BLUEPRINT SIMULATOR */}
            {(viewingDoc.type === 'CAD_DWG' || viewingDoc.category === 'CAD_DRAWING') ? (
              <div className="space-y-4 text-xs">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[10px]">
                  <strong className="text-slate-400 self-center">Layer Blueprint CAD:</strong>
                  <label className="flex items-center gap-1 text-slate-300"><input type="checkbox" checked={cadActiveLayer.contour} onChange={e => setCadActiveLayer({...cadActiveLayer, contour: e.target.checked})} /> Elevasi Kontur Pitch</label>
                  <label className="flex items-center gap-1 text-slate-300"><input type="checkbox" checked={cadActiveLayer.pitBoundary} onChange={e => setCadActiveLayer({...cadActiveLayer, pitBoundary: e.target.checked})} /> Batas Pit Alpha</label>
                  <label className="flex items-center gap-1 text-slate-300"><input type="checkbox" checked={cadActiveLayer.settlingPond} onChange={e => setCadActiveLayer({...cadActiveLayer, settlingPond: e.target.checked})} /> Kolam Endapan Settling Pond</label>
                  <label className="flex items-center gap-1 text-slate-300"><input type="checkbox" checked={cadActiveLayer.blockModel} onChange={e => setCadActiveLayer({...cadActiveLayer, blockModel: e.target.checked})} /> Model Blok Kadar Ni</label>
                </div>

                <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 relative h-80 flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full text-blue-500 opacity-80" viewBox="0 0 500 300">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    {cadActiveLayer.contour && (
                      <path d="M 50 200 Q 150 100 250 180 T 450 120 M 30 250 Q 180 140 280 220 T 470 160" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
                    )}
                    {cadActiveLayer.pitBoundary && (
                      <polygon points="100,80 380,60 420,240 120,220" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="2" />
                    )}
                    {cadActiveLayer.settlingPond && (
                      <ellipse cx="380" cy="200" rx="30" ry="20" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="2" />
                    )}
                    {cadActiveLayer.blockModel && (
                      <g fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="1">
                        <rect x="180" y="100" width="30" height="30" />
                        <rect x="210" y="100" width="30" height="30" />
                        <rect x="240" y="100" width="30" height="30" />
                        <rect x="180" y="130" width="30" height="30" />
                        <rect x="210" y="130" width="30" height="30" />
                      </g>
                    )}
                  </svg>
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-[10px] text-slate-300">
                    Sistem Koordinat: UTM Zone 51S • Skala 1:2500
                  </div>
                </div>
              </div>
            ) : (
              /* STANDARD PDF / DOCUMENT VIEWER SIMULATOR */
              <div className="space-y-4 text-xs">
                <div className="p-8 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 space-y-3 font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-[11px]">
                    <span className="text-blue-400 font-bold">SHA-256 Checksum: e3b0c44298fc1c149afbf4c8996fb92...</span>
                    <span className="text-emerald-400 font-bold">STATUS: TERVERIFIKASI ASLI</span>
                  </div>
                  <div className="p-6 bg-slate-900 rounded-xl space-y-2 font-sans">
                    <h4 className="font-bold text-slate-100 text-sm">{viewingDoc.title}</h4>
                    <p className="text-slate-400 leading-relaxed text-xs">
                      Dokumen resmi terdaftar di bawah pengawasan KTT (Kepala Teknik Tambang) dan terenkripsi menggunakan sertifikat e-Sign KESDM.
                    </p>
                    <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>Penulis: {viewingDoc.author || 'Tim Legal / Geologi'}</span>
                      <span>Versi: {viewingDoc.version || 'v1.0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <button onClick={() => alert('File dokumen berhasil diunduh!')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-2">
                <Download className="w-4 h-4" /> Unduh Dokumen Master
              </button>
              <button onClick={() => setViewingDoc(null)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl font-bold text-xs">Tutup Viewer</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
