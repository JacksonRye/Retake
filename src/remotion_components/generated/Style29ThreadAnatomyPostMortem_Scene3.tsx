import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion';

export default function Style29ThreadAnatomyPostMortem_Scene3() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const scaleSpring = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 10, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
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
      }}>
        <div style={{
          backgroundColor: '#1D9BF0',
          borderRadius: '12px',
          padding: '8px 16px',
          color: '#E7E9EA',
          fontSize: '12px',
          fontWeight: 'bold',
          letterSpacing: '2px',
          textAlign: 'center',
          marginBottom: '16px',
        }}>
          CHRONIXEL • SCENE 03
        </div>
        <div style={{ position: 'relative', height: '300px', marginBottom: '16px' }}>
          <svg width="100%" height="100%" viewBox="0 0 750 300">
            <path
              d="M50,250 Q150,100 250,150 T450,100 T650,200"
              fill="none"
              stroke="#1D9BF0"
              strokeWidth="3"
              strokeDasharray="10"
              style={{
                strokeDashoffset: interpolate(frame, [0, 30], [300, 0]),
                opacity,
              }}
            />
            <path
              d="M50,250 C150,300 250,200 350,250 S550,350 650,250"
              fill="none"
              stroke="#F91880"
              strokeWidth="3"
              strokeDasharray="10"
              style={{
                strokeDashoffset: interpolate(frame, [0, 30], [300, 0]),
                opacity,
              }}
            />
            <circle
              cx="650"
              cy="250"
              r="10"
              fill="#00BA7C"
              style={{
                transform: `scale(${scaleSpring})`,
                transformOrigin: 'center',
                opacity,
              }}
            />
          </svg>
        </div>
        <div style={{
          fontSize: '32px',
          fontWeight: '800',
          lineHeight: '1.2',
          color: '#E7E9EA',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
          The Hidden Complexity of No-Code Tools
        </div>
        <div style={{
          fontSize: '16px',
          color: '#F91880',
          textAlign: 'center',
        }}>
          As simplicity fades, true coding skills emerge.
        </div>
      </div>
    </AbsoluteFill>
  );
}