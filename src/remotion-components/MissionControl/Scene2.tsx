import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from './constants';
import {HUDBackground} from './HUD';

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Radar beam rotation angle
  const radarAngle = (frame * 4) % 360;

  // Target trajectory (Spain approaching center)
  const targetDistance = interpolate(frame, [0, fps * 4], [350, 140], {
    extrapolateRight: 'clamp',
  });

  // Shield Activation Frame (at fps * 3.5)
  const shieldActive = frame > fps * 3.2;
  
  const shieldSpring = spring({
    frame: frame - fps * 3.2,
    fps,
    config: {damping: 10, stiffness: 120},
  });

  // Threat percentage drops from 99% down to 00% after shield deflection
  const threatLevel = Math.floor(
    interpolate(frame, [fps * 3.2, fps * 5], [99, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <HUDBackground title="PHASE 02 // DEFENSIVE RADAR INTERCEPT">
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 40px'
      }}>
        {/* Main Radar Screen Container */}
        <div style={{
          width: 700,
          height: 700,
          borderRadius: '50%',
          border: `2px solid ${COLORS.cyanData}`,
          background: 'rgba(10, 14, 26, 0.7)',
          boxShadow: `0 0 50px rgba(34, 211, 238, 0.2), inset 0 0 40px rgba(34, 211, 238, 0.1)`,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Inner Concentric Circles */}
          {[150, 300, 450, 600].map((size, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                border: `1px dashed rgba(34, 211, 238, 0.25)`
              }}
            />
          ))}

          {/* Crosshair Axes */}
          <div style={{position: 'absolute', width: '100%', height: 1, background: 'rgba(34, 211, 238, 0.3)'}} />
          <div style={{position: 'absolute', height: '100%', width: 1, background: 'rgba(34, 211, 238, 0.3)'}} />

          {/* Radar Sweep Line */}
          <div style={{
            position: 'absolute',
            width: 350,
            height: 350,
            top: 0,
            left: 350,
            transformOrigin: '0% 100%',
            transform: `rotate(${radarAngle}deg)`,
            background: 'conic-gradient(from 180deg at 0% 100%, rgba(34, 211, 238, 0.4) 0deg, transparent 60deg)',
            pointerEvents: 'none'
          }} />

          {/* Target Spain Marker */}
          <div style={{
            position: 'absolute',
            top: 350 - Math.cos(targetDistance / 100) * targetDistance,
            left: 350 + Math.sin(targetDistance / 100) * targetDistance,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            opacity: threatLevel === 0 ? 0.3 : 1,
            transition: 'opacity 0.2s'
          }}>
            <div style={{
              width: 24,
              height: 24,
              border: `2px solid ${COLORS.redAlert}`,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: `0 0 15px ${COLORS.redAlert}`,
              animation: 'pulse 1s infinite'
            }}>
              <div style={{width: 8, height: 8, backgroundColor: COLORS.redAlert, borderRadius: '50%'}} />
            </div>
            <div style={{
              background: 'rgba(255, 59, 48, 0.2)',
              border: `1px solid ${COLORS.redAlert}`,
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 14,
              color: '#FFF',
              fontFamily: FONTS.mono,
              whiteSpace: 'nowrap'
            }}>
              SPAIN (FAVORITE)
            </div>
          </div>

          {/* Defensive Arc Shield / Barrier */}
          {shieldActive && (
            <svg
              width="700"
              height="700"
              viewBox="0 0 700 700"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `scale(${interpolate(shieldSpring, [0, 1], [0.8, 1])})`,
                opacity: shieldSpring
              }}
            >
              <path
                d="M 250 200 A 200 200 0 0 1 450 200"
                fill="none"
                stroke={COLORS.cyanData}
                strokeWidth="12"
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 25px ${COLORS.cyanData})`
                }}
              />
            </svg>
          )}
        </div>

        {/* Tactical Status Sidebar */}
        <div style={{
          width: 550,
          background: 'rgba(31, 41, 55, 0.4)',
          backdropFilter: 'blur(16px)',
          border: `2px solid ${COLORS.panelSteel}`,
          borderRadius: 16,
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 30
        }}>
          <div>
            <div style={{fontSize: 14, color: COLORS.cyanData, letterSpacing: 2, marginBottom: 8}}>
              SECTOR DEFENSE ASSESSMENT
            </div>
            <div style={{fontFamily: FONTS.impact, fontSize: 44, color: '#FFF', letterSpacing: 2}}>
              CAPE VERDE vs SPAIN
            </div>
          </div>

          {/* Threat Metric Bar Gauge */}
          <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
              <span style={{fontFamily: FONTS.mono, color: 'rgba(255, 255, 255, 0.7)'}}>OPPONENT GOAL THREAT:</span>
              <span style={{
                fontFamily: FONTS.mono,
                color: threatLevel === 0 ? COLORS.cyanData : COLORS.redAlert,
                fontWeight: 'bold',
                fontSize: 20
              }}>
                {threatLevel.toString().padStart(2, '0')}% {threatLevel === 0 ? '[SHUTOUT COMPLETE]' : '[INCOMING]'}
              </span>
            </div>

            <div style={{
              height: 24,
              background: 'rgba(0,0,0,0.5)',
              borderRadius: 6,
              overflow: 'hidden',
              padding: 3,
              border: `1px solid ${COLORS.panelSteel}`
            }}>
              <div style={{
                height: '100%',
                width: `${threatLevel}%`,
                background: threatLevel === 0 ? COLORS.cyanData : `linear-gradient(90deg, ${COLORS.amberCRT}, ${COLORS.redAlert})`,
                boxShadow: `0 0 15px ${threatLevel === 0 ? COLORS.cyanData : COLORS.redAlert}`,
                borderRadius: 4,
                transition: 'width 0.1s linear'
              }} />
            </div>
          </div>

          {/* Tactical Stats Matrix */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            paddingTop: 20,
            borderTop: `1px dashed rgba(255, 255, 255, 0.1)`
          }}>
            <div style={{background: 'rgba(10, 14, 26, 0.5)', padding: 16, borderRadius: 8}}>
              <div style={{fontSize: 12, color: 'rgba(255, 255, 255, 0.5)'}}>TOTAL GOALS CONCEDED</div>
              <div style={{fontFamily: FONTS.impact, fontSize: 36, color: COLORS.cyanData}}>0.00</div>
            </div>
            <div style={{background: 'rgba(10, 14, 26, 0.5)', padding: 16, borderRadius: 8}}>
              <div style={{fontSize: 12, color: 'rgba(255, 255, 255, 0.5)'}}>WORLD CUP APPEARANCE</div>
              <div style={{fontFamily: FONTS.impact, fontSize: 36, color: COLORS.amberCRT}}>2ND EVER</div>
            </div>
          </div>
        </div>
      </div>
    </HUDBackground>
  );
};
