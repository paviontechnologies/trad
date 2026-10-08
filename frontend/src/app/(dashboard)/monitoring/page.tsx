'use client';

import React, { useState } from 'react';
import {
  rahulActivitySession,
  rahulAppUsage,
  rahulWebUsage,
} from '../../../lib/data';
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
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function MonitoringPage() {
  const [selectedEmployee, setSelectedEmployee] = useState('Rahul Bajediyal (EMP001)');

  const productivityDonut = [
    { name: 'Productive Time', value: 72, color: '#10b981' },
    { name: 'Neutral / Research', value: 18, color: '#6366f1' },
    { name: 'Non-productive Media', value: 10, color: '#ef4444' },
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
            Employee Telemetry & Activity Monitoring
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live Desktop Simulation
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Centrally monitor desktop active vs. idle windows, application runtime breakdown, website categories, and aggregate productivity indices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="Rahul Bajediyal (EMP001)">Rahul Bajediyal (EMP001) - IT</option>
            <option value="Aarav Deshmukh (EMP006)">Aarav Deshmukh (EMP006) - IT</option>
            <option value="Ananya Iyer (EMP007)">Ananya Iyer (EMP007) - IT</option>
            <option value="Rohan Gupta (EMP005)">Rohan Gupta (EMP005) - Trading</option>
          </select>
        </div>
      </div>

      {/* Enterprise Disclaimer Alert Box */}
      <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
        <div className="text-xs text-indigo-200/90 leading-relaxed">
          <strong className="text-indigo-300">Executive Demo Specification:</strong> In this MVP presentation, active and idle statistics are generated via realistic deterministic enterprise simulation. Continuous screenshot capture, keystroke metrics, and OS-level daemon tracking are provisioned for <strong>Phase 2 Deployment</strong>.
        </div>
      </div>

      {/* Top Session Monitoring Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Employee</span>
          <div className="text-lg font-black text-white mt-1 truncate">Rahul Bajediyal</div>
          <span className="text-[10px] text-slate-400 font-mono">EMP001 • Senior Dev</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Login Time</span>
          <div className="text-lg font-black text-white mt-1">09:12 AM</div>
          <span className="text-[10px] text-emerald-400">✓ On-Time Clock</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Current Session</span>
          <div className="text-lg font-black text-white mt-1 font-mono">07h 22m</div>
          <span className="text-[10px] text-slate-400">Elapsed duration</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Active Working</span>
          <div className="text-lg font-black text-emerald-400 mt-1 font-mono">06h 41m</div>
          <span className="text-[10px] text-emerald-400/90 font-semibold">89.5% Active Rate</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl col-span-2 md:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Idle / Inactive</span>
          <div className="text-lg font-black text-amber-400 mt-1 font-mono">41m</div>
          <span className="text-[10px] text-slate-400">Lunch & micro-breaks</span>
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
            <span className="text-xs text-slate-400">Total Run: 6h 50m</span>
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
              <tbody className="divide-y divide-slate-800/60">
                {rahulAppUsage.map((app) => (
                  <tr key={app.appName} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-bold text-white">{app.appName}</td>
                    <td className="py-2.5 text-slate-400">{app.category}</td>
                    <td className="py-2.5 font-mono text-indigo-300 font-semibold">{app.duration}</td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          app.status === 'Productive'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : app.status === 'Neutral'
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))}
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
            <span className="text-xs text-slate-400">Total Browsed: 3h 42m</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2 font-semibold">Domain</th>
                  <th className="pb-2 font-semibold">Category</th>
                  <th className="pb-2 font-semibold">Duration</th>
                  <th className="pb-2 font-semibold text-right">Productivity Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rahulWebUsage.map((site) => (
                  <tr key={site.domain} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-mono font-bold text-white">{site.domain}</td>
                    <td className="py-2.5 text-slate-400">{site.category}</td>
                    <td className="py-2.5 font-mono text-cyan-300 font-semibold">{site.duration}</td>
                    <td className="py-2.5 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          site.status === 'Productive'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : site.status === 'Neutral'
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {site.status}
                      </span>
                    </td>
                  </tr>
                ))}
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
                <span className="text-3xl font-black text-white">72%</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Productive</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Productive (VS Code, GitHub, Slack)
              </span>
              <span className="font-bold text-emerald-400">72%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Neutral (Chrome Search, Docs)
              </span>
              <span className="font-bold text-indigo-400">18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Non-Productive (YouTube, Facebook)
              </span>
              <span className="font-bold text-rose-400">10%</span>
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
                <Bar dataKey="code" name="Coding (VS Code)" fill="#10b981" stackId="a" />
                <Bar dataKey="browse" name="Browsing (Docs/Web)" fill="#6366f1" stackId="a" />
                <Bar dataKey="chat" name="Communication (Slack)" fill="#06b6d4" stackId="a" />
                <Bar dataKey="idle" name="Idle / Lunch" fill="#f59e0b" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
