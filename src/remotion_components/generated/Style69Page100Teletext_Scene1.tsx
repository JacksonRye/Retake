import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style69Page100Teletext_Scene1() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // ------------------------------------------
  // Beat 1: entrance / redraw / page roll
  // ------------------------------------------
  const entrance = spring({
    frame,
    fps,
    config: {damping: 11, stiffness: 210, mass: 0.62},
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {damping: 12, stiffness: 240, mass: 0.55},
  });

  const boardRows = 11;
  const rowRevealProgress = interpolate(frame, [0, 30], [0, boardRows], clamp);

  const pageRollValue = Math.round(
    interpolate(frame, [0, 18, 28], [0, 148, 100], clamp)
  );
  const pageText = String(pageRollValue).padStart(3, '0');

  // ------------------------------------------
  // Beat 2: rolling earnings counter + flash tag
  // ------------------------------------------
  const counterProgress = interpolate(frame, [30, 84], [0, 1], clamp);
  const countRaw = Math.round(counterProgress * 10000);
  const countDigits = String(countRaw).padStart(5, '0').split('');

  const tagVisible = frame >= 45;
  const tagFlash = frame % 10 < 5 ? 1 : 0.55;

  const thunkWindow = frame >= 48 && frame <= 55;
  const cardThunk = thunkWindow ? 10 : 0;
  const baseShadow = thunkWindow ? 8 : 18;

  // ------------------------------------------
  // Beat 3: living teletext loop
  // ------------------------------------------
  const hoverY = Math.sin(frame * 0.12) * 8;
  const hoverTilt = Math.sin(frame * 0.08) * 2.1;
  const shadowPulse = baseShadow + Math.sin(frame * 0.18) * 4;
  const headerMicroRoll = Math.sin(frame * 0.22) * 1.5;
  const cursorBlinkOn = frame % 20 < 10;
  const shimmerOffset = interpolate((frame + 12) % 70, [0, 70], [-500, 950], clamp);
  const wobble = frame > 84 ? Math.sin(frame * 0.26) * 0.9 : 0;

  // ------------------------------------------
  // Exit
  // ------------------------------------------
  const exitSlide = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames - 1],
    [0, -50],
    clamp
  );
  const opacity = interpolate(
    frame,
    [0, 4, durationInFrames - 8, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp
  );

  const teleFont =
    '"Courier New", "Lucida Console", Monaco, Menlo, Consolas, monospace';

  const rows = [
    {label: 'EARNINGS BOARD', color: '#00FFFF'},
    {label: 'MONTHLY RUN RATE', color: '#FFFF00'},
    {label: 'AUTO DELIVERY ON', color: '#00FF00'},
    {label: 'SYSTEM STATUS LIVE', color: '#00FFFF'},
    {label: 'REV SHARE ACTIVE', color: '#00FF00'},
    {label: 'SCALING CHANNELS OK', color: '#00FFFF'},
    {label: 'MARGIN PROFILE HIGH', color: '#FFFF00'},
    {label: 'CLIENT LOAD STABLE', color: '#00FF00'},
    {label: 'RETENTION SIGNAL UP', color: '#00FFFF'},
    {label: 'BOARD MODE PAGE 100', color: '#FFFF00'},
    {label: 'READY FOR SCALE ▉', color: '#00FF00'},
  ];

  const mosaicBlock = (color: string, width = 20, height = 20) => (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        boxShadow: `0 0 0 2px #000000 inset`,
      }}
    />
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        opacity,
        fontFamily: teleFont,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '94%',
          maxWidth: 980,
          height: '86%',
          padding: '68px 18px 64px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: `translateY(${exitSlide}px)`,
        }}
      >
        {/* Tier 1 */}
        <div
          style={{
            transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
            backgroundColor: '#FFFF00',
            border: '4px solid #FF0000',
            borderRadius: 6,
            padding: '10px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div style={{display: 'flex', gap: 4}}>
            {mosaicBlock('#00FFFF', 14, 14)}
            {mosaicBlock('#00FF00', 14, 14)}
            {mosaicBlock('#FF0000', 14, 14)}
          </div>
          <div
            style={{
              color: '#000000',
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            TELETEXT EARNINGS
          </div>
        </div>

        {/* Tier 2 */}
        <div
          style={{
            width: '100%',
            flex: 1,
            margin: '24px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transform: `scale(${entrance}) translateY(${hoverY + cardThunk}px) rotate(${hoverTilt + wobble}deg)`,
          }}
        >
          <div
            style={{
              width: '100%',
              minHeight: 560,
              border: '6px solid #FF0000',
              borderRadius: 10,
              backgroundColor: '#000000',
              boxShadow: `${shadowPulse}px ${shadowPulse}px 0px rgba(255,0,0,0.95)`,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* shimmer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 90,
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.0), rgba(0,255,255,0.18), rgba(255,255,255,0.0))',
                transform: `translateX(${shimmerOffset}px) skewX(-14deg)`,
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Header */}
            <div
              style={{
                backgroundColor: '#FFFF00',
                minHeight: 116,
                borderBottom: '5px solid #FF0000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                boxSizing: 'border-box',
                position: 'relative',
                zIndex: 3,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 18px)', gap: 3}}>
                  {mosaicBlock('#00FFFF', 18, 18)}
                  {mosaicBlock('#00FF00', 18, 18)}
                  {mosaicBlock('#00FF00', 18, 18)}
                  {mosaicBlock('#00FFFF', 18, 18)}
                </div>
                <div
                  style={{
                    color: '#000000',
                    fontSize: 62,
                    fontWeight: 900,
                    lineHeight: 0.9,
                    letterSpacing: -2,
                    textTransform: 'uppercase',
                    transform: `translateY(${headerMicroRoll}px)`,
                  }}
                >
                  PAGE
                </div>
              </div>

              <div
                style={{
                  color: '#000000',
                  fontSize: 78,
                  fontWeight: 900,
                  lineHeight: 0.9,
                  letterSpacing: -4,
                  minWidth: 190,
                  textAlign: 'right',
                  transform: `translateY(${-headerMicroRoll}px)`,
                }}
              >
                {pageText}
              </div>
            </div>

            {/* Body */}
            <div
              style={{
                flex: 1,
                padding: '18px 24px 24px',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                position: 'relative',
                zIndex: 3,
              }}
            >
              {rows.map((row, i) => {
                const visible = rowRevealProgress > i;
                const rowScale = spring({
                  frame: frame - i * 2,
                  fps,
                  config: {damping: 12, stiffness: 230, mass: 0.55},
                });

                return (
                  <div
                    key={i}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: `scaleY(${visible ? rowScale : 0.2})`,
                      transformOrigin: 'top center',
                      height: 42,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '2px solid rgba(0,255,255,0.35)',
                      paddingBottom: 4,
                      boxSizing: 'border-box',
                    }}
                  >
                    <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
                      <div style={{display: 'flex', gap: 2}}>
                        {mosaicBlock(row.color, 12, 12)}
                        {mosaicBlock(row.color, 12, 12)}
                        {mosaicBlock('#000000', 12, 12)}
                      </div>
                      <div
                        style={{
                          color: row.color,
                          fontSize: 24,
                          fontWeight: 800,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                        }}
                      >
                        {row.label}
                      </div>
                    </div>
                    <div
                      style={{
                        color: cursorBlinkOn && i === rows.length - 1 ? '#00FF00' : row.color,
                        fontSize: 24,
                        fontWeight: 800,
                      }}
                    >
                      {i < 8 ? 'OK' : cursorBlinkOn ? '▉' : ' '}
                    </div>
                  </div>
                );
              })}

              {/* Massive Counter Block */}
              <div
                style={{
                  marginTop: 14,
                  border: '4px solid #00FFFF',
                  backgroundColor: '#000000',
                  minHeight: 200,
                  padding: '22px 18px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 18,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    color: '#00FFFF',
                    fontSize: 28,
                    fontWeight: 900,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                  }}
                >
                  RUN RATE
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: 8,
                    flexWrap: 'nowrap',
                  }}
                >
                  <div
                    style={{
                      color: '#FFFF00',
                      fontSize: 78,
                      fontWeight: 900,
                      lineHeight: 0.9,
                    }}
                  >
                    £
                  </div>

                  {countDigits.map((digit, idx) => {
                    const digitStart = 34 + idx * 4;
                    const digitProgress = interpolate(
                      frame,
                      [digitStart, digitStart + 18],
                      [0, Number(digit)],
                      clamp
                    );
                    const rollingDigit = Math.round(digitProgress);

                    return (
                      <div
                        key={idx}
                        style={{
                          width: 86,
                          height: 96,
                          border: '3px solid #FFFF00',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          position: 'relative',
                          backgroundColor: '#000000',
                        }}
                      >
                        <div
                          style={{
                            color: '#FFFF00',
                            fontSize: 82,
                            fontWeight: 900,
                            lineHeight: 0.9,
                            transform: `translateY(${Math.sin((frame + idx * 3) * 0.5) * (frame >= digitStart ? 2 : 12)}px)`,
                          }}
                        >
                          {rollingDigit}
                        </div>
                      </div>
                    );
                  })}

                  <div
                    style={{
                      color: '#00FF00',
                      fontSize: 72,
                      fontWeight: 900,
                      lineHeight: 0.9,
                      marginLeft: 10,
                    }}
                  >
                    /MO
                  </div>
                </div>

                {tagVisible && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 18,
                      top: 18,
                      backgroundColor: '#FF0000',
                      border: '3px solid #FFFF00',
                      padding: '8px 16px',
                      opacity: tagFlash,
                      transform: `scale(${spring({
                        frame: frame - 45,
                        fps,
                        config: {damping: 10, stiffness: 240, mass: 0.5},
                      })})`,
                    }}
                  >
                    <div
                      style={{
                        color: '#FFFF00',
                        fontSize: 28,
                        fontWeight: 900,
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                      }}
                    >
                      3 MODELS
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer cursor / status line */}
            <div
              style={{
                minHeight: 58,
                borderTop: '4px solid #FF0000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px',
                boxSizing: 'border-box',
                backgroundColor: '#000000',
                zIndex: 3,
              }}
            >
              <div
                style={{
                  color: '#00FFFF',
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
              >
                HOLD
              </div>
              <div
                style={{
                  color: cursorBlinkOn ? '#00FF00' : '#000000',
                  backgroundColor: cursorBlinkOn ? '#00FF00' : 'transparent',
                  fontSize: 24,
                  fontWeight: 900,
                  minWidth: 22,
                  textAlign: 'center',
                }}
              >
                ▉
              </div>
              <div
                style={{
                  color: '#FFFF00',
                  fontSize: 24,
                  fontWeight: 800,
                }}
              >
                P100
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3 */}
        <div
          style={{
            transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
            backgroundColor: '#00FFFF',
            border: '4px solid #FF0000',
            borderRadius: 6,
            padding: '16px 32px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#000000',
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            BIG BOARD. CLEAR MONEY.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}