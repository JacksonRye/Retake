import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene4() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: hard snap entrance
	const cardSpring = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 260,
			mass: 0.7,
		},
	});

	const badgeSpring = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 12,
			stiffness: 250,
			mass: 0.6,
		},
	});

	const entranceX = interpolate(frame, [0, 8, 14], [980, 120, 0], clamp);
	const shadowLagX = interpolate(frame, [0, 8, 14], [1040, 180, 18], clamp);

	// Beat 2: active redirect
	const dragProgress = interpolate(frame, [30, 66], [0, 1], clamp);
	const directionFlip = interpolate(frame, [36, 60], [0, 1], clamp);
	const arrowTravel = interpolate(frame, [30, 60], [0, 320], clamp);
	const clickScale = frame >= 40 && frame <= 48 ? 0.86 : 1;
	const badgePop = spring({
		frame: frame - 54,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.55,
		},
	});

	// Beat 3: living loop
	const hoverY = Math.sin(frame * 0.12) * 8;
	const tilt = Math.sin(frame * 0.085) * 2.2;
	const wobbleX = Math.sin(frame * 0.09) * 8;
	const pulseShadowY = 14 + Math.sin(frame * 0.2) * 5;
	const pulseShadowX = 16 + Math.sin(frame * 0.16) * 4;
	const shineOffset = interpolate((frame + 18) % 58, [0, 58], [-260, 980], clamp);
	const underlineBlink =
		frame >= 84 ? (Math.floor((frame - 84) / 4) % 2 === 0 ? 1 : 0.22) : 0.35;

	// Exit
	const exitX = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -180],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 3, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const isFlipped = directionFlip > 0.5;

	const cursorVisible = frame >= 28 && frame <= 73;
	const cursorX = interpolate(frame, [28, 42, 58, 73], [740, 610, 420, 350], clamp);
	const cursorY = interpolate(frame, [28, 42, 58, 73], [355, 345, 343, 343], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				fontFamily:
					'"Arial Black","Helvetica Neue",Helvetica,Arial,sans-serif',
				opacity,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 940,
					height: '86%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '56px 18px',
					boxSizing: 'border-box',
					transform: `translateX(${exitX}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeSpring}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
						backgroundColor: '#FF90E8',
						border: '4px solid #000000',
						borderRadius: 18,
						padding: '12px 26px',
						boxShadow: '8px 8px 0 #000000',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 14,
							height: 14,
							borderRadius: 999,
							backgroundColor: '#000000',
						}}
					/>
					<div
						style={{
							color: '#000000',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						MINDSET SHIFT
					</div>
				</div>

				{/* Tier 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0',
					}}
				>
					{/* Shadow lag layer */}
					<div
						style={{
							position: 'absolute',
							width: '100%',
							minHeight: 540,
							borderRadius: 34,
							backgroundColor: '#000000',
							transform: `translate(${shadowLagX + wobbleX}px, ${pulseShadowY}px)`,
						}}
					/>

					{/* Hero card */}
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#23A094',
							border: '5px solid #000000',
							borderRadius: 34,
							position: 'relative',
							overflow: 'hidden',
							padding: '34px 34px 30px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 24,
							transform: `translate(${entranceX + wobbleX}px, ${hoverY}px) scale(${cardSpring}) rotate(${tilt}deg)`,
						}}
					>
						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								backgroundColor: 'rgba(255,255,255,0.22)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Row 1: top label */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									backgroundColor: '#FFF8E7',
									border: '4px solid #000000',
									borderRadius: 16,
									padding: '10px 22px',
									boxShadow: '6px 6px 0 #000000',
									color: '#000000',
									fontSize: 24,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								PICK A BETTER DIRECTION
							</div>
						</div>

						{/* Row 2: arrow stage */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 22,
							}}
						>
							<div
								style={{
									width: '100%',
									height: 170,
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								{/* WRONG THING state */}
								<div
									style={{
										position: 'absolute',
										left: 40,
										top: 16,
										width: 330,
										height: 132,
										opacity: 1 - directionFlip,
										transform: `translateX(${dragProgress * 50}px)`,
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 0,
											top: 26,
											width: 220,
											height: 80,
											backgroundColor: '#FF90E8',
											border: '5px solid #000000',
											borderRadius: 16,
											boxShadow: '8px 8px 0 #000000',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 210,
											top: 14,
											width: 0,
											height: 0,
											borderTop: '52px solid transparent',
											borderBottom: '52px solid transparent',
											borderLeft: '110px solid #FF90E8',
											filter: 'drop-shadow(8px 8px 0 #000000)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 28,
											top: 44,
											color: '#000000',
											fontSize: 54,
											fontWeight: 1000,
											lineHeight: 1,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										WRONG THING
									</div>
								</div>

								{/* BUILD BUSINESS state */}
								<div
									style={{
										position: 'absolute',
										right: 40,
										top: 16,
										width: 470,
										height: 132,
										opacity: directionFlip,
										transform: `translateX(${(1 - dragProgress) * -80}px)`,
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 110,
											top: 26,
											width: 250,
											height: 80,
											backgroundColor: '#F1F333',
											border: '5px solid #000000',
											borderRadius: 16,
											boxShadow: '8px 8px 0 #000000',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 0,
											top: 14,
											width: 0,
											height: 0,
											borderTop: '52px solid transparent',
											borderBottom: '52px solid transparent',
											borderRight: '110px solid #F1F333',
											filter: 'drop-shadow(-8px 8px 0 #000000)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 136,
											top: 44,
											color: '#000000',
											fontSize: 54,
											fontWeight: 1000,
											lineHeight: 1,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										BUILD BUSINESS
									</div>
								</div>

								{/* draggable handle */}
								<div
									style={{
										position: 'absolute',
										left: 258 + arrowTravel,
										top: 58,
										width: 42,
										height: 42,
										borderRadius: 999,
										backgroundColor: '#FFF8E7',
										border: '4px solid #000000',
										boxShadow: `${isFlipped ? -6 : 6}px 6px 0 #000000`,
										zIndex: 10,
									}}
								/>
							</div>

							{/* Row 3: clean sublabel area */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-start',
									padding: '0 30px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										width: '42%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 12,
										opacity: 1 - directionFlip * 0.9,
									}}
								>
									<div
										style={{
											backgroundColor: '#FFF8E7',
											border: '4px solid #000000',
											borderRadius: 14,
											padding: '12px 18px',
											boxShadow: '6px 6px 0 #000000',
											color: '#000000',
											fontSize: 26,
											fontWeight: 900,
											textTransform: 'uppercase',
											position: 'relative',
											textAlign: 'center',
											minWidth: 250,
										}}
									>
										BUSY WORK
										<div
											style={{
												position: 'absolute',
												left: 18,
												right: 18,
												top: '50%',
												height: 6,
												backgroundColor: '#000000',
												transform: 'rotate(-9deg)',
											}}
										/>
									</div>
								</div>

								<div
									style={{
										width: '42%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 14,
										opacity: Math.max(directionFlip, 0.15),
									}}
								>
									<div
										style={{
											color: '#000000',
											fontSize: 26,
											fontWeight: 900,
											textTransform: 'uppercase',
											textAlign: 'center',
											whiteSpace: 'nowrap',
										}}
									>
										CUSTOMERS + CASH
									</div>

									<div
										style={{
											width: 320,
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										<div
											style={{
												transform: `scale(${badgePop}) translateY(${badgePop < 0.98 ? 20 : 0}px)`,
												transformOrigin: 'center',
												backgroundColor: '#7CFF7A',
												border: '4px solid #000000',
												borderRadius: 16,
												padding: '12px 20px',
												boxShadow: `${8 + Math.sin(frame * 0.18) * 2}px ${8 + Math.sin(frame * 0.18) * 2}px 0 #000000`,
												display: 'flex',
												alignItems: 'center',
												gap: 14,
												opacity: badgePop,
											}}
										>
											<div
												style={{
													fontSize: 28,
													fontWeight: 1000,
													color: '#000000',
													textTransform: 'uppercase',
													whiteSpace: 'nowrap',
												}}
											>
												CUSTOMER
											</div>
											<div
												style={{
													width: 12,
													height: 12,
													borderRadius: 999,
													backgroundColor: '#000000',
												}}
											/>
											<div
												style={{
													fontSize: 30,
													fontWeight: 1000,
													color: '#000000',
													whiteSpace: 'nowrap',
												}}
											>
												$
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Row 4: takeaway button */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									backgroundColor: '#FFF8E7',
									border: '4px solid #000000',
									borderRadius: 18,
									padding: '16px 28px 18px 28px',
									boxShadow: `${pulseShadowX}px ${10 + Math.sin(frame * 0.22) * 3}px 0 #000000`,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 10,
								}}
							>
								<div
									style={{
										color: '#000000',
										fontSize: 34,
										fontWeight: 1000,
										lineHeight: 1,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									FOCUS WHERE MONEY GROWS
								</div>
								<div
									style={{
										width: 310,
										height: 8,
										backgroundColor: '#000000',
										opacity: underlineBlink,
										borderRadius: 99,
									}}
								/>
							</div>
						</div>
					</div>

					{/* Cursor */}
					{cursorVisible && (
						<div
							style={{
								position: 'absolute',
								left: cursorX,
								top: cursorY,
								transform: `scale(${clickScale})`,
								zIndex: 40,
								pointerEvents: 'none',
								filter: 'drop-shadow(8px 8px 0 #000000)',
							}}
						>
							<svg
								width="84"
								height="84"
								viewBox="0 0 24 24"
								fill="#FFF8E7"
								stroke="#000000"
								strokeWidth="2.6"
								strokeLinejoin="round"
							>
								<path d="M4 3l7.2 16.8 2.4-7 7-2.4z" />
							</svg>
						</div>
					)}
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${badgeSpring}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#F1F333',
						border: '4px solid #000000',
						borderRadius: 18,
						padding: '14px 26px',
						boxShadow: '8px 8px 0 #000000',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<div
						style={{
							color: '#000000',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 1.5,
							textTransform: 'uppercase',
							textAlign: 'center',
						}}
					>
						STOP CHASING WRONG THINGS
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}