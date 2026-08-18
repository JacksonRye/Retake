import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_98() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});
	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.65},
	});
	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// Beat 2: active counter/state switch
	const metricProgress = interpolate(frame, [16, 54], [0, 1], clamp);
	const commissionValue = Math.round(interpolate(metricProgress, [0, 1], [12, 50], clamp));
	const metricText = `${commissionValue}% COMMISSION`;
	const metricGlow = interpolate(frame, [30, 42, 54], [0.2, 1, 0.5], clamp);

	const freezeTear = frame >= 58 && frame <= 72;
	const tearShift = freezeTear ? (frame % 2 === 0 ? 8 : -8) : 0;
	const smearWidth = interpolate(frame, [60, 72], [0, 130], clamp);

	// Beat 3: continuous living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeHover = Math.sin(frame * 0.1) * 3;
	const takeawayHover = Math.sin(frame * 0.12 + 1.4) * 3;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-240, 980], clamp);

	// Subtle corrupted feed effects
	const rgbJitterA = Math.sin(frame * 0.9) * 1.2;
	const rgbJitterB = Math.cos(frame * 1.1) * 1.1;
	const noiseFlash1 = frame >= 24 && frame <= 28;
	const noiseFlash2 = frame >= 82 && frame <= 86;
	const noiseOpacity = noiseFlash1 || noiseFlash2 ? 0.16 : 0.04;

	const blockNoiseX = interpolate((frame * 17) % 40, [0, 39], [0, 260], clamp);
	const blockNoiseY = interpolate((frame * 11) % 50, [0, 49], [0, 180], clamp);

	const exitY = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [0, -54], clamp);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0B0B0E',
				opacity,
				fontFamily:
					'"SFMono-Regular","Menlo","Consolas","Liberation Mono","Courier New",monospace',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* full-screen subtle corrupted background layers */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'repeating-linear-gradient(180deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 2px, transparent 2px, transparent 6px)',
					opacity: 0.45,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'linear-gradient(90deg, rgba(255,30,86,0.045) 0%, transparent 28%, transparent 72%, rgba(62,107,255,0.04) 100%)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: `${16 + blockNoiseY}%`,
					left: `${8 + blockNoiseX * 0.22}px`,
					width: 140,
					height: 24,
					backgroundColor: 'rgba(255,30,86,0.08)',
					opacity: noiseOpacity,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					top: `${56 + ((blockNoiseY * 0.16) % 12)}%`,
					right: `${40 + (blockNoiseX % 80)}px`,
					width: 110,
					height: 18,
					backgroundColor: 'rgba(0,224,143,0.08)',
					opacity: noiseOpacity,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					bottom: `${14 + ((blockNoiseY * 0.12) % 10)}%`,
					left: `${90 + (blockNoiseX % 120)}px`,
					width: 86,
					height: 16,
					backgroundColor: 'rgba(62,107,255,0.08)',
					opacity: noiseOpacity,
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
					padding: '54px 18px 42px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeHover}px)`,
						backgroundColor: 'rgba(237,237,237,0.96)',
						border: '3px solid #FF1E56',
						borderRadius: 14,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 28px rgba(0,0,0,0.42)',
						position: 'relative',
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#00E08F',
							boxShadow: '0 0 12px rgba(0,224,143,0.65)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							position: 'relative',
							color: '#0B0B0E',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						<span
							style={{
								position: 'absolute',
								inset: 0,
								transform: `translate(${rgbJitterA}px, 0px)`,
								color: '#3E6BFF',
								opacity: 0.35,
								mixBlendMode: 'multiply',
								pointerEvents: 'none',
							}}
						>
							PROTOCOL FEED
						</span>
						<span
							style={{
								position: 'absolute',
								inset: 0,
								transform: `translate(${-rgbJitterB}px, 0px)`,
								color: '#FF1E56',
								opacity: 0.4,
								mixBlendMode: 'multiply',
								pointerEvents: 'none',
							}}
						>
							PROTOCOL FEED
						</span>
						<span style={{position: 'relative'}}>PROTOCOL FEED</span>
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
						margin: '24px 0 18px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#EDEDED',
							border: '4px solid #0B0B0E',
							borderRadius: 30,
							boxSizing: 'border-box',
							padding: '46px 38px 40px',
							boxShadow: '0 24px 52px rgba(0,0,0,0.58)',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: '1fr auto 1fr',
							alignItems: 'center',
							justifyItems: 'center',
						}}
					>
						{/* shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.52) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top chrome line */}
						<div
							style={{
								position: 'absolute',
								top: 18,
								left: 20,
								right: 20,
								height: 12,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								pointerEvents: 'none',
							}}
						>
							<div style={{display: 'flex', gap: 8}}>
								<div
									style={{
										width: 12,
										height: 12,
										borderRadius: '50%',
										backgroundColor: '#FF1E56',
									}}
								/>
								<div
									style={{
										width: 12,
										height: 12,
										borderRadius: '50%',
										backgroundColor: '#00E08F',
									}}
								/>
								<div
									style={{
										width: 12,
										height: 12,
										borderRadius: '50%',
										backgroundColor: '#3E6BFF',
									}}
								/>
							</div>
							<div
								style={{
									width: 170,
									height: 6,
									backgroundColor: 'rgba(11,11,14,0.14)',
									borderRadius: 999,
								}}
							/>
						</div>

						{/* headline block */}
						<div
							style={{
								alignSelf: 'start',
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								paddingTop: 34,
								position: 'relative',
							}}
						>
							<div
								style={{
									position: 'relative',
									textAlign: 'center',
									maxWidth: '92%',
									lineHeight: 0.96,
									fontWeight: 1000,
									fontSize: 72,
									letterSpacing: -2.2,
									textTransform: 'uppercase',
									color: '#0B0B0E',
								}}
							>
								<span
									style={{
										position: 'absolute',
										inset: 0,
										transform: `translate(${2 + rgbJitterA}px, 0px)`,
										color: '#FF1E56',
										opacity: 0.8,
										pointerEvents: 'none',
									}}
								>
									AUTOMATED MARGINS
								</span>
								<span
									style={{
										position: 'absolute',
										inset: 0,
										transform: `translate(${-2 + rgbJitterB}px, 0px)`,
										color: '#3E6BFF',
										opacity: 0.62,
										pointerEvents: 'none',
									}}
								>
									AUTOMATED MARGINS
								</span>
								<span
									style={{
										position: 'relative',
										textShadow:
											frame % 10 < 2
												? '1px 0 0 #00E08F, -1px 0 0 #FF1E56'
												: 'none',
									}}
								>
									AUTOMATED MARGINS
								</span>
							</div>
						</div>

						{/* metric block */}
						<div
							style={{
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '24px 30px',
								borderRadius: 24,
								backgroundColor: '#0B0B0E',
								border: '4px solid #FF1E56',
								boxShadow: `0 0 ${20 + metricGlow * 26}px rgba(255,30,86,0.32), 0 10px 34px rgba(0,0,0,0.34)`,
								width: '88%',
								maxWidth: 760,
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									position: 'absolute',
									left: -10,
									top: 0,
									bottom: 0,
									width: smearWidth,
									background:
										'linear-gradient(90deg, rgba(62,107,255,0.0) 0%, rgba(62,107,255,0.18) 50%, rgba(255,30,86,0.0) 100%)',
									opacity: freezeTear ? 0.9 : 0,
									pointerEvents: 'none',
								}}
							/>
							<div
								style={{
									position: 'relative',
									textAlign: 'center',
									fontWeight: 1000,
									fontSize: 62,
									lineHeight: 1,
									letterSpacing: -1.6,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
									transform: `translateX(${tearShift}px)`,
								}}
							>
								<span
									style={{
										position: 'absolute',
										inset: 0,
										transform: `translate(${1.8 + rgbJitterA}px, 0px)`,
										color: '#3E6BFF',
										opacity: 0.72,
										pointerEvents: 'none',
									}}
								>
									{metricText}
								</span>
								<span
									style={{
										position: 'absolute',
										inset: 0,
										transform: `translate(${-1.8 + rgbJitterB}px, 0px)`,
										color: '#00E08F',
										opacity: 0.62,
										pointerEvents: 'none',
									}}
								>
									{metricText}
								</span>
								<span style={{position: 'relative', color: '#FF1E56'}}>{metricText}</span>
							</div>
						</div>

						{/* lower system strip */}
						<div
							style={{
								alignSelf: 'end',
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								paddingBottom: 10,
							}}
						>
							<div
								style={{
									backgroundColor: '#00E08F',
									color: '#0B0B0E',
									border: '3px solid #0B0B0E',
									borderRadius: 14,
									padding: '12px 24px',
									fontSize: 20,
									fontWeight: 900,
									letterSpacing: 2.4,
									textTransform: 'uppercase',
									lineHeight: 1,
									textAlign: 'center',
									boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
									maxWidth: '88%',
									whiteSpace: 'nowrap',
								}}
							>
								SYSTEMIZED PROFIT FLOW
							</div>
						</div>

						{/* tear bars inside card, carefully away from text centerlines */}
						<div
							style={{
								position: 'absolute',
								top: 126,
								left: 26,
								width: 96,
								height: 10,
								backgroundColor: 'rgba(255,30,86,0.15)',
								opacity: frame % 18 < 3 ? 1 : 0.2,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 144,
								right: 34,
								width: 122,
								height: 8,
								backgroundColor: 'rgba(62,107,255,0.14)',
								opacity: frame % 22 < 4 ? 1 : 0.18,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								bottom: 106,
								left: 54,
								width: 88,
								height: 8,
								backgroundColor: 'rgba(0,224,143,0.14)',
								opacity: frame % 20 < 3 ? 1 : 0.14,
							}}
						/>
					</div>
				</div>

				{/* TIER 3: takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayHover}px)`,
						backgroundColor: '#FF1E56',
						border: '3px solid #EDEDED',
						borderRadius: 18,
						padding: '16px 30px',
						boxShadow: '0 10px 26px rgba(0,0,0,0.4)',
						textAlign: 'center',
						position: 'relative',
						overflow: 'hidden',
						maxWidth: '92%',
					}}
				>
					<div
						style={{
							position: 'relative',
							color: '#EDEDED',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							lineHeight: 1.05,
							whiteSpace: 'nowrap',
						}}
					>
						<span
							style={{
								position: 'absolute',
								inset: 0,
								transform: `translate(${1.2 + rgbJitterA}px, 0px)`,
								color: '#3E6BFF',
								opacity: 0.45,
								pointerEvents: 'none',
							}}
						>
							PURE SOFTWARE LEVERAGE
						</span>
						<span
							style={{
								position: 'absolute',
								inset: 0,
								transform: `translate(${-1.2 + rgbJitterB}px, 0px)`,
								color: '#00E08F',
								opacity: 0.45,
								pointerEvents: 'none',
							}}
						>
							PURE SOFTWARE LEVERAGE
						</span>
						<span style={{position: 'relative'}}>PURE SOFTWARE LEVERAGE</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}