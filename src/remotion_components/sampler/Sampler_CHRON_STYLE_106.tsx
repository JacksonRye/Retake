import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export default function Sampler_CHRON_STYLE_106() {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: abrupt entrance / anti-design pop
	const introScale = frame < 4 ? 0.86 : frame < 8 ? 1.04 : 1;
	const badgeScale = frame < 2 ? 0.7 : frame < 5 ? 1.08 : 1;
	const cardScale = frame < 3 ? 0.9 : frame < 7 ? 1.03 : 1;

	// Beat 2: state switch / counter-style reveal
	const metricPhase =
		frame < 24 ? '12% COMMISSION' : frame < 42 ? '34% COMMISSION' : '50% COMMISSION';

	const metricBoxScale = frame >= 42 && frame < 47 ? 1.08 : 1;
	const cardNudgeX = frame >= 24 && frame < 42 ? -14 : frame >= 42 ? 10 : 0;
	const cardNudgeY = frame >= 24 && frame < 42 ? 8 : frame >= 42 ? -6 : 0;

	// Beat 3: living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shineOffset = interpolate((frame + 12) % 55, [0, 55], [-220, 980], clamp);

	// Cursor / text selection gag
	const showCursor = frame >= 18 && frame <= 74;
	const cursorX = frame < 34 ? 590 : frame < 52 ? 398 : 660;
	const cursorY = frame < 34 ? 265 : frame < 52 ? 268 : 452;

	const showSelectionHeadline = frame >= 18 && frame < 34;
	const showSelectionMetric = frame >= 34 && frame < 52;
	const showSelectionTakeaway = frame >= 52 && frame < 74;

	const exitOpacity = interpolate(
		frame,
		[0, 2, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFFFFF',
				opacity: exitOpacity,
				fontFamily: '"Times New Roman", Times, serif',
				color: '#000000',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '28px 0 30px 0',
					boxSizing: 'border-box',
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						alignSelf: 'flex-start',
						marginLeft: 12,
						transform: `scale(${badgeScale})`,
						backgroundColor: '#FFFFFF',
						border: '2px solid #000000',
						padding: '8px 14px',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							backgroundColor: '#FF0000',
							border: '1px solid #000000',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 24,
							lineHeight: 1,
							fontWeight: 700,
							letterSpacing: 0,
						}}
					>
						ANTI-DESIGN / COMMERCIAL
					</div>
				</div>

				{/* Tier 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						transform: `scale(${introScale})`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 548,
							backgroundColor: '#FF0000',
							border: '3px solid #000000',
							position: 'relative',
							boxSizing: 'border-box',
							padding: '34px 34px 36px 34px',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							transform: `translate(${cardNudgeX}px, ${cardNudgeY + hoverY}px) rotate(${hoverTilt}deg) scale(${cardScale})`,
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 92,
								backgroundColor: 'rgba(255,255,255,0.34)',
								transform: `translateX(${shineOffset}px) skewX(-12deg)`,
								pointerEvents: 'none',
							}}
						/>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 18,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontFamily: '"Courier New", Courier, monospace',
									fontSize: 20,
									color: '#551A8B',
									textDecoration: 'underline',
									lineHeight: 1,
									alignSelf: 'flex-start',
									backgroundColor: showSelectionHeadline ? '#0000EE' : 'transparent',
									color: showSelectionHeadline ? '#FFFFFF' : '#551A8B',
									padding: showSelectionHeadline ? '2px 4px' : '0',
								}}
							>
								www.margin-engine.local
							</div>

							<div
								style={{
									fontSize: 78,
									lineHeight: 0.95,
									fontWeight: 700,
									maxWidth: '100%',
									wordBreak: 'break-word',
									color: '#000000',
									backgroundColor: showSelectionHeadline ? '#0000EE' : 'transparent',
									color: showSelectionHeadline ? '#FFFFFF' : '#000000',
									display: 'inline-block',
									padding: showSelectionHeadline ? '4px 8px' : '0',
									alignSelf: 'flex-start',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								position: 'relative',
								zIndex: 2,
								padding: '18px 0',
							}}
						>
							<div
								style={{
									backgroundColor: '#FFFFFF',
									border: '3px solid #000000',
									padding: '18px 28px',
									transform: `scale(${metricBoxScale})`,
									maxWidth: '100%',
								}}
							>
								<div
									style={{
										fontSize: 68,
										lineHeight: 0.98,
										fontWeight: 700,
										textAlign: 'center',
										whiteSpace: 'nowrap',
										backgroundColor: showSelectionMetric ? '#0000EE' : 'transparent',
										color: showSelectionMetric ? '#FFFFFF' : '#000000',
										padding: showSelectionMetric ? '4px 8px' : '0',
									}}
								>
									{metricPhase}
								</div>
							</div>
						</div>

						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 16,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									width: '100%',
									borderTop: '2px solid #000000',
								}}
							/>
							<div
								style={{
									fontFamily: '"Courier New", Courier, monospace',
									fontSize: 22,
									lineHeight: 1.2,
									color: '#000000',
									alignSelf: 'flex-start',
								}}
							>
								click → monetize → repeat
							</div>
						</div>

						{showCursor ? (
							<div
								style={{
									position: 'absolute',
									left: cursorX,
									top: cursorY,
									zIndex: 5,
									pointerEvents: 'none',
									transform: frame >= 42 && frame < 47 ? 'scale(0.9)' : 'scale(1)',
								}}
							>
								<svg width="54" height="54" viewBox="0 0 24 24" fill="#000000">
									<path d="M4 3l7.2 16.8 2.2-6.3 6.5-2.1L4 3z" />
								</svg>
							</div>
						) : null}
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						width: '92%',
						transform: `scale(${frame < 10 ? 0.92 : 1}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FFFFFF',
						border: '2px solid #000000',
						padding: '14px 18px',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 34,
							lineHeight: 1.05,
							fontWeight: 700,
							color: showSelectionTakeaway ? '#FFFFFF' : '#000000',
							backgroundColor: showSelectionTakeaway ? '#0000EE' : 'transparent',
							display: 'inline-block',
							padding: showSelectionTakeaway ? '4px 8px' : '0',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}