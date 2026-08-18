import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_60() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const badgeSpring = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardSpring = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const takeawaySpring = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// Beat 2: Active metric transformation
	// ------------------------------------------
	const metricNumber = Math.round(interpolate(frame, [18, 62], [12, 50], clamp));
	const metricText = `${metricNumber}% COMMISSION`;

	const dimLineGrow = interpolate(frame, [10, 34], [0, 1], clamp);
	const crosshairGrow = interpolate(frame, [22, 42], [0, 1], clamp);
	const underlineGrow = interpolate(frame, [28, 48], [0, 1], clamp);
	const arcReveal = interpolate(frame, [34, 64], [0, 1], clamp);

	const snapFlash = interpolate(frame, [42, 47, 53], [0, 1, 0], clamp);
	const cardNudge = interpolate(frame, [42, 48, 58], [0, 10, 0], clamp);

	// ------------------------------------------
	// Beat 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeHover = Math.sin(frame * 0.1) * 3;
	const takeawayHover = Math.sin(frame * 0.12 + 1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 65, [0, 65], [-320, 980], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -60],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1B4F8A',
				opacity,
				fontFamily: '"Courier New", "IBM Plex Mono", "Menlo", monospace',
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
					padding: '54px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeSpring}) translateY(${badgeHover}px)`,
						backgroundColor: '#39414B',
						border: '2px solid #9FB3C8',
						borderRadius: 14,
						padding: '12px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 22px rgba(0,0,0,0.22)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 2,
							backgroundColor: '#D64550',
							boxShadow: `0 0 0 ${1 + snapFlash}px rgba(214,69,80,0.25)`,
						}}
					/>
					<div
						style={{
							color: '#EAF2FA',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 2.8,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						BLUEPRINT MODE
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
						position: 'relative',
						margin: '24px 0',
						transform: `scale(${cardSpring}) translateY(${hoverY + cardNudge}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#39414B',
							border: '4px solid #9FB3C8',
							borderRadius: 30,
							boxShadow: `0 ${shadowPulse}px 30px rgba(0,0,0,0.28)`,
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* traveling sheen */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 110,
								background:
									'linear-gradient(90deg, rgba(234,242,250,0), rgba(234,242,250,0.14), rgba(234,242,250,0))',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* drafting border guides */}
						<div
							style={{
								position: 'absolute',
								inset: 14,
								border: '1px solid rgba(234,242,250,0.18)',
								borderRadius: 20,
								pointerEvents: 'none',
							}}
						/>

						{/* top title block */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 12,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#9FB3C8',
									fontSize: 15,
									fontWeight: 900,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
								}}
							>
								SHEET 60
							</div>
							<div
								style={{
									color: '#9FB3C8',
									fontSize: 15,
									fontWeight: 900,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
								}}
							>
								AUTO-LAYOUT
							</div>
						</div>

						{/* center content zone */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 30,
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* Headline block */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									position: 'relative',
									paddingTop: 18,
									paddingBottom: 22,
								}}
							>
								{/* horizontal dimension lines kept well outside text */}
								<div
									style={{
										position: 'absolute',
										top: 0,
										left: 36,
										height: 2,
										width: `${22 * dimLineGrow}%`,
										backgroundColor: '#9FB3C8',
										transformOrigin: 'left center',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										top: 0,
										right: 36,
										height: 2,
										width: `${22 * dimLineGrow}%`,
										backgroundColor: '#9FB3C8',
										transformOrigin: 'right center',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										top: -8,
										left: 36 + 180 * dimLineGrow,
										width: 8,
										height: 16,
										borderLeft: '2px solid #9FB3C8',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										top: -8,
										right: 36 + 180 * dimLineGrow,
										width: 8,
										height: 16,
										borderRight: '2px solid #9FB3C8',
									}}
								/>

								<div
									style={{
										color: '#EAF2FA',
										fontSize: 68,
										fontWeight: 1000,
										letterSpacing: 1.2,
										lineHeight: 1.02,
										textAlign: 'center',
										textTransform: 'uppercase',
										maxWidth: '92%',
										whiteSpace: 'nowrap',
									}}
								>
									AUTOMATED MARGINS
								</div>

								<div
									style={{
										position: 'absolute',
										bottom: 0,
										left: '50%',
										width: 320 * underlineGrow,
										height: 2,
										backgroundColor: '#D64550',
										transform: 'translateX(-50%)',
									}}
								/>
							</div>

							{/* Metric module */}
							<div
								style={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#1B4F8A',
									border: '3px solid #D64550',
									borderRadius: 24,
									padding: '22px 34px',
									minWidth: 560,
									boxShadow: `0 0 ${10 + snapFlash * 16}px rgba(214,69,80,0.18)`,
								}}
							>
								{/* side crosshairs outside text box */}
								<div
									style={{
										position: 'absolute',
										left: -34,
										top: '50%',
										transform: `translateY(-50%) scale(${crosshairGrow})`,
										transformOrigin: 'center',
										opacity: crosshairGrow,
									}}
								>
									<div
										style={{
											position: 'relative',
											width: 22,
											height: 22,
										}}
									>
										<div
											style={{
												position: 'absolute',
												left: 10,
												top: 0,
												width: 2,
												height: 22,
												backgroundColor: '#9FB3C8',
											}}
										/>
										<div
											style={{
												position: 'absolute',
												left: 0,
												top: 10,
												width: 22,
												height: 2,
												backgroundColor: '#9FB3C8',
											}}
										/>
									</div>
								</div>

								<div
									style={{
										position: 'absolute',
										right: -34,
										top: '50%',
										transform: `translateY(-50%) scale(${crosshairGrow})`,
										transformOrigin: 'center',
										opacity: crosshairGrow,
									}}
								>
									<div
										style={{
											position: 'relative',
											width: 22,
											height: 22,
										}}
									>
										<div
											style={{
												position: 'absolute',
												left: 10,
												top: 0,
												width: 2,
												height: 22,
												backgroundColor: '#9FB3C8',
											}}
										/>
										<div
											style={{
												position: 'absolute',
												left: 0,
												top: 10,
												width: 22,
												height: 2,
												backgroundColor: '#9FB3C8',
											}}
										/>
									</div>
								</div>

								<div
									style={{
										color: '#EAF2FA',
										fontSize: 58,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1.4,
										textTransform: 'uppercase',
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>

							{/* lower blueprint annotation row */}
							<div
								style={{
									width: '88%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginTop: 4,
									position: 'relative',
									height: 74,
								}}
							>
								<div
									style={{
										color: '#9FB3C8',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
									}}
								>
									DIMENSION SNAP
								</div>

								{/* compass arc in safe center lane below copy */}
								<svg
									width="180"
									height="74"
									viewBox="0 0 180 74"
									style={{
										position: 'absolute',
										left: '50%',
										top: '50%',
										transform: 'translate(-50%, -50%)',
										overflow: 'visible',
									}}
								>
									<path
										d="M20 56 A70 70 0 0 1 160 56"
										fill="none"
										stroke="#9FB3C8"
										strokeWidth="2.5"
										strokeDasharray="220"
										strokeDashoffset={220 - 220 * arcReveal}
										strokeLinecap="round"
									/>
									<circle cx="20" cy="56" r="3.5" fill="#D64550" />
									<circle cx="160" cy="56" r="3.5" fill="#D64550" />
								</svg>

								<div
									style={{
										color: '#9FB3C8',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
									}}
								>
									ARC SWEEP
								</div>
							</div>
						</div>

						{/* bottom title-block strip */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr',
								gap: 12,
								position: 'relative',
								zIndex: 2,
								marginTop: 10,
							}}
						>
							<div
								style={{
									border: '1px solid rgba(234,242,250,0.24)',
									borderRadius: 10,
									padding: '10px 12px',
									color: '#EAF2FA',
									fontSize: 13,
									fontWeight: 900,
									letterSpacing: 1.6,
									textTransform: 'uppercase',
									textAlign: 'center',
								}}
							>
								MODULE A
							</div>
							<div
								style={{
									border: '1px solid rgba(234,242,250,0.24)',
									borderRadius: 10,
									padding: '10px 12px',
									color: '#EAF2FA',
									fontSize: 13,
									fontWeight: 900,
									letterSpacing: 1.6,
									textTransform: 'uppercase',
									textAlign: 'center',
								}}
							>
								RATIO 50
							</div>
							<div
								style={{
									border: '1px solid rgba(234,242,250,0.24)',
									borderRadius: 10,
									padding: '10px 12px',
									color: '#EAF2FA',
									fontSize: 13,
									fontWeight: 900,
									letterSpacing: 1.6,
									textTransform: 'uppercase',
									textAlign: 'center',
								}}
							>
								REV 01
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawaySpring}) translateY(${takeawayHover}px)`,
						backgroundColor: '#D64550',
						borderRadius: 18,
						padding: '16px 30px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.24)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#EAF2FA',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.2,
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