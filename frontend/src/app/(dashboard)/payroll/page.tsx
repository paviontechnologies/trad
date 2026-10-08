'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  Download,
  Printer,
  Sparkles,
  Calculator,
  Search,
  Eye,
  IndianRupee,
} from 'lucide-react';

export default function PayrollPage() {
  const { employees, showToast } = useAuth();

  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [showSlipModal, setShowSlipModal] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState(employees[0]);

  // Live Calculator State
  const [basic, setBasic] = useState(40000);
  const [hra, setHra] = useState(10000);
  const [bonus, setBonus] = useState(5000);
  const [overtime, setOvertime] = useState(3000);
  const [pf, setPf] = useState(2400);
  const [tax, setTax] = useState(1500);
  const [otherDeductions, setOtherDeductions] = useState(500);

  const grossSalary = basic + hra + bonus + overtime;
  const totalDeductions = pf + tax + otherDeductions;
  const netSalary = grossSalary - totalDeductions;

  const openSlip = (emp: any) => {
    setActiveEmployee(emp);
    setShowSlipModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Enterprise Payroll & Compensation
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              INR (₹) Asia/Kolkata
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated gross-to-net salary calculations, statutory PF/TDS deductions, and compliant PDF payslips.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="October 2026">October 2026 (Active Period)</option>
            <option value="September 2026">September 2026 (Disbursed)</option>
            <option value="August 2026">August 2026 (Disbursed)</option>
          </select>
          <button
            onClick={() => showToast('Batch processed 128 payslips for October 2026', 'success')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all"
          >
            <CreditCard className="w-4 h-4" />
            <span>Process Batch Payroll</span>
          </button>
        </div>
      </div>

      {/* Top 6 Payroll KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Payroll</span>
          <div className="text-xl font-black text-white mt-1">₹58,40,000</div>
          <span className="text-[10px] text-slate-400">128 Total Staff</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Processed</span>
          <div className="text-xl font-black text-emerald-400 mt-1">₹49,95,000</div>
          <span className="text-[10px] text-emerald-400">108 Disbursed</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Pending</span>
          <div className="text-xl font-black text-amber-400 mt-1">₹8,45,000</div>
          <span className="text-[10px] text-amber-400">20 Under Review</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Overtime Paid</span>
          <div className="text-xl font-black text-indigo-400 mt-1">₹3,40,000</div>
          <span className="text-[10px] text-slate-400">682 Total Hours</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Bonuses Paid</span>
          <div className="text-xl font-black text-purple-400 mt-1">₹5,80,000</div>
          <span className="text-[10px] text-slate-400">Quarterly Incentives</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Deductions</span>
          <div className="text-xl font-black text-rose-400 mt-1">₹4,90,000</div>
          <span className="text-[10px] text-slate-400">PF + TDS Remitted</span>
        </div>
      </div>

      {/* Salary Calculator Sandbox (Client Demo Specification) */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-400" />
              Interactive Gross-to-Net Salary Calculator
            </h3>
            <p className="text-xs text-slate-400">
              Modify values below to inspect real-time payroll breakdown for Rahul Bajediyal (EMP001)
            </p>
          </div>
          <button
            onClick={() => {
              setBasic(40000);
              setHra(10000);
              setBonus(5000);
              setOvertime(3000);
              setPf(2400);
              setTax(1500);
              setOtherDeductions(500);
              showToast('Reset to default profile numbers', 'info');
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            Reset to Default
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Earnings side */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Earnings Components
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <label className="flex justify-between text-slate-400 mb-1">
                  <span>Basic Salary</span>
                  <span className="font-bold text-white">₹{basic.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="20000"
                  max="100000"
                  step="1000"
                  value={basic}
                  onChange={(e) => setBasic(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-400 mb-1">
                  <span>House Rent Allowance (HRA)</span>
                  <span className="font-bold text-white">₹{hra.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="40000"
                  step="500"
                  value={hra}
                  onChange={(e) => setHra(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-400 mb-1">
                  <span>Performance Bonus</span>
                  <span className="font-bold text-emerald-400">₹{bonus.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="25000"
                  step="500"
                  value={bonus}
                  onChange={(e) => setBonus(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-400 mb-1">
                  <span>Overtime Pay</span>
                  <span className="font-bold text-emerald-400">₹{overtime.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="15000"
                  step="500"
                  value={overtime}
                  onChange={(e) => setOvertime(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex justify-between font-bold text-white text-sm">
                <span>Gross Salary (Earnings)</span>
                <span className="text-indigo-300">₹{grossSalary.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Deductions & Net Salary side */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Deductions & Final Net
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <label className="flex justify-between text-slate-400 mb-1">
                  <span>Provident Fund (PF - 6%)</span>
                  <span className="font-bold text-rose-400">₹{pf.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="200"
                  value={pf}
                  onChange={(e) => setPf(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-400 mb-1">
                  <span>TDS / Income Tax</span>
                  <span className="font-bold text-rose-400">₹{tax.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={tax}
                  onChange={(e) => setTax(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div>
                <label className="flex justify-between text-slate-400 mb-1">
                  <span>Other Deductions (Professional Tax)</span>
                  <span className="font-bold text-rose-400">₹{otherDeductions.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="3000"
                  step="100"
                  value={otherDeductions}
                  onChange={(e) => setOtherDeductions(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 flex justify-between font-bold text-white text-xs">
                <span>Total Deductions</span>
                <span className="text-rose-400">-₹{totalDeductions.toLocaleString('en-IN')}</span>
              </div>

              {/* NET SALARY HIGHLIGHT */}
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-between mt-2">
                <div>
                  <span className="text-xs uppercase font-bold text-emerald-300">Net Salary Payable</span>
                  <p className="text-[10px] text-slate-400">Disbursed to Bank Account</p>
                </div>
                <div className="text-3xl font-black text-emerald-400 font-mono">
                  ₹{netSalary.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Payroll Directory Table */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white">October 2026 Employee Payroll Roster</h3>
            <p className="text-xs text-slate-400">Click any employee row to inspect or print official payslip</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2.5 font-semibold">Employee</th>
                <th className="py-2.5 font-semibold">ID</th>
                <th className="py-2.5 font-semibold">Department</th>
                <th className="py-2.5 font-semibold">Basic</th>
                <th className="py-2.5 font-semibold">Gross</th>
                <th className="py-2.5 font-semibold">Deductions</th>
                <th className="py-2.5 font-semibold">Net Salary</th>
                <th className="py-2.5 font-semibold">Status</th>
                <th className="py-2.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {employees.slice(0, 8).map((emp, idx) => {
                const b = emp.empId === 'EMP001' ? 40000 : Math.round(emp.salary * 0.7);
                const g = emp.empId === 'EMP001' ? 58000 : emp.salary;
                const d = emp.empId === 'EMP001' ? 4400 : Math.round(g * 0.08);
                const n = g - d;
                const isProc = idx !== 6;

                return (
                  <tr key={emp.id} className="hover:bg-slate-800/40">
                    <td className="py-3 font-bold text-white">{emp.fullName}</td>
                    <td className="py-3 font-mono font-bold text-indigo-400">{emp.empId}</td>
                    <td className="py-3 text-slate-300">{emp.departmentName || 'IT'}</td>
                    <td className="py-3 font-mono text-slate-400">₹{b.toLocaleString('en-IN')}</td>
                    <td className="py-3 font-mono text-white font-bold">₹{g.toLocaleString('en-IN')}</td>
                    <td className="py-3 font-mono text-rose-400">-₹{d.toLocaleString('en-IN')}</td>
                    <td className="py-3 font-mono text-emerald-400 font-bold">₹{n.toLocaleString('en-IN')}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isProc
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {isProc ? 'Processed' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => openSlip(emp)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 transition-all"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Payslip</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generated Payslip Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-8 shadow-2xl animate-in zoom-in-95 duration-150 text-slate-100">
            {/* Payslip Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-700">
              <div>
                <h2 className="text-xl font-black text-white">PAVION TECHNOLOGIES PVT LTD</h2>
                <p className="text-xs text-slate-400">Level 5, Embassy TechVillage, Outer Ring Road, Bengaluru 560103</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">GSTIN: 29ABCDE1234F1Z5 • CIN: U72200KA2022PTC158912</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  OCTOBER 2026 PAYSLIP
                </span>
                <p className="text-[10px] text-slate-400 font-mono mt-1">Slip #: PAY-2026-10-001</p>
              </div>
            </div>

            {/* Employee info */}
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-slate-800 text-xs">
              <div>
                <p className="text-slate-400">Employee Name: <strong className="text-white">{activeEmployee.fullName}</strong></p>
                <p className="text-slate-400">Employee ID: <strong className="text-white font-mono">{activeEmployee.empId}</strong></p>
                <p className="text-slate-400">Department: <strong className="text-white">{activeEmployee.departmentName || 'Information Technology'}</strong></p>
                <p className="text-slate-400">Designation: <strong className="text-white">{activeEmployee.designation}</strong></p>
              </div>
              <div>
                <p className="text-slate-400">Bank Account: <strong className="text-white font-mono">•••• •••• •••• 4912 (HDFC Bank)</strong></p>
                <p className="text-slate-400">PF UAN: <strong className="text-white font-mono">100928374619</strong></p>
                <p className="text-slate-400">Working Days: <strong className="text-white">22 Days (21 Present, 1 Leave)</strong></p>
                <p className="text-slate-400">Disbursement Date: <strong className="text-white">31 October 2026</strong></p>
              </div>
            </div>

            {/* Earnings & Deductions columns */}
            <div className="grid grid-cols-2 gap-6 py-4 border-b border-slate-800 text-xs">
              <div>
                <h5 className="font-bold text-indigo-400 uppercase text-[10px] mb-2">Earnings</h5>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span>Basic Salary</span><span>₹{basic.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>House Rent Allowance (HRA)</span><span>₹{hra.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Performance Bonus</span><span>₹{bonus.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Overtime Pay (30 hrs)</span><span>₹{overtime.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                    <span>Gross Earnings</span>
                    <span>₹{grossSalary.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-bold text-rose-400 uppercase text-[10px] mb-2">Deductions</h5>
                <div className="space-y-1.5">
                  <div className="flex justify-between"><span>Provident Fund (PF)</span><span>₹{pf.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>TDS / Income Tax</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between"><span>Professional Tax</span><span>₹{otherDeductions.toLocaleString('en-IN')}</span></div>
                  <div className="flex justify-between font-bold text-white pt-2 border-t border-slate-800">
                    <span>Total Deductions</span>
                    <span>₹{totalDeductions.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Amount Box */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between mt-4">
              <div>
                <span className="text-xs text-slate-300 font-semibold">Net Salary Disbursed</span>
                <p className="text-[10px] text-slate-400">Fifty-Three Thousand Six Hundred Rupees Only</p>
              </div>
              <div className="text-2xl font-black text-emerald-400">₹{netSalary.toLocaleString('en-IN')}</div>
            </div>

            {/* Modal actions */}
            <div className="flex justify-end gap-3 pt-6">
              <button
                onClick={() => setShowSlipModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast(`Downloaded Official Payslip PDF: ${activeEmployee.empId}-Oct2026.pdf`, 'success');
                  setShowSlipModal(false);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
