import React from 'react';
import {AbsoluteFill, Sequence, staticFile, Video} from 'remotion';
import {GeneratedScene1} from './Scene1';
import {GeneratedScene2} from './Scene2';
import {GeneratedScene3} from './Scene3';
import {GeneratedScene4} from './Scene4';
import {GeneratedScene5} from './Scene5';

export const FullEditAuto: React.FC = () => {
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
      <Sequence from={0} durationInFrames={192}>
        <GeneratedScene1 />
      </Sequence>
      <Sequence from={192} durationInFrames={211}>
        <GeneratedScene2 />
      </Sequence>
      <Sequence from={403} durationInFrames={206}>
        <GeneratedScene3 />
      </Sequence>
      <Sequence from={609} durationInFrames={254}>
        <GeneratedScene4 />
      </Sequence>
      <Sequence from={863} durationInFrames={854}>
        <GeneratedScene5 />
      </Sequence>
    </AbsoluteFill>
  );
};
