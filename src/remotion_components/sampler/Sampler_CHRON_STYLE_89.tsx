import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_89() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 250, mass: 0.55},
	});

	const cardIn = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const bottomIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.65},
	});

	// Beat 2: state switch / bid ladder climb / lot card turn activation
	const commissionReveal = interpolate(frame, [14, 44], [0, 1], clamp);
	const ladderStep = Math.floor(interpolate(frame, [20, 70], [0, 4.999], clamp));
	const paddleLift = interpolate(frame, [18, 44], [36, 0], clamp);
	const paddleRotate = interpolate(frame, [18, 44], [8, 0], clamp);
	const hammerDrop = interpolate(frame, [74, 86], [-56, 0], clamp);
	const hammerFreeze = frame >= 86 && frame <= 104;
	const cardTurn = interpolate(frame, [48, 72], [-2.2, 0], clamp);

	// Beat 3: living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const bottomFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shineOffset = interpolate((frame + 8) % 70, [0, 70], [-260, 980], clamp);
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;

	// outro
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -44],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const ladderColors = ['#C29B40', '#C29B40', '#C29B40', '#C29B40', '#9E2B25'];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F7F3EA',
				opacity,
				fontFamily:
					'"Baskerville", "Times New Roman", "Georgia", serif',
				color: '#232020',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '46px 18px 36px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#F7F3EA',
						border: '3px solid #232020',
						borderRadius: 999,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 18px rgba(35,32,32,0.12)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#9E2B25',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 800,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							color: '#232020',
						}}
					>
						Lot 47 • Auction House
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
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#C29B40',
							border: '4px solid #232020',
							borderRadius: 32,
							boxShadow: `0 ${shadowPulse}px 30px rgba(35,32,32,0.18)`,
							padding: '34px 34px 28px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: 'auto auto 1fr auto',
							rowGap: 20,
							transform: `rotate(${cardTurn}deg)`,
						}}
					>
						{/* shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(247,243,234,0) 0%, rgba(247,243,234,0.34) 50%, rgba(247,243,234,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top auction rail */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									border: '2.5px solid #232020',
									borderRadius: 14,
									padding: '10px 16px 8px',
									backgroundColor: '#F7F3EA',
									minWidth: 168,
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: 16,
										letterSpacing: 2,
										textTransform: 'uppercase',
										color: '#7C766C',
										fontWeight: 700,
									}}
								>
									Lot Number
								</div>
								<div
									style={{
										fontSize: 44,
										lineHeight: 1,
										fontStyle: 'italic',
										fontWeight: 800,
										color: '#232020',
									}}
								>
									47
								</div>
							</div>

							<div
								style={{
									border: '2.5px solid #232020',
									borderRadius: 14,
									padding: '10px 18px 10px',
									backgroundColor: '#F7F3EA',
									minWidth: 250,
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: 16,
										letterSpacing: 2,
										textTransform: 'uppercase',
										color: '#7C766C',
										fontWeight: 700,
									}}
								>
									Estimate Range
								</div>
								<div
									style={{
										fontSize: 34,
										lineHeight: 1.05,
										fontWeight: 800,
										fontStyle: 'italic',
										color: '#232020',
									}}
								>
									$20K–$50K
								</div>
							</div>
						</div>

						{/* headline */}
						<div
							style={{
								textAlign: 'center',
								position: 'relative',
								zIndex: 2,
								padding: '0 14px',
							}}
						>
							<div
								style={{
									fontSize: 72,
									lineHeight: 0.96,
									fontWeight: 800,
									fontStyle: 'italic',
									letterSpacing: -1.5,
									color: '#232020',
									textTransform: 'uppercase',
								}}
							>
								AUTOMATED
							</div>
							<div
								style={{
									fontSize: 80,
									lineHeight: 0.96,
									fontWeight: 800,
									fontStyle: 'italic',
									letterSpacing: -1.5,
									color: '#232020',
									textTransform: 'uppercase',
								}}
							>
								MARGINS
							</div>
						</div>

						{/* body section */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.1fr 0.9fr',
								columnGap: 28,
								alignItems: 'stretch',
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* left metric panel */}
							<div
								style={{
									border: '3px solid #232020',
									borderRadius: 24,
									backgroundColor: '#F7F3EA',
									padding: '22px 24px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									minHeight: 224,
									position: 'relative',
								}}
							>
								<div
									style={{
										fontSize: 18,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										color: '#7C766C',
										fontWeight: 700,
										textAlign: 'center',
									}}
								>
									Winning Margin
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 12,
										marginTop: 6,
										marginBottom: 6,
									}}
								>
									<div
										style={{
											fontSize: 84,
											lineHeight: 0.95,
											fontWeight: 900,
											fontStyle: 'italic',
											color: '#9E2B25',
											letterSpacing: -2,
											transform: `translateY(${interpolate(
												commissionReveal,
												[0, 1],
												[18, 0]
											)}px)`,
											opacity: commissionReveal,
										}}
									>
										50%
									</div>
								</div>

								<div
									style={{
										alignSelf: 'center',
										backgroundColor: '#232020',
										color: '#F7F3EA',
										borderRadius: 999,
										padding: '10px 20px',
										fontSize: 22,
										fontWeight: 800,
										fontStyle: 'italic',
										letterSpacing: 1,
										textTransform: 'uppercase',
									}}
								>
									Commission
								</div>
							</div>

							{/* right auction activity panel */}
							<div
								style={{
									border: '3px solid #232020',
									borderRadius: 24,
									backgroundColor: '#F7F3EA',
									padding: '18px 20px',
									display: 'grid',
									gridTemplateRows: 'auto 1fr auto',
									rowGap: 14,
									minHeight: 224,
									position: 'relative',
								}}
							>
								<div
									style={{
										fontSize: 18,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										color: '#7C766C',
										fontWeight: 700,
										textAlign: 'center',
									}}
								>
									Bid Ladder
								</div>

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										gap: 10,
										padding: '0 6px',
									}}
								>
									{[0, 1, 2, 3, 4].map((i) => {
										const active = i <= ladderStep;
										return (
											<div
												key={i}
												style={{
													height: 24,
													border: '2px solid #232020',
													borderRadius: 999,
													backgroundColor: active
														? ladderColors[i]
														: 'rgba(124,118,108,0.12)',
													transform: `scaleX(${active ? 1 : 0.86})`,
													transformOrigin: 'left center',
													opacity: active ? 1 : 0.65,
												}}
											/>
										);
									})}
								</div>

								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'flex-end',
										marginTop: 2,
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'flex-end',
											width: 88,
											height: 90,
											position: 'relative',
											flexShrink: 0,
										}}
									>
										<div
											style={{
												width: 14,
												height: 30,
												backgroundColor: '#7C766C',
												border: '2px solid #232020',
												borderTop: 'none',
												transform: `translateY(${paddleLift}px) rotate(${paddleRotate}deg)`,
												borderBottomLeftRadius: 8,
												borderBottomRightRadius: 8,
												position: 'absolute',
												bottom: 18,
											}}
										/>
										<div
											style={{
												width: 54,
												height: 40,
												borderRadius: '50%',
												backgroundColor: '#9E2B25',
												border: '3px solid #232020',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												fontSize: 22,
												fontWeight: 900,
												fontStyle: 'italic',
												color: '#F7F3EA',
												position: 'absolute',
												bottom: 36 + paddleLift,
												transform: `rotate(${paddleRotate}deg)`,
											}}
										>
											47
										</div>
									</div>

									<div
										style={{
											position: 'relative',
											width: 118,
											height: 92,
											flexShrink: 0,
										}}
									>
										<div
											style={{
												position: 'absolute',
												right: 8,
												bottom: hammerFreeze ? 12 : 10,
												width: 76,
												height: 14,
												backgroundColor: '#232020',
												borderRadius: 12,
												transformOrigin: 'right center',
												transform: `translateY(${hammerDrop}px) rotate(${
													hammerFreeze ? -16 : -28
												}deg)`,
											}}
										/>
										<div
											style={{
												position: 'absolute',
												right: 58,
												bottom: hammerFreeze ? 26 : 24,
												width: 34,
												height: 24,
												backgroundColor: '#9E2B25',
												border: '3px solid #232020',
												borderRadius: 8,
												transform: `translateY(${hammerDrop}px)`,
											}}
										/>
										<div
											style={{
												position: 'absolute',
												right: 16,
												bottom: 0,
												width: 62,
												height: 12,
												backgroundColor: '#7C766C',
												borderRadius: 999,
											}}
										/>
									</div>
								</div>
							</div>
						</div>

						{/* footer strip inside card */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#232020',
									color: '#F7F3EA',
									borderRadius: 14,
									padding: '12px 24px',
									fontSize: 20,
									fontWeight: 800,
									fontStyle: 'italic',
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									textAlign: 'center',
								}}
							>
								Hammer-Strike Freeze
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${bottomIn}) translateY(${bottomFloat}px)`,
						backgroundColor: '#9E2B25',
						border: '3px solid #232020',
						borderRadius: 20,
						padding: '16px 30px',
						boxShadow: '0 8px 18px rgba(35,32,32,0.14)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F7F3EA',
							fontSize: 24,
							fontWeight: 900,
							fontStyle: 'italic',
							letterSpacing: 1.8,
							textTransform: 'uppercase',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}