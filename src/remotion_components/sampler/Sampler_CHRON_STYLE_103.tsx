import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_103() {
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
		config: {damping: 13, stiffness: 220, mass: 0.65},
	});

	const takeawayEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Active state switch / readout build
	const commissionReveal = interpolate(frame, [16, 48], [0, 50], clamp);
	const visibleCommission = Math.round(commissionReveal);
	const metricText = `${visibleCommission}% COMMISSION`;

	const pulsePhase = Math.sin(frame * 0.22);
	const heatPulse = (pulsePhase + 1) / 2;

	const reticleTravelX = interpolate(frame, [18, 46, 72], [-140, 90, 0], clamp);
	const reticleTravelY = interpolate(frame, [18, 46, 72], [60, -50, 0], clamp);

	// Beat 3: Continuous living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const scanBandY = interpolate((frame * 3) % 180, [0, 180], [-160, 640], clamp);
	const shineOffset = interpolate((frame + 10) % 70, [0, 70], [-280, 980], clamp);

	const borderGlow = 16 + heatPulse * 16;
	const innerBloom = 0.12 + heatPulse * 0.12;

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitSlide = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1B1464',
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
					maxWidth: 1040,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '52px 18px 36px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FFF3B0',
						border: `3px solid #D4145A`,
						borderRadius: 16,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: `0 8px 24px rgba(0,0,0,0.32), 0 0 ${8 + heatPulse * 10}px rgba(212,20,90,0.25)`,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#FB8B24',
							boxShadow: `0 0 ${8 + heatPulse * 10}px rgba(251,139,36,0.9)`,
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#5B21B6',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.8,
							textTransform: 'uppercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						THERMAL SIGNAL
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
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 548,
							backgroundColor: '#FFF3B0',
							border: `4px solid #5B21B6`,
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '42px 42px 36px',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							textAlign: 'center',
							boxShadow: `0 18px 36px rgba(0,0,0,0.4), 0 0 ${borderGlow}px rgba(251,139,36,0.28)`,
						}}
					>
						{/* heat bloom background */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background: `radial-gradient(circle at 50% 48%, rgba(251,139,36,${innerBloom}) 0%, rgba(212,20,90,${
									0.08 + innerBloom * 0.55
								}) 26%, rgba(91,33,182,0.06) 56%, rgba(27,20,100,0) 76%)`,
								pointerEvents: 'none',
							}}
						/>

						{/* scan band */}
						<div
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								top: scanBandY,
								height: 78,
								background:
									'linear-gradient(180deg, rgba(251,139,36,0) 0%, rgba(251,139,36,0.18) 50%, rgba(212,20,90,0) 100%)',
								pointerEvents: 'none',
							}}
						/>

						{/* shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.30) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* reticle corners - collision-free, outside text blocks */}
						<div
							style={{
								position: 'absolute',
								left: 20,
								top: 20,
								width: 56,
								height: 56,
								borderLeft: '4px solid #D4145A',
								borderTop: '4px solid #D4145A',
								borderTopLeftRadius: 10,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								right: 20,
								top: 20,
								width: 56,
								height: 56,
								borderRight: '4px solid #D4145A',
								borderTop: '4px solid #D4145A',
								borderTopRightRadius: 10,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: 20,
								bottom: 20,
								width: 56,
								height: 56,
								borderLeft: '4px solid #D4145A',
								borderBottom: '4px solid #D4145A',
								borderBottomLeftRadius: 10,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								right: 20,
								bottom: 20,
								width: 56,
								height: 56,
								borderRight: '4px solid #D4145A',
								borderBottom: '4px solid #D4145A',
								borderBottomRightRadius: 10,
							}}
						/>

						{/* top readout labels */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#5B21B6',
									color: '#FFF3B0',
									borderRadius: 10,
									padding: '8px 14px',
									fontSize: 14,
									fontWeight: 900,
									letterSpacing: 1.8,
									lineHeight: 1,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								LOCK
							</div>
							<div
								style={{
									backgroundColor: '#D4145A',
									color: '#FFF3B0',
									borderRadius: 10,
									padding: '8px 14px',
									fontSize: 14,
									fontWeight: 900,
									letterSpacing: 1.8,
									lineHeight: 1,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								HOT
							</div>
						</div>

						{/* main text stack */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 28,
								position: 'relative',
								zIndex: 2,
								padding: '12px 0',
							}}
						>
							<div
								style={{
									color: '#5B21B6',
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									maxWidth: 820,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									background: 'linear-gradient(180deg, #D4145A 0%, #FB8B24 100%)',
									border: '4px solid #5B21B6',
									borderRadius: 26,
									padding: '20px 34px',
									boxShadow: `0 10px 28px rgba(212,20,90,0.22), 0 0 ${
										10 + heatPulse * 14
									}px rgba(251,139,36,0.35)`,
									minWidth: 560,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										color: '#FFF3B0',
										fontSize: 62,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#5B21B6',
									color: '#FFF3B0',
									borderRadius: 14,
									padding: '10px 22px',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2.2,
									lineHeight: 1,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								THERMAL YIELD
							</div>
						</div>

						{/* bottom micro labels */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#D4145A',
									fontSize: 14,
									fontWeight: 900,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								SCAN 03
							</div>
							<div
								style={{
									color: '#FB8B24',
									fontSize: 14,
									fontWeight: 900,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								TARGET LIVE
							</div>
						</div>

						{/* crosshair tracking, centered in safe empty zone around metric */}
						<div
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: 170,
								height: 170,
								transform: `translate(calc(-50% + ${reticleTravelX}px), calc(-50% + ${reticleTravelY}px))`,
								pointerEvents: 'none',
								opacity: 0.78,
								zIndex: 1,
							}}
						>
							<svg width="170" height="170" viewBox="0 0 170 170">
								<circle
									cx="85"
									cy="85"
									r="48"
									fill="none"
									stroke="#D4145A"
									strokeWidth="3"
									strokeDasharray="10 8"
								/>
								<circle
									cx="85"
									cy="85"
									r="9"
									fill="rgba(251,139,36,0.22)"
									stroke="#FB8B24"
									strokeWidth="3"
								/>
								<line x1="85" y1="8" x2="85" y2="34" stroke="#D4145A" strokeWidth="3" />
								<line x1="85" y1="136" x2="85" y2="162" stroke="#D4145A" strokeWidth="3" />
								<line x1="8" y1="85" x2="34" y2="85" stroke="#D4145A" strokeWidth="3" />
								<line x1="136" y1="85" x2="162" y2="85" stroke="#D4145A" strokeWidth="3" />
							</svg>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#FB8B24',
						border: '3px solid #D4145A',
						borderRadius: 18,
						padding: '16px 30px',
						boxShadow: `0 8px 24px rgba(0,0,0,0.3), 0 0 ${8 + heatPulse * 10}px rgba(251,139,36,0.24)`,
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#1B1464',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.1,
							textTransform: 'uppercase',
							lineHeight: 1.1,
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