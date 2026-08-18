import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style29ThreadAnatomyPostMortem_Scene4() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const scaleSpring = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 10, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
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
      }}>
        <div style={{
          backgroundColor: '#1D9BF0',
          borderRadius: '9999px',
          padding: '6px 12px',
          color: '#E7E9EA',
          fontSize: '12px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          CHRONIXEL • SCENE 04
        </div>
        <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '16px' }}>
          <svg width="100%" height="100%" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="20" stroke="#1D9BF0" strokeWidth="3" />
            <circle cx="300" cy="100" r="20" stroke="#F91880" strokeWidth="3" />
            <circle cx="500" cy="100" r="20" stroke="#00BA7C" strokeWidth="3" />
            <path d="M120 100 C200 50, 400 50, 480 100" stroke="#E7E9EA" strokeWidth="2" />
            <path d="M320 100 C400 150, 600 150, 680 100" stroke="#F91880" strokeWidth="2" strokeDasharray="5 5" />
          </svg>
        </div>
        <div style={{
          fontSize: '32px',
          fontWeight: 800,
          lineHeight: 1.2,
          color: '#E7E9EA',
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          Unraveling the Threads of No-Code
        </div>
        <div style={{
          fontSize: '18px',
          color: '#00BA7C',
          textAlign: 'center',
        }}>
          Discover the limitations and unlock creative potential.
        </div>
      </div>
    </AbsoluteFill>
  );
}