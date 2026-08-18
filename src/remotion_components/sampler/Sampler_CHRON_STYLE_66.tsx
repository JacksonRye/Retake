import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_66() {
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

	const heroIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Active state switch / metric roll
	const commissionValue = Math.round(interpolate(frame, [18, 60], [12, 50], clamp));
	const metricText = `${commissionValue}% COMMISSION`;

	const bar1 = interpolate(frame, [20, 42], [0.22, 0.8], clamp);
	const bar2 = interpolate(frame, [28, 50], [0.28, 0.66], clamp);
	const bar3 = interpolate(frame, [34, 58], [0.14, 0.54], clamp);

	const trafficA = interpolate((frame - 12) % 60, [0, 60], [0, 180], clamp);
	const trafficB = interpolate((frame + 18) % 72, [0, 72], [0, 180], clamp);
	const trafficC = interpolate((frame + 32) % 84, [0, 84], [0, 180], clamp);

	// Beat 3: Living hover + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const orbitX = Math.sin(frame * 0.06) * 10;
	const orbitY = Math.cos(frame * 0.05) * 6;
	const shadowPulse = 22 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 20) % 70, [0, 70], [-220, 980], clamp);

	// Exit
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -34],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#E5E1DA',
				opacity,
				fontFamily:
					'Inter, Avenir Next, Helvetica Neue, Arial, sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '90%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '40px 14px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#264653',
						border: '3px solid #2A9D8F',
						borderRadius: 16,
						padding: '12px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(38,70,83,0.18)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#E9C46A',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#E5E1DA',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 2.8,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						CHRON 66 · GRID BLOCK
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
						position: 'relative',
						margin: '20px 0',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg) translateX(${orbitX}px)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#264653',
							border: '4px solid #E76F51',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '34px 34px 30px',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 36px rgba(38,70,83,0.28)`,
							display: 'grid',
							gridTemplateColumns: '1.18fr 0.82fr',
							columnGap: 30,
						}}
					>
						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -30,
								bottom: -30,
								width: 120,
								background:
									'linear-gradient(180deg, rgba(233,196,106,0.00) 0%, rgba(233,196,106,0.24) 50%, rgba(233,196,106,0.00) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Left panel */}
						<div
							style={{
								position: 'relative',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								height: '100%',
								zIndex: 2,
							}}
						>
							{/* lot micro text */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: 10,
								}}
							>
								<div
									style={{
										color: '#E9C46A',
										fontSize: 12,
										fontWeight: 800,
										letterSpacing: 2,
										textTransform: 'uppercase',
									}}
								>
									LOT-08
								</div>
								<div
									style={{
										color: '#E5E1DA',
										opacity: 0.7,
										fontSize: 11,
										fontWeight: 700,
										letterSpacing: 1.6,
										textTransform: 'uppercase',
									}}
								>
									Grid / Revenue / Node
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 22,
								}}
							>
								<div
									style={{
										color: '#E5E1DA',
										fontSize: 70,
										fontWeight: 1000,
										lineHeight: 0.96,
										letterSpacing: -2.2,
										textTransform: 'uppercase',
										maxWidth: 500,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>

								<div
									style={{
										width: 220,
										height: 4,
										backgroundColor: '#2A9D8F',
										borderRadius: 999,
									}}
								/>

								<div
									style={{
										display: 'inline-flex',
										alignItems: 'center',
										alignSelf: 'flex-start',
										backgroundColor: '#E5E1DA',
										border: '3px solid #E9C46A',
										borderRadius: 22,
										padding: '18px 28px',
										boxShadow: '0 10px 24px rgba(0,0,0,0.14)',
									}}
								>
									<div
										style={{
											color: '#E76F51',
											fontSize: 58,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: -1.2,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>
							</div>

							{/* bottom left isometric pads */}
							<div
								style={{
									display: 'flex',
									alignItems: 'flex-end',
									gap: 14,
									height: 128,
									paddingBottom: 4,
								}}
							>
								{[
									{h: 50, c: '#2A9D8F'},
									{h: 76, c: '#E9C46A'},
									{h: 96, c: '#E76F51'},
									{h: 62, c: '#2A9D8F'},
								].map((b, i) => {
									const rise = interpolate(
										frame,
										[10 + i * 4, 34 + i * 4],
										[0, b.h],
										clamp
									);
									return (
										<div
											key={i}
											style={{
												width: 48,
												height: rise,
												backgroundColor: b.c,
												borderRadius: 10,
												boxShadow: `10px 10px 0 rgba(229,225,218,0.12)`,
												transform: `translateY(${Math.sin(frame * 0.1 + i) * 2}px)`,
												flexShrink: 0,
											}}
										/>
									);
								})}
							</div>
						</div>

						{/* Right panel */}
						<div
							style={{
								position: 'relative',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								height: '100%',
								zIndex: 2,
							}}
						>
							{/* Leader-line labels area */}
							<div
								style={{
									width: '100%',
									height: 170,
									position: 'relative',
									marginTop: 8,
								}}
							>
								{/* central block */}
								<div
									style={{
										position: 'absolute',
										left: 98,
										top: 46 + orbitY,
										width: 122,
										height: 88,
										backgroundColor: '#E5E1DA',
										border: '3px solid #E76F51',
										borderRadius: 18,
										boxShadow: '14px 14px 0 rgba(42,157,143,0.28)',
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 0,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: '#264653',
											fontSize: 18,
											fontWeight: 900,
											letterSpacing: 1.6,
											textTransform: 'uppercase',
										}}
									>
										Core
									</div>
								</div>

								{/* label top left */}
								<div
									style={{
										position: 'absolute',
										left: 0,
										top: 0,
										color: '#E5E1DA',
										fontSize: 12,
										fontWeight: 800,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
									}}
								>
									Margin Engine
								</div>
								<div
									style={{
										position: 'absolute',
										left: 120,
										top: 20,
										width: 58,
										height: 2,
										backgroundColor: '#E9C46A',
										transform: 'rotate(0deg)',
										transformOrigin: 'left center',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 176,
										top: 18,
										width: 8,
										height: 8,
										borderRadius: 999,
										backgroundColor: '#E9C46A',
									}}
								/>

								{/* label right */}
								<div
									style={{
										position: 'absolute',
										right: 0,
										top: 64,
										color: '#E5E1DA',
										fontSize: 12,
										fontWeight: 800,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
										textAlign: 'right',
									}}
								>
									Auto Route
								</div>
								<div
									style={{
										position: 'absolute',
										right: 92,
										top: 82,
										width: 44,
										height: 2,
										backgroundColor: '#2A9D8F',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										right: 134,
										top: 78,
										width: 8,
										height: 8,
										borderRadius: 999,
										backgroundColor: '#2A9D8F',
									}}
								/>

								{/* label bottom left */}
								<div
									style={{
										position: 'absolute',
										left: 8,
										bottom: 12,
										color: '#E5E1DA',
										fontSize: 12,
										fontWeight: 800,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
									}}
								>
									Yield Layer
								</div>
								<div
									style={{
										position: 'absolute',
										left: 104,
										bottom: 30,
										width: 54,
										height: 2,
										backgroundColor: '#E76F51',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 156,
										bottom: 26,
										width: 8,
										height: 8,
										borderRadius: 999,
										backgroundColor: '#E76F51',
									}}
								/>
							</div>

							{/* isometric city panel */}
							<div
								style={{
									width: '100%',
									flex: 1,
									backgroundColor: 'rgba(229,225,218,0.08)',
									border: '2px solid rgba(233,196,106,0.6)',
									borderRadius: 24,
									padding: '18px 18px 16px',
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
								}}
							>
								<div
									style={{
										display: 'grid',
										gridTemplateColumns: 'repeat(3, 1fr)',
										gap: 12,
										height: 126,
										alignItems: 'end',
									}}
								>
									{[
										{color: '#E9C46A', h: 92},
										{color: '#2A9D8F', h: 118},
										{color: '#E76F51', h: 74},
										{color: '#E76F51', h: 70},
										{color: '#E5E1DA', h: 104},
										{color: '#E9C46A', h: 84},
									].map((b, i) => {
										const target = b.h;
										const rise = interpolate(
											frame,
											[8 + i * 3, 28 + i * 3],
											[0, target],
											clamp
										);
										return (
											<div
												key={i}
												style={{
													height: rise,
													borderRadius: 10,
													backgroundColor: b.color,
													border:
														b.color === '#E5E1DA'
															? '2px solid #E76F51'
															: 'none',
													boxShadow:
														'8px 8px 0 rgba(0,0,0,0.08)',
													transform: `translateY(${Math.sin(frame * 0.09 + i * 0.7) * 2}px)`,
												}}
											/>
										);
									})}
								</div>

								{/* stepped bars */}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 10,
										marginTop: 16,
									}}
								>
									{[
										{label: 'Flow', value: bar1, color: '#2A9D8F'},
										{label: 'Split', value: bar2, color: '#E9C46A'},
										{label: 'Net', value: bar3, color: '#E76F51'},
									].map((item, i) => (
										<div
											key={item.label}
											style={{
												display: 'grid',
												gridTemplateColumns: '54px 1fr',
												alignItems: 'center',
												gap: 10,
											}}
										>
											<div
												style={{
													color: '#E5E1DA',
													fontSize: 11,
													fontWeight: 800,
													letterSpacing: 1.6,
													textTransform: 'uppercase',
												}}
											>
												{item.label}
											</div>
											<div
												style={{
													height: 16,
													backgroundColor: 'rgba(229,225,218,0.14)',
													borderRadius: 999,
													overflow: 'hidden',
												}}
											>
												<div
													style={{
														width: `${item.value * 100}%`,
														height: '100%',
														backgroundColor: item.color,
														borderRadius: 999,
														transform: `translateX(${Math.sin(frame * 0.05 + i) * 1}px)`,
													}}
												/>
											</div>
										</div>
									))}
								</div>

								{/* tiny traffic */}
								<div
									style={{
										position: 'relative',
										height: 44,
										marginTop: 16,
										backgroundColor: 'rgba(229,225,218,0.06)',
										borderRadius: 14,
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 16,
											right: 16,
											top: 21,
											height: 2,
											backgroundColor: 'rgba(229,225,218,0.28)',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 18 + trafficA,
											top: 16,
											width: 18,
											height: 10,
											borderRadius: 6,
											backgroundColor: '#E76F51',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 18 + trafficB,
											top: 8,
											width: 14,
											height: 8,
											borderRadius: 5,
											backgroundColor: '#2A9D8F',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 18 + trafficC,
											top: 24,
											width: 16,
											height: 8,
											borderRadius: 5,
											backgroundColor: '#E9C46A',
										}}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#E76F51',
						border: '3px solid #264653',
						borderRadius: 20,
						padding: '16px 30px',
						boxShadow: '0 10px 24px rgba(38,70,83,0.16)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#E5E1DA',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.2,
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