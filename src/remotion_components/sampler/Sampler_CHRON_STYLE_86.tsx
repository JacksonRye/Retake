import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_86() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snappy entrance
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 260, mass: 0.55},
	});

	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 14, stiffness: 220, mass: 0.7},
	});

	const takeawayEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.6},
	});

	// Beat 2: active state / metric emphasis
	const metricReveal = spring({
		frame: frame - 16,
		fps,
		config: {damping: 12, stiffness: 180, mass: 0.8},
	});

	const commissionNumber = Math.round(interpolate(frame, [18, 54], [12, 50], clamp));
	const commissionDisplay = `${commissionNumber}%`;

	const bandPulse = frame >= 24 && frame <= 72;
	const pulseScale = bandPulse ? 1 + Math.sin(frame * 0.52) * 0.035 : 1;

	// Beat 3: continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shineOffset = interpolate((frame + 14) % 70, [0, 70], [-240, 980], clamp);

	// Outro
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -42],
		clamp
	);

	// Decorative waveform / meter values
	const waveformBars = new Array(18).fill(true).map((_, i) => {
		const base = 26 + ((i * 17) % 44);
		const live = Math.sin(frame * 0.18 + i * 0.7) * 18;
		return Math.max(14, Math.min(78, base + live));
	});

	const spectrumCols = new Array(26).fill(true).map((_, i) => {
		const intensity = 0.35 + ((Math.sin(frame * 0.22 + i * 0.45) + 1) / 2) * 0.65;
		return intensity;
	});

	const meterHeights = [0, 1, 2, 3, 4].map((i) => {
		const h = 34 + ((Math.sin(frame * 0.26 + i * 0.85) + 1) / 2) * 74;
		return h;
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#12141A',
				opacity,
				fontFamily:
					'"SFMono-Regular","Roboto Mono","IBM Plex Mono","Menlo","Consolas",monospace',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 940,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '54px 18px 30px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#12141A',
						border: '3px solid #5E2BFF',
						borderRadius: 16,
						padding: '12px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 26px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#FF7B9C',
							boxShadow: '0 0 16px rgba(255,123,156,0.65)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#BCE784',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
							fontFamily:
								'"Inter","Helvetica Neue","Arial",sans-serif',
						}}
					>
						86 WAVEFORM — SOUND LAB
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
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#FFC53D',
							border: '4px solid #5E2BFF',
							borderRadius: 34,
							boxShadow: `0 ${18 + Math.sin(frame * 0.18) * 4}px 42px rgba(0,0,0,0.45)`,
							padding: '34px 34px 28px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 20,
						}}
					>
						{/* shine */}
						<div
							style={{
								position: 'absolute',
								top: -30,
								bottom: -30,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.28), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top monitor strip */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1.3fr 1fr',
								gap: 18,
								alignItems: 'stretch',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#12141A',
									border: '3px solid #5E2BFF',
									borderRadius: 22,
									padding: '18px 18px 14px',
									display: 'flex',
									flexDirection: 'column',
									gap: 12,
									minHeight: 122,
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignItems: 'center',
									}}
								>
									<div
										style={{
											color: '#BCE784',
											fontSize: 14,
											fontWeight: 800,
											letterSpacing: 2,
											textTransform: 'uppercase',
											fontFamily:
												'"Inter","Helvetica Neue","Arial",sans-serif',
										}}
									>
										Waveform Scrub
									</div>
									<div
										style={{
											color: '#FF7B9C',
											fontSize: 13,
											fontWeight: 900,
											letterSpacing: 1.2,
										}}
									>
										LIVE
									</div>
								</div>

								<div
									style={{
										height: 68,
										display: 'flex',
										alignItems: 'center',
										gap: 5,
									}}
								>
									{waveformBars.map((h, i) => {
										const active = i >= 6 && i <= 10;
										return (
											<div
												key={i}
												style={{
													flex: 1,
													height: h,
													borderRadius: 999,
													backgroundColor: active ? '#FF7B9C' : '#BCE784',
													boxShadow: active
														? '0 0 12px rgba(255,123,156,0.55)'
														: '0 0 8px rgba(188,231,132,0.3)',
													alignSelf: 'center',
												}}
											/>
										);
									})}
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#12141A',
									border: '3px solid #FF7B9C',
									borderRadius: 22,
									padding: '16px 16px 14px',
									display: 'flex',
									flexDirection: 'column',
									gap: 10,
									minHeight: 122,
								}}
							>
								<div
									style={{
										color: '#BCE784',
										fontSize: 14,
										fontWeight: 800,
										letterSpacing: 2,
										textTransform: 'uppercase',
										fontFamily:
											'"Inter","Helvetica Neue","Arial",sans-serif',
									}}
								>
									Meter
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'flex-end',
										justifyContent: 'space-between',
										gap: 8,
										height: 76,
									}}
								>
									{meterHeights.map((h, i) => (
										<div
											key={i}
											style={{
												flex: 1,
												height: h,
												borderRadius: 10,
												backgroundColor: i === 3 ? '#5E2BFF' : '#BCE784',
												boxShadow:
													i === 3
														? '0 0 14px rgba(94,43,255,0.55)'
														: '0 0 10px rgba(188,231,132,0.28)',
											}}
										/>
									))}
								</div>
							</div>
						</div>

						{/* hero center */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 18,
								flex: 1,
								position: 'relative',
								zIndex: 2,
								textAlign: 'center',
								padding: '0 8px',
							}}
						>
							<div
								style={{
									color: '#12141A',
									fontSize: 68,
									fontWeight: 1000,
									letterSpacing: -1.6,
									lineHeight: 1.02,
									textTransform: 'uppercase',
									maxWidth: 760,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									transform: `scale(${metricReveal * pulseScale})`,
									backgroundColor: '#12141A',
									border: '4px solid #5E2BFF',
									borderRadius: 24,
									padding: '18px 34px',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
									minWidth: 470,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										gap: 16,
										whiteSpace: 'nowrap',
									}}
								>
									<span
										style={{
											color: '#BCE784',
											fontSize: 82,
											fontWeight: 1000,
											lineHeight: 0.95,
											letterSpacing: -2,
										}}
									>
										{commissionDisplay}
									</span>
									<span
										style={{
											color: '#FF7B9C',
											fontSize: 36,
											fontWeight: 900,
											letterSpacing: 2.5,
											textTransform: 'uppercase',
											fontFamily:
												'"Inter","Helvetica Neue","Arial",sans-serif',
										}}
									>
										Commission
									</span>
								</div>
							</div>

							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '1fr 1fr',
									gap: 16,
									width: '100%',
									maxWidth: 650,
								}}
							>
								<div
									style={{
										backgroundColor: '#12141A',
										border: '3px solid #BCE784',
										borderRadius: 18,
										padding: '14px 16px',
										height: 104,
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
									}}
								>
									<div
										style={{
											color: '#BCE784',
											fontSize: 13,
											fontWeight: 800,
											letterSpacing: 2,
											textTransform: 'uppercase',
											fontFamily:
												'"Inter","Helvetica Neue","Arial",sans-serif',
										}}
									>
										Spectrum Scroll
									</div>
									<div
										style={{
											display: 'flex',
											gap: 3,
											alignItems: 'flex-end',
											height: 52,
											overflow: 'hidden',
										}}
									>
										{spectrumCols.map((v, i) => (
											<div
												key={i}
												style={{
													flex: 1,
													height: 52,
													borderRadius: 6,
													background: `linear-gradient(180deg, rgba(94,43,255,${
														0.35 + v * 0.45
													}) 0%, rgba(255,123,156,${
														0.3 + v * 0.55
													}) 52%, rgba(188,231,132,${
														0.2 + v * 0.55
													}) 100%)`,
													opacity: 0.92,
												}}
											/>
										))}
									</div>
								</div>

								<div
									style={{
										backgroundColor: '#12141A',
										border: '3px solid #FF7B9C',
										borderRadius: 18,
										padding: '14px 16px',
										height: 104,
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
									}}
								>
									<div
										style={{
											color: '#BCE784',
											fontSize: 13,
											fontWeight: 800,
											letterSpacing: 2,
											textTransform: 'uppercase',
											fontFamily:
												'"Inter","Helvetica Neue","Arial",sans-serif',
										}}
									>
										dB Readout
									</div>
									<div
										style={{
											color: '#FF7B9C',
											fontSize: 34,
											fontWeight: 1000,
											letterSpacing: -1,
											lineHeight: 1,
										}}
									>
										-06.2 dB
									</div>
									<div
										style={{
											color: '#BCE784',
											fontSize: 14,
											fontWeight: 800,
											letterSpacing: 1.5,
										}}
									>
										BAND LOCKED
									</div>
								</div>
							</div>
						</div>

						{/* bottom monitor line inside card */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								backgroundColor: '#12141A',
								border: '3px solid #5E2BFF',
								borderRadius: 18,
								padding: '12px 18px',
								gap: 18,
							}}
						>
							<div
								style={{
									color: '#BCE784',
									fontSize: 14,
									fontWeight: 900,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									fontFamily:
										'"Inter","Helvetica Neue","Arial",sans-serif',
								}}
							>
								Activation Code
							</div>
							<div
								style={{
									display: 'flex',
									gap: 8,
									alignItems: 'center',
								}}
							>
								{[0, 1, 2, 3, 4, 5].map((i) => (
									<div
										key={i}
										style={{
											width: 18,
											height: 18,
											borderRadius: 4,
											backgroundColor:
												(frame + i * 3) % 18 < 9 ? '#5E2BFF' : '#FF7B9C',
											boxShadow:
												(frame + i * 3) % 18 < 9
													? '0 0 10px rgba(94,43,255,0.5)'
													: '0 0 10px rgba(255,123,156,0.45)',
										}}
									/>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#5E2BFF',
						borderRadius: 20,
						padding: '16px 30px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.38)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FFC53D',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.4,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
							fontFamily:
								'"Inter","Helvetica Neue","Arial",sans-serif',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}