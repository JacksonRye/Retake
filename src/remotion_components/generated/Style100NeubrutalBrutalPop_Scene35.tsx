import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene35() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: disciplined badge landing with overshoot.
	const badgeEntrance = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 245,
			mass: 0.58,
		},
	});

	const badgeDrop = interpolate(frame, [0, 7, 14, 22], [-250, 18, -8, 0], clamp);
	const entranceRotation = interpolate(frame, [0, 7, 14, 22], [-8, 2.5, -1, 0], clamp);
	const badgeScale = interpolate(badgeEntrance, [0, 1], [0.72, 1], clamp);

	const categoryEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 12,
			stiffness: 260,
			mass: 0.5,
		},
	});

	const footerEntrance = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 13,
			stiffness: 230,
			mass: 0.55,
		},
	});

	// Beat 2: age rolls backward from 40 to 25.
	const age = Math.round(interpolate(frame, [30, 70], [40, 25], clamp));
	const managerLock = frame >= 53;
	const managerSnapX = interpolate(frame, [48, 53], [105, 0], clamp);

	const initialStampEntrance = spring({
		frame: frame - 61,
		fps,
		config: {
			damping: 8,
			stiffness: 320,
			mass: 0.45,
		},
	});

	// Beat 3: precise marching tilts and repeated stamp thunks.
	const beat3 = frame >= 84;
	const marchIndex = Math.floor(Math.max(0, frame - 84) / 7);
	const marchingTilt = beat3 ? (marchIndex % 2 === 0 ? -1.7 : 1.7) : 0;

	const hoverY = Math.sin(frame * 0.12) * 6;
	const subtleTilt = Math.sin(frame * 0.08) * 0.65;

	const stampCycle = ((frame - 84) % 18 + 18) % 18;
	const stampThunk = beat3 && stampCycle < 4;
	const stampScale = stampThunk ? 0.88 : 1;
	const stampY = stampThunk ? 7 : 0;
	const stampShadow = stampThunk ? 2 : 7;

	const landingThunk = frame >= 7 && frame <= 10;
	const heroThunkY = landingThunk ? 8 : 0;

	const shadowBase = landingThunk ? 7 : 16;
	const shadowPulse = shadowBase + Math.sin(frame * 0.18) * 3;

	// Underline advances in visible ticks during Beat 3.
	const underlineProgress = interpolate(frame, [84, 124], [18, 100], clamp);
	const underlineTicks = Math.floor(underlineProgress / 10) * 10;

	// Continuous traveling shine.
	const shineCycle = ((frame + 16) % 62) / 62;
	const shineX = interpolate(shineCycle, [0, 1], [-220, 850], clamp);

	// Keep the full-screen background solid while only content exits.
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -80],
		clamp,
	);
	const contentOpacity = interpolate(
		frame,
		[0, 4, durationInFrames - 7, durationInFrames],
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
					padding: '80px 20px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					opacity: contentOpacity,
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 — category pill */}
				<div
					style={{
						flex: 15,
						minHeight: 0,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
							padding: '11px 24px',
							border: '4px solid #000000',
							borderRadius: 12,
							backgroundColor: '#FF90E8',
							boxShadow: '6px 6px 0 #000000',
							transform: `scale(${categoryEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						<div
							style={{
								width: 11,
								height: 11,
								flexShrink: 0,
								borderRadius: '50%',
								backgroundColor: '#000000',
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
							Early Leadership
						</div>
					</div>
				</div>

				{/* Tier 2 — the single hero credential badge */}
				<div
					style={{
						flex: 65,
						minHeight: 0,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							width: 'min(82vw, 780px)',
							position: 'relative',
							transform: `translateY(${
								badgeDrop + hoverY + heroThunkY
							}px) rotate(${
								entranceRotation + marchingTilt + subtleTilt
							}deg) scale(${badgeScale})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								position: 'relative',
								width: '100%',
								boxSizing: 'border-box',
								overflow: 'hidden',
								backgroundColor: '#23A094',
								border: '7px solid #000000',
								borderRadius: 24,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
								padding: '38px 42px 42px',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'stretch',
								gap: 16,
							}}
						>
							{/* Traveling shine remains clipped inside the one badge. */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									left: 0,
									width: 96,
									backgroundColor: 'rgba(255,255,255,0.28)',
									transform: `translateX(${shineX}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									position: 'relative',
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
										fontSize: 20,
										fontWeight: 950,
										letterSpacing: 4,
										textTransform: 'uppercase',
									}}
								>
									<span
										style={{
											display: 'inline-flex',
											padding: '8px 14px',
											border: '3px solid #000000',
											borderRadius: 8,
											backgroundColor: '#FFF8E7',
											boxShadow: '4px 4px 0 #000000',
										}}
									>
										Plane
									</span>
								</div>

								<div
									style={{
										fontSize: 17,
										fontWeight: 950,
										letterSpacing: 2,
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 3,
										textUnderlineOffset: 5,
									}}
								>
									Credential 025
								</div>
							</div>

							<div
								style={{
									position: 'relative',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 16,
									padding: '10px 0 2px',
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'baseline',
										justifyContent: 'center',
										gap: 16,
									}}
								>
									<span
										style={{
											fontSize: 21,
											fontWeight: 950,
											letterSpacing: 4,
											textTransform: 'uppercase',
										}}
									>
										Age
									</span>
									<span
										style={{
											minWidth: 150,
											fontSize: 104,
											fontWeight: 950,
											lineHeight: 0.9,
											letterSpacing: -5,
											textAlign: 'center',
											fontVariantNumeric: 'tabular-nums',
										}}
									>
										{age}
									</span>
								</div>

								<div
									style={{
										width: '100%',
										height: 88,
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											position: 'relative',
											fontSize: 57,
											fontWeight: 950,
											lineHeight: 1,
											letterSpacing: 3,
											textTransform: 'uppercase',
											opacity: managerLock ? 1 : 0,
											transform: `translateX(${managerSnapX}px)`,
										}}
									>
										Manager
										<div
											style={{
												position: 'absolute',
												left: 0,
												bottom: -10,
												width: `${underlineTicks}%`,
												height: 8,
												border: '3px solid #000000',
												backgroundColor: '#FF90E8',
												boxSizing: 'border-box',
											}}
										/>
									</div>
								</div>

								<div
									style={{
										minHeight: 62,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											padding: '10px 24px',
											border: '4px solid #000000',
											borderRadius: 9,
											backgroundColor: '#F1F333',
											boxShadow: `${stampShadow}px ${stampShadow}px 0 #000000`,
											fontSize: 22,
											fontWeight: 950,
											lineHeight: 1,
											letterSpacing: 4,
											textTransform: 'uppercase',
											opacity: frame >= 61 ? 1 : 0,
											transform: `translateY(${stampY}px) rotate(-3deg) scale(${
												initialStampEntrance * stampScale
											})`,
											transformOrigin: 'center',
										}}
									>
										Approved
									</div>
								</div>
							</div>

							<div
								style={{
									position: 'relative',
									height: 6,
									width: '100%',
									border: '2px solid #000000',
									backgroundColor: '#FFF8E7',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										width: `${interpolate(
											frame,
											[30, 70],
											[0, 100],
											clamp,
										)}%`,
										height: '100%',
										backgroundColor: '#F1F333',
										borderRight: '3px solid #000000',
										boxSizing: 'border-box',
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 — activation code */}
				<div
					style={{
						flex: 20,
						minHeight: 0,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '14px 28px',
							border: '4px solid #000000',
							borderRadius: 12,
							backgroundColor: '#000000',
							boxShadow: '7px 7px 0 #FF90E8',
							color: '#FFF8E7',
							transform: `scale(${footerEntrance}) translateY(${
								Math.sin(frame * 0.12 + 2) * 3
							}px)`,
						}}
					>
						<span
							style={{
								color: '#F1F333',
								fontSize: 18,
								fontWeight: 950,
								letterSpacing: 3,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Activation Code
						</span>
						<span
							style={{
								fontSize: 23,
								fontWeight: 950,
								letterSpacing: 2,
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationColor: '#FF90E8',
								textDecorationThickness: 4,
								textUnderlineOffset: 6,
								whiteSpace: 'nowrap',
							}}
						>
							Lead at 25
						</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}