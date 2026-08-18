import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_51() {
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
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// ------------------------------------------
	// Beat 2: Active metric transformation
	// ------------------------------------------
	const metricReveal = interpolate(frame, [16, 58], [0, 1], clamp);
	const metricNumber = Math.round(interpolate(frame, [16, 58], [12, 50], clamp));
	const metricText = `${metricNumber}% COMMISSION`;

	const blueLayerX = interpolate(frame, [0, 18, 34], [-140, 14, 10], clamp);
	const pinkLayerX = interpolate(frame, [0, 22, 38], [120, -10, -6], clamp);
	const blueLayerY = interpolate(frame, [0, 18, 34], [-30, 8, 6], clamp);
	const pinkLayerY = interpolate(frame, [0, 22, 38], [24, -6, -4], clamp);

	const bloomOpacity = interpolate(frame, [24, 38, 58], [0, 0.75, 0.25], clamp);
	const bloomScale = interpolate(frame, [24, 52], [0.7, 1.06], clamp);

	// ------------------------------------------
	// Beat 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const grainShift = Math.sin(frame * 0.2) * 10;
	const shineOffset = interpolate((frame + 20) % 65, [0, 65], [-420, 980], clamp);

	// Misprint / register wobble
	const registerBlueX = Math.sin(frame * 0.17) * 1.4;
	const registerBlueY = Math.cos(frame * 0.15) * 1.1;
	const registerPinkX = Math.cos(frame * 0.14) * -1.4;
	const registerPinkY = Math.sin(frame * 0.18) * 1.2;

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -60],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const grainOpacity = 0.11 + Math.sin(frame * 0.23) * 0.025;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F5F0E6',
				opacity,
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", Arial, sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Full-screen grain / paper texture */}
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 1200 1200"
				preserveAspectRatio="none"
				style={{
					position: 'absolute',
					inset: 0,
					opacity: grainOpacity,
					mixBlendMode: 'multiply',
					pointerEvents: 'none',
				}}
			>
				<defs>
					<filter id="noiseFilterChron51">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="0.95"
							numOctaves="2"
							stitchTiles="stitch"
						/>
						<feColorMatrix
							type="saturate"
							values="0"
						/>
						<feComponentTransfer>
							<feFuncA
								type="table"
								tableValues="0 0.12"
							/>
						</feComponentTransfer>
					</filter>
					<pattern
						id="dotPatternChron51"
						width="18"
						height="18"
						patternUnits="userSpaceOnUse"
						patternTransform={`translate(${grainShift}, ${grainShift * 0.4})`}
					>
						<circle
							cx="4"
							cy="4"
							r="1.2"
							fill="#0078BF"
							opacity="0.22"
						/>
						<circle
							cx="12"
							cy="10"
							r="1.1"
							fill="#FF48B0"
							opacity="0.18"
						/>
						<circle
							cx="8"
							cy="15"
							r="0.9"
							fill="#7A4BC8"
							opacity="0.16"
						/>
					</pattern>
				</defs>
				<rect
					width="1200"
					height="1200"
					fill="url(#dotPatternChron51)"
				/>
				<rect
					width="1200"
					height="1200"
					filter="url(#noiseFilterChron51)"
					fill="#000"
					opacity="0.5"
				/>
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
					padding: '58px 20px 52px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
					position: 'relative',
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px) rotate(${
							Math.sin(frame * 0.06) * 0.8
						}deg)`,
						backgroundColor: '#FFE800',
						border: '3px solid #0078BF',
						boxShadow: '0 8px 0 #0078BF',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#FF48B0',
							boxShadow: '2px 1px 0 #0078BF',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#0078BF',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						TWO-INK PRESS
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
						margin: '22px 0',
						position: 'relative',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* Misprint offset shadows behind card */}
					<div
						style={{
							position: 'absolute',
							width: '100%',
							minHeight: 540,
							borderRadius: 34,
							backgroundColor: '#0078BF',
							transform: `translate(${blueLayerX + registerBlueX}px, ${
								blueLayerY + registerBlueY
							}px)`,
							opacity: 0.92,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							width: '100%',
							minHeight: 540,
							borderRadius: 34,
							backgroundColor: '#FF48B0',
							transform: `translate(${pinkLayerX + registerPinkX}px, ${
								pinkLayerY + registerPinkY
							}px)`,
							opacity: 0.9,
						}}
					/>

					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#FFE800',
							border: '4px solid #0078BF',
							borderRadius: 34,
							boxShadow: '0 18px 0 rgba(0, 120, 191, 0.22)',
							padding: '48px 38px 42px 38px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 24,
							position: 'relative',
							overflow: 'hidden',
							textAlign: 'center',
						}}
					>
						{/* overprint bloom */}
						<div
							style={{
								position: 'absolute',
								width: 320,
								height: 320,
								borderRadius: '50%',
								background:
									'radial-gradient(circle, rgba(255,72,176,0.28) 0%, rgba(122,75,200,0.18) 45%, rgba(0,120,191,0) 75%)',
								left: '50%',
								top: '48%',
								transform: `translate(-50%, -50%) scale(${bloomScale})`,
								opacity: bloomOpacity,
								pointerEvents: 'none',
							}}
						/>

						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -60,
								bottom: -60,
								width: 120,
								backgroundColor: 'rgba(255,255,255,0.22)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								opacity: 0.45,
								pointerEvents: 'none',
							}}
						/>

						{/* grain fill overlay on card */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundImage:
									'radial-gradient(rgba(0,120,191,0.15) 0.8px, transparent 0.8px), radial-gradient(rgba(255,72,176,0.12) 0.8px, transparent 0.8px)',
								backgroundPosition: `${grainShift}px ${grainShift * 0.3}px, ${
									-grainShift * 0.5
								}px ${grainShift * 0.7}px`,
								backgroundSize: '16px 16px, 22px 22px',
								opacity: 0.42,
								pointerEvents: 'none',
							}}
						/>

						{/* Headline block */}
						<div
							style={{
								position: 'relative',
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								paddingTop: 6,
								paddingBottom: 4,
							}}
						>
							<div
								style={{
									position: 'absolute',
									transform: `translate(${2.4 + registerBlueX}px, ${1.2 + registerBlueY}px)`,
									color: '#0078BF',
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
									opacity: 0.95,
									pointerEvents: 'none',
								}}
							>
								AUTOMATED MARGINS
							</div>
							<div
								style={{
									position: 'absolute',
									transform: `translate(${-2.1 + registerPinkX}px, ${-1.2 + registerPinkY}px)`,
									color: '#FF48B0',
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
									opacity: 0.92,
									pointerEvents: 'none',
								}}
							>
								AUTOMATED MARGINS
							</div>
							<div
								style={{
									position: 'relative',
									color: '#F5F0E6',
									WebkitTextStroke: '5px #7A4BC8',
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
									paintOrder: 'stroke fill',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric block */}
						<div
							style={{
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#F5F0E6',
								border: '4px solid #FF48B0',
								borderRadius: 26,
								padding: '20px 28px',
								width: '88%',
								maxWidth: 760,
								minHeight: 136,
								boxSizing: 'border-box',
								boxShadow: '0 10px 0 rgba(255,72,176,0.18)',
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									background:
										'linear-gradient(135deg, rgba(255,72,176,0.08), rgba(0,120,191,0.08))',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									left: 14,
									right: 14,
									top: 12,
									bottom: 12,
									border: '2px dashed rgba(122,75,200,0.38)',
									borderRadius: 18,
								}}
							/>
							<div
								style={{
									position: 'relative',
									transform: `translateY(${(1 - metricReveal) * 22}px) scale(${
										0.9 + metricReveal * 0.1
									})`,
									opacity: metricReveal,
									color: '#FF48B0',
									fontSize: 62,
									fontWeight: 1000,
									lineHeight: 1,
									letterSpacing: -1,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
									textShadow:
										'2px 2px 0 #0078BF, -2px -2px 0 rgba(122,75,200,0.18)',
								}}
							>
								{metricText}
							</div>
						</div>

						{/* Footer label inside card */}
						<div
							style={{
								backgroundColor: '#0078BF',
								border: '3px solid #7A4BC8',
								color: '#F5F0E6',
								borderRadius: 16,
								padding: '12px 24px',
								fontSize: 20,
								fontWeight: 900,
								letterSpacing: 2.4,
								textTransform: 'uppercase',
								lineHeight: 1,
								whiteSpace: 'nowrap',
								boxShadow: '0 6px 0 rgba(122,75,200,0.2)',
							}}
						>
							OVERPRINT SCALE
						</div>
					</div>
				</div>

				{/* Tier 3: takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px) rotate(${
							Math.sin(frame * 0.07) * 0.6
						}deg)`,
						backgroundColor: '#FF48B0',
						border: '3px solid #0078BF',
						borderRadius: 22,
						padding: '16px 32px',
						boxShadow: '0 8px 0 rgba(0,120,191,0.28)',
						textAlign: 'center',
						maxWidth: 820,
					}}
				>
					<div
						style={{
							color: '#F5F0E6',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.2,
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