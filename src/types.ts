/**
 * SmartMine AI Indonesia - Global Types & Data Interfaces
 */

export type Language = 'id' | 'en';
export type ThemeMode = 'dark' | 'light';

export type UserRole = 
  | 'Super Admin'
  | 'License Owner'
  | 'Company Owner'
  | 'Corporate Director'
  | 'Commissioner'
  | 'CEO'
  | 'COO'
  | 'Finance Director'
  | 'HR Director'
  | 'Mine Manager'
  | 'Operation Manager'
  | 'Production Manager'
  | 'Geologist'
  | 'Mine Engineer'
  | 'Surveyor'
  | 'Dispatcher'
  | 'Fleet Manager'
  | 'Workshop Manager'
  | 'Maintenance Manager'
  | 'Warehouse'
  | 'Purchasing'
  | 'Inventory'
  | 'Quality Control'
  | 'Laboratory'
  | 'Safety Officer'
  | 'HSE Manager'
  | 'Security'
  | 'Medical'
  | 'Environment Officer'
  | 'Community Development'
  | 'Legal'
  | 'Accounting'
  | 'Finance'
  | 'Payroll'
  | 'Tax'
  | 'Auditor'
  | 'Vendor'
  | 'Supplier'
  | 'Transporter'
  | 'Client'
  | 'Guest'
  | 'Employee';

export interface LicenseInfo {
  licenseKey: string;
  companyName: string;
  tier: 'Standard Mine' | 'Smelter & Mine Pro' | 'Enterprise Unlimited' | 'Holding Group' | 'Trial Mode' | 'Expired';
  seats: number;
  usedSeats: number;
  status: 'ACTIVE' | 'EXPIRED' | 'SUSPENDED' | 'TRIAL' | 'GRACE_PERIOD';
  expiresAt: string;
  activatedAt: string;
  modules: string[];
  maxDevices?: number;
  activeDevicesCount?: number;
  iupNumber?: string;
  encryptedToken?: string;
  activationMode?: 'ONLINE' | 'OFFLINE_CHALLENGE';
}

export interface RegisteredDevice {
  id: string;
  deviceName: string;
  hwid: string; // e.g. HWID-MOR-9921-A9F
  registeredAt: string;
  lastActive: string;
  location: string;
  ipAddress: string;
  status: 'AUTHORIZED' | 'PENDING' | 'REVOKED';
}

export interface UserSession {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: UserRole;
  ipAddress: string;
  location: string;
  deviceInfo: string;
  loginTime: string;
  lastActivity: string;
  isCurrent: boolean;
  twoFactorVerified: boolean;
  biometricAuthenticated: boolean;
}

export interface AuditLoginLog {
  id: string;
  userEmail: string;
  role: UserRole;
  method: 'EMAIL' | 'PHONE_OTP' | 'GOOGLE' | 'MICROSOFT' | 'BIOMETRIC_FACE_ID' | 'FINGERPRINT';
  ipAddress: string;
  status: 'SUCCESS' | 'INVALID_OTP' | 'DEVICE_BLOCKED' | 'SUSPICIOUS_IP';
  timestamp: string;
  details: string;
}

export interface Company {
  id: string;
  code: string;
  name: string;
  type: 'Mining Holding' | 'IUP-OP Nickel Mine' | 'Smelter RKEF/HPAL' | 'Mining Contractor' | 'Jetty & Logistics';
  registrationNo: string; // e.g. IUP-OP No. 540/128/ESDM
  headquarters: string; // e.g. Jakarta / Morowali
  sitesCount: number;
  pitsCount: number;
  departmentsCount: number;
  usersCount: number;
  annualRkabMT: number;
  status: 'ACTIVE' | 'HOLD' | 'INACTIVE';
}

