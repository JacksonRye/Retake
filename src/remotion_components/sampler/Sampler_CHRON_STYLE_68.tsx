import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_68() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});
	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.7},
	});
	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.75},
	});

	// Beat 2: Active score/state switch
	const countValue = Math.round(interpolate(frame, [16, 54], [8, 50], clamp));
	const metricText = `${countValue}% COMMISSION`;
	const blinkPrompt = Math.floor(frame / 10) % 2 === 0 ? 1 : 0.28;
	const explosionWindow = frame >= 50 && frame <= 62;
	const explosionScale = interpolate(frame, [50, 56, 62], [0.6, 1.25, 0.95], clamp);
	const explosionOpacity = interpolate(frame, [50, 58, 62], [0, 1, 0], clamp);

	// Sprite walk cycle
	const spriteStep = Math.floor(frame / 6) % 2;
	const spriteX = interpolate(frame, [22, 58], [-120, 80], clamp);

	// Beat 3: Continuous living hover + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 10) % 70, [0, 70], [-240, 900], clamp);

	// Small arcade shake only during explosion
	const shakeX = explosionWindow ? Math.sin(frame * 2.6) * 4 : 0;
	const shakeY = explosionWindow ? Math.cos(frame * 2.1) * 3 : 0;

	// Outro
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

	const pixelFont =
		'"Press Start 2P", "VT323", "Courier New", monospace';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0A0A14',
				opacity,
				fontFamily: pixelFont,
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Background grid */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
            linear-gradient(rgba(0,240,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,240,255,0.06) 1px, transparent 1px)
          `,
					backgroundSize: '48px 48px',
					opacity: 0.35,
				}}
			/>

			{/* Ambient scan lines */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage:
						'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.00) 50%, rgba(255,255,255,0.05) 100%)',
					backgroundSize: '100% 6px',
					opacity: 0.18,
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
					padding: '56px 18px 44px',
					boxSizing: 'border-box',
					transform: `translate(${shakeX}px, ${shakeY + exitY}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#0A0A14',
						border: '4px solid #00F0FF',
						borderRadius: 14,
						padding: '14px 26px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 0 0 4px rgba(242,242,242,0.08), 0 0 24px rgba(0,240,255,0.22)',
					}}
				>
					<div
						style={{
							color: '#00F0FF',
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
							lineHeight: 1,
						}}
					>
						INSERT COIN
					</div>
				</div>

				{/* TIER 2: Massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#F2F2F2',
							border: '6px solid #FF2079',
							borderRadius: 28,
							boxShadow: `0 ${shadowPulse}px 40px rgba(0,0,0,0.55), 0 0 0 6px rgba(255,211,0,0.15) inset`,
							padding: '40px 34px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Card top HUD */}
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
									backgroundColor: '#FFD300',
									color: '#0A0A14',
									padding: '8px 14px',
									borderRadius: 10,
									fontSize: 14,
									fontWeight: 900,
									lineHeight: 1,
									letterSpacing: 1,
								}}
							>
								1UP
							</div>
							<div
								style={{
									color: '#FF2079',
									fontSize: 16,
									fontWeight: 900,
									lineHeight: 1,
									letterSpacing: 2,
								}}
							>
								STAGE 50
							</div>
						</div>

						{/* Headline */}
						<div
							style={{
								width: '100%',
								textAlign: 'center',
								padding: '8px 12px 0',
							}}
						>
							<div
								style={{
									color: '#FF2079',
									fontSize: 66,
									fontWeight: 900,
									lineHeight: 1.02,
									letterSpacing: -1,
									textTransform: 'uppercase',
									textShadow: '4px 4px 0 #0A0A14',
								}}
							>
								AUTOMATED
							</div>
							<div
								style={{
									color: '#FF2079',
									fontSize: 66,
									fontWeight: 900,
									lineHeight: 1.02,
									letterSpacing: -1,
									textTransform: 'uppercase',
									textShadow: '4px 4px 0 #0A0A14',
									marginTop: 4,
								}}
							>
								MARGINS
							</div>
						</div>

						{/* Center metric block */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 18,
								position: 'relative',
								padding: '8px 0',
							}}
						>
							<div
								style={{
									backgroundColor: '#0A0A14',
									border: '5px solid #00F0FF',
									borderRadius: 24,
									padding: '22px 32px',
									minWidth: 620,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 0 28px rgba(0,240,255,0.25)',
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										color: '#FFD300',
										fontSize: 54,
										fontWeight: 900,
										lineHeight: 1,
										letterSpacing: 1,
										textTransform: 'uppercase',
										textAlign: 'center',
										textShadow: '3px 3px 0 #FF2079',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>

							{/* Explosion accent placed behind metric, collision-free */}
							<div
								style={{
									position: 'absolute',
									width: 280,
									height: 280,
									opacity: explosionOpacity,
									transform: `scale(${explosionScale})`,
									zIndex: 1,
									pointerEvents: 'none',
								}}
							>
								<svg width="280" height="280" viewBox="0 0 280 280">
									<g transform="translate(140 140)">
										{Array.from({length: 12}).map((_, i) => {
											const angle = (i / 12) * Math.PI * 2;
											const x1 = Math.cos(angle) * 52;
											const y1 = Math.sin(angle) * 52;
											const x2 = Math.cos(angle) * 108;
											const y2 = Math.sin(angle) * 108;
											return (
												<line
													key={i}
													x1={x1}
													y1={y1}
													x2={x2}
													y2={y2}
													stroke={i % 2 === 0 ? '#FF2079' : '#FFD300'}
													strokeWidth={8}
													strokeLinecap="round"
												/>
											);
										})}
									</g>
								</svg>
							</div>

							<div
								style={{
									color: '#0A0A14',
									backgroundColor: '#FFD300',
									border: '4px solid #0A0A14',
									borderRadius: 12,
									padding: '10px 18px',
									fontSize: 16,
									fontWeight: 900,
									lineHeight: 1,
									letterSpacing: 1,
									textTransform: 'uppercase',
									opacity: blinkPrompt,
									zIndex: 3,
								}}
							>
								PRESS START
							</div>
						</div>

						{/* Bottom HUD row */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'flex-end',
								marginTop: 10,
							}}
						>
							{/* Sprite */}
							<div
								style={{
									width: 108,
									height: 72,
									position: 'relative',
									overflow: 'visible',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: spriteX,
										bottom: 0,
										width: 70,
										height: 62,
										transform: `scale(${spriteStep === 0 ? 1 : 1.02})`,
									}}
								>
									<svg width="70" height="62" viewBox="0 0 70 62">
										<rect x="24" y="6" width="20" height="16" fill="#FF2079" />
										<rect x="18" y="22" width="32" height="18" fill="#00F0FF" />
										<rect x="12" y="26" width="6" height="12" fill="#FFD300" />
										<rect x="50" y="26" width="6" height="12" fill="#FFD300" />
										<rect
											x={spriteStep === 0 ? 24 : 20}
											y="40"
											width="8"
											height="18"
											fill="#0A0A14"
										/>
										<rect
											x={spriteStep === 0 ? 38 : 42}
											y="40"
											width="8"
											height="18"
											fill="#0A0A14"
										/>
									</svg>
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'flex-end',
									gap: 8,
								}}
							>
								<div
									style={{
										color: '#00F0FF',
										fontSize: 14,
										fontWeight: 900,
										lineHeight: 1,
										letterSpacing: 1,
										textTransform: 'uppercase',
									}}
								>
									HIGH SCORE
								</div>
								<div
									style={{
										color: '#FF2079',
										fontSize: 26,
										fontWeight: 900,
										lineHeight: 1,
										letterSpacing: 1,
										textShadow: '2px 2px 0 #0A0A14',
									}}
								>
									0050000
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FF2079',
						border: '4px solid #FFD300',
						borderRadius: 18,
						padding: '16px 28px',
						boxShadow: '0 10px 28px rgba(0,0,0,0.42)',
						textAlign: 'center',
						maxWidth: 820,
					}}
				>
					<div
						style={{
							color: '#F2F2F2',
							fontSize: 22,
							fontWeight: 900,
							lineHeight: 1.1,
							letterSpacing: 1,
							textTransform: 'uppercase',
							textShadow: '2px 2px 0 #0A0A14',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}