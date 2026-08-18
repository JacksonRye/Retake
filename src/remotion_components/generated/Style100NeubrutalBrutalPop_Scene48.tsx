import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene48() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — sticker slap
  const heroEntrance = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 260,
      mass: 0.55,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.5,
    },
  });

  const slapRotation = interpolate(heroEntrance, [0, 1], [-24, -5], clamp);
  const slapImpact = frame >= 8 && frame <= 13;
  const impactScale = slapImpact ? 1.055 : 1;
  const impactShadow = slapImpact ? 22 : 12;

  // Beat 2 — cursor click and peel
  const peel = interpolate(frame, [37, 76], [0, 1], clamp);
  const cursorVisible = frame >= 27 && frame <= 84;
  const cursorArrival = interpolate(frame, [27, 38], [0, 1], clamp);
  const cursorClicking = frame >= 38 && frame <= 43;
  const clickThunk = cursorClicking ? 10 : 0;

  const stickerWidth = 100 - peel * 82;
  const stickerCrumple = interpolate(peel, [0, 0.75, 1], [1, 0.92, 0.72], clamp);
  const accusationOpacity = interpolate(peel, [0.38, 0.67], [1, 0], clamp);

  // Beat 3 — continuous living mechanics
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.25;
  const shadowPulse = impactShadow + Math.sin(frame * 0.18) * 3;

  const rigidBeat =
    frame >= 84 ? (Math.floor((frame - 84) / 5) % 2 === 0 ? 1 : 1.035) : 1;

  const flapBeat =
    frame >= 84 ? (Math.floor((frame - 84) / 4) % 2 === 0 ? -9 : 8) : -peel * 8;

  const shineOffset = interpolate(
    (Math.max(0, frame - 84) * 1.7) % 58,
    [0, 58],
    [-180, 780],
    clamp,
  );

  const exitY = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -60],
    clamp,
  );

  const opacity = interpolate(
    frame,
    [0, 4, durationInFrames - 7, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        opacity,
        overflow: 'hidden',
        fontFamily: '"Arial Black", "Arial", sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '80px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'center',
          transform: `translateY(${exitY}px)`,
        }}
      >
        <div
          style={{
            width: '88%',
            maxWidth: 900,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Tier 1 — category */}
          <div
            style={{
              flex: '15 1 0',
              width: '100%',
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
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
                borderRadius: 12,
                backgroundColor: '#FF90E8',
                boxShadow: '6px 6px 0 #000000',
                transform: `scale(${badgeEntrance}) translateY(${
                  Math.sin(frame * 0.1) * 3
                }px)`,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                }}
              />
              <span
                style={{
                  color: '#000000',
                  fontSize: 20,
                  fontWeight: 950,
                  letterSpacing: 3,
                  lineHeight: 1,
                  textDecoration: 'underline',
                  textDecorationThickness: 3,
                  textUnderlineOffset: 5,
                  whiteSpace: 'nowrap',
                }}
              >
                STATUS UPDATE
              </span>
            </div>
          </div>

          {/* Tier 2 — single peeling hero */}
          <div
            style={{
              flex: '65 1 0',
              width: '100%',
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                position: 'relative',
                transform: `translateY(${hoverY + clickThunk}px) rotate(${
                  slapRotation + hoverTilt
                }deg) scale(${heroEntrance * impactScale})`,
                transformOrigin: 'center',
              }}
            >
              {/* Teal reveal surface */}
              <div
                style={{
                  width: '100%',
                  height: 260,
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '34px 28px',
                  border: '7px solid #000000',
                  borderRadius: 18,
                  backgroundColor: '#23A094',
                  boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #FF90E8`,
                }}
              >
                <div
                  style={{
                    color: '#000000',
                    fontSize: 82,
                    fontWeight: 950,
                    lineHeight: 0.95,
                    letterSpacing: -2,
                    textAlign: 'center',
                    textDecoration: 'underline',
                    textDecorationThickness: 8,
                    textUnderlineOffset: 12,
                    transform: `scale(${rigidBeat})`,
                  }}
                >
                  EVOLVING
                </div>

                {/* Yellow mechanical highlight sweeps */}
                {frame >= 84 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -40,
                      bottom: -40,
                      left: 0,
                      width: 95,
                      backgroundColor: '#F1F333',
                      borderLeft: '5px solid #000000',
                      borderRight: '5px solid #000000',
                      transform: `translateX(${shineOffset}px) skewX(-18deg)`,
                      pointerEvents: 'none',
                    }}
                  />
                )}

                {/* Original accusation sticker peeling into a corner tab */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    width: `${stickerWidth}%`,
                    minWidth: 88,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#000000',
                    borderLeft: peel > 0 ? '7px solid #FF90E8' : 'none',
                    transform: `scaleY(${stickerCrumple}) rotate(${flapBeat}deg)`,
                    transformOrigin: 'top right',
                  }}
                >
                  <div
                    style={{
                      color: '#FFF8E7',
                      fontSize: 84,
                      fontWeight: 950,
                      lineHeight: 0.9,
                      letterSpacing: 1,
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                      textDecoration: 'underline',
                      textDecorationColor: '#FF90E8',
                      textDecorationThickness: 9,
                      textUnderlineOffset: 13,
                      opacity: accusationOpacity,
                    }}
                  >
                    SOLD OUT
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      left: -1,
                      top: '50%',
                      width: 30,
                      height: 76,
                      backgroundColor: '#F1F333',
                      border: '5px solid #000000',
                      transform: `translate(-45%, -50%) rotate(${
                        frame >= 84
                          ? Math.floor(frame / 4) % 2 === 0
                            ? -12
                            : 10
                          : -peel * 10
                      }deg)`,
                    }}
                  />
                </div>
              </div>

              {/* Huge cursor physically performing the peel */}
              {cursorVisible && (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 20,
                    left: `${interpolate(
                      peel,
                      [0, 1],
                      [8 + cursorArrival * 4, 80],
                      clamp,
                    )}%`,
                    top: `${interpolate(
                      cursorArrival,
                      [0, 1],
                      [82, 55],
                      clamp,
                    )}%`,
                    filter: cursorClicking
                      ? 'drop-shadow(2px 3px 0 #FF90E8)'
                      : 'drop-shadow(8px 9px 0 #FF90E8)',
                    transform: `translate(-20%, -20%) scale(${
                      cursorClicking ? 0.82 : 1
                    }) rotate(-12deg)`,
                    transformOrigin: 'top left',
                    pointerEvents: 'none',
                  }}
                >
                  <svg
                    width="92"
                    height="112"
                    viewBox="0 0 72 88"
                    fill="none"
                  >
                    <path
                      d="M8 5L63 47L40 51L52 76L34 84L23 57L8 73V5Z"
                      fill="#FFF8E7"
                      stroke="#000000"
                      strokeWidth="6"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Tier 3 — punchline */}
          <div
            style={{
              flex: '20 1 0',
              width: '100%',
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                padding: '15px 30px',
                border: '4px solid #000000',
                borderRadius: 12,
                backgroundColor: '#F1F333',
                boxShadow: `${
                  6 + Math.sin(frame * 0.18 + 1) * 2
                }px ${6 + Math.sin(frame * 0.18 + 1) * 2}px 0 #000000`,
                transform: `translateY(${
                  Math.sin(frame * 0.12 + 1) * 3
                }px) scale(${frame >= 84 ? rigidBeat : heroEntrance})`,
              }}
            >
              <span
                style={{
                  color: '#000000',
                  fontSize: 25,
                  fontWeight: 950,
                  letterSpacing: 2,
                  lineHeight: 1,
                  textAlign: 'center',
                  textDecoration: 'underline',
                  textDecorationThickness: 4,
                  textUnderlineOffset: 6,
                }}
              >
                CHANGE IS GROWTH
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}