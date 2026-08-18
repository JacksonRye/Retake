import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene46() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — oversize spring entrance with hard positional snaps.
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 240,
			mass: 0.62,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 11,
			stiffness: 260,
			mass: 0.5,
		},
	});

	const entranceScale = interpolate(entrance, [0, 1], [1.72, 1], clamp);
	const hardSnapX = frame < 7 ? 150 : frame < 14 ? -28 : 0;
	const hardSnapY = frame < 7 ? -45 : frame < 14 ? 18 : 0;

	// Beat 2 — cursor drags the lens, clicks, changes state, and surges reach.
	const dragProgress = interpolate(frame, [30, 64], [0, 1], clamp);
	const lensDragX = interpolate(dragProgress, [0, 1], [-150, 0], clamp);
	const cursorVisible = frame >= 26 && frame <= 78;
	const cursorApproach = interpolate(frame, [26, 34], [90, 0], clamp);
	const stateChanged = frame >= 54;
	const isClicking = frame >= 52 && frame <= 57;
	const cardThunk = isClicking ? 9 : 0;

	const reachRaw = Math.round(
		interpolate(frame, [54, 80], [0, 2400000], clamp),
	);
	const reachFormatted = reachRaw.toLocaleString('en-US');

	// Beat 3 — continuously living hover, click loop, count pulse, and shadow.
	const beat3 = frame >= 84;
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35;

	const clickPhase = beat3 ? (frame - 84) % 14 : 13;
	const focusClickScale = beat3
		? interpolate(clickPhase, [0, 2, 5, 14], [1, 0.9, 1.04, 1], clamp)
		: 1;

	const countPulse = beat3
		? 1 + Math.sin((frame - 84) * 0.34) * 0.035
		: 1;

	const alternatingShadow =
		beat3 && Math.floor((frame - 84) / 7) % 2 === 0 ? 9 : 15;
	const shadowDepth =
		(beat3 ? alternatingShadow : isClicking ? 5 : 12) +
		Math.sin(frame * 0.18) * 2;

	const shineOffset = interpolate(
		(frame + 14) % 58,
		[0, 58],
		[-260, 980],
		clamp,
	);

	const exitX = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -90],
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

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				overflow: 'hidden',
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
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
					transform: `translateX(${exitX}px) rotate(${exitTilt}deg)`,
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
							borderRadius: 14,
							boxShadow: '6px 6px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.1) * 3
							}px)`,
						}}
					>
						<span
							style={{
								width: 12,
								height: 12,
								flex: '0 0 auto',
								borderRadius: '50%',
								backgroundColor: '#000000',
							}}
						/>
						<span
							style={{
								color: '#000000',
								fontSize: 19,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Activation Code
						</span>
					</div>
				</div>

				{/* Tier 2 — one hero focus lens card */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						minHeight: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '86%',
							maxWidth: 780,
							height: 430,
							maxHeight: '92%',
							position: 'relative',
							transform: `
								translate(${hardSnapX}px, ${hardSnapY + hoverY + cardThunk}px)
								rotate(${hoverTilt}deg)
								scale(${entranceScale})
							`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								width: '100%',
								height: '100%',
								position: 'relative',
								overflow: 'hidden',
								boxSizing: 'border-box',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: stateChanged ? '#23A094' : '#F1F333',
								border: '6px solid #000000',
								borderRadius: 28,
								boxShadow: `${shadowDepth}px ${shadowDepth}px 0 #000000`,
							}}
						>
							{/* Continuous traveling brutal-pop shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									left: 0,
									width: 105,
									backgroundColor: 'rgba(255,255,255,0.42)',
									transform: `translateX(${shineOffset}px) skewX(-23deg)`,
									pointerEvents: 'none',
									zIndex: 1,
								}}
							/>

							{/* The single draggable focus lens */}
							<div
								style={{
									width: 300,
									height: 300,
									borderRadius: '50%',
									position: 'relative',
									zIndex: 2,
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									padding: 24,
									backgroundColor: stateChanged ? '#F1F333' : '#FFF8E7',
									border: '8px solid #000000',
									boxShadow: beat3
										? `${Math.max(3, shadowDepth - 5)}px ${Math.max(
												3,
												shadowDepth - 5,
											)}px 0 #FF90E8`
										: '8px 8px 0 #FF90E8',
									transform: `translateX(${lensDragX}px) scale(${focusClickScale})`,
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: 22,
										padding: '6px 14px',
										border: '3px solid #000000',
										borderRadius: 999,
										backgroundColor: '#FF90E8',
										color: '#000000',
										fontSize: 14,
										fontWeight: 950,
										letterSpacing: 2,
										lineHeight: 1,
										textTransform: 'uppercase',
										boxShadow: '3px 3px 0 #000000',
									}}
								>
									Focus
								</div>

								{!stateChanged ? (
									<div
										style={{
											color: '#000000',
											fontSize: 43,
											fontWeight: 950,
											lineHeight: 1,
											letterSpacing: -1,
											textAlign: 'center',
											textDecoration: 'underline',
											textDecorationThickness: 5,
											filter: `blur(${5.5 - dragProgress * 1.5}px)`,
											opacity: 0.68,
											transform: `rotate(${
												Math.sin(frame * 0.14) * 1.2
											}deg)`,
										}}
									>
										CRITICISM
									</div>
								) : (
									<>
										<div
											style={{
												color: '#000000',
												fontSize: 25,
												fontWeight: 950,
												lineHeight: 1,
												letterSpacing: 1.5,
												textAlign: 'center',
												textTransform: 'uppercase',
											}}
										>
											People Reached
										</div>
										<div
											style={{
												color: '#000000',
												fontSize: 55,
												fontWeight: 950,
												lineHeight: 0.95,
												letterSpacing: -3,
												textAlign: 'center',
												transform: `scale(${countPulse})`,
												transformOrigin: 'center',
											}}
										>
											{reachFormatted}
										</div>
									</>
								)}
							</div>

							{/* Cursor is attached to the hero interaction */}
							{cursorVisible && (
								<div
									style={{
										position: 'absolute',
										zIndex: 5,
										left: '50%',
										top: '50%',
										transform: `
											translate(
												${lensDragX + 108 + cursorApproach}px,
												${92 + cursorApproach * 0.35}px
											)
											scale(${isClicking ? 0.82 : 1})
										`,
										filter: isClicking
											? 'drop-shadow(2px 2px 0 #FF90E8)'
											: 'drop-shadow(6px 6px 0 #FF90E8)',
										pointerEvents: 'none',
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
										<path d="M4 3.5L20.4 11l-7.1 2.2-2.4 7.3L4 3.5z" />
									</svg>
								</div>
							)}
						</div>
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
							border: '4px solid #000000',
							borderRadius: 16,
							boxShadow: `${
								6 + Math.sin(frame * 0.18) * 2
							}px ${6 + Math.sin(frame * 0.18) * 2}px 0 #FF90E8`,
							transform: `scale(${entrance}) translateY(${
								Math.sin(frame * 0.12 + 1.2) * 3
							}px)`,
						}}
					>
						<span
							style={{
								color: '#FFF8E7',
								fontSize: 23,
								fontWeight: 950,
								letterSpacing: 1.8,
								lineHeight: 1.1,
								textAlign: 'center',
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationColor: '#F1F333',
								textDecorationThickness: 5,
								textUnderlineOffset: 7,
							}}
						>
							Focus on impact →
						</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}