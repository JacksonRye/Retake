import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene16() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const draw = (start: number, end: number) =>
    interpolate(frame, [start, end], [100, 0], clamp);

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 13,
      mass: 0.62,
      stiffness: 130,
    },
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [1, 0],
    clamp,
  );

  const focusBlur = interpolate(
    frame,
    [0, 8, 13, 20],
    [14, 14, 0, 0],
    clamp,
  );

  const focusScale = interpolate(
    frame,
    [0, 15],
    [1.035, 1],
    clamp,
  );

  const headerOpacity = interpolate(frame, [2, 11], [0, 1], clamp);
  const headerY = interpolate(frame, [2, 14], [-18, 0], clamp);

  const glassGlareX = interpolate(frame, [8, 54], [-34, 132], clamp);
  const secondaryGlareX = interpolate(frame, [52, 84], [-30, 125], clamp);

  const pulse = 1 + Math.sin(frame * 0.32) * 0.025;
  const successPulse = spring({
    frame: frame - 53,
    fps,
    config: {
      damping: 7,
      mass: 0.48,
      stiffness: 170,
    },
  });

  const successOpacity = interpolate(frame, [50, 60], [0, 1], clamp);
  const goodLuckOpacity = interpolate(frame, [63, 74], [0, 1], clamp);
  const goodLuckY = interpolate(frame, [63, 76], [16, 0], clamp);

  const wrongRouteOpacity = interpolate(
    frame,
    [28, 36, 51, 62],
    [0, 0.75, 0.75, 0],
    clamp,
  );

  const smudgeX = interpolate(frame, [50, 63], [-120, 420], clamp);
  const smudgeOpacity = interpolate(
    frame,
    [48, 53, 60, 65],
    [0, 0.58, 0.58, 0],
    clamp,
  );

  const markerOpacity = interpolate(
    frame,
    [5, 9, 70, 78],
    [0, 1, 1, 0],
    clamp,
  );

  const markerX = interpolate(
    frame,
    [9, 19, 27, 36, 45, 55, 66, 74],
    [302, 474, 595, 749, 900, 1055, 733, 936],
    clamp,
  );

  const markerY = interpolate(
    frame,
    [9, 19, 27, 36, 45, 55, 66, 74],
    [310, 309, 448, 310, 309, 309, 685, 674],
    clamp,
  );

  const markerRotation = interpolate(
    frame,
    [9, 27, 45, 66, 74],
    [-13, 24, -10, 18, -8],
    clamp,
  );

  const squeakScale = 1 + Math.sin(frame * 1.65) * 0.045;

  const priorityOne = spring({
    frame: frame - 7,
    fps,
    config: {damping: 9, mass: 0.4, stiffness: 180},
  });
  const priorityTwo = spring({
    frame: frame - 25,
    fps,
    config: {damping: 9, mass: 0.4, stiffness: 180},
  });
  const priorityThree = spring({
    frame: frame - 42,
    fps,
    config: {damping: 9, mass: 0.4, stiffness: 180},
  });

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
          backgroundImage:
            'radial-gradient(circle at 50% 40%, #39414B 0%, #1A2026 68%)',
          opacity: 0.48,
        }}
      />

      <div
        style={{
          width: '92%',
          height: '90%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 34,
          border: '2px solid #39414B',
          backgroundColor: '#1A2026',
          boxShadow: '0 34px 90px #1A2026',
          overflow: 'hidden',
          transform: `scale(${entrance * focusScale})`,
          filter: `blur(${focusBlur}px)`,
        }}
      >
        <div
          style={{
            height: 94,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 38px',
            borderBottom: '2px solid #39414B',
            opacity: headerOpacity,
            transform: `translateY(${headerY}px)`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: '50%',
                backgroundColor: '#FF8A3D',
                boxShadow: '0 0 22px #FF8A3D',
                transform: `scale(${pulse})`,
              }}
            />
            <div
              style={{
                color: '#F4F4F4',
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: 4,
              }}
            >
              WORKFLOW WAR ROOM
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div
              style={{
                color: '#4DD0E1',
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 2.2,
                border: '1px solid #4DD0E1',
                borderRadius: 999,
                padding: '8px 15px',
              }}
            >
              ACTIVATION CODE
            </div>
            <div
              style={{
                color: '#1A2026',
                backgroundColor: '#4DD0E1',
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 2,
                borderRadius: 999,
                padding: '9px 16px',
              }}
            >
              PATH–16
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            flex: 1,
            margin: 22,
            borderRadius: 25,
            border: '1px solid #39414B',
            backgroundColor: '#1A2026',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 32,
              top: 24,
              zIndex: 3,
            }}
          >
            <div
              style={{
                color: '#FF8A3D',
                fontSize: 15,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: 3.2,
                marginBottom: 8,
              }}
            >
              BUILD THE ROUTE
            </div>
            <div
              style={{
                color: '#F4F4F4',
                fontSize: 32,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: 1.5,
              }}
            >
              FROM IDEA → SUCCESS
            </div>
          </div>

          <svg
            viewBox="0 0 1400 730"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <defs>
              <marker
                id="arrowCyan"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4DD0E1" />
              </marker>
              <marker
                id="arrowOrange"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="8"
                markerHeight="8"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF8A3D" />
              </marker>
            </defs>

            <g
              fill="none"
              stroke="#39414B"
              strokeWidth="2"
              opacity="0.55"
            >
              <path d="M70 172 H1330" strokeDasharray="6 16" />
              <path d="M70 556 H1330" strokeDasharray="6 16" />
              <path d="M160 185 V545" strokeDasharray="6 16" />
              <path d="M1240 185 V545" strokeDasharray="6 16" />
            </g>

            <g
              transform={`translate(245 315) scale(${priorityOne})`}
              style={{transformOrigin: '245px 315px'}}
            >
              <rect
                x="-105"
                y="-66"
                width="210"
                height="132"
                rx="25"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="5"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={draw(6, 18)}
              />
              <circle
                cx="-84"
                cy="-69"
                r="24"
                fill="#FF8A3D"
                stroke="#1A2026"
                strokeWidth="5"
              />
              <text
                x="-84"
                y="-60"
                textAnchor="middle"
                fill="#1A2026"
                fontSize="27"
                fontWeight="900"
              >
                1
              </text>
              <text
                x="0"
                y="-6"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="28"
                fontWeight="900"
                letterSpacing="3"
              >
                IDEA
              </text>
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fill="#FF8A3D"
                fontSize="16"
                fontWeight="900"
                letterSpacing="2"
              >
                DEFINE
              </text>
            </g>

            <path
              d="M352 315 C405 270 450 270 500 315"
              fill="none"
              stroke="#4DD0E1"
              strokeWidth="8"
              strokeLinecap="round"
              markerEnd="url(#arrowCyan)"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={draw(16, 28)}
            />

            <g
              transform={`translate(610 315) scale(${priorityTwo})`}
              style={{transformOrigin: '610px 315px'}}
            >
              <rect
                x="-105"
                y="-66"
                width="210"
                height="132"
                rx="25"
                fill="#1A2026"
                stroke="#4DD0E1"
                strokeWidth="5"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={draw(23, 35)}
              />
              <circle
                cx="-84"
                cy="-69"
                r="24"
                fill="#4DD0E1"
                stroke="#1A2026"
                strokeWidth="5"
              />
              <text
                x="-84"
                y="-60"
                textAnchor="middle"
                fill="#1A2026"
                fontSize="27"
                fontWeight="900"
              >
                2
              </text>
              <text
                x="0"
                y="-6"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="28"
                fontWeight="900"
                letterSpacing="3"
              >
                BUILD
              </text>
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fill="#4DD0E1"
                fontSize="16"
                fontWeight="900"
                letterSpacing="2"
              >
                CONNECT
              </text>
            </g>

            <path
              d="M718 315 C770 360 820 360 870 315"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="8"
              strokeLinecap="round"
              markerEnd="url(#arrowOrange)"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={draw(32, 45)}
            />

            <g
              transform={`translate(980 315) scale(${priorityThree})`}
              style={{transformOrigin: '980px 315px'}}
            >
              <rect
                x="-105"
                y="-66"
                width="210"
                height="132"
                rx="25"
                fill="#1A2026"
                stroke="#FF8A3D"
                strokeWidth="5"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={draw(40, 52)}
              />
              <circle
                cx="-84"
                cy="-69"
                r="24"
                fill="#FF8A3D"
                stroke="#1A2026"
                strokeWidth="5"
              />
              <text
                x="-84"
                y="-60"
                textAnchor="middle"
                fill="#1A2026"
                fontSize="27"
                fontWeight="900"
              >
                3
              </text>
              <text
                x="0"
                y="-6"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="28"
                fontWeight="900"
                letterSpacing="3"
              >
                TEST
              </text>
              <text
                x="0"
                y="28"
                textAnchor="middle"
                fill="#FF8A3D"
                fontSize="16"
                fontWeight="900"
                letterSpacing="2"
              >
                VERIFY
              </text>
            </g>

            <path
              d="M1088 315 C1135 270 1178 272 1215 315"
              fill="none"
              stroke="#4DD0E1"
              strokeWidth="8"
              strokeLinecap="round"
              markerEnd="url(#arrowCyan)"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={draw(48, 59)}
            />

            <g
              opacity={successOpacity}
              transform={`translate(1270 315) scale(${Math.max(
                0,
                successPulse,
              )})`}
              style={{transformOrigin: '1270px 315px'}}
            >
              <circle
                cx="0"
                cy="0"
                r="83"
                fill="#4DD0E1"
                stroke="#F4F4F4"
                strokeWidth="7"
              />
              <path
                d="M-39 2 L-10 31 L45 -35"
                fill="none"
                stroke="#1A2026"
                strokeWidth="14"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={draw(54, 64)}
              />
              <text
                x="0"
                y="122"
                textAnchor="middle"
                fill="#4DD0E1"
                fontSize="22"
                fontWeight="900"
                letterSpacing="3"
              >
                SUCCESS
              </text>
            </g>

            <g opacity={wrongRouteOpacity}>
              <path
                d="M610 390 C620 460 715 485 760 445"
                fill="none"
                stroke="#39414B"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="12 12"
              />
              <text
                x="768"
                y="450"
                fill="#39414B"
                fontSize="20"
                fontWeight="900"
                letterSpacing="2"
              >
                OVERTHINK
              </text>
              <path
                d="M745 422 L792 467 M792 422 L745 467"
                stroke="#FF8A3D"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </g>

            <g
              opacity={goodLuckOpacity}
              transform={`translate(0 ${goodLuckY})`}
            >
              <path
                d="M440 603 C565 574 823 574 957 603"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="7"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={draw(65, 77)}
              />
              <text
                x="700"
                y="570"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="58"
                fontWeight="900"
                letterSpacing="8"
                transform="rotate(-2 700 570)"
              >
                GOOD LUCK!
              </text>
              <path
                d="M944 566 C1010 535 1085 535 1132 570"
                fill="none"
                stroke="#4DD0E1"
                strokeWidth="7"
                strokeLinecap="round"
                markerEnd="url(#arrowCyan)"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={draw(70, 81)}
              />
            </g>
          </svg>

          <div
            style={{
              position: 'absolute',
              width: 520,
              height: 72,
              left: smudgeX,
              top: '56%',
              backgroundColor: '#39414B',
              borderRadius: '50%',
              filter: 'blur(19px)',
              opacity: smudgeOpacity,
              transform: 'rotate(-5deg)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: `${glassGlareX}%`,
              top: '-20%',
              width: '16%',
              height: '145%',
              backgroundColor: '#F4F4F4',
              opacity: 0.1,
              transform: 'rotate(16deg)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: `${secondaryGlareX}%`,
              top: '-25%',
              width: '5%',
              height: '150%',
              backgroundColor: '#4DD0E1',
              opacity: 0.09,
              transform: 'rotate(16deg)',
              filter: 'blur(7px)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: markerX,
              top: markerY,
              width: 142,
              height: 35,
              borderRadius: 18,
              backgroundColor: '#F4F4F4',
              border: '4px solid #1A2026',
              boxShadow: '0 12px 24px #1A2026',
              opacity: markerOpacity,
              transform: `translate(-16px, -18px) rotate(${markerRotation}deg) scale(${squeakScale})`,
              transformOrigin: '16px 18px',
              zIndex: 8,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -18,
                top: 5,
                width: 28,
                height: 18,
                backgroundColor: '#FF8A3D',
                clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 10,
                top: 8,
                width: 48,
                height: 11,
                borderRadius: 8,
                backgroundColor: '#39414B',
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 32,
              bottom: 24,
              color: '#39414B',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2.4,
            }}
          >
            GLASS BOARD / LIVE PLAN / SCENE 16
          </div>

          <div
            style={{
              position: 'absolute',
              right: 30,
              bottom: 22,
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              color: '#4DD0E1',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2.2,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#4DD0E1',
                boxShadow: '0 0 14px #4DD0E1',
              }}
            />
            ROUTE LOCKED
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}