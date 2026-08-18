import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_70() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const heroIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const badgeIn = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Active state / metric reveal
	const metricReveal = spring({
		frame: frame - 14,
		fps,
		config: {damping: 14, stiffness: 180, mass: 0.8},
	});

	const commissionCount = Math.round(interpolate(frame, [12, 54], [12, 50], clamp));
	const metricText = `${commissionCount}% COMMISSION`;

	const signFlicker =
		frame < 18
			? [0.72, 1, 0.85, 1, 0.9, 1][frame % 6]
			: 1;

	// Beat 3: Living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const orbitSpin = frame * 2.8;
	const starburstSpin = frame * 1.6;
	const boomerangSwing = Math.sin(frame * 0.11) * 10;
	const shineOffset = interpolate((frame + 14) % 70, [0, 70], [-280, 920], clamp);

	const shadowPulse = 20 + Math.sin(frame * 0.18) * 5;

	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#5BC8AC',
				fontFamily:
					'"Trebuchet MS", "Avenir Next Rounded", "Arial Rounded MT Bold", Arial, sans-serif',
				opacity,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '42px 10px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: Category Badge */}
				<div
					style={{
						position: 'relative',
						width: 360,
						height: 110,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px) rotate(${Math.sin(
							frame * 0.05
						) * 1.2}deg)`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							width: 104,
							height: 104,
							borderRadius: '50%',
							backgroundColor: '#F4D35E',
							border: '4px solid #5D4037',
							transform: `rotate(${starburstSpin}deg)`,
							clipPath:
								'polygon(50% 0%, 61% 18%, 82% 7%, 75% 29%, 100% 50%, 75% 71%, 82% 93%, 61% 82%, 50% 100%, 39% 82%, 18% 93%, 25% 71%, 0% 50%, 25% 29%, 18% 7%, 39% 18%)',
							boxShadow: '0 8px 18px rgba(93,64,55,0.26)',
						}}
					/>
					<div
						style={{
							position: 'relative',
							backgroundColor: '#FBF5E6',
							border: '4px solid #5D4037',
							borderRadius: 22,
							padding: '14px 30px',
							boxShadow: '0 10px 22px rgba(93,64,55,0.22)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							zIndex: 2,
						}}
					>
						<div
							style={{
								color: '#F76C5E',
								fontSize: 24,
								fontWeight: 900,
								letterSpacing: 3,
								textTransform: 'uppercase',
								lineHeight: 1,
								whiteSpace: 'nowrap',
							}}
						>
							ACTIVATION CODE
						</div>
					</div>
				</div>

				{/* TIER 2: Massive Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '20px 0 18px',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* Orbit rings behind hero card */}
					<div
						style={{
							position: 'absolute',
							width: 910,
							height: 560,
							pointerEvents: 'none',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								width: 820,
								height: 430,
								borderRadius: '50%',
								border: '5px solid rgba(251,245,230,0.75)',
								transform: `rotate(${orbitSpin}deg)`,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								width: 720,
								height: 500,
								borderRadius: '50%',
								border: '4px solid rgba(244,211,94,0.85)',
								transform: `rotate(${-orbitSpin * 0.8}deg)`,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								width: 860,
								height: 360,
								borderRadius: '50%',
								border: '3px solid rgba(247,108,94,0.55)',
								transform: `rotate(${orbitSpin * 0.55}deg)`,
							}}
						/>
					</div>

					{/* Boomerang swooshes kept outside text/card zones */}
					<svg
						width="980"
						height="620"
						viewBox="0 0 980 620"
						style={{
							position: 'absolute',
							overflow: 'visible',
							pointerEvents: 'none',
						}}
					>
						<path
							d="M120 200 C 180 100, 280 85, 360 120"
							fill="none"
							stroke="#F76C5E"
							strokeWidth="10"
							strokeLinecap="round"
							opacity={0.9}
							transform={`rotate(${boomerangSwing} 240 150)`}
						/>
						<path
							d="M860 430 C 790 520, 690 540, 590 500"
							fill="none"
							stroke="#F4D35E"
							strokeWidth="10"
							strokeLinecap="round"
							opacity={0.9}
							transform={`rotate(${-boomerangSwing} 760 490)`}
						/>
					</svg>

					<div
						style={{
							width: '95%',
							maxWidth: 980,
							minHeight: 540,
							backgroundColor: '#5D4037',
							border: '5px solid #FBF5E6',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '52px 42px 44px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 36px rgba(93,64,55,0.35)`,
							textAlign: 'center',
						}}
					>
						{/* Googie sign flicker glow */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								borderRadius: 30,
								boxShadow: `inset 0 0 0 3px rgba(244,211,94,${0.45 * signFlicker}), inset 0 0 28px rgba(244,211,94,${0.22 * signFlicker})`,
								pointerEvents: 'none',
							}}
						/>

						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 140,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(251,245,230,0.2), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-24deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Decorative atomic dots far from text */}
						<div
							style={{
								position: 'absolute',
								top: 28,
								left: 28,
								width: 16,
								height: 16,
								borderRadius: '50%',
								backgroundColor: '#F4D35E',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 34,
								right: 34,
								width: 12,
								height: 12,
								borderRadius: '50%',
								backgroundColor: '#F76C5E',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 30,
								left: 42,
								width: 10,
								height: 10,
								borderRadius: '50%',
								backgroundColor: '#FBF5E6',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 34,
								right: 48,
								width: 18,
								height: 18,
								borderRadius: '50%',
								backgroundColor: '#F4D35E',
							}}
						/>

						{/* Headline */}
						<div
							style={{
								width: '100%',
								maxWidth: 840,
								color: '#FBF5E6',
								fontSize: 74,
								fontWeight: 900,
								lineHeight: 1.04,
								letterSpacing: -1.5,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							AUTOMATED MARGINS
						</div>

						{/* Metric pill */}
						<div
							style={{
								transform: `scale(${metricReveal}) rotate(${Math.sin(frame * 0.09) * 0.8}deg)`,
								backgroundColor: '#F4D35E',
								border: '5px solid #FBF5E6',
								borderRadius: 999,
								padding: '24px 42px',
								boxShadow: '0 12px 24px rgba(0,0,0,0.18)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								maxWidth: 820,
							}}
						>
							<div
								style={{
									color: '#F76C5E',
									fontSize: 64,
									fontWeight: 1000,
									lineHeight: 1,
									letterSpacing: 1,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								{metricText}
							</div>
						</div>

						{/* Bottom in-card support badge */}
						<div
							style={{
								backgroundColor: '#FBF5E6',
								border: '4px solid #F76C5E',
								borderRadius: 18,
								padding: '12px 28px',
								boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
							}}
						>
							<div
								style={{
									color: '#F76C5E',
									fontSize: 24,
									fontWeight: 900,
									letterSpacing: 3,
									textTransform: 'uppercase',
									lineHeight: 1,
									whiteSpace: 'nowrap',
								}}
							>
								TOMORROW&apos;S WORLD
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: Bottom Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1.2) * 3}px) rotate(${Math.sin(
							frame * 0.06
						) * 0.8}deg)`,
						backgroundColor: '#F76C5E',
						border: '4px solid #FBF5E6',
						borderRadius: 24,
						padding: '18px 34px',
						boxShadow: '0 10px 24px rgba(93,64,55,0.25)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FBF5E6',
							fontSize: 26,
							fontWeight: 900,
							letterSpacing: 2.5,
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