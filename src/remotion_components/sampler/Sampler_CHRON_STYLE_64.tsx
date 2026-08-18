import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_64() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: entrance
	const masterIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const badgeIn = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	// Beat 2: state / metric activation
	const commissionNumber = Math.round(interpolate(frame, [16, 48], [12, 50], clamp));
	const cueBlink = frame >= 24 && frame <= 72 && Math.floor(frame / 6) % 2 === 0;
	const activationGlow = interpolate(frame, [22, 36, 56], [0, 1, 0.55], clamp);
	const metricScale = interpolate(frame, [26, 36, 46], [1, 1.06, 1], clamp);

	// Beat 3: living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const badgeFloat = Math.sin(frame * 0.1 + 0.4) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const spotlightX = interpolate((frame + 10) % 95, [0, 95], [-320, 1180], clamp);
	const lineDraw = interpolate(frame, [14, 38], [0, 1], clamp);
	const curtainWipe = interpolate(frame, [0, 16], [100, 0], clamp);
	const lateCurtain = interpolate(frame, [durationInFrames - 16, durationInFrames], [0, -100], clamp);

	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const cardShadow = 20 + Math.sin(frame * 0.18) * 4;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#15131A',
				fontFamily:
					'"SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", monospace',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
				opacity,
			}}
		>
			{/* curtain wipes */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `translateX(${-curtainWipe}%)`,
					background:
						'linear-gradient(90deg, rgba(255,210,63,0.16) 0%, rgba(255,210,63,0.04) 38%, rgba(255,210,63,0) 62%)',
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `translateX(${lateCurtain}%)`,
					background:
						'linear-gradient(270deg, rgba(63,167,214,0.14) 0%, rgba(63,167,214,0.03) 40%, rgba(63,167,214,0) 66%)',
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 16px 42px',
					boxSizing: 'border-box',
					position: 'relative',
					transform: `scale(${masterIn})`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '12px 24px',
						border: '2px solid #3FA7D6',
						borderRadius: 16,
						backgroundColor: 'rgba(255,232,176,0.08)',
						boxShadow: '0 8px 24px rgba(0,0,0,0.32)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: cueBlink ? '#FFD23F' : '#3FA7D6',
							boxShadow: cueBlink
								? '0 0 16px rgba(255,210,63,0.9)'
								: '0 0 8px rgba(63,167,214,0.55)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F1EADB',
							fontSize: 20,
							fontWeight: 800,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						CUE 64 · STAGE PLOT
					</div>
				</div>

				{/* TIER 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '24px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#FFE8B0',
							border: '4px solid #3FA7D6',
							borderRadius: 34,
							boxShadow: `0 ${cardShadow}px 36px rgba(0,0,0,0.42)`,
							padding: '42px 42px 36px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: '86px 1fr 120px',
							rowGap: 20,
						}}
					>
						{/* spotlight sweep */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 180,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(241,234,219,0.34) 48%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${spotlightX}px) skewX(-18deg)`,
								pointerEvents: 'none',
								opacity: 0.75,
							}}
						/>

						{/* corner cue notes */}
						<div
							style={{
								position: 'absolute',
								left: 22,
								top: 18,
								color: '#15131A',
								fontSize: 15,
								fontWeight: 700,
								letterSpacing: 1.4,
								opacity: 0.72,
							}}
						>
							64A
						</div>
						<div
							style={{
								position: 'absolute',
								right: 22,
								top: 18,
								color: '#15131A',
								fontSize: 15,
								fontWeight: 700,
								letterSpacing: 1.4,
								opacity: 0.72,
							}}
						>
							ACTIVATION
						</div>
						<div
							style={{
								position: 'absolute',
								left: 22,
								bottom: 18,
								color: '#15131A',
								fontSize: 15,
								fontWeight: 700,
								letterSpacing: 1.4,
								opacity: 0.72,
							}}
						>
							GO
						</div>

						{/* row 1 */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 20,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#15131A',
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 2.8,
									textTransform: 'uppercase',
									alignSelf: 'flex-start',
									paddingTop: 10,
									whiteSpace: 'nowrap',
								}}
							>
								SCENE MARK
							</div>

							<div
								style={{
									flex: 1,
									height: 34,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									marginTop: 4,
								}}
							>
								<svg
									width="100%"
									height="34"
									viewBox="0 0 560 34"
									preserveAspectRatio="none"
									style={{overflow: 'visible'}}
								>
									<path
										d="M 6 17 L 554 17"
										stroke="#3FA7D6"
										strokeWidth="3"
										strokeLinecap="round"
										strokeDasharray="548"
										strokeDashoffset={548 * (1 - lineDraw)}
										fill="none"
										opacity={0.95}
									/>
									<circle
										cx={6 + 548 * lineDraw}
										cy="17"
										r="5.5"
										fill="#FFD23F"
										opacity={lineDraw}
									/>
								</svg>
							</div>

							<div
								style={{
									color: '#15131A',
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 2.8,
									textTransform: 'uppercase',
									alignSelf: 'flex-start',
									paddingTop: 10,
									whiteSpace: 'nowrap',
								}}
							>
								FOCUS
							</div>
						</div>

						{/* row 2 */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 28,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#15131A',
									fontSize: 76,
									fontWeight: 1000,
									lineHeight: 0.98,
									letterSpacing: -2.2,
									textTransform: 'uppercase',
									textAlign: 'center',
									maxWidth: '92%',
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '18px 34px',
									borderRadius: 24,
									border: '3px solid #FFD23F',
									backgroundColor: '#15131A',
									boxShadow: `0 0 ${18 + activationGlow * 14}px rgba(255,210,63,0.35)`,
									transform: `scale(${metricScale})`,
									minWidth: 560,
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 18,
										top: 12,
										color: '#3FA7D6',
										fontSize: 14,
										fontWeight: 800,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
										opacity: 0.9,
									}}
								>
									commission cue
								</div>

								<div
									style={{
										color: '#FFD23F',
										fontSize: 72,
										fontWeight: 1000,
										letterSpacing: -1.5,
										lineHeight: 1,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									{commissionNumber}% COMMISSION
								</div>
							</div>
						</div>

						{/* row 3 */}
						<div
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								justifyContent: 'space-between',
								gap: 24,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									gap: 8,
									width: 180,
								}}
							>
								<div
									style={{
										color: '#15131A',
										fontSize: 16,
										fontWeight: 800,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									LX NOTE
								</div>
								<div
									style={{
										height: 10,
										width: 120,
										borderRadius: 999,
										backgroundColor: cueBlink ? '#FFD23F' : '#3FA7D6',
										boxShadow: cueBlink
											? '0 0 16px rgba(255,210,63,0.7)'
											: '0 0 10px rgba(63,167,214,0.45)',
									}}
								/>
							</div>

							<div
								style={{
									color: '#15131A',
									fontSize: 22,
									fontWeight: 900,
									letterSpacing: 3.2,
									textTransform: 'uppercase',
									textAlign: 'center',
									padding: '12px 20px',
									border: '2px dashed #15131A',
									borderRadius: 16,
									backgroundColor: 'rgba(255,210,63,0.14)',
									whiteSpace: 'nowrap',
								}}
							>
								ACTIVATION CODE
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
									gap: 8,
									width: 180,
								}}
							>
								<div
									style={{
										color: '#15131A',
										fontSize: 16,
										fontWeight: 800,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									SPOT SWEEP
								</div>
								<div
									style={{
										width: 132,
										height: 14,
										borderRadius: 999,
										border: '2px solid #3FA7D6',
										position: 'relative',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: 1,
											bottom: 1,
											width: 42,
											borderRadius: 999,
											backgroundColor: '#3FA7D6',
											transform: `translateX(${interpolate(
												(frame + 8) % 42,
												[0, 42],
												[-6, 96],
												clamp
											)}px)`,
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#FFD23F',
						border: '3px solid #3FA7D6',
						borderRadius: 20,
						padding: '16px 32px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.32)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#15131A',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.4,
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