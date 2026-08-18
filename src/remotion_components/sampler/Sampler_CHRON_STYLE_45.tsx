import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_45() {
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
		frame,
		fps,
		config: {damping: 14, stiffness: 220, mass: 0.65},
	});

	const cardIn = spring({
		frame: frame - 4,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 15, stiffness: 190, mass: 0.7},
	});

	// ==========================================
	// BEAT 2: ACTIVE STATE / METRIC REVEAL
	// ==========================================
	const metricReveal = interpolate(frame, [18, 48], [0, 1], clamp);
	const metricOpacity = interpolate(frame, [14, 24, 120, 134], [0, 1, 1, 0], clamp);
	const metricLift = interpolate(frame, [18, 48], [20, 0], clamp);
	const commissionWipe = interpolate(frame, [22, 56], [0, 1], clamp);

	// ==========================================
	// BEAT 3: CONTINUOUS LIVING MOTION
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.6;
	const vignetteBreath = 0.38 + ((Math.sin(frame * 0.06) + 1) / 2) * 0.1;
	const shineOffset = interpolate((frame + 8) % 70, [0, 70], [-280, 900], clamp);

	// Overall crawl upward
	const crawlY = interpolate(frame, [0, durationInFrames - 1], [90, -58], clamp);

	// Exit
	const globalOpacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const cardOpacity = interpolate(frame, [0, 10, 116, 134], [0, 1, 1, 0], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#000000',
				fontFamily: '"Times New Roman", "Georgia", "Palatino Linotype", serif',
				opacity: globalOpacity,
				overflow: 'hidden',
			}}
		>
			{/* Breathing vignette */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `radial-gradient(circle at center, rgba(0,0,0,0) 34%, rgba(0,0,0,${vignetteBreath}) 100%)`,
					pointerEvents: 'none',
				}}
			/>

			{/* Subtle film glow */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(180deg, rgba(237,237,237,0.03) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 72%, rgba(237,237,237,0.02) 100%)',
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					transform: `translateY(${crawlY}px)`,
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
						padding: '42px 18px 34px',
						boxSizing: 'border-box',
					}}
				>
					{/* TIER 1: CATEGORY BADGE */}
					<div
						style={{
							transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
							border: '1.5px solid #6B6B6B',
							borderRadius: 999,
							padding: '10px 28px',
							backgroundColor: 'rgba(57, 65, 75, 0.42)',
							boxShadow: '0 0 0 1px rgba(201,166,86,0.08) inset',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							backdropFilter: 'blur(2px)',
						}}
					>
						<div
							style={{
								color: '#C9A656',
								fontSize: 18,
								fontWeight: 700,
								letterSpacing: 4,
								textTransform: 'uppercase',
								fontVariant: 'small-caps',
								whiteSpace: 'nowrap',
							}}
						>
							End Credit Sequence
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
							margin: '26px 0',
							position: 'relative',
							transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
							opacity: cardOpacity,
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 540,
								borderRadius: 30,
								backgroundColor: '#39414B',
								border: '2px solid rgba(201,166,86,0.7)',
								boxShadow:
									'0 28px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(237,237,237,0.06) inset',
								padding: '52px 44px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								textAlign: 'center',
								position: 'relative',
								overflow: 'hidden',
								gap: 24,
							}}
						>
							{/* inner frame */}
							<div
								style={{
									position: 'absolute',
									inset: 18,
									borderRadius: 20,
									border: '1px solid rgba(237,237,237,0.16)',
									pointerEvents: 'none',
								}}
							/>

							{/* traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									width: 120,
									background:
										'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(237,237,237,0.15) 50%, rgba(255,255,255,0) 100%)',
									transform: `translateX(${shineOffset}px) skewX(-18deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Header line */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 12,
									width: '100%',
								}}
							>
								<div
									style={{
										width: 140,
										height: 2,
										backgroundColor: '#C9A656',
										opacity: 0.9,
									}}
								/>
								<div
									style={{
										color: '#6B6B6B',
										fontSize: 20,
										letterSpacing: 6,
										textTransform: 'uppercase',
										fontVariant: 'small-caps',
										whiteSpace: 'nowrap',
									}}
								>
									Featured Result
								</div>
							</div>

							{/* Massive headline */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '0 8px',
								}}
							>
								<div
									style={{
										color: '#EDEDED',
										fontSize: 72,
										lineHeight: 1.02,
										fontWeight: 700,
										letterSpacing: 1.5,
										textTransform: 'uppercase',
										fontVariant: 'small-caps',
										textShadow: '0 2px 18px rgba(0,0,0,0.35)',
										maxWidth: 760,
									}}
								>
									AUTOMATED MARGINS
								</div>
							</div>

							{/* Metric panel */}
							<div
								style={{
									width: '78%',
									maxWidth: 640,
									borderRadius: 22,
									border: '1.5px solid rgba(201,166,86,0.9)',
									background:
										'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.1) 100%)',
									padding: '24px 20px 22px',
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 10,
									opacity: metricOpacity,
									transform: `translateY(${metricLift}px) scale(${0.94 + metricReveal * 0.06})`,
								}}
							>
								<div
									style={{
										color: '#6B6B6B',
										fontSize: 18,
										letterSpacing: 5,
										textTransform: 'uppercase',
										fontVariant: 'small-caps',
										whiteSpace: 'nowrap',
									}}
								>
									Commission Structure
								</div>

								<div
									style={{
										position: 'relative',
										display: 'inline-block',
										padding: '4px 10px',
									}}
								>
									<div
										style={{
											color: '#EDEDED',
											fontSize: 64,
											lineHeight: 1,
											fontWeight: 700,
											letterSpacing: 1.2,
											textTransform: 'uppercase',
											fontVariant: 'small-caps',
											whiteSpace: 'nowrap',
										}}
									>
										50% COMMISSION
									</div>

									<div
										style={{
											position: 'absolute',
											left: 0,
											bottom: -4,
											height: 3,
											width: `${commissionWipe * 100}%`,
											backgroundColor: '#C9A656',
											borderRadius: 999,
										}}
									/>
								</div>
							</div>

							{/* Footer label */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 12,
									width: '100%',
								}}
							>
								<div
									style={{
										color: '#C9A656',
										fontSize: 22,
										fontWeight: 700,
										letterSpacing: 4,
										textTransform: 'uppercase',
										fontVariant: 'small-caps',
										whiteSpace: 'nowrap',
									}}
								>
									Centered System Advantage
								</div>
								<div
									style={{
										width: 180,
										height: 2,
										backgroundColor: 'rgba(201,166,86,0.85)',
									}}
								/>
							</div>
						</div>
					</div>

					{/* TIER 3: TAKEAWAY */}
					<div
						style={{
							transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
							padding: '14px 34px',
							borderTop: '1px solid rgba(201,166,86,0.95)',
							borderBottom: '1px solid rgba(201,166,86,0.95)',
							backgroundColor: 'rgba(0,0,0,0.22)',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								color: '#EDEDED',
								fontSize: 24,
								fontWeight: 700,
								letterSpacing: 4,
								textTransform: 'uppercase',
								fontVariant: 'small-caps',
								whiteSpace: 'nowrap',
							}}
						>
							PURE SOFTWARE LEVERAGE
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}