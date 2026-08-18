import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_75() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const cardIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const badgeIn = spring({
		frame: frame - 4,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Active state / exhibit reveal
	const metricReveal = interpolate(frame, [16, 42], [0, 1], clamp);
	const exhibitOrbit = interpolate(frame, [10, 80], [-18, 14], clamp);
	const monorailX = interpolate(frame, [28, 88], [-140, 760], clamp);
	const muralPan = interpolate(frame, [0, durationInFrames], [0, -90], clamp);

	// Beat 3: Continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const bottomFloat = Math.sin(frame * 0.11 + 0.9) * 3;
	const orbitY = Math.sin(frame * 0.16) * 8;
	const shineOffset = interpolate((frame + 14) % 70, [0, 70], [-220, 980], clamp);
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -44],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const dioramaScale = interpolate(metricReveal, [0, 1], [0.92, 1], clamp);
	const metricOpacity = interpolate(metricReveal, [0, 0.35, 1], [0, 0.7, 1], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#D9A441',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Arial, sans-serif',
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
					padding: '48px 20px 40px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#F2EBDD',
						border: '3px solid #30343F',
						borderRadius: 18,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 20px rgba(48,52,63,0.18)',
					}}
				>
					<div
						style={{
							width: 18,
							height: 18,
							borderRadius: '50%',
							border: '3px solid #DD6031',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#DD6031',
							fontSize: 10,
							fontWeight: 900,
							lineHeight: 1,
						}}
					>
						1
					</div>
					<div
						style={{
							color: '#30343F',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						PAVILION EXHIBIT
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
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 544,
							backgroundColor: '#F2EBDD',
							border: '4px solid #30343F',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(48,52,63,0.22)`,
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							padding: '38px 42px 36px 42px',
							boxSizing: 'border-box',
						}}
					>
						{/* Mural background bands */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								pointerEvents: 'none',
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 34,
									left: -120 + muralPan,
									width: 420,
									height: 120,
									borderRadius: 80,
									backgroundColor: 'rgba(95,168,211,0.20)',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 112,
									right: -120 - muralPan * 0.6,
									width: 360,
									height: 90,
									borderRadius: 70,
									backgroundColor: 'rgba(221,96,49,0.16)',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									bottom: 118,
									left: 40 + muralPan * 0.45,
									width: 500,
									height: 80,
									borderRadius: 60,
									backgroundColor: 'rgba(48,52,63,0.08)',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 120,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.28), rgba(255,255,255,0))',
									transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								}}
							/>
						</div>

						{/* Top exhibit row */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								minHeight: 72,
							}}
						>
							<div
								style={{
									color: '#30343F',
									fontSize: 18,
									fontWeight: 700,
									letterSpacing: 3,
									textTransform: 'uppercase',
								}}
							>
								FUTURE OF SCALE
							</div>

							<div
								style={{
									position: 'relative',
									width: 110,
									height: 72,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										position: 'absolute',
										width: 54,
										height: 54,
										borderRadius: '50%',
										border: '3px solid #DD6031',
										backgroundColor: '#F2EBDD',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#DD6031',
										fontSize: 24,
										fontWeight: 900,
										transform: `translateX(${exhibitOrbit}px) translateY(${orbitY}px)`,
									}}
								>
									5
								</div>
								<div
									style={{
										position: 'absolute',
										width: 54,
										height: 54,
										borderRadius: '50%',
										border: '3px solid #5FA8D3',
										backgroundColor: '#F2EBDD',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										color: '#5FA8D3',
										fontSize: 24,
										fontWeight: 900,
										transform: `translateX(${-exhibitOrbit}px) translateY(${-orbitY * 0.5}px)`,
									}}
								>
									0
								</div>
							</div>
						</div>

						{/* Main content block */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								textAlign: 'center',
								flex: 1,
								gap: 26,
								padding: '10px 12px',
							}}
						>
							<div
								style={{
									color: '#5FA8D3',
									fontSize: 70,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.2,
									textTransform: 'uppercase',
									maxWidth: 760,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									transform: `scale(${dioramaScale})`,
									opacity: metricOpacity,
									backgroundColor: '#30343F',
									border: '4px solid #DD6031',
									borderRadius: 28,
									padding: '22px 34px',
									boxShadow: '0 10px 24px rgba(221,96,49,0.22)',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 10,
									minWidth: 520,
								}}
							>
								<div
									style={{
										color: '#F2EBDD',
										fontSize: 18,
										fontWeight: 700,
										letterSpacing: 3,
										textTransform: 'uppercase',
										opacity: 0.9,
									}}
								>
									COMMISSION MODEL
								</div>
								<div
									style={{
										color: '#DD6031',
										fontSize: 68,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1,
										textTransform: 'uppercase',
									}}
								>
									50% COMMISSION
								</div>
							</div>
						</div>

						{/* Bottom mural caption + monorail */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								height: 78,
								display: 'flex',
								alignItems: 'flex-end',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									position: 'absolute',
									left: 56,
									right: 56,
									bottom: 34,
									height: 4,
									backgroundColor: '#5FA8D3',
									borderRadius: 4,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									left: 56,
									bottom: 20,
									width: 90,
									height: 28,
									borderRadius: 14,
									backgroundColor: '#DD6031',
									border: '3px solid #30343F',
									transform: `translateX(${monorailX}px)`,
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 12,
										top: 6,
										width: 12,
										height: 12,
										borderRadius: '50%',
										backgroundColor: '#F2EBDD',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 32,
										top: 6,
										width: 12,
										height: 12,
										borderRadius: '50%',
										backgroundColor: '#F2EBDD',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 52,
										top: 6,
										width: 12,
										height: 12,
										borderRadius: '50%',
										backgroundColor: '#F2EBDD',
									}}
								/>
							</div>

							<div
								style={{
									backgroundColor: '#F2EBDD',
									padding: '8px 18px',
									borderRadius: 12,
									border: '2px solid #30343F',
									color: '#30343F',
									fontSize: 18,
									fontWeight: 700,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								EXHIBIT REVENUE DIORAMA
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${bottomFloat}px)`,
						backgroundColor: '#DD6031',
						border: '3px solid #30343F',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 8px 20px rgba(48,52,63,0.18)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F2EBDD',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2.2,
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