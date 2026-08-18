import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_11() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

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

	const footerEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// Beat 2: Receipt roll-feed + total activation
	// ------------------------------------------
	const rollFeedY = interpolate(frame, [0, 28], [-170, 0], clamp);
	const tearProgress = interpolate(frame, [16, 32], [0, 1], clamp);

	const commissionValue = Math.round(
		interpolate(frame, [20, 58], [12, 50], clamp)
	);
	const metricText = `${commissionValue}% COMMISSION`;

	const totalPunch = spring({
		frame: frame - 48,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.55},
	});

	const totalLineFlash = interpolate(frame, [48, 52, 58], [0.2, 1, 0.45], clamp);

	// ------------------------------------------
	// Beat 3: Continuous living hover + thermal flicker + shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shineOffset = interpolate((frame + 15) % 70, [0, 70], [-260, 980], clamp);

	const thermalFlicker =
		0.95 +
		Math.sin(frame * 0.9) * 0.03 +
		Math.sin(frame * 0.37 + 0.8) * 0.02;

	const inkJitter = Math.sin(frame * 0.7) * 0.4;

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// Decorative perforation dots
	const topPerf = new Array(20).fill(true);
	const bottomPerf = new Array(20).fill(true);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F7F5F0',
				opacity,
				fontFamily:
					'"Courier New", "Lucida Console", "IBM Plex Mono", "Menlo", monospace',
				color: '#3A3A3A',
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
					padding: '52px 18px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FFE066',
						border: '3px solid #3A3A3A',
						borderRadius: 14,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 0 rgba(58,58,58,0.12)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#D7263D',
							border: '2px solid #3A3A3A',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							color: '#3A3A3A',
							whiteSpace: 'nowrap',
						}}
					>
						RECEIPT ROLL
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
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#B9B4A8',
							border: '4px solid #3A3A3A',
							borderRadius: 26,
							position: 'relative',
							overflow: 'hidden',
							boxShadow: '0 18px 34px rgba(58,58,58,0.18)',
							padding: '0',
						}}
					>
						{/* outer receipt body */}
						<div
							style={{
								position: 'absolute',
								inset: 16,
								backgroundColor: '#F7F5F0',
								border: '3px solid #3A3A3A',
								borderRadius: 18,
								overflow: 'hidden',
							}}
						>
							{/* moving shine */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 120,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,224,102,0.28) 50%, rgba(255,255,255,0) 100%)',
									transform: `translateX(${shineOffset}px) skewX(-18deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* receipt feed */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									transform: `translateY(${rollFeedY}px)`,
								}}
							>
								{/* top perforation */}
								<div
									style={{
										height: 22,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-evenly',
										padding: '0 18px',
										boxSizing: 'border-box',
										backgroundColor: '#F7F5F0',
										borderBottom: '2px dashed rgba(58,58,58,0.45)',
									}}
								>
									{topPerf.map((_, i) => (
										<div
											key={`top-${i}`}
											style={{
												width: 10,
												height: 10,
												borderRadius: '50%',
												backgroundColor: '#B9B4A8',
												border: '1.5px solid #3A3A3A',
												opacity: 0.9,
											}}
										/>
									))}
								</div>

								{/* printed area */}
								<div
									style={{
										padding: '30px 34px 28px',
										boxSizing: 'border-box',
										height: 'calc(100% - 44px)',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'stretch',
										justifyContent: 'space-between',
										gap: 20,
									}}
								>
									{/* header block */}
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: 14,
										}}
									>
										<div
											style={{
												fontSize: 18,
												fontWeight: 800,
												letterSpacing: 3.2,
												textTransform: 'uppercase',
												color: '#3A3A3A',
												opacity: thermalFlicker,
												transform: `translateX(${inkJitter}px)`,
												whiteSpace: 'nowrap',
											}}
										>
											SYSTEM GENERATED
										</div>

										<div
											style={{
												width: '100%',
												textAlign: 'center',
												fontSize: 68,
												fontWeight: 900,
												lineHeight: 1.04,
												letterSpacing: -1.5,
												textTransform: 'uppercase',
												color: '#3A3A3A',
												opacity: thermalFlicker,
												transform: `translateX(${inkJitter}px)`,
												padding: '0 6px',
												boxSizing: 'border-box',
											}}
										>
											AUTOMATED
											<br />
											MARGINS
										</div>
									</div>

									{/* line items */}
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: 14,
											padding: '0 8px',
										}}
									>
										{[
											['SALES OPS', 'AUTO'],
											['DELIVERY', 'SOFTWARE'],
											['HEADCOUNT', 'LOW'],
										].map(([left, right], i) => (
											<div
												key={left}
												style={{
													display: 'grid',
													gridTemplateColumns: '1fr auto',
													alignItems: 'center',
													gap: 16,
													fontSize: 22,
													fontWeight: 800,
													letterSpacing: 2,
													textTransform: 'uppercase',
													color: '#3A3A3A',
													opacity: 0.9 - i * 0.08,
												}}
											>
												<div
													style={{
														overflow: 'hidden',
														whiteSpace: 'nowrap',
														textOverflow: 'clip',
													}}
												>
													{left}
												</div>
												<div style={{whiteSpace: 'nowrap'}}>{right}</div>
											</div>
										))}
									</div>

									{/* total block */}
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: 14,
										}}
									>
										<div
											style={{
												height: 0,
												borderTop: '3px dashed #3A3A3A',
												opacity: 0.75,
											}}
										/>

										<div
											style={{
												position: 'relative',
												backgroundColor: `rgba(255, 224, 102, ${totalLineFlash})`,
												border: '3px solid #3A3A3A',
												borderRadius: 18,
												padding: '18px 22px',
												boxShadow: '0 8px 0 rgba(58,58,58,0.10)',
												transform: `scale(${0.94 + totalPunch * 0.06})`,
											}}
										>
											<div
												style={{
													display: 'flex',
													flexDirection: 'column',
													alignItems: 'center',
													gap: 10,
													textAlign: 'center',
												}}
											>
												<div
													style={{
														fontSize: 20,
														fontWeight: 900,
														letterSpacing: 3,
														textTransform: 'uppercase',
														color: '#D7263D',
														whiteSpace: 'nowrap',
													}}
												>
													TOTAL
												</div>

												<div
													style={{
														fontSize: 62,
														fontWeight: 1000,
														lineHeight: 1,
														letterSpacing: -1,
														textTransform: 'uppercase',
														color: '#3A3A3A',
														opacity: thermalFlicker,
														transform: `translateX(${inkJitter * 0.5}px)`,
														whiteSpace: 'nowrap',
													}}
												>
													{metricText}
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* bottom perforation with tear effect */}
								<div
									style={{
										position: 'absolute',
										left: 0,
										right: 0,
										bottom: 0,
										height: 22,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-evenly',
										padding: '0 18px',
										boxSizing: 'border-box',
										backgroundColor: '#F7F5F0',
										borderTop: '2px dashed rgba(58,58,58,0.45)',
										transform: `translateY(${tearProgress * 2}px)`,
									}}
								>
									{bottomPerf.map((_, i) => (
										<div
											key={`bottom-${i}`}
											style={{
												width: 10,
												height: 10,
												borderRadius: '50%',
												backgroundColor: '#B9B4A8',
												border: '1.5px solid #3A3A3A',
												opacity: 0.9,
											}}
										/>
									))}
								</div>
							</div>

							{/* subtle tear notch animation - kept clear of text */}
							<div
								style={{
									position: 'absolute',
									left: 0,
									right: 0,
									bottom: 16,
									height: 14,
									opacity: tearProgress,
									pointerEvents: 'none',
									background:
										'radial-gradient(circle at 20px 0px, transparent 9px, #F7F5F0 10px) 0 0 / 40px 14px repeat-x',
								}}
							/>
						</div>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${footerEntrance}) translateY(${footerFloat}px)`,
						backgroundColor: '#D7263D',
						border: '3px solid #3A3A3A',
						borderRadius: 18,
						padding: '16px 32px',
						boxShadow: '0 8px 0 rgba(58,58,58,0.12)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F7F5F0',
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