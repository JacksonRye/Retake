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
  AlertCircle
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
  const [generationProgress, setGenerationProgress] = useState(0);

  const subscribeToJobStream = (jobId: string) => {
    try {
      const eventSource = new EventSource(`/api/v1/jobs/${jobId}/stream`);

      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);

          if (payload.stage) {
            setGenerationStage(payload.stage);
          }
          if (typeof payload.progress === 'number') {
            setGenerationProgress(payload.progress);
          }

          const finalUrl = payload.videoUrl || payload.video_url || (payload.data && payload.data.videoUrl);
          if (finalUrl) {
            setRenderedVideoUrl(finalUrl);
            localStorage.setItem('retake_rendered_video', finalUrl);
            setIsGenerating(false);
            setGenerationProgress(100);
            setGenerationStage('✨ Video rendered & uploaded to R2!');
            eventSource.close();
          } else if (payload.stage === 'finished' || payload.status === 'completed') {
            setGenerationProgress(100);
            setIsGenerating(false);
            eventSource.close();
          } else if (payload.status === 'failed' || payload.stage === 'error') {
            setGenerationError(payload.error || 'Rendering job failed');
            setIsGenerating(false);
            eventSource.close();
          }
        } catch (err) {
          console.error('SSE parse error:', err);
        }
      };

      eventSource.onerror = () => {
        const pollInterval = setInterval(async () => {
          try {
            const statusRes = await fetch(`/api/v1/jobs/${jobId}`);
            const statusData = await statusRes.json();
            if (statusData.progress) setGenerationProgress(statusData.progress);
            if (statusData.stage) setGenerationStage(statusData.stage);
            
            const r2Url = statusData.videoUrl || statusData.video_url || (statusData.data && statusData.data.videoUrl);
            if (r2Url || statusData.status === 'completed' || statusData.stage === 'finished') {
              clearInterval(pollInterval);
              if (r2Url) {
                setRenderedVideoUrl(r2Url);
                localStorage.setItem('retake_rendered_video', r2Url);
              }
              setIsGenerating(false);
              setGenerationProgress(100);
            }
          } catch {
            // ignore
          }
        }, 3000);
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
      }
    });

    // 1. Restore persistent rendered video across refresh
    try {
      const savedVideo = localStorage.getItem('retake_rendered_video');
      if (savedVideo) {
        setRenderedVideoUrl(savedVideo);
      }

      // 2. Check for active background render job across refresh
      const savedJobRaw = localStorage.getItem('retake_last_job');
      if (savedJobRaw) {
        const savedJob = JSON.parse(savedJobRaw);
        if (savedJob && savedJob.jobId) {
          setActiveJobId(savedJob.jobId);
          if (savedJob.videoUrl) setVideoInputUrl(savedJob.videoUrl);
          if (savedJob.styleCode) setSelectedStyleCode(savedJob.styleCode);

          fetch(`/api/v1/jobs/${savedJob.jobId}`)
            .then((r) => r.json())
            .then((statusData) => {
              const r2 = statusData.videoUrl || statusData.video_url;
              if (statusData.status === 'completed' && r2) {
                setRenderedVideoUrl(r2);
                localStorage.setItem('retake_rendered_video', r2);
              } else if (statusData.status === 'processing' || statusData.status === 'queued') {
                setIsGenerating(true);
                if (statusData.stage) setGenerationStage(statusData.stage);
                if (statusData.progress) setGenerationProgress(statusData.progress);
                subscribeToJobStream(savedJob.jobId);
              }
            })
            .catch(() => {});
        }
      }
    } catch (err) {
      console.error('Persistent state restoration error:', err);
    }
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

    // Save job state to localStorage immediately for background persistence
    try {
      localStorage.setItem('retake_last_job', JSON.stringify({
        jobId,
        videoUrl: videoInputUrl.trim(),
        styleCode: selectedStyleCode,
        createdAt: Date.now(),
      }));
    } catch (e) {}

    try {
      const res = await fetch('/api/v1/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId,
          videoUrl: videoInputUrl.trim(),
          styleCode: selectedStyleCode,
          stylePrompt: '',
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
              src={renderedVideoUrl}
              controls
              autoPlay
              loop
              playsInline
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
                <div className="flex justify-between items-center text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-orange-400 animate-spin" />
                    <span>{generationStage}</span>
                  </span>
                  <span className="text-orange-400 font-bold">{generationProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1C202E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 rounded-full"
                    style={{ width: `${generationProgress}%` }}
                  />
                </div>
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
                className="w-full py-3 bg-white hover:bg-slate-200 text-black font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Master Video (.mp4)</span>
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#0A0B0E] flex items-center justify-center text-slate-500 text-xs font-mono">Loading Studio...</div>}>
      <StudioContent />
    </Suspense>
  );
}
