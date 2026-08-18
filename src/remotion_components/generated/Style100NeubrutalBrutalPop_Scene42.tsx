import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene42() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — hard punch-in with overshoot.
  const heroEntrance = spring({
    frame,
    fps,
    config: {
      damping: 9,
      stiffness: 270,
      mass: 0.55,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 10,
      stiffness: 300,
      mass: 0.5,
    },
  });

  const entranceX = interpolate(frame, [0, 6, 11], [-520, 42, 0], clamp);
  const entranceRotation = interpolate(frame, [0, 7, 13], [-7, 2.5, 0], clamp);

  // Beat 2 — cursor arrives, presses deeply, then locks the state.
  const primaryClick = frame >= 45 && frame < 53;
  const protectedState = frame >= 53;

  const cursorX = interpolate(frame, [27, 43], [240, 0], clamp);
  const cursorY = interpolate(frame, [27, 43], [165, 0], clamp);

  // Beat 3 — square-rhythm tap cycle.
  const loopStart = 84;
  const loopFrame = Math.max(0, frame - loopStart);
  const loopPhase = loopFrame % 24;
  const loopTap = frame >= loopStart && loopPhase >= 2 && loopPhase < 6;
  const squarePulse = frame >= loopStart && loopPhase < 12;

  const isPressed = primaryClick || loopTap;
  const pressDepth = isPressed ? 15 : 0;

  // Required continuous living physics.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.25;
  const microScale = protectedState
    ? 1 + Math.sin(frame * 0.16) * 0.012 + (squarePulse ? 0.012 : 0)
    : 1;

  const shadowDepth = isPressed
    ? 3
    : protectedState
      ? squarePulse
        ? 15
        : 8
      : 13;

  const pinkShadowDepth = protectedState ? 0 : shadowDepth;
  const tealShadowDepth = protectedState ? shadowDepth : 0;

  const cursorTapScale = isPressed ? 0.8 : 1;
  const cursorTapRotation = isPressed ? -8 : 0;

  const shineOffset = interpolate(
    (frame + 12) % 56,
    [0, 56],
    [-230, 760],
    clamp,
  );

  const labelPop = spring({
    frame: frame - 53,
    fps,
    config: {
      damping: 9,
      stiffness: 300,
      mass: 0.45,
    },
  });

  const exitY = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [0, -90],
    clamp,
  );

  const opacity = interpolate(
    frame,
    [0, 3, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        opacity,
        overflow: 'hidden',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
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
            maxWidth: 920,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          {/* Tier 1 — category button */}
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
                gap: 12,
                padding: '11px 24px',
                border: '4px solid #000000',
                borderRadius: 12,
                backgroundColor: '#FF90E8',
                boxShadow: `${squarePulse ? 6 : 4}px ${
                  squarePulse ? 6 : 4
                }px 0 #000000`,
                transform: `scale(${badgeEntrance}) rotate(${
                  Math.sin(frame * 0.12) * 0.8
                }deg)`,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  flexShrink: 0,
                  borderRadius: 2,
                  backgroundColor: '#000000',
                }}
              />
              <span
                style={{
                  color: '#000000',
                  fontSize: 18,
                  fontWeight: 950,
                  letterSpacing: 3,
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  textDecoration: 'underline',
                  textDecorationThickness: 3,
                  textUnderlineOffset: 5,
                }}
              >
                ACTIVATION CODE
              </span>
            </div>
          </div>

          {/* Tier 2 — one hero button */}
          <div
            style={{
              width: '100%',
              height: '65%',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 790,
                position: 'relative',
                transform: `
                  translateX(${entranceX}px)
                  translateY(${hoverY + pressDepth}px)
                  rotate(${entranceRotation + hoverTilt}deg)
                  scale(${heroEntrance * microScale})
                `,
                transformOrigin: 'center',
              }}
            >
              <div
                style={{
                  width: '100%',
                  minHeight: 210,
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '48px 54px',
                  border: protectedState
                    ? '8px solid #23A094'
                    : '7px solid #000000',
                  borderRadius: 18,
                  backgroundColor: '#F1F333',
                  boxShadow: protectedState
                    ? `${tealShadowDepth}px ${tealShadowDepth}px 0 #23A094`
                    : `${pinkShadowDepth}px ${pinkShadowDepth}px 0 #FF90E8`,
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
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderLeft: '3px solid rgba(0,0,0,0.08)',
                    borderRight: '3px solid rgba(0,0,0,0.08)',
                    transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: protectedState ? 18 : 0,
                    transform: protectedState
                      ? `scale(${labelPop})`
                      : 'scale(1)',
                    color: '#000000',
                    fontSize: protectedState ? 60 : 76,
                    fontWeight: 950,
                    letterSpacing: protectedState ? 1 : 4,
                    lineHeight: 0.95,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    textDecorationThickness: 7,
                    textUnderlineOffset: 12,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {protectedState && (
                    <span
                      style={{
                        width: 38,
                        height: 38,
                        position: 'relative',
                        flexShrink: 0,
                        border: '6px solid #000000',
                        borderRadius: 7,
                        backgroundColor: '#23A094',
                        boxSizing: 'border-box',
                        transform: `scale(${squarePulse ? 1.08 : 0.94})`,
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          width: 18,
                          height: 15,
                          left: 4,
                          top: -17,
                          border: '6px solid #000000',
                          borderBottom: 0,
                          borderRadius: '10px 10px 0 0',
                          boxSizing: 'border-box',
                        }}
                      />
                    </span>
                  )}
                  <span>{protectedState ? 'PEACE PROTECTED' : 'RESTRICT'}</span>
                </div>
              </div>

              {/* Oversized cursor */}
              {frame >= 27 && (
                <div
                  style={{
                    position: 'absolute',
                    right: -18,
                    bottom: -38,
                    zIndex: 10,
                    filter: `drop-shadow(${isPressed ? 2 : 8}px ${
                      isPressed ? 2 : 8
                    }px 0 #FF90E8)`,
                    transform: `
                      translate(${cursorX}px, ${cursorY}px)
                      scale(${cursorTapScale})
                      rotate(${cursorTapRotation}deg)
                    `,
                    transformOrigin: '12px 12px',
                    pointerEvents: 'none',
                  }}
                >
                  <svg
                    width="112"
                    height="112"
                    viewBox="0 0 112 112"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 8L94 59L61 67L48 101L12 8Z"
                      fill="#000000"
                      stroke="#FFF8E7"
                      strokeWidth="8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M58 65L82 94"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="15"
                      strokeLinecap="square"
                    />
                    <path
                      d="M58 65L82 94"
                      fill="none"
                      stroke="#FFF8E7"
                      strokeWidth="5"
                      strokeLinecap="square"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Tier 3 — punchline button */}
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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                padding: '15px 30px',
                border: '4px solid #000000',
                borderRadius: 12,
                backgroundColor: protectedState ? '#23A094' : '#000000',
                boxShadow: `${
                  protectedState && squarePulse ? 7 : 5
                }px ${
                  protectedState && squarePulse ? 7 : 5
                }px 0 #FF90E8`,
                transform: `scale(${heroEntrance}) translateY(${
                  Math.sin(frame * 0.12 + 1.4) * 3
                }px)`,
              }}
            >
              <span
                style={{
                  color: protectedState ? '#000000' : '#FFF8E7',
                  fontSize: 22,
                  fontWeight: 950,
                  letterSpacing: 2.5,
                  lineHeight: 1,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  textDecoration: 'underline',
                  textDecorationThickness: 3,
                  textUnderlineOffset: 5,
                }}
              >
                {protectedState
                  ? 'BOUNDARY SET · PEACE ON'
                  : 'CLICK TO SET THE BOUNDARY'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}