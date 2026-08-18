import { Composition } from 'remotion';
import FullEditPixel from './FullEditPixel';
import Style100NeubrutalBrutalPop_Scene1 from './generated/Style100NeubrutalBrutalPop_Scene1';
import Style100NeubrutalBrutalPop_Scene2 from './generated/Style100NeubrutalBrutalPop_Scene2';
import Style100NeubrutalBrutalPop_Scene3 from './generated/Style100NeubrutalBrutalPop_Scene3';
import Style100NeubrutalBrutalPop_Scene4 from './generated/Style100NeubrutalBrutalPop_Scene4';
import Style100NeubrutalBrutalPop_Scene5 from './generated/Style100NeubrutalBrutalPop_Scene5';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="FullEditPixel" component={FullEditPixel} durationInFrames={900} fps={30} width={1080} height={1920} />
      <Composition id="Style100NeubrutalBrutalPopScene1" component={Style100NeubrutalBrutalPop_Scene1} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style100NeubrutalBrutalPopScene2" component={Style100NeubrutalBrutalPop_Scene2} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style100NeubrutalBrutalPopScene3" component={Style100NeubrutalBrutalPop_Scene3} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style100NeubrutalBrutalPopScene4" component={Style100NeubrutalBrutalPop_Scene4} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style100NeubrutalBrutalPopScene5" component={Style100NeubrutalBrutalPop_Scene5} durationInFrames={135} fps={30} width={1080} height={1920} />
    </>
  );
};
