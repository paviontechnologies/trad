'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import {
  Clock,
  Play,
  Coffee,
  CheckCircle,
  LogOut,
  Calendar,
  AlertTriangle,
  TrendingUp,
  UserCheck,
  UserX,
  Filter,
  Download,
  Sparkles,
} from 'lucide-react';

export default function AttendancePage() {
  const {
    todayAttendance,
    checkIn,
    startBreak,
    endBreak,
    checkOut,
    attendanceRecords,
    role,
    showToast,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'today' | 'history' | 'hr-view'>('today');
  const [filterMonth, setFilterMonth] = useState('October 2026');

  const lateArrivals = [
    { name: 'Priya Sharma', empId: 'EMP003', dept: 'HR', checkIn: '09:25 AM', delay: '25 mins', reason: 'Metro delay' },
    { name: 'Diya Sengupta', empId: 'EMP013', dept: 'IT', checkIn: '09:32 AM', delay: '32 mins', reason: 'Medical appointment' },
    { name: 'Ishaan Bhatt', empId: 'EMP014', dept: 'Sales', checkIn: '09:40 AM', delay: '40 mins', reason: 'Client meeting' },
  ];

  const overtimeWorkers = [
    { name: 'Rahul Bajediyal', empId: 'EMP001', dept: 'IT', overtime: '1h 30m', totalHours: '9h 30m', approved: true },
    { name: 'Amit Patel', empId: 'EMP002', dept: 'IT', overtime: '1h 45m', totalHours: '9h 45m', approved: true },
    { name: 'Rohan Gupta', empId: 'EMP005', dept: 'Trading', overtime: '2h 10m', totalHours: '10h 10m', approved: true },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Attendance & Time Tracking
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Biometric Live Sync
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time punch records, lunch & rest break telemetry, overtime calculations, and HR compliance audits.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Punch Station
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Attendance Ledger
          </button>
          <button
            onClick={() => setActiveTab('hr-view')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'hr-view'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            HR Oversight & Late Log
          </button>
        </div>
      </div>

      {/* TODAY'S PUNCH STATION */}
      {activeTab === 'today' && (
        <div className="space-y-6">
          {/* Main Interactive Punch Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Left Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live Session Active
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-xs text-slate-400">Employee: Rahul Bajediyal (EMP001)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Check In</span>
                    <div className="text-2xl font-black text-white mt-1">
                      {todayAttendance.checkIn || '--:--'}
                    </div>
                    <span className="text-[10px] text-emerald-400 mt-1 block">✓ On Time</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Working Time</span>
                    <div className="text-2xl font-black text-indigo-400 font-mono mt-1">
                      {todayAttendance.workingTime}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Target: 08h 30m</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Break Taken</span>
                    <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                      {todayAttendance.breakTime}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 block">Max Allowed: 01h 00m</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Status</span>
                    <div className="text-2xl font-black mt-1">
                      <span
                        className={`text-lg px-2.5 py-1 rounded-xl font-bold ${
                          todayAttendance.isOnBreak
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : todayAttendance.checkOut
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {todayAttendance.isOnBreak
                          ? 'On Break'
                          : todayAttendance.checkOut
                          ? 'Checked Out'
                          : 'Active'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-col gap-3 min-w-[220px]">
                {!todayAttendance.checkIn ? (
                  <button
                    onClick={checkIn}
                    className="w-full py-4 px-6 rounded-2xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>Punch In (Check In)</span>
                  </button>
                ) : !todayAttendance.checkOut ? (
                  <>
                    {!todayAttendance.isOnBreak ? (
                      <button
                        onClick={startBreak}
                        className="w-full py-3 px-5 rounded-2xl text-sm font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                      >
                        <Coffee className="w-4 h-4" />
                        <span>Start Break</span>
                      </button>
                    ) : (
                      <button
                        onClick={endBreak}
                        className="w-full py-3 px-5 rounded-2xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>End Break</span>
                      </button>
                    )}

                    <button
                      onClick={checkOut}
                      className="w-full py-3 px-5 rounded-2xl text-sm font-bold bg-rose-600/90 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Punch Out (Check Out)</span>
                    </button>
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                    <span className="text-xs font-bold text-slate-300">
                      Day Completed at {todayAttendance.checkOut}
                    </span>
                    <button
                      onClick={checkIn}
                      className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 font-semibold block mx-auto"
                    >
                      Reset / Re-Punch In
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Attendance History Table */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white">Recent Attendance Logs (Rahul Bajediyal)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2.5 font-semibold">Date</th>
                    <th className="py-2.5 font-semibold">Check In</th>
                    <th className="py-2.5 font-semibold">Check Out</th>
                    <th className="py-2.5 font-semibold">Working Hours</th>
                    <th className="py-2.5 font-semibold">Break</th>
                    <th className="py-2.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 font-bold text-white">08 Oct 2026</td>
                    <td className="py-3 font-mono text-indigo-300">{todayAttendance.checkIn || '09:12 AM'}</td>
                    <td className="py-3 font-mono text-slate-400">{todayAttendance.checkOut || 'Active'}</td>
                    <td className="py-3 font-mono text-white font-bold">{todayAttendance.workingTime}</td>
                    <td className="py-3 text-slate-400">{todayAttendance.breakTime}</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 font-bold text-white">07 Oct 2026</td>
                    <td className="py-3 font-mono text-slate-300">09:05 AM</td>
                    <td className="py-3 font-mono text-slate-300">06:30 PM</td>
                    <td className="py-3 font-mono text-white font-bold">08h 35m</td>
                    <td className="py-3 text-slate-400">00h 50m</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        Present
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-800/40">
                    <td className="py-3 font-bold text-white">06 Oct 2026</td>
                    <td className="py-3 font-mono text-slate-300">09:15 AM</td>
                    <td className="py-3 font-mono text-slate-300">06:10 PM</td>
                    <td className="py-3 font-mono text-white font-bold">08h 05m</td>
                    <td className="py-3 text-slate-400">00h 50m</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        Present
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FULL ATTENDANCE LEDGER */}
      {activeTab === 'history' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Organization Attendance Register</h3>
              <p className="text-xs text-slate-400">Recorded punches across all departments</p>
            </div>
            <button
              onClick={() => showToast('Attendance register exported as CSV', 'success')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4 font-semibold">Employee</th>
                  <th className="py-3 px-4 font-semibold">Department</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Punch In</th>
                  <th className="py-3 px-4 font-semibold">Punch Out</th>
                  <th className="py-3 px-4 font-semibold">Working Hours</th>
                  <th className="py-3 px-4 font-semibold">Break</th>
                  <th className="py-3 px-4 font-semibold">Overtime</th>
                  <th className="py-3 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {attendanceRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-bold text-white">{r.employeeName}</td>
                    <td className="py-3 px-4 text-slate-300">{r.department}</td>
                    <td className="py-3 px-4 text-slate-400">{r.date}</td>
                    <td className="py-3 px-4 font-mono text-indigo-300">{r.checkIn || '-'}</td>
                    <td className="py-3 px-4 font-mono text-slate-400">{r.checkOut || '-'}</td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {Math.floor(r.workingMinutes / 60)}h {r.workingMinutes % 60}m
                    </td>
                    <td className="py-3 px-4 text-slate-400">{r.breakMinutes}m</td>
                    <td className="py-3 px-4 font-mono text-emerald-400">{r.overtimeMinutes}m</td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === 'Present'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : r.status === 'Late'
                            ? 'bg-amber-500/20 text-amber-400'
                            : r.status === 'On Leave'
                            ? 'bg-cyan-500/20 text-cyan-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HR VIEW: LATE ARRIVALS & OVERTIME */}
      {activeTab === 'hr-view' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Late Arrivals Box */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Late Arrivals Log (Today)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                  3 Flagged
                </span>
              </div>
              <div className="space-y-3">
                {lateArrivals.map((l, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>{l.name} ({l.empId})</span>
                      <span className="text-amber-400">{l.checkIn}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Dept: {l.dept} • Reason: {l.reason}</span>
                      <span className="text-rose-400 font-medium">+{l.delay}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overtime Workers Box */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Overtime Accruals (Today)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  ₹3,000 Accrued
                </span>
              </div>
              <div className="space-y-3">
                {overtimeWorkers.map((o, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>{o.name} ({o.empId})</span>
                      <span className="text-emerald-400 font-mono">+{o.overtime}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>Dept: {o.dept} • Total: {o.totalHours}</span>
                      <span className="text-emerald-400 font-semibold">✓ Manager Approved</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
