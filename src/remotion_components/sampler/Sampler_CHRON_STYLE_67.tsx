import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_67() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: entrance
  const badgeIn = spring({
    frame: frame - 2,
    fps,
    config: {damping: 12, stiffness: 260, mass: 0.55},
  });

  const cardIn = spring({
    frame: frame,
    fps,
    config: {damping: 11, stiffness: 220, mass: 0.7},
  });

  const takeawayIn = spring({
    frame: frame - 5,
    fps,
    config: {damping: 12, stiffness: 220, mass: 0.65},
  });

  // Beat 2: metric state roll
  const metricNumber = Math.round(interpolate(frame, [14, 52], [12, 50], clamp));
  const metricText = `${metricNumber}% COMMISSION`;

  const accentPulse = interpolate(frame, [28, 36, 44], [0.95, 1.06, 1], clamp);
  const flarePop = spring({
    frame: frame - 30,
    fps,
    config: {damping: 9, stiffness: 280, mass: 0.45},
  });

  // Beat 3: living hover loop
  const hoverY = Math.sin(frame * 0.12) * 8;
  const hoverTilt = Math.sin(frame * 0.08) * 2.1;
  const orbFloatA = Math.sin(frame * 0.09) * 10;
  const orbFloatB = Math.sin(frame * 0.11 + 1.7) * 12;
  const orbFloatC = Math.sin(frame * 0.1 + 3.2) * 9;
  const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-300, 1100], clamp);

  const globalOpacity = interpolate(
    frame,
    [0, 6, durationInFrames - 10, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp
  );

  const exitY = interpolate(
    frame,
    [durationInFrames - 12, durationInFrames - 1],
    [0, -40],
    clamp
  );

  const chromeText: React.CSSProperties = {
    background: 'linear-gradient(180deg, #ffffff 0%, #dfe6ff 18%, #3D5AFE 52%, #f5f8ff 73%, #FF6EC7 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextStroke: '2px rgba(11,11,18,0.92)',
    textShadow:
      '0 4px 0 rgba(255,255,255,0.28), 0 10px 20px rgba(61,90,254,0.16)',
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#D8DEE6',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Arial Black", Impact, "Helvetica Neue", sans-serif',
        opacity: globalOpacity,
      }}
    >
      <div
        style={{
          width: '94%',
          maxWidth: 980,
          height: '88%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '42px 12px 30px',
          boxSizing: 'border-box',
          transform: `translateY(${exitY}px)`,
          position: 'relative',
        }}
      >
        {/* background decorative chrome orbs */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 90 + orbFloatA,
            width: 86,
            height: 86,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 30% 30%, #ffffff 0%, #FF6EC7 28%, #3D5AFE 68%, #0B0B12 100%)',
            opacity: 0.26,
            filter: 'blur(1px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 28,
            top: 160 + orbFloatB,
            width: 54,
            height: 54,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 30%, #ffffff 0%, #C6FF00 24%, #3D5AFE 62%, #0B0B12 100%)',
            opacity: 0.34,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 70,
            bottom: 110 + orbFloatC,
            width: 74,
            height: 74,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 30% 30%, #ffffff 0%, #FF6EC7 22%, #3D5AFE 58%, #0B0B12 100%)',
            opacity: 0.24,
            pointerEvents: 'none',
          }}
        />

        {/* TIER 1 */}
        <div
          style={{
            transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
            background: 'linear-gradient(180deg, #0B0B12 0%, #161621 100%)',
            border: '3px solid #3D5AFE',
            borderRadius: 14,
            padding: '10px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 10px 22px rgba(11,11,18,0.18)',
            zIndex: 5,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#C6FF00',
              boxShadow: '0 0 12px rgba(198,255,0,0.9)',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              color: '#D8DEE6',
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 3,
              textTransform: 'uppercase',
              fontFamily: '"Courier New", monospace',
            }}
          >
            ACTIVATION CODE
          </div>
        </div>

        {/* TIER 2 */}
        <div
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            margin: '20px 0 18px',
            transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
          }}
        >
          <div
            style={{
              width: '100%',
              minHeight: 548,
              background:
                'linear-gradient(180deg, #0B0B12 0%, #141424 32%, #0B0B12 100%)',
              border: '4px solid #0B0B12',
              borderRadius: 34,
              boxShadow:
                '0 20px 46px rgba(11,11,18,0.28), inset 0 0 0 2px rgba(216,222,230,0.08)',
              padding: '44px 40px 40px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 24,
              position: 'relative',
              overflow: 'hidden',
              textAlign: 'center',
            }}
          >
            {/* chrome shine sweep */}
            <div
              style={{
                position: 'absolute',
                top: -30,
                bottom: -30,
                width: 120,
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 45%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.18) 58%, rgba(255,255,255,0) 100%)',
                transform: `translateX(${shineOffset}px) skewX(-22deg)`,
                pointerEvents: 'none',
              }}
            />

            {/* top flare */}
            <div
              style={{
                position: 'absolute',
                top: 26,
                right: 28,
                transform: `scale(${flarePop})`,
                opacity: flarePop,
                pointerEvents: 'none',
              }}
            >
              <svg width="54" height="54" viewBox="0 0 54 54">
                <g fill="none" stroke="#FF6EC7" strokeWidth="3" strokeLinecap="round">
                  <path d="M27 4 L27 16" />
                  <path d="M27 38 L27 50" />
                  <path d="M4 27 L16 27" />
                  <path d="M38 27 L50 27" />
                  <path d="M11 11 L18 18" />
                  <path d="M36 36 L43 43" />
                  <path d="M11 43 L18 36" />
                  <path d="M36 18 L43 11" />
                </g>
                <circle cx="27" cy="27" r="7" fill="#C6FF00" />
              </svg>
            </div>

            {/* headline block */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                paddingTop: 10,
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  color: '#C6FF00',
                  fontFamily: '"Courier New", monospace',
                  transform: 'skewX(-12deg)',
                }}
              >
                // SCALE ENGINE
              </div>

              <div
                style={{
                  ...chromeText,
                  fontSize: 74,
                  lineHeight: 0.96,
                  fontWeight: 1000,
                  letterSpacing: -2,
                  textTransform: 'uppercase',
                  maxWidth: '92%',
                }}
              >
                AUTOMATED
              </div>

              <div
                style={{
                  ...chromeText,
                  fontSize: 78,
                  lineHeight: 0.94,
                  fontWeight: 1000,
                  letterSpacing: -2,
                  textTransform: 'uppercase',
                  maxWidth: '92%',
                }}
              >
                MARGINS
              </div>
            </div>

            {/* metric block */}
            <div
              style={{
                transform: `scale(${accentPulse})`,
                background:
                  'linear-gradient(180deg, rgba(61,90,254,0.18) 0%, rgba(255,110,199,0.12) 100%)',
                border: '3px solid #3D5AFE',
                borderRadius: 26,
                padding: '18px 26px 20px',
                width: '82%',
                maxWidth: 720,
                boxShadow:
                  '0 14px 28px rgba(61,90,254,0.16), inset 0 0 0 1px rgba(255,255,255,0.08)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div
                style={{
                  color: '#FF6EC7',
                  fontSize: 14,
                  fontWeight: 900,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  fontFamily: '"Courier New", monospace',
                }}
              >
                LIVE PAYOUT
              </div>

              <div
                style={{
                  color: '#D8DEE6',
                  fontSize: 58,
                  fontWeight: 1000,
                  lineHeight: 1,
                  letterSpacing: -1.5,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  textShadow: '0 4px 16px rgba(255,110,199,0.22)',
                }}
              >
                {metricText}
              </div>
            </div>

            {/* bottom accent swoosh */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 6,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: 360,
                  height: 42,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg
                  width="360"
                  height="42"
                  viewBox="0 0 360 42"
                  style={{position: 'absolute', inset: 0}}
                >
                  <path
                    d="M18 28 C92 6, 262 6, 342 28"
                    fill="none"
                    stroke="#FF6EC7"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M40 34 C114 18, 244 18, 320 34"
                    fill="none"
                    stroke="#3D5AFE"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity={0.9}
                  />
                </svg>
                <div
                  style={{
                    position: 'relative',
                    backgroundColor: '#C6FF00',
                    color: '#0B0B12',
                    borderRadius: 999,
                    padding: '9px 22px',
                    fontSize: 18,
                    fontWeight: 1000,
                    letterSpacing: 2.5,
                    textTransform: 'uppercase',
                    boxShadow: '0 8px 18px rgba(198,255,0,0.26)',
                  }}
                >
                  AUTO-SCALE
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TIER 3 */}
        <div
          style={{
            transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1.1) * 3}px)`,
            background: 'linear-gradient(180deg, #3D5AFE 0%, #6E84FF 100%)',
            borderRadius: 22,
            padding: '16px 30px',
            boxShadow: '0 12px 26px rgba(61,90,254,0.22)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#ffffff',
              fontSize: 24,
              fontWeight: 1000,
              letterSpacing: 2,
              textTransform: 'uppercase',
              lineHeight: 1.1,
            }}
          >
            PURE SOFTWARE LEVERAGE
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}