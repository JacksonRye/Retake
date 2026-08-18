import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function StyleNameScene1() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Spring for entrance and exit animations
	const entranceSpring = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 100,
			mass: 0.5,
		},
	});

	const exitSpring = spring({
		frame: frame - durationInFrames + 30, // Start exit spring 1 second before end
		fps,
		config: {
			damping: 10,
			stiffness: 100,
			mass: 0.5,
		},
	});

	// Interpolating opacity for entrance and exit
	const opacity = interpolate(
		frame,
		[0, 15, durationInFrames - 15, durationInFrames],
		[0, 1, 1, 0]
	);

	// Fragmented screen styles
	const screenStyles = {
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(255, 0, 0, 0.1)',
		border: '2px solid rgba(255, 255, 255, 0.3)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		transform: `scale(${entranceSpring}) translateY(${interpolate(frame, [0, durationInFrames], [0, -100])}px)`,
		opacity,
	};

	// Glitch effect styles
	const glitchStyles = {
		color: 'white',
		fontSize: '30px',
		fontWeight: 'bold',
		textShadow: '2px 2px 0 #000, -2px -2px 0 #fff',
		transform: `translateX(${Math.sin(frame / 5) * 5}px)`,
	};

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent' }}>
			<div style={screenStyles}>
				<div style={glitchStyles}>
					AI Automation Failure
				</div>
			</div>
		</AbsoluteFill>
	);
}