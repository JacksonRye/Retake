import { Composition } from 'remotion';
import FullEditPixel from './FullEditPixel';
import Style35MessageBoardY2KForum_Scene1 from './generated/Style35MessageBoardY2KForum_Scene1';
import Style35MessageBoardY2KForum_Scene2 from './generated/Style35MessageBoardY2KForum_Scene2';
import Style35MessageBoardY2KForum_Scene3 from './generated/Style35MessageBoardY2KForum_Scene3';
import Style35MessageBoardY2KForum_Scene4 from './generated/Style35MessageBoardY2KForum_Scene4';
import Style35MessageBoardY2KForum_Scene5 from './generated/Style35MessageBoardY2KForum_Scene5';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="FullEditPixel" component={FullEditPixel} durationInFrames={795} fps={30} width={1080} height={1920} />
      <Composition id="Style35MessageBoardY2KForumScene1" component={Style35MessageBoardY2KForum_Scene1} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style35MessageBoardY2KForumScene2" component={Style35MessageBoardY2KForum_Scene2} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style35MessageBoardY2KForumScene3" component={Style35MessageBoardY2KForum_Scene3} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style35MessageBoardY2KForumScene4" component={Style35MessageBoardY2KForum_Scene4} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style35MessageBoardY2KForumScene5" component={Style35MessageBoardY2KForum_Scene5} durationInFrames={135} fps={30} width={1080} height={1920} />
    </>
  );
};
