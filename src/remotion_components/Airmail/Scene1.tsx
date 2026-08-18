import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AIRMAIL_COLORS, AIRMAIL_FONTS} from './constants';
import {AirmailWrapper} from './AirmailWrapper';

export const AirmailScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Envelope slide-in spring
  const envelopeSpring = spring({
    frame,
    fps,
    config: {damping: 12, stiffness: 100}
  });

  const translateY = interpolate(envelopeSpring, [0, 1], [600, 0]);

  // Circular Postmark Stamp effect
  const stampSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 8, stiffness: 160}
  });

  return (
    <AirmailWrapper title="DISPATCH #01 // OVERNIGHT DELIVERY">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Envelope Card */}
        <div style={{
          width: 900,
          height: 1100,
          background: '#FFF',
          borderRadius: 16,
          border: `2px solid ${AIRMAIL_COLORS.grey}`,
          padding: 60,
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          transform: `translateY(${translateY}px)`,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Top Postage Stamp Corner */}
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 24, color: AIRMAIL_COLORS.grey}}>
              SENDER: CAPE VERDE FA
            </div>
            {/* Vintage Stamp Component */}
            <div style={{
              width: 140,
              height: 180,
              border: `3px dashed ${AIRMAIL_COLORS.red}`,
              background: AIRMAIL_COLORS.cream,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10
            }}>
              <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 28, color: AIRMAIL_COLORS.red}}>
                $11M
              </div>
              <div style={{fontSize: 12, color: AIRMAIL_COLORS.blue, marginTop: 10}}>WORLD CUP</div>
            </div>
          </div>

          {/* Typewritten Address */}
          <div style={{
            fontFamily: AIRMAIL_FONTS.script,
            fontSize: 48,
            color: AIRMAIL_COLORS.darkInk,
            lineHeight: 1.6,
            paddingLeft: 40,
            borderLeft: `4px solid ${AIRMAIL_COLORS.blue}`
          }}>
            DELIVER TO:<br />
            <span style={{fontSize: 64, fontWeight: 'bold', color: AIRMAIL_COLORS.blue}}>
              11,000,000 FOLLOWERS
            </span><br />
            OVERNIGHT DISPATCH
          </div>

          {/* Bottom Tracking info */}
          <div style={{
            display: 'flex',
            justify: 'space-between',
            borderTop: `2px solid ${AIRMAIL_COLORS.cream}`,
            paddingTop: 30,
            fontFamily: AIRMAIL_FONTS.mono,
            fontSize: 20,
            color: AIRMAIL_COLORS.grey
          }}>
            <span>TRACKING: #2026-W-CUP</span>
            <span>REASON COUNT: 03</span>
          </div>

          {/* Postmark Circular Stamp Slam (Frame 3s) */}
          {frame > fps * 2.8 && (
            <div style={{
              position: 'absolute',
              top: 250,
              right: 80,
              transform: `scale(${stampSpring}) rotate(-18deg)`,
              opacity: stampSpring,
              width: 320,
              height: 320,
              borderRadius: '50%',
              border: `6px double ${AIRMAIL_COLORS.red}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: AIRMAIL_COLORS.red,
              fontFamily: AIRMAIL_FONTS.stamp,
              textAlign: 'center',
              boxShadow: '0 0 20px rgba(200, 16, 46, 0.2)'
            }}>
              <div style={{fontSize: 24, letterSpacing: 2}}>POSTAL SERVICE</div>
              <div style={{fontSize: 48, margin: '8px 0'}}>ACCEPTED</div>
              <div style={{fontSize: 20}}>3 CRITICAL REASONS</div>
            </div>
          )}
        </div>
      </div>
    </AirmailWrapper>
  );
};
