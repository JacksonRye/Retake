import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COLORS, FONTS} from './constants';

export const HUDBackground: React.FC<{children: React.ReactNode; title?: string}> = ({children, title = "MISSION CONTROL // STAKES MONITOR"}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.voidNavy,
      color: '#FFF',
      fontFamily: FONTS.mono,
      overflow: 'hidden'
    }}>
      {/* Radial Depth Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.08) 0%, rgba(10, 14, 26, 1) 70%)`
      }} />

      {/* Tech Grid Pattern */}
      <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.15}}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={COLORS.cyanData} strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Outer Border HUD Frame */}
      <div style={{
        position: 'absolute',
        inset: 40,
        border: `1px solid rgba(34, 211, 238, 0.2)`,
        boxShadow: `inset 0 0 30px rgba(10, 14, 26, 0.8)`,
        pointerEvents: 'none'
      }} />

      {/* Corner Brackets */}
      {/* Top Left */}
      <svg width="60" height="60" style={{position: 'absolute', top: 30, left: 30, color: COLORS.cyanData}}>
        <path d="M 0 60 L 0 0 L 60 0" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
      {/* Top Right */}
      <svg width="60" height="60" style={{position: 'absolute', top: 30, right: 30, color: COLORS.cyanData}}>
        <path d="M 0 0 L 60 0 L 60 60" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
      {/* Bottom Left */}
      <svg width="60" height="60" style={{position: 'absolute', bottom: 30, left: 30, color: COLORS.cyanData}}>
        <path d="M 0 0 L 0 60 L 60 60" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
      {/* Bottom Right */}
      <svg width="60" height="60" style={{position: 'absolute', bottom: 30, right: 30, color: COLORS.cyanData}}>
        <path d="M 0 60 L 60 60 L 60 0" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>

      {/* Header Bar Telemetry */}
      <div style={{
        position: 'absolute',
        top: 50,
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px stroke rgba(34, 211, 238, 0.3)`,
        paddingBottom: 10,
        fontSize: 16,
        color: COLORS.cyanData,
        letterSpacing: 2
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: 15}}>
          <span style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: COLORS.cyanData,
            boxShadow: `0 0 10px ${COLORS.cyanData}`,
            display: 'inline-block'
          }} />
          <span>{title}</span>
        </div>
        <div>SYS.VER // 4.0.26</div>
        <div>TIME: {(frame / 30).toFixed(2)}s</div>
      </div>

      {/* Footer Telemetry */}
      <div style={{
        position: 'absolute',
        bottom: 50,
        left: 60,
        right: 60,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 14,
        color: 'rgba(34, 211, 238, 0.5)',
        letterSpacing: 1
      }}>
        <div>LAT: 14.9177° N // LON: 23.5092° W</div>
        <div>CHRONIXEL STAKES ENGINE v2.0</div>
        <div>SEC_STATUS: ENCRYPTED</div>
      </div>

      {/* Main Content Area */}
      <div style={{position: 'absolute', inset: 90, display: 'flex', flexDirection: 'column'}}>
        {children}
      </div>

      {/* CRT Overlay Shader Effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none',
        opacity: 0.6
      }} />
    </AbsoluteFill>
  );
};
