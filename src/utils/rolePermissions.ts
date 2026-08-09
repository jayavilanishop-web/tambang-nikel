import { UserRole } from '../types';
import { ActiveModule } from '../components/Sidebar';

// Type for Dashboard Tabs
export type DashboardTab = 
  | 'comdev'
  | 'environment'
  | 'env_officer'
  | 'medical'
  | 'employee'
  | 'karyawan'
  | 'security'
  | 'legal'
  | 'accounting'
  | 'pajak'
  | 'auditor'
  | 'ktt_executive'
  | 'transporter'
  | 'payroll'
  | 'supplier_vendor'
  | 'purchasing'
  | 'master_purchasing'
  | 'executive' 
  | 'bi_analytics'
  | 'production_analytics'
  | 'weighbridge_kpi'
  | 'heavy_equipment'
  | 'barging_sales'
  | 'smelter_nickel'
  | 'financial_kpi'
  | 'hse_esg'
  | 'ai' 
  | 'realtime_kpi' 
  | 'gis_map';

export interface RolePermissionConfig {
  role: UserRole;
  label: string;
  category: 'EXECUTIVE' | 'OPERATIONS' | 'FINANCE' | 'TECHNICAL' | 'SAFETY' | 'LOGISTICS' | 'GENERAL';
  allowedModules: ActiveModule[];
  allowedDashboardTabs: DashboardTab[];
  defaultDashboardTab: DashboardTab;
  description: string;
}

