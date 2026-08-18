import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene10() {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  const entrance = spring({
    frame,
    fps,
    config: {damping: 14, stiffness: 120, mass: 0.75},
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames],
    [1, 0],
    clamp,
  );

  const cardY = interpolate(entrance, [0, 1], [42, 0], clamp);
  const cardScale = interpolate(entrance, [0, 1], [0.96, 1], clamp);
  const focusBlur = interpolate(frame, [0, 8, 16], [9, 3, 0], clamp);

  const headlineDraw = interpolate(frame, [5, 19], [0, 1], clamp);
  const routeOne = interpolate(frame, [14, 30], [0, 1], clamp);
  const routeTwo = interpolate(frame, [28, 45], [0, 1], clamp);
  const routeThree = interpolate(frame, [43, 60], [0, 1], clamp);

  const smudgeOpacity = interpolate(
    frame,
    [25, 33, 40, 48],
    [0, 0.8, 0.8, 0],
    clamp,
  );

  const glareX = interpolate(frame, [7, 54], [-38, 138], clamp);
  const handX = interpolate(frame, [8, 60], [15, 83], clamp);
  const handY =
    interpolate(frame, [8, 25, 43, 60], [49, 34, 57, 35], clamp) +
    Math.sin(frame * 0.65) * 0.8;

  const markerRotation = interpolate(
    frame,
    [8, 25, 43, 60],
    [-18, 9, -12, 4],
    clamp,
  );

  const pulse = 1 + Math.sin(frame * 0.34) * 0.035;

  const checkpointData = [
    {
      number: '01',
      title: 'MAP THE PROCESS',
      note: 'START WITH THE JOB',
      x: 18,
      y: 59,
      start: 16,
      color: '#FF8A3D',
    },
    {
      number: '02',
      title: 'GUARD THE DATA',
      note: 'ROLES • RULES • AUDIT',
      x: 47,
      y: 36,
      start: 31,
      color: '#4DD0E1',
    },
    {
      number: '03',
      title: 'SHIP + MEASURE',
      note: 'OWNER • KPI • LOOP',
      x: 76,
      y: 59,
      start: 47,
      color: '#FF8A3D',
    },
  ];

  const activation = spring({
    frame: frame - 58,
    fps,
    config: {damping: 10, stiffness: 180, mass: 0.55},
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: 'transparent',
        backdropFilter: 'blur(24px) brightness(0.4)',
        opacity: exitOpacity,
        fontFamily:
          '"Arial Narrow", "Roboto Condensed", Arial, Helvetica, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(#39414B 1px, transparent 1px), linear-gradient(90deg, #39414B 1px, transparent 1px)',
          backgroundSize: '74px 74px',
          opacity: 0.16,
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '92%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
          padding: '28px 34px 26px',
          border: '2px solid #39414B',
          borderRadius: 28,
          backgroundColor: '#1A2026',
          boxShadow: '0 28px 0 #39414B',
          transform: `translateY(${cardY}px) scale(${cardScale})`,
          filter: `blur(${focusBlur}px)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            zIndex: 8,
            top: '-20%',
            bottom: '-20%',
            left: `${glareX}%`,
            width: '12%',
            backgroundColor: '#F4F4F4',
            opacity: 0.07,
            transform: 'skewX(-17deg)',
            pointerEvents: 'none',
          }}
        />

        <header
          style={{
            position: 'relative',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: 58,
            paddingBottom: 18,
            borderBottom: '2px solid #39414B',
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div
              style={{
                padding: '8px 14px',
                color: '#1A2026',
                backgroundColor: '#FF8A3D',
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              WAR ROOM / 10
            </div>
            <div
              style={{
                color: '#F4F4F4',
                fontSize: 15,
                fontWeight: 800,
                letterSpacing: 3,
              }}
            >
              LOW-CODE DELIVERY GLASS
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              color: '#4DD0E1',
              fontSize: 14,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: '#4DD0E1',
                transform: `scale(${pulse})`,
              }}
            />
            LIVE GUIDANCE
          </div>
        </header>

        <main
          style={{
            position: 'relative',
            zIndex: 2,
            flex: 1,
            minHeight: 0,
            marginTop: 18,
            border: '1px solid #39414B',
            borderRadius: 22,
            overflow: 'hidden',
            backgroundColor: '#1A2026',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 28,
              zIndex: 3,
            }}
          >
            <div
              style={{
                color: '#F4F4F4',
                fontSize: 34,
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: 2,
                transform: 'rotate(-1deg)',
              }}
            >
              BUILD THE RIGHT THING
            </div>

            <svg
              width="470"
              height="18"
              viewBox="0 0 470 18"
              style={{display: 'block', marginTop: 5}}
            >
              <path
                d="M4 10 C88 2 158 16 246 8 C319 2 389 14 466 5"
                fill="none"
                stroke="#FF8A3D"
                strokeWidth="6"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - headlineDraw}
              />
            </svg>
          </div>

          <div
            style={{
              position: 'absolute',
              right: 28,
              top: 22,
              padding: '10px 14px',
              border: '2px solid #4DD0E1',
              borderRadius: 10,
              color: '#4DD0E1',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 2,
              transform: 'rotate(1.5deg)',
            }}
          >
            ROADMAP / BEST PRACTICES
          </div>

          <svg
            viewBox="0 0 1000 430"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              inset: '15% 3% 5%',
              width: '94%',
              height: '80%',
              overflow: 'visible',
            }}
          >
            <path
              d="M180 286 C260 280 314 151 455 151"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - routeOne}
            />
            <path
              d="M455 151 C550 151 588 282 745 282"
              fill="none"
              stroke="#4DD0E1"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - routeTwo}
            />
            <path
              d="M745 282 C823 282 842 205 900 180"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="8"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - routeThree}
            />

            <path
              d="M430 139 L458 151 L432 166"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={routeOne}
            />
            <path
              d="M716 270 L746 282 L720 299"
              fill="none"
              stroke="#4DD0E1"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={routeTwo}
            />
            <path
              d="M869 179 L901 180 L885 205"
              fill="none"
              stroke="#FF8A3D"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={routeThree}
            />

            <path
              d="M265 225 C340 188 393 254 471 221"
              fill="none"
              stroke="#F4F4F4"
              strokeWidth="24"
              strokeLinecap="round"
              opacity={smudgeOpacity * 0.12}
            />
            <path
              d="M278 236 C353 203 399 265 488 226"
              fill="none"
              stroke="#39414B"
              strokeWidth="15"
              strokeLinecap="round"
              opacity={smudgeOpacity}
            />
          </svg>

          {checkpointData.map((item) => {
            const pointSpring = spring({
              frame: frame - item.start,
              fps,
              config: {damping: 9, stiffness: 180, mass: 0.55},
            });
            const pointScale = interpolate(pointSpring, [0, 1], [0.35, 1], clamp);

            return (
              <div
                key={item.number}
                style={{
                  position: 'absolute',
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  width: 230,
                  transform: `translate(-50%, -50%) scale(${pointScale}) rotate(${
                    item.number === '02' ? -1.2 : 1
                  }deg)`,
                  transformOrigin: 'center',
                  opacity: interpolate(pointSpring, [0, 0.5], [0, 1], clamp),
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    margin: '0 auto 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.color,
                    border: `6px solid ${item.color}`,
                    borderRadius: '50%',
                    fontSize: 26,
                    fontWeight: 950,
                    transform: `rotate(${item.number === '02' ? 3 : -4}deg)`,
                  }}
                >
                  {item.number}
                </div>
                <div
                  style={{
                    padding: '9px 8px 8px',
                    color: '#F4F4F4',
                    backgroundColor: '#1A2026',
                    border: '2px solid #39414B',
                    borderRadius: 7,
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 950,
                    letterSpacing: 1.5,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    color: item.color,
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 900,
                    letterSpacing: 1.8,
                  }}
                >
                  {item.note}
                </div>
              </div>
            );
          })}

          <div
            style={{
              position: 'absolute',
              left: `${handX}%`,
              top: `${handY}%`,
              zIndex: 7,
              width: 135,
              height: 170,
              transform: `translate(-15%, -18%) rotate(${markerRotation}deg)`,
              transformOrigin: '74px 30px',
              opacity: interpolate(frame, [5, 11, 62, 70], [0, 1, 1, 0], clamp),
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 60,
                top: 0,
                width: 18,
                height: 82,
                borderRadius: 9,
                backgroundColor: '#F4F4F4',
                border: '3px solid #39414B',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 60,
                top: -12,
                width: 18,
                height: 18,
                borderRadius: '50% 50% 20% 20%',
                backgroundColor: '#FF8A3D',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 25,
                top: 58,
                width: 92,
                height: 88,
                borderRadius: '48px 48px 22px 22px',
                backgroundColor: '#F4F4F4',
                border: '4px solid #39414B',
                transform: 'rotate(-7deg)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 4,
                top: 74,
                width: 60,
                height: 24,
                borderRadius: 14,
                backgroundColor: '#F4F4F4',
                border: '4px solid #39414B',
                transform: 'rotate(28deg)',
              }}
            />
          </div>
        </main>

        <footer
          style={{
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            minHeight: 72,
            paddingTop: 17,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              color: '#F4F4F4',
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 1.5,
            }}
          >
            <span style={{color: '#FF8A3D'}}>→</span>
            HUMAN OWNER
            <span style={{color: '#4DD0E1'}}>→</span>
            GOVERNED DATA
            <span style={{color: '#FF8A3D'}}>→</span>
            MEASURABLE OUTCOME
          </div>

          <div
            style={{
              padding: '12px 20px',
              color: '#1A2026',
              backgroundColor: '#4DD0E1',
              borderRadius: 9,
              fontSize: 15,
              fontWeight: 950,
              letterSpacing: 2.5,
              transform: `scale(${interpolate(
                activation,
                [0, 1],
                [0.75, 1],
                clamp,
              )})`,
              opacity: interpolate(activation, [0, 0.5], [0, 1], clamp),
            }}
          >
            ACTIVATION CODE: BUILD / TEST / LEARN
          </div>
        </footer>
      </div>
    </AbsoluteFill>
  );
}