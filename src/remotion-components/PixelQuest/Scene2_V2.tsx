import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';
import {PixelWrapper} from './PixelWrapper';

export const PixelScene2_V2: React.FC<{
  isOverlay?: boolean;
  webcamLayout?: 'full' | 'left' | 'right' | 'top' | 'bottom';
}> = ({
  isOverlay = false,
  webcamLayout = 'full'
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Attack animation spring
  const attackSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 7, stiffness: 160}
  });

  return (
    <PixelWrapper
      title="STAGE 02 (V2 REVISION) // BOSS BATTLE: SPAIN"
      isOverlay={false}
      webcamLayout="full"
      isOverlay={isOverlay}
      webcamLayout={webcamLayout}
    >
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Battle Arena Frame */}
        <div style={{
          width: 900,
          height: 1100,
          background: isOverlay ? 'rgba(52, 80, 161, 0.7)' : PIXEL_COLORS.boxBlue,
          backdropFilter: isOverlay ? 'blur(12px)' : 'none',
          border: `8px double ${PIXEL_COLORS.panelBorder}`,
          borderRadius: 12,
          padding: 50,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 12px 0 #000'
        }}>
          {/* Boss Enemy Bar */}
          <div style={{
            background: PIXEL_COLORS.nightBlue,
            border: `4px solid ${PIXEL_COLORS.damageRed}`,
            padding: 24,
            borderRadius: 8
          }}>
            <div style={{fontSize: 24, color: PIXEL_COLORS.damageRed, marginBottom: 12}}>
              BOSS: SPAIN (LVL 99 FAVORITE)
            </div>
            {/* HP Bar */}
            <div style={{
              height: 24,
              background: '#000',
              border: '2px solid #FFF',
              padding: 2
            }}>
              <div style={{height: '100%', width: '100%', background: PIXEL_COLORS.hpGreen}} />
            </div>
          </div>

          {/* Defense Shield Block graphic */}
          <div style={{
            textAlign: 'center',
            padding: 40,
            background: 'rgba(27, 29, 54, 0.9)',
            border: `4px solid ${PIXEL_COLORS.coinGold}`,
            borderRadius: 8
          }}>
            <div style={{fontSize: 48, color: PIXEL_COLORS.coinGold, marginBottom: 20}}>
              🛡️ DEFENSE: BLOCK!
            </div>
            <div style={{fontSize: 24, color: PIXEL_COLORS.hpGreen}}>
              0 DAMAGE TAKEN // PERFECT SHUTOUT
            </div>
          </div>

          {/* Block Banner popup */}
          {frame > fps * 2.8 && (
            <div style={{
              position: 'absolute',
              top: 450,
              left: 60,
              right: 60,
              transform: `scale(${attackSpring}) rotate(-4deg)`,
              opacity: attackSpring,
              background: PIXEL_COLORS.damageRed,
              color: '#FFF',
              border: '6px solid #FFF',
              padding: '30px 20px',
              textAlign: 'center',
              borderRadius: 8,
              fontSize: 32,
              boxShadow: '0 10px 0 #000'
            }}>
              CRITICAL SHUTOUT! 0 GOALS!
            </div>
          )}

          {/* Player Party HP Bar */}
          <div style={{
            background: PIXEL_COLORS.nightBlue,
            border: `4px solid ${PIXEL_COLORS.hpGreen}`,
            padding: 24,
            borderRadius: 8
          }}>
            <div style={{fontSize: 20, color: PIXEL_COLORS.hpGreen, marginBottom: 10}}>
              PARTY: CAPE VERDE (2ND WORLD CUP)
            </div>
            <div style={{fontSize: 16, color: PIXEL_COLORS.coinGold}}>
              HP: 100% // STATUS: UNBEATEN
            </div>
          </div>
        </div>
      </div>
    </PixelWrapper>
  );
};
