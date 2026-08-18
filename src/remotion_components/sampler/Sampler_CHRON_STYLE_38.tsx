import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_38() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames, width, height} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardEntrance = spring({
		frame: frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.7},
	});

	const takeawayEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	// ------------------------------------------
	// Beat 2: Active metric transformation
	// ------------------------------------------
	const metricNumber = Math.round(interpolate(frame, [16, 58], [12, 50], clamp));
	const metricText = `${metricNumber}% COMMISSION`;

	const commissionGlow = interpolate(frame, [22, 42, 58], [0.7, 1.2, 1], clamp);
	const panelPulse = interpolate(frame, [28, 40, 52], [1, 1.02, 1], clamp);

	// ------------------------------------------
	// Beat 3: Continuous living loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 0.9) * 3;
	const pushIn = interpolate(frame, [0, durationInFrames - 1], [1, 1.03], clamp);

	const shineOffset = interpolate((frame + 16) % 72, [0, 72], [-260, 980], clamp);
	const blindSweep = interpolate((frame + 8) % 90, [0, 90], [-500, width + 500], clamp);

	// ------------------------------------------
	// Neon / flicker behavior
	// ------------------------------------------
	const flickerA =
		frame === 6 || frame === 8 || frame === 11 ? 0.45 : frame === 13 ? 0.75 : 1;
	const flickerB =
		frame === 18 || frame === 20 || frame === 21 ? 0.65 : frame === 23 ? 0.85 : 1;

	const neonHeadlineGlow = (0.9 + Math.sin(frame * 0.22) * 0.08) * flickerA;
	const neonMetricGlow = (1 + Math.sin(frame * 0.18 + 0.6) * 0.1) * flickerB;

	// ------------------------------------------
	// Rain parallax layers
	// ------------------------------------------
	const rainFastY = (frame * 22) % (height + 200);
	const rainMidY = (frame * 14) % (height + 200);
	const rainSlowY = (frame * 8) % (height + 200);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -60],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const rainLine = (
		x: number,
		y: number,
		len: number,
		opacityValue: number,
		color: string,
		strokeWidth: number
	) => (
		<line
			x1={x}
			y1={y}
			x2={x - 18}
			y2={y + len}
			stroke={color}
			strokeWidth={strokeWidth}
			strokeOpacity={opacityValue}
			strokeLinecap="round"
		/>
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0A0C12',
				fontFamily:
					'"Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif',
				opacity,
				overflow: 'hidden',
			}}
		>
			{/* Background push-in */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `scale(${pushIn}) translateY(${exitY}px)`,
				}}
			>
				{/* Noir district vignette */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'radial-gradient(circle at 50% 42%, rgba(90,99,120,0.16) 0%, rgba(10,12,18,0) 38%), radial-gradient(circle at 50% 120%, rgba(255,60,172,0.08) 0%, rgba(10,12,18,0) 42%)',
					}}
				/>

				{/* Procedural rain: slow */}
				<svg
					style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
					width={width}
					height={height}
				>
					<g transform={`translate(0, ${rainSlowY - 180})`}>
						{rainLine(90, 0, 80, 0.14, '#5A6378', 1)}
						{rainLine(220, 120, 72, 0.13, '#5A6378', 1)}
						{rainLine(360, 40, 88, 0.12, '#5A6378', 1)}
						{rainLine(520, 160, 76, 0.13, '#5A6378', 1)}
						{rainLine(700, 20, 92, 0.12, '#5A6378', 1)}
						{rainLine(900, 110, 78, 0.14, '#5A6378', 1)}
						{rainLine(1080, 10, 86, 0.12, '#5A6378', 1)}
						{rainLine(1180, 150, 72, 0.11, '#5A6378', 1)}
					</g>
				</svg>

				{/* Procedural rain: mid */}
				<svg
					style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
					width={width}
					height={height}
				>
					<g transform={`translate(0, ${rainMidY - 180})`}>
						{rainLine(130, 40, 92, 0.22, '#00E5FF', 1.2)}
						{rainLine(280, 140, 84, 0.18, '#5A6378', 1.1)}
						{rainLine(430, 10, 96, 0.2, '#00E5FF', 1.2)}
						{rainLine(590, 100, 88, 0.2, '#5A6378', 1.1)}
						{rainLine(760, 30, 98, 0.18, '#00E5FF', 1.2)}
						{rainLine(930, 150, 80, 0.2, '#5A6378', 1.1)}
						{rainLine(1040, 60, 90, 0.18, '#00E5FF', 1.2)}
						{rainLine(1210, 0, 94, 0.18, '#5A6378', 1.1)}
					</g>
				</svg>

				{/* Procedural rain: fast */}
				<svg
					style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}
					width={width}
					height={height}
				>
					<g transform={`translate(0, ${rainFastY - 200})`}>
						{rainLine(60, 0, 100, 0.28, '#00E5FF', 1.4)}
						{rainLine(200, 90, 110, 0.22, '#FFA62B', 1.3)}
						{rainLine(340, 10, 104, 0.26, '#00E5FF', 1.4)}
						{rainLine(490, 120, 100, 0.22, '#FFA62B', 1.3)}
						{rainLine(650, 20, 114, 0.24, '#00E5FF', 1.4)}
						{rainLine(820, 130, 98, 0.22, '#FFA62B', 1.3)}
						{rainLine(980, 0, 110, 0.25, '#00E5FF', 1.4)}
						{rainLine(1140, 100, 96, 0.22, '#FFA62B', 1.3)}
					</g>
				</svg>

				{/* Blind-shadow sweep */}
				<div
					style={{
						position: 'absolute',
						top: -40,
						bottom: -40,
						left: blindSweep,
						width: 220,
						transform: 'skewX(-18deg)',
						background:
							'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.22) 30%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.18) 72%, rgba(0,0,0,0) 100%)',
						pointerEvents: 'none',
						mixBlendMode: 'multiply',
					}}
				/>
			</div>

			{/* Main 3-tier layout */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '26px 22px',
					boxSizing: 'border-box',
				}}
			>
				<div
					style={{
						width: '94%',
						maxWidth: 1180,
						height: '90%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-between',
						transform: `translateY(${exitY}px)`,
					}}
				>
					{/* Tier 1: Category badge */}
					<div
						style={{
							transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
							background: 'rgba(18,22,32,0.92)',
							border: '2px solid #5A6378',
							borderRadius: 14,
							padding: '12px 26px',
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							boxShadow:
								'0 0 0 1px rgba(0,229,255,0.14), 0 10px 28px rgba(0,0,0,0.45), 0 0 18px rgba(0,229,255,0.12)',
						}}
					>
						<div
							style={{
								width: 10,
								height: 10,
								borderRadius: '50%',
								backgroundColor: '#00E5FF',
								boxShadow: '0 0 10px #00E5FF, 0 0 20px rgba(0,229,255,0.5)',
							}}
						/>
						<div
							style={{
								color: '#00E5FF',
								fontSize: 18,
								fontWeight: 800,
								letterSpacing: 3.6,
								textTransform: 'uppercase',
								fontFamily:
									'"SFMono-Regular", "Roboto Mono", "Menlo", monospace',
							}}
						>
							CASE FILE / REVENUE SYSTEM
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
							margin: '24px 0',
							position: 'relative',
							transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 540,
								background:
									'linear-gradient(180deg, rgba(22,26,38,0.96) 0%, rgba(14,17,26,0.98) 100%)',
								border: '3px solid #5A6378',
								borderRadius: 34,
								boxSizing: 'border-box',
								padding: '40px 38px 34px 38px',
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								boxShadow:
									'0 0 0 1px rgba(255,255,255,0.03), 0 24px 50px rgba(0,0,0,0.58), 0 0 30px rgba(0,229,255,0.08)',
							}}
						>
							{/* Top neon edge */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 34,
									right: 34,
									height: 2,
									background:
										'linear-gradient(90deg, rgba(0,229,255,0) 0%, rgba(0,229,255,0.95) 20%, rgba(255,60,172,0.95) 80%, rgba(255,60,172,0) 100%)',
									boxShadow:
										'0 0 12px rgba(0,229,255,0.65), 0 0 16px rgba(255,60,172,0.35)',
								}}
							/>

							{/* Traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									width: 120,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 100%)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Interior frame accents */}
							<div
								style={{
									position: 'absolute',
									top: 18,
									left: 18,
									right: 18,
									bottom: 18,
									border: '1px solid rgba(90,99,120,0.38)',
									borderRadius: 24,
									pointerEvents: 'none',
								}}
							/>

							{/* Hero content */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 26,
									flex: 1,
									textAlign: 'center',
								}}
							>
								{/* Script accent */}
								<div
									style={{
										color: '#FF3CAC',
										fontSize: 34,
										fontStyle: 'italic',
										fontWeight: 700,
										lineHeight: 1,
										letterSpacing: 1,
										fontFamily:
											'"Brush Script MT", "Segoe Script", "Snell Roundhand", cursive',
										textShadow:
											`0 0 10px rgba(255,60,172,${0.45 * flickerA}), 0 0 22px rgba(255,60,172,${0.26 * flickerA})`,
									}}
								>
									after dark
								</div>

								{/* Headline */}
								<div
									style={{
										maxWidth: 920,
										color: '#00E5FF',
										fontSize: 72,
										fontWeight: 900,
										lineHeight: 0.96,
										letterSpacing: 1.4,
										textTransform: 'uppercase',
										fontStretch: 'condensed',
										textShadow: `0 0 10px rgba(0,229,255,${0.55 * neonHeadlineGlow}), 0 0 26px rgba(0,229,255,${0.22 * neonHeadlineGlow})`,
									}}
								>
									AUTOMATED MARGINS
								</div>

								{/* Metric panel */}
								<div
									style={{
										transform: `scale(${panelPulse})`,
										background: 'rgba(10,12,18,0.92)',
										border: '3px solid #FFA62B',
										borderRadius: 28,
										padding: '18px 30px 16px 30px',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 10,
										boxShadow:
											`0 0 0 1px rgba(255,166,43,0.18), 0 10px 26px rgba(0,0,0,0.46), 0 0 ${16 * commissionGlow}px rgba(255,166,43,0.26)`,
									}}
								>
									<div
										style={{
											color: '#5A6378',
											fontSize: 16,
											fontWeight: 700,
											letterSpacing: 3.2,
											textTransform: 'uppercase',
											fontFamily:
												'"SFMono-Regular", "Roboto Mono", "Menlo", monospace',
										}}
									>
										COMMISSION OUTPUT
									</div>

									<div
										style={{
											color: '#FFA62B',
											fontSize: 68,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: 1,
											textTransform: 'uppercase',
											textShadow: `0 0 10px rgba(255,166,43,${0.5 * neonMetricGlow}), 0 0 24px rgba(255,166,43,${0.25 * neonMetricGlow})`,
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>

								{/* Lower case-file strip */}
								<div
									style={{
										background: 'rgba(0,229,255,0.1)',
										border: '1.5px solid rgba(0,229,255,0.42)',
										borderRadius: 12,
										padding: '10px 22px',
										color: '#00E5FF',
										fontSize: 18,
										fontWeight: 800,
										letterSpacing: 2.8,
										textTransform: 'uppercase',
										fontFamily:
											'"SFMono-Regular", "Roboto Mono", "Menlo", monospace',
										boxShadow: '0 0 18px rgba(0,229,255,0.1)',
									}}
								>
									PROCEDURAL PROFIT STACK
								</div>
							</div>
						</div>
					</div>

					{/* Tier 3: Takeaway */}
					<div
						style={{
							transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
							background:
								'linear-gradient(90deg, rgba(255,60,172,0.95) 0%, rgba(255,166,43,0.95) 100%)',
							borderRadius: 18,
							padding: '16px 30px',
							boxShadow:
								'0 10px 24px rgba(0,0,0,0.42), 0 0 22px rgba(255,60,172,0.18)',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								color: '#0A0C12',
								fontSize: 22,
								fontWeight: 900,
								letterSpacing: 2.4,
								textTransform: 'uppercase',
							}}
						>
							PURE SOFTWARE LEVERAGE
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}