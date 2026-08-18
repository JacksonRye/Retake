import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene7() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 125, mass: 0.72},
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    clamp,
  );

  const focusBlur = interpolate(
    frame,
    [0, 8, 70, durationInFrames],
    [12, 0, 0, 8],
    clamp,
  );

  const panelY = interpolate(entrance, [0, 1], [52, 0]);
  const panelScale = interpolate(entrance, [0, 1], [0.96, 1]);

  const titleDraw = spring({
    frame: frame - 4,
    fps,
    config: {damping: 17, stiffness: 90, mass: 0.65},
  });

  const firstNode = spring({
    frame: frame - 13,
    fps,
    config: {damping: 11, stiffness: 150, mass: 0.55},
  });

  const secondNode = spring({
    frame: frame - 26,
    fps,
    config: {damping: 11, stiffness: 150, mass: 0.55},
  });

  const thirdNode = spring({
    frame: frame - 41,
    fps,
    config: {damping: 10, stiffness: 155, mass: 0.52},
  });

  const arrowOne = interpolate(frame, [19, 39], [0, 1], clamp);
  const arrowTwo = interpolate(frame, [36, 57], [0, 1], clamp);
  const underlineDraw = interpolate(frame, [6, 29], [0, 1], clamp);
  const loopDraw = interpolate(frame, [46, 67], [0, 1], clamp);

  const smudgeOpacity = interpolate(
    frame,
    [12, 24, 49, 63],
    [0, 0.66, 0.66, 0],
    clamp,
  );

  const smudgeShift = interpolate(frame, [49, 65], [0, 42], clamp);
  const glareX = interpolate(frame, [20, 67], [-125, 135], clamp);
  const glareOpacity = interpolate(
    frame,
    [18, 25, 56, 68],
    [0, 0.19, 0.19, 0],
    clamp,
  );

  const markerJitter =
    frame > 5 && frame < 67
      ? Math.sin(frame * 2.8) * 1.4 + Math.sin(frame * 5.1) * 0.65
      : 0;

  const pulse = 1 + Math.sin(frame * 0.22) * 0.025;
  const scanProgress = interpolate(frame, [48, 76], [0, 1], clamp);

  const nodeStyle = (
    progress: number,
    xOffset: number,
    rotation: number,
  ): React.CSSProperties => ({
    opacity: progress,
    transform: `translateY(${interpolate(
      progress,
      [0, 1],
      [38, 0],
    )}px) translateX(${interpolate(
      progress,
      [0, 1],
      [xOffset, 0],
    )}px) rotate(${interpolate(
      progress,
      [0, 1],
      [rotation, 0],
    )}deg) scale(${interpolate(progress, [0, 1], [0.66, 1])})`,
    transformOrigin: 'center',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(24px) brightness(0.4)',
        opacity: exit,
        fontFamily:
          '"Arial Rounded MT Bold", "Trebuchet MS", Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.13,
          backgroundImage:
            'linear-gradient(#39414B 1px, #1A2026 1px), linear-gradient(90deg, #39414B 1px, #1A2026 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '92%',
          height: '90%',
          border: '2px solid #39414B',
          borderRadius: 30,
          overflow: 'hidden',
          backgroundColor: '#1A2026',
          boxShadow:
            '0 34px 90px #1A2026, inset 0 0 70px #39414B, 0 0 0 1px #1A2026',
          opacity: entrance,
          filter: `blur(${focusBlur}px)`,
          transform: `translateY(${panelY}px) scale(${panelScale})`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              'linear-gradient(115deg, #1A2026 0%, #39414B 49%, #1A2026 51%, #1A2026 100%)',
            backgroundSize: '230% 100%',
            backgroundPosition: `${100 - scanProgress * 100}% 0%`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            zIndex: 8,
            top: '-15%',
            left: `${glareX}%`,
            width: '26%',
            height: '135%',
            opacity: glareOpacity,
            transform: 'skewX(-18deg)',
            background:
              'linear-gradient(90deg, #1A2026 0%, #F4F4F4 50%, #1A2026 100%)',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />

        <header
          style={{
            position: 'relative',
            zIndex: 3,
            height: '16%',
            minHeight: 92,
            padding: '24px 34px 14px',
            borderBottom: '2px solid #39414B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <div
              style={{
                color: '#1A2026',
                backgroundColor: '#FF8A3D',
                border: '2px solid #FF8A3D',
                borderRadius: 999,
                padding: '8px 15px 7px',
                fontSize: 15,
                fontWeight: 900,
                letterSpacing: 2.2,
              }}
            >
              WAR ROOM / 07
            </div>

            <div
              style={{
                color: '#F4F4F4',
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 3.8,
                opacity: titleDraw,
                transform: `translateX(${interpolate(
                  titleDraw,
                  [0, 1],
                  [-20, 0],
                )}px)`,
              }}
            >
              TOOL EVOLUTION MAP
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#4DD0E1',
              fontFamily: 'monospace',
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: 1.5,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: '#4DD0E1',
                transform: `scale(${pulse})`,
                boxShadow: '0 0 18px #4DD0E1',
              }}
            />
            GLASS LINK: ACTIVE
          </div>
        </header>

        <main
          style={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            padding: '18px 28px 10px',
          }}
        >
          <svg
            viewBox="0 0 1500 650"
            width="100%"
            height="100%"
            style={{overflow: 'visible'}}
          >
            <defs>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="markerSmudge">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <marker
                id="arrowOrange"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="9"
                markerHeight="9"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#FF8A3D" />
              </marker>
              <marker
                id="arrowCyan"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="9"
                markerHeight="9"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#4DD0E1" />
              </marker>
            </defs>

            <g opacity={0.28}>
              {[190, 370, 550].map((y) => (
                <path
                  key={y}
                  d={`M55 ${y} H1445`}
                  stroke="#39414B"
                  strokeWidth="2"
                  strokeDasharray="8 18"
                />
              ))}
              {[250, 750, 1250].map((x) => (
                <path
                  key={x}
                  d={`M${x} 80 V605`}
                  stroke="#39414B"
                  strokeWidth="2"
                  strokeDasharray="8 18"
                />
              ))}
            </g>

            <g
              opacity={smudgeOpacity}
              filter="url(#markerSmudge)"
              transform={`translate(${smudgeShift} 0)`}
            >
              <path
                d="M380 260 C530 198 635 342 773 274 S1014 192 1134 265"
                fill="none"
                stroke="#F4F4F4"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M402 284 C550 233 654 370 807 299 S1027 230 1163 287"
                fill="none"
                stroke="#39414B"
                strokeWidth="13"
                strokeLinecap="round"
              />
            </g>

            <g
              style={nodeStyle(firstNode, -46, -8)}
              filter="url(#softGlow)"
            >
              <circle
                cx="260"
                cy="330"
                r="113"
                fill="#1A2026"
                stroke="#FF8A3D"
                strokeWidth="9"
              />
              <circle
                cx="260"
                cy="330"
                r="96"
                fill="#1A2026"
                stroke="#39414B"
                strokeWidth="3"
                strokeDasharray="10 9"
              />
              <rect
                x="202"
                y="278"
                width="116"
                height="104"
                rx="18"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="7"
              />
              <path
                d="M225 308 H295 M225 332 H280 M225 356 H266"
                stroke="#FF8A3D"
                strokeWidth="9"
                strokeLinecap="round"
              />
              <circle cx="335" cy="244" r="31" fill="#FF8A3D" />
              <text
                x="335"
                y="255"
                textAnchor="middle"
                fill="#1A2026"
                fontSize="31"
                fontWeight="900"
              >
                1
              </text>
              <text
                x="260"
                y="478"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="31"
                fontWeight="900"
                letterSpacing="5"
              >
                CAPTURE
              </text>
              <text
                x="260"
                y="514"
                textAnchor="middle"
                fill="#FF8A3D"
                fontSize="17"
                fontWeight="900"
                letterSpacing="3"
              >
                RAW INTENT
              </text>
            </g>

            <path
              d="M388 326 C475 246 555 248 644 321"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="10"
              strokeLinecap="round"
              markerEnd="url(#arrowOrange)"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - arrowOne}
              style={{
                transform: `translateY(${markerJitter}px)`,
              }}
            />

            <g
              style={nodeStyle(secondNode, 0, 7)}
              filter="url(#softGlow)"
            >
              <circle
                cx="750"
                cy="330"
                r="124"
                fill="#1A2026"
                stroke="#4DD0E1"
                strokeWidth="9"
              />
              <circle
                cx="750"
                cy="330"
                r="105"
                fill="#1A2026"
                stroke="#39414B"
                strokeWidth="3"
                strokeDasharray="12 8"
              />
              <rect
                x="683"
                y="266"
                width="134"
                height="128"
                rx="28"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="7"
              />
              <circle cx="718" cy="306" r="17" fill="#4DD0E1" />
              <circle cx="782" cy="306" r="17" fill="#FF8A3D" />
              <circle cx="750" cy="359" r="17" fill="#F4F4F4" />
              <path
                d="M730 316 L742 344 M770 316 L758 344"
                stroke="#F4F4F4"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <circle cx="834" cy="238" r="31" fill="#4DD0E1" />
              <text
                x="834"
                y="249"
                textAnchor="middle"
                fill="#1A2026"
                fontSize="31"
                fontWeight="900"
              >
                2
              </text>
              <text
                x="750"
                y="488"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="31"
                fontWeight="900"
                letterSpacing="5"
              >
                CONNECT
              </text>
              <text
                x="750"
                y="524"
                textAnchor="middle"
                fill="#4DD0E1"
                fontSize="17"
                fontWeight="900"
                letterSpacing="3"
              >
                NO-CODE LOGIC
              </text>
            </g>

            <path
              d="M875 322 C965 396 1054 399 1136 324"
              fill="none"
              stroke="#4DD0E1"
              strokeWidth="10"
              strokeLinecap="round"
              markerEnd="url(#arrowCyan)"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - arrowTwo}
              style={{
                transform: `translateY(${-markerJitter}px)`,
              }}
            />

            <g
              style={nodeStyle(thirdNode, 52, -9)}
              filter="url(#softGlow)"
            >
              <circle
                cx="1240"
                cy="330"
                r="113"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="9"
              />
              <circle
                cx="1240"
                cy="330"
                r="95"
                fill="#1A2026"
                stroke="#39414B"
                strokeWidth="3"
                strokeDasharray="10 9"
              />
              <path
                d="M1193 350 L1230 387 L1302 285"
                fill="none"
                stroke="#4DD0E1"
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - loopDraw}
              />
              <path
                d="M1200 280 H1268"
                stroke="#FF8A3D"
                strokeWidth="11"
                strokeLinecap="round"
              />
              <circle cx="1317" cy="244" r="31" fill="#F4F4F4" />
              <text
                x="1317"
                y="255"
                textAnchor="middle"
                fill="#1A2026"
                fontSize="31"
                fontWeight="900"
              >
                3
              </text>
              <text
                x="1240"
                y="478"
                textAnchor="middle"
                fill="#F4F4F4"
                fontSize="31"
                fontWeight="900"
                letterSpacing="5"
              >
                EVOLVE
              </text>
              <text
                x="1240"
                y="514"
                textAnchor="middle"
                fill="#FF8A3D"
                fontSize="17"
                fontWeight="900"
                letterSpacing="3"
              >
                LIVE SYSTEM
              </text>
            </g>

            <path
              d="M112 102 C340 75 567 91 790 74 S1190 73 1383 99"
              fill="none"
              stroke="#F4F4F4"
              strokeWidth="7"
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - underlineDraw}
              style={{
                transform: `translateY(${markerJitter * 0.55}px)`,
              }}
            />

            <text
              x="748"
              y="62"
              textAnchor="middle"
              fill="#F4F4F4"
              fontSize="27"
              fontWeight="900"
              letterSpacing="7"
              opacity={titleDraw}
            >
              TOOLS DON&apos;T STOP — THEY TRANSFORM
            </text>
          </svg>
        </main>

        <footer
          style={{
            position: 'relative',
            zIndex: 4,
            height: '14%',
            minHeight: 82,
            padding: '12px 34px 18px',
            borderTop: '2px solid #39414B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
            <div
              style={{
                width: 44,
                height: 44,
                border: '3px solid #FF8A3D',
                borderRadius: 999,
                color: '#FF8A3D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 23,
                fontWeight: 900,
                transform: `rotate(${markerJitter * 0.4 - 5}deg)`,
              }}
            >
              !
            </div>
            <div>
              <div
                style={{
                  color: '#F4F4F4',
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: 2.8,
                }}
              >
                PRIORITY: KEEP THE FLOW MOVING
              </div>
              <div
                style={{
                  marginTop: 5,
                  color: '#4DD0E1',
                  fontFamily: 'monospace',
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: 1.8,
                }}
              >
                CAPTURE → CONNECT → EVOLVE
              </div>
            </div>
          </div>

          <div
            style={{
              padding: '10px 16px',
              border: '2px solid #39414B',
              borderRadius: 12,
              color: '#F4F4F4',
              backgroundColor: '#1A2026',
              fontFamily: 'monospace',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 1.6,
            }}
          >
            ACTIVATION CODE · NX-56
          </div>
        </footer>
      </div>
    </AbsoluteFill>
  );
}