import { 
  MineSite, 
  PitOperation, 
  OreStockpile, 
  HeavyEquipment, 
  BargeShipment, 
  HPMPriceBenchmark, 
  SafetyIncidentLog, 
  LicenseInfo, 
  PushNotification,
  APIToken,
  Company,
  Department,
  CompanyUser,
  RegisteredDevice,
  UserSession,
  AuditLoginLog
} from '../types';

export const INITIAL_LICENSE: LicenseInfo = {
  licenseKey: "SMARTMINE-IND-2026-ENT-8839",
  companyName: "PT Nickel Mining Nusantara Tbk",
  tier: "Enterprise Unlimited",
  seats: 250,
  usedSeats: 48,
  status: "ACTIVE",
  expiresAt: "2027-12-31",
  activatedAt: "2026-01-01",
  modules: ["exploration", "fleet", "stockpile", "jetty", "smelter", "hse", "rkab", "ai_assistant", "api_hub", "offline_sync"]
};

export const INITIAL_SITES: MineSite[] = [
  {
    id: "SITE-MOROWALI",
    name: "Bahodopi Mining Block Alpha",
    location: "Morowali, Sulawesi Tengah",
    concessionSizeHa: 4250,
    rkabTargetMTAnnual: 3000000,
    rkabActualMTYTD: 1845000,
    activePitsCount: 4,
    status: "Operational"
  },
  {
    id: "SITE-HALMAHERA",
    name: "Weda Bay Ore Reserve Pit B",
    location: "Halmahera Tengah, Maluku Utara",
    concessionSizeHa: 6100,
    rkabTargetMTAnnual: 4500000,
    rkabActualMTYTD: 2890000,
    activePitsCount: 6,
    status: "Operational"
  },
  {
    id: "SITE-POMALAA",
    name: "Kolaka Saprolite Mine Block 3",
    location: "Kolaka, Sulawesi Tenggara",
    concessionSizeHa: 2800,
    rkabTargetMTAnnual: 1800000,
    rkabActualMTYTD: 1120000,
    activePitsCount: 3,
    status: "Weather Standby"
  }
];

export const INITIAL_PITS: PitOperation[] = [
  {
    id: "PIT-ALPHA-01",
    pitName: "Pit Alpha Utamaro",
    siteId: "SITE-MOROWALI",
    elevationM: 285,
    strippingRatioTarget: 3.8,
    strippingRatioActual: 3.6,
    overburdenMTToday: 18400,
    saproliteMTToday: 4200,
    limoniteMTToday: 2800,
    weatherCondition: "Cerah",
    safetyStatus: "SAFE"
  },
  {
    id: "PIT-BETA-02",
    pitName: "Pit Beta Saprolite High-Grade",
    siteId: "SITE-MOROWALI",
    elevationM: 310,
    strippingRatioTarget: 4.2,
    strippingRatioActual: 4.5,
    overburdenMTToday: 22100,
    saproliteMTToday: 5100,
    limoniteMTToday: 1900,
    weatherCondition: "Berawan",
    safetyStatus: "SAFE"
  },
  {
    id: "PIT-GAMMA-03",
    pitName: "Pit Gamma Limonite Deep Cut",
    siteId: "SITE-HALMAHERA",
    elevationM: 190,
    strippingRatioTarget: 3.2,
    strippingRatioActual: 3.9,
    overburdenMTToday: 15600,
    saproliteMTToday: 2100,
    limoniteMTToday: 6400,
    weatherCondition: "Hujan Ringan",
    safetyStatus: "WARNING"
  }
];

