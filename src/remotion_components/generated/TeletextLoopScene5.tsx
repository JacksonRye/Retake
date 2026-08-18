import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

// Style Constants for CHRON_STYLE_69 (Teletext / Retro Broadcast)
const CYAN = '#00ffff';
const MAGENTA = '#ff00ff';
const YELLOW = '#ffff00';
const WHITE = '#ffffff';
const BLACK = '#000000';
const RED = '#ff0000';
const GREEN = '#00ff00';
const BLUE = '#2244ff';

export default function TeletextLoopScene5() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3-frame choppy loop calculation
  const loopFrame = Math.floor(frame / 3) % 3;

  // Pulse/Flash state (changes every 6 frames)
  const flash = Math.floor(frame / 6) % 2 === 0;

  // CRT Exit collapse animation (starts at frame 62)
  const exitFrame = 62;
  const isExiting = frame >= exitFrame;
  const exitProgress = interpolate(frame, [exitFrame, 72], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const scaleY = isExiting ? interpolate(exitProgress, [0, 0.5], [1, 0.01], { extrapolateRight: 'clamp' }) : 1;
  const scaleX = isExiting ? interpolate(exitProgress, [0.5, 1], [1, 0], { extrapolateRight: 'clamp' }) : 1;
  const opacity = isExiting ? interpolate(exitProgress, [0.8, 1], [1, 0]) : 1;

  // Generate the 8-bit Ouroboros Arrow blocks programmatically
  const blocks: { x: number; y: number; color: string }[] = [];
  const numBlocks = 24;
  const radius = 6.5;
  const centerX = 12;
  const centerY = 12;

  for (let i = 0; i < numBlocks; i++) {
    // Leave a gap of 4 blocks for the Ouroboros tail/head separation
    if (i >= numBlocks - 4) continue;

    const angle = (i / numBlocks) * 2 * Math.PI;
    const x = Math.round(centerX + radius * Math.cos(angle));
    const y = Math.round(centerY + radius * Math.sin(angle));

    // Alternating colors with loop frame offset to create the illusion of rotation
    const color = (i + loopFrame) % 2 === 0 ? CYAN : MAGENTA;
    blocks.push({ x, y, color });
  }

  // Arrowhead at the leading edge (around index 19)
  const leadAngle = ((numBlocks - 5) / numBlocks) * 2 * Math.PI;
  
  // Arrowhead wings
  const headOffsets = [
    { r: 1.5, t: 0.4 },
    { r: 1.5, t: -0.4 },
    { r: 2.8, t: 0 }
  ];

  headOffsets.forEach((offset, idx) => {
    const ax = Math.round(centerX + (radius + offset.r) * Math.cos(leadAngle + offset.t));
    const ay = Math.round(centerY + (radius + offset.r) * Math.sin(leadAngle + offset.t));
    const color = (loopFrame + idx) % 2 === 0 ? CYAN : MAGENTA;
    blocks.push({ x: ax, y: ay, color });
  });

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
      {/* Teletext CRT Screen Container */}
      <div
        style={{
          width: '800px',
          height: '600px',
          backgroundColor: BLACK,
          border: `6px double ${WHITE}`,
          fontFamily: `'Courier New', Courier, monospace`,
          color: WHITE,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
          opacity: opacity,
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
          imageRendering: 'pixelated',
        }}
      >
        {/* CRT Scanline Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%),
              linear-gradient(90deg, rgba(255, 0, 0, 0.05), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.05))
            `,
            backgroundSize: '100% 4px, 6px 100%',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        {/* Teletext Header Bar */}
        <div
          style={{
            height: '40px',
            backgroundColor: BLACK,
            borderBottom: `2px solid ${WHITE}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            fontSize: '20px',
            fontWeight: 'bold',
          }}
        >
          <span style={{ color: WHITE }}>CEEFAX 1</span>
          <span style={{ color: YELLOW }}>P999</span>
          <span style={{ color: GREEN }}>CHRONIXEL</span>
          <span style={{ color: CYAN }}>
            {`00:00:${frame.toString().padStart(2, '0')}`}
          </span>
        </div>

        {/* Main Content Area */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Flashing Teletext Title */}
          <div
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: flash ? YELLOW : BLACK,
              backgroundColor: flash ? BLACK : YELLOW,
              padding: '4px 16px',
              border: `3px solid ${YELLOW}`,
              marginBottom: '30px',
              textAlign: 'center',
              letterSpacing: '2px',
            }}
          >
            P999: REPLAY_LOOP
          </div>

          {/* Ouroboros Arrow Graphic Container */}
          <div
            style={{
              width: '280px',
              height: '280px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* Choppy rotating SVG */}
            <svg
              viewBox="0 0 24 24"
              style={{
                width: '100%',
                height: '100%',
                transform: `rotate(${loopFrame * -15}deg)`,
                transition: 'transform 0.05s steps(1)',
              }}
            >
              {/* Mosaic Grid Background (Subtle) */}
              {Array.from({ length: 24 }).map((_, r) =>
                Array.from({ length: 24 }).map((_, c) => (
                  <rect
                    key={`bg-${r}-${c}`}
                    x={c}
                    y={r}
                    width="0.8"
                    height="0.8"
                    fill="rgba(255, 255, 255, 0.03)"
                  />
                ))
              )}

              {/* Active Ouroboros Mosaic Blocks */}
              {blocks.map((block, idx) => (
                <rect
                  key={`block-${idx}`}
                  x={block.x}
                  y={block.y}
                  width="0.9"
                  height="0.9"
                  fill={block.color}
                  stroke={BLACK}
                  strokeWidth="0.1"
                />
              ))}
            </svg>
          </div>

          {/* Side Info Panels */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              bottom: '60px',
              fontSize: '16px',
              color: CYAN,
              textAlign: 'left',
              lineHeight: '1.5',
            }}
          >
            <div>INDEX: 05</div>
            <div>STATUS: <span style={{ color: GREEN }}>ACTIVE</span></div>
          </div>

          <div
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '60px',
              fontSize: '16px',
              color: MAGENTA,
              textAlign: 'right',
              lineHeight: '1.5',
            }}
          >
            <div>BUFF: 3-FRM</div>
            <div>MODE: <span style={{ color: YELLOW }}>AUTO</span></div>
          </div>
        </div>

        {/* Teletext Bottom Fastext Buttons */}
        <div
          style={{
            height: '50px',
            borderTop: `2px solid ${WHITE}`,
            display: 'flex',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: RED,
              color: WHITE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            HISTORY
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: GREEN,
              color: BLACK,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            REPEAT
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: YELLOW,
              color: BLACK,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `3px solid ${WHITE}`,
              boxSizing: 'border-box',
            }}
          >
            REPLAY_L
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: BLUE,
              color: WHITE,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            INDEX
          </div>
        </div>

        {/* Sequential Teletext Line-by-Line Loading Effect (Wipe) */}
        {Array.from({ length: 15 }).map((_, i) => {
          const startFrame = i * 1.2;
          const isLoaded = frame >= startFrame;
          if (isLoaded) return null;

          return (
            <div
              key={`load-line-${i}`}
              style={{
                position: 'absolute',
                top: `${(i / 15) * 100}%`,
                left: 0,
                right: 0,
                height: `${100 / 15}%`,
                backgroundColor: BLACK,
                zIndex: 20,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
}