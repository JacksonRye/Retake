'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Check,
  RefreshCw
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMockLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('/studio');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-orange-500/30 flex flex-col justify-between p-6">
      {/* 1. Top Brand Header */}
      <div className="flex justify-center pt-2">
        <Link href="/" className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#131620]/80 border border-white/10 backdrop-blur-md shadow-sm">
          <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
            R
          </div>
          <span className="font-extrabold text-sm tracking-tight text-white">RETAKE</span>
        </Link>
      </div>

      {/* 2. Centered Login Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Sign in to manage your AI video renders
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleMockLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@example.com"
                  className="w-full bg-[#0E1017] border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <a href="#" className="text-[11px] text-orange-400 hover:underline">
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#0E1017] border border-white/10 rounded-2xl pl-10 pr-10 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-200 disabled:opacity-50 text-black text-xs font-bold transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="text-center pt-2">
            <span className="text-xs text-slate-400">Don&apos;t have an account? </span>
            <Link href="/signup" className="text-xs font-bold text-white hover:text-orange-400 transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Minimal Footer */}
      <footer className="text-center text-[11px] text-slate-600 pb-2">
        Protected by 256-bit SSL encryption. All rights reserved.
      </footer>
    </div>
  );
}
