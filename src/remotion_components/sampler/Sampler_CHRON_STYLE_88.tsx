import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_88() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const masterIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.7},
	});

	const badgeIn = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.75},
	});

	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	// Beat 2: Active state switch / countdown flip feel
	const flipStage = interpolate(frame, [18, 34, 46, 58], [0, 1, 2, 3], clamp);

	const countValue =
		flipStage < 1
			? '20%'
			: flipStage < 2
				? '35%'
				: flipStage < 3
					? '45%'
					: '50%';

	const countScaleY =
		frame >= 18 && frame <= 58
			? interpolate(
					(frame - 18) % 14,
					[0, 5, 7, 14],
					[1, 0.18, 0.18, 1],
					clamp
			  )
			: 1;

	const soldOutSlam = spring({
		frame: frame - 62,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.55},
	});

	const soldOutOpacity = interpolate(frame, [60, 64, 86, 92], [0, 1, 1, 0], clamp);

	// Beat 3: Living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 20 + Math.sin(frame * 0.18) * 5;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-260, 980], clamp);

	// Queue marquee crawl
	const marqueeX = interpolate(frame, [0, durationInFrames], [0, -520], clamp);

	// Card shuffle accents
	const leftTicketX = interpolate(frame, [10, 28], [-120, 0], clamp);
	const rightTicketX = interpolate(frame, [14, 32], [120, 0], clamp);

	const leftTicketRot = interpolate(frame, [10, 28], [-8, -2], clamp);
	const rightTicketRot = interpolate(frame, [14, 32], [8, 2], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const monoFont =
		'"Roboto Mono", "IBM Plex Mono", "Courier New", monospace';
	const condensedFont =
		'"Arial Narrow", "Helvetica Neue Condensed", "Impact", "Arial Black", sans-serif';

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0E0E0E',
				fontFamily: condensedFont,
				opacity,
				color: '#FFFFFF',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 22,
						left: 0,
						right: 0,
						height: 28,
						overflow: 'hidden',
						opacity: 0.9,
					}}
				>
					<div
						style={{
							position: 'absolute',
							left: marqueeX,
							top: 0,
							display: 'flex',
							flexDirection: 'row',
							gap: 48,
							whiteSpace: 'nowrap',
							fontFamily: monoFont,
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 3,
							color: '#9E9E9E',
							textTransform: 'uppercase',
						}}
					>
						{Array.from({length: 10}).map((_, i) => (
							<div key={i}>
								QUEUE LIVE // SIZE RUN // DROP ACTIVE // AUTOMATION //
							</div>
						))}
					</div>
				</div>
			</div>

			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '68px 18px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#111111',
						border: '3px solid #CCFF00',
						borderRadius: 14,
						padding: '10px 26px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: '0 10px 28px rgba(0,0,0,0.45)',
						zIndex: 10,
					}}
				>
					<div
						style={{
							fontFamily: monoFont,
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: 4,
							color: '#CCFF00',
							textTransform: 'uppercase',
						}}
					>
						ACTIVATION CODE
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
						margin: '24px 0 20px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* Shuffle cards behind */}
					<div
						style={{
							position: 'absolute',
							width: '86%',
							minHeight: 500,
							backgroundColor: '#1A1A1A',
							border: '3px solid #9E9E9E',
							borderRadius: 28,
							transform: `translateX(${leftTicketX}px) rotate(${leftTicketRot}deg)`,
							opacity: 0.32,
						}}
					/>
					<div
						style={{
							position: 'absolute',
							width: '86%',
							minHeight: 500,
							backgroundColor: '#141414',
							border: '3px solid #FFFFFF',
							borderRadius: 28,
							transform: `translateX(${rightTicketX}px) rotate(${rightTicketRot}deg)`,
							opacity: 0.18,
						}}
					/>

					<div
						style={{
							width: '96%',
							minHeight: 540,
							backgroundColor: '#111111',
							border: '4px solid #9E9E9E',
							borderRadius: 32,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.62)`,
							padding: '34px 38px 30px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							position: 'relative',
							overflow: 'hidden',
							textAlign: 'center',
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Barcode rails */}
						<div
							style={{
								position: 'absolute',
								left: 22,
								top: 20,
								bottom: 20,
								width: 18,
								display: 'flex',
								flexDirection: 'row',
								gap: 2,
								opacity: 0.8,
							}}
						>
							{[2, 4, 2, 3, 1, 4].map((w, i) => (
								<div
									key={i}
									style={{
										width: w,
										height: '100%',
										backgroundColor: i % 2 === 0 ? '#CCFF00' : '#FFFFFF',
									}}
								/>
							))}
						</div>

						<div
							style={{
								position: 'absolute',
								right: 22,
								top: 20,
								bottom: 20,
								width: 18,
								display: 'flex',
								flexDirection: 'row',
								gap: 2,
								opacity: 0.8,
							}}
						>
							{[4, 1, 3, 2, 4, 2].map((w, i) => (
								<div
									key={i}
									style={{
										width: w,
										height: '100%',
										backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#F21B3F',
									}}
								/>
							))}
						</div>

						{/* Top utility row */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '0 18px',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									fontFamily: monoFont,
									fontSize: 17,
									fontWeight: 800,
									letterSpacing: 2,
									color: '#9E9E9E',
									textTransform: 'uppercase',
								}}
							>
								QUEUE_088
							</div>
							<div
								style={{
									fontFamily: monoFont,
									fontSize: 17,
									fontWeight: 800,
									letterSpacing: 2,
									color: '#FFFFFF',
									textTransform: 'uppercase',
								}}
							>
								COMMISSION LIVE
							</div>
						</div>

						{/* Hero headline */}
						<div
							style={{
								width: '100%',
								maxWidth: 760,
								color: '#CCFF00',
								fontSize: 72,
								fontWeight: 1000,
								lineHeight: 0.94,
								letterSpacing: -1.8,
								textTransform: 'uppercase',
							}}
						>
							AUTOMATED
							<br />
							MARGINS
						</div>

						{/* Metric block */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: '#0E0E0E',
								border: '3px solid #F21B3F',
								borderRadius: 24,
								padding: '20px 34px 18px',
								minWidth: 480,
								boxShadow: '0 10px 24px rgba(242,27,63,0.22)',
								position: 'relative',
							}}
						>
							<div
								style={{
									height: 98,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										fontFamily: condensedFont,
										fontSize: 84,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1,
										color: '#FFFFFF',
										transform: `scaleY(${countScaleY})`,
										transformOrigin: 'center center',
										textTransform: 'uppercase',
									}}
								>
									{countValue}
								</div>
							</div>

							<div
								style={{
									fontFamily: monoFont,
									fontSize: 24,
									fontWeight: 900,
									letterSpacing: 4,
									color: '#CCFF00',
									marginTop: 4,
									textTransform: 'uppercase',
								}}
							>
								COMMISSION
							</div>
						</div>

						{/* Bottom card strip */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 18,
								flexWrap: 'nowrap',
							}}
						>
							<div
								style={{
									backgroundColor: '#CCFF00',
									color: '#0E0E0E',
									borderRadius: 12,
									padding: '10px 18px',
									fontFamily: monoFont,
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								AUTO
							</div>
							<div
								style={{
									backgroundColor: '#FFFFFF',
									color: '#0E0E0E',
									borderRadius: 12,
									padding: '10px 18px',
									fontFamily: monoFont,
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								SCALE
							</div>
							<div
								style={{
									backgroundColor: '#F21B3F',
									color: '#FFFFFF',
									borderRadius: 12,
									padding: '10px 18px',
									fontFamily: monoFont,
									fontSize: 18,
									fontWeight: 900,
									letterSpacing: 2,
									textTransform: 'uppercase',
								}}
							>
								LEVERAGE
							</div>
						</div>

						{/* SOLD OUT slam overlay - placed safely below metric and above bottom strip */}
						<div
							style={{
								position: 'absolute',
								right: 62,
								top: 286,
								transform: `scale(${soldOutSlam}) rotate(-8deg)`,
								opacity: soldOutOpacity,
								backgroundColor: '#F21B3F',
								border: '3px solid #FFFFFF',
								borderRadius: 12,
								padding: '10px 18px',
								boxShadow: '0 12px 24px rgba(0,0,0,0.35)',
								pointerEvents: 'none',
							}}
						>
							<div
								style={{
									fontFamily: condensedFont,
									fontSize: 28,
									fontWeight: 1000,
									lineHeight: 1,
									letterSpacing: 1,
									color: '#FFFFFF',
									textTransform: 'uppercase',
								}}
							>
								SOLD OUT
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#CCFF00',
						borderRadius: 18,
						padding: '16px 30px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontFamily: condensedFont,
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2,
							color: '#0E0E0E',
							textTransform: 'uppercase',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}