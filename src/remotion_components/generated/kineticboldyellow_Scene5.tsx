import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function kineticboldyellow_Scene5() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const palette = {
		background: '#0F1117',
		primary: '#3B82F6',
		secondary: '#10B981',
		highlight: '#F59E0B',
		muted: '#374151',
	};

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	const entrance = spring({
		frame,
		fps,
		config: {damping: 14, stiffness: 210, mass: 0.75},
	});

	const meterSpring = spring({
		frame: frame - 4,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.65},
	});

	const ballSpring = spring({
		frame: frame - 22,
		fps,
		config: {damping: 8, stiffness: 150, mass: 1.25},
	});

	const impactProgress = interpolate(frame, [30, 40], [0, 1], clamp);
	const impactFlash = interpolate(
		frame,
		[35, 38, 43],
		[0, 1, 0],
		clamp,
	);

	const impactShake =
		frame >= 36 && frame <= 52
			? Math.sin((frame - 36) * 2.9) * (1 - (frame - 36) / 16) * 22
			: 0;

	const meterOpacity = interpolate(frame, [0, 7, 73, 88], [0, 1, 1, 0], clamp);
	const needleRotation = interpolate(
		frame,
		[5, 13, 21, 29, 36],
		[-112, -68, 30, 78, 104],
		clamp,
	);
	const needleTwitch = Math.sin(frame * 1.1) * 4;

	const ballX = interpolate(ballSpring, [0, 1], [-430, -5], clamp);
	const ballY = interpolate(ballSpring, [0, 1], [-250, 45], clamp);
	const ballRotation = interpolate(ballSpring, [0, 1], [-38, 8], clamp);

	const debrisProgress = spring({
		frame: frame - 37,
		fps,
		config: {damping: 9, stiffness: 180, mass: 0.7},
	});

	const pistonSpring = spring({
		frame: frame - 42,
		fps,
		config: {damping: 9, stiffness: 240, mass: 0.8},
	});

	const pistonHeight = interpolate(pistonSpring, [0, 1], [0, 670], clamp);
	const pistonKick = 1 + Math.sin(Math.max(0, frame - 44) * 0.55) * 0.025;

	const ceilingBreak = spring({
		frame: frame - 57,
		fps,
		config: {damping: 8, stiffness: 260, mass: 0.55},
	});

	const counterValue = Math.round(
		interpolate(frame, [48, 79], [200, 18472], clamp),
	);
	const counterPulse = spring({
		frame: frame - 66,
		fps,
		config: {damping: 7, stiffness: 280, mass: 0.45},
	});

	const divertedDraw = interpolate(frame, [43, 76], [1, 0], clamp);

	const scaleSpring = spring({
		frame: frame - 83,
		fps,
		config: {damping: 11, stiffness: 225, mass: 0.72},
	});

	const moneyDrop = spring({
		frame: frame - 96,
		fps,
		config: {damping: 7, stiffness: 185, mass: 1.05},
	});

	const scaleTilt = interpolate(moneyDrop, [0, 1], [0, -13], clamp);
	const scaleImpactShake =
		frame >= 101 && frame <= 116
			? Math.sin((frame - 101) * 2.5) * (1 - (frame - 101) / 15) * 15
			: 0;

	const inversion = interpolate(
		frame,
		[durationInFrames - 16, durationInFrames - 10],
		[0, 1],
		clamp,
	);

	const finalSpring = spring({
		frame: frame - (durationInFrames - 15),
		fps,
		config: {damping: 9, stiffness: 270, mass: 0.55},
	});

	const globalOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 3, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const followerIcons = [
		{x: 145, y: 352, label: '1M', delay: 0},
		{x: 230, y: 275, label: '2.4M', delay: 3},
		{x: 350, y: 225, label: '8M', delay: 5},
		{x: 480, y: 215, label: '12M', delay: 7},
		{x: 600, y: 250, label: '5M', delay: 9},
		{x: 690, y: 330, label: '20M', delay: 11},
	];

	const debris = [
		{dx: -300, dy: -180, size: 17, rotate: -90, type: 'dot'},
		{dx: -245, dy: 115, size: 25, rotate: 44, type: '1M'},
		{dx: -165, dy: -240, size: 13, rotate: -22, type: 'dot'},
		{dx: -90, dy: 205, size: 20, rotate: 90, type: '8M'},
		{dx: 80, dy: -235, size: 16, rotate: 120, type: 'dot'},
		{dx: 160, dy: 205, size: 27, rotate: -55, type: '12M'},
		{dx: 245, dy: -145, size: 12, rotate: 70, type: 'dot'},
		{dx: 310, dy: 90, size: 19, rotate: 145, type: '5M'},
		{dx: -330, dy: 20, size: 10, rotate: 20, type: 'dot'},
		{dx: 340, dy: -30, size: 14, rotate: -20, type: 'dot'},
		{dx: -200, dy: -80, size: 9, rotate: 100, type: 'dot'},
		{dx: 205, dy: 75, size: 11, rotate: 30, type: 'dot'},
	];

	const moneyBlocks = [
		{x: -154, y: -10, r: -9, w: 118},
		{x: -50, y: -20, r: 6, w: 132},
		{x: 66, y: -4, r: -5, w: 126},
		{x: -126, y: -73, r: 5, w: 140},
		{x: 0, y: -86, r: -7, w: 132},
		{x: 112, y: -66, r: 9, w: 108},
		{x: -76, y: -138, r: -5, w: 128},
		{x: 50, y: -148, r: 5, w: 118},
		{x: -10, y: -198, r: -2, w: 120},
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette.background,
				opacity: globalOpacity,
				overflow: 'hidden',
				fontFamily:
					'Inter, "SF Pro Display", "Arial Black", Arial, sans-serif',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: palette.highlight,
					opacity: inversion,
				}}
			/>

			<div
				style={{
					position: 'relative',
					width: '90%',
					maxWidth: 900,
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					boxSizing: 'border-box',
					padding: '72px 22px 58px',
					overflow: 'hidden',
				}}
			>
				{/* Kinetic top label */}
				<div
					style={{
						position: 'relative',
						zIndex: 20,
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						padding: '11px 24px',
						border: `3px solid ${palette.highlight}`,
						backgroundColor: palette.background,
						transform: `translateY(${interpolate(
							entrance,
							[0, 1],
							[-70, 0],
							clamp,
						)}px) scale(${entrance})`,
					}}
				>
					<div
						style={{
							width: 13,
							height: 13,
							backgroundColor: palette.secondary,
							transform: `rotate(${frame * 6}deg) scale(${
								1 + Math.sin(frame * 0.28) * 0.18
							})`,
						}}
					/>
					<div
						style={{
							color: palette.highlight,
							fontSize: 22,
							lineHeight: 1,
							fontWeight: 950,
							letterSpacing: 5,
							textTransform: 'uppercase',
						}}
					>
						FAME ≠ FUEL
					</div>
				</div>

				{/* Main meter / piston visual */}
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: 135,
						width: 900,
						height: 1020,
						transform: `translateX(calc(-50% + ${impactShake}px)) scale(${meterSpring})`,
						transformOrigin: '50% 60%',
						opacity: meterOpacity,
					}}
				>
					<svg
						viewBox="0 0 900 1020"
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							overflow: 'visible',
						}}
					>
						{/* Obsessive popularity meter body */}
						<path
							d="M95 565 A355 355 0 0 1 805 565 L742 565 A292 292 0 0 0 158 565 Z"
							fill={palette.background}
							stroke={palette.muted}
							strokeWidth="18"
						/>
						<path
							d="M140 565 A310 310 0 0 1 760 565"
							fill="none"
							stroke={palette.primary}
							strokeWidth="22"
							strokeDasharray="18 18"
							strokeDashoffset={-frame * 9}
						/>

						{Array.from({length: 17}).map((_, i) => {
							const angle = (-164 + i * 9.25) * (Math.PI / 180);
							const x1 = 450 + Math.cos(angle) * 280;
							const y1 = 565 + Math.sin(angle) * 280;
							const x2 = 450 + Math.cos(angle) * (i % 4 === 0 ? 247 : 258);
							const y2 = 565 + Math.sin(angle) * (i % 4 === 0 ? 247 : 258);
							return (
								<line
									key={`tick-${i}`}
									x1={x1}
									y1={y1}
									x2={x2}
									y2={y2}
									stroke={i > 12 ? palette.highlight : palette.muted}
									strokeWidth={i % 4 === 0 ? 10 : 5}
								/>
							);
						})}

						<text
							x="450"
							y="475"
							textAnchor="middle"
							fill={palette.highlight}
							fontSize="32"
							fontWeight="950"
							letterSpacing="8"
						>
							POPULARITY
						</text>
						<text
							x="450"
							y="517"
							textAnchor="middle"
							fill={palette.muted}
							fontSize="20"
							fontWeight="900"
							letterSpacing="5"
						>
							MILLIONS CHASED
						</text>

						{/* Needle */}
						<g
							style={{
								transformOrigin: '450px 565px',
								transform: `rotate(${needleRotation + needleTwitch}deg)`,
							}}
						>
							<path
								d="M438 574 L450 245 L462 574 Z"
								fill={palette.highlight}
							/>
							<circle
								cx="450"
								cy="565"
								r="34"
								fill={palette.background}
								stroke={palette.highlight}
								strokeWidth="13"
							/>
							<circle cx="450" cy="565" r="11" fill={palette.primary} />
						</g>

						{/* Impact hole */}
						<circle
							cx="450"
							cy="565"
							r={34 + impactFlash * 58}
							fill={palette.highlight}
							opacity={impactFlash * 0.8}
						/>
						<circle
							cx="450"
							cy="565"
							r={interpolate(impactProgress, [0, 1], [0, 45])}
							fill={palette.background}
							stroke={palette.highlight}
							strokeWidth="10"
						/>

						{/* Cracks */}
						<g
							stroke={palette.highlight}
							strokeWidth="8"
							strokeLinecap="square"
							fill="none"
							opacity={impactProgress}
							strokeDasharray="140"
							strokeDashoffset={140 * (1 - impactProgress)}
						>
							<path d="M425 544 L377 498 L340 474" />
							<path d="M474 542 L535 495 L588 484" />
							<path d="M426 587 L375 635 L345 682" />
							<path d="M476 589 L535 628 L585 672" />
						</g>
					</svg>

					{/* Followers around the gauge */}
					{followerIcons.map((icon, index) => {
						const iconSpring = spring({
							frame: frame - 7 - icon.delay,
							fps,
							config: {damping: 9, stiffness: 250, mass: 0.45},
						});
						const orbit = Math.sin(frame * 0.18 + index) * 8;
						return (
							<div
								key={icon.label}
								style={{
									position: 'absolute',
									left: icon.x,
									top: icon.y + orbit,
									width: 82,
									height: 82,
									borderRadius: '50%',
									border: `5px solid ${
										index > 3 ? palette.highlight : palette.primary
									}`,
									backgroundColor: palette.background,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									transform: `scale(${iconSpring})`,
								}}
							>
								<div
									style={{
										width: 24,
										height: 24,
										borderRadius: '50%',
										backgroundColor: palette.primary,
									}}
								/>
								<div
									style={{
										color: palette.highlight,
										fontSize: 17,
										fontWeight: 950,
										lineHeight: 1,
										marginTop: 5,
									}}
								>
									{icon.label}
								</div>
							</div>
						);
					})}

					{/* Wrecking-ball cable */}
					<div
						style={{
							position: 'absolute',
							left: 438,
							top: -250,
							width: 10,
							height: 470,
							backgroundColor: palette.muted,
							transformOrigin: '50% 0%',
							transform: `translate(${ballX}px, ${ballY}px) rotate(${ballRotation}deg)`,
						}}
					/>

					{/* Wrecking ball stamped 200 */}
					<div
						style={{
							position: 'absolute',
							left: 337,
							top: 340,
							width: 220,
							height: 220,
							borderRadius: '50%',
							backgroundColor: palette.highlight,
							border: `15px solid ${palette.background}`,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transform: `translate(${ballX}px, ${ballY}px) rotate(${ballRotation}deg)`,
							boxSizing: 'border-box',
						}}
					>
						<div
							style={{
								color: palette.background,
								fontSize: 70,
								fontWeight: 1000,
								letterSpacing: -5,
								transform: `rotate(${-ballRotation}deg)`,
							}}
						>
							200
						</div>
					</div>

					{/* Scattered vanity-number halftone debris */}
					{debris.map((piece, index) => {
						const local = Math.max(
							0,
							Math.min(1.25, debrisProgress - index * 0.018),
						);
						return (
							<div
								key={`debris-${index}`}
								style={{
									position: 'absolute',
									left: 440,
									top: 550,
									width: piece.type === 'dot' ? piece.size : 68,
									height: piece.type === 'dot' ? piece.size : 35,
									borderRadius: piece.type === 'dot' ? '50%' : 0,
									backgroundColor:
										index % 3 === 0
											? palette.primary
											: index % 3 === 1
												? palette.highlight
												: palette.muted,
									color: palette.background,
									fontSize: 18,
									fontWeight: 1000,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									opacity: interpolate(local, [0, 0.12, 1], [0, 1, 0.72]),
									transform: `translate(${piece.dx * local}px, ${
										piece.dy * local + 170 * local * local
									}px) rotate(${piece.rotate * local}deg) scale(${
										1.3 - local * 0.45
									})`,
								}}
							>
								{piece.type === 'dot' ? '' : piece.type}
							</div>
						);
					})}
				</div>

				{/* Revenue piston mechanism */}
				<div
					style={{
						position: 'absolute',
						zIndex: 12,
						left: '50%',
						bottom: 745,
						width: 330,
						height: 760,
						transform: `translateX(-50%) scale(${pistonKick})`,
						transformOrigin: '50% 100%',
						opacity: interpolate(frame, [40, 46, 83, 95], [0, 1, 1, 0], clamp),
					}}
				>
					{/* Ceiling */}
					<div
						style={{
							position: 'absolute',
							left: -230,
							top: 35,
							width: 790,
							height: 20,
							backgroundColor: palette.muted,
							transform: `scaleX(${interpolate(
								ceilingBreak,
								[0, 1],
								[1, 0.88],
								clamp,
							)})`,
						}}
					/>

					{/* Ceiling fragments */}
					{[-1, -0.55, -0.15, 0.3, 0.7, 1].map((direction, index) => (
						<div
							key={`ceiling-${index}`}
							style={{
								position: 'absolute',
								left: 155,
								top: 38,
								width: 44 + index * 5,
								height: 17,
								backgroundColor:
									index % 2 === 0 ? palette.muted : palette.highlight,
								transform: `translate(${direction * ceilingBreak * 280}px, ${
									ceilingBreak * ceilingBreak * 150
								}px) rotate(${direction * ceilingBreak * 160}deg)`,
								opacity: interpolate(ceilingBreak, [0, 0.1, 1], [0, 1, 0.85]),
							}}
						/>
					))}

					{/* Counter punched above ceiling */}
					<div
						style={{
							position: 'absolute',
							left: -90,
							top: -100,
							width: 510,
							padding: '20px 18px',
							backgroundColor: palette.background,
							border: `8px solid ${palette.highlight}`,
							textAlign: 'center',
							transform: `translateY(${interpolate(
								ceilingBreak,
								[0, 1],
								[100, -5],
								clamp,
							)}px) scale(${Math.max(0, counterPulse)})`,
						}}
					>
						<div
							style={{
								color: palette.secondary,
								fontSize: 21,
								fontWeight: 950,
								letterSpacing: 6,
								textTransform: 'uppercase',
							}}
						>
							Revenue
						</div>
						<div
							style={{
								color: palette.highlight,
								fontSize: 70,
								fontWeight: 1000,
								lineHeight: 1,
								letterSpacing: -3,
								fontVariantNumeric: 'tabular-nums',
							}}
						>
							${counterValue.toLocaleString()}
						</div>
					</div>

					{/* Golden piston */}
					<div
						style={{
							position: 'absolute',
							left: 76,
							bottom: 0,
							width: 178,
							height: pistonHeight,
							backgroundColor: palette.highlight,
							borderLeft: `18px solid ${palette.background}`,
							borderRight: `18px solid ${palette.background}`,
							boxSizing: 'border-box',
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: '0 30px',
								backgroundColor: palette.secondary,
								opacity: 0.34,
							}}
						/>
					</div>
					<div
						style={{
							position: 'absolute',
							left: 22,
							bottom: Math.max(0, pistonHeight - 48),
							width: 286,
							height: 96,
							backgroundColor: palette.highlight,
							border: `13px solid ${palette.background}`,
							boxSizing: 'border-box',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							left: 108,
							bottom: -34,
							width: 114,
							height: 85,
							backgroundColor: palette.background,
							border: `8px solid ${palette.highlight}`,
							color: palette.highlight,
							fontSize: 31,
							fontWeight: 1000,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						200
					</div>
				</div>

				{/* Followers visibly diverted away from revenue */}
				<div
					style={{
						position: 'absolute',
						zIndex: 14,
						top: 680,
						right: 22,
						width: 300,
						height: 430,
						opacity: interpolate(frame, [43, 49, 79, 90], [0, 1, 1, 0], clamp),
					}}
				>
					<svg
						viewBox="0 0 300 430"
						style={{width: '100%', height: '100%', overflow: 'visible'}}
					>
						<path
							d="M20 30 C245 55 60 190 245 260 C285 275 265 340 210 385"
							fill="none"
							stroke={palette.primary}
							strokeWidth="13"
							strokeDasharray="900"
							strokeDashoffset={900 * divertedDraw}
						/>
						<path
							d="M210 385 L222 339 M210 385 L258 374"
							fill="none"
							stroke={palette.primary}
							strokeWidth="13"
							strokeLinecap="square"
						/>
					</svg>
					<div
						style={{
							position: 'absolute',
							right: 2,
							top: 104,
							backgroundColor: palette.background,
							border: `4px solid ${palette.primary}`,
							color: palette.primary,
							padding: '10px 12px',
							fontSize: 17,
							fontWeight: 1000,
							letterSpacing: 2,
							transform: 'rotate(5deg)',
						}}
					>
						NOT FUEL
					</div>
					{[0, 1, 2].map((i) => (
						<div
							key={`diverted-${i}`}
							style={{
								position: 'absolute',
								left: 5 + i * 53,
								top: 6 + i * 36,
								width: 48,
								height: 48,
								borderRadius: '50%',
								backgroundColor: palette.background,
								border: `5px solid ${palette.primary}`,
								transform: `translateY(${Math.sin(frame * 0.25 + i) * 8}px)`,
							}}
						>
							<div
								style={{
									width: 15,
									height: 15,
									margin: '7px auto 2px',
									borderRadius: '50%',
									backgroundColor: palette.primary,
								}}
							/>
							<div
								style={{
									width: 27,
									height: 12,
									margin: '0 auto',
									borderRadius: '50% 50% 0 0',
									backgroundColor: palette.primary,
								}}
							/>
						</div>
					))}
				</div>

				{/* Brutalist scale climax */}
				<div
					style={{
						position: 'absolute',
						zIndex: 30,
						left: '50%',
						bottom: 90,
						width: 850,
						height: 780,
						transform: `translateX(calc(-50% + ${scaleImpactShake}px)) translateY(${interpolate(
							scaleSpring,
							[0, 1],
							[500, 0],
							clamp,
						)}px) scale(${scaleSpring})`,
						opacity: interpolate(frame, [82, 89, 119, 128], [0, 1, 1, 0], clamp),
					}}
				>
					<div
						style={{
							position: 'absolute',
							left: 110,
							top: 435,
							width: 630,
							height: 28,
							backgroundColor: palette.highlight,
							border: `8px solid ${palette.background}`,
							transform: `rotate(${scaleTilt}deg)`,
							transformOrigin: '50% 50%',
							boxSizing: 'border-box',
						}}
					>
						{/* Left tray: tiny 200 */}
						<div
							style={{
								position: 'absolute',
								left: -68,
								top: -90 + scaleTilt * 2,
								width: 200,
								height: 28,
								backgroundColor: palette.muted,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: -19,
								top: -157 + scaleTilt * 2,
								width: 102,
								height: 66,
								backgroundColor: palette.highlight,
								border: `7px solid ${palette.background}`,
								color: palette.background,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontSize: 34,
								fontWeight: 1000,
							}}
						>
							200
						</div>

						{/* Right tray */}
						<div
							style={{
								position: 'absolute',
								right: -92,
								top: -90 - scaleTilt * 4,
								width: 280,
								height: 28,
								backgroundColor: palette.highlight,
								border: `7px solid ${palette.background}`,
							}}
						/>

						{/* Currency mountain */}
						<div
							style={{
								position: 'absolute',
								right: -83,
								top: -102 - scaleTilt * 4,
								width: 265,
								height: 270,
								transform: `translateY(${interpolate(
									moneyDrop,
									[0, 1],
									[-520, -260],
									clamp,
								)}px)`,
							}}
						>
							{moneyBlocks.map((block, index) => {
								const blockDrop = spring({
									frame: frame - 94 - index * 1.2,
									fps,
									config: {
										damping: 7,
										stiffness: 205,
										mass: 0.7 + index * 0.03,
									},
								});
								return (
									<div
										key={`money-${index}`}
										style={{
											position: 'absolute',
											left: 130 + block.x,
											bottom: -block.y,
											width: block.w,
											height: 60,
											backgroundColor: palette.highlight,
											border: `7px solid ${palette.background}`,
											boxSizing: 'border-box',
											transform: `translateY(${interpolate(
												blockDrop,
												[0, 1],
												[-420, 0],
												clamp,
											)}px) rotate(${block.r}deg)`,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: palette.background,
											fontSize: 27,
											fontWeight: 1000,
										}}
									>
										$
									</div>
								);
							})}
						</div>
					</div>

					{/* Scale fulcrum */}
					<div
						style={{
							position: 'absolute',
							left: 367,
							top: 455,
							width: 116,
							height: 215,
							backgroundColor: palette.muted,
							clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
						}}
					/>
					<div
						style={{
							position: 'absolute',
							left: 252,
							top: 650,
							width: 346,
							height: 48,
							backgroundColor: palette.highlight,
							border: `8px solid ${palette.background}`,
						}}
					/>

					<div
						style={{
							position: 'absolute',
							left: 0,
							top: 710,
							width: '100%',
							textAlign: 'center',
							color: palette.highlight,
							fontSize: 43,
							fontWeight: 1000,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						TINY AUDIENCE. HEAVY REVENUE.
					</div>
				</div>

				{/* Final black-to-yellow inversion lockup */}
				<div
					style={{
						position: 'absolute',
						zIndex: 100,
						inset: 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						opacity: inversion,
						transform: `scale(${interpolate(
							finalSpring,
							[0, 1],
							[1.35, 1],
							clamp,
						)}) rotate(${interpolate(
							finalSpring,
							[0, 1],
							[-4, 0],
							clamp,
						)}deg)`,
					}}
				>
					<div
						style={{
							color: palette.background,
							fontSize: 132,
							lineHeight: 0.82,
							fontWeight: 1000,
							letterSpacing: -9,
							textAlign: 'center',
							textTransform: 'uppercase',
						}}
					>
						200
						<br />
						CAN PAY.
					</div>
					<div
						style={{
							marginTop: 45,
							padding: '15px 28px',
							backgroundColor: palette.background,
							color: palette.highlight,
							fontSize: 27,
							fontWeight: 1000,
							letterSpacing: 7,
							textTransform: 'uppercase',
						}}
					>
						FOLLOWERS AREN&apos;T FUEL
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}