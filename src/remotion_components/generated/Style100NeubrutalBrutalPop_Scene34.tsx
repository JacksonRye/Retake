import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene34() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames, width} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: upward launch and shadow slam.
  const entrance = spring({
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

  const launchY = interpolate(frame, [0, 13, 22], [170, -18, 0], clamp);
  const slamWindow = frame >= 13 && frame < 18;
  const slamY = slamWindow ? 10 : 0;

  // Beat 2: exponential multiplication to 100,000.
  const countProgress = interpolate(frame, [27, 70], [0, 1], clamp);
  const count =
    frame < 27
      ? 1
      : Math.min(
          100000,
          Math.max(1, Math.round(Math.pow(10, countProgress * 5))),
        );

  const formattedCount = count.toLocaleString('en-US');
  const peopleLabel = count === 1 ? 'PERSON' : 'PEOPLE';

  const cardWidth = interpolate(frame, [28, 68], [68, 100], clamp);

  const stampEntrance = spring({
    frame: frame - 52,
    fps,
    config: {
      damping: 8,
      stiffness: 340,
      mass: 0.45,
    },
  });

  // Cursor arrives and creates a physical shadow thunk.
  const cursorVisible = frame >= 38 && frame <= 72;
  const cursorX = interpolate(frame, [38, 54], [155, 0], clamp);
  const cursorY = interpolate(frame, [38, 54], [120, 0], clamp);
  const isClicking = frame >= 55 && frame <= 60;
  const clickScale = isClicking ? 0.965 : 1;
  const clickY = isClicking ? 10 : 0;

  // Beat 3: continuous living physics.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.35;
  const shadowPulse = 14 + Math.sin(frame * 0.18) * 4;

  // Deliberately stepped scale breaths for a hard-snap brutalist rhythm.
  const breathPhase = Math.sin(frame * 0.24);
  const hardBreath =
    frame < 84 ? 1 : breathPhase > 0.45 ? 1.035 : breathPhase < -0.45 ? 0.985 : 1;

  const borderFlashing = frame >= 84 && Math.floor((frame - 84) / 5) % 2 === 0;
  const borderColor = borderFlashing ? '#F1F333' : '#000000';

  const shineOffset = interpolate(
    (frame + 12) % 58,
    [0, 58],
    [-260, 1050],
    clamp,
  );

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, 1],
    clamp,
  );
  const sceneOpacity = interpolate(
    frame,
    [0, 4, durationInFrames - 7, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );
  const exitY = interpolate(exitProgress, [0, 1], [0, -90], clamp);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);

  const counterFontSize = Math.min(126, width * 0.12);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
        opacity: sceneOpacity,
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
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
          transform: `translateY(${exitY}px) scale(${exitScale})`,
          transformOrigin: 'center',
        }}
      >
        {/* Tier 1 — Category badge */}
        <div
          style={{
            flexBasis: '15%',
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
              padding: '12px 26px',
              border: '4px solid #000000',
              borderRadius: 14,
              backgroundColor: '#FF90E8',
              boxShadow: '7px 7px 0 #000000',
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px)`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: '#23A094',
                border: '3px solid #000000',
              }}
            />
            <span
              style={{
                fontSize: 20,
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

        {/* Tier 2 — The single hero counter-card */}
        <div
          style={{
            flexBasis: '65%',
            width: '100%',
            maxWidth: 960,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${cardWidth}%`,
              position: 'relative',
              transform: `translateY(${
                launchY + slamY + clickY + hoverY
              }px) rotate(${hoverTilt}deg) scale(${
                entrance * clickScale * hardBreath
              })`,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: 330,
                padding: '38px 28px',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                border: `8px solid ${borderColor}`,
                borderRadius: 24,
                backgroundColor: '#FFF8E7',
                boxShadow: `${
                  isClicking ? 5 : shadowPulse
                }px ${isClicking ? 5 : shadowPulse}px 0 #000000`,
              }}
            >
              {/* Traveling shine sweep */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 110,
                  backgroundColor: 'rgba(241, 243, 51, 0.56)',
                  transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Cascading block-wave digits */}
              <div
                style={{
                  minHeight: counterFontSize * 1.05,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 0.9,
                  fontSize: counterFontSize,
                  fontWeight: 950,
                  letterSpacing: -5,
                  fontVariantNumeric: 'tabular-nums',
                  zIndex: 2,
                }}
              >
                {formattedCount.split('').map((character, index) => {
                  const cascadePhase =
                    frame >= 84 ? (frame - 84 + index * 3) % 18 : 12;
                  const cascadeY =
                    cascadePhase < 3 ? -12 : cascadePhase < 6 ? 9 : 0;
                  const blockShadow =
                    frame >= 84 && cascadePhase < 6
                      ? '0 8px 0 #FF90E8'
                      : '0 0 0 transparent';

                  return (
                    <span
                      key={`${index}-${character}`}
                      style={{
                        display: 'inline-block',
                        minWidth: character === ',' ? '0.28em' : '0.58em',
                        textAlign: 'center',
                        transform: `translateY(${cascadeY}px)`,
                        textShadow: blockShadow,
                      }}
                    >
                      {character}
                    </span>
                  );
                })}
              </div>

              <div
                style={{
                  zIndex: 2,
                  padding: '10px 26px',
                  border: '4px solid #000000',
                  borderRadius: 12,
                  backgroundColor: '#000000',
                  color: '#FFF8E7',
                  boxShadow: '5px 5px 0 #23A094',
                  fontSize: 27,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: 5,
                  textTransform: 'uppercase',
                }}
              >
                {peopleLabel}
              </div>

              <div
                style={{
                  zIndex: 2,
                  padding: '9px 22px',
                  border: '4px solid #000000',
                  borderRadius: 10,
                  backgroundColor: '#FF90E8',
                  boxShadow: '6px 6px 0 #000000',
                  fontSize: 20,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  textDecoration: 'underline',
                  textDecorationThickness: 3,
                  textUnderlineOffset: 4,
                  transform: `rotate(-2deg) scale(${stampEntrance})`,
                  transformOrigin: 'center',
                }}
              >
                Large Numbers
              </div>
            </div>

            {/* Cursor click */}
            {cursorVisible ? (
              <div
                style={{
                  position: 'absolute',
                  right: '13%',
                  bottom: '7%',
                  zIndex: 20,
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${
                    isClicking ? 0.82 : 1
                  })`,
                  filter: `drop-shadow(${isClicking ? 2 : 7}px ${
                    isClicking ? 2 : 7
                  }px 0 #FF90E8)`,
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  stroke="#FFF8E7"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                >
                  <path d="M4 3.5L11.2 21l2.7-7.3 7.1-2.8L4 3.5z" />
                </svg>
              </div>
            ) : null}
          </div>
        </div>

        {/* Tier 3 — Punchline */}
        <div
          style={{
            flexBasis: '20%',
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
              border: '4px solid #000000',
              borderRadius: 15,
              backgroundColor: '#23A094',
              boxShadow: `${6 + Math.sin(frame * 0.18) * 2}px ${
                6 + Math.sin(frame * 0.18) * 2
              }px 0 #000000`,
              transform: `scale(${entrance}) translateY(${
                Math.sin(frame * 0.12 + 2) * 3
              }px)`,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: 23,
                lineHeight: 1.1,
                fontWeight: 950,
                letterSpacing: 2.5,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationThickness: 3,
                textUnderlineOffset: 5,
              }}
            >
              Impact That Multiplies
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}