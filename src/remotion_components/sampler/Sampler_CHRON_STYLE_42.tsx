import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_42() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.65},
	});

	const footerIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	// ------------------------------------------
	// Beat 2: Metric transform / slate switch
	// ------------------------------------------
	const metricReveal = interpolate(frame, [16, 42], [0, 1], clamp);
	const commissionNumber = Math.round(interpolate(frame, [16, 50], [12, 50], clamp));
	const showFullCommission = frame >= 44;

	const clapOpen = interpolate(frame, [20, 26], [0, 1], clamp);
	const clapClose = interpolate(frame, [26, 31], [1, 0], clamp);
	const clapAmount = frame < 26 ? clapOpen : clapClose;

	const pageFlipProgress = interpolate(frame, [28, 46], [0, 1], clamp);
	const pageFlipShadow = interpolate(frame, [28, 46], [0.08, 0.2], clamp);

	// ------------------------------------------
	// Beat 3: Living hover + shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-260, 980], clamp);

	// ------------------------------------------
	// Frame-by-frame annotation arrows
	// ------------------------------------------
	const arrow1Progress = interpolate(frame, [10, 24], [0, 1], clamp);
	const arrow2Progress = interpolate(frame, [52, 66], [0, 1], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -55], clamp);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const topGuideOpacity = interpolate(frame, [6, 14], [0, 1], clamp);
	const metricBoxScale = interpolate(frame, [24, 32], [0.95, 1], clamp);
	const codeBlink = frame % 18 < 9 ? 1 : 0.45;

	const cardWidth = '94%';
	const cardMinHeight = 540;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F1ECE0',
				fontFamily:
					'"Courier New", "IBM Plex Mono", "SFMono-Regular", "Menlo", monospace',
				opacity,
				color: '#595550',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						width: '96%',
						height: '90%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '42px 18px 36px 18px',
						boxSizing: 'border-box',
						transform: `translateY(${exitY}px)`,
					}}
				>
					{/* TIER 1: CATEGORY BADGE */}
					<div
						style={{
							transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
							backgroundColor: '#F1ECE0',
							border: '3px solid #595550',
							borderRadius: 14,
							padding: '12px 26px',
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							boxShadow: '0 6px 0 rgba(89,85,80,0.18)',
							position: 'relative',
						}}
					>
						<div
							style={{
								width: 10,
								height: 10,
								borderRadius: '50%',
								backgroundColor: '#E03131',
								flexShrink: 0,
							}}
						/>
						<div
							style={{
								fontSize: 20,
								fontWeight: 800,
								letterSpacing: 2.6,
								textTransform: 'uppercase',
								color: '#595550',
							}}
						>
							ACTIVATION CODE
						</div>
					</div>

					{/* TIER 2: HERO CARD */}
					<div
						style={{
							width: cardWidth,
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							margin: '24px 0 20px 0',
							transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						}}
					>
						{/* Left annotation, fully outside text area */}
						<div
							style={{
								position: 'absolute',
								left: -6,
								top: 82,
								width: 180,
								height: 86,
								opacity: topGuideOpacity,
								pointerEvents: 'none',
							}}
						>
							<svg width="180" height="86" viewBox="0 0 180 86">
								<path
									d={`M12 18 L${12 + 88 * arrow1Progress} 18 L${100 + 44 * arrow1Progress} ${18 + 34 * arrow1Progress}`}
									fill="none"
									stroke="#4C6EF5"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d={
										arrow1Progress >= 0.92
											? 'M139 46 L144 54 L133 53'
											: ''
									}
									fill="none"
									stroke="#4C6EF5"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<text
									x="12"
									y="74"
									fill="#4C6EF5"
									fontSize="18"
									fontWeight="700"
									letterSpacing="1.4"
								>
									HOOK
								</text>
							</svg>
						</div>

						<div
							style={{
								width: '100%',
								minHeight: cardMinHeight,
								backgroundColor: '#C9B48C',
								border: '4px solid #595550',
								borderRadius: 34,
								boxShadow: `0 ${shadowPulse}px 30px rgba(89,85,80,0.22)`,
								padding: '44px 42px 34px 42px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'center',
								position: 'relative',
								overflow: 'hidden',
								textAlign: 'center',
							}}
						>
							{/* paper shine */}
							<div
								style={{
									position: 'absolute',
									top: -20,
									bottom: -20,
									width: 120,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.28), rgba(255,255,255,0))',
									transform: `translateX(${shineOffset}px) skewX(-18deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* top code strip */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: 8,
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: 700,
										letterSpacing: 2,
										color: '#595550',
										opacity: 0.9,
									}}
								>
									SEQ_042
								</div>
								<div
									style={{
										fontSize: 18,
										fontWeight: 700,
										letterSpacing: 2,
										color: '#4C6EF5',
										opacity: codeBlink,
									}}
								>
									LIVE
								</div>
							</div>

							{/* Hero headline */}
							<div
								style={{
									width: '100%',
									padding: '8px 10px 2px 10px',
									boxSizing: 'border-box',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										maxWidth: 760,
										color: '#595550',
										fontSize: 72,
										fontWeight: 900,
										lineHeight: 1.02,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
										textShadow: '1px 1px 0 rgba(255,255,255,0.18)',
									}}
								>
									AUTOMATED MARGINS
								</div>
							</div>

							{/* Slate clap accent - positioned above metric, never crossing text */}
							<div
								style={{
									position: 'absolute',
									top: 126,
									right: 42,
									width: 114,
									height: 54,
									pointerEvents: 'none',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										right: 0,
										bottom: 0,
										height: 26,
										backgroundColor: '#595550',
										borderRadius: 6,
										border: '3px solid #595550',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 6,
										top: 0,
										width: 102,
										height: 22,
										background:
											'repeating-linear-gradient(135deg, #F1ECE0 0px, #F1ECE0 12px, #595550 12px, #595550 18px)',
										border: '3px solid #595550',
										borderRadius: 6,
										transformOrigin: 'left bottom',
										transform: `rotate(${-22 * clapAmount}deg)`,
									}}
								/>
							</div>

							{/* Metric block */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									position: 'relative',
									margin: '4px 0',
								}}
							>
								<div
									style={{
										position: 'relative',
										transform: `scale(${metricBoxScale})`,
										backgroundColor: '#F1ECE0',
										border: '4px solid #595550',
										borderRadius: 26,
										padding: '24px 34px 22px 34px',
										minWidth: 620,
										boxShadow: `0 10px 0 rgba(89,85,80,${0.12 + pageFlipShadow})`,
										overflow: 'hidden',
									}}
								>
									{/* page flip overlay */}
									<div
										style={{
											position: 'absolute',
											top: 0,
											right: 0,
											width: 150,
											height: 110,
											background:
												'linear-gradient(135deg, rgba(255,255,255,0.65), rgba(255,255,255,0.1))',
											clipPath: `polygon(${100 - pageFlipProgress * 38}% 0%, 100% 0%, 100% ${pageFlipProgress * 100}%, ${100 - pageFlipProgress * 50}% ${34 + pageFlipProgress * 56}%)`,
											pointerEvents: 'none',
										}}
									/>

									<div
										style={{
											fontSize: 26,
											fontWeight: 800,
											letterSpacing: 3,
											textTransform: 'uppercase',
											color: '#E03131',
											marginBottom: 10,
										}}
									>
										Commission
									</div>

									<div
										style={{
											display: 'flex',
											alignItems: 'baseline',
											justifyContent: 'center',
											gap: 16,
											flexWrap: 'nowrap',
										}}
									>
										<div
											style={{
												fontSize: 80,
												fontWeight: 900,
												lineHeight: 0.95,
												color: '#4C6EF5',
												letterSpacing: -2,
												minWidth: 140,
												textAlign: 'right',
											}}
										>
											{commissionNumber}%
										</div>
										<div
											style={{
												fontSize: 44,
												fontWeight: 800,
												lineHeight: 1,
												letterSpacing: 1.5,
												color: '#595550',
												textTransform: 'uppercase',
												minWidth: 280,
												textAlign: 'left',
												opacity: metricReveal,
											}}
										>
											{showFullCommission ? 'COMMISSION' : 'COMMISSI'}
										</div>
									</div>
								</div>
							</div>

							{/* bottom note inside card */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-end',
									marginTop: 10,
									padding: '0 4px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: 700,
										letterSpacing: 1.8,
										color: '#595550',
										opacity: 0.85,
									}}
								>
									FRAME // ROI SHEET
								</div>
								<div
									style={{
										backgroundColor: '#4C6EF5',
										color: '#F1ECE0',
										borderRadius: 12,
										padding: '10px 18px',
										fontSize: 22,
										fontWeight: 900,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										boxShadow: '0 6px 0 rgba(89,85,80,0.15)',
									}}
								>
									MARGIN STACK
								</div>
							</div>
						</div>

						{/* Right annotation, outside safe text zone */}
						<div
							style={{
								position: 'absolute',
								right: -4,
								bottom: 90,
								width: 206,
								height: 98,
								pointerEvents: 'none',
							}}
						>
							<svg width="206" height="98" viewBox="0 0 206 98">
								<path
									d={`M194 16 L${194 - 92 * arrow2Progress} 16 L${102 - 50 * arrow2Progress} ${16 + 34 * arrow2Progress}`}
									fill="none"
									stroke="#E03131"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d={
										arrow2Progress >= 0.92
											? 'M56 47 L47 50 L54 58'
											: ''
									}
									fill="none"
									stroke="#E03131"
									strokeWidth="4"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<text
									x="116"
									y="86"
									fill="#E03131"
									fontSize="18"
									fontWeight="700"
									letterSpacing="1.4"
								>
									METRIC
								</text>
							</svg>
						</div>
					</div>

					{/* TIER 3: TAKEAWAY */}
					<div
						style={{
							transform: `scale(${footerIn}) translateY(${footerFloat}px)`,
							backgroundColor: '#595550',
							border: '3px solid #595550',
							borderRadius: 20,
							padding: '16px 34px',
							boxShadow: '0 8px 0 rgba(89,85,80,0.18)',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								fontSize: 24,
								fontWeight: 900,
								letterSpacing: 2.4,
								textTransform: 'uppercase',
								color: '#F1ECE0',
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