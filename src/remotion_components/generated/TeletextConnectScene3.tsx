import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';

export default function TeletextConnectScene3() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // 1. Clock and Teletext Header calculations
  const pad = (n: number) => n.toString().padStart(2, '0');
  const seconds = pad(Math.floor(frame / 30) % 60);
  const minutes = pad(Math.floor(frame / 1800) % 60);
  const timeStr = `19:${minutes}:${seconds}`;

  // 2. Stepped loading / exit animation (classic slow teletext render)
  const revealProgress = interpolate(frame, [0, 15], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitProgress = interpolate(frame, [durationInFrames - 10, durationInFrames], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentProgress = frame > durationInFrames - 10 ? exitProgress : revealProgress;
  const clipHeight = Math.floor(currentProgress / 10) * 10; // Stepped 10% increments
  const clipPath = `polygon(0% 0%, 100% 0%, 100% ${clipHeight}%, 0% ${clipHeight}%)`;

  // 3. Flashing line logic (10Hz flash rate)
  const showLines = frame >= 12 && Math.floor(frame / 3) % 2 === 0;
  const lineColor = showLines ? '#FFFFFF' : 'transparent';

  // 4. Status Bar Pulse (Binary toggle for retro feel)
  const isPulseOn = frame >= 18 && Math.floor(frame / 6) % 2 === 0;
  const statusBg = isPulseOn ? '#00FF00' : '#003300';
  const statusText = isPulseOn ? '#000000' : '#00FF00';

  // 5. Node Active States (staggered boot up)
  const nodeAActive = frame >= 4;
  const nodeBActive = frame >= 8;
  const nodeCActive = frame >= 12;
  const nodeDActive = frame >= 16;

  // Common styles
  const monospaceFont = `'Courier New', Courier, monospace`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: monospaceFont,
        fontWeight: 'bold',
      }}
    >
      {/* Teletext Terminal Wrapper */}
      <div
        style={{
          width: 960,
          height: 720,
          backgroundColor: '#000000',
          border: '6px double #FFFFFF',
          boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          clipPath,
        }}
      >
        {/* Scanline Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25) 2px, transparent 2px, transparent 4px)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />

        {/* Teletext Header Row */}
        <div
          style={{
            height: 40,
            backgroundColor: '#000000',
            borderBottom: '4px solid #FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            fontSize: 20,
            letterSpacing: 2,
          }}
        >
          <span style={{ color: '#FF0000' }}>P303</span>
          <span style={{ color: '#00FFFF' }}>CHRONIXEL</span>
          <span style={{ color: '#FFFF00' }}>SYS-CONNECT</span>
          <span style={{ color: '#00FF00' }}>{timeStr}</span>
        </div>

        {/* Main Patchboard Body */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: '#000000',
          }}
        >
          {/* Pixelated Connection Lines (SVG) */}
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {/* Horizontal Top (A -> B) */}
            <path
              d="M 320 100 L 640 100"
              stroke={lineColor}
              strokeWidth={6}
              strokeDasharray="12 8"
              shapeRendering="crispEdges"
            />
            {/* Vertical Left (A -> C) */}
            <path
              d="M 210 160 L 210 320"
              stroke={lineColor}
              strokeWidth={6}
              strokeDasharray="12 8"
              shapeRendering="crispEdges"
            />
            {/* Vertical Right (B -> D) */}
            <path
              d="M 750 160 L 750 320"
              stroke={lineColor}
              strokeWidth={6}
              strokeDasharray="12 8"
              shapeRendering="crispEdges"
            />
            {/* Horizontal Bottom (C -> D) */}
            <path
              d="M 320 380 L 640 380"
              stroke={lineColor}
              strokeWidth={6}
              strokeDasharray="12 8"
              shapeRendering="crispEdges"
            />
            {/* Diagonal Cross Left-to-Right (A -> D) */}
            <path
              d="M 320 160 L 640 320"
              stroke={lineColor}
              strokeWidth={4}
              strokeDasharray="8 8"
              shapeRendering="crispEdges"
            />
            {/* Diagonal Cross Right-to-Left (B -> C) */}
            <path
              d="M 640 160 L 320 320"
              stroke={lineColor}
              strokeWidth={4}
              strokeDasharray="8 8"
              shapeRendering="crispEdges"
            />
          </svg>

          {/* System Nodes */}
          {/* Node A (Top-Left) - Yellow */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 100,
              width: 220,
              height: 120,
              border: '4px solid #FFFF00',
              backgroundColor: '#000000',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              visibility: nodeAActive ? 'visible' : 'hidden',
            }}
          >
            <div style={{ color: '#FFFF00', fontSize: 24, borderBottom: '2px solid #FFFF00', paddingBottom: 4 }}>
              ■ SYS_A
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 16 }}>
              PORT: 0080
              <br />
              STAT: ACTIVE
            </div>
          </div>

          {/* Node B (Top-Right) - Cyan */}
          <div
            style={{
              position: 'absolute',
              top: 40,
              left: 640,
              width: 220,
              height: 120,
              border: '4px solid #00FFFF',
              backgroundColor: '#000000',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              visibility: nodeBActive ? 'visible' : 'hidden',
            }}
          >
            <div style={{ color: '#00FFFF', fontSize: 24, borderBottom: '2px solid #00FFFF', paddingBottom: 4 }}>
              ■ SYS_B
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 16 }}>
              PORT: 0443
              <br />
              STAT: ACTIVE
            </div>
          </div>

          {/* Node C (Bottom-Left) - Cyan */}
          <div
            style={{
              position: 'absolute',
              top: 320,
              left: 100,
              width: 220,
              height: 120,
              border: '4px solid #00FFFF',
              backgroundColor: '#000000',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              visibility: nodeCActive ? 'visible' : 'hidden',
            }}
          >
            <div style={{ color: '#00FFFF', fontSize: 24, borderBottom: '2px solid #00FFFF', paddingBottom: 4 }}>
              ■ SYS_C
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 16 }}>
              PORT: 8080
              <br />
              STAT: ONLINE
            </div>
          </div>

          {/* Node D (Bottom-Right) - Yellow */}
          <div
            style={{
              position: 'absolute',
              top: 320,
              left: 640,
              width: 220,
              height: 120,
              border: '4px solid #FFFF00',
              backgroundColor: '#000000',
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              visibility: nodeDActive ? 'visible' : 'hidden',
            }}
          >
            <div style={{ color: '#FFFF00', fontSize: 24, borderBottom: '2px solid #FFFF00', paddingBottom: 4 }}>
              ■ SYS_D
            </div>
            <div style={{ color: '#FFFFFF', fontSize: 16 }}>
              PORT: 9000
              <br />
              STAT: ONLINE
            </div>
          </div>

          {/* Center Matrix Info Block */}
          <div
            style={{
              position: 'absolute',
              top: 190,
              left: 380,
              width: 200,
              height: 100,
              border: '2px dashed #FFFFFF',
              backgroundColor: '#000000',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 16,
              color: '#FFFFFF',
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#FF0000', marginBottom: 4 }}>[ MATRIX ]</div>
            <div>FLOW: 9.6 Kb/s</div>
            <div style={{ color: '#00FF00' }}>GRID: STABLE</div>
          </div>
        </div>

        {/* Pulsing Status Bar */}
        <div
          style={{
            height: 60,
            backgroundColor: statusBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            letterSpacing: 4,
            transition: 'background-color 0.1s ease',
            borderTop: '4px solid #FFFFFF',
          }}
        >
          <span style={{ color: statusText, textShadow: '2px 2px 0px #000000' }}>
            ■■■■■ SYS_LINK: OK ■■■■■
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}