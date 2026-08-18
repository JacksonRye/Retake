import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

type GearProps = {
  x: number;
  y: number;
  radius: number;
  teeth: number;
  rotation: number;
  reverse?: boolean;
};

const Gear: React.FC<GearProps> = ({
  x,
  y,
  radius,
  teeth,
  rotation,
  reverse = false,
}) => {
  const points = Array.from({length: teeth * 2}, (_, index) => {
    const angle = (index / (teeth * 2)) * Math.PI * 2;
    const toothRadius = index % 2 === 0 ? radius : radius * 0.82;
    return `${x + Math.cos(angle) * toothRadius},${y + Math.sin(angle) * toothRadius}`;
  }).join(' ');

  return (
    <g
      style={{
        transformBox: 'fill-box',
        transformOrigin: 'center',
        transform: `rotate(${rotation * (reverse ? -1 : 1)}deg)`,
      }}
    >
      <polygon
        points={points}
        fill="#AD8F3F"
        stroke="#23211C"
        strokeWidth={4}
        strokeLinejoin="round"
      />
      <circle
        cx={x}
        cy={y}
        r={radius * 0.58}
        fill="#1D4D3B"
        stroke="#F1EAD8"
        strokeWidth={3}
      />
      <circle
        cx={x}
        cy={y}
        r={radius * 0.2}
        fill="#59332E"
        stroke="#23211C"
        strokeWidth={3}
      />
      {Array.from({length: 6}, (_, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const inner = radius * 0.28;
        const outer = radius * 0.52;

        return (
          <line
            key={index}
            x1={x + Math.cos(angle) * inner}
            y1={y + Math.sin(angle) * inner}
            x2={x + Math.cos(angle) * outer}
            y2={y + Math.sin(angle) * outer}
            stroke="#F1EAD8"
            strokeWidth={4}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};

export default function Style94TheVaultLedgerBrass_Scene4() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 13,
      stiffness: 115,
      mass: 0.72,
    },
  });

  const vaultOpen = spring({
    frame: Math.max(0, frame - 21),
    fps,
    config: {
      damping: 14,
      stiffness: 92,
      mass: 1.05,
    },
  });

  const networkReveal = interpolate(frame, [20, 49], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitOpacity = interpolate(
    frame,
    [0, 7, durationInFrames - 9, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const exitScale = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [1, 0.97],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  const doorAngle = interpolate(vaultOpen, [0, 1], [0, -104], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const dialRotation =
    interpolate(frame, [0, 18], [-210, 28], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }) +
    interpolate(frame, [18, 30], [0, -86], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const gearRotation = interpolate(frame, [24, durationInFrames], [0, 220], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'extend',
  });

  const pipeDash = interpolate(networkReveal, [0, 1], [1000, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const ledgerFill = interpolate(frame, [45, 72], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lightSweep = interpolate(frame, [34, 70], [-25, 125], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulse = 1 + Math.sin(frame * 0.22) * 0.018;

  const clickFrames = [14, 19, 25, 30];
  const tumblerValues = clickFrames.map((clickFrame) =>
    interpolate(frame, [clickFrame - 2, clickFrame, clickFrame + 3], [0, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(24px) brightness(0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: exitOpacity,
        overflow: 'hidden',
        fontFamily: 'Georgia, Times New Roman, serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#23211C',
          opacity: 0.18,
        }}
      />

      <div
        style={{
          width: '92%',
          height: '90%',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          padding: '30px 34px 26px',
          border: '3px solid #AD8F3F',
          outline: '1px solid #F1EAD8',
          outlineOffset: '-11px',
          borderRadius: 24,
          backgroundColor: '#1D4D3B',
          boxShadow: '0 28px 70px #23211C',
          transform: `scale(${entrance * exitScale}) translateY(${(1 - entrance) * 34}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${lightSweep}%`,
            top: 0,
            width: '7%',
            height: '100%',
            backgroundColor: '#F1EAD8',
            opacity: 0.07,
            transform: 'skewX(-17deg)',
            pointerEvents: 'none',
          }}
        />

        <header
          style={{
            height: 82,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #AD8F3F',
            padding: '0 8px 17px',
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                color: '#F1EAD8',
                fontSize: 29,
                fontWeight: 900,
                letterSpacing: 5,
                lineHeight: 1,
                textTransform: 'uppercase',
                textShadow: '2px 2px 0 #23211C',
              }}
            >
              The Automation Vault
            </div>
            <div
              style={{
                color: '#AD8F3F',
                marginTop: 10,
                fontFamily: 'Courier New, monospace',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Foundational Systems Ledger · Archive 94
            </div>
          </div>

          <div
            style={{
              minWidth: 270,
              border: '1px solid #AD8F3F',
              backgroundColor: '#23211C',
              padding: '10px 15px',
              textAlign: 'right',
              borderRadius: 6,
            }}
          >
            <div
              style={{
                color: '#AD8F3F',
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Activation Code
            </div>
            <div
              style={{
                color: '#F1EAD8',
                marginTop: 4,
                fontFamily: 'Courier New, monospace',
                fontSize: 18,
                fontWeight: 800,
                letterSpacing: 4,
              }}
            >
              SYS–LINK–04
            </div>
          </div>
        </header>

        <main
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '1.55fr 0.65fr',
            gap: 24,
            padding: '22px 0 18px',
          }}
        >
          <section
            style={{
              position: 'relative',
              minHeight: 0,
              overflow: 'hidden',
              border: '2px solid #23211C',
              borderRadius: 16,
              backgroundColor: '#23211C',
              boxShadow: 'inset 0 0 0 4px #AD8F3F',
              perspective: 1500,
            }}
          >
            <svg
              viewBox="0 0 980 520"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                opacity: 0.3 + networkReveal * 0.7,
              }}
            >
              <rect
                x={14}
                y={14}
                width={952}
                height={492}
                rx={22}
                fill="#1D4D3B"
                stroke="#AD8F3F"
                strokeWidth={3}
              />

              <g
                fill="none"
                stroke="#AD8F3F"
                strokeWidth={13}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={1000}
                strokeDashoffset={pipeDash}
              >
                <path d="M110 120 H260 V215 H385" />
                <path d="M110 395 H245 V315 H385" />
                <path d="M385 215 H540 V120 H720" />
                <path d="M385 315 H550 V408 H735" />
                <path d="M535 260 H850" />
              </g>

              <g
                fill="none"
                stroke="#F1EAD8"
                strokeWidth={3}
                strokeDasharray={1000}
                strokeDashoffset={pipeDash}
                opacity={0.75}
              >
                <path d="M110 120 H260 V215 H385" />
                <path d="M110 395 H245 V315 H385" />
                <path d="M385 215 H540 V120 H720" />
                <path d="M385 315 H550 V408 H735" />
                <path d="M535 260 H850" />
              </g>

              {[110, 385, 535, 735, 850].map((x, index) => {
                const y = [120, 265, 260, 408, 260][index];
                return (
                  <g key={`${x}-${y}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={22}
                      fill="#59332E"
                      stroke="#AD8F3F"
                      strokeWidth={5}
                    />
                    <circle cx={x} cy={y} r={7} fill="#F1EAD8" />
                  </g>
                );
              })}

              <Gear
                x={385}
                y={265}
                radius={79}
                teeth={16}
                rotation={gearRotation}
              />
              <Gear
                x={535}
                y={260}
                radius={57}
                teeth={14}
                rotation={gearRotation * 1.34}
                reverse
              />
              <Gear
                x={725}
                y={122}
                radius={49}
                teeth={12}
                rotation={gearRotation * 1.7}
              />
              <Gear
                x={745}
                y={406}
                radius={62}
                teeth={14}
                rotation={gearRotation * 1.2}
                reverse
              />

              <g opacity={networkReveal}>
                <rect
                  x={71}
                  y={80}
                  width={78}
                  height={80}
                  rx={8}
                  fill="#1D4D3B"
                  stroke="#F1EAD8"
                  strokeWidth={3}
                />
                <rect
                  x={69}
                  y={356}
                  width={82}
                  height={78}
                  rx={8}
                  fill="#1D4D3B"
                  stroke="#F1EAD8"
                  strokeWidth={3}
                />
                <rect
                  x={818}
                  y={221}
                  width={72}
                  height={78}
                  rx={8}
                  fill="#1D4D3B"
                  stroke="#F1EAD8"
                  strokeWidth={3}
                />
              </g>
            </svg>

            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 432,
                height: 432,
                transform: `translate(-50%, -50%) rotateY(${doorAngle}deg)`,
                transformOrigin: '0% 50%',
                transformStyle: 'preserve-3d',
                borderRadius: '50%',
                backgroundColor: '#1D4D3B',
                border: '15px solid #AD8F3F',
                boxShadow: '0 18px 34px #23211C, inset 0 0 0 7px #23211C',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 22,
                  border: '3px solid #F1EAD8',
                  borderRadius: '50%',
                  opacity: 0.72,
                }}
              />

              {Array.from({length: 12}, (_, index) => {
                const angle = (index / 12) * Math.PI * 2;
                const x = 194 + Math.cos(angle) * 168;
                const y = 194 + Math.sin(angle) * 168;

                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: x,
                      top: y,
                      width: 17,
                      height: 17,
                      borderRadius: '50%',
                      backgroundColor: '#AD8F3F',
                      border: '2px solid #23211C',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                );
              })}

              <div
                style={{
                  width: 205,
                  height: 205,
                  borderRadius: '50%',
                  border: '9px solid #AD8F3F',
                  backgroundColor: '#23211C',
                  boxShadow: 'inset 0 0 0 5px #F1EAD8',
                  transform: `rotate(${dialRotation}deg) scale(${pulse})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {Array.from({length: 8}, (_, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      width: 8,
                      height: 80,
                      borderRadius: 8,
                      backgroundColor: '#AD8F3F',
                      transform: `rotate(${index * 45}deg) translateY(-55px)`,
                      transformOrigin: 'center 95px',
                    }}
                  />
                ))}
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: '50%',
                    backgroundColor: '#59332E',
                    border: '6px solid #F1EAD8',
                    position: 'relative',
                    zIndex: 2,
                  }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  right: 54,
                  top: 185,
                  width: 88,
                  height: 22,
                  borderRadius: 12,
                  backgroundColor: '#AD8F3F',
                  border: '3px solid #23211C',
                  transform: `rotate(${dialRotation}deg)`,
                  transformOrigin: '11px 11px',
                }}
              />
            </div>
          </section>

          <aside
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid #AD8F3F',
              borderRadius: 14,
              backgroundColor: '#F1EAD8',
              color: '#23211C',
              overflow: 'hidden',
              boxShadow: '8px 8px 0 #23211C',
            }}
          >
            <div
              style={{
                padding: '19px 20px 15px',
                backgroundColor: '#AD8F3F',
                borderBottom: '3px double #23211C',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                }}
              >
                Certificate of Connection
              </div>
              <div
                style={{
                  marginTop: 7,
                  color: '#1D4D3B',
                  fontSize: 25,
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  textShadow: '1px 1px 0 #F1EAD8',
                }}
              >
                Systems Before Automation
              </div>
            </div>

            <div
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}
            >
              <div
                style={{
                  color: '#59332E',
                  fontFamily: 'Courier New, monospace',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                Tumbler Verification
              </div>

              <div
                style={{
                  marginTop: 17,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 8,
                }}
              >
                {tumblerValues.map((value, index) => (
                  <div
                    key={index}
                    style={{
                      height: 54,
                      border: '2px solid #23211C',
                      backgroundColor: value > 0.08 ? '#59332E' : '#1D4D3B',
                      color: '#F1EAD8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Courier New, monospace',
                      fontWeight: 900,
                      fontSize: 18,
                      transform: `translateY(${value * 5}px)`,
                      boxShadow: value > 0.08 ? 'inset 0 0 0 3px #AD8F3F' : 'none',
                    }}
                  >
                    0{index + 1}
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: '1px solid #23211C',
                  fontSize: 18,
                  fontWeight: 700,
                  lineHeight: 1.35,
                }}
              >
                Understand the mechanisms.
                <br />
                Map every dependency.
                <br />
                Then unlock automation.
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 18,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#59332E',
                    fontFamily: 'Courier New, monospace',
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 1,
                  }}
                >
                  <span>LEDGER-LINE</span>
                  <span>{Math.round(ledgerFill).toString().padStart(3, '0')}%</span>
                </div>
                <div
                  style={{
                    marginTop: 7,
                    height: 9,
                    border: '2px solid #23211C',
                    backgroundColor: '#F1EAD8',
                  }}
                >
                  <div
                    style={{
                      width: `${ledgerFill}%`,
                      height: '100%',
                      backgroundColor: '#AD8F3F',
                    }}
                  />
                </div>
              </div>
            </div>
          </aside>
        </main>

        <footer
          style={{
            minHeight: 54,
            borderTop: '2px solid #AD8F3F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#F1EAD8',
            padding: '12px 8px 0',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontSize: 17,
              fontWeight: 900,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
            }}
          >
            Connection is the foundation of every automated system.
          </div>
          <div
            style={{
              color: '#AD8F3F',
              fontFamily: 'Courier New, monospace',
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 2,
              whiteSpace: 'nowrap',
              marginLeft: 24,
            }}
          >
            SERIAL · CV-94-0004
          </div>
        </footer>
      </div>
    </AbsoluteFill>
  );
}