import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene18() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // BEAT 1 — vertical rise with a hard spring pop.
  const cardPop = spring({
    frame,
    fps,
    config: {
      damping: 10,
      stiffness: 260,
      mass: 0.55,
    },
  });

  const badgePop = spring({
    frame: frame - 4,
    fps,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.5,
    },
  });

  const riseY = interpolate(frame, [0, 8, 18, 30], [330, 170, -18, 0], clamp);
  const entranceScale = interpolate(cardPop, [0, 0.72, 1], [0.72, 1.08, 1], clamp);

  // BEAT 2 — teal field wipes away and VERIFIED stamp slaps down.
  const wipeProgress = interpolate(frame, [31, 61], [0, 100], clamp);
  const fieldWidth = 100 - wipeProgress;

  const revealScale = interpolate(
    frame,
    [31, 43, 51, 61],
    [0.88, 0.88, 1.06, 1],
    clamp,
  );

  const stampVisible = frame >= 49;
  const stampScale = interpolate(
    frame,
    [49, 53, 57, 62],
    [2.15, 0.82, 1.12, 1],
    clamp,
  );
  const stampRotation = interpolate(frame, [49, 54, 62], [-17, 5, -4], clamp);
  const stampDrop = interpolate(frame, [49, 54, 62], [-170, 14, 0], clamp);

  const impact = interpolate(
    frame,
    [52, 55, 62],
    [0, 1, 0],
    clamp,
  );

  // BEAT 3 — continuous living physics.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.5;
  const shadowPulse = 12 + Math.sin(frame * 0.18) * 3;

  const borderJump =
    frame >= 84
      ? [0, 3, -2, 2][Math.floor((frame - 84) / 6) % 4]
      : 0;

  const stampPulse =
    frame >= 84
      ? 1 + Math.sin(frame * 0.2) * 0.045
      : stampScale;

  const shineX = interpolate((frame + 18) % 68, [0, 68], [-220, 850], clamp);
  const waterlineX = interpolate((frame - 82 + 180) % 54, [0, 54], [-520, 650], clamp);

  const exitY = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [0, -100],
    clamp,
  );
  const exitScale = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0.9],
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
        {/* TIER 1 — CATEGORY PILL */}
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
              justifyContent: 'center',
              gap: 12,
              padding: '11px 24px',
              border: '4px solid #000000',
              borderRadius: 14,
              backgroundColor: '#FF90E8',
              boxShadow: '6px 6px 0 #000000',
              transform: `scale(${badgePop}) translateY(${
                Math.sin(frame * 0.11) * 2
              }px)`,
            }}
          >
            <div
              style={{
                width: 11,
                height: 11,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: '#000000',
              }}
            />
            <div
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
            </div>
          </div>
        </div>

        {/* TIER 2 — ONE MILESTONE HERO CARD */}
        <div
          style={{
            width: '100%',
            height: '65%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '86%',
              maxWidth: 820,
              height: 390,
              position: 'relative',
              transform: `
                translateY(${riseY + hoverY + borderJump}px)
                rotate(${hoverTilt}deg)
                scale(${entranceScale})
              `,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                border: '6px solid #000000',
                borderRadius: 26,
                backgroundColor: '#FFF8E7',
                boxShadow: `${shadowPulse + borderJump}px ${
                  shadowPulse + borderJump
                }px 0 #000000`,
                overflow: 'hidden',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              {/* Revealed milestone */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  width: '100%',
                  padding: '34px 42px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                  transform: `scale(${revealScale})`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    padding: '9px 22px',
                    border: '3px solid #000000',
                    borderRadius: 12,
                    backgroundColor: '#F1F333',
                    boxShadow: '4px 4px 0 #000000',
                    fontSize: 19,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    textDecorationThickness: 3,
                    textUnderlineOffset: 5,
                  }}
                >
                  Baptized
                </div>

                <div
                  style={{
                    maxWidth: 690,
                    fontSize: 61,
                    lineHeight: 0.96,
                    fontWeight: 950,
                    letterSpacing: -2,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                  }}
                >
                  First Got
                  <br />
                  Sober
                </div>
              </div>

              {/* Teal baptism field wiping rigidly from right to left */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 7,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: `${fieldWidth}%`,
                  minWidth: fieldWidth > 0 ? 2 : 0,
                  backgroundColor: '#23A094',
                  borderLeft:
                    fieldWidth > 0 && fieldWidth < 100
                      ? '6px solid #000000'
                      : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    minWidth: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                    color: '#FFF8E7',
                    transform: `translateX(${-wipeProgress * 1.2}px)`,
                  }}
                >
                  <div
                    style={{
                      padding: '12px 26px',
                      border: '4px solid #000000',
                      borderRadius: 12,
                      backgroundColor: '#FFF8E7',
                      color: '#000000',
                      boxShadow: '6px 6px 0 #000000',
                      fontSize: 25,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: 5,
                      textTransform: 'uppercase',
                      textDecoration: 'underline',
                      textDecorationThickness: 4,
                      textUnderlineOffset: 6,
                    }}
                  >
                    Baptized
                  </div>
                </div>
              </div>

              {/* Traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 9,
                  top: -80,
                  bottom: -80,
                  left: 0,
                  width: 72,
                  backgroundColor: 'rgba(255,255,255,0.42)',
                  transform: `translateX(${shineX}px) skewX(-20deg)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Rigid waterline sweeps */}
              {frame >= 82 &&
                [0, 22, 44].map((offset, index) => (
                  <div
                    key={offset}
                    style={{
                      position: 'absolute',
                      zIndex: 10,
                      left: 0,
                      top: `${34 + index * 13}%`,
                      width: index === 1 ? 210 : 150,
                      height: 6,
                      border: '2px solid #000000',
                      backgroundColor: index === 1 ? '#FF90E8' : '#23A094',
                      transform: `translateX(${waterlineX - offset * 3}px)`,
                      pointerEvents: 'none',
                    }}
                  />
                ))}

              {/* VERIFIED sticker slap */}
              {stampVisible && (
                <div
                  style={{
                    position: 'absolute',
                    zIndex: 12,
                    right: 34,
                    bottom: 25,
                    transform: `
                      translateY(${stampDrop}px)
                      rotate(${stampRotation}deg)
                      scale(${stampPulse})
                    `,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: -14 - impact * 15,
                      border: `5px solid rgba(241,243,51,${impact})`,
                      borderRadius: 15,
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 9,
                      padding: '12px 20px',
                      border: '5px solid #000000',
                      borderRadius: 12,
                      backgroundColor: '#F1F333',
                      boxShadow: `${4 + impact * 10}px ${
                        4 + impact * 10
                      }px 0 #000000`,
                      fontSize: 23,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: 3,
                      textTransform: 'uppercase',
                      textDecoration: 'underline',
                      textDecorationThickness: 4,
                      textUnderlineOffset: 5,
                    }}
                  >
                    Verified
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* TIER 3 — PUNCHLINE */}
        <div
          style={{
            width: '100%',
            height: '20%',
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
              border: '4px solid #000000',
              borderRadius: 15,
              backgroundColor: '#000000',
              boxShadow: `${
                6 + Math.sin(frame * 0.18) * 2
              }px ${6 + Math.sin(frame * 0.18) * 2}px 0 #FF90E8`,
              color: '#FFF8E7',
              transform: `translateY(${Math.sin(frame * 0.12 + 1) * 3}px) scale(${
                0.98 + Math.sin(frame * 0.14) * 0.015
              })`,
              fontSize: 23,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: 3,
              textAlign: 'center',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              textDecorationThickness: 3,
              textUnderlineOffset: 6,
            }}
          >
            A New Life, Confirmed
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}