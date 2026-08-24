'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Player } from '@remotion/player';
import { Sparkles, ArrowLeft, Zap, CheckCircle2 } from 'lucide-react';

import SceneModel35 from '@/remotion_components/comparisons/SceneModel35';
import SceneModel36 from '@/remotion_components/comparisons/SceneModel36';
import SceneModel37 from '@/remotion_components/comparisons/SceneModel37';

const MODELS = [
  {
    id: '3.5',
    name: 'Gemini 3.5 Flash',
    tag: '⭐ RECOMMENDED BEST VALUE',
    costPerVideo: '£0.0029',
    perPound: '349 videos / £1',
    component: SceneModel35,
    speed: '28s',
    highlight: 'border-emerald-500/80 bg-emerald-950/20 text-emerald-300',
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  {
    id: '3.6',
    name: 'Gemini 3.6 Flash',
    tag: 'STANDARD FLASH',
    costPerVideo: '£0.0026',
    perPound: '385 videos / £1',
    component: SceneModel36,
    speed: '28s',
    highlight: 'border-blue-500/60 bg-blue-950/20 text-blue-300',
    badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  {
    id: '3.7',
    name: 'Gemini 3.7 / 3 Flash',
    tag: 'HIGH-TIER FLASH',
    costPerVideo: '£0.0035',
    perPound: '285 videos / £1',
    component: SceneModel37,
    speed: '31s',
    highlight: 'border-purple-500/60 bg-purple-950/20 text-purple-300',
    badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
  },
];

export default function ModelComparePage() {
  const [activeTab, setActiveTab] = useState<'trio' | '3.5' | '3.6' | '3.7'>('trio');

  return (
    <div className="min-h-screen bg-[#07080B] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="h-16 border-b border-white/5 bg-[#0D0F15]/90 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link
            href="/studio"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Studio</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Model Quality & Cost Arena
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-[#141722] p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('trio')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === 'trio' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Side-by-Side (3-Way)
            </button>
            <button
              onClick={() => setActiveTab('3.5')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === '3.5' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              3.5 Flash
            </button>
            <button
              onClick={() => setActiveTab('3.6')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === '3.6' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              3.6 Flash
            </button>
            <button
              onClick={() => setActiveTab('3.7')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                activeTab === '3.7' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              3.7 Flash
            </button>
          </div>
        </div>
      </header>

      {/* Script banner */}
      <div className="bg-[#12141C] border-b border-white/5 py-3 px-6 text-center text-xs text-slate-300">
        <span className="text-orange-400 font-bold uppercase tracking-wider mr-2">Tested Script:</span>
        <em>"The two hours you spend scrolling each day, or 730 hours each year, could have produced a book, a business, or a body you don't currently have."</em>
      </div>

      {/* Main Comparison Stage */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {activeTab === 'trio' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODELS.map((m) => {
              const Comp = m.component;
              return (
                <div
                  key={m.id}
                  className={`rounded-3xl border ${m.highlight} p-4 flex flex-col items-center bg-[#0D0F15] shadow-2xl relative`}
                >
                  {/* Model Header */}
                  <div className="w-full flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-extrabold text-white">{m.name}</h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${m.badge}`}>
                        {m.tag}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-white">{m.costPerVideo}</div>
                      <div className="text-[10px] text-slate-400">{m.perPound}</div>
                    </div>
                  </div>

                  {/* Vertical Video Viewport */}
                  <div className="w-full aspect-[9/16] max-h-[520px] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-inner relative">
                    <Player
                      component={Comp}
                      durationInFrames={135}
                      compositionWidth={1080}
                      compositionHeight={1920}
                      fps={30}
                      controls
                      loop
                      autoPlay
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>

                  {/* Metrics Footer */}
                  <div className="w-full mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span>Speed: {m.speed}</span>
                    <span className="text-emerald-400 flex items-center gap-1 font-sans">
                      <CheckCircle2 className="w-3 h-3" /> 100% Remotion TSX
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Single Focus View
          <div className="flex flex-col items-center justify-center max-w-md mx-auto">
            {(() => {
              const m = MODELS.find((item) => item.id === activeTab) || MODELS[0];
              const Comp = m.component;
              return (
                <div className={`w-full rounded-3xl border ${m.highlight} p-5 bg-[#0D0F15] shadow-2xl`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white">{m.name}</h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${m.badge}`}>
                        {m.tag}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-bold text-white">{m.costPerVideo} / video</div>
                      <div className="text-xs text-slate-400">{m.perPound}</div>
                    </div>
                  </div>

                  <div className="w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-inner">
                    <Player
                      component={Comp}
                      durationInFrames={135}
                      compositionWidth={1080}
                      compositionHeight={1920}
                      fps={30}
                      controls
                      loop
                      autoPlay
                      style={{
                        width: '100%',
                        height: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
}
