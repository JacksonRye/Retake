'use client';

import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, OffthreadVideo, staticFile } from 'remotion';

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

// Fallback style palettes
const STYLE_PALETTES: Record<string, { bg: string; card: string; text: string; accent: string; border: string; tag: string }> = {
  CHRON_STYLE_100: { bg: '#0A0B0E', card: '#FFF8E7', text: '#000000', accent: '#FF90E8', border: '#000000', tag: '#23A094' },
  CHRON_STYLE_98: { bg: '#08090C', card: '#12141C', text: '#00FF66', accent: '#FF0055', border: '#00FF66', tag: '#00E5FF' },
  CHRON_STYLE_72: { bg: '#050505', card: '#161618', text: '#FFFFFF', accent: '#A1A1AA', border: '#27272A', tag: '#52525B' },
  CHRON_STYLE_55: { bg: '#0F172A', card: '#1E293B', text: '#F8FAFC', accent: '#38BDF8', border: '#334155', tag: '#818CF8' },
  CHRON_STYLE_01: { bg: '#141414', card: '#F4EFE3', text: '#141414', accent: '#C8102E', border: '#141414', tag: '#C9A656' },
  CHRON_STYLE_02: { bg: '#0A0E1A', card: '#1F2937', text: '#FFFFFF', accent: '#FFB300', border: '#FFB300', tag: '#22D3EE' },
};

function SingleSceneVisual({ scene, styleCode }: { scene: SceneData; styleCode: string }) {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const clamp = { extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const };

  // 3-Beat Motion Physics
  // Beat 1: Snappy spring entrance pop
  const entrance = spring({ frame, fps, config: { damping: 12, stiffness: 220, mass: 0.6 } });
  const scale = interpolate(entrance, [0, 1], [0.8, 1], clamp);
  const translateY = interpolate(entrance, [0, 1], [40, 0], clamp);

  // Beat 2: Active kinetic transformation
  const pulse = interpolate(Math.sin(frame * 0.15), [-1, 1], [0.98, 1.02]);
  const counterValue = Math.min(100, Math.floor(interpolate(frame, [15, 60], [0, 100], clamp)));

  // Beat 3: Living micro-hover & exit snap
  const hoverY = Math.sin(frame * 0.12) * 5;
  const exitProgress = spring({ frame: frame - (durationInFrames - 12), fps, config: { damping: 14, stiffness: 240 } });
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);

  const palette = STYLE_PALETTES[styleCode] || STYLE_PALETTES.CHRON_STYLE_100;
  const isNeubrutal = styleCode.includes('100');

  const lineText = scene.verbatim_line || "Key Takeaway Point";
  const metaphorText = scene.visual_metaphor || "";

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
        opacity: entrance * exitOpacity,
        transform: `translateY(${translateY + hoverY}px) scale(${scale * pulse * exitScale})`,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          backgroundColor: palette.card,
          color: palette.text,
          padding: '36px 40px',
          borderRadius: isNeubrutal ? 28 : 24,
          border: isNeubrutal ? `4px solid ${palette.border}` : `2px solid ${palette.border}`,
          boxShadow: isNeubrutal ? `10px 10px 0px ${palette.border}` : '0 25px 50px -12px rgba(0,0,0,0.6)',
          fontFamily: isNeubrutal ? 'system-ui, -apple-system, sans-serif' : 'inherit',
          position: 'relative',
        }}
      >
        {/* Top Tag & Style Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div
            style={{
              fontSize: 14,
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: 1.5,
              backgroundColor: palette.tag,
              color: '#FFFFFF',
              padding: '6px 14px',
              borderRadius: isNeubrutal ? 10 : 8,
              border: isNeubrutal ? '2px solid #000000' : 'none',
              boxShadow: isNeubrutal ? '3px 3px 0px #000000' : 'none',
            }}
          >
            Scene {scene.scene_number || 1} • {styleCode}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: isNeubrutal ? '#000000' : '#A1A1AA',
              backgroundColor: palette.accent,
              padding: '4px 10px',
              borderRadius: 8,
              border: isNeubrutal ? '2px solid #000000' : 'none',
            }}
          >
            {counterValue}% IMPACT
          </div>
        </div>

        {/* Primary Spoken Hook Line */}
        <div
          style={{
            fontSize: lineText.length > 60 ? 30 : 36,
            fontWeight: 900,
            lineHeight: 1.25,
            color: palette.text,
            marginBottom: 20,
            textShadow: isNeubrutal ? 'none' : '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          "{lineText}"
        </div>

        {/* Visual Metaphor / Action Pill */}
        {metaphorText && (
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              lineHeight: 1.4,
              opacity: 0.85,
              backgroundColor: isNeubrutal ? '#FFFFFF' : 'rgba(255,255,255,0.06)',
              color: palette.text,
              padding: '14px 18px',
              borderRadius: 16,
              border: isNeubrutal ? '2px solid #000000' : '1px solid rgba(255,255,255,0.1)',
            }}
          >
            💡 {metaphorText.length > 120 ? `${metaphorText.substring(0, 120)}...` : metaphorText}
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
  videoUrl = 'video.mp4',
}: DynamicRemotionCompositionProps) {
  const isSingleScene = activeComp !== 'FullEditPixel';
  const selectedScene = isSingleScene
    ? scenes.find((s, idx) => s.component_name === activeComp || `Scene ${s.scene_number || idx + 1}` === activeComp || `Scene${s.scene_number || idx + 1}` === activeComp) || scenes[0]
    : null;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0B0E', overflow: 'hidden' }}>
      {/* Background Video Layer */}
      <OffthreadVideo
        src={staticFile(videoUrl || 'video.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.85,
        }}
      />

      {/* Dynamic Scene Overlays */}
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
