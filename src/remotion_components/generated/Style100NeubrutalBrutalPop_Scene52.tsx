import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene52() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: rigid snap-up with spring overshoot.
  const entranceSpring = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 260,
      mass: 0.55,
    },
  });

  const rigidEntranceY = interpolate(
    frame,
    [0, 8, 15, 22, 30],
    [180, 180, -22, 8, 0],
    clamp,
  );

  const badgeScale = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 9,
      stiffness: 300,
      mass: 0.45,
    },
  });

  // Beat 2: cursor arrives, clicks MATCH, and flips the state.
  const cursorVisible = frame >= 27 && frame <= 70;
  const cursorX = interpolate(frame, [27, 43], [150, 8], clamp);
  const cursorY = interpolate(frame, [27, 43], [110, 5], clamp);
  const clicking = frame >= 44 && frame <= 50;
  const hasMatched = frame >= 49;

  const clickThunk = clicking ? 9 : 0;
  const matchButtonScale = clicking ? 0.9 : 1;

  const statusFlipScale = hasMatched
    ? interpolate(frame, [49, 52, 56], [0.65, 1.16, 1], clamp)
    : 1;

  const successStripX = hasMatched
    ? interpolate(frame, [49, 54], [-760, 0], clamp)
    : -760;

  const successStripRotation = hasMatched
    ? interpolate(frame, [49, 52, 56], [-5, 2, -1.2], clamp)
    : -5;

  // Beat 3: continuously alive hover, hard scale ticks, shadow pops, pulse, shine.
  const beat3Active = frame >= 84;
  const hoverY = beat3Active ? Math.sin(frame * 0.12) * 6 : 0;
  const hoverTilt = beat3Active ? Math.sin(frame * 0.08) * 1.3 : 0;

  const hardTick = beat3Active
    ? Math.floor((frame - 84) / 7) % 2 === 0
      ? 1
      : 1.025
    : 1;

  const poppedShadow = beat3Active
    ? Math.floor((frame - 84) / 9) % 2 === 0
      ? 10
      : 17
    : clicking
      ? 5
      : 13;

  const successPulse = beat3Active
    ? Math.floor((frame - 84) / 6) % 2 === 0
      ? 1
      : 1.045
    : 1;

  const shineProgress = ((frame - 84 + 64) % 64) / 64;
  const shineX = interpolate(shineProgress, [0, 1], [-260, 820], clamp);
  const shineOpacity = beat3Active ? 0.42 : 0;

  // Crisp ending.
  const exitX = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, 170],
    clamp,
  );

  const sceneOpacity = interpolate(
    frame,
    [0, 3, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
        overflow: 'hidden',
        opacity: sceneOpacity,
        fontFamily:
          '"Arial Black", "Helvetica Neue", Helvetica, Arial, sans-serif',
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
          transform: `translateX(${exitX}px)`,
        }}
      >
        {/* Tier 1: category pill */}
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
              justifyContent: 'center',
              gap: 12,
              padding: '11px 24px',
              backgroundColor: '#FF90E8',
              border: '4px solid #000000',
              borderRadius: 12,
              boxShadow: '7px 7px 0 #000000',
              transform: `scale(${badgeScale}) translateY(${
                beat3Active ? Math.sin(frame * 0.12 + 1) * 3 : 0
              }px)`,
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: '#000000',
              }}
            />
            <span
              style={{
                fontSize: 18,
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

        {/* Tier 2: one recruitment company hero button-card */}
        <div
          style={{
            flex: '1 1 65%',
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
              width: 'min(82%, 820px)',
              position: 'relative',
              transform: `
                translateY(${rigidEntranceY + hoverY + clickThunk}px)
                rotate(${hoverTilt}deg)
                scale(${entranceSpring * hardTick})
              `,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: 350,
                padding: '36px 38px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center',
                gap: 16,
                backgroundColor: '#23A094',
                border: '6px solid #000000',
                borderRadius: 22,
                boxShadow: `${poppedShadow}px ${poppedShadow}px 0 #F1F333`,
              }}
            >
              {/* Traveling Beat 3 shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -60,
                  bottom: -60,
                  left: 0,
                  width: 88,
                  zIndex: 1,
                  opacity: shineOpacity,
                  backgroundColor: '#FFFFFF',
                  transform: `translateX(${shineX}px) rotate(18deg)`,
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
                    fontSize: 23,
                    fontWeight: 950,
                    letterSpacing: 3.5,
                    lineHeight: 1.1,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    textDecorationThickness: 4,
                    textUnderlineOffset: 7,
                  }}
                >
                  Recruitment Company
                </div>

                <div
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: hasMatched ? '#F1F333' : '#FFF8E7',
                    border: '5px solid #000000',
                    borderRadius: 12,
                    boxShadow: '6px 6px 0 #000000',
                    transform: `scale(${statusFlipScale})`,
                  }}
                >
                  <span
                    style={{
                      fontSize: 34,
                      fontWeight: 950,
                      letterSpacing: 2,
                      lineHeight: 1,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  >
                    {hasMatched ? 'Employee Found' : 'Searching'}
                  </span>
                </div>

                <div
                  style={{
                    width: '72%',
                    padding: '17px 28px',
                    boxSizing: 'border-box',
                    backgroundColor: '#000000',
                    color: '#FFF8E7',
                    border: '5px solid #000000',
                    borderRadius: 12,
                    boxShadow: clicking
                      ? '2px 2px 0 #F1F333'
                      : '7px 7px 0 #F1F333',
                    transform: `translateY(${clicking ? 6 : 0}px) scale(${matchButtonScale})`,
                    fontSize: 34,
                    fontWeight: 950,
                    letterSpacing: 5,
                    lineHeight: 1,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    textDecorationThickness: 4,
                    textUnderlineOffset: 6,
                  }}
                >
                  Match
                </div>

                {hasMatched && (
                  <div
                    style={{
                      width: '108%',
                      padding: '12px 20px',
                      boxSizing: 'border-box',
                      backgroundColor: '#FF90E8',
                      border: '5px solid #000000',
                      boxShadow: '7px 7px 0 #000000',
                      color: '#000000',
                      fontSize: 26,
                      fontWeight: 950,
                      letterSpacing: 5,
                      lineHeight: 1,
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      transform: `
                        translateX(${successStripX}px)
                        rotate(${successStripRotation}deg)
                        scale(${successPulse})
                      `,
                    }}
                  >
                    Success
                  </div>
                )}
              </div>
            </div>

            {/* Cursor remains attached to the single hero interaction */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  left: '67%',
                  top: '58%',
                  transform: `
                    translate(${cursorX}px, ${cursorY}px)
                    scale(${clicking ? 0.82 : 1})
                  `,
                  filter: clicking
                    ? 'drop-shadow(2px 2px 0 #FF90E8)'
                    : 'drop-shadow(6px 6px 0 #FF90E8)',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M3.7 2.8L20.4 12l-7.1 2.1-3.1 6.8L3.7 2.8z"
                    fill="#FFF8E7"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3: punchline */}
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
              padding: '14px 28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              backgroundColor: '#000000',
              color: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 12,
              boxShadow: `${
                beat3Active && Math.floor((frame - 84) / 8) % 2 === 0 ? 8 : 5
              }px ${
                beat3Active && Math.floor((frame - 84) / 8) % 2 === 0 ? 8 : 5
              }px 0 #FF90E8`,
              transform: `scale(${entranceSpring}) translateY(${
                beat3Active ? Math.sin(frame * 0.12 + 2) * 3 : 0
              }px)`,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 950,
                letterSpacing: 2.5,
                lineHeight: 1.1,
                textAlign: 'center',
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationThickness: 3,
                textUnderlineOffset: 5,
              }}
            >
              One Click. Right Hire.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}