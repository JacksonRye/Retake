import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_84() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgePop = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const cardPop = spring({
		frame: frame - 6,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.7},
	});

	const takeawayPop = spring({
		frame: frame - 12,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.65},
	});

	// Beat 2: Active state switch / metric reveal
	const commissionReveal = interpolate(frame, [18, 34], [0, 1], clamp);
	const commissionLift = interpolate(frame, [18, 34], [30, 0], clamp);
	const tagPlant = spring({
		frame: frame - 28,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.45},
	});

	// Brush + strata wipes
	const headlineBrush = interpolate(frame, [8, 24], [0, 1], clamp);
	const metricBrush = interpolate(frame, [24, 40], [0, 1], clamp);
	const strataWipe = interpolate(frame, [10, 32], [0, 1], clamp);

	// Beat 3: Continuous living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeHover = Math.sin(frame * 0.1) * 3;
	const takeawayHover = Math.sin(frame * 0.12 + 1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 14) % 70, [0, 70], [-260, 980], clamp);

	// Exit
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#75573C',
				opacity,
				fontFamily:
					'"Courier New", "SFMono-Regular", "Menlo", "Consolas", monospace',
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
					padding: '50px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgePop}) translateY(${badgeHover}px) rotate(-0.8deg)`,
						backgroundColor: '#D9BF94',
						border: '3px solid #F1EEE5',
						borderRadius: 14,
						padding: '12px 26px',
						boxShadow: '0 8px 22px rgba(0,0,0,0.25)',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 2,
							backgroundColor: '#EAC435',
							border: '2px solid #75573C',
							boxSizing: 'border-box',
						}}
					/>
					<div
						style={{
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#75573C',
							whiteSpace: 'nowrap',
						}}
					>
						Field Log · Dig Grid 84
					</div>
				</div>

				{/* Tier 2: Massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						margin: '22px 0',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						transform: `scale(${cardPop}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#57867D',
							border: '4px solid #D9BF94',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 32px rgba(0,0,0,0.34)`,
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* Grid squares background */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundImage: `
                  linear-gradient(rgba(241,238,229,0.12) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(241,238,229,0.12) 1px, transparent 1px)
                `,
								backgroundSize: '58px 58px',
								opacity: 0.55,
							}}
						/>

						{/* Strata bands */}
						<div
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								top: 0,
								height: `${strataWipe * 100}%`,
								overflow: 'hidden',
								pointerEvents: 'none',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 54,
									left: 0,
									right: 0,
									height: 48,
									backgroundColor: 'rgba(117,87,60,0.18)',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 164,
									left: 0,
									right: 0,
									height: 66,
									backgroundColor: 'rgba(234,196,53,0.11)',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 296,
									left: 0,
									right: 0,
									height: 58,
									backgroundColor: 'rgba(117,87,60,0.18)',
								}}
							/>
						</div>

						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -60,
								bottom: -60,
								width: 120,
								backgroundColor: 'rgba(241,238,229,0.12)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Corner tape/tag accents */}
						<div
							style={{
								position: 'absolute',
								top: 20,
								right: 22,
								backgroundColor: '#EAC435',
								color: '#75573C',
								padding: '8px 14px',
								borderRadius: 8,
								border: '2px solid #F1EEE5',
								fontSize: 16,
								fontWeight: 900,
								letterSpacing: 2,
								textTransform: 'uppercase',
								transform: `scale(${tagPlant}) rotate(1.5deg)`,
								transformOrigin: 'top right',
								boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
								whiteSpace: 'nowrap',
								zIndex: 3,
							}}
						>
							Find Tag
						</div>

						{/* Safe content column */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								textAlign: 'center',
								gap: 24,
							}}
						>
							{/* Headline block */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 14,
									paddingTop: 18,
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 4,
										textTransform: 'uppercase',
										color: '#F1EEE5',
										opacity: 0.95,
										whiteSpace: 'nowrap',
									}}
								>
									Strata Label
								</div>

								<div
									style={{
										position: 'relative',
										display: 'inline-block',
										padding: '4px 8px',
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 0,
											top: '50%',
											transform: 'translateY(-50%)',
											width: `${headlineBrush * 100}%`,
											height: 54,
											backgroundColor: 'rgba(234,196,53,0.28)',
											borderRadius: 10,
										}}
									/>
									<div
										style={{
											position: 'relative',
											color: '#F1EEE5',
											fontSize: 74,
											fontWeight: 1000,
											lineHeight: 1.02,
											letterSpacing: -2,
											textTransform: 'uppercase',
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
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '10px 0',
								}}
							>
								<div
									style={{
										position: 'relative',
										backgroundColor: '#75573C',
										border: '4px solid #EAC435',
										borderRadius: 24,
										padding: '24px 34px',
										boxShadow: '0 10px 24px rgba(0,0,0,0.22)',
										minWidth: 620,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 14,
											top: 12,
											bottom: 12,
											width: `${metricBrush * 100}%`,
											maxWidth: 'calc(100% - 28px)',
											backgroundColor: 'rgba(217,191,148,0.14)',
											borderRadius: 16,
										}}
									/>

									<div
										style={{
											position: 'relative',
											transform: `translateY(${commissionLift}px)`,
											opacity: commissionReveal,
											color: '#EAC435',
											fontSize: 68,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: 1,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										50% COMMISSION
									</div>
								</div>
							</div>

							{/* Lower support chips */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-end',
									paddingBottom: 4,
								}}
							>
								<div
									style={{
										backgroundColor: '#D9BF94',
										color: '#75573C',
										border: '2px solid #F1EEE5',
										borderRadius: 10,
										padding: '10px 14px',
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
										transform: 'rotate(-1.2deg)',
										whiteSpace: 'nowrap',
									}}
								>
									Layer A
								</div>

								<div
									style={{
										backgroundColor: '#F1EEE5',
										color: '#75573C',
										border: '2px solid #D9BF94',
										borderRadius: 10,
										padding: '10px 16px',
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
										transform: 'rotate(1deg)',
										whiteSpace: 'nowrap',
									}}
								>
									Grid Square
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${takeawayPop}) translateY(${takeawayHover}px) rotate(0.6deg)`,
						backgroundColor: '#EAC435',
						border: '3px solid #F1EEE5',
						borderRadius: 18,
						padding: '16px 30px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.28)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#75573C',
							fontSize: 22,
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