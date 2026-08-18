import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene32() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: punch-in entrance with a sharp spring overshoot.
  const cardEntrance = spring({
    frame,
    fps,
    config: {
      damping: 8,
      stiffness: 280,
      mass: 0.55,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 10,
      stiffness: 300,
      mass: 0.45,
    },
  });

  const footerEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 11,
      stiffness: 260,
      mass: 0.5,
    },
  });

  const entrancePunch = interpolate(
    frame,
    [0, 10, 20, 30],
    [0.72, 1.12, 0.97, 1],
    clamp,
  );

  // Beat 2: race from 00 to 16 hours.
  const hours = Math.floor(
    interpolate(frame, [30, 68], [0, 16.99], clamp),
  );
  const formattedHours = String(Math.min(hours, 16)).padStart(2, '0');

  // The card compresses sharply as the workload lands.
  const compression = interpolate(
    frame,
    [48, 56, 62, 72],
    [0, 1, 0.45, 0],
    clamp,
  );

  const warningEntrance = spring({
    frame: frame - 58,
    fps,
    config: {
      damping: 7,
      stiffness: 360,
      mass: 0.42,
    },
  });

  const warningSlapRotation = interpolate(
    frame,
    [58, 61, 65, 70],
    [-13, 5, -3, -2],
    clamp,
  );

  // Beat 3: persistent living physics and hard stepped sag.
  const beat3 = frame >= 84;
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.5;
  const shadowPulse = Math.sin(frame * 0.18) * 3;

  const sagStep = beat3
    ? Math.min(30, Math.floor((frame - 84) / 8) * 5)
    : 0;

  const sagScaleY = beat3
    ? 1 - Math.min(0.075, Math.floor((frame - 84) / 10) * 0.0125)
    : 1;

  const digitTwitchX = beat3
    ? [0, -3, 4, -2, 2, 0][Math.floor(frame / 3) % 6]
    : 0;

  const digitTwitchRotation = beat3
    ? [0, -0.8, 0.9, -0.4][Math.floor(frame / 4) % 4]
    : 0;

  const warningPound = beat3 && frame % 16 < 4 ? 1.08 : 1;
  const warningThunk = beat3 && frame % 16 < 4 ? 5 : 0;

  const shineCycle = (frame + 14) % 62;
  const shineOffset = interpolate(
    shineCycle,
    [0, 62],
    [-260, 880],
    clamp,
  );

  const baseShadow = 16 - compression * 11;
  const sagShadowLoss = sagStep * 0.16;
  const shadowDepth = Math.max(
    4,
    baseShadow + shadowPulse - sagShadowLoss,
  );

  const cardScaleX = 1 + compression * 0.035;
  const cardScaleY = (1 - compression * 0.1) * sagScaleY;

  // Hard final exit.
  const exitX = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, 120],
    clamp,
  );

  const sceneOpacity = interpolate(
    frame,
    [0, 4, durationInFrames - 6, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        opacity: sceneOpacity,
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
          transform: `translateX(${exitX}px)`,
        }}
      >
        {/* Tier 1: category button */}
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
              gap: 16,
              padding: '10px 24px',
              backgroundColor: '#F1F333',
              border: '4px solid #000000',
              borderRadius: 14,
              boxShadow: `${6 + Math.sin(frame * 0.16) * 2}px ${
                6 + Math.sin(frame * 0.16) * 2
              }px 0 #23A094`,
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12 + 0.8) * 3
              }px) rotate(${Math.sin(frame * 0.07) * 0.7}deg)`,
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                flex: '0 0 auto',
                borderRadius: '50%',
                backgroundColor: '#000000',
              }}
            />
            <span
              style={{
                fontSize: 18,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Workload Audit
            </span>
          </div>
        </div>

        {/* Tier 2: one hero card */}
        <div
          style={{
            flex: '0 0 65%',
            width: '100%',
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 'min(82%, 780px)',
              position: 'relative',
              transform: `
                translateY(${hoverY + sagStep}px)
                rotate(${hoverTilt}deg)
                scale(${cardEntrance * entrancePunch})
              `,
              transformOrigin: '50% 60%',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: 330,
                padding: '38px 34px 42px',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                backgroundColor: '#FF90E8',
                border: '6px solid #000000',
                borderRadius: 24,
                boxShadow: `${shadowDepth}px ${shadowDepth}px 0 #000000`,
                transform: `scaleX(${cardScaleX}) scaleY(${cardScaleY})`,
                transformOrigin: '50% 100%',
              }}
            >
              {/* Continuous traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -30,
                  bottom: -30,
                  left: 0,
                  width: 86,
                  backgroundColor: '#FFF8E7',
                  opacity: 0.42,
                  transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  fontSize: 22,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  textDecoration: 'underline',
                  textDecorationThickness: 4,
                  textUnderlineOffset: 7,
                  textAlign: 'center',
                }}
              >
                Daily Screen Time
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  gap: 16,
                  transform: `translateX(${digitTwitchX}px) rotate(${digitTwitchRotation}deg)`,
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(72px, 10vw, 116px)',
                    lineHeight: 0.9,
                    fontWeight: 950,
                    letterSpacing: -4,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {formattedHours}
                </span>
                <span
                  style={{
                    fontSize: 30,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  Hours
                </span>
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  marginTop: 8,
                  padding: '12px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  backgroundColor: '#F1F333',
                  border: '4px solid #000000',
                  borderRadius: 10,
                  boxShadow: `${
                    warningPound > 1 ? 3 : 7
                  }px ${warningPound > 1 ? 3 : 7}px 0 #000000`,
                  transform: `
                    translateY(${warningThunk}px)
                    rotate(${warningSlapRotation}deg)
                    scale(${warningEntrance * warningPound})
                  `,
                  transformOrigin: '50% 50%',
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 2.5,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  All By Myself
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: punchline button */}
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
              borderRadius: 14,
              boxShadow: `${
                7 + Math.sin(frame * 0.18) * 2
              }px ${7 + Math.sin(frame * 0.18) * 2}px 0 #23A094`,
              transform: `scale(${footerEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1.4) * 3
              }px)`,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: 22,
                lineHeight: 1.1,
                fontWeight: 950,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationColor: '#FF90E8',
                textDecorationThickness: 4,
                textUnderlineOffset: 6,
              }}
            >
              This Isn&apos;t Sustainable
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}