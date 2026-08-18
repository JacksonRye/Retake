import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AIRMAIL_COLORS, AIRMAIL_FONTS} from './constants';
import {AirmailWrapper} from './AirmailWrapper';

export const AirmailScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Priority sticker stamp animation
  const stickerSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 8, stiffness: 150}
  });

  return (
    <AirmailWrapper title="DISPATCH #04 // CARGO PRIORITY EVALUATION">
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
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}>
          <div>
            <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 36, color: AIRMAIL_COLORS.blue}}>
              CARGO MANIFEST COMPARISON
            </div>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey}}>
              AIRMAIL PRIORITY EVALUATION
            </div>
          </div>

          {/* Crate 1: Youth Cargo */}
          <div style={{
            background: AIRMAIL_COLORS.cream,
            border: `2px dashed ${AIRMAIL_COLORS.grey}`,
            padding: 30,
            borderRadius: 12
          }}>
            <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 32, color: AIRMAIL_COLORS.grey}}>
              CARGO ITEM A: YOUTH ATHLETES (18yo)
            </div>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 18, color: AIRMAIL_COLORS.grey, marginTop: 6}}>
              STATUS: STANDARD FREIGHT // UNTESTED POTENTIAL
            </div>
          </div>

          {/* Crate 2: Veteran Cargo (Priority Airmail) */}
          <div style={{
            background: '#FFF',
            border: `3px solid ${AIRMAIL_COLORS.red}`,
            padding: 40,
            borderRadius: 12,
            position: 'relative',
            boxShadow: '0 10px 30px rgba(200, 16, 46, 0.15)'
          }}>
            <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 36, color: AIRMAIL_COLORS.red}}>
              CARGO ITEM B: VETERAN EXPERIENCE (40yo)
            </div>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.darkInk, marginTop: 8}}>
              STATUS: PRIORITY EXPRESS // SUPERPOWER CLEARANCE
            </div>

            {/* Red Priority Sticker (Frame 3s) */}
            {frame > fps * 2.8 && (
              <div style={{
                position: 'absolute',
                top: -30,
                right: 30,
                transform: `scale(${stickerSpring}) rotate(-6deg)`,
                opacity: stickerSpring,
                background: AIRMAIL_COLORS.red,
                color: '#FFF',
                padding: '12px 24px',
                borderRadius: 8,
                fontFamily: AIRMAIL_FONTS.stamp,
                fontSize: 24,
                letterSpacing: 2,
                boxShadow: '0 8px 20px rgba(200, 16, 46, 0.4)'
              }}>
                ★ EXPRESS CLEARANCE: SUPERPOWER UNLOCKED
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div style={{
            borderTop: `2px solid ${AIRMAIL_COLORS.cream}`,
            paddingTop: 20,
            fontFamily: AIRMAIL_FONTS.mono,
            fontSize: 20,
            color: AIRMAIL_COLORS.grey
          }}>
            AIRMAIL CLASSIFICATION: SPECIAL HANDLING
          </div>
        </div>
      </div>
    </AirmailWrapper>
  );
};
