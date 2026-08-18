import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_48() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance
	// ------------------------------------------
	const boardEntrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 180, mass: 0.8},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.65},
	});

	const cardEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 13, stiffness: 200, mass: 0.8},
	});

	const takeawayEntrance = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 190, mass: 0.75},
	});

	// ------------------------------------------
	// Beat 2: Active state switch / development
	// ------------------------------------------
	const metricReveal = spring({
		frame: frame - 18,
		fps,
		config: {damping: 12, stiffness: 170, mass: 0.8},
	});

	const photoDevelop = interpolate(frame, [16, 38], [0.15, 1], clamp);
	const photoBrightness = interpolate(frame, [16, 38], [1.6, 1], clamp);
	const stringProgress1 = interpolate(frame, [10, 28], [0, 1], clamp);
	const stringProgress2 = interpolate(frame, [24, 42], [0, 1], clamp);
	const pinPush = frame >= 28 && frame <= 36 ? Math.sin((frame - 28) * 0.8) * 6 : 0;

	// ------------------------------------------
	// Beat 3: Living motion
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const boardPanX = Math.sin(frame * 0.04) * 10;
	const noteBob = Math.sin(frame * 0.09 + 0.6) * 5;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-260, 900], clamp);

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// String paths are deliberately routed in the top half only,
	// away from all text blocks for zero-collision safety.
	const p1Start = {x: 120, y: 110};
	const p1End = {x: 305, y: 205};

	const p2Start = {x: 690, y: 120};
	const p2End = {x: 540, y: 208};

	const line1X2 = p1Start.x + (p1End.x - p1Start.x) * stringProgress1;
	const line1Y2 = p1Start.y + (p1End.y - p1Start.y) * stringProgress1;

	const line2X2 = p2Start.x + (p2End.x - p2Start.x) * stringProgress2;
	const line2Y2 = p2Start.y + (p2End.y - p2Start.y) * stringProgress2;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#B08D57',
				fontFamily:
					'"Comic Sans MS", "Marker Felt", "Bradley Hand", "Arial Black", sans-serif',
				opacity,
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
					padding: '56px 18px 34px',
					boxSizing: 'border-box',
					transform: `translateX(${boardPanX}px) translateY(${exitSlide}px) scale(${boardEntrance})`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px) rotate(-1.2deg)`,
						backgroundColor: '#2B2B2B',
						border: '3px solid #F5F2EA',
						borderRadius: 14,
						padding: '12px 26px',
						boxShadow: '0 10px 22px rgba(0,0,0,0.28)',
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
							backgroundColor: '#C1121F',
							boxShadow: `0 ${2 + pinPush * 0.12}px 0 #7A0C14`,
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F5F2EA',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						RED STRING LOGIC
					</div>
				</div>

				{/* Tier 2: Massive hero board */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#2B2B2B',
							border: '4px solid #F5F2EA',
							borderRadius: 30,
							boxShadow: '0 22px 40px rgba(0,0,0,0.32)',
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* Cork grain hints */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundImage:
									'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
								backgroundSize: '16px 16px',
								opacity: 0.18,
								pointerEvents: 'none',
							}}
						/>

						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.11), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Safe decorative string layer in upper area only */}
						<svg
							width="100%"
							height="240"
							viewBox="0 0 900 240"
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								pointerEvents: 'none',
								overflow: 'visible',
							}}
						>
							<line
								x1={p1Start.x}
								y1={p1Start.y}
								x2={line1X2}
								y2={line1Y2}
								stroke="#C1121F"
								strokeWidth="5"
								strokeLinecap="round"
							/>
							<line
								x1={p2Start.x}
								y1={p2Start.y}
								x2={line2X2}
								y2={line2Y2}
								stroke="#C1121F"
								strokeWidth="5"
								strokeLinecap="round"
							/>

							<circle
								cx={p1Start.x}
								cy={p1Start.y + pinPush * 0.2}
								r="11"
								fill="#FFD966"
								stroke="#F5F2EA"
								strokeWidth="3"
							/>
							<circle
								cx={p1End.x}
								cy={p1End.y}
								r="10"
								fill="#FFD966"
								stroke="#F5F2EA"
								strokeWidth="3"
							/>
							<circle
								cx={p2Start.x}
								cy={p2Start.y}
								r="11"
								fill="#FFD966"
								stroke="#F5F2EA"
								strokeWidth="3"
							/>
							<circle
								cx={p2End.x}
								cy={p2End.y}
								r="10"
								fill="#FFD966"
								stroke="#F5F2EA"
								strokeWidth="3"
							/>
						</svg>

						{/* Top evidence scraps - positioned away from central text */}
						<div
							style={{
								position: 'absolute',
								top: 52,
								left: 52,
								width: 210,
								padding: '16px 14px',
								backgroundColor: '#F5F2EA',
								borderRadius: 8,
								boxShadow: '0 8px 18px rgba(0,0,0,0.25)',
								transform: `rotate(-5deg) translateY(${noteBob}px)`,
								display: 'flex',
								flexDirection: 'column',
								gap: 8,
							}}
						>
							<div
								style={{
									backgroundColor: '#2B2B2B',
									color: '#F5F2EA',
									fontSize: 16,
									fontWeight: 900,
									padding: '6px 10px',
									borderRadius: 6,
									letterSpacing: 1.5,
									textTransform: 'uppercase',
									alignSelf: 'flex-start',
								}}
							>
								Lead
							</div>
							<div
								style={{
									color: '#2B2B2B',
									fontSize: 24,
									fontWeight: 900,
									letterSpacing: 1,
								}}
							>
								click → code
							</div>
						</div>

						<div
							style={{
								position: 'absolute',
								top: 58,
								right: 56,
								width: 210,
								padding: '16px 14px',
								backgroundColor: '#F5F2EA',
								borderRadius: 8,
								boxShadow: '0 8px 18px rgba(0,0,0,0.25)',
								transform: `rotate(4deg) translateY(${-noteBob * 0.8}px)`,
								display: 'flex',
								flexDirection: 'column',
								gap: 8,
							}}
						>
							<div
								style={{
									backgroundColor: '#C1121F',
									color: '#F5F2EA',
									fontSize: 16,
									fontWeight: 900,
									padding: '6px 10px',
									borderRadius: 6,
									letterSpacing: 1.5,
									textTransform: 'uppercase',
									alignSelf: 'flex-start',
								}}
							>
								Output
							</div>
							<div
								style={{
									color: '#2B2B2B',
									fontSize: 24,
									fontWeight: 900,
									letterSpacing: 1,
								}}
							>
								margin stack
							</div>
						</div>

						{/* Main content zone - generous spacing for collision-free hierarchy */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: 118,
								paddingBottom: 12,
								gap: 28,
								position: 'relative',
								zIndex: 2,
								textAlign: 'center',
							}}
						>
							{/* Typed clipping headline */}
							<div
								style={{
									backgroundColor: '#F5F2EA',
									color: '#2B2B2B',
									padding: '18px 28px',
									borderRadius: 10,
									boxShadow: '0 10px 22px rgba(0,0,0,0.24)',
									transform: 'rotate(-1deg)',
									maxWidth: 760,
								}}
							>
								<div
									style={{
										fontSize: 68,
										fontWeight: 1000,
										letterSpacing: 1.5,
										lineHeight: 1,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									AUTOMATED MARGINS
								</div>
							</div>

							{/* Polaroid metric */}
							<div
								style={{
									backgroundColor: '#F5F2EA',
									padding: '18px 18px 54px',
									borderRadius: 10,
									boxShadow: '0 14px 28px rgba(0,0,0,0.28)',
									transform: `rotate(1.2deg) scale(${photoDevelop})`,
									filter: `brightness(${photoBrightness})`,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									position: 'relative',
									minWidth: 510,
								}}
							>
								<div
									style={{
										width: 440,
										height: 150,
										borderRadius: 8,
										backgroundColor: '#2B2B2B',
										border: '3px solid #C1121F',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.05)',
										overflow: 'hidden',
										position: 'relative',
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 0,
											background:
												'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0))',
										}}
									/>
									<div
										style={{
											transform: `scale(${metricReveal})`,
											color: '#FFD966',
											fontSize: 72,
											fontWeight: 1000,
											letterSpacing: 1,
											lineHeight: 1,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										50% COMMISSION
									</div>
								</div>

								<div
									style={{
										position: 'absolute',
										bottom: 14,
										left: 0,
										right: 0,
										textAlign: 'center',
										color: '#2B2B2B',
										fontSize: 24,
										fontWeight: 900,
										letterSpacing: 1.2,
									}}
								>
									case file: scalable
								</div>

								<div
									style={{
										position: 'absolute',
										top: 12,
										left: 12,
										width: 12,
										height: 12,
										borderRadius: 999,
										backgroundColor: '#C1121F',
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px) rotate(-0.8deg)`,
						backgroundColor: '#C1121F',
						border: '3px solid #F5F2EA',
						borderRadius: 18,
						padding: '16px 28px',
						boxShadow: '0 10px 22px rgba(0,0,0,0.3)',
						textAlign: 'center',
						maxWidth: 760,
					}}
				>
					<div
						style={{
							color: '#F5F2EA',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2,
							lineHeight: 1.1,
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