import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene11() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — rigid sticker landing with overshoot.
	const cardEntrance = spring({
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
			stiffness: 280,
			mass: 0.5,
		},
	});

	const footerEntrance = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 12,
			stiffness: 250,
			mass: 0.55,
		},
	});

	const landingRotation =
		interpolate(frame, [0, 8, 18, 30], [-8, 3, -1, 0], clamp) *
		(1 - Math.min(cardEntrance, 1));

	const landingDrop = interpolate(frame, [0, 7, 14, 24], [-180, 16, -7, 0], clamp);
	const landingShadow =
		frame < 8 ? 22 : frame < 14 ? 5 : frame < 22 ? 17 : 12;

	// Beat 2 — block cursor types the title, then clicks SAVE.
	const fullTitle = 'JOURNEY WITH GOD';
	const typedCharacters = Math.floor(
		interpolate(frame, [30, 64], [0, fullTitle.length], clamp),
	);
	const typedTitle = fullTitle.slice(0, typedCharacters);
	const typingCursorVisible = frame >= 28 && frame < 69 && frame % 10 < 6;

	const pointerVisible = frame >= 58 && frame <= 83;
	const pointerX = interpolate(frame, [58, 70], [140, 0], clamp);
	const pointerY = interpolate(frame, [58, 70], [90, 0], clamp);
	const isClicking = frame >= 70 && frame <= 76;
	const clickThunk = isClicking ? 8 : 0;
	const buttonShadow = isClicking ? 2 : 8;

	// Beat 3 — saved state alternates while the card remains alive.
	const beatThree = frame >= 84;
	const stateIndex = Math.floor(Math.max(0, frame - 84) / 12) % 2;
	const saveState = beatThree
		? stateIndex === 0
			? 'SAVED'
			: 'RECORDING'
		: frame >= 77
			? 'SAVED'
			: 'SAVE';

	const stateColor =
		saveState === 'RECORDING'
			? '#23A094'
			: saveState === 'SAVED'
				? '#F1F333'
				: '#FF90E8';

	// Required continuous living physics.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hardStepY = beatThree ? Math.round(hoverY / 3) * 3 : hoverY;
	const tiltWave = Math.sin(frame * 0.08) * 1.35;
	const hardTilt = beatThree ? Math.round(tiltWave * 2) / 2 : tiltWave;
	const shadowPulse =
		landingShadow + (beatThree ? Math.sin(frame * 0.18) * 4 : 0);

	const shineOffset = interpolate(
		(frame + 18) % 66,
		[0, 66],
		[-240, 760],
		clamp,
	);

	const statePulse =
		saveState === 'RECORDING' ? 1 + Math.sin(frame * 0.3) * 0.035 : 1;

	// Fast snap-out.
	const exitProgress = interpolate(
		frame,
		[durationInFrames - 9, durationInFrames],
		[0, 1],
		clamp,
	);
	const exitY = interpolate(exitProgress, [0, 1], [0, -110], clamp);
	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.82], clamp);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 5, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				color: '#000000',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Arial, sans-serif',
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
					transform: `translateY(${exitY}px) scale(${exitScale})`,
				}}
			>
				{/* Tier 1 — category pill */}
				<div
					style={{
						width: '100%',
						flex: '0 0 15%',
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							padding: '11px 24px',
							backgroundColor: '#F1F333',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: '7px 7px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.12 + 0.5) * 2
							}px)`,
						}}
					>
						<span
							style={{
								width: 12,
								height: 12,
								flexShrink: 0,
								backgroundColor: '#23A094',
								border: '2px solid #000000',
							}}
						/>
						<span
							style={{
								fontSize: 20,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationThickness: 3,
								textUnderlineOffset: 5,
								whiteSpace: 'nowrap',
							}}
						>
							Live Journey Log
						</span>
					</div>
				</div>

				{/* Tier 2 — exactly one hero card */}
				<div
					style={{
						width: '100%',
						flex: '1 1 65%',
						minHeight: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							width: '82%',
							maxWidth: 820,
							position: 'relative',
							transform: `translateY(${
								landingDrop + hardStepY
							}px) rotate(${landingRotation + hardTilt}deg) scale(${cardEntrance})`,
							transformOrigin: '50% 55%',
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 320,
								padding: '34px 42px 38px',
								boxSizing: 'border-box',
								backgroundColor: '#FFF8E7',
								border: '7px solid #000000',
								borderRadius: 20,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'stretch',
								justifyContent: 'space-between',
								gap: 28,
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							{/* Continuous traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -30,
									bottom: -30,
									left: 0,
									width: 88,
									backgroundColor: 'rgba(255, 144, 232, 0.27)',
									transform: `translateX(${shineOffset}px) skewX(-18deg)`,
									pointerEvents: 'none',
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
										fontSize: 18,
										fontWeight: 950,
										letterSpacing: 3,
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 3,
										textUnderlineOffset: 5,
									}}
								>
									Journey Log
								</div>

								<div
									style={{
										padding: '7px 12px',
										backgroundColor: '#23A094',
										color: '#FFF8E7',
										border: '3px solid #000000',
										boxShadow: '4px 4px 0 #000000',
										fontSize: 14,
										fontWeight: 950,
										letterSpacing: 2,
									}}
								>
									ACTIVE
								</div>
							</div>

							<div
								style={{
									minHeight: 100,
									display: 'flex',
									alignItems: 'center',
									gap: 8,
									position: 'relative',
									zIndex: 2,
									borderBottom: '6px solid #000000',
									paddingBottom: 18,
									boxSizing: 'border-box',
								}}
							>
								<span
									style={{
										fontSize: 58,
										fontWeight: 950,
										letterSpacing: -2,
										lineHeight: 1.05,
										whiteSpace: 'nowrap',
									}}
								>
									{typedTitle}
								</span>

								{typingCursorVisible && (
									<span
										style={{
											width: 18,
											height: 56,
											flexShrink: 0,
											backgroundColor: '#000000',
										}}
									/>
								)}
							</div>

							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										minWidth: 210,
										padding: '14px 26px',
										boxSizing: 'border-box',
										backgroundColor: stateColor,
										color:
											saveState === 'RECORDING'
												? '#FFF8E7'
												: '#000000',
										border: '5px solid #000000',
										borderRadius: 10,
										boxShadow: `${buttonShadow}px ${buttonShadow}px 0 #000000`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 12,
										fontSize: 24,
										fontWeight: 950,
										letterSpacing: 3,
										textDecoration: 'underline',
										textDecorationThickness: 3,
										textUnderlineOffset: 5,
										transform: `translate(${clickThunk}px, ${clickThunk}px) scale(${statePulse})`,
									}}
								>
									{saveState === 'RECORDING' && (
										<span
											style={{
												width: 12,
												height: 12,
												backgroundColor: '#FF90E8',
												border: '2px solid #000000',
												opacity: frame % 12 < 7 ? 1 : 0.3,
											}}
										/>
									)}
									{saveState}
								</div>
							</div>
						</div>

						{/* Heavy mouse click */}
						{pointerVisible && (
							<div
								style={{
									position: 'absolute',
									right: 54,
									bottom: 22,
									zIndex: 20,
									filter: isClicking
										? 'drop-shadow(2px 2px 0 #FF90E8)'
										: 'drop-shadow(6px 6px 0 #FF90E8)',
									transform: `translate(${pointerX}px, ${pointerY}px) scale(${
										isClicking ? 0.78 : 1
									})`,
								}}
							>
								<svg
									width="58"
									height="58"
									viewBox="0 0 24 24"
									fill="#000000"
									stroke="#FFF8E7"
									strokeWidth="1.5"
									strokeLinejoin="round"
								>
									<path d="M4 3.5L20.5 11L13.4 13.4L10.7 20.5L4 3.5Z" />
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Tier 3 — punchline button */}
				<div
					style={{
						width: '100%',
						flex: '0 0 20%',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							padding: '14px 30px',
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: '7px 7px 0 #FF90E8',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							transform: `scale(${footerEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1.4) * 3
							}px)`,
							fontSize: 23,
							fontWeight: 950,
							letterSpacing: 2,
							lineHeight: 1,
							textTransform: 'uppercase',
							textDecoration: 'underline',
							textDecorationThickness: 3,
							textUnderlineOffset: 5,
							textAlign: 'center',
							whiteSpace: 'nowrap',
						}}
					>
						Keep the record open
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}