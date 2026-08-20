import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene5() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): SEQUENTIAL BUTTON STACK ENTRANCE
  // ==========================================
  const mainEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.8 },
  });

  // Buttons slap in 1-by-1
  const btn1Spring = spring({ frame: frame - 4, fps, config: { damping: 10, stiffness: 220 } });
  const btn2Spring = spring({ frame: frame - 12, fps, config: { damping: 10, stiffness: 220 } });
  const btn3Spring = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 220 } });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): CURSOR CLICKS & STICKER SLAP
  // ==========================================
  // Cursor movement path across the three buttons
  const cursorProgress = spring({ frame: frame - 28, fps, config: { damping: 15, stiffness: 140 } });
  
  // Cursor X/Y targets (moving vertically over the stack)
  const cursorX = interpolate(cursorProgress, [0, 0.35, 0.7, 1], [380, 260, 280, 320], clamp);
  const cursorY = interpolate(cursorProgress, [0, 0.35, 0.7, 1], [800, -140, 0, 140], clamp);

  // Button clicks physical shadow thunk (compressing button shadow on click)
  const isClick1 = frame >= 38 && frame <= 46;
  const isClick2 = frame >= 48 && frame <= 56;
  const isClick3 = frame >= 58 && frame <= 64;

  const btn1Scale = isClick1 ? interpolate(frame, [38, 42, 46], [1, 0.94, 1], clamp) : 1;
  const btn1Shadow = isClick1 ? interpolate(frame, [38, 42, 46], [8, 2, 8], clamp) : 8;

  const btn2Scale = isClick2 ? interpolate(frame, [48, 52, 56], [1, 0.94, 1], clamp) : 1;
  const btn2Shadow = isClick2 ? interpolate(frame, [48, 52, 56], [8, 2, 8], clamp) : 8;

  const btn3Scale = isClick3 ? interpolate(frame, [58, 61, 64], [1, 0.94, 1], clamp) : 1;
  const btn3Shadow = isClick3 ? interpolate(frame, [58, 61, 64], [8, 2, 8], clamp) : 8;

  // GIANT HERO STICKER SLAP AT FRAME 65
  const stickerSpring = spring({
    frame: frame - 65,
    fps,
    config: { damping: 11, stiffness: 280, mass: 0.6 },
  });
  const isStickerVisible = frame >= 65;
  const stickerScale = interpolate(stickerSpring, [0, 1], [2.4, 1], clamp);
  const stickerRotation = interpolate(stickerSpring, [0, 1], [18, -4], clamp);

  // Background screen impact thunk when sticker hits
  const impactShake = isStickerVisible
    ? Math.sin((frame - 65) * 1.5) * interpolate(frame - 65, [0, 12], [14, 0], clamp)
    : 0;

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): LIVING PHYSICS WOBBLE & EXIT
  // ==========================================
  const floatY = Math.sin(frame * 0.1) * 8;
  const floatTilt = Math.sin(frame * 0.07) * 2;
  const shadowPulse = interpolate(Math.sin(frame * 0.12), [-1, 1], [12, 20]);

  // Snappy Exit before duration end
  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 220 },
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const containerOpacity = interpolate(mainEntrance, [0, 0.2], [0, 1], clamp) * exitOpacity;
  const containerScale = interpolate(mainEntrance, [0, 1], [0.85, 1], clamp) * exitScale;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF8E7',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Dynamic Background Neubrutal Grid Accent Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 15%, transparent 15%)',
          backgroundSize: '36px 36px',
          opacity: 0.07,
        }}
      />

      {/* TOP STATUS HEADER BADGE */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          transform: `scale(${mainEntrance}) translateY(${impactShake}px)`,
          opacity: containerOpacity,
          backgroundColor: '#000000',
          color: '#FFF8E7',
          padding: '12px 28px',
          borderRadius: 999,
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          boxShadow: '4px 4px 0px #FF90E8',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span style={{ color: '#F1F333' }}>●</span> MANUAL OVERLOAD DETECTED
      </div>

      {/* MAIN HERO CARD CONTAINER */}
      <div
        style={{
          width: '90%',
          maxWidth: 960,
          opacity: containerOpacity,
          transform: `scale(${containerScale}) translateY(${floatY + impactShake}px) rotate(${floatTilt}deg)`,
          backgroundColor: '#FFF8E7',
          border: '5px solid #000000',
          borderRadius: 36,
          boxShadow: `12px ${shadowPulse}px 0px #000000`,
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
          position: 'relative',
        }}
      >
        {/* SUBTITLE INSTRUCTION */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            color: '#000000',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            textAlign: 'center',
          }}
        >
          STUCK IN ADMINISTRATIVE CHORES?
        </div>

        {/* THREE STACKED NEUBRUTALIST BUTTONS */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            width: '100%',
            position: 'relative',
          }}
        >
          {/* BUTTON 1: PAPERWORK & COMPLIANCE (#F1F333 Yellow) */}
          <div
            style={{
              transform: `scale(${interpolate(btn1Spring, [0, 1], [0.7, 1], clamp) * btn1Scale})`,
              opacity: interpolate(btn1Spring, [0, 0.3], [0, 1], clamp),
              backgroundColor: '#F1F333',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '22px 28px',
              boxShadow: `${btn1Shadow}px ${btn1Shadow}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 32 }}>📄</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#000000', letterSpacing: '-0.02em' }}>
                PAPERWORK & COMPLIANCE
              </span>
            </div>
            <div
              style={{
                backgroundColor: '#000000',
                color: '#F1F333',
                fontWeight: 900,
                fontSize: 18,
                padding: '6px 14px',
                borderRadius: 999,
              }}
            >
              PENDING
            </div>
          </div>

          {/* BUTTON 2: INVOICES & BOOKKEEPING (#FF90E8 Pink) */}
          <div
            style={{
              transform: `scale(${interpolate(btn2Spring, [0, 1], [0.7, 1], clamp) * btn2Scale})`,
              opacity: interpolate(btn2Spring, [0, 0.3], [0, 1], clamp),
              backgroundColor: '#FF90E8',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '22px 28px',
              boxShadow: `${btn2Shadow}px ${btn2Shadow}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 32 }}>🧾</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#000000', letterSpacing: '-0.02em' }}>
                INVOICES & BOOKKEEPING
              </span>
            </div>
            <div
              style={{
                backgroundColor: '#000000',
                color: '#FF90E8',
                fontWeight: 900,
                fontSize: 18,
                padding: '6px 14px',
                borderRadius: 999,
              }}
            >
              BLOCKED
            </div>
          </div>

          {/* BUTTON 3: LEGAL DOCUMENTS (#23A094 Teal) */}
          <div
            style={{
              transform: `scale(${interpolate(btn3Spring, [0, 1], [0.7, 1], clamp) * btn3Scale})`,
              opacity: interpolate(btn3Spring, [0, 0.3], [0, 1], clamp),
              backgroundColor: '#23A094',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '22px 28px',
              boxShadow: `${btn3Shadow}px ${btn3Shadow}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 32 }}>⚖️</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                LEGAL DOCUMENTS
              </span>
            </div>
            <div
              style={{
                backgroundColor: '#000000',
                color: '#23A094',
                fontWeight: 900,
                fontSize: 18,
                padding: '6px 14px',
                borderRadius: 999,
              }}
            >
              WAITING
            </div>
          </div>

          {/* OVERSIZED CURSOR CLICKER */}
          {!isStickerVisible && frame > 25 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(${cursorX}px, ${cursorY}px)`,
                pointerEvents: 'none',
                zIndex: 40,
                filter: 'drop-shadow(4px 4px 0px #000000)',
              }}
            >
              <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
                <path
                  d="M6 2L26 15L16 18L22 29L17 31L11 20L6 24V2Z"
                  fill="#000000"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* GIANT 'AUTOMATE IT' HERO STICKER OVERLAY */}
          {isStickerVisible && (
            <div
              style={{
                position: 'absolute',
                inset: -20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  transform: `scale(${stickerScale}) rotate(${stickerRotation}deg)`,
                  backgroundColor: '#000000',
                  border: '6px solid #000000',
                  borderRadius: 28,
                  padding: '36px 44px',
                  boxShadow: '16px 16px 0px #FF90E8',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  width: '105%',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#F1F333',
                    color: '#000000',
                    fontWeight: 900,
                    fontSize: 20,
                    padding: '4px 18px',
                    borderRadius: 999,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    boxShadow: '3px 3px 0px #000000',
                  }}
                >
                  INSTANT RESOLUTION
                </div>
                <div
                  style={{
                    fontSize: 68,
                    fontWeight: 900,
                    color: '#F1F333',
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    textShadow: '4px 4px 0px #23A094',
                  }}
                >
                  ⚡ AUTOMATE IT ⚡
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM FOOTER BADGE / CALLOUT */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 22,
            fontWeight: 800,
            color: '#000000',
            backgroundColor: '#FF90E8',
            border: '3px solid #000000',
            borderRadius: 16,
            padding: '10px 24px',
            boxShadow: '4px 4px 0px #000000',
          }}
        >
          <span>ZERO PAPERWORK</span>
          <span>•</span>
          <span>100% COMPLIANT</span>
        </div>
      </div>
    </AbsoluteFill>
  );
}