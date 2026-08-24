import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene1() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): HARD SNAP ENTRANCE
  // ==========================================
  // Hard snap move (high stiffness, low damping feel)
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 280, mass: 0.7 }
  });

  const cardScale = interpolate(cardEntrance, [0, 1], [0.2, 1], clamp);
  const cardRotate = interpolate(cardEntrance, [0, 1], [-12, -1.5], clamp);
  const cardOpacity = interpolate(cardEntrance, [0, 0.15], [0, 1], clamp);

  // Top header button slap
  const topBadgeEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 12, stiffness: 300 }
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): RAPID METRIC ROLL & STICKER SLAP
  // ==========================================
  // Rapid counter from $0 to $50,000 (Frames 20 to 65)
  const countRaw = interpolate(frame, [20, 65], [0, 50000], clamp);
  const formattedCount = "$" + Math.round(countRaw).toLocaleString('en-US');

  // Rev Share calculate string change
  const revShareAmount = "$" + Math.round(countRaw * 0.10).toLocaleString('en-US');

  // Sticker slap onto top right corner at frame 42
  const stickerSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 10, stiffness: 340, mass: 0.5 }
  });
  const stickerScale = frame < 40 ? 0 : interpolate(stickerSpring, [0, 1], [2.5, 1], clamp);
  const stickerRotate = frame < 40 ? 0 : interpolate(stickerSpring, [0, 1], [25, 8], clamp);

  // Bottom text reveal slap (frame 55)
  const bottomBarEntrance = spring({
    frame: frame - 52,
    fps,
    config: { damping: 13, stiffness: 260 }
  });

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): HOVER OSCILLATION & EXIT
  // ==========================================
  const hoverY = Math.sin(frame * 0.15) * 6;
  const shadowOffset = 12 + Math.sin(frame * 0.12) * 4;

  // Snappy exit before composition end
  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 280 }
  });

  const exitY = interpolate(exitProgress, [0, 1], [0, 600], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const containerOpacity = cardOpacity * exitOpacity;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        fontFamily: '"Arial Black", "Impact", system-ui, sans-serif',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      {/* BACKGROUND BRUTALIST PATTERN ELEMENTS */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 60,
          fontSize: 48,
          fontWeight: 900,
          color: '#000000',
          opacity: 0.15,
          userSelect: 'none'
        }}
      >
        ✦ ✦ ✦
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          right: 60,
          fontSize: 64,
          fontWeight: 900,
          color: '#000000',
          opacity: 0.15,
          userSelect: 'none'
        }}
      >
        ✚ ✚
      </div>

      {/* TOP CATEGORY BADGE */}
      <div
        style={{
          transform: `scale(${interpolate(topBadgeEntrance, [0, 1], [0, 1], clamp)})`,
          backgroundColor: '#23A094',
          border: '5px solid #000000',
          boxShadow: '6px 6px 0px #000000',
          borderRadius: 999,
          padding: '12px 32px',
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: '0.08em',
          color: '#FFFFFF',
          textTransform: 'uppercase',
          marginBottom: 40,
          zIndex: 2
        }}
      >
        ⚡ REVENUE SHARE LOGIC
      </div>

      {/* MAIN HERO CARD CONTAINER */}
      <div
        style={{
          width: '100%',
          maxWidth: 920,
          opacity: containerOpacity,
          transform: `scale(${cardScale}) translateY(${hoverY + exitY}px) rotate(${cardRotate}deg)`,
          backgroundColor: '#F1F333', // Electric Yellow
          border: '7px solid #000000',
          borderRadius: 36,
          boxShadow: `${shadowOffset}px ${shadowOffset}px 0px #000000`,
          padding: '52px 44px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          position: 'relative',
          boxSizing: 'border-box',
          zIndex: 1
        }}
      >
        {/* BEAT 2 STICKER SLAP (TOP RIGHT) */}
        <div
          style={{
            position: 'absolute',
            top: -28,
            right: -16,
            transform: `scale(${stickerScale}) rotate(${stickerRotate}deg)`,
            backgroundColor: '#FF90E8', // Bubblegum Pink
            border: '5px solid #000000',
            boxShadow: '8px 8px 0px #000000',
            borderRadius: 20,
            padding: '14px 28px',
            fontSize: 28,
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '0.04em',
            zIndex: 10,
            whiteSpace: 'nowrap'
          }}
        >
          🏷️ 10% REV SHARE
        </div>

        {/* CARD HEADER SECTION */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              backgroundColor: '#000000',
              color: '#FFF8E7',
              padding: '8px 18px',
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: '0.05em'
            }}
          >
            METRIC
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, textTransform: 'uppercase', color: '#000000' }}>
            NEW VALUE CREATED
          </span>
        </div>

        {/* HERO NUMBER COUNTER */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div
            style={{
              fontSize: 100,
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
              color: '#000000',
              fontVariantNumeric: 'tabular-nums'
            }}
          >
            {formattedCount}
          </div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#000000', textTransform: 'uppercase', opacity: 0.9 }}>
            Directly Generated Revenue
          </div>
        </div>

        {/* INSIDE BUTTON / TILE ACTION */}
        <div
          style={{
            backgroundColor: '#FFF8E7',
            border: '5px solid #000000',
            borderRadius: 24,
            padding: '24px 30px',
            boxShadow: '6px 6px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: '#000000', opacity: 0.7, textTransform: 'uppercase' }}>
              YOUR CUT (10%)
            </span>
            <span style={{ fontSize: 42, fontWeight: 900, color: '#23A094' }}>
              {revShareAmount}
            </span>
          </div>

          <div
            style={{
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '3px solid #000000',
              borderRadius: 16,
              padding: '14px 24px',
              fontSize: 20,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            WIN-WIN 🤝
          </div>
        </div>
      </div>

      {/* BOTTOM QUOTE SLAP CARD (SPOKEN LINE INTEGRATION) */}
      <div
        style={{
          width: '100%',
          maxWidth: 920,
          marginTop: 40,
          opacity: containerOpacity,
          transform: `scale(${interpolate(bottomBarEntrance, [0, 1], [0.8, 1], clamp)}) translateY(${exitY}px)`,
          backgroundColor: '#FF90E8',
          border: '6px solid #000000',
          borderRadius: 28,
          boxShadow: '10px 10px 0px #000000',
          padding: '28px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxSizing: 'border-box',
          zIndex: 1
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: 900,
            color: '#000000',
            lineHeight: 1.3,
            textTransform: 'uppercase'
          }}
        >
          "ANY SANE BUSINESS OWNER WILL HAPPILY GIVE YOU A FRACTION OF MONEY THEY HAVE NOT MADE."
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ height: 4, width: 40, backgroundColor: '#000000' }} />
          <span style={{ fontSize: 18, fontWeight: 900, textDecoration: 'underline', color: '#000000' }}>
            NO RISK REALITY
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
}