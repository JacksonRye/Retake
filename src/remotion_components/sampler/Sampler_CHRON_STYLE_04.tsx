import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_04() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1 — Entrance
	// ------------------------------------------
	const masterIn = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 180, mass: 0.8},
	});

	const badgeIn = spring({
		frame: frame - 3,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 14, stiffness: 200, mass: 0.85},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	// ------------------------------------------
	// BEAT 2 — Active state switch / build-up
	// ------------------------------------------
	const metricReveal = interpolate(frame, [18, 46], [0, 1], clamp);
	const metricPanelScale = interpolate(frame, [20, 34, 44], [0.88, 1.03, 1], clamp);

	const lineGrowA = interpolate(frame, [10, 34], [0, 1], clamp);
	const lineGrowB = interpolate(frame, [18, 42], [0, 1], clamp);
	const lineGrowC = interpolate(frame, [26, 52], [0, 1], clamp);

	const column1 = interpolate(frame, [8, 34], [0, 1], clamp);
	const column2 = interpolate(frame, [14, 40], [0, 1], clamp);
	const column3 = interpolate(frame, [20, 46], [0, 1], clamp);
	const column4 = interpolate(frame, [26, 52], [0, 1], clamp);

	// ------------------------------------------
	// BEAT 3 — Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.7;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const parallaxX = Math.sin(frame * 0.05) * 10;
	const parallaxY = Math.sin(frame * 0.07) * 6;
	const shineOffset = interpolate((frame + 10) % 90, [0, 90], [-260, 980], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#EDE7DC',
				opacity,
				fontFamily:
					'"Poppins", "Arial Black", "Helvetica Neue", sans-serif',
				color: '#1A1815',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
				}}
			>
				{/* Background construction grid */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 0.16,
						backgroundImage: `
              linear-gradient(to right, rgba(57,65,75,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(57,65,75,0.12) 1px, transparent 1px)
            `,
						backgroundSize: '120px 120px',
						transform: `translate(${parallaxX * 0.25}px, ${parallaxY * 0.2}px)`,
					}}
				/>

				{/* Architectural side rails */}
				<div
					style={{
						position: 'absolute',
						left: 42,
						top: 0,
						bottom: 0,
						width: 1,
						backgroundColor: 'rgba(57,65,75,0.22)',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						right: 42,
						top: 0,
						bottom: 0,
						width: 1,
						backgroundColor: 'rgba(57,65,75,0.22)',
					}}
				/>

				{/* Slow light sweep behind composition */}
				<div
					style={{
						position: 'absolute',
						top: -120,
						bottom: -120,
						width: 180,
						background:
							'linear-gradient(90deg, rgba(201,166,86,0), rgba(201,166,86,0.18), rgba(201,166,86,0))',
						transform: `translateX(${shineOffset - 180}px) skewX(-18deg)`,
					}}
				/>
			</div>

			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '38px 18px 30px 18px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '12px 24px',
						borderRadius: 999,
						border: '2px solid #39414B',
						backgroundColor: 'rgba(237,231,220,0.9)',
						boxShadow: '0 8px 22px rgba(26,24,21,0.08)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#C9A656',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#1A1815',
							whiteSpace: 'nowrap',
						}}
					>
						Architectural Manifesto
					</div>
				</div>

				{/* TIER 2: MASSIVE HERO CARD */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '20px 0 18px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#39414B',
							border: '4px solid #1A1815',
							borderRadius: 34,
							boxShadow: '0 24px 50px rgba(26,24,21,0.22)',
							position: 'relative',
							overflow: 'hidden',
							padding: '36px 38px 34px 38px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* Top drafting labels */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-start',
								position: 'relative',
								zIndex: 3,
								marginBottom: 10,
							}}
						>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Roboto Mono", "Menlo", monospace',
									fontSize: 13,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									color: '#A39E93',
								}}
							>
								SECTION_04
							</div>
							<div
								style={{
									fontFamily: '"Georgia", "Times New Roman", serif',
									fontSize: 18,
									fontStyle: 'italic',
									color: '#C9A656',
									letterSpacing: 0.5,
								}}
							>
								whispered systems
							</div>
						</div>

						{/* Main layout area */}
						<div
							style={{
								flex: 1,
								display: 'grid',
								gridTemplateColumns: '1.15fr 0.85fr',
								gap: 26,
								alignItems: 'stretch',
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* LEFT TEXT ZONE */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									minWidth: 0,
									position: 'relative',
									zIndex: 4,
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 16,
									}}
								>
									<div
										style={{
											fontFamily:
												'"SFMono-Regular", "Roboto Mono", "Menlo", monospace',
											fontSize: 14,
											letterSpacing: 3.5,
											textTransform: 'uppercase',
											color: '#A39E93',
										}}
									>
										Commission Architecture
									</div>

									<div
										style={{
											color: '#EDE7DC',
											fontSize: 72,
											lineHeight: 0.98,
											fontWeight: 900,
											letterSpacing: -2.2,
											textTransform: 'uppercase',
											maxWidth: '100%',
										}}
									>
										AUTOMATED
										<br />
										MARGINS
									</div>

									<div
										style={{
											fontFamily: '"Georgia", "Times New Roman", serif',
											fontSize: 24,
											fontStyle: 'italic',
											lineHeight: 1.2,
											color: '#C9A656',
											maxWidth: 360,
										}}
									>
										precision-built profit flows with silent repetition
									</div>
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 12,
										marginTop: 18,
									}}
								>
									<div
										style={{
											width: 42,
											height: 2,
											backgroundColor: '#C9A656',
										}}
									/>
									<div
										style={{
											fontFamily:
												'"SFMono-Regular", "Roboto Mono", "Menlo", monospace',
											fontSize: 13,
											letterSpacing: 2.4,
											textTransform: 'uppercase',
											color: '#A39E93',
										}}
									>
										Systemized Yield
									</div>
								</div>
							</div>

							{/* RIGHT METRIC / COLUMN ZONE */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									alignItems: 'stretch',
									position: 'relative',
									zIndex: 4,
								}}
							>
								{/* Metric block */}
								<div
									style={{
										border: '3px solid #C9A656',
										borderRadius: 28,
										backgroundColor: 'rgba(237,231,220,0.98)',
										padding: '24px 22px',
										boxSizing: 'border-box',
										transform: `scale(${metricPanelScale})`,
										boxShadow: '0 10px 26px rgba(0,0,0,0.18)',
										minHeight: 230,
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
									}}
								>
									<div
										style={{
											fontFamily:
												'"SFMono-Regular", "Roboto Mono", "Menlo", monospace',
											fontSize: 12,
											letterSpacing: 2.4,
											textTransform: 'uppercase',
											color: '#39414B',
										}}
									>
										Active Commission
									</div>

									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-start',
											justifyContent: 'center',
											flex: 1,
											marginTop: 8,
											marginBottom: 8,
										}}
									>
										<div
											style={{
												fontSize: 82,
												lineHeight: 0.92,
												fontWeight: 900,
												letterSpacing: -3,
												color: '#1A1815',
												opacity: metricReveal,
											}}
										>
											50%
										</div>
										<div
											style={{
												marginTop: 8,
												fontSize: 22,
												lineHeight: 1,
												fontWeight: 900,
												letterSpacing: 1.6,
												textTransform: 'uppercase',
												color: '#39414B',
												opacity: metricReveal,
											}}
										>
											Commission
										</div>
									</div>

									<div
										style={{
											fontFamily: '"Georgia", "Times New Roman", serif',
											fontSize: 17,
											fontStyle: 'italic',
											color: '#A39E93',
										}}
									>
										built once, repeated cleanly
									</div>
								</div>

								{/* Columns */}
								<div
									style={{
										height: 160,
										marginTop: 18,
										padding: '10px 6px 0 6px',
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'flex-end',
										justifyContent: 'space-between',
										gap: 12,
										position: 'relative',
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 0,
											right: 0,
											bottom: 0,
											height: 2,
											backgroundColor: 'rgba(201,166,86,0.7)',
										}}
									/>

									{[
										{h: 62, s: column1},
										{h: 92, s: column2},
										{h: 122, s: column3},
										{h: 146, s: column4},
									].map((col, i) => (
										<div
											key={i}
											style={{
												flex: 1,
												height: col.h * col.s,
												backgroundColor: i === 3 ? '#C9A656' : '#A39E93',
												borderRadius: '8px 8px 0 0',
												boxShadow:
													i === 3
														? '0 0 0 2px rgba(201,166,86,0.22)'
														: 'none',
											}}
										/>
									))}
								</div>
							</div>
						</div>

						{/* Construction lines kept away from text */}
						<svg
							viewBox="0 0 1000 600"
							style={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								pointerEvents: 'none',
								zIndex: 1,
								opacity: 0.72,
							}}
						>
							<line
								x1="34"
								y1="84"
								x2={34 + 280 * lineGrowA}
								y2="84"
								stroke="#C9A656"
								strokeWidth="2.5"
								strokeLinecap="round"
							/>
							<line
								x1="34"
								y1="530"
								x2={34 + 430 * lineGrowB}
								y2="530"
								stroke="#A39E93"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<line
								x1="710"
								y1="390"
								x2="710"
								y2={390 - 170 * lineGrowC}
								stroke="#C9A656"
								strokeWidth="2.5"
								strokeLinecap="round"
							/>
							<line
								x1="650"
								y1="205"
								x2="950"
								y2="205"
								stroke="rgba(237,231,220,0.22)"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<line
								x1="650"
								y1="212"
								x2="950"
								y2="212"
								stroke="rgba(201,166,86,0.2)"
								strokeWidth="1"
								strokeLinecap="round"
							/>
						</svg>

						{/* Inner light sweep */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.13), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								zIndex: 2,
								pointerEvents: 'none',
							}}
						/>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<div
						style={{
							fontFamily: '"Georgia", "Times New Roman", serif',
							fontSize: 18,
							fontStyle: 'italic',
							color: '#A39E93',
						}}
					>
						the quiet engine underneath
					</div>
					<div
						style={{
							backgroundColor: '#C9A656',
							color: '#1A1815',
							padding: '16px 30px',
							borderRadius: 18,
							boxShadow: '0 10px 24px rgba(26,24,21,0.12)',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								fontSize: 22,
								fontWeight: 900,
								letterSpacing: 2.1,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							PURE SOFTWARE LEVERAGE
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}