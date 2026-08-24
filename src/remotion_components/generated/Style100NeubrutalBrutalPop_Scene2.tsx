import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene2() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): HARD SNAP ENTRANCE
  // ==========================================
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.6 }
  });

  const headerStickerEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 10, stiffness: 240, mass: 0.5 }
  });

  const quoteStickerEntrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, stiffness: 210, mass: 0.5 }
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.6s): CURSOR SLAM & BADGE FLIP
  // ==========================================
  // Cursor movement towards the central button
  const cursorProgress = spring({
    frame: frame - 24,
    fps,
    config: { damping: 14, stiffness: 170, mass: 0.7 }
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [340, 60], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [-120, 110], clamp);

  // Click physics trigger at frame 40
  const isClicked = frame >= 40;
  
  const clickDepress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 8, stiffness: 320, mass: 0.3 }
  });

  // Button shadow thunk reduction on press
  const shadowOffset = isClicked 
    ? interpolate(clickDepress, [0, 1], [14, 4], clamp)
    : 14;
    
  const buttonTranslateY = isClicked
    ? interpolate(clickDepress, [0, 1], [0, 10], clamp)
    : 0;

  const buttonScale = isClicked
    ? interpolate(clickDepress, [0, 0.5, 1], [1, 0.93, 1], clamp)
    : 1;

  // Badge transition: Red broken state to Teal Direct Revenue
  const tealBadgePop = spring({
    frame: frame - 41,
    fps,
    config: { damping: 10, stiffness: 260, mass: 0.4 }
  });

  // Shockwave burst on click
  const burstScale = isClicked
    ? interpolate(frame - 40, [0, 15], [0.6, 1.8], clamp)
    : 0;
  const burstOpacity = isClicked
    ? interpolate(frame - 40, [0, 15], [1, 0], clamp)
    : 0;

  // Animated metric count up after click
  const revenueVal = isClicked
    ? Math.round(interpolate(frame, [40, 75], [0, 100], clamp))
    : 0;

  // ==========================================
  // BEAT 3 (2.6s – 4.5s): LIVING PHYSICS & EXIT
  // ==========================================
  const floatY = Math.sin(frame * 0.1) * 6;
  const microTilt = Math.sin(frame * 0.07) * 1.8;
  const shadowPulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [12, 18]);

  // Outro transition
  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 240 }
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const containerOpacity = interpolate(cardEntrance, [0, 0.15], [0, 1], clamp) * exitOpacity;
  const containerScale = interpolate(cardEntrance, [0, 1], [0.8, 1], clamp) * exitScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        padding: 40,
        boxSizing: 'border-box'
      }}
    >
      {/* Background Neubrutal Decorative Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: `radial-gradient(#000000 3px, transparent 3px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Main Wrapper Box */}
      <div
        style={{
          width: '100%',
          maxWidth: 960,
          opacity: containerOpacity,
          transform: `scale(${containerScale}) translateY(${floatY}px) rotate(${microTilt}deg)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          position: 'relative'
        }}
      >
        {/* TOP HEADER STICKER BANNER */}
        <div
          style={{
            transform: `scale(${headerStickerEntrance}) rotate(-2deg)`,
            backgroundColor: '#F1F333',
            border: '5px solid #000000',
            borderRadius: 16,
            padding: '12px 28px',
            boxShadow: '6px 6px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 2
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: '#000000'
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#000000'
            }}
          >
            THE REAL ISSUE
          </span>
        </div>

        {/* SPOKEN QUOTE CARD */}
        <div
          style={{
            transform: `scale(${quoteStickerEntrance}) rotate(1deg)`,
            width: '100%',
            backgroundColor: '#FFFFFF',
            border: '6px solid #000000',
            borderRadius: 24,
            padding: '24px 32px',
            boxShadow: '8px 8px 0px #000000',
            textAlign: 'center'
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 34,
              fontWeight: 900,
              lineHeight: 1.25,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em'
            }}
          >
            "They do not <span style={{ backgroundColor: '#F1F333', padding: '2px 8px', border: '3px solid #000000', borderRadius: 6 }}>directly help</span> them make it."
          </p>
        </div>

        {/* MAIN HERO CARD (CHUNKY PINK BUTTON CONTAINER) */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#FF90E8',
            border: '6px solid #000000',
            borderRadius: 32,
            padding: 36,
            boxShadow: `12px ${shadowPulse}px 0px #000000`,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            position: 'relative',
            overflow: 'visible'
          }}
        >
          {/* Card Header & Status Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <span
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: '#000000',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase'
              }}
            >
              VALUE CONNECTION
            </span>

            {/* FLIPPING BADGE: Red broken -> Vibrant Teal Direct Revenue */}
            {!isClicked ? (
              <div
                style={{
                  backgroundColor: '#FF4D4D',
                  border: '4px solid #000000',
                  borderRadius: 999,
                  padding: '8px 20px',
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  boxShadow: '4px 4px 0px #000000'
                }}
              >
                STATUS: INDIRECT / NO VALUE
              </div>
            ) : (
              <div
                style={{
                  transform: `scale(${tealBadgePop}) rotate(-2deg)`,
                  backgroundColor: '#23A094',
                  border: '4px solid #000000',
                  borderRadius: 999,
                  padding: '8px 20px',
                  fontSize: 18,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  boxShadow: '4px 4px 0px #000000'
                }}
              >
                STATUS: DIRECT REVENUE!
              </div>
            )}
          </div>

          {/* METRIC DISPLAY AREA */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '5px solid #000000',
              borderRadius: 20,
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '6px 6px 0px #000000'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#000000', opacity: 0.7, textTransform: 'uppercase' }}>
                IMPACT MEASURE
              </span>
              <span style={{ fontSize: 44, fontWeight: 900, color: '#000000', lineHeight: 1 }}>
                {isClicked ? `${revenueVal}% DIRECT CASH` : '0% DIRECT HELP'}
              </span>
            </div>

            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: isClicked ? '#23A094' : '#000000',
                border: '4px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                color: '#FFFFFF',
                fontWeight: 900,
                transition: 'background-color 0.1s step-end'
              }}
            >
              {isClicked ? '✓' : '✕'}
            </div>
          </div>

          {/* INTERACTIVE ACTION BUTTON */}
          <div style={{ position: 'relative', width: '100%' }}>
            {/* Click Burst Visual */}
            {isClicked && (
              <div
                style={{
                  position: 'absolute',
                  inset: -20,
                  borderRadius: 28,
                  border: '6px solid #F1F333',
                  backgroundColor: '#F1F333',
                  transform: `scale(${burstScale})`,
                  opacity: burstOpacity,
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />
            )}

            <div
              style={{
                transform: `scale(${buttonScale}) translateY(${buttonTranslateY}px)`,
                backgroundColor: isClicked ? '#23A094' : '#000000',
                border: '5px solid #000000',
                borderRadius: 20,
                padding: '22px 32px',
                boxShadow: `0px ${shadowOffset}px 0px #000000`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 1
              }}
            >
              <span
                style={{
                  fontSize: 26,
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: isClicked ? 'none' : 'underline',
                  textDecorationThickness: 4
                }}
              >
                {isClicked ? '⚡ DIRECT REVENUE UNLOCKED ⚡' : 'CLICK TO CONNECT REVENUE'}
              </span>
            </div>

            {/* OVERSIZED BLACK CURSOR SVG */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicked ? 0.9 : 1})`,
                pointerEvents: 'none',
                zIndex: 10,
                filter: 'drop-shadow(4px 4px 0px #000000)'
              }}
            >
              <svg
                width="72"
                height="72"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 3L25 15L16 18L22 29L17 31L11 20L6 24V3Z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}