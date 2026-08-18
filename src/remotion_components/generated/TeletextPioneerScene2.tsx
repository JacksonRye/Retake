import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

// CHRON_STYLE_69: Teletext Retro / Low-Fi 8-Bit Archive Aesthetic
// Color Palette: Black, White, Lime Green, Magenta, Cyan, Yellow
const COLORS = {
  bg: '#000000',
  white: '#FFFFFF',
  green: '#00FF00',
  darkGreen: '#003300',
  magenta: '#FF00FF',
  darkMagenta: '#330033',
  cyan: '#00FFFF',
  darkCyan: '#003333',
  yellow: '#FFFF00',
  darkGrey: '#111111',
  grey: '#555555'
};

// 12x16 Grid representing the 8-bit ASCII Server Rack blueprint
// 0 = Empty, 1 = Frame (White), 2 = Server Unit (Green), 3 = LED 1, 4 = LED 2, 5 = LED 3
const RACK_GRID = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 0, 3, 0, 4, 0, 5, 0, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 0, 3, 0, 4, 0, 5, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 0, 3, 0, 4, 0, 5, 0, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 0, 3, 0, 4, 0, 5, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 0, 3, 0, 4, 0, 5, 0, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 0, 3, 0, 4, 0, 5, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 0, 3, 0, 4, 0, 5, 0, 1],
  [1, 2, 2, 2, 2, 2, 2, 2, 0, 3, 0, 4, 0, 5, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export default function TeletextPioneerScene2() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Dynamic animations
  const blink = Math.floor(frame / 6) % 2 === 0;
  const fastBlink = Math.floor(frame / 3) % 2 === 0;

  // Entrance spring (CRT screen power-on zoom & scale)
  const entrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 100 },
  });

  // Exit transition (Slide down / wipe)
  const exitProgress = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const exitTranslateY = exitProgress * 800;

  // CRT Screen Flicker
  const flickerOpacity = interpolate(
    Math.sin(frame * 0.8),
    [-1, 1],
    [0.96, 1]
  );

  // Teletext Row-by-Row load simulation
  // We reveal rows sequentially to mimic authentic low-baud teletext rendering
  const isRowRevealed = (rowIndex: number) => {
    const revealThreshold = rowIndex * 1.8 + 4;
    return frame >= revealThreshold;
  };

  // Fluctuating system stats for live retro look
  const tempVal = 38 + (Math.floor(frame / 12) % 3);
  const loadVal = 84 + (Math.floor(frame / 8) % 12);
  const loadBarBlocks = Math.floor(loadVal / 10);
  const loadBar = '█'.repeat(loadBarBlocks) + '░'.repeat(10 - loadBarBlocks);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Courier New", Courier, monospace',
        overflow: 'hidden',
      }}
    >
      {/* CRT Monitor Frame */}
      <div
        style={{
          width: '960px',
          height: '540px',
          backgroundColor: COLORS.bg,
          border: `6px solid ${COLORS.grey}`,
          borderRadius: '16px',
          padding: '24px',
          boxSizing: 'border-box',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0px 20px 40px rgba(0,0,0,0.8), inset 0 0 40px rgba(0, 255, 0, 0.15)',
          transform: `scale(${entrance}) translateY(${exitTranslateY}px)`,
          opacity: flickerOpacity,
          overflow: 'hidden',
        }}
      >
        {/* Scanline overlay effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%)',
            backgroundSize: '100% 4px',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* ROW 0: Header (P10EER_SYS & P300) */}
        {isRowRevealed(0) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            <span
              style={{
                color: blink ? COLORS.magenta : COLORS.white,
                backgroundColor: COLORS.darkGrey,
                padding: '2px 8px',
                border: `1px solid ${COLORS.magenta}`,
              }}
            >
              P10EER_SYS
            </span>
            <span style={{ color: COLORS.cyan, fontSize: '20px' }}>
              CEEFAX 1 299
            </span>
            <span style={{ color: COLORS.yellow }}>
              P300
            </span>
          </div>
        )}

        {/* ROW 1: Mosaic Separator */}
        {isRowRevealed(1) && (
          <div
            style={{
              color: COLORS.yellow,
              fontSize: '12px',
              letterSpacing: '1px',
              marginBottom: '16px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
          </div>
        )}

        {/* Main Content Area */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          {/* Left Column: Server Rack Mosaic Blueprint */}
          <div
            style={{
              width: '45%',
              display: 'flex',
              flexDirection: 'column',
              visibility: isRowRevealed(2) ? 'visible' : 'hidden',
            }}
          >
            <div
              style={{
                color: COLORS.cyan,
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '10px',
                textTransform: 'uppercase',
              }}
            >
              [RACK_LAYOUT_SYS_B]
            </div>

            {/* 8-bit Mosaic Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(16, 1fr)',
                gap: '2px',
                backgroundColor: '#050505',
                padding: '12px',
                border: `3px dashed ${COLORS.green}`,
                borderRadius: '4px',
                aspectRatio: '16/13',
              }}
            >
              {RACK_GRID.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                  let cellBg = 'transparent';
                  if (cell === 1) cellBg = COLORS.white;
                  if (cell === 2) cellBg = COLORS.green;
                  if (cell === 3) cellBg = blink ? COLORS.green : COLORS.darkGreen;
                  if (cell === 4) cellBg = fastBlink ? COLORS.magenta : COLORS.darkMagenta;
                  if (cell === 5) cellBg = !blink ? COLORS.cyan : COLORS.darkCyan;

                  return (
                    <div
                      key={`${rIndex}-${cIndex}`}
                      style={{
                        backgroundColor: cellBg,
                        aspectRatio: '1',
                        transition: 'background-color 0.05s ease',
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: Diagnostics & Metadata */}
          <div
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              fontSize: '18px',
              lineHeight: '1.5',
            }}
          >
            {/* Row 3: Section Title */}
            {isRowRevealed(3) && (
              <div style={{ color: COLORS.magenta, fontWeight: 'bold', marginBottom: '8px' }}>
                PAGE 300 - INDEX DIAGNOSTICS
              </div>
            )}

            {/* Row 4: Divider */}
            {isRowRevealed(4) && (
              <div style={{ color: COLORS.white, marginBottom: '8px' }}>
                -----------------------------------
              </div>
            )}

            {/* Row 5: Hostname */}
            {isRowRevealed(5) && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: COLORS.white }}>SYSTEM:</span>
                <span style={{ color: COLORS.green }}>PIONEER_SVR_2</span>
              </div>
            )}

            {/* Row 6: Status */}
            {isRowRevealed(6) && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: COLORS.white }}>STATUS:</span>
                <span style={{ color: blink ? COLORS.green : COLORS.white, fontWeight: 'bold' }}>
                  ● ACTIVE
                </span>
              </div>
            )}

            {/* Row 7: Temp */}
            {isRowRevealed(7) && (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: COLORS.white }}>TEMP:</span>
                <span style={{ color: COLORS.yellow }}>{tempVal}°C [NOMINAL]</span>
              </div>
            )}

            {/* Row 8: Load Bar */}
            {isRowRevealed(8) && (
              <div style={{ marginTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.cyan }}>
                  <span>LOAD:</span>
                  <span>{loadVal}%</span>
                </div>
                <div style={{ color: COLORS.green, letterSpacing: '2px', fontSize: '16px' }}>
                  [{loadBar}]
                </div>
              </div>
            )}

            {/* Row 9: Divider */}
            {isRowRevealed(9) && (
              <div style={{ color: COLORS.white, margin: '8px 0' }}>
                -----------------------------------
              </div>
            )}

            {/* Row 10: Teletext Prompt */}
            {isRowRevealed(10) && (
              <div style={{ color: COLORS.cyan, fontSize: '16px' }}>
                &gt; DEVOPS ARCHIVE BOOT COMPLETE.
                <br />
                &gt; PRESS RED FOR HARDWARE STATS.
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation (Classic Teletext Color Keys) */}
        {isRowRevealed(11) && (
          <div
            style={{
              display: 'flex',
              marginTop: 'auto',
              fontSize: '16px',
              fontWeight: 'bold',
              borderTop: `2px solid ${COLORS.grey}`,
              paddingTop: '12px',
            }}
          >
            <span style={{ backgroundColor: '#FF0000', color: '#000000', padding: '2px 10px', marginRight: '12px' }}>
              INDEX
            </span>
            <span style={{ backgroundColor: '#00FF00', color: '#000000', padding: '2px 10px', marginRight: '12px' }}>
              SERVERS
            </span>
            <span style={{ backgroundColor: '#FFFF00', color: '#000000', padding: '2px 10px', marginRight: '12px' }}>
              METRICS
            </span>
            <span style={{ backgroundColor: '#00FFFF', color: '#000000', padding: '2px 10px' }}>
              SYS_INFO
            </span>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}