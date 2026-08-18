import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_81() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snappy entrance
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 12,
			stiffness: 230,
			mass: 0.62,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.52,
		},
	});

	const bottomEntrance = spring({
		frame: frame - 7,
		fps,
		config: {
			damping: 12,
			stiffness: 220,
			mass: 0.6,
		},
	});

	// Beat 2: metric activation / rolling state
	const metricReveal = interpolate(frame, [18, 48], [0, 1], clamp);
	const commissionValue = Math.round(interpolate(frame, [16, 54], [14, 50], clamp));
	const commissionText = `${commissionValue}%`;

	const scanY = interpolate((frame * 2.2) % 220, [0, 220], [30, 520], clamp);
	const waveformSweep = interpolate((frame + 10) % 72, [0, 72], [-180, 760], clamp);
	const caliperDraw = interpolate(frame, [20, 52], [0, 1], clamp);
	const crosshairLock = spring({
		frame: frame - 24,
		fps,
		config: {
			damping: 10,
			stiffness: 180,
			mass: 0.8,
		},
	});

	// Beat 3: living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const bottomFloat = Math.sin(frame * 0.12 + 1.4) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 22) % 68, [0, 68], [-260, 1040], clamp);

	// Slice scroll strips
	const sliceOffsetA = interpolate((frame * 1.8) % 120, [0, 120], [0, -120], clamp);
	const sliceOffsetB = interpolate((frame * 1.4) % 140, [0, 140], [-140, 0], clamp);

	// Exit
	const exitSlide = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [0, -60], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0E1014',
				opacity,
				fontFamily:
					'"IBM Plex Mono", "SFMono-Regular", "Menlo", "Monaco", "Courier New", monospace',
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
					padding: '54px 18px 36px 18px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* TIER 1: category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						padding: '12px 24px',
						borderRadius: 14,
						border: '2px solid #53C8F0',
						backgroundColor: 'rgba(83, 200, 240, 0.08)',
						boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#2EE6A8',
							boxShadow: '0 0 12px rgba(46,230,168,0.6)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#AEB8C4',
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 2.8,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						IMAGING SUITE 81
					</div>
				</div>

				{/* TIER 2: massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						transform: `scale(${entrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 548,
							backgroundColor: '#FFC857',
							border: '4px solid #AEB8C4',
							borderRadius: 34,
							position: 'relative',
							overflow: 'hidden',
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.52)`,
							padding: '34px 34px 30px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* background diagnostic layers */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								pointerEvents: 'none',
							}}
						>
							{/* slice scroll top */}
							<div
								style={{
									position: 'absolute',
									top: 18,
									left: 24,
									right: 24,
									height: 26,
									borderRadius: 8,
									overflow: 'hidden',
									border: '1px solid rgba(14,16,20,0.18)',
									backgroundColor: 'rgba(14,16,20,0.06)',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										background:
											'repeating-linear-gradient(90deg, rgba(14,16,20,0.18) 0px, rgba(14,16,20,0.18) 2px, transparent 2px, transparent 22px)',
										transform: `translateX(${sliceOffsetA}px)`,
									}}
								/>
							</div>

							{/* slice scroll bottom */}
							<div
								style={{
									position: 'absolute',
									bottom: 16,
									left: 24,
									right: 24,
									height: 22,
									borderRadius: 8,
									overflow: 'hidden',
									border: '1px solid rgba(14,16,20,0.16)',
									backgroundColor: 'rgba(14,16,20,0.05)',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										background:
											'repeating-linear-gradient(90deg, transparent 0px, transparent 10px, rgba(14,16,20,0.16) 10px, rgba(14,16,20,0.16) 12px, transparent 12px, transparent 26px)',
										transform: `translateX(${sliceOffsetB}px)`,
									}}
								/>
							</div>

							{/* scan line */}
							<div
								style={{
									position: 'absolute',
									left: 28,
									right: 28,
									top: scanY,
									height: 2,
									background:
										'linear-gradient(90deg, transparent 0%, #53C8F0 18%, #2EE6A8 50%, #53C8F0 82%, transparent 100%)',
									opacity: 0.6,
									boxShadow: '0 0 12px rgba(83,200,240,0.55)',
								}}
							/>

							{/* shine */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 120,
									backgroundColor: 'rgba(255,255,255,0.14)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								}}
							/>

							{/* waveform sweep - placed safely below metric area */}
							<svg
								width="100%"
								height="100%"
								viewBox="0 0 1000 600"
								style={{
									position: 'absolute',
									inset: 0,
								}}
							>
								<defs>
									<clipPath id="waveClip81">
										<rect x="120" y="410" width="760" height="70" rx="12" />
									</clipPath>
								</defs>
								<g clipPath="url(#waveClip81)" opacity={0.8}>
									<path
										d={`
                      M ${waveformSweep - 220} 445
                      C ${waveformSweep - 170} 420, ${waveformSweep - 140} 470, ${waveformSweep - 100} 445
                      S ${waveformSweep - 20} 420, ${waveformSweep + 40} 445
                      S ${waveformSweep + 110} 472, ${waveformSweep + 170} 445
                      S ${waveformSweep + 250} 418, ${waveformSweep + 320} 445
                    `}
										fill="none"
										stroke="#2EE6A8"
										strokeWidth="5"
										strokeLinecap="round"
									/>
								</g>
							</svg>

							{/* crosshair lock - center behind metric chip, not over text */}
							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: '52%',
									width: 164,
									height: 164,
									transform: `translate(-50%, -50%) scale(${crosshairLock})`,
									opacity: 0.4,
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										right: 0,
										top: '50%',
										height: 2,
										transform: 'translateY(-1px)',
										background:
											'linear-gradient(90deg, transparent 0%, #53C8F0 14%, #53C8F0 40%, transparent 40%, transparent 60%, #53C8F0 60%, #53C8F0 86%, transparent 100%)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										top: 0,
										bottom: 0,
										left: '50%',
										width: 2,
										transform: 'translateX(-1px)',
										background:
											'linear-gradient(180deg, transparent 0%, #53C8F0 14%, #53C8F0 40%, transparent 40%, transparent 60%, #53C8F0 60%, #53C8F0 86%, transparent 100%)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										inset: 24,
										border: '2px solid #53C8F0',
										borderRadius: '50%',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										border: '2px solid rgba(83,200,240,0.5)',
										borderRadius: '50%',
									}}
								/>
							</div>

							{/* caliper lines, strictly outside text bounds */}
							<svg
								width="100%"
								height="100%"
								viewBox="0 0 1000 600"
								style={{
									position: 'absolute',
									inset: 0,
								}}
							>
								<g opacity={0.75}>
									{/* left caliper */}
									<line
										x1="116"
										y1="182"
										x2={116 + 110 * caliperDraw}
										y2="182"
										stroke="#0E1014"
										strokeWidth="4"
										strokeLinecap="round"
									/>
									<line
										x1="116"
										y1="166"
										x2="116"
										y2="198"
										stroke="#0E1014"
										strokeWidth="4"
										strokeLinecap="round"
									/>
									<line
										x1={116 + 110 * caliperDraw}
										y1="166"
										x2={116 + 110 * caliperDraw}
										y2="198"
										stroke="#0E1014"
										strokeWidth="4"
										strokeLinecap="round"
									/>

									{/* right caliper */}
									<line
										x1="774"
										y1="182"
										x2={774 - 110 * caliperDraw}
										y2="182"
										stroke="#0E1014"
										strokeWidth="4"
										strokeLinecap="round"
									/>
									<line
										x1="774"
										y1="166"
										x2="774"
										y2="198"
										stroke="#0E1014"
										strokeWidth="4"
										strokeLinecap="round"
									/>
									<line
										x1={774 - 110 * caliperDraw}
										y1="166"
										x2={774 - 110 * caliperDraw}
										y2="198"
										stroke="#0E1014"
										strokeWidth="4"
										strokeLinecap="round"
									/>
								</g>
							</svg>
						</div>

						{/* card content layout */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 18,
							}}
						>
							{/* top diagnostic micro text */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									paddingTop: 2,
								}}
							>
								<div
									style={{
										color: '#0E1014',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
										opacity: 0.78,
									}}
								>
									DICOM / ROI / LOCK
								</div>
								<div
									style={{
										color: '#0E1014',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
										opacity: 0.78,
									}}
								>
									AX 081.50
								</div>
							</div>

							{/* headline */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									paddingTop: 10,
									paddingBottom: 4,
								}}
							>
								<div
									style={{
										maxWidth: 760,
										textAlign: 'center',
										color: '#0E1014',
										fontSize: 72,
										fontWeight: 900,
										letterSpacing: -2.2,
										lineHeight: 1.03,
										textTransform: 'uppercase',
									}}
								>
									AUTOMATED MARGINS
								</div>
							</div>

							{/* metric module */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									padding: '6px 0',
									transform: `scale(${0.92 + metricReveal * 0.08})`,
								}}
							>
								<div
									style={{
										color: '#0E1014',
										fontSize: 13,
										fontWeight: 800,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										opacity: 0.76,
									}}
								>
									MEASUREMENT LOCKED
								</div>

								<div
									style={{
										backgroundColor: '#0E1014',
										border: '3px solid #53C8F0',
										borderRadius: 26,
										padding: '20px 38px',
										minWidth: 560,
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 18,
										boxShadow: '0 10px 26px rgba(14,16,20,0.28)',
									}}
								>
									<div
										style={{
											color: '#53C8F0',
											fontSize: 82,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: -2,
											minWidth: 160,
											textAlign: 'right',
										}}
									>
										{commissionText}
									</div>
									<div
										style={{
											color: '#AEB8C4',
											fontSize: 34,
											fontWeight: 800,
											lineHeight: 1,
											letterSpacing: 2.6,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										COMMISSION
									</div>
								</div>
							</div>

							{/* lower status strip */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									padding: '0 18px',
								}}
							>
								<div
									style={{
										color: '#0E1014',
										fontSize: 12,
										fontWeight: 700,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
										opacity: 0.76,
									}}
								>
									WAVEFORM ACTIVE
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 10,
									}}
								>
									<div
										style={{
											width: 8,
											height: 8,
											borderRadius: '50%',
											backgroundColor: '#2EE6A8',
											boxShadow: '0 0 10px rgba(46,230,168,0.7)',
										}}
									/>
									<div
										style={{
											color: '#0E1014',
											fontSize: 12,
											fontWeight: 700,
											letterSpacing: 1.8,
											textTransform: 'uppercase',
											opacity: 0.76,
										}}
									>
										CALIBRATED
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: takeaway */}
				<div
					style={{
						transform: `scale(${bottomEntrance}) translateY(${bottomFloat}px)`,
						backgroundColor: '#2EE6A8',
						borderRadius: 18,
						padding: '16px 30px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.34)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#0E1014',
							fontSize: 22,
							fontWeight: 900,
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