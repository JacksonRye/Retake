import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene8() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): HARD SNAP ENTRANCE FROM RIGHT
  // ==========================================
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 210, mass: 0.6 }
  });
  const cardX = interpolate(cardEntrance, [0, 1], [900, 0], clamp);
  const cardRotate = interpolate(cardEntrance, [0, 1], [12, 0], clamp);

  const badgeEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 10, stiffness: 260, mass: 0.4 }
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): PRICE SLASH & TEAL TAG STICKER SLAP
  // ==========================================
  // Slash Sticker Pop (around frame 35 ~ 1.1s)
  const slashSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 9, stiffness: 300, mass: 0.4 }
  });
  const slashScale = interpolate(slashSpring, [0, 1], [0, 1], clamp);

  // Teal New Price Tag Slap (around frame 52 ~ 1.7s)
  const tealTagSpring = spring({
    frame: frame - 52,
    fps,
    config: { damping: 10, stiffness: 250, mass: 0.5 }
  });
  const tealTagScale = interpolate(tealTagSpring, [0, 1], [0, 1], clamp);
  const tealTagY = interpolate(tealTagSpring, [0, 1], [40, 0], clamp);

  // Interactive Cursor Click on Bottom Button (around frame 72 ~ 2.4s)
  const cursorProgress = spring({
    frame: frame - 68,
    fps,
    config: { damping: 14, stiffness: 190, mass: 0.6 }
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [280, 80], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [180, -10], clamp);

  const isClicked = frame >= 80;
  const buttonPressScale = isClicked
    ? interpolate(frame, [80, 84, 90], [1, 0.92, 1], clamp)
    : 1;
  const buttonShadowOffset = isClicked
    ? interpolate(frame, [80, 84, 90], [8, 2, 8], clamp)
    : 8;

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): LIVING PHYSICS & EXIT SNAP
  // ==========================================
  const floatY = Math.sin(frame * 0.11) * 7;
  const floatTilt = Math.sin(frame * 0.07) * 1.8;
  const shadowPulse = interpolate(Math.sin(frame * 0.13), [-1, 1], [12, 22]);

  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 240 }
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const opacityCombined = exitOpacity;
  const scaleCombined = exitScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FF90E8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Impact", "Arial Black", system-ui, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* Background Graphic Grid / Pattern Accent */}
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(#000000 15%, transparent 16%)',
          backgroundSize: '36px 36px',
          opacity: 0.12
        }}
      />

      {/* Hero Neubrutalist Card Container */}
      <div
        style={{
          width: '90%',
          maxWidth: 960,
          minHeight: 1100,
          opacity: opacityCombined,
          transform: `translateX(${cardX}px) scale(${scaleCombined}) translateY(${floatY}px) rotate(${cardRotate + floatTilt}deg)`,
          backgroundColor: '#FFF8E7',
          border: '6px solid #000000',
          borderRadius: 32,
          boxShadow: `${shadowPulse}px ${shadowPulse}px 0px #000000`,
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}
      >
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              backgroundColor: '#000000',
              color: '#FFF8E7',
              padding: '10px 22px',
              borderRadius: 12,
              fontSize: 24,
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            DEPT VS FRACTIONAL
          </div>

          <div
            style={{
              transform: `scale(${badgeEntrance}) rotate(-3deg)`,
              backgroundColor: '#F1F333',
              border: '4px solid #000000',
              borderRadius: 999,
              padding: '8px 24px',
              fontSize: 22,
              fontWeight: 900,
              color: '#000000',
              boxShadow: '4px 4px 0px #000000'
            }}
          >
            100% CAPABILITY
          </div>
        </div>

        {/* Center Comparison Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, margin: '24px 0' }}>
          
          {/* Main Title Banner */}
          <div style={{ textTransform: 'uppercase', lineHeight: 1.05 }}>
            <div style={{ fontSize: 36, color: '#000000', letterSpacing: '-0.02em' }}>
              REPLACING THE ENTIRE
            </div>
            <div
              style={{
                fontSize: 68,
                color: '#000000',
                textDecoration: 'underline 8px #000000',
                lineHeight: 0.95
              }}
            >
              DEPARTMENT
            </div>
          </div>

          {/* Old Price Box with Red Slash Sticker */}
          <div
            style={{
              position: 'relative',
              backgroundColor: '#FFFFFF',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '28px 24px',
              boxShadow: '6px 6px 0px #000000',
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}
          >
            <span style={{ fontSize: 20, color: '#666666', letterSpacing: '0.05em' }}>
              FULL-TIME PAYROLL COST
            </span>
            <span
              style={{
                fontSize: 72,
                color: '#000000',
                lineHeight: 1,
                opacity: frame > 40 ? 0.4 : 1
              }}
            >
              $100,000/YR
            </span>

            {/* Red Diagonal Strike Slash Sticker */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) scale(${slashScale}) rotate(-12deg)`,
                backgroundColor: '#FF3333',
                color: '#FFFFFF',
                border: '4px solid #000000',
                padding: '12px 36px',
                fontSize: 38,
                fontWeight: 900,
                boxShadow: '6px 6px 0px #000000',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 10
              }}
            >
              ✖ SLASHED ✖
            </div>
          </div>

          {/* New Teal Price Tag Sticker Slap */}
          <div
            style={{
              transform: `scale(${tealTagScale}) translateY(${tealTagY}px) rotate(-1.5deg)`,
              backgroundColor: '#23A094',
              border: '5px solid #000000',
              borderRadius: 24,
              padding: '30px 24px',
              boxShadow: '8px 8px 0px #000000',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              position: 'relative'
            }}
          >
            {/* Corner Pop Tag */}
            <div
              style={{
                position: 'absolute',
                top: -20,
                right: 20,
                backgroundColor: '#F1F333',
                border: '3px solid #000000',
                padding: '4px 14px',
                borderRadius: 999,
                fontSize: 18,
                color: '#000000',
                boxShadow: '3px 3px 0px #000000'
              }}
            >
              SAVE 80%
            </div>

            <span style={{ fontSize: 22, color: '#FFFFFF', letterSpacing: '0.05em' }}>
              FRACTIONAL FUNCTION COST
            </span>
            <span style={{ fontSize: 76, color: '#FFF8E7', lineHeight: 0.95 }}>
              $20,000
            </span>
            <span style={{ fontSize: 24, color: '#000000', fontWeight: 900 }}>
              FULL FUNCTION OUTPUT
            </span>
          </div>

        </div>

        {/* Bottom Interactive Button */}
        <div
          style={{
            position: 'relative',
            transform: `scale(${buttonPressScale})`,
            backgroundColor: '#F1F333',
            border: '5px solid #000000',
            borderRadius: 20,
            padding: '24px 20px',
            boxShadow: `0px ${buttonShadowOffset}px 0px #000000`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            letterSpacing: '0.04em',
            color: '#000000',
            cursor: 'pointer'
          }}
        >
          {isClicked ? "⚡ DEPLOYED AS A FUNCTION" : "ACTIVATE AS ENTIRE DEPT"}

          {/* Animated Cursor Vector */}
          <div
            style={{
              position: 'absolute',
              right: cursorX,
              bottom: cursorY,
              width: 44,
              height: 44,
              pointerEvents: 'none',
              transition: 'transform 0.05s ease',
              transform: isClicked ? 'scale(0.82)' : 'scale(1)'
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(3px 3px 0px #FFFFFF)' }}
            >
              <path d="M3 3l7 18 3-7 7-3L3 3z" fill="#000000" />
            </svg>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
}