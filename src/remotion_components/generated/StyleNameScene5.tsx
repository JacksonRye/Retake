import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function StyleNameScene5() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Entrance and exit animations
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
		to: 100,
		config: {
			damping: 10,
		},
	});

	// Interpolations for glowing effect
	const glowOpacity = interpolate(frame, [0, 15, 45, 60], [0, 1, 1, 0], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
			<div
				style={{
					width: '80%',
					height: '80%',
					display: 'grid',
					gridTemplateColumns: 'repeat(5, 1fr)',
					gridGap: '10px',
					transform: `translateY(${entranceSpring}px) translateY(${exitSpring}px)`,
				}}
			>
				{Array.from({ length: 15 }).map((_, index) => (
					<div
						key={index}
						style={{
							backgroundColor: 'transparent',
							borderRadius: '5px',
							boxShadow: `0 0 10px rgba(255, 255, 255, ${glowOpacity})`,
							transition: 'box-shadow 0.5s ease-in-out',
						}}
					/>
				))}
			</div>
		</AbsoluteFill>
	);
}