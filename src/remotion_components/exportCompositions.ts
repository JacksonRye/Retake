import {Composition} from 'remotion';
import {FullEditPixel} from './FullEditPixel';
import {PixelScene1} from './PixelQuest/Scene1';
import {PixelScene2} from './PixelQuest/Scene2';
import {PixelScene2_V7} from './PixelQuest/Scene2_V7';
import {PixelScene3} from './PixelQuest/Scene3';
import {PixelScene4} from './PixelQuest/Scene4';
import {PixelScene5} from './PixelQuest/Scene5';
import {PixelScene6} from './PixelQuest/Scene6';

export const COMPOSITIONS = [
  { id: 'FullEditPixel', label: 'Full Edit', component: FullEditPixel, durationInFrames: 2056 },
  { id: 'Scene1', label: 'Scene 1', component: PixelScene1, durationInFrames: 210 },
  { id: 'Scene2-V7', label: 'Scene 2', component: PixelScene2_V7, durationInFrames: 270 },
  { id: 'Scene3', label: 'Scene 3', component: PixelScene3, durationInFrames: 330 },
  { id: 'Scene4', label: 'Scene 4', component: PixelScene4, durationInFrames: 300 },
  { id: 'Scene5', label: 'Scene 5', component: PixelScene5, durationInFrames: 450 },
  { id: 'Scene6', label: 'Scene 6', component: PixelScene6, durationInFrames: 496 },
];
