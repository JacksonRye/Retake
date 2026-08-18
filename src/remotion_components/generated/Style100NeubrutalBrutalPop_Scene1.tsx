import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene1() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: Hard slam entrance with overshoot
	// ------------------------------------------
	const entranceSpring = spring({
		frame,
		fps,
		config: {
			damping: 9,
			stiffness: 280,
			mass: 0.65,
		},
	});

	const badgeSpring = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 10,
			stiffness: 250,
			mass: 0.55,
		},
	});

	const ctaSpring = spring({
		frame: frame - 5,
		fps,
		config: {
			damping: 10,
			stiffness: 240,
			mass: 0.6,
		},
	});

	const slamStartY = interpolate(frame, [0, 7, 13], [420, -24, 0], clamp);
	const slamScale = interpolate(frame, [0, 7, 13], [0.86, 1.04, 1], clamp);

	// ------------------------------------------
	// BEAT 2: Cursor click + label switch
	// ------------------------------------------
	const cursorVisible = frame >= 24 && frame <= 77;
	const cursorX = interpolate(frame, [24, 38], [250, 0], clamp);
	const cursorY = interpolate(frame, [24, 38], [170, 0], clamp);
	const isClicking = frame >= 39 && frame <= 46;

	const labelSwitched = frame >= 42;
	const underlinePunch = spring({
		frame: frame - 42,
		fps,
		config: {
			damping: 12,
			stiffness: 280,
			mass: 0.5,
		},
	});

	// ------------------------------------------
	// BEAT 3: Living loop
	// ------------------------------------------
	const hoverY = frame >= 84 ? Math.sin(frame * 0.12) * 8 : 0;
	const hoverTilt = frame >= 84 ? Math.sin(frame * 0.11) * 2.1 : 0;
	const shadowPulse = frame >= 84 ? Math.round(Math.sin(frame * 0.18) * 2) : 0;
	const shineOffset = interpolate((frame + 10) % 50, [0, 50], [-220, 900], clamp);

	// Physical thunk on click
	const thunkY = isClicking ? 12 : 0;
	const shadowX = isClicking ? 8 : 18 + shadowPulse;
	const shadowY = isClicking ? 8 : 18 + shadowPulse;

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 3, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", Helvetica, Arial, sans-serif',
				opacity,
				color: '#000000',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '86%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '58px 12px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeSpring}) rotate(${Math.sin(frame * 0.08) * 1.2}deg)`,
						backgroundColor: '#F1F333',
						border: '4px solid #000000',
						borderRadius: 18,
						padding: '12px 28px',
						boxShadow: '8px 8px 0 #000000',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						Activation Code
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
						margin: '24px 0',
						transform: `translateY(${slamStartY + hoverY + thunkY}px) scale(${slamScale * entranceSpring}) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* Hard offset shadow */}
					<div
						style={{
							position: 'absolute',
							width: '96%',
							maxWidth: 980,
							minHeight: 530,
							backgroundColor: '#F1F333',
							border: '4px solid #000000',
							borderRadius: 34,
							transform: `translate(${shadowX}px, ${shadowY}px)`,
							boxSizing: 'border-box',
						}}
					/>

					{/* Outer card */}
					<div
						style={{
							width: '96%',
							maxWidth: 980,
							minHeight: 530,
							backgroundColor: '#FFF8E7',
							border: '5px solid #000000',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '22px',
							position: 'relative',
							zIndex: 2,
							display: 'flex',
							alignItems: 'stretch',
							justifyContent: 'center',
						}}
					>
						{/* Pink button face */}
						<div
							style={{
								width: '100%',
								minHeight: 480,
								backgroundColor: '#FF90E8',
								border: '5px solid #000000',
								borderRadius: 28,
								padding: '34px 28px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 24,
								position: 'relative',
								overflow: 'hidden',
								textAlign: 'center',
							}}
						>
							{/* Shine strip - safely decorative, no text crossing due to separate rows and low opacity */}
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

							{/* Top row */}
							<div
								style={{
									backgroundColor: '#23A094',
									border: '4px solid #000000',
									borderRadius: 16,
									padding: '10px 22px',
									boxShadow: '6px 6px 0 #000000',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										fontSize: 20,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
										color: '#000000',
									}}
								>
									All-by-yourself mode
								</div>
							</div>

							{/* Center text zone */}
							<div
								style={{
									flex: 1,
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 24,
									padding: '8px 10px',
									boxSizing: 'border-box',
								}}
							>
								{!labelSwitched ? (
									<>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center',
												gap: 22,
												width: '100%',
											}}
										>
											<div
												style={{
													fontSize: 78,
													fontWeight: 1000,
													lineHeight: 0.92,
													letterSpacing: -2,
													textTransform: 'uppercase',
													color: '#000000',
												}}
											>
												DO EVERYTHING
											</div>
											<div
												style={{
													fontSize: 78,
													fontWeight: 1000,
													lineHeight: 0.92,
													letterSpacing: -2,
													textTransform: 'uppercase',
													color: '#000000',
												}}
											>
												YOURSELF
											</div>
										</div>
									</>
								) : (
									<>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center',
												gap: 20,
												width: '100%',
											}}
										>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'center',
													justifyContent: 'center',
													gap: 12,
												}}
											>
												<div
													style={{
														fontSize: 84,
														fontWeight: 1000,
														lineHeight: 0.9,
														letterSpacing: -2,
														textTransform: 'uppercase',
														color: '#000000',
													}}
												>
													STOP
												</div>

												{/* Underline lives in separate row BELOW text */}
												<div
													style={{
														width: 240,
														height: 16,
														backgroundColor: '#F1F333',
														border: '4px solid #000000',
														borderRadius: 999,
														transform: `scaleX(${underlinePunch})`,
														transformOrigin: 'center',
														boxShadow: '4px 4px 0 #000000',
													}}
												/>
											</div>

											<div
												style={{
													fontSize: 60,
													fontWeight: 1000,
													lineHeight: 0.94,
													letterSpacing: -1.5,
													textTransform: 'uppercase',
													color: '#000000',
												}}
											>
												DOING EVERYTHING
											</div>
										</div>
									</>
								)}
							</div>

							{/* Bottom row */}
							<div
								style={{
									backgroundColor: '#FFF8E7',
									border: '4px solid #000000',
									borderRadius: 16,
									padding: '12px 24px',
									boxShadow: '6px 6px 0 #000000',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										fontSize: 22,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									Click to switch mindset
								</div>
							</div>
						</div>
					</div>

					{/* Cursor */}
					{cursorVisible && (
						<div
							style={{
								position: 'absolute',
								right: '16%',
								bottom: '18%',
								transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicking ? 0.82 : 1}) rotate(-8deg)`,
								zIndex: 20,
								filter: 'drop-shadow(6px 6px 0 #000000)',
								pointerEvents: 'none',
							}}
						>
							<svg
								width="98"
								height="98"
								viewBox="0 0 24 24"
								fill="#FFF8E7"
								stroke="#000000"
								strokeWidth="2.6"
								strokeLinejoin="round"
							>
								<path d="M4 3l7.2 16.8 2.4-6.1 6.4-2.3L4 3z" />
							</svg>
						</div>
					)}
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${ctaSpring}) rotate(${Math.sin(frame * 0.09 + 0.6) * 1.1}deg)`,
						backgroundColor: '#23A094',
						border: '4px solid #000000',
						borderRadius: 20,
						padding: '16px 30px',
						boxShadow: '8px 8px 0 #000000',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2,
							textTransform: 'uppercase',
							textAlign: 'center',
							color: '#000000',
						}}
					>
						Build systems, not stress
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}