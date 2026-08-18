import React from 'react';
import {AbsoluteFill, Sequence, staticFile, Video} from 'remotion';
import {Scene1} from './MissionControl/Scene1';
import {Scene2} from './MissionControl/Scene2';
import {Scene3} from './MissionControl/Scene3';
import {Scene4} from './MissionControl/Scene4';
import {Scene5} from './MissionControl/Scene5';
import {Scene6} from './MissionControl/Scene6';

export const FullEdit: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      {/* 1. Base Track: Talking Head Footage & Continuous Audio Spine */}
      <Video src={staticFile('video.mp4')} />

      {/* 2. Placed Graphic Scenes Cut In At Exact Timecodes */}
      {/* Scene 1: 0:00 – 0:07 (Frames 0 to 210) */}
      <Sequence from={0} durationInFrames={210}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: 0:07 – 0:16 (Frames 210 to 480) */}
      <Sequence from={210} durationInFrames={270}>
        <Scene2 />
      </Sequence>

      {/* Scene 3: 0:16 – 0:27 (Frames 480 to 810) */}
      <Sequence from={480} durationInFrames={330}>
        <Scene3 />
      </Sequence>

      {/* Scene 4: 0:27 – 0:37 (Frames 810 to 1110) */}
      <Sequence from={810} durationInFrames={300}>
        <Scene4 />
      </Sequence>

      {/* Scene 5: 0:37 – 0:52 (Frames 1110 to 1560) */}
      <Sequence from={1110} durationInFrames={450}>
        <Scene5 />
      </Sequence>

      {/* Scene 6: 0:52 – 1:08.56 (Frames 1560 to 2056) */}
      <Sequence from={1560} durationInFrames={496}>
        <Scene6 />
      </Sequence>
    </AbsoluteFill>
  );
};
