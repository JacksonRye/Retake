import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function NeubrutalStaircaseMorph() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- SPRINGS & ANIMATION TIMINGS ---
  // Entrance animation for the staircase steps
  const entranceSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8 },
  });

  // Hop Timings:
  // Hop 1 (Floor -> Step 1): Frame 8 to 20
  // Hop 2 (Step 1 -> Step 2): Frame 24 to 36
  // Hop 3 (Step 2 -> Step 3): Frame 40 to 52
  // Morph Phase (Step 3): Frame 52 to 70

  const p0 = { x: 255, y: 660 };  // Step 0 (Floor)
  const p1 = { x: 555, y: 510 };  // Step 1
  const p2 = { x: 855, y: 360 };  // Step 2
  const p3 = { x: 1180, y: 210 }; // Step 3 (Top Platform)

  let x = p0.x;
  let y = p0.y;
  let scaleX = 1;
  let scaleY = 1;
  let rotation = 0;

  if (frame < 8) {
    // Idle on Floor
    x = p0.x;
    y = p0.y;
  } else if (frame >= 8 && frame < 20) {
    // Hop 1
    const t = (frame - 8) / 12;
    x = interpolate(t, [0, 1], [p0.x, p1.x]);
    const yLinear = interpolate(t, [0, 1], [p0.y, p1.y]);
    const arc = 140 * Math.sin(t * Math.PI);
    y = yLinear - arc;

    scaleX = interpolate(Math.sin(t * Math.PI), [0, 0.5, 1], [1, 0.75, 1]);
    scaleY = interpolate(Math.sin(t * Math.PI), [0, 0.5, 1], [1, 1.35, 1]);
    rotation = interpolate(t, [0, 1], [0, 90]);
  } else if (frame >= 20 && frame < 24) {
    // Landed on Step 1 (Squash recovery)
    x = p1.x;
    y = p1.y;
    const t = (frame - 20) / 4;
    scaleX = interpolate(t, [0, 0.3, 1], [1.3, 0.85, 1]);
    scaleY = interpolate(t, [0, 0.3, 1], [0.7, 1.15, 1]);
    rotation = 90;
  } else if (frame >= 24 && frame < 36) {
    // Hop 2
    const t = (frame - 24) / 12;
    x = interpolate(t, [0, 1], [p1.x, p2.x]);
    const yLinear = interpolate(t, [0, 1], [p1.y, p2.y]);
    const arc = 140 * Math.sin(t * Math.PI);
    y = yLinear - arc;

    scaleX = interpolate(Math.sin(t * Math.PI), [0, 0.5, 1], [1, 0.75, 1]);
    scaleY = interpolate(Math.sin(t * Math.PI), [0, 0.5, 1], [1, 1.35, 1]);
    rotation = interpolate(t, [0, 1], [90, 180]);
  } else if (frame >= 36 && frame < 40) {
    // Landed on Step 2 (Squash recovery)
    x = p2.x;
    y = p2.y;
    const t = (frame - 36) / 4;
    scaleX = interpolate(t, [0, 0.3, 1], [1.3, 0.85, 1]);
    scaleY = interpolate(t, [0, 0.3, 1], [0.7, 1.15, 1]);
    rotation = 180;
  } else if (frame >= 40 && frame < 52) {
    // Hop 3
    const t = (frame - 40) / 12;
    x = interpolate(t, [0, 1], [p2.x, p3.x]);
    const yLinear = interpolate(t, [0, 1], [p2.y, p3.y]);
    const arc = 140 * Math.sin(t * Math.PI);
    y = yLinear - arc;

    scaleX = interpolate(Math.sin(t * Math.PI), [0, 0.5, 1], [1, 0.75, 1]);
    scaleY = interpolate(Math.sin(t * Math.PI), [0, 0.5, 1], [1, 1.35, 1]);
    rotation = interpolate(t, [0, 1], [180, 270]);
  } else {
    // Landed on Top Platform & Morphing
    x = p3.x;
    y = p3.y;
    rotation = 270;
    if (frame >= 52 && frame < 56) {
      const t = (frame - 52) / 4;
      scaleX = interpolate(t, [0, 0.3, 1], [1.4, 0.8, 1]);
      scaleY = interpolate(t, [0, 0.3, 1], [0.6, 1.2, 1]);
    } else {
      scaleX = 1;
      scaleY = 1;
    }
  }

  // Morph spring triggers right after landing on Step 3
  const morphSpring = spring({
    frame: frame - 52,
    fps,
    config: { damping: 10, mass: 0.6 },
  });

  // Step Label pop-in springs
  const pop0 = spring({ frame: frame - 0, fps, config: { damping: 12 } });
  const pop1 = spring({ frame: frame - 20, fps, config: { damping: 12 } });
  const pop2 = spring({ frame: frame - 36, fps, config: { damping: 12 } });
  const pop3 = spring({ frame: frame - 52, fps, config: { damping: 12 } });

  // --- DYNAMIC GEOMETRY GENERATION ---
  // Morphing from circle (24 points at radius 70) to 12-pointed star (alternating 95 and 35)
  const numPoints = 24;
  const pointsArray: string[] = [];
  const rCircle = 70;
  const rStarOuter = 95;
  const rStarInner = 35;

  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 2 * Math.PI) / numPoints - Math.PI / 2;
    const isEven = i % 2 === 0;
    const targetRadius = isEven ? rStarOuter : rStarInner;
    const currentRadius = interpolate(morphSpring, [0, 1], [rCircle, targetRadius]);

    const px = 100 + currentRadius * Math.cos(angle);
    const py = 100 + currentRadius * Math.sin(angle);
    pointsArray.push(`${px},${py}`);
  }
  const polygonPoints = pointsArray.join(' ');

  // Color Interpolation (Yellow #FFE600 to Neon Orange #FF5F1F)
  const rColor = Math.round(interpolate(morphSpring, [0, 1], [255, 255]));
  const gColor = Math.round(interpolate(morphSpring, [0, 1], [230, 95]));
  const bColor = Math.round(interpolate(morphSpring, [0, 1], [0, 31]));
  const characterFill = `rgb(${rColor}, ${gColor}, ${bColor})`;

  // Fade out smiley features
  const faceOpacity = interpolate(morphSpring, [0, 0.4], [1, 0]);

  // Burst Particles on Morph complete
  const burstSpring = spring({
    frame: frame - 53,
    fps,
    config: { damping: 15, mass: 0.8 },
  });
  const burstOpacity = interpolate(burstSpring, [0.6, 1], [1, 0]);
  const burstTranslate = interpolate(burstSpring, [0, 1], [0, 160]);

  // --- STYLING CONSTANTS (CHRON_STYLE_100) ---
  const brutalistBorder = '6px solid #000000';
  const brutalistShadow = '12px 12px 0px #000000';
  const textStyle: React.CSSProperties = {
    fontFamily: '"Arial Black", Impact, sans-serif',
    fontWeight: 900,
    textTransform: 'uppercase',
    color: '#000000',
  };

  return (
    <AbsoluteFill style={{ backgroundColor: 'transparent', overflow: 'hidden' }}>
      {/* Decorative Blueprint Background Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(#000000 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* STAIRCASE STEPS CONTAINER */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${entranceSpring})`,
          transformOrigin: 'bottom left',
        }}
      >
        {/* Step 0 (Floor/Start) */}
        <div
          style={{
            position: 'absolute',
            left: 200,
            top: 800,
            width: 250,
            height: 300,
            backgroundColor: '#FFFFFF',
            border: brutalistBorder,
            boxShadow: brutalistShadow,
          }}
        />
        {/* Step 1 */}
        <div
          style={{
            position: 'absolute',
            left: 500,
            top: 650,
            width: 250,
            height: 450,
            backgroundColor: '#A3E635', // Lime Green
            border: brutalistBorder,
            boxShadow: brutalistShadow,
          }}
        />
        {/* Step 2 */}
        <div
          style={{
            position: 'absolute',
            left: 800,
            top: 500,
            width: 250,
            height: 600,
            backgroundColor: '#00F5D4', // Vibrant Teal
            border: brutalistBorder,
            boxShadow: brutalistShadow,
          }}
        />
        {/* Step 3 (Landing Platform) */}
        <div
          style={{
            position: 'absolute',
            left: 1100,
            top: 350,
            width: 300,
            height: 750,
            backgroundColor: '#F15BB5', // Hot Pink
            border: brutalistBorder,
            boxShadow: brutalistShadow,
          }}
        />
      </div>

      {/* TECHNICAL ANNOTATION LABELS */}
      {/* Label 0 */}
      <div
        style={{
          position: 'absolute',
          left: 230,
          top: 740,
          transform: `scale(${pop0})`,
          backgroundColor: '#FFE600',
          border: '4px solid #000000',
          padding: '4px 12px',
          boxShadow: '4px 4px 0px #000000',
          ...textStyle,
          fontSize: 16,
          zIndex: 10,
        }}
      >
        01 / INIT
      </div>
      {/* Label 1 */}
      <div
        style={{
          position: 'absolute',
          left: 530,
          top: 590,
          transform: `scale(${pop1})`,
          backgroundColor: '#FFFFFF',
          border: '4px solid #000000',
          padding: '4px 12px',
          boxShadow: '4px 4px 0px #000000',
          ...textStyle,
          fontSize: 16,
          zIndex: 10,
        }}
      >
        02 / ITERATE
      </div>
      {/* Label 2 */}
      <div
        style={{
          position: 'absolute',
          left: 830,
          top: 440,
          transform: `scale(${pop2})`,
          backgroundColor: '#FFFFFF',
          border: '4px solid #000000',
          padding: '4px 12px',
          boxShadow: '4px 4px 0px #000000',
          ...textStyle,
          fontSize: 16,
          zIndex: 10,
        }}
      >
        03 / SCALE
      </div>
      {/* Label 3 */}
      <div
        style={{
          position: 'absolute',
          left: 1130,
          top: 290,
          transform: `scale(${pop3})`,
          backgroundColor: '#FF5F1F',
          color: '#FFFFFF',
          border: '4px solid #000000',
          padding: '4px 12px',
          boxShadow: '4px 4px 0px #000000',
          ...textStyle,
          fontSize: 16,
          zIndex: 10,
        }}
      >
        04 / EVOLVE
      </div>

      {/* BURST PARTICLES (Morph Explosion) */}
      {frame >= 52 && (
        <div style={{ position: 'absolute', left: p3.x + 70, top: p3.y + 70, pointerEvents: 'none' }}>
          {[0, 90, 180, 270].map((angle, index) => {
            const rad = (angle * Math.PI) / 180;
            const tx = burstTranslate * Math.cos(rad);
            const ty = burstTranslate * Math.sin(rad);
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  width: 24,
                  height: 24,
                  backgroundColor: '#FF5F1F',
                  border: '3px solid #000000',
                  transform: `translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(45deg)`,
                  opacity: burstOpacity,
                  boxShadow: '4px 4px 0px #000000',
                }}
              />
            );
          })}
        </div>
      )}

      {/* THE HOPPING & MORPHING CHARACTER */}
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 140,
          height: 140,
          transform: `scaleX(${scaleX}) scaleY(${scaleY}) rotate(${rotation}deg)`,
          transformOrigin: 'center center',
          zIndex: 20,
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          style={{ overflow: 'visible' }}
        >
          {/* Neubrutalist Offset Hard Shadow */}
          <polygon
            points={polygonPoints}
            fill="#000000"
            transform="translate(12, 12)"
          />

          {/* Main Morphing Shape */}
          <polygon
            points={polygonPoints}
            fill={characterFill}
            stroke="#000000"
            strokeWidth="8"
            strokeLinejoin="miter"
          />

          {/* Smiley Face Features (Fade out during morph) */}
          {faceOpacity > 0 && (
            <g style={{ opacity: faceOpacity }}>
              {/* Left Eye */}
              <circle cx="75" cy="85" r="9" fill="#000000" />
              {/* Right Eye */}
              <circle cx="125" cy="85" r="9" fill="#000000" />
              {/* Smile */}
              <path
                d="M 70 115 Q 100 145 130 115"
                stroke="#000000"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Dynamic Title Overlay */}
      <div
        style={{
          position: 'absolute',
          left: 100,
          top: 100,
          ...textStyle,
          fontSize: 48,
          lineHeight: 1,
          letterSpacing: '-2px',
          pointerEvents: 'none',
        }}
      >
        <div style={{ backgroundColor: '#000000', color: '#FFE600', padding: '10px 20px', display: 'inline-block', border: '4px solid #FFE600' }}>
          STAIRCASE
        </div>
        <br />
        <div style={{ backgroundColor: '#FFFFFF', color: '#000000', padding: '10px 20px', display: 'inline-block', border: '4px solid #000000', marginTop: 10 }}>
          MORPH_SYS_v1.0
        </div>
      </div>
    </AbsoluteFill>
  );
}