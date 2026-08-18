import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_18() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance
	// ------------------------------------------
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const heroEntrance = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.65},
	});

	const takeawayEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	// ------------------------------------------
	// Beat 2: Active market motion
	// ------------------------------------------
	const commissionValue = Math.round(interpolate(frame, [14, 58], [12, 50], clamp));
	const commissionDisplay = `${commissionValue}%`;

	const tickerShift = interpolate(frame, [0, durationInFrames], [0, -520], clamp);
	const sparkProgress = interpolate(frame, [18, 62], [0, 1], clamp);

	const bidFlash = frame >= 28 && frame <= 34;
	const askFlash = frame >= 46 && frame <= 52;
	const lastFlash = frame >= 58 && frame <= 66;

	const cellPulse = interpolate(frame, [24, 38], [1, 1.05], clamp);
	const metricScale =
		frame >= 34 && frame <= 48
			? interpolate(frame, [34, 41, 48], [1, 1.08, 1], clamp)
			: 1;

	// ------------------------------------------
	// Beat 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shineOffset = interpolate((frame + 16) % 70, [0, 70], [-260, 1080], clamp);
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -70],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const sparkPoints = [
		[0, 88],
		[58, 84],
		[116, 90],
		[174, 70],
		[232, 74],
		[290, 56],
		[348, 62],
		[406, 38],
		[464, 46],
	];

	const visibleSparkPoints = sparkPoints.map(([x, y], i) => {
		const reveal = interpolate(
			sparkProgress,
			[i / (sparkPoints.length - 1), Math.min(1, i / (sparkPoints.length - 1) + 0.16)],
			[0, 1],
			clamp
		);

		if (i === 0) return `${x},${y}`;

		const [prevX, prevY] = sparkPoints[i - 1];
		const currentX = prevX + (x - prevX) * reveal;
		const currentY = prevY + (y - prevY) * reveal;
		return `${currentX},${currentY}`;
	});

	const sparkline = visibleSparkPoints.join(' ');

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0B0E11',
				opacity,
				fontFamily:
					'"Poppins", "Arial Black", "Helvetica Neue", sans-serif',
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
					padding: '54px 18px 48px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#2A2E33',
						border: '2px solid #FFB300',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#00C805',
							boxShadow: '0 0 14px rgba(0,200,5,0.7)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#FFB300',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						Market Open
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
						transform: `scale(${heroEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#2A2E33',
							border: '3px solid #FFB300',
							borderRadius: 32,
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.55)`,
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateRows: '58px 1fr 98px',
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
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,179,0,0.12) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top terminal strip */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.2fr 1fr 1fr 1fr',
								gap: 12,
								alignItems: 'stretch',
							}}
						>
							<div
								style={{
									backgroundColor: '#0F1317',
									border: '1.5px solid #3A4047',
									borderRadius: 14,
									display: 'flex',
									alignItems: 'center',
									padding: '0 16px',
									overflow: 'hidden',
									position: 'relative',
								}}
							>
								<div
									style={{
										display: 'flex',
										gap: 28,
										transform: `translateX(${tickerShift}px)`,
										whiteSpace: 'nowrap',
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
										fontWeight: 700,
										fontSize: 16,
										letterSpacing: 1.5,
										color: '#00C805',
									}}
								>
									<span>BOT +12.4</span>
									<span style={{color: '#FFB300'}}>AUTO +19.8</span>
									<span>SAAS +8.1</span>
									<span style={{color: '#FF3B30'}}>FEES -1.2</span>
									<span>FLOW +14.7</span>
									<span style={{color: '#FFB300'}}>MARGINS +50</span>
								</div>
							</div>

							<div
								style={{
									backgroundColor: bidFlash ? 'rgba(0,200,5,0.16)' : '#0F1317',
									border: `1.5px solid ${bidFlash ? '#00C805' : '#3A4047'}`,
									borderRadius: 14,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									padding: '8px 14px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										color: '#8F98A3',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									Bid
								</div>
								<div
									style={{
										color: '#00C805',
										fontSize: 24,
										fontWeight: 900,
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
										fontVariantNumeric: 'tabular-nums',
									}}
								>
									49.80
								</div>
							</div>

							<div
								style={{
									backgroundColor: askFlash ? 'rgba(255,179,0,0.16)' : '#0F1317',
									border: `1.5px solid ${askFlash ? '#FFB300' : '#3A4047'}`,
									borderRadius: 14,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									padding: '8px 14px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										color: '#8F98A3',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									Ask
								</div>
								<div
									style={{
										color: '#FFB300',
										fontSize: 24,
										fontWeight: 900,
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
										fontVariantNumeric: 'tabular-nums',
									}}
								>
									50.00
								</div>
							</div>

							<div
								style={{
									backgroundColor: lastFlash ? 'rgba(255,59,48,0.16)' : '#0F1317',
									border: `1.5px solid ${lastFlash ? '#FF3B30' : '#3A4047'}`,
									borderRadius: 14,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									padding: '8px 14px',
									boxSizing: 'border-box',
									transform: `scale(${lastFlash ? cellPulse : 1})`,
								}}
							>
								<div
									style={{
										color: '#8F98A3',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									Last
								</div>
								<div
									style={{
										color: '#FF3B30',
										fontSize: 24,
										fontWeight: 900,
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
										fontVariantNumeric: 'tabular-nums',
									}}
								>
									50.00
								</div>
							</div>
						</div>

						{/* center hero area */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.1fr 0.9fr',
								gap: 24,
								alignItems: 'stretch',
							}}
						>
							{/* left column */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									gap: 18,
								}}
							>
								<div
									style={{
										color: '#FFB300',
										fontSize: 68,
										lineHeight: 1.02,
										fontWeight: 900,
										letterSpacing: -1.8,
										textTransform: 'uppercase',
										maxWidth: 460,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>

								<div
									style={{
										backgroundColor: '#0F1317',
										border: '2px solid #3A4047',
										borderRadius: 22,
										padding: '18px 22px',
										display: 'flex',
										flexDirection: 'column',
										gap: 12,
										width: '100%',
										boxSizing: 'border-box',
									}}
								>
									<div
										style={{
											color: '#8F98A3',
											fontSize: 14,
											fontWeight: 700,
											letterSpacing: 2,
											textTransform: 'uppercase',
											fontFamily:
												'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
										}}
									>
										Live signal
									</div>

									<svg width="100%" height="110" viewBox="0 0 464 110">
										<defs>
											<linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
												<stop offset="0%" stopColor="#FFB300" />
												<stop offset="100%" stopColor="#00C805" />
											</linearGradient>
										</defs>

										<polyline
											fill="none"
											stroke="url(#sparkGrad)"
											strokeWidth="6"
											strokeLinecap="round"
											strokeLinejoin="round"
											points={sparkline}
										/>

										<circle
											cx={interpolate(sparkProgress, [0, 1], [0, 464], clamp)}
											cy={interpolate(
												sparkProgress,
												[0, 0.2, 0.4, 0.62, 0.82, 1],
												[88, 90, 74, 56, 38, 46],
												clamp
											)}
											r="7"
											fill="#00C805"
										/>
									</svg>
								</div>
							</div>

							{/* right column */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center',
									gap: 16,
									backgroundColor: '#0F1317',
									border: '2px solid #3A4047',
									borderRadius: 28,
									padding: '26px 18px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										color: '#8F98A3',
										fontSize: 14,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
										textAlign: 'center',
									}}
								>
									Commission
								</div>

								<div
									style={{
										transform: `scale(${metricScale})`,
										display: 'flex',
										alignItems: 'flex-end',
										justifyContent: 'center',
										gap: 10,
										flexWrap: 'nowrap',
									}}
								>
									<div
										style={{
											color: '#FFB300',
											fontSize: 82,
											lineHeight: 0.95,
											fontWeight: 900,
											letterSpacing: -3,
											fontVariantNumeric: 'tabular-nums',
											fontFamily:
												'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
											whiteSpace: 'nowrap',
										}}
									>
										{commissionDisplay}
									</div>
								</div>

								<div
									style={{
										backgroundColor: 'rgba(0,200,5,0.14)',
										border: '2px solid #00C805',
										borderRadius: 16,
										padding: '10px 18px',
										color: '#00C805',
										fontSize: 22,
										fontWeight: 900,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
										textAlign: 'center',
										width: '100%',
										boxSizing: 'border-box',
									}}
								>
									Commission
								</div>

								<div
									style={{
										color: '#F3F5F7',
										fontSize: 34,
										fontWeight: 900,
										lineHeight: 1.05,
										letterSpacing: -0.8,
										textTransform: 'uppercase',
										textAlign: 'center',
										maxWidth: 290,
									}}
								>
									Software edge
								</div>
							</div>
						</div>

						{/* bottom row */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr',
								gap: 14,
								alignItems: 'stretch',
							}}
						>
							<div
								style={{
									backgroundColor: '#0F1317',
									border: '1.5px solid #3A4047',
									borderRadius: 16,
									padding: '14px 16px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									gap: 6,
								}}
							>
								<div
									style={{
										color: '#8F98A3',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
									}}
								>
									Mode
								</div>
								<div
									style={{
										color: '#FFB300',
										fontSize: 24,
										fontWeight: 900,
										textTransform: 'uppercase',
									}}
								>
									Automated
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#0F1317',
									border: '1.5px solid #3A4047',
									borderRadius: 16,
									padding: '14px 16px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									gap: 6,
								}}
							>
								<div
									style={{
										color: '#8F98A3',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
									}}
								>
									Fill
								</div>
								<div
									style={{
										color: '#00C805',
										fontSize: 24,
										fontWeight: 900,
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
										fontVariantNumeric: 'tabular-nums',
									}}
								>
									50.00
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#0F1317',
									border: '1.5px solid #3A4047',
									borderRadius: 16,
									padding: '14px 16px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									gap: 6,
								}}
							>
								<div
									style={{
										color: '#8F98A3',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
										fontFamily:
											'"IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
									}}
								>
									Status
								</div>
								<div
									style={{
										color: '#FF3B30',
										fontSize: 24,
										fontWeight: 900,
										textTransform: 'uppercase',
									}}
								>
									Open
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#FFB300',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.38)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#0B0E11',
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