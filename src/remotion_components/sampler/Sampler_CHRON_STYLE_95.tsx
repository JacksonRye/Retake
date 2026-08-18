import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_95() {
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
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// Beat 2: Odds number roll / state activation
	const commissionValue = Math.round(interpolate(frame, [14, 58], [12, 50], clamp));
	const commissionDisplay = `${commissionValue}%`;

	const sublineOpacity = interpolate(frame, [20, 34], [0, 1], clamp);
	const sublineScale = interpolate(frame, [20, 34], [0.92, 1], clamp);

	// Chip drop accents
	const chip1Drop = interpolate(frame, [8, 24], [-120, 0], clamp);
	const chip2Drop = interpolate(frame, [12, 28], [-150, 0], clamp);
	const chip3Drop = interpolate(frame, [16, 32], [-130, 0], clamp);

	const chip1Scale = spring({
		frame: frame - 8,
		fps,
		config: {damping: 9, stiffness: 180, mass: 0.7},
	});
	const chip2Scale = spring({
		frame: frame - 12,
		fps,
		config: {damping: 9, stiffness: 180, mass: 0.7},
	});
	const chip3Scale = spring({
		frame: frame - 16,
		fps,
		config: {damping: 9, stiffness: 180, mass: 0.7},
	});

	// Beat 3: living hover + shine + bulb chase
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 72, [0, 72], [-260, 980], clamp);

	const bulbShift = (frame * 10) % 48;
	const bulbPulse = 0.72 + ((Math.sin(frame * 0.22) + 1) / 2) * 0.28;

	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const headlineFont =
		'"Arial Black", Impact, "Helvetica Neue", sans-serif';
	const serifFont =
		'"Georgia", "Times New Roman", serif';
	const numeralFont =
		'"Trebuchet MS", "Arial Black", Impact, sans-serif';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#176A4E',
				opacity,
				fontFamily: headlineFont,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '52px 18px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '12px 28px',
						borderRadius: 18,
						backgroundColor: '#F5F2EA',
						border: '3px solid #101010',
						boxShadow: '0 8px 22px rgba(16,16,16,0.28)',
					}}
				>
					<div
						style={{
							display: 'flex',
							gap: 6,
							alignItems: 'center',
						}}
					>
						{[0, 1, 2].map((i) => (
							<div
								key={i}
								style={{
									width: 10,
									height: 10,
									borderRadius: '50%',
									backgroundColor: '#E0B040',
									boxShadow: `0 0 10px rgba(224,176,64,${bulbPulse})`,
									opacity: 0.75 + i * 0.08,
								}}
							/>
						))}
					</div>
					<div
						style={{
							color: '#DA2C43',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						95 HOUSE ODDS
					</div>
				</div>

				{/* Tier 2: Hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0 18px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* Decorative chip drops kept outside text zones */}
					<div
						style={{
							position: 'absolute',
							top: 46 + chip1Drop,
							left: 34,
							width: 86,
							height: 86,
							borderRadius: '50%',
							backgroundColor: '#DA2C43',
							border: '6px solid #F5F2EA',
							boxShadow: '0 12px 24px rgba(16,16,16,0.28)',
							transform: `scale(${chip1Scale})`,
							zIndex: 2,
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 14,
								borderRadius: '50%',
								border: '4px dashed #E0B040',
							}}
						/>
					</div>

					<div
						style={{
							position: 'absolute',
							top: 96 + chip2Drop,
							right: 42,
							width: 74,
							height: 74,
							borderRadius: '50%',
							backgroundColor: '#E0B040',
							border: '5px solid #101010',
							boxShadow: '0 12px 24px rgba(16,16,16,0.22)',
							transform: `scale(${chip2Scale})`,
							zIndex: 2,
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 12,
								borderRadius: '50%',
								border: '3px dashed #F5F2EA',
							}}
						/>
					</div>

					<div
						style={{
							position: 'absolute',
							bottom: 54,
							left: 70,
							width: 62,
							height: 62,
							borderRadius: '50%',
							backgroundColor: '#101010',
							border: '5px solid #F5F2EA',
							boxShadow: '0 10px 18px rgba(16,16,16,0.26)',
							transform: `translateY(${chip3Drop}px) scale(${chip3Scale})`,
							zIndex: 2,
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 11,
								borderRadius: '50%',
								border: '3px dashed #DA2C43',
							}}
						/>
					</div>

					<div
						style={{
							width: '95%',
							minHeight: 540,
							backgroundColor: '#F5F2EA',
							border: '5px solid #101010',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(16,16,16,0.34)`,
							padding: '30px 30px 34px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							zIndex: 5,
						}}
					>
						{/* Bulb chase border */}
						<div
							style={{
								position: 'absolute',
								inset: 10,
								borderRadius: 26,
								pointerEvents: 'none',
								backgroundImage: `
                  radial-gradient(circle, rgba(224,176,64,${bulbPulse}) 0 36%, transparent 40%),
                  radial-gradient(circle, rgba(224,176,64,${bulbPulse}) 0 36%, transparent 40%),
                  radial-gradient(circle, rgba(224,176,64,${bulbPulse}) 0 36%, transparent 40%),
                  radial-gradient(circle, rgba(224,176,64,${bulbPulse}) 0 36%, transparent 40%)
                `,
								backgroundSize: `48px 12px, 48px 12px, 12px 48px, 12px 48px`,
								backgroundRepeat: 'repeat-x, repeat-x, repeat-y, repeat-y',
								backgroundPosition: `${bulbShift}px 0, ${-bulbShift}px 100%, 0 ${-bulbShift}px, 100% ${bulbShift}px`,
								opacity: 0.95,
							}}
						/>

						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.34), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top suit row */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '6px 10px 0',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									fontFamily: serifFont,
									color: '#DA2C43',
									fontSize: 34,
									fontWeight: 700,
									lineHeight: 1,
								}}
							>
								♥
							</div>
							<div
								style={{
									fontFamily: serifFont,
									color: '#101010',
									fontSize: 28,
									fontWeight: 700,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								Odds Board
							</div>
							<div
								style={{
									fontFamily: serifFont,
									color: '#DA2C43',
									fontSize: 34,
									fontWeight: 700,
									lineHeight: 1,
								}}
							>
								♦
							</div>
						</div>

						{/* Main headline block */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 20,
								marginTop: 10,
								marginBottom: 10,
								padding: '0 24px',
								boxSizing: 'border-box',
								textAlign: 'center',
							}}
						>
							<div
								style={{
									color: '#DA2C43',
									fontSize: 68,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									textShadow: '0 2px 0 rgba(224,176,64,0.2)',
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									width: '78%',
									maxWidth: 620,
									backgroundColor: '#176A4E',
									border: '4px solid #101010',
									borderRadius: 24,
									padding: '24px 20px 22px',
									boxSizing: 'border-box',
									boxShadow: 'inset 0 0 0 3px rgba(245,242,234,0.12)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 10,
								}}
							>
								<div
									style={{
										fontFamily: numeralFont,
										color: '#E0B040',
										fontSize: 82,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: 1,
										fontVariantNumeric: 'tabular-nums',
									}}
								>
									{commissionDisplay}
								</div>
								<div
									style={{
										color: '#F5F2EA',
										fontSize: 34,
										fontWeight: 900,
										lineHeight: 1,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										transform: `scale(${sublineScale})`,
										opacity: sublineOpacity,
									}}
								>
									COMMISSION
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 22,
									marginTop: 2,
								}}
							>
								<div
									style={{
										fontFamily: serifFont,
										color: '#101010',
										fontSize: 32,
										fontWeight: 700,
									}}
								>
									♠
								</div>
								<div
									style={{
										backgroundColor: '#E0B040',
										color: '#101010',
										border: '3px solid #101010',
										borderRadius: 16,
										padding: '10px 24px',
										fontSize: 22,
										fontWeight: 900,
										letterSpacing: 2.5,
										textTransform: 'uppercase',
									}}
								>
									House Advantage
								</div>
								<div
									style={{
										fontFamily: serifFont,
										color: '#101010',
										fontSize: 32,
										fontWeight: 700,
									}}
								>
									♣
								</div>
							</div>
						</div>

						{/* Bottom rail */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '0 14px 4px',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									color: '#DA2C43',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								Chip-Stack Logic
							</div>
							<div
								style={{
									color: '#101010',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								Rolling Odds
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#DA2C43',
						border: '3px solid #101010',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 8px 22px rgba(16,16,16,0.28)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F5F2EA',
							fontSize: 24,
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