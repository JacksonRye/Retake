import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function NeubrutalCeilingCollision() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Snappy spring generator for Neubrutalist movement
  const createSnappySpring = (startFrame: number, damping = 10, mass = 0.5) => {
    return spring({
      frame: frame - startFrame,
      fps,
      config: { damping, stiffness: 120, mass },
    });
  };

  // Ceiling Entrance (drops down quickly at the start)
  const ceilingEntrance = createSnappySpring(0, 12, 0.8);
  const ceilingY = interpolate(ceilingEntrance, [0, 1], [-200, 0]);

  // Block Entrances (staggered stack building)
  const block1Progress = createSnappySpring(8, 11, 0.6);
  const block2Progress = createSnappySpring(14, 11, 0.6);
  const block3Progress = createSnappySpring(20, 11, 0.6);
  const block4Progress = createSnappySpring(26, 8, 0.4); // Faster slam block

  // Interpolate positions (Blocks fly up from off-screen bottom to stack positions)
  // Container height is 600px. Ceiling bottom is at Y = 120.
  // Block height is 90px.
  // Block 4 (top) lands at Y = 120 (collides with ceiling)
  // Block 3 lands at Y = 210
  // Block 2 lands at Y = 300
  // Block 1 (bottom) lands at Y = 390
  const block1Y = interpolate(block1Progress, [0, 1], [800, 390]);
  const block2Y = interpolate(block2Progress, [0, 1], [800, 300]);
  const block3Y = interpolate(block3Progress, [0, 1], [800, 210]);
  const block4Y = interpolate(block4Progress, [0, 1], [800, 120]);

  // Collision Impact (happens when block 4 hits, around frame 31-33)
  const impactFrame = 31;
  const isImpacted = frame >= impactFrame;
  
  // Screen Shake after impact
  const shakeProgress = frame - impactFrame;
  const shake = isImpacted && frame < 50
    ? Math.sin(shakeProgress * 1.8) * 12 * interpolate(frame, [impactFrame, 50], [1, 0], { extrapolateRight: 'clamp' })
    : 0;

  // Warning light flashing logic
  const isFlashActive = isImpacted && frame < 55;
  const flashColor = isFlashActive && Math.floor(frame / 3) % 2 === 0 ? '#FF2E2E' : '#000000';

  // Impact Particles
  const particleProgress = spring({
    frame: frame - impactFrame,
    fps,
    config: { damping: 15, stiffness: 90 },
  });

  // Exit Animation (Everything drops down heavily at the end)
  const exitProgress = createSnappySpring(58, 12, 0.8);
  const exitY = interpolate(exitProgress, [0, 1], [0, 900]);

  // Particle configuration
  const particles = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * Math.PI) / 4;
    const distance = interpolate(particleProgress, [0, 1], [0, 180]);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance * 0.6; // slightly flattened ellipse
    const scale = interpolate(particleProgress, [0, 0.8, 1], [0, 1.2, 0]);
    return { x, y, scale, isYellow: i % 2 === 0 };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        fontFamily: '"Arial Black", Impact, sans-serif',
      }}
    >
      {/* Main Animation Wrapper */}
      <div
        style={{
          width: '500px',
          height: '600px',
          position: 'relative',
          transform: `translateY(${exitY + shake}px) rotate(${shake * 0.05}deg)`,
        }}
      >
        {/* CEILING (Hazard Striped Structural Beam) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '120px',
            backgroundColor: '#000',
            border: '5px solid #000',
            boxShadow: '10px 10px 0px #000',
            transform: `translateY(${ceilingY}px)`,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
          }}
        >
          {/* Hazard Stripes */}
          <div
            style={{
              width: '100%',
              height: '35px',
              background: 'repeating-linear-gradient(45deg, #F3FF09, #F3FF09 15px, #000 15px, #000 30px)',
              borderBottom: '5px solid #000',
            }}
          />

          {/* Warning Indicator Center */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 20px',
              height: '80px',
              backgroundColor: '#fff',
            }}
          >
            {/* Left Warning Light */}
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: flashColor,
                border: '4px solid #000',
                transition: 'background-color 0.1s ease',
              }}
            />

            {/* Visual Icon: Warning Triangle */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: isImpacted && frame < 45 ? 'scale(1.2)' : 'scale(1)' }}
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" fill="#F3FF09" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>

            {/* Right Warning Light */}
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: flashColor,
                border: '4px solid #000',
                transition: 'background-color 0.1s ease',
              }}
            />
          </div>
        </div>

        {/* STACKABLE NEUBRUTALIST BLOCKS */}
        
        {/* Block 1: Base (Stripe Pattern) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50px',
            width: '400px',
            height: '90px',
            backgroundColor: '#F3FF09',
            border: '5px solid #000',
            boxShadow: '8px 8px 0px #000',
            transform: `translateY(${block1Y}px)`,
            zIndex: 4,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '0 40px',
          }}
        >
          {/* Geometric Neubrutalist Inner Elements */}
          <div style={{ width: '40px', height: '40px', border: '5px solid #000', borderRadius: '50%' }} />
          <div style={{ width: '120px', height: '15px', backgroundColor: '#000' }} />
          <div style={{ width: '40px', height: '40px', border: '5px solid #000', borderRadius: '50%' }} />
        </div>

        {/* Block 2: Mid-Low (Target/Eye Pattern) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '75px',
            width: '350px',
            height: '90px',
            backgroundColor: '#F3FF09',
            border: '5px solid #000',
            boxShadow: '8px 8px 0px #000',
            transform: `translateY(${block2Y}px)`,
            zIndex: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '30px',
          }}
        >
          <div style={{ width: '30px', height: '30px', backgroundColor: '#000', transform: 'rotate(45deg)' }} />
          <div style={{ width: '30px', height: '30px', backgroundColor: '#000', transform: 'rotate(45deg)' }} />
          <div style={{ width: '30px', height: '30px', backgroundColor: '#000', transform: 'rotate(45deg)' }} />
        </div>

        {/* Block 3: Mid-High (Grid Pattern) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '100px',
            width: '300px',
            height: '90px',
            backgroundColor: '#F3FF09',
            border: '5px solid #000',
            boxShadow: '8px 8px 0px #000',
            transform: `translateY(${block3Y}px)`,
            zIndex: 6,
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '20px', height: '20px', backgroundColor: '#000' }} />
          <div style={{ width: '20px', height: '20px', backgroundColor: '#000' }} />
          <div style={{ width: '20px', height: '20px', backgroundColor: '#000' }} />
          <div style={{ width: '20px', height: '20px', backgroundColor: '#000' }} />
        </div>

        {/* Block 4: Impact Block (Heavy 'X' Collision Signifier) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '125px',
            width: '250px',
            height: '90px',
            backgroundColor: '#F3FF09',
            border: '5px solid #000',
            boxShadow: '8px 8px 0px #000',
            transform: `translateY(${block4Y}px)`,
            zIndex: 7,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Giant Bold Neubrutalist X */}
          <div style={{ position: 'relative', width: '50px', height: '50px' }}>
            <div
              style={{
                position: 'absolute',
                width: '60px',
                height: '10px',
                backgroundColor: '#000',
                transform: 'rotate(45deg)',
                top: '20px',
                left: '-5px',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: '60px',
                height: '10px',
                backgroundColor: '#000',
                transform: 'rotate(-45deg)',
                top: '20px',
                left: '-5px',
              }}
            />
          </div>
        </div>

        {/* COLLISION PARTICLES (Burst out from the contact point X: 250px, Y: 120px) */}
        {isImpacted && (
          <div
            style={{
              position: 'absolute',
              top: '120px',
              left: '250px',
              width: '0px',
              height: '0px',
              zIndex: 12,
            }}
          >
            {particles.map((p, idx) => (
              <div
                key={idx}
                style={{
                  position: 'absolute',
                  width: p.isYellow ? '24px' : '18px',
                  height: p.isYellow ? '24px' : '18px',
                  backgroundColor: p.isYellow ? '#F3FF09' : '#000',
                  border: '3px solid #000',
                  transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px)) scale(${p.scale}) rotate(${idx * 45}deg)`,
                  boxShadow: p.isYellow ? '3px 3px 0px #000' : 'none',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}