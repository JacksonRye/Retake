import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = ['#E9DFC9', '#C3423F', '#274690', '#D9A31B', '#191714'] as const;

type ReelProps = {
  size: number;
  rotation: number;
  color: string;
  background: string;
  label: string;
};

function FilmReel({ size, rotation, color, background, label }: ReelProps) {
  const holes = [
    { x: 50, y: 23 },
    { x: 76, y: 42 },
    { x: 66, y: 73 },
    { x: 34, y: 73 },
    { x: 24, y: 42 },
  ];

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        transform: `rotate(${rotation}deg)`,
        flexShrink: 0,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        style={{
          display: 'block',
          overflow: 'visible',
          filter: `drop-shadow(9px 10px 0 ${palette[4]})`,
        }}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill={background}
          stroke={palette[4]}
          strokeWidth="4"
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill={color}
          stroke={palette[4]}
          strokeWidth="2"
        />
        {holes.map((hole, index) => (
          <circle
            key={index}
            cx={hole.x}
            cy={hole.y}
            r="10"
            fill={background}
            stroke={palette[4]}
            strokeWidth="2.5"
          />
        ))}
        <circle
          cx="50"
          cy="50"
          r="7"
          fill={palette[3]}
          stroke={palette[4]}
          strokeWidth="3"
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: -26,
          transform: 'translateX(-50%) rotate(-3deg)',
          padding: '5px 12px',
          backgroundColor: palette[0],
          border: `3px solid ${palette[4]}`,
          color: palette[4],
          fontFamily: 'Georgia, serif',
          fontSize: 18,
          fontWeight: 900,
          letterSpacing: 2,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
}

