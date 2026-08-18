import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {PIXEL_COLORS, PIXEL_FONTS} from './constants';
import {PixelWrapper} from './PixelWrapper';

export const PixelScene5: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Pulse animation for map node
  const pulse = Math.sin(frame * 0.2) * 0.3 + 1;

  return (
    <PixelWrapper title="STAGE 05 // OVERWORLD MAP NODE">
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          width: 900,
          height: 1100,
          background: PIXEL_COLORS.boxBlue,
          border: `8px double ${PIXEL_COLORS.panelBorder}`,
          borderRadius: 12,
          padding: 50,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 12px 0 #000'
        }}>
          <div>
            <div style={{fontSize: 28, color: PIXEL_COLORS.coinGold}}>
              MAP LOCATION: CAPE VERDE
            </div>
            <div style={{fontSize: 16, color: PIXEL_COLORS.pixelWhite, marginTop: 8}}>
              POPULATION DEMOGRAPHIC
            </div>
          </div>

          {/* Overworld Town Map Visual */}
          <div style={{
            background: PIXEL_COLORS.nightBlue,
            border: `4px solid ${PIXEL_COLORS.coinGold}`,
            borderRadius: 8,
            padding: 40,
            textAlign: 'center'
          }}>
            <div style={{fontSize: 64, marginBottom: 20, transform: `scale(${pulse})`}}>
              🏰
            </div>
            <div style={{fontSize: 36, color: PIXEL_COLORS.coinGold, marginBottom: 10}}>
              TOWN POPULATION: &lt; 200,000
            </div>
            <div style={{fontSize: 18, color: PIXEL_COLORS.hpGreen}}>
              PARTY CLASS: PART-TIME WORKERS
            </div>
          </div>

          {/* Global Underdog Spell Buff */}
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            border: `4px dashed ${PIXEL_COLORS.coinGold}`,
            padding: 30,
            borderRadius: 8,
            textAlign: 'center'
          }}>
            <div style={{fontSize: 22, color: PIXEL_COLORS.coinGold}}>
              ★ GLOBAL SPELL CAST:
            </div>
            <div style={{fontSize: 24, color: PIXEL_COLORS.pixelWhite, marginTop: 10}}>
              UNDERDOG MULTIPLIER x1000!
            </div>
          </div>

          {/* Footer Info */}
          <div style={{
            borderTop: `4px solid ${PIXEL_COLORS.nightBlue}`,
            paddingTop: 16,
            fontSize: 16,
            color: PIXEL_COLORS.coinGold
          }}>
            VIRAL SPELL: CASTING COMPLETE
          </div>
        </div>
      </div>
    </PixelWrapper>
  );
};
