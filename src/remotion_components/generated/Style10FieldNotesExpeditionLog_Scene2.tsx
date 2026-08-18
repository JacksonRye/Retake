import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style10FieldNotesExpeditionLog_Scene2() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Spring for the page flip effect
	const pageFlip = spring({
		frame,
		fps,
		from: -90,
		to: 0,
		config: {
			damping: 10,
			stiffness: 100,
		},
	});

	// Spring for the tree reveal effect
	const treeReveal = spring({
		frame: frame - 15, // Delay the tree reveal
		fps,
		from: 0,
		to: 1,
		config: {
			damping: 10,
			stiffness: 100,
		},
	});

	// Interpolating opacity for fade-in effect
	const opacity = interpolate(frame, [0, 15], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
			<div
				style={{
					width: '80%',
					height: '80%',
					backgroundColor: 'transparent', // Kraft paper color
					borderRadius: '10px',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
					transform: `rotateY(${pageFlip}deg)`,
					transformOrigin: 'left',
					opacity,
					position: 'relative',
					perspective: 1000,
				}}
			>
				<div
					style={{
						opacity: treeReveal,
						transform: `translateX(-50%) scale(${treeReveal})`,
						transformOrigin: 'bottom',
						position: 'absolute',
						bottom: '10%',
						left: '50%',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: '24px',
							color: '#4B5320', // Tree trunk color
							marginBottom: '10px',
						}}
					>
						🌳
					</div>
					<div
						style={{
							fontSize: '18px',
							color: '#8B4513', // Root color
						}}
					>
						Roots of Code
					</div>
					<div
						style={{
							fontSize: '18px',
							color: '#228B22', // Leaves color
							marginTop: '10px',
						}}
					>
						No Code Tools
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}