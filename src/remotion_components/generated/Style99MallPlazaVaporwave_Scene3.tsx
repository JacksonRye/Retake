import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style99MallPlazaVaporwave_Scene3() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 13, mass: 0.7, stiffness: 115},
  });

  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const exitLift = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [0, -34],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const cardY = interpolate(entrance, [0, 1], [90, 0]) + exitLift;
  const cardScale = interpolate(entrance, [0, 1], [0.88, 1]);
  const checkerOffset = (frame * 3.2) % 48;
  const gridOffset = (frame * 2.1) % 28;
  const statueRotation = Math.sin(frame / 18) * 5;
  const sunSet = interpolate(frame, [0, durationInFrames], [-5, 22], {
    extrapolateRight: 'clamp',
  });

  const pathProgress = interpolate(frame, [12, 58], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const workshopGlow = interpolate(
    Math.sin(frame / 7),
    [-1, 1],
    [0.72, 1],
  );

  const headlineReveal = spring({
    frame: frame - 24,
    fps,
    config: {damping: 15, stiffness: 105, mass: 0.65},
  });

  const floatY = Math.sin(frame / 12) * 3;

  const checkerTiles = Array.from({length: 42}, (_, index) => {
    const row = Math.floor(index / 7);
    const column = index % 7;
    return {
      x: column * 100,
      y: row * 38 + checkerOffset - 48,
      color: (row + column) % 2 === 0 ? '#F4F4F8' : '#3FD2C7',
    };
  });

  const terminalLines = [
    {x: 319, y: 107, width: 30, color: '#3FD2C7'},
    {x: 319, y: 115, width: 22, color: '#F4F4F8'},
    {x: 319, y: 123, width: 35, color: '#8C7AE6'},
    {x: 319, y: 131, width: 17, color: '#3FD2C7'},
  ];

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
          boxSizing: 'border-box',
          padding: 24,
          borderRadius: 24,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'transparent',
          border: '1px solid #101018',
          backdropFilter: 'blur(16px)',
          boxShadow: '14px 16px 0 #101018',
          opacity,
          transform: `translateY(${cardY}px) scale(${cardScale})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 190,
            height: 190,
            borderRadius: 999,
            top: -112,
            right: -62,
            backgroundColor: '#8C7AE6',
            border: '2px solid #101018',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 110,
            height: 110,
            borderRadius: 999,
            bottom: -65,
            left: -40,
            backgroundColor: '#3FD2C7',
            border: '2px solid #101018',
          }}
        />

        {/* Tier 1 — plaza badge */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '7px 13px',
              borderRadius: 999,
              color: '#F4F4F8',
              backgroundColor: '#101018',
              border: '1px solid #101018',
              fontFamily: 'Arial, sans-serif',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 3,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 99,
                backgroundColor: '#3FD2C7',
                boxShadow: '0 0 0 3px #8C7AE6',
              }}
            />
            ＭＡＬＬ・９９
          </div>

          <div
            style={{
              color: '#101018',
              fontFamily: 'Arial, sans-serif',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2.5,
              borderBottom: '2px solid #101018',
              paddingBottom: 4,
            }}
          >
            ノーコード → ＣＯＤＥ
          </div>
        </div>

        {/* Tier 2 — vaporwave mall pathway */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: 334,
            overflow: 'hidden',
            borderRadius: 18,
            backgroundColor: '#8C7AE6',
            border: '2px solid #101018',
            boxShadow: 'inset 0 0 0 5px #F4F4F8',
          }}
        >
          <svg
            viewBox="0 0 700 334"
            width="100%"
            height="100%"
            style={{display: 'block'}}
          >
            <defs>
              <linearGradient id="sky99" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8C7AE6" />
                <stop offset="100%" stopColor="#FF93C9" />
              </linearGradient>
              <linearGradient id="path99" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F4F4F8" />
                <stop offset="100%" stopColor="#3FD2C7" />
              </linearGradient>
              <clipPath id="floorClip99">
                <polygon points="0,218 700,218 700,334 0,334" />
              </clipPath>
              <clipPath id="sunClip99">
                <circle cx="350" cy={95 + sunSet} r="61" />
              </clipPath>
            </defs>

            <rect width="700" height="334" fill="url(#sky99)" />

            {/* Setting striped sun */}
            <circle
              cx="350"
              cy={95 + sunSet}
              r="64"
              fill="#FF93C9"
              stroke="#101018"
              strokeWidth="3"
            />
            <g clipPath="url(#sunClip99)">
              {Array.from({length: 8}, (_, index) => (
                <rect
                  key={`sun-stripe-${index}`}
                  x="280"
                  y={54 + index * 15 + sunSet}
                  width="140"
                  height={index < 3 ? 5 : 8}
                  fill={index % 2 === 0 ? '#F4F4F8' : '#3FD2C7'}
                />
              ))}
            </g>

            {/* Horizon and distant sophisticated workshop */}
            <path
              d="M0 190 H700"
              stroke="#101018"
              strokeWidth="3"
              fill="none"
            />
            <g
              style={{
                opacity: workshopGlow,
                transform: `translateY(${floatY * 0.25}px)`,
                transformOrigin: '350px 135px',
              }}
            >
              <path
                d="M300 155 L300 88 L400 88 L400 155"
                fill="#101018"
                stroke="#F4F4F8"
                strokeWidth="3"
              />
              <path
                d="M292 88 L350 57 L408 88 Z"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="3"
              />
              <rect
                x="312"
                y="98"
                width="76"
                height="48"
                rx="3"
                fill="#8C7AE6"
                stroke="#F4F4F8"
                strokeWidth="2"
              />
              <circle cx="320" cy="105" r="2.5" fill="#FF93C9" />
              <circle cx="328" cy="105" r="2.5" fill="#3FD2C7" />
              <circle cx="336" cy="105" r="2.5" fill="#F4F4F8" />
              {terminalLines.map((line, index) => (
                <rect
                  key={`terminal-${index}`}
                  x={line.x}
                  y={line.y}
                  width={line.width}
                  height="3"
                  rx="1.5"
                  fill={line.color}
                />
              ))}
              <text
                x="350"
                y="78"
                textAnchor="middle"
                fill="#101018"
                fontFamily="Arial, sans-serif"
                fontSize="9"
                fontWeight="900"
                letterSpacing="2"
              >
                ＷＯＲＫＳＨＯＰ
              </text>
            </g>

            {/* Mall storefront illusions */}
            <g>
              <path
                d="M0 82 L122 104 L122 235 L0 272 Z"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="3"
              />
              <path
                d="M0 82 L122 104 L105 124 L0 107 Z"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="3"
              />
              <rect
                x="17"
                y="127"
                width="75"
                height="46"
                rx="6"
                fill="#8C7AE6"
                stroke="#101018"
                strokeWidth="3"
              />
              <path
                d="M31 150 H74 M53 138 V162"
                stroke="#F4F4F8"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <text
                x="55"
                y="192"
                textAnchor="middle"
                fill="#101018"
                fontFamily="Arial, sans-serif"
                fontSize="10"
                fontWeight="900"
                letterSpacing="2"
              >
                ＤＲＡＧ
              </text>

              <path
                d="M700 82 L578 104 L578 235 L700 272 Z"
                fill="#FF93C9"
                stroke="#101018"
                strokeWidth="3"
              />
              <path
                d="M700 82 L578 104 L595 124 L700 107 Z"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="3"
              />
              <rect
                x="608"
                y="127"
                width="75"
                height="46"
                rx="6"
                fill="#8C7AE6"
                stroke="#101018"
                strokeWidth="3"
              />
              <circle
                cx="630"
                cy="150"
                r="9"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="2"
              />
              <path
                d="M642 150 H668 M660 142 L668 150 L660 158"
                stroke="#F4F4F8"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="646"
                y="192"
                textAnchor="middle"
                fill="#101018"
                fontFamily="Arial, sans-serif"
                fontSize="10"
                fontWeight="900"
                letterSpacing="2"
              >
                ＤＲＯＰ
              </text>
            </g>

            {/* Classical statues rotating slowly */}
            <g
              style={{
                transform: `translate(151px, 125px) rotate(${statueRotation}deg)`,
                transformOrigin: '0px 48px',
              }}
            >
              <ellipse
                cx="0"
                cy="89"
                rx="29"
                ry="7"
                fill="#101018"
              />
              <path
                d="M-22 86 L-15 58 L15 58 L22 86 Z"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="2"
              />
              <path
                d="M-12 58 C-25 42 -18 25 0 24 C17 25 25 43 12 58 Z"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="17"
                r="13"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="2"
              />
              <path
                d="M-11 13 Q0 -2 11 13"
                fill="#8C7AE6"
                stroke="#101018"
                strokeWidth="2"
              />
            </g>

            <g
              style={{
                transform: `translate(549px, 125px) rotate(${-statueRotation}deg)`,
                transformOrigin: '0px 48px',
              }}
            >
              <ellipse cx="0" cy="89" rx="29" ry="7" fill="#101018" />
              <path
                d="M-22 86 L-15 58 L15 58 L22 86 Z"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="2"
              />
              <path
                d="M-12 58 C-25 42 -18 25 0 24 C17 25 25 43 12 58 Z"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="2"
              />
              <circle
                cx="0"
                cy="17"
                r="13"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="2"
              />
              <path
                d="M-11 13 Q0 -2 11 13"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="2"
              />
            </g>

            {/* Infinite checkerboard floor */}
            <g clipPath="url(#floorClip99)">
              <rect x="0" y="218" width="700" height="116" fill="#F4F4F8" />
              {checkerTiles.map((tile, index) => (
                <polygon
                  key={`checker-${index}`}
                  points={`${tile.x},${218 + tile.y * 0.34} ${
                    tile.x + 100
                  },${218 + tile.y * 0.34} ${tile.x + 116},${
                    218 + (tile.y + 38) * 0.34
                  } ${tile.x - 16},${218 + (tile.y + 38) * 0.34}`}
                  fill={tile.color}
                  stroke="#101018"
                  strokeWidth="1.5"
                />
              ))}

              {/* Perspective grid */}
              {Array.from({length: 13}, (_, index) => (
                <line
                  key={`ray-${index}`}
                  x1="350"
                  y1="206"
                  x2={-80 + index * 72}
                  y2="334"
                  stroke="#101018"
                  strokeWidth="1.5"
                />
              ))}
              {Array.from({length: 6}, (_, index) => {
                const y = 222 + ((index * 28 + gridOffset) % 130);
                return (
                  <line
                    key={`grid-${index}`}
                    x1="0"
                    y1={y}
                    x2="700"
                    y2={y}
                    stroke="#101018"
                    strokeWidth="1.5"
                  />
                );
              })}
            </g>

            {/* Inviting pathway into complexity */}
            <path
              d="M238 334 L326 199 L374 199 L462 334 Z"
              fill="url(#path99)"
              stroke="#101018"
              strokeWidth="4"
            />
            <path
              d="M350 318 C350 280 350 240 350 205"
              fill="none"
              stroke="#8C7AE6"
              strokeWidth="5"
              strokeDasharray="11 10"
              strokeDashoffset={-frame * 2}
            />
            <path
              d="M322 279 L350 252 L378 279"
              fill="none"
              stroke="#101018"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="90"
              strokeDashoffset={90 * (1 - pathProgress)}
            />

            <rect
              x="18"
              y="16"
              width="105"
              height="24"
              rx="12"
              fill="#101018"
            />
            <text
              x="70"
              y="32"
              textAnchor="middle"
              fill="#F4F4F8"
              fontFamily="Arial, sans-serif"
              fontSize="9"
              fontWeight="900"
              letterSpacing="2"
            >
              ＯＰＥＮ ２４Ｈ
            </text>
          </svg>
        </div>

        {/* Tier 3 — headline and unlock */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            paddingTop: 17,
            transform: `translateY(${interpolate(
              headlineReveal,
              [0, 1],
              [18, 0],
            )}px)`,
            opacity: interpolate(headlineReveal, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 18,
            }}
          >
            <div>
              <div
                style={{
                  color: '#101018',
                  fontSize: 32,
                  fontWeight: 800,
                  fontStyle: 'italic',
                  lineHeight: 1.04,
                  letterSpacing: 2.1,
                }}
              >
                Enter simple.
                <br />
                Build beyond.
              </div>
            </div>

            <div
              style={{
                flexShrink: 0,
                color: '#F4F4F8',
                backgroundColor: '#8C7AE6',
                border: '2px solid #101018',
                borderRadius: 12,
                padding: '9px 11px',
                fontFamily: 'Arial, sans-serif',
                fontSize: 10,
                fontWeight: 900,
                lineHeight: 1.35,
                letterSpacing: 1.8,
                textAlign: 'center',
                boxShadow: '4px 4px 0 #101018',
              }}
            >
              ＳＩＭＰＬＥ
              <br />
              ↓
              <br />
              ＳＯＰＨＩＳＴＩＣＡＴＥＤ
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 12,
              color: '#101018',
              fontFamily: 'Arial, sans-serif',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 1.15,
            }}
          >
            <span
              style={{
                width: 26,
                height: 4,
                borderRadius: 10,
                backgroundColor: '#3FD2C7',
                border: '1px solid #101018',
              }}
            />
            NO-CODE OPENS THE DOOR — CODE BUILDS THE WORLD BEHIND IT.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}