import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_32() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const entrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.5},
	});

	const cardEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Active transformation
	const commissionValue = Math.round(interpolate(frame, [16, 58], [18, 50], clamp));
	const slashGrow = interpolate(frame, [34, 48], [0, 1], clamp);
	const cartBounce = spring({
		frame: frame - 42,
		fps,
		config: {damping: 8, stiffness: 260, mass: 0.6},
	});
	const reviewCardPop = spring({
		frame: frame - 24,
		fps,
		config: {damping: 12, stiffness: 190, mass: 0.8},
	});

	// Star fill sweep
	const starSweep = interpolate(frame, [18, 54], [0, 1], clamp);

	// Beat 3: Living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 70, [0, 70], [-260, 980], clamp);

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -60],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const starPath =
		'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFFFFF',
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
					padding: '34px 18px 28px 18px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#FFFFFF',
						border: '3px solid #007185',
						boxShadow: '0 10px 24px rgba(0,0,0,0.10)',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#FFA41C',
						}}
					/>
					<div
						style={{
							color: '#0F1111',
							fontSize: 19,
							fontWeight: 900,
							letterSpacing: 2.4,
							textTransform: 'uppercase',
						}}
					>
						32 FIVE STARS
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
						margin: '20px 0',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#FFFFFF',
							border: '5px solid #007185',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.16)`,
							padding: '34px 34px 28px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							position: 'relative',
							overflow: 'hidden',
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
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,164,28,0.18) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Header row */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'flex-start',
								justifyContent: 'space-between',
								gap: 26,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									flex: 1,
									minWidth: 0,
									display: 'flex',
									flexDirection: 'column',
									gap: 14,
								}}
							>
								<div
									style={{
										color: '#0F1111',
										fontSize: 68,
										fontWeight: 1000,
										lineHeight: 0.98,
										letterSpacing: -2,
										textTransform: 'uppercase',
										maxWidth: 560,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 12,
										height: 34,
									}}
								>
									<div
										style={{
											position: 'relative',
											width: 172,
											height: 30,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}
									>
										{new Array(5).fill(true).map((_, i) => {
											const fillProgress = interpolate(
												starSweep,
												[i * 0.16, i * 0.16 + 0.22],
												[0, 1],
												clamp
											);

											return (
												<div
													key={i}
													style={{
														position: 'relative',
														width: 28,
														height: 28,
													}}
												>
													<svg
														viewBox="0 0 24 24"
														width="28"
														height="28"
														style={{
															position: 'absolute',
															inset: 0,
														}}
													>
														<path d={starPath} fill="#E7E7E7" />
													</svg>
													<div
														style={{
															position: 'absolute',
															inset: 0,
															overflow: 'hidden',
															width: `${fillProgress * 100}%`,
														}}
													>
														<svg viewBox="0 0 24 24" width="28" height="28">
															<path d={starPath} fill="#FFA41C" />
														</svg>
													</div>
												</div>
											);
										})}
									</div>

									<div
										style={{
											color: '#007185',
											fontSize: 18,
											fontWeight: 700,
											lineHeight: 1,
											letterSpacing: 0,
										}}
									>
										32 ratings
									</div>
								</div>
							</div>

							{/* Review card */}
							<div
								style={{
									width: 246,
									flexShrink: 0,
									backgroundColor: '#F7FBFB',
									border: '3px solid #007185',
									borderRadius: 22,
									padding: '18px 18px 16px 18px',
									boxSizing: 'border-box',
									transform: `scale(${reviewCardPop}) translateY(${Math.sin(frame * 0.12 + 1.4) * 4}px)`,
									boxShadow: '0 10px 22px rgba(0,0,0,0.10)',
									display: 'flex',
									flexDirection: 'column',
									gap: 10,
								}}
							>
								<div
									style={{
										color: '#0F1111',
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
									}}
								>
									Review Snapshot
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										gap: 8,
									}}
								>
									<div
										style={{
											color: '#0F1111',
											fontSize: 38,
											fontWeight: 1000,
											lineHeight: 1,
										}}
									>
										5.0
									</div>
									<div
										style={{
											color: '#CC0C39',
											fontSize: 15,
											fontWeight: 800,
										}}
									>
										top-tier
									</div>
								</div>

								<div
									style={{
										height: 8,
										width: '100%',
										borderRadius: 999,
										backgroundColor: '#D8EDEE',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											height: '100%',
											width: '94%',
											borderRadius: 999,
											backgroundColor: '#FFA41C',
										}}
									/>
								</div>

								<div
									style={{
										color: '#007185',
										fontSize: 13,
										fontWeight: 700,
										lineHeight: 1.25,
									}}
								>
									High-conversion offer structure
								</div>
							</div>
						</div>

						{/* Price / commission block */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								position: 'relative',
								zIndex: 2,
								marginTop: 10,
								marginBottom: 10,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'flex-end',
									justifyContent: 'center',
									gap: 20,
									minHeight: 122,
								}}
							>
								<div
									style={{
										position: 'relative',
										color: '#0F1111',
										fontSize: 46,
										fontWeight: 800,
										lineHeight: 1,
										padding: '0 8px',
									}}
								>
									30%
									<div
										style={{
											position: 'absolute',
											left: 0,
											top: '50%',
											height: 6,
											width: `${slashGrow * 100}%`,
											backgroundColor: '#CC0C39',
											borderRadius: 99,
											transform: 'translateY(-50%) rotate(-10deg)',
											transformOrigin: 'left center',
										}}
									/>
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 10,
										backgroundColor: '#FFF7E8',
										border: '4px solid #FFA41C',
										borderRadius: 26,
										padding: '18px 28px 16px 28px',
										boxShadow: '0 10px 24px rgba(255,164,28,0.22)',
									}}
								>
									<div
										style={{
											color: '#0F1111',
											fontSize: 82,
											fontWeight: 1000,
											lineHeight: 0.92,
											letterSpacing: -3,
										}}
									>
										{commissionValue}%
									</div>
									<div
										style={{
											color: '#CC0C39',
											fontSize: 28,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: 1.5,
											textTransform: 'uppercase',
											paddingBottom: 10,
										}}
									>
										Commission
									</div>
								</div>
							</div>

							<div
								style={{
									color: '#007185',
									fontSize: 20,
									fontWeight: 800,
									letterSpacing: 1.6,
									textTransform: 'uppercase',
								}}
							>
								50% COMMISSION
							</div>
						</div>

						{/* Bottom product action area */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 22,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									flex: 1,
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
								}}
							>
								<div
									style={{
										color: '#0F1111',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
									}}
								>
									Listing economics
								</div>
								<div
									style={{
										color: '#007185',
										fontSize: 14,
										fontWeight: 700,
										lineHeight: 1.3,
										maxWidth: 460,
									}}
								>
									Software-driven distribution with premium payout structure.
								</div>
							</div>

							<div
								style={{
									transform: `scale(${0.92 + cartBounce * 0.08}) translateY(${-(cartBounce - 1) * 8}px)`,
									backgroundColor: '#FFA41C',
									border: '3px solid #0F1111',
									borderRadius: 999,
									padding: '16px 28px',
									boxShadow: '0 10px 18px rgba(0,0,0,0.14)',
									display: 'flex',
									alignItems: 'center',
									gap: 12,
									flexShrink: 0,
								}}
							>
								<div
									style={{
										width: 16,
										height: 16,
										borderRadius: 999,
										backgroundColor: '#0F1111',
									}}
								/>
								<div
									style={{
										color: '#0F1111',
										fontSize: 24,
										fontWeight: 1000,
										letterSpacing: 1.4,
										textTransform: 'uppercase',
										lineHeight: 1,
									}}
								>
									Add to Cart
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#0F1111',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FFFFFF',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}