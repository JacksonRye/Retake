import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style35MessageBoardY2KForum_Scene5() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // =========================
  // BEAT 1: PANEL ENTRANCE
  // =========================
  const panelEntrance = spring({
    frame,
    fps,
    config: {
      damping: 11,
      stiffness: 180,
      mass: 0.7,
    },
  });

  const panelX = interpolate(panelEntrance, [0, 0.72, 1], [-1200, 80, 0], clamp);
  const panelScale = interpolate(panelEntrance, [0, 1], [0.92, 1], clamp);
  const panelOpacity = interpolate(panelEntrance, [0, 0.15], [0, 1], clamp);

  const borderShake =
    frame < 30
      ? Math.sin(frame * 1.9) * interpolate(frame, [0, 30], [18, 0], clamp)
      : 0;

  // =========================
  // BEAT 2: LEADERBOARD PASS
  // =========================
  const raceProgress = spring({
    frame: frame - 28,
    fps,
    config: {
      damping: 15,
      stiffness: 140,
      mass: 0.85,
    },
  });

  const movingRowY = interpolate(raceProgress, [0, 1], [150, 0], clamp);
  const row2Y = interpolate(raceProgress, [0, 1], [0, 72], clamp);
  const row3Y = interpolate(raceProgress, [0, 1], [72, 144], clamp);
  const row4Y = interpolate(raceProgress, [0, 1], [144, 216], clamp);

  const movingRowScale = interpolate(raceProgress, [0, 1], [0.97, 1.03], clamp);
  const movingRowShadow = interpolate(raceProgress, [0, 1], [4, 10], clamp);

  const trailingBlur2 = interpolate(raceProgress, [0, 1], [0, 1.5], clamp);
  const trailingBlur3 = interpolate(raceProgress, [0, 1], [0, 2.5], clamp);
  const trailingBlur4 = interpolate(raceProgress, [0, 1], [0, 3.5], clamp);

  const postsCount = Math.round(interpolate(frame, [30, 78], [184, 1280], clamp));
  const repCount = Math.round(interpolate(frame, [30, 78], [22, 347], clamp));

  const postsFormatted = postsCount.toLocaleString();
  const repFormatted = repCount.toLocaleString();

  // =========================
  // BEAT 3: LIVING HOLD + EXIT
  // =========================
  const hoverY = frame >= 84 ? Math.sin((frame - 84) * 0.12) * 6 : 0;
  const hoverTilt = frame >= 84 ? Math.sin((frame - 84) * 0.08) * 1.1 : 0;
  const crtFlicker = 0.985 + (Math.sin(frame * 0.9) + Math.sin(frame * 0.37)) * 0.012;

  const badgePulse = interpolate(Math.sin(frame * 0.18), [-1, 1], [1, 1.08]);
  const badgeGlow = interpolate(Math.sin(frame * 0.18), [-1, 1], [4, 10]);

  const marqueeOffset = interpolate(frame, [84, 135], [0, -180], clamp);

  const exitProgress = spring({
    frame: frame - (durationInFrames - 10),
    fps,
    config: {
      damping: 12,
      stiffness: 240,
      mass: 0.7,
    },
  });

  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

  const finalOpacity = panelOpacity * exitOpacity;
  const finalScale = panelScale * exitScale;

  const forumRows = [
    { rank: '02', user: 'netpilot', title: 'Senior Member', posts: '952', rep: '188' },
    { rank: '03', user: 'threadwarp', title: 'Power Poster', posts: '817', rep: '141' },
    { rank: '04', user: 'modemrush', title: 'Regular', posts: '744', rep: '119' },
  ];

  const rowBaseStyle: React.CSSProperties = {
    width: '100%',
    minHeight: 58,
    display: 'grid',
    gridTemplateColumns: '78px 1.4fr 1fr 120px 110px',
    alignItems: 'center',
    gap: 12,
    padding: '10px 14px',
    borderBottom: '2px solid #2C3E70',
    boxSizing: 'border-box',
    fontFamily: 'Verdana, Geneva, sans-serif',
    fontSize: 20,
    color: '#2C3E70',
    backgroundColor: '#F4F2EC',
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#D6D9DE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Verdana, Geneva, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(180deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, rgba(0,0,0,0.02) 2px, rgba(0,0,0,0.02) 4px)',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          width: '92%',
          minHeight: 560,
          backgroundColor: '#F4F2EC',
          border: '4px solid #2C3E70',
          boxShadow: `0px ${14 + movingRowShadow}px 0px #2C3E70`,
          opacity: finalOpacity * crtFlicker,
          transform: `translateX(${panelX}px) translateY(${borderShake + hoverY}px) scale(${finalScale}) rotate(${hoverTilt}deg)`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top browser/forum chrome */}
        <div
          style={{
            height: 54,
            backgroundColor: '#D6D9DE',
            borderBottom: '4px solid #2C3E70',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 14, height: 14, backgroundColor: '#E25822', border: '2px solid #2C3E70' }} />
            <div style={{ width: 14, height: 14, backgroundColor: '#F4F2EC', border: '2px solid #2C3E70' }} />
            <div style={{ width: 14, height: 14, backgroundColor: '#0000EE', border: '2px solid #2C3E70' }} />
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#2C3E70',
              letterSpacing: '0.02em',
            }}
          >
            CHRON BOARD / RANKINGS / ACTIVATION CODE
          </div>
        </div>

        {/* Header */}
        <div
          style={{
            padding: '22px 26px 16px 26px',
            borderBottom: '3px solid #2C3E70',
            backgroundColor: '#F4F2EC',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 24,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                minWidth: 0,
                flex: 1,
              }}
            >
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: '#0000EE',
                  textDecoration: 'underline',
                  lineHeight: 1.15,
                  wordBreak: 'break-word',
                }}
              >
                leaderboard.php?mode=velocity
              </div>
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 800,
                  color: '#2C3E70',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                }}
              >
                ACTIVATION CODE
              </div>
            </div>

            <div
              style={{
                alignSelf: 'center',
                transform: `scale(${badgePulse})`,
                backgroundColor: '#E25822',
                color: '#F4F2EC',
                border: '3px solid #2C3E70',
                boxShadow: `0px ${badgeGlow}px 0px #2C3E70`,
                padding: '10px 18px',
                fontSize: 20,
                fontWeight: 800,
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              [TOP 01]
            </div>
          </div>

          <div
            style={{
              fontSize: 24,
              lineHeight: 1.25,
              color: '#2C3E70',
              fontWeight: 700,
              maxWidth: '100%',
            }}
          >
            “As always, most people won't do this, but those who do will blow past everyone else.”
          </div>
        </div>

        {/* Table head */}
        <div
          style={{
            ...rowBaseStyle,
            minHeight: 52,
            backgroundColor: '#D6D9DE',
            fontSize: 18,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            color: '#2C3E70',
            borderBottom: '3px solid #2C3E70',
          }}
        >
          <div>Rank</div>
          <div>User</div>
          <div>Title</div>
          <div>Posts</div>
          <div>Rep</div>
        </div>

        {/* Animated leaderboard area */}
        <div
          style={{
            position: 'relative',
            height: 288,
            overflow: 'hidden',
            backgroundColor: '#F4F2EC',
            borderBottom: '3px solid #2C3E70',
          }}
        >
          {/* Moving hero row */}
          <div
            style={{
              ...rowBaseStyle,
              position: 'absolute',
              left: 0,
              top: movingRowY,
              zIndex: 5,
              backgroundColor: '#FFF6C7',
              transform: `scale(${movingRowScale})`,
              boxShadow: `0px ${movingRowShadow}px 0px rgba(44,62,112,0.95)`,
              borderTop: '2px solid #2C3E70',
              borderBottom: '3px solid #2C3E70',
            }}
          >
            <div
              style={{
                fontWeight: 800,
                color: '#E25822',
                fontSize: 24,
              }}
            >
              01
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                minWidth: 0,
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  border: '2px solid #2C3E70',
                  backgroundColor: '#0000EE',
                  imageRendering: 'pixelated',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      frame < 48
                        ? 'repeating-linear-gradient(90deg, #0000EE 0px, #0000EE 4px, #D6D9DE 4px, #D6D9DE 8px)'
                        : 'linear-gradient(180deg, #0000EE 0%, #2C3E70 100%)',
                    opacity: 0.95,
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: '#0000EE',
                    textDecoration: 'underline',
                    lineHeight: 1.05,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  boldsignal
                </div>
                <div
                  style={{
                    fontSize: 15,
                    color: '#2C3E70',
                    lineHeight: 1.1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  online now
                </div>
              </div>
            </div>

            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: '#2C3E70',
                whiteSpace: 'nowrap',
              }}
            >
              Elite Member
            </div>

            <div
              style={{
                fontWeight: 800,
                fontSize: 26,
                color: '#E25822',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {postsFormatted}
            </div>

            <div
              style={{
                fontWeight: 800,
                fontSize: 26,
                color: '#2C3E70',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {repFormatted}
            </div>
          </div>

          {/* Static rows shifting downward */}
          {forumRows.map((row, i) => {
            const topPositions = [row2Y, row3Y, row4Y];
            const blurValues = [trailingBlur2, trailingBlur3, trailingBlur4];

            return (
              <div
                key={row.user}
                style={{
                  ...rowBaseStyle,
                  position: 'absolute',
                  left: 0,
                  top: topPositions[i],
                  zIndex: 2,
                  filter: `blur(${blurValues[i]}px)`,
                  opacity: interpolate(raceProgress, [0, 1], [1, 0.72 - i * 0.08], clamp),
                }}
              >
                <div style={{ fontWeight: 800 }}>{row.rank}</div>

                <div
                  style={{
                    minWidth: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      border: '2px solid #2C3E70',
                      backgroundColor: i % 2 === 0 ? '#D6D9DE' : '#0000EE',
                      boxSizing: 'border-box',
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      color: '#0000EE',
                      textDecoration: 'underline',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {row.user}
                  </div>
                </div>

                <div
                  style={{
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {row.title}
                </div>

                <div style={{ fontWeight: 700 }}>{row.posts}</div>
                <div style={{ fontWeight: 700 }}>{row.rep}</div>
              </div>
            );
          })}
        </div>

        {/* Footer stats / marquee */}
        <div
          style={{
            padding: '18px 22px 20px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            backgroundColor: '#F4F2EC',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            <div
              style={{
                border: '3px solid #2C3E70',
                backgroundColor: '#D6D9DE',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  fontSize: 17,
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: '#2C3E70',
                  letterSpacing: '0.04em',
                }}
              >
                Separation
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: '#E25822',
                }}
              >
                +{Math.max(52, repCount - 95)}
              </div>
            </div>

            <div
              style={{
                border: '3px solid #2C3E70',
                backgroundColor: '#D6D9DE',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <div
                style={{
                  fontSize: 17,
                  textTransform: 'uppercase',
                  fontWeight: 800,
                  color: '#2C3E70',
                  letterSpacing: '0.04em',
                }}
              >
                Velocity
              </div>
              <div
                style={{
                  fontSize: 34,
                  fontWeight: 800,
                  lineHeight: 1,
                  color: '#0000EE',
                }}
              >
                outpacing
              </div>
            </div>
          </div>

          <div
            style={{
              height: 42,
              border: '3px solid #2C3E70',
              backgroundColor: '#D6D9DE',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: marqueeOffset,
                display: 'flex',
                alignItems: 'center',
                gap: 36,
                whiteSpace: 'nowrap',
                paddingLeft: 18,
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#0000EE',
                    textDecoration: 'underline',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  those who do
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}