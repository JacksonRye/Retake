import React from 'react';
import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export default function Style69Page100Teletext_Scene4() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1: ENTRANCE
	// ==========================================
	const headerRows = Math.floor(interpolate(frame, [0, 24], [0, 6], clamp));
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});
	const heroEntrance = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});
	const leftLabelSpring = spring({
		frame: frame - 8,
		fps,
		config: {damping: 10, stiffness: 250, mass: 0.7},
	});
	const rightLabelSpring = spring({
		frame: frame - 11,
		fps,
		config: {damping: 10, stiffness: 250, mass: 0.7},
	});

	const leftLabelX = interpolate(leftLabelSpring, [0, 1], [-180, 0], clamp);
	const rightLabelX = interpolate(rightLabelSpring, [0, 1], [180, 0], clamp);

	// ==========================================
	// BEAT 2: ACTIVE MATCH + FEE REVEAL
	// ==========================================
	const matchProgress = interpolate(frame, [30, 58], [0, 1], clamp);
	const barWidth = interpolate(matchProgress, [0, 1], [0, 100], clamp);
	const lockThunk = frame >= 58 && frame <= 65 ? interpolate(frame, [58, 61, 65], [0, 14, 0], clamp) : 0;
	const lockShadow = frame >= 58 && frame <= 65 ? interpolate(frame, [58, 61, 65], [18, 7, 18], clamp) : 18;

	const feeValue = Math.round(interpolate(frame, [46, 66], [0, 15], clamp));
	const feeText = `${feeValue.toString().padStart(2, '0')}%`;

	const revealFlash = interpolate(frame, [47, 52, 57], [0, 1, 0], clamp);
	const feeRevealScale = spring({
		frame: frame - 46,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.6},
	});

	// ==========================================
	// BEAT 3: CONTINUOUS LIVING LOOP
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.1;
	const shadowPulse = lockShadow + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 70, [0, 70], [-320, 940], clamp);
	const scanOffset = interpolate((frame * 10) % 900, [0, 900], [-220, 760], clamp);
	const feePulse = 0.92 + ((Math.sin(frame * 0.18) + 1) / 2) * 0.16;
	const feeGlow = 0.65 + ((Math.sin(frame * 0.18 + 1.2) + 1) / 2) * 0.35;
	const pageTick = Math.floor(interpolate((frame % 30), [0, 29], [100, 103], clamp));

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -70], clamp);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp,
	);

	const headerRowStyle = (active: boolean): React.CSSProperties => ({
		height: 18,
		width: '100%',
		backgroundColor: active ? '#FFFF00' : 'transparent',
	});

	const teleBlock = (color: string): React.CSSProperties => ({
		width: 14,
		height: 14,
		backgroundColor: color,
		flexShrink: 0,
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#000000',
				opacity,
				fontFamily: '"Courier New", "Lucida Console", monospace',
				color: '#FFFF00',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '86%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '60px 14px 58px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
					}}
				>
					<div
						style={{
							width: '96%',
							border: '4px solid #FF0000',
							backgroundColor: '#000000',
							boxShadow: '0 0 0 3px #FFFF00 inset',
							padding: '14px 18px',
							display: 'flex',
							alignItems: 'center',
							gap: 18,
						}}
					>
						<div style={{display: 'flex', gap: 6, alignItems: 'center'}}>
							<div style={teleBlock('#00FF00')} />
							<div style={teleBlock('#00FFFF')} />
							<div style={teleBlock('#FF0000')} />
						</div>

						<div
							style={{
								fontSize: 26,
								fontWeight: 900,
								letterSpacing: 2,
								color: '#00FFFF',
								minWidth: 120,
							}}
						>
							P{pageTick}
						</div>

						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: 5,
							}}
						>
							{[0, 1, 2, 3, 4, 5].map((row) => (
								<div key={row} style={headerRowStyle(row < headerRows)} />
							))}
							<div
								style={{
									position: 'absolute',
									left: 0,
									right: 0,
									top: 14,
									bottom: 14,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									pointerEvents: 'none',
								}}
							>
								<div
									style={{
										fontSize: 54,
										fontWeight: 900,
										letterSpacing: 3,
										color: headerRows >= 5 ? '#000000' : 'transparent',
										textTransform: 'uppercase',
										lineHeight: 1,
										textAlign: 'center',
									}}
								>
									NO.2 RECRUITMENT
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '24px 0',
						transform: `scale(${heroEntrance}) translateY(${hoverY + lockThunk}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 560,
							backgroundColor: '#000000',
							border: '7px solid #FF0000',
							boxShadow: `${shadowPulse}px ${shadowPulse}px 0px #FFFF00`,
							borderRadius: 28,
							padding: '34px 28px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 18,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Traveling teletext shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 110,
								backgroundColor: 'rgba(255,255,255,0.18)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* faint teletext grid */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								backgroundImage:
									'linear-gradient(rgba(255,255,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.08) 1px, transparent 1px)',
								backgroundSize: '24px 24px',
								opacity: 0.35,
								pointerEvents: 'none',
							}}
						/>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 18,
							}}
						>
							<div
								style={{
									flex: 1,
									minHeight: 160,
									border: '4px solid #FFFF00',
									backgroundColor: '#000000',
									padding: '18px 14px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transform: `translateX(${leftLabelX}px)`,
									boxShadow: '-8px 8px 0px #00FFFF',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: 64,
										fontWeight: 900,
										letterSpacing: 2,
										lineHeight: 0.95,
										color: '#FFFF00',
										textTransform: 'uppercase',
									}}
								>
									EMPLOYEE
								</div>
							</div>

							<div
								style={{
									width: 140,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
									height: 44,
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										right: 0,
										height: 16,
										border: '3px solid #00FFFF',
										backgroundColor: '#000000',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 0,
										height: 24,
										width: `${barWidth}%`,
										backgroundColor: '#00FFFF',
										boxShadow: matchProgress > 0.98 ? '0 0 24px #00FFFF' : 'none',
									}}
								/>
							</div>

							<div
								style={{
									flex: 1,
									minHeight: 160,
									border: '4px solid #FFFF00',
									backgroundColor: '#000000',
									padding: '18px 14px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transform: `translateX(${rightLabelX}px)`,
									boxShadow: '8px 8px 0px #00FFFF',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: 64,
										fontWeight: 900,
										letterSpacing: 2,
										lineHeight: 0.95,
										color: '#FFFF00',
										textTransform: 'uppercase',
									}}
								>
									EMPLOYER
								</div>
							</div>
						</div>

						<div
							style={{
								flex: 1,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
							}}
						>
							<div
								style={{
									position: 'absolute',
									width: 420,
									height: 220,
									backgroundColor: '#FF0000',
									opacity: revealFlash * 0.9,
									filter: 'blur(10px)',
								}}
							/>

							<div
								style={{
									position: 'absolute',
									left: scanOffset,
									top: '50%',
									transform: 'translateY(-50%)',
									width: 180,
									height: 8,
									backgroundColor: '#FFFFFF',
									opacity: matchProgress > 0.95 ? 0.75 : 0,
									boxShadow: '0 0 20px #FFFFFF',
								}}
							/>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 18,
									transform: `scale(${feeRevealScale * feePulse})`,
									position: 'relative',
									zIndex: 5,
								}}
							>
								<div
									style={{
										display: 'flex',
										gap: 6,
										alignItems: 'center',
									}}
								>
									{new Array(10).fill(true).map((_, i) => (
										<div
											key={i}
											style={{
												width: 14,
												height: 14,
												backgroundColor: i % 2 === 0 ? '#00FF00' : '#FFFF00',
												opacity: 0.9,
											}}
										/>
									))}
								</div>

								<div
									style={{
										fontSize: 88,
										fontWeight: 900,
										lineHeight: 0.9,
										letterSpacing: 1,
										color: '#00FF00',
										textShadow: `0 0 ${8 + feeGlow * 16}px rgba(0,255,0,0.9)`,
										textTransform: 'uppercase',
									}}
								>
									{feeText}
								</div>

								<div
									style={{
										fontSize: 26,
										fontWeight: 900,
										letterSpacing: 3,
										color: '#00FFFF',
										textTransform: 'uppercase',
									}}
								>
									MATCH FEE
								</div>
							</div>
						</div>

						<div
							style={{
								height: 24,
								border: '3px solid #00FFFF',
								position: 'relative',
								overflow: 'hidden',
								backgroundColor: '#000000',
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 2,
									bottom: 2,
									left: `${Math.max(0, barWidth - 18)}%`,
									width: 160,
									background:
										'linear-gradient(90deg, transparent 0%, #00FFFF 30%, #FFFFFF 50%, #00FFFF 70%, transparent 100%)',
									opacity: matchProgress > 0.96 ? 0.95 : 0.45,
									transform: 'skewX(-22deg)',
								}}
							/>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${heroEntrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#000000',
						border: '4px solid #FFFF00',
						boxShadow: '8px 8px 0px #FF0000',
						padding: '16px 26px',
						textAlign: 'center',
						width: '92%',
					}}
				>
					<div
						style={{
							color: '#00FFFF',
							fontSize: 28,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						ONE MATCH. ONE FEE. INSTANTLY CLEAR.
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}