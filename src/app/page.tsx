'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  X, 
  ArrowRight, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  Activity,
  Flame
} from 'lucide-react';

export default function CleanDarkMinimalLandingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0B0E] text-[#F3F4F6] font-sans antialiased selection:bg-orange-500/30">
      {/* 1. Floating Pill Navigation */}
      <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="w-full max-w-4xl bg-[#131620]/80 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs">
              R
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">RETAKE</span>
          </Link>

          <div className="hidden sm:flex items-center gap-7 text-xs font-medium text-slate-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#examples" className="hover:text-white transition-colors">Examples</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/console"
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
            >
              Console
            </Link>
            <a
              href="#pricing"
              className="bg-white hover:bg-slate-200 text-black text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Get 20 Videos ($49)</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </nav>
      </div>

      {/* 2. Hero Section */}
      <section className="pt-36 sm:pt-44 pb-20 px-6 max-w-4xl mx-auto text-center">
        {/* Simple Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-950/40 border border-orange-700/40 rounded-full px-3.5 py-1 mb-8 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-xs font-semibold text-orange-300">20 Videos for $49 • Instant AI Revisions</span>
        </div>

        {/* Grade-1 Direct Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
          Stop paying $1,000s <br className="hidden sm:block" />
          to slow video editors.
        </h1>

        {/* Dead Simple Copy */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          No headaches. No delays. No missed deadlines. <br className="hidden sm:block" />
          Our AI crafts high-retention videos like the ones going viral on our pages—<strong>20 videos for just $49</strong>.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <a
            href="#pricing"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-200 text-black font-bold text-sm shadow-xl shadow-white/10 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
          >
            <span>Claim 20 Videos for $49</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#examples"
            className="w-full sm:w-auto px-6 py-4 rounded-full bg-[#161922] hover:bg-[#1E2230] border border-white/10 text-slate-300 font-semibold text-sm transition-all"
          >
            Watch Examples
          </a>
        </div>

        {/* Clean Floating Video Showcase */}
        <div id="examples" className="relative max-w-xs sm:max-w-sm mx-auto rounded-[36px] p-2 bg-[#141722] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
          <div className="w-full h-[540px] bg-black rounded-[28px] overflow-hidden relative">
            <video
              src="https://pub-bea33d76a4cf463b85d029fde5a237b7.r2.dev/videos/resell_cloud_end_to_end_final_1787001591.mp4"
              controls
              playsInline
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pt-3 pb-1 text-center">
            <span className="text-xs font-semibold text-slate-400">
              ⚡ Made 100% autonomously in 58 seconds
            </span>
          </div>
        </div>
      </section>

      {/* 3. Dead Simple Comparison Table */}
      <section id="how-it-works" className="py-20 px-6 max-w-4xl mx-auto border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Why creators are switching
          </h2>
          <p className="text-sm text-slate-400">
            The old way of hiring human editors is slow, expensive, and stressful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* The Old Way */}
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/5 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
              <X className="w-4 h-4" />
              <span>Hiring Traditional Editors</span>
            </div>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Costs <strong>$1,000 to $2,500/month</strong> for basic edits</span>
              </div>
              <div className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Takes <strong>3 to 5 days</strong> just to get 1 draft</span>
              </div>
              <div className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Missed deadlines, excuses, and ghosting</span>
              </div>
              <div className="flex items-start gap-2.5">
                <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Fixing a typo takes another 24–48 hours</span>
              </div>
            </div>
          </div>

          {/* The Retake Way */}
          <div className="p-8 rounded-3xl bg-[#161924] border-2 border-white/20 shadow-xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>The Retake AI System</span>
            </div>
            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>20 Videos for $49</strong> (just $2.45 per video)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>Delivered in <strong>60 seconds</strong> on demand</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span><strong>Instant AI Revisions</strong>: Type what you want and it updates immediately</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>100% reliable 24/7 with zero headaches</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Dead Simple Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-base text-slate-400 max-w-lg mx-auto mb-8">
            Choose a plan. Cancel anytime with one click.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#141722] border border-white/10 text-xs font-semibold">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full transition-all ${
                !isAnnual ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full transition-all ${
                isAnnual ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual (2 Months Free)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Plan 1: Starter ($49/mo) */}
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Starter</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-extrabold text-white">
                  ${isAnnual ? '39' : '49'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Great for coaches and solo creators posting weekly videos.
              </p>

              <div className="space-y-3 py-6 border-t border-white/5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>20 AI Videos / month</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Instant AI Revisions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>1080p 60FPS High Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero Watermarks</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3 rounded-full bg-[#1E2230] hover:bg-[#282D40] text-xs font-bold text-white transition-all">
              Get Started ($49)
            </button>
          </div>

          {/* Plan 2: Pro ($97/mo) - Highlighted */}
          <div className="p-8 rounded-3xl bg-[#181B26] text-white border-2 border-orange-500/80 flex flex-col justify-between shadow-2xl relative transform md:-translate-y-2">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
              Most Popular
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-orange-300 mb-1">Pro Growth 🔥</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-5xl font-extrabold text-white">
                  ${isAnnual ? '79' : '97'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                For creators posting 2 videos every single day on social media.
              </p>

              <div className="space-y-3 py-6 border-t border-white/10 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span><strong>60 AI Videos / month</strong> (2/day)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Fast-Lane Priority Cloud Rendering</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Instant AI Natural Language Revisions</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />
                  <span>Custom Fonts & Brand Colors</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 text-xs font-bold text-white transition-all shadow-md">
              Start Pro ($97)
            </button>
          </div>

          {/* Plan 3: Agency ($297/mo) */}
          <div className="p-8 rounded-3xl bg-[#12141C] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Agency</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-extrabold text-white">
                  ${isAnnual ? '249' : '297'}
                </span>
                <span className="text-xs text-slate-400">/ month</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                For agencies and podcast studios handling multiple clients.
              </p>

              <div className="space-y-3 py-6 border-t border-white/5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span><strong>200 AI Videos / month</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>5 Client Workspaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Dedicated Cloud Instance</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Direct Webhook API Access</span>
                </div>
              </div>
            </div>

            <button className="w-full py-3 rounded-full bg-[#1E2230] hover:bg-[#282D40] text-xs font-bold text-white transition-all">
              Choose Agency ($297)
            </button>
          </div>
        </div>
      </section>

      {/* 5. Minimal Clean Footer */}
      <footer className="py-12 border-t border-white/5 text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center text-[10px]">R</div>
            <span>RETAKE</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/studio" className="hover:text-white transition-colors">Studio</Link>
            <Link href="/console" className="hover:text-white transition-colors">Console</Link>
            <Link href="/sampler" className="hover:text-white transition-colors">Styles</Link>
          </div>

          <div>
            © {new Date().getFullYear()} Retake. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
