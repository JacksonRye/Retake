import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_37() {
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
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const heroIn = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	// Beat 2: active transformation / cut rhythm
	const commissionReveal = interpolate(frame, [18, 54], [0, 1], clamp);
	const commissionY = interpolate(frame, [18, 54], [28, 0], clamp);
	const commissionScale = interpolate(frame, [18, 30, 54], [0.92, 1.06, 1], clamp);

	const slice1 = interpolate(frame, [0, 16], [-420, 0], clamp);
	const slice2 = interpolate(frame, [4, 20], [420, 0], clamp);
	const slice3 = interpolate(frame, [8, 24], [-520, 0], clamp);

	const silhouetteSwing = Math.sin(frame * 0.18) * 2.2;

	// Beat 3: living hover loop
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-280, 900], clamp);
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const jumpCutX = frame >= 58 && frame <= 62 ? -10 : frame >= 63 && frame <= 67 ? 8 : 0;
	const jumpCutY = frame >= 58 && frame <= 62 ? 4 : frame >= 63 && frame <= 67 ? -3 : 0;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#141414',
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", Arial, sans-serif',
				opacity,
				color: '#F2E8DC',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					padding: '40px 0 34px 0',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 2}px) rotate(-1.2deg)`,
						backgroundColor: '#2D2D2D',
						border: '3px solid #E94F1D',
						borderRadius: 14,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							backgroundColor: '#E3B505',
							transform: 'rotate(45deg)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.8,
							textTransform: 'uppercase',
							color: '#F2E8DC',
							transform: 'rotate(-0.8deg)',
							whiteSpace: 'nowrap',
						}}
					>
						BASS CUT SEQUENCE
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
						position: 'relative',
						margin: '22px 0',
						transform: `translateY(${hoverY + jumpCutY}px) translateX(${jumpCutX}px) scale(${heroIn}) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 545,
							backgroundColor: '#2D2D2D',
							border: '4px solid #E94F1D',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '42px 34px 36px 34px',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.58)`,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						{/* bar slices / assembly */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: 78,
								backgroundColor: '#E94F1D',
								transform: `translateX(${slice1}px) rotate(-1.3deg)`,
								transformOrigin: 'left center',
								opacity: 0.95,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 78,
								right: 0,
								width: '88%',
								height: 34,
								backgroundColor: '#E3B505',
								transform: `translateX(${slice2}px) rotate(1deg)`,
								transformOrigin: 'right center',
								opacity: 0.95,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 116,
								left: 0,
								width: '74%',
								height: 22,
								backgroundColor: '#F2E8DC',
								transform: `translateX(${slice3}px) rotate(-0.8deg)`,
								opacity: 0.18,
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
									'linear-gradient(90deg, rgba(242,232,220,0) 0%, rgba(242,232,220,0.12) 50%, rgba(242,232,220,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* silhouette block - kept away from text */}
						<div
							style={{
								position: 'absolute',
								right: 38,
								top: 128,
								width: 118,
								height: 230,
								opacity: 0.16,
								transform: `rotate(${silhouetteSwing}deg)`,
								transformOrigin: 'bottom center',
								pointerEvents: 'none',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 34,
									width: 46,
									height: 46,
									borderRadius: '50%',
									backgroundColor: '#F2E8DC',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 42,
									left: 24,
									width: 66,
									height: 110,
									backgroundColor: '#F2E8DC',
									borderRadius: 28,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 136,
									left: 20,
									width: 24,
									height: 94,
									backgroundColor: '#F2E8DC',
									transform: 'rotate(8deg)',
									borderRadius: 14,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 136,
									right: 22,
									width: 24,
									height: 94,
									backgroundColor: '#F2E8DC',
									transform: 'rotate(-8deg)',
									borderRadius: 14,
								}}
							/>
						</div>

						{/* safe content layout */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								justifyContent: 'space-between',
								height: '100%',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'inline-flex',
									alignItems: 'center',
									backgroundColor: '#141414',
									border: '3px solid #F2E8DC',
									padding: '10px 18px',
									borderRadius: 12,
									transform: 'rotate(-1.4deg)',
								}}
							>
								<div
									style={{
										color: '#F2E8DC',
										fontSize: 18,
										fontWeight: 900,
										letterSpacing: 2.5,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									ACTIVATION CODE
								</div>
							</div>

							<div
								style={{
									width: '74%',
									marginTop: 18,
									display: 'flex',
									flexDirection: 'column',
									gap: 18,
								}}
							>
								<div
									style={{
										color: '#F2E8DC',
										fontSize: 74,
										fontWeight: 1000,
										lineHeight: 0.92,
										letterSpacing: -2.2,
										textTransform: 'uppercase',
										transform: 'rotate(-1deg)',
										wordBreak: 'keep-all',
									}}
								>
									AUTOMATED
								</div>
								<div
									style={{
										color: '#E94F1D',
										fontSize: 78,
										fontWeight: 1000,
										lineHeight: 0.92,
										letterSpacing: -2.4,
										textTransform: 'uppercase',
										transform: 'rotate(0.9deg)',
										wordBreak: 'keep-all',
									}}
								>
									MARGINS
								</div>
							</div>

							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'flex-start',
									marginTop: 12,
								}}
							>
								<div
									style={{
										backgroundColor: '#141414',
										border: '4px solid #E3B505',
										borderRadius: 22,
										padding: '18px 28px',
										boxShadow: '0 10px 26px rgba(0,0,0,0.35)',
										transform: `translateY(${commissionY}px) scale(${commissionScale}) rotate(-0.7deg)`,
										opacity: commissionReveal,
										maxWidth: '76%',
									}}
								>
									<div
										style={{
											color: '#E3B505',
											fontSize: 58,
											fontWeight: 1000,
											lineHeight: 0.98,
											letterSpacing: -1.2,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										50% COMMISSION
									</div>
								</div>
							</div>

							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-end',
									marginTop: 16,
								}}
							>
								<div
									style={{
										backgroundColor: '#E94F1D',
										padding: '10px 18px',
										borderRadius: 12,
										transform: 'rotate(1.2deg)',
									}}
								>
									<div
										style={{
											color: '#141414',
											fontSize: 18,
											fontWeight: 1000,
											letterSpacing: 2.4,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										SHAPE ASSEMBLES
									</div>
								</div>

								<div
									style={{
										width: 120,
										height: 12,
										backgroundColor: '#E3B505',
										transform: 'rotate(-2deg)',
										borderRadius: 8,
										opacity: 0.9,
										flexShrink: 0,
										marginRight: 6,
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px) rotate(-0.8deg)`,
						backgroundColor: '#F2E8DC',
						border: '3px solid #E94F1D',
						borderRadius: 20,
						padding: '16px 30px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.32)',
						textAlign: 'center',
						maxWidth: '88%',
					}}
				>
					<div
						style={{
							color: '#141414',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.1,
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