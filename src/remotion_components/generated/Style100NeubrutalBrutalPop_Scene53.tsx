import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene53() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — crash entrance.
	const cardEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 250,
			mass: 0.62,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 260,
			mass: 0.5,
		},
	});

	const crashX = interpolate(frame, [0, 9, 15], [520, -22, 0], clamp);
	const crashRotation = interpolate(frame, [0, 10, 18], [8, -2.5, 0], clamp);
	const entranceShadow = interpolate(frame, [0, 8, 15], [0, 22, 13], clamp);

	// Beat 2 — cursor click, operator stamp, and result spin.
	const cursorVisible = frame >= 24 && frame <= 76;
	const cursorX = interpolate(frame, [24, 43], [260, 12], clamp);
	const cursorY = interpolate(frame, [24, 43], [190, 12], clamp);
	const isClicking = frame >= 44 && frame <= 50;
	const clickThunk = isClicking ? 9 : 0;

	const operatorStamp = spring({
		frame: frame - 47,
		fps,
		config: {
			damping: 8,
			stiffness: 300,
			mass: 0.48,
		},
	});

	const operatorRotation = interpolate(frame, [45, 49, 57], [-16, 4, -2], clamp);
	const calculationProgress = interpolate(frame, [51, 82], [0, 1], clamp);
	const resultValue = Math.round(calculationProgress * 4500);
	const calculationComplete = frame >= 82;

	const buttonColor = isClicking
		? '#F1F333'
		: calculationComplete
			? '#23A094'
			: '#000000';

	const buttonTextColor = isClicking ? '#000000' : '#FFF8E7';

	// Beat 3 — continuous living physics.
	const livingMix = interpolate(frame, [78, 86], [0, 1], clamp);
	const hoverY = Math.sin(frame * 0.12) * 6 * livingMix;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35 * livingMix;
	const shadowPulse =
		entranceShadow +
		Math.sin(frame * 0.18) * 3 * livingMix -
		(isClicking ? 8 : 0);

	const amountShift = Math.sin(frame * 0.2) * 5 * livingMix;
	const operatorShift = Math.sin(frame * 0.2 + Math.PI) * 7 * livingMix;
	const resultShift = Math.sin(frame * 0.2 + Math.PI / 2) * 5 * livingMix;

	const resultPulse =
		1 + Math.max(0, Math.sin(frame * 0.22)) * 0.035 * livingMix;
	const resultShadow =
		7 + Math.max(0, Math.sin(frame * 0.22)) * 6 * livingMix;

	// Repeating teal sweep.
	const shineCycle = ((frame - 80) % 46 + 46) % 46;
	const shineOffset = interpolate(shineCycle, [0, 46], [-220, 1080], clamp);
	const shineOpacity = frame >= 80 ? 0.52 : 0;

	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -70],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const formattedResult = `£${resultValue.toLocaleString('en-GB')}`;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				color: '#000000',
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				opacity,
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					padding: '80px 20px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 — category badge */}
				<div
					style={{
						flexBasis: '15%',
						width: '100%',
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '12px 25px',
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 14,
							boxShadow: '7px 7px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.11) * 3
							}px)`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								borderRadius: '50%',
								backgroundColor: '#000000',
								flexShrink: 0,
							}}
						/>
						<div
							style={{
								fontSize: 19,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Fee calculator
						</div>
					</div>
				</div>

				{/* Tier 2 — one calculator hero */}
				<div
					style={{
						flexBasis: '65%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '88%',
							maxWidth: 900,
							position: 'relative',
							transform: `translateX(${crashX}px) translateY(${
								hoverY + clickThunk
							}px) rotate(${crashRotation + hoverTilt}deg) scale(${cardEntrance})`,
							transformOrigin: 'center center',
						}}
					>
						<div
							style={{
								width: '100%',
								boxSizing: 'border-box',
								padding: '42px 38px',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 28,
								position: 'relative',
								overflow: 'hidden',
								backgroundColor: '#F1F333',
								border: '6px solid #000000',
								borderRadius: 26,
								boxShadow: `${Math.max(3, shadowPulse)}px ${Math.max(
									3,
									shadowPulse,
								)}px 0 #000000`,
							}}
						>
							{/* Repeating teal light sweep */}
							<div
								style={{
									position: 'absolute',
									top: -80,
									bottom: -80,
									left: 0,
									width: 115,
									zIndex: 5,
									opacity: shineOpacity,
									backgroundColor: '#23A094',
									transform: `translateX(${shineOffset}px) skewX(-20deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									width: '100%',
									display: 'flex',
									alignItems: 'stretch',
									justifyContent: 'center',
									gap: 16,
									position: 'relative',
									zIndex: 10,
								}}
							>
								{/* Input amount block */}
								<div
									style={{
										flex: '1.35 1 0',
										minWidth: 0,
										padding: '25px 16px',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										backgroundColor: '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 16,
										boxShadow: '7px 7px 0 #000000',
										transform: `translateY(${amountShift}px)`,
									}}
								>
									<div
										style={{
											fontSize: 14,
											fontWeight: 950,
											letterSpacing: 2.5,
											textTransform: 'uppercase',
											textDecoration: 'underline',
											textUnderlineOffset: 5,
										}}
									>
										Revenue
									</div>
									<div
										style={{
											fontSize: 49,
											fontWeight: 950,
											lineHeight: 1,
											letterSpacing: -2,
											whiteSpace: 'nowrap',
										}}
									>
										£30,000
									</div>
								</div>

								{/* 15% stamped operator */}
								<div
									style={{
										flex: '0.72 1 0',
										minWidth: 0,
										padding: '20px 12px',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 10,
										backgroundColor: '#FF90E8',
										border: '4px solid #000000',
										borderRadius: 16,
										boxShadow: '7px 7px 0 #000000',
										transform: `translateY(${operatorShift}px) scale(${Math.max(
											0,
											operatorStamp,
										)}) rotate(${operatorRotation}deg)`,
									}}
								>
									<div
										style={{
											fontSize: 16,
											fontWeight: 950,
											lineHeight: 1,
										}}
									>
										×
									</div>
									<div
										style={{
											fontSize: 45,
											fontWeight: 950,
											lineHeight: 1,
											whiteSpace: 'nowrap',
										}}
									>
										15%
									</div>
									<div
										style={{
											fontSize: 12,
											fontWeight: 950,
											letterSpacing: 2,
											textTransform: 'uppercase',
											textDecoration: 'underline',
											textUnderlineOffset: 4,
										}}
									>
										Fee
									</div>
								</div>

								{/* Result block */}
								<div
									style={{
										flex: '1.35 1 0',
										minWidth: 0,
										padding: '25px 16px',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										backgroundColor: calculationComplete
											? '#FF90E8'
											: '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 16,
										boxShadow: `${resultShadow}px ${resultShadow}px 0 #000000`,
										transform: `translateY(${resultShift}px) scale(${resultPulse})`,
									}}
								>
									<div
										style={{
											fontSize: 14,
											fontWeight: 950,
											letterSpacing: 2.5,
											textTransform: 'uppercase',
											textDecoration: 'underline',
											textUnderlineOffset: 5,
										}}
									>
										Your fee
									</div>
									<div
										style={{
											fontSize: 52,
											fontWeight: 950,
											lineHeight: 1,
											letterSpacing: -2,
											whiteSpace: 'nowrap',
											fontVariantNumeric: 'tabular-nums',
										}}
									>
										{formattedResult}
									</div>
								</div>
							</div>

							{/* Calculate button belongs to the single calculator hero */}
							<div
								style={{
									minWidth: 300,
									padding: '16px 34px',
									boxSizing: 'border-box',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									position: 'relative',
									zIndex: 10,
									backgroundColor: buttonColor,
									color: buttonTextColor,
									border: '4px solid #000000',
									borderRadius: 14,
									boxShadow: isClicking
										? '2px 2px 0 #000000'
										: '8px 8px 0 #000000',
									transform: `translateY(${isClicking ? 6 : 0}px)`,
									fontSize: 22,
									fontWeight: 950,
									letterSpacing: 3,
									lineHeight: 1,
									textTransform: 'uppercase',
									textDecoration: 'underline',
									textUnderlineOffset: 6,
								}}
							>
								{calculationComplete ? 'Calculated' : 'Calculate'}
							</div>
						</div>

						{/* Giant clicking cursor */}
						{cursorVisible ? (
							<div
								style={{
									position: 'absolute',
									right: '8%',
									bottom: '5%',
									zIndex: 30,
									filter: 'drop-shadow(6px 7px 0 #FF90E8)',
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${
										isClicking ? 0.82 : 1
									})`,
									pointerEvents: 'none',
								}}
							>
								<svg
									width="86"
									height="86"
									viewBox="0 0 24 24"
									fill="#000000"
									stroke="#FFF8E7"
									strokeWidth="1.25"
									strokeLinejoin="round"
								>
									<path d="M3.6 2.9L11.1 21l2.65-7.15L21 11.05 3.6 2.9z" />
								</svg>
							</div>
						) : null}
					</div>
				</div>

				{/* Tier 3 — punchline */}
				<div
					style={{
						flexBasis: '20%',
						width: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '15px 30px',
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 15,
							boxShadow: '7px 7px 0 #23A094',
							transform: `scale(${cardEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1.4) * 3
							}px)`,
							fontSize: 22,
							fontWeight: 950,
							letterSpacing: 2.5,
							lineHeight: 1.2,
							textAlign: 'center',
							textTransform: 'uppercase',
							textDecoration: 'underline',
							textDecorationColor: '#FF90E8',
							textDecorationThickness: 4,
							textUnderlineOffset: 7,
						}}
					>
						£30,000 × 15% = £4,500
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}