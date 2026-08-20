import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene2() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // COLOR PALETTE (CHRON_STYLE_100 Neubrutal Pop)
  // ==========================================
  const COLOR_BG = '#FFF8E7';
  const COLOR_BLACK = '#000000';
  const COLOR_PINK = '#FF90E8';
  const COLOR_YELLOW = '#F1F333';
  const COLOR_TEAL = '#23A094';
  const COLOR_WHITE = '#FFFFFF';

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): SNAPPY ENTRANCE
  // ==========================================
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 220, mass: 0.5 }
  });

  const cardScale = interpolate(entranceSpring, [0, 1], [0.75, 1], clamp);
  const cardOpacity = interpolate(entranceSpring, [0, 0.2], [0, 1], clamp);

  // Yellow Badge Snap
  const badgeEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 10, stiffness: 260, mass: 0.4 }
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): CURSOR CLICK & STICKER SLAP
  // ==========================================
  // Cursor movement towards the main button
  const cursorProgress = spring({
    frame: frame - 22,
    fps,
    config: { damping: 15, stiffness: 170, mass: 0.6 }
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [260, 45], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [380, 130], clamp);

  // Button Click Event (Frame 42 / ~1.4s)
  const clickFrame = 42;
  const isClicked = frame >= clickFrame;

  const buttonDepress = isClicked
    ? interpolate(frame, [clickFrame, clickFrame + 4, clickFrame + 10], [1, 0.91, 1], clamp)
    : 1;

  const buttonShadowY = isClicked
    ? interpolate(frame, [clickFrame, clickFrame + 4, clickFrame + 10], [12, 2, 12], clamp)
    : 12;

  // Pink Sticker Slap Event (Frame 46 / ~1.53s)
  const stickerFrame = 46;
  const stickerSpring = spring({
    frame: frame - stickerFrame,
    fps,
    config: { damping: 9, stiffness: 300, mass: 0.4 }
  });

  const stickerScale = frame >= stickerFrame ? interpolate(stickerSpring, [0, 1], [2.6, 1], clamp) : 0;
  const stickerOpacity = frame >= stickerFrame ? 1 : 0;

  // Shockwave Ring Animation
  const shockProgress = frame >= stickerFrame ? (frame - stickerFrame) : 0;
  const shockScale = interpolate(shockProgress, [0, 18], [0.2, 2.4], clamp);
  const shockOpacity = interpolate(shockProgress, [0, 16], [1, 0], clamp);

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): CONTINUOUS PHYSICS & EXIT SNAP
  // ==========================================
  const hoverTilt = Math.sin(frame * 0.12) * 2.2;
  const shadowPulse = 14 + Math.sin(frame * 0.15) * 4;

  const exitFrame = durationInFrames - 12;
  const exitSpring = spring({
    frame: frame - exitFrame,
    fps,
    config: { damping: 10, stiffness: 240, mass: 0.5 }
  });

  const exitY = interpolate(exitSpring, [0, 1], [0, 700], clamp);
  const exitScale = interpolate(exitSpring, [0, 1], [1, 0.75], clamp);
  const exitOpacity = interpolate(exitSpring, [0, 1], [1, 0], clamp);

  const containerOpacity = cardOpacity * exitOpacity;
  const containerScale = cardScale * exitScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLOR_BG,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* Neubrutalist Background Pattern Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(${COLOR_BLACK} 18%, transparent 18%)`,
          backgroundSize: '36px 36px',
          opacity: 0.07
        }}
      />

      {/* Main Container Card */}
      <div
        style={{
          width: '90%',
          maxWidth: 900,
          minHeight: 820,
          opacity: containerOpacity,
          transform: `scale(${containerScale}) translateY(${exitY}px) rotate(${hoverTilt}deg)`,
          backgroundColor: COLOR_WHITE,
          border: `6px solid ${COLOR_BLACK}`,
          borderRadius: 28,
          boxShadow: `12px ${shadowPulse}px 0px ${COLOR_BLACK}`,
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'visible'
        }}
      >
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              transform: `scale(${badgeEntrance})`,
              backgroundColor: COLOR_YELLOW,
              border: `4px solid ${COLOR_BLACK}`,
              borderRadius: 12,
              padding: '10px 22px',
              fontSize: 32,
              fontWeight: 900,
              color: COLOR_BLACK,
              boxShadow: `5px 5px 0px ${COLOR_BLACK}`,
              textDecoration: 'underline',
              textDecorationThickness: '4px',
              letterSpacing: '0.02em'
            }}
          >
            $0.00 FREE
          </div>

          <div
            style={{
              backgroundColor: COLOR_BLACK,
              color: COLOR_WHITE,
              borderRadius: 999,
              padding: '8px 20px',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            DIY FORMATION
          </div>
        </div>

        {/* Hero Headline Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, margin: '36px 0' }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: COLOR_BLACK,
              textTransform: 'uppercase'
            }}
          >
            FORM YOUR LLC <br />
            <span
              style={{
                backgroundColor: COLOR_YELLOW,
                padding: '0 12px',
                border: `4px solid ${COLOR_BLACK}`,
                boxShadow: `4px 4px 0px ${COLOR_BLACK}`,
                display: 'inline-block',
                marginTop: 8
              }}
            >
              FOR FREE?
            </span>
          </div>

          <p
            style={{
              fontSize: 28,
              fontWeight: 700,
              lineHeight: 1.25,
              color: COLOR_BLACK,
              margin: 0
            }}
          >
            Yes, you could try to form your LLC by yourself...
          </p>
        </div>

        {/* Interactive Neubrutalist CTA Button */}
        <div style={{ position: 'relative', width: '100%' }}>
          <div
            style={{
              transform: `scale(${buttonDepress})`,
              backgroundColor: COLOR_TEAL,
              border: `5px solid ${COLOR_BLACK}`,
              borderRadius: 20,
              padding: '26px 20px',
              boxShadow: `0px ${buttonShadowY}px 0px ${COLOR_BLACK}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 900,
              color: COLOR_WHITE,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              textShadow: `2px 2px 0px ${COLOR_BLACK}`
            }}
          >
            {isClicked ? 'CLICKED! PROCESSING...' : 'FORM LLC FOR $0 NOW'}
          </div>

          {/* Animated Oversized Cursor Pointer */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `translate(${cursorX}px, ${cursorY}px)`,
              pointerEvents: 'none',
              zIndex: 30,
              opacity: interpolate(cursorProgress, [0, 0.1], [0, 1], clamp)
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 32 32"
              fill="none"
              style={{ filter: 'drop-shadow(4px 4px 0px #000000)' }}
            >
              <path
                d="M6 2L26 14L16 18L22 28L17 30L11 20L6 25V2Z"
                fill={COLOR_YELLOW}
                stroke={COLOR_BLACK}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Shockwave Ring Visual Effect */}
        {frame >= stickerFrame && shockOpacity > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '40%',
              left: '50%',
              width: 300,
              height: 300,
              marginLeft: -150,
              marginTop: -150,
              borderRadius: '50%',
              border: `8px solid ${COLOR_PINK}`,
              transform: `scale(${shockScale})`,
              opacity: shockOpacity,
              pointerEvents: 'none',
              zIndex: 40
            }}
          />
        )}

        {/* Oversized "HIDDEN TRAP" Warning Sticker Slap */}
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '8%',
            right: '8%',
            transform: `scale(${stickerScale}) rotate(-9deg)`,
            opacity: stickerOpacity,
            backgroundColor: COLOR_PINK,
            border: `6px solid ${COLOR_BLACK}`,
            borderRadius: 20,
            padding: '24px 28px',
            boxShadow: `10px 10px 0px ${COLOR_BLACK}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            zIndex: 50,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: COLOR_BLACK,
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              textAlign: 'center',
              textTransform: 'uppercase'
            }}
          >
            ⚠️ HIDDEN TRAP! ⚠️
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 800,
              backgroundColor: COLOR_BLACK,
              color: COLOR_YELLOW,
              padding: '6px 16px',
              borderRadius: 8,
              marginTop: 4,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            STATE FEES & RECURRING TAXES
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}