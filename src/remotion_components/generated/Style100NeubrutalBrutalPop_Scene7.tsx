import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const palette = ['#FFF8E7', '#000000', '#FF90E8', '#F1F333', '#23A094'];

export default function Style100NeubrutalBrutalPop_Scene7() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // BEAT 1 — spring entrance from below at 115% scale.
  const cardEntrance = spring({
    frame,
    fps,
    config: {
      damping: 11,
      stiffness: 230,
      mass: 0.65,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 10,
      stiffness: 260,
      mass: 0.55,
    },
  });

  const footerEntrance = spring({
    frame: frame - 7,
    fps,
    config: {
      damping: 11,
      stiffness: 240,
      mass: 0.6,
    },
  });

  const entranceY = interpolate(cardEntrance, [0, 1], [380, 0]);
  const entranceScale = interpolate(cardEntrance, [0, 1], [1.15, 1]);

  // BEAT 2 — segmented transformation.
  let filledSegments = 0;

  if (frame >= 30 && frame < 45) {
    filledSegments = Math.floor(
      interpolate(frame, [30, 44], [1, 4], clamp),
    );
  } else if (frame >= 45 && frame < 63) {
    filledSegments = Math.floor(
      interpolate(frame, [45, 62], [5, 8], clamp),
    );
  } else if (frame >= 63) {
    filledSegments = Math.floor(
      interpolate(frame, [63, 75], [9, 12], clamp),
    );
  }

  const progressPercent = Math.min(
    100,
    Math.round((filledSegments / 12) * 100),
  );

  const progressState =
    frame < 30
      ? 'READY'
      : frame < 45
        ? 'SOBER'
        : frame < 75
          ? 'IN SHAPE'
          : 'COMPLETE';

  const stickerImpact = spring({
    frame: frame - 74,
    fps,
    config: {
      damping: 7,
      stiffness: 360,
      mass: 0.45,
    },
  });

  const stickerVisible = frame >= 74;
  const stickerImpactScale = Math.max(
    0,
    interpolate(stickerImpact, [0, 1], [2.1, 1]),
  );

  const impactActive = frame >= 74 && frame <= 79;
  const impactThunk = impactActive
    ? interpolate(frame, [74, 76, 79], [0, 12, 0], clamp)
    : 0;

  // BEAT 3 — perpetual living physics.
  const livingAmount = interpolate(frame, [80, 86], [0, 1], clamp);
  const hoverY = Math.sin(frame * 0.12) * 6 * livingAmount;
  const hoverTilt = Math.sin(frame * 0.08) * 1.4 * livingAmount;

  const alternatingShadow =
    frame >= 80 && Math.floor((frame - 80) / 7) % 2 === 0 ? 18 : 11;
  const shadowPulse =
    alternatingShadow + Math.sin(frame * 0.18) * 2.5 * livingAmount;

  const loopFrame = Math.max(0, frame - 80);
  const travelingSegment = Math.floor(loopFrame / 3) % 12;

  const shineOffset = interpolate(loopFrame % 50, [0, 50], [-300, 920], clamp);

  const stickerTapPhase = loopFrame % 15;
  const stickerTap =
    frame >= 80 && stickerTapPhase < 3
      ? interpolate(stickerTapPhase, [0, 1, 2], [1, 1.09, 1], clamp)
      : 1;

  const stickerTapRotation =
    frame >= 80 && stickerTapPhase < 3
      ? interpolate(stickerTapPhase, [0, 1, 2], [-4, -1, -4], clamp)
      : -4;

  // Final hard ejection.
  const ejectStart = durationInFrames - 10;
  const ejectX = interpolate(
    frame,
    [ejectStart, durationInFrames],
    [0, 1250],
    clamp,
  );
  const ejectRotation = interpolate(
    frame,
    [ejectStart, durationInFrames],
    [0, 10],
    clamp,
  );
  const cardOpacity = interpolate(
    frame,
    [durationInFrames - 4, durationInFrames],
    [1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        color: palette[1],
        fontFamily:
          '"Arial Black", "Helvetica Neue", Arial, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '80px 60px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* TIER 1 — CATEGORY PILL */}
        <div
          style={{
            width: '100%',
            height: '15%',
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
              padding: '12px 26px',
              border: `4px solid ${palette[1]}`,
              borderRadius: 14,
              backgroundColor: palette[2],
              boxShadow: `7px 7px 0 ${palette[1]}`,
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12) * 3
              }px)`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: palette[1],
              }}
            />
            <span
              style={{
                fontSize: 20,
                fontWeight: 950,
                lineHeight: 1,
                letterSpacing: 3,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationThickness: 3,
                textUnderlineOffset: 5,
                whiteSpace: 'nowrap',
              }}
            >
              Activation Code
            </span>
          </div>
        </div>

        {/* TIER 2 — ONE HERO RESET CARD */}
        <div
          style={{
            width: '100%',
            height: '65%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '88%',
              maxWidth: 850,
              opacity: cardOpacity,
              transform: `
                translateX(${ejectX}px)
                translateY(${entranceY + hoverY + impactThunk}px)
                scale(${entranceScale})
                rotate(${hoverTilt + ejectRotation}deg)
              `,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: 380,
                padding: '42px 44px',
                boxSizing: 'border-box',
                border: `6px solid ${palette[1]}`,
                borderRadius: 24,
                backgroundColor: palette[4],
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 ${palette[1]}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Traveling card shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 105,
                  opacity: frame >= 80 ? 0.34 : 0,
                  backgroundColor: palette[0],
                  transform: `translateX(${shineOffset}px) skewX(-20deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontSize: 54,
                    fontWeight: 950,
                    lineHeight: 1,
                    letterSpacing: -2,
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    textDecorationThickness: 6,
                    textUnderlineOffset: 8,
                  }}
                >
                  RESET
                </div>

                <div
                  style={{
                    minWidth: 118,
                    padding: '9px 16px',
                    boxSizing: 'border-box',
                    border: `4px solid ${palette[1]}`,
                    borderRadius: 10,
                    backgroundColor:
                      progressPercent === 100 ? palette[3] : palette[0],
                    boxShadow: `4px 4px 0 ${palette[1]}`,
                    fontSize: 25,
                    fontWeight: 950,
                    lineHeight: 1,
                    textAlign: 'center',
                  }}
                >
                  {progressPercent}%
                </div>
              </div>

              {/* Single segmented progress bar */}
              <div
                style={{
                  width: '100%',
                  padding: 12,
                  boxSizing: 'border-box',
                  border: `5px solid ${palette[1]}`,
                  borderRadius: 14,
                  backgroundColor: palette[0],
                  boxShadow: `6px 6px 0 ${palette[1]}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {Array.from({length: 12}).map((_, index) => {
                  const isFilled = index < filledSegments;
                  const isTraveling =
                    frame >= 80 && index === travelingSegment;

                  return (
                    <div
                      key={index}
                      style={{
                        flex: 1,
                        height: 48,
                        border: `3px solid ${palette[1]}`,
                        borderRadius: 5,
                        backgroundColor: isTraveling
                          ? palette[2]
                          : isFilled
                            ? palette[3]
                            : '#FFFFFF',
                        transform: isTraveling
                          ? 'translateY(-4px)'
                          : 'translateY(0)',
                        boxShadow: isTraveling
                          ? `3px 4px 0 ${palette[1]}`
                          : 'none',
                      }}
                    />
                  );
                })}
              </div>

              <div
                style={{
                  minWidth: 240,
                  padding: '10px 22px',
                  border: `4px solid ${palette[1]}`,
                  borderRadius: 10,
                  backgroundColor:
                    progressPercent === 100 ? palette[1] : palette[0],
                  color: progressPercent === 100 ? palette[0] : palette[1],
                  boxShadow: `5px 5px 0 ${
                    progressPercent === 100 ? palette[2] : palette[1]
                  }`,
                  fontSize: 22,
                  fontWeight: 950,
                  lineHeight: 1,
                  letterSpacing: 3,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                {progressState}
              </div>

              {stickerVisible && (
                <div
                  style={{
                    padding: '12px 28px',
                    border: `5px solid ${palette[1]}`,
                    borderRadius: 12,
                    backgroundColor: palette[3],
                    boxShadow: `7px 7px 0 ${palette[1]}`,
                    fontSize: 31,
                    fontWeight: 950,
                    lineHeight: 1,
                    letterSpacing: 1,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    position: 'relative',
                    zIndex: 3,
                    transform: `scale(${
                      stickerImpactScale * stickerTap
                    }) rotate(${stickerTapRotation}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  MADE SENSE
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TIER 3 — COMPLETION PUNCHLINE */}
        <div
          style={{
            width: '100%',
            height: '20%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '15px 30px',
              border: `4px solid ${palette[1]}`,
              borderRadius: 14,
              backgroundColor: palette[1],
              boxShadow: `7px 7px 0 ${palette[2]}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              transform: `scale(${footerEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px)`,
            }}
          >
            <span
              style={{
                color: palette[0],
                fontSize: 24,
                fontWeight: 950,
                lineHeight: 1,
                letterSpacing: 2,
                textAlign: 'center',
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationColor: palette[3],
                textDecorationThickness: 4,
                textUnderlineOffset: 6,
              }}
            >
              RESET COMPLETE · KEEP GOING
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}