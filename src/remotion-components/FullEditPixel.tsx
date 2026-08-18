import {PixelScene5_V2} from './PixelQuest/Scene5_V2';
import {PixelScene2_V8} from './PixelQuest/Scene2_V8';
import {PixelScene2_V7} from './PixelQuest/Scene2_V7';
import React from 'react';
import {AbsoluteFill, Sequence, staticFile, Video} from 'remotion';
import {PixelScene1} from './PixelQuest/Scene1';
import {PixelScene2_V3} from './PixelQuest/Scene2_V3';
import {PixelScene3} from './PixelQuest/Scene3';
import {PixelScene4} from './PixelQuest/Scene4';
import {PixelScene5} from './PixelQuest/Scene5';
import {PixelScene6} from './PixelQuest/Scene6';

export const FullEditPixel: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      {/* 1. Base Track: Presenter Video (Continuous Underneath) */}
      <Video
        src={staticFile('video.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* 2. Placed Approved Scene Sequence */}
      {/* Scene 1: 0:00 – 0:07 (Frames 0 to 210) */}
      <Sequence from={0} durationInFrames={210}>
        <PixelScene1 />
      </Sequence>

      {/* Scene 2: 0:07 – 0:16 (Frames 210 to 480) - APPROVED V3: Pure Transparent Gold Overlay */}
      <Sequence from={210} durationInFrames={270}>
        <PixelScene2_V8 />
      </Sequence>

      {/* Scene 3: 0:16 – 0:27 (Frames 480 to 810) */}
      <Sequence from={480} durationInFrames={330}>
        <PixelScene3 />
      </Sequence>

      {/* Scene 4: 0:27 – 0:37 (Frames 810 to 1110) */}
      <Sequence from={810} durationInFrames={300}>
        <PixelScene4 />
      </Sequence>

      {/* Scene 5: 0:37 – 0:52 (Frames 1110 to 1560) */}
      <Sequence from={1110} durationInFrames={450}>
        <PixelScene5_V2 />
      </Sequence>

      {/* Scene 6: 0:52 – 1:08.56 (Frames 1560 to 2056) */}
      <Sequence from={1560} durationInFrames={496}>
        <PixelScene6 />
      </Sequence>
    </AbsoluteFill>
  );
};
