import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Video } from 'remotion';

export interface SceneData {
  scene_id?: string;
  scene_number?: number;
  start_time: number;
  end_time: number;
  duration_seconds: number;
  verbatim_line?: string;
  visual_metaphor?: string;
  component_name?: string;
  style?: string;
}

export interface DynamicRemotionCompositionProps {
  scenes: SceneData[];
  styleCode: string;
  activeComp: string;
  videoUrl?: string;
}

// 60-Style Theme Presets
const STYLE_PALETTES: Record<string, { bg: string; card: string; text: string; accent: string; border: string; tag: string; badge: string; shadow: string }> = {
  CHRON_STYLE_100: { bg: '#0A0B0E', card: '#FFF8E7', text: '#000000', accent: '#FF90E8', border: '#000000', tag: '#F1F333', badge: '#23A094', shadow: '#000000' },
  CHRON_STYLE_98: { bg: '#08090C', card: '#12141C', text: '#00FF66', accent: '#FF0055', border: '#00FF66', tag: '#00E5FF', badge: '#FF0055', shadow: '#00FF66' },
  CHRON_STYLE_72: { bg: '#050505', card: '#161618', text: '#FFFFFF', accent: '#F43F5E', border: '#27272A', tag: '#A1A1AA', badge: '#3B82F6', shadow: '#000000' },
  CHRON_STYLE_55: { bg: '#0F172A', card: '#1E293B', text: '#F8FAFC', accent: '#38BDF8', border: '#334155', tag: '#818CF8', badge: '#38BDF8', shadow: '#0F172A' },
  CHRON_STYLE_01: { bg: '#141414', card: '#F4EFE3', text: '#141414', accent: '#C8102E', border: '#141414', tag: '#C9A656', badge: '#C8102E', shadow: '#141414' },
  CHRON_STYLE_02: { bg: '#0A0E1A', card: '#1F2937', text: '#FFFFFF', accent: '#FFB300', border: '#FFB300', tag: '#22D3EE', badge: '#FFB300', shadow: '#000000' },
};

