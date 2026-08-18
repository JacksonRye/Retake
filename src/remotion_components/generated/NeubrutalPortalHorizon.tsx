import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

// Neubrutalist Style Guide (CHRON_STYLE_100)
const COLORS = {
  bgTransparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
  yellow: '#FFE600',
  cyan: '#00F0FF',
  magenta: '#FF007A',
  green: '#39FF14',
  purple: '#7000FF',
};

// Seeded/deterministic confetti properties to avoid hydration mismatch
const CONFETTI_ITEMS = Array.from({ length: 28 }).map((_, i) => {
  const angle = (i / 28) * Math.PI * 1.5 - Math.PI * 0.25; // Arc pointing generally forward/right
  const distance = 200 + (i % 6) * 90;
  const colors = [COLORS.yellow, COLORS.cyan, COLORS.magenta, COLORS.green, COLORS.purple];
  const shapes = ['square', 'circle', 'diamond'];
  return {
    id: i,
    color: colors[i % colors.length],
    shape: shapes[i % shapes.length],
    angle,
    distance,
    size: 16 + (i % 4) * 8,
    rotationStart: i * 45,
    delay: (i % 3) * 2, // staggered burst frames
  };
});

export default function NeubrutalPortalHorizon() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // --- ANIMATION TIMINGS & SPRINGS ---
  
  // 1. Scene Entrance (0 to 15)
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 11, mass: 0.6, stiffness: 100 },
  });

  // 2. Door Swinging Open (starts at frame 10)
  const doorOpenSpring = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 90 },
  });

  // 3. Text & Badges pop in (starts at frame 22)
  const textPopSpring = spring({
    frame: Math.max(0, frame - 22),
    fps,
    config: { damping: 10, mass: 0.5, stiffness: 120 },
  });

  // 4. Scene Exit transition (frames 63 to 75)
  const exitProgress = interpolate(frame, [63, 74], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const exitSpring = spring({
    frame: Math.max(0, frame - 63),
    fps,
    config: { damping: 12, mass: 0.7, stiffness: 100 },
  });

  // --- COMPUTE INTERPOLATED VALUES ---
  
  // Grid entrance & scale
  const gridY = interpolate(entranceSpring, [0, 1], [400, 0]);
  const gridScale = interpolate(entranceSpring, [0, 1], [0.5, 1]);

  // Sun rising in the background
  const sunY = interpolate(doorOpenSpring, [0, 1], [150, 0]);

  // Door rotation (Isometric Y-axis swing)
  const doorRotationY = interpolate(doorOpenSpring, [0, 1], [0, -130]);

  // Overall Exit transformations (dramatic slide & tilt)
  const exitTranslateX = interpolate(exitSpring, [0, 1], [0, -width * 1.2]);
  const exitRotate = interpolate(exitSpring, [0, 1], [0, -15]);
  const exitScale = interpolate(exitSpring, [0, 1], [1, 0.8]);

  // --- STYLES ---

  const containerStyle: React.CSSProperties = {
    backgroundColor: COLORS.bgTransparent,
    fontFamily: '"Arial Black", Impact, sans-serif',
    overflow: 'hidden',
    perspective: '1200px',
  };

  const masterWrapperStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'relative',
    transform: `translateX(${exitTranslateX}px) rotate(${exitRotate}deg) scale(${exitScale})`,
    transformOrigin: 'left center',
  };

  // Infinite Perspective Grid (3D floor)
  const gridContainerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: -100,
    width: '200%',
    height: '100%',
    left: '-50%',
    backgroundImage: `
      linear-gradient(90deg, ${COLORS.black} 4px, transparent 4px),
      linear-gradient(0deg, ${COLORS.black} 4px, transparent 4px)
    `,
    backgroundSize: '80px 80px',
    backgroundColor: COLORS.cyan,
    borderTop: `8px solid ${COLORS.black}`,
    transform: `rotateX(75deg) translateY(${gridY}px) scale(${gridScale})`,
    transformOrigin: 'center bottom',
    boxShadow: `inset 0px 50px 100px rgba(0,0,0,0.3)`,
  };

  // Horizon Sky Block (behind the grid to create a hard horizon line)
  const skyStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '55%',
    backgroundColor: COLORS.magenta,
    borderBottom: `10px solid ${COLORS.black}`,
    zIndex: 1,
  };

  // Giant Retro Sun on the horizon
  const sunStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: -150,
    left: '50%',
    width: 400,
    height: 400,
    borderRadius: '50%',
    backgroundColor: COLORS.yellow,
    border: `8px solid ${COLORS.black}`,
    transform: `translateX(-50%) translateY(${sunY}px)`,
    boxShadow: `10px 10px 0px ${COLORS.black}`,
    zIndex: 2,
  };

  // 3D Portal Frame Container
  const portalWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    width: 320,
    height: 460,
    bottom: '22%',
    left: '15%',
    transform: `scale(${entranceSpring}) rotateY(20deg) rotateX(5deg)`,
    transformStyle: 'preserve-3d',
    perspective: 1000,
    zIndex: 10,
  };

  // The actual frame structure
  const portalFrameStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.black,
    border: `8px solid ${COLORS.black}`,
    boxShadow: `15px 15px 0px ${COLORS.purple}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  // The "Void" inside the portal (revealed when door opens)
  const portalVoidStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.purple,
    backgroundImage: `radial-gradient(circle, ${COLORS.yellow} 20%, transparent 20%)`,
    backgroundSize: '30px 30px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // The Door that swings open
  const doorStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.yellow,
    border: `8px solid ${COLORS.black}`,
    transformOrigin: 'left center',
    transform: `rotateY(${doorRotationY}deg)`,
    transition: 'transform 0.05s linear',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    zIndex: 12,
    backfaceVisibility: 'hidden',
  };

  // Door Handle
  const handleStyle: React.CSSProperties = {
    position: 'absolute',
    right: 20,
    width: 24,
    height: 80,
    backgroundColor: COLORS.black,
    border: `4px solid ${COLORS.white}`,
    borderRadius: 4,
    boxShadow: `4px 4px 0px ${COLORS.black}`,
  };

  // --- TYPOGRAPHY / TEXT BADGES ---
  
  const textContainerStyle: React.CSSProperties = {
    position: 'absolute',
    right: '10%',
    top: '25%',
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    zIndex: 20,
    transform: `scale(${textPopSpring}) rotate(-3deg)`,
  };

  const badgeStyle = (bgColor: string, delayRotate: number): React.CSSProperties => ({
    backgroundColor: bgColor,
    color: COLORS.black,
    padding: '16px 32px',
    fontSize: 56,
    textTransform: 'uppercase',
    border: `8px solid ${COLORS.black}`,
    boxShadow: `10px 10px 0px ${COLORS.black}`,
    transform: `rotate(${delayRotate}deg)`,
    display: 'inline-block',
    whiteSpace: 'nowrap',
  });

  return (
    <AbsoluteFill style={containerStyle}>
      <div style={masterWrapperStyle}>
        
        {/* BACKGROUND SKY */}
        <div style={skyStyle}>
          <div style={sunStyle} />
        </div>

        {/* PERSPECTIVE GRID FLOOR */}
        <div style={gridContainerStyle} />

        {/* PORTAL SYSTEM */}
        <div style={portalWrapperStyle}>
          <div style={portalFrameStyle}>
            {/* Inner Void */}
            <div style={portalVoidStyle}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: COLORS.white,
                  border: `6px solid ${COLORS.black}`,
                  borderRadius: '50%',
                  boxShadow: `6px 6px 0px ${COLORS.black}`,
                }}
              />
            </div>

            {/* Swinging Door */}
            <div style={doorStyle}>
              {/* Pattern on the door */}
              <div
                style={{
                  width: '80%',
                  height: '80%',
                  border: `4px dashed ${COLORS.black}`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <span style={{ fontSize: 32, color: COLORS.black, fontWeight: 'bold' }}>
                  PUSH
                </span>
                <div style={handleStyle} />
              </div>
            </div>
          </div>

          {/* CONFETTI BLAST */}
          {CONFETTI_ITEMS.map((item) => {
            // Animating each confetti piece starting from its own delayed frame
            const itemProgress = spring({
              frame: Math.max(0, frame - 15 - item.delay),
              fps,
              config: { damping: 15, mass: 0.5, stiffness: 100 },
            });

            if (itemProgress <= 0) return null;

            const tX = Math.cos(item.angle) * item.distance * itemProgress;
            // Add a gravity arc to the Y trajectory
            const tY = Math.sin(item.angle) * item.distance * itemProgress - (itemProgress * 120) + (itemProgress * itemProgress * 150);
            const scale = interpolate(itemProgress, [0, 0.1, 0.8, 1], [0, 1.3, 1, 0]);
            const rotation = item.rotationStart + itemProgress * 720;

            const confettiStyle: React.CSSProperties = {
              position: 'absolute',
              width: item.size,
              height: item.size,
              backgroundColor: item.color,
              border: `3px solid ${COLORS.black}`,
              top: '50%',
              left: '50%',
              transform: `translate3d(${tX}px, ${tY}px, 100px) rotate(${rotation}deg) scale(${scale})`,
              borderRadius: item.shape === 'circle' ? '50%' : item.shape === 'diamond' ? '4px' : '0px',
              boxShadow: `3px 3px 0px ${COLORS.black}`,
              zIndex: 15,
            };

            return <div key={item.id} style={confettiStyle} />;
          })}
        </div>

        {/* NEUBRUTALIST TYPOGRAPHY */}
        <div style={textContainerStyle}>
          <div style={badgeStyle(COLORS.green, -2)}>
            ENTER THE
          </div>
          <div style={badgeStyle(COLORS.yellow, 3)}>
            CREATIVE
          </div>
          <div style={badgeStyle(COLORS.magenta, -1)}>
            HORIZON
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
}