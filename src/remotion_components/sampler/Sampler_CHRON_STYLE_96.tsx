import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_96() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const bottomIn = spring({
		frame: frame - 9,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// Beat 2: state switch / reveal
	const lidLift = interpolate(frame, [10, 28], [0, -32], clamp);
	const tissueRiseA = interpolate(frame, [16, 34], [34, 0], clamp);
	const tissueRiseB = interpolate(frame, [19, 38], [44, 0], clamp);
	const tissueOpacity = interpolate(frame, [12, 26, 46], [0, 1, 0.82], clamp);

	const metricBoxPop = spring({
		frame: frame - 28,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});

	const stickerPeel = interpolate(frame, [28, 48], [-96, 0], clamp);
	const stickerRotate = interpolate(frame, [28, 48], [-18, 0], clamp);

	// Beat 3: continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const badgeFloat = Math.sin(frame * 0.11) * 3;
	const bottomFloat = Math.sin(frame * 0.12 + 0.9) * 3;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-240, 980], clamp);

	// Rolling metric
	const metricValue = Math.round(interpolate(frame, [30, 58], [12, 50], clamp));

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#C7A87F',
				opacity,
				fontFamily:
					'Inter, "Helvetica Neue", Arial, sans-serif',
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
					padding: '52px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#33302B',
						border: '3px solid #EFD3D2',
						borderRadius: 18,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(51,48,43,0.22)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#2C6E6A',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#EFD3D2',
							fontSize: 19,
							fontWeight: 900,
							letterSpacing: 3.2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						96 DIELINE — THE UNBOXING
					</div>
				</div>

				{/* TIER 2 */}
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
							width: '95%',
							minHeight: 540,
							backgroundColor: '#33302B',
							border: '4px solid #F5F0E4',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '42px 38px 34px',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							boxShadow: '0 22px 38px rgba(51,48,43,0.30)',
						}}
					>
						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -20,
								bottom: -20,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(245,240,228,0) 0%, rgba(245,240,228,0.18) 45%, rgba(245,240,228,0.34) 50%, rgba(245,240,228,0.18) 55%, rgba(245,240,228,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* dieline lid */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								right: 0,
								height: 112,
								borderBottom: '2px dashed rgba(245,240,228,0.48)',
								transform: `translateY(${lidLift}px)`,
								transformOrigin: 'top center',
								background:
									'linear-gradient(180deg, rgba(245,240,228,0.08) 0%, rgba(245,240,228,0.02) 100%)',
							}}
						/>

						{/* corner dieline marks */}
						<div
							style={{
								position: 'absolute',
								top: 18,
								left: 18,
								width: 44,
								height: 44,
								borderTop: '2px solid #2C6E6A',
								borderLeft: '2px solid #2C6E6A',
								opacity: 0.9,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 18,
								right: 18,
								width: 44,
								height: 44,
								borderTop: '2px solid #2C6E6A',
								borderRight: '2px solid #2C6E6A',
								opacity: 0.9,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 18,
								left: 18,
								width: 44,
								height: 44,
								borderBottom: '2px solid #2C6E6A',
								borderLeft: '2px solid #2C6E6A',
								opacity: 0.9,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 18,
								right: 18,
								width: 44,
								height: 44,
								borderBottom: '2px solid #2C6E6A',
								borderRight: '2px solid #2C6E6A',
								opacity: 0.9,
							}}
						/>

						{/* top mono label */}
						<div
							style={{
								alignSelf: 'stretch',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginTop: 8,
								padding: '0 8px',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#F5F0E4',
									fontSize: 15,
									fontWeight: 700,
									letterSpacing: 2.6,
									textTransform: 'uppercase',
									fontFamily:
										'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
									opacity: 0.9,
									whiteSpace: 'nowrap',
								}}
							>
								ACTIVATION CODE
							</div>
							<div
								style={{
									color: '#2C6E6A',
									fontSize: 15,
									fontWeight: 800,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									fontFamily:
										'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
									whiteSpace: 'nowrap',
								}}
							>
								OPEN / REVEAL
							</div>
						</div>

						{/* tissue layers */}
						<div
							style={{
								position: 'absolute',
								top: 108,
								left: 62,
								right: 62,
								height: 120,
								opacity: tissueOpacity,
								pointerEvents: 'none',
								zIndex: 1,
							}}
						>
							<div
								style={{
									position: 'absolute',
									left: 0,
									right: 60,
									top: 0,
									height: 72,
									backgroundColor: 'rgba(239,211,210,0.22)',
									border: '1px solid rgba(245,240,228,0.36)',
									borderRadius: 18,
									transform: `translateY(${tissueRiseA}px) rotate(-2deg)`,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									left: 80,
									right: 0,
									top: 20,
									height: 76,
									backgroundColor: 'rgba(245,240,228,0.18)',
									border: '1px solid rgba(239,211,210,0.36)',
									borderRadius: 18,
									transform: `translateY(${tissueRiseB}px) rotate(1.8deg)`,
								}}
							/>
						</div>

						{/* main content */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 28,
								flex: 1,
								zIndex: 2,
								padding: '60px 24px 28px',
								boxSizing: 'border-box',
								textAlign: 'center',
							}}
						>
							<div
								style={{
									maxWidth: 760,
									color: '#EFD3D2',
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 0.98,
									letterSpacing: -1.8,
									textTransform: 'uppercase',
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									position: 'relative',
									transform: `scale(${metricBoxPop})`,
									backgroundColor: '#F5F0E4',
									border: '3px solid #2C6E6A',
									borderRadius: 26,
									padding: '22px 34px 20px',
									minWidth: 520,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 10px 26px rgba(44,110,106,0.18)',
								}}
							>
								{/* sticker peel reveal */}
								<div
									style={{
										position: 'absolute',
										top: -18,
										right: 24,
										backgroundColor: '#2C6E6A',
										color: '#F5F0E4',
										borderRadius: 999,
										padding: '8px 16px',
										fontSize: 14,
										fontWeight: 900,
										letterSpacing: 2,
										textTransform: 'uppercase',
										transform: `translateX(${stickerPeel}px) rotate(${stickerRotate}deg)`,
										boxShadow: '0 8px 20px rgba(44,110,106,0.28)',
										whiteSpace: 'nowrap',
									}}
								>
									PEEL
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 16,
										flexWrap: 'nowrap',
										whiteSpace: 'nowrap',
									}}
								>
									<span
										style={{
											color: '#33302B',
											fontSize: 82,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: -2,
										}}
									>
										{metricValue}%
									</span>
									<span
										style={{
											color: '#2C6E6A',
											fontSize: 34,
											fontWeight: 900,
											lineHeight: 1.05,
											letterSpacing: 2.6,
											textTransform: 'uppercase',
										}}
									>
										Commission
									</span>
								</div>
							</div>

							<div
								style={{
									color: '#F5F0E4',
									fontSize: 20,
									fontWeight: 800,
									letterSpacing: 3.2,
									textTransform: 'uppercase',
									fontFamily:
										'"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
									backgroundColor: 'rgba(44,110,106,0.14)',
									border: '2px dashed rgba(44,110,106,0.7)',
									borderRadius: 16,
									padding: '12px 18px',
									whiteSpace: 'nowrap',
								}}
							>
								50% COMMISSION
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${bottomIn}) translateY(${bottomFloat}px)`,
						backgroundColor: '#2C6E6A',
						border: '3px solid #F5F0E4',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(51,48,43,0.20)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F5F0E4',
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 2.4,
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