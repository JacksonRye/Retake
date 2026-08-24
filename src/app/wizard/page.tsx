'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  FileText, 
  LayoutGrid, 
  MonitorPlay, 
  ArrowRight, 
  ArrowLeft, 
  UploadCloud, 
  Smartphone, 
  Monitor, 
  Square, 
  Zap, 
  Clock, 
  Code2, 
  RefreshCw, 
  Video, 
  Check, 
  Search, 
  Star, 
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const WIZARD_STEPS = [
  { id: 1, label: '1. Config & Source', icon: Sliders },
  { id: 2, label: '2. Whisper Speech', icon: FileText },
  { id: 3, label: '3. Scene Table', icon: LayoutGrid },
  { id: 4, label: '4. Remotion Studio', icon: MonitorPlay },
];

const RESOLUTIONS = [
  { id: '9:16', label: '9:16 Vertical Mobile', desc: 'TikTok, Reels, Shorts (1080×1920)', icon: Smartphone },
  { id: '16:9', label: '16:9 Widescreen', desc: 'YouTube, Web, Desktop (1920×1080)', icon: Monitor },
  { id: '1:1', label: '1:1 Square Feed', desc: 'Instagram Feed, LinkedIn (1080×1080)', icon: Square },
];

const PACINGS = [
  { id: 'fast', name: 'High-Retention Bursts (1.5s - 3.0s)', desc: 'High-energy kinetic Hormozi-style pacing', icon: Zap },
  { id: 'balanced', name: 'Balanced Rhythm (3.0s - 5.0s)', desc: 'Smooth pacing for storytelling & product walkthroughs', icon: Clock },
];

interface StyleManifestItem {
  style_code: string;
  name: string;
  best_for: string;
  palette: string[];
  component_name: string;
  preview_image: string;
  success: boolean;
}

