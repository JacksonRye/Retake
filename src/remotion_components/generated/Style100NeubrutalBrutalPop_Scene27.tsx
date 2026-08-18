import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene27() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Heavy phone slam with overshoot.
	const phoneEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 250,
			mass: 0.72,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 280,
			mass: 0.55,
		},
	});

	const footerEntrance = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 12,
			stiffness: 230,
			mass: 0.6,
		},
	});

	const entranceY = interpolate(phoneEntrance, [0, 1], [-520, 0]);
	const entranceScale = interpolate(phoneEntrance, [0, 1], [0.78, 1]);

	// Beat 2: Cursor arrives, clicks AUTOMATED, and sharply drops workload.
	const cursorVisible = frame >= 27 && frame <= 76;
	const cursorX = interpolate(frame, [27, 45, 52, 70], [190, 8, 8, 48], clamp);
	const cursorY = interpolate(frame, [27, 45, 52, 70], [150, 8, 8, 42], clamp);
	const clicking = frame >= 46 && frame <= 52;
	const automated = frame >= 51;

	const clickThunk = clicking ? 11 : 0;
	const clickScale = clicking ? 0.965 : 1;

	const wipeProgress = interpolate(frame, [50, 59], [0, 100], clamp);
	const workload = Math.round(
		interpolate(frame, [52, 62], [92, 24], clamp),
	);
	const workloadWidth = interpolate(frame, [52, 62], [92, 24], clamp);

	// Beat 3: Continuous living physics plus hard square status ticks.
	const livingHover = Math.sin(frame * 0.12) * 6;
	const livingTilt = Math.sin(frame * 0.08) * 1.35;

	const squareJumpPattern = [0, -9, -9, 0, 8, 8, 0];
	const squareJump =
		frame >= 84
			? squareJumpPattern[
					Math.floor((frame - 84) / 5) % squareJumpPattern.length
				]
			: 0;

	const statusLabels = ['QUALIFYING', 'BOOKING', 'SCALING'];
	const statusIndex =
		frame >= 84 ? Math.floor((frame - 84) / 12) % statusLabels.length : 0;
	const statusLabel = statusLabels[statusIndex];

	const statusFlash =
		frame >= 84 && (frame - 84) % 12 < 3 ? '#F1F333' : '#23A094';

	const baseShadow = clicking ? 5 : 18;
	const shadowPulse = baseShadow + Math.sin(frame * 0.18) * 4;

	const shineX = interpolate(
		(frame + 16) % 64,
		[0, 64],
		[-240, 760],
		clamp,
	);

	const exitProgress = interpolate(
		frame,
		[durationInFrames - 11, durationInFrames],
		[0, 1],
		clamp,
	);
	const exitY = interpolate(exitProgress, [0, 1], [0, -130]);
	const exitRotation = interpolate(exitProgress, [0, 1], [0, -4]);
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
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				color: '#000000',
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
					transform: `translateY(${exitY}px) rotate(${exitRotation}deg)`,
				}}
			>
				{/* Tier 1: Category pill */}
				<div
					style={{
						flex: '15 1 0',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: 0,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '12px 25px',
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: '7px 7px 0 #000000',
							transform: `translateY(${Math.sin(frame * 0.12) * 3}px) scale(${badgeEntrance})`,
						}}
					>
						<div
							style={{
								width: 13,
								height: 13,
								flexShrink: 0,
								backgroundColor: '#F1F333',
								border: '3px solid #000000',
							}}
						/>
						<div
							style={{
								fontSize: 20,
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

				{/* Tier 2: One phone-shaped workload switch */}
				<div
					style={{
						flex: '65 1 0',
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
							width: 'min(520px, 82vw)',
							height: 'min(760px, 100%)',
							minHeight: 560,
							position: 'relative',
							transform: `
								translateY(${entranceY + livingHover + squareJump + clickThunk}px)
								scale(${entranceScale * clickScale})
								rotate(${livingTilt}deg)
							`,
							transformOrigin: 'center center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								display: 'flex',
								flexDirection: 'column',
								gap: 16,
								padding: '24px',
								boxSizing: 'border-box',
								backgroundColor: '#F1F333',
								border: '7px solid #000000',
								borderRadius: 46,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
								overflow: 'hidden',
							}}
						>
							{/* Traveling shine */}
							<div
								style={{
									position: 'absolute',
									zIndex: 8,
									top: -80,
									bottom: -80,
									left: 0,
									width: 92,
									backgroundColor: 'rgba(255,255,255,0.42)',
									transform: `translateX(${shineX}px) skewX(-19deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Phone speaker */}
							<div
								style={{
									width: 92,
									height: 12,
									flexShrink: 0,
									alignSelf: 'center',
									backgroundColor: '#000000',
									borderRadius: 99,
								}}
							/>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 16,
									flexShrink: 0,
								}}
							>
								<div
									style={{
										fontSize: 22,
										fontWeight: 950,
										letterSpacing: 5,
										lineHeight: 1,
										textDecoration: 'underline',
										textDecorationThickness: 4,
										textUnderlineOffset: 7,
									}}
								>
									WORKLOAD
								</div>

								<div
									style={{
										width: '100%',
										display: 'flex',
										alignItems: 'stretch',
										gap: 8,
										padding: 8,
										boxSizing: 'border-box',
										backgroundColor: '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 16,
										boxShadow: '6px 6px 0 #000000',
									}}
								>
									<div
										style={{
											flex: 1,
											padding: '13px 8px',
											backgroundColor: automated
												? '#FFF8E7'
												: '#FF90E8',
											border: '3px solid #000000',
											borderRadius: 9,
											fontSize: 18,
											fontWeight: 950,
											lineHeight: 1,
											textAlign: 'center',
											textDecoration: automated ? 'none' : 'underline',
											textUnderlineOffset: 4,
										}}
									>
										MANUAL
									</div>

									<div
										style={{
											flex: 1.28,
											padding: '13px 8px',
											backgroundColor: automated
												? '#23A094'
												: '#FFF8E7',
											color: automated ? '#FFFFFF' : '#000000',
											border: '3px solid #000000',
											borderRadius: 9,
											boxShadow: automated ? '4px 4px 0 #000000' : 'none',
											fontSize: 18,
											fontWeight: 950,
											lineHeight: 1,
											textAlign: 'center',
											textDecoration: 'underline',
											textUnderlineOffset: 4,
											transform: clicking
												? 'translate(4px, 4px)'
												: 'translate(0, 0)',
										}}
									>
										AUTOMATED
									</div>
								</div>
							</div>

							{/* Phone screen */}
							<div
								style={{
									flex: 1,
									minHeight: 0,
									position: 'relative',
									backgroundColor: '#FF90E8',
									border: '5px solid #000000',
									borderRadius: 22,
									overflow: 'hidden',
								}}
							>
								{/* Manual state */}
								<div
									style={{
										position: 'absolute',
										inset: 0,
										padding: '28px',
										boxSizing: 'border-box',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
									}}
								>
									<div
										style={{
											fontSize: 56,
											fontWeight: 950,
											lineHeight: 0.95,
											textAlign: 'center',
										}}
									>
										MANUAL
									</div>
									<div
										style={{
											padding: '10px 20px',
											backgroundColor: '#000000',
											color: '#FFF8E7',
											borderRadius: 9,
											fontSize: 19,
											fontWeight: 950,
											letterSpacing: 3,
										}}
									>
										92% LOAD
									</div>
								</div>

								{/* Automated wipe state */}
								<div
									style={{
										position: 'absolute',
										inset: 0,
										padding: '28px',
										boxSizing: 'border-box',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										backgroundColor: '#23A094',
										clipPath: `inset(0 ${100 - wipeProgress}% 0 0)`,
									}}
								>
									<div
										style={{
											padding: '8px 15px',
											backgroundColor: statusFlash,
											border: '3px solid #000000',
											borderRadius: 8,
											boxShadow: '4px 4px 0 #000000',
											fontSize: 15,
											fontWeight: 950,
											letterSpacing: 2.5,
											lineHeight: 1,
										}}
									>
										✓ {statusLabel}
									</div>

									<div
										style={{
											color: '#FFFFFF',
											fontSize: 47,
											fontWeight: 950,
											lineHeight: 0.95,
											textAlign: 'center',
											textShadow: '4px 4px 0 #000000',
										}}
									>
										SETTERS
										<br />+ ADS
									</div>

									<div
										style={{
											width: '100%',
											display: 'flex',
											flexDirection: 'column',
											gap: 10,
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												gap: 16,
												color: '#FFFFFF',
												fontSize: 16,
												fontWeight: 950,
												letterSpacing: 2,
											}}
										>
											<span>WORKLOAD</span>
											<span>{workload}%</span>
										</div>

										<div
											style={{
												width: '100%',
												height: 25,
												backgroundColor: '#FFF8E7',
												border: '4px solid #000000',
												borderRadius: 5,
												overflow: 'hidden',
												boxSizing: 'border-box',
											}}
										>
											<div
												style={{
													width: `${workloadWidth}%`,
													height: '100%',
													backgroundColor: '#F1F333',
													borderRight: '4px solid #000000',
												}}
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Phone home indicator */}
							<div
								style={{
									width: 112,
									height: 12,
									flexShrink: 0,
									alignSelf: 'center',
									backgroundColor: '#000000',
									borderRadius: 99,
								}}
							/>
						</div>

						{/* Cursor click */}
						{cursorVisible ? (
							<div
								style={{
									position: 'absolute',
									zIndex: 30,
									top: 142,
									right: 58,
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${
										clicking ? 0.82 : 1
									})`,
									filter: clicking
										? 'drop-shadow(2px 2px 0 #FF90E8)'
										: 'drop-shadow(7px 7px 0 #FF90E8)',
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
										d="M7 4L48 43L31 45L39 61L28 66L20 49L7 61V4Z"
										fill="#000000"
										stroke="#FFF8E7"
										strokeWidth="5"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						) : null}
					</div>
				</div>

				{/* Tier 3: CTA */}
				<div
					style={{
						flex: '20 1 0',
						width: '100%',
						minHeight: 0,
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
							padding: '15px 28px',
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: `${6 + Math.sin(frame * 0.18) * 2}px ${
								6 + Math.sin(frame * 0.18) * 2
							}px 0 #FF90E8`,
							transform: `translateY(${
								Math.sin(frame * 0.12 + 1.5) * 4
							}px) scale(${footerEntrance})`,
							fontSize: 22,
							fontWeight: 950,
							letterSpacing: 2,
							lineHeight: 1,
							textAlign: 'center',
							textDecoration: 'underline',
							textDecorationThickness: 3,
							textUnderlineOffset: 6,
							whiteSpace: 'nowrap',
						}}
					>
						ACTIVATE AUTOMATION →
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}