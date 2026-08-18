import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene51() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // BEAT 1 — hard, overshooting entrance
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
      damping: 9,
      stiffness: 300,
      mass: 0.45,
    },
  });

  const footerEntrance = spring({
    frame: frame - 7,
    fps,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.5,
    },
  });

  // BEAT 2 — cursor arrives, clicks, and releases the office frame
  const clickFrame = 51;
  const isOff = frame >= clickFrame;
  const isClicking = frame >= 47 && frame <= 53;
  const cursorVisible = frame >= 27 && frame <= 73;

  const cursorX = interpolate(frame, [27, 45], [220, 42], clamp);
  const cursorY = interpolate(frame, [27, 45], [165, 32], clamp);
  const cursorRotation = interpolate(frame, [27, 45], [13, -3], clamp);

  const expansion = interpolate(frame, [clickFrame, 66], [0, 1], clamp);
  const heroWidth = 610 + expansion * 230;
  const clickThunk = isClicking ? 10 : 0;

  const knobX = isOff ? 0 : 72;
  const labelSlap = spring({
    frame: frame - clickFrame,
    fps,
    config: {
      damping: 8,
      stiffness: 310,
      mass: 0.45,
    },
  });

  // BEAT 3 — continuously living physical motion
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.35;
  const offPulse = (Math.sin(frame * 0.2) + 1) / 2;

  const shadowX = isOff
    ? 10 + Math.sin(frame * 0.14) * 6
    : isClicking
      ? 4
      : 13;

  const shadowY = isOff
    ? 12 + Math.cos(frame * 0.16) * 6
    : isClicking
      ? 4
      : 15;

  const borderOpening =
    frame >= 84 ? 2.5 + ((Math.sin(frame * 0.25) + 1) / 2) * 5 : 0;

  const borderScaleX = 1 + borderOpening / Math.max(heroWidth, 1);
  const borderScaleY = 1 + borderOpening / 300;

  const shineX = interpolate((frame + 12) % 58, [0, 58], [-190, 930], clamp);

  const exitY = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, -70],
    clamp,
  );

  const exitScale = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0.92],
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
        opacity,
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
          transform: `translateY(${exitY}px) scale(${exitScale})`,
        }}
      >
        {/* TIER 1 — category sticker */}
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
              gap: 16,
              padding: '11px 24px',
              border: '4px solid #000000',
              borderRadius: 12,
              backgroundColor: '#F1F333',
              boxShadow: `${6 + Math.sin(frame * 0.16) * 2}px ${
                6 + Math.cos(frame * 0.16) * 2
              }px 0 #000000`,
              transform: `scale(${badgeEntrance}) rotate(${
                -2 + Math.sin(frame * 0.1) * 0.8
              }deg)`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: 999,
                backgroundColor: '#23A094',
                border: '3px solid #000000',
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

        {/* TIER 2 — one hero toggle */}
        <div
          style={{
            height: '65%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: heroWidth,
              maxWidth: '88%',
              position: 'relative',
              transform: `scale(${heroEntrance}) translateY(${
                hoverY + clickThunk
              }px) rotate(${hoverTilt}deg)`,
              transformOrigin: 'center',
            }}
          >
            {/* Detached opening frame */}
            <div
              style={{
                position: 'absolute',
                inset: isOff ? -7 : 0,
                border: '6px solid #000000',
                borderRadius: isOff ? 31 : 25,
                transform: `scale(${borderScaleX}, ${borderScaleY})`,
                transformOrigin: 'center',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                width: '100%',
                minHeight: 286,
                padding: isOff ? '42px 54px' : '42px 44px',
                boxSizing: 'border-box',
                borderRadius: 24,
                backgroundColor: '#FF90E8',
                boxShadow: `${shadowX}px ${shadowY}px 0 #000000`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 22,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Continuous traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 92,
                  backgroundColor: '#FFF8E7',
                  opacity: 0.34,
                  transform: `translateX(${shineX}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  minHeight: 72,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: isOff ? 54 : 57,
                    lineHeight: 1.02,
                    fontWeight: 950,
                    letterSpacing: isOff ? -1.5 : 0,
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    textDecorationThickness: 6,
                    textUnderlineOffset: 10,
                    transform: isOff
                      ? `scale(${labelSlap})`
                      : 'scale(1)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isOff ? 'Work From Anywhere' : 'Office Required'}
                </div>
              </div>

              {/* Toggle track */}
              <div
                style={{
                  width: 190,
                  height: 82,
                  padding: 7,
                  boxSizing: 'border-box',
                  border: '5px solid #000000',
                  borderRadius: 16,
                  backgroundColor: isOff ? '#F1F333' : '#23A094',
                  boxShadow: isClicking
                    ? '3px 3px 0 #000000'
                    : `${6 + offPulse * 3}px ${6 + offPulse * 3}px 0 #000000`,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                  transform: isOff
                    ? `scale(${1 + offPulse * 0.035})`
                    : 'scale(1)',
                }}
              >
                {isOff && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 10,
                      backgroundColor: '#F1F333',
                      opacity: 0.45 + offPulse * 0.55,
                    }}
                  />
                )}

                <div
                  style={{
                    width: 68,
                    height: 58,
                    border: '4px solid #000000',
                    borderRadius: 10,
                    backgroundColor: isOff ? '#FFF8E7' : '#F1F333',
                    boxShadow: '4px 4px 0 #000000',
                    transform: `translateX(${knobX}px)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 2,
                    fontSize: 16,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 1.5,
                  }}
                >
                  {isOff ? 'OFF' : 'ON'}
                </div>
              </div>
            </div>

            {/* Oversized click cursor */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: 22,
                  bottom: 14,
                  zIndex: 20,
                  transform: `translate(${cursorX}px, ${cursorY}px) rotate(${cursorRotation}deg) scale(${
                    isClicking ? 0.82 : 1
                  })`,
                  filter: isClicking
                    ? 'drop-shadow(2px 3px 0 #000000)'
                    : 'drop-shadow(7px 9px 0 #000000)',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="82"
                  height="94"
                  viewBox="0 0 82 94"
                  aria-hidden="true"
                >
                  <path
                    d="M8 5 L72 54 L47 59 L59 84 L43 91 L31 65 L12 83 Z"
                    fill="#FFF8E7"
                    stroke="#000000"
                    strokeWidth="6"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* TIER 3 — punchline button */}
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
              padding: '15px 30px',
              border: '4px solid #000000',
              borderRadius: 13,
              backgroundColor: '#23A094',
              boxShadow: `${
                7 + Math.sin(frame * 0.15 + 1) * 2
              }px ${7 + Math.cos(frame * 0.15 + 1) * 2}px 0 #000000`,
              transform: `scale(${footerEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <span
              style={{
                color: '#FFF8E7',
                fontSize: 23,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                textDecorationThickness: 3,
                textUnderlineOffset: 5,
                whiteSpace: 'nowrap',
              }}
            >
              Unlock Your Location
            </span>
            <span
              style={{
                color: '#F1F333',
                fontSize: 28,
                lineHeight: 0.8,
                fontWeight: 950,
              }}
            >
              ↗
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}