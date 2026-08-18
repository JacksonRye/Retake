import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene5() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance / marker-write on
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const titleReveal = interpolate(frame, [0, 18], [0, 1], clamp);
	const percentPop = spring({
		frame: frame - 16,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.9},
	});
	const underlineGrow = interpolate(frame, [18, 28], [0, 1], clamp);

	// ------------------------------------------
	// Beat 2: Half circle + smudge erase + note
	// ------------------------------------------
	const circleProgress = interpolate(frame, [32, 60], [0, 0.54], clamp);
	const smudgeOpacity = interpolate(frame, [58, 70], [0, 0.32], clamp);
	const smudgeX = interpolate(frame, [58, 70], [-20, 42], clamp);
	const noteEntrance = spring({
		frame: frame - 60,
		fps,
		config: {damping: 13, stiffness: 230, mass: 0.7},
	});

	// ------------------------------------------
	// Beat 3: Living loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.1;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 16) % 70, [0, 70], [-420, 860], clamp);
	const underlinePulse = 0.85 + ((Math.sin(frame * 0.16) + 1) / 2) * 0.25;
	const focusRack = interpolate(frame, [84, durationInFrames - 10], [0, 1], clamp);

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

	const pathLength = 2 * Math.PI * 86;
	const dashOffset = pathLength * (1 - circleProgress);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1A2026',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily:
					'"Arial Black", "Impact", "Trebuchet MS", -apple-system, BlinkMacSystemFont, sans-serif',
				opacity,
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 940,
					height: '86%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '66px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#39414B',
						border: '3px solid #4DD0E1',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 26px rgba(0,0,0,0.38)',
					}}
				>
					<div
						style={{
							width: 11,
							height: 11,
							borderRadius: '50%',
							backgroundColor: '#4DD0E1',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F4F4F4',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						Base Reality Check
					</div>
				</div>

				{/* Tier 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '24px 0',
						transform: `scale(${entrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 530,
							backgroundColor: '#39414B',
							border: '4px solid #4DD0E1',
							borderRadius: 32,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.58)`,
							padding: '46px 34px 40px 34px',
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
						{/* Glass glare */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 150,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0.00) 0%, rgba(255,255,255,0.11) 45%, rgba(255,255,255,0.00) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-24deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Focus rack overlay */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'radial-gradient(circle at center, rgba(255,255,255,0) 0%, rgba(26,32,38,0) 54%, rgba(26,32,38,0.14) 100%)',
								opacity: focusRack * 0.9,
								pointerEvents: 'none',
							}}
						/>

						{/* Row 1: headline */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								paddingTop: 4,
							}}
						>
							<div
								style={{
									width: `${titleReveal * 100}%`,
									overflow: 'hidden',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										color: '#F4F4F4',
										fontSize: 66,
										fontWeight: 1000,
										lineHeight: 1.04,
										letterSpacing: 1,
										textTransform: 'uppercase',
										textAlign: 'center',
										whiteSpace: 'nowrap',
										textShadow: '0 2px 0 rgba(255,255,255,0.04)',
									}}
								>
									AMAZON BASE COMMISSION
								</div>
							</div>
						</div>

						{/* Row 2: small underwhelming number */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative',
								minHeight: 196,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 20,
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										color: '#FF8A3D',
										fontSize: 60,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1,
										transform: `scale(${0.82 + percentPop * 0.18})`,
										textShadow: '0 2px 10px rgba(255,138,61,0.18)',
									}}
								>
									4%
								</div>

								<div
									style={{
										width: 180,
										height: 8,
										borderRadius: 999,
										backgroundColor: '#F4F4F4',
										transform: `scaleX(${underlineGrow}) scaleY(${underlinePulse})`,
										opacity: 0.9,
									}}
								/>
							</div>

							{/* Half circle accent kept outside text bounds */}
							<svg
								width="260"
								height="180"
								viewBox="0 0 260 180"
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									transform: 'translate(-50%, -50%)',
									overflow: 'visible',
									pointerEvents: 'none',
									zIndex: 1,
								}}
							>
								<circle
									cx="130"
									cy="92"
									r="86"
									fill="none"
									stroke="#F4F4F4"
									strokeWidth="10"
									strokeLinecap="round"
									strokeDasharray={pathLength}
									strokeDashoffset={dashOffset}
									opacity={0.95}
								/>
							</svg>

							{/* Smudge erase effect away from letters */}
							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									transform: `translate(calc(-50% + ${smudgeX}px), -50%) rotate(-8deg)`,
									width: 128,
									height: 44,
									borderRadius: 28,
									background:
										'linear-gradient(90deg, rgba(26,32,38,0.02) 0%, rgba(26,32,38,0.18) 35%, rgba(26,32,38,0.26) 60%, rgba(26,32,38,0.10) 100%)',
									filter: 'blur(5px)',
									opacity: smudgeOpacity,
									pointerEvents: 'none',
									zIndex: 3,
								}}
							/>
						</div>

						{/* Row 3: handwritten note in separate row to prevent collisions */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: 92,
							}}
						>
							<div
								style={{
									backgroundColor: 'rgba(26,32,38,0.55)',
									border: '3px solid #FF8A3D',
									borderRadius: 18,
									padding: '12px 26px',
									transform: `scale(${noteEntrance}) rotate(-2deg)`,
									boxShadow: '0 8px 20px rgba(0,0,0,0.26)',
								}}
							>
								<div
									style={{
										color: '#F4F4F4',
										fontSize: 34,
										fontWeight: 900,
										letterSpacing: 1,
										textTransform: 'lowercase',
										lineHeight: 1,
									}}
								>
									not crazy
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FF8A3D',
						borderRadius: 20,
						padding: '16px 32px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#1A2026',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
						}}
					>
						Real upside lives beyond base payout
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}