import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style94TheVaultLedgerBrass_Scene5() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, mass: 0.65, stiffness: 110},
  });

  const certificateSpring = spring({
    frame: frame - 15,
    fps,
    config: {damping: 13, mass: 0.72, stiffness: 105},
  });

  const exitOpacity = interpolate(
    frame,
    [0, 8, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  const panelY = interpolate(entrance, [0, 1], [70, 0], clamp);
  const panelScale = interpolate(entrance, [0, 1], [0.94, 1], clamp);

  const dialRotation = interpolate(
    frame,
    [0, 13, 28, 40, 52],
    [-150, 120, -58, 48, 0],
    clamp,
  );

  const dialScale = interpolate(
    spring({
      frame: frame - 3,
      fps,
      config: {damping: 12, mass: 0.5, stiffness: 130},
    }),
    [0, 1],
    [0.75, 1],
    clamp,
  );

  const certificateOpacity = interpolate(frame, [12, 23], [0, 1], clamp);
  const certificateY = interpolate(certificateSpring, [0, 1], [52, 0], clamp);
  const certificateScale = interpolate(certificateSpring, [0, 1], [0.88, 1], clamp);

  const spotlightOpacity = interpolate(
    frame,
    [9, 25, 68, 82],
    [0, 0.24, 0.24, 0],
    clamp,
  );

  const embossSweep = interpolate(frame, [28, 68], [-120, 120], clamp);

  const sealPulse = 1 + Math.sin(Math.max(0, frame - 45) * 0.23) * 0.025;
  const serialReveal = interpolate(frame, [47, 66], [0, 1], clamp);

  const clickFrames = [24, 34, 44];
  const activeClick = clickFrames.reduce((strongest, clickFrame) => {
    const distance = Math.abs(frame - clickFrame);
    return Math.max(strongest, interpolate(distance, [0, 3], [1, 0], clamp));
  }, 0);

  const ledgerRows = [
    {label: 'SYSTEMS', value: '01', start: 43},
    {label: 'NETWORKING', value: '02', start: 48},
    {label: 'AUTOMATION', value: '03', start: 53},
    {label: 'OBSERVABILITY', value: '04', start: 58},
  ];

  const tickMarks = Array.from({length: 24}, (_, index) => index);
  const rivets = [
    {left: 18, top: 18},
    {right: 18, top: 18},
    {left: 18, bottom: 18},
    {right: 18, bottom: 18},
  ];

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
          width: '52%',
          height: '118%',
          left: '24%',
          top: '-9%',
          backgroundColor: '#F1EAD8',
          opacity: spotlightOpacity,
          filter: 'blur(95px)',
          borderRadius: '50%',
          transform: `scaleX(${0.75 + entrance * 0.25})`,
        }}
      />

      <div
        style={{
          width: '92%',
          height: '88%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: '3.2%',
          overflow: 'hidden',
          backgroundColor: '#1D4D3B',
          border: '3px solid #AD8F3F',
          boxShadow: '0 30px 80px #23211C, inset 0 0 0 8px #23211C',
          transform: `translateY(${panelY}px) scale(${panelScale})`,
        }}
      >
        {rivets.map((position, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              ...position,
              width: 13,
              height: 13,
              borderRadius: '50%',
              backgroundColor: '#AD8F3F',
              border: '2px solid #23211C',
              boxShadow: 'inset 2px 2px 0 #F1EAD8',
            }}
          />
        ))}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 18,
            borderBottom: '2px solid #AD8F3F',
            flexShrink: 0,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                padding: '8px 15px',
                color: '#23211C',
                backgroundColor: '#AD8F3F',
                border: '2px solid #F1EAD8',
                fontFamily: 'Arial Narrow, Arial, sans-serif',
                fontWeight: 900,
                fontSize: 13,
                letterSpacing: 2.8,
                textTransform: 'uppercase',
              }}
            >
              The Vault
            </div>
            <div
              style={{
                color: '#F1EAD8',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 3.5,
                textTransform: 'uppercase',
              }}
            >
              Foundational Registry
            </div>
          </div>

          <div
            style={{
              color: activeClick > 0.05 ? '#F1EAD8' : '#AD8F3F',
              fontFamily: 'Courier New, monospace',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 2,
              transform: `scale(${1 + activeClick * 0.12})`,
            }}
          >
            {activeClick > 0.05 ? 'TUMBLER • CLICK' : 'VAULT 94 • LEDGER 05'}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '27% 1fr',
            gap: '3%',
            alignItems: 'center',
            padding: '2.5% 0',
          }}
        >
          <div
            style={{
              height: '100%',
              minHeight: 0,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid #AD8F3F',
            }}
          >
            <div
              style={{
                width: 'min(23vw, 310px)',
                aspectRatio: '1',
                maxHeight: '94%',
                position: 'relative',
                borderRadius: '50%',
                backgroundColor: '#23211C',
                border: '8px solid #AD8F3F',
                boxShadow: '0 18px 35px #23211C, inset 0 0 0 8px #1D4D3B',
                transform: `scale(${dialScale}) rotate(${dialRotation}deg)`,
              }}
            >
              {tickMarks.map((tick) => (
                <div
                  key={tick}
                  style={{
                    position: 'absolute',
                    left: '49%',
                    top: '3%',
                    width: tick % 3 === 0 ? 4 : 2,
                    height: tick % 3 === 0 ? 18 : 11,
                    backgroundColor: tick % 3 === 0 ? '#F1EAD8' : '#AD8F3F',
                    transformOrigin: '50% 840%',
                    transform: `rotate(${tick * 15}deg)`,
                  }}
                />
              ))}

              <div
                style={{
                  position: 'absolute',
                  inset: '25%',
                  borderRadius: '50%',
                  backgroundColor: '#1D4D3B',
                  border: '5px solid #AD8F3F',
                  boxShadow: 'inset 0 0 0 5px #23211C',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  left: '46%',
                  top: '18%',
                  width: '8%',
                  height: '64%',
                  borderRadius: 8,
                  backgroundColor: '#AD8F3F',
                  border: '3px solid #23211C',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: '18%',
                  top: '46%',
                  width: '64%',
                  height: '8%',
                  borderRadius: 8,
                  backgroundColor: '#AD8F3F',
                  border: '3px solid #23211C',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: '40%',
                  borderRadius: '50%',
                  backgroundColor: '#F1EAD8',
                  border: '4px solid #23211C',
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: 6,
                color: '#AD8F3F',
                fontFamily: 'Courier New, monospace',
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: 2.4,
                textTransform: 'uppercase',
              }}
            >
              Three tumblers verified
            </div>
          </div>

          <div
            style={{
              height: '100%',
              minHeight: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '92%',
                height: '88%',
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
                padding: '4.5% 6%',
                color: '#23211C',
                backgroundColor: '#F1EAD8',
                border: '5px double #AD8F3F',
                boxShadow: '14px 18px 0 #23211C, 0 0 45px #AD8F3F',
                opacity: certificateOpacity,
                transform: `translateY(${certificateY}px) scale(${certificateScale})`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 15,
                  right: 15,
                  bottom: 15,
                  left: 15,
                  border: '1px solid #AD8F3F',
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  top: '-20%',
                  bottom: '-20%',
                  left: `${embossSweep}%`,
                  width: '13%',
                  backgroundColor: '#F1EAD8',
                  opacity: 0.48,
                  filter: 'blur(13px)',
                  transform: 'skewX(-14deg)',
                  pointerEvents: 'none',
                }}
              />

              <div style={{textAlign: 'center', position: 'relative'}}>
                <div
                  style={{
                    color: '#59332E',
                    fontFamily: 'Arial Narrow, Arial, sans-serif',
                    fontWeight: 900,
                    fontSize: 12,
                    letterSpacing: 5,
                    textTransform: 'uppercase',
                  }}
                >
                  Certificate of Understanding
                </div>
                <div
                  style={{
                    width: '38%',
                    height: 2,
                    margin: '12px auto 0',
                    backgroundColor: '#AD8F3F',
                  }}
                />
              </div>

              <div style={{textAlign: 'center', position: 'relative'}}>
                <div
                  style={{
                    color: '#1D4D3B',
                    fontSize: 'clamp(34px, 4.5vw, 78px)',
                    lineHeight: 0.94,
                    fontWeight: 900,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    textShadow: '2px 2px 0 #AD8F3F',
                  }}
                >
                  Foundational
                  <br />
                  Elements
                </div>
                <div
                  style={{
                    marginTop: 16,
                    color: '#59332E',
                    fontSize: 'clamp(12px, 1.15vw, 20px)',
                    fontWeight: 700,
                    letterSpacing: 3.2,
                    textTransform: 'uppercase',
                  }}
                >
                  The required basis for DevOps success
                </div>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: 25,
                  alignItems: 'end',
                  position: 'relative',
                }}
              >
                <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                  {ledgerRows.map((row) => {
                    const progress = interpolate(
                      frame,
                      [row.start, row.start + 12],
                      [0, 1],
                      clamp,
                    );

                    return (
                      <div
                        key={row.label}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '120px 1fr 28px',
                          alignItems: 'center',
                          gap: 8,
                          fontFamily: 'Courier New, monospace',
                          fontSize: 11,
                          fontWeight: 800,
                          color: '#23211C',
                          letterSpacing: 1.1,
                        }}
                      >
                        <span>{row.label}</span>
                        <div
                          style={{
                            height: 2,
                            backgroundColor: '#AD8F3F',
                            transformOrigin: 'left center',
                            transform: `scaleX(${progress})`,
                          }}
                        />
                        <span>{row.value}</span>
                      </div>
                    );
                  })}
                </div>

                <div
                  style={{
                    width: 82,
                    height: 82,
                    borderRadius: '50%',
                    backgroundColor: '#59332E',
                    border: '5px double #AD8F3F',
                    color: '#F1EAD8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontFamily: 'Arial Narrow, Arial, sans-serif',
                    fontSize: 10,
                    lineHeight: 1.15,
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    transform: `scale(${sealPulse}) rotate(-7deg)`,
                    boxShadow: '3px 4px 0 #23211C',
                  }}
                >
                  Vault
                  <br />
                  Certified
                  <br />
                  94
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            minHeight: 42,
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '2px solid #AD8F3F',
            paddingTop: 14,
            color: '#F1EAD8',
          }}
        >
          <div
            style={{
              fontFamily: 'Arial Narrow, Arial, sans-serif',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 3.2,
              textTransform: 'uppercase',
            }}
          >
            Knowledge is the first security layer
          </div>

          <div
            style={{
              fontFamily: 'Courier New, monospace',
              color: '#AD8F3F',
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: 2,
              opacity: serialReveal,
            }}
          >
            ACTIVATION CODE • FND-DEVOPS-094-05
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}