function PlayCutout({
  size,
  background,
  rotation,
}: {
  size: number;
  background: string;
  rotation: number;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `6px solid ${palette[4]}`,
        backgroundColor: background,
        boxShadow: `12px 13px 0 ${palette[4]}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg width={size * 0.46} height={size * 0.52} viewBox="0 0 46 52">
        <path
          d="M4 3 L43 26 L4 49 Z"
          fill={palette[0]}
          stroke={palette[4]}
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function Style101DadaOverloadCollageMaximal_Scene3() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const masterEntrance = spring({
    frame,
    fps,
    config: {
      damping: 11,
      stiffness: 145,
      mass: 0.65,
    },
  });

  const reelEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 8,
      stiffness: 185,
      mass: 0.55,
    },
  });

  const playEntrance = spring({
    frame: frame - 18,
    fps,
    config: {
      damping: 7,
      stiffness: 210,
      mass: 0.5,
    },
  });

  const headlineEntrance = spring({
    frame: frame - 27,
    fps,
    config: {
      damping: 9,
      stiffness: 175,
      mass: 0.58,
    },
  });

  const ctaEntrance = spring({
    frame: frame - 62,
    fps,
    config: {
      damping: 8,
      stiffness: 190,
      mass: 0.5,
    },
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const zoom = interpolate(
    frame,
    [0, 46, 82, durationInFrames],
    [0.89, 1.03, 1.07, 1.14],
    { extrapolateRight: 'clamp' },
  );

  const reelRotation = interpolate(frame, [0, durationInFrames], [-32, 148], {
    extrapolateRight: 'clamp',
  });

  const reverseRotation = interpolate(frame, [0, durationInFrames], [24, -126], {
    extrapolateRight: 'clamp',
  });

  const jitterX = frame > 41 ? ((frame * 17) % 7) - 3 : 0;
  const jitterY = frame > 41 ? ((frame * 11) % 5) - 2 : 0;
  const layerShuffle = Math.floor(frame / 7) % 3;
  const lightOn = Math.floor(frame / 3) % 2 === 0;

  const scissorReveal = interpolate(frame, [31, 53], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urgencyPulse = interpolate(
    Math.sin(frame * 0.48),
    [-1, 1],
    [0.96, 1.06],
  );

  const stampedNumber = String(Math.max(1, Math.ceil((durationInFrames - frame) / 30)))
    .padStart(2, '0');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: 900,
          height: '86%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '54px 42px 48px',
          border: `8px solid ${palette[4]}`,
          backgroundColor: palette[0],
          opacity: exit,
          transform: `scale(${masterEntrance * zoom}) rotate(${interpolate(
            masterEntrance,
            [0, 1],
            [-1.8, 0],
          )}deg)`,
          transformOrigin: 'center',
          boxShadow: `18px 20px 0 ${palette[2]}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 20,
            border: `2px dashed ${palette[4]}`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 92,
            left: -54,
            width: 410,
            height: 76,
            backgroundColor: palette[3],
            border: `4px solid ${palette[4]}`,
            transform: `rotate(-13deg) translateX(${interpolate(
              masterEntrance,
              [0, 1],
              [-350, 0],
            )}px)`,
            boxShadow: `9px 9px 0 ${palette[4]}`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: -95,
            top: 315,
            width: 490,
            height: 105,
            backgroundColor: palette[2],
            border: `5px solid ${palette[4]}`,
            transform: `rotate(17deg) translateX(${interpolate(
              reelEntrance,
              [0, 1],
              [420, 0],
            )}px)`,
          }}
        />

        <div
          style={{
            width: '100%',
            zIndex: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translate(${jitterX}px, ${jitterY}px)`,
          }}
        >
          <div
            style={{
              alignSelf: 'flex-start',
              backgroundColor: palette[4],
              color: palette[0],
              border: `4px solid ${palette[4]}`,
              padding: '8px 18px',
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: 19,
              fontWeight: 900,
              letterSpacing: 4,
              transform: `rotate(-4deg) translateY(${interpolate(
                masterEntrance,
                [0, 1],
                [-85, 0],
              )}px)`,
            }}
          >
            CHRON / ACT III
          </div>

          <div
            style={{
              marginTop: 24,
              position: 'relative',
              width: '100%',
              height: 252,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 28,
                top: 22,
                transform: `translateX(${interpolate(
                  reelEntrance,
                  [0, 1],
                  [-520, 0],
                )}px) scale(${0.72 + reelEntrance * 0.28})`,
                zIndex: layerShuffle === 0 ? 5 : 2,
              }}
            >
              <FilmReel
                size={238}
                rotation={reelRotation}
                color={palette[1]}
                background={palette[0]}
                label="REEL / 01"
              />
            </div>

            <div
              style={{
                position: 'absolute',
                right: 22,
                top: 2,
                transform: `translateX(${interpolate(
                  reelEntrance,
                  [0, 1],
                  [540, 0],
                )}px) scale(${0.68 + reelEntrance * 0.32})`,
                zIndex: layerShuffle === 1 ? 6 : 3,
              }}
            >
              <FilmReel
                size={270}
                rotation={reverseRotation}
                color={palette[2]}
                background={palette[3]}
                label="CONSUME"
              />
            </div>

            <div
              style={{
                position: 'absolute',
                zIndex: layerShuffle === 2 ? 10 : 7,
                transform: `scale(${playEntrance * urgencyPulse}) rotate(${interpolate(
                  playEntrance,
                  [0, 1],
                  [-28, 4],
                )}deg)`,
              }}
            >
              <PlayCutout
                size={158}
                background={lightOn ? palette[3] : palette[1]}
                rotation={frame % 8 < 4 ? -3 : 3}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            zIndex: 12,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            marginTop: 14,
          }}
        >
          <div
            style={{
              width: '104%',
              backgroundColor: palette[1],
              color: palette[0],
              border: `6px solid ${palette[4]}`,
              padding: '16px 18px 12px',
              boxSizing: 'border-box',
              fontFamily: 'Arial Black, Impact, sans-serif',
              fontSize: 75,
              lineHeight: 0.88,
              fontWeight: 900,
              letterSpacing: -5,
              textAlign: 'center',
              textTransform: 'uppercase',
              transform: `translateX(${interpolate(
                headlineEntrance,
                [0, 1],
                [-850, 0],
              )}px) rotate(-3deg) scale(${0.84 + headlineEntrance * 0.16})`,
              boxShadow: `13px 14px 0 ${palette[4]}`,
            }}
          >
            PRESS
            <br />
            PLAY!
          </div>

          <div
            style={{
              width: '88%',
              marginTop: -3,
              padding: '10px 18px',
              backgroundColor: palette[3],
              color: palette[4],
              border: `5px solid ${palette[4]}`,
              fontFamily: 'Georgia, Times New Roman, serif',
              fontSize: 27,
              fontWeight: 900,
              fontStyle: 'italic',
              textAlign: 'center',
              letterSpacing: 1,
              clipPath: `polygon(0 0, ${scissorReveal}% 0, ${Math.max(
                0,
                scissorReveal - 7,
              )}% 100%, 0 100%)`,
              transform: 'rotate(2deg)',
            }}
          >
            before the image disappears
          </div>

          <div
            style={{
              position: 'absolute',
              right: -12,
              top: 120,
              width: 116,
              height: 116,
              borderRadius: '50%',
              backgroundColor: palette[2],
              border: `6px solid ${palette[4]}`,
              color: palette[0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Impact, Arial Black, sans-serif',
              fontSize: 49,
              lineHeight: 0.9,
              transform: `rotate(11deg) scale(${headlineEntrance})`,
              boxShadow: `8px 9px 0 ${palette[4]}`,
            }}
          >
            {stampedNumber}
            <span
              style={{
                color: palette[0],
                fontSize: 14,
                letterSpacing: 2,
                marginTop: 7,
              }}
            >
              SEC
            </span>
          </div>
        </div>

        <div
          style={{
            zIndex: 15,
            width: '100%',
            flex: 1,
            minHeight: 330,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {[0, 1, 2, 3, 4].map((index) => {
            const active = (Math.floor(frame / 4) + index) % 3 !== 0;
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: 44 + index * 41,
                  left: index % 2 === 0 ? 40 : undefined,
                  right: index % 2 === 1 ? 42 : undefined,
                  width: 38 + index * 7,
                  height: 38 + index * 7,
                  borderRadius: '50%',
                  backgroundColor: active ? palette[3] : palette[0],
                  border: `5px solid ${palette[4]}`,
                  transform: `scale(${active ? 1.08 : 0.72})`,
                }}
              />
            );
          })}

          <div
            style={{
              width: '83%',
              padding: '24px 24px 20px',
              backgroundColor: palette[0],
              color: palette[4],
              border: `7px solid ${palette[4]}`,
              boxShadow: `15px 16px 0 ${palette[2]}`,
              transform: `rotate(-2deg) scale(${ctaEntrance * urgencyPulse})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 5,
            }}
          >
            <div
              style={{
                color: palette[1],
                fontFamily: 'Georgia, Times New Roman, serif',
                fontSize: 27,
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Activation Code
            </div>

            <div
              style={{
                marginTop: 8,
                color: palette[4],
                fontFamily: 'Arial Black, Impact, sans-serif',
                fontSize: 45,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: 3,
                textAlign: 'center',
              }}
            >
              WATCH / TAP / REPEAT
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 6,
              padding: '7px 20px',
              backgroundColor: palette[4],
              color: palette[0],
              fontFamily: 'Courier New, monospace',
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 5,
              transform: `rotate(3deg) translateX(${interpolate(
                ctaEntrance,
                [0, 1],
                [500, 0],
              )}px)`,
            }}
          >
            NO PASSIVE VIEWING
          </div>
        </div>

        <div
          style={{
            zIndex: 20,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 9,
          }}
        >
          <div
            style={{
              width: '95%',
              height: 16,
              backgroundColor: palette[2],
              border: `3px solid ${palette[4]}`,
              transform: `scaleX(${interpolate(
                frame,
                [0, durationInFrames],
                [0.05, 1],
                { extrapolateRight: 'clamp' },
              )}) rotate(-1deg)`,
              transformOrigin: 'left center',
            }}
          />

          <div
            style={{
              color: palette[4],
              fontFamily: 'Courier New, monospace',
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 3,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            Signal overloaded · attention required · 101
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}