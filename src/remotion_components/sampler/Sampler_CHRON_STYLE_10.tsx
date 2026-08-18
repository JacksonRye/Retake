import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_10() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.62},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const takeawayEntrance = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	const stampEntrance = spring({
		frame: frame - 28,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	// ------------------------------------------
	// Beat 2: Active state / metric reveal
	// ------------------------------------------
	const commissionNumber = Math.round(interpolate(frame, [18, 60], [12, 50], clamp));
	const metricText = `${commissionNumber}% COMMISSION`;

	const pathProgress = interpolate(frame, [10, 46], [0, 1], clamp);
	const inkBloom = interpolate(frame, [20, 34], [0, 1], clamp);
	const cornerFlip = interpolate(frame, [24, 40], [0, 1], clamp);
	const stampRotate = interpolate(frame, [34, 52], [-18, 0], clamp);
	const stampScale = interpolate(frame, [34, 52], [0.72, 1], clamp);

	// ------------------------------------------
	// Beat 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 70, [0, 70], [-260, 920], clamp);
	const stampFloat = Math.sin(frame * 0.12 + 1.3) * 6;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitSlide = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -60], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// Dotted path total length
	const pathLength = 360;
	const dashOffset = pathLength * (1 - pathProgress);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#D9C7A0',
				opacity,
				fontFamily:
					'"Brush Script MT", "Segoe Script", "Apple Chancery", "Comic Sans MS", cursive',
				color: '#4A3826',
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
					padding: '56px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#8A8275',
						border: '3px solid #4A3826',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 22px rgba(74,56,38,0.18)',
						zIndex: 10,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#5B7553',
						}}
					/>
					<div
						style={{
							fontFamily: '"Courier New", "SFMono-Regular", monospace',
							fontSize: 19,
							fontWeight: 700,
							letterSpacing: 2.2,
							fontVariant: 'small-caps',
							color: '#F6F0E3',
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						Field Note 10 · Expedition Log
					</div>
				</div>

				{/* TIER 2: Massive hero card */}
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
							backgroundColor: '#8A8275',
							border: '4px solid #4A3826',
							borderRadius: 30,
							boxShadow: `0 ${shadowPulse}px 30px rgba(74,56,38,0.22)`,
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: '66px 1fr 122px',
							gap: 18,
						}}
					>
						{/* Traveling paper sheen */}
						<div
							style={{
								position: 'absolute',
								top: -20,
								bottom: -20,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,248,230,0.24) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Ink bloom */}
						<div
							style={{
								position: 'absolute',
								left: 68,
								top: 132,
								width: 210,
								height: 210,
								borderRadius: '50%',
								background: 'radial-gradient(circle, rgba(91,117,83,0.22) 0%, rgba(91,117,83,0.12) 45%, rgba(91,117,83,0) 75%)',
								transform: `scale(${inkBloom})`,
								opacity: inkBloom,
								filter: 'blur(2px)',
								pointerEvents: 'none',
							}}
						/>

						{/* Page corner flip */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								right: 0,
								width: 94,
								height: 94,
								pointerEvents: 'none',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 0,
									right: 0,
									width: 94,
									height: 94,
									background:
										'linear-gradient(135deg, rgba(255,247,230,0.96) 0%, rgba(235,224,200,0.95) 52%, rgba(138,130,117,0) 52%)',
									transformOrigin: 'top right',
									transform: `rotate(${interpolate(cornerFlip, [0, 1], [-10, 0])}deg) scale(${interpolate(
										cornerFlip,
										[0, 1],
										[0.7, 1]
									)})`,
									opacity: cornerFlip,
									borderTopRightRadius: 28,
								}}
							/>
						</div>

						{/* Top specimen strip */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 20,
								padding: '0 2px',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontFamily: '"Courier New", "SFMono-Regular", monospace',
									fontSize: 18,
									fontWeight: 700,
									letterSpacing: 2,
									fontVariant: 'small-caps',
									textTransform: 'uppercase',
									color: '#4A3826',
									whiteSpace: 'nowrap',
								}}
							>
								Specimen Label
							</div>

							<div
								style={{
									flex: 1,
									height: 2,
									background:
										'repeating-linear-gradient(to right, #4A3826 0 7px, transparent 7px 14px)',
									opacity: 0.65,
								}}
							/>

							<div
								style={{
									fontFamily: '"Courier New", "SFMono-Regular", monospace',
									fontSize: 17,
									fontWeight: 700,
									letterSpacing: 1.4,
									color: '#5B7553',
									whiteSpace: 'nowrap',
								}}
							>
								12°N · 71°W
							</div>
						</div>

						{/* Main content area */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.25fr 0.75fr',
								gap: 26,
								alignItems: 'stretch',
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* Left text block */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									padding: '6px 0 4px',
									minWidth: 0,
								}}
							>
								<div
									style={{
										fontSize: 74,
										fontStyle: 'italic',
										fontWeight: 700,
										lineHeight: 0.96,
										letterSpacing: -1.5,
										color: '#4A3826',
										textTransform: 'uppercase',
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>

								<div
									style={{
										marginTop: 20,
										display: 'inline-flex',
										alignSelf: 'flex-start',
										backgroundColor: '#D9C7A0',
										border: '3px solid #B3422E',
										borderRadius: 20,
										padding: '18px 24px 16px',
										boxShadow: '0 8px 18px rgba(179,66,46,0.16)',
									}}
								>
									<div
										style={{
											fontFamily: '"Courier New", "SFMono-Regular", monospace',
											fontSize: 54,
											fontWeight: 800,
											lineHeight: 1,
											letterSpacing: 1.2,
											color: '#B3422E',
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>

								<div
									style={{
										marginTop: 16,
										fontFamily: '"Courier New", "SFMono-Regular", monospace',
										fontSize: 18,
										fontWeight: 700,
										letterSpacing: 1.8,
										fontVariant: 'small-caps',
										color: '#5B7553',
										textTransform: 'uppercase',
									}}
								>
									Logged gain from repeatable distribution systems
								</div>
							</div>

							{/* Right illustration block */}
							<div
								style={{
									position: 'relative',
									border: '3px solid rgba(74,56,38,0.7)',
									borderRadius: 24,
									backgroundColor: 'rgba(217,199,160,0.72)',
									overflow: 'hidden',
									minHeight: 262,
								}}
							>
								{/* Dotted path drawing */}
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 320 280"
									style={{
										position: 'absolute',
										inset: 0,
									}}
								>
									<path
										d="M44 218 C 92 204, 98 158, 142 152 S 206 198, 238 154 S 264 92, 286 76"
										fill="none"
										stroke="#5B7553"
										strokeWidth="6"
										strokeLinecap="round"
										strokeDasharray="4 14"
										strokeDashoffset={dashOffset}
									/>
									<circle cx="44" cy="218" r="8" fill="#4A3826" />
									<circle cx="286" cy="76" r="9" fill="#B3422E" />
								</svg>

								{/* Map pins / notes */}
								<div
									style={{
										position: 'absolute',
										left: 22,
										top: 22,
										backgroundColor: '#5B7553',
										color: '#F7F1E3',
										borderRadius: 14,
										padding: '8px 12px',
										fontFamily: '"Courier New", "SFMono-Regular", monospace',
										fontSize: 16,
										fontWeight: 700,
										letterSpacing: 1.1,
										whiteSpace: 'nowrap',
									}}
								>
									ORIGIN
								</div>

								<div
									style={{
										position: 'absolute',
										right: 20,
										bottom: 20,
										backgroundColor: '#B3422E',
										color: '#F7F1E3',
										borderRadius: 14,
										padding: '8px 12px',
										fontFamily: '"Courier New", "SFMono-Regular", monospace',
										fontSize: 16,
										fontWeight: 700,
										letterSpacing: 1.1,
										whiteSpace: 'nowrap',
									}}
								>
									YIELD
								</div>

								{/* Rotating stamp hit */}
								<div
									style={{
										position: 'absolute',
										right: 28,
										top: 58,
										width: 132,
										height: 132,
										borderRadius: '50%',
										border: '5px solid #B3422E',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										transform: `rotate(${stampRotate + Math.sin(frame * 0.08) * 1.2}deg) scale(${
											stampEntrance * stampScale
										}) translateY(${stampFloat}px)`,
										opacity: interpolate(frame, [30, 40], [0, 1], clamp),
										backgroundColor: 'rgba(179,66,46,0.08)',
										boxShadow: '0 8px 18px rgba(179,66,46,0.12)',
									}}
								>
									<div
										style={{
											fontFamily: '"Courier New", "SFMono-Regular", monospace',
											fontSize: 22,
											fontWeight: 900,
											letterSpacing: 2.4,
											color: '#B3422E',
											textTransform: 'uppercase',
											textAlign: 'center',
											lineHeight: 1.05,
										}}
									>
										Verified
									</div>
								</div>
							</div>
						</div>

						{/* Bottom ledger strip */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr 1fr 1fr',
								gap: 14,
								alignItems: 'stretch',
								zIndex: 2,
							}}
						>
							{[
								{label: 'Source', value: 'Software'},
								{label: 'Method', value: 'Automation'},
								{label: 'Result', value: 'Leverage'},
							].map((item) => (
								<div
									key={item.label}
									style={{
										backgroundColor: 'rgba(217,199,160,0.86)',
										border: '2px solid rgba(74,56,38,0.7)',
										borderRadius: 18,
										padding: '14px 14px 12px',
										display: 'flex',
										flexDirection: 'column',
										gap: 6,
									}}
								>
									<div
										style={{
											fontFamily: '"Courier New", "SFMono-Regular", monospace',
											fontSize: 15,
											fontWeight: 700,
											letterSpacing: 1.7,
											fontVariant: 'small-caps',
											textTransform: 'uppercase',
											color: '#5B7553',
										}}
									>
										{item.label}
									</div>
									<div
										style={{
											fontSize: 31,
											fontStyle: 'italic',
											fontWeight: 700,
											lineHeight: 1,
											color: '#4A3826',
											whiteSpace: 'nowrap',
										}}
									>
										{item.value}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* TIER 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#5B7553',
						border: '3px solid #4A3826',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 22px rgba(74,56,38,0.18)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontFamily: '"Courier New", "SFMono-Regular", monospace',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2.1,
							fontVariant: 'small-caps',
							textTransform: 'uppercase',
							color: '#F6F0E3',
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