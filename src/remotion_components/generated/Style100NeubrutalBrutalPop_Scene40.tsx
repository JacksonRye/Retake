import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene40() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: hard snap entrance with a 115% overshoot.
	const heroScale = interpolate(
		frame,
		[0, 3, 10, 17, 30],
		[0.72, 0.72, 1.15, 0.97, 1],
		clamp,
	);
	const heroEntranceY = interpolate(frame, [0, 3, 10, 18], [90, 90, -12, 0], clamp);
	const badgeScale = interpolate(
		frame,
		[2, 6, 12, 18],
		[0, 1.12, 0.96, 1],
		clamp,
	);
	const footerScale = interpolate(
		frame,
		[8, 13, 20, 27],
		[0, 1.1, 0.97, 1],
		clamp,
	);

	// Beat 2: cursor click, physical thunk, charge surge and sticker slap.
	const cursorVisible = frame >= 25 && frame <= 72;
	const cursorX = interpolate(frame, [25, 39, 44], [260, 18, 0], clamp);
	const cursorY = interpolate(frame, [25, 39, 44], [180, 20, 0], clamp);
	const isClicking = frame >= 43 && frame <= 49;
	const clickCompression = isClicking ? 0.86 : 1;
	const clickThunk = isClicking ? 9 : 0;

	const charge = Math.round(interpolate(frame, [46, 78], [0, 100], clamp));
	const activeBlocks = Math.ceil(charge / 10);

	const stickerSpring = spring({
		frame: frame - 60,
		fps,
		config: {
			damping: 8,
			stiffness: 320,
			mass: 0.45,
		},
	});
	const stickerScale = Math.min(1.18, stickerSpring);
	const stickerRotation = interpolate(stickerSpring, [0, 1], [-17, -5], clamp);

	// Beat 3: continuously living physics.
	const livingAmount = interpolate(frame, [80, 88], [0, 1], clamp);
	const hoverY = Math.sin(frame * 0.12) * 6 * livingAmount;
	const hoverTilt = Math.sin(frame * 0.08) * 1.4 * livingAmount;
	const heartbeat = frame >= 80 ? Math.pow(Math.max(0, Math.sin(frame * 0.23)), 8) : 0;
	const shadowDepth = 14 + Math.sin(frame * 0.18) * 3 + heartbeat * 8;
	const blockRunner = frame >= 80 ? Math.floor((frame - 80) / 3) % 10 : -1;
	const shineX = interpolate((frame + 12) % 58, [0, 58], [-190, 880], clamp);

	const exitY = interpolate(
		frame,
		[durationInFrames - 9, durationInFrames],
		[0, -70],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 3, durationInFrames - 7, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const buttonShadow = isClicking ? 2 : 7;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				color: '#000000',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, system-ui, sans-serif',
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
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 — top 15% */}
				<div
					style={{
						width: '100%',
						height: '15%',
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
							borderRadius: 999,
							boxShadow: '6px 6px 0 #000000',
							transform: `scale(${badgeScale}) translateY(${
								Math.sin(frame * 0.12) * 2
							}px)`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: '50%',
								backgroundColor: '#23A094',
								border: '2px solid #000000',
							}}
						/>
						<div
							style={{
								fontSize: 21,
								fontWeight: 950,
								letterSpacing: 3.5,
								lineHeight: 1,
								textTransform: 'uppercase',
							}}
						>
							Motivation
						</div>
					</div>
				</div>

				{/* Tier 2 — center 65% */}
				<div
					style={{
						width: '100%',
						height: '65%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							position: 'relative',
							width: '88%',
							maxWidth: 840,
							transform: `translateY(${heroEntranceY + hoverY + clickThunk}px) scale(${heroScale}) rotate(${hoverTilt}deg)`,
							transformOrigin: 'center center',
						}}
					>
						{/* One hero battery-card */}
						<div
							style={{
								position: 'relative',
								width: '100%',
								minHeight: 430,
								padding: '46px 48px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								backgroundColor: '#23A094',
								border: '7px solid #000000',
								borderRadius: 30,
								boxShadow: `${shadowDepth}px ${shadowDepth}px 0 #000000`,
								overflow: 'hidden',
							}}
						>
							{/* Continuous yellow highlight sweep */}
							<div
								style={{
									position: 'absolute',
									top: -50,
									bottom: -50,
									left: 0,
									width: 115,
									backgroundColor: 'rgba(241, 243, 51, 0.72)',
									borderLeft: '4px solid rgba(0, 0, 0, 0.16)',
									borderRight: '4px solid rgba(0, 0, 0, 0.16)',
									transform: `translateX(${shineX}px) skewX(-17deg)`,
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
									gap: 16,
									width: '100%',
								}}
							>
								<div
									style={{
										fontSize: 27,
										fontWeight: 950,
										letterSpacing: 5,
										lineHeight: 1,
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 4,
										textUnderlineOffset: 7,
									}}
								>
									Energy Level
								</div>

								<div
									style={{
										fontSize: 91,
										fontWeight: 950,
										letterSpacing: -3,
										lineHeight: 0.95,
										fontVariantNumeric: 'tabular-nums',
									}}
								>
									{charge}%
								</div>

								<div
									style={{
										width: '100%',
										padding: 10,
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'stretch',
										gap: 8,
										backgroundColor: '#FFF8E7',
										border: '5px solid #000000',
										borderRadius: 16,
									}}
								>
									{Array.from({length: 10}).map((_, index) => {
										const isFilled = index < activeBlocks;
										const isRunning = index === blockRunner;

										return (
											<div
												key={index}
												style={{
													flex: 1,
													height: 66,
													backgroundColor: isRunning
														? '#F1F333'
														: isFilled
															? '#FF90E8'
															: '#FFF8E7',
													border: '3px solid #000000',
													transform: isRunning
														? 'translateY(-5px) scaleY(1.1)'
														: 'translateY(0) scaleY(1)',
													boxShadow: isRunning
														? '3px 5px 0 #000000'
														: 'none',
												}}
											/>
										);
									})}
								</div>

								<div
									style={{
										position: 'relative',
										marginTop: 8,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										minWidth: 270,
										padding: '14px 34px',
										boxSizing: 'border-box',
										backgroundColor: '#F1F333',
										border: '5px solid #000000',
										borderRadius: 14,
										boxShadow: `${buttonShadow}px ${buttonShadow}px 0 #000000`,
										transform: `translate(${isClicking ? 5 : 0}px, ${
											isClicking ? 5 : 0
										}px) scale(${clickCompression})`,
									}}
								>
									<span
										style={{
											fontSize: 27,
											fontWeight: 950,
											letterSpacing: 4,
											lineHeight: 1,
											textTransform: 'uppercase',
											textDecoration: 'underline',
											textDecorationThickness: 4,
											textUnderlineOffset: 5,
										}}
									>
										Charge
									</span>
								</div>
							</div>

							{/* Pink sticker slap */}
							{frame >= 58 && (
								<div
									style={{
										position: 'absolute',
										zIndex: 10,
										top: 31,
										right: 25,
										padding: '13px 24px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										backgroundColor: '#FF90E8',
										border: '5px solid #000000',
										borderRadius: 10,
										boxShadow: '7px 7px 0 #000000',
										transform: `scale(${stickerScale}) rotate(${stickerRotation}deg)`,
										transformOrigin: 'center',
									}}
								>
									<span
										style={{
											fontSize: 25,
											fontWeight: 950,
											letterSpacing: 2.5,
											lineHeight: 1,
											whiteSpace: 'nowrap',
											textTransform: 'uppercase',
										}}
									>
										Keep Going!
									</span>
								</div>
							)}
						</div>

						{/* Giant click cursor */}
						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									zIndex: 30,
									right: 108,
									bottom: 28,
									width: 92,
									height: 110,
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${clickCompression})`,
									filter: isClicking
										? 'drop-shadow(2px 3px 0 #FF90E8)'
										: 'drop-shadow(8px 10px 0 #FF90E8)',
									pointerEvents: 'none',
								}}
							>
								<svg
									width="92"
									height="110"
									viewBox="0 0 92 110"
									fill="none"
								>
									<path
										d="M10 7L78 65L51 70L67 99L49 106L34 75L14 94L10 7Z"
										fill="#000000"
										stroke="#FFF8E7"
										strokeWidth="6"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Tier 3 — bottom 20% */}
				<div
					style={{
						width: '100%',
						height: '20%',
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
							padding: '16px 32px',
							backgroundColor: '#000000',
							border: '4px solid #000000',
							borderRadius: 16,
							boxShadow: '7px 7px 0 #FF90E8',
							transform: `scale(${footerScale}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						<div
							style={{
								color: '#FFF8E7',
								fontSize: 24,
								fontWeight: 950,
								letterSpacing: 2.5,
								lineHeight: 1,
								textAlign: 'center',
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationColor: '#F1F333',
								textDecorationThickness: 4,
								textUnderlineOffset: 7,
							}}
						>
							Full power. No excuses.
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}