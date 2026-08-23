'use client';

import React, { useState } from 'react';
import { Sparkles, X, Mail, Check, RefreshCw, Lock } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
  userEmail?: string;
}

export default function WaitlistModal({
  isOpen,
  onClose,
  defaultPlan = '20 Video Credits ($49)',
  userEmail = '',
}: WaitlistModalProps) {
  const [email, setEmail] = useState(userEmail);
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: selectedPlan, note }),
      });
      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(data.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#12141C] border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.8)] space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
              <Check className="w-7 h-7" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold text-white">You&apos;re on the Priority List!</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Thank you! We received your request. We will notify you directly at <span className="text-orange-400 font-semibold">{email}</span> the moment commercial checkout goes live.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-black text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Back to Studio
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-700/50 text-[11px] font-semibold text-orange-300">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Commercial Beta • Priority Access</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Unlock Commercial Video Packs
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We are currently processing video batches in early access. Join the priority waitlist to lock in your account and receive early access when checkout opens.
              </p>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/60 border border-red-800/50 text-red-300 text-xs">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Your Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@company.com"
                    className="w-full bg-[#0E1017] border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Desired Plan / Credit Pack</label>
                <select
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-[#0E1017] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white/30 transition-all cursor-pointer"
                >
                  <option value="Starter: 20 Videos ($49)">Starter: 20 Videos ($49)</option>
                  <option value="Pro: 60 Videos / mo ($97)">Pro: 60 Videos / mo ($97)</option>
                  <option value="Agency: 200 Videos / mo ($297)">Agency: 200 Videos / mo ($297)</option>
                  <option value="Custom Batch / Enterprise API">Custom Batch / Enterprise API</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Notes / Use Case <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g., I have 30 YouTube Shorts to convert for my agency clients"
                  className="w-full bg-[#0E1017] border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white/30 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Reserving your spot...</span>
                  </>
                ) : (
                  <>
                    <span>Join Priority Waitlist</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
