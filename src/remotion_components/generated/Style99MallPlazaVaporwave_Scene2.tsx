import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style99MallPlazaVaporwave_Scene2() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, mass: 0.72, stiffness: 105},
  });

  const cardY = interpolate(entrance, [0, 1], [70, 0]);
  const cardScale = interpolate(entrance, [0, 1], [0.88, 1]);
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const checkerScroll = (frame * 2.4) % 64;
  const sunSet = interpolate(frame, [0, 55], [-14, 14], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const statueRotation = Math.sin(frame / 24) * 5;
  const glowPulse = interpolate(
    Math.sin(frame / 10),
    [-1, 1],
    [0.92, 1.05],
  );

  const blocks = [
    {x: 198, y: 248, w: 188, h: 42, color: '#8C7AE6', delay: 4},
    {x: 222, y: 201, w: 164, h: 40, color: '#3FD2C7', delay: 10},
    {x: 249, y: 157, w: 137, h: 37, color: '#F4F4F8', delay: 16},
    {x: 277, y: 117, w: 109, h: 34, color: '#FF93C9', delay: 22},
    {x: 306, y: 81, w: 80, h: 30, color: '#3FD2C7', delay: 28},
  ];

  const titleReveal = interpolate(frame, [28, 46], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Georgia, Times New Roman, serif',
      }}
    >
      <div
        style={{
          width: 750,
          padding: 24,
          overflow: 'hidden',
          position: 'relative',
          borderRadius: 24,
          border: '1px solid #101018',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(16px)',
          boxShadow: '14px 18px 0 #101018',
          opacity,
          transform: `translateY(${cardY}px) scale(${cardScale})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 210,
            height: 210,
            right: -76,
            top: -92,
            borderRadius: '50%',
            border: '2px solid #101018',
            backgroundColor: '#8C7AE6',
            transform: `scale(${glowPulse})`,
          }}
        />

        {/* Tier 1: Plaza badge */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 14px',
              borderRadius: 999,
              border: '1px solid #101018',
              backgroundColor: '#3FD2C7',
              color: '#101018',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 3.2,
              textTransform: 'uppercase',
              boxShadow: '4px 4px 0 #101018',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#F4F4F8',
                border: '1px solid #101018',
              }}
            />
            99 MALL PLAZA
          </div>

          <div
            style={{
              color: '#101018',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 3,
            }}
          >
            階層 02 ／ ノーコード
          </div>
        </div>

        {/* Tier 2: Vaporwave hero world */}
        <div
          style={{
            height: 350,
            position: 'relative',
            overflow: 'hidden',
            marginBottom: 18,
            borderRadius: 18,
            border: '2px solid #101018',
            backgroundColor: '#8C7AE6',
            boxShadow: '7px 8px 0 #101018',
          }}
        >
          {/* Setting striped sun */}
          <svg
            width="750"
            height="205"
            viewBox="0 0 750 205"
            style={{
              position: 'absolute',
              left: 0,
              top: sunSet,
            }}
          >
            <defs>
              <clipPath id="style99-sun-clip">
                <circle cx="375" cy="113" r="91" />
              </clipPath>
            </defs>

            <circle
              cx="375"
              cy="113"
              r="91"
              fill="#FF93C9"
              stroke="#101018"
              strokeWidth="3"
            />

            <g clipPath="url(#style99-sun-clip)">
              {[0, 1, 2, 3, 4].map((line) => (
                <rect
                  key={line}
                  x="270"
                  y={103 + line * 19}
                  width="210"
                  height={7 + line * 2}
                  fill="#8C7AE6"
                />
              ))}
            </g>

            <path
              d="M0 183 L145 103 L232 168 L330 82 L441 167 L544 102 L750 183"
              fill="#3FD2C7"
              stroke="#101018"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path
              d="M0 183 L145 103 L232 168 L330 82 L441 167 L544 102 L750 183 L750 205 L0 205 Z"
              fill="#3FD2C7"
            />
          </svg>

          {/* Infinite checkerboard floor */}
          <div
            style={{
              position: 'absolute',
              left: -80,
              right: -80,
              bottom: -52,
              height: 210,
              borderTop: '3px solid #101018',
              backgroundColor: '#F4F4F8',
              backgroundImage:
                'linear-gradient(45deg, #101018 25%, transparent 25%), linear-gradient(-45deg, #101018 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #101018 75%), linear-gradient(-45deg, transparent 75%, #101018 75%)',
              backgroundSize: '64px 64px',
              backgroundPosition: `${checkerScroll}px ${checkerScroll}px, ${checkerScroll}px ${32 + checkerScroll}px, ${32 + checkerScroll}px ${checkerScroll - 32}px, ${checkerScroll - 32}px ${checkerScroll}px`,
              transform: 'perspective(290px) rotateX(54deg) scaleX(1.35)',
              transformOrigin: 'center top',
              maskImage:
                'linear-gradient(to bottom, transparent, #101018 34%, #101018)',
            }}
          />

          {/* Rotating marble-code statue */}
          <div
            style={{
              position: 'absolute',
              left: 48,
              bottom: 48,
              width: 115,
              height: 181,
              transform: `perspective(450px) rotateY(${statueRotation}deg)`,
              transformOrigin: 'center bottom',
            }}
          >
            <svg width="115" height="181" viewBox="0 0 115 181">
              <path
                d="M35 166 L40 124 Q27 112 30 89 Q31 72 43 62 Q34 48 40 30 Q45 10 61 10 Q82 12 83 34 Q83 51 72 62 Q87 73 87 94 Q87 113 74 124 L81 166 Z"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="3"
              />
              <path
                d="M42 61 Q58 73 74 61"
                fill="none"
                stroke="#8C7AE6"
                strokeWidth="5"
              />
              <path
                d="M46 32 Q58 23 79 34 Q70 10 57 10 Q42 14 40 31 Z"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="3"
              />
              <path
                d="M49 42 L56 40 M69 40 L76 43 M59 52 Q65 56 72 51"
                fill="none"
                stroke="#101018"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <rect
                x="24"
                y="164"
                width="68"
                height="13"
                rx="3"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="3"
              />
            </svg>
          </div>

          {/* Self-stacking code layers */}
          <svg
            width="520"
            height="320"
            viewBox="0 0 520 320"
            style={{
              position: 'absolute',
              right: 4,
              bottom: 15,
              overflow: 'visible',
            }}
          >
            <path
              d="M185 286 L408 286"
              stroke="#101018"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {blocks.map((block, index) => {
              const blockSpring = spring({
                frame: frame - block.delay,
                fps,
                config: {
                  damping: 10 + index,
                  mass: 0.62,
                  stiffness: 120,
                },
              });

              const fallY = interpolate(blockSpring, [0, 1], [-185, 0]);
              const blockOpacity = interpolate(blockSpring, [0, 0.12, 1], [0, 1, 1]);
              const depth = 17;
              const sideColor =
                index % 3 === 0
                  ? '#3FD2C7'
                  : index % 3 === 1
                    ? '#8C7AE6'
                    : '#FF93C9';

              return (
                <g
                  key={`${block.x}-${block.y}`}
                  opacity={blockOpacity}
                  transform={`translate(0 ${fallY})`}
                >
                  <path
                    d={`M${block.x} ${block.y} L${block.x + depth} ${block.y - depth} L${block.x + block.w + depth} ${block.y - depth} L${block.x + block.w} ${block.y} Z`}
                    fill="#F4F4F8"
                    stroke="#101018"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <path
                    d={`M${block.x + block.w} ${block.y} L${block.x + block.w + depth} ${block.y - depth} L${block.x + block.w + depth} ${block.y + block.h - depth} L${block.x + block.w} ${block.y + block.h} Z`}
                    fill={sideColor}
                    stroke="#101018"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />
                  <rect
                    x={block.x}
                    y={block.y}
                    width={block.w}
                    height={block.h}
                    rx="3"
                    fill={block.color}
                    stroke="#101018"
                    strokeWidth="3"
                  />
                  <circle
                    cx={block.x + 16}
                    cy={block.y + block.h / 2}
                    r="4"
                    fill="#101018"
                  />
                  <path
                    d={`M${block.x + 29} ${block.y + block.h / 2} H${block.x + block.w - 14}`}
                    stroke="#101018"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

            <g
              transform={`translate(0 ${interpolate(
                Math.sin(frame / 7),
                [-1, 1],
                [-3, 3],
              )})`}
            >
              <path
                d="M421 80 L440 99 L421 118"
                fill="none"
                stroke="#F4F4F8"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M474 80 L455 99 L474 118"
                fill="none"
                stroke="#F4F4F8"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>

          <div
            style={{
              position: 'absolute',
              left: 18,
              top: 16,
              color: '#F4F4F8',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontWeight: 900,
              fontSize: 10,
              letterSpacing: 4,
              writingMode: 'vertical-rl',
            }}
          >
            複雑性・基盤・自動化
          </div>

          <div
            style={{
              position: 'absolute',
              right: 18,
              top: 16,
              padding: '5px 9px',
              border: '1px solid #101018',
              backgroundColor: '#FF93C9',
              color: '#101018',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            LAYER_05
          </div>
        </div>

        {/* Tier 3: Typography and unlock */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            opacity: titleReveal,
            transform: `translateY(${interpolate(titleReveal, [0, 1], [18, 0])}px)`,
          }}
        >
          <div style={{flex: 1}}>
            <div
              style={{
                color: '#101018',
                fontSize: 34,
                lineHeight: 1.02,
                fontWeight: 800,
                fontStyle: 'italic',
                letterSpacing: 5.5,
                textTransform: 'uppercase',
              }}
            >
              NO CODE,
              <br />
              MANY LAYERS.
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 12,
                color: '#101018',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 1.4,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 34,
                  height: 4,
                  backgroundColor: '#8C7AE6',
                  border: '1px solid #101018',
                }}
              />
              BEAUTIFUL INTERFACES REST ON INTRICATE CODE.
            </div>
          </div>

          <div
            style={{
              width: 170,
              padding: '12px 14px',
              border: '1px solid #101018',
              borderRadius: 12,
              backgroundColor: '#F4F4F8',
              color: '#101018',
              boxShadow: '4px 4px 0 #101018',
            }}
          >
            <div
              style={{
                color: '#8C7AE6',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 2.6,
                marginBottom: 6,
              }}
            >
              CREATIVE UNLOCK
            </div>
            <div
              style={{
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 11,
                lineHeight: 1.35,
                fontWeight: 800,
              }}
            >
              THE INTERFACE HIDES THE FOUNDATION.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}