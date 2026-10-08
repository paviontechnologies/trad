'use client';

import React from 'react';
import {
  TrendingUp,
  Award,
  Users,
  Clock,
  Zap,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';

export default function ProductivityPage() {
  const weeklyTrend = [
    { day: 'Mon', score: 88, activeHours: 7.2 },
    { day: 'Tue', score: 91, activeHours: 7.5 },
    { day: 'Wed', score: 86, activeHours: 7.1 },
    { day: 'Thu', score: 92, activeHours: 7.6 },
    { day: 'Fri', score: 85, activeHours: 6.9 },
  ];

  const departmentScores = [
    { department: 'IT', score: 94, benchmark: 85 },
    { department: 'Trading & Risk', score: 92, benchmark: 85 },
    { department: 'Finance', score: 89, benchmark: 85 },
    { department: 'HR', score: 86, benchmark: 85 },
    { department: 'Operations', score: 84, benchmark: 80 },
    { department: 'Sales', score: 81, benchmark: 80 },
  ];

  const employeeLeaderboard = [
    { rank: 1, name: 'Rahul Bajediyal', empId: 'EMP001', dept: 'IT', active: '6h 41m', idle: '41m', score: 94, change: '+4%' },
    { rank: 2, name: 'Aarav Deshmukh', empId: 'EMP006', dept: 'IT', active: '6h 30m', idle: '50m', score: 91, change: '+2%' },
    { rank: 3, name: 'Rohan Gupta', empId: 'EMP005', dept: 'Trading', active: '6h 25m', idle: '55m', score: 89, change: '+5%' },
    { rank: 4, name: 'Priya Sharma', empId: 'EMP003', dept: 'HR', active: '6h 15m', idle: '1h 00m', score: 88, change: '0%' },
    { rank: 5, name: 'Sunita Menon', empId: 'EMP004', dept: 'Finance', active: '6h 10m', idle: '1h 05m', score: 86, change: '+1%' },
    { rank: 6, name: 'Aditya Kulkarni', empId: 'EMP012', dept: 'Trading', active: '6h 05m', idle: '1h 10m', score: 84, change: '-2%' },
    { rank: 7, name: 'Ananya Iyer', empId: 'EMP007', dept: 'IT', active: '6h 00m', idle: '1h 15m', score: 83, change: '+3%' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Workforce Productivity Intelligence
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Org Average: 89.4%
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Department efficiency metrics, individual leaderboard rankings, and weekly focus trajectory.
          </p>
        </div>
      </div>

      {/* KPI Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Productive Hours</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">546 hrs</div>
          <span className="text-[10px] text-slate-400">80.1% of logged hours</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Idle / Paused Hours</span>
          <div className="text-2xl font-black text-amber-400 mt-1">58 hrs</div>
          <span className="text-[10px] text-slate-400">Avg 27m / employee</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Active Working</span>
          <div className="text-2xl font-black text-indigo-400 mt-1">682 hrs</div>
          <span className="text-[10px] text-slate-400">112 employees present</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Organization Score</span>
          <div className="text-2xl font-black text-white mt-1">89.4%</div>
          <span className="text-[10px] text-emerald-400">↑ 3.2% from last week</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Productivity Trend */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Weekly Productivity Trajectory
            </h3>
            <span className="text-xs text-slate-400">Oct 04 - Oct 08, 2026</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[70, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 5 }} name="Productivity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Productivity Comparison */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-400" />
              Department Efficiency Index
            </h3>
            <span className="text-xs text-indigo-400 font-semibold">Target: 85%</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentScores} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <YAxis type="category" dataKey="department" stroke="#64748b" fontSize={11} width={90} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
                <Bar dataKey="score" name="Score (%)" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Employee Leaderboard Ranking */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              Top Employee Performance Leaderboard
            </h3>
            <p className="text-xs text-slate-400">Ranked by verified active telemetry and task delivery rate</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
            Gold Tier Standards
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 font-semibold">Rank</th>
                <th className="py-2.5 font-semibold">Employee</th>
                <th className="py-2.5 font-semibold">Department</th>
                <th className="py-2.5 font-semibold">Active Hours</th>
                <th className="py-2.5 font-semibold">Idle Hours</th>
                <th className="py-2.5 font-semibold">Productivity Score</th>
                <th className="py-2.5 font-semibold text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {employeeLeaderboard.map((emp) => (
                <tr key={emp.rank} className="hover:bg-slate-800/40">
                  <td className="py-3 font-bold">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                        emp.rank === 1
                          ? 'bg-amber-400 text-black'
                          : emp.rank === 2
                          ? 'bg-slate-300 text-black'
                          : emp.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {emp.rank}
                    </span>
                  </td>
                  <td className="py-3 font-bold text-white">
                    {emp.name} <span className="text-slate-400 font-mono text-[10px]">({emp.empId})</span>
                  </td>
                  <td className="py-3 text-slate-300">{emp.dept}</td>
                  <td className="py-3 font-mono text-emerald-400 font-semibold">{emp.active}</td>
                  <td className="py-3 font-mono text-amber-400">{emp.idle}</td>
                  <td className="py-3 font-black text-indigo-300 text-sm">{emp.score}%</td>
                  <td className="py-3 text-right font-semibold text-emerald-400">{emp.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
