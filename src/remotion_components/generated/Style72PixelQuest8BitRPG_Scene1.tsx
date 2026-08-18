import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style72PixelQuest8BitRPG_Scene1() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const palette = ['#1B1D36', '#3450A1', '#F9C22E', '#58C322', '#D7263D'];

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const entrance = spring({
    frame,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 150},
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 14, durationInFrames],
    [1, 0],
    clamp,
  );

  const sceneScale = interpolate(entrance, [0, 1], [0.86, 1], clamp) * exit;
  const sceneY = interpolate(entrance, [0, 1], [90, 0], clamp);

  const typedMessage = 'CHOOSE ONE MODEL.\nSTAND FIRM. LEVEL UP.';
  const typedCharacters = Math.floor(
    interpolate(frame, [16, 83], [0, typedMessage.length], clamp),
  );
  const visibleMessage = typedMessage.slice(0, typedCharacters);
  const cursorVisible = Math.floor(frame / 7) % 2 === 0;

  const dialogueSpring = spring({
    frame: frame - 7,
    fps,
    config: {damping: 12, mass: 0.55, stiffness: 180},
  });

  const bookSpring = spring({
    frame: frame - 35,
    fps,
    config: {damping: 9, mass: 0.65, stiffness: 175},
  });

  const hpPercent = interpolate(frame, [0, 66, 86], [100, 67, 100], clamp);
  const xpPercent = interpolate(frame, [12, 90], [12, 100], clamp);

  const levelFlash =
    interpolate(frame, [82, 88, 94], [0, 1, 0], clamp) +
    interpolate(frame, [101, 105, 110], [0, 0.55, 0], clamp);

  const levelSpring = spring({
    frame: frame - 82,
    fps,
    config: {damping: 8, mass: 0.45, stiffness: 220},
  });

  const rawCharacterX = interpolate(frame, [0, 27], [-96, 0], clamp);
  const tileCharacterX = Math.round(rawCharacterX / 18) * 18;
  const stepBob =
    frame < 30 && Math.floor(frame / 4) % 2 === 0 ? -12 : 0;

  const glowPulse = interpolate(
    Math.sin(frame * 0.18),
    [-1, 1],
    [0.82, 1.12],
  );

  const starPositions = [
    {left: '10%', top: '11%', delay: 0},
    {left: '82%', top: '9%', delay: 5},
    {left: '17%', top: '34%', delay: 10},
    {left: '88%', top: '39%', delay: 3},
    {left: '8%', top: '68%', delay: 7},
    {left: '84%', top: '73%', delay: 12},
  ];

  const rays = Array.from({length: 12}, (_, index) => index);
  const groundTiles = Array.from({length: 10}, (_, index) => index);

  const pixelFont =
    '"Courier New", "Lucida Console", Monaco, monospace';

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette[0],
        overflow: 'hidden',
        fontFamily: pixelFont,
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: 900,
          height: '86%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          border: `8px solid ${palette[4]}`,
          backgroundColor: palette[0],
          boxShadow: `16px 16px 0 ${palette[1]}`,
          opacity: exit,
          transform: `translateY(${sceneY}px) scale(${sceneScale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Pixel-grid backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.22,
            backgroundImage: `linear-gradient(90deg, ${palette[1]} 4px, ${palette[0]} 4px), linear-gradient(${palette[1]} 4px, ${palette[0]} 4px)`,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Level-up full-screen flash */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            pointerEvents: 'none',
            backgroundColor: palette[2],
            opacity: Math.min(0.62, levelFlash * 0.62),
          }}
        />

        {starPositions.map((star, index) => {
          const twinkle =
            Math.floor((frame + star.delay) / 5) % 2 === 0 ? 1 : 0.25;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: star.left,
                top: star.top,
                width: 12,
                height: 12,
                zIndex: 1,
                backgroundColor:
                  index % 2 === 0 ? palette[2] : palette[3],
                opacity: twinkle,
                boxShadow: `12px 0 0 ${
                  index % 2 === 0 ? palette[2] : palette[3]
                }, 0 12px 0 ${
                  index % 2 === 0 ? palette[2] : palette[3]
                }`,
              }}
            />
          );
        })}

        {/* HUD */}
        <div
          style={{
            width: '100%',
            minHeight: 222,
            padding: '26px 28px 22px',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
            backgroundColor: palette[1],
            borderBottom: `8px solid ${palette[4]}`,
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: palette[2],
                fontSize: 26,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: 2,
                textShadow: `4px 4px 0 ${palette[0]}`,
              }}
            >
              <span>HERO LV.08</span>
              <span>{String(Math.floor(xpPercent * 87)).padStart(4, '0')} XP</span>
            </div>

            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 54,
                    color: palette[2],
                    fontWeight: 900,
                    fontSize: 22,
                  }}
                >
                  HP
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 30,
                    padding: 5,
                    boxSizing: 'border-box',
                    backgroundColor: palette[0],
                    border: `4px solid ${palette[2]}`,
                  }}
                >
                  <div
                    style={{
                      width: `${hpPercent}%`,
                      height: '100%',
                      backgroundColor:
                        hpPercent < 75 ? palette[4] : palette[3],
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    width: 54,
                    color: palette[2],
                    fontWeight: 900,
                    fontSize: 22,
                  }}
                >
                  XP
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 24,
                    padding: 4,
                    boxSizing: 'border-box',
                    backgroundColor: palette[0],
                    border: `4px solid ${palette[2]}`,
                  }}
                >
                  <div
                    style={{
                      width: `${xpPercent}%`,
                      height: '100%',
                      backgroundColor: palette[2],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dialogue box */}
        <div
          style={{
            width: '88%',
            height: 290,
            marginTop: 42,
            padding: 8,
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 6,
            backgroundColor: palette[4],
            transform: `scale(${Math.max(0, dialogueSpring)})`,
            transformOrigin: 'top center',
            boxShadow: `12px 12px 0 ${palette[1]}`,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '28px 30px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              backgroundColor: palette[0],
              border: `6px solid ${palette[2]}`,
            }}
          >
            <div
              style={{
                marginBottom: 18,
                padding: '8px 14px',
                color: palette[0],
                backgroundColor: palette[2],
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: 2,
                lineHeight: 1,
              }}
            >
              QUEST GUIDE
            </div>

            <div
              style={{
                color: palette[2],
                fontSize: 34,
                fontWeight: 900,
                lineHeight: 1.45,
                letterSpacing: 1.5,
                whiteSpace: 'pre-wrap',
                textShadow: `4px 4px 0 ${palette[1]}`,
              }}
            >
              {visibleMessage}
              <span
                style={{
                  color: palette[3],
                  opacity: cursorVisible ? 1 : 0,
                }}
              >
                ▮
              </span>
            </div>

            <div
              style={{
                position: 'absolute',
                right: 24,
                bottom: 18,
                color: palette[3],
                fontSize: 25,
                fontWeight: 900,
                opacity: typedCharacters >= typedMessage.length ? 1 : 0,
                transform: `translateY(${
                  Math.floor(frame / 6) % 2 === 0 ? 0 : 7
                }px)`,
              }}
            >
              ▼
            </div>
          </div>
        </div>

        {/* Hero stage */}
        <div
          style={{
            width: '100%',
            flex: 1,
            minHeight: 0,
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Golden radial pixel rays */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '48%',
              width: 470,
              height: 470,
              transform: `translate(-50%, -50%) scale(${glowPulse})`,
              opacity: interpolate(frame, [30, 49], [0, 1], clamp),
            }}
          >
            {rays.map((ray) => (
              <div
                key={ray}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: ray % 2 === 0 ? 22 : 14,
                  height: ray % 2 === 0 ? 190 : 145,
                  backgroundColor:
                    ray % 3 === 0 ? palette[3] : palette[2],
                  transformOrigin: '50% 0%',
                  transform: `rotate(${ray * 30}deg) translateY(-210px)`,
                  opacity: ray % 2 === Math.floor(frame / 5) % 2 ? 1 : 0.45,
                }}
              />
            ))}

            <div
              style={{
                position: 'absolute',
                left: 75,
                top: 75,
                width: 320,
                height: 320,
                backgroundColor: palette[2],
                transform: 'rotate(45deg)',
                opacity: 0.24,
                boxShadow: `0 0 0 22px ${palette[3]}, 0 0 0 44px ${palette[2]}`,
              }}
            />
          </div>

          {/* Level-up title */}
          <div
            style={{
              position: 'absolute',
              top: 45,
              zIndex: 15,
              padding: '14px 22px',
              color: palette[0],
              backgroundColor: palette[2],
              border: `6px solid ${palette[4]}`,
              fontSize: 45,
              fontWeight: 900,
              letterSpacing: 4,
              lineHeight: 1,
              opacity: interpolate(frame, [82, 86, 112, 120], [0, 1, 1, 0], clamp),
              transform: `scale(${Math.max(0, levelSpring)})`,
              boxShadow: `10px 10px 0 ${palette[1]}`,
            }}
          >
            LEVEL UP!
          </div>

          {/* Character */}
          <div
            style={{
              width: 350,
              height: 525,
              position: 'relative',
              zIndex: 8,
              transform: `translateX(${tileCharacterX}px) translateY(${stepBob}px)`,
            }}
          >
            {/* Hair */}
            <div
              style={{
                position: 'absolute',
                left: 102,
                top: 30,
                width: 150,
                height: 52,
                backgroundColor: palette[4],
                boxShadow: `-22px 22px 0 ${palette[4]}, 22px 22px 0 ${palette[4]}`,
              }}
            />

            {/* Head */}
            <div
              style={{
                position: 'absolute',
                left: 92,
                top: 75,
                width: 170,
                height: 142,
                backgroundColor: palette[2],
                border: `12px solid ${palette[0]}`,
                boxSizing: 'border-box',
                boxShadow: `-14px 14px 0 ${palette[1]}`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 28,
                  top: 43,
                  width: 24,
                  height: 24,
                  backgroundColor: palette[0],
                  boxShadow: `70px 0 0 ${palette[0]}`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 50,
                  bottom: 22,
                  width: 48,
                  height: 12,
                  backgroundColor: palette[4],
                }}
              />
            </div>

            {/* Body / armor */}
            <div
              style={{
                position: 'absolute',
                left: 72,
                top: 207,
                width: 210,
                height: 190,
                backgroundColor: palette[1],
                border: `12px solid ${palette[0]}`,
                boxSizing: 'border-box',
                boxShadow: `-18px 18px 0 ${palette[4]}`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 24,
                  top: 25,
                  width: 138,
                  height: 24,
                  backgroundColor: palette[3],
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 64,
                  top: 70,
                  width: 58,
                  height: 58,
                  backgroundColor: palette[2],
                  transform: 'rotate(45deg)',
                  border: `8px solid ${palette[0]}`,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Arms */}
            <div
              style={{
                position: 'absolute',
                left: 24,
                top: 244,
                width: 70,
                height: 155,
                backgroundColor: palette[2],
                border: `11px solid ${palette[0]}`,
                boxSizing: 'border-box',
                transform: 'rotate(8deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 18,
                top: 240,
                width: 70,
                height: 160,
                backgroundColor: palette[2],
                border: `11px solid ${palette[0]}`,
                boxSizing: 'border-box',
                transform: 'rotate(-8deg)',
              }}
            />

            {/* Glowing business-model book */}
            <div
              style={{
                position: 'absolute',
                left: 73,
                top: 282,
                width: 214,
                height: 145,
                zIndex: 12,
                padding: 12,
                boxSizing: 'border-box',
                backgroundColor: palette[2],
                border: `10px solid ${palette[0]}`,
                transform: `scale(${Math.max(0, bookSpring) * glowPulse})`,
                boxShadow: `0 0 0 12px ${palette[3]}, 18px 18px 0 ${palette[4]}`,
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 9,
                  color: palette[2],
                  backgroundColor: palette[1],
                  border: `6px solid ${palette[4]}`,
                  fontSize: 19,
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: 1,
                  textAlign: 'center',
                }}
              >
                <span>BUSINESS</span>
                <span>MODEL</span>
                <div
                  style={{
                    width: 48,
                    height: 16,
                    backgroundColor: palette[3],
                  }}
                />
              </div>
            </div>

            {/* Legs */}
            <div
              style={{
                position: 'absolute',
                left: 84,
                bottom: 0,
                width: 78,
                height: 138,
                backgroundColor: palette[1],
                border: `12px solid ${palette[0]}`,
                boxSizing: 'border-box',
                boxShadow: `-16px 12px 0 ${palette[4]}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 74,
                bottom: 0,
                width: 78,
                height: 138,
                backgroundColor: palette[1],
                border: `12px solid ${palette[0]}`,
                boxSizing: 'border-box',
                boxShadow: `16px 12px 0 ${palette[4]}`,
              }}
            />
          </div>

          {/* Ground tiles */}
          <div
            style={{
              width: '100%',
              height: 92,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: palette[1],
              borderTop: `10px solid ${palette[4]}`,
              overflow: 'hidden',
            }}
          >
            {groundTiles.map((tile) => (
              <div
                key={tile}
                style={{
                  width: '10%',
                  height: '100%',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                  backgroundColor:
                    tile % 2 === 0 ? palette[1] : palette[0],
                  borderRight: `5px solid ${palette[4]}`,
                  borderTop:
                    tile % 2 === 0
                      ? `14px solid ${palette[3]}`
                      : `14px solid ${palette[2]}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Quest completion footer */}
        <div
          style={{
            width: '100%',
            minHeight: 134,
            padding: '20px 26px',
            boxSizing: 'border-box',
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            color: palette[2],
            backgroundColor: palette[0],
            borderTop: `8px solid ${palette[4]}`,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 25,
              fontWeight: 900,
              letterSpacing: 3,
              color: palette[3],
            }}
          >
            QUEST COMPLETE
          </div>
          <div
            style={{
              fontSize: 31,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: 1,
              textShadow: `4px 4px 0 ${palette[1]}`,
            }}
          >
            DEDICATION TRANSFORMS YOUR LIFE
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}