import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_47() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});

	const heroIn = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.68},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// ------------------------------------------
	// Beat 2: Active metric transformation
	// ------------------------------------------
	const metricNumber = Math.round(interpolate(frame, [16, 58], [12, 50], clamp));
	const metricText = `${metricNumber}% COMMISSION`;

	const shakeWindow = frame >= 24 && frame <= 68;
	const pageShakeX = shakeWindow ? Math.sin(frame * 1.15) * 5 : 0;
	const pageShakeY = shakeWindow ? Math.sin(frame * 1.4) * 3 : 0;

	// ------------------------------------------
	// Beat 3: Continuous living hover
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shineOffset = interpolate((frame + 18) % 72, [0, 72], [-260, 900], clamp);
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -60],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const ransomFonts = [
		'"Arial Black", Impact, sans-serif',
		'"Trebuchet MS", sans-serif',
		'"Courier New", monospace',
		'Georgia, serif',
		'Verdana, sans-serif',
		'"Times New Roman", serif',
		'"Helvetica Neue", Arial, sans-serif',
		'Garamond, serif',
		'Tahoma, sans-serif',
		'Palatino, serif',
	];

	const renderRansomWord = ({
		text,
		baseSize,
		textColor,
		bgPalette,
		borderPalette,
		seed = 0,
		maxWidth = '100%',
		justify = 'center' as const,
	}: {
		text: string;
		baseSize: number;
		textColor: string;
		bgPalette: string[];
		borderPalette: string[];
		seed?: number;
		maxWidth?: number | string;
		justify?: 'center' | 'flex-start' | 'flex-end';
	}) => {
		const chars = text.split('');

		return (
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: justify,
					alignItems: 'center',
					gap: 10,
					maxWidth,
					margin: '0 auto',
					lineHeight: 1.02,
				}}
			>
				{chars.map((char, i) => {
					if (char === ' ') {
						return <div key={`${char}-${i}`} style={{width: baseSize * 0.28}} />;
					}

					const idx = i + seed;
					const fontFamily = ransomFonts[idx % ransomFonts.length];
					const bg = bgPalette[idx % bgPalette.length];
					const border = borderPalette[idx % borderPalette.length];
					const rotate = ((idx % 5) - 2) * 1.1;
					const yNudge = ((idx % 4) - 1.5) * 2.5;
					const xScale = 0.95 + ((idx % 3) * 0.04);
					const slap = spring({
						frame: frame - (8 + i * 1.5),
						fps,
						config: {damping: 10, stiffness: 250, mass: 0.45},
					});
					const squishX = interpolate(slap, [0, 0.7, 1], [1.28, 0.92, 1], clamp);
					const squishY = interpolate(slap, [0, 0.7, 1], [0.7, 1.08, 1], clamp);
					const wobble = Math.sin(frame * 0.12 + i * 0.9) * 0.9;

					return (
						<div
							key={`${char}-${i}`}
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: `${Math.max(8, baseSize * 0.14)}px ${Math.max(
									10,
									baseSize * 0.16
								)}px`,
								backgroundColor: bg,
								border: `3px solid ${border}`,
								boxShadow: '0 5px 0 rgba(0,0,0,0.18)',
								transform: `translateY(${yNudge}px) rotate(${rotate + wobble}deg) scaleX(${
									xScale * squishX
								}) scaleY(${squishY})`,
								transformOrigin: 'center center',
								borderRadius: 2,
								flexShrink: 0,
							}}
						>
							<span
								style={{
									fontFamily,
									fontSize: baseSize,
									fontWeight: 900,
									color: textColor,
									lineHeight: 0.92,
									letterSpacing: -1.4,
									textTransform: 'uppercase',
									whiteSpace: 'pre',
								}}
							>
								{char}
							</span>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F4F1E8',
				opacity,
				fontFamily: '"Arial Black", Impact, sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '28px 18px 24px',
					boxSizing: 'border-box',
					transform: `translate(${pageShakeX}px, ${pageShakeY + exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px) rotate(${
							Math.sin(frame * 0.08) * 1.2
						}deg)`,
						backgroundColor: '#3B3B3B',
						border: '3px solid #D7263D',
						boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
						padding: '12px 20px',
						display: 'flex',
						alignItems: 'center',
						gap: 10,
						flexShrink: 0,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							backgroundColor: '#F4B400',
							border: '2px solid #F4F1E8',
							transform: `rotate(${Math.sin(frame * 0.14) * 8}deg)`,
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F4F1E8',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						ACTIVATION CODE
					</div>
				</div>

				{/* Tier 2: Hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '20px 0',
						position: 'relative',
						transform: `scale(${heroIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#3B3B3B',
							border: '4px solid #1B6CA8',
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.22)`,
							padding: '34px 28px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: '1.1fr 0.95fr 0.6fr',
							rowGap: 22,
							alignItems: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 140,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Headline */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								padding: '8px 8px 0',
								zIndex: 2,
							}}
						>
							<div style={{width: '100%'}}>
								{renderRansomWord({
									text: 'AUTOMATED',
									baseSize: 58,
									textColor: '#D7263D',
									bgPalette: ['#F4F1E8', '#F4B400', '#F4F1E8', '#1B6CA8'],
									borderPalette: ['#D7263D', '#3B3B3B', '#F4B400', '#F4F1E8'],
									seed: 3,
									maxWidth: '100%',
									justify: 'center',
								})}
								<div style={{height: 12}} />
								{renderRansomWord({
									text: 'MARGINS',
									baseSize: 72,
									textColor: '#D7263D',
									bgPalette: ['#F4F1E8', '#1B6CA8', '#F4B400', '#F4F1E8'],
									borderPalette: ['#3B3B3B', '#F4F1E8', '#D7263D', '#1B6CA8'],
									seed: 21,
									maxWidth: '100%',
									justify: 'center',
								})}
							</div>
						</div>

						{/* Metric */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 2,
							}}
						>
							<div
								style={{
									width: '86%',
									maxWidth: 760,
									backgroundColor: '#F4F1E8',
									border: '4px solid #D7263D',
									boxShadow: '0 8px 0 rgba(0,0,0,0.18)',
									padding: '18px 18px 20px',
									transform: `rotate(${Math.sin(frame * 0.1 + 1) * 1.4}deg) scaleX(${
										frame >= 44 && frame <= 52 ? 1.03 : 1
									}) scaleY(${frame >= 44 && frame <= 52 ? 0.97 : 1})`,
								}}
							>
								<div
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
									}}
								>
									{renderRansomWord({
										text: metricText,
										baseSize: 48,
										textColor: '#1B6CA8',
										bgPalette: ['#F4B400', '#F4F1E8', '#D7263D', '#F4F1E8'],
										borderPalette: ['#3B3B3B', '#1B6CA8', '#F4F1E8', '#D7263D'],
										seed: 37,
										maxWidth: '100%',
										justify: 'center',
									})}
								</div>
							</div>
						</div>

						{/* Hero sticker */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#F4B400',
									border: '3px solid #3B3B3B',
									boxShadow: '0 6px 0 rgba(0,0,0,0.18)',
									padding: '10px 20px',
									transform: `rotate(${Math.sin(frame * 0.13 + 2) * 1.6}deg)`,
								}}
							>
								<div
									style={{
										color: '#3B3B3B',
										fontSize: 22,
										fontWeight: 1000,
										letterSpacing: 2.5,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									CUT-&-PASTE SCALE
								</div>
							</div>
						</div>

						{/* Decorative tape corners - safely away from text */}
						<div
							style={{
								position: 'absolute',
								top: 14,
								left: 18,
								width: 70,
								height: 20,
								backgroundColor: 'rgba(244,180,0,0.75)',
								transform: 'rotate(-10deg)',
								zIndex: 1,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 16,
								right: 20,
								width: 64,
								height: 18,
								backgroundColor: 'rgba(27,108,168,0.35)',
								transform: 'rotate(12deg)',
								zIndex: 1,
							}}
						/>
					</div>
				</div>

				{/* Tier 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px) rotate(${
							Math.sin(frame * 0.1 + 1.4) * 1.1
						}deg)`,
						backgroundColor: '#D7263D',
						border: '3px solid #3B3B3B',
						boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
						padding: '14px 18px',
						width: 'auto',
						maxWidth: '94%',
						flexShrink: 0,
					}}
				>
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						{renderRansomWord({
							text: 'PURE SOFTWARE LEVERAGE',
							baseSize: 26,
							textColor: '#3B3B3B',
							bgPalette: ['#F4F1E8', '#F4B400', '#F4F1E8', '#1B6CA8', '#F4F1E8'],
							borderPalette: ['#3B3B3B', '#D7263D', '#1B6CA8', '#3B3B3B'],
							seed: 58,
							maxWidth: '100%',
							justify: 'center',
						})}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}