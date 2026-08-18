import React from 'react';
import {AbsoluteFill, Sequence, staticFile, Video} from 'remotion';
import {AirmailScene1} from './Airmail/Scene1';
import {AirmailScene2} from './Airmail/Scene2';
import {AirmailScene3} from './Airmail/Scene3';
import {AirmailScene4} from './Airmail/Scene4';
import {AirmailScene5} from './Airmail/Scene5';
import {AirmailScene6} from './Airmail/Scene6';

export const FullEditVertical: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      {/* 1. Base Track: Vertical Talking-Head Video Footage */}
      <Video
        src={staticFile('video.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* 2. Placed Airmail Graphic Scenes (CHRON_STYLE_13) */}
      {/* Scene 1: 0:00 – 0:07 (Frames 0 to 210) */}
      <Sequence from={0} durationInFrames={210}>
        <AirmailScene1 />
      </Sequence>

      {/* Scene 2: 0:07 – 0:16 (Frames 210 to 480) */}
      <Sequence from={210} durationInFrames={270}>
        <AirmailScene2 />
      </Sequence>

      {/* Scene 3: 0:16 – 0:27 (Frames 480 to 810) */}
      <Sequence from={480} durationInFrames={330}>
        <AirmailScene3 />
      </Sequence>

      {/* Scene 4: 0:27 – 0:37 (Frames 810 to 1110) */}
      <Sequence from={810} durationInFrames={300}>
        <AirmailScene4 />
      </Sequence>

      {/* Scene 5: 0:37 – 0:52 (Frames 1110 to 1560) */}
      <Sequence from={1110} durationInFrames={450}>
        <AirmailScene5 />
      </Sequence>

      {/* Scene 6: 0:52 – 1:08.56 (Frames 1560 to 2056) */}
      <Sequence from={1560} durationInFrames={496}>
        <AirmailScene6 />
      </Sequence>
    </AbsoluteFill>
  );
};
