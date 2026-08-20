import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style90CaliberWatchMacro_Scene5() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): DROP & SNAP MAGNETIC ALIGNMENT
  // ==========================================
  const dropEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 220, mass: 0.8 }
  });

  const magneticSnap = spring({
    frame: frame - 12,
    fps,
    config: { damping: 10, stiffness: 280, mass: 0.5 }
  });

  const cageScale = interpolate(dropEntrance, [0, 1], [0.65, 1], clamp);
  const chassisY = interpolate(dropEntrance, [0, 1], [-80, 0], clamp);
  const magneticRecoil = interpolate(magneticSnap, [0, 0.5, 1], [0, 6, 0], clamp);

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): HIGH-VELOCITY GYROSCOPIC SPIN & LATCH
  // ==========================================
  // Rapid surge spin between frame 30 and 70
  const spinSurge = interpolate(frame, [30, 72], [0, 720], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp'
  });

  // Smooth continuous spin after surge
  const perpetualSpin = frame > 72 ? (frame - 72) * 1.8 : 0;
  const totalCageRotation = spinSurge + perpetualSpin;

  // Bezel latch transition
  const latchProgress = spring({
    frame: frame - 48,
    fps,
    config: { damping: 12, stiffness: 260, mass: 0.6 }
  });
  const isEngaged = frame >= 52;
  const bezelIndexRotate = interpolate(latchProgress, [0, 1], [-90, 0], clamp);
  const mintGlowIntensity = interpolate(frame, [50, 58, 80], [0, 1, 0.45], clamp);

  // Active Metric Counter (Caliber Torque & Execution Index)
  const torqueCount = Math.round(interpolate(frame, [35, 68], [12, 100], clamp));
  const inertiaLatency = interpolate(frame, [35, 68], [420, 0], clamp).toFixed(1);

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): BALANCE WHEEL OSCILLATION & RUBY FLASH
  // ==========================================
  // Balance wheel oscillation at 4Hz cadence
  const balanceOscillation = Math.sin(frame * 0.38) * 36;
  const subGearMesh = frame * -1.2;

  // Ruby bearing radiant flash rhythm
  const rubyFlash = Math.sin(frame * 0.28) * 0.4 + 0.6;
  const ambientLivingDrift = Math.sin(frame * 0.1) * 4;
  const subtleTilt = Math.sin(frame * 0.08) * 1.2;

  // Exit transition
  const exitProgress = spring({
    frame: frame - (durationInFrames - 12),
    fps,
    config: { damping: 14, stiffness: 240 }
  });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);

  const containerOpacity = interpolate(dropEntrance, [0, 0.25], [0, 1], clamp) * exitOpacity;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0E0F13',
        fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* Background Micro-Grid & Caliber Radial Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage:
            'radial-gradient(circle at center, #BFC5CE 1px, transparent 1px), linear-gradient(to right, #1E2028 1px, transparent 1px), linear-gradient(to bottom, #1E2028 1px, transparent 1px)',
          backgroundSize: '48px 48px, 24px 24px, 24px 24px',
          pointerEvents: 'none'
        }}
      />

      {/* Main Obsidian Chassis */}
      <div
        style={{
          width: '92%',
          maxWidth: 980,
          minHeight: 740,
          opacity: containerOpacity,
          transform: `translateY(${chassisY + ambientLivingDrift + magneticRecoil}px) scale(${cageScale * exitScale}) rotate(${subtleTilt}deg)`,
          backgroundColor: '#14151A',
          border: '1.5px solid #2B2F3A',
          borderRadius: 36,
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(191, 197, 206, 0.15)',
          padding: '44px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        {/* Subtle Top-Bevel Highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, #BFC5CE, #B76E79, transparent)',
            opacity: 0.4
          }}
        />

        {/* ================= HEADER: SERIAL MONO & CALIBER SPEC ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderBottom: '1px solid #242834',
            paddingBottom: 20
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span
              style={{
                fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.22em',
                color: '#B76E79',
                textTransform: 'uppercase'
              }}
            >
              CALIBER 90-TOURBILLON
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#BFC5CE'
              }}
            >
              MECHANICAL ACTION ENGINE
            </span>
          </div>

          {/* Precision Escapement Hz Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              backgroundColor: '#1C1F27',
              border: '1px solid #333846',
              borderRadius: 10,
              padding: '8px 16px'
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: isEngaged ? '#B8F2C9' : '#B76E79',
                boxShadow: isEngaged ? '0 0 12px #B8F2C9' : '0 0 6px #B76E79'
              }}
            />
            <span
              style={{
                fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#BFC5CE'
              }}
            >
              28,800 VPH · 4HZ
            </span>
          </div>
        </div>

        {/* ================= CENTER HERO: SKELETONIZED TOURBILLON ASSEMBLY ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '28px 0',
            gap: 32
          }}
        >
          {/* Left: Interactive Tourbillon Mechanism Graphic */}
          <div
            style={{
              position: 'relative',
              width: 240,
              height: 240,
              borderRadius: '50%',
              backgroundColor: '#0F1015',
              border: '2px solid #2C303E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9), 0 8px 32px rgba(0,0,0,0.6)'
            }}
          >
            {/* Outer Bezel Caliber Engravings */}
            <svg
              width="230"
              height="230"
              viewBox="0 0 230 230"
              style={{
                position: 'absolute',
                transform: `rotate(${bezelIndexRotate}deg)`
              }}
            >
              <circle
                cx="115"
                cy="115"
                r="108"
                fill="none"
                stroke="#2B303C"
                strokeWidth="2"
                strokeDasharray="4 8"
              />
              <circle
                cx="115"
                cy="115"
                r="96"
                fill="none"
                stroke="#1E222D"
                strokeWidth="1.5"
              />
              {/* Bezel Luminescent Index Points */}
              <circle cx="115" cy="12" r="3.5" fill="#B8F2C9" />
              <circle cx="218" cy="115" r="2.5" fill="#BFC5CE" opacity="0.6" />
              <circle cx="115" cy="218" r="2.5" fill="#BFC5CE" opacity="0.6" />
              <circle cx="12" cy="115" r="2.5" fill="#BFC5CE" opacity="0.6" />
            </svg>

            {/* Meshing Sub-Gear */}
            <div
              style={{
                position: 'absolute',
                width: 140,
                height: 140,
                borderRadius: '50%',
                border: '4px dashed #3D4454',
                transform: `rotate(${subGearMesh}deg)`,
                opacity: 0.35
              }}
            />

            {/* Skeletonized Tourbillon Cage (Spins under gyroscopic torque) */}
            <div
              style={{
                position: 'absolute',
                width: 160,
                height: 160,
                transform: `rotate(${totalCageRotation}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Titanium Bridge Cage Arms */}
              <svg width="160" height="160" viewBox="0 0 160 160">
                {/* Outer Cage Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  fill="none"
                  stroke="#BFC5CE"
                  strokeWidth="2"
                  opacity="0.8"
                />
                {/* Triple Titanium Skeleton Arms */}
                <line x1="80" y1="80" x2="80" y2="8" stroke="#BFC5CE" strokeWidth="3" strokeLinecap="round" />
                <line x1="80" y1="80" x2="142" y2="116" stroke="#BFC5CE" strokeWidth="3" strokeLinecap="round" />
                <line x1="80" y1="80" x2="18" y2="116" stroke="#BFC5CE" strokeWidth="3" strokeLinecap="round" />

                {/* Rose Gold Counterweights */}
                <circle cx="80" cy="16" r="5" fill="#B76E79" />
                <circle cx="136" cy="112" r="5" fill="#B76E79" />
                <circle cx="24" cy="112" r="5" fill="#B76E79" />
              </svg>
            </div>

            {/* Oscillating Balance Wheel (Inner Heartbeat) */}
            <div
              style={{
                position: 'absolute',
                width: 110,
                height: 110,
                transform: `rotate(${balanceOscillation}deg)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="110" height="110" viewBox="0 0 110 110">
                <circle
                  cx="55"
                  cy="55"
                  r="50"
                  fill="none"
                  stroke="#B76E79"
                  strokeWidth="2"
                  opacity="0.9"
                />
                {/* Balance Arm Spoke */}
                <line x1="10" y1="55" x2="100" y2="55" stroke="#B76E79" strokeWidth="2.5" />
                {/* Inertia Screws along rim */}
                <circle cx="55" cy="7" r="2" fill="#BFC5CE" />
                <circle cx="55" cy="103" r="2" fill="#BFC5CE" />
                <circle cx="7" cy="55" r="2" fill="#BFC5CE" />
                <circle cx="103" cy="55" r="2" fill="#BFC5CE" />
              </svg>
            </div>

            {/* Central Synthetic Ruby Bearing Jewel Pivot */}
            <div
              style={{
                position: 'absolute',
                width: 22,
                height: 22,
                borderRadius: '50%',
                backgroundColor: '#9B111E',
                border: '2px solid #E54B5E',
                boxShadow: `0 0 16px rgba(229, 75, 94, ${rubyFlash}), inset 0 0 4px #FFFFFF`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  opacity: 0.9
                }}
              />
            </div>
          </div>

          {/* Right: Concrete Telemetry Readout */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 16
            }}
          >
            {/* Primary Live Readout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span
                style={{
                  fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace',
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: '#BFC5CE',
                  opacity: 0.7
                }}
              >
                EXECUTABLE INERTIA
              </span>
              <div
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 8
                }}
              >
                <span>{torqueCount}%</span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: isEngaged ? '#B8F2C9' : '#B76E79',
                    fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace'
                  }}
                >
                  TORQUE
                </span>
              </div>
            </div>

            {/* Sub-Metrics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                marginTop: 6
              }}
            >
              <div
                style={{
                  backgroundColor: '#191C24',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid #282D3B'
                }}
              >
                <div
                  style={{
                    fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace',
                    fontSize: 11,
                    color: '#BFC5CE',
                    opacity: 0.6,
                    marginBottom: 4
                  }}
                >
                  LATENCY LAG
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: '#BFC5CE',
                    fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace'
                  }}
                >
                  {inertiaLatency} ms
                </div>
              </div>

              <div
                style={{
                  backgroundColor: '#191C24',
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid #282D3B'
                }}
              >
                <div
                  style={{
                    fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace',
                    fontSize: 11,
                    color: '#BFC5CE',
                    opacity: 0.6,
                    marginBottom: 4
                  }}
                >
                  RUBY CADENCE
                </div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: '#9B111E',
                    fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace'
                  }}
                >
                  SYNCHRONIZED
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOOTER: BEZEL ENGAGEMENT CALL TO ACTION ================= */}
        <div
          style={{
            backgroundColor: isEngaged ? '#13241C' : '#1C1F28',
            border: `1.5px solid ${isEngaged ? '#B8F2C9' : '#323746'}`,
            borderRadius: 18,
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: isEngaged
              ? `0 0 24px rgba(184, 242, 201, ${mintGlowIntensity * 0.4})`
              : 'none',
            transition: 'border-color 0.2s ease, background-color 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: isEngaged ? '#B8F2C9' : '#B76E79',
                boxShadow: isEngaged ? '0 0 10px #B8F2C9' : 'none'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: isEngaged ? '#B8F2C9' : '#FFFFFF'
                }}
              >
                {isEngaged ? 'ACTION ENGAGED — DECISIVE LOCK' : 'AWAITING USER INITIATIVE'}
              </span>
              <span
                style={{
                  fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace',
                  fontSize: 12,
                  color: '#BFC5CE',
                  opacity: 0.7,
                  marginTop: 2
                }}
              >
                {isEngaged ? 'CALIBER INERTIA OVERCOME · SYSTEM EXECUTING' : 'CALIBRATING ESCAPEMENT INERTIA...'}
              </span>
            </div>
          </div>

          <div
            style={{
              fontFamily: '"SF Mono", "Roboto Mono", Consolas, monospace',
              fontSize: 13,
              fontWeight: 800,
              color: isEngaged ? '#0E0F13' : '#BFC5CE',
              backgroundColor: isEngaged ? '#B8F2C9' : '#2A2F3D',
              padding: '6px 14px',
              borderRadius: 8,
              letterSpacing: '0.08em'
            }}
          >
            {isEngaged ? 'ACTIVE' : 'HOLD'}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}