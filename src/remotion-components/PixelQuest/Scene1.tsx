import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';
import {PixelWrapper} from './PixelWrapper';

export const PixelScene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const fullText = "WILD ANOMALY! +11,000,000 FOLLOWERS GAINED OVERNIGHT!";
  const charCount = Math.floor(
    interpolate(frame, [15, fps * 3], [0, fullText.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp'
    })
  );

  const displayedText = fullText.slice(0, charCount);

  // Level badge spring animation
  const badgeSpring = spring({
    frame: frame - fps * 3,
    fps,
    config: {damping: 8, stiffness: 150}
  });

  return (
    <PixelWrapper title="STAGE 01 // OVERWRITE ANOMALY">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Classical JRPG Dialogue Box */}
        <div style={{
          width: 900,
          height: 1000,
          background: PIXEL_COLORS.boxBlue,
          border: `8px double ${PIXEL_COLORS.panelBorder}`,
          borderRadius: 12,
          padding: 60,
          boxShadow: '0 12px 0 #000',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Character Speaker Box */}
          <div style={{
            background: PIXEL_COLORS.nightBlue,
            border: `4px solid ${PIXEL_COLORS.coinGold}`,
            padding: '12px 24px',
            borderRadius: 6,
            display: 'inline-block',
            fontSize: 22,
            color: PIXEL_COLORS.coinGold,
            width: 'fit-content'
          }}>
            👾 SYSTEM NOTIFICATION:
          </div>

          {/* Typewriter Text */}
          <div style={{
            fontFamily: PIXEL_FONTS.pixel,
            fontSize: 32,
            color: PIXEL_COLORS.pixelWhite,
            lineHeight: 1.8,
            minHeight: 300
          }}>
            {displayedText}
            <span style={{opacity: Math.floor(frame / 6) % 2 === 0 ? 1 : 0}}> ◀</span>
          </div>

          {/* Gold Quest Badge (Frame 3s) */}
          {frame > fps * 2.8 && (
            <div style={{
              transform: `scale(${badgeSpring})`,
              opacity: badgeSpring,
              background: PIXEL_COLORS.coinGold,
              color: PIXEL_COLORS.nightBlue,
              border: '6px solid #FFF',
              padding: '24px 30px',
              borderRadius: 8,
              textAlign: 'center',
              fontSize: 24,
              boxShadow: '0 8px 0 #000'
            }}>
              ★ QUEST REASONS UNLOCKED: 3 CRITICAL FACTORS!
            </div>
          )}

          {/* Footer UI Prompt */}
          <div style={{
            fontFamily: PIXEL_FONTS.pixel,
            fontSize: 16,
            color: PIXEL_COLORS.coinGold,
            display: 'flex',
            justify: 'space-between',
            borderTop: `4px solid ${PIXEL_COLORS.nightBlue}`,
            paddingTop: 20
          }}>
            <span>PRESS [A] TO CONTINUE</span>
            <span>XP: +9999</span>
          </div>
        </div>
      </div>
    </PixelWrapper>
  );
};
