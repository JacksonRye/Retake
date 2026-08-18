import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene41() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const palette = ['#FFF8E7', '#000000', '#FF90E8', '#F1F333', '#23A094'];

  // Beat 1 — brutal spring slam.
  const heroEntrance = spring({
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
      damping: 10,
      stiffness: 280,
      mass: 0.5,
    },
  });

  const footerEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 11,
      stiffness: 240,
      mass: 0.58,
    },
  });

  const slamX = interpolate(frame, [0, 8, 15], [-180, 18, 0], clamp);
  const slamRotation = interpolate(frame, [0, 9, 18], [-8, 2.5, 0], clamp);

  // Beat 2 — cursor arrives, physically clicks, and flips the state.
  const cursorVisible = frame >= 27 && frame <= 77;
  const cursorX = interpolate(frame, [27, 44], [190, 8], clamp);
  const cursorY = interpolate(frame, [27, 44], [145, 4], clamp);
  const cursorOpacity = interpolate(frame, [27, 31, 68, 77], [0, 1, 1, 0], clamp);

  const clickStart = 47;
  const switchFrame = 52;
  const isClicking = frame >= clickStart && frame <= 54;
  const isOff = frame >= switchFrame;

  const clickThunk = isClicking ? 9 : 0;
  const clickScale = isClicking ? 0.975 : 1;
  const cursorScale = isClicking ? 0.82 : 1;

  const toggleTravel = isOff ? 52 : 0;
  const toggleRotation = isOff ? 180 : 0;

  // Beat 3 — continuous living physics.
  const isLivingBeat = frame >= 84;
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.25;

  // Deliberately quantized for hard, confident pulses.
  const hardPulse =
    isLivingBeat && frame % 18 < 3
      ? 1.026
      : isLivingBeat && frame % 18 < 6
        ? 0.994
        : 1;

  const shadowStep = isLivingBeat
    ? Math.floor(((frame - 84) % 30) / 5) * 4
    : 0;

  const shadowPulse = Math.round(12 + Math.sin(frame * 0.18) * 3);
  const shadowX = 13 + shadowStep;
  const shadowY = shadowPulse;

  const shineX = interpolate((frame + 14) % 62, [0, 62], [-180, 940], clamp);
  const underlineMarch = isLivingBeat
    ? Math.floor(((frame - 84) % 24) / 4) * 5
    : 0;

  const underlineWidth = isOff
    ? interpolate(frame, [switchFrame, 66], [0, 100], clamp)
    : 0;

  const exitX = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, 110],
    clamp,
  );

  const exitRotation = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, 3],
    clamp,
  );

  const sceneOpacity = interpolate(
    frame,
    [0, 4, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  const jaggedShape =
    'polygon(0% 8%, 4% 8%, 5% 0%, 12% 5%, 18% 1%, 23% 7%, 30% 2%, 36% 7%, 43% 1%, 49% 6%, 56% 1%, 62% 7%, 69% 2%, 76% 7%, 83% 1%, 89% 6%, 96% 2%, 100% 10%, 97% 17%, 100% 25%, 97% 33%, 100% 41%, 97% 49%, 100% 58%, 97% 66%, 100% 75%, 97% 83%, 100% 92%, 95% 100%, 88% 96%, 82% 100%, 75% 95%, 68% 100%, 61% 95%, 54% 100%, 47% 95%, 40% 100%, 33% 95%, 26% 100%, 19% 95%, 12% 100%, 6% 95%, 0% 91%, 3% 82%, 0% 74%, 3% 66%, 0% 58%, 3% 49%, 0% 41%, 3% 33%, 0% 25%, 3% 17%)';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        opacity: sceneOpacity,
        overflow: 'hidden',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        color: palette[1],
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
          transform: `translateX(${exitX}px) rotate(${exitRotation}deg)`,
        }}
      >
        {/* Tier 1 — category pill */}
        <div
          style={{
            width: '100%',
            flex: '0 0 15%',
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
              padding: '11px 24px',
              border: `4px solid ${palette[1]}`,
              borderRadius: 999,
              backgroundColor: palette[3],
              boxShadow: `6px 6px 0 ${palette[1]}`,
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.1) * 3
              }px)`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: palette[4],
                border: `3px solid ${palette[1]}`,
              }}
            />
            <span
              style={{
                fontSize: 19,
                fontWeight: 950,
                letterSpacing: 3,
                lineHeight: 1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Activation Code
            </span>
          </div>
        </div>

        {/* Tier 2 — exactly one hero filter card */}
        <div
          style={{
            width: '100%',
            maxWidth: 860,
            flex: '0 0 65%',
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
              transform: `
                translateX(${slamX}px)
                translateY(${hoverY + clickThunk}px)
                rotate(${slamRotation + hoverTilt}deg)
                scale(${heroEntrance * hardPulse * clickScale})
              `,
              transformOrigin: 'center',
            }}
          >
            {/* Living black shadow: jagged while ON, straight and stepping while OFF */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: palette[1],
                borderRadius: isOff ? 24 : 0,
                clipPath: isOff ? 'none' : jaggedShape,
                transform: `translate(${isOff ? shadowX : 15}px, ${
                  isOff ? shadowY : 16
                }px)`,
              }}
            />

            <div
              style={{
                minHeight: 300,
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                padding: '46px 38px',
                backgroundColor: palette[2],
                border: `7px solid ${palette[1]}`,
                borderRadius: isOff ? 24 : 0,
                clipPath: isOff ? 'none' : jaggedShape,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 22,
              }}
            >
              {/* Continuous traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 92,
                  backgroundColor: 'rgba(255, 248, 231, 0.38)',
                  transform: `translateX(${shineX}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                  width: '100%',
                }}
              >
                <div
                  style={{
                    fontSize: isOff ? 64 : 52,
                    lineHeight: 1.02,
                    fontWeight: 950,
                    letterSpacing: isOff ? -1 : 0,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    maxWidth: 720,
                  }}
                >
                  {isOff ? 'WALK FORWARD' : 'TAKE IT PERSONALLY'}
                </div>

                {/* Teal marching underline */}
                <div
                  style={{
                    width: isOff ? '72%' : '45%',
                    height: 12,
                    border: `3px solid ${palette[1]}`,
                    backgroundColor: isOff ? palette[4] : palette[3],
                    overflow: 'hidden',
                    transform: `translateX(${underlineMarch}px)`,
                  }}
                >
                  <div
                    style={{
                      width: `${underlineWidth}%`,
                      height: '100%',
                      backgroundColor: palette[4],
                    }}
                  />
                </div>

                {/* Main filter switch */}
                <div
                  style={{
                    marginTop: 2,
                    minWidth: 244,
                    padding: '10px 13px 10px 18px',
                    boxSizing: 'border-box',
                    border: `5px solid ${palette[1]}`,
                    borderRadius: 999,
                    backgroundColor: isOff ? palette[0] : palette[3],
                    boxShadow: isClicking
                      ? `2px 2px 0 ${palette[1]}`
                      : `6px 6px 0 ${palette[1]}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    transform: `translateY(${isClicking ? 5 : 0}px)`,
                  }}
                >
                  <span
                    style={{
                      minWidth: 72,
                      fontSize: 25,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: 3,
                      textAlign: 'center',
                      textDecoration: 'underline',
                      textDecorationThickness: 4,
                      textUnderlineOffset: 5,
                    }}
                  >
                    {isOff ? 'OFF' : 'ON'}
                  </span>

                  <div
                    style={{
                      width: 112,
                      height: 54,
                      padding: 5,
                      boxSizing: 'border-box',
                      border: `4px solid ${palette[1]}`,
                      borderRadius: 999,
                      backgroundColor: isOff ? palette[4] : palette[1],
                      display: 'flex',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        border: `4px solid ${palette[1]}`,
                        boxSizing: 'border-box',
                        backgroundColor: isOff ? palette[0] : palette[2],
                        transform: `translateX(${toggleTravel}px) rotate(${toggleRotation}deg)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cursor only exists to perform the hero interaction */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: '18%',
                  bottom: '8%',
                  zIndex: 20,
                  opacity: cursorOpacity,
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
                  transformOrigin: 'top left',
                  filter: isClicking
                    ? 'drop-shadow(2px 3px 0 #23A094)'
                    : 'drop-shadow(5px 7px 0 #23A094)',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 24 24"
                  fill={palette[1]}
                  stroke={palette[0]}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                >
                  <path d="M4 3.5L11.3 21l2.45-7.1L21 11.1 4 3.5z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3 — punchline */}
        <div
          style={{
            width: '100%',
            flex: '0 0 20%',
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
              padding: '15px 30px',
              backgroundColor: palette[1],
              color: palette[0],
              border: `4px solid ${palette[1]}`,
              borderRadius: 16,
              boxShadow: `${6 + Math.sin(frame * 0.18) * 2}px ${
                6 + Math.sin(frame * 0.18) * 2
              }px 0 ${palette[4]}`,
              transform: `scale(${footerEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px)`,
            }}
          >
            <span
              style={{
                fontSize: 23,
                lineHeight: 1.1,
                fontWeight: 950,
                letterSpacing: 2,
                textAlign: 'center',
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationColor: palette[2],
                textDecorationThickness: 4,
                textUnderlineOffset: 6,
              }}
            >
              Offense Off. Momentum On.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}