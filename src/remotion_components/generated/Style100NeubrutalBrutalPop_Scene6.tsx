import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene6() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — rigid drop, overshoot, oversized shadow.
  const heroEntrance = spring({
    frame,
    fps,
    config: {
      damping: 9,
      stiffness: 230,
      mass: 0.72,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 4,
    fps,
    config: {
      damping: 10,
      stiffness: 250,
      mass: 0.55,
    },
  });

  const footerEntrance = spring({
    frame: frame - 9,
    fps,
    config: {
      damping: 11,
      stiffness: 230,
      mass: 0.58,
    },
  });

  const entranceDrop = interpolate(heroEntrance, [0, 1], [-520, 0], clamp);
  const entranceScale = interpolate(heroEntrance, [0, 1], [0.76, 1], clamp);

  // Beat 2 — cursor arrives and stamps the mission into the command badge.
  const cursorVisible = frame >= 27 && frame <= 69;
  const cursorX = interpolate(frame, [27, 43], [290, 34], clamp);
  const cursorY = interpolate(frame, [27, 43], [220, 42], clamp);
  const isStamping = frame >= 44 && frame <= 50;
  const stampFrame = frame - 46;

  const stampEntrance = spring({
    frame: stampFrame,
    fps,
    config: {
      damping: 8,
      stiffness: 300,
      mass: 0.45,
    },
  });

  const badgeExpansion = spring({
    frame: frame - 46,
    fps,
    config: {
      damping: 8,
      stiffness: 260,
      mass: 0.6,
    },
  });

  const stampScale = interpolate(stampEntrance, [0, 1], [2.25, 1], clamp);
  const stampRotation = interpolate(stampEntrance, [0, 1], [-8, -1.5], clamp);
  const pressDepth = isStamping ? 11 : 0;

  const shockProgress = interpolate(frame, [45, 51, 67], [0, 1, 0], clamp);
  const shockScale = interpolate(frame, [45, 67], [0.9, 1.14], clamp);

  // Beat 3 — continuous hover, marching two-step, shadow stomps and shine.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const subtleTilt = Math.sin(frame * 0.08) * 1.2;
  const inMarch = frame >= 84;
  const marchStep = Math.floor(Math.max(0, frame - 84) / 8) % 2;
  const marchTilt = inMarch ? (marchStep === 0 ? -2.4 : 2.4) : 0;
  const marchLift = inMarch ? (marchStep === 0 ? -3 : 3) : 0;
  const shadowStomp = inMarch ? (marchStep === 0 ? 18 : 9) : 16;
  const shadowPulse = shadowStomp + Math.sin(frame * 0.18) * 2.5;

  const shineX = interpolate((frame + 14) % 62, [0, 61], [-28, 120], clamp);
  const underlineX = interpolate((frame - 84 + 56) % 56, [0, 55], [-38, 112], clamp);

  // Final hard downward snap.
  const finalSnap = frame >= durationInFrames - 7 ? 190 : 0;
  const contentOpacity = interpolate(
    frame,
    [0, 3, durationInFrames - 4, durationInFrames],
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
          opacity: contentOpacity,
          transform: `translateY(${finalSnap}px)`,
        }}
      >
        {/* Tier 1 — category button */}
        <div
          style={{
            flex: '0 0 15%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              transform: `translateY(${Math.sin(frame * 0.12 + 1) * 3}px) scale(${badgeEntrance})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '11px 24px',
              backgroundColor: '#FF90E8',
              border: '4px solid #000000',
              borderRadius: 12,
              boxShadow: '7px 7px 0 #000000',
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                backgroundColor: '#F1F333',
                border: '3px solid #000000',
                borderRadius: 2,
              }}
            />
            <span
              style={{
                fontSize: 19,
                fontWeight: 950,
                letterSpacing: 2.5,
                lineHeight: 1,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            >
              Mission authenticated
            </span>
          </div>
        </div>

        {/* Tier 2 — singular hero command badge */}
        <div
          style={{
            flex: '0 0 65%',
            width: '100%',
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 'min(86%, 900px)',
              transform: `
                translateY(${entranceDrop + hoverY + marchLift}px)
                rotate(${subtleTilt + marchTilt}deg)
                scale(${entranceScale})
              `,
              transformOrigin: 'center',
            }}
          >
            {/* Pink impact shock frame */}
            <div
              style={{
                position: 'absolute',
                inset: -20,
                border: '12px solid #FF90E8',
                borderRadius: 30,
                opacity: shockProgress,
                transform: `scale(${shockScale})`,
                boxShadow: '10px 10px 0 #000000',
              }}
            />

            <div
              style={{
                position: 'relative',
                width: '100%',
                minHeight: 330,
                padding: '44px 36px 40px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                backgroundColor: '#23A094',
                border: '7px solid #000000',
                borderRadius: 24,
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
                transform: `
                  translateY(${pressDepth}px)
                  scale(${1 + badgeExpansion * 0.035})
                `,
              }}
            >
              {/* Continuous traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -50,
                  bottom: -50,
                  left: `${shineX}%`,
                  width: 100,
                  opacity: 0.42,
                  backgroundColor: '#FFF8E7',
                  transform: 'skewX(-18deg)',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '8px 18px',
                  backgroundColor: '#F1F333',
                  border: '4px solid #000000',
                  borderRadius: 9,
                  boxShadow: '5px 5px 0 #000000',
                  fontSize: 'clamp(28px, 4.4vw, 54px)',
                  fontWeight: 950,
                  lineHeight: 1.05,
                  letterSpacing: 1.2,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Perry&apos;s Powerhouse
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  minHeight: 112,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    opacity: stampEntrance,
                    transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
                    padding: '15px 24px',
                    backgroundColor: '#FFF8E7',
                    border: '6px solid #000000',
                    borderRadius: 10,
                    boxShadow: '8px 8px 0 #FF90E8',
                    color: '#000000',
                    fontSize: 'clamp(38px, 6.8vw, 80px)',
                    fontWeight: 950,
                    lineHeight: 0.95,
                    letterSpacing: 1.5,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  Help Veterans
                </div>

                {/* Yellow underline chase */}
                <div
                  style={{
                    width: '72%',
                    height: 13,
                    overflow: 'hidden',
                    position: 'relative',
                    backgroundColor: '#000000',
                    border: '3px solid #000000',
                    borderRadius: 2,
                    opacity: stampEntrance,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: `${underlineX}%`,
                      width: '40%',
                      backgroundColor: '#F1F333',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Stamping cursor */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: 70,
                  bottom: 34,
                  zIndex: 10,
                  transform: `
                    translate(${cursorX}px, ${cursorY}px)
                    scale(${isStamping ? 0.78 : 1})
                  `,
                  filter: isStamping
                    ? 'drop-shadow(2px 2px 0 #000000)'
                    : 'drop-shadow(7px 7px 0 #000000)',
                }}
              >
                <svg
                  width="68"
                  height="68"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M7 4L39 27L27 30L22 43L7 4Z"
                    fill="#FF90E8"
                    stroke="#000000"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3 — activation-code CTA */}
        <div
          style={{
            flex: '0 0 20%',
            width: '100%',
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              transform: `
                translateY(${Math.sin(frame * 0.12 + 2) * 3}px)
                rotate(${Math.sin(frame * 0.08 + 1) * 0.7}deg)
                scale(${footerEntrance})
              `,
              padding: '14px 28px',
              backgroundColor: '#000000',
              border: '4px solid #000000',
              borderRadius: 12,
              boxShadow: '7px 7px 0 #F1F333',
              color: '#FFF8E7',
              fontSize: 22,
              fontWeight: 950,
              letterSpacing: 2.5,
              lineHeight: 1.15,
              textAlign: 'center',
              textDecoration: 'underline',
              textDecorationColor: '#FF90E8',
              textDecorationThickness: 5,
              textUnderlineOffset: 7,
              textTransform: 'uppercase',
            }}
          >
            Activation code: Service first
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}