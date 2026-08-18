import React from 'react';
import {AbsoluteFill} from 'remotion';
import {AIRMAIL_COLORS, AIRMAIL_FONTS} from './constants';

export const AirmailWrapper: React.FC<{
  children: React.ReactNode;
  title?: string;
  isOverlay?: boolean;
  webcamLayout?: 'full' | 'left' | 'right' | 'top' | 'bottom';
}> = ({
  children,
  title = "PAR AVION // INTERNATIONAL DISPATCH",
  isOverlay = false,
  webcamLayout = 'full'
}) => {
  // Layout positioning styles for webcam clearance
  const getLayoutStyles = () => {
    switch (webcamLayout) {
      case 'left':
        return {left: '50%', right: 40};
      case 'right':
        return {left: 40, right: '50%'};
      case 'top':
        return {top: '40%', bottom: 80};
      case 'bottom':
        return {top: 120, bottom: '40%'};
      default:
        return {left: 40, right: 40, top: 120, bottom: 80};
    }
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: isOverlay ? 'transparent' : AIRMAIL_COLORS.cream,
      color: AIRMAIL_COLORS.darkInk,
      fontFamily: AIRMAIL_FONTS.mono,
      overflow: 'hidden'
    }}>
      {/* Airmail Border Stripes (Red & Blue Chevrons) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 24,
        background: `repeating-linear-gradient(
          -45deg,
          ${AIRMAIL_COLORS.red},
          ${AIRMAIL_COLORS.red} 25px,
          transparent 25px,
          transparent 35px,
          ${AIRMAIL_COLORS.blue} 35px,
          ${AIRMAIL_COLORS.blue} 60px,
          transparent 60px,
          transparent 70px
        )`
      }} />

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 24,
        background: `repeating-linear-gradient(
          -45deg,
          ${AIRMAIL_COLORS.red},
          ${AIRMAIL_COLORS.red} 25px,
          transparent 25px,
          transparent 35px,
          ${AIRMAIL_COLORS.blue} 35px,
          ${AIRMAIL_COLORS.blue} 60px,
          transparent 60px,
          transparent 70px
        )`
      }} />

      {/* Par Avion Blue Stamp Header */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: 40,
        background: AIRMAIL_COLORS.blue,
        color: '#FFF',
        padding: '6px 20px',
        borderRadius: 4,
        fontFamily: AIRMAIL_FONTS.stamp,
        fontSize: 18,
        letterSpacing: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
      }}>
        BY AIR MAIL // PAR AVION
      </div>

      {/* Top Right Header Subtext */}
      <div style={{
        position: 'absolute',
        top: 40,
        right: 40,
        fontSize: 14,
        color: isOverlay ? '#FFF' : AIRMAIL_COLORS.grey,
        letterSpacing: 1,
        textShadow: isOverlay ? '0 2px 8px rgba(0,0,0,0.8)' : 'none'
      }}>
        {title}
      </div>

      {/* Main Content Area Recomposed for Layout */}
      <div style={{
        position: 'absolute',
        ...getLayoutStyles(),
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </div>
    </AbsoluteFill>
  );
};
