import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_13() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: Snappy entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.55},
	});

	const heroIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.65},
	});

	const envelopeSlideX = interpolate(frame, [0, 18], [220, 0], clamp);
	const envelopeRotate = interpolate(frame, [0, 18], [2.2, 0], clamp);

	// ------------------------------------------
	// BEAT 2: Active state / postmark / route
	// ------------------------------------------
	const stampPop = spring({
		frame: frame - 28,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.45},
	});

	const routeProgress = interpolate(frame, [26, 62], [0, 1], clamp);
	const sealPress = spring({
		frame: frame - 54,
		fps,
		config: {damping: 14, stiffness: 260, mass: 0.5},
	});

	const commissionPanelScale = 0.92 + sealPress * 0.08;
	const stampSmash = frame >= 54 && frame <= 60 ? Math.sin((frame - 54) * 0.8) * 8 : 0;

	// ------------------------------------------
	// BEAT 3: Living hover loop + shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.6;
	const shadowFloat = Math.sin(frame * 0.16) * 6;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-220, 900], clamp);

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -48], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F3EDE2',
				opacity,
				fontFamily:
					'"Brush Script MT", "Segoe Script", "Snell Roundhand", "Comic Sans MS", cursive',
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
					padding: '34px 20px 24px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#F3EDE2',
						border: '3px solid #1F4690',
						borderRadius: 18,
						padding: '10px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 18px rgba(31,70,144,0.14)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#C8102E',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontFamily:
								'"Courier New", "Lucida Console", "SFMono-Regular", monospace',
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#5C5C5C',
							whiteSpace: 'nowrap',
						}}
					>
						PAR AVION
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
						margin: '20px 0',
						position: 'relative',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#C9A227',
							border: '4px solid #1F4690',
							borderRadius: 34,
							position: 'relative',
							overflow: 'hidden',
							boxSizing: 'border-box',
							padding: '38px 34px 34px',
							boxShadow: `0 ${18 + shadowFloat}px 32px rgba(0,0,0,0.16)`,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* paper inset */}
						<div
							style={{
								position: 'absolute',
								inset: 14,
								borderRadius: 24,
								backgroundColor: '#F3EDE2',
								border: '2px solid rgba(31,70,144,0.32)',
							}}
						/>

						{/* shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.28), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* corner airmail stripes */}
						<div
							style={{
								position: 'absolute',
								top: 16,
								left: 18,
								width: 120,
								height: 16,
								background:
									'repeating-linear-gradient(90deg, #C8102E 0 12px, #F3EDE2 12px 24px, #1F4690 24px 36px, #F3EDE2 36px 48px)',
								borderRadius: 8,
								opacity: 0.95,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 16,
								right: 18,
								width: 120,
								height: 16,
								background:
									'repeating-linear-gradient(90deg, #1F4690 0 12px, #F3EDE2 12px 24px, #C8102E 24px 36px, #F3EDE2 36px 48px)',
								borderRadius: 8,
								opacity: 0.95,
							}}
						/>

						{/* Content layer */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								width: '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								textAlign: 'center',
								gap: 22,
							}}
						>
							{/* top row for stamp area */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-start',
									minHeight: 112,
								}}
							>
								<div
									style={{
										alignSelf: 'flex-start',
										border: '2px dashed #5C5C5C',
										borderRadius: 14,
										padding: '10px 14px',
										backgroundColor: 'rgba(255,255,255,0.32)',
									}}
								>
									<div
										style={{
											fontFamily:
												'"Courier New", "Lucida Console", "SFMono-Regular", monospace',
											fontSize: 14,
											fontWeight: 800,
											letterSpacing: 2,
											textTransform: 'uppercase',
											color: '#5C5C5C',
											lineHeight: 1.2,
										}}
									>
										AIR MAIL
									</div>
								</div>

								<div
									style={{
										position: 'relative',
										width: 168,
										height: 96,
										flexShrink: 0,
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: 0,
											right: 0,
											width: 88,
											height: 88,
											border: '3px solid #C8102E',
											borderRadius: '50%',
											transform: `scale(${stampPop}) rotate(${stampSmash}deg)`,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											backgroundColor: 'rgba(200,16,46,0.06)',
										}}
									>
										<div
											style={{
												fontFamily:
													'"Arial Black", Impact, sans-serif',
												fontSize: 17,
												fontWeight: 900,
												color: '#C8102E',
												letterSpacing: 2,
												textTransform: 'uppercase',
												lineHeight: 1.05,
												textAlign: 'center',
											}}
										>
											POST
											<br />
											MARK
										</div>
									</div>
								</div>
							</div>

							{/* headline */}
							<div
								style={{
									width: '100%',
									padding: '0 26px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										fontSize: 72,
										fontWeight: 700,
										lineHeight: 1.02,
										color: '#C8102E',
										letterSpacing: 0.5,
										textAlign: 'center',
										textShadow: '0 1px 0 rgba(255,255,255,0.35)',
									}}
								>
									AUTOMATED
								</div>
								<div
									style={{
										fontSize: 78,
										fontWeight: 700,
										lineHeight: 0.98,
										color: '#C8102E',
										letterSpacing: 0.5,
										textAlign: 'center',
										marginTop: 2,
										textShadow: '0 1px 0 rgba(255,255,255,0.35)',
									}}
								>
									MARGINS
								</div>
							</div>

							{/* route line area */}
							<div
								style={{
									width: '100%',
									height: 82,
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									pointerEvents: 'none',
								}}
							>
								<svg
									width="760"
									height="82"
									viewBox="0 0 760 82"
									style={{
										overflow: 'visible',
									}}
								>
									<path
										d="M70 45 C170 18, 250 68, 350 42 S540 22, 690 44"
										fill="none"
										stroke="#1F4690"
										strokeWidth="4"
										strokeDasharray="10 10"
										strokeLinecap="round"
										style={{
											strokeDashoffset: 380 - routeProgress * 380,
											opacity: 0.95,
										}}
									/>
									<circle cx="70" cy="45" r="7" fill="#C8102E" />
									<circle cx="690" cy="44" r="7" fill="#1F4690" />
								</svg>
							</div>

							{/* metric panel */}
							<div
								style={{
									transform: `scale(${commissionPanelScale}) translateX(${envelopeSlideX * 0.14}px) rotate(${envelopeRotate * 0.25}deg)`,
									backgroundColor: '#F3EDE2',
									border: '3px solid #C8102E',
									borderRadius: 26,
									padding: '18px 28px',
									width: '78%',
									maxWidth: 700,
									boxSizing: 'border-box',
									boxShadow: '0 10px 24px rgba(200,16,46,0.12)',
									position: 'relative',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 16,
										top: 16,
										width: 18,
										height: 18,
										borderRadius: '50%',
										backgroundColor: '#C9A227',
										border: '2px solid #1F4690',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										right: 16,
										bottom: 16,
										width: 92 * sealPress,
										height: 92 * sealPress,
										borderRadius: '50%',
										backgroundColor: '#C8102E',
										opacity: 0.16,
										transform: `scale(${sealPress})`,
									}}
								/>
								<div
									style={{
										fontFamily:
											'"Arial Black", Impact, sans-serif',
										fontSize: 72,
										fontWeight: 1000,
										lineHeight: 1,
										color: '#1F4690',
										letterSpacing: 1,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
										position: 'relative',
										zIndex: 2,
									}}
								>
									50%
								</div>
								<div
									style={{
										fontFamily:
											'"Courier New", "Lucida Console", "SFMono-Regular", monospace',
										fontSize: 24,
										fontWeight: 900,
										letterSpacing: 3,
										textTransform: 'uppercase',
										color: '#5C5C5C',
										marginTop: 8,
										position: 'relative',
										zIndex: 2,
									}}
								>
									COMMISSION
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#C8102E',
						border: '3px solid #1F4690',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 8px 18px rgba(0,0,0,0.14)',
						maxWidth: '92%',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontFamily:
								'"Courier New", "Lucida Console", "SFMono-Regular", monospace',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2.4,
							textTransform: 'uppercase',
							color: '#F3EDE2',
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