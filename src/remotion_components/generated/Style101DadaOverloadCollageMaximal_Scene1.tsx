import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = ['#E9DFC9', '#C3423F', '#274690', '#D9A31B', '#191714'] as const;

type AppTile = {
  label: string;
  mark: string;
  x: number;
  y: number;
  size: number;
  rotate: number;
  bg: (typeof palette)[number];
  fg: (typeof palette)[number];
  delay: number;
  shape: string;
};

const apps: AppTile[] = [
  {
    label: 'CHAT',
    mark: '•••',
    x: 10,
    y: 8,
    size: 150,
    rotate: -13,
    bg: palette[1],
    fg: palette[0],
    delay: 12,
    shape: 'polygon(5% 8%, 94% 0%, 100% 82%, 78% 100%, 4% 91%, 0% 28%)',
  },
  {
    label: 'MAIL',
    mark: 'M',
    x: 61,
    y: 3,
    size: 140,
    rotate: 10,
    bg: palette[2],
    fg: palette[0],
    delay: 17,
    shape: 'polygon(8% 0%, 100% 7%, 93% 94%, 17% 100%, 0% 77%, 4% 19%)',
  },
  {
    label: 'PLAY',
    mark: '▶',
    x: 68,
    y: 33,
    size: 166,
    rotate: 15,
    bg: palette[3],
    fg: palette[4],
    delay: 23,
    shape: 'polygon(0% 12%, 85% 0%, 100% 23%, 91% 100%, 14% 93%, 5% 67%)',
  },
  {
    label: 'SYNC',
    mark: '↻',
    x: 3,
    y: 42,
    size: 174,
    rotate: -9,
    bg: palette[0],
    fg: palette[2],
    delay: 28,
    shape: 'polygon(13% 0%, 95% 9%, 100% 78%, 81% 97%, 4% 100%, 0% 20%)',
  },
  {
    label: 'MAP',
    mark: '✦',
    x: 55,
    y: 65,
    size: 152,
    rotate: -12,
    bg: palette[1],
    fg: palette[0],
    delay: 34,
    shape: 'polygon(0% 4%, 83% 0%, 100% 17%, 90% 96%, 28% 100%, 4% 83%)',
  },
  {
    label: 'DOC',
    mark: '≡',
    x: 14,
    y: 72,
    size: 142,
    rotate: 8,
    bg: palette[2],
    fg: palette[0],
    delay: 39,
    shape: 'polygon(8% 8%, 93% 0%, 100% 88%, 65% 100%, 0% 91%, 4% 25%)',
  },
];

