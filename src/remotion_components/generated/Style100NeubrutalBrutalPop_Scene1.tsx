import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene1() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): SNAPPY CARD ENTRANCE
  // ==========================================
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.5 },
  });
  const cardY = interpolate(cardEntrance, [0, 1], [800, 0], clamp);
  const cardScale = interpolate(cardEntrance, [0, 1], [0.75, 1], clamp);

  const badgeEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 9, stiffness: 250, mass: 0.4 },
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): CURSOR CLICK & STICKER SLAP
  // ==========================================
  // Cursor springs towards the toggle button
  const cursorProgress = spring({
    frame: frame - 24,
    fps,
    config: { damping: 14, stiffness: 190, mass: 0.6 },
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [220, 45], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [320, 50], clamp);

  // Button Click Logic
  const isClicked = frame >= 44;
  const buttonPressScale = isClicked
    ? interpolate(frame, [44, 48, 54], [1, 0.91, 1], clamp)
    : 1;
  const buttonShadowY = isClicked
    ? interpolate(frame, [44, 48, 54], [10, 2, 10], clamp)
    : 10;
  const buttonShadowX = isClicked
    ? interpolate(frame, [44, 48, 54], [10, 2, 10], clamp)
    : 10;

  // Sticker Slap
  const stickerEntrance = spring({
    frame: frame - 52,
    fps,
    config: { damping: 9, stiffness: 280, mass: 0.4 },
  });
  const stickerScale = interpolate(stickerEntrance, [0, 1], [0, 1], clamp);
  const stickerRotate = interpolate(stickerEntrance, [0, 1], [28, -12], clamp);

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): JITTER HOVER & SNAPPY EXIT
  // ==========================================
  // Continuous 2px living jitter + 1-degree angle tilt loop
  const jitterX = Math.sin(frame * 0.4) * 2;
  const jitterY = Math.cos(frame * 0.35) * 2;
  const tiltAngle = Math.sin(frame * 0.15) * 1.2;

  // Shadow pulse rhythm
  const shadowPulse = interpolate(Math.sin(frame * 0.18), [-1, 1], [10, 16]);

  // Snappy off-screen exit before duration ends
  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 11, stiffness: 260 },
  });
  const exitY = interpolate(exitProgress, [0, 1], [0, -1100], clamp);

  // Final transforms for main container
  const combinedY = cardY + exitY + jitterY;
  const combinedX = jitterX;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Impact", "Arial Black", system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      {/* Background Graphic Grid Line Details */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(#000000 15%, transparent 15%), radial-gradient(#000000 15%, transparent 15%)',
          backgroundPosition: '0 0, 24px 24px',
          backgroundSize: '48px 48px',
          opacity: 0.06,
        }}
      />

      {/* Main Container Card */}
      <div
        style={{
          width: '88%',
          maxWidth: 900,
          minHeight: 820,
          opacity: interpolate(cardEntrance, [0, 0.15], [0, 1], clamp),
          transform: `translate(${combinedX}px, ${combinedY}px) scale(${cardScale}) rotate(${tiltAngle}deg)`,
          backgroundColor: '#FF90E8',
          border: '5px solid #000000',
          borderRadius: 36,
          boxShadow: `${shadowPulse}px ${shadowPulse}px 0px #000000`,
          padding: '52px 44px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              backgroundColor: '#000000',
              color: '#FFF8E7',
              padding: '10px 22px',
              borderRadius: 14,
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            REASON #1
          </div>

          <div
            style={{
              transform: `scale(${badgeEntrance})`,
              backgroundColor: '#F1F333',
              border: '3px solid #000000',
              borderRadius: 999,
              padding: '8px 22px',
              fontSize: 20,
              fontWeight: 900,
              color: '#000000',
              boxShadow: '4px 4px 0px #000000',
              textTransform: 'uppercase',
            }}
          >
            CRITICAL
          </div>
        </div>

        {/* Core Message Text Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, margin: '32px 0' }}>
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              lineHeight: 1.05,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            STOP TRYING TO
          </span>

          {/* Interactive Toggle Button */}
          <div
            style={{
              transform: `scale(${buttonPressScale})`,
              backgroundColor: isClicked ? '#FF4D4D' : '#F1F333',
              border: '5px solid #000000',
              borderRadius: 24,
              padding: '28px 36px',
              boxShadow: `${buttonShadowX}px ${buttonShadowY}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'background-color 0.1s ease',
            }}
          >
            <span
              style={{
                fontSize: 52,
                fontWeight: 900,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '-0.03em',
              }}
            >
              {isClicked ? 'STOP IT!' : 'DO EVERYTHING'}
            </span>

            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                border: '4px solid #000000',
                backgroundColor: isClicked ? '#000000' : '#FFF8E7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: isClicked ? '#FF4D4D' : '#000000',
                }}
              />
            </div>
          </div>

          {/* Subtitle Underlined Link Styling */}
          <div
            style={{
              fontSize: 32,
              fontWeight: 900,
              color: '#000000',
              textDecoration: 'underline',
              textDecorationThickness: '5px',
              textUnderlineOffset: '8px',
              marginTop: 10,
              textTransform: 'uppercase',
              lineHeight: 1.2,
            }}
          >
            BECAUSE I MADE THESE MISTAKES
          </div>
        </div>

        {/* Bottom Status Ribbon */}
        <div
          style={{
            backgroundColor: '#FFF8E7',
            border: '4px solid #000000',
            borderRadius: 16,
            padding: '16px 24px',
            boxShadow: '4px 4px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 22,
            fontWeight: 900,
            color: '#000000',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {isClicked ? '⚠️ SYSTEM OVERLOAD PREVENTED' : '👈 CLICK TOGGLE TO FIX'}
        </div>

        {/* Sticker Slap Element (#23A094 Teal) */}
        <div
          style={{
            position: 'absolute',
            top: -24,
            right: -20,
            transform: `scale(${stickerScale}) rotate(${stickerRotate}deg)`,
            backgroundColor: '#23A094',
            border: '5px solid #000000',
            borderRadius: 20,
            padding: '16px 32px',
            boxShadow: '8px 8px 0px #000000',
            zIndex: 20,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: '#FFF8E7',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            MISTAKE!
          </span>
        </div>

        {/* Oversized Neubrutalist Black Cursor */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(${cursorX}px, ${cursorY}px)`,
            zIndex: 30,
            pointerEvents: 'none',
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(3px 3px 0px #000000)' }}
          >
            <path
              d="M6 3L26 15L16 18L22 28L17 30L11 20L6 25V3Z"
              fill="#000000"
              stroke="#FFF8E7"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
}