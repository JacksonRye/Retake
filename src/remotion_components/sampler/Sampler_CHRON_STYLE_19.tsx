import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_19() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const cardIn = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.6},
	});

	// Beat 2: Progress fill / state activity
	const progressFill = interpolate(frame, [18, 72], [0, 1], clamp);
	const progressWidth = `${progressFill * 100}%`;

	const rippleActive = frame >= 36 && frame <= 56;
	const rippleProgress = interpolate(frame, [36, 56], [0, 1], clamp);

	const dragOutlineVisible = frame >= 20 && frame <= 62;
	const dragX = interpolate(frame, [20, 44], [-80, 0], clamp);
	const dragY = interpolate(frame, [20, 44], [-54, 0], clamp);

	const clickerVisible = frame >= 28 && frame <= 60;
	const clickerX = interpolate(frame, [28, 46], [120, 0], clamp);
	const clickerY = interpolate(frame, [28, 46], [90, 0], clamp);
	const clickDown = frame >= 46 && frame <= 50;

	// Beat 3: Living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 14 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 15) % 70, [0, 70], [-220, 980], clamp);

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

	const windowOffset1 = interpolate(frame, [0, 16], [-120, 0], clamp);
	const windowOffset2 = interpolate(frame, [4, 20], [-90, 0], clamp);
	const windowOffset3 = interpolate(frame, [8, 24], [-60, 0], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#008080',
				opacity,
				fontFamily:
					'"MS Sans Serif", "Tahoma", "Geneva", "Verdana", sans-serif',
				color: '#C0C0C0',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '95%',
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '34px 18px 26px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
					position: 'relative',
				}}
			>
				{/* background cascade windows */}
				<div
					style={{
						position: 'absolute',
						top: 92 + windowOffset1,
						left: 58,
						width: 250,
						height: 138,
						backgroundColor: '#C0C0C0',
						borderTop: '3px solid #FFFFFF',
						borderLeft: '3px solid #FFFFFF',
						borderRight: '3px solid #1B1B1B',
						borderBottom: '3px solid #1B1B1B',
						boxShadow: '8px 8px 0 rgba(0,0,0,0.18)',
						opacity: 0.5,
					}}
				>
					<div
						style={{
							height: 24,
							backgroundColor: '#000080',
							display: 'flex',
							alignItems: 'center',
							paddingLeft: 10,
							boxSizing: 'border-box',
							color: '#FFFFFF',
							fontSize: 12,
							fontWeight: 700,
						}}
					>
						SYSTEM
					</div>
				</div>

				<div
					style={{
						position: 'absolute',
						top: 136 + windowOffset2,
						right: 78,
						width: 230,
						height: 124,
						backgroundColor: '#C0C0C0',
						borderTop: '3px solid #FFFFFF',
						borderLeft: '3px solid #FFFFFF',
						borderRight: '3px solid #1B1B1B',
						borderBottom: '3px solid #1B1B1B',
						boxShadow: '8px 8px 0 rgba(0,0,0,0.18)',
						opacity: 0.5,
					}}
				>
					<div
						style={{
							height: 24,
							backgroundColor: '#000080',
							display: 'flex',
							alignItems: 'center',
							paddingLeft: 10,
							boxSizing: 'border-box',
							color: '#FFFFFF',
							fontSize: 12,
							fontWeight: 700,
						}}
					>
						TOOLS
					</div>
				</div>

				<div
					style={{
						position: 'absolute',
						bottom: 120 + windowOffset3,
						left: 116,
						width: 210,
						height: 110,
						backgroundColor: '#C0C0C0',
						borderTop: '3px solid #FFFFFF',
						borderLeft: '3px solid #FFFFFF',
						borderRight: '3px solid #1B1B1B',
						borderBottom: '3px solid #1B1B1B',
						boxShadow: '8px 8px 0 rgba(0,0,0,0.18)',
						opacity: 0.45,
					}}
				>
					<div
						style={{
							height: 24,
							backgroundColor: '#000080',
							display: 'flex',
							alignItems: 'center',
							paddingLeft: 10,
							boxSizing: 'border-box',
							color: '#FFFFFF',
							fontSize: 12,
							fontWeight: 700,
						}}
					>
						QUEUE
					</div>
				</div>

				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#C0C0C0',
						borderTop: '3px solid #FFFFFF',
						borderLeft: '3px solid #FFFFFF',
						borderRight: '3px solid #1B1B1B',
						borderBottom: '3px solid #1B1B1B',
						boxShadow: '6px 6px 0 rgba(0,0,0,0.22)',
						padding: '10px 22px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						zIndex: 10,
					}}
				>
					<div
						style={{
							width: 14,
							height: 14,
							backgroundColor: '#000080',
							borderTop: '2px solid #FFFFFF',
							borderLeft: '2px solid #FFFFFF',
							borderRight: '2px solid #1B1B1B',
							borderBottom: '2px solid #1B1B1B',
							boxSizing: 'border-box',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 800,
							letterSpacing: 1.5,
							color: '#1B1B1B',
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						ACTIVATION CODE
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
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						zIndex: 20,
					}}
				>
					<div
						style={{
							width: '94%',
							minHeight: 540,
							backgroundColor: '#C0C0C0',
							borderTop: '4px solid #FFFFFF',
							borderLeft: '4px solid #FFFFFF',
							borderRight: '4px solid #1B1B1B',
							borderBottom: '4px solid #1B1B1B',
							boxShadow: `0 ${shadowPulse}px 28px rgba(0,0,0,0.34)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '0',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<div
							style={{
								height: 42,
								backgroundColor: '#000080',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '0 14px',
								boxSizing: 'border-box',
								position: 'relative',
								zIndex: 3,
							}}
						>
							<div
								style={{
									color: '#FFFFFF',
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 0.8,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								Margin Engine
							</div>
							<div style={{display: 'flex', gap: 6}}>
								{['_', '□', '×'].map((symbol, i) => (
									<div
										key={i}
										style={{
											width: 24,
											height: 20,
											backgroundColor: '#C0C0C0',
											borderTop: '2px solid #FFFFFF',
											borderLeft: '2px solid #FFFFFF',
											borderRight: '2px solid #1B1B1B',
											borderBottom: '2px solid #1B1B1B',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: '#1B1B1B',
											fontSize: 12,
											fontWeight: 900,
											lineHeight: 1,
										}}
									>
										{symbol}
									</div>
								))}
							</div>
						</div>

						<div
							style={{
								position: 'absolute',
								top: 42,
								bottom: 0,
								width: 100,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
								zIndex: 1,
							}}
						/>

						<div
							style={{
								padding: '34px 34px 30px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								flex: 1,
								position: 'relative',
								zIndex: 2,
								textAlign: 'center',
							}}
						>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									fontSize: 16,
									fontWeight: 700,
									color: '#1B1B1B',
									textTransform: 'uppercase',
									marginBottom: 14,
								}}
							>
								<div>Status: Active</div>
								<div>Mode: Auto</div>
							</div>

							<div
								style={{
									color: '#1B1B1B',
									fontSize: 72,
									fontWeight: 900,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textTransform: 'uppercase',
									maxWidth: '88%',
									marginBottom: 26,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									width: '86%',
									backgroundColor: '#1B1B1B',
									borderTop: '4px solid #1B1B1B',
									borderLeft: '4px solid #1B1B1B',
									borderRight: '4px solid #FFFFFF',
									borderBottom: '4px solid #FFFFFF',
									padding: '24px 22px 22px',
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 18,
									position: 'relative',
									marginBottom: 24,
								}}
							>
								<div
									style={{
										color: '#FFFFFF',
										fontSize: 58,
										fontWeight: 900,
										lineHeight: 1.02,
										letterSpacing: 0.5,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									50% COMMISSION
								</div>

								<div
									style={{
										width: '100%',
										display: 'flex',
										flexDirection: 'column',
										gap: 8,
									}}
								>
									<div
										style={{
											color: '#C0C0C0',
											fontSize: 16,
											fontWeight: 800,
											letterSpacing: 1,
											textTransform: 'uppercase',
											textAlign: 'left',
										}}
									>
										Processing
									</div>
									<div
										style={{
											width: '100%',
											height: 28,
											backgroundColor: '#C0C0C0',
											borderTop: '3px solid #1B1B1B',
											borderLeft: '3px solid #1B1B1B',
											borderRight: '3px solid #FFFFFF',
											borderBottom: '3px solid #FFFFFF',
											padding: 3,
											boxSizing: 'border-box',
											position: 'relative',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												width: progressWidth,
												height: '100%',
												backgroundColor: '#000080',
											}}
										/>
									</div>
								</div>

								{rippleActive && (
									<div
										style={{
											position: 'absolute',
											right: 34,
											top: 28,
											width: 30 + rippleProgress * 80,
											height: 30 + rippleProgress * 80,
											border: `3px solid rgba(255,255,255,${1 - rippleProgress})`,
											borderRadius: '50%',
											transform: 'translate(50%, -10%)',
											pointerEvents: 'none',
										}}
									/>
								)}
							</div>

							<div
								style={{
									backgroundColor: '#FFFFFF',
									color: '#000080',
									borderTop: '3px solid #FFFFFF',
									borderLeft: '3px solid #FFFFFF',
									borderRight: '3px solid #1B1B1B',
									borderBottom: '3px solid #1B1B1B',
									padding: '12px 22px',
									fontSize: 20,
									fontWeight: 900,
									letterSpacing: 1.2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								Revenue Stream Locked
							</div>
						</div>

						{dragOutlineVisible && (
							<div
								style={{
									position: 'absolute',
									top: 88 + dragY,
									left: 72 + dragX,
									width: 240,
									height: 120,
									border: '3px dashed #000080',
									backgroundColor: 'rgba(255,255,255,0.08)',
									pointerEvents: 'none',
									zIndex: 4,
								}}
							/>
						)}

						{clickerVisible && (
							<div
								style={{
									position: 'absolute',
									right: 92,
									bottom: 118,
									transform: `translate(${clickerX}px, ${clickerY}px) scale(${
										clickDown ? 0.85 : 1
									})`,
									zIndex: 5,
									pointerEvents: 'none',
								}}
							>
								<svg
									width="56"
									height="56"
									viewBox="0 0 24 24"
									fill="#FFFFFF"
									stroke="#1B1B1B"
									strokeWidth="1.5"
								>
									<path d="M4 3l7.5 16.5 2.2-6.3 6.3-2.2z" />
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#C0C0C0',
						borderTop: '3px solid #FFFFFF',
						borderLeft: '3px solid #FFFFFF',
						borderRight: '3px solid #1B1B1B',
						borderBottom: '3px solid #1B1B1B',
						boxShadow: '6px 6px 0 rgba(0,0,0,0.22)',
						padding: '14px 28px',
						textAlign: 'center',
						zIndex: 10,
					}}
				>
					<div
						style={{
							color: '#000080',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 1.4,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}