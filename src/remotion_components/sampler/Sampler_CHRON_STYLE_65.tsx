import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_65() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const heroEntrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const takeawayEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// Beat 2: Active metric roll
	const commissionValue = Math.round(interpolate(frame, [12, 58], [8, 50], clamp));
	const metricMain = `${commissionValue}%`;
	const metricSub = 'COMMISSION';

	// Beat 3: Continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shineOffset = interpolate((frame + 14) % 72, [0, 72], [-260, 1100], clamp);

	// Contour ring animation
	const contourProgress = interpolate(frame, [0, 90], [0, 1], clamp);
	const dashProgress = interpolate(frame, [14, 72], [0, 1], clamp);
	const summitPulse = 1 + Math.sin(frame * 0.16) * 0.04;

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -50], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const rings = [1, 2, 3, 4, 5, 6];
	const dashLength = 1200;
	const dashOffset = dashLength - dashLength * dashProgress;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#EFEAD8',
				opacity,
				fontFamily:
					'"Georgia", "Times New Roman", serif',
				color: '#8C6239',
				overflow: 'hidden',
			}}
		>
			{/* Full screen topo background */}
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 1920 1080"
				style={{
					position: 'absolute',
					inset: 0,
				}}
			>
				{rings.map((r, i) => {
					const scale = 0.72 + r * 0.16 + contourProgress * 0.1;
					const opacityRing = 0.14 + i * 0.04;
					return (
						<ellipse
							key={r}
							cx="960"
							cy="540"
							rx={420 * scale}
							ry={170 * scale}
							fill="none"
							stroke={i % 2 === 0 ? '#8C6239' : '#708A58'}
							strokeWidth={i === 2 ? 4 : 3}
							strokeOpacity={opacityRing}
							strokeDasharray="18 14"
							strokeDashoffset={-frame * (0.8 + i * 0.15)}
						/>
					);
				})}

				<path
					d="M180 795 C 380 700, 620 730, 860 680 S 1360 560, 1720 680"
					fill="none"
					stroke="#5B8DB8"
					strokeWidth="4"
					strokeLinecap="round"
					strokeDasharray={dashLength}
					strokeDashoffset={dashOffset}
					strokeOpacity="0.75"
				/>
				<path
					d="M240 310 C 420 250, 620 280, 810 230 S 1180 150, 1560 250"
					fill="none"
					stroke="#708A58"
					strokeWidth="3"
					strokeLinecap="round"
					strokeDasharray={dashLength}
					strokeDashoffset={dashOffset + 160}
					strokeOpacity="0.55"
				/>
			</svg>

			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 18px 48px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
					zIndex: 2,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: 'rgba(239,234,216,0.96)',
						border: '3px solid #8C6239',
						borderRadius: 18,
						padding: '12px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(140,98,57,0.12)',
					}}
				>
					<div
						style={{
							color: '#5B8DB8',
							fontSize: 20,
							lineHeight: 1,
							fontWeight: 700,
						}}
					>
						▲
					</div>
					<div
						style={{
							color: '#8C6239',
							fontSize: 21,
							fontStyle: 'italic',
							fontWeight: 700,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
						}}
					>
						Contour Value Map
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
						transform: `scale(${heroEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#C0452A',
							border: '4px solid #8C6239',
							borderRadius: 34,
							boxSizing: 'border-box',
							padding: '42px 42px 34px',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${18 + Math.sin(frame * 0.18) * 4}px 36px rgba(140,98,57,0.25)`,
							display: 'grid',
							gridTemplateRows: 'auto auto 1fr auto',
							rowGap: 20,
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(239,234,216,0) 0%, rgba(239,234,216,0.22) 50%, rgba(239,234,216,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Internal topo lines safely behind content */}
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 1600 900"
							style={{
								position: 'absolute',
								inset: 0,
								pointerEvents: 'none',
								opacity: 0.32,
							}}
						>
							<ellipse
								cx="800"
								cy="430"
								rx={210 * summitPulse}
								ry={88 * summitPulse}
								fill="none"
								stroke="#EFEAD8"
								strokeWidth="3"
							/>
							<ellipse
								cx="800"
								cy="430"
								rx={300 * summitPulse}
								ry={128 * summitPulse}
								fill="none"
								stroke="#EFEAD8"
								strokeWidth="3"
								strokeDasharray="16 12"
							/>
							<ellipse
								cx="800"
								cy="430"
								rx={396 * summitPulse}
								ry={168 * summitPulse}
								fill="none"
								stroke="#708A58"
								strokeWidth="3"
								strokeOpacity="0.75"
							/>
						</svg>

						{/* Top meta row */}
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
									backgroundColor: '#EFEAD8',
									color: '#8C6239',
									borderRadius: 14,
									padding: '10px 16px',
									fontSize: 20,
									fontStyle: 'italic',
									fontWeight: 700,
									letterSpacing: 1,
									maxWidth: 340,
								}}
							>
								Summit label
							</div>

							<div
								style={{
									backgroundColor: 'rgba(239,234,216,0.92)',
									color: '#5B8DB8',
									border: '2px solid #5B8DB8',
									borderRadius: 14,
									padding: '10px 16px',
									fontSize: 20,
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									fontWeight: 800,
									letterSpacing: 1.5,
								}}
							>
								ELV 2050
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								textAlign: 'center',
								color: '#EFEAD8',
								fontSize: 72,
								lineHeight: 1.02,
								fontWeight: 900,
								letterSpacing: -1.5,
								textTransform: 'uppercase',
								padding: '0 50px',
								textShadow: '0 2px 0 rgba(140,98,57,0.18)',
							}}
						>
							AUTOMATED MARGINS
						</div>

						{/* Metric zone */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#EFEAD8',
									border: '4px solid #5B8DB8',
									borderRadius: 30,
									padding: '24px 42px 22px',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									minWidth: 600,
									boxShadow: '0 10px 26px rgba(91,141,184,0.18)',
								}}
							>
								<div
									style={{
										color: '#8C6239',
										fontSize: 84,
										lineHeight: 1,
										fontWeight: 900,
										letterSpacing: -2,
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
									}}
								>
									{metricMain}
								</div>
								<div
									style={{
										marginTop: 8,
										color: '#708A58',
										fontSize: 28,
										lineHeight: 1.1,
										fontWeight: 900,
										letterSpacing: 4,
										textTransform: 'uppercase',
									}}
								>
									{metricSub}
								</div>
							</div>
						</div>

						{/* Bottom in-card label */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#708A58',
									color: '#EFEAD8',
									borderRadius: 16,
									padding: '12px 24px',
									fontSize: 22,
									fontStyle: 'italic',
									fontWeight: 800,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								Trail gains plotted
							</div>
						</div>

						{/* Summit marker positioned away from text */}
						<div
							style={{
								position: 'absolute',
								left: 64,
								bottom: 52,
								width: 54,
								height: 54,
								borderRadius: 27,
								backgroundColor: '#5B8DB8',
								border: '4px solid #EFEAD8',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								color: '#EFEAD8',
								fontSize: 22,
								fontWeight: 900,
								zIndex: 2,
								transform: `scale(${1 + Math.sin(frame * 0.18) * 0.05})`,
							}}
						>
							▲
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#5B8DB8',
						border: '3px solid #8C6239',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(91,141,184,0.18)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#EFEAD8',
							fontSize: 24,
							fontWeight: 900,
							letterSpacing: 2.4,
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