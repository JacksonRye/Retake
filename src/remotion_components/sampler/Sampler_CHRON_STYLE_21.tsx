import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_21() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const badgeSpring = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardSpring = spring({
		frame: frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.65},
	});

	const takeawaySpring = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// Beat 2: Metric state switch / annotation pops
	const metricReveal = spring({
		frame: frame - 18,
		fps,
		config: {damping: 11, stiffness: 180, mass: 0.7},
	});

	const metricBoxWidth = interpolate(metricReveal, [0, 1], [160, 520], clamp);
	const metricOpacity = interpolate(frame, [18, 28], [0, 1], clamp);

	const topBracketProgress = interpolate(frame, [10, 28], [0, 1], clamp);
	const leftBracketProgress = interpolate(frame, [14, 30], [0, 1], clamp);
	const arrowProgress = interpolate(frame, [30, 48], [0, 1], clamp);
	const notePop = spring({
		frame: frame - 34,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	// Beat 3: Living hover / shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 70, [0, 70], [-260, 980], clamp);

	// Exit
	const exitSlide = interpolate(
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

	const boxStrokeDash = 1600 - 1600 * cardSpring;
	const metricStrokeDash = 900 - 900 * metricReveal;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FBFBF9',
				fontFamily:
					'"Arial Black", "Trebuchet MS", "Segoe UI", "Courier New", sans-serif',
				opacity,
				color: '#3C4043',
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
					padding: '56px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeSpring}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						padding: '12px 24px',
						border: '2px solid #9AA0A6',
						borderRadius: 14,
						backgroundColor: '#FBFBF9',
						boxShadow: '0 6px 18px rgba(60,64,67,0.08)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#EA4335',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#9AA0A6',
						}}
					>
						UX Skeleton
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
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardSpring}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							maxWidth: 1180,
							borderRadius: 30,
							backgroundColor: '#FBFBF9',
							border: '4px solid #4285F4',
							boxShadow: `0 ${shadowPulse}px 34px rgba(60,64,67,0.12)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '36px 36px 30px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(66,133,244,0), rgba(66,133,244,0.12), rgba(66,133,244,0))',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Main wireframe stroke draw */}
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 1180 548"
							preserveAspectRatio="none"
							style={{
								position: 'absolute',
								inset: 0,
								pointerEvents: 'none',
							}}
						>
							<rect
								x="18"
								y="18"
								width="1144"
								height="512"
								rx="24"
								fill="none"
								stroke="#4285F4"
								strokeWidth="3.5"
								strokeDasharray={1600}
								strokeDashoffset={boxStrokeDash}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<line
								x1="70"
								y1="104"
								x2={70 + 240 * topBracketProgress}
								y2="104"
								stroke="#9AA0A6"
								strokeWidth="3"
								strokeLinecap="round"
							/>
							<line
								x1="70"
								y1="104"
								x2="70"
								y2={104 + 70 * leftBracketProgress}
								stroke="#9AA0A6"
								strokeWidth="3"
								strokeLinecap="round"
							/>
							<line
								x1="980"
								y1="166"
								x2={980 + 110 * arrowProgress}
								y2={166 - 36 * arrowProgress}
								stroke="#EA4335"
								strokeWidth="3"
								strokeLinecap="round"
							/>
							<line
								x1={1090}
								y1={130}
								x2={1090 - 16 * arrowProgress}
								y2={130 + 2 * arrowProgress}
								stroke="#EA4335"
								strokeWidth="3"
								strokeLinecap="round"
							/>
							<line
								x1={1090}
								y1={130}
								x2={1082}
								y2={146}
								stroke="#EA4335"
								strokeWidth="3"
								strokeLinecap="round"
								style={{opacity: arrowProgress}}
							/>
						</svg>

						{/* Top spec row */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								gap: 24,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
									maxWidth: 360,
								}}
							>
								<div
									style={{
										fontSize: 16,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
										color: '#9AA0A6',
									}}
								>
									X-LABEL / VALUE BLOCK
								</div>
								<div
									style={{
										fontSize: 14,
										fontFamily: '"Courier New", monospace',
										letterSpacing: 1,
										color: '#9AA0A6',
									}}
								>
									grid:hero · scale:massive · mode:auto-layout
								</div>
							</div>

							<div
								style={{
									transform: `scale(${notePop})`,
									transformOrigin: 'top right',
									padding: '10px 14px',
									border: '2px solid #EA4335',
									borderRadius: 12,
									backgroundColor: '#FBFBF9',
									boxShadow: '0 4px 14px rgba(234,67,53,0.10)',
									alignSelf: 'flex-start',
								}}
							>
								<div
									style={{
										fontSize: 14,
										fontFamily: '"Courier New", monospace',
										fontWeight: 700,
										letterSpacing: 1,
										textTransform: 'uppercase',
										color: '#EA4335',
										whiteSpace: 'nowrap',
									}}
								>
									note: margin engine
								</div>
							</div>
						</div>

						{/* Headline zone */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 18,
								marginTop: 10,
								marginBottom: 10,
							}}
						>
							<div
								style={{
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 4,
									textTransform: 'uppercase',
									color: '#9AA0A6',
								}}
							>
								X-HEADLINE
							</div>

							<div
								style={{
									fontSize: 74,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									color: '#3C4043',
									textAlign: 'center',
									maxWidth: 920,
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric zone */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								margin: '6px auto 0',
								width: 540,
								height: 148,
							}}
						>
							<svg
								width="540"
								height="148"
								viewBox="0 0 540 148"
								style={{
									position: 'absolute',
									inset: 0,
									pointerEvents: 'none',
								}}
							>
								<rect
									x={(540 - metricBoxWidth) / 2}
									y="10"
									width={metricBoxWidth}
									height="128"
									rx="26"
									fill="none"
									stroke="#4285F4"
									strokeWidth="3.5"
									strokeDasharray={900}
									strokeDashoffset={metricStrokeDash}
								/>
							</svg>

							<div
								style={{
									opacity: metricOpacity,
									fontSize: 60,
									fontWeight: 1000,
									letterSpacing: 1,
									lineHeight: 1,
									textTransform: 'uppercase',
									color: '#3C4043',
									textAlign: 'center',
									whiteSpace: 'nowrap',
								}}
							>
								50% COMMISSION
							</div>
						</div>

						{/* Bottom annotation row */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-end',
								gap: 24,
								marginTop: 8,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
									maxWidth: 320,
								}}
							>
								<div
									style={{
										fontSize: 15,
										fontFamily: '"Courier New", monospace',
										fontWeight: 700,
										letterSpacing: 1,
										color: '#9AA0A6',
										textTransform: 'uppercase',
									}}
								>
									x-spec / no-touch zones
								</div>
								<div
									style={{
										fontSize: 13,
										fontFamily: '"Courier New", monospace',
										letterSpacing: 0.8,
										color: '#9AA0A6',
									}}
								>
									hero text isolated · arrows outside copy
								</div>
							</div>

							<div
								style={{
									padding: '10px 18px',
									border: '2px solid #9AA0A6',
									borderRadius: 12,
									backgroundColor: '#FBFBF9',
								}}
							>
								<div
									style={{
										fontSize: 14,
										fontWeight: 800,
										letterSpacing: 2,
										color: '#9AA0A6',
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									X-METRIC / LOCKED
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${takeawaySpring}) translateY(${takeawayFloat}px)`,
						padding: '16px 32px',
						borderRadius: 18,
						border: '3px solid #3C4043',
						backgroundColor: '#FBFBF9',
						boxShadow: '0 8px 24px rgba(60,64,67,0.10)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							color: '#3C4043',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}