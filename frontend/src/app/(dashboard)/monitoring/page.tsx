'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import { getWorkforceTelemetryList } from '../../../lib/workforce-telemetry';
import {
  Activity,
  Layers,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Monitor,
  Sparkles,
  Info,
  Calendar,
  Coffee,
  Laptop,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

export default function MonitoringPage() {
  const { todayAttendance, employeeAttendanceMap, user } = useAuth();
  const defaultEmpId =
    user?.employeeId === 'emp-6'
      ? 'EMP006'
      : user?.employeeId === 'emp-7'
      ? 'EMP007'
      : user?.employeeId === 'emp-13'
      ? 'EMP013'
      : 'EMP001';
  const [selectedEmpId, setSelectedEmpId] = useState(defaultEmpId);

  const telemetryList = getWorkforceTelemetryList(employeeAttendanceMap || todayAttendance);
  const currentEmp = telemetryList.find((e) => e.empId === selectedEmpId) || telemetryList[0];

  const productivityValue = currentEmp.productivity || 0;
  const neutralValue = Math.max(0, Math.round((100 - productivityValue) * 0.65));
  const nonProductiveValue = Math.max(0, 100 - productivityValue - neutralValue);

  const productivityDonut = [
    { name: 'Productive Time', value: productivityValue, color: '#10b981' },
    { name: 'Neutral / Research', value: neutralValue, color: '#6366f1' },
    { name: 'Non-productive Media', value: nonProductiveValue, color: '#ef4444' },
  ];

  const hourlyBreakdown = [
    { hour: '09:00', code: 45, browse: 10, chat: 5, idle: 0 },
    { hour: '10:00', code: 50, browse: 5, chat: 5, idle: 0 },
    { hour: '11:00', code: 40, browse: 12, chat: 8, idle: 0 },
    { hour: '12:00', code: 35, browse: 15, chat: 5, idle: 5 },
    { hour: '13:00', code: 10, browse: 5, chat: 5, idle: 40 }, // Lunch
    { hour: '14:00', code: 48, browse: 8, chat: 4, idle: 0 },
    { hour: '15:00', code: 42, browse: 12, chat: 6, idle: 0 },
    { hour: '16:00', code: 38, browse: 10, chat: 10, idle: 2 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header with Phase 2 surveillance badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Workforce Telemetry & Desktop Activity Monitoring
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Multi-Staff Live Stream
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Centrally monitor desktop active vs. idle windows, application runtime breakdown, website categories, and aggregate productivity indices for all 15 staff members.
          </p>
        </div>

        {/* Global Employee Switcher */}
        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-400 font-medium whitespace-nowrap">
            Inspect Employee:
          </label>
          <select
            value={selectedEmpId}
            onChange={(e) => setSelectedEmpId(e.target.value)}
            className="px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-indigo-500 shadow-md"
          >
            {telemetryList.map((emp) => (
              <option key={emp.empId} value={emp.empId}>
                {emp.fullName} ({emp.empId}) — {emp.departmentName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live Break Status Banner if Selected Employee is on break */}
      {currentEmp.status === 'ON_BREAK' && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 shadow-xl flex items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Coffee className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Workstation Telemetry Paused • Employee on Break
              </span>
              <p className="text-sm font-bold text-white">
                {currentEmp.fullName} is currently away on <span className="text-amber-300 font-extrabold">{currentEmp.breakText}</span>
              </p>
              <p className="text-[11px] text-slate-300">
                Continuous screenshot capture and input telemetry are paused per enterprise privacy compliance guidelines.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold whitespace-nowrap">
            Biometric Standby
          </span>
        </div>
      )}

      {/* Enterprise Disclaimer Alert Box */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
        <div className="text-xs text-indigo-200/90 leading-relaxed">
          <strong className="text-indigo-300">Executive Governance Mode:</strong> Inspecting live active window, application breakdown, and website metrics for{' '}
          <strong className="text-white">{currentEmp.fullName} ({currentEmp.empId})</strong> in {currentEmp.departmentName}.
        </div>
      </div>

      {/* Top Session Monitoring Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Employee</span>
          <div className="text-base font-black text-white mt-1 truncate">{currentEmp.fullName}</div>
          <span className="text-[10px] text-slate-400 font-mono">{currentEmp.empId} • {currentEmp.designation}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Login / Punch In</span>
          <div className="text-base font-black text-indigo-300 mt-1 font-mono">{currentEmp.punchIn}</div>
          <span className="text-[10px] text-emerald-400">
            {currentEmp.punchIn !== '--:--' ? '✓ Biometric Verified' : 'No Punch Today'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Current Session</span>
          <div className="text-base font-black text-white mt-1 font-mono">{currentEmp.workingHours}</div>
          <span className="text-[10px] text-slate-400">{currentEmp.activeMinutes}m active work</span>
        </div>

        <div
          className={`p-4 rounded-2xl border shadow-xl ${
            currentEmp.status === 'ON_BREAK'
              ? 'bg-amber-950/30 border-amber-500/40 shadow-amber-500/10'
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <span className="text-[10px] uppercase font-bold text-slate-400">Live Status</span>
          <div
            className={`text-base font-black mt-1 font-mono ${
              currentEmp.status === 'ON_BREAK' ? 'text-amber-400' : 'text-emerald-400'
            }`}
          >
            {currentEmp.status === 'ON_BREAK'
              ? '☕ On Break'
              : currentEmp.status === 'ACTIVE'
              ? '● Active at Desk'
              : currentEmp.status === 'ON_LEAVE'
              ? '🌴 On Leave'
              : '○ Offline'}
          </div>
          <span className="text-[10px] font-semibold text-emerald-400/90">
            {currentEmp.productivity}% Productivity Index
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl col-span-2 md:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Break Status</span>
          <div className="text-sm font-bold text-amber-400 mt-1 truncate">
            {currentEmp.breakText}
          </div>
          <span className="text-[10px] text-slate-400">
            {currentEmp.breakDurationMinutes} mins recorded
          </span>
        </div>
      </div>

      {/* Row 2: Applications & Websites Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Usage Table */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Software & Application Telemetry
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Process: {currentEmp.activeApp}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Application</th>
                  <th className="pb-2 font-semibold">Category</th>
                  <th className="pb-2 font-semibold">Duration</th>
                  <th className="pb-2 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {currentEmp.apps.length > 0 ? (
                  currentEmp.apps.map((app) => (
                    <tr key={app.name} className="hover:bg-slate-800/40">
                      <td className="py-2.5 font-bold font-sans text-white">{app.name}</td>
                      <td className="py-2.5 text-slate-400 font-sans">{app.category}</td>
                      <td className="py-2.5 text-indigo-300 font-semibold">{app.duration}</td>
                      <td className="py-2.5 text-right font-sans">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            app.isProductive
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {app.isProductive ? 'Productive' : 'Non-Productive'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-slate-500 font-sans">
                      No active workstation processes running (Employee is offline / on leave)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Website Usage Table */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Web Browsing Domain Telemetry
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Window: {currentEmp.activeWindow}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Domain</th>
                  <th className="pb-2 font-semibold">Category</th>
                  <th className="pb-2 font-semibold">Duration</th>
                  <th className="pb-2 font-semibold text-right">Hits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {currentEmp.websites.length > 0 ? (
                  currentEmp.websites.map((site) => (
                    <tr key={site.domain} className="hover:bg-slate-800/40">
                      <td className="py-2.5 font-bold text-white">{site.domain}</td>
                      <td className="py-2.5 text-slate-400 font-sans">{site.category}</td>
                      <td className="py-2.5 text-cyan-300 font-semibold">{site.duration}</td>
                      <td className="py-2.5 text-right text-slate-300 font-sans">
                        {site.visits} visits
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-slate-500 font-sans">
                      No web telemetry recorded
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 3: Productivity Scoring & Hourly Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productivity Ratio Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Productivity Aggregate Ratio</h3>
            <p className="text-xs text-slate-400 mb-4">Calculated based on active window telemetry</p>

            <div className="h-44 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={productivityDonut} cx="50%" cy="50%" innerRadius={55} outerRadius={75} dataKey="value">
                    {productivityDonut.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-white">{productivityValue}%</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Productive</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Productive Time
              </span>
              <span className="font-bold text-emerald-400">{productivityValue}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Neutral / Documentation
              </span>
              <span className="font-bold text-indigo-400">{neutralValue}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Non-Productive / Idle
              </span>
              <span className="font-bold text-rose-400">{nonProductiveValue}%</span>
            </div>
          </div>
        </div>

        {/* Hourly Activity Stacked Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white">Hourly Telemetry Distribution (Minutes / Hour)</h3>
              <p className="text-xs text-slate-400">Breakdown of coding vs browsing vs messaging across the shift</p>
            </div>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-xl border border-indigo-500/20">
              Peak Focus: 10:00 - 11:30 AM
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyBreakdown} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 60]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="code" name="Active Focus" fill="#10b981" stackId="a" />
                <Bar dataKey="browse" name="Browsing" fill="#6366f1" stackId="a" />
                <Bar dataKey="chat" name="Communication" fill="#06b6d4" stackId="a" />
                <Bar dataKey="idle" name="Break / Idle" fill="#f59e0b" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
