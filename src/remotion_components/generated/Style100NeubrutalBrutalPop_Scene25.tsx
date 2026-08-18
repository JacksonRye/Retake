import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene25() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // BEAT 1 — Heavy sticker drop with one firm rebound.
  const heroDrop = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 235,
      mass: 0.82,
    },
  });

  const badgeDrop = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 12,
      stiffness: 250,
      mass: 0.6,
    },
  });

  const footerDrop = spring({
    frame: frame - 7,
    fps,
    config: {
      damping: 13,
      stiffness: 240,
      mass: 0.62,
    },
  });

  const entranceY = -430 * (1 - heroDrop);
  const entranceScale = interpolate(heroDrop, [0, 1], [0.78, 1]);
  const entranceRotation = -7 * (1 - heroDrop);

  const pinkShadowPop =
    frame < 5 ? 0 : frame < 12 ? 20 : frame < 20 ? 9 : 14;

  // BEAT 2 — Rapid discrete counter flip from 1 to 13.
  const counterProgress = interpolate(frame, [30, 65], [0, 12], clamp);
  const yearCount = Math.min(13, 1 + Math.floor(counterProgress));

  const flipLocal = frame >= 30 && frame <= 65 ? (frame - 30) % 3 : 0;
  const flipScaleY =
    frame >= 30 && frame <= 65
      ? flipLocal === 1
        ? 0.18
        : flipLocal === 2
          ? 0.72
          : 1
      : 1;

  const stampEntrance = spring({
    frame: frame - 62,
    fps,
    config: {
      damping: 8,
      stiffness: 340,
      mass: 0.42,
    },
  });

  const stampVisible = frame >= 62;
  const stampRotation = 2.5 - stampEntrance * 5;
  const stampScale = interpolate(stampEntrance, [0, 1], [2.2, 1]);
  const stampThunk = frame >= 65 && frame <= 68 ? 9 : 0;

  const shockAge = frame - 65;
  const shockVisible = shockAge >= 0 && shockAge <= 15;
  const shockScale = interpolate(shockAge, [0, 15], [0.82, 1.2], clamp);
  const shockOpacity = interpolate(shockAge, [0, 3, 15], [0, 1, 0], clamp);

  // Cursor arrives and physically clicks the stamp.
  const cursorVisible = frame >= 40 && frame <= 78;
  const cursorX = interpolate(frame, [40, 61], [190, 18], clamp);
  const cursorY = interpolate(frame, [40, 61], [115, 18], clamp);
  const cursorClick = frame >= 63 && frame <= 68;
  const cursorScale = cursorClick ? 0.78 : 1;

  // BEAT 3 — Crisp alternating steps plus continuous living physics.
  const beat3 = frame >= 84;
  const stepIndex = beat3 ? Math.floor((frame - 84) / 6) : 0;
  const steppedScale = beat3 ? (stepIndex % 2 === 0 ? 1.025 : 0.975) : 1;
  const shadowKickX = beat3 ? (stepIndex % 2 === 0 ? 18 : -12) : pinkShadowPop;
  const shadowKickY = beat3 ? (stepIndex % 2 === 0 ? 14 : 18) : pinkShadowPop;

  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.25;
  const shadowPulse = Math.sin(frame * 0.18) * 3;

  const shineCycle = ((frame - 84) % 34 + 34) % 34;
  const shineX = interpolate(shineCycle, [0, 34], [-250, 560], clamp);
  const shineOpacity = beat3 ? 0.86 : 0;

  // Sharp snap-out while the solid background remains full-screen.
  const snapOut = frame >= durationInFrames - 7;
  const contentOpacity =
    frame >= durationInFrames - 2
      ? 0
      : interpolate(frame, [0, 3], [0, 1], clamp);
  const exitX = snapOut ? 1100 : 0;
  const exitRotate = snapOut ? 8 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '80px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          opacity: contentOpacity,
          transform: `translateX(${exitX}px) rotate(${exitRotate}deg)`,
        }}
      >
        {/* TIER 1 — CATEGORY BUTTON */}
        <div
          style={{
            flexBasis: '15%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '11px 25px',
              border: '4px solid #000000',
              borderRadius: 13,
              backgroundColor: '#F1F333',
              boxShadow: '7px 7px 0 #000000',
              transform: `scale(${badgeDrop}) translateY(${
                Math.sin(frame * 0.12 + 0.7) * 3
              }px)`,
              whiteSpace: 'nowrap',
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#23A094',
                border: '3px solid #000000',
              }}
            />
            <div
              style={{
                fontSize: 19,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Anniversary Mode
            </div>
          </div>
        </div>

        {/* TIER 2 — ONE GIANT ANNIVERSARY BADGE */}
        <div
          style={{
            flexBasis: '65%',
            minHeight: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 'min(790px, 88%)',
              maxHeight: '100%',
              position: 'relative',
              transform: `
                translateY(${entranceY + hoverY + stampThunk}px)
                rotate(${entranceRotation + hoverTilt}deg)
                scale(${entranceScale * steppedScale})
              `,
              transformOrigin: 'center',
            }}
          >
            {shockVisible && (
              <div
                style={{
                  position: 'absolute',
                  inset: -20,
                  border: '10px solid #23A094',
                  borderRadius: 40,
                  opacity: shockOpacity,
                  transform: `scale(${shockScale})`,
                  pointerEvents: 'none',
                }}
              />
            )}

            <div
              style={{
                width: '100%',
                minHeight: 370,
                padding: '35px 34px 31px',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                backgroundColor: '#FF90E8',
                border: '7px solid #000000',
                borderRadius: 30,
                boxShadow: `${shadowKickX + shadowPulse}px ${
                  shadowKickY + shadowPulse
                }px 0 #000000`,
              }}
            >
              {/* Repeating yellow highlight sweep */}
              <div
                style={{
                  position: 'absolute',
                  top: -80,
                  bottom: -80,
                  left: 0,
                  width: 118,
                  backgroundColor: '#F1F333',
                  borderLeft: '5px solid #000000',
                  borderRight: '5px solid #000000',
                  opacity: shineOpacity,
                  transform: `translateX(${shineX}px) rotate(17deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  height: 180,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                  transform: `scaleY(${flipScaleY})`,
                  transformOrigin: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 190,
                    lineHeight: 0.82,
                    fontWeight: 1000,
                    letterSpacing: -12,
                    textAlign: 'center',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {yearCount}
                </div>
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '7px 26px 9px',
                  border: '4px solid #000000',
                  borderRadius: 11,
                  backgroundColor: '#FFF8E7',
                  boxShadow: '6px 6px 0 #000000',
                  fontSize: 34,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: 8,
                  textTransform: 'uppercase',
                }}
              >
                Years
              </div>

              {stampVisible && (
                <div
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    marginTop: 2,
                    padding: '9px 29px',
                    border: '5px solid #000000',
                    borderRadius: 10,
                    backgroundColor: '#23A094',
                    color: '#FFF8E7',
                    boxShadow: '7px 7px 0 #000000',
                    fontSize: 25,
                    lineHeight: 1,
                    fontWeight: 1000,
                    letterSpacing: 5,
                    textTransform: 'uppercase',
                    transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  Almost
                </div>
              )}
            </div>

            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: '17%',
                  bottom: '7%',
                  zIndex: 10,
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
                  filter: cursorClick
                    ? 'drop-shadow(2px 2px 0 #23A094)'
                    : 'drop-shadow(6px 6px 0 #000000)',
                }}
              >
                <svg
                  width="54"
                  height="62"
                  viewBox="0 0 54 62"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4L47 35L29 38L39 55L29 60L19 42L7 55Z"
                    fill="#FFF8E7"
                    stroke="#000000"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* TIER 3 — UNDERLINED CTA BUTTON */}
        <div
          style={{
            flexBasis: '20%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: '14px 31px',
              backgroundColor: '#000000',
              color: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 14,
              boxShadow: '7px 7px 0 #23A094',
              transform: `scale(${footerDrop}) translateY(${
                Math.sin(frame * 0.12 + 1.6) * 3
              }px)`,
            }}
          >
            <span
              style={{
                fontSize: 23,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationColor: '#FF90E8',
                textDecorationThickness: 4,
                textUnderlineOffset: 6,
                whiteSpace: 'nowrap',
              }}
            >
              Still Choosing Us
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}