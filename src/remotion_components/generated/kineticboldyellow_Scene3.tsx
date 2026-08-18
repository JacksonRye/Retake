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

const tokenData = Array.from({length: 200}, (_, index) => ({
	index,
	startX: 82 + ((index * 83) % 790),
	startY: -130 - ((index * 47) % 650),
	delay: (index % 25) * 0.75 + Math.floor(index / 25) * 1.9,
	size: 0.62 + ((index * 17) % 10) / 24,
	rotation: ((index * 41) % 90) - 45,
}));

const stadiumSeats = Array.from({length: 96}, (_, index) => ({
	x: 508 + (index % 12) * 31,
	y: 470 + Math.floor(index / 12) * 34,
	delay: (index % 12) * 0.35,
}));

const timelineSegments = Array.from({length: 12}, (_, index) => ({
	x: 88 + index * 72,
	index,
}));

const particleRays = Array.from({length: 24}, (_, index) => ({
	angle: (index / 24) * Math.PI * 2,
	length: 58 + ((index * 29) % 70),
}));

export default function kineticboldyellow_Scene3() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const sceneEntrance = spring({
		frame,
		fps,
		config: {damping: 15, stiffness: 180, mass: 0.85},
	});

	const titleSpring = spring({
		frame: frame - 4,
		fps,
		config: {damping: 10, stiffness: 230, mass: 0.62},
	});

	const stadiumSpring = spring({
		frame: frame - 9,
		fps,
		config: {damping: 13, stiffness: 180, mass: 0.8},
	});

	const reactorSpring = spring({
		frame: frame - 18,
		fps,
		config: {damping: 9, stiffness: 260, mass: 0.55},
	});

	const coreSpring = spring({
		frame: frame - 46,
		fps,
		config: {damping: 7, stiffness: 300, mass: 0.5},
	});

	const laserProgress = interpolate(frame, [62, 108], [0, 1], clamp);
	const tokenCount = Math.round(interpolate(frame, [10, 63], [0, 200], clamp));
	const corePulse = 1 + Math.sin(frame * 0.42) * 0.08;
	const energyRotation = frame * 2.8;

	const cameraDive = interpolate(frame, [106, 128], [0, 1], clamp);
	const cameraScale = interpolate(cameraDive, [0, 1], [1, 5.8], clamp);
	const cameraY = interpolate(cameraDive, [0, 1], [0, -520], clamp);
	const cameraBlur = interpolate(cameraDive, [0, 0.72, 1], [0, 0, 2], clamp);

	const apertureProgress = spring({
		frame: frame - 116,
		fps,
		config: {damping: 12, stiffness: 170, mass: 0.7},
	});
	const apertureRadius = interpolate(apertureProgress, [0, 1], [20, 1000], clamp);
	const apertureOpacity = interpolate(frame, [114, 119, 132, durationInFrames], [0, 1, 1, 0], clamp);

	const globalOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 4, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const punchPoints = Array.from({length: 18}, (_, index) => {
		const angle = (index / 18) * Math.PI * 2 - Math.PI / 2;
		const jag = index % 2 === 0 ? 1 : 0.78;
		const x = 540 + Math.cos(angle) * apertureRadius * jag;
		const y = 1425 + Math.sin(angle) * apertureRadius * jag;
		return `${x},${y}`;
	}).join(' ');

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette[0],
				overflow: 'hidden',
				opacity: globalOpacity,
				fontFamily:
					'Inter, "SF Pro Display", "Helvetica Neue", Arial, sans-serif',
			}}
		>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					backgroundColor: palette[0],
					opacity: sceneEntrance,
				}}
			/>

			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					width: '90%',
					maxWidth: 900,
					height: '94%',
					transform: `translate(-50%, -50%) translateY(${cameraY}px) scale(${cameraScale})`,
					transformOrigin: '50% 75%',
					filter: `blur(${cameraBlur}px)`,
					display: 'flex',
					flexDirection: 'column',
					overflow: 'visible',
				}}
			>
				<div
					style={{
						position: 'absolute',
						top: 26,
						left: 0,
						right: 0,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						transform: `translateY(${interpolate(
							titleSpring,
							[0, 1],
							[-70, 0],
							clamp,
						)}px)`,
						opacity: titleSpring,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 13,
							color: palette[3],
							fontSize: 19,
							fontWeight: 900,
							letterSpacing: 5,
							textTransform: 'uppercase',
						}}
					>
						<div
							style={{
								width: 13,
								height: 13,
								borderRadius: 999,
								backgroundColor: palette[3],
								transform: `scale(${1 + Math.sin(frame * 0.35) * 0.25})`,
								boxShadow: `0 0 26px ${palette[3]}`,
							}}
						/>
						Audience Reactor
					</div>

					<div
						style={{
							color: palette[1],
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 3,
						}}
					>
						00:00 → END
					</div>
				</div>

				<div
					style={{
						position: 'absolute',
						top: 103,
						left: 0,
						width: '100%',
						textAlign: 'center',
						transform: `scale(${titleSpring})`,
					}}
				>
					<div
						style={{
							color: palette[3],
							fontSize: 76,
							lineHeight: 0.86,
							fontWeight: 950,
							letterSpacing: -5,
							textTransform: 'uppercase',
						}}
					>
						SMALL CROWD.
					</div>
					<div
						style={{
							color: palette[2],
							fontSize: 76,
							lineHeight: 0.98,
							fontWeight: 950,
							letterSpacing: -5,
							textTransform: 'uppercase',
						}}
					>
						FULL FORCE.
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
						<radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
							<stop
								offset="0%"
								style={{stopColor: palette[3], stopOpacity: 1}}
							/>
							<stop
								offset="48%"
								style={{stopColor: palette[3], stopOpacity: 0.75}}
							/>
							<stop
								offset="100%"
								style={{stopColor: palette[3], stopOpacity: 0}}
							/>
						</radialGradient>

						<linearGradient id="timelineEnergy" x1="0" x2="1">
							<stop
								offset="0%"
								style={{stopColor: palette[1], stopOpacity: 1}}
							/>
							<stop
								offset="55%"
								style={{stopColor: palette[2], stopOpacity: 1}}
							/>
							<stop
								offset="100%"
								style={{stopColor: palette[3], stopOpacity: 1}}
							/>
						</linearGradient>

						<filter id="amberGlow" x="-100%" y="-100%" width="300%" height="300%">
							<feGaussianBlur stdDeviation="13" result="blur" />
							<feMerge>
								<feMergeNode in="blur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>

						<clipPath id="reactorClip">
							<path d="M230 790 L445 790 L414 1015 Q338 1070 260 1015 Z" />
						</clipPath>
					</defs>

					{/* Enormous, irrelevant stadium */}
					<g
						style={{
							transform: `translateY(${interpolate(
								stadiumSpring,
								[0, 1],
								[-90, 0],
								clamp,
							)}px) scale(${interpolate(
								stadiumSpring,
								[0, 1],
								[0.82, 1],
								clamp,
							)})`,
							transformOrigin: '690px 590px',
							opacity: interpolate(stadiumSpring, [0, 1], [0, 0.72], clamp),
						}}
					>
						<path
							d="M480 430 Q690 330 875 430 L842 775 Q685 856 503 770 Z"
							style={{
								fill: palette[0],
								stroke: palette[4],
								strokeWidth: 14,
							}}
						/>
						<path
							d="M512 478 Q690 397 842 478 L817 724 Q688 785 532 719 Z"
							style={{
								fill: palette[0],
								stroke: palette[4],
								strokeWidth: 6,
								strokeDasharray: '18 12',
							}}
						/>

						{stadiumSeats.map((seat) => {
							const seatOn = spring({
								frame: frame - 12 - seat.delay,
								fps,
								config: {damping: 14, stiffness: 210, mass: 0.5},
							});
							return (
								<rect
									key={`${seat.x}-${seat.y}`}
									x={seat.x}
									y={seat.y}
									width="19"
									height="12"
									rx="3"
									style={{
										fill: palette[4],
										opacity: 0.28 * seatOn,
									}}
								/>
							);
						})}

						<text
							x="679"
							y="634"
							textAnchor="middle"
							style={{
								fill: palette[4],
								fontSize: 126,
								fontWeight: 950,
								letterSpacing: -10,
								opacity: 0.72,
							}}
						>
							1,000
						</text>

						<path
							d="M534 650 L562 625 M595 680 L624 645 M697 668 L730 632 M768 687 L804 647"
							style={{
								fill: 'none',
								stroke: palette[0],
								strokeWidth: 12,
								opacity: 0.9,
							}}
						/>

						<text
							x="680"
							y="700"
							textAnchor="middle"
							style={{
								fill: palette[4],
								fontSize: 21,
								fontWeight: 900,
								letterSpacing: 6,
							}}
						>
							EMPTY CAPACITY
						</text>
					</g>

					{/* 200 human tokens pouring toward the reactor */}
					{tokenData.map((token) => {
						const localFrame = frame - 7 - token.delay;
						const fall = interpolate(localFrame, [0, 52], [0, 1], clamp);
						const fallEase = fall * fall;
						const targetX = 337 + ((token.index % 9) - 4) * 9;
						const x =
							token.startX +
							(targetX - token.startX) *
								interpolate(fall, [0.28, 1], [0, 1], clamp);
						const y = token.startY + (930 - token.startY) * fallEase;
						const tokenOpacity = interpolate(
							fall,
							[0, 0.05, 0.87, 1],
							[0, 1, 1, 0],
							clamp,
						);
						const spin = token.rotation + fall * 210;

						return (
							<g
								key={token.index}
								transform={`translate(${x} ${y}) rotate(${spin}) scale(${token.size})`}
								style={{opacity: tokenOpacity}}
							>
								<circle
									cx="0"
									cy="-10"
									r="5.5"
									style={{
										fill: palette[3],
										filter: 'url(#amberGlow)',
									}}
								/>
								<path
									d="M0 -3 L0 14 M-9 3 L0 7 L9 1 M0 14 L-7 25 M0 14 L8 25"
									style={{
										fill: 'none',
										stroke: palette[3],
										strokeWidth: 4.5,
										strokeLinecap: 'round',
									}}
								/>
							</g>
						);
					})}

					{/* Compact creator reactor */}
					<g
						style={{
							transform: `scale(${reactorSpring})`,
							transformOrigin: '338px 910px',
						}}
					>
						<path
							d="M207 765 L468 765 L435 1028 Q339 1098 238 1028 Z"
							style={{
								fill: palette[0],
								stroke: palette[3],
								strokeWidth: 12,
								strokeLinejoin: 'round',
							}}
						/>
						<path
							d="M232 790 L444 790 L414 1008 Q338 1062 261 1008 Z"
							style={{
								fill: palette[4],
								opacity: 0.48,
							}}
						/>

						<path
							d="M199 762 L477 762 L441 819 L235 819 Z"
							style={{
								fill: palette[0],
								stroke: palette[1],
								strokeWidth: 9,
								strokeLinejoin: 'round',
							}}
						/>

						{Array.from({length: 8}, (_, index) => {
							const compression = interpolate(
								frame,
								[36 + index * 2, 63 + index * 2],
								[0, 1],
								clamp,
							);
							const y = 834 + index * 27;
							return (
								<line
									key={index}
									x1={255 + compression * 43}
									x2={421 - compression * 43}
									y1={y}
									y2={y}
									style={{
										stroke: index % 2 === 0 ? palette[3] : palette[2],
										strokeWidth: 7,
										strokeLinecap: 'round',
										opacity: 0.22 + compression * 0.7,
									}}
								/>
							);
						})}

						<circle
							cx="338"
							cy="956"
							r={92 * coreSpring * corePulse}
							style={{
								fill: 'url(#coreGlow)',
								opacity: coreSpring,
							}}
						/>
						<circle
							cx="338"
							cy="956"
							r={43 * coreSpring * corePulse}
							style={{
								fill: palette[3],
								stroke: palette[0],
								strokeWidth: 9,
								filter: 'url(#amberGlow)',
							}}
						/>

						<g transform={`rotate(${energyRotation} 338 956)`}>
							{particleRays.map((ray, index) => {
								const x1 = 338 + Math.cos(ray.angle) * 55;
								const y1 = 956 + Math.sin(ray.angle) * 55;
								const x2 =
									338 + Math.cos(ray.angle) * ray.length * coreSpring;
								const y2 =
									956 + Math.sin(ray.angle) * ray.length * coreSpring;
								return (
									<line
										key={index}
										x1={x1}
										y1={y1}
										x2={x2}
										y2={y2}
										style={{
											stroke: index % 3 === 0 ? palette[2] : palette[3],
											strokeWidth: index % 3 === 0 ? 5 : 3,
											strokeLinecap: 'round',
											opacity: 0.65 * coreSpring,
										}}
									/>
								);
							})}
						</g>

						<text
							x="338"
							y="1120"
							textAnchor="middle"
							style={{
								fill: palette[3],
								fontSize: 26,
								fontWeight: 950,
								letterSpacing: 5,
							}}
						>
							{tokenCount.toLocaleString()} ENGAGED
						</text>
					</g>

					{/* Energy conduit from reactor into timeline */}
					<path
						d="M338 1012 C338 1140 145 1130 145 1264"
						pathLength="1"
						style={{
							fill: 'none',
							stroke: palette[3],
							strokeWidth: 16,
							strokeLinecap: 'round',
							strokeDasharray: 1,
							strokeDashoffset: 1 - interpolate(frame, [57, 71], [0, 1], clamp),
							filter: 'url(#amberGlow)',
						}}
					/>
					<path
						d="M338 1012 C338 1140 145 1130 145 1264"
						pathLength="1"
						style={{
							fill: 'none',
							stroke: palette[2],
							strokeWidth: 4,
							strokeLinecap: 'round',
							strokeDasharray: 1,
							strokeDashoffset: 1 - interpolate(frame, [59, 72], [0, 1], clamp),
						}}
					/>

					{/* Full-length video timeline */}
					<g>
						<rect
							x="58"
							y="1248"
							width="810"
							height="194"
							rx="35"
							style={{
								fill: palette[0],
								stroke: palette[4],
								strokeWidth: 9,
							}}
						/>

						<text
							x="82"
							y="1223"
							style={{
								fill: palette[1],
								fontSize: 21,
								fontWeight: 900,
								letterSpacing: 5,
							}}
						>
							WATCH-PROGRESS // 100%
						</text>

						{timelineSegments.map((segment) => {
							const segmentProgress = interpolate(
								laserProgress,
								[segment.index / 12, (segment.index + 1) / 12],
								[0, 1],
								clamp,
							);
							const ignition = spring({
								frame: frame - 62 - segment.index * 3.5,
								fps,
								config: {damping: 8, stiffness: 280, mass: 0.45},
							});

							return (
								<g key={segment.index}>
									<rect
										x={segment.x}
										y="1290"
										width="60"
										height="110"
										rx="9"
										style={{
											fill:
												segment.index % 3 === 0
													? palette[1]
													: segment.index % 3 === 1
														? palette[2]
														: palette[3],
											opacity: 0.13 + segmentProgress * 0.87,
											stroke: palette[4],
											strokeWidth: 4,
											transform: `scaleY(${0.75 + ignition * 0.25})`,
											transformOrigin: `${segment.x + 30}px 1345px`,
										}}
									/>
									<path
										d={`M${segment.x + 12} 1378 L${segment.x + 12} ${
											1378 - 54 * ignition
										} L${segment.x + 47} ${1378 - 28 * ignition}`}
										style={{
											fill: 'none',
											stroke: palette[0],
											strokeWidth: 6,
											strokeLinecap: 'round',
											strokeLinejoin: 'round',
											opacity: segmentProgress,
										}}
									/>
								</g>
							);
						})}

						<rect
							x="88"
							y="1328"
							width={780 * laserProgress}
							height="18"
							rx="9"
							style={{
								fill: 'url(#timelineEnergy)',
								filter: 'url(#amberGlow)',
							}}
						/>

						{/* Black viewing needle racing from first to final frame */}
						<g
							transform={`translate(${88 + 780 * laserProgress} 0)`}
							style={{
								filter: 'url(#amberGlow)',
							}}
						>
							<path
								d="M0 1268 L0 1424"
								style={{
									stroke: palette[0],
									strokeWidth: 17,
									strokeLinecap: 'round',
								}}
							/>
							<path
								d="M0 1268 L0 1424"
								style={{
									stroke: palette[3],
									strokeWidth: 4,
									strokeLinecap: 'round',
								}}
							/>
							<path
								d="M-18 1262 L18 1262 L0 1286 Z"
								style={{
									fill: palette[0],
									stroke: palette[3],
									strokeWidth: 5,
								}}
							/>
						</g>
					</g>

					{/* Timeline tunnel perspective */}
					<g
						style={{
							opacity: interpolate(cameraDive, [0, 0.2, 1], [0, 0.45, 1], clamp),
						}}
					>
						{Array.from({length: 9}, (_, index) => {
							const tunnelPulse = (frame * 0.055 + index / 9) % 1;
							const width = 130 + tunnelPulse * 720;
							const height = 40 + tunnelPulse * 250;
							return (
								<rect
									key={index}
									x={540 - width / 2}
									y={1425 - height / 2}
									width={width}
									height={height}
									rx={18 + tunnelPulse * 35}
									style={{
										fill: 'none',
										stroke:
											index % 3 === 0
												? palette[1]
												: index % 3 === 1
													? palette[2]
													: palette[3],
										strokeWidth: 7,
										opacity: (1 - tunnelPulse) * cameraDive,
									}}
								/>
							);
						})}
					</g>

					<text
						x="450"
						y="1538"
						textAnchor="middle"
						style={{
							fill: palette[3],
							fontSize: 49,
							fontWeight: 950,
							letterSpacing: -1,
							opacity: interpolate(frame, [72, 84], [0, 1], clamp),
						}}
					>
						200 PEOPLE CAN MOVE THE NEEDLE.
					</text>

					<text
						x="450"
						y="1592"
						textAnchor="middle"
						style={{
							fill: palette[2],
							fontSize: 23,
							fontWeight: 900,
							letterSpacing: 7,
							opacity: interpolate(frame, [78, 90], [0, 1], clamp),
						}}
					>
						ATTENTION &gt; CAPACITY
					</text>
				</svg>
			</div>

			{/* Punched-paper aperture transition */}
			<svg
				viewBox="0 0 1080 1920"
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					pointerEvents: 'none',
					opacity: apertureOpacity,
				}}
			>
				<defs>
					<mask id="punchedApertureMask">
						<rect
							x="0"
							y="0"
							width="1080"
							height="1920"
							style={{fill: palette[3]}}
						/>
						<polygon points={punchPoints} style={{fill: palette[0]}} />
					</mask>
				</defs>

				<rect
					x="0"
					y="0"
					width="1080"
					height="1920"
					mask="url(#punchedApertureMask)"
					style={{fill: palette[0]}}
				/>

				<polygon
					points={punchPoints}
					style={{
						fill: 'none',
						stroke: palette[3],
						strokeWidth: 18,
						strokeLinejoin: 'bevel',
						filter: 'url(#amberGlow)',
					}}
				/>

				<polygon
					points={punchPoints}
					style={{
						fill: 'none',
						stroke: palette[1],
						strokeWidth: 5,
						strokeDasharray: '24 18',
						strokeDashoffset: -frame * 5,
						strokeLinejoin: 'bevel',
					}}
				/>
			</svg>
		</AbsoluteFill>
	);
}