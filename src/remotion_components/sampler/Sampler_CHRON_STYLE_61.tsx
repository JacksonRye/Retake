import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_61() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: SNAPPY ENTRANCE
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 13, stiffness: 240, mass: 0.55},
	});

	const heroIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	const bottomIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// BEAT 2: STEP COUNTER / SNAP TOGETHER
	// ------------------------------------------
	const stepNumber = frame < 42 ? '01' : frame < 78 ? '02' : '03';

	const commissionValue = Math.round(
		interpolate(frame, [14, 62], [12, 50], clamp)
	);

	const partLeftX = interpolate(frame, [8, 30], [-140, 0], clamp);
	const partRightX = interpolate(frame, [8, 30], [140, 0], clamp);
	const partTopY = interpolate(frame, [10, 32], [-90, 0], clamp);

	const snapPulse = interpolate(frame, [28, 34, 40], [1, 1.05, 1], clamp);
	const metricFlip = interpolate(frame, [18, 52], [0.86, 1], clamp);

	// ------------------------------------------
	// BEAT 3: LIVING HOVER LOOP
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 0.8) * 3;
	const shineOffset = interpolate((frame + 14) % 65, [0, 65], [-320, 900], clamp);

	const arrowDash = interpolate((frame * 2.2) % 100, [0, 100], [0, 100], clamp);
	const loopDotX = 190 + Math.sin(frame * 0.09) * 24;
	const loopDotY = 96 + Math.cos(frame * 0.09) * 14;

	// ------------------------------------------
	// EXIT
	// ------------------------------------------
	const exitY = interpolate(
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
				backgroundColor: '#FAFAF7',
				opacity,
				fontFamily:
					'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
				color: '#2B2B2B',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '46px 12px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '12px 24px',
						border: '3px solid #2B2B2B',
						borderRadius: 14,
						backgroundColor: '#FFDB00',
						boxShadow: '0 8px 18px rgba(43,43,43,0.10)',
					}}
				>
					<div
						style={{
							width: 14,
							height: 14,
							backgroundColor: '#0058A3',
							borderRadius: 3,
							border: '2px solid #2B2B2B',
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2,
							color: '#2B2B2B',
							textTransform: 'uppercase',
						}}
					>
						ASSEMBLY MANUAL
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
						margin: '24px 0',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '95%',
							minHeight: 550,
							backgroundColor: '#39414B',
							border: '4px solid #2B2B2B',
							borderRadius: 30,
							position: 'relative',
							overflow: 'hidden',
							boxShadow: '0 20px 36px rgba(43,43,43,0.18)',
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateColumns: '170px 1fr',
							columnGap: 28,
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 110,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* LEFT STEP COLUMN */}
						<div
							style={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '6px 0',
								boxSizing: 'border-box',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									alignSelf: 'stretch',
									backgroundColor: '#FAFAF7',
									border: '3px solid #2B2B2B',
									borderRadius: 22,
									padding: '18px 10px 14px',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 2,
										color: '#0058A3',
										marginBottom: 8,
									}}
								>
									STEP
								</div>
								<div
									style={{
										fontSize: 82,
										lineHeight: 0.9,
										fontWeight: 1000,
										color: '#2B2B2B',
										letterSpacing: -3,
									}}
								>
									{stepNumber}
								</div>
							</div>

							<div
								style={{
									alignSelf: 'stretch',
									backgroundColor: '#0058A3',
									border: '3px solid #2B2B2B',
									borderRadius: 20,
									padding: '14px 10px',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 2,
										color: '#FAFAF7',
									}}
								>
									PT-50X
								</div>
							</div>
						</div>

						{/* RIGHT MAIN CONTENT */}
						<div
							style={{
								height: '100%',
								display: 'grid',
								gridTemplateRows: 'auto 1fr auto',
								rowGap: 24,
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* Headline */}
							<div
								style={{
									backgroundColor: '#FAFAF7',
									border: '3px solid #2B2B2B',
									borderRadius: 24,
									padding: '24px 28px',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: 68,
										lineHeight: 1.02,
										fontWeight: 1000,
										letterSpacing: -2.2,
										color: '#2B2B2B',
										textTransform: 'uppercase',
									}}
								>
									AUTOMATED
								</div>
								<div
									style={{
										fontSize: 68,
										lineHeight: 1.02,
										fontWeight: 1000,
										letterSpacing: -2.2,
										color: '#2B2B2B',
										textTransform: 'uppercase',
									}}
								>
									MARGINS
								</div>
							</div>

							{/* Exploded assembly area */}
							<div
								style={{
									position: 'relative',
									backgroundColor: '#FAFAF7',
									border: '3px solid #2B2B2B',
									borderRadius: 28,
									overflow: 'hidden',
									minHeight: 240,
								}}
							>
								{/* Safe arrow loop zone at top-right, away from text */}
								<svg
									viewBox="0 0 420 150"
									style={{
										position: 'absolute',
										top: 12,
										right: 12,
										width: 230,
										height: 110,
										overflow: 'visible',
									}}
								>
									<defs>
										<marker
											id="arrowHeadChron61"
											markerWidth="10"
											markerHeight="10"
											refX="8"
											refY="3"
											orient="auto"
										>
											<path d="M0,0 L0,6 L9,3 z" fill="#0058A3" />
										</marker>
									</defs>
									<path
										d="M50 92 C70 42, 150 28, 214 52 C252 66, 282 92, 306 92"
										fill="none"
										stroke="#0058A3"
										strokeWidth="4"
										strokeDasharray="12 10"
										strokeDashoffset={-arrowDash}
										strokeLinecap="round"
										markerEnd="url(#arrowHeadChron61)"
									/>
									<circle
										cx={loopDotX}
										cy={loopDotY}
										r="7"
										fill="#FFDB00"
										stroke="#2B2B2B"
										strokeWidth="2"
									/>
								</svg>

								{/* Main snap-together pictogram, centered and separated from labels */}
								<div
									style={{
										position: 'absolute',
										left: '50%',
										top: '50%',
										width: 340,
										height: 170,
										transform: `translate(-50%, -50%) scale(${snapPulse})`,
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 110 + partLeftX,
											top: 64,
											width: 72,
											height: 42,
											backgroundColor: '#0058A3',
											border: '3px solid #2B2B2B',
											borderRadius: 12,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 158,
											top: 20 + partTopY,
											width: 44,
											height: 44,
											backgroundColor: '#FFDB00',
											border: '3px solid #2B2B2B',
											borderRadius: 10,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 206 + partRightX,
											top: 64,
											width: 72,
											height: 42,
											backgroundColor: '#0058A3',
											border: '3px solid #2B2B2B',
											borderRadius: 12,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 144,
											top: 78,
											width: 104,
											height: 54,
											backgroundColor: '#39414B',
											border: '3px solid #2B2B2B',
											borderRadius: 14,
										}}
									/>

									{/* Snap guides - only in clear visual zone */}
									<svg
										viewBox="0 0 340 170"
										style={{
											position: 'absolute',
											inset: 0,
										}}
									>
										<line
											x1={182 + partLeftX}
											y1="84"
											x2="146"
											y2="96"
											stroke="#2B2B2B"
											strokeWidth="3"
											strokeDasharray="8 8"
										/>
										<line
											x1="180"
											y1={42 + partTopY}
											x2="196"
											y2="78"
											stroke="#2B2B2B"
											strokeWidth="3"
											strokeDasharray="8 8"
										/>
										<line
											x1={206 + partRightX}
											y1="84"
											x2="248"
											y2="96"
											stroke="#2B2B2B"
											strokeWidth="3"
											strokeDasharray="8 8"
										/>
									</svg>
								</div>

								{/* Metric panel anchored low, isolated from arrows */}
								<div
									style={{
										position: 'absolute',
										left: 20,
										right: 20,
										bottom: 18,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											backgroundColor: '#FFDB00',
											border: '3px solid #2B2B2B',
											borderRadius: 22,
											padding: '18px 26px',
											display: 'flex',
											alignItems: 'baseline',
											justifyContent: 'center',
											gap: 16,
											transform: `scale(${metricFlip})`,
											boxShadow: '0 8px 20px rgba(43,43,43,0.10)',
										}}
									>
										<div
											style={{
												fontSize: 82,
												lineHeight: 0.92,
												fontWeight: 1000,
												letterSpacing: -3,
												color: '#2B2B2B',
											}}
										>
											{commissionValue}%
										</div>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												gap: 2,
												paddingBottom: 6,
											}}
										>
											<div
												style={{
													fontSize: 20,
													lineHeight: 1,
													fontWeight: 900,
													letterSpacing: 2,
													color: '#2B2B2B',
												}}
											>
												COMMISSION
											</div>
											<div
												style={{
													fontSize: 15,
													lineHeight: 1,
													fontWeight: 800,
													letterSpacing: 2,
													color: '#0058A3',
												}}
											>
												SNAP-FIT OUTPUT
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Bottom strip inside hero */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									gap: 16,
								}}
							>
								<div
									style={{
										flex: 1,
										backgroundColor: '#0058A3',
										border: '3px solid #2B2B2B',
										borderRadius: 18,
										padding: '12px 16px',
										textAlign: 'center',
									}}
								>
									<div
										style={{
											fontSize: 18,
											fontWeight: 900,
											letterSpacing: 2,
											color: '#FAFAF7',
										}}
									>
										MOD-A
									</div>
								</div>
								<div
									style={{
										flex: 1.4,
										backgroundColor: '#FAFAF7',
										border: '3px solid #2B2B2B',
										borderRadius: 18,
										padding: '12px 16px',
										textAlign: 'center',
									}}
								>
									<div
										style={{
											fontSize: 20,
											fontWeight: 900,
											letterSpacing: 2,
											color: '#2B2B2B',
										}}
									>
										50% COMMISSION
									</div>
								</div>
								<div
									style={{
										flex: 1,
										backgroundColor: '#0058A3',
										border: '3px solid #2B2B2B',
										borderRadius: 18,
										padding: '12px 16px',
										textAlign: 'center',
									}}
								>
									<div
										style={{
											fontSize: 18,
											fontWeight: 900,
											letterSpacing: 2,
											color: '#FAFAF7',
										}}
									>
										MOD-B
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${bottomIn}) translateY(${footerFloat}px)`,
						backgroundColor: '#0058A3',
						border: '3px solid #2B2B2B',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 20px rgba(43,43,43,0.12)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
							textTransform: 'uppercase',
							color: '#FAFAF7',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}