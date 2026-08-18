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
	blue: '#3B82F6',
	green: '#10B981',
	yellow: '#F59E0B',
	muted: '#374151',
};

const clamp = {
	extrapolateLeft: 'clamp' as const,
	extrapolateRight: 'clamp' as const,
};

export default function kineticboldyellow_Scene4() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const sceneIn = spring({
		frame,
		fps,
		config: {damping: 15, stiffness: 190, mass: 0.8},
	});

	const keyOne = spring({
		frame: frame - 8,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.65},
	});
	const keyTwo = spring({
		frame: frame - 15,
		fps,
		config: {damping: 10, stiffness: 250, mass: 0.62},
	});
	const keyThree = spring({
		frame: frame - 22,
		fps,
		config: {damping: 9, stiffness: 270, mass: 0.58},
	});

	const firstImpact = spring({
		frame: frame - 43,
		fps,
		config: {damping: 8, stiffness: 320, mass: 0.5},
	});
	const secondImpact = spring({
		frame: frame - 51,
		fps,
		config: {damping: 8, stiffness: 330, mass: 0.5},
	});
	const finalImpact = spring({
		frame: frame - 59,
		fps,
		config: {damping: 9, stiffness: 300, mass: 0.58},
	});

	const switchTurn = spring({
		frame: frame - 62,
		fps,
		config: {damping: 10, stiffness: 220, mass: 0.75},
	});

	const factoryDeploy = spring({
		frame: frame - 69,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});
	const shutterOpen = spring({
		frame: frame - 75,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.55},
	});
	const wordsDeploy = spring({
		frame: frame - 82,
		fps,
		config: {damping: 9, stiffness: 220, mass: 0.6},
	});
	const railLaunch = spring({
		frame: frame - 92,
		fps,
		config: {damping: 9, stiffness: 250, mass: 0.58},
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
		[1, 1.09],
		clamp,
	);

	const fractureProgress = interpolate(frame, [1, 22], [1, 0], clamp);
	const energyProgress = interpolate(frame, [59, 88], [1, 0], clamp);
	const factoryPower = interpolate(frame, [64, 82], [0, 1], clamp);
	const launchProgress = interpolate(frame, [93, 122], [0, 1], clamp);
	const pulse = 1 + Math.sin(frame * 0.32) * 0.035;
	const alarmPulse = 0.62 + Math.sin(frame * 0.46) * 0.25;

	const keyTravel = (
		progress: number,
		startX: number,
		startY: number,
		impactFrame: number,
	) => {
		const magnet = interpolate(
			frame,
			[impactFrame - 16, impactFrame],
			[0, 1],
			clamp,
		);
		return {
			x: interpolate(magnet, [0, 1], [startX, 0], clamp),
			y: interpolate(magnet, [0, 1], [startY, 0], clamp),
			scale: interpolate(progress, [0, 1], [0.2, 1], clamp),
			rotation:
				interpolate(progress, [0, 1], [-150, 0], clamp) +
				interpolate(magnet, [0, 1], [0, 310], clamp),
			opacity: interpolate(frame, [impactFrame + 1, impactFrame + 5], [1, 0], clamp),
		};
	};

	const k1 = keyTravel(keyOne, -330, -360, 43);
	const k2 = keyTravel(keyTwo, 330, -300, 51);
	const k3 = keyTravel(keyThree, -290, 290, 59);

	const impactFlash =
		interpolate(firstImpact, [0, 0.5, 1], [0, 1, 0], clamp) +
		interpolate(secondImpact, [0, 0.5, 1], [0, 1, 0], clamp) +
		interpolate(finalImpact, [0, 0.5, 1], [0, 1, 0], clamp);

	const gearRotation = frame * (factoryPower * 4.2);
	const conveyorOffset = (frame * 14 * factoryPower) % 92;
	const switchRotation = interpolate(switchTurn, [0, 1], [-34, 38], clamp);
	const factoryScale = interpolate(factoryDeploy, [0, 1], [0.3, 1], clamp);
	const factoryY = interpolate(factoryDeploy, [0, 1], [270, 0], clamp);

	const Key = ({
		transform,
		opacity,
	}: {
		transform: string;
		opacity: number;
	}) => (
		<g transform={transform} opacity={opacity}>
			<ellipse
				cx="0"
				cy="0"
				rx="45"
				ry="37"
				fill={palette.yellow}
				stroke={palette.background}
				strokeWidth="11"
			/>
			<ellipse
				cx="0"
				cy="0"
				rx="17"
				ry="14"
				fill={palette.background}
				stroke={palette.muted}
				strokeWidth="4"
			/>
			<path
				d="M38 -12 L143 -12 L143 7 L123 7 L123 28 L98 28 L98 8 L38 8 Z"
				fill={palette.yellow}
				stroke={palette.background}
				strokeWidth="10"
				strokeLinejoin="round"
			/>
			<path
				d="M43 -2 L132 -2"
				stroke={palette.blue}
				strokeWidth="5"
				strokeLinecap="round"
			/>
			<circle cx="-26" cy="-23" r="7" fill={palette.green} />
		</g>
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette.background,
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
				opacity: exit,
				fontFamily:
					'Inter, "Arial Narrow", "Helvetica Neue", Arial, sans-serif',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundImage: `
						linear-gradient(${palette.muted}33 2px, transparent 2px),
						linear-gradient(90deg, ${palette.muted}33 2px, transparent 2px)
					`,
					backgroundSize: '90px 90px',
					transform: `perspective(900px) rotateX(64deg) translateY(700px) scale(${1 +
						factoryPower * 0.35})`,
					transformOrigin: 'center bottom',
					opacity: 0.38,
				}}
			/>

			<div
				style={{
					width: '90%',
					maxWidth: 900,
					height: '94%',
					position: 'relative',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					overflow: 'hidden',
					transform: `scale(${exitScale})`,
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 40,
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						transform: `translateY(${interpolate(
							sceneIn,
							[0, 1],
							[-60, 0],
							clamp,
						)}px)`,
						opacity: sceneIn,
						zIndex: 20,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 13,
							color: palette.yellow,
							fontWeight: 900,
							fontSize: 21,
							letterSpacing: 5,
						}}
					>
						<span
							style={{
								width: 16,
								height: 16,
								backgroundColor: palette.yellow,
								transform: `rotate(45deg) scale(${pulse})`,
								boxShadow: `0 0 24px ${palette.yellow}`,
							}}
						/>
						IGNITION PROTOCOL
					</div>

					<div
						style={{
							color: palette.green,
							borderBottom: `4px solid ${palette.green}`,
							paddingBottom: 7,
							fontSize: 19,
							fontWeight: 900,
							letterSpacing: 3,
						}}
					>
						SYSTEM 01
					</div>
				</div>

				<svg
					viewBox="0 0 900 1700"
					style={{
						position: 'absolute',
						inset: 0,
						width: '100%',
						height: '100%',
						overflow: 'visible',
					}}
				>
					<defs>
						<filter id="yellowGlow" x="-100%" y="-100%" width="300%" height="300%">
							<feGaussianBlur stdDeviation="13" result="blur" />
							<feFlood floodColor={palette.yellow} result="color" />
							<feComposite in="color" in2="blur" operator="in" result="glow" />
							<feMerge>
								<feMergeNode in="glow" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
						<filter id="blueGlow" x="-100%" y="-100%" width="300%" height="300%">
							<feGaussianBlur stdDeviation="10" result="blur" />
							<feFlood floodColor={palette.blue} result="color" />
							<feComposite in="color" in2="blur" operator="in" result="glow" />
							<feMerge>
								<feMergeNode in="glow" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					{/* Fracturing timeline */}
					<g opacity={interpolate(frame, [19, 33], [1, 0], clamp)}>
						<path
							d="M80 315 L250 315 L290 270 L345 360 L405 285 L465 335 L540 260 L595 350 L655 300 L820 300"
							fill="none"
							stroke={palette.yellow}
							strokeWidth="15"
							strokeLinecap="square"
							strokeLinejoin="miter"
							strokeDasharray="1100"
							strokeDashoffset={1100 * fractureProgress}
							filter="url(#yellowGlow)"
						/>
						{[
							[282, 273, -14],
							[399, 287, 10],
							[535, 263, -8],
						].map(([x, y, r], index) => (
							<g
								key={index}
								transform={`translate(${x} ${y}) rotate(${r + frame * (index + 1) * 2})`}
							>
								<path
									d="M-20 -12 L20 -6 L13 12 L-15 18 Z"
									fill={index === 1 ? palette.blue : palette.yellow}
								/>
							</g>
						))}
					</g>

					{/* Magnetic field */}
					<g opacity={interpolate(frame, [27, 42, 62], [0, 0.9, 0], clamp)}>
						{[140, 195, 250].map((radius, index) => (
							<circle
								key={radius}
								cx="450"
								cy="750"
								r={radius + Math.sin(frame * 0.25 + index) * 13}
								fill="none"
								stroke={index === 1 ? palette.blue : palette.green}
								strokeWidth="5"
								strokeDasharray={`${22 + index * 8} 24`}
								strokeDashoffset={-frame * (5 + index)}
								opacity={0.7 - index * 0.12}
							/>
						))}
						<path
							d="M275 650 Q450 520 625 650 M275 850 Q450 980 625 850"
							fill="none"
							stroke={palette.blue}
							strokeWidth="7"
							strokeDasharray="24 18"
							strokeDashoffset={-frame * 9}
						/>
					</g>

					{/* Flying heavy keys */}
					<Key
						transform={`translate(${450 + k1.x} ${750 + k1.y}) rotate(${k1.rotation}) scale(${k1.scale})`}
						opacity={k1.opacity}
					/>
					<Key
						transform={`translate(${450 + k2.x} ${750 + k2.y}) rotate(${k2.rotation}) scale(${k2.scale})`}
						opacity={k2.opacity}
					/>
					<Key
						transform={`translate(${450 + k3.x} ${750 + k3.y}) rotate(${k3.rotation}) scale(${k3.scale})`}
						opacity={k3.opacity}
					/>

					{/* Impact sparks */}
					<g
						transform="translate(450 750)"
						opacity={Math.min(1, impactFlash)}
						filter="url(#yellowGlow)"
					>
						{Array.from({length: 12}).map((_, index) => {
							const angle = (index / 12) * Math.PI * 2;
							const distance = 80 + (index % 3) * 35;
							return (
								<line
									key={index}
									x1={Math.cos(angle) * 45}
									y1={Math.sin(angle) * 45}
									x2={Math.cos(angle) * distance}
									y2={Math.sin(angle) * distance}
									stroke={index % 2 === 0 ? palette.yellow : palette.blue}
									strokeWidth="9"
									strokeLinecap="square"
								/>
							);
						})}
					</g>

					{/* Industrial numeral-one ignition switch */}
					<g
						transform={`translate(450 760) scale(${interpolate(
							sceneIn,
							[0, 1],
							[0.3, 1],
							clamp,
						)})`}
					>
						<path
							d="M-76 -218 L36 -218 L36 180 L112 180 L112 250 L-121 250 L-121 180 L-38 180 L-38 -92 L-111 -53 L-144 -119 Z"
							fill={palette.muted}
							stroke={palette.yellow}
							strokeWidth="13"
							strokeLinejoin="bevel"
							filter="url(#yellowGlow)"
						/>
						<path
							d="M-55 -183 L9 -183 L9 156 L-55 156 Z"
							fill={palette.background}
							stroke={palette.blue}
							strokeWidth="8"
						/>
						<circle
							cx="-23"
							cy="-55"
							r="60"
							fill={palette.background}
							stroke={palette.yellow}
							strokeWidth="15"
						/>
						<circle
							cx="-23"
							cy="-55"
							r="29"
							fill={palette.muted}
							stroke={palette.green}
							strokeWidth="8"
						/>
						<g transform={`translate(-23 -55) rotate(${switchRotation})`}>
							<rect
								x="-14"
								y="-12"
								width="124"
								height="24"
								rx="5"
								fill={palette.yellow}
								stroke={palette.background}
								strokeWidth="7"
							/>
							<rect
								x="82"
								y="-27"
								width="50"
								height="54"
								rx="7"
								fill={palette.yellow}
								stroke={palette.background}
								strokeWidth="8"
							/>
						</g>
						<circle
							cx="77"
							cy="-153"
							r="13"
							fill={palette.green}
							opacity={factoryPower}
							filter="url(#blueGlow)"
						/>
					</g>

					{/* Power conduit */}
					<path
						d="M450 1005 L450 1130 L288 1130 L288 1214 M450 1130 L612 1130 L612 1214"
						fill="none"
						stroke={palette.blue}
						strokeWidth="13"
						strokeLinecap="square"
						strokeLinejoin="round"
						strokeDasharray="740"
						strokeDashoffset={740 * energyProgress}
						filter="url(#blueGlow)"
					/>

					{/* Factory unfolding */}
					<g
						transform={`translate(450 ${1380 + factoryY}) scale(${factoryScale})`}
						opacity={interpolate(factoryDeploy, [0, 0.15, 1], [0, 1, 1], clamp)}
					>
						{/* Telescoping towers */}
						<g
							transform={`translate(-278 ${interpolate(
								factoryDeploy,
								[0, 1],
								[150, 0],
								clamp,
							)})`}
						>
							<path
								d="M-80 80 L-80 -220 L68 -220 L68 80 Z"
								fill={palette.background}
								stroke={palette.muted}
								strokeWidth="12"
							/>
							<path
								d="M-58 -190 L45 -190 L45 -126 L-58 -126 Z"
								fill={palette.blue}
							/>
							<path
								d="M-52 -94 L38 -94 M-52 -57 L38 -57 M-52 -20 L38 -20"
								stroke={palette.yellow}
								strokeWidth="13"
							/>
						</g>

						<g
							transform={`translate(278 ${interpolate(
								factoryDeploy,
								[0, 1],
								[170, 0],
								clamp,
							)})`}
						>
							<path
								d="M-68 80 L-68 -250 L80 -250 L80 80 Z"
								fill={palette.background}
								stroke={palette.muted}
								strokeWidth="12"
							/>
							<rect
								x="-44"
								y="-215"
								width="99"
								height="66"
								fill={palette.green}
							/>
							<path
								d="M-38 -112 L50 -112 M-38 -75 L50 -75 M-38 -38 L50 -38"
								stroke={palette.yellow}
								strokeWidth="13"
							/>
						</g>

						{/* Main storefront */}
						<path
							d="M-235 90 L-235 -170 L-160 -226 L-75 -182 L5 -242 L90 -190 L170 -224 L235 -167 L235 90 Z"
							fill={palette.muted}
							stroke={palette.yellow}
							strokeWidth="13"
							strokeLinejoin="bevel"
						/>
						<rect
							x="-193"
							y="-110"
							width="386"
							height="175"
							fill={palette.background}
							stroke={palette.blue}
							strokeWidth="9"
						/>

						{/* Store shutters snapping upward */}
						<g
							transform={`translate(0 ${interpolate(
								shutterOpen,
								[0, 1],
								[0, -154],
								clamp,
							)}) scale(1 ${interpolate(
								shutterOpen,
								[0, 1],
								[1, 0.18],
								clamp,
							)})`}
						>
							{Array.from({length: 7}).map((_, index) => (
								<rect
									key={index}
									x="-181"
									y={-98 + index * 23}
									width="362"
									height="16"
									fill={index % 2 === 0 ? palette.yellow : palette.muted}
								/>
							))}
						</g>

						{/* Engaged product gears */}
						<g
							transform={`translate(-78 -22) rotate(${gearRotation})`}
							opacity={factoryPower}
						>
							<circle r="64" fill={palette.blue} stroke={palette.background} strokeWidth="10" />
							{Array.from({length: 8}).map((_, index) => (
								<rect
									key={index}
									x="-12"
									y="-82"
									width="24"
									height="35"
									fill={palette.blue}
									transform={`rotate(${index * 45})`}
								/>
							))}
							<circle r="20" fill={palette.background} stroke={palette.yellow} strokeWidth="9" />
						</g>

						<g
							transform={`translate(78 2) rotate(${-gearRotation * 1.25})`}
							opacity={factoryPower}
						>
							<circle r="51" fill={palette.green} stroke={palette.background} strokeWidth="9" />
							{Array.from({length: 8}).map((_, index) => (
								<rect
									key={index}
									x="-10"
									y="-67"
									width="20"
									height="29"
									fill={palette.green}
									transform={`rotate(${index * 45})`}
								/>
							))}
							<circle r="16" fill={palette.background} stroke={palette.yellow} strokeWidth="8" />
						</g>

						{/* Payment track */}
						<path
							d="M-290 95 L290 95"
							stroke={palette.muted}
							strokeWidth="42"
							strokeLinecap="square"
						/>
						<path
							d="M-290 95 L290 95"
							stroke={palette.green}
							strokeWidth="10"
							strokeDasharray="56 36"
							strokeDashoffset={-conveyorOffset}
							filter="url(#blueGlow)"
						/>
						{[-220, -65, 95, 245].map((x, index) => (
							<g
								key={x}
								transform={`translate(${x + ((frame * 5 * factoryPower) % 70)} 95)`}
								opacity={factoryPower}
							>
								<rect
									x="-28"
									y="-20"
									width="56"
									height="40"
									rx="6"
									fill={index % 2 === 0 ? palette.yellow : palette.blue}
								/>
								<path
									d="M-13 0 L-3 10 L16 -11"
									fill="none"
									stroke={palette.background}
									strokeWidth="7"
								/>
							</g>
						))}
					</g>

					{/* Launch rail into camera */}
					<g opacity={interpolate(frame, [90, 98], [0, 1], clamp)}>
						<path
							d="M355 1515 L110 1700 M545 1515 L790 1700"
							stroke={palette.yellow}
							strokeWidth={interpolate(railLaunch, [0, 1], [8, 35], clamp)}
							filter="url(#yellowGlow)"
						/>
						<path
							d="M390 1515 L280 1700 M510 1515 L620 1700"
							stroke={palette.blue}
							strokeWidth={interpolate(railLaunch, [0, 1], [6, 24], clamp)}
						/>
						{Array.from({length: 7}).map((_, index) => {
							const y = 1530 + index * 30 + ((launchProgress * 260) % 30);
							const width = 60 + index * 45;
							return (
								<line
									key={index}
									x1={450 - width}
									x2={450 + width}
									y1={y}
									y2={y}
									stroke={palette.muted}
									strokeWidth="13"
								/>
							);
						})}
						<path
							d="M450 1510 L450 1695"
							stroke={palette.green}
							strokeWidth="16"
							strokeDasharray="35 28"
							strokeDashoffset={-frame * 18}
							filter="url(#blueGlow)"
						/>
					</g>
				</svg>

				{/* Hinged architectural typography */}
				<div
					style={{
						position: 'absolute',
						left: 8,
						top: 1040,
						transformOrigin: 'left center',
						transform: `perspective(700px) rotateY(${interpolate(
							wordsDeploy,
							[0, 1],
							[-92, 0],
							clamp,
						)}deg) translateX(${interpolate(
							wordsDeploy,
							[0, 1],
							[-140, 0],
							clamp,
						)}px)`,
						color: palette.yellow,
						fontSize: 122,
						fontWeight: 1000,
						lineHeight: 0.72,
						letterSpacing: -8,
						fontStretch: 'condensed',
						textShadow: `10px 10px 0 ${palette.muted}`,
						zIndex: 8,
					}}
				>
					STA
					<br />
					RT
				</div>

				<div
					style={{
						position: 'absolute',
						right: 0,
						top: 1110,
						width: 270,
						transformOrigin: 'right center',
						transform: `translateX(${interpolate(
							wordsDeploy,
							[0, 1],
							[300, 0],
							clamp,
						)}px) scaleX(${interpolate(
							wordsDeploy,
							[0, 1],
							[0.1, 1],
							clamp,
						)})`,
						color: palette.background,
						backgroundColor: palette.blue,
						borderLeft: `18px solid ${palette.yellow}`,
						padding: '17px 14px 15px 20px',
						fontSize: 49,
						fontWeight: 1000,
						lineHeight: 0.87,
						letterSpacing: -2,
						textAlign: 'left',
						zIndex: 8,
					}}
				>
					NUMBER
					<br />
					ONE
				</div>

				<div
					style={{
						position: 'absolute',
						bottom: 32,
						width: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'space-between',
						zIndex: 30,
						opacity: interpolate(frame, [88, 99], [0, 1], clamp),
						transform: `translateY(${interpolate(
							railLaunch,
							[0, 1],
							[90, 0],
							clamp,
						)}px)`,
					}}
				>
					<div>
						<div
							style={{
								color: palette.green,
								fontSize: 20,
								fontWeight: 900,
								letterSpacing: 6,
								marginBottom: 10,
							}}
						>
							FACTORY ONLINE
						</div>
						<div
							style={{
								color: palette.yellow,
								fontSize: 75,
								fontWeight: 1000,
								lineHeight: 0.86,
								letterSpacing: -4,
							}}
						>
							TURN THE
							<br />
							FIRST KEY.
						</div>
					</div>

					<div
						style={{
							width: 82,
							height: 82,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: `8px solid ${palette.yellow}`,
							color: palette.yellow,
							fontSize: 48,
							fontWeight: 1000,
							transform: `rotate(${frame * 1.3}deg) scale(${pulse})`,
							boxShadow: `0 0 ${35 * alarmPulse}px ${palette.yellow}`,
						}}
					>
						1
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}