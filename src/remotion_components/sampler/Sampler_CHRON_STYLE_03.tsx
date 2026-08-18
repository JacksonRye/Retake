import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_03() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance
	// ------------------------------------------
	const cardSpring = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 220,
			mass: 0.72,
		},
	});

	const badgeSpring = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 10,
			stiffness: 240,
			mass: 0.6,
		},
	});

	const takeawaySpring = spring({
		frame: frame - 7,
		fps,
		config: {
			damping: 12,
			stiffness: 210,
			mass: 0.7,
		},
	});

	const introSwipeY = interpolate(frame, [0, 12], [140, 0], clamp);
	const introOpacity = interpolate(frame, [0, 6], [0, 1], clamp);

	// ------------------------------------------
	// Beat 2: Active metric switch / notification
	// ------------------------------------------
	const metricReveal = Math.round(interpolate(frame, [16, 54], [8, 50], clamp));
	const metricText = `${metricReveal}%`;

	const commissionOpacity = interpolate(frame, [28, 38], [0, 1], clamp);
	const notifScale = spring({
		frame: frame - 26,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.55,
		},
	});

	const notifX = interpolate(frame, [24, 38], [120, 0], clamp);
	const notifY = interpolate(frame, [24, 38], [-40, 0], clamp);

	// ------------------------------------------
	// Beat 3: Continuous living motion
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.1;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 4;
	const reactionFloat = Math.sin(frame * 0.14 + 0.8) * 7;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-260, 980], clamp);
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -70],
		clamp
	);
	const exitOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 9, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0E0E10',
				opacity: introOpacity * exitOpacity,
				fontFamily:
					'"Poppins", "Arial Black", "Helvetica Neue", sans-serif',
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
					padding: '48px 18px 34px 18px',
					boxSizing: 'border-box',
					transform: `translateY(${introSwipeY + exitY}px)`,
					position: 'relative',
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeSpring}) translateY(${badgeFloat}px)`,
						backgroundColor: '#111114',
						border: '3px solid #8B5CF6',
						borderRadius: 20,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#06B6D4',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#FF2E93',
							fontSize: 20,
							fontWeight: 800,
							letterSpacing: 1.5,
							textTransform: 'lowercase',
							whiteSpace: 'nowrap',
						}}
					>
						for you capture ✦
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
						margin: '22px 0 18px 0',
						transform: `scale(${cardSpring}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#A3E635',
							border: '4px solid #A3E635',
							borderRadius: 34,
							padding: '42px 38px 34px 38px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 36px rgba(0,0,0,0.42)`,
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.00) 36%, rgba(14,14,16,0.08) 100%)',
								pointerEvents: 'none',
							}}
						/>

						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 140,
								backgroundColor: 'rgba(255,255,255,0.18)',
								transform: `translateX(${shineOffset}px) skewX(-24deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top utility row */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#0E0E10',
									color: '#06B6D4',
									padding: '8px 16px',
									borderRadius: 999,
									fontSize: 18,
									fontWeight: 800,
									textTransform: 'lowercase',
									lineHeight: 1,
									whiteSpace: 'nowrap',
								}}
							>
								algo win
							</div>
							<div
								style={{
									fontSize: 28,
									lineHeight: 1,
								}}
							>
								💸
							</div>
						</div>

						{/* headline */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '8px 8px 0 8px',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#0E0E10',
									fontSize: 72,
									fontWeight: 900,
									lineHeight: 0.96,
									letterSpacing: -2.2,
									textAlign: 'center',
									textTransform: 'uppercase',
									maxWidth: 760,
								}}
							>
								AUTOMATED
								<br />
								MARGINS
							</div>
						</div>

						{/* metric block */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 14,
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#0E0E10',
									border: '3px solid #FF2E93',
									borderRadius: 28,
									padding: '18px 34px 16px 34px',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									minWidth: 430,
									boxShadow: '0 12px 28px rgba(255,46,147,0.20)',
								}}
							>
								<div
									style={{
										color: '#FF2E93',
										fontSize: 82,
										fontWeight: 900,
										lineHeight: 0.95,
										letterSpacing: -2,
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
								<div
									style={{
										color: '#8B5CF6',
										fontSize: 28,
										fontWeight: 800,
										lineHeight: 1.05,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
										opacity: commissionOpacity,
										marginTop: 6,
										whiteSpace: 'nowrap',
									}}
								>
									COMMISSION
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#FF2E93',
									color: '#0E0E10',
									borderRadius: 16,
									padding: '10px 22px',
									fontSize: 21,
									fontWeight: 900,
									lineHeight: 1,
									letterSpacing: 0.8,
									textTransform: 'lowercase',
									boxShadow: '0 10px 26px rgba(255,46,147,0.22)',
									whiteSpace: 'nowrap',
								}}
							>
								passive checkout energy ✨
							</div>
						</div>

						{/* bottom reaction chips */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-end',
								zIndex: 2,
								paddingTop: 8,
							}}
						>
							<div
								style={{
									backgroundColor: '#8B5CF6',
									color: '#FFFFFF',
									borderRadius: 18,
									padding: '10px 16px',
									fontSize: 18,
									fontWeight: 800,
									textTransform: 'lowercase',
									lineHeight: 1,
									transform: `translateY(${reactionFloat * 0.45}px)`,
									whiteSpace: 'nowrap',
								}}
							>
								+ viral loop
							</div>

							<div
								style={{
									backgroundColor: '#06B6D4',
									color: '#0E0E10',
									borderRadius: 18,
									padding: '10px 16px',
									fontSize: 18,
									fontWeight: 800,
									textTransform: 'lowercase',
									lineHeight: 1,
									transform: `translateY(${-reactionFloat * 0.35}px)`,
									whiteSpace: 'nowrap',
								}}
							>
								saved reply ↗
							</div>
						</div>
					</div>

					{/* floating notification */}
					<div
						style={{
							position: 'absolute',
							top: 38,
							right: 34,
							transform: `translate(${notifX}px, ${notifY}px) scale(${notifScale})`,
							opacity: commissionOpacity,
							zIndex: 5,
							pointerEvents: 'none',
						}}
					>
						<div
							style={{
								backgroundColor: '#0E0E10',
								border: '3px solid #06B6D4',
								borderRadius: 18,
								padding: '12px 16px',
								display: 'flex',
								alignItems: 'center',
								gap: 10,
								boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
							}}
						>
							<div style={{fontSize: 22, lineHeight: 1}}>🔔</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 2,
								}}
							>
								<div
									style={{
										color: '#06B6D4',
										fontSize: 13,
										fontWeight: 800,
										lineHeight: 1,
										textTransform: 'lowercase',
										whiteSpace: 'nowrap',
									}}
								>
									new payout
								</div>
								<div
									style={{
										color: '#FFFFFF',
										fontSize: 16,
										fontWeight: 800,
										lineHeight: 1,
										whiteSpace: 'nowrap',
									}}
								>
									50% commission
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawaySpring}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#111114',
						border: '3px solid #FF2E93',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.38)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FF2E93',
							fontSize: 24,
							fontWeight: 900,
							lineHeight: 1.05,
							letterSpacing: 1.2,
							textTransform: 'uppercase',
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