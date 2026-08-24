import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene5() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s - 1.0s): SLAM ENTRANCE
  // ==========================================
  // Briefcase card slams onto screen with heavy spring
  const slamSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 220, mass: 0.6 },
  });

  const headerSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.5 },
  });

  // Briefcase slam scale & translation
  const cardSlamScale = interpolate(slamSpring, [0, 1], [1.3, 1], clamp);
  const cardSlamY = interpolate(slamSpring, [0, 1], [-120, 0], clamp);

  // ==========================================
  // BEAT 2 (1.0s - 2.8s): CURSOR CLICK & AGENT POP
  // ==========================================
  // Oversized cursor glides down to the "DEPLOY WORKFORCE" button
  const cursorProgress = spring({
    frame: frame - 22,
    fps,
    config: { damping: 15, stiffness: 160, mass: 0.7 },
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [340, 110], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [520, 240], clamp);

  // Click physics at frame 40
  const clickFrame = 40;
  const isClicked = frame >= clickFrame;
  const buttonPressScale = isClicked
    ? interpolate(frame, [clickFrame, clickFrame + 4, clickFrame + 12], [1, 0.92, 1], clamp)
    : 1;

  const buttonShadowOffset = isClicked
    ? interpolate(frame, [clickFrame, clickFrame + 4, clickFrame + 12], [10, 2, 10], clamp)
    : 10;

  const buttonTranslateY = isClicked
    ? interpolate(frame, [clickFrame, clickFrame + 4, clickFrame + 12], [0, 8, 0], clamp)
    : 0;

  // Staggered Pink (#FF90E8) Mini-Agent Stickers popping out of the briefcase top
  const sticker1 = spring({ frame: frame - 43, fps, config: { damping: 10, stiffness: 240, mass: 0.5 } });
  const sticker2 = spring({ frame: frame - 48, fps, config: { damping: 10, stiffness: 240, mass: 0.5 } });
  const sticker3 = spring({ frame: frame - 53, fps, config: { damping: 10, stiffness: 240, mass: 0.5 } });

  // ==========================================
  // BEAT 3 (2.8s - 4.5s): CONTINUOUS PHYSICS & EXIT
  // ==========================================
  // Living hover & subtle rotation
  const hoverY = Math.sin(frame * 0.1) * 7;
  const floatTilt = Math.sin(frame * 0.08) * 1.6;

  // Outline rhythmic pulse
  const borderPulse = Math.sin(frame * 0.14) > 0 ? '4px solid #000000' : '5px solid #000000';

  // Snappy exit before composition ends
  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 240 },
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const containerOpacity = interpolate(slamSpring, [0, 0.15], [0, 1], clamp) * exitOpacity;
  const containerScale = cardSlamScale * exitScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background Neubrutal Dot Pattern Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 15%, transparent 15%)',
          backgroundSize: '32px 32px',
          opacity: 0.07,
        }}
      />

      {/* Main Stack Container */}
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          opacity: containerOpacity,
          transform: `scale(${containerScale}) translateY(${hoverY + cardSlamY}px) rotate(${floatTilt}deg)`,
          position: 'relative',
        }}
      >
        {/* TOP QUOTE CAPTION BADGE */}
        <div
          style={{
            transform: `scale(${headerSpring})`,
            backgroundColor: '#000000',
            color: '#FFF8E7',
            padding: '12px 28px',
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            border: '3px solid #000000',
            boxShadow: '4px 4px 0px #23A094',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ color: '#F1F333' }}>●</span> PARADIGM SHIFT // VISUAL METAPHOR
        </div>

        {/* POPPING MINI-AGENT STICKERS (PINK #FF90E8) */}
        <div
          style={{
            position: 'absolute',
            top: -50,
            width: '90%',
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        >
          {/* Sticker 1 */}
          <div
            style={{
              transform: `scale(${sticker1}) translateY(${interpolate(sticker1, [0, 1], [60, -20])}px) rotate(-8deg)`,
              backgroundColor: '#FF90E8',
              border: '3.5px solid #000000',
              borderRadius: 16,
              padding: '12px 20px',
              fontWeight: 900,
              fontSize: 22,
              color: '#000000',
              boxShadow: '6px 6px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            🤖 AGENT_01: DEV
          </div>

          {/* Sticker 2 */}
          <div
            style={{
              transform: `scale(${sticker2}) translateY(${interpolate(sticker2, [0, 1], [60, -42])}px) rotate(4deg)`,
              backgroundColor: '#FF90E8',
              border: '3.5px solid #000000',
              borderRadius: 16,
              padding: '12px 20px',
              fontWeight: 900,
              fontSize: 22,
              color: '#000000',
              boxShadow: '6px 6px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            ⚡ AGENT_02: EXEC
          </div>

          {/* Sticker 3 */}
          <div
            style={{
              transform: `scale(${sticker3}) translateY(${interpolate(sticker3, [0, 1], [60, -25])}px) rotate(12deg)`,
              backgroundColor: '#FF90E8',
              border: '3.5px solid #000000',
              borderRadius: 16,
              padding: '12px 20px',
              fontWeight: 900,
              fontSize: 22,
              color: '#000000',
              boxShadow: '6px 6px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            🎨 AGENT_03: OPS
          </div>
        </div>

        {/* HERO BRIEFCASE CARD */}
        <div
          style={{
            width: '100%',
            backgroundColor: '#F1F333',
            border: borderPulse,
            borderRadius: 36,
            boxShadow: '16px 16px 0px #000000',
            padding: '48px 44px',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
            position: 'relative',
          }}
        >
          {/* Briefcase Top Handle (Neubrutal element) */}
          <div
            style={{
              position: 'absolute',
              top: -28,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 180,
              height: 28,
              backgroundColor: '#000000',
              borderRadius: '12px 12px 0 0',
              border: '3px solid #000000',
            }}
          >
            <div
              style={{
                width: 100,
                height: 12,
                backgroundColor: '#FFF8E7',
                margin: '8px auto 0 auto',
                borderRadius: 4,
              }}
            />
          </div>

          {/* Card Top Row: Status & Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                padding: '8px 18px',
                borderRadius: 12,
                fontWeight: 900,
                fontSize: 18,
                letterSpacing: '0.08em',
              }}
            >
              BRIEFCASE v2.0
            </div>

            <div
              style={{
                backgroundColor: isClicked ? '#FF90E8' : '#FFF8E7',
                border: '3px solid #000000',
                borderRadius: 999,
                padding: '6px 20px',
                fontWeight: 900,
                fontSize: 18,
                color: '#000000',
                boxShadow: '3px 3px 0px #000000',
                transition: 'background-color 0.1s ease',
              }}
            >
              {isClicked ? '3 AGENTS ACTIVE' : 'READY TO DEPLOY'}
            </div>
          </div>

          {/* Main Typography Statement */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                fontSize: 64,
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                color: '#000000',
                textTransform: 'uppercase',
              }}
            >
              FUTURE OF WORK
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                lineHeight: 1.25,
                color: '#000000',
                textDecoration: 'underline',
                textDecorationThickness: '4px',
                textUnderlineOffset: '6px',
              }}
            >
              "People coming with their own custom workforce"
            </div>
          </div>

          {/* BUTTON: DEPLOY WORKFORCE */}
          <div
            style={{
              transform: `scale(${buttonPressScale}) translateY(${buttonTranslateY}px)`,
              backgroundColor: '#23A094',
              border: '4px solid #000000',
              borderRadius: 22,
              padding: '24px 32px',
              boxShadow: `0px ${buttonShadowOffset}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              {isClicked ? '⚡ WORKFORCE DEPLOYED' : '⚡ DEPLOY WORKFORCE'}
            </span>

            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F1F333',
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              →
            </div>
          </div>

          {/* OVERSIZED NEUBRUTAL CURSOR */}
          <div
            style={{
              position: 'absolute',
              top: cursorY,
              left: cursorX,
              pointerEvents: 'none',
              zIndex: 30,
              transform: isClicked ? 'scale(0.85)' : 'scale(1)',
              transition: 'transform 0.08s ease',
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: 'drop-shadow(4px 4px 0px #000000)' }}
            >
              <path
                d="M6 3L26 15L16 18L21 28L16 30L11 20L6 24V3Z"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="3"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* BOTTOM METRIC BADGE STRIP */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            gap: 16,
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: '#FF90E8',
              border: '3px solid #000000',
              borderRadius: 18,
              padding: '16px 20px',
              fontWeight: 900,
              fontSize: 20,
              color: '#000000',
              boxShadow: '6px 6px 0px #000000',
              textAlign: 'center',
            }}
          >
            BUTTON UI ARCHITECTURE
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFF8E7',
              border: '3px solid #000000',
              borderRadius: 18,
              padding: '16px 20px',
              fontWeight: 900,
              fontSize: 20,
              color: '#000000',
              boxShadow: '6px 6px 0px #000000',
              textAlign: 'center',
            }}
          >
            100% AUTOMATED
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}