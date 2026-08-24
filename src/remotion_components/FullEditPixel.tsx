import React from 'react';
import { AbsoluteFill, Sequence, Video } from 'remotion';
import Style100NeubrutalBrutalPop_Scene1 from './generated/Style100NeubrutalBrutalPop_Scene1';
import Style100NeubrutalBrutalPop_Scene2 from './generated/Style100NeubrutalBrutalPop_Scene2';
import Style100NeubrutalBrutalPop_Scene3 from './generated/Style100NeubrutalBrutalPop_Scene3';
import Style100NeubrutalBrutalPop_Scene4 from './generated/Style100NeubrutalBrutalPop_Scene4';
import Style100NeubrutalBrutalPop_Scene5 from './generated/Style100NeubrutalBrutalPop_Scene5';
import Style100NeubrutalBrutalPop_Scene6 from './generated/Style100NeubrutalBrutalPop_Scene6';
import Style100NeubrutalBrutalPop_Scene7 from './generated/Style100NeubrutalBrutalPop_Scene7';
import Style100NeubrutalBrutalPop_Scene8 from './generated/Style100NeubrutalBrutalPop_Scene8';
import Style100NeubrutalBrutalPop_Scene9 from './generated/Style100NeubrutalBrutalPop_Scene9';
import Style100NeubrutalBrutalPop_Scene10 from './generated/Style100NeubrutalBrutalPop_Scene10';

export function FullEditPixel() {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      <Video src="/api/video/stream" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Sequence from={30} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene1 />
        </Sequence>
        <Sequence from={210} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene2 />
        </Sequence>
        <Sequence from={390} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene3 />
        </Sequence>
        <Sequence from={570} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene4 />
        </Sequence>
        <Sequence from={750} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene5 />
        </Sequence>
        <Sequence from={930} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene6 />
        </Sequence>
        <Sequence from={1110} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene7 />
        </Sequence>
        <Sequence from={1290} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene8 />
        </Sequence>
        <Sequence from={1470} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene9 />
        </Sequence>
        <Sequence from={1650} durationInFrames={135}>
          <Style100NeubrutalBrutalPop_Scene10 />
        </Sequence>
    </AbsoluteFill>
  );
}

export default FullEditPixel;
