import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_07() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: PRESS-ROLL ENTRANCE
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 230, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	const headlineSlam = spring({
		frame: frame - 6,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.6},
	});

	const paperReveal = interpolate(frame, [0, 16], [0, 1], clamp);
	const topRoll = interpolate(frame, [0, 14], [-70, 0], clamp);

	// ------------------------------------------
	// BEAT 2: METRIC STATE REVEAL
	// ------------------------------------------
	const metricCount = Math.round(interpolate(frame, [18, 62], [12, 50], clamp));
	const subCount = `${metricCount}%`;
	const commissionVisible = frame >= 34;
	const stampScale = spring({
		frame: frame - 40,
		fps,
		config: {damping: 9, stiffness: 260, mass: 0.5},
	});

	const stampRotation = interpolate(frame, [40, 52], [-8, -2], clamp);
	const ruleExpand = interpolate(frame, [20, 48], [0, 1], clamp);
	const halftoneOpacity = interpolate(frame, [28, 50], [0, 0.22], clamp);

	// ------------------------------------------
	// BEAT 3: LIVING FLOAT + SHINE
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.5;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shineOffset = interpolate((frame + 18) % 65, [0, 65], [-320, 920], clamp);

	// ------------------------------------------
	// EXIT
	// ------------------------------------------
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -50],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#EFEAE0',
				opacity,
				fontFamily:
					'"Georgia", "Times New Roman", serif',
				color: '#1A1A1A',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '38px 20px 30px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#D9D2C4',
						border: '2px solid #1A1A1A',
						borderRadius: 12,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 18px rgba(26,26,26,0.12)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#B3261E',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							color: '#1A1A1A',
							whiteSpace: 'nowrap',
						}}
					>
						Front Page Bulletin
					</div>
				</div>

				{/* TIER 2: MASSIVE HERO CARD */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						position: 'relative',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#D9D2C4',
							border: '4px solid #1A1A1A',
							borderRadius: 20,
							boxSizing: 'border-box',
							padding: '28px 34px 34px 34px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: '0 20px 38px rgba(26,26,26,0.18)',
						}}
					>
						{/* Paper shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Halftone dissolve field - kept away from text center */}
						<div
							style={{
								position: 'absolute',
								right: 18,
								top: 86,
								width: 210,
								height: 210,
								opacity: halftoneOpacity,
								backgroundImage:
									'radial-gradient(#5C6670 1.2px, transparent 1.2px)',
								backgroundSize: '10px 10px',
								maskImage:
									'radial-gradient(circle at center, black 0%, black 62%, transparent 100%)',
								WebkitMaskImage:
									'radial-gradient(circle at center, black 0%, black 62%, transparent 100%)',
								pointerEvents: 'none',
							}}
						/>

						{/* Masthead */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 10,
								transform: `translateY(${topRoll}px) scaleY(${paperReveal})`,
								transformOrigin: 'top center',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 20,
								}}
							>
								<div
									style={{
										fontSize: 42,
										fontWeight: 900,
										lineHeight: 1,
										color: '#1A1A1A',
										fontFamily:
											'"Old English Text MT", "Blackletter", "Times New Roman", serif',
										whiteSpace: 'nowrap',
									}}
								>
									CHRONICLE
								</div>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 14,
										flexShrink: 0,
									}}
								>
									<div
										style={{
											fontSize: 15,
											fontWeight: 800,
											letterSpacing: 1.2,
											textTransform: 'uppercase',
											color: '#5C6670',
											whiteSpace: 'nowrap',
										}}
									>
										Edition 07
									</div>
									<div
										style={{
											width: 84,
											height: 32,
											border: '2px solid #B3261E',
											color: '#B3261E',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: 15,
											fontWeight: 900,
											letterSpacing: 1.5,
											textTransform: 'uppercase',
											backgroundColor: '#EFEAE0',
										}}
									>
										Extra
									</div>
								</div>
							</div>

							<div
								style={{
									height: 3,
									backgroundColor: '#1A1A1A',
									transform: `scaleX(${ruleExpand})`,
									transformOrigin: 'left center',
								}}
							/>
						</div>

						{/* Main editorial body */}
						<div
							style={{
								flex: 1,
								display: 'grid',
								gridTemplateColumns: '1.25fr 0.75fr',
								columnGap: 30,
								alignItems: 'stretch',
								marginTop: 20,
								marginBottom: 20,
							}}
						>
							{/* Left headline block */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									minWidth: 0,
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 14,
									}}
								>
									<div
										style={{
											fontSize: 16,
											fontWeight: 900,
											letterSpacing: 2.2,
											textTransform: 'uppercase',
											color: '#B3261E',
										}}
									>
										Activation Code
									</div>

									<div
										style={{
											fontSize: 76,
											fontWeight: 900,
											lineHeight: 0.92,
											letterSpacing: -2.2,
											textTransform: 'uppercase',
											color: '#1A1A1A',
											maxWidth: '100%',
											transform: `scale(${headlineSlam})`,
											transformOrigin: 'left center',
										}}
									>
										AUTOMATED
										<br />
										MARGINS
									</div>

									<div
										style={{
											fontSize: 19,
											lineHeight: 1.45,
											color: '#5C6670',
											textAlign: 'justify',
											maxWidth: 560,
										}}
									>
										Systemized distribution converts delivery into margin,
										reducing friction while keeping expansion purely digital,
										repeatable, and resilient across every new customer added.
									</div>
								</div>

								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 12,
										marginTop: 24,
									}}
								>
									<div
										style={{
											width: 56,
											height: 2,
											backgroundColor: '#B3261E',
										}}
									/>
									<div
										style={{
											fontSize: 15,
											fontWeight: 900,
											letterSpacing: 2,
											textTransform: 'uppercase',
											color: '#1A1A1A',
										}}
									>
										Breaking economics
									</div>
								</div>
							</div>

							{/* Right metric panel */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'space-between',
									alignItems: 'stretch',
									minWidth: 0,
								}}
							>
								<div
									style={{
										border: '3px solid #1A1A1A',
										backgroundColor: '#EFEAE0',
										borderRadius: 16,
										padding: '22px 20px',
										display: 'flex',
										flexDirection: 'column',
										gap: 16,
										position: 'relative',
										minHeight: 260,
										boxShadow: '0 10px 18px rgba(26,26,26,0.08)',
									}}
								>
									<div
										style={{
											fontSize: 14,
											fontWeight: 900,
											letterSpacing: 2,
											textTransform: 'uppercase',
											color: '#5C6670',
										}}
									>
										Commission meter
									</div>

									<div
										style={{
											fontSize: 82,
											fontWeight: 1000,
											lineHeight: 0.95,
											letterSpacing: -2,
											color: '#B3261E',
											whiteSpace: 'nowrap',
										}}
									>
										{subCount}
									</div>

									<div
										style={{
											height: 18,
											borderRadius: 999,
											backgroundColor: '#D9D2C4',
											border: '2px solid #1A1A1A',
											overflow: 'hidden',
										}}
									>
										<div
											style={{
												width: `${metricCount}%`,
												height: '100%',
												backgroundColor: '#B3261E',
											}}
										/>
									</div>

									<div
										style={{
											fontSize: 17,
											lineHeight: 1.35,
											color: '#1A1A1A',
										}}
									>
										Share of revenue captured through automated software-led
										distribution.
									</div>

									{commissionVisible ? (
										<div
											style={{
												position: 'absolute',
												right: 14,
												bottom: 18,
												transform: `rotate(${stampRotation}deg) scale(${stampScale})`,
												transformOrigin: 'center center',
												border: '3px solid #B3261E',
												color: '#B3261E',
												backgroundColor: 'rgba(239,234,224,0.96)',
												padding: '10px 14px',
												borderRadius: 10,
												fontSize: 18,
												fontWeight: 1000,
												letterSpacing: 1.2,
												textTransform: 'uppercase',
												textAlign: 'center',
												lineHeight: 1.05,
												boxShadow: '0 8px 14px rgba(179,38,30,0.12)',
											}}
										>
											50%
											<br />
											Commission
										</div>
									) : null}
								</div>

								<div
									style={{
										marginTop: 18,
										borderTop: '2px solid #5C6670',
										paddingTop: 12,
										display: 'flex',
										flexDirection: 'column',
										gap: 8,
									}}
								>
									<div
										style={{
											fontSize: 13,
											fontWeight: 900,
											letterSpacing: 2,
											textTransform: 'uppercase',
											color: '#5C6670',
										}}
									>
										Market note
									</div>
									<div
										style={{
											fontSize: 16,
											lineHeight: 1.4,
											color: '#1A1A1A',
											textAlign: 'justify',
										}}
									>
										As service scales, labor does not rise linearly. The margin
										stays in code.
									</div>
								</div>
							</div>
						</div>

						{/* Bottom edition strip */}
						<div
							style={{
								borderTop: '3px solid #1A1A1A',
								paddingTop: 14,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 18,
							}}
						>
							<div
								style={{
									fontSize: 14,
									fontWeight: 900,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									color: '#5C6670',
									whiteSpace: 'nowrap',
								}}
							>
								Business Systems Desk
							</div>
							<div
								style={{
									flex: 1,
									height: 2,
									backgroundColor: '#D9D2C4',
								}}
							/>
							<div
								style={{
									fontSize: 14,
									fontWeight: 900,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									color: '#5C6670',
									whiteSpace: 'nowrap',
								}}
							>
								Special Report
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${cardIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#B3261E',
						border: '2px solid #1A1A1A',
						borderRadius: 16,
						padding: '16px 30px',
						boxShadow: '0 10px 20px rgba(26,26,26,0.16)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							color: '#EFEAE0',
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