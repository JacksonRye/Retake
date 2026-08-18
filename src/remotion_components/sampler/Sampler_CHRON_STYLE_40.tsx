import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_40() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// -----------------------------
	// Beat 1: Snappy entrance
	// -----------------------------
	const heroEntrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.58},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.52},
	});

	const takeawayEntrance = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// -----------------------------
	// Beat 2: State / metric activation
	// -----------------------------
	const metricReveal = interpolate(frame, [18, 34], [0, 1], clamp);
	const metricWipe = interpolate(frame, [24, 52], [0, 1], clamp);
	const commissionCount = Math.round(interpolate(frame, [18, 52], [12, 50], clamp));

	// VHS / tracking behavior
	const trackingJitterX =
		Math.sin(frame * 0.9) * 1.5 +
		Math.sin(frame * 2.8) * 0.6 +
		(frame >= 63 && frame <= 70 ? Math.sin(frame * 18) * 3.5 : 0);

	const trackingJitterY =
		Math.sin(frame * 1.15) * 0.9 +
		(frame >= 63 && frame <= 70 ? Math.cos(frame * 22) * 2.2 : 0);

	const pauseDistort =
		frame >= 63 && frame <= 70
			? interpolate(frame, [63, 66, 70], [0, 1, 0], clamp)
			: 0;

	const rewindStreakOpacity =
		frame >= 82 && frame <= 98
			? interpolate(frame, [82, 88, 98], [0, 0.65, 0], clamp)
			: 0;

	// -----------------------------
	// Beat 3: Continuous living motion
	// -----------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shineOffset = interpolate((frame + 20) % 70, [0, 70], [-240, 960], clamp);
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;

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

	// Timestamp
	const timeSeconds = frame / fps;
	const sec = Math.floor(timeSeconds);
	const ff = Math.floor((timeSeconds % 1) * fps);
	const ts = `00:00:${String(sec).padStart(2, '0')}:${String(ff).padStart(2, '0')}`;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#101010',
				opacity,
				fontFamily:
					'"Courier New", "Lucida Console", "SFMono-Regular", "Menlo", monospace',
				color: '#F2F2F2',
				overflow: 'hidden',
			}}
		>
			{/* Full-frame VHS noise layers */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at 50% 20%, rgba(255,255,255,0.05), transparent 45%)',
					opacity: 0.5,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: interpolate(frame % 45, [0, 44], [-24, 820], clamp),
					height: 32,
					background:
						'linear-gradient(180deg, rgba(65,227,255,0.00), rgba(65,227,255,0.18), rgba(255,79,216,0.10), rgba(65,227,255,0.00))',
					opacity: 0.55,
					pointerEvents: 'none',
					mixBlendMode: 'screen',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 58 + Math.sin(frame * 0.25) * 3,
					height: 18,
					background:
						'linear-gradient(90deg, rgba(255,79,216,0.00), rgba(255,79,216,0.22), rgba(65,227,255,0.15), rgba(255,79,216,0.00))',
					opacity: 0.35 + pauseDistort * 0.45,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					top: 18,
					left: 22,
					padding: '6px 12px',
					border: '2px solid rgba(242,242,242,0.55)',
					backgroundColor: 'rgba(16,16,16,0.8)',
					fontSize: 18,
					fontWeight: 700,
					letterSpacing: 1.5,
					color: '#F2F2F2',
					zIndex: 20,
					transform: `translate(${Math.sin(frame * 1.7) * 0.8}px, ${Math.cos(
						frame * 1.2
					) * 0.5}px)`,
				}}
			>
				REC ● {ts}
			</div>

			<div
				style={{
					position: 'absolute',
					top: 22,
					right: 24,
					fontSize: 20,
					fontWeight: 700,
					letterSpacing: 2,
					color: '#41E3FF',
					opacity: 0.85,
					zIndex: 20,
				}}
			>
				TRACKING AUTO
			</div>

			<div
				style={{
					width: '94%',
					height: '88%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '68px 20px 34px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px) translateX(${trackingJitterX}px) translateY(${trackingJitterY}px)`,
					position: 'relative',
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) rotate(${
							Math.sin(frame * 0.09) * 1.2
						}deg) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#101010',
						border: '3px solid #41E3FF',
						borderRadius: 14,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
						zIndex: 5,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#FF4FD8',
							boxShadow: '0 0 10px rgba(255,79,216,0.6)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							color: '#F2F2F2',
							letterSpacing: 3,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						VHS PROFIT SIGNAL
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
						margin: '22px 0',
						position: 'relative',
						transform: `scale(${heroEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#FFB36B',
							border: '4px solid #F2F2F2',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.58)`,
							padding: '42px 40px 36px 40px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'stretch',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Burned-in streak / shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 170,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0.0), rgba(242,242,242,0.3), rgba(65,227,255,0.16), rgba(255,255,255,0.0))',
								transform: `translateX(${shineOffset}px) skewX(-24deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Rewind streaks */}
						<div
							style={{
								position: 'absolute',
								left: -80,
								right: -80,
								top: 168,
								height: 92,
								background:
									'linear-gradient(90deg, rgba(255,79,216,0.00), rgba(255,79,216,0.14), rgba(65,227,255,0.22), rgba(255,79,216,0.00))',
								opacity: rewindStreakOpacity,
								filter: 'blur(8px)',
								transform: `translateX(${Math.sin(frame * 1.4) * 14}px)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top timestamp row */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 8,
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 2,
									color: '#101010',
									opacity: 0.85,
								}}
							>
								SP // ARCHIVE-04
							</div>
							<div
								style={{
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 2,
									color: '#101010',
									opacity: 0.85,
								}}
							>
								{ts}
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								textAlign: 'center',
								padding: '10px 10px 0 10px',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.6,
									color: '#101010',
									textTransform: 'uppercase',
									textShadow:
										pauseDistort > 0
											? `2px 0 #41E3FF, -2px 0 #FF4FD8`
											: 'none',
								}}
							>
								AUTOMATED
							</div>
							<div
								style={{
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.6,
									color: '#101010',
									textTransform: 'uppercase',
									textShadow:
										pauseDistort > 0
											? `2px 0 #41E3FF, -2px 0 #FF4FD8`
											: 'none',
								}}
							>
								MARGINS
							</div>
						</div>

						{/* Metric zone */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								padding: '8px 0',
								zIndex: 2,
							}}
						>
							<div
								style={{
									position: 'relative',
									width: '76%',
									maxWidth: 620,
									minHeight: 152,
									backgroundColor: '#101010',
									border: '3px solid #FF4FD8',
									borderRadius: 24,
									boxShadow: '0 10px 26px rgba(0,0,0,0.35)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										top: 0,
										bottom: 0,
										width: `${metricWipe * 100}%`,
										background:
											'linear-gradient(90deg, rgba(65,227,255,0.18), rgba(255,79,216,0.08))',
										opacity: 0.9,
									}}
								/>
								<div
									style={{
										position: 'absolute',
										top: 14,
										left: 18,
										fontSize: 16,
										fontWeight: 800,
										letterSpacing: 2,
										color: '#41E3FF',
										opacity: 0.92,
									}}
								>
									PLAY ▷ METRIC
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 18,
										transform: `scale(${0.84 + metricReveal * 0.16})`,
										zIndex: 2,
										paddingTop: 12,
									}}
								>
									<div
										style={{
											fontSize: 82,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: -2,
											color: '#F2F2F2',
											textShadow:
												pauseDistort > 0
													? `2px 0 #41E3FF, -2px 0 #FF4FD8`
													: '0 0 10px rgba(242,242,242,0.08)',
											minWidth: 180,
											textAlign: 'right',
										}}
									>
										{commissionCount}%
									</div>
									<div
										style={{
											fontSize: 34,
											fontWeight: 900,
											lineHeight: 1.05,
											letterSpacing: 1,
											color: '#FF4FD8',
											textTransform: 'uppercase',
											textAlign: 'left',
										}}
									>
										<div>COMMISSION</div>
									</div>
								</div>
							</div>

							<div
								style={{
									fontSize: 24,
									fontWeight: 800,
									letterSpacing: 2.2,
									color: '#101010',
									textTransform: 'uppercase',
									opacity: 0.86,
									textAlign: 'center',
								}}
							>
								tape-label: recurring digital upside
							</div>
						</div>

						{/* Bottom info strip */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 20,
								zIndex: 2,
								paddingTop: 8,
							}}
						>
							<div
								style={{
									backgroundColor: '#41E3FF',
									color: '#101010',
									borderRadius: 12,
									padding: '10px 18px',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								HEAD-SWITCH STABLE
							</div>
							<div
								style={{
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 2,
									color: '#101010',
									opacity: 0.82,
									whiteSpace: 'nowrap',
								}}
							>
								CH-40 / NO DROP
							</div>
						</div>

						{/* VHS scan lines */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'repeating-linear-gradient(180deg, rgba(16,16,16,0.00) 0px, rgba(16,16,16,0.00) 6px, rgba(16,16,16,0.08) 7px, rgba(16,16,16,0.08) 8px)',
								opacity: 0.45,
								pointerEvents: 'none',
							}}
						/>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${
							Math.sin(frame * 0.12 + 1) * 3
						}px) rotate(${Math.sin(frame * 0.07) * 1.1}deg)`,
						backgroundColor: '#FF4FD8',
						border: '3px solid #F2F2F2',
						borderRadius: 18,
						padding: '16px 34px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#101010',
							fontSize: 24,
							fontWeight: 1000,
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