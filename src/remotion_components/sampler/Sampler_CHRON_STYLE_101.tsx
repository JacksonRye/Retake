import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_101() {
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
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});
	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});
	const bottomIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	// Beat 2: metric switch / rolling emphasis
	const commissionBoxScale = interpolate(
		frame,
		[26, 38, 48, 60],
		[1, 1.08, 0.98, 1],
		clamp
	);
	const slashWipe = interpolate(frame, [20, 52], [-420, 780], clamp);
	const metricStampRotate = interpolate(frame, [18, 34], [-2.2, 0.8], clamp);

	// Beat 3: living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const bottomFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-300, 980], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -60],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#E9DFC9',
				opacity,
				fontFamily:
					'"Arial Black", Impact, Haettenschweiler, "Helvetica Neue", sans-serif',
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
					padding: '52px 20px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) rotate(-1.8deg) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						padding: '12px 24px',
						backgroundColor: '#191714',
						border: '3px solid #C3423F',
						boxShadow: '0 10px 24px rgba(25,23,20,0.22)',
						borderRadius: 10,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							backgroundColor: '#D9A31B',
							borderRadius: 2,
							transform: 'rotate(12deg)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#E9DFC9',
							fontSize: 21,
							fontWeight: 900,
							letterSpacing: 3.2,
							textTransform: 'uppercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						CHRON SYSTEM
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
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '95%',
							maxWidth: 1080,
							minHeight: 550,
							backgroundColor: '#191714',
							border: '4px solid #C3423F',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(25,23,20,0.35)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '42px 38px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* background collage blocks */}
						<div
							style={{
								position: 'absolute',
								top: 22,
								left: 24,
								width: 170,
								height: 54,
								backgroundColor: '#274690',
								transform: 'rotate(-5deg)',
								borderRadius: 8,
								opacity: 0.95,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 92,
								right: 34,
								width: 190,
								height: 68,
								backgroundColor: '#D9A31B',
								transform: 'rotate(4deg)',
								borderRadius: 8,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: 48,
								bottom: 128,
								width: 136,
								height: 96,
								backgroundColor: '#E9DFC9',
								transform: 'rotate(-7deg)',
								borderRadius: 10,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								right: 62,
								bottom: 122,
								width: 124,
								height: 86,
								backgroundColor: '#C3423F',
								transform: 'rotate(6deg)',
								borderRadius: 10,
							}}
						/>

						{/* moving shine */}
						<div
							style={{
								position: 'absolute',
								top: -20,
								bottom: -20,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(233,223,201,0) 0%, rgba(233,223,201,0.24) 50%, rgba(233,223,201,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top row decorative stamps */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								position: 'relative',
								zIndex: 2,
								minHeight: 94,
							}}
						>
							<div
								style={{
									backgroundColor: '#E9DFC9',
									color: '#191714',
									padding: '10px 16px 8px',
									borderRadius: 8,
									fontSize: 24,
									fontWeight: 900,
									letterSpacing: 2,
									transform: 'rotate(-6deg)',
									lineHeight: 1,
									boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
								}}
							>
								01
							</div>

							<div
								style={{
									backgroundColor: '#274690',
									color: '#E9DFC9',
									padding: '12px 18px',
									borderRadius: 8,
									fontSize: 20,
									fontWeight: 900,
									letterSpacing: 2.5,
									transform: 'rotate(5deg)',
									lineHeight: 1,
									textTransform: 'uppercase',
									boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
								}}
							>
								Stamped
							</div>
						</div>

						{/* Main headline zone */}
						<div
							style={{
								position: 'relative',
								zIndex: 3,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 24,
								padding: '10px 0 4px',
							}}
						>
							<div
								style={{
									position: 'relative',
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									minHeight: 160,
								}}
							>
								<div
									style={{
										position: 'absolute',
										width: 700,
										height: 120,
										backgroundColor: '#E9DFC9',
										borderRadius: 10,
										transform: 'rotate(-3.2deg)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										width: 760,
										height: 126,
										border: '4px solid #C3423F',
										borderRadius: 12,
										transform: 'rotate(1.7deg)',
									}}
								/>
								<div
									style={{
										position: 'relative',
										color: '#C3423F',
										fontSize: 74,
										fontWeight: 1000,
										lineHeight: 0.94,
										letterSpacing: -2.2,
										textTransform: 'uppercase',
										textAlign: 'center',
										maxWidth: 820,
										padding: '0 16px',
										textShadow: '0 2px 0 rgba(0,0,0,0.08)',
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>
							</div>

							<div
								style={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transform: `scale(${commissionBoxScale}) rotate(${metricStampRotate}deg)`,
									zIndex: 4,
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: -10,
										backgroundColor: '#D9A31B',
										borderRadius: 18,
										transform: 'rotate(-2.2deg)',
									}}
								/>
								<div
									style={{
										position: 'relative',
										backgroundColor: '#E9DFC9',
										border: '4px solid #274690',
										borderRadius: 18,
										padding: '18px 32px 16px',
										boxShadow: '0 10px 24px rgba(0,0,0,0.18)',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: -20,
											left: slashWipe,
											width: 180,
											height: 120,
											backgroundColor: 'rgba(39,70,144,0.14)',
											transform: 'skewX(-24deg) rotate(6deg)',
										}}
									/>
									<div
										style={{
											position: 'relative',
											display: 'flex',
											alignItems: 'baseline',
											justifyContent: 'center',
											gap: 18,
											whiteSpace: 'nowrap',
										}}
									>
										<span
											style={{
												color: '#C3423F',
												fontSize: 82,
												fontWeight: 1000,
												lineHeight: 1,
												letterSpacing: -2,
											}}
										>
											50%
										</span>
										<span
											style={{
												color: '#274690',
												fontSize: 36,
												fontWeight: 1000,
												lineHeight: 1,
												letterSpacing: 2.2,
												textTransform: 'uppercase',
											}}
										>
											Commission
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* bottom decorative band inside card */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginTop: 20,
								minHeight: 72,
							}}
						>
							<div
								style={{
									backgroundColor: '#C3423F',
									color: '#E9DFC9',
									padding: '10px 16px',
									borderRadius: 8,
									fontSize: 19,
									fontWeight: 900,
									letterSpacing: 2.4,
									transform: 'rotate(-4deg)',
									textTransform: 'uppercase',
									lineHeight: 1,
								}}
							>
								Cutout
							</div>

							<div
								style={{
									backgroundColor: '#274690',
									color: '#E9DFC9',
									padding: '10px 16px',
									borderRadius: 8,
									fontSize: 19,
									fontWeight: 900,
									letterSpacing: 2.4,
									transform: 'rotate(4deg)',
									textTransform: 'uppercase',
									lineHeight: 1,
								}}
							>
								Scale Jump
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${bottomIn}) rotate(-1.4deg) translateY(${bottomFloat}px)`,
						backgroundColor: '#C3423F',
						border: '3px solid #191714',
						boxShadow: '0 10px 24px rgba(25,23,20,0.22)',
						borderRadius: 18,
						padding: '18px 30px',
						textAlign: 'center',
						maxWidth: 860,
					}}
				>
					<div
						style={{
							color: '#E9DFC9',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							lineHeight: 1.1,
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