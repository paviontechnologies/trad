'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../lib/auth-context';
import {
  rahulActivitySession,
  rahulAppUsage,
  rahulWebUsage,
  rahulLeaveBalances,
} from '../../../../lib/data';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  FileText,
  TrendingUp,
  Monitor,
  Activity,
  Layers,
  Globe,
  CreditCard,
  ShieldAlert,
  Printer,
  Download,
  Check,
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export default function EmployeeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { employees, leaveRequests, showToast } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'activity' | 'tasks' | 'leave' | 'payroll' | 'security'>('overview');
  const [showPayslipModal, setShowPayslipModal] = useState(false);

  // Find employee or default to Rahul Bajediyal
  const employee =
    employees.find((e) => e.empId === params.id || e.id === params.id) ||
    employees[0];

  // Tasks state for Rahul
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Refactor Auth middleware for RBAC', priority: 'HIGH', status: 'COMPLETED', due: '07 Oct 2026' },
    { id: 2, title: 'Integrate Recharts with Productivity Dashboard', priority: 'HIGH', status: 'COMPLETED', due: '07 Oct 2026' },
    { id: 3, title: 'Optimize PostgreSQL queries for attendance log', priority: 'MEDIUM', status: 'COMPLETED', due: '08 Oct 2026' },
    { id: 4, title: 'Setup automated CSV export for HR reports', priority: 'MEDIUM', status: 'COMPLETED', due: '08 Oct 2026' },
    { id: 5, title: 'Create printable payslip PDF template', priority: 'HIGH', status: 'COMPLETED', due: '08 Oct 2026' },
    { id: 6, title: 'Implement real-time break counter timer', priority: 'MEDIUM', status: 'IN_PROGRESS', due: '09 Oct 2026' },
    { id: 7, title: 'Add unit tests for payroll salary deductions', priority: 'LOW', status: 'PENDING', due: '10 Oct 2026' },
    { id: 8, title: 'Review security audit alert webhooks', priority: 'HIGH', status: 'PENDING', due: '11 Oct 2026' },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' }
          : t
      )
    );
    showToast('Task status updated', 'info');
  };

  const completedCount = tasks.filter((t) => t.status === 'COMPLETED').length;

  const productivityPie = [
    { name: 'Productive', value: 72, color: '#10b981' },
    { name: 'Neutral', value: 18, color: '#6366f1' },
    { name: 'Non-productive', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Back button */}
      <div>
        <button
          onClick={() => router.push('/employees')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Employee Directory</span>
        </button>
      </div>

      {/* Profile Header Hero Card */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-indigo-500/40 overflow-hidden shadow-xl">
              <img
                src={employee.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'}
                alt={employee.fullName}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white border-2 border-slate-900 shadow">
              ONLINE
            </span>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-black text-white">{employee.fullName}</h1>
              <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30">
                {employee.empId}
              </span>
            </div>
            <p className="text-sm text-slate-300 font-medium mt-0.5">{employee.designation}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                {employee.departmentName || 'Information Technology'}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {employee.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                {employee.phone || '+91 98765 43210'}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                Reporting to: <strong className="text-slate-200">{employee.managerName || 'Amit Patel'}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Highlights */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center min-w-[90px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Productivity</span>
            <div className="text-xl font-black text-emerald-400 mt-0.5">78%</div>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center min-w-[90px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Active Time</span>
            <div className="text-xl font-black text-indigo-400 mt-0.5">6h 41m</div>
          </div>
          <div className="px-4 py-3 rounded-2xl bg-slate-950/70 border border-slate-800 text-center min-w-[90px]">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Gross Salary</span>
            <div className="text-xl font-black text-white mt-0.5">₹58k</div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-800 flex items-center gap-2 overflow-x-auto pb-px">
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'attendance', label: 'Attendance' },
          { key: 'activity', label: 'Activity Telemetry' },
          { key: 'tasks', label: `Tasks (${completedCount}/8)` },
          { key: 'leave', label: 'Leave & Balances' },
          { key: 'payroll', label: 'Payroll & Payslips' },
          { key: 'security', label: 'Security & Access' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.key
                ? 'border-indigo-500 text-white bg-indigo-500/10 rounded-t-xl'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Today's Activity Card */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  Today's Session Monitoring
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Login Time</span>
                  <span className="font-semibold text-white">09:12 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Current Session Duration</span>
                  <span className="font-semibold text-white">07h 22m</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Active Working Time</span>
                  <span className="font-semibold text-emerald-400 font-mono">06h 41m (89.5%)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Idle / Paused Time</span>
                  <span className="font-semibold text-amber-400 font-mono">41m (10.5%)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Productivity Score</span>
                  <span className="font-black text-indigo-400 text-sm">78 / 100</span>
                </div>
              </div>
            </div>

            {/* Attendance Snapshot */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Today's Attendance Punch
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Present
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Punch In Time</span>
                  <span className="font-semibold text-white">09:12 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Scheduled Shift</span>
                  <span className="font-semibold text-white">09:00 AM - 06:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Meal / Break Taken</span>
                  <span className="font-semibold text-white">45 minutes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Overtime Recorded</span>
                  <span className="font-semibold text-emerald-400">+30 minutes</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Status Verified</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Biometric Sync
                  </span>
                </div>
              </div>
            </div>

            {/* Productivity Donut */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
              <h3 className="text-sm font-bold text-white mb-2">Productivity Composition</h3>
              <div className="h-36 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={productivityPie} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value">
                      {productivityPie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-lg font-black text-white">78%</span>
                </div>
              </div>
              <div className="flex justify-around text-[10px] pt-2 border-t border-slate-800">
                <span className="text-emerald-400 font-bold">72% Productive</span>
                <span className="text-indigo-400 font-bold">18% Neutral</span>
                <span className="text-rose-400 font-bold">10% Non-prod</span>
              </div>
            </div>
          </div>

          {/* Quick links to Rahul's tasks and leave */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Top Assigned Tasks</h4>
              <div className="space-y-2">
                {tasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-white font-medium">{task.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase mb-3">Leave Balance Summary</h4>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Annual</span>
                  <div className="text-lg font-black text-indigo-400">9 / 14</div>
                  <span className="text-[10px] text-slate-500">Days remaining</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Sick</span>
                  <div className="text-lg font-black text-emerald-400">8 / 10</div>
                  <span className="text-[10px] text-slate-500">Days remaining</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[10px]">Casual</span>
                  <div className="text-lg font-black text-amber-400">7 / 8</div>
                  <span className="text-[10px] text-slate-500">Days remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ATTENDANCE TAB */}
      {activeTab === 'attendance' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Monthly Attendance Ledger (October 2026)</h3>
              <p className="text-xs text-slate-400">Total working days: 22 • Present: 21 • Leave: 1 • Overtime: 14 hrs</p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
              95.4% Attendance Score
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 font-semibold">Date</th>
                  <th className="py-2.5 font-semibold">Check In</th>
                  <th className="py-2.5 font-semibold">Check Out</th>
                  <th className="py-2.5 font-semibold">Working Hours</th>
                  <th className="py-2.5 font-semibold">Break</th>
                  <th className="py-2.5 font-semibold">Overtime</th>
                  <th className="py-2.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { date: '08 Oct', in: '09:12', out: '18:03', work: '8h 10m', break: '45m', ot: '30m', status: 'Present' },
                  { date: '07 Oct', in: '09:05', out: '18:30', work: '8h 35m', break: '50m', ot: '1h 00m', status: 'Present' },
                  { date: '06 Oct', in: '09:15', out: '18:10', work: '8h 05m', break: '50m', ot: '15m', status: 'Present' },
                  { date: '05 Oct', in: '08:58', out: '18:00', work: '8h 12m', break: '50m', ot: '12m', status: 'Present' },
                  { date: '04 Oct', in: '09:10', out: '17:45', work: '7h 50m', break: '45m', ot: '0m', status: 'Present' },
                  { date: '03 Oct', in: '-', out: '-', work: '0h 00m', break: '0m', ot: '0m', status: 'Casual Leave' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-medium text-white">{row.date}</td>
                    <td className="py-2.5 text-slate-300 font-mono">{row.in}</td>
                    <td className="py-2.5 text-slate-300 font-mono">{row.out}</td>
                    <td className="py-2.5 text-white font-semibold font-mono">{row.work}</td>
                    <td className="py-2.5 text-slate-400">{row.break}</td>
                    <td className="py-2.5 text-emerald-400 font-mono font-medium">{row.ot}</td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        row.status === 'Present' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ACTIVITY TELEMETRY TAB */}
      {activeTab === 'activity' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2">
            <Monitor className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>
              <strong>Client Demo Notice:</strong> Simulated mock application and website telemetry is presented. Real OS background agent executes in Phase 2.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Application Usage Table */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Application Usage Breakdown
              </h3>
              <div className="space-y-3">
                {rahulAppUsage.map((app) => (
                  <div key={app.appName} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white flex items-center gap-2">
                        {app.appName}
                        <span className="text-[10px] text-slate-400 font-normal">({app.category})</span>
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono">{app.duration}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                            app.status === 'Productive'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : app.status === 'Neutral'
                              ? 'bg-indigo-500/20 text-indigo-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          app.status === 'Productive'
                            ? 'bg-emerald-500'
                            : app.status === 'Neutral'
                            ? 'bg-indigo-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${app.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Website Usage Table */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Website Usage Telemetry
              </h3>
              <div className="space-y-3">
                {rahulWebUsage.map((site) => (
                  <div key={site.domain} className="space-y-1 text-xs">
                    <div className="flex justify-between font-semibold">
                      <span className="text-white font-mono">{site.domain}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 font-mono">{site.duration}</span>
                        <span
                          className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                            site.status === 'Productive'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : site.status === 'Neutral'
                              ? 'bg-indigo-500/20 text-indigo-400'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {site.status}
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          site.status === 'Productive'
                            ? 'bg-emerald-500'
                            : site.status === 'Neutral'
                            ? 'bg-indigo-500'
                            : 'bg-rose-500'
                        }`}
                        style={{ width: `${site.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. TASKS TAB */}
      {activeTab === 'tasks' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Assigned Sprint Tasks</h3>
              <p className="text-xs text-slate-400">{completedCount} of {tasks.length} tasks completed this sprint</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-xl">
              {Math.round((completedCount / tasks.length) * 100)}% Sprint Completion
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                  task.status === 'COMPLETED'
                    ? 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                    : 'bg-slate-800/40 border-slate-700 text-white hover:border-indigo-500/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      task.status === 'COMPLETED'
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-600 bg-slate-900'
                    }`}
                  >
                    {task.status === 'COMPLETED' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <span className={task.status === 'COMPLETED' ? 'line-through text-slate-500' : 'font-semibold'}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-[11px]">Due: {task.due}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      task.priority === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-400'
                        : 'bg-indigo-500/20 text-indigo-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. LEAVE TAB */}
      {activeTab === 'leave' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Annual Leave</span>
              <div className="text-2xl font-black text-indigo-400 mt-1">9 Remaining</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Total 14 allotted • 5 consumed</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Sick Leave</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">8 Remaining</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Total 10 allotted • 2 consumed</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Casual Leave</span>
              <div className="text-2xl font-black text-amber-400 mt-1">7 Remaining</div>
              <p className="text-[10px] text-slate-500 mt-0.5">Total 8 allotted • 1 consumed</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
            <h3 className="text-sm font-bold text-white mb-3">Leave History for Rahul Bajediyal</h3>
            <div className="space-y-3">
              {leaveRequests
                .filter((r) => r.empId === 'EMP001')
                .map((req) => (
                  <div key={req.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{req.leaveType} Leave ({req.daysCount} Days)</span>
                        <span className="text-slate-400 font-mono">{req.startDate} to {req.endDate}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{req.reason}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        req.status === 'APPROVED'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : req.status === 'PENDING'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. PAYROLL TAB */}
      {activeTab === 'payroll' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Compensation & Payslip Records</h3>
              <p className="text-xs text-slate-400">Monthly CTC breakdown and generated tax slips</p>
            </div>
            <button
              onClick={() => setShowPayslipModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
            >
              <FileText className="w-4 h-4" />
              <span>Generate October Payslip</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Salary Calculation breakdown */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Monthly Earnings Breakdown</h4>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Basic Salary</span>
                <span className="font-semibold text-white">₹40,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">House Rent Allowance (HRA)</span>
                <span className="font-semibold text-white">₹10,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Performance Bonus</span>
                <span className="font-semibold text-emerald-400">+₹5,000</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Overtime Allowance</span>
                <span className="font-semibold text-emerald-400">+₹3,000</span>
              </div>
              <div className="flex justify-between py-2 font-bold text-indigo-300 bg-indigo-950/30 px-2 rounded-lg">
                <span>Gross Salary</span>
                <span>₹58,000</span>
              </div>
            </div>

            {/* Deductions breakdown */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Monthly Deductions</h4>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Provident Fund (PF - 6%)</span>
                <span className="font-semibold text-rose-400">-₹2,400</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Tax Deducted at Source (TDS)</span>
                <span className="font-semibold text-rose-400">-₹1,500</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Other Deductions (Professional Tax)</span>
                <span className="font-semibold text-rose-400">-₹500</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800 text-rose-400">
                <span>Total Deductions</span>
                <span className="font-semibold">-₹4,400</span>
              </div>
              <div className="flex justify-between py-2 font-extrabold text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 rounded-lg">
                <span>Net In-Hand Salary</span>
                <span>₹53,600</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. SECURITY & ACCESS TAB */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Security Events & Audit History for Rahul Bajediyal</h3>
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs">
              <div className="flex items-center justify-between font-bold text-amber-300">
                <span>⚠ 3 Failed Login Attempts</span>
                <span>Today, 11:42 AM</span>
              </div>
              <p className="text-slate-300 mt-1">
                Password mismatch detected from IP 192.168.1.189 (Firefox on Windows). Automatic lock triggered for 15 minutes.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <div className="flex items-center justify-between font-bold text-emerald-400">
                <span>✓ Successful Biometric Check-In</span>
                <span>Today, 09:12 AM</span>
              </div>
              <p className="text-slate-400 mt-1">Logged into Bengaluru HQ network from authorized IP 192.168.1.104.</p>
            </div>
          </div>
        </div>
      )}

      {/* Payslip PDF Modal */}
      {showPayslipModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-8 shadow-2xl animate-in zoom-in-95 duration-150 text-slate-100">
            {/* Payslip header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-700">
              <div>
                <h2 className="text-xl font-black text-white">PAVION TECHNOLOGIES PVT LTD</h2>
                <p className="text-xs text-slate-400">Level 5, Embassy TechVillage, Outer Ring Road, Bengaluru 560103</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">GSTIN: 29ABCDE1234F1Z5 • CIN: U72200KA2022PTC158912</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  OCTOBER 2026 PAYSLIP
                </span>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Slip #: PAY-2026-10-001</p>
              </div>
            </div>

            {/* Employee Meta details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-800 text-xs">
              <div>
                <p className="text-slate-400">Employee Name: <strong className="text-white">Rahul Bajediyal</strong></p>
                <p className="text-slate-400">Employee ID: <strong className="text-white font-mono">EMP001</strong></p>
                <p className="text-slate-400">Department: <strong className="text-white">Information Technology</strong></p>
                <p className="text-slate-400">Designation: <strong className="text-white">Senior Software Engineer</strong></p>
              </div>
              <div>
                <p className="text-slate-400">Bank Account: <strong className="text-white font-mono">•••• •••• •••• 4912</strong></p>
                <p className="text-slate-400">PF UAN: <strong className="text-white font-mono">100928374619</strong></p>
                <p className="text-slate-400">Working Days: <strong className="text-white">22 Days (21 Present, 1 Leave)</strong></p>
                <p className="text-slate-400">Disbursement Date: <strong className="text-white">31 October 2026</strong></p>
              </div>
            </div>

            {/* Earnings vs Deductions Table */}
            <div className="grid grid-cols-2 gap-6 py-4 border-b border-slate-800 text-xs">
              <div>
                <h5 className="font-bold text-indigo-400 uppercase text-[10px] mb-2">Earnings</h5>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span>Basic Salary</span><span>₹40,000</span></div>
                  <div className="flex justify-between"><span>House Rent Allowance (HRA)</span><span>₹10,000</span></div>
                  <div className="flex justify-between"><span>Performance Bonus</span><span>₹5,000</span></div>
                  <div className="flex justify-between"><span>Overtime Pay (30 hrs)</span><span>₹3,000</span></div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                    <span>Gross Earnings</span>
                    <span>₹58,000</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-rose-400 uppercase text-[10px] mb-2">Deductions</h5>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span>Provident Fund (PF)</span><span>₹2,400</span></div>
                  <div className="flex justify-between"><span>TDS / Income Tax</span><span>₹1,500</span></div>
                  <div className="flex justify-between"><span>Professional Tax</span><span>₹500</span></div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                    <span>Total Deductions</span>
                    <span>₹4,400</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Salary Highlight */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mt-4">
              <div>
                <span className="text-xs text-slate-300 font-semibold">Net Salary Payable</span>
                <p className="text-[10px] text-slate-400">Fifty-Three Thousand Six Hundred Rupees Only</p>
              </div>
              <div className="text-2xl font-black text-emerald-400">₹53,600</div>
            </div>

            {/* Modal actions */}
            <div className="flex justify-end gap-3 pt-6">
              <button
                onClick={() => setShowPayslipModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  showToast('Downloaded Official Payslip PDF: PAY-2026-10-001.pdf', 'success');
                  setShowPayslipModal(false);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
