import React from 'react';
    import {
        AbsoluteFill,
        interpolate,
        spring,
        useCurrentFrame,
        useVideoConfig,
        Easing,
    } from 'remotion';

    // --- CHRON_STYLE_100 Palette ---
    const COLORS = {
        CREAM: '#FFF8E7',
        BLACK: '#000000',
        PINK: '#FF90E8',
        YELLOW: '#F1F333',
        EMERALD: '#23A094',
    };

    const BORDER = '4px solid #000000';
    const SHADOW = (offset: number) => `${offset}px ${offset}px 0px #000000`;

    export const SceneModel37: React.FC = () => {
        const frame = useCurrentFrame();
        const { fps, width, height } = useVideoConfig();

        // --- TIMINGS ---
        const entranceEnd = fps * 1.0;
        const transformStart = fps * 1.0;
        const transformEnd = fps * 2.8;
        const vibrationStart = fps * 2.8;
        const exitStart = fps * 4.2;

        // --- BEAT 1: ENTRANCE (0-1.0s) ---
        const entranceSpring = spring({
            frame,
            fps,
            config: { stiffness: 150, damping: 12, mass: 1.2 },
        });

        const scale = interpolate(entranceSpring, [0, 1], [0, 1]);
        const rotation = interpolate(entranceSpring, [0, 1], [-15, 0]);
        const entranceY = interpolate(entranceSpring, [0, 1], [200, 0]);

        // --- BEAT 2: TRANSFORMATION (1.0-2.8s) ---
        const counterProgress = interpolate(frame, [transformStart, transformEnd - 10], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(0.33, 1, 0.68, 1),
        });

        const hoursValue = Math.floor(interpolate(counterProgress, [0, 1], [2, 730]));
        const unitText = frame > transformStart + (transformEnd - transformStart) / 2 ? 'HRS / YR' : 'HRS / DAY';

        // Cursor Animation
        const cursorX = interpolate(frame, [transformStart + 5, transformStart + 25], [width * 0.8, width * 0.55], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        const cursorY = interpolate(frame, [transformStart + 5, transformStart + 25], [height * 0.8, height * 0.6], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        });
        const cursorClick = spring({
            frame: frame - (transformStart + 25),
            fps,
            config: { stiffness: 300, damping: 10 },
        });
        const shadowCompression = interpolate(cursorClick, [0, 1], [10, 4]);

        // --- BEAT 3: LIVING PHYSICS (2.8-4.5s) ---
        const vibration = Math.sin(frame * 1.5) * (frame >= vibrationStart ? 3 : 0);
        const flashColor = frame > vibrationStart && Math.floor(frame / 4) % 2 === 0 ? COLORS.PINK : COLORS.YELLOW;
        
        // Snappy Exit
        const exitSpring = spring({
            frame: frame - exitStart,
            fps,
            config: { stiffness: 200, damping: 20 },
        });
        const exitScale = interpolate(exitSpring, [0, 1], [1, 0]);

        return (
            <AbsoluteFill style={{ backgroundColor: COLORS.CREAM, fontFamily: 'Arial Black, sans-serif', overflow: 'hidden' }}>
                {/* Background Hazard Stripes */}
                <div style={{
                    position: 'absolute',
                    top: -100,
                    left: -100,
                    width: '150%',
                    height: '150%',
                    background: `repeating-linear-gradient(45deg, ${COLORS.YELLOW}, ${COLORS.YELLOW} 40px, ${COLORS.BLACK} 40px, ${COLORS.BLACK} 80px)`,
                    opacity: 0.1,
                    transform: `rotate(${frame * 0.2}deg)`
                }} />

                {/* Main Card Container */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    transform: `scale(${scale * exitScale}) translateY(${entranceY}px) rotate(${rotation}deg)`,
                }}>
                    <div style={{
                        width: 800,
                        height: 500,
                        backgroundColor: COLORS.CREAM,
                        border: BORDER,
                        boxShadow: SHADOW(shadowCompression),
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '40px',
                        transform: `translate(${vibration}px, ${vibration}px)`,
                    }}>
                        {/* Header Accent */}
                        <div style={{
                            position: 'absolute',
                            top: -25,
                            left: 40,
                            backgroundColor: flashColor,
                            border: BORDER,
                            padding: '10px 20px',
                            fontSize: '24px',
                            boxShadow: SHADOW(5),
                        }}>
                            TIME AUDIT // 2024
                        </div>

                        {/* Counter Display */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ fontSize: '160px', lineHeight: '0.9', color: COLORS.BLACK }}>
                                {hoursValue}
                            </div>
                            <div style={{ 
                                fontSize: '60px', 
                                backgroundColor: COLORS.EMERALD, 
                                color: COLORS.CREAM, 
                                display: 'inline-block',
                                alignSelf: 'flex-start',
                                padding: '0 15px',
                                border: BORDER,
                                marginTop: '10px'
                            }}>
                                {unitText}
                            </div>
                        </div>

                        {/* Spoken Text UI */}
                        <div style={{ 
                            marginTop: '20px', 
                            fontSize: '24px', 
                            lineHeight: '1.2',
                            borderTop: BORDER,
                            paddingTop: '20px'
                        }}>
                            "The two hours you spend scrolling each day... could have produced <span style={{backgroundColor: COLORS.PINK}}>a book</span>, <span style={{backgroundColor: COLORS.YELLOW}}>a business</span>, or <span style={{backgroundColor: COLORS.EMERALD, color: 'white'}}>a body</span> you don't currently have."
                        </div>
                    </div>
                </div>

                {/* Oversized Cursor */}
                <div style={{
                    position: 'absolute',
                    left: cursorX,
                    top: cursorY,
                    transform: `scale(${1 - cursorClick * 0.2})`,
                    zIndex: 100,
                    display: frame > transformStart + 5 && frame < vibrationStart + 10 ? 'block' : 'none'
                }}>
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10L40 90L55 55L90 40L10 10Z" fill={COLORS.YELLOW} stroke={COLORS.BLACK} strokeWidth="4" />
                        <path d="M10 10L40 90L55 55L90 40L10 10Z" fill={COLORS.BLACK} transform="translate(6, 6)" style={{zIndex: -1, opacity: 0.5}} />
                    </svg>
                </div>

                {/* Hazard Accents (Beat 3) */}
                {frame > vibrationStart && (
                    <div style={{
                        position: 'absolute',
                        bottom: 40,
                        right: 40,
                        backgroundColor: COLORS.BLACK,
                        color: COLORS.YELLOW,
                        padding: '10px 30px',
                        fontSize: '30px',
                        border: `4px solid ${COLORS.YELLOW}`,
                        transform: `rotate(-5deg) scale(${1 + Math.sin(frame * 0.5) * 0.1})`,
                    }}>
                        STOP SCROLLING
                    </div>
                )}
            </AbsoluteFill>
        );
    };

    export default SceneModel37;
