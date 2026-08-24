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
  const [currentStyleCode, setCurrentStyleCode] = useState(initialStyle);
  const [totalFrames, setTotalFrames] = useState(1801);
  const [activeScenes, setActiveScenes] = useState<any[]>([]);

  const [videoInputUrl, setVideoInputUrl] = useState('');
  const [selectedStyleCode, setSelectedStyleCode] = useState(initialStyle);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStage, setGenerationStage] = useState('');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.replace('/login?next=/studio');
      } else {
        setIsAuthenticated(true);
      }
    });
  }, [router]);

  useEffect(() => {
    async function loadActiveScenes() {
      try {
        const res = await fetch(`/api/scenetable/active?t=${Date.now()}`, { 
          cache: 'no-store',
          headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
        });
        const data = await res.json();
        if (data && data.scenes && data.scenes.length > 0) {
          setActiveScenes(data.scenes);
          if (data.style) {
            setCurrentStyleCode(data.style);
            setSelectedStyleCode(data.style);
          }
          if (data.total_frames) {
            setTotalFrames(data.total_frames);
          }
        }
      } catch (e) {
        // fallback
      }
    }
    loadActiveScenes();
  }, [searchParams]);

  const handleGenerateVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInputUrl.trim() || isGenerating) return;

    setIsGenerating(true);
    setGenerationError(null);
    setGenerationProgress(10);
    setGenerationStage('📥 Downloading video...');

    try {
      const dlRes = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: videoInputUrl.trim(),
          duration: 60,
          isDemoMode: false,
          styleCode: selectedStyleCode,
        }),
      });
      const dlData = await dlRes.json();
      if (!dlRes.ok || dlData.error) {
        throw new Error(dlData.error || 'Video download failed');
      }

      setGenerationProgress(35);
      setGenerationStage('🎙️ Transcribing speech with Whisper...');
      const trRes = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const trData = await trRes.json();
      if (!trRes.ok || trData.error) {
        throw new Error(trData.error || 'Speech transcription failed');
      }

      setGenerationProgress(65);
      setGenerationStage(`⚡ Generating full-screen ${selectedStyleCode} animations...`);
      const pipeRes = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          style: selectedStyleCode,
          pacing: 'fast',
          resolution: '9:16',
        }),
      });
      const pipeData = await pipeRes.json();
      if (!pipeRes.ok || pipeData.error) {
        throw new Error(pipeData.error || 'AI Scene generation failed');
      }

      setGenerationProgress(85);
      setGenerationStage('🛠️ Compiling master timeline...');
      
      let attempts = 0;
      while (attempts < 60) {
        await new Promise((r) => setTimeout(r, 2000));
        attempts++;
        try {
          const statusRes = await fetch('/api/build/status?t=' + Date.now());
          const statusData = await statusRes.json();
          if (statusData.percentage) {
            setGenerationProgress(Math.min(95, 65 + Math.round(statusData.percentage * 0.3)));
          }
          if (statusData.status === 'completed' || (statusData.percentage && statusData.percentage >= 100)) {
            break;
          }
        } catch {
          // ignore
        }
      }

      setGenerationProgress(100);
      setGenerationStage('✨ Video ready!');
      
      setTimeout(() => {
        setIsGenerating(false);
        setVideoInputUrl('');
        window.location.href = `/studio?t=${Date.now()}&style=${selectedStyleCode}`;
      }, 1200);

    } catch (err: any) {
      setGenerationError(err.message || 'Generation failed');
      setIsGenerating(false);
    }
  };

  const handleExport4K = () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(0);
    setStatusMessage('🎬 Rendering 4K Master Video...');

    const eventSource = new EventSource('/api/export?comp=FullEditPixel');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === 'rendering') {
          setExportProgress(data.percent);
        } else if (data.status === 'complete') {
          setExportProgress(100);
          setStatusMessage('🎉 Render Complete! Downloading video...');
          eventSource.close();

          try {
            const downloadUrl = data.downloadUrl || '/api/export/download';
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', `Retake_4K_${Date.now()}.mp4`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (dlErr) {
            console.error('Failed to trigger automatic download:', dlErr);
          }

          setTimeout(() => setIsExporting(false), 2000);
        } else if (data.status === 'error') {
          setStatusMessage(`⚠️ Render Error: ${data.message}`);
          eventSource.close();
          setIsExporting(false);
        }
      } catch (err) {
        console.error('Failed to parse SSE data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE Error:', err);
      eventSource.close();
      setIsExporting(false);
    };
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
        <div className="w-[300px] xs:w-[340px] sm:w-[380px] h-[533px] xs:h-[604px] sm:h-[675px] bg-black rounded-[32px] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden relative flex-shrink-0">
          <CleanPlayer
            activeComp="FullEditPixel"
            totalFrames={totalFrames}
            scenes={activeScenes}
            styleCode={currentStyleCode}
            videoUrl="/api/video/stream"
          />
        </div>

        <div className="w-full max-w-md bg-[#0D0F15] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="space-y-1">
            <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>AI Video Generator</span>
            </h1>
            <p className="text-xs text-slate-400">
              Feed any video URL and style code to build full-screen motion graphics.
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
                  <span>Generating Video...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Full-Screen Video</span>
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 space-y-3">
            {isExporting && (
              <div className="bg-[#141722] border border-white/10 rounded-2xl p-3.5 text-xs space-y-2">
                <div className="flex justify-between items-center text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 text-orange-400 animate-spin" />
                    <span>{statusMessage}</span>
                  </span>
                  <span className="text-orange-400 font-bold">{exportProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#1C202E] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-150 rounded-full"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleExport4K}
              disabled={isExporting || isGenerating}
              className="w-full py-3 bg-white hover:bg-slate-200 disabled:opacity-50 text-black font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Exporting ({exportProgress}%)...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Export 4K Master Video</span>
                </>
              )}
            </button>
          </div>
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
