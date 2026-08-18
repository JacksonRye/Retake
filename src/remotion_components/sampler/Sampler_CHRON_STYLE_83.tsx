import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_83() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const rootEntrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardEntrance = spring({
		frame: frame - 7,
		fps,
		config: {damping: 13, stiffness: 230, mass: 0.7},
	});

	const metricEntrance = spring({
		frame: frame - 16,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.6},
	});

	// Beat 2: Active state switches / counter roll
	const percentValue = Math.round(interpolate(frame, [18, 56], [12, 50], clamp));
	const commissionVisible = frame >= 34;
	const groupNumber = Math.round(interpolate(frame, [10, 34], [16, 83], clamp));
	const atomicMass = interpolate(frame, [16, 58], [28.1, 50.0], clamp).toFixed(1);

	const leftTileFlip = interpolate(frame, [12, 28], [-90, 0], clamp);
	const rightTileFlip = interpolate(frame, [18, 34], [90, 0], clamp);
	const centerThunk = interpolate(frame, [38, 46, 56], [0, 10, 0], clamp);

	// Beat 3: Living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 15) % 70, [0, 70], [-260, 980], clamp);

	// Electron orbit loops
	const orbitAngle1 = frame * 0.06;
	const orbitAngle2 = frame * 0.09 + Math.PI * 0.9;
	const orbitAngle3 = frame * 0.075 + Math.PI * 1.7;

	const orbit1X = Math.cos(orbitAngle1) * 108;
	const orbit1Y = Math.sin(orbitAngle1) * 34;

	const orbit2X = Math.cos(orbitAngle2) * 132;
	const orbit2Y = Math.sin(orbitAngle2) * 24;

	const orbit3X = Math.cos(orbitAngle3) * 88;
	const orbit3Y = Math.sin(orbitAngle3) * 44;

	// Background grid zoom
	const gridScale = interpolate(frame, [0, durationInFrames], [1.06, 1.0], clamp);
	const gridOpacity = interpolate(frame, [0, 18, 120, 135], [0, 0.22, 0.22, 0], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -60],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#2B2D42',
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", sans-serif',
				opacity,
				overflow: 'hidden',
			}}
		>
			{/* Background grid */}
			<div
				style={{
					position: 'absolute',
					inset: -120,
					opacity: gridOpacity,
					transform: `scale(${gridScale})`,
					backgroundImage: `
            linear-gradient(rgba(141,153,174,0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(141,153,174,0.16) 1px, transparent 1px)
          `,
					backgroundSize: '72px 72px',
				}}
			/>

			{/* Subtle corner atoms */}
			<div
				style={{
					position: 'absolute',
					top: 110,
					left: 90,
					width: 220,
					height: 220,
					border: '2px solid rgba(119,104,174,0.32)',
					borderRadius: '50%',
					transform: 'rotate(18deg)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: 122,
					left: 92,
					width: 220,
					height: 220,
					border: '2px solid rgba(47,156,149,0.22)',
					borderRadius: '50%',
					transform: 'rotate(-26deg)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: 78,
					right: 96,
					width: 180,
					height: 180,
					border: '2px solid rgba(119,104,174,0.18)',
					borderRadius: '50%',
					transform: 'rotate(-12deg)',
				}}
			/>

			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '46px 0 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#7768AE',
						border: '3px solid #8D99AE',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow: '0 10px 30px rgba(0,0,0,0.28)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#EE6C4D',
						}}
					/>
					<div
						style={{
							color: '#FFFFFF',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						GROUP {groupNumber}
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
						margin: '20px 0 18px',
						transform: `scale(${rootEntrance})`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 544,
							backgroundColor: '#8D99AE',
							border: '4px solid #EE6C4D',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 38px rgba(0,0,0,0.36)`,
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							alignItems: 'stretch',
							justifyContent: 'space-between',
							padding: '34px 34px 32px',
							boxSizing: 'border-box',
							transform: `translateY(${hoverY + centerThunk}px) rotate(${hoverTilt}deg) scale(${cardEntrance})`,
							gap: 24,
						}}
					>
						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Left atomic data tile */}
						<div
							style={{
								width: 196,
								borderRadius: 24,
								backgroundColor: '#2B2D42',
								border: '3px solid #7768AE',
								padding: '22px 18px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								boxShadow: '0 8px 22px rgba(0,0,0,0.22)',
								transform: `rotate(${leftTileFlip}deg) scale(${metricEntrance})`,
								transformOrigin: 'left center',
								zIndex: 3,
							}}
						>
							<div
								style={{
									color: '#8D99AE',
									fontSize: 16,
									fontWeight: 800,
									letterSpacing: 2,
									textTransform: 'uppercase',
									fontFamily: '"SFMono-Regular", Consolas, monospace',
								}}
							>
								atomic data
							</div>

							<div
								style={{
									color: '#EE6C4D',
									fontSize: 80,
									fontWeight: 1000,
									lineHeight: 0.92,
								}}
							>
								83
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 10,
									fontFamily: '"SFMono-Regular", Consolas, monospace',
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										color: '#FFFFFF',
										fontSize: 17,
										fontWeight: 700,
									}}
								>
									<span style={{opacity: 0.7}}>mass</span>
									<span>{atomicMass}</span>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										color: '#FFFFFF',
										fontSize: 17,
										fontWeight: 700,
									}}
								>
									<span style={{opacity: 0.7}}>state</span>
									<span style={{color: '#2F9C95'}}>active</span>
								</div>
							</div>
						</div>

						{/* Center hero zone */}
						<div
							style={{
								flex: 1,
								height: '100%',
								borderRadius: 28,
								backgroundColor: '#2B2D42',
								border: '3px solid #2F9C95',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								padding: '30px 24px 28px',
								boxSizing: 'border-box',
								position: 'relative',
								minWidth: 0,
								zIndex: 2,
							}}
						>
							{/* top micro row */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									fontFamily: '"SFMono-Regular", Consolas, monospace',
									color: '#8D99AE',
									fontSize: 15,
									fontWeight: 800,
									letterSpacing: 1.5,
									textTransform: 'uppercase',
								}}
							>
								<div>elemental breakdown</div>
								<div style={{color: '#2F9C95'}}>stable loop</div>
							</div>

							{/* electron orbits safely behind text */}
							<div
								style={{
									position: 'absolute',
									top: 110,
									left: '50%',
									transform: 'translateX(-50%)',
									width: 360,
									height: 190,
									pointerEvents: 'none',
									opacity: 0.9,
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										border: '2px solid rgba(119,104,174,0.45)',
										borderRadius: '50%',
										transform: 'rotate(12deg)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										border: '2px solid rgba(47,156,149,0.40)',
										borderRadius: '50%',
										transform: 'rotate(-18deg)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										border: '2px solid rgba(238,108,77,0.28)',
										borderRadius: '50%',
										transform: 'rotate(36deg)',
									}}
								/>

								<div
									style={{
										position: 'absolute',
										left: 180 + orbit1X - 7,
										top: 95 + orbit1Y - 7,
										width: 14,
										height: 14,
										borderRadius: '50%',
										backgroundColor: '#EE6C4D',
										boxShadow: '0 0 18px rgba(238,108,77,0.65)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 180 + orbit2X - 6,
										top: 95 + orbit2Y - 6,
										width: 12,
										height: 12,
										borderRadius: '50%',
										backgroundColor: '#2F9C95',
										boxShadow: '0 0 16px rgba(47,156,149,0.55)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 180 + orbit3X - 5,
										top: 95 + orbit3Y - 5,
										width: 10,
										height: 10,
										borderRadius: '50%',
										backgroundColor: '#7768AE',
										boxShadow: '0 0 14px rgba(119,104,174,0.55)',
									}}
								/>
							</div>

							{/* headline */}
							<div
								style={{
									position: 'relative',
									zIndex: 5,
									marginTop: 34,
									textAlign: 'center',
									maxWidth: 620,
								}}
							>
								<div
									style={{
										color: '#EE6C4D',
										fontSize: 72,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: -1.8,
										textTransform: 'uppercase',
										textShadow: '0 4px 0 rgba(0,0,0,0.18)',
									}}
								>
									AUTOMATED
								</div>
								<div
									style={{
										color: '#EE6C4D',
										fontSize: 72,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: -1.8,
										textTransform: 'uppercase',
										textShadow: '0 4px 0 rgba(0,0,0,0.18)',
									}}
								>
									MARGINS
								</div>
							</div>

							{/* metric */}
							<div
								style={{
									position: 'relative',
									zIndex: 5,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 8,
									marginTop: 8,
								}}
							>
								<div
									style={{
										backgroundColor: '#7768AE',
										border: '3px solid #EE6C4D',
										borderRadius: 24,
										padding: '18px 34px 16px',
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 12,
										boxShadow: '0 10px 26px rgba(0,0,0,0.24)',
										transform: `scale(${metricEntrance})`,
									}}
								>
									<span
										style={{
											color: '#FFFFFF',
											fontSize: 76,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: -1.5,
										}}
									>
										{percentValue}%
									</span>
									{commissionVisible && (
										<span
											style={{
												color: '#EE6C4D',
												fontSize: 28,
												fontWeight: 1000,
												lineHeight: 1,
												letterSpacing: 2.5,
												textTransform: 'uppercase',
												paddingBottom: 8,
											}}
										>
											Commission
										</span>
									)}
								</div>
							</div>

							{/* bottom micro tag */}
							<div
								style={{
									position: 'relative',
									zIndex: 5,
									backgroundColor: '#2F9C95',
									color: '#FFFFFF',
									padding: '10px 24px',
									borderRadius: 14,
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
								}}
							>
								bond line stable
							</div>
						</div>

						{/* Right symbol tile */}
						<div
							style={{
								width: 196,
								borderRadius: 24,
								backgroundColor: '#2B2D42',
								border: '3px solid #2F9C95',
								padding: '18px 18px 22px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								boxShadow: '0 8px 22px rgba(0,0,0,0.22)',
								transform: `rotate(${rightTileFlip}deg) scale(${metricEntrance})`,
								transformOrigin: 'right center',
								zIndex: 3,
							}}
						>
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									fontFamily: '"SFMono-Regular", Consolas, monospace',
									color: '#8D99AE',
									fontSize: 16,
									fontWeight: 800,
								}}
							>
								<span>{groupNumber}</span>
								<span>LM</span>
							</div>

							<div
								style={{
									color: '#EE6C4D',
									fontSize: 98,
									fontWeight: 1000,
									lineHeight: 0.9,
									letterSpacing: -4,
								}}
							>
								Mg
							</div>

							<div
								style={{
									textAlign: 'center',
									color: '#FFFFFF',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								Leverage
							</div>

							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
									marginTop: 8,
								}}
							>
								<div
									style={{
										height: 10,
										borderRadius: 999,
										backgroundColor: 'rgba(141,153,174,0.25)',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											width: `${interpolate(frame, [20, 60], [18, 100], clamp)}%`,
											height: '100%',
											backgroundColor: '#2F9C95',
										}}
									/>
								</div>
								<div
									style={{
										height: 10,
										borderRadius: 999,
										backgroundColor: 'rgba(141,153,174,0.25)',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											width: `${interpolate(frame, [26, 66], [12, 88], clamp)}%`,
											height: '100%',
											backgroundColor: '#7768AE',
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${rootEntrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#EE6C4D',
						border: '3px solid #8D99AE',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.3)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#2B2D42',
							fontSize: 22,
							fontWeight: 1000,
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