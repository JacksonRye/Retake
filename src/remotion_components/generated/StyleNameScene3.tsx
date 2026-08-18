import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function StyleNameScene3() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Entrance and exit springs
	const entranceSpring = spring({
		frame,
		fps,
		config: {
			damping: 200,
			stiffness: 100,
		},
	});

	const exitSpring = spring({
		frame: frame - durationInFrames + 30,
		fps,
		config: {
			damping: 200,
			stiffness: 100,
		},
	});

	// Interpolations for animations
	const flowchartOpacity = interpolate(frame, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const tangledOpacity = interpolate(frame, [30, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const linearOpacity = interpolate(frame, [60, 90], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const flowchartTransform = interpolate(entranceSpring, [0, 1], [100, 0]);
	const tangledTransform = interpolate(frame, [30, 60], [100, 0]);
	const linearTransform = interpolate(exitSpring, [0, 1], [0, 100]);

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
			<div
				style={{
					opacity: flowchartOpacity,
					transform: `translateY(${flowchartTransform}px)`,
					position: 'absolute',
					color: '#3498db',
					fontSize: '2em',
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				Flowchart
			</div>
			<div
				style={{
					opacity: tangledOpacity,
					transform: `translateY(${tangledTransform}px)`,
					position: 'absolute',
					color: '#e74c3c',
					fontSize: '2em',
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				Tangled Mess
			</div>
			<div
				style={{
					opacity: linearOpacity,
					transform: `translateY(${linearTransform}px)`,
					position: 'absolute',
					color: '#2ecc71',
					fontSize: '2em',
					fontWeight: 'bold',
					textAlign: 'center',
				}}
			>
				Clear Sequence
			</div>
		</AbsoluteFill>
	);
}