import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_69() {
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
		frame: frame - 6,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// Beat 2: Teletext page/metric activity
	const pageRoll = Math.round(interpolate(frame, [0, 28], [63, 69], clamp));
	const metricReveal = frame >= 30;
	const metricFlash = frame >= 30 && frame <= 48 && frame % 6 < 3;
	const commissionValue = Math.round(interpolate(frame, [30, 60], [12, 50], clamp));

	// Beat 3: Living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 10) % 72, [0, 72], [-280, 980], clamp);

	// Teletext row redraws
	const headerRows = Math.floor(interpolate(frame, [8, 26], [0, 6], clamp));
	const cardRows = Math.floor(interpolate(frame, [14, 44], [0, 10], clamp));
	const bottomRows = Math.floor(interpolate(frame, [18, 38], [0, 4], clamp));

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -60],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const teletextFont =
		'"Courier New", "Lucida Console", Monaco, Menlo, Consolas, monospace';

	const rowOn = (index: number, activeRows: number) => index < activeRows;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#000000',
				opacity,
				fontFamily: teletextFont,
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
					padding: '42px 12px 30px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FF0000',
						border: '4px solid #FFFF00',
						borderRadius: 6,
						padding: '12px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 18,
						boxShadow: '0 8px 22px rgba(255,0,0,0.35)',
					}}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 10px)',
							gridTemplateRows: 'repeat(2, 10px)',
							gap: 4,
						}}
					>
						<div style={{width: 10, height: 10, backgroundColor: '#00FFFF'}} />
						<div style={{width: 10, height: 10, backgroundColor: '#FFFF00'}} />
						<div style={{width: 10, height: 10, backgroundColor: '#00FF00'}} />
						<div style={{width: 10, height: 10, backgroundColor: '#00FFFF'}} />
					</div>

					<div
						style={{
							color: '#000000',
							backgroundColor: '#FFFF00',
							padding: '6px 12px',
							borderRadius: 2,
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2,
							lineHeight: 1,
						}}
					>
						P{String(pageRoll).padStart(2, '0')}
					</div>

					<div
						style={{
							color: '#FFFF00',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							lineHeight: 1,
						}}
					>
						TELETEXT VALUE
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
						margin: '24px 0',
						position: 'relative',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 540,
							backgroundColor: '#FF0000',
							border: '6px solid #FFFF00',
							borderRadius: 10,
							boxSizing: 'border-box',
							padding: '26px 26px 22px',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 34px rgba(255,0,0,0.28)`,
							display: 'flex',
							flexDirection: 'column',
							gap: 18,
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 110,
								backgroundColor: 'rgba(0,255,255,0.22)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Header strip */}
						<div
							style={{
								height: 74,
								backgroundColor: '#000000',
								border: '4px solid #00FFFF',
								borderRadius: 4,
								display: 'grid',
								gridTemplateColumns: '84px 1fr 84px',
								alignItems: 'stretch',
								overflow: 'hidden',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#FFFF00',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#000000',
									fontSize: 22,
									fontWeight: 900,
									letterSpacing: 2,
								}}
							>
								69
							</div>

							<div
								style={{
									padding: '10px 20px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									gap: 4,
									position: 'relative',
								}}
							>
								{[0, 1, 2, 3, 4, 5].map((i) => (
									<div
										key={i}
										style={{
											height: 6,
											width: rowOn(i, headerRows) ? '100%' : '0%',
											backgroundColor: i % 2 === 0 ? '#FFFF00' : '#00FF00',
											transition: 'none',
										}}
									/>
								))}
							</div>

							<div
								style={{
									backgroundColor: metricFlash ? '#00FFFF' : '#00FF00',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#000000',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 1,
								}}
							>
								LIVE
							</div>
						</div>

						{/* Massive headline */}
						<div
							style={{
								backgroundColor: '#000000',
								border: '4px solid #FFFF00',
								borderRadius: 4,
								padding: '24px 28px',
								minHeight: 166,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									position: 'absolute',
									left: 16,
									top: 16,
									display: 'grid',
									gridTemplateColumns: 'repeat(3, 10px)',
									gridTemplateRows: 'repeat(3, 10px)',
									gap: 3,
								}}
							>
								{new Array(9).fill(true).map((_, i) => (
									<div
										key={i}
										style={{
											width: 10,
											height: 10,
											backgroundColor:
												i % 3 === 0 ? '#00FFFF' : i % 2 === 0 ? '#00FF00' : '#FFFF00',
										}}
									/>
								))}
							</div>

							<div
								style={{
									position: 'absolute',
									right: 16,
									bottom: 16,
									display: 'grid',
									gridTemplateColumns: 'repeat(3, 10px)',
									gridTemplateRows: 'repeat(3, 10px)',
									gap: 3,
								}}
							>
								{new Array(9).fill(true).map((_, i) => (
									<div
										key={i}
										style={{
											width: 10,
											height: 10,
											backgroundColor:
												i % 3 === 1 ? '#00FFFF' : i % 2 === 0 ? '#FFFF00' : '#00FF00',
										}}
									/>
								))}
							</div>

							<div
								style={{
									color: '#FFFF00',
									fontSize: 72,
									fontWeight: 900,
									lineHeight: 0.96,
									letterSpacing: -2,
									textAlign: 'center',
									textTransform: 'uppercase',
									maxWidth: '88%',
								}}
							>
								AUTOMATED
								<br />
								MARGINS
							</div>
						</div>

						{/* Metric board */}
						<div
							style={{
								backgroundColor: '#000000',
								border: '4px solid #00FFFF',
								borderRadius: 4,
								padding: '24px 26px',
								minHeight: 156,
								display: 'grid',
								gridTemplateColumns: '1fr',
								gridTemplateRows: 'repeat(10, 1fr)',
								gap: 6,
								position: 'relative',
								zIndex: 2,
							}}
						>
							{new Array(10).fill(true).map((_, i) => (
								<div
									key={i}
									style={{
										backgroundColor: rowOn(i, cardRows)
											? i === 4 || i === 5
												? '#00FFFF'
												: '#00FF00'
											: 'transparent',
										opacity: rowOn(i, cardRows) ? 0.18 : 0,
										borderRadius: 1,
									}}
								/>
							))}

							<div
								style={{
									position: 'absolute',
									inset: 0,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 8,
									padding: '18px',
								}}
							>
								<div
									style={{
										color: metricReveal ? '#FFFF00' : '#000000',
										fontSize: 82,
										fontWeight: 900,
										lineHeight: 0.9,
										letterSpacing: -2,
										textAlign: 'center',
										textTransform: 'uppercase',
										backgroundColor: metricFlash ? '#00FFFF' : 'transparent',
										padding: metricFlash ? '4px 10px' : '0px',
										borderRadius: 2,
									}}
								>
									{commissionValue}%
								</div>

								<div
									style={{
										color: '#00FF00',
										fontSize: 34,
										fontWeight: 900,
										lineHeight: 1,
										letterSpacing: 2,
										textAlign: 'center',
										textTransform: 'uppercase',
									}}
								>
									COMMISSION
								</div>
							</div>
						</div>

						{/* Footer status strip inside card */}
						<div
							style={{
								height: 72,
								backgroundColor: '#000000',
								border: '4px solid #00FF00',
								borderRadius: 4,
								display: 'grid',
								gridTemplateColumns: '120px 1fr 120px',
								alignItems: 'center',
								padding: '0 14px',
								boxSizing: 'border-box',
								gap: 14,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#000000',
									backgroundColor: '#FFFF00',
									fontSize: 20,
									fontWeight: 900,
									letterSpacing: 2,
									height: 38,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 2,
								}}
							>
								GAIN
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 8,
									height: 16,
								}}
							>
								{new Array(12).fill(true).map((_, i) => (
									<div
										key={i}
										style={{
											flex: 1,
											height: '100%',
											backgroundColor: rowOn(Math.floor(i / 3), bottomRows)
												? i % 2 === 0
													? '#00FFFF'
													: '#00FF00'
												: '#220000',
											borderRadius: 1,
										}}
									/>
								))}
							</div>

							<div
								style={{
									color: '#000000',
									backgroundColor: metricFlash ? '#00FFFF' : '#00FF00',
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 1,
									height: 38,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 2,
								}}
							>
								ON
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#FFFF00',
						border: '4px solid #FF0000',
						borderRadius: 6,
						padding: '16px 30px',
						boxShadow: '0 8px 24px rgba(255,255,0,0.28)',
						display: 'flex',
						alignItems: 'center',
						gap: 18,
					}}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(2, 12px)',
							gridTemplateRows: 'repeat(2, 12px)',
							gap: 4,
						}}
					>
						<div style={{width: 12, height: 12, backgroundColor: '#FF0000'}} />
						<div style={{width: 12, height: 12, backgroundColor: '#00FFFF'}} />
						<div style={{width: 12, height: 12, backgroundColor: '#00FF00'}} />
						<div style={{width: 12, height: 12, backgroundColor: '#FF0000'}} />
					</div>

					<div
						style={{
							color: '#000000',
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 2,
							lineHeight: 1,
							textAlign: 'center',
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