import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from './constants';
import {HUDBackground} from './HUD';

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Typewriter effect for terminal text
  const fullText = "TARGET: 11,000,000 FOLLOWERS ACQUIRED";
  const charsCount = Math.floor(
    interpolate(frame, [15, fps * 3], [0, fullText.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const displayedText = fullText.slice(0, charsCount);

  // Warning Badge drop animation using spring physics
  const dropSpring = spring({
    frame: frame - fps * 3.2,
    fps,
    config: {damping: 12, stiffness: 100},
  });

  const warningY = interpolate(dropSpring, [0, 1], [-200, 0]);
  const warningOpacity = interpolate(dropSpring, [0, 0.2], [0, 1], {extrapolateRight: 'clamp'});

  // Alert pulse for warning badge
  const alertPulse = Math.sin(frame * 0.3) * 0.3 + 0.7;

  // Waveform bars animation
  const bars = [40, 70, 30, 90, 60, 100, 45, 80, 55, 95, 30, 75, 50, 85];

  return (
    <HUDBackground title="PHASE 01 // OVERNIGHT METRIC DISRUPTION">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Main Terminal Glass Panel */}
        <div style={{
          width: 1400,
          padding: '60px 80px',
          background: 'rgba(31, 41, 55, 0.4)',
          backdropFilter: 'blur(16px)',
          border: `2px solid ${COLORS.cyanData}`,
          borderRadius: 16,
          boxShadow: `0 0 50px rgba(34, 211, 238, 0.25), inset 0 0 30px rgba(34, 211, 238, 0.1)`,
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Top Panel Header */}
          <div style={{
            display: 'flex',
            justify: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
            paddingBottom: 20,
            marginBottom: 40
          }}>
            <div style={{display: 'flex', gap: 12}}>
              <div style={{width: 14, height: 14, borderRadius: '50%', background: COLORS.redAlert}} />
              <div style={{width: 14, height: 14, borderRadius: '50%', background: COLORS.amberCRT}} />
              <div style={{width: 14, height: 14, borderRadius: '50%', background: COLORS.cyanData}} />
            </div>
            <div style={{fontFamily: FONTS.mono, fontSize: 18, color: 'rgba(255, 255, 255, 0.5)', letterSpacing: 2}}>
              NODE_ID: WORLD_CUP_VIRAL_ENGRAM
            </div>
          </div>

          {/* Typewriter Main Code / Headline */}
          <div style={{
            fontFamily: FONTS.mono,
            fontSize: 48,
            fontWeight: 'bold',
            color: COLORS.amberCRT,
            textShadow: `0 0 20px rgba(255, 179, 0, 0.6)`,
            minHeight: 120,
            display: 'flex',
            alignItems: 'center',
            letterSpacing: 2
          }}>
            <span style={{color: COLORS.cyanData, marginRight: 20}}>&gt;</span>
            <span>{displayedText}</span>
            <span style={{
              display: 'inline-block',
              width: 24,
              height: 48,
              backgroundColor: COLORS.amberCRT,
              marginLeft: 10,
              opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0
            }} />
          </div>

          {/* Real-time Telemetry Spectrum Analyzer */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: 12,
            height: 60,
            marginTop: 30,
            paddingTop: 20,
            borderTop: `1px dashed rgba(34, 211, 238, 0.3)`
          }}>
            <span style={{fontSize: 14, color: COLORS.cyanData, marginRight: 20}}>AUDIO TRANSMISSION MATRIX:</span>
            {bars.map((h, i) => {
              const animatedH = Math.max(10, Math.sin(frame * 0.2 + i) * (h / 2) + h / 2);
              return (
                <div
                  key={i}
                  style={{
                    width: 16,
                    height: `${animatedH}%`,
                    backgroundColor: i % 3 === 0 ? COLORS.amberCRT : COLORS.cyanData,
                    boxShadow: `0 0 10px ${i % 3 === 0 ? COLORS.amberCRT : COLORS.cyanData}`,
                    borderRadius: 4,
                    transition: 'height 0.1s ease'
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Floating Warning Badge (Drops in after terminal completes) */}
        {frame > fps * 3 && (
          <div style={{
            position: 'absolute',
            top: 40,
            transform: `translateY(${warningY}px)`,
            opacity: warningOpacity,
            background: 'rgba(255, 59, 48, 0.15)',
            backdropFilter: 'blur(20px)',
            border: `3px solid ${COLORS.redAlert}`,
            borderRadius: 16,
            padding: '24px 60px',
            display: 'flex',
            alignItems: 'center',
            gap: 30,
            boxShadow: `0 0 60px rgba(255, 59, 48, ${alertPulse * 0.8})`,
          }}>
            {/* Warning Hazard Icon */}
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke={COLORS.redAlert} strokeWidth="2.5">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <div style={{
                fontFamily: FONTS.impact,
                fontSize: 42,
                color: '#FFF',
                letterSpacing: 3,
                textTransform: 'uppercase'
              }}>
                REASON COUNT: <span style={{color: COLORS.redAlert}}>03 CRITICAL FACTORS</span>
              </div>
              <div style={{fontFamily: FONTS.mono, fontSize: 16, color: COLORS.redAlert, marginTop: 4}}>
                ANALYZING ANOMALY DATASET...
              </div>
            </div>
          </div>
        )}
      </div>
    </HUDBackground>
  );
};
