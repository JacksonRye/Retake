import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_52() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Clay stop-motion stepping
	const steppedFrame = Math.floor(frame / 2) * 2; // 15fps feel
	const stopMotionFrame = Math.floor(frame / 2.5) * 2.5; // slightly imperfect handmade cadence

	// Beat 1: Entrance
	const badgeSpring = spring({
		frame: steppedFrame - 2,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.55},
	});

	const cardSpring = spring({
		frame: steppedFrame,
		fps,
		config: {damping: 10, stiffness: 210, mass: 0.7},
	});

	const metricSpring = spring({
		frame: steppedFrame - 8,
		fps,
		config: {damping: 12, stiffness: 190, mass: 0.6},
	});

	// Beat 2: Active state / rolling metric
	const commissionValue = Math.round(
		interpolate(stopMotionFrame, [18, 62], [12, 50], clamp)
	);

	const metricScale =
		frame >= 52 && frame <= 60
			? 1 + Math.sin((frame - 52) / 8 * Math.PI) * 0.12
			: 1;

	// Beat 3: Living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shineOffset = interpolate((frame + 18) % 68, [0, 68], [-220, 1100], clamp);

	// Handmade squash & stretch accents
	const claySquash = 1 + Math.sin(frame * 0.18) * 0.018;
	const clayStretch = 1 - Math.sin(frame * 0.18) * 0.018;
	const shadowPulse = 18 + Math.sin(frame * 0.16) * 4;

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const clayTextShadow = `
		0 2px 0 rgba(63,58,53,0.95),
		0 4px 0 rgba(63,58,53,0.88),
		0 6px 0 rgba(63,58,53,0.78),
		0 10px 18px rgba(63,58,53,0.35)
	`;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#E8743B',
				opacity,
				fontFamily:
					'"Arial Rounded MT Bold", "Trebuchet MS", "Verdana", sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '40px 18px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Badge */}
				<div
					style={{
						transform: `translateY(${badgeFloat}px) scale(${badgeSpring}) rotate(${
							Math.sin(frame * 0.09) * 0.8
						}deg)`,
						backgroundColor: '#F2E9DC',
						border: '4px solid #3F3A35',
						borderRadius: 22,
						padding: '12px 30px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 10px 0 #8B6F4E, 0 16px 28px rgba(63,58,53,0.28)',
					}}
				>
					<div
						style={{
							color: '#5B9BD5',
							fontSize: 21,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
							textShadow: '0 1px 0 rgba(63,58,53,0.18)',
							whiteSpace: 'nowrap',
						}}
					>
						CLAY DESK SYSTEM
					</div>
				</div>

				{/* Tier 2: Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						transform: `scale(${cardSpring}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#3F3A35',
							border: '5px solid #8B6F4E',
							borderRadius: 38,
							boxShadow: `0 ${shadowPulse}px 0 #8B6F4E, 0 ${
								shadowPulse + 12
							}px 30px rgba(63,58,53,0.34)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '42px 34px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							textAlign: 'center',
						}}
					>
						{/* Clay thumbprint accents */}
						<div
							style={{
								position: 'absolute',
								top: 18,
								left: 20,
								width: 86,
								height: 28,
								backgroundColor: 'rgba(242,233,220,0.08)',
								borderRadius: 999,
								transform: 'rotate(-12deg)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 56,
								right: 32,
								width: 58,
								height: 22,
								backgroundColor: 'rgba(242,233,220,0.07)',
								borderRadius: 999,
								transform: 'rotate(14deg)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 78,
								left: 40,
								width: 74,
								height: 24,
								backgroundColor: 'rgba(242,233,220,0.06)',
								borderRadius: 999,
								transform: 'rotate(8deg)',
							}}
						/>

						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(180deg, rgba(242,233,220,0.00) 0%, rgba(242,233,220,0.16) 50%, rgba(242,233,220,0.00) 100%)',
								transform: `translateX(${shineOffset}px) rotate(14deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Headline */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								paddingTop: 6,
							}}
						>
							<div
								style={{
									maxWidth: 820,
									color: '#5B9BD5',
									fontSize: 72,
									fontWeight: 900,
									lineHeight: 0.95,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									textShadow: clayTextShadow,
									transform: `scaleX(${claySquash}) scaleY(${clayStretch})`,
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric block */}
						<div
							style={{
								transform: `scale(${metricSpring * metricScale}) rotate(${
									Math.sin(frame * 0.11) * 0.6
								}deg)`,
								backgroundColor: '#F2E9DC',
								border: '5px solid #8B6F4E',
								borderRadius: 30,
								padding: '26px 34px 24px',
								width: '82%',
								maxWidth: 700,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 8,
								boxShadow: '0 10px 0 #8B6F4E, 0 18px 28px rgba(0,0,0,0.18)',
							}}
						>
							<div
								style={{
									color: '#5B9BD5',
									fontSize: 80,
									fontWeight: 900,
									lineHeight: 0.92,
									letterSpacing: -2,
									textShadow:
										'0 2px 0 rgba(139,111,78,0.55), 0 5px 10px rgba(63,58,53,0.14)',
									transform: `scaleX(${1 + Math.sin(frame * 0.15) * 0.01}) scaleY(${
										1 - Math.sin(frame * 0.15) * 0.01
									})`,
									whiteSpace: 'nowrap',
								}}
							>
								{commissionValue}%
							</div>
							<div
								style={{
									color: '#8B6F4E',
									fontSize: 34,
									fontWeight: 900,
									lineHeight: 1,
									letterSpacing: 1.5,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								COMMISSION
							</div>
						</div>

						{/* Bottom label inside card */}
						<div
							style={{
								backgroundColor: '#5B9BD5',
								border: '4px solid #F2E9DC',
								borderRadius: 20,
								padding: '12px 24px',
								boxShadow: '0 8px 0 rgba(242,233,220,0.28)',
							}}
						>
							<div
								style={{
									color: '#F2E9DC',
									fontSize: 24,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								CLAY-BUILT ADVANTAGE
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `translateY(${takeawayFloat}px) scale(${cardSpring}) rotate(${
							Math.sin(frame * 0.07) * 0.7
						}deg)`,
						backgroundColor: '#F2E9DC',
						border: '4px solid #3F3A35',
						borderRadius: 24,
						padding: '16px 34px',
						boxShadow: '0 10px 0 #8B6F4E, 0 16px 28px rgba(63,58,53,0.24)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#5B9BD5',
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 2,
							lineHeight: 1.1,
							textTransform: 'uppercase',
							textShadow: '0 1px 0 rgba(63,58,53,0.12)',
							whiteSpace: 'nowrap',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}