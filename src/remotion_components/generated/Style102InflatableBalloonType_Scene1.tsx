import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = ['#FF6FB5', '#5FB9FF', '#FFD43B', '#B197FC', '#FFFFFF'] as const;

const letters = [
  { character: 'M', color: palette[1], delay: 8, rotate: -4 },
  { character: 'O', color: palette[2], delay: 13, rotate: 3 },
  { character: 'N', color: palette[3], delay: 18, rotate: -2 },
  { character: 'E', color: palette[1], delay: 23, rotate: 3 },
  { character: 'Y', color: palette[2], delay: 28, rotate: -3 },
];

const currencyMarks = [
  { symbol: '$', top: '7%', left: '7%', size: 76, color: palette[2], rotate: -15, delay: 4 },
  { symbol: '€', top: '13%', right: '6%', size: 58, color: palette[1], rotate: 13, delay: 10 },
  { symbol: '¥', top: '42%', left: '4%', size: 55, color: palette[4], rotate: 10, delay: 16 },
  { symbol: '£', top: '48%', right: '5%', size: 67, color: palette[3], rotate: -12, delay: 21 },
  { symbol: '¢', bottom: '12%', left: '9%', size: 54, color: palette[1], rotate: -8, delay: 25 },
  { symbol: '$', bottom: '8%', right: '8%', size: 80, color: palette[2], rotate: 14, delay: 29 },
];

