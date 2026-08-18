import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene50() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const palette = ['#FFF8E7', '#000000', '#FF90E8', '#F1F333', '#23A094'];
	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — hard rocket entrance with spring overshoot.
	const cardEntrance = spring({
		frame,
		fps,
		config: {
			damping: 9,
			stiffness: 280,
			mass: 0.52,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 11,
			stiffness: 300,
			mass: 0.45,
		},
	});

	const rocketY = interpolate(frame, [0, 11, 20], [430, -24, 0], clamp);
	const rocketRotation = interpolate(frame, [0, 10, 20], [-8, 2.5, 0], clamp);

	// Beat 2 — cursor click and location roll.
	const cursorVisible = frame >= 25 && frame <= 73;
	const cursorX = interpolate(frame, [25, 43], [220, 4], clamp);
	const cursorY = interpolate(frame, [25, 43], [180, 4], clamp);
	const isClicking = frame >= 44 && frame <= 50;
	const clickThunk = isClicking ? 10 : 0;

	const switchProgress = interpolate(frame, [48, 57], [0, 1], clamp);
	const localY = interpolate(switchProgress, [0, 1], [0, -92], clamp);
	const pakistanY = interpolate(switchProgress, [0, 1], [92, 0], clamp);

	const stampEntrance = spring({
		frame: frame - 55,
		fps,
		config: {
			damping: 8,
			stiffness: 330,
			mass: 0.38,
		},
	});

	const shock = interpolate(
		frame,
		[55, 58, 62, 67],
		[0, 18, 9, 0],
		clamp,
	);

	// Beat 3 — perpetual living physics.
	const livingStrength = interpolate(frame, [76, 84], [0, 1], clamp);
	const hoverY = Math.sin(frame * 0.12) * 6 * livingStrength;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35 * livingStrength;
	const shadowPulse = Math.sin(frame * 0.18) * 3 * livingStrength;
	const pinPulse = 1 + Math.sin(frame * 0.22) * 0.2;
	const pinHalo = 0.2 + (Math.sin(frame * 0.22) + 1) * 0.25;

	const underlineCycle = ((frame - 80 + 180) % 45) / 45;
	const underlineX = interpolate(underlineCycle, [0, 1], [-130, 520], clamp);
	const shineCycle = ((frame + 18) % 64) / 64;
	const shineX = interpolate(shineCycle, [0, 1], [-340, 930], clamp);

	// Shadow jump immediately before exit.
	const preExitJump =
		frame >= durationInFrames - 18 && frame < durationInFrames - 11 ? 14 : 0;
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -150],
		clamp,
	);
	const exitRotation = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, 5],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 7, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const shadowDepth =
		12 + shadowPulse + preExitJump - (isClicking ? 8 : 0);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette[0],
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Arial, sans-serif',
				color: palette[1],
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					padding: '80px 20px',
					boxSizing: 'border-box',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						width: '88%',
						maxWidth: 900,
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 16,
						transform: `translateY(${exitY}px) rotate(${exitRotation}deg)`,
					}}
				>
					{/* Tier 1 — category button */}
					<div
						style={{
							height: '15%',
							width: '100%',
							display: 'flex',
							alignItems: 'flex-start',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 16,
								padding: '12px 26px',
								backgroundColor: palette[2],
								border: `4px solid ${palette[1]}`,
								borderRadius: 12,
								boxShadow: `7px 7px 0 ${palette[1]}`,
								transform: `scale(${badgeEntrance}) translateY(${
									Math.sin(frame * 0.11) * 2
								}px)`,
							}}
						>
							<div
								style={{
									width: 12,
									height: 12,
									borderRadius: '50%',
									backgroundColor: palette[1],
								}}
							/>
							<div
								style={{
									fontSize: 20,
									fontWeight: 950,
									letterSpacing: 3,
									lineHeight: 1,
									textTransform: 'uppercase',
								}}
							>
								Office Location
							</div>
						</div>
					</div>

					{/* Tier 2 — one hero location card */}
					<div
						style={{
							height: '65%',
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
						}}
					>
						<div
							style={{
								width: '100%',
								position: 'relative',
								transform: `translateY(${
									rocketY + hoverY + clickThunk
								}px) rotate(${
									rocketRotation + hoverTilt
								}deg) scale(${cardEntrance})`,
							}}
						>
							<div
								style={{
									width: '100%',
									minHeight: 410,
									padding: '48px 42px',
									boxSizing: 'border-box',
									backgroundColor: palette[3],
									border: `6px solid ${palette[1]}`,
									borderRadius: 22,
									boxShadow: `${shadowDepth}px ${shadowDepth}px 0 ${palette[1]}`,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								{/* Continuous traveling shine */}
								<div
									style={{
										position: 'absolute',
										top: -40,
										bottom: -40,
										left: 0,
										width: 100,
										backgroundColor: 'rgba(255,255,255,0.42)',
										transform: `translateX(${shineX}px) skewX(-22deg)`,
										pointerEvents: 'none',
									}}
								/>

								<div
									style={{
										padding: '8px 18px',
										backgroundColor: palette[1],
										color: palette[0],
										border: `3px solid ${palette[1]}`,
										borderRadius: 8,
										fontSize: 18,
										fontWeight: 950,
										letterSpacing: 4,
										textTransform: 'uppercase',
										zIndex: 2,
									}}
								>
									Active Workspace
								</div>

								<div
									style={{
										width: '100%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										zIndex: 2,
									}}
								>
									{/* Pulsing pin-point */}
									<div
										style={{
											width: 25,
											height: 25,
											flexShrink: 0,
											borderRadius: '50%',
											backgroundColor: palette[2],
											border: `5px solid ${palette[1]}`,
											transform: `scale(${pinPulse})`,
											boxShadow: `0 0 0 ${
												10 + pinPulse * 4
											}px rgba(35,160,148,${pinHalo})`,
										}}
									/>

									{/* Rolling underlined location */}
									<div
										style={{
											height: 92,
											width: 560,
											maxWidth: '78%',
											position: 'relative',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												position: 'absolute',
												inset: 0,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: 62,
												fontWeight: 950,
												lineHeight: 1,
												letterSpacing: -2,
												whiteSpace: 'nowrap',
												transform: `translateY(${localY}px)`,
											}}
										>
											LOCAL ONLY
										</div>

										<div
											style={{
												position: 'absolute',
												inset: 0,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: 62,
												fontWeight: 950,
												lineHeight: 1,
												letterSpacing: -2,
												whiteSpace: 'nowrap',
												transform: `translateY(${pakistanY}px)`,
											}}
										>
											PAKISTAN
										</div>

										<div
											style={{
												position: 'absolute',
												left: 10,
												right: 10,
												bottom: 3,
												height: 8,
												backgroundColor: palette[1],
												overflow: 'hidden',
											}}
										>
											<div
												style={{
													position: 'absolute',
													top: 0,
													left: 0,
													width: 125,
													height: '100%',
													backgroundColor: palette[2],
													transform: `translateX(${underlineX}px)`,
												}}
											/>
										</div>
									</div>
								</div>

								{/* Sticker-slap state */}
								<div
									style={{
										padding: '12px 25px',
										backgroundColor: palette[2],
										border: `4px solid ${palette[1]}`,
										borderRadius: 10,
										boxShadow: `0 0 0 ${shock}px ${palette[4]}, 6px 6px 0 ${palette[1]}`,
										fontSize: 24,
										fontWeight: 950,
										letterSpacing: 3,
										lineHeight: 1,
										textTransform: 'uppercase',
										transform: `scale(${stampEntrance}) rotate(-3deg)`,
										zIndex: 3,
									}}
								>
									Remote Office
								</div>
							</div>

							{/* Cursor click */}
							{cursorVisible ? (
								<div
									style={{
										position: 'absolute',
										right: '23%',
										bottom: '19%',
										zIndex: 10,
										transform: `translate(${cursorX}px, ${cursorY}px) scale(${
											isClicking ? 0.78 : 1
										})`,
										filter: isClicking
											? 'drop-shadow(2px 2px 0 #23A094)'
											: 'drop-shadow(7px 7px 0 #23A094)',
										pointerEvents: 'none',
									}}
								>
									<svg
										width="58"
										height="68"
										viewBox="0 0 58 68"
										fill="none"
									>
										<path
											d="M5 4L52 40L31 43L23 63L5 4Z"
											fill={palette[1]}
											stroke={palette[0]}
											strokeWidth="5"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							) : null}
						</div>
					</div>

					{/* Tier 3 — punchline button */}
					<div
						style={{
							height: '20%',
							width: '100%',
							display: 'flex',
							alignItems: 'flex-end',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								padding: '15px 30px',
								backgroundColor: palette[4],
								color: palette[0],
								border: `4px solid ${palette[1]}`,
								borderRadius: 12,
								boxShadow: `7px 7px 0 ${palette[1]}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								transform: `scale(${badgeEntrance}) translateY(${
									Math.sin(frame * 0.12 + 1) * 3
								}px)`,
								fontSize: 23,
								fontWeight: 950,
								letterSpacing: 2,
								lineHeight: 1.1,
								textAlign: 'center',
								textDecoration: 'underline',
								textDecorationThickness: 3,
								textUnderlineOffset: 6,
								textTransform: 'uppercase',
							}}
						>
							Operate Anywhere
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}