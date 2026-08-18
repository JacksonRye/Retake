import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_71() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 260, mass: 0.55},
	});

	const cardEntrance = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.7},
	});

	const footerEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Active metric reveal/state switch
	const metricProgress = interpolate(frame, [20, 58], [0, 50], clamp);
	const metricValue = `${Math.round(metricProgress)}%`;
	const commissionOpacity = interpolate(frame, [18, 32], [0, 1], clamp);
	const metricGlow = interpolate(frame, [28, 40, 52, 66], [0.7, 1, 0.82, 1], clamp);

	// Beat 3: Living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 0.8) * 4;
	const pulse = 0.92 + ((Math.sin(frame * 0.16) + 1) / 2) * 0.12;

	// Background synthwave motions
	const gridScroll = (frame * 14) % 40;
	const horizonZoom = interpolate(frame, [0, durationInFrames], [1, 1.12], clamp);
	const sunRise = interpolate(frame, [0, 48], [90, 0], clamp);
	const stripeShift = (frame * 10) % 48;
	const shineOffset = interpolate((frame + 10) % 70, [0, 70], [-220, 900], clamp);

	// Scene opacity / exit
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#261447',
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
				overflow: 'hidden',
			}}
		>
			{/* Background synthwave environment */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at 50% 38%, rgba(255,56,100,0.18) 0%, rgba(45,226,230,0.08) 22%, rgba(38,20,71,0) 48%)',
				}}
			/>

			{/* Sun */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: 92 + sunRise,
					width: 320,
					height: 320,
					marginLeft: -160,
					borderRadius: '50%',
					background:
						'linear-gradient(180deg, #FF6C11 0%, #FF3864 65%, #FF3864 100%)',
					boxShadow:
						'0 0 40px rgba(255,108,17,0.35), 0 0 90px rgba(255,56,100,0.28)',
					opacity: 0.92,
					transform: `scale(${pulse})`,
					overflow: 'hidden',
				}}
			>
				{Array.from({length: 7}).map((_, i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							height: 16,
							top: 42 + i * 34 + (stripeShift * 0.08),
							backgroundColor: 'rgba(13, 2, 33, 0.28)',
						}}
					/>
				))}
			</div>

			{/* Horizon glow */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: '54%',
					height: 4,
					background:
						'linear-gradient(90deg, rgba(45,226,230,0) 0%, rgba(45,226,230,0.95) 50%, rgba(45,226,230,0) 100%)',
					boxShadow:
						'0 0 18px rgba(45,226,230,0.8), 0 0 40px rgba(45,226,230,0.45)',
					transform: `scaleX(${horizonZoom})`,
				}}
			/>

			{/* Perspective grid */}
			<svg
				viewBox="0 0 1920 1080"
				preserveAspectRatio="none"
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					opacity: 0.6,
				}}
			>
				<g stroke="#2DE2E6" strokeWidth="2" fill="none">
					{Array.from({length: 12}).map((_, i) => {
						const xTop = 960 + (i - 5.5) * 38;
						const xBottom = 120 + i * 150;
						return (
							<line
								key={`v-${i}`}
								x1={xTop}
								y1={585}
								x2={xBottom}
								y2={1080}
								opacity={0.45}
							/>
						);
					})}

					{Array.from({length: 10}).map((_, i) => {
						const y = 600 + i * 38 + (gridScroll % 38);
						const inset = i * 74;
						return (
							<line
								key={`h-${i}`}
								x1={inset}
								y1={y}
								x2={1920 - inset}
								y2={y}
								opacity={Math.max(0.18, 0.52 - i * 0.035)}
							/>
						);
					})}
				</g>
			</svg>

			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '58px 18px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
					zIndex: 5,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						padding: '12px 28px',
						borderRadius: 16,
						border: '2px solid #2DE2E6',
						backgroundColor: '#0D0221',
						boxShadow:
							'0 0 14px rgba(45,226,230,0.35), 0 8px 24px rgba(0,0,0,0.35)',
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
							backgroundColor: '#FF3864',
							boxShadow: '0 0 12px rgba(255,56,100,0.9)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#2DE2E6',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							fontStyle: 'italic',
							textShadow:
								'0 0 8px rgba(45,226,230,0.8), 0 0 18px rgba(45,226,230,0.35)',
							whiteSpace: 'nowrap',
						}}
					>
						ACTIVATION CODE
					</div>
				</div>

				{/* Tier 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '24px 0 20px',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							background:
								'linear-gradient(180deg, rgba(13,2,33,0.96) 0%, rgba(24,8,54,0.98) 100%)',
							border: '4px solid #FF6C11',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '44px 42px 38px',
							position: 'relative',
							overflow: 'hidden',
							boxShadow:
								'0 0 22px rgba(255,108,17,0.25), 0 0 42px rgba(255,56,100,0.18), 0 18px 34px rgba(0,0,0,0.45)',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							textAlign: 'center',
							gap: 26,
						}}
					>
						{/* inner glow edge */}
						<div
							style={{
								position: 'absolute',
								inset: 10,
								borderRadius: 24,
								border: '2px solid rgba(45,226,230,0.5)',
								pointerEvents: 'none',
								boxShadow: 'inset 0 0 28px rgba(45,226,230,0.08)',
							}}
						/>

						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -30,
								bottom: -30,
								width: 110,
								background:
									'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								opacity: 0.7,
								pointerEvents: 'none',
							}}
						/>

						{/* top accent rail */}
						<div
							style={{
								width: '72%',
								height: 6,
								borderRadius: 999,
								background:
									'linear-gradient(90deg, #FF3864 0%, #FF6C11 50%, #2DE2E6 100%)',
								boxShadow:
									'0 0 18px rgba(255,108,17,0.55), 0 0 28px rgba(45,226,230,0.28)',
								flexShrink: 0,
							}}
						/>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 28,
								width: '100%',
								flex: 1,
							}}
						>
							<div
								style={{
									color: '#FF6C11',
									fontSize: 74,
									fontWeight: 1000,
									lineHeight: 0.98,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									fontStyle: 'italic',
									textShadow:
										'0 2px 0 #ffffff, 0 0 14px rgba(255,108,17,0.85), 0 0 30px rgba(255,56,100,0.35)',
									maxWidth: '92%',
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '22px 34px 20px',
									minWidth: 540,
									borderRadius: 26,
									background:
										'linear-gradient(180deg, rgba(38,20,71,0.9) 0%, rgba(13,2,33,1) 100%)',
									border: '3px solid #FF3864',
									boxShadow: `0 0 18px rgba(255,56,100,0.35), 0 0 28px rgba(255,108,17,0.18)`,
									transform: `scale(${metricGlow})`,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 18,
										whiteSpace: 'nowrap',
									}}
								>
									<div
										style={{
											color: '#2DE2E6',
											fontSize: 84,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: 1,
											textTransform: 'uppercase',
											fontStyle: 'italic',
											textShadow:
												'0 0 10px rgba(45,226,230,0.95), 0 0 24px rgba(45,226,230,0.38)',
										}}
									>
										{metricValue}
									</div>
									<div
										style={{
											color: '#FF3864',
											fontSize: 34,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: 3,
											textTransform: 'uppercase',
											fontStyle: 'italic',
											textShadow:
												'0 0 10px rgba(255,56,100,0.9), 0 0 22px rgba(255,56,100,0.35)',
											opacity: commissionOpacity,
										}}
									>
										COMMISSION
									</div>
								</div>
							</div>

							<div
								style={{
									padding: '12px 24px',
									borderRadius: 16,
									backgroundColor: '#2DE2E6',
									boxShadow:
										'0 0 18px rgba(45,226,230,0.45), 0 8px 22px rgba(0,0,0,0.22)',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										color: '#0D0221',
										fontSize: 20,
										fontWeight: 1000,
										letterSpacing: 3,
										textTransform: 'uppercase',
										fontStyle: 'italic',
										whiteSpace: 'nowrap',
									}}
								>
									SYNTHWAVE REVENUE STACK
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${footerEntrance}) translateY(${footerFloat}px)`,
						padding: '16px 30px',
						borderRadius: 18,
						border: '2px solid #FF3864',
						backgroundColor: '#0D0221',
						boxShadow:
							'0 0 14px rgba(255,56,100,0.35), 0 8px 24px rgba(0,0,0,0.36)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FF6C11',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							fontStyle: 'italic',
							textShadow:
								'0 0 10px rgba(255,108,17,0.8), 0 0 22px rgba(255,56,100,0.28)',
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