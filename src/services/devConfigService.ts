import { useState, useEffect } from 'react';
import { DevConfig, ClientUserAccount } from '../types';
import { db, handleFirestoreError, OperationType } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const DEFAULT_DEV_CONFIG: DevConfig = {
  website: {
    brandName: "NickelSmart AI",
    brandTagline: "Enterprise Mining & AI Smelter Orchestration Indonesia",
    heroTitle: "Sistem Manajemen Tambang Nikel & AI Smelter RKEF/HPAL Terintegrasi",
    heroSubtitle: "Platform Digital Tambang Nikel Terlengkap: Pit-to-Port Hauling, Ore Blending Otomatis, Kepatuhan ESDM/HPM, Timbangan Digital, Surveyor COA, dan Telemetri Alat Berat Real-Time.",
    heroBadge: "🚀 Platform Nikel Indonesia #1 Terintegrasi ESDM & MODI",
    ctaPrimaryText: "Masuk Sistem Operasi Tambang",
    ctaSecondaryText: "Pelajari Fitur & Simulasi ROI",
    announcement: {
      enabled: true,
      badgeText: "UPDATE v4.2",
      text: "Modul Blending Smelter RKEF & Integrasi SIMBARA / MODI ESDM 2026 telah aktif.",
      linkText: "Lihat Changelog",
      type: "promo"
    },
    heroBannerImage: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80",
    logoUrl: "",
    videoPromo: {
      enabled: true,
      title: "Video Simulasi Operasional Tambang & Blending Ore Nikel",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ", // Default sample embed
      posterUrl: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80",
      description: "Tonton bagaimana NickelSmart AI memotong antrean tongkang di jetty, mencegah penalti demurrage, dan menghitung formula pencampuran ore secara presisi."
    },
    mediaGallery: [
      {
        id: "MG-01",
        title: "Penambangan Pit Alpha & Overburden Stripping",
        category: "Pit Mining",
        imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80",
        description: "Operasi Excavator PC2000 memuat ore saprolit kadar 1.82% Ni di Pit Alpha."
      },
      {
        id: "MG-02",
        title: "Pemuatan Tongkang (Barging) & Jetty Port Transshipment",
        category: "Jetty Port",
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
        description: "Barge Robby 3012 memuat 7.800 MT ore nikel menuju Smelter Bahodopi."
      },
      {
        id: "MG-03",
        title: "Ore Stockpile & Blending Management",
        category: "Smelter RKEF",
        imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        description: "Stockpile EFO & ETO dengan rasio SiO2/MgO terukur akurat."
      },
      {
        id: "MG-04",
        title: "Laboratorium XRF & Verifikasi Surveyor Independen",
        category: "Laboratory",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
        description: "Pengujian cepat kadar Ni, Fe, Co, dan MC sebelum sertifikat COA diterbitkan."
      }
    ],
    pricingPlans: [
      {
        tierId: 'Trial Mode',
        name: 'Trial Evaluasi (30 Hari)',
        monthlyPrice: 'Gratis',
        yearlyPrice: 'Gratis',
        period: '/ 30 Hari Evaluasi',
        seats: '5 User Seats',
        target: 'IUP Baru & Evaluasi Fitur Site',
        highlight: false,
        badge: 'Free Trial',
        note: 'Akses penuh tanpa komitmen',
        features: [
          'Akses Dasbor Analitik Dasar',
          'Simulasi Pit & Ore Model (1 Pit)',
          'Input Jembatan Timbang Manual',
          'Export Laporan Format Excel',
          'Dukungan Komunitas via Email'
        ]
      },
      {
        tierId: 'Standard Mine Tier',
        name: 'Standard Mine Tier',
        monthlyPrice: 'Rp 42,5 Juta',
        yearlyPrice: 'Rp 37,5 Juta',
        period: '/ Bulan (Ditagih Tahunan)',
        seats: '25 User Seats',
        target: 'Kontraktor Tambang & Single Pit',
        highlight: false,
        note: 'Opsi Kontrak Bulanan Fleksibel',
        features: [
          'Dasbor Analitik Real-Time 360°',
          'Modul Pit & Ore Block Model Complete',
          'Integrasi Timbangan Truk Otomatis (Surat Jalan QR)',
          'Pelacakan GPS Fleet & Ritase Hauling',
          'Manajemen Stockpile ETO / EFO Real-Time',
          'Kepatuhan K3LH & Safety Incident Tracker',
          'Dukungan Teknis Office Hours'
        ]
      },
      {
        tierId: 'Smelter & Mine Pro Tier',
        name: 'Smelter & Mine Pro Tier',
        monthlyPrice: 'Rp 78,5 Juta',
        yearlyPrice: 'Rp 70,8 Juta',
        period: '/ Bulan (Ditagih Tahunan)',
        seats: '75 User Seats',
        target: 'Konsesi Tambang Nikel & Smelter RKEF',
        highlight: true,
        badge: 'Paling Populer',
        note: 'Solusi Lengkap Pit-to-Smelter',
        features: [
          'Semua Fitur Standard Mine Tier',
          'Smart AI Nickel Ore Blending Engine (Ni/Fe/MC)',
          'Manajemen Jetty, Tongkang & Draft Survey COA',
          'Integrasi HPM Nikel ESDM & Kalkulator Penalti Royalti',
          'Telemetri IoT Sensor Tangki Solar B35 & Workshop',
          'Offline Mode Tablet Operator Front & Haul Road',
          'AI Assistant Operasional 24/7 (NickelSmart AI)'
        ]
      },
      {
        tierId: 'Enterprise Unlimited Tier',
        name: 'Enterprise Unlimited Tier',
        monthlyPrice: 'Rp 132,5 Juta',
        yearlyPrice: 'Rp 120,8 Juta',
        period: '/ Bulan (Ditagih Tahunan)',
        seats: 'Unlimited Seats',
        target: 'Mining Holding & Smelter Conglomerate',
        highlight: false,
        badge: 'Holding Enterprise',
        note: 'Multi-Site Holding & Custom Cloud',
        features: [
          'Semua Fitur Pro Tier Unlocked',
          'Dedicated NickelSmart AI Engine (Custom Model)',
          'Multi-IUP & Multi-Site Holding Consolidation',
          'Konektor REST API SAP S/4HANA & Oracle ERP',
          'Opsi Lisensi Offline Dongle Hardware & On-Premise',
          'SLA Uptime 99.9% & Dedicated Account Manager',
          'Kustomisasi Modul Khusus Tanpa Biaya Tambahan'
        ]
      }
    ],
    contactInfo: {
      companyName: "PT NickelSmart Teknologi Nusantara",
      email: "sales@smartmine.co.id",
      phone: "+62 21 5088 9900",
      whatsappNumber: "+6281288997766",
      address: "Menara Batavia Lt. 28, Jl. K.H. Mas Mansyur Kav. 126, Jakarta Pusat 10220"
    }
  },
  apiKeys: {
    geminiApiKey: "",
    googleMapsApiKey: "",
    weatherApiKey: "",
    whatsappGatewayToken: "WAGATEWAY-TOKEN-SMARTMINE-8899",
    surveyorWebhookKey: "SUCOFINDO-CARSURIN-WEBHOOK-TOKEN-2026",
    iotMqttBrokerUrl: "mqtts://broker.smartmine.co.id:8883"
  },
  systemSettings: {
    maintenanceMode: false,
    maintenanceMessage: "Sistem sedang dalam pemeliharaan terjadwal server ESDM. Operasional lokal tetap berjalan.",
    allowRegistration: true,
    defaultLicenseTier: "Smelter & Mine Pro",
    activeAiModel: "gemini-3.6-flash",
    offlineModeEnabled: true,
    esdmAutoSyncIntervalMinutes: 15,
    auditLogging: true
  },
  clientUsers: [
    {
      id: "CLI-001",
      name: "Bapak Hendra Wibisono",
      email: "h.wibisono@halmaheranickel.co.id",
      phone: "+6281122334455",
      companyName: "PT Halmahera Nickel Industry",
      iupNumber: "IUP-OP No. 540/091/ESDM/2022",
      role: "Mine Manager",
      subscriptionTier: "Smelter & Mine Pro",
      status: "ACTIVE",
      seatsAllocated: 50,
      expiresAt: "2027-12-31",
      createdAt: "2025-01-15",
      lastActive: "10 menit yang lalu",
      notes: "Klien utama konsesi Halmahera Timur. Butuh modul blending RKEF.",
      apiAccessAllowed: true
    },
    {
      id: "CLI-002",
      name: "Ibu Diana Kusuma Wardani",
      email: "diana.k@nusantaranickel.com",
      phone: "+6281234567890",
      companyName: "PT Nickel Mining Nusantara Tbk",
      iupNumber: "IUP-OP No. 540/128/ESDM/2021",
      role: "Super Admin",
      subscriptionTier: "Enterprise Unlimited",
      status: "ACTIVE",
      seatsAllocated: 250,
      expiresAt: "2027-12-31",
      createdAt: "2024-11-20",
      lastActive: "Baru saja",
      notes: "Akun Holding Morowali & Kolaka.",
      apiAccessAllowed: true
    },
    {
      id: "CLI-003",
      name: "Kapten Surya Darma",
      email: "surya.jetty@morowalilogistics.com",
      phone: "+6281398765432",
      companyName: "PT Morowali Jetty Logistik",
      iupNumber: "TUKS No. 04/PORT/2023",
      role: "Operation Manager",
      subscriptionTier: "Standard Mine",
      status: "ACTIVE",
      seatsAllocated: 20,
      expiresAt: "2026-11-30",
      createdAt: "2025-06-10",
      lastActive: "1 jam yang lalu",
      notes: "Kontraktor operasional pelabuhan & barging.",
      apiAccessAllowed: false
    },
    {
      id: "CLI-004",
      name: "Ir. Bambang Santoso, M.T.",
      email: "bambang.geo@sulawesimine.co.id",
      phone: "+6281567890123",
      companyName: "PT Sulawesi Mining Exploration",
      iupNumber: "IUP-EKS No. 22/EKS/2024",
      role: "Geologist",
      subscriptionTier: "Trial Mode",
      status: "TRIAL",
      seatsAllocated: 5,
      expiresAt: "2026-09-15",
      createdAt: "2026-08-01",
      lastActive: "Kemarin",
      notes: "Masa evaluasi 30 hari untuk modul 3D Ore Block Model.",
      apiAccessAllowed: false
    }
  ]
};

