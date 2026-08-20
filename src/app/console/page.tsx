'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Activity,
  CheckCircle2,
  AlertCircle,
  Clock,
  Send,
  Radio,
  Video,
  ExternalLink,
  RefreshCw,
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Layers,
  Copy,
  Check,
  Trash2,
  Flame,
  Terminal,
  Play
} from 'lucide-react';

interface Job {
  jobId: string;
  videoUrl: string;
  styleCode: string;
  clipDuration: number;
  webhookUrl?: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number;
  stage?: string;
  message?: string;
  createdAt: number;
  updatedAt?: number;
  completedAt?: number;
  videoUrl_r2?: string;
  durationSec?: number;
  scenesCount?: number;
  error?: string;
  lastLog?: string;
}

interface WebhookLog {
  id: string;
  jobId: string;
  event: string;
  timestamp: number;
  timeStr: string;
  destination: string;
  statusCode: number;
  success: boolean;
  error?: string;
  payload: any;
}

interface ConsoleStats {
  totalJobs: number;
  completedJobs: number;
  activeJobs: number;
  failedJobs: number;
  totalWebhooks: number;
  successfulWebhooks: number;
}

function LiveJobTerminal({ jobId, isProcessing }: { jobId: string; isProcessing: boolean }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(isProcessing);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Fetch initial logs history
    fetch(`/api/v1/jobs/${jobId}/logs`)
      .then((res) => res.json())
      .then((data) => {
        if (data.logs && Array.isArray(data.logs) && data.logs.length > 0) {
          setLogs(data.logs);
        }
      })
      .catch(() => {});

    // If still processing, connect to real-time SSE stream
    let eventSource: EventSource | null = null;
    if (isProcessing) {
      eventSource = new EventSource(`/api/v1/jobs/${jobId}/stream`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.log) {
            setLogs((prev) => {
              if (prev[prev.length - 1] === data.log) return prev;
              return [...prev, data.log].slice(-150);
            });
          }
        } catch {
          // ignore heartbeat ping
        }
      };

      eventSource.onerror = () => {
        if (eventSource) eventSource.close();
      };
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [jobId, isOpen, isProcessing]);

  useEffect(() => {
    if (isOpen && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isOpen]);

  return (
    <div className="rounded-2xl bg-[#090A0E] border border-white/10 overflow-hidden text-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.06] transition-colors border-b border-white/5"
      >
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-orange-400" />
          <span>Live Terminal Stream</span>
          {isProcessing && (
            <span className="flex items-center gap-1 text-[10px] text-orange-400 px-1.5 py-0.2 rounded-full bg-orange-950/60 border border-orange-800/40">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
              <span>LIVE</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
          <span>{logs.length} lines</span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-3.5 max-h-56 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1 scrollbar-thin scrollbar-thumb-white/10 bg-black/40">
          {logs.length === 0 ? (
            <div className="text-slate-600 italic">Waiting for incoming log stream...</div>
          ) : (
            logs.map((line, idx) => {
              const isRemotion = line.includes('[Remotion]');
              const isSuccess = line.includes('✓') || line.includes('✅') || line.includes('Uploaded to Cloudflare');
              const isError = line.includes('❌') || line.includes('ERROR') || line.includes('Error');

              let lineClass = 'text-slate-400';
              if (isSuccess) lineClass = 'text-emerald-400 font-semibold';
              else if (isError) lineClass = 'text-red-400 font-semibold';
              else if (isRemotion) lineClass = 'text-orange-300';

              return (
                <div key={idx} className={`${lineClass} break-all select-text`}>
                  {line}
                </div>
              );
            })
          )}
          <div ref={terminalEndRef} />
        </div>
      )}
    </div>
  );
}

