import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style10FieldNotesExpeditionLog_Scene5() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Spring animations for entrance and exit
	const entranceSpring = spring({
		frame,
		fps,
		from: -100,
		to: 0,
		config: {
			damping: 10,
		},
	});

	const exitSpring = spring({
		frame: frame - durationInFrames + 30,
		fps,
		from: 0,
		to: -100,
		config: {
			damping: 10,
		},
	});

	// Interpolating opacity for fade-in and fade-out effect
	const opacity = interpolate(frame, [0, 15, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
			<div
				style={{
					transform: `translateY(${entranceSpring + exitSpring}px)`,
					opacity,
					backgroundColor: 'rgba(255, 255, 255, 0.8)',
					border: '2px solid #8B4513',
					borderRadius: '10px',
					padding: '20px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
					width: '80%',
					maxWidth: '600px',
					textAlign: 'center',
					fontFamily: '"Courier New", Courier, monospace',
					color: '#4B0082',
				}}
			>
				<div style={{ fontSize: '24px', marginBottom: '10px' }}>
					🗺️ <span style={{ fontWeight: 'bold' }}>Expedition Log</span> 🗺️
				</div>
				<div style={{ fontSize: '18px', lineHeight: '1.5' }}>
					Follow the paths to uncover the treasures of workflow success. Each route offers unique challenges and rewards.
				</div>
				<div
					style={{
						marginTop: '20px',
						fontSize: '32px',
						fontFamily: '"Brush Script MT", cursive',
						color: '#228B22',
					}}
				>
					Good Luck!
				</div>
			</div>
		</AbsoluteFill>
	);
}