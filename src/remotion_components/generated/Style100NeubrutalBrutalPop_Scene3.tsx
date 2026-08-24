import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene3() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): HARD SNAP ENTRANCE
  // ==========================================
  const entrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 280, mass: 0.5 },
  });

  const cardY = interpolate(entrance, [0, 1], [-800, 0], clamp);
  const cardRotate = interpolate(entrance, [0, 1], [-6, 0], clamp);

  const badgeEntrance = spring({
    frame: frame - 12,
    fps,
    config: { damping: 11, stiffness: 300, mass: 0.4 },
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): PROXIMITY SLIDER & STICKER IMPACT
  // ==========================================
  // Slider surges from 0% to 100%
  const sliderProgress = interpolate(frame, [25, 62], [0, 100], clamp);
  const sliderFormatted = Math.round(sliderProgress) + '%';

  // Sticker Slap Trigger when slider hits near 100%
  const stickerSpring = spring({
    frame: frame - 52,
    fps,
    config: { damping: 8, stiffness: 320, mass: 0.4 },
  });

  const stickerScale = interpolate(stickerSpring, [0, 1], [0, 1], clamp);
  const stickerRotate = interpolate(stickerSpring, [0, 1], [25, -6], clamp);

  // Button click thunk animation
  const isClicked = frame > 60;
  const buttonPressScale = isClicked
    ? interpolate(frame, [60, 65, 72], [1, 0.92, 1], clamp)
    : 1;
  const buttonShadowOffset = isClicked
    ? interpolate(frame, [60, 65, 72], [10, 2, 10], clamp)
    : 10;

  // Cursor animation
  const cursorProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 14, stiffness: 200, mass: 0.6 },
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [320, 80], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [280, -20], clamp);
  const cursorScale = frame >= 60 && frame <= 68 ? 0.82 : 1;

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): LIVING PHYSICS & EXIT
  // ==========================================
  const floatY = Math.sin(frame * 0.11) * 8;
  const floatTilt = Math.sin(frame * 0.08) * 1.6;
  const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [12, 22]);

  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 260 },
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.85], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const containerOpacity = interpolate(entrance, [0, 0.15], [0, 1], clamp) * exitOpacity;
  const combinedScale = exitScale;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F1F333',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: 24,
      }}
    >
      {/* BACKGROUND BRUTAL PATTERN ACCENT */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(#000000 20%, transparent 20%), radial-gradient(#000000 20%, transparent 20%)',
          backgroundPosition: '0 0, 24px 24px',
          backgroundSize: '48px 48px',
          opacity: 0.08,
        }}
      />

      {/* HERO MAIN CONTAINER */}
      <div
        style={{
          width: '92%',
          maxWidth: 960,
          minHeight: 1100,
          opacity: containerOpacity,
          transform: `translateY(${cardY + floatY}px) rotate(${cardRotate + floatTilt}deg) scale(${combinedScale})`,
          backgroundColor: '#FFF8E7',
          border: '8px solid #000000',
          borderRadius: 36,
          boxShadow: `${shadowPulse}px ${shadowPulse}px 0px #000000`,
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* TOP BAR / HEADER STACK */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div
              style={{
                backgroundColor: '#23A094',
                border: '4px solid #000000',
                borderRadius: 14,
                padding: '10px 22px',
                fontSize: 22,
                fontWeight: 900,
                color: '#FFFFFF',
                boxShadow: '4px 4px 0px #000000',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              VALUE METRIC ⚡
            </div>

            <div
              style={{
                transform: `scale(${badgeEntrance})`,
                backgroundColor: '#FF90E8',
                border: '4px solid #000000',
                borderRadius: 999,
                padding: '10px 24px',
                fontSize: 22,
                fontWeight: 900,
                color: '#000000',
                boxShadow: '4px 4px 0px #000000',
              }}
            >
              LIVE TRACKING
            </div>
          </div>

          {/* SPOKEN LINE QUOTE CONTAINER */}
          <div
            style={{
              backgroundColor: '#000000',
              color: '#FFF8E7',
              borderRadius: 20,
              padding: '24px 28px',
              border: '4px solid #000000',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 800, color: '#F1F333', letterSpacing: '0.1em' }}>
              // CORE PRINCIPLE
            </span>
            <div style={{ fontSize: 28, fontWeight: 900, lineHeight: 1.25, letterSpacing: '-0.02em' }}>
              “Where the value is being provided... you are the closest one to making that happen.”
            </div>
          </div>
        </div>

        {/* METRIC VISUAL SLIDER (METAPHOR) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            margin: '28px 0',
            backgroundColor: '#FFFFFF',
            border: '6px solid #000000',
            borderRadius: 28,
            padding: 32,
            boxShadow: '8px 8px 0px #000000',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span
              style={{
                fontSize: 26,
                fontWeight: 900,
                textTransform: 'uppercase',
                color: '#000000',
                textDecoration: 'underline',
                textDecorationThickness: '4px',
              }}
            >
              PROXIMITY TO REVENUE
            </span>
            <span style={{ fontSize: 64, fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              {sliderFormatted}
            </span>
          </div>

          {/* SLIDER BAR TRACK */}
          <div
            style={{
              width: '100%',
              height: 48,
              backgroundColor: '#FFF8E7',
              border: '5px solid #000000',
              borderRadius: 24,
              overflow: 'hidden',
              position: 'relative',
              padding: 4,
            }}
          >
            <div
              style={{
                width: `${sliderProgress}%`,
                height: '100%',
                backgroundColor: '#F1F333',
                borderRadius: 16,
                borderRight: sliderProgress > 2 ? '4px solid #000000' : 'none',
                transition: 'width 0.05s linear',
              }}
            />
          </div>

          {/* STATUS LABEL */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#000000' }}>
              POSITION: {sliderProgress === 100 ? '⚡ MAXIMUM' : 'SURGING...'}
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: '#000000',
                backgroundColor: '#F1F333',
                border: '3px solid #000000',
                padding: '4px 14px',
                borderRadius: 10,
              }}
            >
              CLOSEST TO MONEY
            </span>
          </div>
        </div>

        {/* STICKER SLAP OVERLAY (POP ON 100% METRIC IMPACT) */}
        <div
          style={{
            position: 'absolute',
            top: '46%',
            right: '-12px',
            transform: `scale(${stickerScale}) rotate(${stickerRotate}deg)`,
            backgroundColor: '#FF90E8',
            border: '6px solid #000000',
            borderRadius: 24,
            padding: '20px 32px',
            boxShadow: '10px 10px 0px #000000',
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 40 }}>💥</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              VALUE CAPTURED!
            </span>
            <span style={{ fontSize: 18, fontWeight: 800, color: '#000000', marginTop: 4 }}>
              DIRECT RETENTION
            </span>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON */}
        <div style={{ position: 'relative', width: '100%' }}>
          <div
            style={{
              transform: `scale(${buttonPressScale})`,
              backgroundColor: '#23A094',
              border: '6px solid #000000',
              borderRadius: 24,
              padding: '26px 32px',
              boxShadow: `0px ${buttonShadowOffset}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF', letterSpacing: '0.02em' }}>
              {isClicked ? '✓ REVENUE UNLOCKED' : 'CLAIM VALUE POSITION'}
            </span>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: '#F1F333',
                border: '4px solid #000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                fontWeight: 900,
                color: '#000000',
              }}
            >
              ➔
            </div>
          </div>

          {/* ANIMATED CURSOR HAND CLICK */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '60%',
              transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
              zIndex: 30,
              pointerEvents: 'none',
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 32 32"
              fill="none"
              style={{ filter: 'drop-shadow(4px 4px 0px #000000)' }}
            >
              <path
                d="M10 2L3 22L12 17L17 28L21 26L16 15L24 15L10 2Z"
                fill="#F1F333"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}