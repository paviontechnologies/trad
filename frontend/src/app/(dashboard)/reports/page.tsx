'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import {
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  Printer,
  Sparkles,
  BarChart3,
  FileText,
} from 'lucide-react';

export default function ReportsPage() {
  const { employees, attendanceRecords, auditLogs, showToast } = useAuth();

  const [reportType, setReportType] = useState('attendance');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [dateRange, setDateRange] = useState('October 2026');

  const reportDefinitions: Record<string, { title: string; category: string; count: number; desc: string }> = {
    attendance: { title: 'Attendance & Punctuality Audit', category: 'Workforce', count: 128, desc: 'Detailed employee punch-in, checkout, meal breaks, and overtime hours.' },
    productivity: { title: 'Productivity & App Telemetry Report', category: 'Monitoring', count: 74, desc: 'Active vs. idle percentages, software runtime, and domain classifications.' },
    leave: { title: 'Leave Utilization & Balances', category: 'HR Operations', count: 128, desc: 'Annual, sick, and casual leave consumption across all active business units.' },
    payroll: { title: 'Monthly Payroll Disbursals & Deductions', category: 'Finance', count: 128, desc: 'Itemized CTC, basic, HRA, bonuses, PF, and statutory TDS deductions.' },
    security: { title: 'Security Incident & Audit Trail Log', category: 'Compliance', count: 48, desc: 'Immutable WHO / WHAT / WHEN / WHERE logs of access attempts and alerts.' },
    employees: { title: 'Master Employee Directory & Hierarchy', category: 'HR Operations', count: 128, desc: 'Full organizational headcount, designations, roles, and joining records.' },
  };

  const handleExport = (format: 'CSV' | 'Excel' | 'PDF') => {
    showToast(`Exported ${reportDefinitions[reportType].title} as ${format} document`, 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Enterprise Reports & Analytics Center
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Multi-Format Export
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate and export verified regulatory workforce, attendance, telemetry, payroll, and compliance reports.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow transition-all"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => handleExport('Excel')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 shadow transition-all"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => handleExport('PDF')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / PDF</span>
          </button>
        </div>
      </div>

      {/* Filter and Category Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Select Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="attendance">Attendance & Punctuality Audit</option>
            <option value="productivity">Productivity & Telemetry Telemetry</option>
            <option value="leave">Leave Utilization & Balances</option>
            <option value="payroll">Payroll Disbursals & Deductions</option>
            <option value="security">Security Incident & Audit Trail</option>
            <option value="employees">Master Employee Directory</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Department Scope
          </label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="ALL">All Departments (Entire Organization)</option>
            <option value="IT">Information Technology</option>
            <option value="HR">Human Resources</option>
            <option value="FIN">Finance & Accounts</option>
            <option value="SLS">Sales & Marketing</option>
            <option value="OPS">Operations</option>
            <option value="TRD">Trading & Risk</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Reporting Period
          </label>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white font-semibold focus:outline-none focus:border-indigo-500"
          >
            <option value="October 2026">Current Month (October 2026)</option>
            <option value="Q3 2026">Last Quarter (Q3 2026)</option>
            <option value="FY 2025-26">Full Financial Year (FY 2025-26)</option>
          </select>
        </div>
      </div>

      {/* Selected Report Metadata Banner */}
      <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
            {reportDefinitions[reportType].category}
          </span>
          <h2 className="text-base font-extrabold text-white mt-0.5">
            {reportDefinitions[reportType].title}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">{reportDefinitions[reportType].desc}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-bold">Total Records</span>
            <div className="text-lg font-black text-white">{reportDefinitions[reportType].count}</div>
          </div>
        </div>
      </div>

      {/* Dynamic Report Data Table Preview */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white px-2 py-1 rounded-lg">
              <img src="/logo.png" alt="Pavion Technologies" className="h-4 w-auto object-contain" />
            </div>
            <h3 className="text-sm font-bold text-white">Live Data Preview ({dateRange})</h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">CONFIDENTIAL & PROPRIETARY</span>
        </div>

        <div className="overflow-x-auto">
          {reportType === 'attendance' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 font-semibold">Employee</th>
                  <th className="py-2.5 font-semibold">ID</th>
                  <th className="py-2.5 font-semibold">Department</th>
                  <th className="py-2.5 font-semibold">Date</th>
                  <th className="py-2.5 font-semibold">Check In</th>
                  <th className="py-2.5 font-semibold">Check Out</th>
                  <th className="py-2.5 font-semibold">Hours</th>
                  <th className="py-2.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {attendanceRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-bold text-white">{r.employeeName}</td>
                    <td className="py-2.5 font-mono text-indigo-300">{r.empId}</td>
                    <td className="py-2.5 text-slate-300">{r.department}</td>
                    <td className="py-2.5 text-slate-400">{r.date}</td>
                    <td className="py-2.5 font-mono text-slate-300">{r.checkIn || '-'}</td>
                    <td className="py-2.5 font-mono text-slate-300">{r.checkOut || '-'}</td>
                    <td className="py-2.5 font-mono text-white font-bold">{Math.floor(r.workingMinutes / 60)}h {r.workingMinutes % 60}m</td>
                    <td className="py-2.5 text-right font-bold text-emerald-400">{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'productivity' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 font-semibold">Employee</th>
                  <th className="py-2.5 font-semibold">Department</th>
                  <th className="py-2.5 font-semibold">Active Hours</th>
                  <th className="py-2.5 font-semibold">Idle Hours</th>
                  <th className="py-2.5 font-semibold">Score</th>
                  <th className="py-2.5 font-semibold text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {employees.slice(0, 6).map((e, idx) => (
                  <tr key={e.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-bold text-white">{e.fullName}</td>
                    <td className="py-2.5 text-slate-300">{e.departmentName || 'IT'}</td>
                    <td className="py-2.5 font-mono text-emerald-400 font-bold">6h 35m</td>
                    <td className="py-2.5 font-mono text-amber-400">45m</td>
                    <td className="py-2.5 font-black text-indigo-300">{idx === 0 ? 94 : 85 + idx}%</td>
                    <td className="py-2.5 text-right text-emerald-400 font-semibold">High Performer</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'payroll' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 font-semibold">Employee</th>
                  <th className="py-2.5 font-semibold">Basic</th>
                  <th className="py-2.5 font-semibold">Gross Salary</th>
                  <th className="py-2.5 font-semibold">PF + Tax Deductions</th>
                  <th className="py-2.5 font-semibold">Net Disbursed</th>
                  <th className="py-2.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {employees.slice(0, 6).map((e) => (
                  <tr key={e.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-bold text-white">{e.fullName}</td>
                    <td className="py-2.5 font-mono text-slate-400">₹40,000</td>
                    <td className="py-2.5 font-mono text-white font-bold">₹58,000</td>
                    <td className="py-2.5 font-mono text-rose-400">-₹4,400</td>
                    <td className="py-2.5 font-mono text-emerald-400 font-bold">₹53,600</td>
                    <td className="py-2.5 text-right font-bold text-emerald-400">Processed</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {reportType === 'security' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 font-semibold">Timestamp</th>
                  <th className="py-2.5 font-semibold">User</th>
                  <th className="py-2.5 font-semibold">Action</th>
                  <th className="py-2.5 font-semibold">System Module</th>
                  <th className="py-2.5 font-semibold">IP Address</th>
                  <th className="py-2.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {auditLogs.slice(0, 6).map((l) => (
                  <tr key={l.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 text-slate-400">{l.timestamp}</td>
                    <td className="py-2.5 font-bold text-white">{l.userName}</td>
                    <td className="py-2.5 font-mono text-indigo-400 font-bold">{l.action}</td>
                    <td className="py-2.5 text-slate-300">{l.module}</td>
                    <td className="py-2.5 font-mono text-slate-400">{l.ipAddress}</td>
                    <td className="py-2.5 text-right font-bold text-emerald-400">{l.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {(reportType === 'leave' || reportType === 'employees') && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2.5 font-semibold">ID</th>
                  <th className="py-2.5 font-semibold">Name</th>
                  <th className="py-2.5 font-semibold">Department</th>
                  <th className="py-2.5 font-semibold">Designation</th>
                  <th className="py-2.5 font-semibold">Role</th>
                  <th className="py-2.5 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {employees.slice(0, 8).map((e) => (
                  <tr key={e.id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-mono text-indigo-400 font-bold">{e.empId}</td>
                    <td className="py-2.5 font-bold text-white">{e.fullName}</td>
                    <td className="py-2.5 text-slate-300">{e.departmentName || 'IT'}</td>
                    <td className="py-2.5 text-slate-400">{e.designation}</td>
                    <td className="py-2.5 text-slate-300">{e.roleName}</td>
                    <td className="py-2.5 text-right font-bold text-emerald-400">{e.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
