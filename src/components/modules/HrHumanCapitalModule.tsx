import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  UserPlus, 
  Clock, 
  Calendar, 
  DollarSign, 
  GraduationCap, 
  Stethoscope, 
  Award, 
  Target, 
  TrendingUp, 
  ArrowRightLeft, 
  UserX, 
  Network, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Briefcase, 
  FileSpreadsheet, 
  Building2 
} from 'lucide-react';
import { Language } from '../../types';

interface HrHumanCapitalModuleProps {
  language: Language;
}

export const HrHumanCapitalModule: React.FC<HrHumanCapitalModuleProps> = ({
  language
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'employee_directory'
    | 'recruitment_ats'
    | 'attendance_roster'
    | 'leave_permits'
    | 'payroll_slips'
    | 'training_certifications'
    | 'medical_mcu'
    | 'performance_kpi'
    | 'career_mutation_promotion'
    | 'resignation_clearance'
    | 'organization_chart'
  >('employee_directory');

  const [searchTerm, setSearchTerm] = useState<string>('');

  // Employees Dataset
  const employeesList = [
    { empId: 'EMP-2024-001', name: 'Eko Prasetyo', position: 'Senior Heavy Equipment Operator (Dump Truck CAT 777E)', dept: 'Mining Operations', siteRoster: '6 Weeks On / 2 Weeks Off', status: 'PERMANENT', mcuStatus: 'FIT_FOR_DUTY', popCertification: 'POP_CERTIFIED' },
    { empId: 'EMP-2024-002', name: 'Andi Suherman', position: 'Dump Truck Operator Class A', dept: 'Mining Operations', siteRoster: '6 Weeks On / 2 Weeks Off', status: 'CONTRACT_PKWT', mcuStatus: 'FIT_WITH_RESTRICTION', popCertification: 'NON_POP' },
    { empId: 'EMP-2023-088', name: 'Budi Santoso', position: 'Excavator Operator PC2000', dept: 'Mining Operations', siteRoster: '6 Weeks On / 2 Weeks Off', status: 'PERMANENT', mcuStatus: 'FIT_FOR_DUTY', popCertification: 'POP_CERTIFIED' },
    { empId: 'EMP-2022-012', name: 'Hendra Setiawan', position: 'Pit Mining Superintendent', dept: 'Mining Operations', siteRoster: '4 Weeks On / 2 Weeks Off', status: 'PERMANENT', mcuStatus: 'FIT_FOR_DUTY', popCertification: 'POM_SENIOR_CERTIFIED' }
  ];

  // Recruitment ATS Dataset
  const recruitmentJobs = [
    { jobId: 'REC-2026-041', title: 'Heavy Equipment Mechanic Maintenance (Caterpillar)', dept: 'Workshop Maintenance', applicantsCount: 42, shortlistedCount: 8, status: 'INTERVIEW_STAGE' },
    { jobId: 'REC-2026-042', title: 'Mine Geologist Exploration Specialist', dept: 'Geology & Survey', applicantsCount: 18, shortlistedCount: 4, status: 'MCU_CHECK_STAGE' }
  ];

  // Attendance & Shift Roster Dataset
  const attendanceRoster = [
    { empId: 'EMP-2024-001', name: 'Eko Prasetyo', shift: 'Shift 1 (Pagi 07:00 - 19:00)', clockIn: '06:45', clockOut: '19:10', fatigueScore: 'NORMAL_98%', status: 'PRESENT' },
    { empId: 'EMP-2024-002', name: 'Andi Suherman', shift: 'Shift 1 (Pagi 07:00 - 19:00)', clockIn: '06:52', clockOut: '19:05', fatigueScore: 'WARNING_EYE_CLOSURE', status: 'PRESENT' }
  ];

  // Leave & Roster Permit Dataset
  const leaveRequests = [
    { leaveId: 'LV-2026-081', empName: 'Agus Wijaya', leaveType: 'Cuti Periodik Roster Field (14 Hari)', startDate: '2026-08-10', endDate: '2026-08-24', approver: 'Hendra (Mine Supt)', status: 'APPROVED' },
    { leaveId: 'LV-2026-082', empName: 'Rahmat Hidayat', leaveType: 'Izin Sakit / Medical Leave', startDate: '2026-08-03', endDate: '2026-08-05', approver: 'Dr. Farhan (Site Clinic)', status: 'APPROVED' }
  ];

  // Payroll Processing Dataset
  const payrollSlips = [
    { slipNo: 'PAY-2026-07', empId: 'EMP-2024-001', name: 'Eko Prasetyo', baseSalaryIdr: 12500000, siteAllowanceIdr: 4500000, overtimeHours: 42, netTakeHomePayIdr: 21850000, status: 'DISBURSED' },
    { slipNo: 'PAY-2026-07', empId: 'EMP-2022-012', name: 'Hendra Setiawan', baseSalaryIdr: 28000000, siteAllowanceIdr: 8500000, overtimeHours: 12, netTakeHomePayIdr: 41200000, status: 'DISBURSED' }
  ];

  // Training & Mine Safety Certifications
  const certificationsData = [
    { certId: 'CERT-POP-001', name: 'Eko Prasetyo', certName: 'Pengawas Operasional Pertama (POP) ESDM', expiryDate: '2028-05-20', issuer: 'BNSP / KESDM', status: 'VALID_ACTIVE' },
    { certId: 'CERT-SIML-002', name: 'Andi Suherman', certName: 'Surat Izin Mengemudi Lokasi (SIMPER) CAT 777E', expiryDate: '2027-01-15', issuer: 'K3LH Mine Safety', status: 'VALID_ACTIVE' }
  ];

  // Medical Check-Up (MCU) Fit-For-Duty Dataset
  const mcuRecords = [
    { mcuId: 'MCU-2026-Q2', name: 'Eko Prasetyo', mcuDate: '2026-06-10', doctor: 'Dr. Farhan (Site Clinic)', fitResult: 'FIT_FOR_DUTY_CLASS_A', audiometryResult: 'NORMAL', spirometryResult: 'NORMAL' },
    { mcuId: 'MCU-2026-Q2', name: 'Andi Suherman', mcuDate: '2026-06-12', doctor: 'Dr. Farhan (Site Clinic)', fitResult: 'FIT_WITH_RESTRICTION_EYEGLASSES', audiometryResult: 'MILD_HEARING_LOSS', spirometryResult: 'NORMAL' }
  ];

  // Performance KPI & Promotion / Mutation
  const performanceKpi = [
    { empId: 'EMP-2024-001', name: 'Eko Prasetyo', kpiScore: 92.5, safetyRecord: '0 Incident', productivityTon: 142000, ratingGrade: 'OUTSTANDING_A', promotionEligible: 'ELIGIBLE_FOR_LEAD_OPERATOR' },
    { empId: 'EMP-2022-012', name: 'Hendra Setiawan', kpiScore: 94.8, safetyRecord: '0 Incident', productivityTon: 850000, ratingGrade: 'SUPERIOR_A_PLUS', promotionEligible: 'ELIGIBLE_FOR_MANAGER' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 border border-slate-700 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Human Capital & Mining Workforce Management
            </span>
            <span className="text-slate-400 text-xs">• ISO 45001 & ESDM K3 Mining Safety Standards</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Pusat SDM, Penggajian (Payroll), MCU & Sertifikasi K3
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Sistem pengelolaan SDM tambang: Rekrutmen ATS, Absensi Shift Roster Field, Pengajuan Cuti, Payroll & Slip Gaji, Pelatihan & Sertifikasi POP/POM ESDM, MCU Fit-for-Duty, Evaluasi KPI, Mutasi/Promosi & Struktur Organisasi.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3 shrink-0 text-xs shadow-inner">
          <Users className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <span className="text-slate-400 text-[10px] block">Total Karyawan Site Tambang:</span>
            <strong className="text-slate-100 font-mono text-base font-bold">1,420 Personel</strong>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs covering all 16 requested keywords */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto custom-scrollbar">
        {[
          { id: 'employee_directory', label: 'Data Karyawan (Employee)', icon: Users },
          { id: 'recruitment_ats', label: 'Rekrutmen (Recruitment)', icon: UserPlus },
          { id: 'attendance_roster', label: 'Absensi Roster (Attendance)', icon: Clock },
          { id: 'leave_permits', label: 'Cuti Roster Field (Leave)', icon: Calendar },
          { id: 'payroll_slips', label: 'Penggajian & Slip (Payroll)', icon: DollarSign },
          { id: 'training_certifications', label: 'Pelatihan & Sertifikat POP', icon: GraduationCap },
          { id: 'medical_mcu', label: 'MCU & Fit-for-Duty (Medical)', icon: Stethoscope },
          { id: 'performance_kpi', label: 'KPI & Evaluasi Kinerja', icon: Target },
          { id: 'career_mutation_promotion', label: 'Mutasi, Promosi & Karir', icon: ArrowRightLeft },
          { id: 'resignation_clearance', label: 'Resignation & Clearance', icon: UserX },
          { id: 'organization_chart', label: 'Struktur Organisasi (Org)', icon: Network }
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

      {/* TAB 1: EMPLOYEE DIRECTORY */}
      {activeTab === 'employee_directory' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">Direktori Master Data Karyawan Site Tambang</h3>
              <button className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Karyawan Baru</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">NIP / Emp ID</th>
                    <th className="py-2.5 px-3">Nama Personel</th>
                    <th className="py-2.5 px-3">Jabatan & Posisi</th>
                    <th className="py-2.5 px-3">Departemen</th>
                    <th className="py-2.5 px-3">Jadwal Roster Field</th>
                    <th className="py-2.5 px-3">Status MCU Fit</th>
                    <th className="py-2.5 px-3">Sertifikasi K3 ESDM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {employeesList.map((emp) => (
                    <tr key={emp.empId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{emp.empId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{emp.name}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{emp.position}</td>
                      <td className="py-3 px-3 font-sans text-emerald-300">{emp.dept}</td>
                      <td className="py-3 px-3 text-slate-200">{emp.siteRoster}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {emp.mcuStatus}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-amber-500/20 text-amber-300">
                          {emp.popCertification}
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

      {/* TAB 2: RECRUITMENT ATS */}
      {activeTab === 'recruitment_ats' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Modul Rekrutmen & Pelacak Pelamar Kerja Tambang (Applicant Tracking System - ATS)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recruitmentJobs.map((job) => (
                <div key={job.jobId} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-mono font-bold text-emerald-400">{job.jobId}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      {job.status}
                    </span>
                  </div>

                  <strong className="text-slate-100 text-sm font-bold block">{job.title}</strong>

                  <div className="space-y-1 text-slate-400 text-[11px]">
                    <p>Departemen: <strong className="text-slate-200">{job.dept}</strong></p>
                    <p>Total Pelamar / CV: <strong className="text-amber-300 font-mono">{job.applicantsCount} Pelamar</strong></p>
                    <p>Kandidat Shortlisted: <strong className="text-emerald-400 font-mono">{job.shortlistedCount} Orang</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ATTENDANCE & SHIFT ROSTER */}
      {activeTab === 'attendance_roster' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Absensi Biometrik Wajah, Shift Operator & Skor Kelelahan Fatigue
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Emp ID</th>
                    <th className="py-2.5 px-3">Nama Operator</th>
                    <th className="py-2.5 px-3">Jadwal Shift Kerja</th>
                    <th className="py-2.5 px-3">Jam Masuk (Clock In)</th>
                    <th className="py-2.5 px-3">Jam Pulang (Clock Out)</th>
                    <th className="py-2.5 px-3">Skor Kamera Fatigue AI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {attendanceRoster.map((a) => (
                    <tr key={a.empId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{a.empId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{a.name}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{a.shift}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold">{a.clockIn}</td>
                      <td className="py-3 px-3 text-slate-300">{a.clockOut}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{a.fatigueScore}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LEAVE & PERMITS */}
      {activeTab === 'leave_permits' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pengajuan Cuti Periodik Roster Field, Tiket Penerbangan & Izin Sakit
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">ID Cuti</th>
                    <th className="py-2.5 px-3">Nama Karyawan</th>
                    <th className="py-2.5 px-3">Jenis Cuti / Izin</th>
                    <th className="py-2.5 px-3">Tanggal Mulai</th>
                    <th className="py-2.5 px-3">Tanggal Selesai</th>
                    <th className="py-2.5 px-3">Status Persetujuan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {leaveRequests.map((l) => (
                    <tr key={l.leaveId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{l.leaveId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{l.empName}</td>
                      <td className="py-3 px-3 font-sans text-emerald-300">{l.leaveType}</td>
                      <td className="py-3 px-3 text-slate-300">{l.startDate}</td>
                      <td className="py-3 px-3 text-slate-300">{l.endDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {l.status}
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

      {/* TAB 5: PAYROLL & SLIPS */}
      {activeTab === 'payroll_slips' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemrosesan Penggajian, Tunjangan Insentif Site & Slip Gaji Online
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">No. Slip Gaji</th>
                    <th className="py-2.5 px-3">Nama Karyawan</th>
                    <th className="py-2.5 px-3">Gaji Pokok (IDR)</th>
                    <th className="py-2.5 px-3">Tunjangan Site (IDR)</th>
                    <th className="py-2.5 px-3">Lembur (Jam)</th>
                    <th className="py-2.5 px-3">Take Home Pay (IDR)</th>
                    <th className="py-2.5 px-3">Status Disburse</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {payrollSlips.map((p, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{p.slipNo}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{p.name}</td>
                      <td className="py-3 px-3 text-slate-300">Rp {p.baseSalaryIdr.toLocaleString('id-ID')}</td>
                      <td className="py-3 px-3 text-emerald-300">Rp {p.siteAllowanceIdr.toLocaleString('id-ID')}</td>
                      <td className="py-3 px-3 text-amber-300 font-bold">{p.overtimeHours} Jam</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold text-sm">Rp {p.netTakeHomePayIdr.toLocaleString('id-ID')}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {p.status}
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

      {/* TAB 6: TRAINING & CERTIFICATIONS */}
      {activeTab === 'training_certifications' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Sertifikasi Pengawas Operasional Tambang POP/POM & SIMPER Driver
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Cert ID</th>
                    <th className="py-2.5 px-3">Nama Pemegang</th>
                    <th className="py-2.5 px-3">Nama Sertifikat Kompetensi</th>
                    <th className="py-2.5 px-3">Lembaga Penerbit</th>
                    <th className="py-2.5 px-3">Masa Kadaluarsa</th>
                    <th className="py-2.5 px-3">Status Lisensi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {certificationsData.map((c) => (
                    <tr key={c.certId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{c.certId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{c.name}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{c.certName}</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{c.issuer}</td>
                      <td className="py-3 px-3 text-slate-200">{c.expiryDate}</td>
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

      {/* TAB 7: MEDICAL CHECK-UP (MCU) */}
      {activeTab === 'medical_mcu' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Pemeriksaan Kesehatan Berkala (MCU) & Status Layak Kerja (Fit-for-Duty)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">MCU ID</th>
                    <th className="py-2.5 px-3">Nama Karyawan</th>
                    <th className="py-2.5 px-3">Tanggal MCU</th>
                    <th className="py-2.5 px-3">Hasil Kategori Layak Kerja (Fit Status)</th>
                    <th className="py-2.5 px-3">Tes Pendengaran (Audiometri)</th>
                    <th className="py-2.5 px-3">Tes Paru (Spirometri)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {mcuRecords.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{m.mcuId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{m.name}</td>
                      <td className="py-3 px-3 text-slate-400">{m.mcuDate}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold bg-emerald-500/20 text-emerald-400">
                          {m.fitResult}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-sans">{m.audiometryResult}</td>
                      <td className="py-3 px-3 text-slate-300 font-sans">{m.spirometryResult}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: PERFORMANCE & KPI */}
      {(activeTab === 'performance_kpi' || activeTab === 'career_mutation_promotion') && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Penilaian Kinerja KPI, Evaluasi Keselamatan K3 & Promosi / Mutasi Jabatan
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-[10px]">
                    <th className="py-2.5 px-3">Emp ID</th>
                    <th className="py-2.5 px-3">Nama Karyawan</th>
                    <th className="py-2.5 px-3">Skor KPI (%)</th>
                    <th className="py-2.5 px-3">Safety Record</th>
                    <th className="py-2.5 px-3">Rating Kinerja</th>
                    <th className="py-2.5 px-3">Rekomendasi Karir / Promosi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {performanceKpi.map((k) => (
                    <tr key={k.empId} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-bold text-emerald-400">{k.empId}</td>
                      <td className="py-3 px-3 font-sans text-slate-100 font-bold">{k.name}</td>
                      <td className="py-3 px-3 text-emerald-400 font-bold text-sm">{k.kpiScore}%</td>
                      <td className="py-3 px-3 font-sans text-slate-300">{k.safetyRecord}</td>
                      <td className="py-3 px-3 font-sans text-amber-300 font-bold">{k.ratingGrade}</td>
                      <td className="py-3 px-3 font-sans text-emerald-300 font-bold">{k.promotionEligible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 9: ORGANIZATION CHART */}
      {activeTab === 'organization_chart' && (
        <div className="space-y-6 text-xs">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-bold text-slate-100 text-sm border-b border-slate-800 pb-3">
              Struktur Organisasi Hirarki Site Tambang Nikel (Organization Structure)
            </h3>

            <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 space-y-6 text-center">
              <div className="inline-block p-4 bg-emerald-950 border border-emerald-500/50 rounded-xl">
                <strong className="text-emerald-400 text-sm font-bold block">General Manager Site Operations</strong>
                <span className="text-slate-300 text-[11px]">Ir. Bambang Wijaya (KTT Kepala Teknik Tambang)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <strong className="text-slate-100 block">Mining Operations Dept</strong>
                  <span className="text-slate-400 text-[10px]">Hendra Setiawan (Supt)</span>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <strong className="text-slate-100 block">HSE & Mine Safety Dept</strong>
                  <span className="text-slate-400 text-[10px]">Dr. Farhan (Manager)</span>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <strong className="text-slate-100 block">Processing & Metallurgy</strong>
                  <span className="text-slate-400 text-[10px]">Sutrisno (Chief Met)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
