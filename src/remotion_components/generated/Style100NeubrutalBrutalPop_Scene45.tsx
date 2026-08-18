import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene45() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — aggressive sticker-slap entrance.
	const cardEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.55,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.5,
		},
	});

	const footerEntrance = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 12,
			stiffness: 230,
			mass: 0.55,
		},
	});

	const entranceRotation = interpolate(
		frame,
		[0, 9, 18, 30],
		[-12, 5, -2, 0],
		clamp,
	);

	// Beat 2 — rigid vertical hinge reveal.
	let hingeRotation = interpolate(frame, [31, 49], [0, 180], clamp);

	// Beat 3 — hard toggles between both message states.
	if (frame >= 84) {
		if (frame < 96) {
			hingeRotation = 180;
		} else if (frame < 104) {
			hingeRotation = interpolate(frame, [96, 104], [180, 360], clamp);
		} else if (frame < 114) {
			hingeRotation = 360;
		} else if (frame < 122) {
			hingeRotation = interpolate(frame, [114, 122], [360, 540], clamp);
		} else {
			hingeRotation = 540;
		}
	}

	// Cursor approaches and physically clicks the card.
	const cursorVisible = frame >= 25 && frame <= 66;
	const cursorX = interpolate(frame, [25, 42], [170, 0], clamp);
	const cursorY = interpolate(frame, [25, 42], [145, 0], clamp);
	const cursorScale =
		frame >= 43 && frame <= 49
			? interpolate(frame, [43, 46, 49], [1, 0.78, 1], clamp)
			: 1;

	const clickThunk =
		frame >= 43 && frame <= 52
			? interpolate(frame, [43, 46, 52], [0, 10, 0], clamp)
			: 0;

	// Yellow stamp slap after the message reveal.
	const stampEntrance = spring({
		frame: frame - 55,
		fps,
		config: {
			damping: 8,
			stiffness: 310,
			mass: 0.42,
		},
	});

	const stampPulse =
		frame >= 84 ? 1 + Math.sin(frame * 0.22) * 0.065 : 1;

	// Continuous living physics.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.5;
	const shadowPulse = 17 + Math.sin(frame * 0.18) * 4;
	const edgeFlash =
		frame < 52 ? 0 : 0.2 + (0.5 + Math.sin(frame * 0.32) * 0.5) * 0.65;

	const shineOffset = interpolate(
		(frame + 14) % 62,
		[0, 62],
		[-180, 920],
		clamp,
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -55],
		clamp,
	);

	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const faceStyle: React.CSSProperties = {
		position: 'absolute',
		inset: 0,
		boxSizing: 'border-box',
		border: '7px solid #000000',
		borderRadius: 28,
		backfaceVisibility: 'hidden',
		WebkitBackfaceVisibility: 'hidden',
		overflow: 'hidden',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 22,
		padding: '46px 54px',
	};

	const shine = (
		<div
			style={{
				position: 'absolute',
				top: -80,
				bottom: -80,
				left: 0,
				width: 105,
				backgroundColor: '#FFF8E7',
				opacity: 0.38,
				transform: `translateX(${shineOffset}px) skewX(-22deg)`,
				pointerEvents: 'none',
			}}
		/>
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				color: '#000000',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					boxSizing: 'border-box',
					padding: '80px 60px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 — category pill */}
				<div
					style={{
						flex: '15 1 0',
						minHeight: 0,
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
							padding: '12px 25px',
							border: '4px solid #000000',
							borderRadius: 14,
							backgroundColor: '#23A094',
							boxShadow: '7px 7px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.11) * 3
							}px) rotate(${Math.sin(frame * 0.07) * 0.8}deg)`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								flexShrink: 0,
								borderRadius: '50%',
								backgroundColor: '#F1F333',
								border: '2px solid #000000',
							}}
						/>
						<div
							style={{
								fontSize: 20,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Perspective Shift
						</div>
					</div>
				</div>

				{/* Tier 2 — one reversible hero message card */}
				<div
					style={{
						flex: '65 1 0',
						minHeight: 0,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 16,
						perspective: 1400,
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'relative',
							width: '82%',
							maxWidth: 820,
							aspectRatio: '1.72 / 1',
							maxHeight: '88%',
							transformStyle: 'preserve-3d',
							transform: `
								translateY(${hoverY + clickThunk}px)
								rotateZ(${entranceRotation + hoverTilt}deg)
								scale(${cardEntrance})
								rotateY(${hingeRotation}deg)
							`,
							transformOrigin: 'center center',
							backgroundColor: '#FF90E8',
							borderRadius: 28,
							boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
						}}
					>
						{/* Front state */}
						<div
							style={{
								...faceStyle,
								backgroundColor: '#FF90E8',
								transform: 'rotateY(0deg) translateZ(1px)',
							}}
						>
							{shine}
							<div
								style={{
									position: 'relative',
									zIndex: 2,
									maxWidth: 690,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 16,
									fontSize: 66,
									fontWeight: 950,
									lineHeight: 1.04,
									letterSpacing: -2,
									textAlign: 'center',
									textTransform: 'uppercase',
									textDecoration: 'underline',
									textDecorationThickness: 7,
									textUnderlineOffset: 11,
								}}
							>
								I DIDN&apos;T
								<br />
								LIKE IT.
							</div>
						</div>

						{/* Revealed back state */}
						<div
							style={{
								...faceStyle,
								backgroundColor: '#FF90E8',
								transform: 'rotateY(180deg) translateZ(1px)',
							}}
						>
							{shine}
							<div
								style={{
									position: 'relative',
									zIndex: 2,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 24,
								}}
							>
								<div
									style={{
										maxWidth: 700,
										fontSize: 51,
										fontWeight: 950,
										lineHeight: 1.04,
										letterSpacing: -1.5,
										textAlign: 'center',
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 6,
										textUnderlineOffset: 9,
									}}
								>
									YOU WERE RIGHT—
									<br />I WAS IN A BAD SPOT
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 10,
										padding: '11px 25px',
										border: '5px solid #000000',
										borderRadius: 8,
										backgroundColor: '#F1F333',
										boxShadow: '7px 7px 0 #000000',
										fontSize: 25,
										fontWeight: 950,
										lineHeight: 1,
										letterSpacing: 3,
										textTransform: 'uppercase',
										transform: `scale(${
											stampEntrance * stampPulse
										}) rotate(-7deg)`,
									}}
								>
									TRUTH HIT
								</div>
							</div>
						</div>

						{/* Continuing teal edge flashes */}
						<div
							style={{
								position: 'absolute',
								inset: 8,
								zIndex: 8,
								border: '6px solid #23A094',
								borderRadius: 21,
								opacity: edgeFlash,
								transform: 'translateZ(4px)',
								pointerEvents: 'none',
							}}
						/>
					</div>

					{/* Cursor interaction remains subordinate to the single card */}
					{cursorVisible && (
						<div
							style={{
								position: 'absolute',
								left: '66%',
								top: '61%',
								zIndex: 20,
								transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
								filter: 'drop-shadow(5px 6px 0 #23A094)',
								pointerEvents: 'none',
							}}
						>
							<svg
								width="58"
								height="66"
								viewBox="0 0 58 66"
								fill="none"
							>
								<path
									d="M7 4L49 39L31 42L40 59L29 64L20 46L7 58V4Z"
									fill="#000000"
									stroke="#FFF8E7"
									strokeWidth="4"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					)}
				</div>

				{/* Tier 3 — punchline button */}
				<div
					style={{
						flex: '20 1 0',
						minHeight: 0,
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
							gap: 16,
							padding: '15px 30px',
							border: '4px solid #000000',
							borderRadius: 14,
							backgroundColor: '#000000',
							boxShadow: `${
								6 + Math.sin(frame * 0.17) * 2
							}px ${6 + Math.sin(frame * 0.17) * 2}px 0 #F1F333`,
							transform: `scale(${footerEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						<div
							style={{
								color: '#FFF8E7',
								fontSize: 23,
								fontWeight: 950,
								lineHeight: 1.1,
								letterSpacing: 2,
								textAlign: 'center',
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationColor: '#FF90E8',
								textDecorationThickness: 4,
								textUnderlineOffset: 6,
							}}
						>
							HONESTY CHANGES THE MESSAGE
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}