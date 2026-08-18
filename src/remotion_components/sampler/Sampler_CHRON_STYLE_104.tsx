import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_104() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snappy entrances
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 250, mass: 0.55},
	});

	const cardEntrance = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const takeawayEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// Beat 2: active state switch / rolling emphasis
	const metricReveal = interpolate(frame, [14, 32], [0, 1], clamp);
	const commissionGlow = interpolate(frame, [18, 42], [0.65, 1], clamp);
	const metricPulse = frame >= 24 && frame <= 46 ? 1 + Math.sin((frame - 24) * 0.6) * 0.05 : 1;

	// Beat 3: continuous living loop
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.11) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const cardShadowPulse = 22 + Math.sin(frame * 0.18) * 5;
	const uvFlicker = 0.92 + ((Math.sin(frame * 0.8) + 1) / 2) * 0.08;
	const shineOffset = interpolate((frame + 8) % 70, [0, 70], [-220, 980], clamp);
	const drawProgress = interpolate(frame, [8, 26], [0, 1], clamp);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);

	const splatterScale1 = spring({
		frame: frame - 10,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.5},
	});

	const splatterScale2 = spring({
		frame: frame - 16,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.52},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#150A2E',
				fontFamily: '"Arial Rounded MT Bold", "Trebuchet MS", "Helvetica Neue", Arial, sans-serif',
				opacity,
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Ambient blacklight glow */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at 50% 35%, rgba(125,249,255,0.16) 0%, rgba(255,79,203,0.08) 28%, rgba(21,10,46,0) 60%)',
				}}
			/>

			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '48px 10px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '12px 28px',
						borderRadius: 18,
						border: '3px solid #7DF9FF',
						background: 'rgba(125,249,255,0.08)',
						boxShadow:
							'0 0 14px rgba(125,249,255,0.45), 0 0 34px rgba(57,255,20,0.18), inset 0 0 14px rgba(255,79,203,0.12)',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#39FF14',
							boxShadow: '0 0 12px #39FF14, 0 0 24px #39FF14',
						}}
					/>
					<div
						style={{
							color: '#FCEE09',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							textShadow:
								'0 0 8px rgba(252,238,9,0.8), 0 0 18px rgba(252,238,9,0.4)',
						}}
					>
						Activation Code
					</div>
				</div>

				{/* Tier 2: Massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0 18px',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 545,
							borderRadius: 34,
							border: '4px solid #7DF9FF',
							background:
								'linear-gradient(180deg, rgba(125,249,255,0.12) 0%, rgba(255,79,203,0.08) 52%, rgba(21,10,46,0.72) 100%)',
							boxShadow: `0 ${cardShadowPulse}px 40px rgba(0,0,0,0.55), 0 0 22px rgba(125,249,255,0.45), 0 0 40px rgba(255,79,203,0.22), inset 0 0 18px rgba(125,249,255,0.16)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '48px 38px 42px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							textAlign: 'center',
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -20,
								bottom: -20,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(252,238,9,0.20) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								filter: 'blur(4px)',
								pointerEvents: 'none',
							}}
						/>

						{/* Glow draw lines kept safely in margins */}
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 1000 560"
							style={{
								position: 'absolute',
								inset: 0,
								pointerEvents: 'none',
								opacity: 0.9,
							}}
						>
							<path
								d="M70 92 C 180 58, 310 58, 410 92"
								fill="none"
								stroke="#FF4FCB"
								strokeWidth="6"
								strokeLinecap="round"
								strokeDasharray="380"
								strokeDashoffset={380 * (1 - drawProgress)}
								style={{
									filter: 'drop-shadow(0 0 8px #FF4FCB) drop-shadow(0 0 16px #FF4FCB)',
								}}
							/>
							<path
								d="M590 92 C 690 58, 820 58, 930 92"
								fill="none"
								stroke="#39FF14"
								strokeWidth="6"
								strokeLinecap="round"
								strokeDasharray="380"
								strokeDashoffset={380 * (1 - drawProgress)}
								style={{
									filter: 'drop-shadow(0 0 8px #39FF14) drop-shadow(0 0 16px #39FF14)',
								}}
							/>
							<path
								d="M110 470 C 260 510, 740 510, 890 470"
								fill="none"
								stroke="#FCEE09"
								strokeWidth="6"
								strokeLinecap="round"
								strokeDasharray="800"
								strokeDashoffset={800 * (1 - drawProgress)}
								style={{
									filter: 'drop-shadow(0 0 8px #FCEE09) drop-shadow(0 0 16px #FCEE09)',
								}}
							/>
						</svg>

						{/* Splatter pops in corners only */}
						<div
							style={{
								position: 'absolute',
								top: 34,
								left: 30,
								transform: `scale(${splatterScale1})`,
								opacity: 0.9,
							}}
						>
							<svg width="68" height="68" viewBox="0 0 68 68">
								<g fill="#FF4FCB" opacity={0.9}>
									<circle cx="22" cy="20" r="7" />
									<circle cx="11" cy="32" r="4" />
									<circle cx="33" cy="9" r="3" />
									<circle cx="41" cy="24" r="5" />
									<circle cx="27" cy="39" r="4" />
								</g>
							</svg>
						</div>

						<div
							style={{
								position: 'absolute',
								bottom: 34,
								right: 32,
								transform: `scale(${splatterScale2})`,
								opacity: 0.88,
							}}
						>
							<svg width="76" height="76" viewBox="0 0 76 76">
								<g fill="#39FF14" opacity={0.95}>
									<circle cx="25" cy="25" r="7" />
									<circle cx="12" cy="37" r="4" />
									<circle cx="39" cy="15" r="4" />
									<circle cx="48" cy="31" r="5" />
									<circle cx="33" cy="44" r="4" />
								</g>
							</svg>
						</div>

						{/* Headline */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								paddingTop: 20,
								paddingLeft: 20,
								paddingRight: 20,
								boxSizing: 'border-box',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontSize: 72,
									lineHeight: 1.02,
									fontWeight: 1000,
									letterSpacing: 1,
									textTransform: 'uppercase',
									color: '#150A2E',
									WebkitTextStroke: '4px #39FF14',
									textShadow:
										`0 0 8px rgba(57,255,20,${uvFlicker}), 0 0 18px rgba(57,255,20,0.85), 0 0 34px rgba(57,255,20,0.45)`,
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric block */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								position: 'relative',
								zIndex: 2,
								transform: `scale(${metricPulse})`,
							}}
						>
							<div
								style={{
									padding: '18px 34px',
									borderRadius: 24,
									border: '4px solid #FF4FCB',
									background: 'rgba(255,79,203,0.10)',
									boxShadow:
										'0 0 14px rgba(255,79,203,0.5), inset 0 0 16px rgba(255,79,203,0.16)',
								}}
							>
								<div
									style={{
										fontSize: 68,
										lineHeight: 1,
										fontWeight: 1000,
										letterSpacing: 1,
										textTransform: 'uppercase',
										color: '#FCEE09',
										textShadow: `0 0 10px rgba(252,238,9,${commissionGlow}), 0 0 24px rgba(252,238,9,0.55)`,
										opacity: metricReveal,
									}}
								>
									50%
								</div>
							</div>

							<div
								style={{
									fontSize: 34,
									lineHeight: 1.05,
									fontWeight: 1000,
									letterSpacing: 4,
									textTransform: 'uppercase',
									color: '#150A2E',
									WebkitTextStroke: '2.6px #7DF9FF',
									textShadow:
										'0 0 8px rgba(125,249,255,0.7), 0 0 16px rgba(125,249,255,0.35)',
									opacity: interpolate(frame, [22, 38], [0, 1], clamp),
								}}
							>
								Commission
							</div>
						</div>

						{/* Bottom internal accent chip */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								padding: '12px 26px',
								borderRadius: 18,
								border: '3px solid #FCEE09',
								background: 'rgba(252,238,9,0.10)',
								boxShadow:
									'0 0 12px rgba(252,238,9,0.35), inset 0 0 10px rgba(252,238,9,0.12)',
							}}
						>
							<div
								style={{
									fontSize: 20,
									fontWeight: 900,
									letterSpacing: 3,
									textTransform: 'uppercase',
									color: '#FCEE09',
									textShadow:
										'0 0 8px rgba(252,238,9,0.6), 0 0 16px rgba(252,238,9,0.3)',
								}}
							>
								UV Revenue Pulse
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway punchline */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						padding: '16px 34px',
						borderRadius: 20,
						border: '3px solid #39FF14',
						background: 'rgba(57,255,20,0.12)',
						boxShadow:
							'0 0 16px rgba(57,255,20,0.4), inset 0 0 12px rgba(57,255,20,0.14)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							color: '#39FF14',
							textShadow:
								'0 0 8px rgba(57,255,20,0.8), 0 0 18px rgba(57,255,20,0.4)',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}