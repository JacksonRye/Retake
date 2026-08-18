import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONTS} from './constants';
import {HUDBackground} from './HUD';

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Exponential count up for followers from 50K to 10M
  const followerCount = Math.floor(
    interpolate(frame, [0, fps * 5], [50000, 10842000], {
      extrapolateRight: 'clamp',
    })
  );

  // Line chart path animation
  const chartProgress = interpolate(frame, [0, fps * 5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const isPeak = followerCount > 8000000;

  return (
    <HUDBackground title="PHASE 06 // EXPONENTIAL IMPACT & TRAJECTORY">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px 40px'
      }}>
        {/* Main Growth Curve Graph Screen */}
        <div style={{
          height: 480,
          background: 'rgba(31, 41, 55, 0.4)',
          backdropFilter: 'blur(16px)',
          border: `2px solid ${isPeak ? COLORS.redAlert : COLORS.cyanData}`,
          borderRadius: 16,
          position: 'relative',
          padding: 30,
          boxShadow: `0 0 50px rgba(${isPeak ? '255, 59, 48' : '34, 211, 238'}, 0.25)`
        }}>
          {/* Header Stats */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontSize: 14, color: 'rgba(255, 255, 255, 0.5)', letterSpacing: 2}}>
                FOLLOWER TRAJECTORY ACCELERATION
              </div>
              <div style={{
                fontFamily: FONTS.impact,
                fontSize: 64,
                color: isPeak ? COLORS.redAlert : COLORS.amberCRT,
                textShadow: `0 0 20px ${isPeak ? COLORS.redAlert : COLORS.amberCRT}`
              }}>
                {followerCount.toLocaleString()} <span style={{fontSize: 24, fontFamily: FONTS.mono, color: '#FFF'}}>FOLLOWERS</span>
              </div>
            </div>

            <div style={{
              background: isPeak ? 'rgba(255, 59, 48, 0.2)' : 'rgba(34, 211, 238, 0.2)',
              border: `2px solid ${isPeak ? COLORS.redAlert : COLORS.cyanData}`,
              padding: '10px 20px',
              borderRadius: 8,
              fontFamily: FONTS.mono,
              color: isPeak ? COLORS.redAlert : COLORS.cyanData,
              fontSize: 16
            }}>
              {isPeak ? '[ SYSTEM PEAK: BREAKING INTERNET ]' : '[ VIRAL ACCELERATION ]'}
            </div>
          </div>

          {/* SVG Exponential Curve Chart */}
          <svg width="100%" height="300" style={{position: 'absolute', bottom: 20, left: 0, overflow: 'visible'}}>
            <defs>
              <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={COLORS.cyanData} />
                <stop offset="100%" stopColor={COLORS.redAlert} />
              </linearGradient>
            </defs>

            {/* Glowing Trend Line */}
            <path
              d="M 50 250 C 600 250, 1000 220, 1600 40"
              fill="none"
              stroke="url(#curveGrad)"
              strokeWidth="6"
              strokeDasharray="1600"
              strokeDashoffset={1600 * (1 - chartProgress)}
              style={{
                filter: `drop-shadow(0 0 15px ${isPeak ? COLORS.redAlert : COLORS.cyanData})`
              }}
            />
          </svg>
        </div>

        {/* Closing Question Callout Console */}
        <div style={{
          background: 'rgba(10, 14, 26, 0.9)',
          border: `2px solid ${COLORS.amberCRT}`,
          borderRadius: 16,
          padding: '24px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          boxShadow: `0 0 40px rgba(255, 179, 0, 0.3)`
        }}>
          <span style={{color: COLORS.amberCRT, fontFamily: FONTS.mono, fontSize: 36}}>&gt;</span>
          <div style={{
            fontFamily: FONTS.mono,
            fontSize: 28,
            color: COLORS.amberCRT,
            letterSpacing: 2
          }}>
            WHO IS THE NEXT PLAYER TO BREAK THE INTERNET?
            <span style={{opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0}}>_</span>
          </div>
        </div>
      </div>
    </HUDBackground>
  );
};
