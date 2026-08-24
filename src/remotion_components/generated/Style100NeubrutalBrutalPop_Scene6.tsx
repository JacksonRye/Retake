import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene6() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): SNAPPY PANEL ENTRANCE
  // ==========================================
  const panelEntrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 220, mass: 0.6 },
  });

  const headerBadgePop = spring({
    frame: frame - 6,
    fps,
    config: { damping: 11, stiffness: 260, mass: 0.5 },
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): COUNTER SPIN & STICKER SLAPS
  // ==========================================
  // Rapid counter from 1 to 100 in ~1.2s (frames 20 to 56)
  const countRaw = interpolate(frame, [20, 56], [1, 100], clamp);
  const countFormatted = Math.floor(countRaw);

  // Sticker 1: "AUTO-INSTALLED" Yellow Badge Slap (Frame 30)
  const sticker1Spring = spring({
    frame: frame - 28,
    fps,
    config: { damping: 10, stiffness: 300, mass: 0.4 },
  });
  const sticker1Scale = interpolate(sticker1Spring, [0, 1], [2.2, 1], clamp);
  const sticker1Opacity = interpolate(sticker1Spring, [0, 0.15], [0, 1], clamp);

  // Sticker 2: "METHODOLOGY DEPLOYED" Pink Badge Slap (Frame 42)
  const sticker2Spring = spring({
    frame: frame - 42,
    fps,
    config: { damping: 10, stiffness: 300, mass: 0.4 },
  });
  const sticker2Scale = interpolate(sticker2Spring, [0, 1], [2.2, 1], clamp);
  const sticker2Opacity = interpolate(sticker2Spring, [0, 0.15], [0, 1], clamp);

  // Cursor move & click action
  const cursorProgress = spring({
    frame: frame - 18,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.7 },
  });
  const cursorX = interpolate(cursorProgress, [0, 1], [280, 50], clamp);
  const cursorY = interpolate(cursorProgress, [0, 1], [380, 80], clamp);

  const isClicked = frame >= 36 && frame <= 44;
  const buttonPressScale = isClicked ? 0.94 : 1;
  const buttonShadowOffset = isClicked ? 3 : 8;

  // Progress Bar percentage
  const progressPercent = Math.min(100, Math.max(2, countRaw));

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): LIVING PHYSICS & SWEEP EXIT
  // ==========================================
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.2;

  // Light sweep pos across launcher
  const sweepProgress = interpolate((frame % 45), [0, 45], [-120, 220], clamp);

  // Snappy Exit before clip end
  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 240 },
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const overallOpacity = interpolate(panelEntrance, [0, 0.2], [0, 1], clamp) * exitOpacity;
  const overallScale = interpolate(panelEntrance, [0, 1], [0.8, 1], clamp) * exitScale;
  const overallY = interpolate(panelEntrance, [0, 1], [120, 0], clamp) + hoverY;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Background Neubrutal Dot Grid Pattern */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 18%, transparent 19%)',
          backgroundSize: '32px 32px',
          opacity: 0.08,
        }}
      />

      {/* Hero Wrapper Container */}
      <div
        style={{
          width: '90%',
          maxWidth: 960,
          opacity: overallOpacity,
          transform: `scale(${overallScale}) translateY(${overallY}px) rotate(${hoverTilt}deg)`,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
        }}
      >
        {/* Main Launcher Panel (Teal Neubrutal #23A094) */}
        <div
          style={{
            backgroundColor: '#23A094',
            border: '5px solid #000000',
            borderRadius: 32,
            boxShadow: '12px 12px 0px #000000',
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 28,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Border Light Sweep Effect */}
          <div
            style={{
              position: 'absolute',
              top: -50,
              left: `${sweepProgress}%`,
              width: 80,
              height: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              transform: 'rotate(25deg)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Panel Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <div
              style={{
                backgroundColor: '#FFF8E7',
                border: '3px solid #000000',
                borderRadius: 12,
                padding: '8px 16px',
                boxShadow: '4px 4px 0px #000000',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  backgroundColor: '#F1F333',
                  border: '2px solid #000000',
                }}
              />
              <span style={{ fontSize: 18, fontWeight: 900, color: '#000000', letterSpacing: '0.05em' }}>
                AI AGENT LAUNCHER
              </span>
            </div>

            <div
              style={{
                transform: `scale(${headerBadgePop})`,
                backgroundColor: '#FF90E8',
                border: '3px solid #000000',
                borderRadius: 999,
                padding: '8px 18px',
                boxShadow: '4px 4px 0px #000000',
                fontSize: 16,
                fontWeight: 900,
                color: '#000000',
              }}
            >
              METHODOLOGY v2.4
            </div>
          </div>

          {/* Hero Counter Box */}
          <div
            style={{
              backgroundColor: '#FFF8E7',
              border: '5px solid #000000',
              borderRadius: 24,
              boxShadow: '8px 8px 0px #000000',
              padding: '36px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#000000', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                INSTALLED CAPACITY
              </span>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#000000', backgroundColor: '#F1F333', border: '2px solid #000000', padding: '2px 10px', borderRadius: 8 }}>
                LIVE
              </span>
            </div>

            {/* Massive Counter Typography */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <div
                style={{
                  fontSize: 104,
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: '-0.04em',
                  color: '#000000',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {countFormatted}
              </div>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#000000',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                }}
              >
                {countFormatted === 1 ? 'AGENT' : 'AGENTS'}
              </div>
            </div>

            {/* Heavy Progress Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              <div
                style={{
                  width: '100%',
                  height: 28,
                  backgroundColor: '#FFFFFF',
                  border: '4px solid #000000',
                  borderRadius: 14,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    backgroundColor: '#F1F333',
                    borderRight: progressPercent > 0 ? '3px solid #000000' : 'none',
                    transition: 'width 0.05s linear',
                  }}
                />
              </div>
            </div>

            {/* STICKER 1: AUTO-INSTALLED (Yellow) */}
            <div
              style={{
                position: 'absolute',
                top: -24,
                right: -16,
                transform: `scale(${sticker1Scale}) rotate(-7deg)`,
                opacity: sticker1Opacity,
                backgroundColor: '#F1F333',
                border: '4px solid #000000',
                borderRadius: 16,
                padding: '12px 22px',
                boxShadow: '6px 6px 0px #000000',
                fontSize: 22,
                fontWeight: 900,
                color: '#000000',
                zIndex: 10,
                whiteSpace: 'nowrap',
              }}
            >
              ⚡ AUTO-INSTALLED!
            </div>

            {/* STICKER 2: METHODOLOGY (Pink) */}
            <div
              style={{
                position: 'absolute',
                bottom: -22,
                left: 20,
                transform: `scale(${sticker2Scale}) rotate(5deg)`,
                opacity: sticker2Opacity,
                backgroundColor: '#FF90E8',
                border: '4px solid #000000',
                borderRadius: 16,
                padding: '10px 20px',
                boxShadow: '6px 6px 0px #000000',
                fontSize: 20,
                fontWeight: 900,
                color: '#000000',
                zIndex: 11,
                whiteSpace: 'nowrap',
              }}
            >
              🚀 SPINNING UP FAST
            </div>
          </div>

          {/* Interactive Action Button */}
          <div
            style={{
              transform: `scale(${buttonPressScale})`,
              backgroundColor: '#F1F333',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '22px 28px',
              boxShadow: `0px ${buttonShadowY(buttonShadowOffset)}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 26,
              fontWeight: 900,
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              position: 'relative',
            }}
          >
            {countFormatted >= 100 ? '✅ 100 AGENTS ACTIVE' : '⚡ SPINNING UP AGENTS...'}
          </div>

          {/* Neubrutal Simulated Cursor */}
          <div
            style={{
              position: 'absolute',
              bottom: `${cursorY}px`,
              right: `${cursorX}px`,
              pointerEvents: 'none',
              zIndex: 20,
              transform: isClicked ? 'scale(0.85)' : 'scale(1)',
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                fill="#FFF8E7"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Caption / Spoken Quote Card */}
        <div
          style={{
            backgroundColor: '#FFF8E7',
            border: '4px solid #000000',
            borderRadius: 20,
            padding: '20px 24px',
            boxShadow: '6px 6px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              backgroundColor: '#FF90E8',
              border: '3px solid #000000',
              borderRadius: 10,
              padding: '6px 12px',
              fontSize: 16,
              fontWeight: 900,
              color: '#000000',
              whiteSpace: 'nowrap',
            }}
          >
            QUOTE
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#000000', lineHeight: 1.3 }}>
            "...at least a{' '}
            <span style={{ textDecoration: 'underline', textDecorationThickness: '4px', backgroundColor: '#F1F333' }}>
              methodology of installing or spinning up
            </span>{' '}
            their own AI agents..."
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function buttonShadowY(offset: number): number {
  return offset;
}