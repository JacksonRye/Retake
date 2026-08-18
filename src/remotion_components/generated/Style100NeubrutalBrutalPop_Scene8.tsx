import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene8() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: BEFORE card slams into place.
	const heroEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.62,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.5,
		},
	});

	const heroSlideX = interpolate(frame, [0, 9], [-180, 0], clamp);
	const initialRotation = interpolate(frame, [0, 11], [-5, 0], clamp);

	// Beat 2: cursor physically drags the reveal divider.
	const dragStart = 30;
	const dragEnd = 78;
	const dragProgress = interpolate(frame, [dragStart, dragEnd], [0, 1], clamp);
	const draggedDivider = interpolate(dragProgress, [0, 1], [7, 91], clamp);

	// Beat 3: divider never settles.
	const livingDivider =
		91 + Math.sin((frame - 78) * 0.22) * 3.5 + Math.sin(frame * 0.08) * 1.2;

	const dividerPercent =
		frame < dragStart
			? 7
			: frame <= dragEnd
				? draggedDivider
				: livingDivider;

	const cursorVisible = frame >= 25 && frame <= 84;
	const cursorLeadIn = interpolate(frame, [25, 30], [24, 0], clamp);
	const cursorPress =
		frame >= 29 && frame <= 34
			? interpolate(frame, [29, 31, 34], [1, 0.82, 1], clamp)
			: 1;

	const cursorY =
		interpolate(frame, [25, 36], [90, 12], clamp) +
		Math.sin(frame * 0.28) * 2;

	// SUCCESS sticker slap and gentle continuous punching.
	const stampEntrance = spring({
		frame: frame - 69,
		fps,
		config: {
			damping: 8,
			stiffness: 330,
			mass: 0.45,
		},
	});

	const stampPunch =
		frame >= 80
			? 1 + Math.max(0, Math.sin((frame - 80) * 0.24)) * 0.055
			: 1;

	const stampRotation =
		-6 + (frame >= 80 ? Math.sin((frame - 80) * 0.16) * 1.2 : 0);

	// Beat 3: continuous living physics.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.25;
	const shadowPulse = 15 + Math.sin(frame * 0.18) * 3;

	const shineOffset = interpolate((frame + 16) % 62, [0, 62], [-180, 1040], clamp);

	// Teal border flashes in the final beat.
	const flashPhase = Math.floor(Math.max(0, frame - 84) / 5) % 2;
	const borderColor =
		frame < 84
			? '#FF90E8'
			: frame >= 112
				? '#23A094'
				: flashPhase === 0
					? '#23A094'
					: '#FF90E8';

	const borderGlow =
		frame >= 84 && flashPhase === 0
			? `0 0 0 8px #23A094, ${shadowPulse}px ${shadowPulse}px 0 #000000`
			: `${shadowPulse}px ${shadowPulse}px 0 #000000`;

	const exitY = interpolate(
		frame,
		[durationInFrames - 9, durationInFrames],
		[0, -70],
		clamp,
	);

	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 7, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const afterMetric = Math.round(
		interpolate(frame, [38, 76], [24, 148], clamp),
	);

	const dividerThunk =
		frame >= 75 && frame <= 80
			? interpolate(frame, [75, 77, 80], [0, 7, 0], clamp)
			: 0;

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
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: category badge */}
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
							padding: '11px 25px',
							border: '4px solid #000000',
							borderRadius: 14,
							backgroundColor: '#FF90E8',
							boxShadow: '7px 7px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.11) * 3
							}px) rotate(${Math.sin(frame * 0.07) * 0.7}deg)`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								flexShrink: 0,
								borderRadius: '50%',
								backgroundColor: '#000000',
							}}
						/>
						<div
							style={{
								fontSize: 20,
								fontWeight: 950,
								lineHeight: 1,
								letterSpacing: 3,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Activation Code
						</div>
					</div>
				</div>

				{/* Tier 2: one oversized transformation card */}
				<div
					style={{
						height: '65%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '20px 0',
						boxSizing: 'border-box',
					}}
				>
					<div
						style={{
							position: 'relative',
							width: '88%',
							maxWidth: 850,
							height: '76%',
							minHeight: 360,
							maxHeight: 510,
							transform: `translateX(${heroSlideX}px) translateY(${
								hoverY + dividerThunk
							}px) rotate(${initialRotation + hoverTilt}deg) scale(${heroEntrance})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								overflow: 'hidden',
								border: `7px solid ${borderColor}`,
								borderRadius: 28,
								backgroundColor: '#FFF8E7',
								boxShadow: borderGlow,
							}}
						>
							{/* BEFORE face */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									padding: '34px',
									boxSizing: 'border-box',
									backgroundColor: '#FFF8E7',
								}}
							>
								<div
									style={{
										padding: '8px 19px',
										border: '4px solid #000000',
										borderRadius: 10,
										backgroundColor: '#FF90E8',
										boxShadow: '5px 5px 0 #000000',
										fontSize: 22,
										fontWeight: 950,
										letterSpacing: 4,
										lineHeight: 1,
									}}
								>
									BEFORE
								</div>

								<div
									style={{
										fontSize: 92,
										fontWeight: 950,
										lineHeight: 0.95,
										letterSpacing: -4,
										textAlign: 'center',
									}}
								>
									24
								</div>

								<div
									style={{
										fontSize: 22,
										fontWeight: 900,
										letterSpacing: 2,
										textDecoration: 'underline',
										textDecorationThickness: 4,
										textUnderlineOffset: 7,
										textAlign: 'center',
									}}
								>
									QUALIFIED LEADS
								</div>
							</div>

							{/* AFTER face revealed by the draggable divider */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									width: `${dividerPercent}%`,
									overflow: 'hidden',
									backgroundColor: '#23A094',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										width: '100%',
										minWidth: '850px',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										padding: '34px',
										boxSizing: 'border-box',
									}}
								>
									<div
										style={{
											padding: '8px 19px',
											border: '4px solid #000000',
											borderRadius: 10,
											backgroundColor: '#F1F333',
											boxShadow: '5px 5px 0 #000000',
											fontSize: 22,
											fontWeight: 950,
											letterSpacing: 4,
											lineHeight: 1,
										}}
									>
										AFTER
									</div>

									<div
										style={{
											fontSize: 92,
											fontWeight: 950,
											lineHeight: 0.95,
											letterSpacing: -4,
											textAlign: 'center',
										}}
									>
										{afterMetric}
									</div>

									<div
										style={{
											fontSize: 22,
											fontWeight: 900,
											letterSpacing: 2,
											textDecoration: 'underline',
											textDecorationThickness: 4,
											textUnderlineOffset: 7,
											textAlign: 'center',
										}}
									>
										QUALIFIED LEADS
									</div>
								</div>
							</div>

							{/* Traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -80,
									bottom: -80,
									left: 0,
									width: 100,
									backgroundColor: 'rgba(255,255,255,0.38)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
									zIndex: 4,
								}}
							/>

							{/* Thick reveal divider */}
							<div
								style={{
									position: 'absolute',
									zIndex: 8,
									top: 0,
									bottom: 0,
									left: `${dividerPercent}%`,
									width: 13,
									backgroundColor: '#000000',
									transform: 'translateX(-50%)',
									boxShadow: '5px 0 0 rgba(0,0,0,0.22)',
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: '50%',
										left: '50%',
										width: 42,
										height: 74,
										border: '5px solid #000000',
										borderRadius: 12,
										backgroundColor: '#F1F333',
										boxShadow: '5px 5px 0 #000000',
										transform: `translate(-50%, -50%) scale(${
											1 + Math.sin(frame * 0.16) * 0.025
										})`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 5,
									}}
								>
									<div
										style={{
											width: 4,
											height: 31,
											borderRadius: 4,
											backgroundColor: '#000000',
										}}
									/>
									<div
										style={{
											width: 4,
											height: 31,
											borderRadius: 4,
											backgroundColor: '#000000',
										}}
									/>
								</div>
							</div>
						</div>

						{/* SUCCESS stamp */}
						<div
							style={{
								position: 'absolute',
								zIndex: 15,
								right: 24,
								bottom: 20,
								padding: '12px 24px',
								border: '5px solid #000000',
								borderRadius: 12,
								backgroundColor: '#F1F333',
								boxShadow: '7px 7px 0 #000000',
								fontSize: 25,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								transform: `rotate(${stampRotation}deg) scale(${
									stampEntrance * stampPunch
								})`,
								transformOrigin: 'center',
							}}
						>
							SUCCESS
						</div>

						{/* Dragging cursor */}
						{cursorVisible ? (
							<div
								style={{
									position: 'absolute',
									zIndex: 30,
									left: `${dividerPercent}%`,
									top: '56%',
									transform: `translate(${cursorLeadIn}px, ${cursorY}px) scale(${cursorPress})`,
									filter: 'drop-shadow(5px 7px 0 rgba(0,0,0,0.35))',
									pointerEvents: 'none',
								}}
							>
								<svg
									width="58"
									height="66"
									viewBox="0 0 48 56"
									fill="none"
								>
									<path
										d="M6 3L40 35L25 37L18 52L6 3Z"
										fill="#FF90E8"
										stroke="#000000"
										strokeWidth="5"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						) : null}
					</div>
				</div>

				{/* Tier 3: punchline */}
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
							border: '4px solid #000000',
							borderRadius: 15,
							backgroundColor: '#000000',
							boxShadow: `7px ${7 + Math.sin(frame * 0.17) * 2}px 0 #FF90E8`,
							transform: `scale(${heroEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						<div
							style={{
								color: '#FFF8E7',
								fontSize: 23,
								fontWeight: 950,
								letterSpacing: 2,
								lineHeight: 1,
								textAlign: 'center',
								textDecoration: 'underline',
								textDecorationColor: '#F1F333',
								textDecorationThickness: 4,
								textUnderlineOffset: 7,
							}}
						>
							DRAG TO SEE THE PROOF →
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}