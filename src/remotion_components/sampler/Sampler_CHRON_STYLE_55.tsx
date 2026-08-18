import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_55() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.65},
	});

	const metricEntrance = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.6},
	});

	const takeawayEntrance = spring({
		frame: frame - 12,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// Beat 2: Active state switch / reveal
	const metricReveal = interpolate(frame, [24, 58], [0, 1], clamp);
	const craneX = interpolate(frame, [30, 78], [740, 455], clamp);
	const craneY = interpolate(frame, [30, 78], [120, 210], clamp);
	const craneBob = Math.sin(frame * 0.18) * 6;
	const craneTilt = Math.sin(frame * 0.14) * 2.2;
	const foldLeft = interpolate(frame, [8, 28], [-88, 0], clamp);
	const foldRight = interpolate(frame, [8, 28], [88, 0], clamp);
	const foldTop = interpolate(frame, [10, 30], [-72, 0], clamp);
	const creaseDraw = interpolate(frame, [12, 42], [0, 1], clamp);

	// Beat 3: Living hover + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 20 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-260, 1040], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const headlineReveal = interpolate(frame, [14, 34], [0, 1], clamp);
	const subReveal = interpolate(frame, [38, 62], [0, 1], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FAF7F0',
				opacity,
				fontFamily:
					'"Avenir Next", "Helvetica Neue", "Futura", "Segoe UI", sans-serif',
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
					padding: '56px 18px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FAF7F0',
						border: '2px solid #C4BEB2',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 26px rgba(57,65,75,0.08)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							backgroundColor: '#D64545',
							transform: 'rotate(45deg)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#3D5A80',
							fontSize: 20,
							fontWeight: 500,
							letterSpacing: 4,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						55 Fold Logic
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
						position: 'relative',
						margin: '24px 0',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#39414B',
							borderRadius: 34,
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 36px rgba(57,65,75,0.28)`,
							border: '2px solid rgba(196,190,178,0.28)',
						}}
					>
						{/* traveling paper shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 160,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(250,247,240,0.18), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-24deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* origami fold panels */}
						<div
							style={{
								position: 'absolute',
								left: 0,
								top: 0,
								bottom: 0,
								width: '24%',
								background:
									'linear-gradient(180deg, rgba(250,247,240,0.10), rgba(250,247,240,0.04))',
								transform: `translateX(${foldLeft}px)`,
								opacity: 0.95,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								right: 0,
								top: 0,
								bottom: 0,
								width: '24%',
								background:
									'linear-gradient(180deg, rgba(0,0,0,0.06), rgba(250,247,240,0.04))',
								transform: `translateX(${foldRight}px)`,
								opacity: 0.95,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: '18%',
								right: '18%',
								top: 0,
								height: '23%',
								background:
									'linear-gradient(180deg, rgba(250,247,240,0.12), rgba(250,247,240,0.03))',
								transform: `translateY(${foldTop}px)`,
								opacity: 0.95,
							}}
						/>

						{/* crease lines behind text only */}
						<svg
							viewBox="0 0 1000 600"
							preserveAspectRatio="none"
							style={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								pointerEvents: 'none',
								opacity: 0.85,
							}}
						>
							<line
								x1="220"
								y1="90"
								x2={220 + 280 * creaseDraw}
								y2="300"
								stroke="#C4BEB2"
								strokeWidth="2.5"
								strokeOpacity="0.18"
								strokeLinecap="round"
							/>
							<line
								x1="780"
								y1="90"
								x2={780 - 280 * creaseDraw}
								y2="300"
								stroke="#C4BEB2"
								strokeWidth="2.5"
								strokeOpacity="0.18"
								strokeLinecap="round"
							/>
							<line
								x1="260"
								y1="470"
								x2={260 + 220 * creaseDraw}
								y2="340"
								stroke="#D64545"
								strokeWidth="2"
								strokeOpacity="0.18"
								strokeLinecap="round"
							/>
							<line
								x1="740"
								y1="470"
								x2={740 - 220 * creaseDraw}
								y2="340"
								stroke="#D64545"
								strokeWidth="2"
								strokeOpacity="0.18"
								strokeLinecap="round"
							/>
						</svg>

						{/* content zone */}
						<div
							style={{
								position: 'relative',
								zIndex: 5,
								width: '100%',
								height: '100%',
								minHeight: 540,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '54px 42px 46px',
								boxSizing: 'border-box',
								textAlign: 'center',
							}}
						>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										color: '#FAF7F0',
										fontSize: 72,
										fontWeight: 300,
										letterSpacing: 2,
										lineHeight: 1.02,
										textTransform: 'uppercase',
										maxWidth: 760,
										opacity: headlineReveal,
										transform: `translateY(${interpolate(
											frame,
											[10, 32],
											[18, 0],
											clamp
										)}px)`,
										whiteSpace: 'nowrap',
									}}
								>
									AUTOMATED MARGINS
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '22px 34px',
									borderRadius: 24,
									backgroundColor: '#FAF7F0',
									border: '2px solid #C4BEB2',
									boxShadow: '0 14px 34px rgba(0,0,0,0.16)',
									transform: `scale(${metricEntrance})`,
									minWidth: 500,
								}}
							>
								<div
									style={{
										color: '#D64545',
										fontSize: 62,
										fontWeight: 400,
										letterSpacing: 2,
										lineHeight: 1,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									{metricReveal < 0.55 ? '35% COMMISSION' : '50% COMMISSION'}
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#3D5A80',
									borderRadius: 16,
									padding: '12px 24px',
									opacity: subReveal,
									transform: `translateY(${interpolate(
										frame,
										[34, 58],
										[12, 0],
										clamp
									)}px)`,
								}}
							>
								<div
									style={{
										color: '#FAF7F0',
										fontSize: 20,
										fontWeight: 500,
										letterSpacing: 4,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									Unfolding software economics
								</div>
							</div>
						</div>

						{/* crane accent kept in safe top-right corner */}
						<div
							style={{
								position: 'absolute',
								left: craneX,
								top: craneY + craneBob,
								transform: `rotate(${craneTilt}deg) scale(1.02)`,
								width: 84,
								height: 84,
								zIndex: 6,
								pointerEvents: 'none',
								opacity: interpolate(frame, [24, 34], [0, 1], clamp),
							}}
						>
							<svg viewBox="0 0 100 100" width="84" height="84">
								<polygon
									points="12,56 48,34 60,52 34,64"
									fill="#FAF7F0"
									opacity="0.92"
								/>
								<polygon
									points="48,34 78,20 63,48"
									fill="#C4BEB2"
									opacity="0.95"
								/>
								<polygon
									points="34,64 60,52 72,78"
									fill="#D64545"
									opacity="0.92"
								/>
								<polygon
									points="60,52 88,50 72,78"
									fill="#3D5A80"
									opacity="0.92"
								/>
								<line
									x1="48"
									y1="34"
									x2="60"
									y2="52"
									stroke="#39414B"
									strokeWidth="1.5"
									strokeOpacity="0.5"
								/>
								<line
									x1="60"
									y1="52"
									x2="72"
									y2="78"
									stroke="#39414B"
									strokeWidth="1.5"
									strokeOpacity="0.5"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#D64545',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 12px 28px rgba(57,65,75,0.14)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FAF7F0',
							fontSize: 22,
							fontWeight: 500,
							letterSpacing: 3,
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