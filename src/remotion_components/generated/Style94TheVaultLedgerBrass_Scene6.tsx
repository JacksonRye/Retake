import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style94TheVaultLedgerBrass_Scene6() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const palette = {
    background: '#1D4D3B',
    paper: '#F1EAD8',
    brass: '#AD8F3F',
    alert: '#59332E',
    ink: '#23211C',
  };

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const entrance = spring({
    frame,
    fps,
    config: {damping: 15, stiffness: 125, mass: 0.75},
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [1, 0],
    clamp,
  );

  const sceneOpacity =
    interpolate(frame, [0, 8], [0, 1], clamp) * exitOpacity;

  const closeProgress = spring({
    frame: frame - 27,
    fps,
    config: {damping: 14, stiffness: 105, mass: 0.85},
  });

  const lockArrival = spring({
    frame: frame - 45,
    fps,
    config: {damping: 10, stiffness: 155, mass: 0.58},
  });

  const pathArrival = spring({
    frame: frame - 63,
    fps,
    config: {damping: 14, stiffness: 100, mass: 0.8},
  });

  const sealArrival = spring({
    frame: frame - 68,
    fps,
    config: {damping: 11, stiffness: 130, mass: 0.6},
  });

  const ledgerFill = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 100], clamp);

  const dialRotation = interpolate(
    frame,
    [47, 58, 65, 72],
    [-210, 125, 80, 94],
    clamp,
  );

  const dialPulse = interpolate(
    frame,
    [70, 74, 79],
    [1, 1.055, 1],
    clamp,
  );

  const clickOne = interpolate(frame, [57, 59, 61], [0.25, 1, 0.25], clamp);
  const clickTwo = interpolate(frame, [64, 66, 68], [0.25, 1, 0.25], clamp);
  const clickThree = interpolate(frame, [71, 73, 76], [0.25, 1, 0.25], clamp);

  const embossSweep = interpolate(frame, [66, 83], [-80, 115], clamp);
  const bookLift = interpolate(closeProgress, [0, 1], [20, -2], clamp);
  const rightPageRotation = interpolate(closeProgress, [0, 1], [0, -178], clamp);
  const bookScale = interpolate(closeProgress, [0, 1], [1, 0.92], clamp);
  const pathDraw = interpolate(pathArrival, [0, 1], [100, 0], clamp);

  const ticks = Array.from({length: 24});
  const rows = [
    {label: 'ORIGINS', code: '01—1843', start: 8},
    {label: 'SYSTEMS', code: '02—1956', start: 13},
    {label: 'LOGIC', code: '03—1972', start: 18},
    {label: 'NETWORKS', code: '04—1989', start: 23},
    {label: 'FOUNDATIONS', code: '05—2026', start: 28},
  ];

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
          opacity: 0.16,
          backgroundImage: `repeating-linear-gradient(
            0deg,
            ${palette.ink} 0px,
            ${palette.ink} 1px,
            ${palette.background} 1px,
            ${palette.background} 8px
          )`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '76%',
          height: '76%',
          border: `1px solid ${palette.brass}`,
          borderRadius: '50%',
          opacity: 0.12,
          transform: `scale(${0.82 + entrance * 0.18})`,
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '92%',
          height: '88%',
          boxSizing: 'border-box',
          padding: '34px 42px 30px',
          border: `2px solid ${palette.brass}`,
          outline: `1px solid ${palette.ink}`,
          outlineOffset: '-10px',
          borderRadius: 26,
          backgroundColor: palette.background,
          boxShadow: `0 28px 0 ${palette.ink}`,
          display: 'flex',
          flexDirection: 'column',
          transform: `translateY(${interpolate(
            entrance,
            [0, 1],
            [60, 0],
            clamp,
          )}px) scale(${0.94 + entrance * 0.06})`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            minHeight: 78,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `2px solid ${palette.brass}`,
            paddingBottom: 19,
            color: palette.paper,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
            <div
              style={{
                width: 48,
                height: 48,
                border: `2px solid ${palette.brass}`,
                transform: 'rotate(45deg)',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: palette.brass,
                  transform: 'rotate(-45deg)',
                }}
              />
            </div>

            <div>
              <div
                style={{
                  color: palette.brass,
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 5,
                  marginBottom: 5,
                }}
              >
                THE VAULT · RECORD VI
              </div>
              <div
                style={{
                  fontSize: 29,
                  fontWeight: 900,
                  letterSpacing: 3,
                  lineHeight: 1,
                }}
              >
                FOUNDATION LEDGER
              </div>
            </div>
          </div>

          <div style={{textAlign: 'right'}}>
            <div
              style={{
                color: palette.brass,
                fontFamily: 'Courier New, monospace',
                fontWeight: 800,
                fontSize: 14,
                letterSpacing: 3,
              }}
            >
              SERIAL 94—006
            </div>
            <div
              style={{
                marginTop: 7,
                color: palette.paper,
                fontFamily: 'Courier New, monospace',
                fontSize: 12,
                letterSpacing: 2,
              }}
            >
              ARCHIVE STATUS / VERIFIED
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
          <svg
            viewBox="0 0 1600 620"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: '5% 0 0',
              width: '100%',
              height: '90%',
              overflow: 'visible',
              opacity: interpolate(pathArrival, [0, 1], [0, 1], clamp),
            }}
          >
            <path
              d="M845 410 C1000 400 1045 330 1100 275 C1170 205 1270 245 1325 165 C1360 115 1410 94 1515 91"
              fill="none"
              stroke={palette.ink}
              strokeWidth="24"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M845 410 C1000 400 1045 330 1100 275 C1170 205 1270 245 1325 165 C1360 115 1410 94 1515 91"
              fill="none"
              stroke={palette.brass}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={pathDraw}
              pathLength="100"
            />
            <path
              d="M845 410 C1000 400 1045 330 1100 275 C1170 205 1270 245 1325 165 C1360 115 1410 94 1515 91"
              fill="none"
              stroke={palette.paper}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="1 13"
              strokeDashoffset={pathDraw}
              pathLength="100"
            />
            <path
              d="M1491 67 L1532 91 L1491 115"
              fill="none"
              stroke={palette.brass}
              strokeWidth="7"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
          </svg>

          <div
            style={{
              position: 'absolute',
              right: '2.5%',
              top: '10%',
              width: 250,
              opacity: interpolate(pathArrival, [0, 1], [0, 1], clamp),
              transform: `translateX(${interpolate(
                pathArrival,
                [0, 1],
                [40, 0],
                clamp,
              )}px)`,
            }}
          >
            <div
              style={{
                color: palette.brass,
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 4,
                marginBottom: 8,
              }}
            >
              NEXT PASSAGE
            </div>
            <div
              style={{
                color: palette.paper,
                fontSize: 30,
                fontWeight: 900,
                letterSpacing: 3,
                lineHeight: 1,
              }}
            >
              INTO AI
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              width: '76%',
              height: '76%',
              transform: `translateX(-7%) translateY(${bookLift}px) scale(${bookScale})`,
              transformStyle: 'preserve-3d',
              perspective: 1500,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: '8%',
                top: '8%',
                width: '84%',
                height: '84%',
                borderRadius: 14,
                backgroundColor: palette.alert,
                border: `5px solid ${palette.ink}`,
                boxShadow: `18px 22px 0 ${palette.ink}`,
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '9.5%',
                top: '10%',
                width: '41%',
                height: '79%',
                boxSizing: 'border-box',
                padding: '28px 30px',
                backgroundColor: palette.paper,
                border: `3px solid ${palette.ink}`,
                borderRadius: '10px 2px 2px 10px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  color: palette.alert,
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: 4,
                  borderBottom: `2px solid ${palette.brass}`,
                  paddingBottom: 12,
                  marginBottom: 18,
                }}
              >
                FOUNDATIONAL REGISTER
              </div>

              {rows.map((row, index) => (
                <div
                  key={row.label}
                  style={{
                    marginBottom: 15,
                    opacity: interpolate(
                      frame,
                      [row.start, row.start + 6],
                      [0, 1],
                      clamp,
                    ),
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: palette.ink,
                      fontFamily: 'Courier New, monospace',
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                    }}
                  >
                    <span>{row.label}</span>
                    <span>{row.code}</span>
                  </div>
                  <div
                    style={{
                      height: 3,
                      marginTop: 7,
                      backgroundColor: palette.brass,
                      width: `${ledgerFill(row.start, row.start + 11)}%`,
                    }}
                  />
                  <div
                    style={{
                      height: 1,
                      marginTop: 5,
                      backgroundColor: index === 4 ? palette.alert : palette.ink,
                      width: `${ledgerFill(row.start + 2, row.start + 14)}%`,
                      opacity: 0.55,
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '10%',
                width: '41%',
                height: '79%',
                transformOrigin: 'left center',
                transform: `rotateY(${rightPageRotation}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  boxSizing: 'border-box',
                  padding: '27px 30px',
                  backgroundColor: palette.paper,
                  border: `3px solid ${palette.ink}`,
                  borderRadius: '2px 10px 10px 2px',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div
                  style={{
                    color: palette.alert,
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 4,
                    marginTop: 24,
                  }}
                >
                  CERTIFICATE OF COMPLETION
                </div>

                <div
                  style={{
                    margin: '24px auto 18px',
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    border: `3px double ${palette.brass}`,
                    display: 'grid',
                    placeItems: 'center',
                    color: palette.brass,
                    fontSize: 39,
                    fontWeight: 900,
                  }}
                >
                  VI
                </div>

                <div
                  style={{
                    color: palette.ink,
                    textAlign: 'center',
                    fontSize: 20,
                    lineHeight: 1.35,
                    fontWeight: 900,
                    letterSpacing: 2,
                  }}
                >
                  HISTORY SECURED.
                  <br />
                  FOUNDATION PROVEN.
                </div>
              </div>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: palette.alert,
                  border: `5px solid ${palette.ink}`,
                  borderRadius: '10px 2px 2px 10px',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  display: 'grid',
                  placeItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 20,
                    border: `2px solid ${palette.brass}`,
                  }}
                />
                <div
                  style={{
                    color: palette.brass,
                    fontSize: 66,
                    fontWeight: 900,
                    letterSpacing: 8,
                  }}
                >
                  94
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                left: '49.4%',
                top: '11%',
                width: 10,
                height: '77%',
                backgroundColor: palette.brass,
                opacity: 0.72,
                transform: `scaleY(${interpolate(
                  closeProgress,
                  [0, 1],
                  [1, 0.2],
                  clamp,
                )})`,
              }}
            />

            <div
              style={{
                position: 'absolute',
                left: '45.3%',
                top: '29%',
                width: 150,
                height: 208,
                borderRadius: 20,
                border: `5px solid ${palette.ink}`,
                backgroundColor: palette.brass,
                boxShadow: `8px 10px 0 ${palette.ink}`,
                transform: `translateY(${interpolate(
                  lockArrival,
                  [0, 1],
                  [-120, 0],
                  clamp,
                )}px) scale(${lockArrival})`,
                opacity: interpolate(lockArrival, [0, 0.15, 1], [0, 1, 1], clamp),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: 86,
                  height: 78,
                  top: -65,
                  border: `15px solid ${palette.brass}`,
                  borderBottom: 0,
                  borderRadius: '48px 48px 0 0',
                  boxShadow: `0 0 0 5px ${palette.ink}`,
                }}
              />

              <div
                style={{
                  position: 'relative',
                  width: 112,
                  height: 112,
                  borderRadius: '50%',
                  backgroundColor: palette.ink,
                  border: `5px double ${palette.paper}`,
                  transform: `rotate(${dialRotation}deg) scale(${dialPulse})`,
                }}
              >
                {ticks.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: index % 3 === 0 ? 3 : 2,
                      height: index % 3 === 0 ? 13 : 8,
                      backgroundColor:
                        index % 3 === 0 ? palette.paper : palette.brass,
                      transformOrigin: `50% ${index % 3 === 0 ? 47 : 52}px`,
                      transform: `translate(-50%, -${
                        index % 3 === 0 ? 47 : 52
                      }px) rotate(${index * 15}deg)`,
                    }}
                  />
                ))}
                <div
                  style={{
                    position: 'absolute',
                    inset: 27,
                    borderRadius: '50%',
                    border: `3px solid ${palette.brass}`,
                    backgroundColor: palette.alert,
                    display: 'grid',
                    placeItems: 'center',
                    color: palette.paper,
                    fontFamily: 'Courier New, monospace',
                    fontSize: 17,
                    fontWeight: 900,
                    letterSpacing: 1,
                  }}
                >
                  94
                </div>
              </div>
            </div>

            <div
              style={{
                position: 'absolute',
                left: '60%',
                top: '24%',
                display: 'flex',
                gap: 7,
                opacity: interpolate(lockArrival, [0, 1], [0, 1], clamp),
              }}
            >
              {[clickOne, clickTwo, clickThree].map((value, index) => (
                <div
                  key={index}
                  style={{
                    width: 8,
                    height: 24 + index * 8,
                    backgroundColor: palette.brass,
                    opacity: value,
                    transform: `scaleY(${value})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            minHeight: 92,
            borderTop: `2px solid ${palette.brass}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: '16%',
              left: `${embossSweep}%`,
              background: `linear-gradient(90deg, ${palette.background}, ${palette.paper}, ${palette.background})`,
              opacity: 0.16,
              transform: 'skewX(-20deg)',
            }}
          />

          <div>
            <div
              style={{
                color: palette.brass,
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 4,
                marginBottom: 8,
              }}
            >
              VAULT CERTIFICATION
            </div>
            <div
              style={{
                color: palette.paper,
                fontSize: 24,
                fontWeight: 900,
                letterSpacing: 2.5,
              }}
            >
              MASTER THE PAST. UNLOCK WHAT COMES NEXT.
            </div>
          </div>

          <div
            style={{
              border: `2px solid ${palette.brass}`,
              padding: '13px 19px',
              backgroundColor: palette.ink,
              transform: `scale(${sealArrival})`,
              opacity: interpolate(sealArrival, [0, 0.15, 1], [0, 1, 1], clamp),
            }}
          >
            <div
              style={{
                color: palette.brass,
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: 3,
                marginBottom: 5,
              }}
            >
              ACTIVATION CODE
            </div>
            <div
              style={{
                color: palette.paper,
                fontFamily: 'Courier New, monospace',
                fontSize: 20,
                fontWeight: 900,
                letterSpacing: 5,
              }}
            >
              FND—94—AI
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}