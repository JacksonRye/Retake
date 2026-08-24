import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const SceneModel35: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- BEAT 1: Entrance Spring (0.0s - 1.0s / Frames 0 - 30) ---
  const entranceSpring = spring({
    frame,
    fps,
    config: {
      damping: 11,
      mass: 0.6,
      stiffness: 90,
    },
  });

  // Scale overshoot and rotation pop
  const entranceScale = interpolate(entranceSpring, [0, 1], [0, 1]);
  const entranceRotate = interpolate(entranceSpring, [0, 1], [-12, 0]);

  // --- BEAT 2: Active Kinetic Transformation (1.0s - 2.8s / Frames 30 - 84) ---
  // Cursor Glide Path (Moves from off-screen bottom-right to the trigger button)
  // Button absolute screen target is approximately X: 1150, Y: 560
  const cursorX = interpolate(frame, [25, 46, 54, 75], [1950, 1150, 1150, 2000], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [25, 46, 54, 75], [1150, 560, 560, 350], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorScale = interpolate(frame, [46, 49, 54, 58], [1, 0.75, 0.75, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cursorOpacity = interpolate(frame, [20, 25, 75, 80], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Physical Shadow Compression on Click (Frames 48 - 56)
  const clickProgress = interpolate(frame, [48, 51, 55, 60], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const cardShadowOffset = interpolate(clickProgress, [0, 1], [12, 3]);
  const cardTranslateOffset = interpolate(clickProgress, [0, 1], [0, 9]);

  // Rolling Numerical Counter (Frames 50 - 68)
  const rollSpring = spring({
    frame: frame - 50,
    fps,
    config: {
      damping: 12,
      mass: 0.5,
      stiffness: 110,
    },
  });
  const counterY = interpolate(rollSpring, [0, 1], [0, -130]); // Shifts up by height of one text block

  // --- BEAT 3: Living Physics & Badges (2.8s - 4.5s / Frames 84 - 135) ---
  // Micro-hover vibration loops (Frames 84+)
  const isVibrating = frame >= 84 && frame < 125;
  const vibX = isVibrating ? Math.sin(frame * 1.8) * 3 : 0;
  const vibY = isVibrating ? Math.cos(frame * 2.3) * 3 : 0;
  const vibRot = isVibrating ? Math.sin(frame * 1.2) * 0.7 : 0;

  // Flashing Hazard Accents (Swaps colors every 6 frames)
  const flashToggle = Math.floor(frame / 6) % 2 === 0;
  const hazardColor1 = flashToggle ? '#F1F333' : '#FF90E8';
  const hazardColor2 = flashToggle ? '#000000' : '#23A094';

  // Badges Popping in Sequence
  const badge1Spring = spring({
    frame: frame - 82,
    fps,
    config: { damping: 9, mass: 0.4 },
  });
  const badge1Scale = interpolate(badge1Spring, [0, 1], [0, 1], { extrapolateLeft: 'clamp' });

  const badge2Spring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 9, mass: 0.4 },
  });
  const badge2Scale = interpolate(badge2Spring, [0, 1], [0, 1], { extrapolateLeft: 'clamp' });

  const badge3Spring = spring({
    frame: frame - 98,
    fps,
    config: { damping: 9, mass: 0.4 },
  });
  const badge3Scale = interpolate(badge3Spring, [0, 1], [0, 1], { extrapolateLeft: 'clamp' });

  // Snappy Exit (Frames 125 - 135)
  const exitSpring = spring({
    frame: frame - 125,
    fps,
    config: {
      damping: 10,
      mass: 0.4,
      stiffness: 150,
    },
  });
  const exitScale = interpolate(exitSpring, [0, 1], [1, 0]);
  const exitRotate = interpolate(exitSpring, [0, 1], [0, 25]);
  const exitTranslateX = interpolate(exitSpring, [0, 1], [0, 1300]);

  // Combined Master Transforms
  const finalScale = entranceScale * exitScale;
  const finalRotate = entranceRotate + exitRotate + vibRot;
  const finalTranslateX = exitTranslateX + vibX + cardTranslateOffset;
  const finalTranslateY = vibY + cardTranslateOffset;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#23A094', // Emerald Background
        backgroundImage: 'radial-gradient(#000000 25%, transparent 25%)',
        backgroundSize: '40px 40px',
        fontFamily: '"Impact", "Arial Black", sans-serif',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background Decorative Brutalist Watermark */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 40,
          color: '#000000',
          fontSize: '24px',
          letterSpacing: '2px',
          border: '3px solid #000000',
          padding: '8px 16px',
          backgroundColor: '#FFF8E7',
          boxShadow: '4px 4px 0px #000000',
          transform: 'rotate(-3deg)',
        }}
      >
        CHRON_STYLE_100 // SYSTEM_ACTIVE
      </div>

      {/* MAIN NEUBRUTALIST CARD */}
      <div
        style={{
          width: '1150px',
          height: '680px',
          backgroundColor: '#FFF8E7', // Cream Card Background
          border: '6px solid #000000',
          boxShadow: `${cardShadowOffset}px ${cardShadowOffset}px 0px #000000`,
          transform: `translate3d(${finalTranslateX}px, ${finalTranslateY}px, 0px) scale(${finalScale}) rotate(${finalRotate}deg)`,
          transformOrigin: 'center center',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Header Hazard Bar */}
        <div
          style={{
            height: '40px',
            backgroundColor: '#000000',
            borderBottom: '4px solid #000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            color: '#FFF8E7',
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#FF90E8', border: '2px solid #000' }} />
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#F1F333', border: '2px solid #000' }} />
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#23A094', border: '2px solid #000' }} />
          </div>
          <span style={{ fontSize: '16px', letterSpacing: '3px', fontWeight: 'bold' }}>TIME WASTE AUDIT PRO</span>
          <div style={{ width: '40px' }} />
        </div>

        {/* Flashing Hazard Stripes Strip */}
        <div
          style={{
            height: '15px',
            background: `repeating-linear-gradient(45deg, ${hazardColor1}, ${hazardColor1} 15px, ${hazardColor2} 15px, ${hazardColor2} 30px)`,
            borderBottom: '4px solid #000000',
          }}
        />

        {/* Card Body Split Layout */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
          
          {/* Left Column: Context & Input */}
          <div
            style={{
              width: '50%',
              borderRight: '6px solid #000000',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  backgroundColor: '#FF90E8',
                  color: '#000000',
                  display: 'inline-block',
                  padding: '6px 12px',
                  fontSize: '20px',
                  border: '3px solid #000000',
                  boxShadow: '4px 4px 0px #000000',
                  marginBottom: '20px',
                  transform: 'rotate(-2deg)',
                }}
              >
                DAILY HABIT
              </div>
              <h1
                style={{
                  fontSize: '64px',
                  lineHeight: '0.9',
                  color: '#000000',
                  margin: '10px 0 20px 0',
                  textTransform: 'uppercase',
                  WebkitTextStroke: '1px #000000',
                }}
              >
                SCROLLING <br />
                THE FEED
              </h1>
              <p
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  lineHeight: '1.4',
                  color: '#555555',
                }}
              >
                The two hours you spend scrolling each day adds up faster than you think.
              </p>
            </div>

            {/* Micro Progress Bar Graphic */}
            <div style={{ border: '4px solid #000000', backgroundColor: '#000000', padding: '12px', boxShadow: '4px 4px 0px #000' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFF8E7', marginBottom: '6px', fontSize: '14px' }}>
                <span>EFFICIENCY LOSS</span>
                <span>83%</span>
              </div>
              <div style={{ height: '24px', backgroundColor: '#FFF8E7', border: '2px solid #000', overflow: 'hidden', position: 'relative' }}>
                <div
                  style={{
                    width: '83%',
                    height: '100%',
                    backgroundColor: '#FF90E8',
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.15) 5px, rgba(0,0,0,0.15) 10px)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Counter & Trigger */}
          <div
            style={{
              width: '50%',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#FFF8E7',
            }}
          >
            {/* Rolling Counter Box */}
            <div
              style={{
                border: '6px solid #000000',
                boxShadow: '8px 8px 0px #000000',
                backgroundColor: '#000000',
                borderRadius: '4px',
                overflow: 'hidden',
                height: '130px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  transform: `translateY(${counterY}px)`,
                  transition: 'transform 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
              >
                {/* Frame 1: 2 HRS/DAY */}
                <div
                  style={{
                    height: '130px',
                    backgroundColor: '#FF90E8',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '16px', color: '#000000', letterSpacing: '2px', fontWeight: 'bold' }}>CURRENT RATE</span>
                  <span style={{ fontSize: '60px', color: '#000000', lineHeight: '1' }}>2 HRS / DAY</span>
                </div>

                {/* Frame 2: 730 HRS/YR */}
                <div
                  style={{
                    height: '130px',
                    backgroundColor: '#F1F333',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '16px', color: '#000000', letterSpacing: '2px', fontWeight: 'bold' }}>ANNUAL CUMULATIVE</span>
                  <span style={{ fontSize: '60px', color: '#000000', lineHeight: '1' }}>730 HRS / YR</span>
                </div>
              </div>
            </div>

            {/* Interactive Neubrutalist Button */}
            <div
              style={{
                position: 'relative',
                height: '90px',
                backgroundColor: '#000000',
                boxShadow: `${interpolate(clickProgress, [0, 1], [8, 1])}px ${interpolate(clickProgress, [0, 1], [8, 1])}px 0px #000000`,
                transform: `translate(${interpolate(clickProgress, [0, 1], [0, 7])}px, ${interpolate(clickProgress, [0, 1], [0, 7])}px)`,
                border: '4px solid #000000',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: '#23A094',
                  border: '2px solid #FFF8E7',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#FFF8E7',
                  fontSize: '28px',
                  letterSpacing: '1px',
                }}
              >
                RUN TIME CONVERSION
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar: Living Physics Badges (Beat 3) */}
        <div
          style={{
            height: '180px',
            backgroundColor: '#000000',
            borderTop: '6px solid #000000',
            padding: '20px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ color: '#FFF8E7', fontSize: '18px', letterSpacing: '4px', marginBottom: '15px', textTransform: 'uppercase' }}>
            YOU COULD HAVE PRODUCED:
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Badge 1 */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#FFF8E7',
                border: '4px solid #000000',
                boxShadow: '6px 6px 0px #FF90E8',
                padding: '12px',
                textAlign: 'center',
                fontSize: '24px',
                color: '#000000',
                transform: `scale(${badge1Scale}) rotate(-2deg)`,
                opacity: badge1Scale > 0 ? 1 : 0,
              }}
            >
              📚 A NOVEL
            </div>

            {/* Badge 2 */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#FF90E8',
                border: '4px solid #000000',
                boxShadow: '6px 6px 0px #F1F333',
                padding: '12px',
                textAlign: 'center',
                fontSize: '24px',
                color: '#000000',
                transform: `scale(${badge2Scale}) rotate(3deg)`,
                opacity: badge2Scale > 0 ? 1 : 0,
              }}
            >
              💼 A STARTUP
            </div>

            {/* Badge 3 */}
            <div
              style={{
                flex: 1,
                backgroundColor: '#F1F333',
                border: '4px solid #000000',
                boxShadow: '6px 6px 0px #23A094',
                padding: '12px',
                textAlign: 'center',
                fontSize: '24px',
                color: '#000000',
                transform: `scale(${badge3Scale}) rotate(-1deg)`,
                opacity: badge3Scale > 0 ? 1 : 0,
              }}
            >
              💪 A NEW BODY
            </div>
          </div>
        </div>

        {/* Corner Retro Star Sticker */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            position: 'absolute',
            top: '20px',
            right: '40px',
            transform: `rotate(${frame * 2}deg) scale(1.1)`,
            filter: 'drop-shadow(4px 4px 0px #000000)',
          }}
        >
          <path
            d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"
            fill="#FF90E8"
            stroke="#000000"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* OVERSIZED KINETIC CURSOR */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: `translate3d(${cursorX}px, ${cursorY}px, 0px) scale(${cursorScale})`,
          opacity: cursorOpacity,
          pointerEvents: 'none',
          zIndex: 999,
        }}
      >
        <svg
          width="90"
          height="90"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            filter: 'drop-shadow(6px 6px 0px #000000)',
          }}
        >
          <path
            d="M4.5 3V17L9 12.5L13.5 21L16.5 19.5L12 11L17.5 11L4.5 3Z"
            fill="#F1F333"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
export default SceneModel35;
