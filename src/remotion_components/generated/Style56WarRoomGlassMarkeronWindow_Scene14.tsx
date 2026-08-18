import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene14() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const sceneOpacity = interpolate(
    frame,
    [0, 6, durationInFrames - 9, durationInFrames],
    [0, 1, 1, 0],
    clamp
  );

  const panelEntrance = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 125, mass: 0.72},
  });

  const handEntrance = spring({
    frame: frame - 12,
    fps,
    config: {damping: 10, stiffness: 145, mass: 0.62},
  });

  const impactSpring = spring({
    frame: frame - 20,
    fps,
    config: {damping: 8, stiffness: 175, mass: 0.48},
  });

  const pathProgress = interpolate(frame, [26, 66], [0, 1], clamp);
  const pathLength = 860;
  const arrowOpacity = interpolate(frame, [57, 68], [0, 1], clamp);
  const gridErase = interpolate(frame, [24, 55], [1, 0.1], clamp);
  const smudgeTravel = interpolate(frame, [24, 55], [-120, 490], clamp);
  const smudgeOpacity = interpolate(frame, [22, 30, 49, 58], [0, 0.9, 0.9, 0], clamp);
  const glareX = interpolate(frame, [6, 72], [-520, 1480], clamp);
  const focusBlur = interpolate(
    frame,
    [0, 8, 18, durationInFrames - 8, durationInFrames],
    [9, 4, 0, 0, 6],
    clamp
  );
  const focusScale = interpolate(
    frame,
    [0, 18, durationInFrames - 8, durationInFrames],
    [1.035, 1, 1, 1.025],
    clamp
  );

  const markerJitter =
    frame > 26 && frame < 66
      ? Math.sin(frame * 2.7) * 1.15
      : 0;

  const alertPulse = 1 + Math.sin(frame * 0.24) * 0.045;
  const impactRadius = interpolate(impactSpring, [0, 1], [18, 88], clamp);
  const shardSpread = interpolate(impactSpring, [0, 1], [0, 1], clamp);

  const priorities = [
    {number: '01', label: 'BREAK THE FRAME', x: 105, y: 142, delay: 8},
    {number: '02', label: 'DRAW THE ROUTE', x: 815, y: 135, delay: 28},
    {number: '03', label: 'SHIP IT FREE', x: 870, y: 565, delay: 52},
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(24px) brightness(0.4)',
        opacity: sceneOpacity,
        fontFamily: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(90deg, #39414B 1px, #1A2026 1px), linear-gradient(0deg, #39414B 1px, #1A2026 1px)',
          backgroundSize: '78px 78px',
          opacity: 0.16,
        }}
      />

      <div
        style={{
          width: '92%',
          height: '90%',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #39414B',
          borderRadius: 30,
          backgroundColor: '#1A2026',
          boxShadow: '0 34px 90px #1A2026, inset 0 0 80px #39414B',
          transform: `scale(${panelEntrance * focusScale}) translateY(${(1 - panelEntrance) * 35}px)`,
          filter: `blur(${focusBlur}px)`,
        }}
      >
        <div
          style={{
            height: 90,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            borderBottom: '2px solid #39414B',
            backgroundColor: '#1A2026',
            zIndex: 4,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 99,
                backgroundColor: '#FF8A3D',
                transform: `scale(${alertPulse})`,
                boxShadow: '0 0 22px #FF8A3D',
              }}
            />
            <div>
              <div
                style={{
                  color: '#F4F4F4',
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: 2.8,
                  lineHeight: 1,
                }}
              >
                WAR ROOM / GLASS_14
              </div>
              <div
                style={{
                  color: '#4DD0E1',
                  fontSize: 11,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: 3.4,
                  marginTop: 8,
                }}
              >
                ACTIVATION CODE: BUILD_FROM_ZERO
              </div>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div
              style={{
                color: '#F4F4F4',
                border: '1px solid #39414B',
                borderRadius: 999,
                padding: '8px 15px',
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: 1.5,
              }}
            >
              CONSTRAINT MAP
            </div>
            <div
              style={{
                color: '#1A2026',
                backgroundColor: '#4DD0E1',
                borderRadius: 999,
                padding: '9px 16px',
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 1.7,
              }}
            >
              PATH UNLOCKED
            </div>
          </div>
        </div>

        <div style={{position: 'relative', flex: 1, minHeight: 0}}>
          <svg
            viewBox="0 0 1200 680"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="glassFill56" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#39414B" stopOpacity="0.22" />
                <stop offset="52%" stopColor="#1A2026" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#4DD0E1" stopOpacity="0.12" />
              </linearGradient>

              <linearGradient id="markerBody56" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FF8A3D" />
                <stop offset="72%" stopColor="#FF8A3D" />
                <stop offset="73%" stopColor="#F4F4F4" />
                <stop offset="100%" stopColor="#F4F4F4" />
              </linearGradient>

              <filter id="glowCyan56" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feFlood floodColor="#4DD0E1" floodOpacity="0.85" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="glowOrange56" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feFlood floodColor="#FF8A3D" floodOpacity="0.78" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="smudge56" x="-30%" y="-100%" width="160%" height="300%">
                <feGaussianBlur stdDeviation="13" />
              </filter>

              <marker
                id="arrowOrange56"
                markerWidth="14"
                markerHeight="14"
                refX="11"
                refY="6"
                orient="auto"
              >
                <path d="M0,0 L12,6 L0,12 L3,6 Z" fill="#FF8A3D" />
              </marker>
            </defs>

            <rect
              x="30"
              y="28"
              width="1140"
              height="610"
              rx="26"
              fill="url(#glassFill56)"
              stroke="#39414B"
              strokeWidth="2"
            />

            <g opacity={gridErase}>
              {[210, 290, 370, 450].map((y, index) => (
                <path
                  key={`rail-${y}`}
                  d={`M95 ${y} H510`}
                  stroke="#39414B"
                  strokeWidth={index === 1 ? 8 : 3}
                  strokeDasharray={index === 1 ? '18 12' : '8 13'}
                  strokeLinecap="round"
                />
              ))}
              {[160, 270, 380, 490].map((x) => (
                <path
                  key={`bar-${x}`}
                  d={`M${x} 190 V485`}
                  stroke="#39414B"
                  strokeWidth="2"
                  strokeDasharray="6 14"
                />
              ))}
              <rect
                x="114"
                y="247"
                width="344"
                height="126"
                rx="10"
                fill="#1A2026"
                stroke="#39414B"
                strokeWidth="4"
              />
              <path
                d="M145 278 H426 M145 310 H398 M145 342 H414"
                stroke="#39414B"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <text
                x="115"
                y="520"
                fill="#39414B"
                fontSize="18"
                fontWeight="900"
                letterSpacing="3"
              >
                PREDEFINED STRUCTURE
              </text>
            </g>

            <g
              opacity={smudgeOpacity}
              transform={`translate(${smudgeTravel} 0)`}
              filter="url(#smudge56)"
            >
              <path
                d="M85 275 C155 245 220 300 295 263 C360 232 420 282 510 252"
                stroke="#F4F4F4"
                strokeWidth="44"
                strokeLinecap="round"
                opacity="0.33"
              />
              <path
                d="M65 345 C150 315 205 372 300 330 C375 297 438 352 526 319"
                stroke="#F4F4F4"
                strokeWidth="28"
                strokeLinecap="round"
                opacity="0.22"
              />
            </g>

            <g
              transform={`translate(${620} ${390}) scale(${impactSpring})`}
              opacity={interpolate(frame, [17, 24], [0, 1], clamp)}
            >
              <circle
                r={impactRadius}
                fill="#1A2026"
                stroke="#4DD0E1"
                strokeWidth="3"
                strokeDasharray="9 10"
                opacity="0.7"
              />
              {[
                [0, -112, -15, -50],
                [95, -66, 42, -30],
                [118, 35, 48, 14],
                [62, 108, 28, 43],
                [-55, 108, -25, 42],
                [-119, 39, -50, 15],
                [-102, -72, -43, -31],
                [36, -126, 16, -51],
              ].map(([x2, y2, x1, y1], index) => (
                <g key={`crack-${index}`}>
                  <path
                    d={`M ${x1 * shardSpread} ${y1 * shardSpread} L ${
                      x2 * shardSpread
                    } ${y2 * shardSpread}`}
                    stroke="#F4F4F4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.82"
                  />
                  <path
                    d={`M ${x2 * shardSpread} ${y2 * shardSpread} l ${
                      (index % 2 ? 14 : -13) * shardSpread
                    } ${(-8 + index * 2) * shardSpread}`}
                    stroke="#39414B"
                    strokeWidth="2"
                  />
                </g>
              ))}
            </g>

            <g opacity={interpolate(frame, [24, 30], [0, 1], clamp)}>
              <path
                d="M618 389 C670 316 730 245 810 252 C880 258 864 177 947 196 C1021 213 1010 111 1110 105"
                fill="none"
                stroke="#1A2026"
                strokeWidth="19"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - pathProgress)}
                opacity="0.82"
              />
              <path
                d="M618 389 C670 316 730 245 810 252 C880 258 864 177 947 196 C1021 213 1010 111 1110 105"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="11"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength * (1 - pathProgress)}
                markerEnd="url(#arrowOrange56)"
                filter="url(#glowOrange56)"
              />
              <path
                d="M627 386 C681 321 730 258 806 262"
                fill="none"
                stroke="#F4F4F4"
                strokeWidth="2"
                strokeDasharray="5 12"
                strokeDashoffset={-frame * 2}
                opacity="0.8"
              />
            </g>

            <g opacity={arrowOpacity}>
              <circle
                cx="1110"
                cy="105"
                r="28"
                fill="#1A2026"
                stroke="#4DD0E1"
                strokeWidth="4"
                filter="url(#glowCyan56)"
              />
              <path
                d="M1097 105 H1122 M1113 96 L1122 105 L1113 114"
                stroke="#F4F4F4"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {priorities.map((priority) => {
              const itemSpring = spring({
                frame: frame - priority.delay,
                fps,
                config: {damping: 11, stiffness: 155, mass: 0.52},
              });

              return (
                <g
                  key={priority.number}
                  transform={`translate(${priority.x} ${priority.y}) scale(${itemSpring})`}
                  opacity={itemSpring}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="28"
                    fill="#1A2026"
                    stroke={priority.number === '02' ? '#FF8A3D' : '#4DD0E1'}
                    strokeWidth="4"
                  />
                  <text
                    x="0"
                    y="7"
                    textAnchor="middle"
                    fill="#F4F4F4"
                    fontSize="18"
                    fontWeight="900"
                  >
                    {priority.number}
                  </text>
                  <text
                    x="42"
                    y="7"
                    fill="#F4F4F4"
                    fontSize="15"
                    fontWeight="900"
                    letterSpacing="2"
                  >
                    {priority.label}
                  </text>
                </g>
              );
            })}

            <path
              d="M295 142 C380 135 445 176 520 235"
              fill="none"
              stroke="#4DD0E1"
              strokeWidth="3"
              strokeDasharray="7 11"
              strokeDashoffset={-frame * 1.7}
              opacity="0.72"
            />
            <path
              d="M912 157 C870 185 842 208 817 249"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="3"
              strokeDasharray="7 11"
              strokeDashoffset={-frame * 1.7}
              opacity="0.8"
            />

            <g
              transform={`translate(${635 + markerJitter} ${
                416 + (1 - handEntrance) * 260
              }) rotate(-48) scale(${0.94 + handEntrance * 0.06})`}
              opacity={handEntrance}
            >
              <path
                d="M-55 78 C-102 104 -115 171 -84 225 C-60 266 -4 284 54 252 L103 224 C129 208 139 177 124 151 C112 130 89 122 68 130 C72 106 60 82 38 73 C18 64 -5 71 -17 88 C-24 72 -39 69 -55 78 Z"
                fill="#F4F4F4"
                stroke="#39414B"
                strokeWidth="5"
              />
              <path
                d="M-25 103 C-2 89 20 97 29 115 L55 167 M17 89 C40 75 62 86 70 105 L87 145 M-67 128 C-42 112 -21 121 -11 142 L18 199"
                fill="none"
                stroke="#39414B"
                strokeWidth="9"
                strokeLinecap="round"
                opacity="0.74"
              />
              <rect
                x="-27"
                y="-142"
                width="54"
                height="232"
                rx="18"
                fill="url(#markerBody56)"
                stroke="#1A2026"
                strokeWidth="6"
              />
              <path
                d="M-19 -142 L0 -177 L19 -142 Z"
                fill="#4DD0E1"
                stroke="#1A2026"
                strokeWidth="5"
              />
              <rect
                x="-27"
                y="40"
                width="54"
                height="35"
                rx="9"
                fill="#1A2026"
                stroke="#39414B"
                strokeWidth="4"
              />
              <path
                d="M-14 -88 H14 M-14 -69 H14"
                stroke="#1A2026"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>

            <g
              transform={`translate(${glareX} -50) rotate(17)`}
              opacity="0.17"
            >
              <rect
                x="0"
                y="0"
                width="110"
                height="840"
                rx="55"
                fill="#F4F4F4"
              />
              <rect
                x="145"
                y="0"
                width="24"
                height="840"
                rx="12"
                fill="#4DD0E1"
              />
            </g>

            <text
              x="70"
              y="608"
              fill="#39414B"
              fontFamily="monospace"
              fontSize="13"
              letterSpacing="2.2"
            >
              GLASS LAYER / LIVE INK / NO TEMPLATE
            </text>
          </svg>

          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 25,
              transform: `translateX(-50%) translateY(${
                (1 - spring({
                  frame: frame - 48,
                  fps,
                  config: {damping: 12, stiffness: 130, mass: 0.6},
                })) * 30
              }px)`,
              width: '72%',
              padding: '17px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 18,
              border: '2px solid #39414B',
              borderLeft: '7px solid #FF8A3D',
              backgroundColor: '#1A2026',
              boxShadow: '0 18px 44px #1A2026',
              opacity: interpolate(frame, [46, 57], [0, 1], clamp),
            }}
          >
            <div>
              <div
                style={{
                  color: '#F4F4F4',
                  fontSize: 24,
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: 1.6,
                }}
              >
                BUILD WITHOUT THE BOX.
              </div>
              <div
                style={{
                  color: '#4DD0E1',
                  fontFamily: 'monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 2.4,
                  marginTop: 9,
                }}
              >
                NEW PATH ACCEPTED — FREEDOM TO CREATE
              </div>
            </div>

            <div
              style={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 999,
                color: '#1A2026',
                backgroundColor: '#FF8A3D',
                fontSize: 25,
                fontWeight: 900,
                transform: `scale(${alertPulse})`,
              }}
            >
              ↗
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}