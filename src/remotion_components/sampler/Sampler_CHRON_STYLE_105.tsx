import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_105() {
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
		config: {damping: 12, stiffness: 240, mass: 0.5},
	});
	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.65},
	});
	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.6},
	});

	// Beat 2: Active state roll
	const commissionValue = Math.round(interpolate(frame, [16, 58], [12, 50], clamp));
	const commissionText = `${commissionValue}% COMMISSION`;

	const cameoLift = interpolate(frame, [34, 48, 62], [0, -10, 0], clamp);
	const metricPop = interpolate(frame, [34, 42, 50], [1, 1.06, 1], clamp);
	const glowStrength = interpolate(frame, [28, 56], [0.18, 0.34], clamp);

	// Beat 3: Continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const parallaxA = Math.sin(frame * 0.07) * 10;
	const parallaxB = Math.sin(frame * 0.09 + 0.8) * 14;
	const parallaxC = Math.sin(frame * 0.06 + 1.5) * 8;
	const shineOffset = interpolate((frame + 10) % 70, [0, 70], [-220, 980], clamp);
	const breathGlow = 0.72 + Math.sin(frame * 0.12) * 0.08;

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -50], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F6F0E2',
				fontFamily: '"Arial Black", Impact, "Helvetica Neue", sans-serif',
				opacity,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 18px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '12px 26px',
						borderRadius: 999,
						backgroundColor: '#CBBBA0',
						border: '3px solid #39414B',
						boxShadow:
							'0 6px 0 #39414B, 0 14px 28px rgba(57,65,75,0.18)',
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'absolute',
							inset: 5,
							borderRadius: 999,
							border: '2px solid rgba(42,53,80,0.55)',
							pointerEvents: 'none',
						}}
					/>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#2A3550',
							marginRight: 12,
							boxShadow: '0 0 0 3px rgba(255,201,126,0.45)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#2A3550',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						Shadowbox Leverage
					</div>
				</div>

				{/* TIER 2: MASSIVE HERO CARD */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '24px 0 20px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '95%',
							maxWidth: 1160,
							minHeight: 548,
							borderRadius: 36,
							backgroundColor: '#39414B',
							border: '4px solid #2A3550',
							boxShadow:
								'0 12px 0 #2A3550, 0 30px 50px rgba(42,53,80,0.22)',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Backlight breathing */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background: `radial-gradient(circle at 50% 42%, rgba(255,201,126,${glowStrength * breathGlow}) 0%, rgba(255,201,126,${0.10 * breathGlow}) 26%, rgba(255,201,126,0) 56%)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Papercraft depth layers */}
						<div
							style={{
								position: 'absolute',
								inset: 18,
								borderRadius: 28,
								backgroundColor: '#F6F0E2',
								transform: `translate(${parallaxA}px, ${parallaxC * 0.4}px)`,
								boxShadow: '0 8px 0 rgba(203,187,160,0.85)',
								opacity: 0.96,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								inset: 34,
								borderRadius: 26,
								backgroundColor: '#CBBBA0',
								transform: `translate(${parallaxB * 0.5}px, ${parallaxA * 0.35}px)`,
								boxShadow: '0 8px 0 rgba(42,53,80,0.20)',
								opacity: 0.94,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								inset: 54,
								borderRadius: 24,
								backgroundColor: '#F6F0E2',
								border: '3px solid #CBBBA0',
								transform: `translate(${parallaxC * 0.6}px, ${parallaxB * 0.18}px)`,
								boxShadow: '0 10px 0 rgba(57,65,75,0.08)',
							}}
						/>

						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 140,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
								opacity: 0.7,
							}}
						/>

						{/* Main content layout */}
						<div
							style={{
								position: 'relative',
								zIndex: 5,
								width: '100%',
								height: '100%',
								minHeight: 548,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '58px 48px 44px',
								boxSizing: 'border-box',
								textAlign: 'center',
								gap: 26,
							}}
						>
							{/* Headline cameo frame */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									paddingTop: 2,
								}}
							>
								<div
									style={{
										width: '88%',
										maxWidth: 900,
										borderRadius: 28,
										backgroundColor: '#2A3550',
										border: '4px solid #CBBBA0',
										boxShadow:
											'0 8px 0 rgba(203,187,160,0.95), 0 16px 28px rgba(42,53,80,0.18)',
										padding: '26px 34px',
										position: 'relative',
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 8,
											border: '2px solid rgba(255,201,126,0.7)',
											borderRadius: 20,
											pointerEvents: 'none',
										}}
									/>
									<div
										style={{
											color: '#F6F0E2',
											fontSize: 72,
											fontWeight: 1000,
											lineHeight: 0.98,
											letterSpacing: -1.8,
											textTransform: 'uppercase',
											textShadow:
												'0 3px 0 rgba(203,187,160,0.55), 0 10px 16px rgba(0,0,0,0.16)',
											whiteSpace: 'nowrap',
										}}
									>
										AUTOMATED MARGINS
									</div>
								</div>
							</div>

							{/* Metric block */}
							<div
								style={{
									transform: `translateY(${cameoLift}px) scale(${metricPop})`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '24px 36px',
									borderRadius: 30,
									backgroundColor: '#FFC97E',
									border: '4px solid #2A3550',
									boxShadow:
										'0 10px 0 #CBBBA0, 0 18px 30px rgba(42,53,80,0.18)',
									position: 'relative',
									minWidth: 640,
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 8,
										borderRadius: 22,
										border: '2px solid rgba(57,65,75,0.35)',
										pointerEvents: 'none',
									}}
								/>
								<div
									style={{
										color: '#2A3550',
										fontSize: 66,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: -1,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
										textShadow:
											'0 2px 0 rgba(246,240,226,0.9), 0 8px 14px rgba(57,65,75,0.14)',
									}}
								>
									{commissionText}
								</div>
							</div>

							{/* Bottom support chip inside card */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '14px 28px',
									borderRadius: 18,
									backgroundColor: '#CBBBA0',
									border: '3px solid #39414B',
									boxShadow:
										'0 7px 0 rgba(57,65,75,0.92), 0 12px 22px rgba(57,65,75,0.12)',
								}}
							>
								<div
									style={{
										color: '#2A3550',
										fontSize: 24,
										fontWeight: 900,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									Cut-Out Revenue Engine
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '16px 32px',
						borderRadius: 24,
						backgroundColor: '#2A3550',
						border: '3px solid #CBBBA0',
						boxShadow:
							'0 8px 0 #CBBBA0, 0 16px 30px rgba(42,53,80,0.16)',
						textAlign: 'center',
						maxWidth: '88%',
					}}
				>
					<div
						style={{
							color: '#F6F0E2',
							fontSize: 26,
							fontWeight: 1000,
							letterSpacing: 2.5,
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