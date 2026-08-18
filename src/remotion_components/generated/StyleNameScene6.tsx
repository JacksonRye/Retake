import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function StyleNameScene6() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	// Entrance and exit animations
	const entranceSpring = spring({
		frame,
		fps,
		from: -100,
		to: 0,
		config: { damping: 10 },
	});
	const exitSpring = spring({
		frame: frame - durationInFrames + 30,
		fps,
		from: 0,
		to: 100,
		config: { damping: 10 },
	});

	// Interpolating the seesaw tilt
	const seesawTilt = interpolate(frame, [0, durationInFrames], [-15, 15]);

	return (
		<AbsoluteFill style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
			<div
				style={{
					width: '80%',
					height: '10%',
					backgroundColor: 'transparent',
					transform: `translateY(${entranceSpring}px) translateY(${exitSpring}px) rotate(${seesawTilt}deg)`,
					borderRadius: '5px',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
				}}
			>
				<div
					style={{
						width: '45%',
						height: '100%',
						backgroundColor: '#4CAF50',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						color: '#fff',
						fontSize: '1.5em',
						fontWeight: 'bold',
						borderRadius: '5px 0 0 5px',
					}}
				>
					Foundational Knowledge
				</div>
				<div
					style={{
						width: '45%',
						height: '100%',
						backgroundColor: '#F44336',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						color: '#fff',
						fontSize: '1.5em',
						fontWeight: 'bold',
						borderRadius: '0 5px 5px 0',
					}}
				>
					AI Applications
				</div>
			</div>
		</AbsoluteFill>
	);
}