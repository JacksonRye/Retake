import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style99MallPlazaVaporwave_Scene4() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {damping: 13, mass: 0.75, stiffness: 90},
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const opacity = interpolate(
    frame,
    [0, 8, durationInFrames - 12, durationInFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  const cardY = interpolate(entrance, [0, 1], [72, 0]);
  const cardScale = interpolate(entrance, [0, 1], [0.9, 1]);
  const checkerOffset = (frame * 2.4) % 48;
  const gridOffset = (frame * 1.7) % 30;
  const sunY = interpolate(frame, [0, durationInFrames], [34, 72], {
    extrapolateRight: 'clamp',
  });
  const sunScale = interpolate(frame, [0, durationInFrames], [1, 0.86], {
    extrapolateRight: 'clamp',
  });
  const statueRotation = Math.sin(frame / 22) * 9;
  const pulse = 1 + Math.sin(frame / 7) * 0.035;

  const morphProgress = interpolate(frame, [19, 61], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const noCodeOpacity = interpolate(morphProgress, [0, 0.56], [1, 0], {
    extrapolateRight: 'clamp',
  });

  const codeOpacity = interpolate(morphProgress, [0.28, 0.78], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const conduitLength = interpolate(morphProgress, [0, 1], [0, 1]);
  const scanX = interpolate(frame, [0, durationInFrames], [-120, 840]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: 'Georgia, Times New Roman, serif',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: 820,
          padding: 22,
          borderRadius: 24,
          border: '1px solid #101018',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 24px 0 #101018',
          overflow: 'hidden',
          opacity,
          transform: `translateY(${cardY}px) scale(${cardScale * exit})`,
          transformOrigin: 'center center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.12,
            backgroundImage:
              'linear-gradient(90deg, #101018 1px, transparent 1px), linear-gradient(#101018 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            backgroundPosition: `${-checkerOffset}px ${checkerOffset}px`,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <div
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                border: '2px solid #101018',
                backgroundColor: '#3FD2C7',
                color: '#101018',
                fontFamily: 'Arial, sans-serif',
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 3,
                boxShadow: '4px 4px 0 #101018',
              }}
            >
              ＭＡＬＬ　９９
            </div>
            <div
              style={{
                color: '#101018',
                fontSize: 13,
                fontWeight: 700,
                fontStyle: 'italic',
                letterSpacing: 2,
              }}
            >
              デジタル・プラザ
            </div>
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
            SCENE 04 ／ 未来基盤
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            height: 344,
            borderRadius: 18,
            border: '2px solid #101018',
            backgroundColor: '#8C7AE6',
            overflow: 'hidden',
            boxShadow: '8px 8px 0 #101018',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: -20,
              right: -20,
              top: 0,
              height: 174,
              background:
                'linear-gradient(180deg, #8C7AE6 0%, #FF93C9 58%, #F4F4F8 100%)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: sunY,
              width: 132,
              height: 132,
              marginLeft: -66,
              borderRadius: '50%',
              border: '3px solid #101018',
              backgroundColor: '#3FD2C7',
              overflow: 'hidden',
              transform: `scale(${sunScale * pulse})`,
              boxShadow: '7px 7px 0 #101018',
            }}
          >
            {[20, 39, 58, 77, 96].map((top, index) => (
              <div
                key={top}
                style={{
                  position: 'absolute',
                  left: 0,
                  top,
                  width: '100%',
                  height: index % 2 === 0 ? 5 : 3,
                  backgroundColor: '#101018',
                }}
              />
            ))}
          </div>

          <svg
            viewBox="0 0 776 344"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
            }}
          >
            <g
              stroke="#101018"
              strokeWidth="2"
              fill="none"
              opacity="0.78"
              transform={`translate(0 ${gridOffset})`}
            >
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <path
                  key={`h-${i}`}
                  d={`M0 ${188 + i * 30} H776`}
                />
              ))}
            </g>

            <g stroke="#101018" strokeWidth="2" fill="none" opacity="0.78">
              {[-320, -250, -180, -110, -40, 30, 100, 170, 240, 310, 380].map(
                (x) => (
                  <path key={x} d={`M388 174 L${388 + x} 344`} />
                )
              )}
            </g>

            <path
              d="M0 176 H776"
              stroke="#101018"
              strokeWidth="4"
              fill="none"
            />

            <g opacity={noCodeOpacity}>
              <rect
                x="72"
                y="88"
                width="124"
                height="68"
                rx="13"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="3"
              />
              <rect
                x="57"
                y="105"
                width="30"
                height="30"
                rx="7"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="3"
              />
              <circle
                cx="115"
                cy="121"
                r="12"
                fill="#FF93C9"
                stroke="#101018"
                strokeWidth="3"
              />
              <path
                d="M139 111 H178 M139 122 H170 M139 133 H160"
                stroke="#101018"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <rect
                x="90"
                y="190"
                width="116"
                height="62"
                rx="13"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="3"
              />
              <circle
                cx="119"
                cy="221"
                r="11"
                fill="#8C7AE6"
                stroke="#101018"
                strokeWidth="3"
              />
              <path
                d="M145 211 H188 M145 222 H178 M145 233 H187"
                stroke="#101018"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <path
                d="M134 156 C134 177 148 177 148 190"
                stroke="#101018"
                strokeWidth="4"
                strokeDasharray="7 7"
                fill="none"
              />
            </g>

            <g
              style={{
                transformOrigin: '388px 178px',
                transform: `scale(${0.82 + morphProgress * 0.18})`,
              }}
            >
              <circle
                cx="388"
                cy="179"
                r="31"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="4"
              />
              <path
                d="M378 165 L363 179 L378 193 M398 165 L413 179 L398 193"
                stroke="#8C7AE6"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M391 160 L384 198"
                stroke="#3FD2C7"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </g>

            <path
              d="M205 220 C266 220 281 180 355 180"
              stroke="#101018"
              strokeWidth="4"
              fill="none"
              strokeDasharray="220"
              strokeDashoffset={220 - conduitLength * 220}
            />
            <path
              d="M420 180 C490 180 504 119 570 119"
              stroke="#101018"
              strokeWidth="4"
              fill="none"
              strokeDasharray="220"
              strokeDashoffset={220 - conduitLength * 220}
            />

            {[0, 1, 2].map((i) => {
              const travel = (morphProgress * 1.35 - i * 0.2 + 1) % 1;
              const x = 202 + travel * 368;
              const y = 220 - Math.sin(travel * Math.PI) * 76;
              return (
                <rect
                  key={i}
                  x={x}
                  y={y}
                  width="11"
                  height="11"
                  rx="2"
                  fill={i === 1 ? '#3FD2C7' : '#F4F4F8'}
                  stroke="#101018"
                  strokeWidth="2"
                  transform={`rotate(${frame * 4 + i * 45} ${x + 5.5} ${y + 5.5})`}
                />
              );
            })}

            <g opacity={codeOpacity}>
              <rect
                x="566"
                y="72"
                width="154"
                height="177"
                rx="13"
                fill="#101018"
                stroke="#F4F4F8"
                strokeWidth="3"
              />
              <path d="M566 104 H720" stroke="#F4F4F8" strokeWidth="2" />
              <circle cx="586" cy="89" r="5" fill="#FF93C9" />
              <circle cx="603" cy="89" r="5" fill="#3FD2C7" />
              <circle cx="620" cy="89" r="5" fill="#8C7AE6" />

              <text
                x="585"
                y="134"
                fill="#3FD2C7"
                fontFamily="monospace"
                fontSize="18"
                fontWeight="700"
              >
                {'{'}
              </text>
              <text
                x="604"
                y="155"
                fill="#F4F4F8"
                fontFamily="monospace"
                fontSize="12"
              >
                FLOW:
              </text>
              <text
                x="604"
                y="176"
                fill="#FF93C9"
                fontFamily="monospace"
                fontSize="12"
              >
                AUTOMATE()
              </text>
              <text
                x="604"
                y="197"
                fill="#8C7AE6"
                fontFamily="monospace"
                fontSize="12"
              >
                RETURN CODE
              </text>
              <text
                x="585"
                y="222"
                fill="#3FD2C7"
                fontFamily="monospace"
                fontSize="18"
                fontWeight="700"
              >
                {'}'}
              </text>
            </g>

            <rect
              x={scanX}
              y="0"
              width="32"
              height="344"
              fill="#F4F4F8"
              opacity="0.18"
              transform={`skewX(-18)`}
            />
          </svg>

          <div
            style={{
              position: 'absolute',
              right: 18,
              bottom: 15,
              width: 38,
              height: 92,
              transformStyle: 'preserve-3d',
              transform: `perspective(300px) rotateY(${statueRotation}deg)`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 7,
                top: 0,
                width: 25,
                height: 28,
                borderRadius: '50% 50% 42% 42%',
                border: '2px solid #101018',
                backgroundColor: '#F4F4F8',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 27,
                width: 38,
                height: 48,
                clipPath: 'polygon(18% 0, 82% 0, 100% 100%, 0 100%)',
                border: '2px solid #101018',
                backgroundColor: '#F4F4F8',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: -4,
                bottom: 0,
                width: 46,
                height: 16,
                border: '2px solid #101018',
                backgroundColor: '#3FD2C7',
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            paddingTop: 20,
          }}
        >
          <div style={{maxWidth: 610}}>
            <div
              style={{
                color: '#101018',
                fontSize: 31,
                fontWeight: 800,
                fontStyle: 'italic',
                lineHeight: 1.03,
                letterSpacing: 4,
                textTransform: 'uppercase',
              }}
            >
              ＴＯＯＬＳ　ＥＶＯＬＶＥ．
              <br />
              ＣＯＤＥ　ＲＥＭＡＩＮＳ．
            </div>

            <div
              style={{
                marginTop: 10,
                color: '#101018',
                fontFamily: 'Arial, sans-serif',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1.3,
                lineHeight: 1.45,
              }}
            >
              NO-CODE FORMS BECOME COMPLEX SYSTEMS—THEN RETURN TO THE FOUNDATION.
            </div>
          </div>

          <div
            style={{
              flexShrink: 0,
              padding: '10px 13px',
              border: '2px solid #101018',
              borderRadius: 12,
              backgroundColor: '#F4F4F8',
              color: '#101018',
              boxShadow: '4px 4px 0 #101018',
              textAlign: 'right',
            }}
          >
            <div
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              CORE STATUS
            </div>
            <div
              style={{
                marginTop: 3,
                color: '#8C7AE6',
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 900,
              }}
            >
              CODE://ETERNAL
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}