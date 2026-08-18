import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene33() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: spring-pop entrance, fast spin, then a violent square jolt.
	const heroEntrance = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 245,
			mass: 0.58,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 12,
			stiffness: 260,
			mass: 0.5,
		},
	});

	const heroScale = interpolate(heroEntrance, [0, 1], [0.2, 1]);
	const entranceSpin = interpolate(frame, [0, 23, 27], [650, -8, 0], clamp);

	const joltX =
		frame < 22
			? 0
			: frame < 24
				? 18
				: frame < 26
					? -15
					: frame < 28
						? 8
						: 0;

	const joltY =
		frame < 22
			? 0
			: frame < 24
				? -12
				: frame < 26
					? 11
					: frame < 28
						? -5
						: 0;

	// Beat 2: two resisted drag attempts, then the dial cracks.
	let dragRotation = 0;
	if (frame >= 30 && frame < 40) {
		dragRotation = interpolate(frame, [30, 40], [0, -74], clamp);
	} else if (frame >= 40 && frame < 44) {
		dragRotation = interpolate(frame, [40, 44], [-74, 12], clamp);
	} else if (frame >= 44 && frame < 48) {
		dragRotation = interpolate(frame, [44, 48], [12, 0], clamp);
	} else if (frame >= 49 && frame < 61) {
		dragRotation = interpolate(frame, [49, 61], [0, -104], clamp);
	} else if (frame >= 61 && frame < 65) {
		dragRotation = interpolate(frame, [61, 65], [-104, 15], clamp);
	} else if (frame >= 65 && frame < 69) {
		dragRotation = interpolate(frame, [65, 69], [15, 0], clamp);
	} else if (frame >= 69 && frame < 77) {
		dragRotation = interpolate(frame, [69, 77], [0, -48], clamp);
	}

	const firstSnap = frame >= 40 && frame < 48;
	const secondSnap = frame >= 61 && frame < 69;
	const cracking = frame >= 76;

	const snapThunk = firstSnap || secondSnap ? 9 : 0;
	const crackImpact =
		frame >= 76 && frame < 78
			? -14
			: frame >= 78 && frame < 80
				? 13
				: frame >= 80 && frame < 82
					? -6
					: 0;

	// Cursor follows a coarse, physical drag path.
	const cursorVisible = frame >= 27 && frame <= 82;
	let cursorX = 150;
	let cursorY = 120;

	if (frame < 34) {
		cursorX = interpolate(frame, [27, 34], [230, 82], clamp);
		cursorY = interpolate(frame, [27, 34], [190, 45], clamp);
	} else if (frame < 40) {
		cursorX = interpolate(frame, [34, 40], [82, -75], clamp);
		cursorY = interpolate(frame, [34, 40], [45, 106], clamp);
	} else if (frame < 49) {
		cursorX = interpolate(frame, [40, 49], [-75, 88], clamp);
		cursorY = interpolate(frame, [40, 49], [106, 42], clamp);
	} else if (frame < 61) {
		cursorX = interpolate(frame, [49, 61], [88, -112], clamp);
		cursorY = interpolate(frame, [49, 61], [42, 125], clamp);
	} else if (frame < 69) {
		cursorX = interpolate(frame, [61, 69], [-112, 92], clamp);
		cursorY = interpolate(frame, [61, 69], [125, 48], clamp);
	} else {
		cursorX = interpolate(frame, [69, 78], [92, -35], clamp);
		cursorY = interpolate(frame, [69, 78], [48, 96], clamp);
	}

	const cursorPressed =
		(frame >= 34 && frame <= 40) ||
		(frame >= 49 && frame <= 61) ||
		(frame >= 69 && frame <= 77);

	// Beat 3: perpetually living physics.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35;
	const pulse = Math.sin(frame * 0.18) * 3;
	const tickDirection = Math.floor(frame / 3) % 2 === 0 ? -1 : 1;
	const crackedTick = cracking ? tickDirection * 1.5 : 0;
	const pointerShudder = cracking
		? Math.sin(frame * 1.72) * 3.4 + tickDirection * 1.8
		: 0;

	const shadowColor =
		cracking && Math.floor((frame - 76) / 5) % 2 === 0
			? '#FF90E8'
			: '#000000';

	const baseShadowDepth =
		cursorPressed || firstSnap || secondSnap ? 5 : 14;
	const shadowDepth = Math.max(4, baseShadowDepth + pulse);

	const shineX = interpolate((frame + 16) % 58, [0, 58], [-260, 650], clamp);
	const crackReveal = interpolate(frame, [75, 79], [0, 1], clamp);

	const isUnsustainable = frame >= 77;

	const labelScale =
		frame >= 76
			? spring({
					frame: frame - 76,
					fps,
					config: {
						damping: 8,
						stiffness: 300,
						mass: 0.45,
					},
				})
			: 1;

	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -65],
		clamp,
	);

	const opacity = interpolate(
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
				opacity,
				padding: '80px 20px',
				boxSizing: 'border-box',
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '88%',
					maxWidth: 840,
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: category badge */}
				<div
					style={{
						flex: '0 0 15%',
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
							borderRadius: 12,
							boxShadow: '7px 7px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.12) * 3
							}px) rotate(${Math.sin(frame * 0.09) * 0.6}deg)`,
						}}
					>
						<div
							style={{
								width: 12,
								height: 12,
								flexShrink: 0,
								backgroundColor: '#F1F333',
								border: '3px solid #000000',
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
							Activation Code
						</div>
					</div>
				</div>

				{/* Tier 2: one WORKDAY dial hero */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						minHeight: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: 500,
							height: 500,
							maxWidth: '76vw',
							maxHeight: '76vw',
							position: 'relative',
							transform: `
								translate(${joltX}px, ${hoverY + joltY + snapThunk + crackImpact}px)
								scale(${heroScale})
								rotate(${entranceSpin + hoverTilt + crackedTick}deg)
							`,
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								borderRadius: '50%',
								backgroundColor: '#F1F333',
								border: '7px solid #000000',
								boxSizing: 'border-box',
								boxShadow: `${shadowDepth}px ${shadowDepth}px 0 ${shadowColor}`,
								overflow: 'hidden',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{/* Dial index ring */}
							<div
								style={{
									position: 'absolute',
									inset: 25,
									border: '5px solid #000000',
									borderRadius: '50%',
									background:
										'repeating-conic-gradient(from -2deg, #000000 0deg 2deg, transparent 2deg 30deg)',
									opacity: 0.95,
								}}
							/>

							<div
								style={{
									position: 'absolute',
									inset: 52,
									borderRadius: '50%',
									backgroundColor: '#F1F333',
									border: '4px solid #000000',
								}}
							/>

							{/* Traveling brutal-pop shine */}
							<div
								style={{
									position: 'absolute',
									top: -80,
									bottom: -80,
									left: 0,
									width: 105,
									backgroundColor: 'rgba(255,255,255,0.48)',
									borderLeft: '3px solid rgba(0,0,0,0.12)',
									borderRight: '3px solid rgba(0,0,0,0.12)',
									transform: `translateX(${shineX}px) rotate(18deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Shuddering dial pointer */}
							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									width: 18,
									height: '35%',
									backgroundColor: '#000000',
									border: '3px solid #FFF8E7',
									borderRadius: 10,
									transformOrigin: '50% 100%',
									transform: `
										translate(-50%, -100%)
										rotate(${240 + dragRotation + pointerShudder}deg)
									`,
								}}
							/>

							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									width: 43,
									height: 43,
									borderRadius: '50%',
									backgroundColor: '#23A094',
									border: '6px solid #000000',
									transform: 'translate(-50%, -50%)',
								}}
							/>

							{/* Central dial readout */}
							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: '62%',
									transform: `translate(-50%, -50%) scale(${labelScale}) rotate(${
										isUnsustainable ? -3 : 0
									}deg)`,
									minWidth: isUnsustainable ? '76%' : '44%',
									padding: isUnsustainable ? '13px 17px' : '10px 25px',
									boxSizing: 'border-box',
									backgroundColor: isUnsustainable ? '#FF90E8' : '#FFF8E7',
									border: '5px solid #000000',
									boxShadow: '6px 6px 0 #000000',
									textAlign: 'center',
								}}
							>
								<div
									style={{
										fontSize: isUnsustainable ? 34 : 69,
										fontWeight: 950,
										lineHeight: 0.95,
										letterSpacing: isUnsustainable ? 0.5 : -2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									{isUnsustainable ? 'Unsustainable' : '16H'}
								</div>
								<div
									style={{
										marginTop: 7,
										fontSize: 15,
										fontWeight: 950,
										lineHeight: 1,
										letterSpacing: 3,
										textTransform: 'uppercase',
									}}
								>
									Workday
								</div>
							</div>

							{/* Crack belongs to the single dial hero */}
							<svg
								viewBox="0 0 500 500"
								style={{
									position: 'absolute',
									inset: 0,
									width: '100%',
									height: '100%',
									opacity: crackReveal,
									pointerEvents: 'none',
								}}
							>
								<path
									d="M252 44 L236 132 L268 174 L240 224 L279 267 L247 310 L271 366 L244 454"
									fill="none"
									stroke="#000000"
									strokeWidth="10"
									strokeLinecap="square"
									strokeLinejoin="miter"
								/>
								<path
									d="M241 224 L184 194 L153 146 M278 267 L334 235 L376 245 M248 310 L198 346 L176 395"
									fill="none"
									stroke="#000000"
									strokeWidth="7"
									strokeLinecap="square"
								/>
							</svg>
						</div>

						{/* Dragging cursor */}
						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									left: '50%',
									top: '50%',
									zIndex: 20,
									filter: `drop-shadow(${
										cursorPressed ? 2 : 7
									}px ${cursorPressed ? 2 : 7}px 0 #FF90E8)`,
									transform: `
										translate(${cursorX}px, ${cursorY}px)
										scale(${cursorPressed ? 0.82 : 1})
									`,
								}}
							>
								<svg width="62" height="62" viewBox="0 0 64 64">
									<path
										d="M8 5 L54 35 L35 39 L27 58 Z"
										fill="#000000"
										stroke="#FFF8E7"
										strokeWidth="5"
										strokeLinejoin="miter"
									/>
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* Tier 3: punchline */}
				<div
					style={{
						flex: '0 0 20%',
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
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: `7px 7px 0 ${
								cracking ? '#23A094' : '#FF90E8'
							}`,
							transform: `scale(${heroEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1.4) * 3
							}px) rotate(${Math.sin(frame * 0.08 + 2) * 0.5}deg)`,
						}}
					>
						<div
							style={{
								color: '#FFF8E7',
								fontSize: 23,
								fontWeight: 950,
								lineHeight: 1.1,
								letterSpacing: 1.5,
								textAlign: 'center',
								textDecoration: 'underline',
								textDecorationColor: '#F1F333',
								textDecorationThickness: 4,
								textUnderlineOffset: 7,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							16H Workdays Don&apos;t Scale
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}