// Master Role Permissions Mapping
export const ROLE_PERMISSIONS: Record<string, RolePermissionConfig> = {
  'Super Admin': {
    role: 'Super Admin',
    label: 'Super Admin Enterprise',
    category: 'EXECUTIVE',
    allowedModules: [
      'dashboard', 'corporate_director', 'commissioner', 'ceo', 'coo', 'finance_director', 'hr_director', 'mine_manager', 'operation_manager', 'production_manager', 'geologist', 'mine_engineer', 'mine_gpt', 'multi_company', 'operation', 'exploration', 'survey',
      'gps_telemetry', 'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse',
      'procurement', 'finance', 'hr', 'jetty', 'smelter', 'hse', 'environment',
      'security', 'document', 'project', 'crm', 'report', 'notification', 'rkab',
      'offline', 'api_hub', 'saas_license', 'auth_security'
    ],
    allowedDashboardTabs: [
      'ktt_executive', 'transporter', 'payroll', 'supplier_vendor', 'purchasing', 'master_purchasing', 'executive', 'bi_analytics', 'production_analytics',
      'weighbridge_kpi', 'heavy_equipment', 'barging_sales', 'smelter_nickel',
      'financial_kpi', 'hse_esg', 'ai', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'executive',
    description: 'Akses penuh tanpa batasan ke seluruh sistem ERP, modul, dan dasbor analitik.'
  },

  'License Owner': {
    role: 'License Owner',
    label: 'Pemilik Lisensi Enterprise',
    category: 'EXECUTIVE',
    allowedModules: [
      'dashboard', 'corporate_director', 'commissioner', 'ceo', 'coo', 'finance_director', 'hr_director', 'mine_manager', 'operation_manager', 'production_manager', 'geologist', 'mine_engineer', 'mine_gpt', 'multi_company', 'operation', 'exploration', 'survey',
      'gps_telemetry', 'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse',
      'procurement', 'finance', 'hr', 'jetty', 'smelter', 'hse', 'environment',
      'security', 'document', 'project', 'crm', 'report', 'notification', 'rkab',
      'offline', 'api_hub', 'saas_license', 'auth_security'
    ],
    allowedDashboardTabs: [
      'ktt_executive', 'transporter', 'payroll', 'supplier_vendor', 'executive', 'bi_analytics', 'production_analytics',
      'weighbridge_kpi', 'heavy_equipment', 'barging_sales', 'smelter_nickel',
      'financial_kpi', 'hse_esg', 'ai', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'executive',
    description: 'Hak akses tingkat pemilik lisensi SaaS dan tata kelola multi-site.'
  },

  'Company Owner': {
    role: 'Company Owner',
    label: 'Pemilik Perusahaan (Holding)',
    category: 'EXECUTIVE',
    allowedModules: [
      'dashboard', 'corporate_director', 'commissioner', 'ceo', 'coo', 'finance_director', 'hr_director', 'mine_manager', 'operation_manager', 'production_manager', 'geologist', 'mine_engineer', 'mine_gpt', 'multi_company', 'operation', 'exploration', 'survey',
      'gps_telemetry', 'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse',
      'procurement', 'finance', 'hr', 'jetty', 'smelter', 'hse', 'environment',
      'security', 'document', 'project', 'crm', 'report', 'notification', 'rkab',
      'offline', 'api_hub', 'auth_security'
    ],
    allowedDashboardTabs: [
      'ktt_executive', 'transporter', 'executive', 'bi_analytics', 'production_analytics',
      'weighbridge_kpi', 'heavy_equipment', 'barging_sales', 'smelter_nickel',
      'financial_kpi', 'hse_esg', 'ai', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'executive',
    description: 'Akses eksekutif puncak laporan keuangan, produksi nikel, dan RKAB ESDM.'
  },

  'Corporate Director': {
    role: 'Corporate Director',
    label: 'Direksi Korporat',
    category: 'EXECUTIVE',
    allowedModules: [
      'dashboard', 'corporate_director', 'commissioner', 'ceo', 'coo', 'finance_director', 'hr_director', 'mine_manager', 'operation_manager', 'production_manager', 'geologist', 'mine_engineer', 'mine_gpt', 'multi_company', 'operation', 'exploration', 'survey',
      'gps_telemetry', 'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse',
      'procurement', 'finance', 'hr', 'jetty', 'smelter', 'hse', 'environment',
      'document', 'crm', 'report', 'notification', 'rkab'
    ],
    allowedDashboardTabs: [
      'dasbor_corporate_director', 'master_corporate_director', 'master_data_corporate_director', 'dasbor_commissioner', 'master_commissioner', 'master_data_commissioner', 'ktt_executive', 'transporter', 'executive', 'bi_analytics', 'production_analytics',
      'barging_sales', 'smelter_nickel', 'financial_kpi', 'hse_esg', 'ai', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'dasbor_corporate_director',
    description: 'Akses strategi korporat, arus kas, performa site, investasi holding, dan penjualan nikel.'
  },

  'Commissioner': {
    role: 'Commissioner',
    label: 'Dewan Komisaris (Board of Commissioners)',
    category: 'EXECUTIVE',
    allowedModules: [
      'dashboard', 'commissioner', 'corporate_director', 'ceo', 'coo', 'finance_director', 'hr_director', 'mine_manager', 'operation_manager', 'production_manager', 'geologist', 'mine_engineer', 'mine_gpt', 'multi_company', 'operation', 'exploration', 'survey',
      'gps_telemetry', 'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse',
      'procurement', 'finance', 'hr', 'jetty', 'smelter', 'hse', 'environment',
      'document', 'crm', 'report', 'notification', 'rkab', 'auth_security'
    ],
    allowedDashboardTabs: [
      'dasbor_commissioner', 'master_commissioner', 'master_data_commissioner', 'ktt_executive', 'transporter', 'executive', 'bi_analytics', 'production_analytics',
      'barging_sales', 'smelter_nickel', 'financial_kpi', 'hse_esg', 'ai', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'dasbor_commissioner',
    description: 'Pengawasan independen Dewan Komisaris (Board of Commissioners) untuk Audit Tata Kelola GCG, Audit Independen Keuangan, Kepatuhan Perizinan & ESG, Pengawasan Direksi, serta Risk Advisory.'
  },

  'CEO': {
    role: 'CEO',
    label: 'Chief Executive Officer (Direktur Utama)',
    category: 'EXECUTIVE',
    allowedModules: [
      'dashboard', 'ceo', 'corporate_director', 'commissioner', 'coo', 'finance_director', 'hr_director', 'mine_manager', 'operation_manager', 'production_manager', 'geologist', 'mine_engineer', 'mine_gpt', 'multi_company', 'operation', 'exploration', 'survey',
      'gps_telemetry', 'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse',
      'procurement', 'finance', 'hr', 'jetty', 'smelter', 'hse', 'environment',
      'document', 'crm', 'report', 'notification', 'rkab', 'auth_security'
    ],
    allowedDashboardTabs: [
      'dasbor_ceo', 'master_ceo', 'master_data_ceo', 'ktt_executive', 'transporter', 'executive', 'bi_analytics', 'production_analytics',
      'barging_sales', 'smelter_nickel', 'financial_kpi', 'hse_esg', 'ai', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'dasbor_ceo',
    description: 'Pengawasan eksekutif puncak (Chief Executive Officer) untuk EBITDA, Revenue Penjualan Nikel, Target RKAB ESDM, ESG K3LH, Holding Governance, & Otorisasi Strategis Korporat.'
  },

  'COO': {
    role: 'COO',
    label: 'Chief Operating Officer (Direktur Operasional)',
    category: 'EXECUTIVE',
    allowedModules: [
      'dashboard', 'mine_gpt', 'operation', 'exploration', 'survey', 'gps_telemetry',
      'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse', 'procurement',
      'jetty', 'smelter', 'hse', 'environment', 'document', 'report', 'notification', 'rkab', 'offline', 'auth_security', 'multi_company'
    ],
    allowedDashboardTabs: [
      'dasbor_coo', 'master_coo', 'master_data_coo', 'ktt_executive', 'transporter', 'executive', 'bi_analytics', 'production_analytics',
      'weighbridge_kpi', 'heavy_equipment', 'barging_sales', 'smelter_nickel',
      'hse_esg', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'dasbor_coo',
    description: 'Pengawasan tingkat tinggi Operasi Tambang Nikel, Fleet Management, Production Target, Stripping Ratio, Hauling & Barging, K3LH/HSE, serta Efisiensi Biaya Operasi Site.'
  },

  'Mine Manager': {
    role: 'Mine Manager',
    label: 'Kepala Teknik Tambang (KTT) / Mine Manager',
    category: 'EXECUTIVE',
    allowedModules: [
      'dashboard', 'mine_gpt', 'operation', 'exploration', 'survey', 'gps_telemetry',
      'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse', 'procurement',
      'jetty', 'smelter', 'hse', 'environment', 'security', 'document', 'report', 'notification',
      'rkab', 'offline'
    ],
    allowedDashboardTabs: [
      'dasbor_mine_manager', 'master_mine_manager', 'master_data_mine_manager', 'ktt_executive', 'transporter', 'executive', 'bi_analytics', 'production_analytics',
      'weighbridge_kpi', 'heavy_equipment', 'barging_sales', 'smelter_nickel',
      'hse_esg', 'ai', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'dasbor_mine_manager',
    description: 'Otoritas tertinggi KTT untuk keselamatan kerja, geoteknik, buku tambang ESDM, dan produksi.'
  },

  'Transporter': {
    role: 'Transporter',
    label: 'Kontraktor Transporter & Hauling',
    category: 'LOGISTICS',
    allowedModules: [
      'dashboard', 'weighbridge', 'gps_telemetry', 'fleet', 'offline', 'document', 'notification', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'transporter', 'weighbridge_kpi', 'heavy_equipment', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'transporter',
    description: 'Akses khusus armada dump truck, E-surat jalan hauling, timbangan, BBM, dan GPS tracking.'
  },

  'Vendor': {
    role: 'Vendor',
    label: 'Vendor & Kontraktor Tambang',
    category: 'LOGISTICS',
    allowedModules: [
      'dashboard', 'procurement', 'warehouse', 'fleet', 'weighbridge', 'document', 'notification'
    ],
    allowedDashboardTabs: [
      'transporter', 'weighbridge_kpi', 'heavy_equipment', 'realtime_kpi'
    ],
    defaultDashboardTab: 'transporter',
    description: 'Akses portal vendor pengadaan, pengiriman barang,PO, dan surat jalan.'
  },

  'Supplier': {
    role: 'Supplier',
    label: 'Supplier Material & Sparepart',
    category: 'LOGISTICS',
    allowedModules: [
      'dashboard', 'procurement', 'warehouse', 'document', 'notification'
    ],
    allowedDashboardTabs: [
      'weighbridge_kpi', 'executive'
    ],
    defaultDashboardTab: 'weighbridge_kpi',
    description: 'Akses pengiriman barang, penawaran harga, dan tagihan invoice supplier.'
  },

  'Dispatcher': {
    role: 'Dispatcher',
    label: 'Dispatcher Hauling & Fleet',
    category: 'LOGISTICS',
    allowedModules: [
      'dashboard', 'operation', 'fleet', 'gps_telemetry', 'iot_telemetry', 'weighbridge', 'offline', 'notification', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'transporter', 'production_analytics', 'heavy_equipment', 'weighbridge_kpi', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'transporter',
    description: 'Pengawasan alokasi armada truk, giliran hauling, kecepatan GPS, dan ritase ore.'
  },

  'Fleet Manager': {
    role: 'Fleet Manager',
    label: 'Fleet & Equipment Manager',
    category: 'OPERATIONS',
    allowedModules: [
      'dashboard', 'operation', 'fleet', 'gps_telemetry', 'iot_telemetry', 'weighbridge', 'warehouse', 'offline', 'notification', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'heavy_equipment', 'transporter', 'production_analytics', 'weighbridge_kpi', 'realtime_kpi'
    ],
    defaultDashboardTab: 'heavy_equipment',
    description: 'Pengawasan OEE alat berat, konsumsi BBM solar, perawatan breakdown, dan ritase.'
  },

  'Workshop Manager': {
    role: 'Workshop Manager',
    label: 'Workshop & Maintenance Manager',
    category: 'OPERATIONS',
    allowedModules: [
      'dashboard', 'fleet', 'warehouse', 'procurement', 'iot_telemetry', 'offline', 'notification'
    ],
    allowedDashboardTabs: [
      'heavy_equipment', 'realtime_kpi'
    ],
    defaultDashboardTab: 'heavy_equipment',
    description: 'Pengawasan perawatan preventif, pemesanan sparepart, dan status breakdown alat.'
  },

  'Maintenance Manager': {
    role: 'Maintenance Manager',
    label: 'Plant & Equipment Maintenance',
    category: 'OPERATIONS',
    allowedModules: [
      'dashboard', 'fleet', 'iot_telemetry', 'warehouse', 'procurement', 'offline', 'notification'
    ],
    allowedDashboardTabs: [
      'heavy_equipment', 'realtime_kpi'
    ],
    defaultDashboardTab: 'heavy_equipment',
    description: 'Akses kesehatan mesin, pemantauan telemetri IoT, dan rencana perawatan.'
  },

  'Operation Manager': {
    role: 'Operation Manager',
    label: 'Operation Manager Site',
    category: 'OPERATIONS',
    allowedModules: [
      'dashboard', 'mine_gpt', 'operation', 'exploration', 'survey', 'gps_telemetry',
      'iot_telemetry', 'fleet', 'stockpile', 'weighbridge', 'warehouse', 'hse', 'report', 'notification', 'offline'
    ],
    allowedDashboardTabs: [
      'dasbor_operation_manager', 'master_operation_manager', 'master_data_operation_manager', 'production_analytics', 'ktt_executive', 'transporter', 'heavy_equipment', 'weighbridge_kpi', 'hse_esg', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'dasbor_operation_manager',
    description: 'Pengawasan target peledakan, penggalian pit, hauling ore, dan stockpile.'
  },

  'Production Manager': {
    role: 'Production Manager',
    label: 'Production Manager',
    category: 'OPERATIONS',
    allowedModules: [
      'dashboard', 'mine_gpt', 'operation', 'exploration', 'survey', 'fleet', 'stockpile',
      'weighbridge', 'jetty', 'report', 'notification', 'offline'
    ],
    allowedDashboardTabs: [
      'dasbor_production_manager', 'master_production_manager', 'master_data_production_manager', 'production_analytics', 'transporter', 'heavy_equipment', 'weighbridge_kpi', 'barging_sales', 'realtime_kpi'
    ],
    defaultDashboardTab: 'dasbor_production_manager',
    description: 'Fokus pada pencapaian tonase produksi nikel, blending kadar, dan barging.'
  },

  'Geologist': {
    role: 'Geologist',
    label: 'Senior Chief Geologist',
    category: 'TECHNICAL',
    allowedModules: [
      'dashboard', 'exploration', 'survey', 'operation', 'stockpile', 'rkab', 'report', 'document', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'dasbor_geologist', 'master_geologist', 'master_data_geologist', 'production_analytics', 'gis_map', 'bi_analytics', 'ktt_executive', 'realtime_kpi'
    ],
    defaultDashboardTab: 'dasbor_geologist',
    description: 'Pemodelan blok kadar Ni/Fe, pengeboran eksplorasi, batas pit, dan peta geologi.'
  },

  'Mine Engineer': {
    role: 'Mine Engineer',
    label: 'Mining Engineer & Plan',
    category: 'TECHNICAL',
    allowedModules: [
      'dashboard', 'exploration', 'survey', 'operation', 'fleet', 'stockpile', 'rkab', 'report', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'dasbor_mine_engineer', 'master_mine_engineer', 'master_data_mine_engineer', 'production_analytics', 'gis_map', 'heavy_equipment', 'ktt_executive', 'realtime_kpi'
    ],
    defaultDashboardTab: 'dasbor_mine_engineer',
    description: 'Perencanaan desain pit, skenario peledakan, stripping ratio, dan rekonsiliasi.'
  },

  'Surveyor': {
    role: 'Surveyor',
    label: 'Chief Surveyor & Topo',
    category: 'TECHNICAL',
    allowedModules: [
      'dashboard', 'survey', 'exploration', 'operation', 'stockpile', 'report', 'offline'
    ],
    allowedDashboardTabs: [
      'production_analytics', 'gis_map', 'realtime_kpi'
    ],
    defaultDashboardTab: 'production_analytics',
    description: 'Pengukuran kemajuan tambang, survei drone Lidar, volume stockpile, dan peta Topo.',
  },

  'Quality Control': {
    role: 'Quality Control',
    label: 'Quality Control (QC) Ore',
    category: 'TECHNICAL',
    allowedModules: [
      'dashboard', 'stockpile', 'jetty', 'exploration', 'smelter', 'report', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'production_analytics', 'barging_sales', 'smelter_nickel', 'realtime_kpi'
    ],
    defaultDashboardTab: 'production_analytics',
    description: 'Kontrol kadar ore nikel, blending EFO, dan verifikasi Certificate of Sampling (COS).'
  },

  'Laboratory': {
    role: 'Laboratory',
    label: 'Chemist & Lab Assayer',
    category: 'TECHNICAL',
    allowedModules: [
      'dashboard', 'stockpile', 'jetty', 'exploration', 'smelter', 'report'
    ],
    allowedDashboardTabs: [
      'production_analytics', 'barging_sales', 'smelter_nickel'
    ],
    defaultDashboardTab: 'production_analytics',
    description: 'Analisis kadar Ni, Fe, Co, SiO2, MgO menggunakan spektrometer XRF/AAS.'
  },

  'Finance Director': {
    role: 'Finance Director',
    label: 'Finance Director & CFO',
    category: 'FINANCE',
    allowedModules: [
      'dashboard', 'mine_gpt', 'finance', 'procurement', 'warehouse', 'smelter', 'jetty',
      'crm', 'hr', 'rkab', 'report', 'document', 'notification', 'auth_security', 'multi_company'
    ],
    allowedDashboardTabs: [
      'dasbor_finance_director', 'master_finance_director', 'master_data_finance_director', 'financial_kpi', 'pajak', 'barging_sales', 'smelter_nickel', 'executive', 'bi_analytics'
    ],
    defaultDashboardTab: 'dasbor_finance_director',
    description: 'Pengawasan arus kas, EBITDA, Working Capital, PNBP Royalti e-PNBP ESDM, Laporan PSAK/IFRS, PPh/PPN, dan otorisasi pengeluaran korporat.'
  },

  'Finance': {
    role: 'Finance',
    label: 'Finance & Cashflow Officer',
    category: 'FINANCE',
    allowedModules: [
      'dashboard', 'finance', 'procurement', 'warehouse', 'smelter', 'jetty', 'crm', 'report', 'document'
    ],
    allowedDashboardTabs: [
      'financial_kpi', 'barging_sales', 'smelter_nickel', 'executive'
    ],
    defaultDashboardTab: 'financial_kpi',
    description: 'Manajemen kas, pencairan vendor, invoice penjualan ore, dan pembayaran royalti.'
  },

  'Accounting': {
    role: 'Accounting',
    label: 'Chief Accountant',
    category: 'FINANCE',
    allowedModules: [
      'dashboard', 'finance', 'procurement', 'warehouse', 'smelter', 'report', 'document'
    ],
    allowedDashboardTabs: [
      'financial_kpi', 'executive', 'bi_analytics'
    ],
    defaultDashboardTab: 'financial_kpi',
    description: 'Pencatatan jurnal umum, neraca saldo, HPP harga pokok produksi nikel, dan audit.'
  },

  'Tax': {
    role: 'Tax',
    label: 'Tax Specialist & Royalty',
    category: 'FINANCE',
    allowedModules: [
      'dashboard', 'finance', 'smelter', 'rkab', 'report', 'document'
    ],
    allowedDashboardTabs: [
      'pajak', 'financial_kpi', 'auditor', 'smelter_nickel'
    ],
    defaultDashboardTab: 'pajak',
    description: 'Perhitungan pajak PPh/PPN, e-Faktur Pajak, PNBP ESDM, dan e-Royalti SIMPONI.'
  },

  'Payroll': {
    role: 'Payroll',
    label: 'Payroll Specialist',
    category: 'FINANCE',
    allowedModules: [
      'dashboard', 'hr', 'finance', 'report'
    ],
    allowedDashboardTabs: [
      'payroll', 'financial_kpi', 'executive'
    ],
    defaultDashboardTab: 'payroll',
    description: 'Gaji karyawan, insentif ritase, lembur, BPJS Ketenagakerjaan & Kesehatan.'
  },

  'Auditor': {
    role: 'Auditor',
    label: 'Internal & External Auditor',
    category: 'FINANCE',
    allowedModules: [
      'dashboard', 'finance', 'procurement', 'warehouse', 'operation', 'rkab', 'document', 'report', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'auditor', 'ktt_executive', 'financial_kpi', 'bi_analytics', 'payroll', 'supplier_vendor', 'executive'
    ],
    defaultDashboardTab: 'auditor',
    description: 'Pemeriksaan kepatuhan transaksi, audit RKAB ESDM, stok opname, dan jejak log audit digital.'
  },

  'HSE Manager': {
    role: 'HSE Manager',
    label: 'HSE & K3LH Manager',
    category: 'SAFETY',
    allowedModules: [
      'dashboard', 'hse', 'environment', 'security', 'operation', 'weighbridge', 'rkab', 'document', 'notification', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'hse_esg', 'ktt_executive', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'hse_esg',
    description: 'Pusat pengawasan K3 pertambangan, investigasi insiden, jam selamat, dan AMDAL.'
  },

  'Safety Officer': {
    role: 'Safety Officer',
    label: 'Safety Officer (K3)',
    category: 'SAFETY',
    allowedModules: [
      'dashboard', 'hse', 'security', 'operation', 'offline', 'document', 'notification'
    ],
    allowedDashboardTabs: [
      'hse_esg', 'ktt_executive', 'realtime_kpi'
    ],
    defaultDashboardTab: 'hse_esg',
    description: 'Inspeksi lapangan, Toolbox Meeting (TBM), APD, izin kerja bahaya (JSA).'
  },

  'Environment Officer': {
    role: 'Environment Officer',
    label: 'Environmental & Reclamation',
    category: 'SAFETY',
    allowedModules: [
      'dashboard', 'environment', 'hse', 'operation', 'rkab', 'report'
    ],
    allowedDashboardTabs: [
      'hse_esg', 'ktt_executive'
    ],
    defaultDashboardTab: 'hse_esg',
    description: 'Pemantauan settling pond, baku mutu air limbah, reklamasi lahan, dan pembibitan.'
  },

  'Security': {
    role: 'Security',
    label: 'Chief Security Site',
    category: 'SAFETY',
    allowedModules: [
      'dashboard', 'security', 'weighbridge', 'offline', 'notification'
    ],
    allowedDashboardTabs: [
      'realtime_kpi', 'weighbridge_kpi', 'transporter'
    ],
    defaultDashboardTab: 'realtime_kpi',
    description: 'Pengamanan area tambang, pos pemeriksaan portal, dan patroli keamanan ore.'
  },

  'HR Director': {
    role: 'HR Director',
    label: 'Human Capital Director',
    category: 'GENERAL',
    allowedModules: [
      'dashboard', 'hr', 'finance', 'document', 'notification', 'mine_gpt', 'rkab', 'report', 'multi_company', 'auth_security'
    ],
    allowedDashboardTabs: [
      'dasbor_hr_director', 'master_hr_director', 'master_data_hr_director', 'employee', 'payroll', 'medical', 'karyawan', 'executive', 'bi_analytics'
    ],
    defaultDashboardTab: 'dasbor_hr_director',
    description: 'Manajemen tenaga kerja, pelatihan sertifikasi POP/POM/POU, BPJS, SOT Organisasi, dan hubungan industrial.'
  },

  'Warehouse': {
    role: 'Warehouse',
    label: 'Warehouse & Logistics Lead',
    category: 'LOGISTICS',
    allowedModules: [
      'dashboard', 'warehouse', 'procurement', 'fleet', 'weighbridge', 'document', 'notification', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'weighbridge_kpi', 'heavy_equipment', 'realtime_kpi'
    ],
    defaultDashboardTab: 'weighbridge_kpi',
    description: 'Penerimaan sparepart, penerbitan Surat Bukti Barang Keluar (SBBK), dan stok Opname FIFO.'
  },

  'Purchasing': {
    role: 'Purchasing',
    label: 'Purchasing Specialist',
    category: 'LOGISTICS',
    allowedModules: [
      'dashboard', 'procurement', 'warehouse', 'finance', 'document', 'notification'
    ],
    allowedDashboardTabs: [
      'supplier_vendor', 'financial_kpi', 'weighbridge_kpi'
    ],
    defaultDashboardTab: 'supplier_vendor',
    description: 'Evaluasi penawaran supplier, pembuatan PO, nego harga, dan pengiriman barang.'
  },

  'Client': {
    role: 'Client',
    label: 'Client / Buyer Smelter',
    category: 'GENERAL',
    allowedModules: [
      'dashboard', 'jetty', 'smelter', 'document', 'notification'
    ],
    allowedDashboardTabs: [
      'barging_sales', 'smelter_nickel', 'executive'
    ],
    defaultDashboardTab: 'barging_sales',
    description: 'Akses melacak jadwal tongkang, Certificate of Sampling (COS), dan tagihan ore.'
  },

  'Guest': {
    role: 'Guest',
    label: 'Guest / Tamu Site',
    category: 'GENERAL',
    allowedModules: [
      'dashboard', 'mine_gpt', 'notification'
    ],
    allowedDashboardTabs: [
      'executive', 'realtime_kpi', 'gis_map'
    ],
    defaultDashboardTab: 'executive',
    description: 'Akses terbatas untuk presentasi demonstrasi dan gambaran umum operasional.'
  },

  'Employee': {
    role: 'Employee',
    label: 'Karyawan / Operator Tambang',
    category: 'GENERAL',
    allowedModules: [
      'dashboard', 'hr', 'offline', 'notification', 'mine_gpt'
    ],
    allowedDashboardTabs: [
      'realtime_kpi', 'executive'
    ],
    defaultDashboardTab: 'realtime_kpi',
    description: 'Akses slip gaji, absensi, pengajuan cuti, dan laporan keselamatan mandiri.'
  }
};

// Fallback permission config if role is not strictly defined
export const DEFAULT_PERMISSION_CONFIG: RolePermissionConfig = {
  role: 'Employee',
  label: 'Pengguna Terdaftar',
  category: 'GENERAL',
  allowedModules: [
    'dashboard', 'operation', 'fleet', 'weighbridge', 'offline', 'notification', 'mine_gpt'
  ],
  allowedDashboardTabs: [
    'executive', 'production_analytics', 'realtime_kpi', 'gis_map'
  ],
  defaultDashboardTab: 'executive',
  description: 'Akses umum aplikasiERP tambang.'
};

/**
 * Gets the permission configuration for a specific role
 */
export function getRolePermissionConfig(role: string | UserRole): RolePermissionConfig {
  return ROLE_PERMISSIONS[role] || DEFAULT_PERMISSION_CONFIG;
}

/**
 * Checks if a module is allowed for a specific role
 */
export function isModuleAllowedForRole(role: string | UserRole, moduleId: ActiveModule, customOverrides?: Record<string, boolean>): boolean {
  if (customOverrides && typeof customOverrides[moduleId] === 'boolean') {
    return customOverrides[moduleId];
  }
  const config = getRolePermissionConfig(role);
  return config.allowedModules.includes(moduleId);
}

/**
 * Checks if a dashboard tab is allowed for a specific role
 */
export function isDashboardTabAllowedForRole(role: string | UserRole, tabId: DashboardTab | string, customOverrides?: Record<string, boolean>): boolean {
  if (customOverrides && typeof customOverrides[tabId] === 'boolean') {
    return customOverrides[tabId];
  }
  const config = getRolePermissionConfig(role);
  if (tabId === 'financial' || tabId === 'financial_kpi') {
    return config.allowedDashboardTabs.includes('financial_kpi') || config.allowedDashboardTabs.includes('financial' as any);
  }
  if (tabId === 'accounting') {
    return config.allowedDashboardTabs.includes('accounting') || config.allowedDashboardTabs.includes('financial_kpi') || config.allowedDashboardTabs.includes('executive');
  }
  if (tabId === 'legal') {
    return config.allowedDashboardTabs.includes('legal' as any) || config.allowedDashboardTabs.includes('auditor') || config.allowedDashboardTabs.includes('ktt_executive') || config.allowedDashboardTabs.includes('executive');
  }
  if (tabId === 'comdev') {
    return config.allowedDashboardTabs.includes('comdev' as any) || config.allowedDashboardTabs.includes('hse_esg') || config.allowedDashboardTabs.includes('auditor') || config.allowedDashboardTabs.includes('ktt_executive') || config.allowedDashboardTabs.includes('executive');
  }
  if (tabId === 'environment' || tabId === 'env_officer') {
    return config.allowedDashboardTabs.includes('environment' as any) || config.allowedDashboardTabs.includes('env_officer' as any) || config.allowedDashboardTabs.includes('hse_esg') || config.allowedDashboardTabs.includes('auditor') || config.allowedDashboardTabs.includes('ktt_executive') || config.allowedDashboardTabs.includes('executive');
  }
  if (tabId === 'medical') {
    return config.allowedDashboardTabs.includes('medical' as any) || config.allowedDashboardTabs.includes('hse_esg') || config.allowedDashboardTabs.includes('auditor') || config.allowedDashboardTabs.includes('ktt_executive') || config.allowedDashboardTabs.includes('executive');
  }
  if (tabId === 'employee' || tabId === 'karyawan') {
    return config.allowedDashboardTabs.includes('employee' as any) || config.allowedDashboardTabs.includes('karyawan' as any) || config.allowedDashboardTabs.includes('payroll' as any) || config.allowedDashboardTabs.includes('auditor') || config.allowedDashboardTabs.includes('ktt_executive') || config.allowedDashboardTabs.includes('executive');
  }
  if (tabId === 'security') {
    return config.allowedDashboardTabs.includes('security' as any) || config.allowedDashboardTabs.includes('hse_esg') || config.allowedDashboardTabs.includes('auditor') || config.allowedDashboardTabs.includes('ktt_executive') || config.allowedDashboardTabs.includes('executive');
  }
  if (tabId === 'laboratory' || tabId === 'lab' || tabId === 'quality_control' || tabId === 'qa_qc') {
    return true;
  }
  if (tabId === 'inventory' || tabId === 'warehouse' || tabId === 'gudang' || tabId === 'inventory_stock' || tabId === 'dasbor_warehouse' || tabId === 'master_warehouse' || tabId === 'master_data_warehouse' || tabId === 'master_data_inventory') {
    return true;
  }
  if (tabId === 'equipment' || tabId === 'maintenance' || tabId === 'dasbor_maintenance' || tabId === 'master_maintenance' || tabId === 'master_data_maintenance' || tabId === 'workshop' || tabId === 'dasbor_workshop' || tabId === 'master_workshop' || tabId === 'master_data_workshop' || tabId === 'fleet' || tabId === 'dasbor_fleet' || tabId === 'master_fleet' || tabId === 'master_data_fleet' || tabId === 'dispatcher' || tabId === 'dasbor_dispatcher' || tabId === 'master_dispatcher' || tabId === 'master_data_dispatcher' || tabId === 'surveyor' || tabId === 'dasbor_surveyor' || tabId === 'master_surveyor' || tabId === 'master_data_surveyor' || tabId === 'mine_engineer' || tabId === 'dasbor_mine_engineer' || tabId === 'master_mine_engineer' || tabId === 'master_data_mine_engineer' || tabId === 'geologist' || tabId === 'dasbor_geologist' || tabId === 'master_geologist' || tabId === 'master_data_geologist' || tabId === 'production_manager' || tabId === 'dasbor_production_manager' || tabId === 'master_production_manager' || tabId === 'master_data_production_manager' || tabId === 'operation_manager' || tabId === 'dasbor_operation_manager' || tabId === 'master_operation_manager' || tabId === 'master_data_operation_manager' || tabId === 'mine_manager' || tabId === 'dasbor_mine_manager' || tabId === 'master_mine_manager' || tabId === 'master_data_mine_manager' || tabId === 'hr_director' || tabId === 'dasbor_hr_director' || tabId === 'master_hr_director' || tabId === 'master_data_hr_director' || tabId === 'finance_director' || tabId === 'dasbor_finance_director' || tabId === 'master_finance_director' || tabId === 'master_data_finance_director' || tabId === 'coo' || tabId === 'dasbor_coo' || tabId === 'master_coo' || tabId === 'master_data_coo' || tabId === 'ceo' || tabId === 'dasbor_ceo' || tabId === 'master_ceo' || tabId === 'master_data_ceo' || tabId === 'commissioner' || tabId === 'dasbor_commissioner' || tabId === 'master_commissioner' || tabId === 'master_data_commissioner' || tabId === 'corporate_director' || tabId === 'dasbor_corporate_director' || tabId === 'master_corporate_director' || tabId === 'master_data_corporate_director' || tabId === 'ktt_executive') {
    return true;
  }
  return config.allowedDashboardTabs.includes(tabId as any);
}
