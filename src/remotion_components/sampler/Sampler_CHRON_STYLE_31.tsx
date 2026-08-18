import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_31() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const heroIn = spring({
		frame: frame,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.6},
	});

	// ------------------------------------------
	// Beat 2: Inbox / thread state transformation
	// ------------------------------------------
	const unreadCount = Math.round(interpolate(frame, [14, 56], [12, 50], clamp));
	const unreadLabel = `${unreadCount}%`;

	const row1X = interpolate(frame, [0, 16], [-540, 0], clamp);
	const row2X = interpolate(frame, [5, 22], [-540, 0], clamp);
	const row3X = interpolate(frame, [10, 28], [-540, 0], clamp);

	const expandProgress = interpolate(frame, [34, 60], [0, 1], clamp);
	const detailOpacity = interpolate(frame, [38, 50], [0, 1], clamp);

	const sendProgress = interpolate(frame, [72, 98], [0, 1], clamp);
	const sendScale = interpolate(frame, [76, 88], [1, 1.08], clamp);
	const sendFlash = interpolate(frame, [82, 92], [0, 1], clamp);

	// ------------------------------------------
	// Beat 3: Continuous living hover + shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shineOffset = interpolate((frame + 18) % 65, [0, 65], [-260, 980], clamp);
	const shadowPulse = 22 + Math.sin(frame * 0.18) * 4;

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

	const threadHeight = interpolate(expandProgress, [0, 1], [220, 338], clamp);
	const subjectScale = interpolate(expandProgress, [0, 1], [1, 1.02], clamp);
	const metricPanelY = interpolate(frame, [20, 44], [24, 0], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F6F8FC',
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
					maxWidth: 940,
					height: '86%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '52px 18px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FFFFFF',
						border: '3px solid #202124',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(32,33,36,0.10)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#34A853',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#202124',
							fontSize: 19,
							fontWeight: 900,
							letterSpacing: 2.4,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						Inbox Zero
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
						margin: '20px 0',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#FFFFFF',
							border: '4px solid #202124',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 36px rgba(32,33,36,0.16)`,
							padding: '28px 28px 24px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							position: 'relative',
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
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(251,188,4,0.22) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top app bar */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '4px 2px 10px',
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
								<div
									style={{
										width: 16,
										height: 16,
										borderRadius: 999,
										backgroundColor: '#EA4335',
									}}
								/>
								<div
									style={{
										color: '#202124',
										fontSize: 22,
										fontWeight: 900,
										letterSpacing: -0.3,
									}}
								>
									THREAD
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#202124',
									color: '#FFFFFF',
									borderRadius: 999,
									padding: '10px 18px',
									fontSize: 24,
									fontWeight: 900,
									lineHeight: 1,
									minWidth: 108,
									textAlign: 'center',
								}}
							>
								{unreadCount}
							</div>
						</div>

						{/* Main content */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.2fr 0.9fr',
								gap: 24,
								alignItems: 'stretch',
								flex: 1,
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* Left: Inbox thread */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-start',
									gap: 14,
									paddingTop: 6,
								}}
							>
								<div
									style={{
										color: '#202124',
										fontSize: 62,
										fontWeight: 1000,
										lineHeight: 1.02,
										letterSpacing: -1.6,
										textTransform: 'uppercase',
										transform: `scale(${subjectScale})`,
										transformOrigin: 'left center',
										maxWidth: 430,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>

								<div
									style={{
										height: threadHeight,
										border: '3px solid #FBBC04',
										borderRadius: 24,
										backgroundColor: '#FFFDF3',
										padding: '18px 18px 16px',
										boxSizing: 'border-box',
										display: 'flex',
										flexDirection: 'column',
										gap: 12,
										overflow: 'hidden',
									}}
								>
									{/* Row 1 */}
									<div
										style={{
											transform: `translateX(${row1X}px)`,
											backgroundColor: '#FFFFFF',
											border: '2px solid #202124',
											borderRadius: 16,
											padding: '12px 14px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											gap: 12,
										}}
									>
										<div style={{minWidth: 0, flex: 1}}>
											<div
												style={{
													color: '#202124',
													fontSize: 22,
													fontWeight: 900,
													lineHeight: 1.1,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												Partner onboarding approved
											</div>
											<div
												style={{
													color: 'rgba(32,33,36,0.56)',
													fontSize: 16,
													fontWeight: 700,
													lineHeight: 1.2,
													marginTop: 4,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												Commission route is now live…
											</div>
										</div>
										<div
											style={{
												width: 14,
												height: 14,
												borderRadius: 999,
												backgroundColor: '#34A853',
												flexShrink: 0,
											}}
										/>
									</div>

									{/* Row 2 expanded */}
									<div
										style={{
											transform: `translateX(${row2X}px)`,
											backgroundColor: '#FFFFFF',
											border: '3px solid #EA4335',
											borderRadius: 18,
											padding: '14px 14px 12px',
											display: 'flex',
											flexDirection: 'column',
											gap: 10,
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
												gap: 12,
											}}
										>
											<div style={{minWidth: 0, flex: 1}}>
												<div
													style={{
														color: '#202124',
														fontSize: 23,
														fontWeight: 1000,
														lineHeight: 1.1,
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
													}}
												>
													Revenue automation chain
												</div>
												<div
													style={{
														color: 'rgba(32,33,36,0.56)',
														fontSize: 16,
														fontWeight: 700,
														lineHeight: 1.2,
														marginTop: 4,
														whiteSpace: 'nowrap',
														overflow: 'hidden',
														textOverflow: 'ellipsis',
													}}
												>
													Subject: payout logic → software loop…
												</div>
											</div>

											<div
												style={{
													backgroundColor: '#EA4335',
													color: '#FFFFFF',
													borderRadius: 999,
													padding: '8px 12px',
													fontSize: 18,
													fontWeight: 900,
													lineHeight: 1,
													flexShrink: 0,
													minWidth: 56,
													textAlign: 'center',
												}}
											>
												3
											</div>
										</div>

										<div
											style={{
												opacity: detailOpacity,
												display: 'flex',
												flexDirection: 'column',
												gap: 8,
												paddingTop: 4,
											}}
										>
											<div
												style={{
													backgroundColor: '#F6F8FC',
													borderRadius: 12,
													padding: '10px 12px',
													color: '#202124',
													fontSize: 18,
													fontWeight: 800,
													lineHeight: 1.2,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												Trigger → deliver → attribute
											</div>
											<div
												style={{
													backgroundColor: '#F6F8FC',
													borderRadius: 12,
													padding: '10px 12px',
													color: 'rgba(32,33,36,0.62)',
													fontSize: 16,
													fontWeight: 700,
													lineHeight: 1.2,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												Preview: recurring payout with zero manual follow-up…
											</div>
										</div>
									</div>

									{/* Row 3 */}
									<div
										style={{
											transform: `translateX(${row3X}px)`,
											backgroundColor: '#FFFFFF',
											border: '2px solid #202124',
											borderRadius: 16,
											padding: '12px 14px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
											gap: 12,
										}}
									>
										<div style={{minWidth: 0, flex: 1}}>
											<div
												style={{
													color: '#202124',
													fontSize: 22,
													fontWeight: 900,
													lineHeight: 1.1,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												Send sequence confirmed
											</div>
											<div
												style={{
													color: 'rgba(32,33,36,0.56)',
													fontSize: 16,
													fontWeight: 700,
													lineHeight: 1.2,
													marginTop: 4,
													whiteSpace: 'nowrap',
													overflow: 'hidden',
													textOverflow: 'ellipsis',
												}}
											>
												Launch the thread and let it compound…
											</div>
										</div>
										<div
											style={{
												width: 14,
												height: 14,
												borderRadius: 999,
												backgroundColor: '#FBBC04',
												flexShrink: 0,
											}}
										/>
									</div>
								</div>
							</div>

							{/* Right: metric + send state */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									alignItems: 'stretch',
									gap: 18,
									paddingTop: 10,
								}}
							>
								<div
									style={{
										backgroundColor: '#202124',
										borderRadius: 28,
										padding: '18px 18px 20px',
										boxShadow: '0 10px 24px rgba(32,33,36,0.14)',
										transform: `translateY(${metricPanelY}px)`,
									}}
								>
									<div
										style={{
											color: '#FBBC04',
											fontSize: 18,
											fontWeight: 900,
											letterSpacing: 2.2,
											textTransform: 'uppercase',
											marginBottom: 10,
											textAlign: 'center',
										}}
									>
										Commission
									</div>
									<div
										style={{
											color: '#FFFFFF',
											fontSize: 78,
											fontWeight: 1000,
											lineHeight: 0.95,
											letterSpacing: -2,
											textAlign: 'center',
											whiteSpace: 'nowrap',
										}}
									>
										50%
									</div>
									<div
										style={{
											color: '#FFFFFF',
											fontSize: 22,
											fontWeight: 900,
											lineHeight: 1.1,
											letterSpacing: 1.3,
											textAlign: 'center',
											textTransform: 'uppercase',
											marginTop: 10,
										}}
									>
										COMMISSION
									</div>
								</div>

								<div
									style={{
										backgroundColor: '#FFFFFF',
										border: '3px solid #34A853',
										borderRadius: 24,
										padding: '18px 18px 16px',
										display: 'flex',
										flexDirection: 'column',
										gap: 14,
										position: 'relative',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											color: '#202124',
											fontSize: 20,
											fontWeight: 900,
											letterSpacing: 1.4,
											textTransform: 'uppercase',
											textAlign: 'center',
										}}
									>
										Send Flow
									</div>

									<div
										style={{
											height: 14,
											backgroundColor: 'rgba(52,168,83,0.16)',
											borderRadius: 999,
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												width: `${sendProgress * 100}%`,
												height: '100%',
												backgroundColor: '#34A853',
												borderRadius: 999,
											}}
										/>
									</div>

									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											paddingTop: 2,
										}}
									>
										<div
											style={{
												backgroundColor: '#34A853',
												color: '#FFFFFF',
												borderRadius: 18,
												padding: '16px 22px',
												fontSize: 28,
												fontWeight: 1000,
												lineHeight: 1,
												letterSpacing: 1,
												textTransform: 'uppercase',
												transform: `scale(${sendScale})`,
												boxShadow: '0 10px 20px rgba(52,168,83,0.28)',
												whiteSpace: 'nowrap',
											}}
										>
											SEND
										</div>
									</div>

									<div
										style={{
											opacity: sendFlash,
											backgroundColor: '#F6F8FC',
											borderRadius: 14,
											padding: '10px 12px',
											color: '#202124',
											fontSize: 17,
											fontWeight: 800,
											lineHeight: 1.2,
											textAlign: 'center',
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
										}}
									>
										Software handles the chain automatically
									</div>
								</div>

								<div
									style={{
										backgroundColor: '#FBBC04',
										borderRadius: 22,
										padding: '16px 18px',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										boxShadow: '0 10px 22px rgba(251,188,4,0.22)',
									}}
								>
									<div
										style={{
											color: '#202124',
											fontSize: 30,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: 0.4,
											textAlign: 'center',
											whiteSpace: 'nowrap',
										}}
									>
										{unreadLabel}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#EA4335',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(234,67,53,0.18)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FFFFFF',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
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