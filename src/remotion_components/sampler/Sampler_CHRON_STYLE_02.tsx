import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_02() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// -----------------------------
	// Beat 1: Snappy entrance
	// -----------------------------
	const masterIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.65},
	});

	const badgeIn = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 250, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.75},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	// -----------------------------
	// Beat 2: Active state / metric
	// -----------------------------
	const metricValue = Math.round(interpolate(frame, [18, 58], [12, 50], clamp));
	const threatSweep = interpolate(frame, [16, 66], [0, 1], clamp);
	const typeCount = Math.floor(interpolate(frame, [8, 30], [0, 17], clamp));
	const typedHeadline = 'AUTOMATED MARGINS'.slice(0, typeCount);

	// -----------------------------
	// Beat 3: Living hover loop
	// -----------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-260, 1000], clamp);
	const scanOffset = (frame * 6) % 24;

	// -----------------------------
	// Ambient signal behavior
	// -----------------------------
	const flicker =
		frame === 12 || frame === 47 || frame === 88
			? 0.92
			: 0.985 + Math.sin(frame * 0.9) * 0.015;

	const gaugeAngle = interpolate(threatSweep, [0, 1], [-120, 120], clamp);
	const gaugeNeedleX = 190 + Math.cos((gaugeAngle * Math.PI) / 180) * 95;
	const gaugeNeedleY = 190 + Math.sin((gaugeAngle * Math.PI) / 180) * 95;

	// -----------------------------
	// Exit
	// -----------------------------
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -60], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0A0E1A',
				opacity,
				fontFamily:
					'"Poppins", "Inter", "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
				overflow: 'hidden',
			}}
		>
			{/* Full-screen scanline + subtle signal layer */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					pointerEvents: 'none',
					opacity: 0.18,
					backgroundImage:
						'repeating-linear-gradient(to bottom, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 6px)',
					backgroundPositionY: scanOffset,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					pointerEvents: 'none',
					background:
						'radial-gradient(circle at 50% 45%, rgba(34,211,238,0.07), transparent 48%), radial-gradient(circle at 50% 50%, rgba(255,179,0,0.05), transparent 62%)',
					mixBlendMode: 'screen',
					opacity: flicker,
				}}
			/>

			<div
				style={{
					width: '94%',
					height: '88%',
					maxWidth: 980,
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '58px 18px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#1F2937',
						border: '2px solid #22D3EE',
						borderRadius: 14,
						padding: '12px 24px',
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
							backgroundColor: '#22D3EE',
							boxShadow: '0 0 12px rgba(34,211,238,0.8)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#22D3EE',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							fontFamily: '"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
							whiteSpace: 'nowrap',
						}}
					>
						MISSION CONTROL
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
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#1F2937',
							border: '4px solid #FFB300',
							borderRadius: 32,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.62)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateColumns: '1.15fr 0.85fr',
							columnGap: 28,
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								backgroundColor: 'rgba(255,255,255,0.08)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Left content column */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								height: '100%',
								paddingRight: 6,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 18,
								}}
							>
								<div
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										alignSelf: 'flex-start',
										backgroundColor: 'rgba(255,59,48,0.14)',
										border: '2px solid #FF3B30',
										borderRadius: 12,
										padding: '8px 14px',
									}}
								>
									<span
										style={{
											color: '#FF3B30',
											fontSize: 16,
											fontWeight: 900,
											letterSpacing: 2.2,
											textTransform: 'uppercase',
											fontFamily:
												'"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
											whiteSpace: 'nowrap',
										}}
									>
										THREAT LEVEL: HIGH
									</span>
								</div>

								<div
									style={{
										minHeight: 170,
										border: '2px solid rgba(34,211,238,0.5)',
										borderRadius: 22,
										padding: '24px 24px 18px',
										backgroundColor: 'rgba(10,14,26,0.46)',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										position: 'relative',
									}}
								>
									<div
										style={{
											color: '#22D3EE',
											fontSize: 18,
											fontWeight: 800,
											letterSpacing: 2,
											marginBottom: 14,
											textTransform: 'uppercase',
											fontFamily:
												'"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
										}}
									>
										&gt; SYSTEM OUTPUT
									</div>

									<div
										style={{
											color: '#FFB300',
											fontSize: 72,
											lineHeight: 1.02,
											fontWeight: 900,
											letterSpacing: -1.8,
											textTransform: 'uppercase',
											wordBreak: 'break-word',
										}}
									>
										{typedHeadline}
										<span
											style={{
												display: 'inline-block',
												width: 14,
												marginLeft: 4,
												opacity: frame % 12 < 6 ? 1 : 0,
												color: '#22D3EE',
											}}
										>
											|
										</span>
									</div>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 14,
								}}
							>
								<div
									style={{
										color: '#22D3EE',
										fontSize: 18,
										fontWeight: 800,
										letterSpacing: 2,
										textTransform: 'uppercase',
										fontFamily:
											'"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
									}}
								>
									PROFIT STATE / LOCKED
								</div>

								<div
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										alignSelf: 'flex-start',
										backgroundColor: '#0A0E1A',
										border: '3px solid #FFB300',
										borderRadius: 22,
										padding: '18px 28px',
										boxShadow: '0 10px 28px rgba(255,179,0,0.16)',
									}}
								>
									<span
										style={{
											color: '#FFB300',
											fontSize: 74,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: -1,
											fontFamily:
												'"Arial Narrow", "Roboto Condensed", "Helvetica Neue", sans-serif',
											whiteSpace: 'nowrap',
										}}
									>
										{metricValue}% COMMISSION
									</span>
								</div>
							</div>
						</div>

						{/* Right visual column */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								height: '100%',
							}}
						>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'flex-end',
								}}
							>
								<div
									style={{
										backgroundColor: 'rgba(34,211,238,0.12)',
										border: '2px solid #22D3EE',
										borderRadius: 12,
										padding: '8px 12px',
										color: '#22D3EE',
										fontSize: 15,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
										fontFamily:
											'"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
										whiteSpace: 'nowrap',
									}}
								>
									LIVE FEED
								</div>
							</div>

							<div
								style={{
									width: 100,
									height: 100,
									borderRadius: '50%',
									border: '3px solid #FF3B30',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: 'rgba(255,59,48,0.1)',
									boxShadow: '0 0 24px rgba(255,59,48,0.18)',
									marginTop: 8,
									marginBottom: 18,
								}}
							>
								<div
									style={{
										width: 28,
										height: 28,
										borderRadius: '50%',
										backgroundColor: '#FF3B30',
										boxShadow: '0 0 20px rgba(255,59,48,0.8)',
									}}
								/>
							</div>

							<div
								style={{
									width: '100%',
									flex: 1,
									minHeight: 280,
									backgroundColor: 'rgba(10,14,26,0.55)',
									border: '2px solid rgba(255,179,0,0.45)',
									borderRadius: 24,
									padding: 18,
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							>
								<div
									style={{
										color: '#FFB300',
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										fontFamily:
											'"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
										textAlign: 'center',
									}}
								>
									THREAT METER
								</div>

								<div
									style={{
										width: 220,
										height: 220,
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<svg width="220" height="220" viewBox="0 0 220 220">
										<path
											d="M30 160 A80 80 0 0 1 190 160"
											fill="none"
											stroke="rgba(255,255,255,0.16)"
											strokeWidth="12"
											strokeLinecap="round"
										/>
										<path
											d="M48 160 A62 62 0 0 1 172 160"
											fill="none"
											stroke="#22D3EE"
											strokeWidth="4"
											strokeLinecap="round"
											strokeDasharray="4 8"
											opacity={0.9}
										/>
										<path
											d="M30 160 A80 80 0 0 1 190 160"
											fill="none"
											stroke="#FF3B30"
											strokeWidth="12"
											strokeLinecap="round"
											strokeDasharray={`${threatSweep * 251} 251`}
										/>
										<line
											x1="110"
											y1="160"
											x2={gaugeNeedleX - 80}
											y2={gaugeNeedleY - 30}
											stroke="#FFB300"
											strokeWidth="6"
											strokeLinecap="round"
										/>
										<circle cx="110" cy="160" r="10" fill="#FFB300" />
									</svg>

									<div
										style={{
											position: 'absolute',
											bottom: 24,
											left: 0,
											right: 0,
											textAlign: 'center',
											color: '#FF3B30',
											fontSize: 28,
											fontWeight: 900,
											letterSpacing: 1,
											fontFamily:
												'"Arial Narrow", "Roboto Condensed", "Helvetica Neue", sans-serif',
										}}
									>
										{metricValue}%
									</div>
								</div>

								<div
									style={{
										width: '100%',
										display: 'grid',
										gridTemplateColumns: '1fr 1fr',
										gap: 12,
									}}
								>
									<div
										style={{
											backgroundColor: 'rgba(34,211,238,0.12)',
											border: '2px solid #22D3EE',
											borderRadius: 14,
											padding: '12px 10px',
											textAlign: 'center',
										}}
									>
										<div
											style={{
												color: '#22D3EE',
												fontSize: 13,
												fontWeight: 900,
												letterSpacing: 1.8,
												textTransform: 'uppercase',
												fontFamily:
													'"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
											}}
										>
											AUTO
										</div>
									</div>

									<div
										style={{
											backgroundColor: 'rgba(255,59,48,0.12)',
											border: '2px solid #FF3B30',
											borderRadius: 14,
											padding: '12px 10px',
											textAlign: 'center',
										}}
									>
										<div
											style={{
												color: '#FF3B30',
												fontSize: 13,
												fontWeight: 900,
												letterSpacing: 1.8,
												textTransform: 'uppercase',
												fontFamily:
													'"SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace',
											}}
										>
											LOCKED
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${footerFloat}px)`,
						backgroundColor: '#FFB300',
						borderRadius: 18,
						padding: '16px 34px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#0A0E1A',
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