import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene4() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): SNAPPY ENTRANCE & CARD POP
  // ==========================================
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 210, mass: 0.6 }
  });

  const headerSticker = spring({
    frame: frame - 6,
    fps,
    config: { damping: 11, stiffness: 240, mass: 0.5 }
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): INTERACTIVE TETHER YANK & METRIC
  // ==========================================
  // Money Counter (Ticks up during approach)
  const rawMoney = Math.round(interpolate(frame, [25, 50], [0, 10000], clamp));
  const formattedMoney = `$${rawMoney.toLocaleString()}`;

  // Cursor Phase 1: Moves toward "MAKING MONEY"
  const cursorApproach = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 170 }
  });

  // Cursor Phase 2: Violent Yank back to "ADMIN TRAP"
  const cursorYank = spring({
    frame: frame - 52,
    fps,
    config: { damping: 9, stiffness: 260, mass: 0.7 }
  });

  // Interpolated Cursor Coordinates (Targeting inside container space)
  const targetX1 = 280; // "MAKING MONEY" button area
  const targetY1 = 430;
  const targetX2 = 620; // "ADMIN TRAP" box area
  const targetY2 = 910;

  const initialCursorX = 850;
  const initialCursorY = 1200;

  const approachX = interpolate(cursorApproach, [0, 1], [initialCursorX, targetX1], clamp);
  const approachY = interpolate(cursorApproach, [0, 1], [initialCursorY, targetY1], clamp);

  const cursorX = interpolate(cursorYank, [0, 1], [approachX, targetX2], clamp);
  const cursorY = interpolate(cursorYank, [0, 1], [approachY, targetY2], clamp);

  // Warning Badge Slap (Triggered right after yank)
  const warningSlap = spring({
    frame: frame - 56,
    fps,
    config: { damping: 10, stiffness: 280, mass: 0.5 }
  });

  // Tether visual state
  const isTetherActive = frame >= 50 && frame <= 105;
  const tetherOpacity = interpolate(frame, [50, 54, 98, 106], [0, 1, 1, 0], clamp);

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): CONTINUOUS HOVER & SNAPPY EXIT
  // ==========================================
  const floatY = Math.sin(frame * 0.11) * 7;
  const floatRotate = Math.sin(frame * 0.08) * 1.2;
  const dynamicShadowY = 14 + Math.sin(frame * 0.13) * 5;

  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 240 }
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const containerOpacity = interpolate(cardEntrance, [0, 0.15], [0, 1], clamp) * exitOpacity;
  const containerScale = interpolate(cardEntrance, [0, 1], [0.82, 1], clamp) * exitScale;

  // Active tab state logic
  const isStuckInAdmin = frame >= 54;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Impact', 'Arial Black', system-ui, sans-serif",
        overflow: 'hidden'
      }}
    >
      {/* Background Dot Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 15%, transparent 15%)',
          backgroundSize: '36px 36px',
          opacity: 0.08
        }}
      />

      {/* Main Responsive Neubrutal Card Container */}
      <div
        style={{
          width: '90%',
          maxWidth: 960,
          minHeight: 1100,
          opacity: containerOpacity,
          transform: `scale(${containerScale}) translateY(${floatY}px) rotate(${floatRotate}deg)`,
          backgroundColor: '#FF90E8',
          border: '6px solid #000000',
          borderRadius: 36,
          boxShadow: `12px ${dynamicShadowY}px 0px #000000`,
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          boxSizing: 'border-box'
        }}
      >
        {/* Top Navigation / Status Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              transform: `scale(${headerSticker}) rotate(-2deg)`,
              backgroundColor: '#F1F333',
              border: '4px solid #000000',
              borderRadius: 16,
              padding: '10px 22px',
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: '0.05em',
              color: '#000000',
              boxShadow: '4px 4px 0px #000000'
            }}
          >
            STEP #02
          </div>

          <div
            style={{
              backgroundColor: '#23A094',
              border: '4px solid #000000',
              borderRadius: 999,
              padding: '8px 24px',
              fontSize: 22,
              fontWeight: 900,
              color: '#FFFFFF',
              boxShadow: '4px 4px 0px #000000',
              textTransform: 'uppercase'
            }}
          >
            ENTREPRENEUR TRAP
          </div>
        </div>

        {/* Dual Tab Controller */}
        <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
          {/* Tab 1: Making Money */}
          <div
            style={{
              flex: 1,
              backgroundColor: !isStuckInAdmin ? '#23A094' : '#FFFFFF',
              color: !isStuckInAdmin ? '#FFFFFF' : '#000000',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '20px 16px',
              textAlign: 'center',
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '0.02em',
              boxShadow: !isStuckInAdmin ? '6px 6px 0px #000000' : '2px 2px 0px #000000',
              transition: 'all 0.1s ease',
              textDecoration: 'underline',
              textUnderlineOffset: '6px'
            }}
          >
            1. MAKING MONEY
          </div>

          {/* Tab 2: Admin Trap */}
          <div
            style={{
              flex: 1,
              backgroundColor: isStuckInAdmin ? '#F1F333' : '#FFFFFF',
              color: '#000000',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '20px 16px',
              textAlign: 'center',
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '0.02em',
              boxShadow: isStuckInAdmin ? '6px 6px 0px #000000' : '2px 2px 0px #000000'
            }}
          >
            2. ADMIN TRAP
          </div>
        </div>

        {/* Hero Section: Active Metric / Business Target */}
        <div
          style={{
            backgroundColor: '#FFF8E7',
            border: '5px solid #000000',
            borderRadius: 28,
            padding: '36px 32px',
            margin: '24px 0',
            boxShadow: '8px 8px 0px #000000',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ fontSize: 24, fontWeight: 900, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            GOAL: REVENUE & CUSTOMERS
          </div>

          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              lineHeight: 0.95,
              color: '#000000',
              letterSpacing: '-0.03em'
            }}
          >
            {formattedMoney}
          </div>

          <div style={{ fontSize: 22, fontWeight: 800, color: '#000000', opacity: 0.85 }}>
            Focus on high-value business building moves
          </div>
        </div>

        {/* Lower Section: The "Stuck" Trap Block */}
        <div
          style={{
            backgroundColor: '#000000',
            border: '4px solid #000000',
            borderRadius: 28,
            padding: '32px 30px',
            color: '#FFFFFF',
            position: 'relative',
            boxShadow: '8px 8px 0px #23A094'
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900, color: '#F1F333', marginBottom: 16, textTransform: 'uppercase' }}>
            ⚠️ WHERE MOST GET STUCK:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 22, fontWeight: 800 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#FF90E8' }}>✖</span>
              <span>Endless admin task paralysis</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#FF90E8' }}>✖</span>
              <span>Obsessing over tiny setup details</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: '#FF90E8' }}>✖</span>
              <span>Busywork instead of getting paid</span>
            </div>
          </div>
        </div>

        {/* Warning Sticker Slap Overlay (Appears when yanked) */}
        {warningSlap > 0.01 && (
          <div
            style={{
              position: 'absolute',
              top: '46%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${warningSlap}) rotate(-6deg)`,
              backgroundColor: '#F1F333',
              border: '6px solid #000000',
              borderRadius: 24,
              padding: '24px 36px',
              fontSize: 38,
              fontWeight: 900,
              color: '#000000',
              boxShadow: '12px 12px 0px #000000',
              textAlign: 'center',
              zIndex: 30,
              whiteSpace: 'nowrap'
            }}
          >
            STUCK ON WRONG THING!
          </div>
        )}
      </div>

      {/* SVG Tether Line (Black heavy cord yanking cursor) */}
      {isTetherActive && (
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 40,
            opacity: tetherOpacity
          }}
        >
          <line
            x1={targetX2 + 100}
            y1={targetY2 + 200}
            x2={cursorX}
            y2={cursorY}
            stroke="#000000"
            strokeWidth="10"
            strokeDasharray="14 10"
            strokeLinecap="round"
          />
        </svg>
      )}

      {/* Neubrutal Heavy Cursor */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(${cursorX}px, ${cursorY}px, 0px)`,
          pointerEvents: 'none',
          zIndex: 50,
          filter: 'drop-shadow(4px 4px 0px #000000)'
        }}
      >
        <svg
          width="54"
          height="54"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3L25 15L15 18L10 28L6 3Z"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="3.5"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
}