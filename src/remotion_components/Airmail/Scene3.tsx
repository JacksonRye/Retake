import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AIRMAIL_COLORS, AIRMAIL_FONTS} from './constants';
import {AirmailWrapper} from './AirmailWrapper';

export const AirmailScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Age counter spinning to 40
  const ageVal = Math.floor(
    interpolate(frame, [10, fps * 3], [20, 40], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
  );

  // Gold Wax Seal Press animation
  const sealSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 10, stiffness: 140}
  });

  return (
    <AirmailWrapper title="DISPATCH #03 // PASSPORT VERIFICATION">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Official Passport / Customs Document */}
        <div style={{
          width: 900,
          height: 1200,
          background: '#FFF',
          border: `2px solid ${AIRMAIL_COLORS.grey}`,
          borderRadius: 16,
          padding: 60,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}>
          <div>
            <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 40, color: AIRMAIL_COLORS.blue}}>
              PASSPORT DECLARATION
            </div>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey, marginTop: 6}}>
              REPUBLIC OF CAPE VERDE // ATHLETE VISA
            </div>
          </div>

          {/* Athlete Profile Grid */}
          <div style={{
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            background: AIRMAIL_COLORS.cream,
            padding: 40,
            borderRadius: 12,
            border: `1px solid ${AIRMAIL_COLORS.grey}`
          }}>
            <div style={{
              width: 180,
              height: 220,
              background: AIRMAIL_COLORS.blue,
              borderRadius: 8,
              display: 'flex',
              justify: 'center',
              alignItems: 'center',
              color: '#FFF',
              fontFamily: AIRMAIL_FONTS.stamp,
              fontSize: 64
            }}>
              GK
            </div>

            <div>
              <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey}}>SURNAME / NAME:</div>
              <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 48, color: AIRMAIL_COLORS.darkInk}}>VOSIGNO</div>
              <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey, marginTop: 10}}>ROLE: PRIMARY GOALKEEPER</div>
            </div>
          </div>

          {/* Age Odometer Box */}
          <div style={{
            border: `3px solid ${AIRMAIL_COLORS.blue}`,
            borderRadius: 12,
            padding: 30,
            textAlign: 'center',
            background: '#FFF'
          }}>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey}}>RECORDED AGE:</div>
            <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 110, color: AIRMAIL_COLORS.blue, lineHeight: 1}}>
              {ageVal} <span style={{fontSize: 32}}>YEARS OLD</span>
            </div>
          </div>

          {/* Gold Wax Seal Press (Frame 3s) */}
          {frame > fps * 2.8 && (
            <div style={{
              position: 'absolute',
              bottom: 120,
              right: 80,
              transform: `scale(${sealSpring}) rotate(8deg)`,
              opacity: sealSpring,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: AIRMAIL_COLORS.gold,
              border: '6px stroke #B08A1E',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#FFF',
              fontFamily: AIRMAIL_FONTS.stamp,
              textAlign: 'center',
              boxShadow: '0 10px 30px rgba(201, 162, 39, 0.5)'
            }}>
              <div style={{fontSize: 22}}>OFFICIAL SEAL</div>
              <div style={{fontSize: 34, margin: '4px 0'}}>SUPERPOWER</div>
              <div style={{fontSize: 18}}>VERIFIED</div>
            </div>
          )}

          {/* Footer Info */}
          <div style={{
            borderTop: `2px solid ${AIRMAIL_COLORS.cream}`,
            paddingTop: 20,
            fontFamily: AIRMAIL_FONTS.mono,
            fontSize: 20,
            color: AIRMAIL_COLORS.grey
          }}>
            STATUS: IMMIGRATION APPROVED
          </div>
        </div>
      </div>
    </AirmailWrapper>
  );
};
