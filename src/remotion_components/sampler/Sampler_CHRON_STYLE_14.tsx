import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_14() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1: SNAPPY ENTRANCE
	// ==========================================
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const heroEntrance = spring({
		frame: frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.62},
	});

	const takeawayEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.58},
	});

	// ==========================================
	// BEAT 2: STATE SWITCH / METRIC REVEAL
	// ==========================================
	const percentCount = Math.round(interpolate(frame, [16, 48], [12, 50], clamp));
	const metricText = `${percentCount}% COMMISSION`;

	const stampScale = interpolate(frame, [28, 38], [0.7, 1.04], clamp);
	const stampRotate = interpolate(frame, [28, 38], [-8, -2], clamp);

	// ==========================================
	// BEAT 3: CONTINUOUS LIVING LOOP
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.1;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 4;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-260, 980], clamp);
	const vignettePulse = 0.18 + ((Math.sin(frame * 0.16) + 1) / 2) * 0.08;
	const pageFlipLift = interpolate(frame, [8, 18], [0, 1], clamp);
	const pageFlipFold = Math.sin(frame * 0.09) * 1.5;

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

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#E8C547',
				opacity,
				fontFamily:
					'"Impact", "Arial Narrow", "Haettenschweiler", "Arial Black", sans-serif',
				overflow: 'hidden',
			}}
		>
			{/* Pulp vignette */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background: `radial-gradient(circle at center, rgba(0,0,0,0) 42%, rgba(20,33,61,${vignettePulse}) 100%)`,
					pointerEvents: 'none',
				}}
			/>

			{/* Paper grain stripes */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage:
						'linear-gradient(rgba(234,224,200,0.08) 1px, transparent 1px)',
					backgroundSize: '100% 4px',
					opacity: 0.28,
					mixBlendMode: 'multiply',
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '42px 20px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1: CATEGORY BADGE */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#14213D',
						border: '3px solid #EAE0C8',
						borderRadius: 14,
						padding: '12px 30px',
						boxShadow: '0 10px 0 rgba(62,58,51,0.25)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 5,
					}}
				>
					<div
						style={{
							color: '#EAE0C8',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							lineHeight: 1,
							whiteSpace: 'nowrap',
						}}
					>
						DIME STORE THRILLER
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
						margin: '22px 0',
						position: 'relative',
						transform: `scale(${heroEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#3E3A33',
							border: '5px solid #A4161A',
							borderRadius: 24,
							boxSizing: 'border-box',
							padding: '38px 38px 34px',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							boxShadow: '0 22px 42px rgba(20,33,61,0.32)',
						}}
					>
						{/* Cover shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(234,224,200,0) 0%, rgba(234,224,200,0.2) 50%, rgba(234,224,200,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Dog-ear page flip */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								right: 0,
								width: 118,
								height: 118,
								clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)',
								backgroundColor: '#EAE0C8',
								boxShadow: '-4px 4px 0 rgba(20,33,61,0.18)',
								transform: `translateY(${-pageFlipLift * 1}px) rotate(${pageFlipFold}deg)`,
								transformOrigin: 'top right',
								opacity: 0.95,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								top: 14,
								right: 14,
								width: 76,
								height: 76,
								clipPath: 'polygon(100% 0%, 0% 0%, 100% 100%)',
								backgroundColor: '#E8C547',
								opacity: 0.85,
								transform: `rotate(${pageFlipFold * 0.7}deg)`,
								transformOrigin: 'top right',
							}}
						/>

						{/* Top kicker */}
						<div
							style={{
								alignSelf: 'flex-start',
								backgroundColor: '#EAE0C8',
								color: '#A4161A',
								border: '3px solid #A4161A',
								borderRadius: 10,
								padding: '8px 18px 7px',
								fontSize: 18,
								fontWeight: 900,
								letterSpacing: 2.5,
								textTransform: 'uppercase',
								lineHeight: 1,
								maxWidth: '70%',
								zIndex: 2,
							}}
						>
							CRIME PROFIT FILE
						</div>

						{/* Headline block */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								flex: 1,
								padding: '20px 0 12px',
								gap: 26,
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#EAE0C8',
									fontFamily:
										'"Brush Script MT", "Segoe Script", "Comic Sans MS", cursive',
									fontSize: 72,
									fontWeight: 700,
									lineHeight: 0.92,
									textAlign: 'center',
									width: '100%',
									textShadow: '0 3px 0 rgba(20,33,61,0.45)',
								}}
							>
								AUTOMATED
							</div>

							<div
								style={{
									color: '#A4161A',
									fontSize: 82,
									fontWeight: 1000,
									letterSpacing: 1,
									lineHeight: 0.92,
									textAlign: 'center',
									textTransform: 'uppercase',
									width: '100%',
									textShadow: '0 4px 0 rgba(234,224,200,0.15)',
								}}
							>
								MARGINS
							</div>

							<div
								style={{
									backgroundColor: '#A4161A',
									border: '4px solid #EAE0C8',
									borderRadius: 18,
									padding: '18px 28px 16px',
									boxShadow: '0 10px 0 rgba(20,33,61,0.28)',
									transform: `scale(${stampScale}) rotate(${stampRotate}deg)`,
									maxWidth: '84%',
								}}
							>
								<div
									style={{
										color: '#EAE0C8',
										fontSize: 56,
										fontWeight: 1000,
										letterSpacing: 1.5,
										lineHeight: 1,
										textAlign: 'center',
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>
						</div>

						{/* Footer blurb */}
						<div
							style={{
								alignSelf: 'center',
								backgroundColor: '#14213D',
								color: '#EAE0C8',
								borderRadius: 12,
								padding: '10px 22px',
								fontSize: 20,
								fontWeight: 900,
								letterSpacing: 2.2,
								textTransform: 'uppercase',
								lineHeight: 1,
								textAlign: 'center',
								zIndex: 2,
							}}
						>
							TAGLINE PUNCH
						</div>
					</div>
				</div>

				{/* TIER 3: TAKEAWAY */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#A4161A',
						border: '3px solid #EAE0C8',
						borderRadius: 18,
						padding: '16px 28px',
						boxShadow: '0 10px 0 rgba(20,33,61,0.22)',
						textAlign: 'center',
						maxWidth: '92%',
					}}
				>
					<div
						style={{
							color: '#EAE0C8',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.4,
							lineHeight: 1.1,
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