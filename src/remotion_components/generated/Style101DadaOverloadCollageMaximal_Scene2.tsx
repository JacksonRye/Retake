import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = {
  background: '#E9DFC9',
  red: '#C3423F',
  blue: '#274690',
  gold: '#D9A31B',
  ink: '#191714',
};

const coins = [
  { x: 8, delay: 3, size: 74, drift: 18, rotation: -22 },
  { x: 21, delay: 8, size: 92, drift: -14, rotation: 18 },
  { x: 36, delay: 1, size: 64, drift: 20, rotation: -38 },
  { x: 51, delay: 13, size: 82, drift: -24, rotation: 29 },
  { x: 66, delay: 6, size: 68, drift: 17, rotation: 45 },
  { x: 81, delay: 17, size: 96, drift: -18, rotation: -17 },
  { x: 92, delay: 10, size: 58, drift: -20, rotation: 36 },
  { x: 14, delay: 29, size: 88, drift: 25, rotation: 21 },
  { x: 29, delay: 21, size: 62, drift: -17, rotation: -31 },
  { x: 44, delay: 35, size: 78, drift: 15, rotation: 14 },
  { x: 59, delay: 25, size: 98, drift: -22, rotation: -42 },
  { x: 74, delay: 39, size: 66, drift: 22, rotation: 33 },
  { x: 88, delay: 31, size: 84, drift: -19, rotation: -12 },
  { x: 5, delay: 46, size: 64, drift: 21, rotation: 38 },
  { x: 19, delay: 54, size: 80, drift: -20, rotation: -24 },
  { x: 38, delay: 43, size: 94, drift: 17, rotation: 16 },
  { x: 56, delay: 58, size: 60, drift: -13, rotation: 47 },
  { x: 71, delay: 49, size: 86, drift: 18, rotation: -34 },
  { x: 86, delay: 63, size: 72, drift: -23, rotation: 20 },
  { x: 27, delay: 69, size: 76, drift: 19, rotation: -18 },
  { x: 49, delay: 74, size: 90, drift: -16, rotation: 39 },
  { x: 77, delay: 67, size: 64, drift: 14, rotation: -27 },
];

const scraps = [
  { symbol: '$', top: '10%', left: '5%', color: palette.red, bg: palette.background, rotate: -15, delay: 16 },
  { symbol: '€', top: '19%', left: '78%', color: palette.background, bg: palette.blue, rotate: 13, delay: 25 },
  { symbol: '¥', top: '45%', left: '3%', color: palette.ink, bg: palette.gold, rotate: 9, delay: 38 },
  { symbol: '£', top: '58%', left: '78%', color: palette.background, bg: palette.red, rotate: -11, delay: 49 },
  { symbol: '%', top: '76%', left: '7%', color: palette.background, bg: palette.blue, rotate: 16, delay: 57 },
  { symbol: '↑', top: '82%', left: '75%', color: palette.ink, bg: palette.gold, rotate: -8, delay: 64 },
];

