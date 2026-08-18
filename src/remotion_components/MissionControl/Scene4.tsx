import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from './constants';
import {HUDBackground} from './HUD';

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Progress bar animations
  const youthProgress = interpolate(frame, [10, fps * 2], [0, 45], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const expProgress = interpolate(frame, [15, fps * 3], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // System Overload state after frame 3.2s
  const isOverload = frame > fps * 3.2;

  const overloadSpring = spring({
    frame: frame - fps * 3.2,
    fps,
    config: {damping: 8, stiffness: 140},
  });

  return (
    <HUDBackground title="PHASE 04 // COMPARATIVE TELEMETRY ANALYZER">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 50,
        padding: '0 80px'
      }}>
        {/* Monitor 1: Youth / Inexperience */}
        <div style={{
          background: 'rgba(31, 41, 55, 0.3)',
          border: `1px solid ${COLORS.panelSteel}`,
          borderRadius: 16,
          padding: 30
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
            <div style={{fontFamily: FONTS.mono, fontSize: 20, color: 'rgba(255, 255, 255, 0.6)'}}>
              COMPARATIVE PROFILE A: YOUTH ATHLETES (AGE 18-22)
            </div>
            <div style={{fontFamily: FONTS.mono, fontSize: 20, color: COLORS.panelSteel}}>
              EFFICIENCY: 45%
            </div>
          </div>
          <div style={{
            height: 28,
            background: 'rgba(0,0,0,0.5)',
            borderRadius: 8,
            overflow: 'hidden',
            padding: 3,
            border: `1px solid ${COLORS.panelSteel}`
          }}>
            <div style={{
              height: '100%',
              width: `${youthProgress}%`,
              background: COLORS.panelSteel,
              borderRadius: 4
            }} />
          </div>
        </div>

        {/* Monitor 2: Experience (Superpower Mode) */}
        <div style={{
          background: isOverload ? 'rgba(34, 211, 238, 0.08)' : 'rgba(31, 41, 55, 0.3)',
          border: `2px solid ${isOverload ? COLORS.cyanData : COLORS.amberCRT}`,
          borderRadius: 16,
          padding: 40,
          boxShadow: isOverload ? `0 0 60px rgba(34, 211, 238, 0.3)` : 'none',
          transition: 'all 0.3s',
          position: 'relative'
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
            <div style={{
              fontFamily: FONTS.mono,
              fontSize: 22,
              color: isOverload ? COLORS.cyanData : COLORS.amberCRT,
              fontWeight: 'bold'
            }}>
              COMPARATIVE PROFILE B: VETERAN EXPERIENCE (AGE 40)
            </div>
            <div style={{
              fontFamily: FONTS.mono,
              fontSize: 24,
              color: isOverload ? COLORS.cyanData : COLORS.amberCRT,
              fontWeight: 'bold'
            }}>
              EFFICIENCY: {expProgress === 100 ? 'OVERLOAD MAX' : `${Math.floor(expProgress)}%`}
            </div>
          </div>

          <div style={{
            height: 36,
            background: 'rgba(0,0,0,0.6)',
            borderRadius: 8,
            overflow: 'hidden',
            padding: 4,
            border: `1px solid ${isOverload ? COLORS.cyanData : COLORS.amberCRT}`
          }}>
            <div style={{
              height: '100%',
              width: `${expProgress}%`,
              background: isOverload ? `linear-gradient(90deg, ${COLORS.amberCRT}, ${COLORS.cyanData})` : COLORS.amberCRT,
              boxShadow: `0 0 25px ${isOverload ? COLORS.cyanData : COLORS.amberCRT}`,
              borderRadius: 6
            }} />
          </div>

          {/* Overload Alert Badge */}
          {isOverload && (
            <div style={{
              position: 'absolute',
              top: -30,
              right: 40,
              transform: `scale(${overloadSpring})`,
              background: COLORS.cyanData,
              color: COLORS.voidNavy,
              fontFamily: FONTS.impact,
              fontSize: 24,
              padding: '8px 24px',
              borderRadius: 8,
              boxShadow: `0 0 30px ${COLORS.cyanData}`,
              letterSpacing: 2
            }}>
              ⚡ SUPERPOWER CAPACITY UNLOCKED
            </div>
          )}
        </div>
      </div>
    </HUDBackground>
  );
};
