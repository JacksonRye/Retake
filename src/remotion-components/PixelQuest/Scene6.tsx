import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';
import {PixelWrapper} from './PixelWrapper';

export const PixelScene6: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Exponential follower count
  const followerCount = Math.floor(
    interpolate(frame, [0, fps * 5], [50000, 10842000], {
      extrapolateRight: 'clamp'
    })
  );

  // Level Up Victory Banner
  const victorySpring = spring({
    frame: frame - fps * 3.8,
    fps,
    config: {damping: 8, stiffness: 150}
  });

  return (
    <PixelWrapper title="STAGE 06 // VICTORY FANFARE">
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
              FINAL XP ACCELERATION
            </div>
            <div style={{fontSize: 16, color: PIXEL_COLORS.pixelWhite, marginTop: 8}}>
              FOLLOWER SCORE LOG
            </div>
          </div>

          {/* Score Counter */}
          <div style={{
            background: PIXEL_COLORS.nightBlue,
            border: `4px solid ${PIXEL_COLORS.coinGold}`,
            padding: 40,
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{fontSize: 20, color: PIXEL_COLORS.pixelWhite, marginBottom: 10}}>
              TOTAL FOLLOWERS GAINED:
            </div>
            <div style={{fontSize: 54, color: PIXEL_COLORS.coinGold, margin: '20px 0'}}>
              {followerCount.toLocaleString()}
            </div>
            <div style={{fontSize: 16, color: PIXEL_COLORS.hpGreen}}>
              MAXIMUM XP RECORDED
            </div>
          </div>

          {/* Quest Complete Banner (Frame 4s) */}
          {frame > fps * 3.6 && (
            <div style={{
              transform: `scale(${victorySpring}) rotate(-4deg)`,
              opacity: victorySpring,
              background: PIXEL_COLORS.damageRed,
              color: '#FFF',
              border: '6px solid #FFF',
              padding: '24px 20px',
              textAlign: 'center',
              borderRadius: 8,
              boxShadow: '0 10px 0 #000'
            }}>
              <div style={{fontSize: 28, marginBottom: 10}}>🏆 QUEST COMPLETE!</div>
              <div style={{fontSize: 20}}>NEXT BOSS: WHO BREAKS THE INTERNET?</div>
            </div>
          )}

          {/* Footer Info */}
          <div style={{
            borderTop: `4px solid ${PIXEL_COLORS.nightBlue}`,
            paddingTop: 16,
            fontSize: 16,
            color: PIXEL_COLORS.coinGold
          }}>
            GAME OVER // TOURNAMENT WINNER
          </div>
        </div>
      </div>
    </PixelWrapper>
  );
};
