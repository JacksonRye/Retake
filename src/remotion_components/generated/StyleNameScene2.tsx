import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function StyleNameScene2() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Spring for entrance and exit animations
  const entranceSpring = spring({
    frame,
    fps,
    from: -100,
    to: 0,
    config: {
      damping: 10,
    },
  });

  const exitSpring = spring({
    frame: frame - durationInFrames + 30,
    fps,
    from: 0,
    to: 100,
    config: {
      damping: 10,
    },
  });

  const translateY = interpolate(frame, [0, durationInFrames - 30], [entranceSpring, exitSpring]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        transform: `translateY(${translateY}px)`,
      }}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} style={{
            width: '100px',
            height: '100px',
            backgroundColor: index % 2 === 0 ? '#4A90E2' : '#50E3C2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: 'transparent',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            }} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}