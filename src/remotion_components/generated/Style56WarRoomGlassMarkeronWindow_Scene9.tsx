import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = {
  background: '#1A2026',
  primary: '#F4F4F4',
  secondary: '#FF8A3D',
  highlight: '#4DD0E1',
  muted: '#39414B',
};

type GearProps = {
  x: number;
  y: number;
  size: number;
  teeth: number;
  rotation: number;
  color: string;
  delay: number;
  frame: number;
  fps: number;
};

const Gear: React.FC<GearProps> = ({
  x,
  y,
  size,
  teeth,
  rotation,
  color,
  delay,
  frame,
  fps,
}) => {
  const reveal = spring({
    frame: frame - delay,
    fps,
    config: { damping: 13, mass: 0.55, stiffness: 130 },
  });

  const points = Array.from({ length: teeth * 2 }, (_, index) => {
    const angle = (index / (teeth * 2)) * Math.PI * 2 - Math.PI / 2;
    const radius = index % 2 === 0 ? size / 2 : size * 0.405;
    return `${x + Math.cos(angle) * radius},${y + Math.sin(angle) * radius}`;
  }).join(' ');

  return (
    <g
      style={{
        opacity: reveal,
        transformOrigin: `${x}px ${y}px`,
        transform: `scale(${reveal}) rotate(${rotation}deg)`,
      }}
    >
      <polygon
        points={points}
        fill={palette.background}
        stroke={color}
        strokeWidth={5}
        strokeLinejoin="round"
      />
      <circle
        cx={x}
        cy={y}
        r={size * 0.29}
        fill={palette.muted}
        stroke={color}
        strokeWidth={3}
      />
      <circle
        cx={x}
        cy={y}
        r={size * 0.11}
        fill={palette.background}
        stroke={color}
        strokeWidth={4}
      />
      {Array.from({ length: 4 }, (_, index) => {
        const angle = (index / 4) * Math.PI * 2;
        const x2 = x + Math.cos(angle) * size * 0.28;
        const y2 = y + Math.sin(angle) * size * 0.28;

        return (
          <line
            key={index}
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};

export default function Style56WarRoomGlassMarkeronWindow_Scene9() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.65, stiffness: 115 },
  });

  const opacity = interpolate(
    frame,
    [0, 7, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const panelY = interpolate(entrance, [0, 1], [90, 0]);
  const panelScale = interpolate(entrance, [0, 1], [0.94, 1]);

  const focusRack = interpolate(
    frame,
    [0, 12, 27, 40],
    [8, 5, 0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const machineryOpacity = interpolate(
    frame,
    [7, 19, 34],
    [0.25, 0.7, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const markerProgress = interpolate(
    frame,
    [10, 43],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const arrowProgress = interpolate(
    frame,
    [25, 56],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const activationProgress = spring({
    frame: frame - 53,
    fps,
    config: { damping: 11, mass: 0.5, stiffness: 150 },
  });

  const glareX = interpolate(
    frame,
    [8, 72],
    [-width * 0.35, width * 1.25],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const smudgeProgress = interpolate(
    frame,
    [50, 66],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const markerJitter =
    frame > 9 && frame < 58
      ? Math.sin(frame * 3.7) * 0.8 + Math.sin(frame * 7.1) * 0.3
      : 0;

  const gearRotation = frame * 2.1;
  const codePulse = 0.72 + Math.sin(frame * 0.35) * 0.18;
  const panelPadding = Math.max(22, Math.min(42, width * 0.025));

  const codeRows = [
    'workflow.compile(nodes)',
    'auth.validate(payload)',
    'queue.dispatch(trigger)',
    'runtime.execute(action)',
    'result.sync(interface)',
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: palette.background,
        backdropFilter: 'blur(24px) brightness(0.4)',
        opacity,
        fontFamily:
          '"Arial Narrow", "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: palette.background,
          opacity: 0.92,
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '92%',
          height: '89%',
          border: `2px solid ${palette.muted}`,
          borderRadius: 30,
          backgroundColor: palette.background,
          boxShadow: `0 34px 90px ${palette.background}`,
          overflow: 'hidden',
          transform: `translateY(${panelY}px) scale(${panelScale})`,
        }}
      >
        {/* Machinery layer beneath the glass */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: machineryOpacity,
            filter: `blur(${focusRack}px)`,
            transform: `scale(${1 + focusRack * 0.004})`,
          }}
        >
          <svg
            viewBox="0 0 1600 900"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <defs>
              <pattern
                id="war-grid"
                width="58"
                height="58"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 58 0 L 0 0 0 58"
                  fill="none"
                  stroke={palette.muted}
                  strokeWidth="1"
                  opacity="0.38"
                />
              </pattern>
            </defs>

            <rect width="1600" height="900" fill="url(#war-grid)" />

            <path
              d="M110 610 H270 V510 H435 V645 H600"
              fill="none"
              stroke={palette.highlight}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.72"
            />
            <path
              d="M755 390 H910 V255 H1105 V355 H1280 V250 H1490"
              fill="none"
              stroke={palette.secondary}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.72"
            />
            <path
              d="M510 285 H690 V445 H820"
              fill="none"
              stroke={palette.primary}
              strokeWidth="4"
              strokeDasharray="14 15"
              opacity="0.54"
            />
            <path
              d="M1010 640 H1170 V530 H1450"
              fill="none"
              stroke={palette.highlight}
              strokeWidth="4"
              strokeDasharray="10 14"
              opacity="0.54"
            />

            {[110, 270, 435, 600, 910, 1105, 1280, 1490].map((cx, index) => (
              <circle
                key={cx}
                cx={cx}
                cy={
                  index < 4
                    ? [610, 510, 645, 645][index]
                    : [255, 355, 250, 250][index - 4]
                }
                r="9"
                fill={index % 2 === 0 ? palette.highlight : palette.secondary}
              />
            ))}

            <Gear
              x={385}
              y={380}
              size={190}
              teeth={14}
              rotation={gearRotation}
              color={palette.highlight}
              delay={8}
              frame={frame}
              fps={fps}
            />
            <Gear
              x={575}
              y={500}
              size={145}
              teeth={12}
              rotation={-gearRotation * 1.22}
              color={palette.secondary}
              delay={13}
              frame={frame}
              fps={fps}
            />
            <Gear
              x={970}
              y={470}
              size={235}
              teeth={16}
              rotation={gearRotation * 0.72}
              color={palette.primary}
              delay={17}
              frame={frame}
              fps={fps}
            />
            <Gear
              x={1190}
              y={590}
              size={138}
              teeth={11}
              rotation={-gearRotation * 1.32}
              color={palette.highlight}
              delay={21}
              frame={frame}
              fps={fps}
            />

            <rect
              x="700"
              y="655"
              width="225"
              height="92"
              rx="14"
              fill={palette.background}
              stroke={palette.secondary}
              strokeWidth="4"
            />
            <text
              x="812"
              y="692"
              textAnchor="middle"
              fill={palette.secondary}
              fontSize="22"
              fontFamily="monospace"
              fontWeight="700"
            >
              EXECUTION CORE
            </text>
            <text
              x="812"
              y="724"
              textAnchor="middle"
              fill={palette.primary}
              fontSize="18"
              fontFamily="monospace"
            >
              128 TASKS / SEC
            </text>
          </svg>

          <div
            style={{
              position: 'absolute',
              top: '15%',
              right: '5%',
              width: '29%',
              padding: '18px 20px',
              border: `1px solid ${palette.muted}`,
              borderRadius: 14,
              backgroundColor: palette.background,
              color: palette.highlight,
              fontFamily: 'monospace',
              fontSize: Math.max(12, Math.min(18, width * 0.012)),
              lineHeight: 1.75,
              letterSpacing: 0.2,
            }}
          >
            <div
              style={{
                color: palette.secondary,
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              SYSTEM TRACE
            </div>
            {codeRows.map((row, index) => {
              const rowReveal = interpolate(
                frame,
                [15 + index * 4, 23 + index * 4],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              );

              return (
                <div
                  key={row}
                  style={{
                    opacity: rowReveal,
                    transform: `translateX(${(1 - rowReveal) * 16}px)`,
                    color:
                      index === 3 ? palette.secondary : palette.highlight,
                  }}
                >
                  {String(index + 1).padStart(2, '0')} › {row}
                </div>
              );
            })}
          </div>
        </div>

        {/* Glass surface */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 28,
            border: `1px solid ${palette.primary}`,
            opacity: 0.16,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: glareX,
            width: '13%',
            backgroundColor: palette.primary,
            opacity: 0.1,
            filter: 'blur(18px)',
            transform: 'skewX(-18deg)',
          }}
        />

        {/* War room header */}
        <div
          style={{
            position: 'absolute',
            top: panelPadding,
            left: panelPadding,
            right: panelPadding,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 5,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                color: palette.background,
                backgroundColor: palette.secondary,
                fontSize: Math.max(13, Math.min(18, width * 0.012)),
                fontWeight: 900,
                letterSpacing: 1.8,
              }}
            >
              WAR ROOM / 09
            </div>
            <div
              style={{
                color: palette.primary,
                fontSize: Math.max(15, Math.min(22, width * 0.014)),
                fontWeight: 800,
                letterSpacing: 2.2,
              }}
            >
              BELOW THE INTERFACE
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: palette.highlight,
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: Math.max(12, Math.min(17, width * 0.011)),
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: palette.highlight,
                opacity: codePulse,
              }}
            />
            LIVE SYSTEM MAP
          </div>
        </div>

        {/* Marker drawing layer */}
        <svg
          viewBox="0 0 1600 900"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 8,
            transform: `translate(${markerJitter}px, ${markerJitter * 0.45}px)`,
          }}
        >
          <text
            x="115"
            y="190"
            fill={palette.primary}
            fontSize="82"
            fontWeight="900"
            letterSpacing="6"
            style={{ opacity: interpolate(frame, [8, 17], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }) }}
          >
            NO-CODE
          </text>

          <path
            d="M110 212 C250 226 430 220 560 207"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="480"
            strokeDashoffset={480 * (1 - markerProgress)}
          />

          <circle
            cx="144"
            cy="323"
            r="52"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray="330"
            strokeDashoffset={330 * (1 - markerProgress)}
          />
          <text
            x="144"
            y="343"
            textAnchor="middle"
            fill={palette.secondary}
            fontSize="58"
            fontWeight="900"
            opacity={markerProgress}
          >
            1
          </text>
          <text
            x="218"
            y="340"
            fill={palette.primary}
            fontSize="42"
            fontWeight="900"
            letterSpacing="3"
            opacity={markerProgress}
          >
            SIMPLE SURFACE
          </text>

          <path
            d="M490 360 C620 395 680 450 748 525"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="390"
            strokeDashoffset={390 * (1 - arrowProgress)}
          />
          <path
            d="M706 508 L750 528 L742 480"
            fill="none"
            stroke={palette.secondary}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="120"
            strokeDashoffset={120 * (1 - arrowProgress)}
          />

          <circle
            cx="1405"
            cy="425"
            r="54"
            fill="none"
            stroke={palette.highlight}
            strokeWidth="11"
            strokeDasharray="350"
            strokeDashoffset={350 * (1 - arrowProgress)}
          />
          <text
            x="1405"
            y="445"
            textAnchor="middle"
            fill={palette.highlight}
            fontSize="58"
            fontWeight="900"
            opacity={arrowProgress}
          >
            2
          </text>

          <path
            d="M1370 485 C1320 560 1250 630 1135 685"
            fill="none"
            stroke={palette.highlight}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="420"
            strokeDashoffset={420 * (1 - arrowProgress)}
          />
          <path
            d="M1160 647 L1130 688 L1182 691"
            fill="none"
            stroke={palette.highlight}
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={arrowProgress}
          />

          <text
            x="1105"
            y="382"
            fill={palette.highlight}
            fontSize="36"
            fontWeight="900"
            letterSpacing="2"
            opacity={arrowProgress}
          >
            CODE BELOW
          </text>
        </svg>

        {/* Smudge erase */}
        <div
          style={{
            position: 'absolute',
            zIndex: 9,
            left: `${interpolate(smudgeProgress, [0, 1], [14, 38])}%`,
            top: '31%',
            width: '18%',
            height: 42,
            borderRadius: 999,
            backgroundColor: palette.background,
            opacity: smudgeProgress * 0.82,
            filter: `blur(${8 + smudgeProgress * 10}px)`,
            transform: `rotate(-3deg) scaleX(${0.45 + smudgeProgress})`,
          }}
        />

        {/* Activation card */}
        <div
          style={{
            position: 'absolute',
            zIndex: 12,
            left: '50%',
            bottom: '5%',
            width: '58%',
            transform: `translateX(-50%) translateY(${(1 - activationProgress) * 55}px) scale(${0.92 + activationProgress * 0.08})`,
            opacity: activationProgress,
            padding: '18px 24px',
            borderRadius: 18,
            border: `2px solid ${palette.highlight}`,
            backgroundColor: palette.background,
            boxShadow: `0 18px 50px ${palette.background}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  color: palette.secondary,
                  fontSize: Math.max(12, Math.min(17, width * 0.011)),
                  fontWeight: 900,
                  letterSpacing: 2.4,
                  marginBottom: 5,
                }}
              >
                ACTIVATION CODE
              </div>
              <div
                style={{
                  color: palette.primary,
                  fontFamily: 'monospace',
                  fontSize: Math.max(17, Math.min(28, width * 0.019)),
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                UI → LOGIC → RUNTIME → RESULT
              </div>
            </div>

            <div
              style={{
                flexShrink: 0,
                padding: '10px 16px',
                borderRadius: 999,
                backgroundColor: palette.highlight,
                color: palette.background,
                fontSize: Math.max(12, Math.min(17, width * 0.011)),
                fontWeight: 900,
                letterSpacing: 1.5,
              }}
            >
              SYSTEM ACTIVE
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: panelPadding,
            bottom: panelPadding,
            zIndex: 15,
            color: palette.muted,
            fontFamily: 'monospace',
            fontSize: Math.max(10, Math.min(14, height * 0.014)),
            fontWeight: 700,
            letterSpacing: 1.6,
          }}
        >
          GLASS MAP / COMPLEXITY VISIBLE
        </div>
      </div>
    </AbsoluteFill>
  );
}