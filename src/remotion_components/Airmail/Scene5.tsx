import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {AIRMAIL_COLORS, AIRMAIL_FONTS} from './constants';
import {AirmailWrapper} from './AirmailWrapper';

export const AirmailScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Route expansion outwards
  const routeScale = interpolate(frame, [0, fps * 4], [1, 2.5], {
    extrapolateRight: 'clamp'
  });

  return (
    <AirmailWrapper title="DISPATCH #05 // GLOBAL NETWORK RADIUS">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          overflow: 'hidden'
        }}>
          <div>
            <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 36, color: AIRMAIL_COLORS.blue}}>
              ORIGIN MATRIX: CAPE VERDE
            </div>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey}}>
              POPULATION RADIUS DEMOGRAPHICS
            </div>
          </div>

          {/* Map canvas zooming out */}
          <div style={{
            position: 'relative',
            height: 600,
            background: AIRMAIL_COLORS.cream,
            borderRadius: 12,
            border: `1px solid ${AIRMAIL_COLORS.grey}`,
            overflow: 'hidden'
          }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 800 600"
              style={{
                transform: `scale(${routeScale})`,
                transformOrigin: '50% 50%'
              }}
            >
              {/* Center origin */}
              <circle cx="400" cy="300" r="12" fill={AIRMAIL_COLORS.red} />
              {/* Radiating dispatch paths */}
              {[45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
                <line
                  key={idx}
                  x1="400"
                  y1="300"
                  x2={400 + Math.cos((angle * Math.PI) / 180) * 300}
                  y2={300 + Math.sin((angle * Math.PI) / 180) * 300}
                  stroke={AIRMAIL_COLORS.blue}
                  strokeWidth="3"
                  strokeDasharray="8 8"
                />
              ))}
            </svg>

            {/* Center Tag */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFF',
              border: `2px solid ${AIRMAIL_COLORS.red}`,
              padding: '10px 20px',
              borderRadius: 8,
              fontFamily: AIRMAIL_FONTS.stamp,
              fontSize: 24,
              color: AIRMAIL_COLORS.red,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              POPULATION &lt; 200,000
            </div>
          </div>

          {/* Underdog Text */}
          <div style={{
            fontFamily: AIRMAIL_FONTS.script,
            fontSize: 32,
            color: AIRMAIL_COLORS.darkInk,
            textAlign: 'center',
            lineHeight: 1.4
          }}>
            "A COUNTRY OF 200,000 PEOPLE WITH PART-TIME DAY JOBS JUST TOOK OVER THE WORLD."
          </div>

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
            <span>GLOBAL DISPATCH: ACTIVE</span>
            <span>VIRAL SPREAD: 100%</span>
          </div>
        </div>
      </div>
    </AirmailWrapper>
  );
};
