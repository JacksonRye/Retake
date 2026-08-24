'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Sliders,
  ChevronDown
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import WaitlistModal from '@/components/WaitlistModal';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [credits, setCredits] = useState<number>(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function checkAuth() {
      // 1. Instant local session lookup
      const { data: sessionData } = await supabase.auth.getSession();
      if (isMounted && sessionData?.session?.user) {
        setUser(sessionData.session.user);
        setCredits(sessionData.session.user.user_metadata?.credits ?? 1);
      }

      // 2. Secure server verification
      const { data: userData } = await supabase.auth.getUser();
      if (isMounted) {
        if (userData?.user) {
          setUser(userData.user);
          setCredits(userData.user.user_metadata?.credits ?? 1);
        } else if (!sessionData?.session?.user) {
          setUser(null);
        }
      }
    }
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        if (session?.user) {
          setUser(session.user);
          setCredits(session.user.user_metadata?.credits ?? 1);
        } else {
          setUser(null);
        }
      }
    });

    return () => {
      isMounted = false;
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
          <Link 
            href="/sampler" 
            className="hover:text-white transition-colors"
          >
            Styles
          </Link>
          {user && (
            <>
              <Link 
                href="/studio" 
                className={`transition-colors flex items-center gap-1.5 ${
                  pathname === '/studio' ? 'text-orange-400 font-bold' : 'hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Studio</span>
              </Link>
              {user.email?.toLowerCase() === 'chijiokejackson35@gmail.com' && (
                <Link 
                  href="/console" 
                  className={`transition-colors flex items-center gap-1.5 ${
                    pathname === '/console' ? 'text-orange-400 font-bold' : 'hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Console</span>
                </Link>
              )}
            </>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            /* Logged In State */
            <div className="flex items-center gap-2.5">
              {/* Credit Badge */}
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-950/50 hover:bg-orange-900/60 border border-orange-700/40 text-xs font-semibold text-orange-300 transition-all cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span>{credits !== null ? `${credits} Credits` : '...'}</span>
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 text-black font-bold text-xs flex items-center justify-center shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-[#12141C] border border-white/10 rounded-2xl shadow-2xl py-1.5 text-xs text-slate-300 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3.5 py-2 border-b border-white/5">
                      <div className="text-white font-medium truncate">{user.email}</div>
                      <div className="text-orange-400 text-[11px] font-semibold mt-0.5">{credits ?? 0} Credits Available</div>
                    </div>
                    <Link
                      href="/studio"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Video className="w-3.5 h-3.5 text-slate-400" />
                      <span>Studio</span>
                    </Link>
                    <Link
                      href="/sampler"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center gap-2 px-3.5 py-2 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                      <span>Styles Library</span>
                    </Link>
                    {user.email?.toLowerCase() === 'chijiokejackson35@gmail.com' && (
                      <Link
                        href="/console"
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-3.5 py-2 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <Terminal className="w-3.5 h-3.5 text-purple-400" />
                        <span>Mission Control</span>
                      </Link>
                    )}
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

      {/* Priority Commercial Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        userEmail={user?.email || ''}
      />
    </div>
  );
}
