import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style12CardCatalogTheArchive_Scene3() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const cardFlySpring = spring({ frame: frame - 15, fps, config: { damping: 10, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 10, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          width: '750px',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '20px',
          transform: `scale(${entranceSpring})`,
          opacity,
        }}
      >
        {/* Tier 1: Header Pill Badge */}
        <div
          style={{
            backgroundColor: 'transparent',
            borderRadius: '12px',
            padding: '5px 15px',
            display: 'inline-block',
            marginBottom: '20px',
            color: '#2B2B33',
            fontSize: '14px',
            fontWeight: 'bold',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          CHRONIXEL • SCENE 03
        </div>

        {/* Tier 2: Hero Graphic Zone */}
        <div style={{ position: 'relative', height: '300px', marginBottom: '20px' }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 300"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `scale(${cardFlySpring})`,
            }}
          >
            <rect x="50" y="50" width="200" height="100" fill="#E8DCC0" stroke="#34558B" strokeWidth="2" />
            <rect x="300" y="100" width="200" height="100" fill="#C0392B" stroke="#34558B" strokeWidth="2" />
            <rect x="550" y="150" width="200" height="100" fill="#2B2B33" stroke="#34558B" strokeWidth="2" />
            <text
              x="400"
              y="200"
              fill="#E8DCC0"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
              style={{ fontFamily: 'serif' }}
            >
              Glowing Codex
            </text>
          </svg>
        </div>

        {/* Tier 3: Typographic Headline & Unlock Note */}
        <div style={{ textAlign: 'center', color: '#2B2B33' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '800', lineHeight: '1.2', marginBottom: '10px' }}>
            The Archive of Innovation
          </h1>
          <p style={{ color: '#C0392B', fontSize: '18px', fontStyle: 'italic' }}>
            Unlocking the potential of code as the backbone of technology.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
}