const DEV_CONFIG_STORAGE_KEY = 'nickelsmart_dev_control_config_v1';

class DevConfigService {
  private config: DevConfig;
  private listeners: Array<(cfg: DevConfig) => void> = [];

  constructor() {
    this.config = this.loadInitialConfig();
    this.fetchServerConfig();
    this.initFirestoreSync();
  }

  private initFirestoreSync() {
    if (typeof window === 'undefined') return;
    try {
      const configDocRef = doc(db, 'configs', 'app_main_config');
      onSnapshot(
        configDocRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const remoteData = snapshot.data() as Partial<DevConfig>;
            if (remoteData && remoteData.website) {
              this.config = {
                ...this.config,
                ...remoteData,
                website: { ...this.config.website, ...(remoteData.website || {}) },
                apiKeys: { ...this.config.apiKeys, ...(remoteData.apiKeys || {}) },
                clientUsers: remoteData.clientUsers || this.config.clientUsers
              };
              this.persistLocally();
              this.notify();
            }
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'configs/app_main_config');
        }
      );
    } catch (err) {
      console.warn("Firestore sync initialization note:", err);
    }
  }

  private loadInitialConfig(): DevConfig {
    if (typeof window === 'undefined') {
      return DEFAULT_DEV_CONFIG;
    }
    try {
      const stored = localStorage.getItem(DEV_CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_DEV_CONFIG,
          ...parsed,
          website: { ...DEFAULT_DEV_CONFIG.website, ...(parsed.website || {}) },
          apiKeys: { ...DEFAULT_DEV_CONFIG.apiKeys, ...(parsed.apiKeys || {}) },
          systemSettings: { ...DEFAULT_DEV_CONFIG.systemSettings, ...(parsed.systemSettings || {}) },
          clientUsers: parsed.clientUsers || DEFAULT_DEV_CONFIG.clientUsers
        };
      }
    } catch (e) {
      console.warn("Could not read stored dev config, using default", e);
    }
    return DEFAULT_DEV_CONFIG;
  }

  public async fetchServerConfig(): Promise<DevConfig> {
    try {
      const res = await fetch('/api/dev/config');
      if (res.ok) {
        const data = await res.json();
        if (data && data.website) {
          this.config = {
            ...this.config,
            ...data
          };
          this.persistLocally();
          this.notify();
          return this.config;
        }
      }
    } catch (err) {
      // Server may be in offline mode or dev build
    }
    return this.config;
  }

  public getConfig(): DevConfig {
    return this.config;
  }

  public async saveConfig(newConfig: DevConfig): Promise<boolean> {
    this.config = newConfig;
    this.persistLocally();
    this.notify();

    // 1. Persist to Firestore Cloud Database
    try {
      const configDocRef = doc(db, 'configs', 'app_main_config');
      await setDoc(configDocRef, {
        configId: 'app_main_config',
        website: newConfig.website,
        apiKeys: newConfig.apiKeys,
        clientUsers: newConfig.clientUsers,
        systemSettings: newConfig.systemSettings,
        updatedAt: new Date().toISOString(),
        updatedBy: 'Developer Console'
      }, { merge: true });
    } catch (firestoreErr) {
      console.warn("Firestore config save info:", firestoreErr);
    }

    // 2. Persist to Node Express runtime memory /api/dev/config
    try {
      const res = await fetch('/api/dev/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConfig)
      });
      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.warn("Server save error, saved locally:", err);
    }
    return true;
  }

  public async saveApiKeys(keys: Partial<DevConfig['apiKeys']>): Promise<boolean> {
    const updated = {
      ...this.config,
      apiKeys: {
        ...this.config.apiKeys,
        ...keys
      }
    };
    this.config = updated;
    this.persistLocally();
    this.notify();

    try {
      await fetch('/api/dev/apikeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keys)
      });
    } catch (e) {
      // Ignore
    }
    return true;
  }

  public async saveClientUser(user: ClientUserAccount): Promise<boolean> {
    const existingIndex = this.config.clientUsers.findIndex(u => u.id === user.id);
    let updatedUsers: ClientUserAccount[];
    if (existingIndex >= 0) {
      updatedUsers = [...this.config.clientUsers];
      updatedUsers[existingIndex] = user;
    } else {
      updatedUsers = [user, ...this.config.clientUsers];
    }

    const updatedConfig: DevConfig = {
      ...this.config,
      clientUsers: updatedUsers
    };

    return this.saveConfig(updatedConfig);
  }

  public async deleteClientUser(userId: string): Promise<boolean> {
    const updatedUsers = this.config.clientUsers.filter(u => u.id !== userId);
    const updatedConfig: DevConfig = {
      ...this.config,
      clientUsers: updatedUsers
    };
    return this.saveConfig(updatedConfig);
  }

  public async resetToDefaults(): Promise<boolean> {
    this.config = JSON.parse(JSON.stringify(DEFAULT_DEV_CONFIG));
    this.persistLocally();
    this.notify();
    try {
      await fetch('/api/dev/reset-defaults', { method: 'POST' });
    } catch (e) {
      // Ignore
    }
    return true;
  }

  private persistLocally() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(DEV_CONFIG_STORAGE_KEY, JSON.stringify(this.config));
        window.dispatchEvent(new CustomEvent('dev-config-updated', { detail: this.config }));
      } catch (e) {
        console.error("Local storage error:", e);
      }
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.config));
  }

  public subscribe(listener: (cfg: DevConfig) => void): () => void {
    this.listeners.push(listener);
    listener(this.config);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export const devConfigService = new DevConfigService();

export function useDevConfig() {
  const [config, setConfig] = useState<DevConfig>(devConfigService.getConfig());

  useEffect(() => {
    const unsubscribe = devConfigService.subscribe((newCfg) => {
      setConfig({ ...newCfg });
    });

    const handleCustomEvent = (e: any) => {
      if (e.detail) {
        setConfig({ ...e.detail });
      }
    };

    window.addEventListener('dev-config-updated', handleCustomEvent);
    return () => {
      unsubscribe();
      window.removeEventListener('dev-config-updated', handleCustomEvent);
    };
  }, []);

  return {
    config,
    saveConfig: (newCfg: DevConfig) => devConfigService.saveConfig(newCfg),
    saveApiKeys: (keys: Partial<DevConfig['apiKeys']>) => devConfigService.saveApiKeys(keys),
    saveClientUser: (user: ClientUserAccount) => devConfigService.saveClientUser(user),
    deleteClientUser: (id: string) => devConfigService.deleteClientUser(id),
    resetToDefaults: () => devConfigService.resetToDefaults()
  };
}
