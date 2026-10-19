'use client';

import React, { useState, useEffect } from 'react';
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
  Utensils,
  ChevronDown,
  ChevronUp,
  Timer,
  History,
  FileText,
  Check,
  Activity,
  ArrowRight,
  ShieldCheck,
  Info,
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
  const [selectedBreakType, setSelectedBreakType] = useState('Lunch Break');
  const [viewMode, setViewMode] = useState<'breaks' | 'events'>('breaks');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);
  const [historySearch, setHistorySearch] = useState('');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Real-time ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const lateArrivals = [
    { name: 'Priya Sharma', empId: 'EMP003', dept: 'HR', date: '19 Oct 2026', checkIn: '09:25 AM', delay: '25 mins', reason: 'Metro delay' },
    { name: 'Diya Sengupta', empId: 'EMP013', dept: 'IT', date: '19 Oct 2026', checkIn: '09:32 AM', delay: '32 mins', reason: 'Medical appointment' },
    { name: 'Ishaan Bhatt', empId: 'EMP014', dept: 'Sales', date: '19 Oct 2026', checkIn: '09:40 AM', delay: '40 mins', reason: 'Client meeting' },
  ];

  const overtimeWorkers = [
    { name: 'Rahul Bajediyal', empId: 'EMP001', dept: 'IT', overtime: '1h 30m', totalHours: '9h 30m', approved: true },
    { name: 'Amit Patel', empId: 'EMP002', dept: 'IT', overtime: '1h 45m', totalHours: '9h 45m', approved: true },
    { name: 'Rohan Gupta', empId: 'EMP005', dept: 'Trading', overtime: '2h 10m', totalHours: '10h 10m', approved: true },
  ];

  // CSV Data Sheet Exporter
  const exportDataSheetCSV = () => {
    const headers = [
      'Employee ID',
      'Employee Name',
      'Department',
      'Date',
      'Punch In',
      'Punch Out',
      'Breaks Log (Start - End)',
      'Total Break (Mins)',
      'Working Hours',
      'Overtime (Mins)',
      'Status',
    ];
    const rows = attendanceRecords.map((r) => [
      r.empId || '',
      `"${r.employeeName || ''}"`,
      `"${r.department || ''}"`,
      r.date,
      r.checkIn || '-',
      r.checkOut || 'Active',
      `"${r.breaksList && r.breaksList.length > 0 ? r.breaksList.map((b) => `${b.type}: ${b.startTime} - ${b.endTime || 'Running'} (${b.durationFormatted})`).join(' | ') : '-'}"`,
      r.breakMinutes,
      `${Math.floor(r.workingMinutes / 60)}h ${r.workingMinutes % 60}m`,
      r.overtimeMinutes,
      r.status,
    ]);
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Pavion_Attendance_DataSheet_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Attendance Data Sheet downloaded successfully as CSV!', 'success');
  };

  const filteredRecords = attendanceRecords.filter((rec) => {
    if (!historySearch) return true;
    const q = historySearch.toLowerCase();
    return (
      rec.employeeName?.toLowerCase().includes(q) ||
      rec.department?.toLowerCase().includes(q) ||
      rec.date.toLowerCase().includes(q)
    );
  });

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
            Real-time biometric punch records, lunch & rest break telemetry, live data sheet, and HR compliance audits.
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
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Attendance Data Sheet</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {attendanceRecords.length}
            </span>
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
          {/* REAL-TIME CLOCK & BIOMETRIC RADAR BANNER */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Clock className="w-6 h-6 animate-pulse text-indigo-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Live Real-Time Biometric Clock
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                    Live System Active
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-2">
                  <span>
                    {currentTime.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                    })}
                  </span>
                  <span className="text-xs text-indigo-300 font-sans font-semibold">IST</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Current Date</span>
                <span className="text-white font-mono font-bold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  {currentTime.toLocaleDateString('en-GB', {
                    weekday: 'short',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="text-slate-400 text-[10px] block uppercase font-semibold">Shift Timing</span>
                <span className="text-emerald-400 font-mono font-bold">General (09:00 - 18:30)</span>
              </div>

              <button
                onClick={exportDataSheetCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all ml-auto md:ml-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data Sheet</span>
              </button>
            </div>
          </div>
          {/* Main Interactive Punch Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Left Details */}
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Live Session Active
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-300 font-medium">
                    Employee: <strong className="text-white">Rahul Bajediyal</strong> (EMP001)
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-indigo-400 font-mono flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {todayAttendance.date}
                  </span>
                </div>

                {/* 4 Metrics KPI Grid with Exact Timestamps and Dates */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
                  {/* Punch In */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Punch In</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-white font-mono mt-1">
                      {todayAttendance.checkIn || '--:--'}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                      <span>✓ {todayAttendance.checkInDate || todayAttendance.date}</span>
                    </div>
                  </div>

                  {/* Punch Out */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Punch Out</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${todayAttendance.checkOut ? 'bg-indigo-400' : 'bg-slate-500'}`} />
                    </div>
                    <div className="text-2xl font-black text-white font-mono mt-1">
                      {todayAttendance.checkOut || (todayAttendance.isCheckedIn ? 'Active' : '--:--')}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 truncate">
                      {todayAttendance.checkOut
                        ? `✓ ${todayAttendance.checkOutDate || todayAttendance.date}`
                        : todayAttendance.isCheckedIn
                        ? 'Shift In Progress'
                        : 'Not Checked In'}
                    </div>
                  </div>

                  {/* Working Time */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Working Time</span>
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    </div>
                    <div className="text-2xl font-black text-indigo-300 font-mono mt-1">
                      {todayAttendance.workingTime}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Target: 08h 30m
                    </div>
                  </div>

                  {/* Break Taken */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Break Taken</span>
                      <Coffee className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="text-2xl font-black text-amber-300 font-mono mt-1">
                      {todayAttendance.breakTime}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {todayAttendance.breaks.length} break{todayAttendance.breaks.length !== 1 ? 's' : ''} taken
                    </div>
                  </div>
                </div>

                {/* If Currently On Break: Prominent Active Banner */}
                {todayAttendance.isOnBreak && (
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                        <Coffee className="w-5 h-5 animate-bounce" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                            Currently on Break ({todayAttendance.currentBreakType})
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Break started at <strong className="text-white font-mono">{todayAttendance.currentBreakStartTime}</strong> on{' '}
                          <span className="text-amber-300 font-medium">{todayAttendance.date}</span>. Biometric pause active.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={endBreak}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-1.5 whitespace-nowrap transition-all"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>End Break & Resume Work</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Action Buttons */}
              <div className="flex flex-col gap-3 min-w-[240px] border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
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
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-semibold text-slate-400">Select Break Type:</label>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                          {['Lunch Break', 'Tea Break', 'Short Break'].map((bType) => (
                            <button
                              key={bType}
                              onClick={() => setSelectedBreakType(bType)}
                              className={`py-1.5 px-2 rounded-lg text-[10px] font-bold transition-all ${
                                selectedBreakType === bType
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {bType.split(' ')[0]}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => startBreak(selectedBreakType)}
                          className="w-full py-3 px-5 rounded-2xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/25 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                        >
                          <Coffee className="w-4 h-4" />
                          <span>Start {selectedBreakType}</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={endBreak}
                        className="w-full py-3.5 px-5 rounded-2xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transform active:scale-95 transition-all"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>End Break (Back to Work)</span>
                      </button>
                    )}

                    <button
                      onClick={checkOut}
                      className="w-full py-3 px-5 rounded-2xl text-xs font-bold bg-rose-600/90 hover:bg-rose-500 text-white shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transform active:scale-95 transition-all mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Punch Out (Check Out)</span>
                    </button>
                  </>
                ) : (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">
                        Shift Completed
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {todayAttendance.checkOutDate || todayAttendance.date} at {todayAttendance.checkOut}
                      </span>
                    </div>
                    <button
                      onClick={checkIn}
                      className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 font-semibold block mx-auto underline decoration-dotted"
                    >
                      Re-Punch / Open New Shift
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* DEDICATED TODAY'S BREAK & BIOMETRIC AUDIT LEDGER */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  Today's Break Ledger & Punch Audit Trail
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete breakdown of when breaks started, ended, their duration, and shift punch timestamps.
                </p>
              </div>

              {/* View Switcher: Break Table vs Biometric Event Timeline */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setViewMode('breaks')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    viewMode === 'breaks'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Break Timestamps ({todayAttendance.breaks.length})
                </button>
                <button
                  onClick={() => setViewMode('events')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    viewMode === 'events'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Biometric Events ({todayAttendance.events?.length || 0})
                </button>
              </div>
            </div>

            {/* TAB 1: BREAK TIMESTAMPS TABLE */}
            {viewMode === 'breaks' && (
              <div className="space-y-3">
                {todayAttendance.breaks && todayAttendance.breaks.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                          <th className="py-3 px-4 font-semibold">Break Type</th>
                          <th className="py-3 px-4 font-semibold">Date</th>
                          <th className="py-3 px-4 font-semibold">Break Start Time</th>
                          <th className="py-3 px-4 font-semibold">Break End Time</th>
                          <th className="py-3 px-4 font-semibold">Duration</th>
                          <th className="py-3 px-4 font-semibold text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {todayAttendance.breaks.map((b, idx) => (
                          <tr key={b.id || idx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-4 font-sans font-bold text-white flex items-center gap-2">
                              {b.type.toLowerCase().includes('lunch') ? (
                                <span className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                                  <Utensils className="w-3.5 h-3.5" />
                                </span>
                              ) : (
                                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                                  <Coffee className="w-3.5 h-3.5" />
                                </span>
                              )}
                              <span>{b.type}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-300">{b.startDate || todayAttendance.date}</td>
                            <td className="py-3 px-4 text-amber-300 font-bold">{b.startTime}</td>
                            <td className="py-3 px-4">
                              {b.endTime ? (
                                <span className="text-emerald-300 font-bold">{b.endTime}</span>
                              ) : (
                                <span className="text-amber-400 animate-pulse font-sans font-bold flex items-center gap-1">
                                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                                  Active / Running
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 font-sans text-slate-300">
                              {b.durationFormatted || `${b.durationMinutes} mins`}
                            </td>
                            <td className="py-3 px-4 font-sans text-right">
                              {b.endTime ? (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  Completed
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                                  In-Progress
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-slate-950/60 border border-slate-800 text-center space-y-2">
                    <Coffee className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs font-semibold text-slate-400">No breaks taken yet today.</p>
                    <p className="text-[11px] text-slate-500">
                      When you start a lunch or tea break, exact start and end timestamps with dates will be recorded here.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: CHRONOLOGICAL BIOMETRIC EVENTS TIMELINE */}
            {viewMode === 'events' && (
              <div className="space-y-3">
                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {todayAttendance.events?.map((ev, idx) => {
                    const isPunchIn = ev.type === 'PUNCH_IN';
                    const isPunchOut = ev.type === 'PUNCH_OUT';
                    const isBreakStart = ev.type === 'BREAK_START';
                    const isBreakEnd = ev.type === 'BREAK_END';

                    let dotColor = 'bg-slate-500';
                    let badgeBg = 'bg-slate-800 text-slate-300';
                    if (isPunchIn) {
                      dotColor = 'bg-emerald-400';
                      badgeBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
                    } else if (isPunchOut) {
                      dotColor = 'bg-rose-400';
                      badgeBg = 'bg-rose-500/20 text-rose-300 border border-rose-500/30';
                    } else if (isBreakStart) {
                      dotColor = 'bg-amber-400';
                      badgeBg = 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
                    } else if (isBreakEnd) {
                      dotColor = 'bg-indigo-400';
                      badgeBg = 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30';
                    }

                    return (
                      <div key={ev.id || idx} className="relative flex items-start gap-4">
                        <span
                          className={`absolute -left-6 top-1.5 w-3 h-3 rounded-full border-2 border-slate-900 ${dotColor}`}
                        />
                        <div className="flex-1 p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${badgeBg}`}>
                                {ev.type.replace('_', ' ')}
                              </span>
                              <span className="text-xs font-bold text-white">{ev.label}</span>
                            </div>
                            {ev.note && <p className="text-[11px] text-slate-400">{ev.note}</p>}
                          </div>
                          <div className="flex items-center gap-3 text-xs font-mono">
                            <span className="text-slate-400 flex items-center gap-1 font-sans">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              {ev.date}
                            </span>
                            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-white font-bold">
                              {ev.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* TODAY'S LIVE ATTENDANCE DATA SHEET */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  Live Attendance Data Sheet (Rahul Bajediyal - EMP001)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time entry in the organizational data sheet with live punch in, punch out, and every break timestamp
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('history')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/30"
                >
                  <span>Open Full Organization Data Sheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={exportDataSheetCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40 font-semibold">
                    <th className="py-3 px-3">Emp ID</th>
                    <th className="py-3 px-3">Employee Name</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Punch In</th>
                    <th className="py-3 px-3">Punch Out</th>
                    <th className="py-3 px-3">All Breaks (Start - End)</th>
                    <th className="py-3 px-3">Total Break</th>
                    <th className="py-3 px-3">Working Time</th>
                    <th className="py-3 px-3 text-right">Data Sheet Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  <tr className="hover:bg-slate-800/40 bg-indigo-950/20">
                    <td className="py-3.5 px-3 font-bold text-indigo-300">EMP001</td>
                    <td className="py-3.5 px-3 font-sans font-bold text-white">Rahul Bajediyal</td>
                    <td className="py-3.5 px-3 text-slate-300">{todayAttendance.date}</td>
                    <td className="py-3.5 px-3 text-emerald-300 font-bold">
                      {todayAttendance.checkIn ? `${todayAttendance.checkIn}` : '--:--'}
                    </td>
                    <td className="py-3.5 px-3 text-slate-300">
                      {todayAttendance.checkOut ? `${todayAttendance.checkOut}` : 'Active / In-Progress'}
                    </td>
                    <td className="py-3.5 px-3 font-sans">
                      {todayAttendance.breaks && todayAttendance.breaks.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {todayAttendance.breaks.map((b, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-amber-300"
                            >
                              {b.type.split(' ')[0]}: {b.startTime} - {b.endTime || 'Running'} ({b.durationFormatted})
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500 text-[11px]">No breaks taken yet</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-amber-300">{todayAttendance.breakTime}</td>
                    <td className="py-3.5 px-3 text-white font-bold">{todayAttendance.workingTime}</td>
                    <td className="py-3.5 px-3 font-sans text-right">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          todayAttendance.isOnBreak
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
                            : todayAttendance.checkOut
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {todayAttendance.isOnBreak ? 'On Break' : todayAttendance.checkOut ? 'Shift Done' : 'Live Present'}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* QUICK RECENT ATTENDANCE LOGS WITH DETAILED BREAKS */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">Recent Attendance Logs (Rahul Bajediyal)</h3>
                <p className="text-xs text-slate-400">Previous shift logs with punch in, punch out, and break breakdown</p>
              </div>
              <span className="text-xs text-indigo-400 font-semibold">Last 3 Days</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                    <th className="py-2.5 px-3 font-semibold">Date</th>
                    <th className="py-2.5 px-3 font-semibold">Check In (Date & Time)</th>
                    <th className="py-2.5 px-3 font-semibold">Check Out (Date & Time)</th>
                    <th className="py-2.5 px-3 font-semibold">Break Breakdown (Start - End)</th>
                    <th className="py-2.5 px-3 font-semibold">Working Hours</th>
                    <th className="py-2.5 px-3 font-semibold">Total Break</th>
                    <th className="py-2.5 px-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {/* Today */}
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-sans font-bold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {todayAttendance.date} (Today)
                    </td>
                    <td className="py-3 px-3 text-indigo-300 font-bold">
                      {todayAttendance.checkIn ? `${todayAttendance.checkInDate || todayAttendance.date} • ${todayAttendance.checkIn}` : '--:--'}
                    </td>
                    <td className="py-3 px-3 text-slate-300">
                      {todayAttendance.checkOut
                        ? `${todayAttendance.checkOutDate || todayAttendance.date} • ${todayAttendance.checkOut}`
                        : 'Active / In-Shift'}
                    </td>
                    <td className="py-3 px-3 font-sans">
                      <div className="flex flex-wrap gap-1.5">
                        {todayAttendance.breaks.map((b, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono"
                          >
                            {b.type.split(' ')[0]}: {b.startTime} - {b.endTime || 'Running'} ({b.durationFormatted})
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-white font-bold">{todayAttendance.workingTime}</td>
                    <td className="py-3 px-3 text-amber-300">{todayAttendance.breakTime}</td>
                    <td className="py-3 px-3 font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        Present
                      </span>
                    </td>
                  </tr>

                  {/* 18 Oct */}
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-sans font-bold text-white">18 Oct 2026</td>
                    <td className="py-3 px-3 text-slate-300">18 Oct 2026 • 09:05 AM</td>
                    <td className="py-3 px-3 text-slate-300">18 Oct 2026 • 06:30 PM</td>
                    <td className="py-3 px-3 font-sans">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                          Lunch: 01:00 PM - 01:45 PM (45m)
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                          Tea: 04:30 PM - 04:45 PM (15m)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-white font-bold">08h 25m</td>
                    <td className="py-3 px-3 text-slate-400">01h 00m</td>
                    <td className="py-3 px-3 font-sans">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        Present
                      </span>
                    </td>
                  </tr>

                  {/* 17 Oct */}
                  <tr className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-3 font-sans font-bold text-white">17 Oct 2026</td>
                    <td className="py-3 px-3 text-slate-300">17 Oct 2026 • 09:15 AM</td>
                    <td className="py-3 px-3 text-slate-300">17 Oct 2026 • 06:10 PM</td>
                    <td className="py-3 px-3 font-sans">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                          Lunch: 01:15 PM - 01:55 PM (40m)
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-mono">
                          Tea: 04:45 PM - 04:55 PM (10m)
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-white font-bold">08h 05m</td>
                    <td className="py-3 px-3 text-slate-400">00h 50m</td>
                    <td className="py-3 px-3 font-sans">
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

      {/* FULL ATTENDANCE DATA SHEET */}
      {activeTab === 'history' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                Organization Attendance Data Sheet (Master Register)
              </h3>
              <p className="text-xs text-slate-400">
                Live biometric punch in/out timestamps and individual break logs across all departments
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search employee / dept / date..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={exportDataSheetCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 whitespace-nowrap transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV Data Sheet</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Employee</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Department</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Date</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Punch In</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Punch Out</th>
                  <th className="py-3.5 px-4 font-semibold min-w-[380px]">
                    <div className="flex items-center gap-1.5">
                      <Coffee className="w-4 h-4 text-amber-400" />
                      <span className="text-white font-bold">Breaks Log (Start → End • Duration)</span>
                    </div>
                  </th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Working Hours</th>
                  <th className="py-3.5 px-4 font-semibold whitespace-nowrap">Overtime</th>
                  <th className="py-3.5 px-4 font-semibold text-right whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredRecords.map((r) => {
                  const isExpanded = expandedRecordId === r.id;
                  return (
                    <React.Fragment key={r.id}>
                      <tr
                        onClick={() => setExpandedRecordId(isExpanded ? null : r.id)}
                        className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                          isExpanded ? 'bg-slate-800/30' : ''
                        }`}
                      >
                        {/* 1. Employee Name & ID */}
                        <td className="py-4 px-4 font-sans align-top">
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-xs leading-snug">{r.employeeName}</span>
                            <span className="text-[10px] text-indigo-400 font-mono font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20 w-fit mt-1">
                              {r.empId}
                            </span>
                          </div>
                        </td>

                        {/* 2. Department */}
                        <td className="py-4 px-4 font-sans text-slate-300 text-xs align-top">
                          <span className="font-medium text-slate-300">{r.department}</span>
                        </td>

                        {/* 3. Date */}
                        <td className="py-4 px-4 text-slate-300 text-xs font-mono align-top whitespace-nowrap">
                          {r.date}
                        </td>

                        {/* 4. Punch In */}
                        <td className="py-4 px-4 align-top">
                          {r.checkIn ? (
                            <span className="font-mono font-bold text-xs text-indigo-300 bg-indigo-500/15 px-2 py-1 rounded-lg border border-indigo-500/30 whitespace-nowrap inline-block">
                              {r.checkIn}
                            </span>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>

                        {/* 5. Punch Out */}
                        <td className="py-4 px-4 align-top">
                          {r.checkOut ? (
                            <span className="font-mono font-bold text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 whitespace-nowrap inline-block">
                              {r.checkOut}
                            </span>
                          ) : (
                            <span className="font-mono text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/25 font-bold flex items-center gap-1.5 w-fit whitespace-nowrap">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Active On Duty
                            </span>
                          )}
                        </td>

                        {/* 6. High-Contrast, Structured Breaks Log Column */}
                        <td className="py-4 px-4 font-sans align-top min-w-[380px]">
                          {r.breaksList && r.breaksList.length > 0 ? (
                            <div className="space-y-1.5">
                              {/* Summary Line */}
                              <div className="flex items-center justify-between text-[11px] pb-1 border-b border-slate-800">
                                <span className="font-bold text-slate-300 flex items-center gap-1.5">
                                  <Coffee className="w-3.5 h-3.5 text-amber-400" />
                                  <span>{r.breaksList.length} {r.breaksList.length === 1 ? 'Break' : 'Breaks'} Taken</span>
                                </span>
                                <span className="font-mono font-bold text-amber-300 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-[10px]">
                                  Total: {r.breakMinutes} mins
                                </span>
                              </div>

                              {/* Individual Structured Break Cards */}
                              <div className="space-y-1.5">
                                {r.breaksList.map((bk, bIdx) => {
                                  const isLunch = bk.type.toLowerCase().includes('lunch');
                                  const isCoffee =
                                    bk.type.toLowerCase().includes('tea') ||
                                    bk.type.toLowerCase().includes('coffee');

                                  return (
                                    <div
                                      key={bIdx}
                                      className="p-2 rounded-xl bg-slate-950/90 border border-slate-700/90 hover:border-indigo-500/40 flex items-center justify-between gap-3 text-xs shadow-md transition-all"
                                    >
                                      {/* Left: Break Type with Icon & Color Badge */}
                                      <div className="flex items-center gap-2 shrink-0">
                                        {isLunch ? (
                                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                                            <Utensils className="w-3 h-3 text-amber-400" />
                                            <span>Lunch</span>
                                          </span>
                                        ) : isCoffee ? (
                                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40 flex items-center gap-1">
                                            <Coffee className="w-3 h-3 text-sky-400" />
                                            <span>{bk.type.split(' ')[0]}</span>
                                          </span>
                                        ) : (
                                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-purple-400" />
                                            <span>{bk.type.split(' ')[0]}</span>
                                          </span>
                                        )}
                                      </div>

                                      {/* Center: High-Contrast Start -> End Timestamps */}
                                      <div className="flex items-center gap-2 font-mono text-xs">
                                        <span className="font-black text-white bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700/80 shadow-inner">
                                          {bk.startTime}
                                        </span>
                                        <span className="text-indigo-400 font-sans font-bold text-sm">→</span>
                                        {bk.endTime ? (
                                          <span className="font-black text-white bg-slate-900 px-2 py-0.5 rounded-md border border-slate-700/80 shadow-inner">
                                            {bk.endTime}
                                          </span>
                                        ) : (
                                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/25 text-amber-300 border border-amber-500/50 animate-pulse flex items-center gap-1 font-sans">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                                            Running
                                          </span>
                                        )}
                                      </div>

                                      {/* Right: Duration Pill */}
                                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-mono font-bold shrink-0">
                                        {bk.durationFormatted || `${bk.durationMinutes}m`}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ) : (
                            <div className="py-1">
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-500 font-sans">
                                <span>No breaks taken (0m)</span>
                              </span>
                            </div>
                          )}
                        </td>

                        {/* 7. Working Hours */}
                        <td className="py-4 px-4 font-bold text-white font-mono text-xs align-top">
                          <div className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 w-fit">
                            {Math.floor(r.workingMinutes / 60)}h {r.workingMinutes % 60}m
                          </div>
                        </td>

                        {/* 8. Overtime */}
                        <td className="py-4 px-4 font-mono text-xs align-top">
                          {r.overtimeMinutes > 0 ? (
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/25 inline-block">
                              +{r.overtimeMinutes}m
                            </span>
                          ) : (
                            <span className="text-slate-500 py-1 inline-block">0m</span>
                          )}
                        </td>

                        {/* 9. Status */}
                        <td className="py-4 px-4 font-sans text-right align-top">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1.5 border whitespace-nowrap ${
                              r.status === 'Present'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                : r.status === 'Late'
                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                : r.status === 'On Leave'
                                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                r.status === 'Present'
                                  ? 'bg-emerald-400'
                                  : r.status === 'Late'
                                  ? 'bg-amber-400'
                                  : 'bg-slate-400'
                              }`}
                            />
                            {r.status}
                          </span>
                        </td>
                      </tr>

                      {/* Expandable detailed drawer row */}
                      {isExpanded && r.breaksList && r.breaksList.length > 0 && (
                        <tr className="bg-slate-950/80 border-b border-slate-800">
                          <td colSpan={9} className="p-5 pl-10 font-sans">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-bold text-white flex items-center gap-2">
                                  <Info className="w-4 h-4 text-indigo-400" />
                                  <span>Detailed Biometric Break Audit Log for {r.employeeName} ({r.empId}) • {r.date}</span>
                                </h5>
                                <span className="text-[11px] text-slate-400">
                                  Total Break Time: <strong className="text-amber-300 font-mono">{r.breakMinutes} mins</strong>
                                </span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {r.breaksList.map((item, i) => (
                                  <div
                                    key={i}
                                    className="p-3 rounded-2xl bg-slate-900 border border-slate-700/80 text-xs flex flex-col justify-between gap-2 shadow-lg"
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="font-bold text-white flex items-center gap-1.5">
                                        {item.type.toLowerCase().includes('lunch') ? (
                                          <Utensils className="w-3.5 h-3.5 text-amber-400" />
                                        ) : (
                                          <Coffee className="w-3.5 h-3.5 text-sky-400" />
                                        )}
                                        {item.type}
                                      </span>
                                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                                        {item.durationFormatted}
                                      </span>
                                    </div>
                                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] flex items-center justify-between">
                                      <div>
                                        <span className="text-[9px] uppercase font-bold text-slate-500 block font-sans">Start</span>
                                        <span className="text-white font-bold">{item.startTime}</span>
                                      </div>
                                      <span className="text-slate-600 font-sans font-bold">→</span>
                                      <div className="text-right">
                                        <span className="text-[9px] uppercase font-bold text-slate-500 block font-sans">End</span>
                                        <span className="text-white font-bold">{item.endTime || 'Active'}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                                      <span>Date: {item.startDate || r.date}</span>
                                      <span className={item.endTime ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                                        {item.endTime ? '✓ Completed' : '● In-Progress'}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* HR VIEW: LATE ARRIVALS, BREAK AUDIT, & OVERTIME */}
      {activeTab === 'hr-view' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Late Arrivals Box */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Late Arrivals Log (Today)
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                  {lateArrivals.length} Flagged
                </span>
              </div>
              <div className="space-y-3">
                {lateArrivals.map((l, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between font-bold text-white">
                      <span>{l.name} ({l.empId})</span>
                      <span className="text-amber-400 font-mono">{l.checkIn}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>{l.date} • Dept: {l.dept}</span>
                      <span className="text-rose-400 font-medium">+{l.delay} Delay</span>
                    </div>
                    <div className="text-[10px] text-slate-500 italic">Reason: "{l.reason}"</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Break Policy & Compliance Box */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Break Policy Compliance
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  100% Compliant
                </span>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-white">
                    <span>Lunch Break Window</span>
                    <span className="text-emerald-400 font-mono">Max 45m</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Permitted between 12:30 PM - 02:30 PM. Rahul Bajediyal took 40m (01:15 PM - 01:55 PM).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-white">
                    <span>Tea / Rest Break Window</span>
                    <span className="text-emerald-400 font-mono">Max 20m</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Permitted between 04:00 PM - 05:30 PM. Rahul Bajediyal took 20m (04:30 PM - 04:50 PM).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-white">
                    <span>Unannounced Absence</span>
                    <span className="text-rose-400 font-mono">1 Alert</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Varun Kapoor (EMP010) has not checked in as of 10:30 AM today.
                  </p>
                </div>
              </div>
            </div>

            {/* Overtime Workers Box */}
            <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
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
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
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
