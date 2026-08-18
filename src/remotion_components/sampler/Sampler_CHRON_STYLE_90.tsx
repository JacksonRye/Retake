import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_90() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});
	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 14, stiffness: 220, mass: 0.7},
	});
	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.65},
	});

	// Beat 2: active state switch / rolling counter
	const metricReveal = interpolate(frame, [18, 42], [0, 1], clamp);
	const metricBoxScale = interpolate(frame, [20, 34, 44], [0.92, 1.05, 1], clamp);
	const rollingNumber = Math.round(interpolate(frame, [16, 56], [12, 50], clamp));
	const commissionText = `${rollingNumber}% COMMISSION`;

	// Mechanical motion
	const gear1 = frame * 3.8;
	const gear2 = -frame * 5.1;
	const gear3 = frame * 2.8;
	const balanceWheel = Math.sin(frame * 0.28) * 18;
	const explodedSpread = interpolate(frame, [0, 18, 44], [42, 0, 0], clamp);

	// Beat 3: continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-260, 940], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -40],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#14151A',
				opacity,
				fontFamily:
					'Inter, "Helvetica Neue", Arial, sans-serif',
				color: '#BFC5CE',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '54px 0 46px 0',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: 'rgba(184, 242, 201, 0.08)',
						border: '2px solid #B8F2C9',
						borderRadius: 18,
						padding: '10px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(0,0,0,0.32)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: 999,
							backgroundColor: '#B76E79',
							boxShadow: '0 0 10px rgba(183,110,121,0.65)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 18,
							fontWeight: 300,
							letterSpacing: 4,
							textTransform: 'uppercase',
							color: '#BFC5CE',
						}}
					>
						Chron Caliber 90
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
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 548,
							backgroundColor: '#B8F2C9',
							borderRadius: 34,
							border: '3px solid rgba(20,21,26,0.82)',
							boxShadow: `0 ${shadowPulse}px 38px rgba(0,0,0,0.45)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '34px 34px 30px 34px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateRows: 'auto 1fr auto',
							rowGap: 20,
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -30,
								bottom: -30,
								width: 120,
								background:
									'linear-gradient(180deg, rgba(255,255,255,0), rgba(255,255,255,0.28), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Engraved top serial row */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", Menlo, Consolas, monospace',
									fontSize: 14,
									fontWeight: 500,
									letterSpacing: 2.4,
									color: '#9B111E',
									opacity: 0.9,
								}}
							>
								CAL-90 / REF 050
							</div>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", Menlo, Consolas, monospace',
									fontSize: 14,
									fontWeight: 500,
									letterSpacing: 2.4,
									color: '#9B111E',
									opacity: 0.9,
								}}
							>
								SER. 314159
							</div>
						</div>

						{/* Main composition */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.25fr 0.95fr',
								columnGap: 26,
								alignItems: 'stretch',
								position: 'relative',
								zIndex: 2,
							}}
						>
							{/* Left text block */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									padding: '14px 0 10px 2px',
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 18,
									}}
								>
									<div
										style={{
											fontSize: 72,
											lineHeight: 0.96,
											fontWeight: 300,
											letterSpacing: -1.8,
											textTransform: 'uppercase',
											color: '#14151A',
											maxWidth: 430,
										}}
									>
										AUTOMATED
										<br />
										MARGINS
									</div>

									<div
										style={{
											width: 86,
											height: 3,
											backgroundColor: '#B76E79',
											borderRadius: 999,
										}}
									/>
								</div>

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 12,
										alignItems: 'flex-start',
									}}
								>
									<div
										style={{
											fontFamily:
												'"SFMono-Regular", Menlo, Consolas, monospace',
											fontSize: 13,
											letterSpacing: 2.2,
											textTransform: 'uppercase',
											color: '#9B111E',
										}}
									>
										Output ratio
									</div>

									<div
										style={{
											backgroundColor: '#14151A',
											border: '2px solid #9B111E',
											borderRadius: 24,
											padding: '16px 24px 14px 24px',
											transform: `scale(${metricBoxScale})`,
											boxShadow: `0 8px 24px rgba(155,17,30,${0.18 + metricReveal * 0.16})`,
										}}
									>
										<div
											style={{
												fontFamily:
													'"SFMono-Regular", Menlo, Consolas, monospace',
												fontSize: 54,
												lineHeight: 1,
												fontWeight: 700,
												letterSpacing: -1.2,
												color: '#BFC5CE',
												whiteSpace: 'nowrap',
											}}
										>
											{commissionText}
										</div>
									</div>
								</div>
							</div>

							{/* Right mechanism panel */}
							<div
								style={{
									position: 'relative',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									minHeight: 310,
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										border: '2px solid rgba(20,21,26,0.18)',
										borderRadius: 24,
										background:
											'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))',
									}}
								/>

								<svg
									width="100%"
									height="100%"
									viewBox="0 0 300 300"
									style={{
										position: 'relative',
										zIndex: 2,
										overflow: 'visible',
									}}
								>
									{/* fixed rails / exploded guides */}
									<line
										x1={55 - explodedSpread}
										y1="74"
										x2="110"
										y2="118"
										stroke="#9B111E"
										strokeWidth="2"
										opacity="0.45"
									/>
									<line
										x1={246 + explodedSpread}
										y1="88"
										x2="196"
										y2="136"
										stroke="#9B111E"
										strokeWidth="2"
										opacity="0.45"
									/>
									<line
										x1="156"
										y1={236 + explodedSpread}
										x2="156"
										y2="190"
										stroke="#9B111E"
										strokeWidth="2"
										opacity="0.45"
									/>

									{/* exploded components */}
									<g transform={`translate(${-explodedSpread}, ${-explodedSpread * 0.65})`}>
										<g transform="translate(98 108)">
											<g transform={`rotate(${gear1})`}>
												<circle
													r="42"
													fill="none"
													stroke="#14151A"
													strokeWidth="8"
												/>
												{Array.from({length: 12}).map((_, i) => {
													const a = (i / 12) * Math.PI * 2;
													const x1 = Math.cos(a) * 42;
													const y1 = Math.sin(a) * 42;
													const x2 = Math.cos(a) * 54;
													const y2 = Math.sin(a) * 54;
													return (
														<line
															key={i}
															x1={x1}
															y1={y1}
															x2={x2}
															y2={y2}
															stroke="#14151A"
															strokeWidth="6"
															strokeLinecap="round"
														/>
													);
												})}
												<circle r="12" fill="#B76E79" />
											</g>
										</g>
									</g>

									<g transform={`translate(${explodedSpread}, ${-explodedSpread * 0.3})`}>
										<g transform="translate(192 128)">
											<g transform={`rotate(${gear2})`}>
												<circle
													r="34"
													fill="none"
													stroke="#9B111E"
													strokeWidth="7"
												/>
												{Array.from({length: 10}).map((_, i) => {
													const a = (i / 10) * Math.PI * 2;
													const x1 = Math.cos(a) * 34;
													const y1 = Math.sin(a) * 34;
													const x2 = Math.cos(a) * 44;
													const y2 = Math.sin(a) * 44;
													return (
														<line
															key={i}
															x1={x1}
															y1={y1}
															x2={x2}
															y2={y2}
															stroke="#9B111E"
															strokeWidth="5"
															strokeLinecap="round"
														/>
													);
												})}
												<circle r="9" fill="#14151A" />
											</g>
										</g>
									</g>

									<g transform={`translate(0, ${explodedSpread})`}>
										<g transform="translate(156 204)">
											<g transform={`rotate(${gear3})`}>
												<circle
													r="24"
													fill="none"
													stroke="#14151A"
													strokeWidth="6"
												/>
												{Array.from({length: 8}).map((_, i) => {
													const a = (i / 8) * Math.PI * 2;
													const x1 = Math.cos(a) * 24;
													const y1 = Math.sin(a) * 24;
													const x2 = Math.cos(a) * 31;
													const y2 = Math.sin(a) * 31;
													return (
														<line
															key={i}
															x1={x1}
															y1={y1}
															x2={x2}
															y2={y2}
															stroke="#14151A"
															strokeWidth="4"
															strokeLinecap="round"
														/>
													);
												})}
												<circle r="7" fill="#B76E79" />
											</g>
										</g>
									</g>

									{/* balance wheel */}
									<g transform="translate(234 212)">
										<g transform={`rotate(${balanceWheel})`}>
											<circle
												r="28"
												fill="none"
												stroke="#B76E79"
												strokeWidth="5"
											/>
											<line
												x1="-22"
												y1="0"
												x2="22"
												y2="0"
												stroke="#B76E79"
												strokeWidth="4"
											/>
											<line
												x1="0"
												y1="-22"
												x2="0"
												y2="22"
												stroke="#B76E79"
												strokeWidth="4"
											/>
											<circle r="6" fill="#9B111E" />
										</g>
									</g>

									{/* tiny jewel accents */}
									<circle cx="72" cy="220" r="5" fill="#9B111E" opacity="0.9" />
									<circle cx="226" cy="78" r="5" fill="#9B111E" opacity="0.9" />
								</svg>
							</div>
						</div>

						{/* Bottom engraved row inside card */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								position: 'relative',
								zIndex: 2,
								paddingTop: 4,
							}}
						>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", Menlo, Consolas, monospace',
									fontSize: 12,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									color: '#14151A',
									opacity: 0.7,
								}}
							>
								Thin precision system
							</div>
							<div
								style={{
									fontFamily:
										'"SFMono-Regular", Menlo, Consolas, monospace',
									fontSize: 12,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									color: '#14151A',
									opacity: 0.7,
								}}
							>
								Micro engraved layout
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#B76E79',
						borderRadius: 18,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.32)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 700,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							color: '#14151A',
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