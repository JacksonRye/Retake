import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene22() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — body-target slam with spring overshoot.
  const heroEntrance = spring({
    frame,
    fps,
    config: {
      damping: 9,
      stiffness: 260,
      mass: 0.58,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 10,
      stiffness: 280,
      mass: 0.5,
    },
  });

  const footerEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 11,
      stiffness: 240,
      mass: 0.55,
    },
  });

  const slamRotation = interpolate(frame, [0, 7, 16, 30], [-8, 3, -1, 0], clamp);
  const slamY = interpolate(frame, [0, 8, 18], [-90, 12, 0], clamp);

  // Beat 2 — roll from 220 LB to 200 LB and snap secondary target to 12%.
  const weight = Math.round(interpolate(frame, [30, 67], [220, 200], clamp));
  const secondaryVisible = frame >= 53;

  const secondarySnap = spring({
    frame: frame - 53,
    fps,
    config: {
      damping: 8,
      stiffness: 340,
      mass: 0.42,
    },
  });

  const stickerSlap = spring({
    frame: frame - 62,
    fps,
    config: {
      damping: 7,
      stiffness: 360,
      mass: 0.45,
    },
  });

  const stickerRotation = interpolate(frame, [62, 67, 74], [-18, 7, -5], clamp);

  // Cursor approach and physical click thunk.
  const cursorVisible = frame >= 34 && frame <= 78;
  const cursorX = interpolate(frame, [34, 50], [150, 0], clamp);
  const cursorY = interpolate(frame, [34, 50], [100, 0], clamp);
  const clickDown = frame >= 51 && frame <= 56;
  const clickThunk = clickDown ? 8 : 0;

  // Beat 3 — continuously living physics.
  const beatThree = frame >= 84;
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.35;
  const shadowPulse = 12 + Math.sin(frame * 0.18) * 3;

  // Alternating hard value pulses.
  const alternatingPhase = Math.floor(Math.max(0, frame - 84) / 8) % 2;
  const weightPulse = beatThree && alternatingPhase === 0 ? 1.065 : 1;
  const percentPulse = beatThree && alternatingPhase === 1 ? 1.1 : 1;

  // Hard two-frame compression tick every twelve frames.
  const tickPhase = Math.max(0, frame - 84) % 12;
  const compressionTick = beatThree && tickPhase < 2;
  const cardScaleX = compressionTick ? 1.018 : 1;
  const cardScaleY = compressionTick ? 0.965 : 1;
  const borderWidth = compressionTick ? 11 : 6;

  // Repeating pink scan line and traveling white shine.
  const scanProgress = ((frame - 84 + 36) % 34) / 34;
  const scanX = interpolate(scanProgress, [0, 1], [-130, 820], clamp);

  const shineProgress = ((frame + 12) % 58) / 58;
  const shineX = interpolate(shineProgress, [0, 1], [-190, 850], clamp);

  const exitY = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -70],
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
        padding: '80px 20px',
        boxSizing: 'border-box',
        opacity,
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '88%',
          maxWidth: 840,
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          transform: `translateY(${exitY}px)`,
        }}
      >
        {/* Tier 1 — category badge */}
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
              transform: `translateY(${Math.sin(frame * 0.1) * 3}px) scale(${badgeEntrance})`,
              transformOrigin: 'center top',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '11px 24px',
              backgroundColor: '#FF90E8',
              color: '#000000',
              border: '4px solid #000000',
              borderRadius: 13,
              boxShadow: '6px 6px 0 #000000',
              fontSize: 18,
              fontWeight: 950,
              letterSpacing: 3,
              lineHeight: 1,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
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
            Body Target
          </div>
        </div>

        {/* Tier 2 — single hero counter */}
        <div
          style={{
            flex: '1 1 65%',
            width: '100%',
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transform: `
              translateY(${slamY + hoverY + clickThunk}px)
              rotate(${slamRotation + hoverTilt}deg)
              scale(${heroEntrance})
            `,
          }}
        >
          <div
            style={{
              width: '100%',
              position: 'relative',
              transform: `scaleX(${cardScaleX}) scaleY(${cardScaleY})`,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                minHeight: 360,
                boxSizing: 'border-box',
                overflow: 'hidden',
                backgroundColor: '#23A094',
                border: `${borderWidth}px solid #000000`,
                borderRadius: 24,
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
                padding: '48px 34px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              {/* Traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 85,
                  backgroundColor: 'rgba(255,255,255,0.22)',
                  transform: `translateX(${shineX}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Repeating pink scan */}
              {beatThree && (
                <div
                  style={{
                    position: 'absolute',
                    top: -20,
                    bottom: -20,
                    left: 0,
                    width: 18,
                    backgroundColor: '#FF90E8',
                    borderLeft: '3px solid #000000',
                    borderRight: '3px solid #000000',
                    boxShadow: '8px 0 0 rgba(0,0,0,0.18)',
                    transform: `translateX(${scanX}px) rotate(8deg)`,
                    pointerEvents: 'none',
                  }}
                />
              )}

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    color: '#FFF8E7',
                    fontSize: 22,
                    fontWeight: 950,
                    letterSpacing: 5,
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    textDecorationThickness: 4,
                    textUnderlineOffset: 7,
                  }}
                >
                  Goal Weight
                </div>

                <div
                  style={{
                    color: '#000000',
                    fontSize: 106,
                    fontWeight: 950,
                    letterSpacing: -5,
                    lineHeight: 0.95,
                    whiteSpace: 'nowrap',
                    transform: `scale(${weightPulse})`,
                    transformOrigin: 'center',
                  }}
                >
                  {weight}
                  <span
                    style={{
                      marginLeft: 14,
                      fontSize: 42,
                      letterSpacing: 1,
                    }}
                  >
                    LB
                  </span>
                </div>

                {secondaryVisible && (
                  <div
                    style={{
                      transform: `scale(${secondarySnap * percentPulse})`,
                      transformOrigin: 'center',
                      backgroundColor: '#FFF8E7',
                      color: '#000000',
                      border: '4px solid #000000',
                      borderRadius: 12,
                      boxShadow: '5px 5px 0 #000000',
                      padding: '11px 24px',
                      fontSize: 29,
                      fontWeight: 950,
                      lineHeight: 1,
                      letterSpacing: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    12% BODY FAT
                  </div>
                )}
              </div>
            </div>

            {/* Yellow sticker remains part of the single hero */}
            {frame >= 62 && (
              <div
                style={{
                  position: 'absolute',
                  right: -10,
                  top: -26,
                  zIndex: 12,
                  transform: `rotate(${stickerRotation}deg) scale(${stickerSlap})`,
                  transformOrigin: 'center',
                  backgroundColor: '#F1F333',
                  color: '#000000',
                  border: '5px solid #000000',
                  borderRadius: 10,
                  boxShadow: '7px 7px 0 #000000',
                  padding: '14px 22px',
                  fontSize: 22,
                  fontWeight: 950,
                  letterSpacing: 2,
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Target Locked
              </div>
            )}

            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: '13%',
                  bottom: '12%',
                  zIndex: 20,
                  transform: `
                    translate(${cursorX}px, ${cursorY}px)
                    scale(${clickDown ? 0.82 : 1})
                  `,
                  filter: clickDown
                    ? 'drop-shadow(2px 2px 0 #FF90E8)'
                    : 'drop-shadow(6px 6px 0 #FF90E8)',
                }}
              >
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  stroke="#FFF8E7"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                >
                  <path d="M4 3.5L20.5 11.3L13.8 13.8L11.3 20.5L4 3.5Z" />
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
              transform: `
                translateY(${Math.sin(frame * 0.12 + 1.4) * 3}px)
                scale(${footerEntrance})
              `,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: '15px 30px',
              backgroundColor: '#000000',
              color: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 15,
              boxShadow: '7px 7px 0 #FF90E8',
              fontSize: 23,
              fontWeight: 950,
              letterSpacing: 2,
              lineHeight: 1,
              textAlign: 'center',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              textDecorationColor: '#F1F333',
              textDecorationThickness: 4,
              textUnderlineOffset: 7,
              whiteSpace: 'nowrap',
            }}
          >
            Lock It. Hit It.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}