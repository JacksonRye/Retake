import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style69Page100Teletext_Scene5() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // ------------------------------------------
  // Beat 1: Entrance
  // ------------------------------------------
  const boardEntrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 230, mass: 0.65 },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: { damping: 12, stiffness: 250, mass: 0.55 },
  });

  const formulaChars = '15% × £30000';
  const typedCount = Math.floor(interpolate(frame, [5, 28], [0, formulaChars.length], clamp));
  const typedFormula = formulaChars.slice(0, typedCount);

  // ------------------------------------------
  // Beat 2: Active Counter / Mechanical Roll
  // ------------------------------------------
  const counterProgress = interpolate(frame, [30, 78], [0, 1], clamp);
  const rolledValue = Math.round(counterProgress * 4500);

  const formatMoney = (n: number) => `£${n.toLocaleString('en-GB')}`;
  const resultText = formatMoney(rolledValue);

  const feeFlash =
    frame >= 40 ? (Math.floor((frame - 40) / 4) % 2 === 0 ? 1 : 0.25) : 0;

  const underlineGrow = spring({
    frame: frame - 52,
    fps,
    config: { damping: 10, stiffness: 220, mass: 0.6 },
  });

  const thunkActive = frame >= 50 && frame <= 56;
  const cardThunk = thunkActive ? 10 : 0;
  const baseShadow = thunkActive ? 7 : 18;

  // ------------------------------------------
  // Beat 3: Continuous Living Physics Loop
  // ------------------------------------------
  const hoverY = Math.sin(frame * 0.12) * 8;
  const hoverTilt = Math.sin(frame * 0.08) * 2.1;
  const shadowPulse = baseShadow + Math.sin(frame * 0.18) * 4;

  const shineOffset = interpolate((frame + 12) % 72, [0, 72], [-280, 960], clamp);
  const rowRefresh = Math.sin(frame * 0.45) * 0.06 + 0.94;

  const cursorBlink = frame % 18 < 9 ? 1 : 0;
  const pageRoll = 100 + Math.floor(interpolate(frame, [0, 24], [0, 5], clamp));

  // Exit
  const exitSlide = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames - 1],
    [0, -70],
    clamp
  );
  const exitOpacity = interpolate(
    frame,
    [0, 4, durationInFrames - 8, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp
  );
  const pageCutFlash = interpolate(
    frame,
    [durationInFrames - 4, durationInFrames - 1],
    [0, 1],
    clamp
  );

  const mosaicCell = (color: string) => ({
    width: 18,
    height: 18,
    backgroundColor: color,
    display: 'inline-block',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        opacity: exitOpacity,
        fontFamily:
          '"Courier New", "Lucida Console", Monaco, monospace',
        color: '#FFFF00',
      }}
    >
      <div
        style={{
          width: '94%',
          height: '86%',
          alignSelf: 'center',
          justifySelf: 'center',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '72px 10px 54px',
          boxSizing: 'border-box',
          transform: `translateY(${exitSlide}px)`,
        }}
      >
        {/* Tier 1 */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
              backgroundColor: '#FFFF00',
              color: '#000000',
              border: '5px solid #FF0000',
              boxShadow: '0 0 0 3px #000000, 8px 8px 0 #FF0000',
              borderRadius: 8,
              padding: '12px 26px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', gap: 4 }}>
              <span style={mosaicCell('#000000')} />
              <span style={mosaicCell('#00FFFF')} />
              <span style={mosaicCell('#000000')} />
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              PAGE {pageRoll} CALC
            </span>
          </div>
        </div>

        {/* Tier 2 */}
        <div
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '24px 0',
            transform: `scale(${boardEntrance}) translateY(${hoverY + cardThunk}px) rotate(${hoverTilt}deg)`,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              minHeight: 560,
              backgroundColor: '#000000',
              border: '8px solid #FF0000',
              boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #00FFFF`,
              borderRadius: 18,
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Teletext scan shimmer */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, rgba(0,0,0,0) 2px, rgba(0,0,0,0) 16px)',
                opacity: rowRefresh,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
            />

            {/* Traveling highlight sweep */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 120,
                backgroundColor: 'rgba(255,255,0,0.22)',
                transform: `translateX(${shineOffset}px) skewX(-18deg)`,
                pointerEvents: 'none',
              }}
            />

            {/* Header bar */}
            <div
              style={{
                backgroundColor: '#FFFF00',
                color: '#000000',
                minHeight: 108,
                padding: '18px 24px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '6px solid #FF0000',
              }}
            >
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 900,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                }}
              >
                TELETEXT FEE CALCULATOR
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  alignItems: 'center',
                }}
              >
                <span style={mosaicCell('#000000')} />
                <span style={mosaicCell('#00FF00')} />
                <span style={mosaicCell('#000000')} />
              </div>
            </div>

            {/* Main content */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 26,
                padding: '42px 34px 38px',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: '#00FFFF',
                  fontSize: 30,
                  fontWeight: 800,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                }}
              >
                RATE INPUT
              </div>

              <div
                style={{
                  minHeight: 116,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,0,0.08)',
                  border: '4px solid #00FFFF',
                  borderRadius: 10,
                  padding: '12px 20px',
                  boxSizing: 'border-box',
                }}
              >
                <div
                  style={{
                    color: '#FFFF00',
                    fontSize: 74,
                    fontWeight: 900,
                    lineHeight: 0.95,
                    letterSpacing: -2,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {typedFormula}
                  {frame < 32 && (
                    <span style={{ color: '#00FF00', opacity: cursorBlink }}>|</span>
                  )}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#FF0000',
                    color: '#FFFF00',
                    border: '4px solid #FFFF00',
                    borderRadius: 8,
                    padding: '10px 22px',
                    fontSize: 28,
                    fontWeight: 900,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                    opacity: feeFlash,
                    boxShadow: '0 0 0 2px #000000',
                  }}
                >
                  FEE
                </div>

                <div
                  style={{
                    color: '#00FF00',
                    fontSize: 28,
                    fontWeight: 900,
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                  }}
                >
                  RESULT
                </div>
              </div>

              <div
                style={{
                  minHeight: 160,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 18,
                }}
              >
                <div
                  style={{
                    color: '#FFFF00',
                    fontSize: 88,
                    fontWeight: 900,
                    lineHeight: 0.92,
                    letterSpacing: -3,
                    textShadow:
                      frame >= 78
                        ? `${Math.sin(frame * 0.22) * 2}px 0 0 #00FFFF`
                        : 'none',
                  }}
                >
                  {resultText}
                  {frame >= 78 && (
                    <span style={{ color: '#00FF00', opacity: cursorBlink }}>|</span>
                  )}
                </div>

                <div
                  style={{
                    width: `${underlineGrow * 82}%`,
                    maxWidth: 640,
                    height: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 4,
                    overflow: 'hidden',
                  }}
                >
                  {Array.from({ length: 22 }).map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: i % 2 === 0 ? '#FF0000' : '#00FFFF',
                        border: '2px solid #000000',
                        boxSizing: 'border-box',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3 */}
        <div
          style={{
            transform: `scale(${boardEntrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
            backgroundColor: '#00FFFF',
            color: '#000000',
            border: '4px solid #FF0000',
            borderRadius: 8,
            padding: '16px 30px',
            boxShadow: '8px 8px 0 #FFFF00',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            15% OF £30,000 = £4,500
          </div>
        </div>
      </div>

      {/* End page-cut flash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#FFFFFF',
          opacity: pageCutFlash * 0.9,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
}