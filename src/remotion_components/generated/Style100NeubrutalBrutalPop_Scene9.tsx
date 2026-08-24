import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene9() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): HARD SNAP STICKER ENTRANCE
  // ==========================================
  const mainCardSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.6 }
  });

  const headerBadgeSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 10, stiffness: 260, mass: 0.4 }
  });

  // Card entrance dynamics (Hard slap down with recoil tilt)
  const cardScale = interpolate(mainCardSpring, [0, 1], [0.75, 1], clamp);
  const cardRotate = interpolate(mainCardSpring, [0, 0.7, 1], [-8, 2, 0], clamp);
  const cardTranslateY = interpolate(mainCardSpring, [0, 1], [120, 0], clamp);

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): CURSOR CLICK & TOGGLE SLAM
  // ==========================================
  const clickTriggerFrame = 38;
  const isToggled = frame >= clickTriggerFrame;

  // Animated Cursor path towards the switch button
  const cursorMoveProgress = spring({
    frame: frame - 14,
    fps,
    config: { damping: 15, stiffness: 140, mass: 0.7 }
  });

  const cursorX = interpolate(cursorMoveProgress, [0, 1], [320, 75], clamp);
  const cursorY = interpolate(cursorMoveProgress, [0, 1], [380, 130], clamp);

  const isClicking = frame >= clickTriggerFrame - 3 && frame <= clickTriggerFrame + 3;
  const cursorClickScale = isClicking ? 0.78 : 1;

  // Cursor fade out after action
  const cursorOpacity = interpolate(frame, [0, 10, 52, 60], [0, 1, 1, 0], clamp);

  // Toggle switch position spring
  const toggleSpring = spring({
    frame: frame - clickTriggerFrame,
    fps,
    config: { damping: 11, stiffness: 280, mass: 0.4 }
  });

  // Impact stickers slap after toggle
  const roiBadgeSpring = spring({
    frame: frame - (clickTriggerFrame + 3),
    fps,
    config: { damping: 9, stiffness: 250, mass: 0.5 }
  });

  const checkmark1Spring = spring({
    frame: frame - (clickTriggerFrame + 7),
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.4 }
  });

  const checkmark2Spring = spring({
    frame: frame - (clickTriggerFrame + 11),
    fps,
    config: { damping: 8, stiffness: 300, mass: 0.4 }
  });

  // Dynamic counter / numerical interpolation
  const costNumber = Math.round(
    interpolate(
      spring({ frame: frame - clickTriggerFrame, fps, config: { damping: 14, stiffness: 180 } }),
      [0, 1],
      [120000, 45000],
      clamp
    )
  );

  const earningsNumber = Math.round(
    interpolate(
      spring({ frame: frame - clickTriggerFrame, fps, config: { damping: 14, stiffness: 180 } }),
      [0, 1],
      [75000, 165000],
      clamp
    )
  );

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): CONTINUOUS WOBBLE & SNAPPY EXIT
  // ==========================================
  const floatY = Math.sin(frame * 0.11) * 7;
  const wobbleTilt = Math.sin(frame * 0.08) * 1.4;
  const shadowOffset = 14 + Math.sin(frame * 0.13) * 4;

  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 12, stiffness: 240 }
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const finalContainerOpacity = interpolate(mainCardSpring, [0, 0.2], [0, 1], clamp) * exitOpacity;
  const finalContainerScale = cardScale * exitScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* Background Graphic Pattern (Neubrutal Grid Accents) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 2px, transparent 2px)',
          backgroundSize: '36px 36px',
          opacity: 0.15
        }}
      />

      {/* Outer Border Decor Frame */}
      <div
        style={{
          position: 'absolute',
          inset: 24,
          border: '4px solid #000000',
          borderRadius: 36,
          pointerEvents: 'none'
        }}
      />

      {/* MAIN NEUBRUTALIST HERO CARD */}
      <div
        style={{
          width: '90%',
          maxWidth: 920,
          opacity: finalContainerOpacity,
          transform: `scale(${finalContainerScale}) translateY(${cardTranslateY + floatY}px) rotate(${cardRotate + wobbleTilt}deg)`,
          backgroundColor: '#FFF8E7',
          border: '6px solid #000000',
          borderRadius: 32,
          boxShadow: `${shadowOffset}px ${shadowOffset}px 0px #000000`,
          padding: '44px 36px',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          position: 'relative'
        }}
      >
        {/* TOP HEADER BAR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                backgroundColor: '#000000',
                color: '#F1F333',
                padding: '8px 16px',
                borderRadius: 12,
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              ALIGNMENT ENGINE
            </div>
          </div>

          {/* BADGE: MUTUAL WIN */}
          <div
            style={{
              transform: `scale(${headerBadgeSpring}) rotate(-3deg)`,
              backgroundColor: '#FF90E8',
              border: '4px solid #000000',
              borderRadius: 999,
              padding: '10px 24px',
              fontSize: 22,
              fontWeight: 900,
              color: '#000000',
              boxShadow: '4px 4px 0px #000000'
            }}
          >
            ⚡ MUTUAL WIN
          </div>
        </div>

        {/* SECTION 1: INTERACTIVE TOGGLE SWITCH */}
        <div
          style={{
            backgroundColor: '#000000',
            border: '4px solid #000000',
            borderRadius: 24,
            padding: 8,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '6px 6px 0px #000000'
          }}
        >
          {/* Sliding Pill Indicator */}
          <div
            style={{
              position: 'absolute',
              top: 8,
              bottom: 8,
              left: 8,
              width: 'calc(50% - 8px)',
              transform: `translateX(${toggleSpring * 100}%)`,
              backgroundColor: isToggled ? '#23A094' : '#FF90E8',
              border: '3px solid #000000',
              borderRadius: 18,
              transition: 'background-color 0.1s step-end'
            }}
          />

          {/* Toggle Option Left */}
          <div
            style={{
              flex: 1,
              zIndex: 2,
              padding: '18px 12px',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 900,
              color: isToggled ? '#FFFFFF' : '#000000',
              textDecoration: isToggled ? 'line-through' : 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}
          >
            TRADITIONAL SALARY
          </div>

          {/* Toggle Option Right */}
          <div
            style={{
              flex: 1,
              zIndex: 2,
              padding: '18px 12px',
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 900,
              color: isToggled ? '#FFF8E7' : '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            WIN-WIN HYBRID
            {isToggled && (
              <span
                style={{
                  backgroundColor: '#F1F333',
                  color: '#000000',
                  border: '2px solid #000000',
                  borderRadius: 99,
                  padding: '2px 10px',
                  fontSize: 14,
                  fontWeight: 900
                }}
              >
                ACTIVE
              </span>
            )}
          </div>
        </div>

        {/* SECTION 2: METRIC COMPARISON SPLIT BOXES */}
        <div style={{ display: 'flex', gap: 20, width: '100%' }}>
          {/* Box 1: Employer Side */}
          <div
            style={{
              flex: 1,
              backgroundColor: isToggled ? '#FFF8E7' : '#FFFFFF',
              border: '4px solid #000000',
              borderRadius: 24,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '6px 6px 0px #000000',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 900, color: '#000000', opacity: 0.7, letterSpacing: '0.05em' }}>
              EMPLOYER FIXED OUTLAY
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              ${costNumber.toLocaleString()}
              <span style={{ fontSize: 20, fontWeight: 800 }}>/yr</span>
            </div>
            <div
              style={{
                alignSelf: 'flex-start',
                backgroundColor: isToggled ? '#23A094' : '#000000',
                color: '#FFFFFF',
                border: '2px solid #000000',
                borderRadius: 99,
                padding: '6px 14px',
                fontSize: 15,
                fontWeight: 900
              }}
            >
              {isToggled ? '▼ 62.5% RISK REDUCTION' : 'HIGH FIXED COST'}
            </div>

            {/* Sticker Checkmark 1 */}
            {isToggled && (
              <div
                style={{
                  position: 'absolute',
                  top: -16,
                  right: -12,
                  transform: `scale(${checkmark1Spring}) rotate(-12deg)`,
                  backgroundColor: '#23A094',
                  color: '#FFFFFF',
                  border: '3px solid #000000',
                  borderRadius: 999,
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 900,
                  boxShadow: '3px 3px 0px #000000'
                }}
              >
                ✓
              </div>
            )}
          </div>

          {/* Box 2: Talent Side */}
          <div
            style={{
              flex: 1,
              backgroundColor: isToggled ? '#F1F333' : '#FFFFFF',
              border: '4px solid #000000',
              borderRadius: 24,
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '6px 6px 0px #000000',
              position: 'relative'
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 900, color: '#000000', opacity: 0.7, letterSpacing: '0.05em' }}>
              TALENT MAX EARNINGS
            </div>
            <div style={{ fontSize: 48, fontWeight: 900, color: '#000000', lineHeight: 1 }}>
              ${earningsNumber.toLocaleString()}
              <span style={{ fontSize: 20, fontWeight: 800 }}>+</span>
            </div>
            <div
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#000000',
                color: '#FFF8E7',
                border: '2px solid #000000',
                borderRadius: 99,
                padding: '6px 14px',
                fontSize: 15,
                fontWeight: 900
              }}
            >
              {isToggled ? '▲ UNCAPPED UPSIDE' : 'LIMITED CAP'}
            </div>

            {/* Sticker Checkmark 2 */}
            {isToggled && (
              <div
                style={{
                  position: 'absolute',
                  top: -16,
                  right: -12,
                  transform: `scale(${checkmark2Spring}) rotate(14deg)`,
                  backgroundColor: '#23A094',
                  color: '#FFFFFF',
                  border: '3px solid #000000',
                  borderRadius: 999,
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                  fontWeight: 900,
                  boxShadow: '3px 3px 0px #000000'
                }}
              >
                ✓
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: STATEMENT BUTTON BANNER */}
        <div
          style={{
            backgroundColor: '#FF90E8',
            border: '4px solid #000000',
            borderRadius: 20,
            padding: '20px 24px',
            boxShadow: '6px 6px 0px #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12
          }}
        >
          <span style={{ fontSize: 26, fontWeight: 900, color: '#000000', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            "WE ARE BOTH BETTER OFF AS A RESULT"
          </span>
        </div>

        {/* UNLOCKED IMPACT BADGE STICKER (POPS ON TOGGLE) */}
        {isToggled && (
          <div
            style={{
              position: 'absolute',
              top: -28,
              right: 32,
              transform: `scale(${roiBadgeSpring}) rotate(10deg)`,
              backgroundColor: '#F1F333',
              border: '5px solid #000000',
              borderRadius: 20,
              padding: '12px 28px',
              boxShadow: '8px 8px 0px #000000',
              fontSize: 32,
              fontWeight: 900,
              color: '#000000',
              zIndex: 10
            }}
          >
            🔥 10X ROI ALIGNED!
          </div>
        )}

        {/* ANIMATED CURSOR HAND/POINTER */}
        <div
          style={{
            position: 'absolute',
            left: cursorX,
            top: cursorY,
            opacity: cursorOpacity,
            transform: `scale(${cursorClickScale})`,
            pointerEvents: 'none',
            zIndex: 30,
            filter: 'drop-shadow(4px 4px 0px #000000)'
          }}
        >
          <svg width="54" height="54" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 3L23 17H15L21 29L16 31L10 19L3 26V3Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M9 3L23 17H15L21 29L16 31L10 19L3 26V3Z" fill="#000000" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
}