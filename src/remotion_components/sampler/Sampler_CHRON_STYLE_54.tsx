import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_54() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1: SNAPPY PRESS-STAMP ENTRANCE
	// ==========================================
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const heroEntrance = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});

	const takeawayEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.65},
	});

	const stampDrop = interpolate(frame, [0, 10, 18], [-80, 10, 0], clamp);
	const stampSquash = interpolate(frame, [0, 8, 14, 22], [0.92, 1.04, 0.985, 1], clamp);
	const pressDepth = interpolate(frame, [0, 10, 20], [0, 1, 0.8], clamp);

	// ==========================================
	// BEAT 2: ACTIVE METRIC ROLL / STATE CHANGE
	// ==========================================
	const pctValue = Math.round(interpolate(frame, [18, 60], [12, 50], clamp));
	const metricGlow = interpolate(frame, [26, 60], [0.2, 1], clamp);
	const commissionReveal = interpolate(frame, [42, 56], [0, 1], clamp);

	// ==========================================
	// BEAT 3: LIVING PAPER HOVER + INK ROLL SHINE
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 14 + Math.sin(frame * 0.18) * 4;
	const inkSweep = interpolate((frame + 18) % 72, [0, 72], [-260, 980], clamp);
	const paperShift = Math.sin(frame * 0.1) * 2.5;

	// EXIT
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

	const debossText = (depth: number) =>
		`
      0 ${1.2 * depth}px 0 rgba(255,255,255,0.45),
      0 ${2.2 * depth}px 0 rgba(28,26,23,0.16),
      0 ${4.5 * depth}px ${8 * depth}px rgba(28,26,23,0.14)
    `.trim();

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F2EDE3',
				opacity,
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Subtle paper grain */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: 0.08,
					backgroundImage:
						'radial-gradient(rgba(28,26,23,0.18) 0.7px, transparent 0.8px)',
					backgroundSize: '12px 12px',
					pointerEvents: 'none',
				}}
			/>

			{/* Paper feed shadow */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: interpolate(frame, [0, 18], [-160, 0], clamp),
					height: 180,
					background:
						'linear-gradient(180deg, rgba(28,26,23,0.08), rgba(28,26,23,0))',
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 16px 52px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `translateY(${stampDrop * 0.45}px) scale(${badgeEntrance * 0.98 + 0.02})`,
						backgroundColor: '#F2EDE3',
						border: '3px solid #243B53',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: `
              0 2px 0 rgba(255,255,255,0.7),
              0 8px 18px rgba(28,26,23,0.10),
              inset 0 2px 0 rgba(255,255,255,0.65),
              inset 0 -3px 0 rgba(28,26,23,0.08)
            `,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#D34E24',
							boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.28)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#243B53',
							fontSize: 19,
							fontWeight: 900,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							textShadow: debossText(0.55),
							whiteSpace: 'nowrap',
						}}
					>
						LETTERPRESS SYSTEM
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
						margin: '24px 0',
						position: 'relative',
						transform: `translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#39414B',
							border: '4px solid #1C1A17',
							borderRadius: 34,
							position: 'relative',
							overflow: 'hidden',
							boxSizing: 'border-box',
							padding: '48px 40px 42px',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							transform: `translateY(${stampDrop}px) scale(${heroEntrance * stampSquash})`,
							boxShadow: `
                0 ${shadowPulse + 8}px 30px rgba(28,26,23,0.22),
                0 2px 0 rgba(255,255,255,0.22),
                inset 0 2px 0 rgba(255,255,255,0.15),
                inset 0 -5px 0 rgba(0,0,0,0.16)
              `,
						}}
					>
						{/* Ink roll sweep */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 180,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(242,237,227,0.12), rgba(255,255,255,0))',
								transform: `translateX(${inkSweep}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Inner press panel */}
						<div
							style={{
								position: 'absolute',
								inset: 16,
								borderRadius: 24,
								border: '2px solid rgba(242,237,227,0.18)',
								boxShadow: `inset 0 ${2 + pressDepth * 2}px 12px rgba(0,0,0,0.20)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Headline */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								minHeight: 148,
								padding: '0 12px',
								boxSizing: 'border-box',
								textAlign: 'center',
							}}
						>
							<div
								style={{
									color: '#F2EDE3',
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 0.98,
									letterSpacing: -1.6,
									textTransform: 'uppercase',
									textShadow: `
                    0 1px 0 rgba(255,255,255,0.14),
                    0 4px 0 rgba(28,26,23,0.38),
                    0 10px 18px rgba(0,0,0,0.22)
                  `,
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* Metric block */}
						<div
							style={{
								width: '78%',
								minWidth: 620,
								maxWidth: 760,
								backgroundColor: '#F2EDE3',
								border: '4px solid #1C1A17',
								borderRadius: 28,
								padding: '26px 24px 22px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 8,
								boxShadow: `
                  0 2px 0 rgba(255,255,255,0.75),
                  0 10px 22px rgba(28,26,23,0.12),
                  inset 0 2px 0 rgba(255,255,255,0.6),
                  inset 0 -4px 0 rgba(28,26,23,0.10)
                `,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'baseline',
									justifyContent: 'center',
									gap: 0,
									minHeight: 90,
								}}
							>
								<span
									style={{
										color: '#D34E24',
										fontSize: 84,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: -2,
										textShadow: `
                      0 1px 0 rgba(255,255,255,0.4),
                      0 3px 0 rgba(28,26,23,0.18),
                      0 8px 12px rgba(211,78,36,${0.12 + metricGlow * 0.12})
                    `,
									}}
								>
									{pctValue}%
								</span>
								<span
									style={{
										color: '#1C1A17',
										fontSize: 84,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: -2,
										textShadow: debossText(0.9),
										marginLeft: 2,
									}}
								>
									&nbsp;
								</span>
							</div>

							<div
								style={{
									height: 40,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									opacity: commissionReveal,
									transform: `translateY(${interpolate(
										frame,
										[42, 56],
										[10, 0],
										clamp
									)}px)`,
								}}
							>
								<div
									style={{
										color: '#243B53',
										fontSize: 30,
										fontWeight: 900,
										letterSpacing: 2.6,
										textTransform: 'uppercase',
										textShadow: debossText(0.7),
										whiteSpace: 'nowrap',
									}}
								>
									Commission
								</div>
							</div>
						</div>

						{/* Bottom in-card stamp */}
						<div
							style={{
								backgroundColor: '#D34E24',
								border: '3px solid #1C1A17',
								borderRadius: 16,
								padding: '10px 24px',
								boxShadow: `
                  0 2px 0 rgba(255,255,255,0.22),
                  0 8px 18px rgba(28,26,23,0.20),
                  inset 0 2px 0 rgba(255,255,255,0.18),
                  inset 0 -3px 0 rgba(28,26,23,0.18)
                `,
							}}
						>
							<div
								style={{
									color: '#F2EDE3',
									fontSize: 22,
									fontWeight: 900,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									textShadow: '0 2px 0 rgba(28,26,23,0.25)',
									whiteSpace: 'nowrap',
								}}
							>
								High-Leverage Revenue
							</div>
						</div>
					</div>

					{/* Side press accent - fully outside text zones */}
					<div
						style={{
							position: 'absolute',
							left: 26,
							top: '50%',
							transform: `translateY(-50%) translateX(${paperShift}px)`,
							width: 10,
							height: 240,
							borderRadius: 999,
							backgroundColor: '#243B53',
							boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.15)',
							opacity: 0.9,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							right: 26,
							top: '50%',
							transform: `translateY(-50%) translateX(${-paperShift}px)`,
							width: 10,
							height: 240,
							borderRadius: 999,
							backgroundColor: '#D34E24',
							boxShadow: 'inset 0 2px 2px rgba(255,255,255,0.15)',
							opacity: 0.9,
						}}
					/>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${Math.sin(
							frame * 0.12 + 1
						) * 3}px)`,
						backgroundColor: '#F2EDE3',
						border: '3px solid #1C1A17',
						borderRadius: 22,
						padding: '16px 30px',
						boxShadow: `
              0 2px 0 rgba(255,255,255,0.7),
              0 10px 22px rgba(28,26,23,0.12),
              inset 0 2px 0 rgba(255,255,255,0.6),
              inset 0 -4px 0 rgba(28,26,23,0.08)
            `,
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#1C1A17',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.1,
							textTransform: 'uppercase',
							textShadow: debossText(0.7),
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