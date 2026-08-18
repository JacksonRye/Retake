import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_44() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// -----------------------------
	// Beat 1: Snappy entrances
	// -----------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// -----------------------------
	// Beat 2: Active state switch
	// -----------------------------
	const metricReveal = Math.round(interpolate(frame, [18, 56], [18, 50], clamp));
	const metricText = `${metricReveal}% COMMISSION`;
	const stampScale = frame >= 34 && frame <= 46
		? interpolate(frame, [34, 40, 46], [1.18, 1, 1.03], clamp)
		: 1;
	const stampRotate = frame >= 34 && frame <= 46
		? interpolate(frame, [34, 40, 46], [-2.2, 1.2, 0], clamp)
		: 0;

	// -----------------------------
	// Beat 3: Living loop
	// -----------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-220, 980], clamp);

	// Found-footage handheld + IR flicker
	const shakeX = Math.sin(frame * 0.83) * 4 + Math.sin(frame * 0.21) * 2;
	const shakeY = Math.cos(frame * 0.77) * 3 + Math.sin(frame * 0.16) * 2;
	const irFlicker = 0.92 + ((Math.sin(frame * 0.9) + 1) / 2) * 0.08;
	const scanOpacity = 0.07 + ((Math.sin(frame * 0.38) + 1) / 2) * 0.04;

	// Hard-cut blackouts
	const blackout =
		(frame >= 72 && frame <= 74) ||
		(frame >= 101 && frame <= 102);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: blackout ? '#000000' : '#1E2B1E',
				opacity,
				fontFamily:
					'"Courier New", "Lucida Console", "SFMono-Regular", Menlo, Monaco, Consolas, monospace',
				color: '#7CFF6B',
				overflow: 'hidden',
			}}
		>
			{/* Global found-footage movement */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `translate(${shakeX}px, ${shakeY + exitY}px)`,
				}}
			>
				{/* IR vignette / surveillance wash */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(circle at center, rgba(124,255,107,0.05) 0%, rgba(124,255,107,0.02) 38%, rgba(0,0,0,0.24) 78%, rgba(0,0,0,0.42) 100%)',
						mixBlendMode: 'screen',
						opacity: irFlicker,
						pointerEvents: 'none',
					}}
				/>

				{/* Scan lines */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundImage:
							'repeating-linear-gradient(to bottom, rgba(216,216,216,0.08) 0px, rgba(216,216,216,0.08) 1px, transparent 1px, transparent 8px)',
						opacity: scanOpacity,
						pointerEvents: 'none',
					}}
				/>

				{/* Corner frame marks - safely away from text */}
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 1920 1080"
					style={{
						position: 'absolute',
						inset: 0,
						pointerEvents: 'none',
						opacity: blackout ? 0 : 0.55,
					}}
				>
					<g stroke="#D8D8D8" strokeWidth="4" fill="none">
						<path d="M70 70 H180 M70 70 V170" />
						<path d="M1850 70 H1740 M1850 70 V170" />
						<path d="M70 1010 H180 M70 1010 V910" />
						<path d="M1850 1010 H1740 M1850 1010 V910" />
					</g>
				</svg>

				<div
					style={{
						width: '94%',
						height: '88%',
						margin: '0 auto',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '54px 18px 42px',
						boxSizing: 'border-box',
						position: 'relative',
					}}
				>
					{/* TIER 1: category badge */}
					<div
						style={{
							transform: `scale(${badgeIn}) rotate(${
								Math.sin(frame * 0.09) * 0.8
							}deg)`,
							backgroundColor: '#0E0E0E',
							border: '3px solid #D8D8D8',
							borderRadius: 6,
							padding: '12px 24px',
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								backgroundColor: '#E5383B',
								borderRadius: 2,
								boxShadow: '0 0 0 2px rgba(229,56,59,0.16)',
							}}
						/>
						<div
							style={{
								fontSize: 18,
								fontWeight: 900,
								letterSpacing: 3.2,
								textTransform: 'uppercase',
								color: '#D8D8D8',
							}}
						>
							EVIDENCE TAPE · CASE FILE 44
						</div>
					</div>

					{/* TIER 2: hero card */}
					<div
						style={{
							width: '100%',
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							margin: '24px 0',
							position: 'relative',
							transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 540,
								backgroundColor: '#0E0E0E',
								border: '4px solid #7CFF6B',
								borderRadius: 24,
								boxSizing: 'border-box',
								padding: '42px 36px 36px',
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'stretch',
								boxShadow:
									'0 22px 42px rgba(0,0,0,0.58), inset 0 0 0 2px rgba(216,216,216,0.08)',
							}}
						>
							{/* traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									width: 120,
									background:
										'linear-gradient(180deg, rgba(216,216,216,0) 0%, rgba(216,216,216,0.16) 30%, rgba(216,216,216,0.24) 50%, rgba(216,216,216,0.16) 70%, rgba(216,216,216,0) 100%)',
									transform: `translateX(${shineOffset}px) skewX(-20deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* top micro labels */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									gap: 16,
								}}
							>
								<div
									style={{
										backgroundColor: '#1E2B1E',
										border: '2px solid #D8D8D8',
										borderRadius: 4,
										padding: '8px 12px',
										fontSize: 14,
										fontWeight: 800,
										letterSpacing: 2.4,
										color: '#D8D8D8',
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									ID: 044-A
								</div>

								<div
									style={{
										backgroundColor: '#1E2B1E',
										border: '2px solid #E5383B',
										borderRadius: 4,
										padding: '8px 12px',
										fontSize: 14,
										fontWeight: 800,
										letterSpacing: 2.4,
										color: '#E5383B',
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									ACTIVE
								</div>
							</div>

							{/* headline */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									padding: '10px 0 0',
								}}
							>
								<div
									style={{
										fontSize: 74,
										fontWeight: 1000,
										lineHeight: 0.96,
										letterSpacing: -1.8,
										textTransform: 'uppercase',
										color: '#7CFF6B',
										textAlign: 'center',
										maxWidth: '94%',
										textShadow: '0 0 14px rgba(124,255,107,0.14)',
									}}
								>
									AUTOMATED MARGINS
								</div>
							</div>

							{/* metric stamp area */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									padding: '8px 0',
								}}
							>
								<div
									style={{
										transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
										backgroundColor: 'rgba(229,56,59,0.12)',
										border: '4px solid #E5383B',
										borderRadius: 10,
										padding: '24px 30px',
										minWidth: '72%',
										boxSizing: 'border-box',
										boxShadow:
											'0 0 0 2px rgba(229,56,59,0.16), inset 0 0 0 2px rgba(229,56,59,0.08)',
									}}
								>
									<div
										style={{
											fontSize: 20,
											fontWeight: 900,
											letterSpacing: 4,
											textTransform: 'uppercase',
											color: '#D8D8D8',
											textAlign: 'center',
											marginBottom: 10,
										}}
									>
										CONFIRMED YIELD
									</div>
									<div
										style={{
											fontSize: 64,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: -1,
											textTransform: 'uppercase',
											color: '#E5383B',
											textAlign: 'center',
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>
							</div>

							{/* bottom info strip */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<div
									style={{
										backgroundColor: '#D8D8D8',
										color: '#0E0E0E',
										borderRadius: 6,
										padding: '12px 22px',
										fontSize: 20,
										fontWeight: 1000,
										letterSpacing: 3.2,
										textTransform: 'uppercase',
										textAlign: 'center',
										maxWidth: '88%',
									}}
								>
									TIMECODE VERIFIED
								</div>
							</div>
						</div>
					</div>

					{/* TIER 3: takeaway */}
					<div
						style={{
							transform: `scale(${takeawayIn}) rotate(${
								Math.sin(frame * 0.11 + 1.2) * 0.8
							}deg)`,
							backgroundColor: '#E5383B',
							border: '3px solid #D8D8D8',
							borderRadius: 8,
							padding: '16px 30px',
							boxShadow: '0 10px 24px rgba(0,0,0,0.42)',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								fontSize: 22,
								fontWeight: 1000,
								letterSpacing: 2.8,
								textTransform: 'uppercase',
								color: '#FFFFFF',
								whiteSpace: 'nowrap',
							}}
						>
							PURE SOFTWARE LEVERAGE
						</div>
					</div>
				</div>

				{/* Safe timecode overlays placed at extreme edges */}
				<div
					style={{
						position: 'absolute',
						left: 34,
						bottom: 24,
						fontSize: 18,
						fontWeight: 900,
						letterSpacing: 2.4,
						color: '#D8D8D8',
						opacity: blackout ? 0 : 0.7,
					}}
				>
					TC 00:00:{String(Math.floor(frame / fps)).padStart(2, '0')}:
					{String(frame % fps).padStart(2, '0')}
				</div>

				<div
					style={{
						position: 'absolute',
						right: 34,
						top: 26,
						fontSize: 16,
						fontWeight: 900,
						letterSpacing: 2.2,
						color: '#D8D8D8',
						opacity: blackout ? 0 : 0.62,
					}}
				>
					ARCHIVE / REC
				</div>
			</div>
		</AbsoluteFill>
	);
}