import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_30() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// -----------------------------
	// Beat 1: Entrance
	// -----------------------------
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const heroEntrance = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.65},
	});

	const takeawayEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 200, mass: 0.6},
	});

	// -----------------------------
	// Beat 2: Active state switch / citation pops
	// -----------------------------
	const metricBoxScale = interpolate(frame, [22, 30, 38], [1, 1.08, 1], clamp);
	const metricSlide = interpolate(frame, [16, 38], [20, 0], clamp);
	const breadcrumbGrow = interpolate(frame, [8, 34], [0, 1], clamp);

	const citation1Pop = spring({
		frame: frame - 24,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.5},
	});

	const citation2Pop = spring({
		frame: frame - 34,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.5},
	});

	const pageSwap = interpolate(frame, [26, 46], [0, 1], clamp);

	// -----------------------------
	// Beat 3: Living hover / shine
	// -----------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shadowPulse = 16 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 14) % 65, [0, 65], [-420, 900], clamp);

	// Link-hop zoom pulse
	const linkPulse = interpolate(frame, [40, 48, 56], [1, 1.06, 1], clamp);

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

	const pageOneOpacity = 1 - pageSwap;
	const pageTwoOpacity = pageSwap;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F8F9FA',
				opacity,
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
				color: '#202122',
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
					padding: '56px 18px 48px 18px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category Badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FFFFFF',
						border: '3px solid #3366CC',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow: '0 10px 26px rgba(32,33,34,0.12)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#795CB2',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 2.4,
							textTransform: 'uppercase',
							color: '#202122',
						}}
					>
						WIKI DESCENT
					</div>
				</div>

				{/* Tier 2: Massive Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '24px 0',
						transform: `scale(${heroEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#BA0000',
							border: '4px solid #202122',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(32,33,34,0.22)`,
							padding: '34px 34px 30px 34px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Faux article chrome */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 20,
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* Breadcrumb trail */}
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									height: 32,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 10,
										transform: `scaleX(${breadcrumbGrow})`,
										transformOrigin: 'left center',
									}}
								>
									<div
										style={{
											padding: '6px 12px',
											borderRadius: 999,
											backgroundColor: '#F8F9FA',
											border: '2px solid #202122',
											fontSize: 14,
											fontWeight: 800,
											color: '#202122',
											whiteSpace: 'nowrap',
										}}
									>
										Start
									</div>
									<div
										style={{
											fontSize: 18,
											fontWeight: 900,
											color: '#F8F9FA',
											lineHeight: 1,
										}}
									>
										›
									</div>
									<div
										style={{
											padding: '6px 12px',
											borderRadius: 999,
											backgroundColor: '#3366CC',
											fontSize: 14,
											fontWeight: 800,
											color: '#F8F9FA',
											whiteSpace: 'nowrap',
										}}
									>
										Linked Path
									</div>
									<div
										style={{
											fontSize: 18,
											fontWeight: 900,
											color: '#F8F9FA',
											lineHeight: 1,
										}}
									>
										›
									</div>
									<div
										style={{
											padding: '6px 12px',
											borderRadius: 999,
											backgroundColor: '#795CB2',
											fontSize: 14,
											fontWeight: 800,
											color: '#F8F9FA',
											whiteSpace: 'nowrap',
										}}
									>
										Revenue
									</div>
								</div>
							</div>

							{/* Paper surface */}
							<div
								style={{
									backgroundColor: '#F8F9FA',
									borderRadius: 24,
									border: '3px solid #202122',
									padding: '34px 34px 28px 34px',
									minHeight: 390,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								{/* Top row */}
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'flex-start',
										gap: 20,
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: 10,
											maxWidth: '72%',
										}}
									>
										<div
											style={{
												fontFamily:
													'Georgia, "Times New Roman", Times, serif',
												fontSize: 66,
												lineHeight: 1.02,
												fontWeight: 700,
												color: '#202122',
												letterSpacing: -1.3,
												textTransform: 'uppercase',
											}}
										>
											AUTOMATED MARGINS
										</div>
										<div
											style={{
												fontSize: 20,
												lineHeight: 1.35,
												color: '#202122',
												opacity: 0.82,
												maxWidth: 560,
											}}
										>
											Linked systems turn article depth into scalable
											distribution and recurring upside.
										</div>
									</div>

									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'flex-end',
											gap: 12,
											minWidth: 120,
											paddingTop: 4,
										}}
									>
										<div
											style={{
												transform: `scale(${citation1Pop})`,
												fontFamily:
													'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
												fontSize: 18,
												fontWeight: 800,
												color: '#3366CC',
												backgroundColor: '#FFFFFF',
												border: '2px solid #3366CC',
												borderRadius: 12,
												padding: '8px 12px',
												lineHeight: 1,
											}}
										>
											[12]
										</div>
										<div
											style={{
												transform: `scale(${citation2Pop})`,
												fontFamily:
													'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
												fontSize: 18,
												fontWeight: 800,
												color: '#795CB2',
												backgroundColor: '#FFFFFF',
												border: '2px solid #795CB2',
												borderRadius: 12,
												padding: '8px 12px',
												lineHeight: 1,
											}}
										>
											[27]
										</div>
									</div>
								</div>

								{/* Middle active area */}
								<div
									style={{
										position: 'relative',
										height: 150,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										margin: '10px 0 6px 0',
									}}
								>
									{/* Page one */}
									<div
										style={{
											position: 'absolute',
											inset: 0,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											opacity: pageOneOpacity,
											transform: `scale(${interpolate(
												frame,
												[18, 32, 46],
												[0.96, 1, 0.92],
												clamp
											)}) translateX(${interpolate(
												frame,
												[26, 46],
												[0, -40],
												clamp
											)}px)`,
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: 18,
												backgroundColor: '#FFFFFF',
												border: '3px solid #3366CC',
												borderRadius: 26,
												padding: '16px 24px',
												boxShadow: '0 10px 26px rgba(51,102,204,0.16)',
											}}
										>
											<div
												style={{
													width: 18,
													height: 18,
													borderRadius: '50%',
													backgroundColor: '#3366CC',
													flexShrink: 0,
												}}
											/>
											<div
												style={{
													fontSize: 26,
													fontWeight: 900,
													color: '#202122',
													letterSpacing: 0.4,
												}}
											>
												Link hop
											</div>
										</div>
									</div>

									{/* Page two */}
									<div
										style={{
											position: 'absolute',
											inset: 0,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											opacity: pageTwoOpacity,
											transform: `scale(${linkPulse}) translateY(${metricSlide}px)`,
										}}
									>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
												justifyContent: 'center',
												backgroundColor: '#202122',
												border: '4px solid #795CB2',
												borderRadius: 28,
												padding: '20px 34px 18px 34px',
												boxShadow: '0 12px 28px rgba(32,33,34,0.25)',
												transform: `scale(${metricBoxScale})`,
												minWidth: 430,
											}}
										>
											<div
												style={{
													fontSize: 20,
													fontWeight: 900,
													letterSpacing: 2.5,
													textTransform: 'uppercase',
													color: '#F8F9FA',
													opacity: 0.8,
													marginBottom: 10,
												}}
											>
												Commission Rate
											</div>
											<div
												style={{
													fontFamily:
														'Georgia, "Times New Roman", Times, serif',
													fontSize: 74,
													lineHeight: 1,
													fontWeight: 700,
													color: '#F8F9FA',
													textTransform: 'uppercase',
													whiteSpace: 'nowrap',
													textAlign: 'center',
												}}
											>
												50%
											</div>
											<div
												style={{
													fontSize: 28,
													lineHeight: 1.1,
													fontWeight: 900,
													color: '#3366CC',
													letterSpacing: 1.2,
													textTransform: 'uppercase',
													marginTop: 8,
													whiteSpace: 'nowrap',
												}}
											>
												COMMISSION
											</div>
										</div>
									</div>
								</div>

								{/* Bottom note */}
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
										gap: 20,
									}}
								>
									<div
										style={{
											fontSize: 18,
											lineHeight: 1.35,
											color: '#202122',
											opacity: 0.84,
											maxWidth: 520,
										}}
									>
										Page swaps, citations, and internal links compound into
										high-leverage software distribution.
									</div>

									<div
										style={{
											fontFamily:
												'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
											fontSize: 18,
											fontWeight: 800,
											color: '#202122',
											backgroundColor: '#FFFFFF',
											border: '2px solid #202122',
											borderRadius: 12,
											padding: '10px 14px',
											whiteSpace: 'nowrap',
										}}
									>
										[50% COMMISSION]
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#3366CC',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(32,33,34,0.18)',
						textAlign: 'center',
						border: '3px solid #202122',
					}}
				>
					<div
						style={{
							color: '#F8F9FA',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2.2,
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