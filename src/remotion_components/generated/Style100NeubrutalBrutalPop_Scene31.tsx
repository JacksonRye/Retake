import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene31() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames, width} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: hard right-side slam with spring overshoot.
	const heroSpring = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 245,
			mass: 0.62,
		},
	});

	const heroSlideX = interpolate(frame, [0, 9], [width * 0.9, 0], clamp);
	const heroScale = interpolate(heroSpring, [0, 1], [0.72, 1], clamp);

	const badgeSpring = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 9,
			stiffness: 270,
			mass: 0.48,
		},
	});

	const footerSpring = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 11,
			stiffness: 225,
			mass: 0.55,
		},
	});

	// Beat 2: cursor approaches START and physically clicks.
	const cursorVisible = frame >= 25 && frame <= 76;
	const cursorX = interpolate(frame, [25, 43], [180, 0], clamp);
	const cursorY = interpolate(frame, [25, 43], [125, 0], clamp);
	const cursorClicking = frame >= 44 && frame <= 49;

	const machineThunk =
		frame >= 44 && frame <= 49
			? 10
			: frame >= 50 && frame <= 53
				? -4
				: 0;

	const clientCount = frame < 50 ? 0 : frame < 63 ? 1 : 2;
	const machineStarted = frame >= 50;

	// Each count creates an abrupt shadow-offset pop.
	const countShadowPop =
		(frame >= 50 && frame <= 54) || (frame >= 63 && frame <= 67) ? 8 : 0;

	const countScale =
		(frame >= 50 && frame <= 53) || (frame >= 63 && frame <= 66)
			? 1.13
			: 1;

	// Beat 3: continuous living mechanics.
	const beatThree = frame >= 84;
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35;

	const mechanicalCycle = frame % 16;
	const mechanicalNudge = beatThree
		? mechanicalCycle < 2
			? -5
			: mechanicalCycle < 4
				? 4
				: 0
		: 0;

	const mechanicalTilt = beatThree
		? mechanicalCycle < 2
			? -0.8
			: mechanicalCycle < 4
				? 0.8
				: 0
		: 0;

	const shadowPulse =
		12 +
		countShadowPop +
		(beatThree ? Math.sin(frame * 0.18) * 3.5 : 0) +
		(beatThree && mechanicalCycle < 4 ? 5 : 0);

	const statusLightOn =
		beatThree && Math.floor((frame - 84) / 6) % 2 === 0;

	const shineX = interpolate((frame + 14) % 58, [0, 58], [-220, 900], clamp);

	// Preserve the solid background while only the content exits.
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -60],
		clamp,
	);
	const contentOpacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				color: '#000000',
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					padding: '80px 40px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					opacity: contentOpacity,
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: category sticker */}
				<div
					style={{
						height: '15%',
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
							padding: '11px 24px',
							border: '4px solid #000000',
							borderRadius: 13,
							backgroundColor: '#FF90E8',
							boxShadow: '6px 6px 0 #000000',
							transform: `scale(${badgeSpring}) rotate(${
								-2 + Math.sin(frame * 0.1) * 0.7
							}deg)`,
						}}
					>
						<div
							style={{
								width: 11,
								height: 11,
								borderRadius: '50%',
								backgroundColor: '#F1F333',
								border: '2px solid #000000',
								boxSizing: 'border-box',
							}}
						/>
						<div
							style={{
								fontSize: 19,
								fontWeight: 950,
								lineHeight: 1,
								letterSpacing: 3,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Activation Code
						</div>
					</div>
				</div>

				{/* Tier 2: single hero machine */}
				<div
					style={{
						height: '65%',
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
							maxWidth: 850,
							position: 'relative',
							transform: `translateX(${heroSlideX}px) translateY(${
								hoverY + machineThunk + mechanicalNudge
							}px) rotate(${
								hoverTilt + mechanicalTilt
							}deg) scale(${heroScale})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 330,
								padding: '38px 42px 42px',
								boxSizing: 'border-box',
								backgroundColor: '#23A094',
								border: '6px solid #000000',
								borderRadius: 24,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #FF90E8`,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 16,
								position: 'relative',
								overflow: 'hidden',
							}}
						>
							{/* Traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									left: 0,
									width: 105,
									backgroundColor: 'rgba(255,255,255,0.24)',
									borderLeft: '3px solid rgba(255,255,255,0.32)',
									borderRight: '3px solid rgba(255,255,255,0.22)',
									transform: `translateX(${shineX}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										fontSize: 25,
										fontWeight: 950,
										lineHeight: 1.1,
										letterSpacing: 2.4,
										textTransform: 'uppercase',
										textAlign: 'center',
										textDecoration: 'underline',
										textDecorationThickness: 4,
										textUnderlineOffset: 7,
									}}
								>
									Weekly Client Machine
								</div>

								<div
									style={{
										width: 22,
										height: 22,
										flexShrink: 0,
										borderRadius: '50%',
										border: '4px solid #000000',
										backgroundColor: statusLightOn
											? '#F1F333'
											: '#FFF8E7',
										boxShadow: statusLightOn
											? '0 0 0 6px rgba(241,243,51,0.28)'
											: 'none',
									}}
								/>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'baseline',
									justifyContent: 'center',
									gap: 16,
									position: 'relative',
									zIndex: 2,
									transform: `scale(${countScale})`,
								}}
							>
								<div
									style={{
										fontSize: 112,
										fontWeight: 950,
										lineHeight: 0.9,
										letterSpacing: -5,
									}}
								>
									{clientCount}
								</div>
								<div
									style={{
										maxWidth: 250,
										fontSize: 27,
										fontWeight: 950,
										lineHeight: 1.03,
										letterSpacing: 1.5,
										textTransform: 'uppercase',
									}}
								>
									Clients
									<br />
									This Week
								</div>
							</div>

							<div
								style={{
									minWidth: 190,
									padding: '12px 30px',
									boxSizing: 'border-box',
									backgroundColor: machineStarted
										? '#F1F333'
										: '#FFF8E7',
									border: '4px solid #000000',
									borderRadius: 12,
									boxShadow: cursorClicking
										? '2px 2px 0 #000000'
										: '7px 7px 0 #000000',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									position: 'relative',
									zIndex: 3,
									transform: `translateY(${cursorClicking ? 5 : 0}px)`,
								}}
							>
								<div
									style={{
										fontSize: 22,
										fontWeight: 950,
										lineHeight: 1,
										letterSpacing: 3,
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 3,
										textUnderlineOffset: 5,
									}}
								>
									{machineStarted ? 'Running' : 'Start'}
								</div>
							</div>
						</div>

						{/* Cursor belongs to the hero interaction */}
						{cursorVisible ? (
							<div
								style={{
									position: 'absolute',
									left: '62%',
									bottom: '4%',
									zIndex: 10,
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${
										cursorClicking ? 0.82 : 1
									})`,
									filter: 'drop-shadow(4px 5px 0 #FF90E8)',
									pointerEvents: 'none',
								}}
							>
								<svg
									width="56"
									height="66"
									viewBox="0 0 56 66"
									fill="none"
								>
									<path
										d="M5 4L48 37L30 40L41 59L29 65L18 45L5 58V4Z"
										fill="#000000"
										stroke="#FFF8E7"
										strokeWidth="4"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						) : null}
					</div>
				</div>

				{/* Tier 3: punchline */}
				<div
					style={{
						height: '20%',
						width: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							padding: '14px 30px',
							backgroundColor: '#000000',
							border: '4px solid #000000',
							borderRadius: 14,
							boxShadow: '7px 7px 0 #F1F333',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							transform: `scale(${footerSpring}) translateY(${
								Math.sin(frame * 0.12 + 1.4) * 3
							}px)`,
						}}
					>
						<div
							style={{
								color: '#FFF8E7',
								fontSize: 22,
								fontWeight: 950,
								lineHeight: 1.1,
								letterSpacing: 2,
								textAlign: 'center',
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationColor: '#FF90E8',
								textDecorationThickness: 4,
								textUnderlineOffset: 6,
							}}
						>
							Make Acquisition Repeatable
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}