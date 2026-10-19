'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../lib/auth-context';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Building2,
  KeyRound,
  Sparkles,
  ArrowRight,
  Info,
  Briefcase,
  Code,
  Users,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface DemoRoleCard {
  id: string;
  role: string;
  name: string;
  designation: string;
  email: string;
  pass: string;
  scope: string;
  badgeColor: string;
  borderColor: string;
  activeBorder: string;
  textColor: string;
  icon: React.ElementType;
}

const DEMO_ROLES: DemoRoleCard[] = [
  {
    id: 'admin',
    role: 'Super Admin',
    name: 'Vikram Malhotra',
    designation: 'Chief Executive Officer',
    email: 'admin@demo.com',
    pass: 'Admin@123',
    scope: 'Central workforce hub, all 15 staff live telemetry, company audit logs & security alerts',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    borderColor: 'border-slate-800 hover:border-indigo-500/50',
    activeBorder: 'border-indigo-500 ring-1 ring-indigo-500 bg-indigo-950/20',
    textColor: 'text-indigo-400',
    icon: ShieldCheck,
  },
  {
    id: 'manager',
    role: 'Manager',
    name: 'Amit Patel',
    designation: 'Engineering Team Lead',
    email: 'manager@demo.com',
    pass: 'Manager@123',
    scope: 'IT department supervision, 4 engineers live status, breaks alert & team leave approvals',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    borderColor: 'border-slate-800 hover:border-amber-500/50',
    activeBorder: 'border-amber-500 ring-1 ring-amber-500 bg-amber-950/20',
    textColor: 'text-amber-400',
    icon: Briefcase,
  },
  {
    id: 'employee',
    role: 'Software Engineer',
    name: 'Rahul Bajediyal',
    designation: 'Senior Software Engineer',
    email: 'employee@demo.com',
    pass: 'Employee@123',
    scope: 'Personal punch clock, lunch/tea breaks, daily sprint tasks & full monthly attendance sheet',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    borderColor: 'border-slate-800 hover:border-cyan-500/50',
    activeBorder: 'border-cyan-500 ring-1 ring-cyan-500 bg-cyan-950/20',
    textColor: 'text-cyan-400',
    icon: Code,
  },
  {
    id: 'hr',
    role: 'HR Lead',
    name: 'Priya Sharma',
    designation: 'People Operations Lead',
    email: 'hr@demo.com',
    pass: 'Hr@123',
    scope: 'Company-wide attendance records, leave approval queue, new employee onboarding & directory',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    borderColor: 'border-slate-800 hover:border-emerald-500/50',
    activeBorder: 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-950/20',
    textColor: 'text-emerald-400',
    icon: Users,
  },
  {
    id: 'finance',
    role: 'Finance Controller',
    name: 'Sunita Menon',
    designation: 'Treasury & Payroll Head',
    email: 'finance@demo.com',
    pass: 'Finance@123',
    scope: 'Monthly payroll batch disbursal, salary slips calculation, EPF/TDS and tax compliance',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    borderColor: 'border-slate-800 hover:border-purple-500/50',
    activeBorder: 'border-purple-500 ring-1 ring-purple-500 bg-purple-950/20',
    textColor: 'text-purple-400',
    icon: CreditCard,
  },
  {
    id: 'trader',
    role: 'Senior Trader',
    name: 'Rohan Gupta',
    designation: 'Proprietary Desk Trader',
    email: 'trader@demo.com',
    pass: 'Trader@123',
    scope: 'High-frequency trading terminal, live order book, intraday P&L and risk exposure limits',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    borderColor: 'border-slate-800 hover:border-rose-500/50',
    activeBorder: 'border-rose-500 ring-1 ring-rose-500 bg-rose-950/20',
    textColor: 'text-rose-400',
    icon: TrendingUp,
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [selectedRoleId, setSelectedRoleId] = useState<string>('admin');
  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [directLoadingRole, setDirectLoadingRole] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      router.push('/dashboard');
    }, 350);
  };

  const handleSelectRole = (card: DemoRoleCard) => {
    setSelectedRoleId(card.id);
    setEmail(card.email);
    setPassword(card.pass);
  };

  const handleDirectLogin = (card: DemoRoleCard) => {
    setSelectedRoleId(card.id);
    setEmail(card.email);
    setPassword(card.pass);
    setDirectLoadingRole(card.id);
    setTimeout(() => {
      login(card.email, card.pass);
      setDirectLoadingRole(null);
      router.push('/dashboard');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-8 md:py-12 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 space-y-8">
        {/* Top Company Brand Header */}
        <div className="text-center flex flex-col items-center">
          <div className="bg-white px-6 py-2.5 rounded-2xl shadow-xl shadow-indigo-950/60 border border-slate-700/40 mb-3 inline-flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Pavion Technologies Pvt. Ltd."
              className="h-9 md:h-11 w-auto object-contain"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
            Workforce Telemetry & Enterprise Management Platform
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl">
            Sign in with your corporate credentials or select any role below for 1-click password auto-fill & direct dashboard access.
          </p>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Credentials Sign-In Form (5 cols) */}
          <div className="lg:col-span-5 enterprise-card rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl border border-slate-800 bg-slate-900/90 relative">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Authentication Gateway</span>
              </div>
              <h2 className="text-xl font-black text-white">Sign In to Dashboard</h2>
              <p className="text-xs text-slate-400 mt-1">
                Role-based access control with granular permissions
              </p>
            </div>

            {/* Currently Active / Auto-filled Role Pill */}
            {selectedRoleId && (
              <div className="mb-5 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Auto-filled Role:</span>
                  <span className="font-bold text-white">
                    {DEMO_ROLES.find((r) => r.id === selectedRoleId)?.role}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ready
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-mono text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Remember this device</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-indigo-400 hover:text-indigo-300 font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {/* Enterprise Security Pill */}
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-start gap-2.5">
                <KeyRound className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
                <div className="text-[11px] text-indigo-200/90 leading-tight">
                  <span className="font-semibold text-indigo-300">ISO 27001 Protocol:</span>{' '}
                  Single-sign-on enabled. Credentials pre-configured for client presentation testing.
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent animate-spin rounded-full" />
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: 6-Role Auto-Fill Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>1-Click Auto-Fill Role Profiles</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Click any role card below to instantly auto-fill credentials or launch their dedicated dashboard:
                </p>
              </div>
            </div>

            {/* 6 Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {DEMO_ROLES.map((card) => {
                const Icon = card.icon;
                const isSelected = selectedRoleId === card.id;
                const isDirectLoading = directLoadingRole === card.id;

                return (
                  <div
                    key={card.id}
                    onClick={() => handleSelectRole(card)}
                    className={`p-4 rounded-2xl bg-slate-900/80 border transition-all cursor-pointer relative group flex flex-col justify-between ${
                      isSelected ? card.activeBorder : card.borderColor
                    }`}
                  >
                    <div>
                      {/* Card Header: Role Badge + Icon */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${card.badgeColor}`}
                        >
                          {card.role}
                        </span>
                        <div className={`p-1.5 rounded-lg bg-slate-800/80 ${card.textColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* User Info */}
                      <div className="mb-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {card.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">{card.designation}</p>
                      </div>

                      {/* Scope Summary */}
                      <p className="text-[11px] text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                        {card.scope}
                      </p>
                    </div>

                    {/* Credentials Preview + Actions */}
                    <div className="pt-2.5 border-t border-slate-800/80 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2 py-1 rounded-lg">
                        <span className="truncate">{card.email}</span>
                        <span className="text-slate-500 font-bold ml-2">●●●●●●●●</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRole(card);
                          }}
                          className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all ${
                            isSelected
                              ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                              : 'bg-slate-800 hover:bg-slate-700/80 text-slate-300 border-slate-700'
                          }`}
                        >
                          {isSelected ? '✓ Auto-Filled' : 'Auto-Fill'}
                        </button>
                        <button
                          type="button"
                          disabled={isDirectLoading}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDirectLogin(card);
                          }}
                          className="py-1.5 px-2 rounded-lg text-[11px] font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-1 transition-all shadow-sm"
                        >
                          {isDirectLoading ? (
                            <div className="h-3 w-3 border-2 border-white border-t-transparent animate-spin rounded-full" />
                          ) : (
                            <>
                              <span>Login</span>
                              <ArrowRight className="w-3 h-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center pt-4 text-xs text-slate-500 flex items-center justify-center gap-4 flex-wrap">
          <span>PAVION Technologies Pvt Ltd</span>
          <span>•</span>
          <span>ISO 27001 Certified</span>
          <span>•</span>
          <span>Role-Based Enterprise Access</span>
          <span>•</span>
          <span>Bengaluru, India</span>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-white mb-2">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter your corporate email address to receive secure OTP reset instructions.
            </p>
            {forgotSubmitted ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs rounded-xl mb-4">
                ✓ Password reset token dispatched to {forgotEmail}. Please inspect corporate mailbox.
              </div>
            ) : (
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white mb-4 focus:outline-none focus:border-indigo-500"
              />
            )}
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForgotModal(false);
                  setForgotSubmitted(false);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                Close
              </button>
              {!forgotSubmitted && (
                <button
                  type="button"
                  onClick={() => setForgotSubmitted(true)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Send OTP
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
