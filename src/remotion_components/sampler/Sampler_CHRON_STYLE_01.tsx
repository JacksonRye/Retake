import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_01() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: SNAPPY ENTRANCE
	// ------------------------------------------
	const badgeSpring = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const cardSpring = spring({
		frame: frame,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.65},
	});

	const takeawaySpring = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.6},
	});

	// ------------------------------------------
	// BEAT 2: TYPEWRITER / REDACTION / STAMP
	// ------------------------------------------
	const headlineChars = 'AUTOMATED MARGINS';
	const headlineCount = Math.floor(
		interpolate(frame, [8, 28], [0, headlineChars.length], clamp)
	);
	const headlineText = headlineChars.slice(0, headlineCount);

	const redactionWidth = interpolate(frame, [18, 34], [0, 420], clamp);
	const metricReveal = Math.floor(interpolate(frame, [30, 62], [0, 14], clamp));
	const metricText = '50% COMMISSION'.slice(0, metricReveal);

	const stampScale = spring({
		frame: frame - 46,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});
	const stampRotate = interpolate(frame, [46, 58], [-18, -8], clamp);
	const stampOpacity = interpolate(frame, [46, 50], [0, 1], clamp);

	// ------------------------------------------
	// BEAT 3: CONTINUOUS LIVING HOVER
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const badgeHover = Math.sin(frame * 0.1) * 3;
	const takeawayHover = Math.sin(frame * 0.12 + 1.2) * 3;
	const shineOffset = interpolate((frame + 14) % 70, [0, 70], [-240, 980], clamp);

	// subtle cursor-like typewriter caret
	const caretOpacity = frame % 16 < 8 ? 1 : 0.15;

	// paper clip motion
	const clipFloat = Math.sin(frame * 0.11 + 0.5) * 5;
	const clipRotate = Math.sin(frame * 0.07) * 2.2;

	// exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F4EFE3',
				opacity,
				fontFamily:
					'"Georgia", "Times New Roman", serif',
				color: '#141414',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '48px 18px 38px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeSpring}) translateY(${badgeHover}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						backgroundColor: '#141414',
						border: '2px solid #C9A656',
						borderRadius: 14,
						padding: '12px 22px',
						boxShadow: '0 8px 20px rgba(20,20,20,0.12)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#C8102E',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontFamily:
								'"Courier New", "SFMono-Regular", Menlo, monospace',
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							color: '#F4EFE3',
							whiteSpace: 'nowrap',
						}}
					>
						editorial investigation
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
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardSpring}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#F4EFE3',
							border: '4px solid #C9A656',
							borderRadius: 26,
							boxSizing: 'border-box',
							padding: '40px 42px 34px',
							position: 'relative',
							overflow: 'hidden',
							boxShadow: '0 18px 40px rgba(20,20,20,0.16)',
							display: 'grid',
							gridTemplateRows: 'auto auto 1fr auto',
							rowGap: 24,
						}}
					>
						{/* paper texture accents */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(180deg, rgba(201,166,86,0.05), rgba(201,166,86,0.02) 22%, rgba(0,0,0,0) 40%, rgba(20,20,20,0.02) 100%)',
								pointerEvents: 'none',
							}}
						/>

						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								backgroundColor: 'rgba(255,255,255,0.18)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* paper clip */}
						<div
							style={{
								position: 'absolute',
								top: 18,
								right: 28,
								transform: `translateY(${clipFloat}px) rotate(${clipRotate}deg)`,
								pointerEvents: 'none',
								zIndex: 4,
							}}
						>
							<svg width="54" height="78" viewBox="0 0 54 78" fill="none">
								<path
									d="M37 18v34c0 10-7 16-16 16S5 62 5 52V21C5 11 12 4 22 4s17 7 17 17v29c0 7-5 12-12 12s-12-5-12-12V25"
									stroke="#8A8275"
									strokeWidth="5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>

						{/* top docket row */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 20,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontFamily:
										'"Courier New", "SFMono-Regular", Menlo, monospace',
									fontSize: 17,
									fontWeight: 700,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									color: '#8A8275',
									whiteSpace: 'nowrap',
								}}
							>
								case file 01
							</div>

							<div
								style={{
									height: 2,
									flex: 1,
									backgroundColor: '#C9A656',
								}}
							/>

							<div
								style={{
									fontFamily:
										'"Courier New", "SFMono-Regular", Menlo, monospace',
									fontSize: 17,
									fontWeight: 700,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									color: '#8A8275',
									whiteSpace: 'nowrap',
								}}
							>
								motive: leverage
							</div>
						</div>

						{/* headline block */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								paddingTop: 4,
								minHeight: 170,
								display: 'flex',
								alignItems: 'flex-start',
							}}
						>
							<div
								style={{
									fontSize: 76,
									lineHeight: 0.95,
									fontWeight: 700,
									letterSpacing: -1.8,
									textTransform: 'uppercase',
									color: '#141414',
									maxWidth: '100%',
									wordBreak: 'break-word',
								}}
							>
								{headlineText}
								<span
									style={{
										opacity: headlineCount < headlineChars.length ? caretOpacity : 0,
										color: '#C8102E',
										marginLeft: 4,
									}}
								>
									|
								</span>
							</div>
						</div>

						{/* metric zone */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '18px 0 10px',
							}}
						>
							<div
								style={{
									width: '100%',
									maxWidth: 700,
									minHeight: 178,
									backgroundColor: '#141414',
									border: '3px solid #C9A656',
									borderRadius: 22,
									boxSizing: 'border-box',
									padding: '28px 30px',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								{/* sliding redaction bars placed safely above/below text */}
								<div
									style={{
										position: 'absolute',
										top: 22,
										left: 30,
										height: 14,
										width: redactionWidth,
										backgroundColor: '#C8102E',
										borderRadius: 4,
										opacity: 0.95,
									}}
								/>
								<div
									style={{
										position: 'absolute',
										bottom: 22,
										right: 30,
										height: 14,
										width: redactionWidth * 0.72,
										backgroundColor: '#C8102E',
										borderRadius: 4,
										opacity: 0.95,
									}}
								/>

								<div
									style={{
										fontFamily:
											'"Courier New", "SFMono-Regular", Menlo, monospace',
										fontSize: 16,
										fontWeight: 700,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										color: '#C9A656',
										marginBottom: 12,
										whiteSpace: 'nowrap',
									}}
								>
									commission evidence
								</div>

								<div
									style={{
										fontFamily:
											'"Poppins", "Arial Black", "Helvetica Neue", sans-serif',
										fontSize: 64,
										lineHeight: 1,
										fontWeight: 800,
										letterSpacing: -1.2,
										textTransform: 'uppercase',
										color: '#F4EFE3',
										textAlign: 'center',
										minHeight: 64,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										whiteSpace: 'nowrap',
										position: 'relative',
										zIndex: 2,
									}}
								>
									{metricText}
								</div>
							</div>

							{/* evidence stamp */}
							<div
								style={{
									position: 'absolute',
									right: 34,
									top: -6,
									transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
									opacity: stampOpacity,
									zIndex: 3,
									pointerEvents: 'none',
								}}
							>
								<div
									style={{
										border: '4px solid #C8102E',
										color: '#C8102E',
										borderRadius: 14,
										padding: '10px 16px 8px',
										fontFamily:
											'"Poppins", "Arial Black", "Helvetica Neue", sans-serif',
										fontSize: 22,
										fontWeight: 800,
										letterSpacing: 1.4,
										textTransform: 'uppercase',
										backgroundColor: 'rgba(244,239,227,0.96)',
									}}
								>
									verified
								</div>
							</div>
						</div>

						{/* bottom note inside card */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 20,
							}}
						>
							<div
								style={{
									fontFamily:
										'"Courier New", "SFMono-Regular", Menlo, monospace',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									color: '#8A8275',
								}}
							>
								no inventory risk
							</div>
							<div
								style={{
									width: 120,
									height: 2,
									backgroundColor: '#C9A656',
									flexShrink: 0,
								}}
							/>
							<div
								style={{
									fontFamily:
										'"Courier New", "SFMono-Regular", Menlo, monospace',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									color: '#8A8275',
								}}
							>
								software scales
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawaySpring}) translateY(${takeawayHover}px)`,
						backgroundColor: '#C8102E',
						border: '2px solid #141414',
						borderRadius: 18,
						padding: '16px 30px',
						boxShadow: '0 10px 22px rgba(20,20,20,0.14)',
						textAlign: 'center',
						maxWidth: '88%',
					}}
				>
					<div
						style={{
							fontFamily:
								'"Poppins", "Arial Black", "Helvetica Neue", sans-serif',
							fontSize: 24,
							fontWeight: 800,
							letterSpacing: 1.8,
							textTransform: 'uppercase',
							color: '#F4EFE3',
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