export const INITIAL_STOCKPILES: OreStockpile[] = [
  {
    id: "SP-01",
    code: "EFO-SAP-HG1",
    name: "Stockpile EFO Saprolite High Grade A",
    locationType: "EFO",
    currentTonnageMT: 28500,
    maxCapacityMT: 45000,
    niGradePercent: 1.88,
    feGradePercent: 17.4,
    moistureContentPercent: 28.2,
    sio2Percent: 39.2,
    mgoPercent: 18.5,
    sio2MgoRatio: 2.11,
    qualityTag: "High Grade Saprolite (>=1.8%)",
    lastUpdated: "2026-08-03 08:30"
  },
  {
    id: "SP-02",
    code: "ETO-SAP-MG2",
    name: "Stockpile ETO Saprolite Medium Grade B",
    locationType: "ETO",
    currentTonnageMT: 19400,
    maxCapacityMT: 35000,
    niGradePercent: 1.68,
    feGradePercent: 19.8,
    moistureContentPercent: 31.4,
    sio2Percent: 37.8,
    mgoPercent: 17.1,
    sio2MgoRatio: 2.21,
    qualityTag: "Medium Grade Saprolite (1.5-1.79%)",
    lastUpdated: "2026-08-03 09:15"
  },
  {
    id: "SP-03",
    code: "EFO-LIM-HPAL",
    name: "Stockpile EFO Limonite Feed HPAL",
    locationType: "EFO",
    currentTonnageMT: 41200,
    maxCapacityMT: 60000,
    niGradePercent: 1.28,
    feGradePercent: 44.5,
    moistureContentPercent: 33.1,
    sio2Percent: 8.4,
    mgoPercent: 2.1,
    sio2MgoRatio: 4.00,
    qualityTag: "Limonite Saprolite (<1.5%)",
    lastUpdated: "2026-08-03 10:00"
  },
  {
    id: "SP-04",
    code: "JETTY-BLND-01",
    name: "Stockpile Jetty Port Ready-Barge",
    locationType: "Jetty Port Stock",
    currentTonnageMT: 15800,
    maxCapacityMT: 25000,
    niGradePercent: 1.82,
    feGradePercent: 18.1,
    moistureContentPercent: 29.0,
    sio2Percent: 38.9,
    mgoPercent: 18.0,
    sio2MgoRatio: 2.16,
    qualityTag: "High Grade Saprolite (>=1.8%)",
    lastUpdated: "2026-08-03 10:45"
  }
];

export const INITIAL_EQUIPMENT: HeavyEquipment[] = [
  {
    id: "EQ-EXC-101",
    code: "EXC-PC2000-01",
    type: "Excavator Heavy",
    modelName: "Komatsu PC2000-8",
    locationPit: "Pit Alpha Utamaro",
    assignedOperator: "Budi Santoso",
    engineHoursTotal: 14820,
    fuelLiterPerHour: 42.5,
    fuelTotalTodayLiters: 480,
    status: "OPERATIONAL",
    healthScorePercent: 94,
    nextServiceDueDate: "2026-08-15"
  },
  {
    id: "EQ-DT-204",
    code: "DT-CAT777-04",
    type: "Dump Truck Heavy",
    modelName: "Caterpillar 777D Off-Highway",
    locationPit: "Pit Alpha Utamaro",
    assignedOperator: "Rahmat Hidayat",
    engineHoursTotal: 18950,
    fuelLiterPerHour: 58.0,
    fuelTotalTodayLiters: 640,
    status: "OPERATIONAL",
    healthScorePercent: 88,
    nextServiceDueDate: "2026-08-10"
  },
  {
    id: "EQ-DZ-302",
    code: "DZ-CATD8R-02",
    type: "Bulldozer",
    modelName: "Caterpillar D8R Heavy Duty",
    locationPit: "Pit Beta Saprolite",
    assignedOperator: "Eko Prasetyo",
    engineHoursTotal: 11200,
    fuelLiterPerHour: 34.0,
    fuelTotalTodayLiters: 380,
    status: "MAINTENANCE",
    healthScorePercent: 72,
    nextServiceDueDate: "2026-08-04"
  },
  {
    id: "EQ-TUG-08",
    code: "TB-TP08",
    type: "Barge Tugboat",
    modelName: "YanMar Marine 1200 HP Tug",
    locationPit: "Jetty Port Bahodopi",
    assignedOperator: "Capt. Hendra Gunawan",
    engineHoursTotal: 22400,
    fuelLiterPerHour: 85.0,
    fuelTotalTodayLiters: 920,
    status: "OPERATIONAL",
    healthScorePercent: 91,
    nextServiceDueDate: "2026-09-01"
  }
];

