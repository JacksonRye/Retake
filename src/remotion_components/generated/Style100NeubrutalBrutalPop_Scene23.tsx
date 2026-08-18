import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene23() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: rigid horizontal extension with overshoot.
  const heroEntrance = spring({
    frame,
    fps,
    config: {
      damping: 12,
      stiffness: 230,
      mass: 0.58,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 4,
    fps,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.5,
    },
  });

  const footerEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 12,
      stiffness: 220,
      mass: 0.55,
    },
  });

  const entranceShadow =
    frame < 7 ? 2 : frame < 14 ? 18 : frame < 22 ? 9 : 13;

  // Beat 2: count to thirteen, split for one year, then reconnect.
  const yearCount = Math.max(
    1,
    Math.round(interpolate(frame, [15, 52], [1, 13], clamp)),
  );

  const splitGap = interpolate(
    frame,
    [30, 40, 56, 68, 72],
    [0, 58, 58, 16, 0],
    clamp,
  );

  const gapLabelOpacity = interpolate(
    frame,
    [32, 38, 58, 68],
    [0, 1, 1, 0],
    clamp,
  );

  const stampEntrance = spring({
    frame: frame - 42,
    fps,
    config: {
      damping: 8,
      stiffness: 300,
      mass: 0.42,
    },
  });

  const stampRotation =
    frame < 42
      ? -16
      : interpolate(frame, [42, 47, 53], [-16, 5, -3], clamp);

  // Reconnection impact.
  const reconnectThunk = interpolate(
    frame,
    [68, 71, 74, 78],
    [0, 10, -4, 0],
    clamp,
  );

  const cursorVisible = frame >= 43 && frame <= 76;
  const cursorOpacity = interpolate(
    frame,
    [43, 47, 70, 76],
    [0, 1, 1, 0],
    clamp,
  );
  const cursorX = interpolate(frame, [43, 67], [145, 0], clamp);
  const cursorY = interpolate(frame, [43, 67], [105, 0], clamp);
  const cursorClicking = frame >= 67 && frame <= 72;

  // Beat 3: continuously living physics.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.35;
  const seamPulse = (Math.sin(frame * 0.2) + 1) / 2;

  const alternatingShadow =
    frame >= 84 ? (Math.floor((frame - 84) / 8) % 2 === 0 ? 9 : 17) : entranceShadow;
  const shadowDepth =
    alternatingShadow + (frame >= 84 ? Math.sin(frame * 0.18) * 2 : 0);

  const shineOffset = interpolate(frame % 62, [0, 62], [-180, 1050], clamp);
  const shineOpacity = interpolate(frame, [76, 84], [0.18, 0.5], clamp);

  const playheadProgress =
    frame < 82 ? 0 : ((frame - 82) * 0.0135) % 1;
  const playheadLeft = 5 + playheadProgress * 90;
  const playheadOpacity = interpolate(frame, [80, 86], [0, 1], clamp);

  const seamOpacity = interpolate(frame, [72, 81], [0, 1], clamp);

  // Snappy exit.
  const exitX = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, 90],
    clamp,
  );
  const sceneOpacity = interpolate(
    frame,
    [0, 4, durationInFrames - 7, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        opacity: sceneOpacity,
        padding: '80px 20px',
        boxSizing: 'border-box',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Arial, sans-serif',
        color: '#000000',
      }}
    >
      <div
        style={{
          width: '88%',
          maxWidth: 900,
          height: '100%',
          margin: '0 auto',
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
              gap: 16,
              padding: '11px 24px',
              marginTop: 2,
              backgroundColor: '#FF90E8',
              border: '4px solid #000000',
              borderRadius: 14,
              boxShadow: '7px 7px 0 #000000',
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.1) * 3
              }px) rotate(${Math.sin(frame * 0.07) * 0.7}deg)`,
              transformOrigin: 'center',
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: '#23A094',
                border: '2px solid #000000',
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 2.5,
                lineHeight: 1,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationThickness: 3,
                textUnderlineOffset: 5,
                whiteSpace: 'nowrap',
              }}
            >
              Relationship Timeline
            </span>
          </div>
        </div>

        {/* Tier 2: one hero timeline card */}
        <div
          style={{
            flex: '1 1 65%',
            minHeight: 0,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 320,
              transform: `translateY(${hoverY + reconnectThunk}px) rotate(${hoverTilt}deg)`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: `scaleX(${heroEntrance})`,
                transformOrigin: 'left center',
                filter: `drop-shadow(${shadowDepth}px ${shadowDepth}px 0px #000000)`,
              }}
            >
              {/* Left half */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '50%',
                  height: '100%',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  backgroundColor: '#FFF8E7',
                  border: '6px solid #000000',
                  borderRadius: '24px 0 0 24px',
                  transform: `translateX(${-splitGap}px)`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -45,
                    left: shineOffset,
                    width: 92,
                    height: 430,
                    opacity: shineOpacity,
                    backgroundColor: '#F1F333',
                    transform: 'skewX(-22deg)',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: 40,
                    right: 22,
                    fontSize: 78,
                    lineHeight: 0.95,
                    fontWeight: 950,
                    letterSpacing: -3,
                  }}
                >
                  {yearCount}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: 27,
                    top: 126,
                    zIndex: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px 15px',
                    backgroundColor: '#F1F333',
                    border: '4px solid #000000',
                    borderRadius: 9,
                    boxShadow: '5px 5px 0 #000000',
                    transform: `scale(${stampEntrance}) rotate(${stampRotation}deg)`,
                    transformOrigin: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 17,
                      fontWeight: 950,
                      lineHeight: 1,
                      letterSpacing: 1.2,
                      whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                      textDecoration: 'underline',
                      textDecorationThickness: 3,
                      textUnderlineOffset: 4,
                    }}
                  >
                    Married at 21
                  </span>
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: 42,
                    right: -5,
                    top: 221,
                    height: 9,
                    backgroundColor: '#23A094',
                    borderTop: '3px solid #000000',
                    borderBottom: '3px solid #000000',
                    boxSizing: 'border-box',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    left: 31,
                    top: 207,
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    backgroundColor: '#FF90E8',
                    border: '5px solid #000000',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    left: 28,
                    bottom: 31,
                    fontSize: 15,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  Start
                </div>
              </div>

              {/* Right half */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  width: '50%',
                  height: '100%',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  backgroundColor: '#FFF8E7',
                  border: '6px solid #000000',
                  borderRadius: '0 24px 24px 0',
                  transform: `translateX(${splitGap}px)`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -45,
                    left: shineOffset - 450,
                    width: 92,
                    height: 430,
                    opacity: shineOpacity,
                    backgroundColor: '#F1F333',
                    transform: 'skewX(-22deg)',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    top: 49,
                    left: 20,
                    fontSize: 48,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    textDecorationThickness: 6,
                    textUnderlineOffset: 8,
                  }}
                >
                  Years
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: -5,
                    right: 42,
                    top: 221,
                    height: 9,
                    backgroundColor: '#23A094',
                    borderTop: '3px solid #000000',
                    borderBottom: '3px solid #000000',
                    boxSizing: 'border-box',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    right: 31,
                    top: 207,
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    backgroundColor: '#F1F333',
                    border: '5px solid #000000',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    right: 27,
                    bottom: 31,
                    fontSize: 15,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  Now
                </div>
              </div>

              {/* Temporary one-year split label */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 8,
                  left: '50%',
                  top: 248,
                  padding: '8px 12px',
                  opacity: gapLabelOpacity,
                  backgroundColor: '#FF90E8',
                  border: '4px solid #000000',
                  borderRadius: 8,
                  boxShadow: '4px 4px 0 #000000',
                  transform: `translateX(-50%) rotate(-3deg) scale(${
                    0.8 + gapLabelOpacity * 0.2
                  })`,
                  fontSize: 14,
                  fontWeight: 950,
                  letterSpacing: 1.5,
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                1 Year Apart
              </div>

              {/* Pulsing rejoined seam */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 7,
                  left: '50%',
                  top: 183,
                  width: 7,
                  height: 82,
                  opacity: seamOpacity,
                  backgroundColor: '#000000',
                  transform: `translateX(-50%) scaleY(${0.88 + seamPulse * 0.16})`,
                  boxShadow: `0 0 0 ${3 + seamPulse * 6}px rgba(241, 243, 51, ${
                    0.35 + seamPulse * 0.45
                  })`,
                }}
              />

              {/* Continuously traveling playhead */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  left: `${playheadLeft}%`,
                  top: 197,
                  opacity: playheadOpacity,
                  transform: `translateX(-50%) scale(${0.92 + seamPulse * 0.1})`,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 52,
                    margin: '0 auto',
                    backgroundColor: '#000000',
                  }}
                />
                <div
                  style={{
                    width: 26,
                    height: 26,
                    marginTop: -39,
                    borderRadius: '50%',
                    backgroundColor: '#FF90E8',
                    border: '4px solid #000000',
                    boxShadow: '3px 3px 0 #000000',
                  }}
                />
              </div>
            </div>

            {/* Cursor reconnect click */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  left: '52%',
                  top: '53%',
                  opacity: cursorOpacity,
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${
                    cursorClicking ? 0.78 : 1
                  })`,
                  filter: `drop-shadow(${cursorClicking ? 2 : 7}px ${
                    cursorClicking ? 2 : 7
                  }px 0 #FF90E8)`,
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  stroke="#FFF8E7"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                >
                  <path d="M4 3.5L11.4 21l2.45-7.1L21 11.45 4 3.5z" />
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: '15px 28px',
              marginBottom: 2,
              backgroundColor: '#000000',
              border: '4px solid #000000',
              borderRadius: 14,
              boxShadow: `${
                6 + Math.sin(frame * 0.18) * 2
              }px ${6 + Math.sin(frame * 0.18) * 2}px 0 #23A094`,
              transform: `scale(${footerEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px)`,
            }}
          >
            <span
              style={{
                color: '#FFF8E7',
                fontSize: 22,
                fontWeight: 950,
                letterSpacing: 1.7,
                lineHeight: 1.15,
                textAlign: 'center',
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationColor: '#FF90E8',
                textDecorationThickness: 4,
                textUnderlineOffset: 6,
              }}
            >
              One year apart. Still chose us.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}