'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import { UserRole } from '../../types';
import {
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Building2,
  Sparkles,
  Shield,
  User,
  Coffee,
  LogOut,
} from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const {
    role,
    user,
    logout,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    todayAttendance,
  } = useAuth();

  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search & Location Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search employees, departments, audit logs, or trades (Cmd + K)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Center: Live Office Status Badge */}
      <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-white">Bengaluru HQ</span>
        <span className="text-slate-500">•</span>
        <span className="text-emerald-400 font-semibold">112 Present</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300">73 Active Desk</span>
        {todayAttendance.isOnBreak ? (
          <>
            <span className="text-slate-500">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold flex items-center gap-1.5 animate-pulse">
              <Coffee className="w-3.5 h-3.5 text-amber-400" />
              <span>1 Staff On Break ({role === 'Employee' ? 'You' : (todayAttendance.currentBreakEmployeeName || 'Rahul')} - {todayAttendance.currentBreakType.split(' ')[0]})</span>
            </span>
          </>
        ) : (
          <>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{todayAttendance.date || '19 Oct 2026'}</span>
          </>
        )}
      </div>

      {/* Right Controls: Notifications + User Identity + Sign Out */}
      <div className="flex items-center gap-3">
        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-3 z-50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-white">Notifications ({unreadCount})</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[10px] font-medium text-indigo-400 hover:text-indigo-300"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      n.isRead
                        ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                        : 'bg-slate-800/60 border-indigo-500/20 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between font-semibold text-white mb-0.5">
                      <span className="truncate">{n.title}</span>
                      <span className="text-[9px] text-slate-500 shrink-0">{n.createdAt}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Identity Pill */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 shadow-sm">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-xs text-white shadow-sm">
            {user?.fullName?.charAt(0) || 'U'}
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white leading-tight truncate max-w-[130px]">
              {user?.fullName || 'User'}
            </p>
            <div className="flex items-center gap-1.5">
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                  role === 'Super Admin'
                    ? 'text-indigo-300 bg-indigo-500/20'
                    : role === 'Manager'
                    ? 'text-amber-300 bg-amber-500/20'
                    : role === 'Employee'
                    ? 'text-cyan-300 bg-cyan-500/20'
                    : role === 'HR'
                    ? 'text-emerald-300 bg-emerald-500/20'
                    : role === 'Finance'
                    ? 'text-purple-300 bg-purple-500/20'
                    : 'text-rose-300 bg-rose-500/20'
                }`}
              >
                {role === 'Employee' ? 'Engineer' : role}
              </span>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={() => {
            logout();
            router.push('/login');
          }}
          title="Sign Out of session"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:border-rose-500/50 text-xs font-semibold transition-all shadow-sm"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </div>
    </header>
  );
};
