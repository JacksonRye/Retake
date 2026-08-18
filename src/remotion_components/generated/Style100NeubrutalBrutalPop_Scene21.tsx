import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene21() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: body-slam entrance.
  const entrance = spring({
    frame,
    fps,
    config: {
      damping: 9,
      stiffness: 260,
      mass: 0.65,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 4,
    fps,
    config: {
      damping: 11,
      stiffness: 250,
      mass: 0.55,
    },
  });

  const slamY = interpolate(frame, [0, 8, 15], [-520, 34, 0], clamp);
  const slamRotate = interpolate(frame, [0, 8, 15], [-7, 2, 0], clamp);

  // Beat 2: cursor physically clicks DOCUMENT.
  const cursorVisible = frame >= 28 && frame <= 68;
  const cursorX = interpolate(frame, [28, 43], [170, 0], clamp);
  const cursorY = interpolate(frame, [28, 43], [110, 0], clamp);
  const isClicking = frame >= 44 && frame <= 50;
  const hasSwitched = frame >= 48;

  const progress = Math.round(
    interpolate(
      frame,
      [30, 43, 50, 78, 105],
      [18, 18, 38, 79, 86],
      clamp,
    ),
  );

  // Beat 3: continuous living physics.
  const beat3 = frame >= 84;
  const hoverY = Math.sin(frame * 0.12) * 6;
  const tilt = Math.sin(frame * 0.08) * 1.35;
  const shadowPulse = 14 + Math.sin(frame * 0.18) * 4;

  const joltPattern = [
    {x: 0, y: 0},
    {x: 5, y: 0},
    {x: 5, y: -5},
    {x: 0, y: -5},
    {x: 0, y: 0},
  ];
  const jolt =
    beat3 && frame % 24 < 5
      ? joltPattern[frame % 5]
      : {x: 0, y: 0};

  const clickThunk = isClicking ? 8 : 0;
  const cardShadow = isClicking ? 5 : shadowPulse;

  const recordingFlash =
    hasSwitched && (!beat3 || Math.floor((frame - 84) / 6) % 2 === 0);

  const marchPhase = beat3 ? Math.floor((frame - 84) / 3) : 0;
  const progressBlocks = 12;
  const completedBlocks = Math.round((progress / 100) * progressBlocks);

  const shineOffset = interpolate(
    (frame + 18) % 58,
    [0, 58],
    [-260, 760],
    clamp,
  );

  const badgeFloat = Math.sin(frame * 0.1) * 3;
  const footerFloat = Math.sin(frame * 0.12 + 1.4) * 3;

  // Hard snap-exit.
  const exiting = frame >= durationInFrames - 8;
  const exitStep = exiting ? frame - (durationInFrames - 8) : 0;
  const exitX = exiting ? exitStep * 170 : 0;
  const exitRotate = exiting ? exitStep * 2.8 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
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
        }}
      >
        {/* Tier 1: category button */}
        <div
          style={{
            height: '15%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '11px 24px',
              border: '4px solid #000000',
              borderRadius: 10,
              backgroundColor: '#FF90E8',
              boxShadow: '7px 7px 0 #000000',
              transform: `translateY(${badgeFloat}px) scale(${badgeEntrance})`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: '#F1F333',
                border: '3px solid #000000',
              }}
            />
            <div
              style={{
                fontSize: 19,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 3,
                whiteSpace: 'nowrap',
              }}
            >
              ACCOUNTABILITY TRACKER
            </div>
          </div>
        </div>

        {/* Tier 2: one hero tracker card */}
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
              width: '82%',
              maxWidth: 790,
              position: 'relative',
              transform: `
                translateX(${jolt.x + exitX}px)
                translateY(${slamY + hoverY + jolt.y + clickThunk}px)
                rotate(${slamRotate + tilt + exitRotate}deg)
                scale(${entrance})
              `,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                minHeight: 340,
                boxSizing: 'border-box',
                padding: '34px 38px',
                backgroundColor: '#F1F333',
                border: '7px solid #000000',
                borderRadius: 18,
                boxShadow: `${cardShadow}px ${cardShadow}px 0 #FF90E8`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 24,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Continuous traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 82,
                  backgroundColor: 'rgba(255,255,255,0.38)',
                  transform: `translateX(${shineOffset}px) skewX(-18deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: 56,
                    lineHeight: 0.95,
                    fontWeight: 950,
                    letterSpacing: -2,
                  }}
                >
                  MINI-CUT
                </div>

                <div
                  style={{
                    minWidth: 180,
                    padding: '10px 16px',
                    boxSizing: 'border-box',
                    border: '4px solid #000000',
                    borderRadius: 8,
                    backgroundColor: hasSwitched
                      ? recordingFlash
                        ? '#FF90E8'
                        : '#000000'
                      : '#23A094',
                    color:
                      hasSwitched && !recordingFlash ? '#FFF8E7' : '#000000',
                    boxShadow: '5px 5px 0 #000000',
                    fontSize: 19,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 2,
                    textAlign: 'center',
                  }}
                >
                  {hasSwitched ? 'RECORDING' : 'ACTIVE'}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      lineHeight: 1,
                      fontWeight: 950,
                      letterSpacing: 2,
                    }}
                  >
                    COMPLETION
                  </div>
                  <div
                    style={{
                      fontSize: 32,
                      lineHeight: 1,
                      fontWeight: 950,
                    }}
                  >
                    {progress}%
                  </div>
                </div>

                <div
                  style={{
                    height: 54,
                    padding: 7,
                    boxSizing: 'border-box',
                    border: '5px solid #000000',
                    backgroundColor: '#FFF8E7',
                    display: 'flex',
                    alignItems: 'stretch',
                    gap: 5,
                  }}
                >
                  {Array.from({length: progressBlocks}).map((_, index) => {
                    const isComplete = index < completedBlocks;
                    const isMarchHead =
                      beat3 && isComplete && index === marchPhase % completedBlocks;
                    const isMarchTail =
                      beat3 &&
                      isComplete &&
                      index ===
                        (marchPhase - 1 + completedBlocks) % completedBlocks;

                    return (
                      <div
                        key={index}
                        style={{
                          flex: 1,
                          backgroundColor: isComplete
                            ? isMarchHead
                              ? '#FF90E8'
                              : isMarchTail
                                ? '#23A094'
                                : '#000000'
                            : '#FFF8E7',
                          border: isComplete
                            ? '2px solid #000000'
                            : '2px solid #23A094',
                          transform: isMarchHead
                            ? 'translateY(-5px)'
                            : 'translateY(0)',
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    padding: '12px 30px',
                    backgroundColor: isClicking ? '#FF90E8' : '#FFF8E7',
                    border: '5px solid #000000',
                    borderRadius: 8,
                    boxShadow: isClicking
                      ? '2px 2px 0 #000000'
                      : '7px 7px 0 #000000',
                    transform: isClicking
                      ? 'translate(5px, 5px)'
                      : 'translate(0, 0)',
                    fontSize: 23,
                    lineHeight: 1,
                    fontWeight: 950,
                    letterSpacing: 3,
                    textDecoration: 'underline',
                    textDecorationThickness: 3,
                    textUnderlineOffset: 5,
                  }}
                >
                  DOCUMENT
                </div>
              </div>
            </div>

            {/* Cursor is interaction support for the single hero */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  left: '62%',
                  bottom: 20,
                  zIndex: 20,
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${
                    isClicking ? 0.82 : 1
                  })`,
                  filter: isClicking
                    ? 'drop-shadow(2px 3px 0 #FF90E8)'
                    : 'drop-shadow(6px 7px 0 #FF90E8)',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="58"
                  height="68"
                  viewBox="0 0 58 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 4L49 37L31 40L41 60L29 66L19 45L6 58L5 4Z"
                    fill="#000000"
                    stroke="#FFF8E7"
                    strokeWidth="5"
                    strokeLinejoin="miter"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3: punchline */}
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
              padding: '14px 28px',
              backgroundColor: '#000000',
              color: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 10,
              boxShadow: '7px 7px 0 #23A094',
              fontSize: 23,
              lineHeight: 1,
              fontWeight: 950,
              letterSpacing: 2.5,
              textAlign: 'center',
              textDecoration: 'underline',
              textDecorationColor: '#FF90E8',
              textDecorationThickness: 4,
              textUnderlineOffset: 6,
              transform: `translateY(${footerFloat}px) scale(${entrance})`,
            }}
          >
            DOCUMENT THE PROCESS. KEEP THE PROMISE.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}