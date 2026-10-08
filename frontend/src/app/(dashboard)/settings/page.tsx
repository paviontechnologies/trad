'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import {
  Settings,
  Building2,
  Users,
  Clock,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function SettingsPage() {
  const { showToast } = useAuth();

  const [activeTab, setActiveTab] = useState<'org' | 'roles' | 'attendance' | 'payroll' | 'security'>('org');

  const [orgData, setOrgData] = useState({
    companyName: 'PAVION Technologies Pvt Ltd',
    address: 'Level 5, Embassy TechVillage, Outer Ring Road, Bengaluru, Karnataka 560103',
    timezone: 'Asia/Kolkata (IST +5:30)',
    currency: 'INR (₹)',
  });

  const [attendanceRules, setAttendanceRules] = useState({
    workingHours: 8.5,
    breakDuration: 60,
    overtimeThreshold: 8.5,
    lateGraceMinutes: 15,
  });

  const [payrollRules, setPayrollRules] = useState({
    pfRate: 6.0,
    hraRate: 25.0,
    taxDeductionRate: 2.6,
  });

  const [securityRules, setSecurityRules] = useState({
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxFailedAttempts: 3,
    twoFactorEnforced: true,
  });

  const handleSave = (section: string) => {
    showToast(`Successfully saved ${section} configuration!`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            System Policies & Enterprise Settings
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Admin Governance
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure organization branding, role permission matrices, biometric attendance tolerances, payroll deduction rules, and cybersecurity controls.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800 flex items-center gap-2 overflow-x-auto pb-px">
        {[
          { key: 'org', label: 'Organization', icon: Building2 },
          { key: 'roles', label: 'Users & Roles (RBAC)', icon: Users },
          { key: 'attendance', label: 'Attendance Rules', icon: Clock },
          { key: 'payroll', label: 'Payroll & Taxes', icon: CreditCard },
          { key: 'security', label: 'Cybersecurity Policies', icon: ShieldCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'border-indigo-500 text-white bg-indigo-500/10 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. ORGANIZATION SETTINGS */}
      {activeTab === 'org' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-white">Company Identity & Location</h3>
          
          {/* Official Brand Logo preview */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white px-3 py-2 rounded-xl shadow-sm border border-slate-700">
                <img
                  src="/logo.png"
                  alt="Pavion Technologies Pvt. Ltd."
                  className="h-6 w-auto object-contain"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Official Brand Logo</p>
                <p className="text-[10px] text-slate-400">Primary enterprise insignia & letterhead asset</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">Active</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Company Legal Name</label>
              <input
                type="text"
                value={orgData.companyName}
                onChange={(e) => setOrgData({ ...orgData, companyName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Registered Headquarters Address</label>
              <input
                type="text"
                value={orgData.address}
                onChange={(e) => setOrgData({ ...orgData, address: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">System Timezone</label>
                <input
                  type="text"
                  readOnly
                  value={orgData.timezone}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Accounting Currency</label>
                <input
                  type="text"
                  readOnly
                  value={orgData.currency}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => handleSave('Organization')}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow"
            >
              Save Organization Settings
            </button>
          </div>
        </div>
      )}

      {/* 2. USERS & ROLES */}
      {activeTab === 'roles' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Defined System Roles & Permissions Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 font-semibold">Role Name</th>
                  <th className="py-2.5 font-semibold">Dashboard Access</th>
                  <th className="py-2.5 font-semibold">Employees CRUD</th>
                  <th className="py-2.5 font-semibold">Attendance & Breaks</th>
                  <th className="py-2.5 font-semibold">Leave Approval</th>
                  <th className="py-2.5 font-semibold">Payroll & Slips</th>
                  <th className="py-2.5 font-semibold">Security Audit</th>
                  <th className="py-2.5 font-semibold">Trading Desk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {[
                  { role: 'Super Admin', dash: 'Full', emp: 'Full', att: 'Full', lve: 'Full', pay: 'Full', sec: 'Full', trd: 'Full' },
                  { role: 'Management', dash: 'Full', emp: 'View', att: 'View', lve: 'View', pay: 'View', sec: 'View', trd: 'View' },
                  { role: 'HR Lead', dash: 'HR View', emp: 'Full', att: 'Full', lve: 'Approve', pay: 'View', sec: 'Audit Only', trd: 'None' },
                  { role: 'Finance', dash: 'Finance View', emp: 'View', att: 'View', lve: 'Self', pay: 'Full', sec: 'View', trd: 'View' },
                  { role: 'Manager', dash: 'Team View', emp: 'Team', att: 'Team', lve: 'Approve', pay: 'None', sec: 'None', trd: 'Approve' },
                  { role: 'Trader', dash: 'Trading Desk', emp: 'None', att: 'Self', lve: 'Self', pay: 'Self', sec: 'None', trd: 'Execute' },
                  { role: 'Employee', dash: 'My Portal', emp: 'Directory', att: 'Self', lve: 'Apply', pay: 'Self Slip', sec: 'None', trd: 'None' },
                ].map((r) => (
                  <tr key={r.role} className="hover:bg-slate-800/40">
                    <td className="py-3 font-bold text-white">{r.role}</td>
                    <td className="py-3 text-emerald-400">{r.dash}</td>
                    <td className="py-3 text-slate-300">{r.emp}</td>
                    <td className="py-3 text-slate-300">{r.att}</td>
                    <td className="py-3 text-indigo-300">{r.lve}</td>
                    <td className="py-3 text-purple-300">{r.pay}</td>
                    <td className="py-3 text-rose-300">{r.sec}</td>
                    <td className="py-3 text-amber-300">{r.trd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ATTENDANCE RULES */}
      {activeTab === 'attendance' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-white">Attendance & Working Hours Policy</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Standard Daily Working Hours</label>
              <input
                type="number"
                step="0.5"
                value={attendanceRules.workingHours}
                onChange={(e) => setAttendanceRules({ ...attendanceRules, workingHours: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Maximum Rest/Meal Break (Minutes)</label>
              <input
                type="number"
                value={attendanceRules.breakDuration}
                onChange={(e) => setAttendanceRules({ ...attendanceRules, breakDuration: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Late Arrival Grace Period (Minutes)</label>
              <input
                type="number"
                value={attendanceRules.lateGraceMinutes}
                onChange={(e) => setAttendanceRules({ ...attendanceRules, lateGraceMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              onClick={() => handleSave('Attendance Policy')}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow"
            >
              Update Attendance Policies
            </button>
          </div>
        </div>
      )}

      {/* 4. PAYROLL RULES */}
      {activeTab === 'payroll' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-white">Statutory Deductions & Allowances Configuration</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Employee Provident Fund (PF Rate %)</label>
              <input
                type="number"
                step="0.5"
                value={payrollRules.pfRate}
                onChange={(e) => setPayrollRules({ ...payrollRules, pfRate: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">House Rent Allowance (HRA % of Basic)</label>
              <input
                type="number"
                step="1"
                value={payrollRules.hraRate}
                onChange={(e) => setPayrollRules({ ...payrollRules, hraRate: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              onClick={() => handleSave('Payroll Policy')}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow"
            >
              Save Deduction Slabs
            </button>
          </div>
        </div>
      )}

      {/* 5. CYBERSECURITY POLICIES */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-white">Cybersecurity & Access Governance</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Inactivity Session Timeout (Minutes)</label>
              <input
                type="number"
                value={securityRules.sessionTimeout}
                onChange={(e) => setSecurityRules({ ...securityRules, sessionTimeout: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Mandatory Password Rotation (Days)</label>
              <input
                type="number"
                value={securityRules.passwordExpiry}
                onChange={(e) => setSecurityRules({ ...securityRules, passwordExpiry: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Max Failed Login Attempts Before Lockout</label>
              <input
                type="number"
                value={securityRules.maxFailedAttempts}
                onChange={(e) => setSecurityRules({ ...securityRules, maxFailedAttempts: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              onClick={() => handleSave('Security Policies')}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow"
            >
              Update Security Policies
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
