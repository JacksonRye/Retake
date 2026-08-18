import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = {
  background: '#1A2026',
  primary: '#F4F4F4',
  secondary: '#FF8A3D',
  highlight: '#4DD0E1',
  muted: '#39414B',
};

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const MarkerLabel: React.FC<{
  children: React.ReactNode;
  color: string;
  opacity?: number;
  transform?: string;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({
  children,
  color,
  opacity = 1,
  transform,
  fontSize = 28,
  style,
}) => {
  return (
    <div
      style={{
        color,
        opacity,
        transform,
        fontFamily: '"Arial Narrow", "Roboto Condensed", Arial, sans-serif',
        fontSize,
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: 2,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default function Style56WarRoomGlassMarkeronWindow_Scene8() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 13,
      stiffness: 125,
      mass: 0.72,
    },
  });

  const exitOpacity = interpolate(
    frame,
    [0, 7, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  const panelY = interpolate(entrance, [0, 1], [42, 0], clamp);
  const panelScale = interpolate(entrance, [0, 1], [0.965, 1], clamp);

  const noCodeWrite = interpolate(frame, [7, 29], [0, 1], clamp);
  const noCodeFade = interpolate(frame, [39, 67], [1, 0.13], clamp);
  const noCodeBlur = interpolate(frame, [37, 67], [0, 5.5], clamp);
  const noCodeDrift = interpolate(frame, [41, 69], [0, -15], clamp);

  const smudgeProgress = interpolate(frame, [40, 62], [0, 1], clamp);
  const smudgeX = interpolate(smudgeProgress, [0, 1], [-22, 112], clamp);

  const codeFocus = interpolate(frame, [41, 67], [8, 0], clamp);
  const codeOpacity = interpolate(frame, [39, 55], [0, 1], clamp);
  const codeScaleSpring = spring({
    frame: Math.max(0, frame - 42),
    fps,
    config: {
      damping: 11,
      stiffness: 150,
      mass: 0.62,
    },
  });
  const codeScale = interpolate(codeScaleSpring, [0, 1], [0.92, 1], clamp);

  const arrowDraw = interpolate(frame, [42, 61], [1, 0], clamp);
  const circleDraw = interpolate(frame, [52, 71], [1, 0], clamp);

  const glareX = interpolate(frame, [13, 68], [-42, 145], clamp);
  const markerJitter = Math.sin(frame * 1.85) * 0.65;
  const pulse = 1 + Math.sin(frame * 0.24) * 0.018;

  const statusProgress = interpolate(frame, [52, 77], [0, 1], clamp);
  const codeLines = [
    {text: 'API-FIRST CORE', start: 42, number: '01'},
    {text: 'VERSIONED LOGIC', start: 48, number: '02'},
    {text: 'OBSERVABLE FLOWS', start: 54, number: '03'},
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: palette.background,
        backdropFilter: 'blur(24px) brightness(0.4)',
        opacity: exitOpacity,
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      {/* Atmospheric wall grid */}
      <AbsoluteFill
        style={{
          opacity: 0.24,
          backgroundImage: `
            linear-gradient(${palette.muted} 1px, transparent 1px),
            linear-gradient(90deg, ${palette.muted} 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          transform: `translate(${(frame * 0.08) % 72}px, ${(frame * 0.035) % 72}px)`,
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '92%',
          height: '88%',
          boxSizing: 'border-box',
          border: `2px solid ${palette.muted}`,
          borderRadius: 30,
          overflow: 'hidden',
          backgroundColor: palette.background,
          boxShadow: `0 34px 85px ${palette.background}`,
          transform: `translateY(${panelY}px) scale(${panelScale})`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Glass surface */}
        <AbsoluteFill
          style={{
            opacity: 0.18,
            backgroundImage: `linear-gradient(128deg, ${palette.primary} 0%, ${palette.background} 31%, ${palette.highlight} 62%, ${palette.background} 100%)`,
          }}
        />

        {/* Animated glare */}
        <div
          style={{
            position: 'absolute',
            zIndex: 10,
            left: `${glareX}%`,
            top: '-28%',
            width: '14%',
            height: '160%',
            opacity: 0.13,
            backgroundColor: palette.primary,
            transform: 'rotate(17deg)',
            filter: 'blur(18px)',
            pointerEvents: 'none',
          }}
        />

        {/* Header */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            height: 82,
            padding: '0 34px',
            flexShrink: 0,
            borderBottom: `2px solid ${palette.muted}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: palette.secondary,
                boxShadow: `0 0 18px ${palette.secondary}`,
                transform: `scale(${pulse})`,
              }}
            />
            <MarkerLabel color={palette.primary} fontSize={21}>
              War Room / Glass 08
            </MarkerLabel>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 14px',
              border: `1px solid ${palette.highlight}`,
              borderRadius: 999,
              color: palette.highlight,
              fontFamily: 'monospace',
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1.5,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: palette.highlight,
              }}
            />
            PRIORITY SHIFT ACTIVE
          </div>
        </div>

        {/* Main glass board */}
        <div
          style={{
            position: 'relative',
            zIndex: 3,
            flex: 1,
            minHeight: 0,
            padding: '28px 34px 22px',
            display: 'grid',
            gridTemplateColumns: '1fr 150px 1.08fr',
            gap: 20,
          }}
        >
          {/* Fading no-code sequence */}
          <div
            style={{
              position: 'relative',
              border: `1px solid ${palette.muted}`,
              borderRadius: 22,
              padding: '26px 28px',
              overflow: 'hidden',
              opacity: noCodeFade,
              filter: `blur(${noCodeBlur}px)`,
              transform: `translateX(${noCodeDrift}px)`,
            }}
          >
            <MarkerLabel
              color={palette.secondary}
              fontSize={16}
              opacity={noCodeWrite}
              style={{marginBottom: 25}}
            >
              Previous Wave
            </MarkerLabel>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
                transform: `rotate(${markerJitter * 0.08}deg)`,
              }}
            >
              {['DRAG + DROP', 'PREBUILT BLOCKS', 'HIDDEN LOGIC'].map(
                (label, index) => {
                  const local = interpolate(
                    frame,
                    [9 + index * 5, 19 + index * 5],
                    [0, 1],
                    clamp,
                  );
                  return (
                    <div
                      key={label}
                      style={{
                        position: 'relative',
                        opacity: local,
                        transform: `translateX(${interpolate(
                          local,
                          [0, 1],
                          [-20, 0],
                          clamp,
                        )}px)`,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 15,
                        }}
                      >
                        <div
                          style={{
                            width: 33,
                            height: 33,
                            flexShrink: 0,
                            borderRadius: '50%',
                            border: `3px solid ${palette.secondary}`,
                            color: palette.secondary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            fontSize: 15,
                          }}
                        >
                          {index + 1}
                        </div>
                        <MarkerLabel color={palette.primary} fontSize={25}>
                          {label}
                        </MarkerLabel>
                      </div>
                      <div
                        style={{
                          marginTop: 10,
                          marginLeft: 48,
                          width: `${84 - index * 9}%`,
                          height: 3,
                          backgroundColor: palette.muted,
                          transformOrigin: 'left center',
                          transform: `scaleX(${local}) rotate(${index % 2 ? 0.4 : -0.5}deg)`,
                        }}
                      />
                    </div>
                  );
                },
              )}
            </div>

            {/* Smudge eraser trail */}
            <div
              style={{
                position: 'absolute',
                left: `${smudgeX}%`,
                top: '7%',
                width: '32%',
                height: '90%',
                opacity: interpolate(
                  frame,
                  [39, 45, 61, 68],
                  [0, 0.5, 0.38, 0],
                  clamp,
                ),
                backgroundColor: palette.background,
                filter: 'blur(12px)',
                transform: 'rotate(7deg)',
              }}
            />

            <div
              style={{
                position: 'absolute',
                right: 22,
                bottom: 18,
                color: palette.muted,
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1,
              }}
            >
              FADING / LEGACY LAYER
            </div>
          </div>

          {/* Arrowed transition */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              viewBox="0 0 150 330"
              width="150"
              height="100%"
              style={{overflow: 'visible'}}
            >
              <path
                d="M 12 175 C 42 126, 82 218, 126 165"
                fill="none"
                stroke={palette.highlight}
                strokeWidth="6"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={arrowDraw}
              />
              <path
                d="M 105 145 L 129 164 L 105 184"
                fill="none"
                stroke={palette.highlight}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={arrowDraw}
              />
              <text
                x="75"
                y="112"
                fill={palette.highlight}
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="15"
                fontWeight="900"
                letterSpacing="2"
                opacity={codeOpacity}
              >
                REBUILD
              </text>
            </svg>
          </div>

          {/* Emerging coded solutions */}
          <div
            style={{
              position: 'relative',
              border: `2px solid ${palette.highlight}`,
              borderRadius: 22,
              padding: '25px 28px',
              overflow: 'hidden',
              opacity: codeOpacity,
              filter: `blur(${codeFocus}px)`,
              transform: `scale(${codeScale})`,
              boxShadow: `0 0 34px ${palette.highlight}`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: `${statusProgress * 100}%`,
                height: 5,
                backgroundColor: palette.highlight,
              }}
            />

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 19,
              }}
            >
              <div>
                <MarkerLabel color={palette.highlight} fontSize={16}>
                  New Coded Wave
                </MarkerLabel>
                <MarkerLabel
                  color={palette.primary}
                  fontSize={30}
                  style={{marginTop: 9}}
                >
                  Own The Logic
                </MarkerLabel>
              </div>

              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  border: `4px solid ${palette.secondary}`,
                  color: palette.secondary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'monospace',
                  fontWeight: 900,
                  fontSize: 18,
                  transform: `rotate(${interpolate(
                    circleDraw,
                    [1, 0],
                    [-22, 0],
                    clamp,
                  )}deg) scale(${pulse})`,
                }}
              >
                P1
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 13}}>
              {codeLines.map((line, index) => {
                const localSpring = spring({
                  frame: Math.max(0, frame - line.start),
                  fps,
                  config: {
                    damping: 12,
                    stiffness: 170,
                    mass: 0.55,
                  },
                });

                return (
                  <div
                    key={line.text}
                    style={{
                      height: 52,
                      border: `1px solid ${palette.muted}`,
                      borderRadius: 10,
                      padding: '0 14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 13,
                      opacity: localSpring,
                      transform: `translateX(${interpolate(
                        localSpring,
                        [0, 1],
                        [34, 0],
                        clamp,
                      )}px)`,
                      backgroundColor:
                        index === 0 ? palette.muted : palette.background,
                    }}
                  >
                    <span
                      style={{
                        color:
                          index === 0
                            ? palette.secondary
                            : palette.highlight,
                        fontFamily: 'monospace',
                        fontSize: 14,
                        fontWeight: 900,
                      }}
                    >
                      {line.number}
                    </span>
                    <span
                      style={{
                        color: palette.primary,
                        fontFamily: 'monospace',
                        fontSize: 17,
                        fontWeight: 800,
                        letterSpacing: 1.2,
                      }}
                    >
                      {'> '}
                      {line.text}
                    </span>
                  </div>
                );
              })}
            </div>

            <svg
              viewBox="0 0 480 90"
              width="100%"
              height="70"
              style={{
                position: 'absolute',
                left: 0,
                bottom: 2,
                opacity: 0.8,
              }}
            >
              <path
                d="M 32 59 C 98 19, 166 79, 230 40 C 296 2, 352 65, 448 20"
                fill="none"
                stroke={palette.secondary}
                strokeWidth="4"
                strokeLinecap="round"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={circleDraw}
              />
            </svg>
          </div>
        </div>

        {/* Bottom thesis strip */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            height: 78,
            flexShrink: 0,
            borderTop: `2px solid ${palette.muted}`,
            padding: '0 34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <MarkerLabel color={palette.primary} fontSize={24}>
            No-Code Fades.
            <span style={{color: palette.secondary}}> Code Takes Precedence.</span>
          </MarkerLabel>

          <div
            style={{
              width: 210,
              height: 8,
              borderRadius: 999,
              overflow: 'hidden',
              backgroundColor: palette.muted,
            }}
          >
            <div
              style={{
                width: `${statusProgress * 100}%`,
                height: '100%',
                borderRadius: 999,
                backgroundColor: palette.highlight,
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}