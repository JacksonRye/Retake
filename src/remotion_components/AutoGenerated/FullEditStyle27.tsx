import React from 'react';
import {AbsoluteFill, Sequence, staticFile, Video} from 'remotion';
import {GeneratedScene1} from './Scene1';
import {GeneratedScene2} from './Scene2';
import {GeneratedScene3} from './Scene3';
import {GeneratedScene4} from './Scene4';
import {GeneratedScene5} from './Scene5';

export const FullEditStyle27: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#000'}}>
      <Video
        src={staticFile('input_video.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      <Sequence from={0} durationInFrames={320}>
        <GeneratedScene1 />
      </Sequence>
      <Sequence from={320} durationInFrames={385}>
        <GeneratedScene2 />
      </Sequence>
      <Sequence from={705} durationInFrames={428}>
        <GeneratedScene3 />
      </Sequence>
      <Sequence from={1133} durationInFrames={442}>
        <GeneratedScene4 />
      </Sequence>
      <Sequence from={1575} durationInFrames={476}>
        <GeneratedScene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
