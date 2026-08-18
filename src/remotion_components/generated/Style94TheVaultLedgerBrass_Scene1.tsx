import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = {
  background: '#1D4D3B',
  primary: '#F1EAD8',
  brass: '#AD8F3F',
  alert: '#59332E',
  muted: '#23211C',
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

function Gear({
  x,
  y,
  radius,
  teeth,
  rotation,
  reverse = false,
}: {
  x: number;
  y: number;
  radius: number;
  teeth: number;
  rotation: number;
  reverse?: boolean;
}) {
  const direction = reverse ? -1 : 1;
  const toothWidth = Math.max(4, radius * 0.22);
  const toothHeight = Math.max(7, radius * 0.28);

  return (
    <g transform={`translate(${x} ${y}) rotate(${rotation * direction})`}>
      {Array.from({ length: teeth }).map((_, index) => {
        const angle = (360 / teeth) * index;
        return (
          <rect
            key={index}
            x={-toothWidth / 2}
            y={-radius - toothHeight * 0.72}
            width={toothWidth}
            height={toothHeight}
            rx={1.5}
            fill={palette.brass}
            stroke={palette.muted}
            strokeWidth={1.5}
            transform={`rotate(${angle})`}
          />
        );
      })}
      <circle
        r={radius}
        fill={palette.brass}
        stroke={palette.muted}
        strokeWidth={4}
      />
      <circle
        r={radius * 0.72}
        fill={palette.background}
        stroke={palette.primary}
        strokeWidth={2}
      />
      {Array.from({ length: 6 }).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 6;
        const inner = radius * 0.22;
        const outer = radius * 0.67;
        return (
          <line
            key={index}
            x1={Math.cos(angle) * inner}
            y1={Math.sin(angle) * inner}
            x2={Math.cos(angle) * outer}
            y2={Math.sin(angle) * outer}
            stroke={palette.brass}
            strokeWidth={Math.max(4, radius * 0.12)}
            strokeLinecap="round"
          />
        );
      })}
      <circle
        r={radius * 0.2}
        fill={palette.alert}
        stroke={palette.muted}
        strokeWidth={3}
      />
      <circle r={radius * 0.07} fill={palette.primary} />
    </g>
  );
}

