'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../lib/auth-context';
import {
  Sparkles,
  Clock,
  CalendarCheck,
  TrendingUp,
  Layers,
  CalendarDays,
  CreditCard,
  User,
  Coffee,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Play,
  LogOut,
} from 'lucide-react';

export default function EmployeePortalPage() {
  const {
    todayAttendance,
    checkIn,
    startBreak,
    endBreak,
    checkOut,
    leaveBalances,
  } = useAuth();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Greeting Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/60 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>PAVION Employee Self-Service Space</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Good Morning, Rahul 👋
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Senior Software Engineer • IT Department • Shift: 09:00 AM - 06:00 PM (Embassy TechVillage Bengaluru)
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/attendance"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <span>Live Attendance Hub</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Top Key Employee KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Today's Attendance */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Today's Attendance</span>
              <Clock className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-white mt-2">09:12 AM</div>
            <span className="text-[11px] text-emerald-400 mt-0.5 block font-semibold">
              ✓ Checked In On-Time
            </span>
          </div>
          <div className="pt-3 border-t border-slate-800 mt-3 text-[10px] text-slate-500">
            Biometric Sync Active
          </div>
        </div>

        {/* Working Time */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Working Time</span>
              <CalendarCheck className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-xl font-black text-indigo-400 font-mono mt-2">
              {todayAttendance.workingTime}
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Break: {todayAttendance.breakTime}
            </span>
          </div>
          <div className="pt-3 border-t border-slate-800 mt-3 text-[10px] text-slate-500">
            Target: 08h 30m / day
          </div>
        </div>

        {/* Productivity */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Productivity Score</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-emerald-400 mt-2">78%</div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              VS Code: 3h 20m • Git: 2h 12m
            </span>
          </div>
          <div className="pt-3 border-t border-slate-800 mt-3 text-[10px] text-emerald-400 font-semibold">
            Top 5% Performer
          </div>
        </div>

        {/* Tasks */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Sprint Tasks</span>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-black text-white mt-2">8 Total</div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              <strong className="text-emerald-400">5 Done</strong> •{' '}
              <strong className="text-amber-400">3 Pending</strong>
            </span>
          </div>
          <div className="pt-3 border-t border-slate-800 mt-3 text-[10px] text-slate-500">
            Sprint ends in 3 days
          </div>
        </div>

        {/* Leave Balance */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between col-span-2 md:col-span-1">
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-400">
              <span>Leave Balance</span>
              <CalendarDays className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-amber-400 mt-2">
              {leaveBalances.annual.remaining} Days
            </div>
            <span className="text-[11px] text-slate-400 mt-0.5 block">
              Annual (9) • Sick (8) • Casual (7)
            </span>
          </div>
          <div className="pt-3 border-t border-slate-800 mt-3 text-[10px] text-slate-500">
            Valid until 31 Dec 2026
          </div>
        </div>
      </div>

      {/* Quick Punch Controller Widget */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Live Punch Station</h3>
            <p className="text-xs text-slate-400">
              Currently: <strong className="text-emerald-400 font-semibold">{todayAttendance.isOnBreak ? 'On Rest Break' : 'Active On Duty'}</strong> • Working time clocked: {todayAttendance.workingTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!todayAttendance.isOnBreak ? (
            <button
              onClick={startBreak}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow transition-all"
            >
              <Coffee className="w-4 h-4" />
              <span>Take Break</span>
            </button>
          ) : (
            <button
              onClick={endBreak}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Resume Work</span>
            </button>
          )}

          <button
            onClick={checkOut}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600/80 hover:bg-rose-600 text-white shadow transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Clock Out</span>
          </button>
        </div>
      </div>

      {/* Quick Access Menu Cards */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          Self-Service Portals & Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href="/attendance"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 transition-all flex items-center justify-between group shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  My Attendance History
                </h4>
                <p className="text-xs text-slate-400">Monthly check-in/out records & calendar</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/monitoring"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 transition-all flex items-center justify-between group shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  My Activity & Telemetry
                </h4>
                <p className="text-xs text-slate-400">Software usage and productivity scorecard</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/leave"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 transition-all flex items-center justify-between group shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  Apply for Time-Off
                </h4>
                <p className="text-xs text-slate-400">Submit leave request & check balance</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/payroll"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 transition-all flex items-center justify-between group shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  My Salary & Payslips
                </h4>
                <p className="text-xs text-slate-400">October 2026 slip (Net: ₹53,600)</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/employees/EMP001"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 transition-all flex items-center justify-between group shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  My Corporate Profile
                </h4>
                <p className="text-xs text-slate-400">Job specs, supervisor & documentation</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            href="/trading"
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 hover:bg-slate-850 transition-all flex items-center justify-between group shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                  Trading Terminal
                </h4>
                <p className="text-xs text-slate-400">Institutional desk & order requests</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
