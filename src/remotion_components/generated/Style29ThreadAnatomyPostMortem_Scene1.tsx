import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style29ThreadAnatomyPostMortem_Scene1() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const scaleSpring = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 120 } });
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
          backgroundColor: 'transparent',
          transform: `scale(${entranceSpring})`,
          opacity,
          padding: '20px',
        }}
      >
        {/* Tier 1: Header Pill Badge */}
        <div
          style={{
            backgroundColor: '#1D9BF0',
            color: '#E7E9EA',
            padding: '6px 12px',
            borderRadius: '12px',
            textAlign: 'center',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontSize: '12px',
            marginBottom: '20px',
          }}
        >
          CHRONIXEL • SCENE 01
        </div>

        {/* Tier 2: Hero Graphic Zone */}
        <div style={{ position: 'relative', height: '300px', marginBottom: '20px' }}>
          {/* Conveyor Belt */}
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '20px',
              backgroundColor: '#00BA7C',
              borderRadius: '10px',
            }}
          />
          {/* Gears and Cogs */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${scaleSpring})`,
            }}
          >
            <circle cx="50" cy="50" r="40" stroke="#F91880" strokeWidth="4" fill="none" />
            <circle cx="150" cy="150" r="30" stroke="#1D9BF0" strokeWidth="4" fill="none" />
            {/* Additional animated elements can be added here */}
          </svg>
        </div>

        {/* Tier 3: Typographic Headline & Unlock Note */}
        <div style={{ textAlign: 'center', color: '#E7E9EA' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.2, margin: 0 }}>
            Unveiling the Code Behind No-Code
          </h1>
          <p style={{ fontSize: '18px', color: '#1D9BF0', marginTop: '10px' }}>
            Discover the hidden complexity powering simplicity.
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
}