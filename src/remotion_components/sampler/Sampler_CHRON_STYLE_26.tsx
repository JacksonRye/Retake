import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_26() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// -----------------------------
	// Beat 1: Snappy entrance
	// -----------------------------
	const entrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.5},
	});

	const cardSettle = spring({
		frame: frame - 2,
		fps,
		config: {damping: 14, stiffness: 180, mass: 0.7},
	});

	// -----------------------------
	// Beat 2: active transformation
	// -----------------------------
	const commissionCount = Math.round(
		interpolate(frame, [16, 62], [12, 50], clamp)
	);

	const knobTurn = interpolate(frame, [20, 64], [-110, 110], clamp);
	const knobGlow = interpolate(frame, [24, 64], [0.15, 0.42], clamp);

	const vuL = interpolate(
		Math.sin(frame * 0.45) + Math.sin(frame * 0.18 + 0.7) * 0.35,
		[-1.35, 1.35],
		[0.22, 0.96],
		clamp
	);
	const vuR = interpolate(
		Math.sin(frame * 0.52 + 0.8) + Math.sin(frame * 0.15) * 0.28,
		[-1.28, 1.28],
		[0.18, 0.92],
		clamp
	);

	const clickFrame = frame >= 48 && frame <= 56;
	const cardThunk = clickFrame ? 10 : 0;
	const shadowBase = clickFrame ? 8 : 18;

	// LED chase
	const ledIndex = Math.floor(((frame - 18) % 30 + 30) % 30 / 5);

	// Cable plug-in animation
	const cableProgress = interpolate(frame, [18, 52], [0, 1], clamp);
	const plugX = interpolate(frame, [18, 52], [220, 0], clamp);
	const plugScale = interpolate(frame, [18, 28, 52], [0.8, 1.02, 1], clamp);
	const cableSag = 34 + Math.sin(cableProgress * Math.PI) * 42;

	// -----------------------------
	// Beat 3: living hover loop
	// -----------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = shadowBase + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate(((frame + 18) % 68), [0, 68], [-260, 980], clamp);

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -60],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const monoFont =
		'"SFMono-Regular", "Roboto Mono", "Menlo", "Consolas", monospace';
	const capsFont =
		'"Arial Black", "Impact", "Helvetica Neue", sans-serif';

	const leds = new Array(5).fill(true);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#15151A',
				opacity,
				fontFamily: capsFont,
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
					padding: '56px 18px 36px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#22242B',
						border: '3px solid #14B8A6',
						boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#14B8A6',
							boxShadow: `0 0 0 3px rgba(20,184,166,0.14), 0 0 18px rgba(20,184,166,0.55)`,
						}}
					/>
					<div
						style={{
							color: '#C7CCD1',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						Signal Path
					</div>
				</div>

				{/* Tier 2: Massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						transform: `scale(${cardSettle}) translateY(${hoverY + cardThunk}px) rotate(${hoverTilt}deg)`,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#FFC53D',
							border: '4px solid #C7CCD1',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.58)`,
							padding: '34px 30px 28px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 22,
						}}
					>
						{/* subtle travelling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top patch header */}
						<div
							style={{
								display: 'flex',
								alignItems: 'flex-start',
								justifyContent: 'space-between',
								gap: 20,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
									minWidth: 0,
								}}
							>
								<div
									style={{
										color: '#15151A',
										fontFamily: monoFont,
										fontSize: 15,
										fontWeight: 700,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										opacity: 0.82,
									}}
								>
									route / margin bus
								</div>
								<div
									style={{
										color: '#15151A',
										fontSize: 68,
										fontWeight: 1000,
										lineHeight: 1.02,
										letterSpacing: -1.6,
										textTransform: 'uppercase',
										maxWidth: 580,
										textShadow: '0 1px 0 rgba(255,255,255,0.18)',
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>
							</div>

							<div
								style={{
									width: 162,
									flexShrink: 0,
									backgroundColor: '#1B1C22',
									border: '3px solid #C7CCD1',
									borderRadius: 22,
									padding: '14px 12px',
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 10,
									boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.04)',
								}}
							>
								<div
									style={{
										color: '#C7CCD1',
										fontFamily: monoFont,
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
									}}
								>
									trim
								</div>

								<div
									style={{
										width: 92,
										height: 92,
										borderRadius: '50%',
										background:
											'radial-gradient(circle at 35% 30%, #5F6670 0%, #353944 35%, #1B1C22 72%, #111217 100%)',
										border: '3px solid #C7CCD1',
										position: 'relative',
										boxShadow: `0 0 0 6px rgba(20,184,166,0.08), 0 0 24px rgba(255,122,0,${knobGlow})`,
									}}
								>
									{/* knob ticks */}
									{new Array(9).fill(true).map((_, i) => {
										const angle = -120 + i * 30;
										return (
											<div
												key={i}
												style={{
													position: 'absolute',
													left: '50%',
													top: '50%',
													width: 2,
													height: i % 2 === 0 ? 12 : 8,
													backgroundColor: '#C7CCD1',
													transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-46px)`,
													transformOrigin: 'center center',
													opacity: 0.75,
												}}
											/>
										);
									})}

									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: '50%',
											width: 8,
											height: 36,
											borderRadius: 8,
											backgroundColor: '#FF7A00',
											transform: `translate(-50%, -88%) rotate(${knobTurn}deg)`,
											transformOrigin: '50% 88%',
											boxShadow: '0 0 12px rgba(255,122,0,0.45)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: '50%',
											top: '50%',
											width: 16,
											height: 16,
											borderRadius: '50%',
											backgroundColor: '#C7CCD1',
											transform: 'translate(-50%, -50%)',
										}}
									/>
								</div>

								<div
									style={{
										color: '#C7CCD1',
										fontFamily: monoFont,
										fontSize: 11,
										fontWeight: 700,
										letterSpacing: 1.4,
									}}
								>
									-12 0 +12
								</div>
							</div>
						</div>

						{/* center metrics and patch lane */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.18fr 0.82fr',
								gap: 24,
								alignItems: 'stretch',
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* left metric stack */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 18,
									minWidth: 0,
								}}
							>
								<div
									style={{
										backgroundColor: '#15151A',
										border: '3px solid #FF7A00',
										borderRadius: 28,
										padding: '22px 26px',
										boxShadow: '0 10px 26px rgba(255,122,0,0.18)',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'flex-start',
										justifyContent: 'center',
										minHeight: 166,
									}}
								>
									<div
										style={{
											color: '#C7CCD1',
											fontFamily: monoFont,
											fontSize: 16,
											fontWeight: 700,
											letterSpacing: 2.4,
											textTransform: 'uppercase',
											marginBottom: 10,
											opacity: 0.88,
										}}
									>
										output gain
									</div>
									<div
										style={{
											color: '#FF7A00',
											fontSize: 74,
											fontWeight: 1000,
											lineHeight: 0.95,
											letterSpacing: -2,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										{commissionCount}% 
									</div>
									<div
										style={{
											color: '#C7CCD1',
											fontSize: 32,
											fontWeight: 900,
											lineHeight: 1.05,
											letterSpacing: 1.2,
											textTransform: 'uppercase',
											marginTop: 8,
										}}
									>
										COMMISSION
									</div>
								</div>

								<div
									style={{
										backgroundColor: '#1B1C22',
										border: '3px solid #C7CCD1',
										borderRadius: 24,
										padding: '18px 20px 16px',
										display: 'flex',
										flexDirection: 'column',
										gap: 12,
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<div
											style={{
												color: '#C7CCD1',
												fontFamily: monoFont,
												fontSize: 14,
												fontWeight: 700,
												letterSpacing: 2,
												textTransform: 'uppercase',
											}}
										>
											vu left
										</div>
										<div
											style={{
												color: '#14B8A6',
												fontFamily: monoFont,
												fontSize: 14,
												fontWeight: 800,
												letterSpacing: 1.2,
											}}
										>
											{Math.round(vuL * 99)}
										</div>
									</div>
									<div
										style={{
											height: 18,
											backgroundColor: '#0F1014',
											borderRadius: 999,
											border: '2px solid #2D313A',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												height: '100%',
												width: `${vuL * 100}%`,
												borderRadius: 999,
												background:
													'linear-gradient(90deg, #14B8A6 0%, #C7CCD1 58%, #FF7A00 100%)',
											}}
										/>
									</div>

									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											marginTop: 2,
										}}
									>
										<div
											style={{
												color: '#C7CCD1',
												fontFamily: monoFont,
												fontSize: 14,
												fontWeight: 700,
												letterSpacing: 2,
												textTransform: 'uppercase',
											}}
										>
											vu right
										</div>
										<div
											style={{
												color: '#14B8A6',
												fontFamily: monoFont,
												fontSize: 14,
												fontWeight: 800,
												letterSpacing: 1.2,
											}}
										>
											{Math.round(vuR * 99)}
										</div>
									</div>
									<div
										style={{
											height: 18,
											backgroundColor: '#0F1014',
											borderRadius: 999,
											border: '2px solid #2D313A',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												height: '100%',
												width: `${vuR * 100}%`,
												borderRadius: 999,
												background:
													'linear-gradient(90deg, #14B8A6 0%, #C7CCD1 58%, #FF7A00 100%)',
											}}
										/>
									</div>
								</div>
							</div>

							{/* right patch / cable section */}
							<div
								style={{
									backgroundColor: '#1B1C22',
									border: '3px solid #C7CCD1',
									borderRadius: 24,
									padding: '18px 18px 16px',
									position: 'relative',
									overflow: 'hidden',
									minHeight: 264,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										marginBottom: 8,
									}}
								>
									<div
										style={{
											color: '#C7CCD1',
											fontFamily: monoFont,
											fontSize: 14,
											fontWeight: 700,
											letterSpacing: 2,
											textTransform: 'uppercase',
										}}
									>
										patch active
									</div>
									<div
										style={{
											display: 'flex',
											gap: 7,
										}}
									>
										{leds.map((_, i) => {
											const active = i === ledIndex;
											return (
												<div
													key={i}
													style={{
														width: 12,
														height: 12,
														borderRadius: '50%',
														backgroundColor: active ? '#14B8A6' : '#38404A',
														boxShadow: active
															? '0 0 16px rgba(20,184,166,0.8)'
															: 'none',
													}}
												/>
											);
										})}
									</div>
								</div>

								<div
									style={{
										position: 'relative',
										height: 154,
										marginTop: 6,
										marginBottom: 10,
									}}
								>
									{/* left jack */}
									<div
										style={{
											position: 'absolute',
											left: 16,
											top: 46,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: 10,
										}}
									>
										<div
											style={{
												color: '#C7CCD1',
												fontFamily: monoFont,
												fontSize: 12,
												fontWeight: 700,
												letterSpacing: 1.5,
												textTransform: 'uppercase',
											}}
										>
											in
										</div>
										<div
											style={{
												width: 42,
												height: 42,
												borderRadius: '50%',
												backgroundColor: '#0E0F13',
												border: '3px solid #C7CCD1',
												boxShadow: 'inset 0 0 0 7px #2B3038',
											}}
										/>
									</div>

									{/* right jack */}
									<div
										style={{
											position: 'absolute',
											right: 16,
											top: 46,
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: 10,
										}}
									>
										<div
											style={{
												color: '#C7CCD1',
												fontFamily: monoFont,
												fontSize: 12,
												fontWeight: 700,
												letterSpacing: 1.5,
												textTransform: 'uppercase',
											}}
										>
											bus
										</div>
										<div
											style={{
												width: 42,
												height: 42,
												borderRadius: '50%',
												backgroundColor: '#0E0F13',
												border: '3px solid #14B8A6',
												boxShadow: 'inset 0 0 0 7px #203937, 0 0 18px rgba(20,184,166,0.35)',
											}}
										/>
									</div>

									{/* sagging cable */}
									<svg
										width="100%"
										height="154"
										viewBox="0 0 300 154"
										style={{
											position: 'absolute',
											left: 0,
											top: 0,
											overflow: 'visible',
										}}
									>
										<path
											d={`M 54 68 C 110 ${68 + cableSag}, 190 ${68 + cableSag}, 246 68`}
											fill="none"
											stroke="#FF7A00"
											strokeWidth="10"
											strokeLinecap="round"
											opacity={0.95}
										/>
										<path
											d={`M 54 68 C 110 ${68 + cableSag}, 190 ${68 + cableSag}, 246 68`}
											fill="none"
											stroke="rgba(255,255,255,0.18)"
											strokeWidth="3"
											strokeLinecap="round"
										/>
									</svg>

									{/* animated plug approaching right jack */}
									<div
										style={{
											position: 'absolute',
											left: 205 + plugX,
											top: 56,
											width: 44,
											height: 24,
											borderRadius: 8,
											backgroundColor: '#C7CCD1',
											border: '2px solid #15151A',
											transform: `scale(${plugScale})`,
											boxShadow: '0 5px 12px rgba(0,0,0,0.35)',
										}}
									>
										<div
											style={{
												position: 'absolute',
												right: -8,
												top: 5,
												width: 10,
												height: 10,
												borderRadius: 3,
												backgroundColor: '#14B8A6',
											}}
										/>
										<div
											style={{
												position: 'absolute',
												left: 5,
												top: 5,
												width: 12,
												height: 12,
												borderRadius: 3,
												backgroundColor: '#8A9098',
											}}
										/>
									</div>
								</div>

								<div
									style={{
										display: 'grid',
										gridTemplateColumns: '1fr 1fr',
										gap: 10,
									}}
								>
									<div
										style={{
											backgroundColor: '#111217',
											borderRadius: 14,
											padding: '10px 12px',
											border: '2px solid #30343C',
										}}
									>
										<div
											style={{
												color: '#C7CCD1',
												fontFamily: monoFont,
												fontSize: 11,
												fontWeight: 700,
												letterSpacing: 1.4,
												textTransform: 'uppercase',
												opacity: 0.8,
											}}
										>
											src
										</div>
										<div
											style={{
												color: '#FF7A00',
												fontFamily: monoFont,
												fontSize: 16,
												fontWeight: 800,
												letterSpacing: 1.2,
												marginTop: 3,
											}}
										>
											auto
										</div>
									</div>
									<div
										style={{
											backgroundColor: '#111217',
											borderRadius: 14,
											padding: '10px 12px',
											border: '2px solid #30343C',
										}}
									>
										<div
											style={{
												color: '#C7CCD1',
												fontFamily: monoFont,
												fontSize: 11,
												fontWeight: 700,
												letterSpacing: 1.4,
												textTransform: 'uppercase',
												opacity: 0.8,
											}}
										>
											dst
										</div>
										<div
											style={{
												color: '#14B8A6',
												fontFamily: monoFont,
												fontSize: 16,
												fontWeight: 800,
												letterSpacing: 1.2,
												marginTop: 3,
											}}
										>
											margin
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* bottom strip inside card */}
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
									backgroundColor: '#14B8A6',
									color: '#15151A',
									borderRadius: 16,
									padding: '12px 20px',
									fontFamily: monoFont,
									fontSize: 16,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
									flexShrink: 0,
								}}
							>
								engaged
							</div>

							<div
								style={{
									flex: 1,
									height: 20,
									borderRadius: 999,
									backgroundColor: '#1B1C22',
									border: '2px solid #C7CCD1',
									overflow: 'hidden',
									position: 'relative',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										top: 0,
										bottom: 0,
										width: `${interpolate(frame, [14, 64], [18, 88], clamp)}%`,
										background:
											'linear-gradient(90deg, #14B8A6 0%, #C7CCD1 55%, #FF7A00 100%)',
										borderRadius: 999,
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: takeaway */}
				<div
					style={{
						transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FF7A00',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.42)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#15151A',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
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