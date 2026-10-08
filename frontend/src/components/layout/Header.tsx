'use client';

import React, { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { UserRole } from '../../types';
import {
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Info,
  Building2,
  ChevronDown,
  Sparkles,
  Shield,
  User,
  SlidersHorizontal,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    role,
    user,
    switchRole,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
  } = useAuth();

  const [showNotifs, setShowNotifs] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const rolesList: { role: UserRole; label: string; desc: string; color: string }[] = [
    { role: 'Super Admin', label: 'Super Admin', desc: 'Central enterprise dashboard, all modules & audit logs', color: 'bg-indigo-500' },
    { role: 'HR', label: 'HR Lead (Priya)', desc: 'Attendance oversight, leave approvals, employee directory', color: 'bg-emerald-500' },
    { role: 'Manager', label: 'Manager (Amit)', desc: 'Team attendance, pending leave approvals, performance', color: 'bg-amber-500' },
    { role: 'Employee', label: 'Employee (Rahul)', desc: 'Personal check-in/out, live timer, leaves, payslips', color: 'bg-cyan-500' },
    { role: 'Finance', label: 'Finance (Sunita)', desc: 'Payroll processing, salary computation, payslips', color: 'bg-purple-500' },
    { role: 'Trader', label: 'Trader (Rohan)', desc: 'Trading terminal, trade executions, risk exposure', color: 'bg-rose-500' },
  ];

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
      <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-white">Bengaluru HQ</span>
        <span className="text-slate-500">•</span>
        <span className="text-emerald-400 font-semibold">74 Active Logins</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-400">08 Oct 2026</span>
      </div>

      {/* Right Controls: Role Switcher Pill + Notifications + User */}
      <div className="flex items-center gap-3">
        {/* Client Demo Quick Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 hover:border-indigo-400/60 text-xs font-semibold text-white transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400 font-normal">Demo View:</span>
            <span className="text-indigo-300 font-bold">{role}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs font-bold text-white">Switch Role Presentation</p>
                <p className="text-[10px] text-slate-400">Simulate different user views instantly</p>
              </div>
              <div className="py-1 space-y-1">
                {rolesList.map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      switchRole(item.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                      role === item.role
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 font-semibold'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="font-semibold">{item.label}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 pl-4">{item.desc}</p>
                    </div>
                    {role === item.role && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 transition-all"
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

        {/* User Badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-bold text-xs text-white shadow-md shadow-indigo-600/20">
            {user?.fullName?.charAt(0) || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};
