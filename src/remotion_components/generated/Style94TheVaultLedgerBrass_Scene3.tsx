import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style94TheVaultLedgerBrass_Scene3() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = spring({
    frame,
    fps,
    config: {damping: 14, mass: 0.72, stiffness: 115},
  });

  const exitOpacity = interpolate(
    frame,
    [0, 8, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const cardLift = interpolate(enter, [0, 1], [52, 0]);
  const cardScale = interpolate(enter, [0, 1], [0.94, 1]);

  const dialRotation = interpolate(
    frame,
    [5, 28, 45, 61, durationInFrames],
    [-132, 126, 38, 206, 236],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const dialSettle = spring({
    frame: Math.max(0, frame - 58),
    fps,
    config: {damping: 9, stiffness: 165, mass: 0.45},
  });

  const ledgerReveal = spring({
    frame: Math.max(0, frame - 13),
    fps,
    config: {damping: 17, stiffness: 105, mass: 0.62},
  });

  const diagramReveal = spring({
    frame: Math.max(0, frame - 28),
    fps,
    config: {damping: 13, stiffness: 125, mass: 0.5},
  });

  const sealReveal = spring({
    frame: Math.max(0, frame - 48),
    fps,
    config: {damping: 10, stiffness: 170, mass: 0.45},
  });

  const embossSweep = interpolate(
    frame,
    [18, 70],
    [-24, 124],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const ledgerLines = [
    {label: '01  INTAKE.GATE', value: 'WEBHOOK / VERIFIED', start: 17},
    {label: '02  PARSE.RECORD', value: 'SCHEMA / NORMALIZED', start: 25},
    {label: '03  ROUTE.LOGIC', value: 'RULESET / RESOLVED', start: 33},
    {label: '04  ISSUE.ACTION', value: 'SYSTEMS / LINKED', start: 41},
  ];

  const nodes = [
    {x: 120, y: 78, label: 'CRM', code: 'A-17', delay: 29},
    {x: 330, y: 78, label: 'LEDGER', code: 'B-04', delay: 35},
    {x: 120, y: 222, label: 'MAIL', code: 'C-22', delay: 41},
    {x: 330, y: 222, label: 'ARCHIVE', code: 'D-09', delay: 47},
  ];

  const clickFrames = [27, 45, 61];
  const clickEnergy = Math.max(
    ...clickFrames.map((clickFrame) =>
      interpolate(
        Math.abs(frame - clickFrame),
        [0, 3],
        [1, 0],
        {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
      ),
    ),
  );

  const serialNumber = `${String(Math.min(999999, 731204 + frame * 17)).padStart(
    6,
    '0',
  )}`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(24px) brightness(0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        opacity: exitOpacity,
        fontFamily: 'Georgia, Times New Roman, serif',
        color: '#F1EAD8',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '3.5%',
          border: '1px solid #AD8F3F',
          opacity: 0.45,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '4.4%',
          border: '1px solid #23211C',
          opacity: 0.8,
        }}
      />

      <div
        style={{
          width: '92%',
          height: '88%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1D4D3B',
          border: '3px solid #AD8F3F',
          borderRadius: 22,
          boxShadow: '0 26px 70px #23211C',
          overflow: 'hidden',
          transform: `translateY(${cardLift}px) scale(${cardScale})`,
        }}
      >
        <div
          style={{
            height: 9,
            flexShrink: 0,
            backgroundColor: '#AD8F3F',
            borderBottom: '3px solid #23211C',
          }}
        />

        <header
          style={{
            height: '13%',
            minHeight: 88,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 4%',
            borderBottom: '2px solid #AD8F3F',
            position: 'relative',
          }}
        >
          <div>
            <div
              style={{
                color: '#AD8F3F',
                fontFamily: 'Courier New, monospace',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 4,
                fontVariant: 'small-caps',
                marginBottom: 6,
              }}
            >
              THE VAULT · AUTOMATION REGISTER
            </div>
            <div
              style={{
                color: '#F1EAD8',
                fontSize: 30,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: 5,
                textTransform: 'uppercase',
                textShadow: '2px 2px 0 #23211C',
              }}
            >
              Systems Architecture Certificate
            </div>
          </div>

          <div
            style={{
              minWidth: 250,
              padding: '11px 18px',
              border: '1px solid #AD8F3F',
              backgroundColor: '#23211C',
              textAlign: 'right',
              borderRadius: 5,
              fontFamily: 'Courier New, monospace',
            }}
          >
            <div
              style={{
                color: '#AD8F3F',
                fontSize: 10,
                letterSpacing: 3,
                fontWeight: 800,
              }}
            >
              SEALED SERIAL
            </div>
            <div
              style={{
                color: '#F1EAD8',
                fontSize: 21,
                letterSpacing: 5,
                fontWeight: 900,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              VLT-{serialNumber}
            </div>
          </div>
        </header>

        <main
          style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '28% 1fr',
            gap: '2.2%',
            padding: '2.2% 3.5%',
          }}
        >
          <section
            style={{
              position: 'relative',
              border: '2px solid #23211C',
              borderRadius: 16,
              backgroundColor: '#59332E',
              boxShadow: 'inset 0 0 0 5px #AD8F3F, 9px 9px 0 #23211C',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '5% 7% 6%',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'Courier New, monospace',
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 2,
                color: '#F1EAD8',
              }}
            >
              <span>CHAMBER 03</span>
              <span>ARMED</span>
            </div>

            <div
              style={{
                width: 'min(30vh, 250px)',
                height: 'min(30vh, 250px)',
                position: 'relative',
                display: 'grid',
                placeItems: 'center',
                margin: '2% 0',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  backgroundColor: '#23211C',
                  border: '8px double #AD8F3F',
                  boxShadow: `0 0 ${18 + clickEnergy * 18}px #AD8F3F`,
                }}
              />

              {Array.from({length: 24}).map((_, index) => {
                const angle = index * 15;
                return (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: index % 3 === 0 ? 4 : 2,
                      height: index % 3 === 0 ? '11%' : '7%',
                      backgroundColor:
                        index % 3 === 0 ? '#F1EAD8' : '#AD8F3F',
                      transformOrigin: `50% ${index % 3 === 0 ? '455%' : '690%'}`,
                      transform: `translate(-50%, -100%) rotate(${angle}deg) translateY(-370%)`,
                    }}
                  />
                );
              })}

              <div
                style={{
                  width: '66%',
                  height: '66%',
                  borderRadius: '50%',
                  border: '5px solid #AD8F3F',
                  backgroundColor: '#1D4D3B',
                  display: 'grid',
                  placeItems: 'center',
                  transform: `rotate(${dialRotation + dialSettle * 4}px)`,
                  boxShadow: 'inset 0 0 0 5px #23211C',
                }}
              >
                <div
                  style={{
                    width: '18%',
                    height: '78%',
                    borderRadius: 99,
                    backgroundColor: '#AD8F3F',
                    border: '3px solid #23211C',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      width: '190%',
                      height: '20%',
                      left: '-45%',
                      top: '40%',
                      borderRadius: 99,
                      backgroundColor: '#F1EAD8',
                      border: '2px solid #23211C',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  width: 0,
                  height: 0,
                  borderLeft: '10px solid transparent',
                  borderRight: '10px solid transparent',
                  borderTop: '18px solid #F1EAD8',
                  filter: 'drop-shadow(0 3px 0 #23211C)',
                }}
              />
            </div>

            <div
              style={{
                width: '100%',
                borderTop: '1px solid #AD8F3F',
                paddingTop: 12,
                textAlign: 'center',
                fontFamily: 'Courier New, monospace',
              }}
            >
              <div
                style={{
                  color: '#F1EAD8',
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 3,
                }}
              >
                TUMBLERS ALIGNED
              </div>
              <div
                style={{
                  color: '#AD8F3F',
                  fontSize: 10,
                  marginTop: 5,
                  letterSpacing: 2,
                }}
              >
                27 · 45 · 61 / LINK AUTHORIZED
              </div>
            </div>
          </section>

          <section
            style={{
              minWidth: 0,
              position: 'relative',
              backgroundColor: '#F1EAD8',
              color: '#23211C',
              border: '3px double #AD8F3F',
              borderRadius: 11,
              boxShadow: '10px 10px 0 #23211C',
              overflow: 'hidden',
              transform: `scaleX(${interpolate(ledgerReveal, [0, 1], [0.75, 1])})`,
              transformOrigin: 'left center',
              opacity: ledgerReveal,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 12,
                border: '1px solid #AD8F3F',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: `${embossSweep}%`,
                top: '-20%',
                width: '8%',
                height: '140%',
                backgroundColor: '#AD8F3F',
                opacity: 0.18,
                transform: 'skewX(-14deg)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                height: '100%',
                display: 'grid',
                gridTemplateColumns: '45% 55%',
                padding: '4.5% 4%',
                gap: '4%',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  minWidth: 0,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    color: '#59332E',
                    fontSize: 12,
                    fontFamily: 'Courier New, monospace',
                    fontWeight: 900,
                    letterSpacing: 3,
                    marginBottom: 9,
                  }}
                >
                  AUTOMATION LEDGER / FORM 94-C
                </div>

                <div
                  style={{
                    color: '#23211C',
                    fontSize: 25,
                    lineHeight: 1.06,
                    fontWeight: 900,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    paddingBottom: 13,
                    borderBottom: '3px double #AD8F3F',
                    textShadow: '1px 1px 0 #AD8F3F',
                  }}
                >
                  One Script.
                  <br />
                  Every System.
                </div>

                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 12,
                    marginTop: 12,
                  }}
                >
                  {ledgerLines.map((line) => {
                    const fill = spring({
                      frame: Math.max(0, frame - line.start),
                      fps,
                      config: {damping: 18, stiffness: 105, mass: 0.52},
                    });

                    return (
                      <div key={line.label}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 12,
                            fontFamily: 'Courier New, monospace',
                            fontSize: 10,
                            fontWeight: 900,
                            letterSpacing: 1,
                          }}
                        >
                          <span>{line.label}</span>
                          <span style={{color: '#59332E'}}>{line.value}</span>
                        </div>
                        <div
                          style={{
                            marginTop: 5,
                            height: 5,
                            backgroundColor: '#23211C',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              width: `${fill * 100}%`,
                              height: '100%',
                              backgroundColor: '#AD8F3F',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 10,
                    borderTop: '1px solid #AD8F3F',
                    color: '#59332E',
                    fontFamily: 'Courier New, monospace',
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: 1.5,
                  }}
                >
                  METHODICAL ROUTING · AUDITABLE EXECUTION · SEALED OUTPUT
                </div>
              </div>

              <div
                style={{
                  minWidth: 0,
                  position: 'relative',
                  borderLeft: '1px solid #AD8F3F',
                  paddingLeft: '5%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: 5,
                    fontFamily: 'Courier New, monospace',
                    color: '#59332E',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 900,
                      letterSpacing: 2,
                    }}
                  >
                    CONNECTION PLATE
                  </span>
                  <span style={{fontSize: 9, letterSpacing: 1}}>
                    REV. 03 / VERIFIED
                  </span>
                </div>

                <svg
                  viewBox="0 0 450 300"
                  style={{
                    width: '100%',
                    flex: 1,
                    minHeight: 0,
                    overflow: 'visible',
                  }}
                >
                  <rect
                    x="8"
                    y="8"
                    width="434"
                    height="284"
                    fill="#F1EAD8"
                    stroke="#AD8F3F"
                    strokeWidth="2"
                  />

                  {[58, 106, 154, 202, 250].map((y) => (
                    <line
                      key={y}
                      x1="18"
                      y1={y}
                      x2="432"
                      y2={y}
                      stroke="#AD8F3F"
                      strokeWidth="1"
                      opacity="0.35"
                    />
                  ))}

                  {nodes.map((node) => {
                    const nodeIn = spring({
                      frame: Math.max(0, frame - node.delay),
                      fps,
                      config: {damping: 11, stiffness: 155, mass: 0.45},
                    });

                    return (
                      <g
                        key={node.label}
                        transform={`translate(${node.x} ${node.y}) scale(${nodeIn})`}
                        opacity={nodeIn}
                      >
                        <circle
                          r="44"
                          fill="#1D4D3B"
                          stroke="#AD8F3F"
                          strokeWidth="5"
                        />
                        <circle
                          r="34"
                          fill="#1D4D3B"
                          stroke="#F1EAD8"
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y="-3"
                          textAnchor="middle"
                          fill="#F1EAD8"
                          fontFamily="Georgia, serif"
                          fontSize="13"
                          fontWeight="900"
                          letterSpacing="1"
                        >
                          {node.label}
                        </text>
                        <text
                          x="0"
                          y="15"
                          textAnchor="middle"
                          fill="#AD8F3F"
                          fontFamily="Courier New, monospace"
                          fontSize="10"
                          fontWeight="900"
                        >
                          {node.code}
                        </text>
                      </g>
                    );
                  })}

                  {[
                    [164, 78, 286, 78],
                    [120, 122, 120, 178],
                    [330, 122, 330, 178],
                    [164, 222, 286, 222],
                    [152, 108, 298, 192],
                    [298, 108, 152, 192],
                  ].map(([x1, y1, x2, y2], index) => {
                    const pathProgress = spring({
                      frame: Math.max(0, frame - 30 - index * 3),
                      fps,
                      config: {damping: 18, stiffness: 100, mass: 0.55},
                    });
                    const length = 230;

                    return (
                      <line
                        key={`${x1}-${y1}-${index}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={index > 3 ? '#59332E' : '#AD8F3F'}
                        strokeWidth={index > 3 ? 3 : 5}
                        strokeDasharray={length}
                        strokeDashoffset={length * (1 - pathProgress)}
                      />
                    );
                  })}

                  <g
                    transform={`translate(225 150) scale(${diagramReveal})`}
                    opacity={diagramReveal}
                  >
                    <circle
                      r="38"
                      fill="#59332E"
                      stroke="#23211C"
                      strokeWidth="5"
                    />
                    <circle
                      r="28"
                      fill="#59332E"
                      stroke="#AD8F3F"
                      strokeWidth="2"
                    />
                    <path
                      d="M-13 0 L-4 10 L15 -13"
                      fill="none"
                      stroke="#F1EAD8"
                      strokeWidth="7"
                      strokeLinecap="square"
                      strokeLinejoin="miter"
                    />
                  </g>
                </svg>

                <div
                  style={{
                    height: 58,
                    flexShrink: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '2px solid #AD8F3F',
                    fontFamily: 'Courier New, monospace',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: 9,
                        color: '#59332E',
                        fontWeight: 900,
                        letterSpacing: 2,
                      }}
                    >
                      ACTIVATION CODE
                    </div>
                    <div
                      style={{
                        fontSize: 17,
                        fontWeight: 900,
                        letterSpacing: 4,
                        color: '#23211C',
                      }}
                    >
                      LINK-94-03
                    </div>
                  </div>

                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: '50%',
                      backgroundColor: '#59332E',
                      border: '4px double #AD8F3F',
                      display: 'grid',
                      placeItems: 'center',
                      transform: `scale(${sealReveal}) rotate(${
                        (1 - sealReveal) * -24
                      }deg)`,
                      boxShadow: '3px 3px 0 #23211C',
                    }}
                  >
                    <div
                      style={{
                        color: '#F1EAD8',
                        fontSize: 9,
                        fontWeight: 900,
                        letterSpacing: 1,
                        textAlign: 'center',
                        lineHeight: 1.05,
                      }}
                    >
                      VAULT
                      <br />
                      SEALED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer
          style={{
            minHeight: 54,
            height: '7%',
            padding: '0 3.5%',
            backgroundColor: '#23211C',
            borderTop: '3px solid #AD8F3F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'Courier New, monospace',
          }}
        >
          <span
            style={{
              color: '#AD8F3F',
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 3,
            }}
          >
            CHRON_STYLE_94 · LEDGER & BRASS
          </span>
          <span
            style={{
              color: '#F1EAD8',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            DISPARATE TOOLS / STRUCTURED INTO ONE AUTOMATION
          </span>
          <span
            style={{
              color: '#AD8F3F',
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            ENTRY 003
          </span>
        </footer>
      </div>
    </AbsoluteFill>
  );
}