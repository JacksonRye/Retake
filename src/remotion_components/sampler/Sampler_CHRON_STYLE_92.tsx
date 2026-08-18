import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_92() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.65},
	});

	const cardIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 190, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 14, stiffness: 170, mass: 0.8},
	});

	// Beat 2: Metric state reveal / rolling emphasis
	const metricOpacity = interpolate(frame, [20, 34], [0, 1], clamp);
	const metricY = interpolate(frame, [20, 34], [26, 0], clamp);
	const metricLetterSpace = interpolate(frame, [20, 40], [8, 4], clamp);

	// Beat 3: Living hover + shine + subtle drift
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.7;
	const badgeFloat = Math.sin(frame * 0.09) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 0.8) * 3;
	const shadowPulse = 24 + Math.sin(frame * 0.16) * 6;
	const shineOffset = interpolate((frame + 12) % 80, [0, 80], [-260, 980], clamp);

	// Atmospheric motion
	const vapor1X = Math.sin(frame * 0.035) * 26;
	const vapor1Y = Math.sin(frame * 0.05) * 14;
	const vapor2X = Math.sin(frame * 0.03 + 1.4) * 22;
	const vapor2Y = Math.sin(frame * 0.045 + 0.6) * 12;
	const drapeSweep = interpolate(frame, [0, 70, 135], [-140, 30, 120], clamp);

	// Single-word fashion fade accents
	const word1Opacity = interpolate(frame, [34, 46, 58], [0, 0.55, 0], clamp);
	const word2Opacity = interpolate(frame, [62, 74, 86], [0, 0.5, 0], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#08080A',
				opacity,
				fontFamily:
					'"Didot", "Bodoni 72", "Times New Roman", Georgia, serif',
				color: '#EDEAE4',
				overflow: 'hidden',
			}}
		>
			{/* Background drape sweep */}
			<div
				style={{
					position: 'absolute',
					inset: -120,
					background:
						'linear-gradient(115deg, transparent 26%, rgba(212,178,106,0.06) 44%, rgba(74,30,43,0.18) 58%, transparent 74%)',
					transform: `translateX(${drapeSweep}px) rotate(-8deg)`,
					pointerEvents: 'none',
				}}
			/>

			{/* Vapor curls - safely kept in background only */}
			<div
				style={{
					position: 'absolute',
					left: '8%',
					top: '16%',
					width: 280,
					height: 280,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(212,178,106,0.08) 0%, rgba(212,178,106,0.04) 28%, rgba(107,107,115,0.02) 48%, transparent 72%)',
					filter: 'blur(18px)',
					transform: `translate(${vapor1X}px, ${vapor1Y}px)`,
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					right: '7%',
					bottom: '14%',
					width: 320,
					height: 320,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(74,30,43,0.22) 0%, rgba(212,178,106,0.06) 30%, rgba(107,107,115,0.03) 48%, transparent 74%)',
					filter: 'blur(22px)',
					transform: `translate(${vapor2X}px, ${vapor2Y}px)`,
					pointerEvents: 'none',
				}}
			/>

			{/* Single-word fades */}
			<div
				style={{
					position: 'absolute',
					top: '19%',
					right: '11%',
					color: '#6B6B73',
					fontSize: 26,
					fontWeight: 300,
					letterSpacing: 10,
					textTransform: 'lowercase',
					opacity: word1Opacity,
					pointerEvents: 'none',
				}}
			>
				noir
			</div>
			<div
				style={{
					position: 'absolute',
					bottom: '20%',
					left: '10%',
					color: '#6B6B73',
					fontSize: 24,
					fontWeight: 300,
					letterSpacing: 9,
					textTransform: 'lowercase',
					opacity: word2Opacity,
					pointerEvents: 'none',
				}}
			>
				vapor
			</div>

			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '42px 0 34px 0',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						padding: '10px 24px 12px 24px',
						border: '1.5px solid rgba(212,178,106,0.55)',
						borderRadius: 999,
						background: 'rgba(74,30,43,0.28)',
						boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backdropFilter: 'blur(2px)',
					}}
				>
					<div
						style={{
							color: '#D4B26A',
							fontSize: 17,
							fontWeight: 300,
							letterSpacing: 8,
							textTransform: 'lowercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						campaign noir
					</div>
				</div>

				{/* Tier 2: Hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '18px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							position: 'relative',
							width: '100%',
							minHeight: 550,
							borderRadius: 34,
							background:
								'linear-gradient(180deg, rgba(74,30,43,0.95) 0%, rgba(53,18,28,0.98) 100%)',
							border: '1.5px solid rgba(212,178,106,0.45)',
							boxShadow: `0 ${shadowPulse}px 46px rgba(0,0,0,0.58)`,
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							padding: '56px 46px 48px 46px',
							boxSizing: 'border-box',
							textAlign: 'center',
						}}
					>
						{/* Inner edge glow */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								borderRadius: 34,
								boxShadow: 'inset 0 0 0 1px rgba(237,234,228,0.05)',
								pointerEvents: 'none',
							}}
						/>

						{/* Glint pass */}
						<div
							style={{
								position: 'absolute',
								top: -80,
								bottom: -80,
								width: 120,
								background:
									'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.02) 18%, rgba(237,234,228,0.18) 50%, rgba(255,255,255,0.02) 82%, transparent 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								filter: 'blur(1px)',
								pointerEvents: 'none',
							}}
						/>

						{/* Top whisper line */}
						<div
							style={{
								color: '#6B6B73',
								fontSize: 18,
								fontWeight: 300,
								letterSpacing: 11,
								textTransform: 'lowercase',
								lineHeight: 1,
								whiteSpace: 'nowrap',
							}}
						>
							soft systems / hard returns
						</div>

						{/* Headline */}
						<div
							style={{
								maxWidth: '92%',
								color: '#EDEAE4',
								fontSize: 72,
								fontWeight: 300,
								letterSpacing: 6,
								textTransform: 'lowercase',
								lineHeight: 1.02,
								whiteSpace: 'normal',
							}}
						>
							automated margins
						</div>

						{/* Metric capsule */}
						<div
							style={{
								opacity: metricOpacity,
								transform: `translateY(${metricY}px)`,
								padding: '18px 28px 20px 28px',
								borderRadius: 999,
								background: 'rgba(8,8,10,0.34)',
								border: '1.5px solid rgba(212,178,106,0.75)',
								boxShadow: '0 10px 30px rgba(0,0,0,0.34)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								minWidth: 520,
								maxWidth: '88%',
							}}
						>
							<div
								style={{
									color: '#D4B26A',
									fontSize: 58,
									fontWeight: 300,
									letterSpacing: metricLetterSpace,
									textTransform: 'lowercase',
									lineHeight: 1,
									whiteSpace: 'nowrap',
								}}
							>
								50% commission
							</div>
						</div>

						{/* Bottom whisper line */}
						<div
							style={{
								color: '#EDEAE4',
								fontSize: 22,
								fontWeight: 300,
								letterSpacing: 9,
								textTransform: 'lowercase',
								lineHeight: 1.1,
								whiteSpace: 'nowrap',
								opacity: 0.92,
							}}
						>
							quietly compounding
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						padding: '14px 30px 16px 30px',
						borderTop: '1px solid rgba(212,178,106,0.5)',
						borderBottom: '1px solid rgba(212,178,106,0.5)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							color: '#EDEAE4',
							fontSize: 24,
							fontWeight: 300,
							letterSpacing: 8,
							textTransform: 'lowercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						pure software leverage
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}