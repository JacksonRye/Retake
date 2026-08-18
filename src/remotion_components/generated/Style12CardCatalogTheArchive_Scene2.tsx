import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style12CardCatalogTheArchive_Scene2() {
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
					backgroundColor: 'rgba(255, 255, 255, 0.2)',
					transform: `scale(${entranceSpring})`,
					opacity,
					padding: '20px',
					position: 'relative',
				}}
			>
				{/* Tier 1: Header Pill Badge */}
				<div
					style={{
						backgroundColor: 'transparent',
						color: '#E8DCC0',
						padding: '6px 12px',
						borderRadius: '12px',
						textTransform: 'uppercase',
						letterSpacing: '2px',
						fontSize: '12px',
						position: 'absolute',
						top: '20px',
						left: '20px',
					}}
				>
					CHRONIXEL • SCENE 02
				</div>

				{/* Tier 2: Hero Graphic Zone */}
				<div style={{ marginTop: '60px', marginBottom: '20px', textAlign: 'center' }}>
					<svg width="100%" height="200px" viewBox="0 0 800 200">
						<rect x="50" y="40" width="700" height="120" fill="#34558B" rx="10" ry="10" />
						<text x="400" y="100" fill="#E8DCC0" fontSize="24" fontWeight="bold" textAnchor="middle">
							No Code Tools
						</text>
						<path
							d="M50 160 L750 160"
							stroke="#C0392B"
							strokeWidth="4"
							strokeDasharray="12,6"
							style={{ transform: `translateX(${scaleSpring * 20}px)` }}
						/>
					</svg>
				</div>

				{/* Tier 3: Typographic Headline & Unlock Note */}
				<div style={{ textAlign: 'center', color: '#2B2B33' }}>
					<h1 style={{ fontSize: '32px', fontWeight: 800, lineHeight: 1.2, margin: '0 0 10px 0' }}>
						Unlock Simplicity
					</h1>
					<p style={{ fontSize: '16px', color: '#C0392B' }}>
						Embrace the power of no code solutions.
					</p>
				</div>
			</div>
		</AbsoluteFill>
	);
}