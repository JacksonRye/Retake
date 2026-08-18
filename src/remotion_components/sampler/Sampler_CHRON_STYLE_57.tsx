import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_57() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1: SNAPPY ENTRANCE
	// ==========================================
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 260, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	const slabSlideX = interpolate(frame, [0, 14], [120, 0], clamp);
	const slabShadowShift = interpolate(frame, [0, 18], [24, 12], clamp);

	// ==========================================
	// BEAT 2: ACTIVE METRIC STATE TRANSFORMATION
	// ==========================================
	const metricBoxPop = spring({
		frame: frame - 20,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.6},
	});

	const commissionValue = Math.round(interpolate(frame, [18, 58], [12, 50], clamp));
	const metricReveal = interpolate(frame, [18, 32], [0, 1], clamp);

	const clickFrame = frame >= 44 && frame <= 50;
	const metricThunk = clickFrame ? 10 : 0;
	const shadowKick = clickFrame ? 4 : 0;

	// ==========================================
	// BEAT 3: LIVING LOOP
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const dustFloatA = Math.sin(frame * 0.09) * 10;
	const dustFloatB = Math.sin(frame * 0.11 + 1.2) * 8;
	const dustFloatC = Math.sin(frame * 0.07 + 2.3) * 12;
	const shineOffset = interpolate((frame + 14) % 65, [0, 65], [-260, 980], clamp);

	// ==========================================
	// EXIT
	// ==========================================
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const hardShadow = `${slabShadowShift + shadowKick}px ${slabShadowShift + shadowKick}px 0px #1A1A1A`;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#8E8A82',
				fontFamily: '"Arial Black", Impact, "Helvetica Neue", sans-serif',
				opacity,
				overflow: 'hidden',
			}}
		>
			{/* Dust / concrete atmosphere */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					pointerEvents: 'none',
					opacity: 0.2,
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 130 + dustFloatA,
						left: 120,
						width: 18,
						height: 18,
						borderRadius: '50%',
						backgroundColor: '#E8E5DF',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: 220 + dustFloatB,
						right: 160,
						width: 12,
						height: 12,
						borderRadius: '50%',
						backgroundColor: '#1A1A1A',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: 540 + dustFloatC,
						left: 220,
						width: 10,
						height: 10,
						borderRadius: '50%',
						backgroundColor: '#E85D04',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: 590 + dustFloatA * 0.6,
						right: 260,
						width: 14,
						height: 14,
						borderRadius: '50%',
						backgroundColor: '#E8E5DF',
					}}
				/>
			</div>

			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					padding: '36px 18px 42px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `translateY(${Math.sin(frame * 0.1) * 3}px) scale(${badgeIn})`,
						backgroundColor: '#1A1A1A',
						color: '#E8E5DF',
						padding: '12px 28px',
						border: '3px solid #E8E5DF',
						boxShadow: '8px 8px 0 #39414B',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						alignSelf: 'flex-start',
						marginLeft: 18,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							backgroundColor: '#E85D04',
						}}
					/>
					<div
						style={{
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							lineHeight: 1,
						}}
					>
						CONCRETE POSTER
					</div>
				</div>

				{/* TIER 2: MASSIVE HERO CARD */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '18px 0 20px',
						position: 'relative',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 550,
							backgroundColor: '#39414B',
							border: '4px solid #1A1A1A',
							boxShadow: hardShadow,
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							padding: '42px 42px 38px',
							boxSizing: 'border-box',
							transform: `translateX(${slabSlideX}px) translateY(${metricThunk}px)`,
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								backgroundColor: 'rgba(232,229,223,0.09)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Header rail */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 12,
							}}
						>
							<div
								style={{
									width: 120,
									height: 12,
									backgroundColor: '#E85D04',
									boxShadow: '6px 6px 0 #1A1A1A',
									flexShrink: 0,
								}}
							/>
							<div
								style={{
									width: 180,
									height: 12,
									backgroundColor: '#E8E5DF',
									boxShadow: '6px 6px 0 #1A1A1A',
									flexShrink: 0,
								}}
							/>
						</div>

						{/* Massive headline */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
								alignItems: 'flex-start',
								justifyContent: 'center',
								flex: 1,
							}}
						>
							<div
								style={{
									fontSize: 82,
									fontWeight: 1000,
									lineHeight: 0.9,
									letterSpacing: -2.5,
									textTransform: 'uppercase',
									color: '#E8E5DF',
									textShadow: '8px 8px 0 #1A1A1A',
								}}
							>
								AUTOMATED
							</div>
							<div
								style={{
									fontSize: 82,
									fontWeight: 1000,
									lineHeight: 0.9,
									letterSpacing: -2.5,
									textTransform: 'uppercase',
									color: '#E8E5DF',
									textShadow: '8px 8px 0 #1A1A1A',
								}}
							>
								MARGINS
							</div>
						</div>

						{/* Metric zone */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-start',
								alignItems: 'center',
								marginTop: 22,
							}}
						>
							<div
								style={{
									transform: `scale(${metricBoxPop})`,
									backgroundColor: '#E8E5DF',
									border: '4px solid #1A1A1A',
									boxShadow: `${10 + shadowKick}px ${10 + shadowKick}px 0 #E85D04`,
									padding: '22px 28px 18px',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									gap: 10,
									minWidth: 430,
								}}
							>
								<div
									style={{
										fontSize: 24,
										fontWeight: 900,
										letterSpacing: 2,
										lineHeight: 1,
										textTransform: 'uppercase',
										color: '#39414B',
									}}
								>
									COMMISSION
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										gap: 12,
										opacity: metricReveal,
									}}
								>
									<div
										style={{
											fontSize: 84,
											fontWeight: 1000,
											lineHeight: 0.9,
											letterSpacing: -2,
											color: '#1A1A1A',
										}}
									>
										{commissionValue}%
									</div>
									<div
										style={{
											fontSize: 34,
											fontWeight: 1000,
											lineHeight: 1,
											textTransform: 'uppercase',
											color: '#E85D04',
										}}
									>
										CUT
									</div>
								</div>
							</div>
						</div>

						{/* Bottom accent rail inside card */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginTop: 26,
								gap: 20,
							}}
						>
							<div
								style={{
									width: 220,
									height: 14,
									backgroundColor: '#1A1A1A',
									boxShadow: '6px 6px 0 #E8E5DF',
									flexShrink: 0,
								}}
							/>
							<div
								style={{
									width: 120,
									height: 14,
									backgroundColor: '#E85D04',
									boxShadow: '6px 6px 0 #1A1A1A',
									flexShrink: 0,
								}}
							/>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#1A1A1A',
						border: '3px solid #E8E5DF',
						boxShadow: '10px 10px 0 #E85D04',
						padding: '16px 28px',
						textAlign: 'center',
						maxWidth: 860,
					}}
				>
					<div
						style={{
							color: '#E8E5DF',
							fontSize: 28,
							fontWeight: 1000,
							letterSpacing: 2.2,
							lineHeight: 1.05,
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