import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_100() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Hard snap entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 10, stiffness: 280, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 260, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.6},
	});

	// Beat 2: Metric switch / roll
	const metricProgress = interpolate(frame, [14, 42], [0, 1], clamp);
	const metricValue = Math.round(interpolate(metricProgress, [0, 1], [12, 50], clamp));
	const metricText = `${metricValue}% COMMISSION`;

	// Cursor click motion
	const cursorVisible = frame >= 20 && frame <= 56;
	const cursorX = interpolate(frame, [20, 40], [240, 0], clamp);
	const cursorY = interpolate(frame, [20, 40], [130, 0], clamp);
	const isClicking = frame >= 41 && frame <= 48;

	// Card pop on click
	const cardPunch = isClicking ? 10 : 0;
	const shadowX = isClicking ? 6 : 14;
	const shadowY = isClicking ? 6 : 14;

	// Beat 3: living hover + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.1;
	const badgeHover = Math.sin(frame * 0.1) * 3;
	const takeawayHover = Math.sin(frame * 0.12 + 1.2) * 3;
	const shineOffset = interpolate((frame + 10) % 60, [0, 60], [-260, 1200], clamp);

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -50], clamp);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				fontFamily: '"Arial Black", Impact, "Helvetica Neue", sans-serif',
				opacity,
				color: '#000000',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '24px',
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
						boxSizing: 'border-box',
						paddingTop: 12,
						paddingBottom: 12,
					}}
				>
					{/* Tier 1: Category badge */}
					<div
						style={{
							transform: `scale(${badgeIn}) translateY(${badgeHover}px) rotate(-1.2deg)`,
							backgroundColor: '#F1F333',
							border: '4px solid #000000',
							borderRadius: 18,
							padding: '14px 30px',
							boxShadow: '8px 8px 0 #000000',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								fontSize: 22,
								fontWeight: 900,
								letterSpacing: 2,
								textTransform: 'uppercase',
								lineHeight: 1,
							}}
						>
							Activation Code
						</div>
					</div>

					{/* Tier 2: Massive hero card */}
					<div
						style={{
							width: '100%',
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							margin: '22px 0',
							transform: `scale(${cardIn}) translateY(${hoverY + cardPunch}px) rotate(${hoverTilt}deg)`,
						}}
					>
						<div
							style={{
								width: '95%',
								minHeight: 540,
								backgroundColor: '#23A094',
								border: '5px solid #000000',
								borderRadius: 34,
								boxShadow: `${shadowX}px ${shadowY}px 0 #000000`,
								padding: '42px 34px',
								boxSizing: 'border-box',
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								textAlign: 'center',
								gap: 26,
							}}
						>
							<div
								style={{
									position: 'absolute',
									top: 0,
									bottom: 0,
									width: 120,
									backgroundColor: 'rgba(255,255,255,0.22)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										backgroundColor: '#FF90E8',
										border: '4px solid #000000',
										borderRadius: 20,
										padding: '14px 24px',
										boxShadow: '6px 6px 0 #000000',
										maxWidth: '92%',
									}}
								>
									<div
										style={{
											fontSize: 64,
											fontWeight: 900,
											lineHeight: 1.02,
											letterSpacing: -1.5,
											textTransform: 'uppercase',
											color: '#000000',
										}}
									>
										AUTOMATED MARGINS
									</div>
								</div>
							</div>

							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										backgroundColor: '#FFF8E7',
										border: '5px solid #000000',
										borderRadius: 26,
										padding: '22px 30px',
										boxShadow: '10px 10px 0 #000000',
										maxWidth: '90%',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											fontSize: 58,
											fontWeight: 900,
											lineHeight: 1.02,
											letterSpacing: -1,
											textTransform: 'uppercase',
											color: '#000000',
											textDecoration: 'underline',
											textDecorationThickness: 5,
											textUnderlineOffset: 8,
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>
							</div>

							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										backgroundColor: '#F1F333',
										border: '4px solid #000000',
										borderRadius: 18,
										padding: '12px 22px',
										boxShadow: '6px 6px 0 #000000',
										maxWidth: '80%',
									}}
								>
									<div
										style={{
											fontSize: 24,
											fontWeight: 900,
											lineHeight: 1.1,
											letterSpacing: 2,
											textTransform: 'uppercase',
											color: '#000000',
										}}
									>
										Buttonized revenue layer
									</div>
								</div>
							</div>
						</div>

						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									right: '13%',
									bottom: '14%',
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicking ? 0.82 : 1}) rotate(-8deg)`,
									zIndex: 20,
									pointerEvents: 'none',
								}}
							>
								<svg width="68" height="68" viewBox="0 0 24 24">
									<path
										d="M4 3L11.2 20.5L13.8 13.8L20.5 11.2Z"
										fill="#FF90E8"
										stroke="#000000"
										strokeWidth="2.2"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						)}
					</div>

					{/* Tier 3: Bottom takeaway */}
					<div
						style={{
							transform: `scale(${takeawayIn}) translateY(${takeawayHover}px) rotate(1.1deg)`,
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 22,
							padding: '18px 34px',
							boxShadow: '9px 9px 0 #000000',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								fontSize: 24,
								fontWeight: 900,
								letterSpacing: 2,
								lineHeight: 1.05,
								textTransform: 'uppercase',
								color: '#000000',
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