import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene3() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: Hard snap entrance
	// ------------------------------------------
	const cardDrop = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.7,
		},
	});

	const badgePop = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 12,
			stiffness: 240,
			mass: 0.55,
		},
	});

	const ctaPop = spring({
		frame: frame - 6,
		fps,
		config: {
			damping: 12,
			stiffness: 230,
			mass: 0.6,
		},
	});

	const entranceY = interpolate(cardDrop, [0, 1], [-520, 0], clamp);
	const entranceScale = interpolate(cardDrop, [0, 0.75, 1], [0.86, 1.03, 1], clamp);

	// ------------------------------------------
	// BEAT 2: Sequential checklist row slams
	// ------------------------------------------
	const row1In = spring({
		frame: frame - 28,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});
	const row2In = spring({
		frame: frame - 40,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});
	const row3In = spring({
		frame: frame - 52,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});

	const stickerIn = spring({
		frame: frame - 62,
		fps,
		config: {damping: 9, stiffness: 280, mass: 0.6},
	});

	const row1Thunk = frame >= 28 && frame <= 32;
	const row2Thunk = frame >= 40 && frame <= 44;
	const row3Thunk = frame >= 52 && frame <= 56;
	const stickerThunk = frame >= 62 && frame <= 68;

	// ------------------------------------------
	// BEAT 3: Living loop
	// ------------------------------------------
	const hoverY = frame >= 84 ? Math.sin(frame * 0.12) * 8 : 0;
	const panicTilt = frame >= 84 ? Math.sin(frame * 0.11) * 2.2 : 0;
	const shadowPulseX = 18 + (frame >= 84 ? Math.sin(frame * 0.15) * 4 : 0);
	const shadowPulseY = 18 + (frame >= 84 ? Math.cos(frame * 0.17) * 4 : 0);
	const shineOffset = interpolate((frame + 14) % 56, [0, 56], [-220, 780], clamp);

	// Cursor click
	const cursorVisible = frame >= 56 && frame <= 82;
	const cursorX = interpolate(frame, [56, 70], [170, 0], clamp);
	const cursorY = interpolate(frame, [56, 70], [85, 0], clamp);
	const isClicking = frame >= 71 && frame <= 76;

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, 80], clamp);
	const exitScale = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [1, 0.92], clamp);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const baseFont =
		'"Arial Black", "Helvetica Neue", "Arial", "Impact", sans-serif';

	const rowStyle = (
		progress: number,
		thunking: boolean
	): React.CSSProperties => ({
		width: '100%',
		minHeight: 104,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 24,
		padding: '18px 24px',
		boxSizing: 'border-box',
		backgroundColor: '#FFF8E7',
		border: '4px solid #000000',
		borderRadius: 20,
		transform: `translateX(${interpolate(progress, [0, 1], [-180, 0], clamp)}px) scale(${
			interpolate(progress, [0, 0.8, 1], [0.85, 1.04, 1], clamp)
		}) translateY(${thunking ? 8 : 0}px)`,
		opacity: progress,
		boxShadow: thunking ? '4px 4px 0 #000000' : '10px 10px 0 #000000',
	});

	const xStyle = (progress: number): React.CSSProperties => ({
		width: 62,
		height: 62,
		minWidth: 62,
		borderRadius: 14,
		border: '4px solid #000000',
		backgroundColor: '#FF90E8',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transform: `scale(${interpolate(progress, [0, 0.7, 1], [0.5, 1.12, 1], clamp)})`,
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				fontFamily: baseFont,
				opacity,
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 940,
					height: '88%',
					margin: 'auto',
					padding: '56px 12px 40px 12px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					transform: `translateY(${exitY}px) scale(${exitScale})`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#F1F333',
						color: '#000000',
						border: '4px solid #000000',
						borderRadius: 18,
						padding: '12px 28px',
						boxShadow: '8px 8px 0 #000000',
						transform: `scale(${badgePop}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
					}}
				>
					<span
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						Compliance Gap
					</span>
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
						margin: '20px 0',
						transform: `translateY(${entranceY + hoverY}px) scale(${entranceScale}) rotate(${panicTilt}deg)`,
					}}
				>
					{/* Pink brutal shadow */}
					<div
						style={{
							position: 'absolute',
							width: '100%',
							minHeight: 540,
							borderRadius: 34,
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							transform: `translate(${shadowPulseX + (frame < 30 ? 10 : 0)}px, ${
								shadowPulseY + (frame < 30 ? 10 : 0)
							}px)`,
						}}
					/>

					{/* Main hero card */}
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 34,
							position: 'relative',
							overflow: 'hidden',
							padding: '34px 28px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 24,
							zIndex: 2,
						}}
					>
						{/* Traveling scan/glare */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 90,
								backgroundColor: 'rgba(241, 243, 51, 0.22)',
								borderLeft: '4px solid rgba(0,0,0,0.06)',
								borderRight: '4px solid rgba(0,0,0,0.06)',
								transform: `translateX(${shineOffset}px) skewX(-14deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Header */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'flex-start',
								gap: 14,
								position: 'relative',
								zIndex: 3,
							}}
						>
							<div
								style={{
									fontSize: 66,
									fontWeight: 900,
									lineHeight: 0.95,
									color: '#000000',
									textTransform: 'uppercase',
								}}
							>
								CHECKLIST
							</div>

							<div
								style={{
									height: 8,
									width: 230,
									backgroundColor: '#23A094',
									border: '4px solid #000000',
									borderRadius: 999,
								}}
							/>
						</div>

						{/* Rows */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 22,
								position: 'relative',
								zIndex: 3,
							}}
						>
							<div style={rowStyle(row1In, row1Thunk)}>
								<div style={xStyle(row1In)}>
									<span
										style={{
											fontSize: 36,
											fontWeight: 900,
											lineHeight: 1,
											color: '#000000',
										}}
									>
										✕
									</span>
								</div>
								<div
									style={{
										flex: 1,
										color: '#000000',
										fontSize: 56,
										fontWeight: 900,
										lineHeight: 1,
										textTransform: 'uppercase',
									}}
								>
									NO GUIDANCE
								</div>
							</div>

							<div style={rowStyle(row2In, row2Thunk)}>
								<div style={xStyle(row2In)}>
									<span
										style={{
											fontSize: 36,
											fontWeight: 900,
											lineHeight: 1,
											color: '#000000',
										}}
									>
										✕
									</span>
								</div>
								<div
									style={{
										flex: 1,
										color: '#000000',
										fontSize: 56,
										fontWeight: 900,
										lineHeight: 1,
										textTransform: 'uppercase',
									}}
								>
									NO CLARITY
								</div>
							</div>

							<div style={rowStyle(row3In, row3Thunk)}>
								<div style={xStyle(row3In)}>
									<span
										style={{
											fontSize: 36,
											fontWeight: 900,
											lineHeight: 1,
											color: '#000000',
										}}
									>
										✕
									</span>
								</div>
								<div
									style={{
										flex: 1,
										color: '#000000',
										fontSize: 54,
										fontWeight: 900,
										lineHeight: 1,
										textTransform: 'uppercase',
									}}
								>
									NO REASSURANCE
								</div>
							</div>
						</div>

						{/* Bottom space for sticker separation */}
						<div style={{height: 64, position: 'relative', zIndex: 3}} />
					</div>

					{/* Warning sticker - only covers card surface area, never text */}
					<div
						style={{
							position: 'absolute',
							right: 18,
							bottom: 26,
							zIndex: 5,
							transform: `scale(${stickerIn}) rotate(-7deg) translateY(${stickerThunk ? 10 : 0}px)`,
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 18,
							padding: '14px 22px',
							boxShadow: stickerThunk ? '4px 4px 0 #000000' : '10px 10px 0 #000000',
						}}
					>
						<div
							style={{
								color: '#000000',
								fontSize: 26,
								fontWeight: 900,
								lineHeight: 1,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							ALMOST TOO LATE
						</div>
					</div>

					{/* Cursor */}
					{cursorVisible && (
						<div
							style={{
								position: 'absolute',
								right: 48,
								bottom: 56,
								zIndex: 8,
								transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicking ? 0.84 : 1})`,
								pointerEvents: 'none',
							}}
						>
							<svg
								width="68"
								height="68"
								viewBox="0 0 24 24"
								fill="#000000"
								stroke="#FFF8E7"
								strokeWidth="1.5"
							>
								<path d="M4 4l7.07 17 2.51-7.39L21 11.07z" />
							</svg>
						</div>
					)}
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${ctaPop}) translateY(${Math.sin(frame * 0.12 + 0.8) * 3}px)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#23A094',
						color: '#000000',
						border: '4px solid #000000',
						borderRadius: 18,
						padding: '16px 26px',
						boxShadow: '8px 8px 0 #000000',
						textAlign: 'center',
					}}
				>
					<span
						style={{
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 1.2,
							textTransform: 'uppercase',
						}}
					>
						Unchecked risk compounds fast
					</span>
				</div>
			</div>
		</AbsoluteFill>
	);
}