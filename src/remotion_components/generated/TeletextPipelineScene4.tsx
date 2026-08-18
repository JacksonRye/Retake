import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

// CHRON_STYLE_69: Teletext / Retro-broadcast terminal aesthetic.
// Colors: Classic 3-bit RGB palette (Black, Red, Green, Yellow, Blue, Magenta, Cyan, White)
const COLORS = {
  black: '#000000',
  red: '#FF0000',
  darkRed: '#550000',
  green: '#00FF00',
  yellow: '#FFFF00',
  blue: '#0000FF',
  magenta: '#FF00FF',
  cyan: '#00FFFF',
  white: '#FFFFFF',
};

const COLS = 40;
const ROWS = 24;
const CELL_W = 24;
const CELL_H = 30;

export default function TeletextPipelineScene4() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance and Exit transitions
  const entrance = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.4, stiffness: 80 },
    durationInFrames: 15,
  });

  const exit = spring({
    frame: Math.max(0, frame - 60),
    fps,
    config: { damping: 11, mass: 0.4, stiffness: 80 },
    durationInFrames: 15,
  });

  const scale = interpolate(entrance - exit, [0, 1], [0.8, 1]);
  const opacity = interpolate(entrance - exit, [0, 1], [0, 1]);

  // Teletext Blink state (toggles every 8 frames, ~3Hz)
  const blink = Math.floor(frame / 8) % 2 === 0;
  const gateFlash = Math.floor(frame / 5) % 2 === 0;

  // Render helper for classic teletext color blocks (F1-F4 keys)
  const renderColorKey = (color: string, label: string) => (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 16 }}>
      <span style={{ backgroundColor: color, width: 18, height: 18, marginRight: 6, display: 'inline-block' }} />
      <span style={{ color: COLORS.white, fontSize: 18, fontWeight: 'bold' }}>{label}</span>
    </div>
  );

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
      {/* Retro Terminal Container */}
      <div
        style={{
          width: COLS * CELL_W,
          height: ROWS * CELL_H,
          backgroundColor: COLORS.black,
          border: `6px double ${COLORS.white}`,
          boxShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
          fontFamily: '"Courier New", Courier, monospace',
          position: 'relative',
          overflow: 'hidden',
          transform: `scale(${scale})`,
          opacity: opacity,
        }}
      >
        {/* Header Row (Row 0) */}
        <div
          style={{
            height: CELL_H,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
            borderBottom: `2px solid ${COLORS.blue}`,
            backgroundColor: '#111',
          }}
        >
          <span style={{ color: COLORS.white, fontWeight: 'bold' }}>P404</span>
          <span style={{ color: COLORS.yellow, fontWeight: 'bold' }}>CHRON-TV</span>
          <span style={{ color: COLORS.green, fontWeight: 'bold' }}>PIPELINE</span>
          <span style={{ color: COLORS.cyan, fontWeight: 'bold' }}>
            {`12:34:${String(45 + Math.floor(frame / 30)).padStart(2, '0')}`}
          </span>
        </div>

        {/* Waterfall Flow Area (Rows 1 to 12) */}
        <div
          style={{
            height: CELL_H * 12,
            position: 'relative',
            overflow: 'hidden',
            padding: '0 12px',
          }}
        >
          {Array.from({ length: COLS - 2 }).map((_, colIndex) => {
            const colX = (colIndex + 1) * CELL_W;
            // Generate deterministic waterfall pattern per column
            const hasStream = (Math.sin(colIndex * 0.7) > -0.4);
            if (!hasStream) return null;

            const speed = 1.2;
            const offset = Math.floor(frame * speed);
            const columnPhase = (colIndex * 7) % 13;

            return (
              <div
                key={colIndex}
                style={{
                  position: 'absolute',
                  left: colX,
                  top: 0,
                  width: CELL_W,
                  height: CELL_H * 12,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {Array.from({ length: 12 }).map((_, rowIndex) => {
                  const charIndex = (rowIndex - offset + columnPhase) % 10;
                  const isVisible = charIndex >= 0 && (charIndex % 3 !== 0);
                  const chars = ['█', '▚', '▒', '░', '▞', '1', '0', 'X', '▖', '▝'];
                  const char = chars[Math.abs(charIndex) % chars.length];

                  return (
                    <div
                      key={rowIndex}
                      style={{
                        height: CELL_H,
                        color: COLORS.green,
                        fontSize: 22,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        lineHeight: `${CELL_H}px`,
                        opacity: isVisible ? 1 : 0,
                      }}
                    >
                      {char}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* The Gate Blocker (Rows 13 to 15) */}
        <div
          style={{
            position: 'absolute',
            top: CELL_H * 12,
            left: 0,
            width: '100%',
            height: CELL_H * 3,
            backgroundColor: gateFlash ? COLORS.red : COLORS.darkRed,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderTop: `4px solid ${COLORS.white}`,
            borderBottom: `4px solid ${COLORS.white}`,
            transition: 'background-color 0.1s ease',
            zIndex: 10,
          }}
        >
          {/* Double-height Block Text "GATE" */}
          <div
            style={{
              color: COLORS.white,
              fontSize: 54,
              fontWeight: 900,
              letterSpacing: 16,
              transform: 'scaleY(1.8)',
              transformOrigin: 'center',
              textShadow: `3px 3px 0px ${COLORS.black}`,
              display: 'flex',
              alignItems: 'center',
              visibility: blink ? 'visible' : 'visible', // solid presence, text can blink if needed
            }}
          >
            [GATE]
          </div>
        </div>

        {/* Stalled Output/Bypass Area (Rows 16 to 22) */}
        <div
          style={{
            height: CELL_H * 7,
            position: 'absolute',
            top: CELL_H * 15,
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.black,
          }}
        >
          {/* Static Warning Blocks below the gate */}
          <div
            style={{
              color: COLORS.yellow,
              fontSize: 20,
              fontWeight: 'bold',
              letterSpacing: 2,
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            ▲ STATUS: PIPELINE BLOCKED ▲
          </div>
          <div
            style={{
              color: blink ? COLORS.red : COLORS.white,
              fontSize: 18,
              fontWeight: 'bold',
              letterSpacing: 1,
              textAlign: 'center',
              border: `2px solid ${COLORS.red}`,
              padding: '6px 16px',
              backgroundColor: '#1a0000',
            }}
          >
            CRITICAL GATE ACTIVE - FLOW HALTED
          </div>
        </div>

        {/* Footer Row (Row 23) */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: CELL_H,
            borderTop: `2px solid ${COLORS.blue}`,
            backgroundColor: '#111',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 16,
          }}
        >
          {renderColorKey(COLORS.red, 'HALT')}
          {renderColorKey(COLORS.green, 'FLOW')}
          {renderColorKey(COLORS.yellow, 'BYPASS')}
          {renderColorKey(COLORS.cyan, 'RETRY')}
        </div>

        {/* Scanline Overlay Effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
            backgroundSize: '100% 4px',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}