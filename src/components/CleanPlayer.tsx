'use client';

import React from 'react';
import { Player } from '@remotion/player';
import FullEditPixel from '@/remotion_components/FullEditPixel';

interface CleanPlayerProps {
  activeComp: string;
  totalFrames?: number;
}

export default function CleanPlayer({ activeComp, totalFrames = 900 }: CleanPlayerProps) {
  let Component: React.FC = FullEditPixel;
  let durationInFrames = totalFrames;

  if (activeComp === 'FullEditPixel') {
    Component = FullEditPixel;
    durationInFrames = totalFrames;
  } else {
    // Dynamically resolve component from generated folder or base
    try {
      const mod = require(`@/remotion_components/generated/${activeComp}`);
      Component = mod.default || mod[activeComp] || FullEditPixel;
      durationInFrames = 135; // 4.5 seconds burst for individual scenes
    } catch (e1) {
      try {
        const modLegacy = require(`@/remotion_components/PixelQuest/${activeComp}`);
        Component = modLegacy[activeComp] || modLegacy.default || FullEditPixel;
        durationInFrames = 270;
      } catch (e2) {
        console.warn(`Could not dynamically load component '${activeComp}', using FullEditPixel fallback.`);
        Component = FullEditPixel;
        durationInFrames = 2056;
      }
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-black relative">
      <Player
        key={activeComp}
        component={Component}
        durationInFrames={durationInFrames}
        compositionWidth={1080}
        compositionHeight={1920}
        fps={30}
        controls
        loop
        autoPlay
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
    </div>
  );
}
