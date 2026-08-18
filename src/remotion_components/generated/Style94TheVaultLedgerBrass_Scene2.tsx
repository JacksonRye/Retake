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
  ivory: '#F1EAD8',
  brass: '#AD8F3F',
  alert: '#59332E',
  dark: '#23211C',
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const gearTeeth = Array.from({length: 12}, (_, index) => index);
const ledgerRows = Array.from({length: 5}, (_, index) => index);
const tumblers = Array.from({length: 4}, (_, index) => index);

function Gear({
  x,
  y,
  radius,
  rotation,
  progress,
}: {
  x: number;
  y: number;
  radius: number;
  rotation: number;
  progress: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotation}) scale(${progress})`}
      style={{transformOrigin: '0px 0px'}}
    >
      {gearTeeth.map((tooth) => (
        <rect
          key={tooth}
          x={-5}
          y={-radius - 8}
          width={10}
          height={16}
          rx={2}
          fill={palette.brass}
          stroke={palette.dark}
          strokeWidth={2}
          transform={`rotate(${tooth * 30})`}
        />
      ))}
      <circle
        r={radius}
        fill={palette.background}
        stroke={palette.brass}
        strokeWidth={8}
      />
      <circle
        r={radius * 0.54}
        fill={palette.dark}
        stroke={palette.ivory}
        strokeWidth={2}
      />
      <circle r={radius * 0.17} fill={palette.brass} />
      {[0, 90, 180, 270].map((angle) => (
        <rect
          key={angle}
          x={-4}
          y={-radius * 0.48}
          width={8}
          height={radius * 0.42}
          rx={3}
          fill={palette.brass}
          transform={`rotate(${angle})`}
        />
      ))}
    </g>
  );
}

export default function Style94TheVaultLedgerBrass_Scene2() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 130, mass: 0.8},
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    clamp,
  );

  const exitScale = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0.97],
    clamp,
  );

  const dialSpring = spring({
    frame: frame - 5,
    fps,
    config: {damping: 13, stiffness: 90, mass: 1.2},
  });

  const dialRotation =
    interpolate(dialSpring, [0, 1], [-240, 18], clamp) +
    interpolate(frame, [34, 48], [0, -18], clamp);

  const reveal = interpolate(frame, [26, 62], [0, 1], clamp);
  const embossSweep = interpolate(frame, [20, 62], [-20, 120], clamp);
  const pipeDashOffset = interpolate(frame, [24, 62], [920, 0], clamp);
  const statusProgress = interpolate(frame, [50, 72], [0, 1], clamp);
  const pulse = 0.88 + Math.sin(frame * 0.22) * 0.12;

  const gearOne = spring({
    frame: frame - 31,
    fps,
    config: {damping: 12, stiffness: 160, mass: 0.55},
  });
  const gearTwo = spring({
    frame: frame - 38,
    fps,
    config: {damping: 11, stiffness: 150, mass: 0.5},
  });
  const gearThree = spring({
    frame: frame - 45,
    fps,
    config: {damping: 12, stiffness: 150, mass: 0.55},
  });

  const serialNumber = Math.round(
    interpolate(frame, [40, 68], [100000, 947231], clamp),
  )
    .toString()
    .padStart(6, '0');

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: palette.background,
        backdropFilter: 'blur(24px) brightness(0.4)',
        opacity: exitOpacity,
        fontFamily: 'Georgia, Times New Roman, serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.16,
          backgroundImage: `repeating-linear-gradient(0deg, ${palette.dark} 0px, ${palette.dark} 1px, ${palette.background} 1px, ${palette.background} 7px)`,
        }}
      />

      <div
        style={{
          width: '92%',
          height: '88%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: 26,
          border: `3px solid ${palette.brass}`,
          borderRadius: 24,
          backgroundColor: palette.background,
          boxShadow: `0 28px 70px ${palette.dark}, inset 0 0 0 8px ${palette.dark}, inset 0 0 0 10px ${palette.brass}`,
          transform: `scale(${entrance * exitScale})`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${embossSweep}%`,
            width: '8%',
            opacity: 0.14,
            transform: 'skewX(-18deg)',
            backgroundColor: palette.ivory,
          }}
        />

        <header
          style={{
            height: 70,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 22px',
            borderBottom: `2px solid ${palette.brass}`,
            color: palette.ivory,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 5,
                color: palette.brass,
              }}
            >
              CHRONIXEL · THE VAULT
            </div>
            <div
              style={{
                marginTop: 5,
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              Automation Engineering Certificate
            </div>
          </div>

          <div
            style={{
              padding: '10px 16px',
              border: `1px solid ${palette.brass}`,
              backgroundColor: palette.dark,
              color: palette.ivory,
              fontFamily: 'Courier New, monospace',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            SERIAL · V94-{serialNumber}
          </div>
        </header>

        <main
          style={{
            display: 'grid',
            gridTemplateColumns: '30% 1fr 24%',
            gap: 20,
            flex: 1,
            minHeight: 0,
            padding: '20px 0',
          }}
        >
          <section
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px solid ${palette.dark}`,
              borderRadius: 18,
              backgroundColor: palette.dark,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 18,
                left: 20,
                color: palette.brass,
                fontFamily: 'Courier New, monospace',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 3,
              }}
            >
              VAULT DIAL · 94
            </div>

            <div
              style={{
                width: 220,
                height: 220,
                position: 'relative',
                borderRadius: '50%',
                border: `9px solid ${palette.brass}`,
                backgroundColor: palette.background,
                boxShadow: `inset 0 0 0 5px ${palette.dark}, 0 0 0 3px ${palette.ivory}`,
                transform: `rotate(${dialRotation}deg)`,
              }}
            >
              {Array.from({length: 20}, (_, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: index % 5 === 0 ? 4 : 2,
                    height: index % 5 === 0 ? 22 : 13,
                    top: 5,
                    left: '50%',
                    transformOrigin: '50% 100px',
                    transform: `translateX(-50%) rotate(${index * 18}deg)`,
                    backgroundColor:
                      index % 5 === 0 ? palette.ivory : palette.brass,
                  }}
                />
              ))}

              <div
                style={{
                  position: 'absolute',
                  inset: 49,
                  borderRadius: '50%',
                  border: `5px solid ${palette.brass}`,
                  backgroundColor: palette.dark,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 76,
                    borderRadius: 10,
                    backgroundColor: palette.ivory,
                    boxShadow: `0 0 0 4px ${palette.brass}`,
                  }}
                />
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                top: 75,
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: `18px solid ${palette.alert}`,
              }}
            />
          </section>

          <section
            style={{
              position: 'relative',
              border: `2px solid ${palette.brass}`,
              borderRadius: 18,
              backgroundColor: palette.background,
              overflow: 'hidden',
              opacity: interpolate(frame, [20, 34], [0, 1], clamp),
            }}
          >
            <svg
              viewBox="0 0 720 420"
              width="100%"
              height="100%"
              style={{display: 'block'}}
            >
              <rect
                x="14"
                y="14"
                width="692"
                height="392"
                rx="22"
                fill={palette.background}
                stroke={palette.dark}
                strokeWidth="12"
              />

              <g opacity={0.22}>
                {Array.from({length: 9}, (_, index) => (
                  <line
                    key={`vertical-${index}`}
                    x1={72 + index * 72}
                    y1="26"
                    x2={72 + index * 72}
                    y2="394"
                    stroke={palette.brass}
                    strokeWidth="1"
                  />
                ))}
                {Array.from({length: 6}, (_, index) => (
                  <line
                    key={`horizontal-${index}`}
                    x1="26"
                    y1={70 + index * 58}
                    x2="694"
                    y2={70 + index * 58}
                    stroke={palette.brass}
                    strokeWidth="1"
                  />
                ))}
              </g>

              <g
                fill="none"
                stroke={palette.dark}
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M42 98 H180 V172 H294 V74 H430 V152 H548 V96 H678" />
                <path d="M42 324 H136 V248 H252 V342 H390 V262 H500 V344 H678" />
                <path d="M180 172 V286 H324 V210 H472 V152" />
              </g>

              <g
                fill="none"
                stroke={palette.brass}
                strokeWidth="12"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="920"
                strokeDashoffset={pipeDashOffset}
              >
                <path d="M42 98 H180 V172 H294 V74 H430 V152 H548 V96 H678" />
                <path d="M42 324 H136 V248 H252 V342 H390 V262 H500 V344 H678" />
                <path d="M180 172 V286 H324 V210 H472 V152" />
              </g>

              {[
                [180, 172],
                [294, 74],
                [430, 152],
                [136, 248],
                [252, 342],
                [390, 262],
                [500, 344],
                [324, 210],
              ].map(([x, y], index) => (
                <g key={`${x}-${y}`} opacity={reveal}>
                  <circle
                    cx={x}
                    cy={y}
                    r="18"
                    fill={palette.dark}
                    stroke={palette.brass}
                    strokeWidth="6"
                  />
                  <circle cx={x} cy={y} r="5" fill={palette.ivory} />
                  <line
                    x1={x - 9}
                    y1={y}
                    x2={x + 9}
                    y2={y}
                    stroke={palette.ivory}
                    strokeWidth="3"
                    transform={`rotate(${index * 45} ${x} ${y})`}
                  />
                </g>
              ))}

              <Gear
                x={246}
                y={234}
                radius={47}
                rotation={frame * 2.8}
                progress={gearOne}
              />
              <Gear
                x={350}
                y={282}
                radius={35}
                rotation={-frame * 3.8}
                progress={gearTwo}
              />
              <Gear
                x={445}
                y={219}
                radius={48}
                rotation={frame * 2.4}
                progress={gearThree}
              />

              <g opacity={interpolate(frame, [58, 70], [0, 1], clamp)}>
                <rect
                  x="251"
                  y="176"
                  width="228"
                  height="56"
                  rx="8"
                  fill={palette.dark}
                  stroke={palette.ivory}
                  strokeWidth="2"
                />
                <text
                  x="365"
                  y="200"
                  textAnchor="middle"
                  fill={palette.brass}
                  fontFamily="Courier New, monospace"
                  fontWeight="800"
                  fontSize="11"
                  letterSpacing="3"
                >
                  ACTIVATION CODE
                </text>
                <text
                  x="365"
                  y="220"
                  textAnchor="middle"
                  fill={palette.ivory}
                  fontFamily="Courier New, monospace"
                  fontWeight="900"
                  fontSize="18"
                  letterSpacing="5"
                >
                  REPEAT·BUILD·SHIP
                </text>
              </g>
            </svg>
          </section>

          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              padding: 14,
              border: `2px solid ${palette.dark}`,
              borderRadius: 18,
              backgroundColor: palette.ivory,
              color: palette.dark,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 3,
                color: palette.alert,
              }}
            >
              TUMBLER REGISTER
            </div>

            {tumblers.map((index) => {
              const click = spring({
                frame: frame - (15 + index * 8),
                fps,
                config: {damping: 10, stiffness: 220, mass: 0.42},
              });
              const lockX = interpolate(click, [0, 1], [55, 0], clamp);

              return (
                <div
                  key={index}
                  style={{
                    height: 49,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '0 10px',
                    border: `2px solid ${palette.dark}`,
                    backgroundColor:
                      click > 0.92 ? palette.background : palette.ivory,
                    color: click > 0.92 ? palette.ivory : palette.dark,
                    transform: `translateX(${lockX}px)`,
                  }}
                >
                  <div
                    style={{
                      width: 21,
                      height: 21,
                      borderRadius: '50%',
                      border: `3px solid ${palette.brass}`,
                      backgroundColor:
                        click > 0.92 ? palette.brass : palette.dark,
                      transform: `rotate(${click * 180}deg)`,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      fontFamily: 'Courier New, monospace',
                      fontSize: 13,
                      fontWeight: 900,
                      letterSpacing: 2,
                    }}
                  >
                    T-0{index + 1}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: 11,
                      fontWeight: 900,
                      color:
                        click > 0.92 ? palette.brass : palette.alert,
                    }}
                  >
                    {click > 0.92 ? 'LOCKED' : 'ALIGN'}
                  </div>
                </div>
              );
            })}

            <div
              style={{
                marginTop: 'auto',
                padding: 12,
                border: `2px solid ${palette.brass}`,
                backgroundColor: palette.dark,
                color: palette.ivory,
              }}
            >
              <div
                style={{
                  marginBottom: 9,
                  fontSize: 10,
                  fontWeight: 900,
                  letterSpacing: 2,
                  color: palette.brass,
                }}
              >
                LEDGER-LINE COMPLETION
              </div>
              <div
                style={{
                  height: 8,
                  backgroundColor: palette.background,
                  border: `1px solid ${palette.brass}`,
                }}
              >
                <div
                  style={{
                    width: `${statusProgress * 100}%`,
                    height: '100%',
                    backgroundColor: palette.brass,
                  }}
                />
              </div>
            </div>
          </section>
        </main>

        <footer
          style={{
            height: 94,
            flexShrink: 0,
            display: 'grid',
            gridTemplateColumns: '1fr 34%',
            gap: 24,
            alignItems: 'center',
            padding: '0 22px',
            borderTop: `2px solid ${palette.brass}`,
          }}
        >
          <div>
            <div
              style={{
                color: palette.ivory,
                fontSize: 27,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: 'uppercase',
              }}
            >
              Pioneers Make Complexity Repeatable
            </div>
            <div
              style={{
                marginTop: 7,
                color: palette.brass,
                fontFamily: 'Courier New, monospace',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              DEVOPS ENGINEERING · SOLVE ONCE · AUTOMATE FOREVER
            </div>
          </div>

          <div>
            {ledgerRows.map((row) => {
              const fill = interpolate(
                frame,
                [24 + row * 5, 52 + row * 5],
                [0, 100],
                clamp,
              );
              return (
                <div
                  key={row}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    height: 11,
                    margin: '3px 0',
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      color: palette.ivory,
                      fontFamily: 'Courier New, monospace',
                      fontSize: 9,
                      letterSpacing: 1,
                    }}
                  >
                    L-{row + 1}
                  </div>
                  <div
                    style={{
                      flex: 1,
                      height: 3,
                      backgroundColor: palette.dark,
                    }}
                  >
                    <div
                      style={{
                        width: `${fill}%`,
                        height: '100%',
                        backgroundColor: palette.brass,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </footer>

        <div
          style={{
            position: 'absolute',
            right: 18,
            top: 18,
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: palette.brass,
            opacity: pulse,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}