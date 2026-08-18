import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_39() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 14, stiffness: 180, mass: 0.8},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 170, mass: 0.9},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 14, stiffness: 180, mass: 0.85},
	});

	// Beat 2: state switch / metric fade
	const headlineOpacity = interpolate(frame, [0, 16, 92, 108], [0, 1, 1, 0.72], clamp);
	const metricOpacity = interpolate(frame, [18, 34, 120, 132], [0, 1, 1, 0], clamp);
	const metricScale = interpolate(frame, [18, 36], [0.96, 1], clamp);

	// Beat 3: living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.2;
	const slowZoom = interpolate(frame, [0, durationInFrames - 1], [1, 1.018], clamp);
	const grainShift = (frame * 1.7) % 120;
	const shineOffset = interpolate((frame + 20) % 90, [0, 90], [-280, 980], clamp);

	// Gentle fades
	const wholeOpacity = interpolate(
		frame,
		[0, 10, durationInFrames - 12, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 14, durationInFrames - 1],
		[0, -16],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#E8E2D6',
				opacity: wholeOpacity,
				fontFamily:
					'"Georgia", "Times New Roman", "Iowan Old Style", serif',
				color: '#7E9B95',
				overflow: 'hidden',
			}}
		>
			{/* soft paper grain */}
			<div
				style={{
					position: 'absolute',
					inset: -80,
					opacity: 0.12,
					backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(46,44,41,0.10) 0 1px, transparent 1.2px),
            radial-gradient(circle at 70% 40%, rgba(126,155,149,0.10) 0 1px, transparent 1.2px),
            radial-gradient(circle at 40% 80%, rgba(201,154,142,0.10) 0 1px, transparent 1.2px)
          `,
					backgroundSize: '24px 24px, 28px 28px, 32px 32px',
					transform: `translate(${grainShift * 0.18}px, ${grainShift * 0.1}px) scale(1.08)`,
					pointerEvents: 'none',
				}}
			/>

			{/* overall slow zoom wrapper */}
			<div
				style={{
					width: '100%',
					height: '100%',
					transform: `scale(${slowZoom}) translateY(${exitY}px)`,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
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
						padding: '58px 18px 46px',
						boxSizing: 'border-box',
					}}
				>
					{/* Tier 1: badge */}
					<div
						style={{
							transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
							border: '1.5px solid #B9B3A6',
							backgroundColor: 'rgba(185,179,166,0.24)',
							borderRadius: 999,
							padding: '12px 34px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0 10px 30px rgba(46,44,41,0.06)',
						}}
					>
						<div
							style={{
								fontSize: 18,
								lineHeight: 1,
								letterSpacing: 6,
								textTransform: 'lowercase',
								color: '#7E9B95',
								textAlign: 'center',
								whiteSpace: 'nowrap',
							}}
						>
							quiet system
						</div>
					</div>

					{/* Tier 2: hero card */}
					<div
						style={{
							width: '100%',
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							margin: '26px 0',
							transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 540,
								borderRadius: 34,
								backgroundColor: '#B9B3A6',
								border: '1.5px solid rgba(46,44,41,0.16)',
								boxShadow: '0 22px 50px rgba(46,44,41,0.10)',
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '58px 44px 54px',
								boxSizing: 'border-box',
								textAlign: 'center',
							}}
						>
							{/* slow highlight wash */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 160,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.20), rgba(255,255,255,0))',
									transform: `translateX(${shineOffset}px) skewX(-18deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* decorative line top - safely away from text */}
							<div
								style={{
									width: '78%',
									height: 1,
									backgroundColor: 'rgba(126,155,149,0.42)',
									marginTop: 2,
									flexShrink: 0,
								}}
							/>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 34,
									width: '100%',
									flex: 1,
								}}
							>
								<div
									style={{
										opacity: headlineOpacity,
										color: '#7E9B95',
										fontSize: 68,
										fontWeight: 500,
										lineHeight: 1.08,
										letterSpacing: 8,
										textTransform: 'lowercase',
										maxWidth: '88%',
									}}
								>
									automated margins
								</div>

								<div
									style={{
										opacity: metricOpacity,
										transform: `scale(${metricScale})`,
										padding: '20px 34px 18px',
										borderRadius: 24,
										backgroundColor: 'rgba(232,226,214,0.72)',
										border: '1.5px solid rgba(201,154,142,0.72)',
										minWidth: 560,
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											color: '#2E2C29',
											fontSize: 60,
											fontWeight: 500,
											lineHeight: 1.04,
											letterSpacing: 6,
											textTransform: 'lowercase',
											whiteSpace: 'nowrap',
										}}
									>
										50% commission
									</div>
								</div>

								<div
									style={{
										opacity: interpolate(frame, [40, 58], [0, 1], clamp),
										color: '#C99A8E',
										fontSize: 24,
										fontWeight: 500,
										lineHeight: 1.2,
										letterSpacing: 7,
										textTransform: 'lowercase',
										whiteSpace: 'nowrap',
									}}
								>
									quietly compounding
								</div>
							</div>

							{/* decorative line bottom - safely away from text */}
							<div
								style={{
									width: '78%',
									height: 1,
									backgroundColor: 'rgba(126,155,149,0.42)',
									marginBottom: 2,
									flexShrink: 0,
								}}
							/>
						</div>
					</div>

					{/* Tier 3: takeaway */}
					<div
						style={{
							transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 2}px)`,
							padding: '14px 28px',
							borderTop: '1.5px solid rgba(126,155,149,0.40)',
							borderBottom: '1.5px solid rgba(126,155,149,0.40)',
							backgroundColor: 'rgba(232,226,214,0.34)',
						}}
					>
						<div
							style={{
								color: '#7E9B95',
								fontSize: 22,
								fontWeight: 500,
								letterSpacing: 6,
								lineHeight: 1.2,
								textTransform: 'lowercase',
								textAlign: 'center',
								whiteSpace: 'nowrap',
							}}
						>
							pure software leverage
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}