export interface Department {
  id: string;
  companyId: string;
  code: string;
  name: string;
  headOfDepartment: string;
  budgetAllocatedIDR: number;
  activeStaffCount: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CompanyUser {
  id: string;
  companyId: string;
  departmentId: string;
  name: string;
  email: string;
  role: UserRole;
  siteId?: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ON_LEAVE';
  lastLogin: string;
}

export interface MineSite {
  id: string;
  companyId?: string;
  name: string;
  location: string; // e.g. Morowali, Sulawesi Tengah
  concessionSizeHa: number;
  rkabTargetMTAnnual: number;
  rkabActualMTYTD: number;
  activePitsCount: number;
  status: 'Operational' | 'Maintenance' | 'Weather Standby';
}

export interface PitOperation {
  id: string;
  pitName: string;
  siteId: string;
  elevationM: number;
  strippingRatioTarget: number;
  strippingRatioActual: number;
  overburdenMTToday: number;
  saproliteMTToday: number;
  limoniteMTToday: number;
  weatherCondition: 'Cerah' | 'Hujan Ringan' | 'Hujan Deras / Mud Hazard' | 'Berawan';
  safetyStatus: 'SAFE' | 'WARNING' | 'CRITICAL';
}

export interface OreStockpile {
  id: string;
  code: string;
  name: string; // e.g. Stockpile EFO Saprolite 01
  locationType: 'ETO' | 'EFO' | 'Waste Dump' | 'Jetty Port Stock';
  currentTonnageMT: number;
  maxCapacityMT: number;
  niGradePercent: number; // e.g. 1.85%
  feGradePercent: number; // e.g. 18.2%
  moistureContentPercent: number; // e.g. 29.5%
  sio2Percent: number;
  mgoPercent: number;
  sio2MgoRatio: number;
  qualityTag: 'High Grade Saprolite (>=1.8%)' | 'Medium Grade Saprolite (1.5-1.79%)' | 'Limonite Saprolite (<1.5%)';
  lastUpdated: string;
}

export interface HeavyEquipment {
  id: string;
  code: string; // e.g. EXC-201
  type: 'Excavator Heavy' | 'Dump Truck Heavy' | 'Bulldozer' | 'Wheel Loader' | 'Barge Tugboat';
  modelName: string; // e.g. Komatsu PC2000-8
  locationPit: string;
  assignedOperator: string;
  engineHoursTotal: number;
  fuelLiterPerHour: number;
  fuelTotalTodayLiters: number;
  status: 'OPERATIONAL' | 'MAINTENANCE' | 'BREAKDOWN' | 'STANDBY';
  healthScorePercent: number;
  nextServiceDueDate: string;
}

export interface BargeShipment {
  id: string;
  shipmentCode: string; // e.g. BKN-SHIP-2026-088
  bargeName: string; // e.g. BG. Robby 3012
  tugboatName: string; // e.g. TB. Trans Power 08
  targetSmelterName: string; // e.g. PT Sulawesi Mining Investment
  destinationPort: string; // e.g. Jetty Morowali / Halmahera
  targetTonnageMT: number;
  loadedTonnageMT: number;
  coalSurveyorCertNo: string; // Sucofindo/Carsurin
  status: 'QUEUED' | 'LOADING' | 'DRAFT_SURVEY' | 'DEPARTED' | 'DELIVERED';
  etaDate: string;
  niGradeSurveyor: number;
  moistureSurveyor: number;
  demurrageUSDPerDay: number;
}

export interface HPMPriceBenchmark {
  basePriceUSDPerDMT: number; // e.g. $16,450
  correctionFactorHPM: number; // 0.20 for Saprolite
  saproliteBaseNi1_8: number; // USD per DMT
  limoniteBaseNi1_3: number; // USD per DMT
  dmoComplianceRatePercent: number; // e.g. 100%
  lastUpdatedDate: string;
}

export interface SafetyIncidentLog {
  id: string;
  date: string;
  type: 'NEAR_MISS' | 'PROPERTY_DAMAGE' | 'MINOR_INJURY' | 'GEOTECHNICAL_SLIP';
  location: string;
  description: string;
  investigationStatus: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED';
  severityLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  reporter: string;
}

export interface OfflineSyncItem {
  id: string;
  timestamp: string;
  module: string;
  action: string;
  payload: any;
  status: 'QUEUED' | 'SYNCED' | 'FAILED';
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  category: 'SAFETY' | 'OPERATIONS' | 'AI_ALERT' | 'HPM' | 'SYSTEM';
  read: boolean;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
}

export interface APIToken {
  id: string;
  name: string;
  keySnippet: string;
  rolePermissions: string[];
  createdDate: string;
  lastUsedDate: string;
  status: 'ACTIVE' | 'REVOKED';
}
