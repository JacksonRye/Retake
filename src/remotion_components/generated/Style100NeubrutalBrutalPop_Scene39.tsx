import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene39() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const palette = {
    background: '#FFF8E7',
    black: '#000000',
    pink: '#FF90E8',
    yellow: '#F1F333',
    teal: '#23A094',
  };

  // BEAT 1 — square drop, spring bounce, shadow-offset pop.
  const tileSpring = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 245,
      mass: 0.65,
    },
  });

  const badgeSpring = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.55,
    },
  });

  const entranceDrop = interpolate(frame, [0, 8, 15, 22, 30], [-420, 20, -12, 4, 0], clamp);
  const entranceScale = interpolate(tileSpring, [0, 0.75, 1], [0.7, 1.05, 1], clamp);
  const entranceRotation = interpolate(frame, [0, 8, 16, 24], [-5, 2, -1, 0], clamp);
  const entranceShadow = interpolate(frame, [0, 8, 15, 24], [0, 24, 12, 18], clamp);

  // BEAT 2 — cursor physically crosses out WORK.
  const cursorVisible = frame >= 25 && frame <= 78;
  const cursorX = interpolate(frame, [25, 35, 47, 58, 70, 78], [260, 75, -88, -88, 20, 160], clamp);
  const cursorY = interpolate(frame, [25, 35, 47, 58, 70, 78], [-95, 8, 8, 96, 108, 165], clamp);
  const cursorRotation = interpolate(frame, [25, 47, 58, 78], [-12, -3, 8, 14], clamp);
  const cursorClicking =
    (frame >= 43 && frame <= 47) || (frame >= 59 && frame <= 63);

  const workStrike = interpolate(frame, [36, 47], [0, 1], clamp);
  const workThunk = frame >= 43 && frame <= 48 ? 7 : 0;

  // GROUP CALL flips into SERMON MODE.
  const labelFlip = interpolate(frame, [51, 58, 65], [0, 90, 180], clamp);
  const sermonMode = frame >= 58;
  const stickerSpring = spring({
    frame: frame - 58,
    fps,
    config: {
      damping: 8,
      stiffness: 300,
      mass: 0.45,
    },
  });
  const stickerScale = sermonMode
    ? interpolate(stickerSpring, [0, 1], [0.25, 1], clamp)
    : 1;
  const stickerSlapRotation = sermonMode
    ? interpolate(stickerSpring, [0, 0.72, 1], [-10, 3, -2], clamp)
    : 0;
  const stickerThunk = frame >= 58 && frame <= 63 ? 8 : 0;

  // BEAT 3 — perpetual hard page ticks, hover, pulse, and border flashes.
  const beatThree = frame >= 84;
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.35;
  const shadowPulse = Math.sin(frame * 0.18) * 3;

  const pageTickIndex = beatThree ? Math.floor((frame - 84) / 5) % 4 : 0;
  const pageTickRotations = [0, -1.8, 1.2, -0.6];
  const pageTickOffsets = [0, -3, 2, -1];
  const pageRotation = pageTickRotations[pageTickIndex];
  const pageOffset = pageTickOffsets[pageTickIndex];

  const borderFlash =
    beatThree && Math.floor((frame - 84) / 5) % 2 === 0
      ? palette.yellow
      : palette.black;

  const sermonPulse = beatThree
    ? 1 + Math.sin((frame - 84) * 0.22) * 0.045
    : stickerScale;

  const shineOffset = interpolate((frame + 12) % 58, [0, 58], [-180, 950], clamp);

  const pageEdgeProgress = beatThree
    ? ((frame - 84) % 15) / 15
    : 0;
  const pageEdgeX = interpolate(pageEdgeProgress, [0, 1], [-80, 780], clamp);

  const exitY = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -80],
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
        backgroundColor: palette.background,
        opacity,
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        color: palette.black,
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
          transform: `translateY(${exitY}px)`,
        }}
      >
        {/* TIER 1 — CATEGORY */}
        <div
          style={{
            flex: '0 0 15%',
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
              padding: '11px 24px',
              backgroundColor: palette.pink,
              border: `4px solid ${palette.black}`,
              borderRadius: 10,
              boxShadow: `7px 7px 0 ${palette.black}`,
              transform: `translateY(${Math.sin(frame * 0.11) * 3}px) scale(${badgeSpring})`,
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: palette.black,
              }}
            />
            <span
              style={{
                fontSize: 20,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              ACTIVATION CODE
            </span>
          </div>
        </div>

        {/* TIER 2 — ONE CALENDAR HERO */}
        <div
          style={{
            flex: '1 1 65%',
            width: '100%',
            minHeight: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: 1200,
          }}
        >
          <div
            style={{
              width: 'min(760px, 84vw)',
              maxHeight: '100%',
              aspectRatio: '1.48 / 1',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transform: `
                translateY(${entranceDrop + hoverY + pageOffset + workThunk + stickerThunk}px)
                scale(${entranceScale})
                rotate(${entranceRotation + hoverTilt}deg)
                rotateY(${pageRotation}deg)
              `,
            }}
          >
            {/* Pink backing sheet / shadow */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 18,
                backgroundColor: palette.pink,
                border: `6px solid ${palette.black}`,
                transform: `translate(${entranceShadow + shadowPulse}px, ${entranceShadow + shadowPulse}px)`,
              }}
            />

            {/* Calendar tile */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                boxSizing: 'border-box',
                overflow: 'hidden',
                borderRadius: 18,
                border: `7px solid ${borderFlash}`,
                backgroundColor: palette.background,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Traveling cream shine */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 8,
                  top: -80,
                  bottom: -80,
                  left: 0,
                  width: 100,
                  opacity: 0.72,
                  backgroundColor: palette.background,
                  borderLeft: `3px solid ${palette.yellow}`,
                  borderRight: `3px solid ${palette.yellow}`,
                  transform: `translateX(${shineOffset}px) skewX(-18deg)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Tiny repeating page-turn edge */}
              {beatThree && (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 9,
                    top: 0,
                    left: 0,
                    width: 78,
                    height: 13,
                    backgroundColor: palette.yellow,
                    borderRight: `4px solid ${palette.black}`,
                    borderBottom: `4px solid ${palette.black}`,
                    transform: `translateX(${pageEdgeX}px) skewX(-28deg)`,
                  }}
                />
              )}

              <div
                style={{
                  height: 92,
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  padding: '0 34px',
                  backgroundColor: palette.pink,
                  borderBottom: `6px solid ${palette.black}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <span
                  style={{
                    fontSize: 38,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 5,
                    textDecoration: 'underline',
                    textDecorationThickness: 5,
                    textUnderlineOffset: 8,
                  }}
                >
                  SUNDAY
                </span>
                <span
                  style={{
                    padding: '8px 16px',
                    border: `4px solid ${palette.black}`,
                    borderRadius: 8,
                    backgroundColor: palette.yellow,
                    boxShadow: `4px 4px 0 ${palette.black}`,
                    fontSize: 17,
                    lineHeight: 1,
                    letterSpacing: 2,
                  }}
                >
                  PROTECTED
                </span>
              </div>

              <div
                style={{
                  flex: 1,
                  minHeight: 0,
                  padding: '22px 42px 30px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 126,
                    lineHeight: 0.88,
                    fontWeight: 950,
                    letterSpacing: -7,
                  }}
                >
                  07
                </div>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      padding: '8px 18px',
                      border: `4px solid ${palette.black}`,
                      borderRadius: 8,
                      backgroundColor: palette.background,
                      boxShadow: `4px 4px 0 ${palette.black}`,
                      fontSize: 23,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: 3,
                    }}
                  >
                    WORK
                    <div
                      style={{
                        position: 'absolute',
                        left: 8,
                        top: '47%',
                        width: `${workStrike * 96}%`,
                        height: 7,
                        backgroundColor: palette.pink,
                        border: workStrike > 0 ? `2px solid ${palette.black}` : 'none',
                        transform: 'rotate(-8deg)',
                        transformOrigin: 'left center',
                      }}
                    />
                  </div>

                  <span
                    style={{
                      fontSize: 26,
                      fontWeight: 950,
                    }}
                  >
                    →
                  </span>

                  <div
                    style={{
                      minWidth: 280,
                      height: 58,
                      position: 'relative',
                      transformStyle: 'preserve-3d',
                      transform: `rotateX(${labelFlip}deg) scale(${sermonPulse}) rotate(${stickerSlapRotation}deg)`,
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        padding: '0 22px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `4px solid ${palette.black}`,
                        borderRadius: 8,
                        backgroundColor: sermonMode ? palette.teal : palette.yellow,
                        color: sermonMode ? palette.background : palette.black,
                        boxShadow: `6px 6px 0 ${palette.black}`,
                        fontSize: sermonMode ? 23 : 21,
                        lineHeight: 1,
                        fontWeight: 950,
                        letterSpacing: 2,
                        whiteSpace: 'nowrap',
                        backfaceVisibility: 'hidden',
                        transform: sermonMode ? 'rotateX(180deg)' : 'rotateX(0deg)',
                      }}
                    >
                      {sermonMode ? 'SERMON MODE' : 'GROUP CALL'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cursor crossing WORK, then clicking transformation */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  left: '51%',
                  top: '56%',
                  filter: cursorClicking
                    ? `drop-shadow(2px 2px 0 ${palette.pink})`
                    : `drop-shadow(6px 7px 0 ${palette.pink})`,
                  transform: `
                    translate(${cursorX}px, ${cursorY}px)
                    rotate(${cursorRotation}deg)
                    scale(${cursorClicking ? 0.78 : 1})
                  `,
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
                    d="M7 5L48 40L31 43L39 60L28 65L20 47L8 58L7 5Z"
                    fill={palette.black}
                    stroke={palette.background}
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* TIER 3 — PUNCHLINE */}
        <div
          style={{
            flex: '0 0 20%',
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
              padding: '14px 30px',
              border: `4px solid ${palette.black}`,
              borderRadius: 10,
              backgroundColor: palette.black,
              color: palette.background,
              boxShadow: `7px 7px 0 ${borderFlash}`,
              transform: `scale(${tileSpring}) translateY(${Math.sin(frame * 0.12 + 1.3) * 3}px)`,
              fontSize: 23,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              textAlign: 'center',
              textDecoration: 'underline',
              textDecorationThickness: 3,
              textUnderlineOffset: 6,
            }}
          >
            SUNDAY IS PURPOSE, NOT A TASK
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}