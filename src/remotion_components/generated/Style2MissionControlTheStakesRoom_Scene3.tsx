import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style2MissionControlTheStakesRoom_Scene3() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const palette = ['#0A0E1A', '#FFB300', '#22D3EE', '#FF3B30', '#1F2937'];

  const intro = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 190, mass: 0.75},
  });

  const headerSpring = spring({
    frame: frame - 3,
    fps,
    config: {damping: 13, stiffness: 230, mass: 0.65},
  });

  const reactorSpring = spring({
    frame: frame - 9,
    fps,
    config: {damping: 10, stiffness: 250, mass: 0.6},
  });

  const vaultSpring = spring({
    frame: frame - 52,
    fps,
    config: {damping: 12, stiffness: 220, mass: 0.7},
  });

  const deviceSpring = spring({
    frame: frame - 82,
    fps,
    config: {damping: 10, stiffness: 260, mass: 0.6},
  });

  const pipelineDraw = interpolate(frame, [18, 54], [1, 0], clamp);
  const gridDraw = interpolate(frame, [2, 28], [1, 0], clamp);
  const scanX = interpolate(frame % 38, [0, 37], [278, 650], clamp);
  const gaugeProgress = interpolate(frame, [57, 82], [0, 1], clamp);
  const gaugeAngle = interpolate(gaugeProgress, [0, 1], [-132, 132], clamp);

  const gaugeX = 718 + Math.cos((gaugeAngle * Math.PI) / 180) * 64;
  const gaugeY = 476 + Math.sin((gaugeAngle * Math.PI) / 180) * 64;

  const impact = spring({
    frame: frame - 79,
    fps,
    config: {damping: 8, stiffness: 310, mass: 0.45},
  });

  const shockRadius = interpolate(frame, [80, 101], [62, 260], clamp);
  const shockOpacity = interpolate(frame, [80, 86, 101], [0, 0.9, 0], clamp);

  const collapseStart = durationInFrames - 18;
  const collapse = interpolate(
    frame,
    [collapseStart, durationInFrames - 2],
    [0, 1],
    clamp,
  );
  const hudScale = interpolate(collapse, [0, 1], [1, 0.025], clamp);
  const hudOpacity = interpolate(collapse, [0, 0.75, 1], [1, 0.75, 0], clamp);

  const heartbeatIn = spring({
    frame: frame - collapseStart - 6,
    fps,
    config: {damping: 8, stiffness: 340, mass: 0.35},
  });
  const heartbeatPulse =
    1 +
    Math.max(0, Math.sin((frame - collapseStart) * 0.82)) *
      interpolate(frame, [collapseStart, durationInFrames], [0.1, 0.42], clamp);

  const reactorPulse = 1 + Math.sin(frame * 0.28) * 0.045;
  const warningFlicker =
    frame % 13 === 0 || frame % 17 === 0 ? 0.35 : 1;

  const earnText = 'EARN'.slice(
    0,
    Math.floor(interpolate(frame, [13, 23], [0, 4], clamp)),
  );
  const verifyText = 'VERIFY'.slice(
    0,
    Math.floor(interpolate(frame, [30, 43], [0, 6], clamp)),
  );
  const withdrawText = 'WITHDRAW'.slice(
    0,
    Math.floor(interpolate(frame, [48, 65], [0, 8], clamp)),
  );

  const statusText =
    frame < 29
      ? 'GENERATING PAYOUT'
      : frame < 51
        ? 'PULSE VERIFIED'
        : frame < 82
          ? 'ROUTING TO LOCAL BANK'
          : frame < 103
            ? 'FUNDS RECEIVED'
            : 'SHARED PIPELINE LOCKED';

  const displayedFunds = Math.round(
    interpolate(frame, [55, 82], [0, 1248], clamp),
  ).toLocaleString();

  const typeCursor = Math.floor(frame / 4) % 2 === 0 ? '▮' : '';

  const railPulse = (delay: number) => {
    const local = ((frame - delay) % 31 + 31) % 31;
    return interpolate(local, [0, 31], [0, 1], clamp);
  };

  const pulseOne = railPulse(16);
  const pulseTwo = railPulse(27);
  const pulseThree = railPulse(38);

  const pulseX = (progress: number) =>
    interpolate(progress, [0, 0.33, 0.7, 1], [392, 505, 593, 662], clamp);
  const pulseY = (progress: number) =>
    interpolate(progress, [0, 0.33, 0.7, 1], [476, 430, 514, 476], clamp);

  const leftDeviceX = interpolate(deviceSpring, [0, 1], [42, 238], clamp);
  const rightDeviceX = interpolate(deviceSpring, [0, 1], [858, 662], clamp);
  const leftDeviceRotation = interpolate(deviceSpring, [0, 1], [-42, 0], clamp);
  const rightDeviceRotation = interpolate(deviceSpring, [0, 1], [42, 0], clamp);

  const compatibilityOpacity = interpolate(frame, [93, 102], [0, 1], clamp);
  const signalSweep = interpolate(frame % 52, [0, 51], [-140, 1040], clamp);

  const cornerLength = 72;
  const terminalRows = [
    {label: '01', value: `${earnText}${frame < 24 ? typeCursor : ''}`},
    {label: '02', value: `${verifyText}${frame >= 30 && frame < 44 ? typeCursor : ''}`},
    {
      label: '03',
      value: `${withdrawText}${frame >= 48 && frame < 66 ? typeCursor : ''}`,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        overflow: 'hidden',
        fontFamily: '"Poppins", "Arial Narrow", sans-serif',
      }}
    >
      {/* Tactical scanlines */}
      <AbsoluteFill
        style={{
          opacity: 0.22,
          backgroundImage: `repeating-linear-gradient(0deg, ${palette[4]} 0px, ${palette[4]} 1px, ${palette[0]} 1px, ${palette[0]} 7px)`,
          transform: `translateY(${frame % 7}px)`,
          pointerEvents: 'none',
        }}
      />

      {/* Traveling signal glare */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: signalSweep,
          width: 120,
          opacity: 0.15,
          transform: 'skewX(-12deg)',
          background: `linear-gradient(90deg, ${palette[0]}, ${palette[2]}, ${palette[0]})`,
        }}
      />

      <div
        style={{
          width: '90%',
          maxWidth: 900,
          height: '90%',
          position: 'absolute',
          left: '50%',
          top: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxSizing: 'border-box',
          transform: `translate(-50%, -50%) scale(${hudScale})`,
          transformOrigin: '50% 50%',
          opacity: hudOpacity,
        }}
      >
        {/* Corner targeting brackets */}
        {[
          {left: 0, top: 0, rotate: 0},
          {right: 0, top: 0, rotate: 90},
          {right: 0, bottom: 0, rotate: 180},
          {left: 0, bottom: 0, rotate: 270},
        ].map((corner, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: cornerLength,
              height: cornerLength,
              left: corner.left,
              right: corner.right,
              top: corner.top,
              bottom: corner.bottom,
              borderLeft: `4px solid ${palette[2]}`,
              borderTop: `4px solid ${palette[2]}`,
              transform: `rotate(${corner.rotate}deg) scale(${intro})`,
              transformOrigin: 'center',
              opacity: 0.8,
            }}
          />
        ))}

        {/* Header */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transform: `translateY(${interpolate(headerSpring, [0, 1], [-55, 0], clamp)}px)`,
            opacity: headerSpring,
          }}
        >
          <div>
            <div
              style={{
                color: palette[2],
                fontFamily: '"Courier New", monospace',
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: 5,
              }}
            >
              MISSION CONTROL // PAYOUT GRID
            </div>
            <div
              style={{
                color: palette[1],
                fontSize: 56,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: -2,
                marginTop: 12,
                textTransform: 'uppercase',
              }}
            >
              EARN TO BANK
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 13,
              border: `2px solid ${palette[3]}`,
              padding: '12px 18px',
              opacity: warningFlicker,
              backgroundColor: palette[0],
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: palette[3],
                boxShadow: `0 0 22px ${palette[3]}`,
                transform: `scale(${1 + Math.sin(frame * 0.42) * 0.25})`,
              }}
            />
            <div
              style={{
                color: palette[3],
                fontFamily: '"Courier New", monospace',
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 3,
              }}
            >
              LIVE TRANSFER
            </div>
          </div>
        </div>

        {/* Terminal steps */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            gap: 12,
            marginTop: 34,
          }}
        >
          {terminalRows.map((row, index) => {
            const rowSpring = spring({
              frame: frame - 8 - index * 7,
              fps,
              config: {damping: 13, stiffness: 240, mass: 0.55},
            });

            const active =
              (index === 0 && frame < 30) ||
              (index === 1 && frame >= 30 && frame < 48) ||
              (index === 2 && frame >= 48);

            return (
              <div
                key={row.label}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: 74,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 13,
                  borderBottom: `3px solid ${active ? palette[1] : palette[4]}`,
                  backgroundColor: palette[0],
                  opacity: rowSpring,
                  transform: `translateX(${interpolate(
                    rowSpring,
                    [0, 1],
                    [-70 + index * 70, 0],
                    clamp,
                  )}px)`,
                }}
              >
                <div
                  style={{
                    color: active ? palette[1] : palette[4],
                    fontFamily: '"Courier New", monospace',
                    fontSize: 17,
                    fontWeight: 900,
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    color: active ? palette[1] : palette[2],
                    fontFamily: '"Courier New", monospace',
                    fontSize: 24,
                    fontWeight: 900,
                    letterSpacing: 3,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.value || '—'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main tactical system */}
        <div
          style={{
            width: '100%',
            flex: 1,
            minHeight: 0,
            position: 'relative',
            marginTop: 22,
          }}
        >
          <svg
            viewBox="0 0 900 1040"
            style={{
              width: '100%',
              height: '100%',
              overflow: 'visible',
              display: 'block',
            }}
          >
            <defs>
              <filter id="cyanGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feFlood floodColor={palette[2]} floodOpacity="1" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="amberGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feFlood floodColor={palette[1]} floodOpacity="1" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="redGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feFlood floodColor={palette[3]} floodOpacity="1" />
                <feComposite in2="blur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <pattern id="gridPattern" width="54" height="54" patternUnits="userSpaceOnUse">
                <path
                  d="M54 0H0V54"
                  fill="none"
                  stroke={palette[4]}
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="0" r="2.5" fill={palette[2]} opacity="0.45" />
              </pattern>
              <clipPath id="reactorClip">
                <circle cx="320" cy="476" r="105" />
              </clipPath>
            </defs>

            {/* Payout grid */}
            <rect
              x="22"
              y="28"
              width="856"
              height="920"
              rx="26"
              fill="url(#gridPattern)"
              opacity="0.62"
              stroke={palette[4]}
              strokeWidth="3"
              strokeDasharray="2800"
              strokeDashoffset={2800 * gridDraw}
            />

            <path
              d="M70 150H830 M70 790H830 M110 100V900 M790 100V900"
              fill="none"
              stroke={palette[2]}
              strokeWidth="2"
              opacity="0.3"
              strokeDasharray="12 18"
              strokeDashoffset={frame * -2}
            />

            {/* Bank arrival shockwave */}
            <circle
              cx="718"
              cy="476"
              r={shockRadius}
              fill="none"
              stroke={palette[1]}
              strokeWidth={interpolate(frame, [80, 101], [12, 2], clamp)}
              opacity={shockOpacity}
              filter="url(#amberGlow)"
            />
            <circle
              cx="718"
              cy="476"
              r={shockRadius * 0.72}
              fill="none"
              stroke={palette[2]}
              strokeWidth="3"
              opacity={shockOpacity * 0.75}
            />

            {/* Transparent cyan payout conduit */}
            <path
              d="M392 476 C448 476 454 418 514 430 C574 442 569 520 620 514 C646 511 650 486 662 476"
              fill="none"
              stroke={palette[4]}
              strokeWidth="39"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M392 476 C448 476 454 418 514 430 C574 442 569 520 620 514 C646 511 650 486 662 476"
              fill="none"
              stroke={palette[2]}
              strokeWidth="18"
              strokeLinecap="round"
              opacity="0.24"
            />
            <path
              d="M392 476 C448 476 454 418 514 430 C574 442 569 520 620 514 C646 511 650 486 662 476"
              fill="none"
              stroke={palette[2]}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="15 14"
              strokeDashoffset={520 * pipelineDraw - frame * 4}
              filter="url(#cyanGlow)"
            />

            {/* Moving generated currency pulses */}
            {[pulseOne, pulseTwo, pulseThree].map((pulse, index) => (
              <g key={index}>
                <circle
                  cx={pulseX(pulse)}
                  cy={pulseY(pulse)}
                  r={19 + Math.sin(frame * 0.35 + index) * 2}
                  fill={palette[1]}
                  opacity={frame > 19 ? 1 : 0}
                  filter="url(#amberGlow)"
                />
                <circle
                  cx={pulseX(pulse)}
                  cy={pulseY(pulse)}
                  r="31"
                  fill="none"
                  stroke={palette[1]}
                  strokeWidth="3"
                  opacity="0.5"
                />
                <text
                  x={pulseX(pulse)}
                  y={pulseY(pulse) + 7}
                  textAnchor="middle"
                  fill={palette[0]}
                  fontFamily='"Arial Narrow", sans-serif'
                  fontWeight="900"
                  fontSize="24"
                >
                  $
                </text>
              </g>
            ))}

            {/* Red pulse verification scanner */}
            <g opacity={interpolate(frame, [27, 32], [0, 1], clamp)}>
              <line
                x1={scanX}
                x2={scanX}
                y1="345"
                y2="605"
                stroke={palette[3]}
                strokeWidth="4"
                filter="url(#redGlow)"
              />
              <path
                d={`M${scanX - 38} 390h25v-25 M${scanX + 38} 390h-25v-25 M${scanX - 38} 560h25v25 M${scanX + 38} 560h-25v25`}
                fill="none"
                stroke={palette[3]}
                strokeWidth="6"
              />
              <text
                x={scanX}
                y="330"
                textAnchor="middle"
                fill={palette[3]}
                fontFamily='"Courier New", monospace'
                fontWeight="900"
                fontSize="18"
                letterSpacing="3"
              >
                VERIFY
              </text>
            </g>

            {/* Central app reactor */}
            <g
              style={{
                transform: `translate(320px, 476px) scale(${reactorSpring * reactorPulse}) translate(-320px, -476px)`,
                transformOrigin: '320px 476px',
              }}
            >
              <circle
                cx="320"
                cy="476"
                r="133"
                fill={palette[0]}
                stroke={palette[4]}
                strokeWidth="22"
              />
              <circle
                cx="320"
                cy="476"
                r="118"
                fill="none"
                stroke={palette[2]}
                strokeWidth="5"
                strokeDasharray="28 12"
                strokeDashoffset={frame * -5}
                filter="url(#cyanGlow)"
              />
              <circle
                cx="320"
                cy="476"
                r="91"
                fill={palette[1]}
                opacity="0.13"
                stroke={palette[1]}
                strokeWidth="7"
                filter="url(#amberGlow)"
              />

              <g clipPath="url(#reactorClip)">
                {[0, 1, 2, 3, 4].map((index) => {
                  const particleY = 570 - ((frame * (4 + index * 0.38) + index * 43) % 190);
                  const particleX = 285 + ((index * 31 + frame * 1.7) % 72);
                  return (
                    <circle
                      key={index}
                      cx={particleX}
                      cy={particleY}
                      r={7 + (index % 2) * 3}
                      fill={palette[1]}
                      filter="url(#amberGlow)"
                    />
                  );
                })}
              </g>

              <path
                d="M279 487L304 512L361 439"
                fill="none"
                stroke={palette[0]}
                strokeWidth="18"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={interpolate(frame, [24, 37], [0, 1], clamp)}
              />
              <path
                d="M279 487L304 512L361 439"
                fill="none"
                stroke={palette[1]}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="130"
                strokeDashoffset={130 * interpolate(frame, [24, 37], [1, 0], clamp)}
              />

              {Array.from({length: 8}).map((_, index) => {
                const angle = index * 45 + frame * 1.4;
                const radians = (angle * Math.PI) / 180;
                const x1 = 320 + Math.cos(radians) * 143;
                const y1 = 476 + Math.sin(radians) * 143;
                const x2 = 320 + Math.cos(radians) * 166;
                const y2 = 476 + Math.sin(radians) * 166;
                return (
                  <line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={index % 2 ? palette[2] : palette[1]}
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                );
              })}

              <text
                x="320"
                y="660"
                textAnchor="middle"
                fill={palette[1]}
                fontFamily='"Courier New", monospace'
                fontWeight="900"
                fontSize="20"
                letterSpacing="4"
              >
                APP REACTOR
              </text>
            </g>

            {/* Fortified local-bank vault */}
            <g
              opacity={vaultSpring}
              style={{
                transform: `translate(${interpolate(vaultSpring, [0, 1], [100, 0], clamp)}px, 0px) scale(${0.78 + vaultSpring * 0.22})`,
                transformOrigin: '718px 476px',
              }}
            >
              <path
                d="M644 370L718 320L792 370"
                fill={palette[0]}
                stroke={palette[1]}
                strokeWidth="8"
                strokeLinejoin="round"
              />
              <rect
                x="636"
                y="365"
                width="164"
                height="230"
                rx="19"
                fill={palette[0]}
                stroke={palette[4]}
                strokeWidth="18"
              />
              <rect
                x="650"
                y="379"
                width="136"
                height="202"
                rx="14"
                fill={palette[0]}
                stroke={palette[2]}
                strokeWidth="4"
              />

              <path
                d="M670 424 A64 64 0 0 1 766 424"
                fill="none"
                stroke={palette[4]}
                strokeWidth="13"
                strokeLinecap="round"
              />
              <path
                d="M670 424 A64 64 0 0 1 766 424"
                fill="none"
                stroke={palette[1]}
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="210"
                strokeDashoffset={210 * (1 - gaugeProgress)}
                filter="url(#amberGlow)"
              />
              <line
                x1="718"
                y1="476"
                x2={gaugeX}
                y2={gaugeY}
                stroke={palette[3]}
                strokeWidth="8"
                strokeLinecap="round"
                filter="url(#redGlow)"
              />
              <circle cx="718" cy="476" r="18" fill={palette[1]} />

              <circle
                cx="718"
                cy="512"
                r="46"
                fill={palette[0]}
                stroke={palette[2]}
                strokeWidth="8"
                style={{
                  transform: `rotate(${frame * 7}deg)`,
                  transformOrigin: '718px 512px',
                }}
              />
              <path
                d="M718 474V550M680 512H756M691 485L745 539M745 485L691 539"
                stroke={palette[2]}
                strokeWidth="6"
                strokeLinecap="round"
              />

              <text
                x="656"
                y="405"
                fill={palette[3]}
                fontFamily='"Courier New", monospace'
                fontWeight="900"
                fontSize="12"
              >
                EMPTY
              </text>
              <text
                x="742"
                y="405"
                fill={palette[1]}
                fontFamily='"Courier New", monospace'
                fontWeight="900"
                fontSize="12"
              >
                FULL
              </text>
              <text
                x="718"
                y="624"
                textAnchor="middle"
                fill={frame >= 82 ? palette[1] : palette[2]}
                fontFamily='"Courier New", monospace'
                fontWeight="900"
                fontSize="18"
                letterSpacing="3"
              >
                LOCAL BANK
              </text>

              <g
                opacity={interpolate(frame, [78, 84], [0, 1], clamp)}
                style={{
                  transform: `translate(718px, 676px) scale(${impact}) translate(-718px, -676px)`,
                  transformOrigin: '718px 676px',
                }}
              >
                <text
                  x="718"
                  y="670"
                  textAnchor="middle"
                  fill={palette[1]}
                  fontFamily='"Arial Narrow", "Poppins", sans-serif'
                  fontWeight="950"
                  fontSize="34"
                  letterSpacing="-1"
                >
                  ${displayedFunds}.00
                </text>
                <text
                  x="718"
                  y="702"
                  textAnchor="middle"
                  fill={palette[1]}
                  fontFamily='"Courier New", monospace'
                  fontWeight="900"
                  fontSize="16"
                  letterSpacing="3"
                >
                  FUNDS RECEIVED
                </text>
              </g>
            </g>

            {/* Shared platform signal rail */}
            <path
              d="M140 820H760"
              fill="none"
              stroke={palette[4]}
              strokeWidth="28"
              strokeLinecap="round"
            />
            <path
              d="M140 820H760"
              fill="none"
              stroke={palette[2]}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="34 20"
              strokeDashoffset={frame * -8}
              filter="url(#cyanGlow)"
            />
            <circle
              cx={interpolate(frame % 40, [0, 39], [150, 750], clamp)}
              cy="820"
              r="14"
              fill={palette[1]}
              filter="url(#amberGlow)"
            />

            {/* Android device dock */}
            <g
              opacity={interpolate(frame, [81, 89], [0, 1], clamp)}
              style={{
                transform: `translate(${leftDeviceX}px, 820px) rotate(${leftDeviceRotation}deg) translate(-238px, -820px)`,
                transformOrigin: '238px 820px',
              }}
            >
              <rect
                x="188"
                y="718"
                width="100"
                height="176"
                rx="19"
                fill={palette[0]}
                stroke={palette[2]}
                strokeWidth="7"
              />
              <rect
                x="205"
                y="746"
                width="66"
                height="105"
                rx="9"
                fill={palette[4]}
                stroke={palette[2]}
                strokeWidth="3"
              />
              <circle cx="238" cy="871" r="9" fill={palette[1]} />
              <path
                d="M220 780H256M224 780L216 768M252 780L260 768M219 782V814M257 782V814M228 814V829M248 814V829"
                fill="none"
                stroke={palette[1]}
                strokeWidth="7"
                strokeLinecap="round"
              />
              <path
                d="M286 802L310 820L286 838"
                fill="none"
                stroke={palette[2]}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="238"
                y="930"
                textAnchor="middle"
                fill={palette[2]}
                fontFamily='"Courier New", monospace'
                fontWeight="900"
                fontSize="17"
                letterSpacing="3"
              >
                ANDROID
              </text>
            </g>

            {/* iOS device dock */}
            <g
              opacity={interpolate(frame, [81, 89], [0, 1], clamp)}
              style={{
                transform: `translate(${rightDeviceX}px, 820px) rotate(${rightDeviceRotation}deg) translate(-662px, -820px)`,
                transformOrigin: '662px 820px',
              }}
            >
              <rect
                x="612"
                y="718"
                width="100"
                height="176"
                rx="25"
                fill={palette[0]}
                stroke={palette[2]}
                strokeWidth="7"
              />
              <rect
                x="629"
                y="746"
                width="66"
                height="105"
                rx="9"
                fill={palette[4]}
                stroke={palette[2]}
                strokeWidth="3"
              />
              <rect x="645" y="730" width="34" height="6" rx="3" fill={palette[1]} />
              <path
                d="M662 774C648 774 641 789 648 802C653 812 657 821 662 821C668 821 670 816 676 821C682 821 688 810 692 800C696 787 687 776 677 776C670 776 666 780 662 780C658 780 655 776 650 776"
                fill={palette[1]}
              />
              <path
                d="M614 802L590 820L614 838"
                fill="none"
                stroke={palette[2]}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="662"
                y="930"
                textAnchor="middle"
                fill={palette[2]}
                fontFamily='"Courier New", monospace'
                fontWeight="900"
                fontSize="17"
                letterSpacing="3"
              >
                iOS
              </text>
            </g>

            {/* Dock clamps */}
            <g opacity={interpolate(frame, [91, 97], [0, 1], clamp)}>
              <path
                d="M292 788V852M292 788H314M292 852H314M608 788V852M608 788H586M608 852H586"
                fill="none"
                stroke={palette[1]}
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#amberGlow)"
              />
            </g>

            <g opacity={compatibilityOpacity}>
              <rect
                x="318"
                y="874"
                width="264"
                height="62"
                rx="31"
                fill={palette[0]}
                stroke={palette[1]}
                strokeWidth="4"
              />
              <circle
                cx="348"
                cy="905"
                r="10"
                fill={palette[1]}
                filter="url(#amberGlow)"
              />
              <text
                x="466"
                y="912"
                textAnchor="middle"
                fill={palette[1]}
                fontFamily='"Courier New", monospace'
                fontWeight="900"
                fontSize="17"
                letterSpacing="2.5"
              >
                PIPELINE LOCKED
              </text>
            </g>
          </svg>
        </div>

        {/* Bottom operational status */}
        <div
          style={{
            width: '100%',
            height: 104,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `3px solid ${frame >= 82 ? palette[1] : palette[2]}`,
            transform: `translateY(${interpolate(intro, [0, 1], [45, 0], clamp)}px)`,
            opacity: intro,
          }}
        >
          <div>
            <div
              style={{
                color: palette[4],
                fontFamily: '"Courier New", monospace',
                fontSize: 14,
                fontWeight: 900,
                letterSpacing: 4,
                marginBottom: 8,
              }}
            >
              CURRENT OPERATION
            </div>
            <div
              style={{
                color: frame >= 82 ? palette[1] : palette[2],
                fontFamily: '"Courier New", monospace',
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              {statusText}
              {typeCursor}
            </div>
          </div>

          <div
            style={{
              color: palette[1],
              fontFamily: '"Arial Narrow", "Poppins", sans-serif',
              fontSize: 41,
              fontWeight: 950,
              letterSpacing: -1,
              transform: `scale(${1 + Math.max(0, impact - 1) * 0.3})`,
              transformOrigin: 'right center',
            }}
          >
            ${displayedFunds}.00
          </div>
        </div>
      </div>

      {/* Final HUD collapse into heartbeat dot */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 26,
          height: 26,
          borderRadius: '50%',
          backgroundColor: palette[1],
          boxShadow: `0 0 18px ${palette[1]}, 0 0 54px ${palette[1]}`,
          opacity: interpolate(
            frame,
            [collapseStart + 5, collapseStart + 10, durationInFrames],
            [0, 1, 1],
            clamp,
          ),
          transform: `translate(-50%, -50%) scale(${heartbeatIn * heartbeatPulse})`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: interpolate(
            frame,
            [collapseStart + 9, durationInFrames - 1],
            [28, 160],
            clamp,
          ),
          height: interpolate(
            frame,
            [collapseStart + 9, durationInFrames - 1],
            [28, 160],
            clamp,
          ),
          borderRadius: '50%',
          border: `4px solid ${palette[1]}`,
          opacity: interpolate(
            frame,
            [collapseStart + 9, collapseStart + 12, durationInFrames],
            [0, 0.75, 0],
            clamp,
          ),
          transform: 'translate(-50%, -50%)',
        }}
      />
    </AbsoluteFill>
  );
}