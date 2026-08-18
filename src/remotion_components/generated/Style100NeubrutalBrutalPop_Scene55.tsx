import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const clamp = {
	extrapolateLeft: 'clamp' as const,
	extrapolateRight: 'clamp' as const,
};

export default function Style100NeubrutalBrutalPop_Scene55() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	// Beat 1: hard spring entrance with overshoot.
	const cardSpring = spring({
		frame,
		fps,
		config: {
			damping: 9,
			stiffness: 260,
			mass: 0.58,
		},
	});

	const badgeSpring = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 10,
			stiffness: 280,
			mass: 0.5,
		},
	});

	const footerSpring = spring({
		frame: frame - 7,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.55,
		},
	});

	const cardScale = 0.55 + cardSpring * 0.45;
	const entranceY = interpolate(cardSpring, [0, 1], [180, 0], clamp);
	const entranceRotation = interpolate(cardSpring, [0, 1], [-7, 0], clamp);

	// Beat 2: knowledge insertion, launch click, stamp, and revenue acceleration.
	const knowledge = 'EXPERT KNOWLEDGE';
	const typedCharacters = Math.floor(
		interpolate(frame, [31, 52], [0, knowledge.length], clamp),
	);
	const typedKnowledge = knowledge.slice(0, typedCharacters);
	const caretVisible = frame < 56 && Math.floor(frame / 4) % 2 === 0;

	const primaryClick = frame >= 57 && frame <= 62;
	const beatThreeClickPhase = frame >= 84 ? (frame - 84) % 18 : 99;
	const repeatedClick = frame >= 84 && beatThreeClickPhase <= 3;
	const isClicking = primaryClick || repeatedClick;

	const launchActivated = frame >= 59;

	const cursorVisible = frame >= 27 && frame < 82;
	const cursorX = interpolate(
		frame,
		[27, 39, 50, 57, 68, 80],
		[300, 35, 35, 12, 12, 150],
		clamp,
	);
	const cursorY = interpolate(
		frame,
		[27, 39, 50, 57, 68, 80],
		[190, -28, -28, 112, 112, 185],
		clamp,
	);
	const cursorScale = isClicking ? 0.82 : 1;

	const initialRevenue = Math.floor(
		interpolate(frame, [57, 84], [0, 12840], clamp),
	);
	const livingRevenue =
		frame < 84 ? initialRevenue : 12840 + Math.floor((frame - 84) * 347);
	const displayedRevenue = Math.max(0, livingRevenue);
	const revenueText = `$${displayedRevenue.toLocaleString('en-US')}`;

	const stampSpring = spring({
		frame: frame - 65,
		fps,
		config: {
			damping: 8,
			stiffness: 320,
			mass: 0.45,
		},
	});
	const stampScale = frame < 65 ? 0 : stampSpring;
	const stampRotation = interpolate(stampSpring, [0, 1], [-18, -4], clamp);

	// Beat 3: continuous living physics.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35;
	const shadowPulse = 16 + Math.sin(frame * 0.18) * 4;
	const buttonThunk = isClicking ? 8 : 0;
	const buttonShadow = isClicking ? 2 : 9;
	const machineCompression = isClicking ? 4 : 0;

	const shineProgress = ((frame + 8) % 58) / 58;
	const shineX = interpolate(shineProgress, [0, 1], [-260, 980]);
	const secondBandX = interpolate(
		((frame + 32) % 71) / 71,
		[0, 1],
		[-340, 1040],
	);

	const counterPulse =
		launchActivated && Math.floor(frame / 3) % 2 === 0 ? 1.012 : 1;

	const finalSnap = frame >= durationInFrames - 5;
	const preExitKick =
		frame >= durationInFrames - 8 && !finalSnap
			? frame % 2 === 0
				? -12
				: 12
			: 0;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				color: '#000000',
				fontFamily:
					'Arial Black, Impact, Helvetica Neue, Arial, sans-serif',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					boxSizing: 'border-box',
					padding: '80px 40px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					transform: `translateX(${preExitKick}px)`,
				}}
			>
				{/* Tier 1: category pill */}
				<div
					style={{
						flex: '0 0 15%',
						width: '100%',
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'center',
						gap: 16,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '12px 26px',
							border: '4px solid #000000',
							borderRadius: 14,
							backgroundColor: '#FF90E8',
							boxShadow: '7px 7px 0 #000000',
							transform: `scale(${badgeSpring}) translateY(${
								Math.sin(frame * 0.11) * 3
							}px) rotate(${Math.sin(frame * 0.07) * 0.7}deg)`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								flex: '0 0 auto',
								borderRadius: '50%',
								backgroundColor: '#000000',
							}}
						/>
						<div
							style={{
								fontSize: 19,
								fontWeight: 950,
								letterSpacing: 2.8,
								lineHeight: 1,
								whiteSpace: 'nowrap',
								textTransform: 'uppercase',
							}}
						>
							Knowledge Monetization
						</div>
					</div>
				</div>

				{/* Tier 2: one knowledge cash machine */}
				<div
					style={{
						flex: '1 1 65%',
						minHeight: 0,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 16,
						position: 'relative',
					}}
				>
					<div
						style={{
							position: 'relative',
							width: '86%',
							maxWidth: 870,
							transform: `translateY(${
								entranceY + hoverY + machineCompression
							}px) scale(${cardScale}) rotate(${
								entranceRotation + hoverTilt
							}deg)`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								position: 'relative',
								width: '100%',
								boxSizing: 'border-box',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'stretch',
								justifyContent: 'center',
								gap: 20,
								padding: '38px 42px 42px',
								backgroundColor: '#23A094',
								border: '6px solid #000000',
								borderRadius: 26,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #FF90E8`,
							}}
						>
							{/* Continuous flat highlight bands */}
							<div
								style={{
									position: 'absolute',
									zIndex: 0,
									top: -40,
									bottom: -40,
									left: 0,
									width: 86,
									backgroundColor: 'rgba(255,255,255,0.30)',
									transform: `translateX(${shineX}px) skewX(-18deg)`,
									pointerEvents: 'none',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									zIndex: 0,
									top: -40,
									bottom: -40,
									left: 0,
									width: 28,
									backgroundColor: '#F1F333',
									opacity: 0.42,
									transform: `translateX(${secondBandX}px) skewX(-18deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									position: 'relative',
									zIndex: 2,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 16,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 16,
										fontSize: 24,
										fontWeight: 950,
										letterSpacing: 1.6,
										lineHeight: 1,
										textTransform: 'uppercase',
									}}
								>
									<span>Knowledge Cash Machine</span>
								</div>
								<div
									style={{
										padding: '7px 12px',
										border: '3px solid #000000',
										borderRadius: 9,
										backgroundColor: launchActivated
											? '#F1F333'
											: '#FFF8E7',
										boxShadow: '4px 4px 0 #000000',
										fontSize: 14,
										fontWeight: 950,
										letterSpacing: 1.5,
										whiteSpace: 'nowrap',
										textTransform: 'uppercase',
									}}
								>
									{launchActivated ? 'Live' : 'Ready'}
								</div>
							</div>

							<div
								style={{
									position: 'relative',
									zIndex: 2,
									display: 'flex',
									flexDirection: 'column',
									gap: 16,
								}}
							>
								<div
									style={{
										fontSize: 15,
										fontWeight: 950,
										letterSpacing: 2.4,
										lineHeight: 1,
										textTransform: 'uppercase',
									}}
								>
									Insert value
								</div>
								<div
									style={{
										minHeight: 68,
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'center',
										gap: 16,
										padding: '15px 20px',
										border: '5px solid #000000',
										borderRadius: 13,
										backgroundColor: '#FFF8E7',
										boxShadow: '7px 7px 0 #000000',
										fontSize: 28,
										fontWeight: 950,
										letterSpacing: 1.6,
										lineHeight: 1,
										textDecoration: 'underline',
										textDecorationThickness: 3,
										textUnderlineOffset: 6,
										whiteSpace: 'nowrap',
									}}
								>
									<span>{typedKnowledge || ' '}</span>
									{caretVisible && (
										<span
											style={{
												width: 5,
												height: 30,
												backgroundColor: '#000000',
											}}
										/>
									)}
								</div>
							</div>

							<div
								style={{
									position: 'relative',
									zIndex: 2,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 16,
									padding: '8px 0 2px',
									transform: `scale(${counterPulse})`,
								}}
							>
								<div
									style={{
										fontSize: 15,
										fontWeight: 950,
										letterSpacing: 3,
										lineHeight: 1,
										textTransform: 'uppercase',
									}}
								>
									Scalable revenue
								</div>
								<div
									style={{
										fontSize: 78,
										fontWeight: 950,
										letterSpacing: -2,
										lineHeight: 0.92,
										textAlign: 'center',
										fontVariantNumeric: 'tabular-nums',
										whiteSpace: 'nowrap',
									}}
								>
									{revenueText}
								</div>
							</div>

							<div
								style={{
									position: 'relative',
									zIndex: 3,
									display: 'flex',
									justifyContent: 'center',
									gap: 16,
								}}
							>
								<div
									style={{
										width: '72%',
										boxSizing: 'border-box',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
										padding: '17px 24px',
										border: '5px solid #000000',
										borderRadius: 14,
										backgroundColor: launchActivated
											? '#FF90E8'
											: '#F1F333',
										boxShadow: `${buttonShadow}px ${buttonShadow}px 0 #000000`,
										transform: `translate(${buttonThunk}px, ${buttonThunk}px)`,
										fontSize: 27,
										fontWeight: 950,
										letterSpacing: 4,
										lineHeight: 1,
										textDecoration: 'underline',
										textDecorationThickness: 4,
										textUnderlineOffset: 6,
										textTransform: 'uppercase',
									}}
								>
									{launchActivated ? 'Launched' : 'Launch'}
								</div>
							</div>

							<div
								style={{
									position: 'absolute',
									zIndex: 5,
									right: 18,
									top: 88,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									padding: '11px 17px',
									border: '4px solid #000000',
									backgroundColor: '#F1F333',
									boxShadow: '7px 7px 0 #000000',
									fontSize: 15,
									fontWeight: 950,
									letterSpacing: 1.5,
									lineHeight: 1.05,
									textAlign: 'center',
									textTransform: 'uppercase',
									transform: `scale(${stampScale}) rotate(${stampRotation}deg)`,
								}}
							>
								Fraction of
								<br />
								the price
							</div>
						</div>

						{/* Cursor is subordinate to the single machine interaction */}
						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									zIndex: 20,
									left: '58%',
									top: '42%',
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${cursorScale})`,
									filter: isClicking
										? 'drop-shadow(2px 2px 0 #FF90E8)'
										: 'drop-shadow(6px 7px 0 #FF90E8)',
									pointerEvents: 'none',
								}}
							>
								<svg
									width="58"
									height="68"
									viewBox="0 0 58 68"
									fill="none"
								>
									<path
										d="M5 4L51 39L32 42L43 61L32 66L21 47L8 60L5 4Z"
										fill="#000000"
										stroke="#FFF8E7"
										strokeWidth="5"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Tier 3: payoff */}
				<div
					style={{
						flex: '0 0 20%',
						width: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'center',
						gap: 16,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '14px 30px',
							border: '4px solid #000000',
							borderRadius: 14,
							backgroundColor: '#000000',
							boxShadow: '7px 7px 0 #FF90E8',
							color: '#FFF8E7',
							fontSize: 22,
							fontWeight: 950,
							letterSpacing: 2.2,
							lineHeight: 1,
							textAlign: 'center',
							textDecoration: 'underline',
							textDecorationColor: '#F1F333',
							textDecorationThickness: 4,
							textUnderlineOffset: 7,
							textTransform: 'uppercase',
							transform: `scale(${footerSpring}) translateY(${
								Math.sin(frame * 0.12 + 1.3) * 3
							}px)`,
						}}
					>
						Turn expertise into scalable value
					</div>
				</div>
			</div>

			{/* Decisive snap-to-black payoff while preserving the solid base canvas. */}
			{finalSnap && (
				<AbsoluteFill
					style={{
						zIndex: 100,
						backgroundColor: '#000000',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							color: '#F1F333',
							fontFamily:
								'Arial Black, Impact, Helvetica Neue, Arial, sans-serif',
							fontSize: 42,
							fontWeight: 950,
							letterSpacing: 5,
							textTransform: 'uppercase',
							textDecoration: 'underline',
							textDecorationColor: '#FF90E8',
							textDecorationThickness: 6,
							textUnderlineOffset: 10,
						}}
					>
						Activated
					</div>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
}