import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene47() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — weighted slider slams into view.
  const heroEntrance = spring({
    frame,
    fps,
    config: {damping: 10, stiffness: 260, mass: 0.62},
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {damping: 11, stiffness: 280, mass: 0.5},
  });

  const entranceDrop = interpolate(frame, [0, 8], [-220, 0], clamp);
  const initialTilt = interpolate(frame, [0, 24], [-8, -4.5], clamp);

  // Beat 2 — cursor drags attention from left to right.
  const dragProgress = interpolate(frame, [31, 64], [0, 1], clamp);
  const sliderPercent = interpolate(dragProgress, [0, 1], [19, 81], clamp);
  const cursorVisible = frame >= 24 && frame <= 75;
  const cursorPercent = interpolate(frame, [24, 34, 64], [8, 19, 81], clamp);
  const cursorDrop = interpolate(frame, [24, 34], [110, 10], clamp);

  const grabbing = frame >= 34 && frame < 64;
  const lockImpact = frame >= 64 && frame <= 69;
  const isBalanced = frame >= 64;

  const clickThunk = grabbing
    ? frame % 6 < 3
      ? 3
      : 0
    : lockImpact
      ? 8
      : 0;

  const levelingTilt = interpolate(frame, [31, 64], [initialTilt, 0], clamp);

  // Beat 3 — hard corrective ticks plus continuous living motion.
  const correctionSequence = [0, 5, -4, 3, -2, 2, -1, 1];
  const correctionIndex =
    frame >= 84 ? Math.floor((frame - 84) / 4) % correctionSequence.length : 0;
  const correctiveTick = frame >= 84 ? correctionSequence[correctionIndex] : 0;

  const hoverY = frame >= 84 ? Math.sin(frame * 0.12) * 6 : 0;
  const livingTilt = frame >= 84 ? Math.sin(frame * 0.08) * 0.75 : 0;
  const underlineShift = frame >= 84 ? Math.sin(frame * 0.22) * 10 : 0;
  const shadowPulse = frame >= 84 ? Math.sin(frame * 0.18) * 3 : 0;

  const shadowX = isBalanced ? 10 + shadowPulse : 18;
  const shadowY = isBalanced ? 10 + shadowPulse : 22;
  const shineOffset = interpolate((frame + 18) % 62, [0, 62], [-190, 980], clamp);

  const impactScale = lockImpact
    ? frame < 67
      ? 1.045
      : 0.985
    : 1;

  const cardTilt = isBalanced ? livingTilt : levelingTilt;
  const knobScale = grabbing ? 0.88 : lockImpact ? 1.18 : 1;
  const knobRotation = grabbing ? -8 : correctiveTick * 0.8;

  const contentOpacity = interpolate(
    frame,
    [0, 4, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  const exitX = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, 120],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
        fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
        padding: '80px 20px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          opacity: contentOpacity,
          transform: `translateX(${exitX}px)`,
        }}
      >
        {/* Tier 1 — category badge */}
        <div
          style={{
            flexBasis: '15%',
            width: '100%',
            minHeight: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 24px',
              backgroundColor: '#000000',
              color: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 12,
              boxShadow: '6px 6px 0 #FF90E8',
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12 + 0.8) * 3
              }px)`,
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                flex: '0 0 auto',
                borderRadius: 999,
                backgroundColor: isBalanced ? '#F1F333' : '#FF90E8',
              }}
            />
            <span
              style={{
                fontSize: 19,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3,
                whiteSpace: 'nowrap',
              }}
            >
              ATTENTION ALLOCATION
            </span>
          </div>
        </div>

        {/* Tier 2 — the single hero slider */}
        <div
          style={{
            flexBasis: '65%',
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
              transform: `
                translateY(${entranceDrop + hoverY + clickThunk}px)
                scale(${heroEntrance * impactScale})
                rotate(${cardTilt}deg)
              `,
              transformOrigin: '50% 50%',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: 330,
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 28,
                padding: '42px 46px 48px',
                borderRadius: 22,
                backgroundColor: isBalanced ? '#F1F333' : '#FF90E8',
                border: lockImpact
                  ? '8px solid #23A094'
                  : '6px solid #000000',
                boxShadow: isBalanced
                  ? `${shadowX}px ${shadowY}px 0 #000000`
                  : `22px 28px 0 #23A094, 31px 17px 0 #000000`,
              }}
            >
              {/* Traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 100,
                  backgroundColor: 'rgba(255,255,255,0.42)',
                  transform: `translateX(${shineOffset}px) skewX(-24deg)`,
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
                }}
              >
                <div
                  style={{
                    fontSize: 27,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  ATTENTION
                </div>

                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 94,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: 10,
                      right: 10,
                      height: 22,
                      border: '5px solid #000000',
                      borderRadius: 999,
                      backgroundColor: '#FFF8E7',
                      boxShadow: '0 7px 0 #000000',
                    }}
                  >
                    <div
                      style={{
                        width: `${sliderPercent}%`,
                        height: '100%',
                        backgroundColor: isBalanced ? '#23A094' : '#000000',
                        borderRadius: 999,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      left: `calc(${sliderPercent}% - 35px)`,
                      width: 70,
                      height: 70,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 16,
                      backgroundColor: isBalanced ? '#23A094' : '#F1F333',
                      border: '5px solid #000000',
                      boxShadow: lockImpact
                        ? '2px 2px 0 #000000'
                        : '7px 7px 0 #000000',
                      transform: `translateX(${correctiveTick}px) scale(${knobScale}) rotate(${knobRotation}deg)`,
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 30,
                        borderLeft: '5px solid #000000',
                        borderRight: '5px solid #000000',
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      width: '43%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      gap: 10,
                      fontSize: 21,
                      lineHeight: 1.05,
                      fontWeight: 950,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>DIDN&apos;T LIKE ME</span>
                    <span
                      style={{
                        width: '100%',
                        height: 6,
                        backgroundColor: '#000000',
                        transformOrigin: 'left center',
                        transform: `scaleX(${1 - dragProgress * 0.62})`,
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: '43%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 10,
                      fontSize: 21,
                      lineHeight: 1.05,
                      fontWeight: 950,
                      letterSpacing: 1,
                      textAlign: 'right',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>PEOPLE I HELPED</span>
                    <span
                      style={{
                        width: '100%',
                        height: 6,
                        backgroundColor: '#000000',
                        transform: `translateX(${underlineShift}px)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Drag cursor */}
            {cursorVisible ? (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  left: `calc(${cursorPercent}% - 8px)`,
                  top: '46%',
                  filter: 'drop-shadow(5px 6px 0 #23A094)',
                  transform: `translateY(${cursorDrop}px) scale(${
                    grabbing ? 0.88 : lockImpact ? 0.78 : 1
                  })`,
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="58"
                  height="68"
                  viewBox="0 0 58 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4L49 37L31 40L40 59L28 64L19 45L6 57L8 4Z"
                    fill="#FFF8E7"
                    stroke="#000000"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            ) : null}
          </div>
        </div>

        {/* Tier 3 — punchline */}
        <div
          style={{
            flexBasis: '20%',
            width: '100%',
            minHeight: 0,
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
              padding: '14px 30px',
              border: '4px solid #000000',
              borderRadius: 14,
              backgroundColor: isBalanced ? '#23A094' : '#FFF8E7',
              color: '#000000',
              boxShadow: `${6 + Math.sin(frame * 0.18) * 2}px ${
                6 + Math.sin(frame * 0.18) * 2
              }px 0 #000000`,
              transform: `scale(${heroEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1.2) * 3
              }px)`,
            }}
          >
            <span
              style={{
                fontSize: 22,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 2,
                textAlign: 'center',
                textDecoration: 'underline',
                textDecorationThickness: 4,
                textUnderlineOffset: 7,
                textTransform: 'uppercase',
              }}
            >
              SPEND IT WHERE IT HELPS
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}