import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_76() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.55},
	});
	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});
	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	// Beat 2: Active state / loading bar / metric switch
	const loadingProgress = interpolate(frame, [18, 64], [0, 100], clamp);
	const metricReveal = interpolate(frame, [34, 58], [0, 1], clamp);
	const buttonPress =
		(frame >= 42 && frame <= 47) || (frame >= 58 && frame <= 63) ? 1 : 0;

	// Cursor / hotspot motion
	const cursorVisible = frame >= 20 && frame <= 74;
	const cursorX = interpolate(frame, [20, 40, 54, 74], [260, 110, 110, 210], clamp);
	const cursorY = interpolate(frame, [20, 40, 54, 74], [110, 24, 24, 96], clamp);
	const cursorScale = buttonPress ? 0.86 : 1;

	// Beat 3: Living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-220, 980], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -48],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const barFillWidth = `${loadingProgress}%`;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#4A5568',
				opacity,
				fontFamily:
					'"Times New Roman", "Georgia", "Palatino Linotype", serif',
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
					padding: '52px 18px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						background:
							'linear-gradient(180deg, #D9B310 0%, #c39f0d 48%, #b48f08 100%)',
						border: '3px solid #CBD2DC',
						borderRadius: 14,
						padding: '12px 28px',
						boxShadow:
							'inset 0 2px 0 rgba(255,255,255,0.35), inset 0 -3px 0 rgba(0,0,0,0.22), 0 10px 22px rgba(0,0,0,0.28)',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#2C7873',
							boxShadow: '0 0 0 2px rgba(42,82,190,0.45)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#4A5568',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							fontVariant: 'small-caps',
							textShadow:
								'0 1px 0 rgba(255,255,255,0.4), 0 -1px 0 rgba(0,0,0,0.18)',
							whiteSpace: 'nowrap',
						}}
					>
						Disc Menu Module
					</div>
				</div>

				{/* Tier 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '24px 0 22px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							background:
								'linear-gradient(180deg, #d9b310 0%, #d0aa0f 8%, #b58f08 100%)',
							border: '5px solid #CBD2DC',
							borderRadius: 28,
							boxShadow:
								'inset 0 3px 0 rgba(255,255,255,0.45), inset 0 -5px 0 rgba(0,0,0,0.22), 0 18px 40px rgba(0,0,0,0.34)',
							padding: '22px 24px 26px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								backgroundColor: 'rgba(255,255,255,0.13)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* window chrome */}
						<div
							style={{
								height: 50,
								borderRadius: 16,
								background:
									'linear-gradient(180deg, #5a6678 0%, #465161 100%)',
								border: '3px solid #CBD2DC',
								boxShadow:
									'inset 0 2px 0 rgba(255,255,255,0.3), inset 0 -2px 0 rgba(0,0,0,0.28)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '0 18px',
								boxSizing: 'border-box',
								flexShrink: 0,
							}}
						>
							<div
								style={{
									display: 'flex',
									gap: 10,
									alignItems: 'center',
								}}
							>
								{['#2C7873', '#2A52BE', '#CBD2DC'].map((c, i) => (
									<div
										key={i}
										style={{
											width: 14,
											height: 14,
											borderRadius: '50%',
											backgroundColor: c,
											border: '1px solid rgba(0,0,0,0.25)',
										}}
									/>
								))}
							</div>

							<div
								style={{
									color: '#CBD2DC',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 2,
									textTransform: 'uppercase',
									fontVariant: 'small-caps',
									whiteSpace: 'nowrap',
									textShadow:
										'0 1px 0 rgba(255,255,255,0.18), 0 -1px 0 rgba(0,0,0,0.3)',
								}}
							>
								Multimedia ROM
							</div>
						</div>

						{/* content area */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '34px 24px 8px',
								boxSizing: 'border-box',
								gap: 26,
								position: 'relative',
							}}
						>
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 18,
								}}
							>
								<div
									style={{
										color: '#CBD2DC',
										fontSize: 70,
										fontWeight: 900,
										lineHeight: 0.98,
										letterSpacing: 1,
										textAlign: 'center',
										textTransform: 'uppercase',
										textShadow:
											'0 1px 0 rgba(255,255,255,0.4), 0 2px 0 rgba(255,255,255,0.18), 0 4px 0 rgba(42,82,190,0.35), 0 6px 12px rgba(0,0,0,0.24)',
										maxWidth: 760,
										whiteSpace: 'normal',
									}}
								>
									AUTOMATED MARGINS
								</div>

								<div
									style={{
										width: '82%',
										maxWidth: 690,
										backgroundColor: '#4A5568',
										border: '3px solid #CBD2DC',
										borderRadius: 18,
										padding: '14px 16px 16px',
										boxSizing: 'border-box',
										boxShadow:
											'inset 0 2px 0 rgba(255,255,255,0.15), inset 0 -3px 0 rgba(0,0,0,0.22)',
										display: 'flex',
										flexDirection: 'column',
										gap: 10,
									}}
								>
									<div
										style={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											gap: 16,
										}}
									>
										<div
											style={{
												color: '#CBD2DC',
												fontSize: 16,
												fontWeight: 800,
												letterSpacing: 2,
												textTransform: 'uppercase',
												fontVariant: 'small-caps',
												whiteSpace: 'nowrap',
											}}
										>
											Loading Commission
										</div>
										<div
											style={{
												color: '#CBD2DC',
												fontSize: 15,
												fontWeight: 700,
												letterSpacing: 1.4,
												fontVariant: 'small-caps',
												whiteSpace: 'nowrap',
											}}
										>
											{Math.round(loadingProgress)}%
										</div>
									</div>

									<div
										style={{
											width: '100%',
											height: 20,
											borderRadius: 10,
											backgroundColor: '#CBD2DC',
											border: '2px solid #2A52BE',
											boxShadow:
												'inset 0 2px 2px rgba(0,0,0,0.18)',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												width: barFillWidth,
												height: '100%',
												background:
													'linear-gradient(90deg, #2C7873 0%, #2A52BE 100%)',
												boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.22)',
											}}
										/>
									</div>
								</div>
							</div>

							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 18,
								}}
							>
								<div
									style={{
										background:
											buttonPress === 1
												? 'linear-gradient(180deg, #415670 0%, #34475f 100%)'
												: 'linear-gradient(180deg, #5d6a7d 0%, #485466 100%)',
										border: '4px solid #CBD2DC',
										borderRadius: 24,
										padding: '22px 42px',
										boxShadow:
											buttonPress === 1
												? 'inset 0 3px 6px rgba(0,0,0,0.28), inset 0 -1px 0 rgba(255,255,255,0.14), 0 4px 12px rgba(0,0,0,0.22)'
												: 'inset 0 2px 0 rgba(255,255,255,0.28), inset 0 -4px 0 rgba(0,0,0,0.24), 0 10px 20px rgba(0,0,0,0.26)',
										transform: `translateY(${buttonPress === 1 ? 8 : 0}px) scale(${
											0.98 + metricReveal * 0.02
										})`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										minWidth: 530,
										maxWidth: 700,
									}}
								>
									<div
										style={{
											color: '#CBD2DC',
											fontSize: 60,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: 1,
											textTransform: 'uppercase',
											textAlign: 'center',
											textShadow:
												'0 1px 0 rgba(255,255,255,0.35), 0 3px 0 rgba(42,82,190,0.4), 0 6px 12px rgba(0,0,0,0.28)',
											opacity: metricReveal,
										}}
									>
										50% COMMISSION
									</div>
								</div>

								<div
									style={{
										background:
											'linear-gradient(180deg, #2A52BE 0%, #23479f 100%)',
										border: '3px solid #CBD2DC',
										borderRadius: 14,
										padding: '10px 26px',
										boxShadow:
											'inset 0 2px 0 rgba(255,255,255,0.22), inset 0 -2px 0 rgba(0,0,0,0.18)',
									}}
								>
									<div
										style={{
											color: '#CBD2DC',
											fontSize: 18,
											fontWeight: 900,
											letterSpacing: 2.5,
											textTransform: 'uppercase',
											fontVariant: 'small-caps',
											whiteSpace: 'nowrap',
										}}
									>
										Execute Module
									</div>
								</div>
							</div>
						</div>
					</div>

					{cursorVisible && (
						<div
							style={{
								position: 'absolute',
								right: 130,
								bottom: 84,
								transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
								zIndex: 40,
								pointerEvents: 'none',
							}}
						>
							<svg
								width="72"
								height="72"
								viewBox="0 0 24 24"
								fill="#CBD2DC"
								stroke="#2A52BE"
								strokeWidth="1.6"
							>
								<path d="M4 3.5L11.2 20.5L13.8 13.4L20.5 10.8Z" />
							</svg>
						</div>
					)}
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						background:
							'linear-gradient(180deg, #2C7873 0%, #23625e 100%)',
						border: '3px solid #CBD2DC',
						borderRadius: 18,
						padding: '15px 34px',
						boxShadow:
							'inset 0 2px 0 rgba(255,255,255,0.22), inset 0 -3px 0 rgba(0,0,0,0.2), 0 10px 22px rgba(0,0,0,0.26)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#CBD2DC',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
							fontVariant: 'small-caps',
							textShadow:
								'0 1px 0 rgba(255,255,255,0.18), 0 -1px 0 rgba(0,0,0,0.24)',
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