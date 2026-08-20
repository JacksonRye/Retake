import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene3() {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 1.0s): STEP-BOUNCE ENTRANCE
  // ==========================================
  const docEntrance = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 220, mass: 0.7 }
  });
  const docTranslateY = interpolate(docEntrance, [0, 1], [-900, 0], clamp);
  const docScale = interpolate(docEntrance, [0, 1], [0.75, 1], clamp);

  const headerBadgeSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 260 }
  });

  // ==========================================
  // BEAT 2 (1.0s – 2.8s): PROGRESS TICKS & REJECTION STAMP
  // ==========================================
  // Ticks rapidly from 0% to 15% between frames 24 and 48, then abruptly freezes
  const rawProgress = interpolate(frame, [24, 48], [0, 15], clamp);
  const progressPercent = Math.min(15, Math.floor(rawProgress));
  const isFrozen = frame >= 48;

  // Stamp Slap at Frame 56 (~1.85s)
  const stampTrigger = 56;
  const isStamped = frame >= stampTrigger;
  const stampSpring = spring({
    frame: frame - stampTrigger,
    fps,
    config: { damping: 9, stiffness: 280, mass: 0.5 }
  });
  const stampScale = interpolate(stampSpring, [0, 1], [3.2, 1], clamp);
  const stampOpacity = isStamped ? 1 : 0;

  // Camera / Document Screen Shake on Stamp Impact
  const impactAge = frame - stampTrigger;
  const isImpact = impactAge >= 0 && impactAge < 10;
  const shakeDecay = Math.max(0, 1 - impactAge / 10);
  const shakeX = isImpact ? Math.sin(impactAge * 3.2) * 16 * shakeDecay : 0;
  const shakeY = isImpact ? Math.cos(impactAge * 2.7) * 16 * shakeDecay : 0;

  // ==========================================
  // BEAT 3 (2.8s – 4.5s): LIVING PHYSICS & SNAPPY EXIT
  // ==========================================
  const hoverY = Math.sin(frame * 0.12) * 6;
  const hoverRotate = Math.sin(frame * 0.09) * 1.4;
  const shadowOffset = 14 + Math.sin(frame * 0.14) * 4;

  const exitStart = durationInFrames - 12;
  const exitSpring = spring({
    frame: frame - exitStart,
    fps,
    config: { damping: 12, stiffness: 240 }
  });
  const exitTranslateY = interpolate(exitSpring, [0, 1], [0, 1100], clamp);
  const exitRotate = interpolate(exitSpring, [0, 1], [0, -16], clamp);

  // Consolidated Transformations
  const totalY = docTranslateY + hoverY + shakeY + exitTranslateY;
  const totalX = shakeX;
  const totalRotate = hoverRotate + exitRotate;
  const totalScale = docScale;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FF90E8',
        backgroundImage: `
          linear-gradient(#000000 1.5px, transparent 1.5px),
          linear-gradient(90deg, #000000 1.5px, transparent 1.5px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '-1px -1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, "Arial Black", sans-serif',
        overflow: 'hidden'
      }}
    >
      {/* MAIN DOCUMENT CONTAINER */}
      <div
        style={{
          width: '90%',
          maxWidth: 760,
          backgroundColor: '#FFF8E7',
          border: '5px solid #000000',
          borderRadius: 28,
          boxShadow: `${shadowOffset}px ${shadowOffset}px 0px #000000`,
          transform: `translate(${totalX}px, ${totalY}px) rotate(${totalRotate}deg) scale(${totalScale})`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          padding: 0,
          overflow: 'hidden'
        }}
      >
        {/* DOCUMENT WINDOW HEADER */}
        <div
          style={{
            backgroundColor: '#000000',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#FF90E8' }} />
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#F1F333' }} />
            <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: '#23A094' }} />
          </div>
          <span style={{ color: '#FFF8E7', fontWeight: 900, fontSize: 18, letterSpacing: '0.06em' }}>
            PAPERWORK_VERIFY_v1.PDF
          </span>
        </div>

        {/* DOCUMENT INNER CONTENT */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: 28 }}>
          
          {/* HEADER ROW */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#000000', opacity: 0.7, letterSpacing: '0.1em' }}>
                DOCUMENT STATUS
              </span>
              <span style={{ fontSize: 32, fontWeight: 900, color: '#000000', lineHeight: 1 }}>
                FILING #8092-B
              </span>
            </div>

            <div
              style={{
                transform: `scale(${headerBadgeSpring})`,
                backgroundColor: isFrozen ? '#F1F333' : '#FFF8E7',
                border: '3px solid #000000',
                borderRadius: 12,
                padding: '8px 16px',
                fontSize: 16,
                fontWeight: 900,
                color: '#000000',
                boxShadow: '4px 4px 0px #000000'
              }}
            >
              {isFrozen ? "⚠️ UNCERTAIN" : "IN REVIEW"}
            </div>
          </div>

          {/* MOCK FORM DATA ROWS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '3px solid #000000',
                borderRadius: 14,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '4px 4px 0px #000000'
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 800, color: '#000000' }}>Compliance Reassurance</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#000000', backgroundColor: '#FF90E8', padding: '4px 10px', borderRadius: 8, border: '2px solid #000' }}>
                NONE DETECTED
              </span>
            </div>

            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '3px solid #000000',
                borderRadius: 14,
                padding: '14px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '4px 4px 0px #000000'
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 800, color: '#000000' }}>Filing Accuracy</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: '#000000', backgroundColor: '#F1F333', padding: '4px 10px', borderRadius: 8, border: '2px solid #000' }}>
                UNKNOWN
              </span>
            </div>
          </div>

          {/* PROGRESS METRIC BOX */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '4px solid #000000',
              borderRadius: 20,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '6px 6px 0px #000000'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 24, fontWeight: 900, color: '#000000', letterSpacing: '-0.02em' }}>
                CLARITY INDEX
              </span>
              <span
                style={{
                  fontSize: 28,
                  fontWeight: 900,
                  color: '#000000',
                  backgroundColor: isFrozen ? '#FF90E8' : '#23A094',
                  padding: '4px 14px',
                  borderRadius: 10,
                  border: '3px solid #000000'
                }}
              >
                {progressPercent}%
              </span>
            </div>

            {/* PROGRESS TRACK */}
            <div
              style={{
                width: '100%',
                height: 36,
                backgroundColor: '#FFF8E7',
                border: '4px solid #000000',
                borderRadius: 12,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: `${progressPercent}%`,
                  height: '100%',
                  backgroundColor: '#23A094',
                  transition: 'width 0.05s linear'
                }}
              />
              {/* Frozen Hatch Overlay */}
              {isFrozen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)',
                    opacity: 0.15
                  }}
                />
              )}
            </div>
          </div>

        </div>

        {/* OVERLAY STAMP: "REJECTED" */}
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '50%',
            opacity: stampOpacity,
            transform: `translate(-50%, -50%) scale(${stampScale}) rotate(-12deg)`,
            backgroundColor: '#F1F333',
            border: '8px solid #000000',
            borderRadius: 24,
            padding: '20px 48px',
            boxShadow: '16px 16px 0px #000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 10
          }}
        >
          <span
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: '#000000',
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              textShadow: '3px 3px 0px #FF90E8'
            }}
          >
            REJECTED
          </span>
          <div
            style={{
              marginTop: 10,
              backgroundColor: '#000000',
              color: '#FFF8E7',
              fontSize: 18,
              fontWeight: 900,
              padding: '6px 16px',
              borderRadius: 8,
              letterSpacing: '0.1em'
            }}
          >
            TOO LATE TO FIX
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
}