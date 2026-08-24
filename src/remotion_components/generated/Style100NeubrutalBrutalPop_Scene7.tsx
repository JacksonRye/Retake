import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene7() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): SNAPPY ENTRANCE
  // ==========================================
  const cardEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 210, mass: 0.6 },
  });

  const badgeEntrance = spring({
    frame: frame - 6,
    fps,
    config: { damping: 11, stiffness: 250, mass: 0.5 },
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): CURSOR CLICK & AUTOMATION
  // ==========================================
  const cursorProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 170, mass: 0.7 },
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [320, 20], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [380, -10], clamp);
  const cursorOpacity = interpolate(cursorProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0], clamp);

  const isClicked = frame >= 44;

  const clickScale = isClicked
    ? interpolate(frame, [44, 48, 54], [1, 0.92, 1], clamp)
    : 1;
  const clickShadow = isClicked
    ? interpolate(frame, [44, 48, 54], [10, 2, 10], clamp)
    : 10;

  const shockwaveProgress = spring({
    frame: frame - 44,
    fps,
    config: { damping: 12, stiffness: 200 },
  });
  const shockwaveScale = interpolate(shockwaveProgress, [0, 1], [0.2, 2.2], clamp);
  const shockwaveOpacity = interpolate(shockwaveProgress, [0, 0.2, 1], [0, 0.8, 0], clamp);

  // Sticker Slap ("ENTIRE DEPT IN A BOX")
  const stickerSpring = spring({
    frame: frame - 46,
    fps,
    config: { damping: 10, stiffness: 260, mass: 0.5 },
  });

  const subStickerSpring = spring({
    frame: frame - 52,
    fps,
    config: { damping: 12, stiffness: 240, mass: 0.5 },
  });

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): LIVING PHYSICS & EXIT
  // ==========================================
  const hoverY = Math.sin(frame * 0.11) * 7;
  const hoverTilt = Math.sin(frame * 0.07) * 1.4;
  const shadowOffset = 12 + Math.sin(frame * 0.13) * 4;

  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 14, stiffness: 220 },
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.84], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const cardScale = interpolate(cardEntrance, [0, 1], [0.8, 1], clamp) * exitScale;
  const cardYOffset = interpolate(cardEntrance, [0, 1], [-120, 0], clamp);
  const cardOpacity = interpolate(cardEntrance, [0, 0.2], [0, 1], clamp) * exitOpacity;

  const agentSlots = [
    { id: '01', title: 'ROPE AGENT #1', tag: 'ROUTING' },
    { id: '02', title: 'ROPE AGENT #2', tag: 'ANALYSIS' },
    { id: '03', title: 'ROPE AGENT #3', tag: 'EXECUTION' },
    { id: '04', title: 'ROPE AGENT #4', tag: 'DISPATCH' },
    { id: '05', title: 'ROPE AGENT #5', tag: 'SYNC' },
    { id: '100', title: 'ROPE AGENT #100', tag: 'SCALE' },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden',
        padding: '40px 20px',
      }}
    >
      {/* BACKGROUND BRUTALIST GRID PATTERN */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(#000000 15%, transparent 15%),
            radial-gradient(#000000 15%, transparent 15%)
          `,
          backgroundPosition: '0 0, 20px 20px',
          backgroundSize: '40px 40px',
          opacity: 0.07,
        }}
      />

      {/* TOP HEADER BRAND BANNER */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          backgroundColor: '#000000',
          color: '#FFF8E7',
          padding: '12px 32px',
          borderRadius: 999,
          fontSize: 22,
          fontWeight: 900,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          boxShadow: '0px 6px 0px #23A094',
          zIndex: 5,
        }}
      >
        TOP ROPE ARCHITECTURE
      </div>

      {/* MAIN DEPARTMENT HERO CARD CONTAINER */}
      <div
        style={{
          width: '92%',
          maxWidth: 960,
          opacity: cardOpacity,
          transform: `scale(${cardScale}) translateY(${cardYOffset + hoverY}px) rotate(${hoverTilt}deg)`,
          backgroundColor: '#FF90E8',
          border: '5px solid #000000',
          borderRadius: 36,
          boxShadow: `12px ${shadowOffset}px 0px #000000`,
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* HEADER BAR INSIDE CARD */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div
            style={{
              backgroundColor: '#000000',
              color: '#F1F333',
              padding: '10px 20px',
              borderRadius: 14,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F1F333', display: 'inline-block' }} />
            DEPT: SPECIFIC TOP ROPE
          </div>

          <div
            style={{
              transform: `scale(${badgeEntrance}) rotate(2deg)`,
              backgroundColor: '#23A094',
              border: '3px solid #000000',
              borderRadius: 16,
              padding: '8px 18px',
              fontSize: 20,
              fontWeight: 900,
              color: '#FFFFFF',
              boxShadow: '4px 4px 0px #000000',
            }}
          >
            100+ AGENTS
          </div>
        </div>

        {/* HERO SPOKEN LINE HEADING */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 54,
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: '#000000',
              textTransform: 'uppercase',
            }}
          >
            TENS OR HUNDREDS OF AGENTS
          </h1>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: '#000000',
              backgroundColor: '#FFF8E7',
              border: '3px solid #000000',
              padding: '6px 16px',
              borderRadius: 10,
              display: 'inline-block',
              alignSelf: 'flex-start',
              boxShadow: '3px 3px 0px #000000',
            }}
          >
            <u>SPECIFIC DEPARTMENT DEPLOYMENT</u>
          </div>
        </div>

        {/* CENTER VISUAL CONTAINER: SWITCHES BETWEEN AGENT SLOTS AND STICKER */}
        <div
          style={{
            position: 'relative',
            minHeight: 380,
            backgroundColor: '#FFF8E7',
            border: '4px solid #000000',
            borderRadius: 24,
            padding: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: 'inset 0px 4px 0px rgba(0,0,0,0.08)',
          }}
        >
          {/* STATE 1: INDIVIDUAL AGENT SLOTS */}
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 16,
              opacity: isClicked ? 0.15 : 1,
              filter: isClicked ? 'grayscale(100%)' : 'none',
              transition: 'opacity 0.2s ease, filter 0.2s ease',
            }}
          >
            {agentSlots.map((slot) => (
              <div
                key={slot.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '3px solid #000000',
                  borderRadius: 16,
                  padding: '16px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  alignItems: 'center',
                  boxShadow: '4px 4px 0px #000000',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: '#F1F333',
                    border: '2px solid #000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 900,
                  }}
                >
                  🤖
                </div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#000000', textAlign: 'center' }}>
                  {slot.title}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    backgroundColor: '#23A094',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    borderRadius: 6,
                    border: '1px solid #000000',
                  }}
                >
                  {slot.tag}
                </div>
              </div>
            ))}
          </div>

          {/* STATE 2: OVERSIZED YELLOW STICKER SLAP */}
          {frame >= 44 && (
            <div
              style={{
                position: 'absolute',
                inset: 16,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                zIndex: 20,
              }}
            >
              <div
                style={{
                  transform: `scale(${stickerSpring}) rotate(-2.5deg)`,
                  backgroundColor: '#F1F333',
                  border: '5px solid #000000',
                  borderRadius: 28,
                  padding: '28px 36px',
                  boxShadow: '10px 10px 0px #000000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: '95%',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#000000',
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: 900,
                    padding: '4px 14px',
                    borderRadius: 8,
                    letterSpacing: '0.1em',
                    marginBottom: 8,
                  }}
                >
                  ⚡ UNIFIED ARCHITECTURE
                </div>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    color: '#000000',
                    textTransform: 'uppercase',
                  }}
                >
                  ENTIRE DEPT IN A BOX
                </div>
              </div>

              <div
                style={{
                  transform: `scale(${subStickerSpring}) rotate(3deg)`,
                  backgroundColor: '#23A094',
                  border: '4px solid #000000',
                  borderRadius: 18,
                  padding: '10px 24px',
                  color: '#FFFFFF',
                  fontSize: 22,
                  fontWeight: 900,
                  boxShadow: '5px 5px 0px #000000',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span>✅ INSTANT DEPLOYMENT</span>
                <span style={{ backgroundColor: '#000000', color: '#F1F333', padding: '2px 8px', borderRadius: 6, fontSize: 18 }}>
                  100% READY
                </span>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BUTTON AREA */}
        <div style={{ position: 'relative', width: '100%' }}>
          {frame >= 44 && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 200,
                height: 200,
                marginTop: -100,
                marginLeft: -100,
                borderRadius: '50%',
                backgroundColor: '#F1F333',
                border: '4px solid #000000',
                transform: `scale(${shockwaveScale})`,
                opacity: shockwaveOpacity,
                pointerEvents: 'none',
                zIndex: 15,
              }}
            />
          )}

          <div
            style={{
              transform: `scale(${clickScale})`,
              backgroundColor: isClicked ? '#F1F333' : '#23A094',
              border: '5px solid #000000',
              borderRadius: 22,
              padding: '22px 32px',
              boxShadow: `0px ${clickShadow}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 900,
                }}
              >
                {isClicked ? '✓' : '⚡'}
              </div>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  letterSpacing: '0.02em',
                  color: '#000000',
                  textTransform: 'uppercase',
                }}
              >
                {isClicked ? 'DEPARTMENT AUTOMATED!' : 'AUTOMATE DEPT'}
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#000000',
                color: '#FFF8E7',
                padding: '8px 18px',
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 900,
              }}
            >
              {isClicked ? 'ACTIVE' : 'CLICK TO BOX'}
            </div>
          </div>

          {/* SIMULATED NEUBRUTAL CURSOR */}
          {frame >= 20 && frame <= 65 && (
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                right: 60,
                transform: `translate(${cursorX}px, ${cursorY}px)`,
                opacity: cursorOpacity,
                zIndex: 30,
                pointerEvents: 'none',
              }}
            >
              <svg
                width="52"
                height="52"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(3px 3px 0px #000000)',
                }}
              >
                <path
                  d="M6 2L26 14L16 17.5L22 28L17 30L11 19.5L6 24V2Z"
                  fill="#F1F333"
                  stroke="#000000"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
}