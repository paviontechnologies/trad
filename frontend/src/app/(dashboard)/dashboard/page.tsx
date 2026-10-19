'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../../lib/auth-context';
import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  Wifi,
  Clock,
  CreditCard,
  ShieldAlert,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  Coffee,
  LogOut,
  Play,
  CheckCircle,
  XCircle,
  FileText,
  DollarSign,
  TrendingDown,
  CandlestickChart,
  Award,
  Zap,
  Activity,
  Calculator,
  Download,
  Plus,
  Briefcase,
  Globe,
  Search,
  Eye,
  ExternalLink,
  X,
  SlidersHorizontal,
  BellRing,
  Power,
  RotateCcw,
  Laptop,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  getWorkforceTelemetryList,
  EmployeeWorkforceTelemetry,
} from '../../../lib/workforce-telemetry';

export default function DashboardPage() {
  const {
    role,
    user,
    employees,
    attendanceRecords,
    securityAlerts,
    auditLogs,
    leaveRequests,
    leaveBalances,
    todayAttendance,
    trades,
    checkIn,
    startBreak,
    endBreak,
    checkOut,
    approveLeave,
    rejectLeave,
    approveTrade,
    rejectTrade,
    resolveAlert,
    requestTrade,
    showToast,
  } = useAuth();

  // Workforce filtering and Inspector state for Admin and Manager
  const [deptFilter, setDeptFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingEmp, setInspectingEmp] = useState<EmployeeWorkforceTelemetry | null>(null);
  const [activeInspectorTab, setActiveInspectorTab] = useState<'overview' | 'tasks' | 'apps' | 'admin'>('overview');

  const allTelemetryList = getWorkforceTelemetryList(todayAttendance);

  const filteredTelemetryList = allTelemetryList.filter((emp) => {
    const matchesDept = deptFilter === 'ALL' || emp.departmentName === deptFilter;
    const matchesStatus = statusFilter === 'ALL' || emp.status === statusFilter;
    const matchesSearch =
      searchQuery === '' ||
      emp.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.empId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.activeApp.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesStatus && matchesSearch;
  });

  const staffOnBreakList = allTelemetryList.filter((e) => e.status === 'ON_BREAK');
  const onlineCount = allTelemetryList.filter((e) => e.status === 'ACTIVE').length;

  // Reusable Employee Dashboard Inspector Modal
  const renderEmployeeInspectorModal = () => {
    if (!inspectingEmp) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200">
          {/* Modal Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={
                    inspectingEmp.avatarUrl ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                  }
                  alt={inspectingEmp.fullName}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-lg"
                />
                <span
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                    inspectingEmp.status === 'ACTIVE'
                      ? 'bg-emerald-400'
                      : inspectingEmp.status === 'ON_BREAK'
                      ? 'bg-amber-400 animate-pulse'
                      : inspectingEmp.status === 'ON_LEAVE'
                      ? 'bg-indigo-400'
                      : 'bg-slate-500'
                  }`}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-white">{inspectingEmp.fullName}</h3>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {inspectingEmp.empId}
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      inspectingEmp.status === 'ACTIVE'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : inspectingEmp.status === 'ON_BREAK'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                        : inspectingEmp.status === 'ON_LEAVE'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {inspectingEmp.status === 'ACTIVE'
                      ? '● Active at Desk'
                      : inspectingEmp.status === 'ON_BREAK'
                      ? `☕ On Break (${inspectingEmp.breakText.split(' ')[0]})`
                      : inspectingEmp.status === 'ON_LEAVE'
                      ? '🌴 On Leave'
                      : '○ Offline'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  <span className="text-slate-300 font-medium">{inspectingEmp.designation}</span> •{' '}
                  <span className="text-indigo-400">{inspectingEmp.departmentName}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <Link
                href={`/employees/${inspectingEmp.empId}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
              >
                <span>Full Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setInspectingEmp(null)}
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="flex border-b border-slate-800 px-6 bg-slate-900/50">
            {[
              { id: 'overview', label: 'Overview & Telemetry', icon: Activity },
              { id: 'tasks', label: 'Assigned Tasks', icon: CheckCircle2 },
              { id: 'apps', label: 'App & Web Runtime', icon: Laptop },
              { id: 'admin', label: 'Administrative Controls', icon: SlidersHorizontal },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveInspectorTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                    activeInspectorTab === tab.id
                      ? 'border-indigo-500 text-white bg-slate-800/40'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* TAB 1: OVERVIEW & TELEMETRY */}
            {activeInspectorTab === 'overview' && (
              <div className="space-y-6">
                {/* 4 Quick Stat KPIs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] font-medium text-slate-400">Live Productivity</span>
                    <div className="text-2xl font-black text-emerald-400 mt-1">{inspectingEmp.productivity}%</div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${inspectingEmp.productivity}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] font-medium text-slate-400">Hours Clocked Today</span>
                    <div className="text-2xl font-black text-white mt-1">{inspectingEmp.workingHours}</div>
                    <span className="text-[10px] text-indigo-400 font-mono">Punch: {inspectingEmp.punchIn}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] font-medium text-slate-400">Break Taken</span>
                    <div className="text-sm font-bold text-amber-300 mt-1 truncate">{inspectingEmp.breakText}</div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {inspectingEmp.breakDurationMinutes} mins total
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <span className="text-[11px] font-medium text-slate-400">Activity Ratio</span>
                    <div className="text-2xl font-black text-cyan-400 mt-1">
                      {Math.round(
                        (inspectingEmp.activeMinutes /
                          (inspectingEmp.activeMinutes + inspectingEmp.idleMinutes || 1)) *
                          100
                      )}
                      %
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {inspectingEmp.activeMinutes}m active • {inspectingEmp.idleMinutes}m idle
                    </span>
                  </div>
                </div>

                {/* Live Process & Screen Telemetry Card */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                      <Laptop className="w-4 h-4" />
                      <span>Live Workstation Telemetry Simulation</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>Telemetry Streaming</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px]">Foreground Process</span>
                      <p className="font-bold text-white mt-0.5">{inspectingEmp.activeApp}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[11px]">Active Window Title</span>
                      <p className="font-mono text-slate-200 mt-0.5 truncate">{inspectingEmp.activeWindow}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 text-[11px]">Current Assigned Task / Milestone</span>
                      <p className="font-semibold text-indigo-300 mt-0.5">{inspectingEmp.currentTask}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TASKS */}
            {activeInspectorTab === 'tasks' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sprint & Assigned Tasks</h4>
                  <span className="text-xs text-slate-400">{inspectingEmp.tasks.length} active tasks</span>
                </div>
                <div className="space-y-2">
                  {inspectingEmp.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            task.status === 'COMPLETED'
                              ? 'bg-emerald-400'
                              : task.status === 'IN_PROGRESS'
                              ? 'bg-amber-400 animate-pulse'
                              : 'bg-slate-500'
                          }`}
                        />
                        <span className="font-medium text-slate-200">{task.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            task.priority === 'HIGH'
                              ? 'bg-rose-500/20 text-rose-300'
                              : task.priority === 'MEDIUM'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {task.priority}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            task.status === 'COMPLETED'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : task.status === 'IN_PROGRESS'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: APPS & WEBSITES */}
            {activeInspectorTab === 'apps' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Top Applications Used Today</h4>
                  <div className="space-y-3">
                    {inspectingEmp.apps.map((app, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white">{app.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 font-mono">{app.duration}</span>
                            <span className="text-indigo-400 font-bold">{app.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${app.isProductive ? 'bg-indigo-500' : 'bg-rose-500'}`}
                            style={{ width: `${app.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Websites Visited</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {inspectingEmp.websites.map((web, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex justify-between items-center">
                        <div>
                          <span className="font-bold text-white font-mono">{web.domain}</span>
                          <span className="text-[10px] text-slate-400 block">{web.category}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-300 font-mono font-bold">{web.duration}</span>
                          <span className="text-[10px] text-slate-400 block">{web.visits} hits</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ADMINISTRATIVE CONTROLS */}
            {activeInspectorTab === 'admin' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 text-xs text-indigo-300">
                  <span className="font-bold">Administrative Supervisory Console:</span> Direct control signals are
                  dispatched to the enterprise agent on {inspectingEmp.fullName}&apos;s workstation.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <button
                    onClick={() => {
                      showToast(`Remote shift termination signal sent to ${inspectingEmp.fullName}`, 'info');
                    }}
                    className="p-4 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-750 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5 text-rose-400 font-bold text-xs mb-1">
                      <Power className="w-4 h-4" />
                      <span>Remote Shift Clock Out</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Forcefully clock out employee and secure terminal session.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      if (inspectingEmp.empId === 'EMP001' && todayAttendance.isOnBreak) {
                        endBreak();
                      }
                      showToast(`Break terminated for ${inspectingEmp.fullName}`, 'success');
                    }}
                    className="p-4 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-750 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs mb-1">
                      <Coffee className="w-4 h-4" />
                      <span>Force Terminate Break</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      End current coffee or lunch break and resume productivity tracking.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      showToast(`Workstation ping & message delivered to ${inspectingEmp.fullName}`, 'success');
                    }}
                    className="p-4 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-750 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5 text-indigo-400 font-bold text-xs mb-1">
                      <BellRing className="w-4 h-4" />
                      <span>Ping Workstation Notification</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Send a priority desktop prompt to employee&apos;s active screen.
                    </p>
                  </button>

                  <button
                    onClick={() => {
                      showToast(`Biometric face re-verification triggered for ${inspectingEmp.fullName}`, 'info');
                    }}
                    className="p-4 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-750 text-left transition-all group"
                  >
                    <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-xs mb-1">
                      <RotateCcw className="w-4 h-4" />
                      <span>Request Biometric Re-Auth</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Require instant face scan to confirm workstation presence.
                    </p>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-between items-center text-xs">
            <span className="text-slate-400 font-mono">
              Agent Telemetry v2.4 • EMP ID: {inspectingEmp.empId}
            </span>
            <button
              onClick={() => setInspectingEmp(null)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-all"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==========================================
  // 1. SUPER ADMIN DASHBOARD
  // ==========================================
  if (role === 'Super Admin') {
    const kpis = [
      { title: 'Total Employees', value: '128', sub: '+12 this quarter', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
      { title: 'Present Today', value: '112', sub: '87.5% attendance rate', icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
      {
        title: 'Staff On Break',
        value: todayAttendance.isOnBreak ? '1' : '0',
        sub: todayAttendance.isOnBreak ? `Rahul (${todayAttendance.currentBreakType.split(' ')[0]})` : 'All 112 at desk',
        icon: Coffee,
        color: todayAttendance.isOnBreak ? 'text-amber-300' : 'text-slate-400',
        bg: todayAttendance.isOnBreak ? 'bg-amber-500/20' : 'bg-slate-800/40',
        border: todayAttendance.isOnBreak ? 'border-amber-500/40 shadow-lg shadow-amber-500/10' : 'border-slate-800',
      },
      { title: 'On Leave', value: '8', sub: 'Annual & casual leaves', icon: CalendarDays, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
      {
        title: 'Currently Online',
        value: todayAttendance.isOnBreak ? '73' : '74',
        sub: todayAttendance.isOnBreak ? '73 Active • 1 on Break' : 'Live active desktop sessions',
        icon: Wifi,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/20',
      },
      { title: 'Total Working Hours', value: '682 hrs', sub: 'Avg 7.2 hrs / employee', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
      { title: 'Pending Payroll', value: '₹8,45,000', sub: 'October 2026 processing', icon: CreditCard, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
      { title: 'Security Alerts', value: '7', sub: '3 require review', icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    ];

    const attendanceData = [
      { name: 'Present', value: 112, color: '#10b981' },
      { name: 'Absent', value: 8, color: '#ef4444' },
      { name: 'On Leave', value: 8, color: '#f59e0b' },
    ];

    const departmentData = [
      { department: 'IT', productivity: 94, attendance: 92 },
      { department: 'HR', productivity: 88, attendance: 91 },
      { department: 'Finance', productivity: 91, attendance: 90 },
      { department: 'Sales', productivity: 82, attendance: 85 },
      { department: 'Operations', productivity: 85, attendance: 86 },
      { department: 'Trading', productivity: 96, attendance: 88 },
    ];

    const activityTrendData = [
      { time: '09:00', active: 35, idle: 5, productive: 30 },
      { time: '11:00', active: 70, idle: 8, productive: 65 },
      { time: '13:00', active: 52, idle: 22, productive: 45 },
      { time: '15:00', active: 74, idle: 9, productive: 68 },
      { time: '17:00', active: 68, idle: 12, productive: 60 },
      { time: '18:30', active: 42, idle: 6, productive: 38 },
    ];

    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Super Admin Executive Dashboard
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Full Org Governance
              </span>
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Centralized oversight across 128 employees, 6 departments, payroll, and infrastructure compliance.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/employees"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Employee Directory (128)</span>
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Reports</span>
            </Link>
          </div>
        </div>

        {/* LIVE BREAK TELEMETRY BANNER (General for all staff on break) */}
        {staffOnBreakList.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-slate-900 to-amber-950/20 border border-amber-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Coffee className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                    Live Telemetry Notice • Workstation Standby Mode
                  </span>
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                </div>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {staffOnBreakList.map((e) => `${e.fullName} (${e.empId})`).join(', ')} currently on{' '}
                  <span className="text-amber-300 font-extrabold">{todayAttendance.currentBreakType || 'Break'}</span>
                </h4>
                <p className="text-xs text-slate-300">
                  Break started at{' '}
                  <strong className="text-white font-mono">
                    {todayAttendance.currentBreakStartTime || '01:15 PM'}
                  </strong>{' '}
                  • Biometric & screen telemetry in Standby mode.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <button
                onClick={() => setStatusFilter('ON_BREAK')}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Filter Staff On Break ({staffOnBreakList.length})</span>
              </button>
              <Link
                href="/attendance"
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Attendance Log</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* 8 KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-slate-900/90 border ${kpi.border} shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-transform flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">{kpi.title}</span>
                  <div className={`p-2 rounded-xl ${kpi.bg}`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-black text-white tracking-tight">{kpi.value}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{kpi.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* LIVE WORKFORCE WORKSTATION, PRODUCTIVITY & CONTROL HUB */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Activity className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Company-Wide Employee Telemetry & Productivity Hub
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Stream
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time oversight of all 15 active staff across 6 departments • Monitor live productivity, active window, punch log, and biometric break status
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Link
                href="/attendance"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-all"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-400" />
                <span>Full Attendance Sheet</span>
              </Link>
              <Link
                href="/monitoring"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all"
              >
                <Laptop className="w-3.5 h-3.5" />
                <span>Live Surveillance Desk</span>
              </Link>
            </div>
          </div>

          {/* Search Bar & Quick Filters Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search employee by name, EMP ID, designation or active app..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Status Quick Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              {[
                { id: 'ALL', label: 'All Status', count: allTelemetryList.length },
                { id: 'ACTIVE', label: 'Active at Desk', count: allTelemetryList.filter((e) => e.status === 'ACTIVE').length },
                { id: 'ON_BREAK', label: 'On Break', count: staffOnBreakList.length },
                { id: 'ON_LEAVE', label: 'On Leave', count: allTelemetryList.filter((e) => e.status === 'ON_LEAVE').length },
                { id: 'OFFLINE', label: 'Offline', count: allTelemetryList.filter((e) => e.status === 'OFFLINE').length },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setStatusFilter(pill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    statusFilter === pill.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      statusFilter === pill.id ? 'bg-indigo-800 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {pill.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Department Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800/80">
            {[
              { id: 'ALL', label: 'All Departments' },
              { id: 'Information Technology', label: 'IT & Engineering' },
              { id: 'Trading & Risk', label: 'Trading & Risk' },
              { id: 'Finance & Accounts', label: 'Finance & Accounts' },
              { id: 'Human Resources', label: 'Human Resources' },
              { id: 'Sales & Marketing', label: 'Sales & Marketing' },
              { id: 'Operations', label: 'Operations' },
            ].map((dept) => {
              const count =
                dept.id === 'ALL'
                  ? allTelemetryList.length
                  : allTelemetryList.filter((e) => e.departmentName === dept.id).length;
              return (
                <button
                  key={dept.id}
                  onClick={() => setDeptFilter(dept.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    deptFilter === dept.id
                      ? 'bg-slate-800 text-white font-bold border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                  }`}
                >
                  <span>{dept.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({count})</span>
                </button>
              );
            })}
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/80">
                  <th className="py-3 px-4 font-semibold">Employee</th>
                  <th className="py-3 px-4 font-semibold">Department & Role</th>
                  <th className="py-3 px-4 font-semibold">Live Status</th>
                  <th className="py-3 px-4 font-semibold">Productivity</th>
                  <th className="py-3 px-4 font-semibold">Punch In / Out</th>
                  <th className="py-3 px-4 font-semibold">Break Status</th>
                  <th className="py-3 px-4 font-semibold">Active Window / Telemetry</th>
                  <th className="py-3 px-4 font-semibold text-right">Admin Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredTelemetryList.map((emp) => (
                  <tr
                    key={emp.empId}
                    className={`transition-colors ${
                      emp.status === 'ON_BREAK'
                        ? 'bg-amber-500/10 hover:bg-amber-500/15'
                        : emp.empId === 'EMP001'
                        ? 'bg-indigo-950/20 hover:bg-indigo-950/30'
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    {/* Employee Identity */}
                    <td className="py-3.5 px-4 font-sans font-bold text-white flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            emp.avatarUrl ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                          }
                          alt={emp.fullName}
                          className="w-8 h-8 rounded-full object-cover border border-slate-700"
                        />
                        <span
                          className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-slate-900 ${
                            emp.status === 'ACTIVE'
                              ? 'bg-emerald-400'
                              : emp.status === 'ON_BREAK'
                              ? 'bg-amber-400 animate-pulse'
                              : emp.status === 'ON_LEAVE'
                              ? 'bg-purple-400'
                              : 'bg-slate-500'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="hover:text-indigo-400 transition-colors cursor-pointer" onClick={() => setInspectingEmp(emp)}>
                            {emp.fullName}
                          </span>
                          {emp.empId === 'EMP001' && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              YOU
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono block">{emp.empId}</span>
                      </div>
                    </td>

                    {/* Department & Role */}
                    <td className="py-3.5 px-4 font-sans text-slate-300">
                      <div className="font-medium">{emp.departmentName}</div>
                      <span className="text-[10px] text-slate-500">{emp.designation}</span>
                    </td>

                    {/* Live Status Badge */}
                    <td className="py-3.5 px-4 font-sans">
                      {emp.status === 'ACTIVE' ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Active at Desk</span>
                        </span>
                      ) : emp.status === 'ON_BREAK' ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 w-fit animate-pulse">
                          <Coffee className="w-3.5 h-3.5 text-amber-400" />
                          <span>{emp.breakText.split('(')[0]}</span>
                        </span>
                      ) : emp.status === 'ON_LEAVE' ? (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 w-fit">
                          🌴 On Leave
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-800 text-slate-400 border border-slate-700 w-fit">
                          Offline / Shift Done
                        </span>
                      )}
                    </td>

                    {/* Live Productivity Score & Meter */}
                    <td className="py-3.5 px-4 font-sans">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-bold font-mono text-xs ${
                            emp.productivity >= 90
                              ? 'text-emerald-400'
                              : emp.productivity >= 80
                              ? 'text-indigo-300'
                              : emp.productivity > 0
                              ? 'text-amber-400'
                              : 'text-slate-500'
                          }`}
                        >
                          {emp.productivity}%
                        </span>
                        <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              emp.productivity >= 90
                                ? 'bg-emerald-500'
                                : emp.productivity >= 80
                                ? 'bg-indigo-500'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${emp.productivity}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Punch In / Out */}
                    <td className="py-3.5 px-4 text-xs">
                      <div className="text-indigo-300 font-bold">{emp.punchIn}</div>
                      <span className="text-[10px] text-slate-400 block">{emp.workingHours} clocked</span>
                    </td>

                    {/* Break Status / Duration */}
                    <td className="py-3.5 px-4 font-sans text-xs">
                      {emp.status === 'ON_BREAK' ? (
                        <div className="text-amber-300 font-mono">
                          <span className="font-bold">{emp.breakText}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 font-mono">{emp.breakText}</span>
                      )}
                    </td>

                    {/* Workstation Telemetry */}
                    <td className="py-3.5 px-4 font-sans text-xs max-w-[200px]">
                      {emp.status === 'ON_BREAK' ? (
                        <span className="text-amber-400/90 italic flex items-center gap-1">
                          <Coffee className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">Biometric Paused • Away</span>
                        </span>
                      ) : emp.status === 'ACTIVE' ? (
                        <div>
                          <div className="text-emerald-400 font-medium truncate flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span className="truncate">{emp.activeApp}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 truncate block font-mono">
                            {emp.activeWindow}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-500 italic">No telemetry streaming</span>
                      )}
                    </td>

                    {/* Admin Action Controls */}
                    <td className="py-3.5 px-4 text-right font-sans">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setInspectingEmp(emp)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/40 transition-all shadow-sm"
                          title="Inspect full individual dashboard, tasks and app telemetry"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                        <Link
                          href={`/employees/${emp.empId}`}
                          className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
                          title="View Profile"
                        >
                          Profile
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 px-1">
            <span>
              Showing <strong className="text-white">{filteredTelemetryList.length}</strong> of{' '}
              <strong className="text-white">{allTelemetryList.length}</strong> workforce members
            </span>
            <span className="text-emerald-400 font-mono">
              ● Central Governance Engine Active • Full Oversight Mode
            </span>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">Attendance Overview</h2>
              <Link href="/attendance" className="text-xs text-indigo-400 font-semibold">View Log →</Link>
            </div>
            <div className="h-60 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={attendanceData} cx="50%" cy="50%" innerRadius={60} outerRadius={85} paddingAngle={5} dataKey="value">
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-white">87.5%</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Present</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">Department Productivity & Attendance</h2>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Avg Score: 89.3%
              </span>
            </div>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} barGap={6}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="department" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Bar dataKey="productivity" name="Productivity (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="attendance" name="Attendance (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Security Alerts and Audit row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Security Threat Alerts
              </h2>
              <Link href="/security" className="text-xs text-indigo-400 font-semibold">Security Hub →</Link>
            </div>
            <div className="space-y-3 flex-1">
              {securityAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="p-3 rounded-xl border bg-slate-950/60 border-slate-800 text-xs">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-white">{alert.title}</span>
                    <span className="text-[10px] text-amber-400 font-bold">{alert.severity}</span>
                  </div>
                  <p className="text-[11px] text-slate-300">{alert.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-white">Recent Immutable Audit Trail</h2>
              <Link href="/security" className="text-xs text-indigo-400 font-semibold">Full Audit Log →</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-2">User</th>
                    <th className="pb-2">Action</th>
                    <th className="pb-2">Module</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {auditLogs.slice(0, 4).map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/30">
                      <td className="py-2 text-white font-semibold">{log.userName}</td>
                      <td className="py-2 font-mono text-indigo-300">{log.action}</td>
                      <td className="py-2 text-slate-300">{log.module}</td>
                      <td className="py-2 text-slate-400">{log.timestamp}</td>
                      <td className="py-2 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. HR SPECIALIST DASHBOARD (Priya Sharma)
  // ==========================================
  if (role === 'HR') {
    const pendingRequests = leaveRequests.filter((r) => r.status === 'PENDING');

    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <UserCheck className="w-4 h-4" />
              <span>Human Resources Operations Portal</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              HR Workforce & People Dashboard (Priya Sharma)
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Attendance compliance, leave approvals, employee headcount, and onboarding tracking.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/employees"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Onboard Employee</span>
            </Link>
          </div>
        </div>

        {/* HR KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Total Registered Staff</span>
            <div className="text-2xl font-black text-white mt-1">128</div>
            <span className="text-[10px] text-emerald-400 font-semibold">+6 joined this month</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Present Today</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">112</div>
            <span className="text-[10px] text-slate-400">87.5% attendance rate</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Pending Leave Requests</span>
            <div className="text-2xl font-black text-amber-400 mt-1">{pendingRequests.length}</div>
            <span className="text-[10px] text-amber-400 font-semibold">Action required below</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Unplanned Absences</span>
            <div className="text-2xl font-black text-rose-400 mt-1">8</div>
            <span className="text-[10px] text-slate-400">Follow-up notifications sent</span>
          </div>
        </div>

        {/* HR Actionable Leave Approval Queue */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-amber-400" />
                Leave Approval Queue ({pendingRequests.length} Awaiting HR Sign-off)
              </h3>
              <p className="text-xs text-slate-400">Review employee time-off applications with one click</p>
            </div>
            <Link href="/leave" className="text-xs text-indigo-400 font-semibold">View All Requests →</Link>
          </div>

          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{req.employeeName}</span>
                    <span className="text-slate-400 font-mono text-xs">({req.empId})</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                      {req.leaveType} ({req.daysCount} Days)
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1"><strong>Reason:</strong> {req.reason}</p>
                  <span className="text-[11px] text-slate-400">Dates: {req.startDate} to {req.endDate}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => approveLeave(req.id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow transition-all"
                  >
                    Approve Request
                  </button>
                  <button
                    onClick={() => rejectLeave(req.id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600/80 hover:bg-rose-600 text-white transition-all"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Attendance Rates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white">Department Attendance Ratios (Today)</h3>
            <div className="space-y-3 text-xs">
              {[
                { name: 'Information Technology', present: 45, total: 48, rate: 93.7 },
                { name: 'Human Resources', present: 11, total: 12, rate: 91.6 },
                { name: 'Finance & Accounts', present: 18, total: 20, rate: 90.0 },
                { name: 'Sales & Marketing', present: 22, total: 26, rate: 84.6 },
                { name: 'Operations', present: 12, total: 14, rate: 85.7 },
                { name: 'Trading & Risk', present: 4, total: 8, rate: 50.0 },
              ].map((d) => (
                <div key={d.name} className="space-y-1">
                  <div className="flex justify-between font-medium">
                    <span className="text-white">{d.name}</span>
                    <span className="text-emerald-400 font-bold">{d.present}/{d.total} ({d.rate}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${d.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white">Late Arrival Flagged Employees</h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white">Diya Sengupta (EMP013)</span>
                  <p className="text-[11px] text-slate-400">IT Dept • Check-in: 09:32 AM (+32m)</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">Grace Used</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                <div>
                  <span className="font-bold text-white">Ishaan Bhatt (EMP014)</span>
                  <p className="text-[11px] text-slate-400">Sales Dept • Check-in: 09:40 AM (+40m)</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">Client Visit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Employee Dashboard Inspector Modal */}
        {renderEmployeeInspectorModal()}
      </div>
    );
  }

  // ==========================================
  // 3. MANAGER DASHBOARD (Amit Patel)
  // ==========================================
  if (role === 'Manager') {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Engineering Division Supervision</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Engineering Team Dashboard (Amit Patel)
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Scoped strictly to your 12 engineering reports (Rahul Bajediyal, Ananya Iyer, Aarav Deshmukh, etc.)
            </p>
          </div>
        </div>

        {/* LIVE MANAGER TEAM BREAK ALERT */}
        {todayAttendance.isOnBreak && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Coffee className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Live Team Telemetry • Workstation Paused
                </span>
                <p className="text-sm font-bold text-white">
                  Rahul Bajediyal is currently on <span className="text-amber-300 font-extrabold">{todayAttendance.currentBreakType}</span> (Started at {todayAttendance.currentBreakStartTime})
                </p>
                <p className="text-[11px] text-slate-300">
                  Sprint activity telemetry is on hold. Rahul will resume development upon biometric break completion.
                </p>
              </div>
            </div>
            <Link
              href="/attendance"
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 whitespace-nowrap transition-all shadow-md shadow-amber-500/20"
            >
              Check Punch Record →
            </Link>
          </div>
        )}

        {/* Manager Team KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">My Team Size</span>
            <div className="text-2xl font-black text-white mt-1">12 Engineers</div>
            <span className="text-[10px] text-emerald-400 font-semibold">
              {todayAttendance.isOnBreak ? '10 Active • 1 On Break' : '11 Active Online Now'}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Team Avg Productivity</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">92.4%</div>
            <span className="text-[10px] text-emerald-400">Highest across company</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Sprint Tasks Progress</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">42 / 54</div>
            <span className="text-[10px] text-slate-400">77.7% Sprint Velocity</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Overtime Logged</span>
            <div className="text-2xl font-black text-amber-400 mt-1">14.5 hrs</div>
            <span className="text-[10px] text-slate-400">Pre-release deployment</span>
          </div>
        </div>

        {/* Team Members Live Telemetry Cards */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-400" />
                Engineering Team Live Telemetry & Productivity Roster
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time active workstations, code branches, and biometric break status for your 4 direct engineering reports
              </p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {todayAttendance.isOnBreak ? '3 Online • 1 On Break' : '4 Online Active'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allTelemetryList
              .filter((e) => e.departmentName === 'Information Technology' && e.empId !== 'EMP002')
              .map((eng) => (
                <div
                  key={eng.empId}
                  className={`p-4 rounded-2xl border text-xs space-y-3 transition-all ${
                    eng.status === 'ON_BREAK'
                      ? 'bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={
                          eng.avatarUrl ||
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
                        }
                        alt={eng.fullName}
                        className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                      />
                      <div>
                        <span className="font-bold text-white block">{eng.fullName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{eng.empId}</span>
                      </div>
                    </div>
                    {eng.status === 'ON_BREAK' ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 animate-pulse">
                        <Coffee className="w-3 h-3 text-amber-400" />
                        <span>BREAK</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        ONLINE
                      </span>
                    )}
                  </div>

                  {/* Productivity Score */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Productivity Score:</span>
                      <strong className="text-emerald-400 font-mono">{eng.productivity}%</strong>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${eng.productivity}%` }}
                      />
                    </div>
                  </div>

                  {/* Active Task */}
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                      Sprint Task
                    </span>
                    <p className="text-slate-200 font-medium text-[11px] truncate">
                      {eng.currentTask}
                    </p>
                  </div>

                  {/* Telemetry info */}
                  <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-2 font-mono">
                    <span>Working: <strong className="text-white">{eng.workingHours}</strong></span>
                    <span>Break: <strong className="text-amber-400">{eng.breakText.split('(')[0]}</strong></span>
                  </div>

                  {/* Manager Controls */}
                  <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
                    <button
                      onClick={() => setInspectingEmp(eng)}
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-xs font-bold bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </button>
                    <Link
                      href={`/employees/${eng.empId}`}
                      className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => showToast(`Workstation alert ping sent to ${eng.fullName}`, 'success')}
                      className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
                      title="Ping Workstation"
                    >
                      <BellRing className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Manager Action Items (Rahul's Leave & Trades) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-amber-400" />
              Team Time-Off Requests
            </h3>
            {leaveRequests.filter(r => r.status === 'PENDING').slice(0, 1).map(r => (
              <div key={r.id} className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs space-y-2">
                <div className="flex justify-between font-bold text-white">
                  <span>{r.employeeName} ({r.leaveType})</span>
                  <span className="text-amber-400">{r.daysCount} Days</span>
                </div>
                <p className="text-slate-300 text-[11px]">{r.reason}</p>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button onClick={() => approveLeave(r.id)} className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white">
                    Approve
                  </button>
                  <button onClick={() => rejectLeave(r.id)} className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-600/80 text-white">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CandlestickChart className="w-4 h-4 text-indigo-400" />
              Trade Order Authorizations
            </h3>
            {trades.filter(t => t.status === 'PENDING').slice(0, 1).map(t => (
              <div key={t.id} className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs space-y-2">
                <div className="flex justify-between font-bold text-white">
                  <span>{t.traderName} — {t.symbol}</span>
                  <span className="text-emerald-400 font-mono">{t.type} {t.quantity} Qty</span>
                </div>
                <p className="text-slate-400 text-[11px]">Entry Price: ₹{t.entryPrice}</p>
                <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                  <button onClick={() => approveTrade(t.id)} className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white">
                    Approve Trade
                  </button>
                  <button onClick={() => rejectTrade(t.id)} className="px-3 py-1 rounded-lg text-xs font-bold bg-rose-600/80 text-white">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Employee Dashboard Inspector Modal */}
        {renderEmployeeInspectorModal()}
      </div>
    );
  }

  // ==========================================
  // 4. FINANCE CONTROLLER DASHBOARD (Sunita Menon)
  // ==========================================
  if (role === 'Finance') {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider mb-1">
              <DollarSign className="w-4 h-4" />
              <span>Treasury & Corporate Accounts</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Finance & Payroll Operations Dashboard (Sunita Menon)
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Monthly budget disbursement, statutory tax remittances, and batch payslip generation.
            </p>
          </div>
          <button
            onClick={() => showToast('Disbursed remaining ₹8,45,000 batch payroll!', 'success')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Disburse Remaining ₹8,45,000</span>
          </button>
        </div>

        {/* Finance KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Total October Budget</span>
            <div className="text-2xl font-black text-white mt-1">₹58,40,000</div>
            <span className="text-[10px] text-slate-400">128 Full Staff</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Processed & Disbursed</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">₹49,95,000</div>
            <span className="text-[10px] text-emerald-400 font-semibold">108 Employees Settled</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Pending Disbursal</span>
            <div className="text-2xl font-black text-amber-400 mt-1">₹8,45,000</div>
            <span className="text-[10px] text-amber-400">20 Under Verification</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Statutory Tax & PF Collected</span>
            <div className="text-2xl font-black text-purple-400 mt-1">₹4,10,000</div>
            <span className="text-[10px] text-slate-400">TDS + EPFO remittance</span>
          </div>
        </div>

        {/* Payroll Disbursal Progress & Slips */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Batch Disbursal Progress (October 2026)</h3>
              <p className="text-xs text-slate-400">84.4% of total payroll disbursed into employee HDFC/ICICI accounts</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl">
              108 / 128 Disbursed
            </span>
          </div>

          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div className="bg-gradient-to-r from-indigo-500 to-emerald-500 h-full rounded-full" style={{ width: '84.4%' }} />
          </div>

          <div className="pt-4 flex justify-between items-center text-xs">
            <span className="text-slate-400">Total Net Amount: <strong className="text-white">₹53,600 avg / emp</strong></span>
            <Link href="/payroll" className="text-indigo-400 font-semibold hover:text-indigo-300">
              Open Full Payroll Ledger & Payslip Generator →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 5. TRADER DASHBOARD (Rohan Gupta)
  // ==========================================
  if (role === 'Trader') {
    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Market Ticker Bar */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between overflow-x-auto text-xs font-semibold gap-6">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400">NIFTY 50:</span>
            <span className="text-emerald-400 font-mono font-bold">24,530.80</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded font-bold">▲ +142.50 (+0.58%)</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400">BANKNIFTY:</span>
            <span className="text-emerald-400 font-mono font-bold">52,184.20</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded font-bold">▲ +310.40 (+0.60%)</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400">RELIANCE:</span>
            <span className="text-emerald-400 font-mono font-bold">3,012.00</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/20 px-1.5 py-0.2 rounded font-bold">▲ +24.00</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400">TCS:</span>
            <span className="text-rose-400 font-mono font-bold">4,188.50</span>
            <span className="text-[10px] text-rose-400 bg-rose-500/20 px-1.5 py-0.2 rounded font-bold">▼ -12.00</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <CandlestickChart className="w-4 h-4" />
              <span>Proprietary Trading Desk</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Institutional Trading Terminal (Rohan Gupta)
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Order execution, risk management boundaries, and daily net profit/loss tracking.
            </p>
          </div>
          <Link
            href="/trading"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Place New Trade Order</span>
          </Link>
        </div>

        {/* Trader KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Today's Realized P&L</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">+₹34,500</div>
            <span className="text-[10px] text-emerald-400 font-semibold">14 trades executed</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Cumulative Net P&L</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">+₹2,45,800</div>
            <span className="text-[10px] text-slate-400">71.7% win rate</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Risk Exposure Utilized</span>
            <div className="text-2xl font-black text-amber-400 mt-1">₹2,80,000</div>
            <span className="text-[10px] text-slate-400">Cap: ₹4,10,000 (68.3%)</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">Pending Sign-Offs</span>
            <div className="text-2xl font-black text-indigo-400 mt-1">2 Orders</div>
            <span className="text-[10px] text-slate-400">Under Risk Manager review</span>
          </div>
        </div>

        {/* Recent Trades Table */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Active Proprietary Order Book</h3>
            <Link href="/trading" className="text-xs text-indigo-400 font-semibold">All Transactions →</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5">Code</th>
                  <th className="py-2.5">Symbol</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5">Quantity</th>
                  <th className="py-2.5">Entry Price</th>
                  <th className="py-2.5">P&L</th>
                  <th className="py-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {trades.slice(0, 5).map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-mono text-indigo-400 font-bold">{t.tradeCode}</td>
                    <td className="py-2.5 text-white font-bold">{t.symbol}</td>
                    <td className="py-2.5 font-bold">
                      <span className={t.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}>{t.type}</span>
                    </td>
                    <td className="py-2.5 font-mono text-slate-300">{t.quantity}</td>
                    <td className="py-2.5 font-mono text-slate-300">₹{t.entryPrice}</td>
                    <td className="py-2.5 font-mono font-bold text-emerald-400">
                      {t.pnl !== 0 ? `+₹${t.pnl}` : '-'}
                    </td>
                    <td className="py-2.5 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 6. EMPLOYEE DASHBOARD (Rahul Bajediyal)
  // ==========================================
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Personalized Greeting */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>PAVION Employee Self-Service Space</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Good Morning, Rahul 👋
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Senior Software Engineer • IT Department • Bengaluru HQ
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/attendance"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all"
          >
            Live Attendance Station →
          </Link>
        </div>
      </div>

      {/* Employee Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Today's Check In</span>
          <div className="text-xl font-black text-white mt-1">09:12 AM</div>
          <span className="text-[10px] text-emerald-400">✓ On-Time Clock</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Working Time</span>
          <div className="text-xl font-black text-indigo-400 font-mono mt-1">{todayAttendance.workingTime}</div>
          <span className="text-[10px] text-slate-400">Break: {todayAttendance.breakTime}</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Productivity Score</span>
          <div className="text-xl font-black text-emerald-400 mt-1">78%</div>
          <span className="text-[10px] text-slate-400">VS Code & Git active</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Sprint Tasks</span>
          <div className="text-xl font-black text-white mt-1">8 Total</div>
          <span className="text-[10px] text-emerald-400">5 Done • 3 Pending</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl col-span-2 md:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Leave Balance</span>
          <div className="text-xl font-black text-amber-400 mt-1">{leaveBalances.annual.remaining} Days</div>
          <span className="text-[10px] text-slate-400">Annual Leave Left</span>
        </div>
      </div>

      {/* Live Punch Controls */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-white">Live Punch Station</h3>
          <p className="text-xs text-slate-400">
            Current Status: <strong className="text-emerald-400">{todayAttendance.isOnBreak ? 'On Break' : 'Active On Duty'}</strong> • Working time clocked: {todayAttendance.workingTime}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {!todayAttendance.isOnBreak ? (
            <button onClick={startBreak} className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white">
              Take Break
            </button>
          ) : (
            <button onClick={endBreak} className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white">
              Resume Work
            </button>
          )}
          <button onClick={checkOut} className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600/80 text-white">
            Clock Out
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/attendance" className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-left transition-all">
          <h4 className="font-bold text-white text-sm">My Attendance Records</h4>
          <p className="text-xs text-slate-400 mt-1">Monthly punch times, breaks, and overtime log</p>
        </Link>
        <Link href="/leave" className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-left transition-all">
          <h4 className="font-bold text-white text-sm">Apply for Leave / Time-Off</h4>
          <p className="text-xs text-slate-400 mt-1">Submit request for annual, sick, or casual leaves</p>
        </Link>
        <Link href="/payroll" className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/30 text-left transition-all">
          <h4 className="font-bold text-white text-sm">My October Payslip (₹53,600)</h4>
          <p className="text-xs text-slate-400 mt-1">Inspect itemized tax slip and download PDF</p>
        </Link>
      </div>
    </div>
  );
}