export const INITIAL_BARGES: BargeShipment[] = [
  {
    id: "SHIP-8841",
    shipmentCode: "NIK-BG-2026-0841",
    bargeName: "BG. Robby 3012 (300 ft)",
    tugboatName: "TB. Trans Power 08",
    targetSmelterName: "PT Sulawesi Mining Investment (SMI RKEF)",
    destinationPort: "Jetty Terminal SMI Morowali",
    targetTonnageMT: 7800,
    loadedTonnageMT: 7800,
    coalSurveyorCertNo: "COA/SUCO/NIKEL/2026/08-8841",
    status: "DEPARTED",
    etaDate: "2026-08-04 14:00",
    niGradeSurveyor: 1.84,
    moistureSurveyor: 29.1,
    demurrageUSDPerDay: 4500
  },
  {
    id: "SHIP-8842",
    shipmentCode: "NIK-BG-2026-0842",
    bargeName: "BG. Marine Power 3302 (330 ft)",
    tugboatName: "TB. Lautan Perkasa 12",
    targetSmelterName: "PT Halmahera Persada Lygend (HPAL)",
    destinationPort: "Jetty Terminal Obi Island",
    targetTonnageMT: 10500,
    loadedTonnageMT: 6200,
    coalSurveyorCertNo: "DRAFT-SURVEY-CAR-0992",
    status: "LOADING",
    etaDate: "2026-08-06 09:00",
    niGradeSurveyor: 1.29,
    moistureSurveyor: 32.4,
    demurrageUSDPerDay: 5200
  }
];

export const INITIAL_HPM: HPMPriceBenchmark = {
  basePriceUSDPerDMT: 16450,
  correctionFactorHPM: 0.20,
  saproliteBaseNi1_8: 52.64, // USD / DMT
  limoniteBaseNi1_3: 18.25, // USD / DMT
  dmoComplianceRatePercent: 100,
  lastUpdatedDate: "2026-08-03"
};

export const INITIAL_SAFETY_LOGS: SafetyIncidentLog[] = [
  {
    id: "INC-2026-041",
    date: "2026-08-02 15:30",
    type: "NEAR_MISS",
    location: "Haul Road km 4.2 Pit Alpha",
    description: "Dump truck DT-204 mengalami slippery akibat jalan licin setelah hujan lokal. Driver melakukan maneuvering aman ke buffer bay.",
    investigationStatus: "RESOLVED",
    severityLevel: "MEDIUM",
    reporter: "Suryadi (HSE Inspector)"
  },
  {
    id: "INC-2026-042",
    date: "2026-08-01 09:10",
    type: "GEOTECHNICAL_SLIP",
    location: "Highwall Bench 3 Pit Gamma",
    description: "Terdapat retakan tanah sepanjang 4.5 meter di area highwall akibat resapan air hujan. Barikade pengaman telah dipasang.",
    investigationStatus: "UNDER_REVIEW",
    severityLevel: "HIGH",
    reporter: "Andi Wijaya (Geotechnical Eng)"
  }
];

export const INITIAL_NOTIFICATIONS: PushNotification[] = [
  {
    id: "NOTIF-01",
    title: "AI Safety Alert: Highwall Creep Detected",
    message: "Sensor LiDAR mencatat pergerakan tanah 2.3 cm/jam di Pit Gamma. Tim geoteknik disarankan meninjau lereng.",
    time: "10 menit yang lalu",
    category: "SAFETY",
    read: false,
    priority: "URGENT"
  },
  {
    id: "NOTIF-02",
    title: "HPM Nikel ESDM Update August 2026",
    message: "HMA Nikel ditetapkan $16,450/dmt. Harga patokan Saprolite 1.8% Ni tercatat $52.64/dmt FOB.",
    time: "1 jam yang lalu",
    category: "HPM",
    read: false,
    priority: "NORMAL"
  },
  {
    id: "NOTIF-03",
    title: "Barging Loading Complete",
    message: "Barge BG. Robby 3012 selesai muat 7,800 MT Ore Saprolite. Draft Survey & Sucofindo COA diterbitkan.",
    time: "3 jam yang lalu",
    category: "OPERATIONS",
    read: true,
    priority: "NORMAL"
  }
];

