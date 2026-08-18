import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AIRMAIL_COLORS, AIRMAIL_FONTS} from './constants';
import {AirmailWrapper} from './AirmailWrapper';

export const AirmailScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Route Line Draw animation
  const routeProgress = interpolate(frame, [0, fps * 3], [0, 1], {
    extrapolateRight: 'clamp'
  });

  // Rubber Stamp Slam animation
  const stampSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 9, stiffness: 150}
  });

  return (
    <AirmailWrapper title="DISPATCH #02 // CUSTOMS CLEARANCE DENIED">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Navigation Flight Map Canvas */}
        <div style={{
          width: 900,
          height: 1200,
          background: '#FFF',
          border: `2px solid ${AIRMAIL_COLORS.grey}`,
          borderRadius: 16,
          padding: 50,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}>
          <div>
            <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 36, color: AIRMAIL_COLORS.blue}}>
              FLIGHT ROUTE MANIFEST
            </div>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey}}>
              SECTOR: SPAIN ➔ CAPE VERDE
            </div>
          </div>

          {/* SVG Dashed Flight Path Arc */}
          <svg width="800" height="600" viewBox="0 0 800 600" style={{position: 'absolute', top: 250, left: 50}}>
            {/* Origin Spain */}
            <circle cx="150" cy="100" r="16" fill={AIRMAIL_COLORS.red} />
            <text x="180" y="105" fontFamily={AIRMAIL_FONTS.stamp} fontSize="28" fill={AIRMAIL_COLORS.darkInk}>
              SPAIN (FAVORITES)
            </text>

            {/* Destination Cape Verde */}
            <circle cx="650" cy="450" r="16" fill={AIRMAIL_COLORS.blue} />
            <text x="450" y="500" fontFamily={AIRMAIL_FONTS.stamp} fontSize="28" fill={AIRMAIL_COLORS.darkInk}>
              CAPE VERDE (SHUTOUT)
            </text>

            {/* Flight Path Line */}
            <path
              d="M 150 100 Q 400 150 650 450"
              fill="none"
              stroke={AIRMAIL_COLORS.blue}
              strokeWidth="6"
              strokeDasharray="12 12"
              strokeDashoffset={800 * (1 - routeProgress)}
            />
          </svg>

          {/* Rubber Stamp Rubber Slam (0 Goals Conceded) */}
          {frame > fps * 2.8 && (
            <div style={{
              position: 'absolute',
              top: 500,
              left: 100,
              right: 100,
              transform: `scale(${stampSpring}) rotate(-12deg)`,
              opacity: stampSpring,
              border: `10px solid ${AIRMAIL_COLORS.red}`,
              padding: '30px 40px',
              color: AIRMAIL_COLORS.red,
              fontFamily: AIRMAIL_FONTS.stamp,
              textAlign: 'center',
              background: 'rgba(200, 16, 46, 0.1)',
              boxShadow: '0 0 30px rgba(200, 16, 46, 0.3)'
            }}>
              <div style={{fontSize: 64, letterSpacing: 4}}>ENTRY DENIED</div>
              <div style={{fontSize: 36, marginTop: 10}}>LITERALLY 0 GOALS CONCEDED</div>
            </div>
          )}

          {/* Footer Info */}
          <div style={{
            borderTop: `2px solid ${AIRMAIL_COLORS.cream}`,
            paddingTop: 20,
            fontFamily: AIRMAIL_FONTS.mono,
            fontSize: 20,
            color: AIRMAIL_COLORS.grey,
            display: 'flex',
            justify: 'space-between'
          }}>
            <span>MATCH RESULT: DRAW</span>
            <span>STATUS: DEFLECTED</span>
          </div>
        </div>
      </div>
    </AirmailWrapper>
  );
};
