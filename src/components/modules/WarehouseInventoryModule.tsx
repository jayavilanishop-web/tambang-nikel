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
  Check,
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
  Sliders,
  Database,
  BarChart3
} from 'lucide-react';
import { Language } from '../../types';

interface WarehouseInventoryModuleProps {
  language: Language;
  initialTab?: 
    | 'dasbor_warehouse'
    | 'inventory_stock'
    | 'barcode_qr_scan'
    | 'warehouse_locations'
    | 'goods_receiving'
    | 'goods_issue'
    | 'stock_transfer'
    | 'stock_opname'
    | 'fifo_batch_expiry'
    | 'master_data_inventory';
}

export const WarehouseInventoryModule: React.FC<WarehouseInventoryModuleProps> = ({
  language,
  initialTab = 'dasbor_warehouse'
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dasbor_warehouse'
    | 'inventory_stock'
    | 'barcode_qr_scan'
    | 'warehouse_locations'
    | 'goods_receiving'
    | 'goods_issue'
    | 'stock_transfer'
    | 'stock_opname'
    | 'fifo_batch_expiry'
    | 'master_data_inventory'
  >(initialTab);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('ALL');
  const [scannedCode, setScannedCode] = useState<string>('QR-PART-2026-8841');
  const [scanResult, setScanResult] = useState<any>(null);

  // Warehouse Locations State
  const [warehouseLocations] = useState([
    { id: 'WH-MAIN-SITE', name: 'Gudang Utama Central (Main Site Warehouse)', code: 'WH-MAIN', category: 'General Spareparts & Tyres', totalBins: 450, occupiedPct: 78, manager: 'Ahmad Subagyo' },
    { id: 'WH-PIT-DEPOT', name: 'Depot Pit Alpha Warehouse (Fast-Moving Parts)', code: 'WH-PIT', category: 'Filters, Oils & Hydraulic Hoses', totalBins: 120, occupiedPct: 62, manager: 'Deni Setiawan' },
    { id: 'WH-JETTY-STORE', name: 'Gudang Logistik Pelabuhan Jetty', code: 'WH-JETTY', category: 'Barging Consumables & Hazmat Chemical', totalBins: 85, occupiedPct: 45, manager: 'Rudy Hartono' }
  ]);

  // Dynamic Lists State
  const [inventoryList, setInventoryList] = useState([
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
  ]);

  const [receivingOrders, setReceivingOrders] = useState([
    { grnNo: 'GRN-2026-0811', poNo: 'PO-2026-0412', supplier: 'PT Trakindo Utama (Caterpillar)', receiveDate: '2026-08-02', itemsCount: 14, totalValuationUsd: 145000, inspector: 'Eko (QC Inspector)', status: 'RECEIVED_COMPLETED' },
    { grnNo: 'GRN-2026-0812', poNo: 'PO-2026-0415', supplier: 'PT United Tractors Tbk (Komatsu)', receiveDate: '2026-08-03', itemsCount: 8, totalValuationUsd: 68000, inspector: 'Sutrisno (Warehouse)', status: 'IN_INSPECTION' }
  ]);

  const [issuingSlips, setIssuingSlips] = useState([
    { gisNo: 'GIS-2026-1102', woNo: 'WO-2026-0412', issuedTo: 'Mekanik Bambang (Service DT-1001)', issueDate: '2026-08-03 08:30', itemIssued: 'Oli Delo 400 (2 Drum) & Filter Oil', costCenter: 'CC-MAINT-FLEET', status: 'ISSUED' },
    { gisNo: 'GIS-2026-1103', woNo: 'WO-2026-0413', issuedTo: 'Tim Blasting Pit Beta', issueDate: '2026-08-03 09:15', itemIssued: 'ANFO Ammonium Nitrate (2.5 Ton)', costCenter: 'CC-PIT-BLASTING', status: 'ISSUED' }
  ]);

  const [stockTransfers, setStockTransfers] = useState([
    { transferNo: 'TRF-2026-0301', fromWh: 'Gudang Utama Central', toWh: 'Depot Pit Alpha', itemCode: 'SKU-FLTR-HYD-KOM', qty: 10, reqBy: 'Pit Supervisor Hendra', status: 'IN_TRANSIT' },
    { transferNo: 'TRF-2026-0302', fromWh: 'Gudang Utama Central', toWh: 'Gudang Jetty Terminal', itemCode: 'SKU-LUB-DELO-400', qty: 4, reqBy: 'Jetty Head Dedi', status: 'DELIVERED' }
  ]);

  const [stockOpnameAudit, setStockOpnameAudit] = useState([
    { auditId: 'SO-2026-Q3', whCode: 'WH-MAIN-SITE', itemCode: 'SKU-TYRE-777E', systemQty: 18, physicalQty: 18, varianceQty: 0, varianceValUsd: 0, auditDate: '2026-08-01', status: 'MATCHED' },
    { auditId: 'SO-2026-Q3', whCode: 'WH-PIT-DEPOT', itemCode: 'SKU-FLTR-HYD-KOM', systemQty: 42, physicalQty: 41, varianceQty: -1, varianceValUsd: -220, auditDate: '2026-08-01', status: 'DISCREPANCY_APPROVED' }
  ]);

  // Modals state
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemCode, setNewItemCode] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Heavy Equipment Parts');
  const [newItemQty, setNewItemQty] = useState(10);
  const [newItemPriceUsd, setNewItemPriceUsd] = useState(500);

  // GRN Modal State
  const [showGrnModal, setShowGrnModal] = useState(false);
  const [grnPoNo, setGrnPoNo] = useState('');
  const [grnSupplier, setGrnSupplier] = useState('');
  const [grnItemsCount, setGrnItemsCount] = useState(5);
  const [grnValuationUsd, setGrnValuationUsd] = useState(25000);

  // GIS Modal State
  const [showGisModal, setShowGisModal] = useState(false);
  const [gisWoNo, setGisWoNo] = useState('');
  const [gisIssuedTo, setGisIssuedTo] = useState('');
  const [gisItemIssued, setGisItemIssued] = useState('');
  const [gisCostCenter, setGisCostCenter] = useState('CC-MAINT-FLEET');

  // Transfer Modal State
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [trfFromWh, setTrfFromWh] = useState('Gudang Utama Central');
  const [trfToWh, setTrfToWh] = useState('Depot Pit Alpha');
  const [trfItemCode, setTrfItemCode] = useState('SKU-FLTR-HYD-KOM');
  const [trfQty, setTrfQty] = useState(5);

  // Opname Modal State
  const [showOpnameModal, setShowOpnameModal] = useState(false);
  const [opnameWhCode, setOpnameWhCode] = useState('WH-MAIN-SITE');
  const [opnameItemCode, setOpnameItemCode] = useState('SKU-TYRE-777E');
  const [opnameSystemQty, setOpnameSystemQty] = useState(18);
  const [opnamePhysicalQty, setOpnamePhysicalQty] = useState(18);

  const filteredInventory = inventoryList.filter(item => {
    const matchWh = selectedWarehouse === 'ALL' || item.warehouse === selectedWarehouse;
    const matchSearch = item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchWh && matchSearch;
  });

  const handleSimulateScan = () => {
    const found = inventoryList.find(i => i.qrCode === scannedCode || i.barcode === scannedCode || i.itemCode === scannedCode);
    if (found) {
      setScanResult(found);
    } else {
      setScanResult({ error: 'Kode Barcode / QR Code tidak ditemukan di database gudang!' });
    }
  };

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

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'dasbor_warehouse', label: '📊 Dasbor Warehouse', icon: BarChart3 },
          { id: 'master_data_inventory', label: '🗄️ Master Data Warehouse', icon: Database },
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

      {/* VIEW 0: DASBOR WAREHOUSE (WAREHOUSE MANAGER ANALYTICS) */}
      {activeTab === 'dasbor_warehouse' && (
        <div className="space-y-6 text-xs">
          {/* Executive Warehouse KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Valuasi Total Stok Site</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-slate-100 font-mono">$1,248,500 <span className="text-xs font-normal text-slate-400">USD (FIFO)</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">1,450 Active SKU • 3 Site Storage Bay</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Inventory Turnover Ratio (ITR)</span>
                <TrendingUp className="w-4 h-4 text-sky-400" />
              </div>
              <div className="text-xl font-black text-sky-300 font-mono">6.8x <span className="text-xs font-normal text-slate-400">/ Tahun</span></div>
              <p className="text-[10px] text-emerald-400 mt-1 font-bold">↑ 12.4% vs Target Operasional Tambang</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Okupansi Rak & Bin Gudang</span>
                <Warehouse className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-xl font-black text-indigo-300 font-mono">74.2% <span className="text-xs font-normal text-slate-400">Kapasitas</span></div>
              <p className="text-[10px] text-slate-400 mt-1">486 / 655 Total Bin Rak Terisi Optimal</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md">
              <div className="flex justify-between items-center text-slate-400 mb-2">
                <span className="font-bold text-[11px] uppercase tracking-wider">Alert Reorder / Out of Stock</span>
                <ShieldAlert className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-xl font-black text-rose-300 font-mono">6 SKU <span className="text-xs font-normal text-slate-400">&lt; Safety Stock</span></div>
              <p className="text-[10px] text-amber-400 mt-1 font-bold">3 PR Auto-Triggered to Purchasing</p>
            </div>
          </div>

          {/* Operational Flow & Warehouse Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* GRN vs GIS Logistics Flow */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  Alur Penerimaan (GRN) vs Pengeluaran Barang (GIS) Site Bulan Ini
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400">Live FIFO Log</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">1. Goods Received (GRN)</span>
                  <strong className="text-lg font-mono text-emerald-400">148 Transactions</strong>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Valuation $385K USD</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">2. Goods Issued (GIS)</span>
                  <strong className="text-lg font-mono text-sky-400">210 Issue Slips</strong>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Valuation $412K USD</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">3. Stock Transfer Inter-WH</span>
                  <strong className="text-lg font-mono text-amber-400">32 Transfers</strong>
                  <span className="text-[9px] text-slate-500 block mt-0.5">Main WH → Pit/Jetty</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block font-bold">4. Stock Opname Variance</span>
                  <strong className="text-lg font-mono text-indigo-400">0.02%</strong>
                  <span className="text-[9px] text-emerald-400 block mt-0.5">Audited & Matched</span>
                </div>
              </div>

              {/* Fast Moving vs Slow Moving Inventory */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-slate-200 text-xs">Distribusi Pergerakan Item Stok (Item Velocity Matrix):</h4>
                <div className="space-y-2 font-mono">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">🚀 Fast Moving (Filters, Oils, Consumables & Fast Wearing Parts)</span>
                      <span className="text-emerald-400 font-bold">$520,000 USD (41.6%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '41.6%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">🛞 Heavy Spareparts (OTR Tyres, Undercarriage, GET Teeth)</span>
                      <span className="text-sky-400 font-bold">$480,000 USD (38.4%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full rounded-full" style={{ width: '38.4%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">📦 Medium & Buffer Safety Stock (Engine Component Rebuild Kits)</span>
                      <span className="text-amber-400 font-bold">$180,000 USD (14.4%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '14.4%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">⚠️ Slow Moving / Insurance Spares (Major Transmission Assys)</span>
                      <span className="text-slate-400 font-bold">$68,500 USD (5.6%)</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div className="bg-slate-600 h-full rounded-full" style={{ width: '5.6%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Warehouse Facilities Status */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="flex items-center gap-2"><Warehouse className="w-4 h-4 text-emerald-400" /> Status Facility Gudang</span>
                <button onClick={() => setActiveTab('warehouse_locations')} className="text-[10px] text-emerald-400 hover:underline">Kelola Lokasi</button>
              </h3>

              <div className="space-y-3">
                {warehouseLocations.map((wh) => (
                  <div key={wh.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-slate-100 block font-sans text-xs">{wh.name}</strong>
                        <span className="text-[10px] text-slate-400 block font-mono">{wh.category} • Mgr: {wh.manager}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                        {wh.occupiedPct}% Terisi
                      </span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${wh.occupiedPct}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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

              <button
                onClick={() => setShowAddItemModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Sparepart</span>
              </button>
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
                      <td className="p-3 text-amber-300">${(item.fifoValueUsd ?? 0).toLocaleString('en-US')}</td>
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
              <button 
                onClick={() => setShowGrnModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
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
                      <td className="py-3 px-3 text-amber-300">${(grn.totalValuationUsd ?? 0).toLocaleString('en-US')}</td>
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
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Pengeluaran Barang & Sparepart Perawatan (Goods Issue Slip - GIS)
              </h3>
              <button 
                onClick={() => setShowGisModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat GIS Baru</span>
              </button>
            </div>

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
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Transfer Stok Antar-Gudang Site Tambang (Inter-Warehouse Stock Transfer)
              </h3>
              <button 
                onClick={() => setShowTransferModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Buat Transfer Baru</span>
              </button>
            </div>

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
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">
                Stock Opname Fisik & Analisis Variansi Stok Gudang (Audit Reconciliation)
              </h3>
              <button 
                onClick={() => setShowOpnameModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Input Audit Stock Opname</span>
              </button>
            </div>

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
                  {inventoryList.map((inv) => (
                    <tr key={inv.itemCode} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{inv.itemCode}</td>
                      <td className="py-3 px-3 text-slate-300">{inv.batchNo}</td>
                      <td className="py-3 px-3 text-slate-400">{inv.mfgDate}</td>
                      <td className="py-3 px-3 text-rose-400 font-bold">{inv.expiryDate}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">${(inv.fifoValueUsd ?? 0).toLocaleString('en-US')}</td>
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

      {/* TAB 9: MASTER DATA INVENTORY & KATALOG SKU */}
      {activeTab === 'master_data_inventory' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Master Data Inventory & Katalog SKU Terpusat
              </span>
              <h3 className="text-xl font-black text-white mt-1 flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" />
                Master Catalog Spareparts, Material, OTR Tyre & Hazmat
              </h3>
              <p className="text-slate-400 text-xs mt-1">
                Pengelolaan master SKU, part number OEM/cross-ref, min/max safety stock level, klasifikasi hazard, lokasi rak bin gudang, dan konversi satuan unit (UOM).
              </p>
            </div>
            <button
              onClick={() => setShowAddItemModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shrink-0 shadow-md"
            >
              <Plus className="w-4 h-4" /> Tambah Master SKU Baru
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Master Kategori SKU & Part Number Matrix */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-400" />
                1. Master Kategori Item & OEM Cross-Reference
              </h4>
              <div className="space-y-2 font-mono">
                {[
                  { cat: 'Heavy OTR Tyre', desc: 'Ban Alat Berat 27.00R49 & 14.00R24', oem: 'Bridgestone VSDL / Michelin XDR2', leadTime: '45 Hari' },
                  { cat: 'Filters & Separation', desc: 'Filter Hydraulic, Fuel, Oil & Air', oem: 'Donaldson / Fleetguard / Komatsu OEM', leadTime: '14 Hari' },
                  { cat: 'Engine & Hydraulic Parts', desc: 'Piston, Liner, Hose Assembly & Pump', oem: 'CAT Heavy Parts / Komatsu Genuine', leadTime: '21 Hari' },
                  { cat: 'Lubricants & Fuel', desc: 'Oli SAE 15W-40, Hydraulic 46, Diesel B35', oem: 'Shell Rimula / Mobil Delvac', leadTime: '7 Hari' }
                ].map((item, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-emerald-400 font-bold block">{item.cat}</span>
                      <span className="text-slate-300 font-sans text-[10px]">{item.desc}</span>
                      <span className="text-slate-500 text-[10px] block mt-0.5">OEM: {item.oem}</span>
                    </div>
                    <span className="text-amber-300 font-bold text-[10px] bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 shrink-0">
                      LT: {item.leadTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 2: Master Bin Layout & Rak Gudang */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Warehouse className="w-4 h-4 text-indigo-400" />
                2. Master Pemetaan Lokasi Bin, Rak & Zone Class
              </h4>
              <div className="space-y-2 font-mono">
                {[
                  { zone: 'RACK-TYRE-A01 s/d A10', wh: 'WH-MAIN-SITE', class: 'Heavy Storage Zone', cap: '150 Unit OTR Tyre' },
                  { zone: 'BIN-FLT-B01 s/d B50', wh: 'WH-PIT-DEPOT', class: 'Fast Moving Parts Bin', cap: '1,200 Pcs Filter' },
                  { zone: 'HAZMAT-CHEM-Z01', wh: 'WH-JETTY-STORE', class: 'Chemical & Hazmat Storage', cap: '50 Drum Reagen/Oli' }
                ].map((zone, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-indigo-400 font-bold block">{zone.zone}</span>
                      <span className="text-slate-300 font-sans text-[10px]">{zone.wh} • {zone.class}</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 shrink-0">
                      {zone.cap}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 3: Master Vendor & OEM Spareparts Manufacturer */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                3. Master Vendor & Manufaktur Spareparts Resmi
              </h4>
              <div className="space-y-2">
                {[
                  { vendor: 'PT Trakindo Utama', brand: 'Caterpillar (CAT)', rating: '4.9 ★', status: 'AUTHORIZED_DEALER' },
                  { vendor: 'PT United Tractors Tbk', brand: 'Komatsu & Scania', rating: '4.9 ★', status: 'AUTHORIZED_DEALER' },
                  { vendor: 'PT Fleetguard Indonesia', brand: 'Cummins & Donaldson Filters', rating: '4.8 ★', status: 'OFFICIAL_SUPPLIER' }
                ].map((v, i) => (
                  <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-white font-bold block">{v.vendor}</span>
                      <span className="text-amber-300 text-[10px] font-mono">{v.brand}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-400 font-bold block text-[10px] font-mono">{v.rating}</span>
                      <span className="text-slate-400 text-[9px] uppercase font-mono">{v.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 4: Master Konversi Satuan Unit (UOM Matrix) */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Boxes className="w-4 h-4 text-teal-400" />
                4. Master Satuan Unit (UOM) & Matriks Konversi
              </h4>
              <div className="space-y-2 font-mono">
                {[
                  { base: 'DRUM (Oli Pelumas)', conv: '1 DRUM = 209 LITER', usage: 'Konsumsi Engine Workshop' },
                  { base: 'BOX (Filter Elements)', conv: '1 BOX = 12 PCS', usage: 'Penerimaan GRN & Stacking' },
                  { base: 'PALLET (Grease Bucket)', conv: '1 PALLET = 24 BUCKET', usage: 'Logistik Jetty Terminal' }
                ].map((u, i) => (
                  <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-[11px]">
                    <div>
                      <span className="text-teal-300 font-bold block">{u.base}</span>
                      <span className="text-slate-400 font-sans text-[10px]">{u.usage}</span>
                    </div>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 text-[10px]">
                      {u.conv}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: INPUT SPAREPART / GOODS BARU */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-400" /> Input Master Data Sparepart Baru
              </h3>
              <button onClick={() => setShowAddItemModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Kode SKU / Part Number:</label>
                <input
                  type="text"
                  placeholder="Contoh: SKU-FLTR-OIL-01"
                  value={newItemCode}
                  onChange={(e) => setNewItemCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Deskripsi & Spesifikasi Item:</label>
                <input
                  type="text"
                  placeholder="Contoh: Oil Filter Engine Cummins QSK60"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Kategori Item:</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Heavy Equipment Parts">Heavy Equipment Parts</option>
                    <option value="Lubricants & Chemical">Lubricants & Chemical</option>
                    <option value="Tyre & Undercarriage">Tyre & Undercarriage</option>
                    <option value="Filters & Consumables">Filters & Consumables</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Stok Awal (Qty):</label>
                  <input
                    type="number"
                    value={newItemQty}
                    onChange={(e) => setNewItemQty(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Harga Satuan Valuasi FIFO ($ USD):</label>
                <input
                  type="number"
                  value={newItemPriceUsd}
                  onChange={(e) => setNewItemPriceUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  if (newItemCode) {
                    setInventoryList(prev => [
                      {
                        itemCode: newItemCode,
                        barcode: `899100${Math.floor(100000 + Math.random() * 900000)}`,
                        qrCode: `QR-PART-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                        description: newItemDesc || 'Sparepart Komponen Baru',
                        category: newItemCategory,
                        warehouse: 'WH-MAIN-SITE',
                        binRack: 'BIN-NEW-A01',
                        stockOnHand: newItemQty,
                        minStock: 5,
                        maxStock: 50,
                        unit: 'PCS',
                        fifoValueUsd: newItemPriceUsd,
                        batchNo: `BATCH-LOT-${new Date().toISOString().slice(0, 7).replace('-', '')}`,
                        mfgDate: new Date().toISOString().slice(0, 10),
                        expiryDate: '2029-12-31',
                        expiryStatus: 'HEALTHY'
                      },
                      ...prev
                    ]);
                  }
                  setShowAddItemModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Simpan Data Item
              </button>
              <button
                onClick={() => setShowAddItemModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INPUT GRN BARU */}
      {showGrnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-400" /> Penerimaan Barang Masuk (GRN) Baru
              </h3>
              <button onClick={() => setShowGrnModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nomor Purchase Order (PO):</label>
                <input
                  type="text"
                  placeholder="PO-2026-0418"
                  value={grnPoNo}
                  onChange={(e) => setGrnPoNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Vendor / Pemasok:</label>
                <input
                  type="text"
                  placeholder="PT Trakindo Utama / PT United Tractors"
                  value={grnSupplier}
                  onChange={(e) => setGrnSupplier(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Jumlah SKU Item:</label>
                  <input
                    type="number"
                    value={grnItemsCount}
                    onChange={(e) => setGrnItemsCount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Total Valuasi ($ USD):</label>
                  <input
                    type="number"
                    value={grnValuationUsd}
                    onChange={(e) => setGrnValuationUsd(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setReceivingOrders(prev => [
                    {
                      grnNo: `GRN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                      poNo: grnPoNo || 'PO-2026-0499',
                      supplier: grnSupplier || 'PT Supplier Tambang Utama',
                      receiveDate: new Date().toISOString().slice(0, 10),
                      itemsCount: grnItemsCount,
                      totalValuationUsd: grnValuationUsd,
                      inspector: 'QC Inspector Site',
                      status: 'RECEIVED_COMPLETED'
                    },
                    ...prev
                  ]);
                  setShowGrnModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Terbitkan GRN
              </button>
              <button
                onClick={() => setShowGrnModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: INPUT GIS BARU */}
      {showGisModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Pengeluaran Barang (GIS) Baru
              </h3>
              <button onClick={() => setShowGisModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Nomor Work Order (SPK WO):</label>
                <input
                  type="text"
                  placeholder="WO-2026-0418"
                  value={gisWoNo}
                  onChange={(e) => setGisWoNo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Penerima Komponen / Unit / Tim:</label>
                <input
                  type="text"
                  placeholder="Mekanik / Tim Pit Service"
                  value={gisIssuedTo}
                  onChange={(e) => setGisIssuedTo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Deskripsi Barang Issued:</label>
                <input
                  type="text"
                  placeholder="Filter Hydraulic & Oli Engine (2 Drum)"
                  value={gisItemIssued}
                  onChange={(e) => setGisItemIssued(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Cost Center (Pusat Biaya):</label>
                <select
                  value={gisCostCenter}
                  onChange={(e) => setGisCostCenter(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                >
                  <option value="CC-MAINT-FLEET">CC-MAINT-FLEET (Maintenance Fleet Equipment)</option>
                  <option value="CC-PIT-BLASTING">CC-PIT-BLASTING (Penambangan & Peledakan Pit)</option>
                  <option value="CC-JETTY-PORT">CC-JETTY-PORT (Logistik Pelabuhan Jetty)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setIssuingSlips(prev => [
                    {
                      gisNo: `GIS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                      woNo: gisWoNo || 'WO-2026-0499',
                      issuedTo: gisIssuedTo || 'Tim Maintenance Workshop',
                      issueDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
                      itemIssued: gisItemIssued || 'Komponen Maintenance Unit',
                      costCenter: gisCostCenter,
                      status: 'ISSUED'
                    },
                    ...prev
                  ]);
                  setShowGisModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Process GIS Issue
              </button>
              <button
                onClick={() => setShowGisModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: INPUT TRANSFER STOK BARU */}
      {showTransferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <ArrowLeftRight className="w-4 h-4 text-emerald-400" /> Transfer Stok Antar-Gudang Site
              </h3>
              <button onClick={() => setShowTransferModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Gudang Asal (From):</label>
                  <input
                    type="text"
                    value={trfFromWh}
                    onChange={(e) => setTrfFromWh(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Gudang Tujuan (To):</label>
                  <input
                    type="text"
                    value={trfToWh}
                    onChange={(e) => setTrfToWh(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kode SKU Item:</label>
                <input
                  type="text"
                  value={trfItemCode}
                  onChange={(e) => setTrfItemCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Jumlah Transfer (Qty):</label>
                <input
                  type="number"
                  value={trfQty}
                  onChange={(e) => setTrfQty(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-amber-300 font-bold font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  setStockTransfers(prev => [
                    {
                      transferNo: `TRF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                      fromWh: trfFromWh,
                      toWh: trfToWh,
                      itemCode: trfItemCode,
                      qty: trfQty,
                      reqBy: 'Supervisor Gudang Site',
                      status: 'IN_TRANSIT'
                    },
                    ...prev
                  ]);
                  setShowTransferModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Proses Transfer Stok
              </button>
              <button
                onClick={() => setShowTransferModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: INPUT AUDIT STOCK OPNAME */}
      {showOpnameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-emerald-400" /> Audit Stock Opname Fisik
              </h3>
              <button onClick={() => setShowOpnameModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 block mb-1">Kode Gudang:</label>
                <input
                  type="text"
                  value={opnameWhCode}
                  onChange={(e) => setOpnameWhCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Kode SKU Item:</label>
                <input
                  type="text"
                  value={opnameItemCode}
                  onChange={(e) => setOpnameItemCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Stok Sistem:</label>
                  <input
                    type="number"
                    value={opnameSystemQty}
                    onChange={(e) => setOpnameSystemQty(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-100 font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Stok Fisik Hasil Hitung:</label>
                  <input
                    type="number"
                    value={opnamePhysicalQty}
                    onChange={(e) => setOpnamePhysicalQty(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-emerald-400 font-bold font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => {
                  const diff = opnamePhysicalQty - opnameSystemQty;
                  setStockOpnameAudit(prev => [
                    {
                      auditId: `SO-2026-Q3`,
                      whCode: opnameWhCode,
                      itemCode: opnameItemCode,
                      systemQty: opnameSystemQty,
                      physicalQty: opnamePhysicalQty,
                      varianceQty: diff,
                      varianceValUsd: diff * 200,
                      auditDate: new Date().toISOString().slice(0, 10),
                      status: diff === 0 ? 'MATCHED' : 'DISCREPANCY_APPROVED'
                    },
                    ...prev
                  ]);
                  setShowOpnameModal(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" /> Simpan Hasil Stock Opname
              </button>
              <button
                onClick={() => setShowOpnameModal(false)}
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
