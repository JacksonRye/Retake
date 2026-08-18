import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';
import {PixelWrapper} from './PixelWrapper';

export const PixelScene2_V9: React.FC<{
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

  // Floating vertical motion for text floating over video
  const floatY = Math.sin(frame / 12) * 12;
  const subFloatY = Math.cos(frame / 15) * 8;

  const cyanGlow = '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 35px #00FFFF';

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
        justifyContent: 'center',
        transform: `translateY(${floatY}px)`
      }}>
        {/* Battle Arena Frame Floating Over Video */}
        <div style={{
          width: 900,
          height: 1100,
          background: isOverlay ? 'rgba(5, 15, 30, 0.65)' : 'rgba(10, 25, 45, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '8px double #00FFFF',
          borderRadius: 12,
          padding: 50,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.4), 0 12px 0 #000'
        }}>
          {/* Boss Enemy Bar */}
          <div style={{
            background: 'rgba(0, 20, 40, 0.8)',
            border: '4px solid #00FFFF',
            padding: 24,
            borderRadius: 8,
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
          }}>
            <div style={{
              fontSize: 24,
              color: '#00FFFF',
              marginBottom: 12,
              textShadow: cyanGlow,
              letterSpacing: 2,
              fontWeight: 'bold'
            }}>
              BOSS: SPAIN (LVL 99 FAVORITE)
            </div>
            {/* HP Bar */}
            <div style={{
              height: 24,
              background: '#000',
              border: '2px solid #00FFFF',
              padding: 2,
              boxShadow: '0 0 10px #00FFFF'
            }}>
              <div style={{
                height: '100%',
                width: '100%',
                background: '#00FFFF',
                boxShadow: '0 0 15px #00FFFF'
              }} />
            </div>
          </div>

          {/* Defense Shield Block graphic */}
          <div style={{
            textAlign: 'center',
            padding: 40,
            background: 'rgba(0, 30, 50, 0.85)',
            border: '4px solid #00FFFF',
            borderRadius: 8,
            boxShadow: '0 0 25px rgba(0, 255, 255, 0.3)',
            transform: `translateY(${subFloatY}px)`
          }}>
            <div style={{
              fontSize: 48,
              color: '#00FFFF',
              marginBottom: 20,
              textShadow: cyanGlow,
              letterSpacing: 3
            }}>
              🛡️ DEFENSE: BLOCK!
            </div>
            <div style={{
              fontSize: 24,
              color: '#00FFFF',
              textShadow: cyanGlow,
              letterSpacing: 1
            }}>
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
              background: '#00FFFF',
              color: '#05101E',
              border: '6px solid #FFF',
              padding: '30px 20px',
              textAlign: 'center',
              borderRadius: 8,
              fontSize: 32,
              fontWeight: 'bold',
              boxShadow: '0 0 35px #00FFFF, 0 10px 0 #000'
            }}>
              CRITICAL SHUTOUT! 0 GOALS!
            </div>
          )}

          {/* Player Party HP Bar */}
          <div style={{
            background: 'rgba(0, 20, 40, 0.8)',
            border: '4px solid #00FFFF',
            padding: 24,
            borderRadius: 8,
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
          }}>
            <div style={{
              fontSize: 20,
              color: '#00FFFF',
              marginBottom: 10,
              textShadow: cyanGlow,
              letterSpacing: 2
            }}>
              PARTY: CAPE VERDE (2ND WORLD CUP)
            </div>
            <div style={{
              fontSize: 16,
              color: '#00FFFF',
              textShadow: cyanGlow,
              letterSpacing: 1
            }}>
              HP: 100% // STATUS: UNBEATEN
            </div>
          </div>
        </div>
      </div>
    </PixelWrapper>
  );
};