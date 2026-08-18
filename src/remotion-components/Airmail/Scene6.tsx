import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AIRMAIL_COLORS, AIRMAIL_FONTS} from './constants';
import {AirmailWrapper} from './AirmailWrapper';

export const AirmailScene6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Exponential growth count
  const followerCount = Math.floor(
    interpolate(frame, [0, fps * 5], [50000, 10842000], {
      extrapolateRight: 'clamp'
    })
  );

  // Final Destination Stamp
  const stampSpring = spring({
    frame: frame - fps * 4,
    fps,
    config: {damping: 8, stiffness: 150}
  });

  return (
    <AirmailWrapper title="DISPATCH #06 // FINAL DISPATCH LOG">
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
          padding: 60,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}>
          <div>
            <div style={{fontFamily: AIRMAIL_FONTS.stamp, fontSize: 40, color: AIRMAIL_COLORS.blue}}>
              INTERNATIONAL DISPATCH LOG
            </div>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey, marginTop: 6}}>
              FINAL FOLLOWER ACCELERATION
            </div>
          </div>

          {/* Metric Box */}
          <div style={{
            background: AIRMAIL_COLORS.cream,
            border: `3px solid ${AIRMAIL_COLORS.blue}`,
            borderRadius: 16,
            padding: 40,
            textAlign: 'center'
          }}>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 20, color: AIRMAIL_COLORS.grey}}>
              AUDIENCE METRIC RECORDED:
            </div>
            <div style={{
              fontFamily: AIRMAIL_FONTS.stamp,
              fontSize: 90,
              color: AIRMAIL_COLORS.red,
              lineHeight: 1,
              marginTop: 10
            }}>
              {followerCount.toLocaleString()}
            </div>
            <div style={{fontFamily: AIRMAIL_FONTS.mono, fontSize: 24, color: AIRMAIL_COLORS.blue, marginTop: 10}}>
              FOLLOWERS DELIVERED
            </div>
          </div>

          {/* Final Circular Postmark Stamp (Frame 4s) */}
          {frame > fps * 3.8 && (
            <div style={{
              transform: `scale(${stampSpring}) rotate(-14deg)`,
              opacity: stampSpring,
              border: `6px double ${AIRMAIL_COLORS.red}`,
              padding: '24px 30px',
              borderRadius: '50%',
              width: 380,
              height: 380,
              margin: '0 auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: AIRMAIL_COLORS.red,
              fontFamily: AIRMAIL_FONTS.stamp,
              textAlign: 'center',
              boxShadow: '0 0 30px rgba(200, 16, 46, 0.2)'
            }}>
              <div style={{fontSize: 24}}>AIRMAIL QUESTION</div>
              <div style={{fontSize: 40, margin: '10px 0'}}>WHO IS NEXT?</div>
              <div style={{fontSize: 18}}>TO BREAK THE INTERNET</div>
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
            <span>WORLD CUP 2026</span>
            <span>END OF MANIFEST</span>
          </div>
        </div>
      </div>
    </AirmailWrapper>
  );
};
