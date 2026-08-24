'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { 
  Sparkles, 
  Film, 
  RefreshCw, 
  Sliders,
  Download,
  AlertCircle,
  Play
} from 'lucide-react';

const CleanPlayer = dynamic(() => import('../../components/CleanPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black text-slate-500 text-xs font-mono">
      Initializing Player...
    </div>
  ),
});

const POPULAR_STYLES = [
  { code: 'CHRON_STYLE_100', name: '100 Neubrutal — Brutal Pop (High Impact)' },
  { code: 'CHRON_STYLE_98', name: '98 Corrupted Feed — Glitch Protocol' },
  { code: 'CHRON_STYLE_01', name: '1 Editorial Investigation — Dark Noir' },
  { code: 'CHRON_STYLE_02', name: '2 Mission Control — The Stakes Room' },
  { code: 'CHRON_STYLE_55', name: '55 Fold Logic — Origami Dimensional' },
  { code: 'CHRON_STYLE_72', name: '72 Pixel Quest — 8-Bit Retro' },
  { code: 'CHRON_STYLE_90', name: '90 Caliber Watch — Macro Luxury' },
];

function StudioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStyle = searchParams?.get('style') || 'CHRON_STYLE_100';

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);

  const [videoInputUrl, setVideoInputUrl] = useState('');
  const [selectedStyleCode, setSelectedStyleCode] = useState(initialStyle);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<{ email?: string; id?: string } | null>(null);
  const [userHistoryJobs, setUserHistoryJobs] = useState<any[]>([]);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showCompletionNotification, setShowCompletionNotification] = useState(false);

  const subscribeToJobStream = (jobId: string) => {
    // 1. Instant Real-Time Polling Loop (1.5s interval for 100% dependable UI updates)
    const pollInterval = setInterval(async () => {
      try {
        const statusRes = await fetch(`/api/v1/jobs/${jobId}`);
        if (statusRes.ok) {
          const statusData = await statusRes.json();

          if (typeof statusData.progress === 'number') {
            setGenerationProgress(statusData.progress);
          }

          if (statusData.message) {
            setGenerationStage(statusData.message.replace(/^\[Remotion\]\s*/, '🎬 '));
          } else if (statusData.stage) {
            setGenerationStage(statusData.stage);
          }

          const r2Url = statusData.videoUrl_r2 || statusData.videoUrl || statusData.video_url;
          if (statusData.status === 'completed' || (r2Url && r2Url.startsWith('http'))) {
            clearInterval(pollInterval);
            if (r2Url) {
              setRenderedVideoUrl(r2Url);
              setShowCompletionNotification(true);
            }
            setIsGenerating(false);
            setGenerationProgress(100);
            setGenerationStage('✨ Video rendered & uploaded to Cloudflare R2!');

            // Refresh user history list
            if (currentUser?.email) {
              fetch(`/api/v1/console/events?userEmail=${encodeURIComponent(currentUser.email)}`)
                .then((r) => r.json())
                .then((d) => {
                  if (d.jobs) setUserHistoryJobs(d.jobs);
                })
                .catch(() => {});
            }
          } else if (statusData.status === 'failed') {
            clearInterval(pollInterval);
            setGenerationError(statusData.error || 'Rendering job failed');
            setIsGenerating(false);
          }
        }
      } catch (err) {
        console.error('Job status polling error:', err);
      }
    }, 1500);

    // 2. Also attach SSE Stream for immediate chunk events
    try {
      const eventSource = new EventSource(`/api/v1/jobs/${jobId}/stream`);

      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);

          if (payload.log) {
            setGenerationStage(payload.log.replace(/^\[Remotion\]\s*/, '🎬 '));
          } else if (payload.stage) {
            setGenerationStage(payload.stage);
          }

          if (typeof payload.progress === 'number') {
            setGenerationProgress(payload.progress);
          }

          const finalUrl = payload.videoUrl_r2 || payload.videoUrl || payload.video_url || (payload.data && payload.data.videoUrl);
          if (finalUrl) {
            clearInterval(pollInterval);
            setRenderedVideoUrl(finalUrl);
            setShowCompletionNotification(true);
            setIsGenerating(false);
            setGenerationProgress(100);
            setGenerationStage('✨ Video rendered & uploaded to Cloudflare R2!');
            eventSource.close();
          }
        } catch (err) {
          console.error('SSE parse error:', err);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
      };
    } catch (e) {
      console.error('Subscribe stream error:', e);
    }
  };

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace('/login?next=/studio');
      } else {
        setIsAuthenticated(true);
        setCurrentUser({ email: user.email, id: user.id });

        // 1. Fetch live jobs belonging STRICTLY to this authenticated user
        fetch(`/api/v1/console/events?userEmail=${encodeURIComponent(user.email || '')}`)
          .then((res) => res.json())
          .then((data) => {
            const jobs = data.jobs || [];
            setUserHistoryJobs(jobs);

            if (jobs.length > 0) {
              const activeJob = jobs.find((j: any) => j.status === 'processing' || j.status === 'queued');
              const latestCompletedJob = jobs.find((j: any) => j.status === 'completed' && (j.videoUrl_r2 || j.videoUrl));

              if (activeJob) {
                setActiveJobId(activeJob.jobId);
                if (activeJob.videoUrl) setVideoInputUrl(activeJob.videoUrl);
                if (activeJob.styleCode) setSelectedStyleCode(activeJob.styleCode);
                setIsGenerating(true);
                if (activeJob.message) setGenerationStage(activeJob.message.replace(/^\[Remotion\]\s*/, '🎬 '));
                else if (activeJob.stage) setGenerationStage(activeJob.stage);
                if (typeof activeJob.progress === 'number') setGenerationProgress(activeJob.progress);
                subscribeToJobStream(activeJob.jobId);
              } else if (latestCompletedJob) {
                const finalR2 = latestCompletedJob.videoUrl_r2 || latestCompletedJob.videoUrl;
                if (finalR2) {
                  setRenderedVideoUrl(finalR2);
                  if (latestCompletedJob.videoUrl) setVideoInputUrl(latestCompletedJob.videoUrl);
                  if (latestCompletedJob.styleCode) setSelectedStyleCode(latestCompletedJob.styleCode);
                }
              }
            }
          })
          .catch((err) => {
            console.warn('Could not restore user jobs:', err);
          });
      }
    });
  }, [router]);

  const handleGenerateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInputUrl.trim() || isGenerating) return;

    const jobId = `studio_lead_${Date.now()}`;
    setActiveJobId(jobId);
    setIsGenerating(true);
    setGenerationError(null);
    setGenerationProgress(5);
    setGenerationStage('Dispatching to Oracle Cloud Worker...');

    try {
      const res = await fetch('/api/v1/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          videoUrl: videoInputUrl.trim(),
          styleCode: selectedStyleCode,
          stylePrompt: '',
          userEmail: currentUser?.email,
          userId: currentUser?.id,
          webhookUrl: '',
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to dispatch rendering job');
      }

      setGenerationProgress(15);
      setGenerationStage('Job queued on Oracle Worker...');

      subscribeToJobStream(jobId);

    } catch (err: any) {
      setGenerationError(err.message || 'Generation failed');
      setIsGenerating(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0A0B0E] flex items-center justify-center text-xs font-mono text-slate-500">
        Authenticating Studio Session...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-orange-500/30">
      <header className="h-16 border-b border-white/5 bg-[#0D0F15]/95 px-6 flex items-center justify-between backdrop-blur-xl z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <img 
              src="/retake_logo.svg" 
              alt="Retake" 
              className="w-7 h-7 object-contain drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" 
            />
            <span className="font-extrabold text-sm tracking-tight text-white font-mono">RETAKE</span>
          </Link>
          <span className="text-slate-600">/</span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Film className="w-3.5 h-3.5 text-orange-400" />
            <span>Studio</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/console"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141722] hover:bg-[#1C202E] border border-white/10 text-xs font-medium text-slate-300 transition-all"
          >
            <Film className="w-3.5 h-3.5 text-emerald-400" />
            <span>Console</span>
          </Link>
          <Link
            href="/sampler"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141722] hover:bg-[#1C202E] border border-white/10 text-xs font-medium text-slate-300 transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>60 Styles</span>
          </Link>
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-slate-400 hover:text-white transition-all"
          >
            Exit
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        <div className="w-[300px] xs:w-[340px] sm:w-[380px] h-[533px] xs:h-[604px] sm:h-[675px] bg-black rounded-[32px] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden relative flex-shrink-0 flex items-center justify-center">
          {renderedVideoUrl ? (
            <video
              key={renderedVideoUrl}
              src={renderedVideoUrl}
              controls
              autoPlay
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#07080B] text-slate-500 p-6 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                <Film className="w-8 h-8" />
              </div>
              <div className="text-sm font-bold text-white">No Video Loaded</div>
              <div className="text-xs text-slate-400 max-w-[220px]">
                Paste a video URL and pick a style on the right, then click Generate.
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-md bg-[#0D0F15] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>AI Video Generator</span>
            </h1>
            <p className="text-xs text-slate-400">
              Dispatches directly to the Cloud Pipeline & streams to Console.
            </p>
          </div>

          <form onSubmit={handleGenerateVideo} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Video URL
              </label>
              <input
                type="text"
                value={videoInputUrl}
                onChange={(e) => setVideoInputUrl(e.target.value)}
                disabled={isGenerating}
                placeholder="Paste YouTube, Shorts, or MP4 link..."
                className="w-full bg-[#141722] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-all font-mono disabled:opacity-50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Visual Style
              </label>
              <select
                value={selectedStyleCode}
                onChange={(e) => setSelectedStyleCode(e.target.value)}
                disabled={isGenerating}
                className="w-full bg-[#141722] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 transition-all disabled:opacity-50 cursor-pointer"
              >
                {POPULAR_STYLES.map((st) => (
                  <option key={st.code} value={st.code}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            {generationError && (
              <div className="p-3 bg-red-950/40 border border-red-800/40 rounded-xl text-red-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{generationError}</span>
              </div>
            )}

            {isGenerating && (
              <div className="space-y-2.5 bg-[#141722] border border-white/10 rounded-2xl p-4">
                {(() => {
                  const remotionInfo = parseRemotionProgress(generationStage);
                  const displayPercent = remotionInfo?.percent ?? generationProgress;
                  const displayTimeLeft = remotionInfo?.timeRemaining ? `(${remotionInfo.timeRemaining} left)` : '';
                  const label = remotionInfo
                    ? `Rendered ${remotionInfo.frameCurrent} / ${remotionInfo.frameTotal} frames`
                    : generationStage;

                  return (
                    <>
                      <div className="flex justify-between items-center text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-2 truncate max-w-[230px]">
                          <RefreshCw className="w-3.5 h-3.5 text-orange-400 animate-spin flex-shrink-0" />
                          <span className="truncate">{label}</span>
                        </span>
                        <span className="text-orange-400 font-bold font-mono text-[11px] whitespace-nowrap">
                          {displayPercent}% {displayTimeLeft}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#1C202E] rounded-full overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
                          style={{ width: `${displayPercent}%` }}
                        />
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            <button
              type="submit"
              disabled={isGenerating || !videoInputUrl.trim()}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(249,115,22,0.4)] cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Rendering Video...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Full-Screen Video</span>
                </>
              )}
            </button>
          </form>

          {renderedVideoUrl && (
            <div className="pt-4 border-t border-white/5">
              <a
                href={renderedVideoUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Master Video (.mp4)</span>
              </a>
            </div>
          )}

          {/* User Specific Generation History */}
          {userHistoryJobs.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-orange-400" />
                  <span>Your Video History</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {userHistoryJobs.length} video{userHistoryJobs.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scrollbar-thin scrollbar-thumb-white/10">
                {userHistoryJobs.map((job) => {
                  const r2 = job.videoUrl_r2 || job.videoUrl;
                  const isCurrent = r2 && r2 === renderedVideoUrl;
                  const styleInfo = POPULAR_STYLES.find((s) => s.code === job.styleCode);

                  return (
                    <div
                      key={job.jobId}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                        isCurrent
                          ? 'bg-orange-950/20 border-orange-500/40 text-orange-200'
                          : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05]'
                      }`}
                    >
                      <div className="space-y-0.5 max-w-[170px] truncate">
                        <div className="font-bold text-[11px] text-white truncate">
                          {styleInfo?.name || job.styleCode}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {new Date((job.createdAt || 0) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {r2 ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setRenderedVideoUrl(r2)}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" />
                              <span>Play</span>
                            </button>
                            <a
                              href={r2}
                              target="_blank"
                              rel="noreferrer"
                              download
                              className="p-1 rounded-lg bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/60 border border-emerald-800/40 cursor-pointer"
                              title="Download MP4"
                            >
                              <Download className="w-3 h-3" />
                            </a>
                          </>
                        ) : job.status === 'processing' || job.status === 'queued' ? (
                          <span className="px-2 py-0.5 rounded-full bg-orange-950/60 border border-orange-800/40 text-orange-400 text-[10px] font-mono flex items-center gap-1 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                            Rendering
                          </span>
                        ) : (
                          <span className="text-[10px] text-red-400 font-mono">Failed</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Celebratory Video Render Complete Notification Toast */}
      {showCompletionNotification && (
        <div className="fixed top-6 right-6 z-50 bg-[#0F1118] border border-emerald-500/40 rounded-2xl p-4 shadow-2xl shadow-emerald-950/50 flex items-start gap-3 max-w-sm animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="text-xs font-bold text-white flex items-center justify-between">
              <span>🎉 Video Render Complete!</span>
              <button
                onClick={() => setShowCompletionNotification(false)}
                className="text-slate-400 hover:text-white text-xs cursor-pointer ml-2"
              >
                ✕
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              Your master video is ready, uploaded to Cloudflare R2, and active in the player!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function parseRemotionProgress(logText?: string): { frameCurrent?: number; frameTotal?: number; timeRemaining?: string; percent?: number } | null {
  if (!logText) return null;
  const match = logText.match(/Rendered\s+(\d+)\/(\d+)(?:,\s*time\s*remaining:\s*([^)]+))?/i);
  if (!match) return null;
  const current = parseInt(match[1], 10);
  const total = parseInt(match[2], 10);
  const percent = Math.min(100, Math.round((current / total) * 100));
  return {
    frameCurrent: current,
    frameTotal: total,
    percent,
    timeRemaining: match[3]?.trim(),
  };
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#0A0B0E] flex items-center justify-center text-slate-500 text-xs font-mono">Loading Studio...</div>}>
      <StudioContent />
    </Suspense>
  );
}
