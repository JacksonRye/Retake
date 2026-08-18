import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_63() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: Snappy entrance
  const boardIn = spring({
    frame,
    fps,
    config: {damping: 12, stiffness: 220, mass: 0.62},
  });

  const badgeIn = spring({
    frame: frame - 4,
    fps,
    config: {damping: 11, stiffness: 240, mass: 0.55},
  });

  const bottomIn = spring({
    frame: frame - 8,
    fps,
    config: {damping: 12, stiffness: 210, mass: 0.62},
  });

  // Beat 2: Active state switch / gate roll / arrow glide
  const gateValue = Math.round(interpolate(frame, [16, 50], [12, 50], clamp));
  const gateDisplay = gateValue.toString().padStart(2, '0');

  const metricReveal = interpolate(frame, [24, 42], [0, 1], clamp);
  const commissionOpacity = interpolate(frame, [22, 30], [0, 1], clamp);

  const leftArrowX = interpolate(frame, [18, 38], [-120, 0], clamp);
  const rightArrowX = interpolate(frame, [22, 42], [120, 0], clamp);

  const swapFlash = interpolate(frame, [28, 32, 36], [0, 1, 0], clamp);

  // Beat 3: Living hover + shine
  const hoverY = Math.sin(frame * 0.12) * 8;
  const hoverTilt = Math.sin(frame * 0.08) * 2.0;
  const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
  const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-420, 920], clamp);

  const badgeFloat = Math.sin(frame * 0.1) * 3;
  const footerFloat = Math.sin(frame * 0.12 + 1.2) * 3;

  const exitY = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames - 1],
    [0, -60],
    clamp
  );

  const opacity = interpolate(
    frame,
    [0, 5, durationInFrames - 8, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp
  );

  const flapTopScale = interpolate(frame, [20, 27, 34], [1, 0.08, 1], clamp);
  const flapBottomScale = interpolate(frame, [20, 27, 34], [0.08, 1, 1], clamp);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#212121',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
        fontFamily:
          '"DIN Condensed", "DIN Alternate", "Roboto Condensed", "Arial Narrow", Arial, sans-serif',
      }}
    >
      <div
        style={{
          width: '94%',
          maxWidth: 980,
          height: '88%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '60px 18px',
          boxSizing: 'border-box',
          transform: `translateY(${exitY}px)`,
        }}
      >
        {/* Tier 1 */}
        <div
          style={{
            transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
            backgroundColor: '#39414B',
            border: '3px solid #FFD500',
            borderRadius: 14,
            padding: '12px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
          }}
        >
          <span
            style={{
              color: '#00A36C',
              fontSize: 22,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: 1,
            }}
          >
            →→
          </span>
          <span
            style={{
              color: '#FFFFFF',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            TERMINAL SIGNAL
          </span>
          <span
            style={{
              color: '#FFD500',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            G-{gateDisplay}
          </span>
        </div>

        {/* Tier 2 */}
        <div
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            margin: '24px 0',
            transform: `scale(${boardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
          }}
        >
          <div
            style={{
              width: '100%',
              minHeight: 540,
              backgroundColor: '#39414B',
              border: '4px solid #FFD500',
              borderRadius: 30,
              boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.55)`,
              position: 'relative',
              overflow: 'hidden',
              padding: '40px 36px 34px 36px',
              boxSizing: 'border-box',
              display: 'grid',
              gridTemplateRows: '88px 1fr 146px',
              gap: 26,
            }}
          >
            {/* Shine */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 140,
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0))',
                transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                pointerEvents: 'none',
              }}
            />

            {/* Header strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '160px 1fr 160px',
                alignItems: 'center',
                gap: 18,
                zIndex: 2,
              }}
            >
              <div
                style={{
                  height: 68,
                  borderRadius: 16,
                  backgroundColor: '#212121',
                  border: '2px solid #00A36C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00A36C',
                  fontSize: 26,
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                GATE {gateDisplay}
              </div>

              <div
                style={{
                  height: 68,
                  borderRadius: 16,
                  backgroundColor: '#212121',
                  border: '2px solid #FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                }}
              >
                BOARDING NOW
              </div>

              <div
                style={{
                  height: 68,
                  borderRadius: 16,
                  backgroundColor: '#212121',
                  border: '2px solid #FFD500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFD500',
                  fontSize: 28,
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                → EXIT
              </div>
            </div>

            {/* Main headline split-flap area */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 22,
                zIndex: 2,
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '92%',
                  maxWidth: 820,
                  height: 214,
                  backgroundColor: '#212121',
                  border: '3px solid #FFFFFF',
                  borderRadius: 20,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.05)',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    backgroundColor: '#212121',
                    borderBottom: '1px solid rgba(255,255,255,0.14)',
                    transformOrigin: 'bottom center',
                    transform: `scaleY(${flapTopScale})`,
                    opacity: frame < 20 ? 0 : 1,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: 0,
                    right: 0,
                    height: '50%',
                    backgroundColor: '#212121',
                    borderTop: '1px solid rgba(255,255,255,0.14)',
                    transformOrigin: 'top center',
                    transform: `scaleY(${flapBottomScale})`,
                    opacity: frame < 20 ? 0 : 1,
                  }}
                />
                <div
                  style={{
                    color: '#FFD500',
                    fontSize: 72,
                    fontWeight: 1000,
                    lineHeight: 1.02,
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    width: '88%',
                    zIndex: 3,
                  }}
                >
                  AUTOMATED
                  <br />
                  MARGINS
                </div>
              </div>

              {/* Arrows glide in beside metric box without crossing text */}
              <div
                style={{
                  width: '100%',
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr 120px',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    transform: `translateX(${leftArrowX}px)`,
                    opacity: metricReveal,
                  }}
                >
                  <div
                    style={{
                      color: '#00A36C',
                      fontSize: 54,
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: 2,
                    }}
                  >
                    →
                  </div>
                </div>

                <div
                  style={{
                    justifySelf: 'center',
                    width: '100%',
                    maxWidth: 640,
                    height: 116,
                    backgroundColor: '#212121',
                    border: '3px solid #FFD500',
                    borderRadius: 22,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: `rgba(255,255,255,${swapFlash * 0.12})`,
                      pointerEvents: 'none',
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      justifyContent: 'center',
                      gap: 18,
                      opacity: commissionOpacity,
                      transform: `scale(${0.92 + metricReveal * 0.08})`,
                    }}
                  >
                    <span
                      style={{
                        color: '#FFFFFF',
                        fontFamily:
                          '"SFMono-Regular", "Roboto Mono", "Menlo", monospace',
                        fontSize: 76,
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: -1,
                      }}
                    >
                      50%
                    </span>
                    <span
                      style={{
                        color: '#FFD500',
                        fontSize: 40,
                        fontWeight: 900,
                        lineHeight: 1,
                        letterSpacing: 3,
                        textTransform: 'uppercase',
                      }}
                    >
                      COMMISSION
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    transform: `translateX(${rightArrowX}px)`,
                    opacity: metricReveal,
                  }}
                >
                  <div
                    style={{
                      color: '#00A36C',
                      fontSize: 54,
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: 2,
                    }}
                  >
                    →
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom board strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 220px',
                gap: 20,
                alignItems: 'stretch',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  backgroundColor: '#212121',
                  border: '2px solid #00A36C',
                  borderRadius: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 20px',
                  color: '#FFFFFF',
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                  textAlign: 'center',
                }}
              >
                ROUTE LOCKED • PROFIT FLOW ACTIVE
              </div>

              <div
                style={{
                  backgroundColor: '#FFD500',
                  borderRadius: 18,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#212121',
                  fontSize: 34,
                  fontWeight: 1000,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                }}
              >
                PLATFORM
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3 */}
        <div
          style={{
            transform: `scale(${bottomIn}) translateY(${footerFloat}px)`,
            backgroundColor: '#00A36C',
            borderRadius: 18,
            padding: '16px 34px',
            boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
            }}
          >
            PURE SOFTWARE LEVERAGE
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}