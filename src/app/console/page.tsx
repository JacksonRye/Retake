'use client';

import React, { useState, useEffect } from 'react';
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
  ArrowRight
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
  const [expandedWebhookId, setExpandedWebhookId] = useState<string | null>(null);
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

  useEffect(() => {
    fetchEvents();
    if (!autoRefresh) return;
    const interval = setInterval(fetchEvents, 2500);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-orange-500/30">
      {/* 1. Floating Pill Navigation */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-5xl bg-[#131620]/80 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
                R
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white">RETAKE</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-orange-400" />
              <span>Mission Control</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClearEvents}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1A1D2A] hover:bg-[#252A3D] text-[11px] font-medium text-slate-400 hover:text-red-400 transition-colors border border-white/5"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Queue</span>
            </button>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                autoRefresh
                  ? 'bg-emerald-950/40 border-emerald-700/40 text-emerald-300'
                  : 'bg-[#1A1D2A] border-white/5 text-slate-400'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{autoRefresh ? 'Live (2.5s)' : 'Paused'}</span>
            </button>
            <button
              onClick={fetchEvents}
              disabled={isLoading}
              className="p-2 rounded-full bg-white hover:bg-slate-200 text-black transition-all shadow-sm"
              title="Refresh now"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </nav>
      </div>

      {/* 2. Main Content Container */}
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-8">
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
              jobs.map((job) => (
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

                  {/* Last Log Line if processing */}
                  {job.lastLog && (
                    <div className="text-[11px] font-mono text-slate-400 bg-[#0A0B0E] p-2.5 rounded-xl border border-white/5 truncate">
                      &gt; {job.lastLog}
                    </div>
                  )}

                  {/* Error if Failed */}
                  {job.error && (
                    <div className="text-xs font-mono text-red-300 bg-red-950/40 p-3 rounded-xl border border-red-800/40">
                      ⚠️ {job.error}
                    </div>
                  )}
                </div>
              ))
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
                  className="p-5 rounded-3xl bg-[#12141C] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold ${
                        wh.success
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/40'
                          : 'bg-red-950 text-red-400 border border-red-800/40'
                      }`}>
                        {wh.statusCode || (wh.success ? 200 : 500)}
                      </span>
                      <span className="font-bold text-white font-mono">{wh.event}</span>
                    </div>

                    <div className="text-slate-500 text-[11px] font-mono">
                      {wh.timeStr || new Date(wh.timestamp).toLocaleTimeString()}
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 font-mono truncate bg-[#0E1017] p-2.5 rounded-xl border border-white/5">
                    Destination: {wh.destination}
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
