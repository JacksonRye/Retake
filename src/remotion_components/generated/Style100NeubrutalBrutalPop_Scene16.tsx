import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene16() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const palette = ['#FFF8E7', '#000000', '#FF90E8', '#F1F333', '#23A094'];
	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snap-in with a hard rotational overshoot.
	const heroEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.55,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 280,
			mass: 0.5,
		},
	});

	const heroRotation = interpolate(
		frame,
		[0, 7, 14, 21, 30],
		[-13, -13, 4, -2, 0],
		clamp,
	);

	const heroX = interpolate(frame, [0, 8, 16], [-120, -120, 0], clamp);

	// Beat 2: cursor strikes RECORD, title types, timer rolls to one minute.
	const cursorVisible = frame >= 25 && frame <= 65;
	const cursorX = interpolate(frame, [25, 38], [145, 0], clamp);
	const cursorY = interpolate(frame, [25, 38], [105, 0], clamp);
	const isClicking = frame >= 39 && frame <= 45;
	const hasRecorded = frame >= 42;

	const typedPhrase = 'TALKING ABOUT LIFE';
	const typedCharacters = Math.floor(
		interpolate(frame, [42, 78], [0, typedPhrase.length], clamp),
	);
	const typedText = typedPhrase.slice(0, typedCharacters);

	const elapsedSeconds = Math.round(
		interpolate(frame, [42, 84], [0, 60], clamp),
	);
	const timerText = `00:${String(elapsedSeconds).padStart(2, '0')}`;

	const clickThunk = isClicking ? 9 : 0;

	// Beat 3: living viewfinder physics, inward ticks, blink, shine and alternating shadow.
	const beat3 = frame >= 84;
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.2;
	const shadowAlternator = beat3
		? Math.floor((frame - 84) / 7) % 2 === 0
			? 1
			: -1
		: 1;
	const shadowPulse = 11 + Math.sin(frame * 0.18) * 3;
	const shadowX = shadowAlternator * shadowPulse;
	const frameInset = beat3
		? 19 + (Math.floor((frame - 84) / 6) % 2) * 7
		: 19;
	const recordingBlink = !beat3 || Math.floor((frame - 84) / 6) % 2 === 0;

	const shineX = interpolate((frame + 18) % 64, [0, 64], [-190, 850], clamp);

	const exitY = interpolate(
		frame,
		[durationInFrames - 8, durationInFrames],
		[0, -55],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 7, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const cornerSize = 38;
	const cornerThickness = 7;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette[0],
				color: palette[1],
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				opacity,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					boxSizing: 'border-box',
					padding: '80px 20px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					transform: `translateY(${exitY}px)`,
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
							gap: 16,
							padding: '10px 24px',
							backgroundColor: palette[2],
							border: `4px solid ${palette[1]}`,
							borderRadius: 14,
							boxShadow: `6px 6px 0 ${palette[1]}`,
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.12) * 3
							}px)`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								backgroundColor: palette[1],
								borderRadius: 2,
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

				{/* Tier 2 — single hero viewfinder */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						maxWidth: 850,
						minHeight: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '100%',
							position: 'relative',
							transform: `translateX(${heroX}px) translateY(${
								hoverY + clickThunk
							}px) rotate(${heroRotation + hoverTilt}deg) scale(${heroEntrance})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								width: '100%',
								aspectRatio: '16 / 10',
								boxSizing: 'border-box',
								position: 'relative',
								overflow: 'hidden',
								backgroundColor: palette[3],
								border: `7px solid ${palette[1]}`,
								borderRadius: 24,
								boxShadow: `${shadowX}px ${shadowPulse}px 0 ${palette[1]}`,
							}}
						>
							{/* Traveling shine */}
							<div
								style={{
									position: 'absolute',
									zIndex: 1,
									top: -50,
									bottom: -50,
									left: 0,
									width: 100,
									backgroundColor: 'rgba(255,255,255,0.45)',
									transform: `translateX(${shineX}px) skewX(-22deg)`,
								}}
							/>

							{/* Recording controls */}
							<div
								style={{
									position: 'absolute',
									zIndex: 4,
									top: 25,
									left: 28,
									right: 28,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 16,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 12,
										padding: '9px 15px',
										backgroundColor: hasRecorded ? palette[2] : palette[0],
										border: `4px solid ${palette[1]}`,
										borderRadius: 10,
										boxShadow: isClicking
											? `2px 2px 0 ${palette[1]}`
											: `5px 5px 0 ${palette[1]}`,
										transform: `translateY(${isClicking ? 3 : 0}px)`,
									}}
								>
									<div
										style={{
											width: 15,
											height: 15,
											backgroundColor: recordingBlink
												? palette[2]
												: palette[1],
											border: `3px solid ${palette[1]}`,
										}}
									/>
									<div
										style={{
											fontSize: 18,
											fontWeight: 950,
											letterSpacing: 2,
											lineHeight: 1,
										}}
									>
										{hasRecorded ? 'RECORDING' : 'RECORD'}
									</div>
								</div>

								<div
									style={{
										minWidth: 108,
										boxSizing: 'border-box',
										padding: '9px 14px',
										backgroundColor: palette[1],
										color: palette[0],
										border: `4px solid ${palette[1]}`,
										borderRadius: 10,
										fontSize: 20,
										fontWeight: 950,
										letterSpacing: 2,
										lineHeight: 1,
										textAlign: 'center',
									}}
								>
									{timerText}
								</div>
							</div>

							{/* Inward-ticking viewfinder frame */}
							<div
								style={{
									position: 'absolute',
									zIndex: 3,
									inset: frameInset,
									transition: 'none',
								}}
							>
								{[
									{top: 0, left: 0, borderTop: true, borderLeft: true},
									{top: 0, right: 0, borderTop: true, borderRight: true},
									{bottom: 0, left: 0, borderBottom: true, borderLeft: true},
									{
										bottom: 0,
										right: 0,
										borderBottom: true,
										borderRight: true,
									},
								].map((corner, index) => (
									<div
										key={index}
										style={{
											position: 'absolute',
											top: corner.top,
											right: corner.right,
											bottom: corner.bottom,
											left: corner.left,
											width: cornerSize,
											height: cornerSize,
											borderTop: corner.borderTop
												? `${cornerThickness}px solid ${palette[1]}`
												: undefined,
											borderRight: corner.borderRight
												? `${cornerThickness}px solid ${palette[1]}`
												: undefined,
											borderBottom: corner.borderBottom
												? `${cornerThickness}px solid ${palette[1]}`
												: undefined,
											borderLeft: corner.borderLeft
												? `${cornerThickness}px solid ${palette[1]}`
												: undefined,
										}}
									/>
								))}
							</div>

							{/* Typed focal message */}
							<div
								style={{
									position: 'absolute',
									zIndex: 4,
									inset: '26% 9% 15%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										minHeight: 112,
										padding: '20px 28px',
										boxSizing: 'border-box',
										backgroundColor: palette[0],
										border: `5px solid ${palette[1]}`,
										borderRadius: 14,
										boxShadow: `8px 8px 0 ${palette[4]}`,
										fontSize: 45,
										fontWeight: 950,
										lineHeight: 1.05,
										letterSpacing: 1,
										textDecoration: 'underline',
										textDecorationThickness: 5,
										textUnderlineOffset: 8,
									}}
								>
									<span>{typedText || '\u00A0'}</span>
									{frame >= 42 && typedCharacters < typedPhrase.length && (
										<span
											style={{
												width: 8,
												height: 48,
												flexShrink: 0,
												backgroundColor: palette[1],
												opacity: Math.floor(frame / 4) % 2 === 0 ? 1 : 0,
											}}
										/>
									)}
								</div>
							</div>
						</div>

						{/* Cursor strike */}
						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									zIndex: 10,
									top: 50,
									left: 185,
									filter: `drop-shadow(4px 5px 0 ${palette[2]})`,
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${
										isClicking ? 0.82 : 1
									})`,
								}}
							>
								<svg
									width="54"
									height="54"
									viewBox="0 0 24 24"
									fill={palette[1]}
									stroke={palette[0]}
									strokeWidth="1.5"
									strokeLinejoin="round"
								>
									<path d="M4 3.5L20.5 11l-7.1 2.3L11 20.5 4 3.5z" />
								</svg>
							</div>
						)}
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
							padding: '13px 28px',
							backgroundColor: palette[1],
							color: palette[0],
							border: `4px solid ${palette[1]}`,
							borderRadius: 14,
							boxShadow: `${
								Math.sin(frame * 0.15) > 0 ? 7 : -7
							}px 7px 0 ${palette[4]}`,
							transform: `translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px) scale(${heroEntrance})`,
						}}
					>
						<div
							style={{
								fontSize: 23,
								fontWeight: 950,
								letterSpacing: 2,
								lineHeight: 1.1,
								textAlign: 'center',
								textDecoration: 'underline',
								textDecorationColor: palette[2],
								textDecorationThickness: 4,
								textUnderlineOffset: 7,
							}}
						>
							SAY IT LIKE YOU LIVE IT
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}