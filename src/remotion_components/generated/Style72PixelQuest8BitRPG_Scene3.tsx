import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = ['#1B1D36', '#3450A1', '#F9C22E', '#58C322', '#D7263D'] as const;

export default function Style72PixelQuest8BitRPG_Scene3() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 12, mass: 0.55, stiffness: 120},
  });

  const contentOpacity = interpolate(
    frame,
    [0, 7, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const cardY = interpolate(entrance, [0, 1], [90, 0]);

  const hpPercent = interpolate(frame, [18, 78], [88, 16], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const displayedHp = Math.round(hpPercent);

  const warningBlink =
    frame > 64 ? (Math.floor((frame - 64) / 5) % 2 === 0 ? 1 : 0.35) : 1;

  const stepIndex = Math.floor(
    interpolate(frame, [12, 76], [0, 8], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const stepX = stepIndex % 2 === 0 ? -12 : 12;
  const stepY = stepIndex % 2 === 0 ? 0 : -8;
  const struggleRotation = frame > 62 ? (Math.floor(frame / 4) % 2 === 0 ? -3 : 3) : 0;

  const dialogueEntrance = spring({
    frame: frame - 72,
    fps,
    config: {damping: 9, mass: 0.45, stiffness: 160},
  });

  const sparkleEntrance = spring({
    frame: frame - 67,
    fps,
    config: {damping: 7, mass: 0.35, stiffness: 180},
  });

  const phrase = 'KEEP GOING!';
  const typedCharacters = Math.max(
    0,
    Math.min(phrase.length, Math.floor((frame - 80) / 2))
  );
  const typedPhrase = phrase.slice(0, typedCharacters);
  const cursorVisible = Math.floor(frame / 5) % 2 === 0;

  const encouragementActive = frame >= 80;
  const levelFlash = interpolate(
    frame,
    [82, 87, 94, 101],
    [0, 0.72, 0.22, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const resolveGlow = encouragementActive
    ? 1 + Math.sin((frame - 80) / 4) * 0.05
    : 1;

  const sprite = [
    '..yyyyyy..',
    '.yyyyyyyy.',
    '..bbbbbb..',
    '.bgbbgbb..',
    '.bbbbbbbb.',
    '..bbbbbb..',
    '..rrrrrr..',
    '.rrbrrbrr.',
    '.rrrrrrrr.',
    '..rr..rr..',
    '..bb..bb..',
    '.bbb..bbb.',
  ];

  const spriteColors: Record<string, string> = {
    y: palette[2],
    b: palette[1],
    g: palette[3],
    r: palette[4],
  };

  const sparkles = [
    {left: '14%', top: '22%', delay: 0, size: 18},
    {left: '78%', top: '17%', delay: 5, size: 14},
    {left: '84%', top: '54%', delay: 9, size: 20},
    {left: '10%', top: '62%', delay: 12, size: 12},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Courier New", "Lucida Console", monospace',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: palette[2],
          opacity: levelFlash,
        }}
      />

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
          padding: 30,
          backgroundColor: palette[0],
          border: `8px solid ${palette[4]}`,
          boxShadow: `16px 16px 0 ${palette[1]}`,
          opacity: contentOpacity,
          transform: `translateY(${cardY}px) scale(${0.9 + entrance * 0.1})`,
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              color: palette[2],
              fontSize: 25,
              fontWeight: 900,
              letterSpacing: 4,
              textAlign: 'center',
              textShadow: `4px 4px 0 ${palette[4]}`,
            }}
          >
            ◆ QUEST 03 ◆
          </div>

          <div
            style={{
              width: '100%',
              backgroundColor: palette[1],
              border: `5px solid ${palette[2]}`,
              padding: '13px 18px',
              boxSizing: 'border-box',
              color: palette[2],
              fontSize: 36,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: 2,
              textAlign: 'center',
              boxShadow: `7px 7px 0 ${palette[4]}`,
            }}
          >
            THE PERSISTENCE TRIAL
          </div>
        </div>

        <div
          style={{
            width: '100%',
            marginTop: 26,
            padding: 20,
            flexShrink: 0,
            boxSizing: 'border-box',
            backgroundColor: palette[1],
            border: `6px solid ${palette[4]}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <div
            style={{
              width: '100%',
              color: palette[2],
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 3,
              textAlign: 'center',
            }}
          >
            HERO HP · {String(displayedHp).padStart(2, '0')} / 100
          </div>

          <div
            style={{
              width: '100%',
              height: 58,
              padding: 7,
              boxSizing: 'border-box',
              backgroundColor: palette[0],
              border: `6px solid ${palette[2]}`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${hpPercent}%`,
                height: '100%',
                backgroundColor: hpPercent > 34 ? palette[3] : palette[4],
                opacity: hpPercent <= 34 ? warningBlink : 1,
              }}
            />
            {Array.from({length: 9}).map((_, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${(index + 1) * 10}%`,
                  top: 7,
                  bottom: 7,
                  width: 4,
                  backgroundColor: palette[0],
                }}
              />
            ))}
          </div>

          <div
            style={{
              color: hpPercent < 30 ? palette[4] : palette[3],
              fontSize: 21,
              fontWeight: 900,
              letterSpacing: 2,
              opacity: hpPercent < 30 ? warningBlink : 1,
            }}
          >
            {hpPercent < 30 ? '!! CRITICAL ENERGY !!' : 'STAMINA DECREASING...'}
          </div>
        </div>

        <div
          style={{
            width: '100%',
            flex: 1,
            minHeight: 0,
            marginTop: 22,
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: palette[1],
            border: `6px solid ${palette[2]}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: '23%',
              backgroundColor: palette[4],
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: '23%',
              height: 12,
              backgroundColor: palette[2],
            }}
          />

          {sparkles.map((sparkle, index) => {
            const localFrame = frame - 67 - sparkle.delay;
            const blink = localFrame > 0 && Math.floor(localFrame / 4) % 2 === 0;
            const scale = sparkleEntrance * (blink ? 1.22 : 0.82);

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: sparkle.left,
                  top: sparkle.top,
                  width: sparkle.size,
                  height: sparkle.size,
                  backgroundColor: palette[2],
                  boxShadow: `-${sparkle.size}px 0 0 ${palette[2]}, ${sparkle.size}px 0 0 ${palette[2]}, 0 -${sparkle.size}px 0 ${palette[2]}, 0 ${sparkle.size}px 0 ${palette[2]}`,
                  transform: `scale(${scale}) rotate(${frame * 3}deg)`,
                  opacity: localFrame > 0 ? 1 : 0,
                }}
              />
            );
          })}

          <div
            style={{
              position: 'absolute',
              top: 42,
              color: palette[0],
              backgroundColor: palette[2],
              border: `5px solid ${palette[4]}`,
              padding: '8px 18px',
              fontSize: 19,
              fontWeight: 900,
              letterSpacing: 3,
              transform: `translateY(${stepIndex % 2 === 0 ? 0 : 5}px)`,
            }}
          >
            ONE MORE STEP
          </div>

          <div
            style={{
              width: 280,
              height: 336,
              display: 'grid',
              gridTemplateColumns: 'repeat(10, 28px)',
              gridTemplateRows: 'repeat(12, 28px)',
              imageRendering: 'pixelated',
              transform: `translate(${stepX}px, ${stepY}px) rotate(${struggleRotation}deg) scale(${resolveGlow})`,
              transformOrigin: 'center bottom',
              filter: encouragementActive
                ? `drop-shadow(10px 0 0 ${palette[2]})`
                : 'none',
              zIndex: 2,
            }}
          >
            {sprite.flatMap((row, rowIndex) =>
              row.split('').map((pixel, columnIndex) => (
                <div
                  key={`${rowIndex}-${columnIndex}`}
                  style={{
                    gridColumn: columnIndex + 1,
                    gridRow: rowIndex + 1,
                    width: 28,
                    height: 28,
                    backgroundColor:
                      pixel === '.' ? undefined : spriteColors[pixel],
                  }}
                />
              ))
            )}
          </div>
        </div>

        <div
          style={{
            width: '100%',
            minHeight: 225,
            marginTop: 22,
            flexShrink: 0,
            padding: 18,
            boxSizing: 'border-box',
            backgroundColor: palette[0],
            border: `7px solid ${palette[2]}`,
            boxShadow: `9px 9px 0 ${palette[4]}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${Math.max(0, dialogueEntrance)})`,
            transformOrigin: 'center top',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: -25,
              left: 64,
              width: 34,
              height: 34,
              backgroundColor: palette[0],
              borderTop: `7px solid ${palette[2]}`,
              borderLeft: `7px solid ${palette[2]}`,
              transform: 'rotate(45deg)',
            }}
          />

          <div
            style={{
              color: palette[3],
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 3,
              marginBottom: 14,
            }}
          >
            ★ INNER VOICE ★
          </div>

          <div
            style={{
              minHeight: 62,
              color: palette[2],
              fontSize: 43,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: 3,
              textAlign: 'center',
              textShadow: `5px 5px 0 ${palette[4]}`,
            }}
          >
            {typedPhrase}
            <span style={{color: palette[3], opacity: cursorVisible ? 1 : 0}}>
              ▮
            </span>
          </div>

          <div
            style={{
              marginTop: 15,
              color: palette[1],
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              textAlign: 'center',
              opacity: typedCharacters === phrase.length ? 1 : 0,
            }}
          >
            FAILURE IS NOT GAME OVER.
          </div>
        </div>

        <div
          style={{
            width: '100%',
            flexShrink: 0,
            marginTop: 26,
            padding: '14px 18px',
            boxSizing: 'border-box',
            color: palette[0],
            backgroundColor: palette[3],
            border: `5px solid ${palette[2]}`,
            fontSize: 21,
            lineHeight: 1.25,
            fontWeight: 900,
            letterSpacing: 2,
            textAlign: 'center',
            opacity: interpolate(frame, [96, 105], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `translateY(${interpolate(
              frame,
              [96, 108],
              [18, 0],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }
            )}px)`,
          }}
        >
          +1 RESOLVE · QUEST CONTINUES
        </div>
      </div>
    </AbsoluteFill>
  );
}