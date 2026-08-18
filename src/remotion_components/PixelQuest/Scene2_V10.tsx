import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';
import {PixelWrapper} from './PixelWrapper';

export const PixelScene2_V10: React.FC<{
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

  // Neon Green Theme Colors
  const NEON_GREEN = '#00FF66';
  const NEON_GREEN_BRIGHT = '#39FF14';
  const NEON_GREEN_GLOW = 'rgba(0, 255, 102, 0.6)';
  const NEON_GREEN_BG = 'rgba(5, 28, 12, 0.92)';
  const NEON_DARK_BOX = '#031409';

  return (
    <PixelWrapper
      title="STAGE 02 // BOSS BATTLE: SPAIN"
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
          background: isOverlay ? 'transparent' : NEON_DARK_BOX,
          backdropFilter: isOverlay ? 'blur(12px)' : 'none',
          border: `8px double ${NEON_GREEN}`,
          borderRadius: 12,
          padding: 50,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: `0 0 30px ${NEON_GREEN_GLOW}, 0 12px 0 #000`
        }}>
          {/* Boss Enemy Bar */}
          <div style={{
            background: NEON_GREEN_BG,
            border: `4px solid ${NEON_GREEN}`,
            padding: 24,
            borderRadius: 8,
            boxShadow: `0 0 15px rgba(0, 255, 102, 0.3)`
          }}>
            <div style={{fontSize: 24, color: NEON_GREEN_BRIGHT, marginBottom: 12, textShadow: `0 0 10px ${NEON_GREEN}`}}>
              BOSS: SPAIN (LVL 99 FAVORITE)
            </div>
            {/* HP Bar */}
            <div style={{
              height: 24,
              background: '#000',
              border: `2px solid ${NEON_GREEN}`,
              padding: 2
            }}>
              <div style={{
                height: '100%',
                width: '100%',
                background: NEON_GREEN_BRIGHT,
                boxShadow: `0 0 12px ${NEON_GREEN_BRIGHT}`
              }} />
            </div>
          </div>

          {/* Defense Shield Block graphic */}
          <div style={{
            textAlign: 'center',
            padding: 40,
            background: NEON_GREEN_BG,
            border: `4px solid ${NEON_GREEN_BRIGHT}`,
            borderRadius: 8,
            boxShadow: `0 0 20px rgba(57, 255, 20, 0.35)`
          }}>
            <div style={{fontSize: 48, color: NEON_GREEN_BRIGHT, marginBottom: 20, textShadow: `0 0 12px ${NEON_GREEN_BRIGHT}`}}>
              🛡️ DEFENSE: BLOCK!
            </div>
            <div style={{fontSize: 24, color: NEON_GREEN, textShadow: `0 0 8px ${NEON_GREEN_GLOW}`}}>
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
              background: NEON_GREEN_BRIGHT,
              color: '#000',
              border: '6px solid #000',
              padding: '30px 20px',
              textAlign: 'center',
              borderRadius: 8,
              fontSize: 32,
              fontWeight: 'bold',
              boxShadow: `0 0 35px ${NEON_GREEN_BRIGHT}, 0 10px 0 #000`
            }}>
              CRITICAL SHUTOUT! 0 GOALS!
            </div>
          )}

          {/* Player Party HP Bar */}
          <div style={{
            background: NEON_GREEN_BG,
            border: `4px solid ${NEON_GREEN}`,
            padding: 24,
            borderRadius: 8,
            boxShadow: `0 0 15px rgba(0, 255, 102, 0.3)`
          }}>
            <div style={{fontSize: 20, color: NEON_GREEN, marginBottom: 10, textShadow: `0 0 8px ${NEON_GREEN}`}}>
              PARTY: CAPE VERDE (2ND WORLD CUP)
            </div>
            <div style={{fontSize: 16, color: NEON_GREEN_BRIGHT}}>
              HP: 100% // STATUS: UNBEATEN
            </div>
          </div>
        </div>
      </div>
    </PixelWrapper>
  );
};