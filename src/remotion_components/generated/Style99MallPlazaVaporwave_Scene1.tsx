import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

export default function Style99MallPlazaVaporwave_Scene1() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 14,
      mass: 0.72,
      stiffness: 105,
    },
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const cardY = interpolate(entrance, [0, 1], [72, 0]);
  const cardScale = interpolate(entrance, [0, 1], [0.92, 1]);
  const checkerScroll = (frame * 2.4) % 80;
  const gridSet = interpolate(frame, [0, durationInFrames], [-5, 26]);
  const sunSet = interpolate(frame, [0, durationInFrames], [-8, 14]);
  const bustRotation = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [-10, 9, -4],
  );
  const bustFloat = Math.sin(frame / 9) * 3;
  const bustScaleX = interpolate(
    frame,
    [0, durationInFrames / 2, durationInFrames],
    [0.94, 1.03, 0.97],
  );

  const badgeReveal = spring({
    frame: frame - 7,
    fps,
    config: {damping: 13, mass: 0.45, stiffness: 140},
  });

  const titleReveal = spring({
    frame: frame - 15,
    fps,
    config: {damping: 15, mass: 0.5, stiffness: 125},
  });

  const sculptureReveal = spring({
    frame: frame - 9,
    fps,
    config: {damping: 12, mass: 0.65, stiffness: 95},
  });

  const scanY = interpolate(frame % 34, [0, 34], [0, 300]);
  const orbitDash = interpolate(frame, [0, durationInFrames], [0, -110]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Georgia, Times New Roman, serif',
      }}
    >
      <div
        style={{
          width: 750,
          padding: 22,
          boxSizing: 'border-box',
          borderRadius: 24,
          border: '1px solid #F4F4F8',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          backgroundColor: 'transparent',
          boxShadow: '0 22px 0 #101018',
          opacity: entrance * exitOpacity,
          transform: `translateY(${cardY}px) scale(${cardScale})`,
          overflow: 'hidden',
        }}
      >
        {/* Tier 1 — Plaza identification */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
            transform: `translateX(${interpolate(
              badgeReveal,
              [0, 1],
              [-32, 0],
            )}px)`,
            opacity: badgeReveal,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: '7px 13px',
              borderRadius: 999,
              color: '#101018',
              backgroundColor: 'transparent',
              border: '2px solid #101018',
              fontFamily: 'Arial, sans-serif',
              fontSize: 11,
              fontWeight: 900,
              letterSpacing: 3.2,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 99,
                backgroundColor: '#8C7AE6',
                border: '1px solid #101018',
              }}
            />
            ＭＡＬＬ　ＰＬＡＺＡ　９９
          </div>

          <div
            style={{
              color: '#101018',
              fontFamily: 'Arial, sans-serif',
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 2.5,
            }}
          >
            オートメーション ／ ０１
          </div>
        </div>

        {/* Tier 2 — Vaporwave sculpture plaza */}
        <div
          style={{
            position: 'relative',
            height: 340,
            overflow: 'hidden',
            borderRadius: 17,
            border: '2px solid #101018',
            backgroundColor: '#FF93C9',
          }}
        >
          <svg
            viewBox="0 0 706 340"
            width="100%"
            height="100%"
            style={{display: 'block'}}
          >
            <defs>
              <linearGradient id="style99-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8C7AE6" />
                <stop offset="58%" stopColor="#FF93C9" />
                <stop offset="100%" stopColor="#3FD2C7" />
              </linearGradient>

              <linearGradient id="style99-marble" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F4F4F8" />
                <stop offset="56%" stopColor="#F4F4F8" />
                <stop offset="57%" stopColor="#3FD2C7" />
                <stop offset="72%" stopColor="#F4F4F8" />
                <stop offset="100%" stopColor="#8C7AE6" />
              </linearGradient>

              <pattern
                id="style99-checker"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
                patternTransform={`translate(0 ${checkerScroll})`}
              >
                <rect width="80" height="80" fill="#F4F4F8" />
                <rect width="40" height="40" fill="#101018" />
                <rect x="40" y="40" width="40" height="40" fill="#101018" />
              </pattern>

              <clipPath id="style99-sun-clip">
                <circle cx="353" cy={152 + sunSet} r="91" />
              </clipPath>
            </defs>

            <rect width="706" height="340" fill="url(#style99-sky)" />

            {/* Architectural horizon */}
            <path
              d="M0 190 H706"
              stroke="#101018"
              strokeWidth="3"
              opacity={0.75}
            />
            <path
              d="M56 190 V78 M650 190 V78"
              stroke="#F4F4F8"
              strokeWidth="2"
              opacity={0.55}
            />
            <path
              d="M32 92 H154 M552 92 H674"
              stroke="#F4F4F8"
              strokeWidth="2"
              opacity={0.55}
            />

            {/* Setting striped sun */}
            <g transform={`translate(0 ${sunSet})`}>
              <circle
                cx="353"
                cy="152"
                r="91"
                fill="#FF93C9"
                stroke="#101018"
                strokeWidth="4"
              />
              {[101, 116, 132, 149, 167, 186, 207].map((y, index) => (
                <rect
                  key={y}
                  x="258"
                  y={y}
                  width="190"
                  height={index < 3 ? 5 : 8}
                  fill={index % 2 === 0 ? '#F4F4F8' : '#3FD2C7'}
                  clipPath="url(#style99-sun-clip)"
                />
              ))}
            </g>

            {/* Perspective grid */}
            <g
              transform={`translate(0 ${gridSet})`}
              stroke="#8C7AE6"
              strokeWidth="2"
              opacity={0.85}
            >
              {[-250, -150, -70, 0, 70, 150, 250].map((offset) => (
                <line
                  key={offset}
                  x1={353 + offset * 0.12}
                  y1="190"
                  x2={353 + offset}
                  y2="340"
                />
              ))}
              {[198, 211, 228, 250, 278, 313, 352].map((y) => (
                <line key={y} x1="0" y1={y} x2="706" y2={y} />
              ))}
            </g>

            {/* Infinite checkerboard floor */}
            <path
              d="M0 218 L706 218 L706 340 L0 340 Z"
              fill="url(#style99-checker)"
              opacity={0.42}
            />
            <path
              d="M0 218 H706"
              stroke="#101018"
              strokeWidth="3"
            />

            {/* Technical orbit */}
            <ellipse
              cx="353"
              cy="203"
              rx="137"
              ry="28"
              fill="none"
              stroke="#3FD2C7"
              strokeWidth="3"
              strokeDasharray="13 9"
              strokeDashoffset={orbitDash}
            />

            {/* Marble bust */}
            <g
              style={{
                transformOrigin: '353px 210px',
                transform: `translateY(${bustFloat}px) rotate(${bustRotation * 0.08}deg) scaleX(${bustScaleX}) scale(${sculptureReveal})`,
              }}
            >
              <ellipse
                cx="353"
                cy="305"
                rx="91"
                ry="16"
                fill="#101018"
                opacity={0.7}
              />

              <path
                d="M282 300 C288 273 308 254 329 248 L330 226
                   C313 212 307 193 310 167
                   C312 131 329 107 355 105
                   C384 107 400 131 397 166
                   C395 192 388 211 373 226
                   L375 248
                   C400 254 419 273 425 300 Z"
                fill="url(#style99-marble)"
                stroke="#101018"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              <path
                d="M315 161
                   C316 125 334 97 360 103
                   C382 106 398 127 397 158
                   C388 145 381 128 376 116
                   C361 132 343 138 315 139 Z"
                fill="#8C7AE6"
                stroke="#101018"
                strokeWidth="4"
                strokeLinejoin="round"
              />

              <path
                d="M328 166 Q338 159 347 166"
                fill="none"
                stroke="#101018"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M365 166 Q375 159 384 166"
                fill="none"
                stroke="#101018"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M356 169 L351 190 L361 191"
                fill="none"
                stroke="#101018"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M341 202 Q356 211 372 201"
                fill="none"
                stroke="#101018"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M330 226 Q353 239 374 226"
                fill="none"
                stroke="#3FD2C7"
                strokeWidth="4"
              />
              <path
                d="M310 267 Q353 285 398 266"
                fill="none"
                stroke="#8C7AE6"
                strokeWidth="5"
              />

              <rect
                x="295"
                y="299"
                width="116"
                height="13"
                rx="3"
                fill="#F4F4F8"
                stroke="#101018"
                strokeWidth="4"
              />
              <rect
                x="311"
                y="312"
                width="84"
                height="17"
                fill="#3FD2C7"
                stroke="#101018"
                strokeWidth="4"
              />
            </g>

            {/* Scanning automation line */}
            <g opacity={0.72}>
              <line
                x1="0"
                y1={scanY}
                x2="706"
                y2={scanY}
                stroke="#F4F4F8"
                strokeWidth="2"
              />
              <rect
                x="18"
                y={scanY - 13}
                width="80"
                height="18"
                fill="#101018"
              />
              <text
                x="27"
                y={scanY}
                fill="#3FD2C7"
                fontFamily="Arial, sans-serif"
                fontSize="9"
                fontWeight="900"
                letterSpacing="2"
              >
                ＳＣＡＮ
              </text>
            </g>

            {/* Corner interface details */}
            <path
              d="M18 44 V18 H44 M662 18 H688 V44"
              fill="none"
              stroke="#101018"
              strokeWidth="4"
            />
            <text
              x="22"
              y="66"
              fill="#101018"
              fontFamily="Arial, sans-serif"
              fontSize="10"
              fontWeight="900"
              letterSpacing="3"
            >
              幻想構造
            </text>
            <text
              x="578"
              y="66"
              fill="#F4F4F8"
              fontFamily="Arial, sans-serif"
              fontSize="10"
              fontWeight="900"
              letterSpacing="2"
            >
              ＣＯＤＥ：ＯＮ
            </text>
          </svg>

          <div
            style={{
              position: 'absolute',
              left: 17,
              bottom: 15,
              padding: '6px 9px',
              color: '#F4F4F8',
              backgroundColor: '#101018',
              border: '2px solid #3FD2C7',
              fontFamily: 'Arial, sans-serif',
              fontSize: 9,
              fontWeight: 900,
              letterSpacing: 2.4,
            }}
          >
            ＳＴＲＵＣＴＵＲＥ ／ ＵＮＳＥＥＮ
          </div>
        </div>

        {/* Tier 3 — Headline and unlock note */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 20,
            alignItems: 'end',
            paddingTop: 17,
            opacity: titleReveal,
            transform: `translateY(${interpolate(
              titleReveal,
              [0, 1],
              [24, 0],
            )}px)`,
          }}
        >
          <div>
            <div
              style={{
                color: '#101018',
                fontSize: 31,
                lineHeight: 1.02,
                fontWeight: 800,
                fontStyle: 'italic',
                letterSpacing: 3.2,
                textTransform: 'uppercase',
              }}
            >
              AUTOMATION IS
              <br />
              AN ELEGANT ILLUSION.
            </div>

            <div
              style={{
                marginTop: 9,
                color: '#101018',
                fontFamily: 'Arial, sans-serif',
                fontSize: 11,
                lineHeight: 1.45,
                fontWeight: 800,
                letterSpacing: 1.6,
                textTransform: 'uppercase',
              }}
            >
              Beneath every effortless surface,
              <span style={{color: '#8C7AE6'}}> code holds the plaza up.</span>
            </div>
          </div>

          <div
            style={{
              minWidth: 112,
              padding: '10px 12px',
              border: '2px solid #101018',
              backgroundColor: '#F4F4F8',
              color: '#101018',
              boxShadow: '5px 5px 0 #8C7AE6',
              textAlign: 'center',
              fontFamily: 'Arial, sans-serif',
              fontSize: 9,
              lineHeight: 1.55,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            夢の内部
            <br />
            <span style={{color: '#8C7AE6'}}>ＵＮＬＯＣＫＥＤ</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}