export default function Style94TheVaultLedgerBrass_Scene1() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 15,
      mass: 0.75,
      stiffness: 115,
    },
  });

  const ledgerSpring = spring({
    frame: frame - 29,
    fps,
    config: {
      damping: 13,
      mass: 0.72,
      stiffness: 105,
    },
  });

  const dialRotation = interpolate(frame, [0, 13, 27, 40], [-150, 35, 245, 365], clamp);
  const dialScale = interpolate(frame, [0, 10, 29, 42], [0.64, 1, 1, 0.36], clamp);
  const dialOpacity = interpolate(frame, [0, 7, 31, 43], [0, 1, 1, 0], clamp);
  const dialLift = interpolate(frame, [27, 43], [0, -120], clamp);

  const bookOpacity = interpolate(frame, [26, 38], [0, 1], clamp);
  const bookScale = interpolate(ledgerSpring, [0, 1], [0.65, 1], clamp);
  const bookLift = interpolate(ledgerSpring, [0, 1], [110, 0], clamp);
  const pageOpen = interpolate(frame, [29, 53], [0.05, 1], clamp);

  const lineFill1 = interpolate(frame, [45, 60], [0, 100], clamp);
  const lineFill2 = interpolate(frame, [49, 68], [0, 100], clamp);
  const lineFill3 = interpolate(frame, [55, 74], [0, 100], clamp);

  const gearRotation = interpolate(frame, [38, durationInFrames], [0, 176], clamp);
  const lightSweep = interpolate(frame, [48, 79], [-35, 135], clamp);

  const sceneOpacity = interpolate(
    frame,
    [0, 7, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    clamp
  );

  const clickIndex = frame < 13 ? 0 : frame < 20 ? 1 : frame < 27 ? 2 : 3;
  const clickPulse = interpolate(frame % 7, [0, 2, 6], [0.75, 1.18, 0.75], clamp);

  const serialReveal = interpolate(frame, [8, 24], [0, 100], clamp);

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: palette.background,
        backdropFilter: 'blur(24px) brightness(0.4)',
        opacity: sceneOpacity,
        fontFamily: 'Georgia, Times New Roman, serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage: `repeating-linear-gradient(0deg, ${palette.primary} 0px, ${palette.primary} 1px, ${palette.background} 1px, ${palette.background} 8px)`,
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
          boxSizing: 'border-box',
          padding: '30px 38px 28px',
          border: `3px solid ${palette.brass}`,
          outline: `1px solid ${palette.primary}`,
          outlineOffset: -12,
          borderRadius: 22,
          backgroundColor: palette.background,
          boxShadow: `0 28px 0 ${palette.muted}`,
          transform: `scale(${interpolate(entrance, [0, 1], [0.92, 1], clamp)}) translateY(${interpolate(
            entrance,
            [0, 1],
            [45, 0],
            clamp
          )}px)`,
        }}
      >
        <div
          style={{
            height: 78,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `2px solid ${palette.brass}`,
            color: palette.primary,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                border: `2px solid ${palette.brass}`,
                backgroundColor: palette.muted,
                color: palette.brass,
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              V
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 4,
                  color: palette.brass,
                }}
              >
                CHRONIXEL ARCHIVE
              </div>
              <div
                style={{
                  marginTop: 5,
                  fontSize: 27,
                  fontWeight: 900,
                  letterSpacing: 2.5,
                  textTransform: 'uppercase',
                }}
              >
                The Vault
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              fontFamily: 'Courier New, monospace',
            }}
          >
            <div
              style={{
                padding: '9px 16px',
                border: `1px solid ${palette.brass}`,
                backgroundColor: palette.muted,
                color: palette.primary,
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 2.4,
                textTransform: 'uppercase',
              }}
            >
              Activation Code
            </div>
            <div
              style={{
                width: 142,
                overflow: 'hidden',
                color: palette.brass,
                fontSize: 17,
                fontWeight: 900,
                letterSpacing: 3,
              }}
            >
              <div
                style={{
                  width: 142,
                  whiteSpace: 'nowrap',
                  clipPath: `inset(0 ${100 - serialReveal}% 0 0)`,
                }}
              >
                DV-OPS-094
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 455,
              height: 455,
              opacity: dialOpacity,
              transform: `translateY(${dialLift}px) scale(${dialScale}) rotate(${dialRotation}deg)`,
            }}
          >
            <svg viewBox="0 0 455 455" width="100%" height="100%">
              <circle
                cx="227.5"
                cy="227.5"
                r="213"
                fill={palette.muted}
                stroke={palette.brass}
                strokeWidth="8"
              />
              <circle
                cx="227.5"
                cy="227.5"
                r="184"
                fill={palette.background}
                stroke={palette.primary}
                strokeWidth="3"
              />
              <circle
                cx="227.5"
                cy="227.5"
                r="141"
                fill={palette.muted}
                stroke={palette.brass}
                strokeWidth="7"
              />

              {Array.from({ length: 36 }).map((_, index) => {
                const angle = (Math.PI * 2 * index) / 36 - Math.PI / 2;
                const major = index % 3 === 0;
                const x1 = 227.5 + Math.cos(angle) * (major ? 153 : 159);
                const y1 = 227.5 + Math.sin(angle) * (major ? 153 : 159);
                const x2 = 227.5 + Math.cos(angle) * 176;
                const y2 = 227.5 + Math.sin(angle) * 176;

                return (
                  <line
                    key={index}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={major ? palette.brass : palette.primary}
                    strokeWidth={major ? 5 : 2}
                  />
                );
              })}

              {Array.from({ length: 12 }).map((_, index) => {
                const angle = (Math.PI * 2 * index) / 12 - Math.PI / 2;
                const x = 227.5 + Math.cos(angle) * 115;
                const y = 227.5 + Math.sin(angle) * 115 + 5;

                return (
                  <text
                    key={index}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    fill={palette.primary}
                    fontFamily="Courier New, monospace"
                    fontSize="13"
                    fontWeight="700"
                    transform={`rotate(${-dialRotation} ${x} ${y})`}
                  >
                    {String(index * 5).padStart(2, '0')}
                  </text>
                );
              })}

              <g transform="translate(227.5 227.5)">
                <circle
                  r="78"
                  fill={palette.brass}
                  stroke={palette.primary}
                  strokeWidth="4"
                />
                <circle
                  r="35"
                  fill={palette.alert}
                  stroke={palette.muted}
                  strokeWidth="6"
                />
                {Array.from({ length: 3 }).map((_, index) => (
                  <rect
                    key={index}
                    x="-10"
                    y="-125"
                    width="20"
                    height="103"
                    rx="8"
                    fill={palette.brass}
                    stroke={palette.muted}
                    strokeWidth="4"
                    transform={`rotate(${index * 120})`}
                  />
                ))}
                <circle r="12" fill={palette.primary} />
              </g>
            </svg>
          </div>

          <div
            style={{
              position: 'absolute',
              right: 18,
              top: '50%',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              transform: 'translateY(-50%)',
              opacity: dialOpacity,
            }}
          >
            {['I', 'II', 'III', 'OPEN'].map((label, index) => {
              const active = index <= clickIndex;
              return (
                <div
                  key={label}
                  style={{
                    width: index === 3 ? 82 : 52,
                    height: 28,
                    display: 'grid',
                    placeItems: 'center',
                    border: `2px solid ${active ? palette.brass : palette.muted}`,
                    backgroundColor: active ? palette.brass : palette.background,
                    color: active ? palette.muted : palette.primary,
                    fontFamily: 'Courier New, monospace',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    transform:
                      index === clickIndex ? `scale(${clickPulse})` : 'scale(1)',
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>

          <div
            style={{
              position: 'absolute',
              width: '88%',
              height: '84%',
              opacity: bookOpacity,
              transform: `translateY(${bookLift}px) scale(${bookScale})`,
              transformOrigin: 'center bottom',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '4%',
                right: '4%',
                bottom: -14,
                height: 35,
                borderRadius: '0 0 16px 16px',
                backgroundColor: palette.alert,
                border: `3px solid ${palette.muted}`,
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                filter: `drop-shadow(0 20px 0 ${palette.muted})`,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '50%',
                  height: '100%',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  padding: '30px 40px 28px',
                  border: `4px solid ${palette.brass}`,
                  borderRightWidth: 2,
                  borderRadius: '16px 3px 3px 16px',
                  backgroundColor: palette.primary,
                  transformOrigin: 'right center',
                  transform: `perspective(900px) rotateY(${interpolate(
                    pageOpen,
                    [0, 1],
                    [-72, -4],
                    clamp
                  )}deg)`,
                }}
              >
                <div
                  style={{
                    color: palette.alert,
                    fontSize: 13,
                    fontWeight: 900,
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                  }}
                >
                  Foundational Ledger
                </div>
                <div
                  style={{
                    marginTop: 8,
                    color: palette.muted,
                    fontSize: 28,
                    lineHeight: 1,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  DevOps Systems
                </div>

                <div
                  style={{
                    marginTop: 22,
                    paddingTop: 17,
                    borderTop: `2px solid ${palette.brass}`,
                  }}
                >
                  {[
                    ['CI / CD PIPELINE', lineFill1],
                    ['INFRASTRUCTURE', lineFill2],
                    ['OBSERVABILITY', lineFill3],
                  ].map(([label, width], index) => (
                    <div key={String(label)} style={{ marginBottom: 18 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          color: palette.muted,
                          fontFamily: 'Courier New, monospace',
                          fontSize: 12,
                          fontWeight: 900,
                          letterSpacing: 1.4,
                        }}
                      >
                        <span>{String(label)}</span>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div
                        style={{
                          height: 8,
                          marginTop: 7,
                          backgroundColor: palette.muted,
                          border: `1px solid ${palette.brass}`,
                        }}
                      >
                        <div
                          style={{
                            width: `${Number(width)}%`,
                            height: '100%',
                            backgroundColor:
                              index === 1 ? palette.alert : palette.brass,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: 40,
                    right: 40,
                    bottom: 25,
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: palette.alert,
                    fontFamily: 'Courier New, monospace',
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 2,
                  }}
                >
                  <span>ENTRY 0094</span>
                  <span>VERIFIED</span>
                </div>
              </div>

              <div
                style={{
                  position: 'relative',
                  width: '50%',
                  height: '100%',
                  overflow: 'hidden',
                  boxSizing: 'border-box',
                  border: `4px solid ${palette.brass}`,
                  borderLeftWidth: 2,
                  borderRadius: '3px 16px 16px 3px',
                  backgroundColor: palette.primary,
                  transformOrigin: 'left center',
                  transform: `perspective(900px) rotateY(${interpolate(
                    pageOpen,
                    [0, 1],
                    [72, 4],
                    clamp
                  )}deg)`,
                }}
              >
                <svg viewBox="0 0 600 400" width="100%" height="100%">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <line
                      key={index}
                      x1="30"
                      y1={35 + index * 42}
                      x2="570"
                      y2={35 + index * 42}
                      stroke={palette.brass}
                      strokeWidth="1.5"
                      opacity="0.45"
                    />
                  ))}
                  {Array.from({ length: 7 }).map((_, index) => (
                    <line
                      key={index}
                      x1={45 + index * 85}
                      y1="22"
                      x2={45 + index * 85}
                      y2="378"
                      stroke={palette.muted}
                      strokeWidth="1"
                      opacity="0.18"
                    />
                  ))}

                  <Gear
                    x={176}
                    y={183}
                    radius={66}
                    teeth={16}
                    rotation={gearRotation}
                  />
                  <Gear
                    x={315}
                    y={128}
                    radius={47}
                    teeth={14}
                    rotation={gearRotation * 1.3}
                    reverse
                  />
                  <Gear
                    x={408}
                    y={230}
                    radius={78}
                    teeth={18}
                    rotation={gearRotation * 0.72}
                  />
                  <Gear
                    x={277}
                    y={283}
                    radius={37}
                    teeth={12}
                    rotation={gearRotation * 1.55}
                    reverse
                  />
                  <Gear
                    x={494}
                    y={105}
                    radius={27}
                    teeth={10}
                    rotation={gearRotation * 2}
                    reverse
                  />

                  <path
                    d="M77 326 C137 286, 163 315, 218 273 S328 229, 371 279 S462 328, 536 286"
                    fill="none"
                    stroke={palette.alert}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="11 11"
                  />
                  <circle
                    cx="77"
                    cy="326"
                    r="11"
                    fill={palette.alert}
                    stroke={palette.muted}
                    strokeWidth="4"
                  />
                  <circle
                    cx="536"
                    cy="286"
                    r="11"
                    fill={palette.brass}
                    stroke={palette.muted}
                    strokeWidth="4"
                  />

                  <rect
                    x="24"
                    y="18"
                    width="552"
                    height="364"
                    rx="8"
                    fill="none"
                    stroke={palette.muted}
                    strokeWidth="3"
                  />
                </svg>

                <div
                  style={{
                    position: 'absolute',
                    left: `${lightSweep}%`,
                    top: '-30%',
                    width: 52,
                    height: '160%',
                    opacity: 0.26,
                    backgroundColor: palette.primary,
                    transform: 'rotate(17deg)',
                  }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: 8,
                  bottom: 8,
                  width: 12,
                  borderRadius: 10,
                  backgroundColor: palette.alert,
                  border: `2px solid ${palette.muted}`,
                  transform: 'translateX(-50%)',
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            height: 85,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `2px solid ${palette.brass}`,
          }}
        >
          <div>
            <div
              style={{
                color: palette.brass,
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}
            >
              Certificate of Systems Fluency
            </div>
            <div
              style={{
                marginTop: 7,
                color: palette.primary,
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: 1,
                textTransform: 'uppercase',
                textShadow: `2px 2px 0 ${palette.alert}`,
              }}
            >
              Understand the machinery before automating it.
            </div>
          </div>

          <div
            style={{
              width: 64,
              height: 64,
              display: 'grid',
              placeItems: 'center',
              borderRadius: '50%',
              border: `3px double ${palette.brass}`,
              backgroundColor: palette.alert,
              color: palette.primary,
              fontFamily: 'Courier New, monospace',
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 1,
              transform: `rotate(${interpolate(frame, [38, 80], [-18, 0], clamp)}deg)`,
            }}
          >
            094
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}