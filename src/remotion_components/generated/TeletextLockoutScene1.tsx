import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

// Color Palette matching CHRON_STYLE_69 (Teletext / Retro Broadcast)
const COLORS = {
  black: '#000000',
  red: '#ff0000',
  darkRed: '#4a0000',
  green: '#00ff00',
  yellow: '#ffff00',
  blue: '#0000ff',
  magenta: '#ff00ff',
  cyan: '#00ffff',
  white: '#ffffff',
};

export default function TeletextLockoutScene1() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // CRT Power-On Animation (0 to 12 frames)
  const scaleX = interpolate(frame, [0, 4, 12], [0, 1.05, 1], { extrapolateRight: 'clamp' });
  const scaleY = interpolate(frame, [0, 4, 12], [0.01, 0.05, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(frame, [0, 3], [0, 1], { extrapolateRight: 'clamp' });

  // CRT Power-Off Animation (65 to 75 frames)
  const exitFrame = 65;
  const isExiting = frame >= exitFrame;
  const exitProgress = interpolate(frame, [exitFrame, 74], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const finalScaleX = isExiting ? interpolate(exitProgress, [0, 0.5, 1], [1, 1.1, 0], { extrapolateRight: 'clamp' }) : scaleX;
  const finalScaleY = isExiting ? interpolate(exitProgress, [0, 0.5, 1], [1, 0.02, 0], { extrapolateRight: 'clamp' }) : scaleY;
  const finalOpacity = isExiting ? interpolate(exitProgress, [0.4, 1], [1, 0], { extrapolateRight: 'clamp' }) : opacity;

  // Flash frequencies
  const flashFast = Math.floor(frame / 6) % 2 === 0;
  const flashSlow = Math.floor(frame / 12) % 2 === 0;

  // CRT Scanline flicker simulation
  const flicker = interpolate(frame % 4, [0, 1, 2, 3], [0.98, 1, 0.96, 0.99]);

  // Teletext screen size
  const screenWidth = 800;
  const screenHeight = 560;

  // Generate block-graphic border
  const renderBorderBlocks = (flash: boolean) => {
    const blocks = [];
    const blockSize = 20;
    const cols = screenWidth / blockSize;
    const rows = screenHeight / blockSize;
    const color = flash ? COLORS.red : COLORS.darkRed;

    // Top Row
    for (let i = 0; i < cols; i++) {
      blocks.push(
        <rect
          key={`t-${i}`}
          x={i * blockSize}
          y={0}
          width={blockSize - 2}
          height={blockSize - 2}
          fill={color}
        />
      );
    }
    // Bottom Row
    for (let i = 0; i < cols; i++) {
      blocks.push(
        <rect
          key={`b-${i}`}
          x={i * blockSize}
          y={screenHeight - blockSize}
          width={blockSize - 2}
          height={blockSize - 2}
          fill={color}
        />
      );
    }
    // Left Column (excluding corners)
    for (let i = 1; i < rows - 1; i++) {
      blocks.push(
        <rect
          key={`l-${i}`}
          x={0}
          y={i * blockSize}
          width={blockSize - 2}
          height={blockSize - 2}
          fill={color}
        />
      );
    }
    // Right Column (excluding corners)
    for (let i = 1; i < rows - 1; i++) {
      blocks.push(
        <rect
          key={`r-${i}`}
          x={screenWidth - blockSize}
          y={i * blockSize}
          width={blockSize - 2}
          height={blockSize - 2}
          fill={color}
        />
      );
    }

    return blocks;
  };

  // Dynamic Teletext dynamic clock / frame counter
  const pad = (num: number) => String(num).padStart(2, '0');
  const minutes = pad(Math.floor(frame / 600) % 60);
  const seconds = pad(Math.floor(frame / 30) % 60);
  const frames = pad(frame % 30);
  const teletextTime = `10:${minutes}:${seconds}.${frames}`;

  // Teletext rows with custom staggered load-in
  const rows = [
    { type: 'header', text: `P100   SECURE_SYS   ${teletextTime}`, color: COLORS.white },
    { type: 'spacer', height: 25 },
    { type: 'alert', text: 'WARNING: UNAUTHORIZED ATTEMPT', color: COLORS.red, flash: true },
    { type: 'divider', color: COLORS.blue },
    { type: 'lockout_graphic' }, // Exclamation + ACCESS DENIED
    { type: 'divider', color: COLORS.blue },
    { type: 'text', text: 'CRITICAL SECURITY BREACH DETECTED', color: COLORS.green },
    { type: 'text', text: 'IP LOGGED & TRACED TO TERMINAL', color: COLORS.white },
    { type: 'text', text: 'DISCONNECT IMMEDIATELY', color: COLORS.yellow, flash: true },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Outer CRT monitor container */}
      <div
        style={{
          width: screenWidth,
          height: screenHeight,
          backgroundColor: COLORS.black,
          position: 'relative',
          fontFamily: '"Courier New", Courier, monospace',
          textTransform: 'uppercase',
          transform: `scale(${finalScaleX}, ${finalScaleY})`,
          opacity: finalOpacity * flicker,
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(0, 0, 0, 1)',
          border: '6px solid #222',
          borderRadius: '10px',
          boxSizing: 'border-box',
        }}
      >
        {/* Flashing Red Block Graphic Warning Border */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10,
          }}
          viewBox={`0 0 ${screenWidth} ${screenHeight}`}
        >
          {renderBorderBlocks(flashFast)}
        </svg>

        {/* Content Area */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {rows.map((row, index) => {
            // Teletext sequential drawing simulation
            const revealFrame = 6 + index * 2;
            if (frame < revealFrame) return null;

            switch (row.type) {
              case 'header':
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: row.color,
                      fontSize: '20px',
                      fontWeight: 'bold',
                      letterSpacing: '2px',
                      marginBottom: '10px',
                      textShadow: `1px 1px 0px ${COLORS.black}`,
                    }}
                  >
                    <span>{row.text}</span>
                  </div>
                );

              case 'spacer':
                return <div key={index} style={{ height: row.height }} />;

              case 'alert':
                const alertColor = row.flash && !flashFast ? COLORS.darkRed : row.color;
                return (
                  <div
                    key={index}
                    style={{
                      color: alertColor,
                      fontSize: '22px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      letterSpacing: '1px',
                      marginBottom: '15px',
                    }}
                  >
                    {row.text}
                  </div>
                );

              case 'divider':
                return (
                  <div
                    key={index}
                    style={{
                      color: row.color,
                      fontSize: '16px',
                      textAlign: 'center',
                      marginBottom: '15px',
                      overflow: 'hidden',
                      height: '18px',
                      letterSpacing: '-1px',
                    }}
                  >
                    ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
                  </div>
                );

              case 'lockout_graphic':
                const blinkCyan = flashSlow ? COLORS.cyan : COLORS.black;
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '30px',
                      margin: '20px 0',
                    }}
                  >
                    {/* Yellow Pixel Exclamation Mark */}
                    <svg
                      width="50"
                      height="80"
                      viewBox="0 0 6 10"
                      style={{ shapeRendering: 'crispEdges' }}
                    >
                      {/* Top section of ! */}
                      <rect x="2" y="0" width="2" height="6" fill={COLORS.yellow} />
                      {/* Bottom dot of ! */}
                      <rect x="2" y="8" width="2" height="2" fill={COLORS.yellow} />
                    </svg>

                    {/* Double-Height Cyan Mosaic Text */}
                    <div
                      style={{
                        color: blinkCyan,
                        fontSize: '52px',
                        fontWeight: 900,
                        letterSpacing: '4px',
                        transform: 'scaleY(1.8)',
                        transformOrigin: 'center',
                        textShadow: `3px 3px 0px ${COLORS.darkRed}`,
                      }}
                    >
                      ACCESS DENIED
                    </div>
                  </div>
                );

              case 'text':
                const textColor = row.flash && !flashFast ? 'transparent' : row.color;
                return (
                  <div
                    key={index}
                    style={{
                      color: textColor,
                      fontSize: '18px',
                      textAlign: 'center',
                      margin: '8px 0',
                      letterSpacing: '1.5px',
                      fontWeight: 'bold',
                    }}
                  >
                    {row.text}
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        {/* CRT Glass Cover & Scanline Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%), 
              linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))
            `,
            backgroundSize: '100% 6px, 6px 100%',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />

        {/* Retro screen vignette / glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            boxShadow: 'inset 0 0 80px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            zIndex: 21,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}