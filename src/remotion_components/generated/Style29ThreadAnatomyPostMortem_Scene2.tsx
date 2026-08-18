import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style29ThreadAnatomyPostMortem_Scene2() {
	const frame = useCurrentFrame();
	const { fps, durationInFrames } = useVideoConfig();

	const entranceSpring = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
	const scaleSpring = spring({ frame: frame - 5, fps, config: { damping: 10, stiffness: 120 } });
	const opacity = interpolate(frame, [0, 10, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

	return (
		<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
			<div
				style={{
					width: '750px',
					borderRadius: '24px',
					border: '1px solid rgba(255,255,255,0.15)',
					backdropFilter: 'blur(16px)',
					boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
					backgroundColor: 'transparent',
					transform: `scale(${entranceSpring})`,
					opacity,
					padding: '20px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						backgroundColor: '#1D9BF0',
						padding: '4px 12px',
						borderRadius: '12px',
						textTransform: 'uppercase',
						letterSpacing: '2px',
						color: '#E7E9EA',
						marginBottom: '16px',
					}}
				>
					CHRONIXEL • SCENE 02
				</div>
				<div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '16px' }}>
					<svg width="100%" height="100%" viewBox="0 0 800 200">
						<g transform={`scale(${scaleSpring})`}>
							<rect x="50" y="50" width="700" height="100" fill="#1D9BF0" />
							<path
								d="M150 150 L650 150"
								stroke="#F91880"
								strokeWidth="4"
								strokeDasharray="5,5"
								style={{ opacity }}
							/>
							<circle cx="400" cy="100" r="30" fill="#00BA7C" />
							<text x="400" y="100" textAnchor="middle" fill="#E7E9EA" fontSize="16" fontWeight="bold">
								NO-CODE
							</text>
						</g>
					</svg>
				</div>
				<div style={{ textAlign: 'center' }}>
					<h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.2, color: '#E7E9EA' }}>
						Unlock the Future of Development
					</h1>
					<p style={{ color: '#F91880', marginTop: '8px' }}>
						Transition from complex code to user-friendly interfaces effortlessly.
					</p>
				</div>
			</div>
		</AbsoluteFill>
	);
}