import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene29() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // BEAT 1 — Smash entrance.
  const cardEntrance = spring({
    frame,
    fps,
    config: {
      damping: 9,
      stiffness: 260,
      mass: 0.62,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 4,
    fps,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.5,
    },
  });

  const cardSmashY = interpolate(frame, [0, 9, 18], [-650, 26, 0], clamp);
  const entranceRotation = interpolate(frame, [0, 8, 15, 25], [-9, 3, -1.5, 0], clamp);

  // BEAT 2 — Maximum-speed digit roll, then hard lock.
  const targetDigits = ['1', '0', '0', '0', '0', '0', '0'];
  const digitLockFrames = [64, 66, 68, 70, 72, 74, 76];

  const rollingDigits = targetDigits.map((target, index) => {
    if (frame < 30) {
      return '0';
    }

    if (frame >= digitLockFrames[index]) {
      return target;
    }

    return String((Math.floor((frame - 30) * 2.75) + index * 7) % 10);
  });

  const formattedCharacters =
    frame < 30
      ? ['0', '0', '0', ',', '0', '0', '0']
      : [
          rollingDigits[0],
          ',',
          rollingDigits[1],
          rollingDigits[2],
          rollingDigits[3],
          ',',
          rollingDigits[4],
          rollingDigits[5],
          rollingDigits[6],
        ];

  const counterThunk =
    frame >= 76 && frame < 79
      ? 11
      : frame >= 79 && frame < 82
        ? -4
        : 0;

  const stickerEntrance = spring({
    frame: frame - 60,
    fps,
    config: {
      damping: 7,
      stiffness: 330,
      mass: 0.42,
    },
  });

  const stickerSlap =
    frame >= 60 && frame < 63
      ? 16
      : frame >= 63 && frame < 67
        ? -5
        : 0;

  const shockwaveProgress = interpolate(frame, [60, 76], [0, 1], clamp);
  const shockwaveOpacity = interpolate(frame, [60, 64, 76], [0, 0.95, 0], clamp);

  // Cursor arrives and physically clicks the card.
  const cursorVisible = frame >= 42 && frame <= 72;
  const cursorX = interpolate(frame, [42, 54], [190, 12], clamp);
  const cursorY = interpolate(frame, [42, 54], [145, 8], clamp);
  const cursorClick = frame >= 55 && frame < 60;
  const clickScale = cursorClick ? 0.76 : 1;

  // BEAT 3 — Continuous living physics.
  const beatThreeBlend = interpolate(frame, [80, 88], [0, 1], clamp);
  const hoverY = Math.sin(frame * 0.12) * 6 * beatThreeBlend;
  const smoothTilt = Math.sin(frame * 0.095) * 2.1 * beatThreeBlend;
  const hardTilt =
    frame >= 84 ? (Math.floor((frame - 84) / 8) % 2 === 0 ? -1.35 : 1.35) : 0;
  const cardTilt = smoothTilt + hardTilt * beatThreeBlend;

  const shadowPulse = 20 + Math.sin(frame * 0.18) * 4;
  const activeShadow = cursorClick ? 7 : shadowPulse;
  const shineCycle = ((frame - 80 + 150) % 48) / 48;
  const shineX = interpolate(shineCycle, [0, 1], [-320, 1180]);

  // Commas bounce in intentionally hard, stepped ticks.
  const commaTick =
    frame >= 84 && frame % 12 < 3
      ? -13
      : frame >= 84 && frame % 12 < 5
        ? 5
        : 0;

  const exitY = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -75],
    clamp,
  );

  const opacity = interpolate(
    frame,
    [0, 3, durationInFrames - 7, durationInFrames],
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
          transform: `translateY(${exitY}px)`,
        }}
      >
        {/* TIER 1 — Category badge */}
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
              padding: '11px 25px',
              border: '4px solid #000000',
              borderRadius: 13,
              backgroundColor: '#F1F333',
              boxShadow: '7px 7px 0 #000000',
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12) * 2
              }px)`,
            }}
          >
            <span
              style={{
                width: 13,
                height: 13,
                flexShrink: 0,
                borderRadius: '50%',
                backgroundColor: '#23A094',
                border: '3px solid #000000',
              }}
            />
            <span
              style={{
                fontSize: 21,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3.2,
                textTransform: 'uppercase',
              }}
            >
              Live view counter
            </span>
          </div>
        </div>

        {/* TIER 2 — One hero counter-card */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '65%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '82%',
              maxWidth: 1080,
              transform: `
                translateY(${cardSmashY + hoverY + counterThunk}px)
                rotate(${entranceRotation + cardTilt}deg)
                scale(${cardEntrance})
              `,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                minHeight: 300,
                padding: '58px 42px 50px',
                boxSizing: 'border-box',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                backgroundColor: '#FF90E8',
                border: '7px solid #000000',
                borderRadius: 26,
                boxShadow: `${activeShadow}px ${activeShadow}px 0 #000000`,
              }}
            >
              {/* Repeating teal light bands */}
              <div
                style={{
                  position: 'absolute',
                  top: -80,
                  bottom: -80,
                  left: 0,
                  width: 120,
                  backgroundColor: '#23A094',
                  opacity: frame >= 80 ? 0.72 : 0,
                  transform: `translateX(${shineX}px) skewX(-20deg)`,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: -80,
                  bottom: -80,
                  left: 0,
                  width: 34,
                  backgroundColor: '#FFF8E7',
                  opacity: frame >= 80 ? 0.72 : 0,
                  transform: `translateX(${shineX + 145}px) skewX(-20deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                  fontSize: 112,
                  lineHeight: 0.92,
                  fontWeight: 950,
                  letterSpacing: -5,
                  fontVariantNumeric: 'tabular-nums',
                  textShadow: '4px 4px 0 rgba(255,248,231,0.65)',
                }}
              >
                {formattedCharacters.map((character, index) => {
                  const isComma = character === ',';

                  return (
                    <span
                      key={`${index}-${isComma ? 'comma' : 'digit'}`}
                      style={{
                        display: 'inline-block',
                        minWidth: isComma ? 37 : 70,
                        textAlign: 'center',
                        transform: isComma
                          ? `translateY(${commaTick}px) rotate(${
                              commaTick < 0 ? -8 : commaTick > 0 ? 5 : 0
                            }deg)`
                          : `translateY(${
                              frame >= 30 && frame < 76
                                ? ((frame + index) % 2 === 0 ? -3 : 3)
                                : 0
                            }px)`,
                      }}
                    >
                      {character}
                    </span>
                  );
                })}
              </div>

              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '9px 22px',
                  backgroundColor: '#FFF8E7',
                  border: '4px solid #000000',
                  borderRadius: 10,
                  boxShadow: '5px 5px 0 #000000',
                  fontSize: 20,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  textDecoration: 'underline',
                  textDecorationThickness: 3,
                  textUnderlineOffset: 5,
                }}
              >
                Views unlocked
              </div>
            </div>

            {/* Yellow shockwave attached to the sticker slap */}
            {frame >= 60 && frame <= 76 && (
              <div
                style={{
                  position: 'absolute',
                  right: -46,
                  top: -44,
                  width: 170,
                  height: 170,
                  borderRadius: '50%',
                  border: '14px solid #F1F333',
                  opacity: shockwaveOpacity,
                  transform: `scale(${0.25 + shockwaveProgress * 1.55})`,
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* VIRAL corner sticker */}
            {frame >= 60 && (
              <div
                style={{
                  position: 'absolute',
                  right: -38,
                  top: -28,
                  zIndex: 8,
                  padding: '15px 25px',
                  backgroundColor: '#F1F333',
                  border: '5px solid #000000',
                  borderRadius: 12,
                  boxShadow: `${8 + stickerSlap}px ${8 + stickerSlap}px 0 #000000`,
                  fontSize: 34,
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: 2,
                  transform: `scale(${stickerEntrance}) rotate(-11deg) translateY(${stickerSlap}px)`,
                }}
              >
                VIRAL
              </div>
            )}

            {/* Cursor activation click */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  right: '13%',
                  bottom: '7%',
                  zIndex: 12,
                  filter: cursorClick
                    ? 'drop-shadow(2px 3px 0 #F1F333)'
                    : 'drop-shadow(6px 7px 0 #000000)',
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${clickScale})`,
                }}
              >
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 24 24"
                  fill="#FFF8E7"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinejoin="round"
                >
                  <path d="M4 2.8L20.5 12l-7.1 1.45L10 20.5z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* TIER 3 — Punchline */}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: '14px 30px',
              backgroundColor: '#000000',
              color: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 14,
              boxShadow: `${
                6 + Math.sin(frame * 0.18) * 2
              }px ${6 + Math.sin(frame * 0.18) * 2}px 0 #23A094`,
              fontSize: 24,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: 2.5,
              textAlign: 'center',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              textDecorationColor: '#FF90E8',
              textDecorationThickness: 4,
              textUnderlineOffset: 7,
              transform: `scale(${cardEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1.4) * 3
              }px)`,
            }}
          >
            One million. No asterisk.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}