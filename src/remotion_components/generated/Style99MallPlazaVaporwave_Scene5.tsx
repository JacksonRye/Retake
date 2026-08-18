import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style99MallPlazaVaporwave_Scene5() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, mass: 0.72, stiffness: 105},
  });

  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const cardY = interpolate(entrance, [0, 1], [70, 0]);
  const cardScale = interpolate(entrance, [0, 1], [0.88, 1]);
  const slowRotation = interpolate(frame, [0, durationInFrames], [-4, 7]);
  const sunSet = interpolate(frame, [0, durationInFrames], [-8, 30]);
  const gridScroll = (frame * 2.4) % 48;
  const vortexRotation = frame * 1.45;
  const panelFloat = Math.sin(frame / 10) * 4;
  const pulse = interpolate(
    Math.sin(frame / 7),
    [-1, 1],
    [0.72, 1],
  );

  const snippets = [
    'const flow = nodes.map(run)',
    '<VisualBuilder enabled />',
    'if (trigger) execute();',
    'await workflow.resolve()',
    'state.connect(source)',
    'return hiddenPotential',
    '{ logic: "beneath" }',
    'pipeline.filter(Boolean)',
    'function automate(input)',
    'nodes.reduce(compose)',
    'event → action → result',
    'export default possibility',
  ];

  const toolCards = [
    {label: 'ＴＲＩＧＧＥＲ', x: 62, y: 46, accent: '#3FD2C7'},
    {label: 'ＦＩＬＴＥＲ', x: 292, y: 105, accent: '#8C7AE6'},
    {label: 'ＡＣＴＩＯＮ', x: 505, y: 48, accent: '#3FD2C7'},
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        fontFamily: 'Georgia, Times New Roman, serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 750,
          padding: 22,
          borderRadius: 24,
          border: '1px solid #F4F4F8',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 24px 0 #101018, 0 42px 70px #101018',
          opacity,
          overflow: 'hidden',
          transform: `translateY(${cardY}px) scale(${cardScale})`,
          transformOrigin: 'center center',
        }}
      >
        {/* Vaporwave ambient geometry */}
        <div
          style={{
            position: 'absolute',
            width: 260,
            height: 260,
            right: -110,
            top: -125 + sunSet,
            borderRadius: '50%',
            border: '14px solid #8C7AE6',
            backgroundColor: '#F4F4F8',
            opacity: 0.38,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: -60,
            bottom: -110,
            width: 260,
            height: 260,
            borderRadius: '50%',
            border: '2px solid #3FD2C7',
            opacity: 0.5,
            transform: `rotate(${slowRotation}deg)`,
          }}
        />

        {/* Tier 1: Header pill */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '7px 14px',
              borderRadius: 999,
              border: '2px solid #101018',
              backgroundColor: '#3FD2C7',
              color: '#101018',
              boxShadow: '4px 4px 0 #101018',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 900,
              fontSize: 11,
              letterSpacing: 2.4,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#8C7AE6',
                border: '1px solid #101018',
                transform: `scale(${pulse})`,
              }}
            />
            ＭＡＬＬ ＰＬＡＺＡ • ０５
          </div>

          <div
            style={{
              color: '#101018',
              fontFamily: 'Arial, sans-serif',
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            コードの深層 ／ １９９９
          </div>
        </div>

        {/* Tier 2: Hero graphic zone */}
        <div
          style={{
            position: 'relative',
            height: 304,
            overflow: 'hidden',
            borderRadius: 18,
            border: '2px solid #101018',
            backgroundColor: '#8C7AE6',
            boxShadow: '7px 7px 0 #101018',
          }}
        >
          {/* Sunset */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 30 + sunSet,
              width: 148,
              height: 148,
              marginLeft: -74,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #101018',
              background:
                'linear-gradient(180deg, #F4F4F8 0%, #FF93C9 48%, #3FD2C7 100%)',
              opacity: 0.9,
            }}
          >
            {[25, 47, 69, 91, 113].map((top, index) => (
              <div
                key={top}
                style={{
                  position: 'absolute',
                  left: 0,
                  top,
                  width: '100%',
                  height: index % 2 === 0 ? 7 : 4,
                  backgroundColor: '#8C7AE6',
                }}
              />
            ))}
          </div>

          {/* Infinite checkerboard floor */}
          <div
            style={{
              position: 'absolute',
              left: -90,
              right: -90,
              bottom: -75,
              height: 205,
              transform: 'perspective(250px) rotateX(58deg)',
              transformOrigin: 'center top',
              overflow: 'hidden',
              borderTop: '2px solid #3FD2C7',
              backgroundColor: '#101018',
              opacity: 0.92,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: -60,
                transform: `translateY(${gridScroll}px)`,
                background:
                  'linear-gradient(90deg, #3FD2C7 2px, transparent 2px), linear-gradient(180deg, #3FD2C7 2px, transparent 2px)',
                backgroundSize: '48px 48px',
              }}
            />
            {Array.from({length: 9}).map((_, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: 46,
                  height: 46,
                  left: 12 + index * 96,
                  top: ((index % 2) * 48 + gridScroll) % 96,
                  backgroundColor: '#FF93C9',
                  opacity: 0.45,
                }}
              />
            ))}
          </div>

          {/* Swirling code vortex */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '52%',
              width: 480,
              height: 235,
              transform: `translate(-50%, -50%) rotate(${vortexRotation}deg)`,
              transformOrigin: 'center center',
              opacity: 0.92,
            }}
          >
            {snippets.map((snippet, index) => {
              const angle = (index / snippets.length) * Math.PI * 2;
              const depthPulse = Math.sin(frame / 11 + index * 0.8);
              const radiusX = 62 + index * 13 + depthPulse * 8;
              const radiusY = 27 + index * 5;
              const x = 240 + Math.cos(angle) * radiusX;
              const y = 117 + Math.sin(angle) * radiusY;
              const rotation = (angle * 180) / Math.PI + 90;
              const snippetScale = 0.55 + index * 0.035;

              return (
                <div
                  key={snippet}
                  style={{
                    position: 'absolute',
                    left: x,
                    top: y,
                    padding: '3px 7px',
                    border: '1px solid #3FD2C7',
                    borderRadius: 4,
                    backgroundColor: '#101018',
                    color: index % 3 === 0 ? '#FF93C9' : '#F4F4F8',
                    fontFamily: 'Courier New, monospace',
                    fontSize: 9,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    boxShadow: '2px 2px 0 #3FD2C7',
                    transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${snippetScale})`,
                  }}
                >
                  {snippet}
                </div>
              );
            })}

            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 84,
                height: 84,
                borderRadius: '50%',
                border: '7px double #F4F4F8',
                backgroundColor: '#101018',
                boxShadow: '0 0 0 10px #FF93C9',
                transform: `translate(-50%, -50%) rotate(${-vortexRotation * 2}deg) scale(${pulse})`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  backgroundColor: '#3FD2C7',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            </div>
          </div>

          {/* Transparent no-code UI surface */}
          <div
            style={{
              position: 'absolute',
              inset: 16,
              borderRadius: 14,
              border: '2px solid #F4F4F8',
              backgroundColor: '#F4F4F8',
              opacity: 0.88,
              transform: `translateY(${panelFloat}px)`,
              boxShadow: '0 12px 0 #101018',
            }}
          >
            <div
              style={{
                height: 28,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 11px',
                borderBottom: '2px solid #101018',
                backgroundColor: '#FF93C9',
              }}
            >
              {['#8C7AE6', '#3FD2C7', '#101018'].map((color) => (
                <div
                  key={color}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: color,
                    border: '1px solid #101018',
                  }}
                />
              ))}
              <div
                style={{
                  marginLeft: 8,
                  color: '#101018',
                  fontFamily: 'Arial, sans-serif',
                  fontSize: 9,
                  fontWeight: 900,
                  letterSpacing: 1.7,
                }}
              >
                ＶＩＳＵＡＬ ＷＯＲＫＦＬＯＷ
              </div>
            </div>

            <svg
              width="100%"
              height="230"
              viewBox="0 0 700 230"
              style={{position: 'absolute', left: 0, top: 28}}
            >
              <path
                d="M170 74 C230 74, 240 133, 292 133"
                fill="none"
                stroke="#101018"
                strokeWidth="8"
                opacity="0.2"
              />
              <path
                d="M170 74 C230 74, 240 133, 292 133"
                fill="none"
                stroke="#3FD2C7"
                strokeWidth="3"
                strokeDasharray="10 8"
                strokeDashoffset={-frame * 2}
              />
              <path
                d="M405 133 C462 133, 462 77, 505 77"
                fill="none"
                stroke="#101018"
                strokeWidth="8"
                opacity="0.2"
              />
              <path
                d="M405 133 C462 133, 462 77, 505 77"
                fill="none"
                stroke="#8C7AE6"
                strokeWidth="3"
                strokeDasharray="10 8"
                strokeDashoffset={-frame * 2}
              />
            </svg>

            {toolCards.map((tool, index) => {
              const reveal = spring({
                frame: frame - 7 - index * 5,
                fps,
                config: {damping: 12, mass: 0.5},
              });

              return (
                <div
                  key={tool.label}
                  style={{
                    position: 'absolute',
                    left: tool.x,
                    top: tool.y,
                    width: 132,
                    height: 72,
                    padding: 10,
                    boxSizing: 'border-box',
                    borderRadius: 10,
                    border: '2px solid #101018',
                    backgroundColor: tool.accent,
                    color: '#101018',
                    boxShadow: '5px 5px 0 #101018',
                    transform: `scale(${reveal}) translateY(${
                      Math.sin(frame / 9 + index) * 3
                    }px)`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      fontFamily: 'Arial, sans-serif',
                      fontSize: 9,
                      fontWeight: 900,
                      letterSpacing: 1.2,
                    }}
                  >
                    <span
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: index === 1 ? 3 : '50%',
                        border: '2px solid #101018',
                        backgroundColor: '#F4F4F8',
                      }}
                    />
                    {tool.label}
                  </div>
                  <div
                    style={{
                      height: 5,
                      marginTop: 10,
                      borderRadius: 9,
                      backgroundColor: '#101018',
                      opacity: 0.75,
                    }}
                  />
                  <div
                    style={{
                      width: '67%',
                      height: 4,
                      marginTop: 5,
                      borderRadius: 9,
                      backgroundColor: '#F4F4F8',
                    }}
                  />
                </div>
              );
            })}

            <div
              style={{
                position: 'absolute',
                left: '50%',
                bottom: 10,
                transform: 'translateX(-50%)',
                padding: '4px 12px',
                borderRadius: 999,
                border: '1px solid #101018',
                backgroundColor: '#101018',
                color: '#F4F4F8',
                fontFamily: 'Courier New, monospace',
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: 1.4,
              }}
            >
              SURFACE: SIMPLE ／ ENGINE: UNSEEN
            </div>
          </div>

          {/* Rotating vapor statue */}
          <svg
            width="92"
            height="132"
            viewBox="0 0 92 132"
            style={{
              position: 'absolute',
              right: 4,
              bottom: -7,
              opacity: 0.82,
              transform: `perspective(240px) rotateY(${slowRotation * 2}deg)`,
              transformOrigin: 'center bottom',
            }}
          >
            <path
              d="M46 8 C29 8 23 21 26 37 C29 52 36 59 36 69 C24 74 13 85 10 112 L82 112 C79 85 68 74 56 69 C56 59 63 52 66 37 C69 21 63 8 46 8Z"
              fill="#F4F4F8"
              stroke="#101018"
              strokeWidth="3"
            />
            <path
              d="M31 35 C39 29 53 29 62 35 M36 48 C43 52 50 52 57 48 M23 82 C37 90 56 90 70 82"
              fill="none"
              stroke="#8C7AE6"
              strokeWidth="3"
            />
            <rect
              x="8"
              y="111"
              width="76"
              height="15"
              rx="3"
              fill="#3FD2C7"
              stroke="#101018"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Tier 3: Headline and unlock note */}
        <div
          style={{
            position: 'relative',
            zIndex: 4,
            marginTop: 20,
            display: 'grid',
            gridTemplateColumns: '1fr 182px',
            gap: 18,
            alignItems: 'end',
          }}
        >
          <div>
            <div
              style={{
                color: '#101018',
                fontSize: 31,
                lineHeight: 1,
                fontWeight: 800,
                fontStyle: 'italic',
                letterSpacing: 3.2,
                textShadow: '3px 3px 0 #F4F4F8',
              }}
            >
              ＢＥＮＥＡＴＨ ＴＨＥ
              <br />
              ＮＯ—ＣＯＤＥ ＳＵＲＦＡＣＥ
            </div>

            <div
              style={{
                marginTop: 12,
                color: '#101018',
                fontFamily: 'Arial, sans-serif',
                fontSize: 12,
                fontWeight: 800,
                lineHeight: 1.45,
                letterSpacing: 0.7,
              }}
            >
              Every effortless block conceals a vortex of logic,
              <br />
              complexity, and programmable possibility.
            </div>
          </div>

          <div
            style={{
              padding: '11px 12px',
              borderRadius: 12,
              border: '2px solid #101018',
              backgroundColor: '#8C7AE6',
              boxShadow: '5px 5px 0 #101018',
              color: '#F4F4F8',
            }}
          >
            <div
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 2,
                marginBottom: 6,
                color: '#3FD2C7',
              }}
            >
              ＵＮＬＯＣＫ ／ 解放
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.25,
                fontWeight: 800,
                fontStyle: 'italic',
              }}
            >
              See the code.
              <br />
              Expand the possible.
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}