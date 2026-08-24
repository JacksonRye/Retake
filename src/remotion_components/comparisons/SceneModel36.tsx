import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from 'remotion';

export const SceneModel36: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ---------------------------------------------------------------------------
  // BEAT 1: ENTRANCE (0.0s - 1.0s / frames 0 - 30)
  // High-energy spring entrance with scale overshoot and rotational momentum
  // ---------------------------------------------------------------------------
  const mainCardSpring = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 180, mass: 0.8 },
  });

  const enterScale = interpolate(mainCardSpring, [0, 1], [0.2, 1]);
  const enterRotate = interpolate(mainCardSpring, [0, 1], [-12, 0]);
  const enterY = interpolate(mainCardSpring, [0, 1], [400, 0]);

  // Floating background stickers entrance
  const stickerSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  // ---------------------------------------------------------------------------
  // BEAT 2: TRANSFORMATION (1.0s - 2.8s / frames 30 - 84)
  // Kinetic cursor click, shadow compression, dynamic rolling counter to 730
  // ---------------------------------------------------------------------------
  // Cursor trajectory towards the counter button
  const cursorProgress = interpolate(frame, [30, 46], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.25, 1, 0.5, 1),
  });

  const cursorX = interpolate(cursorProgress, [0, 1], [420, 160]);
  const cursorY = interpolate(cursorProgress, [0, 1], [350, 60]);

  // Physical Click Action (frame 47 - 54)
  const isClicking = frame >= 47 && frame <= 54;
  const cursorScale = isClicking ? 0.82 : 1.0;
  
  // Shadow compression on click
  const buttonCompress = isClicking ? 3 : 10;
  const buttonTranslateX = isClicking ? 7 : 0;
  const buttonTranslateY = isClicking ? 7 : 0;

  // Numerical Counter Interpolation (2 HRS/DAY -> 730 HRS/YR)
  const counterRoll = interpolate(frame, [48, 78], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const currentHours = Math.round(interpolate(counterRoll, [0, 1], [2, 730]));
  const unitLabel = counterRoll > 0.45 ? 'HRS / YEAR' : 'HRS / DAY';

  // Badges appearance in sequence during Beat 2
  const badge1Spring = spring({ frame: frame - 62, fps, config: { damping: 12, stiffness: 220 } });
  const badge2Spring = spring({ frame: frame - 69, fps, config: { damping: 12, stiffness: 220 } });
  const badge3Spring = spring({ frame: frame - 76, fps, config: { damping: 12, stiffness: 220 } });

  // ---------------------------------------------------------------------------
  // BEAT 3: LIVING PHYSICS & EXIT (2.8s - 4.5s / frames 84 - 135)
  // Continuous micro-hover vibration, flashing hazard alert, snappy exit
  // ---------------------------------------------------------------------------
  const isVibrating = frame >= 84 && frame < 120;
  const vibeX = isVibrating ? Math.sin(frame * 1.5) * 3 : 0;
  const vibeY = isVibrating ? Math.cos(frame * 1.8) * 3 : 0;

  // Hazard Flash Toggle
  const hazardFlash = Math.floor(frame / 6) % 2 === 0;

  // Snappy Exit (frames 120 - 135)
  const exitSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14, stiffness: 240 },
  });

  const exitScale = interpolate(exitSpring, [0, 1], [1, 0]);
  const exitY = interpolate(exitSpring, [0, 1], [0, -600]);
  const exitRotate = interpolate(exitSpring, [0, 1], [0, 15]);

  // Combined Transforms
  const finalScale = frame >= 120 ? exitScale : enterScale;
  const finalY = frame >= 120 ? exitY : enterY + vibeY;
  const finalRotate = frame >= 120 ? exitRotate : enterRotate + (vibeX * 0.2);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        fontFamily: '"Space Grotesk", "Arial Black", sans-serif',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Inject Fonts & CSS Grid Pattern */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=swap');
          
          .bg-grid {
            background-image: radial-gradient(#000000 15%, transparent 15%);
            background-size: 32px 32px;
          }
          
          .hazard-tape {
            background: repeating-linear-gradient(
              -45deg,
              #F1F333,
              #F1F333 20px,
              #000000 20px,
              #000000 40px
            );
          }
        `}
      </style>

      {/* Background Dot Matrix */}
      <AbsoluteFill className="bg-grid" style={{ opacity: 0.15 }} />

      {/* Top Floating Hazard Bar (Beat 3 Active) */}
      <div
        className="hazard-tape"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 36,
          borderBottom: '4px solid #000000',
          transform: `translateY(${interpolate(mainCardSpring, [0, 1], [-50, 0])}px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 0 #000',
        }}
      >
        <span
          style={{
            backgroundColor: hazardFlash && frame >= 84 ? '#FF90E8' : '#F1F333',
            color: '#000000',
            fontWeight: 900,
            fontSize: 16,
            letterSpacing: 3,
            padding: '2px 16px',
            border: '2px solid #000',
            textTransform: 'uppercase',
          }}
        >
          {frame >= 84 ? '⚠️ TIME WASTED ALERT ⚠️' : 'CHRONO METRICS CHIPS'}
        </span>
      </div>

      {/* Background Decorative Sticker 1 (Top Right) */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          right: 120,
          backgroundColor: '#23A094',
          border: '4px solid #000',
          boxShadow: '6px 6px 0px #000',
          padding: '12px 20px',
          fontWeight: 900,
          fontSize: 22,
          color: '#FFF8E7',
          transform: `scale(${stickerSpring}) rotate(8deg)`,
        }}
      >
        100% AVOIDABLE
      </div>

      {/* Background Decorative Sticker 2 (Bottom Left Starburst) */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 100,
          transform: `scale(${stickerSpring}) rotate(-10deg)`,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <polygon
            points="50,0 63,35 100,50 63,65 50,100 37,65 0,50 37,35"
            fill="#FF90E8"
            stroke="#000"
            strokeWidth="4"
          />
          <text
            x="50"
            y="55"
            textAnchor="middle"
            fontSize="14"
            fontWeight="900"
            fill="#000"
          >
            LOST!
          </text>
        </svg>
      </div>

      {/* MAIN NEUBRUTALIST CARD CONTAINER */}
      <div
        style={{
          width: 900,
          backgroundColor: '#FFF8E7',
          border: '5px solid #000000',
          boxShadow: '14px 14px 0px #000000',
          padding: '40px',
          position: 'relative',
          transform: `translate(${vibeX}px, ${finalY}px) scale(${finalScale}) rotate(${finalRotate}deg)`,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Card Header Pill */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#FF90E8',
              border: '3px solid #000',
              boxShadow: '4px 4px 0px #000',
              padding: '6px 16px',
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            ATTENTION COST AUDIT
          </div>
          <div
            style={{
              backgroundColor: '#F1F333',
              border: '3px solid #000',
              padding: '6px 12px',
              fontWeight: 900,
              fontSize: 16,
            }}
          >
            STRICTLY BRUTAL
          </div>
        </div>

        {/* Hero Title */}
        <h1
          style={{
            fontSize: 48,
            fontWeight: 900,
            margin: 0,
            color: '#000',
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}
        >
          THE DAILY SCROLL DRAIN
        </h1>

        {/* INTERACTIVE TRANSFORMING COUNTER BOX */}
        <div
          style={{
            position: 'relative',
            backgroundColor: counterRoll > 0.45 ? '#F1F333' : '#23A094',
            border: '5px solid #000000',
            boxShadow: `${buttonCompress}px ${buttonCompress}px 0px #000000`,
            transform: `translate(${buttonTranslateX}px, ${buttonTranslateY}px)`,
            padding: '30px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background-color 0.15s ease',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 16,
                fontWeight: 900,
                color: counterRoll > 0.45 ? '#000' : '#FFF8E7',
                letterSpacing: 2,
                marginBottom: 4,
              }}
            >
              COMPOUNDED TIME INVESTMENT
            </div>
            <div
              style={{
                fontSize: 76,
                fontWeight: 900,
                color: '#000000',
                lineHeight: 1,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {currentHours}
              <span style={{ fontSize: 32, marginLeft: 16 }}>{unitLabel}</span>
            </div>
          </div>

          {/* Interactive Click Button Target Graphic */}
          <div
            style={{
              backgroundColor: '#FF90E8',
              border: '4px solid #000',
              boxShadow: '4px 4px 0px #000',
              padding: '12px 20px',
              fontWeight: 900,
              fontSize: 18,
              textTransform: 'uppercase',
              color: '#000',
            }}
          >
            {counterRoll > 0.8 ? 'CONVERTED!' : 'CLICK TO RECLAIM'}
          </div>

          {/* Oversized Brutalist Cursor Element */}
          <div
            style={{
              position: 'absolute',
              right: 60,
              bottom: -20,
              transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
              pointerEvents: 'none',
              zIndex: 99,
              opacity: frame > 25 && frame < 95 ? 1 : 0,
            }}
          >
            <svg
              width="64"
              height="64"
              viewBox="0 0 32 32"
              fill="none"
              style={{ filter: 'drop-shadow(4px 4px 0px #000)' }}
            >
              <path
                d="M6 2L26 16L17 19L23 29L17 31L11 21L6 26V2Z"
                fill="#FFF8E7"
                stroke="#000000"
                strokeWidth="3"
                strokeLinejoin="miter"
              />
            </svg>
          </div>
        </div>

        {/* ALTERNATIVE OUTCOMES BADGES (Popping up in Beat 2) */}
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 1.5,
              marginBottom: 12,
              color: '#000',
            }}
          >
            WHAT YOU COULD HAVE PRODUCED INSTEAD:
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* Badge 1: A BOOK */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#FF90E8',
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
                padding: '14px',
                textAlign: 'center',
                fontWeight: 900,
                fontSize: 22,
                transform: `scale(${badge1Spring})`,
              }}
            >
              📚 A BOOK
            </div>

            {/* Badge 2: A BUSINESS */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#F1F333',
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
                padding: '14px',
                textAlign: 'center',
                fontWeight: 900,
                fontSize: 22,
                transform: `scale(${badge2Spring})`,
              }}
            >
              🚀 A BUSINESS
            </div>

            {/* Badge 3: A BODY */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#23A094',
                color: '#FFF8E7',
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
                padding: '14px',
                textAlign: 'center',
                fontWeight: 900,
                fontSize: 22,
                transform: `scale(${badge3Spring})`,
              }}
            >
              💪 A BODY
            </div>
          </div>
        </div>

        {/* Subtitle / Spoken Line Bar */}
        <div
          style={{
            backgroundColor: '#000000',
            color: '#FFF8E7',
            padding: '14px 20px',
            fontSize: 17,
            fontWeight: 700,
            lineHeight: 1.4,
            border: '2px solid #000',
          }}
        >
          "The 2 hours spend scrolling each day, or 730 hours each year, could have produced a book, a business, or a body you don't currently have."
        </div>
      </div>

      {/* Bottom Hazard Accent Bar */}
      <div
        className="hazard-tape"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 24,
          borderTop: '4px solid #000000',
        }}
      />
    </AbsoluteFill>
  );
};
export default SceneModel36;
