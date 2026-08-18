import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene17() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — Drop, rebound, and shadow slap.
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 9,
      stiffness: 260,
      mass: 0.62,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 11,
      stiffness: 280,
      mass: 0.5,
    },
  });

  const footerEntrance = spring({
    frame: frame - 7,
    fps,
    config: {
      damping: 12,
      stiffness: 250,
      mass: 0.55,
    },
  });

  const dropY = (1 - entrance) * -620;
  const entranceScale = 0.82 + entrance * 0.18;

  const slapOffset =
    frame < 10 ? 2 : frame < 16 ? 18 : frame < 22 ? 6 : 12;

  // Beat 2 — Notification opens, cursor clicks, state transforms.
  const openingRaw = interpolate(frame, [30, 43], [0, 1], clamp);
  const openingSteps = Math.floor(openingRaw * 4) / 4;

  const clickFrame = 58;
  const isOpen = frame >= 36 && frame < 128;
  const isFollowing = frame >= clickFrame;
  const isClicking = frame >= clickFrame - 2 && frame <= clickFrame + 3;

  const cursorVisible = frame >= 39 && frame <= 74;
  const cursorX = interpolate(frame, [39, 53], [210, 14], clamp);
  const cursorY = interpolate(frame, [39, 53], [150, 12], clamp);

  const clickThunk = isClicking ? 9 : 0;
  const openHeight = 194 + openingSteps * 230;

  // Beat 3 — Continuous living physics.
  const isLivingBeat = frame >= 84;
  const hoverY = Math.sin(frame * 0.12) * 6;
  const rock = isLivingBeat
    ? Math.sin(frame * 0.08) * 1.7
    : Math.sin(frame * 0.08) * 0.35;

  const squarePulsePhase = Math.floor(frame / 6) % 2;
  const followPulse = isLivingBeat
    ? squarePulsePhase === 0
      ? 1
      : 1.045
    : 1;

  const shadowPulse = isLivingBeat
    ? 11 + Math.round(Math.sin(frame * 0.18) * 3)
    : slapOffset;

  const shineOffset = interpolate(
    (frame + 14) % 62,
    [0, 62],
    [-180, 940],
    clamp,
  );

  const underlineStep = isLivingBeat
    ? (Math.floor((frame - 84) / 4) % 5) / 4
    : isFollowing
      ? 1
      : 0;

  // Final hard snap shut.
  const isSnappingShut = frame >= 128;
  const displayedHeight = isSnappingShut ? 194 : openHeight;
  const contentVisible = isOpen && openingSteps >= 0.5;

  const exitY = interpolate(
    frame,
    [durationInFrames - 5, durationInFrames],
    [0, -42],
    clamp,
  );

  const opacity = interpolate(
    frame,
    [0, 3, durationInFrames - 4, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  const cardBackground = isFollowing ? '#23A094' : '#F1F333';
  const buttonBackground = isFollowing ? '#000000' : '#FF90E8';
  const buttonColor = isFollowing ? '#FFF8E7' : '#000000';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
        opacity,
        padding: '80px 20px',
        boxSizing: 'border-box',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          transform: `translateY(${exitY}px)`,
        }}
      >
        {/* Tier 1 — Category badge */}
        <div
          style={{
            flexBasis: '15%',
            width: '100%',
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
              boxShadow: '7px 7px 0 #000000',
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12 + 0.8) * 3
              }px)`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                backgroundColor: '#F1F333',
                border: '3px solid #000000',
              }}
            />
            <div
              style={{
                fontSize: 20,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Life Update
            </div>
          </div>
        </div>

        {/* Tier 2 — One giant notification hero */}
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
              width: '82%',
              maxWidth: 790,
              height: displayedHeight,
              position: 'relative',
              transform: `
                translateY(${dropY + hoverY + clickThunk}px)
                rotate(${rock}deg)
                scale(${entranceScale})
              `,
              transformOrigin: 'center center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '6px solid #000000',
                borderRadius: 22,
                backgroundColor: cardBackground,
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              {/* Traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 82,
                  zIndex: 1,
                  backgroundColor: 'rgba(255,255,255,0.34)',
                  transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  width: '100%',
                  height: '100%',
                  padding: '28px 34px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  justifyContent: contentVisible
                    ? 'space-between'
                    : 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '4px solid #000000',
                        borderRadius: 8,
                        backgroundColor: '#FFF8E7',
                        boxShadow: '4px 4px 0 #000000',
                        fontSize: 28,
                        fontWeight: 950,
                      }}
                    >
                      !
                    </div>

                    <div
                      style={{
                        fontSize: 31,
                        lineHeight: 1,
                        fontWeight: 950,
                        letterSpacing: 1.5,
                        textTransform: 'uppercase',
                      }}
                    >
                      Life Update
                    </div>
                  </div>

                  <div
                    style={{
                      flexShrink: 0,
                      padding: '7px 12px',
                      border: '3px solid #000000',
                      borderRadius: 8,
                      backgroundColor: '#FFF8E7',
                      fontSize: 15,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: 2,
                      textTransform: 'uppercase',
                    }}
                  >
                    Now
                  </div>
                </div>

                {contentVisible && !isSnappingShut && (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 16,
                        opacity: openingSteps,
                        transform: `translateY(${(1 - openingSteps) * -12}px)`,
                      }}
                    >
                      <div
                        style={{
                          maxWidth: 650,
                          fontSize: 49,
                          lineHeight: 0.98,
                          fontWeight: 950,
                          letterSpacing: -1.5,
                          textAlign: 'center',
                          textTransform: 'uppercase',
                        }}
                      >
                        New Journey
                        <br />
                        With God
                      </div>

                      <div
                        style={{
                          width: 250,
                          height: 7,
                          overflow: 'hidden',
                          border: '3px solid #000000',
                          backgroundColor: '#FFF8E7',
                        }}
                      >
                        <div
                          style={{
                            width: `${Math.max(18, underlineStep * 100)}%`,
                            height: '100%',
                            backgroundColor: isFollowing
                              ? '#FF90E8'
                              : '#000000',
                          }}
                        />
                      </div>
                    </div>

                    <div
                      style={{
                        alignSelf: 'center',
                        position: 'relative',
                        transform: `scale(${followPulse})`,
                      }}
                    >
                      <div
                        style={{
                          minWidth: 330,
                          padding: '15px 28px 13px',
                          boxSizing: 'border-box',
                          border: '4px solid #000000',
                          borderRadius: 10,
                          backgroundColor: buttonBackground,
                          color: buttonColor,
                          boxShadow: isClicking
                            ? '2px 2px 0 #000000'
                            : '7px 7px 0 #000000',
                          transform: `translate(${
                            isClicking ? 5 : 0
                          }px, ${isClicking ? 5 : 0}px)`,
                          textAlign: 'center',
                          fontSize: 23,
                          lineHeight: 1,
                          fontWeight: 950,
                          letterSpacing: 2,
                          textDecoration: 'underline',
                          textDecorationThickness: 3,
                          textUnderlineOffset: 5,
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {isFollowing ? 'Following Update' : 'Follow Update'}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Oversized click cursor */}
            {cursorVisible && !isSnappingShut && (
              <div
                style={{
                  position: 'absolute',
                  right: 74,
                  bottom: 44,
                  zIndex: 20,
                  filter: 'drop-shadow(6px 7px 0 #FF90E8)',
                  transform: `
                    translate(${cursorX}px, ${cursorY}px)
                    scale(${isClicking ? 0.82 : 1})
                  `,
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="78"
                  height="92"
                  viewBox="0 0 78 92"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 5L68 51L42 56L55 82L38 89L25 62L7 79V5Z"
                    fill="#FFF8E7"
                    stroke="#000000"
                    strokeWidth="7"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3 — Punchline */}
        <div
          style={{
            flexBasis: '20%',
            width: '100%',
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
              padding: '14px 28px',
              border: '4px solid #000000',
              borderRadius: 12,
              backgroundColor: '#000000',
              boxShadow: '7px 7px 0 #23A094',
              color: '#FFF8E7',
              transform: `scale(${footerEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1.4) * 3
              }px)`,
              fontSize: 22,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: 2,
              textAlign: 'center',
              textDecoration: 'underline',
              textDecorationColor: '#FF90E8',
              textDecorationThickness: 4,
              textUnderlineOffset: 6,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            A New Chapter Is Live
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}