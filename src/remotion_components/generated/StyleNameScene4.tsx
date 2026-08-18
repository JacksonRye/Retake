import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function StyleNameScene4() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Entrance and exit animations
	const entranceSpring = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 100,
		},
	});

	const exitSpring = spring({
		frame: frame - durationInFrames + 30,
		fps,
		config: {
			damping: 10,
			stiffness: 100,
		},
	});

	const opacity = interpolate(frame, [0, 15, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

	const skylineTranslate = interpolate(frame, [0, durationInFrames], [100, -100]);

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
			<div
				style={{
					opacity,
					transform: `translateY(${skylineTranslate}px) scale(${entranceSpring * exitSpring})`,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
					width: '100%',
					height: '100%',
				}}
			>
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						style={{
							width: '10%',
							height: `${20 + index * 15}%`,
							backgroundColor: `rgba(0, 255, 255, ${0.5 + index * 0.1})`,
							border: '2px solid cyan',
							borderRadius: '5px',
							position: 'relative',
						}}
					>
						<div
							style={{
								position: 'absolute',
								bottom: '100%',
								left: '50%',
								width: '2px',
								height: '50px',
								backgroundColor: 'cyan',
								transform: 'translateX(-50%)',
							}}
						/>
					</div>
				))}
			</div>
		</AbsoluteFill>
	);
}