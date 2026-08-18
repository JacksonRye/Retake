import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style12CardCatalogTheArchive_Scene5() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const scaleSpring = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 10, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <div style={{
        width: 750,
        borderRadius: 24,
        border: '1px solid rgba(255,255,255,0.15)',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: `scale(${entranceSpring})`,
        opacity,
        padding: 20,
      }}>
        {/* Tier 1: Header Pill Badge */}
        <div style={{
          backgroundColor: 'transparent',
          color: '#E8DCC0',
          padding: '4px 12px',
          borderRadius: 16,
          fontSize: 12,
          fontWeight: 'bold',
          letterSpacing: 2,
          textAlign: 'center',
          marginBottom: 16,
        }}>
          CHRONIXEL • SCENE 05
        </div>

        {/* Tier 2: Hero Graphic Zone */}
        <div style={{ position: 'relative', height: 200, marginBottom: 16 }}>
          <svg width="100%" height="100%" viewBox="0 0 750 200" style={{ transform: `scale(${scaleSpring})` }}>
            <rect x="50" y="40" width="650" height="120" rx="10" fill="#2B2B33" />
            <circle cx="200" cy="100" r="20" fill="#C0392B" />
            <circle cx="300" cy="100" r="20" fill="#C0392B" />
            <circle cx="400" cy="100" r="20" fill="#C0392B" />
            <line x1="200" y1="100" x2="300" y2="100" stroke="#9C9480" strokeWidth="3" />
            <line x1="300" y1="100" x2="400" y2="100" stroke="#9C9480" strokeWidth="3" />
            <text x="50%" y="50%" fill="#E8DCC0" fontSize="24" fontFamily="Courier New" textAnchor="middle" alignmentBaseline="middle">
              NO CODE LIMITATIONS
            </text>
          </svg>
        </div>

        {/* Tier 3: Typographic Headline & Unlock Note */}
        <div style={{ textAlign: 'center', color: '#2B2B33' }}>
          <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>
            Unlock the Puzzle of Creativity
          </div>
          <div style={{ fontSize: 18, color: '#C0392B' }}>
            Creativity is bound by pre-existing code.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}