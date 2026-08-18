import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style10FieldNotesExpeditionLog_Scene4() {
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
	const scale = interpolate(entranceSpring, [0, 1], [0.8, 1]);
	const opacity = interpolate(exitSpring, [0, 1], [1, 0]);

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
			<div
				style={{
					width: '80%',
					height: '80%',
					backgroundColor: 'rgba(0, 0, 0, 0.7)',
					borderRadius: '15px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					transform: `scale(${scale})`,
					opacity,
				}}
			>
				<div style={{ position: 'relative', width: '100%', height: '100%' }}>
					{/* Gears */}
					<div
						style={{
							position: 'absolute',
							top: '20%',
							left: '20%',
							width: '60px',
							height: '60px',
							backgroundColor: 'transparent',
							borderRadius: '50%',
							transform: `rotate(${frame * 2}deg)`,
							transition: 'transform 0.5s',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							width: '80px',
							height: '80px',
							backgroundColor: '#777',
							borderRadius: '50%',
							transform: `rotate(${-frame * 1.5}deg)`,
							transition: 'transform 0.5s',
						}}
					/>
					{/* Code snippets */}
					<div
						style={{
							position: 'absolute',
							top: '10%',
							left: '10%',
							color: '#fff',
							fontFamily: 'monospace',
							fontSize: '12px',
							opacity: 0.8,
						}}
					>
						{'<div>Code</div>'}
					</div>
					<div
						style={{
							position: 'absolute',
							bottom: '10%',
							right: '10%',
							color: '#fff',
							fontFamily: 'monospace',
							fontSize: '12px',
							opacity: 0.8,
						}}
					>
						{'<function()>...</function>'}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}