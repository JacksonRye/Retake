import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene26() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: gauge crashes in at 10% and overshoots upright.
  const gaugeEntrance = spring({
    frame,
    fps,
    config: {
      damping: 9,
      stiffness: 250,
      mass: 0.65,
    },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: {
      damping: 10,
      stiffness: 280,
      mass: 0.55,
    },
  });

  const crashX = interpolate(gaugeEntrance, [0, 1], [760, 0], clamp);
  const crashRotation = interpolate(gaugeEntrance, [0, 1], [13, 0], clamp);

  // Beat 2: flood from 10% to 100% using hard stepped increments.
  const fillProgress = interpolate(frame, [30, 78], [0.1, 1], clamp);
  const steppedFill = Math.min(1, Math.floor(fillProgress * 20) / 20);
  const capacityPercent = Math.round(steppedFill * 100);

  const phrase = 'HUNDREDS OF PEOPLE';
  const typedCharacters = Math.floor(
    interpolate(frame, [36, 69], [0, phrase.length], clamp),
  );
  const typedPhrase = phrase.slice(0, typedCharacters);

  const stickerEntrance = spring({
    frame: frame - 67,
    fps,
    config: {
      damping: 7,
      stiffness: 340,
      mass: 0.45,
    },
  });

  const stickerSlap = interpolate(stickerEntrance, [0, 1], [2.4, 1], clamp);
  const stickerRotation = interpolate(stickerEntrance, [0, 1], [-24, -7], clamp);
  const stickerThunk =
    frame >= 71 && frame <= 74
      ? interpolate(frame, [71, 72, 74], [-12, 9, 0], clamp)
      : 0;

  // Cursor arrives and physically clicks the gauge endpoint.
  const cursorVisible = frame >= 43 && frame <= 82;
  const cursorX = interpolate(frame, [43, 61], [175, 4], clamp);
  const cursorY = interpolate(frame, [43, 61], [130, 2], clamp);
  const cursorClicking = frame >= 61 && frame <= 66;
  const clickCompression = cursorClicking ? 0.975 : 1;

  // Beat 3: continuously living full-capacity pressure.
  const hoverY = Math.sin(frame * 0.12) * 6;
  const tilt = Math.sin(frame * 0.08) * 1.25;
  const pressureWave = frame >= 84 ? Math.max(0, Math.sin((frame - 84) * 0.48)) : 0;
  const pressureScaleX = 1 + pressureWave * 0.018;
  const pressureScaleY = 1 + pressureWave * 0.012;

  const shadowDepth =
    11 +
    Math.sin(frame * 0.18) * 3 +
    (frame >= 84 ? pressureWave * 12 : 0);

  const warningFlash =
    frame >= 84 && Math.floor((frame - 84) / 6) % 2 === 0
      ? '#FF90E8'
      : '#F1F333';

  const borderColor =
    frame >= 84 && Math.floor((frame - 84) / 5) % 2 === 0
      ? '#FF90E8'
      : '#000000';

  const shineOffset = interpolate(
    (frame + 18) % 62,
    [0, 62],
    [-220, 1020],
    clamp,
  );

  const exitX = interpolate(
    frame,
    [durationInFrames - 9, durationInFrames],
    [0, -110],
    clamp,
  );

  const opacity = interpolate(
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
        opacity,
        fontFamily:
          '"Arial Black", "Helvetica Neue", Impact, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          padding: '80px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          transform: `translateX(${exitX}px)`,
        }}
      >
        {/* Tier 1 — top 15% */}
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
              padding: '12px 26px',
              backgroundColor: '#23A094',
              border: '4px solid #000000',
              borderRadius: 14,
              boxShadow: `${6 + Math.sin(frame * 0.18) * 2}px ${
                6 + Math.sin(frame * 0.18) * 2
              }px 0 #000000`,
              transform: `scale(${badgeEntrance}) translateY(${
                Math.sin(frame * 0.12 + 1) * 3
              }px) rotate(${Math.sin(frame * 0.08) * 0.7}deg)`,
            }}
          >
            <span
              style={{
                width: 12,
                height: 12,
                flex: '0 0 auto',
                borderRadius: '50%',
                backgroundColor: '#F1F333',
                border: '3px solid #000000',
              }}
            />
            <span
              style={{
                color: '#FFFFFF',
                fontSize: 20,
                fontWeight: 950,
                letterSpacing: 3,
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              Time Capacity
            </span>
          </div>
        </div>

        {/* Tier 2 — center 65%: one hero gauge */}
        <div
          style={{
            flex: '0 0 65%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 0,
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '86%',
              maxWidth: 900,
              transform: `
                translateX(${crashX}px)
                translateY(${hoverY + stickerThunk}px)
                rotate(${crashRotation + tilt}deg)
                scaleX(${pressureScaleX * clickCompression})
                scaleY(${pressureScaleY * clickCompression})
              `,
              transformOrigin: 'center',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: 250,
                boxSizing: 'border-box',
                overflow: 'hidden',
                backgroundColor: '#FFF8E7',
                border: `8px solid ${borderColor}`,
                borderRadius: 22,
                boxShadow: `${shadowDepth}px ${shadowDepth}px 0 #000000`,
              }}
            >
              {/* Flooding gauge fill */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: `${steppedFill * 100}%`,
                  backgroundColor: warningFlash,
                  borderRight:
                    capacityPercent < 100 ? '6px solid #000000' : 'none',
                }}
              />

              {/* Traveling shine */}
              <div
                style={{
                  position: 'absolute',
                  top: -30,
                  bottom: -30,
                  left: 0,
                  width: 105,
                  backgroundColor: 'rgba(255,255,255,0.48)',
                  transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                  pointerEvents: 'none',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 2,
                  padding: '28px 34px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 16,
                }}
              >
                <div
                  style={{
                    minHeight: 42,
                    fontSize: 24,
                    fontWeight: 950,
                    letterSpacing: 3,
                    lineHeight: 1.1,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    textDecoration: typedPhrase ? 'underline' : 'none',
                    textDecorationThickness: 4,
                    textUnderlineOffset: 7,
                  }}
                >
                  {typedPhrase}
                  {frame >= 36 && frame < 76 && Math.floor(frame / 3) % 2 === 0
                    ? '▌'
                    : ''}
                </div>

                <div
                  style={{
                    fontSize: 82,
                    fontWeight: 950,
                    letterSpacing: -4,
                    lineHeight: 0.9,
                    textAlign: 'center',
                    fontVariantNumeric: 'tabular-nums',
                    WebkitTextStroke: '1px #000000',
                  }}
                >
                  {capacityPercent}%
                </div>
              </div>
            </div>

            {/* Endpoint overload sticker */}
            {frame >= 67 && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 8,
                  right: -18,
                  top: -34,
                  padding: '13px 22px',
                  backgroundColor: '#FF90E8',
                  border: '5px solid #000000',
                  borderRadius: 10,
                  boxShadow: '7px 7px 0 #000000',
                  transform: `scale(${stickerSlap}) rotate(${stickerRotation}deg)`,
                  transformOrigin: 'center',
                  color: '#000000',
                  fontSize: 25,
                  fontWeight: 950,
                  letterSpacing: 2,
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                Overload!
              </div>
            )}

            {/* Cursor click */}
            {cursorVisible && (
              <div
                style={{
                  position: 'absolute',
                  zIndex: 12,
                  right: '4%',
                  bottom: '3%',
                  transform: `translate(${cursorX}px, ${cursorY}px) scale(${
                    cursorClicking ? 0.78 : 1
                  })`,
                  filter: cursorClicking
                    ? 'drop-shadow(2px 2px 0 #FF90E8)'
                    : 'drop-shadow(6px 6px 0 #FF90E8)',
                }}
              >
                <svg
                  width="58"
                  height="58"
                  viewBox="0 0 24 24"
                  fill="#000000"
                  stroke="#FFF8E7"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                >
                  <path d="M3.7 2.8 11 21l2.65-7.15L21 11.1 3.7 2.8Z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Tier 3 — bottom 20% */}
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
              backgroundColor: frame >= 84 ? warningFlash : '#000000',
              color: frame >= 84 ? '#000000' : '#FFF8E7',
              border: '4px solid #000000',
              borderRadius: 14,
              boxShadow: `${7 + Math.sin(frame * 0.18) * 2}px ${
                7 + Math.sin(frame * 0.18) * 2
              }px 0 #23A094`,
              transform: `scale(${gaugeEntrance}) translateY(${
                Math.sin(frame * 0.12 + 2) * 3
              }px)`,
              fontSize: 23,
              fontWeight: 950,
              letterSpacing: 2,
              lineHeight: 1.1,
              textAlign: 'center',
              textTransform: 'uppercase',
              textDecoration: 'underline',
              textDecorationThickness: 4,
              textUnderlineOffset: 6,
            }}
          >
            Capacity limit reached
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}