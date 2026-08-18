import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from './constants';
import {HUDBackground} from './HUD';

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Map zoom animation
  const mapScale = interpolate(frame, [0, fps * 4], [1, 3], {
    extrapolateRight: 'clamp',
  });

  // Population count up to 200,000 limit
  const showStats = frame > fps * 2;

  return (
    <HUDBackground title="PHASE 05 // UNDERDOG POPULATION MATRIX">
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 60,
        padding: '0 40px'
      }}>
        {/* Topographic Location Grid Window */}
        <div style={{
          width: 600,
          height: 600,
          background: 'rgba(10, 14, 26, 0.8)',
          border: `2px solid ${COLORS.cyanData}`,
          borderRadius: 16,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 0 40px rgba(34, 211, 238, 0.2)`
        }}>
          {/* Zooming Topological Grid SVG */}
          <svg
            width="600"
            height="600"
            viewBox="0 0 600 600"
            style={{
              position: 'absolute',
              transform: `scale(${mapScale})`,
              transformOrigin: '50% 50%'
            }}
          >
            {/* Island Contours */}
            <path
              d="M 250 220 Q 320 180 380 250 T 310 380 T 220 300 Z"
              fill="rgba(34, 211, 238, 0.15)"
              stroke={COLORS.cyanData}
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Target Beacon */}
            <circle cx="300" cy="280" r="8" fill={COLORS.amberCRT} />
            <circle cx="300" cy="280" r={(frame * 3) % 40} fill="none" stroke={COLORS.amberCRT} strokeWidth="1.5" opacity="0.6" />
          </svg>

          {/* Location Badge */}
          <div style={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'rgba(31, 41, 55, 0.8)',
            border: `1px solid ${COLORS.cyanData}`,
            padding: '8px 16px',
            borderRadius: 6,
            fontFamily: FONTS.mono,
            fontSize: 14,
            color: COLORS.cyanData
          }}>
            ISLAND NATION: CAPE VERDE
          </div>
        </div>

        {/* Population & Bandwidth Stats */}
        <div style={{
          width: 700,
          display: 'flex',
          flexDirection: 'column',
          gap: 30
        }}>
          <div style={{
            background: 'rgba(31, 41, 55, 0.4)',
            backdropFilter: 'blur(16px)',
            border: `2px solid ${COLORS.panelSteel}`,
            borderRadius: 16,
            padding: 40
          }}>
            <div style={{fontSize: 14, color: 'rgba(255, 255, 255, 0.5)', letterSpacing: 2, marginBottom: 8}}>
              TOTAL NATIVE POPULATION METRIC
            </div>
            <div style={{fontFamily: FONTS.impact, fontSize: 72, color: COLORS.amberCRT}}>
              &lt; 200,000 <span style={{fontSize: 28, fontFamily: FONTS.mono, color: 'rgba(255,255,255,0.6)'}}>PEOPLE</span>
            </div>
            <div style={{fontSize: 16, color: COLORS.cyanData, fontFamily: FONTS.mono, marginTop: 10}}>
              STATUS: PART-TIME PLAYERS // FULL-TIME HEART
            </div>
          </div>

          {/* Viral Traffic Signal Indicator */}
          {showStats && (
            <div style={{
              background: 'rgba(10, 14, 26, 0.8)',
              border: `2px solid ${COLORS.cyanData}`,
              borderRadius: 16,
              padding: 30,
              boxShadow: `0 0 40px rgba(34, 211, 238, 0.2)`
            }}>
              <div style={{fontFamily: FONTS.mono, fontSize: 16, color: COLORS.cyanData, marginBottom: 12}}>
                VIRAL SOCIAL UPLINK BANDWIDTH:
              </div>
              <div style={{display: 'flex', gap: 8, height: 40, alignItems: 'flex-end'}}>
                {new Array(30).fill(0).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${Math.random() * 80 + 20}%`,
                      backgroundColor: i % 4 === 0 ? COLORS.amberCRT : COLORS.cyanData,
                      borderRadius: 4
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </HUDBackground>
  );
};
