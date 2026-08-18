import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene15() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // BEAT 1 — brutal spring slam
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
    frame: frame - 4,
    fps,
    config: {
      damping: 11,
      stiffness: 240,
      mass: 0.5,
    },
  });

  const slamY = interpolate(frame, [0, 8], [-150, 0], clamp);
  const shockScale = interpolate(frame, [4, 13, 22], [0.7, 1.12, 1], clamp);
  const shockOpacity = interpolate(
    frame,
    [3, 8, 18, 25],
    [0, 0.8, 0.35, 0],
    clamp,
  );

  // BEAT 2 — cursor click and mechanical label roll
  const cursorVisible = frame >= 25 && frame <= 78;
  const cursorX = interpolate(frame, [25, 40], [170, 8], clamp);
  const cursorY = interpolate(frame, [25, 40], [145, 10], clamp);
  const cursorOpacity = interpolate(
    frame,
    [25, 29, 68, 78],
    [0, 1, 1, 0],
    clamp,
  );

  const isClicking = frame >= 41 && frame <= 47;
  const clickThunk = isClicking ? 11 : 0;

  const labelIndex =
    frame < 43 ? 0 : frame < 54 ? 1 : frame < 66 ? 2 : 3;

  const transitionStart = [0, 43, 54, 66][labelIndex];
  const rollProgress =
    labelIndex === 0
      ? 0
      : interpolate(
          frame,
          [transitionStart, transitionStart + 3],
          [labelIndex - 1, labelIndex],
          clamp,
        );

  const labelOffset = -rollProgress * 76;
  const labels = ['JOURNEY', 'BUSINESS', 'SOCIAL MEDIA', 'DOCUMENT IT ALL'];

  // BEAT 3 — continuous living physics
  const hoverY = Math.sin(frame * 0.12) * 6;
  const tilt =
    frame >= 84
      ? Math.sin(Math.floor((frame - 84) / 5) * Math.PI * 0.5) * 1
      : Math.sin(frame * 0.08) * 0.3;

  const tempoThunk =
    frame >= 84 && Math.floor((frame - 84) / 9) % 2 === 0 ? 5 : 0;

  const shadowPulse =
    14 + Math.sin(frame * 0.18) * 3 - clickThunk - tempoThunk;

  const recordingBlink =
    frame >= 84 ? Math.floor((frame - 84) / 8) % 2 === 0 : frame >= 43;

  const shineX = interpolate(
    (frame + 12) % 62,
    [0, 62],
    [-260, 720],
    clamp,
  );

  const exitY = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -90],
    clamp,
  );

  const exitScale = interpolate(
    frame,
    [durationInFrames - 8, durationInFrames],
    [1, 0.82],
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
        color: '#000000',
        opacity,
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
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          transform: `translateY(${exitY}px) scale(${exitScale})`,
        }}
      >
        {/* TIER 1 — CATEGORY BUTTON */}
        <div
          style={{
            width: '100%',
            height: '15%',
            display: 'flex',
            alignItems: 'center',
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
                Math.sin(frame * 0.1) * 3
              }px)`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                flexShrink: 0,
                borderRadius: 3,
                backgroundColor: '#000000',
              }}
            />
            <span
              style={{
                fontSize: 19,
                fontWeight: 950,
                letterSpacing: 3.5,
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              Activation Code
            </span>
          </div>
        </div>

        {/* TIER 2 — ONE MASTER RECORD HERO */}
        <div
          style={{
            width: '100%',
            height: '65%',
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
              transform: `translateY(${slamY + hoverY + clickThunk + tempoThunk}px) scale(${
                heroEntrance * shockScale
              }) rotate(${tilt}deg)`,
              transformOrigin: 'center',
            }}
          >
            {/* Pink slam shock, visually attached to the single control */}
            <div
              style={{
                position: 'absolute',
                inset: -22,
                border: '10px solid #FF90E8',
                borderRadius: 38,
                opacity: shockOpacity,
                transform: `scale(${1 + shockOpacity * 0.12})`,
              }}
            />

            <div
              style={{
                width: '100%',
                minHeight: 300,
                boxSizing: 'border-box',
                padding: '38px 42px 44px',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                border: '7px solid #000000',
                borderRadius: 28,
                backgroundColor: '#F1F333',
                boxShadow: `${Math.max(3, shadowPulse)}px ${Math.max(
                  3,
                  shadowPulse,
                )}px 0 #FF90E8, ${Math.max(
                  7,
                  shadowPulse + 5,
                )}px ${Math.max(7, shadowPulse + 5)}px 0 #000000`,
              }}
            >
              {/* Traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 94,
                  backgroundColor: 'rgba(255,255,255,0.55)',
                  transform: `translateX(${shineX}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  minWidth: 270,
                  padding: '12px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  border: '4px solid #000000',
                  borderRadius: 12,
                  backgroundColor: '#000000',
                  color: '#FFF8E7',
                  boxShadow: recordingBlink
                    ? '6px 6px 0 #FF90E8'
                    : '2px 2px 0 #23A094',
                  transform: `translateY(${recordingBlink ? -2 : 2}px)`,
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    flexShrink: 0,
                    border: '3px solid #FFF8E7',
                    borderRadius: 3,
                    backgroundColor: recordingBlink
                      ? '#FF90E8'
                      : '#23A094',
                  }}
                />
                <span
                  style={{
                    fontSize: 25,
                    fontWeight: 950,
                    letterSpacing: 3,
                    lineHeight: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  Master Record
                </span>
              </div>

              <div
                style={{
                  width: '100%',
                  height: 76,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: `translateY(${labelOffset}px)`,
                  }}
                >
                  {labels.map((label) => (
                    <div
                      key={label}
                      style={{
                        width: '100%',
                        height: 76,
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontSize: label === 'DOCUMENT IT ALL' ? 48 : 57,
                        fontWeight: 950,
                        letterSpacing: -1.5,
                        lineHeight: 1,
                        textTransform: 'uppercase',
                        textDecoration:
                          label === 'DOCUMENT IT ALL' ? 'underline' : 'none',
                        textDecorationThickness: 6,
                        textUnderlineOffset: 9,
                      }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cursor is an interaction cue attached to the single hero */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: '13%',
                  bottom: '7%',
                  zIndex: 10,
                  opacity: cursorOpacity,
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${
                    isClicking ? 0.82 : 1
                  })`,
                  filter: isClicking
                    ? 'drop-shadow(2px 3px 0 #FF90E8)'
                    : 'drop-shadow(7px 8px 0 #FF90E8)',
                }}
              >
                <svg
                  width="62"
                  height="62"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  stroke="#FFF8E7"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                >
                  <path d="M4 3.5L11.2 21l2.7-7.1 7.1-2.7L4 3.5z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* TIER 3 — PUNCHLINE BUTTON */}
        <div
          style={{
            width: '100%',
            height: '20%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              padding: '15px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              border: '4px solid #000000',
              borderRadius: 14,
              backgroundColor: '#23A094',
              boxShadow: `${
                6 + Math.sin(frame * 0.18 + 1) * 2
              }px ${6 + Math.sin(frame * 0.18 + 1) * 2}px 0 #000000`,
              transform: `scale(${heroEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px)`,
            }}
          >
            <span
              style={{
                fontSize: 23,
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
              Record once. Remember everything.
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}