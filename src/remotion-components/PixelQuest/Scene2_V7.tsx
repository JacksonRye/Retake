import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';

export const PixelScene2_V7: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const popSpring = spring({
    frame,
    fps,
    config: {damping: 8, stiffness: 180}
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: PIXEL_FONTS.pixel
    }}>
      {/* Floating Gold Scoreboard Banner */}
      <div style={{
        transform: `scale(${popSpring}) translateY(${Math.sin(frame / 6) * 10}px)`,
        background: 'linear-gradient(185deg, #FFD700, #FFA500)',
        border: '8px double #FFF',
        borderRadius: 16,
        padding: '30px 60px',
        textAlign: 'center',
        boxShadow: '0 16px 0 #000, 0 0 40px rgba(255,215,0,0.6)'
      }}>
        <div style={{
          fontSize: 32,
          color: '#000',
          letterSpacing: 4,
          marginBottom: 12,
          textShadow: '0 2px 0 #FFF'
        }}>
          ★ MATCH RESULT ★
        </div>
        
        <div style={{
          fontSize: 64,
          color: '#FFF',
          fontFamily: PIXEL_FONTS.pixel,
          letterSpacing: 6,
          textShadow: '0 8px 0 #000, 0 0 20px #FFD700'
        }}>
          WINNER
        </div>

        <div style={{
          fontSize: 20,
          color: '#000',
          marginTop: 16,
          background: 'rgba(255,255,255,0.9)',
          padding: '8px 20px',
          borderRadius: 8
        }}>
          CAPE VERDE // SHUTOUT VICTORY
        </div>
      </div>
    </AbsoluteFill>
  );
};
