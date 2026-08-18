import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_25() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: entrance
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.6},
	});

	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.68},
	});

	const footerEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 14, stiffness: 220, mass: 0.7},
	});

	// Beat 2: active diff transformation
	const diffProgress = interpolate(frame, [18, 68], [0, 1], clamp);
	const commissionCount = Math.round(interpolate(frame, [18, 60], [12, 50], clamp));

	const check1Scale = spring({
		frame: frame - 28,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	const check2Scale = spring({
		frame: frame - 40,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	const check3Scale = spring({
		frame: frame - 52,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	const stampScale = spring({
		frame: frame - 62,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const scrollY = interpolate(frame, [24, 78], [26, -34], clamp);

	// Beat 3: living hover + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-220, 980], clamp);
	const shadowPulse = 20 + Math.sin(frame * 0.18) * 4;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 1.2) * 3;

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

	const lineReveal1 = interpolate(frame, [14, 26], [0, 1], clamp);
	const lineReveal2 = interpolate(frame, [24, 36], [0, 1], clamp);
	const lineReveal3 = interpolate(frame, [34, 46], [0, 1], clamp);
	const lineReveal4 = interpolate(frame, [44, 56], [0, 1], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0D1117',
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
					padding: '54px 16px 40px 16px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: 'rgba(139, 148, 158, 0.12)',
						border: '2px solid #8B949E',
						borderRadius: 16,
						padding: '12px 22px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#2EA043',
						}}
					/>
					<div
						style={{
							color: '#79C0FF',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 1.8,
							textTransform: 'uppercase',
						}}
					>
						#25 Pull Request · The Diff
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
						margin: '22px 0',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 550,
							backgroundColor: '#161B22',
							border: '3px solid #8B949E',
							borderRadius: 30,
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 38px rgba(0,0,0,0.55)`,
							padding: '34px 34px 30px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							gap: 24,
						}}
					>
						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 110,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(121,192,255,0.16), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Card chrome */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								borderBottom: '1px solid rgba(139,148,158,0.45)',
								paddingBottom: 16,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 10,
								}}
							>
								<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#F85149'}} />
								<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#79C0FF'}} />
								<div style={{width: 12, height: 12, borderRadius: '50%', backgroundColor: '#2EA043'}} />
							</div>

							<div
								style={{
									color: '#8B949E',
									fontSize: 16,
									fontWeight: 800,
									letterSpacing: 1,
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								}}
							>
								@margin-bot / revenue.diff
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								textAlign: 'center',
								paddingTop: 2,
							}}
						>
							<div
								style={{
									color: '#F0F6FC',
									fontSize: 66,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.6,
									textTransform: 'uppercase',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Diff body */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								flex: 1,
								backgroundColor: '#0D1117',
								border: '2px solid rgba(139,148,158,0.45)',
								borderRadius: 24,
								padding: '24px 22px',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
							}}
						>
							{/* Anchor row */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									marginBottom: 16,
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								}}
							>
								<div
									style={{
										color: '#79C0FF',
										fontSize: 18,
										fontWeight: 800,
									}}
								>
									@@ profit-engine.ts @@
								</div>
								<div
									style={{
										color: '#8B949E',
										fontSize: 15,
										fontWeight: 700,
									}}
								>
									anchor: margins
								</div>
							</div>

							{/* Scrolling lines */}
							<div
								style={{
									flex: 1,
									position: 'relative',
									overflow: 'hidden',
									borderRadius: 18,
									backgroundColor: '#11161D',
									border: '1px solid rgba(139,148,158,0.25)',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										right: 0,
										top: 0,
										transform: `translateY(${scrollY}px)`,
										padding: '16px 16px 18px 16px',
										boxSizing: 'border-box',
										display: 'flex',
										flexDirection: 'column',
										gap: 12,
									}}
								>
									{[
										{
											sign: '+',
											color: '#2EA043',
											bg: 'rgba(46,160,67,0.14)',
											reveal: lineReveal1,
											text: 'enable_auto_margin();',
											check: check1Scale,
										},
										{
											sign: '+',
											color: '#2EA043',
											bg: 'rgba(46,160,67,0.14)',
											reveal: lineReveal2,
											text: `commission = "${commissionCount}%";`,
											check: check2Scale,
										},
										{
											sign: '-',
											color: '#F85149',
											bg: 'rgba(248,81,73,0.12)',
											reveal: lineReveal3,
											text: 'manual_sales_dependency();',
											check: 0,
										},
										{
											sign: '+',
											color: '#79C0FF',
											bg: 'rgba(121,192,255,0.14)',
											reveal: lineReveal4,
											text: 'scale_with_software_leverage();',
											check: check3Scale,
										},
									].map((line, i) => {
										return (
											<div
												key={i}
												style={{
													height: 62,
													borderRadius: 16,
													backgroundColor: line.bg,
													border: `1px solid ${line.color}55`,
													display: 'flex',
													alignItems: 'center',
													padding: '0 16px',
													boxSizing: 'border-box',
													transform: `scaleX(${line.reveal})`,
													transformOrigin: 'left center',
													opacity: line.reveal,
													position: 'relative',
													overflow: 'hidden',
												}}
											>
												<div
													style={{
														width: 28,
														color: line.color,
														fontSize: 28,
														fontWeight: 900,
														lineHeight: 1,
														fontFamily:
															'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
														flexShrink: 0,
													}}
												>
													{line.sign}
												</div>

												<div
													style={{
														color: '#E6EDF3',
														fontSize: 25,
														fontWeight: 700,
														lineHeight: 1.1,
														fontFamily:
															'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'clip',
														paddingRight: 54,
													}}
												>
													{line.text}
												</div>

												{typeof line.check === 'number' && line.check > 0 ? (
													<div
														style={{
															position: 'absolute',
															right: 14,
															top: '50%',
															transform: `translateY(-50%) scale(${line.check})`,
															width: 32,
															height: 32,
															borderRadius: '50%',
															backgroundColor: '#2EA043',
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															boxShadow: '0 6px 16px rgba(46,160,67,0.35)',
														}}
													>
														<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
															<path
																d="M5 13l4 4L19 7"
																stroke="#0D1117"
																strokeWidth="3.2"
																strokeLinecap="round"
																strokeLinejoin="round"
															/>
														</svg>
													</div>
												) : null}
											</div>
										);
									})}
								</div>
							</div>

							{/* Metric + merge stamp */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 20,
									marginTop: 18,
								}}
							>
								<div
									style={{
										flex: 1,
										minHeight: 108,
										backgroundColor: 'rgba(46,160,67,0.10)',
										border: '3px solid #2EA043',
										borderRadius: 22,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '14px 22px',
										boxSizing: 'border-box',
										boxShadow: '0 10px 24px rgba(46,160,67,0.18)',
									}}
								>
									<div
										style={{
											color: '#2EA043',
											fontSize: 58,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: -1,
											textTransform: 'uppercase',
											textAlign: 'center',
											whiteSpace: 'nowrap',
										}}
									>
										{commissionCount}% COMMISSION
									</div>
								</div>

								<div
									style={{
										width: 168,
										height: 108,
										flexShrink: 0,
										borderRadius: 22,
										border: '3px dashed #F85149',
										backgroundColor: 'rgba(248,81,73,0.08)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										transform: `scale(${stampScale}) rotate(-2deg)`,
										boxShadow: '0 10px 24px rgba(248,81,73,0.18)',
									}}
								>
									<div
										style={{
											color: '#F85149',
											fontSize: 24,
											fontWeight: 1000,
											letterSpacing: 1.4,
											textTransform: 'uppercase',
											textAlign: 'center',
											lineHeight: 1.05,
										}}
									>
										Merge
										<br />
										Ready
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: takeaway */}
				<div
					style={{
						transform: `scale(${footerEntrance}) translateY(${footerFloat}px)`,
						backgroundColor: '#F85149',
						borderRadius: 20,
						padding: '16px 30px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#0D1117',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 1.8,
							textTransform: 'uppercase',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}