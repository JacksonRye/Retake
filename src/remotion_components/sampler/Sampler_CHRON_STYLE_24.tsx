import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_24() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const masterIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.62},
	});

	const badgeIn = spring({
		frame: frame - 3,
		fps,
		config: {damping: 12, stiffness: 250, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.68},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// Beat 2: Active switching / metric emphasis
	// ------------------------------------------
	const feedPhase = frame % 20;
	const activeFeed = Math.floor(frame / 20) % 4;

	const metricReveal = interpolate(frame, [18, 58], [0, 1], clamp);
	const metricScale = interpolate(frame, [22, 30, 40, 54], [1, 1.08, 1.02, 1], clamp);

	const zoomPush = interpolate(frame, [30, 54], [1, 1.03], clamp);

	const recOn = Math.floor(frame / 10) % 2 === 0;
	const staticFlashA = frame === 24 || frame === 25;
	const staticFlashB = frame === 58 || frame === 59;
	const staticFlashC = frame === 88 || frame === 89;
	const staticOpacity = staticFlashA || staticFlashB || staticFlashC ? 0.2 : 0;

	// ------------------------------------------
	// Beat 3: Living hover + shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shadowPulse = 20 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 8) % 65, [0, 65], [-260, 980], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -48],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// ------------------------------------------
	// CCTV readouts
	// ------------------------------------------
	const seconds = Math.floor(frame / fps);
	const sub = frame % fps;
	const pad = (n: number, len = 2) => String(n).padStart(len, '0');
	const timecode = `00:${pad(seconds)}:${pad(sub)}`;

	const feeds = [
		{label: 'CAM 01', tone: '#9FA6AD'},
		{label: 'CAM 02', tone: '#7CFF6B'},
		{label: 'CAM 03', tone: '#9FA6AD'},
		{label: 'CAM 04', tone: '#FF1F1F'},
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#23262B',
				fontFamily:
					'"SFMono-Regular", "Roboto Mono", "Menlo", "Consolas", monospace',
				opacity,
				color: '#9FA6AD',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
					backgroundSize: '60px 60px',
					opacity: 0.25,
				}}
			/>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at center, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 65%)',
				}}
			/>

			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '44px 18px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px) scale(${masterIn})`,
				}}
			>
				{/* Tier 1: Badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#23262B',
						border: '3px solid #E8E8E8',
						borderRadius: 14,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: recOn ? '#FF1F1F' : '#6C2222',
							boxShadow: recOn ? '0 0 16px rgba(255,31,31,0.65)' : 'none',
						}}
					/>
					<div
						style={{
							color: '#E8E8E8',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						WATCHTOWER GRID ACTIVE
					</div>
				</div>

				{/* Tier 2: Massive Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '18px 0 20px',
						transform: `scale(${cardIn * zoomPush}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#E8E8E8',
							border: '4px solid #9FA6AD',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 36px rgba(0,0,0,0.45)`,
							padding: '24px 24px 26px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.48), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Static burst */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								opacity: staticOpacity,
								pointerEvents: 'none',
								backgroundImage:
									'repeating-linear-gradient(0deg, rgba(35,38,43,0.55) 0px, rgba(35,38,43,0.55) 2px, rgba(255,255,255,0.18) 2px, rgba(255,255,255,0.18) 4px)',
								mixBlendMode: 'multiply',
							}}
						/>

						{/* Top monitor strip */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 20,
								height: 42,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 12,
									flexShrink: 0,
								}}
							>
								<div
									style={{
										padding: '7px 12px',
										borderRadius: 8,
										backgroundColor: '#23262B',
										border: '2px solid #9FA6AD',
										color: '#E8E8E8',
										fontSize: 15,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									REC
								</div>
								<div
									style={{
										color: '#23262B',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									{timecode}
								</div>
							</div>

							<div
								style={{
									color: '#23262B',
									fontSize: 16,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									textAlign: 'right',
								}}
							>
								LIVE MULTIFEED
							</div>
						</div>

						{/* 2x2 CCTV grid */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gridTemplateRows: '1fr 1fr',
								gap: 14,
								height: 228,
								marginTop: 10,
								marginBottom: 18,
							}}
						>
							{feeds.map((feed, i) => {
								const isActive = i === activeFeed;
								const pulse = isActive ? 1 : 0.92;
								const feedNoiseOffset = (feedPhase + i * 3) % 20;

								return (
									<div
										key={feed.label}
										style={{
											position: 'relative',
											borderRadius: 18,
											border: `3px solid ${isActive ? '#FF1F1F' : '#9FA6AD'}`,
											backgroundColor: '#23262B',
											overflow: 'hidden',
											transform: `scale(${pulse})`,
											boxShadow: isActive
												? '0 0 0 2px rgba(255,31,31,0.16) inset'
												: 'none',
										}}
									>
										<div
											style={{
												position: 'absolute',
												inset: 0,
												background:
													i === 1
														? 'linear-gradient(135deg, rgba(124,255,107,0.28), rgba(255,255,255,0.03))'
														: i === 3
														? 'linear-gradient(135deg, rgba(255,31,31,0.22), rgba(255,255,255,0.03))'
														: 'linear-gradient(135deg, rgba(159,166,173,0.22), rgba(255,255,255,0.03))',
											}}
										/>
										<div
											style={{
												position: 'absolute',
												inset: 0,
												backgroundImage:
													'repeating-linear-gradient(180deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 6px)',
												opacity: 0.35,
											}}
										/>
										<div
											style={{
												position: 'absolute',
												left: 10,
												top: 8,
												padding: '5px 8px',
												backgroundColor: isActive ? '#FF1F1F' : '#E8E8E8',
												color: isActive ? '#E8E8E8' : '#23262B',
												borderRadius: 6,
												fontSize: 13,
												fontWeight: 900,
												letterSpacing: 1.5,
												textTransform: 'uppercase',
											}}
										>
											{feed.label}
										</div>

										<div
											style={{
												position: 'absolute',
												right: 10,
												top: 9,
												color: feed.tone,
												fontSize: 13,
												fontWeight: 800,
												letterSpacing: 1.2,
											}}
										>
											0{feedNoiseOffset}:24
										</div>

										<div
											style={{
												position: 'absolute',
												left: 16,
												right: 16,
												bottom: 18,
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<div
												style={{
													width: '56%',
													height: 6,
													borderRadius: 999,
													backgroundColor: 'rgba(232,232,232,0.18)',
													overflow: 'hidden',
												}}
											>
												<div
													style={{
														width: `${isActive ? 78 : 36}%`,
														height: '100%',
														backgroundColor: isActive ? '#7CFF6B' : '#9FA6AD',
													}}
												/>
											</div>
											<div
												style={{
													color: '#E8E8E8',
													fontSize: 12,
													fontWeight: 900,
													letterSpacing: 1.2,
												}}
											>
												LOCK
											</div>
										</div>
									</div>
								);
							})}
						</div>

						{/* Headline */}
						<div
							style={{
								textAlign: 'center',
								padding: '0 18px',
							}}
						>
							<div
								style={{
									color: '#23262B',
									fontSize: 68,
									lineHeight: 1.02,
									fontWeight: 1000,
									letterSpacing: -2,
									textTransform: 'uppercase',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric block */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								marginTop: 10,
								marginBottom: 6,
							}}
						>
							<div
								style={{
									transform: `scale(${metricScale})`,
									backgroundColor: '#23262B',
									border: '4px solid #FF1F1F',
									borderRadius: 24,
									padding: '20px 34px',
									minWidth: 530,
									boxShadow: '0 10px 24px rgba(255,31,31,0.18)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 8,
								}}
							>
								<div
									style={{
										color: '#9FA6AD',
										fontSize: 17,
										fontWeight: 900,
										letterSpacing: 3,
										textTransform: 'uppercase',
										opacity: 0.95,
									}}
								>
									COMMISSION READOUT
								</div>
								<div
									style={{
										color: '#E8E8E8',
										fontSize: 74,
										lineHeight: 1,
										fontWeight: 1000,
										letterSpacing: -2,
										textTransform: 'uppercase',
										opacity: metricReveal,
									}}
								>
									50% COMMISSION
								</div>
							</div>
						</div>

						{/* Bottom card strip */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 18,
								marginTop: 8,
							}}
						>
							<div
								style={{
									flex: 1,
									height: 16,
									borderRadius: 999,
									background:
										'linear-gradient(90deg, #7CFF6B 0%, #7CFF6B 52%, #23262B 52%, #23262B 100%)',
									border: '2px solid #23262B',
								}}
							/>
							<div
								style={{
									padding: '9px 14px',
									borderRadius: 10,
									backgroundColor: '#7CFF6B',
									color: '#23262B',
									fontSize: 15,
									fontWeight: 1000,
									letterSpacing: 2,
									textTransform: 'uppercase',
									flexShrink: 0,
								}}
							>
								SYSTEM VERIFIED
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#FF1F1F',
						borderRadius: 18,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#E8E8E8',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.3,
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