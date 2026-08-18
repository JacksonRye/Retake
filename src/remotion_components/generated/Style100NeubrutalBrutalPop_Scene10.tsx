import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene10() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1 — hard launch with a spring-assisted 120% overshoot.
  const entranceSpring = spring({
    frame,
    fps,
    config: {
      damping: 11,
      stiffness: 260,
      mass: 0.55,
    },
  });

  const hardLaunchScale = interpolate(
    frame,
    [0, 7, 13, 21],
    [0.12, 1.2, 0.96, 1],
    clamp,
  );

  const heroEntranceScale =
    frame < 22
      ? hardLaunchScale * (0.94 + entranceSpring * 0.06)
      : 1;

  const heroEntranceRotation = interpolate(
    frame,
    [0, 7, 14, 22],
    [-5, 2.5, -1, 0],
    clamp,
  );

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 10,
      stiffness: 280,
      mass: 0.45,
    },
  });

  const footerEntrance = spring({
    frame: frame - 8,
    fps,
    config: {
      damping: 11,
      stiffness: 240,
      mass: 0.5,
    },
  });

  // Beat 2 — cursor arrives, physically clicks, flips the promise,
  // and launches the teal result bar.
  const cursorX = interpolate(frame, [24, 39], [230, 18], clamp);
  const cursorY = interpolate(frame, [24, 39], [170, 28], clamp);

  const firstClick = frame >= 40 && frame <= 47;

  const flipAngle =
    frame < 42
      ? 0
      : frame < 46
        ? interpolate(frame, [42, 46], [0, 90], clamp)
        : frame < 51
          ? interpolate(frame, [46, 51], [-90, 0], clamp)
          : 0;

  const transformed = frame >= 46;

  const initialBarProgress = interpolate(
    frame,
    [44, 67],
    [0, 100],
    clamp,
  );

  // Beat 3 — repeating press rhythm and cycling result surge.
  const livingBeat = frame >= 84;
  const rhythmFrame = Math.max(0, frame - 84) % 18;
  const rhythmicPress = livingBeat && rhythmFrame < 5;
  const isPressed = firstClick || rhythmicPress;

  const cycleProgress = interpolate(
    Math.max(0, frame - 84) % 36,
    [0, 26, 35],
    [18, 100, 18],
    clamp,
  );

  const barProgress = livingBeat ? cycleProgress : initialBarProgress;

  const buttonThunk = isPressed ? 10 : 0;
  const cursorScale = isPressed ? 0.84 : 1;
  const cursorRotation = isPressed ? -6 : 0;

  // Continuous living physics.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverTilt = Math.sin(frame * 0.08) * 1.35;
  const shadowPulse = Math.sin(frame * 0.18) * 2.5;
  const shadowDepth = isPressed ? 4 : 13 + shadowPulse;

  const shineOffset = interpolate(
    (frame + 18) % 58,
    [0, 58],
    [-220, 740],
    clamp,
  );

  const flashPhase = Math.max(0, frame - 84) % 12;
  const flashOn = livingBeat && flashPhase < 6;
  const flashScale = flashOn ? 1 : 0.45;
  const flashOpacity = flashOn ? 1 : 0.25;

  const label = transformed ? 'HELPING PEOPLE' : 'MARKETING AGENCY';

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FFF8E7',
        color: '#000000',
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
        padding: '80px 20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 840,
          height: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        {/* Tier 1 — 15% */}
        <div
          style={{
            flex: '0 0 15%',
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
              padding: '11px 24px',
              backgroundColor: '#F1F333',
              border: '4px solid #000000',
              borderRadius: 12,
              boxShadow: '6px 6px 0 #000000',
              transform: `translateY(${
                Math.sin(frame * 0.12 + 0.8) * 3
              }px) rotate(${Math.sin(frame * 0.09) * 0.7}deg) scale(${badgeEntrance})`,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: '#23A094',
                border: '2px solid #000000',
              }}
            />
            <div
              style={{
                fontSize: 19,
                fontWeight: 950,
                letterSpacing: 3,
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              Activation Code
            </div>
          </div>
        </div>

        {/* Tier 2 — 65% / single hero */}
        <div
          style={{
            flex: '0 0 65%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: 780,
              position: 'relative',
              transform: `translateY(${hoverY}px) rotate(${
                heroEntranceRotation + hoverTilt
              }deg) scale(${heroEntranceScale})`,
              transformOrigin: 'center',
            }}
          >
            {/* Yellow impact flashes attached to the hero */}
            <div
              style={{
                position: 'absolute',
                zIndex: 8,
                top: -43,
                left: 18,
                width: 82,
                height: 31,
                backgroundColor: '#F1F333',
                border: '4px solid #000000',
                clipPath: 'polygon(0 34%, 100% 0, 77% 100%)',
                opacity: flashOpacity,
                transform: `rotate(-16deg) scale(${flashScale})`,
                transformOrigin: 'bottom right',
              }}
            />
            <div
              style={{
                position: 'absolute',
                zIndex: 8,
                right: 8,
                bottom: -43,
                width: 86,
                height: 31,
                backgroundColor: '#F1F333',
                border: '4px solid #000000',
                clipPath: 'polygon(16% 0, 100% 40%, 0 100%)',
                opacity: flashOpacity,
                transform: `rotate(-8deg) scale(${flashScale})`,
                transformOrigin: 'top left',
              }}
            />

            {/* One tactile launch button */}
            <div
              style={{
                width: '100%',
                minHeight: 300,
                position: 'relative',
                overflow: 'hidden',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                justifyContent: 'center',
                gap: 16,
                padding: '50px 42px 35px',
                backgroundColor: '#FF90E8',
                border: '7px solid #000000',
                borderRadius: 24,
                boxShadow: `${shadowDepth}px ${shadowDepth}px 0 #000000`,
                transform: `translateY(${buttonThunk}px)`,
              }}
            >
              {/* Traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  zIndex: 1,
                  top: -40,
                  bottom: -40,
                  left: 0,
                  width: 100,
                  background:
                    'linear-gradient(90deg, transparent, rgba(255,255,255,0.52), transparent)',
                  transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  minHeight: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  perspective: 900,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    fontSize: 54,
                    fontWeight: 950,
                    lineHeight: 1.02,
                    letterSpacing: -1,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    textDecoration: transformed
                      ? 'underline 6px #000000'
                      : 'none',
                    textUnderlineOffset: 10,
                    transform: `rotateX(${flipAngle}deg)`,
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {label}
                </div>
              </div>

              {/* Teal results bar */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  width: '100%',
                  height: 58,
                  overflow: 'hidden',
                  backgroundColor: '#FFF8E7',
                  border: '4px solid #000000',
                  borderRadius: 9,
                  boxShadow: isPressed
                    ? '2px 2px 0 #000000'
                    : '5px 5px 0 #000000',
                }}
              >
                <div
                  style={{
                    width: `${barProgress}%`,
                    height: '100%',
                    backgroundColor: '#23A094',
                    borderRight:
                      barProgress > 2 && barProgress < 99
                        ? '4px solid #000000'
                        : 'none',
                  }}
                />
              </div>
            </div>

            {/* Oversized cursor remains engaged with the hero */}
            {frame >= 24 && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 20,
                  right: 72,
                  bottom: 22,
                  width: 104,
                  height: 124,
                  filter: isPressed
                    ? 'drop-shadow(2px 3px 0 #F1F333)'
                    : 'drop-shadow(7px 9px 0 #F1F333)',
                  transform: `translate(${cursorX}px, ${cursorY}px) rotate(${cursorRotation}deg) scale(${cursorScale})`,
                  transformOrigin: '22% 10%',
                  pointerEvents: 'none',
                }}
              >
                <svg
                  width="104"
                  height="124"
                  viewBox="0 0 104 124"
                  fill="none"
                >
                  <path
                    d="M9 7L91 64L56 72L75 108L52 120L33 82L9 106V7Z"
                    fill="#000000"
                    stroke="#FFF8E7"
                    strokeWidth="8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 7L91 64L56 72L75 108L52 120L33 82L9 106V7Z"
                    stroke="#000000"
                    strokeWidth="4"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3 — 20% */}
        <div
          style={{
            flex: '0 0 20%',
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
              padding: '15px 30px',
              backgroundColor: '#000000',
              color: '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 12,
              boxShadow: `${
                6 + Math.sin(frame * 0.18) * 2
              }px ${6 + Math.sin(frame * 0.18) * 2}px 0 #23A094`,
              transform: `translateY(${
                Math.sin(frame * 0.12 + 1.4) * 3
              }px) scale(${footerEntrance})`,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 950,
                lineHeight: 1.1,
                letterSpacing: 2,
                textTransform: 'uppercase',
                textDecoration: 'underline 3px #FF90E8',
                textUnderlineOffset: 6,
              }}
            >
              Turn Services Into Help
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}