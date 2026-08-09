import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { 
  Pickaxe, 
  Truck, 
  Layers, 
  Ship, 
  Coins, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Activity,
  Trees,
  Droplets,
  Wind,
  Sprout,
  Trash2,
  Stethoscope,
  HeartPulse,
  Syringe,
  UserCheck,
  Pill,
  Ambulance,
  AlertTriangle,
  Clock,
  MapPin,
  Compass,
  Zap,
  Gauge,
  Flame,
  FileCheck,
  CheckCircle2,
  XCircle,
  Eye,
  Sliders,
  DollarSign,
  Wrench,
  BarChart3,
  Globe,
  Radio,
  RefreshCw,
  Award,
  Download,
  Play,
  Pause,
  Filter,
  Check,
  Scale,
  FileText,
  Users,
  CreditCard,
  Briefcase,
  Calculator,
  Calendar,
  Building2,
  ShoppingBag,
  Store,
  PackageCheck,
  Handshake,
  Star,
  Plus,
  Search,
  Box,
  Package,
  ShieldAlert,
  FileCheck2,
  Fingerprint,
  Lock,
  History,
  Receipt,
  Percent,
  Landmark,
  BookOpen,
  FileSpreadsheet,
  Gavel,
  CheckSquare,
  HeartHandshake,
  GraduationCap,
  Home,
  Video,
  TestTube,
  Microscope,
  Database,
  FlaskConical,
  Boxes,
  QrCode,
  Warehouse
} from 'lucide-react';
import { MineSite, OreStockpile, HeavyEquipment, BargeShipment, HPMPriceBenchmark, Language, UserRole } from '../../types';
import { formatIDR, formatUSD } from '../../utils/hpmCalculator';
import { getRolePermissionConfig, isDashboardTabAllowedForRole } from '../../utils/rolePermissions';
import { ProcurementContractModule } from './ProcurementContractModule';
import { WarehouseInventoryModule } from './WarehouseInventoryModule';
import { FleetManagementModule } from './FleetManagementModule';
import { SurveyTopographyModule } from './SurveyTopographyModule';
import { ExplorationPitModule } from './ExplorationPitModule';
import { OperationCenterModule } from './OperationCenterModule';

interface DashboardModuleProps {
  sites: MineSite[];
  stockpiles: OreStockpile[];
  equipment: HeavyEquipment[];
  barges: BargeShipment[];
  hpm: HPMPriceBenchmark;
  language: Language;
  currentUserRole?: UserRole;
  onOpenAIDrawer: () => void;
  onNavigateModule: (mod: any) => void;
}

export const DashboardModule: React.FC<DashboardModuleProps> = ({
  sites,
  stockpiles,
  equipment,
  barges,
  hpm,
  language,
  currentUserRole = 'Mine Manager',
  onOpenAIDrawer,
  onNavigateModule
}) => {
  const roleConfig = getRolePermissionConfig(currentUserRole);
  const [showAllTabs, setShowAllTabs] = useState(false);

  const [activeTab, setActiveTab] = useState<
    | 'ktt_executive'
    | 'transporter'
    | 'payroll'
    | 'supplier_vendor'
    | 'executive' 
    | 'bi_analytics'
    | 'production_analytics'
    | 'fuel_analytics'
    | 'cost_analytics'
    | 'profitability'
    | 'forecast_ai'
    | 'operational' 
    | 'financial' 
    | 'production' 
    | 'safety' 
    | 'environment' 
    | 'medical'
    | 'employee'
    | 'security'
    | 'equipment' 
    | 'ai' 
    | 'realtime_kpi' 
    | 'gis_map'
  >(roleConfig.defaultDashboardTab as any);

  // Security Dashboard States
  const [securityGateFilter, setSecurityGateFilter] = useState<string>('ALL');
  const [securityCategoryFilter, setSecurityCategoryFilter] = useState<string>('ALL');
  const [securitySearch, setSecuritySearch] = useState<string>('');
  const [selectedSecurityIncident, setSelectedSecurityIncident] = useState<any | null>(null);
  const [showSecurityIncidentModal, setShowSecurityIncidentModal] = useState<boolean>(false);
  const [showGatePassRegisterModal, setShowGatePassRegisterModal] = useState<boolean>(false);
  const [showCctvLiveModal, setShowCctvLiveModal] = useState<boolean>(false);
  const [selectedCctvCamera, setSelectedCctvCamera] = useState<string>('CAM-01 Gate Utama ANPR');

  // HSE Manager Dashboard States
  const [hseCategoryFilter, setHseCategoryFilter] = useState<string>('ALL');
  const [hseStatusFilter, setHseStatusFilter] = useState<string>('ALL');
  const [hseSearch, setHseSearch] = useState<string>('');
  const [showHseIncidentModal, setShowHseIncidentModal] = useState<boolean>(false);
  const [showSmkpAuditModal, setShowSmkpAuditModal] = useState<boolean>(false);
  const [showJsaApprovalModal, setShowJsaApprovalModal] = useState<boolean>(false);
  const [selectedHseIncident, setSelectedHseIncident] = useState<any | null>(null);

  // Laboratory Chemist & QA/QC Dashboard States
  const [labGradeFilter, setLabGradeFilter] = useState<string>('ALL');
  const [labStatusFilter, setLabStatusFilter] = useState<string>('ALL');
  const [labSearch, setLabSearch] = useState<string>('');
  const [showAddLabSampleModal, setShowAddLabSampleModal] = useState<boolean>(false);
  const [showCoaCertificateModal, setShowCoaCertificateModal] = useState<boolean>(false);
  const [showLabReagentModal, setShowLabReagentModal] = useState<boolean>(false);
  const [selectedLabSample, setSelectedLabSample] = useState<any | null>(null);
  const [labSubTab, setLabSubTab] = useState<'DASHBOARD' | 'MASTER_DATA_LAB'>('DASHBOARD');
  const [masterLabSubTab, setMasterLabSubTab] = useState<'ELEMENTS' | 'EQUIPMENT' | 'REAGENTS' | 'SURVEYORS'>('ELEMENTS');

  // Inventory Dashboard & Master Data States
  const [invSubTab, setInvSubTab] = useState<'OPERATIONAL_INVENTORY' | 'MASTER_DATA_INVENTORY'>('OPERATIONAL_INVENTORY');
  const [masterInvSubTab, setMasterInvSubTab] = useState<'SKU_CATALOG' | 'RACK_LOCATIONS' | 'VENDORS' | 'UOM_UNITS'>('SKU_CATALOG');
  const [invCategoryFilter, setInvCategoryFilter] = useState<string>('ALL');
  const [invSearch, setInvSearch] = useState<string>('');
  const [showAddSkuModal, setShowAddSkuModal] = useState<boolean>(false);

  // Automatically update active tab when user role changes
  useEffect(() => {
    setActiveTab(roleConfig.defaultDashboardTab as any);
  }, [currentUserRole]);

  const [selectedSiteFilter, setSelectedSiteFilter] = useState<string>('ALL');
  const [shiftFilter, setShiftFilter] = useState<'ALL' | 'SHIFT_1' | 'SHIFT_2'>('ALL');
  const [periodFilter, setPeriodFilter] = useState<'TODAY' | 'THIS_WEEK' | 'THIS_MONTH' | 'YTD'>('TODAY');

  // Payroll Dashboard States
  const [payrollPeriod, setPayrollPeriod] = useState<'Agustus 2026' | 'Juli 2026' | 'Juni 2026'>('Agustus 2026');
  const [payrollDeptFilter, setPayrollDeptFilter] = useState<string>('ALL');
  const [payrollSearch, setPayrollSearch] = useState<string>('');
  const [selectedSlipEmployee, setSelectedSlipEmployee] = useState<any | null>(null);
  const [ritaseBonusRate, setRitaseBonusRate] = useState<number>(25000);
  const [overtimeHourlyRate, setOvertimeHourlyRate] = useState<number>(45000);
  const [showSimulateModal, setShowSimulateModal] = useState<boolean>(false);

  // Supplier & Vendor Dashboard States
  const [vendorCategoryFilter, setVendorCategoryFilter] = useState<string>('ALL');
  const [vendorSearch, setVendorSearch] = useState<string>('');
  const [selectedPO, setSelectedPO] = useState<any | null>(null);
  const [showCreatePOModal, setShowCreatePOModal] = useState<boolean>(false);
  const [newPOVendor, setNewPOVendor] = useState<string>('PT Pertamina Patra Niaga');
  const [newPOCategory, setNewPOCategory] = useState<string>('BBM Solar B35');
  const [newPOItem, setNewPOItem] = useState<string>('High Speed Diesel (HSD) B35 Industri');
  const [newPOQty, setNewPOQty] = useState<number>(50000);
  const [newPOPrice, setNewPOPrice] = useState<number>(14500);

  // Auditor & Compliance Dashboard States
  const [auditModuleFilter, setAuditModuleFilter] = useState<string>('ALL');
  const [auditSearch, setAuditSearch] = useState<string>('');
  const [selectedAuditLog, setSelectedAuditLog] = useState<any | null>(null);
  const [showComplianceVerifyModal, setShowComplianceVerifyModal] = useState<boolean>(false);
  const [auditPeriodFilter, setAuditPeriodFilter] = useState<string>('Q3_2026');

  // Tax & PNBP Dashboard States
  const [taxCategoryFilter, setTaxCategoryFilter] = useState<string>('ALL');
  const [taxSearch, setTaxSearch] = useState<string>('');
  const [taxPeriodFilter, setTaxPeriodFilter] = useState<string>('AGUSTUS_2026');
  const [selectedTaxBill, setSelectedTaxBill] = useState<any | null>(null);
  const [showSimponiCalcModal, setShowSimponiCalcModal] = useState<boolean>(false);
  const [calcOreGrade, setCalcOreGrade] = useState<number>(1.8);
  const [calcVolumeMT, setCalcVolumeMT] = useState<number>(45000);
  const [calcHpmUsd, setCalcHpmUsd] = useState<number>(42.5);
  const [calcExchangeRate, setCalcExchangeRate] = useState<number>(16250);

  // Finance & Cash Flow Dashboard States
  const [finCategoryFilter, setFinCategoryFilter] = useState<string>('ALL');
  const [finSearch, setFinSearch] = useState<string>('');
  const [finPeriodFilter, setFinPeriodFilter] = useState<string>('AGUSTUS_2026');
  const [selectedFinRecord, setSelectedFinRecord] = useState<any | null>(null);
  const [showFinSimModal, setShowFinSimModal] = useState<boolean>(false);
  const [simHmaPrice, setSimHmaPrice] = useState<number>(16450);
  const [simSalesVolume, setSimSalesVolume] = useState<number>(180000);
  const [simCashCostTarget, setSimCashCostTarget] = useState<number>(26.8);

  // Accounting & General Ledger Dashboard States
  const [accCategoryFilter, setAccCategoryFilter] = useState<string>('ALL');
  const [accSearch, setAccSearch] = useState<string>('');
  const [accPeriodFilter, setAccPeriodFilter] = useState<string>('AGUSTUS_2026');
  const [selectedAccVoucher, setSelectedAccVoucher] = useState<any | null>(null);
  const [showAccNewJournalModal, setShowAccNewJournalModal] = useState<boolean>(false);
  const [showTrialBalanceModal, setShowTrialBalanceModal] = useState<boolean>(false);

  // Legal, Perizinan & Contract Management Dashboard States
  const [legalCategoryFilter, setLegalCategoryFilter] = useState<string>('ALL');
  const [legalSearch, setLegalSearch] = useState<string>('');
  const [legalStatusFilter, setLegalStatusFilter] = useState<string>('ALL');
  const [selectedLegalDoc, setSelectedLegalDoc] = useState<any | null>(null);
  const [showNewContractModal, setShowNewContractModal] = useState<boolean>(false);
  const [showPermitAuditModal, setShowPermitAuditModal] = useState<boolean>(false);

  // Community Development, CSR & PPM Dashboard States
  const [comdevPillarFilter, setComdevPillarFilter] = useState<string>('ALL');
  const [comdevSearch, setComdevSearch] = useState<string>('');
  const [comdevRingFilter, setComdevRingFilter] = useState<string>('ALL');
  const [selectedComdevProgram, setSelectedComdevProgram] = useState<any | null>(null);
  const [showNewComdevProgramModal, setShowNewComdevProgramModal] = useState<boolean>(false);
  const [showPpmReportModal, setShowPpmReportModal] = useState<boolean>(false);

  // Environmental Officer, AMDAL & Rekultivasi Dashboard States
  const [envCategoryFilter, setEnvCategoryFilter] = useState<string>('ALL');
  const [envSearch, setEnvSearch] = useState<string>('');
  const [envStatusFilter, setEnvStatusFilter] = useState<string>('ALL');
  const [selectedEnvSample, setSelectedEnvSample] = useState<any | null>(null);
  const [showNewEnvSampleModal, setShowNewEnvSampleModal] = useState<boolean>(false);
  const [showAmdalAuditModal, setShowAmdalAuditModal] = useState<boolean>(false);

  // Medical, Occupational Health & Fit-To-Work Klinik Site Dashboard States
  const [medCategoryFilter, setMedCategoryFilter] = useState<string>('ALL');
  const [medSearch, setMedSearch] = useState<string>('');
  const [medStatusFilter, setMedStatusFilter] = useState<string>('ALL');
  const [selectedMedicalRecord, setSelectedMedicalRecord] = useState<any | null>(null);
  const [showNewMedicalCheckupModal, setShowNewMedicalCheckupModal] = useState<boolean>(false);
  const [showFitToWorkAuditModal, setShowFitToWorkAuditModal] = useState<boolean>(false);

  // Employee, SDM Site & HRIS Dashboard States
  const [empCategoryFilter, setEmpCategoryFilter] = useState<string>('ALL');
  const [empSearch, setEmpSearch] = useState<string>('');
  const [empStatusFilter, setEmpStatusFilter] = useState<string>('ALL');
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [showNewLeaveRequestModal, setShowNewLeaveRequestModal] = useState<boolean>(false);
  const [showHrComplianceAuditModal, setShowHrComplianceAuditModal] = useState<boolean>(false);

  // Interactive Fit-To-Work Karyawan Screening States
  const [showEmployeeFitToWorkModal, setShowEmployeeFitToWorkModal] = useState<boolean>(false);
  const [ftwStep, setFtwStep] = useState<number>(1);
  const [ftwEmployeeNik, setFtwEmployeeNik] = useState<string>('EMP-1024');
  const [ftwEmployeeName, setFtwEmployeeName] = useState<string>('Bambang Supriyadi');
  const [ftwRole, setFtwRole] = useState<string>('Operator Excavator CAT 390');
  const [ftwShift, setFtwShift] = useState<string>('SHIFT_1_DAY');
  const [ftwSleepHours, setFtwSleepHours] = useState<number>(7.5);
  const [ftwFatigueLevel, setFtwFatigueLevel] = useState<number>(2); // 1-7 scale
  const [ftwSystolic, setFtwSystolic] = useState<number>(120);
  const [ftwDiastolic, setFtwDiastolic] = useState<number>(80);
  const [ftwHeartRate, setFtwHeartRate] = useState<number>(75);
  const [ftwAlcoholBac, setFtwAlcoholBac] = useState<number>(0.00);
  const [ftwDrugTest, setFtwDrugTest] = useState<string>('NEGATIVE');
  const [ftwMedication, setFtwMedication] = useState<boolean>(false);
  const [ftwComplaints, setFtwComplaints] = useState<string>('Tidak Ada (Kondisi Prima)');
  const [ftwReactionScore, setFtwReactionScore] = useState<number>(265); // ms
  const [ftwReactionTesting, setFtwReactionTesting] = useState<boolean>(false);
  const [ftwResultBadge, setFtwResultBadge] = useState<any | null>(null);
  const [transporterTickets, setTransporterTickets] = useState([
    {
      ticketNo: 'SJT-MOR-2026-04821',
      truckCode: 'DT-1002 (Cat 777E)',
      driverName: 'Andi Suherman',
      vendorName: 'PT Cipta Karsa Transporter',
      origin: 'Pit Alpha (Saprolite HG)',
      destination: 'Stockpile EFO Jetty 01',
      materialType: 'Saprolite Ore (Ni 1.82%)',
      grossTon: 84.5,
      tareTon: 30.2,
      nettoWmt: 54.3,
      departureTime: '08:15 WITA',
      etaTime: '09:05 WITA',
      status: 'IN_TRANSIT',
      speedKmh: 32,
      fuelUsedLiters: 18.2
    },
    {
      ticketNo: 'SJT-MOR-2026-04820',
      truckCode: 'DT-1005 (Komatsu HD785)',
      driverName: 'Budi Santoso',
      vendorName: 'PT Cipta Karsa Transporter',
      origin: 'Pit Beta (Saprolite MG)',
      destination: 'EFO Stockpile Zone B',
      materialType: 'Saprolite Ore (Ni 1.65%)',
      grossTon: 82.0,
      tareTon: 29.8,
      nettoWmt: 52.2,
      departureTime: '08:00 WITA',
      etaTime: '08:45 WITA',
      status: 'WEIGHBRIDGE_VERIFIED',
      speedKmh: 0,
      fuelUsedLiters: 17.8
    },
    {
      ticketNo: 'SJT-MOR-2026-04819',
      truckCode: 'DT-1008 (Volvo FMX 440)',
      driverName: 'Dedi Kurniawan',
      vendorName: 'PT Trans Utama Mining',
      origin: 'Pit Limonite HPAL',
      destination: 'Stockpile Limonite Smelter',
      materialType: 'Limonite Ore (Ni 1.25%)',
      grossTon: 78.4,
      tareTon: 28.1,
      nettoWmt: 50.3,
      departureTime: '07:30 WITA',
      etaTime: '08:15 WITA',
      status: 'UNLOADED',
      speedKmh: 0,
      fuelUsedLiters: 16.5
    },
    {
      ticketNo: 'SJT-MOR-2026-04818',
      truckCode: 'DT-1012 (Scania P410)',
      driverName: 'Rian Hidayat',
      vendorName: 'PT Cipta Karsa Transporter',
      origin: 'Pit Alpha (Saprolite HG)',
      destination: 'Jetty Hopper Barging 02',
      materialType: 'Saprolite Ore (Ni 1.90%)',
      grossTon: 86.2,
      tareTon: 30.5,
      nettoWmt: 55.7,
      departureTime: '07:10 WITA',
      etaTime: '07:55 WITA',
      status: 'UNLOADED',
      speedKmh: 0,
      fuelUsedLiters: 19.1
    }
  ]);

  const [newTruckCode, setNewTruckCode] = useState('DT-1015 (Cat 777E)');
  const [newDriverName, setNewDriverName] = useState('Bambang Permana');
  const [newOriginPit, setNewOriginPit] = useState('Pit Alpha (Saprolite HG)');
  const [newDestination, setNewDestination] = useState('Stockpile EFO Jetty 01');
  const [newMaterialType, setNewMaterialType] = useState('Saprolite Ore (Ni 1.80%)');
  const [newEstWeight, setNewEstWeight] = useState('54.5');

  const handleCreateHaulingTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = {
      ticketNo: `SJT-MOR-2026-0${Math.floor(4822 + Math.random() * 500)}`,
      truckCode: newTruckCode,
      driverName: newDriverName,
      vendorName: 'PT Cipta Karsa Transporter',
      origin: newOriginPit,
      destination: newDestination,
      materialType: newMaterialType,
      grossTon: parseFloat(newEstWeight) + 30.0,
      tareTon: 30.0,
      nettoWmt: parseFloat(newEstWeight) || 52.0,
      departureTime: `${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA`,
      etaTime: 'Est. 45 Menit',
      status: 'IN_TRANSIT',
      speedKmh: 30,
      fuelUsedLiters: 18.0
    };

    setTransporterTickets([newTicket, ...transporterTickets]);
    setExportNotice(`E-Surat Jalan ${newTicket.ticketNo} Berhasil Diterbitkan! Truck ${newTruckCode} In-Transit.`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  // Mine Logbook State for KTT
  const [kttLogs, setKttLogs] = useState([
    {
      id: 'LOG-KTT-2026-0881',
      timestamp: '06 Agu 2026 08:30 WITA',
      author: 'Ir. Hendra Kurniawan, S.T., M.T., IPU (KTT)',
      category: 'INSTRUKSI_KESELAMATAN',
      pitLocation: 'Pit Beta Sektor Utara',
      instruction: 'Instruksi KTT No. 142/KTT-MOR/VIII/2026: Lakukan penghentian sementara kegiatan loading ore di Bench 18 Pit Beta Sektor Utara dikarenakan curah hujan > 45mm/jam. Buka drainase darurat dan aktifkan pompa dewatering Highwall.',
      status: 'IN_PROGRESS',
      pjoAssigned: 'PT Cipta Karsa Kontraktor (PJO: Bpk. Agus Setiawan)'
    },
    {
      id: 'LOG-KTT-2026-0880',
      timestamp: '05 Agu 2026 16:15 WITA',
      author: 'Ir. Hendra Kurniawan, S.T., M.T., IPU (KTT)',
      category: 'INSPEKSI_GEOTEKNIK',
      pitLocation: 'Pit Alpha Highwall',
      instruction: 'Pemeriksaan lereng Highwall Pit Alpha pasca peledakan. Sensor InSAR menunjukkan displacement < 1.2 mm/hari. Factor of Safety (FK) = 1.42 (SAFE). Penggalian dapat dilanjutkan ke Bench 22.',
      status: 'APPROVED',
      pjoAssigned: 'Superintendent Mine Plan & Geotech'
    },
    {
      id: 'LOG-KTT-2026-0879',
      timestamp: '05 Agu 2026 10:00 WITA',
      author: 'Bpk. Ridwan (Inspektur Tambang ESDM - Audit)',
      category: 'AUDIT_ESDM',
      pitLocation: 'Settling Pond 02 & EFO Stockpile',
      instruction: 'Catatan Inspektur Tambang: Hasil pengujian pH air tambang di outlet Settling Pond 02 mencatatkan angka 7.2 dengan TSS 42 mg/L (Baku Mutu Terpenuhi). Pertahankan pengapuran dosis rutin.',
      status: 'COMPLETED',
      pjoAssigned: 'Manager K3LH & Pengelolaan Lingkungan'
    }
  ]);

  const [newInstructionText, setNewInstructionText] = useState('');
  const [newInstructionCategory, setNewInstructionCategory] = useState('INSTRUKSI_KESELAMATAN');
  const [newInstructionPit, setNewInstructionPit] = useState('Pit Alpha');
  const [newInstructionPjo, setNewInstructionPjo] = useState('PT Cipta Karsa Kontraktor');

  const handleAddKttInstruction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstructionText.trim()) return;

    const newLog = {
      id: `LOG-KTT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: `${new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })} ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA`,
      author: 'Ir. Hendra Kurniawan, S.T., M.T., IPU (KTT)',
      category: newInstructionCategory,
      pitLocation: newInstructionPit,
      instruction: newInstructionText.trim(),
      status: 'IN_PROGRESS',
      pjoAssigned: newInstructionPjo
    };

    setKttLogs([newLog, ...kttLogs]);
    setNewInstructionText('');
    setExportNotice('Instruksi KTT Baru Berhasil Disimpan ke Buku Tambang Digital ESDM!');
    setTimeout(() => setExportNotice(null), 4000);
  };

  // Real-time live simulation stream state
  const [isLiveStreaming, setIsLiveStreaming] = useState<boolean>(true);
  const [autoRefreshIntervalSec, setAutoRefreshIntervalSec] = useState<number>(3);
  const [lastUpdatedTime, setLastUpdatedTime] = useState<string>('');
  const [tickCounter, setTickCounter] = useState<number>(0);

  // Live dynamic telemetry state
  const [liveMetrics, setLiveMetrics] = useState({
    hourlyObBCM: 14850,
    hourlyOreMT: 8420,
    jettyConveyorTph: 1250,
    averageNiGrade: 1.84,
    fuelConsumptionLph: 42.5,
    activeEquipmentCount: 38,
    settlingPondPh: 7.2
  });

  // Export notification feedback
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Live simulation tick timer
  useEffect(() => {
    setLastUpdatedTime(new Date().toLocaleTimeString('id-ID'));

    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setTickCounter(prev => prev + 1);
      setLastUpdatedTime(new Date().toLocaleTimeString('id-ID'));

      // Micro fluctuations to simulate real IoT sensors
      setLiveMetrics(prev => ({
        hourlyObBCM: Math.round(prev.hourlyObBCM + (Math.random() * 40 - 20)),
        hourlyOreMT: Math.round(prev.hourlyOreMT + (Math.random() * 30 - 15)),
        jettyConveyorTph: Math.min(1500, Math.max(900, Math.round(prev.jettyConveyorTph + (Math.random() * 20 - 10)))),
        averageNiGrade: Number((Math.min(1.95, Math.max(1.75, prev.averageNiGrade + (Math.random() * 0.02 - 0.01)))).toFixed(2)),
        fuelConsumptionLph: Number((Math.min(50, Math.max(38, prev.fuelConsumptionLph + (Math.random() * 0.4 - 0.2)))).toFixed(1)),
        activeEquipmentCount: Math.min(equipment.length, Math.max(30, Math.round(prev.activeEquipmentCount + (Math.random() > 0.8 ? (Math.random() > 0.5 ? 1 : -1) : 0)))),
        settlingPondPh: Number((Math.min(7.8, Math.max(6.8, prev.settlingPondPh + (Math.random() * 0.04 - 0.02)))).toFixed(1))
      }));
    }, autoRefreshIntervalSec * 1000);

    return () => clearInterval(interval);
  }, [isLiveStreaming, autoRefreshIntervalSec, equipment.length]);

  const handleManualRefresh = () => {
    setLastUpdatedTime(new Date().toLocaleTimeString('id-ID'));
    setLiveMetrics(prev => ({
      ...prev,
      hourlyObBCM: Math.round(14850 + (Math.random() * 200 - 100)),
      hourlyOreMT: Math.round(8420 + (Math.random() * 150 - 75))
    }));
  };

  const triggerExport = (type: 'PDF' | 'EXCEL') => {
    setExportNotice(`Laporan Dasbor Analitik Real-Time (${type}) berhasil disiapkan & diunduh!`);
    setTimeout(() => setExportNotice(null), 4000);
  };

  // Datasets
  const rkabProductionData = [
    { month: 'Jan', targetMT: 250000, actualMT: 242000, saproliteNi: 1.81, costPerTon: 28.5 },
    { month: 'Feb', targetMT: 250000, actualMT: 248000, saproliteNi: 1.83, costPerTon: 27.8 },
    { month: 'Mar', targetMT: 250000, actualMT: 255000, saproliteNi: 1.80, costPerTon: 27.2 },
    { month: 'Apr', targetMT: 250000, actualMT: 238000, saproliteNi: 1.79, costPerTon: 29.1 },
    { month: 'Mei', targetMT: 250000, actualMT: 261000, saproliteNi: 1.84, costPerTon: 26.9 },
    { month: 'Jun', targetMT: 250000, actualMT: 265000, saproliteNi: 1.85, costPerTon: 26.5 },
    { month: 'Jul', targetMT: 250000, actualMT: 258000, saproliteNi: 1.82, costPerTon: 27.0 },
    { month: 'Agu (Est)', targetMT: 250000, actualMT: 262000, saproliteNi: 1.84, costPerTon: 26.8 }
  ];

  const gradeDistributionData = [
    { name: 'Saprolite High Grade (>=1.8% Ni)', value: 45, color: '#10B981' },
    { name: 'Saprolite Mid Grade (1.5-1.79% Ni)', value: 30, color: '#F59E0B' },
    { name: 'Limonite HPAL Feed (<1.5% Ni)', value: 25, color: '#3B82F6' }
  ];

  const hpmTrendData = [
    { period: 'Jan 26', hma: 15800, saproliteUSD: 50.56, royaltyRate: 10 },
    { period: 'Mar 26', hma: 16100, saproliteUSD: 51.52, royaltyRate: 10 },
    { period: 'Mei 26', hma: 16250, saproliteUSD: 52.00, royaltyRate: 10 },
    { period: 'Jul 26', hma: 16400, saproliteUSD: 52.48, royaltyRate: 10 },
    { period: 'Agu 26', hma: 16450, saproliteUSD: 52.64, royaltyRate: 10 }
  ];

  const radarKPIPerformance = [
    { subject: 'Produksi', A: 96, fullMark: 100 },
    { subject: 'Keselamatan HSE', A: 99, fullMark: 100 },
    { subject: 'Efisiensi BBM', A: 88, fullMark: 100 },
    { subject: 'Kadar Ni Grade', A: 94, fullMark: 100 },
    { subject: 'OEE Equipment', A: 91, fullMark: 100 },
    { subject: 'Revegetasi ESG', A: 92, fullMark: 100 }
  ];

  const cycleTimeHourly = [
    { hour: '07:00', avgCycleMin: 22, dtSpeedKmh: 32, congestionLevel: 'LOW' },
    { hour: '09:00', avgCycleMin: 24, dtSpeedKmh: 30, congestionLevel: 'LOW' },
    { hour: '11:00', avgCycleMin: 28, dtSpeedKmh: 26, congestionLevel: 'MEDIUM' },
    { hour: '13:00', avgCycleMin: 25, dtSpeedKmh: 29, congestionLevel: 'LOW' },
    { hour: '15:00', avgCycleMin: 29, dtSpeedKmh: 24, congestionLevel: 'HIGH' },
    { hour: '17:00', avgCycleMin: 23, dtSpeedKmh: 31, congestionLevel: 'LOW' }
  ];

  const environmentPondMetrics = [
    { pond: 'Settling Pond Pit Alpha', ph: liveMetrics.settlingPondPh, ntu: 18, status: 'NORMAL' },
    { pond: 'Settling Pond Pit Beta', ph: 6.9, ntu: 24, status: 'NORMAL' },
    { pond: 'Settling Pond EFO Stockpile', ph: 7.4, ntu: 15, status: 'NORMAL' },
    { pond: 'Settling Pond Jetty Port', ph: 7.1, ntu: 32, status: 'WARNING' }
  ];

  const totalStockpileTonnage = stockpiles.reduce((acc, s) => acc + s.currentTonnageMT, 0);
  const totalBargeTonnageLoaded = barges.reduce((acc, b) => acc + b.loadedTonnageMT, 0);
  const operationalFleetCount = equipment.filter(e => e.status === 'OPERATIONAL').length;

  return (
    <div className="space-y-6">
      
      {/* Export Notification Popover */}
      {exportNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-bold text-xs flex items-center justify-between shadow-xl animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{exportNotice}</span>
          </div>
          <button onClick={() => setExportNotice(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Top Banner & Live Control Bar */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl space-y-4">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isLiveStreaming ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                {isLiveStreaming ? 'Dasbor Analitik Stream Real-Time Active' : 'Real-Time Stream Paused'}
              </span>
              <span className="text-slate-400 text-xs">• Site Morowali & Halmahera Tbk</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              {language === 'id' ? 'NickelSmart Dasbor Analitik & Pusat Kendali Real-Time' : 'NickelSmart Real-Time Analytics & Control Hub'}
            </h1>
            <p className="text-xs text-slate-400 max-w-2xl mt-1">
              Pemantauan telemetry live IoT, tren produksi ore, fluktuasi HPM, efisiensi BBM B35, status tongkang jetty, hingga peta GIS lokasi pit secara real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Live Stream Toggle */}
            <button
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                isLiveStreaming 
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
            >
              {isLiveStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isLiveStreaming ? 'Pause Streaming' : 'Start Live Stream'}</span>
            </button>

            {/* Manual Refresh */}
            <button
              onClick={handleManualRefresh}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-emerald-500 transition-all"
              title="Refresh Data Sekarang"
            >
              <RefreshCw className="w-4 h-4 text-emerald-400" />
            </button>

            {/* Export Buttons */}
            <button
              onClick={() => triggerExport('PDF')}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-indigo-500 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export PDF</span>
            </button>

            <button
              onClick={onOpenAIDrawer}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span>Analisis AI NickelSmart</span>
            </button>
          </div>
        </div>

        {/* Real-time Ticker & Global Filters */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-slate-400">Update Terakhir:</span>
              <strong className="text-emerald-400 font-bold">{lastUpdatedTime}</strong>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 font-mono text-[11px]">
              <span className="text-slate-400">Interval Stream:</span>
              <select
                value={autoRefreshIntervalSec}
                onChange={(e) => setAutoRefreshIntervalSec(Number(e.target.value))}
                className="bg-transparent text-indigo-300 font-bold focus:outline-none"
              >
                <option value={1} className="bg-slate-900">1 Detik</option>
                <option value={3} className="bg-slate-900">3 Detik</option>
                <option value={5} className="bg-slate-900">5 Detik</option>
                <option value={10} className="bg-slate-900">10 Detik</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            {/* Filter Site */}
            <select
              value={selectedSiteFilter}
              onChange={(e) => setSelectedSiteFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-bold focus:border-indigo-500"
            >
              <option value="ALL">Semua Site (Morowali + Halmahera)</option>
              <option value="MOROWALI">Site Morowali Bahodopi</option>
              <option value="HALMAHERA">Site Weda Bay Halmahera</option>
            </select>

            {/* Filter Shift */}
            <select
              value={shiftFilter}
              onChange={(e) => setShiftFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-bold focus:border-indigo-500"
            >
              <option value="ALL">Semua Shift (24 Jam)</option>
              <option value="SHIFT_1">Shift 1 (07:00 - 19:00)</option>
              <option value="SHIFT_2">Shift 2 (19:00 - 07:00)</option>
            </select>

            {/* Filter Period */}
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value as any)}
              className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-bold focus:border-indigo-500"
            >
              <option value="TODAY">Hari Ini (Live)</option>
              <option value="THIS_WEEK">Minggu Ini</option>
              <option value="THIS_MONTH">Bulan Ini</option>
              <option value="YTD">Year To Date (YTD)</option>
            </select>
          </div>

        </div>

      </div>

      {/* Dynamic Streaming KPI Bar across top */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Stripping OB Rate</span>
          <strong className="text-lg font-bold text-slate-100 font-mono">{(liveMetrics.hourlyObBCM ?? 0).toLocaleString('id-ID')}</strong>
          <span className="text-[10px] text-emerald-400 block font-mono">BCM / Shift</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Ore Production Rate</span>
          <strong className="text-lg font-bold text-emerald-400 font-mono">{(liveMetrics.hourlyOreMT ?? 0).toLocaleString('id-ID')}</strong>
          <span className="text-[10px] text-slate-400 block font-mono">WMT / Shift</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Jetty Conveyor Rate</span>
          <strong className="text-lg font-bold text-amber-300 font-mono">{liveMetrics.jettyConveyorTph}</strong>
          <span className="text-[10px] text-slate-400 block font-mono">MT / Hour</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Average Ni Grade</span>
          <strong className="text-lg font-bold text-indigo-300 font-mono">{liveMetrics.averageNiGrade}% Ni</strong>
          <span className="text-[10px] text-emerald-400 block font-mono">High Grade Blend</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Konsumsi BBM B35</span>
          <strong className="text-lg font-bold text-sky-400 font-mono">{liveMetrics.fuelConsumptionLph}</strong>
          <span className="text-[10px] text-slate-400 block font-mono">Liters / Hour</span>
        </div>

        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 font-mono block uppercase">Active Equipment</span>
          <strong className="text-lg font-bold text-purple-300 font-mono">{liveMetrics.activeEquipmentCount} / {equipment.length}</strong>
          <span className="text-[10px] text-emerald-400 block font-mono">92.8% Availability</span>
        </div>
      </div>

      {/* Role Dashboard Access Info Banner */}
      <div className="p-3 bg-slate-900 border border-blue-500/30 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-slate-400">
            Akses Tab Dasbor Diselaraskan Peran: <strong className="text-white font-extrabold">{currentUserRole}</strong>
          </span>
          <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold">
            {roleConfig.allowedDashboardTabs.length} Tab Diberikan Hak Akses
          </span>
        </div>

        <button
          onClick={() => setShowAllTabs(!showAllTabs)}
          className="text-blue-400 hover:text-blue-300 text-[11px] font-bold underline transition-colors"
        >
          {showAllTabs ? '🔒 Filter Hanya Tab Peran Aktif' : '👁️ Tampilkan Semua Tab Dasbor'}
        </button>
      </div>

      {/* Navigation Sub-Dashboard Bar */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'executive', label: '👑 Executive Analytics', icon: BarChart3 },
          { id: 'bi_analytics', label: '📈 Business Intelligence (BI)', icon: Activity },
          { id: 'production_analytics', label: '⛏️ Production & Ore Analytics', icon: Pickaxe },
          { id: 'realtime_kpi', label: '📡 Realtime Live KPI Stream', icon: Radio },
          { id: 'operational', label: '🧭 Operational Pit & Hauling', icon: Compass },
          { id: 'financial', label: '💰 Keuangan & Cash Flow KPI', icon: Coins },
          { id: 'production', label: '📦 Production & Ore Blending', icon: Layers },
          { id: 'fuel_analytics', label: '🔥 Fuel Analytics', icon: Flame },
          { id: 'cost_analytics', label: '💵 Cost Analytics', icon: DollarSign },
          { id: 'profitability', label: '📊 Profitability', icon: TrendingUp },
          { id: 'forecast_ai', label: '✨ Forecast & AI Insight', icon: Sparkles },
          { id: 'ai', label: '⚡ AI MineGPT Insights', icon: Zap },
          { id: 'gis_map', label: '📍 GIS Pit Live Map', icon: MapPin }
        ]
        .filter(tab => showAllTabs || isDashboardTabAllowedForRole(currentUserRole, tab.id as any))
        .map(tab => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          const isAllowed = isDashboardTabAllowedForRole(currentUserRole, tab.id as any);

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive 
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold' 
                  : isAllowed 
                    ? 'bg-slate-900 text-slate-300 hover:text-white' 
                    : 'bg-slate-950/80 text-slate-500 border border-slate-800'
              }`}
            >
              <IconComp className="w-4 h-4" />
              <span>{tab.label}</span>
              {!isAllowed && (
                <span className="text-[9px] px-1 bg-rose-500/20 text-rose-300 rounded">LOCKED</span>
              )}
            </button>
          );
        })}
      </div>

      {/* DASHBOARD TAB 0: KTT EXECUTIVE (KEPALA TEKNIK TAMBANG) */}
      {activeTab === 'ktt_executive' && (
        <div className="space-y-6">
          
          {/* Official KTT Authorization & Legal Badge Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 border-2 border-amber-500/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 p-0.5 shrink-0 shadow-lg shadow-amber-950/50">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                    <Award className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      PENGESAHAN ESDM AKTIF
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      SK KaIT ESDM No. 182/ESDM-MINERBA/KTT/2026
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    DASBOR EKSEKUTIF KEPALA TEKNIK TAMBANG (KTT)
                  </h2>

                  <p className="text-xs text-amber-200/80 max-w-2xl font-medium">
                    Pusat Pengawasan Kaidah Teknik Pertambangan Yang Baik (<strong className="text-amber-300">Kepmen ESDM 1827 K/30/MEM/2018</strong>), K3 Pertambangan, Kestabilan Geoteknik Pit, Baku Mutu Lingkungan, & Kepatuhan RKAB Nikel.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      KTT Terdaftar: <strong className="text-white">Ir. Hendra Kurniawan, S.T., M.T., IPU</strong>
                    </span>
                    <span className="text-slate-400">• Site Morowali & Weda Bay Tbk</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-amber-500/30 text-center">
                  <span className="text-[10px] text-amber-300 font-mono uppercase block">GMP Audit Rating</span>
                  <strong className="text-xl font-extrabold text-amber-400 font-mono">98.4 / 100</strong>
                  <span className="text-[9px] text-emerald-400 font-bold block uppercase mt-0.5">SANGAT BAIK (A)</span>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/30 text-center">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Jam Kerja Selamat</span>
                  <strong className="text-xl font-extrabold text-emerald-400 font-mono">12.84M</strong>
                  <span className="text-[9px] text-emerald-400 font-bold block uppercase mt-0.5">ZERO FATALITY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core KTT KPI Stat Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: K3 Pertambangan & Zero Fatality */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Keselamatan Kerja K3</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-2xl font-black text-emerald-400 font-mono">12,840,500</strong>
                <span className="text-xs font-bold text-emerald-400">Jam Kerja</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">FR: <strong className="text-emerald-400">0.00</strong> | SR: <strong className="text-emerald-400">0.00</strong></span>
                <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold text-[10px]">Zero Fatality</span>
              </div>
            </div>

            {/* Card 2: Geoteknik & Lereng Pit */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Kestabilan Lereng (FK)</span>
                <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                  <Gauge className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-2xl font-black text-sky-300 font-mono">FK 1.42</strong>
                <span className="text-xs font-bold text-emerald-400">Min &gt; 1.30 (SAFE)</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">InSAR Radar: <strong className="text-sky-300">1.2 mm/day</strong></span>
                <span className="text-emerald-400 font-bold">Pit Slope Normal</span>
              </div>
            </div>

            {/* Card 3: Realisasi RKAB Nikel ESDM */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Realisasi RKAB ESDM</span>
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Pickaxe className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-2xl font-black text-amber-300 font-mono">1.845M WMT</strong>
                <span className="text-xs font-bold text-amber-400">73.8% RKAB</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">Quota: <strong className="text-slate-200">2.50M WMT</strong></span>
                <span className="text-amber-400 font-bold">SR 3.65 BCM/MT</span>
              </div>
            </div>

            {/* Card 4: Environmental Compliance (Baku Mutu Air) */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Baku Mutu Air Tambang</span>
                <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Droplets className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-2xl font-black text-indigo-300 font-mono">pH {liveMetrics.settlingPondPh}</strong>
                <span className="text-xs font-bold text-emerald-400">Baku Mutu LHK</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">TSS: <strong className="text-indigo-300">42 mg/L</strong> (&lt; 200)</span>
                <span className="text-emerald-400 font-bold">Settling Pond OK</span>
              </div>
            </div>

          </div>

          {/* Section 2: Mine Logbook Digital KTT & Interactive Instructions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form Input Instruksi KTT Baru */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Terbitkan Instruksi KTT Resmi</h3>
                  <p className="text-[11px] text-slate-400">Buku Tambang Digital Terkoneksi Inspektur ESDM</p>
                </div>
              </div>

              <form onSubmit={handleAddKttInstruction} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Kategori Instruksi KTT:</label>
                  <select
                    value={newInstructionCategory}
                    onChange={(e) => setNewInstructionCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-amber-500"
                  >
                    <option value="INSTRUKSI_KESELAMATAN">⚠️ Instruksi Keselamatan Kerja & Pit Stop</option>
                    <option value="INSPEKSI_GEOTEKNIK">🏔️ Pengawasan Geoteknik & Kestabilan Lereng</option>

                    <option value="PENGELOLAAN_LINGKUNGAN">🌱 Pengawasan Settling Pond & Baku Mutu</option>
                    <option value="AUDIT_ESDM">🏛️ Catatan Inspektur Tambang ESDM</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Lokasi Pit / Sektor:</label>
                    <select
                      value={newInstructionPit}
                      onChange={(e) => setNewInstructionPit(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-amber-500"
                    >
                      <option value="Pit Alpha (Saprolite)">Pit Alpha (Saprolite)</option>
                      <option value="Pit Beta (Saprolite)">Pit Beta (Saprolite)</option>
                      <option value="Pit Limonite HPAL">Pit Limonite HPAL</option>
                      <option value="Settling Pond 02">Settling Pond 02</option>
                      <option value="Gudang Handak Km 08">Gudang Handak Km 08</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">PJO / Kontraktor:</label>
                    <input
                      type="text"
                      value={newInstructionPjo}
                      onChange={(e) => setNewInstructionPjo(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-amber-500"
                      placeholder="Nama PJO Kontraktor"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Detail Catatan / Instruksi KTT:</label>
                  <textarea
                    value={newInstructionText}
                    onChange={(e) => setNewInstructionText(e.target.value)}
                    rows={4}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-slate-200 font-medium focus:border-amber-500 placeholder-slate-600"
                    placeholder="Ketik instruksi resmi KTT (misal: Hentikan penggalian di Bench 18 dikarenakan intensitas hujan > 45mm/jam demi keamanan slope)..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Simpan & Terbitkan ke Buku Tambang ESDM</span>
                </button>
              </form>
            </div>

            {/* List Buku Tambang Digital (Log Book KTT) */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">Buku Tambang Digital (Official Mine Log Book ESDM)</h3>
                    <p className="text-[11px] text-slate-400">Pencatatan Hukum Instruksi KTT & Catatan Inspektur Tambang</p>
                  </div>
                </div>

                <button
                  onClick={() => triggerExport('PDF')}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 hover:border-amber-500 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Cetak Buku Tambang</span>
                </button>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                {kttLogs.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400">{log.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          {log.category.replace('_', ' ')}
                        </span>
                        <span className="text-slate-400 text-[11px]">• {log.pitLocation}</span>
                      </div>
                      <span className="text-slate-500 text-[10px] font-mono">{log.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-medium bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                      "{log.instruction}"
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Penulis: <strong className="text-slate-200">{log.author}</strong></span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Disampaikan ke {log.pjoAssigned}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 3: Geoteknik Pit Slope Radar & Baku Mutu Lingkungan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Geoteknik Slope Stability Panel */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-sky-400" />
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">Monitoring Geoteknik & Lereng Tambang (Pit Slope Stability)</h3>
                    <p className="text-[11px] text-slate-400">Sensor Radar InSAR, Prism & Factor of Safety (FK) Realtime</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SLOPE STATUS: SAFE
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 font-mono text-center">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Pit Alpha Highwall FK</span>
                  <strong className="text-lg font-bold text-sky-300">1.42</strong>
                  <span className="text-[9px] text-emerald-400 block">Target &gt; 1.30</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Pit Beta Lowwall FK</span>
                  <strong className="text-lg font-bold text-sky-300">1.38</strong>
                  <span className="text-[9px] text-emerald-400 block">Target &gt; 1.30</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">InSAR Displacement</span>
                  <strong className="text-lg font-bold text-emerald-400">1.2 mm/day</strong>
                  <span className="text-[9px] text-slate-400 block">Limit &lt; 5.0 mm</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span>Sensor Piezometer Air Tanah (PZ-01):</span>
                  <strong className="text-sky-300 font-mono">-24.5 Meter (Dewatering Normal)</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span>Crackmeter (CM-04 Sektor Timur):</span>
                  <strong className="text-emerald-400 font-mono">0.00 mm (Tanpa Rekahan)</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300 font-medium">
                  <span>Radar InSAR Scan Rate:</span>
                  <strong className="text-amber-300 font-mono">Update setiap 15 Menit</strong>
                </div>
              </div>
            </div>

            {/* Baku Mutu Lingkungan & Settling Pond ESDM */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">Baku Mutu Air Limbah & Settling Pond (Kepmen LHK 113)</h3>
                    <p className="text-[11px] text-slate-400">Pemantauan pH, TSS, Fe & Mn Outlet Air Tambang</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  COMPLIANT
                </span>
              </div>

              <div className="space-y-2.5">
                {environmentPondMetrics.map((pond, idx) => (
                  <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-slate-200 block font-bold">{pond.pond}</strong>
                      <span className="text-[11px] text-slate-400">TSS: <strong className="text-indigo-300">{pond.ntu} mg/L</strong> (Baku Mutu &lt; 200 mg/L)</span>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black text-emerald-400 font-mono block">pH {pond.ph}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${pond.status === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                        {pond.status} (Baku 6-9)
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Revegetasi & Reklamasi Lahan Bekas Tambang:</span>
                <strong className="text-emerald-400 font-mono text-sm">142.5 Ha / 150.0 Ha (95%)</strong>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DASHBOARD TAB: TRANSPORTER & KONTRAKTOR HAULING */}
      {activeTab === 'transporter' && (
        <div className="space-y-6">
          
          {/* Transporter Contractor Banner Header */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-slate-950 border-2 border-blue-500/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 p-0.5 shrink-0 shadow-lg shadow-blue-950/50">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-blue-400">
                    <Truck className="w-8 h-8" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      KONTRAKTOR TRANSPORTER UTAMA
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Vendor ID: VND-TRP-2026-091
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    DASBOR KONTRAKTOR TRANSPORTER & FLEET HAULING
                  </h2>

                  <p className="text-xs text-blue-200/80 max-w-2xl font-medium">
                    Pusat Pengawasan Realtime Armada Dump Truck, E-Surat Jalan Angkut Nikel, Timbangan Elektronik (Weighbridge), Efisiensi BBM Solar B35, & Keselamatan Jalur Hauling (Haul Road Safety).
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Perusahaan: <strong className="text-white">PT Cipta Karsa Transporter</strong>
                    </span>
                    <span className="text-slate-400">• Rute: Pit Alpha / Beta ➔ Stockpile EFO & Jetty Barging (28.5 KM)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
                <div className="p-3 bg-slate-900/90 rounded-xl border border-blue-500/30 text-center">
                  <span className="text-[10px] text-blue-300 font-mono uppercase block">Armada Siap Operasi</span>
                  <strong className="text-xl font-extrabold text-blue-400 font-mono">82 / 85 DT</strong>
                  <span className="text-[9px] text-emerald-400 font-bold block uppercase mt-0.5">PA 96.4% (EXCELLENT)</span>
                </div>

                <div className="p-3 bg-slate-900/90 rounded-xl border border-emerald-500/30 text-center">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Operator / Driver</span>
                  <strong className="text-xl font-extrabold text-emerald-400 font-mono">120 SIO</strong>
                  <span className="text-[9px] text-emerald-400 font-bold block uppercase mt-0.5">100% FATIGUE FIT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transporter Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Total Tonase Angkut Hari Ini */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Total Volume Angkut</span>
                <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-2xl font-black text-blue-400 font-mono">18,420 WMT</strong>
                <span className="text-xs font-bold text-emerald-400">92.1% Target</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">Target Shift: <strong className="text-slate-200">20,000 WMT</strong></span>
                <span className="text-blue-400 font-bold">Rata-rata 53.8 Ton/Rit</span>
              </div>
            </div>

            {/* Card 2: Total Ritase Trips */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Total Ritase / Trips</span>
                <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Compass className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-2xl font-black text-emerald-400 font-mono">342 Rit</strong>
                <span className="text-xs font-bold text-emerald-400">+14 Rit vs Yesterday</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">Cycle Time: <strong className="text-emerald-300">48.5 Mnt/Trip</strong></span>
                <span className="text-emerald-400 font-bold">Haul Distance 28.5 KM</span>
              </div>
            </div>

            {/* Card 3: Konsumsi BBM Solar B35 & Efisiensi */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">BBM Solar B35 & Efisiensi</span>
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-2xl font-black text-amber-300 font-mono">18.4 L/Rit</strong>
                <span className="text-xs font-bold text-amber-400">6,292 Liter</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">Fuel Ratio: <strong className="text-amber-300">0.34 L/Ton</strong></span>
                <span className="text-emerald-400 font-bold">0.34 L/Ton (Efisien)</span>
              </div>
            </div>

            {/* Card 4: Timbangan Weighbridge & E-Ticket */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/40 transition-all space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">E-Surat Jalan & Timbangan</span>
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <strong className="text-2xl font-black text-purple-300 font-mono">338 E-Tickets</strong>
                <span className="text-xs font-bold text-purple-400">100% Verified</span>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800/80">
                <span className="text-slate-400">Queue Timbangan: <strong className="text-purple-300">4 DT Waiting</strong></span>
                <span className="text-emerald-400 font-bold">Avg Scale 1.8 Mnt</span>
              </div>
            </div>

          </div>

          {/* Section 2: Form Dispatch E-Surat Jalan & Live Dispatch Tracker */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Form Input E-Surat Jalan Hauling */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <FileText className="w-5 h-5 text-blue-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Terbit E-Surat Jalan Hauling</h3>
                  <p className="text-[11px] text-slate-400">Dispatch Dump Truck ke Timbangan & Stockpile</p>
                </div>
              </div>

              <form onSubmit={handleCreateHaulingTicket} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Pilih Unit Dump Truck (DT):</label>
                  <select
                    value={newTruckCode}
                    onChange={(e) => setNewTruckCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-blue-500"
                  >
                    <option value="DT-1002 (Cat 777E)">DT-1002 (Caterpillar 777E - 100 Ton)</option>
                    <option value="DT-1005 (Komatsu HD785)">DT-1005 (Komatsu HD785 - 100 Ton)</option>
                    <option value="DT-1008 (Volvo FMX 440)">DT-1008 (Volvo FMX 440 - 50 Ton)</option>
                    <option value="DT-1012 (Scania P410)">DT-1012 (Scania P410 - 50 Ton)</option>
                    <option value="DT-1015 (Cat 777E)">DT-1015 (Caterpillar 777E - 100 Ton)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Nama Supir / Driver SIO:</label>
                  <input
                    type="text"
                    value={newDriverName}
                    onChange={(e) => setNewDriverName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-blue-500"
                    placeholder="Nama Supir"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Asal Pit Loading:</label>
                    <select
                      value={newOriginPit}
                      onChange={(e) => setNewOriginPit(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-blue-500"
                    >
                      <option value="Pit Alpha (Saprolite HG)">Pit Alpha (Saprolite HG)</option>
                      <option value="Pit Beta (Saprolite MG)">Pit Beta (Saprolite MG)</option>
                      <option value="Pit Limonite HPAL">Pit Limonite HPAL</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Tujuan Unloading:</label>
                    <select
                      value={newDestination}
                      onChange={(e) => setNewDestination(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-blue-500"
                    >
                      <option value="Stockpile EFO Jetty 01">Stockpile EFO Jetty 01</option>
                      <option value="EFO Stockpile Zone B">EFO Stockpile Zone B</option>
                      <option value="Jetty Hopper Barging 02">Jetty Hopper Barging 02</option>
                      <option value="Stockpile Limonite Smelter">Stockpile Limonite Smelter</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Jenis Ore Nikel:</label>
                    <input
                      type="text"
                      value={newMaterialType}
                      onChange={(e) => setNewMaterialType(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Estimasi Netto (Ton):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newEstWeight}
                      onChange={(e) => setNewEstWeight(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-slate-200 font-medium focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-blue-950/40 flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  <span>Terbitkan E-Surat Jalan & Dispatch</span>
                </button>
              </form>
            </div>

            {/* List E-Surat Jalan Hauling Realtime Tracker */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">Monitoring E-Surat Jalan & Status Angkut Realtime</h3>
                    <p className="text-[11px] text-slate-400">Tracking GPS Hauling, Timbangan Jembatan, & Ritase Dump Truck</p>
                  </div>
                </div>

                <button
                  onClick={() => triggerExport('EXCEL')}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 hover:border-blue-500 text-blue-300 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Manifest Transporter</span>
                </button>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
                {transporterTickets.map((ticket) => (
                  <div key={ticket.ticketNo} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 transition-all space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-blue-400">{ticket.ticketNo}</span>
                        <span className="font-bold text-slate-100">{ticket.truckCode}</span>
                        <span className="text-slate-400 text-[11px]">• Supir: <strong className="text-slate-200">{ticket.driverName}</strong></span>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        ticket.status === 'IN_TRANSIT' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        ticket.status === 'WEIGHBRIDGE_VERIFIED' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80 font-mono">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Rute Loading/Unloading:</span>
                        <strong className="text-slate-200">{ticket.origin} ➔ {ticket.destination}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Material Ore:</span>
                        <strong className="text-amber-300">{ticket.materialType}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Berat Netto (WMT):</span>
                        <strong className="text-emerald-400">{ticket.nettoWmt} WMT (Gross {ticket.grossTon}T)</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Keberangkatan / BBM:</span>
                        <strong className="text-blue-300">{ticket.departureTime} | {ticket.fuelUsedLiters}L</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Vendor: <strong className="text-slate-300">{ticket.vendorName}</strong></span>
                      <span className="text-blue-400 font-bold flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> Kecepatan GPS: {ticket.speedKmh} km/h (Limit 35 km/h)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Section 3: Jalur Hauling Safety & Telemetry Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Status Jalur Hauling KM 00 - KM 28 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-emerald-400" />
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">Status Jalur Utama Hauling (Haul Road Safety)</h3>
                    <p className="text-[11px] text-slate-400">Pemantauan Debu, Penyiraman Water Truck, & Kecepatan Max</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ROAD OPEN
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-200 block font-bold">KM 00 - KM 10 (Sektor Tambang Pit Alpha)</strong>
                    <span className="text-slate-400 text-[11px]">Water Truck WT-01 Aktif Menyiram (Debu Rendah)</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">35 km/h Max</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-200 block font-bold">KM 10 - KM 20 (Simpang Hauling & Jembatan River)</strong>
                    <span className="text-slate-400 text-[11px]">Petugas Flagman & Lampu Warning Aktif</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">25 km/h Max</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-200 block font-bold">KM 20 - KM 28.5 (Area Timbangan & EFO Stockpile)</strong>
                    <span className="text-slate-400 text-[11px]">Antrean Timbangan 4 Dump Truck</span>
                  </div>
                  <span className="text-emerald-400 font-bold font-mono">15 km/h Max</span>
                </div>
              </div>
            </div>

            {/* Telemetry & Fatigue Camera Monitoring */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">Sistem AI Fatigue Cam Driver & Safety Violation</h3>
                    <p className="text-[11px] text-slate-400">Deteksi Kantuk, Mata Terpejam, & Overspeed GPS</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  120 DRIVERS FIT
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center font-mono">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Fatigue Alert (Hari Ini)</span>
                  <strong className="text-lg font-bold text-emerald-400">0 Kasus</strong>
                  <span className="text-[9px] text-emerald-400 block">Rest Time Cukup</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Pelanggaran Speeding</span>
                  <strong className="text-lg font-bold text-amber-300">1 Warning</strong>
                  <span className="text-[9px] text-slate-400 block">Teguran Otomatis GPS</span>
                </div>
              </div>

              <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Layanan Bantuan Darurat Hauling (24/7 Dispatch):</span>
                <strong className="text-blue-400 font-mono text-sm">Radio Ch. 08 / Hotline 889</strong>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* DASHBOARD TAB: PAYROLL & INSENTIF KARYAWAN */}
      {activeTab === 'payroll' && (
        <div className="space-y-6">
          {/* Payroll Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-slate-900 border border-blue-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wider">
                    SISTEM PENGGAJIAN TERINTEGRASI RITASE & OVERTIME
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    PERIODE: {payrollPeriod}
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-emerald-400" />
                  Dasbor Payroll, Gaji & Insentif Karyawan Tambang
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pemrosesan penggajian otomatis terkoneksi dengan telemetry jam kerja alat berat, tiket ritase hauling driver, absensi fingerprint site, BPJS Ketenagakerjaan/Kesehatan, dan perhitungan PPh 21 TER ESDM.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <select
                  value={payrollPeriod}
                  onChange={(e) => setPayrollPeriod(e.target.value as any)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="Agustus 2026">Periode: Agustus 2026</option>
                  <option value="Juli 2026">Periode: Juli 2026</option>
                  <option value="Juni 2026">Periode: Juni 2026</option>
                </select>

                <button
                  onClick={() => setShowSimulateModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Calculator className="w-4 h-4 text-amber-400" />
                  Simulasi Tarif Ritase
                </button>

                <button
                  onClick={() => alert(`Laporan Payroll ${payrollPeriod} berhasil diexport dalam format Excel/CSV untuk Mandiri Corporate Banking!`)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                >
                  <Download className="w-4 h-4" />
                  Export Batch Bank Transfer
                </button>
              </div>
            </div>
          </div>

          {/* Top KPI Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 relative overflow-hidden">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Gross Payroll Bulan Ini</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-black text-white font-mono">
                Rp 4.850.000.000
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 1.280 Karyawan Disbursed
                </span>
                <span className="text-slate-500 font-mono">100% Lunas</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Bonus Ritase Hauling Driver</span>
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-black text-amber-300 font-mono">
                Rp 842.500.000
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">33.700 Total Ritase</span>
                <span className="text-amber-400 font-bold font-mono">@ Rp {ritaseBonusRate.toLocaleString('id-ID')}/Rit</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Lembur Overtime Operasional</span>
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-black text-indigo-300 font-mono">
                Rp 412.000.000
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">9.155 Jam Overtime</span>
                <span className="text-indigo-400 font-bold font-mono">@ Rp {overtimeHourlyRate.toLocaleString('id-ID')}/Jam</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Iuran BPJS & Potongan PPh 21</span>
                <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
              </div>
              <div className="text-xl font-black text-rose-300 font-mono">
                Rp 625.000.000
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-300 font-semibold">BPJS TK & Kesehatan</span>
                <span className="text-emerald-400 font-bold">PPh 21 TER ESDM</span>
              </div>
            </div>
          </div>

          {/* Payroll Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Department Cost Allocation Bar Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    Alokasi Anggaran Payroll per Departemen Site
                  </h3>
                  <p className="text-[11px] text-slate-400">Distribusi Total Pengeluaran Gaji & Bonus per Sektor Kerja Tambang</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                  TOTAL 6 DEPARTEMEN
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Operasi Pit', total: 1450, color: '#10b981' },
                    { name: 'Hauling Driver', total: 1280, color: '#f59e0b' },
                    { name: 'Workshop', total: 780, color: '#6366f1' },
                    { name: 'Smelter & Plant', total: 650, color: '#06b6d4' },
                    { name: 'HSE & K3LH', total: 390, color: '#ec4899' },
                    { name: 'Geologi & Survey', total: 300, color: '#8b5cf6' }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} interval={0} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" Jt" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`Rp ${val} Juta`, 'Total Payroll']}
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {[
                        '#10b981', '#f59e0b', '#6366f1', '#06b6d4', '#ec4899', '#8b5cf6'
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payroll Components Pie Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-indigo-400" />
                  Komposisi Komponen Gaji
                </h3>
                <p className="text-[11px] text-slate-400">Proporsi Gaji Pokok vs Insentif Ritase & Lembur</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Gaji Pokok', value: 62, fill: '#10b981' },
                        { name: 'Insentif Ritase', value: 18, fill: '#f59e0b' },
                        { name: 'Overtime Lembur', value: 9, fill: '#6366f1' },
                        { name: 'Tunjangan Site', value: 6, fill: '#06b6d4' },
                        { name: 'BPJS & Tax', value: 5, fill: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {['#10b981', '#f59e0b', '#6366f1', '#06b6d4', '#ef4444'].map((color, index) => (
                        <Cell key={`pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`${val}%`, 'Proporsi']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Gaji Pokok</span>
                  <span className="font-mono font-bold">62% (Rp 3.007 Jt)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Insentif Ritase</span>
                  <span className="font-mono font-bold">18% (Rp 873 Jt)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Overtime Lembur</span>
                  <span className="font-mono font-bold">9% (Rp 436 Jt)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Tunjangan Site</span>
                  <span className="font-mono font-bold">6% (Rp 291 Jt)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Employee Payroll Data Table & Payslip Generator */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  Daftar Penggajian & Slip Gaji Karyawan Site Tambang
                </h3>
                <p className="text-[11px] text-slate-400">Rincian Perhitungan Take Home Pay Realtime dengan Rincian Ritase & Overtime</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Cari Nama / NIK / Jabatan..."
                  value={payrollSearch}
                  onChange={(e) => setPayrollSearch(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500 w-48"
                />

                <select
                  value={payrollDeptFilter}
                  onChange={(e) => setPayrollDeptFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">Semua Departemen</option>
                  <option value="Hauling Driver">Hauling Driver</option>
                  <option value="Operasi Tambang">Operasi Tambang</option>
                  <option value="Workshop & Fleet">Workshop & Fleet</option>
                  <option value="Smelter & Plant">Smelter & Plant</option>
                  <option value="HSE & K3LH">HSE & K3LH</option>
                  <option value="Geologi & Survey">Geologi & Survey</option>
                </select>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">Karyawan & NIK</th>
                    <th className="p-3">Departemen & Role</th>
                    <th className="p-3 text-right">Gaji Pokok</th>
                    <th className="p-3 text-right">Bonus Ritase</th>
                    <th className="p-3 text-right">Lembur</th>
                    <th className="p-3 text-right">BPJS & Tax PPh21</th>
                    <th className="p-3 text-right font-extrabold text-emerald-400">Net Take Home Pay</th>
                    <th className="p-3 text-center">Status Bank</th>
                    <th className="p-3 text-center">Aksi Slip Gaji</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'EMP-001', name: 'Budi Santoso', dept: 'Hauling Driver', role: 'Senior Dump Truck Driver', baseSalary: 6500000, ritaseCount: 142, overtimeHours: 24, bpjsDeduction: 260000, taxPPh21: 320000, status: 'PAID', bank: 'Mandiri ****3819' },
                    { id: 'EMP-002', name: 'Eko Prasetyo', dept: 'Operasi Tambang', role: 'Excavator PC200 Operator', baseSalary: 7800000, ritaseCount: 0, overtimeHours: 32, bpjsDeduction: 312000, taxPPh21: 450000, status: 'PAID', bank: 'BCA ****8821' },
                    { id: 'EMP-003', name: 'Rahmat Hidayat', dept: 'Hauling Driver', role: 'DT Volvo FMX Driver', baseSalary: 6500000, ritaseCount: 165, overtimeHours: 18, bpjsDeduction: 260000, taxPPh21: 380000, status: 'PAID', bank: 'BRI ****0043' },
                    { id: 'EMP-004', name: 'Dewi Lestari', dept: 'HSE & K3LH', role: 'HSE Inspector Site', baseSalary: 8500000, ritaseCount: 0, overtimeHours: 12, bpjsDeduction: 340000, taxPPh21: 510000, status: 'PAID', bank: 'Mandiri ****9102' },
                    { id: 'EMP-005', name: 'Agus Setiawan', dept: 'Workshop & Fleet', role: 'Head Mechanic Heavy Equipment', baseSalary: 9200000, ritaseCount: 0, overtimeHours: 40, bpjsDeduction: 368000, taxPPh21: 680000, status: 'PAID', bank: 'BCA ****1192' },
                    { id: 'EMP-006', name: 'Joko Widodo', dept: 'Smelter & Plant', role: 'Furnace Technician', baseSalary: 8000000, ritaseCount: 0, overtimeHours: 28, bpjsDeduction: 320000, taxPPh21: 490000, status: 'PAID', bank: 'BNI ****5512' },
                    { id: 'EMP-007', name: 'Siti Nurhaliza', dept: 'Geologi & Survey', role: 'Senior Mine Surveyor', baseSalary: 10500000, ritaseCount: 0, overtimeHours: 15, bpjsDeduction: 420000, taxPPh21: 850000, status: 'PAID', bank: 'Mandiri ****2031' }
                  ]
                  .filter(emp => payrollDeptFilter === 'ALL' || emp.dept === payrollDeptFilter)
                  .filter(emp => emp.name.toLowerCase().includes(payrollSearch.toLowerCase()) || emp.id.toLowerCase().includes(payrollSearch.toLowerCase()) || emp.role.toLowerCase().includes(payrollSearch.toLowerCase()))
                  .map((emp) => {
                    const calculatedRitaseBonus = emp.ritaseCount * ritaseBonusRate;
                    const calculatedOvertimeBonus = emp.overtimeHours * overtimeHourlyRate;
                    const totalDeductions = emp.bpjsDeduction + emp.taxPPh21;
                    const netTakeHomePay = emp.baseSalary + calculatedRitaseBonus + calculatedOvertimeBonus - totalDeductions;

                    return (
                      <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-slate-100">{emp.name}</div>
                          <div className="text-[10px] font-mono text-emerald-400">{emp.id}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-200 font-medium">{emp.role}</div>
                          <div className="text-[10px] text-slate-400">{emp.dept}</div>
                        </td>
                        <td className="p-3 text-right font-mono text-slate-300">
                          Rp {emp.baseSalary.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-right">
                          <div className="font-mono text-amber-300 font-bold">
                            Rp {calculatedRitaseBonus.toLocaleString('id-ID')}
                          </div>
                          {emp.ritaseCount > 0 && (
                            <div className="text-[9px] text-slate-400">{emp.ritaseCount} Ritase</div>
                          )}
                        </td>
                        <td className="p-3 text-right">
                          <div className="font-mono text-indigo-300 font-bold">
                            Rp {calculatedOvertimeBonus.toLocaleString('id-ID')}
                          </div>
                          <div className="text-[9px] text-slate-400">{emp.overtimeHours} Jam Overtime</div>
                        </td>
                        <td className="p-3 text-right font-mono text-rose-300 text-[11px]">
                          -Rp {totalDeductions.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-right font-mono font-black text-emerald-400 text-sm">
                          Rp {netTakeHomePay.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 inline-flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> DISBURSED
                          </span>
                          <div className="text-[9px] text-slate-500 mt-0.5">{emp.bank}</div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedSlipEmployee({ ...emp, calculatedRitaseBonus, calculatedOvertimeBonus, totalDeductions, netTakeHomePay })}
                            className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Cetak Slip
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Slip Gaji Karyawan Interactive */}
          {selectedSlipEmployee && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-5 relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">SLIP GAJI RESMI ERP TAMBANG</span>
                      <h3 className="text-base font-bold text-white">Slip Gaji Periode {payrollPeriod}</h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSlipEmployee(null)}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  >
                    ✕
                  </button>
                </div>

                {/* Payslip Header Info */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Nama Karyawan</span>
                    <strong className="text-slate-100 font-bold">{selectedSlipEmployee.name}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">NIK Site</span>
                    <strong className="text-emerald-400 font-mono font-bold">{selectedSlipEmployee.id}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Jabatan / Role</span>
                    <span className="text-slate-200 font-medium">{selectedSlipEmployee.role}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Departemen</span>
                    <span className="text-slate-200 font-medium">{selectedSlipEmployee.dept}</span>
                  </div>
                </div>

                {/* Earnings & Deductions Breakdown */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {/* Earnings */}
                  <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block border-b border-emerald-500/20 pb-1">PENERIMAAN (EARNINGS)</span>
                    <div className="flex justify-between text-slate-300">
                      <span>Gaji Pokok:</span>
                      <strong className="font-mono">Rp {selectedSlipEmployee.baseSalary.toLocaleString('id-ID')}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Bonus Ritase ({selectedSlipEmployee.ritaseCount} Rit):</span>
                      <strong className="font-mono text-amber-300">Rp {selectedSlipEmployee.calculatedRitaseBonus.toLocaleString('id-ID')}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Overtime ({selectedSlipEmployee.overtimeHours} Jam):</span>
                      <strong className="font-mono text-indigo-300">Rp {selectedSlipEmployee.calculatedOvertimeBonus.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>

                  {/* Deductions */}
                  <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-2">
                    <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block border-b border-rose-500/20 pb-1">POTONGAN (DEDUCTIONS)</span>
                    <div className="flex justify-between text-slate-300">
                      <span>BPJS Ketenagakerjaan:</span>
                      <strong className="font-mono text-rose-300">Rp {selectedSlipEmployee.bpjsDeduction.toLocaleString('id-ID')}</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>PPh 21 TER ESDM:</span>
                      <strong className="font-mono text-rose-300">Rp {selectedSlipEmployee.taxPPh21.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>
                </div>

                {/* Net Take Home Pay Total */}
                <div className="p-4 bg-gradient-to-r from-emerald-950 to-slate-900 border-2 border-emerald-500 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">TOTAL GAJI BERSIH (NET TAKE HOME PAY)</span>
                    <span className="text-[11px] text-emerald-300">Transfer Otomatis ke {selectedSlipEmployee.bank}</span>
                  </div>
                  <div className="text-xl font-black text-emerald-400 font-mono">
                    Rp {selectedSlipEmployee.netTakeHomePay.toLocaleString('id-ID')}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedSlipEmployee(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Slip Gaji ${selectedSlipEmployee.name} (${selectedSlipEmployee.id}) berhasil dicetak ke PDF dengan QR-Code verifikasi digital!`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Slip
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Simulasi Tarif Ritase & Lembur */}
          {showSimulateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">Simulasi Tarif Bonus Ritase & Lembur</h3>
                  </div>
                  <button onClick={() => setShowSimulateModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300 font-medium">Tarif Bonus Ritase per Trip Hauling:</span>
                      <strong className="text-amber-400 font-mono font-bold">Rp {ritaseBonusRate.toLocaleString('id-ID')} / Rit</strong>
                    </div>
                    <input
                      type="range"
                      min={15000}
                      max={50000}
                      step={2500}
                      value={ritaseBonusRate}
                      onChange={(e) => setRitaseBonusRate(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-300 font-medium">Tarif Lembur Overtime per Jam:</span>
                      <strong className="text-indigo-400 font-mono font-bold">Rp {overtimeHourlyRate.toLocaleString('id-ID')} / Jam</strong>
                    </div>
                    <input
                      type="range"
                      min={30000}
                      max={80000}
                      step={2500}
                      value={overtimeHourlyRate}
                      onChange={(e) => setOvertimeHourlyRate(Number(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Estimasi Anggaran Tambahan Per Bulan:</span>
                    <div className="text-base font-mono font-black text-emerald-400">
                      +Rp {((33700 * ritaseBonusRate) + (9155 * overtimeHourlyRate) - 842500000 - 412000000).toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setShowSimulateModal(false)}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-all shadow-md"
                  >
                    Terapkan Simulasi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB: SUPPLIER DAN VENDOR TAMBANG */}
      {activeTab === 'supplier_vendor' && (
        <div className="space-y-6">
          {/* Supplier & Vendor Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 tracking-wider">
                    MANAJEMEN PENGADAAN & KEMITRAAN SUPPLIER SITE TAMBANG
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    38 VENDOR TERVERIFIKASI ESDM
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-indigo-400" />
                  Dasbor Supplier, Vendor & Portal Pengadaan Barter/Procurement
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pusat kendali pengadaan BBM Solar Industri B35, sparepart alat berat (Komatsu, CAT, Volvo), bahan peledak ANFO, reagen laboratorium XRF, serta evaluasi SLA delivery & compliance K3LH vendor.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowCreatePOModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                >
                  <Plus className="w-4 h-4" />
                  Buat Purchase Order (PO)
                </button>

                <button
                  onClick={() => alert('Data Vendor & Riwayat Transaksi Procurement berhasil di-export ke format Excel/PDF untuk Tim Finance & Audit!')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  Export Laporan
                </button>
              </div>
            </div>
          </div>

          {/* KPI Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Belanja PO Bulan Ini</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-white font-mono">
                Rp 18.450.000.000
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12.4% vs Bln Lalu
                </span>
                <span className="text-slate-500 font-mono">42 Active POs</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Pasokan BBM Solar HSD B35</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-300 font-mono">
                850.000 Liter
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">PT Pertamina Patra Niaga</span>
                <span className="text-emerald-400 font-bold">Stok Aman 14 Hari</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Sparepart Heavy Fleet Received</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-blue-300 font-mono">
                1.240 Items
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">UT & Trakindo Utama</span>
                <span className="text-blue-400 font-bold font-mono">SLA 98.2%</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">GRN Menunggu QA/QC Site</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <PackageCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-400 font-mono">
                6 Surat Jalan
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-amber-300 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Inspecting Fuel & Parts
                </span>
                <span className="text-slate-500 font-mono">Site Verification</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Skor CSAT & K3LH Vendor</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Star className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono flex items-center gap-1">
                4.85 <span className="text-xs text-slate-400 font-normal">/ 5.0</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">100% K3LH Compliant</span>
                <span className="text-slate-400">Zero Incident</span>
              </div>
            </div>
          </div>

          {/* Supplier Analytics Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Vendor Spend Allocation Bar Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    Alokasi Belanja Pengadaan per Kategori Vendor
                  </h3>
                  <p className="text-[11px] text-slate-400">Distribusi Total Nilai Purchase Order (PO) Bulan Ini dalam Miliar Rupiah</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  TOTAL 6 KATEGORI
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'BBM Solar B35', total: 8.5, color: '#f59e0b' },
                    { name: 'Sparepart Heavy', total: 4.2, color: '#6366f1' },
                    { name: 'Bahan Peledak ANFO', total: 2.8, color: '#ef4444' },
                    { name: 'Ban Dump Truck', total: 1.5, color: '#10b981' },
                    { name: 'Reagen Lab XRF', total: 0.85, color: '#06b6d4' },
                    { name: 'Pelumas & Oli', total: 0.6, color: '#ec4899' }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} interval={0} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" M" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`Rp ${val} Miliar`, 'Total PO']}
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {[
                        '#f59e0b', '#6366f1', '#ef4444', '#10b981', '#06b6d4', '#ec4899'
                      ].map((entry, index) => (
                        <Cell key={`vendor-cell-${index}`} fill={entry} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Vendor Performance SLA Radar / Donut */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Metrik Kinerja & SLA Vendor
                </h3>
                <p className="text-[11px] text-slate-400">Pencapaian Indikator Kinerja Utama Mitra Kerja Site</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Ketepatan Waktu Pengiriman (On-Time Delivery)</span>
                    <strong className="text-emerald-400 font-mono">96.4%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '96.4%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Lolos Kualifikasi QA/QC Spesifikasi Site</span>
                    <strong className="text-blue-400 font-mono">98.8%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '98.8%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Kepatuhan Keselamatan Tambang (K3LH)</span>
                    <strong className="text-indigo-400 font-mono">100.0%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">Akurasi Kelengkapan Dokumen & Invoice</span>
                    <strong className="text-amber-400 font-mono">95.0%</strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1 mt-4">
                <span className="text-indigo-400 font-bold block">💡 Evaluasi Triwulan ESDM:</span>
                <span>Seluruh 38 Vendor aktif telah memenuhi standar CSAT minimum 4.5/5.0 & bersertifikasi K3LH Tambang.</span>
              </div>
            </div>
          </div>

          {/* Interactive Purchase Orders & Goods Delivery Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  Daftar Purchase Order (PO) & Surat Jalan Pengiriman Vendor
                </h3>
                <p className="text-[11px] text-slate-400">Lacak Status Pengadaan, Kedatangan Barang di Site Tambang, & Status Tagihan Invoice</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari PO / Vendor / Material..."
                    value={vendorSearch}
                    onChange={(e) => setVendorSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-indigo-500 w-52"
                  />
                </div>

                <select
                  value={vendorCategoryFilter}
                  onChange={(e) => setVendorCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="ALL">Semua Kategori Vendor</option>
                  <option value="BBM Solar B35">BBM Solar B35</option>
                  <option value="Sparepart Alat Berat">Sparepart Alat Berat</option>
                  <option value="Bahan Peledak ANFO">Bahan Peledak ANFO</option>
                  <option value="Ban Mining Fleet">Ban Mining Fleet</option>
                  <option value="Reagen & Konsumabel Lab">Reagen & Konsumabel Lab</option>
                </select>
              </div>
            </div>

            {/* PO Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">No. PO & Tanggal</th>
                    <th className="p-3">Nama Vendor / Supplier</th>
                    <th className="p-3">Material / Items Ordered</th>
                    <th className="p-3 text-right">Volume & Qty</th>
                    <th className="p-3 text-right">Total Nilai PO</th>
                    <th className="p-3 text-center">Status Pengadaan</th>
                    <th className="p-3 text-center">Est. Tiba Site</th>
                    <th className="p-3 text-center">Aksi Detail</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'PO-2026-0819', date: '01 Aug 2026', vendor: 'PT Pertamina Patra Niaga', category: 'BBM Solar B35', item: 'High Speed Diesel (HSD) B35 Industri', qty: '100.000 Liter', totalValue: 1450000000, status: 'GRN_VERIFIED', statusLabel: 'GRN Terverifikasi', arrivalDate: '05 Aug 2026 (Tiba)', driver: 'Bambang S. (B 9812 UFA)', qaStatus: 'Pass (Densitas 0.842)' },
                    { id: 'PO-2026-0820', date: '02 Aug 2026', vendor: 'PT United Tractors Tbk', category: 'Sparepart Alat Berat', item: 'Undercarriage Kit Komatsu PC2000-8', qty: '4 Sets', totalValue: 1850000000, status: 'SHIPPED', statusLabel: 'Dalam Pengiriman (In Transit)', arrivalDate: '08 Aug 2026 (Est)', driver: 'Layanan Ekspedisi UT', qaStatus: 'Pending Arrival' },
                    { id: 'PO-2026-0821', date: '03 Aug 2026', vendor: 'PT Dahana (Persero)', category: 'Bahan Peledak ANFO', item: 'Ammonium Nitrate ANFO & Non-Electric Detonator', qty: '25 Ton', totalValue: 820000000, status: 'APPROVED_PO', statusLabel: 'PO Disetujui (Disiapkan)', arrivalDate: '10 Aug 2026 (Est)', driver: 'Armada Khusus Handak', qaStatus: 'Izin PoldaSultra Ready' },
                    { id: 'PO-2026-0822', date: '28 Jul 2026', vendor: 'PT Trakindo Utama', category: 'Sparepart Alat Berat', item: 'Engine Overhaul Kit CAT 777G Off-Highway Truck', qty: '2 Sets', totalValue: 2400000000, status: 'GRN_VERIFIED', statusLabel: 'GRN Terverifikasi', arrivalDate: '04 Aug 2026 (Tiba)', driver: 'Trakindo Logistik', qaStatus: 'Pass (QA Check OK)' },
                    { id: 'PO-2026-0823', date: '25 Jul 2026', vendor: 'PT Bridgestone Mining Tires', category: 'Ban Mining Fleet', item: 'Tire Radial 24.00-R35 Dump Truck HD785', qty: '12 Pcs', totalValue: 780000000, status: 'INVOICED', statusLabel: 'Invoice Diterima', arrivalDate: '02 Aug 2026 (Tiba)', driver: 'Bridgestone Cargo', qaStatus: 'Pass (Serial Tagged)' },
                    { id: 'PO-2026-0824', date: '20 Jul 2026', vendor: 'PT Sucofindo Lab Supplies', category: 'Reagen & Konsumabel Lab', item: 'Reagen Spectrometer XRF & Flux Borate Nickel', qty: '500 Vials', totalValue: 320000000, status: 'PAID', statusLabel: 'Lunas Terbayar', arrivalDate: '28 Jul 2026 (Tiba)', driver: 'Express Cargo', qaStatus: 'Pass (Lab Certified)' }
                  ]
                  .filter(po => vendorCategoryFilter === 'ALL' || po.category === vendorCategoryFilter)
                  .filter(po => po.id.toLowerCase().includes(vendorSearch.toLowerCase()) || po.vendor.toLowerCase().includes(vendorSearch.toLowerCase()) || po.item.toLowerCase().includes(vendorSearch.toLowerCase()))
                  .map((po) => {
                    let badgeBg = 'bg-slate-800 text-slate-300';
                    if (po.status === 'GRN_VERIFIED') badgeBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
                    if (po.status === 'SHIPPED') badgeBg = 'bg-amber-500/20 text-amber-300 border border-amber-500/40';
                    if (po.status === 'APPROVED_PO') badgeBg = 'bg-blue-500/20 text-blue-300 border border-blue-500/40';
                    if (po.status === 'INVOICED') badgeBg = 'bg-purple-500/20 text-purple-300 border border-purple-500/40';
                    if (po.status === 'PAID') badgeBg = 'bg-teal-500/20 text-teal-300 border border-teal-500/40';

                    return (
                      <tr key={po.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-indigo-400 font-mono">{po.id}</div>
                          <div className="text-[10px] text-slate-400">{po.date}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-100">{po.vendor}</div>
                          <div className="text-[10px] text-slate-400">{po.category}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-200 font-medium">{po.item}</div>
                        </td>
                        <td className="p-3 text-right font-mono text-slate-300 font-bold">
                          {po.qty}
                        </td>
                        <td className="p-3 text-right font-mono font-black text-emerald-400">
                          Rp {po.totalValue.toLocaleString('id-ID')}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${badgeBg}`}>
                            {po.statusLabel}
                          </span>
                        </td>
                        <td className="p-3 text-center text-[11px] font-mono text-slate-300">
                          {po.arrivalDate}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedPO(po)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Detail GRN
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Vendors Scorecard Matrix */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-emerald-400" />
                  Matriks Evaluasi Kinerja Mitra & Rekanan Vendor Utama
                </h3>
                <p className="text-[11px] text-slate-400">Rangking Reputasi, Sertifikasi Safety K3LH & Nilai Transaksi YTD</p>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Lolos Audit ESDM
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'PT Pertamina Patra Niaga', type: 'BBM Solar HSD B35', rating: '5.0', totalOrders: '14 Batch', spendYTD: 'Rp 102 M', otd: '99.1%', safetyBadge: 'PTP K3LH Certified', icon: Flame },
                { name: 'PT United Tractors Tbk', type: 'Komatsu Heavy Fleet & Parts', rating: '4.9', totalOrders: '28 Orders', spendYTD: 'Rp 45 M', otd: '97.5%', safetyBadge: 'SMKP ESDM Certified', icon: Truck },
                { name: 'PT Dahana (Persero)', type: 'Bahan Peledak ANFO', rating: '4.8', totalOrders: '8 Batch', spendYTD: 'Rp 18 M', otd: '96.0%', safetyBadge: 'Izin POLRI & Handak', icon: Zap },
                { name: 'PT Trakindo Utama', type: 'Caterpillar Engine & Parts', rating: '4.9', totalOrders: '22 Orders', spendYTD: 'Rp 32 M', otd: '98.0%', safetyBadge: 'SMKP ESDM Certified', icon: Truck },
                { name: 'PT Bridgestone Mining', type: 'Ban Radial Off-Road HD', rating: '4.7', totalOrders: '12 Orders', spendYTD: 'Rp 9.5 M', otd: '95.2%', safetyBadge: 'ISO 45001 Safety', icon: ShieldCheck },
                { name: 'PT Sucofindo (Persero)', type: 'Lab Reagen & Inspection', rating: '5.0', totalOrders: '36 Testing', spendYTD: 'Rp 4.2 M', otd: '100.0%', safetyBadge: 'KAN Accredited Lab', icon: FileCheck }
              ].map((v, i) => {
                const IconComp = v.icon;
                return (
                  <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-indigo-500/40 transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-xs">{v.name}</h4>
                          <span className="text-[10px] text-slate-400 block">{v.type}</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {v.rating}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900 p-2.5 rounded-lg border border-slate-800/80">
                      <div>
                        <span className="text-slate-400 text-[10px] block">On-Time Rate</span>
                        <strong className="text-emerald-400 font-mono">{v.otd}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Belanja YTD</span>
                        <strong className="text-white font-mono">{v.spendYTD}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                        {v.safetyBadge}
                      </span>
                      <span className="text-slate-500 font-mono">{v.totalOrders}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Modal Detail PO & Goods Received Note (GRN) */}
          {selectedPO && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-400">SURAT JALAN & VERIFIKASI PENGADAAN SITE</span>
                      <h3 className="text-base font-bold text-white">Detail Purchase Order {selectedPO.id}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedPO(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Nama Vendor</span>
                    <strong className="text-slate-100 font-bold">{selectedPO.vendor}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Kategori Barter</span>
                    <span className="text-indigo-400 font-bold">{selectedPO.category}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Armada Pengirim</span>
                    <span className="text-slate-300">{selectedPO.driver}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Hasil Uji QA/QC Site</span>
                    <span className="text-emerald-400 font-bold font-mono">{selectedPO.qaStatus}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Deskripsi Barang:</span>
                    <span className="text-white font-bold">{selectedPO.item}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800/80 pb-2">
                    <span className="text-slate-400">Volume Terpesan:</span>
                    <span className="text-amber-300 font-mono font-bold">{selectedPO.qty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Nilai Tagihan:</span>
                    <span className="text-emerald-400 font-mono font-black text-base">
                      Rp {selectedPO.totalValue.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedPO(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Dokumen Surat Jalan GRN & Sertifikat QA untuk PO ${selectedPO.id} berhasil dicetak ke PDF!`)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Cetak GRN PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Buat Purchase Order (PO) Baru */}
          {showCreatePOModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Buat Purchase Order (PO) Pengadaan Baru</h3>
                  </div>
                  <button onClick={() => setShowCreatePOModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-300 block mb-1 font-medium">Pilih Vendor / Supplier Terdaftar:</label>
                    <select
                      value={newPOVendor}
                      onChange={(e) => setNewPOVendor(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 font-bold"
                    >
                      <option value="PT Pertamina Patra Niaga">PT Pertamina Patra Niaga (BBM Solar HSD B35)</option>
                      <option value="PT United Tractors Tbk">PT United Tractors Tbk (Sparepart Komatsu)</option>
                      <option value="PT Dahana (Persero)">PT Dahana Persero (Bahan Peledak ANFO)</option>
                      <option value="PT Trakindo Utama">PT Trakindo Utama (Engine CAT 777G)</option>
                      <option value="PT Bridgestone Mining Tires">PT Bridgestone Mining Tires (Ban HD Truck)</option>
                      <option value="PT Sucofindo Lab Supplies">PT Sucofindo Lab Supplies (Reagen Lab XRF)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 font-medium">Nama Material / Komponen:</label>
                    <input
                      type="text"
                      value={newPOItem}
                      onChange={(e) => setNewPOItem(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500"
                      placeholder="Contoh: Solar HSD Industri / Filter Kit CAT"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-300 block mb-1 font-medium">Qty Volume:</label>
                      <input
                        type="number"
                        value={newPOQty}
                        onChange={(e) => setNewPOQty(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-slate-300 block mb-1 font-medium">Harga Satuan (Rp):</label>
                      <input
                        type="number"
                        value={newPOPrice}
                        onChange={(e) => setNewPOPrice(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-2.5 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <span className="text-slate-400 text-xs">Total Estimasi PO:</span>
                    <strong className="text-emerald-400 font-mono font-black text-sm">
                      Rp {(newPOQty * newPOPrice).toLocaleString('id-ID')}
                    </strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
                  <button
                    onClick={() => setShowCreatePOModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      alert(`Purchase Order PO-2026-0825 senilai Rp ${(newPOQty * newPOPrice).toLocaleString('id-ID')} untuk ${newPOVendor} berhasil diterbitkan dan dikirim via Email EDI Integration!`);
                      setShowCreatePOModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all shadow-lg shadow-emerald-950/50"
                  >
                    Terbitkan PO Resmikan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB: AUDITOR & COMPLIANCE */}
      {activeTab === 'auditor' && (
        <div className="space-y-6">
          {/* Auditor Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    IMMUTABLE AUDIT TRAIL & COMPLIANCE ESDM
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    SHA-256 CHECKSUM INTEGRITY: VALID
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <FileCheck2 className="w-6 h-6 text-emerald-400" />
                  Dasbor Internal & External Auditor Tambang
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pemeriksaan jejak digital mutlak (audit log) seluruh transaksi keuangan, rekonsiliasi tonase timbangan vs barging, ketaatan RKAB 2026, bukti bayar royalti e-SIMPONI PNBP, dan kepatuhan K3LH Lingkungan Tambang.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <select
                  value={auditPeriodFilter}
                  onChange={(e) => setAuditPeriodFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="Q3_2026">Periode Audit: Q3 2026</option>
                  <option value="Q2_2026">Periode Audit: Q2 2026</option>
                  <option value="Q1_2026">Periode Audit: Q1 2026</option>
                  <option value="YTD_2026">Periode Audit: Full Year 2026 YTD</option>
                </select>

                <button
                  onClick={() => setShowComplianceVerifyModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Fingerprint className="w-4 h-4 text-blue-400" />
                  Verifikasi Hash System
                </button>

                <button
                  onClick={() => alert(`Laporan Audit Kepatuhan Tambang ${auditPeriodFilter} dengan SHA-256 Digital Signature berhasil di-export ke PDF/ZIP untuk Auditor BPK/ESDM!`)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                >
                  <Download className="w-4 h-4" />
                  Export Formal Audit Package
                </button>
              </div>
            </div>
          </div>

          {/* Top KPI Audit Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Log Audit Terverifikasi</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <History className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-white font-mono">
                142.850 Logs
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% Cryptographic Valid
                </span>
                <span className="text-slate-500 font-mono">Realtime Log</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Kepatuhan Kuota RKAB ESDM</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-blue-300 font-mono">
                99.8% Compliant
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">1.82M / 2.5M MT Kuota</span>
                <span className="text-emerald-400 font-bold">Zero Excess</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Verifikasi PNBP & Royalti</span>
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-teal-300 font-mono">
                Rp 24,80 Miliar
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">e-SIMPONI Verified</span>
                <span className="text-teal-400 font-bold">Lunas 100%</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Rekonsiliasi Tonase Ore</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-indigo-300 font-mono">
                99.6% Matched
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">SJT vs Surveyor Draft</span>
                <span className="text-indigo-400 font-bold font-mono">Selisih &lt;0.4%</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Status Red Flag Anomali</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono flex items-center gap-1">
                0 Critical <span className="text-xs text-slate-400 font-normal">(3 Advisory)</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">Clean Audit Trail</span>
                <span className="text-slate-500 font-mono">Anti-Tamper</span>
              </div>
            </div>
          </div>

          {/* Audit Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Audit Logs Volumetrics per Module */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    Frekuensi & Aktivitas Log Audit per Modul Sistem ERP
                  </h3>
                  <p className="text-[11px] text-slate-400">Jumlah Transaksi & Perubahan Data yang Tercatat secara Immutable dalam Log System</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                  REALTIME INTEGRITY
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Timbangan Ore', total: 48200, color: '#10b981' },
                    { name: 'Payroll & HR', total: 32500, color: '#6366f1' },
                    { name: 'Finance & Tax', total: 28400, color: '#06b6d4' },
                    { name: 'Procurement', total: 18900, color: '#f59e0b' },
                    { name: 'RKAB & Legal', total: 8600, color: '#ec4899' },
                    { name: 'Sistem Security', total: 6250, color: '#8b5cf6' }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} interval={0} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" Logs" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`${val.toLocaleString('id-ID')} Logs`, 'Aktivitas Log Audit']}
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {[
                        '#10b981', '#6366f1', '#06b6d4', '#f59e0b', '#ec4899', '#8b5cf6'
                      ].map((entry, index) => (
                        <Cell key={`audit-bar-cell-${index}`} fill={entry} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Compliance Finding Breakdown Donut Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-blue-400" />
                  Status Hasil Pemeriksaan Audit
                </h3>
                <p className="text-[11px] text-slate-400">Persentase Verifikasi Kepatuhan Data & Catatan Catatan Evaluasi</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Clean Verified Pass', value: 98.2, fill: '#10b981' },
                        { name: 'Minor Advisory Note', value: 1.5, fill: '#f59e0b' },
                        { name: 'Resolved Correction', value: 0.3, fill: '#6366f1' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {['#10b981', '#f59e0b', '#6366f1'].map((color, index) => (
                        <Cell key={`audit-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`${val}%`, 'Proporsi Audit']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Pass Sesuai SOP</span>
                  <span className="font-mono font-bold text-emerald-400">98.2%</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Catatan Advisory</span>
                  <span className="font-mono font-bold text-amber-300">1.5%</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Koreksi Terverifikasi</span>
                  <span className="font-mono font-bold text-indigo-300">0.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Digital Audit Log Inspector Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-emerald-400" />
                  Pemeriksa Jejak Audit Digital (Immutable Audit Trail Log)
                </h3>
                <p className="text-[11px] text-slate-400">Verifikasi Kriptografi SHA-256, User Actor, Modul Terkait, Delta Perubahan, & Stempel Waktu Server</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari Log ID / Actor / Modul..."
                    value={auditSearch}
                    onChange={(e) => setAuditSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500 w-52"
                  />
                </div>

                <select
                  value={auditModuleFilter}
                  onChange={(e) => setAuditModuleFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">Semua Modul System</option>
                  <option value="WEIGHBRIDGE">Timbangan Ore & SJT</option>
                  <option value="FINANCE">Finance & Royalti e-SIMPONI</option>
                  <option value="PAYROLL">Payroll & Gaji Karyawan</option>
                  <option value="PROCUREMENT">Procurement & PO Vendor</option>
                  <option value="RKAB">Legal & RKAB ESDM</option>
                  <option value="SECURITY">Otentikasi & Keamanan User</option>
                </select>
              </div>
            </div>

            {/* Audit Log Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">Log ID & Timestamp</th>
                    <th className="p-3">User Actor & Role</th>
                    <th className="p-3">Modul & Aksi Transaksi</th>
                    <th className="p-3">Rincian Delta Perubahan Data</th>
                    <th className="p-3 text-center">Integritas Hash SHA-256</th>
                    <th className="p-3 text-center">Status Audit</th>
                    <th className="p-3 text-center">Inspeksi Digital</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'LOG-2026-9901', time: '06 Aug 2026 10:14:22', actor: 'Ir. Ahmad Subagyo (KTT)', role: 'Kepala Teknik Tambang', module: 'RKAB', moduleName: 'RKAB & Legal', action: 'Approval Rencana Produksi Ore Pit B', delta: 'Approved Kuota 150.000 MT untuk Agustus 2026', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', ip: '180.252.19.42', status: 'VERIFIED_PASS', statusLabel: 'Lolos Verifikasi' },
                    { id: 'LOG-2026-9902', time: '06 Aug 2026 09:48:10', actor: 'Budi Santoso (Weighmaster)', role: 'Operator Timbangan Site', module: 'WEIGHBRIDGE', moduleName: 'Timbangan Ore & SJT', action: 'Input Surat Jalan Timbangan SJT-MOR-2026-04821', delta: 'Berat Gross: 38.50 Ton | Tare: 12.10 Ton | Net: 26.40 Ton', hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4', ip: '10.12.4.101 (Terminal Pos 1)', status: 'VERIFIED_PASS', statusLabel: 'Lolos Verifikasi' },
                    { id: 'LOG-2026-9903', time: '06 Aug 2026 08:30:00', actor: 'Hendra Gunawan (Finance Lead)', role: 'Finance Officer', module: 'FINANCE', moduleName: 'Finance & Royalti e-SIMPONI', action: 'Pembayaran Billing e-SIMPONI PNBP ESDM', delta: 'NTPN: 8912A309201923 | Nominal: Rp 2.450.000.000', hash: 'a12b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b', ip: '10.12.8.55', status: 'VERIFIED_PASS', statusLabel: 'Lolos Verifikasi' },
                    { id: 'LOG-2026-9904', time: '05 Aug 2026 17:15:40', actor: 'Siti Rahmawati (HR Payroll)', role: 'Payroll Specialist', module: 'PAYROLL', moduleName: 'Payroll & Gaji Karyawan', action: 'Disbursement Batch Payroll Agustus 2026', delta: 'Total 1.280 Karyawan Site | Gross: Rp 4.850.000.000', hash: 'c78e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e', ip: '10.12.2.14', status: 'VERIFIED_PASS', statusLabel: 'Lolos Verifikasi' },
                    { id: 'LOG-2026-9905', time: '05 Aug 2026 14:22:18', actor: 'Dedi Kurniawan (Procurement)', role: 'Purchasing Lead', module: 'PROCUREMENT', moduleName: 'Procurement & PO Vendor', action: 'Penerbitan PO BBM Solar HSD B35', delta: 'Vendor: PT Pertamina Patra Niaga | Volume: 100.000 Liter', hash: 'f1e2d3c4b5a697887766554433221100aabbccddeeff11223344556677889900', ip: '10.12.3.88', status: 'ADVISORY_NOTE', statusLabel: 'Advisory (Re-checked)' },
                    { id: 'LOG-2026-9906', time: '05 Aug 2026 11:05:02', actor: 'System Auto-SecBot', role: 'Security Daemon', module: 'SECURITY', moduleName: 'Otentikasi & Keamanan User', action: 'Multi-Factor Auth (MFA) Verification Login', actorRole: 'Admin Access', delta: 'Successful MFA Session Token for User ID: USER-881', hash: 'd41d8cd98f00b204e9800998ecf8427e5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', ip: '180.252.19.42', status: 'VERIFIED_PASS', statusLabel: 'Lolos Verifikasi' }
                  ]
                  .filter(log => auditModuleFilter === 'ALL' || log.module === auditModuleFilter)
                  .filter(log => log.id.toLowerCase().includes(auditSearch.toLowerCase()) || log.actor.toLowerCase().includes(auditSearch.toLowerCase()) || log.action.toLowerCase().includes(auditSearch.toLowerCase()) || log.moduleName.toLowerCase().includes(auditSearch.toLowerCase()))
                  .map((log) => {
                    let badgeClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
                    if (log.status === 'ADVISORY_NOTE') badgeClass = 'bg-amber-500/20 text-amber-300 border border-amber-500/40';

                    return (
                      <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-emerald-400 font-mono">{log.id}</div>
                          <div className="text-[10px] text-slate-400">{log.time}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-100">{log.actor}</div>
                          <div className="text-[10px] text-slate-400">{log.role}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-200 font-medium">{log.action}</div>
                          <div className="text-[10px] text-indigo-400 font-bold">{log.moduleName}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-300 text-[11px] font-mono line-clamp-2">{log.delta}</div>
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-950 text-slate-300 border border-slate-800 inline-block max-w-[120px] truncate" title={log.hash}>
                            {log.hash.substring(0, 12)}...
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${badgeClass}`}>
                            {log.statusLabel}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedAuditLog(log)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <Search className="w-3.5 h-3.5" />
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Inspect Detail Audit Log Digital Signature */}
          {selectedAuditLog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Fingerprint className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">DETAIL INSPEKSI SERTIFIKAT KRIPTOGRAFI LOG</span>
                      <h3 className="text-base font-bold text-white">Inspeksi Digital {selectedAuditLog.id}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedAuditLog(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">User Actor</span>
                    <strong className="text-slate-100 font-bold">{selectedAuditLog.actor}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Server IP & Terminal</span>
                    <span className="text-indigo-400 font-mono font-bold">{selectedAuditLog.ip}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Modul ERP</span>
                    <span className="text-emerald-400 font-bold">{selectedAuditLog.moduleName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Timestamp Presisi</span>
                    <span className="text-slate-300 font-mono">{selectedAuditLog.time}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase border-b border-slate-800 pb-1">DELTAS & TRANSATION STATE:</span>
                  <div className="text-slate-200 font-mono bg-slate-900 p-2.5 rounded border border-slate-800 text-[11px]">
                    {selectedAuditLog.delta}
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">SHA-256 IMMUTABLE CHECKSUM HASH:</span>
                  <div className="font-mono text-[10px] text-emerald-300 break-all bg-slate-950 p-2 rounded border border-emerald-500/20">
                    {selectedAuditLog.hash}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Validation Status: <strong className="text-emerald-400 font-bold">MATCHED / UNTAMPERED</strong></span>
                    <span>Signer: System Crypto Engine</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedAuditLog(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Bukti Sertifikat Hash Log ${selectedAuditLog.id} telah dicetak dengan Verifikasi Digital KTT!`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Cetak Bukti Audit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Verifikasi Hash System & Compliance */}
          {showComplianceVerifyModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-blue-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-blue-400" />
                    <h3 className="text-base font-bold text-white">Verifikasi Integritas Sistem Hash Audit</h3>
                  </div>
                  <button onClick={() => setShowComplianceVerifyModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Total Log In Database:</span>
                      <strong className="text-white font-mono font-bold">142.850 Logs</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Integritas Hash Tree:</span>
                      <strong className="text-emerald-400 font-mono font-bold">100% Intact</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Sertifikat RKAB ESDM:</span>
                      <strong className="text-blue-400 font-mono font-bold">Valid s/d Des 2026</strong>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Sistem secara otomatis melakukan rekonsiliasi matematis periodik antara catatan timbangan, stok barang warehouse, transaksi bank, dan manifest tongkang untuk memastikan tidak ada pemalsuan data.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      alert('Jaringan Integritas Database ERP Tambang verified 100% OK! Tidak ditemukan anomali atau modifikasi ilegal.');
                      setShowComplianceVerifyModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold transition-all"
                  >
                    Jalankan Full Verification Scan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB: PERPAJAKAN, PNBP & E-FAKTUR */}
      {activeTab === 'pajak' && (
        <div className="space-y-6">
          {/* Header Banner Pajak & PNBP */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider flex items-center gap-1">
                    <Landmark className="w-3.5 h-3.5 text-amber-400" />
                    DJP ONLINE & E-SIMPONI ESDM INTEGRATED
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    NPWP: 01.384.920.4-092.000 (IUP OP TAXPAYER)
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    STATUS PPN: E-FAKTUR 4.0 VALIDATED
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Receipt className="w-6 h-6 text-amber-400" />
                  Dasbor Perpajakan, PNBP & e-Faktur Pertambangan
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pengelolaan kewajiban perpajakan tambang nikel: Perhitungan PNBP e-Royalti SIMPONI ESDM, e-Faktur PPN Keluaran & Masukan, PPh Pasal 21/22/23/4(2), dan PBB-P3 Sektor Pertambangan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <select
                  value={taxPeriodFilter}
                  onChange={(e) => setTaxPeriodFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-amber-500"
                >
                  <option value="AGUSTUS_2026">Masa Pajak: Agustus 2026</option>
                  <option value="JULI_2026">Masa Pajak: Juli 2026</option>
                  <option value="Q3_2026">Triwulan Q3 2026</option>
                  <option value="YTD_2026">Tahun Pajak 2026 YTD</option>
                </select>

                <button
                  onClick={() => setShowSimponiCalcModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Calculator className="w-4 h-4 text-amber-400" />
                  Kalkulator SIMPONI
                </button>

                <button
                  onClick={() => alert(`Paket Lampiran e-Faktur PPN (.CSV) & SPT Masa ${taxPeriodFilter} siap diunggah ke portal DJP Online!`)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-amber-950/50"
                >
                  <Download className="w-4 h-4" />
                  Export Paket SPT Masa
                </button>
              </div>
            </div>
          </div>

          {/* Top Key Tax KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Pajak & PNBP YTD</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-white font-mono">
                Rp 52,40 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 100% On-time Paid
                </span>
                <span className="text-slate-500 font-mono">Tahun 2026</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">PNBP Royalti (e-SIMPONI)</span>
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-teal-300 font-mono">
                Rp 24,80 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">Tarif 10% (PP 26/2022)</span>
                <span className="text-teal-400 font-bold">Lunas NTPN</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">e-Faktur PPN 11% Netto</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Receipt className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-blue-300 font-mono">
                Rp 18,35 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">Keluaran vs Masukan</span>
                <span className="text-blue-400 font-bold">Approved DJP</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">PPh 21, 22, 23, 4(2)</span>
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Percent className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-purple-300 font-mono">
                Rp 6,45 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">Withholding Tax</span>
                <span className="text-purple-400 font-bold">Disetor e-Billing</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">PBB-P3 Pertambangan</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                Rp 2,80 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">Tubuh Bumi & Surface</span>
                <span className="text-emerald-400 font-bold">Lunas 2026</span>
              </div>
            </div>
          </div>

          {/* Interactive Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Realisasi Pajak per Bulan Area Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    Tren Pembayaran Pajak & PNBP Tambang (Jan - Agu 2026)
                  </h3>
                  <p className="text-[11px] text-slate-400">Realisasi Setoran PNBP Royalti, PPN e-Faktur, PPh Withholding, dan PBB-P3 per Bulan (dalam Miliar IDR)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  TOTAL: RP 52,4 M
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { month: 'Jan', royalti: 2.80, ppn: 2.10, pph: 0.70, pbb: 0.35 },
                    { month: 'Feb', royalti: 3.10, ppn: 2.25, pph: 0.80, pbb: 0.35 },
                    { month: 'Mar', royalti: 2.95, ppn: 2.05, pph: 0.75, pbb: 0.35 },
                    { month: 'Apr', royalti: 3.20, ppn: 2.40, pph: 0.85, pbb: 0.35 },
                    { month: 'Mei', royalti: 3.05, ppn: 2.30, pph: 0.80, pbb: 0.35 },
                    { month: 'Jun', royalti: 3.40, ppn: 2.50, pph: 0.90, pbb: 0.35 },
                    { month: 'Jul', royalti: 3.15, ppn: 2.35, pph: 0.80, pbb: 0.35 },
                    { month: 'Agu', royalti: 3.15, ppn: 2.40, pph: 0.85, pbb: 0.35 }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit=" M" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any, name: any) => [
                        `Rp ${val} Miliar`,
                        name === 'royalti' ? 'PNBP Royalti SIMPONI' : name === 'ppn' ? 'PPN e-Faktur 11%' : name === 'pph' ? 'PPh Pasal 21/22/23' : 'PBB-P3 Tambang'
                      ]}
                    />
                    <Area type="monotone" dataKey="royalti" stackId="1" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.7} name="royalti" />
                    <Area type="monotone" dataKey="ppn" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.7} name="ppn" />
                    <Area type="monotone" dataKey="pph" stackId="1" stroke="#a855f7" fill="#a855f7" fillOpacity={0.7} name="pph" />
                    <Area type="monotone" dataKey="pbb" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.7} name="pbb" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tax Composition Donut Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-teal-400" />
                  Komposisi Beban Pajak Pertambangan
                </h3>
                <p className="text-[11px] text-slate-400">Distribusi Kewajiban Perpajakan & PNBP Tambang 2026</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'PNBP Royalti Nikel (10%)', value: 47.3, fill: '#14b8a6' },
                        { name: 'PPN e-Faktur 11%', value: 35.0, fill: '#3b82f6' },
                        { name: 'PPh 21/22/23/4(2)', value: 12.3, fill: '#a855f7' },
                        { name: 'PBB Sektor P3', value: 5.4, fill: '#10b981' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {[ '#14b8a6', '#3b82f6', '#a855f7', '#10b981' ].map((color, index) => (
                        <Cell key={`tax-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`${val}%`, 'Porsi Beban']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> PNBP Royalti Nikel</span>
                  <span className="font-mono font-bold text-teal-400">47.3% (Rp 24,80 M)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> PPN e-Faktur Netto</span>
                  <span className="font-mono font-bold text-blue-400">35.0% (Rp 18,35 M)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> PPh Withholding</span>
                  <span className="font-mono font-bold text-purple-400">12.3% (Rp 6,45 M)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> PBB Sektor P3</span>
                  <span className="font-mono font-bold text-emerald-400">5.4% (Rp 2,80 M)</span>
                </div>
              </div>
            </div>
          </div>

          {/* SIMPONI Royalty Calculator Box */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">Simulator Perhitungan Royalti PNBP e-SIMPONI ESDM</h3>
                  <p className="text-[11px] text-slate-400">Perhitungan Otomatis Sesuai PP No. 26 Tahun 2022 untuk Penjualan Nickel Ore</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                TARIF PNBP ORE NIKEL: 10%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Kadar Nickel Ore (% Ni)</label>
                <input
                  type="number"
                  step="0.1"
                  value={calcOreGrade}
                  onChange={(e) => setCalcOreGrade(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Volume Tonase (MT / wmt)</label>
                <input
                  type="number"
                  step="1000"
                  value={calcVolumeMT}
                  onChange={(e) => setCalcVolumeMT(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Harga HPM Benchmark (USD/wmt)</label>
                <input
                  type="number"
                  step="0.5"
                  value={calcHpmUsd}
                  onChange={(e) => setCalcHpmUsd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Kurs Jisdor BI (IDR / USD)</label>
                <input
                  type="number"
                  step="50"
                  value={calcExchangeRate}
                  onChange={(e) => setCalcExchangeRate(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Calculator Calculation Result Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Nilai Penjualan Bruto Ore (USD)</span>
                <strong className="text-base text-slate-100 font-mono font-bold">
                  ${(calcVolumeMT * calcHpmUsd).toLocaleString('en-US')} USD
                </strong>
                <span className="text-[10px] text-slate-500 block">
                  ({calcVolumeMT.toLocaleString('id-ID')} MT × ${calcHpmUsd}/MT)
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block">Nilai Penjualan Konversi Rupiah (IDR)</span>
                <strong className="text-base text-blue-300 font-mono font-bold">
                  {formatIDR(calcVolumeMT * calcHpmUsd * calcExchangeRate)}
                </strong>
                <span className="text-[10px] text-slate-500 block">
                  (Kurs Rp {calcExchangeRate.toLocaleString('id-ID')} / USD)
                </span>
              </div>

              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/40">
                <span className="text-[10px] text-amber-300 font-bold uppercase block">Estimasi PNBP Royalti e-SIMPONI (10%)</span>
                <strong className="text-lg text-amber-400 font-mono font-black block">
                  {formatIDR(calcVolumeMT * calcHpmUsd * calcExchangeRate * 0.10)}
                </strong>
                <span className="text-[10px] text-amber-200/80 font-mono">
                  ≈ ${(calcVolumeMT * calcHpmUsd * 0.10).toLocaleString('en-US')} USD
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Tax Bills & e-Faktur Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  Daftar Kode Billing, e-Faktur & Bukti Setoran Pajak Negara (NTPN)
                </h3>
                <p className="text-[11px] text-slate-400">Verifikasi Faktur Pajak PPN DJP Online, PNBP SIMPONI ESDM, dan Bukti Potong PPh</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari No. Faktur / Billing / Vendor..."
                    value={taxSearch}
                    onChange={(e) => setTaxSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-amber-500 w-52"
                  />
                </div>

                <select
                  value={taxCategoryFilter}
                  onChange={(e) => setTaxCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="ALL">Semua Jenis Pajak & PNBP</option>
                  <option value="ROYALTY_PNBP">PNBP Royalti SIMPONI</option>
                  <option value="EFAKTUR_PPN">e-Faktur PPN 11%</option>
                  <option value="PPH_WHT">PPh Pasal 21/22/23/4(2)</option>
                  <option value="PBB_P3">PBB-P3 Sektor Tambang</option>
                </select>
              </div>
            </div>

            {/* Tax Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">No. Billing / e-Faktur</th>
                    <th className="p-3">Jenis Pajak & Masa</th>
                    <th className="p-3">Subjek / Pembeli / Vendor</th>
                    <th className="p-3 text-right">Nominal Tagihan (IDR)</th>
                    <th className="p-3">Jatuh Tempo</th>
                    <th className="p-3 text-center">Status DJP / NTPN</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: '820260801002918', invoiceNo: '010.000-26.88210492', category: 'ROYALTY_PNBP', taxName: 'PNBP Royalti Nickel Ore', masa: 'Agustus 2026', subject: 'Kementerian ESDM RI (e-SIMPONI)', amount: 2450000000, dueDate: '10 Aug 2026', ntpn: '8912A309201923', status: 'PAID', statusLabel: 'Lunas NTPN Verified' },
                    { id: '010.000-26.9018241', invoiceNo: '010.000-26.9018241', category: 'EFAKTUR_PPN', taxName: 'PPN Keluaran Ore Sales', masa: 'Masa Juli 2026', subject: 'PT Smelter Nickel Indonesia', amount: 3820000000, dueDate: '31 Aug 2026', ntpn: 'A1293B81029381', status: 'PAID', statusLabel: 'Approval DJP Valid' },
                    { id: '010.000-26.7712049', invoiceNo: '010.000-26.7712049', category: 'EFAKTUR_PPN', taxName: 'PPN Masukan BBM Solar', masa: 'Masa Juli 2026', subject: 'PT Pertamina Patra Niaga', amount: 1450000000, dueDate: '31 Aug 2026', ntpn: '90123841029312', status: 'PAID', statusLabel: 'Kredit PPN Approved' },
                    { id: '820260801004412', invoiceNo: 'BP-PPH23-2026-0881', category: 'PPH_WHT', taxName: 'PPh Pasal 23 Jasa Hauling', masa: 'Agustus 2026', subject: 'PT Pertambangan Nusantara', amount: 480000000, dueDate: '15 Aug 2026', ntpn: 'F9012381029310', status: 'PAID', statusLabel: 'Bukti Potong Valid' },
                    { id: '820260801005510', invoiceNo: 'SPT-PPH21-2026-07', category: 'PPH_WHT', taxName: 'PPh Pasal 21 Karyawan Site', masa: 'Masa Juli 2026', subject: 'Direktorat Jenderal Pajak', amount: 620000000, dueDate: '10 Aug 2026', ntpn: 'B8912301928301', status: 'PAID', statusLabel: 'Lunas Disetor' },
                    { id: '320260019283019', invoiceNo: 'SPPT-PBB-P3-2026', category: 'PBB_P3', taxName: 'PBB Sektor Pertambangan P3', masa: 'Tahun Pajak 2026', subject: 'KPP Pratama Kendari', amount: 2800000000, dueDate: '31 Aug 2026', ntpn: 'E8912039102931', status: 'PAID', statusLabel: 'Lunas Tuntas' }
                  ]
                  .filter(item => taxCategoryFilter === 'ALL' || item.category === taxCategoryFilter)
                  .filter(item => item.id.toLowerCase().includes(taxSearch.toLowerCase()) || item.subject.toLowerCase().includes(taxSearch.toLowerCase()) || item.taxName.toLowerCase().includes(taxSearch.toLowerCase()) || item.invoiceNo.toLowerCase().includes(taxSearch.toLowerCase()))
                  .map((tax) => {
                    let badgeClass = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';

                    return (
                      <tr key={tax.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <div className="font-bold text-amber-400 font-mono">{tax.id}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Inv: {tax.invoiceNo}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-100">{tax.taxName}</div>
                          <div className="text-[10px] text-indigo-400 font-bold">{tax.masa}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-200 font-medium">{tax.subject}</div>
                        </td>
                        <td className="p-3 text-right">
                          <div className="font-bold text-emerald-300 font-mono">{formatIDR(tax.amount)}</div>
                        </td>
                        <td className="p-3">
                          <span className="text-slate-300 font-mono text-[11px]">{tax.dueDate}</span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${badgeClass}`}>
                            {tax.statusLabel}
                          </span>
                          <div className="text-[9px] text-slate-500 font-mono mt-0.5">NTPN: {tax.ntpn}</div>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedTaxBill(tax)}
                            className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            Detail Faktur
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Detail e-Faktur & Bukti Setor Pajak */}
          {selectedTaxBill && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-400">DETAIL SERTIFIKAT E-FAKTUR / SIMPONI BILLING</span>
                      <h3 className="text-base font-bold text-white">{selectedTaxBill.taxName}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedTaxBill(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Kode Billing / Faktur ID</span>
                    <strong className="text-amber-400 font-mono font-bold">{selectedTaxBill.id}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Nomor Seri Faktur DJP</span>
                    <span className="text-slate-200 font-mono font-bold">{selectedTaxBill.invoiceNo}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Wajib Pajak / Subjek</span>
                    <span className="text-slate-100 font-bold">{selectedTaxBill.subject}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Masa Pajak</span>
                    <span className="text-indigo-400 font-bold">{selectedTaxBill.masa}</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded-xl space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">NOMINAL KETERANGAN SETORAN PAJAK:</span>
                  <div className="text-xl font-mono font-black text-amber-400">
                    {formatIDR(selectedTaxBill.amount)}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-amber-500/20">
                    <span>Nomor Transaksi Penerimaan Negara (NTPN):</span>
                    <strong className="text-emerald-400 font-mono font-bold">{selectedTaxBill.ntpn}</strong>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-3">
                  <div className="w-16 h-16 bg-white rounded p-1 flex items-center justify-center shrink-0">
                    <span className="text-[8px] font-mono text-black font-bold text-center leading-tight">
                      [QR-CODE DJP VALIDATED]
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-1">
                    <p className="font-semibold text-white">Status Verifikasi DJP / SIMPONI:</p>
                    <p className="text-emerald-400 font-mono text-[10px] font-bold">
                      ✓ FAKTUR PAJAK SAH & SUDAH DITERIMA SERVER DJP ONLINE
                    </p>
                    <p className="text-[10px] text-slate-400">Digital signature & timestamp verified on 2026-08-01 09:12:00 WIB</p>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedTaxBill(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Sertifikat e-Faktur / Bukti Setor SIMPONI ${selectedTaxBill.id} berhasil diunduh dalam format PDF Resmi!`)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Cetak Bukti Setor PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Kalkulator SIMPONI Detail */}
          {showSimponiCalcModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">Panduan Tarif Royalti PNBP ESDM</h3>
                  </div>
                  <button onClick={() => setShowSimponiCalcModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Dasar Hukum PNBP:</span>
                      <strong className="text-amber-300 font-bold">PP No. 26 Tahun 2022</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Tarif Royalti Ore Nikel:</span>
                      <strong className="text-emerald-400 font-bold">10% dari Harga Pokok</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Standar acuan HPM:</span>
                      <strong className="text-blue-400 font-bold">Kepmen ESDM Bulanan</strong>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Sistem ERP Tambang secara otomatis menghitung estimasi kewajiban PNBP Royalti setiap kali draft survey surveyor terbit untuk barging ore, lalu menerbitkan simulasi ID billing e-SIMPONI agar tidak menunggak.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setShowSimponiCalcModal(false)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold transition-all"
                  >
                    Mengerti & Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB 1: EXECUTIVE */}
      {activeTab === 'executive' && (
        <div className="space-y-6">
          {/* Executive Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div 
              onClick={() => onNavigateModule('exploration')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Produksi Ore YTD</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Pickaxe className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-slate-100">1,845k</span>
                <span className="text-[11px] text-emerald-400 font-bold flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> 97%
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Target RKAB: 2.5M MT</p>
            </div>

            <div 
              onClick={() => onNavigateModule('stockpile')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Stockpile Volume</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Layers className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-slate-100">{(totalStockpileTonnage ?? 0).toLocaleString('id-ID')}</span>
                <span className="text-[11px] text-amber-400 font-bold">MT</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Avg Grade: {liveMetrics.averageNiGrade}% Ni</p>
            </div>

            <div 
              onClick={() => onNavigateModule('weighbridge')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Pos Timbangan Gate</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Scale className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-slate-100">Pos 1, 2, 3</span>
                <span className="text-[11px] text-indigo-300 font-bold">IoT Live</span>
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">▲ Timbang Digital Active</p>
            </div>

            <div 
              onClick={() => onNavigateModule('fleet')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Kesiapan Fleet</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Truck className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-slate-100">{operationalFleetCount} / {equipment.length}</span>
                <span className="text-[11px] text-emerald-400 font-bold">92% PA</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">CAT 777, Scania DT</p>
            </div>

            <div 
              onClick={() => onNavigateModule('smelter')}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-semibold">Nilai HPM ESDM</span>
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <Coins className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-emerald-400">{formatUSD(hpm.saproliteBaseNi1_8)}</span>
                <span className="text-[10px] text-slate-300 font-mono">/dmt</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">HMA Nikel: $16,450</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">
                    Realisasi Produksi Ore Nikel vs Target RKAB ESDM (MT)
                  </h3>
                  <p className="text-xs text-slate-400">Pencapaian bulanan pit penambangan nikel 2026</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-slate-800 text-emerald-400 rounded-lg font-bold">
                  Target Tercaver 97.2%
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rkabProductionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} 
                      formatter={(value: any) => [`${value?.toLocaleString('id-ID')} MT`, '']}
                    />
                    <Bar dataKey="targetMT" name="Target RKAB" fill="#334155" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actualMT" name="Realisasi Produksi" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Radar Chart Overall Performance */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div className="border-b border-slate-800 pb-3 mb-3">
                  <h3 className="font-bold text-slate-100 text-sm">Peta Keseimbangan KPI Operational</h3>
                  <p className="text-xs text-slate-400">Pencapaian multi-dimensi site tambang</p>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarKPIPerformance}>
                      <PolarGrid stroke="#334155" />
                      <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
                      <Radar name="Skor Site" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: BUSINESS INTELLIGENCE (BI) */}
      {activeTab === 'bi_analytics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" /> Executive Business Intelligence (BI) Analytics Hub
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Sintesis Data Lintas Modul: Pit, Stockpile, Jetty, BBM & Keuangan</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                OLAP Engine Active
              </span>
            </div>

            {/* BI Key Drivers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Cross-Site Revenue YTD</span>
                <p className="text-2xl font-extrabold text-emerald-400 font-mono">{formatUSD(1845000 * hpm.saproliteBaseNi1_8)}</p>
                <span className="text-emerald-400 text-[10px]">▲ +12.4% vs Budget 2026</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Rata-Rata Cash Cost</span>
                <p className="text-2xl font-extrabold text-amber-300 font-mono">$26.80 / MT</p>
                <span className="text-emerald-400 text-[10px]">▼ -3.5% Efisiensi Biaya</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Margin EBITDA Operasional</span>
                <p className="text-2xl font-extrabold text-indigo-300 font-mono">48.5%</p>
                <span className="text-slate-400 text-[10px]">Laba Bersih $48.2M</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase">Efisiensi Fuel Ratio B35</span>
                <p className="text-2xl font-extrabold text-blue-300 font-mono">2.82 L / Ton</p>
                <span className="text-emerald-400 text-[10px]">Target RKAB ≤ 3.00 L/Ton</span>
              </div>
            </div>

            {/* BI Chart: Production vs Cash Cost Trend */}
            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-100 text-xs">Visualisasi BI: Tren Produksi Ore vs Cash Cost Per Ton ($ USD)</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={rkabProductionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis yAxisId="left" stroke="#10b981" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} domain={[20, 35]} tickFormatter={(v) => `$${v}`} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Bar yAxisId="left" dataKey="actualMT" name="Produksi Ore Actual (MT)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="costPerTon" name="Cash Cost ($/MT)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: PRODUCTION ANALYTICS */}
      {activeTab === 'production_analytics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Pickaxe className="w-4 h-4 text-emerald-400" /> Analitik Produksi & Ore Mining (Production Analytics)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Evaluasi Realisasi Produksi Pit, Stripping Ratio (SR), & Recovery Grade</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono font-bold">
                SR Actual: 3.8 BCM/MT
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-mono text-[10px]">Total Overburden (OB) Removal</span>
                <p className="text-2xl font-extrabold text-slate-100 font-mono">7,011,000 <span className="text-xs font-normal text-slate-400">BCM</span></p>
                <span className="text-emerald-400 text-[10px]">Stripping Ratio Target 4.0 BCM/MT</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-mono text-[10px]">Total Ore Getting Produced</span>
                <p className="text-2xl font-extrabold text-emerald-400 font-mono">1,845,000 <span className="text-xs font-normal text-slate-400">WMT</span></p>
                <span className="text-emerald-400 text-[10px]">High Grade Saprolite 1.84% Ni Avg</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-400 font-mono text-[10px]">Ore Recovery Rate Pit</span>
                <p className="text-2xl font-extrabold text-amber-300 font-mono">96.8%</p>
                <span className="text-slate-400 text-[10px]">Dilusi Ore Terkontrol ≤ 3.2%</span>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-100 text-xs">Grafik Produksi Ore Bulanan vs Target RKAB ESDM 2026</h4>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={rkabProductionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                    <Bar dataKey="targetMT" name="Target RKAB (MT)" fill="#334155" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actualMT" name="Realisasi Actual (MT)" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: FUEL ANALYTICS */}
      {activeTab === 'fuel_analytics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-400" /> Analitik Konsumsi BBM & Fuel Ratio B35 (Fuel Analytics)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Pemantauan Konsumsi Solar B35, Sensor IoT Tanki & Deteksi Susut BBM</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold">
                Fuel Stock: 145,000 Liters (Ready 18 Hari)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Rata-Rata Fuel Ratio (Liters / Ton Ore)</span>
                <span className="text-3xl font-extrabold text-amber-300 block">2.82 L/Ton</span>
                <span className="text-emerald-400 text-[10px]">Optimal vs Standard (3.0 L/Ton)</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Konsumsi Solar B35 Per Jam</span>
                <span className="text-3xl font-extrabold text-blue-300 block">{liveMetrics.fuelConsumptionLph} L/Jam</span>
                <span className="text-slate-400 text-[10px]">Telemetri Live 38 Unit Fleet</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Anomali Susut/Theft Rate</span>
                <span className="text-3xl font-extrabold text-emerald-400 block">0.02%</span>
                <span className="text-emerald-400 text-[10px]">Anti-Theft Flowmeter Active</span>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-100 text-xs">Konsumsi BBM Per Kategori Unit Alat Berat (Liters/Shift)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 font-bold block">Dump Truck (Scania / Volvo)</strong>
                    <span className="text-slate-400 text-[10px]">Hauling Road KM 0-18</span>
                  </div>
                  <span className="text-amber-300 font-bold text-sm">3,850 L/Shift</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 font-bold block">Excavator PC2000 / PC800</strong>
                    <span className="text-slate-400 text-[10px]">Pit Digging & Loading</span>
                  </div>
                  <span className="text-amber-300 font-bold text-sm">2,920 L/Shift</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-100 font-bold block">Bulldozer & Motor Grader</strong>
                    <span className="text-slate-400 text-[10px]">Road Maintenance</span>
                  </div>
                  <span className="text-amber-300 font-bold text-sm">1,240 L/Shift</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: COST ANALYTICS */}
      {activeTab === 'cost_analytics' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Analitik Biaya Operasional & HPP (Cost Analytics)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Rincian Cash Cost Per Ton ($ USD/MT) & Analisis Varian Anggaran CAPEX/OPEX</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                Target Cost: ≤ $28.00 / MT
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Biaya Kontraktor Tambang</span>
                <span className="text-2xl font-extrabold text-slate-100 block">$14.20 / MT</span>
                <span className="text-slate-400 text-[10px]">OB Removal + Ore Getting</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Biaya Pengangkutan (Hauling)</span>
                <span className="text-2xl font-extrabold text-slate-100 block">$5.80 / MT</span>
                <span className="text-slate-400 text-[10px]">Jarak 18 KM ke Jetty</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Royalty ESDM (PNBP)</span>
                <span className="text-2xl font-extrabold text-amber-300 block">$3.90 / MT</span>
                <span className="text-slate-400 text-[10px]">Tarif Royalty 10% HPM</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Barging & Jetty Transshipment</span>
                <span className="text-2xl font-extrabold text-slate-100 block">$2.90 / MT</span>
                <span className="text-slate-400 text-[10px]">Demurrage Zero Risk</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center font-mono">
              <span className="text-slate-200 font-bold">Total Cash Cost All-In Per Ton Ore:</span>
              <span className="text-2xl font-extrabold text-emerald-400">$26.80 / MT</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: PROFITABILITY */}
      {activeTab === 'profitability' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Analitik Profitabilitas & Realisasi Penjualan Offtaker
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Evaluasi Pendapatan Penjualan vs HPM ESDM & Analisis Margin Laba</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                Harga HPM 1.8% Ni: {formatUSD(hpm.saproliteBaseNi1_8)} / dmt
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Realisasi Pendapatan Kotor</span>
                <span className="text-3xl font-extrabold text-emerald-400 block">$98.2M</span>
                <span className="text-emerald-400 text-[10px]">Kontrak Offtaker Smelter IMIP</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Margin EBITDA (%)</span>
                <span className="text-3xl font-extrabold text-indigo-300 block">48.5%</span>
                <span className="text-emerald-400 text-[10px]">▲ +4.2% vs Industri Avg</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-400 text-[10px]">Laba Bersih Operasional (EAT)</span>
                <span className="text-3xl font-extrabold text-slate-100 block">$48.2M</span>
                <span className="text-slate-400 text-[10px]">Pajak & Royalty Deducted</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: FORECAST & AI INSIGHT */}
      {activeTab === 'forecast_ai' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" /> Proyeksi Prediktif (Forecast) & AI NickelSmart Insights
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Model Machine Learning Prediksi Produksi 30/60/90 Hari & Rekomendasi AI</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-mono font-bold">
                MineGPT AI Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-emerald-400 text-sm block">Proyeksi Produksi 30 Hari Mendatang</span>
                <p className="text-slate-300">
                  Model AI memproyeksikan estimasi produksi ore sebesar <strong className="text-emerald-400 font-mono">265,000 WMT</strong> untuk bulan depan dengan tingkat kepastian confidence index 94.2%.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-300 text-sm block">Analisis Risiko Cuaca & Curah Hujan (La Nina)</span>
                <p className="text-slate-300">
                  Potensi hujan lebat diprediksi terjadi pada pertengahan bulan. Direkomendasikan melakukan perbaikan sump pit & pompa dewatering di Pit Beta sebelum tanggal 12.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: REALTIME KPI STREAM */}
      {activeTab === 'realtime_kpi' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-emerald-400 animate-pulse" />
              <h3 className="font-bold text-slate-100 text-base">Live Ticker & Realtime Operational Telemetry Stream</h3>
            </div>
            <span className="text-emerald-400 font-mono text-xs font-bold">
              Stream Telemetry Tick #{tickCounter} • Updated {lastUpdatedTime}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Stripping Overburden (OB) Shift Ini</span>
              <span className="text-3xl font-extrabold text-slate-100 font-mono">{(liveMetrics.hourlyObBCM ?? 0).toLocaleString('id-ID')} BCM</span>
              <span className="text-[10px] text-emerald-400 block font-mono">▲ +3.2% vs target shift</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Ore Production (Ore Getting)</span>
              <span className="text-3xl font-extrabold text-emerald-400 font-mono">{(liveMetrics.hourlyOreMT ?? 0).toLocaleString('id-ID')} MT</span>
              <span className="text-[10px] text-slate-400 block font-mono">Pit Alpha + Pit Beta</span>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Kecepatan Pemuatan Jetty Conveyor</span>
              <span className="text-3xl font-extrabold text-amber-300 font-mono">{liveMetrics.jettyConveyorTph} MT/jam</span>
              <span className="text-[10px] text-slate-400 block font-mono">Barge BG-MOR-09 Loading</span>
            </div>
          </div>

          <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-2">
              Streaming Real-Time Alert & Anomaly Event Log
            </h4>
            
            <div className="space-y-3 font-mono">
              <div className="p-3 bg-slate-900 rounded-xl border border-rose-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">CRITICAL</span>
                  <span className="text-slate-200 text-xs">Efluen Settling Pond #4 pH 5.2 (Melewati Ambang BPLH)</span>
                </div>
                <span className="text-slate-500 text-[10px]">{lastUpdatedTime}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">WARNING</span>
                  <span className="text-slate-200 text-xs">Unit Excavator EX-201 Suhu Hidrolik +14°C Normal Range</span>
                </div>
                <span className="text-slate-500 text-[10px]">{lastUpdatedTime}</span>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">NORMAL</span>
                  <span className="text-slate-200 text-xs">Stockpile Blending Saprolite High Grade Ni 1.84% Verified</span>
                </div>
                <span className="text-slate-500 text-[10px]">{lastUpdatedTime}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 2: OPERATIONAL PIT */}
      {activeTab === 'operational' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Rata-Rata Waktu Siklus (Cycle Time) DT</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">24.5 Min</span>
              <span className="text-[11px] text-emerald-400 block mt-1">Pit Alpha ke Stockpile ETO</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Kecepatan Rata-Rata Jalur Haul Road</span>
              <span className="text-2xl font-bold text-slate-100 font-mono">28.4 km/jam</span>
              <span className="text-[11px] text-amber-400 block mt-1">Kondisi Jalan: Kering (Disiram Dust Suppression)</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">Status Dewatering Settling Pond</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">3 Pompa Aktif</span>
              <span className="text-[11px] text-slate-400 block mt-1">Kapasitas Buang: 450 m³/jam</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Fluktuasi Cycle Time & Kepadatan Haul Road per Jam
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cycleTimeHourly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="avgCycleMin" name="Cycle Time (Menit)" stroke="#3B82F6" strokeWidth={3} />
                  <Line type="monotone" dataKey="dtSpeedKmh" name="Kecepatan DT (km/h)" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: FINANCIAL, CASH FLOW & FINANCIAL KPI */}
      {(activeTab === 'financial' || (activeTab as string) === 'financial_kpi') && (
        <div className="space-y-6">
          {/* Header Banner Financial Dashboard */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wider flex items-center gap-1">
                    <Coins className="w-3.5 h-3.5 text-emerald-400" />
                    CHIEF FINANCIAL OFFICER & TREASURY ENGINE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    KURS JISDOR: RP 16,250 / USD
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    HMA ESDM: $16,450 / DMT
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <DollarSign className="w-6 h-6 text-emerald-400" />
                  Dasbor Manajemen Keuangan, Cash Flow & Financial Engineering Tambang
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pengawasan EBITDA margin, realisasi revenue penjualan FOB/CIF, struktur All-in Cash Cost per Ton, piutang smelter (AR), hutang vendor (AP), dan simulasi sensivitas cashflow pertambangan nikel.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <select
                  value={finPeriodFilter}
                  onChange={(e) => setFinPeriodFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-emerald-500"
                >
                  <option value="AGUSTUS_2026">Masa Periode: Agustus 2026</option>
                  <option value="Q3_2026">Triwulan Q3 2026</option>
                  <option value="YTD_2026">Tahun Buku 2026 YTD</option>
                </select>

                <button
                  onClick={() => setShowFinSimModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Calculator className="w-4 h-4 text-emerald-400" />
                  Simulasi Cashflow & BEP
                </button>

                <button
                  onClick={() => alert(`Laporan Keuangan Konsolidasi (Laba Rugi, Neraca & Cashflow) Periode ${finPeriodFilter} berhasil diexport!`)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                >
                  <Download className="w-4 h-4" />
                  Export Financial Report
                </button>
              </div>
            </div>
          </div>

          {/* Top Key Financial KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Revenue (YTD)</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-white font-mono">
                $98.20M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> ▲ +12.4% Target
                </span>
                <span className="text-slate-500 font-mono">Rp 1.595 Triliun</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">EBITDA Operasional</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-indigo-300 font-mono">
                $47.60M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-indigo-400 font-bold">EBITDA Margin: 48.5%</span>
                <span className="text-slate-500 font-mono">Sangat Sehat</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">All-In Cash Cost Per Ton</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-300 font-mono">
                $26.80 / MT
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">▼ -$1.20 vs Budget</span>
                <span className="text-slate-500 font-mono">FOB Transshipment</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Arus Kas Bersih (Cash Flow)</span>
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-teal-300 font-mono">
                Rp 428,5 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-teal-400 font-bold">Free Cash Flow (+)</span>
                <span className="text-slate-500 font-mono">Kas Bank Mandiri</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Piutang Smelter (AR Net)</span>
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-purple-300 font-mono">
                Rp 142,8 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">94.2% Current (&lt;30d)</span>
                <span className="text-slate-500 font-mono">Smelter IMIP/VDNI</span>
              </div>
            </div>
          </div>

          {/* Interactive Financial Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cash Flow & Revenue Trend Composed Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    Tren Pendapatan Penjualan, Cash Cost & Margin EBITDA (Jan - Agu 2026)
                  </h3>
                  <p className="text-[11px] text-slate-400">Realisasi Pendapatan Penjualan Ore Nikel FOB vs Operating Cash Cost (Juta USD)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  AVG MARGIN: 48.5%
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { month: 'Jan', revenue: 11.2, cashCost: 5.8, ebitdaMargin: 48.2 },
                    { month: 'Feb', revenue: 12.4, cashCost: 6.2, ebitdaMargin: 50.0 },
                    { month: 'Mar', revenue: 11.8, cashCost: 6.1, ebitdaMargin: 48.3 },
                    { month: 'Apr', revenue: 13.1, cashCost: 6.7, ebitdaMargin: 48.8 },
                    { month: 'Mei', revenue: 12.2, cashCost: 6.3, ebitdaMargin: 48.3 },
                    { month: 'Jun', revenue: 13.8, cashCost: 7.0, ebitdaMargin: 49.2 },
                    { month: 'Jul', revenue: 12.9, cashCost: 6.8, ebitdaMargin: 47.3 },
                    { month: 'Agu', revenue: 13.2, cashCost: 6.7, ebitdaMargin: 49.2 }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} unit="M$" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} tickLine={false} unit="%" domain={[30, 60]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any, name: any) => [
                        name === 'ebitdaMargin' ? `${val}%` : `$${val} M USD`,
                        name === 'revenue' ? 'Pendapatan Penjualan' : name === 'cashCost' ? 'Operational Cash Cost' : 'Margin EBITDA (%)'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="revenue" name="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="cashCost" name="cashCost" fill="#64748b" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="ebitdaMargin" name="ebitdaMargin" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cost Breakdown Donut Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-amber-400" />
                  Struktur Biaya Cash Cost All-In Tambang
                </h3>
                <p className="text-[11px] text-slate-400">Komposisi All-In Cash Cost Per Ton Ore ($26.80 / MT)</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Kontraktor Mining (OB/Ore)', value: 14.20, fill: '#3b82f6' },
                        { name: 'Hauling Road & Transporter', value: 5.80, fill: '#f59e0b' },
                        { name: 'Royalti ESDM (PNBP 10%)', value: 3.90, fill: '#14b8a6' },
                        { name: 'Jetty Conveyor & Barging', value: 2.90, fill: '#10b981' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {[ '#3b82f6', '#f59e0b', '#14b8a6', '#10b981' ].map((color, index) => (
                        <Cell key={`fin-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`$${val} / MT`, 'Komponen Biaya']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Mining Contractor</span>
                  <span className="font-mono font-bold text-blue-400">$14.20 / MT (53%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Hauling Road</span>
                  <span className="font-mono font-bold text-amber-400">$5.80 / MT (22%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> Royalti PNBP ESDM</span>
                  <span className="font-mono font-bold text-teal-400">$3.90 / MT (15%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Transshipment Jetty</span>
                  <span className="font-mono font-bold text-emerald-400">$2.90 / MT (10%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Transactions AR / AP & Revenue Voucher */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Daftar Piutang Smelter (AR), Hutang Vendor (AP) & Voucher Pembayaran Keuangan
                </h3>
                <p className="text-[11px] text-slate-400">Verifikasi Invoice Penjualan Saprolite Ore, Tagihan BBM Solar, Jasa Kontraktor & Royalti ESDM</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari Inv / Smelter / Vendor..."
                    value={finSearch}
                    onChange={(e) => setFinSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500 w-52"
                  />
                </div>

                <select
                  value={finCategoryFilter}
                  onChange={(e) => setFinCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">Semua Kategori Transaksi</option>
                  <option value="AR_SMELTER">Piutang Penjualan Ore (AR)</option>
                  <option value="AP_VENDOR">Hutang Kontraktor & Vendor (AP)</option>
                  <option value="ROYALTY_PNBP">Setoran PNBP Royalti SIMPONI</option>
                  <option value="CAPEX_EQUIPMENT">Angsuran / Leasing Alat Berat</option>
                </select>
              </div>
            </div>

            {/* Financial Transactions Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">No. Invoice / Voucher</th>
                    <th className="p-3">Kategori & Deskripsi</th>
                    <th className="p-3">Mitra Smelter / Vendor</th>
                    <th className="p-3 text-right">Nilai USD / IDR</th>
                    <th className="p-3">Jatuh Tempo & Bank</th>
                    <th className="p-3 text-center">Status Pembayaran</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'INV-SLM-2026-0801', category: 'AR_SMELTER', desc: 'Penjualan Ore Saprolite 55,000 WMT (COA Ni 1.84%)', partner: 'PT Smelter Nickel Indonesia', amountUSD: 2475000, amountIDR: 40218750000, dueDate: '20 Aug 2026', bank: 'Mandiri Corp 102-00-1928', status: 'PAID', statusLabel: 'Lunas Transfer SWIFT' },
                    { id: 'INV-SLM-2026-0805', category: 'AR_SMELTER', desc: 'Penjualan Ore Saprolite 48,000 WMT (COA Ni 1.76%)', partner: 'PT Virtu Dragon Nickel Industry', amountUSD: 2160000, amountIDR: 35100000000, dueDate: '25 Aug 2026', bank: 'BCA Escrow 082-99-1029', status: 'CURRENT_UNPAID', statusLabel: 'Current (Due 25 Agu)' },
                    { id: 'PO-VD-2026-0798', category: 'AP_VENDOR', desc: 'Pengadaan Solar B35 Industri 50,000 Liters', partner: 'PT Pertamina Patra Niaga', amountUSD: 44615, amountIDR: 725000000, dueDate: '15 Aug 2026', bank: 'Mandiri HSD 102-00-9912', status: 'PAID', statusLabel: 'Lunas Disetor' },
                    { id: 'CON-MNG-2026-0777', category: 'AP_VENDOR', desc: 'Jasa Mining Contractor Progress OB 450,000 BCM', partner: 'PT Bukit Makmur Mandiri Utama', amountUSD: 1135384, amountIDR: 18450000000, dueDate: '28 Aug 2026', bank: 'BNI Corporate 001-92-3810', status: 'APPROVED_SCHEDULED', statusLabel: 'Scheduled (Due 28 Agu)' },
                    { id: 'ROY-ESDM-2026-0810', category: 'ROYALTY_PNBP', desc: 'PNBP Royalti Nikel e-SIMPONI Barging BG-MOR-09', partner: 'Kementerian ESDM RI (Kas Negara)', amountUSD: 150769, amountIDR: 2450000000, dueDate: '10 Aug 2026', bank: 'NTPN 8912A309201923', status: 'PAID', statusLabel: 'Lunas NTPN Verified' },
                    { id: 'LEASE-CAT-2026-0744', category: 'CAPEX_EQUIPMENT', desc: 'Angsuran Fleet 4 Unit Dump Truck Cat 777E', partner: 'PT Trakindo Utama Finance', amountUSD: 295384, amountIDR: 4800000000, dueDate: '30 Aug 2026', bank: 'Mandiri Leasing 102-00-5512', status: 'CURRENT_UNPAID', statusLabel: 'Current (Due 30 Agu)' }
                  ]
                  .filter(item => finCategoryFilter === 'ALL' || item.category === finCategoryFilter)
                  .filter(item => item.id.toLowerCase().includes(finSearch.toLowerCase()) || item.partner.toLowerCase().includes(finSearch.toLowerCase()) || item.desc.toLowerCase().includes(finSearch.toLowerCase()))
                  .map((rec) => {
                    let badgeClass = rec.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : rec.status === 'APPROVED_SCHEDULED' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40';

                    return (
                      <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3 font-mono font-bold text-emerald-400">
                          {rec.id}
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-100">{rec.desc}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Bank: {rec.bank}</div>
                        </td>
                        <td className="p-3 text-slate-200 font-medium">
                          {rec.partner}
                        </td>
                        <td className="p-3 text-right">
                          <div className="font-bold text-emerald-300 font-mono">${rec.amountUSD.toLocaleString('en-US')} USD</div>
                          <div className="text-[10px] text-slate-400 font-mono">{formatIDR(rec.amountIDR)}</div>
                        </td>
                        <td className="p-3 font-mono text-[11px] text-slate-300">
                          {rec.dueDate}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${badgeClass}`}>
                            {rec.statusLabel}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedFinRecord(rec)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                            Voucher Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Detail Voucher Transaksi Keuangan */}
          {selectedFinRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">FINANCIAL VOUCHER DETAILS</span>
                      <h3 className="text-base font-bold text-white">{selectedFinRecord.id}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedFinRecord(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Kategori Transaksi</span>
                    <strong className="text-emerald-400 font-bold">{selectedFinRecord.category}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Mitra Smelter / Vendor</span>
                    <span className="text-slate-100 font-bold">{selectedFinRecord.partner}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] text-slate-400 block">Deskripsi & Rincian Kontrak</span>
                    <span className="text-slate-200 font-medium">{selectedFinRecord.desc}</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">NOMINAL VOUCHER TRANSAKSI:</span>
                  <div className="text-2xl font-mono font-black text-emerald-400">
                    ${selectedFinRecord.amountUSD.toLocaleString('en-US')} USD
                  </div>
                  <div className="text-xs text-slate-300 font-mono">
                    ≈ {formatIDR(selectedFinRecord.amountIDR)} (Kurs Rp 16,250 / USD)
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Nomor Rekening Bank Destination:</span>
                    <strong className="text-slate-200">{selectedFinRecord.bank}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Tanggal Jatuh Tempo:</span>
                    <strong className="text-amber-300">{selectedFinRecord.dueDate}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Otorisasi CFO & Finance Manager:</span>
                    <strong className="text-emerald-400">✓ APPROVED (DIGITAL SIGNED)</strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedFinRecord(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Voucher Keuangan PDF ${selectedFinRecord.id} berhasil dicetak!`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Cetak Voucher PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Simulasi Financial Engineering & BEP */}
          {showFinSimModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Simulator Sensitivitas Cashflow & BEP Ore Nikel</h3>
                  </div>
                  <button onClick={() => setShowFinSimModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Asumsi Harga HMA Nikel ESDM ($ USD/dmt): <strong className="text-emerald-400 font-mono">${simHmaPrice}</strong>
                    </label>
                    <input
                      type="range"
                      min="12000"
                      max="22000"
                      step="250"
                      value={simHmaPrice}
                      onChange={(e) => setSimHmaPrice(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-950"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Target Volume Penjualan Ore (MT/Bulan): <strong className="text-blue-400 font-mono">{simSalesVolume.toLocaleString('id-ID')} MT</strong>
                    </label>
                    <input
                      type="range"
                      min="50000"
                      max="300000"
                      step="10000"
                      value={simSalesVolume}
                      onChange={(e) => setSimSalesVolume(Number(e.target.value))}
                      className="w-full accent-blue-500 bg-slate-950"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Target All-In Cash Cost Per Ton ($ USD/MT): <strong className="text-amber-400 font-mono">${simCashCostTarget} / MT</strong>
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="35"
                      step="0.5"
                      value={simCashCostTarget}
                      onChange={(e) => setSimCashCostTarget(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-slate-950"
                    />
                  </div>

                  {/* Dynamic Simulation Result Card */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">HASIL PROYEKSI SIMULASI FINANCIAL:</span>
                    <div className="grid grid-cols-2 gap-3 font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Estimasi Gross Revenue:</span>
                        <strong className="text-sm text-emerald-300 font-bold">
                          ${((simSalesVolume * (simHmaPrice * 0.0027)).toFixed(2))}M USD
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Estimasi Total Operating Cost:</span>
                        <strong className="text-sm text-slate-200 font-bold">
                          ${((simSalesVolume * simCashCostTarget) / 1000000).toFixed(2)}M USD
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Proyeksi EBITDA Margin:</span>
                        <strong className="text-sm text-indigo-300 font-bold">
                          {Math.max(0, (((simSalesVolume * (simHmaPrice * 0.0027) - (simSalesVolume * simCashCostTarget) / 1000000) / (simSalesVolume * (simHmaPrice * 0.0027))) * 100)).toFixed(1)}%
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Harga BEP Kadar Saprolite:</span>
                        <strong className="text-sm text-amber-300 font-bold">
                          ${(simCashCostTarget * 1.15).toFixed(2)} / MT
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setShowFinSimModal(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all"
                  >
                    Terapkan & Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB 4: PRODUCTION & ORE */}
      {activeTab === 'production' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
                Distribusi Kategori Grade Ore Stockpile
              </h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1 text-xs">
                {gradeDistributionData.map((g, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-300">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                      {g.name}
                    </span>
                    <strong className="text-slate-100 font-mono">{g.value}%</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
                Ringkasan Tonase Stockpile ETO & EFO (WMT)
              </h3>
              <div className="space-y-3 font-mono text-xs">
                {stockpiles.map(s => (
                  <div key={s.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <strong className="text-slate-200 font-bold block">{s.name}</strong>
                      <span className="text-slate-400 text-[10px]">Ni Grade: {s.averageGradeNi}% | MC: {s.moistureContent}%</span>
                    </div>
                    <span className="text-emerald-400 font-bold text-sm">{(s.currentTonnageMT ?? 0).toLocaleString('id-ID')} MT</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 5: SAFETY HSE MANAGER */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          {/* Header Banner HSE Manager */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Site HSE & K3LH Executive Management
                </span>
                <span className="text-slate-400 text-xs">• SMKP ESDM Kepmen 1827 K/30/MEM/2018 & ISO 45001</span>
              </div>
              <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-rose-400" />
                Dasbor HSE Manager, K3LH Pertambangan & Compliance SMKP ESDM
              </h1>
              <p className="text-xs text-slate-400 max-w-2xl mt-1">
                Pengawasan eksekutif keselamatan kerja tambang, pencapaian jam selamat LTI-Free, persetujuan JSA & PTW, audit SMKP Minerba, serta kesiapsiagaan Tim Tanggap Darurat (ERT).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setShowHseIncidentModal(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                Lapor Inspeksi / Incident K3
              </button>
              <button
                onClick={() => setShowSmkpAuditModal(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Award className="w-4 h-4 text-amber-400" />
                Audit SMKP ESDM
              </button>
              <button
                onClick={() => setShowJsaApprovalModal(true)}
                className="px-3.5 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <FileCheck2 className="w-4 h-4 text-indigo-400" />
                Verifikasi JSA & PTW
              </button>
            </div>
          </div>

          {/* Executive Key HSE Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Jam Kerja Selamat (LTI-Free)</span>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono">4,820,000 <span className="text-xs font-normal text-slate-400">Jam</span></p>
              <span className="text-[10px] text-emerald-400 block font-bold">✓ Zero Fatality Non-Stop</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Tingkat Frekuensi LTIFR / FR</span>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono">0.00 <span className="text-xs font-normal text-slate-400">/ 1M Jam</span></p>
              <span className="text-[10px] text-slate-400 block font-mono">Target ESDM &lt; 0.10</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Active PTW & JSA Permits</span>
              <p className="text-2xl font-extrabold text-indigo-400 font-mono">18 <span className="text-xs font-normal text-slate-400">Dokumen</span></p>
              <span className="text-[10px] text-indigo-300 block font-bold">Hot Work, Confined & Height</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Skor Audit SMKP Minerba</span>
              <p className="text-2xl font-extrabold text-amber-300 font-mono">96.4% <span className="text-xs font-normal text-slate-400">Emas</span></p>
              <span className="text-[10px] text-amber-400 block font-bold">Peringkat Bendera Emas K3</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Kesiapsiagaan Tim ERT</span>
              <p className="text-2xl font-extrabold text-rose-400 font-mono">READY <span className="text-xs font-normal text-slate-400">24/7</span></p>
              <span className="text-[10px] text-slate-400 block font-mono">2 Damkar & 1 Rescue Standby</span>
            </div>
          </div>

          {/* Interactive Visual Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Safety Incident Trend (First Aid, Medical Treatment, Near Miss) */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-400" />
                    Grafik Tren Statistik Insiden & Near Miss (6 Bulan Terakhir)
                  </h3>
                  <p className="text-[11px] text-slate-400">Rekapitulasi First Aid (P3K), Medical Treatment Case, dan Laporan Near Miss</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 font-mono">K3 Minerba</span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { month: 'Mar 26', nearMiss: 24, firstAid: 3, medicalTreatment: 0, propertyDamage: 1 },
                    { month: 'Apr 26', nearMiss: 30, firstAid: 2, medicalTreatment: 1, propertyDamage: 0 },
                    { month: 'Mei 26', nearMiss: 28, firstAid: 1, medicalTreatment: 0, propertyDamage: 0 },
                    { month: 'Jun 26', nearMiss: 35, firstAid: 2, medicalTreatment: 0, propertyDamage: 1 },
                    { month: 'Jul 26', nearMiss: 42, firstAid: 1, medicalTreatment: 0, propertyDamage: 0 },
                    { month: 'Agu 26', nearMiss: 18, firstAid: 0, medicalTreatment: 0, propertyDamage: 0 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                    <Bar dataKey="nearMiss" name="Near Miss (Hampir Celaka)" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="firstAid" name="First Aid Case (P3K)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="propertyDamage" name="Kerusakan Alat (Property Damage)" fill="#fb7185" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Hazard Categories & Inspection Finding */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Distribusi Kategori Hazard Observation & STOP Card Inspeksi
                  </h3>
                  <p className="text-[11px] text-slate-400">Temuan Unsafe Condition & Unsafe Action di Area Tambang</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 font-mono">100% Remediated</span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { category: 'Tanggul Pit Highwall', count: 28 },
                    { category: 'Disiplin APD & Helm', count: 22 },
                    { category: 'Kecepatan Haul Road', count: 18 },
                    { category: 'Pencegahan Gas/B3', count: 12 },
                    { category: 'Kebisingan Crusher', count: 8 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                    <Bar dataKey="count" name="Jumlah Temuan STOP Card" fill="#10b981" radius={[6, 6, 0, 0]}>
                      {[
                        { color: '#f59e0b' },
                        { color: '#6366f1' },
                        { color: '#06b6d4' },
                        { color: '#ec4899' },
                        { color: '#10b981' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Log Inspeksi K3, JSA & Audit Compliance Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  Log Inspeksi K3, Persetujuan JSA & Register Incident Safety
                </h3>
                <p className="text-[11px] text-slate-400">Verifikasi Izin Kerja Panas, Confined Space, JSA, dan Penanganan Laporan Near Miss</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <select
                  value={hseCategoryFilter}
                  onChange={(e) => setHseCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-indigo-500 font-semibold"
                >
                  <option value="ALL">Semua Kategori K3</option>
                  <option value="INCIDENT_NEAR_MISS">Laporan Incident / Near Miss</option>
                  <option value="PERMIT_JSA">Izin Kerja PTW & JSA Approved</option>
                  <option value="HAZARD_OBSERVATION">Hazard Observation STOP Card</option>
                  <option value="SMKP_AUDIT">Audit Compliance SMKP ESDM</option>
                </select>

                <select
                  value={hseStatusFilter}
                  onChange={(e) => setHseStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-indigo-500 font-semibold"
                >
                  <option value="ALL">Semua Status</option>
                  <option value="APPROVED_ACTIVE">Disetujui / Aktif (Approved)</option>
                  <option value="IN_PROGRESS">Dalam Tindak Lanjut</option>
                  <option value="CLOSED_RESOLVED">Closed / Selesai Remedi</option>
                </select>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari Lokasi / Pengawas / ID..."
                    value={hseSearch}
                    onChange={(e) => setHseSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:border-indigo-500 w-48 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <th className="p-3">No. Register ID</th>
                    <th className="p-3">Kategori Dokumen</th>
                    <th className="p-3">Uraian Aktivitas / Insiden</th>
                    <th className="p-3">Lokasi Tambang</th>
                    <th className="p-3">Pengawas K3 / Reporter</th>
                    <th className="p-3">Evaluasi Risiko</th>
                    <th className="p-3">Status Clearance</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                  {[
                    {
                      id: 'PTW-2026-081',
                      category: 'PERMIT_JSA',
                      title: 'Izin Kerja Panas (Welding Fuel Tank 50,000L)',
                      location: 'Workshop Central KM 12',
                      supervisor: 'Budi Santoso (Senior Mechanic)',
                      riskEval: 'RISK CONTROLLED (LOW)',
                      status: 'APPROVED_ACTIVE'
                    },
                    {
                      id: 'JSA-2026-102',
                      category: 'PERMIT_JSA',
                      title: 'Job Safety Analysis - Rigging & Sling PC2000',
                      location: 'EFO Stockpile Crusher #1',
                      supervisor: 'Rahmat Hidayat (POP ESDM)',
                      riskEval: 'JSA VERIFIED OK',
                      status: 'APPROVED_ACTIVE'
                    },
                    {
                      id: 'HAZ-2026-112',
                      category: 'HAZARD_OBSERVATION',
                      title: 'Safety Berm Tanggul Pit Kurang Tinggi 3/4 Ban',
                      location: 'Pit Alpha Ramp Segment 4',
                      supervisor: 'Doni (Safety Inspector)',
                      riskEval: 'HIGH HAZARD',
                      status: 'CLOSED_RESOLVED'
                    },
                    {
                      id: 'INC-2026-019',
                      category: 'INCIDENT_NEAR_MISS',
                      title: 'Near Miss - Semburan Selang Hidrolik Dump Truck',
                      location: 'Haul Road Segment B',
                      supervisor: 'Siti Aminah (HSE Officer)',
                      riskEval: 'MEDIUM RISK',
                      status: 'CLOSED_RESOLVED'
                    },
                    {
                      id: 'AUD-2026-004',
                      category: 'SMKP_AUDIT',
                      title: 'Audit SMKP Element 3 - Pengendalian Operasional',
                      location: 'Area Crusher & Port Jetty',
                      supervisor: 'Ir. Bambang (Auditor SMKP)',
                      riskEval: 'SCORE 96.4% (GOLD)',
                      status: 'APPROVED_ACTIVE'
                    }
                  ]
                  .filter(item => hseCategoryFilter === 'ALL' || item.category === hseCategoryFilter)
                  .filter(item => hseStatusFilter === 'ALL' || item.status === hseStatusFilter)
                  .filter(item => !hseSearch || 
                    item.id.toLowerCase().includes(hseSearch.toLowerCase()) ||
                    item.title.toLowerCase().includes(hseSearch.toLowerCase()) ||
                    item.location.toLowerCase().includes(hseSearch.toLowerCase()) ||
                    item.supervisor.toLowerCase().includes(hseSearch.toLowerCase())
                  )
                  .map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-bold text-rose-400">{row.id}</td>
                      <td className="p-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          row.category === 'PERMIT_JSA' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                          row.category === 'HAZARD_OBSERVATION' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          row.category === 'INCIDENT_NEAR_MISS' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {row.category}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-white font-bold">{row.title}</td>
                      <td className="p-3 font-sans text-slate-300">{row.location}</td>
                      <td className="p-3 font-sans text-slate-300">{row.supervisor}</td>
                      <td className="p-3 font-bold text-amber-300">{row.riskEval}</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3 text-right font-sans">
                        <button
                          onClick={() => alert(`Mencetak Berkas Dokumentasi K3LH ${row.id} (${row.title})...`)}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-[11px] font-bold border border-rose-500/30 transition-all flex items-center gap-1 ml-auto"
                        >
                          <Download className="w-3 h-3" />
                          Berkas K3 PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Lapor Inspeksi / Incident K3 Baru */}
          {showHseIncidentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <h3 className="text-base font-bold text-white">Input Laporan Inspeksi K3 & Near Miss Baru</h3>
                  </div>
                  <button onClick={() => setShowHseIncidentModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Laporan Inspeksi / Near Miss K3 berhasil disimpan dan diteruskan ke Pengawas K3 / POP!");
                  setShowHseIncidentModal(false);
                }} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kategori Temuan K3:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500">
                        <option>Near Miss (Hampir Celaka)</option>
                        <option>Unsafe Condition (Kondisi Tidak Aman)</option>
                        <option>Unsafe Action (Tindakan Tidak Aman)</option>
                        <option>First Aid Case (P3K)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Tingkat Risiko (HIRADC):</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500">
                        <option>LOW (Rendah)</option>
                        <option>MEDIUM (Sedang)</option>
                        <option>HIGH (Tinggi - Segera Tindak Lanjut)</option>
                        <option>CRITICAL (Stop Pekerjaan)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Lokasi Tambang / Pit Segment:</label>
                    <input type="text" placeholder="Misal: Pit Alpha Ramp KM 14" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500" required />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Deskripsi Temuan & Tindakan Perbaikan:</label>
                    <textarea rows={3} placeholder="Tuliskan detail kondisi berbahaya dan tindakan pencegahan..." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500" required />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowHseIncidentModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Simpan Laporan K3
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Audit SMKP ESDM */}
          {showSmkpAuditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">Status Audit SMKP Minerba ESDM Kepmen 1827</h3>
                  </div>
                  <button onClick={() => setShowSmkpAuditModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Nilai Pencapaian Audit SMKP:</span>
                      <strong className="text-amber-400 font-mono font-bold text-sm">96.4% (Bendera Emas)</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Status Sertifikat SMKP:</span>
                      <strong className="text-emerald-400 font-mono font-bold">Terakreditasi Ditjen Minerba ESDM</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Tanggal Audit Terakhir:</span>
                      <span className="text-slate-200 font-mono">15 Juli 2026</span>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Sistem Manajemen Keselamatan Pertambangan (SMKP) mencakup 7 Elemen Wajib: Kebijakan, Perencanaan, Organisasi & Personel, Implementasi, Evaluasi & Tindak Lanjut, Dokumentasi, dan Tinjauan Manajemen.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowSmkpAuditModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                  >
                    Tutup
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert("Laporan Audit SMKP Minerba ESDM siap diunduh!");
                      setShowSmkpAuditModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Unduh Sertifikat SMKP PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Verifikasi JSA & Izin Kerja */}
          {showJsaApprovalModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Verifikasi & Approval JSA (Job Safety Analysis)</h3>
                  </div>
                  <button onClick={() => setShowJsaApprovalModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Nama Pekerjaan Bahaya:</span>
                      <strong className="text-white font-bold">LOTO & Hot Work Tanki Solar 50,000L</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Pengawas Operasional (POP):</span>
                      <span className="text-indigo-300 font-bold">Rahmat Hidayat (POP-ESDM-9912)</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Pengendalian Risiko:</span>
                      <strong className="text-emerald-400 font-bold">APAR CO2, Blower Air, Safety Harness</strong>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Telah diverifikasi oleh HSE Manager & KTT bahwa seluruh mitigasi bahaya telah memenuhi standar JSA Kepmen ESDM 1827 K.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowJsaApprovalModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert("Persetujuan JSA Digital disetujui dan Izin Kerja Panas terbit!");
                      setShowJsaApprovalModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    Setujui JSA Digital
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB 6: ENVIRONMENT ESG */}
      {activeTab === 'environment' && (
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Monitoring Kualitas Air Settling Pond Limpasan Tambang (Sensor BPLH Real-Time)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {environmentPondMetrics.map((p, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div>
                    <strong className="text-slate-200 font-sans block text-xs font-bold">{p.pond}</strong>
                    <span className="text-slate-400 text-[10px]">Tingkat Kekeruhan (Turbidity): {p.ntu} NTU</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-emerald-400 block">pH {p.ph}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      p.status === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-300 block">Capaian Revegetasi & Reklamasi Lahan</span>
                <span className="text-slate-300 text-[11px]">Total Lahan Ditanami Pohon Sengon & Mahoni: 142.5 Hektar</span>
              </div>
              <span className="text-xl font-bold text-emerald-400 font-mono">102% dari Target ESDM</span>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 7: MAINTENANCE MANAGER DASHBOARD & FLEET TELEMETRY */}
      {(activeTab === 'equipment' || activeTab === 'dasbor_maintenance') && (
        <FleetManagementModule
          equipment={equipment}
          language={language}
          onUpdateEquipmentStatus={() => {}}
          initialTab="dasbor_maintenance"
        />
      )}

      {/* DASHBOARD TAB 7B: MASTER DATA MAINTENANCE MANAGER */}
      {(activeTab === 'master_maintenance' || activeTab === 'master_data_maintenance') && (
        <FleetManagementModule
          equipment={equipment}
          language={language}
          onUpdateEquipmentStatus={() => {}}
          initialTab="master_data_maintenance"
        />
      )}

      {/* DASHBOARD TAB 7C: DASBOR WORKSHOP MANAGER */}
      {(activeTab === 'dasbor_workshop' || activeTab === 'workshop') && (
        <FleetManagementModule
          equipment={equipment}
          language={language}
          onUpdateEquipmentStatus={() => {}}
          initialTab="dasbor_workshop"
        />
      )}

      {/* DASHBOARD TAB 7D: MASTER DATA WORKSHOP MANAGER */}
      {(activeTab === 'master_workshop' || activeTab === 'master_data_workshop') && (
        <FleetManagementModule
          equipment={equipment}
          language={language}
          onUpdateEquipmentStatus={() => {}}
          initialTab="master_data_workshop"
        />
      )}

      {/* DASHBOARD TAB 7E: DASBOR FLEET MANAGER */}
      {(activeTab === 'dasbor_fleet' || activeTab === 'fleet') && (
        <FleetManagementModule
          equipment={equipment}
          language={language}
          onUpdateEquipmentStatus={() => {}}
          initialTab="dasbor_fleet"
        />
      )}

      {/* DASHBOARD TAB 7F: MASTER DATA FLEET MANAGER */}
      {(activeTab === 'master_fleet' || activeTab === 'master_data_fleet') && (
        <FleetManagementModule
          equipment={equipment}
          language={language}
          onUpdateEquipmentStatus={() => {}}
          initialTab="master_data_fleet"
        />
      )}

      {/* DASHBOARD TAB 7G: DASBOR DISPATCHER MANAGER */}
      {(activeTab === 'dasbor_dispatcher' || activeTab === 'dispatcher') && (
        <FleetManagementModule
          equipment={equipment}
          language={language}
          onUpdateEquipmentStatus={() => {}}
          initialTab="dasbor_dispatcher"
        />
      )}

      {/* DASHBOARD TAB 7H: MASTER DATA DISPATCHER MANAGER */}
      {(activeTab === 'master_dispatcher' || activeTab === 'master_data_dispatcher') && (
        <FleetManagementModule
          equipment={equipment}
          language={language}
          onUpdateEquipmentStatus={() => {}}
          initialTab="master_data_dispatcher"
        />
      )}

      {/* DASHBOARD TAB 7I: DASBOR AKUN SURVEYOR */}
      {(activeTab === 'dasbor_surveyor' || activeTab === 'surveyor') && (
        <SurveyTopographyModule
          stockpiles={stockpiles}
          language={language}
          initialTab="dasbor_surveyor"
        />
      )}

      {/* DASHBOARD TAB 7J: MASTER DATA AKUN SURVEYOR */}
      {(activeTab === 'master_surveyor' || activeTab === 'master_data_surveyor') && (
        <SurveyTopographyModule
          stockpiles={stockpiles}
          language={language}
          initialTab="master_data_surveyor"
        />
      )}

      {/* DASHBOARD TAB 7Y: DASBOR AKUN COO (CHIEF OPERATING OFFICER) */}
      {(activeTab === 'dasbor_coo' || activeTab === 'coo') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="dasbor_coo"
        />
      )}

      {/* DASHBOARD TAB 7Z: MASTER DATA AKUN COO */}
      {(activeTab === 'master_coo' || activeTab === 'master_data_coo') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="master_data_coo"
        />
      )}

      {/* DASHBOARD TAB 7W: DASBOR AKUN FINANCE DIRECTOR */}
      {(activeTab === 'dasbor_finance_director' || activeTab === 'finance_director') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="dasbor_finance_director"
        />
      )}

      {/* DASHBOARD TAB 7X: MASTER DATA AKUN FINANCE DIRECTOR */}
      {(activeTab === 'master_finance_director' || activeTab === 'master_data_finance_director') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="master_data_finance_director"
        />
      )}

      {/* DASHBOARD TAB 7U: DASBOR AKUN HR DIRECTOR */}
      {(activeTab === 'dasbor_hr_director' || activeTab === 'hr_director') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="dasbor_hr_director"
        />
      )}

      {/* DASHBOARD TAB 7V: MASTER DATA AKUN HR DIRECTOR */}
      {(activeTab === 'master_hr_director' || activeTab === 'master_data_hr_director') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="master_data_hr_director"
        />
      )}

      {/* DASHBOARD TAB 7S: DASBOR AKUN MINE MANAGER / KTT */}
      {(activeTab === 'dasbor_mine_manager' || activeTab === 'mine_manager' || activeTab === 'ktt_executive') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="dasbor_mine_manager"
        />
      )}

      {/* DASHBOARD TAB 7T: MASTER DATA AKUN MINE MANAGER / KTT */}
      {(activeTab === 'master_mine_manager' || activeTab === 'master_data_mine_manager') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="master_data_mine_manager"
        />
      )}

      {/* DASHBOARD TAB 7Q: DASBOR AKUN OPERATION MANAGER */}
      {(activeTab === 'dasbor_operation_manager' || activeTab === 'operation_manager') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="dasbor_operation_manager"
        />
      )}

      {/* DASHBOARD TAB 7R: MASTER DATA AKUN OPERATION MANAGER */}
      {(activeTab === 'master_operation_manager' || activeTab === 'master_data_operation_manager') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="master_data_operation_manager"
        />
      )}

      {/* DASHBOARD TAB 7O: DASBOR AKUN PRODUCTION MANAGER */}
      {(activeTab === 'dasbor_production_manager' || activeTab === 'production_manager') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="dasbor_production_manager"
        />
      )}

      {/* DASHBOARD TAB 7P: MASTER DATA AKUN PRODUCTION MANAGER */}
      {(activeTab === 'master_production_manager' || activeTab === 'master_data_production_manager') && (
        <OperationCenterModule
          sites={sites}
          stockpiles={stockpiles}
          equipment={equipment}
          barges={barges}
          language={language}
          initialTab="master_data_production_manager"
        />
      )}

      {/* DASHBOARD TAB 7M: DASBOR AKUN GEOLOGIST */}
      {(activeTab === 'dasbor_geologist' || activeTab === 'geologist') && (
        <ExplorationPitModule
          sites={sites}
          language={language}
          initialTab="dasbor_geologist"
        />
      )}

      {/* DASHBOARD TAB 7N: MASTER DATA AKUN GEOLOGIST */}
      {(activeTab === 'master_geologist' || activeTab === 'master_data_geologist') && (
        <ExplorationPitModule
          sites={sites}
          language={language}
          initialTab="master_data_geologist"
        />
      )}

      {/* DASHBOARD TAB 7K: DASBOR AKUN MINE ENGINEER */}
      {(activeTab === 'dasbor_mine_engineer' || activeTab === 'mine_engineer') && (
        <ExplorationPitModule
          sites={sites}
          language={language}
          initialTab="dasbor_mine_engineer"
        />
      )}

      {/* DASHBOARD TAB 7L: MASTER DATA AKUN MINE ENGINEER */}
      {(activeTab === 'master_mine_engineer' || activeTab === 'master_data_mine_engineer') && (
        <ExplorationPitModule
          sites={sites}
          language={language}
          initialTab="master_data_mine_engineer"
        />
      )}

      {/* DASHBOARD TAB 8: AI ANALYTICS */}
      {activeTab === 'ai' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <h3 className="font-bold text-slate-100 text-base">Mesin Prediktif AI NickelSmart Operational</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">Prediksi Anomali Pemeliharaan Alat</span>
              <p className="text-slate-300">
                Unit Excavator EX-201 (Komatsu PC2000) terdeteksi mengalami kenaikan suhu transmisi hidrolik +14°C di atas normal. Direkomendasikan ganti oli filter dalam 24 jam.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="font-bold text-purple-400">Optimasi Formula Blending EFO</span>
              <p className="text-slate-300">
                Untuk mempertahankan kadar Ni {liveMetrics.averageNiGrade}% pada shipment Tongkang BG-MOR-09, campurkan 600 MT Stockpile Alpha-High dengan 400 MT Stockpile Beta-Mid.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB 10: GIS PIT MAP */}
      {activeTab === 'gis_map' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-slate-100 text-base">Peta GIS Operasional Pit & Posisi GPS Perangkat</h3>
            </div>
            <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg font-mono text-[11px] font-bold">
              Koor: 2°31'44"S 121°58'12"E (Bahodopi Morowali)
            </span>
          </div>

          <div className="relative h-80 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {/* Visual GIS Map Graphic Representation */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
            
            {/* Pit Nodes */}
            <div className="absolute top-12 left-1/4 p-3 rounded-xl bg-slate-900/90 border border-emerald-500 text-center shadow-lg">
              <MapPin className="w-5 h-5 text-emerald-400 mx-auto mb-1 animate-bounce" />
              <span className="font-bold text-slate-100 text-[11px] block">Pit Alpha Saprolite</span>
              <span className="text-[10px] text-emerald-300 font-mono">Ni: {liveMetrics.averageNiGrade}% | {liveMetrics.activeEquipmentCount} DT Active</span>
            </div>

            <div className="absolute top-28 right-1/4 p-3 rounded-xl bg-slate-900/90 border border-amber-500 text-center shadow-lg">
              <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-1 animate-bounce" />
              <span className="font-bold text-slate-100 text-[11px] block">Stockpile EFO Blending</span>
              <span className="text-[10px] text-amber-300 font-mono">48,500 MT Ready</span>
            </div>

            <div className="absolute bottom-8 left-1/3 p-3 rounded-xl bg-slate-900/90 border border-blue-500 text-center shadow-lg">
              <Ship className="w-5 h-5 text-blue-400 mx-auto mb-1 animate-pulse" />
              <span className="font-bold text-slate-100 text-[11px] block">Jetty Port Terminal</span>
              <span className="text-[10px] text-blue-300 font-mono">Barge Loading BG-MOR-09 ({liveMetrics.jettyConveyorTph} TPH)</span>
            </div>

            <span className="text-slate-500 text-[11px]">GIS Layer: Satelit Topografi TopoMap v2.4 (GPS Real-Time Active)</span>
          </div>
        </div>
      )}

      {/* DASHBOARD TAB: ACCOUNTING & GENERAL LEDGER */}
      {activeTab === 'accounting' && (
        <div className="space-y-6">
          {/* Header Banner Accounting Dashboard */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                    ACCOUNTING & FINANCIAL REPORTING ENGINE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    PSAK 73 & IFRS COMPLIANT
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    TRIAL BALANCE: BALANCED 100%
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-6 h-6 text-indigo-400" />
                  Dasbor Akuntansi, Jurnal Umum & General Ledger Tambang Nikel
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pencatatan pembukuan otomatis berbasis Chart of Accounts (COA 1000-7000), Jurnal Umum ganda (Debit & Kredit), Trial Balance, Laporan Laba Rugi (P&L), dan Akuntansi Depresiasi CapEx pertambangan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <select
                  value={accPeriodFilter}
                  onChange={(e) => setAccPeriodFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-indigo-500"
                >
                  <option value="AGUSTUS_2026">Periode Buku: Agustus 2026 (Open)</option>
                  <option value="JULI_2026">Periode Buku: Juli 2026 (Closed)</option>
                  <option value="Q2_2026">Triwulan Q2 2026 (Audited)</option>
                  <option value="YTD_2026">Tahun Buku 2026 YTD</option>
                </select>

                <button
                  onClick={() => setShowTrialBalanceModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Scale className="w-4 h-4 text-indigo-400" />
                  Lihat Neraca Saldo
                </button>

                <button
                  onClick={() => setShowAccNewJournalModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-950/50"
                >
                  <Plus className="w-4 h-4" />
                  Input Jurnal Voucher
                </button>
              </div>
            </div>
          </div>

          {/* Top Key Accounting KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Nilai Jurnal (Masa)</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-white font-mono">
                Rp 1.485,20 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-indigo-400 font-bold">512 Voucher Posted</span>
                <span className="text-slate-500 font-mono">Periode Agu 2026</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Keseimbangan Trial Balance</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Scale className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                Rp 842,50 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">✓ Debet = Kredit</span>
                <span className="text-slate-500 font-mono">100% Balanced</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Laba Bersih Operasional (P&L)</span>
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-teal-300 font-mono">
                Rp 64,20 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-teal-400 font-bold">Net Profit Margin 39.7%</span>
                <span className="text-slate-500 font-mono">EBT Sehat</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Aset Tetap COA 1200</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-blue-300 font-mono">
                Rp 1,120 Triliun
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-blue-400 font-bold">Fleet, Jetty & Site</span>
                <span className="text-slate-500 font-mono">Nilai Buku Net</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Beban Depresiasi (COA 5200)</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-300 font-mono">
                Rp 4,85 M / Bln
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-amber-400 font-bold">PSAK 16 Straight-Line</span>
                <span className="text-slate-500 font-mono">Alat Berat & Fleet</span>
              </div>
            </div>
          </div>

          {/* Interactive Accounting Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue vs COGS vs SGA Trend Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                    Tren Pendapatan Nikel (COA 4110) vs Beban Pokok Mining (COA 5110) & SGA (COA 6110)
                  </h3>
                  <p className="text-[11px] text-slate-400">Realisasi Pos Akuntansi Laba Rugi Bulanan (Dalam Miliar Rupiah)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  AVERAGE NET MARGIN: 39.7%
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { month: 'Jan', revenue: 182.0, cogs: 94.2, sga: 14.8, profit: 73.0 },
                    { month: 'Feb', revenue: 201.5, cogs: 100.8, sga: 15.2, profit: 85.5 },
                    { month: 'Mar', revenue: 191.8, cogs: 99.1, sga: 14.5, profit: 78.2 },
                    { month: 'Apr', revenue: 212.8, cogs: 108.9, sga: 16.1, profit: 87.8 },
                    { month: 'Mei', revenue: 198.2, cogs: 102.4, sga: 15.0, profit: 80.8 },
                    { month: 'Jun', revenue: 224.2, cogs: 113.8, sga: 16.8, profit: 93.6 },
                    { month: 'Jul', revenue: 209.6, cogs: 110.5, sga: 15.9, profit: 83.2 },
                    { month: 'Agu', revenue: 214.5, cogs: 108.8, sga: 16.0, profit: 89.7 }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} unit="M" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} tickLine={false} unit="M" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any, name: any) => [
                        `Rp ${val} Miliar`,
                        name === 'revenue' ? 'Pendapatan Penjualan (COA 4110)' : name === 'cogs' ? 'Beban Pokok Mining (COA 5110)' : name === 'sga' ? 'Beban SGA (COA 6110)' : 'Laba Operasional'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="revenue" name="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="cogs" name="cogs" fill="#334155" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="profit" name="profit" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* COA Expense Breakdown Donut Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-indigo-400" />
                  Struktur Beban Operasional COA
                </h3>
                <p className="text-[11px] text-slate-400">Komposisi Jurnal Debet Beban Pertambangan Periode Agu 2026</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: '5110 Jasa Kontraktor Mining', value: 57.8, fill: '#6366f1' },
                        { name: '5120 Bahan Bakar Solar B35', value: 23.6, fill: '#f59e0b' },
                        { name: '5130 Royalti PNBP ESDM', value: 15.9, fill: '#14b8a6' },
                        { name: '5200 Depresiasi Fleet & Site', value: 4.8, fill: '#3b82f6' },
                        { name: '6110 Gaji & Remunerasi', value: 6.7, fill: '#ec4899' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {[ '#6366f1', '#f59e0b', '#14b8a6', '#3b82f6', '#ec4899' ].map((color, index) => (
                        <Cell key={`acc-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`Rp ${val} Miliar`, 'Nilai Beban']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> COA 5110 Kontraktor</span>
                  <span className="font-mono font-bold text-indigo-400">Rp 57.8 M (46.7%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> COA 5120 BBM Solar</span>
                  <span className="font-mono font-bold text-amber-400">Rp 23.6 M (19.1%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> COA 5130 Royalti ESDM</span>
                  <span className="font-mono font-bold text-teal-400">Rp 15.9 M (12.8%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> COA 6110 Gaji & Staff</span>
                  <span className="font-mono font-bold text-pink-400">Rp 6.7 M (5.4%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart of Accounts (COA) Summary Cards */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  Struktur Chart of Accounts (COA) & Kategori Pembukuan Utama
                </h3>
                <p className="text-[11px] text-slate-400">Klasifikasi akun standar ERP industri pertambangan nikel terintegrasi</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                TOTAL AKUN ACTIVE: 84 COA
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">COA 1000 - ASET (ASSETS)</span>
                <div className="text-slate-100 font-bold">Rp 1.240.500.000.000</div>
                <p className="text-[10px] text-slate-400">Kas Bank, Piutang Smelter, Stockpile Ore Inventory & CapEx Alat Berat.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">COA 2000 - KEWAJIBAN (LIABILITIES)</span>
                <div className="text-slate-100 font-bold">Rp 184.200.000.000</div>
                <p className="text-[10px] text-slate-400">Hutang Kontraktor, Accrual Royalti ESDM, Utang Pajak PPh/PPN & Leasing.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">COA 3000 - EKUITAS (EQUITY)</span>
                <div className="text-slate-100 font-bold">Rp 1.056.300.000.000</div>
                <p className="text-[10px] text-slate-400">Modal Disetor, Saldo Laba Ditahan (Retained Earnings) & Cadangan ESDM.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">COA 4000 - PENDAPATAN (REVENUE)</span>
                <div className="text-slate-100 font-bold">Rp 1.642.800.000.000</div>
                <p className="text-[10px] text-slate-400">Penjualan Ore Saprolite FOB, Ore Limonite CIF & Penyesuaian Final COA.</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">COA 5000 & 6000 - BEBAN (EXPENSES)</span>
                <div className="text-slate-100 font-bold">Rp 986.400.000.000</div>
                <p className="text-[10px] text-slate-400">Beban Kontraktor, Fuel Hauling, Barging, Royalti ESDM, Depresiasi & Overhead.</p>
              </div>
            </div>
          </div>

          {/* Table Jurnal Umum & General Ledger Vouchers */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Buku Jurnal Umum & Ledger Voucher Transaksi Keuangan (Agu 2026)
                </h3>
                <p className="text-[11px] text-slate-400">Verifikasi Jurnal Otomatis Berpasangan (Double-Entry Debit & Credit Audit Trail)</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari No. Voucher / COA / Ref..."
                    value={accSearch}
                    onChange={(e) => setAccSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-indigo-500 w-52"
                  />
                </div>

                <select
                  value={accCategoryFilter}
                  onChange={(e) => setAccCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="ALL">Semua Tipe Jurnal</option>
                  <option value="REVENUE_SALES">Penjualan Ore (COA 4110)</option>
                  <option value="MINING_CONTRACTOR">Jasa Kontraktor (COA 5110)</option>
                  <option value="FUEL_HAULING">BBM Solar Hauling (COA 5120)</option>
                  <option value="PNBP_ROYALTY">Royalti PNBP ESDM (COA 5130)</option>
                  <option value="DEPRESIASI_CAPEX">Depresiasi Fleets (COA 5210)</option>
                  <option value="PAYROLL_GAJI">Gaji & Remunerasi (COA 6110)</option>
                </select>
              </div>
            </div>

            {/* General Ledger Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">No. Voucher & Tanggal</th>
                    <th className="p-3">Kategori & Kode COA</th>
                    <th className="p-3">Deskripsi / Ref Transaksi</th>
                    <th className="p-3 text-right">Debit (IDR)</th>
                    <th className="p-3 text-right">Kredit (IDR)</th>
                    <th className="p-3 text-center">Status Jurnal</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'JV-SLM-2026-0801', date: '01 Agu 2026', category: 'REVENUE_SALES', coaDebet: '1130 - Piutang Smelter', coaKredit: '4110 - Pendapatan Saprolite', desc: 'Pengakuan Penjualan Ore Saprolite 55,000 WMT (Smelter IMIP)', debit: 40218750000, credit: 40218750000, status: 'POSTED', preparedBy: 'Rina Saputri (Senior Accountant)' },
                    { id: 'JV-MNG-2026-0804', date: '04 Agu 2026', category: 'MINING_CONTRACTOR', coaDebet: '5110 - Beban Jasa Kontraktor', coaKredit: '2110 - Hutang Vendor Mining', desc: 'Jurnal Progress Mining BUMA OB Removal 450,000 BCM', debit: 18450000000, credit: 18450000000, status: 'POSTED', preparedBy: 'Agus Setiawan (Cost Control)' },
                    { id: 'JV-FUL-2026-0808', date: '08 Agu 2026', category: 'FUEL_HAULING', coaDebet: '5120 - Beban Solar Hauling', coaKredit: '1420 - Persediaan BBM Site', desc: 'Pemakaian Solar B35 Industri Fleet Hauling Road 50,000L', debit: 725000000, credit: 725000000, status: 'POSTED', preparedBy: 'Budi Santoso (Logistics Accountant)' },
                    { id: 'JV-PNBP-2026-0810', date: '10 Agu 2026', category: 'PNBP_ROYALTY', coaDebet: '5130 - Beban Royalti ESDM', coaKredit: '1110 - Bank Mandiri Escrow', desc: 'Setoran PNBP Royalti e-SIMPONI Tongkang BG-MOR-09', debit: 2450000000, credit: 2450000000, status: 'POSTED', preparedBy: 'Dewi Kartika (Tax Accountant)' },
                    { id: 'JV-DEP-2026-0815', date: '15 Agu 2026', category: 'DEPRESIASI_CAPEX', coaDebet: '5210 - Depresiasi Alat Berat', coaKredit: '1290 - Akumulasi Depresiasi Fleet', desc: 'Penyusutan Garis Lurus PSAK 16 Fleet Excavator & DT Cat 777E', debit: 1250000000, credit: 1250000000, status: 'POSTED', preparedBy: 'Bambang Tri (Fixed Asset Acct)' },
                    { id: 'JV-PAY-2026-0820', date: '20 Agu 2026', category: 'PAYROLL_GAJI', coaDebet: '6110 - Beban Gaji & Bonus Site', coaKredit: '2120 - Hutang Gaji Karyawan', desc: 'Alokasi Penggajian & Insentif Produksi Operator Pit Period Agu', debit: 3850000000, credit: 3850000000, status: 'APPROVED', preparedBy: 'Siti Aminah (Payroll Officer)' }
                  ]
                  .filter(item => accCategoryFilter === 'ALL' || item.category === accCategoryFilter)
                  .filter(item => item.id.toLowerCase().includes(accSearch.toLowerCase()) || item.desc.toLowerCase().includes(accSearch.toLowerCase()) || item.coaDebet.toLowerCase().includes(accSearch.toLowerCase()))
                  .map((rec) => {
                    return (
                      <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <div className="font-mono font-bold text-indigo-400">{rec.id}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{rec.date}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-slate-100">{rec.category}</div>
                          <div className="text-[10px] text-indigo-300 font-mono">Dr: {rec.coaDebet}</div>
                          <div className="text-[10px] text-slate-400 font-mono">Cr: {rec.coaKredit}</div>
                        </td>
                        <td className="p-3 text-slate-200 font-medium max-w-xs">
                          <div>{rec.desc}</div>
                          <div className="text-[10px] text-slate-500">Prepared by: {rec.preparedBy}</div>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-400">
                          {formatIDR(rec.debit)}
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-indigo-300">
                          {formatIDR(rec.credit)}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            ✓ {rec.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedAccVoucher(rec)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <BookOpen className="w-3.5 h-3.5" />
                            Ledger Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Detail Voucher Jurnal Ledger */}
          {selectedAccVoucher && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-400">GENERAL LEDGER JOURNAL VOUCHER</span>
                      <h3 className="text-base font-bold text-white">{selectedAccVoucher.id}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedAccVoucher(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Tanggal Posting:</span>
                    <strong className="text-slate-100">{selectedAccVoucher.date}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Status Audit:</span>
                    <strong className="text-emerald-400">✓ POSTED & VERIFIED</strong>
                  </div>
                  <div className="col-span-2 font-sans">
                    <span className="text-[10px] text-slate-400 block">Keterangan Transaksi:</span>
                    <span className="text-slate-200 font-medium">{selectedAccVoucher.desc}</span>
                  </div>
                </div>

                {/* Double Entry Ledger Table */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">RINCIAN JURNAL BERPASANGAN (DOUBLE ENTRY):</span>
                  <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                    <table className="w-full text-left">
                      <thead className="bg-slate-950 text-slate-400 text-[10px] font-bold uppercase">
                        <tr>
                          <th className="p-2.5">Kode COA & Akun</th>
                          <th className="p-2.5 text-right">Debit (IDR)</th>
                          <th className="p-2.5 text-right">Kredit (IDR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80 bg-slate-900 font-mono">
                        <tr>
                          <td className="p-2.5 text-emerald-300 font-bold">
                            [DEBIT] {selectedAccVoucher.coaDebet}
                          </td>
                          <td className="p-2.5 text-right text-emerald-400 font-bold">
                            {formatIDR(selectedAccVoucher.debit)}
                          </td>
                          <td className="p-2.5 text-right text-slate-500">Rp 0</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-indigo-300 font-bold">
                            [KREDIT] {selectedAccVoucher.coaKredit}
                          </td>
                          <td className="p-2.5 text-right text-slate-500">Rp 0</td>
                          <td className="p-2.5 text-right text-indigo-300 font-bold">
                            {formatIDR(selectedAccVoucher.credit)}
                          </td>
                        </tr>
                        <tr className="bg-slate-950 font-bold text-white border-t border-slate-700">
                          <td className="p-2.5">TOTAL DEBET / KREDIT (BALANCED)</td>
                          <td className="p-2.5 text-right text-emerald-400">{formatIDR(selectedAccVoucher.debit)}</td>
                          <td className="p-2.5 text-right text-indigo-400">{formatIDR(selectedAccVoucher.credit)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Penyusun Jurnal (Prepared By):</span>
                    <strong className="text-slate-200">{selectedAccVoucher.preparedBy}</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Auditor SHA-256 Hash Tag:</span>
                    <strong className="text-indigo-400">a8f9c2d7e1029384758b9c1d</strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedAccVoucher(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Cetak Jurnal Voucher PDF ${selectedAccVoucher.id} berhasil!`)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Cetak Voucher PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Trial Balance Summary */}
          {showTrialBalanceModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-3xl w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Neraca Saldo (Trial Balance) Konsolidasi Periode Agu 2026</h3>
                  </div>
                  <button onClick={() => setShowTrialBalanceModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold">VERIFIKASI KESEIMBANGAN DEBET & KREDIT:</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold">
                    ✓ BALANCED (DIFF: RP 0.00)
                  </span>
                </div>

                <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-950 text-slate-400 text-[10px] font-bold uppercase">
                      <tr>
                        <th className="p-3">Kode Akun COA</th>
                        <th className="p-3">Nama Akun Akuntansi</th>
                        <th className="p-3 text-right">Saldo Debet (IDR)</th>
                        <th className="p-3 text-right">Saldo Kredit (IDR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-900 font-mono">
                      {[
                        { code: '1110', name: 'Kas & Bank Operasional Mandiri', debit: 428500000000, credit: 0 },
                        { code: '1130', name: 'Piutang Penjualan Smelter Nickel (AR)', debit: 142800000000, credit: 0 },
                        { code: '1410', name: 'Persediaan Stockpile Ore Nikel EFO', debit: 85400000000, credit: 0 },
                        { code: '1210', name: 'Aset Tetap Heavy Duty Fleet & Machinery', debit: 620000000000, credit: 0 },
                        { code: '1290', name: 'Akumulasi Depresiasi Fleet & Infrastructure', debit: 0, credit: 136200000000 },
                        { code: '2110', name: 'Hutang Vendor Kontraktor Mining (AP)', debit: 0, credit: 184500000000 },
                        { code: '2130', name: 'Accrual Royalti ESDM e-SIMPONI', debit: 0, credit: 2450000000 },
                        { code: '3110', name: 'Modal Disetor Perusahaan Holding', debit: 0, credit: 500000000000 },
                        { code: '3210', name: 'Saldo Laba Ditahan (Retained Earnings)', debit: 0, credit: 456300000000 },
                        { code: '4110', name: 'Pendapatan Penjualan Ore Saprolite', debit: 0, credit: 214500000000 },
                        { code: '5110', name: 'Beban Jasa Mining Contractor', debit: 113500000000, credit: 0 },
                        { code: '5120', name: 'Beban Bahan Bakar Solar B35 Site', debit: 46200000000, credit: 0 },
                        { code: '5130', name: 'Beban PNBP Royalti ESDM', debit: 31200000000, credit: 0 },
                        { code: '6110', name: 'Beban Gaji, Bonus & Overhead Office', debit: 12100000000, credit: 0 }
                      ].map(row => (
                        <tr key={row.code} className="hover:bg-slate-800/40">
                          <td className="p-3 text-indigo-400 font-bold">{row.code}</td>
                          <td className="p-3 text-slate-200 font-sans font-medium">{row.name}</td>
                          <td className="p-3 text-right text-emerald-400 font-bold">{row.debit > 0 ? formatIDR(row.debit) : '-'}</td>
                          <td className="p-3 text-right text-indigo-300 font-bold">{row.credit > 0 ? formatIDR(row.credit) : '-'}</td>
                        </tr>
                      ))}
                      <tr className="bg-slate-950 font-bold text-white border-t-2 border-indigo-500">
                        <td className="p-3" colSpan={2}>TOTAL NERACA SALDO (BALANCED)</td>
                        <td className="p-3 text-right text-emerald-400">Rp 1.479.700.000.000</td>
                        <td className="p-3 text-right text-indigo-400">Rp 1.479.700.000.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setShowTrialBalanceModal(false)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all"
                  >
                    Tutup Neraca Saldo
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Entry Jurnal Voucher Baru */}
          {showAccNewJournalModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Input Voucher Jurnal Umum Baru</h3>
                  </div>
                  <button onClick={() => setShowAccNewJournalModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Voucher Jurnal Umum berhasil ditambahkan dan disetor ke General Ledger!");
                  setShowAccNewJournalModal(false);
                }} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Pilih Kategori Jurnal:</label>
                    <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500">
                      <option>REVENUE_SALES - Penjualan Ore Nikel Saprolite</option>
                      <option>MINING_CONTRACTOR - Jasa Mining Contractor</option>
                      <option>FUEL_HAULING - Konsumsi Solar B35 Industri</option>
                      <option>PNBP_ROYALTY - Setoran Royalti e-SIMPONI</option>
                      <option>DEPRESIASI_CAPEX - Penyusutan Alat Berat</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Akun Debit (COA Debit):</label>
                    <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500">
                      <option>1130 - Piutang Smelter Nickel (AR)</option>
                      <option>5110 - Beban Jasa Mining Contractor</option>
                      <option>5120 - Beban Solar B35 Hauling</option>
                      <option>5130 - Beban PNBP Royalti ESDM</option>
                      <option>5210 - Beban Depresiasi Alat Berat</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Akun Kredit (COA Kredit):</label>
                    <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500">
                      <option>4110 - Pendapatan Penjualan Saprolite FOB</option>
                      <option>2110 - Hutang Vendor Contractor Mining (AP)</option>
                      <option>1420 - Persediaan BBM Solar Site</option>
                      <option>1110 - Bank Mandiri Escrow Operational</option>
                      <option>1290 - Akumulasi Depresiasi Fleet</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nominal Transaksi (IDR):</label>
                    <input type="number" defaultValue={2500000000} className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500 font-mono" />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Keterangan / Ref Kontrak:</label>
                    <textarea rows={2} defaultValue="Pengakuan Jurnal Transaksi Pembukuan Operasional Tambang" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500" />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowAccNewJournalModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Posting Jurnal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB: LEGAL, PERIZINAN & CONTRACT MANAGEMENT */}
      {activeTab === 'legal' && (
        <div className="space-y-6">
          {/* Header Banner Legal Dashboard */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-700/60 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 tracking-wider flex items-center gap-1">
                    <Gavel className="w-3.5 h-3.5 text-amber-400" />
                    LEGAL, IUP/IUPK PERMIT & CONTRACT MANAGEMENT
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    IUP OP: VALID S/D 2037
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    RKAB 2026: 2.40 MT APPROVED
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-amber-400" />
                  Dasbor Legal, Perizinan Pertambangan Nikel & Manajemen Kontrak
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Monitoring terpusat status perizinan IUP OP, persetujuan RKAB 2026 Ditjen Minerba ESDM, PPKH/IPPKH KLHK, kontrak penjualan ore (Offtake Smelter), kontrak jasa kontraktor pertambangan, dan pembebasan lahan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowPermitAuditModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <FileCheck2 className="w-4 h-4 text-amber-400" />
                  Audit Perizinan ESDM
                </button>

                <button
                  onClick={() => setShowNewContractModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-amber-950/50"
                >
                  <Plus className="w-4 h-4" />
                  Registrasi Kontrak Legal
                </button>
              </div>
            </div>
          </div>

          {/* Top Key Legal KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">IUP OP (Izin Usaha Tambang)</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Gavel className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-300 font-mono">
                Valid s/d 2037
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">✓ SK ESDM 540/102</span>
                <span className="text-slate-500 font-mono">2.450 Ha Morowali</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Status RKAB 2026 ESDM</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <CheckSquare className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                2.400.000 MT
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">✓ Approved ESDM</span>
                <span className="text-slate-500 font-mono">Realisasi 58.2%</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">PPKH KLHK (Kawasan Hutan)</span>
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Trees className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-teal-300 font-mono">
                1.200 Ha Active
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-teal-400 font-bold">✓ SK MenLHK 892</span>
                <span className="text-slate-500 font-mono">Hutan Produksi</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Kontrak Legal Aktif</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-blue-300 font-mono">
                48 Kontrak
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-blue-400 font-bold">12 Offtake Smelter</span>
                <span className="text-slate-500 font-mono">8 Contractor</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Legal Compliance Score</span>
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-purple-300 font-mono">
                98.5%
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-purple-400 font-bold">0 Major Dispute</span>
                <span className="text-slate-500 font-mono">Audited ESDM</span>
              </div>
            </div>
          </div>

          {/* Interactive Legal Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* License Expiration Radar & Lead Time Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-amber-400" />
                    Status Lead Time & Masa Berlaku Perizinan Utama Pertambangan
                  </h3>
                  <p className="text-[11px] text-slate-400">Monitoring Sisa Masa Berlaku Dokumen Perizinan Pemerintah (Dalam Bulan)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  ALL PERMITS IN COMPLIANCE
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { name: 'IUP OP Mining', leadMonths: 136, minRequired: 12, compliance: 100 },
                    { name: 'PPKH KLHK', leadMonths: 108, minRequired: 12, compliance: 100 },
                    { name: 'RKAB ESDM 2026', leadMonths: 5, minRequired: 3, compliance: 98 },
                    { name: 'Eksportir Terdaftar (ET)', leadMonths: 24, minRequired: 6, compliance: 100 },
                    { name: 'Izin Jetty Tersus', leadMonths: 36, minRequired: 6, compliance: 96 },
                    { name: 'KTT Certification', leadMonths: 18, minRequired: 3, compliance: 100 },
                    { name: 'Sertifikat C&C ESDM', leadMonths: 120, minRequired: 12, compliance: 100 }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} unit=" Bln" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} tickLine={false} unit="%" domain={[80, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any, name: any) => [
                        name === 'leadMonths' ? `${val} Bulan Sisa` : `${val}%`,
                        name === 'leadMonths' ? 'Masa Berlaku Sisa' : 'Skor Kepatuhan Legal'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="leadMonths" name="leadMonths" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="compliance" name="compliance" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Contract Value Breakdown Donut Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-amber-400" />
                  Distribusi Portofolio Kontrak Legal
                </h3>
                <p className="text-[11px] text-slate-400">Komposisi Nilai Komitmen Kontrak Berdasarkan Kategori</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Offtake Smelter Sales', value: 1640, fill: '#f59e0b' },
                        { name: 'Kontraktor Mining BUMA', value: 540, fill: '#6366f1' },
                        { name: 'Pembebasan Lahan Pit', value: 180, fill: '#10b981' },
                        { name: 'Sewa Fleet & Tugboat', value: 160, fill: '#3b82f6' },
                        { name: 'Kemitraan ESG & Desa', value: 100, fill: '#ec4899' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {[ '#f59e0b', '#6366f1', '#10b981', '#3b82f6', '#ec4899' ].map((color, index) => (
                        <Cell key={`legal-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`Rp ${val} Miliar`, 'Nilai Komitmen']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Offtake Smelter</span>
                  <span className="font-mono font-bold text-amber-400">Rp 1,64 T (62.6%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Mining Contractor</span>
                  <span className="font-mono font-bold text-indigo-400">Rp 540 M (20.6%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Pembebasan Lahan</span>
                  <span className="font-mono font-bold text-emerald-400">Rp 180 M (6.9%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Fleet Lease & Barging</span>
                  <span className="font-mono font-bold text-blue-400">Rp 160 M (6.1%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Legal Documents & Contracts Registry */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  Register Dokumen Perizinan & Kontrak Kerja Sama Pertambangan
                </h3>
                <p className="text-[11px] text-slate-400">Arsip Digital Kontrak, Masa Berlaku, Klausul Hukum & Status Audit Kepatuhan</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari No. Dokumen / Pihak / Judul..."
                    value={legalSearch}
                    onChange={(e) => setLegalSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-amber-500 w-56"
                  />
                </div>

                <select
                  value={legalCategoryFilter}
                  onChange={(e) => setLegalCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500"
                >
                  <option value="ALL">Semua Kategori</option>
                  <option value="PERIZINAN_ESDM">IUP & Perizinan ESDM</option>
                  <option value="OFFTAKE_SMELTER">Kontrak Offtake Smelter</option>
                  <option value="KONTRAKTOR_MINING">Jasa Mining Contractor</option>
                  <option value="PEMBEBASAN_LAHAN">Pelepasan Hak Lahan</option>
                  <option value="ESG_AMDAL">Lingkungan AMDAL & ESG</option>
                </select>
              </div>
            </div>

            {/* Legal Documents Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">No. Register & Tanggal</th>
                    <th className="p-3">Judul Dokumen / Kontrak</th>
                    <th className="p-3">Pihak Terkait (Counterparty)</th>
                    <th className="p-3 text-right">Nilai / Kuota Kontrak</th>
                    <th className="p-3 text-center">Masa Berlaku / Expiry</th>
                    <th className="p-3 text-center">Status Risk & Audit</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'LEG-IUP-2022-001', date: '12 Des 2022', category: 'PERIZINAN_ESDM', title: 'SK IUP OP Operasi Produksi Nikel No. 540/102/2022', party: 'Kementerian ESDM RI Ditjen Minerba', valueStr: '2.450 Ha Konsesi', expiry: '12 Des 2037', risk: 'LOW_RISK', status: 'VERIFIED', signatories: 'Menteri ESDM & Direktur Utama' },
                    { id: 'LEG-RKAB-2026-008', date: '15 Jan 2026', category: 'PERIZINAN_ESDM', title: 'Persetujuan RKAB 2026 Kuota Production 2,40 MT', party: 'Ditjen Minerba ESDM RI', valueStr: '2.400.000 MT Ore', expiry: '31 Des 2026', risk: 'LOW_RISK', status: 'VERIFIED', signatories: 'Direktur Pembinaan Minerba' },
                    { id: 'LEG-PPKH-2021-042', date: '04 Jun 2021', category: 'PERIZINAN_ESDM', title: 'SK PPKH Izin Pinjam Pakai Kawasan Hutan No. SK.892/2021', party: 'Kementerian LHK RI (MenLHK)', valueStr: '1.200 Ha Hutan', expiry: '04 Jun 2035', risk: 'LOW_RISK', status: 'VERIFIED', signatories: 'Menteri LHK RI' },
                    { id: 'LEG-OFF-2026-012', date: '10 Feb 2026', category: 'OFFTAKE_SMELTER', title: 'Perjanjian Jual Beli Ore Saprolite Ni 1.8% FOB Jetty', party: 'PT Smelter Nickel Indonesia (IMIP)', valueStr: '$54.000.000 USD', expiry: '31 Des 2027', risk: 'LOW_RISK', status: 'ACTIVE', signatories: 'Direktur Marketing & CEO Smelter' },
                    { id: 'LEG-CON-2025-003', date: '01 Nov 2025', category: 'KONTRAKTOR_MINING', title: 'Kontrak Jasa Overburden Removal & Ore Mining Fleet', party: 'PT Bukit Makmur Mandiri Utama (BUMA)', valueStr: 'Rp 540.000.000.000', expiry: '01 Nov 2028', risk: 'MEDIUM_RISK', status: 'ACTIVE', signatories: 'VP Operations & Dir BUMA' },
                    { id: 'LEG-LND-2026-019', date: '20 Mei 2026', category: 'PEMBEBASAN_LAHAN', title: 'Akta Pelepasan Hak Lahan Masyarakat Pit Block B', party: 'Masyarakat Adat & Kepala Desa Lokasi', valueStr: 'Rp 180.000.000.000', expiry: 'Permanen', risk: 'LOW_RISK', status: 'VERIFIED', signatories: 'Notaris & BPN Morowali' }
                  ]
                  .filter(item => legalCategoryFilter === 'ALL' || item.category === legalCategoryFilter)
                  .filter(item => item.id.toLowerCase().includes(legalSearch.toLowerCase()) || item.title.toLowerCase().includes(legalSearch.toLowerCase()) || item.party.toLowerCase().includes(legalSearch.toLowerCase()))
                  .map((rec) => {
                    return (
                      <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <div className="font-mono font-bold text-amber-400">{rec.id}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{rec.date}</div>
                        </td>
                        <td className="p-3 max-w-xs">
                          <div className="font-bold text-slate-100 leading-snug">{rec.title}</div>
                          <span className="text-[10px] text-amber-300/80 font-mono">Cat: {rec.category}</span>
                        </td>
                        <td className="p-3 text-slate-200 font-medium">
                          <div>{rec.party}</div>
                          <div className="text-[10px] text-slate-500">Signees: {rec.signatories}</div>
                        </td>
                        <td className="p-3 text-right font-mono font-bold text-emerald-400">
                          {rec.valueStr}
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-indigo-300">
                          {rec.expiry}
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            ✓ {rec.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedLegalDoc(rec)}
                            className="px-2.5 py-1 rounded-lg bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <Gavel className="w-3.5 h-3.5" />
                            Detail Legal
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Detail Dokumen Legal */}
          {selectedLegalDoc && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                      <Gavel className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-400">LEGAL CONTRACT VOUCHER & AUDIT TRAIL</span>
                      <h3 className="text-base font-bold text-white">{selectedLegalDoc.id}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedLegalDoc(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Tanggal Kontrak:</span>
                    <strong className="text-slate-100">{selectedLegalDoc.date}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Masa Berlaku:</span>
                    <strong className="text-emerald-400">{selectedLegalDoc.expiry}</strong>
                  </div>
                  <div className="col-span-2 font-sans">
                    <span className="text-[10px] text-slate-400 block">Judul Legal:</span>
                    <span className="text-slate-100 font-bold">{selectedLegalDoc.title}</span>
                  </div>
                  <div className="col-span-2 font-sans">
                    <span className="text-[10px] text-slate-400 block">Pihak Berkomitmen:</span>
                    <span className="text-amber-300 font-medium">{selectedLegalDoc.party}</span>
                  </div>
                </div>

                {/* Key Legal Clauses & Spec */}
                <div className="space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">RINCIAN KLAUSUL HUKUM & SYARAT UTAMA:</span>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Nilai Komitmen:</span>
                      <strong className="text-emerald-400 font-mono">{selectedLegalDoc.valueStr}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Jurisdiksi Hukum:</span>
                      <strong className="text-slate-200">Pengadilan Negeri Jakarta Selatan / BANI</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Force Majeure Clause:</span>
                      <strong className="text-amber-400">Bencana Alam, Kebijakan ESDM, Cuaca Ekstrem</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Persetujuan Penandatangan:</span>
                      <strong className="text-slate-200">{selectedLegalDoc.signatories}</strong>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Status Verifikasi Notaris/Kemenkumham:</span>
                    <strong className="text-emerald-400">✓ SAH & TERDAFTAR (C&C)</strong>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>SHA-256 Digital Signature:</span>
                    <strong className="text-amber-400">e912f710a48b92c10488f21e</strong>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedLegalDoc(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Salinan PDF ${selectedLegalDoc.id} berhasil diunduh!`)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Unduh Akta PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Audit Perizinan ESDM & KLHK */}
          {showPermitAuditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-2xl w-full p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">Matriks Audit Kepatuhan Perizinan Pertambangan ESDM & KLHK</h3>
                  </div>
                  <button onClick={() => setShowPermitAuditModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold">STATUS LEGAL COMPLIANCE GLOBAL:</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold">
                    ✓ 100% AUDIT COMPLIANT (CLEAN & CLEAR)
                  </span>
                </div>

                <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-950 text-slate-400 text-[10px] font-bold uppercase">
                      <tr>
                        <th className="p-3">Nama Perizinan / Dokumen</th>
                        <th className="p-3">Instansi Penerbit</th>
                        <th className="p-3">Masa Berlaku</th>
                        <th className="p-3 text-center">Status Audit</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-900 font-mono">
                      {[
                        { permit: 'IUP OP (Izin Usaha Pertambangan Operasi Produksi)', agency: 'Kementerian ESDM RI', validity: '12 Des 2037', status: 'COMPLIANT' },
                        { permit: 'RKAB 2026 Kuota 2.40 MT', agency: 'Ditjen Minerba ESDM', validity: '31 Des 2026', status: 'COMPLIANT' },
                        { permit: 'PPKH (Persetujuan Penggunaan Kawasan Hutan)', agency: 'Kementerian LHK RI', validity: '04 Jun 2035', status: 'COMPLIANT' },
                        { permit: 'Keputusan Sertifikat Clean & Clear (C&C)', agency: 'Ditjen Minerba ESDM', validity: 'Permanen', status: 'COMPLIANT' },
                        { permit: 'Sertifikat KTT (Kepala Teknik Tambang)', agency: 'Kementerian ESDM RI', validity: '18 Mei 2028', status: 'COMPLIANT' },
                        { permit: 'AMDAL & UKL-UPL Lingkungan Hidup', agency: 'Dinas LHK Prov Sulawesi Tengah', validity: 'Permanen', status: 'COMPLIANT' },
                        { permit: 'Eksportir Terdaftar (ET Nikel) Kementerian Perdagangan', agency: 'Kementerian Perdagangan RI', validity: '22 Agu 2028', status: 'COMPLIANT' },
                        { permit: 'Izin Tersus Jetty Port Transshipment', agency: 'Kementerian Perhubungan RI', validity: '10 Nov 2029', status: 'COMPLIANT' }
                      ].map(row => (
                        <tr key={row.permit} className="hover:bg-slate-800/40">
                          <td className="p-3 text-amber-300 font-bold font-sans">{row.permit}</td>
                          <td className="p-3 text-slate-300 font-sans">{row.agency}</td>
                          <td className="p-3 text-slate-200">{row.validity}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              ✓ {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setShowPermitAuditModal(false)}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold transition-all"
                  >
                    Tutup Hasil Audit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Registrasi Kontrak Legal Baru */}
          {showNewContractModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">Registrasi Kontrak Legal Pertambangan Baru</h3>
                  </div>
                  <button onClick={() => setShowNewContractModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Kontrak legal baru berhasil didaftarkan ke Database Registry Legal Pertambangan!");
                  setShowNewContractModal(false);
                }} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kategori Kontrak / Dokumen:</label>
                    <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-amber-500">
                      <option>OFFTAKE_SMELTER - Perjanjian Jual Beli Ore Saprolite / Limonite</option>
                      <option>KONTRAKTOR_MINING - Jasa Overburden & Heavy Fleet Mining</option>
                      <option>PERIZINAN_ESDM - SK Perizinan / RKAB ESDM / PPKH KLHK</option>
                      <option>PEMBEBASAN_LAHAN - Akta Pelepasan Hak Lahan Masyarakat</option>
                      <option>ESG_AMDAL - Kemitraan Lingkungan & CSR Masyarakat</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Judul Dokumen / Perjanjian:</label>
                    <input type="text" defaultValue="Perjanjian Pasokan Ore Saprolite Ni 1.7% FOB Jetty Morowali" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-amber-500" />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nama Pihak Terkait (Counterparty):</label>
                    <input type="text" defaultValue="PT Huadi Nickel Alloy Indonesia" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-amber-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nilai / Kuota Kontrak:</label>
                      <input type="text" defaultValue="$32.000.000 USD" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-amber-500 font-mono" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Tanggal Jatuh Tempo (Expiry):</label>
                      <input type="text" defaultValue="31 Des 2027" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-amber-500 font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Catatan Klausul / Keterangan Legal:</label>
                    <textarea rows={2} defaultValue="Ketentuan penyesuaian harga berdasarkan HPM ESDM bulanan, spesifikasi Moisture Content Max 35%." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-amber-500" />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowNewContractModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Simpan Kontrak Legal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB: COMMUNITY DEVELOPMENT, CSR & PPM TAMBANG */}
      {activeTab === 'comdev' && (
        <div className="space-y-6">
          {/* Header Banner Community Development */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-950 to-teal-950 border border-emerald-700/50 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wider flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
                    COMMUNITY DEVELOPMENT & PPM 8 PILAR ESDM
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    REALISASI 2026: Rp 15,57 M / Rp 18,50 M
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    12 DESA LINGKAR TAMBANG
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <HeartHandshake className="w-6 h-6 text-emerald-400" />
                  Dasbor Community Development (ComDev), CSR & Program PPM Tambang
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pemantauan terpadu pelaksanaan 8 Pilar Program Pengembangan dan Pemberdayaan Masyarakat (PPM) Kepmen ESDM No. 1824 K/30/MEM/2018, penyaluran CSR desa lingkar tambang (Ring 1-3 Morowali), beasiswa vokasi, fasilitas kesehatan, serta kemandirian BUMDes & UMKM lokal.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowPpmReportModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 border border-teal-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <FileCheck2 className="w-4 h-4 text-teal-400" />
                  Pelaporan e-PPM ESDM
                </button>

                <button
                  onClick={() => setShowNewComdevProgramModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Program ComDev Baru
                </button>
              </div>
            </div>
          </div>

          {/* Top Key ComDev KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Anggaran PPM 2026</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                Rp 18,50 M
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">✓ Realisasi 84,2% (Rp 15,57M)</span>
                <span className="text-slate-500 font-mono">Kepmen ESDM</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Penerima Manfaat</span>
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-blue-300 font-mono">
                24.850 Jiwa
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-blue-400 font-bold">12 Desa Ring 1-3 Morowali</span>
                <span className="text-slate-500 font-mono">+18% YoY</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Pendidikan & Beasiswa</span>
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-purple-300 font-mono">
                420 Siswa / Mhs
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-purple-400 font-bold">Beasiswa Vokasi Nikel</span>
                <span className="text-slate-500 font-mono">Rp 3,2 M</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Kemandirian UMKM & BUMDes</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Home className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-300 font-mono">
                38 Kelompok
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-amber-400 font-bold">Mitra Supply Catering</span>
                <span className="text-slate-500 font-mono">Rp 4,1 M</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Social License Index (SLI)</span>
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-teal-300 font-mono">
                99,1 / 100
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-teal-400 font-bold">0 Dispute / Zero Blockade</span>
                <span className="text-slate-500 font-mono">Sangat Harmonis</span>
              </div>
            </div>
          </div>

          {/* Interactive ComDev Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 8 Pilar ESDM Budget Realization Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    Realisasi Anggaran PPM 8 Pilar Kepmen ESDM No. 1824 K/30/MEM/2018
                  </h3>
                  <p className="text-[11px] text-slate-400">Target vs Realisasi Pengeluaran per Pilar Utama Pertambangan (Dalam Miliar Rp)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  ESDM COMPLIANT
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { pilar: '1. Pendidikan', target: 3.5, realized: 3.2, percentage: 91.4 },
                    { pilar: '2. Kesehatan', target: 2.8, realized: 2.5, percentage: 89.2 },
                    { pilar: '3. Pendapatan', target: 2.2, realized: 1.9, percentage: 86.3 },
                    { pilar: '4. Ekonomi BUMDes', target: 3.0, realized: 2.7, percentage: 90.0 },
                    { pilar: '5. Sosial Budaya', target: 1.8, realized: 1.4, percentage: 77.7 },
                    { pilar: '6. Lingkungan', target: 2.0, realized: 1.7, percentage: 85.0 },
                    { pilar: '7. Kelembagaan', target: 1.2, realized: 0.97, percentage: 80.8 },
                    { pilar: '8. Infrastruktur', target: 2.0, realized: 1.2, percentage: 60.0 }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="pilar" stroke="#64748b" fontSize={9} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} unit=" M" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} tickLine={false} unit="%" domain={[50, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any, name: any) => [
                        name === 'percentage' ? `${val}%` : `Rp ${val} Miliar`,
                        name === 'target' ? 'Target Pagu ESDM' : name === 'realized' ? 'Realisasi Penyaluran' : 'Capaian Target (%)'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="target" name="target" fill="#334155" radius={[4, 4, 0, 0]} />
                    <Bar yAxisId="left" dataKey="realized" name="realized" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="percentage" name="percentage" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Zone Distribution Donut Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <PieChart className="w-4 h-4 text-emerald-400" />
                  Sebaran Program PPM Berdasarkan Zona Ring Desa
                </h3>
                <p className="text-[11px] text-slate-400">Alokasi Anggaran Berdasarkan Jarak Dampak Lingkar Tambang</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Ring 1 (Desa Terdekat Pit & Port)', value: 11.47, fill: '#10b981' },
                        { name: 'Ring 2 (Kecamatan Bahodopi & Petasia)', value: 4.44, fill: '#3b82f6' },
                        { name: 'Ring 3 (Kabupaten Morowali & Prov)', value: 2.59, fill: '#f59e0b' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {[ '#10b981', '#3b82f6', '#f59e0b' ].map((color, index) => (
                        <Cell key={`comdev-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`Rp ${val} Miliar`, 'Alokasi Dana']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Ring 1 (Pit & Jetty)</span>
                  <span className="font-mono font-bold text-emerald-400">Rp 11,47 M (62.0%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Ring 2 (Kecamatan)</span>
                  <span className="font-mono font-bold text-blue-400">Rp 4,44 M (24.0%)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Ring 3 (Kabupaten)</span>
                  <span className="font-mono font-bold text-amber-400">Rp 2,59 M (14.0%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Register Program PPM & CSR */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Register Program Pemberdayaan Masyarakat (PPM) & CSR Lingkar Tambang
                </h3>
                <p className="text-[11px] text-slate-400">Monitoring Pelaksanaan, Anggaran, Penerima Manfaat, & Lokasi Desa Sasaran</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari Program / Desa / Kode..."
                    value={comdevSearch}
                    onChange={(e) => setComdevSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500 w-56"
                  />
                </div>

                <select
                  value={comdevPillarFilter}
                  onChange={(e) => setComdevPillarFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">Semua Pilar ESDM</option>
                  <option value="PENDIDIKAN">Pilar 1: Pendidikan</option>
                  <option value="KESEHATAN">Pilar 2: Kesehatan</option>
                  <option value="EKONOMI">Pilar 3 & 4: Kemandirian Ekonomi</option>
                  <option value="INFRASTRUKTUR">Pilar 8: Infrastruktur Desa</option>
                  <option value="LINGKUNGAN">Pilar 6: Lingkungan Hidup</option>
                </select>

                <select
                  value={comdevRingFilter}
                  onChange={(e) => setComdevRingFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">Semua Zona Ring</option>
                  <option value="RING_1">Ring 1 (Desa Terdekat)</option>
                  <option value="RING_2">Ring 2 (Kecamatan)</option>
                  <option value="RING_3">Ring 3 (Kabupaten)</option>
                </select>
              </div>
            </div>

            {/* ComDev Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">Kode & Tanggal</th>
                    <th className="p-3">Nama Program PPM / CSR</th>
                    <th className="p-3">Lokasi Desa & Zona Ring</th>
                    <th className="p-3 text-right">Anggaran / Realisasi</th>
                    <th className="p-3 text-center">Penerima Manfaat</th>
                    <th className="p-3 text-center">Status Pelaksanaan</th>
                    <th className="p-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'PPM-2026-EDU-01', date: '08 Jan 2026', pillar: 'PENDIDIKAN', title: 'Beasiswa Vokasi Nikel & Operator Alat Berat Morowali', village: 'Desa Dampala & Kurisa', ring: 'RING_1', budgetStr: 'Rp 1.200.000.000', realizedStr: 'Rp 1.050.000.000 (87.5%)', beneficiaries: '85 Siswa & Mahasiswa', status: 'RUNNING', pic: 'Tim CSR & Politeknik Industri Atro' },
                    { id: 'PPM-2026-HLT-02', date: '14 Feb 2026', pillar: 'KESEHATAN', title: 'Program Mobil Ambulance & Posyandu Keliling Nikel Sehat', village: 'Desa Fatufia & Lele', ring: 'RING_1', budgetStr: 'Rp 950.000.000', realizedStr: 'Rp 880.000.000 (92.6%)', beneficiaries: '3.420 Warga Desa', status: 'RUNNING', pic: 'Tim HSE-ComDev & Puskesmas Bahodopi' },
                    { id: 'PPM-2026-ECO-03', date: '01 Mar 2026', pillar: 'EKONOMI', title: 'Pemberdayaan BUMDes Pemasok Catering & Sayur Organik', village: 'Desa Bahomakmur', ring: 'RING_1', budgetStr: 'Rp 1.800.000.000', realizedStr: 'Rp 1.620.000.000 (90.0%)', beneficiaries: '14 Kelompok Tani & BUMDes', status: 'RUNNING', pic: 'BUMDes Karya Mandiri' },
                    { id: 'PPM-2026-INF-04', date: '10 Apr 2026', pillar: 'INFRASTRUKTUR', title: 'Pembangunan Sarana Air Bersih (PAMSIMAS) & Solar Cell Desa', village: 'Desa Siumbatu', ring: 'RING_1', budgetStr: 'Rp 850.000.000', realizedStr: 'Rp 850.000.000 (100%)', beneficiaries: '1.250 KK Warga', status: 'COMPLETED', pic: 'Dinas PU & Tim Engineer Tambang' },
                    { id: 'PPM-2026-ENV-05', date: '22 Mei 2026', pillar: 'LINGKUNGAN', title: 'Program Mangrove Conservation & Terumbu Karang Teluk Tolo', village: 'Pesisir Pantai Bahodopi', ring: 'RING_2', budgetStr: 'Rp 650.000.000', realizedStr: 'Rp 580.000.000 (89.2%)', beneficiaries: '18 Kelompok Nelayan', status: 'RUNNING', pic: 'Dinas LHK & Komunitas Nelayan' },
                    { id: 'PPM-2026-SOC-06', date: '15 Jun 2026', pillar: 'SOSIAL_BUDAYA', title: 'Revitalisasi Rumah Adat & Sanggar Seni Tradisional Morowali', village: 'Kecamatan Petasia', ring: 'RING_3', budgetStr: 'Rp 450.000.000', realizedStr: 'Rp 420.000.000 (93.3%)', beneficiaries: '12 Sanggar Budaya', status: 'COMPLETED', pic: 'Dinas Kebudayaan Morowali' }
                  ]
                  .filter(item => comdevPillarFilter === 'ALL' || item.pillar === comdevPillarFilter)
                  .filter(item => comdevRingFilter === 'ALL' || item.ring === comdevRingFilter)
                  .filter(item => item.id.toLowerCase().includes(comdevSearch.toLowerCase()) || item.title.toLowerCase().includes(comdevSearch.toLowerCase()) || item.village.toLowerCase().includes(comdevSearch.toLowerCase()))
                  .map((rec) => {
                    return (
                      <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3">
                          <div className="font-mono font-bold text-emerald-400">{rec.id}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{rec.date}</div>
                        </td>
                        <td className="p-3 max-w-xs">
                          <div className="font-bold text-slate-100 leading-snug">{rec.title}</div>
                          <span className="text-[10px] text-emerald-300/80 font-mono">Pilar: {rec.pillar}</span>
                        </td>
                        <td className="p-3 text-slate-200 font-medium">
                          <div>{rec.village}</div>
                          <span className="text-[10px] font-mono font-bold text-blue-400">{rec.ring}</span>
                        </td>
                        <td className="p-3 text-right font-mono">
                          <div className="font-bold text-emerald-400">{rec.budgetStr}</div>
                          <div className="text-[10px] text-slate-400">{rec.realizedStr}</div>
                        </td>
                        <td className="p-3 text-center font-mono font-bold text-purple-300">
                          {rec.beneficiaries}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                            rec.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          }`}>
                            ✓ {rec.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => setSelectedComdevProgram(rec)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                          >
                            <HeartHandshake className="w-3.5 h-3.5" />
                            Detail Program
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Detail Program ComDev */}
          {selectedComdevProgram && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-xl w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <HeartHandshake className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider text-emerald-400">DETAIL DOKUMEN PPM & CSR COMPLIANCE</span>
                      <h3 className="text-base font-bold text-white">{selectedComdevProgram.id}</h3>
                    </div>
                  </div>
                  <button onClick={() => setSelectedComdevProgram(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Tanggal Launching:</span>
                    <strong className="text-slate-100">{selectedComdevProgram.date}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Kategori Pilar:</span>
                    <strong className="text-emerald-400">{selectedComdevProgram.pillar}</strong>
                  </div>
                  <div className="col-span-2 font-sans">
                    <span className="text-[10px] text-slate-400 block">Nama Program PPM:</span>
                    <span className="text-slate-100 font-bold">{selectedComdevProgram.title}</span>
                  </div>
                  <div className="col-span-2 font-sans">
                    <span className="text-[10px] text-slate-400 block">Lokasi & PIC Lapangan:</span>
                    <span className="text-emerald-300 font-medium">{selectedComdevProgram.village} ({selectedComdevProgram.ring}) - PIC: {selectedComdevProgram.pic}</span>
                  </div>
                </div>

                {/* Key Program Metrics */}
                <div className="space-y-2 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">REALISASI ANGGARAN & CAPAIAN MANFAAT:</span>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Total Pagu Budget PPM:</span>
                      <strong className="text-slate-200 font-mono">{selectedComdevProgram.budgetStr}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Realisasi Dana Tersalurkan:</span>
                      <strong className="text-emerald-400 font-mono">{selectedComdevProgram.realizedStr}</strong>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-1">
                      <span className="text-slate-400">Jumlah Penerima Manfaat:</span>
                      <strong className="text-purple-300 font-mono">{selectedComdevProgram.beneficiaries}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status Verifikasi Inspektur ESDM:</span>
                      <strong className="text-emerald-400">✓ VERIFIED IN E-PPM DITJEN MINERBA</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedComdevProgram(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Laporan pertanggungjawaban PPM ${selectedComdevProgram.id} berhasil diunduh!`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Unduh Laporan LPJ PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Audit Pelaporan e-PPM ESDM */}
          {showPpmReportModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-2xl w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Matriks Audit Kepatuhan Pelaporan e-PPM Ditjen Minerba ESDM</h3>
                  </div>
                  <button onClick={() => setShowPpmReportModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-300 font-bold">STATUS AUDIT E-PPM MINERBA:</span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg font-bold">
                    ✓ APPROVED TW I & II (100% COMPLIANT)
                  </span>
                </div>

                <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-950 text-slate-400 text-[10px] font-bold uppercase">
                      <tr>
                        <th className="p-3">Periode Pelaporan</th>
                        <th className="p-3">Target Realisasi</th>
                        <th className="p-3">Tanggal Submit ESDM</th>
                        <th className="p-3 text-center">Status Verifikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 bg-slate-900 font-mono">
                      {[
                        { period: 'Laporan RKAB PPM Triwulan I 2026', budget: 'Rp 4.500.000.000', date: '10 Apr 2026', status: 'VERIFIED ESDM' },
                        { period: 'Laporan RKAB PPM Triwulan II 2026', budget: 'Rp 5.200.000.000', date: '12 Jul 2026', status: 'VERIFIED ESDM' },
                        { period: 'Laporan Rencana PPM Triwulan III 2026', budget: 'Rp 4.800.000.000', date: 'Schedule 10 Okt 2026', status: 'DRAFT ON-TRACK' },
                        { period: 'Audit Evaluasi Indeks Kepuasan Masyarakat', budget: 'SLI Score 99.1', date: '01 Jun 2026', status: 'AUDITED INDEPENDENT' }
                      ].map(row => (
                        <tr key={row.period} className="hover:bg-slate-800/40">
                          <td className="p-3 text-emerald-300 font-bold font-sans">{row.period}</td>
                          <td className="p-3 text-slate-200">{row.budget}</td>
                          <td className="p-3 text-slate-400">{row.date}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              ✓ {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => setShowPpmReportModal(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all"
                  >
                    Tutup Matriks Audit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Registrasi Program PPM / CSR Baru */}
          {showNewComdevProgramModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Registrasi Program PPM & CSR Tambang Baru</h3>
                  </div>
                  <button onClick={() => setShowNewComdevProgramModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Program ComDev / PPM baru berhasil ditambahkan ke Database Registry PPM!");
                  setShowNewComdevProgramModal(false);
                }} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kategori Pilar ESDM (Kepmen 1824):</label>
                    <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500">
                      <option>Pilar 1: Pendidikan (Beasiswa & Sarana Sekolah)</option>
                      <option>Pilar 2: Kesehatan (Puskesmas Keliling & Gizi)</option>
                      <option>Pilar 3: Tingkat Pendapatan Riil / Pekerjaan</option>
                      <option>Pilar 4: Kemandirian Ekonomi (BUMDes & UMKM)</option>
                      <option>Pilar 5: Sosial Budaya & Keagamaan</option>
                      <option>Pilar 6: Lingkungan Hidup & Keanekaragaman</option>
                      <option>Pilar 7: Kelembagaan Komunitas Masyarakat</option>
                      <option>Pilar 8: Pembangunan Infrastruktur Desa</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nama Program PPM / CSR:</label>
                    <input type="text" defaultValue="Pelatihan Keterampilan Mandiri Las & Mekanik untuk Pemuda Desa" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Lokasi Desa Sasaran:</label>
                      <input type="text" defaultValue="Desa Dampala" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Zona Ring:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500">
                        <option>RING_1 (Terdekat Pit & Jetty)</option>
                        <option>RING_2 (Kecamatan)</option>
                        <option>RING_3 (Kabupaten)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Target Anggaran (Rp):</label>
                      <input type="text" defaultValue="Rp 500.000.000" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500 font-mono" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Target Penerima Manfaat:</label>
                      <input type="text" defaultValue="45 Pemuda Desa" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500 font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Deskripsi & Output Indikator:</label>
                    <textarea rows={2} defaultValue="Pelatihan sertifikasi las BNSP bekerja sama dengan Balai Latihan Kerja Morowali untuk kesiapan kerja di area tambang." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500" />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowNewComdevProgramModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Simpan Program PPM
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB: ENVIRONMENTAL OFFICER, AMDAL & REKULTIVASI LAHAN */}
      {activeTab === 'environment' && (
        <div className="space-y-6">
          {/* Header Banner Environmental Officer */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wider flex items-center gap-1">
                    <Trees className="w-3.5 h-3.5 text-emerald-400" />
                    AMDAL, UKL-UPL & KLHK ENVIRONMENTAL COMPLIANCE
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    PERMEN LHK NO. P.68/2016 COMPLIANT
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    6 SETTLING PONDS ACTIVE
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Trees className="w-6 h-6 text-emerald-400" />
                  Dasbor Environmental Officer, AMDAL & Rekultivasi Tambang
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pemantauan terpadu kualitas lingkungan pertambangan nikel: Monitoring baku mutu air outlet settling pond (TSS & pH), kualitas udara ambien & dust sampler, pengelolaan limbah B3 berizin Festronik, serta progres revegetasi & rekultivasi lahan bekas pit.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowAmdalAuditModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <FileCheck2 className="w-4 h-4 text-teal-400" />
                  Laporan Audit AMDAL & RKL-RPL
                </button>

                <button
                  onClick={() => setShowNewEnvSampleModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/50"
                >
                  <Plus className="w-4 h-4" />
                  Input Sampling Lingkungan
                </button>
              </div>
            </div>
          </div>

          {/* Top Key Environmental KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Baku Mutu Air Settling Pond</span>
                <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                  <Droplets className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                42 mg/L TSS
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">pH 7.2 (Baku Mutu 6-9)</span>
                <span className="text-emerald-400 font-bold">100% Compliant</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Revegetasi & Rekultivasi</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Sprout className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-white font-mono">
                184,5 / 210 Ha
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">Realisasi 87.8%</span>
                <span className="text-slate-500 font-mono">142k Pohon</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Kualitas Udara & Debu Ambien</span>
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <Wind className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-sky-300 font-mono">
                120 µg/Nm³
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">Max 230 µg/Nm³ TSP</span>
                <span className="text-sky-400 font-bold">4 Station Active</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Pengelolaan Limbah B3</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Trash2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-300 font-mono">
                48,2 Ton
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">Oli Bekas & Filter</span>
                <span className="text-amber-400 font-bold">Festronik OK</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Indeks Kepatuhan Lingkungan</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                99,4 / 100
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">Zero Environmental Spill</span>
                <span className="text-slate-500 font-mono">PROPER Hijau</span>
              </div>
            </div>
          </div>

          {/* Environmental Visual Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Settling Pond Water Quality Bar & Line Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-teal-400" />
                    Kualitas Air Limpasan & Outlet Settling Pond (TSS vs Baku Mutu Permen LHK)
                  </h3>
                  <p className="text-[11px] text-slate-400">Kadar Total Suspended Solids (mg/L) & Derajat Keasaman (pH) di 6 Titik Kolam Pengendap</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  REALTIME LAB SUCOFINDO
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { name: 'SP-01 Pit Alpha', tss: 42, ph: 7.2, limit: 200 },
                    { name: 'SP-02 Pit Beta', tss: 58, ph: 7.0, limit: 200 },
                    { name: 'SP-03 Port Jetty', tss: 35, ph: 7.4, limit: 200 },
                    { name: 'SP-04 Stockpile EFO', tss: 48, ph: 6.9, limit: 200 },
                    { name: 'SP-05 Crusher Area', tss: 62, ph: 7.1, limit: 200 },
                    { name: 'SP-06 Camp & WTP', tss: 22, ph: 7.5, limit: 200 }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} interval={0} />
                    <YAxis yAxisId="left" stroke="#10b981" fontSize={11} tickLine={false} unit=" mg/L" domain={[0, 220]} />
                    <YAxis yAxisId="right" orientation="right" stroke="#38bdf8" fontSize={11} tickLine={false} domain={[5, 10]} unit=" pH" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any, name: string) => [
                        name === 'tss' ? `${val} mg/L` : name === 'ph' ? `${val} pH` : `${val} mg/L`,
                        name === 'tss' ? 'Kadar TSS Air' : name === 'ph' ? 'Derajat Keasaman (pH)' : 'Baku Mutu Maksimum'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="tss" fill="#14b8a6" radius={[6, 6, 0, 0]} name="tss" />
                    <Line yAxisId="left" type="monotone" dataKey="limit" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={2} name="limit" dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="ph" stroke="#38bdf8" strokeWidth={3} name="ph" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Rekultivasi Lahan Breakdown Pie Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-emerald-400" />
                  Tahapan Progressive Reclamation
                </h3>
                <p className="text-[11px] text-slate-400">Distribusi Luas Lahan Terganggu & Tahap Pemulihan (Ha)</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Penataan Bentuk Lahan (Recontour)', value: 52, fill: '#f59e0b' },
                        { name: 'Penebaran Topsoil', value: 48, fill: '#84cc16' },
                        { name: 'Penanaman Cover Crop (LCC)', value: 44, fill: '#10b981' },
                        { name: 'Revegetasi Pohon Fast-Growing', value: 40.5, fill: '#06b6d4' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {['#f59e0b', '#84cc16', '#10b981', '#06b6d4'].map((color, index) => (
                        <Cell key={`env-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`${val} Hektar`, 'Luas Area']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Penataan Bentuk Lahan</span>
                  <span className="font-mono font-bold">52,0 Ha</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-lime-500" /> Penebaran Tanah Pucuk</span>
                  <span className="font-mono font-bold">48,0 Ha</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Cover Crop LCC</span>
                  <span className="font-mono font-bold">44,0 Ha</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Tree Planting Fast-Grow</span>
                  <span className="font-mono font-bold">40,5 Ha</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Sampling Register Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Trees className="w-4 h-4 text-emerald-400" />
                  Register Pemantauan Titik Sampling Lingkungan Site (Environment Registry)
                </h3>
                <p className="text-[11px] text-slate-400">Hasil Pengujian Kualitas Air Settling Pond, Ambien Udara, Limbah B3 & Rekultivasi Lahan</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari Lokasi / Parameter / Kode..."
                    value={envSearch}
                    onChange={(e) => setEnvSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-emerald-500 w-52"
                  />
                </div>

                <select
                  value={envCategoryFilter}
                  onChange={(e) => setEnvCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">Semua Kategori K3LH</option>
                  <option value="SETTLING_POND">Air Limpasan Settling Pond</option>
                  <option value="AIR_QUALITY">Kualitas Udara Ambien & Debu</option>
                  <option value="B3_WASTE">Limbah B3 & TPS Berizin</option>
                  <option value="RECLAMATION">Progress Rekultivasi Lahan</option>
                  <option value="NOISE">Kebisingan & Getaran Peledakan</option>
                </select>

                <select
                  value={envStatusFilter}
                  onChange={(e) => setEnvStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
                >
                  <option value="ALL">Semua Status Kepatuhan</option>
                  <option value="COMPLIANT">Sesuai Baku Mutu (PASSED)</option>
                  <option value="ADVISORY">Advisory Note</option>
                  <option value="NON_COMPLIANT">Melebihi Baku Mutu</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">Kode & Stasiun Monitoring</th>
                    <th className="p-3">Kategori Environmental</th>
                    <th className="p-3">Parameter Uji Uji Lab</th>
                    <th className="p-3 text-right">Hasil Pengujian Realtime</th>
                    <th className="p-3 text-right">Baku Mutu Permen LHK</th>
                    <th className="p-3 text-center">Laboratorium Uji</th>
                    <th className="p-3 text-center">Status Kepatuhan</th>
                    <th className="p-3 text-center">Detail Inspector</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'ENV-SP-01', location: 'Outlet Settling Pond 01 Pit Alpha', category: 'SETTLING_POND', categoryName: 'Air Limpasan Settling Pond', parameter: 'TSS & pH (Fe/Mn)', value: 'TSS: 42 mg/L | pH: 7.2', limit: 'Max TSS 200 mg/L | pH 6-9', lab: 'PT Sucofindo (KAN Accredited)', date: '06 Aug 2026', status: 'COMPLIANT', statusLabel: 'Lolos Baku Mutu', inspector: 'Bambang Triyono, S.T.' },
                    { id: 'ENV-SP-02', location: 'Outlet Settling Pond 02 Pit Beta', category: 'SETTLING_POND', categoryName: 'Air Limpasan Settling Pond', parameter: 'TSS & pH (Fe/Mn)', value: 'TSS: 58 mg/L | pH: 7.0', limit: 'Max TSS 200 mg/L | pH 6-9', lab: 'PT Sucofindo (KAN Accredited)', date: '06 Aug 2026', status: 'COMPLIANT', statusLabel: 'Lolos Baku Mutu', inspector: 'Bambang Triyono, S.T.' },
                    { id: 'ENV-AIR-01', location: 'Stasiun Udara Ambien Des. Bahodopi (Ring 1)', category: 'AIR_QUALITY', categoryName: 'Kualitas Udara Ambien & Debu', parameter: 'Dust Sampler (TSP & PM2.5)', value: 'TSP: 120 µg/Nm³ | PM2.5: 22 µg/Nm³', limit: 'Max TSP 230 µg/Nm³ | PM2.5 55 µg/Nm³', lab: 'Lab KLHK Terakreditasi', date: '05 Aug 2026', status: 'COMPLIANT', statusLabel: 'Lolos Baku Mutu', inspector: 'Siti Nurhaliza, M.Env' },
                    { id: 'ENV-B3-04', location: 'TPS Limbah B3 Central Workshop', category: 'B3_WASTE', categoryName: 'Limbah B3 & TPS Berizin', parameter: 'Manifest Oli Bekas & Filter', value: '48,2 Ton Terdata (Manifest Festronik)', limit: 'Izin TPS KLHK No. 891/2024', lab: 'Transporter B3 Berizin (PT Prasadha)', date: '04 Aug 2026', status: 'COMPLIANT', statusLabel: 'Festronik OK', inspector: 'Rahmat Hidayat, S.T.' },
                    { id: 'ENV-REC-02', location: 'Area Disposal Blok Beta (40 Ha)', category: 'RECLAMATION', categoryName: 'Progress Rekultivasi Lahan', parameter: 'Penebaran Topsoil & Tree Planting', value: 'Revegetasi 38,5 Ha (18.200 Sengon)', limit: 'Target RKAB 2026: 40,0 Ha', lab: 'Inspeksi Tim KTT & ESDM', date: '03 Aug 2026', status: 'COMPLIANT', statusLabel: 'Target 96% Achieved', inspector: 'Ir. Ahmad Subagyo (KTT)' },
                    { id: 'ENV-NOISE-01', location: 'Batas Pemukiman Desa Fatufia', category: 'NOISE', categoryName: 'Kebisingan & Getaran Peledakan', parameter: 'Sound Level & Ground Vibration', value: 'Kebisingan: 58 dBA | Peak Accel: 1.2 mm/s', limit: 'Max 70 dBA | Vibration Max 2.0 mm/s', lab: 'Monitoring Otomatis Telemetry', date: '02 Aug 2026', status: 'COMPLIANT', statusLabel: 'Lolos Baku Mutu', inspector: 'Rahmat Hidayat, S.T.' }
                  ]
                  .filter(s => envCategoryFilter === 'ALL' || s.category === envCategoryFilter)
                  .filter(s => envStatusFilter === 'ALL' || s.status === envStatusFilter)
                  .filter(s => s.id.toLowerCase().includes(envSearch.toLowerCase()) || s.location.toLowerCase().includes(envSearch.toLowerCase()) || s.parameter.toLowerCase().includes(envSearch.toLowerCase()))
                  .map((sample) => (
                    <tr key={sample.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-emerald-400 font-mono">{sample.id}</div>
                        <div className="text-[10px] text-slate-300 font-semibold">{sample.location}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-teal-300 border border-slate-700">
                          {sample.categoryName}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="text-slate-200 font-medium">{sample.parameter}</div>
                        <div className="text-[10px] text-slate-400">Tgl: {sample.date}</div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="font-bold text-emerald-300 font-mono">{sample.value}</div>
                        <div className="text-[9px] text-slate-400">Tester: {sample.inspector}</div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="text-slate-300 font-mono text-[11px]">{sample.limit}</div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-[10px] text-slate-400 font-mono bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {sample.lab}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          {sample.statusLabel}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedEnvSample(sample)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                        >
                          <Search className="w-3.5 h-3.5" />
                          Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Inspection Sample Detail */}
          {selectedEnvSample && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Trees className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Sertifikat Hasil Pengujian Sample {selectedEnvSample.id}</h3>
                  </div>
                  <button onClick={() => setSelectedEnvSample(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Lokasi Stasiun:</span>
                    <strong className="text-white">{selectedEnvSample.location}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Kategori Pengujian:</span>
                    <span className="text-teal-400 font-bold">{selectedEnvSample.categoryName}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Hasil Lab Realtime:</span>
                    <strong className="text-emerald-400 font-mono">{selectedEnvSample.value}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Baku Mutu Permen LHK:</span>
                    <span className="text-slate-300 font-mono">{selectedEnvSample.limit}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Laboratorium Penguji:</span>
                    <span className="text-slate-400 font-bold">{selectedEnvSample.lab}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Catatan Auditor Environmental:</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Hasil pengukuran menunjukkan seluruh parameter berada dalam ambang batas aman lingkungan hidup. Penataan settling pond berfungsi optimal dengan dosing tawas/kapur otomatis.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedEnvSample(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Sertifikat Hasil Lab ${selectedEnvSample.id} telah diunduh!`)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Unduh Sertifikat Lab
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Audit AMDAL & RKL-RPL */}
          {showAmdalAuditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-teal-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-teal-400" />
                    <h3 className="text-base font-bold text-white">Laporan Kepatuhan AMDAL & RKL-RPL</h3>
                  </div>
                  <button onClick={() => setShowAmdalAuditModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Dokumen AMDAL KLHK:</span>
                      <strong className="text-emerald-400 font-mono font-bold">Approved No. SK.882/2022</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Laporan RKL-RPL Semester I 2026:</span>
                      <strong className="text-blue-400 font-mono font-bold">Terverifikasi ESDM & KLHK</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Status PROPER Lingkungan:</span>
                      <strong className="text-emerald-400 font-bold">Peringkat HIJAU (Sangat Baik)</strong>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Seluruh dokumen pengelolaan lingkungan hidup dan evaluasi pemantauan lingkungan berkala telah disampaikan secara digital melalui portal SIMPEL KLHK & Minerba One Data Indonesia.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      alert("Laporan AMDAL & RKL-RPL siap dicetak dalam format PDF resmi!");
                      setShowAmdalAuditModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold transition-all"
                  >
                    Unduh Paket Dokumen Compliance
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Input Sample / Monitoring Log Baru */}
          {showNewEnvSampleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Input Monitoring Sample Lingkungan Baru</h3>
                  </div>
                  <button onClick={() => setShowNewEnvSampleModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Data hasil monitoring lingkungan baru berhasil direkam ke database K3LH & AMDAL!");
                  setShowNewEnvSampleModal(false);
                }} className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Stasiun & Lokasi Monitoring:</label>
                    <input type="text" defaultValue="Outlet Settling Pond 03 Port Jetty" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500" />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kategori Environmental:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500">
                        <option>Air Limpasan Settling Pond</option>
                        <option>Kualitas Udara Ambien & Debu</option>
                        <option>Limbah B3 & TPS Berizin</option>
                        <option>Progress Rekultivasi Lahan</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Laboratorium Penguji:</label>
                      <input type="text" defaultValue="PT Sucofindo (KAN Accredited)" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Hasil TSS / Kategori Value:</label>
                      <input type="text" defaultValue="38 mg/L" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500 font-mono" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Hasil pH / Parameter Kedua:</label>
                      <input type="text" defaultValue="pH 7.3" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500 font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Catatan Inseksi Officer:</label>
                    <textarea rows={2} defaultValue="Pengolahan settling pond stabil, sedimentasi aman, pompa otomatis bekerja normal." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-emerald-500" />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowNewEnvSampleModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Simpan Log Sampling
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB: MEDICAL, KLINIK SITE & OCCUPATIONAL HEALTH (FIT-TO-WORK) */}
      {activeTab === 'medical' && (
        <div className="space-y-6">
          {/* Header Banner Medical & Occupational Health */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 tracking-wider flex items-center gap-1">
                    <Stethoscope className="w-3.5 h-3.5 text-rose-400" />
                    KLINIK UTAMA SITE & OCCUPATIONAL HEALTH
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                    PERMENAKER NO. 02/1980 COMPLIANT
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    2 ER AMBULANCE STANDBY 24/7
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Stethoscope className="w-6 h-6 text-rose-400" />
                  Dasbor Medical, Kesehatan Kerja & Fit-To-Work Klinik Site
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Pemantauan kesehatan pekerja tambang nikel terpadu: Screening harian Fit-To-Work (pemeriksaan tekanan darah, fatigue, alkohol/narkoba), rekam medis klinik site 24/7, pengelolaan Medical Check-Up (MCU Berkala & Pre-employment), serta penanganan darurat medevac.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowFitToWorkAuditModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <HeartPulse className="w-4 h-4 text-rose-400" />
                  Status Fit-To-Work & MCU Audit
                </button>

                <button
                  onClick={() => setShowNewMedicalCheckupModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-rose-950/50"
                >
                  <Plus className="w-4 h-4" />
                  Input Rekam Medis / MCU
                </button>
              </div>
            </div>
          </div>

          {/* Top Key Medical KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Daily Fit-To-Work Cleared</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                1.428 / 1.450
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">98.5% Operational Ready</span>
                <span className="text-slate-500 font-mono">22 Unfit Temporary</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Kunjungan Klinik Site Hari Ini</span>
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-rose-300 font-mono">
                14 Pasien
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">Fatigue: 4 | ISPA: 6</span>
                <span className="text-rose-400 font-bold">Rawat Jalan 100%</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Pencapaian MCU Berkala 2026</span>
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <HeartPulse className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-white font-mono">
                1.280 / 1.450
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-sky-400 font-bold">Progres MCU 88.3%</span>
                <span className="text-slate-500 font-mono">Sisa 170 Orang</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Emergency Medevac Response</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Ambulance className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-300 font-mono">
                &lt; 3.8 Menit
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">2 ER Ambulance Ready</span>
                <span className="text-amber-400 font-bold">RS Rujukan OK</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Indeks Kesehatan Kerja Site</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                99,2 / 100
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">Zero Occupational Disease</span>
                <span className="text-slate-500 font-mono">Dokter Okupasi OK</span>
              </div>
            </div>
          </div>

          {/* Medical Visual Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Clinic Visits & Illness Trend */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-rose-400" />
                    Tren Kunjungan Klinik Site & Screening Fatigue Bulanan
                  </h3>
                  <p className="text-[11px] text-slate-400">Jumlah Kasus Rawat Jalan (ISPA, Fatigue, Minor Injury) vs Tingkat Kelayakan Kerja (%)</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  KLINIK 24 JAM
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { month: 'Jan', ispa: 18, fatigue: 12, injury: 3, fitRate: 98.2 },
                    { month: 'Feb', ispa: 15, fatigue: 10, injury: 2, fitRate: 98.6 },
                    { month: 'Mar', ispa: 22, fatigue: 14, injury: 4, fitRate: 97.9 },
                    { month: 'Apr', ispa: 14, fatigue: 8, injury: 1, fitRate: 99.1 },
                    { month: 'Mei', ispa: 16, fatigue: 11, injury: 2, fitRate: 98.8 },
                    { month: 'Jun', ispa: 12, fatigue: 9, injury: 1, fitRate: 99.4 },
                    { month: 'Jul', ispa: 19, fatigue: 13, injury: 3, fitRate: 98.5 },
                    { month: 'Agt', ispa: 14, fatigue: 7, injury: 1, fitRate: 99.2 }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#f43f5e" fontSize={11} tickLine={false} unit=" Orang" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} tickLine={false} domain={[90, 100]} unit=" %" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any, name: string) => [
                        name === 'fitRate' ? `${val}%` : `${val} Pasien`,
                        name === 'ispa' ? 'ISPA / Flu' : name === 'fatigue' ? 'Gejala Fatigue' : name === 'injury' ? 'Cedera Ringan' : '% Fit To Work'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="ispa" stackId="a" fill="#38bdf8" name="ispa" />
                    <Bar yAxisId="left" dataKey="fatigue" stackId="a" fill="#f59e0b" name="fatigue" />
                    <Bar yAxisId="left" dataKey="injury" stackId="a" fill="#f43f5e" radius={[6, 6, 0, 0]} name="injury" />
                    <Line yAxisId="right" type="monotone" dataKey="fitRate" stroke="#10b981" strokeWidth={3} name="fitRate" dot={{ fill: '#10b981', r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fit To Work Classification Pie Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  Klasifikasi Status Fit-To-Work Karyawan
                </h3>
                <p className="text-[11px] text-slate-400">Hasil Clearance Medis Dokter Okupasi (Total 1.450 Karyawan)</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Fit Without Restriction (Bebas)', value: 1210, fill: '#10b981' },
                        { name: 'Fit With Restriction (Catatan Restriksi)', value: 218, fill: '#38bdf8' },
                        { name: 'Unfit Temporary (Istirahat Klinik)', value: 18, fill: '#f59e0b' },
                        { name: 'Unfit Medevac / Referral', value: 4, fill: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {['#10b981', '#38bdf8', '#f59e0b', '#ef4444'].map((color, index) => (
                        <Cell key={`med-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`${val} Karyawan`, 'Jumlah Status']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Fit Normal (Siap Kerja)</span>
                  <span className="font-mono font-bold">1.210 Orang</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Fit Restriksi (Kacamata/Obat)</span>
                  <span className="font-mono font-bold">218 Orang</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Unfit Sementara (Istirahat)</span>
                  <span className="font-mono font-bold">18 Orang</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Referral RS Rujukan</span>
                  <span className="font-mono font-bold">4 Orang</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Medical & Clinical Register Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-rose-400" />
                  Register Rekam Medis Klinik Site & Screening Fit-To-Work (Occupational Medical Records)
                </h3>
                <p className="text-[11px] text-slate-400">Data Pemeriksaan Vital Signs, Tes Narkoba/Alkohol, MCU Berkala, & Clearance Kelayakan Operator</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari Nama / NIK / Jabatan..."
                    value={medSearch}
                    onChange={(e) => setMedSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-rose-500 w-52"
                  />
                </div>

                <select
                  value={medCategoryFilter}
                  onChange={(e) => setMedCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-rose-500"
                >
                  <option value="ALL">Semua Jenis Layanan Medis</option>
                  <option value="FIT_TO_WORK">Daily Fit-To-Work Clearance</option>
                  <option value="MCU_BERKALA">MCU Berkala (Periodic MCU)</option>
                  <option value="KLINIK_RAWAT">Kunjungan Berobat Klinik</option>
                  <option value="DRUG_ALCOHOL">Tes Bebas Narkoba & Alkohol</option>
                  <option value="FATIGUE">Fatigue Monitoring Test</option>
                </select>

                <select
                  value={medStatusFilter}
                  onChange={(e) => setMedStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-rose-500"
                >
                  <option value="ALL">Semua Status Kelayakan</option>
                  <option value="FIT">FIT TO WORK (Cleared)</option>
                  <option value="RESTRICTION">FIT WITH RESTRICTION</option>
                  <option value="UNFIT">UNFIT TEMPORARY</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">NIK & Nama Karyawan</th>
                    <th className="p-3">Jabatan & Departemen</th>
                    <th className="p-3">Kategori Pemeriksaan</th>
                    <th className="p-3 text-right">Hasil Tensi & Vital Signs</th>
                    <th className="p-3 text-center">Screening Alkohol / Drug</th>
                    <th className="p-3 text-center">Status Fit-To-Work</th>
                    <th className="p-3 text-center">Dokter Penanggung Jawab</th>
                    <th className="p-3 text-center">Rekam Medis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'MED-2026-081', nik: 'EMP-9021', name: 'Budi Santoso', dept: 'Production Pit Alpha', role: 'Operator Excavator CAT 390', category: 'FIT_TO_WORK', categoryName: 'Daily Fit-To-Work Clearance', vitals: 'Tensi: 120/80 | Nadi: 76 bpm', drug: 'NEGATIF (0.00%)', status: 'FIT', statusLabel: 'FIT TO WORK', doctor: 'dr. Hendra Pratama, Sp.Ok', date: '06 Aug 2026 (Shift 1)' },
                    { id: 'MED-2026-082', nik: 'EMP-8842', name: 'Agus Setiawan', dept: 'Logistics & Hauling', role: 'Driver Dump Truck 10-Wheel', category: 'FIT_TO_WORK', categoryName: 'Daily Fit-To-Work Clearance', vitals: 'Tensi: 145/95 | Nadi: 88 bpm', drug: 'NEGATIF (0.00%)', status: 'RESTRICTION', statusLabel: 'FIT WITH RESTRICTION', doctor: 'dr. Hendra Pratama, Sp.Ok', date: '06 Aug 2026 (Shift 1)' },
                    { id: 'MED-2026-083', nik: 'EMP-7391', name: 'Eko Prasetyo', dept: 'Crushing Plant EFO', role: 'Plant Supervisor', category: 'MCU_BERKALA', categoryName: 'MCU Berkala (Periodic MCU)', vitals: 'SpO2: 99% | Gula Darah: 110 mg/dL', drug: 'NEGATIF (0.00%)', status: 'FIT', statusLabel: 'FIT TO WORK', doctor: 'dr. Anita Wijaya, M.KK', date: '05 Aug 2026' },
                    { id: 'MED-2026-084', nik: 'EMP-9104', name: 'Rian Kurniawan', dept: 'Mining Operation', role: 'Operator Dozer D85', category: 'FATIGUE', categoryName: 'Fatigue Monitoring Test', vitals: 'Skor Reaction: 380 ms (High Fatigue)', drug: 'NEGATIF (0.00%)', status: 'UNFIT', statusLabel: 'UNFIT TEMPORARY', doctor: 'dr. Hendra Pratama, Sp.Ok', date: '06 Aug 2026 (Shift 1)' },
                    { id: 'MED-2026-085', nik: 'EMP-6520', name: 'Siti Aminah', dept: 'Health Safety Environment', role: 'HSE Inspector', category: 'KLINIK_RAWAT', categoryName: 'Kunjungan Berobat Klinik', vitals: 'Suhu: 36.6 °C | Keluhan ISPA Ringan', drug: 'N/A', status: 'FIT', statusLabel: 'FIT TO WORK', doctor: 'dr. Anita Wijaya, M.KK', date: '04 Aug 2026' },
                    { id: 'MED-2026-086', nik: 'EMP-5892', name: 'Joko Widodo', dept: 'Port Jetty Operation', role: 'Operator Barge Loader', category: 'DRUG_ALCOHOL', categoryName: 'Random Drug & Alcohol Test', vitals: 'Breathalyzer: 0.00 BAC', drug: 'NEGATIF (6 Panel Clean)', status: 'FIT', statusLabel: 'FIT TO WORK', doctor: 'dr. Hendra Pratama, Sp.Ok', date: '03 Aug 2026' }
                  ]
                  .filter(m => medCategoryFilter === 'ALL' || m.category === medCategoryFilter)
                  .filter(m => medStatusFilter === 'ALL' || m.status === medStatusFilter)
                  .filter(m => m.name.toLowerCase().includes(medSearch.toLowerCase()) || m.nik.toLowerCase().includes(medSearch.toLowerCase()) || m.dept.toLowerCase().includes(medSearch.toLowerCase()))
                  .map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white text-xs">{rec.name}</div>
                        <div className="text-[10px] text-rose-400 font-mono font-bold">{rec.nik} • {rec.id}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-slate-200 font-medium">{rec.dept}</div>
                        <div className="text-[10px] text-slate-400">{rec.role}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-rose-300 border border-slate-700">
                          {rec.categoryName}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="font-bold text-slate-100 font-mono">{rec.vitals}</div>
                        <div className="text-[9px] text-slate-400">{rec.date}</div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {rec.drug}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          rec.status === 'FIT' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                            : rec.status === 'RESTRICTION'
                            ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}>
                          {rec.statusLabel}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="text-[11px] text-slate-300 font-semibold">{rec.doctor}</div>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedMedicalRecord(rec)}
                          className="px-2.5 py-1 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                        >
                          <Search className="w-3.5 h-3.5" />
                          Kartu Medis
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Inspection Medical Record Detail */}
          {selectedMedicalRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-rose-400" />
                    <h3 className="text-base font-bold text-white">Kartu Kelayakan Medis Fit-To-Work {selectedMedicalRecord.nik}</h3>
                  </div>
                  <button onClick={() => setSelectedMedicalRecord(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Nama Pasien / Pekerja:</span>
                    <strong className="text-white">{selectedMedicalRecord.name} ({selectedMedicalRecord.role})</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Departemen / Unit Kerja:</span>
                    <span className="text-slate-300 font-bold">{selectedMedicalRecord.dept}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Pemeriksaan Vital Signs:</span>
                    <strong className="text-rose-400 font-mono">{selectedMedicalRecord.vitals}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Hasil Tes Alkohol & Narkoba:</span>
                    <span className="text-emerald-400 font-mono font-bold">{selectedMedicalRecord.drug}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Dokter Penanggung Jawab:</span>
                    <span className="text-slate-300 font-bold">{selectedMedicalRecord.doctor}</span>
                  </div>
                </div>

                <div className="p-3 bg-rose-950/20 border border-rose-500/30 rounded-xl space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Catatan Dokter Spesialis Okupasi:</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Karyawan telah menjalani pemeriksaan kesehatan sebelum mengoperasikan alat berat. Kondisi fisik & psikomotorik dalam batas normal dan disetujui bekerja penuh untuk Shift 1.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedMedicalRecord(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Surat Clearance Fit-To-Work untuk ${selectedMedicalRecord.name} telah diunduh!`)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Unduh Surat Fit-To-Work PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Fit To Work Audit */}
          {showFitToWorkAuditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-rose-400" />
                    <h3 className="text-base font-bold text-white">Status Compliance Klinik & MCU Audit</h3>
                  </div>
                  <button onClick={() => setShowFitToWorkAuditModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Standard Klinik Site:</span>
                      <strong className="text-emerald-400 font-mono font-bold">Klinik Pratama Terakreditasi</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Izin Operasional Klinik:</span>
                      <strong className="text-blue-400 font-mono font-bold">Dinkes No. 440/102/2025</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Dokter Okupasi Sertifikasi:</span>
                      <strong className="text-emerald-400 font-bold">SIP Dokter Aktif (2 Personil)</strong>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Seluruh protokol pemeriksaan kesehatan mengacu pada Permenaker No. 02/1980 dan Kepmen ESDM No. 1827 K/30/MEM/2018 tentang Keselamatan & Kesehatan Kerja Pertambangan.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      alert("Laporan Audit Kesehatan Kerja Klinik Site siap dicetak!");
                      setShowFitToWorkAuditModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold transition-all"
                  >
                    Unduh Laporan Audit Medis
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Input Pemeriksaan Medis / MCU Baru */}
          {showNewMedicalCheckupModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-rose-400" />
                    <h3 className="text-base font-bold text-white">Input Rekam Medis & Fit-To-Work Baru</h3>
                  </div>
                  <button onClick={() => setShowNewMedicalCheckupModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Data rekam medis baru berhasil direkam ke Sistem Klinik Site & Fit-To-Work!");
                  setShowNewMedicalCheckupModal(false);
                }} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">NIK Karyawan:</label>
                      <input type="text" defaultValue="EMP-9088" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500 font-mono" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nama Karyawan:</label>
                      <input type="text" defaultValue="Dedi Permana" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kategori Medis:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500">
                        <option>Daily Fit-To-Work Clearance</option>
                        <option>MCU Berkala (Periodic MCU)</option>
                        <option>Kunjungan Berobat Klinik</option>
                        <option>Random Drug & Alcohol Test</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Status Kelayakan:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500 font-bold text-emerald-400">
                        <option>FIT TO WORK (Cleared)</option>
                        <option>FIT WITH RESTRICTION</option>
                        <option>UNFIT TEMPORARY</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Tekanan Darah (Tensi):</label>
                      <input type="text" defaultValue="120/80 mmHg" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500 font-mono" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Screening Drug & Alcohol:</label>
                      <input type="text" defaultValue="NEGATIF (0.00%)" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500 font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Catatan & Resep Dokter Okupasi:</label>
                    <textarea rows={2} defaultValue="Pemeriksaan vital signs normal, psikomotor baik, disetujui bertugas di Tambang Pit Beta." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500" />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowNewMedicalCheckupModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Simpan Rekam Medis
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD TAB: EMPLOYEE, SDM SITE & HRIS */}
      {(activeTab === 'employee' || activeTab === 'karyawan') && (
        <div className="space-y-6">
          {/* Header Banner Employee & HRIS */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 tracking-wider flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    MANAJEMEN SDM SITE & HRIS TERPADU
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    DISNAKER & UU CIpta KERJA COMPLIANT
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    ROSTER LEAVE 10:2 & 8:2 ACTIVE
                  </span>
                </div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-indigo-400" />
                  Dasbor Karyawan, SDM Site & Kepegawaian (HRIS Employee Hub)
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
                  Sistem Pengelolaan Karyawan Tambang Nikel Terpadu: Monitoring Presensi Face Recognition, Pengajuan Cuti Roster Site, Slip Gaji & THR PPh 21, Lisensi SIO Alat Berat & POP/POM K3, serta BPJS Ketenagakerjaan.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setFtwStep(1);
                    setFtwResultBadge(null);
                    setShowEmployeeFitToWorkModal(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Screening Fit-To-Work Karyawan
                </button>

                <button
                  onClick={() => setShowHrComplianceAuditModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <FileCheck2 className="w-4 h-4 text-indigo-400" />
                  Audit Compliance SDM & BPJS
                </button>

                <button
                  onClick={() => setShowNewLeaveRequestModal(true)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-950/50"
                >
                  <Plus className="w-4 h-4" />
                  Input Cuti Roster / HR Request
                </button>
              </div>
            </div>
          </div>

          {/* Top Key Employee KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Total Headcount Karyawan</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-white font-mono">
                1.450 Karyawan
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">1.120 Tetap | 330 PKWT</span>
                <span className="text-slate-500 font-mono">98.8% Hadir</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Status Roster Duty vs Leave</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono">
                1.280 Duty / 170 Cuti
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">Roster 10:2 Compliant</span>
                <span className="text-slate-500 font-mono">Zero Overstay</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Sertifikasi SIO & K3 POP</span>
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-amber-300 font-mono">
                94,2% Valid
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">SIO Sesuai Kelas</span>
                <span className="text-amber-400 font-bold">38 Expiring Soon</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Jam Kerja Shift & Lembur</span>
                <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-sky-300 font-mono">
                11.600 Jam/Hari
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-300 font-semibold">Rata-rata 1.8 Jam Lembur</span>
                <span className="text-sky-400 font-bold">2 Shift Operational</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-semibold">Kepesertaan BPJS & Retensi</span>
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="text-lg font-black text-indigo-300 font-mono">
                100% Active BPJS
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-bold">Turnover 1.9% (Low)</span>
                <span className="text-slate-500 font-mono">DISNAKER OK</span>
              </div>
            </div>
          </div>

          {/* Employee Visual Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Attendance & Roster Turnaround Chart */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                    <Users className="w-4 h-4 text-indigo-400" />
                    Tren Kehadiran Presensi Site & Turnaround Cuti Roster Bulanan
                  </h3>
                  <p className="text-[11px] text-slate-400">Jumlah Personil On-Duty vs On-Roster Leave (%) Tingkat Kehadiran Karyawan</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  REALTIME HRIS FACE RECOGNITION
                </span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={[
                    { month: 'Jan', duty: 1260, leave: 190, attRate: 98.4 },
                    { month: 'Feb', duty: 1275, leave: 175, attRate: 98.8 },
                    { month: 'Mar', duty: 1250, leave: 200, attRate: 98.1 },
                    { month: 'Apr', duty: 1290, leave: 160, attRate: 99.2 },
                    { month: 'Mei', duty: 1270, leave: 180, attRate: 98.6 },
                    { month: 'Jun', duty: 1295, leave: 155, attRate: 99.5 },
                    { month: 'Jul', duty: 1280, leave: 170, attRate: 98.9 },
                    { month: 'Agt', duty: 1280, leave: 170, attRate: 98.8 }
                  ]} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                    <YAxis yAxisId="left" stroke="#818cf8" fontSize={11} tickLine={false} unit=" Orang" />
                    <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={11} tickLine={false} domain={[90, 100]} unit=" %" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any, name: string) => [
                        name === 'attRate' ? `${val}%` : `${val} Karyawan`,
                        name === 'duty' ? 'On-Site Duty' : name === 'leave' ? 'On-Roster Leave' : 'Presensi (%)'
                      ]}
                    />
                    <Bar yAxisId="left" dataKey="duty" fill="#6366f1" radius={[6, 6, 0, 0]} name="duty" />
                    <Bar yAxisId="left" dataKey="leave" fill="#f59e0b" radius={[6, 6, 0, 0]} name="leave" />
                    <Line yAxisId="right" type="monotone" dataKey="attRate" stroke="#10b981" strokeWidth={3} name="attRate" dot={{ fill: '#10b981', r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Departmental Headcount Distribution Pie Chart */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                  Distribusi Karyawan Per Departemen Site
                </h3>
                <p className="text-[11px] text-slate-400">Porsi SDM Operasional Mining, Smelter, Maintenance & Support</p>
              </div>

              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Mining Operation (Operator/Driver)', value: 520, fill: '#6366f1' },
                        { name: 'Processing & Smelter Nickel', value: 340, fill: '#06b6d4' },
                        { name: 'Mechanical & Maintenance Workshop', value: 260, fill: '#f59e0b' },
                        { name: 'HSE, Geology & Mining Eng.', value: 180, fill: '#10b981' },
                        { name: 'Support, Logistics & HR Admin', value: 150, fill: '#ec4899' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {['#6366f1', '#06b6d4', '#f59e0b', '#10b981', '#ec4899'].map((color, index) => (
                        <Cell key={`emp-pie-cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                      formatter={(val: any) => [`${val} Karyawan`, 'Jumlah SDM']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Mining Operation</span>
                  <span className="font-mono font-bold">520 Orang</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> Processing & Smelter</span>
                  <span className="font-mono font-bold">340 Orang</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Maintenance Workshop</span>
                  <span className="font-mono font-bold">260 Orang</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> HSE & Geology Eng.</span>
                  <span className="font-mono font-bold">180 Orang</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Support, Logistics & HR</span>
                  <span className="font-mono font-bold">150 Orang</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Employee Directory & HR Register Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-400" />
                  Direktori Karyawan & Master Register Kepegawaian Site (HRIS Employee Master)
                </h3>
                <p className="text-[11px] text-slate-400">Data Terpadu NIK, Roster Schedule, Lisensi SIO, Status Gaji PPh 21, & Kepesertaan BPJS</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Cari Nama / NIK / Jabatan..."
                    value={empSearch}
                    onChange={(e) => setEmpSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-none focus:border-indigo-500 w-52"
                  />
                </div>

                <select
                  value={empCategoryFilter}
                  onChange={(e) => setEmpCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="ALL">Semua Kategori SDM</option>
                  <option value="OPERATIONS">Mining Operation (Operator & Driver)</option>
                  <option value="MAINTENANCE">Maintenance Workshop & Mechanics</option>
                  <option value="ENGINEERING">Geology, Survey & Mine Plan</option>
                  <option value="HSE_ENV">HSE & Environmental</option>
                  <option value="LOGISTICS_HR">Logistics, Admin & HR</option>
                </select>

                <select
                  value={empStatusFilter}
                  onChange={(e) => setEmpStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="ALL">Semua Status Roster</option>
                  <option value="ON_DUTY">ON-DUTY Site Active</option>
                  <option value="ROSTER_LEAVE">ON-ROSTER LEAVE (Cuti)</option>
                  <option value="WARNING">SIO / Sertifikat Warning</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-950/50">
                    <th className="p-3">NIK & Nama Karyawan</th>
                    <th className="p-3">Jabatan & Departemen</th>
                    <th className="p-3">Status Roster & Presensi</th>
                    <th className="p-3 text-center">Sertifikasi SIO / POP K3</th>
                    <th className="p-3 text-right">Status Payroll & PPh 21</th>
                    <th className="p-3 text-center">BPJS Ketenagakerjaan</th>
                    <th className="p-3 text-center">Aksi HR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {[
                    { id: 'EMP-1024', nik: 'EMP-1024', name: 'Bambang Supriyadi', dept: 'Mining Operation Pit Alpha', role: 'Operator Excavator CAT 390', category: 'OPERATIONS', roster: 'Roster 10:2', status: 'ON_DUTY', statusLabel: 'ON-DUTY Site (Shift 1)', sio: 'SIO Class I Excavator (Valid 2028)', pop: 'Sertifikat POP ESDM Aktif', payroll: 'Payroll Paid (BSI)', bpjs: '00028192301 (Covered)', joinDate: '12 Jan 2021', pph: 'PPh 21 TER A (PTKP K/1)' },
                    { id: 'EMP-1088', nik: 'EMP-1088', name: 'Rudy Hermawan', dept: 'Mechanical Workshop', role: 'Senior Heavy Equipment Mechanic', category: 'MAINTENANCE', roster: 'Roster 8:2', status: 'ON_DUTY', statusLabel: 'ON-DUTY Site (Shift 2)', sio: 'SIO Mechanic Class II', pop: 'K3 Umum Kemnaker', payroll: 'Payroll Paid (Mandiri)', bpjs: '00038192833 (Covered)', joinDate: '05 Mar 2022', pph: 'PPh 21 TER B (PTKP K/2)' },
                    { id: 'EMP-2041', nik: 'EMP-2041', name: 'Siti Rahmawati, S.T.', dept: 'Mine Plan & Survey', role: 'Senior Mine Geologist', category: 'ENGINEERING', roster: 'Roster 6:2', status: 'ROSTER_LEAVE', statusLabel: 'ON-ROSTER LEAVE (8/14 Day)', sio: 'N/A (Professional Staff)', pop: 'Sertifikat POM ESDM Aktif', payroll: 'Payroll Paid (BCA)', bpjs: '00019283748 (Covered)', joinDate: '18 Aug 2019', pph: 'PPh 21 TER A (PTKP TK/0)' },
                    { id: 'EMP-3012', nik: 'EMP-3012', name: 'Ahmad Fauzi', dept: 'Logistics & Hauling', role: 'Driver Dump Truck 10-Wheel', category: 'OPERATIONS', roster: 'Roster 10:2', status: 'WARNING', statusLabel: 'SIO Expiring in 15 Days', sio: 'SIO DT Class B (Exp Aug 2026)', pop: 'Induksi K3 Mining', payroll: 'Payroll Paid (BSI)', bpjs: '00047281920 (Covered)', joinDate: '10 Feb 2023', pph: 'PPh 21 TER A (PTKP K/0)' },
                    { id: 'EMP-4050', nik: 'EMP-4050', name: 'Dewi Lestari', dept: 'Health Safety Environment', role: 'Safety Officer Pit Beta', category: 'HSE_ENV', roster: 'Roster 6:2', status: 'ON_DUTY', statusLabel: 'ON-DUTY Site (Shift 1)', sio: 'Sertifikat K3 Madya', pop: 'Sertifikat POP ESDM Aktif', payroll: 'Payroll Paid (BSI)', bpjs: '00058291039 (Covered)', joinDate: '01 Nov 2020', pph: 'PPh 21 TER A (PTKP TK/0)' },
                    { id: 'EMP-5082', nik: 'EMP-5082', name: 'Hendra Gunawan', dept: 'HR & General Affairs', role: 'GA Site Supervisor', category: 'LOGISTICS_HR', roster: 'Non-Roster (Resident)', status: 'ON_DUTY', statusLabel: 'ON-DUTY Office Site', sio: 'N/A (Management)', pop: 'K3 HR Management', payroll: 'Payroll Paid (Mandiri)', bpjs: '00092837461 (Covered)', joinDate: '14 Jun 2018', pph: 'PPh 21 TER C (PTKP K/3)' }
                  ]
                  .filter(e => empCategoryFilter === 'ALL' || e.category === empCategoryFilter)
                  .filter(e => empStatusFilter === 'ALL' || e.status === empStatusFilter)
                  .filter(e => e.name.toLowerCase().includes(empSearch.toLowerCase()) || e.nik.toLowerCase().includes(empSearch.toLowerCase()) || e.dept.toLowerCase().includes(empSearch.toLowerCase()))
                  .map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white text-xs">{employee.name}</div>
                        <div className="text-[10px] text-indigo-400 font-mono font-bold">{employee.nik} • Masuk: {employee.joinDate}</div>
                      </td>
                      <td className="p-3">
                        <div className="text-slate-200 font-medium">{employee.dept}</div>
                        <div className="text-[10px] text-slate-400">{employee.role}</div>
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          employee.status === 'ON_DUTY' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                            : employee.status === 'ROSTER_LEAVE'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}>
                          {employee.statusLabel}
                        </span>
                        <div className="text-[9px] text-slate-400 mt-0.5 font-mono">{employee.roster}</div>
                      </td>
                      <td className="p-3 text-center">
                        <div className="text-slate-200 font-mono text-[11px] font-bold">{employee.sio}</div>
                        <div className="text-[9px] text-indigo-300">{employee.pop}</div>
                      </td>
                      <td className="p-3 text-right">
                        <div className="font-bold text-emerald-400 font-mono">{employee.payroll}</div>
                        <div className="text-[9px] text-slate-400">{employee.pph}</div>
                      </td>
                      <td className="p-3 text-center">
                        <span className="text-[10px] text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          {employee.bpjs}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedEmployee(employee)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-[11px] font-bold transition-all flex items-center gap-1 mx-auto"
                        >
                          <Search className="w-3.5 h-3.5" />
                          Profil ID
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Inspection Employee Profile */}
          {selectedEmployee && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Profil Karyawan Digital & ID Card {selectedEmployee.nik}</h3>
                  </div>
                  <button onClick={() => setSelectedEmployee(null)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Nama Lengkap:</span>
                    <strong className="text-white text-sm">{selectedEmployee.name}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Jabatan & Departemen:</span>
                    <span className="text-indigo-300 font-bold">{selectedEmployee.role} ({selectedEmployee.dept})</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Skema Roster Kerja:</span>
                    <strong className="text-emerald-400 font-mono">{selectedEmployee.roster} • Status: {selectedEmployee.statusLabel}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Sertifikasi SIO Alat Berat:</span>
                    <span className="text-slate-200 font-mono font-bold">{selectedEmployee.sio}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Lisensi K3 Mining (POP/POM):</span>
                    <span className="text-indigo-400 font-bold">{selectedEmployee.pop}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Pengawasan PPh 21 & Payroll:</span>
                    <span className="text-emerald-400 font-bold">{selectedEmployee.payroll} • {selectedEmployee.pph}</span>
                  </div>
                </div>

                <div className="p-3 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-1 text-xs">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Catatan HRIS & Security Access Site:</span>
                  <p className="text-slate-300 leading-relaxed text-[11px]">
                    Karyawan terverifikasi aktif dengan Hak Akses ID Card RFID & Face Recognition Turnstile Gate Pit Alpha. BPJS Ketenagakerjaan (JKK, JKM, JHT, JP) aktif penuh.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => alert(`Profil & Slip Gaji Karyawan ${selectedEmployee.name} telah diunduh!`)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Unduh Slip Gaji & Profil PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Audit SDM & Compliance */}
          {showHrComplianceAuditModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Laporan Compliance SDM & BPJS Disnaker</h3>
                  </div>
                  <button onClick={() => setShowHrComplianceAuditModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Status WLKP Disnaker:</span>
                      <strong className="text-emerald-400 font-mono font-bold">Wajib Lapor Aktif 2026</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Kepesertaan BPJS Ketenagakerjaan:</span>
                      <strong className="text-blue-400 font-mono font-bold">100% 1.450 Karyawan</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Struktur Skala Upah UMSP:</span>
                      <strong className="text-emerald-400 font-bold">Disetujui Disnaker Sulteng</strong>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Seluruh hubungan kerja PKWT/PKWTT mengacu pada UU Cipta Kerja & Kepmen ESDM No. 1827 K/30/MEM/2018 tentang Keselamatan Operasional Tambang.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      alert("Laporan Compliance SDM & WLKP Disnaker siap dicetak!");
                      setShowHrComplianceAuditModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all"
                  >
                    Unduh Dokumen Audit SDM
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Input Cuti / HR Request Baru */}
          {showNewLeaveRequestModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Input Pengajuan Cuti Roster / HR Request Baru</h3>
                  </div>
                  <button onClick={() => setShowNewLeaveRequestModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Pengajuan cuti roster baru berhasil direkam dan diteruskan ke Atasan & HR Manager!");
                  setShowNewLeaveRequestModal(false);
                }} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">NIK Karyawan:</label>
                      <input type="text" defaultValue="EMP-1024" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500 font-mono" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nama Karyawan:</label>
                      <input type="text" defaultValue="Bambang Supriyadi" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Jenis Permohonan HR:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500">
                        <option>Cuti Roster Periodik (RNR 10:2)</option>
                        <option>Cuti Tahunan / Alasan Penting</option>
                        <option>Permohonan Renewal SIO / POP</option>
                        <option>Klaim Lembur & Insentif Site</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Durasi Cuti / Tgl Off:</label>
                      <input type="text" defaultValue="14 Hari (10 Aug - 24 Aug 2026)" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500 font-mono" />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Alasan / Catatan Pengajuan:</label>
                    <textarea rows={2} defaultValue="Jadwal Cuti Roster periodik Siklus III, Tiket Pesawat RNR Surabaya disetujui." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500" />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowNewLeaveRequestModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Kirim Pengajuan Cuti
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Screening & Assessment Fit-To-Work Karyawan Interaktif */}
          {showEmployeeFitToWorkModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
              <div className="max-w-2xl w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto custom-scrollbar">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                        Sistem Screening & Deklarasi Fit-To-Work Karyawan Site
                      </h3>
                      <p className="text-[11px] text-slate-400">Pemeriksaan Kelayakan Fisik, Fatigue, Vital Signs & Uji Psikomotor Sebelum Awal Shift</p>
                    </div>
                  </div>
                  <button onClick={() => setShowEmployeeFitToWorkModal(false)} className="text-slate-400 hover:text-white text-lg">✕</button>
                </div>

                {/* Step Navigation Progress Bar */}
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase tracking-wider">
                  <div className={`p-2 rounded-xl border transition-all ${
                    ftwStep === 1 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                      : ftwStep > 1 ? 'bg-slate-800/80 text-emerald-400 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}>
                    1. Identitas & Fatigue
                  </div>
                  <div className={`p-2 rounded-xl border transition-all ${
                    ftwStep === 2 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                      : ftwStep > 2 ? 'bg-slate-800/80 text-emerald-400 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}>
                    2. Vital Signs & Drug
                  </div>
                  <div className={`p-2 rounded-xl border transition-all ${
                    ftwStep === 3 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                      : ftwStep > 3 ? 'bg-slate-800/80 text-emerald-400 border-emerald-500/30' : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}>
                    3. Uji Reaksi Motorik
                  </div>
                  <div className={`p-2 rounded-xl border transition-all ${
                    ftwStep === 4 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                      : 'bg-slate-950 text-slate-500 border-slate-800'
                  }`}>
                    4. Hasil Pass & Clearance
                  </div>
                </div>

                {/* STEP 1: IDENTITAS & FATIGUE ASSESSMENT */}
                {ftwStep === 1 && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 block mb-1">NIK Karyawan:</label>
                          <input
                            type="text"
                            value={ftwEmployeeNik}
                            onChange={(e) => setFtwEmployeeNik(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nama Karyawan:</label>
                          <input
                            type="text"
                            value={ftwEmployeeName}
                            onChange={(e) => setFtwEmployeeName(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 block mb-1">Jabatan & Operasional:</label>
                          <input
                            type="text"
                            value={ftwRole}
                            onChange={(e) => setFtwRole(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 block mb-1">Shift Kerja Dijalani:</label>
                          <select
                            value={ftwShift}
                            onChange={(e) => setFtwShift(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 focus:border-emerald-500"
                          >
                            <option value="SHIFT_1_DAY">Shift 1 Pagi (06:00 - 18:00)</option>
                            <option value="SHIFT_2_NIGHT">Shift 2 Malam (18:00 - 06:00)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-950/20 rounded-xl border border-indigo-500/30 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-indigo-400" />
                          Durasi Jam Tidur Efektif Semalam:
                        </span>
                        <strong className="text-emerald-400 font-mono text-sm">{ftwSleepHours} Jam</strong>
                      </div>

                      <input
                        type="range"
                        min="3"
                        max="10"
                        step="0.5"
                        value={ftwSleepHours}
                        onChange={(e) => setFtwSleepHours(parseFloat(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />

                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>3 Jam (Kurang)</span>
                        <span>6 Jam (Cukup)</span>
                        <span>7.5 - 8 Jam (Ideal)</span>
                        <span>10 Jam</span>
                      </div>

                      {ftwSleepHours < 6 && (
                        <div className="p-2.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-[11px] font-bold flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          <span>Peringatan Fatigue: Jam tidur semalam kurang dari 6 jam! Berpotensi Unfit / Restriction.</span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <label className="font-bold text-slate-200 text-xs block">
                        Tingkat Kelelahan Mandiri (Samn-Perelli Fatigue Rating Scale 1-7):
                      </label>
                      <select
                        value={ftwFatigueLevel}
                        onChange={(e) => setFtwFatigueLevel(parseInt(e.target.value))}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-bold focus:border-emerald-500"
                      >
                        <option value={1}>1 - Sangat Segar & Bugar (Fully Alert & Wide Awake)</option>
                        <option value={2}>2 - Segar & Siap Bekerja (Very Lively & Alert)</option>
                        <option value={3}>3 - Kondisi Normal Cukup Baik (Okay, Fairly Alert)</option>
                        <option value={4}>4 - Sedikit Kurang Bergairah (A Little Tired)</option>
                        <option value={5}>5 - Lelah & Agak Mengantuk (Moderately Tired, Drowsy)</option>
                        <option value={6}>6 - Mengantuk Berat (Extremely Tired, Very Drowsy)</option>
                        <option value={7}>7 - Sangat Lelah / Hampir Ketiduran (Completely Exhausted)</option>
                      </select>
                    </div>

                    <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowEmployeeFitToWorkModal(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => setFtwStep(2)}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-1.5"
                      >
                        Lanjut ke Vital Signs & Drug Test
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: VITAL SIGNS & DRUG/ALCOHOL TESTING */}
                {ftwStep === 2 && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <label className="text-[10px] text-slate-400 font-semibold block">Tensi Sistolik (mmHg):</label>
                        <input
                          type="number"
                          value={ftwSystolic}
                          onChange={(e) => setFtwSystolic(parseInt(e.target.value) || 120)}
                          className="w-full bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-sm rounded-xl p-2 focus:border-emerald-500"
                        />
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <label className="text-[10px] text-slate-400 font-semibold block">Tensi Diastolik (mmHg):</label>
                        <input
                          type="number"
                          value={ftwDiastolic}
                          onChange={(e) => setFtwDiastolic(parseInt(e.target.value) || 80)}
                          className="w-full bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-sm rounded-xl p-2 focus:border-emerald-500"
                        />
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <label className="text-[10px] text-slate-400 font-semibold block">Heart Rate (bpm):</label>
                        <input
                          type="number"
                          value={ftwHeartRate}
                          onChange={(e) => setFtwHeartRate(parseInt(e.target.value) || 75)}
                          className="w-full bg-slate-900 border border-slate-700 text-sky-400 font-mono font-bold text-sm rounded-xl p-2 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <label className="text-[11px] font-bold text-slate-200 block">Alcohol Breathalyzer Test (BAC %):</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.01"
                            value={ftwAlcoholBac}
                            onChange={(e) => setFtwAlcoholBac(parseFloat(e.target.value) || 0)}
                            className="w-full bg-slate-900 border border-slate-700 text-emerald-400 font-mono font-bold text-sm rounded-xl p-2 focus:border-emerald-500"
                          />
                          <span className="text-[10px] text-slate-400 font-mono">% BAC</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 font-bold block">Toleransi Tambang: 0.00% (Zero Tolerance)</span>
                      </div>

                      <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <label className="text-[11px] font-bold text-slate-200 block">Multi-Panel Drug Test Kit (6 Panel):</label>
                        <select
                          value={ftwDrugTest}
                          onChange={(e) => setFtwDrugTest(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 text-emerald-400 font-extrabold text-xs rounded-xl p-2 focus:border-emerald-500"
                        >
                          <option value="NEGATIVE">NEGATIF (Amp, Morph, THC, Meth, Coc, Benzo)</option>
                          <option value="POSITIVE">POSITIF (Terdeteksi Zat Terlarang)</option>
                        </select>
                        <span className="text-[10px] text-slate-400 block">Diuji oleh Dokter Okupasi Klinik Site</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-bold text-slate-200 text-xs">Konsumsi Obat Mengantuk / Obat Keras 12 Jam Terakhir?</label>
                        <input
                          type="checkbox"
                          checked={ftwMedication}
                          onChange={(e) => setFtwMedication(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Catatan Keluhan Fisik (Misal: Pusing ringan, flu, nyeri otot, dll)..."
                        value={ftwComplaints}
                        onChange={(e) => setFtwComplaints(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl p-2 focus:border-emerald-500 text-xs"
                      />
                    </div>

                    <div className="pt-2 flex justify-between items-center border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setFtwStep(1)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        onClick={() => setFtwStep(3)}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-1.5"
                      >
                        Lanjut ke Uji Reaksi Psikomotor
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: UJI REAKSI PSIKOMOTOR INTERAKTIF */}
                {ftwStep === 3 && (
                  <div className="space-y-4 text-xs text-center">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <h4 className="font-extrabold text-white text-sm flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        Simulasi Uji Waktu Reaksi Motorik Saraf (Psychomotor Reaction Test)
                      </h4>
                      <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                        Diperlukan untuk operator alat berat & driver dump truck untuk memastikan tingkat kewaspadaan refleks terhadap bahaya di area tambang.
                      </p>
                    </div>

                    <div className={`p-8 rounded-2xl border transition-all flex flex-col items-center justify-center space-y-4 ${
                      ftwReactionTesting ? 'bg-emerald-950/60 border-emerald-500 shadow-xl' : 'bg-slate-950 border-slate-800'
                    }`}>
                      <div className="text-4xl font-black font-mono text-emerald-400">
                        {ftwReactionScore} ms
                      </div>
                      <div className="text-xs text-slate-300">
                        {ftwReactionScore < 300 ? '🟢 Kategori: REFLEKS SANGAT CEPT & PRIMA (< 300 ms)' : ftwReactionScore < 400 ? '🟡 Kategori: REAKSI CUKUP (300 - 400 ms)' : '🔴 Kategori: REAKSI LAMBAT (> 400 ms) - TERATIKAN FATIGUE'}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setFtwReactionTesting(true);
                          const randomScore = Math.floor(Math.random() * 80) + 210; // 210ms - 290ms
                          setTimeout(() => {
                            setFtwReactionScore(randomScore);
                            setFtwReactionTesting(false);
                          }, 600);
                        }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold shadow-lg flex items-center gap-2 transition-all transform active:scale-95"
                      >
                        <Play className="w-4 h-4" />
                        {ftwReactionTesting ? 'Mengukur Waktu Reaksi Refleks...' : 'Uji Refleks Sekarang'}
                      </button>
                    </div>

                    <div className="pt-2 flex justify-between items-center border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setFtwStep(2)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          // Calculate final badge status
                          const isUnfit = ftwAlcoholBac > 0 || ftwDrugTest === 'POSITIVE' || ftwSystolic > 150 || ftwDiastolic > 95 || ftwSleepHours < 5 || ftwFatigueLevel >= 6;
                          const isRestriction = !isUnfit && (ftwSleepHours < 6.5 || ftwFatigueLevel >= 4 || ftwSystolic > 135 || ftwMedication);
                          
                          const badge = isUnfit 
                            ? { status: 'UNFIT', label: 'UNFIT TEMPORARY (DILARANG BEKERJA SHIFT INI)', color: 'rose', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/50' }
                            : isRestriction 
                            ? { status: 'RESTRICTION', label: 'FIT WITH RESTRICTION (IZIN BEKERJA DENGAN PEMBATASAN)', color: 'amber', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/50' }
                            : { status: 'FIT', label: 'FIT TO WORK CLEARED (DISEUJUAN BEKERJA PENUH)', color: 'emerald', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' };

                          setFtwResultBadge(badge);
                          setFtwStep(4);
                        }}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-1.5"
                      >
                        Proses Hasil & Generasi Pass Digital
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: RESULT CLEARANCE PASS & DIGITAL QR BADGE */}
                {ftwStep === 4 && ftwResultBadge && (
                  <div className="space-y-4 text-xs">
                    <div className={`p-5 rounded-2xl border text-center space-y-3 ${ftwResultBadge.bg}`}>
                      <div className="w-12 h-12 rounded-full bg-slate-900 border border-current flex items-center justify-center mx-auto text-xl font-bold">
                        {ftwResultBadge.status === 'FIT' ? '🟢' : ftwResultBadge.status === 'RESTRICTION' ? '🟡' : '🔴'}
                      </div>
                      <h3 className="text-lg font-black tracking-wide uppercase">
                        {ftwResultBadge.label}
                      </h3>
                      <p className="text-xs opacity-90">
                        Hasil pemeriksaan kesehatan digital awal shift telah diverifikasi oleh Dokter Okupasi & Sistem Klinik Site.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-400">NIK & Nama Karyawan:</span>
                        <strong className="text-white font-mono">{ftwEmployeeNik} - {ftwEmployeeName}</strong>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-400">Jabatan & Shift Kerja:</span>
                        <span className="text-indigo-300 font-bold">{ftwRole} ({ftwShift})</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-400">Tensi & Heart Rate:</span>
                        <span className="text-slate-200 font-mono font-bold">{ftwSystolic}/{ftwDiastolic} mmHg • {ftwHeartRate} bpm</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-400">Jam Tidur & Fatigue Rating:</span>
                        <span className="text-slate-200 font-mono">{ftwSleepHours} Jam • Level {ftwFatigueLevel}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-1.5">
                        <span className="text-slate-400">Alcohol BAC & Drug Test:</span>
                        <span className="text-emerald-400 font-mono font-bold">{ftwAlcoholBac}% BAC • {ftwDrugTest}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Waktu Reaksi Motorik:</span>
                        <span className="text-sky-400 font-mono font-bold">{ftwReactionScore} ms</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Security Turnstile QR Access Pass:</span>
                        <span className="text-slate-300 font-mono text-[11px]">FTW-PASS-2026-0806-{ftwEmployeeNik}</span>
                      </div>
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-black font-mono text-[10px] uppercase">
                        TURNSTILE GATE OK
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setShowEmployeeFitToWorkModal(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                      >
                        Selesai & Tutup
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          alert(`Surat Pas Fit-To-Work Digital Karyawan ${ftwEmployeeName} (${ftwEmployeeNik}) berhasil diunduh dalam format PDF!`);
                          setShowEmployeeFitToWorkModal(false);
                        }}
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        Cetak Surat Fit-To-Work PDF
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD KEAMANAN SITE (SECURITY, OBVITNAS & GATE ACCESS CONTROL) */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          {/* Header Banner Security */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Mine Site Physical Security, Obvitnas & Gate Access
                </span>
                <span className="text-slate-400 text-xs">• Perkap Kapolri No. 24 / 2007 SMP Security Management System</span>
              </div>
              <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
                <Lock className="w-6 h-6 text-indigo-400" />
                Dasbor Keamanan Site Tambang, Pos Jaga, CCTV AI & Gate Pass
              </h1>
              <p className="text-xs text-slate-400 max-w-2xl mt-1">
                Pemantauan real-time lalu lintas kendaraan gate pass, kesiapsiagaan personel PAM Satpam & TNI/POLRI Obvitnas, patroli QR checkpoint, pemantauan CCTV AI ANPR 24/7, dan penanganan Berita Acara Pemeriksaan (BAP) insiden keamanan site.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setShowGatePassRegisterModal(true)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                Registrasi Gate Pass Baru
              </button>
              <button
                onClick={() => setShowSecurityIncidentModal(true)}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Lapor BAP Insiden Keamanan
              </button>
              <button
                onClick={() => setShowCctvLiveModal(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Video className="w-4 h-4 text-emerald-400" />
                Pantau Live CCTV Stream
              </button>
            </div>
          </div>

          {/* Executive Security Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Personel PAM On Shift</span>
              <p className="text-2xl font-extrabold text-indigo-400 font-mono">42 / 45 <span className="text-xs font-normal text-slate-400">Guard</span></p>
              <span className="text-[10px] text-emerald-400 block font-bold">✓ Satpam, Kontraktor & TNI/POLRI</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Gate Traffic Throughput</span>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono">184 <span className="text-xs font-normal text-slate-400">Unit/Jam</span></p>
              <span className="text-[10px] text-slate-400 block font-mono">ANPR Gate 01 & Port Jetty</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">CCTV Live Camera Feeds</span>
              <p className="text-2xl font-extrabold text-sky-400 font-mono">24 / 24 <span className="text-xs font-normal text-slate-400">Online</span></p>
              <span className="text-[10px] text-sky-400 block font-bold">LPR ANPR AI License Active</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Patrol Checkpoint Status</span>
              <p className="text-2xl font-extrabold text-amber-300 font-mono">100% <span className="text-xs font-normal text-slate-400">Ronda OK</span></p>
              <span className="text-[10px] text-slate-400 block font-mono">18/18 Checkpoint QR Cleared</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px] font-semibold block">Insiden Keamanan / BAP</span>
              <p className="text-2xl font-extrabold text-emerald-400 font-mono">0 <span className="text-xs font-normal text-slate-400">Kritis</span></p>
              <span className="text-[10px] text-amber-400 block font-bold">2 Peringatan Suspek Minor</span>
            </div>
          </div>

          {/* Interactive Visual Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: Traffic Gate Clearance Volume */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-indigo-400" />
                    Grafik Volume Traffic Gate Clearance (24 Jam Terakhir)
                  </h3>
                  <p className="text-[11px] text-slate-400">Jumlah Kendaraan Masuk & Keluar Melalui Turnstile / Boom Barrier Gate</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 font-mono">ANPR Sensor</span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { time: '00:00', hauling: 45, lightVehicle: 12, vendor: 5 },
                    { time: '04:00', hauling: 38, lightVehicle: 8, vendor: 3 },
                    { time: '08:00', hauling: 92, lightVehicle: 45, vendor: 28 },
                    { time: '12:00', hauling: 110, lightVehicle: 52, vendor: 34 },
                    { time: '16:00', hauling: 105, lightVehicle: 48, vendor: 30 },
                    { time: '20:00', hauling: 78, lightVehicle: 22, vendor: 14 },
                    { time: '23:59', hauling: 60, lightVehicle: 15, vendor: 8 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="hauling" name="Truk Hauling Ore" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} />
                    <Area type="monotone" dataKey="lightVehicle" name="Light Vehicle (LV)" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="vendor" name="Truk Logistik Vendor" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.15} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Security Patrol Findings & Incidents */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                    Distribusi Temuan Patroli & Kategori Insiden Keamanan
                  </h3>
                  <p className="text-[11px] text-slate-400">Rekapitulasi Laporan Ronda Checkpoint & Temuan Petugas PAM</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 font-mono">Bulan Ini</span>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { category: 'Gate Speeding', count: 18, severity: 'LOW' },
                    { category: 'Tanpa APD Gate', count: 12, severity: 'LOW' },
                    { category: 'Trespassing Warga', count: 5, severity: 'MEDIUM' },
                    { category: 'Suspek BBM Solar', count: 2, severity: 'HIGH' },
                    { category: 'Pencurian Ore Nikel', count: 0, severity: 'CRITICAL' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="category" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={11} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                    <Bar dataKey="count" name="Jumlah Kasus/Temuan" fill="#3b82f6" radius={[6, 6, 0, 0]}>
                      {[
                        { color: '#10b981' },
                        { color: '#06b6d4' },
                        { color: '#f59e0b' },
                        { color: '#f43f5e' },
                        { color: '#881337' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Interactive Security Gate Pass & Live Patrol Inspection Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  Log Real-Time Gate Pass Clearance & Portal Check-In
                </h3>
                <p className="text-[11px] text-slate-400">Verifikasi Izin Keluar-Masuk Kendaraan, Material Ore, Serta Pengunjung Site Tambang</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Filter Pos Jaga */}
                <select
                  value={securityGateFilter}
                  onChange={(e) => setSecurityGateFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-indigo-500 font-semibold"
                >
                  <option value="ALL">Semua Pos Jaga Gate</option>
                  <option value="Gate 01 Utama">Pos Gate 01 Utama</option>
                  <option value="Gate Jetty Port">Pos Gate Jetty Port</option>
                  <option value="Pos Pit Alpha">Pos Gate Pit Alpha</option>
                  <option value="Pos Workshop">Pos Gate Workshop</option>
                </select>

                {/* Filter Kategori Clearance */}
                <select
                  value={securityCategoryFilter}
                  onChange={(e) => setSecurityCategoryFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-indigo-500 font-semibold"
                >
                  <option value="ALL">Semua Kategori Clearance</option>
                  <option value="MATERIAL_OUTBOUND">Outbound Ore Nikel / Cargo</option>
                  <option value="INBOUND_SUPPLIES">Inbound Solar / BBM & Sparepart</option>
                  <option value="VISITOR_PASS">Visitor & Tamu VIP</option>
                  <option value="PATROL_CHECKPOINT">Ronda Patroli Security</option>
                </select>

                {/* Search */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Cari Driver / Nopol / No. Pass..."
                    value={securitySearch}
                    onChange={(e) => setSecuritySearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:border-indigo-500 w-48 font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <th className="p-3">No. Gate Pass</th>
                    <th className="p-3">Pos Jaga</th>
                    <th className="p-3">Tipe Access</th>
                    <th className="p-3">Driver / Personel</th>
                    <th className="p-3">No. Polisi / ID</th>
                    <th className="p-3">Tujuan / Cargo</th>
                    <th className="p-3">Status Clearance</th>
                    <th className="p-3">Petugas PAM</th>
                    <th className="p-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                  {[
                    {
                      passNo: 'GP-2026-8801',
                      gatePos: 'Gate 01 Utama',
                      passType: 'MATERIAL_OUTBOUND',
                      driverName: 'Rudi Hermawan',
                      vehiclePlate: 'DT-8821-NK',
                      cargoDetail: 'Hauling Ore Nikel Low-Grade 32.4 Ton',
                      clearanceStatus: 'INSPECTION_OK_PASSED',
                      verifiedBy: 'Sertu Dani (TNI PAM)'
                    },
                    {
                      passNo: 'GP-2026-8802',
                      gatePos: 'Gate Jetty Port',
                      passType: 'INBOUND_SUPPLIES',
                      driverName: 'Sujono Prasetyo',
                      vehiclePlate: 'B-9812-UFK',
                      cargoDetail: 'Pertamina High Speed Diesel 16,000 L',
                      clearanceStatus: 'INSPECTION_OK_PASSED',
                      verifiedBy: 'Aipda Hendra (POLRI PAM)'
                    },
                    {
                      passNo: 'GP-2026-8803',
                      gatePos: 'Gate 01 Utama',
                      passType: 'VISITOR_PASS',
                      driverName: 'Mr. Zhang Wei (VIP Consultant)',
                      vehiclePlate: 'L-1290-A',
                      cargoDetail: 'Inspeksi Smelter & Quality Ore Audit',
                      clearanceStatus: 'INSPECTION_OK_PASSED',
                      verifiedBy: 'Regu 1 Satpam Site'
                    },
                    {
                      passNo: 'GP-2026-8804',
                      gatePos: 'Pos Pit Alpha',
                      passType: 'PATROL_CHECKPOINT',
                      driverName: 'Patroli Security Unit 4x4',
                      vehiclePlate: 'SEC-01-SITE',
                      cargoDetail: 'Ronda Perimeter Utara Pit Alpha',
                      clearanceStatus: 'PATROL_CLEARED',
                      verifiedBy: 'Bripka Tri (POLRI)'
                    }
                  ]
                  .filter(item => {
                    const matchesGate = securityGateFilter === 'ALL' || item.gatePos === securityGateFilter;
                    const matchesCategory = securityCategoryFilter === 'ALL' || item.passType === securityCategoryFilter;
                    const matchesSearch = !securitySearch || 
                      item.driverName.toLowerCase().includes(securitySearch.toLowerCase()) ||
                      item.vehiclePlate.toLowerCase().includes(securitySearch.toLowerCase()) ||
                      item.passNo.toLowerCase().includes(securitySearch.toLowerCase());
                    return matchesGate && matchesCategory && matchesSearch;
                  })
                  .map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                      <td className="p-3 font-bold text-indigo-400">{row.passNo}</td>
                      <td className="p-3 text-slate-300 font-sans">{row.gatePos}</td>
                      <td className="p-3 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          row.passType === 'MATERIAL_OUTBOUND' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                          row.passType === 'INBOUND_SUPPLIES' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          row.passType === 'VISITOR_PASS' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        }`}>
                          {row.passType}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-white font-bold">{row.driverName}</td>
                      <td className="p-3 text-emerald-400 font-bold">{row.vehiclePlate}</td>
                      <td className="p-3 font-sans text-slate-300 max-w-xs truncate">{row.cargoDetail}</td>
                      <td className="p-3 font-sans">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 w-fit">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          {row.clearanceStatus}
                        </span>
                      </td>
                      <td className="p-3 font-sans text-slate-400 text-[11px]">{row.verifiedBy}</td>
                      <td className="p-3 text-right font-sans">
                        <button
                          onClick={() => alert(`Mencetak Surat Digital Gate Pass ${row.passNo} (${row.driverName} - ${row.vehiclePlate})...`)}
                          className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-[11px] font-bold border border-indigo-500/30 transition-all flex items-center gap-1 ml-auto"
                        >
                          <Download className="w-3 h-3" />
                          Gate Pass PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Registrasi Gate Pass Baru */}
          {showGatePassRegisterModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Registrasi Surat Izin Gate Pass Kendaraan</h3>
                  </div>
                  <button onClick={() => setShowGatePassRegisterModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Gate Pass Clearance Kendaraan berhasil diterbitkan dan disinkronkan ke Turnstile Boom Barrier Gate!");
                  setShowGatePassRegisterModal(false);
                }} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Pos Gate Pemeriksaan:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500">
                        <option>Pos Gate 01 Utama</option>
                        <option>Pos Gate Jetty Port</option>
                        <option>Pos Gate Pit Alpha</option>
                        <option>Pos Gate Workshop</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Tipe Izin Akses:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500">
                        <option value="MATERIAL_OUTBOUND">Outbound Cargo / Ore Nikel</option>
                        <option value="INBOUND_SUPPLIES">Inbound Bahan Bakar / Sparepart</option>
                        <option value="VISITOR_PASS">Buku Tamu / Visitor VIP</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nama Pengemudi / Tamu:</label>
                      <input type="text" placeholder="Misal: Bambang Heru" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500" required />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Nomor Polisi / Identitas:</label>
                      <input type="text" placeholder="Misal: DT-8822-NK" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500 font-mono" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Detail Muatan / Rincian Kunjungan:</label>
                    <textarea rows={2} placeholder="Rincian tonase ore, muatan solar, atau tujuan inspeksi..." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-indigo-500" />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowGatePassRegisterModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Terbitkan Gate Pass Digital
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Laporan BAP Insiden Keamanan */}
          {showSecurityIncidentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-400" />
                    <h3 className="text-base font-bold text-white">Laporan BAP & Insiden Keamanan Site</h3>
                  </div>
                  <button onClick={() => setShowSecurityIncidentModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Berita Acara Pemeriksaan (BAP) Insiden Keamanan berhasil dibuat dan diteruskan ke KTT, Security Manager, & Polsek Terkait!");
                  setShowSecurityIncidentModal(false);
                }} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kategori Keamanan:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500">
                        <option>Penyusupan / Trespassing Warga</option>
                        <option>Percobaan Pencurian BBM Solar / Sparepart</option>
                        <option>Pelanggaran Kecepatan / Aturan Gate</option>
                        <option>Perselisihan / Perkelahian Area Mess</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Tingkat Keparahan:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500">
                        <option>SEDANG (Medium Warning)</option>
                        <option>TINGGI (High Security Concern)</option>
                        <option>KRITIS (Critical - Panggil Kepolisian/PAM TNI)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Lokasi Kejadian:</label>
                    <input type="text" placeholder="Misal: Perimeter Barat Pit Alpha KM 12" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500" required />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Deskripsi Kejadian / Kronologi Singkat:</label>
                    <textarea rows={3} placeholder="Tuliskan kronologi singkat, barang bukti, dan saksi..." className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-rose-500" required />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowSecurityIncidentModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Kirim & Simpan BAP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Live Stream CCTV AI Preview */}
          {showCctvLiveModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
              <div className="max-w-3xl w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Live CCTV AI Video Feed Stream</h3>
                  </div>
                  <button onClick={() => setShowCctvLiveModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-semibold">Pilih Kamera CCTV Live:</span>
                    <select
                      value={selectedCctvCamera}
                      onChange={(e) => setSelectedCctvCamera(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-emerald-400 font-mono text-xs rounded-xl px-3 py-1.5 focus:border-emerald-500"
                    >
                      <option>CAM-01 Gate Utama ANPR</option>
                      <option>CAM-02 Jetty Port Conveyor</option>
                      <option>CAM-03 Stockpile ETR West</option>
                      <option>CAM-04 Pit Alpha Rim Perimeter</option>
                    </select>
                  </div>

                  <div className="relative aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
                    <div className="flex justify-between items-center z-10">
                      <span className="px-2.5 py-1 rounded bg-rose-600 text-white font-black text-[10px] tracking-wider uppercase animate-pulse flex items-center gap-1">
                        ● LIVE STREAM
                      </span>
                      <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-700 text-emerald-400 font-mono text-xs">
                        {selectedCctvCamera} • 1080p 60fps
                      </span>
                    </div>

                    {/* Simulated AI Detection Overlay Box */}
                    <div className="my-auto mx-auto w-64 h-32 border-2 border-dashed border-emerald-400/80 rounded-xl flex flex-col items-center justify-center p-2 bg-emerald-500/10 backdrop-blur-xs">
                      <span className="text-emerald-300 font-mono font-bold text-xs uppercase tracking-wider">
                        [AI ANPR DETECTED]
                      </span>
                      <span className="text-white font-mono font-black text-sm bg-slate-900 px-2 py-0.5 rounded border border-emerald-500 mt-1">
                        NOPOL: DT-8821-NK
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold mt-1">
                        ✓ GATE CLEARANCE VALID PASS
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-slate-400 font-mono z-10 bg-slate-950/80 p-2 rounded-lg border border-slate-800">
                      <span>FPS: 60 • Latency: 12ms</span>
                      <span>AI Model: YOLOv8 Nikel ANPR v4.2</span>
                      <span>GPS: 02°14'28.4"S 121°24'10.2"E</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowCctvLiveModal(false)}
                    className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                  >
                    Tutup Live Preview
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD LABORATORY CHEMIST & QUALITY CONTROL QA/QC */}
      {(activeTab === 'laboratory' || activeTab === 'quality_control' || activeTab === 'qa_qc') && (
        <div className="space-y-6">
          {/* Header Banner Laboratory */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-indigo-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Mine Site Laboratory & Quality Control QA/QC
                </span>
                <span className="text-slate-400 text-xs">• ISO/IEC 17025 Accredited & Sucofindo/SGS Verification</span>
              </div>
              <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
                <TestTube className="w-6 h-6 text-teal-400" />
                Dasbor Laboratory Chemist, Grade QA/QC & Certificate of Analysis (COA)
              </h1>
              <p className="text-xs text-slate-400 max-w-2xl mt-1">
                Pengawasan real-time hasil uji sampel ore nikel (Ni, Fe, Co, SiO2, MgO, Moisture Content), penerbitan COA digital, kalibrasi alat XRF/ICP-OES, serta pengujian sengketa re-assay klaim kadar smelter.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setShowAddLabSampleModal(true)}
                className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                Input Sampel Lab Baru
              </button>
              <button
                onClick={() => setShowCoaCertificateModal(true)}
                className="px-3.5 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <FileCheck2 className="w-4 h-4 text-indigo-400" />
                Terbitkan COA Digital
              </button>
              <button
                onClick={() => setShowLabReagentModal(true)}
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-sm"
              >
                <FlaskConical className="w-4 h-4 text-amber-400" />
                Stok Reagen & CRM
              </button>
            </div>
          </div>

          {/* Sub-Tab Navigation inside Laboratory Module */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => setLabSubTab('DASHBOARD')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                labSubTab === 'DASHBOARD'
                  ? 'bg-teal-600 text-white shadow-lg ring-1 ring-teal-400'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>1. 🎯 Dasbor Operasional Quality Control (QA/QC) & Analisa Assay Lab</span>
            </button>
            <button
              onClick={() => setLabSubTab('MASTER_DATA_LAB')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                labSubTab === 'MASTER_DATA_LAB'
                  ? 'bg-teal-600 text-white shadow-lg ring-1 ring-teal-400'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>2. 🗄️ Master Data Quality Control (QA/QC), Matriks & Standard Quality</span>
            </button>
          </div>

          {/* SUB-TAB 1: DASBOR OPERASIONAL LAB & ANALISA ASSAY */}
          {labSubTab === 'DASHBOARD' && (
            <div className="space-y-6">
              {/* Executive Key Laboratory Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] font-semibold block">Total Sampel Ditest (Bulan Ini)</span>
                  <p className="text-2xl font-extrabold text-teal-400 font-mono">1,280 <span className="text-xs font-normal text-slate-400">Sampel</span></p>
                  <span className="text-[10px] text-teal-400 block font-bold">✓ 100% Turnaround &lt; 24 Jam</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] font-semibold block">Rata-Rata Kadar Ni % (High Sap)</span>
                  <p className="text-2xl font-extrabold text-emerald-400 font-mono">1.84% <span className="text-xs font-normal text-slate-400">Ni</span></p>
                  <span className="text-[10px] text-emerald-300 block font-bold">ICP-OES / XRF Validated</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] font-semibold block">Rata-Rata Moisture Content (MC)</span>
                  <p className="text-2xl font-extrabold text-indigo-400 font-mono">31.2% <span className="text-xs font-normal text-slate-400">MC</span></p>
                  <span className="text-[10px] text-indigo-300 block font-bold">Aman untuk Barging &lt; 35%</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] font-semibold block">Rasio Silica / Magnesia (S/M)</span>
                  <p className="text-2xl font-extrabold text-amber-300 font-mono">2.08 <span className="text-xs font-normal text-slate-400">Ratio</span></p>
                  <span className="text-[10px] text-amber-400 block font-bold">Optimal Smelter RKEF Specs</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-slate-400 text-[11px] font-semibold block">Re-Assay Dispute Claim Rate</span>
                  <p className="text-2xl font-extrabold text-rose-400 font-mono">0.08% <span className="text-xs font-normal text-slate-400">Dispute</span></p>
                  <span className="text-[10px] text-slate-400 block font-mono">Batas ISO 17025 &lt; 0.5%</span>
                </div>
              </div>

              {/* Interactive Visual Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart 1: Trend Kadar Ni % & Fe % per Shift Sampling */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Activity className="w-4 h-4 text-teal-400" />
                        Tren Fluktuasi Kadar Ni % & Fe % per Shift Sampling (7 Hari Terakhir)
                      </h3>
                      <p className="text-[11px] text-slate-400">Hasil Uji Spektrometri XRF Pit Alpha, Pit Beta & Stockpile EFO</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/20 text-teal-300 font-mono">XRF / ICP</span>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={[
                        { shift: '31 Jul S1', niPct: 1.82, fePct: 18.1, mcPct: 30.5 },
                        { shift: '31 Jul S2', niPct: 1.86, fePct: 18.5, mcPct: 31.0 },
                        { shift: '01 Ags S1', niPct: 1.80, fePct: 17.9, mcPct: 32.1 },
                        { shift: '01 Ags S2', niPct: 1.88, fePct: 18.6, mcPct: 29.8 },
                        { shift: '02 Ags S1', niPct: 1.83, fePct: 18.2, mcPct: 31.5 },
                        { shift: '02 Ags S2', niPct: 1.85, fePct: 18.4, mcPct: 30.9 },
                        { shift: '03 Ags S1', niPct: 1.89, fePct: 18.8, mcPct: 30.2 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="shift" stroke="#94a3b8" fontSize={11} />
                        <YAxis yAxisId="left" stroke="#38bdf8" fontSize={11} domain={[1.5, 2.1]} />
                        <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={11} domain={[15, 22]} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                        <Bar yAxisId="right" dataKey="fePct" name="Kadar Besi Fe %" fill="#f59e0b" radius={[4, 4, 0, 0]} opacity={0.6} />
                        <Line yAxisId="left" type="monotone" dataKey="niPct" name="Kadar Nikel Ni %" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Moisture Content & S/M Ratio vs Smelter Specs */}
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-indigo-400" />
                        Distribusi Moisture Content (MC %) & S/M Ratio vs Ambang Batas Smelter
                      </h3>
                      <p className="text-[11px] text-slate-400">Pengawasan Kadar Air Tongkang & Rasio Silica/Magnesia untuk RKEF</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 font-mono">Barging Safe</span>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { batch: 'Stockpile ETO-01', mcPct: 31.0, smRatio: 2.12 },
                        { batch: 'Stockpile ETO-02', mcPct: 32.5, smRatio: 2.05 },
                        { batch: 'Stockpile EFO-01', mcPct: 29.8, smRatio: 2.18 },
                        { batch: 'Stockpile EFO-02', mcPct: 30.2, smRatio: 2.02 },
                        { batch: 'Barge BG 3001', mcPct: 31.5, smRatio: 2.10 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="batch" stroke="#94a3b8" fontSize={10} />
                        <YAxis stroke="#94a3b8" fontSize={11} />
                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }} />
                        <Bar dataKey="mcPct" name="Moisture Content (MC %)" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        <Bar dataKey="smRatio" name="SiO2/MgO Ratio (S/M)" fill="#10b981" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Sample Log & Certificate of Analysis (COA) Verification Table */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      <FileCheck2 className="w-5 h-5 text-teal-400" />
                      Register Assay Laboratory & Certificate of Analysis (COA)
                    </h3>
                    <p className="text-[11px] text-slate-400">Verifikasi Kadar Ni %, Fe %, MC %, Rasio S/M, dan Pengesahan Surveyor Independen</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <select
                      value={labGradeFilter}
                      onChange={(e) => setLabGradeFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-teal-500 font-semibold"
                    >
                      <option value="ALL">Semua Grade Ore</option>
                      <option value="HIGH_SAPROLITE">High Saprolite (&gt; 1.8% Ni)</option>
                      <option value="MEDIUM_SAPROLITE">Medium Saprolite (1.5% - 1.8% Ni)</option>
                      <option value="LIMONITE">Limonite Low Grade (&lt; 1.5% Ni)</option>
                    </select>

                    <select
                      value={labStatusFilter}
                      onChange={(e) => setLabStatusFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:border-teal-500 font-semibold"
                    >
                      <option value="ALL">Semua Status COA</option>
                      <option value="VERIFIED_COA">COA Terbit & Disetujui</option>
                      <option value="TESTING_IN_PROGRESS">Sedang Pengujian Assay</option>
                      <option value="DISPUTE_REASSAY">Permohonan Re-Assay Sengketa</option>
                    </select>

                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Cari ID Sampel / Lokasi / Chemist..."
                        value={labSearch}
                        onChange={(e) => setLabSearch(e.target.value)}
                        className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:border-teal-500 w-48 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                        <th className="p-3">ID Sampel Lab</th>
                        <th className="p-3">Lokasi Sampling / Pad</th>
                        <th className="p-3">Metode Pengujian</th>
                        <th className="p-3">Kadar Ni %</th>
                        <th className="p-3">Kadar Fe %</th>
                        <th className="p-3">Moisture (MC)</th>
                        <th className="p-3">Rasio S/M</th>
                        <th className="p-3">Chief Chemist / Inspector</th>
                        <th className="p-3">Status COA</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                      {[
                        {
                          id: 'SPL-20260803-091',
                          padCode: 'STK-ETO-01 Pit Alpha',
                          method: 'XRF Spectrometry (WDXRF)',
                          niPct: 1.84,
                          fePct: 18.2,
                          mcPct: 31.0,
                          smRatio: 2.12,
                          gradeType: 'HIGH_SAPROLITE',
                          chemist: 'Anwar, S.Si (Chief Chemist)',
                          status: 'VERIFIED_COA',
                          surveyor: 'Sucofindo'
                        },
                        {
                          id: 'SPL-20260803-092',
                          padCode: 'STK-EFO-02 Stockpile Central',
                          method: 'ICP-OES High Precision Assay',
                          niPct: 1.78,
                          fePct: 19.1,
                          mcPct: 29.5,
                          smRatio: 2.05,
                          gradeType: 'MEDIUM_SAPROLITE',
                          chemist: 'Siti Aminah (Lab Tech)',
                          status: 'VERIFIED_COA',
                          surveyor: 'SGS Indonesia'
                        },
                        {
                          id: 'SPL-20260802-088',
                          padCode: 'Tongkang BG 3001 Jetty 1',
                          method: 'Moisture Oven Test + XRF',
                          niPct: 1.80,
                          fePct: 18.0,
                          mcPct: 34.2,
                          smRatio: 2.10,
                          gradeType: 'HIGH_SAPROLITE',
                          chemist: 'Budi Santoso (Lab Inspector)',
                          status: 'VERIFIED_COA',
                          surveyor: 'Carsurin'
                        },
                        {
                          id: 'SPL-20260804-101',
                          padCode: 'Pit Beta Highwall Ramp',
                          method: 'Preparasi Crusher & Pulverizer',
                          niPct: 1.91,
                          fePct: 17.5,
                          mcPct: 30.1,
                          smRatio: 2.18,
                          gradeType: 'HIGH_SAPROLITE',
                          chemist: 'Rahmat (Sr. Chemist)',
                          status: 'TESTING_IN_PROGRESS',
                          surveyor: 'In-House Site Lab'
                        },
                        {
                          id: 'SPL-20260801-075',
                          padCode: 'EFO Stockpile #3 Claim Re-Assay',
                          method: 'Titration Wet Chemistry Dispute',
                          niPct: 1.76,
                          fePct: 18.8,
                          mcPct: 32.0,
                          smRatio: 2.01,
                          gradeType: 'MEDIUM_SAPROLITE',
                          chemist: 'Dr. Hendra (Lab Superintendent)',
                          status: 'DISPUTE_REASSAY',
                          surveyor: 'Anindya Virencya'
                        }
                      ]
                      .filter(item => labGradeFilter === 'ALL' || item.gradeType === labGradeFilter)
                      .filter(item => labStatusFilter === 'ALL' || item.status === labStatusFilter)
                      .filter(item => !labSearch || 
                        item.id.toLowerCase().includes(labSearch.toLowerCase()) ||
                        item.padCode.toLowerCase().includes(labSearch.toLowerCase()) ||
                        item.chemist.toLowerCase().includes(labSearch.toLowerCase())
                      )
                      .map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 font-bold text-teal-400">{row.id}</td>
                          <td className="p-3 font-sans text-white font-bold">{row.padCode}</td>
                          <td className="p-3 font-sans text-slate-300">{row.method}</td>
                          <td className="p-3 font-bold text-emerald-400">{row.niPct}% Ni</td>
                          <td className="p-3 font-bold text-amber-300">{row.fePct}% Fe</td>
                          <td className="p-3 font-bold text-indigo-300">{row.mcPct}% MC</td>
                          <td className="p-3 font-bold text-teal-300">{row.smRatio}</td>
                          <td className="p-3 font-sans text-slate-300">{row.chemist}</td>
                          <td className="p-3 font-sans">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1 w-fit ${
                              row.status === 'VERIFIED_COA' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                              row.status === 'TESTING_IN_PROGRESS' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                              'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}>
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              {row.status}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button
                              onClick={() => alert(`Mencetak Certificate of Analysis (COA) Official ${row.id} oleh ${row.surveyor}...`)}
                              className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 text-[11px] font-bold border border-teal-500/30 transition-all flex items-center gap-1 ml-auto"
                            >
                              <Download className="w-3 h-3" />
                              Cetak COA PDF
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

          {/* SUB-TAB 2: MASTER DATA LABORATORY CHEMIST & QA/QC */}
          {labSubTab === 'MASTER_DATA_LAB' && (
            <div className="space-y-6 text-xs">
              {/* Master Sub-Tabs Selector */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
                {[
                  { id: 'ELEMENTS', label: '1. Master Unsur & Target Quality Assay' },
                  { id: 'EQUIPMENT', label: '2. Master Peralatan & Instrumentasi Lab' },
                  { id: 'REAGENTS', label: '3. Master Reagen & Bahan Kimia' },
                  { id: 'SURVEYORS', label: '4. Master Surveyor Independen & Lab Rujukan' }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setMasterLabSubTab(sub.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                      masterLabSubTab === sub.id
                        ? 'bg-teal-600 text-white shadow-lg ring-1 ring-teal-400'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>

              {/* Master Sub-Tab 1: Unsur & Target Quality Assay */}
              {masterLabSubTab === 'ELEMENTS' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Microscope className="w-4 h-4 text-teal-400" />
                        Daftar Master Parameter Unsur Kimia & Standar Toleransi Assay Lab
                      </h3>
                      <p className="text-[11px] text-slate-400">Parameter Baku XRF & ICP-OES untuk Nikel, Besi, Kobalt, Silika, Magnesia, dan Moisture Content</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <th className="p-3">Kode Unsur</th>
                          <th className="p-3">Nama Unsur Kimia</th>
                          <th className="p-3">Target Range Standard</th>
                          <th className="p-3">Toleransi ISO 17025</th>
                          <th className="p-3">Metode Assay Primer</th>
                          <th className="p-3">Status Matriks</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                        {[
                          { code: 'PAR-NI', name: 'Nickel (Ni)', range: '1.40% - 2.10%', tolerance: '± 0.03% Ni', method: 'XRF Spectrometry & ICP-OES', status: 'ACTIVE_MANDATORY' },
                          { code: 'PAR-FE', name: 'Iron (Fe)', range: '15.0% - 48.0%', tolerance: '± 0.20% Fe', method: 'WDXRF & Titrasi Wet Chem', status: 'ACTIVE_MANDATORY' },
                          { code: 'PAR-CO', name: 'Cobalt (Co)', range: '0.05% - 0.25%', tolerance: '± 0.01% Co', method: 'ICP-OES High Sensitivity', status: 'ACTIVE_MANDATORY' },
                          { code: 'PAR-SIO2', name: 'Silica (SiO2)', range: '30.0% - 45.0%', tolerance: '± 0.30% SiO2', method: 'XRF Fusion Bead', status: 'ACTIVE_MANDATORY' },
                          { code: 'PAR-MGO', name: 'Magnesia (MgO)', range: '12.0% - 24.0%', tolerance: '± 0.25% MgO', method: 'XRF Fusion Bead', status: 'ACTIVE_MANDATORY' },
                          { code: 'PAR-MC', name: 'Moisture Content (MC)', range: '28.0% - 35.0%', tolerance: '± 0.50% MC', method: 'Drying Oven 105°C 24 Jam', status: 'ACTIVE_MANDATORY' },
                          { code: 'PAR-SM', name: 'Silica/Magnesia Ratio (S/M)', range: '1.80 - 2.30', tolerance: '± 0.05 S/M Ratio', method: 'Calculated Parameter', status: 'ACTIVE_MANDATORY' }
                        ].map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="p-3 font-bold text-teal-400">{item.code}</td>
                            <td className="p-3 text-white font-bold font-sans">{item.name}</td>
                            <td className="p-3 font-mono text-emerald-300">{item.range}</td>
                            <td className="p-3 font-mono text-amber-300">{item.tolerance}</td>
                            <td className="p-3 font-sans text-slate-300">{item.method}</td>
                            <td className="p-3 font-sans">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ✓ {item.status}
                              </span>
                            </td>
                            <td className="p-3 text-right font-sans">
                              <button onClick={() => alert(`Mengedit Parameter ${item.name}`)} className="text-teal-400 hover:underline font-bold text-[11px]">Edit Master</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master Sub-Tab 2: Peralatan & Instrumentasi Lab */}
              {masterLabSubTab === 'EQUIPMENT' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <TestTube className="w-4 h-4 text-indigo-400" />
                        Daftar Master Instrumentasi Lab & Jadwal Kalibrasi Kalibrasi
                      </h3>
                      <p className="text-[11px] text-slate-400">Spektrometer XRF Rigaku, ICP-OES PerkinElmer, Crusher Preparasi & Oven Drying</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <th className="p-3">ID Alat / Serial</th>
                          <th className="p-3">Nama Alat Instrumentasi</th>
                          <th className="p-3">Kategori Lab</th>
                          <th className="p-3">Jadwal Kalibrasi Terakhir</th>
                          <th className="p-3">Lembaga Kalibrasi (KAN)</th>
                          <th className="p-3">Status Kondisi</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                        {[
                          { id: 'XRF-2024-889', name: 'XRF Spectrometer Rigaku Primus IV (WDXRF)', cat: 'Spectrometry', calibDate: '15 Juni 2026', body: 'KAN / BSN Accredited', status: 'CALIBRATED_OPERATIONAL' },
                          { id: 'ICP-2025-102', name: 'ICP-OES PerkinElmer Avio 500 High Precision', cat: 'Plasma Spectrometry', calibDate: '20 Juli 2026', body: 'PerkinElmer Official', status: 'CALIBRATED_OPERATIONAL' },
                          { id: 'PLV-004', name: 'Heavy Duty Jaw Crusher & Pulverizer Fritsch', cat: 'Sample Prep Lab', calibDate: 'Bulanan Internal', body: 'Internal Calibration', status: 'READY_OPERATIONAL' },
                          { id: 'OVN-302', name: 'Drying Oven Memmert Universal (105°C ± 2°C)', cat: 'Thermal Prep', calibDate: '10 Mei 2026', body: 'KAN Calibration Lab', status: 'CALIBRATED_OPERATIONAL' },
                          { id: 'BAL-201', name: 'Analytical Balance Mettler Toledo XPR205 (0.0001g)', cat: 'Precision Weighing', calibDate: '01 Juli 2026', body: 'Mettler Toledo ID', status: 'CALIBRATED_OPERATIONAL' }
                        ].map((eq, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="p-3 font-bold text-indigo-400">{eq.id}</td>
                            <td className="p-3 text-white font-bold font-sans">{eq.name}</td>
                            <td className="p-3 font-sans text-teal-300 font-bold">{eq.cat}</td>
                            <td className="p-3 font-mono text-slate-300">{eq.calibDate}</td>
                            <td className="p-3 font-sans text-slate-300">{eq.body}</td>
                            <td className="p-3 font-sans">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ✓ {eq.status}
                              </span>
                            </td>
                            <td className="p-3 text-right font-sans">
                              <button onClick={() => alert(`Mengedit Sertifikat Kalibrasi Alat ${eq.name}`)} className="text-teal-400 hover:underline font-bold text-[11px]">Edit Master</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master Sub-Tab 3: Reagen & Bahan Kimia */}
              {masterLabSubTab === 'REAGENTS' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <FlaskConical className="w-4 h-4 text-amber-400" />
                        Daftar Master Stok Reagen Kimia & Certified Reference Material (CRM)
                      </h3>
                      <p className="text-[11px] text-slate-400">Asam Nitrat, Asam Klorida, Standard CRM OREAS, Flux Lithium Borate & Gas Argon</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <th className="p-3">Kode Bahan</th>
                          <th className="p-3">Nama Reagen / Standard CRM</th>
                          <th className="p-3">Stok Volume / Berat</th>
                          <th className="p-3">Tanggal Kedaluwarsa</th>
                          <th className="p-3">Produsen / Supplier</th>
                          <th className="p-3">Status Ketersediaan</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                        {[
                          { code: 'REA-001', name: 'Asam Nitrat (HNO3) 65% Pure Grade', qty: '120 Liter', expiry: 'Desember 2027', supplier: 'PT Merck Indonesia', status: 'STOCK_SAFE' },
                          { code: 'REA-002', name: 'Asam Klorida (HCl) 37% Technical Grade', qty: '200 Liter', expiry: 'Oktober 2027', supplier: 'PT Indochemical', status: 'STOCK_SAFE' },
                          { code: 'CRM-184', name: 'Standard Reference Material CRM OREAS 184', qty: '45 Vials (10g)', expiry: 'Januari 2029', supplier: 'OREAS Australia', status: 'STOCK_SAFE' },
                          { code: 'FLX-002', name: 'Lithium Tetraborate Flux (XRF Fusion)', qty: '80 Kg', expiry: 'Maret 2028', supplier: 'Claisse Malvern', status: 'STOCK_SAFE' },
                          { code: 'GAS-ARG', name: 'Gas Argon High Purity 99.999% (ICP Plasma)', qty: '12 Tabung 50L', expiry: 'Agustus 2027', supplier: 'PT Samator Gas', status: 'STOCK_SAFE' }
                        ].map((rg, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="p-3 font-bold text-amber-400">{rg.code}</td>
                            <td className="p-3 text-white font-bold font-sans">{rg.name}</td>
                            <td className="p-3 font-bold text-emerald-400">{rg.qty}</td>
                            <td className="p-3 font-mono text-slate-300">{rg.expiry}</td>
                            <td className="p-3 font-sans text-slate-300">{rg.supplier}</td>
                            <td className="p-3 font-sans">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ✓ {rg.status}
                              </span>
                            </td>
                            <td className="p-3 text-right font-sans">
                              <button onClick={() => alert(`Restok Reagen ${rg.name}`)} className="text-teal-400 hover:underline font-bold text-[11px]">Restok Reagen</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master Sub-Tab 4: Surveyor Independen & Lab Rujukan */}
              {masterLabSubTab === 'SURVEYORS' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Award className="w-4 h-4 text-emerald-400" />
                        Daftar Master Surveyor Independen & Laboratorium Rujukan Resmi ESDM
                      </h3>
                      <p className="text-[11px] text-slate-400">Sucofindo, SGS, Carsurin, Anindya Virencya, Intertek Terakreditasi KAN ISO/IEC 17025</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <th className="p-3">ID Surveyor</th>
                          <th className="p-3">Nama Perusahaan Surveyor Independen</th>
                          <th className="p-3">Cabang Lab Terdekat</th>
                          <th className="p-3">Sertifikat Akreditasi KAN</th>
                          <th className="p-3">Masa Berlaku Izin ESDM</th>
                          <th className="p-3">Status Kemitraan</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                        {[
                          { id: 'SUR-SUCO', name: 'PT Sucofindo (Persero)', branch: 'Lab Kendari & Morowali', kanAccreditation: 'LP-012-IDN ISO 17025', validity: '31 Des 2028', status: 'OFFICIAL_SURVEYOR' },
                          { id: 'SUR-SGS', name: 'PT SGS Indonesia', branch: 'Lab Halmahera Weda Bay', kanAccreditation: 'LP-048-IDN ISO 17025', validity: '15 Okt 2028', status: 'OFFICIAL_SURVEYOR' },
                          { id: 'SUR-CARS', name: 'PT Carsurin Tbk', branch: 'Lab Pomalaa & Morowali', kanAccreditation: 'LP-112-IDN ISO 17025', validity: '20 Mei 2028', status: 'OFFICIAL_SURVEYOR' },
                          { id: 'SUR-ANIN', name: 'PT Anindya Virencya Nusantara', branch: 'Lab Palu & Konawe', kanAccreditation: 'LP-088-IDN ISO 17025', validity: '10 Nov 2027', status: 'OFFICIAL_SURVEYOR' },
                          { id: 'SUR-INTE', name: 'PT Intertek Utama Services', branch: 'Lab Makassar & Jakarta', kanAccreditation: 'LP-035-IDN ISO 17025', validity: '18 Ags 2028', status: 'OFFICIAL_SURVEYOR' }
                        ].map((srv, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="p-3 font-bold text-teal-400">{srv.id}</td>
                            <td className="p-3 text-white font-bold font-sans">{srv.name}</td>
                            <td className="p-3 font-sans text-indigo-300 font-bold">{srv.branch}</td>
                            <td className="p-3 font-mono text-emerald-300">{srv.kanAccreditation}</td>
                            <td className="p-3 font-mono text-slate-300">{srv.validity}</td>
                            <td className="p-3 font-sans">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                ✓ {srv.status}
                              </span>
                            </td>
                            <td className="p-3 text-right font-sans">
                              <button onClick={() => alert(`Mengedit Data Surveyor ${srv.name}`)} className="text-teal-400 hover:underline font-bold text-[11px]">Edit Master</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modal Input Sampel Lab Baru */}
          {showAddLabSampleModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-teal-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <TestTube className="w-5 h-5 text-teal-400" />
                    <h3 className="text-base font-bold text-white">Input Sampel Lab Assay Ore Nikel Baru</h3>
                  </div>
                  <button onClick={() => setShowAddLabSampleModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Hasil Uji Sampel Lab berhasil dicatat dan diproses dalam database assay!");
                  setShowAddLabSampleModal(false);
                }} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">ID Sampel Lab:</label>
                      <input type="text" defaultValue="SPL-20260806-105" className="w-full bg-slate-950 border border-slate-700 text-teal-300 rounded-xl p-2.5 font-mono font-bold" required />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Lokasi Sampling / Pit:</label>
                      <input type="text" placeholder="Misal: Stockpile ETO Alpha-1" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-teal-500" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kadar Ni (%):</label>
                      <input type="number" step="0.01" defaultValue="1.85" className="w-full bg-slate-950 border border-slate-700 text-emerald-400 font-bold rounded-xl p-2.5" required />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kadar Fe (%):</label>
                      <input type="number" step="0.1" defaultValue="18.2" className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-bold rounded-xl p-2.5" required />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Moisture (MC %):</label>
                      <input type="number" step="0.1" defaultValue="31.0" className="w-full bg-slate-950 border border-slate-700 text-indigo-300 font-bold rounded-xl p-2.5" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Chief Chemist / Penanggung Jawab:</label>
                    <input type="text" defaultValue="Anwar, S.Si (Chief Chemist)" className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5 focus:border-teal-500" required />
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowAddLabSampleModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Simpan Sampel Lab
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal Terbitkan COA Digital */}
          {showCoaCertificateModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-indigo-400" />
                    <h3 className="text-base font-bold text-white">Penerbitan Certificate of Analysis (COA) Digital</h3>
                  </div>
                  <button onClick={() => setShowCoaCertificateModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Surveyor Terakreditasi:</span>
                      <strong className="text-white font-bold">PT Sucofindo (Persero)</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Metode Spektrometri:</span>
                      <span className="text-indigo-300 font-bold">WDXRF ISO/IEC 17025 Standard</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Status Verifikasi:</span>
                      <strong className="text-emerald-400 font-bold">✓ VERIFIED & APPROVED FOR BARGING</strong>
                    </div>
                  </div>

                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Sertifikat Analisis ini diterbitkan secara elektronik dengan pengesahan digital Chief Chemist dan cap resmi Surveyor Independen.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowCoaCertificateModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert("Certificate of Analysis (COA) Digital berhasil diterbitkan dan diunggah!");
                      setShowCoaCertificateModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    Terbitkan COA Digital PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Modal Kelola Reagen Kimia */}
          {showLabReagentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-amber-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <FlaskConical className="w-5 h-5 text-amber-400" />
                    <h3 className="text-base font-bold text-white">Kelola Stok Reagen & Standard CRM Lab</h3>
                  </div>
                  <button onClick={() => setShowLabReagentModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <div className="space-y-3 text-xs">
                  <p className="text-slate-300 leading-relaxed">
                    Seluruh reagen kimia dan Certified Reference Material (CRM) OREAS dalam kondisi stok aman dan terkalibrasi sesuai standar ISO 17025.
                  </p>
                </div>

                <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowLabReagentModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                  >
                    Tutup
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert("Permintaan Restok Reagen Kimia Lab berhasil dikirim ke Procurement!");
                      setShowLabReagentModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-extrabold flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    Kirim Order Reagen
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* DASHBOARD WAREHOUSE & INVENTORY */}
      {(activeTab === 'inventory' || activeTab === 'warehouse' || activeTab === 'gudang') && (
        <WarehouseInventoryModule language={language} initialTab="dasbor_warehouse" />
      )}

      {/* MASTER DATA WAREHOUSE */}
      {(activeTab === 'master_warehouse' || activeTab === 'master_data_warehouse') && (
        <WarehouseInventoryModule language={language} initialTab="master_data_inventory" />
      )}

      {false && null && (
        <div className="space-y-6">
          {/* Header Banner Inventory */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Site Logistics & Inventory Management
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                  ERP SAP / FIFO Engine
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-2 flex items-center gap-2.5">
                <Package className="w-7 h-7 text-emerald-400" />
                Dasbor Inventory Manager, Stock Turnover & Master Data SKU
              </h2>
              <p className="text-slate-300 text-xs mt-1 max-w-3xl">
                Monitoring real-time nilai inventaris gudang site ($4.8M USD), rasio perputaran stok (ITR 6.8x), kontrol safety stock minimum, scan QR/Barcode, dan database master katalog sparepart alat berat (CAT, Komatsu).
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowAddSkuModal(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                Tambah Master SKU
              </button>
            </div>
          </div>

          {/* Sub-Tab Selector: Operasional Inventory vs Master Data Inventory */}
          <div className="flex items-center gap-3 bg-slate-900/90 p-2 rounded-2xl border border-slate-800">
            <button
              onClick={() => setInvSubTab('OPERATIONAL_INVENTORY')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                invSubTab === 'OPERATIONAL_INVENTORY'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>1. 📦 Dasbor Operasional Inventory & Pergerakan Stok</span>
            </button>
            <button
              onClick={() => setInvSubTab('MASTER_DATA_INVENTORY')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                invSubTab === 'MASTER_DATA_INVENTORY'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>2. 🗄️ Master Data Inventory, Katalog SKU & Matriks Gudang</span>
            </button>
          </div>

          {/* SUB-TAB 1: OPERATIONAL INVENTORY & PERGERAKAN STOK */}
          {invSubTab === 'OPERATIONAL_INVENTORY' && (
            <div className="space-y-6">
              {/* Summary Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Valuasi Total Stok FIFO</span>
                  <div className="text-xl font-black text-amber-400 font-mono">$4,820,500</div>
                  <span className="text-[10px] text-slate-400 block font-sans">3,420 Active Material SKUs</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Stock Turnover Rate (ITR)</span>
                  <div className="text-xl font-black text-emerald-400 font-mono">6.8x / Thn</div>
                  <span className="text-[10px] text-emerald-300 font-bold block">✓ Optimal Target &gt; 6.0x</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Low Stock Alert (Reorder)</span>
                  <div className="text-xl font-black text-rose-400 font-mono">14 SKUs</div>
                  <span className="text-[10px] text-rose-300 font-bold block">⚠️ Dibawah Min Safety Stock</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pengeluaran (GIS) Bulanan</span>
                  <div className="text-xl font-black text-indigo-400 font-mono">$680,000</div>
                  <span className="text-[10px] text-slate-400 block">1,840 Items Processed</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Akurasi Stock Opname</span>
                  <div className="text-xl font-black text-teal-400 font-mono">99.4%</div>
                  <span className="text-[10px] text-teal-300 font-bold block">✓ Fisik vs Sistem Matched</span>
                </div>
              </div>

              {/* Data Table Filter & Controls */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Boxes className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Status Stok Inventaris & Minimum Level Reorder</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                      <Search className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari SKU, Part No, Deskripsi..."
                        value={invSearch}
                        onChange={(e) => setInvSearch(e.target.value)}
                        className="bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none w-48"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-300">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <span>Kategori:</span>
                      <select
                        value={invCategoryFilter}
                        onChange={(e) => setInvCategoryFilter(e.target.value)}
                        className="bg-transparent text-emerald-400 font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="ALL" className="bg-slate-900">Semua Kategori</option>
                        <option value="Heavy OTR Tyre" className="bg-slate-900">Heavy OTR Tyre</option>
                        <option value="Filters & Separation" className="bg-slate-900">Filters & Separation</option>
                        <option value="Engine & Hydraulic Parts" className="bg-slate-900">Engine & Hydraulic Parts</option>
                        <option value="Lubricants & Fuel" className="bg-slate-900">Lubricants & Fuel</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Table Inventory Stock */}
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                        <th className="p-3">Kode SKU</th>
                        <th className="p-3">Deskripsi & Spesifikasi Material</th>
                        <th className="p-3">Kategori</th>
                        <th className="p-3">Gudang & Bin Rak</th>
                        <th className="p-3 text-right">Stok Fisik</th>
                        <th className="p-3 text-right">Min / Max</th>
                        <th className="p-3 text-right">Valuasi FIFO ($)</th>
                        <th className="p-3">Status Stok</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                      {[
                        { sku: 'SKU-TYRE-777E', name: 'Ban OTR 27.00R49 Bridgestone VSDL (Dump Truck CAT 777E)', cat: 'Heavy OTR Tyre', wh: 'WH-MAIN-SITE (RACK-TYRE-A04)', qty: 18, min: 8, max: 30, unit: 'PCS', valUsd: 14200, status: 'NORMAL' },
                        { sku: 'SKU-FLTR-HYD-KOM', name: 'Filter Element Hydraulic Main Return Komatsu PC2000', cat: 'Filters & Separation', wh: 'WH-PIT-DEPOT (BIN-FLT-B12)', qty: 12, min: 15, max: 80, unit: 'PCS', valUsd: 220, status: 'LOW_REORDER' },
                        { sku: 'SKU-OIL-15W40-SHL', name: 'Oli Pelumas Shell Rimula R4 X 15W-40 Heavy Duty', cat: 'Lubricants & Fuel', wh: 'WH-JETTY-STORE (DRUM-ZONE-C01)', qty: 45, min: 20, max: 100, unit: 'DRUM', valUsd: 850, status: 'NORMAL' },
                        { sku: 'SKU-PSTN-CAT-C15', name: 'Piston Kit Engine CAT C15 ACERT (Haul Truck)', cat: 'Engine & Hydraulic Parts', wh: 'WH-MAIN-SITE (RACK-ENG-E02)', qty: 6, min: 10, max: 25, unit: 'SET', valUsd: 3400, status: 'LOW_REORDER' },
                        { sku: 'SKU-FLTR-FUEL-RAC', name: 'Fuel Water Separator Racor Turbine Series 1000FH', cat: 'Filters & Separation', wh: 'WH-PIT-DEPOT (BIN-FLT-B08)', qty: 55, min: 20, max: 100, unit: 'PCS', valUsd: 185, status: 'NORMAL' }
                      ]
                      .filter(item => invCategoryFilter === 'ALL' || item.cat === invCategoryFilter)
                      .filter(item => !invSearch ||
                        item.sku.toLowerCase().includes(invSearch.toLowerCase()) ||
                        item.name.toLowerCase().includes(invSearch.toLowerCase()) ||
                        item.cat.toLowerCase().includes(invSearch.toLowerCase())
                      )
                      .map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/50 transition-colors">
                          <td className="p-3 font-bold text-emerald-400">{row.sku}</td>
                          <td className="p-3 font-sans text-white font-semibold max-w-xs">{row.name}</td>
                          <td className="p-3 font-sans text-slate-300">{row.cat}</td>
                          <td className="p-3 font-sans text-slate-400 text-[11px]">{row.wh}</td>
                          <td className="p-3 text-right font-bold text-white text-sm">{row.qty} {row.unit}</td>
                          <td className="p-3 text-right text-slate-400">{row.min} / {row.max}</td>
                          <td className="p-3 text-right font-bold text-amber-400">${(row.valUsd * row.qty).toLocaleString('en-US')}</td>
                          <td className="p-3 font-sans">
                            <span className={`px-2.5 py-1 rounded text-[10px] font-extrabold uppercase ${
                              row.status === 'NORMAL' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                            }`}>
                              {row.status === 'NORMAL' ? '✓ Stok Aman' : '⚠️ Low Stock (Order)'}
                            </span>
                          </td>
                          <td className="p-3 text-right font-sans">
                            <button
                              onClick={() => alert(`Cetak QR Code / Barcode Label untuk ${row.sku}`)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 transition-all flex items-center gap-1 ml-auto"
                            >
                              <QrCode className="w-3 h-3" />
                              Label QR
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

          {/* SUB-TAB 2: MASTER DATA INVENTORY & KATALOG SKU */}
          {invSubTab === 'MASTER_DATA_INVENTORY' && (
            <div className="space-y-6 text-xs">
              {/* Inner Master Selector */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
                {[
                  { id: 'SKU_CATALOG', label: '1. Master Katalog SKU & Part Number' },
                  { id: 'RACK_LOCATIONS', label: '2. Master Lokasi Gudang & Bin Layout' },
                  { id: 'VENDORS', label: '3. Master Vendor & OEM Manufacturer' },
                  { id: 'UOM_UNITS', label: '4. Master Satuan Unit (UOM) & Konversi' }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => setMasterInvSubTab(sub.id as any)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 ${
                      masterInvSubTab === sub.id
                        ? 'bg-emerald-600 text-white shadow-lg ring-1 ring-emerald-400'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{sub.label}</span>
                  </button>
                ))}
              </div>

              {/* Master Sub-Tab 1: Katalog SKU */}
              {masterInvSubTab === 'SKU_CATALOG' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Package className="w-4 h-4 text-emerald-400" />
                        Database Master Katalog Material & Spareparts Alat Berat (SKU)
                      </h3>
                      <p className="text-[11px] text-slate-400">Master data part number OEM, lead time pemesanan, unit price standar, dan safety level</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <th className="p-3">Kode SKU</th>
                          <th className="p-3">Deskripsi Item</th>
                          <th className="p-3">OEM Cross-Ref</th>
                          <th className="p-3">Lead Time</th>
                          <th className="p-3 text-right">Standard Price ($)</th>
                          <th className="p-3">Satuan (UOM)</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                        {[
                          { sku: 'SKU-TYRE-777E', desc: 'Ban OTR 27.00R49 Bridgestone VSDL', oem: 'BS-2700R49-VSDL', leadTime: '45 Hari', price: 14200, uom: 'PCS' },
                          { sku: 'SKU-FLTR-HYD-KOM', desc: 'Filter Element Hydraulic Komatsu PC2000', oem: 'KOM-208-60-71120', leadTime: '14 Hari', price: 220, uom: 'PCS' },
                          { sku: 'SKU-OIL-15W40-SHL', desc: 'Oli Pelumas Shell Rimula R4 X 15W-40', oem: 'SHL-RIM-15W40-209L', leadTime: '7 Hari', price: 850, uom: 'DRUM' },
                          { sku: 'SKU-PSTN-CAT-C15', desc: 'Piston Kit Engine CAT C15 ACERT', oem: 'CAT-348-2384', leadTime: '21 Hari', price: 3400, uom: 'SET' }
                        ].map((m, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="p-3 font-bold text-emerald-400">{m.sku}</td>
                            <td className="p-3 text-white font-bold font-sans">{m.desc}</td>
                            <td className="p-3 font-mono text-slate-300">{m.oem}</td>
                            <td className="p-3 font-sans text-amber-300 font-bold">{m.leadTime}</td>
                            <td className="p-3 text-right font-bold text-white">${m.price.toLocaleString('en-US')}</td>
                            <td className="p-3 font-sans text-teal-300 font-bold">{m.uom}</td>
                            <td className="p-3 text-right font-sans">
                              <button onClick={() => alert(`Edit Master SKU ${m.sku}`)} className="text-emerald-400 hover:underline font-bold text-[11px]">Edit Master</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master Sub-Tab 2: Lokasi Gudang */}
              {masterInvSubTab === 'RACK_LOCATIONS' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-indigo-400" />
                        Master Layout Gudang Site, Zone & Rak Storage
                      </h3>
                      <p className="text-[11px] text-slate-400">Pengelolaan master area penyimpanan, total bin rack, dan kapasitas gudang</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <th className="p-3">Kode Gudang</th>
                          <th className="p-3">Nama Gudang & Lokasi</th>
                          <th className="p-3">Kategori Area</th>
                          <th className="p-3 text-right">Total Bins</th>
                          <th className="p-3 text-right">Okupansi (%)</th>
                          <th className="p-3">Kepala Gudang (PIC)</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                        {[
                          { code: 'WH-MAIN', name: 'Gudang Utama Central (Main Site Warehouse)', cat: 'General Spareparts & Tyres', bins: 450, occ: '78%', pic: 'Ahmad Subagyo' },
                          { code: 'WH-PIT', name: 'Depot Pit Alpha Warehouse (Fast-Moving)', cat: 'Filters, Oils & Hoses', bins: 120, occ: '62%', pic: 'Deni Setiawan' },
                          { code: 'WH-JETTY', name: 'Gudang Logistik Pelabuhan Jetty', cat: 'Barging Consumables & Hazmat', bins: 85, occ: '45%', pic: 'Rudy Hartono' }
                        ].map((w, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="p-3 font-bold text-indigo-400">{w.code}</td>
                            <td className="p-3 text-white font-bold font-sans">{w.name}</td>
                            <td className="p-3 font-sans text-slate-300">{w.cat}</td>
                            <td className="p-3 text-right font-bold text-white">{w.bins} Bins</td>
                            <td className="p-3 text-right font-bold text-emerald-400">{w.occ}</td>
                            <td className="p-3 font-sans text-slate-300">{w.pic}</td>
                            <td className="p-3 text-right font-sans">
                              <button onClick={() => alert(`Edit Gudang ${w.code}`)} className="text-indigo-400 hover:underline font-bold text-[11px]">Edit Master</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master Sub-Tab 3: Vendor */}
              {masterInvSubTab === 'VENDORS' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-400" />
                        Master Dealer Resmi & Vendor Spareparts OEM
                      </h3>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <th className="p-3">Nama Vendor</th>
                          <th className="p-3">Merk OEM / Brand</th>
                          <th className="p-3">Rating Vendor</th>
                          <th className="p-3">Status Kemitraan</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                        {[
                          { vendor: 'PT Trakindo Utama', brand: 'Caterpillar (CAT)', rating: '4.9 ★', status: 'AUTHORIZED_DEALER' },
                          { vendor: 'PT United Tractors Tbk', brand: 'Komatsu & Scania', rating: '4.9 ★', status: 'AUTHORIZED_DEALER' },
                          { vendor: 'PT Fleetguard Indonesia', brand: 'Cummins & Donaldson Filters', rating: '4.8 ★', status: 'OFFICIAL_SUPPLIER' }
                        ].map((v, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="p-3 text-white font-bold font-sans">{v.vendor}</td>
                            <td className="p-3 font-mono text-amber-300">{v.brand}</td>
                            <td className="p-3 font-bold text-emerald-400">{v.rating}</td>
                            <td className="p-3 font-sans">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                {v.status}
                              </span>
                            </td>
                            <td className="p-3 text-right font-sans">
                              <button onClick={() => alert(`Edit Vendor ${v.vendor}`)} className="text-amber-400 hover:underline font-bold text-[11px]">Edit Master</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master Sub-Tab 4: Satuan UOM */}
              {masterInvSubTab === 'UOM_UNITS' && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Boxes className="w-4 h-4 text-teal-400" />
                        Master Satuan Unit (UOM) & Konversi Satuan Inventory
                      </h3>
                    </div>
                  </div>

                  <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-950 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-800">
                          <th className="p-3">Satuan Dasar (Base UOM)</th>
                          <th className="p-3">Rasio Konversi</th>
                          <th className="p-3">Penggunaan Utama</th>
                          <th className="p-3 text-right">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 font-mono text-slate-200">
                        {[
                          { base: 'DRUM (Oli Pelumas)', conv: '1 DRUM = 209 LITER', usage: 'Konsumsi Engine Workshop' },
                          { base: 'BOX (Filter Elements)', conv: '1 BOX = 12 PCS', usage: 'Penerimaan GRN & Stacking' },
                          { base: 'PALLET (Grease Bucket)', conv: '1 PALLET = 24 BUCKET', usage: 'Logistik Jetty Terminal' }
                        ].map((u, idx) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="p-3 font-bold text-teal-300">{u.base}</td>
                            <td className="p-3 font-bold text-emerald-400">{u.conv}</td>
                            <td className="p-3 font-sans text-slate-300">{u.usage}</td>
                            <td className="p-3 text-right font-sans">
                              <button onClick={() => alert(`Edit Konversi ${u.base}`)} className="text-teal-400 hover:underline font-bold text-[11px]">Edit Master</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Modal Input Master SKU Baru */}
          {showAddSkuModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="max-w-lg w-full p-6 rounded-2xl bg-slate-900 border border-emerald-500/40 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-emerald-400" />
                    <h3 className="text-base font-bold text-white">Input Master Data SKU / Sparepart Baru</h3>
                  </div>
                  <button onClick={() => setShowAddSkuModal(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={(e) => {
                  e.preventDefault();
                  alert("Master Data SKU Item baru berhasil didaftarkan ke ERP System!");
                  setShowAddSkuModal(false);
                }} className="space-y-3 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kode SKU Baru:</label>
                      <input type="text" defaultValue="SKU-FLTR-AIR-01" className="w-full bg-slate-950 border border-slate-700 text-emerald-300 rounded-xl p-2.5 font-mono font-bold" required />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">OEM Part Number:</label>
                      <input type="text" defaultValue="DON-P551000" className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono" required />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Deskripsi Item & Spesifikasi:</label>
                    <input type="text" defaultValue="Filter Air Cleaner Primary Donaldson CAT 777E" className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-2.5" required />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Kategori Item:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5">
                        <option>Filters & Separation</option>
                        <option>Heavy OTR Tyre</option>
                        <option>Engine & Hydraulic Parts</option>
                        <option>Lubricants & Fuel</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Lokasi Gudang & Bin:</label>
                      <select className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-xl p-2.5">
                        <option>WH-MAIN-SITE (RACK-FLT-A01)</option>
                        <option>WH-PIT-DEPOT (BIN-FLT-B01)</option>
                        <option>WH-JETTY-STORE (CHEM-Z01)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Min Safety:</label>
                      <input type="number" defaultValue={10} className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono" required />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Max Stock:</label>
                      <input type="number" defaultValue={50} className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-xl p-2.5 font-mono" required />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">Standard Cost ($):</label>
                      <input type="number" defaultValue={150} className="w-full bg-slate-950 border border-slate-700 text-amber-300 rounded-xl p-2.5 font-mono font-bold" required />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowAddSkuModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Simpan Master SKU
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dasbor Purchasing */}
      {activeTab === 'purchasing' && (
        <ProcurementContractModule language={language} initialTab="dasbor_purchasing" />
      )}

      {/* Master Data Purchasing */}
      {activeTab === 'master_purchasing' && (
        <ProcurementContractModule language={language} initialTab="master_purchasing" />
      )}

    </div>
  );
};
