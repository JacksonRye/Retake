import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export default function Sampler_CHRON_STYLE_29() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: entrances
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const stackDrop = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});

	const card2In = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.72},
	});

	const card3In = spring({
		frame: frame - 14,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.74},
	});

	const takeawayIn = spring({
		frame: frame - 16,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	// Beat 2: active metric + thread line + quote flip
	const metricProgress = interpolate(frame, [18, 58], [0, 50], clamp);
	const metricValue = Math.round(metricProgress);

	const threadDraw = interpolate(frame, [28, 66], [0, 1], clamp);
	const quoteFlip = spring({
		frame: frame - 54,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.75},
	});

	// Beat 3: living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-260, 900], clamp);

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -60], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const card1Y = interpolate(1 - stackDrop, [0, 1], [-140, 0], clamp);
	const card2Y = interpolate(1 - card2In, [0, 1], [-110, 0], clamp);
	const card3Y = interpolate(1 - card3In, [0, 1], [-80, 0], clamp);

	const quoteScaleX = interpolate(quoteFlip, [0, 0.5, 1], [1, 0.94, 1], clamp);
	const quoteRotate = interpolate(quoteFlip, [0, 1], [-1.5, 0], clamp);
	const quoteOpacity = interpolate(quoteFlip, [0, 0.2, 1], [0.3, 0.85, 1], clamp);

	const threadLength = 320;
	const visibleThread = threadLength * threadDraw;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#15202B',
				opacity,
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
					padding: '52px 18px 36px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: 'rgba(231,233,234,0.08)',
						border: '2px solid rgba(29,155,240,0.9)',
						borderRadius: 999,
						padding: '10px 22px',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#F91880',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#E7E9EA',
							fontSize: 16,
							fontWeight: 800,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						THREAD ANATOMY
					</div>
				</div>

				{/* Tier 2: Massive hero stack */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '22px 0',
						transform: `translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							maxWidth: 940,
							minHeight: 540,
							position: 'relative',
						}}
					>
						{/* Back card 1 */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								transform: `translateY(${card1Y + 8}px) rotate(-1.5deg) scale(${0.96 + stackDrop * 0.04})`,
								backgroundColor: '#E7E9EA',
								borderRadius: 34,
								boxShadow: `0 ${14 + shadowPulse}px 34px rgba(0,0,0,0.28)`,
								opacity: 0.18,
							}}
						/>

						{/* Back card 2 */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								transform: `translateY(${card2Y + 4}px) rotate(1.2deg) scale(${0.975 + card2In * 0.025})`,
								backgroundColor: '#E7E9EA',
								borderRadius: 34,
								boxShadow: `0 ${16 + shadowPulse}px 36px rgba(0,0,0,0.32)`,
								opacity: 0.26,
							}}
						/>

						{/* Main front card */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								transform: `translateY(${card3Y}px) scale(${0.985 + card3In * 0.015})`,
								backgroundColor: '#E7E9EA',
								border: '4px solid #E7E9EA',
								borderRadius: 36,
								boxShadow: `0 ${20 + shadowPulse}px 46px rgba(0,0,0,0.42)`,
								overflow: 'hidden',
							}}
						>
							{/* Shine */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 120,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.42) 50%, rgba(255,255,255,0) 100%)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Header strip */}
							<div
								style={{
									height: 96,
									padding: '0 28px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									borderBottom: '2px solid rgba(21,32,43,0.12)',
									boxSizing: 'border-box',
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div style={{display: 'flex', alignItems: 'center', gap: 16}}>
									<div
										style={{
											width: 56,
											height: 56,
											borderRadius: '50%',
											backgroundColor: '#1D9BF0',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: '#E7E9EA',
											fontSize: 24,
											fontWeight: 900,
											flexShrink: 0,
										}}
									>
										A
									</div>
									<div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
										<div
											style={{
												color: '#15202B',
												fontSize: 26,
												fontWeight: 900,
												lineHeight: 1,
											}}
										>
											Automation OS
										</div>
										<div
											style={{
												color: 'rgba(21,32,43,0.6)',
												fontSize: 16,
												fontWeight: 700,
												lineHeight: 1,
											}}
										>
											@marginengine · 2h
										</div>
									</div>
								</div>

								<div
									style={{
										color: '#1D9BF0',
										fontSize: 26,
										fontWeight: 900,
										lineHeight: 1,
									}}
								>
									↗
								</div>
							</div>

							{/* Main body */}
							<div
								style={{
									position: 'relative',
									zIndex: 2,
									padding: '34px 34px 28px',
									height: 'calc(100% - 96px)',
									boxSizing: 'border-box',
									display: 'grid',
									gridTemplateColumns: '1fr 300px',
									columnGap: 28,
								}}
							>
								{/* Left content */}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										minWidth: 0,
									}}
								>
									<div
										style={{
											color: '#15202B',
											fontSize: 72,
											fontWeight: 950,
											lineHeight: 0.96,
											letterSpacing: -2.4,
											textTransform: 'uppercase',
											maxWidth: 520,
										}}
									>
										AUTOMATED
										<br />
										MARGINS
									</div>

									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											gap: 18,
											marginTop: 24,
										}}
									>
										{/* Thread line zone - fully separate from text */}
										<div
											style={{
												width: 40,
												height: 164,
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'flex-start',
												position: 'relative',
												flexShrink: 0,
											}}
										>
											<div
												style={{
													width: 8,
													height: 8,
													borderRadius: '50%',
													backgroundColor: '#00BA7C',
													position: 'absolute',
													top: 0,
												}}
											/>
											<div
												style={{
													position: 'absolute',
													top: 14,
													width: 4,
													height: visibleThread,
													backgroundColor: '#1D9BF0',
													borderRadius: 999,
												}}
											/>
											<div
												style={{
													width: 8,
													height: 8,
													borderRadius: '50%',
													backgroundColor: '#F91880',
													position: 'absolute',
													top: 14 + Math.min(visibleThread, threadLength),
												}}
											/>
										</div>

										{/* Quote card */}
										<div
											style={{
												width: 100,
												flex: 1,
												minHeight: 164,
												backgroundColor: '#15202B',
												border: '3px solid #1D9BF0',
												borderRadius: 24,
												padding: '18px 22px',
												boxSizing: 'border-box',
												display: 'flex',
												flexDirection: 'column',
												justifyContent: 'center',
												gap: 10,
												transform: `scaleX(${quoteScaleX}) rotate(${quoteRotate}deg)`,
												opacity: quoteOpacity,
												boxShadow: '0 12px 28px rgba(21,32,43,0.28)',
											}}
										>
											<div
												style={{
													color: '#F91880',
													fontSize: 18,
													fontWeight: 900,
													letterSpacing: 1.2,
													textTransform: 'uppercase',
												}}
											>
												Post Mortem
											</div>
											<div
												style={{
													color: '#E7E9EA',
													fontSize: 24,
													fontWeight: 850,
													lineHeight: 1.15,
												}}
											>
												Thread reveals where software captured the spread.
											</div>
										</div>
									</div>
								</div>

								{/* Right metric rail */}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										alignItems: 'stretch',
									}}
								>
									<div
										style={{
											backgroundColor: '#15202B',
											border: '3px solid #F91880',
											borderRadius: 28,
											padding: '20px 18px',
											boxShadow: '0 12px 30px rgba(249,24,128,0.18)',
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											justifyContent: 'center',
											minHeight: 238,
										}}
									>
										<div
											style={{
												color: '#E7E9EA',
												fontSize: 16,
												fontWeight: 800,
												letterSpacing: 2.2,
												textTransform: 'uppercase',
												marginBottom: 16,
												textAlign: 'center',
											}}
										>
											Commission
										</div>

										<div
											style={{
												display: 'flex',
												alignItems: 'flex-end',
												justifyContent: 'center',
												lineHeight: 1,
												gap: 4,
											}}
										>
											<div
												style={{
													color: '#1D9BF0',
													fontSize: 88,
													fontWeight: 1000,
													letterSpacing: -3,
												}}
											>
												{metricValue}
											</div>
											<div
												style={{
													color: '#1D9BF0',
													fontSize: 52,
													fontWeight: 1000,
													paddingBottom: 10,
												}}
											>
												%
											</div>
										</div>

										<div
											style={{
												color: '#00BA7C',
												fontSize: 24,
												fontWeight: 900,
												letterSpacing: 1.2,
												textTransform: 'uppercase',
												marginTop: 12,
												textAlign: 'center',
											}}
										>
											Commission
										</div>
									</div>

									<div
										style={{
											backgroundColor: '#1D9BF0',
											borderRadius: 22,
											padding: '16px 18px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											minHeight: 92,
											boxShadow: '0 10px 24px rgba(29,155,240,0.22)',
										}}
									>
										<div
											style={{
												color: '#E7E9EA',
												fontSize: 26,
												fontWeight: 900,
												lineHeight: 1.05,
												textAlign: 'center',
												letterSpacing: 0.5,
												textTransform: 'uppercase',
											}}
										>
											50% COMMISSION
										</div>
									</div>
								</div>
							</div>

							{/* Footer actions */}
							<div
								style={{
									position: 'absolute',
									left: 28,
									right: 28,
									bottom: 16,
									height: 40,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									color: 'rgba(21,32,43,0.45)',
									fontSize: 18,
									fontWeight: 800,
									letterSpacing: 0.3,
									pointerEvents: 'none',
								}}
							>
								<div style={{display: 'flex', gap: 24}}>
									<span>↩ 1.2K</span>
									<span>⟳ 3.8K</span>
									<span>♥ 12K</span>
								</div>
								<span>🔖</span>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#F91880',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.28)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#E7E9EA',
							fontSize: 22,
							fontWeight: 950,
							letterSpacing: 1.8,
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