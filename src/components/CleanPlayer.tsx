'use client';

import React from 'react';
import { Player } from '@remotion/player';
import FullEditPixel from '@/remotion_components/FullEditPixel';
import DynamicRemotionComposition, { SceneData } from './DynamicRemotionComposition';

interface CleanPlayerProps {
  activeComp: string;
  totalFrames?: number;
  scenes?: SceneData[];
  styleCode?: string;
  videoUrl?: string;
}

export default function CleanPlayer({
  activeComp,
  totalFrames = 1801,
  scenes = [],
  styleCode = 'CHRON_STYLE_100',
  videoUrl = '/api/video/stream',
}: CleanPlayerProps) {
  const isSingleScene = activeComp !== 'FullEditPixel';
  const durationInFrames = isSingleScene ? 135 : totalFrames;

  const SelectedComponent = DynamicRemotionComposition;

  return (
    <div className="w-full h-full flex items-center justify-center bg-black relative">
      <Player
        key={`${activeComp}_${styleCode}_${scenes.length}_${totalFrames}`}
        component={SelectedComponent}
        inputProps={{
          scenes,
          styleCode,
          activeComp,
          videoUrl,
        }}
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
          objectFit: 'contain',
        }}
      />
    </div>
  );
}
