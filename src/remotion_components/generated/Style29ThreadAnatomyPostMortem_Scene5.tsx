import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion';

export default function Style29ThreadAnatomyPostMortem_Scene5() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const scaleSpring = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 10, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <div
        style={{
          width: '750px',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'transparent',
          transform: `scale(${entranceSpring})`,
          opacity,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Tier 1: Header Pill Badge */}
        <div
          style={{
            backgroundColor: '#1D9BF0',
            borderRadius: '9999px',
            padding: '6px 12px',
            color: '#E7E9EA',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          CHRONIXEL • SCENE 05
        </div>

        {/* Tier 2: Hero Graphic Zone */}
        <svg
          width="100%"
          height="200px"
          viewBox="0 0 800 200"
          style={{ marginBottom: '16px', transform: `scale(${scaleSpring})`, opacity }}
        >
          <rect x="100" y="50" width="600" height="100" rx="20" fill="#1D9BF0" />
          <circle cx="400" cy="100" r="50" fill="#F91880" />
          <path d="M150 100 L650 100" stroke="#00BA7C" strokeWidth="4" strokeDasharray="8 4" />
          <text x="400" y="110" fill="#E7E9EA" fontSize="24" fontWeight="bold" textAnchor="middle">
            Puzzle Assembly
          </text>
        </svg>

        {/* Tier 3: Typographic Headline & Unlock Note */}
        <div style={{ textAlign: 'center', color: '#E7E9EA' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.2, marginBottom: '8px' }}>
            Unlock Your Creativity
          </h1>
          <p style={{ fontSize: '16px', color: '#00BA7C' }}>
            Build from scratch, embrace innovation.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
}