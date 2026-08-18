import {PixelScene5_V2} from './PixelQuest/Scene5_V2';
import {PixelScene2_V8} from './PixelQuest/Scene2_V8';
import {PixelScene2_V7} from './PixelQuest/Scene2_V7';
import {PixelScene2_V6} from './PixelQuest/Scene2_V6';
import {PixelScene2_V5} from './PixelQuest/Scene2_V5';
import {PixelScene2_V4} from './PixelQuest/Scene2_V4';
import {PixelScene3_V2} from './PixelQuest/Scene3_V2';
import {PixelScene2_V3} from './PixelQuest/Scene2_V3';
import {Composition} from 'remotion';
import {FullEditPixel} from './FullEditPixel';
import {PixelScene1} from './PixelQuest/Scene1';
import {PixelScene2} from './PixelQuest/Scene2';
import {PixelScene2_V2} from './PixelQuest/Scene2_V2';
import {PixelScene3} from './PixelQuest/Scene3';
import {PixelScene4} from './PixelQuest/Scene4';
import {PixelScene5} from './PixelQuest/Scene5';
import {PixelScene6} from './PixelQuest/Scene6';
import './index.css';

export const RemotionRoot = () => {
  const fps = 30;

  return (
    <>
      {/* Master Full Sequence Edit */}
      <Composition
        id="FullEditPixel"
        component={FullEditPixel}
        durationInFrames={2056}
        fps={fps}
        width={1080}
        height={1920}
      />

      {/* Individual Scene 1-by-1 Standalone Compositions */}
      <Composition
        id="Scene1"
        component={PixelScene1}
        durationInFrames={210}
        fps={fps}
        width={1080}
        height={1920}
      />

      <Composition
        id="Scene2-V1"
        component={PixelScene2}
        durationInFrames={270}
        fps={fps}
        width={1080}
        height={1920}
      />

      <Composition
        id="Scene2-V2"
        component={PixelScene2_V2}
        durationInFrames={270}
        fps={fps}
        width={1080}
        height={1920}
      />

      <Composition
        id="Scene3"
        component={PixelScene3}
        durationInFrames={330}
        fps={fps}
        width={1080}
        height={1920}
      />

      <Composition
        id="Scene4"
        component={PixelScene4}
        durationInFrames={300}
        fps={fps}
        width={1080}
        height={1920}
      />

      <Composition
        id="Scene5"
        component={PixelScene5}
        durationInFrames={450}
        fps={fps}
        width={1080}
        height={1920}
      />

      <Composition
        id="Scene6"
        component={PixelScene6}
        durationInFrames={496}
        fps={fps}
        width={1080}
        height={1920}
      />
    
      <Composition
        id="Scene2-V3"
        component={PixelScene2_V3}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    
      <Composition
        id="Scene3-V2"
        component={PixelScene3_V2}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    
      <Composition
        id="Scene2-V4"
        component={PixelScene2_V4}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    
      <Composition
        id="Scene2-V5"
        component={PixelScene2_V5}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    
      <Composition
        id="Scene2-V6"
        component={PixelScene2_V6}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    
      <Composition
        id="Scene2-V7"
        component={PixelScene2_V7}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    
      <Composition
        id="Scene2-V8"
        component={PixelScene2_V8}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    
      <Composition
        id="Scene5-V2"
        component={PixelScene5_V2}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
