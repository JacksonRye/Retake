import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style99MallPlazaVaporwave_Scene6() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 13, mass: 0.75, stiffness: 105},
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const cardY = interpolate(entrance, [0, 1], [70, 0]);
  const cardScale = interpolate(entrance, [0, 1], [0.88, 1]);
  const transformation = interpolate(frame, [22, 61], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const easedTransformation =
    transformation * transformation * (3 - 2 * transformation);

  const checkerOffset = (frame * 3.2) % 80;
  const gridSet = interpolate(frame, [0, 80], [0, 44], {
    extrapolateRight: 'clamp',
  });
  const statueRotation = Math.sin(frame / 28) * 8;
  const sunScale = interpolate(frame, [0, 35], [0.65, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const streamDash = interpolate(frame, [28, 74], [320, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleTracking = interpolate(frame, [0, 34], [15, 5], {
    extrapolateRight: 'clamp',
  });

  const nodes = [
    {x: 118, y: 96, tx: 370, ty: 55, r: 11},
    {x: 184, y: 67, tx: 430, ty: 86, r: 8},
    {x: 217, y: 124, tx: 490, ty: 62, r: 12},
    {x: 145, y: 158, tx: 550, ty: 106, r: 9},
    {x: 230, y: 184, tx: 615, ty: 75, r: 10},
    {x: 92, y: 202, tx: 438, ty: 148, r: 7},
    {x: 170, y: 229, tx: 532, ty: 172, r: 12},
    {x: 259, y: 225, tx: 650, ty: 145, r: 8},
  ];

  const connections = [
    [0, 1],
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 5],
    [3, 6],
    [4, 6],
    [4, 7],
    [5, 6],
    [6, 7],
  ];

  const codeFragments = [
    {text: '<FREE>', x: 382, y: 45, delay: 28},
    {text: 'const idea =', x: 425, y: 91, delay: 34},
    {text: 'create();', x: 505, y: 127, delay: 40},
    {text: '{ limitless: true }', x: 405, y: 169, delay: 46},
    {text: '=> BUILD_NEW_WORLD', x: 478, y: 211, delay: 52},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Georgia, Times New Roman, serif',
        perspective: 1200,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 790,
          padding: 24,
          overflow: 'hidden',
          borderRadius: 24,
          border: '1px solid #F4F4F8',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 24px 0 #101018',
          opacity: exit,
          transform: `translateY(${cardY}px) scale(${cardScale}) rotateX(${interpolate(
            entrance,
            [0, 1],
            [8, 0],
          )}deg)`,
          transformOrigin: '50% 80%',
        }}
      >
        {/* Vaporwave sun */}
        <div
          style={{
            position: 'absolute',
            width: 270,
            height: 270,
            right: -45,
            top: -105 + gridSet,
            borderRadius: '50%',
            overflow: 'hidden',
            background:
              'linear-gradient(180deg, #F4F4F8 0%, #3FD2C7 48%, #8C7AE6 100%)',
            border: '3px solid #101018',
            transform: `scale(${sunScale})`,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((line) => (
            <div
              key={line}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: 5 + line * 2,
                top: 119 + line * 20,
                backgroundColor: '#101018',
              }}
            />
          ))}
        </div>

        {/* Infinite checkerboard ribbon */}
        <div
          style={{
            position: 'absolute',
            left: -45,
            right: -45,
            bottom: -28,
            height: 125,
            overflow: 'hidden',
            borderTop: '2px solid #101018',
            transform: 'perspective(360px) rotateX(58deg)',
            transformOrigin: '50% 0%',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: '120%',
              height: 260,
              left: '-10%',
              top: -checkerOffset,
              backgroundColor: '#F4F4F8',
              backgroundImage:
                'linear-gradient(45deg, #101018 25%, #F4F4F8 25%, #F4F4F8 75%, #101018 75%), linear-gradient(45deg, #101018 25%, #F4F4F8 25%, #F4F4F8 75%, #101018 75%)',
              backgroundSize: '48px 48px',
              backgroundPosition: '0 0, 24px 24px',
            }}
          />
        </div>

        {/* Tier 1: Header pill */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '7px 14px',
              borderRadius: 999,
              border: '2px solid #101018',
              backgroundColor: '#3FD2C7',
              color: '#101018',
              fontFamily: 'Arial, sans-serif',
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 3,
              boxShadow: '4px 4px 0 #101018',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#8C7AE6',
                border: '1px solid #101018',
                transform: `scale(${1 + Math.sin(frame / 5) * 0.18})`,
              }}
            />
            ＭＡＬＬ・ＰＬＡＺＡ　０６
          </div>

          <div
            style={{
              color: '#101018',
              fontFamily: 'Arial, sans-serif',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
              padding: '6px 10px',
              borderBottom: '2px solid #101018',
            }}
          >
            創造　／　ＦＲＥＥＦＯＲＭ
          </div>
        </div>

        {/* Tier 2: Hero graphic zone */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: 292,
            overflow: 'hidden',
            borderRadius: 18,
            border: '2px solid #101018',
            backgroundColor: '#F4F4F8',
            boxShadow: '8px 8px 0 #8C7AE6',
          }}
        >
          <svg
            viewBox="0 0 742 292"
            width="100%"
            height="100%"
            style={{display: 'block'}}
          >
            <defs>
              <linearGradient id="vaporStream99" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#8C7AE6" />
                <stop offset="52%" stopColor="#3FD2C7" />
                <stop offset="100%" stopColor="#FF93C9" />
              </linearGradient>
              <clipPath id="heroClip99">
                <rect x="0" y="0" width="742" height="292" rx="16" />
              </clipPath>
            </defs>

            <g clipPath="url(#heroClip99)">
              {/* Background horizon grid */}
              <rect x="0" y="0" width="742" height="292" fill="#F4F4F8" />
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={203 + i * 18 + (frame % 18)}
                  x2="742"
                  y2={203 + i * 18 + (frame % 18)}
                  stroke="#3FD2C7"
                  strokeWidth="1"
                />
              ))}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <line
                  key={`v-${i}`}
                  x1={371 + (i - 4) * 35}
                  y1="187"
                  x2={371 + (i - 4) * 100}
                  y2="292"
                  stroke="#8C7AE6"
                  strokeWidth="1"
                />
              ))}

              <path
                d="M 326 22 L 326 267"
                stroke="#101018"
                strokeWidth="2"
                strokeDasharray="4 8"
                opacity={0.35}
              />

              <text
                x="24"
                y="31"
                fill="#101018"
                fontFamily="Arial, sans-serif"
                fontSize="10"
                fontWeight="800"
                letterSpacing="3"
              >
                ＰＲＥＤＥＦＩＮＥＤ
              </text>
              <text
                x="354"
                y="31"
                fill="#8C7AE6"
                fontFamily="Arial, sans-serif"
                fontSize="10"
                fontWeight="900"
                letterSpacing="3"
              >
                ＦＲＯＭ　ＳＣＲＡＴＣＨ
              </text>

              {/* Constraint connections */}
              <g
                opacity={1 - easedTransformation * 0.82}
                transform={`rotate(${statueRotation * 0.2} 174 148)`}
              >
                {connections.map(([a, b], index) => {
                  const first = nodes[a];
                  const second = nodes[b];
                  return (
                    <line
                      key={`connection-${index}`}
                      x1={first.x}
                      y1={first.y}
                      x2={second.x}
                      y2={second.y}
                      stroke={index % 2 === 0 ? '#101018' : '#8C7AE6'}
                      strokeWidth={index % 3 === 0 ? 4 : 2}
                      strokeLinecap="round"
                    />
                  );
                })}
              </g>

              {/* Flowing stream paths */}
              <g opacity={easedTransformation}>
                <path
                  d="M242 145 C325 58 365 221 443 115 C504 32 548 206 702 67"
                  fill="none"
                  stroke="url(#vaporStream99)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="320"
                  strokeDashoffset={streamDash}
                />
                <path
                  d="M250 187 C330 250 397 66 481 191 C536 266 613 119 718 176"
                  fill="none"
                  stroke="#101018"
                  strokeWidth="2"
                  strokeDasharray="7 10"
                  strokeDashoffset={-frame * 3}
                />
                <path
                  d="M272 106 C351 172 415 31 490 104 C566 178 626 17 719 91"
                  fill="none"
                  stroke="#3FD2C7"
                  strokeWidth="4"
                  strokeDasharray="14 8"
                  strokeDashoffset={-frame * 4}
                />
              </g>

              {/* Morphing sculpture nodes */}
              <g
                transform={`rotate(${statueRotation} 190 150)`}
                style={{transformOrigin: '190px 150px'}}
              >
                {nodes.map((node, index) => {
                  const localT = Math.max(
                    0,
                    Math.min(1, easedTransformation * 1.25 - index * 0.035),
                  );
                  const x = node.x + (node.tx - node.x) * localT;
                  const y =
                    node.y +
                    (node.ty - node.y) * localT +
                    Math.sin(frame / 6 + index) * 3 * localT;
                  const pulse = 1 + Math.sin(frame / 7 + index * 1.7) * 0.1;

                  return (
                    <g
                      key={`node-${index}`}
                      transform={`translate(${x} ${y}) scale(${pulse})`}
                    >
                      <circle
                        r={node.r + 5}
                        fill="#FF93C9"
                        stroke="#101018"
                        strokeWidth="2"
                      />
                      <circle
                        r={node.r}
                        fill={index % 3 === 0 ? '#8C7AE6' : '#3FD2C7'}
                        stroke="#101018"
                        strokeWidth="2"
                      />
                      <circle
                        cx={-node.r * 0.25}
                        cy={-node.r * 0.3}
                        r={node.r * 0.22}
                        fill="#F4F4F8"
                      />
                    </g>
                  );
                })}
              </g>

              {/* Freeform code fragments */}
              {codeFragments.map((fragment, index) => {
                const reveal = interpolate(
                  frame,
                  [fragment.delay, fragment.delay + 10],
                  [0, 1],
                  {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
                );
                const drift = (frame - fragment.delay) * 0.28;

                return (
                  <text
                    key={fragment.text}
                    x={fragment.x + Math.max(0, drift)}
                    y={fragment.y + Math.sin(frame / 8 + index) * 4}
                    fill={index % 2 === 0 ? '#101018' : '#8C7AE6'}
                    fontFamily="monospace"
                    fontSize={index === 4 ? 12 : 13}
                    fontWeight="800"
                    opacity={reveal}
                  >
                    {fragment.text}
                  </text>
                );
              })}

              {/* Constraint frame breaking apart */}
              <g opacity={1 - transformation}>
                <path
                  d="M64 48 H280 V251 H64 Z"
                  fill="none"
                  stroke="#101018"
                  strokeWidth="3"
                  strokeDasharray="16 7"
                  strokeDashoffset={frame * 1.5}
                />
                <path
                  d="M52 80 V45 H86 M258 45 H292 V80 M52 220 V255 H86 M258 255 H292 V220"
                  fill="none"
                  stroke="#8C7AE6"
                  strokeWidth="7"
                />
              </g>

              <circle
                cx="701"
                cy="248"
                r="24"
                fill="#FF93C9"
                stroke="#101018"
                strokeWidth="2"
              />
              <text
                x="701"
                y="253"
                textAnchor="middle"
                fill="#101018"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fontWeight="900"
              >
                無限
              </text>
            </g>
          </svg>
        </div>

        {/* Tier 3: Headline and unlock note */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            marginTop: 20,
            padding: '6px 3px 3px',
          }}
        >
          <div
            style={{
              color: '#101018',
              fontSize: 33,
              lineHeight: 1.05,
              fontWeight: 800,
              fontStyle: 'italic',
              letterSpacing: titleTracking,
              textTransform: 'uppercase',
            }}
          >
            ＣＯＤＥ　ＷＩＴＨＯＵＴ　ＷＡＬＬＳ
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 13,
            }}
          >
            <div
              style={{
                width: interpolate(frame, [20, 58], [0, 74], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                height: 4,
                backgroundColor: '#8C7AE6',
                borderRight: '4px solid #101018',
              }}
            />
            <div
              style={{
                color: '#101018',
                fontFamily: 'Arial, sans-serif',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1.4,
              }}
            >
              制約をほどく — CREATE DIRECTLY. BUILD FREELY.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}