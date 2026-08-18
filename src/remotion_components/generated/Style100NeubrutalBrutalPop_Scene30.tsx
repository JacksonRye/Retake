import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene30() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — hard spring entrance
	const cardEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 250,
			mass: 0.55,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 11,
			stiffness: 270,
			mass: 0.5,
		},
	});

	const footerEntrance = spring({
		frame: frame - 7,
		fps,
		config: {
			damping: 12,
			stiffness: 240,
			mass: 0.55,
		},
	});

	// Beat 2 — accelerating reach counter and cursor conversion
	const counterProgress = interpolate(frame, [30, 64], [0, 1], clamp);
	const acceleratedProgress = Math.pow(counterProgress, 2.75);
	const reach = Math.round(acceleratedProgress * 50000);
	const conversionActive = frame >= 70;

	const cursorVisible = frame >= 46 && frame <= 84;
	const cursorX = interpolate(frame, [46, 63, 76, 84], [250, 0, 0, 130], clamp);
	const cursorY = interpolate(frame, [46, 63, 76, 84], [190, 0, 0, -80], clamp);
	const cursorOpacity = interpolate(
		frame,
		[46, 49, 78, 84],
		[0, 1, 1, 0],
		clamp,
	);
	const clicking = frame >= 65 && frame <= 72;
	const clickScale = clicking ? 0.78 : 1;
	const clickThunk = clicking ? 9 : 0;

	// Beat 3 — continuous living physics
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35;
	const shadowPulse = 11 + Math.sin(frame * 0.18) * 3;

	const beatThreeActive = frame >= 84;
	const shadowDirection = Math.floor((frame - 84) / 8) % 2 === 0 ? 1 : -1;
	const shadowX = beatThreeActive
		? shadowDirection * shadowPulse
		: clicking
			? 3
			: 11;
	const shadowY = beatThreeActive
		? shadowDirection * shadowPulse
		: clicking
			? 3
			: 11;

	// Sharp square-wave scale pulses after conversion
	const pulsePhase = ((frame - 84) % 20 + 20) % 20;
	const squarePulse =
		beatThreeActive && (pulsePhase < 3 || (pulsePhase >= 8 && pulsePhase < 11))
			? 1.025
			: 1;

	const shineOffset = interpolate(
		(frame + 16) % 58,
		[0, 58],
		[-190, 900],
		clamp,
	);

	const underlineOffset = (frame * 9) % 112;

	const conversionSlap = conversionActive
		? spring({
				frame: frame - 70,
				fps,
				config: {
					damping: 8,
					stiffness: 300,
					mass: 0.45,
				},
			})
		: 0;

	const reachStateScale = conversionActive ? 0 : 1;
	const conversionStateScale = conversionActive ? conversionSlap : 0;

	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -70],
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
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				color: '#000000',
				opacity,
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
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1 — category pill */}
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
							boxShadow: '6px 6px 0 #000000',
							transform: `translateY(${Math.sin(frame * 0.12) * 3}px) scale(${badgeEntrance})`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								flex: '0 0 auto',
								backgroundColor: '#23A094',
								border: '3px solid #000000',
							}}
						/>
						<div
							style={{
								fontSize: 20,
								fontWeight: 950,
								lineHeight: 1,
								letterSpacing: 3,
								whiteSpace: 'nowrap',
							}}
						>
							REEL RESULTS
						</div>
					</div>
				</div>

				{/* Tier 2 — one hero card */}
				<div
					style={{
						flex: '0 0 65%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '84%',
							maxWidth: 820,
							position: 'relative',
							transform: `translateY(${hoverY + clickThunk}px) rotate(${hoverTilt}deg) scale(${cardEntrance * squarePulse})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 330,
								padding: '46px 34px',
								boxSizing: 'border-box',
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								backgroundColor: '#F1F333',
								border: '7px solid #000000',
								borderRadius: 22,
								boxShadow: `${shadowX}px ${shadowY}px 0 #000000`,
							}}
						>
							{/* Continuous traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									left: 0,
									width: 110,
									backgroundColor: 'rgba(255,255,255,0.48)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									padding: '8px 18px',
									backgroundColor: '#000000',
									color: '#FFF8E7',
									borderRadius: 8,
									fontSize: 18,
									fontWeight: 950,
									lineHeight: 1,
									letterSpacing: 3,
									zIndex: 2,
								}}
							>
								REEL RESULTS
							</div>

							<div
								style={{
									width: '100%',
									minHeight: 160,
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									zIndex: 2,
								}}
							>
								{/* Reach state */}
								<div
									style={{
										position: 'absolute',
										inset: 0,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										transform: `scale(${reachStateScale})`,
									}}
								>
									<div
										style={{
											fontSize: 82,
											fontWeight: 950,
											lineHeight: 0.95,
											letterSpacing: -3,
											textAlign: 'center',
											fontVariantNumeric: 'tabular-nums',
										}}
									>
										{reach.toLocaleString('en-US')}
									</div>
									<div
										style={{
											padding: '8px 22px',
											backgroundColor: '#FF90E8',
											border: '4px solid #000000',
											boxShadow: '5px 5px 0 #000000',
											borderRadius: 8,
											fontSize: 22,
											fontWeight: 950,
											lineHeight: 1,
											letterSpacing: 4,
										}}
									>
										REACH
									</div>
								</div>

								{/* Converted state */}
								<div
									style={{
										position: 'absolute',
										inset: 0,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										transform: `scale(${conversionStateScale})`,
									}}
								>
									<div
										style={{
											fontSize: 62,
											fontWeight: 950,
											lineHeight: 0.95,
											letterSpacing: -2,
											textAlign: 'center',
										}}
									>
										1–2 SIGN-UPS
									</div>

									<div
										style={{
											fontSize: 31,
											fontWeight: 950,
											lineHeight: 1,
											letterSpacing: 5,
											textAlign: 'center',
										}}
									>
										/ WEEK
									</div>

									{/* Continuously looping brutal underline */}
									<div
										style={{
											width: 330,
											maxWidth: '78%',
											height: 10,
											border: '3px solid #000000',
											backgroundColor: '#FF90E8',
											backgroundImage:
												'repeating-linear-gradient(90deg, #000000 0px, #000000 38px, #FF90E8 38px, #FF90E8 56px)',
											backgroundPositionX: `${underlineOffset}px`,
											backgroundSize: '56px 100%',
										}}
									/>
								</div>
							</div>
						</div>

						{/* Giant cursor click */}
						{cursorVisible ? (
							<div
								style={{
									position: 'absolute',
									right: '13%',
									bottom: '10%',
									zIndex: 10,
									opacity: cursorOpacity,
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${clickScale})`,
									transformOrigin: 'top left',
									filter: clicking
										? 'drop-shadow(2px 2px 0 #FF90E8)'
										: 'drop-shadow(8px 8px 0 #FF90E8)',
									pointerEvents: 'none',
								}}
							>
								<svg
									width="92"
									height="92"
									viewBox="0 0 24 24"
									fill="#000000"
									stroke="#FFF8E7"
									strokeWidth="1.25"
									strokeLinejoin="round"
								>
									<path d="M3.5 2.5L20.8 11.2L13.7 13.6L11.2 20.8L3.5 2.5Z" />
								</svg>
							</div>
						) : null}
					</div>
				</div>

				{/* Tier 3 — punchline */}
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
							padding: '15px 30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							backgroundColor: '#23A094',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: '7px 7px 0 #000000',
							transform: `translateY(${Math.sin(frame * 0.12 + 1.4) * 3}px) scale(${footerEntrance})`,
						}}
					>
						<div
							style={{
								fontSize: 23,
								fontWeight: 950,
								lineHeight: 1,
								letterSpacing: 2,
								textAlign: 'center',
								textDecoration: 'underline',
								textDecorationThickness: 4,
								textUnderlineOffset: 6,
								whiteSpace: 'nowrap',
							}}
						>
							TURN REACH INTO CLIENTS
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}