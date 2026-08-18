import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_15() {
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
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// ------------------------------------------
	// Beat 2: Metric transformation
	// ------------------------------------------
	const metricReveal = spring({
		frame: frame - 20,
		fps,
		config: {damping: 10, stiffness: 180, mass: 0.7},
	});

	const commissionValue = Math.round(
		interpolate(frame, [18, 58], [12, 50], clamp)
	);

	const burstScale = spring({
		frame: frame - 28,
		fps,
		config: {damping: 9, stiffness: 240, mass: 0.45},
	});

	const panelSlideLeft = interpolate(frame, [0, 18], [-120, 0], clamp);
	const panelSlideRight = interpolate(frame, [4, 22], [120, 0], clamp);

	// ------------------------------------------
	// Beat 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 0.8) * 3;
	const shineOffset = interpolate((frame + 16) % 70, [0, 70], [-260, 980], clamp);
	const dotZoom = 1 + Math.sin(frame * 0.16) * 0.035;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -50],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const comicOutline = '2px 0 #1B1B1B, -2px 0 #1B1B1B, 0 2px #1B1B1B, 0 -2px #1B1B1B';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F6EFD9',
				opacity,
				fontFamily:
					'"Comic Sans MS", "Marker Felt", "Trebuchet MS", "Arial Black", sans-serif',
				color: '#1B1B1B',
			}}
		>
			{/* Halftone full-screen backdrop */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage:
						'radial-gradient(rgba(27,27,27,0.10) 1.4px, transparent 1.4px)',
					backgroundSize: '18px 18px',
					transform: `scale(${dotZoom})`,
					opacity: 0.6,
				}}
			/>

			{/* Decorative corner burst - isolated from text */}
			<div
				style={{
					position: 'absolute',
					left: 42,
					top: 78,
					width: 120,
					height: 120,
					transform: `scale(${0.92 + burstScale * 0.12}) rotate(-8deg)`,
					opacity: 0.9,
				}}
			>
				<svg viewBox="0 0 120 120" width="120" height="120">
					<g fill="#E03A3E" stroke="#1B1B1B" strokeWidth="4">
						<polygon points="60,6 69,38 103,17 82,46 116,60 82,74 103,103 69,82 60,114 51,82 17,103 38,74 4,60 38,46 17,17 51,38" />
					</g>
				</svg>
			</div>

			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 20px 52px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FDCA40',
						border: '4px solid #1B1B1B',
						borderRadius: 18,
						padding: '12px 28px',
						boxShadow: '0 8px 0 rgba(27,27,27,1)',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						zIndex: 5,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#E03A3E',
							border: '2px solid #1B1B1B',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						SUNDAY FUNNIES
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
						margin: '24px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#FDCA40',
							border: '5px solid #1B1B1B',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 0 rgba(27,27,27,1)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '38px 34px 34px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateRows: '120px 1fr 150px',
							gap: 22,
						}}
					>
						{/* comic panel dividers placed only in safe gutters */}
						<div
							style={{
								position: 'absolute',
								left: 28,
								right: 28,
								top: 180,
								height: 0,
								borderTop: '4px solid #1B1B1B',
								opacity: 0.95,
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: 28,
								right: 28,
								bottom: 166,
								height: 0,
								borderTop: '4px solid #1B1B1B',
								opacity: 0.95,
								pointerEvents: 'none',
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
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.35), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Panel 1: Headline */}
						<div
							style={{
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transform: `translateX(${panelSlideLeft}px)`,
							}}
						>
							<div
								style={{
									backgroundColor: '#F6EFD9',
									border: '4px solid #1B1B1B',
									borderRadius: 26,
									padding: '18px 28px',
									width: '92%',
									textAlign: 'center',
									boxShadow: '0 7px 0 rgba(27,27,27,1)',
								}}
							>
								<div
									style={{
										fontSize: 66,
										fontWeight: 1000,
										lineHeight: 1.02,
										letterSpacing: 1,
										textTransform: 'uppercase',
										color: '#E03A3E',
										textShadow: comicOutline,
									}}
								>
									AUTOMATED MARGINS
								</div>
							</div>
						</div>

						{/* Panel 2: Metric */}
						<div
							style={{
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transform: `translateX(${panelSlideRight}px)`,
							}}
						>
							<div
								style={{
									width: '94%',
									height: '100%',
									border: '4px solid #1B1B1B',
									borderRadius: 28,
									backgroundColor: '#F6EFD9',
									boxShadow: '0 9px 0 rgba(27,27,27,1)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									overflow: 'hidden',
									padding: '28px 24px',
									boxSizing: 'border-box',
								}}
							>
								{/* Balloon pop bubble */}
								<div
									style={{
										position: 'absolute',
										top: 18,
										right: 22,
										transform: `scale(${0.85 + burstScale * 0.22}) rotate(7deg)`,
										backgroundColor: '#E03A3E',
										border: '4px solid #1B1B1B',
										borderRadius: 999,
										padding: '10px 18px',
										boxShadow: '0 6px 0 rgba(27,27,27,1)',
									}}
								>
									<div
										style={{
											color: '#F6EFD9',
											fontSize: 24,
											fontWeight: 1000,
											letterSpacing: 1.5,
											textTransform: 'uppercase',
											textShadow: '1px 1px 0 #1B1B1B',
											whiteSpace: 'nowrap',
										}}
									>
										POW!
									</div>
								</div>

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 14,
										transform: `scale(${0.92 + metricReveal * 0.08})`,
									}}
								>
									<div
										style={{
											fontSize: 84,
											fontWeight: 1000,
											lineHeight: 0.95,
											color: '#2364AA',
											textTransform: 'uppercase',
											textShadow: comicOutline,
											whiteSpace: 'nowrap',
										}}
									>
										{commissionValue}%
									</div>
									<div
										style={{
											backgroundColor: '#2364AA',
											border: '4px solid #1B1B1B',
											borderRadius: 18,
											padding: '10px 22px',
											boxShadow: '0 6px 0 rgba(27,27,27,1)',
										}}
									>
										<div
											style={{
												fontFamily: '"Georgia", "Times New Roman", serif',
												fontSize: 28,
												fontWeight: 800,
												letterSpacing: 1.2,
												lineHeight: 1,
												textTransform: 'uppercase',
												color: '#F6EFD9',
												whiteSpace: 'nowrap',
											}}
										>
											COMMISSION
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Panel 3: Caption strip */}
						<div
							style={{
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									width: '92%',
									backgroundColor: '#E03A3E',
									border: '4px solid #1B1B1B',
									borderRadius: 22,
									padding: '18px 26px',
									boxShadow: '0 7px 0 rgba(27,27,27,1)',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontFamily: '"Georgia", "Times New Roman", serif',
										fontSize: 34,
										fontWeight: 900,
										lineHeight: 1.05,
										letterSpacing: 1,
										color: '#F6EFD9',
										textTransform: 'uppercase',
									}}
								>
									50% COMMISSION
								</div>
							</div>
						</div>

						{/* Decorative dots kept clear of text */}
						<div
							style={{
								position: 'absolute',
								left: 18,
								bottom: 22,
								width: 82,
								height: 82,
								borderRadius: '50%',
								backgroundImage:
									'radial-gradient(#1B1B1B 1.8px, transparent 1.8px)',
								backgroundSize: '10px 10px',
								opacity: 0.22,
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								right: 18,
								top: 20,
								width: 74,
								height: 74,
								borderRadius: '50%',
								backgroundImage:
									'radial-gradient(#1B1B1B 1.8px, transparent 1.8px)',
								backgroundSize: '10px 10px',
								opacity: 0.18,
								pointerEvents: 'none',
							}}
						/>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#2364AA',
						border: '4px solid #1B1B1B',
						borderRadius: 20,
						padding: '16px 30px',
						boxShadow: '0 8px 0 rgba(27,27,27,1)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 1.8,
							lineHeight: 1,
							textTransform: 'uppercase',
							color: '#F6EFD9',
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