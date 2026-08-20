import { Composition } from 'remotion';
import FullEditPixel from './FullEditPixel';
import Style90CaliberWatchMacro_Scene1 from './generated/Style90CaliberWatchMacro_Scene1';
import Style90CaliberWatchMacro_Scene2 from './generated/Style90CaliberWatchMacro_Scene2';
import Style90CaliberWatchMacro_Scene3 from './generated/Style90CaliberWatchMacro_Scene3';
import Style90CaliberWatchMacro_Scene4 from './generated/Style90CaliberWatchMacro_Scene4';
import Style90CaliberWatchMacro_Scene5 from './generated/Style90CaliberWatchMacro_Scene5';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="FullEditPixel" component={FullEditPixel} durationInFrames={901} fps={30} width={1080} height={1920} />
      <Composition id="Style90CaliberWatchMacroScene1" component={Style90CaliberWatchMacro_Scene1} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style90CaliberWatchMacroScene2" component={Style90CaliberWatchMacro_Scene2} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style90CaliberWatchMacroScene3" component={Style90CaliberWatchMacro_Scene3} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style90CaliberWatchMacroScene4" component={Style90CaliberWatchMacro_Scene4} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style90CaliberWatchMacroScene5" component={Style90CaliberWatchMacro_Scene5} durationInFrames={135} fps={30} width={1080} height={1920} />
    </>
  );
};
