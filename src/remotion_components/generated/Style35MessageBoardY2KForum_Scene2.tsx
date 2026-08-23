import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style35MessageBoardY2KForum_Scene2() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: Entrance
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 210,
			mass: 0.65,
		},
	});

	const cardScale = interpolate(entrance, [0, 1], [0.8, 1], clamp);
	const cardOpacity = interpolate(entrance, [0, 0.18], [0, 1], clamp);

	const badgeSpring = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.5,
		},
	});

	const avatarResolve = spring({
		frame: frame - 2,
		fps,
		config: {
			damping: 12,
			stiffness: 180,
			mass: 0.8,
		},
	});

	// ------------------------------------------
	// BEAT 2: Counter transformations
	// ------------------------------------------
	const monthsValue = Math.round(
		interpolate(frame, [24, 54], [0, 12], clamp)
	);

	const hoursValue = Math.round(
		interpolate(frame, [50, 78], [0, 4], clamp)
	);

	const rangeHighlight = interpolate(frame, [68, 80, 92], [0, 1, 0.7], clamp);

	const monthsRowInsert = spring({
		frame: frame - 20,
		fps,
		config: {
			damping: 13,
			stiffness: 190,
			mass: 0.7,
		},
	});

	const hoursRowInsert = spring({
		frame: frame - 42,
		fps,
		config: {
			damping: 13,
			stiffness: 190,
			mass: 0.7,
		},
	});

	// ------------------------------------------
	// BEAT 3: Hover / shimmer / scan / exit
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.4;
	const shadowPulse = interpolate(Math.sin(frame * 0.13), [-1, 1], [10, 22]);

	const visitorCount = Math.round(
		interpolate(frame, [84, 132], [438, 446], clamp)
	);

	const avatarShimmer = Math.sin(frame * 0.55) * 0.08;
	const headerScan = interpolate(frame, [86, 106], [-260, 860], clamp);

	const exit = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {
			damping: 12,
			stiffness: 230,
			mass: 0.8,
		},
	});

	const exitScale = interpolate(exit, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exit, [0, 1], [1, 0], clamp);

	const finalOpacity = cardOpacity * exitOpacity;
	const finalScale = cardScale * exitScale;

	const monthsDigits = String(monthsValue).padStart(2, '0');
	const hoursDigits = String(hoursValue).padStart(2, '0');
	const visitorDigits = String(visitorCount).padStart(5, '0');

	const forumFont =
		'Verdana, Geneva, Tahoma, sans-serif';

	const pixelCellBase: React.CSSProperties = {
		width: 18,
		height: 18,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 12,
		fontWeight: 700,
		color: '#2C3E70',
		backgroundColor: '#D6D9DE',
		borderRight: '1px solid #2C3E70',
	};

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F4F2EC',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: forumFont,
			}}
		>
			<div
				style={{
					width: '92%',
					minHeight: 640,
					opacity: finalOpacity,
					transform: `scale(${finalScale}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					backgroundColor: '#D6D9DE',
					border: '4px solid #2C3E70',
					boxShadow: `0px ${shadowPulse}px 0px #2C3E70`,
					borderRadius: 18,
					overflow: 'hidden',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
				}}
			>
				{/* Header */}
				<div
					style={{
						backgroundColor: '#2C3E70',
						color: '#F4F2EC',
						padding: '18px 22px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 20,
						position: 'relative',
						overflow: 'hidden',
						flexWrap: 'nowrap',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 14,
							minWidth: 0,
							flex: 1,
						}}
					>
						<div
							style={{
								backgroundColor: '#0000EE',
								border: '2px solid #F4F2EC',
								padding: '4px 8px',
								fontSize: 18,
								fontWeight: 700,
								lineHeight: 1,
								letterSpacing: '0.04em',
								whiteSpace: 'nowrap',
							}}
						>
							USER PROFILE
						</div>

						<div
							style={{
								fontSize: 26,
								fontWeight: 700,
								lineHeight: 1.1,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								textDecoration: 'underline',
								textDecorationThickness: 2,
							}}
						>
							ACTIVATION CODE
						</div>
					</div>

					<div
						style={{
							transform: `scale(${badgeSpring})`,
							transformOrigin: 'center',
							backgroundColor: '#E25822',
							color: '#F4F2EC',
							border: '3px solid #0000EE',
							boxShadow: '0px 5px 0px #2C3E70',
							padding: '10px 18px',
							borderRadius: 999,
							fontSize: 24,
							fontWeight: 800,
							lineHeight: 1,
							whiteSpace: 'nowrap',
							zIndex: 2,
						}}
					>
						6–12 MONTHS
					</div>

					<div
						style={{
							position: 'absolute',
							top: 0,
							left: headerScan,
							width: 220,
							height: '100%',
							background:
								'linear-gradient(90deg, rgba(226,88,34,0) 0%, rgba(226,88,34,0.22) 50%, rgba(226,88,34,0) 100%)',
							pointerEvents: 'none',
						}}
					/>
				</div>

				{/* Marquee */}
				<div
					style={{
						backgroundColor: '#F4F2EC',
						borderTop: '2px solid #2C3E70',
						borderBottom: '2px solid #2C3E70',
						padding: '8px 16px',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
				>
					<div
						style={{
							display: 'inline-block',
							transform: `translateX(${interpolate(
								frame,
								[0, durationInFrames],
								[360, -860]
							)}px)`,
							fontSize: 20,
							fontWeight: 700,
							color: '#0000EE',
							textDecoration: 'underline',
						}}
					>
						pure focus for 2 to 4 hours a day • pure focus for 2 to 4 hours a
						day • pure focus for 2 to 4 hours a day •
					</div>
				</div>

				{/* Body */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						padding: '26px 24px 28px 24px',
						gap: 24,
						flex: 1,
					}}
				>
					{/* Top profile area */}
					<div
						style={{
							display: 'flex',
							gap: 24,
							alignItems: 'stretch',
						}}
					>
						{/* Avatar column */}
						<div
							style={{
								width: 208,
								flexShrink: 0,
								display: 'flex',
								flexDirection: 'column',
								gap: 12,
							}}
						>
							<div
								style={{
									border: '3px solid #2C3E70',
									backgroundColor: '#F4F2EC',
									padding: 10,
									height: 208,
									display: 'grid',
									gridTemplateColumns: 'repeat(8, 1fr)',
									gridTemplateRows: 'repeat(8, 1fr)',
									gap: 3,
								}}
							>
								{new Array(64).fill(true).map((_, i) => {
									const row = Math.floor(i / 8);
									const col = i % 8;
									const resolved =
										avatarResolve > 0.75;

									const face =
										(row === 1 && (col === 2 || col === 5)) ||
										(row === 2 && (col >= 2 && col <= 5)) ||
										(row === 3 && col >= 1 && col <= 6) ||
										(row === 4 && col >= 1 && col <= 6) ||
										(row === 5 && col >= 2 && col <= 5);

									const eyes =
										(row === 3 && (col === 2 || col === 5));

									const mouth =
										row === 5 && col >= 2 && col <= 5;

									let bg = '#D6D9DE';
									if (!resolved) {
										const noise = (i * 17 + frame * 7) % 5;
										bg =
											noise === 0
												? '#2C3E70'
												: noise === 1
												? '#0000EE'
												: noise === 2
												? '#E25822'
												: noise === 3
												? '#D6D9DE'
												: '#F4F2EC';
									} else {
										if (face) bg = '#E25822';
										if (eyes) bg = '#2C3E70';
										if (mouth) bg = '#0000EE';
										if (!face && row >= 6) bg = '#2C3E70';
										if (!face && row === 0) bg = '#0000EE';
									}

									return (
										<div
											key={i}
											style={{
												backgroundColor: bg,
												opacity: 1 - avatarShimmer + ((i + frame) % 7 === 0 ? 0.05 : 0),
											}}
										/>
									);
								})}
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									border: '2px solid #2C3E70',
									backgroundColor: '#F4F2EC',
									padding: '8px 10px',
									gap: 10,
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: 700,
										color: '#2C3E70',
										textDecoration: 'underline',
										lineHeight: 1.2,
									}}
								>
									rank:
								</div>
								<div
									style={{
										backgroundColor: '#0000EE',
										color: '#F4F2EC',
										border: '2px solid #2C3E70',
										padding: '4px 8px',
										fontSize: 16,
										fontWeight: 800,
										lineHeight: 1,
										letterSpacing: '0.05em',
									}}
								>
									ELITE
								</div>
							</div>
						</div>

						{/* Main text + counters */}
						<div
							style={{
								flex: 1,
								minWidth: 0,
								display: 'flex',
								flexDirection: 'column',
								gap: 18,
							}}
						>
							<div
								style={{
									border: '3px solid #2C3E70',
									backgroundColor: '#F4F2EC',
									padding: '18px 20px',
									display: 'flex',
									flexDirection: 'column',
									gap: 12,
								}}
							>
								<div
									style={{
										fontSize: 22,
										fontWeight: 700,
										color: '#2C3E70',
										textDecoration: 'underline',
										lineHeight: 1.1,
									}}
								>
									status_message.html
								</div>

								<div
									style={{
										fontSize: 54,
										fontWeight: 800,
										lineHeight: 1.08,
										color: '#2C3E70',
										letterSpacing: '-0.03em',
									}}
								>
									6 to 12 months,
									<br />
									pure focus for{' '}
									<span
										style={{
											color: '#0000EE',
											textDecoration: 'underline',
											backgroundColor: `rgba(0, 0, 238, ${0.06 + rangeHighlight * 0.16})`,
											padding: '0 4px',
										}}
									>
										2 to 4 hours a day
									</span>
									.
								</div>
							</div>

							<div
								style={{
									border: '3px solid #2C3E70',
									backgroundColor: '#D6D9DE',
									display: 'flex',
									flexDirection: 'column',
									overflow: 'hidden',
								}}
							>
								{/* Row 1 */}
								<div
									style={{
										transform: `translateY(${interpolate(
											monthsRowInsert,
											[0, 1],
											[26, 0],
											clamp
										)}px)`,
										opacity: interpolate(monthsRowInsert, [0, 0.2, 1], [0, 1, 1], clamp),
										display: 'grid',
										gridTemplateColumns: '220px 1fr 210px',
										alignItems: 'stretch',
										borderBottom: '2px solid #2C3E70',
										minHeight: 86,
									}}
								>
									<div
										style={{
											backgroundColor: '#F4F2EC',
											borderRight: '2px solid #2C3E70',
											padding: '16px 18px',
											display: 'flex',
											alignItems: 'center',
											fontSize: 28,
											fontWeight: 700,
											color: '#2C3E70',
											textDecoration: 'underline',
										}}
									>
										MONTHS
									</div>

									<div
										style={{
											backgroundColor: '#F4F2EC',
											padding: '12px 18px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												border: '3px solid #2C3E70',
												backgroundColor: '#D6D9DE',
												boxShadow: '0px 4px 0px #2C3E70',
											}}
										>
											{monthsDigits.split('').map((digit, i) => (
												<div
													key={i}
													style={{
														width: 64,
														height: 56,
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														fontSize: 42,
														fontWeight: 800,
														color: '#2C3E70',
														backgroundColor: '#F4F2EC',
														borderRight: i === 0 ? '2px solid #2C3E70' : 'none',
														lineHeight: 1,
													}}
												>
													{digit}
												</div>
											))}
										</div>
									</div>

									<div
										style={{
											backgroundColor: '#F4F2EC',
											borderLeft: '2px solid #2C3E70',
											padding: '16px 18px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: 28,
											fontWeight: 800,
											color: '#E25822',
										}}
									>
										GOAL: 06–12
									</div>
								</div>

								{/* Row 2 */}
								<div
									style={{
										transform: `translateY(${interpolate(
											hoursRowInsert,
											[0, 1],
											[26, 0],
											clamp
										)}px)`,
										opacity: interpolate(hoursRowInsert, [0, 0.2, 1], [0, 1, 1], clamp),
										display: 'grid',
										gridTemplateColumns: '220px 1fr 210px',
										alignItems: 'stretch',
										minHeight: 86,
									}}
								>
									<div
										style={{
											backgroundColor: '#F4F2EC',
											borderRight: '2px solid #2C3E70',
											padding: '16px 18px',
											display: 'flex',
											alignItems: 'center',
											fontSize: 28,
											fontWeight: 700,
											color: '#2C3E70',
											textDecoration: 'underline',
										}}
									>
										HOURS / DAY
									</div>

									<div
										style={{
											backgroundColor: '#F4F2EC',
											padding: '12px 18px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												border: '3px solid #2C3E70',
												backgroundColor: '#D6D9DE',
												boxShadow: '0px 4px 0px #2C3E70',
											}}
										>
											{hoursDigits.split('').map((digit, i) => (
												<div
													key={i}
													style={{
														width: 64,
														height: 56,
														display: 'flex',
														alignItems: 'center',
														justifyContent: 'center',
														fontSize: 42,
														fontWeight: 800,
														color: '#0000EE',
														backgroundColor:
															rangeHighlight > 0.2 ? '#F4F2EC' : '#D6D9DE',
														borderRight: i === 0 ? '2px solid #2C3E70' : 'none',
														lineHeight: 1,
													}}
												>
													{digit}
												</div>
											))}
										</div>
									</div>

									<div
										style={{
											backgroundColor: '#F4F2EC',
											borderLeft: '2px solid #2C3E70',
											padding: '16px 18px',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											fontSize: 28,
											fontWeight: 800,
											color: '#0000EE',
											textDecoration: 'underline',
											backgroundImage:
												rangeHighlight > 0.2
													? 'linear-gradient(180deg, rgba(0,0,238,0.12) 0%, rgba(0,0,238,0.12) 100%)'
													: 'none',
										}}
									>
										RANGE: 2–4
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Footer info row */}
					<div
						style={{
							border: '3px solid #2C3E70',
							backgroundColor: '#F4F2EC',
							display: 'grid',
							gridTemplateColumns: '1.2fr 1fr 1fr',
							alignItems: 'stretch',
							minHeight: 86,
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								padding: '14px 16px',
								borderRight: '2px solid #2C3E70',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 12,
							}}
						>
							<div
								style={{
									fontSize: 24,
									fontWeight: 700,
									color: '#2C3E70',
									textDecoration: 'underline',
									whiteSpace: 'nowrap',
								}}
							>
								visitor_count:
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									border: '2px solid #2C3E70',
									overflow: 'hidden',
								}}
							>
								{visitorDigits.split('').map((d, i) => (
									<div
										key={i}
										style={{
											...pixelCellBase,
											borderRight:
												i === visitorDigits.length - 1
													? 'none'
													: '1px solid #2C3E70',
										}}
									>
										{d}
									</div>
								))}
							</div>
						</div>

						<div
							style={{
								padding: '14px 16px',
								borderRight: '2px solid #2C3E70',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 24,
								fontWeight: 700,
								color: '#0000EE',
								textDecoration: 'underline',
							}}
						>
							focus_mode: online
						</div>

						<div
							style={{
								padding: '14px 16px',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 24,
								fontWeight: 800,
								color: '#E25822',
							}}
						>
							daily_commit.exe
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}