import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_58() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Grid-snap entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 14, stiffness: 240, mass: 0.6},
	});

	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.75},
	});

	const ruleDraw = interpolate(frame, [4, 24], [0, 1], clamp);

	// ------------------------------------------
	// Beat 2: Active metric transformation
	// ------------------------------------------
	const metricCount = Math.round(interpolate(frame, [24, 68], [12, 50], clamp));
	const metricText = `${metricCount}% COMMISSION`;

	const blockSwap = interpolate(frame, [40, 58], [0, 1], clamp);
	const metricPanelY = interpolate(blockSwap, [0, 1], [18, 0], clamp);
	const metricPanelOpacity = interpolate(blockSwap, [0, 1], [0.5, 1], clamp);

	// ------------------------------------------
	// Beat 3: Living hover + shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35;
	const badgeFloat = Math.sin(frame * 0.1) * 2.5;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shineOffset = interpolate((frame + 20) % 70, [0, 70], [-260, 1060], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -42],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFFFFF',
				fontFamily:
					'"Helvetica Neue", Helvetica, Arial, "Arial Narrow", sans-serif',
				opacity,
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '52px 0 42px 0',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						transformOrigin: 'left center',
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 14,
							padding: '12px 18px',
							border: '2px solid #111111',
							backgroundColor: '#FFFFFF',
						}}
					>
						<div
							style={{
								width: 14,
								height: 14,
								backgroundColor: '#E30613',
								flexShrink: 0,
							}}
						/>
						<div
							style={{
								color: '#111111',
								fontSize: 20,
								fontWeight: 700,
								letterSpacing: 1.8,
								textTransform: 'uppercase',
								lineHeight: 1,
								whiteSpace: 'nowrap',
							}}
						>
							Value Creation
						</div>
					</div>
				</div>

				{/* TIER 2: MASSIVE HERO CARD */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						transformOrigin: 'center center',
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#39414B',
							border: '4px solid #111111',
							position: 'relative',
							overflow: 'hidden',
							boxSizing: 'border-box',
							padding: '42px 40px 38px 40px',
							display: 'grid',
							gridTemplateColumns: '1fr',
							gridTemplateRows: 'auto auto 1fr auto',
							rowGap: 26,
						}}
					>
						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top rule block */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								gap: 12,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									width: `${ruleDraw * 100}%`,
									height: 6,
									backgroundColor: '#E30613',
								}}
							/>
							<div
								style={{
									color: '#D9D9D9',
									fontSize: 18,
									fontWeight: 700,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									lineHeight: 1,
									whiteSpace: 'nowrap',
								}}
							>
								Systemized Revenue Layer
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
							}}
						>
							<div
								style={{
									color: '#FFFFFF',
									fontSize: 76,
									fontWeight: 800,
									lineHeight: 0.94,
									letterSpacing: -2.4,
									textTransform: 'uppercase',
									textAlign: 'left',
									maxWidth: '92%',
								}}
							>
								AUTOMATED
							</div>
							<div
								style={{
									color: '#FFFFFF',
									fontSize: 76,
									fontWeight: 800,
									lineHeight: 0.94,
									letterSpacing: -2.4,
									textTransform: 'uppercase',
									textAlign: 'left',
									maxWidth: '92%',
								}}
							>
								MARGINS
							</div>
						</div>

						{/* Metric block */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'center',
									padding: '24px 28px 22px 28px',
									backgroundColor: '#FFFFFF',
									borderLeft: '10px solid #E30613',
									transform: `translateY(${metricPanelY}px)`,
									opacity: metricPanelOpacity,
									minWidth: 520,
									maxWidth: 760,
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										color: '#111111',
										fontSize: 24,
										fontWeight: 700,
										letterSpacing: 1.6,
										textTransform: 'uppercase',
										lineHeight: 1,
										marginBottom: 10,
										whiteSpace: 'nowrap',
									}}
								>
									Commission Model
								</div>
								<div
									style={{
										color: '#111111',
										fontSize: 60,
										fontWeight: 800,
										letterSpacing: -1.4,
										lineHeight: 0.96,
										textTransform: 'uppercase',
										textAlign: 'left',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>
						</div>

						{/* Bottom rule / footer marker */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 20,
							}}
						>
							<div
								style={{
									width: 190,
									height: 4,
									backgroundColor: '#D9D9D9',
								}}
							/>
							<div
								style={{
									color: '#D9D9D9',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 2.4,
									textTransform: 'uppercase',
									lineHeight: 1,
									whiteSpace: 'nowrap',
								}}
							>
								Modular Profit Engine
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						transformOrigin: 'left center',
					}}
				>
					<div
						style={{
							display: 'inline-flex',
							alignItems: 'center',
							padding: '14px 18px',
							backgroundColor: '#111111',
							borderLeft: '10px solid #E30613',
							maxWidth: '100%',
						}}
					>
						<div
							style={{
								color: '#FFFFFF',
								fontSize: 24,
								fontWeight: 800,
								letterSpacing: 1.6,
								textTransform: 'uppercase',
								lineHeight: 1.05,
								textAlign: 'left',
								whiteSpace: 'nowrap',
							}}
						>
							PURE SOFTWARE LEVERAGE
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}