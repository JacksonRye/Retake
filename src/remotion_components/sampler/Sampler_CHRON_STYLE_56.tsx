import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_56() {
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
		config: {damping: 12, stiffness: 230, mass: 0.6},
	});

	const cardIn = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});

	const bottomIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// Beat 2: Active state switch / marker draw
	// ------------------------------------------
	const metricReveal = spring({
		frame: frame - 18,
		fps,
		config: {damping: 14, stiffness: 180, mass: 0.8},
	});

	const drawLine1 = interpolate(frame, [18, 34], [0, 1], clamp);
	const drawLine2 = interpolate(frame, [26, 42], [0, 1], clamp);
	const drawCircle = interpolate(frame, [34, 52], [0, 1], clamp);
	const drawArrow = interpolate(frame, [44, 64], [0, 1], clamp);

	const eraseSmudge = interpolate(frame, [72, 88], [0, 1], clamp);
	const focusRack = interpolate(frame, [84, 100], [0, 1], clamp);

	// ------------------------------------------
	// Beat 3: Continuous living loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const glareSweep = interpolate((frame + 10) % 70, [0, 70], [-260, 1000], clamp);
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const bottomFloat = Math.sin(frame * 0.12 + 1.2) * 3;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
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

	// ------------------------------------------
	// Rolling metric
	// ------------------------------------------
	const commissionNumber = Math.round(
		interpolate(frame, [15, 52], [12, 50], clamp)
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1A2026',
				fontFamily: '"Arial Black", "Impact", sans-serif',
				opacity,
				color: '#F4F4F4',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 14px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#39414B',
						border: '3px solid #4DD0E1',
						borderRadius: 18,
						padding: '12px 28px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.42)',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: 999,
							backgroundColor: '#4DD0E1',
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#F4F4F4',
						}}
					>
						War Room Glass
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
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 545,
							backgroundColor: '#39414B',
							border: '4px solid #4DD0E1',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.58)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* Glass glare sweep */}
						<div
							style={{
								position: 'absolute',
								top: -60,
								bottom: -60,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0))',
								transform: `translateX(${glareSweep}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Subtle focus rack / smudge layer */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background: `radial-gradient(circle at 50% 45%, rgba(255,255,255,${0.02 + focusRack * 0.03}), rgba(0,0,0,0) 55%)`,
								opacity: 1 - eraseSmudge * 0.35,
								pointerEvents: 'none',
							}}
						/>

						{/* Marker overlay lines placed away from text */}
						<svg
							viewBox="0 0 1000 620"
							style={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								pointerEvents: 'none',
								overflow: 'visible',
							}}
						>
							{/* top-left marker note line */}
							<path
								d="M 92 108 Q 186 92 262 112"
								fill="none"
								stroke="#4DD0E1"
								strokeWidth={8}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="220"
								strokeDashoffset={220 * (1 - drawLine1)}
								opacity={0.95}
							/>

							{/* underline lane under headline, with safe spacing */}
							<path
								d="M 182 236 Q 500 252 822 236"
								fill="none"
								stroke="#F4F4F4"
								strokeWidth={7}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="700"
								strokeDashoffset={700 * (1 - drawLine2)}
								opacity={0.92}
							/>

							{/* circled metric priority */}
							<ellipse
								cx="500"
								cy="390"
								rx="255"
								ry="82"
								fill="none"
								stroke="#FF8A3D"
								strokeWidth={10}
								strokeLinecap="round"
								strokeDasharray="1300"
								strokeDashoffset={1300 * (1 - drawCircle)}
								opacity={0.98}
							/>

							{/* arrow connection from right side to metric, not crossing text */}
							<path
								d="M 835 290 Q 892 324 875 372 Q 858 420 792 430"
								fill="none"
								stroke="#4DD0E1"
								strokeWidth={8}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="320"
								strokeDashoffset={320 * (1 - drawArrow)}
								opacity={0.95}
							/>
							<path
								d="M 790 430 L 822 420 L 807 452"
								fill="none"
								stroke="#4DD0E1"
								strokeWidth={8}
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="120"
								strokeDashoffset={120 * (1 - drawArrow)}
								opacity={0.95}
							/>
						</svg>

						{/* Top utility row */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#1A2026',
									border: '2px solid #4DD0E1',
									borderRadius: 999,
									padding: '8px 18px',
									fontSize: 16,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									color: '#4DD0E1',
								}}
							>
								Priority 1
							</div>

							<div
								style={{
									fontSize: 16,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									color: '#F4F4F4',
									opacity: 0.8,
								}}
							>
								Marker Review
							</div>
						</div>

						{/* Main content block */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								textAlign: 'center',
								gap: 28,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.03,
									letterSpacing: -1.4,
									textTransform: 'uppercase',
									color: '#F4F4F4',
									maxWidth: 760,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									position: 'relative',
									display: 'flex',
									alignItems: 'baseline',
									justifyContent: 'center',
									gap: 14,
									padding: '24px 34px',
									backgroundColor: '#1A2026',
									border: '3px solid #FF8A3D',
									borderRadius: 26,
									boxShadow: '0 10px 28px rgba(255,138,61,0.22)',
									transform: `scale(${0.92 + metricReveal * 0.08})`,
								}}
							>
								<div
									style={{
										fontSize: 84,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1,
										color: '#FF8A3D',
									}}
								>
									{commissionNumber}%
								</div>
								<div
									style={{
										fontSize: 38,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1.5,
										textTransform: 'uppercase',
										color: '#F4F4F4',
									}}
								>
									Commission
								</div>
							</div>
						</div>

						{/* Bottom mini strip inside card */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#4DD0E1',
									color: '#1A2026',
									borderRadius: 14,
									padding: '10px 24px',
									fontSize: 22,
									fontWeight: 900,
									letterSpacing: 2.5,
									textTransform: 'uppercase',
								}}
							>
								Systemized Revenue
							</div>
						</div>

						{/* Smudge erase swipe */}
						<div
							style={{
								position: 'absolute',
								top: '34%',
								left: interpolate(frame, [72, 88], [-280, 980], clamp),
								width: 260,
								height: 120,
								background:
									'linear-gradient(90deg, rgba(26,32,38,0), rgba(26,32,38,0.22), rgba(26,32,38,0))',
								filter: 'blur(10px)',
								opacity: eraseSmudge * 0.9,
								transform: 'rotate(-7deg)',
								pointerEvents: 'none',
							}}
						/>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway punchline */}
				<div
					style={{
						transform: `scale(${bottomIn}) translateY(${bottomFloat}px)`,
						backgroundColor: '#FF8A3D',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.42)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
							textTransform: 'uppercase',
							color: '#1A2026',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}