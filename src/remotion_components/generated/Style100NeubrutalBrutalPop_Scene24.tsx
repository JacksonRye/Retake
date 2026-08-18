import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene24() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — brutal spring entrance.
  const heroEntrance = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 260,
      mass: 0.55,
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
      stiffness: 240,
      mass: 0.55,
    },
  });

  // Beat 2 — cursor slam and decisive state switch.
  const cursorVisible = frame >= 25 && frame <= 75;
  const cursorX = interpolate(frame, [25, 44], [245, 30], clamp);
  const cursorY = interpolate(frame, [25, 44], [150, 20], clamp);
  const cursorRotation = interpolate(frame, [25, 44], [14, -5], clamp);

  const isClicking = frame >= 45 && frame <= 52;
  const normalLifeSelected = frame >= 51;

  const selectorShiftX =
    frame < 45 ? 0 : frame < 49 ? 22 : frame < 53 ? -10 : frame < 58 ? 6 : 0;
  const selectorShiftY =
    frame < 45 ? 0 : frame < 49 ? 12 : frame < 53 ? -5 : 0;
  const clickScale = isClicking ? 0.965 : 1;

  // Rigid grid vanishes instantly as the mode leaves BASE MODE.
  const gridOpacity = normalLifeSelected ? 0 : 1;
  const fieldScale = normalLifeSelected ? 1.04 : 0.96;

  // Beat 3 — living physics and repeated hard settling.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.5;
  const shadowPulse = 14 + Math.sin(frame * 0.18) * 3;

  const settlePhase = Math.max(0, frame - 84) % 24;
  const hardSettleY =
    frame < 84
      ? 0
      : settlePhase < 3
        ? 5
        : settlePhase < 6
          ? -3
          : settlePhase < 9
            ? 2
            : 0;

  const hardSettleRotation =
    frame < 84
      ? 0
      : settlePhase < 3
        ? -0.8
        : settlePhase < 6
          ? 0.65
          : settlePhase < 9
            ? -0.3
            : 0;

  const underlineCycle = ((frame - 80 + 120) % 42) / 42;
  const underlineWidth = normalLifeSelected
    ? interpolate(underlineCycle, [0, 0.55, 1], [24, 128, 24], clamp)
    : 70;
  const underlineX = normalLifeSelected
    ? interpolate(underlineCycle, [0, 1], [-44, 44], clamp)
    : 0;

  const shineOffset = interpolate(
    (frame + 14) % 58,
    [0, 58],
    [-190, 760],
    clamp,
  );

  const tealFlashPhase = Math.max(0, frame - 82) % 28;
  const tealEdgeVisible =
    frame >= 82 && (tealFlashPhase < 4 || (tealFlashPhase >= 11 && tealFlashPhase < 14));

  const edgeWidth = tealEdgeVisible ? 10 : 0;
  const edgeOffset = tealEdgeVisible ? 8 : 0;

  const exitY = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -55],
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
        backgroundColor: '#FFF8E7',
        color: '#000000',
        opacity,
        padding: '80px 20px',
        boxSizing: 'border-box',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, system-ui, sans-serif',
      }}
    >
      <div
        style={{
          width: '88%',
          maxWidth: 920,
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          transform: `translateY(${exitY}px)`,
        }}
      >
        {/* Tier 1 — category pill */}
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
              padding: '10px 22px',
              backgroundColor: '#F1F333',
              border: '4px solid #000000',
              borderRadius: 12,
              boxShadow: '6px 6px 0 #000000',
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px)`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: normalLifeSelected ? '#23A094' : '#000000',
                border: '2px solid #000000',
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 950,
                letterSpacing: 2.8,
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              ACTIVATION CODE
            </span>
          </div>
        </div>

        {/* Tier 2 — one LIFE MODE selector hero */}
        <div
          style={{
            flex: '1 1 65%',
            width: '100%',
            minHeight: 0,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            backgroundImage: `linear-gradient(
                rgba(0,0,0,${0.13 * gridOpacity}) 4px,
                transparent 4px
              ),
              linear-gradient(
                90deg,
                rgba(0,0,0,${0.13 * gridOpacity}) 4px,
                transparent 4px
              )`,
            backgroundSize: '56px 56px',
            transform: `scale(${fieldScale})`,
          }}
        >
          <div
            style={{
              width: '82%',
              maxWidth: 750,
              position: 'relative',
              transform: `
                translate(${selectorShiftX}px, ${
                  selectorShiftY + hoverY + hardSettleY
                }px)
                rotate(${hoverTilt + hardSettleRotation}deg)
                scale(${heroEntrance * clickScale})
              `,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: `${-edgeOffset}px`,
                border: `${edgeWidth}px solid #23A094`,
                borderRadius: 29,
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                width: '100%',
                minHeight: 280,
                padding: '34px 38px 38px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 24,
                backgroundColor: '#FF90E8',
                border: '6px solid #000000',
                borderRadius: 22,
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -20,
                  bottom: -20,
                  left: 0,
                  width: 100,
                  backgroundColor: 'rgba(255,255,255,0.32)',
                  transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  fontSize: 25,
                  fontWeight: 950,
                  letterSpacing: 5,
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                Life Mode
              </div>

              <div
                style={{
                  width: '100%',
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: 16,
                  padding: 10,
                  boxSizing: 'border-box',
                  backgroundColor: '#000000',
                  border: '4px solid #000000',
                  borderRadius: 15,
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minHeight: 96,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 14px',
                    boxSizing: 'border-box',
                    border: '4px solid #000000',
                    borderRadius: 9,
                    backgroundColor: normalLifeSelected ? '#FFF8E7' : '#F1F333',
                    color: '#000000',
                    boxShadow: normalLifeSelected
                      ? 'none'
                      : '6px 6px 0 #23A094',
                    fontSize: 25,
                    fontWeight: 950,
                    letterSpacing: 1.6,
                    lineHeight: 1,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  BASE MODE
                </div>

                <div
                  style={{
                    flex: 1,
                    minHeight: 96,
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '16px 14px',
                    boxSizing: 'border-box',
                    border: '4px solid #000000',
                    borderRadius: 9,
                    backgroundColor: normalLifeSelected ? '#F1F333' : '#FFF8E7',
                    color: '#000000',
                    boxShadow: normalLifeSelected
                      ? '6px 6px 0 #23A094'
                      : 'none',
                    fontSize: 25,
                    fontWeight: 950,
                    letterSpacing: 1.2,
                    lineHeight: 1,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                  }}
                >
                  NORMAL LIFE

                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      bottom: 13,
                      width: underlineWidth,
                      height: 6,
                      borderRadius: 0,
                      backgroundColor: '#000000',
                      transform: `translateX(calc(-50% + ${underlineX}px))`,
                    }}
                  />
                </div>
              </div>
            </div>

            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: '12%',
                  bottom: '1%',
                  zIndex: 10,
                  filter: isClicking
                    ? 'drop-shadow(2px 2px 0 #23A094)'
                    : 'drop-shadow(7px 7px 0 #23A094)',
                  transform: `
                    translate(${cursorX}px, ${cursorY}px)
                    rotate(${cursorRotation}deg)
                    scale(${isClicking ? 0.82 : 1})
                  `,
                }}
              >
                <svg
                  width="62"
                  height="70"
                  viewBox="0 0 48 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 3L42 31L26 34L34 49L24 54L16 38L5 49V3Z"
                    fill="#000000"
                    stroke="#FFF8E7"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3 — punchline */}
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
              backgroundColor: '#000000',
              border: '4px solid #000000',
              borderRadius: 13,
              boxShadow: '7px 7px 0 #23A094',
              transform: `scale(${footerEntrance}) translateY(${
                Math.sin(frame * 0.12 + 2) * 3
              }px)`,
            }}
          >
            <span
              style={{
                color: '#FFF8E7',
                fontSize: 23,
                fontWeight: 950,
                letterSpacing: 2,
                lineHeight: 1.1,
                textAlign: 'center',
                textDecoration: 'underline',
                textDecorationColor: '#FF90E8',
                textDecorationThickness: 5,
                textUnderlineOffset: 7,
                whiteSpace: 'nowrap',
              }}
            >
              CHOOSE THE LIFE THAT FITS
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}