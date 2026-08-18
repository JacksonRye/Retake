import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const GeneratedScene2: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardSpring = spring({
    frame,
    fps,
    config: {damping: 10, stiffness: 120}
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0F172A',
      color: '#38BDF8',
      padding: 60,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "system-ui, sans-serif"
    }}>
      <div style={{
        width: 900,
        background: 'rgba(30, 41, 59, 0.85)',
        border: '2px solid #38BDF8',
        borderRadius: 24,
        padding: 55,
        boxShadow: '0 15px 35px rgba(56, 189, 248, 0.2)',
        transform: `scale(${cardSpring})`
      }}>
        <div style={{fontSize: 22, color: '#F59E0B', fontWeight: 'bold', marginBottom: 16, letterSpacing: 1}}>
          ✨ VAULT STYLE // CHRON_STYLE_27 // SCENE 02
        </div>
        <h1 style={{fontSize: 54, fontWeight: 'bold', color: '#38BDF8', lineHeight: 1.2, marginBottom: 24}}>
          HE COMPLETELY SHUT THEM OUT, LITERALLY Z
        </h1>
        <p style={{fontSize: 28, color: '#94A3B8', lineHeight: 1.5}}>
          "He completely shut them out, literally zero goals, and yes, Cape Verde is only on their second World Cup ever. And the m"
        </p>
      </div>
    </AbsoluteFill>
  );
};
