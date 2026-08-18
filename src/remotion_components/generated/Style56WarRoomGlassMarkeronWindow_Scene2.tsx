import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene2() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance
	// ------------------------------------------
	const heroEntrance = spring({
		frame,
		fps,
		config: {
			damping: 12,
			stiffness: 220,
			mass: 0.65,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 11,
			stiffness: 240,
			mass: 0.55,
		},
	});

	const productStrokeProgress = interpolate(frame, [0, 24], [0, 1], clamp);
	const glareSweep = interpolate(frame, [6, 28], [-260, 980], clamp);

	// ------------------------------------------
	// Beat 2: Active campaign assignment
	// ------------------------------------------
	const campaignReveal = spring({
		frame: frame - 28,
		fps,
		config: {
			damping: 12,
			stiffness: 180,
			mass: 0.7,
		},
	});

	const underlineDraw = interpolate(frame, [34, 54], [0, 1], clamp);
	const arrow1Draw = interpolate(frame, [40, 62], [0, 1], clamp);
	const arrow2Draw = interpolate(frame, [46, 68], [0, 1], clamp);

	const isThunk = frame >= 48 && frame <= 54;
	const thunkY = isThunk ? 10 : 0;
	const thunkShadow = isThunk ? 8 : 18;

	// ------------------------------------------
	// Beat 3: Living loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const tilt = Math.sin(frame * 0.08) * 2.1;
	const shadowPulse = thunkShadow + Math.sin(frame * 0.18) * 4;
	const underlinePulse = 1 + Math.sin(frame * 0.16) * 0.04;
	const roomShift = Math.sin(frame * 0.05) * 18;
	const focusRack = 0.94 + (Math.sin(frame * 0.07) + 1) * 0.03;
	const smudgeOpacity = interpolate(frame, [84, 104], [0, 0.22], clamp);
	const lateGlare = interpolate((frame + 10) % 72, [0, 72], [-340, 1020], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -70],
		clamp
	);
	const exitOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);
	const exitScale = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[1, 0.96],
		clamp
	);

	const rectPerimeter = 2 * (620 + 270);
	const productStrokeDash = rectPerimeter * (1 - productStrokeProgress);

	const arrow1Len = 150;
	const arrow2Len = 138;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1A2026',
				fontFamily: '"Impact", "Arial Black", "Helvetica Neue", sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				opacity: exitOpacity,
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 120,
						left: -120 + roomShift,
						width: 420,
						height: 220,
						borderRadius: 36,
						background:
							'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))',
						filter: `blur(${10 * focusRack}px)`,
						opacity: 0.22,
					}}
				/>
				<div
					style={{
						position: 'absolute',
						right: -80 - roomShift * 0.6,
						bottom: 110,
						width: 360,
						height: 240,
						borderRadius: 40,
						background:
							'linear-gradient(135deg, rgba(77,208,225,0.08), rgba(255,255,255,0.02))',
						filter: `blur(${14 * focusRack}px)`,
						opacity: 0.18,
					}}
				/>
			</div>

			<div
				style={{
					width: '94%',
					maxWidth: 940,
					height: '86%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '66px 18px 62px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px) scale(${exitScale})`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#39414B',
						border: '3px solid #4DD0E1',
						borderRadius: 18,
						padding: '12px 30px',
						boxShadow: '0 8px 22px rgba(0,0,0,0.42)',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
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
						WAR ROOM PRIORITY
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
						transform: `scale(${heroEntrance}) translateY(${hoverY + thunkY}px) rotate(${tilt}deg)`,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#39414B',
							border: '4px solid #4DD0E1',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.58)`,
							padding: '42px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							gap: 24,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Glass glare sweeps */}
						<div
							style={{
								position: 'absolute',
								top: -30,
								bottom: -30,
								width: 130,
								background:
									'linear-gradient(180deg, rgba(77,208,225,0.00), rgba(77,208,225,0.18), rgba(255,255,255,0.08), rgba(77,208,225,0.00))',
								transform: `translateX(${glareSweep}px) skewX(-24deg)`,
								pointerEvents: 'none',
								opacity: frame <= 30 ? 1 : 0,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(180deg, rgba(255,255,255,0.00), rgba(255,255,255,0.10), rgba(77,208,225,0.10), rgba(255,255,255,0.00))',
								transform: `translateX(${lateGlare}px) skewX(-22deg)`,
								pointerEvents: 'none',
								opacity: frame >= 70 ? 0.7 : 0.28,
							}}
						/>

						{/* Smudge */}
						<div
							style={{
								position: 'absolute',
								right: 34,
								top: 38,
								width: 88,
								height: 56,
								borderRadius: 999,
								background:
									'radial-gradient(circle, rgba(244,244,244,0.20) 0%, rgba(244,244,244,0.08) 42%, rgba(244,244,244,0.00) 75%)',
								filter: 'blur(8px)',
								opacity: smudgeOpacity,
								pointerEvents: 'none',
							}}
						/>

						{/* Row 1: top label */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: 68,
							}}
						>
							<div
								style={{
									color: '#F4F4F4',
									fontSize: 58,
									fontWeight: 1000,
									lineHeight: 1,
									letterSpacing: 2,
									textTransform: 'uppercase',
									textAlign: 'center',
								}}
							>
								XYZ PRODUCT
							</div>
						</div>

						{/* Row 2: product box drawing area */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: 270,
								paddingTop: 6,
								paddingBottom: 6,
							}}
						>
							<div
								style={{
									width: 660,
									height: 290,
									position: 'relative',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<svg
									width="660"
									height="290"
									viewBox="0 0 660 290"
									style={{
										position: 'absolute',
										inset: 0,
										overflow: 'visible',
									}}
								>
									<rect
										x="20"
										y="10"
										width="620"
										height="270"
										rx="24"
										fill="rgba(26,32,38,0.22)"
										stroke="#F4F4F4"
										strokeWidth="8"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeDasharray={rectPerimeter}
										strokeDashoffset={productStrokeDash}
										filter="drop-shadow(0 5px 10px rgba(0,0,0,0.25))"
									/>
								</svg>

								<div
									style={{
										position: 'absolute',
										inset: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										transform: `scale(${0.94 + heroEntrance * 0.06})`,
									}}
								>
									<div
										style={{
											padding: '16px 34px',
											borderRadius: 18,
											backgroundColor: 'rgba(26,32,38,0.72)',
											border: '3px solid rgba(255,138,61,0.9)',
											boxShadow: '0 8px 20px rgba(255,138,61,0.18)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<span
											style={{
												color: '#F4F4F4',
												fontSize: 64,
												fontWeight: 1000,
												lineHeight: 1,
												letterSpacing: 2,
												textTransform: 'uppercase',
											}}
										>
											XYZ PRODUCT
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Row 3: campaign label row */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-end',
								gap: 28,
								minHeight: 120,
							}}
						>
							<div
								style={{
									width: 240,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'flex-end',
									gap: 16,
									transform: `scale(${campaignReveal})`,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 14,
									}}
								>
									<div
										style={{
											width: 20,
											height: 70,
											borderLeft: '6px solid #FF8A3D',
											borderTop: '6px solid #FF8A3D',
											borderBottom: '6px solid #FF8A3D',
											borderTopLeftRadius: 18,
											borderBottomLeftRadius: 18,
										}}
									/>
									<div
										style={{
											color: '#FF8A3D',
											fontSize: 54,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: 2,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										CAMPAIGN
									</div>
								</div>

								<div
									style={{
										width: 220,
										height: 10,
										backgroundColor: '#FF8A3D',
										borderRadius: 999,
										transformOrigin: 'left center',
										transform: `scaleX(${underlineDraw * underlinePulse})`,
										boxShadow: '0 0 14px rgba(255,138,61,0.35)',
									}}
								/>
							</div>

							<div
								style={{
									flex: 1,
									height: 88,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<svg width="100%" height="88" viewBox="0 0 360 88">
									<defs>
										<marker
											id="arrowhead56a"
											markerWidth="12"
											markerHeight="12"
											refX="10"
											refY="6"
											orient="auto"
										>
											<path d="M0,0 L12,6 L0,12 z" fill="#4DD0E1" />
										</marker>
										<marker
											id="arrowhead56b"
											markerWidth="12"
											markerHeight="12"
											refX="10"
											refY="6"
											orient="auto"
										>
											<path d="M0,0 L12,6 L0,12 z" fill="#4DD0E1" />
										</marker>
									</defs>

									<line
										x1="18"
										y1="28"
										x2={18 + arrow1Len * arrow1Draw}
										y2={28}
										stroke="#4DD0E1"
										strokeWidth="6"
										strokeLinecap="round"
										markerEnd={arrow1Draw > 0.96 ? 'url(#arrowhead56a)' : undefined}
									/>
									<line
										x1="34"
										y1="62"
										x2={34 + arrow2Len * arrow2Draw}
										y2={62}
										stroke="#4DD0E1"
										strokeWidth="6"
										strokeLinecap="round"
										markerEnd={arrow2Draw > 0.96 ? 'url(#arrowhead56b)' : undefined}
									/>

									<circle
										cx="258"
										cy="28"
										r="10"
										fill="rgba(77,208,225,0.14)"
										stroke="#4DD0E1"
										strokeWidth="4"
										opacity={arrow1Draw}
									/>
									<circle
										cx="242"
										cy="62"
										r="10"
										fill="rgba(77,208,225,0.14)"
										stroke="#4DD0E1"
										strokeWidth="4"
										opacity={arrow2Draw}
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${heroEntrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FF8A3D',
						borderRadius: 20,
						padding: '16px 32px',
						boxShadow: '0 8px 22px rgba(0,0,0,0.42)',
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
						FOCUS PROMO ENERGY ON ONE WINNER
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}