export default function Style101DadaOverloadCollageMaximal_Scene1() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const intro = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.55, stiffness: 150 },
  });

  const containerOpacity = interpolate(
    frame,
    [0, 7, durationInFrames - 14, durationInFrames - 1],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const titleSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 9, mass: 0.48, stiffness: 180 },
  });

  const centerBurst = spring({
    frame: Math.max(0, frame - 19),
    fps,
    config: { damping: 8, mass: 0.42, stiffness: 190 },
  });

  const shuffle = Math.sin(frame * 0.35) * 5;
  const pulse = interpolate(Math.sin(frame * 0.25), [-1, 1], [0.97, 1.04]);
  const cutReveal = interpolate(frame, [8, 31], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const swirlRotation = interpolate(frame, [0, durationInFrames], [-18, 34]);
  const stampedNumber = String(Math.min(99, Math.floor(frame * 0.9))).padStart(2, '0');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: 900,
          height: '86%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: palette[0],
          border: `6px solid ${palette[4]}`,
          boxShadow: `18px 20px 0 ${palette[4]}`,
          opacity: containerOpacity,
          transform: `translateY(${interpolate(intro, [0, 1], [90, 0])}px) rotate(${interpolate(
            intro,
            [0, 1],
            [-2.5, 0],
          )}deg)`,
        }}
      >
        <svg
          viewBox="0 0 900 1600"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            transform: `rotate(${swirlRotation}deg) scale(1.22)`,
          }}
        >
          <defs>
            <pattern id="dots-red" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="7" cy="7" r="5" fill={palette[1]} />
            </pattern>
            <pattern id="dots-blue" width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="4" fill={palette[2]} />
            </pattern>
          </defs>

          <path
            d="M-120 470 C150 120 560 170 1010 20 L1040 300 C650 420 400 350 -80 720 Z"
            fill={palette[2]}
          />
          <path
            d="M-100 1150 C250 750 610 900 1010 590 L1020 900 C710 1190 320 1050 -80 1450 Z"
            fill={palette[1]}
          />
          <path
            d="M-80 680 C230 420 590 500 980 270"
            fill="none"
            stroke={palette[3]}
            strokeWidth="105"
          />
          <path
            d="M-50 1370 C310 1050 620 1190 1000 820"
            fill="none"
            stroke={palette[4]}
            strokeWidth="24"
          />
          <path
            d="M40 220 C340 80 600 210 850 60 L850 260 C560 380 310 250 50 430 Z"
            fill="url(#dots-red)"
          />
          <path
            d="M120 1250 C420 1030 660 1190 880 970 L880 1280 C610 1430 370 1320 110 1510 Z"
            fill="url(#dots-blue)"
          />
        </svg>

        <div
          style={{
            position: 'absolute',
            top: 28,
            left: 24,
            width: 235,
            padding: '12px 16px',
            backgroundColor: palette[4],
            color: palette[0],
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontSize: 22,
            fontWeight: 900,
            letterSpacing: 3,
            transform: `translateX(${interpolate(titleSpring, [0, 1], [-330, 0])}px) rotate(-5deg)`,
            clipPath: 'polygon(0 8%, 100% 0, 94% 92%, 7% 100%)',
            zIndex: 8,
          }}
        >
          CHRON / 101
        </div>

        <div
          style={{
            position: 'absolute',
            top: 26,
            right: 22,
            color: palette[4],
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: 24,
            fontWeight: 900,
            transform: `rotate(6deg) translateY(${shuffle}px)`,
            zIndex: 8,
          }}
        >
          MULTIPLICITY!
        </div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 5,
            paddingTop: 112,
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              backgroundColor: palette[3],
              border: `5px solid ${palette[4]}`,
              color: palette[4],
              padding: '8px 24px 6px',
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: 21,
              fontWeight: 900,
              letterSpacing: 5,
              transform: `translateX(${shuffle * 2}px) rotate(-2deg) scale(${pulse})`,
              clipPath: `inset(0 ${cutReveal}% 0 0)`,
            }}
          >
            ACTIVATION CODE
          </div>

          <div
            style={{
              marginTop: 16,
              color: palette[4],
              fontFamily: 'Arial Black, Impact, sans-serif',
              fontSize: 72,
              fontWeight: 950,
              lineHeight: 0.82,
              letterSpacing: -5,
              textAlign: 'center',
              textTransform: 'uppercase',
              WebkitTextStroke: `2px ${palette[0]}`,
              textShadow: `7px 7px 0 ${palette[1]}`,
              transform: `scale(${interpolate(titleSpring, [0, 1], [1.8, 1])}) rotate(${interpolate(
                titleSpring,
                [0, 1],
                [9, -1],
              )}deg)`,
            }}
          >
            APP
            <br />
            OVERLOAD
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            width: '92%',
            flex: 1,
            minHeight: 0,
            marginTop: 16,
            marginBottom: 118,
            border: `4px solid ${palette[4]}`,
            backgroundColor: palette[0],
            overflow: 'hidden',
            boxSizing: 'border-box',
            clipPath:
              'polygon(1% 2%, 17% 0%, 23% 3%, 39% 0%, 52% 2%, 66% 0%, 78% 3%, 100% 0%, 98% 19%, 100% 31%, 97% 49%, 100% 65%, 98% 81%, 100% 100%, 79% 97%, 64% 100%, 47% 97%, 29% 100%, 14% 97%, 0% 100%, 2% 80%, 0% 62%, 3% 47%, 0% 29%)',
          }}
        >
          <svg
            viewBox="0 0 760 880"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            <defs>
              <pattern id="field-dots" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="6" cy="6" r="3.8" fill={palette[4]} />
              </pattern>
            </defs>
            <rect width="760" height="880" fill={palette[0]} />
            <path d="M0 140 L760 10 L760 220 L0 350 Z" fill="url(#field-dots)" />
            <path d="M0 610 L760 410 L760 590 L0 790 Z" fill={palette[3]} />
            <path
              d="M10 510 C190 290 500 630 750 340"
              fill="none"
              stroke={palette[2]}
              strokeWidth="34"
            />
            <path
              d="M30 530 C230 350 500 650 735 390"
              fill="none"
              stroke={palette[1]}
              strokeWidth="17"
            />
          </svg>

          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: 245,
              height: 245,
              marginLeft: -122,
              marginTop: -122,
              borderRadius: '50%',
              backgroundColor: palette[4],
              border: `15px solid ${palette[3]}`,
              color: palette[0],
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
              zIndex: 4,
              transform: `rotate(${frame * 0.7}deg) scale(${centerBurst * pulse})`,
              boxShadow: `12px 14px 0 ${palette[1]}`,
            }}
          >
            <div
              style={{
                fontFamily: 'Georgia, serif',
                fontWeight: 900,
                fontSize: 72,
                lineHeight: 0.75,
              }}
            >
              +
            </div>
            <div
              style={{
                fontFamily: 'Arial Black, Arial, sans-serif',
                fontWeight: 900,
                fontSize: 21,
                letterSpacing: 3,
              }}
            >
              MERGE
            </div>
          </div>

          {apps.map((app, index) => {
            const tileSpring = spring({
              frame: Math.max(0, frame - app.delay),
              fps,
              config: {
                damping: 7 + (index % 3),
                mass: 0.4,
                stiffness: 185,
              },
            });

            const blastDistance = 210 + index * 18;
            const angle = ((index * 61 - 145) * Math.PI) / 180;
            const entryX = Math.cos(angle) * -blastDistance * (1 - tileSpring);
            const entryY = Math.sin(angle) * -blastDistance * (1 - tileSpring);
            const layerJitter = Math.sin(frame * 0.42 + index * 1.7) * 4;
            const jump = interpolate(
              Math.sin((frame - app.delay) * 0.22),
              [-1, 1],
              [0.98, 1.025],
            );

            return (
              <div
                key={app.label}
                style={{
                  position: 'absolute',
                  left: `${app.x}%`,
                  top: `${app.y}%`,
                  width: app.size,
                  height: app.size,
                  zIndex: index % 2 === 0 ? 6 : 3,
                  backgroundColor: app.bg,
                  color: app.fg,
                  border: `6px solid ${palette[4]}`,
                  boxShadow: `${index % 2 === 0 ? 10 : -9}px 11px 0 ${palette[4]}`,
                  clipPath: app.shape,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  opacity: interpolate(tileSpring, [0, 0.2, 1], [0, 1, 1]),
                  transform: `translate(${entryX + layerJitter}px, ${
                    entryY - layerJitter
                  }px) rotate(${app.rotate + (1 - tileSpring) * 50}deg) scale(${
                    tileSpring * jump
                  })`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 9,
                    border: `3px dashed ${app.fg}`,
                    clipPath: app.shape,
                  }}
                />
                <div
                  style={{
                    fontFamily:
                      index % 2 === 0
                        ? 'Georgia, serif'
                        : 'Arial Black, Arial, sans-serif',
                    fontSize: app.mark === '•••' ? 48 : 67,
                    lineHeight: 0.8,
                    fontWeight: 900,
                    transform: `rotate(${-app.rotate * 0.25}deg)`,
                  }}
                >
                  {app.mark}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    padding: '3px 8px',
                    backgroundColor: app.fg,
                    color: app.bg,
                    fontFamily: 'Arial Black, Arial, sans-serif',
                    fontWeight: 900,
                    fontSize: 15,
                    letterSpacing: 2,
                  }}
                >
                  {app.label}
                </div>
              </div>
            );
          })}

          <div
            style={{
              position: 'absolute',
              left: -18,
              top: '46%',
              padding: '4px 22px',
              backgroundColor: palette[4],
              color: palette[0],
              fontFamily: 'Georgia, serif',
              fontSize: 23,
              fontWeight: 900,
              fontStyle: 'italic',
              transform: `rotate(-10deg) translateX(${interpolate(
                titleSpring,
                [0, 1],
                [-180, 0],
              )}px)`,
              zIndex: 8,
            }}
          >
            CUT / PASTE
          </div>

          <div
            style={{
              position: 'absolute',
              right: -4,
              bottom: 18,
              width: 126,
              height: 80,
              backgroundColor: palette[0],
              color: palette[1],
              border: `5px solid ${palette[4]}`,
              fontFamily: 'Impact, Arial Black, sans-serif',
              fontSize: 48,
              fontWeight: 900,
              textAlign: 'center',
              lineHeight: '70px',
              transform: `rotate(8deg) scale(${pulse})`,
              zIndex: 9,
            }}
          >
            {stampedNumber}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 27,
            width: '88%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 12,
          }}
        >
          <div
            style={{
              width: '100%',
              padding: '13px 14px 11px',
              boxSizing: 'border-box',
              backgroundColor: palette[1],
              border: `5px solid ${palette[4]}`,
              color: palette[0],
              fontFamily: 'Arial Black, Arial, sans-serif',
              fontSize: 28,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: 1,
              textAlign: 'center',
              textTransform: 'uppercase',
              transform: `rotate(-1.5deg) translateY(${shuffle * 0.4}px)`,
              clipPath: 'polygon(0 9%, 100% 0, 98% 91%, 74% 100%, 48% 94%, 21% 100%, 2% 91%)',
            }}
          >
            EVERY APP. ONE IMPACT.
          </div>
          <div
            style={{
              marginTop: -2,
              padding: '5px 18px',
              backgroundColor: palette[2],
              color: palette[0],
              border: `4px solid ${palette[4]}`,
              fontFamily: 'Georgia, serif',
              fontSize: 18,
              fontWeight: 900,
              fontStyle: 'italic',
              transform: 'rotate(2deg)',
            }}
          >
            share × multiply × collide
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}