import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_22() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const takeawayEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// Beat 2: Active metric transformation
	const metricReveal = interpolate(frame, [14, 56], [0, 1], clamp);
	const commissionValue = Math.round(interpolate(frame, [15, 52], [12, 50], clamp));
	const metricText = `${commissionValue}% COMMISSION`;

	const gaugeSweep = interpolate(frame, [18, 60], [0.08, 0.98], clamp);
	const pulseOn = frame >= 44 && frame <= 52;
	const cardThunk = pulseOn ? 10 : 0;
	const liveDotScale = pulseOn ? 1.35 : 1;

	// Beat 3: Continuous living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 68, [0, 68], [-220, 920], clamp);

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

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0A0F1E',
				opacity,
				fontFamily:
					'"Arial Narrow", "Avenir Next Condensed", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					padding: '44px 16px 34px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '12px 24px',
						border: '2px solid rgba(125, 211, 252, 0.55)',
						borderRadius: 18,
						backgroundColor: 'rgba(10, 15, 30, 0.82)',
						boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
						backdropFilter: 'blur(2px)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#F43F5E',
							transform: `scale(${liveDotScale})`,
							boxShadow: '0 0 12px rgba(244, 63, 94, 0.8)',
						}}
					/>
					<div
						style={{
							color: '#7DD3FC',
							fontSize: 19,
							fontWeight: 800,
							letterSpacing: 3.2,
							textTransform: 'uppercase',
							fontVariant: 'small-caps',
							whiteSpace: 'nowrap',
						}}
					>
						night drive hud
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
						margin: '20px 0 18px',
						transform: `scale(${cardEntrance}) translateY(${hoverY + cardThunk}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							borderRadius: 34,
							backgroundColor: 'rgba(229, 231, 235, 0.08)',
							border: '3px solid rgba(229, 231, 235, 0.88)',
							boxShadow: `0 ${shadowPulse}px 36px rgba(0,0,0,0.45)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateRows: '76px 1fr 84px',
							gap: 18,
						}}
					>
						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(125,211,252,0.16), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Decorative HUD frame lines - collision free, edge only */}
						<div
							style={{
								position: 'absolute',
								inset: 16,
								border: '1px solid rgba(125, 211, 252, 0.22)',
								borderRadius: 24,
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 28,
								left: 28,
								width: 72,
								height: 18,
								borderTop: '2px solid #7DD3FC',
								borderLeft: '2px solid #7DD3FC',
								opacity: 0.85,
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 28,
								right: 28,
								width: 72,
								height: 18,
								borderTop: '2px solid #7DD3FC',
								borderRight: '2px solid #7DD3FC',
								opacity: 0.85,
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 28,
								left: 28,
								width: 72,
								height: 18,
								borderBottom: '2px solid #7DD3FC',
								borderLeft: '2px solid #7DD3FC',
								opacity: 0.85,
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 28,
								right: 28,
								width: 72,
								height: 18,
								borderBottom: '2px solid #7DD3FC',
								borderRight: '2px solid #7DD3FC',
								opacity: 0.85,
								pointerEvents: 'none',
							}}
						/>

						{/* Top HUD strip */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr auto 1fr',
								alignItems: 'center',
								gap: 18,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									minWidth: 0,
								}}
							>
								<div
									style={{
										width: 34,
										height: 2,
										backgroundColor: '#7DD3FC',
										opacity: 0.85,
									}}
								/>
								<div
									style={{
										color: '#7DD3FC',
										fontSize: 16,
										fontWeight: 700,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									system
								</div>
							</div>

							<div
								style={{
									padding: '8px 16px',
									borderRadius: 999,
									border: '1.5px solid rgba(251, 191, 36, 0.85)',
									backgroundColor: 'rgba(251, 191, 36, 0.12)',
									color: '#FBBF24',
									fontSize: 15,
									fontWeight: 800,
									letterSpacing: 2.8,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								live margin
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
									gap: 10,
									minWidth: 0,
								}}
							>
								<div
									style={{
										color: '#7DD3FC',
										fontSize: 16,
										fontWeight: 700,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									engaged
								</div>
								<div
									style={{
										width: 34,
										height: 2,
										backgroundColor: '#7DD3FC',
										opacity: 0.85,
									}}
								/>
							</div>
						</div>

						{/* Core content */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.25fr 0.85fr',
								gap: 24,
								alignItems: 'stretch',
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* Left main text block */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									padding: '8px 6px 8px 14px',
									minWidth: 0,
								}}
							>
								<div
									style={{
										color: 'rgba(125, 211, 252, 0.82)',
										fontSize: 18,
										fontWeight: 700,
										letterSpacing: 3.4,
										textTransform: 'uppercase',
										marginBottom: 14,
										whiteSpace: 'nowrap',
									}}
								>
									margin automation
								</div>

								<div
									style={{
										color: '#7DD3FC',
										fontSize: 72,
										lineHeight: 0.98,
										fontWeight: 900,
										letterSpacing: -1.6,
										textTransform: 'uppercase',
										maxWidth: 520,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>
							</div>

							{/* Right metric module */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'stretch',
									gap: 16,
									padding: '12px 10px 12px 0',
								}}
							>
								<div
									style={{
										borderRadius: 24,
										border: '2px solid rgba(125, 211, 252, 0.58)',
										backgroundColor: 'rgba(10, 15, 30, 0.72)',
										padding: '18px 18px 20px',
										display: 'flex',
										flexDirection: 'column',
										gap: 14,
										boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
									}}
								>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											gap: 12,
										}}
									>
										<div
											style={{
												color: '#E5E7EB',
												fontSize: 15,
												fontWeight: 700,
												letterSpacing: 2.6,
												textTransform: 'uppercase',
												whiteSpace: 'nowrap',
											}}
										>
											commission
										</div>
										<div
											style={{
												color: '#F43F5E',
												fontSize: 14,
												fontWeight: 800,
												letterSpacing: 2.2,
												textTransform: 'uppercase',
												whiteSpace: 'nowrap',
											}}
										>
											active
										</div>
									</div>

									<div
										style={{
											color: '#FBBF24',
											fontSize: 58,
											lineHeight: 1,
											fontWeight: 900,
											letterSpacing: -0.8,
											whiteSpace: 'nowrap',
											transform: `scale(${0.92 + metricReveal * 0.08})`,
											transformOrigin: 'left center',
										}}
									>
										{metricText}
									</div>

									<div
										style={{
											height: 8,
											borderRadius: 999,
											backgroundColor: 'rgba(229, 231, 235, 0.12)',
											position: 'relative',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												height: '100%',
												width: `${gaugeSweep * 100}%`,
												borderRadius: 999,
												background:
													'linear-gradient(90deg, #7DD3FC 0%, #FBBF24 70%, #F43F5E 100%)',
												boxShadow: '0 0 16px rgba(251, 191, 36, 0.35)',
											}}
										/>
									</div>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											gap: 12,
										}}
									>
										<div
											style={{
												color: 'rgba(229, 231, 235, 0.76)',
												fontSize: 13,
												fontWeight: 700,
												letterSpacing: 2.2,
												textTransform: 'uppercase',
												whiteSpace: 'nowrap',
											}}
										>
											per sale
										</div>
										<div
											style={{
												color: '#7DD3FC',
												fontSize: 13,
												fontWeight: 700,
												letterSpacing: 2.2,
												textTransform: 'uppercase',
												whiteSpace: 'nowrap',
											}}
										>
											optimized
										</div>
									</div>
								</div>

								<div
									style={{
										display: 'grid',
										gridTemplateColumns: '1fr 1fr',
										gap: 12,
									}}
								>
									<div
										style={{
											padding: '12px 14px',
											borderRadius: 18,
											border: '1.5px solid rgba(125, 211, 252, 0.35)',
											backgroundColor: 'rgba(125, 211, 252, 0.06)',
										}}
									>
										<div
											style={{
												color: '#7DD3FC',
												fontSize: 12,
												fontWeight: 700,
												letterSpacing: 2.1,
												textTransform: 'uppercase',
												marginBottom: 6,
											}}
										>
											status
										</div>
										<div
											style={{
												color: '#E5E7EB',
												fontSize: 22,
												fontWeight: 800,
												letterSpacing: 0.5,
												whiteSpace: 'nowrap',
											}}
										>
											auto-on
										</div>
									</div>

									<div
										style={{
											padding: '12px 14px',
											borderRadius: 18,
											border: '1.5px solid rgba(244, 63, 94, 0.35)',
											backgroundColor: 'rgba(244, 63, 94, 0.07)',
										}}
									>
										<div
											style={{
												color: '#F43F5E',
												fontSize: 12,
												fontWeight: 700,
												letterSpacing: 2.1,
												textTransform: 'uppercase',
												marginBottom: 6,
											}}
										>
											mode
										</div>
										<div
											style={{
												color: '#E5E7EB',
												fontSize: 22,
												fontWeight: 800,
												letterSpacing: 0.5,
												whiteSpace: 'nowrap',
											}}
										>
											scaled
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Bottom internal strip */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'auto 1fr auto',
								alignItems: 'center',
								gap: 16,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#F43F5E',
									fontSize: 14,
									fontWeight: 800,
									letterSpacing: 2.6,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								hud sync
							</div>

							<div
								style={{
									height: 1,
									background:
										'linear-gradient(90deg, rgba(125,211,252,0.7), rgba(125,211,252,0.1))',
								}}
							/>

							<div
								style={{
									color: '#E5E7EB',
									fontSize: 14,
									fontWeight: 700,
									letterSpacing: 2.4,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								night active
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway punchline */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						padding: '16px 30px',
						borderRadius: 18,
						border: '2px solid rgba(251, 191, 36, 0.75)',
						backgroundColor: 'rgba(251, 191, 36, 0.12)',
						boxShadow: '0 8px 22px rgba(0,0,0,0.28)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FBBF24',
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 2.6,
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