import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';
import {PixelWrapper} from './PixelWrapper';

export const PixelScene4: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // XP progress bars
  const rookieXP = interpolate(frame, [10, fps * 2], [0, 40], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  const veteranXP = interpolate(frame, [15, fps * 3], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // Level Up Spring
  const lvlUpSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 7, stiffness: 160}
  });

  return (
    <PixelWrapper title="STAGE 04 // SKILL TREE COMPARISON">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
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
              SKILL TREE TREE SELECTION
            </div>
            <div style={{fontSize: 16, color: PIXEL_COLORS.pixelWhite, marginTop: 8}}>
              EXPERIENCE vs YOUTH
            </div>
          </div>

          {/* Tree A: Rookie */}
          <div style={{
            background: PIXEL_COLORS.nightBlue,
            border: `4px solid ${PIXEL_COLORS.panelBorder}`,
            padding: 24,
            borderRadius: 8
          }}>
            <div style={{fontSize: 18, color: PIXEL_COLORS.pixelWhite, marginBottom: 10}}>
              ROOKIE TREE (18yo):
            </div>
            <div style={{height: 24, background: '#000', border: '2px solid #FFF', padding: 2}}>
              <div style={{height: '100%', width: `${rookieXP}%`, background: PIXEL_COLORS.panelBorder}} />
            </div>
          </div>

          {/* Tree B: Veteran Superpower */}
          <div style={{
            background: PIXEL_COLORS.nightBlue,
            border: `4px solid ${PIXEL_COLORS.coinGold}`,
            padding: 30,
            borderRadius: 8,
            position: 'relative'
          }}>
            <div style={{fontSize: 20, color: PIXEL_COLORS.coinGold, marginBottom: 12}}>
              VETERAN TREE (40yo):
            </div>
            <div style={{height: 28, background: '#000', border: `2px solid ${PIXEL_COLORS.coinGold}`, padding: 2}}>
              <div style={{height: '100%', width: `${veteranXP}%`, background: PIXEL_COLORS.hpGreen}} />
            </div>

            {/* Level Up Banner Popup */}
            {frame > fps * 2.8 && (
              <div style={{
                position: 'absolute',
                top: -30,
                right: 20,
                transform: `scale(${lvlUpSpring}) rotate(-4deg)`,
                opacity: lvlUpSpring,
                background: PIXEL_COLORS.coinGold,
                color: PIXEL_COLORS.nightBlue,
                border: '4px solid #FFF',
                padding: '12px 20px',
                fontSize: 18,
                borderRadius: 6,
                boxShadow: '0 6px 0 #000'
              }}>
                ⚡ LEVEL UP! SUPERPOWER MODE ACTIVE!
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div style={{
            borderTop: `4px solid ${PIXEL_COLORS.nightBlue}`,
            paddingTop: 16,
            fontSize: 16,
            color: PIXEL_COLORS.hpGreen
          }}>
            STATUS: MAXED SKILL TREE
          </div>
        </div>
      </div>
    </PixelWrapper>
  );
};
