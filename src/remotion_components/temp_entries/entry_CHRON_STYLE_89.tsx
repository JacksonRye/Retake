import React from 'react';
import { registerRoot, Composition } from 'remotion';
import Sampler_CHRON_STYLE_89 from '../sampler/Sampler_CHRON_STYLE_89';

const Root: React.FC = () => {
  return (
    <Composition
      id="CHRON-STYLE-89"
      component={Sampler_CHRON_STYLE_89}
      durationInFrames={135}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

registerRoot(Root);
