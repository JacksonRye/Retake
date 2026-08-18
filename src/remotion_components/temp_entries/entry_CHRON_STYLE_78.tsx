import React from 'react';
import { registerRoot, Composition } from 'remotion';
import Sampler_CHRON_STYLE_78 from '../sampler/Sampler_CHRON_STYLE_78';

const Root: React.FC = () => {
  return (
    <Composition
      id="CHRON-STYLE-78"
      component={Sampler_CHRON_STYLE_78}
      durationInFrames={135}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(Root);
