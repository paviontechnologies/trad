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

  // ==========================================
  // 1. SUPER ADMIN DASHBOARD
  // ==========================================
  if (role === 'Super Admin') {
    const kpis = [
      { title: 'Total Employees', value: '128', sub: '+12 this quarter', icon: Users, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
      { title: 'Present Today', value: '112', sub: '87.5% attendance rate', icon: UserCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
      { title: 'Absent Today', value: '8', sub: '3 planned, 5 unplanned', icon: UserX, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
      { title: 'On Leave', value: '8', sub: 'Annual & casual leaves', icon: CalendarDays, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
      { title: 'Currently Online', value: '74', sub: 'Live active desktop sessions', icon: Wifi, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
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
              href="/employees/EMP001"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Showcase: Rahul Profile</span>
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

        {/* Manager Team KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
            <span className="text-xs text-slate-400 font-medium">My Team Size</span>
            <div className="text-2xl font-black text-white mt-1">12 Engineers</div>
            <span className="text-[10px] text-emerald-400 font-semibold">11 Active Online Now</span>
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
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              Live Team Telemetry & Current Window Status
            </h3>
            <span className="text-xs text-emerald-400 font-semibold">11 Online • 1 On Leave</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Rahul Bajediyal</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ONLINE</span>
              </div>
              <p className="text-slate-400">Active Task: <strong>Refactor Auth Middleware</strong></p>
              <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-1.5">
                <span>Active: <strong className="text-white">6h 41m</strong></span>
                <span>Productivity: <strong className="text-emerald-400">78%</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Aarav Deshmukh</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ONLINE</span>
              </div>
              <p className="text-slate-400">Active Task: <strong>PostgreSQL Query Optimization</strong></p>
              <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-1.5">
                <span>Active: <strong className="text-white">6h 30m</strong></span>
                <span>Productivity: <strong className="text-emerald-400">91%</strong></span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white">Ananya Iyer</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ONLINE</span>
              </div>
              <p className="text-slate-400">Active Task: <strong>Recharts Layout Integration</strong></p>
              <div className="flex justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-1.5">
                <span>Active: <strong className="text-white">6h 00m</strong></span>
                <span>Productivity: <strong className="text-emerald-400">83%</strong></span>
              </div>
            </div>
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
