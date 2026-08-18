import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene28() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Rocket entrance with spring overshoot.
	const cardEntrance = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.58,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 10,
			stiffness: 280,
			mass: 0.48,
		},
	});

	const cardRocketX = interpolate(cardEntrance, [0, 1], [-1150, 0]);
	const cardScale = interpolate(cardEntrance, [0, 1], [0.82, 1]);
	const contentVisible = interpolate(frame, [20, 27], [0, 1], clamp);

	// Beat 2: Counter roll, headline switch, and cursor click.
	const counterProgress = interpolate(frame, [30, 68], [0, 99], clamp);
	const counterValue = Math.min(99, Math.floor(counterProgress));
	const counterLabel = counterValue >= 99 ? '99+' : `${counterValue}`;
	const counterRotation = interpolate(frame, [30, 68], [720, 0], clamp);

	const clientsArriving = frame >= 48;
	const cursorVisible = frame >= 35 && frame <= 76;
	const cursorX = interpolate(frame, [35, 54], [250, 0], clamp);
	const cursorY = interpolate(frame, [35, 54], [145, 0], clamp);
	const isClicking = frame >= 55 && frame <= 61;
	const accepted = frame >= 59;

	const clickThunk = isClicking ? 9 : 0;
	const buttonPress = isClicking ? 5 : 0;

	// Beat 3: Continuous living physics and hard hover steps.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hardHoverY =
		frame >= 84 ? Math.round(hoverY / 3) * 3 : hoverY;
	const hoverTilt = Math.sin(frame * 0.08) * 1.4;
	const counterBump =
		frame >= 84
			? 1 + Math.max(0, Math.sin(frame * 0.46)) * 0.09
			: 1;

	const shadowPulse = isClicking
		? 6
		: 15 + Math.sin(frame * 0.18) * 3;

	const acceptFlash =
		frame >= 84 && Math.floor((frame - 84) / 7) % 2 === 0;

	const shineOffset = interpolate(
		(frame + 16) % 62,
		[0, 62],
		[-180, 920],
		clamp,
	);

	// Fast snap exit.
	const exitX = interpolate(
		frame,
		[durationInFrames - 8, durationInFrames],
		[0, 1250],
		clamp,
	);
	const exitTilt = interpolate(
		frame,
		[durationInFrames - 8, durationInFrames],
		[0, 7],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 3, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const trailStrength = interpolate(frame, [0, 26], [42, 15], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Arial, sans-serif',
				color: '#000000',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					boxSizing: 'border-box',
					padding: '80px 20px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						flex: '0 0 15%',
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
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: '7px 7px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: '50%',
								backgroundColor: '#F1F333',
								border: '3px solid #000000',
							}}
						/>
						<div
							style={{
								fontSize: 19,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								whiteSpace: 'nowrap',
							}}
						>
							ACTIVATION CODE
						</div>
					</div>
				</div>

				{/* Tier 2: Single hero inbox card */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						perspective: 1200,
					}}
				>
					<div
						style={{
							width: '86%',
							maxWidth: 790,
							position: 'relative',
							transform: `
								translateX(${cardRocketX + exitX}px)
								translateY(${hardHoverY + clickThunk}px)
								rotate(${hoverTilt + exitTilt}deg)
								scale(${cardScale})
							`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 350,
								boxSizing: 'border-box',
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								padding: '38px 34px',
								backgroundColor: '#23A094',
								border: '6px solid #000000',
								borderRadius: 22,
								boxShadow: `
									${trailStrength}px ${trailStrength}px 0 #FF90E8,
									${shadowPulse + 8}px ${shadowPulse + 8}px 0 #000000
								`,
							}}
						>
							{/* Continuous traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -80,
									bottom: -80,
									left: 0,
									width: 105,
									backgroundColor: '#FFF8E7',
									opacity: 0.3,
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									opacity: contentVisible,
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										fontSize: 25,
										fontWeight: 950,
										letterSpacing: 3,
										lineHeight: 1.1,
										textAlign: 'center',
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 5,
										textUnderlineOffset: 8,
									}}
								>
									{clientsArriving
										? 'CLIENTS ARRIVING'
										: 'CLIENT INBOX'}
								</div>

								<div
									style={{
										minWidth: 230,
										padding: '13px 25px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: '#FFF8E7',
										border: '5px solid #000000',
										borderRadius: 16,
										boxShadow: '8px 8px 0 #000000',
										fontSize: 92,
										fontWeight: 950,
										letterSpacing: -5,
										lineHeight: 0.95,
										fontVariantNumeric: 'tabular-nums',
										transform: `rotateX(${counterRotation}deg) scale(${counterBump})`,
										transformOrigin: 'center',
									}}
								>
									{counterLabel}
								</div>

								<div
									style={{
										position: 'relative',
										marginTop: 6,
									}}
								>
									<div
										style={{
											padding: '13px 34px',
											backgroundColor: acceptFlash
												? '#F1F333'
												: accepted
													? '#FF90E8'
													: '#FFF8E7',
											border: '5px solid #000000',
											borderRadius: 12,
											boxShadow: isClicking
												? '3px 3px 0 #000000'
												: '8px 8px 0 #000000',
											fontSize: 24,
											fontWeight: 950,
											letterSpacing: 3,
											lineHeight: 1,
											textAlign: 'center',
											textDecoration: 'underline',
											textDecorationThickness: 4,
											textUnderlineOffset: 5,
											transform: `translate(${buttonPress}px, ${buttonPress}px)`,
										}}
									>
										{accepted ? 'ACCEPTED' : 'ACCEPT'}
									</div>

									{cursorVisible ? (
										<div
											style={{
												position: 'absolute',
												right: -30,
												bottom: -30,
												zIndex: 10,
												filter: isClicking
													? 'drop-shadow(2px 2px 0 #FF90E8)'
													: 'drop-shadow(6px 6px 0 #FF90E8)',
												transform: `translate(${cursorX}px, ${cursorY}px) scale(${
													isClicking ? 0.82 : 1
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
												<path d="M4 3.5L20.5 11l-7.1 2.35L11 20.5 4 3.5z" />
											</svg>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Punchline */}
				<div
					style={{
						flex: '0 0 20%',
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
							padding: '14px 30px',
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 14,
							boxShadow: `${
								6 + Math.sin(frame * 0.18) * 2
							}px ${6 + Math.sin(frame * 0.18) * 2}px 0 #F1F333`,
							fontSize: 23,
							fontWeight: 950,
							letterSpacing: 2,
							lineHeight: 1.15,
							textAlign: 'center',
							textDecoration: 'underline',
							textDecorationThickness: 4,
							textUnderlineOffset: 6,
							transform: `scale(${cardEntrance}) translateY(${
								Math.sin(frame * 0.12 + 2) * 3
							}px)`,
						}}
					>
						PASSIVE IN → CLIENTS OUT
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}