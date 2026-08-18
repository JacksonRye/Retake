import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_09() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: stamp-slam entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 1,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 4,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	const stampSlamY = interpolate(frame, [0, 6, 12], [-120, 18, 0], clamp);
	const stampSlamRot = interpolate(frame, [0, 7, 14], [-2.2, 1.4, -0.8], clamp);

	// ------------------------------------------
	// Beat 2: active metric state switch
	// ------------------------------------------
	const revealProgress = interpolate(frame, [18, 52], [0, 1], clamp);
	const metricBoxW = interpolate(frame, [18, 52], [220, 540], clamp);

	const commissionOpacity = interpolate(frame, [22, 30], [0, 1], clamp);
	const redUnderlineScale = interpolate(frame, [28, 45], [0, 1], clamp);

	// ------------------------------------------
	// Beat 3: living hover + shine + jitter
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeHover = Math.sin(frame * 0.1) * 3;
	const takeawayHover = Math.sin(frame * 0.12 + 1) * 3;
	const shineOffset = interpolate((frame + 24) % 70, [0, 70], [-260, 980], clamp);

	// Xerox / photocopy flicker
	const flicker =
		frame % 9 === 0 ? 0.965 : frame % 13 === 0 ? 0.985 : 1;
	const jitterX =
		frame % 7 === 0 ? -1.2 : frame % 11 === 0 ? 1.2 : 0;
	const jitterY =
		frame % 8 === 0 ? 1 : frame % 12 === 0 ? -1 : 0;

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
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
				backgroundColor: '#F2F0EB',
				opacity,
				fontFamily:
					'"Courier New", "American Typewriter", "Lucida Console", monospace',
				color: '#0D0D0D',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
					opacity: 0.08,
					pointerEvents: 'none',
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						backgroundImage:
							'repeating-linear-gradient(0deg, rgba(13,13,13,0.18) 0px, rgba(13,13,13,0.18) 1px, transparent 1px, transparent 4px)',
					}}
				/>
			</div>

			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					padding: '44px 20px 34px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					transform: `translate(${jitterX}px, ${jitterY + exitY}px)`,
				}}
			>
				{/* Tier 1: Badge */}
				<div
					style={{
						position: 'relative',
						transform: `scale(${badgeIn}) translateY(${badgeHover}px) rotate(-1.2deg)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '14px 28px',
						backgroundColor: '#D8C9A3',
						border: '3px solid #0D0D0D',
						boxShadow: '5px 5px 0 #0D0D0D',
						zIndex: 5,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: -10,
							left: 22,
							width: 96,
							height: 22,
							backgroundColor: '#E63B2E',
							opacity: 0.9,
							transform: 'rotate(-5deg)',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: -9,
							right: 26,
							width: 78,
							height: 20,
							backgroundColor: '#D8C9A3',
							border: '2px solid #0D0D0D',
							opacity: 0.95,
							transform: 'rotate(4deg)',
						}}
					/>
					<div
						style={{
							position: 'relative',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#0D0D0D',
							whiteSpace: 'nowrap',
						}}
					>
						ACTIVATION CODE
					</div>
				</div>

				{/* Tier 2: Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '24px 0',
						position: 'relative',
						transform: `scale(${cardIn}) translateY(${hoverY + stampSlamY}px) rotate(${hoverTilt + stampSlamRot}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 550,
							maxWidth: 980,
							backgroundColor: '#6E6E6E',
							border: '4px solid #0D0D0D',
							boxShadow: '10px 10px 0 #0D0D0D',
							position: 'relative',
							overflow: 'hidden',
							padding: '44px 38px 38px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							textAlign: 'center',
							filter: `contrast(1.02) brightness(${flicker})`,
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -30,
								bottom: -30,
								width: 120,
								background:
									'linear-gradient(90deg, transparent 0%, rgba(242,240,235,0.45) 50%, transparent 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Tape corners */}
						<div
							style={{
								position: 'absolute',
								top: 18,
								left: 28,
								width: 110,
								height: 26,
								backgroundColor: '#F2F0EB',
								opacity: 0.75,
								transform: 'rotate(-7deg)',
								border: '2px solid rgba(13,13,13,0.18)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 16,
								right: 36,
								width: 88,
								height: 24,
								backgroundColor: '#F2F0EB',
								opacity: 0.72,
								transform: 'rotate(8deg)',
								border: '2px solid rgba(13,13,13,0.18)',
							}}
						/>

						{/* Headline block */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								paddingTop: 12,
							}}
						>
							<div
								style={{
									maxWidth: 820,
									backgroundColor: '#F2F0EB',
									border: '3px solid #0D0D0D',
									padding: '18px 24px 14px',
									boxSizing: 'border-box',
									boxShadow: '4px 4px 0 #0D0D0D',
								}}
							>
								<div
									style={{
										fontSize: 72,
										lineHeight: 0.98,
										fontWeight: 900,
										letterSpacing: -1.5,
										textTransform: 'uppercase',
										color: '#0D0D0D',
										whiteSpace: 'nowrap',
									}}
								>
									AUTOMATED MARGINS
								</div>
							</div>
						</div>

						{/* Metric block */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
								gap: 18,
							}}
						>
							<div
								style={{
									width: metricBoxW,
									height: 148,
									backgroundColor: '#F2F0EB',
									border: '4px solid #0D0D0D',
									boxShadow: '6px 6px 0 #0D0D0D',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										background:
											'repeating-linear-gradient(180deg, rgba(13,13,13,0.06) 0px, rgba(13,13,13,0.06) 2px, transparent 2px, transparent 6px)',
										opacity: 0.55,
									}}
								/>
								<div
									style={{
										position: 'relative',
										transform: `scaleX(${revealProgress})`,
										transformOrigin: 'center center',
										opacity: commissionOpacity,
										whiteSpace: 'nowrap',
										fontSize: 64,
										lineHeight: 1,
										fontWeight: 900,
										letterSpacing: -1,
										textTransform: 'uppercase',
										color: '#0D0D0D',
									}}
								>
									50% COMMISSION
								</div>
							</div>

							<div
								style={{
									width: 460,
									height: 16,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										width: '100%',
										height: 10,
										backgroundColor: '#E63B2E',
										border: '2px solid #0D0D0D',
										transform: `scaleX(${redUnderlineScale}) rotate(-1.4deg)`,
										transformOrigin: 'center center',
										boxShadow: '3px 3px 0 #0D0D0D',
									}}
								/>
							</div>
						</div>

						{/* Bottom stamp */}
						<div
							style={{
								backgroundColor: '#E63B2E',
								color: '#F2F0EB',
								border: '3px solid #0D0D0D',
								boxShadow: '4px 4px 0 #0D0D0D',
								padding: '12px 24px',
								transform: 'rotate(-1.4deg)',
								whiteSpace: 'nowrap',
								fontSize: 24,
								fontWeight: 900,
								letterSpacing: 2.5,
								textTransform: 'uppercase',
							}}
						>
							PHOTOCOPY PROOF
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						position: 'relative',
						transform: `scale(${takeawayIn}) translateY(${takeawayHover}px) rotate(1deg)`,
						padding: '16px 28px',
						backgroundColor: '#E63B2E',
						border: '3px solid #0D0D0D',
						boxShadow: '6px 6px 0 #0D0D0D',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: -8,
							left: 18,
							width: 82,
							height: 18,
							backgroundColor: '#F2F0EB',
							opacity: 0.7,
							transform: 'rotate(-7deg)',
							border: '2px solid rgba(13,13,13,0.18)',
						}}
					/>
					<div
						style={{
							position: 'relative',
							color: '#F2F0EB',
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 2.2,
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