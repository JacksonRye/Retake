import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene9() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames, width: canvasWidth} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const palette = ['#FFF8E7', '#000000', '#FF90E8', '#F1F333', '#23A094'];

  // Beat 1: compressed slab shoots in with a spring overshoot.
  const heroEntrance = spring({
    frame,
    fps,
    config: {
      damping: 11,
      stiffness: 260,
      mass: 0.55,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 12,
      stiffness: 250,
      mass: 0.5,
    },
  });

  const footerEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 13,
      stiffness: 230,
      mass: 0.55,
    },
  });

  const shootY = interpolate(frame, [0, 7], [280, 0], clamp);

  // Beat 2: hard, stepped width expansion from opposing edges.
  const finalHeroWidth = Math.min(canvasWidth * 0.78, 840);
  const narrowWidth = Math.min(116, finalHeroWidth * 0.22);

  let widthProgress = 0;
  if (frame >= 30 && frame < 37) widthProgress = 0.24;
  if (frame >= 37 && frame < 44) widthProgress = 0.43;
  if (frame >= 44 && frame < 51) widthProgress = 0.62;
  if (frame >= 51 && frame < 58) widthProgress = 0.82;
  if (frame >= 58) widthProgress = 1;

  // Beat 3: edges continue making hard expansion pulses.
  const beat3 = frame >= 84;
  const edgePulse =
    beat3 && Math.floor((frame - 84) / 6) % 2 === 0 ? 12 : 0;

  const heroWidth =
    narrowWidth + (finalHeroWidth - narrowWidth) * widthProgress + edgePulse;

  const cursorVisible = frame >= 24 && frame <= 66;
  const cursorX = interpolate(frame, [24, 34], [190, 48], clamp);
  const cursorY = interpolate(frame, [24, 34], [125, 28], clamp);
  const isClicking =
    (frame >= 34 && frame <= 38) ||
    (frame >= 44 && frame <= 47) ||
    (frame >= 54 && frame <= 57);

  const clickThunk = isClicking ? 8 : 0;

  const stickerSlap = spring({
    frame: frame - 59,
    fps,
    config: {
      damping: 7,
      stiffness: 320,
      mass: 0.42,
    },
  });

  const stickerRotation = interpolate(
    stickerSlap,
    [0, 0.7, 1],
    [-24, 8, -5],
    clamp,
  );

  // Continuous living physics.
  const hoverY = beat3 ? Math.sin(frame * 0.12) * 6 : 0;
  const hoverTilt = beat3 ? Math.sin(frame * 0.08) * 1.35 : 0;
  const shadowToggle =
    beat3 && Math.floor((frame - 84) / 5) % 2 === 0 ? 15 : 8;
  const shadowPulse = shadowToggle + (beat3 ? Math.sin(frame * 0.18) * 2 : 0);

  const shineCycle = (frame - 84 + 90) % 54;
  const shineOffset = interpolate(
    shineCycle,
    [0, 54],
    [-180, finalHeroWidth + 180],
    clamp,
  );

  const underlineCycle = (frame - 84 + 48) % 30;
  const underlineWidth = beat3
    ? interpolate(underlineCycle, [0, 22, 30], [0, 100, 100], clamp)
    : 100;

  const headlineVisible = frame >= 51;
  const isExpanded = frame >= 58;

  const exitSlide = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -90],
    clamp,
  );

  const exitScale = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [1, 0.94],
    clamp,
  );

  const opacity = interpolate(
    frame,
    [0, 4, durationInFrames - 7, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  const responsiveHeadlineSize = Math.min(70, canvasWidth * 0.064);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        color: palette[1],
        padding: '80px 20px',
        boxSizing: 'border-box',
        opacity,
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 920,
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          transform: `translateY(${exitSlide}px) scale(${exitScale})`,
        }}
      >
        {/* Tier 1: category badge */}
        <div
          style={{
            flex: '15 1 0',
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
              justifyContent: 'center',
              gap: 16,
              padding: '11px 24px',
              border: `4px solid ${palette[1]}`,
              borderRadius: 12,
              backgroundColor: palette[2],
              boxShadow: `6px 6px 0 ${palette[1]}`,
              transform: `scale(${badgeEntrance}) translateY(${
                beat3 ? Math.sin(frame * 0.12 + 1) * 3 : 0
              }px)`,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: palette[1],
              }}
            />
            <span
              style={{
                fontSize: 19,
                fontWeight: 950,
                lineHeight: 1,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
              }}
            >
              Coaching Mission
            </span>
          </div>
        </div>

        {/* Tier 2: one expanding hero element */}
        <div
          style={{
            flex: '65 1 0',
            width: '100%',
            minHeight: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: heroWidth,
              height: 310,
              flexShrink: 0,
              transform: `
                translateY(${shootY + hoverY + clickThunk}px)
                rotate(${hoverTilt}deg)
                scale(${heroEntrance})
              `,
              transformOrigin: 'center center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                boxSizing: 'border-box',
                padding: '36px 26px',
                border: `6px solid ${palette[1]}`,
                borderRadius: 22,
                backgroundColor: isExpanded ? palette[4] : palette[3],
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 ${palette[1]}`,
              }}
            >
              {/* Traveling shine */}
              {beat3 && (
                <div
                  style={{
                    position: 'absolute',
                    top: -40,
                    bottom: -40,
                    left: 0,
                    width: 86,
                    zIndex: 1,
                    opacity: 0.42,
                    backgroundColor: palette[0],
                    transform: `translateX(${shineOffset}px) skewX(-24deg)`,
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Compressed slab mark */}
              {!headlineVisible && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 15,
                      height: 124,
                      borderRadius: 4,
                      backgroundColor: palette[1],
                    }}
                  />
                </div>
              )}

              {/* Broad coaching headline */}
              {headlineVisible && (
                <div
                  style={{
                    width: '100%',
                    minWidth: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    zIndex: 2,
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      whiteSpace: 'nowrap',
                      fontSize: responsiveHeadlineSize,
                      fontWeight: 950,
                      lineHeight: 0.94,
                      letterSpacing: -2,
                      textTransform: 'uppercase',
                    }}
                  >
                    Broader Coaching
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        bottom: -13,
                        width: `${underlineWidth}%`,
                        height: 9,
                        backgroundColor: palette[1],
                        transformOrigin: 'left center',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Pink sticker shock at full width */}
              {frame >= 58 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 18,
                    right: 18,
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    padding: '10px 17px',
                    border: `4px solid ${palette[1]}`,
                    borderRadius: 9,
                    backgroundColor: palette[2],
                    boxShadow: `5px 5px 0 ${palette[1]}`,
                    transform: `scale(${stickerSlap}) rotate(${stickerRotation}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 17,
                      fontWeight: 950,
                      lineHeight: 1,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Go Wider!
                  </span>
                </div>
              )}
            </div>

            {/* Cursor click remains part of the single hero interaction */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  zIndex: 8,
                  filter: isClicking
                    ? `drop-shadow(2px 2px 0 ${palette[2]})`
                    : `drop-shadow(6px 6px 0 ${palette[2]})`,
                  transform: `
                    translate(${cursorX}px, ${cursorY}px)
                    scale(${isClicking ? 0.78 : 1})
                  `,
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 24 24"
                  fill={palette[1]}
                  stroke={palette[0]}
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                >
                  <path d="M4 3.5L11.3 21l2.65-7.15L21 11.15 4 3.5z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3: activation punchline */}
        <div
          style={{
            flex: '20 1 0',
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
              padding: '14px 28px',
              border: `4px solid ${palette[1]}`,
              borderRadius: 13,
              backgroundColor: palette[1],
              boxShadow: `${
                beat3 && Math.floor((frame - 84) / 6) % 2 === 0 ? 8 : 5
              }px ${
                beat3 && Math.floor((frame - 84) / 6) % 2 === 0 ? 8 : 5
              }px 0 ${palette[3]}`,
              transform: `scale(${footerEntrance}) translateY(${
                beat3 ? Math.sin(frame * 0.12 + 2) * 3 : 0
              }px)`,
            }}
          >
            <span
              style={{
                color: palette[0],
                fontSize: 22,
                fontWeight: 950,
                lineHeight: 1,
                letterSpacing: 2,
                textDecoration: 'underline',
                textDecorationThickness: 4,
                textUnderlineOffset: 7,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Activate the broader mission
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}