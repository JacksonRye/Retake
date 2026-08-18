import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_08() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const badgeSpring = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	const heroSpring = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.72},
	});

	const bottomSpring = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.7},
	});

	const pageWipe = interpolate(frame, [0, 18], [1, 0], clamp);
	const coverlineLeftIn = interpolate(frame, [8, 24], [-120, 0], clamp);
	const coverlineRightIn = interpolate(frame, [12, 28], [120, 0], clamp);

	// ------------------------------------------
	// Beat 2: Active metric transformation
	// ------------------------------------------
	const commissionCount = Math.round(interpolate(frame, [18, 58], [12, 50], clamp));
	const metricText = `${commissionCount}% COMMISSION`;

	const barcodeReveal = interpolate(frame, [24, 42], [0, 1], clamp);
	const accentLineGrow = interpolate(frame, [22, 40], [0, 1], clamp);

	// ------------------------------------------
	// Beat 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1 + 0.8) * 3;
	const bottomFloat = Math.sin(frame * 0.12 + 1.6) * 3;
	const photoParallax = Math.sin(frame * 0.06) * 14;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-220, 920], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitLift = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FAFAF8',
				fontFamily:
					'"Bodoni 72", "Didot", "Times New Roman", serif',
				opacity,
				color: '#111111',
			}}
		>
			{/* Page flip wipe */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: '#111111',
					transformOrigin: 'left center',
					transform: `scaleX(${pageWipe}) skewY(${pageWipe * -1.5}deg)`,
					zIndex: 50,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '42px 18px 28px',
					boxSizing: 'border-box',
					transform: `translateY(${exitLift}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeSpring}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '10px 24px',
						border: '2px solid #111111',
						borderRadius: 999,
						backgroundColor: '#FAFAF8',
						boxShadow: '0 8px 24px rgba(17,17,17,0.08)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#D2042D',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontFamily:
								'"SFMono-Regular", "Menlo", "Consolas", monospace',
							fontSize: 16,
							letterSpacing: 3,
							fontWeight: 700,
							textTransform: 'uppercase',
							color: '#111111',
							whiteSpace: 'nowrap',
						}}
					>
						COVER STORY
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
						transform: `scale(${heroSpring}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							borderRadius: 34,
							border: '3px solid #111111',
							backgroundColor: '#FAFAF8',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: '0 24px 60px rgba(17,17,17,0.12)',
							display: 'grid',
							gridTemplateColumns: '1.1fr 0.9fr',
						}}
					>
						{/* Left editorial column */}
						<div
							style={{
								padding: '40px 36px 34px 42px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								position: 'relative',
								zIndex: 3,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 18,
								}}
							>
								<div
									style={{
										transform: `translateX(${coverlineLeftIn}px)`,
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
										fontSize: 14,
										letterSpacing: 4,
										fontWeight: 700,
										textTransform: 'uppercase',
										color: '#D2042D',
										lineHeight: 1.2,
										whiteSpace: 'nowrap',
									}}
								>
									ISSUE 08 / FEATURE / SYSTEMS
								</div>

								<div
									style={{
										width: `${accentLineGrow * 100}%`,
										height: 4,
										backgroundColor: '#D2042D',
										borderRadius: 999,
									}}
								/>

								<div
									style={{
										fontSize: 74,
										lineHeight: 0.95,
										fontWeight: 800,
										letterSpacing: -2,
										textTransform: 'uppercase',
										color: '#111111',
										maxWidth: 470,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>

								<div
									style={{
										transform: `translateX(${coverlineRightIn}px)`,
										fontSize: 23,
										lineHeight: 1.16,
										fontWeight: 700,
										letterSpacing: 0.4,
										textTransform: 'uppercase',
										color: '#111111',
										maxWidth: 430,
									}}
								>
									The glossy cover story on building repeatable revenue without adding operational drag.
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 14,
									marginTop: 18,
								}}
							>
								<div
									style={{
										alignSelf: 'flex-start',
										backgroundColor: '#111111',
										color: '#FAFAF8',
										borderRadius: 18,
										padding: '16px 24px 14px',
										boxShadow: '0 12px 30px rgba(17,17,17,0.18)',
										maxWidth: '100%',
									}}
								>
									<div
										style={{
											fontSize: 58,
											lineHeight: 1,
											fontWeight: 800,
											letterSpacing: -1.4,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>

								<div
									style={{
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
										fontSize: 13,
										letterSpacing: 2.4,
										fontWeight: 700,
										textTransform: 'uppercase',
										color: '#111111',
										opacity: 0.72,
										whiteSpace: 'nowrap',
									}}
								>
									EDITORIAL NOTE / HIGH-MARGIN SOFTWARE MOTION
								</div>
							</div>
						</div>

						{/* Right visual column */}
						<div
							style={{
								position: 'relative',
								backgroundColor: '#B8B2A8',
								overflow: 'hidden',
								borderLeft: '2px solid #111111',
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									background:
										'linear-gradient(180deg, rgba(250,250,248,0.05) 0%, rgba(17,17,17,0.04) 100%)',
									zIndex: 1,
								}}
							/>

							{/* Stylized glossy "photo crop" */}
							<div
								style={{
									position: 'absolute',
									top: 26,
									right: 26,
									bottom: 72,
									left: 26,
									borderRadius: 28,
									overflow: 'hidden',
									background:
										'radial-gradient(circle at 30% 25%, #FAFAF8 0%, #E9E4DA 22%, #C9A14A 48%, #B8B2A8 74%, #8F877A 100%)',
									boxShadow: 'inset 0 0 0 2px rgba(17,17,17,0.18)',
									transform: `translateY(${photoParallax}px)`,
									zIndex: 2,
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: '8%',
										left: '12%',
										width: '58%',
										height: '68%',
										borderRadius: '48% 52% 46% 54% / 44% 40% 60% 56%',
										background:
											'linear-gradient(135deg, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.68) 55%, rgba(210,4,45,0.78) 100%)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										bottom: '10%',
										right: '8%',
										width: '44%',
										height: '42%',
										borderRadius: '50%',
										border: '3px solid rgba(250,250,248,0.8)',
										background:
											'linear-gradient(135deg, rgba(201,161,74,0.9) 0%, rgba(250,250,248,0.28) 100%)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										top: -40,
										bottom: -40,
										width: 130,
										backgroundColor: 'rgba(255,255,255,0.28)',
										transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									}}
								/>
							</div>

							{/* Cover side text */}
							<div
								style={{
									position: 'absolute',
									left: 22,
									bottom: 24,
									right: 22,
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
									zIndex: 4,
								}}
							>
								<div
									style={{
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
										fontSize: 12,
										letterSpacing: 2.6,
										fontWeight: 700,
										textTransform: 'uppercase',
										color: '#111111',
										opacity: 0.72,
										whiteSpace: 'nowrap',
									}}
								>
									PARALLAX CROP / GLOSS FINISH
								</div>
								<div
									style={{
										fontSize: 26,
										lineHeight: 1.05,
										fontWeight: 800,
										letterSpacing: -0.6,
										textTransform: 'uppercase',
										color: '#111111',
										maxWidth: 250,
									}}
								>
									Scalable systems. Magazine-grade margins.
								</div>
							</div>

							{/* Barcode tick-ins */}
							<div
								style={{
									position: 'absolute',
									top: 24,
									right: 22,
									height: 54,
									display: 'flex',
									alignItems: 'flex-end',
									gap: 4,
									zIndex: 5,
								}}
							>
								{[18, 32, 26, 40, 22, 44, 30, 36, 20, 46].map((h, i) => {
									const local = interpolate(
										frame,
										[28 + i * 2, 40 + i * 2],
										[0, 1],
										clamp
									);
									return (
										<div
											key={i}
											style={{
												width: i % 3 === 0 ? 4 : 2,
												height: h * local,
												backgroundColor: '#111111',
												borderRadius: 2,
												opacity: barcodeReveal,
											}}
										/>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${bottomSpring}) translateY(${bottomFloat}px)`,
						backgroundColor: '#D2042D',
						border: '2px solid #111111',
						borderRadius: 22,
						padding: '16px 28px',
						boxShadow: '0 12px 30px rgba(17,17,17,0.14)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontFamily:
								'"SFMono-Regular", "Menlo", "Consolas", monospace',
							fontSize: 13,
							letterSpacing: 3,
							fontWeight: 700,
							textTransform: 'uppercase',
							color: '#FAFAF8',
							opacity: 0.8,
							marginBottom: 4,
							whiteSpace: 'nowrap',
						}}
					>
						TAKEAWAY
					</div>
					<div
						style={{
							fontSize: 28,
							lineHeight: 1.05,
							fontWeight: 800,
							letterSpacing: -0.4,
							textTransform: 'uppercase',
							color: '#FAFAF8',
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