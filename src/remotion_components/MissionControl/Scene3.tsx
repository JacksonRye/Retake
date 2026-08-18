import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from './constants';
import {HUDBackground} from './HUD';

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Biometric laser scanner position
  const scanY = Math.sin(frame * 0.1) * 200 + 250;

  // Age odometer counter counting up to 40
  const ageVal = Math.floor(
    interpolate(frame, [10, fps * 3], [18, 40], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const isAgeLocked = ageVal === 40;

  // Stamp spring animation when age locks at 40
  const stampSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 10, stiffness: 150},
  });

  return (
    <HUDBackground title="PHASE 03 // ATHLETE BIOMETRIC PROFILE">
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 60,
        padding: '0 40px'
      }}>
        {/* Biometric Laser Scanner Frame */}
        <div style={{
          width: 500,
          height: 600,
          background: 'rgba(10, 14, 26, 0.7)',
          border: `2px solid ${COLORS.cyanData}`,
          borderRadius: 16,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: `0 0 40px rgba(34, 211, 238, 0.2)`
        }}>
          {/* Wireframe Silhouette / Grid backdrop */}
          <div style={{
            position: 'absolute',
            inset: 30,
            border: `1px dashed rgba(34, 211, 238, 0.3)`,
            borderRadius: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <svg width="240" height="300" viewBox="0 0 100 120" fill="none" stroke={COLORS.cyanData} strokeWidth="1" opacity="0.4">
              <circle cx="50" cy="35" r="25" />
              <path d="M 10 110 Q 50 70 90 110" />
              <line x1="50" y1="10" x2="50" y2="110" strokeDasharray="2,2" />
              <line x1="10" y1="50" x2="90" y2="50" strokeDasharray="2,2" />
            </svg>
          </div>

          {/* Sweeping Laser Scanline */}
          <div style={{
            position: 'absolute',
            top: scanY,
            left: 0,
            right: 0,
            height: 3,
            background: COLORS.cyanData,
            boxShadow: `0 0 20px ${COLORS.cyanData}, 0 0 40px ${COLORS.cyanData}`
          }} />

          {/* Biometric Status Tag */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            background: 'rgba(31, 41, 55, 0.8)',
            padding: '12px 20px',
            borderRadius: 8,
            border: `1px solid ${COLORS.cyanData}`,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 14,
            color: COLORS.cyanData
          }}>
            <span>SCANNING BIOMETRICS...</span>
            <span>MATCH: 99.8%</span>
          </div>
        </div>

        {/* Player Telemetry Card */}
        <div style={{
          width: 750,
          background: 'rgba(31, 41, 55, 0.4)',
          backdropFilter: 'blur(16px)',
          border: `2px solid ${COLORS.panelSteel}`,
          borderRadius: 16,
          padding: 50,
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          position: 'relative'
        }}>
          <div>
            <div style={{fontSize: 14, color: COLORS.amberCRT, letterSpacing: 2, marginBottom: 8}}>
              SUBJECT IDENTIFICATION // GOALKEEPING UNIT
            </div>
            <div style={{fontFamily: FONTS.impact, fontSize: 60, color: '#FFF', letterSpacing: 2}}>
              VOSIGNO
            </div>
            <div style={{fontFamily: FONTS.mono, fontSize: 18, color: COLORS.cyanData, marginTop: 4}}>
              NATIONAL TEAM: CAPE VERDE // SQUAD ROLE: PRIMARY GK
            </div>
          </div>

          {/* Age Counter Box */}
          <div style={{
            background: 'rgba(10, 14, 26, 0.8)',
            border: `3px solid ${isAgeLocked ? COLORS.amberCRT : COLORS.panelSteel}`,
            borderRadius: 12,
            padding: '30px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: isAgeLocked ? `0 0 50px rgba(255, 179, 0, 0.4)` : 'none',
            transition: 'all 0.3s'
          }}>
            <div>
              <div style={{fontSize: 14, color: 'rgba(255, 255, 255, 0.6)', letterSpacing: 1}}>CHRONOLOGICAL AGE:</div>
              <div style={{fontFamily: FONTS.impact, fontSize: 100, color: COLORS.amberCRT, lineHeight: 1}}>
                {ageVal} <span style={{fontSize: 32, fontFamily: FONTS.mono, color: 'rgba(255,255,255,0.5)'}}>YRS OLD</span>
              </div>
            </div>

            {/* Status indicator when locked */}
            {isAgeLocked && (
              <div style={{
                background: 'rgba(255, 179, 0, 0.15)',
                border: `2px solid ${COLORS.amberCRT}`,
                padding: '12px 24px',
                borderRadius: 8,
                color: COLORS.amberCRT,
                fontFamily: FONTS.mono,
                fontSize: 16,
                fontWeight: 'bold'
              }}>
                [ AGE ANOMALY DETECTED ]
              </div>
            )}
          </div>

          {/* Experience Superpower Stamp overlay when locked */}
          {frame > fps * 3 && (
            <div style={{
              position: 'absolute',
              bottom: 40,
              right: 40,
              transform: `scale(${stampSpring}) rotate(-12deg)`,
              opacity: stampSpring,
              border: `4px solid ${COLORS.amberCRT}`,
              padding: '16px 32px',
              borderRadius: 12,
              background: 'rgba(255, 179, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              boxShadow: `0 0 40px ${COLORS.amberCRT}`
            }}>
              <div style={{
                fontFamily: FONTS.impact,
                fontSize: 28,
                color: COLORS.amberCRT,
                letterSpacing: 2,
                textAlign: 'center'
              }}>
                EXPERIENCE = SUPERPOWER
              </div>
            </div>
          )}
        </div>
      </div>
    </HUDBackground>
  );
};
