import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene12() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, mass: 0.7, stiffness: 115},
  });

  const panelY = interpolate(entrance, [0, 1], [70, 0]);
  const panelScale = interpolate(entrance, [0, 1], [0.94, 1]);
  const sceneOpacity = interpolate(
    frame,
    [0, 8, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  const focusBlur = interpolate(
    frame,
    [0, 8, 18, 69, 80],
    [12, 7, 0, 0, 4],
    clamp,
  );

  const focusScale = interpolate(
    frame,
    [0, 18, 65, 80],
    [1.035, 1, 1, 1.018],
    clamp,
  );

  const draw = (start: number, end: number) =>
    interpolate(frame, [start, end], [1, 0], clamp);

  const titleDraw = draw(8, 25);
  const lineOneDraw = draw(18, 34);
  const lineTwoDraw = draw(28, 44);
  const lineThreeDraw = draw(38, 54);
  const constraintDraw = draw(44, 63);

  const nodeEntrance = (start: number) =>
    spring({
      frame: frame - start,
      fps,
      config: {damping: 10, mass: 0.45, stiffness: 150},
    });

  const node1 = nodeEntrance(14);
  const node2 = nodeEntrance(25);
  const node3 = nodeEntrance(36);
  const node4 = nodeEntrance(47);

  const glareX = interpolate(frame, [8, 48], [-130, 135], clamp);
  const glareOpacity = interpolate(
    frame,
    [8, 14, 39, 48],
    [0, 0.16, 0.11, 0],
    clamp,
  );

  const smudgeProgress = interpolate(frame, [58, 69], [0, 1], clamp);
  const smudgeOpacity = interpolate(
    frame,
    [56, 60, 72, 79],
    [0, 0.82, 0.82, 0.25],
    clamp,
  );

  const warningPulse = 1 + Math.sin(frame * 0.42) * 0.035;
  const alertOpacity = interpolate(
    frame,
    [51, 57, 61],
    [0, 0, 1],
    clamp,
  );

  const footerSpring = spring({
    frame: frame - 57,
    fps,
    config: {damping: 12, mass: 0.6, stiffness: 130},
  });

  const markerFont =
    '"Arial Narrow", "Trebuchet MS", Arial, sans-serif';

  const nodes = [
    {
      x: 84,
      y: 220,
      w: 192,
      label: 'NO-CODE UI',
      priority: '1',
      scale: node1,
      color: '#F4F4F4',
    },
    {
      x: 344,
      y: 220,
      w: 198,
      label: 'TEMPLATE',
      priority: '2',
      scale: node2,
      color: '#F4F4F4',
    },
    {
      x: 610,
      y: 220,
      w: 170,
      label: 'API',
      priority: '3',
      scale: node3,
      color: '#4DD0E1',
    },
    {
      x: 848,
      y: 220,
      w: 226,
      label: 'EXISTING CODE',
      priority: '4',
      scale: node4,
      color: '#FF8A3D',
    },
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
        fontFamily: markerFont,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(#39414B 1px, #1A2026 1px), linear-gradient(90deg, #39414B 1px, #1A2026 1px)',
          backgroundSize: '96px 96px',
          opacity: 0.16,
        }}
      />

      <div
        style={{
          width: '92%',
          height: '88%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          border: '2px solid #39414B',
          borderRadius: 28,
          overflow: 'hidden',
          backgroundColor: '#1A2026',
          boxShadow: '0 32px 80px #1A2026',
          transform: `translateY(${panelY}px) scale(${panelScale})`,
          filter: `blur(${focusBlur}px)`,
        }}
      >
        <div
          style={{
            height: 84,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 34px',
            borderBottom: '2px solid #39414B',
            backgroundColor: '#1A2026',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#FF8A3D',
                boxShadow: '0 0 18px #FF8A3D',
                transform: `scale(${warningPulse})`,
              }}
            />
            <div
              style={{
                color: '#F4F4F4',
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: 3.5,
              }}
            >
              WAR ROOM GLASS
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div
              style={{
                border: '2px solid #4DD0E1',
                borderRadius: 999,
                padding: '7px 14px',
                color: '#4DD0E1',
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              ACTIVATION CODE
            </div>
            <div
              style={{
                color: '#F4F4F4',
                fontFamily: 'monospace',
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              NX-56 / LIVE
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            flex: 1,
            overflow: 'hidden',
            transform: `scale(${focusScale})`,
            transformOrigin: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 26,
              left: 42,
              color: '#F4F4F4',
              fontSize: 38,
              fontWeight: 950,
              letterSpacing: 2,
              lineHeight: 1,
              transform: 'rotate(-1deg)',
            }}
          >
            THE “NO-CODE” CHAIN
          </div>

          <div
            style={{
              position: 'absolute',
              top: 30,
              right: 42,
              color: '#FF8A3D',
              fontSize: 18,
              fontWeight: 950,
              letterSpacing: 2,
              transform: 'rotate(1.5deg)',
            }}
          >
            CIRCLE THE BOTTLENECKS
          </div>

          <svg
            viewBox="0 0 1160 500"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <path
              d="M44 80 C260 75 447 91 684 78 C854 68 994 84 1110 75"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="1100"
              strokeDashoffset={1100 * titleDraw}
            />

            <path
              d="M276 257 C301 224 316 224 344 257"
              fill="none"
              stroke="#F4F4F4"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="125"
              strokeDashoffset={125 * lineOneDraw}
            />
            <path
              d="M542 257 C571 224 582 224 610 257"
              fill="none"
              stroke="#F4F4F4"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="125"
              strokeDashoffset={125 * lineTwoDraw}
            />
            <path
              d="M780 257 C808 224 821 224 848 257"
              fill="none"
              stroke="#4DD0E1"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="125"
              strokeDashoffset={125 * lineThreeDraw}
            />

            <path
              d="M314 245 L330 257 L313 269 M580 245 L596 257 L579 269 M818 245 L834 257 L817 269"
              fill="none"
              stroke="#F4F4F4"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="150"
              strokeDashoffset={150 * lineThreeDraw}
            />

            {nodes.map((node) => (
              <g
                key={node.label}
                style={{
                  transform: `translate(${node.x + node.w / 2}px, 257px) scale(${node.scale}) translate(${
                    -(node.x + node.w / 2)
                  }px, -257px)`,
                  transformOrigin: 'center',
                }}
              >
                <rect
                  x={node.x}
                  y={node.y}
                  width={node.w}
                  height="74"
                  rx="20"
                  fill="#1A2026"
                  stroke={node.color}
                  strokeWidth="5"
                />
                <circle
                  cx={node.x + 5}
                  cy={node.y - 4}
                  r="24"
                  fill="#1A2026"
                  stroke={node.color}
                  strokeWidth="5"
                />
                <text
                  x={node.x + 5}
                  y={node.y + 4}
                  fill={node.color}
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="900"
                  fontFamily={markerFont}
                >
                  {node.priority}
                </text>
                <text
                  x={node.x + node.w / 2}
                  y={node.y + 46}
                  fill={node.color}
                  textAnchor="middle"
                  fontSize="21"
                  fontWeight="900"
                  letterSpacing="1.5"
                  fontFamily={markerFont}
                >
                  {node.label}
                </text>
              </g>
            ))}

            <path
              d="M76 340 C220 321 356 326 498 340 C663 358 828 350 1080 326"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="1060"
              strokeDashoffset={1060 * constraintDraw}
            />

            <path
              d="M1081 326 L1051 310 M1081 326 L1055 346"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 * constraintDraw}
            />

            <text
              x="86"
              y="388"
              fill="#FF8A3D"
              fontSize="22"
              fontWeight="900"
              letterSpacing="2"
              fontFamily={markerFont}
              opacity={alertOpacity}
            >
              EACH “EASY” STEP INHERITS THE LIMITS OF THE NEXT →
            </text>

            <g opacity={smudgeOpacity}>
              <path
                d={`M${810 + smudgeProgress * 45} 218 C${
                  850 + smudgeProgress * 70
                } 238 ${900 + smudgeProgress * 90} 273 ${
                  1060 + smudgeProgress * 36
                } 300`}
                fill="none"
                stroke="#39414B"
                strokeWidth="29"
                strokeLinecap="round"
              />
              <path
                d={`M${830 + smudgeProgress * 32} 294 C${
                  900 + smudgeProgress * 55
                } 264 ${980 + smudgeProgress * 52} 231 ${
                  1080 + smudgeProgress * 24
                } 220`}
                fill="none"
                stroke="#39414B"
                strokeWidth="17"
                strokeLinecap="round"
              />
            </g>

            <path
              d="M866 191 C900 157 1021 155 1095 194 C1125 220 1115 304 1068 321 C986 343 886 326 851 286 C831 254 838 215 866 191 Z"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="620"
              strokeDashoffset={620 * constraintDraw}
              opacity={alertOpacity}
            />
          </svg>

          <div
            style={{
              position: 'absolute',
              left: 42,
              right: 42,
              bottom: 24,
              display: 'flex',
              alignItems: 'stretch',
              gap: 18,
              opacity: footerSpring,
              transform: `translateY(${interpolate(
                footerSpring,
                [0, 1],
                [30, 0],
              )}px)`,
            }}
          >
            <div
              style={{
                width: 9,
                borderRadius: 8,
                backgroundColor: '#FF8A3D',
              }}
            />
            <div
              style={{
                flex: 1,
                padding: '16px 20px',
                border: '2px solid #39414B',
                borderRadius: 16,
                backgroundColor: '#1A2026',
              }}
            >
              <div
                style={{
                  color: '#F4F4F4',
                  fontSize: 24,
                  fontWeight: 950,
                  letterSpacing: 1.2,
                }}
              >
                YOU CAN SKIP WRITING THE CODE—
              </div>
              <div
                style={{
                  marginTop: 5,
                  color: '#4DD0E1',
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 1.8,
                }}
              >
                YOU CANNOT SKIP ITS CONSTRAINTS.
              </div>
            </div>
            <div
              style={{
                width: 190,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #4DD0E1',
                borderRadius: 16,
                color: '#4DD0E1',
                backgroundColor: '#1A2026',
                fontSize: 17,
                fontWeight: 950,
                letterSpacing: 2,
                transform: `scale(${warningPulse})`,
              }}
            >
              LIMIT FOUND
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              top: '-30%',
              bottom: '-30%',
              width: '18%',
              left: `${glareX}%`,
              backgroundColor: '#F4F4F4',
              opacity: glareOpacity,
              transform: 'skewX(-18deg)',
              filter: 'blur(18px)',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: '5%',
          top: '6%',
          width: 62,
          height: 5,
          borderRadius: 6,
          backgroundColor: '#4DD0E1',
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '6%',
          width: 62,
          height: 5,
          borderRadius: 6,
          backgroundColor: '#FF8A3D',
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
}