interface TranscriptSegment {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface SceneItem {
  scene_number: number;
  start_time: string;
  end_time: string;
  duration_seconds?: number;
  visual_metaphor: string;
  component_name: string;
  creative_unlock_reason: string;
}

export default function WizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [resolution, setResolution] = useState('9:16');
  const [styleCode, setStyleCode] = useState('CHRON_STYLE_100');
  const [pacing, setPacing] = useState('fast');
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isDownloadingUrl, setIsDownloadingUrl] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [dlPercent, setDlPercent] = useState(0);
  const [dlDetails, setDlDetails] = useState('');

  // Styles & Favorites State
  const [allStyles, setAllStyles] = useState<StyleManifestItem[]>([]);
  const [styleSearch, setStyleSearch] = useState('');
  const [activeStyleTab, setActiveStyleTab] = useState<'favorites' | 'all'>('favorites');
  const [favorites, setFavorites] = useState<string[]>([
    'CHRON_STYLE_100', // Neubrutalism
    'CHRON_STYLE_98',  // Cyberpunk Terminal
    'CHRON_STYLE_72',  // Obsidian Minimal
    'CHRON_STYLE_55',  // Modern SaaS
    'CHRON_STYLE_01',  // Editorial
    'CHRON_STYLE_02',  // Mission Control
  ]);

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState<string | null>(null);
  const [transcriptData, setTranscriptData] = useState<TranscriptSegment[]>([]);

  const [isBuildingPipeline, setIsBuildingPipeline] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState<string | null>(null);
  const [scenesData, setScenesData] = useState<SceneItem[]>([]);
  const [wizardJobId, setWizardJobId] = useState<string>('');

  const [buildProgress, setBuildProgress] = useState<{
    percentage: number;
    current: number;
    total: number;
    message: string;
    eta_seconds: number;
    status: string;
  }>({
    percentage: 0,
    current: 0,
    total: 0,
    message: '',
    eta_seconds: 0,
    status: 'idle',
  });

  // Auth & Credit State
  const [user, setUser] = useState<any>(null);
  const [userCredits, setUserCredits] = useState<number>(1);

  // 1. Restore persistent wizard session on mount (survives refreshes, reboots, and log-outs)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('retake_wizard_session');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.videoUrl) setVideoUrl(parsed.videoUrl);
        if (parsed.styleCode) setStyleCode(parsed.styleCode);
        if (parsed.pacing) setPacing(parsed.pacing);
        if (parsed.resolution) setResolution(parsed.resolution);
        if (parsed.transcriptData && parsed.transcriptData.length > 0) setTranscriptData(parsed.transcriptData);
        if (parsed.scenesData && parsed.scenesData.length > 0) setScenesData(parsed.scenesData);
        if (parsed.wizardJobId) setWizardJobId(parsed.wizardJobId);
        if (parsed.pipelineStatus) setPipelineStatus(parsed.pipelineStatus);
        if (parsed.isBuildingPipeline) setIsBuildingPipeline(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // 2. Save active wizard session to localStorage whenever state changes
  useEffect(() => {
    try {
      const session = {
        currentStep,
        videoUrl,
        styleCode,
        pacing,
        resolution,
        transcriptData,
        scenesData,
        wizardJobId,
        pipelineStatus,
        isBuildingPipeline,
        timestamp: Date.now(),
      };
      localStorage.setItem('retake_wizard_session', JSON.stringify(session));
    } catch (e) {
      console.error(e);
    }
  }, [currentStep, videoUrl, styleCode, pacing, resolution, transcriptData, scenesData, wizardJobId, pipelineStatus, isBuildingPipeline]);

  // 3. Real-time VPS Progress & ETA Polling
  useEffect(() => {
    let pollInterval: any = null;
    if (isBuildingPipeline || buildProgress.status === 'building') {
      pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`/api/build/status?t=${Date.now()}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.percentage !== undefined) {
              setBuildProgress({
                percentage: data.percentage || 0,
                current: data.current || 0,
                total: data.total || 0,
                message: data.message || '',
                eta_seconds: data.eta_seconds || 0,
                status: data.status || 'building',
              });

              if (data.status === 'complete' && data.percentage === 100) {
                setIsBuildingPipeline(false);
                setPipelineStatus(data.message || '✅ Scene generation complete!');
                // Auto-advance to Studio
                setTimeout(() => {
                  router.push(`/studio?t=${Date.now()}&style=${styleCode}`);
                }, 1200);
              }
            }
          }
        } catch (e) {
          // ignore
        }
      }, 700);
    }

    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [isBuildingPipeline, buildProgress.status, styleCode, router]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user);
        setUserCredits(data.user.user_metadata?.credits ?? 1);
      }
    });

    fetch('/sampler_manifest.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((data: StyleManifestItem[]) => {
        setAllStyles(data);
      })
      .catch(() => {});

    try {
      const savedFavs = localStorage.getItem('saas_video_fav_styles');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleFavorite = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    let updated: string[];
    if (favorites.includes(code)) {
      updated = favorites.filter((c) => c !== code);
    } else {
      updated = [...favorites, code];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('saas_video_fav_styles', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  // Filter styles based on search query and active tab
  const displayedStyles = allStyles.filter((st) => {
    const matchesSearch = 
      styleSearch.trim() === '' ||
      st.name.toLowerCase().includes(styleSearch.toLowerCase()) ||
      st.best_for.toLowerCase().includes(styleSearch.toLowerCase()) ||
      st.style_code.toLowerCase().includes(styleSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (styleSearch.trim() !== '') {
      return true; // Search matches across all 60 styles automatically
    }

    if (activeStyleTab === 'favorites') {
      return favorites.includes(st.style_code);
    }

    return true;
  });

  const handleDownloadUrl = async () => {
    if (!videoUrl || isDownloadingUrl) return;

    const newJobId = `wizard_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setWizardJobId(newJobId);

    setIsDownloadingUrl(true);
    setDlPercent(0);
    setDlDetails('Connecting to video source...');
    setDownloadStatus(`📥 Fetching video stream...`);

    const pollInterval = setInterval(async () => {
      try {
        const sRes = await fetch('/api/download/status');
        const sData = await sRes.json();
        if (sData && sData.percent !== undefined) {
          setDlPercent(sData.percent);
          const details = `${sData.downloaded_str || ''} ${sData.speed_str ? '• ' + sData.speed_str : ''} ${sData.eta_str ? '• ' + sData.eta_str : ''}`.trim();
          setDlDetails(details);
        }
      } catch (e) {
        // ignore
      }
    }, 500);

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl, isDemoMode, duration: 60, jobId: newJobId, styleCode })
      });
      const data = await res.json();
      if (data.success) {
        setDlPercent(100);
        setDownloadStatus(`✅ 1-Minute Master Video ingested! Auto-advancing to Whisper Speech...`);
        setSelectedVideo(null);
        
        // Auto-advance to Step 2 & trigger Whisper
        setTimeout(() => {
          setCurrentStep(2);
          executeTranscription(newJobId);
        }, 800);
      } else {
        setDownloadStatus(`⚠️ Download Error: ${data.error}`);
      }
    } catch (err: any) {
      setDownloadStatus(`❌ Error: ${err.message}`);
    } finally {
      clearInterval(pollInterval);
      setIsDownloadingUrl(false);
    }
  };

  const executeTranscription = async (overrideJobId?: string) => {
    const currentJid = overrideJobId || wizardJobId;
    setIsTranscribing(true);
    setTranscriptionStatus('🎙️ Whisper AI transcribing timestamped words...');
    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: styleCode, pacing, resolution, jobId: currentJid })
      });
      const data = await res.json();
      if (data.success && data.segments) {
        setTranscriptData(data.segments);
        setTranscriptionStatus(`✅ Whisper transcribed ${data.segments.length} sentences! Auto-generating Remotion scenes...`);
        
        // Auto-advance to Step 3 & trigger Scene Architecture
        setTimeout(() => {
          setCurrentStep(3);
          executeBuildPipeline(currentJid);
        }, 1000);
      } else {
        setTranscriptionStatus(`⚠️ Error: ${data.error || 'Transcription failed'}`);
      }
    } catch (e: any) {
      setTranscriptionStatus(`❌ Error: ${e.message}`);
    } finally {
      setIsTranscribing(false);
    }
  };

  const executeBuildPipeline = async (overrideJobId?: string) => {
    const currentJid = overrideJobId || wizardJobId;
    setIsBuildingPipeline(true);
    setPipelineStatus('⚡ Gemini 3.6 Flash constructing scene metaphors & Remotion TSX code...');
    setBuildProgress({
      percentage: 12,
      current: 1,
      total: 7,
      message: 'Initializing Gemini 3.6 Flash scene planning on VPS...',
      eta_seconds: 22,
      status: 'building',
    });

    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: styleCode, pacing, resolution, jobId: currentJid })
      });
      
      const rawText = await res.text();
      let data: any = {};
      try {
        data = JSON.parse(rawText);
      } catch {
        data = { success: res.ok, message: 'Processing on Oracle VPS worker...' };
      }

      if (data.scenes && data.scenes.length > 0) {
        setScenesData(data.scenes);
      }
    } catch (e: any) {
      console.warn('Pipeline trigger notice:', e.message);
    }
  };

  const handleRunTranscription = () => executeTranscription();
  const handleBuildPipeline = () => executeBuildPipeline();

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-orange-500/30">
      {/* 1. Floating Pill Header */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-5xl bg-[#131620]/80 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-between">
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
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-orange-400" />
              <span>Creation Wizard</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-950/50 border border-orange-700/40 text-xs font-semibold text-orange-300">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>
                {user?.email?.toLowerCase() === 'chijiokejackson35@gmail.com' 
                  ? '♾️ Unlimited (Admin)' 
                  : `${userCredits} ${userCredits === 1 ? 'Credit' : 'Credits'} Available`}
              </span>
            </div>
            <Link
              href="/sampler"
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
            >
              Styles
            </Link>
            <Link
              href="/studio"
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
            >
              Studio
            </Link>
            {user?.email?.toLowerCase() === 'chijiokejackson35@gmail.com' && (
              <Link
                href="/console"
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
              >
                Console
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* 2. Main Wizard Container */}
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-8">
        {/* Step Progression Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {WIZARD_STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isDone = currentStep > step.id;
            return (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#181B26] border-orange-500/80 text-white shadow-md'
                    : isDone
                    ? 'bg-[#12141C] border-emerald-800/40 text-emerald-400'
                    : 'bg-[#12141C] border-white/5 text-slate-500'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                  isActive ? 'bg-orange-500 text-white' : isDone ? 'bg-emerald-950 text-emerald-300' : 'bg-[#1A1D2A] text-slate-500'
                }`}>
                  {isDone ? <Check className="w-3.5 h-3.5" /> : step.id}
                </div>
                <span className="text-xs font-semibold truncate">{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Step 1: Config & Video Source */}
        {currentStep === 1 && (
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 space-y-8 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Step 1: Configuration & Video Source</h2>
              <p className="text-xs text-slate-400">Choose aspect ratio, visual motion graphics style, and paste your video.</p>
            </div>

            {/* Resolution Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Aspect Ratio</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {RESOLUTIONS.map((res) => {
                  const Icon = res.icon;
                  const isSelected = resolution === res.id;
                  return (
                    <div
                      key={res.id}
                      onClick={() => setResolution(res.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-1 ${
                        isSelected
                          ? 'bg-[#181B26] border-orange-500 text-white shadow-md'
                          : 'bg-[#0E1017] border-white/5 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-400' : 'text-slate-500'}`} />
                        <span className="text-xs font-bold text-white">{res.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{res.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Visual Searchable Style Picker with Thumbnails & Favorites */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                  <span>Motion Graphics Style</span>
                </label>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 bg-[#0E1017] border border-white/5 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => { setActiveStyleTab('favorites'); setStyleSearch(''); }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      activeStyleTab === 'favorites' && styleSearch === ''
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Star className="w-3 h-3 fill-current" />
                    <span>Favorites ({favorites.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setActiveStyleTab('all'); setStyleSearch(''); }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeStyleTab === 'all' && styleSearch === ''
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>All 60 Styles</span>
                  </button>
                </div>
              </div>

              {/* On-Screen Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={styleSearch}
                  onChange={(e) => setStyleSearch(e.target.value)}
                  placeholder="Search styles instantly (e.g. brutal, cyber, minimal, 3D, neon, SaaS)..."
                  className="w-full bg-[#0E1017] border border-white/10 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/80 transition-all"
                />
                {styleSearch && (
                  <button
                    type="button"
                    onClick={() => setStyleSearch('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Visual Thumbnail Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {displayedStyles.map((st) => {
                  const isSelected = styleCode === st.style_code;
                  const isFav = favorites.includes(st.style_code);
                  return (
                    <div
                      key={st.style_code}
                      onClick={() => setStyleCode(st.style_code)}
                      className={`group relative rounded-2xl border cursor-pointer overflow-hidden transition-all flex flex-col bg-[#0E1017] ${
                        isSelected
                          ? 'border-orange-500 ring-2 ring-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.3)]'
                          : 'border-white/5 hover:border-white/20'
                      }`}
                    >
                      {/* Visual Thumbnail Preview */}
                      <div className="w-full aspect-[9/10] bg-[#151822] relative overflow-hidden">
                        <img
                          src={st.preview_image}
                          alt={st.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />

                        {/* Top Gradient Overlay & Star Favorite Button */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex justify-between p-2">
                          {isSelected ? (
                            <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white font-bold text-[10px] shadow-sm">
                              Active
                            </span>
                          ) : <span />}

                          <button
                            type="button"
                            onClick={(e) => toggleFavorite(st.style_code, e)}
                            className="w-6 h-6 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Star
                              className={`w-3.5 h-3.5 ${
                                isFav ? 'text-amber-400 fill-amber-400' : 'text-slate-400 hover:text-white'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Card Label */}
                      <div className="p-2.5 space-y-0.5 bg-[#0E1017]">
                        <h4 className="text-xs font-bold text-white truncate">{st.name}</h4>
                        <p className="text-[10px] text-slate-400 truncate">{st.best_for}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {displayedStyles.length === 0 && (
                <div className="p-8 text-center bg-[#0E1017] border border-white/5 rounded-2xl space-y-2">
                  <p className="text-xs text-slate-400">No styles found matching "{styleSearch}".</p>
                  <button
                    type="button"
                    onClick={() => { setStyleSearch(''); setActiveStyleTab('all'); }}
                    className="text-xs text-orange-400 hover:underline font-semibold"
                  >
                    View All 60 Styles
                  </button>
                </div>
              )}
            </div>

            {/* Video Input Options */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Video Source</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste direct .mp4 video URL or video stream link..."
                  className="flex-1 bg-[#0E1017] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={handleDownloadUrl}
                  disabled={isDownloadingUrl || !videoUrl.trim()}
                  className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {isDownloadingUrl ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <UploadCloud className="w-3.5 h-3.5" />}
                  <span>Ingest</span>
                </button>
              </div>

              {downloadStatus && (
                <div className="text-[11px] font-mono text-orange-300 bg-orange-950/30 border border-orange-800/40 p-3 rounded-xl">
                  {downloadStatus}
                </div>
              )}
            </div>

            {/* Next Step Button */}
            <div className="flex justify-end pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue to Transcription</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Whisper Speech */}
        {currentStep === 2 && (
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Step 2: Whisper Speech-to-Text Ingestion</h2>
              <p className="text-xs text-slate-400">Extracts frame-accurate word timestamps for sync.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1017] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Transcribe Ingested Video</h4>
                  <p className="text-[11px] text-slate-500">Extracts audio and aligns timestamps automatically.</p>
                </div>
              </div>
              <button
                onClick={handleRunTranscription}
                disabled={isTranscribing}
                className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isTranscribing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Run Whisper</span>
              </button>
            </div>

            {transcriptionStatus && (
              <div className="text-[11px] font-mono text-slate-300 bg-[#0E1017] border border-white/10 p-3 rounded-xl">
                {transcriptionStatus}
              </div>
            )}

            {transcriptData.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 border border-white/5 p-4 rounded-2xl bg-[#0E1017]">
                {transcriptData.map((seg) => (
                  <div key={seg.id} className="text-xs flex gap-3 text-slate-300 font-mono py-1 border-b border-white/5 last:border-0">
                    <span className="text-orange-400 font-semibold shrink-0">[{seg.start.toFixed(1)}s - {seg.end.toFixed(1)}s]</span>
                    <span>{seg.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-full bg-[#181B26] hover:bg-[#202534] text-xs font-semibold text-slate-300 flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Continue to Scene Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Scene Table */}
        {currentStep === 3 && (
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Step 3: Visual Scene Builder</h2>
              <p className="text-xs text-slate-400">Create animations and graphics with style {styleCode}.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E1017] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Create Video Scenes</h4>
                  <p className="text-[11px] text-slate-500">AI turns your script into visual animation scenes.</p>
                </div>
              </div>
              <button
                onClick={handleBuildPipeline}
                disabled={isBuildingPipeline}
                className="px-5 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-xs font-bold text-white transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isBuildingPipeline ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>Generate Scene Breakdown</span>
              </button>
            </div>

            {/* Dynamic Real-time Progress Bar & ETA Card */}
            {(isBuildingPipeline || buildProgress.percentage > 0) && (
              <div className="p-5 rounded-2xl bg-[#0E1017] border border-orange-500/30 space-y-3.5 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Progress Header & ETA */}
                <div className="flex items-center justify-between text-xs relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
                    <span className="font-bold text-white tracking-wide">
                      {buildProgress.current > 0
                        ? `Generating Scene ${buildProgress.current} of ${buildProgress.total || 7}`
                        : 'Constructing Scene Metaphors & TSX Code...'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {buildProgress.eta_seconds > 0 && (
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-semibold">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        <span>~{buildProgress.eta_seconds}s left</span>
                      </div>
                    )}
                    <span className="font-mono font-black text-orange-400 text-sm">
                      {buildProgress.percentage}%
                    </span>
                  </div>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-[#181B26] rounded-full h-3 border border-white/10 overflow-hidden p-0.5 relative">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-500 relative"
                    style={{ width: `${Math.max(6, buildProgress.percentage)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>

                {/* Live Activity Line */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-0.5">
                  <span className="truncate">⚡ {buildProgress.message || pipelineStatus || 'Gemini 3.6 Flash constructing scene metaphors...'}</span>
                  <span className="text-[10px] text-emerald-400/80 font-sans shrink-0 ml-3 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Live VPS Sync
                  </span>
                </div>
              </div>
            )}

            {pipelineStatus && !isBuildingPipeline && buildProgress.percentage === 0 && (
              <div className="text-[11px] font-mono text-slate-300 bg-[#0E1017] border border-white/10 p-3.5 rounded-xl">
                {pipelineStatus}
              </div>
            )}

            {scenesData.length > 0 && (
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2 border border-white/5 p-4 rounded-2xl bg-[#0E1017]">
                {scenesData.map((sc) => (
                  <div key={sc.scene_number} className="p-3.5 rounded-xl bg-[#141722] border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">Scene #{sc.scene_number}: {sc.component_name}</span>
                      <span className="font-mono text-orange-400 text-[11px]">[{sc.start_time} - {sc.end_time}]</span>
                    </div>
                    <p className="text-xs text-slate-300">{sc.visual_metaphor}</p>
                    <div className="text-[11px] text-slate-500 font-mono">Unlock: {sc.creative_unlock_reason}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-full bg-[#181B26] hover:bg-[#202534] text-xs font-semibold text-slate-300 flex items-center gap-2 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => router.push(`/studio?t=${Date.now()}&style=${styleCode}`)}
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <span>Launch in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
