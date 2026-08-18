import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style10FieldNotesExpeditionLog_Scene3() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Entrance and exit springs
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
		frame: frame - durationInFrames + fps * 0.5,
		fps,
		config: {
			damping: 10,
			stiffness: 100,
			mass: 0.5,
		},
	});

	// Ink bloom animation
	const inkBloomScale = interpolate(frame, [0, fps], [0, 1], {
		extrapolateRight: 'clamp',
	});

	// Character appearance
	const characterOpacity = interpolate(frame, [fps, fps * 1.5], [0, 1], {
		extrapolateRight: 'clamp',
	});

	// Sign movement
	const signTranslateY = interpolate(frame, [fps * 1.5, fps * 2], [50, 0], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
			<div
				style={{
					transform: `scale(${inkBloomScale})`,
					backgroundColor: 'transparent',
					borderRadius: '50%',
					width: 200,
					height: 200,
					opacity: entranceSpring,
					position: 'absolute',
				}}
			/>
			<div
				style={{
					opacity: characterOpacity,
					transform: `translateY(${signTranslateY}px)`,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'absolute',
				}}
			>
				<div
					style={{
						width: 100,
						height: 100,
						backgroundColor: '#FFD700',
						borderRadius: '50%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					<span style={{ fontSize: 24, color: '#000' }}>😊</span>
				</div>
				<div
					style={{
						backgroundColor: '#FFF',
						padding: '10px 20px',
						borderRadius: 5,
						boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
					}}
				>
					<span style={{ fontSize: 18, color: '#000' }}>Approachable Code</span>
				</div>
			</div>
		</AbsoluteFill>
	);
}