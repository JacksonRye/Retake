import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_34() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: Snappy entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 250, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 14, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// BEAT 2: Notification cascades + count burst
	// ------------------------------------------
	const notif1X = interpolate(frame, [6, 18], [520, 0], clamp);
	const notif2X = interpolate(frame, [11, 24], [520, 0], clamp);
	const notif3X = interpolate(frame, [16, 30], [520, 0], clamp);

	const notifOpacity1 = interpolate(frame, [6, 10, 42, 54], [0, 1, 1, 0], clamp);
	const notifOpacity2 = interpolate(frame, [11, 15, 46, 58], [0, 1, 1, 0], clamp);
	const notifOpacity3 = interpolate(frame, [16, 20, 50, 62], [0, 1, 1, 0], clamp);

	const badgeCount = Math.round(interpolate(frame, [18, 52], [7, 50], clamp));
	const badgeScaleBurst = interpolate(frame, [20, 26, 34], [1, 1.26, 1], clamp);

	// ------------------------------------------
	// BEAT 2.5: clear-all wipe + state cleanup
	// ------------------------------------------
	const clearSweep = interpolate(frame, [60, 77], [-860, 860], clamp);
	const clearOpacity = interpolate(frame, [58, 61, 74, 79], [0, 1, 1, 0], clamp);

	// ------------------------------------------
	// BEAT 3: Living hover / buzz / shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shineOffset = interpolate((frame + 8) % 68, [0, 68], [-260, 980], clamp);
	const buzzWindow = frame >= 28 && frame <= 64;
	const buzzX = buzzWindow ? Math.sin(frame * 1.9) * 4 : 0;
	const buzzY = buzzWindow ? Math.cos(frame * 1.4) * 2 : 0;
	const shadowPulse = 20 + Math.sin(frame * 0.18) * 5;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -70],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const notificationStyleBase: React.CSSProperties = {
		width: 360,
		height: 78,
		backgroundColor: '#F5F5F7',
		border: '2px solid rgba(28,28,34,0.10)',
		borderRadius: 22,
		boxShadow: '0 14px 30px rgba(0,0,0,0.14)',
		display: 'flex',
		alignItems: 'center',
		padding: '0 20px',
		boxSizing: 'border-box',
		gap: 16,
	};

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0B0B0F',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				opacity,
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
					padding: '48px 20px 40px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#F5F5F7',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 28px rgba(0,0,0,0.30)',
					}}
				>
					<div
						style={{
							width: 14,
							height: 14,
							borderRadius: 999,
							backgroundColor: '#FF3B30',
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							color: '#1C1C22',
							whiteSpace: 'nowrap',
						}}
					>
						NOTIFICATION HELL
					</div>
				</div>

				{/* TIER 2: HERO */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY + buzzY}px) translateX(${buzzX}px) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* notification banners positioned above card content zone to avoid collisions */}
					<div
						style={{
							position: 'absolute',
							top: 10,
							right: 18,
							display: 'flex',
							flexDirection: 'column',
							gap: 12,
							zIndex: 4,
							pointerEvents: 'none',
						}}
					>
						<div
							style={{
								...notificationStyleBase,
								transform: `translateX(${notif1X}px)`,
								opacity: notifOpacity1,
							}}
						>
							<div
								style={{
									width: 42,
									height: 42,
									borderRadius: 14,
									backgroundColor: '#0A84FF',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#F5F5F7',
									fontSize: 22,
									fontWeight: 900,
									flexShrink: 0,
								}}
							>
								A
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									minWidth: 0,
									flex: 1,
								}}
							>
								<div
									style={{
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 1.4,
										textTransform: 'uppercase',
										color: '#1C1C22',
										lineHeight: 1.1,
									}}
								>
									APP ALERT
								</div>
								<div
									style={{
										fontSize: 14,
										fontWeight: 700,
										color: 'rgba(28,28,34,0.72)',
										lineHeight: 1.15,
									}}
								>
									Commission spike detected
								</div>
							</div>
							<div
								style={{
									width: 14,
									height: 14,
									borderRadius: 999,
									backgroundColor: '#FF3B30',
									flexShrink: 0,
								}}
							/>
						</div>

						<div
							style={{
								...notificationStyleBase,
								transform: `translateX(${notif2X}px)`,
								opacity: notifOpacity2,
							}}
						>
							<div
								style={{
									width: 42,
									height: 42,
									borderRadius: 14,
									backgroundColor: '#FF3B30',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#F5F5F7',
									fontSize: 22,
									fontWeight: 900,
									flexShrink: 0,
								}}
							>
								9
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									minWidth: 0,
									flex: 1,
								}}
							>
								<div
									style={{
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 1.4,
										textTransform: 'uppercase',
										color: '#1C1C22',
										lineHeight: 1.1,
									}}
								>
									NEW PINGS
								</div>
								<div
									style={{
										fontSize: 14,
										fontWeight: 700,
										color: 'rgba(28,28,34,0.72)',
										lineHeight: 1.15,
									}}
								>
									Payout workflow buzzing
								</div>
							</div>
							<div
								style={{
									width: 14,
									height: 14,
									borderRadius: 999,
									backgroundColor: '#0A84FF',
									flexShrink: 0,
								}}
							/>
						</div>

						<div
							style={{
								...notificationStyleBase,
								transform: `translateX(${notif3X}px)`,
								opacity: notifOpacity3,
							}}
						>
							<div
								style={{
									width: 42,
									height: 42,
									borderRadius: 14,
									backgroundColor: '#1C1C22',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#F5F5F7',
									fontSize: 20,
									fontWeight: 900,
									flexShrink: 0,
								}}
							>
								!
							</div>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									minWidth: 0,
									flex: 1,
								}}
							>
								<div
									style={{
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 1.4,
										textTransform: 'uppercase',
										color: '#1C1C22',
										lineHeight: 1.1,
									}}
								>
									BUZZ MODE
								</div>
								<div
									style={{
										fontSize: 14,
										fontWeight: 700,
										color: 'rgba(28,28,34,0.72)',
										lineHeight: 1.15,
									}}
								>
									Clear all to regain focus
								</div>
							</div>
							<div
								style={{
									width: 14,
									height: 14,
									borderRadius: 999,
									backgroundColor: '#FF3B30',
									flexShrink: 0,
								}}
							/>
						</div>
					</div>

					<div
						style={{
							width: '96%',
							minHeight: 550,
							backgroundColor: '#F5F5F7',
							border: '4px solid rgba(255,255,255,0.65)',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 38px rgba(0,0,0,0.45)`,
							padding: '48px 42px 42px 42px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							position: 'relative',
							overflow: 'hidden',
							zIndex: 2,
						}}
					>
						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.50) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* clear-all wipe */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: clearSweep,
								width: 180,
								backgroundColor: '#0A84FF',
								opacity: clearOpacity,
								filter: 'blur(2px)',
								pointerEvents: 'none',
								zIndex: 1,
							}}
						/>

						{/* top row */}
						<div
							style={{
								display: 'flex',
								alignItems: 'flex-start',
								justifyContent: 'space-between',
								gap: 20,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#1C1C22',
									color: '#F5F5F7',
									borderRadius: 16,
									padding: '10px 16px',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								APP-NAME
							</div>

							<div
								style={{
									backgroundColor: '#FF3B30',
									color: '#F5F5F7',
									borderRadius: 24,
									padding: '12px 18px',
									display: 'flex',
									alignItems: 'center',
									gap: 12,
									boxShadow: '0 10px 24px rgba(255,59,48,0.28)',
									whiteSpace: 'nowrap',
									transform: `scale(${badgeScaleBurst})`,
								}}
							>
								<div
									style={{
										fontSize: 56,
										fontWeight: 1000,
										lineHeight: 0.92,
										letterSpacing: -2,
									}}
								>
									{badgeCount}
								</div>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											fontSize: 12,
											fontWeight: 900,
											letterSpacing: 2,
											textTransform: 'uppercase',
											lineHeight: 1.1,
										}}
									>
										Unread
									</div>
									<div
										style={{
											fontSize: 12,
											fontWeight: 900,
											letterSpacing: 2,
											textTransform: 'uppercase',
											lineHeight: 1.1,
										}}
									>
										Alerts
									</div>
								</div>
							</div>
						</div>

						{/* center headline block */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 24,
								flex: 1,
								textAlign: 'center',
								position: 'relative',
								zIndex: 2,
								padding: '24px 0 12px 0',
							}}
						>
							<div
								style={{
									fontSize: 74,
									fontWeight: 1000,
									lineHeight: 0.96,
									letterSpacing: -2.8,
									textTransform: 'uppercase',
									color: '#1C1C22',
									maxWidth: 760,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									backgroundColor: '#0B0B0F',
									borderRadius: 28,
									padding: '20px 30px',
									display: 'flex',
									alignItems: 'baseline',
									justifyContent: 'center',
									gap: 14,
									boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
									flexWrap: 'nowrap',
								}}
							>
								<div
									style={{
										fontSize: 82,
										fontWeight: 1000,
										lineHeight: 0.94,
										letterSpacing: -3,
										color: '#FF3B30',
										whiteSpace: 'nowrap',
									}}
								>
									50%
								</div>
								<div
									style={{
										fontSize: 28,
										fontWeight: 900,
										lineHeight: 1.0,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
										color: '#F5F5F7',
										whiteSpace: 'nowrap',
									}}
								>
									Commission
								</div>
							</div>
						</div>

						{/* bottom utility bar */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#0A84FF',
									color: '#F5F5F7',
									borderRadius: 16,
									padding: '12px 24px',
									fontSize: 20,
									fontWeight: 900,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								Clear All
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FF3B30',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 10px 26px rgba(0,0,0,0.34)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							color: '#F5F5F7',
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