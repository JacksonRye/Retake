import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const palette = ['#0F1117', '#3B82F6', '#10B981', '#F59E0B', '#374151'];

const clamp = {
	extrapolateLeft: 'clamp' as const,
	extrapolateRight: 'clamp' as const,
};

export default function kineticboldyellow_Scene2() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const stageIn = spring({
		frame,
		fps,
		config: {damping: 15, stiffness: 190, mass: 0.8},
	});

	const doorDrop = spring({
		frame: frame - 3,
		fps,
		config: {damping: 9, stiffness: 230, mass: 1.15},
	});

	const doorOpen = spring({
		frame: frame - 23,
		fps,
		config: {damping: 13, stiffness: 170, mass: 0.8},
	});

	const machineIn = spring({
		frame: frame - 26,
		fps,
		config: {damping: 11, stiffness: 230, mass: 0.65},
	});

	const tenKHit = spring({
		frame: frame - 53,
		fps,
		config: {damping: 7, stiffness: 340, mass: 0.75},
	});

	const passiveHit = spring({
		frame: frame - 67,
		fps,
		config: {damping: 8, stiffness: 310, mass: 0.7},
	});

	const counterLock = spring({
		frame: frame - 31,
		fps,
		config: {damping: 15, stiffness: 190, mass: 0.8},
	});

	const exit = interpolate(
		frame,
		[durationInFrames - 13, durationInFrames],
		[1, 0],
		clamp,
	);

	const exitScale = interpolate(
		frame,
		[durationInFrames - 13, durationInFrames],
		[1, 1.12],
		clamp,
	);

	const doorY = interpolate(doorDrop, [0, 1], [-920, 0], clamp);
	const doorTilt = interpolate(doorDrop, [0, 1], [-14, 0], clamp);
	const doorRotateY = interpolate(doorOpen, [0, 1], [0, -112], clamp);
	const doorRecoil = Math.sin(Math.max(0, frame - 23) * 0.72) * (1 - doorOpen) * 13;

	const turbineRotation = Math.max(0, frame - 25) * 4.3;
	const innerRotation = -Math.max(0, frame - 25) * 7.2;
	const ribbonOffset = -((Math.max(0, frame - 31) * 15) % 120);

	const counterProgress = interpolate(counterLock, [0, 1], [0, 10000], clamp);
	const counterValue = Math.min(10000, Math.round(counterProgress / 50) * 50);
	const formattedCounter = `$${counterValue.toLocaleString()}`;

	const speedDraw = interpolate(frame, [23, 39], [1, 0], clamp);
	const topBadge = spring({
		frame: frame - 8,
		fps,
		config: {damping: 11, stiffness: 250, mass: 0.55},
	});

	const pulse = 1 + Math.sin(frame * 0.34) * 0.025;
	const hydraulicShake =
		frame > 52 && frame < 62
			? Math.sin((frame - 52) * 2.7) * (62 - frame) * 0.9
			: 0;

	const flashFrames = [18, 24, 54, 68, 104];
	const isFlash = flashFrames.includes(frame);

	const wipeOne = interpolate(frame, [20, 25, 31], [-110, 0, 115], clamp);
	const wipeTwo = interpolate(frame, [50, 54, 59], [115, 0, -115], clamp);

	const noteXs = [4, 20, 36, 52, 68, 84];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette[0],
				overflow: 'hidden',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily:
					'Inter, Arial Black, Helvetica Neue, Arial, sans-serif',
			}}
		>
			{/* Photocopied texture field */}
			<svg
				viewBox="0 0 1080 1920"
				preserveAspectRatio="none"
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					opacity: 0.2,
				}}
			>
				<defs>
					<pattern
						id="grain-grid"
						width="52"
						height="52"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M0 8H18 M31 23H52 M9 42H41"
							stroke={palette[4]}
							strokeWidth="2"
						/>
						<circle cx="7" cy="26" r="2" fill={palette[4]} />
						<circle cx="43" cy="7" r="1.5" fill={palette[3]} />
					</pattern>
					<radialGradient id="void-gradient">
						<stop offset="0%" stopColor={palette[4]} stopOpacity="0.55" />
						<stop offset="62%" stopColor={palette[0]} stopOpacity="0" />
					</radialGradient>
				</defs>
				<rect width="1080" height="1920" fill="url(#grain-grid)" />
				<ellipse
					cx="540"
					cy="850"
					rx="510"
					ry="650"
					fill="url(#void-gradient)"
				/>
			</svg>

			{/* Single-frame mechanical impact flash */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: palette[3],
					opacity: isFlash ? 0.92 : 0,
					zIndex: 50,
					pointerEvents: 'none',
				}}
			/>

			{/* Sharp industrial wipes */}
			<div
				style={{
					position: 'absolute',
					zIndex: 46,
					left: `${wipeOne}%`,
					top: 0,
					width: '34%',
					height: '100%',
					backgroundColor: palette[0],
					transform: 'skewX(-12deg)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					zIndex: 45,
					left: `${wipeTwo}%`,
					top: 0,
					width: '24%',
					height: '100%',
					backgroundColor: palette[3],
					transform: 'skewX(9deg)',
					opacity: frame >= 49 && frame <= 60 ? 1 : 0,
				}}
			/>

			<div
				style={{
					width: '90%',
					maxWidth: 900,
					height: '94%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					boxSizing: 'border-box',
					opacity: exit,
					transform: `scale(${stageIn * exitScale}) translateX(${hydraulicShake}px)`,
				}}
			>
				{/* Discovery label */}
				<div
					style={{
						height: 150,
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						transform: `translateY(${interpolate(
							topBadge,
							[0, 1],
							[-80, 0],
							clamp,
						)}px)`,
						opacity: topBadge,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
						}}
					>
						<div
							style={{
								width: 18,
								height: 18,
								backgroundColor: palette[3],
								transform: `rotate(${frame * 5}deg) scale(${pulse})`,
							}}
						/>
						<div
							style={{
								color: palette[3],
								fontWeight: 950,
								fontSize: 23,
								letterSpacing: 7,
								textTransform: 'uppercase',
							}}
						>
							HIDDEN ENGINE
						</div>
					</div>

					<div
						style={{
							color: palette[0],
							backgroundColor: palette[3],
							fontWeight: 950,
							fontSize: 21,
							letterSpacing: 3,
							padding: '12px 18px',
							transform: `skewX(-8deg)`,
						}}
					>
						12× LOOP
					</div>
				</div>

				{/* Main safe and perpetual money machine */}
				<div
					style={{
						width: '100%',
						height: 1040,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						perspective: 1500,
					}}
				>
					{/* Radial speed lines */}
					<svg
						viewBox="0 0 900 1020"
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							overflow: 'visible',
							opacity: machineIn,
						}}
					>
						<g transform={`rotate(${frame * 0.45} 450 510)`}>
							{Array.from({length: 24}).map((_, index) => {
								const angle = index * 15;
								const long = index % 3 === 0;
								return (
									<line
										key={index}
										x1="450"
										y1={long ? 72 : 100}
										x2="450"
										y2={long ? 8 : 40}
										stroke={
											index % 2 === 0 ? palette[3] : palette[1]
										}
										strokeWidth={long ? 9 : 4}
										strokeDasharray="90"
										strokeDashoffset={90 * speedDraw}
										transform={`rotate(${angle} 450 510)`}
										opacity={long ? 0.78 : 0.42}
									/>
								);
							})}
						</g>
					</svg>

					{/* Machine chassis */}
					<div
						style={{
							width: 690,
							height: 690,
							position: 'absolute',
							border: `18px solid ${palette[4]}`,
							backgroundColor: palette[0],
							borderRadius: '50%',
							boxShadow: `0 0 0 8px ${palette[3]}, 28px 34px 0 ${palette[4]}`,
							transform: `scale(${machineIn}) rotate(${interpolate(
								machineIn,
								[0, 1],
								[-18, 0],
								clamp,
							)}deg)`,
							overflow: 'hidden',
						}}
					>
						{/* Endless banknote ribbon */}
						<svg
							viewBox="0 0 690 690"
							style={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
							}}
						>
							<path
								d="M-90 405 C80 245 175 510 330 365 C485 220 570 495 780 300"
								fill="none"
								stroke={palette[0]}
								strokeWidth="128"
							/>
							<path
								d="M-90 405 C80 245 175 510 330 365 C485 220 570 495 780 300"
								fill="none"
								stroke={palette[3]}
								strokeWidth="102"
								strokeDasharray="78 20"
								strokeDashoffset={ribbonOffset}
							/>
							<path
								d="M-90 405 C80 245 175 510 330 365 C485 220 570 495 780 300"
								fill="none"
								stroke={palette[4]}
								strokeWidth="5"
								strokeDasharray="12 16"
								strokeDashoffset={-ribbonOffset * 1.2}
							/>

							{noteXs.map((x, index) => (
								<g
									key={x}
									transform={`translate(${
										((x + frame * 1.7) % 108) * 7 - 80
									} ${565 + Math.sin(frame * 0.15 + index) * 9})`}
								>
									<rect
										width="104"
										height="58"
										rx="4"
										fill={palette[3]}
										stroke={palette[0]}
										strokeWidth="6"
									/>
									<circle
										cx="52"
										cy="29"
										r="15"
										fill={palette[0]}
									/>
									<path
										d="M9 12H31 M73 46H95"
										stroke={palette[0]}
										strokeWidth="5"
									/>
								</g>
							))}
						</svg>

						{/* Twelve-month turbine */}
						<div
							style={{
								position: 'absolute',
								left: 93,
								top: 93,
								width: 468,
								height: 468,
								borderRadius: '50%',
								border: `16px solid ${palette[3]}`,
								backgroundColor: palette[0],
								transform: `rotate(${turbineRotation}deg)`,
								boxShadow: `0 0 0 12px ${palette[4]}`,
							}}
						>
							{Array.from({length: 12}).map((_, index) => {
								const angle = index * 30;
								return (
									<div
										key={index}
										style={{
											position: 'absolute',
											left: '50%',
											top: '50%',
											width: 46,
											height: 118,
											marginLeft: -23,
											marginTop: -220,
											transformOrigin: '23px 220px',
											transform: `rotate(${angle}deg)`,
											display: 'flex',
											justifyContent: 'center',
										}}
									>
										<div
											style={{
												width: index % 3 === 0 ? 24 : 13,
												height: index % 3 === 0 ? 70 : 48,
												backgroundColor:
													index % 3 === 0 ? palette[2] : palette[1],
												border: `5px solid ${palette[0]}`,
											}}
										/>
									</div>
								);
							})}

							<div
								style={{
									position: 'absolute',
									inset: 92,
									borderRadius: '50%',
									border: `10px dashed ${palette[4]}`,
									transform: `rotate(${innerRotation}deg)`,
								}}
							/>

							<div
								style={{
									position: 'absolute',
									inset: 135,
									borderRadius: '50%',
									backgroundColor: palette[3],
									border: `15px solid ${palette[0]}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transform: `rotate(${-turbineRotation}deg)`,
								}}
							>
								<div
									style={{
										width: 64,
										height: 64,
										backgroundColor: palette[0],
										transform: `rotate(${frame * 8}deg)`,
										clipPath:
											'polygon(50% 0%, 62% 33%, 100% 50%, 62% 67%, 50% 100%, 38% 67%, 0% 50%, 38% 33%)',
									}}
								/>
							</div>
						</div>

						{/* Counter punch mechanism */}
						<div
							style={{
								position: 'absolute',
								left: 102,
								right: 102,
								top: 270,
								height: 120,
								backgroundColor: palette[0],
								border: `10px solid ${palette[3]}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transform: `scale(${counterLock}) translateY(${interpolate(
									counterLock,
									[0, 1],
									[-45, 0],
									clamp,
								)}px)`,
								boxShadow: `13px 16px 0 ${palette[4]}`,
							}}
						>
							<div
								style={{
									color: palette[3],
									fontSize: 66,
									lineHeight: 1,
									fontWeight: 950,
									fontVariantNumeric: 'tabular-nums',
									letterSpacing: -2,
								}}
							>
								{formattedCounter}
							</div>
						</div>
					</div>

					{/* Colossal safe-door play button */}
					<div
						style={{
							position: 'absolute',
							width: 700,
							height: 700,
							transformStyle: 'preserve-3d',
							transformOrigin: '4% 50%',
							transform: `translateY(${doorY + doorRecoil}px) rotateX(${doorTilt}deg) rotateY(${doorRotateY}deg)`,
							zIndex: 12,
						}}
					>
						<div
							style={{
								position: 'absolute',
								inset: 0,
								borderRadius: 58,
								backgroundColor: palette[3],
								border: `20px solid ${palette[0]}`,
								boxShadow: `28px 30px 0 ${palette[4]}, inset 0 0 0 18px ${palette[4]}`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backfaceVisibility: 'hidden',
							}}
						>
							<div
								style={{
									width: 0,
									height: 0,
									borderTop: '115px solid transparent',
									borderBottom: '115px solid transparent',
									borderLeft: `190px solid ${palette[0]}`,
									marginLeft: 42,
									filter: `drop-shadow(18px 18px 0 ${palette[4]})`,
								}}
							/>

							{[
								[44, 44],
								[610, 44],
								[44, 610],
								[610, 610],
							].map(([x, y], index) => (
								<div
									key={index}
									style={{
										position: 'absolute',
										left: x,
										top: y,
										width: 38,
										height: 38,
										borderRadius: '50%',
										backgroundColor: palette[0],
										border: `8px solid ${palette[4]}`,
									}}
								/>
							))}
						</div>

						<div
							style={{
								position: 'absolute',
								right: -26,
								top: 124,
								width: 44,
								height: 450,
								backgroundColor: palette[4],
								border: `8px solid ${palette[0]}`,
								transform: 'rotateY(90deg)',
								transformOrigin: 'left center',
							}}
						/>
					</div>
				</div>

				{/* Extruded hydraulic typography */}
				<div
					style={{
						width: '100%',
						height: 520,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						marginTop: -75,
						position: 'relative',
						zIndex: 20,
					}}
				>
					<div
						style={{
							color: palette[3],
							fontSize: 238,
							fontWeight: 950,
							lineHeight: 0.78,
							letterSpacing: -18,
							transform: `translateY(${interpolate(
								tenKHit,
								[0, 1],
								[-310, 0],
								clamp,
							)}px) scaleX(${interpolate(
								tenKHit,
								[0, 1],
								[0.62, 1],
								clamp,
							)}) scaleY(${interpolate(
								tenKHit,
								[0, 1],
								[1.4, 1],
								clamp,
							)})`,
							textShadow: `0 8px 0 ${palette[4]}, 0 16px 0 ${palette[4]}, 0 24px 0 ${palette[4]}, 0 32px 0 ${palette[0]}`,
							WebkitTextStroke: `5px ${palette[0]}`,
						}}
					>
						10K
					</div>

					<div
						style={{
							marginTop: 50,
							color: palette[0],
							backgroundColor: palette[2],
							border: `9px solid ${palette[0]}`,
							fontSize: 68,
							fontWeight: 950,
							lineHeight: 1,
							letterSpacing: 10,
							padding: '25px 34px 22px',
							textTransform: 'uppercase',
							transform: `translateX(${interpolate(
								passiveHit,
								[0, 1],
								[930, 0],
								clamp,
							)}px) rotate(${interpolate(
								passiveHit,
								[0, 1],
								[8, -2],
								clamp,
							)}deg)`,
							boxShadow: `14px 14px 0 ${palette[3]}, 28px 28px 0 ${palette[4]}`,
							whiteSpace: 'nowrap',
						}}
					>
						PASSIVELY
					</div>

					<div
						style={{
							marginTop: 54,
							display: 'flex',
							alignItems: 'center',
							gap: 20,
							opacity: interpolate(frame, [76, 87], [0, 1], clamp),
						}}
					>
						<div
							style={{
								width: 108,
								height: 7,
								backgroundColor: palette[1],
							}}
						/>
						<div
							style={{
								color: palette[1],
								fontSize: 22,
								fontWeight: 900,
								letterSpacing: 6,
							}}
						>
							PRINT • LOOP • REPEAT
						</div>
						<div
							style={{
								width: 108,
								height: 7,
								backgroundColor: palette[1],
							}}
						/>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}