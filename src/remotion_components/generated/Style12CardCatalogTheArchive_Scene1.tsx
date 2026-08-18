import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style12CardCatalogTheArchive_Scene1() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const drawerSlide = interpolate(frame, [0, 30], [-200, 0], { extrapolateRight: 'clamp' });
  const stampThunk = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 120 } });
  const opacity = interpolate(frame, [0, 10, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <div
        style={{
          width: 750,
          borderRadius: 24,
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
          backgroundColor: 'transparent',
          transform: `scale(${entranceSpring})`,
          opacity,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            backgroundColor: '#34558B',
            color: '#E8DCC0',
            padding: '4px 12px',
            borderRadius: 12,
            textTransform: 'uppercase',
            letterSpacing: 2,
            fontSize: 12,
          }}
        >
          CHRONIXEL • SCENE 01
        </div>
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            height: 300,
            backgroundColor: '#2B2B33',
            transform: `translateY(${drawerSlide}px)`,
            transition: 'transform 0.5s ease-out',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: 20,
          }}
        >
          <div
            style={{
              width: '90%',
              height: 40,
              backgroundColor: '#9C9480',
              marginBottom: 8,
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Courier, monospace',
              color: '#2B2B33',
              fontSize: 16,
            }}
          >
            <span>function automate() &#123; ... &#125;</span>
          </div>
          <div
            style={{
              width: '90%',
              height: 40,
              backgroundColor: '#9C9480',
              marginBottom: 8,
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Courier, monospace',
              color: '#2B2B33',
              fontSize: 16,
            }}
          >
            <span>const data = fetch('api/data');</span>
          </div>
          <div
            style={{
              width: '90%',
              height: 40,
              backgroundColor: '#9C9480',
              borderRadius: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Courier, monospace',
              color: '#2B2B33',
              fontSize: 16,
            }}
          >
            <span>export default function App() &#123; ... &#125;</span>
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            top: 180,
            left: '50%',
            transform: `translate(-50%, -50%) scale(${stampThunk})`,
            width: 100,
            height: 50,
            backgroundColor: '#C0392B',
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#E8DCC0',
            fontWeight: 'bold',
            fontSize: 14,
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        >
          STAMPED
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            color: '#2B2B33',
            fontSize: 28,
            fontWeight: 800,
            lineHeight: 1.2,
            fontFamily: 'Georgia, serif',
          }}
        >
          The Archive of Code
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            color: '#C0392B',
            fontSize: 16,
            fontFamily: 'Courier, monospace',
          }}
        >
          Unlock the Foundation
        </div>
      </div>
    </AbsoluteFill>
  );
}