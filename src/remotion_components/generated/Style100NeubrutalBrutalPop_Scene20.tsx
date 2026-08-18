import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene20() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — quarter-turn entrance and overshoot lock.
  const targetEntrance = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 230,
      mass: 0.62,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.52,
    },
  });

  const footerEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 12,
      stiffness: 240,
      mass: 0.58,
    },
  });

  const entranceRotation = -90 * (1 - targetEntrance);
  const entranceScale = 0.42 + targetEntrance * 0.58;

  // Beat 2 — dart punches into the CONTROL center.
  const dartX = interpolate(frame, [30, 43, 47], [310, 65, 0], clamp);
  const dartY = interpolate(frame, [30, 43, 47], [-260, -55, 0], clamp);
  const dartRotation = interpolate(frame, [30, 47], [-8, 0], clamp);
  const dartOpacity = interpolate(frame, [28, 31], [0, 1], clamp);

  const impactThunk = interpolate(
    frame,
    [44, 47, 50, 54],
    [0, 13, -5, 0],
    clamp,
  );

  const shockProgress = interpolate(frame, [46, 56], [0, 1], clamp);
  const shockOpacity = interpolate(
    frame,
    [45, 47, 53, 60],
    [0, 1, 0.75, 0],
    clamp,
  );

  const stampEntrance = spring({
    frame: frame - 49,
    fps,
    config: {
      damping: 8,
      stiffness: 290,
      mass: 0.48,
    },
  });

  const stampOpacity = interpolate(frame, [48, 50], [0, 1], clamp);
  const stampRotation = interpolate(frame, [48, 52], [-18, -7], clamp);

  // Beat 3 — continuously living target physics.
  const livingAmount = interpolate(frame, [78, 86], [0, 1], clamp);
  const hoverY = Math.sin(frame * 0.12) * 6 * livingAmount;
  const hoverTilt = Math.sin(frame * 0.08) * 1.5 * livingAmount;
  const shadowPulse = 15 + Math.sin(frame * 0.18) * 4 * livingAmount;

  const ringTick =
    frame >= 84 ? Math.floor((frame - 84) / 7) % 2 : 0;

  const pinkRing = ringTick === 0 ? '#FF90E8' : '#23A094';
  const tealRing = ringTick === 0 ? '#23A094' : '#FF90E8';

  const vibrationSteps = [
    {x: -3, y: 2, rotation: -1.2},
    {x: 3, y: -2, rotation: 1.1},
    {x: -2, y: -1, rotation: -0.7},
    {x: 2, y: 2, rotation: 0.8},
  ];

  const vibrationIndex =
    frame >= 84 ? Math.floor((frame - 84) / 3) % vibrationSteps.length : 0;

  const vibration =
    frame >= 84
      ? vibrationSteps[vibrationIndex]
      : {x: 0, y: 0, rotation: 0};

  const shineOffset = interpolate(
    (frame + 14) % 62,
    [0, 62],
    [-190, 690],
    clamp,
  );

  // Final hard spin-out.
  const exitRotation = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [0, 135],
    clamp,
  );

  const exitScale = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0.45],
    clamp,
  );

  const sceneOpacity = interpolate(
    frame,
    [0, 4, durationInFrames - 5, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        opacity: sceneOpacity,
        color: '#000000',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          padding: '80px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Tier 1 — category badge */}
        <div
          style={{
            height: '15%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: '11px 24px',
              border: '4px solid #000000',
              borderRadius: 12,
              backgroundColor: '#FF90E8',
              boxShadow: '7px 7px 0 #000000',
              transform: `translateY(${
                Math.sin(frame * 0.12) * 2
              }px) scale(${badgeEntrance})`,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                flexShrink: 0,
                borderRadius: 2,
                backgroundColor: '#F1F333',
                border: '3px solid #000000',
              }}
            />
            <div
              style={{
                fontSize: 20,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Activation Code
            </div>
          </div>
        </div>

        {/* Tier 2 — one oversized neubrutal dartboard hero */}
        <div
          style={{
            width: '100%',
            height: '65%',
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 'min(58vh, 560px)',
              aspectRatio: '1 / 1',
              position: 'relative',
              transform: `translateY(${hoverY + impactThunk}px) rotate(${
                entranceRotation + hoverTilt + exitRotation
              }deg) scale(${entranceScale * exitScale})`,
              transformOrigin: 'center',
            }}
          >
            {/* Yellow square impact shockwave */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 150,
                height: 150,
                boxSizing: 'border-box',
                border: '14px solid #F1F333',
                backgroundColor: 'transparent',
                opacity: shockOpacity,
                transform: `translate(-50%, -50%) rotate(45deg) scale(${
                  0.55 + shockProgress * 2.2
                })`,
                zIndex: 8,
              }}
            />

            {/* Flat target */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: pinkRing,
                border: '8px solid #000000',
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
                transition: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '10%',
                  borderRadius: '50%',
                  backgroundColor: '#F1F333',
                  border: '7px solid #000000',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: '23%',
                  borderRadius: '50%',
                  backgroundColor: tealRing,
                  border: '7px solid #000000',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: '36%',
                  borderRadius: '50%',
                  backgroundColor: '#FF90E8',
                  border: '7px solid #000000',
                }}
              />

              {/* CONTROL bullseye */}
              <div
                style={{
                  position: 'absolute',
                  inset: '43%',
                  minWidth: 78,
                  minHeight: 78,
                  borderRadius: '50%',
                  backgroundColor: '#000000',
                  border: '6px solid #FFF8E7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 7,
                }}
              >
                <div
                  style={{
                    color: '#FFF8E7',
                    fontSize: 13,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 1.3,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  Control
                </div>
              </div>

              {/* Continuous traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10%',
                  bottom: '-10%',
                  left: 0,
                  width: 88,
                  zIndex: 6,
                  opacity: 0.42,
                  backgroundColor: '#FFFFFF',
                  transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              {/* PERFECT LIMIT sticker stamp */}
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: '13%',
                  zIndex: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  padding: '10px 18px',
                  border: '5px solid #000000',
                  borderRadius: 8,
                  backgroundColor: '#F1F333',
                  boxShadow: '6px 6px 0 #000000',
                  opacity: stampOpacity,
                  transform: `translateX(-50%) rotate(${stampRotation}deg) scale(${stampEntrance})`,
                  transformOrigin: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <div
                  style={{
                    fontSize: 20,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                  }}
                >
                  Perfect Limit
                </div>
              </div>
            </div>

            {/* Single embedded graphic dart */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 250,
                height: 110,
                zIndex: 20,
                opacity: dartOpacity,
                transform: `translate(-4px, -87px) translate(${
                  dartX + vibration.x
                }px, ${dartY + vibration.y}px) rotate(${
                  dartRotation + vibration.rotation
                }deg)`,
                transformOrigin: '4px 87px',
              }}
            >
              <svg
                width="250"
                height="110"
                viewBox="0 0 250 110"
                style={{overflow: 'visible'}}
              >
                <path
                  d="M12 86 L192 24"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="15"
                  strokeLinecap="square"
                />
                <path
                  d="M7 88 L37 63 L30 94 Z"
                  fill="#F1F333"
                  stroke="#000000"
                  strokeWidth="6"
                  strokeLinejoin="miter"
                />
                <path
                  d="M181 28 L211 2 L224 32 L199 41 Z"
                  fill="#FF90E8"
                  stroke="#000000"
                  strokeWidth="6"
                  strokeLinejoin="miter"
                />
                <path
                  d="M196 40 L231 31 L236 65 L207 54 Z"
                  fill="#23A094"
                  stroke="#000000"
                  strokeWidth="6"
                  strokeLinejoin="miter"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Tier 3 — punchline */}
        <div
          style={{
            height: '20%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: 16,
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
              backgroundColor: '#23A094',
              boxShadow: `${
                7 + Math.sin(frame * 0.18) * 2
              }px ${7 + Math.sin(frame * 0.18) * 2}px 0 #000000`,
              transform: `translateY(${
                Math.sin(frame * 0.12 + 1.4) * 3
              }px) scale(${footerEntrance})`,
            }}
          >
            <div
              style={{
                color: '#FFF8E7',
                fontSize: 24,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationThickness: 4,
                textUnderlineOffset: 6,
                whiteSpace: 'nowrap',
              }}
            >
              Hit The Control
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}