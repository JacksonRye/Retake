import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_16() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance
	// ------------------------------------------
	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const takeawayEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// Beat 2: State changes / legal redline action
	// ------------------------------------------
	const metricReveal = spring({
		frame: frame - 16,
		fps,
		config: {damping: 12, stiffness: 180, mass: 0.8},
	});

	const clauseScroll = interpolate(frame, [14, 76], [34, -34], clamp);
	const highlighterSweep = interpolate(frame, [28, 62], [-420, 640], clamp);
	const redlineWidth = interpolate(frame, [46, 78], [0, 540], clamp);
	const signatureWrite = interpolate(frame, [74, 106], [0, 1], clamp);

	// ------------------------------------------
	// Beat 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 65, [0, 65], [-400, 1000], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
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

	// Metric split animation
	const percentScale = interpolate(metricReveal, [0, 1], [0.82, 1], clamp);
	const metricOpacity = interpolate(metricReveal, [0, 0.25, 1], [0, 0.5, 1], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F8F6F1',
				opacity,
				fontFamily:
					'"Times New Roman", "Georgia", "Iowan Old Style", serif',
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
					padding: '58px 20px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#232323',
						border: '3px solid #D32F2F',
						borderRadius: 16,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(35,35,35,0.16)',
					}}
				>
					<div
						style={{
							width: 11,
							height: 11,
							borderRadius: '50%',
							backgroundColor: '#FFF176',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontFamily:
								'"SFMono-Regular", "Menlo", "Consolas", monospace',
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: 2.3,
							color: '#F8F6F1',
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						EXHIBIT A · REDLINE
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
						margin: '20px 0 18px',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#1E63D0',
							border: '4px solid #232323',
							borderRadius: 30,
							boxShadow: `0 ${shadowPulse}px 30px rgba(35,35,35,0.22)`,
							padding: '36px 38px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: 'auto 1fr auto auto',
							rowGap: 22,
						}}
					>
						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 130,
								backgroundColor: 'rgba(255,255,255,0.16)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top document header */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 16,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 1.8,
									color: '#F8F6F1',
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								SECTION 4.2
							</div>
							<div
								style={{
									height: 2,
									flex: 1,
									backgroundColor: 'rgba(248,246,241,0.55)',
								}}
							/>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 1.8,
									color: '#FFF176',
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								AMENDED
							</div>
						</div>

						{/* central content */}
						<div
							style={{
								position: 'relative',
								display: 'grid',
								gridTemplateColumns: '1.05fr 0.95fr',
								columnGap: 28,
								alignItems: 'stretch',
								zIndex: 2,
							}}
						>
							{/* left legal clause panel */}
							<div
								style={{
									backgroundColor: '#F8F6F1',
									borderRadius: 20,
									border: '3px solid #232323',
									padding: '24px 24px 20px',
									position: 'relative',
									overflow: 'hidden',
									minHeight: 255,
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
										fontSize: 14,
										fontWeight: 800,
										letterSpacing: 1.5,
										color: '#D32F2F',
										textTransform: 'uppercase',
										marginBottom: 14,
									}}
								>
									CLAUSE REVISION
								</div>

								<div
									style={{
										position: 'relative',
										height: 188,
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											transform: `translateY(${clauseScroll}px)`,
											display: 'flex',
											flexDirection: 'column',
											gap: 14,
										}}
									>
										{[
											'The Company shall retain all automated fulfillment rights and derivative software economics generated by the platform.',
											'Agent participation is limited to distribution support and excludes ownership of recurring digital margin streams.',
											'All scalable upside resulting from software enablement shall be recognized as platform-native operating leverage.',
											'Manual service dependency is expressly reduced where automation replaces labor-intensive commercial fulfillment.',
										].map((line, i) => (
											<div
												key={i}
												style={{
													fontSize: 21,
													lineHeight: 1.26,
													fontWeight: 700,
													color: '#232323',
													textAlign: 'justify',
													textJustify: 'inter-word',
												}}
											>
												{line}
											</div>
										))}
									</div>

									{/* highlighter sweep */}
									<div
										style={{
											position: 'absolute',
											left: 18,
											top: 76,
											width: 300,
											height: 28,
											backgroundColor: 'rgba(255,241,118,0.78)',
											borderRadius: 8,
											transform: `translateX(${highlighterSweep}px) rotate(-2deg)`,
											mixBlendMode: 'multiply',
										}}
									/>

									{/* redline strike */}
									<div
										style={{
											position: 'absolute',
											left: 8,
											top: 128,
											width: redlineWidth,
											height: 8,
											backgroundColor: '#D32F2F',
											borderRadius: 999,
											transform: 'rotate(-7deg)',
											transformOrigin: 'left center',
											boxShadow: '0 0 0 2px rgba(211,47,47,0.06)',
										}}
									/>
								</div>
							</div>

							{/* right hero metric panel */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									alignItems: 'center',
									backgroundColor: '#232323',
									borderRadius: 22,
									border: '3px solid #F8F6F1',
									padding: '24px 18px 20px',
									minHeight: 255,
									boxSizing: 'border-box',
									textAlign: 'center',
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										fontSize: 62,
										lineHeight: 1.02,
										fontWeight: 900,
										color: '#F8F6F1',
										textTransform: 'uppercase',
										letterSpacing: -1.2,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 8,
										opacity: metricOpacity,
										transform: `scale(${percentScale})`,
									}}
								>
									<div
										style={{
											backgroundColor: '#FFF176',
											border: '3px solid #232323',
											borderRadius: 18,
											padding: '16px 22px 14px',
											boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
										}}
									>
										<div
											style={{
												fontSize: 72,
												lineHeight: 1,
												fontWeight: 1000,
												color: '#232323',
												letterSpacing: -1,
												whiteSpace: 'nowrap',
											}}
										>
											50%
										</div>
									</div>

									<div
										style={{
											fontFamily:
												'"SFMono-Regular", "Menlo", "Consolas", monospace',
											fontSize: 20,
											lineHeight: 1.1,
											fontWeight: 800,
											color: '#FFF176',
											letterSpacing: 1.7,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										COMMISSION
									</div>
								</div>
							</div>
						</div>

						{/* signature strip */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 22,
								paddingTop: 2,
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									fontSize: 15,
									fontWeight: 800,
									letterSpacing: 1.5,
									color: '#F8F6F1',
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								EXECUTED AS REVISED
							</div>

							<div
								style={{
									flex: 1,
									height: 2,
									backgroundColor: 'rgba(248,246,241,0.55)',
								}}
							/>

							<div
								style={{
									position: 'relative',
									width: 230,
									height: 54,
									flexShrink: 0,
								}}
							>
								<svg
									width="230"
									height="54"
									viewBox="0 0 230 54"
									style={{
										position: 'absolute',
										inset: 0,
									}}
								>
									<defs>
										<clipPath id="sigRevealChron16">
											<rect
												x="0"
												y="0"
												width={230 * signatureWrite}
												height="54"
												rx="0"
												ry="0"
											/>
										</clipPath>
									</defs>
									<path
										d="M10 39
										C28 12, 44 14, 54 35
										S77 48, 90 24
										C96 13, 108 17, 112 31
										S129 48, 145 26
										C154 14, 167 18, 170 30
										S184 42, 198 20
										C202 14, 212 15, 220 26"
										fill="none"
										stroke="#D32F2F"
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										clipPath="url(#sigRevealChron16)"
									/>
								</svg>
								<div
									style={{
										position: 'absolute',
										right: 4,
										bottom: -2,
										fontSize: 24,
										fontStyle: 'italic',
										color: '#F8F6F1',
										opacity: interpolate(signatureWrite, [0, 1], [0, 1], clamp),
									}}
								>
									signed
								</div>
							</div>
						</div>

						{/* footer line inside card */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 18,
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									fontSize: 14,
									fontWeight: 700,
									letterSpacing: 1.4,
									color: '#FFF176',
									textTransform: 'uppercase',
								}}
							>
								LEGAL LEVERAGE
							</div>
							<div
								style={{
									height: 2,
									flex: 1,
									backgroundColor: 'rgba(248,246,241,0.42)',
								}}
							/>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									fontSize: 14,
									fontWeight: 700,
									letterSpacing: 1.4,
									color: '#F8F6F1',
									textTransform: 'uppercase',
								}}
							>
								VERSION FINAL
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#D32F2F',
						border: '3px solid #232323',
						borderRadius: 20,
						padding: '16px 28px',
						boxShadow: '0 10px 22px rgba(35,35,35,0.16)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontFamily:
								'"SFMono-Regular", "Menlo", "Consolas", monospace',
							fontSize: 21,
							fontWeight: 900,
							letterSpacing: 1.8,
							color: '#F8F6F1',
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