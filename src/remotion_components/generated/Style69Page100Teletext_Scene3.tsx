import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export default function Style69Page100Teletext_Scene3() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = {
    extrapolateLeft: 'clamp' as const,
    extrapolateRight: 'clamp' as const,
  };

  // ------------------------------------------
  // Beat 1: Entrance
  // ------------------------------------------
  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 220, mass: 0.7 },
  });

  const badgeEntrance = spring({
    frame: frame - 3,
    fps,
    config: { damping: 11, stiffness: 230, mass: 0.6 },
  });

  const headerRoll = Math.round(interpolate(frame, [0, 16], [84, 100], clamp));
  const headerLockFlash = frame >= 14 && frame <= 18;

  const cardDrop = interpolate(frame, [0, 10], [-260, 0], clamp);
  const bounceY = Math.sin(Math.min(frame, 18) * 0.42) * interpolate(frame, [0, 18], [0, 16], clamp);

  // ------------------------------------------
  // Beat 2: Row replacement transformation
  // ------------------------------------------
  const replaceProgress = interpolate(frame, [30, 84], [0, 1], clamp);
  const totalRows = 10;
  const replacedRows = Math.floor(replaceProgress * totalRows);

  const thunkWindow = frame >= 36 && frame <= 48;
  const thunkOffset = thunkWindow ? 12 : 0;
  const baseShadow = thunkWindow ? 8 : 18;

  const anywhereVisible = frame >= 48;
  const noOfficeVisible = frame >= 58;
  const noOfficeFlash = frame >= 58 && frame <= 66 && frame % 4 < 2;

  // ------------------------------------------
  // Beat 3: Living teletext loop
  // ------------------------------------------
  const hoverY = Math.sin(frame * 0.12) * 8;
  const hoverTilt = Math.sin(frame * 0.08) * 2.1;
  const shadowPulse = baseShadow + Math.sin(frame * 0.18) * 4;
  const shineOffset = interpolate((frame + 18) % 72, [0, 72], [-320, 980], clamp);

  const crtShimmer = Math.sin(frame * 0.7) * 0.06;
  const refreshPulseRow = Math.floor(((frame - 84) % totalRows + totalRows) % totalRows);
  const cursorOn = frame % 16 < 8;

  // ------------------------------------------
  // Exit
  // ------------------------------------------
  const exitSlide = interpolate(
    frame,
    [durationInFrames - 10, durationInFrames - 1],
    [0, -60],
    clamp
  );
  const opacity = interpolate(
    frame,
    [0, 5, durationInFrames - 8, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp
  );

  const officeRows = [
    '████  ████  ████  ████',
    '█  █  █     █     █',
    '█  █  ███   ███   ███',
    '█  █  █     █       █',
    '████  █     █     ████',
    '▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓',
    '▓  ▓  ▓▓▓   ▓▓▓   ▓  ▓',
    '▓  ▓  ▓     ▓     ▓▓▓▓',
    '▓  ▓  ▓     ▓       ▓',
    '▓▓▓▓  ▓     ▓     ▓▓▓▓',
  ];

  const anywhereRows = [
    '████  █   █  █   █  █   █',
    '█  █  ██  █   █ █   ██  █',
    '████  █ █ █    █    █ █ █',
    '█  █  █  ██    █    █  ██',
    '█  █  █   █    █    █   █',
    '███   █ █ █  █   █  ███  ███',
    '█  █  ███ █   █ █   █  █ █',
    '███   █ █ █    █    ███  ██',
    '█     █   █    █    █ █  █',
    '█     █   █    █    █  █ ███',
  ];

  const renderRows = () => {
    return new Array(totalRows).fill(true).map((_, i) => {
      const isReplaced = i < replacedRows;
      const isActiveRefresh = frame >= 84 && i === refreshPulseRow;
      const text = isReplaced ? anywhereRows[i] : officeRows[i];
      const color = isReplaced ? '#00FF00' : i < 5 ? '#FFFF00' : '#00FFFF';

      return (
        <div
          key={i}
          style={{
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color,
            backgroundColor: isActiveRefresh ? 'rgba(255,255,255,0.08)' : 'transparent',
            transform: `translateX(${isActiveRefresh ? 6 : 0}px)`,
            textShadow:
              frame >= 84
                ? `0 0 ${1 + Math.abs(crtShimmer) * 18}px ${color}`
                : 'none',
            letterSpacing: 1,
            fontSize: isReplaced ? 70 : 64,
            fontWeight: 900,
            lineHeight: 1,
            whiteSpace: 'pre',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {text}
        </div>
      );
    });
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        opacity,
        fontFamily:
          '"Courier New", "Lucida Console", "SFMono-Regular", Monaco, monospace',
      }}
    >
      <div
        style={{
          width: '94%',
          height: '86%',
          margin: '0 auto',
          padding: '70px 16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          transform: `translateY(${exitSlide}px)`,
        }}
      >
        {/* Tier 1 */}
        <div
          style={{
            transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            padding: '12px 26px',
            border: '4px solid #FF0000',
            backgroundColor: headerLockFlash ? '#FFFF00' : '#000000',
            boxShadow: '6px 6px 0 #FF0000',
            borderRadius: 8,
          }}
        >
          <span
            style={{
              color: headerLockFlash ? '#000000' : '#00FFFF',
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            P{headerRoll}
          </span>
          <span
            style={{
              width: 12,
              height: 12,
              backgroundColor: '#00FF00',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              color: headerLockFlash ? '#000000' : '#FFFF00',
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            TELETEXT TRANSFORM
          </span>
        </div>

        {/* Tier 2 */}
        <div
          style={{
            width: '100%',
            flex: 1,
            margin: '24px 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            transform: `scale(${entrance}) translateY(${cardDrop + bounceY + hoverY + thunkOffset}px) rotate(${hoverTilt}deg)`,
          }}
        >
          <div
            style={{
              width: '100%',
              minHeight: 540,
              border: '7px solid #FF0000',
              backgroundColor: '#000000',
              boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #FF0000`,
              borderRadius: 22,
              padding: '34px 28px 36px 28px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 22,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shine / scan sweep */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 120,
                background:
                  'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,255,255,0.18) 50%, rgba(0,0,0,0) 100%)',
                transform: `translateX(${shineOffset}px) skewX(-18deg)`,
                pointerEvents: 'none',
              }}
            />

            {/* CRT scanlines */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 8px)',
                opacity: 0.25,
                pointerEvents: 'none',
                mixBlendMode: 'screen',
              }}
            />

            {/* Header bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 16,
                borderBottom: '4px solid #00FFFF',
                paddingBottom: 16,
              }}
            >
              <div
                style={{
                  color: '#FFFF00',
                  fontSize: 32,
                  fontWeight: 900,
                  letterSpacing: 3,
                  textTransform: 'uppercase',
                }}
              >
                PAGE 100
              </div>
              <div
                style={{
                  color: '#00FFFF',
                  fontSize: 30,
                  fontWeight: 900,
                  letterSpacing: 2,
                }}
              >
                LIVE
              </div>
            </div>

            {/* Massive teletext board */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
                position: 'relative',
              }}
            >
              {renderRows()}

              {/* Cursor */}
              {anywhereVisible && (
                <div
                  style={{
                    position: 'absolute',
                    right: 46,
                    top: '50%',
                    transform: 'translateY(-12px)',
                    width: 22,
                    height: 22,
                    backgroundColor: cursorOn ? '#00FF00' : 'transparent',
                    border: '3px solid #00FF00',
                  }}
                />
              )}
            </div>

            {/* Toggle bar */}
            <div
              style={{
                alignSelf: 'center',
                minHeight: 64,
                padding: '12px 24px',
                border: '4px solid #FF0000',
                backgroundColor:
                  noOfficeVisible && noOfficeFlash ? '#FF0000' : '#000000',
                color: noOfficeVisible && noOfficeFlash ? '#000000' : '#FF0000',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: 'uppercase',
                opacity: noOfficeVisible ? 1 : 0.2,
              }}
            >
              NO OFFICE NEEDED
            </div>
          </div>
        </div>

        {/* Tier 3 */}
        <div
          style={{
            transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
            backgroundColor: '#FFFF00',
            color: '#000000',
            border: '4px solid #00FFFF',
            borderRadius: 10,
            boxShadow: '6px 6px 0 #00FFFF',
            padding: '16px 28px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            WORK FROM ANY TERMINAL
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}