export default function Style101DadaOverloadCollageMaximal_Scene2() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const mainEntrance = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.65, stiffness: 145 },
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  const layerShuffle = Math.sin(frame * 0.31) * 3;
  const titleJump = spring({
    frame: frame - 8,
    fps,
    config: { damping: 7, mass: 0.45, stiffness: 210 },
  });
  const numberOne = spring({
    frame: frame - 24,
    fps,
    config: { damping: 8, mass: 0.55, stiffness: 180 },
  });
  const numberTwo = spring({
    frame: frame - 35,
    fps,
    config: { damping: 7, mass: 0.5, stiffness: 205 },
  });

  const wipe = interpolate(frame, [9, 32], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tickerX = interpolate(frame, [0, durationInFrames], [40, -410], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette.background,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '90%',
          maxWidth: 900,
          height: '86%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          border: `8px solid ${palette.ink}`,
          backgroundColor: palette.background,
          opacity: exit,
          transform: `scale(${0.86 + mainEntrance * 0.14}) rotate(${(1 - mainEntrance) * -2.5}deg)`,
          boxShadow: `18px 18px 0 ${palette.blue}`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 18,
            border: `3px dashed ${palette.ink}`,
            pointerEvents: 'none',
            zIndex: 30,
          }}
        />

        <div
          style={{
            position: 'absolute',
            top: 42,
            left: -80,
            width: '72%',
            height: 132,
            backgroundColor: palette.red,
            border: `5px solid ${palette.ink}`,
            transform: `translateX(${interpolate(mainEntrance, [0, 1], [-380, 0])}px) rotate(-5deg)`,
            zIndex: 4,
          }}
        />

        <div
          style={{
            width: '100%',
            height: '20%',
            minHeight: 250,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 12,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 26,
              right: 28,
              padding: '10px 18px',
              backgroundColor: palette.gold,
              color: palette.ink,
              border: `4px solid ${palette.ink}`,
              fontFamily: 'Arial Black, sans-serif',
              fontWeight: 900,
              fontSize: 22,
              letterSpacing: 3,
              transform: `rotate(7deg) translateY(${layerShuffle}px)`,
            }}
          >
            ACTIVATION CODE / 101
          </div>

          <div
            style={{
              color: palette.background,
              backgroundColor: palette.blue,
              border: `6px solid ${palette.ink}`,
              padding: '12px 34px 16px',
              fontFamily: 'Arial Black, Impact, sans-serif',
              fontSize: 74,
              fontWeight: 900,
              letterSpacing: -5,
              lineHeight: 0.9,
              textTransform: 'uppercase',
              transform: `translateY(34px) rotate(-2deg) scale(${0.75 + titleJump * 0.25})`,
              clipPath: `polygon(0 8%, ${wipe}% 0, ${wipe - 3}% 92%, 4% 100%)`,
              whiteSpace: 'nowrap',
            }}
          >
            MONEY! MONEY!
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: -14,
              left: 64,
              color: palette.ink,
              fontFamily: 'Georgia, serif',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 29,
              transform: 'rotate(-5deg)',
              backgroundColor: palette.background,
              borderBottom: `7px solid ${palette.red}`,
              padding: '3px 18px',
            }}
          >
            profit arrives loudly
          </div>
        </div>

        <div
          style={{
            width: '100%',
            flex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '14%',
              width: '84%',
              height: '51%',
              backgroundColor: palette.blue,
              border: `7px solid ${palette.ink}`,
              transform: `translate(${layerShuffle}px, ${-layerShuffle}px) rotate(3deg)`,
              zIndex: 2,
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '18%',
              width: '80%',
              height: '48%',
              backgroundColor: palette.red,
              border: `7px solid ${palette.ink}`,
              transform: `translate(${-layerShuffle * 1.5}px, ${layerShuffle}px) rotate(-4deg)`,
              zIndex: 3,
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '23%',
              width: '88%',
              height: '38%',
              backgroundColor: palette.background,
              border: `7px solid ${palette.ink}`,
              clipPath: 'polygon(0 7%, 12% 0, 24% 8%, 38% 1%, 51% 9%, 65% 2%, 81% 8%, 100% 0, 96% 91%, 82% 100%, 67% 93%, 50% 100%, 31% 91%, 14% 99%, 0 88%)',
              zIndex: 5,
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '22%',
              zIndex: 9,
              color: palette.ink,
              fontFamily: 'Impact, Arial Black, sans-serif',
              fontSize: 244,
              fontWeight: 900,
              lineHeight: 0.8,
              letterSpacing: -18,
              WebkitTextStroke: `5px ${palette.ink}`,
              transform: `translateX(-80px) rotate(-8deg) scale(${numberOne})`,
            }}
          >
            10
          </div>

          <div
            style={{
              position: 'absolute',
              top: '39%',
              zIndex: 10,
              color: palette.gold,
              fontFamily: 'Georgia, serif',
              fontSize: 284,
              fontWeight: 900,
              lineHeight: 0.7,
              letterSpacing: -22,
              WebkitTextStroke: `7px ${palette.ink}`,
              transform: `translateX(86px) rotate(7deg) scale(${numberTwo})`,
            }}
          >
            X
          </div>

          <div
            style={{
              position: 'absolute',
              top: '59%',
              zIndex: 13,
              color: palette.background,
              backgroundColor: palette.ink,
              border: `5px solid ${palette.gold}`,
              padding: '12px 30px',
              fontFamily: 'Courier New, monospace',
              fontSize: 31,
              fontWeight: 900,
              letterSpacing: 6,
              transform: `rotate(-3deg) scale(${0.7 + numberTwo * 0.3})`,
            }}
          >
            GAIN / GAIN / GAIN
          </div>

          {scraps.map((scrap, index) => {
            const scrapSpring = spring({
              frame: frame - scrap.delay,
              fps,
              config: { damping: 8, mass: 0.42, stiffness: 195 },
            });
            const cut = interpolate(
              frame,
              [scrap.delay, scrap.delay + 12],
              [0, 100],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );

            return (
              <div
                key={`${scrap.symbol}-${index}`}
                style={{
                  position: 'absolute',
                  top: scrap.top,
                  left: scrap.left,
                  zIndex: 16,
                  width: 120,
                  height: 104,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: scrap.color,
                  backgroundColor: scrap.bg,
                  border: `5px solid ${palette.ink}`,
                  fontFamily: index % 2 === 0 ? 'Georgia, serif' : 'Arial Black, sans-serif',
                  fontSize: 72,
                  fontWeight: 900,
                  clipPath: `polygon(0 0, ${cut}% 7%, ${cut - 5}% 100%, 8% 91%)`,
                  transform: `rotate(${scrap.rotate}deg) scale(${scrapSpring})`,
                }}
              >
                {scrap.symbol}
              </div>
            );
          })}

          {coins.map((coin, index) => {
            const fall = interpolate(
              frame,
              [coin.delay, coin.delay + 61],
              [-180, 1310],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );
            const coinEntrance = spring({
              frame: frame - coin.delay,
              fps,
              config: { damping: 7, mass: 0.32, stiffness: 220 },
            });
            const collision = frame > coin.delay + 54
              ? Math.sin((frame - coin.delay - 54) * 0.85) * Math.max(0, 18 - (frame - coin.delay - 54))
              : 0;
            const horizontalDrift =
              Math.sin((frame + index * 9) * 0.075) * coin.drift;

            return (
              <div
                key={`coin-${index}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${coin.x}%`,
                  zIndex: 20 + (index % 4),
                  width: coin.size,
                  height: coin.size,
                  borderRadius: '50%',
                  backgroundColor: palette.gold,
                  border: `6px solid ${palette.ink}`,
                  boxShadow: `${index % 2 === 0 ? 8 : -8}px 8px 0 ${palette.red}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: palette.ink,
                  fontFamily: 'Georgia, serif',
                  fontSize: coin.size * 0.53,
                  fontWeight: 900,
                  lineHeight: 1,
                  transform: `translate(-50%, ${fall + collision}px) translateX(${horizontalDrift}px) rotate(${coin.rotation + frame * (index % 2 === 0 ? 5 : -4)}deg) scale(${coinEntrance})`,
                }}
              >
                {index % 3 === 0 ? '¢' : '$'}
              </div>
            );
          })}
        </div>

        <div
          style={{
            width: '100%',
            height: '16%',
            minHeight: 210,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: palette.gold,
            borderTop: `8px solid ${palette.ink}`,
            overflow: 'hidden',
            zIndex: 25,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 16,
              transform: `translateX(${tickerX}px) rotate(-2deg)`,
              color: palette.red,
              fontFamily: 'Arial Black, Impact, sans-serif',
              fontWeight: 900,
              fontSize: 31,
              letterSpacing: 5,
              whiteSpace: 'nowrap',
            }}
          >
            OPPORTUNITY ◆ PROFIT ◆ WEALTH ◆ POTENTIAL ◆ OPPORTUNITY
          </div>

          <div
            style={{
              marginTop: 48,
              padding: '10px 28px',
              backgroundColor: palette.background,
              color: palette.ink,
              border: `5px solid ${palette.ink}`,
              fontFamily: 'Georgia, serif',
              fontSize: 39,
              fontWeight: 900,
              fontStyle: 'italic',
              textAlign: 'center',
              transform: `rotate(2deg) scale(${0.9 + Math.sin(frame * 0.25) * 0.04})`,
            }}
          >
            TURN POTENTIAL INTO PROFIT
          </div>

          <div
            style={{
              position: 'absolute',
              right: 26,
              bottom: 13,
              backgroundColor: palette.red,
              color: palette.background,
              border: `4px solid ${palette.ink}`,
              padding: '7px 14px',
              fontFamily: 'Courier New, monospace',
              fontSize: 21,
              fontWeight: 900,
              transform: 'rotate(-7deg)',
            }}
          >
            ISSUE No. 02
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}