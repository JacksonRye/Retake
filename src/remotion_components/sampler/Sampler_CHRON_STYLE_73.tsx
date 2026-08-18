import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_73() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 250, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});

	const burstIn = spring({
		frame,
		fps,
		config: {damping: 10, stiffness: 280, mass: 0.6},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// Beat 2: Active state switch / countdown / strike-through feel
	const commissionProgress = Math.round(
		interpolate(frame, [16, 54], [12, 50], clamp)
	);
	const metricText = `${commissionProgress}% COMMISSION`;

	const strikeGrow = interpolate(frame, [28, 40], [0, 1], clamp);
	const phoneShakeWindow = frame >= 58 && frame <= 96;
	const phoneShake = phoneShakeWindow ? Math.sin(frame * 1.9) * 4.2 : 0;

	const countdownValue = Math.max(
		1,
		Math.ceil(interpolate(frame, [72, 108], [3, 1], clamp))
	);

	// Beat 3: Living hover + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 62, [0, 62], [-240, 980], clamp);

	// Exit
	const exitLift = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const burstScale = 0.82 + burstIn * 0.42;
	const burstRotate = interpolate(frame, [0, 20], [-10, 0], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1E5AA8',
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", Arial, sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '52px 16px 36px 16px',
					boxSizing: 'border-box',
					transform: `translateY(${exitLift}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#0E2E5C',
						border: '4px solid #FFE135',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(0,0,0,0.28)',
						zIndex: 5,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#ED1C24',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#FFFFFF',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							fontStyle: 'italic',
							whiteSpace: 'nowrap',
						}}
					>
						INFOMERCIAL MODE
					</div>
				</div>

				{/* TIER 2: Massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* Starburst behind card */}
					<div
						style={{
							position: 'absolute',
							width: 360,
							height: 360,
							transform: `scale(${burstScale}) rotate(${burstRotate}deg)`,
							opacity: 0.28,
							pointerEvents: 'none',
						}}
					>
						<svg
							width="360"
							height="360"
							viewBox="0 0 360 360"
							style={{overflow: 'visible'}}
						>
							<polygon
								points="180,8 210,88 286,28 266,108 352,90 286,148 352,180 286,212 352,270 266,252 286,332 210,272 180,352 150,272 74,332 94,252 8,270 74,212 8,180 74,148 8,90 94,108 74,28 150,88"
								fill="#FFE135"
							/>
						</svg>
					</div>

					<div
						style={{
							width: '95%',
							minHeight: 548,
							backgroundColor: '#0E2E5C',
							border: '5px solid #FFFFFF',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '40px 34px 34px 34px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 32px rgba(0,0,0,0.42)`,
							textAlign: 'center',
							zIndex: 2,
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Headline */}
						<div
							style={{
								color: '#FFE135',
								fontSize: 74,
								lineHeight: 0.94,
								fontWeight: 1000,
								fontStyle: 'italic',
								textTransform: 'uppercase',
								letterSpacing: -1.8,
								maxWidth: '92%',
								textShadow: '0 4px 0 rgba(0,0,0,0.16)',
							}}
						>
							AUTOMATED
							<br />
							MARGINS
						</div>

						{/* Metric zone */}
						<div
							style={{
								width: '86%',
								backgroundColor: '#FFFFFF',
								border: '4px solid #ED1C24',
								borderRadius: 28,
								padding: '22px 24px 20px 24px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								position: 'relative',
								boxShadow: '0 10px 24px rgba(237,28,36,0.18)',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 12,
									right: 16,
									backgroundColor: '#ED1C24',
									color: '#FFFFFF',
									borderRadius: 12,
									padding: '6px 12px',
									fontSize: 18,
									fontWeight: 1000,
									fontStyle: 'italic',
									letterSpacing: 1,
									transform: `translateX(${phoneShake}px)`,
									whiteSpace: 'nowrap',
								}}
							>
								CALL NOW
							</div>

							<div
								style={{
									position: 'relative',
									display: 'inline-flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '6px 12px',
									marginTop: 8,
								}}
							>
								<div
									style={{
										color: '#ED1C24',
										fontSize: 66,
										lineHeight: 1,
										fontWeight: 1000,
										fontStyle: 'italic',
										letterSpacing: -1.2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>

								{/* Strike-through line, placed safely through empty center band */}
								<div
									style={{
										position: 'absolute',
										left: `${10 + (1 - strikeGrow) * 40}%`,
										right: `${10 + (1 - strikeGrow) * 40}%`,
										top: '50%',
										height: 8,
										backgroundColor: '#ED1C24',
										borderRadius: 999,
										transform: 'translateY(-50%) rotate(-7deg)',
										boxShadow: '0 2px 0 rgba(0,0,0,0.12)',
									}}
								/>
							</div>

							<div
								style={{
									backgroundColor: '#FFE135',
									color: '#0E2E5C',
									borderRadius: 16,
									padding: '10px 20px',
									fontSize: 22,
									fontWeight: 1000,
									fontFamily:
										'Inter, "Helvetica Neue", Arial, sans-serif',
									letterSpacing: 1.2,
									textTransform: 'uppercase',
									transform: `translateX(${phoneShake * 0.7}px)`,
									whiteSpace: 'nowrap',
								}}
							>
								1-800-SCALE-NOW
							</div>
						</div>

						{/* Countdown / urgency zone */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 18,
								width: '88%',
							}}
						>
							<div
								style={{
									backgroundColor: '#ED1C24',
									color: '#FFFFFF',
									borderRadius: 22,
									padding: '14px 20px',
									fontSize: 24,
									fontWeight: 1000,
									fontStyle: 'italic',
									textTransform: 'uppercase',
									letterSpacing: 1.4,
									minWidth: 180,
								}}
							>
								OFFER ENDS
							</div>

							<div
								style={{
									backgroundColor: '#FFE135',
									color: '#0E2E5C',
									border: '4px solid #FFFFFF',
									borderRadius: 26,
									width: 118,
									height: 96,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxSizing: 'border-box',
									boxShadow: '0 8px 18px rgba(0,0,0,0.22)',
								}}
							>
								<div
									style={{
										fontSize: 68,
										lineHeight: 1,
										fontWeight: 1000,
										fontStyle: 'italic',
										letterSpacing: -2,
									}}
								>
									{countdownValue}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#FFE135',
						border: '4px solid #0E2E5C',
						borderRadius: 20,
						padding: '15px 28px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.24)',
						textAlign: 'center',
						maxWidth: '92%',
					}}
				>
					<div
						style={{
							color: '#0E2E5C',
							fontSize: 24,
							lineHeight: 1.1,
							fontWeight: 1000,
							fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
							letterSpacing: 1.5,
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