export default function Style102InflatableBalloonType_Scene1() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const sceneEntrance = spring({
    frame,
    fps,
    config: {
      damping: 13,
      stiffness: 125,
      mass: 0.7,
    },
  });

  const sceneExit = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const headlineEntrance = spring({
    frame: frame - 2,
    fps,
    config: {
      damping: 11,
      stiffness: 150,
      mass: 0.55,
    },
  });

  const floorEntrance = spring({
    frame: frame - 35,
    fps,
    config: {
      damping: 10,
      stiffness: 120,
      mass: 0.75,
    },
  });

  const ambientPulse = 1 + Math.sin(frame * 0.09) * 0.018;
  const sparkleRotation = frame * 1.8;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {currencyMarks.map((mark, index) => {
        const markEntrance = spring({
          frame: frame - mark.delay,
          fps,
          config: {
            damping: 9,
            stiffness: 115,
            mass: 0.65,
          },
        });

        const driftX = Math.sin(frame * 0.045 + index * 1.7) * 10;
        const driftY = Math.cos(frame * 0.055 + index * 1.2) * 13;

        return (
          <div
            key={`${mark.symbol}-${index}`}
            style={{
              position: 'absolute',
              top: mark.top,
              bottom: mark.bottom,
              left: mark.left,
              right: mark.right,
              color: mark.color,
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: mark.size,
              fontWeight: 900,
              lineHeight: 1,
              opacity: 0.38 * markEntrance * sceneExit,
              WebkitTextStroke: `2px ${palette[4]}`,
              transform: `translate(${driftX}px, ${driftY}px) rotate(${
                mark.rotate + Math.sin(frame * 0.07 + index) * 4
              }deg) scale(${markEntrance})`,
            }}
          >
            {mark.symbol}
          </div>
        );
      })}

      <div
        style={{
          width: '90%',
          maxWidth: 900,
          height: '86%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          padding: '46px 38px 42px',
          border: `6px solid ${palette[4]}`,
          borderRadius: 54,
          backgroundColor: palette[0],
          boxShadow: `0 16px 0 ${palette[3]}, 0 30px 0 ${palette[1]}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          opacity: sceneExit,
          transform: `scale(${interpolate(sceneEntrance, [0, 1], [0.9, 1])})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 310,
            height: 310,
            borderRadius: '50%',
            border: `8px solid ${palette[2]}`,
            top: 260,
            left: -205,
            opacity: 0.42,
            transform: `scale(${ambientPulse})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 380,
            height: 380,
            borderRadius: '50%',
            border: `8px solid ${palette[1]}`,
            right: -250,
            bottom: 220,
            opacity: 0.44,
            transform: `scale(${2 - ambientPulse})`,
          }}
        />

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 2,
            transform: `translateY(${interpolate(
              headlineEntrance,
              [0, 1],
              [-36, 0]
            )}px)`,
            opacity: headlineEntrance,
          }}
        >
          <div
            style={{
              color: palette[4],
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 6,
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            INFLATE YOUR POTENTIAL
          </div>

          <div
            style={{
              width: 128,
              height: 12,
              marginTop: 16,
              borderRadius: 999,
              backgroundColor: palette[2],
              border: `3px solid ${palette[4]}`,
              transform: `scaleX(${headlineEntrance})`,
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            zIndex: 3,
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              gap: 2,
              padding: '0 4px',
              boxSizing: 'border-box',
            }}
          >
            {letters.map((letter, index) => {
              const inflate = spring({
                frame: frame - letter.delay,
                fps,
                config: {
                  damping: 7,
                  stiffness: 105,
                  mass: 0.58,
                },
              });

              const settle = interpolate(
                frame,
                [letter.delay, letter.delay + 9, letter.delay + 18, letter.delay + 28],
                [72, -18, 8, 0],
                {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }
              );

              const flatToRoundY = interpolate(inflate, [0, 0.28, 0.72, 1], [0.035, 0.22, 1.15, 1]);
              const squashX = interpolate(inflate, [0, 0.3, 0.72, 1], [1.22, 1.1, 0.94, 1]);
              const activeWobble =
                frame > letter.delay + 20
                  ? Math.sin(frame * 0.18 + index * 1.35) * 2.4
                  : 0;
              const lift =
                frame > letter.delay + 30
                  ? Math.sin(frame * 0.105 + index * 1.8) * 5
                  : 0;

              return (
                <div
                  key={letter.character}
                  style={{
                    width: letter.character === 'M' ? 164 : 136,
                    height: 240,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    transformOrigin: '50% 90%',
                    transform: `translateY(${settle + lift}px) rotate(${
                      letter.rotate + activeWobble
                    }deg) scaleX(${squashX}) scaleY(${flatToRoundY})`,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      color: palette[3],
                      fontFamily: 'Arial Black, Arial, sans-serif',
                      fontSize: letter.character === 'M' ? 174 : 184,
                      fontWeight: 900,
                      lineHeight: 1,
                      WebkitTextStroke: `12px ${palette[4]}`,
                      transform: 'translate(7px, 13px)',
                    }}
                  >
                    {letter.character}
                  </div>

                  <div
                    style={{
                      position: 'relative',
                      color: letter.color,
                      fontFamily: 'Arial Black, Arial, sans-serif',
                      fontSize: letter.character === 'M' ? 174 : 184,
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: -10,
                      WebkitTextStroke: `7px ${palette[4]}`,
                      textShadow: `0 7px 0 ${palette[3]}`,
                    }}
                  >
                    {letter.character}
                  </div>

                  <div
                    style={{
                      position: 'absolute',
                      width: letter.character === 'M' ? 47 : 39,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: palette[4],
                      top: 51,
                      left: letter.character === 'M' ? 49 : 44,
                      opacity: interpolate(inflate, [0.35, 0.8], [0, 0.86], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      }),
                      transform: 'rotate(-24deg)',
                    }}
                  />
                </div>
              );
            })}
          </div>

          <div
            style={{
              width: '82%',
              height: 22,
              borderRadius: '50%',
              backgroundColor: palette[3],
              opacity: 0.45,
              marginTop: 5,
              transform: `scaleX(${interpolate(
                frame,
                [8, 48],
                [0.15, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
              )}) scaleY(${ambientPulse})`,
            }}
          />

          <div
            style={{
              marginTop: 52,
              color: palette[4],
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: 39,
              fontWeight: 900,
              lineHeight: 1.15,
              textAlign: 'center',
              letterSpacing: 0.5,
              transform: `scale(${floorEntrance}) translateY(${interpolate(
                floorEntrance,
                [0, 1],
                [24, 0]
              )}px)`,
              opacity: floorEntrance,
              textShadow: `0 5px 0 ${palette[1]}`,
            }}
          >
            YOU COULD BOUNCE OFF.
          </div>
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3,
            opacity: floorEntrance,
          }}
        >
          <div
            style={{
              color: palette[0],
              backgroundColor: palette[2],
              border: `5px solid ${palette[4]}`,
              borderRadius: 999,
              padding: '18px 34px',
              boxShadow: `0 9px 0 ${palette[1]}`,
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: 25,
              fontWeight: 900,
              letterSpacing: 2,
              textAlign: 'center',
              transform: `translateY(${Math.sin(frame * 0.13) * 3}px)`,
            }}
          >
            TURN APPS INTO OPPORTUNITY
          </div>

          <div
            style={{
              marginTop: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: palette[4],
              fontFamily: 'Arial, sans-serif',
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: 4,
              textAlign: 'center',
            }}
          >
            <span
              style={{
                color: palette[2],
                fontSize: 31,
                marginRight: 14,
                transform: `rotate(${sparkleRotation}deg)`,
                display: 'inline-block',
              }}
            >
              ✦
            </span>
            MONEY MOVES
            <span
              style={{
                color: palette[1],
                fontSize: 31,
                marginLeft: 14,
                transform: `rotate(${-sparkleRotation}deg)`,
                display: 'inline-block',
              }}
            >
              ✦
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}