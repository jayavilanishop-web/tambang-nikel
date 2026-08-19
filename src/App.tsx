import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Header } from './components/Header';
import { Sidebar, ActiveModule } from './components/Sidebar';
import { LicenseModal } from './components/LicenseModal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { PushNotificationCenter } from './components/PushNotificationCenter';
import { FloatingAIAvatar } from './components/FloatingAIAvatar';
import { 
  auth, 
  onAuthStateChanged, 
  signInWithGoogle, 
  logOutUser, 
  testFirestoreConnection 
} from './services/firebase';
import { User as FirebaseUser } from 'firebase/auth';

import { DashboardModule } from './components/modules/DashboardModule';
import { ExplorationPitModule } from './components/modules/ExplorationPitModule';
import { SurveyTopographyModule } from './components/modules/SurveyTopographyModule';
import { WeighbridgeModule } from './components/modules/WeighbridgeModule';
import { GpsTelemetryTrackingModule } from './components/modules/GpsTelemetryTrackingModule';
import { IotSensorTelemetryModule } from './components/modules/IotSensorTelemetryModule';
import { WarehouseInventoryModule } from './components/modules/WarehouseInventoryModule';
import { ProcurementContractModule } from './components/modules/ProcurementContractModule';
import { FinanceAccountingModule } from './components/modules/FinanceAccountingModule';
import { HrHumanCapitalModule } from './components/modules/HrHumanCapitalModule';
import { FleetManagementModule } from './components/modules/FleetManagementModule';
import { StockpileBlendingModule } from './components/modules/StockpileBlendingModule';
import { JettyBargingModule } from './components/modules/JettyBargingModule';
import { SmelterSalesModule } from './components/modules/SmelterSalesModule';
import { HseEsgModule } from './components/modules/HseEsgModule';
import { EnvironmentEsgModule } from './components/modules/EnvironmentEsgModule';
import { SecurityAccessModule } from './components/modules/SecurityAccessModule';
import { DocumentManagementModule } from './components/modules/DocumentManagementModule';
import { ProjectManagementModule } from './components/modules/ProjectManagementModule';
import { CrmSalesCustomerModule } from './components/modules/CrmSalesCustomerModule';
import { ReportDashboardBuilderModule } from './components/modules/ReportDashboardBuilderModule';
import { NotificationAlertCenterModule } from './components/modules/NotificationAlertCenterModule';
import { RkabAIGeneratorModule } from './components/modules/RkabAIGeneratorModule';
import { FieldOperatorOfflineModule } from './components/modules/FieldOperatorOfflineModule';
import { ApiIntegrationHubModule } from './components/modules/ApiIntegrationHubModule';
import { LicenseSaaSModule } from './components/modules/LicenseSaaSModule';
import { MultiCompanyModule } from './components/modules/MultiCompanyModule';
import { AuthSecurityModule } from './components/modules/AuthSecurityModule';
import { MineGPTModule } from './components/modules/MineGPTModule';
import { OperationCenterModule } from './components/modules/OperationCenterModule';
import { DeveloperControlPanelModule } from './components/modules/DeveloperControlPanelModule';

import { 
  INITIAL_LICENSE, 
  INITIAL_SITES, 
  INITIAL_PITS, 
  INITIAL_STOCKPILES, 
  INITIAL_EQUIPMENT, 
  INITIAL_BARGES, 
  INITIAL_HPM, 
  INITIAL_SAFETY_LOGS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_API_TOKENS,
  INITIAL_COMPANIES,
  INITIAL_DEPARTMENTS,
  INITIAL_COMPANY_USERS,
  INITIAL_REGISTERED_DEVICES,
  INITIAL_USER_SESSIONS,
  INITIAL_AUDIT_LOGS
} from './data/initialData';

import { 
  LicenseInfo, 
  Language, 
  ThemeMode, 
  UserRole, 
  PitOperation, 
  HeavyEquipment, 
  SafetyIncidentLog, 
  PushNotification, 
  APIToken,
  Company,
  Department,
  CompanyUser,
  MineSite,
  RegisteredDevice,
  UserSession,
  AuditLoginLog
} from './types';

