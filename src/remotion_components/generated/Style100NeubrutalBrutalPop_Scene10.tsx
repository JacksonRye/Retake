import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene10() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): SNAPPY HARD ENTRANCE
  // ==========================================
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 230, mass: 0.6 },
  });

  const bannerEntrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 250, mass: 0.5 },
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): CURSOR & STICKER SLAP
  // ==========================================
  // Cursor moves into frame towards the main button
  const cursorProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 15, stiffness: 170, mass: 0.7 },
  });

  // Cursor coordinates
  const cursorX = interpolate(cursorProgress, [0, 1], [320, 60], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [480, 140], clamp);

  // Click event triggers around frame 46
  const isClicked = frame >= 46;
  const clickCompress = isClicked
    ? interpolate(frame, [46, 50, 56], [1, 0.93, 1], clamp)
    : 1;

  const clickShadowOffset = isClicked
    ? interpolate(frame, [46, 50, 56], [16, 4, 16], clamp)
    : 16;

  // Pink Sticker Slaps down instantly at click
  const stickerEntrance = spring({
    frame: frame - 48,
    fps,
    config: { damping: 9, stiffness: 290, mass: 0.5 },
  });

  // Dynamic counter transformation
  const leverageValue = Math.round(interpolate(frame, [48, 80], [1, 10], clamp));

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): LIVING PHYSICS & SNAPPY EXIT
  // ==========================================
  const hoverY = Math.sin(frame * 0.11) * 6;
  const hoverTilt = Math.sin(frame * 0.07) * 1.8;
  const shadowPulse = interpolate(Math.sin(frame * 0.13), [-1, 1], [14, 20]);

  // Snappy spring exit pop out
  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 240 },
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const containerOpacity = interpolate(cardEntrance, [0, 0.15], [0, 1], clamp) * exitOpacity;
  const containerScale = interpolate(cardEntrance, [0, 1], [0.8, 1], clamp) * exitScale;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF8E7',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        padding: 40,
      }}
    >
      {/* BACKGROUND DECORATIVE PATTERN DOTS */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 15%, transparent 16%)',
          backgroundSize: '36px 36px',
          opacity: 0.08,
        }}
      />

      {/* TOP QUOTE BANNER */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          width: '88%',
          transform: `scale(${bannerEntrance}) translateY(${hoverY * 0.5}px)`,
          opacity: containerOpacity,
          backgroundColor: '#000000',
          border: '4px solid #000000',
          borderRadius: 18,
          boxShadow: '8px 8px 0px #FF90E8',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          zIndex: 5,
        }}
      >
        <div
          style={{
            backgroundColor: '#23A094',
            color: '#FFFFFF',
            fontSize: 14,
            fontWeight: 900,
            letterSpacing: '0.12em',
            padding: '4px 10px',
            borderRadius: 6,
            alignSelf: 'flex-start',
            border: '2px solid #000000',
          }}
        >
          CORE QUESTION
        </div>
        <div
          style={{
            color: '#FFF8E7',
            fontSize: 22,
            fontWeight: 800,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          "If you were content with your life, what do you already want?"
        </div>
      </div>

      {/* MAIN HERO ACTION BUTTON CARD */}
      <div
        style={{
          width: '94%',
          minHeight: 640,
          marginTop: 120,
          opacity: containerOpacity,
          transform: `scale(${containerScale * clickCompress}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
          backgroundColor: '#F1F333',
          border: '6px solid #000000',
          borderRadius: 36,
          boxShadow: `${clickShadowOffset}px ${shadowPulse}px 0px #000000`,
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'visible',
          zIndex: 10,
        }}
      >
        {/* HEADER BAR INSIDE HERO */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              backgroundColor: '#000000',
              color: '#FFF8E7',
              padding: '10px 18px',
              borderRadius: 999,
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: '3px solid #000000',
            }}
          >
            ● SYSTEM CHOICE
          </div>

          <div
            style={{
              backgroundColor: '#23A094',
              border: '3px solid #000000',
              borderRadius: 14,
              padding: '8px 16px',
              fontSize: 18,
              fontWeight: 900,
              color: '#FFFFFF',
              boxShadow: '4px 4px 0px #000000',
            }}
          >
            {leverageValue}X OUTPUT
          </div>
        </div>

        {/* HERO CALL TO ACTION TITLE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '24px 0' }}>
          <div
            style={{
              fontSize: 62,
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#000000',
              textTransform: 'uppercase',
              wordBreak: 'break-word',
            }}
          >
            CHOOSE YOUR LEVERAGE
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#000000',
              textDecoration: 'underline',
              textDecorationThickness: '4px',
              textUnderlineOffset: '6px',
            }}
          >
            TAKE CONTROL OF YOUR GROWTH →
          </div>
        </div>

        {/* BOTTOM INTEGRATED BUTTON MOCK */}
        <div
          style={{
            backgroundColor: isClicked ? '#23A094' : '#000000',
            border: '4px solid #000000',
            borderRadius: 22,
            padding: '22px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '6px 6px 0px #000000',
            transition: 'background-color 0.1s step-end',
          }}
        >
          <span
            style={{
              color: '#FFF8E7',
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {isClicked ? '✓ LEVERAGE ACTIVATED' : 'CLICK TO SELECT'}
          </span>
        </div>

        {/* STICKER SLAP (APPEARS ON CLICK) */}
        {stickerEntrance > 0.01 && (
          <div
            style={{
              position: 'absolute',
              top: '42%',
              left: '5%',
              right: '5%',
              transform: `scale(${stickerEntrance}) rotate(-4deg)`,
              backgroundColor: '#FF90E8',
              border: '6px solid #000000',
              borderRadius: 24,
              padding: '24px 20px',
              boxShadow: '10px 10px 0px #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 25,
              pointerEvents: 'none',
            }}
          >
            <span
              style={{
                fontSize: 34,
                fontWeight: 900,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                textAlign: 'center',
                lineHeight: 1.05,
              }}
            >
              ★ UPGRADE SKILLS NOW ★
            </span>
          </div>
        )}

        {/* NO-COLLISION CURSOR OVERLAY */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicked ? 0.88 : 1})`,
            zIndex: 40,
            pointerEvents: 'none',
          }}
        >
          {/* Neubrutalist Arrow Cursor SVG */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              filter: 'drop-shadow(4px 4px 0px #000000)',
            }}
          >
            <path
              d="M12 4L36 24L23 27L30 42L22 45L15 30L6 36V4Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="4"
              strokeLinejoin="miter"
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
}