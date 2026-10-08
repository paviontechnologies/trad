'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CalendarDays,
  Building,
  Activity,
  Layers,
  Globe,
  TrendingUp,
  CreditCard,
  FileText,
  ShieldAlert,
  ShieldCheck,
  CandlestickChart,
  History,
  BarChart3,
  UserCheck,
  Settings,
  LogOut,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  DollarSign,
  Briefcase,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { role, user, logout } = useAuth();

  // 1. Super Admin Nav
  const adminNav = [
    {
      title: null,
      items: [{ name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }],
    },
    {
      title: 'WORKFORCE',
      items: [
        { name: 'Employees', href: '/employees', icon: Users },
        { name: 'Attendance', href: '/attendance', icon: CalendarCheck },
        { name: 'Leave', href: '/leave', icon: CalendarDays },
        { name: 'Departments', href: '/employees?tab=departments', icon: Building },
      ],
    },
    {
      title: 'MONITORING',
      items: [
        { name: 'Employee Activity', href: '/monitoring', icon: Activity },
        { name: 'Applications', href: '/monitoring?tab=apps', icon: Layers },
        { name: 'Websites', href: '/monitoring?tab=sites', icon: Globe },
        { name: 'Productivity', href: '/productivity', icon: TrendingUp },
      ],
    },
    {
      title: 'FINANCE',
      items: [
        { name: 'Payroll', href: '/payroll', icon: CreditCard },
        { name: 'Payslips', href: '/payroll?tab=payslips', icon: FileText },
      ],
    },
    {
      title: 'SECURITY',
      items: [
        { name: 'Audit Logs', href: '/security', icon: ShieldCheck },
        { name: 'Security Alerts', href: '/security?tab=alerts', icon: ShieldAlert, badge: '3' },
      ],
    },
    {
      title: 'TRADING',
      items: [
        { name: 'Trading Dashboard', href: '/trading', icon: CandlestickChart },
        { name: 'Transactions', href: '/trading?tab=transactions', icon: History },
      ],
    },
    {
      title: 'REPORTS',
      items: [{ name: 'Reports & Analytics', href: '/reports', icon: BarChart3 }],
    },
    {
      title: 'SYSTEM',
      items: [
        { name: 'Users & Roles', href: '/settings?tab=roles', icon: UserCheck },
        { name: 'Settings', href: '/settings', icon: Settings },
      ],
    },
  ];

  // 2. HR Specialist Nav (Priya Sharma)
  const hrNav = [
    {
      title: 'HR OPERATIONS',
      items: [
        { name: 'HR Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Employee Directory', href: '/employees', icon: Users },
        { name: 'Attendance & Punctuality', href: '/attendance', icon: CalendarCheck },
        { name: 'Leave Approvals', href: '/leave', icon: CalendarDays, badge: '3' },
        { name: 'Departments', href: '/employees?tab=departments', icon: Building },
      ],
    },
    {
      title: 'PERFORMANCE & TELEMETRY',
      items: [
        { name: 'Activity Telemetry', href: '/monitoring', icon: Activity },
        { name: 'Productivity Scores', href: '/productivity', icon: TrendingUp },
      ],
    },
    {
      title: 'HR GOVERNANCE',
      items: [
        { name: 'HR Reports & Analytics', href: '/reports', icon: BarChart3 },
        { name: 'Company Policies', href: '/settings', icon: Settings },
      ],
    },
  ];

  // 3. Manager Nav (Amit Patel - Engineering Manager)
  const managerNav = [
    {
      title: 'TEAM MANAGEMENT',
      items: [
        { name: 'Team Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Engineering Team (12)', href: '/employees?dept=dept-1', icon: Users },
        { name: 'Team Attendance', href: '/attendance', icon: CalendarCheck },
        { name: 'Leave Approvals', href: '/leave', icon: CalendarDays, badge: '1' },
        { name: 'Sprint Tasks (54)', href: '/employees/EMP001?tab=tasks', icon: Layers },
      ],
    },
    {
      title: 'TELEMETRY & PRODUCTIVITY',
      items: [
        { name: 'Team Activity Monitoring', href: '/monitoring', icon: Activity },
        { name: 'Productivity Rankings', href: '/productivity', icon: TrendingUp },
      ],
    },
    {
      title: 'SIGN-OFFS & REPORTING',
      items: [
        { name: 'Trade Approvals', href: '/trading', icon: CandlestickChart, badge: '2' },
        { name: 'Team Reports', href: '/reports', icon: BarChart3 },
      ],
    },
  ];

  // 4. Finance Controller Nav (Sunita Menon)
  const financeNav = [
    {
      title: 'FINANCE & PAYROLL',
      items: [
        { name: 'Finance Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Payroll Processing', href: '/payroll', icon: CreditCard },
        { name: 'Batch Payslips (128)', href: '/payroll?tab=payslips', icon: FileText },
        { name: 'Tax & PF Deduction Slabs', href: '/settings?tab=payroll', icon: DollarSign },
      ],
    },
    {
      title: 'AUDIT & REPORTS',
      items: [
        { name: 'Financial Reports', href: '/reports', icon: BarChart3 },
        { name: 'Payroll Audit Logs', href: '/security', icon: ShieldCheck },
      ],
    },
    {
      title: 'PERSONAL WORKSPACE',
      items: [
        { name: 'My Attendance', href: '/attendance', icon: CalendarCheck },
        { name: 'Company Directory', href: '/employees', icon: Users },
      ],
    },
  ];

  // 5. Trader Nav (Rohan Gupta)
  const traderNav = [
    {
      title: 'TRADING TERMINAL',
      items: [
        { name: 'Trading Desk', href: '/dashboard', icon: CandlestickChart },
        { name: 'Order Book & Trades', href: '/trading', icon: History },
        { name: 'Market Telemetry', href: '/trading?tab=market', icon: Activity },
      ],
    },
    {
      title: 'RISK & COMPLIANCE',
      items: [
        { name: 'Risk Exposure Limits', href: '/trading?tab=risk', icon: ShieldAlert },
        { name: 'Trade Audit Log', href: '/security', icon: ShieldCheck },
      ],
    },
    {
      title: 'PERSONAL WORKSPACE',
      items: [
        { name: 'My Attendance', href: '/attendance', icon: CalendarCheck },
        { name: 'My Payslips', href: '/payroll', icon: CreditCard },
      ],
    },
  ];

  // 6. Regular Employee Nav (Rahul Bajediyal)
  const employeeNav = [
    {
      title: 'MY WORKSPACE',
      items: [
        { name: 'My Portal', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Attendance', href: '/attendance', icon: CalendarCheck },
        { name: 'My Activity & Apps', href: '/monitoring', icon: Activity },
        { name: 'My Tasks (8)', href: '/employees/EMP001?tab=tasks', icon: Layers },
        { name: 'Leave Balance (9 Days)', href: '/leave', icon: CalendarDays },
        { name: 'My Payslips (October)', href: '/payroll', icon: CreditCard },
      ],
    },
    {
      title: 'ENTERPRISE ACCESS',
      items: [
        { name: 'Company Directory', href: '/employees', icon: Users },
        { name: 'Trading Desk Demo', href: '/trading', icon: CandlestickChart },
      ],
    },
  ];

  let navGroups = adminNav;
  if (role === 'HR') navGroups = hrNav;
  else if (role === 'Manager') navGroups = managerNav;
  else if (role === 'Finance') navGroups = financeNav;
  else if (role === 'Trader') navGroups = traderNav;
  else if (role === 'Employee') navGroups = employeeNav;

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 shrink-0 select-none z-30">
      {/* Brand logo header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-600/30">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-extrabold text-base tracking-wider text-white">PAVION</span>
          <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider truncate">
            {role.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Navigation menu list */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {group.title && (
              <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {group.title}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href.split('?')[0];

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-400 font-semibold border border-indigo-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User profile footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.fullName}</p>
              <p className="text-[10px] text-slate-400 truncate">{role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-700/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
