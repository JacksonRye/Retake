import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_91() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {damping: 13, stiffness: 230, mass: 0.55},
	});

	const takeawayEntrance = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// Beat 2: Active metric roll
	const percentValue = Math.round(interpolate(frame, [14, 62], [12, 50], clamp));
	const metricNumber = `${percentValue}%`;

	const commissionReveal = interpolate(frame, [28, 42], [0, 1], clamp);
	const barGrow = interpolate(frame, [24, 58], [0.12, 1], clamp);
	const ruleSweep = interpolate(frame, [10, 44], [0, 1], clamp);

	// Beat 3: Continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.6;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.11 + 0.8) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-220, 920], clamp);
	const cornerFoldLift = 8 + Math.sin(frame * 0.14) * 3;

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
				backgroundColor: '#FBFAF7',
				opacity,
				fontFamily:
					'"Georgia", "Times New Roman", "Iowan Old Style", "Palatino Linotype", serif',
				color: '#1F3A5F',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					padding: '36px 0 28px 0',
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
						border: '2px solid #1F3A5F',
						borderRadius: 999,
						backgroundColor: 'rgba(251,250,247,0.96)',
						boxShadow: '0 8px 18px rgba(31,58,95,0.08)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: 999,
							backgroundColor: '#B87333',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontFamily:
								'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							color: '#5C6B73',
							whiteSpace: 'nowrap',
						}}
					>
						91 SHAREHOLDER LETTER
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
						margin: '18px 0',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '95%',
							minHeight: 548,
							backgroundColor: '#FBFAF7',
							border: '5px solid #23211D',
							borderRadius: 28,
							boxShadow: `0 ${shadowPulse}px 34px rgba(35,33,29,0.16)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '46px 48px 42px 48px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateRows: 'auto auto 1fr auto',
							rowGap: 22,
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
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(184,115,51,0.10) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Page corner fold */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								right: 0,
								width: 92,
								height: 92,
								pointerEvents: 'none',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 0,
									right: 0,
									width: 0,
									height: 0,
									borderTop: `92px solid rgba(184,115,51,0.18)`,
									borderLeft: '92px solid transparent',
									transform: `translateY(${Math.sin(frame * 0.09) * 1.5}px)`,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 10,
									right: 10,
									width: 0,
									height: 0,
									borderTop: `${cornerFoldLift * 3.2}px solid rgba(35,33,29,0.14)`,
									borderLeft: `${cornerFoldLift * 3.2}px solid transparent`,
								}}
							/>
						</div>

						{/* Top editorial label */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 24,
							}}
						>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 2.4,
									color: '#5C6B73',
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								Annual Report
							</div>

							<div
								style={{
									flex: 1,
									height: 2,
									backgroundColor: 'rgba(31,58,95,0.18)',
									position: 'relative',
									overflow: 'hidden',
									borderRadius: 2,
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										top: 0,
										bottom: 0,
										width: `${ruleSweep * 100}%`,
										backgroundColor: '#B87333',
										borderRadius: 2,
									}}
								/>
							</div>

							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 1.8,
									color: '#1F3A5F',
									fontVariantNumeric: 'tabular-nums',
									whiteSpace: 'nowrap',
								}}
							>
								1991
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								fontSize: 74,
								lineHeight: 0.95,
								fontWeight: 700,
								letterSpacing: -1.6,
								color: '#1F3A5F',
								textAlign: 'center',
								maxWidth: '100%',
								alignSelf: 'center',
								textTransform: 'uppercase',
							}}
						>
							AUTOMATED MARGINS
						</div>

						{/* Metric section */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.15fr 0.85fr',
								columnGap: 28,
								alignItems: 'stretch',
								minHeight: 210,
							}}
						>
							<div
								style={{
									border: '2px solid rgba(31,58,95,0.18)',
									borderRadius: 22,
									padding: '30px 28px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									backgroundColor: 'rgba(251,250,247,0.92)',
								}}
							>
								<div
									style={{
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
										fontSize: 15,
										fontWeight: 700,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										color: '#5C6B73',
									}}
								>
									Commission Rate
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										gap: 12,
										flexWrap: 'nowrap',
									}}
								>
									<div
										style={{
											fontSize: 84,
											lineHeight: 0.92,
											fontWeight: 700,
											color: '#1F3A5F',
											fontVariantNumeric: 'tabular-nums',
											letterSpacing: -2,
											whiteSpace: 'nowrap',
										}}
									>
										{metricNumber}
									</div>
									<div
										style={{
											fontSize: 24,
											lineHeight: 1,
											fontWeight: 600,
											color: '#B87333',
											opacity: commissionReveal,
											transform: `translateY(${interpolate(
												frame,
												[26, 42],
												[12, 0],
												clamp
											)}px)`,
											whiteSpace: 'nowrap',
										}}
									>
										COMMISSION
									</div>
								</div>

								<div
									style={{
										width: '100%',
										height: 18,
										borderRadius: 999,
										backgroundColor: 'rgba(31,58,95,0.10)',
										overflow: 'hidden',
										border: '1px solid rgba(31,58,95,0.08)',
									}}
								>
									<div
										style={{
											width: `${barGrow * 100}%`,
											height: '100%',
											borderRadius: 999,
											background:
												'linear-gradient(90deg, #B87333 0%, #1F3A5F 100%)',
										}}
									/>
								</div>
							</div>

							<div
								style={{
									border: '2px solid rgba(92,107,115,0.22)',
									borderRadius: 22,
									padding: '24px 22px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									backgroundColor: 'rgba(184,115,51,0.06)',
								}}
							>
								<div
									style={{
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
										fontSize: 14,
										fontWeight: 700,
										letterSpacing: 2.1,
										textTransform: 'uppercase',
										color: '#5C6B73',
									}}
								>
									Operating Note
								</div>

								<div
									style={{
										fontSize: 32,
										lineHeight: 1.08,
										fontWeight: 600,
										color: '#1F3A5F',
										letterSpacing: -0.4,
									}}
								>
									High-margin software compounds without matching labor growth.
								</div>

								<div
									style={{
										paddingTop: 12,
										borderTop: '2px solid rgba(31,58,95,0.14)',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 16,
									}}
								>
									<div
										style={{
											fontFamily:
												'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
											fontSize: 13,
											fontWeight: 700,
											letterSpacing: 1.8,
											textTransform: 'uppercase',
											color: '#5C6B73',
										}}
									>
										Scalable economics
									</div>
									<div
										style={{
											width: 52,
											height: 2,
											backgroundColor: '#B87333',
											flexShrink: 0,
										}}
									/>
								</div>
							</div>
						</div>

						{/* Bottom card footnote */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 24,
								borderTop: '2px solid rgba(35,33,29,0.16)',
								paddingTop: 18,
							}}
						>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
									fontSize: 15,
									fontWeight: 700,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									color: '#5C6B73',
									whiteSpace: 'nowrap',
								}}
							>
								Recurring economics
							</div>

							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", "Liberation Mono", monospace',
									fontSize: 15,
									fontWeight: 700,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									color: '#B87333',
									fontVariantNumeric: 'tabular-nums',
									whiteSpace: 'nowrap',
								}}
							>
								50% COMMISSION
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#1F3A5F',
						borderRadius: 18,
						padding: '16px 30px',
						boxShadow: '0 10px 24px rgba(31,58,95,0.14)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FBFAF7',
							fontSize: 24,
							fontWeight: 700,
							letterSpacing: 1.1,
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