import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';
import {PixelWrapper} from './PixelWrapper';

export const PixelScene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Character level roll to 40
  const lvlVal = Math.floor(
    interpolate(frame, [10, fps * 3], [18, 40], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
  );

  // Passive skill stamp spring
  const skillSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 9, stiffness: 140}
  });

  return (
    <PixelWrapper title="STAGE 03 // CHARACTER STAT INSPECT">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Stat Inspection Window */}
        <div style={{
          width: 900,
          height: 1100,
          background: PIXEL_COLORS.boxBlue,
          border: `8px double ${PIXEL_COLORS.panelBorder}`,
          borderRadius: 12,
          padding: 50,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 12px 0 #000'
        }}>
          <div>
            <div style={{fontSize: 28, color: PIXEL_COLORS.coinGold}}>
              CHARACTER STATS: VOSIGNO
            </div>
            <div style={{fontSize: 16, color: PIXEL_COLORS.pixelWhite, marginTop: 8}}>
              CLASS: GUARDIAN // POSITION: GK
            </div>
          </div>

          {/* Level Roll Box */}
          <div style={{
            background: PIXEL_COLORS.nightBlue,
            border: `4px solid ${PIXEL_COLORS.coinGold}`,
            padding: 40,
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{fontSize: 20, color: PIXEL_COLORS.pixelWhite}}>CURRENT LEVEL:</div>
            <div style={{fontSize: 90, color: PIXEL_COLORS.coinGold, margin: '20px 0'}}>
              LVL {lvlVal}
            </div>
            <div style={{fontSize: 16, color: PIXEL_COLORS.hpGreen}}>
              EXPERIENCE METRIC: MAXED OUT
            </div>
          </div>

          {/* Passive Skill Popup (Frame 3s) */}
          {frame > fps * 2.8 && (
            <div style={{
              transform: `scale(${skillSpring})`,
              opacity: skillSpring,
              background: PIXEL_COLORS.coinGold,
              color: PIXEL_COLORS.nightBlue,
              border: '6px solid #FFF',
              padding: '24px 20px',
              borderRadius: 8,
              textAlign: 'center',
              boxShadow: '0 8px 0 #000'
            }}>
              <div style={{fontSize: 24, marginBottom: 8}}>★ PASSIVE SKILL UNLOCKED!</div>
              <div style={{fontSize: 20}}>VETERAN SUPERPOWER ACTIVATED</div>
            </div>
          )}

          {/* Footer Stats */}
          <div style={{
            borderTop: `4px solid ${PIXEL_COLORS.nightBlue}`,
            paddingTop: 16,
            fontSize: 16,
            color: PIXEL_COLORS.coinGold,
            display: 'flex',
            justify: 'space-between'
          }}>
            <span>TEAM: CAPE VERDE</span>
            <span>ROLE: VETERAN</span>
          </div>
        </div>
      </div>
    </PixelWrapper>
  );
};
