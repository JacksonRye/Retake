'use client';

import React, { useState, useRef } from 'react';
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
  Check
} from 'lucide-react';

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
  const [styleCode, setStyleCode] = useState('CHRON_STYLE_72');
  const [pacing, setPacing] = useState('fast');
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [isDownloadingUrl, setIsDownloadingUrl] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null);
  const [dlPercent, setDlPercent] = useState(0);
  const [dlDetails, setDlDetails] = useState('');

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcriptionStatus, setTranscriptionStatus] = useState<string | null>(null);
  const [transcriptData, setTranscriptData] = useState<TranscriptSegment[]>([]);

  const [isBuildingPipeline, setIsBuildingPipeline] = useState(false);
  const [pipelineStatus, setPipelineStatus] = useState<string | null>(null);
  const [scenesData, setScenesData] = useState<SceneItem[]>([]);

  const handleDownloadUrl = async () => {
    if (!videoUrl.trim() || isDownloadingUrl) return;
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
        body: JSON.stringify({ url: videoUrl, isDemoMode, duration: 30 })
      });
      const data = await res.json();
      if (data.success) {
        setDlPercent(100);
        setDownloadStatus(`✅ Success! Video downloaded and trimmed to 30s clip.`);
        setSelectedVideo(null);
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

  const handleRunTranscription = async () => {
    setIsTranscribing(true);
    setTranscriptionStatus('Whisper AI transcribing timestamps...');
    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: styleCode, pacing, resolution })
      });
      const data = await res.json();
      if (data.success && data.segments) {
        setTranscriptData(data.segments);
        setTranscriptionStatus(`✅ Whisper transcribed ${data.segments.length} timestamped sentences.`);
      } else {
        setTranscriptionStatus(`⚠️ Error: ${data.error || 'Transcription failed'}`);
      }
    } catch (e: any) {
      setTranscriptionStatus(`❌ Error: ${e.message}`);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleBuildPipeline = async () => {
    setIsBuildingPipeline(true);
    setPipelineStatus('Planner AI constructing scene breakdown and Remotion code...');
    try {
      const res = await fetch('/api/pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style: styleCode, pacing, resolution })
      });
      const data = await res.json();
      if (data.success && data.scenes) {
        setScenesData(data.scenes);
        setPipelineStatus(`✅ Generated ${data.scenes.length} dynamic Remotion scenes!`);
      } else {
        setPipelineStatus(`⚠️ Error: ${data.error || 'Pipeline generation failed'}`);
      }
    } catch (e: any) {
      setPipelineStatus(`❌ Error: ${e.message}`);
    } finally {
      setIsBuildingPipeline(false);
    }
  };

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
              <span>1 Credit Available</span>
            </div>
            <Link
              href="/studio"
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
            >
              Studio
            </Link>
            <Link
              href="/console"
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
            >
              Console
            </Link>
          </div>
        </nav>
      </div>

      {/* 2. Main Wizard Container */}
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-8">
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
              <p className="text-xs text-slate-400">Choose aspect ratio, pacing, and supply a raw video URL or file.</p>
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
                  className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-xs font-bold text-white transition-all flex items-center gap-1.5"
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
                className="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold flex items-center gap-2 transition-all"
              >
                <span>Continue to Transcription</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Speech Transcription */}
        {currentStep === 2 && (
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Step 2: Timestamped Speech Recognition</h2>
              <p className="text-xs text-slate-400">Whisper AI will extract exact word timestamps to synchronize animations.</p>
            </div>

            <button
              onClick={handleRunTranscription}
              disabled={isTranscribing}
              className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-2 transition-all"
            >
              {isTranscribing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              <span>{isTranscribing ? 'Transcribing...' : 'Run Whisper AI Transcription'}</span>
            </button>

            {transcriptionStatus && (
              <div className="text-xs font-mono text-orange-300 bg-orange-950/30 border border-orange-800/40 p-3 rounded-xl">
                {transcriptionStatus}
              </div>
            )}

            {transcriptData.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto p-4 rounded-2xl bg-[#0E1017] border border-white/5 text-xs font-mono">
                {transcriptData.map((seg) => (
                  <div key={seg.id} className="flex gap-3 text-slate-300">
                    <span className="text-orange-400">{seg.start.toFixed(1)}s - {seg.end.toFixed(1)}s:</span>
                    <span>{seg.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-full bg-[#181B26] hover:bg-[#222736] text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold flex items-center gap-2"
              >
                <span>Continue to Scene Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Scene Table Generation */}
        {currentStep === 3 && (
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 space-y-6 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">Step 3: Autonomous Scene Architecture</h2>
              <p className="text-xs text-slate-400">Generate frame-accurate scene cuts and visual animations with style {styleCode}.</p>
            </div>

            <button
              onClick={handleBuildPipeline}
              disabled={isBuildingPipeline}
              className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-xs font-bold text-white flex items-center gap-2 transition-all"
            >
              {isBuildingPipeline ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LayoutGrid className="w-4 h-4" />}
              <span>{isBuildingPipeline ? 'Architecting Scenes...' : 'Generate Scene Breakdown'}</span>
            </button>

            {pipelineStatus && (
              <div className="text-xs font-mono text-orange-300 bg-orange-950/30 border border-orange-800/40 p-3 rounded-xl">
                {pipelineStatus}
              </div>
            )}

            {scenesData.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scenesData.map((sc) => (
                  <div key={sc.scene_number} className="p-4 rounded-2xl bg-[#0E1017] border border-white/5 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Scene {sc.scene_number}</span>
                      <span className="font-mono text-orange-400 text-[11px]">{sc.start_time} - {sc.end_time}</span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{sc.visual_metaphor}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-full bg-[#181B26] hover:bg-[#222736] text-slate-300 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold flex items-center gap-2"
              >
                <span>Launch in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Ready to Render & Edit */}
        {currentStep === 4 && (
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 space-y-6 text-center shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto">
              <MonitorPlay className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Video Pipeline Ready!</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Your video scenes and dynamic animations have been staged. Launch the Studio Editor to preview and export.
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <Link
                href="/studio"
                className="px-8 py-3.5 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold flex items-center gap-2 shadow-lg shadow-white/5 transition-all"
              >
                <span>Open Studio Editor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
