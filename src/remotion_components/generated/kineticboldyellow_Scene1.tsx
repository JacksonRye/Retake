import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

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

const buildingData = [
	{x: 0, width: 115, top: 260, depth: 24, word: 'WORK', delay: 0},
	{x: 92, width: 108, top: 100, depth: 30, word: 'TIME', delay: 4},
	{x: 188, width: 86, top: 335, depth: 20, word: 'WORK', delay: 8},
	{x: 650, width: 92, top: 305, depth: 22, word: 'TIME', delay: 7},
	{x: 724, width: 110, top: 120, depth: 28, word: 'WORK', delay: 3},
	{x: 814, width: 86, top: 255, depth: 18, word: 'TIME', delay: 10},
];

const cashDrops = [
	{start: 20, x: 365, value: 3200},
	{start: 38, x: 410, value: 6480},
	{start: 56, x: 455, value: 9160},
	{start: 73, x: 500, value: 12480},
];

function Gear({
	cx,
	cy,
	radius,
	rotation,
	label,
	scale = 1,
}: {
	cx: number;
	cy: number;
	radius: number;
	rotation: number;
	label: string;
	scale?: number;
}) {
	const teeth = Array.from({length: 12});

	return (
		<g
			transform={`translate(${cx} ${cy}) rotate(${rotation}) scale(${scale})`}
		>
			{teeth.map((_, index) => (
				<rect
					key={index}
					x={-radius * 0.13}
					y={-radius * 1.18}
					width={radius * 0.26}
					height={radius * 0.38}
					rx={2}
					fill={palette.highlight}
					transform={`rotate(${index * 30})`}
				/>
			))}
			<circle
				r={radius}
				fill={palette.background}
				stroke={palette.highlight}
				strokeWidth={10}
			/>
			<circle
				r={radius * 0.61}
				fill={palette.highlight}
				stroke={palette.background}
				strokeWidth={8}
				strokeDasharray="12 8"
			/>
			<circle
				r={radius * 0.22}
				fill={palette.background}
				stroke={palette.muted}
				strokeWidth={6}
			/>
			<text
				x={0}
				y={6}
				fill={palette.background}
				fontSize={radius * 0.35}
				fontWeight={950}
				textAnchor="middle"
				letterSpacing={2}
				transform={`rotate(${-rotation})`}
			>
				{label}
			</text>
		</g>
	);
}

