import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_17() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const shellIn = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.65},
	});

	const badgeIn = spring({
		frame: frame - 4,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const footerIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// ------------------------------------------
	// Beat 2: Typewriter / metric state switch
	// ------------------------------------------
	const headlineChars = Math.floor(interpolate(frame, [8, 24], [0, 17], clamp));
	const headlineText = '> ' + 'AUTOMATED MARGINS'.slice(0, headlineChars);

	const metricChars = Math.floor(interpolate(frame, [26, 46], [0, 14], clamp));
	const metricText = '> ' + '50% COMMISSION'.slice(0, metricChars);

	const takeawayChars = Math.floor(interpolate(frame, [72, 96], [0, 24], clamp));
	const takeawayText = '> ' + 'PURE SOFTWARE LEVERAGE'.slice(0, takeawayChars);

	const blinkingCursor = Math.floor(frame / 8) % 2 === 0 ? '█' : ' ';
	const activeCursorHeadline = frame >= 8 && frame <= 24;
	const activeCursorMetric = frame >= 26 && frame <= 46;
	const activeCursorTakeaway = frame >= 72 && frame <= 96;

	const metricBoxGlow = interpolate(frame, [40, 58], [0.25, 0.5], clamp);
	const metricScale = interpolate(frame, [38, 50, 60], [0.92, 1.04, 1], clamp);

	// Simulated terminal buffer jump / scroll state
	const bufferShift = frame >= 58 && frame <= 68 ? -18 : 0;
	const bufferOpacityTop = interpolate(frame, [0, 20], [0.35, 0.72], clamp);

	// ------------------------------------------
	// Beat 3: Hover / shine / CRT flicker
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 20) % 65, [0, 65], [-260, 920], clamp);

	const flicker =
		0.96 +
		(Math.sin(frame * 0.9) * 0.015 +
			Math.sin(frame * 0.37) * 0.01 +
			(frame % 17 === 0 ? 0.02 : 0));

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

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#050505',
				opacity,
				fontFamily:
					'"SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","Courier New",monospace',
				color: '#33FF33',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 16px 36px 16px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
					filter: `brightness(${flicker})`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#050505',
						border: '2px solid #1E7A1E',
						boxShadow: '0 0 18px rgba(51,255,51,0.18)',
						borderRadius: 14,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#33FF33',
							boxShadow: '0 0 10px rgba(51,255,51,0.9)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F2FFF2',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						&gt; ACTIVATION CODE
					</div>
				</div>

				{/* Tier 2: Massive Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${shellIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#39414B',
							border: '3px solid #33FF33',
							borderRadius: 30,
							boxShadow: `0 ${shadowPulse}px 36px rgba(0,0,0,0.65), 0 0 24px rgba(51,255,51,0.12)`,
							padding: '34px 34px 30px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(242,255,242,0) 0%, rgba(242,255,242,0.12) 50%, rgba(242,255,242,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* CRT scanlines */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundImage:
									'repeating-linear-gradient(to bottom, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 3px, rgba(0,0,0,0.09) 4px)',
								opacity: 0.5,
								pointerEvents: 'none',
							}}
						/>

						{/* terminal top bar */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								paddingBottom: 18,
								borderBottom: '2px solid #1E7A1E',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#F2FFF2',
									fontSize: 19,
									fontWeight: 800,
									letterSpacing: 2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								&gt; TERMINAL_ZERO
							</div>
							<div
								style={{
									color: '#33FF33',
									fontSize: 16,
									fontWeight: 800,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								RUNNING
							</div>
						</div>

						{/* content buffer */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								paddingTop: 18,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 18,
									transform: `translateY(${bufferShift}px)`,
									transition: 'transform 0.15s linear',
								}}
							>
								<div
									style={{
										color: '#1E7A1E',
										fontSize: 24,
										fontWeight: 700,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
										opacity: bufferOpacityTop,
										whiteSpace: 'nowrap',
									}}
								>
									&gt; INIT_SEQUENCE
								</div>

								<div
									style={{
										color: '#1E7A1E',
										fontSize: 24,
										fontWeight: 700,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
										opacity: 0.82,
										whiteSpace: 'nowrap',
									}}
								>
									&gt; REVENUE_ENGINE_ONLINE
								</div>

								<div
									style={{
										color: '#F2FFF2',
										fontSize: 68,
										fontWeight: 900,
										lineHeight: 1.02,
										letterSpacing: -1.8,
										textTransform: 'uppercase',
										minHeight: 78,
										whiteSpace: 'nowrap',
									}}
								>
									{headlineText}
									{activeCursorHeadline ? blinkingCursor : ''}
								</div>

								<div
									style={{
										width: '100%',
										height: 2,
										backgroundColor: '#1E7A1E',
										boxShadow: '0 0 10px rgba(51,255,51,0.25)',
									}}
								/>

								<div
									style={{
										alignSelf: 'center',
										backgroundColor: '#050505',
										border: '3px solid #33FF33',
										borderRadius: 24,
										padding: '18px 34px',
										transform: `scale(${metricScale})`,
										boxShadow: `0 0 22px rgba(51,255,51,${metricBoxGlow}), inset 0 0 18px rgba(30,122,30,0.22)`,
										maxWidth: '100%',
									}}
								>
									<div
										style={{
											color: '#33FF33',
											fontSize: 72,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: -1.4,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
											textShadow: '0 0 14px rgba(51,255,51,0.35)',
										}}
									>
										{metricText}
										{activeCursorMetric ? blinkingCursor : ''}
									</div>
								</div>

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 10,
										marginTop: 2,
									}}
								>
									<div
										style={{
											color: '#1E7A1E',
											fontSize: 22,
											fontWeight: 800,
											letterSpacing: 1.4,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										&gt; STATUS: PROFIT PATH STABLE
									</div>
									<div
										style={{
											color: '#1E7A1E',
											fontSize: 22,
											fontWeight: 800,
											letterSpacing: 1.4,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										&gt; OUTPUT: SCALABLE SYSTEM
									</div>
								</div>
							</div>

							<div
								style={{
									marginTop: 18,
									paddingTop: 16,
									borderTop: '2px solid #1E7A1E',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 20,
								}}
							>
								<div
									style={{
										color: '#F2FFF2',
										fontSize: 26,
										fontWeight: 900,
										letterSpacing: 1.6,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									&gt; {takeawayText.slice(2)}
									{activeCursorTakeaway ? blinkingCursor : ''}
								</div>

								<div
									style={{
										width: 16,
										height: 16,
										borderRadius: '50%',
										backgroundColor: '#33FF33',
										boxShadow: '0 0 14px rgba(51,255,51,0.95)',
										flexShrink: 0,
										opacity: Math.floor(frame / 7) % 2 === 0 ? 1 : 0.35,
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway punchline */}
				<div
					style={{
						transform: `scale(${footerIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#050505',
						border: '2px solid #33FF33',
						borderRadius: 18,
						padding: '16px 28px',
						boxShadow: '0 0 20px rgba(51,255,51,0.16)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F2FFF2',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						&gt; PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}