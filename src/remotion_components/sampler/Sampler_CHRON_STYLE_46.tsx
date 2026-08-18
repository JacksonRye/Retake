import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_46() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: Smash-in / flash frame / badge pop
	// ------------------------------------------
	const heroIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.62},
	});

	const badgeIn = spring({
		frame: frame - 4,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});

	const takeawayIn = spring({
		frame: frame - 7,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	const flashOpacity =
		frame <= 3 ? interpolate(frame, [0, 3], [0.9, 0], clamp) : 0;

	// ------------------------------------------
	// BEAT 2: State switch / ember flare / tracking
	// ------------------------------------------
	const metricSwitch = frame >= 22;
	const metricScale = metricSwitch
		? spring({
				frame: frame - 22,
				fps,
				config: {damping: 10, stiffness: 220, mass: 0.6},
		  })
		: 0;

	const headlineTracking = interpolate(frame, [78, 122], [0, 10], clamp);
	const headlineOpacity = interpolate(frame, [0, 12, 108, 132], [0, 1, 1, 0], clamp);

	// ------------------------------------------
	// BEAT 3: Living hover / shine / shockwave blur
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;

	const shineOffset = interpolate((frame + 12) % 68, [0, 68], [-300, 980], clamp);
	const emberPulse = 0.55 + 0.45 * ((Math.sin(frame * 0.22) + 1) / 2);
	const shockwaveScale = 1 + spring({
		frame: frame - 24,
		fps,
		config: {damping: 16, stiffness: 150, mass: 0.9},
	}) * 0.22;

	const shadowPulse = 20 + Math.sin(frame * 0.18) * 5;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -56],
		clamp
	);

	const masterOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#050505',
				fontFamily: '"Impact", "Arial Black", "Helvetica Neue", sans-serif',
				opacity: masterOpacity,
				overflow: 'hidden',
			}}
		>
			{/* Flash frame */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: '#F2F2F2',
					opacity: flashOpacity,
					pointerEvents: 'none',
				}}
			/>

			{/* Background ember flares */}
			<div
				style={{
					position: 'absolute',
					left: '9%',
					top: '18%',
					width: 220,
					height: 220,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(255,107,26,0.22) 0%, rgba(255,107,26,0.08) 35%, rgba(255,107,26,0) 72%)',
					filter: 'blur(12px)',
					opacity: emberPulse * 0.8,
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					right: '10%',
					bottom: '16%',
					width: 240,
					height: 240,
					borderRadius: '50%',
					background:
						'radial-gradient(circle, rgba(15,163,177,0.18) 0%, rgba(15,163,177,0.07) 36%, rgba(15,163,177,0) 74%)',
					filter: 'blur(14px)',
					opacity: 0.75,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '52px 18px 46px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#39414B',
						border: '3px solid #0FA3B1',
						borderRadius: 16,
						padding: '12px 30px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 12,
						boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
						zIndex: 3,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#FF6B1A',
							boxShadow: `0 0 ${10 + emberPulse * 8}px rgba(255,107,26,0.9)`,
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F2F2F2',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3.2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						ACTIVATION CODE
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
						margin: '20px 0 24px',
						position: 'relative',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* Shockwave blur behind card */}
					<div
						style={{
							position: 'absolute',
							width: '86%',
							height: 410,
							borderRadius: 38,
							border: '2px solid rgba(242,242,242,0.18)',
							transform: `scale(${shockwaveScale})`,
							filter: 'blur(10px)',
							opacity: frame >= 24 && frame <= 42 ? 0.6 : 0.18,
							pointerEvents: 'none',
						}}
					/>

					<div
						style={{
							width: '100%',
							maxWidth: 1080,
							minHeight: 550,
							backgroundColor: '#39414B',
							border: '4px solid #F2F2F2',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 40px rgba(0,0,0,0.65)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '54px 44px 48px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							textAlign: 'center',
							gap: 24,
						}}
					>
						{/* Inner frame */}
						<div
							style={{
								position: 'absolute',
								inset: 14,
								borderRadius: 24,
								border: '1px solid rgba(242,242,242,0.12)',
								pointerEvents: 'none',
							}}
						/>

						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-24deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top accent bar */}
						<div
							style={{
								width: '100%',
								height: 8,
								borderRadius: 999,
								background:
									'linear-gradient(90deg, #0FA3B1 0%, #F2F2F2 45%, #FF6B1A 100%)',
								opacity: 0.95,
								flexShrink: 0,
							}}
						/>

						{/* Headline */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '6px 8px 0',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									color: '#F2F2F2',
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: `${headlineTracking}px`,
									textTransform: 'uppercase',
									opacity: headlineOpacity,
									maxWidth: 900,
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric block */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative',
								padding: '4px 0',
							}}
						>
							<div
								style={{
									backgroundColor: '#050505',
									border: '3px solid #FF6B1A',
									borderRadius: 26,
									padding: '24px 34px',
									minWidth: 720,
									boxSizing: 'border-box',
									boxShadow: `0 0 ${18 + emberPulse * 14}px rgba(255,107,26,0.22)`,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 10,
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										background:
											'linear-gradient(180deg, rgba(255,107,26,0.08) 0%, rgba(255,107,26,0) 100%)',
										pointerEvents: 'none',
									}}
								/>

								<div
									style={{
										color: '#FF6B1A',
										fontSize: 82,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: 1.5,
										textTransform: 'uppercase',
										transform: `scale(${metricSwitch ? metricScale : 0.82})`,
										transformOrigin: 'center center',
										whiteSpace: 'nowrap',
									}}
								>
									50%
								</div>

								<div
									style={{
										color: '#F2F2F2',
										fontSize: 34,
										fontWeight: 900,
										lineHeight: 1,
										letterSpacing: 4,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									COMMISSION
								</div>
							</div>
						</div>

						{/* Bottom sub-accent inside card */}
						<div
							style={{
								backgroundColor: '#0FA3B1',
								color: '#050505',
								borderRadius: 16,
								padding: '12px 24px',
								fontSize: 21,
								fontWeight: 1000,
								letterSpacing: 3.2,
								textTransform: 'uppercase',
								boxShadow: '0 8px 20px rgba(15,163,177,0.28)',
								whiteSpace: 'nowrap',
							}}
						>
							IN A WORLD OF LEVERAGE
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#FF6B1A',
						border: '3px solid rgba(242,242,242,0.22)',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.48)',
						textAlign: 'center',
						zIndex: 3,
					}}
				>
					<div
						style={{
							color: '#050505',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.8,
							textTransform: 'uppercase',
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