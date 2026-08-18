import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function NeubrutalStoolCrush() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Scene Entrance & Exit Transitions
  const introSpring = spring({
    frame,
    fps,
    config: { damping: 15, tension: 120 },
  });

  const exitSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, tension: 150 },
  });

  const globalYOffset = interpolate(exitSpring, [0, 1], [0, 1000]);
  const globalScale = interpolate(introSpring, [0, 1], [0.8, 1]);

  // 2. Screen Shake on Impact (Impact frame set to ~22)
  const getScreenShake = (f: number) => {
    if (f < 21 || f > 36) return { x: 0, y: 0 };
    const shakes = [
      { x: -16, y: 20 },
      { x: 18, y: -15 },
      { x: -12, y: 12 },
      { x: 10, y: -10 },
      { x: -8, y: 8 },
      { x: 6, y: -5 },
      { x: -4, y: 4 },
      { x: 2, y: -2 },
      { x: 0, y: 0 },
    ];
    return shakes[(f - 21) % shakes.length];
  };
  const shake = getScreenShake(frame);

  // 3. Stomp Physics (Boot descent)
  const bootStompProgress = spring({
    frame: frame - 10,
    fps,
    config: {
      mass: 1.8,
      tension: 320,
      damping: 15,
    },
  }); // Maps 0 to 1

  // Boot starts high above the canvas and lands directly on the ground (262px from bottom)
  const bootBottomY = interpolate(bootStompProgress, [0, 1], [1200, 262]);

  // 4. Stool Squash & Stretch (Triggered dynamically by boot proximity)
  const stoolSquashY = interpolate(bootStompProgress, [0.8, 0.98], [1, 0.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const stoolStretchX = interpolate(bootStompProgress, [0.8, 0.98], [1, 1.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 5. 2D Vector Splash (Triggers at frame 21, peaks fast, fades out)
  const splashScale = interpolate(frame, [20, 23, 35], [0, 1.4, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const splashOpacity = interpolate(frame, [20, 21, 35], [0, 1, 0]);

  // 6. Impact Dust Particles
  const particleProgress = interpolate(frame, [21, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const particleOpacity = interpolate(frame, [21, 23, 35, 40], [0, 1, 1, 0]);

  // 7. Text Banner Pop ("OUTGROW IT!")
  const textPop = spring({
    frame: frame - 23,
    fps,
    config: {
      tension: 250,
      friction: 12,
    },
  });
  const textScale = interpolate(textPop, [0, 1], [0, 1]);
  const textRotate = interpolate(textPop, [0, 1], [15, -6]);

  // Neubrutal Style Constants
  const CHRON_STYLE = {
    cyan: '#00f0ff',
    pink: '#ff007f',
    yellow: '#fffb00',
    black: '#000000',
    white: '#ffffff',
    border: '6px solid #000000',
    shadow: '10px 10px 0px #000000',
    shadowSmall: '5px 5px 0px #000000',
    font: '"Arial Black", Impact, sans-serif',
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: CHRON_STYLE.font,
      }}
    >
      {/* Main Wrapper with Screen Shake & Exit Transitions */}
      <div
        style={{
          width: 1920,
          height: 1080,
          position: 'relative',
          transform: `translate(${shake.x}px, ${shake.y + globalYOffset}px) scale(${globalScale})`,
          transformOrigin: 'center bottom',
        }}
      >
        {/* Background Grid Pattern Accent (Neubrutal Element) */}
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 100,
            width: 300,
            height: 300,
            backgroundImage: `radial-gradient(${CHRON_STYLE.black} 20%, transparent 20%)`,
            backgroundSize: '20px 20px',
            opacity: 0.15,
          }}
        />

        {/* Decorative Raw Crosses */}
        <div style={{ position: 'absolute', top: 200, right: 250, fontSize: 80, color: CHRON_STYLE.black, fontWeight: 'bold', opacity: 0.8 }}>+</div>
        <div style={{ position: 'absolute', bottom: 400, left: 200, fontSize: 60, color: CHRON_STYLE.black, fontWeight: 'bold', opacity: 0.8 }}>+</div>

        {/* 2D Vector Splash (Behind Stool/Boot) */}
        <div
          style={{
            position: 'absolute',
            bottom: 180,
            left: '50%',
            marginLeft: -250,
            width: 500,
            height: 250,
            transform: `scale(${splashScale})`,
            transformOrigin: 'bottom center',
            opacity: splashOpacity,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <svg viewBox="0 0 500 250" width="100%" height="100%">
            <path
              d="M 250 250 L 180 150 L 100 220 L 120 120 L 20 150 L 90 90 L 10 40 L 130 60 L 160 0 L 210 70 L 250 10 L 290 70 L 340 0 L 370 60 L 490 40 L 410 90 L 480 150 L 380 120 L 400 220 L 320 150 Z"
              fill={CHRON_STYLE.yellow}
              stroke={CHRON_STYLE.black}
              strokeWidth="8"
              strokeLinejoin="miter"
            />
          </svg>
        </div>

        {/* Fragile Hot-Pink Step Stool */}
        <div
          style={{
            position: 'absolute',
            bottom: 262,
            left: '50%',
            marginLeft: -125,
            width: 250,
            height: 180,
            transform: `scale(${stoolStretchX}, ${stoolSquashY})`,
            transformOrigin: 'bottom center',
            zIndex: 2,
          }}
        >
          <svg viewBox="0 0 250 180" width="100%" height="100%">
            {/* Shadow under stool (flattened) */}
            <rect x="10" y="170" width="230" height="10" fill={CHRON_STYLE.black} />
            
            {/* Left Leg */}
            <path
              d="M 50 50 L 15 170 H 50 L 80 50 Z"
              fill={CHRON_STYLE.pink}
              stroke={CHRON_STYLE.black}
              strokeWidth="6"
              strokeLinejoin="miter"
            />
            {/* Right Leg */}
            <path
              d="M 200 50 L 235 170 H 200 L 170 50 Z"
              fill={CHRON_STYLE.pink}
              stroke={CHRON_STYLE.black}
              strokeWidth="6"
              strokeLinejoin="miter"
            />
            
            {/* High-contrast Cross Braces (Fragility indicator) */}
            <line x1="70" y1="80" x2="180" y2="140" stroke={CHRON_STYLE.black} strokeWidth="6" />
            <line x1="180" y1="80" x2="70" y2="140" stroke={CHRON_STYLE.black} strokeWidth="6" />

            {/* Middle Step */}
            <rect
              x="45"
              y="95"
              width="160"
              height="20"
              fill={CHRON_STYLE.white}
              stroke={CHRON_STYLE.black}
              strokeWidth="6"
            />

            {/* Top Seat */}
            <rect
              x="25"
              y="20"
              width="200"
              height="30"
              fill={CHRON_STYLE.pink}
              stroke={CHRON_STYLE.black}
              strokeWidth="6"
            />
            
            {/* Top Seat Highlights */}
            <rect x="35" y="28" width="180" height="6" fill={CHRON_STYLE.white} opacity="0.4" />
          </svg>
        </div>

        {/* Giant Cyan Boot */}
        <div
          style={{
            position: 'absolute',
            bottom: bootBottomY,
            left: '50%',
            marginLeft: -225,
            width: 450,
            height: 450,
            zIndex: 3,
            filter: `drop-shadow(${CHRON_STYLE.shadow})`,
          }}
        >
          <svg viewBox="0 0 450 450" width="100%" height="100%">
            {/* Main Boot Body (Cyan) */}
            <path
              d="M 180 10 
                 H 280 
                 V 240 
                 L 390 270 
                 C 420 280 430 310 430 350 
                 L 410 390 
                 H 100 
                 L 110 320 
                 L 180 300 
                 Z"
              fill={CHRON_STYLE.cyan}
              stroke={CHRON_STYLE.black}
              strokeWidth="8"
              strokeLinejoin="miter"
            />

            {/* Heavy Black Chunky Sole */}
            <path
              d="M 90 390 
                 H 420 
                 V 425 
                 C 420 435 410 440 400 440 
                 H 110 
                 C 100 440 90 435 90 425 
                 Z"
              fill={CHRON_STYLE.black}
            />

            {/* Sole Treads (Yellow Accent) */}
            <rect x="120" y="440" width="40" height="10" fill={CHRON_STYLE.yellow} />
            <rect x="190" y="440" width="40" height="10" fill={CHRON_STYLE.yellow} />
            <rect x="260" y="440" width="40" height="10" fill={CHRON_STYLE.yellow} />
            <rect x="330" y="440" width="40" height="10" fill={CHRON_STYLE.yellow} />

            {/* Industrial Lacing System */}
            <line x1="280" y1="80" x2="320" y2="80" stroke={CHRON_STYLE.black} strokeWidth="8" strokeLinecap="square" />
            <line x1="280" y1="130" x2="330" y2="130" stroke={CHRON_STYLE.black} strokeWidth="8" strokeLinecap="square" />
            <line x1="280" y1="180" x2="340" y2="180" stroke={CHRON_STYLE.black} strokeWidth="8" strokeLinecap="square" />

            {/* Stitching Details */}
            <path
              d="M 190 310 Q 250 310 300 330"
              fill="none"
              stroke={CHRON_STYLE.black}
              strokeWidth="4"
              strokeDasharray="10,8"
            />
          </svg>
        </div>

        {/* Impact Dust Particles Shooting Out Horizontally */}
        <div
          style={{
            position: 'absolute',
            bottom: 262,
            left: '50%',
            width: 600,
            height: 100,
            marginLeft: -300,
            zIndex: 4,
            opacity: particleOpacity,
            pointerEvents: 'none',
          }}
        >
          {/* Left Burst */}
          <div
            style={{
              position: 'absolute',
              left: interpolate(particleProgress, [0, 1], [250, 50]),
              top: interpolate(particleProgress, [0, 1], [50, 20]),
              width: 35,
              height: 35,
              backgroundColor: CHRON_STYLE.yellow,
              border: CHRON_STYLE.border,
              transform: `rotate(${interpolate(particleProgress, [0, 1], [0, 180])}deg)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: interpolate(particleProgress, [0, 1], [230, 20]),
              top: interpolate(particleProgress, [0, 1], [60, 80]),
              width: 25,
              height: 25,
              backgroundColor: CHRON_STYLE.black,
              borderRadius: '50%',
            }}
          />

          {/* Right Burst */}
          <div
            style={{
              position: 'absolute',
              right: interpolate(particleProgress, [0, 1], [250, 50]),
              top: interpolate(particleProgress, [0, 1], [50, 10]),
              width: 40,
              height: 40,
              backgroundColor: CHRON_STYLE.pink,
              border: CHRON_STYLE.border,
              transform: `rotate(${interpolate(particleProgress, [0, 1], [0, -220])}deg)`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: interpolate(particleProgress, [0, 1], [220, 10]),
              top: interpolate(particleProgress, [0, 1], [70, 75]),
              width: 20,
              height: 20,
              backgroundColor: CHRON_STYLE.black,
            }}
          />
        </div>

        {/* Ground Line (Thick Neubrutalist Platform) */}
        <div
          style={{
            position: 'absolute',
            bottom: 250,
            left: '10%',
            width: '80%',
            height: 12,
            backgroundColor: CHRON_STYLE.black,
            zIndex: 2,
          }}
        />

        {/* Impact Text Overlay ("OUTGROW IT!") */}
        <div
          style={{
            position: 'absolute',
            top: 280,
            left: '50%',
            marginLeft: -320,
            width: 640,
            textAlign: 'center',
            transform: `scale(${textScale}) rotate(${textRotate}deg)`,
            transformOrigin: 'center center',
            zIndex: 5,
          }}
        >
          <div
            style={{
              backgroundColor: CHRON_STYLE.yellow,
              border: CHRON_STYLE.border,
              boxShadow: CHRON_STYLE.shadow,
              padding: '20px 40px',
              display: 'inline-block',
            }}
          >
            <h1
              style={{
                margin: 0,
                fontSize: 72,
                color: CHRON_STYLE.black,
                textTransform: 'uppercase',
                letterSpacing: 2,
                WebkitTextStroke: `2px ${CHRON_STYLE.black}`,
              }}
            >
              OUTGROW IT!
            </h1>
          </div>
        </div>

        {/* Warning Stripe Accent Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            left: '10%',
            width: '80%',
            height: 40,
            border: CHRON_STYLE.border,
            background: `repeating-linear-gradient(
              45deg,
              ${CHRON_STYLE.yellow},
              ${CHRON_STYLE.yellow} 20px,
              ${CHRON_STYLE.black} 20px,
              ${CHRON_STYLE.black} 40px
            )`,
            boxShadow: CHRON_STYLE.shadowSmall,
          }}
        />
      </div>
    </AbsoluteFill>
  );
}