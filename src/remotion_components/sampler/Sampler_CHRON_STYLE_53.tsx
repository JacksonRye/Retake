import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_53() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: tape-down / scrapbook entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.55},
	});

	const heroIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 12,
		fps,
		config: {damping: 12, stiffness: 190, mass: 0.7},
	});

	// Beat 2: active state switch / rolling metric
	const metricCount = Math.round(interpolate(frame, [18, 58], [12, 50], clamp));
	const metricText = `${metricCount}% COMMISSION`;
	const metricFlip = interpolate(frame, [26, 42], [-8, 0], clamp);
	const peelLift = interpolate(frame, [32, 46], [0, -10], clamp);

	// Decorative page-turn / sticker motion
	const pageCurl = interpolate(frame, [22, 52], [0, 1], clamp);
	const cornerTuck = interpolate(frame, [20, 44], [0, 12], clamp);

	// Beat 3: living hover loop
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const badgeFloat = Math.sin(frame * 0.11 + 0.5) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 10) % 70, [0, 70], [-220, 980], clamp);

	// Exit
	const exitSlide = interpolate(
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

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#D7C4A3',
				opacity,
				fontFamily:
					'"Trebuchet MS", "Arial Black", "Segoe UI", sans-serif',
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
					padding: '52px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) rotate(-1.2deg) translateY(${badgeFloat}px)`,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: -12,
							left: 24,
							width: 90,
							height: 24,
							backgroundColor: 'rgba(247,242,230,0.85)',
							borderRadius: 4,
							transform: 'rotate(-7deg)',
							boxShadow: '0 4px 8px rgba(79,67,55,0.18)',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							top: -10,
							right: 26,
							width: 82,
							height: 22,
							backgroundColor: 'rgba(244,147,144,0.78)',
							borderRadius: 4,
							transform: 'rotate(8deg)',
							boxShadow: '0 4px 8px rgba(79,67,55,0.14)',
						}}
					/>
					<div
						style={{
							backgroundColor: '#4F4337',
							border: '3px solid #F7F2E6',
							borderRadius: 16,
							padding: '14px 30px',
							boxShadow: '0 10px 20px rgba(79,67,55,0.22)',
						}}
					>
						<div
							style={{
								color: '#9FD8CB',
								fontSize: 20,
								fontWeight: 900,
								letterSpacing: 3,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							SCRAPBOOK SYSTEM
						</div>
					</div>
				</div>

				{/* TIER 2: Massive Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#4F4337',
							border: '4px solid #F7F2E6',
							borderRadius: 30,
							boxShadow: `0 ${shadowPulse}px 34px rgba(79,67,55,0.30)`,
							padding: '44px 38px 34px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 24,
						}}
					>
						{/* Washi tape */}
						<div
							style={{
								position: 'absolute',
								top: 18,
								left: 38,
								width: 112,
								height: 26,
								backgroundColor: 'rgba(247,242,230,0.82)',
								borderRadius: 4,
								transform: 'rotate(-8deg)',
								boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 14,
								right: 42,
								width: 96,
								height: 24,
								backgroundColor: 'rgba(159,216,203,0.78)',
								borderRadius: 4,
								transform: 'rotate(9deg)',
								boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
							}}
						/>

						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(247,242,230,0.16), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Photo corners */}
						<div
							style={{
								position: 'absolute',
								top: 18,
								left: 18,
								width: 34,
								height: 34,
								borderTop: '6px solid #F49390',
								borderLeft: '6px solid #F49390',
								borderTopLeftRadius: 8,
								transform: `translate(${cornerTuck * -0.2}px, ${cornerTuck * -0.2}px) rotate(-2deg)`,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 18,
								right: 18,
								width: 34,
								height: 34,
								borderTop: '6px solid #9FD8CB',
								borderRight: '6px solid #9FD8CB',
								borderTopRightRadius: 8,
								transform: `translate(${cornerTuck * 0.2}px, ${cornerTuck * -0.2}px) rotate(2deg)`,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 18,
								left: 18,
								width: 34,
								height: 34,
								borderBottom: '6px solid #9FD8CB',
								borderLeft: '6px solid #9FD8CB',
								borderBottomLeftRadius: 8,
								transform: 'rotate(1deg)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 18,
								right: 18,
								width: 34,
								height: 34,
								borderBottom: '6px solid #F49390',
								borderRight: '6px solid #F49390',
								borderBottomRightRadius: 8,
								transform: `scale(${1 - pageCurl * 0.04}) rotate(-1deg)`,
							}}
						/>

						{/* Headline */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								paddingTop: 18,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									maxWidth: 760,
									textAlign: 'center',
									color: '#F7F2E6',
									fontSize: 68,
									fontWeight: 900,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									textShadow: '0 3px 0 rgba(79,67,55,0.15)',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric ticket */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								transform: `translateY(${peelLift}px) rotate(${metricFlip}deg)`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: -12,
									left: 34,
									width: 86,
									height: 20,
									backgroundColor: 'rgba(244,147,144,0.88)',
									borderRadius: 4,
									transform: 'rotate(-10deg)',
									boxShadow: '0 3px 8px rgba(0,0,0,0.10)',
								}}
							/>
							<div
								style={{
									backgroundColor: '#F7F2E6',
									border: '4px solid #F49390',
									borderRadius: 24,
									padding: '24px 34px',
									minWidth: 640,
									boxSizing: 'border-box',
									boxShadow: '0 10px 24px rgba(0,0,0,0.16)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: -14,
										top: '50%',
										width: 24,
										height: 24,
										backgroundColor: '#4F4337',
										borderRadius: '50%',
										transform: 'translateY(-50%)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										right: -14,
										top: '50%',
										width: 24,
										height: 24,
										backgroundColor: '#4F4337',
										borderRadius: '50%',
										transform: 'translateY(-50%)',
									}}
								/>
								<div
									style={{
										color: '#4F4337',
										fontSize: 66,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1,
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>
						</div>

						{/* Bottom mini label */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								backgroundColor: '#9FD8CB',
								border: '3px solid #F7F2E6',
								borderRadius: 14,
								padding: '12px 26px',
								boxShadow: '0 8px 18px rgba(0,0,0,0.14)',
								transform: `rotate(${Math.sin(frame * 0.07) * 1.2}deg)`,
							}}
						>
							<div
								style={{
									color: '#4F4337',
									fontSize: 22,
									fontWeight: 900,
									letterSpacing: 2.4,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								STICKER-READY PAYOUT
							</div>
						</div>

						{/* Page-turn corner */}
						<div
							style={{
								position: 'absolute',
								right: 0,
								bottom: 0,
								width: 108,
								height: 108,
								backgroundColor: '#D7C4A3',
								clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
								opacity: 0.95,
								transform: `scale(${0.88 + pageCurl * 0.12})`,
								transformOrigin: 'bottom right',
								boxShadow: '-6px -6px 0 rgba(247,242,230,0.32)',
							}}
						/>
					</div>
				</div>

				{/* TIER 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) rotate(-1deg) translateY(${takeawayFloat}px)`,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: -10,
							left: 22,
							width: 92,
							height: 22,
							backgroundColor: 'rgba(247,242,230,0.84)',
							borderRadius: 4,
							transform: 'rotate(-7deg)',
							boxShadow: '0 4px 8px rgba(79,67,55,0.14)',
						}}
					/>
					<div
						style={{
							backgroundColor: '#F49390',
							border: '3px solid #4F4337',
							borderRadius: 20,
							padding: '18px 34px',
							boxShadow: '0 10px 20px rgba(79,67,55,0.20)',
							maxWidth: 860,
						}}
					>
						<div
							style={{
								color: '#4F4337',
								fontSize: 24,
								fontWeight: 1000,
								letterSpacing: 2.2,
								textTransform: 'uppercase',
								textAlign: 'center',
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