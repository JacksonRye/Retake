import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_97() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Metric state roll
	const commissionNumber = Math.round(interpolate(frame, [16, 56], [18, 50], clamp));
	const metricGlow = interpolate(frame, [20, 56, 78], [0.7, 1.2, 1], clamp);
	const metricScale = interpolate(frame, [20, 56, 78], [0.96, 1.05, 1], clamp);

	// Beat 3: Living loop
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.11) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const chromeShift = interpolate((frame + 8) % 70, [0, 70], [-220, 940], clamp);
	const chromeShift2 = interpolate((frame + 34) % 88, [0, 88], [920, -260], clamp);
	const liquidBlobX = Math.sin(frame * 0.06) * 30;
	const liquidBlobY = Math.sin(frame * 0.09 + 1.4) * 20;
	const flameFlicker = 0.85 + Math.sin(frame * 0.42) * 0.08 + Math.sin(frame * 0.19) * 0.05;
	const meltScaleY = 1 + Math.max(0, Math.sin(frame * 0.1 + 0.7)) * 0.04;

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [0, -50], clamp);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const cardShadow = 24 + Math.sin(frame * 0.18) * 5;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#E1E6EE',
				opacity,
				fontFamily: '"Arial Black", Impact, "Helvetica Neue", sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						width: 420,
						height: 420,
						left: -80 + liquidBlobX,
						top: -60 + liquidBlobY,
						borderRadius: '44% 56% 63% 37% / 42% 34% 66% 58%',
						background:
							'radial-gradient(circle at 35% 35%, rgba(157,255,0,0.34), rgba(157,255,0,0.08) 45%, rgba(157,255,0,0) 72%)',
						filter: 'blur(18px)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						width: 340,
						height: 340,
						right: -40 - liquidBlobX * 0.5,
						bottom: -40 - liquidBlobY * 0.4,
						borderRadius: '57% 43% 32% 68% / 43% 59% 41% 57%',
						background:
							'radial-gradient(circle at 50% 50%, rgba(108,43,217,0.24), rgba(108,43,217,0.08) 50%, rgba(108,43,217,0) 72%)',
						filter: 'blur(20px)',
					}}
				/>
			</div>

			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '54px 18px 48px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
					zIndex: 2,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#0C0C10',
						border: '3px solid #6C2BD9',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 26px rgba(12,12,16,0.22)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							background: '#9DFF00',
							boxShadow: '0 0 14px rgba(157,255,0,0.9)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#E1E6EE',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						ACID CHROME SYSTEM
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
						margin: '24px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#0C0C10',
							border: '4px solid #0C0C10',
							borderRadius: 34,
							position: 'relative',
							overflow: 'hidden',
							padding: '42px 34px 38px',
							boxSizing: 'border-box',
							boxShadow: `0 ${cardShadow}px 48px rgba(12,12,16,0.34)`,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 24,
						}}
					>
						{/* Chrome / liquid surfaces */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(157,255,0,0.03) 16%, rgba(108,43,217,0.08) 34%, rgba(255,92,0,0.04) 52%, rgba(255,255,255,0.02) 68%, rgba(157,255,0,0.05) 100%)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 170,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.24) 48%, rgba(157,255,0,0.28) 62%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${chromeShift}px) skewX(-20deg)`,
								filter: 'blur(3px)',
								opacity: 0.85,
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: -30,
								bottom: -30,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(108,43,217,0.16) 45%, rgba(255,255,255,0.18) 55%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${chromeShift2}px) skewX(18deg)`,
								filter: 'blur(2px)',
								opacity: 0.8,
								pointerEvents: 'none',
							}}
						/>

						{/* top liquid arc headline zone */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative',
								height: 168,
								flexShrink: 0,
							}}
						>
							<svg
								width="100%"
								height="168"
								viewBox="0 0 900 168"
								style={{
									position: 'absolute',
									inset: 0,
									overflow: 'visible',
								}}
							>
								<defs>
									<linearGradient id="headlineGrad97" x1="0%" y1="0%" x2="100%" y2="0%">
										<stop offset="0%" stopColor="#FF5C00" />
										<stop offset="52%" stopColor="#9DFF00" />
										<stop offset="100%" stopColor="#6C2BD9" />
									</linearGradient>
									<filter id="headlineGlow97">
										<feGaussianBlur stdDeviation="2.2" result="blur" />
										<feMerge>
											<feMergeNode in="blur" />
											<feMergeNode in="SourceGraphic" />
										</feMerge>
									</filter>
									<path
										id="headlineCurve97"
										d="M120,124 C255,42 645,42 780,124"
									/>
								</defs>

								<path
									d="M120,124 C255,42 645,42 780,124"
									fill="none"
									stroke="rgba(157,255,0,0.16)"
									strokeWidth="3"
									strokeLinecap="round"
								/>

								<text
									fill="url(#headlineGrad97)"
									filter="url(#headlineGlow97)"
									style={{
										fontSize: 72,
										fontWeight: 1000,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									<textPath href="#headlineCurve97" startOffset="50%" textAnchor="middle">
										AUTOMATED MARGINS
									</textPath>
								</text>
							</svg>

							<div
								style={{
									position: 'absolute',
									inset: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									pointerEvents: 'none',
									opacity: flameFlicker * 0.35,
									filter: 'blur(12px)',
								}}
							>
								<div
									style={{
										width: '62%',
										height: 66,
										borderRadius: 999,
										background:
											'linear-gradient(90deg, rgba(255,92,0,0.55), rgba(157,255,0,0.42), rgba(108,43,217,0.46))',
										transform: 'translateY(6px)',
									}}
								/>
							</div>
						</div>

						{/* Metric zone */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flex: 1,
								minHeight: 190,
							}}
						>
							<div
								style={{
									width: '78%',
									maxWidth: 640,
									background:
										'linear-gradient(180deg, rgba(225,230,238,0.08) 0%, rgba(225,230,238,0.04) 100%)',
									border: '3px solid #6C2BD9',
									borderRadius: 30,
									padding: '26px 30px',
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 14,
									transform: `scale(${metricScale}) scaleY(${meltScaleY})`,
									boxShadow: `0 0 ${28 * metricGlow}px rgba(108,43,217,0.30)`,
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: '-10%',
										top: 10,
										width: '120%',
										height: 24,
										background:
											'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))',
										transform: `translateX(${Math.sin(frame * 0.07) * 18}px) skewX(-24deg)`,
										opacity: 0.8,
									}}
								/>
								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 12,
										flexWrap: 'nowrap',
										whiteSpace: 'nowrap',
									}}
								>
									<span
										style={{
											fontSize: 84,
											fontWeight: 1000,
											lineHeight: 0.95,
											color: '#9DFF00',
											textShadow:
												'0 0 10px rgba(157,255,0,0.4), 0 0 24px rgba(157,255,0,0.18)',
										}}
									>
										{commissionNumber}%
									</span>
									<span
										style={{
											fontSize: 38,
											fontWeight: 900,
											lineHeight: 1,
											color: '#E1E6EE',
											letterSpacing: 2,
											textTransform: 'uppercase',
										}}
									>
										COMMISSION
									</span>
								</div>

								<div
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											height: 10,
											width: '66%',
											borderRadius: 999,
											background: 'rgba(225,230,238,0.12)',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												height: '100%',
												width: `${interpolate(frame, [16, 56], [26, 100], clamp)}%`,
												borderRadius: 999,
												background:
													'linear-gradient(90deg, #FF5C00 0%, #9DFF00 58%, #6C2BD9 100%)',
												boxShadow: '0 0 16px rgba(157,255,0,0.45)',
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Bottom pill in hero card */}
						<div
							style={{
								backgroundColor: '#9DFF00',
								color: '#0C0C10',
								borderRadius: 16,
								padding: '12px 24px',
								fontSize: 22,
								fontWeight: 1000,
								letterSpacing: 2.2,
								textTransform: 'uppercase',
								boxShadow: '0 8px 24px rgba(157,255,0,0.22)',
								flexShrink: 0,
							}}
						>
							LIQUID CHROME MOMENTUM
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#FF5C00',
						border: '3px solid #0C0C10',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 10px 26px rgba(12,12,16,0.22)',
						textAlign: 'center',
						maxWidth: '90%',
					}}
				>
					<div
						style={{
							color: '#0C0C10',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.4,
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