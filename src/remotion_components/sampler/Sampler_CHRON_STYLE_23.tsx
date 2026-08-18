import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_23() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ================================
	// BEAT 1 — ENTRANCE
	// ================================
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const heroEntrance = spring({
		frame,
		fps,
		config: {damping: 14, stiffness: 220, mass: 0.65},
	});

	const takeawayEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// ================================
	// BEAT 2 — ACTIVE SYSTEM STATE
	// ================================
	const dialNeedleDeg = interpolate(frame, [16, 62], [-118, 28], clamp);
	const horizonTilt = interpolate(frame, [18, 58], [-2.2, 1.8], clamp);
	const switchFlip = interpolate(frame, [34, 46], [0, 1], clamp);

	const checklist1 = frame >= 24;
	const checklist2 = frame >= 34;
	const checklist3 = frame >= 44;

	const metricReveal = interpolate(frame, [20, 56], [0, 1], clamp);
	const metricScale = interpolate(frame, [20, 30], [0.92, 1], clamp);

	// ================================
	// BEAT 3 — CONTINUOUS LIVING MOTION
	// ================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 65, [0, 65], [-320, 980], clamp);
	const dialMicro = Math.sin(frame * 0.16) * 1.6;

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

	const switchKnobX = interpolate(switchFlip, [0, 1], [6, 44], clamp);
	const switchBg = switchFlip < 0.5 ? '#8B5E3C' : '#27AE60';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1C1E22',
				opacity,
				fontFamily:
					'"Arial Black", "Impact", "SFMono-Regular", "Menlo", "Consolas", monospace',
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
					padding: '52px 18px 40px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#23262B',
						border: '3px solid #2D9CDB',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 22px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#27AE60',
							boxShadow: '0 0 0 4px rgba(39,174,96,0.18)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#2D9CDB',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						FLIGHT DECK — AVIONICS CHECK
					</div>
				</div>

				{/* TIER 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '20px 0 22px',
						transform: `scale(${heroEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#F2C14E',
							border: '4px solid #8B5E3C',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.48)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
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
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top panel strip */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.1fr 1fr 0.9fr',
								gap: 18,
								alignItems: 'stretch',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#1C1E22',
									border: '3px solid #8B5E3C',
									borderRadius: 18,
									padding: '14px 16px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									minHeight: 140,
								}}
							>
								<div
									style={{
										color: '#2D9CDB',
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										marginBottom: 10,
									}}
								>
									SYSTEM LOAD
								</div>
								<div
									style={{
										position: 'relative',
										width: 104,
										height: 104,
										alignSelf: 'center',
										marginTop: 2,
									}}
								>
									<svg width="104" height="104" viewBox="0 0 104 104">
										<circle
											cx="52"
											cy="52"
											r="45"
											fill="#23262B"
											stroke="#2D9CDB"
											strokeWidth="4"
										/>
										<path
											d="M17 66 A38 38 0 0 1 87 66"
											fill="none"
											stroke="#8B5E3C"
											strokeWidth="5"
											strokeLinecap="round"
										/>
										{[-120, -84, -48, -12, 24].map((deg, i) => {
											const rad = (deg * Math.PI) / 180;
											const x1 = 52 + Math.cos(rad) * 31;
											const y1 = 52 + Math.sin(rad) * 31;
											const x2 = 52 + Math.cos(rad) * 40;
											const y2 = 52 + Math.sin(rad) * 40;
											return (
												<line
													key={i}
													x1={x1}
													y1={y1}
													x2={x2}
													y2={y2}
													stroke="#F2C14E"
													strokeWidth="3"
													strokeLinecap="round"
												/>
											);
										})}
									</svg>

									<div
										style={{
											position: 'absolute',
											left: 52,
											top: 52,
											width: 4,
											height: 34,
											backgroundColor: '#27AE60',
											borderRadius: 999,
											transformOrigin: '50% 88%',
											transform: `translate(-50%, -88%) rotate(${dialNeedleDeg + dialMicro}deg)`,
											boxShadow: '0 0 12px rgba(39,174,96,0.35)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 52,
											top: 52,
											width: 14,
											height: 14,
											borderRadius: '50%',
											backgroundColor: '#8B5E3C',
											transform: 'translate(-50%, -50%)',
											border: '2px solid #F2C14E',
										}}
									/>
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#1C1E22',
									border: '3px solid #8B5E3C',
									borderRadius: 18,
									padding: '16px 18px',
									minHeight: 140,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}
							>
								<div
									style={{
										color: '#2D9CDB',
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
									}}
								>
									CHECKLIST
								</div>

								<div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
									{[
										['BUS A', checklist1],
										['NAV SYS', checklist2],
										['GAIN LOCK', checklist3],
									].map(([label, done], i) => (
										<div
											key={i}
											style={{
												display: 'grid',
												gridTemplateColumns: '22px 1fr',
												alignItems: 'center',
												gap: 10,
											}}
										>
											<div
												style={{
													width: 18,
													height: 18,
													borderRadius: 4,
													border: `2px solid ${done ? '#27AE60' : '#8B5E3C'}`,
													backgroundColor: done ? '#27AE60' : 'transparent',
													color: '#1C1E22',
													fontSize: 12,
													fontWeight: 900,
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													lineHeight: 1,
												}}
											>
												{done ? '✓' : ''}
											</div>
											<div
												style={{
													color: done ? '#F4E8BC' : '#D8C88B',
													fontSize: 18,
													fontWeight: 800,
													letterSpacing: 1.2,
													fontFamily:
														'"SFMono-Regular", "Menlo", "Consolas", monospace',
													whiteSpace: 'nowrap',
												}}
											>
												{label}
											</div>
										</div>
									))}
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#1C1E22',
									border: '3px solid #8B5E3C',
									borderRadius: 18,
									padding: '16px 16px',
									minHeight: 140,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}
							>
								<div
									style={{
										color: '#2D9CDB',
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
									}}
								>
									MASTER
								</div>

								<div
									style={{
										alignSelf: 'center',
										width: 72,
										height: 34,
										borderRadius: 999,
										backgroundColor: switchBg,
										border: '3px solid #F2C14E',
										position: 'relative',
										boxShadow: 'inset 0 0 10px rgba(0,0,0,0.25)',
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: 3,
											left: switchKnobX,
											width: 22,
											height: 22,
											borderRadius: '50%',
											backgroundColor: '#F2C14E',
											border: '2px solid #1C1E22',
											boxSizing: 'border-box',
										}}
									/>
								</div>

								<div
									style={{
										textAlign: 'center',
										color: '#F4E8BC',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 1.5,
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
									}}
								>
									{switchFlip < 0.5 ? 'ARMING' : 'ONLINE'}
								</div>
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								zIndex: 2,
								textAlign: 'center',
								color: '#1C1E22',
								fontSize: 68,
								fontWeight: 1000,
								lineHeight: 1.02,
								letterSpacing: 1,
								textTransform: 'uppercase',
								padding: '4px 14px 0',
							}}
						>
							AUTOMATED MARGINS
						</div>

						{/* Metric block */}
						<div
							style={{
								zIndex: 2,
								display: 'grid',
								gridTemplateColumns: '1fr 1.35fr',
								gap: 18,
								alignItems: 'stretch',
								flex: 1,
							}}
						>
							<div
								style={{
									backgroundColor: '#1C1E22',
									border: '3px solid #8B5E3C',
									borderRadius: 22,
									padding: '18px 18px 16px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										color: '#2D9CDB',
										fontSize: 16,
										fontWeight: 900,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										marginBottom: 8,
									}}
								>
									HORIZON ALIGN
								</div>

								<div
									style={{
										position: 'relative',
										height: 146,
										borderRadius: 16,
										overflow: 'hidden',
										border: '2px solid #2D9CDB',
										backgroundColor: '#101215',
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: '-10%',
											top: -18,
											width: '120%',
											height: 120,
											backgroundColor: '#2D9CDB',
											transform: `rotate(${horizonTilt}deg) translateY(8px)`,
											transformOrigin: '50% 50%',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: '-10%',
											bottom: -26,
											width: '120%',
											height: 90,
											backgroundColor: '#8B5E3C',
											transform: `rotate(${horizonTilt}deg)`,
											transformOrigin: '50% 50%',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 0,
											right: 0,
											top: '50%',
											height: 3,
											backgroundColor: '#F2C14E',
											opacity: 0.95,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: '50%',
											width: 64,
											height: 64,
											transform: 'translate(-50%, -50%)',
										}}
									>
										<svg width="64" height="64" viewBox="0 0 64 64">
											<path
												d="M8 32 H24 M40 32 H56"
												stroke="#F2C14E"
												strokeWidth="4"
												strokeLinecap="round"
												fill="none"
											/>
											<path
												d="M24 32 H40"
												stroke="#27AE60"
												strokeWidth="4"
												strokeLinecap="round"
												fill="none"
											/>
											<path
												d="M32 22 V42"
												stroke="#F2C14E"
												strokeWidth="3"
												strokeLinecap="round"
												fill="none"
											/>
										</svg>
									</div>
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#1C1E22',
									border: '3px solid #27AE60',
									borderRadius: 24,
									padding: '18px 20px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									alignItems: 'center',
									textAlign: 'center',
									boxShadow: '0 10px 24px rgba(39,174,96,0.18)',
									transform: `scale(${metricScale})`,
								}}
							>
								<div
									style={{
										color: '#2D9CDB',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 2.8,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									COMMISSION OUTPUT
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 14,
										opacity: metricReveal,
									}}
								>
									<div
										style={{
											color: '#27AE60',
											fontSize: 84,
											fontWeight: 1000,
											lineHeight: 0.95,
											letterSpacing: -2,
											fontFamily:
												'"SFMono-Regular", "Menlo", "Consolas", monospace',
											whiteSpace: 'nowrap',
										}}
									>
										50%
									</div>
								</div>

								<div
									style={{
										color: '#F2C14E',
										fontSize: 34,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									COMMISSION
								</div>
							</div>
						</div>

						{/* Bottom in-card label */}
						<div
							style={{
								zIndex: 2,
								alignSelf: 'center',
								backgroundColor: '#2D9CDB',
								color: '#1C1E22',
								borderRadius: 14,
								padding: '10px 24px',
								fontSize: 20,
								fontWeight: 1000,
								letterSpacing: 2.4,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							ACTIVATION CODE
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#8B5E3C',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.34)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F2C14E',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.2,
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