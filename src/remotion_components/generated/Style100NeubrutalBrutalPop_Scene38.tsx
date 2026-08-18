import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene38() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — severe snap entrance.
	const heroEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 270,
			mass: 0.55,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 300,
			mass: 0.5,
		},
	});

	const footerEntrance = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 12,
			stiffness: 260,
			mass: 0.55,
		},
	});

	// Beat 2 — GOD is physically dragged from row two to row one.
	const dragProgress = interpolate(frame, [31, 62], [0, 1], clamp);
	const hasLocked = frame >= 63;
	const cursorVisible = frame >= 27 && frame <= 76;
	const isClicking = frame >= 62 && frame <= 68;

	const godY = interpolate(dragProgress, [0, 1], [104, 0], clamp);
	const businessY = interpolate(dragProgress, [0, 1], [0, 104], clamp);

	// Curved lateral drag path prevents row-label collisions.
	const dragArcX = Math.sin(dragProgress * Math.PI) * 118;
	const cursorX = interpolate(frame, [27, 34, 62, 76], [175, 36, 0, -20], clamp);
	const cursorY = interpolate(frame, [27, 34, 62, 76], [145, 104, 0, -18], clamp);

	const impactProgress = spring({
		frame: frame - 62,
		fps,
		config: {
			damping: 7,
			stiffness: 340,
			mass: 0.42,
		},
	});

	const clickThunk = isClicking ? 8 : 0;

	// Beat 3 — continuous rigid pulse, hover, tilt, underline, shine and shadow pops.
	const beatThree = frame >= 84;
	const rigidBeat = beatThree && frame % 16 < 4 ? 1.035 : 1;
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35;
	const shadowStep = beatThree ? (frame % 12 < 6 ? 14 : 8) : hasLocked ? 10 : 16;
	const shadowPulse = shadowStep + Math.sin(frame * 0.18) * 2;
	const underlineWidth = 42 + (((frame * 7) % 58) / 58) * 58;
	const shineOffset = interpolate((frame + 18) % 62, [0, 62], [-180, 760], clamp);

	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -65],
		clamp,
	);
	const exitTilt = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -4],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const cardColor = hasLocked ? '#23A094' : '#F1F333';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				color: '#000000',
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
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					transform: `translateY(${exitY}px) rotate(${exitTilt}deg)`,
				}}
			>
				{/* Tier 1 — category badge */}
				<div
					style={{
						flex: '0 0 15%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 16,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 12,
							padding: '11px 24px',
							border: '4px solid #000000',
							borderRadius: 12,
							backgroundColor: '#FF90E8',
							boxShadow: '6px 6px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						<div
							style={{
								width: 11,
								height: 11,
								borderRadius: 999,
								backgroundColor: '#000000',
							}}
						/>
						<div
							style={{
								fontSize: 18,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Priority Check
						</div>
					</div>
				</div>

				{/* Tier 2 — exactly one hero card */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						maxWidth: 820,
						minHeight: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 16,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '100%',
							position: 'relative',
							transform: `translateY(${hoverY + clickThunk}px) rotate(${hoverTilt}deg) scale(${heroEntrance})`,
							transformOrigin: 'center center',
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 350,
								padding: '28px 30px 32px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'stretch',
								justifyContent: 'center',
								gap: 22,
								position: 'relative',
								overflow: 'hidden',
								backgroundColor: cardColor,
								border: '6px solid #000000',
								borderRadius: 22,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
							}}
						>
							{/* Continuous traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -30,
									bottom: -30,
									left: 0,
									width: 84,
									backgroundColor: 'rgba(255,255,255,0.30)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
									zIndex: 1,
								}}
							/>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 16,
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										fontSize: 20,
										fontWeight: 950,
										letterSpacing: 3.5,
										lineHeight: 1,
										textTransform: 'uppercase',
									}}
								>
									Priority Order
								</div>
								<div
									style={{
										padding: '7px 12px',
										border: '3px solid #000000',
										borderRadius: 9,
										backgroundColor: hasLocked ? '#FF90E8' : '#FFF8E7',
										boxShadow: '3px 3px 0 #000000',
										fontSize: 14,
										fontWeight: 950,
										letterSpacing: 2,
										lineHeight: 1,
										textTransform: 'uppercase',
									}}
								>
									{hasLocked ? 'Locked' : 'Drag'}
								</div>
							</div>

							<div
								style={{
									height: 202,
									position: 'relative',
									zIndex: 3,
								}}
							>
								{/* BUSINESS row swaps downward */}
								<div
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										height: 86,
										padding: '0 22px',
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'center',
										gap: 16,
										backgroundColor: '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 13,
										boxShadow: '5px 5px 0 #000000',
										transform: `translateY(${businessY}px)`,
									}}
								>
									<div
										style={{
											fontSize: 24,
											fontWeight: 950,
											lineHeight: 1,
											flexShrink: 0,
										}}
									>
										{hasLocked ? '02' : '01'}
									</div>
									<div
										style={{
											flex: 1,
											display: 'flex',
											alignItems: 'center',
											gap: 16,
											fontSize: 34,
											fontWeight: 950,
											lineHeight: 1,
											textTransform: 'uppercase',
										}}
									>
										Business
									</div>
								</div>

								{/* GOD row is the tactile dragged priority */}
								<div
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										height: 86,
										padding: '0 22px',
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'center',
										gap: 16,
										backgroundColor: hasLocked ? '#FF90E8' : '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 13,
										boxShadow: hasLocked
											? '7px 7px 0 #000000'
											: '5px 5px 0 #000000',
										transform: `translate(${dragArcX}px, ${godY}px) scale(${
											hasLocked ? rigidBeat : 1
										})`,
										transformOrigin: 'center center',
										zIndex: 5,
									}}
								>
									<div
										style={{
											fontSize: 24,
											fontWeight: 950,
											lineHeight: 1,
											flexShrink: 0,
										}}
									>
										{hasLocked ? '01' : '02'}
									</div>

									<div
										style={{
											flex: 1,
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-start',
											justifyContent: 'center',
											gap: 7,
										}}
									>
										<div
											style={{
												fontSize: 40,
												fontWeight: 950,
												lineHeight: 0.9,
												letterSpacing: 1,
												textTransform: 'uppercase',
											}}
										>
											God First
										</div>
										<div
											style={{
												width: `${underlineWidth}%`,
												height: 6,
												backgroundColor: '#000000',
												borderRadius: 999,
											}}
										/>
									</div>
								</div>

								{/* Pink impact frame slapped onto the number-one row */}
								{hasLocked && (
									<div
										style={{
											position: 'absolute',
											inset: -9,
											height: 96,
											border: '6px solid #FF90E8',
											borderRadius: 17,
											pointerEvents: 'none',
											zIndex: 4,
											opacity: interpolate(
												impactProgress,
												[0, 0.2, 1],
												[0, 1, 1],
												clamp,
											),
											transform: `scale(${interpolate(
												impactProgress,
												[0, 0.55, 1],
												[1.2, 0.96, 1],
												clamp,
											)}) rotate(${frame % 16 < 8 ? -0.45 : 0.45}deg)`,
										}}
									/>
								)}
							</div>
						</div>

						{/* Cursor follows the dragged GOD row and physically clicks */}
						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									left: '62%',
									top: '44%',
									zIndex: 20,
									filter: isClicking
										? 'drop-shadow(2px 2px 0 #FF90E8)'
										: 'drop-shadow(5px 5px 0 #FF90E8)',
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${
										isClicking ? 0.82 : 1
									})`,
									pointerEvents: 'none',
								}}
							>
								<svg
									width="55"
									height="55"
									viewBox="0 0 24 24"
									fill="#000000"
									stroke="#FFF8E7"
									strokeWidth="1.5"
									strokeLinejoin="round"
								>
									<path d="M4 3.5L20.5 11.1L13.8 13.5L11.2 20.5L4 3.5Z" />
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Tier 3 — punchline */}
				<div
					style={{
						flex: '0 0 20%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 16,
					}}
				>
					<div
						style={{
							padding: '14px 28px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							backgroundColor: '#000000',
							border: '4px solid #000000',
							borderRadius: 13,
							boxShadow: '7px 7px 0 #FF90E8',
							transform: `scale(${footerEntrance}) translateY(${
								Math.sin(frame * 0.12 + 2) * 3
							}px)`,
						}}
					>
						<div
							style={{
								color: '#FFF8E7',
								fontSize: 23,
								fontWeight: 950,
								letterSpacing: 2,
								lineHeight: 1.1,
								textAlign: 'center',
								textDecoration: 'underline',
								textDecorationColor: '#F1F333',
								textDecorationThickness: 5,
								textUnderlineOffset: 7,
								textTransform: 'uppercase',
							}}
						>
							Put first things first.
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}