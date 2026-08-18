import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style69Page100Teletext_Scene2() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1: ENTRANCE
	// ==========================================
	const entrance = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.65},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.55},
	});

	const heroRowsVisible = Math.floor(interpolate(frame, [0, 22], [0, 13], clamp));
	const headerStretch = interpolate(frame, [0, 8, 16, 28], [0.82, 1.12, 0.97, 1], clamp);

	// ==========================================
	// BEAT 2: ACTIVE MID-SCENE EVENT
	// ==========================================
	const toggleFlashWindow = frame >= 34 && frame <= 60;
	const lowerRateActive = frame >= 41;
	const flashStrength = toggleFlashWindow ? 0.45 + Math.sin(frame * 1.9) * 0.35 : 0;

	// Packet travel left -> right, then continues through beat 3
	const packetLoopA = ((frame - 28) % 34 + 34) % 34;
	const packetLoopB = ((frame - 39) % 34 + 34) % 34;
	const packetLoopC = ((frame - 50) % 34 + 34) % 34;

	const packetX1 = interpolate(packetLoopA, [0, 33], [90, 760], clamp);
	const packetX2 = interpolate(packetLoopB, [0, 33], [90, 760], clamp);
	const packetX3 = interpolate(packetLoopC, [0, 33], [90, 760], clamp);

	const packetOpacity1 = frame < 28 ? 0 : interpolate(packetLoopA, [0, 4, 28, 33], [0, 1, 1, 0], clamp);
	const packetOpacity2 = frame < 39 ? 0 : interpolate(packetLoopB, [0, 4, 28, 33], [0, 1, 1, 0], clamp);
	const packetOpacity3 = frame < 50 ? 0 : interpolate(packetLoopC, [0, 4, 28, 33], [0, 1, 1, 0], clamp);

	// ==========================================
	// BEAT 3: CONTINUOUS LIVING LOOP
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.2;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-300, 950], clamp);
	const pulseRow = Math.floor(((frame - 70) % 24 + 24) % 24 / 6);

	// Header page number soft roll by one digit near end
	const pageDigit = frame < 95 ? '1' : frame < 105 ? '2' : '2';
	const pageWobble = frame >= 90 ? Math.sin(frame * 0.28) * 2 : 0;

	// Exit
	const exitSlide = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -60], clamp);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const rowIndices = new Array(13).fill(true).map((_, i) => i);

	const packetStyle = (x: number, opacityValue: number) => ({
		position: 'absolute' as const,
		left: x,
		top: '50%',
		transform: 'translate(-50%, -50%)',
		width: 34,
		height: 34,
		backgroundColor: '#00FF00',
		border: '4px solid #000000',
		boxShadow: '0 0 0 4px #00FFFF',
		opacity: opacityValue,
		zIndex: 8,
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#000000',
				opacity,
				fontFamily:
					'"Courier New", "Lucida Console", Monaco, monospace',
				justifyContent: 'center',
				alignItems: 'center',
				color: '#FFFF00',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '86%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '64px 18px 72px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
					gap: 16,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						border: '4px solid #FF0000',
						backgroundColor: '#000000',
						padding: '10px 18px',
						boxSizing: 'border-box',
						color: '#00FFFF',
						boxShadow: '0 0 0 3px #000000',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 14,
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						<span style={{color: '#FFFF00'}}>P100</span>
						<span style={{color: '#00FFFF'}}>BUSINESS FLOW</span>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 10,
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 2,
							color: '#FFFF00',
							transform: `translateY(${pageWobble}px)`,
						}}
					>
						<span>NO.</span>
						<span
							style={{
								display: 'inline-block',
								minWidth: 20,
								textAlign: 'center',
							}}
						>
							{pageDigit}
						</span>
					</div>
				</div>

				{/* TIER 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						transform: `scale(${entrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						position: 'relative',
						margin: '14px 0',
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#000000',
							border: '7px solid #FF0000',
							boxShadow: `${shadowPulse}px ${shadowPulse}px 0px #00FFFF`,
							padding: '34px 28px 30px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							gap: 18,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Shine sweep */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 100,
								backgroundColor: 'rgba(255,255,255,0.12)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
								zIndex: 1,
							}}
						/>

						{/* Header */}
						<div
							style={{
								position: 'relative',
								zIndex: 3,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								borderTop: '6px solid #FFFF00',
								borderBottom: '6px solid #FFFF00',
								padding: '14px 8px',
								transform: `scaleX(${headerStretch})`,
							}}
						>
							<div
								style={{
									fontSize: 74,
									lineHeight: 0.95,
									fontWeight: 900,
									letterSpacing: 1,
									color: '#FFFF00',
									textTransform: 'uppercase',
									textAlign: 'center',
								}}
							>
								NO.1 OUTSOURCING
							</div>
						</div>

						{/* Row redraw area */}
						<div
							style={{
								position: 'relative',
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								gap: 8,
								zIndex: 3,
							}}
						>
							{rowIndices.map((row) => {
								const visible = row < heroRowsVisible;
								const isArrowBand = row >= 4 && row <= 8;
								const isPulseRow = row === 4 + pulseRow;
								const rowColor = isArrowBand
									? isPulseRow
										? '#FFFF00'
										: '#00FFFF'
									: '#000000';

								return (
									<div
										key={row}
										style={{
											height: 28,
											width: '100%',
											display: 'flex',
											alignItems: 'center',
											opacity: visible ? 1 : 0,
											transform: `translateX(${visible ? 0 : -120}px)`,
											transition: 'none',
											position: 'relative',
											overflow: 'hidden',
											borderTop: row === 0 ? '4px solid #FF0000' : 'none',
											borderBottom: row === 12 ? '4px solid #FF0000' : 'none',
										}}
									>
										{/* Left WORK block */}
										<div
											style={{
												width: '24%',
												height: '100%',
												backgroundColor:
													row >= 3 && row <= 9 ? '#FFFF00' : '#000000',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												borderLeft: '4px solid #FF0000',
												borderTop:
													row === 3 ? '4px solid #FF0000' : 'none',
												borderBottom:
													row === 9 ? '4px solid #FF0000' : 'none',
												color: row === 6 ? '#000000' : 'transparent',
												fontSize: 64,
												fontWeight: 900,
												lineHeight: 1,
												textTransform: 'uppercase',
											}}
										>
											{row === 6 ? 'WORK' : '█'}
										</div>

										{/* Arrow middle */}
										<div
											style={{
												width: '52%',
												height: '100%',
												position: 'relative',
												display: 'flex',
												alignItems: 'center',
												backgroundColor:
													isArrowBand ? rowColor : '#000000',
											}}
										>
											{isArrowBand && (
												<>
													<div
														style={{
															position: 'absolute',
															left: 0,
															right: 26,
															top: 0,
															bottom: 0,
															backgroundColor: rowColor,
														}}
													/>
													<div
														style={{
															position: 'absolute',
															right: 0,
															width: 0,
															height: 0,
															borderTop: '14px solid transparent',
															borderBottom: '14px solid transparent',
															borderLeft: `26px solid ${rowColor}`,
														}}
													/>
												</>
											)}

											<div style={packetStyle(packetX1, packetOpacity1)} />
											<div style={packetStyle(packetX2, packetOpacity2)} />
											<div style={packetStyle(packetX3, packetOpacity3)} />
										</div>

										{/* Right CLIENT block */}
										<div
											style={{
												width: '24%',
												height: '100%',
												backgroundColor:
													row >= 3 && row <= 9 ? '#00FFFF' : '#000000',
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												borderRight: '4px solid #FF0000',
												borderTop:
													row === 3 ? '4px solid #FF0000' : 'none',
												borderBottom:
													row === 9 ? '4px solid #FF0000' : 'none',
												color: row === 6 ? '#000000' : 'transparent',
												fontSize: 58,
												fontWeight: 900,
												lineHeight: 1,
												textTransform: 'uppercase',
											}}
										>
											{row === 6 ? 'CLIENT' : '█'}
										</div>
									</div>
								);
							})}
						</div>

						{/* Lower status line with flash toggle */}
						<div
							style={{
								position: 'relative',
								zIndex: 4,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '14px 18px',
								border: '4px solid #FF0000',
								backgroundColor:
									toggleFlashWindow && flashStrength > 0.35 ? '#FF0000' : '#000000',
								color:
									toggleFlashWindow && flashStrength > 0.35 ? '#000000' : '#FFFF00',
							}}
						>
							<div
								style={{
									fontSize: 34,
									fontWeight: 900,
									letterSpacing: 1,
									textTransform: 'uppercase',
								}}
							>
								ROUTE STATUS
							</div>
							<div
								style={{
									fontSize: 42,
									fontWeight: 900,
									letterSpacing: 1,
									textTransform: 'uppercase',
									color: lowerRateActive ? '#00FF00' : '#FF0000',
								}}
							>
								{lowerRateActive ? 'RATE: LOWER' : 'RATE: HIGH'}
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						width: '100%',
						backgroundColor: '#FFFF00',
						border: '4px solid #FF0000',
						padding: '16px 20px',
						boxSizing: 'border-box',
						textAlign: 'center',
						boxShadow: '8px 8px 0px #00FFFF',
					}}
				>
					<div
						style={{
							color: '#000000',
							fontSize: 28,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						SEND THE WORK. KEEP THE CLIENT.
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}