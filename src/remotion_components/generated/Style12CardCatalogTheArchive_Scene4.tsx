import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style12CardCatalogTheArchive_Scene4() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const scaleSpring = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 10, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <div
        style={{
          width: 700,
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
            backgroundColor: 'transparent',
            borderRadius: 12,
            padding: '4px 12px',
            color: '#E8DCC0',
            fontSize: 14,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 16,
          }}
        >
          CHRONIXEL • SCENE 04
        </div>

        {/* Tier 2: Hero Graphic Zone */}
        <div style={{ position: 'relative', width: '100%', height: 200, marginBottom: 16 }}>
          <svg width="100%" height="100%" viewBox="0 0 700 200">
            <rect x="10" y="10" width="680" height="180" rx="12" ry="12" fill="#2B2B33" />
            <text x="50%" y="50%" fill="#E8DCC0" fontSize="24" fontWeight="bold" textAnchor="middle" dy=".3em">
              No Code Tools
            </text>
            <g transform={`translate(${interpolate(frame, [0, durationInFrames], [0, -100])}, 0)`}>
              <rect x="20" y="20" width="660" height="160" rx="8" ry="8" fill="#34558B" opacity="0.5" />
              <text x="50%" y="50%" fill="#9C9480" fontSize="18" textAnchor="middle" dy=".3em">
                {`<div>Code</div>`}
              </text>
            </g>
          </svg>
        </div>

        {/* Tier 3: Typographic Headline & Unlock Note */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              lineHeight: 1.2,
              color: '#2B2B33',
              marginBottom: 8,
            }}
          >
            Unlock the Power of No Code
          </h1>
          <p style={{ fontSize: 18, color: '#C0392B' }}>
            Discover the hidden complexity beneath the surface.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
}