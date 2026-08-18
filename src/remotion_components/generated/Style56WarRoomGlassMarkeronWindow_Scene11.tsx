import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene11() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 125, mass: 0.72},
  });

  const opacity = interpolate(
    frame,
    [0, 7, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const panelY = interpolate(entrance, [0, 1], [70, 0]);
  const panelScale = interpolate(entrance, [0, 1], [0.965, 1]);

  const focusBlur = interpolate(
    frame,
    [0, 9, 72, durationInFrames],
    [10, 0, 0, 7],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const bubbleDraw = interpolate(frame, [8, 36], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const personDraw = interpolate(frame, [2, 22], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const arrowDraw = interpolate(frame, [31, 53], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const possibilitiesSpring = spring({
    frame: frame - 28,
    fps,
    config: {damping: 11, stiffness: 145, mass: 0.55},
  });

  const activationSpring = spring({
    frame: frame - 48,
    fps,
    config: {damping: 12, stiffness: 160, mass: 0.5},
  });

  const glareX = interpolate(frame, [10, 65], [-125, 135], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const oldLabelOpacity = interpolate(frame, [24, 34, 45], [1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const smudgeWidth = interpolate(frame, [31, 44], [0, 130], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const pulse = interpolate(Math.sin(frame * 0.28), [-1, 1], [0.96, 1.04]);

  const tools = [
    {label: 'BUILD', icon: '✦', color: '#FF8A3D', delay: 0},
    {label: 'LEARN', icon: '↗', color: '#4DD0E1', delay: 4},
    {label: 'CONNECT', icon: '◎', color: '#F4F4F4', delay: 8},
    {label: 'SHIP', icon: '⚡', color: '#FF8A3D', delay: 12},
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(24px) brightness(0.4)',
        opacity,
        fontFamily:
          '"Arial Narrow", "Trebuchet MS", Arial, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(#39414B 1px, transparent 1px), linear-gradient(90deg, #39414B 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          opacity: 0.16,
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
          padding: 'clamp(20px, 2.4vw, 42px)',
          boxSizing: 'border-box',
          border: '2px solid #39414B',
          borderRadius: 26,
          backgroundColor: '#1A2026',
          boxShadow: '0 30px 80px #1A2026, inset 0 0 46px #39414B',
          transform: `translateY(${panelY}px) scale(${panelScale})`,
          filter: `blur(${focusBlur}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            bottom: '-20%',
            left: '50%',
            width: '16%',
            backgroundColor: '#F4F4F4',
            opacity: 0.08,
            transform: `translateX(${glareX}vw) skewX(-17deg)`,
            filter: 'blur(18px)',
            pointerEvents: 'none',
          }}
        />

        <header
          style={{
            height: '12%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid #39414B',
            flexShrink: 0,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: '50%',
                backgroundColor: '#FF8A3D',
                boxShadow: '0 0 18px #FF8A3D',
                transform: `scale(${pulse})`,
              }}
            />
            <div
              style={{
                color: '#F4F4F4',
                fontSize: 'clamp(18px, 1.8vw, 31px)',
                fontWeight: 900,
                letterSpacing: '0.16em',
                transform: 'rotate(-0.7deg)',
              }}
            >
              CAPABILITY WAR ROOM
            </div>
          </div>

          <div
            style={{
              color: '#4DD0E1',
              border: '2px solid #4DD0E1',
              borderRadius: 999,
              padding: '7px 16px',
              fontSize: 'clamp(11px, 1vw, 16px)',
              fontWeight: 900,
              letterSpacing: '0.14em',
            }}
          >
            GLASS MAP • 11
          </div>
        </header>

        <main
          style={{
            position: 'relative',
            flex: 1,
            minHeight: 0,
            display: 'grid',
            gridTemplateColumns: '25% 50% 25%',
            alignItems: 'center',
          }}
        >
          <section
            style={{
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 18,
              paddingRight: 16,
            }}
          >
            <div
              style={{
                color: '#FF8A3D',
                fontSize: 'clamp(15px, 1.45vw, 25px)',
                fontWeight: 900,
                letterSpacing: '0.12em',
                transform: 'rotate(-2deg)',
              }}
            >
              ① PERCEPTION
            </div>

            <div
              style={{
                color: '#F4F4F4',
                fontSize: 'clamp(21px, 2.35vw, 42px)',
                lineHeight: 0.98,
                fontWeight: 900,
                letterSpacing: '0.035em',
                textTransform: 'uppercase',
              }}
            >
              What you
              <br />
              can imagine
              <br />
              becomes
              <br />
              <span style={{color: '#4DD0E1'}}>available.</span>
            </div>

            <div
              style={{
                position: 'relative',
                width: 132,
                height: 34,
                color: '#39414B',
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: '0.11em',
                opacity: oldLabelOpacity,
              }}
            >
              FIXED LIMITS
              <div
                style={{
                  position: 'absolute',
                  left: -4,
                  top: 8,
                  width: smudgeWidth,
                  height: 17,
                  borderRadius: 20,
                  backgroundColor: '#39414B',
                  opacity: 0.84,
                  transform: 'rotate(-4deg)',
                  filter: 'blur(3px)',
                }}
              />
            </div>
          </section>

          <section
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              viewBox="0 0 700 570"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflow: 'visible',
              }}
            >
              <path
                d="M255 434 C245 386 272 353 315 347 C361 340 400 368 410 424"
                fill="none"
                stroke="#F4F4F4"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="270"
                strokeDashoffset={270 * personDraw}
              />
              <circle
                cx="334"
                cy="304"
                r="44"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="10"
                strokeDasharray="278"
                strokeDashoffset={278 * personDraw}
              />

              <path
                d="M269 258 C230 249 205 218 213 184 C219 153 247 134 279 135 C295 95 338 74 379 88 C413 62 466 72 487 109 C527 108 558 137 558 173 C558 207 531 235 495 239 C466 263 427 270 391 258 C348 276 303 273 269 258 Z"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="970"
                strokeDashoffset={970 * bubbleDraw}
              />

              <circle
                cx="289"
                cy="273"
                r="12"
                fill="#1A2026"
                stroke="#F4F4F4"
                strokeWidth="7"
                strokeDasharray="76"
                strokeDashoffset={76 * bubbleDraw}
              />
              <circle
                cx="307"
                cy="284"
                r="6"
                fill="#F4F4F4"
                opacity={1 - bubbleDraw}
              />

              <path
                d="M548 274 C610 295 619 344 584 380"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="180"
                strokeDashoffset={180 * arrowDraw}
              />
              <path
                d="M565 371 L585 382 L588 357"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="55"
                strokeDashoffset={55 * arrowDraw}
              />
            </svg>

            <div
              style={{
                position: 'absolute',
                left: '32%',
                right: '21%',
                top: '23%',
                bottom: '46%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(7px, 1vw, 14px)',
              }}
            >
              {tools.map((tool, index) => {
                const toolSpring = spring({
                  frame: frame - 27 - tool.delay,
                  fps,
                  config: {damping: 10, stiffness: 175, mass: 0.48},
                });

                return (
                  <div
                    key={tool.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      minWidth: 0,
                      border: `3px solid ${tool.color}`,
                      borderRadius: index % 2 === 0 ? '48% 52% 46% 54%' : 999,
                      color: tool.color,
                      backgroundColor: '#1A2026',
                      fontSize: 'clamp(10px, 1vw, 17px)',
                      fontWeight: 900,
                      letterSpacing: '0.08em',
                      transform: `scale(${toolSpring}) rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                      opacity: interpolate(toolSpring, [0, 0.2], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                      }),
                    }}
                  >
                    <span style={{fontSize: '1.3em'}}>{tool.icon}</span>
                    {tool.label}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                position: 'absolute',
                top: '16%',
                left: '49%',
                width: 34,
                height: 34,
                border: '3px solid #4DD0E1',
                borderRadius: '50%',
                color: '#4DD0E1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                transform: `scale(${possibilitiesSpring}) rotate(-8deg)`,
              }}
            >
              ②
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '7%',
                color: '#F4F4F4',
                fontSize: 'clamp(13px, 1.25vw, 21px)',
                fontWeight: 900,
                letterSpacing: '0.14em',
                transform: 'rotate(1deg)',
              }}
            >
              PERSON → POSSIBILITY FIELD
            </div>
          </section>

          <section
            style={{
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: 18,
              paddingLeft: 16,
            }}
          >
            <div
              style={{
                color: '#4DD0E1',
                fontSize: 'clamp(14px, 1.35vw, 23px)',
                fontWeight: 900,
                letterSpacing: '0.12em',
                transform: 'rotate(2deg)',
              }}
            >
              ③ POTENTIAL
            </div>

            <div
              style={{
                width: '100%',
                border: '2px solid #39414B',
                borderRadius: 16,
                padding: 'clamp(14px, 1.4vw, 24px)',
                boxSizing: 'border-box',
                color: '#F4F4F4',
                fontSize: 'clamp(12px, 1.15vw, 19px)',
                lineHeight: 1.45,
                fontWeight: 800,
                letterSpacing: '0.06em',
                transform: 'rotate(-1deg)',
              }}
            >
              TOOLS APPEAR WHEN
              <br />
              THE FRAME EXPANDS.
            </div>

            <div
              style={{
                color: '#FF8A3D',
                fontSize: 'clamp(24px, 2.8vw, 50px)',
                fontWeight: 900,
                lineHeight: 0.9,
                transform: `scale(${pulse}) rotate(-3deg)`,
                transformOrigin: 'right center',
              }}
            >
              → GO
            </div>
          </section>
        </main>

        <footer
          style={{
            height: '13%',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #39414B',
          }}
        >
          <div
            style={{
              color: '#39414B',
              fontFamily: 'monospace',
              fontSize: 'clamp(10px, 0.95vw, 15px)',
              fontWeight: 800,
              letterSpacing: '0.1em',
            }}
          >
            SUBJECTIVE MAP / LIVE GLASS / FRAME 056
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 18px',
              border: '2px solid #4DD0E1',
              borderRadius: 8,
              backgroundColor: '#1A2026',
              color: '#4DD0E1',
              fontFamily: 'monospace',
              fontSize: 'clamp(11px, 1.05vw, 17px)',
              fontWeight: 900,
              letterSpacing: '0.12em',
              opacity: interpolate(activationSpring, [0, 0.2], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              transform: `translateX(${interpolate(
                activationSpring,
                [0, 1],
                [40, 0],
              )}px) scale(${interpolate(
                activationSpring,
                [0, 1],
                [0.92, 1],
              )})`,
              boxShadow: '0 0 22px #4DD0E1',
            }}
          >
            <span
              style={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                backgroundColor: '#4DD0E1',
                transform: `scale(${pulse})`,
              }}
            />
            ACTIVATION CODE: EXPAND_01
          </div>
        </footer>
      </div>
    </AbsoluteFill>
  );
}