export const INITIAL_API_TOKENS: APIToken[] = [
  {
    id: "TOK-SAP-ENTERPRISE",
    name: "SAP S/4HANA Inventory Sync Connector",
    keySnippet: "sm_live_992a8e****************48b1",
    rolePermissions: ["inventory.read", "inventory.write", "stockpile.read"],
    createdDate: "2026-01-15",
    lastUsedDate: "2026-08-03 10:12",
    status: "ACTIVE"
  },
  {
    id: "TOK-SUCOFINDO-COA",
    name: "Sucofindo Surveyor COA Webhook API",
    keySnippet: "sm_live_883c1f****************110d",
    rolePermissions: ["coa.write", "barging.read"],
    createdDate: "2026-02-01",
    lastUsedDate: "2026-08-03 08:30",
    status: "ACTIVE"
  }
];

export const INITIAL_COMPANIES: Company[] = [
  {
    id: "COMP-HOLDING",
    code: "NMH-HOLDING",
    name: "PT Nusantara Mining Holding Tbk",
    type: "Mining Holding",
    registrationNo: "AHU-0019283.AH.01.01.2024",
    headquarters: "Jakarta Head Office",
    sitesCount: 3,
    pitsCount: 13,
    departmentsCount: 8,
    usersCount: 245,
    annualRkabMT: 9300000,
    status: "ACTIVE"
  },
  {
    id: "COMP-MOROWALI",
    code: "PT-NMN",
    name: "PT Nusantara Nickel Morowali",
    type: "IUP-OP Nickel Mine",
    registrationNo: "IUP-OP No. 540/128/ESDM/2021",
    headquarters: "Bahodopi Site Office, Morowali",
    sitesCount: 1,
    pitsCount: 4,
    departmentsCount: 6,
    usersCount: 88,
    annualRkabMT: 3000000,
    status: "ACTIVE"
  },
  {
    id: "COMP-HALMAHERA",
    code: "PT-HMU",
    name: "PT Halmahera Mineral Utama",
    type: "IUP-OP Nickel Mine",
    registrationNo: "IUP-OP No. 881/44/ESDM/2022",
    headquarters: "Weda Bay Site Office, Halmahera Tengah",
    sitesCount: 1,
    pitsCount: 6,
    departmentsCount: 6,
    usersCount: 112,
    annualRkabMT: 4500000,
    status: "ACTIVE"
  },
  {
    id: "COMP-SMELTER",
    code: "PT-NSI",
    name: "PT Nusantara Smelter Indonesia",
    type: "Smelter RKEF/HPAL",
    registrationNo: "IUI No. 9120010928341/KEMENPERIN",
    headquarters: "Kawasan Industri Morowali (IMIP)",
    sitesCount: 1,
    pitsCount: 0,
    departmentsCount: 5,
    usersCount: 64,
    annualRkabMT: 1800000,
    status: "ACTIVE"
  },
  {
    id: "COMP-LOGISTICS",
    code: "PT-TLP",
    name: "PT Trans Logistics & Port Terminal",
    type: "Jetty & Logistics",
    registrationNo: "SIUPAL No. 042/AL.102/DJPL/2023",
    headquarters: "Pelabuhan Jetut Morowali",
    sitesCount: 1,
    pitsCount: 0,
    departmentsCount: 4,
    usersCount: 35,
    annualRkabMT: 0,
    status: "ACTIVE"
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  {
    id: "DEPT-GEO",
    companyId: "COMP-MOROWALI",
    code: "GEO-EXPLORATION",
    name: "Geology & Ore Reserve Exploration",
    headOfDepartment: "Dr. Ir. Bambang Hermanto, M.T.",
    budgetAllocatedIDR: 12500000000,
    activeStaffCount: 14,
    status: "ACTIVE"
  },
  {
    id: "DEPT-MINE-ENG",
    companyId: "COMP-MOROWALI",
    code: "MINE-PLANNING",
    name: "Mine Engineering & Production Planning",
    headOfDepartment: "Hendra Wijaya, S.T.",
    budgetAllocatedIDR: 45000000000,
    activeStaffCount: 22,
    status: "ACTIVE"
  },
  {
    id: "DEPT-FLEET",
    companyId: "COMP-MOROWALI",
    code: "HEAVY-FLEET",
    name: "Heavy Equipment Fleet & Workshop Maintenance",
    headOfDepartment: "Rudi Hartono",
    budgetAllocatedIDR: 68000000000,
    activeStaffCount: 38,
    status: "ACTIVE"
  },
  {
    id: "DEPT-HSE",
    companyId: "COMP-MOROWALI",
    code: "K3LH-ENVIRONMENT",
    name: "K3LH Mining Safety & Environmental ESG",
    headOfDepartment: "Suryadi, S.K.M.",
    budgetAllocatedIDR: 8500000000,
    activeStaffCount: 12,
    status: "ACTIVE"
  },
  {
    id: "DEPT-COMMERCIAL",
    companyId: "COMP-HOLDING",
    code: "SALES-HPM",
    name: "Ore Sales, HPM Marketing & Smelter Contracts",
    headOfDepartment: "Clarissa Sutedja, M.B.A.",
    budgetAllocatedIDR: 18000000000,
    activeStaffCount: 9,
    status: "ACTIVE"
  },
  {
    id: "DEPT-PORT",
    companyId: "COMP-LOGISTICS",
    code: "JETTY-BARGING",
    name: "Jetty Logistics, Barging & Surveyor COA",
    headOfDepartment: "Capt. Agus Supriyanto",
    budgetAllocatedIDR: 24000000000,
    activeStaffCount: 18,
    status: "ACTIVE"
  }
];

export const INITIAL_REGISTERED_DEVICES: RegisteredDevice[] = [
  {
    id: "DEV-001",
    deviceName: "Morowali HQ Master Dispatch Workstation #01",
    hwid: "HWID-MOR-9921-A9F-WIN11",
    registeredAt: "2026-01-10 08:00",
    lastActive: "2026-08-03 11:24",
    location: "Bahodopi Main Control Room",
    ipAddress: "10.240.12.101",
    status: "AUTHORIZED"
  },
  {
    id: "DEV-002",
    deviceName: "Pit Alpha Panasonic Toughbook Field Tablet",
    hwid: "HWID-TOUGH-8819-B4X-ANDROID",
    registeredAt: "2026-02-14 09:15",
    lastActive: "2026-08-03 10:50",
    location: "Pit Alpha Ore Face",
    ipAddress: "10.240.18.44",
    status: "AUTHORIZED"
  },
  {
    id: "DEV-003",
    deviceName: "Jetty Master Barging Scale Terminal",
    hwid: "HWID-JETTY-7731-C2Z-LINUX",
    registeredAt: "2026-03-01 14:20",
    lastActive: "2026-08-03 09:12",
    location: "Jetty Port Control Tower",
    ipAddress: "10.240.25.12",
    status: "AUTHORIZED"
  },
  {
    id: "DEV-004",
    deviceName: "Jakarta Executive Director MacBook Pro",
    hwid: "HWID-JKT-1102-M3MAX-MACOS",
    registeredAt: "2026-04-18 11:00",
    lastActive: "2026-08-03 11:30",
    location: "Jakarta HQ Office",
    ipAddress: "180.252.88.19",
    status: "AUTHORIZED"
  }
];

export const INITIAL_USER_SESSIONS: UserSession[] = [
  {
    id: "SES-8821",
    userId: "USR-001",
    userName: "Bapak Pratama Soebagyo",
    userEmail: "p.soebagyo@smartmine.co.id",
    role: "Corporate Director",
    ipAddress: "180.252.88.19 (Jakarta)",
    location: "Jakarta Financial Tower",
    deviceInfo: "Chrome 126 / macOS Sonoma",
    loginTime: "2026-08-03 08:30",
    lastActivity: "2 min ago",
    isCurrent: true,
    twoFactorVerified: true,
    biometricAuthenticated: true
  },
  {
    id: "SES-8822",
    userId: "USR-002",
    userName: "Hendra Wijaya, S.T.",
    userEmail: "h.wijaya@smartmine.co.id",
    role: "Mine Manager",
    ipAddress: "10.240.12.101 (Morowali)",
    location: "Bahodopi Site Office",
    deviceInfo: "Windows 11 / Edge 125",
    loginTime: "2026-08-03 07:15",
    lastActivity: "5 min ago",
    isCurrent: false,
    twoFactorVerified: true,
    biometricAuthenticated: false
  },
  {
    id: "SES-8823",
    userId: "USR-003",
    userName: "Dr. Bambang Hermanto",
    userEmail: "b.hermanto@smartmine.co.id",
    role: "Geologist",
    ipAddress: "10.240.18.44 (Pit A)",
    location: "Exploration Field Camp",
    deviceInfo: "Android 14 / Mobile Safari",
    loginTime: "2026-08-03 06:45",
    lastActivity: "22 min ago",
    isCurrent: false,
    twoFactorVerified: true,
    biometricAuthenticated: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLoginLog[] = [
  {
    id: "AUD-9901",
    userEmail: "p.soebagyo@smartmine.co.id",
    role: "Corporate Director",
    method: "MICROSOFT",
    ipAddress: "180.252.88.19",
    status: "SUCCESS",
    timestamp: "2026-08-03 08:30:12",
    details: "Authentikasi Microsoft Entra ID + TOTP 2FA Berhasil"
  },
  {
    id: "AUD-9902",
    userEmail: "h.wijaya@smartmine.co.id",
    role: "Mine Manager",
    method: "BIOMETRIC_FACE_ID",
    ipAddress: "10.240.12.101",
    status: "SUCCESS",
    timestamp: "2026-08-03 07:15:00",
    details: "Verifikasi Biometrik Wajah Field Toughbook Valid"
  },
  {
    id: "AUD-9903",
    userEmail: "contractor.guest@vendor.com",
    role: "Vendor",
    method: "EMAIL",
    ipAddress: "114.122.99.10",
    status: "INVALID_OTP",
    timestamp: "2026-08-03 06:12:45",
    details: "Percobaan OTP gagal 3x dari IP eksternal vendor"
  },
  {
    id: "AUD-9904",
    userEmail: "suryadi.hse@smartmine.co.id",
    role: "HSE Manager",
    method: "GOOGLE",
    ipAddress: "10.240.15.88",
    status: "SUCCESS",
    timestamp: "2026-08-03 05:50:20",
    details: "Google Workspace SSO Pass-through login"
  }
];

export const INITIAL_COMPANY_USERS: CompanyUser[] = [
  {
    id: "USR-001",
    companyId: "COMP-HOLDING",
    departmentId: "DEPT-COMMERCIAL",
    name: "Bapak Pratama Soebagyo",
    email: "p.soebagyo@smartmine.co.id",
    role: "Corporate Director",
    siteId: "SITE-MOROWALI",
    status: "ACTIVE",
    lastLogin: "2026-08-03 10:45"
  },
  {
    id: "USR-002",
    companyId: "COMP-MOROWALI",
    departmentId: "DEPT-MINE-ENG",
    name: "Hendra Wijaya, S.T.",
    email: "h.wijaya@smartmine.co.id",
    role: "Mine Manager",
    siteId: "SITE-MOROWALI",
    status: "ACTIVE",
    lastLogin: "2026-08-03 11:15"
  },
  {
    id: "USR-003",
    companyId: "COMP-MOROWALI",
    departmentId: "DEPT-GEO",
    name: "Dr. Bambang Hermanto",
    email: "b.hermanto@smartmine.co.id",
    role: "Geologist",
    siteId: "SITE-MOROWALI",
    status: "ACTIVE",
    lastLogin: "2026-08-03 09:30"
  },
  {
    id: "USR-004",
    companyId: "COMP-MOROWALI",
    departmentId: "DEPT-HSE",
    name: "Suryadi, S.K.M.",
    email: "suryadi.hse@smartmine.co.id",
    role: "HSE Manager",
    siteId: "SITE-MOROWALI",
    status: "ACTIVE",
    lastLogin: "2026-08-03 08:20"
  },
  {
    id: "USR-005",
    companyId: "COMP-HALMAHERA",
    departmentId: "DEPT-MINE-ENG",
    name: "Irfan Santoso",
    email: "i.santoso@smartmine.co.id",
    role: "Operation Manager",
    siteId: "SITE-HALMAHERA",
    status: "ACTIVE",
    lastLogin: "2026-08-03 07:50"
  }
];
