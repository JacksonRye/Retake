'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  Video, 
  CheckCircle2, 
  Monitor, 
  Download, 
  Send, 
  RefreshCw, 
  Layers, 
  Film, 
  UploadCloud, 
  FileVideo, 
  Activity,
  Sliders,
  ArrowRight
} from 'lucide-react';

const CleanPlayer = dynamic(() => import('../../components/CleanPlayer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black text-slate-500 text-xs font-mono">
      Initializing Native Player...
    </div>
  ),
});

function StudioContent() {
  const searchParams = useSearchParams();
  const initialComp = searchParams?.get('compId') || 'FullEditPixel';
  const initialStyle = searchParams?.get('style') || 'CHRON_STYLE_98';

  const [activeComp, setActiveComp] = useState(initialComp);
  const [activeLabel, setActiveLabel] = useState(initialComp === 'FullEditPixel' ? 'Full Edit' : 'Scene');
  const [activeVersion, setActiveVersion] = useState('V1');
  const [availableVersions, setAvailableVersions] = useState<string[]>(['V1']);
  const [currentStyleCode, setCurrentStyleCode] = useState(initialStyle);
  const [promptText, setPromptText] = useState('');
  const [selectedVideoName, setSelectedVideoName] = useState<string | null>('video.mp4');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [renderedFrames, setRenderedFrames] = useState(0);
  const [totalFrames, setTotalFrames] = useState(2056);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [sceneButtons, setSceneButtons] = useState<{ label: string; compId: string }[]>([
    { label: 'Full Edit', compId: 'FullEditPixel' }
  ]);

  useEffect(() => {
    async function loadActiveScenes() {
      try {
        const res = await fetch('/api/scenetable/active');
        const data = await res.json();
        if (data && data.scenes && data.scenes.length > 0) {
          const dynamicOptions = [
            { label: 'Full Edit', compId: 'FullEditPixel' }
          ];
          data.scenes.forEach((sc: any, idx: number) => {
            const cname = sc.component_name || `Scene${idx + 1}`;
            dynamicOptions.push({
              label: `Scene ${sc.scene_number || idx + 1}`,
              compId: cname
            });
          });
          setSceneButtons(dynamicOptions);
          if (data.style) {
            setCurrentStyleCode(data.style);
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
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideoName(file.name);
      setStatusMessage(`📁 Selected raw video: ${file.name}`);
    }
  };

  const handleSelectScene = (label: string, compId: string, versions?: string[]) => {
    setActiveLabel(label);
    setActiveComp(compId);
    if (versions) {
      setAvailableVersions(versions);
      const latestVer = versions[versions.length - 1];
      setActiveVersion(latestVer);
    } else {
      setAvailableVersions([]);
      setActiveVersion('');
    }
    setStatusMessage(null);
  };

  const handleSelectVersion = (ver: string) => {
    setActiveVersion(ver);
    const sceneNum = activeLabel.replace(/[^0-9]/g, '') || '1';
    const newCompId = `Scene${sceneNum}-${ver}`;
    setActiveComp(newCompId);
  };

  const handleApplyRevision = async () => {
    if (!promptText.trim() || isProcessing) return;
    setIsProcessing(true);
    setStatusMessage('AI Agent is generating scene TSX code...');

    const sceneNum = activeLabel.includes('Scene') ? parseInt(activeLabel.replace(/[^0-9]/g, '') || '1') : 1;

    try {
      const res = await fetch('/api/revision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scene: sceneNum, prompt: promptText }),
      });

      const data = await res.json();
      if (data.success && data.newCompId) {
        const verMatch = data.newCompId.match(/-V(\d+)$/);
        const newVerStr = verMatch ? `V${verMatch[1]}` : 'V2';
        
        setAvailableVersions((prev) => Array.from(new Set([...prev, newVerStr])));
        setActiveVersion(newVerStr);
        setActiveComp(data.newCompId);
        setStatusMessage(`✅ Revision Applied! Switched to ${newVerStr}`);
        setPromptText('');
      } else {
        setStatusMessage(`⚠️ Error: ${data.error}`);
      }
    } catch (err: any) {
      setStatusMessage(`❌ Error: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport4K = () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(0);
    setRenderedFrames(0);
    setTimeRemaining('initializing encoder...');
    setStatusMessage(`🎬 Rendering 4K Master Video (${activeComp})...`);

    const eventSource = new EventSource('/api/export');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === 'rendering') {
          setExportProgress(data.percent);
          setRenderedFrames(data.renderedFrames);
          setTotalFrames(data.totalFrames);
          if (data.timeRemaining) {
            setTimeRemaining(`Est. ${data.timeRemaining} remaining`);
          }
        } else if (data.status === 'complete') {
          setExportProgress(100);
          setStatusMessage('🎉 4K Video Render Complete! Output stored on Cloudflare R2.');
          eventSource.close();
          setTimeout(() => setIsExporting(false), 1500);
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

  return (
    <div className="flex flex-col min-h-screen md:h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased overflow-x-hidden md:overflow-hidden selection:bg-orange-500/30">
      {/* 1. Header with Responsive Navigation */}
      <header className="h-16 border-b border-white/5 bg-[#0D0F15]/90 px-4 sm:px-6 flex items-center justify-between backdrop-blur-xl z-20 flex-shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              R
            </div>
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white">RETAKE</span>
          </Link>
          <span className="text-slate-600">/</span>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Film className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">Studio Editor</span>
          </div>
        </div>

        {/* Video File & Active Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleVideoFileSelect}
            accept="video/mp4,video/mov,video/m4v"
            className="hidden"
          />
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141722] hover:bg-[#1C202E] border border-white/10 text-[11px] sm:text-xs font-medium text-slate-200 transition-all shadow-sm"
          >
            <UploadCloud className="w-3.5 h-3.5 text-orange-400" />
            <span className="truncate max-w-[90px] sm:max-w-[140px]">{selectedVideoName ? selectedVideoName : 'Select Video'}</span>
          </button>

          <Link
            href="/sampler"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141722] hover:bg-[#1C202E] border border-white/10 text-xs font-medium text-slate-300 transition-all"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>60 Styles</span>
          </Link>

          <Link
            href="/console"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141722] hover:bg-[#1C202E] border border-white/10 text-[11px] sm:text-xs font-medium text-slate-300 transition-all"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Console</span>
          </Link>
        </div>
      </header>

      {/* 2. Main Responsive 2-Column or Stacked Mobile Layout */}
      <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
        {/* Left Column: Pure Native Video Viewport */}
        <main className="flex-1 bg-[#07080B] flex flex-col items-center justify-center p-4 sm:p-6 relative min-h-[460px] sm:min-h-[580px]">
          <div className="w-[280px] xs:w-[320px] sm:w-[360px] h-[480px] xs:h-[540px] sm:h-[620px] bg-black rounded-[28px] sm:rounded-[32px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden relative">
            <CleanPlayer activeComp={activeComp} totalFrames={totalFrames} />
          </div>
          
          <div className="mt-3 text-[11px] sm:text-xs text-slate-400 flex items-center gap-2 font-mono">
            <Monitor className="w-3.5 h-3.5 text-orange-400" />
            <span>Active: <strong className="text-white">{activeLabel}</strong> ({activeComp})</span>
          </div>
        </main>

        {/* Right Column: Sleek Minimal Control Sidebar */}
        <aside className="w-full md:w-96 border-t md:border-t-0 md:border-l border-white/5 bg-[#0D0F15] p-5 sm:p-6 flex flex-col justify-between overflow-y-auto space-y-6 md:space-y-0">
          <div className="space-y-6">
            {/* Scene Selector Grid */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Select Scene</span>
                <span className="text-[11px] font-mono text-slate-500">{sceneButtons.length} scenes</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {sceneButtons.map((item) => {
                  const isSelected = activeComp === item.compId || activeLabel === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleSelectScene(item.label, item.compId)}
                      className={`py-2 px-3 rounded-2xl text-xs font-semibold transition-all border ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-md'
                          : 'bg-[#141722] border-white/5 text-slate-400 hover:text-white hover:bg-[#1C202E]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Version Variant Selector Bar */}
            {availableVersions.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-orange-400" />
                  <span>Scene Variants ({activeLabel})</span>
                </div>
                <div className="flex flex-wrap gap-1.5 bg-[#141722] p-2 rounded-2xl border border-white/5">
                  {availableVersions.map((ver) => (
                    <button
                      key={ver}
                      onClick={() => handleSelectVersion(ver)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all border ${
                        activeVersion === ver
                          ? 'bg-orange-500 text-white border-orange-400 shadow-sm'
                          : 'bg-[#1C202E] text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {ver}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* AI Revision Prompt */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                <span>AI Prompt Correction</span>
                <span className="text-[10px] font-mono text-orange-400">~2.1s Rebuild</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleApplyRevision()}
                  disabled={isProcessing}
                  placeholder={`Describe edit for ${activeLabel}...`}
                  className="w-full bg-[#141722] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all pr-11 disabled:opacity-50"
                />
                <button
                  onClick={handleApplyRevision}
                  disabled={isProcessing || !promptText.trim()}
                  className="absolute right-2 top-2 p-2 bg-white hover:bg-slate-200 disabled:opacity-50 text-black rounded-xl transition-all shadow-sm"
                >
                  {isProcessing ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {statusMessage && (
                <div className="mt-3 text-[11px] font-mono text-orange-300 bg-orange-950/30 border border-orange-800/40 px-3.5 py-2 rounded-xl flex items-center gap-2 leading-relaxed">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse flex-shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Export Action Card */}
          <div className="space-y-3 pt-6 border-t border-white/5">
            {isExporting && (
              <div className="bg-[#141722] border border-white/10 rounded-2xl p-4 text-xs space-y-2.5">
                <div className="flex justify-between items-center text-[11px] font-mono text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-orange-400 animate-spin" />
                    <span>Frame <strong className="text-white">{renderedFrames}</strong> / {totalFrames}</span>
                  </span>
                  <span className="text-orange-400 font-bold font-mono">{exportProgress}%</span>
                </div>

                <div className="w-full h-2 bg-[#1C202E] rounded-full overflow-hidden border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-150 rounded-full"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>

                {timeRemaining && (
                  <div className="text-[10px] text-slate-500 font-mono text-right">
                    {timeRemaining}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={handleExport4K}
              disabled={isExporting}
              className="w-full py-3.5 bg-white hover:bg-slate-200 disabled:opacity-50 text-black font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xl shadow-white/5 transition-all"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Rendering ({exportProgress}%)...</span>
                </>
              ) : (
                <>
                  <Film className="w-4 h-4" />
                  <span>Export 4K Master Video</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function StudioPage() {
  return (
    <Suspense fallback={<div className="h-screen bg-[#0A0B0E] flex items-center justify-center text-slate-500 text-xs font-mono">Loading Studio Editor...</div>}>
      <StudioContent />
    </Suspense>
  );
}
