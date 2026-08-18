import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_62() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // Beat 1: Snappy entrance
  const badgeEntrance = spring({
    frame: frame - 2,
    fps,
    config: {damping: 12, stiffness: 260, mass: 0.55},
  });

  const cardEntrance = spring({
    frame: frame - 6,
    fps,
    config: {damping: 13, stiffness: 220, mass: 0.7},
  });

  const footerEntrance = spring({
    frame: frame - 10,
    fps,
    config: {damping: 12, stiffness: 210, mass: 0.75},
  });

  // Beat 2: Route/state motion
  const routeProgress = interpolate(frame, [14, 64], [0, 1], clamp);
  const lineSwitch = interpolate(frame, [52, 80], [0, 1], clamp);
  const interchangePop = spring({
    frame: frame - 48,
    fps,
    config: {damping: 10, stiffness: 240, mass: 0.55},
  });

  // Beat 3: Living hover
  const hoverY = Math.sin(frame * 0.12) * 8;
  const hoverTilt = Math.sin(frame * 0.08) * 2.0;
  const badgeFloat = Math.sin(frame * 0.1) * 3;
  const footerFloat = Math.sin(frame * 0.12 + 1.1) * 3;
  const shineOffset = interpolate((frame + 16) % 72, [0, 72], [-260, 980], clamp);

  const pulseA = 1 + Math.sin(frame * 0.22) * 0.08;
  const pulseB = 1 + Math.sin(frame * 0.22 + 1.3) * 0.08;
  const pulseC = 1 + Math.sin(frame * 0.22 + 2.1) * 0.08;
  const pulseD = 1 + Math.sin(frame * 0.22 + 2.9) * 0.08;

  const cardShadow = 18 + Math.sin(frame * 0.18) * 4;

  const opacity = interpolate(
    frame,
    [0, 5, durationInFrames - 8, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp
  );

  const exitLift = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames - 1],
    [0, -40],
    clamp
  );

  // Metric state switch
  const showCommission = frame >= 40;
  const metricTop = showCommission ? '50%' : 'AUTO';
  const metricBottom = showCommission ? 'COMMISSION' : 'MARGIN';

  // Route drawing helpers
  const seg1 = interpolate(routeProgress, [0, 0.22], [0, 180], clamp);
  const seg2 = interpolate(routeProgress, [0.22, 0.48], [0, 220], clamp);
  const seg3 = interpolate(routeProgress, [0.48, 0.74], [0, 180], clamp);
  const seg4 = interpolate(routeProgress, [0.74, 1], [0, 180], clamp);

  const station1On = routeProgress > 0.06;
  const station2On = routeProgress > 0.24;
  const station3On = routeProgress > 0.52;
  const station4On = routeProgress > 0.78;
  const station5On = routeProgress > 0.96;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F8F8F5',
        fontFamily:
          '"Arial Rounded MT Bold", "Avenir Next", "Trebuchet MS", "Helvetica Neue", Arial, sans-serif',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          width: '94%',
          maxWidth: 980,
          height: '88%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '44px 18px 36px',
          boxSizing: 'border-box',
          transform: `translateY(${exitLift}px)`,
        }}
      >
        {/* Tier 1: Category badge */}
        <div
          style={{
            transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
            backgroundColor: '#FFFFFF',
            border: '3px solid #1C1C1C',
            borderRadius: 999,
            padding: '12px 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              backgroundColor: '#E32017',
              border: '3px solid #1C1C1C',
              boxSizing: 'border-box',
            }}
          />
          <div
            style={{
              color: '#1C1C1C',
              fontSize: 20,
              fontWeight: 900,
              letterSpacing: 2.5,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            TRANSIT MAP MODEL
          </div>
        </div>

        {/* Tier 2: Massive hero card */}
        <div
          style={{
            width: '100%',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '22px 0',
            transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
          }}
        >
          <div
            style={{
              width: '100%',
              minHeight: 548,
              backgroundColor: '#FFFFFF',
              border: '6px solid #00782A',
              borderRadius: 34,
              boxShadow: `0 ${cardShadow}px 34px rgba(0,0,0,0.12)`,
              position: 'relative',
              overflow: 'hidden',
              padding: '34px 34px 30px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Shine */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 120,
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)',
                transform: `translateX(${shineOffset}px) skewX(-20deg)`,
                pointerEvents: 'none',
              }}
            />

            {/* Top line labels */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    backgroundColor: '#003688',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 900,
                    border: '3px solid #1C1C1C',
                    boxSizing: 'border-box',
                  }}
                >
                  1
                </div>
                <div
                  style={{
                    color: '#1C1C1C',
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: 0.5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Margin Line
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                    backgroundColor:
                      lineSwitch < 0.5 ? '#E32017' : '#003688',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 900,
                    border: '3px solid #1C1C1C',
                    boxSizing: 'border-box',
                  }}
                >
                  {lineSwitch < 0.5 ? 'A' : 'B'}
                </div>
                <div
                  style={{
                    color: '#1C1C1C',
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: 0.5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Auto Transfer
                </div>
              </div>
            </div>

            {/* Headline */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                marginTop: 6,
                textAlign: 'center',
                padding: '0 12px',
              }}
            >
              <div
                style={{
                  color: '#1C1C1C',
                  fontSize: 72,
                  lineHeight: 0.98,
                  fontWeight: 1000,
                  letterSpacing: -2,
                  textTransform: 'uppercase',
                }}
              >
                AUTOMATED MARGINS
              </div>
            </div>

            {/* Map + metric zone */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'grid',
                gridTemplateColumns: '1.15fr 0.85fr',
                gap: 28,
                alignItems: 'center',
                minHeight: 240,
                marginTop: 8,
              }}
            >
              {/* Left map diagram */}
              <div
                style={{
                  height: 230,
                  border: '3px solid #1C1C1C',
                  borderRadius: 24,
                  backgroundColor: '#F8F8F5',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 18,
                  boxSizing: 'border-box',
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 420 190"
                  style={{display: 'block'}}
                >
                  {/* Route track background */}
                  <path
                    d="M30 145 H210 V75 H390"
                    fill="none"
                    stroke="#D7D7D2"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Active route segments */}
                  <path
                    d={`M30 145 H${30 + seg1}`}
                    fill="none"
                    stroke="#E32017"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M210 145 V${145 - seg2}`}
                    fill="none"
                    stroke={lineSwitch < 0.5 ? '#E32017' : '#003688'}
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M210 75 H${210 + seg3}`}
                    fill="none"
                    stroke="#003688"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d={`M390 75 H${390 - (180 - seg4)}`}
                    fill="none"
                    stroke="#00782A"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />

                  {/* Stations */}
                  <g transform="translate(30 145) scale(1)">
                    <circle
                      r={station1On ? 12 * pulseA : 10}
                      fill="#FFFFFF"
                      stroke="#1C1C1C"
                      strokeWidth="4"
                    />
                  </g>

                  <g transform="translate(210 145)">
                    <circle
                      r={station2On ? 12 * pulseB : 10}
                      fill="#FFFFFF"
                      stroke="#1C1C1C"
                      strokeWidth="4"
                    />
                  </g>

                  <g
                    transform={`translate(210 75) scale(${1 + interchangePop * 0.14})`}
                  >
                    <circle
                      r={station3On ? 15 * pulseC : 12}
                      fill="#FFFFFF"
                      stroke="#1C1C1C"
                      strokeWidth="5"
                    />
                    <circle
                      r={24}
                      fill="none"
                      stroke="rgba(227,32,23,0.22)"
                      strokeWidth="8"
                      opacity={station3On ? 0.9 : 0}
                    />
                  </g>

                  <g transform="translate(300 75)">
                    <circle
                      r={station4On ? 12 * pulseD : 10}
                      fill="#FFFFFF"
                      stroke="#1C1C1C"
                      strokeWidth="4"
                    />
                  </g>

                  <g transform="translate(390 75)">
                    <circle
                      r={station5On ? 12 * pulseA : 10}
                      fill="#FFFFFF"
                      stroke="#1C1C1C"
                      strokeWidth="4"
                    />
                  </g>
                </svg>

                {/* Station labels positioned away from lines */}
                <div
                  style={{
                    position: 'absolute',
                    left: 16,
                    bottom: 18,
                    color: '#1C1C1C',
                    fontSize: 16,
                    fontWeight: 900,
                    backgroundColor: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: 10,
                    border: '2px solid #1C1C1C',
                  }}
                >
                  Lead In
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: 150,
                    bottom: 18,
                    color: '#1C1C1C',
                    fontSize: 16,
                    fontWeight: 900,
                    backgroundColor: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: 10,
                    border: '2px solid #1C1C1C',
                  }}
                >
                  Automation
                </div>

                <div
                  style={{
                    position: 'absolute',
                    left: 164,
                    top: 18,
                    color: '#1C1C1C',
                    fontSize: 16,
                    fontWeight: 900,
                    backgroundColor: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: 10,
                    border: '2px solid #1C1C1C',
                    transform: `scale(${1 + interchangePop * 0.05})`,
                  }}
                >
                  Interchange
                </div>

                <div
                  style={{
                    position: 'absolute',
                    right: 86,
                    top: 18,
                    color: '#1C1C1C',
                    fontSize: 16,
                    fontWeight: 900,
                    backgroundColor: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: 10,
                    border: '2px solid #1C1C1C',
                  }}
                >
                  Switch
                </div>

                <div
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: 18,
                    color: '#1C1C1C',
                    fontSize: 16,
                    fontWeight: 900,
                    backgroundColor: '#FFFFFF',
                    padding: '4px 8px',
                    borderRadius: 10,
                    border: '2px solid #1C1C1C',
                  }}
                >
                  Profit
                </div>
              </div>

              {/* Right metric block */}
              <div
                style={{
                  height: 230,
                  border: '4px solid #1C1C1C',
                  borderRadius: 28,
                  backgroundColor: lineSwitch < 0.5 ? '#E32017' : '#003688',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  padding: '20px 16px',
                  boxSizing: 'border-box',
                  boxShadow: '0 10px 22px rgba(0,0,0,0.12)',
                  transform: `scale(${1 + interchangePop * 0.04})`,
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 999,
                    backgroundColor: '#FFFFFF',
                    border: '4px solid #1C1C1C',
                    color: '#1C1C1C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    fontWeight: 1000,
                    marginBottom: 14,
                  }}
                >
                  {lineSwitch < 0.5 ? 'A' : 'B'}
                </div>

                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: 68,
                    lineHeight: 0.9,
                    fontWeight: 1000,
                    letterSpacing: -2,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {metricTop}
                </div>

                <div
                  style={{
                    color: '#FFFFFF',
                    fontSize: 26,
                    lineHeight: 1,
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    marginTop: 10,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {metricBottom}
                </div>
              </div>
            </div>

            {/* Bottom internal tag */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'center',
                marginTop: 6,
              }}
            >
              <div
                style={{
                  backgroundColor: '#00782A',
                  color: '#FFFFFF',
                  border: '3px solid #1C1C1C',
                  borderRadius: 999,
                  padding: '12px 24px',
                  fontSize: 22,
                  fontWeight: 900,
                  letterSpacing: 2.2,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                ROUTE TO HIGHER TAKE RATE
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: takeaway */}
        <div
          style={{
            transform: `scale(${footerEntrance}) translateY(${footerFloat}px)`,
            backgroundColor: '#1C1C1C',
            borderRadius: 22,
            padding: '16px 30px',
            boxShadow: '0 8px 18px rgba(0,0,0,0.14)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              color: '#F8F8F5',
              fontSize: 22,
              fontWeight: 1000,
              letterSpacing: 2,
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            PURE SOFTWARE LEVERAGE
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}