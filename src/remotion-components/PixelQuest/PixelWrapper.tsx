import React from 'react';
import {AbsoluteFill} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';

export const PixelWrapper: React.FC<{
  children: React.ReactNode;
  title?: string;
  isOverlay?: boolean;
  webcamLayout?: 'full' | 'left' | 'right' | 'top' | 'bottom';
}> = ({
  children,
  title = "QUEST LOG // CHRON_STYLE_72",
  isOverlay = false,
  webcamLayout = 'full'
}) => {
  const getLayoutStyles = () => {
    switch (webcamLayout) {
      case 'left':
        return {left: '48%', right: 30};
      case 'right':
        return {left: 30, right: '48%'};
      case 'top':
        return {top: '45%', bottom: 40};
      case 'bottom':
        return {top: 140, bottom: '45%'};
      default:
        return {left: 30, right: 30, top: 140, bottom: 40};
    }
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: isOverlay ? 'transparent' : PIXEL_COLORS.nightBlue,
      color: PIXEL_COLORS.pixelWhite,
      fontFamily: PIXEL_FONTS.pixel,
      overflow: 'hidden'
    }}>
      {/* Starfield Backdrop (Hidden in overlay mode) */}
      {!isOverlay && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${PIXEL_COLORS.coinGold} 2px, transparent 2px)`,
          backgroundSize: '60px 60px',
          opacity: 0.15
        }} />
      )}

      {/* JRPG Top Quest Header */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: 30,
        right: 30,
        background: PIXEL_COLORS.boxBlue,
        border: `6px double ${PIXEL_COLORS.panelBorder}`,
        borderRadius: 8,
        padding: '12px 20px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        boxShadow: '0 8px 0 #000'
      }}>
        <div style={{fontSize: 16, color: PIXEL_COLORS.coinGold}}>
          ★ {title}
        </div>
        <div style={{fontSize: 12, color: PIXEL_COLORS.pixelWhite}}>
          WORLD CUP 8-BIT
        </div>
      </div>

      {/* Main Content Area */}
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