export default function App() {
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeModule, setActiveModule] = useState<ActiveModule>('dashboard');
  const [licenseInfo, setLicenseInfo] = useState<LicenseInfo>(INITIAL_LICENSE);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [language, setLanguage] = useState<Language>('id');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('Mine Manager');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [firestoreStatus, setFirestoreStatus] = useState<string>('Initializing Cloud Firestore...');

  // Firebase Boot & Realtime Auth Listener
  useEffect(() => {
    // 1. Connection check with Firestore
    testFirestoreConnection().then(res => {
      setFirestoreStatus(res.message);
    });

    // 2. Auth state observer
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        // Automatically check if user is Developer / Super Admin
        if (user.email === 'jayavilanishop@gmail.com' || user.email?.includes('admin')) {
          setCurrentUserRole('Super Admin');
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        if (user.email === 'jayavilanishop@gmail.com' || user.email?.includes('admin')) {
          setCurrentUserRole('Super Admin');
        }
        setViewMode('app');
      }
    } catch (err: any) {
      console.error('Google Sign-In failed:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOutUser();
      setFirebaseUser(null);
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  // Application State Datasets
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [sites, setSites] = useState<MineSite[]>(INITIAL_SITES);
  const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
  const [companyUsers, setCompanyUsers] = useState<CompanyUser[]>(INITIAL_COMPANY_USERS);
  const [pits, setPits] = useState<PitOperation[]>(INITIAL_PITS);
  const [stockpiles, setStockpiles] = useState(INITIAL_STOCKPILES);
  const [equipment, setEquipment] = useState<HeavyEquipment[]>(INITIAL_EQUIPMENT);
  const [barges] = useState(INITIAL_BARGES);
  const [hpm] = useState(INITIAL_HPM);
  const [incidents, setIncidents] = useState<SafetyIncidentLog[]>(INITIAL_SAFETY_LOGS);
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);
  const [apiTokens, setApiTokens] = useState<APIToken[]>(INITIAL_API_TOKENS);
  const [devices, setDevices] = useState<RegisteredDevice[]>(INITIAL_REGISTERED_DEVICES);
  const [sessions, setSessions] = useState<UserSession[]>(INITIAL_USER_SESSIONS);
  const [auditLogs] = useState<AuditLoginLog[]>(INITIAL_AUDIT_LOGS);

  // Handlers
  const handleNewWeighbridgeTicket = (ticket: any) => {
    if (ticket.status === 'COMPLETED') {
      setStockpiles(prev => prev.map(st => {
        if (ticket.destinationLocation.toLowerCase().includes(st.name.toLowerCase()) || 
            st.name.toLowerCase().includes(ticket.destinationLocation.toLowerCase())) {
          return {
            ...st,
            currentTonnageMT: st.currentTonnageMT + ticket.netWeightMT,
            lastUpdated: 'Baru saja'
          };
        }
        return st;
      }));
    }

    const newNotif: PushNotification = {
      id: `NOTIF-${Date.now()}`,
      title: ticket.status === 'COMPLETED' 
        ? `Surat Jalan ${ticket.ticketNo} Terbit` 
        : `⚠️ Overload Detected: ${ticket.truckUnitNo}`,
      message: ticket.status === 'COMPLETED'
        ? `Truk ${ticket.truckUnitNo} menimbang ${ticket.netWeightMT} MT ${ticket.materialType} (${ticket.originLocation} ➔ ${ticket.destinationLocation})`
        : `Truk ${ticket.truckUnitNo} membawa muatan ${ticket.netWeightMT} MT. Ditolak di ${ticket.gateNo}`,
      time: 'Baru saja',
      category: 'OPERATIONS',
      read: false,
      priority: ticket.status === 'COMPLETED' ? 'NORMAL' : 'URGENT'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };
  const handleRevokeDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(d => d.id !== deviceId));
  };

  const handleRegisterDevice = (deviceName: string, hwid: string, location: string) => {
    const newDev: RegisteredDevice = {
      id: `DEV-${Date.now()}`,
      deviceName,
      hwid,
      location,
      ipAddress: '10.240.12.' + Math.floor(10 + Math.random() * 80),
      registeredAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      lastActive: 'Just now',
      status: 'AUTHORIZED'
    };
    setDevices(prev => [newDev, ...prev]);
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };
  const handleAddCompany = (newCompany: Company) => {
    setCompanies(prev => [newCompany, ...prev]);
  };

  const handleAddSite = (newSite: MineSite) => {
    setSites(prev => [newSite, ...prev]);
  };

  const handleAddDepartment = (newDept: Department) => {
    setDepartments(prev => [newDept, ...prev]);
  };

  const handleAddUser = (newUser: CompanyUser) => {
    setCompanyUsers(prev => [newUser, ...prev]);
  };

  const handleAddPitOperation = (newPit: PitOperation) => {
    setPits(prev => [newPit, ...prev]);
  };

  const handleUpdateEquipmentStatus = (id: string, status: HeavyEquipment['status']) => {
    setEquipment(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  const handleAddIncident = (newIncident: SafetyIncidentLog) => {
    setIncidents(prev => [newIncident, ...prev]);
  };

  const handleAddApiToken = (newToken: APIToken) => {
    setApiTokens(prev => [newToken, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onEnterApp={(selectedRole) => {
          if (selectedRole) {
            setCurrentUserRole(selectedRole);
          }
          setViewMode('app');
        }}
        onOpenDeveloperPanel={() => {
          setCurrentUserRole('Super Admin');
          setActiveModule('developer_control_panel');
          setViewMode('app');
        }}
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'id' ? 'en' : 'id')}
        firebaseUser={firebaseUser}
        onGoogleSignIn={handleGoogleSignIn}
      />
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} font-sans antialiased selection:bg-emerald-500 selection:text-slate-950`}>
      
      {/* Enterprise Top Navigation Header */}
      <Header
        licenseInfo={licenseInfo}
        onOpenLicenseModal={() => setIsLicenseModalOpen(true)}
        onOpenAIDrawer={() => setIsAIDrawerOpen(true)}
        onToggleNotifications={() => setIsNotificationCenterOpen(!isNotificationCenterOpen)}
        notifications={notifications}
        isOnline={isOnline}
        onToggleOnlineStatus={() => setIsOnline(!isOnline)}
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'id' ? 'en' : 'id')}
        theme={theme}
        onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        currentUserRole={currentUserRole}
        onChangeUserRole={setCurrentUserRole}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onGoToLandingPage={() => setViewMode('landing')}
        firebaseUser={firebaseUser}
        onGoogleSignIn={handleGoogleSignIn}
        onSignOut={handleSignOut}
      />

      {/* Main Layout Area - Full Width Responsive */}
      <div className="w-full px-3 sm:px-6 lg:px-8 py-6 flex gap-6">
        
        {/* Native Responsive Sidebar Navigation */}
        <Sidebar
          activeModule={activeModule}
          onSelectModule={setActiveModule}
          language={language}
          currentUserRole={currentUserRole}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Dynamic Module View Content Container */}
        <main className="flex-1 min-w-0 pb-16 lg:pb-8">
          {activeModule === 'dashboard' && (
            <DashboardModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              hpm={hpm}
              language={language}
              currentUserRole={currentUserRole}
              onOpenAIDrawer={() => setIsAIDrawerOpen(true)}
              onNavigateModule={setActiveModule}
            />
          )}

          {activeModule === 'mine_gpt' && (
            <MineGPTModule
              language={language}
            />
          )}

          {activeModule === 'corporate_director' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_corporate_director"
            />
          )}

          {activeModule === 'commissioner' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_commissioner"
            />
          )}

          {activeModule === 'ceo' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_ceo"
            />
          )}

          {activeModule === 'coo' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_coo"
            />
          )}

          {activeModule === 'finance_director' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_finance_director"
            />
          )}

          {activeModule === 'hr_director' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_hr_director"
            />
          )}

          {activeModule === 'mine_manager' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_mine_manager"
            />
          )}

          {activeModule === 'operation_manager' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_operation_manager"
            />
          )}

          {activeModule === 'production_manager' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
              initialTab="dasbor_production_manager"
            />
          )}

          {activeModule === 'geologist' && (
            <ExplorationPitModule
              pits={pits}
              sites={sites}
              language={language}
              initialTab="dasbor_geologist"
              onAddPitOperation={handleAddPitOperation}
            />
          )}

          {activeModule === 'mine_engineer' && (
            <ExplorationPitModule
              pits={pits}
              sites={sites}
              language={language}
              initialTab="dasbor_mine_engineer"
              onAddPitOperation={handleAddPitOperation}
            />
          )}

          {activeModule === 'operation' && (
            <OperationCenterModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              barges={barges}
              language={language}
            />
          )}

          {activeModule === 'multi_company' && (
            <MultiCompanyModule
              companies={companies}
              sites={sites}
              pits={pits}
              departments={departments}
              users={companyUsers}
              language={language}
              onAddCompany={handleAddCompany}
              onAddSite={handleAddSite}
              onAddPit={handleAddPitOperation}
              onAddDepartment={handleAddDepartment}
              onAddUser={handleAddUser}
            />
          )}

          {activeModule === 'exploration' && (
            <ExplorationPitModule
              pits={pits}
              sites={sites}
              language={language}
              onAddPitOperation={handleAddPitOperation}
            />
          )}

          {activeModule === 'survey' && (
            <SurveyTopographyModule
              stockpiles={stockpiles}
              language={language}
            />
          )}

          {activeModule === 'weighbridge' && (
            <WeighbridgeModule
              sites={sites}
              stockpiles={stockpiles}
              equipment={equipment}
              language={language}
              onOpenAIDrawer={() => setIsAIDrawerOpen(true)}
              onNavigateModule={setActiveModule}
              onNewTicketProcessed={handleNewWeighbridgeTicket}
            />
          )}

          {activeModule === 'gps_telemetry' && (
            <GpsTelemetryTrackingModule
              equipment={equipment}
              language={language}
            />
          )}

          {activeModule === 'iot_telemetry' && (
            <IotSensorTelemetryModule
              equipment={equipment}
              language={language}
            />
          )}

          {activeModule === 'warehouse' && (
            <WarehouseInventoryModule
              language={language}
            />
          )}

          {activeModule === 'procurement' && (
            <ProcurementContractModule
              language={language}
            />
          )}

          {activeModule === 'finance' && (
            <FinanceAccountingModule
              language={language}
            />
          )}

          {activeModule === 'hr' && (
            <HrHumanCapitalModule
              language={language}
            />
          )}

          {activeModule === 'fleet' && (
            <FleetManagementModule
              equipment={equipment}
              language={language}
              onUpdateEquipmentStatus={handleUpdateEquipmentStatus}
            />
          )}

          {activeModule === 'stockpile' && (
            <StockpileBlendingModule
              stockpiles={stockpiles}
              language={language}
            />
          )}

          {activeModule === 'jetty' && (
            <JettyBargingModule
              barges={barges}
              language={language}
            />
          )}

          {activeModule === 'smelter' && (
            <SmelterSalesModule
              hpm={hpm}
              language={language}
            />
          )}

          {activeModule === 'hse' && (
            <HseEsgModule
              incidents={incidents}
              language={language}
              onAddIncident={handleAddIncident}
            />
          )}

          {activeModule === 'environment' && (
            <EnvironmentEsgModule
              language={language}
            />
          )}

          {activeModule === 'security' && (
            <SecurityAccessModule
              language={language}
            />
          )}

          {activeModule === 'document' && (
            <DocumentManagementModule
              language={language}
            />
          )}

          {activeModule === 'project' && (
            <ProjectManagementModule
              language={language}
            />
          )}

          {activeModule === 'crm' && (
            <CrmSalesCustomerModule
              language={language}
            />
          )}

          {activeModule === 'report' && (
            <ReportDashboardBuilderModule
              language={language}
            />
          )}

          {activeModule === 'notification' && (
            <NotificationAlertCenterModule
              language={language}
            />
          )}

          {activeModule === 'rkab' && (
            <RkabAIGeneratorModule
              language={language}
            />
          )}

          {activeModule === 'offline' && (
            <FieldOperatorOfflineModule
              isOnline={isOnline}
              onToggleOnlineStatus={() => setIsOnline(!isOnline)}
              language={language}
            />
          )}

          {activeModule === 'api_hub' && (
            <ApiIntegrationHubModule
              apiTokens={apiTokens}
              language={language}
              onAddToken={handleAddApiToken}
            />
          )}

          {activeModule === 'saas_license' && (
            <LicenseSaaSModule
              licenseInfo={licenseInfo}
              onOpenLicenseModal={() => setIsLicenseModalOpen(true)}
              onUpdateLicense={setLicenseInfo}
              devices={devices}
              onRevokeDevice={handleRevokeDevice}
              onRegisterDevice={handleRegisterDevice}
              language={language}
            />
          )}

          {activeModule === 'auth_security' && (
            <AuthSecurityModule
              currentUserRole={currentUserRole}
              onChangeUserRole={setCurrentUserRole}
              sessions={sessions}
              auditLogs={auditLogs}
              language={language}
              onRevokeSession={handleRevokeSession}
            />
          )}

          {activeModule === 'developer_control_panel' && (
            <DeveloperControlPanelModule
              language={language}
              onGoToLandingPage={() => setViewMode('landing')}
            />
          )}
        </main>

      </div>

      {/* Commercial SaaS License Key Activation Modal */}
      <LicenseModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
        licenseInfo={licenseInfo}
        onUpdateLicense={setLicenseInfo}
        language={language}
      />

      {/* Floating AI Mining Avatar Button */}
      <FloatingAIAvatar onOpenAIDrawer={() => setIsAIDrawerOpen(true)} />

      {/* Smart AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={isAIDrawerOpen}
        onClose={() => setIsAIDrawerOpen(false)}
        language={language}
      />

      {/* Real-time Push Notification Center */}
      <PushNotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onClearNotifications={handleClearNotifications}
        language={language}
      />

    </div>
  );
}
