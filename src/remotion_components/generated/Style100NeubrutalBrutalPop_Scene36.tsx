import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene36() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const palette = ['#FFF8E7', '#000000', '#FF90E8', '#F1F333', '#23A094'];
	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: thin slab slams into frame with spring overshoot.
	const slabSpring = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.55,
		},
	});

	const badgeSpring = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.5,
		},
	});

	const footerSpring = spring({
		frame: frame - 10,
		fps,
		config: {
			damping: 12,
			stiffness: 220,
			mass: 0.55,
		},
	});

	const slamX = interpolate(frame, [0, 7], [-1100, 0], clamp);
	const slabHeight = interpolate(
		frame,
		[0, 7, 24, 30, 70],
		[76, 76, 108, 108, 370],
		clamp,
	);
	const slabScaleX = interpolate(frame, [0, 5], [0.62, 1], clamp);

	// Beat 2: two expertise layers stack upward.
	const leadershipProgress = interpolate(frame, [31, 47], [0, 1], clamp);
	const projectProgress = interpolate(frame, [49, 67], [0, 1], clamp);

	const leadershipY = interpolate(
		leadershipProgress,
		[0, 1],
		[150, 0],
		clamp,
	);
	const projectY = interpolate(projectProgress, [0, 1], [170, 0], clamp);

	const leadershipScale = interpolate(
		leadershipProgress,
		[0, 0.75, 1],
		[0.82, 1.06, 1],
		clamp,
	);
	const projectScale = interpolate(
		projectProgress,
		[0, 0.75, 1],
		[0.82, 1.06, 1],
		clamp,
	);

	// Cursor click and physical card thunk.
	const cursorVisible = frame >= 34 && frame <= 75;
	const cursorX = interpolate(frame, [34, 52], [240, 24], clamp);
	const cursorY = interpolate(frame, [34, 52], [150, 28], clamp);
	const clicking = frame >= 52 && frame <= 57;
	const cardThunk = clicking ? 9 : 0;

	// Beat 3: continuously living physics.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const tilt = Math.sin(frame * 0.08) * 1.25;
	const shadowPulse = 12 + Math.sin(frame * 0.18) * 4;

	// Repeating hard alignment taps.
	const tapCycle = frame % 18;
	const leadershipTap =
		frame >= 80 ? (tapCycle < 2 ? -6 : tapCycle < 4 ? 4 : 0) : 0;
	const projectTap =
		frame >= 80
			? tapCycle >= 9 && tapCycle < 11
				? 6
				: tapCycle >= 11 && tapCycle < 13
					? -4
					: 0
			: 0;

	// Repeating pink edge sweep.
	const shineCycle = (frame + 10) % 48;
	const shineX = interpolate(shineCycle, [0, 48], [-130, 850], clamp);

	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -70],
		clamp,
	);
	const exitScale = interpolate(
		frame,
		[durationInFrames - 8, durationInFrames],
		[1, 0.88],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 3, durationInFrames - 6, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette[0],
				padding: '80px 20px',
				boxSizing: 'border-box',
				overflow: 'hidden',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
			}}
		>
			<div
				style={{
					width: '100%',
					maxWidth: 900,
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					transform: `translateY(${exitY}px) scale(${exitScale})`,
				}}
			>
				{/* Tier 1: category button */}
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
							gap: 16,
							padding: '11px 24px',
							backgroundColor: palette[3],
							color: palette[1],
							border: `4px solid ${palette[1]}`,
							borderRadius: 12,
							boxShadow: `6px 6px 0 ${palette[1]}`,
							transform: `scale(${badgeSpring}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						<span
							style={{
								width: 12,
								height: 12,
								flex: '0 0 auto',
								backgroundColor: palette[2],
								border: `3px solid ${palette[1]}`,
								borderRadius: 2,
							}}
						/>
						<span
							style={{
								fontSize: 19,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationThickness: 3,
								textUnderlineOffset: 5,
							}}
						>
							Expertise Activated
						</span>
					</div>
				</div>

				{/* Tier 2: one hero skill-stack card */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '86%',
							maxWidth: 780,
							height: slabHeight,
							position: 'relative',
							transform: `translateX(${slamX}px) translateY(${
								hoverY + cardThunk
							}px) rotate(${tilt}deg) scaleX(${slabScaleX * slabSpring})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								display: 'flex',
								flexDirection: 'column',
								gap: 16,
								padding: '22px',
								boxSizing: 'border-box',
								overflow: 'hidden',
								backgroundColor: palette[0],
								border: `6px solid ${palette[1]}`,
								borderRadius: 20,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 ${palette[1]}`,
							}}
						>
							{/* Repeating pink edge sweep */}
							<div
								style={{
									position: 'absolute',
									zIndex: 8,
									top: -20,
									bottom: -20,
									left: 0,
									width: 42,
									backgroundColor: palette[2],
									borderLeft: `4px solid ${palette[1]}`,
									borderRight: `4px solid ${palette[1]}`,
									transform: `translateX(${shineX}px) skewX(-14deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									minHeight: 52,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 16,
									padding: '0 8px',
									position: 'relative',
									zIndex: 4,
								}}
							>
								<span
									style={{
										color: palette[1],
										fontSize: 42,
										fontWeight: 950,
										letterSpacing: -1,
										lineHeight: 1,
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 5,
										textUnderlineOffset: 7,
										whiteSpace: 'nowrap',
									}}
								>
									Skill Stack
								</span>
								<span
									style={{
										padding: '7px 12px',
										backgroundColor: palette[2],
										color: palette[1],
										border: `3px solid ${palette[1]}`,
										borderRadius: 8,
										fontSize: 15,
										fontWeight: 950,
										letterSpacing: 2,
										lineHeight: 1,
										whiteSpace: 'nowrap',
									}}
								>
									02 LAYERS
								</span>
							</div>

							<div
								style={{
									flex: 1,
									minHeight: 0,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-end',
									gap: 16,
									position: 'relative',
									zIndex: 3,
								}}
							>
								<div
									style={{
										height: 98,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '0 24px',
										boxSizing: 'border-box',
										backgroundColor: palette[4],
										color: palette[0],
										border: `5px solid ${palette[1]}`,
										borderRadius: 12,
										boxShadow: `7px 7px 0 ${palette[1]}`,
										opacity: leadershipProgress,
										transform: `translate(${leadershipTap}px, ${leadershipY}px) scale(${leadershipScale})`,
									}}
								>
									<span
										style={{
											fontSize: 29,
											fontWeight: 950,
											letterSpacing: 2,
											lineHeight: 1,
											textAlign: 'center',
											textTransform: 'uppercase',
											textDecoration: 'underline',
											textDecorationThickness: 4,
											textUnderlineOffset: 6,
										}}
									>
										Leadership
									</span>
								</div>

								<div
									style={{
										height: 98,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '0 24px',
										boxSizing: 'border-box',
										backgroundColor: palette[4],
										color: palette[0],
										border: `5px solid ${palette[1]}`,
										borderRadius: 12,
										boxShadow: `7px 7px 0 ${palette[1]}`,
										opacity: projectProgress,
										transform: `translate(${projectTap}px, ${projectY}px) scale(${projectScale})`,
									}}
								>
									<span
										style={{
											fontSize: 27,
											fontWeight: 950,
											letterSpacing: 1.5,
											lineHeight: 1,
											textAlign: 'center',
											textTransform: 'uppercase',
											textDecoration: 'underline',
											textDecorationThickness: 4,
											textUnderlineOffset: 6,
										}}
									>
										Project Management
									</span>
								</div>
							</div>
						</div>

						{cursorVisible ? (
							<div
								style={{
									position: 'absolute',
									zIndex: 20,
									right: 55,
									bottom: 34,
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${
										clicking ? 0.78 : 1
									})`,
									filter: clicking
										? `drop-shadow(2px 2px 0 ${palette[2]})`
										: `drop-shadow(6px 6px 0 ${palette[2]})`,
								}}
							>
								<svg
									width="58"
									height="58"
									viewBox="0 0 24 24"
									fill={palette[1]}
									stroke={palette[0]}
									strokeWidth="1.8"
									strokeLinejoin="round"
								>
									<path d="M3.6 2.8l7.6 18.3 2.7-7.2 7.2-2.7L3.6 2.8z" />
								</svg>
							</div>
						) : null}
					</div>
				</div>

				{/* Tier 3: punchline button */}
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
							backgroundColor: palette[1],
							color: palette[0],
							border: `4px solid ${palette[1]}`,
							borderRadius: 13,
							boxShadow: `7px 7px 0 ${palette[2]}`,
							transform: `scale(${footerSpring}) translateY(${
								Math.sin(frame * 0.12 + 2) * 3
							}px)`,
						}}
					>
						<span
							style={{
								fontSize: 22,
								fontWeight: 950,
								letterSpacing: 2.5,
								lineHeight: 1,
								textAlign: 'center',
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationColor: palette[3],
								textDecorationThickness: 4,
								textUnderlineOffset: 6,
							}}
						>
							Stack Skills. Build Authority.
						</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}