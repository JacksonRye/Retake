import React from 'react';
import { AbsoluteFill, Sequence, OffthreadVideo, staticFile } from 'remotion';
import Style90CaliberWatchMacro_Scene1 from './generated/Style90CaliberWatchMacro_Scene1';
import Style90CaliberWatchMacro_Scene2 from './generated/Style90CaliberWatchMacro_Scene2';
import Style90CaliberWatchMacro_Scene3 from './generated/Style90CaliberWatchMacro_Scene3';
import Style90CaliberWatchMacro_Scene4 from './generated/Style90CaliberWatchMacro_Scene4';
import Style90CaliberWatchMacro_Scene5 from './generated/Style90CaliberWatchMacro_Scene5';

export function FullEditPixel() {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <OffthreadVideo src={staticFile('video.mp4')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Sequence from={30} durationInFrames={135}>
          <Style90CaliberWatchMacro_Scene1 />
        </Sequence>
        <Sequence from={210} durationInFrames={135}>
          <Style90CaliberWatchMacro_Scene2 />
        </Sequence>
        <Sequence from={405} durationInFrames={135}>
          <Style90CaliberWatchMacro_Scene3 />
        </Sequence>
        <Sequence from={600} durationInFrames={135}>
          <Style90CaliberWatchMacro_Scene4 />
        </Sequence>
        <Sequence from={780} durationInFrames={135}>
          <Style90CaliberWatchMacro_Scene5 />
        </Sequence>
    </AbsoluteFill>
  );
}

export default FullEditPixel;
