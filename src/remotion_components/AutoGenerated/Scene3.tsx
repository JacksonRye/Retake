import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const GeneratedScene3: React.FC = () => {
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
          ✨ VAULT STYLE // CHRON_STYLE_27 // SCENE 03
        </div>
        <h1 style={{fontSize: 54, fontWeight: 'bold', color: '#38BDF8', lineHeight: 1.2, marginBottom: 24}}>
          REASON NUMBER TWO IS THE KEEPER FROM CAP
        </h1>
        <p style={{fontSize: 28, color: '#94A3B8', lineHeight: 1.5}}>
          "Reason number two is the keeper from Cape Verde, Vosigno, is 40 years old. The Aves stabbed most keepers are retired and"
        </p>
      </div>
    </AbsoluteFill>
  );
};
