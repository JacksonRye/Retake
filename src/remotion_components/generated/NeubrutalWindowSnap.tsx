import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function NeubrutalWindowSnap() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Shake Effect (Violent camera shake right at the snap point: Frame 35 to 45)
  const shake = interpolate(
    frame,
    [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
    [0, -18, 15, -15, 12, -10, 8, -5, 3, -1, 0],
    { extrapolateRight: 'clamp' }
  );

  // 2. Entrance Animation (Pop-in with spring)
  const entrySpring = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.8, tension: 160 },
  });
  const entryScale = interpolate(entrySpring, [0, 1], [0, 1]);

  // 3. Stretch Phase (Frames 12 to 34)
  // Horizontal stretch (tension build-up), vertical slight squash
  const stretchProgress = interpolate(frame, [12, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scaleX = 1 + stretchProgress * 0.35;
  const scaleY = 1 - stretchProgress * 0.15;

  // 4. Snap Phase (Frame 35 onwards)
  const isSnapped = frame >= 35;
  const snapFrame = frame - 35;
  const snapSpring = spring({
    frame: snapFrame,
    fps,
    config: { mass: 0.3, tension: 280, friction: 10 },
  });

  // Left half flying away
  const leftX = interpolate(snapSpring, [0, 1], [0, -450]);
  const leftY = interpolate(snapSpring, [0, 1], [0, 180]); // Gravity drop
  const leftRot = interpolate(snapSpring, [0, 1], [0, -28]);

  // Right half flying away
  const rightX = interpolate(snapSpring, [0, 1], [0, 450]);
  const rightY = interpolate(snapSpring, [0, 1], [0, 220]); // Slightly different gravity drop
  const rightRot = interpolate(snapSpring, [0, 1], [0, 32]);

  // Fade out both halves as they fly away
  const halvesOpacity = interpolate(snapSpring, [0, 0.7, 1], [1, 1, 0]);

  // 5. Underneath Layer Reveal (Starts at Frame 33, slightly before snap to catch the transition)
  const revealSpring = spring({
    frame: frame - 33,
    fps,
    config: { damping: 12, mass: 0.6, tension: 170 },
  });
  const revealScale = interpolate(revealSpring, [0, 1], [0.7, 1]);
  const revealOpacity = interpolate(revealSpring, [0, 0.2], [0, 1]);

  // Progress Bar percentage mockup (stretches with frame)
  const progressPercent = Math.min(
    99,
    Math.round(interpolate(frame, [12, 34], [35, 99], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }))
  );

  // Clip paths for the matching jagged tear (Left and Right)
  const leftClipPath = 'polygon(0% 0%, 53% 0%, 47% 15%, 55% 30%, 44% 50%, 54% 70%, 46% 85%, 52% 100%, 0% 100%)';
  const rightClipPath = 'polygon(52.5% 0%, 100% 0%, 100% 100%, 51.5% 100%, 45.5% 85%, 53.5% 70%, 43.5% 50%, 54.5% 30%, 46.5% 15%)';

  // 6. Debris Particles (Spawns at Snap Point)
  const particles = Array.from({ length: 10 }).map((_, i) => {
    const angle = (i * (Math.PI * 2)) / 10 + 0.3;
    const velocity = 250 + (i % 3) * 100;
    const pX = Math.cos(angle) * snapSpring * velocity;
    const pY = Math.sin(angle) * snapSpring * velocity + (snapSpring * snapSpring * 200); // Add gravity
    const pRot = snapSpring * 720 * (i % 2 === 0 ? 1 : -1);
    const pScale = interpolate(snapSpring, [0, 0.8, 1], [1, 1, 0]);
    return { x: pX, y: pY, rot: pRot, scale: pScale, size: 12 + (i % 3) * 8 };
  });

  // Shared Browser Component to duplicate for the seamless tear illusion
  const renderBrowserWindow = () => (
    <div
      style={{
        width: 680,
        height: 380,
        backgroundColor: '#39FF14', // Neon Green
        border: '6px solid #000000',
        boxShadow: isSnapped ? 'none' : '12px 12px 0px #000000',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Courier New', Courier, monospace",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Browser Header Bar */}
      <div
        style={{
          height: 55,
          backgroundColor: '#FFFFFF',
          borderBottom: '6px solid #000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0px 16px',
        }}
      >
        {/* Neubrutalist Window Controls */}
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 20, height: 20, backgroundColor: '#FF0055', border: '3px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 11 }}>×</div>
          <div style={{ width: 20, height: 20, backgroundColor: '#FFF000', border: '3px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 11 }}>-</div>
          <div style={{ width: 20, height: 20, backgroundColor: '#00FF66', border: '3px solid #000000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 11 }}>+</div>
        </div>

        {/* Address Bar Mockup */}
        <div
          style={{
            flex: 1,
            margin: '0 20px',
            backgroundColor: '#F0F0F0',
            border: '3.5px solid #000000',
            height: 28,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
            fontSize: 12,
            fontWeight: 'bold',
            color: '#000000',
            overflow: 'hidden',
          }}
        >
          chronixel.dev/system_limit_test
        </div>
      </div>

      {/* Browser Body */}
      <div
        style={{
          flex: 1,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#000000',
        }}
      >
        <div>
          <div style={{ fontSize: 28, fontWeight: 'black', textTransform: 'uppercase', letterSpacing: -1, marginBottom: 4, fontFamily: 'Impact, sans-serif' }}>
            STRETCH_TEST_99
          </div>
          <div style={{ fontSize: 14, fontWeight: 'bold', opacity: 0.8 }}>
            STATUS: EXCEEDING_MAX_TENSION
          </div>
        </div>

        {/* Dynamic Neubrutalist Progress Bar */}
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: 6, fontSize: 14 }}>
            <span>TENSION_LOAD</span>
            <span>{progressPercent}%</span>
          </div>
          <div style={{ height: 35, border: '4px solid #000000', backgroundColor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: '#FF0055',
                borderRight: '4px solid #000000',
                transition: 'width 0.05s linear',
              }}
            />
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 'bold', borderTop: '3px solid #000000', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
          <span>CORE_LOAD: CRITICAL</span>
          <span>SYS_OVERLOAD_WARNING</span>
        </div>
      </div>
    </div>
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Applied Shake and Global Animations */}
      <div
        style={{
          transform: `translateX(${shake}px) scale(${entryScale})`,
          position: 'relative',
          width: 680,
          height: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        
        {/* ==================== UNDERNEATH LAYER (REVEALED) ==================== */}
        {frame >= 33 && (
          <div
            style={{
              position: 'absolute',
              width: 580,
              height: 290,
              backgroundColor: '#000000',
              border: '6px solid #FF0055',
              boxShadow: '10px 10px 0px #000000',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${revealScale})`,
              opacity: revealOpacity,
              zIndex: 1,
              fontFamily: "'Courier New', Courier, monospace",
            }}
          >
            {/* Giant Brackets */}
            <div
              style={{
                position: 'absolute',
                left: 15,
                fontSize: 160,
                color: '#FF0055',
                fontWeight: 'bold',
                opacity: 0.3,
                userSelect: 'none',
                fontFamily: 'Impact, sans-serif',
              }}
            >
              &#123;
            </div>
            <div
              style={{
                position: 'absolute',
                right: 15,
                fontSize: 160,
                color: '#FF0055',
                fontWeight: 'bold',
                opacity: 0.3,
                userSelect: 'none',
                fontFamily: 'Impact, sans-serif',
              }}
            >
              &#125;
            </div>

            {/* Error Message */}
            <div
              style={{
                backgroundColor: '#FFF000',
                color: '#000000',
                padding: '6px 16px',
                fontWeight: 'black',
                fontSize: 18,
                border: '4px solid #000000',
                transform: 'rotate(-2deg)',
                marginBottom: 15,
                zIndex: 2,
              }}
            >
              [ ERROR: CORE_SNAPPED ]
            </div>

            <div style={{ color: '#FFFFFF', textAlign: 'center', zIndex: 2 }}>
              <p style={{ fontSize: 16, fontWeight: 'bold', margin: '0 0 8px 0', color: '#39FF14' }}>
                &gt; LIMIT_EXCEEDED: TRUE
              </p>
              <p style={{ fontSize: 12, opacity: 0.8, margin: 0, lineHeight: 1.4 }}>
                FATAL: Window tension threshold broken.<br />
                Raw system architecture exposed.<br />
                <span style={{ color: '#FF0055' }}>stack_trace_snapped_v1.0.4</span>
              </p>
            </div>
          </div>
        )}

        {/* ==================== TOP LAYER (SNAPPING WINDOW) ==================== */}
        {/* Left Half Container */}
        <div
          style={{
            position: 'absolute',
            width: 680,
            height: 380,
            clipPath: leftClipPath,
            transform: `translateX(${leftX}px) translateY(${leftY}px) rotate(${leftRot}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
            transformOrigin: 'left center',
            opacity: halvesOpacity,
            zIndex: 2,
          }}
        >
          {renderBrowserWindow()}
        </div>

        {/* Right Half Container */}
        <div
          style={{
            position: 'absolute',
            width: 680,
            height: 380,
            clipPath: rightClipPath,
            transform: `translateX(${rightX}px) translateY(${rightY}px) rotate(${rightRot}deg) scaleX(${scaleX}) scaleY(${scaleY})`,
            transformOrigin: 'right center',
            opacity: halvesOpacity,
            zIndex: 2,
          }}
        >
          {renderBrowserWindow()}
        </div>

        {/* ==================== DEBRIS PARTICLES ==================== */}
        {isSnapped &&
          particles.map((p, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: idx % 2 === 0 ? '#000000' : '#FF0055',
                border: '2px solid #FFFFFF',
                transform: `translateX(${p.x}px) translateY(${p.y}px) rotate(${p.rot}deg) scale(${p.scale})`,
                zIndex: 3,
              }}
            />
          ))}
      </div>
    </AbsoluteFill>
  );
}