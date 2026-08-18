import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export default function Style10FieldNotesExpeditionLog_Scene1() {
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

	// Opacity interpolation for entrance and exit
	const opacity = interpolate(frame, [0, 15, durationInFrames - 15, durationInFrames], [0, 1, 1, 0]);

	// Styles
	const journalStyle: React.CSSProperties = {
		backgroundColor: 'transparent',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		opacity,
		transform: `scale(${entranceSpring})`,
	};

	const compassStyle: React.CSSProperties = {
		width: '300px',
		height: '300px',
		borderRadius: '50%',
		border: '5px solid #8B4513',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		backgroundColor: 'transparent',
		boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
		transform: `scale(${exitSpring})`,
	};

	const textStyle: React.CSSProperties = {
		fontFamily: 'serif',
		fontSize: '24px',
		color: '#4B0082',
		textAlign: 'center',
	};

	const pathStyle: React.CSSProperties = {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundImage: 'radial-gradient(circle, transparent 70%, #8B4513 70%)',
		backgroundSize: '20px 20px',
		backgroundPosition: 'center',
	};

	return (
		<AbsoluteFill style={journalStyle}>
			<div style={compassStyle}>
				<div style={pathStyle}></div>
				<div style={textStyle}>No Code</div>
			</div>
		</AbsoluteFill>
	);
}