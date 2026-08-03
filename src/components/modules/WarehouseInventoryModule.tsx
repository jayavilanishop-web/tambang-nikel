import React, { useState } from 'react';
import { 
  Warehouse, 
  Package, 
  QrCode, 
  Barcode, 
  Boxes, 
  ArrowLeftRight, 
  Truck, 
  FileCheck2, 
  ClipboardCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Printer, 
  DollarSign, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  Tag, 
  History, 
  Scan, 
  FileText, 
  Sliders 
} from 'lucide-react';
import { Language } from '../../types';

interface WarehouseInventoryModuleProps {
  language: Language;
}

export const WarehouseInventoryModule: React.FC<WarehouseInventoryModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'inventory_stock'
    | 'barcode_qr_scan'
    | 'warehouse_locations'
    | 'goods_receiving'
    | 'goods_issue'
    | 'stock_transfer'
    | 'stock_opname'
    | 'fifo_batch_expiry'
  >('inventory_stock');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('ALL');
  const [scannedCode, setScannedCode] = useState<string>('QR-PART-2026-8841');
  const [scanResult, setScanResult] = useState<any>(null);

  // Warehouse Site Locations
  const warehouseLocations = [
    { id: 'WH-MAIN-SITE', name: 'Gudang Utama Central Workshop (Site Alpha)', code: 'WH-01', manager: 'Suryanto (Warehouse Head)', totalBins: 450, occupiedPct: 84, category: 'Main Heavy Parts & Lubricants' },
    { id: 'WH-PIT-DEPOT', name: 'Depot Fast-Moving Pit Alpha', code: 'WH-02', manager: 'Bambang (Pit Storeman)', totalBins: 120, occupiedPct: 92, category: 'Filters, O-Rings, Fasteners' },
    { id: 'WH-JETTY-STORE', name: 'Gudang Logistik Port Jetty Terminal', code: 'WH-03', manager: 'Dedi (Jetty Storekeeper)', totalBins: 200, occupiedPct: 65, category: 'Barging Spares, Safety Gear' },
    { id: 'WH-EXPLOSIVE-MAG', name: 'Gudang Bahan Peledak (Magazine Store)', code: 'WH-04', manager: 'Kapten Haryono (Blasting Store Officer)', totalBins: 40, occupiedPct: 45, category: 'ANFO, Boosters, Detonators' }
  ];

  // Inventory Stock Dataset with FIFO, Batch & Expiry
  const inventoryItems = [
    { 
      itemCode: 'SKU-TYRE-777E', 
      barcode: '899100234812', 
      qrCode: 'QR-PART-2026-8841', 
      description: 'Ban OTR 27.00R49 Bridgestone VSDL (Dump Truck CAT 777E)', 
      category: 'Heavy OTR Tyre', 
      warehouse: 'WH-MAIN-SITE', 
      binRack: 'RACK-TYRE-A04', 
      stockOnHand: 18, 
      minStock: 8, 
      maxStock: 30, 
      unit: 'PCS', 
      fifoValueUsd: 14200, 
      batchNo: 'BATCH-BS-202604', 
      mfgDate: '2026-01-15', 
      expiryDate: '2031-01-15', 
      expiryStatus: 'HEALTHY' 
    },
    { 
      itemCode: 'SKU-FLTR-HYD-KOM', 
      barcode: '899100239910', 
      qrCode: 'QR-PART-2026-9921', 
      description: 'Filter Element Hydraulic Main Return Komatsu PC2000', 
      category: 'Filters & Separation', 
      warehouse: 'WH-PIT-DEPOT', 
      binRack: 'BIN-FLT-B12', 
      stockOnHand: 42, 
      minStock: 15, 
      maxStock: 80, 
      unit: 'PCS', 
      fifoValueUsd: 220, 
      batchNo: 'BATCH-KM-202602', 
      mfgDate: '2025-11-20', 
      expiryDate: '2028-11-20', 
      expiryStatus: 'HEALTHY' 
    },
    { 
      itemCode: 'SKU-LUB-DELO-400', 
      barcode: '899100554123', 
      qrCode: 'QR-LUB-2026-1102', 
      description: 'Oli Mesin Heavy Duty Chevron Delo 400 SAE 15W-40 (Drum 208L)', 
      category: 'Lubricants & Grease', 
      warehouse: 'WH-MAIN-SITE', 
      binRack: 'DRUM-BAY-C01', 
      stockOnHand: 65, 
      minStock: 20, 
      maxStock: 100, 
      unit: 'DRUM', 
      fifoValueUsd: 850, 
      batchNo: 'BATCH-CHV-202509', 
      mfgDate: '2025-09-01', 
      expiryDate: '2027-09-01', 
      expiryStatus: 'EXPIRY_NEAR_180_DAYS' 
    },
    { 
      itemCode: 'SKU-REAGENT-XANTHATE', 
      barcode: '899100778811', 
      qrCode: 'QR-CHEM-2026-4401', 
      description: 'Reagen Kimia Flotasi Potassium Amyl Xanthate (PAX 90%)', 
      category: 'Chemical Reagents', 
      warehouse: 'WH-JETTY-STORE', 
      binRack: 'HAZMAT-BAY-H02', 
      stockOnHand: 14, 
      minStock: 10, 
      maxStock: 50, 
      unit: 'TON', 
      fifoValueUsd: 2400, 
      batchNo: 'BATCH-PAX-202503', 
      mfgDate: '2025-03-10', 
      expiryDate: '2026-09-10', 
      expiryStatus: 'CRITICAL_EXPIRY_30_DAYS' 
    }
  ];

  // Goods Receiving GRN Dataset
  const receivingOrders = [
    { grnNo: 'GRN-2026-0811', poNo: 'PO-2026-0412', supplier: 'PT Trakindo Utama (Caterpillar)', receiveDate: '2026-08-02', itemsCount: 14, totalValuationUsd: 145000, inspector: 'Eko (QC Inspector)', status: 'RECEIVED_COMPLETED' },
    { grnNo: 'GRN-2026-0812', poNo: 'PO-2026-0415', supplier: 'PT United Tractors Tbk (Komatsu)', receiveDate: '2026-08-03', itemsCount: 8, totalValuationUsd: 68000, inspector: 'Sutrisno (Warehouse)', status: 'IN_INSPECTION' }
  ];

  // Goods Issue GIS Dataset
  const issuingSlips = [
    { gisNo: 'GIS-2026-1102', woNo: 'WO-2026-0412', issuedTo: 'Mekanik Bambang (Service DT-1001)', issueDate: '2026-08-03 08:30', itemIssued: 'Oli Delo 400 (2 Drum) & Filter Oil', costCenter: 'CC-MAINT-FLEET', status: 'ISSUED' },
    { gisNo: 'GIS-2026-1103', woNo: 'WO-2026-0413', issuedTo: 'Tim Blasting Pit Beta', issueDate: '2026-08-03 09:15', itemIssued: 'ANFO Ammonium Nitrate (2.5 Ton)', costCenter: 'CC-PIT-BLASTING', status: 'ISSUED' }
  ];

  // Stock Transfer Orders Dataset
  const stockTransfers = [
    { transferNo: 'TRF-2026-0301', fromWh: 'Gudang Utama Central', toWh: 'Depot Pit Alpha', itemCode: 'SKU-FLTR-HYD-KOM', qty: 10, reqBy: 'Pit Supervisor Hendra', status: 'IN_TRANSIT' },
    { transferNo: 'TRF-2026-0302', fromWh: 'Gudang Utama Central', toWh: 'Gudang Jetty Terminal', itemCode: 'SKU-LUB-DELO-400', qty: 4, reqBy: 'Jetty Head Dedi', status: 'DELIVERED' }
  ];

  // Stock Opname Audit Variance Dataset
  const stockOpnameAudit = [
    { auditId: 'SO-2026-Q3', whCode: 'WH-MAIN-SITE', itemCode: 'SKU-TYRE-777E', systemQty: 18, physicalQty: 18, varianceQty: 0, varianceValUsd: 0, auditDate: '2026-08-01', status: 'MATCHED' },
    { auditId: 'SO-2026-Q3', whCode: 'WH-PIT-DEPOT', itemCode: 'SKU-FLTR-HYD-KOM', systemQty: 42, physicalQty: 41, varianceQty: -1, varianceValUsd: -220, auditDate: '2026-08-01', status: 'DISCREPANCY_APPROVED' }
  ];

  const handleSimulateScan = () => {
    const found = inventoryItems.find(i => i.qrCode === scannedCode || i.barcode === scannedCode || i.itemCode === scannedCode);
    if (found) {
      setScanResult(found);
    } else {
      setScanResult({ error: 'Kode Barcode / QR Code tidak ditemukan di database gudang!' });
    }
  };

  const filteredInventory = inventoryItems.filter(item => {
    const matchWh = selectedWarehouse === 'ALL' || item.warehouse === selectedWarehouse;
    const matchSearch = item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchWh && matchSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Mining Logistics & Warehouse Management System
            </span>
            <span className="text-slate-400 text-xs">• ISO 9001 / ISO 28000 Supply Chain</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Manajemen Gudang, Inventaris, Barcode/QR & Batch FIFO
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pengawasan pergudangan tambang nikel: Pemindaian Barcode & QR Code, Penerimaan Barang (GRN), Pengeluaran (GIS), Transfer Antar-Gudang, Stock Opname Fisik, Valuasi FIFO, dan Manajemen Masa Kadaluarsa (Expiry Date).
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <Warehouse className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Valuasi Stok FIFO Gudang Site:</span>
            <strong className="text-slate-100 font-mono text-base font-bold">$1,248,500 USD</strong>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs covering all 13 requested keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'inventory_stock', label: 'Stok Inventaris (Stock Level)', icon: Package },
          { id: 'barcode_qr_scan', label: 'Scan Barcode & QR Code', icon: QrCode },
          { id: 'warehouse_locations', label: 'Lokasi Gudang (Warehouse)', icon: Warehouse },
          { id: 'goods_receiving', label: 'Penerimaan Barang (Receiving GRN)', icon: FileCheck2 },
          { id: 'goods_issue', label: 'Pengeluaran Barang (Issue GIS)', icon: FileText },
          { id: 'stock_transfer', label: 'Transfer Stok (Stock Transfer)', icon: ArrowLeftRight },
          { id: 'stock_opname', label: 'Stock Opname (Physical Count)', icon: ClipboardCheck },
          { id: 'fifo_batch_expiry', label: 'Valuasi FIFO, Batch & Kadaluarsa', icon: Calendar }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INVENTORY STOCK */}
      {activeTab === 'inventory_stock' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari SKU, nama sparepart, kategori..."
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-full sm:w-64"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto custom-scrollbar">
              <span className="text-slate-400 shrink-0">Filter Gudang:</span>
              <select
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                <option value="ALL">Semua Gudang Site</option>
                {warehouseLocations.map(w => (
                  <option key={w.id} value={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden text-xs">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="p-3">Kode SKU / QR Barcode</th>
                    <th className="p-3">Deskripsi Sparepart & Komponen</th>
                    <th className="p-3">Kategori</th>
                    <th className="p-3">Gudang & Bin Rack</th>
                    <th className="p-3">Stok Aktual (Stock)</th>
                    <th className="p-3">Batas Reorder Min</th>
                    <th className="p-3">Harga FIFO (USD)</th>
                    <th className="p-3 text-right">Status Stok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-200">
                  {filteredInventory.map((item) => (
                    <tr key={item.itemCode} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <strong className="text-emerald-400 block font-sans">{item.itemCode}</strong>
                        <span className="text-[10px] text-slate-400">{item.qrCode}</span>
                      </td>
                      <td className="p-3 font-sans font-bold text-slate-100">{item.description}</td>
                      <td className="p-3 font-sans text-emerald-300">{item.category}</td>
                      <td className="p-3 font-sans">
                        <span className="text-slate-200 block">{item.warehouse}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{item.binRack}</span>
                      </td>
                      <td className="p-3 font-bold text-slate-100 text-sm">{item.stockOnHand} {item.unit}</td>
                      <td className="p-3 text-slate-400">{item.minStock} {item.unit}</td>
                      <td className="p-3 text-amber-300">${item.fifoValueUsd.toLocaleString('en-US')}</td>
                      <td className="p-3 text-right">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-sans font-bold uppercase ${
                          item.stockOnHand > item.minStock
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
                        }`}>
                          {item.stockOnHand > item.minStock ? 'STOK AMAN' : 'REORDER REQUIRED'}
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

      {/* TAB 2: BARCODE & QR SCANNER SIMULATION */}
      {activeTab === 'barcode_qr_scan' && (
        <div className="space-y-6 text-xs">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Scan className="w-5 h-5 text-emerald-400" />
              <div>
                <h3 className="font-bold text-slate-100 text-base">Pemindai & Generator QR Code / Barcode Gudang</h3>
                <p className="text-slate-400 text-[11px]">Identifikasi Cepat Komponen, Bin Rack, Batch Lot & Masa Kadaluarsa</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scan Input Simulation */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <label className="text-slate-300 font-bold block">Input atau Scan Kode QR / Barcode SKU:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={scannedCode}
                    onChange={(e) => setScannedCode(e.target.value)}
                    placeholder="Contoh: QR-PART-2026-8841 atau 899100234812"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-100 font-mono w-full focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleSimulateScan}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shrink-0 flex items-center gap-1.5"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Scan Now</span>
                  </button>
                </div>

                <div className="pt-2 text-slate-400 text-[11px]">
                  <p className="font-bold text-slate-300 mb-1">Contoh Kode Siap Scan:</p>
                  <ul className="list-disc list-inside space-y-1 font-mono text-emerald-400">
                    <li className="cursor-pointer" onClick={() => setScannedCode('QR-PART-2026-8841')}>QR-PART-2026-8841 (Ban OTR CAT 777E)</li>
                    <li className="cursor-pointer" onClick={() => setScannedCode('QR-PART-2026-9921')}>QR-PART-2026-9921 (Filter Komatsu PC2000)</li>
                    <li className="cursor-pointer" onClick={() => setScannedCode('QR-LUB-2026-1102')}>QR-LUB-2026-1102 (Oli Chevron Delo Drum)</li>
                  </ul>
                </div>
              </div>

              {/* Scan Result Card */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-slate-100 border-b border-slate-800 pb-2">Hasil Pemindaian Telemetri Gudang:</h4>
                {scanResult ? (
                  scanResult.error ? (
                    <div className="p-3 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-lg font-bold">
                      {scanResult.error}
                    </div>
                  ) : (
                    <div className="space-y-2 text-slate-300 text-[11px]">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center gap-3">
                        <QrCode className="w-10 h-10 text-emerald-400 shrink-0" />
                        <div>
                          <strong className="text-slate-100 text-sm block">{scanResult.description}</strong>
                          <span className="font-mono text-emerald-400 font-bold">{scanResult.itemCode}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 font-mono">
                        <div>Gudang: <strong className="text-slate-100">{scanResult.warehouse}</strong></div>
                        <div>Bin Rack: <strong className="text-slate-100">{scanResult.binRack}</strong></div>
                        <div>Stok Saat Ini: <strong className="text-emerald-400 font-bold">{scanResult.stockOnHand} {scanResult.unit}</strong></div>
                        <div>Valuasi FIFO: <strong className="text-amber-300">${scanResult.fifoValueUsd}</strong></div>
                        <div>Batch No: <strong className="text-slate-200">{scanResult.batchNo}</strong></div>
                        <div>Expired Date: <strong className="text-rose-400">{scanResult.expiryDate}</strong></div>
                      </div>
                    </div>
                  )
                ) : (
                  <p className="text-slate-500 italic">Tekan tombol 'Scan Now' untuk memverifikasi detail sparepart...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WAREHOUSE LOCATIONS */}
      {activeTab === 'warehouse_locations' && (
        <div className="space-y-6 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {warehouseLocations.map((wh) => (
              <div key={wh.id} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <div>
                    <strong className="text-slate-100 text-sm font-bold block">{wh.name}</strong>
                    <span className="text-slate-400 text-[10px]">Kode: {wh.code}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-bold font-mono">
                    {wh.id}
                  </span>
                </div>

                <div className="space-y-1 text-slate-300 text-[11px]">
                  <p>Kepala Gudang: <strong className="text-slate-100">{wh.manager}</strong></p>
                  <p>Kategori Penyimpanan: <strong className="text-emerald-400">{wh.category}</strong></p>
                  <p>Kapasitas Rak (Bins): <strong className="text-slate-200 font-mono">{wh.totalBins} Bins</strong></p>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Kapasitas Terpakai:</span>
                    <span className="font-mono text-emerald-400 font-bold">{wh.occupiedPct}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${wh.occupiedPct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GOODS RECEIVING (GRN) */}
      {activeTab === 'goods_receiving' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Penerimaan Barang Masuk (Goods Receipt Note - GRN)</h3>
              <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Buat GRN Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. GRN</th>
                    <th className="py-2.5 px-3">No. Purchase Order (PO)</th>
                    <th className="py-2.5 px-3">Vendor / Pemasok</th>
                    <th className="py-2.5 px-3">Tgl Terima</th>
                    <th className="py-2.5 px-3">Item Count</th>
                    <th className="py-2.5 px-3">Total Valuasi (USD)</th>
                    <th className="py-2.5 px-3">Status Quality Check</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {receivingOrders.map((grn) => (
                    <tr key={grn.grnNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{grn.grnNo}</td>
                      <td className="py-3 px-3 text-slate-300">{grn.poNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{grn.supplier}</td>
                      <td className="py-3 px-3 text-slate-400">{grn.receiveDate}</td>
                      <td className="py-3 px-3 text-slate-200">{grn.itemsCount} SKU</td>
                      <td className="py-3 px-3 text-amber-300">${grn.totalValuationUsd.toLocaleString('en-US')}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {grn.status}
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

      {/* TAB 5: GOODS ISSUE (GIS) */}
      {activeTab === 'goods_issue' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pengeluaran Barang & Sparepart Perawatan (Goods Issue Slip - GIS)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. GIS</th>
                    <th className="py-2.5 px-3">No. SPK Maintenance (WO)</th>
                    <th className="py-2.5 px-3">Penerima Komponen</th>
                    <th className="py-2.5 px-3">Deskripsi Barang Issued</th>
                    <th className="py-2.5 px-3">Cost Center</th>
                    <th className="py-2.5 px-3">Status GIS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {issuingSlips.map((gis) => (
                    <tr key={gis.gisNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{gis.gisNo}</td>
                      <td className="py-3 px-3 text-slate-300">{gis.woNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{gis.issuedTo}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{gis.itemIssued}</td>
                      <td className="py-3 px-3 text-amber-300">{gis.costCenter}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {gis.status}
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

      {/* TAB 6: STOCK TRANSFER */}
      {activeTab === 'stock_transfer' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Transfer Stok Antar-Gudang Site Tambang (Inter-Warehouse Stock Transfer)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Transfer</th>
                    <th className="py-2.5 px-3">Gudang Asal (From)</th>
                    <th className="py-2.5 px-3">Gudang Tujuan (To)</th>
                    <th className="py-2.5 px-3">Kode SKU</th>
                    <th className="py-2.5 px-3">Jumlah Transfer</th>
                    <th className="py-2.5 px-3">Status Kirim</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {stockTransfers.map((st) => (
                    <tr key={st.transferNo} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{st.transferNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{st.fromWh}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{st.toWh}</td>
                      <td className="py-3 px-3 text-slate-200">{st.itemCode}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{st.qty} Unit</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          st.status === 'DELIVERED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {st.status}
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

      {/* TAB 7: STOCK OPNAME */}
      {activeTab === 'stock_opname' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Stock Opname Fisik & Analisis Variansi Stok Gudang (Audit Reconciliation)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Audit ID</th>
                    <th className="py-2.5 px-3">Gudang</th>
                    <th className="py-2.5 px-3">Kode SKU</th>
                    <th className="py-2.5 px-3">Stok Sistem</th>
                    <th className="py-2.5 px-3">Stok Fisik Audit</th>
                    <th className="py-2.5 px-3">Selisih (Variance)</th>
                    <th className="py-2.5 px-3">Status Reconcile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {stockOpnameAudit.map((so, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{so.auditId}</td>
                      <td className="py-3 px-3 text-slate-300">{so.whCode}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{so.itemCode}</td>
                      <td className="py-3 px-3 text-slate-200">{so.systemQty}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{so.physicalQty}</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">{so.varianceQty} PCS</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {so.status}
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

      {/* TAB 8: FIFO, BATCH & EXPIRY */}
      {activeTab === 'fifo_batch_expiry' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Valuasi Metode FIFO, Nomor Batch Lot & Manajemen Masa Kadaluarsa (Expiry Control)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Kode SKU</th>
                    <th className="py-2.5 px-3">Nomor Batch / Lot</th>
                    <th className="py-2.5 px-3">Tgl Produksi (Mfg)</th>
                    <th className="py-2.5 px-3">Tgl Kadaluarsa (Expiry)</th>
                    <th className="py-2.5 px-3">Valuasi Unit FIFO ($)</th>
                    <th className="py-2.5 px-3">Status Masa Simpan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {inventoryItems.map((inv) => (
                    <tr key={inv.itemCode} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{inv.itemCode}</td>
                      <td className="py-3 px-3 text-slate-300">{inv.batchNo}</td>
                      <td className="py-3 px-3 text-slate-400">{inv.mfgDate}</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">{inv.expiryDate}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">${inv.fifoValueUsd.toLocaleString('en-US')}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                          inv.expiryStatus === 'HEALTHY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {inv.expiryStatus}
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

    </div>
  );
};