function SingleSceneVisual({ scene, styleCode }: { scene: SceneData; styleCode: string }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // ==========================================
  // BEAT 1 (0.0s – 0.8s): HARD SNAP ENTRANCE
  // ==========================================
  const entrance = spring({ frame, fps, config: { damping: 12, stiffness: 260, mass: 0.6 } });
  const scale = interpolate(entrance, [0, 1], [0.3, 1], clamp);
  const rotateEntrance = interpolate(entrance, [0, 1], [-8, 0], clamp);
  const opacity = interpolate(entrance, [0, 0.2], [0, 1], clamp);

  // ==========================================
  // BEAT 2 (0.8s – 3.0s): ACTIVE KINETIC TRANSFORMATION
  // ==========================================
  // Bouncing sticker badge spring
  const stickerSpring = spring({ frame: frame - 18, fps, config: { damping: 10, stiffness: 320, mass: 0.5 } });
  const stickerScale = frame < 18 ? 0 : interpolate(stickerSpring, [0, 1], [2.2, 1], clamp);
  const stickerRotate = frame < 18 ? 0 : interpolate(stickerSpring, [0, 1], [25, 8], clamp);

  // Dynamic numerical ticker
  const countRaw = interpolate(frame, [20, 65], [0, 50000], clamp);
  const formattedCount = "$" + Math.round(countRaw).toLocaleString('en-US');

  // Pulse & alive wobble
  const pulse = interpolate(Math.sin(frame * 0.16), [-1, 1], [0.985, 1.015]);
  const hoverY = Math.sin(frame * 0.12) * 6;

  // ==========================================
  // BEAT 3 (3.0s – End): LIVING EXIT SNAP
  // ==========================================
  const exitProgress = spring({ frame: frame - (durationInFrames - 12), fps, config: { damping: 14, stiffness: 240 } });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.85], clamp);

  const palette = STYLE_PALETTES[styleCode] || STYLE_PALETTES.CHRON_STYLE_100;
  const isNeubrutal = styleCode.includes('100');

  const lineText = scene.verbatim_line || "High-Impact Kinetic Takeaway";

  // Split spoken line into punchy kinetic words
  const words = lineText.split(' ').slice(0, 14);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 48px',
        opacity: opacity * exitOpacity,
        transform: `translateY(${hoverY}px) scale(${scale * pulse * exitScale}) rotate(${rotateEntrance}deg)`,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 920,
          backgroundColor: palette.card,
          color: palette.text,
          padding: '36px 44px',
          borderRadius: isNeubrutal ? 28 : 24,
          border: isNeubrutal ? `4px solid ${palette.border}` : `2px solid ${palette.border}`,
          boxShadow: isNeubrutal ? `10px 10px 0px ${palette.shadow}` : '0 30px 60px -15px rgba(0,0,0,0.8)',
          fontFamily: isNeubrutal ? 'system-ui, -apple-system, sans-serif' : 'inherit',
          position: 'relative',
        }}
      >
        {/* Top Header Pill Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              backgroundColor: palette.tag,
              color: '#000000',
              padding: '8px 18px',
              borderRadius: isNeubrutal ? 12 : 8,
              border: isNeubrutal ? '2.5px solid #000000' : 'none',
              boxShadow: isNeubrutal ? '3px 3px 0px #000000' : 'none',
            }}
          >
            ⚡ SCENE {scene.scene_number || 1}
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 900,
              color: '#FFFFFF',
              backgroundColor: palette.badge,
              padding: '6px 14px',
              borderRadius: isNeubrutal ? 10 : 8,
              border: isNeubrutal ? '2px solid #000000' : 'none',
              boxShadow: isNeubrutal ? '2px 2px 0px #000000' : 'none',
            }}
          >
            {formattedCount} VALUE
          </div>
        </div>

        {/* Dynamic Kinetic Words */}
        <div
          style={{
            fontSize: lineText.length > 70 ? 32 : 38,
            fontWeight: 900,
            lineHeight: 1.25,
            color: palette.text,
            letterSpacing: -0.5,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 12px',
          }}
        >
          {words.map((word, wIdx) => {
            const wordSpring = spring({ frame: frame - (wIdx * 2.5), fps, config: { damping: 12, stiffness: 280 } });
            const isHighlight = wIdx % 4 === 1 || wIdx === words.length - 1;
            return (
              <span
                key={wIdx}
                style={{
                  display: 'inline-block',
                  transform: `scale(${interpolate(wordSpring, [0, 1], [0.8, 1], clamp)})`,
                  opacity: interpolate(wordSpring, [0, 0.4], [0, 1], clamp),
                  backgroundColor: isHighlight ? palette.accent : 'transparent',
                  color: isHighlight ? '#000000' : palette.text,
                  padding: isHighlight ? '2px 8px' : '0px',
                  borderRadius: isHighlight ? 8 : 0,
                  border: isHighlight && isNeubrutal ? '2px solid #000000' : 'none',
                }}
              >
                {word}
              </span>
            );
          })}
        </div>

        {/* Floating Rotational Sticker Badge */}
        {stickerScale > 0 && (
          <div
            style={{
              position: 'absolute',
              top: -18,
              right: 28,
              transform: `scale(${stickerScale}) rotate(${stickerRotate}deg)`,
              backgroundColor: palette.accent,
              color: '#000000',
              fontWeight: 900,
              fontSize: 13,
              padding: '6px 14px',
              borderRadius: 10,
              border: isNeubrutal ? '3px solid #000000' : 'none',
              boxShadow: isNeubrutal ? '4px 4px 0px #000000' : 'none',
              letterSpacing: 1,
            }}
          >
            🔥 HIGH CONVERSION
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
}

export default function DynamicRemotionComposition({
  scenes = [],
  styleCode = 'CHRON_STYLE_100',
  activeComp = 'FullEditPixel',
  videoUrl = '/api/video/stream',
}: DynamicRemotionCompositionProps) {
  const isSingleScene = activeComp !== 'FullEditPixel';
  const selectedScene = isSingleScene
    ? scenes.find((s, idx) => s.component_name === activeComp || `Scene ${s.scene_number || idx + 1}` === activeComp || `Scene${s.scene_number || idx + 1}` === activeComp) || scenes[0]
    : null;

  const resolvedVideoSrc = (videoUrl && (videoUrl.startsWith('http') || videoUrl.startsWith('/')))
    ? videoUrl
    : '/api/video/stream';

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000', overflow: 'hidden' }}>
      {/* 🚀 Hardware-Accelerated Native Video Stream Layer */}
      <Video
        src={resolvedVideoSrc}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      {/* Dynamic Animated Motion Graphics Overlays */}
      {isSingleScene && selectedScene ? (
        <Sequence from={0} durationInFrames={Math.round((selectedScene.duration_seconds || 4.5) * 30)}>
          <SingleSceneVisual scene={selectedScene} styleCode={styleCode} />
        </Sequence>
      ) : (
        scenes.map((scene, idx) => {
          const fromFrame = Math.max(0, Math.round((scene.start_time || idx * 5.5) * 30));
          const durationFrames = Math.max(30, Math.round((scene.duration_seconds || 4.5) * 30));

          return (
            <Sequence
              key={scene.component_name || `scene_${idx}`}
              from={fromFrame}
              durationInFrames={durationFrames}
            >
              <SingleSceneVisual scene={scene} styleCode={styleCode} />
            </Sequence>
          );
        })
      )}
    </AbsoluteFill>
  );
}
