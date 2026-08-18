import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene43() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// BEAT 1 — violent card crash with spring overshoot.
	const cardEntrance = spring({
		frame,
		fps,
		config: {
			damping: 9,
			stiffness: 250,
			mass: 0.68,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.55,
		},
	});

	const footerEntrance = spring({
		frame: frame - 7,
		fps,
		config: {
			damping: 11,
			stiffness: 240,
			mass: 0.58,
		},
	});

	const crashX = (1 - cardEntrance) * -920;
	const crashY = (1 - cardEntrance) * -120;
	const crashRotation = (1 - cardEntrance) * -19;

	// BEAT 2 — cursor click, physical thunk, color wipe, copy flip and stamp.
	const cursorVisible = frame >= 25 && frame <= 68;
	const cursorX = interpolate(frame, [25, 43], [210, 0], clamp);
	const cursorY = interpolate(frame, [25, 43], [135, 0], clamp);

	const isClicking = frame >= 44 && frame <= 50;
	const clickThunk = isClicking ? 9 : 0;
	const clickScale = isClicking ? 0.88 : 1;

	const wipeProgress = interpolate(frame, [48, 66], [0, 100], clamp);

	const negativeFlip = interpolate(frame, [49, 56], [0, 90], clamp);
	const positiveFlip = interpolate(frame, [55, 63], [-90, 0], clamp);

	const stampEntrance = spring({
		frame: frame - 62,
		fps,
		config: {
			damping: 8,
			stiffness: 300,
			mass: 0.48,
		},
	});

	const stampThunk = frame >= 65 && frame <= 69 ? 7 : 0;

	// BEAT 3 — continuously alive hover, hard tilts, shadow pulse and shine.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const subtleTilt = Math.sin(frame * 0.08) * 1.1;

	const beatThreeFrame = Math.max(0, frame - 84);
	const hardTiltPhase = beatThreeFrame % 24;
	const hardTilt =
		frame < 84
			? 0
			: hardTiltPhase < 6
				? -2.2
				: hardTiltPhase < 12
					? 2.4
					: hardTiltPhase < 18
						? -1.1
						: 1.3;

	const shadowDepth =
		12 + Math.sin(frame * 0.18) * 3 - (isClicking ? 7 : 0);

	const shineX = interpolate((frame + 13) % 62, [0, 62], [-220, 920], clamp);
	const underlineCycle = (frame * 8) % 310;

	const exitX = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, 850],
		clamp,
	);
	const exitRotation = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, 8],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 3, durationInFrames - 5, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const positiveState = frame >= 55;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, system-ui, sans-serif',
				color: '#000000',
				padding: '80px 20px',
				boxSizing: 'border-box',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '88%',
					maxWidth: 840,
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				{/* TIER 1 — CATEGORY */}
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
							justifyContent: 'center',
							gap: 16,
							padding: '11px 24px',
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 13,
							boxShadow: '6px 6px 0 #000000',
							transform: `translateY(${Math.sin(frame * 0.1) * 3}px) scale(${badgeEntrance}) rotate(${Math.sin(
								frame * 0.07,
							) * 0.6}deg)`,
							transformOrigin: 'center',
						}}
					>
						<span
							style={{
								width: 11,
								height: 11,
								flex: '0 0 auto',
								borderRadius: '50%',
								backgroundColor: '#000000',
							}}
						/>
						<span
							style={{
								fontSize: 19,
								fontWeight: 950,
								letterSpacing: 3.5,
								lineHeight: 1,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Activation Code
						</span>
					</div>
				</div>

				{/* TIER 2 — SINGLE HERO CARD */}
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
							maxWidth: 790,
							position: 'relative',
							transform: `translate(${crashX + exitX}px, ${
								crashY + hoverY + clickThunk
							}px) rotate(${
								crashRotation + subtleTilt + hardTilt + exitRotation
							}deg) scale(${cardEntrance})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								width: '100%',
								height: 410,
								position: 'relative',
								overflow: 'hidden',
								boxSizing: 'border-box',
								border: '6px solid #000000',
								borderRadius: 24,
								backgroundColor: '#000000',
								boxShadow: `${shadowDepth}px ${shadowDepth}px 0 #23A094`,
							}}
						>
							{/* Yellow transformation wipe */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									backgroundColor: '#F1F333',
									clipPath: `inset(0 ${100 - wipeProgress}% 0 0)`,
								}}
							/>

							{/* Traveling shine sweep */}
							<div
								style={{
									position: 'absolute',
									zIndex: 2,
									top: -40,
									bottom: -40,
									left: 0,
									width: 92,
									backgroundColor: positiveState
										? 'rgba(255,255,255,0.48)'
										: 'rgba(255,144,232,0.24)',
									transform: `translateX(${shineX}px) skewX(-24deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									position: 'relative',
									zIndex: 4,
									width: '100%',
									height: '100%',
									padding: '42px 48px 38px',
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 16,
								}}
							>
								<div
									style={{
										minHeight: 205,
										width: '100%',
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										perspective: 700,
									}}
								>
									{/* Negative comment */}
									<div
										style={{
											position: 'absolute',
											inset: 0,
											display: frame > 57 ? 'none' : 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											gap: 16,
											color: '#FF90E8',
											textAlign: 'center',
											transform: `rotateX(${negativeFlip}deg)`,
											transformOrigin: 'center bottom',
											backfaceVisibility: 'hidden',
										}}
									>
										<div
											style={{
												fontSize: 22,
												fontWeight: 950,
												letterSpacing: 4,
												lineHeight: 1,
												textTransform: 'uppercase',
											}}
										>
											Negative Comment
										</div>
										<div
											style={{
												maxWidth: 650,
												fontSize: 47,
												fontWeight: 950,
												letterSpacing: -1.5,
												lineHeight: 1.03,
											}}
										>
											“THIS IDEA WILL NEVER WORK.”
										</div>
									</div>

									{/* Positive response */}
									<div
										style={{
											position: 'absolute',
											inset: 0,
											display: frame < 53 ? 'none' : 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											gap: 16,
											color: '#000000',
											textAlign: 'center',
											transform: `rotateX(${positiveFlip}deg)`,
											transformOrigin: 'center top',
											backfaceVisibility: 'hidden',
										}}
									>
										<div
											style={{
												fontSize: 22,
												fontWeight: 950,
												letterSpacing: 4,
												lineHeight: 1,
												textTransform: 'uppercase',
											}}
										>
											Positive Response
										</div>
										<div
											style={{
												maxWidth: 650,
												fontSize: 45,
												fontWeight: 950,
												letterSpacing: -1.5,
												lineHeight: 1.03,
											}}
										>
											“THANKS. LET’S MAKE IT STRONGER.”
										</div>
									</div>
								</div>

								{/* Reply button belongs to the single hero card */}
								<div
									style={{
										minWidth: 330,
										height: 68,
										position: 'relative',
										overflow: 'hidden',
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										padding: '14px 28px',
										backgroundColor: positiveState ? '#FF90E8' : '#F1F333',
										color: '#000000',
										border: '4px solid #000000',
										borderRadius: 12,
										boxShadow: isClicking
											? '2px 2px 0 #000000'
											: '7px 7px 0 #23A094',
										transform: `translateY(${isClicking ? 6 : 0}px)`,
									}}
								>
									<span
										style={{
											position: 'relative',
											zIndex: 2,
											fontSize: 21,
											fontWeight: 950,
											letterSpacing: 2.4,
											lineHeight: 1,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										Reply With Grace
									</span>

									{/* Repeating underline sweep */}
									<div
										style={{
											position: 'absolute',
											zIndex: 3,
											left: 24,
											bottom: 9,
											width: 110,
											height: 5,
											backgroundColor: '#000000',
											transform: `translateX(${underlineCycle - 125}px)`,
										}}
									/>
								</div>
							</div>

							{/* Teal impact stamp */}
							{frame >= 61 && (
								<div
									style={{
										position: 'absolute',
										zIndex: 12,
										right: 28,
										top: 22,
										padding: '10px 17px',
										backgroundColor: '#23A094',
										color: '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 10,
										boxShadow: `${4 - stampThunk / 2}px ${
											4 - stampThunk / 2
										}px 0 #000000`,
										fontSize: 17,
										fontWeight: 950,
										letterSpacing: 2.5,
										lineHeight: 1,
										textTransform: 'uppercase',
										transform: `translateY(${stampThunk}px) rotate(-8deg) scale(${stampEntrance})`,
									}}
								>
									Grace Sent
								</div>
							)}
						</div>

						{/* Clicking cursor */}
						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									zIndex: 30,
									right: 126,
									bottom: 20,
									filter: 'drop-shadow(5px 6px 0 rgba(0,0,0,0.32))',
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${clickScale})`,
									transformOrigin: 'top left',
									pointerEvents: 'none',
								}}
							>
								<svg
									width="56"
									height="56"
									viewBox="0 0 24 24"
									fill="#FF90E8"
									stroke="#000000"
									strokeWidth="2"
									strokeLinejoin="round"
								>
									<path d="M3.8 2.8L20.4 10.5L13.6 13.1L10.8 20.3L3.8 2.8Z" />
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* TIER 3 — PUNCHLINE */}
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
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '15px 30px',
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 14,
							boxShadow: `${6 + Math.sin(frame * 0.18) * 2}px ${
								6 + Math.sin(frame * 0.18) * 2
							}px 0 #FF90E8`,
							transform: `translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px) scale(${footerEntrance}) rotate(${
								Math.sin(frame * 0.08 + 2) * 0.5
							}deg)`,
						}}
					>
						<span
							style={{
								fontSize: 22,
								fontWeight: 950,
								letterSpacing: 2.6,
								lineHeight: 1,
								textAlign: 'center',
								textTransform: 'uppercase',
							}}
						>
							Compassion Is An Action
						</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}