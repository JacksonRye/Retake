import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_12() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: SNAPPY ENTRANCE
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const heroIn = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// ------------------------------------------
	// BEAT 2: ACTIVE STATE / CARD CATALOG MOTION
	// ------------------------------------------
	const commissionReveal = interpolate(frame, [18, 56], [0, 1], clamp);
	const stampThunk =
		frame >= 42 && frame <= 50
			? interpolate(frame, [42, 46, 50], [0, 16, 0], clamp)
			: 0;

	const stampScale =
		frame >= 42 && frame <= 52
			? interpolate(frame, [42, 47, 52], [0.86, 1.08, 1], clamp)
			: 0.86;

	const drawerSlide = interpolate(frame, [8, 26], [-140, 0], clamp);
	const fichePan = interpolate(frame, [22, 70], [-40, 40], clamp);

	// ------------------------------------------
	// BEAT 3: CONTINUOUS LIVING LOOP
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 0.8) * 3;
	const shadowPulse = 16 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 16) % 70, [0, 70], [-260, 980], clamp);

	// ------------------------------------------
	// EXIT
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -56],
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
				backgroundColor: '#E8DCC0',
				opacity,
				fontFamily:
					'"Courier Prime", "American Typewriter", "Georgia", "Times New Roman", serif',
				color: '#2B2B33',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '26px 22px',
					boxSizing: 'border-box',
				}}
			>
				<div
					style={{
						width: '94%',
						height: '92%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-between',
						transform: `translateY(${exitY}px)`,
					}}
				>
					{/* TIER 1: CATEGORY BADGE */}
					<div
						style={{
							transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
							backgroundColor: '#9C9480',
							border: '3px solid #2B2B33',
							borderRadius: 14,
							padding: '12px 26px',
							boxShadow: '0 8px 18px rgba(43,43,51,0.16)',
							display: 'flex',
							alignItems: 'center',
							gap: 12,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: '50%',
								backgroundColor: '#C0392B',
								flexShrink: 0,
							}}
						/>
						<div
							style={{
								fontSize: 20,
								fontWeight: 900,
								letterSpacing: 3,
								textTransform: 'uppercase',
								color: '#2B2B33',
								textShadow: '0 1px 0 rgba(255,255,255,0.35)',
							}}
						>
							The Archive
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
							transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						}}
					>
						{/* Back shuffled cards */}
						<div
							style={{
								position: 'absolute',
								width: '88%',
								minHeight: 528,
								borderRadius: 28,
								backgroundColor: '#9C9480',
								border: '3px solid #2B2B33',
								transform: `translate(${drawerSlide * 0.18}px, 8px) rotate(-1.4deg)`,
								opacity: 0.5,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								width: '90%',
								minHeight: 540,
								borderRadius: 30,
								backgroundColor: '#E8DCC0',
								border: '3px solid #2B2B33',
								transform: `translate(${drawerSlide * 0.09}px, 4px) rotate(1.2deg)`,
								opacity: 0.72,
							}}
						/>

						{/* Main archive card */}
						<div
							style={{
								width: '96%',
								minHeight: 560,
								backgroundColor: '#F3EAD5',
								border: '4px solid #2B2B33',
								borderRadius: 32,
								boxShadow: `0 ${shadowPulse}px 28px rgba(43,43,51,0.2)`,
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								padding: '34px 34px 30px 34px',
								boxSizing: 'border-box',
							}}
						>
							{/* Microfiche / drawer pan texture */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									opacity: 0.08,
									backgroundImage:
										'linear-gradient(to bottom, #2B2B33 0px, #2B2B33 1px, transparent 1px, transparent 24px)',
									backgroundSize: '100% 24px',
									transform: `translateX(${fichePan}px)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Shine */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 120,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)',
									transform: `translateX(${shineOffset}px) skewX(-18deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Top metadata row */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-start',
									gap: 20,
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 10,
										maxWidth: '58%',
									}}
								>
									<div
										style={{
											backgroundColor: '#9C9480',
											border: '2px solid #2B2B33',
											borderRadius: 10,
											padding: '8px 14px',
											fontSize: 16,
											fontWeight: 900,
											letterSpacing: 2.4,
											textTransform: 'uppercase',
											width: 'fit-content',
											boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
										}}
									>
										Embossed Label
									</div>
									<div
										style={{
											fontSize: 24,
											lineHeight: 1,
											color: '#34558B',
											fontFamily:
												'"Bradley Hand", "Comic Sans MS", "Segoe Print", cursive',
											transform: 'rotate(-1.4deg)',
											whiteSpace: 'nowrap',
										}}
									>
										Call No. 5O-A
									</div>
								</div>

								<div
									style={{
										border: '2px solid #34558B',
										borderRadius: 12,
										padding: '10px 14px',
										minWidth: 150,
										textAlign: 'center',
										backgroundColor: 'rgba(52,85,139,0.08)',
									}}
								>
									<div
										style={{
											fontSize: 13,
											fontWeight: 900,
											letterSpacing: 2,
											textTransform: 'uppercase',
											color: '#34558B',
											marginBottom: 4,
										}}
									>
										Entry Type
									</div>
									<div
										style={{
											fontSize: 18,
											fontWeight: 800,
											letterSpacing: 1,
											color: '#2B2B33',
										}}
									>
										Commercial
									</div>
								</div>
							</div>

							{/* Center headline */}
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 26,
									flex: 1,
									position: 'relative',
									zIndex: 2,
									padding: '22px 0',
								}}
							>
								<div
									style={{
										textAlign: 'center',
										fontSize: 72,
										fontWeight: 1000,
										lineHeight: 1.03,
										letterSpacing: -1.4,
										textTransform: 'uppercase',
										color: '#2B2B33',
										maxWidth: '92%',
										textShadow: '0 1px 0 rgba(255,255,255,0.35)',
									}}
								>
									AUTOMATED MARGINS
								</div>

								<div
									style={{
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '18px 28px',
										borderRadius: 22,
										backgroundColor: '#2B2B33',
										border: '4px solid #C0392B',
										boxShadow: '0 10px 24px rgba(192,57,43,0.18)',
										minWidth: 560,
										transform: `translateY(${stampThunk}px) scale(${Math.max(
											commissionReveal,
											stampScale
										)})`,
									}}
								>
									<div
										style={{
											position: 'absolute',
											inset: 8,
											border: '2px dashed rgba(232,220,192,0.35)',
											borderRadius: 14,
											pointerEvents: 'none',
										}}
									/>
									<div
										style={{
											fontSize: 58,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: 1,
											color: '#E8DCC0',
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										50% COMMISSION
									</div>
								</div>
							</div>

							{/* Bottom card footer */}
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'flex-end',
									gap: 20,
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 8,
										maxWidth: '46%',
									}}
								>
									<div
										style={{
											fontSize: 14,
											fontWeight: 900,
											letterSpacing: 2.2,
											textTransform: 'uppercase',
											color: '#34558B',
										}}
									>
										Archive Note
									</div>
									<div
										style={{
											fontSize: 22,
											lineHeight: 1.1,
											color: '#2B2B33',
											fontFamily:
												'"Bradley Hand", "Comic Sans MS", "Segoe Print", cursive',
											transform: 'rotate(-1deg)',
										}}
									>
										scales without payroll drag
									</div>
								</div>

								<div
									style={{
										backgroundColor: '#C0392B',
										color: '#F7F1E3',
										border: '3px solid #2B2B33',
										borderRadius: 12,
										padding: '10px 16px',
										fontSize: 17,
										fontWeight: 900,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										boxShadow: '0 6px 14px rgba(43,43,51,0.15)',
										whiteSpace: 'nowrap',
									}}
								>
									Filed &amp; Proven
								</div>
							</div>
						</div>
					</div>

					{/* TIER 3: TAKEAWAY */}
					<div
						style={{
							transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
							backgroundColor: '#34558B',
							border: '3px solid #2B2B33',
							borderRadius: 18,
							padding: '16px 34px',
							boxShadow: '0 8px 18px rgba(43,43,51,0.16)',
							textAlign: 'center',
							maxWidth: '88%',
						}}
					>
						<div
							style={{
								color: '#E8DCC0',
								fontSize: 22,
								fontWeight: 900,
								letterSpacing: 2.2,
								textTransform: 'uppercase',
								lineHeight: 1.15,
								textShadow: '0 1px 0 rgba(0,0,0,0.14)',
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