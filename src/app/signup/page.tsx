'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  Check, 
  RefreshCw, 
  AlertCircle 
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const redirectUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://retake.cloud'}/auth/callback?next=/wizard`;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: name,
            credits: 1, // 1 Free Test Credit granted on registration
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        setSuccessMessage('✓ Account created! 1 Free Test Video Credit added.');

        // Dispatch instant Telegram signup alert
        fetch('/api/webhooks/supabase-signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            record: {
              id: data.user.id,
              email: data.user.email,
              name: name,
              created_at: new Date().toISOString(),
              raw_user_meta_data: { full_name: name, email: data.user.email },
              app_metadata: { provider: 'email' }
            }
          })
        }).catch(() => {});

        setTimeout(() => {
          router.push('/wizard');
        }, 1000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-orange-500/30 flex flex-col justify-between p-6">
      {/* 1. Top Brand Header */}
      <div className="flex justify-center pt-2">
        <Link href="/" className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#131620]/80 border border-white/10 backdrop-blur-md shadow-sm">
          <img 
            src="/retake_logo.svg" 
            alt="Retake" 
            className="w-6 h-6 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
          />
          <span className="font-extrabold text-sm tracking-tight text-white">RETAKE</span>
        </Link>
      </div>

      {/* 2. Centered Signup Card */}
      <div className="max-w-md w-full mx-auto my-auto py-8">
        <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] space-y-6">
          <div className="text-center space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create your account
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Test 1 video for <strong className="text-orange-400 font-semibold">FREE</strong> right now
            </p>
          </div>

          {/* Error / Success Notifications */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-800/40 text-red-300 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-800/40 text-emerald-300 text-xs flex items-center gap-2.5">
              <Check className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Email/Password Signup Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Your Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Creator"
                  className="w-full bg-[#0E1017] border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all"
                />
              </div>
            </div>

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
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a secure password (6+ chars)"
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

            {/* Free Test Bonus Included */}
            <div className="p-3.5 rounded-2xl bg-orange-950/30 border border-orange-700/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-orange-200 font-medium">Free Test Plan Included</span>
              </div>
              <span className="font-bold text-orange-400 font-mono">1 Free Credit ($0)</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-white hover:bg-slate-200 disabled:opacity-50 text-black text-xs font-bold transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Creating your account...</span>
                </>
              ) : (
                <>
                  <span>Create Account & Get Free Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Bottom Switcher */}
          <div className="text-center pt-2">
            <span className="text-xs text-slate-400">Already have an account? </span>
            <Link href="/login" className="text-xs font-bold text-white hover:text-orange-400 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Minimal Footer */}
      <footer className="text-center text-[11px] text-slate-600 pb-2">
        By creating an account, you agree to our Terms and Privacy Policy.
      </footer>
    </div>
  );
}
