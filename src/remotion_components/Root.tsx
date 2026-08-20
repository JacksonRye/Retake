import { Composition } from 'remotion';
import FullEditPixel from './FullEditPixel';
import Style25PullRequestTheDiff_Scene1 from './generated/Style25PullRequestTheDiff_Scene1';
import Style25PullRequestTheDiff_Scene2 from './generated/Style25PullRequestTheDiff_Scene2';
import Style25PullRequestTheDiff_Scene3 from './generated/Style25PullRequestTheDiff_Scene3';
import Style25PullRequestTheDiff_Scene4 from './generated/Style25PullRequestTheDiff_Scene4';
import Style25PullRequestTheDiff_Scene5 from './generated/Style25PullRequestTheDiff_Scene5';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="FullEditPixel" component={FullEditPixel} durationInFrames={901} fps={30} width={1080} height={1920} />
      <Composition id="Style25PullRequestTheDiffScene1" component={Style25PullRequestTheDiff_Scene1} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style25PullRequestTheDiffScene2" component={Style25PullRequestTheDiff_Scene2} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style25PullRequestTheDiffScene3" component={Style25PullRequestTheDiff_Scene3} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style25PullRequestTheDiffScene4" component={Style25PullRequestTheDiff_Scene4} durationInFrames={135} fps={30} width={1080} height={1920} />
      <Composition id="Style25PullRequestTheDiffScene5" component={Style25PullRequestTheDiff_Scene5} durationInFrames={135} fps={30} width={1080} height={1920} />
    </>
  );
};
