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
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('admin@demo.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, password);
      setIsLoading(false);
      if (email.toLowerCase().includes('employee')) {
        router.push('/my-portal');
      } else {
        router.push('/dashboard');
      }
    }, 400);
  };

  const handleQuickFill = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background radial ambient lights */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-[128px] pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md relative z-10">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-400 shadow-xl shadow-indigo-500/25 border border-indigo-400/30 mb-4">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">PAVION</h1>
          <p className="text-sm text-slate-400 mt-1">
            Workforce Monitoring & Business Management Platform
          </p>
        </div>

        {/* Login box */}
        <div className="enterprise-card rounded-2xl p-8 shadow-2xl backdrop-blur-xl border border-slate-800 bg-slate-900/90">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">Sign In to Enterprise Portal</h2>
            <p className="text-xs text-slate-400 mt-1">
              Centralized access for administration, HR, payroll & security auditing
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Email Address or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@demo.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
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

            {/* 2FA UI notice for Phase 2 specification */}
            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 flex items-start gap-2.5">
              <KeyRound className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
              <div className="text-[11px] text-indigo-200/90 leading-tight">
                <span className="font-semibold text-indigo-300">Enterprise 2FA Protocol:</span>{' '}
                Hardware key & TOTP verification enabled. Automated bypass active for MVP demo presentation.
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
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

          {/* Quick Demo Credentials for presentation */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>1-Click Demo Accounts (Client Presentation):</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickFill('admin@demo.com', 'Admin@123')}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all text-slate-200 flex flex-col"
              >
                <span className="font-bold text-indigo-400">Super Admin</span>
                <span className="text-[10px] text-slate-400">admin@demo.com</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('hr@demo.com', 'Hr@123')}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all text-slate-200 flex flex-col"
              >
                <span className="font-bold text-emerald-400">HR Specialist</span>
                <span className="text-[10px] text-slate-400">hr@demo.com</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('manager@demo.com', 'Manager@123')}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all text-slate-200 flex flex-col"
              >
                <span className="font-bold text-amber-400">Team Manager</span>
                <span className="text-[10px] text-slate-400">manager@demo.com</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('employee@demo.com', 'Employee@123')}
                className="py-1.5 px-2.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-all text-slate-200 flex flex-col"
              >
                <span className="font-bold text-cyan-400">Employee (Rahul)</span>
                <span className="text-[10px] text-slate-400">employee@demo.com</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-6 text-xs text-slate-500">
          PAVION Technologies Pvt Ltd • ISO 27001 & SOC 2 Compliant
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
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
