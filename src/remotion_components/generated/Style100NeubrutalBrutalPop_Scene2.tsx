import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene2() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: hard slap entrance
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 260,
			mass: 0.62,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 12,
			stiffness: 280,
			mass: 0.55,
		},
	});

	const introX = interpolate(frame, [0, 9, 16], [-900, 40, 0], clamp);
	const introRotate = interpolate(frame, [0, 9, 16], [-2.5, 1.8, -1.6], clamp);
	const slapShadowBoost = interpolate(frame, [8, 14, 20], [34, 18, 22], clamp);

	// ------------------------------------------
	// Beat 2: stamp + click + rigid state switch
	// ------------------------------------------
	const stampScale = spring({
		frame: frame - 28,
		fps,
		config: {
			damping: 10,
			stiffness: 300,
			mass: 0.48,
		},
	});

	const stampRotate = interpolate(frame, [28, 36, 46], [-2.5, -1.2, -1.6], clamp);
	const stampOpacity = interpolate(frame, [26, 30, 34], [0, 1, 1], clamp);

	const cursorVisible = frame >= 40 && frame <= 76;
	const cursorX = interpolate(frame, [40, 54], [210, 0], clamp);
	const cursorY = interpolate(frame, [40, 54], [120, 0], clamp);
	const isClicking = frame >= 55 && frame <= 60;

	const revealProgress = interpolate(frame, [56, 68], [0, 1], clamp);
	const frontOpacity = interpolate(frame, [56, 63, 68], [1, 0.25, 0], clamp);
	const backOpacity = interpolate(frame, [60, 65, 69], [0, 0.7, 1], clamp);
	const rigidTilt = interpolate(frame, [56, 61, 68], [-1.4, 2.2, -1.1], clamp);
	const thunkY = isClicking ? 12 : 0;

	// ------------------------------------------
	// Beat 3: alive hold loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.3;
	const edgeJitterX = Math.sin(frame * 0.33) * 1.6;
	const edgeJitterY = Math.cos(frame * 0.28) * 1.4;
	const shadowPulseX = 18 + Math.sin(frame * 0.18) * 4;
	const shadowPulseY = 18 + Math.cos(frame * 0.16) * 4;
	const shineOffset = interpolate((frame + 12) % 60, [0, 60], [-260, 820], clamp);
	const underlineOpacity =
		frame > 84 ? 0.45 + ((Math.floor(frame / 3) % 2) === 0 ? 0.55 : 0.15) : 0.9;
	const exitTwitch = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 8, durationInFrames - 1],
		[0, -8, 10],
		clamp
	);

	const cardScale = entrance + (isClicking ? -0.04 : 0);

	const containerOpacity = interpolate(
		frame,
		[0, 3, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const topText = revealProgress < 0.55 ? 'FREE' : 'HIDDEN';
	const bottomText = revealProgress < 0.55 ? 'PRICE TAG' : 'COST';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity: containerOpacity,
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", Arial, sans-serif',
				color: '#000000',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '34px 18px 26px',
					boxSizing: 'border-box',
					transform: `translateY(${exitTwitch}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
						backgroundColor: '#FF90E8',
						border: '4px solid #000000',
						boxShadow: '8px 8px 0 #23A094',
						borderRadius: 16,
						padding: '12px 24px',
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
							lineHeight: 1,
						}}
					>
						BRUTAL POP ALERT
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
						margin: '20px 0',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							position: 'relative',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transform: `translateX(${introX + edgeJitterX}px) translateY(${hoverY + thunkY + edgeJitterY}px) rotate(${Math.max(
								-2.5,
								Math.min(2.5, introRotate + hoverTilt + rigidTilt)
							)}deg) scale(${cardScale})`,
						}}
					>
						{/* Shadow offset */}
						<div
							style={{
								position: 'absolute',
								width: '92%',
								height: 520,
								backgroundColor: '#23A094',
								border: '4px solid #000000',
								borderRadius: 34,
								transform: `translate(${shadowPulseX}px, ${Math.max(
									12,
									shadowPulseY + slapShadowBoost * 0.2
								)}px) rotate(-0.2deg)`,
							}}
						/>

						{/* Main giant tag */}
						<div
							style={{
								width: '92%',
								minHeight: 520,
								backgroundColor: revealProgress < 0.55 ? '#F1F333' : '#FF90E8',
								border: '6px solid #000000',
								borderRadius: 34,
								boxSizing: 'border-box',
								padding: '34px 34px 30px',
								position: 'relative',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 24,
								overflow: 'hidden',
							}}
						>
							{/* Price tag hole */}
							<div
								style={{
									position: 'absolute',
									top: 24,
									right: 26,
									width: 46,
									height: 46,
									borderRadius: '50%',
									backgroundColor: '#FFF8E7',
									border: '5px solid #000000',
									zIndex: 5,
								}}
							/>

							{/* Tag cut angle */}
							<div
								style={{
									position: 'absolute',
									top: -6,
									right: -6,
									width: 140,
									height: 140,
									backgroundColor: '#FFF8E7',
									clipPath: 'polygon(100% 0, 0 100%, 100% 100%)',
									borderLeft: '6px solid #000000',
									borderBottom: '6px solid #000000',
									zIndex: 4,
								}}
							/>

							{/* Shine sweep */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 120,
									backgroundColor: 'rgba(255,255,255,0.18)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
									zIndex: 2,
								}}
							/>

							{/* Discrete text layout */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 22,
									flex: 1,
									position: 'relative',
									zIndex: 6,
								}}
							>
								<div
									style={{
										backgroundColor: '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 16,
										padding: '10px 20px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											fontSize: 22,
											fontWeight: 900,
											letterSpacing: 2.5,
											textTransform: 'uppercase',
											lineHeight: 1,
										}}
									>
										TOO GOOD TO BE TRUE
									</div>
								</div>

								<div
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 20,
									}}
								>
									<div
										style={{
											fontSize: 84,
											fontWeight: 1000,
											lineHeight: 0.92,
											letterSpacing: -2,
											textTransform: 'uppercase',
											textAlign: 'center',
											opacity: frontOpacity > backOpacity ? 1 : 1,
										}}
									>
										{topText}
									</div>

									<div
										style={{
											backgroundColor: '#23A094',
											border: '5px solid #000000',
											borderRadius: 22,
											padding: '14px 26px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											minWidth: '70%',
										}}
									>
										<div
											style={{
												fontSize: 58,
												fontWeight: 1000,
												lineHeight: 1,
												letterSpacing: -1,
												textTransform: 'uppercase',
												textAlign: 'center',
											}}
										>
											{bottomText}
										</div>
									</div>
								</div>

								<div
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 14,
									}}
								>
									<div
										style={{
											fontSize: 24,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: 2,
											textTransform: 'uppercase',
											textAlign: 'center',
											opacity: backOpacity,
										}}
									>
										NOT REALLY FREE
									</div>

									<div
										style={{
											width: 260,
											height: 8,
											borderRadius: 999,
											backgroundColor: '#000000',
											opacity: backOpacity * underlineOpacity,
										}}
									/>
								</div>
							</div>

							{/* Front-only BETTER? stamp */}
							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: '46%',
									transform: `translate(-50%, -50%) rotate(${stampRotate}deg) scale(${stampScale})`,
									opacity: stampOpacity * frontOpacity,
									zIndex: 9,
									pointerEvents: 'none',
								}}
							>
								<div
									style={{
										backgroundColor: '#FFF8E7',
										border: '6px solid #000000',
										boxShadow: '10px 10px 0 #23A094',
										borderRadius: 18,
										padding: '14px 24px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											fontSize: 56,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: -1,
											textTransform: 'uppercase',
										}}
									>
										BETTER?
									</div>
								</div>
							</div>
						</div>

						{/* Cursor */}
						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									right: '14%',
									top: '18%',
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicking ? 0.82 : 1})`,
									zIndex: 20,
									pointerEvents: 'none',
								}}
							>
								<svg
									width="78"
									height="78"
									viewBox="0 0 24 24"
									fill="#FFF8E7"
									stroke="#000000"
									strokeWidth="2.4"
								>
									<path d="M4 3l7.8 17.9 2.3-7.1 7.1-2.3z" />
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#F1F333',
						border: '4px solid #000000',
						boxShadow: '8px 8px 0 #23A094',
						borderRadius: 18,
						padding: '14px 28px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
							textTransform: 'uppercase',
							lineHeight: 1.1,
						}}
					>
						FREE OFTEN HIDES THE REAL PRICE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}