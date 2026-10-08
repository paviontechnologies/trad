'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  AlertTriangle,
  Lock,
  FileSpreadsheet,
  Terminal,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
} from 'lucide-react';

export default function SecurityPage() {
  const { auditLogs, securityAlerts, resolveAlert, showToast } = useAuth();

  const [activeTab, setActiveTab] = useState<'alerts' | 'audit'>('alerts');
  const [filterAction, setFilterAction] = useState('ALL');
  const [filterModule, setFilterModule] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      !search ||
      log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.includes(search);

    const matchesAction = filterAction === 'ALL' || log.action === filterAction;
    const matchesModule = filterModule === 'ALL' || log.module === filterModule;

    return matchesSearch && matchesAction && matchesModule;
  });

  const unresolvedAlerts = securityAlerts.filter((a) => !a.isResolved);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Security Operations & Audit Trail
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {unresolvedAlerts.length} Unresolved Incidents
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Immutable WHO / WHAT / WHEN / WHERE system audit trail and real-time threat alert detection.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('alerts')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'alerts'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Threat Alerts ({unresolvedAlerts.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'audit'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Audit Trail ({auditLogs.length})
          </button>
        </div>
      </div>

      {/* THREAT ALERTS SECTION */}
      {activeTab === 'alerts' && (
        <div className="space-y-6">
          {/* Top Threat Severity Distribution Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/30 shadow-xl">
              <span className="text-[10px] uppercase font-bold text-rose-400">Critical Incidents</span>
              <div className="text-2xl font-black text-rose-400 mt-1">1</div>
              <span className="text-[10px] text-slate-400">External file share leak</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-xl">
              <span className="text-[10px] uppercase font-bold text-amber-400">High Severity</span>
              <div className="text-2xl font-black text-amber-400 mt-1">2</div>
              <span className="text-[10px] text-slate-400">Failed logins & unauthorized</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-blue-500/30 shadow-xl">
              <span className="text-[10px] uppercase font-bold text-blue-400">Medium Severity</span>
              <div className="text-2xl font-black text-blue-400 mt-1">1</div>
              <span className="text-[10px] text-slate-400">Large CSV export at night</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl">
              <span className="text-[10px] uppercase font-bold text-emerald-400">Resolved Today</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">2</div>
              <span className="text-[10px] text-slate-400">Acknowledged by Admin</span>
            </div>
          </div>

          {/* Incident Cards List */}
          <div className="space-y-3">
            {securityAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  alert.isResolved
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : alert.severity === 'CRITICAL'
                    ? 'bg-rose-950/20 border-rose-500/40'
                    : alert.severity === 'HIGH'
                    ? 'bg-amber-950/20 border-amber-500/40'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        alert.severity === 'CRITICAL'
                          ? 'bg-rose-600 text-white'
                          : alert.severity === 'HIGH'
                          ? 'bg-amber-500 text-black'
                          : alert.severity === 'MEDIUM'
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {alert.severity}
                    </span>
                    <span className="font-bold text-white text-sm">{alert.title}</span>
                    <span className="text-[11px] text-slate-400">• Detected: {alert.createdAt}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{alert.description}</p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                    <span>
                      Target Account / IP: <strong className="text-white">{alert.targetUser || 'System'}</strong>
                    </span>
                    <span>
                      Category: <strong className="text-indigo-400 font-mono">{alert.alertType}</strong>
                    </span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {!alert.isResolved ? (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all transform active:scale-95"
                    >
                      Acknowledge & Resolve
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Resolved by Admin
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AUDIT TRAIL LOGS SECTION */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user, action, IP..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <select
                value={filterAction}
                onChange={(e) => setFilterAction(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">All Action Types</option>
                <option value="LOGIN_SUCCESS">LOGIN_SUCCESS</option>
                <option value="FAILED_LOGIN">FAILED_LOGIN</option>
                <option value="EXPORT_REPORT">EXPORT_REPORT</option>
                <option value="LEAVE_APPROVED">LEAVE_APPROVED</option>
                <option value="TRADE_REQUEST">TRADE_REQUEST</option>
                <option value="UNAUTHORIZED_ACCESS">UNAUTHORIZED_ACCESS</option>
              </select>
            </div>

            <div>
              <select
                value={filterModule}
                onChange={(e) => setFilterModule(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">All System Modules</option>
                <option value="Web Portal">Web Portal</option>
                <option value="Payroll">Payroll</option>
                <option value="Leave Management">Leave Management</option>
                <option value="Trading">Trading</option>
                <option value="Security Gateway">Security Gateway</option>
              </select>
            </div>
          </div>

          {/* Audit Log Table */}
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400">
                    <th className="py-3 px-4 font-semibold">User</th>
                    <th className="py-3 px-4 font-semibold">Action</th>
                    <th className="py-3 px-4 font-semibold">System Module</th>
                    <th className="py-3 px-4 font-semibold">Details</th>
                    <th className="py-3 px-4 font-semibold">Time</th>
                    <th className="py-3 px-4 font-semibold">IP Address</th>
                    <th className="py-3 px-4 font-semibold">Device</th>
                    <th className="py-3 px-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-white">{log.userName}</td>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-400">{log.action}</td>
                      <td className="py-3 px-4 text-slate-300">{log.module}</td>
                      <td className="py-3 px-4 text-slate-400 max-w-xs truncate">{log.details || '-'}</td>
                      <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                      <td className="py-3 px-4 font-mono text-slate-300">{log.ipAddress}</td>
                      <td className="py-3 px-4 text-slate-400">{log.device}</td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            log.status === 'Success'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
