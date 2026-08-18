'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Search, 
  Heart, 
  Copy, 
  Check, 
  ExternalLink, 
  Sliders, 
  ArrowRight,
  Layers,
  Activity,
  Maximize2,
  X
} from 'lucide-react';

interface StyleManifestItem {
  style_code: string;
  name: string;
  best_for: string;
  palette: string[];
  component_name: string;
  preview_image: string;
  success: boolean;
}

export default function StyleSamplerPage() {
  const [items, setItems] = useState<StyleManifestItem[]>([]);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<StyleManifestItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    fetch('/sampler_manifest.json')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    try {
      const savedFavs = localStorage.getItem('saas_video_fav_styles');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleFavorite = (styleCode: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    let updated: string[];
    if (favorites.includes(styleCode)) {
      updated = favorites.filter((id) => id !== styleCode);
    } else {
      updated = [...favorites, styleCode];
    }
    setFavorites(updated);
    try {
      localStorage.setItem('saas_video_fav_styles', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filtered = items.filter((it) => {
    const matchesSearch =
      it.style_code.toLowerCase().includes(search.toLowerCase()) ||
      it.name.toLowerCase().includes(search.toLowerCase()) ||
      (it.best_for && it.best_for.toLowerCase().includes(search.toLowerCase()));

    if (activeTab === 'favorites') {
      return matchesSearch && favorites.includes(it.style_code);
    }
    return matchesSearch;
  });

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
              <Sliders className="w-3.5 h-3.5 text-orange-400" />
              <span>60-Style Sampler</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/console"
              className="text-xs font-medium text-slate-400 hover:text-white transition-colors px-2 py-1"
            >
              Console
            </Link>
            <Link
              href="/studio"
              className="bg-white hover:bg-slate-200 text-black text-xs font-semibold px-4 py-2 rounded-full transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </nav>
      </div>

      {/* 2. Main Gallery Container */}
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24 space-y-8">
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
              Animation Style Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Browse 60 kinetic styles. Click any preview card to enlarge or launch in Studio.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search styles, keywords..."
                className="bg-[#12141C] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all w-48 sm:w-60"
              />
            </div>

            {/* Favorites Toggle */}
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#12141C] border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-full transition-all ${
                  activeTab === 'all' ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({items.length})
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                  activeTab === 'favorites' ? 'bg-white text-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                <span>Saved ({favorites.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Styles Grid */}
        {loading ? (
          <div className="p-16 text-center text-xs font-mono text-slate-500">
            Loading animation catalog...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#12141C] border border-white/10 text-center space-y-2">
            <Sliders className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-sm font-semibold text-slate-300">No matching styles found</div>
            <p className="text-xs text-slate-500">Try searching for a different keyword or view all styles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => {
              const isFav = favorites.includes(item.style_code);
              return (
                <div
                  key={item.style_code}
                  className="rounded-3xl bg-[#12141C] border border-white/10 hover:border-white/20 transition-all overflow-hidden flex flex-col justify-between shadow-sm group"
                >
                  {/* Visual Image Preview Thumbnail */}
                  <div 
                    onClick={() => setSelectedPreview(item)}
                    className="relative aspect-[9/16] w-full bg-black cursor-pointer overflow-hidden max-h-[300px]"
                  >
                    {item.preview_image ? (
                      <img
                        src={item.preview_image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-mono">
                        No Preview
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent opacity-80" />

                    {/* Floating Badges on Image */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-mono text-[11px] font-bold text-white px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10">
                        {item.style_code}
                      </span>
                      <button
                        onClick={(e) => toggleFavorite(item.style_code, e)}
                        className={`p-1.5 rounded-full backdrop-blur-md border transition-all ${
                          isFav
                            ? 'bg-red-950/80 border-red-800/80 text-red-400'
                            : 'bg-black/60 border-white/10 text-white/80 hover:text-white'
                        }`}
                        title={isFav ? 'Remove from saved' : 'Save style'}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-red-400' : ''}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-md p-1.5 rounded-full border border-white/20 text-white">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-white tracking-tight">{item.name}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        {item.best_for || 'High-retention social video typography.'}
                      </p>

                      {/* Color Palette Swatches */}
                      {item.palette && item.palette.length > 0 && (
                        <div className="flex items-center gap-1.5 pt-2">
                          {item.palette.slice(0, 5).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-3.5 h-3.5 rounded-full border border-white/10 shadow-xs"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Action Buttons */}
                    <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                      <button
                        onClick={() => copyToClipboard(item.style_code, item.style_code)}
                        className="flex-1 py-2 rounded-xl bg-[#181B26] hover:bg-[#222736] text-[11px] font-mono text-slate-300 flex items-center justify-center gap-1.5 border border-white/5 transition-all"
                      >
                        {copiedCode === item.style_code ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-slate-400" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={`/studio?style=${item.style_code}`}
                        className="py-2 px-3 rounded-xl bg-white hover:bg-slate-200 text-black font-bold text-[11px] flex items-center gap-1 transition-all shadow-sm"
                      >
                        <span>Studio</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 4. Fullscreen Preview Lightbox Modal */}
      {selectedPreview && (
        <div 
          onClick={() => setSelectedPreview(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full bg-[#12141C] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-4 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-black/60">
                {selectedPreview.style_code}
              </span>
              <button 
                onClick={() => setSelectedPreview(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full aspect-[9/16] bg-black rounded-2xl overflow-hidden">
              <img
                src={selectedPreview.preview_image}
                alt={selectedPreview.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-sm text-white">{selectedPreview.name}</h4>
              <p className="text-xs text-slate-400">{selectedPreview.best_for}</p>
            </div>

            <div className="flex gap-2">
              <Link
                href={`/studio?style=${selectedPreview.style_code}`}
                className="flex-1 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black font-bold text-xs text-center transition-all"
              >
                Launch in Studio
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