export default function kineticboldyellow_Scene1() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const sceneEntrance = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 190, mass: 0.75},
	});

	const titleSpring = spring({
		frame: frame - 5,
		fps,
		config: {damping: 10, stiffness: 250, mass: 0.55},
	});

	const citySpring = spring({
		frame: frame - 10,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.7},
	});

	const cubicleSpring = spring({
		frame: frame - 16,
		fps,
		config: {damping: 9, stiffness: 260, mass: 0.55},
	});

	const jamSpring = spring({
		frame: frame - 91,
		fps,
		config: {damping: 8, stiffness: 300, mass: 0.45},
	});

	const collisionSpring = spring({
		frame: frame - 97,
		fps,
		config: {damping: 8, stiffness: 310, mass: 0.5},
	});

	const finalTextSpring = spring({
		frame: frame - 99,
		fps,
		config: {damping: 9, stiffness: 270, mass: 0.55},
	});

	const exitOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const exitScale = interpolate(
		frame,
		[durationInFrames - 11, durationInFrames],
		[1, 1.08],
		clamp,
	);

	const exitY = interpolate(
		frame,
		[durationInFrames - 11, durationInFrames],
		[0, -70],
		clamp,
	);

	const jamActive = interpolate(frame, [87, 94], [0, 1], clamp);
	const jamShake =
		jamActive *
		(frame < 111 ? Math.sin(frame * 2.8) * (15 - jamActive * 4) : 0);

	const whipX =
		interpolate(frame, [0, 7], [-160, 0], clamp) +
		interpolate(frame, [88, 92, 96], [0, -35, 0], clamp);

	const perspectiveScale =
		1 + Math.sin(frame * 0.095) * 0.012 + collisionSpring * 0.025;

	const conveyorOffset = -((frame * (frame < 91 ? 15 : 2)) % 96);
	const cubicleTravel = interpolate(frame, [16, 83], [-70, 125], clamp);
	const cubicleX = cubicleTravel - jamSpring * 64 + jamShake;

	const cubicleCompression = interpolate(
		jamSpring,
		[0, 0.5, 1],
		[1, 0.78, 0.84],
		clamp,
	);

	const cubicleWallSnap = interpolate(
		frame,
		[91, 99],
		[0, 52],
		clamp,
	);

	const gearRotation = frame * 8 * (frame < 91 ? 1 : -0.35);
	const handRotation = interpolate(
		collisionSpring,
		[0, 0.65, 1],
		[-74, 18, 8],
		clamp,
	);

	const moneyTotal = Math.round(
		interpolate(frame, [18, 81], [0, 12480], clamp),
	);
	const timeMinutes = Math.round(
		interpolate(frame, [18, 88], [0, 587], clamp),
	);
	const hours = Math.floor(timeMinutes / 60);
	const minutes = timeMinutes % 60;

	const impactFlash =
		interpolate(frame, [91, 93, 96], [0, 0.92, 0], clamp) +
		interpolate(frame, [98, 100, 104], [0, 1, 0], clamp);

	const halftoneShift = (frame * 2.2) % 36;
	const pulse = 1 + Math.sin(frame * 0.28) * 0.025;
	const drawProgress = interpolate(frame, [12, 48], [1, 0], clamp);
	const finalFlood = interpolate(frame, [98, 108], [0, 1], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette.background,
				opacity: exitOpacity,
				overflow: 'hidden',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily:
					'"Arial Narrow", "Roboto Condensed", "Helvetica Neue", Arial, sans-serif',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: palette.highlight,
					opacity: finalFlood * 0.08,
				}}
			/>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: 0.12,
					backgroundImage: `radial-gradient(${palette.highlight} 2px, ${palette.background} 2px)`,
					backgroundSize: '18px 18px',
					backgroundPosition: `${halftoneShift}px ${-halftoneShift}px`,
					transform: `scale(${1.1 + citySpring * 0.05})`,
				}}
			/>

			<div
				style={{
					width: '90%',
					maxWidth: 900,
					height: '92%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					boxSizing: 'border-box',
					overflow: 'hidden',
					transform: `translate(${whipX + jamShake}px, ${exitY}px) scale(${exitScale * perspectiveScale})`,
				}}
			>
				<div
					style={{
						width: '100%',
						height: 185,
						flexShrink: 0,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						position: 'relative',
						transform: `translateY(${interpolate(
							titleSpring,
							[0, 1],
							[-85, 0],
							clamp,
						)}px) scale(${titleSpring})`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 2,
							left: 0,
							width: `${interpolate(sceneEntrance, [0, 1], [0, 100], clamp)}%`,
							height: 8,
							backgroundColor: palette.highlight,
							boxShadow: `14px 14px 0 ${palette.primary}`,
						}}
					/>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginTop: 18,
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								color: palette.highlight,
								fontSize: 20,
								fontWeight: 950,
								letterSpacing: 5,
							}}
						>
							<div
								style={{
									width: 18,
									height: 18,
									backgroundColor: palette.highlight,
									transform: `rotate(${frame * 4}deg) scale(${pulse})`,
									boxShadow: `7px 7px 0 ${palette.muted}`,
								}}
							/>
							MANHATTAN // PAYROLL
						</div>

						<div
							style={{
								color: palette.background,
								backgroundColor: palette.highlight,
								padding: '8px 14px',
								fontSize: 18,
								fontWeight: 950,
								letterSpacing: 3,
								transform: `skewX(-8deg)`,
								boxShadow: `8px 8px 0 ${palette.primary}`,
							}}
						>
							TRAP ACTIVE
						</div>
					</div>

					<div
						style={{
							color: palette.highlight,
							fontSize: 76,
							lineHeight: 0.82,
							fontWeight: 950,
							letterSpacing: -5,
							marginTop: 28,
							textTransform: 'uppercase',
							textShadow: `9px 9px 0 ${palette.muted}`,
							whiteSpace: 'nowrap',
						}}
					>
						MONEY IN.
					</div>
				</div>

				<div
					style={{
						width: '100%',
						flex: 1,
						minHeight: 0,
						position: 'relative',
						transform: `scaleY(${interpolate(
							citySpring,
							[0, 1],
							[0.35, 1],
							clamp,
						)})`,
						transformOrigin: '50% 100%',
					}}
				>
					<svg
						viewBox="0 0 900 1100"
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							overflow: 'visible',
						}}
					>
						<defs>
							<pattern
								id="yellowHalftone"
								width="18"
								height="18"
								patternUnits="userSpaceOnUse"
								patternTransform={`translate(${halftoneShift} 0)`}
							>
								<rect width="18" height="18" fill={palette.highlight} />
								<circle
									cx="4"
									cy="4"
									r="2.5"
									fill={palette.background}
									opacity="0.5"
								/>
							</pattern>

							<pattern
								id="warningStripes"
								width="44"
								height="44"
								patternUnits="userSpaceOnUse"
								patternTransform={`translate(${conveyorOffset} 0) rotate(22)`}
							>
								<rect width="22" height="44" fill={palette.highlight} />
								<rect
									x="22"
									width="22"
									height="44"
									fill={palette.background}
								/>
							</pattern>
						</defs>

						<path
							d="M450 85 L450 950"
							stroke={palette.primary}
							strokeWidth="3"
							strokeDasharray="10 18"
							strokeDashoffset={frame * -8}
							opacity="0.6"
						/>

						{buildingData.map((building, index) => {
							const rise = spring({
								frame: frame - 7 - building.delay,
								fps,
								config: {
									damping: 9,
									stiffness: 230,
									mass: 0.55,
								},
							});
							const height = 920 - building.top;
							const buildingY = 920 - height * rise;

							return (
								<g key={`${building.x}-${index}`}>
									<polygon
										points={`${building.x + building.width},${buildingY} ${
											building.x + building.width + building.depth
										},${buildingY - building.depth} ${
											building.x + building.width + building.depth
										},920 ${building.x + building.width},920`}
										fill={index % 2 ? palette.primary : palette.muted}
									/>
									<rect
										x={building.x}
										y={buildingY}
										width={building.width}
										height={height * rise}
										fill={
											index % 3 === 0
												? 'url(#yellowHalftone)'
												: palette.background
										}
										stroke={palette.highlight}
										strokeWidth="7"
									/>

									{Array.from({length: 7}).map((_, windowIndex) => (
										<rect
											key={windowIndex}
											x={building.x + 16}
											y={buildingY + 40 + windowIndex * 78}
											width={building.width - 32}
											height={17}
											fill={
												windowIndex % 3 === 0
													? palette.secondary
													: palette.highlight
											}
											opacity={0.42 + ((windowIndex + index) % 2) * 0.35}
										/>
									))}

									<text
										x={building.x + building.width / 2}
										y={buildingY + Math.min(275, height * 0.5)}
										fill={
											index % 3 === 0
												? palette.background
												: palette.highlight
										}
										fontSize="51"
										fontWeight="950"
										letterSpacing="6"
										textAnchor="middle"
										transform={`rotate(-90 ${
											building.x + building.width / 2
										} ${
											buildingY + Math.min(275, height * 0.5)
										})`}
									>
										{building.word}
									</text>
								</g>
							);
						})}

						<path
							d="M220 655 L680 655"
							stroke={palette.highlight}
							strokeWidth="8"
							strokeDasharray="460"
							strokeDashoffset={460 * drawProgress}
						/>
						<path
							d="M260 622 L220 655 L260 688"
							fill="none"
							stroke={palette.highlight}
							strokeWidth="8"
						/>
						<path
							d="M640 622 L680 655 L640 688"
							fill="none"
							stroke={palette.highlight}
							strokeWidth="8"
						/>

						<g transform={`translate(${cubicleX} 0)`}>
							<polygon
								points="304,705 500,705 546,675 350,675"
								fill={palette.primary}
								stroke={palette.background}
								strokeWidth="7"
							/>

							<g
								transform={`translate(${cubicleWallSnap / 2} 0) scaleX(${cubicleCompression})`}
								style={{transformOrigin: '390px 790px'}}
							>
								<polygon
									points="320,714 488,714 488,891 320,891"
									fill={palette.highlight}
									stroke={palette.background}
									strokeWidth="10"
								/>
								<polygon
									points="488,714 535,681 535,854 488,891"
									fill={palette.muted}
									stroke={palette.background}
									strokeWidth="9"
								/>
								<polygon
									points="320,714 365,681 535,681 488,714"
									fill={palette.secondary}
									stroke={palette.background}
									strokeWidth="9"
								/>
								<rect
									x="356"
									y="752"
									width="99"
									height="61"
									fill={palette.background}
									stroke={palette.primary}
									strokeWidth="7"
								/>
								<path
									d="M365 826 L456 826 L474 852 L344 852 Z"
									fill={palette.background}
								/>
								<circle
									cx="405"
									cy="735"
									r="14"
									fill={palette.background}
								/>
								<path
									d="M379 769 Q405 738 431 769 L431 809 L379 809 Z"
									fill={palette.background}
								/>
								<text
									x="404"
									y="879"
									fill={palette.background}
									fontSize="24"
									fontWeight="950"
									letterSpacing="4"
									textAnchor="middle"
								>
									CUBICLE
								</text>
							</g>
						</g>

						{cashDrops.map((drop, index) => {
							const dropSpring = spring({
								frame: frame - drop.start,
								fps,
								config: {
									damping: 8,
									stiffness: 280,
									mass: 0.6,
								},
							});
							const dragged = interpolate(
								frame,
								[drop.start + 11, drop.start + 29],
								[0, index % 2 === 0 ? -210 : 230],
								clamp,
							);
							const dropY = interpolate(
								dropSpring,
								[0, 1],
								[-240, 695 - index * 25],
								clamp,
							);
							const vanish = interpolate(
								frame,
								[drop.start + 25, drop.start + 34],
								[1, 0],
								clamp,
							);

							return (
								<g
									key={drop.start}
									opacity={vanish}
									transform={`translate(${dragged + jamShake * 0.3} ${dropY}) rotate(${
										dragged * 0.035
									})`}
								>
									{Array.from({length: 4}).map((_, cashIndex) => (
										<g
											key={cashIndex}
											transform={`translate(${drop.x - 75} ${-cashIndex * 13})`}
										>
											<rect
												width="150"
												height="53"
												rx="4"
												fill={palette.secondary}
												stroke={palette.background}
												strokeWidth="6"
											/>
											<rect
												x="55"
												width="40"
												height="53"
												fill={palette.highlight}
											/>
											<circle
												cx="75"
												cy="26"
												r="12"
												fill={palette.background}
											/>
										</g>
									))}
								</g>
							);
						})}

						<Gear
							cx={259}
							cy={710}
							radius={93}
							rotation={-gearRotation}
							label="WORK"
							scale={0.55 + citySpring * 0.45}
						/>
						<Gear
							cx={641}
							cy={704}
							radius={105}
							rotation={gearRotation}
							label="TIME"
							scale={0.55 + citySpring * 0.45}
						/>

						<g>
							<rect
								x="45"
								y="892"
								width="810"
								height="101"
								rx="5"
								fill="url(#warningStripes)"
								stroke={palette.highlight}
								strokeWidth="8"
							/>
							<rect
								x="63"
								y="907"
								width="774"
								height="69"
								fill={palette.background}
								stroke={palette.muted}
								strokeWidth="5"
							/>

							{Array.from({length: 10}).map((_, index) => {
								const rollerX = 102 + index * 77;
								return (
									<g
										key={index}
										transform={`rotate(${frame * 9} ${rollerX} 942)`}
									>
										<circle
											cx={rollerX}
											cy="942"
											r="24"
											fill={palette.muted}
											stroke={palette.highlight}
											strokeWidth="5"
										/>
										<path
											d={`M${rollerX - 17} 942 L${rollerX + 17} 942 M${rollerX} 925 L${rollerX} 959`}
											stroke={palette.background}
											strokeWidth="6"
										/>
									</g>
								);
							})}
						</g>

						<g
							opacity={interpolate(frame, [95, 99], [0, 1], clamp)}
							transform={`rotate(${handRotation} 450 650)`}
						>
							<circle
								cx="450"
								cy="650"
								r="80"
								fill={palette.highlight}
								stroke={palette.background}
								strokeWidth="16"
							/>
							<path
								d="M423 672 L443 132 L470 132 L482 672 Z"
								fill={palette.background}
								stroke={palette.highlight}
								strokeWidth="8"
							/>
							<polygon
								points="443,132 456,72 470,132"
								fill={palette.highlight}
								stroke={palette.background}
								strokeWidth="7"
							/>
							<circle
								cx="450"
								cy="650"
								r="26"
								fill={palette.background}
								stroke={palette.primary}
								strokeWidth="8"
							/>
						</g>

						{Array.from({length: 15}).map((_, index) => {
							const angle = (index / 15) * Math.PI * 2;
							const distance = collisionSpring * (130 + (index % 4) * 70);
							const x = 450 + Math.cos(angle) * distance;
							const y = 680 + Math.sin(angle) * distance;

							return (
								<rect
									key={index}
									x={x}
									y={y}
									width={index % 2 ? 24 : 45}
									height={index % 2 ? 10 : 15}
									fill={
										index % 3 === 0
											? palette.primary
											: index % 3 === 1
												? palette.secondary
												: palette.highlight
									}
									transform={`rotate(${frame * (index + 4)} ${x} ${y}) scale(${collisionSpring})`}
								/>
							);
						})}
					</svg>

					<div
						style={{
							position: 'absolute',
							top: 14,
							left: '50%',
							transform: `translateX(-50%) scale(${cubicleSpring})`,
							display: 'flex',
							gap: 8,
							alignItems: 'stretch',
							filter: `drop-shadow(10px 10px 0 ${palette.background})`,
						}}
					>
						<div
							style={{
								backgroundColor: palette.highlight,
								color: palette.background,
								padding: '13px 19px',
								fontWeight: 950,
								fontSize: 28,
								letterSpacing: 1,
								whiteSpace: 'nowrap',
							}}
						>
							${moneyTotal.toLocaleString()}
						</div>
						<div
							style={{
								backgroundColor: palette.primary,
								color: palette.background,
								padding: '13px 18px',
								fontWeight: 950,
								fontSize: 28,
								letterSpacing: 2,
								whiteSpace: 'nowrap',
							}}
						>
							{String(hours).padStart(2, '0')}:
							{String(minutes).padStart(2, '0')}
						</div>
					</div>
				</div>

				<div
					style={{
						width: '100%',
						height: 240,
						flexShrink: 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						transform: `translateY(${interpolate(
							finalTextSpring,
							[0, 1],
							[110, 0],
							clamp,
						)}px) scale(${0.72 + finalTextSpring * 0.28})`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							inset: '18px 0',
							backgroundColor: palette.highlight,
							transform: `skewY(-2deg) scaleX(${finalTextSpring})`,
							boxShadow: `14px 14px 0 ${palette.primary}`,
						}}
					/>

					<div
						style={{
							position: 'relative',
							color: palette.background,
							fontSize: 30,
							fontWeight: 950,
							letterSpacing: 10,
							lineHeight: 1,
						}}
					>
						EARNING WELL ≠ FREEDOM
					</div>

					<div
						style={{
							position: 'relative',
							color: palette.background,
							fontSize: 70,
							fontWeight: 950,
							letterSpacing: -3,
							lineHeight: 0.95,
							marginTop: 15,
							textAlign: 'center',
							transform: `scaleX(${1 + Math.sin(frame * 0.55) * 0.025})`,
						}}
					>
						NOT PASSIVE MONEY.
					</div>
				</div>
			</div>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: palette.highlight,
					opacity: Math.min(1, impactFlash),
					mixBlendMode: 'screen',
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: '49%',
					height: interpolate(
						frame,
						[98, 100, 103],
						[0, 20, 0],
						clamp,
					),
					backgroundColor: palette.primary,
					transform: `rotate(-6deg)`,
					boxShadow: `0 0 0 8px ${palette.highlight}`,
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
}