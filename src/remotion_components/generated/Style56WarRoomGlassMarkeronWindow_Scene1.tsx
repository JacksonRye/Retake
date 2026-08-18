import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene1() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames, width, height} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance / focus rack / marker draw
	// ------------------------------------------
	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.6},
	});

	const phraseDraw = interpolate(frame, [2, 22], [0, 1], clamp);
	const circleProgress = spring({
		frame: frame - 18,
		fps,
		config: {damping: 9, stiffness: 190, mass: 0.8},
	});
	const circleOvershootScale = interpolate(circleProgress, [0, 0.7, 1], [0.85, 1.08, 1], clamp);

	// ------------------------------------------
	// Beat 2: overwrite upgrade / arrow draw
	// ------------------------------------------
	const metricProgress = interpolate(frame, [28, 62], [0, 1], clamp);
	const metricValue = Math.round(interpolate(frame, [28, 62], [18, 50], clamp));
	const showOldMetric = frame < 46;
	const oldMetricOpacity = interpolate(frame, [34, 46], [1, 0], clamp);
	const newMetricOpacity = interpolate(frame, [42, 54], [0, 1], clamp);

	const markerHandVisible = frame >= 30 && frame <= 72;
	const markerX = interpolate(frame, [30, 48, 62, 72], [240, 40, 130, 260], clamp);
	const markerY = interpolate(frame, [30, 48, 62, 72], [110, 32, 4, -18], clamp);
	const markerRotate = interpolate(frame, [30, 72], [18, 10], clamp);

	const isThunk = frame >= 43 && frame <= 49;
	const thunkY = isThunk ? 10 : 0;
	const baseShadow = isThunk ? 10 : 22;

	// ------------------------------------------
	// Beat 3: living physics loop / glare / exit
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.1;
	const shadowPulse = baseShadow + Math.sin(frame * 0.18) * 4;
	const circleWobble = Math.sin(frame * 0.16 + 0.5) * 1.1;
	const glassParallax = Math.sin(frame * 0.09) * 6;
	const glareX = interpolate((frame + 10) % 70, [0, 70], [-260, width + 260], clamp);

	const blurRack = interpolate(frame, [0, 10, 18], [10, 4, 0], clamp);
	const bgDrift = Math.sin(frame * 0.035) * 12;

	const exitSmudge = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, 52],
		clamp
	);
	const exitOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -36],
		clamp
	);

	// SVG geometry
	const phraseStrokeLength = 1650;
	const arrowLength = 430;
	const arrowDraw = interpolate(frame, [42, 64], [0, 1], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1A2026',
				fontFamily: '"Arial Black", Impact, system-ui, sans-serif',
				opacity: exitOpacity,
				overflow: 'hidden',
			}}
		>
			{/* Blurred war-room atmosphere */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					filter: `blur(${blurRack}px)`,
					opacity: 0.55,
					transform: `translateX(${bgDrift}px) scale(1.03)`,
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: '12%',
						left: '8%',
						width: 280,
						height: 180,
						borderRadius: 28,
						background:
							'linear-gradient(135deg, rgba(77,208,225,0.10), rgba(57,65,75,0.04))',
						border: '1px solid rgba(77,208,225,0.10)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						top: '20%',
						right: '10%',
						width: 240,
						height: 150,
						borderRadius: 24,
						background:
							'linear-gradient(135deg, rgba(255,138,61,0.08), rgba(57,65,75,0.04))',
						border: '1px solid rgba(255,138,61,0.10)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: '18%',
						left: '14%',
						width: 220,
						height: 140,
						borderRadius: 22,
						background:
							'linear-gradient(135deg, rgba(244,244,244,0.06), rgba(57,65,75,0.03))',
						border: '1px solid rgba(244,244,244,0.08)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						bottom: '12%',
						right: '16%',
						width: 300,
						height: 170,
						borderRadius: 26,
						background:
							'linear-gradient(135deg, rgba(77,208,225,0.08), rgba(57,65,75,0.02))',
						border: '1px solid rgba(77,208,225,0.08)',
					}}
				/>
			</div>

			{/* Main vertical auto-layout */}
			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
						backgroundColor: '#39414B',
						border: '3px solid #4DD0E1',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 28px rgba(0,0,0,0.38)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#4DD0E1',
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
						War Room Priority
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
						margin: '22px 0',
						position: 'relative',
						transform: `scale(${cardEntrance}) translateY(${hoverY + thunkY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							background:
								'linear-gradient(180deg, rgba(57,65,75,0.62), rgba(57,65,75,0.46))',
							border: '4px solid rgba(244,244,244,0.18)',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 38px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10)`,
							backdropFilter: 'blur(8px)',
							WebkitBackdropFilter: 'blur(8px)',
							padding: '42px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 24,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Glass glare */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 150,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.14), rgba(255,255,255,0))',
								transform: `translateX(${glareX}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Floating pane content */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								gap: 24,
								position: 'relative',
								transform: `translateY(${glassParallax}px)`,
							}}
						>
							{/* Row 1: phrase area */}
							<div
								style={{
									minHeight: 250,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									padding: '8px 20px 6px 20px',
								}}
							>
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 820 250"
									style={{
										position: 'absolute',
										inset: 0,
										overflow: 'visible',
									}}
								>
									{/* Marker phrase stroke reveal */}
									<text
										x="410"
										y="130"
										textAnchor="middle"
										fill="transparent"
										stroke="#F4F4F4"
										strokeWidth="6"
										strokeLinecap="round"
										strokeLinejoin="round"
										style={{
											fontSize: 64,
											fontWeight: 900,
											letterSpacing: 2,
											textTransform: 'uppercase',
											paintOrder: 'stroke',
											strokeDasharray: phraseStrokeLength,
											strokeDashoffset:
												phraseStrokeLength * (1 - phraseDraw),
											opacity: 0.95,
										}}
									>
										INCREASED COMMISSIONS
									</text>

									{/* Orange circle around phrase only, not crossing text */}
									<ellipse
										cx="410"
										cy="128"
										rx="340"
										ry="88"
										fill="none"
										stroke="#FF8A3D"
										strokeWidth="10"
										strokeLinecap="round"
										style={{
											opacity: circleProgress,
											transformOrigin: '410px 128px',
											transform: `scale(${circleOvershootScale}) rotate(${circleWobble}deg)`,
											strokeDasharray: 2200,
											strokeDashoffset: 2200 * (1 - circleProgress),
											filter: 'drop-shadow(0 4px 10px rgba(255,138,61,0.28))',
										}}
									/>
								</svg>

								<div
									style={{
										color: '#F4F4F4',
										fontSize: 64,
										fontWeight: 1000,
										letterSpacing: 2,
										lineHeight: 1.06,
										textTransform: 'uppercase',
										textAlign: 'center',
										opacity: phraseDraw,
										zIndex: 2,
										maxWidth: '90%',
									}}
								>
									INCREASED COMMISSIONS
								</div>
							</div>

							{/* Row 2: metric upgrade area */}
							<div
								style={{
									minHeight: 136,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										backgroundColor: 'rgba(26,32,38,0.72)',
										border: '3px solid #FF8A3D',
										borderRadius: 24,
										padding: '18px 38px',
										boxShadow: '0 8px 24px rgba(255,138,61,0.22)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										minWidth: 250,
										minHeight: 106,
										position: 'relative',
										overflow: 'hidden',
									}}
								>
									{showOldMetric && (
										<div
											style={{
												position: 'absolute',
												color: '#F4F4F4',
												fontSize: 58,
												fontWeight: 1000,
												letterSpacing: 2,
												lineHeight: 1,
												opacity: oldMetricOpacity,
												transform: `translateY(${interpolate(
													frame,
													[34, 46],
													[0, -38],
													clamp
												)}px) rotate(-2deg)`,
											}}
										>
											18%
										</div>
									)}

									<div
										style={{
											position: 'absolute',
											color: '#FF8A3D',
											fontSize: 84,
											fontWeight: 1000,
											letterSpacing: 2,
											lineHeight: 1,
											opacity: newMetricOpacity,
											transform: `translateY(${interpolate(
												frame,
												[42, 54],
												[38, 0],
												clamp
											)}px) rotate(${interpolate(
												frame,
												[42, 54],
												[-2, 0],
												clamp
											)}deg)`,
											filter: 'drop-shadow(0 4px 10px rgba(255,138,61,0.20))',
										}}
									>
										{metricValue}%
									</div>
								</div>
							</div>

							{/* Row 3: arrow in its own dedicated row below text */}
							<div
								style={{
									minHeight: 92,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
								}}
							>
								<svg width="520" height="80" viewBox="0 0 520 80">
									<path
										d="M48 58 C 160 58, 260 46, 402 18"
										fill="none"
										stroke="#4DD0E1"
										strokeWidth="8"
										strokeLinecap="round"
										style={{
											strokeDasharray: arrowLength,
											strokeDashoffset: arrowLength * (1 - arrowDraw),
											filter: 'drop-shadow(0 3px 8px rgba(77,208,225,0.22))',
										}}
									/>
									<path
										d="M388 14 L 430 16 L 408 44"
										fill="none"
										stroke="#4DD0E1"
										strokeWidth="8"
										strokeLinecap="round"
										strokeLinejoin="round"
										style={{
											strokeDasharray: 120,
											strokeDashoffset: 120 * (1 - arrowDraw),
										}}
									/>
								</svg>
							</div>

							{/* Row 4: action tag */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										backgroundColor: '#4DD0E1',
										color: '#1A2026',
										borderRadius: 14,
										padding: '12px 26px',
										fontSize: 22,
										fontWeight: 900,
										letterSpacing: 3,
										textTransform: 'uppercase',
										boxShadow: '0 8px 20px rgba(77,208,225,0.20)',
									}}
								>
									Plan Upgrade Live
								</div>
							</div>
						</div>

						{/* Marker hand / pen - outside text area */}
						{markerHandVisible && (
							<div
								style={{
									position: 'absolute',
									right: '10%',
									top: '28%',
									transform: `translate(${markerX}px, ${markerY}px) rotate(${markerRotate}deg) scale(${isThunk ? 0.95 : 1})`,
									zIndex: 5,
									pointerEvents: 'none',
									filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.35))',
								}}
							>
								<svg width="110" height="34" viewBox="0 0 110 34">
									<rect
										x="18"
										y="10"
										width="72"
										height="14"
										rx="7"
										fill="#F4F4F4"
									/>
									<rect
										x="54"
										y="10"
										width="24"
										height="14"
										rx="4"
										fill="#FF8A3D"
									/>
									<path d="M90 10 L106 17 L90 24 Z" fill="#39414B" />
									<circle cx="17" cy="17" r="7" fill="#4DD0E1" />
								</svg>
							</div>
						)}

						{/* Smudge fade on exit */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(90deg, rgba(26,32,38,0) 0%, rgba(26,32,38,0.10) 35%, rgba(26,32,38,0.82) 100%)',
								transform: `translateX(${exitSmudge}px)`,
								opacity: interpolate(
									frame,
									[durationInFrames - 12, durationInFrames - 1],
									[0, 1],
									clamp
								),
								pointerEvents: 'none',
							}}
						/>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${cardEntrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FF8A3D',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.36)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#1A2026',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						Circle What Pays More
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}