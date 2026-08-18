import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_20() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const heroIn = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// Beat 2: Active metric + line draw + skeleton shimmer
	const countValue = Math.round(interpolate(frame, [14, 62], [12, 50], clamp));
	const metricText = `${countValue}% COMMISSION`;

	const lineProgress = interpolate(frame, [18, 54], [0, 1], clamp);
	const dotProgress = interpolate(frame, [24, 58], [0, 1], clamp);

	const skeletonOpacity = interpolate(frame, [0, 10, 26, 34], [0.32, 0.22, 0.12, 0], clamp);
	const shimmerX = interpolate((frame * 1.8) % 90, [0, 90], [-220, 520], clamp);

	const cardLiftActive = frame >= 38 && frame <= 54;
	const cardLift = cardLiftActive
		? interpolate(frame, [38, 46, 54], [0, -10, 0], clamp)
		: 0;

	// Beat 3: Living hover loop + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 65, [0, 65], [-420, 980], clamp);

	// Exit
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -60],
		clamp
	);

	// Chart geometry kept safely in its own box to avoid collisions
	const chartW = 720;
	const chartH = 150;
	const p1 = {x: 20, y: 106};
	const p2 = {x: 170, y: 94};
	const p3 = {x: 320, y: 82};
	const p4 = {x: 470, y: 56};
	const p5 = {x: 610, y: 34};
	const p6 = {x: 700, y: 22};

	const fullPath = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y} L ${p5.x} ${p5.y} L ${p6.x} ${p6.y}`;
	const guidePath = `M ${p1.x} ${p1.y + 16} L ${p6.x} ${p6.y + 16}`;

	const dotX = interpolate(dotProgress, [0, 1], [p1.x, p6.x], clamp);
	const dotY = interpolate(dotProgress, [0, 1], [p1.y, p6.y], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0F1115',
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
					padding: '52px 18px 40px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#171A21',
						border: '2px solid #3B82F6',
						borderRadius: 16,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: 999,
							backgroundColor: '#34D399',
							boxShadow: '0 0 0 4px rgba(52,211,153,0.14)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F59E0B',
							fontSize: 17,
							fontWeight: 800,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							fontVariantNumeric: 'tabular-nums',
							whiteSpace: 'nowrap',
						}}
					>
						OPS ANALYTICS
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
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${heroIn}) translateY(${hoverY + cardLift}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#F59E0B',
							border: '4px solid #3B82F6',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '34px 34px 30px',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 36px rgba(0,0,0,0.46)`,
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
								width: 140,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top micro row */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 18,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#171A21',
									color: '#34D399',
									borderRadius: 12,
									padding: '10px 14px',
									fontSize: 14,
									fontWeight: 800,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								Activation Code
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 8,
									backgroundColor: 'rgba(23,26,33,0.9)',
									border: '2px solid #34D399',
									borderRadius: 999,
									padding: '8px 12px',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										width: 8,
										height: 8,
										borderRadius: 999,
										backgroundColor: '#34D399',
									}}
								/>
								<div
									style={{
										color: '#171A21',
										backgroundColor: '#34D399',
										padding: '4px 8px',
										borderRadius: 8,
										fontSize: 12,
										fontWeight: 900,
										letterSpacing: 1.6,
										textTransform: 'uppercase',
									}}
								>
									Live
								</div>
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									maxWidth: 800,
									textAlign: 'center',
									color: '#171A21',
									fontSize: 72,
									lineHeight: 0.96,
									fontWeight: 1000,
									letterSpacing: -2.2,
									textTransform: 'uppercase',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Middle dashboard zone */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.25fr 0.95fr',
								gap: 24,
								alignItems: 'stretch',
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* Chart panel */}
							<div
								style={{
									backgroundColor: '#171A21',
									border: '3px solid #3B82F6',
									borderRadius: 24,
									padding: '18px 18px 16px',
									display: 'grid',
									gridTemplateRows: 'auto auto 1fr',
									rowGap: 12,
									position: 'relative',
									overflow: 'hidden',
									minHeight: 226,
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<div
										style={{
											color: '#F59E0B',
											fontSize: 13,
											fontWeight: 800,
											letterSpacing: 2,
											textTransform: 'uppercase',
										}}
									>
										Margin Curve
									</div>
									<div
										style={{
											color: '#34D399',
											fontSize: 13,
											fontWeight: 900,
											letterSpacing: 1.2,
											fontVariantNumeric: 'tabular-nums',
										}}
									>
										+4.2x
									</div>
								</div>

								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(3, 1fr)',
										gap: 10,
									}}
								>
									{['Load', 'Route', 'Scale'].map((label, i) => (
										<div
											key={label}
											style={{
												height: 30,
												borderRadius: 10,
												backgroundColor: 'rgba(255,255,255,0.06)',
												position: 'relative',
												overflow: 'hidden',
												opacity: skeletonOpacity > 0 ? 1 : 0.22 + i * 0.05,
											}}
										>
											{skeletonOpacity > 0 && (
												<div
													style={{
														position: 'absolute',
														top: 0,
														bottom: 0,
														width: 80,
														background:
															'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(59,130,246,0.35) 50%, rgba(255,255,255,0) 100%)',
														transform: `translateX(${shimmerX}px) skewX(-20deg)`,
													}}
												/>
											)}
											<div
												style={{
													position: 'absolute',
													inset: 0,
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													color: '#34D399',
													fontSize: 11,
													fontWeight: 800,
													letterSpacing: 1.8,
													textTransform: 'uppercase',
													opacity: 0.92,
												}}
											>
												{label}
											</div>
										</div>
									))}
								</div>

								<div
									style={{
										backgroundColor: '#0F1115',
										borderRadius: 18,
										padding: '12px 12px 10px',
										border: '2px solid rgba(59,130,246,0.45)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<svg
										width={chartW}
										height={chartH}
										viewBox={`0 0 ${chartW} ${chartH}`}
										style={{display: 'block', overflow: 'visible'}}
									>
										<line
											x1={20}
											y1={128}
											x2={700}
											y2={128}
											stroke="rgba(245,158,11,0.24)"
											strokeWidth={2}
										/>
										<line
											x1={20}
											y1={18}
											x2={20}
											y2={128}
											stroke="rgba(245,158,11,0.24)"
											strokeWidth={2}
										/>

										<path
											d={guidePath}
											stroke="rgba(52,211,153,0.20)"
											strokeWidth={3}
											fill="none"
											strokeDasharray="8 10"
										/>

										<path
											d={fullPath}
											stroke="#3B82F6"
											strokeWidth={8}
											fill="none"
											strokeLinecap="round"
											strokeLinejoin="round"
											pathLength={1}
											strokeDasharray={1}
											strokeDashoffset={1 - lineProgress}
										/>

										{[p2, p3, p4, p5, p6].map((p, idx) => (
											<circle
												key={idx}
												cx={p.x}
												cy={p.y}
												r={lineProgress > (idx + 1) * 0.16 ? 5 : 0}
												fill="#34D399"
											/>
										))}

										<circle
											cx={dotX}
											cy={dotY}
											r={10}
											fill="rgba(52,211,153,0.18)"
										/>
										<circle cx={dotX} cy={dotY} r={5.5} fill="#34D399" />
									</svg>
								</div>
							</div>

							{/* Metric panel */}
							<div
								style={{
									backgroundColor: '#171A21',
									border: '3px solid #34D399',
									borderRadius: 24,
									padding: '20px 18px',
									display: 'grid',
									gridTemplateRows: 'auto auto auto',
									alignContent: 'space-between',
									minHeight: 226,
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										color: '#F59E0B',
										fontSize: 13,
										fontWeight: 800,
										letterSpacing: 2,
										textTransform: 'uppercase',
										textAlign: 'center',
									}}
								>
									Commission Engine
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '8px 0',
									}}
								>
									<div
										style={{
											backgroundColor: '#F59E0B',
											borderRadius: 22,
											padding: '18px 20px',
											minWidth: 280,
											boxShadow: '0 10px 24px rgba(245,158,11,0.26)',
										}}
									>
										<div
											style={{
												color: '#171A21',
												fontSize: 58,
												fontWeight: 1000,
												lineHeight: 0.95,
												letterSpacing: -1.6,
												textAlign: 'center',
												fontVariantNumeric: 'tabular-nums',
												whiteSpace: 'nowrap',
											}}
										>
											{metricText}
										</div>
									</div>
								</div>

								<div
									style={{
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											backgroundColor: '#3B82F6',
											color: '#FFFFFF',
											borderRadius: 14,
											padding: '10px 16px',
											fontSize: 15,
											fontWeight: 900,
											letterSpacing: 1.8,
											textTransform: 'uppercase',
											textAlign: 'center',
											whiteSpace: 'nowrap',
										}}
									>
										Auto-Routed Payout Lift
									</div>
								</div>
							</div>
						</div>

						{/* Bottom internal status bar */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr',
								gap: 12,
							}}
						>
							{[
								{label: 'Latency', value: '12ms', color: '#3B82F6'},
								{label: 'Yield', value: '50%', color: '#34D399'},
								{label: 'Burn', value: 'Low', color: '#171A21'},
							].map((item) => (
								<div
									key={item.label}
									style={{
										backgroundColor:
											item.color === '#171A21' ? 'rgba(23,26,33,0.92)' : 'rgba(255,255,255,0.22)',
										border:
											item.color === '#171A21'
												? '2px solid rgba(23,26,33,0.35)'
												: `2px solid ${item.color}`,
										borderRadius: 16,
										padding: '12px 14px',
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 12,
									}}
								>
									<div
										style={{
											color: '#171A21',
											fontSize: 12,
											fontWeight: 800,
											letterSpacing: 1.7,
											textTransform: 'uppercase',
											opacity: 0.82,
										}}
									>
										{item.label}
									</div>
									<div
										style={{
											color: item.color === '#171A21' ? '#F59E0B' : '#171A21',
											fontSize: 20,
											fontWeight: 1000,
											letterSpacing: -0.4,
											fontVariantNumeric: 'tabular-nums',
											whiteSpace: 'nowrap',
										}}
									>
										{item.value}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#34D399',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.38)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#171A21',
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