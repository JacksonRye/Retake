import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene49() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: Heavy spring drop with oversized shadow.
  const heroDrop = spring({
    frame,
    fps,
    config: {
      damping: 11,
      stiffness: 230,
      mass: 0.85,
    },
  });

  const badgePop = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 10,
      stiffness: 260,
      mass: 0.55,
    },
  });

  const footerPop = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 11,
      stiffness: 240,
      mass: 0.6,
    },
  });

  const entranceY = interpolate(heroDrop, [0, 1], [-470, 0], clamp);
  const entranceScale = interpolate(heroDrop, [0, 1], [0.82, 1], clamp);
  const impactSquash = interpolate(
    frame,
    [18, 22, 26, 30],
    [1, 0.93, 1.035, 1],
    clamp,
  );

  // Beat 2: Cursor arrives, physically clicks REMOVE, shell snaps away.
  const cursorVisible = frame >= 27 && frame <= 74;
  const cursorX = interpolate(frame, [27, 44], [210, 20], clamp);
  const cursorY = interpolate(frame, [27, 44], [150, 6], clamp);
  const clickDown = frame >= 45 && frame <= 51;
  const clickThunk = clickDown ? 9 : 0;

  const shellRelease = interpolate(frame, [51, 56], [0, 1], clamp);
  const shellScale = interpolate(shellRelease, [0, 0.35, 1], [1, 1.08, 0.55]);
  const shellRotate = interpolate(shellRelease, [0, 1], [0, -13]);
  const shellX = interpolate(shellRelease, [0, 1], [0, -390]);
  const shellY = interpolate(shellRelease, [0, 1], [0, -105]);
  const shellOpacity = interpolate(frame, [53, 59], [1, 0], clamp);

  const authenticReveal = interpolate(frame, [52, 59], [0, 1], clamp);
  const authenticScale = interpolate(
    authenticReveal,
    [0, 0.55, 1],
    [0.86, 1.05, 1],
  );

  // Beat 3: Square confidence walk plus continuous living motion.
  const beat3Active = frame >= 84;
  const squarePhase = Math.floor(Math.max(0, frame - 84) / 7) % 4;
  const squarePoints = [
    {x: -7, y: -7},
    {x: 7, y: -7},
    {x: 7, y: 7},
    {x: -7, y: 7},
  ];
  const squareX = beat3Active ? squarePoints[squarePhase].x : 0;
  const squareY = beat3Active ? squarePoints[squarePhase].y : 0;

  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.25;
  const shadowPulse = 11 + Math.sin(frame * 0.18) * 3;
  const borderPulse = 6 + Math.round((Math.sin(frame * 0.2) + 1) * 1.5);

  const shineOffset = interpolate(
    (frame + 13) % 58,
    [0, 58],
    [-260, 650],
    clamp,
  );

  const underlineCycle = ((frame - 78 + 28) % 28) / 28;
  const underlineScale =
    frame < 78
      ? 0
      : interpolate(
          underlineCycle,
          [0, 0.18, 0.72, 1],
          [0, 1, 1, 0],
          clamp,
        );

  const exitY = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -70],
    clamp,
  );
  const sceneOpacity = interpolate(
    frame,
    [0, 4, durationInFrames - 7, durationInFrames],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
        opacity: sceneOpacity,
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: '80px 20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          transform: `translateY(${exitY}px)`,
        }}
      >
        {/* Tier 1: Category pill */}
        <div
          style={{
            height: '15%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '11px 25px',
              border: '4px solid #000000',
              borderRadius: 14,
              backgroundColor: '#FF90E8',
              boxShadow: '7px 7px 0 #000000',
              transform: `scale(${badgePop}) translateY(${
                Math.sin(frame * 0.1) * 2
              }px)`,
              fontSize: 18,
              fontWeight: 950,
              letterSpacing: 3,
              lineHeight: 1,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: 11,
                height: 11,
                flexShrink: 0,
                borderRadius: 2,
                backgroundColor: '#000000',
                transform: `rotate(${frame * 3}deg)`,
              }}
            />
            Identity reset
          </div>
        </div>

        {/* Tier 2: One transforming hero */}
        <div
          style={{
            height: '65%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 790,
              height: 330,
              maxWidth: '88%',
              position: 'relative',
              transform: `
                translate(${squareX}px, ${
                  entranceY + squareY + hoverY + clickThunk
                }px)
                rotate(${hoverTilt}deg)
                scale(${entranceScale}, ${entranceScale * impactSquash})
              `,
              transformOrigin: 'center',
            }}
          >
            {/* Revealed authentic self card */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                boxSizing: 'border-box',
                overflow: 'hidden',
                border: `${borderPulse}px solid #23A094`,
                borderRadius: 22,
                backgroundColor: '#FFF8E7',
                boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
                transform: `scale(${authenticScale})`,
                opacity: authenticReveal,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -80,
                  bottom: -80,
                  left: 0,
                  width: 95,
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
                  transform: `translateX(${shineOffset}px) skewX(-20deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  padding: '8px 18px',
                  border: '3px solid #000000',
                  borderRadius: 10,
                  backgroundColor: '#F1F333',
                  boxShadow: '4px 4px 0 #000000',
                  fontSize: 16,
                  fontWeight: 950,
                  letterSpacing: 3,
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                No performance required
              </div>

              <div
                style={{
                  position: 'relative',
                  fontSize: 67,
                  fontWeight: 950,
                  letterSpacing: -2,
                  lineHeight: 1,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                Authentic self
                <div
                  style={{
                    position: 'absolute',
                    left: '4%',
                    right: '4%',
                    bottom: -15,
                    height: 10,
                    borderRadius: 2,
                    backgroundColor: '#FF90E8',
                    border: '2px solid #000000',
                    transform: `scaleX(${underlineScale})`,
                    transformOrigin: 'left center',
                  }}
                />
              </div>
            </div>

            {/* Jagged aggressive persona shell */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                opacity: shellOpacity,
                transform: `translate(${shellX}px, ${shellY}px) rotate(${shellRotate}deg) scale(${shellScale})`,
                transformOrigin: 'center',
                filter: 'drop-shadow(18px 20px 0 #000000)',
                clipPath:
                  'polygon(4% 18%, 13% 13%, 10% 2%, 27% 9%, 36% 0%, 44% 9%, 58% 2%, 65% 11%, 82% 4%, 86% 17%, 98% 22%, 92% 37%, 100% 50%, 91% 61%, 97% 78%, 82% 81%, 77% 97%, 62% 88%, 51% 100%, 41% 89%, 25% 97%, 21% 83%, 4% 79%, 10% 63%, 0% 51%, 9% 39%)',
                backgroundColor: '#F1F333',
                border: '7px solid #000000',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 22,
              }}
            >
              <div
                style={{
                  fontSize: 63,
                  fontWeight: 950,
                  letterSpacing: -2,
                  lineHeight: 0.92,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                }}
              >
                Aggressive
                <br />
                persona
              </div>

              <div
                style={{
                  padding: '12px 30px',
                  border: '4px solid #000000',
                  borderRadius: 10,
                  backgroundColor: '#FF90E8',
                  boxShadow: clickDown
                    ? '2px 2px 0 #000000'
                    : '7px 7px 0 #000000',
                  transform: `translateY(${clickDown ? 5 : 0}px)`,
                  fontSize: 20,
                  fontWeight: 950,
                  letterSpacing: 4,
                  lineHeight: 1,
                  textDecoration: 'underline',
                  textDecorationThickness: 3,
                  textUnderlineOffset: 4,
                  textTransform: 'uppercase',
                }}
              >
                Remove
              </div>
            </div>

            {/* Clicking cursor */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  left: '58%',
                  top: '61%',
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${
                    clickDown ? 0.82 : 1
                  })`,
                  filter: 'drop-shadow(4px 5px 0 #FF90E8)',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="56"
                  height="66"
                  viewBox="0 0 56 66"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 4L48 38L29 40L39 59L27 64L17 44L4 57L6 4Z"
                    fill="#000000"
                    stroke="#FFF8E7"
                    strokeWidth="5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3: Punchline */}
        <div
          style={{
            height: '20%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              padding: '14px 30px',
              border: '4px solid #000000',
              borderRadius: 14,
              backgroundColor: '#23A094',
              boxShadow: '7px 7px 0 #FF90E8',
              transform: `scale(${footerPop}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px)`,
              color: '#FFF8E7',
              fontSize: 22,
              fontWeight: 950,
              letterSpacing: 2,
              lineHeight: 1,
              textAlign: 'center',
              textDecoration: 'underline',
              textDecorationThickness: 3,
              textUnderlineOffset: 5,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Drop the act. Keep the person.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}