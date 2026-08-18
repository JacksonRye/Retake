import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_43() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1 — letterbox / chapter-card entrance
	// ------------------------------------------
	const masterIn = spring({
		frame,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.75},
	});

	const badgeIn = spring({
		frame: frame - 4,
		fps,
		config: {damping: 13, stiffness: 230, mass: 0.65},
	});

	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 15, stiffness: 200, mass: 0.8},
	});

	const subtitleIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 14, stiffness: 170, mass: 0.8},
	});

	const topLetterbox = interpolate(frame, [0, 14], [160, 64], clamp);
	const bottomLetterbox = interpolate(frame, [0, 14], [160, 64], clamp);

	// ------------------------------------------
	// BEAT 2 — metric state roll
	// ------------------------------------------
	const commissionRaw = Math.round(
		interpolate(frame, [20, 58], [12, 50], clamp)
	);
	const metricText = `${commissionRaw}% COMMISSION`;

	const chapterFlash = interpolate(frame, [26, 34, 42], [0.88, 1, 0.94], clamp);
	const metricGlow = interpolate(frame, [24, 58], [0.16, 0.28], clamp);

	// ------------------------------------------
	// BEAT 3 — subtle living hover / dolly / shine
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.4;
	const dollyX = Math.sin(frame * 0.03) * 10;
	const shineOffset = interpolate((frame + 18) % 80, [0, 80], [-260, 980], clamp);
	const grainDrift = Math.sin(frame * 0.05) * 6;

	// ------------------------------------------
	// exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -42],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0C0C0C',
				opacity,
				fontFamily:
					'"Times New Roman", "Georgia", "Iowan Old Style", "Palatino Linotype", serif',
				color: '#F5F5F1',
				overflow: 'hidden',
			}}
		>
			{/* film grain / vignette */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.015) 28%, rgba(0,0,0,0.18) 72%, rgba(0,0,0,0.35) 100%)',
					pointerEvents: 'none',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: -20,
					opacity: 0.08,
					transform: `translateX(${grainDrift}px)`,
					backgroundImage:
						'radial-gradient(rgba(245,245,241,0.35) 0.7px, transparent 0.7px)',
					backgroundSize: '8px 8px',
					mixBlendMode: 'soft-light',
					pointerEvents: 'none',
				}}
			/>

			{/* letterbox bars */}
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					height: topLetterbox,
					backgroundColor: '#0C0C0C',
					zIndex: 50,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					height: bottomLetterbox,
					backgroundColor: '#0C0C0C',
					zIndex: 50,
				}}
			/>

			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '84px 12px 84px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1 — chapter badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 18,
						padding: '12px 24px',
						border: '1.5px solid #44464B',
						backgroundColor: 'rgba(57, 65, 75, 0.52)',
						borderRadius: 999,
						boxShadow: '0 8px 22px rgba(0,0,0,0.34)',
						backdropFilter: 'blur(2px)',
					}}
				>
					<div
						style={{
							color: '#D9C58B',
							fontSize: 19,
							fontWeight: 700,
							letterSpacing: 4,
							textTransform: 'uppercase',
							lineHeight: 1,
						}}
					>
						Chapter IV
					</div>
					<div
						style={{
							width: 6,
							height: 6,
							borderRadius: '50%',
							backgroundColor: '#D9C58B',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F5F5F1',
							fontSize: 15,
							fontWeight: 600,
							letterSpacing: 3,
							textTransform: 'uppercase',
							lineHeight: 1,
						}}
					>
						Foreign Feature
					</div>
				</div>

				{/* TIER 2 — hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						transform: `scale(${cardIn}) translate(${dollyX}px, ${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							maxWidth: 1100,
							minHeight: 548,
							backgroundColor: '#39414B',
							border: '2px solid #D9C58B',
							borderRadius: 30,
							boxShadow: '0 22px 46px rgba(0,0,0,0.52)',
							position: 'relative',
							overflow: 'hidden',
							padding: '44px 46px 42px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						{/* frame lines */}
						<div
							style={{
								position: 'absolute',
								top: 16,
								left: 16,
								right: 16,
								height: 1,
								backgroundColor: 'rgba(217,197,139,0.38)',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 16,
								left: 16,
								right: 16,
								height: 1,
								backgroundColor: 'rgba(217,197,139,0.38)',
							}}
						/>

						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(245,245,241,0.14) 45%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* upper small caps */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								minHeight: 42,
								gap: 16,
							}}
						>
							<div
								style={{
									color: '#D9C58B',
									fontSize: 16,
									fontWeight: 700,
									letterSpacing: 4,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								Selected Scene
							</div>
							<div
								style={{
									color: '#F5F5F1',
									fontSize: 14,
									fontWeight: 600,
									letterSpacing: 3,
									textTransform: 'uppercase',
									opacity: 0.8,
									whiteSpace: 'nowrap',
								}}
							>
								Chronicle Format
							</div>
						</div>

						{/* center body */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								textAlign: 'center',
								gap: 28,
								padding: '8px 10px',
								flex: 1,
							}}
						>
							<div
								style={{
									color: '#F5F5F1',
									fontSize: 72,
									fontWeight: 700,
									letterSpacing: -0.8,
									lineHeight: 1.03,
									textTransform: 'uppercase',
									maxWidth: 880,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									width: '84%',
									maxWidth: 760,
									height: 1,
									backgroundColor: 'rgba(245,245,241,0.18)',
								}}
							/>

							<div
								style={{
									transform: `scale(${chapterFlash})`,
									backgroundColor: 'rgba(12,12,12,0.38)',
									border: '2px solid #D9C58B',
									borderRadius: 22,
									padding: '24px 34px',
									minWidth: 620,
									boxShadow: `0 0 0 1px rgba(217,197,139,0.08), 0 10px 28px rgba(0,0,0,0.28), 0 0 28px rgba(217,197,139,${metricGlow})`,
								}}
							>
								<div
									style={{
										color: '#D9C58B',
										fontSize: 20,
										fontWeight: 700,
										letterSpacing: 4,
										textTransform: 'uppercase',
										lineHeight: 1,
										marginBottom: 10,
									}}
								>
									Commission Rate
								</div>
								<div
									style={{
										color: '#F5F5F1',
										fontSize: 62,
										fontWeight: 700,
										letterSpacing: 0.5,
										lineHeight: 1.02,
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>
						</div>

						{/* subtitle strip */}
						<div
							style={{
								alignSelf: 'center',
								width: '92%',
								backgroundColor: 'rgba(12,12,12,0.86)',
								borderTop: '1px solid rgba(245,245,241,0.16)',
								borderBottom: '1px solid rgba(245,245,241,0.16)',
								padding: '14px 24px',
								boxSizing: 'border-box',
								transform: `scale(${subtitleIn})`,
								opacity: subtitleIn,
							}}
						>
							<div
								style={{
									color: '#F5F5F1',
									fontSize: 28,
									fontWeight: 500,
									lineHeight: 1.15,
									textAlign: 'center',
									letterSpacing: 0.2,
								}}
							>
								Pure software leverage turns repeatable demand into durable margin.
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 — takeaway */}
				<div
					style={{
						transform: `scale(${masterIn}) translateY(${Math.sin(frame * 0.12 + 0.9) * 3}px)`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: '14px 28px',
						borderTop: '1.5px solid #D9C58B',
						borderBottom: '1.5px solid #D9C58B',
						backgroundColor: 'rgba(12,12,12,0.52)',
						minWidth: 620,
					}}
				>
					<div
						style={{
							color: '#D9C58B',
							fontSize: 22,
							fontWeight: 700,
							letterSpacing: 4,
							textTransform: 'uppercase',
							textAlign: 'center',
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