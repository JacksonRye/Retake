import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene15() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, mass: 0.62, stiffness: 125},
  });

  const exitOpacity = interpolate(
    frame,
    [0, 8, durationInFrames - 10, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp,
  );

  const focusBlur = interpolate(frame, [0, 8, 19], [10, 4, 0], clamp);
  const boardLift = interpolate(entrance, [0, 1], [54, 0], clamp);
  const boardScale = interpolate(entrance, [0, 1], [0.94, 1], clamp);

  const titleDraw = interpolate(frame, [6, 25], [1, 0], clamp);
  const cutterDraw = interpolate(frame, [12, 39], [1, 0], clamp);
  const structureDraw = interpolate(frame, [31, 65], [1, 0], clamp);
  const reveal = interpolate(frame, [29, 48], [0, 1], clamp);

  const cutterRelease = spring({
    frame: Math.max(0, frame - 43),
    fps,
    config: {damping: 10, mass: 0.72, stiffness: 105},
  });

  const cutterY = interpolate(cutterRelease, [0, 1], [0, 335], clamp);
  const cutterRotation = interpolate(cutterRelease, [0, 1], [0, -13], clamp);
  const cutterOpacity = interpolate(frame, [57, 78], [1, 0], clamp);

  const smudge = spring({
    frame: Math.max(0, frame - 37),
    fps,
    config: {damping: 17, mass: 0.55, stiffness: 145},
  });

  const glareX = interpolate(frame, [7, 77], [-30, 130], clamp);
  const pulse = interpolate(
    frame % 22,
    [0, 11, 22],
    [0.74, 1, 0.74],
    clamp,
  );

  const activation = spring({
    frame: Math.max(0, frame - 55),
    fps,
    config: {damping: 11, mass: 0.5, stiffness: 165},
  });

  const nodes = [
    {x: 455, y: 147, r: 17, color: '#FF8A3D', delay: 29},
    {x: 365, y: 220, r: 14, color: '#4DD0E1', delay: 34},
    {x: 535, y: 231, r: 15, color: '#FF8A3D', delay: 38},
    {x: 292, y: 313, r: 13, color: '#FF8A3D', delay: 43},
    {x: 426, y: 315, r: 18, color: '#4DD0E1', delay: 47},
    {x: 586, y: 330, r: 13, color: '#4DD0E1', delay: 51},
    {x: 350, y: 410, r: 14, color: '#4DD0E1', delay: 55},
    {x: 515, y: 418, r: 17, color: '#FF8A3D', delay: 58},
  ];

  const connections = [
    'M455 164 C440 183 400 195 365 206',
    'M469 158 C500 172 518 193 532 216',
    'M354 232 C330 257 310 280 296 300',
    'M378 229 C394 258 408 283 421 298',
    'M521 244 C493 270 465 292 441 307',
    'M549 242 C563 267 577 292 584 317',
    'M302 323 C318 352 334 379 347 396',
    'M439 327 C464 358 489 390 507 407',
    'M573 341 C555 365 535 389 522 405',
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(24px) brightness(0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        opacity: exitOpacity,
        fontFamily:
          '"Arial Rounded MT Bold", "Trebuchet MS", Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#1A2026',
          opacity: 0.94,
        }}
      />

      <div
        style={{
          width: '92%',
          height: '90%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: '28px 34px 26px',
          overflow: 'hidden',
          border: '2px solid #39414B',
          borderRadius: 28,
          backgroundColor: '#1A2026',
          boxShadow: '0 30px 80px #1A2026',
          transform: `translateY(${boardLift}px) scale(${boardScale})`,
          filter: `blur(${focusBlur}px)`,
        }}
      >
        {/* Glass surface layers */}
        <div
          style={{
            position: 'absolute',
            inset: 8,
            border: '1px solid #39414B',
            borderRadius: 21,
            opacity: 0.7,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            zIndex: 8,
            top: '-20%',
            bottom: '-20%',
            left: `${glareX}%`,
            width: '9%',
            backgroundColor: '#F4F4F4',
            opacity: 0.055,
            transform: 'skewX(-17deg)',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <div
          style={{
            height: '13%',
            zIndex: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                color: '#4DD0E1',
                fontSize: 15,
                fontWeight: 900,
                letterSpacing: 3.5,
                textTransform: 'uppercase',
              }}
            >
              CHRONIXEL / WAR ROOM 15
            </div>

            <div
              style={{
                marginTop: 7,
                color: '#F4F4F4',
                fontSize: 31,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: 'uppercase',
                transform: 'rotate(-0.6deg)',
              }}
            >
              BREAK THE TEMPLATE
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              color: '#F4F4F4',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
              border: '2px solid #39414B',
              borderRadius: 999,
              padding: '8px 14px',
              textTransform: 'uppercase',
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                backgroundColor: '#FF8A3D',
                transform: `scale(${pulse})`,
              }}
            />
            Glass board active
          </div>
        </div>

        {/* Main glass diagram */}
        <div
          style={{
            height: '72%',
            minHeight: 0,
            zIndex: 2,
            position: 'relative',
            borderTop: '1px solid #39414B',
            borderBottom: '1px solid #39414B',
          }}
        >
          <svg
            viewBox="0 0 900 500"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <clipPath id="uniqueReveal56">
                <rect
                  x="175"
                  y="78"
                  width={interpolate(reveal, [0, 1], [0, 550], clamp)}
                  height="390"
                  rx="28"
                />
              </clipPath>
            </defs>

            {/* Marker headline */}
            <path
              d="M39 66 C132 60 235 67 324 61"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="6"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={titleDraw}
            />
            <text
              x="42"
              y="49"
              fill="#F4F4F4"
              fontSize="24"
              fontWeight="900"
              letterSpacing="3"
              opacity={interpolate(frame, [5, 13], [0, 1], clamp)}
            >
              ① COOKIE-CUTTER CODE
            </text>

            {/* Unique code structure underneath */}
            <g
              clipPath="url(#uniqueReveal56)"
              opacity={reveal}
              transform="rotate(-1 450 270)"
            >
              <path
                d="M455 147 C420 122 382 111 342 118"
                fill="none"
                stroke="#4DD0E1"
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={structureDraw}
              />

              {connections.map((path, index) => (
                <path
                  key={path}
                  d={path}
                  fill="none"
                  stroke={index % 3 === 0 ? '#FF8A3D' : '#4DD0E1'}
                  strokeWidth={index % 2 === 0 ? 5 : 4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={interpolate(
                    frame,
                    [32 + index * 2, 52 + index * 2],
                    [1, 0],
                    clamp,
                  )}
                />
              ))}

              {nodes.map((node, index) => {
                const nodeSpring = spring({
                  frame: Math.max(0, frame - node.delay),
                  fps,
                  config: {damping: 9, mass: 0.42, stiffness: 180},
                });

                return (
                  <g
                    key={`${node.x}-${node.y}`}
                    transform={`translate(${node.x} ${node.y}) scale(${nodeSpring})`}
                  >
                    <circle
                      r={node.r + 8}
                      fill="none"
                      stroke={node.color}
                      strokeWidth="3"
                      opacity={0.32}
                    />
                    <circle
                      r={node.r}
                      fill="#1A2026"
                      stroke={node.color}
                      strokeWidth="6"
                    />
                    <text
                      x="0"
                      y="6"
                      textAnchor="middle"
                      fill="#F4F4F4"
                      fontSize="16"
                      fontWeight="900"
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}

              <path
                d="M602 372 C668 350 696 315 719 263"
                fill="none"
                stroke="#F4F4F4"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={structureDraw}
              />
              <path
                d="M706 272 L721 259 L724 279"
                fill="none"
                stroke="#F4F4F4"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <text
                x="617"
                y="404"
                fill="#4DD0E1"
                fontSize="22"
                fontWeight="900"
                letterSpacing="2"
              >
                UNIQUE LOGIC
              </text>
              <text
                x="617"
                y="431"
                fill="#F4F4F4"
                fontSize="14"
                fontWeight="800"
                letterSpacing="1.5"
              >
                BUILT FOR THE PROBLEM →
              </text>
            </g>

            {/* Cookie-cutter shell falling away */}
            <g
              opacity={cutterOpacity}
              transform={`translate(0 ${cutterY}) rotate(${cutterRotation} 455 255)`}
            >
              <path
                d="M351 118
                   C375 97 407 91 434 104
                   C452 75 489 75 506 105
                   C537 93 570 106 580 137
                   C611 144 626 176 611 204
                   C634 227 629 264 602 282
                   L602 376
                   C602 397 586 413 565 413
                   L343 413
                   C322 413 306 397 306 376
                   L306 282
                   C279 264 275 226 298 204
                   C283 174 299 142 329 136
                   C333 128 341 121 351 118 Z"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="8"
                strokeLinejoin="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={cutterDraw}
              />

              <path
                d="M338 174 L570 174 M338 226 L570 226 M338 278 L570 278 M338 330 L570 330"
                fill="none"
                stroke="#39414B"
                strokeWidth="5"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={cutterDraw}
              />

              <text
                x="454"
                y="371"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="18"
                fontWeight="900"
                letterSpacing="4"
              >
                SAME SHAPE
              </text>
            </g>

            {/* Hand-drawn release annotations */}
            <g opacity={interpolate(frame, [39, 49], [0, 1], clamp)}>
              <ellipse
                cx="764"
                cy="110"
                rx="91"
                ry="38"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="5"
                strokeDasharray="8 7"
              />
              <text
                x="764"
                y="117"
                textAnchor="middle"
                fill="#FF8A3D"
                fontSize="19"
                fontWeight="900"
                letterSpacing="2"
              >
                RELEASE IT!
              </text>
              <path
                d="M694 135 C657 154 631 178 609 213"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M609 213 L612 192 M609 213 L628 206"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>
          </svg>

          {/* Smudge erase pass */}
          <div
            style={{
              position: 'absolute',
              left: '5%',
              top: '7%',
              width: `${interpolate(smudge, [0, 1], [0, 31], clamp)}%`,
              height: 52,
              backgroundColor: '#1A2026',
              opacity: 0.88,
              filter: 'blur(7px)',
              transform: 'rotate(-1.2deg)',
            }}
          />
        </div>

        {/* Footer activation strip */}
        <div
          style={{
            height: '15%',
            zIndex: 3,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 28,
            paddingTop: 15,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              color: '#F4F4F4',
              fontSize: 18,
              lineHeight: 1.25,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              transform: 'rotate(-0.4deg)',
            }}
          >
            Conformity falls away.
            <span style={{color: '#4DD0E1'}}> Innovation stays.</span>
          </div>

          <div
            style={{
              minWidth: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '12px 20px',
              border: '2px solid #FF8A3D',
              borderRadius: 12,
              backgroundColor: '#FF8A3D',
              color: '#1A2026',
              fontSize: 15,
              fontWeight: 900,
              letterSpacing: 2.4,
              textTransform: 'uppercase',
              transform: `scale(${interpolate(
                activation,
                [0, 1],
                [0.78, 1],
                clamp,
              )}) rotate(-0.5deg)`,
              opacity: activation,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#1A2026',
                transform: `scale(${pulse})`,
              }}
            />
            Activation Code: ORIGINAL
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}