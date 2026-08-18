import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from 'remotion';

const palette = ['#1B1D36', '#3450A1', '#F9C22E', '#58C322', '#D7263D'] as const;

const pixelFont = '"Courier New", "Lucida Console", monospace';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

function PixelCoin({
  x,
  y,
  frame,
  delay,
  size = 38,
}: {
  x: number;
  y: number;
  frame: number;
  delay: number;
  size?: number;
}) {
  const reveal = spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 8, stiffness: 180, mass: 0.45 },
  });
  const bob = Math.sin((frame - delay) * 0.15) * 10;
  const flip = Math.max(0.22, Math.abs(Math.cos((frame - delay) * 0.12)));

  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        opacity: reveal,
        transform: `translate(-50%, ${bob}px) scale(${reveal}) scaleX(${flip})`,
        backgroundColor: palette[2],
        border: `6px solid ${palette[4]}`,
        boxShadow: `6px 6px 0 ${palette[1]}`,
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 6,
          height: 16,
          left: '50%',
          top: 5,
          transform: 'translateX(-50%)',
          backgroundColor: palette[4],
        }}
      />
    </div>
  );
}

function PixelCharacter({
  agency,
  walking,
  frame,
}: {
  agency: number;
  walking: number;
  frame: number;
}) {
  const legStep = Math.floor(frame / 4) % 2 === 0;
  const bounce = Math.floor(walking * 10) % 2 === 0 ? 0 : -7;

  return (
    <div
      style={{
        position: 'relative',
        width: 116,
        height: 190,
        transform: `translateY(${bounce}px)`,
        imageRendering: 'pixelated',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 34,
          top: 0,
          width: 52,
          height: 18,
          backgroundColor: palette[4],
          boxShadow: `-9px 9px 0 ${palette[4]}, 9px 9px 0 ${palette[4]}`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 25,
          top: 20,
          width: 70,
          height: 62,
          backgroundColor: palette[2],
          border: `8px solid ${palette[0]}`,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 10,
            top: 15,
            width: 9,
            height: 9,
            backgroundColor: palette[0],
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 10,
            top: 15,
            width: 9,
            height: 9,
            backgroundColor: palette[0],
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 18,
            top: 36,
            width: 20,
            height: 7,
            backgroundColor: agency > 0.5 ? palette[3] : palette[4],
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 20,
          top: 83,
          width: 80,
          height: 68,
          backgroundColor: agency > 0.5 ? palette[3] : palette[1],
          border: `8px solid ${palette[0]}`,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 28,
            top: 0,
            width: 10,
            height: 44,
            backgroundColor: agency > 0.5 ? palette[2] : palette[4],
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          left: 4,
          top: 92,
          width: 20,
          height: 61,
          backgroundColor: palette[2],
          border: `6px solid ${palette[0]}`,
          boxSizing: 'border-box',
          transform: agency > 0.5 ? 'rotate(18deg)' : 'rotate(0deg)',
          transformOrigin: 'top center',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: 4,
          top: 92,
          width: 20,
          height: 61,
          backgroundColor: palette[2],
          border: `6px solid ${palette[0]}`,
          boxSizing: 'border-box',
          transform: agency > 0.5 ? 'rotate(-30deg)' : 'rotate(0deg)',
          transformOrigin: 'top center',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: legStep ? 23 : 28,
          top: 145,
          width: 26,
          height: legStep ? 44 : 37,
          backgroundColor: palette[1],
          borderBottom: `10px solid ${palette[4]}`,
          boxSizing: 'border-box',
        }}
      />
      <div
        style={{
          position: 'absolute',
          right: legStep ? 28 : 23,
          top: 145,
          width: 26,
          height: legStep ? 37 : 44,
          backgroundColor: palette[1],
          borderBottom: `10px solid ${palette[4]}`,
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

export default function Style72PixelQuest8BitRPG_Scene2() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 130, mass: 0.65 },
  });

  const contentOpacity = interpolate(
    frame,
    [0, 8, durationInFrames - 10, durationInFrames - 1],
    [0, 1, 1, 0],
    clamp,
  );

  const transition = interpolate(frame, [36, 72], [0, 1], clamp);
  const agencyReveal = interpolate(frame, [48, 78], [0, 1], clamp);
  const walkingProgress = interpolate(frame, [18, 78], [0, 1], clamp);
  const tileSteps = Math.floor(walkingProgress * 8) / 8;
  const characterX = interpolate(tileSteps, [0, 1], [-235, 220], clamp);

  const hp = Math.round(interpolate(frame, [12, 56], [92, 24], clamp));
  const hpWidth = interpolate(frame, [12, 56], [92, 24], clamp);
  const xp = Math.round(interpolate(frame, [48, 105], [18400, 140000], clamp));
  const level = Math.floor(interpolate(frame, [40, 102], [3, 12], clamp));

  const statSpring = spring({
    frame: frame - 68,
    fps,
    config: { damping: 10, stiffness: 190, mass: 0.5 },
  });

  const flash = interpolate(
    frame,
    [94, 99, 105, 112],
    [0, 0.85, 0.85, 0],
    clamp,
  );

  const dialogue =
    transition < 0.48
      ? 'HERO: ANOTHER DAY IN THE CUBICLE...'
      : 'QUEST COMPLETE! AGENCY MODE UNLOCKED.';
  const typeCount = Math.floor(
    interpolate(
      frame,
      transition < 0.48 ? [5, 40] : [70, 116],
      [0, dialogue.length],
      clamp,
    ),
  );
  const typedDialogue = dialogue.slice(0, typeCount);
  const cursorVisible = Math.floor(frame / 7) % 2 === 0;

  const titleY = interpolate(entrance, [0, 1], [-45, 0]);
  const panelScale = interpolate(entrance, [0, 1], [0.88, 1]);

  const groundOffset = (Math.floor(frame / 4) * 18) % 72;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: palette[0],
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
          padding: 28,
          backgroundColor: palette[0],
          border: `10px solid ${palette[1]}`,
          boxShadow: `14px 14px 0 ${palette[4]}`,
          opacity: contentOpacity,
          transform: `scale(${panelScale})`,
          fontFamily: pixelFont,
          color: palette[2],
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: palette[1],
              border: `6px solid ${palette[2]}`,
              boxShadow: `8px 8px 0 ${palette[4]}`,
              color: palette[2],
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 3,
              textAlign: 'center',
            }}
          >
            QUEST 02 • CAREER SHIFT
          </div>
          <div
            style={{
              marginTop: 18,
              color: palette[2],
              fontSize: 47,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: -2,
              textAlign: 'center',
              textShadow: `6px 6px 0 ${palette[4]}`,
            }}
          >
            FROM CUBICLE
            <br />
            TO CREATOR
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            minHeight: 650,
            marginTop: 26,
            backgroundColor: palette[1],
            border: `9px solid ${palette[4]}`,
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: palette[1],
              opacity: 1 - transition,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 56,
                top: 58,
                width: 235,
                height: 180,
                backgroundColor: palette[0],
                border: `8px solid ${palette[4]}`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  top: 22,
                  width: 78,
                  height: 96,
                  backgroundColor: palette[1],
                  border: `6px solid ${palette[2]}`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: 18,
                  top: 22,
                  width: 85,
                  height: 18,
                  backgroundColor: palette[4],
                  boxShadow: `0 34px 0 ${palette[4]}, 0 68px 0 ${palette[4]}`,
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                right: 48,
                top: 88,
                width: 180,
                height: 126,
                backgroundColor: palette[0],
                border: `8px solid ${palette[4]}`,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 20,
                  right: 20,
                  top: 22,
                  height: 13,
                  backgroundColor: palette[2],
                  boxShadow: `0 30px 0 ${palette[1]}, 0 60px 0 ${palette[4]}`,
                }}
              />
            </div>

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 90,
                height: 22,
                backgroundColor: palette[4],
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 70,
                bottom: 110,
                width: 280,
                height: 120,
                backgroundColor: palette[0],
                border: `8px solid ${palette[4]}`,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: palette[3],
              opacity: agencyReveal,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 48,
                top: 48,
                width: 112,
                height: 112,
                backgroundColor: palette[2],
                boxShadow: `16px 0 0 ${palette[2]}, 0 16px 0 ${palette[2]}, -16px 0 0 ${palette[2]}, 0 -16px 0 ${palette[2]}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 218,
                top: 72,
                width: 82,
                height: 28,
                backgroundColor: palette[1],
                boxShadow: `22px 22px 0 ${palette[1]}, -22px 22px 0 ${palette[1]}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 55,
                top: 58,
                width: 120,
                height: 44,
                backgroundColor: palette[2],
                border: `7px solid ${palette[4]}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 85,
                bottom: 104,
                width: 190,
                height: 215,
                backgroundColor: palette[1],
                border: `8px solid ${palette[0]}`,
                boxShadow: `-28px 28px 0 ${palette[4]}`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 118,
                bottom: 150,
                width: 55,
                height: 98,
                backgroundColor: palette[2],
                boxShadow: `70px 0 0 ${palette[3]}`,
              }}
            />

            <PixelCoin x={22} y={42} frame={frame} delay={54} />
            <PixelCoin x={43} y={25} frame={frame} delay={60} size={34} />
            <PixelCoin x={66} y={40} frame={frame} delay={66} size={42} />
            <PixelCoin x={81} y={24} frame={frame} delay={72} size={32} />
            <PixelCoin x={35} y={63} frame={frame} delay={78} size={36} />
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 94,
              backgroundColor: palette[0],
              borderTop: `9px solid ${palette[2]}`,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: -groundOffset,
                top: 24,
                width: '130%',
                height: 18,
                backgroundColor: palette[1],
                boxShadow: `72px 34px 0 ${palette[4]}, 144px 0 0 ${palette[1]}, 216px 34px 0 ${palette[4]}, 288px 0 0 ${palette[1]}, 360px 34px 0 ${palette[4]}, 432px 0 0 ${palette[1]}, 504px 34px 0 ${palette[4]}, 576px 0 0 ${palette[1]}, 648px 34px 0 ${palette[4]}, 720px 0 0 ${palette[1]}, 792px 34px 0 ${palette[4]}`,
              }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 64,
              transform: `translateX(calc(-50% + ${characterX}px))`,
            }}
          >
            <PixelCharacter agency={transition} walking={walkingProgress} frame={frame} />
          </div>

          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              width: 270,
              padding: 12,
              backgroundColor: palette[0],
              border: `6px solid ${palette[2]}`,
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                color: palette[2],
                fontSize: 17,
                fontWeight: 900,
                letterSpacing: 2,
              }}
            >
              HP {hp}/100
            </div>
            <div
              style={{
                width: '100%',
                height: 25,
                marginTop: 8,
                backgroundColor: palette[4],
                border: `5px solid ${palette[0]}`,
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: `${hpWidth}%`,
                  height: '100%',
                  backgroundColor: hp > 45 ? palette[3] : palette[2],
                }}
              />
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: palette[2],
              opacity: flash,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '32%',
              left: '50%',
              width: 520,
              padding: '18px 22px',
              backgroundColor: palette[0],
              border: `8px solid ${palette[2]}`,
              boxShadow: `10px 10px 0 ${palette[4]}`,
              transform: `translate(-50%, -50%) scale(${statSpring})`,
              opacity: interpolate(frame, [65, 75], [0, 1], clamp),
              textAlign: 'center',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                color: palette[3],
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: 4,
              }}
            >
              LEVEL UP!
            </div>
            <div
              style={{
                color: palette[2],
                fontSize: 59,
                lineHeight: 1.05,
                fontWeight: 900,
                textShadow: `5px 5px 0 ${palette[4]}`,
              }}
            >
              {xp.toLocaleString()} XP
            </div>
            <div
              style={{
                marginTop: 8,
                color: palette[3],
                fontSize: 23,
                fontWeight: 900,
              }}
            >
              AGENCY LV. {level}
            </div>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            minHeight: 184,
            marginTop: 24,
            padding: '23px 28px',
            backgroundColor: palette[0],
            border: `9px solid ${palette[2]}`,
            boxShadow: `10px 10px 0 ${palette[4]}`,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <div
            style={{
              color: palette[3],
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            SYSTEM DIALOGUE
          </div>
          <div
            style={{
              color: palette[2],
              fontSize: 28,
              lineHeight: 1.35,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            {typedDialogue}
            <span style={{ color: palette[4], opacity: cursorVisible ? 1 : 0 }}>■</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}