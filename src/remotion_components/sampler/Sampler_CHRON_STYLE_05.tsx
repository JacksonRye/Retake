import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_05() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1 — Entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 13, stiffness: 240, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 9,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.7},
	});

	// ------------------------------------------
	// BEAT 2 — Active state / metric reveal
	// ------------------------------------------
	const metricReveal = spring({
		frame: frame - 24,
		fps,
		config: {damping: 11, stiffness: 200, mass: 0.7},
	});

	const metricCount = Math.round(
		interpolate(frame, [20, 58], [12, 50], clamp)
	);

	const highlighterWidth = interpolate(frame, [28, 54], [0, 460], clamp);
	const underlineProgress = interpolate(frame, [14, 38], [0, 1], clamp);
	const arrowDraw = interpolate(frame, [48, 78], [0, 1], clamp);

	// ------------------------------------------
	// BEAT 3 — Living hover / shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const stickerThump = frame >= 60 && frame <= 74 ? Math.sin((frame - 60) * 0.55) * 8 : 0;
	const shineOffset = interpolate((frame + 14) % 65, [0, 65], [-220, 980], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -42],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// ------------------------------------------
	// Fonts / style helpers
	// ------------------------------------------
	const handCaps = '"Arial Black", "Trebuchet MS", sans-serif';
	const mono = '"Courier New", "Menlo", monospace';
	const serifItalic = 'Georgia, "Times New Roman", serif';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F3EDDE',
				opacity,
				fontFamily: handCaps,
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '44px 10px 38px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) rotate(-1.2deg) translateY(${badgeFloat}px)`,
						backgroundColor: '#FFDA47',
						border: '3px solid #1B1F2B',
						borderRadius: 14,
						padding: '12px 26px',
						boxShadow: '0 7px 0 #1B1F2B',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#DC4A3D',
							border: '2px solid #1B1F2B',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#1B1F2B',
							fontFamily: mono,
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						CLOSER&apos;S NOTEBOOK
					</div>
				</div>

				{/* TIER 2: HERO CARD */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '18px 0 20px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '95%',
							minHeight: 548,
							backgroundColor: '#A8C4D9',
							border: '4px solid #1B1F2B',
							borderRadius: 30,
							boxShadow: '0 14px 0 rgba(27,31,43,0.95)',
							padding: '34px 34px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: 'auto auto 1fr auto',
							rowGap: 22,
						}}
					>
						{/* paper grain accents */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'radial-gradient(rgba(27,31,43,0.06) 0.8px, transparent 0.8px)',
								backgroundSize: '16px 16px',
								opacity: 0.28,
								pointerEvents: 'none',
							}}
						/>

						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top label row */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 20,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#1B1F2B',
									fontFamily: mono,
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 2,
									textTransform: 'uppercase',
									backgroundColor: 'rgba(243,237,222,0.75)',
									padding: '8px 12px',
									border: '2px solid #1B1F2B',
									borderRadius: 10,
								}}
							>
								REVENUE NOTE
							</div>

							<div
								style={{
									color: '#1B1F2B',
									fontFamily: serifItalic,
									fontStyle: 'italic',
									fontSize: 18,
									fontWeight: 700,
									backgroundColor: 'rgba(255,218,71,0.8)',
									padding: '8px 14px',
									border: '2px solid #1B1F2B',
									borderRadius: 999,
									transform: `rotate(${(-1.4 + stickerThump * 0.08).toFixed(2)}deg)`,
								}}
							>
								scales quietly
							</div>
						</div>

						{/* HEADLINE BLOCK */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								paddingTop: 6,
								paddingBottom: 6,
							}}
						>
							<div
								style={{
									position: 'relative',
									display: 'inline-block',
									maxWidth: '100%',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										bottom: 12,
										height: 26,
										width: highlighterWidth,
										backgroundColor: '#FFDA47',
										opacity: 0.82,
										borderRadius: 8,
										transform: 'rotate(-1.4deg)',
										zIndex: 0,
									}}
								/>
								<div
									style={{
										position: 'relative',
										color: '#1B1F2B',
										fontSize: 72,
										fontWeight: 1000,
										lineHeight: 0.98,
										letterSpacing: 1,
										textTransform: 'uppercase',
										textShadow: '2px 2px 0 rgba(243,237,222,0.85)',
										transform: 'rotate(-1.1deg)',
										zIndex: 1,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>
							</div>

							{/* underline sketch - safely below text */}
							<svg
								width="100%"
								height="34"
								viewBox="0 0 760 34"
								style={{
									display: 'block',
									marginTop: 12,
									overflow: 'visible',
								}}
							>
								<path
									d="M8 20 C180 28, 430 6, 732 17"
									fill="none"
									stroke="#DC4A3D"
									strokeWidth="5"
									strokeLinecap="round"
									strokeDasharray="760"
									strokeDashoffset={760 * (1 - underlineProgress)}
								/>
							</svg>
						</div>

						{/* METRIC BLOCK */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 26,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									flex: 1,
									minWidth: 0,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-start',
									justifyContent: 'center',
									padding: '22px 24px',
									backgroundColor: '#F3EDDE',
									border: '3px solid #1B1F2B',
									borderRadius: 24,
									boxShadow: '0 8px 0 rgba(27,31,43,0.92)',
								}}
							>
								<div
									style={{
										color: '#1B1F2B',
										fontFamily: mono,
										fontSize: 17,
										fontWeight: 700,
										letterSpacing: 2,
										textTransform: 'uppercase',
										marginBottom: 10,
									}}
								>
									COMMISSION RATE
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										gap: 10,
										transform: `scale(${metricReveal})`,
										transformOrigin: 'left center',
										whiteSpace: 'nowrap',
									}}
								>
									<div
										style={{
											color: '#DC4A3D',
											fontSize: 80,
											fontWeight: 1000,
											lineHeight: 0.95,
											letterSpacing: -1,
											textTransform: 'uppercase',
										}}
									>
										{metricCount}%
									</div>
									<div
										style={{
											color: '#1B1F2B',
											fontSize: 36,
											fontWeight: 900,
											lineHeight: 1,
											textTransform: 'uppercase',
										}}
									>
										COMMISSION
									</div>
								</div>
							</div>

							{/* right-side note + arrow, isolated to avoid collisions */}
							<div
								style={{
									width: 210,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 14,
									flexShrink: 0,
								}}
							>
								<div
									style={{
										backgroundColor: '#FFDA47',
										border: '3px solid #1B1F2B',
										borderRadius: 18,
										padding: '16px 18px',
										boxShadow: '0 7px 0 rgba(27,31,43,0.95)',
										transform: `rotate(${(1.4 - stickerThump * 0.06).toFixed(2)}deg) scale(${interpolate(
											frame,
											[46, 62],
											[0.85, 1],
											clamp
										)})`,
										textAlign: 'center',
										width: '100%',
										boxSizing: 'border-box',
									}}
								>
									<div
										style={{
											color: '#1B1F2B',
											fontFamily: serifItalic,
											fontStyle: 'italic',
											fontSize: 24,
											fontWeight: 700,
											lineHeight: 1.1,
										}}
									>
										keeps climbing
									</div>
								</div>

								<svg
									width="180"
									height="86"
									viewBox="0 0 180 86"
									style={{overflow: 'visible'}}
								>
									<path
										d="M10 68 C45 66, 78 62, 108 45 S148 24, 166 12"
										fill="none"
										stroke="#1B1F2B"
										strokeWidth="4"
										strokeLinecap="round"
										strokeDasharray="220"
										strokeDashoffset={220 * (1 - arrowDraw)}
									/>
									<path
										d="M155 12 L166 12 L161 22"
										fill="none"
										stroke="#DC4A3D"
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeDasharray="40"
										strokeDashoffset={40 * (1 - arrowDraw)}
									/>
								</svg>
							</div>
						</div>

						{/* bottom card note */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 20,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#1B1F2B',
									fontFamily: mono,
									fontSize: 15,
									fontWeight: 700,
									letterSpacing: 1.5,
									textTransform: 'uppercase',
								}}
							>
								AUTOMATED · REPEATABLE · CLEAN
							</div>
							<div
								style={{
									color: '#DC4A3D',
									fontFamily: serifItalic,
									fontStyle: 'italic',
									fontSize: 20,
									fontWeight: 700,
								}}
							>
								no extra labor
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) rotate(-0.8deg) translateY(${takeawayFloat}px)`,
						backgroundColor: '#DC4A3D',
						border: '3px solid #1B1F2B',
						borderRadius: 18,
						padding: '16px 34px',
						boxShadow: '0 8px 0 rgba(27,31,43,0.95)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F3EDDE',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 1.5,
							textTransform: 'uppercase',
							lineHeight: 1.05,
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}