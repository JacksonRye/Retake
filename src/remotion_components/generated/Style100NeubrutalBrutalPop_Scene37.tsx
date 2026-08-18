import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const palette = ['#FFF8E7', '#000000', '#FF90E8', '#F1F333', '#23A094'];

export default function Style100NeubrutalBrutalPop_Scene37() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // BEAT 1 — spring burst with an explicit 125% shock.
  const entranceSpring = spring({
    frame,
    fps,
    config: {
      damping: 11,
      stiffness: 260,
      mass: 0.55,
    },
  });

  const badgeSpring = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 12,
      stiffness: 280,
      mass: 0.5,
    },
  });

  const footerSpring = spring({
    frame: frame - 7,
    fps,
    config: {
      damping: 12,
      stiffness: 250,
      mass: 0.55,
    },
  });

  const scaleShock = interpolate(
    frame,
    [0, 6, 11, 19, 30],
    [0.15, 0.82, 1.25, 0.96, 1],
    clamp,
  );

  const entranceScale =
    frame < 30 ? scaleShock : Math.max(0, entranceSpring);

  const initialRotation = interpolate(
    frame,
    [0, 8, 15, 24],
    [-8, 4, -1.5, 0],
    clamp,
  );

  // BEAT 2 — cursor click, button expansion, accelerating reach.
  const cursorVisible = frame >= 24 && frame <= 68;

  const cursorX = interpolate(frame, [24, 40], [250, 35], clamp);
  const cursorY = interpolate(frame, [24, 40], [150, 38], clamp);

  const clickDown = frame >= 41 && frame <= 47;
  const clickThunk = clickDown ? 9 : 0;
  const clickScale = clickDown ? 0.88 : 1;

  const heroWidth = interpolate(frame, [38, 72], [55, 100], clamp);
  const heroPaddingX = interpolate(frame, [38, 72], [38, 72], clamp);

  const counterProgress = interpolate(frame, [31, 80], [0, 1], clamp);
  const acceleratedCounter = Math.pow(counterProgress, 2.55);
  const reachCount =
    frame < 31 ? 1 : Math.round(1 + acceleratedCounter * 9999);

  // BEAT 3 — perpetual living physics.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.35;
  const lateralShadow = 13 + Math.sin(frame * 0.18) * 7;
  const verticalShadow = 13 + Math.cos(frame * 0.16) * 3;

  const counterPulsePhase = ((frame - 84) % 22 + 22) % 22;
  const counterBump =
    frame >= 84 && counterPulsePhase < 7
      ? interpolate(counterPulsePhase, [0, 2, 7], [1, 1.11, 1], clamp)
      : 1;

  const shineOffset = interpolate(
    ((frame + 12) % 62) / 62,
    [0, 1],
    [-240, 1000],
    clamp,
  );

  const rippleConfigs = [
    {delay: 0, borderColor: palette[3]},
    {delay: 10, borderColor: palette[1]},
    {delay: 20, borderColor: palette[4]},
  ];

  const snapExitX = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames - 7],
    [0, 1250],
    clamp,
  );

  const sceneOpacity = interpolate(
    frame,
    [0, 2, durationInFrames - 5, durationInFrames - 3],
    [0, 1, 1, 0],
    clamp,
  );

  const topSnapY = interpolate(frame, [0, 5], [-55, 0], clamp);
  const footerSnapY = interpolate(frame, [4, 10], [55, 0], clamp);

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
          transform: `translateX(${snapExitX}px)`,
        }}
      >
        {/* TIER 1 — CATEGORY PILL */}
        <div
          style={{
            height: '15%',
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
              justifyContent: 'center',
              gap: 16,
              padding: '11px 25px',
              border: `4px solid ${palette[1]}`,
              borderRadius: 999,
              backgroundColor: palette[3],
              boxShadow: `7px 7px 0 ${palette[1]}`,
              transform: `translateY(${topSnapY + Math.sin(frame * 0.1) * 2}px) scale(${badgeSpring})`,
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: palette[4],
                border: `3px solid ${palette[1]}`,
              }}
            />
            <span
              style={{
                fontSize: 19,
                lineHeight: 1,
                fontWeight: 950,
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

        {/* TIER 2 — ONE HERO BUTTON */}
        <div
          style={{
            height: '65%',
            width: '100%',
            maxWidth: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: 250,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transform: `translateY(${hoverY + clickThunk}px) rotate(${initialRotation + hoverTilt}deg) scale(${entranceScale})`,
              transformOrigin: 'center',
            }}
          >
            {/* Repeating hard outline ripples derived from the hero. */}
            {rippleConfigs.map((ripple, index) => {
              const localFrame = frame - 84 - ripple.delay;
              const cycle = 34;
              const phase =
                localFrame >= 0
                  ? ((localFrame % cycle) + cycle) % cycle
                  : 0;
              const rippleScale = interpolate(
                phase,
                [0, cycle - 1],
                [1, 1.28],
                clamp,
              );
              const rippleOpacity =
                localFrame >= 0
                  ? interpolate(
                      phase,
                      [0, 4, 24, cycle - 1],
                      [0, 0.82, 0.35, 0],
                      clamp,
                    )
                  : 0;

              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: `${heroWidth}%`,
                    height: 154,
                    border: `5px solid ${ripple.borderColor}`,
                    borderRadius: 24,
                    boxSizing: 'border-box',
                    opacity: rippleOpacity,
                    transform: `scale(${rippleScale})`,
                    zIndex: 0,
                  }}
                />
              );
            })}

            <div
              style={{
                width: `${heroWidth}%`,
                minHeight: 154,
                padding: `24px ${heroPaddingX}px`,
                boxSizing: 'border-box',
                border: `6px solid ${palette[1]}`,
                borderRadius: 24,
                backgroundColor: palette[2],
                boxShadow: `${lateralShadow}px ${verticalShadow}px 0 ${palette[3]}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 28,
                position: 'relative',
                overflow: 'hidden',
                zIndex: 2,
              }}
            >
              {/* Continuous traveling shine. */}
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  bottom: -20,
                  left: 0,
                  width: 92,
                  backgroundColor: palette[0],
                  opacity: 0.44,
                  transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    fontSize: 35,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    textDecoration: 'underline',
                    textDecorationThickness: 5,
                    textUnderlineOffset: 8,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Amplify Impact
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    gap: 16,
                    transform: `scale(${counterBump})`,
                    transformOrigin: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 52,
                      lineHeight: 0.9,
                      fontWeight: 950,
                      letterSpacing: -1,
                    }}
                  >
                    {reachCount.toLocaleString('en-US')}
                  </span>
                  <span
                    style={{
                      fontSize: 17,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                    }}
                  >
                    People Reached
                  </span>
                </div>
              </div>
            </div>

            {/* Oversized click cursor. */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  left: '54%',
                  top: '46%',
                  zIndex: 10,
                  filter: `drop-shadow(${clickDown ? 2 : 7}px ${
                    clickDown ? 2 : 7
                  }px 0 ${palette[3]})`,
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${clickScale})`,
                  transformOrigin: 'top left',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="88"
                  height="88"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 5L52 34L34 39L26 57L8 5Z"
                    fill={palette[0]}
                    stroke={palette[1]}
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
            height: '20%',
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
              padding: '15px 30px',
              border: `4px solid ${palette[1]}`,
              borderRadius: 16,
              backgroundColor: palette[4],
              boxShadow: `${6 + Math.sin(frame * 0.17) * 2}px 7px 0 ${palette[1]}`,
              transform: `translateY(${footerSnapY + Math.sin(frame * 0.12 + 1) * 3}px) scale(${footerSpring})`,
            }}
          >
            <span
              style={{
                color: palette[0],
                fontSize: 23,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 2,
                textAlign: 'center',
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationThickness: 4,
                textUnderlineOffset: 6,
                whiteSpace: 'nowrap',
              }}
            >
              Paid Reach → Real Impact
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}