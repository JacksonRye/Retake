import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_27() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1: SNAPPY ENTRANCE
	// ==========================================
	const masterIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.62},
	});

	const badgeIn = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.52},
	});

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	const footerIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 13, stiffness: 200, mass: 0.7},
	});

	// ==========================================
	// BEAT 2: ACTIVE STATE SWITCH / MESSAGE BUILD
	// ==========================================
	const msg1Scale = spring({
		frame: frame - 12,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.6},
	});

	const msg2Scale = spring({
		frame: frame - 24,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.6},
	});

	const metricScale = spring({
		frame: frame - 42,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.58},
	});

	const tapbackBurst = spring({
		frame: frame - 54,
		fps,
		config: {damping: 9, stiffness: 300, mass: 0.48},
	});

	const dotPulseA = 0.4 + 0.6 * ((Math.sin(frame * 0.24) + 1) / 2);
	const dotPulseB = 0.4 + 0.6 * ((Math.sin(frame * 0.24 + 0.7) + 1) / 2);
	const dotPulseC = 0.4 + 0.6 * ((Math.sin(frame * 0.24 + 1.4) + 1) / 2);

	const screenshotFlash = interpolate(frame, [58, 61, 66], [0, 0.7, 0], clamp);

	// ==========================================
	// BEAT 3: CONTINUOUS LIVING LOOP
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-260, 980], clamp);

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

	const tapbackOpacity = interpolate(frame, [54, 58, 84], [0, 1, 1], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#111418',
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
				opacity,
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
					padding: '52px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#3A3A3C',
						border: '2px solid #0A84FF',
						borderRadius: 18,
						padding: '12px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#FF375F',
						}}
					/>
					<div
						style={{
							color: '#F2F2F7',
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: 2.4,
							textTransform: 'uppercase',
						}}
					>
						Leaked Screenshots
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
						margin: '20px 0 18px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#F2F2F7',
							borderRadius: 36,
							border: '4px solid #3A3A3C',
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.45)`,
							padding: '28px 28px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
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
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* screenshot flash */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundColor: `rgba(255,255,255,${screenshotFlash})`,
								pointerEvents: 'none',
							}}
						/>

						{/* phone top bar */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '2px 6px 10px',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#3A3A3C',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 0.2,
								}}
							>
								9:41
							</div>

							<div
								style={{
									backgroundColor: '#111418',
									borderRadius: 999,
									width: 124,
									height: 28,
								}}
							/>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 6,
								}}
							>
								<div
									style={{
										width: 18,
										height: 10,
										border: '2px solid #111418',
										borderRadius: 2,
										position: 'relative',
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: 1,
											left: 1,
											bottom: 1,
											width: 11,
											backgroundColor: '#111418',
											borderRadius: 1,
										}}
									/>
								</div>
								<div
									style={{
										width: 18,
										height: 12,
										display: 'flex',
										alignItems: 'flex-end',
										gap: 2,
									}}
								>
									<div style={{width: 3, height: 4, backgroundColor: '#111418', borderRadius: 2}} />
									<div style={{width: 3, height: 6, backgroundColor: '#111418', borderRadius: 2}} />
									<div style={{width: 3, height: 8, backgroundColor: '#111418', borderRadius: 2}} />
									<div style={{width: 3, height: 10, backgroundColor: '#111418', borderRadius: 2}} />
								</div>
							</div>
						</div>

						{/* header */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 8,
								marginTop: 4,
								marginBottom: 10,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#3A3A3C',
									fontSize: 14,
									fontWeight: 700,
									letterSpacing: 1.2,
									textTransform: 'uppercase',
								}}
							>
								Group Chat
							</div>
							<div
								style={{
									color: '#111418',
									fontSize: 60,
									fontWeight: 900,
									letterSpacing: -1.4,
									lineHeight: 1.02,
									textTransform: 'uppercase',
									textAlign: 'center',
									maxWidth: '88%',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* messages region */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								gap: 18,
								padding: '8px 10px',
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* incoming label */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-start',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start',
										gap: 6,
										maxWidth: '76%',
										transform: `scale(${msg1Scale})`,
										transformOrigin: 'left center',
									}}
								>
									<div
										style={{
											color: '#3A3A3C',
											fontSize: 13,
											fontWeight: 800,
											letterSpacing: 1.3,
											textTransform: 'uppercase',
											paddingLeft: 10,
										}}
									>
										CONTACT
									</div>
									<div
										style={{
											backgroundColor: '#E5E5EA',
											borderRadius: 26,
											padding: '18px 22px',
											minHeight: 78,
											display: 'flex',
											alignItems: 'center',
											boxSizing: 'border-box',
											boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
										}}
									>
										<div
											style={{
												color: '#111418',
												fontSize: 34,
												fontWeight: 800,
												lineHeight: 1.08,
												letterSpacing: -0.5,
											}}
										>
											margin engine is live
										</div>
									</div>
									<div
										style={{
											color: '#8E8E93',
											fontSize: 12,
											fontWeight: 700,
											paddingLeft: 10,
										}}
									>
										Delivered
									</div>
								</div>
							</div>

							{/* outgoing metric bubble */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-end',
										gap: 8,
										maxWidth: '78%',
										transform: `scale(${Math.max(msg2Scale, metricScale)})`,
										transformOrigin: 'right center',
										position: 'relative',
									}}
								>
									<div
										style={{
											backgroundColor: '#0A84FF',
											borderRadius: 30,
											padding: '22px 24px 20px',
											minHeight: 118,
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'flex-end',
											boxSizing: 'border-box',
											boxShadow: '0 10px 24px rgba(10,132,255,0.28)',
											position: 'relative',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												color: '#F2F2F7',
												fontSize: 18,
												fontWeight: 800,
												letterSpacing: 1.2,
												textTransform: 'uppercase',
												marginBottom: 8,
											}}
										>
											Screenshot
										</div>
										<div
											style={{
												color: '#FFFFFF',
												fontSize: 66,
												fontWeight: 900,
												lineHeight: 0.95,
												letterSpacing: -2,
												textAlign: 'right',
												whiteSpace: 'nowrap',
											}}
										>
											50%
										</div>
										<div
											style={{
												color: '#DDEBFF',
												fontSize: 24,
												fontWeight: 800,
												letterSpacing: 1.1,
												textTransform: 'uppercase',
												marginTop: 8,
											}}
										>
											Commission
										</div>
									</div>

									<div
										style={{
											color: '#8E8E93',
											fontSize: 12,
											fontWeight: 700,
										}}
									>
										Read 9:41
									</div>

									{/* tapback burst kept outside text area */}
									<div
										style={{
											position: 'absolute',
											right: -6,
											top: -16,
											width: 86,
											height: 86,
											opacity: tapbackOpacity,
											pointerEvents: 'none',
										}}
									>
										<div
											style={{
												position: 'absolute',
												inset: 0,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												transform: `scale(${tapbackBurst})`,
											}}
										>
											<div
												style={{
													width: 58,
													height: 58,
													borderRadius: '50%',
													backgroundColor: '#FF375F',
													boxShadow: '0 10px 20px rgba(255,55,95,0.28)',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<svg width="28" height="28" viewBox="0 0 24 24" fill="#F2F2F7">
													<path d="M12 21s-6.7-4.35-9.33-8.06C.76 10.27 1.2 6.57 4.3 4.67c2.15-1.31 4.71-.78 6.2.94 1.49-1.72 4.05-2.25 6.2-.94 3.1 1.9 3.54 5.6 1.63 8.27C18.7 16.65 12 21 12 21z" />
												</svg>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* typing indicator */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-start',
									marginTop: 2,
								}}
							>
								<div
									style={{
										backgroundColor: '#E5E5EA',
										borderRadius: 24,
										padding: '16px 18px',
										display: 'flex',
										alignItems: 'center',
										gap: 8,
										boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
										transform: `scale(${interpolate(frame, [70, 82], [0, 1], clamp)})`,
										transformOrigin: 'left center',
									}}
								>
									<div
										style={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											backgroundColor: '#8E8E93',
											opacity: dotPulseA,
										}}
									/>
									<div
										style={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											backgroundColor: '#8E8E93',
											opacity: dotPulseB,
										}}
									/>
									<div
										style={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											backgroundColor: '#8E8E93',
											opacity: dotPulseC,
										}}
									/>
								</div>
							</div>
						</div>

						{/* bottom input bar */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								marginTop: 14,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									width: 34,
									height: 34,
									borderRadius: '50%',
									backgroundColor: '#0A84FF',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										width: 14,
										height: 14,
										borderRadius: '50%',
										border: '3px solid #F2F2F7',
									}}
								/>
							</div>

							<div
								style={{
									flex: 1,
									height: 54,
									borderRadius: 27,
									backgroundColor: '#FFFFFF',
									border: '2px solid #D1D1D6',
									display: 'flex',
									alignItems: 'center',
									padding: '0 18px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										color: '#8E8E93',
										fontSize: 18,
										fontWeight: 600,
									}}
								>
									iMessage
								</div>
							</div>

							<div
								style={{
									width: 34,
									height: 34,
									borderRadius: '50%',
									backgroundColor: '#FF375F',
									flexShrink: 0,
								}}
							/>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${footerIn}) translateY(${footerFloat}px)`,
						backgroundColor: '#FF375F',
						borderRadius: 20,
						padding: '16px 28px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F2F2F7',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 1.8,
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