function parseRemotionProgress(logText?: string): { frameCurrent: number; frameTotal: number; percent: number; timeRemaining?: string } | null {
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

export default function ConsolePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [webhooks, setWebhooks] = useState<WebhookLog[]>([]);
  const [stats, setStats] = useState<ConsoleStats>({
    totalJobs: 0,
    completedJobs: 0,
    activeJobs: 0,
    failedJobs: 0,
    totalWebhooks: 0,
    successfulWebhooks: 0,
  });

  const [activeTab, setActiveTab] = useState<'jobs' | 'webhooks'>('jobs');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/v1/console/events');
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs || []);
        setWebhooks(data.webhooks || []);
        if (data.stats) setStats(data.stats);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error('Failed to fetch console logs', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearEvents = async () => {
    if (!confirm('Are you sure you want to clear console history?')) return;
    try {
      await fetch('/api/v1/console/events', { method: 'DELETE' });
      fetchEvents();
    } catch (e) {
      console.error('Failed to clear events', e);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    fetchEvents();
    if (!autoRefresh) return;
    const interval = setInterval(fetchEvents, 2000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      {/* 1. Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#07080B]/80 border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Studio</span>
            </Link>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2">
              <img 
                src="/retake_logo.svg" 
                alt="Retake" 
                className="w-5 h-5 object-contain drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" 
              />
              <span className="font-extrabold tracking-tight text-white font-mono text-sm">RETAKE</span>
              <span className="text-slate-600 font-mono">/</span>
              <span className="text-xs font-semibold text-orange-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5" />
                <span>Mission Control</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClearEvents}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-xs font-medium text-slate-400 hover:text-red-300 transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Queue</span>
            </button>

            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${
                autoRefresh
                  ? 'bg-emerald-950/60 border-emerald-700/50 text-emerald-400'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
              <span>{autoRefresh ? 'Live (2s)' : 'Paused'}</span>
            </button>

            <button
              onClick={fetchEvents}
              disabled={isLoading}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Dashboard */}
      <main className="max-w-5xl mx-auto px-6 pt-28 pb-24 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-[#12141C] border border-white/10 space-y-1">
            <div className="text-xs font-semibold text-slate-400">Total Inbound</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.totalJobs}</div>
            <div className="text-[11px] text-slate-500">API jobs submitted</div>
          </div>

          <div className="p-5 rounded-3xl bg-[#12141C] border border-white/10 space-y-1">
            <div className="text-xs font-semibold text-orange-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span>Rendering Now</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-orange-300">{stats.activeJobs}</div>
            <div className="text-[11px] text-slate-500">In cloud pipeline</div>
          </div>

          <div className="p-5 rounded-3xl bg-[#12141C] border border-white/10 space-y-1">
            <div className="text-xs font-semibold text-emerald-400">Completed & Uploaded</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300">{stats.completedJobs}</div>
            <div className="text-[11px] text-slate-500">Available on CDN</div>
          </div>

          <div className="p-5 rounded-3xl bg-[#12141C] border border-white/10 space-y-1">
            <div className="text-xs font-semibold text-purple-400">Webhooks Fired</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-300">{stats.totalWebhooks}</div>
            <div className="text-[11px] text-slate-500">Real-time dispatches</div>
          </div>
        </div>

        {/* 3. Tab Switcher */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#12141C] border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                activeTab === 'jobs' ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Inbound Rendering Jobs</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {jobs.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('webhooks')}
              className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
                activeTab === 'webhooks' ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Outbound Webhook Stream</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                {webhooks.length}
              </span>
            </button>
          </div>

          {lastUpdated && (
            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              Updated at {lastUpdated}
            </div>
          )}
        </div>

        {/* 4. Tab A: Inbound Jobs Stream */}
        {activeTab === 'jobs' && (
          <div className="space-y-4">
            {jobs.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#12141C] border border-white/10 text-center space-y-3">
                <Video className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-sm font-semibold text-slate-300">No active or past rendering jobs</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Submit a job via your Resell app or the API to see live frame-by-frame progress here.
                </p>
              </div>
            ) : (
              jobs.map((job) => {
                const latestLog = job.lastLog || job.message || '';
                const remotionProgress = parseRemotionProgress(latestLog);
                const isProcessing = job.status === 'processing' || job.status === 'queued';

                return (
                  <div
                    key={job.jobId}
                    className="p-6 rounded-3xl bg-[#12141C] border border-white/10 hover:border-white/20 transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-bold text-white px-2.5 py-1 rounded-lg bg-[#1A1D2A] border border-white/5">
                          {job.jobId}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {job.styleCode || 'CHRON_STYLE_100'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {job.status === 'completed' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-700/50 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Completed</span>
                          </span>
                        )}
                        {job.status === 'processing' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-orange-950/60 border border-orange-700/50 text-orange-400 text-xs font-semibold flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                            <span>{job.stage || 'Rendering'} ({job.progress || 50}%)</span>
                          </span>
                        )}
                        {job.status === 'queued' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-700/50 text-purple-400 text-xs font-semibold flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Queued</span>
                          </span>
                        )}
                        {job.status === 'failed' && (
                          <span className="px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-700/50 text-red-400 text-xs font-semibold flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Failed</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Remotion Live Frame Progress Bar HUD */}
                    {isProcessing && remotionProgress && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-950/40 via-amber-950/20 to-transparent border border-orange-500/20 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
                            <span className="font-bold text-orange-300">
                              Rendered {remotionProgress.frameCurrent} / {remotionProgress.frameTotal} frames
                            </span>
                          </div>
                          <div className="text-slate-400 font-semibold">
                            {remotionProgress.percent}%
                            {remotionProgress.timeRemaining && (
                              <span className="text-orange-400/80 ml-2 font-normal">
                                ({remotionProgress.timeRemaining} left)
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden border border-white/10 p-0.5">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-400 transition-all duration-300 shadow-sm"
                            style={{ width: `${remotionProgress.percent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Input Source & Output CDN */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-2xl bg-[#0E1017] border border-white/5 space-y-1">
                        <div className="text-[11px] text-slate-500 font-medium">Input Video Source:</div>
                        <a
                          href={job.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-300 hover:text-white truncate block flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span className="truncate">{job.videoUrl}</span>
                          <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#0E1017] border border-white/5 space-y-1">
                        <div className="text-[11px] text-slate-500 font-medium">Cloudflare R2 Output:</div>
                        {job.videoUrl_r2 ? (
                          <a
                            href={job.videoUrl_r2}
                            target="_blank"
                            rel="noreferrer"
                            className="text-emerald-400 hover:underline truncate block flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span className="truncate">{job.videoUrl_r2}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </a>
                        ) : (
                          <span className="text-slate-500 font-mono text-[11px]">
                            {job.status === 'failed' ? 'Rendering Failed' : 'Pending upload...'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Live Terminal Output Accordion */}
                    <LiveJobTerminal jobId={job.jobId} isProcessing={isProcessing} />

                    {/* Error Box if Failed */}
                    {job.error && (
                      <div className="text-xs font-mono text-red-300 bg-red-950/40 p-3.5 rounded-2xl border border-red-800/40 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-red-400">
                          <AlertCircle className="w-4 h-4" />
                          <span>Pipeline Failure Details:</span>
                        </div>
                        <div className="text-[11px] leading-relaxed text-red-200/90">{job.error}</div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* 5. Tab B: Outbound Webhooks Stream */}
        {activeTab === 'webhooks' && (
          <div className="space-y-4">
            {webhooks.length === 0 ? (
              <div className="p-12 rounded-3xl bg-[#12141C] border border-white/10 text-center space-y-3">
                <Send className="w-8 h-8 text-slate-600 mx-auto" />
                <div className="text-sm font-semibold text-slate-300">No webhooks dispatched yet</div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When video jobs start, progress, and complete, real-time HTTP webhooks will be logged here.
                </p>
              </div>
            ) : (
              webhooks.map((wh) => (
                <div
                  key={wh.id}
                  className="p-5 rounded-3xl bg-[#12141C] border border-white/10 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold ${
                          wh.success
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                            : 'bg-red-950 text-red-400 border border-red-800/40'
                        }`}
                      >
                        {wh.statusCode || (wh.success ? 200 : 500)}
                      </span>
                      <span className="font-mono text-xs font-semibold text-white">
                        {wh.event}
                      </span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {wh.timeStr}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-slate-400 truncate">
                    <span className="text-slate-600 mr-1.5">Destination:</span>
                    {wh.destination}
                  </div>

                  <div className="bg-[#0A0B0E] p-3 rounded-2xl border border-white/5 font-mono text-[11px] text-slate-400 overflow-x-auto">
                    <pre className="leading-relaxed">
                      {JSON.stringify(wh.payload, null, 2)}
                    </pre>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
