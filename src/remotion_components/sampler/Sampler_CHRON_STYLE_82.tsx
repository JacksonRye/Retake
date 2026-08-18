import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_82() {
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

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});

	const bottomIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	// Beat 2: Active state switch / metric roll
	const metricReveal = interpolate(frame, [16, 50], [0, 1], clamp);
	const commissionNumber = Math.round(interpolate(frame, [16, 52], [12, 50], clamp));
	const metricText = `${commissionNumber}% COMMISSION`;

	const alertPulse = 0.65 + Math.sin(frame * 0.28) * 0.35;
	const cellEscalation = interpolate(frame, [20, 70], [0, 1], clamp);

	// Beat 3: Living hover + shine + radar sweep
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.11 + 1.3) * 3;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-260, 980], clamp);
	const radarRotation = interpolate(frame, [0, durationInFrames], [0, 360], clamp);

	// Ticker crawl
	const tickerX = interpolate(frame, [0, durationInFrames], [0, -520], clamp);

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -50], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const stormCellAOpacity = 0.18 + cellEscalation * 0.2;
	const stormCellBOpacity = 0.12 + cellEscalation * 0.28;
	const stormCellCOpacity = 0.1 + cellEscalation * 0.38;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1C2733',
				fontFamily:
					'"Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif',
				opacity,
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Background radar field */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						width: 940,
						height: 940,
						marginLeft: -470,
						marginTop: -470,
						borderRadius: '50%',
						border: '2px solid rgba(88,214,141,0.14)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						width: 700,
						height: 700,
						marginLeft: -350,
						marginTop: -350,
						borderRadius: '50%',
						border: '2px solid rgba(88,214,141,0.12)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						width: 470,
						height: 470,
						marginLeft: -235,
						marginTop: -235,
						borderRadius: '50%',
						border: '2px solid rgba(88,214,141,0.1)',
					}}
				/>

				{/* Radar sweep */}
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						width: 820,
						height: 820,
						marginLeft: -410,
						marginTop: -410,
						borderRadius: '50%',
						background:
							'conic-gradient(from 0deg, rgba(88,214,141,0) 0deg, rgba(88,214,141,0.02) 250deg, rgba(88,214,141,0.30) 325deg, rgba(88,214,141,0.0) 360deg)',
						transform: `rotate(${radarRotation}deg)`,
					}}
				/>

				{/* Weather cells */}
				<div
					style={{
						position: 'absolute',
						left: '16%',
						top: '18%',
						width: 220,
						height: 140,
						borderRadius: '50%',
						backgroundColor: `rgba(244, 208, 63, ${stormCellAOpacity})`,
						filter: 'blur(22px)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						right: '15%',
						top: '22%',
						width: 260,
						height: 170,
						borderRadius: '50%',
						backgroundColor: `rgba(231, 76, 60, ${stormCellBOpacity})`,
						filter: 'blur(28px)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: '28%',
						bottom: '16%',
						width: 290,
						height: 170,
						borderRadius: '50%',
						backgroundColor: `rgba(179, 0, 27, ${stormCellCOpacity})`,
						filter: 'blur(32px)',
					}}
				/>
			</div>

			<div
				style={{
					width: '95%',
					maxWidth: 1180,
					height: '90%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '34px 18px 26px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
					zIndex: 2,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#B3001B',
						border: '3px solid #F4D03F',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow: `0 0 ${16 + alertPulse * 10}px rgba(231,76,60,0.35)`,
					}}
				>
					<div
						style={{
							width: 14,
							height: 14,
							borderRadius: '50%',
							backgroundColor: '#E74C3C',
							boxShadow: `0 0 ${10 + alertPulse * 14}px rgba(231,76,60,0.85)`,
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F4D03F',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.8,
							textTransform: 'uppercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						Severe Alert Activation
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
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '94%',
							minHeight: 550,
							backgroundColor: '#B3001B',
							border: '4px solid #58D68D',
							borderRadius: 34,
							boxShadow: `0 ${18 + Math.sin(frame * 0.18) * 4}px 36px rgba(0,0,0,0.45)`,
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							padding: '34px 36px 32px',
							boxSizing: 'border-box',
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 130,
								backgroundColor: 'rgba(255,255,255,0.13)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Header strip */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 20,
								height: 52,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#F4D03F',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								County Desk
							</div>
							<div
								style={{
									color: '#58D68D',
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 1.8,
									fontFamily: '"Courier New", monospace',
									whiteSpace: 'nowrap',
								}}
							>
								code: active
							</div>
						</div>

						{/* Main hero area */}
						<div
							style={{
								flex: 1,
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
									color: '#58D68D',
									fontSize: 78,
									fontWeight: 1000,
									letterSpacing: -1.8,
									lineHeight: 0.94,
									textTransform: 'uppercase',
									textAlign: 'center',
									maxWidth: 920,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									width: '84%',
									maxWidth: 820,
									backgroundColor: '#1C2733',
									border: '3px solid #F4D03F',
									borderRadius: 24,
									padding: '22px 26px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 10px 24px rgba(0,0,0,0.28)',
								}}
							>
								<div
									style={{
										color: '#F4D03F',
										fontSize: 62,
										fontWeight: 1000,
										letterSpacing: 1.2,
										lineHeight: 1,
										textAlign: 'center',
										fontFamily: '"Courier New", monospace',
										whiteSpace: 'nowrap',
										transform: `scale(${0.96 + metricReveal * 0.04})`,
									}}
								>
									{metricText}
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 14,
									backgroundColor: '#E74C3C',
									borderRadius: 16,
									padding: '12px 22px',
									boxShadow: `0 0 ${12 + alertPulse * 10}px rgba(231,76,60,0.28)`,
								}}
							>
								<div
									style={{
										width: 12,
										height: 12,
										borderRadius: '50%',
										backgroundColor: '#F4D03F',
										flexShrink: 0,
									}}
								/>
								<div
									style={{
										color: '#FFFFFF',
										fontSize: 20,
										fontWeight: 900,
										letterSpacing: 2.1,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									Commission spike confirmed
								</div>
							</div>
						</div>

						{/* Bottom ticker inside card */}
						<div
							style={{
								height: 44,
								borderTop: '2px solid rgba(88,214,141,0.45)',
								display: 'flex',
								alignItems: 'center',
								overflow: 'hidden',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									whiteSpace: 'nowrap',
									transform: `translateX(${tickerX}px)`,
									fontFamily: '"Courier New", monospace',
									fontSize: 18,
									fontWeight: 700,
									letterSpacing: 1.2,
									color: '#58D68D',
								}}
							>
								<span style={{marginRight: 28}}>MARGIN SYSTEM STABLE</span>
								<span style={{marginRight: 28, color: '#F4D03F'}}>•</span>
								<span style={{marginRight: 28}}>AUTOMATION ENGAGED</span>
								<span style={{marginRight: 28, color: '#F4D03F'}}>•</span>
								<span style={{marginRight: 28}}>SOFTWARE LEVERAGE LIVE</span>
								<span style={{marginRight: 28, color: '#F4D03F'}}>•</span>
								<span style={{marginRight: 28}}>MARGIN SYSTEM STABLE</span>
								<span style={{marginRight: 28, color: '#F4D03F'}}>•</span>
								<span style={{marginRight: 28}}>AUTOMATION ENGAGED</span>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${bottomIn}) translateY(${footerFloat}px)`,
						backgroundColor: '#58D68D',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#1C2733',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							lineHeight: 1,
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