import React from 'react';
import { AbsoluteFill } from 'remotion';

export default function YouTubeBanner() {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#07080B',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* 1. Subtle Dark Tech Grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(249, 115, 22, 0.22)" strokeWidth="1.2" />
          </pattern>
          <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.40)" />
            <stop offset="40%" stopColor="rgba(249, 115, 22, 0.12)" />
            <stop offset="100%" stopColor="rgba(7, 8, 11, 0)" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.6" />
        <rect width="100%" height="100%" fill="url(#ambientGlow)" />
      </svg>

      {/* 2. Center Safe Zone Assembly (Calibrated to 320px height for perfect mobile & desktop crop) */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          zIndex: 10,
        }}
      >
        {/* Crisp Vector R Logo Mark */}
        <svg
          width="240"
          height="190"
          viewBox="0 0 500 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: 'drop-shadow(0px 0px 30px rgba(249, 115, 22, 0.8)) drop-shadow(0px 0px 80px rgba(249, 115, 22, 0.45))',
          }}
        >
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="35%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>

          {/* Top Aerodynamic Arm */}
          <path
            d="M 90 60 L 330 60 C 400 60 440 95 440 150 C 440 205 400 235 350 235 L 305 235 L 340 150 L 195 150 L 90 60 Z"
            fill="url(#logoGrad)"
          />

          {/* Bottom Folded Leg */}
          <path
            d="M 175 150 C 120 150 95 190 95 245 L 95 340 L 170 340 L 170 250 C 170 220 190 205 220 205 L 345 340 L 450 340 L 290 205 L 220 150 Z"
            fill="url(#logoGrad)"
          />
        </svg>

        {/* Razor-Sharp RETAKE Typography */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            letterSpacing: '0.14em',
            color: '#FFFFFF',
            textTransform: 'uppercase',
            lineHeight: 1,
            textShadow: '0px 0px 30px rgba(249, 115, 22, 0.7), 0px 4px 16px rgba(0, 0, 0, 0.9)',
          }}
        >
          RETAKE
        </div>

        {/* Crisp Subtitle One-Liner */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: '#FED7AA',
            opacity: 0.98,
            lineHeight: 1,
            textShadow: '0px 2px 10px rgba(0,0,0,0.9)',
          }}
        >
          Viral videos in 1 minute. No editors.
        </div>
      </div>
    </AbsoluteFill>
  );
}
