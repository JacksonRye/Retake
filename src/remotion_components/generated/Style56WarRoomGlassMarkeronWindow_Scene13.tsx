import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene13() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const sceneOpacity = interpolate(
    frame,
    [0, 7, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    clamp
  );

  const entrance = spring({
    frame,
    fps,
    config: {damping: 15, stiffness: 125, mass: 0.72},
  });

  const panelY = interpolate(entrance, [0, 1], [52, 0], clamp);
  const panelScale = interpolate(entrance, [0, 1], [0.965, 1], clamp);

  const draw = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], clamp);

  const titleDraw = draw(7, 24);
  const connectionDraw = draw(16, 47);
  const nodeDraw = draw(10, 36);
  const noteDraw = draw(35, 60);
  const activationDraw = draw(48, 70);

  const markerWobble =
    Math.sin(frame * 1.7) * 0.7 + Math.sin(frame * 0.61) * 0.35;

  const glareX = interpolate(frame, [20, 56], [-125, 130], clamp);
  const glareOpacity = interpolate(
    frame,
    [16, 21, 42, 55, 60],
    [0, 0.18, 0.48, 0.18, 0],
    clamp
  );

  const rackOne = interpolate(frame, [0, 17, 27, 35], [3, 3, 0, 0.6], clamp);
  const rackTwo = interpolate(frame, [26, 42, 54, 64], [2.5, 2.5, 0, 0], clamp);

  const smudge = interpolate(frame, [53, 65], [0, 1], clamp);
  const smudgeX = interpolate(smudge, [0, 1], [-52, 46], clamp);
  const smudgeScale = interpolate(smudge, [0, 0.5, 1], [0.5, 1.3, 0.2], clamp);
  const smudgeOpacity = interpolate(
    frame,
    [51, 55, 61, 67],
    [0, 0.52, 0.28, 0],
    clamp
  );

  const pulse = 1 + Math.sin(frame * 0.28) * 0.035;
  const alertPulse = 0.44 + (Math.sin(frame * 0.34) + 1) * 0.24;

  const code = 'ACTIVATION_CODE: MOD_NET_13';
  const visibleCharacters = Math.floor(
    interpolate(frame, [53, 74], [0, code.length], clamp)
  );
  const typedCode = code.slice(0, visibleCharacters);

  const nodeSpring = (delay: number) =>
    spring({
      frame: frame - delay,
      fps,
      config: {damping: 10, stiffness: 180, mass: 0.45},
    });

  const dashStyle = (progress: number) => ({
    strokeDasharray: 1,
    strokeDashoffset: 1 - progress,
  });

  const markerFont =
    '"Trebuchet MS", "Arial Rounded MT Bold", Arial, sans-serif';
  const monoFont = '"Courier New", Courier, monospace';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(24px) brightness(0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        opacity: sceneOpacity,
        fontFamily: markerFont,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '70%',
          height: 2,
          top: '10%',
          left: '15%',
          backgroundColor: '#39414B',
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 2,
          height: '70%',
          top: '15%',
          left: '7%',
          backgroundColor: '#39414B',
          opacity: 0.4,
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '92%',
          height: '88%',
          borderRadius: 30,
          border: '2px solid #39414B',
          backgroundColor: '#1A2026',
          boxShadow: '0 34px 90px #1A2026, inset 0 0 60px #39414B',
          overflow: 'hidden',
          transform: `translateY(${panelY}px) scale(${panelScale})`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            height: 74,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 34px',
            borderBottom: '1px solid #39414B',
            backgroundColor: '#1A2026',
            zIndex: 5,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#FF8A3D',
                boxShadow: '0 0 18px #FF8A3D',
                transform: `scale(${pulse})`,
              }}
            />
            <div
              style={{
                color: '#F4F4F4',
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: 2.2,
              }}
            >
              WAR ROOM / MODULE GLASS
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: '#4DD0E1',
              fontFamily: monoFont,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: 1.3,
            }}
          >
            <span>LIVE TOPOLOGY</span>
            <span
              style={{
                width: 34,
                height: 8,
                borderRadius: 8,
                border: '1px solid #4DD0E1',
                padding: 2,
              }}
            >
              <span
                style={{
                  display: 'block',
                  height: '100%',
                  width: `${interpolate(
                    frame,
                    [0, 72],
                    [12, 100],
                    clamp
                  )}%`,
                  borderRadius: 6,
                  backgroundColor: '#4DD0E1',
                }}
              />
            </span>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden',
          }}
        >
          <svg
            viewBox="0 0 1600 760"
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
              <filter id="cyanGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="orangeGlow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern
                id="grid"
                width="54"
                height="54"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 54 0 L 0 0 0 54"
                  fill="none"
                  stroke="#39414B"
                  strokeWidth="1"
                  opacity="0.24"
                />
              </pattern>
            </defs>

            <rect width="1600" height="760" fill="url(#grid)" />

            <g
              style={{
                filter: `blur(${rackOne}px)`,
                transition: 'filter 0.1s linear',
              }}
            >
              <text
                x="80"
                y="82"
                fill="#F4F4F4"
                fontSize="45"
                fontWeight="900"
                fontFamily={markerFont}
                letterSpacing="3"
                transform={`rotate(${-1.2 + markerWobble * 0.08} 80 82)`}
                opacity={titleDraw}
              >
                HOW THE MODULES TALK
              </text>
              <path
                d="M82 102 C260 112, 430 91, 625 104"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="8"
                strokeLinecap="round"
                pathLength={1}
                style={dashStyle(titleDraw)}
              />
              <path
                d="M650 98 l31 7 l-27 16"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={dashStyle(draw(18, 28))}
              />
            </g>

            <g
              fill="none"
              stroke="#4DD0E1"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#cyanGlow)"
              opacity="0.88"
            >
              <path
                d="M310 255 C430 255, 450 330, 560 345"
                pathLength={1}
                style={dashStyle(draw(17, 31))}
              />
              <path
                d="M760 345 C860 342, 875 235, 995 235"
                pathLength={1}
                style={dashStyle(draw(24, 38))}
              />
              <path
                d="M760 370 C885 385, 895 535, 1005 535"
                pathLength={1}
                style={dashStyle(draw(31, 45))}
              />
              <path
                d="M1200 235 C1318 240, 1348 320, 1350 382"
                pathLength={1}
                style={dashStyle(draw(37, 49))}
              />
              <path
                d="M1200 535 C1312 528, 1350 470, 1350 414"
                pathLength={1}
                style={dashStyle(draw(39, 51))}
              />
            </g>

            {[
              {x: 545, y: 338, rotation: 18, delay: 28},
              {x: 978, y: 236, rotation: -12, delay: 36},
              {x: 985, y: 530, rotation: 8, delay: 42},
              {x: 1337, y: 364, rotation: 72, delay: 46},
            ].map((arrow, index) => (
              <path
                key={index}
                d="M0 0 L24 12 L3 25"
                fill="none"
                stroke="#4DD0E1"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform={`translate(${arrow.x} ${arrow.y}) rotate(${
                  arrow.rotation
                }) scale(${Math.max(0, nodeSpring(arrow.delay))})`}
                opacity={connectionDraw}
                filter="url(#cyanGlow)"
              />
            ))}

            <g
              transform={`translate(205 255) scale(${Math.max(
                0,
                nodeSpring(8)
              )})`}
              style={{transformOrigin: '205px 255px'}}
            >
              <circle
                r="104"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="7"
              />
              <circle
                r="122"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="6"
                strokeDasharray="18 15"
                opacity={nodeDraw}
              />
              <circle
                cx="-92"
                cy="-92"
                r="27"
                fill="#FF8A3D"
                stroke="#1A2026"
                strokeWidth="5"
              />
              <text
                x="-92"
                y="-82"
                textAnchor="middle"
                fill="#1A2026"
                fontSize="26"
                fontWeight="900"
              >
                1
              </text>
              <text
                y="-10"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="26"
                fontWeight="900"
                letterSpacing="2"
              >
                INPUT
              </text>
              <text
                y="28"
                textAnchor="middle"
                fill="#4DD0E1"
                fontFamily={monoFont}
                fontSize="19"
                fontWeight="700"
              >
                EVENT_STREAM
              </text>
            </g>

            <g
              transform={`translate(660 355) scale(${Math.max(
                0,
                nodeSpring(17)
              ) * pulse})`}
              style={{transformOrigin: '660px 355px'}}
              filter="url(#orangeGlow)"
            >
              <rect
                x="-105"
                y="-84"
                width="210"
                height="168"
                rx="27"
                fill="#1A2026"
                stroke="#FF8A3D"
                strokeWidth="8"
              />
              <circle
                cx="-103"
                cy="-82"
                r="27"
                fill="#FF8A3D"
                stroke="#1A2026"
                strokeWidth="5"
              />
              <text
                x="-103"
                y="-72"
                textAnchor="middle"
                fill="#1A2026"
                fontSize="26"
                fontWeight="900"
              >
                2
              </text>
              <text
                y="-13"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="25"
                fontWeight="900"
                letterSpacing="2"
              >
                ROUTER
              </text>
              <path
                d="M-46 25 L0 52 L48 24"
                fill="none"
                stroke="#4DD0E1"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            <g
              style={{
                filter: `blur(${rackTwo}px)`,
                transition: 'filter 0.1s linear',
              }}
            >
              <g
                transform={`translate(1100 235) scale(${Math.max(
                  0,
                  nodeSpring(29)
                )})`}
                style={{transformOrigin: '1100px 235px'}}
              >
                <rect
                  x="-110"
                  y="-72"
                  width="220"
                  height="144"
                  rx="72"
                  fill="#1A2026"
                  stroke="#F4F4F4"
                  strokeWidth="7"
                />
                <circle
                  cx="-108"
                  cy="-70"
                  r="26"
                  fill="#4DD0E1"
                  stroke="#1A2026"
                  strokeWidth="5"
                />
                <text
                  x="-108"
                  y="-60"
                  textAnchor="middle"
                  fill="#1A2026"
                  fontSize="25"
                  fontWeight="900"
                >
                  3
                </text>
                <text
                  y="-5"
                  textAnchor="middle"
                  fill="#F4F4F4"
                  fontSize="24"
                  fontWeight="900"
                >
                  VALIDATE
                </text>
                <text
                  y="29"
                  textAnchor="middle"
                  fill="#4DD0E1"
                  fontFamily={monoFont}
                  fontSize="18"
                >
                  schema.ok
                </text>
              </g>

              <g
                transform={`translate(1100 535) scale(${Math.max(
                  0,
                  nodeSpring(35)
                )})`}
                style={{transformOrigin: '1100px 535px'}}
              >
                <rect
                  x="-110"
                  y="-72"
                  width="220"
                  height="144"
                  rx="25"
                  fill="#1A2026"
                  stroke="#F4F4F4"
                  strokeWidth="7"
                />
                <circle
                  cx="-108"
                  cy="-70"
                  r="26"
                  fill="#4DD0E1"
                  stroke="#1A2026"
                  strokeWidth="5"
                />
                <text
                  x="-108"
                  y="-60"
                  textAnchor="middle"
                  fill="#1A2026"
                  fontSize="25"
                  fontWeight="900"
                >
                  4
                </text>
                <text
                  y="-5"
                  textAnchor="middle"
                  fill="#F4F4F4"
                  fontSize="24"
                  fontWeight="900"
                >
                  EXECUTE
                </text>
                <text
                  y="29"
                  textAnchor="middle"
                  fill="#FF8A3D"
                  fontFamily={monoFont}
                  fontSize="18"
                >
                  module.run()
                </text>
              </g>

              <g
                transform={`translate(1382 400) scale(${Math.max(
                  0,
                  nodeSpring(42)
                )})`}
                style={{transformOrigin: '1382px 400px'}}
              >
                <circle
                  r="102"
                  fill="#1A2026"
                  stroke="#4DD0E1"
                  strokeWidth="8"
                  filter="url(#cyanGlow)"
                />
                <circle
                  r="84"
                  fill="none"
                  stroke="#4DD0E1"
                  strokeWidth="3"
                  strokeDasharray="8 12"
                  opacity={alertPulse}
                />
                <text
                  y="-8"
                  textAnchor="middle"
                  fill="#F4F4F4"
                  fontSize="24"
                  fontWeight="900"
                >
                  OUTPUT
                </text>
                <text
                  y="30"
                  textAnchor="middle"
                  fill="#4DD0E1"
                  fontFamily={monoFont}
                  fontSize="18"
                  fontWeight="700"
                >
                  STATUS 200
                </text>
              </g>
            </g>

            <g
              opacity={noteDraw}
              transform={`rotate(${markerWobble * 0.18} 340 600)`}
            >
              <path
                d="M105 570 C180 525, 278 525, 392 552"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="7"
                strokeLinecap="round"
                pathLength={1}
                style={dashStyle(noteDraw)}
              />
              <path
                d="M384 533 L413 558 L376 566"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                style={dashStyle(draw(43, 56))}
              />
              <text
                x="98"
                y="621"
                fill="#FF8A3D"
                fontSize="27"
                fontWeight="900"
                letterSpacing="1"
              >
                ROUTE ONCE — REUSE EVERYWHERE
              </text>
            </g>

            <g opacity={activationDraw}>
              <rect
                x="420"
                y="658"
                width="760"
                height="62"
                rx="14"
                fill="#1A2026"
                stroke="#39414B"
                strokeWidth="3"
              />
              <text
                x="450"
                y="699"
                fill="#4DD0E1"
                fontFamily={monoFont}
                fontSize="24"
                fontWeight="700"
                letterSpacing="1.2"
              >
                {typedCode}
                <tspan
                  fill="#F4F4F4"
                  opacity={Math.floor(frame / 4) % 2 === 0 ? 1 : 0}
                >
                  ▌
                </tspan>
              </text>
            </g>

            <g
              opacity={smudgeOpacity}
              transform={`translate(${smudgeX} 0) scale(${smudgeScale} 1)`}
              style={{transformOrigin: '830px 610px'}}
            >
              <path
                d="M760 604 C810 580, 880 584, 925 609"
                fill="none"
                stroke="#F4F4F4"
                strokeWidth="30"
                strokeLinecap="round"
                opacity="0.22"
              />
              <path
                d="M775 620 C835 603, 880 609, 945 626"
                fill="none"
                stroke="#39414B"
                strokeWidth="18"
                strokeLinecap="round"
                opacity="0.7"
              />
            </g>
          </svg>

          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: `${glareX}%`,
              width: '18%',
              height: '145%',
              backgroundColor: '#F4F4F4',
              opacity: glareOpacity,
              filter: 'blur(24px)',
              transform: 'skewX(-18deg) rotate(5deg)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              right: 28,
              bottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#F4F4F4',
              fontFamily: monoFont,
              fontSize: 12,
              letterSpacing: 1.2,
              opacity: interpolate(frame, [55, 69], [0, 0.72], clamp),
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: '#4DD0E1',
                boxShadow: '0 0 12px #4DD0E1',
              }}
            />
            GLASS LINK STABLE
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}