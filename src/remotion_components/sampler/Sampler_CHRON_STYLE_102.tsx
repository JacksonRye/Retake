import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_102() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Inflate-from-flat entrances
	const badgeSpring = spring({
		frame: frame - 2,
		fps,
		config: {damping: 10, stiffness: 230, mass: 0.55},
	});

	const cardSpring = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});

	const takeawaySpring = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.7},
	});

	// Beat 2: State switch / metric reveal
	const metricPop = spring({
		frame: frame - 16,
		fps,
		config: {damping: 9, stiffness: 240, mass: 0.5},
	});

	const commissionOpacity = interpolate(frame, [14, 24], [0, 1], clamp);
	const percentScale = interpolate(frame, [12, 20, 28], [0.4, 1.18, 1], clamp);
	const commissionSlide = interpolate(frame, [14, 24], [28, 0], clamp);

	// Beat 3: living hover / air wobble / shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.09) * 1.8;
	const badgeWobble = Math.sin(frame * 0.16) * 2.5;
	const takeawayWobble = Math.sin(frame * 0.13 + 0.7) * 2.5;
	const puffScaleX = 1 + Math.sin(frame * 0.22) * 0.018;
	const puffScaleY = 1 + Math.sin(frame * 0.22 + 1.3) * 0.02;
	const shadowPulse = 22 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 10) % 70, [0, 70], [-260, 980], clamp);

	// Inflate / squash feel
	const cardInflateX = interpolate(cardSpring, [0, 0.45, 0.7, 1], [0.08, 1.08, 0.97, 1], clamp);
	const cardInflateY = interpolate(cardSpring, [0, 0.45, 0.7, 1], [0.02, 1.12, 0.96, 1], clamp);
	const badgeInflateX = interpolate(badgeSpring, [0, 0.45, 0.7, 1], [0.15, 1.06, 0.98, 1], clamp);
	const badgeInflateY = interpolate(badgeSpring, [0, 0.45, 0.7, 1], [0.04, 1.1, 0.98, 1], clamp);
	const takeawayInflateX = interpolate(
		takeawaySpring,
		[0, 0.45, 0.7, 1],
		[0.18, 1.05, 0.985, 1],
		clamp
	);
	const takeawayInflateY = interpolate(
		takeawaySpring,
		[0, 0.45, 0.7, 1],
		[0.05, 1.1, 0.98, 1],
		clamp
	);

	const metricBoxScale = interpolate(metricPop, [0, 0.55, 0.78, 1], [0.4, 1.12, 0.96, 1], clamp);

	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -36], clamp);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FF6FB5',
				opacity,
				fontFamily:
					'"Arial Black", "Impact", "Trebuchet MS", system-ui, sans-serif',
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
					padding: '44px 12px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scaleX(${badgeInflateX}) scaleY(${badgeInflateY}) translateY(${badgeWobble}px)`,
						transformOrigin: 'center center',
						backgroundColor: '#FFFFFF',
						border: '4px solid #B197FC',
						borderRadius: 999,
						padding: '14px 34px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 12px 0 rgba(177,151,252,0.9)',
					}}
				>
					<div
						style={{
							color: '#5FB9FF',
							fontSize: 21,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							lineHeight: 1,
							textShadow: '0 2px 0 rgba(255,255,255,0.9)',
						}}
					>
						VALUE CREATION
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
						margin: '24px 0 20px',
						position: 'relative',
						transform: `translateY(${hoverY}px) rotate(${hoverTilt}deg) scaleX(${cardInflateX * puffScaleX}) scaleY(${cardInflateY * puffScaleY})`,
						transformOrigin: 'center center',
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 540,
							backgroundColor: '#FFFFFF',
							border: '6px solid #B197FC',
							borderRadius: 40,
							boxSizing: 'border-box',
							padding: '42px 34px 38px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `
                0 ${shadowPulse}px 0 rgba(177,151,252,0.95),
                0 ${shadowPulse + 16}px 36px rgba(0,0,0,0.18)
              `,
						}}
					>
						{/* glossy top bloom */}
						<div
							style={{
								position: 'absolute',
								top: 14,
								left: 22,
								right: 22,
								height: 120,
								borderRadius: 999,
								background:
									'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0) 100%)',
								pointerEvents: 'none',
							}}
						/>

						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 140,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,212,59,0.22) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top decorative balloons / puffs - safely separated from text */}
						<div
							style={{
								position: 'absolute',
								top: 26,
								left: 30,
								display: 'flex',
								gap: 12,
								pointerEvents: 'none',
							}}
						>
							<div
								style={{
									width: 28,
									height: 28,
									borderRadius: '50%',
									backgroundColor: '#FFD43B',
									boxShadow: 'inset -5px -6px 0 rgba(255,255,255,0.45)',
								}}
							/>
							<div
								style={{
									width: 22,
									height: 22,
									borderRadius: '50%',
									backgroundColor: '#5FB9FF',
									boxShadow: 'inset -4px -5px 0 rgba(255,255,255,0.45)',
								}}
							/>
						</div>

						<div
							style={{
								position: 'absolute',
								top: 24,
								right: 30,
								display: 'flex',
								gap: 10,
								pointerEvents: 'none',
							}}
						>
							<div
								style={{
									width: 24,
									height: 24,
									borderRadius: '50%',
									backgroundColor: '#B197FC',
									boxShadow: 'inset -4px -5px 0 rgba(255,255,255,0.42)',
								}}
							/>
							<div
								style={{
									width: 18,
									height: 18,
									borderRadius: '50%',
									backgroundColor: '#FFD43B',
									boxShadow: 'inset -3px -4px 0 rgba(255,255,255,0.42)',
								}}
							/>
						</div>

						{/* Layout content with generous spacing to ensure zero collisions */}
						<div
							style={{
								width: '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 24,
								paddingTop: 48,
								paddingBottom: 6,
								boxSizing: 'border-box',
								position: 'relative',
								zIndex: 2,
								textAlign: 'center',
							}}
						>
							<div
								style={{
									maxWidth: 760,
									color: '#5FB9FF',
									fontSize: 68,
									fontWeight: 1000,
									lineHeight: 0.96,
									letterSpacing: -1.6,
									textTransform: 'uppercase',
									textShadow: `
                    0 5px 0 #FFFFFF,
                    0 9px 0 #FFD43B
                  `,
								}}
							>
								AUTOMATED
								<br />
								MARGINS
							</div>

							<div
								style={{
									transform: `scale(${metricBoxScale})`,
									backgroundColor: '#FFD43B',
									border: '5px solid #5FB9FF',
									borderRadius: 32,
									padding: '24px 34px 22px',
									boxShadow: '0 12px 0 rgba(95,185,255,0.95)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									minWidth: 520,
									maxWidth: 700,
								}}
							>
								<div
									style={{
										color: '#FFFFFF',
										fontSize: 74,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: -1.5,
										textTransform: 'uppercase',
										transform: `scale(${percentScale})`,
										textShadow: `
                      0 4px 0 #5FB9FF,
                      0 8px 0 rgba(95,185,255,0.65)
                    `,
										whiteSpace: 'nowrap',
									}}
								>
									50%
								</div>

								<div
									style={{
										marginTop: 10,
										opacity: commissionOpacity,
										transform: `translateY(${commissionSlide}px)`,
										color: '#5FB9FF',
										fontSize: 40,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1,
										textTransform: 'uppercase',
										textShadow: '0 3px 0 rgba(255,255,255,0.9)',
										whiteSpace: 'nowrap',
									}}
								>
									COMMISSION
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#B197FC',
									border: '4px solid #FFFFFF',
									borderRadius: 999,
									padding: '14px 28px',
									boxShadow: '0 10px 0 rgba(255,255,255,0.9)',
								}}
							>
								<div
									style={{
										color: '#FFFFFF',
										fontSize: 24,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									BALLOONED PROFIT
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scaleX(${takeawayInflateX}) scaleY(${takeawayInflateY}) translateY(${takeawayWobble}px)`,
						transformOrigin: 'center center',
						backgroundColor: '#FFFFFF',
						border: '4px solid #5FB9FF',
						borderRadius: 26,
						padding: '18px 30px',
						boxShadow: '0 12px 0 rgba(95,185,255,0.92)',
						textAlign: 'center',
						maxWidth: 860,
					}}
				>
					<div
						style={{
							color: '#5FB9FF',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.1,
							lineHeight: 1.05,
							textTransform: 'uppercase',
							textShadow: '0 2px 0 rgba(255,255,255,0.95)',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}