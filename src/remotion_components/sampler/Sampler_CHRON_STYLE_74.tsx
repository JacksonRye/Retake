import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_74() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 12,
			stiffness: 230,
			mass: 0.62,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.52,
		},
	});

	const takeawayEntrance = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 12,
			stiffness: 210,
			mass: 0.6,
		},
	});

	// Beat 2: Dot-matrix print / active state
	const metricReveal = Math.round(interpolate(frame, [18, 62], [0, 14], clamp));
	const fullMetric = '50% COMMISSION';
	const metricText = fullMetric.slice(0, metricReveal);

	const printFlash = interpolate(frame, [18, 24, 30], [0.25, 1, 0.25], clamp);
	const reelSpin = interpolate(frame, [10, 45], [0, 360], clamp);

	const cursorVisible = frame >= 26 && frame <= 82;
	const cursorX = interpolate(frame, [26, 38, 49, 60], [220, 110, 110, 0], clamp);
	const cursorY = interpolate(frame, [26, 38, 49, 60], [80, 80, 148, 148], clamp);

	const isPressingTop = frame >= 39 && frame <= 46;
	const isPressingBottom = frame >= 50 && frame <= 58;
	const cardPress =
		(isPressingTop || isPressingBottom) ? 8 : 0;
	const shadowBase =
		(isPressingTop || isPressingBottom) ? 10 : 18;

	// Beat 3: Continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const shadowPulse = shadowBase + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 16) % 70, [0, 70], [-260, 980], clamp);
	const tapeDrift = Math.sin(frame * 0.1) * 3;

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -50],
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
				backgroundColor: '#D9CDB8',
				opacity,
				fontFamily:
					'"SFMono-Regular","Roboto Mono","Menlo","Consolas","Liberation Mono",monospace',
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
					padding: '56px 18px 46px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
						backgroundColor: '#D9CDB8',
						border: '4px solid #2B2620',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow:
							'0 8px 0 #7A6A55, 0 14px 24px rgba(43,38,32,0.18)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 2,
							backgroundColor: '#FFB000',
							border: '2px solid #2B2620',
						}}
					/>
					<div
						style={{
							color: '#7A6A55',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						ACTIVATION CODE
					</div>
				</div>

				{/* Tier 2: Hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '24px 0',
						transform: `scale(${entrance}) translateY(${hoverY + cardPress}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#2B2620',
							border: '5px solid #7A6A55',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '30px 34px 34px',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 0 #7A6A55, 0 ${shadowPulse + 14}px 36px rgba(43,38,32,0.28)`,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 22,
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
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.10), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top machine strip */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 18,
								height: 74,
								flexShrink: 0,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 14,
									backgroundColor: '#D9CDB8',
									border: '3px solid #7A6A55',
									borderRadius: 14,
									padding: '10px 16px',
									boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.35)',
								}}
							>
								<div
									style={{
										width: 18,
										height: 18,
										borderRadius: '50%',
										backgroundColor: '#E86A33',
										border: '2px solid #2B2620',
									}}
								/>
								<div
									style={{
										color: '#7A6A55',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									Auto Run
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 18,
								}}
							>
								<div
									style={{
										width: 52,
										height: 52,
										borderRadius: '50%',
										border: '4px solid #7A6A55',
										backgroundColor: '#D9CDB8',
										position: 'relative',
										transform: `rotate(${reelSpin}deg) translateY(${tapeDrift}px)`,
										boxShadow: 'inset 0 0 0 6px #B9A88F',
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: '50%',
											width: 10,
											height: 10,
											marginLeft: -5,
											marginTop: -5,
											borderRadius: '50%',
											backgroundColor: '#2B2620',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: 6,
											width: 4,
											height: 12,
											marginLeft: -2,
											backgroundColor: '#7A6A55',
											borderRadius: 2,
										}}
									/>
								</div>

								<div
									style={{
										width: 52,
										height: 52,
										borderRadius: '50%',
										border: '4px solid #7A6A55',
										backgroundColor: '#D9CDB8',
										position: 'relative',
										transform: `rotate(${-reelSpin}deg) translateY(${-tapeDrift}px)`,
										boxShadow: 'inset 0 0 0 6px #B9A88F',
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: '50%',
											width: 10,
											height: 10,
											marginLeft: -5,
											marginTop: -5,
											borderRadius: '50%',
											backgroundColor: '#2B2620',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: 6,
											width: 4,
											height: 12,
											marginLeft: -2,
											backgroundColor: '#7A6A55',
											borderRadius: 2,
										}}
									/>
								</div>
							</div>
						</div>

						{/* headline block */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexShrink: 0,
								padding: '6px 8px 0',
							}}
						>
							<div
								style={{
									color: '#D9CDB8',
									fontSize: 76,
									fontWeight: 1000,
									letterSpacing: -2,
									lineHeight: 1.02,
									textAlign: 'center',
									textTransform: 'uppercase',
									maxWidth: '92%',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* metric display */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '0 12px',
								flexShrink: 0,
							}}
						>
							<div
								style={{
									width: '88%',
									maxWidth: 760,
									backgroundColor: '#D9CDB8',
									border: '4px solid #FFB000',
									borderRadius: 24,
									padding: '26px 26px 22px',
									boxShadow:
										'0 0 0 4px rgba(255,176,0,0.14), inset 0 3px 0 rgba(255,255,255,0.35)',
									position: 'relative',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 12,
								}}
							>
								<div
									style={{
										color: '#7A6A55',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 4,
										textTransform: 'uppercase',
									}}
								>
									Dot Matrix Output
								</div>

								<div
									style={{
										minHeight: 92,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '0 12px',
										borderRadius: 14,
										backgroundColor: '#EFE5D3',
										border: '3px solid #7A6A55',
										width: '100%',
										boxSizing: 'border-box',
										boxShadow: `inset 0 0 0 2px rgba(122,106,85,0.12), 0 0 18px rgba(255,176,0,${printFlash * 0.22})`,
									}}
								>
									<div
										style={{
											color: '#E86A33',
											fontSize: 62,
											fontWeight: 1000,
											letterSpacing: 1,
											lineHeight: 1,
											textAlign: 'center',
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
										<span
											style={{
												opacity: frame % 14 < 7 ? 1 : 0.15,
												color: '#7A6A55',
											}}
										>
											_
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* bottom controls */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 24,
								paddingBottom: 2,
								flexShrink: 0,
							}}
						>
							<div
								style={{
									backgroundColor: '#FFB000',
									color: '#2B2620',
									border: '3px solid #2B2620',
									borderRadius: 14,
									padding: isPressingTop ? '12px 28px 8px' : '10px 28px',
									boxShadow: isPressingTop
										? 'inset 0 4px 0 rgba(43,38,32,0.2)'
										: '0 6px 0 #A87700',
									fontSize: 20,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									minWidth: 150,
									textAlign: 'center',
								}}
							>
								Engage
							</div>

							<div
								style={{
									backgroundColor: '#E86A33',
									color: '#F8EEDF',
									border: '3px solid #2B2620',
									borderRadius: 14,
									padding: isPressingBottom ? '12px 28px 8px' : '10px 28px',
									boxShadow: isPressingBottom
										? 'inset 0 4px 0 rgba(43,38,32,0.22)'
										: '0 6px 0 #9E431B',
									fontSize: 20,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									minWidth: 150,
									textAlign: 'center',
								}}
							>
								Confirm
							</div>
						</div>
					</div>

					{/* clunky cursor jumps - positioned safely away from all text */}
					{cursorVisible && (
						<div
							style={{
								position: 'absolute',
								right: '14%',
								bottom: '12%',
								transform: `translate(${cursorX}px, ${cursorY}px) scale(${isPressingTop || isPressingBottom ? 0.88 : 1})`,
								zIndex: 25,
								pointerEvents: 'none',
							}}
						>
							<svg
								width="62"
								height="62"
								viewBox="0 0 24 24"
								fill="#FFB000"
								stroke="#2B2620"
								strokeWidth="1.7"
							>
								<path d="M4 3l7.3 16.9 2.4-6.6 6.7-2.4z" />
							</svg>
						</div>
					)}
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#7A6A55',
						border: '4px solid #2B2620',
						borderRadius: 18,
						padding: '16px 34px',
						boxShadow: '0 8px 0 #5F5343, 0 16px 24px rgba(43,38,32,0.18)',
						textAlign: 'center',
						maxWidth: '92%',
					}}
				>
					<div
						style={{
							color: '#F5E9D5',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2,
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