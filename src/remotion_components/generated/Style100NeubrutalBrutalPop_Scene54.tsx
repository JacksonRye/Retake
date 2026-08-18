import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene54() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: Hard slam to 120%, then spring-settle.
  const slamProgress = interpolate(frame, [0, 5], [0, 1], clamp);
  const slamScale = interpolate(slamProgress, [0, 1], [0.25, 1.2], clamp);
  const settle = spring({
    frame: frame - 5,
    fps,
    from: 1.2,
    to: 1,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.55,
    },
  });
  const heroScale = frame < 5 ? slamScale : settle;

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 10,
      stiffness: 260,
      mass: 0.45,
    },
  });

  const footerEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 11,
      stiffness: 230,
      mass: 0.5,
    },
  });

  const shockStrength = interpolate(frame, [3, 7, 16], [0, 22, 10], clamp);

  // Beat 2: Cursor click, state switch, and payout roll-up.
  const clickFrame = 48;
  const isClicking = frame >= clickFrame && frame <= clickFrame + 5;
  const isSuccessful = frame >= clickFrame + 2;

  const payout = Math.round(
    interpolate(frame, [clickFrame + 2, 78], [0, 4500], clamp),
  );

  const cursorVisible = frame >= 25 && frame <= 68;
  const cursorX = interpolate(frame, [25, 44], [150, 0], clamp);
  const cursorY = interpolate(frame, [25, 44], [115, 0], clamp);
  const cursorOpacity = interpolate(
    frame,
    [25, 28, 62, 68],
    [0, 1, 1, 0],
    clamp,
  );

  const clickThunk = isClicking ? 10 : 0;
  const statusScale = isClicking ? 0.91 : 1;

  // Beat 3: Continuously living physics.
  const beat3Active = frame >= 84;
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.25;

  const rhythmStep = Math.floor((frame - 84) / 7);
  const amountPulse =
    beat3Active && rhythmStep % 2 === 0
      ? 1.055
      : beat3Active
        ? 0.985
        : 1;

  const alternatingShadow =
    beat3Active && rhythmStep % 2 === 0 ? 18 : beat3Active ? 10 : 13;
  const shadowPulse = alternatingShadow + Math.sin(frame * 0.18) * 2.5;

  const shineOffset = interpolate(
    (frame + 18) % 62,
    [0, 62],
    [-220, 980],
    clamp,
  );

  const underlineTravel = beat3Active
    ? interpolate((frame - 84) % 24, [0, 12, 24], [18, 100, 18], clamp)
    : isSuccessful
      ? 100
      : 0;

  const underlineX = beat3Active
    ? interpolate((frame - 84) % 24, [0, 24], [-40, 105], clamp)
    : 0;

  // Hard exit.
  const exitStart = durationInFrames - 10;
  const exitX = interpolate(frame, [exitStart, durationInFrames], [0, 1100], clamp);
  const exitRotation = interpolate(
    frame,
    [exitStart, durationInFrames],
    [0, 7],
    clamp,
  );
  const opacity = interpolate(
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
        opacity,
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
        }}
      >
        {/* Tier 1: Category badge */}
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
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12) * 3
              }px)`,
              transformOrigin: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 25px',
              backgroundColor: '#F1F333',
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
                borderRadius: '50%',
                backgroundColor: '#23A094',
                border: '2px solid #000000',
              }}
            />
            <span
              style={{
                fontSize: 19,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Activation Code
            </span>
          </div>
        </div>

        {/* Tier 2: Single hero payout card */}
        <div
          style={{
            flex: '0 0 65%',
            width: '100%',
            maxWidth: 840,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              position: 'relative',
              transform: `translateX(${exitX}px) translateY(${
                hoverY + clickThunk
              }px) rotate(${hoverTilt + exitRotation}deg) scale(${heroScale})`,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: 380,
                padding: '44px 34px',
                boxSizing: 'border-box',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 22,
                backgroundColor: '#FF90E8',
                border: '6px solid #000000',
                borderRadius: 24,
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000, ${
                  shockStrength * -0.45
                }px ${shockStrength * 0.45}px 0 #F1F333`,
              }}
            >
              {/* Traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -50,
                  bottom: -50,
                  left: 0,
                  width: 105,
                  backgroundColor: 'rgba(255,255,255,0.42)',
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
                }}
              >
                Placement Payout
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  transform: `scale(${amountPulse})`,
                  transformOrigin: 'center',
                  fontSize: 92,
                  lineHeight: 0.95,
                  fontWeight: 950,
                  letterSpacing: -4,
                  whiteSpace: 'nowrap',
                }}
              >
                £{payout.toLocaleString('en-GB')}
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  transform: `scale(${statusScale})`,
                  minWidth: 280,
                  padding: '13px 25px 17px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: isSuccessful ? '#23A094' : '#FFF8E7',
                  color: isSuccessful ? '#FFFFFF' : '#000000',
                  border: '4px solid #000000',
                  borderRadius: 12,
                  boxShadow: isClicking
                    ? '2px 2px 0 #000000'
                    : '7px 7px 0 #000000',
                }}
              >
                <span
                  style={{
                    fontSize: 21,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isSuccessful ? 'Job Placed · Success' : 'Job Placed · Pending'}
                </span>

                <div
                  style={{
                    width: '100%',
                    height: 5,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: isSuccessful
                      ? 'rgba(255,255,255,0.28)'
                      : '#FF90E8',
                    borderRadius: 999,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: beat3Active ? `${underlineX}%` : 0,
                      width: `${underlineTravel}%`,
                      backgroundColor: isSuccessful ? '#F1F333' : '#000000',
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Single click cursor */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: '15%',
                  bottom: '20%',
                  zIndex: 10,
                  opacity: cursorOpacity,
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${
                    isClicking ? 0.78 : 1
                  })`,
                  filter: isClicking
                    ? 'drop-shadow(2px 3px 0 #F1F333)'
                    : 'drop-shadow(6px 7px 0 #F1F333)',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="54"
                  height="54"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  stroke="#FFF8E7"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                >
                  <path d="M4 3.5L20.2 11.2L13.8 13.5L11.4 20.2L4 3.5Z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3: Punchline */}
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
              transform: `scale(${footerEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1.3) * 3
              }px)`,
              padding: '15px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              backgroundColor: '#000000',
              color: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 14,
              boxShadow: '7px 7px 0 #FF90E8',
              textAlign: 'center',
            }}
          >
            <span
              style={{
                fontSize: 23,
                lineHeight: 1.15,
                fontWeight: 950,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationColor: '#F1F333',
                textDecorationThickness: 4,
                textUnderlineOffset: 6,
              }}
            >
              £4,500 Placement Confirmed
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}