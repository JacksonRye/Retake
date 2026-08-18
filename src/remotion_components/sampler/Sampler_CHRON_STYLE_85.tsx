import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_85() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	// Beat 2: active state / metric roll
	const commissionValue = Math.round(interpolate(frame, [14, 56], [12, 50], clamp));
	const metricText = `${commissionValue}% COMMISSION`;

	const figPop = spring({
		frame: frame - 28,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	const sealPop = spring({
		frame: frame - 42,
		fps,
		config: {damping: 14, stiffness: 240, mass: 0.6},
	});

	const hatchReveal = interpolate(frame, [18, 44], [0, 1], clamp);
	const lineDraw = interpolate(frame, [10, 34], [0, 1], clamp);
	const lineDraw2 = interpolate(frame, [20, 46], [0, 1], clamp);

	// Beat 3: living loop
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.12 + 0.4) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 0.9) * 3;
	const shineOffset = interpolate((frame + 12) % 72, [0, 72], [-220, 980], clamp);
	const embossPulse = 0.92 + ((Math.sin(frame * 0.16) + 1) / 2) * 0.12;

	// Exit
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -42],
		clamp
	);

	const drawW1 = 240 * lineDraw;
	const drawW2 = 180 * lineDraw2;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F2EAD3',
				opacity,
				fontFamily:
					'"Copperplate", "Copperplate Gothic Bold", "Palatino Linotype", Georgia, serif',
				color: '#2D2A26',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '42px 20px 34px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '12px 24px',
						borderRadius: 999,
						border: '2px solid #8A8275',
						backgroundColor: 'rgba(138,130,117,0.12)',
						boxShadow: '0 6px 18px rgba(45,42,38,0.10)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#BD9433',
							boxShadow: '0 0 0 2px rgba(45,42,38,0.10) inset',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#2D2A26',
							whiteSpace: 'nowrap',
						}}
					>
						Invention File
					</div>
				</div>

				{/* Tier 2: massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 548,
							backgroundColor: '#8A8275',
							border: '3px solid #2D2A26',
							borderRadius: 30,
							boxShadow: '0 18px 34px rgba(45,42,38,0.18)',
							position: 'relative',
							overflow: 'hidden',
							padding: '36px 40px 34px 40px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* Card paper surface */}
						<div
							style={{
								position: 'absolute',
								inset: 10,
								borderRadius: 22,
								backgroundColor: '#F2EAD3',
								border: '1.5px solid rgba(45,42,38,0.35)',
							}}
						/>

						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: 0,
								width: 110,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.22), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Hairline frame + labels layer */}
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 1000 560"
							style={{
								position: 'absolute',
								inset: 0,
								zIndex: 1,
								pointerEvents: 'none',
							}}
						>
							{/* outer drafting lines */}
							<rect
								x="34"
								y="34"
								width="932"
								height="492"
								rx="20"
								fill="none"
								stroke="#2D2A26"
								strokeWidth="1.4"
								strokeDasharray="1800"
								strokeDashoffset={1800 - lineDraw * 1800}
								opacity={0.75}
							/>
							<rect
								x="54"
								y="54"
								width="892"
								height="452"
								rx="14"
								fill="none"
								stroke="#8A8275"
								strokeWidth="1"
								strokeDasharray="1600"
								strokeDashoffset={1600 - lineDraw2 * 1600}
								opacity={0.75}
							/>

							{/* top-left fig line, positioned above headline area */}
							<line
								x1="94"
								y1="114"
								x2={94 + drawW1}
								y2="114"
								stroke="#2C497F"
								strokeWidth="1.5"
								opacity="0.95"
							/>
							<line
								x1="94"
								y1="122"
								x2={94 + drawW2}
								y2="122"
								stroke="#BD9433"
								strokeWidth="1.2"
								opacity="0.95"
							/>

							{/* bottom-right fig line, safely away from metric text */}
							<line
								x1="726"
								y1="442"
								x2={726 + drawW2}
								y2="442"
								stroke="#2C497F"
								strokeWidth="1.5"
								opacity="0.9"
							/>
							<line
								x1="726"
								y1="450"
								x2={726 + drawW1 * 0.72}
								y2="450"
								stroke="#BD9433"
								strokeWidth="1.2"
								opacity="0.9"
							/>
						</svg>

						{/* Content */}
						<div
							style={{
								position: 'relative',
								zIndex: 3,
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 18,
							}}
						>
							{/* Top callout row */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-start',
									minHeight: 52,
								}}
							>
								<div
									style={{
										transform: `scale(${figPop})`,
										transformOrigin: 'left center',
										padding: '6px 10px',
										border: '1.5px solid #2C497F',
										borderRadius: 8,
										backgroundColor: 'rgba(44,73,127,0.06)',
										fontSize: 18,
										fontStyle: 'italic',
										letterSpacing: 1,
										color: '#2C497F',
										whiteSpace: 'nowrap',
									}}
								>
									Fig. 85-A
								</div>

								<div
									style={{
										fontSize: 16,
										fontWeight: 400,
										letterSpacing: 2.2,
										fontStyle: 'italic',
										color: '#2D2A26',
										opacity: 0.82,
										textAlign: 'right',
										maxWidth: 300,
										lineHeight: 1.2,
									}}
								>
									patent file draft
								</div>
							</div>

							{/* Center hero headline */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									flex: 1,
									textAlign: 'center',
									padding: '8px 28px 0 28px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										fontSize: 72,
										fontWeight: 900,
										letterSpacing: 1.2,
										lineHeight: 1.04,
										color: '#2D2A26',
										textTransform: 'uppercase',
										maxWidth: 760,
										whiteSpace: 'normal',
									}}
								>
									AUTOMATED MARGINS
								</div>

								<div
									style={{
										marginTop: 26,
										position: 'relative',
										padding: '22px 34px',
										borderRadius: 22,
										border: '3px solid #2D2A26',
										backgroundColor: '#F2EAD3',
										boxShadow: '0 10px 22px rgba(45,42,38,0.10)',
										minWidth: 610,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										overflow: 'hidden',
									}}
								>
									{/* hatching fill reveal */}
									<div
										style={{
											position: 'absolute',
											inset: 0,
											opacity: 0.22 * hatchReveal,
											backgroundImage:
												'repeating-linear-gradient(-45deg, transparent 0px, transparent 8px, #BD9433 8px, #BD9433 10px)',
										}}
									/>
									<div
										style={{
											position: 'relative',
											zIndex: 2,
											fontSize: 60,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: 1.1,
											color: '#2C497F',
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>
							</div>

							{/* Bottom metadata row */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-end',
									minHeight: 84,
								}}
							>
								<div
									style={{
										maxWidth: 300,
										fontSize: 17,
										lineHeight: 1.25,
										letterSpacing: 1.1,
										fontStyle: 'italic',
										color: '#2D2A26',
										opacity: 0.82,
									}}
								>
									hairline draft / margin engine / software-only yield
								</div>

								<div
									style={{
										transform: `scale(${sealPop * embossPulse})`,
										transformOrigin: 'center center',
										width: 114,
										height: 114,
										borderRadius: '50%',
										border: '2.5px solid #BD9433',
										background:
											'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5), rgba(189,148,51,0.2) 42%, rgba(189,148,51,0.12) 72%, rgba(45,42,38,0.05) 100%)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow:
											'inset 0 2px 10px rgba(255,255,255,0.35), inset 0 -6px 12px rgba(45,42,38,0.08), 0 10px 20px rgba(45,42,38,0.10)',
										flexShrink: 0,
									}}
								>
									<div
										style={{
											width: 88,
											height: 88,
											borderRadius: '50%',
											border: '1.5px solid #2D2A26',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											textAlign: 'center',
											fontSize: 15,
											fontWeight: 800,
											letterSpacing: 1.3,
											lineHeight: 1.1,
											color: '#2D2A26',
											textTransform: 'uppercase',
										}}
									>
										File
										<br />
										Seal
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						padding: '16px 30px',
						borderRadius: 18,
						border: '2px solid #2D2A26',
						backgroundColor: '#BD9433',
						boxShadow: '0 8px 20px rgba(45,42,38,0.14)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2.2,
							lineHeight: 1.15,
							textTransform: 'uppercase',
							color: '#2D2A26',
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