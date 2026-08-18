import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style2MissionControlTheStakesRoom_Scene4() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const palette = {
    background: '#0A0E1A',
    primary: '#FFB300',
    secondary: '#22D3EE',
    alert: '#FF3B30',
    muted: '#1F2937',
  };

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

  const interfaceEntrance = spring({
    frame,
    fps,
    config: {damping: 16, stiffness: 190, mass: 0.8},
  });

  const countdownEntrance = spring({
    frame: frame - 4,
    fps,
    config: {damping: 12, stiffness: 240, mass: 0.65},
  });

  const tunnelEntrance = spring({
    frame: frame - 7,
    fps,
    config: {damping: 15, stiffness: 210, mass: 0.75},
  });

  const terminalEntrance = spring({
    frame: frame - 101,
    fps,
    config: {damping: 12, stiffness: 250, mass: 0.65},
  });

  const gateOneSpring = clamp01(
    spring({
      frame: frame - 37,
      fps,
      config: {damping: 9, stiffness: 360, mass: 0.5},
    }),
  );

  const gateTwoSpring = clamp01(
    spring({
      frame: frame - 68,
      fps,
      config: {damping: 9, stiffness: 360, mass: 0.5},
    }),
  );

  const capsuleSpring = spring({
    frame: frame - 86,
    fps,
    config: {damping: 11, stiffness: 260, mass: 0.6},
  });

  const reticleLock = clamp01(
    spring({
      frame: frame - 103,
      fps,
      config: {damping: 10, stiffness: 300, mass: 0.55},
    }),
  );

  const contentOpacity = interpolate(
    frame,
    [0, 5, durationInFrames - 4, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  const countdown = Math.max(0, 4.5 - frame / fps);
  const countdownText = countdown.toFixed(1).padStart(4, '0');

  const missionProgress = interpolate(frame, [8, 108], [0, 1], clamp);
  const pulseY = interpolate(missionProgress, [0, 1], [890, 174], clamp);

  const driftRight = interpolate(
    frame,
    [21, 36, 51],
    [0, 148, 0],
    clamp,
  );
  const driftLeft = interpolate(
    frame,
    [53, 67, 82],
    [0, -132, 0],
    clamp,
  );
  const pulseX = 450 + driftRight + driftLeft;

  const threatOne = interpolate(
    frame,
    [23, 29, 43, 52],
    [0, 1, 1, 0],
    clamp,
  );
  const threatTwo = interpolate(
    frame,
    [55, 61, 73, 83],
    [0, 1, 1, 0],
    clamp,
  );
  const threatLevel = Math.max(threatOne, threatTwo);

  const pulseScale = 1 + Math.sin(frame * 0.55) * 0.16;
  const amberPulse = 0.65 + Math.sin(frame * 0.24) * 0.3;
  const cyanPulse = 0.72 + Math.sin(frame * 0.42) * 0.28;
  const sweepRotation = frame * 4.8;

  const railDraw = interpolate(frame, [7, 44], [1, 0], clamp);
  const tunnelSweep = ((frame * 19) % 980) - 80;

  const terminalCopy = 'STAY ON CHANNEL';
  const typedCharacters = Math.floor(
    interpolate(frame, [108, 127], [0, terminalCopy.length], clamp),
  );
  const typedText = terminalCopy.slice(0, typedCharacters);

  const crtFlicker =
    frame > 106 && (frame % 11 === 0 || frame % 17 === 0) ? 0.55 : 1;
  const signalFlicker =
    frame % 19 === 0 ? 0.45 : frame % 7 === 0 ? 0.78 : 1;

  const checkpoints = [
    {y: 794, trigger: 20, label: 'CP-01'},
    {y: 650, trigger: 40, label: 'CP-02'},
    {y: 500, trigger: 61, label: 'CP-03'},
    {y: 354, trigger: 82, label: 'CP-04'},
  ];

  const tunnelRings = [
    {y: 888, width: 780, height: 170, opacity: 0.75},
    {y: 762, width: 670, height: 145, opacity: 0.65},
    {y: 638, width: 560, height: 122, opacity: 0.55},
    {y: 520, width: 460, height: 98, opacity: 0.48},
    {y: 410, width: 360, height: 76, opacity: 0.4},
    {y: 310, width: 270, height: 58, opacity: 0.34},
    {y: 226, width: 190, height: 42, opacity: 0.3},
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: '"Poppins", "Arial Narrow", sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          opacity: 0.22,
          pointerEvents: 'none',
        }}
      >
        {Array.from({length: 96}).map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: index * 20,
              height: 2,
              backgroundColor: palette.muted,
              opacity: index % 3 === 0 ? 0.8 : 0.38,
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: '90%',
          maxWidth: 900,
          height: '94%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          boxSizing: 'border-box',
          opacity: contentOpacity,
          transform: `scale(${interpolate(
            interfaceEntrance,
            [0, 1],
            [0.975, 1],
            clamp,
          )})`,
        }}
      >
        <header
          style={{
            width: '100%',
            minHeight: 294,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            paddingTop: 22,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `3px solid ${palette.muted}`,
              borderBottom: `3px solid ${palette.muted}`,
              padding: '14px 4px',
              boxSizing: 'border-box',
              fontFamily: '"Courier New", monospace',
              color: palette.secondary,
              fontWeight: 900,
              fontSize: 18,
              letterSpacing: 3,
              opacity: signalFlicker,
            }}
          >
            <span>MISSION // 04</span>
            <span style={{color: palette.primary}}>LIVE OPS</span>
            <span>CHRON-02</span>
          </div>

          <div
            style={{
              marginTop: 24,
              color: palette.primary,
              fontFamily: '"Courier New", monospace',
              fontWeight: 900,
              fontSize: 21,
              letterSpacing: 8,
              transform: `translateY(${interpolate(
                countdownEntrance,
                [0, 1],
                [-25, 0],
                clamp,
              )}px)`,
              opacity: countdownEntrance,
            }}
          >
            SIGNAL WINDOW
          </div>

          <div
            style={{
              color: threatLevel > 0.5 ? palette.alert : palette.secondary,
              fontFamily: '"Arial Narrow", "Roboto Condensed", sans-serif',
              fontWeight: 950,
              fontStretch: 'condensed',
              fontSize: 134,
              lineHeight: 0.9,
              letterSpacing: -7,
              transform: `scale(${countdownEntrance})`,
              opacity: signalFlicker,
              textShadow: `0 0 28px ${
                threatLevel > 0.5 ? palette.alert : palette.secondary
              }`,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {countdownText}
          </div>

          <div
            style={{
              width: '88%',
              height: 8,
              marginTop: 18,
              backgroundColor: palette.muted,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${Math.max(0, countdown / 4.5) * 100}%`,
                height: '100%',
                backgroundColor:
                  countdown < 1.4 ? palette.alert : palette.primary,
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${(frame * 3.8) % 100}%`,
                width: '6%',
                backgroundColor: palette.secondary,
                opacity: 0.8,
              }}
            />
          </div>
        </header>

        <main
          style={{
            width: '100%',
            flex: 1,
            minHeight: 0,
            position: 'relative',
            transform: `scale(${interpolate(
              tunnelEntrance,
              [0, 1],
              [0.91, 1],
              clamp,
            )})`,
            transformOrigin: '50% 90%',
          }}
        >
          <svg
            viewBox="0 0 900 980"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
            }}
          >
            <defs>
              <linearGradient id="missionRail" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={palette.secondary} />
                <stop offset="58%" stopColor={palette.primary} />
                <stop offset="100%" stopColor={palette.alert} />
              </linearGradient>
              <radialGradient id="capsuleCore">
                <stop offset="0%" stopColor={palette.secondary} />
                <stop offset="55%" stopColor={palette.primary} />
                <stop offset="100%" stopColor={palette.background} />
              </radialGradient>
              <filter id="cyanGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="11" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="amberGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              d="M55 945 L278 130 L622 130 L845 945 Z"
              fill={palette.muted}
              opacity={0.22}
              stroke={palette.muted}
              strokeWidth={5}
            />

            <path
              d="M104 945 L308 150"
              fill="none"
              stroke={palette.primary}
              strokeWidth={3}
              opacity={0.34}
            />
            <path
              d="M796 945 L592 150"
              fill="none"
              stroke={palette.primary}
              strokeWidth={3}
              opacity={0.34}
            />

            {tunnelRings.map((ring, index) => (
              <ellipse
                key={index}
                cx={450}
                cy={ring.y}
                rx={(ring.width / 2) * tunnelEntrance}
                ry={(ring.height / 2) * tunnelEntrance}
                fill="none"
                stroke={index % 2 === 0 ? palette.muted : palette.primary}
                strokeWidth={index % 2 === 0 ? 5 : 3}
                opacity={ring.opacity}
                strokeDasharray={index % 2 === 0 ? '18 14' : '8 12'}
                strokeDashoffset={-frame * (index % 2 === 0 ? 2 : 4)}
              />
            ))}

            <line
              x1={450}
              y1={945}
              x2={450}
              y2={145}
              stroke={palette.muted}
              strokeWidth={38}
              opacity={0.8}
            />
            <line
              x1={450}
              y1={945}
              x2={450}
              y2={145}
              stroke="url(#missionRail)"
              strokeWidth={8}
              strokeDasharray="16 18"
              strokeDashoffset={-frame * 7}
            />
            <line
              x1={418}
              y1={945}
              x2={438}
              y2={145}
              stroke={palette.secondary}
              strokeWidth={3}
              opacity={0.48}
            />
            <line
              x1={482}
              y1={945}
              x2={462}
              y2={145}
              stroke={palette.primary}
              strokeWidth={3}
              opacity={0.48}
            />

            <path
              d="M450 696 C548 686 619 654 744 584"
              fill="none"
              stroke={palette.alert}
              strokeWidth={10}
              strokeDasharray="24 18"
              strokeDashoffset={900 * railDraw}
              opacity={0.9}
            />
            <path
              d="M450 490 C350 480 283 446 152 378"
              fill="none"
              stroke={palette.alert}
              strokeWidth={10}
              strokeDasharray="24 18"
              strokeDashoffset={900 * railDraw}
              opacity={0.9}
            />

            <g opacity={threatOne}>
              <polygon
                points="718,515 774,515 746,464"
                fill={palette.alert}
                stroke={palette.background}
                strokeWidth={5}
              />
              <text
                x={746}
                y={503}
                textAnchor="middle"
                fill={palette.background}
                fontSize={31}
                fontWeight={950}
              >
                !
              </text>
              <text
                x={746}
                y={548}
                textAnchor="middle"
                fill={palette.alert}
                fontFamily="Courier New, monospace"
                fontSize={17}
                fontWeight={900}
                letterSpacing={3}
              >
                EXIT VECTOR
              </text>
            </g>

            <g opacity={threatTwo}>
              <polygon
                points="126,310 182,310 154,259"
                fill={palette.alert}
                stroke={palette.background}
                strokeWidth={5}
              />
              <text
                x={154}
                y={298}
                textAnchor="middle"
                fill={palette.background}
                fontSize={31}
                fontWeight={950}
              >
                !
              </text>
              <text
                x={154}
                y={343}
                textAnchor="middle"
                fill={palette.alert}
                fontFamily="Courier New, monospace"
                fontSize={17}
                fontWeight={900}
                letterSpacing={3}
              >
                EXIT VECTOR
              </text>
            </g>

            <g transform={`translate(${744 - gateOneSpring * 73} 584)`}>
              <rect
                x={-14}
                y={-82}
                width={28}
                height={164}
                rx={5}
                fill={palette.alert}
                stroke={palette.primary}
                strokeWidth={5}
                transform="rotate(61)"
              />
              <rect
                x={-7}
                y={-70}
                width={14}
                height={140}
                fill={palette.background}
                transform="rotate(61)"
                opacity={0.6}
              />
            </g>
            <g transform={`translate(${152 + gateTwoSpring * 72} 378)`}>
              <rect
                x={-14}
                y={-82}
                width={28}
                height={164}
                rx={5}
                fill={palette.alert}
                stroke={palette.primary}
                strokeWidth={5}
                transform="rotate(-61)"
              />
              <rect
                x={-7}
                y={-70}
                width={14}
                height={140}
                fill={palette.background}
                transform="rotate(-61)"
                opacity={0.6}
              />
            </g>

            {checkpoints.map((checkpoint, index) => {
              const activation = interpolate(
                frame,
                [checkpoint.trigger - 5, checkpoint.trigger],
                [0.2, 1],
                clamp,
              );
              const side = index % 2 === 0 ? 1 : -1;

              return (
                <g key={checkpoint.label} opacity={activation}>
                  <circle
                    cx={450}
                    cy={checkpoint.y}
                    r={13 + Math.sin(frame * 0.3 + index) * 2}
                    fill={palette.primary}
                    filter="url(#amberGlow)"
                  />
                  <line
                    x1={450}
                    y1={checkpoint.y}
                    x2={450 + side * 88}
                    y2={checkpoint.y}
                    stroke={palette.primary}
                    strokeWidth={4}
                  />
                  <rect
                    x={side > 0 ? 538 : 262}
                    y={checkpoint.y - 19}
                    width={100}
                    height={38}
                    fill={palette.background}
                    stroke={palette.primary}
                    strokeWidth={3}
                  />
                  <text
                    x={side > 0 ? 588 : 312}
                    y={checkpoint.y + 7}
                    textAnchor="middle"
                    fill={palette.primary}
                    fontFamily="Courier New, monospace"
                    fontSize={17}
                    fontWeight={900}
                  >
                    {checkpoint.label}
                  </text>
                </g>
              );
            })}

            <g
              transform={`translate(450 151) scale(${Math.max(
                0,
                capsuleSpring,
              )})`}
              opacity={interpolate(frame, [80, 91], [0.25, 1], clamp)}
            >
              <ellipse
                cx={0}
                cy={0}
                rx={76}
                ry={43}
                fill={palette.background}
                stroke={palette.primary}
                strokeWidth={7}
                filter="url(#amberGlow)"
              />
              <ellipse
                cx={0}
                cy={0}
                rx={48}
                ry={25}
                fill="url(#capsuleCore)"
                stroke={palette.secondary}
                strokeWidth={4}
              />
              <line
                x1={-91}
                y1={0}
                x2={-68}
                y2={0}
                stroke={palette.primary}
                strokeWidth={8}
              />
              <line
                x1={68}
                y1={0}
                x2={91}
                y2={0}
                stroke={palette.primary}
                strokeWidth={8}
              />
              <text
                x={0}
                y={73}
                textAnchor="middle"
                fill={palette.primary}
                fontFamily="Courier New, monospace"
                fontSize={18}
                fontWeight={900}
                letterSpacing={3}
              >
                FINAL TRANSMISSION
              </text>
            </g>

            <g
              transform={`translate(450 151) rotate(${sweepRotation}) scale(${interpolate(
                reticleLock,
                [0, 1],
                [2.5, 1],
                clamp,
              )})`}
              opacity={reticleLock}
            >
              <circle
                cx={0}
                cy={0}
                r={105}
                fill="none"
                stroke={palette.secondary}
                strokeWidth={4}
                strokeDasharray="24 17"
                filter="url(#cyanGlow)"
              />
              <circle
                cx={0}
                cy={0}
                r={84}
                fill="none"
                stroke={palette.alert}
                strokeWidth={4}
                strokeDasharray="8 22"
              />
            </g>

            <g opacity={reticleLock}>
              <line
                x1={330}
                y1={151}
                x2={405}
                y2={151}
                stroke={palette.secondary}
                strokeWidth={5}
              />
              <line
                x1={495}
                y1={151}
                x2={570}
                y2={151}
                stroke={palette.secondary}
                strokeWidth={5}
              />
              <line
                x1={450}
                y1={44}
                x2={450}
                y2={106}
                stroke={palette.secondary}
                strokeWidth={5}
              />
              <line
                x1={450}
                y1={196}
                x2={450}
                y2={258}
                stroke={palette.secondary}
                strokeWidth={5}
              />
            </g>

            <g
              transform={`translate(${pulseX} ${pulseY}) scale(${pulseScale})`}
              filter="url(#cyanGlow)"
            >
              <circle
                cx={0}
                cy={0}
                r={35}
                fill="none"
                stroke={palette.secondary}
                strokeWidth={4}
                opacity={cyanPulse}
              />
              <circle
                cx={0}
                cy={0}
                r={18}
                fill={palette.secondary}
                stroke={palette.background}
                strokeWidth={6}
              />
              <path
                d="M0 35 L-13 74 L0 66 L13 74 Z"
                fill={palette.secondary}
                opacity={0.75}
              />
            </g>

            <line
              x1={74}
              y1={tunnelSweep}
              x2={826}
              y2={tunnelSweep - 118}
              stroke={palette.secondary}
              strokeWidth={4}
              opacity={0.18}
            />

            <text
              x={450}
              y={958}
              textAnchor="middle"
              fill={palette.secondary}
              fontFamily="Courier New, monospace"
              fontWeight={900}
              fontSize={20}
              letterSpacing={6}
            >
              BEGINNING
            </text>
            <text
              x={450}
              y={33}
              textAnchor="middle"
              fill={palette.primary}
              fontFamily="Courier New, monospace"
              fontWeight={900}
              fontSize={20}
              letterSpacing={8}
            >
              END
            </text>
          </svg>

          <div
            style={{
              position: 'absolute',
              top: 22,
              right: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 7,
              opacity: threatLevel,
              transform: `translateX(${interpolate(
                threatLevel,
                [0, 1],
                [40, 0],
                clamp,
              )}px)`,
            }}
          >
            <div
              style={{
                color: palette.alert,
                fontFamily: '"Courier New", monospace',
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 3,
              }}
            >
              THREAT LEVEL
            </div>
            <div style={{display: 'flex', gap: 6}}>
              {Array.from({length: 5}).map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: 34,
                    height: 10,
                    backgroundColor:
                      index < Math.ceil(threatLevel * 5)
                        ? palette.alert
                        : palette.muted,
                  }}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 8,
              top: 24,
              color: palette.secondary,
              fontFamily: '"Courier New", monospace',
              fontSize: 16,
              fontWeight: 900,
              lineHeight: 1.6,
              letterSpacing: 2,
              opacity: 0.8,
            }}
          >
            <div>TRACK {String(Math.round(missionProgress * 100)).padStart(3, '0')}%</div>
            <div style={{color: palette.primary, opacity: amberPulse}}>
              RAIL LOCKED
            </div>
          </div>
        </main>

        <footer
          style={{
            width: '100%',
            minHeight: 225,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 25,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: '100%',
              position: 'relative',
              borderTop: `4px solid ${palette.secondary}`,
              borderBottom: `4px solid ${palette.secondary}`,
              backgroundColor: palette.muted,
              padding: '23px 28px 26px',
              boxSizing: 'border-box',
              transform: `translateY(${interpolate(
                terminalEntrance,
                [0, 1],
                [70, 0],
                clamp,
              )}px) scale(${interpolate(
                terminalEntrance,
                [0, 1],
                [0.94, 1],
                clamp,
              )})`,
              opacity: terminalEntrance * crtFlicker,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: `${(frame * 8) % 115 - 15}%`,
                width: '14%',
                height: '100%',
                backgroundColor: palette.secondary,
                opacity: 0.09,
                transform: 'skewX(-18deg)',
              }}
            />

            <div
              style={{
                color: palette.primary,
                fontFamily: '"Courier New", monospace',
                fontWeight: 900,
                fontSize: 17,
                letterSpacing: 4,
                marginBottom: 10,
              }}
            >
              &gt; CHANNEL DIRECTIVE:
            </div>

            <div
              style={{
                color: palette.secondary,
                fontFamily: '"Poppins", sans-serif',
                fontSize: 52,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 1,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                textShadow: `0 0 18px ${palette.secondary}`,
              }}
            >
              {typedText}
              <span
                style={{
                  color: palette.alert,
                  opacity: frame % 8 < 4 ? 1 : 0,
                }}
              >
                _
              </span>
            </div>

            <div
              style={{
                marginTop: 14,
                display: 'flex',
                justifyContent: 'space-between',
                color: palette.secondary,
                fontFamily: '"Courier New", monospace',
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 2,
                opacity: 0.75,
              }}
            >
              <span>UPLINK: SECURE</span>
              <span style={{color: palette.primary}}>CAPSULE: ACQUIRED</span>
            </div>
          </div>
        </footer>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          border: `10px solid ${threatLevel > 0.5 ? palette.alert : palette.muted}`,
          boxSizing: 'border-box',
          opacity: threatLevel > 0.5 ? 0.48 + Math.sin(frame * 0.8) * 0.24 : 0.65,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: `${(frame * 13) % 1920}px`,
          height: 5,
          backgroundColor: palette.secondary,
          opacity: 0.16,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
}