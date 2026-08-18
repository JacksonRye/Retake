import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style102InflatableBalloonType_Scene2() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const palette = ['#FF6FB5', '#5FB9FF', '#FFD43B', '#B197FC', '#FFFFFF'];

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 9,
      stiffness: 125,
      mass: 0.7,
    },
  });

  const headlineEntrance = spring({
    frame: frame - 5,
    fps,
    config: {
      damping: 8,
      stiffness: 150,
      mass: 0.55,
    },
  });

  const phoneEntrance = spring({
    frame: frame - 14,
    fps,
    config: {
      damping: 7,
      stiffness: 115,
      mass: 0.78,
    },
  });

  const deflate = interpolate(
    frame,
    [durationInFrames - 32, durationInFrames - 5],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const contentOpacity = interpolate(
    frame,
    [0, 6, durationInFrames - 8, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const inflateX = interpolate(phoneEntrance, [0, 0.25, 0.72, 1], [0.05, 1.13, 0.94, 1]);
  const inflateY = interpolate(phoneEntrance, [0, 0.25, 0.72, 1], [0.68, 0.88, 1.08, 1]);

  const deflateX = interpolate(deflate, [0, 1], [1, 0.78]);
  const deflateY = interpolate(deflate, [0, 1], [1, 0.65]);
  const deflateDrop = interpolate(deflate, [0, 1], [0, 92]);

  const activeWobble = interpolate(
    frame,
    [24, 36, durationInFrames - 38, durationInFrames - 20],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const wobbleRotation =
    Math.sin(frame * 0.42) * 2.2 * activeWobble +
    Math.sin(frame * 0.17) * 1.1 * activeWobble;

  const wobbleX = Math.sin(frame * 0.31) * 5 * activeWobble;
  const wobbleY = Math.cos(frame * 0.27) * 4 * activeWobble;

  const pulse = 1 + Math.sin(frame * 0.22) * 0.018 * activeWobble;

  const headlineScaleX = interpolate(
    headlineEntrance,
    [0, 0.38, 0.72, 1],
    [0.08, 1.08, 0.96, 1],
  );
  const headlineScaleY = interpolate(
    headlineEntrance,
    [0, 0.38, 0.72, 1],
    [0.72, 0.92, 1.08, 1],
  );

  const moneySymbols = [
    {left: '14%', delay: 35, size: 74, color: palette[2], drift: -18},
    {left: '69%', delay: 43, size: 62, color: palette[4], drift: 17},
    {left: '4%', delay: 54, size: 48, color: palette[3], drift: -12},
    {left: '79%', delay: 63, size: 54, color: palette[2], drift: 14},
    {left: '43%', delay: 71, size: 45, color: palette[4], drift: 8},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
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
          justifyContent: 'space-between',
          position: 'relative',
          padding: '58px 42px 52px',
          border: `8px solid ${palette[4]}`,
          borderRadius: 72,
          backgroundColor: palette[0],
          opacity: contentOpacity,
          transform: `scale(${interpolate(entrance, [0, 1], [0.94, 1])})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 24,
            left: 38,
            width: 88,
            height: 32,
            borderRadius: 999,
            backgroundColor: palette[2],
            transform: `rotate(-12deg) scaleX(${0.7 + entrance * 0.3})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 76,
            right: 30,
            width: 54,
            height: 54,
            borderRadius: '50%',
            border: `8px solid ${palette[4]}`,
            transform: `scale(${0.7 + Math.sin(frame * 0.2) * 0.08})`,
          }}
        />

        <header
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 4,
          }}
        >
          <div
            style={{
              color: palette[4],
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 5,
              textTransform: 'uppercase',
              backgroundColor: palette[3],
              border: `5px solid ${palette[4]}`,
              borderRadius: 999,
              padding: '12px 28px',
              transform: `translateY(${interpolate(
                entrance,
                [0, 1],
                [-45, 0],
              )}px) rotate(-2deg)`,
            }}
          >
            MONEY IN MOTION
          </div>

          <div
            style={{
              marginTop: 34,
              textAlign: 'center',
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontWeight: 900,
              fontSize: 82,
              lineHeight: 0.9,
              letterSpacing: -5,
              color: palette[4],
              WebkitTextStroke: `7px ${palette[1]}`,
              paintOrder: 'stroke fill',
              textShadow: `0 8px 0 ${palette[3]}, 0 14px 0 ${palette[2]}`,
              transform: `scaleX(${headlineScaleX}) scaleY(${headlineScaleY})`,
              transformOrigin: 'center bottom',
            }}
          >
            YOU COULD
            <br />
            BOUNCE OFF.
          </div>
        </header>

        <div
          style={{
            width: '100%',
            flex: 1,
            minHeight: 0,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 22,
          }}
        >
          {moneySymbols.map((symbol, index) => {
            const rise = spring({
              frame: frame - symbol.delay,
              fps,
              config: {
                damping: 9,
                stiffness: 110,
                mass: 0.55,
              },
            });

            const withdrawal = interpolate(
              frame,
              [durationInFrames - 30 + index * 2, durationInFrames - 5],
              [0, 1],
              {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              },
            );

            const y =
              interpolate(rise, [0, 1], [300, -30 - index * 30]) +
              Math.sin(frame * 0.18 + index) * 14 * rise +
              withdrawal * 300;

            const x =
              symbol.drift * rise +
              Math.sin(frame * 0.12 + index * 1.7) * 8 * rise;

            return (
              <div
                key={`money-${index}`}
                style={{
                  position: 'absolute',
                  left: symbol.left,
                  top: '42%',
                  width: symbol.size,
                  height: symbol.size,
                  borderRadius: '50%',
                  backgroundColor: symbol.color,
                  border: `6px solid ${palette[4]}`,
                  color: palette[0],
                  fontFamily: 'Arial Black, Arial, sans-serif',
                  fontWeight: 900,
                  fontSize: symbol.size * 0.56,
                  lineHeight: `${symbol.size - 12}px`,
                  textAlign: 'center',
                  opacity: rise * (1 - withdrawal),
                  transform: `translate(${x}px, ${y}px) rotate(${
                    Math.sin(frame * 0.2 + index) * 9
                  }deg) scale(${rise})`,
                  zIndex: index % 2 === 0 ? 1 : 5,
                }}
              >
                $
              </div>
            );
          })}

          <div
            style={{
              width: 500,
              height: 820,
              maxHeight: '88%',
              position: 'relative',
              zIndex: 3,
              transformOrigin: 'center 82%',
              transform: `
                translate(${wobbleX}px, ${wobbleY + deflateDrop}px)
                rotate(${wobbleRotation}deg)
                scaleX(${inflateX * deflateX * pulse})
                scaleY(${inflateY * deflateY * pulse})
              `,
            }}
          >
            <svg
              viewBox="0 0 500 820"
              width="100%"
              height="100%"
              style={{
                overflow: 'visible',
                filter: `drop-shadow(0 22px 0 ${palette[3]})`,
              }}
            >
              <path
                d="M115 28 C68 34 40 74 38 128 L25 654 C23 739 71 790 144 796 L357 796 C431 791 474 740 475 662 L462 126 C460 68 429 33 378 27 C291 16 203 16 115 28Z"
                fill={palette[1]}
                stroke={palette[4]}
                strokeWidth="16"
                strokeLinejoin="round"
              />

              <path
                d="M121 67 C90 76 78 101 76 152 L67 622 C65 682 86 720 118 738"
                fill="none"
                stroke={palette[4]}
                strokeWidth="22"
                strokeLinecap="round"
                opacity="0.65"
              />

              <path
                d="M385 73 C415 99 423 139 423 202"
                fill="none"
                stroke={palette[2]}
                strokeWidth="16"
                strokeLinecap="round"
              />

              <rect
                x="178"
                y="64"
                width="144"
                height="26"
                rx="13"
                fill={palette[3]}
                stroke={palette[4]}
                strokeWidth="7"
              />

              <rect
                x="92"
                y="128"
                width="316"
                height="492"
                rx="58"
                fill={palette[3]}
                stroke={palette[4]}
                strokeWidth="12"
              />

              <ellipse
                cx="250"
                cy="366"
                rx={108 + Math.sin(frame * 0.18) * 5}
                ry={108 - Math.sin(frame * 0.18) * 5}
                fill={palette[2]}
                stroke={palette[4]}
                strokeWidth="13"
              />

              <path
                d="M274 283 C250 266 203 274 198 313 C193 354 235 357 260 366 C292 377 307 400 297 432 C286 469 233 477 196 452"
                fill="none"
                stroke={palette[0]}
                strokeWidth="25"
                strokeLinecap="round"
              />
              <path
                d="M250 259 L247 484"
                stroke={palette[0]}
                strokeWidth="18"
                strokeLinecap="round"
              />

              <path
                d="M130 166 C110 195 107 246 108 286"
                fill="none"
                stroke={palette[4]}
                strokeWidth="13"
                strokeLinecap="round"
                opacity="0.8"
              />

              <circle
                cx="250"
                cy="697"
                r="42"
                fill={palette[0]}
                stroke={palette[4]}
                strokeWidth="11"
              />
              <path
                d="M232 697 L245 711 L271 681"
                fill="none"
                stroke={palette[4]}
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M223 794 C223 794 213 812 217 816 L283 816 C287 811 277 794 277 794Z"
                fill={palette[2]}
                stroke={palette[4]}
                strokeWidth="8"
              />
            </svg>
          </div>
        </div>

        <footer
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 6,
          }}
        >
          <div
            style={{
              width: '78%',
              height: 18,
              borderRadius: 999,
              backgroundColor: palette[3],
              border: `5px solid ${palette[4]}`,
              transform: `scaleX(${interpolate(
                phoneEntrance,
                [0, 1],
                [0.1, 1],
              )})`,
            }}
          />
          <div
            style={{
              marginTop: 20,
              color: palette[0],
              backgroundColor: palette[2],
              border: `6px solid ${palette[4]}`,
              borderRadius: 999,
              padding: '15px 34px',
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontWeight: 900,
              fontSize: 28,
              letterSpacing: 1.5,
              textAlign: 'center',
              transform: `translateY(${interpolate(
                phoneEntrance,
                [0, 1],
                [60, 0],
              )}px) scale(${0.8 + phoneEntrance * 0.2})`,
            }}
          >
            EARN • JIGGLE • WITHDRAW
          </div>
        </footer>
      </div>
    </AbsoluteFill>
  );
}