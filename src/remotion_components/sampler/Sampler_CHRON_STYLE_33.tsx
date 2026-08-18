import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_33() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const heroIn = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.7},
	});

	const stampIn = spring({
		frame: frame - 14,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// Beat 2: Active state switch / counter roll
	// ------------------------------------------
	const countValue = Math.round(interpolate(frame, [18, 58], [12, 50], clamp));
	const metricText = `${countValue}% COMMISSION`;

	const matchProgress = interpolate(frame, [30, 54], [0, 1], clamp);
	const heartScaleBoost = interpolate(frame, [44, 52, 60], [1, 1.18, 1], clamp);
	const heartOpacity = interpolate(frame, [28, 40], [0, 1], clamp);

	const stampSlamY = interpolate(frame, [24, 32], [-140, 0], clamp);
	const stampSlamRotate = interpolate(frame, [24, 32], [-18, -8], clamp);
	const stampImpactScale = interpolate(frame, [28, 32, 38], [0.9, 1.12, 1], clamp);

	// ------------------------------------------
	// Beat 3: Continuous living hover
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.1;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shineOffset = interpolate((frame + 16) % 72, [0, 72], [-260, 980], clamp);
	const cardShadow = 18 + Math.sin(frame * 0.18) * 4;
	const heartPulse = 1 + Math.sin(frame * 0.24) * 0.05;

	// Exit
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -60],
		clamp
	);

	// Card toss motion
	const tossRotate = interpolate(frame, [0, 16, 28], [-2.4, 1.4, 0], clamp);
	const tossX = interpolate(frame, [0, 12, 24], [60, -18, 0], clamp);

	// Starbursts
	const burstScale = interpolate(frame, [36, 48, 64], [0.3, 1, 1.08], clamp);
	const burstOpacity = interpolate(frame, [34, 40, 72], [0, 1, 0.75], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#111419',
				opacity,
				fontFamily:
					'"Arial Rounded MT Bold", "Avenir Next Rounded", "Nunito", "Trebuchet MS", sans-serif',
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
					padding: '54px 18px 38px 18px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px) rotate(-3deg)`,
						backgroundColor: '#FD297B',
						border: '3px solid #FF655B',
						borderRadius: 18,
						padding: '12px 26px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#4CD964',
							boxShadow: '0 0 10px rgba(76,217,100,0.7)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#111419',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						Swipe Logic Match
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
						transform: `scale(${heroIn}) translateY(${hoverY}px) translateX(${tossX}px) rotate(${hoverTilt + tossRotate}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#F44336',
							border: '4px solid #FF655B',
							borderRadius: 34,
							boxShadow: `0 ${cardShadow}px 34px rgba(0,0,0,0.52)`,
							padding: '46px 34px 34px 34px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 22,
						}}
					>
						{/* travelling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* tiny bio line */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								color: 'rgba(17,20,25,0.78)',
								fontSize: 14,
								fontWeight: 800,
								letterSpacing: 1.5,
								textTransform: 'uppercase',
								lineHeight: 1,
								padding: '0 2px',
								boxSizing: 'border-box',
							}}
						>
							<span>profile active</span>
							<span>match engine</span>
						</div>

						{/* top pair area */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '2px 8px 0 8px',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									width: 160,
									height: 170,
									borderRadius: 28,
									backgroundColor: '#111419',
									border: '3px solid #FD297B',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 12,
									transform: `rotate(-2deg) scale(${0.96 + matchProgress * 0.04})`,
									boxShadow: '0 10px 24px rgba(0,0,0,0.28)',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										width: 74,
										height: 74,
										borderRadius: '50%',
										backgroundColor: '#FD297B',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 30,
									}}
								>
									💼
								</div>
								<div
									style={{
										color: '#FFFFFF',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 1.5,
										textTransform: 'uppercase',
										lineHeight: 1.1,
										textAlign: 'center',
									}}
								>
									System
									<br />
									Lead
								</div>
							</div>

							<div
								style={{
									width: 168,
									height: 168,
									borderRadius: '50%',
									backgroundColor: '#111419',
									border: '4px solid #4CD964',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									transform: `scale(${heartPulse * heartScaleBoost})`,
									boxShadow: '0 10px 26px rgba(0,0,0,0.3)',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										fontSize: 76,
										lineHeight: 1,
										opacity: heartOpacity,
										filter: 'drop-shadow(0 0 16px rgba(76,217,100,0.35))',
									}}
								>
									💚
								</div>

								{/* starbursts */}
								<div
									style={{
										position: 'absolute',
										inset: -34,
										opacity: burstOpacity,
										transform: `scale(${burstScale})`,
										pointerEvents: 'none',
									}}
								>
									<svg width="236" height="236" viewBox="0 0 236 236">
										<g stroke="#FF655B" strokeWidth="6" strokeLinecap="round">
											<line x1="118" y1="18" x2="118" y2="46" />
											<line x1="118" y1="190" x2="118" y2="218" />
											<line x1="18" y1="118" x2="46" y2="118" />
											<line x1="190" y1="118" x2="218" y2="118" />
											<line x1="44" y1="44" x2="64" y2="64" />
											<line x1="172" y1="172" x2="192" y2="192" />
											<line x1="44" y1="192" x2="64" y2="172" />
											<line x1="172" y1="64" x2="192" y2="44" />
										</g>
									</svg>
								</div>
							</div>

							<div
								style={{
									width: 160,
									height: 170,
									borderRadius: 28,
									backgroundColor: '#111419',
									border: '3px solid #FF655B',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 12,
									transform: `rotate(2deg) scale(${0.96 + matchProgress * 0.04})`,
									boxShadow: '0 10px 24px rgba(0,0,0,0.28)',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										width: 74,
										height: 74,
										borderRadius: '50%',
										backgroundColor: '#FF655B',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: 30,
									}}
								>
									🤖
								</div>
								<div
									style={{
										color: '#FFFFFF',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 1.5,
										textTransform: 'uppercase',
										lineHeight: 1.1,
										textAlign: 'center',
									}}
								>
									Software
									<br />
									Scale
								</div>
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								width: '100%',
								padding: '0 18px',
								boxSizing: 'border-box',
								textAlign: 'center',
							}}
						>
							<div
								style={{
									color: '#111419',
									fontSize: 68,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.8,
									textTransform: 'uppercase',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric pill */}
						<div
							style={{
								backgroundColor: '#111419',
								border: '4px solid #FD297B',
								borderRadius: 28,
								padding: '18px 34px',
								boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								minWidth: 540,
								maxWidth: '92%',
							}}
						>
							<div
								style={{
									color: '#FD297B',
									fontSize: 58,
									fontWeight: 1000,
									lineHeight: 1,
									letterSpacing: -0.5,
									textTransform: 'uppercase',
									textAlign: 'center',
									whiteSpace: 'nowrap',
								}}
							>
								{metricText}
							</div>
						</div>

						{/* Bottom micro row */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '0 8px',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									backgroundColor: '#4CD964',
									color: '#111419',
									borderRadius: 12,
									padding: '8px 14px',
									fontSize: 15,
									fontWeight: 900,
									letterSpacing: 1.4,
									textTransform: 'uppercase',
									lineHeight: 1,
									whiteSpace: 'nowrap',
								}}
							>
								approved
							</div>
							<div
								style={{
									color: 'rgba(17,20,25,0.82)',
									fontSize: 14,
									fontWeight: 900,
									letterSpacing: 1.5,
									textTransform: 'uppercase',
									lineHeight: 1,
									whiteSpace: 'nowrap',
								}}
							>
								bio: recurring digital revenue
							</div>
						</div>

						{/* Stamp */}
						<div
							style={{
								position: 'absolute',
								top: 94,
								right: 44,
								transform: `translateY(${stampSlamY}px) rotate(${stampSlamRotate}deg) scale(${stampIn * stampImpactScale})`,
								backgroundColor: '#FD297B',
								color: '#FFFFFF',
								border: '4px solid #111419',
								borderRadius: 20,
								padding: '12px 18px',
								boxShadow: '0 12px 20px rgba(0,0,0,0.28)',
								zIndex: 5,
							}}
						>
							<div
								style={{
									fontSize: 24,
									fontWeight: 1000,
									letterSpacing: 2.5,
									textTransform: 'uppercase',
									lineHeight: 1,
									whiteSpace: 'nowrap',
								}}
							>
								IT&apos;S A MATCH
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px) rotate(-2deg)`,
						backgroundColor: '#4CD964',
						borderRadius: 20,
						padding: '16px 30px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.34)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#111419',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
							textTransform: 'uppercase',
							lineHeight: 1.05,
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