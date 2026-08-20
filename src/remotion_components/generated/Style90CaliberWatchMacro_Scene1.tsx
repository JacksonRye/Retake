import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style90CaliberWatchMacro_Scene1() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames, width, height} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy macro drop / entrance
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 13,
			stiffness: 230,
			mass: 0.72,
		},
	});

	const plateDropY = interpolate(entrance, [0, 1], [-180, 0], clamp);
	const plateScale = interpolate(entrance, [0, 1], [0.9, 1], clamp);
	const plateOpacity = interpolate(entrance, [0, 0.2, 1], [0, 1, 1], clamp);
	const plateBlur = interpolate(entrance, [0, 1], [18, 0], clamp);

	const headerPop = spring({
		frame: frame - 4,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	// ------------------------------------------
	// Beat 2: Jewel seating + serial tick
	// ------------------------------------------
	const jewelSeat = spring({
		frame: frame - 28,
		fps,
		config: {
			damping: 11,
			stiffness: 260,
			mass: 0.52,
		},
	});

	const jewelY = interpolate(jewelSeat, [0, 1], [-54, 0], clamp);
	const jewelScale = interpolate(jewelSeat, [0, 0.78, 1], [0.82, 1.08, 1], clamp);
	const jewelShadow = interpolate(jewelSeat, [0, 1], [22, 8], clamp);
	const jewelRingScale = interpolate(jewelSeat, [0, 0.6, 1], [0.85, 1.06, 1], clamp);

	const serialRaw = Math.round(interpolate(frame, [30, 65], [0, 1], clamp));
	const serialText = String(serialRaw).padStart(3, '0');

	const lensProgress = spring({
		frame: frame - 34,
		fps,
		config: {
			damping: 14,
			stiffness: 180,
			mass: 0.8,
		},
	});

	const lensX = interpolate(lensProgress, [0, 1], [260, 0], clamp);
	const lensScale = interpolate(lensProgress, [0, 1], [0.92, 1], clamp);

	const snapFlash = interpolate(frame, [42, 45, 50], [0, 0.75, 0], clamp);
	const serialGlow = interpolate(frame, [36, 54, 72], [0.2, 1, 0.35], clamp);

	// ------------------------------------------
	// Beat 3: Living physics + sweep + exit
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.18) * 1.4; // under 2.5deg
	const balanceWheelRotate = Math.sin(frame * 0.84) * 18; // ~4Hz visual oscillation at 30fps
	const microVibeX = Math.sin(frame * 1.4) * 1.6;
	const microVibeY = Math.cos(frame * 1.28) * 1.2;
	const gearRotateA = frame * 2.4;
	const gearRotateB = -frame * 3.2;
	const gearRotateC = frame * 1.7;
	const jewelPulse = interpolate(Math.sin(frame * 0.2), [-1, 1], [0.96, 1.04]);
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [20, 30]);

	const sweepProgress = interpolate(
		frame,
		[78, 108],
		[-width * 0.65, width * 0.75],
		clamp
	);

	const exit = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {
			damping: 12,
			stiffness: 250,
			mass: 0.7,
		},
	});

	const exitScale = interpolate(exit, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exit, [0, 1], [1, 0], clamp);
	const exitY = interpolate(exit, [0, 1], [0, -24], clamp);

	const containerOpacity = plateOpacity * exitOpacity;
	const containerScale = plateScale * exitScale;

	const engravedStyle: React.CSSProperties = {
		fontFamily: '"SF Mono", "Roboto Mono", "Menlo", monospace',
		letterSpacing: '0.18em',
		textTransform: 'uppercase',
		color: '#BFC5CE',
		textShadow: '0 1px 0 rgba(0,0,0,0.45)',
	};

	const thinSansStyle: React.CSSProperties = {
		fontFamily:
			'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
		fontWeight: 300,
		letterSpacing: '0.12em',
		textTransform: 'uppercase',
	};

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#14151A',
				overflow: 'hidden',
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
			}}
		>
			{/* Background vignette */}
			<AbsoluteFill
				style={{
					background:
						'radial-gradient(circle at 50% 42%, rgba(191,197,206,0.10) 0%, rgba(20,21,26,0.0) 30%, rgba(20,21,26,0.85) 74%, rgba(8,8,10,1) 100%)',
				}}
			/>

			{/* Subtle macro steel bloom */}
			<AbsoluteFill
				style={{
					background:
						'linear-gradient(135deg, rgba(191,197,206,0.04) 0%, rgba(183,110,121,0.03) 24%, rgba(20,21,26,0) 50%, rgba(184,242,201,0.03) 78%, rgba(191,197,206,0.05) 100%)',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '90px 44px',
				}}
			>
				<div
					style={{
						width: '92%',
						minHeight: 560,
						opacity: containerOpacity,
						transform: `translateY(${plateDropY + hoverY + exitY}px) translateX(${microVibeX}px) scale(${containerScale}) rotate(${hoverTilt}deg)`,
						filter: `blur(${plateBlur}px)`,
						borderRadius: 36,
						border: '3px solid rgba(191,197,206,0.18)',
						background:
							'linear-gradient(160deg, rgba(183,110,121,0.28) 0%, rgba(127,74,84,0.22) 16%, rgba(57,40,45,0.95) 38%, rgba(24,25,31,0.98) 100%)',
						boxShadow: `
              0 ${shadowPulse}px 40px rgba(0,0,0,0.35),
              inset 0 1px 0 rgba(255,255,255,0.08),
              inset 0 -2px 8px rgba(0,0,0,0.35)
            `,
						position: 'relative',
						overflow: 'hidden',
						padding: '40px 34px',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						backdropFilter: 'blur(2px)',
					}}
				>
					{/* Brushed texture */}
					<div
						style={{
							position: 'absolute',
							inset: 0,
							opacity: 0.22,
							backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  rgba(191,197,206,0.05) 0px,
                  rgba(191,197,206,0.01) 2px,
                  rgba(20,21,26,0.00) 5px,
                  rgba(20,21,26,0.00) 9px
                )
              `,
							pointerEvents: 'none',
						}}
					/>

					{/* Specular sweep */}
					<div
						style={{
							position: 'absolute',
							top: -80,
							left: sweepProgress,
							width: 240,
							height: height,
							transform: 'rotate(18deg)',
							background:
								'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 20%, rgba(184,242,201,0.14) 48%, rgba(255,255,255,0.03) 76%, rgba(255,255,255,0) 100%)',
							mixBlendMode: 'screen',
							pointerEvents: 'none',
						}}
					/>

					{/* Top metadata strip */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 20,
							width: '100%',
							position: 'relative',
							zIndex: 2,
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 8,
								flex: 1,
								minWidth: 0,
							}}
						>
							<div
								style={{
									...thinSansStyle,
									fontSize: 18,
									color: '#BFC5CE',
									opacity: 0.85,
									transform: `scale(${headerPop})`,
									transformOrigin: 'left center',
								}}
							>
								Chron Style 90
							</div>
							<div
								style={{
									...engravedStyle,
									fontSize: 20,
									color: '#B8F2C9',
								}}
							>
								FORBES_CALIBER_01
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '10px 18px',
								borderRadius: 999,
								border: '2px solid rgba(191,197,206,0.22)',
								background: 'rgba(20,21,26,0.55)',
								boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
								transform: `scale(${headerPop})`,
								flexShrink: 0,
							}}
						>
							<span
								style={{
									...engravedStyle,
									fontSize: 16,
									color: '#BFC5CE',
								}}
							>
								MACRO / DETACHED
							</span>
						</div>
					</div>

					{/* Main body */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 26,
							margin: '30px 0',
							position: 'relative',
							zIndex: 2,
						}}
					>
						{/* Hero chamber */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.15fr 0.85fr',
								gap: 28,
								alignItems: 'stretch',
							}}
						>
							{/* Left text stack */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									gap: 18,
									minWidth: 0,
								}}
							>
								<div
									style={{
										...thinSansStyle,
										fontSize: 22,
										lineHeight: 1.1,
										color: '#BFC5CE',
										opacity: 0.8,
									}}
								>
									Precision validation
								</div>

								<div
									style={{
										fontSize: 82,
										fontWeight: 300,
										lineHeight: 0.9,
										letterSpacing: '-0.03em',
										color: '#BFC5CE',
									}}
								>
									{serialText}
								</div>

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 10,
									}}
								>
									<div
										style={{
											...engravedStyle,
											fontSize: 22,
											color: '#B76E79',
										}}
									>
										SEATING MILESTONE
									</div>
									<div
										style={{
											fontSize: 34,
											fontWeight: 300,
											lineHeight: 1.12,
											color: '#BFC5CE',
											maxWidth: '100%',
										}}
									>
										Forbes recognition as a cold, engineered mechanism
									</div>
								</div>
							</div>

							{/* Right mechanism stack */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									minHeight: 300,
								}}
							>
								{/* Lens group */}
								<div
									style={{
										position: 'absolute',
										top: 10,
										right: 8,
										width: 300,
										height: 300,
										transform: `translateX(${lensX}px) scale(${lensScale})`,
										borderRadius: '50%',
										border: '3px solid rgba(191,197,206,0.22)',
										background:
											'radial-gradient(circle at 36% 34%, rgba(255,255,255,0.15) 0%, rgba(184,242,201,0.08) 10%, rgba(191,197,206,0.05) 28%, rgba(20,21,26,0.04) 60%, rgba(20,21,26,0.18) 100%)',
										boxShadow: `
                      inset 0 0 0 12px rgba(191,197,206,0.05),
                      inset 0 0 28px rgba(255,255,255,0.05),
                      0 14px 28px rgba(0,0,0,0.28)
                    `,
										backdropFilter: 'blur(4px)',
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 16,
											borderRadius: '50%',
											border: '1px solid rgba(191,197,206,0.18)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											top: 44,
											left: 64,
											width: 80,
											height: 20,
											borderRadius: 999,
											background:
												'linear-gradient(90deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.24) 50%, rgba(255,255,255,0.0) 100%)',
											transform: 'rotate(-22deg)',
										}}
									/>
								</div>

								{/* Main jewel seat */}
								<div
									style={{
										position: 'relative',
										width: 220,
										height: 220,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{/* Outer ring */}
									<div
										style={{
											position: 'absolute',
											width: 220,
											height: 220,
											borderRadius: '50%',
											border: '10px solid rgba(191,197,206,0.22)',
											boxShadow:
												'inset 0 0 0 2px rgba(255,255,255,0.03), inset 0 0 28px rgba(0,0,0,0.45)',
											transform: `rotate(${gearRotateA}deg)`,
										}}
									>
										{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
											const angle = i * 45;
											return (
												<div
													key={`tooth-a-${i}`}
													style={{
														position: 'absolute',
														left: '50%',
														top: '50%',
														width: 16,
														height: 28,
														background: '#BFC5CE',
														borderRadius: 4,
														transform: `rotate(${angle}deg) translateY(-126px) translateX(-8px)`,
														transformOrigin: 'center 126px',
														opacity: 0.24,
													}}
												/>
											);
										})}
									</div>

									{/* Mid gear */}
									<div
										style={{
											position: 'absolute',
											width: 134,
											height: 134,
											borderRadius: '50%',
											border: '8px solid rgba(191,197,206,0.18)',
											transform: `rotate(${gearRotateB}deg)`,
										}}
									>
										{[0, 1, 2, 3, 4, 5].map((i) => {
											const angle = i * 60;
											return (
												<div
													key={`tooth-b-${i}`}
													style={{
														position: 'absolute',
														left: '50%',
														top: '50%',
														width: 12,
														height: 22,
														background: '#B76E79',
														borderRadius: 4,
														transform: `rotate(${angle}deg) translateY(-78px) translateX(-6px)`,
														transformOrigin: 'center 78px',
														opacity: 0.5,
													}}
												/>
											);
										})}
									</div>

									{/* Balance wheel */}
									<div
										style={{
											position: 'absolute',
											width: 94,
											height: 94,
											borderRadius: '50%',
											border: '5px solid rgba(184,242,201,0.65)',
											boxShadow:
												'inset 0 0 10px rgba(184,242,201,0.12), 0 0 14px rgba(184,242,201,0.04)',
											transform: `translateY(${microVibeY}px) rotate(${balanceWheelRotate + gearRotateC}deg)`,
										}}
									>
										{[0, 1, 2, 3].map((i) => {
											const angle = i * 90;
											return (
												<div
													key={`spoke-${i}`}
													style={{
														position: 'absolute',
														left: '50%',
														top: '50%',
														width: 4,
														height: 36,
														borderRadius: 2,
														background: '#B8F2C9',
														transform: `rotate(${angle}deg) translateY(-18px) translateX(-2px)`,
													}}
												/>
											);
										})}
									</div>

									{/* Seating ring */}
									<div
										style={{
											position: 'absolute',
											width: 56,
											height: 56,
											borderRadius: '50%',
											border: '4px solid rgba(191,197,206,0.34)',
											transform: `scale(${jewelRingScale})`,
											boxShadow: 'inset 0 0 12px rgba(0,0,0,0.4)',
										}}
									/>

									{/* Ruby jewel */}
									<div
										style={{
											position: 'absolute',
											width: 34,
											height: 34,
											borderRadius: '50%',
											background:
												'radial-gradient(circle at 35% 30%, #ff8fa0 0%, #c61d33 28%, #9B111E 62%, #5d0710 100%)',
											border: '2px solid rgba(255,255,255,0.14)',
											transform: `translateY(${jewelY}px) scale(${jewelScale * jewelPulse})`,
											boxShadow: `
                        0 ${jewelShadow}px 22px rgba(0,0,0,0.28),
                        inset 0 2px 5px rgba(255,255,255,0.18),
                        0 0 ${8 + snapFlash * 14}px rgba(155,17,30,0.48)
                      `,
										}}
									/>

									{/* Snap flash */}
									<div
										style={{
											position: 'absolute',
											width: 86 + snapFlash * 40,
											height: 86 + snapFlash * 40,
											borderRadius: '50%',
											border: `2px solid rgba(184,242,201,${0.28 * snapFlash})`,
											opacity: snapFlash,
										}}
									/>
								</div>
							</div>
						</div>

						{/* Spoken line panel */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 12,
								padding: '22px 24px',
								borderRadius: 24,
								border: '2px solid rgba(191,197,206,0.16)',
								background: 'rgba(12,13,17,0.44)',
								boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
							}}
						>
							<div
								style={{
									...engravedStyle,
									fontSize: 18,
									color: '#BFC5CE',
									opacity: 0.78,
								}}
							>
								Spoken line
							</div>
							<div
								style={{
									fontSize: 30,
									fontWeight: 300,
									lineHeight: 1.22,
									color: '#BFC5CE',
								}}
							>
								because they don&apos;t give you shit. When Layla and I get on
								the Forbes list, eventually.
							</div>
						</div>
					</div>

					{/* Bottom precision rail */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 22,
							width: '100%',
							position: 'relative',
							zIndex: 2,
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 16,
								flexWrap: 'wrap',
								minWidth: 0,
								flex: 1,
							}}
						>
							<div
								style={{
									...engravedStyle,
									fontSize: 17,
									color: '#B76E79',
								}}
							>
								SERIAL:{' '}
								<span
									style={{
										color: '#BFC5CE',
										opacity: 0.95,
										textShadow: `0 0 ${10 * serialGlow}px rgba(184,242,201,0.14)`,
									}}
								>
									{serialText}
								</span>
							</div>

							<div
								style={{
									width: 8,
									height: 8,
									borderRadius: '50%',
									backgroundColor: serialRaw === 1 ? '#B8F2C9' : '#BFC5CE',
									boxShadow:
										serialRaw === 1
											? '0 0 12px rgba(184,242,201,0.45)'
											: 'none',
									flexShrink: 0,
								}}
							/>

							<div
								style={{
									...engravedStyle,
									fontSize: 17,
									color: '#BFC5CE',
									opacity: 0.82,
								}}
							>
								JEWEL SEATED
							</div>
						</div>

						<div
							style={{
								flexShrink: 0,
								padding: '16px 24px',
								borderRadius: 18,
								background:
									serialRaw === 1
										? 'linear-gradient(180deg, rgba(184,242,201,0.18) 0%, rgba(184,242,201,0.10) 100%)'
										: 'linear-gradient(180deg, rgba(191,197,206,0.10) 0%, rgba(191,197,206,0.05) 100%)',
								border: `2px solid ${
									serialRaw === 1
										? 'rgba(184,242,201,0.30)'
										: 'rgba(191,197,206,0.18)'
								}`,
								boxShadow: `0 8px 0 rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)`,
								transform:
									serialRaw === 1
										? `translateY(${interpolate(frame, [42, 48, 54], [0, 6, 0], clamp)}px) scale(${interpolate(frame, [42, 48, 54], [1, 0.96, 1], clamp)})`
										: 'scale(1)',
							}}
						>
							<div
								style={{
									...engravedStyle,
									fontSize: 20,
									color: serialRaw === 1 ? '#B8F2C9' : '#BFC5CE',
								}}
							>
								{serialRaw === 1 ? 'LOCKED / VERIFIED' : 'PENDING / ALIGN'}
							</div>
						</div>
					</div>

					{/* Bevel edge highlights */}
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							height: 2,
							background:
								'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 18%, rgba(255,255,255,0.05) 52%, rgba(255,255,255,0.12) 82%, rgba(255,255,255,0) 100%)',
							opacity: 0.7,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							bottom: 0,
							width: 2,
							background:
								'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 26%, rgba(255,255,255,0.00) 100%)',
							opacity: 0.55,
						}}
					/>
				</div>
			</div>

			{/* Soft vignette lock-out */}
			<AbsoluteFill
				style={{
					boxShadow: 'inset 0 0 220px rgba(0,0,0,0.4)',
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
}