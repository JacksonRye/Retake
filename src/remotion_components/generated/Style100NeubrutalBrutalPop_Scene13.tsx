import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene13() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — exaggerated square crash with spring overshoot.
	const cardSpring = spring({
		frame,
		fps,
		config: {
			damping: 9,
			stiffness: 250,
			mass: 0.65,
		},
	});

	const badgeSpring = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 260,
			mass: 0.55,
		},
	});

	const footerSpring = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 12,
			stiffness: 230,
			mass: 0.55,
		},
	});

	const crashX = interpolate(frame, [0, 8, 14], [620, -30, 0], clamp);
	const crashRotation = interpolate(frame, [0, 8, 15], [14, -4, 0], clamp);

	// Beat 2 — cursor approaches and physically clicks NO.
	const clickStart = 48;
	const clickEnd = 55;
	const transformed = frame >= clickEnd;
	const cursorVisible = frame >= 27 && frame <= 71;

	const cursorX = interpolate(frame, [27, 45], [210, 18], clamp);
	const cursorY = interpolate(frame, [27, 45], [135, 10], clamp);
	const cursorScale =
		frame >= clickStart && frame <= clickEnd ? 0.78 : 1;

	const firstButtonPress =
		frame >= clickStart && frame <= clickEnd ? 10 : 0;

	const fractureKick =
		frame >= clickEnd && frame < 63
			? [0, -15, 12, -8, 5][Math.floor((frame - clickEnd) / 2) % 5]
			: 0;

	const statusScale = transformed
		? spring({
				frame: frame - clickEnd,
				fps,
				config: {
					damping: 8,
					stiffness: 300,
					mass: 0.45,
				},
			})
		: 1;

	// Beat 3 — continuously alive stepped shape and hard-offset physics.
	const beat3 = frame >= 84;
	const jitterIndex = Math.floor(frame / 3) % 4;

	const jitterX = beat3 ? [0, 5, -4, 3][jitterIndex] : 0;
	const jitterY = beat3 ? [2, -3, 4, -2][jitterIndex] : 0;
	const jitterRotation = beat3 ? [0.3, -0.8, 0.65, -0.35][jitterIndex] : 0;

	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.25;

	const shadowSkipX = transformed
		? [12, 18, 9, 15][jitterIndex]
		: 14;
	const shadowSkipY = transformed
		? [16, 10, 19, 13][jitterIndex]
		: 14;
	const shadowPulse = Math.sin(frame * 0.18) * 2.5;

	const rhythmicPress =
		beat3 && Math.floor((frame - 84) / 7) % 2 === 0 ? 8 : 0;
	const buttonPress = Math.max(firstButtonPress, rhythmicPress);
	const buttonShadow = buttonPress > 0 ? 2 : 7;

	const shineOffset = interpolate(
		(frame + 14) % 62,
		[0, 62],
		[-220, 900],
		clamp,
	);

	const outlineVariants = [
		'polygon(0% 0%, 84% 0%, 84% 5%, 100% 5%, 100% 72%, 96% 72%, 96% 100%, 66% 100%, 66% 95%, 31% 95%, 31% 100%, 0% 100%, 0% 31%, 4% 31%, 4% 12%, 0% 12%)',
		'polygon(0% 4%, 18% 4%, 18% 0%, 79% 0%, 79% 6%, 100% 6%, 100% 68%, 95% 68%, 95% 100%, 61% 100%, 61% 96%, 25% 96%, 25% 100%, 0% 100%, 0% 39%, 5% 39%, 5% 15%, 0% 15%)',
		'polygon(0% 0%, 88% 0%, 88% 4%, 100% 4%, 100% 76%, 94% 76%, 94% 96%, 70% 96%, 70% 100%, 35% 100%, 35% 95%, 0% 95%, 0% 34%, 3% 34%, 3% 9%, 0% 9%)',
		'polygon(0% 5%, 24% 5%, 24% 0%, 82% 0%, 82% 7%, 100% 7%, 100% 66%, 97% 66%, 97% 100%, 58% 100%, 58% 94%, 29% 94%, 29% 100%, 0% 100%, 0% 43%, 6% 43%, 6% 18%, 0% 18%)',
	];

	const perfectOutline =
		'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';
	const activeOutline = transformed
		? outlineVariants[jitterIndex]
		: perfectOutline;

	// Diagonal hard snap-out.
	const exitProgress = interpolate(
		frame,
		[durationInFrames - 11, durationInFrames - 1],
		[0, 1],
		clamp,
	);
	const exitX = exitProgress * 920;
	const exitY = exitProgress * -620;
	const exitRotation = exitProgress * 14;

	const contentOpacity = interpolate(
		frame,
		[0, 2, durationInFrames - 2, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp,
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				fontFamily:
					'"Arial Black", "Helvetica Neue", Arial, sans-serif',
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
					opacity: contentOpacity,
					transform: `translate(${exitX}px, ${exitY}px) rotate(${exitRotation}deg)`,
				}}
			>
				{/* Tier 1 — category badge */}
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
							padding: '11px 24px',
							backgroundColor: '#F1F333',
							border: '4px solid #000000',
							boxShadow: '7px 7px 0 #000000',
							color: '#000000',
							transform: `scale(${badgeSpring}) translateY(${
								Math.sin(frame * 0.13) * 2
							}px)`,
						}}
					>
						<span
							style={{
								width: 12,
								height: 12,
								backgroundColor: '#23A094',
								border: '3px solid #000000',
							}}
						/>
						<span
							style={{
								fontSize: 20,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								textTransform: 'uppercase',
							}}
						>
							STATUS CHECK
						</span>
					</div>
				</div>

				{/* Tier 2 — single hero status card */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: 'min(760px, 92%)',
							height: 330,
							position: 'relative',
							transform: `
								translateX(${crashX + fractureKick + jitterX}px)
								translateY(${hoverY + jitterY}px)
								rotate(${crashRotation + hoverTilt + jitterRotation}deg)
								scale(${cardSpring})
							`,
							transformOrigin: 'center',
						}}
					>
						{/* Hard-skipping shadow */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundColor: '#000000',
								clipPath: activeOutline,
								transform: `translate(
									${shadowSkipX + shadowPulse}px,
									${shadowSkipY + shadowPulse}px
								)`,
							}}
						/>

						{/* Black stepped shell */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundColor: '#000000',
								clipPath: activeOutline,
								overflow: 'hidden',
							}}
						>
							{/* Pink inner face */}
							<div
								style={{
									position: 'absolute',
									inset: 7,
									backgroundColor: '#FF90E8',
									clipPath: activeOutline,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									overflow: 'hidden',
								}}
							>
								{/* Continuous traveling shine */}
								<div
									style={{
										position: 'absolute',
										top: -80,
										bottom: -80,
										left: 0,
										width: 100,
										backgroundColor: 'rgba(255,248,231,0.48)',
										transform: `translateX(${shineOffset}px) rotate(18deg)`,
										pointerEvents: 'none',
									}}
								/>

								<div
									style={{
										position: 'relative',
										zIndex: 2,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										transform: `scale(${statusScale})`,
									}}
								>
									<div
										style={{
											color: '#000000',
											fontSize: transformed ? 61 : 78,
											fontWeight: 950,
											lineHeight: 0.95,
											letterSpacing: transformed ? -1 : 2,
											textAlign: 'center',
											textTransform: 'uppercase',
										}}
									>
										{transformed ? 'STILL WORKING' : 'PERFECT?'}
									</div>

									<div
										style={{
											color: '#000000',
											fontSize: 18,
											fontWeight: 900,
											letterSpacing: 2,
											textTransform: 'uppercase',
											textDecoration: 'underline',
											textDecorationThickness: 3,
											textUnderlineOffset: 5,
										}}
									>
										{transformed
											? 'IMPERFECT. ACTIVE. HONEST.'
											: 'IS EVERYTHING FINISHED?'}
									</div>
								</div>

								{/* NO button remains part of the single hero card */}
								<div
									style={{
										position: 'absolute',
										right: 35,
										bottom: 30 + buttonPress,
										zIndex: 4,
										minWidth: 112,
										padding: '12px 22px',
										boxSizing: 'border-box',
										backgroundColor: '#F1F333',
										border: '4px solid #000000',
										boxShadow: `${buttonShadow}px ${buttonShadow}px 0 #000000`,
										color: '#000000',
										fontSize: 24,
										fontWeight: 950,
										letterSpacing: 3,
										lineHeight: 1,
										textAlign: 'center',
										textDecoration: 'underline',
										textDecorationThickness: 4,
										textUnderlineOffset: 4,
										transform: `rotate(${
											beat3 ? [0, -2, 2, -1][jitterIndex] : 0
										}deg)`,
									}}
								>
									NO
								</div>
							</div>
						</div>

						{/* Cursor click */}
						{cursorVisible ? (
							<div
								style={{
									position: 'absolute',
									right: 8,
									bottom: 5,
									zIndex: 20,
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
									filter: 'drop-shadow(5px 6px 0 #23A094)',
									pointerEvents: 'none',
								}}
							>
								<svg
									width="58"
									height="66"
									viewBox="0 0 42 48"
									fill="none"
								>
									<path
										d="M4 3L37 27L23 30L18 44L4 3Z"
										fill="#000000"
										stroke="#FFF8E7"
										strokeWidth="3"
										strokeLinejoin="miter"
									/>
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
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '15px 30px',
							backgroundColor: '#23A094',
							border: '4px solid #000000',
							boxShadow: `${
								6 + Math.sin(frame * 0.18) * 2
							}px ${6 + Math.sin(frame * 0.18) * 2}px 0 #000000`,
							color: '#FFF8E7',
							transform: `scale(${footerSpring}) translateY(${
								Math.sin(frame * 0.12 + 1.4) * 3
							}px) rotate(${Math.sin(frame * 0.08) * 0.5}deg)`,
						}}
					>
						<span
							style={{
								fontSize: 23,
								fontWeight: 950,
								letterSpacing: 2,
								lineHeight: 1,
								textAlign: 'center',
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationThickness: 3,
								textUnderlineOffset: 5,
							}}
						>
							WORKING BEATS PERFECT
						</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}