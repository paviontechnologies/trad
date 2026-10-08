'use client';

import React, { useState } from 'react';
import { useAuth } from '../../../lib/auth-context';
import {
  CandlestickChart,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  X,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function TradingPage() {
  const { trades, requestTrade, approveTrade, rejectTrade, role, showToast } = useAuth();

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [formData, setFormData] = useState({
    symbol: 'NIFTY 24500 CE',
    type: 'BUY' as 'BUY' | 'SELL',
    quantity: 250,
    price: 155.0,
  });

  const pnlTrend = [
    { day: 'Mon', pnl: 42000 },
    { day: 'Tue', pnl: 29500 },
    { day: 'Wed', pnl: 97900 },
    { day: 'Thu', pnl: 153100 },
    { day: 'Fri', pnl: 245800 },
  ];

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestTrade(formData.symbol, formData.type, formData.quantity, formData.price);
    setShowOrderModal(false);
  };

  const pendingTrades = trades.filter((t) => t.status === 'PENDING');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            Institutional Trading & Risk Terminal
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Mock Simulated Engine
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulated derivatives order book, net P&L metrics, and multi-tier manager risk authorization workflow.
          </p>
        </div>

        <button
          onClick={() => setShowOrderModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Trade Order</span>
        </button>
      </div>

      {/* Top 5 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Trades</span>
          <div className="text-2xl font-black text-white mt-1">184</div>
          <span className="text-[10px] text-slate-400">14 orders today</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/20 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Winning Trades</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">132 (71.7%)</div>
          <span className="text-[10px] text-emerald-400">Positive expectancy</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-rose-500/20 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Losing Trades</span>
          <div className="text-2xl font-black text-rose-400 mt-1">52 (28.3%)</div>
          <span className="text-[10px] text-rose-400">Within risk limits</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Net Cumulative P&L</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">+₹2,45,800</div>
          <span className="text-[10px] text-emerald-400">↑ Today: +₹34,500</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/20 shadow-xl col-span-2 md:col-span-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Risk Exposure Cap</span>
          <div className="text-2xl font-black text-amber-400 mt-1">₹4,10,000</div>
          <span className="text-[10px] text-slate-400">Utilization: 68.3%</span>
        </div>
      </div>

      {/* Cumulative P&L Growth Chart */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Cumulative Trading Book P&L Trajectory
            </h3>
            <p className="text-xs text-slate-400">Weekly net profits generated across proprietary accounts</p>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
            Net: +₹2,45,800 INR
          </span>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pnlTrend}>
              <defs>
                <linearGradient id="pnlColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                formatter={(val: any) => [`₹${val.toLocaleString('en-IN')}`, 'Net P&L']}
              />
              <Area type="monotone" dataKey="pnl" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#pnlColor)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trades Table with Approval Workflow */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <CandlestickChart className="w-4 h-4 text-indigo-400" />
              Trade Order Book & Manager Approval Queue
            </h3>
            <p className="text-xs text-slate-400">
              {pendingTrades.length > 0 ? (
                <span className="text-amber-400 font-semibold">
                  ⚠ {pendingTrades.length} pending trade order(s) awaiting Risk Manager sign-off
                </span>
              ) : (
                'All trades executed and settled'
              )}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-4 font-semibold">Trade ID</th>
                <th className="py-3 px-4 font-semibold">Trader</th>
                <th className="py-3 px-4 font-semibold">Symbol</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Entry Price</th>
                <th className="py-3 px-4 font-semibold">Exit Price</th>
                <th className="py-3 px-4 font-semibold">P&L</th>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold text-right">Approval Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {trades.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-mono font-bold text-indigo-400">{t.tradeCode}</td>
                  <td className="py-3 px-4 font-bold text-white">{t.traderName}</td>
                  <td className="py-3 px-4 font-semibold text-slate-200">{t.symbol}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        t.type === 'BUY'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-rose-500/20 text-rose-400'
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{t.quantity}</td>
                  <td className="py-3 px-4 font-mono text-slate-300">₹{t.entryPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">
                    {t.exitPrice ? `₹${t.exitPrice.toLocaleString('en-IN')}` : '-'}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold">
                    {t.pnl !== 0 ? (
                      <span className={t.pnl > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {t.pnl > 0 ? `+₹${t.pnl.toLocaleString('en-IN')}` : `-₹${Math.abs(t.pnl).toLocaleString('en-IN')}`}
                      </span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-400">{t.timestamp}</td>
                  <td className="py-3 px-4 text-right">
                    {t.status === 'PENDING' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => approveTrade(t.id)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectTrade(t.id)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-rose-600/80 hover:bg-rose-600 text-white"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          t.status === 'APPROVED'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {t.status === 'APPROVED' ? '✓ Executed' : '✕ Rejected'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Trade Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h3 className="text-base font-bold text-white">Execute Institutional Trade</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Trading Asset / Symbol</label>
                <select
                  value={formData.symbol}
                  onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                >
                  <option value="NIFTY 24500 CE">NIFTY 24500 CE (Index Option)</option>
                  <option value="BANKNIFTY 52000 PE">BANKNIFTY 52000 PE</option>
                  <option value="RELIANCE">RELIANCE (NSE Equity)</option>
                  <option value="TCS">TCS (NSE Equity)</option>
                  <option value="INFY">INFY (NSE Equity)</option>
                  <option value="HDFCBANK">HDFCBANK (NSE Equity)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Order Direction</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'BUY' })}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      formData.type === 'BUY'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    BUY (Long)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'SELL' })}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      formData.type === 'SELL'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    SELL (Short)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Quantity</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    step="0.05"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between text-xs">
                <span className="text-slate-400">Total Order Value:</span>
                <span className="font-bold text-white font-mono">
                  ₹{(formData.quantity * formData.price).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                >
                  Submit Order for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
