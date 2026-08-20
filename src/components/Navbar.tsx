'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  ArrowRight, 
  Sparkles, 
  Video, 
  Terminal, 
  LogOut, 
  User, 
  PlusCircle,
  Sliders
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        setCredits(data.user.user_metadata?.credits ?? 1);
      }
    }
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setCredits(session.user.user_metadata?.credits ?? 1);
      } else {
        setUser(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl bg-[#131620]/90 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.6)] flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <img 
            src="/retake_logo.svg" 
            alt="Retake" 
            className="w-7 h-7 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
          />
          <span className="font-extrabold text-sm tracking-tight text-white font-mono">RETAKE</span>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
          <Link 
            href="/#how-it-works" 
            className="hover:text-white transition-colors"
          >
            How It Works
          </Link>
          <Link 
            href="/#examples" 
            className="hover:text-white transition-colors"
          >
            Examples
          </Link>
          <Link 
            href="/#pricing" 
            className="hover:text-white transition-colors"
          >
            Pricing
          </Link>
          {user && (
            <>
              <Link 
                href="/wizard" 
                className={`transition-colors flex items-center gap-1.5 ${
                  pathname === '/wizard' ? 'text-orange-400 font-bold' : 'hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Create Video</span>
              </Link>
              <Link 
                href="/studio" 
                className={`transition-colors flex items-center gap-1.5 ${
                  pathname === '/studio' ? 'text-orange-400 font-bold' : 'hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Studio</span>
              </Link>
              <Link 
                href="/console" 
                className={`transition-colors flex items-center gap-1.5 ${
                  pathname === '/console' ? 'text-orange-400 font-bold' : 'hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console</span>
              </Link>
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            /* Logged In State */
            <div className="flex items-center gap-2.5">
              {/* Credit Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-950/50 border border-orange-700/40 text-xs font-semibold text-orange-300">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>{credits} {credits === 1 ? 'Credit' : 'Credits'}</span>
              </div>

              {/* + Create Video Primary Action */}
              <Link
                href="/wizard"
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create Video</span>
              </Link>

              {/* User Avatar & Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-[#1C202E] border border-white/10 hover:border-white/20 text-slate-300 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                >
                  {user.email ? user.email[0].toUpperCase() : <User className="w-3.5 h-3.5" />}
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#12141C] border border-white/10 shadow-2xl py-2 z-50 text-xs font-medium text-slate-300">
                    <div className="px-3.5 py-2 border-b border-white/5 text-[11px] text-slate-500 truncate">
                      {user.email}
                    </div>
                    <Link
                      href="/wizard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 text-orange-300 hover:bg-white/5 transition-colors font-semibold"
                    >
                      <PlusCircle className="w-3.5 h-3.5 text-orange-400" />
                      <span>+ Create Video</span>
                    </Link>
                    <Link
                      href="/studio"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Video className="w-3.5 h-3.5 text-slate-400" />
                      <span>Video Studio</span>
                    </Link>
                    <Link
                      href="/console"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Terminal className="w-3.5 h-3.5 text-purple-400" />
                      <span>Mission Control</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3.5 py-2 text-red-400 hover:bg-red-500/10 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Logged Out State */
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-white hover:bg-slate-200 text-black text-xs font-bold px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Get 20 Videos ($49)</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
