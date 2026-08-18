import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_41() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});

	const heroIn = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	const smashZoom = interpolate(frame, [0, 6, 12], [1.16, 0.96, 1], clamp);

	// ------------------------------------------
	// Beat 2: Metric roll / state change
	// ------------------------------------------
	const percent = Math.round(interpolate(frame, [16, 58], [12, 50], clamp));
	const showFinalCommission = frame >= 42;

	const panelFlash = interpolate(frame, [20, 24, 28], [0, 0.32, 0], clamp);
	const metricPulse = interpolate(frame, [36, 42, 48], [1, 1.08, 1], clamp);

	// ------------------------------------------
	// Beat 3: Living hover + shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2;
	const badgeFloat = Math.sin(frame * 0.12 + 0.7) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 20) % 70, [0, 70], [-220, 980], clamp);

	// ------------------------------------------
	// Anime speed lines / freeze-frame energy
	// ------------------------------------------
	const speedBurst = interpolate(frame, [0, 10, 18], [0.2, 1, 0.6], clamp);
	const freezeFrameAccent = frame >= 44 && frame <= 56 ? 1 : 0;
	const shatterOpacity = interpolate(frame, [8, 14, 20], [0.5, 0.14, 0], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -70],
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
				backgroundColor: '#111111',
				opacity,
				fontFamily:
					'"Arial Black", "Impact", "Helvetica Neue", sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Background speed lines */}
			<svg
				width="100%"
				height="100%"
				viewBox="0 0 1920 1080"
				preserveAspectRatio="none"
				style={{
					position: 'absolute',
					inset: 0,
					opacity: 0.22 * speedBurst,
				}}
			>
				<g stroke="#3A86FF" strokeWidth="5" strokeLinecap="round">
					<line x1="0" y1="140" x2="520" y2="260" />
					<line x1="0" y1="300" x2="680" y2="390" />
					<line x1="0" y1="520" x2="760" y2="560" />
					<line x1="0" y1="760" x2="560" y2="700" />
					<line x1="0" y1="940" x2="680" y2="780" />
				</g>
				<g stroke="#D7263D" strokeWidth="4" strokeLinecap="round">
					<line x1="1920" y1="120" x2="1280" y2="280" />
					<line x1="1920" y1="280" x2="1220" y2="390" />
					<line x1="1920" y1="520" x2="1160" y2="540" />
					<line x1="1920" y1="760" x2="1300" y2="690" />
					<line x1="1920" y1="920" x2="1210" y2="760" />
				</g>
			</svg>

			{/* Shatter burst behind hero only */}
			<svg
				width="1100"
				height="760"
				viewBox="0 0 1100 760"
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: `translate(-50%, -50%) scale(${0.96 + speedBurst * 0.08})`,
					opacity: shatterOpacity,
					pointerEvents: 'none',
				}}
			>
				<g fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round">
					<path d="M550 380 L550 80" />
					<path d="M550 380 L790 120" />
					<path d="M550 380 L960 250" />
					<path d="M550 380 L980 430" />
					<path d="M550 380 L860 620" />
					<path d="M550 380 L550 700" />
					<path d="M550 380 L250 620" />
					<path d="M550 380 L120 450" />
					<path d="M550 380 L170 240" />
					<path d="M550 380 L310 110" />
				</g>
			</svg>

			<div
				style={{
					width: '94%',
					maxWidth: 1120,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '54px 16px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px) scale(${smashZoom})`,
					position: 'relative',
				}}
			>
				{/* TIER 1: Category Badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px) rotate(-1.2deg)`,
						backgroundColor: '#111111',
						border: '3px solid #3A86FF',
						borderRadius: 18,
						padding: '12px 26px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#D7263D',
							border: '2px solid #FFFFFF',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#FFFFFF',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							textShadow:
								'2px 2px 0 #111111, -2px 2px 0 #111111, 2px -2px 0 #111111, -2px -2px 0 #111111',
							whiteSpace: 'nowrap',
						}}
					>
						ACTIVATION CODE
					</div>

					<div
						style={{
							position: 'absolute',
							top: -12,
							right: -18,
							color: '#FFFFFF',
							fontSize: 14,
							fontWeight: 900,
							letterSpacing: 1,
							textTransform: 'uppercase',
							transform: 'rotate(12deg)',
							textShadow:
								'2px 2px 0 #D7263D, -2px 2px 0 #D7263D, 2px -2px 0 #D7263D, -2px -2px 0 #D7263D',
						}}
					>
						ping
					</div>
				</div>

				{/* TIER 2: Massive Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0 18px',
						position: 'relative',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '95%',
							minHeight: 548,
							backgroundColor: '#B8B8B8',
							border: '5px solid #FFFFFF',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.62)`,
							position: 'relative',
							overflow: 'hidden',
							padding: '42px 36px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							textAlign: 'center',
						}}
					>
						{/* Manga panel top strip */}
						<div
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								top: 0,
								height: 16,
								background:
									'linear-gradient(90deg, #D7263D 0%, #D7263D 50%, #3A86FF 50%, #3A86FF 100%)',
							}}
						/>

						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								backgroundColor: 'rgba(255,255,255,0.22)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Flash overlay */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundColor: `rgba(255,255,255,${panelFlash})`,
								pointerEvents: 'none',
							}}
						/>

						{/* Tiny SFX labels - placed safely in corners */}
						<div
							style={{
								position: 'absolute',
								top: 28,
								left: 24,
								color: '#D7263D',
								fontSize: 16,
								fontWeight: 900,
								letterSpacing: 1,
								textTransform: 'uppercase',
								transform: 'rotate(-10deg)',
								textShadow:
									'2px 2px 0 #111111, -2px 2px 0 #111111, 2px -2px 0 #111111, -2px -2px 0 #111111',
							}}
						>
							bam
						</div>

						<div
							style={{
								position: 'absolute',
								top: 30,
								right: 24,
								color: '#3A86FF',
								fontSize: 16,
								fontWeight: 900,
								letterSpacing: 1,
								textTransform: 'uppercase',
								transform: 'rotate(8deg)',
								textShadow:
									'2px 2px 0 #111111, -2px 2px 0 #111111, 2px -2px 0 #111111, -2px -2px 0 #111111',
							}}
						>
							whoosh
						</div>

						{/* Headline */}
						<div
							style={{
								marginTop: 44,
								maxWidth: 860,
								color: '#FFFFFF',
								fontSize: 76,
								fontWeight: 1000,
								fontStyle: 'italic',
								lineHeight: 0.98,
								letterSpacing: -1.5,
								textTransform: 'uppercase',
								textShadow:
									'4px 4px 0 #111111, -4px 4px 0 #111111, 4px -4px 0 #111111, -4px -4px 0 #111111, 0 8px 18px rgba(0,0,0,0.35)',
								whiteSpace: 'nowrap',
							}}
						>
							AUTOMATED MARGINS
						</div>

						{/* Metric block */}
						<div
							style={{
								transform: `scale(${metricPulse})`,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 14,
								padding: '24px 34px',
								backgroundColor: '#111111',
								border: '4px solid #D7263D',
								borderRadius: 28,
								boxShadow: `0 10px 30px rgba(215,38,61,${0.18 + freezeFrameAccent * 0.15})`,
								minWidth: 560,
							}}
						>
							<div
								style={{
									color: '#FFFFFF',
									fontSize: 82,
									fontWeight: 1000,
									fontStyle: 'italic',
									lineHeight: 0.92,
									letterSpacing: -2,
									textTransform: 'uppercase',
									textShadow:
										'4px 4px 0 #D7263D, -4px 4px 0 #D7263D, 4px -4px 0 #D7263D, -4px -4px 0 #D7263D',
									whiteSpace: 'nowrap',
								}}
							>
								{percent}%
							</div>

							<div
								style={{
									color: '#FFFFFF',
									fontSize: 30,
									fontWeight: 1000,
									fontStyle: 'italic',
									letterSpacing: 2.5,
									textTransform: 'uppercase',
									textShadow:
										'3px 3px 0 #111111, -3px 3px 0 #111111, 3px -3px 0 #111111, -3px -3px 0 #111111',
									whiteSpace: 'nowrap',
									opacity: showFinalCommission ? 1 : 0.78,
								}}
							>
								COMMISSION
							</div>
						</div>

						{/* Bottom status chip */}
						<div
							style={{
								marginBottom: 16,
								backgroundColor: '#3A86FF',
								border: '3px solid #FFFFFF',
								borderRadius: 18,
								padding: '10px 24px',
								boxShadow: '0 8px 20px rgba(0,0,0,0.28)',
							}}
						>
							<div
								style={{
									color: '#FFFFFF',
									fontSize: 20,
									fontWeight: 1000,
									fontStyle: 'italic',
									letterSpacing: 2,
									textTransform: 'uppercase',
									textShadow:
										'2px 2px 0 #111111, -2px 2px 0 #111111, 2px -2px 0 #111111, -2px -2px 0 #111111',
									whiteSpace: 'nowrap',
								}}
							>
								50% COMMISSION
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px) rotate(-0.8deg)`,
						backgroundColor: '#D7263D',
						border: '4px solid #FFFFFF',
						borderRadius: 22,
						padding: '16px 32px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.44)',
						textAlign: 'center',
						maxWidth: 900,
					}}
				>
					<div
						style={{
							color: '#FFFFFF',
							fontSize: 26,
							fontWeight: 1000,
							fontStyle: 'italic',
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							textShadow:
								'3px 3px 0 #111111, -3px 3px 0 #111111, 3px -3px 0 #111111, -3px -3px 0 #111111',
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