'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import {
  CalendarDays,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  FileText,
  User,
  Upload,
  Sparkles,
  X,
} from 'lucide-react';

export default function LeaveManagementPage() {
  const {
    leaveRequests,
    leaveBalances,
    applyLeave,
    approveLeave,
    rejectLeave,
    role,
    showToast,
  } = useAuth();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [formData, setFormData] = useState({
    leaveType: 'Annual',
    startDate: '2026-10-20',
    endDate: '2026-10-22',
    daysCount: 3,
    reason: '',
  });

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyLeave({
      ...formData,
      daysCount: Number(formData.daysCount),
    });
    setShowApplyModal(false);
    setFormData({
      leaveType: 'Annual',
      startDate: '2026-10-20',
      endDate: '2026-10-22',
      daysCount: 3,
      reason: '',
    });
  };

  const filteredRequests = leaveRequests.filter((r) => {
    if (filterStatus === 'ALL') return true;
    return r.status === filterStatus;
  });

  const pendingRequests = leaveRequests.filter((r) => r.status === 'PENDING');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Leave & Time-Off Management
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {pendingRequests.length} Pending Approval
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Submit leave requests, manage balance accruals, and process manager/HR approval workflows.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Apply For Leave</span>
        </button>
      </div>

      {/* Leave Balances Grid (Rahul Bajediyal) */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          My Available Entitlements (Rahul Bajediyal • CY 2026)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Annual Leave (Paid)</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">14 Allotted</span>
              </div>
              <div className="text-3xl font-black text-indigo-400 mt-3">
                {leaveBalances.annual.remaining} Days
              </div>
              <span className="text-xs text-slate-500">Remaining to take</span>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-400">
              <span>Used: <strong className="text-white">{leaveBalances.annual.used} days</strong></span>
              <span>Total: <strong className="text-white">{leaveBalances.annual.total} days</strong></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Sick / Medical Leave</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">10 Allotted</span>
              </div>
              <div className="text-3xl font-black text-emerald-400 mt-3">
                {leaveBalances.sick.remaining} Days
              </div>
              <span className="text-xs text-slate-500">Remaining to take</span>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-400">
              <span>Used: <strong className="text-white">{leaveBalances.sick.used} days</strong></span>
              <span>Total: <strong className="text-white">{leaveBalances.sick.total} days</strong></span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Casual Leave</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">8 Allotted</span>
              </div>
              <div className="text-3xl font-black text-amber-400 mt-3">
                {leaveBalances.casual.remaining} Days
              </div>
              <span className="text-xs text-slate-500">Remaining to take</span>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-400">
              <span>Used: <strong className="text-white">{leaveBalances.casual.used} days</strong></span>
              <span>Total: <strong className="text-white">{leaveBalances.casual.total} days</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Manager Approval Queue (Actionable Demo Section) */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Manager Action Queue ({pendingRequests.length} Pending Approval)
            </h3>
            <p className="text-xs text-slate-400">
              Client Demo: Click <strong>Approve</strong> or <strong>Reject</strong> to trigger live workflow updates!
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterStatus === st
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                req.status === 'PENDING'
                  ? 'bg-slate-950/80 border-indigo-500/30'
                  : 'bg-slate-950/40 border-slate-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white text-sm">{req.employeeName}</span>
                  <span className="text-slate-400 font-mono text-xs">({req.empId})</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
                    {req.departmentName}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                    {req.leaveType} Leave • {req.daysCount} Day(s)
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  <strong className="text-slate-400">Reason:</strong> {req.reason}
                </p>
                <div className="text-[11px] text-slate-400">
                  Dates: <strong className="text-white font-mono">{req.startDate}</strong> to{' '}
                  <strong className="text-white font-mono">{req.endDate}</strong>
                  {req.approvedBy && (
                    <span className="ml-3 text-emerald-400">
                      • Reviewed by {req.approvedBy}
                    </span>
                  )}
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                {req.status === 'PENDING' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveLeave(req.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all transform active:scale-95"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => rejectLeave(req.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600/80 hover:bg-rose-600 text-white shadow-md transition-all transform active:scale-95"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Reject</span>
                    </button>
                  </div>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'APPROVED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {req.status === 'APPROVED' ? '✓ Approved' : '✕ Rejected'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">Apply for Time-Off / Leave</h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Leave Category</label>
                <select
                  value={formData.leaveType}
                  onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Annual">Annual Leave (9 remaining)</option>
                  <option value="Sick">Sick Leave (8 remaining)</option>
                  <option value="Casual">Casual Leave (7 remaining)</option>
                  <option value="Maternity">Maternity / Paternity</option>
                  <option value="Unpaid">Unpaid Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">From Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">To Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Total Days</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={formData.daysCount}
                  onChange={(e) => setFormData({ ...formData, daysCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reason for Absence</label>
                <textarea
                  required
                  rows={3}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Provide context for manager review..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 text-center cursor-pointer hover:border-indigo-500/50">
                <Upload className="w-4 h-4 text-slate-400 mx-auto mb-1" />
                <span className="text-[11px] text-slate-400">Attach doctor prescription or document (Optional)</span>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
