'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Sparkles, CheckCircle2, ExternalLink, X, Video, Download } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface CompletedJobNotification {
  id: string;
  jobId: string;
  styleCode: string;
  videoUrl_r2?: string | null;
  timestamp: number;
}

const NotificationContext = createContext<{
  notifications: CompletedJobNotification[];
  dismiss: (id: string) => void;
}>({
  notifications: [],
  dismiss: () => {},
});

export const useNotifications = () => useContext(NotificationContext);

// Synthetic Web Audio Chime (no external asset dependency)
function playCompletionChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    const now = ctx.currentTime;

    // Note 1: E5 (659.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now);
    gain1.gain.setValueAtTime(0.12, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Note 2: B5 (987.77 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(987.77, now + 0.12);
    gain2.gain.setValueAtTime(0.15, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.55);
  } catch (e) {
    // AudioContext blocked by browser autoplay policy if no prior gesture
  }
}

export default function GlobalNotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<CompletedJobNotification[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const knownCompletedRef = useRef<Set<string>>(new Set());
  const isSeededRef = useRef<boolean>(false);

  // Initialize known completed IDs from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('retake_known_completed_jobs');
      if (stored) {
        const arr = JSON.parse(stored);
        arr.forEach((id: string) => knownCompletedRef.current.add(id));
      }
    } catch (e) {
      // ignore
    }

    // Request browser notification permission if available
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch(() => {});
    }
  }, []);

  // Track Supabase Auth state: ONLY enable notifications for authenticated users
  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user?.email) {
        setCurrentUserEmail(user.email);
      } else {
        setCurrentUserEmail(null);
        setNotifications([]); // Clear any toasts if logged out
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setCurrentUserEmail(session.user.email);
      } else {
        setCurrentUserEmail(null);
        setNotifications([]);
        isSeededRef.current = false;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const addNotification = (job: { jobId: string; styleCode?: string; videoUrl_r2?: string | null }) => {
    if (knownCompletedRef.current.has(job.jobId)) return;
    
    knownCompletedRef.current.add(job.jobId);
    try {
      sessionStorage.setItem(
        'retake_known_completed_jobs',
        JSON.stringify(Array.from(knownCompletedRef.current))
      );
    } catch (e) {}

    playCompletionChime();

    // Browser Native Notification
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('🎉 Video Render Completed!', {
          body: `Job ${job.jobId} (${job.styleCode || 'Master Edit'}) is ready to watch or open in Studio!`,
          icon: '/retake_logo.svg',
        });
      } catch (e) {}
    }

    const newNotif: CompletedJobNotification = {
      id: `${job.jobId}_${Date.now()}`,
      jobId: job.jobId,
      styleCode: job.styleCode || 'CHRON_STYLE_100',
      videoUrl_r2: job.videoUrl_r2,
      timestamp: Date.now(),
    };

    setNotifications((prev) => [newNotif, ...prev.slice(0, 4)]);
  };

  const dismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Poll for background events ONLY when an authenticated user is active
  useEffect(() => {
    if (!currentUserEmail) {
      return;
    }

    let isMounted = true;

    const checkJobCompletions = async () => {
      if (!currentUserEmail) return;

      try {
        const res = await fetch(
          `/api/v1/console/events?userEmail=${encodeURIComponent(currentUserEmail)}&limit=15`,
          { cache: 'no-store' }
        );
        if (res.ok && isMounted) {
          const data = await res.json();
          const jobs = data.jobs || [];

          // On first fetch after login/mount, seed existing completed jobs so we don't spam old history
          if (!isSeededRef.current) {
            jobs.forEach((j: any) => {
              if (j.status === 'completed') {
                knownCompletedRef.current.add(j.jobId);
              }
            });
            try {
              sessionStorage.setItem(
                'retake_known_completed_jobs',
                JSON.stringify(Array.from(knownCompletedRef.current))
              );
            } catch (e) {}
            isSeededRef.current = true;
            return;
          }

          // On subsequent polls, ONLY trigger toasts for newly finished jobs belonging to this user
          jobs.forEach((j: any) => {
            const isUserJob = !j.userEmail || j.userEmail.toLowerCase() === currentUserEmail.toLowerCase();
            if (isUserJob && j.status === 'completed' && !knownCompletedRef.current.has(j.jobId)) {
              addNotification(j);
            }
          });
        }
      } catch (e) {
        // ignore network error
      }
    };

    // Initial seed check
    const initialTimer = setTimeout(checkJobCompletions, 800);
    const interval = setInterval(checkJobCompletions, 3500);

    return () => {
      isMounted = false;
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [currentUserEmail]);

  return (
    <NotificationContext.Provider value={{ notifications, dismiss }}>
      {children}

      {/* Global Floating Toast Stack (Top-Right) */}
      <div className="fixed top-20 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="pointer-events-auto p-4 rounded-2xl bg-[#12141C]/95 backdrop-blur-xl border border-emerald-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-white space-y-2.5 animate-in slide-in-from-top-4 duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-xs text-white">Video Render Complete!</span>
              </div>
              <button
                onClick={() => dismiss(notif.id)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Details */}
            <p className="text-[11px] text-slate-300 font-mono leading-relaxed">
              Job <span className="text-orange-400 font-bold">{notif.jobId}</span> with style{' '}
              <span className="text-white font-semibold">{notif.styleCode}</span> is fully rendered and ready!
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              {notif.videoUrl_r2 ? (
                <a
                  href={notif.videoUrl_r2}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-[11px] font-bold text-center flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <Download className="w-3 h-3" />
                  <span>Download MP4</span>
                </a>
              ) : null}
              <Link
                href={`/studio?style=${notif.styleCode}`}
                onClick={() => dismiss(notif.id)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[#1D212E] hover:bg-[#282E3E] border border-white/10 text-white text-[11px] font-semibold text-center flex items-center justify-center gap-1 transition-all"
              >
                <Video className="w-3 h-3 text-orange-400" />
                <span>Open in Studio</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}
