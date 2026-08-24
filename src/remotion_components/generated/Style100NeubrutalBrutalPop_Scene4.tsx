import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene4() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): SNAPPY BRUTALIST ENTRANCE
  // ==========================================
  const containerEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 200, mass: 0.6 },
  });

  const headerEntrance = spring({
    frame: frame - 4,
    fps,
    config: { damping: 10, stiffness: 240, mass: 0.5 },
  });

  const scaleEntrance = spring({
    frame: frame - 8,
    fps,
    config: { damping: 11, stiffness: 220, mass: 0.6 },
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): TEAL LEVERAGE BLOCK SLAM & TIPPING PHYSICS
  // ==========================================
  // Heavy Teal Block Slam down onto the scale
  const tealDropProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 280, mass: 0.8 },
  });
  const tealY = interpolate(tealDropProgress, [0, 1], [-280, 0], clamp);
  const tealOpacity = interpolate(tealDropProgress, [0, 0.15], [0, 1], clamp);

  // Scale Tipping Physics upon Impact (Frame 35)
  const impactFrame = 35;
  const tiltSpring = spring({
    frame: frame - impactFrame,
    fps,
    config: { damping: 8, stiffness: 180, mass: 0.7 },
  });
  const tiltAngle = interpolate(tiltSpring, [0, 1], [0, 14], clamp);

  // Thunk vibration on impact
  const impactShake =
    frame >= impactFrame && frame <= impactFrame + 8
      ? Math.sin((frame - impactFrame) * 1.2) * 8
      : 0;

  // Impact Stamp Pop at Frame 38
  const stampSpring = spring({
    frame: frame - 38,
    fps,
    config: { damping: 9, stiffness: 300, mass: 0.4 },
  });
  const stampScale = interpolate(stampSpring, [0, 1], [0, 1], clamp);

  // Dynamic Ratio Counter Shift (50/50 -> 90/10)
  const ratioYou = Math.round(interpolate(frame, [35, 55], [50, 90], clamp));
  const ratioThem = 100 - ratioYou;

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): LIVING PHYSICS & CLEAN EXIT
  // ==========================================
  const hoverY = Math.sin(frame * 0.1) * 6;
  const hoverTilt = Math.sin(frame * 0.07) * 1.2;
  const shadowPulse = 10 + Math.sin(frame * 0.12) * 4;

  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 240 },
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.88], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const globalOpacity = interpolate(containerEntrance, [0, 0.2], [0, 1], clamp) * exitOpacity;
  const globalScale = interpolate(containerEntrance, [0, 1], [0.85, 1], clamp) * exitScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Impact, "Arial Black", system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        padding: '20px',
      }}
    >
      {/* Background Decorative Pop Elements */}
      <div
        style={{
          position: 'absolute',
          top: 50,
          left: 50,
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#FF90E8',
          border: '4px solid #000000',
          boxShadow: '4px 4px 0px #000000',
          transform: `rotate(${frame * 0.5}deg)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          right: 50,
          width: 90,
          height: 90,
          backgroundColor: '#F1F333',
          border: '4px solid #000000',
          boxShadow: '6px 6px 0px #000000',
          transform: `rotate(${-frame * 0.3}deg)`,
        }}
      />

      {/* Main Outer Hero Card Container */}
      <div
        style={{
          width: '92%',
          maxWidth: 960,
          height: '90%',
          maxHeight: 1650,
          opacity: globalOpacity,
          transform: `scale(${globalScale}) translateY(${hoverY + impactShake}px) rotate(${hoverTilt}deg)`,
          backgroundColor: '#FFFFFF',
          border: '5px solid #000000',
          borderRadius: 32,
          boxShadow: `12px ${shadowPulse}px 0px #000000`,
          padding: '44px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        {/* TOP HEADER SECTION */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            width: '100%',
            transform: `scale(${headerEntrance})`,
          }}
        >
          {/* Top Badge Sticker */}
          <div
            style={{
              backgroundColor: '#FF90E8',
              border: '3px solid #000000',
              borderRadius: 999,
              padding: '8px 24px',
              fontSize: 20,
              fontWeight: 900,
              color: '#000000',
              boxShadow: '4px 4px 0px #000000',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            ★ LEVERAGE EQUATION ★
          </div>

          <div
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: '#000000',
              textAlign: 'center',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            WHO NEEDS WHO MORE?
          </div>
        </div>

        {/* METRIC SHIFT DISPLAY BAR */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            margin: '12px 0',
          }}
        >
          {/* Left Side: Them */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              boxShadow: '4px 4px 0px #000000',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 900, color: '#000000', opacity: 0.7 }}>
              THEM NEEDING YOU
            </span>
            <span style={{ fontSize: 48, fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              {ratioThem}%
            </span>
          </div>

          {/* Center VS Badge */}
          <div
            style={{
              backgroundColor: '#F1F333',
              border: '3px solid #000000',
              borderRadius: 12,
              padding: '8px 14px',
              fontSize: 22,
              fontWeight: 900,
              color: '#000000',
              boxShadow: '3px 3px 0px #000000',
              transform: 'rotate(-4deg)',
            }}
          >
            VS
          </div>

          {/* Right Side: You */}
          <div
            style={{
              flex: 1,
              backgroundColor: ratioYou > 50 ? '#23A094' : '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              boxShadow: '4px 4px 0px #000000',
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: ratioYou > 50 ? '#FFFFFF' : '#000000',
              }}
            >
              YOU NEEDING THEM
            </span>
            <span
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: ratioYou > 50 ? '#FFFFFF' : '#000000',
                lineHeight: 1,
              }}
            >
              {ratioYou}%
            </span>
          </div>
        </div>

        {/* HERO BALANCE SCALE VISUAL */}
        <div
          style={{
            width: '100%',
            height: 480,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            transform: `scale(${scaleEntrance})`,
            margin: '10px 0',
          }}
        >
          {/* Fulcrum Stand (Triangle Base) */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              width: 0,
              height: 0,
              borderLeft: '50px solid transparent',
              borderRight: '50px solid transparent',
              borderBottom: '110px solid #000000',
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 24,
              width: 0,
              height: 0,
              borderLeft: '42px solid transparent',
              borderRight: '42px solid transparent',
              borderBottom: '96px solid #F1F333',
              zIndex: 2,
            }}
          />

          {/* Tilting Beam Assembly */}
          <div
            style={{
              position: 'absolute',
              bottom: 125,
              width: '94%',
              maxWidth: 620,
              height: 20,
              backgroundColor: '#000000',
              borderRadius: 10,
              transformOrigin: 'center center',
              transform: `rotate(${tiltAngle}deg)`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              zIndex: 3,
            }}
          >
            {/* Center Pivot Point */}
            <div
              style={{
                position: 'absolute',
                top: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: '#FF90E8',
                border: '4px solid #000000',
              }}
            />

            {/* LEFT PAN ASSEMBLY */}
            <div
              style={{
                position: 'absolute',
                left: 10,
                top: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `rotate(${-tiltAngle}deg)`,
                transformOrigin: 'top center',
              }}
            >
              <div style={{ width: 4, height: 90, backgroundColor: '#000000' }} />
              <div
                style={{
                  width: 170,
                  minHeight: 100,
                  backgroundColor: '#FFF8E7',
                  border: '4px solid #000000',
                  borderRadius: 16,
                  boxShadow: '4px 4px 0px #000000',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 900, color: '#000000', opacity: 0.6 }}>
                  STANDARD
                </span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 900,
                    color: '#000000',
                    textAlign: 'center',
                    lineHeight: 1.1,
                  }}
                >
                  LOW LEVERAGE
                </span>
              </div>
            </div>

            {/* RIGHT PAN ASSEMBLY (HEAVY SLAM TARGET) */}
            <div
              style={{
                position: 'absolute',
                right: 10,
                top: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `rotate(${-tiltAngle}deg)`,
                transformOrigin: 'top center',
              }}
            >
              <div style={{ width: 4, height: 90, backgroundColor: '#000000' }} />
              <div
                style={{
                  width: 200,
                  minHeight: 120,
                  backgroundColor: '#FFF8E7',
                  border: '4px solid #000000',
                  borderRadius: 16,
                  boxShadow: '4px 4px 0px #000000',
                  padding: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                {/* Heavy Teal Slam Block */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#23A094',
                    border: '4px solid #000000',
                    borderRadius: 12,
                    boxShadow: '4px 4px 0px #000000',
                    padding: '14px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    transform: `translateY(${tealY}px)`,
                    opacity: tealOpacity,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 900,
                      color: '#F1F333',
                      letterSpacing: '0.08em',
                    }}
                  >
                    ★ SPECIALIZED ★
                  </span>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: '#FFFFFF',
                      textAlign: 'center',
                      lineHeight: 1.1,
                    }}
                  >
                    HIGH SKILL LEVERAGE
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* IMPACT STAMP STICKER POP */}
          <div
            style={{
              position: 'absolute',
              right: 15,
              top: 40,
              transform: `scale(${stampScale}) rotate(-8deg)`,
              backgroundColor: '#F1F333',
              border: '4px solid #000000',
              borderRadius: 16,
              padding: '12px 20px',
              boxShadow: '6px 6px 0px #000000',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: 24, fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              POWER SHIFTED!
            </span>
            <span style={{ fontSize: 13, fontWeight: 900, color: '#000000', opacity: 0.8 }}>
              IMPACT 90/10
            </span>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTON & LINK */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          {/* Brutalist Action Button */}
          <div
            style={{
              width: '100%',
              backgroundColor: '#23A094',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '20px 24px',
              boxShadow: `0px ${shadowPulse}px 0px #000000`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#F1F333',
                border: '2px solid #000000',
              }}
            />
            <span
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
              }}
            >
              NEGOTIATE MORE
            </span>
          </div>

          {/* Underlined Link Style Text */}
          <div
            style={{
              fontSize: 18,
              fontWeight: 900,
              color: '#000000',
              textDecoration: 'underline',
              textDecorationThickness: '3px',
              textUnderlineOffset: '4px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            <u>HOW MUCH THEY NEED YOU</u>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}