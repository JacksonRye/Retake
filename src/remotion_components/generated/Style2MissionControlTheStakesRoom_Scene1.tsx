import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const palette = {
	background: '#0A0E1A',
	primary: '#FFB300',
	secondary: '#22D3EE',
	alert: '#FF3B30',
	muted: '#1F2937',
};

const clamp = {
	extrapolateLeft: 'clamp' as const,
	extrapolateRight: 'clamp' as const,
};

const appTargets = [
	{label: 'APP_02', x: 218, y: 242, delay: 23},
	{label: 'APP_03', x: 608, y: 214, delay: 28},
	{label: 'APP_04', x: 666, y: 456, delay: 33},
	{label: 'APP_05', x: 188, y: 488, delay: 38},
];

export default function Style2MissionControlTheStakesRoom_Scene1() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const bootSpring = spring({
		frame,
		fps,
		config: {damping: 13, stiffness: 240, mass: 0.65},
	});

	const chamberSpring = spring({
		frame: frame - 5,
		fps,
		config: {damping: 15, stiffness: 180, mass: 0.8},
	});

	const reactorSpring = spring({
		frame: frame - 15,
		fps,
		config: {damping: 11, stiffness: 250, mass: 0.55},
	});

	const counterSpring = spring({
		frame: frame - 14,
		fps,
		config: {damping: 16, stiffness: 120, mass: 0.9},
	});

	const impactSpring = spring({
		frame: frame - 93,
		fps,
		config: {damping: 9, stiffness: 290, mass: 0.55},
	});

	const orbitDraw = interpolate(frame, [12, 57], [1, 0], clamp);
	const gaugeProgress = interpolate(frame, [18, 88], [0, 1], {
		...clamp,
		easing: (value) => 1 - Math.pow(1 - value, 4),
	});

	const counterProgress = interpolate(frame, [12, 87], [0, 1], {
		...clamp,
		easing: (value) => Math.pow(value, 2.55),
	});

	const countRaw = Math.min(
		500000000,
		Math.round(counterProgress * 500000000),
	);
	const countFormatted = countRaw.toLocaleString('en-US');

	const typedText = 'CLASSIFIED REVENUE ARRAY // SIGNAL ACQUISITION';
	const typedCharacters = Math.floor(
		interpolate(frame, [5, 47], [0, typedText.length], clamp),
	);
	const terminalText = typedText.slice(0, typedCharacters);

	const heartbeat =
		Math.max(0, 1 - Math.abs(frame - 92) / 4) +
		Math.max(0, 1 - Math.abs(frame - 99) / 2.5) * 0.7;
	const continuousPulse = 1 + Math.sin(frame * 0.28) * 0.025;
	const reactorPulse = 1 + heartbeat * 0.18 + Math.sin(frame * 0.3) * 0.025;

	const threatProgress = interpolate(frame, [72, 101], [0, 1], clamp);
	const threatSegments = Math.floor(threatProgress * 8);

	const alertFlicker =
		frame < 8
			? frame % 2 === 0
				? 0.16
				: 1
			: frame > 78
				? frame % 7 === 0
					? 0.45
					: 1
				: 1;

	const signalGlitch =
		frame < 15
			? Math.sin(frame * 8.7) * (15 - frame) * 1.7
			: frame > 104 && frame < 117
				? Math.sin(frame * 4.6) * 7
				: 0;

	const verticalJolt =
		frame < 10
			? Math.sin(frame * 6.1) * (10 - frame) * 0.8
			: heartbeat * -5;

	const impactOpacity = interpolate(frame, [91, 96, 124, 130], [0, 1, 1, 0], clamp);
	const impactScale = interpolate(impactSpring, [0, 1], [2.8, 1], clamp);
	const impactBlur = interpolate(impactSpring, [0, 1], [22, 0], clamp);

	const contentOpacity =
		frame < durationInFrames - 2
			? interpolate(frame, [0, 3], [0, 1], clamp)
			: 0;

	const sweepAngle = interpolate(frame, [15, 90], [-128, 128], clamp);
	const cursorVisible = Math.floor(frame / 5) % 2 === 0;

	const gridShift = (frame * 7) % 72;
	const scanlineShift = (frame * 13) % 8;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette.background,
				overflow: 'hidden',
				fontFamily:
					'"Poppins", "Arial Narrow", "SFMono-Regular", Consolas, monospace',
			}}
		>
			{/* CRT scanline field */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: 0.32,
					backgroundImage: `repeating-linear-gradient(
						0deg,
						${palette.muted} 0px,
						${palette.muted} 2px,
						${palette.background} 2px,
						${palette.background} 7px
					)`,
					backgroundPosition: `0 ${scanlineShift}px`,
					mixBlendMode: 'screen',
					pointerEvents: 'none',
				}}
			/>

			{/* Moving mission-control coordinate grid */}
			<svg
				viewBox="0 0 1080 1920"
				preserveAspectRatio="none"
				style={{
					position: 'absolute',
					inset: 0,
					width: '100%',
					height: '100%',
					opacity: 0.35 * chamberSpring,
				}}
			>
				<defs>
					<pattern
						id="mission-grid"
						width="72"
						height="72"
						patternUnits="userSpaceOnUse"
						x={gridShift}
						y={gridShift}
					>
						<path
							d="M72 0H0V72"
							fill="none"
							stroke={palette.muted}
							strokeWidth="2"
						/>
						<circle
							cx="0"
							cy="0"
							r="2.5"
							fill={palette.secondary}
							opacity="0.65"
						/>
					</pattern>
					<linearGradient id="amber-sweep" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0" stopColor={palette.primary} stopOpacity="0" />
						<stop offset="0.5" stopColor={palette.primary} stopOpacity="0.8" />
						<stop offset="1" stopColor={palette.primary} stopOpacity="0" />
					</linearGradient>
				</defs>
				<rect width="1080" height="1920" fill="url(#mission-grid)" />
				<path
					d={`M0 ${260 + ((frame * 19) % 1450)} H1080`}
					stroke="url(#amber-sweep)"
					strokeWidth="5"
					opacity="0.4"
				/>
			</svg>

			{/* Violent amber boot shutters */}
			{[0, 1, 2, 3].map((bar) => {
				const visibility = interpolate(frame, [bar * 2, 7 + bar * 2], [1, 0], clamp);
				return (
					<div
						key={bar}
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 260 + bar * 350 + Math.sin(frame * 3 + bar) * 30,
							height: 12 + bar * 3,
							backgroundColor: palette.primary,
							opacity: visibility * (bar % 2 === frame % 2 ? 0.9 : 0.22),
							boxShadow: `0 0 44px ${palette.primary}`,
						}}
					/>
				);
			})}

			<div
				style={{
					width: '90%',
					maxWidth: 900,
					height: '92%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					position: 'relative',
					boxSizing: 'border-box',
					opacity: contentOpacity * alertFlicker,
					transform: `translate3d(${signalGlitch}px, ${verticalJolt}px, 0) scale(${interpolate(
						bootSpring,
						[0, 1],
						[0.97, 1],
						clamp,
					)})`,
				}}
			>
				{/* Header terminal */}
				<div
					style={{
						width: '100%',
						height: 178,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						borderTop: `3px solid ${palette.primary}`,
						borderBottom: `2px solid ${palette.muted}`,
						marginTop: 42,
						padding: '18px 0',
						boxSizing: 'border-box',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							color: palette.primary,
							fontSize: 22,
							fontWeight: 800,
							letterSpacing: 4,
						}}
					>
						<span>MISSION CONTROL // STAKES ROOM</span>
						<span style={{color: palette.secondary}}>CHRON_02</span>
					</div>

					<div
						style={{
							marginTop: 24,
							display: 'flex',
							alignItems: 'center',
							gap: 15,
							color: palette.secondary,
							fontSize: 19,
							fontFamily: '"SFMono-Regular", Consolas, monospace',
							letterSpacing: 2.4,
							whiteSpace: 'nowrap',
							overflow: 'hidden',
						}}
					>
						<span style={{color: palette.primary}}>&gt;</span>
						<span>{terminalText}</span>
						<span
							style={{
								width: 12,
								height: 25,
								backgroundColor: palette.primary,
								opacity: cursorVisible ? 1 : 0,
							}}
						/>
					</div>
				</div>

				{/* Threat lamps */}
				<div
					style={{
						width: '100%',
						height: 85,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderBottom: `2px solid ${palette.muted}`,
					}}
				>
					<div
						style={{
							color: palette.alert,
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 5,
						}}
					>
						THREAT LEVEL
					</div>
					<div style={{display: 'flex', gap: 12}}>
						{Array.from({length: 8}).map((_, index) => {
							const active = index < threatSegments;
							return (
								<div
									key={index}
									style={{
										width: 64,
										height: 18,
										transform: `skewX(-18deg) scaleY(${
											active ? 1 + heartbeat * 0.35 : 1
										})`,
										backgroundColor: active ? palette.alert : palette.muted,
										boxShadow: active
											? `0 0 ${16 + heartbeat * 24}px ${palette.alert}`
											: 'none',
										opacity: active ? 1 : 0.72,
									}}
								/>
							);
						})}
					</div>
				</div>

				{/* Orbital reactor chamber */}
				<div
					style={{
						width: '100%',
						height: 880,
						position: 'relative',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<svg
						viewBox="0 0 800 760"
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							overflow: 'visible',
						}}
					>
						{/* Target crosshairs */}
						<path
							d="M400 24V102 M400 658V736 M44 380H130 M670 380H756"
							stroke={palette.primary}
							strokeWidth="4"
							strokeDasharray="12 13"
							opacity="0.7"
						/>
						<circle
							cx="400"
							cy="380"
							r={306 * continuousPulse}
							fill="none"
							stroke={palette.muted}
							strokeWidth="3"
							strokeDasharray="3 14"
						/>

						{/* Five emerging cyan orbital tracks */}
						{[
							{rx: 304, ry: 135, rotation: -26, delay: 0},
							{rx: 280, ry: 178, rotation: 22, delay: 4},
							{rx: 244, ry: 235, rotation: -52, delay: 8},
							{rx: 205, ry: 282, rotation: 58, delay: 12},
							{rx: 166, ry: 310, rotation: 8, delay: 16},
						].map((orbit, index) => {
							const localDraw = interpolate(
								frame,
								[12 + orbit.delay, 45 + orbit.delay],
								[1, 0],
								clamp,
							);
							return (
								<g
									key={index}
									transform={`rotate(${orbit.rotation} 400 380)`}
									opacity={interpolate(
										frame,
										[10 + orbit.delay, 19 + orbit.delay],
										[0, 1],
										clamp,
									)}
								>
									<ellipse
										cx="400"
										cy="380"
										rx={orbit.rx}
										ry={orbit.ry}
										fill="none"
										stroke={palette.secondary}
										strokeWidth={index === 0 ? 5 : 3}
										pathLength={1}
										strokeDasharray={index === 0 ? '0.12 0.025' : '0.045 0.025'}
										strokeDashoffset={localDraw + frame * (index % 2 ? 0.002 : -0.002)}
										opacity={index === 0 ? 0.95 : 0.64}
										style={{
											filter: `drop-shadow(0 0 ${
												7 + heartbeat * 18
											}px ${palette.secondary})`,
										}}
									/>
								</g>
							);
						})}

						{/* Synchronized heartbeat rings */}
						{[0, 1, 2].map((ring) => (
							<circle
								key={ring}
								cx="400"
								cy="380"
								r={112 + ring * 38 + heartbeat * (48 + ring * 18)}
								fill="none"
								stroke={ring === 2 ? palette.primary : palette.secondary}
								strokeWidth={6 - ring}
								opacity={Math.max(0, heartbeat * (0.85 - ring * 0.16))}
							/>
						))}

						{/* Gauge sweep */}
						<path
							d="M144 556 A304 304 0 0 1 656 556"
							fill="none"
							stroke={palette.muted}
							strokeWidth="18"
							strokeDasharray="7 12"
						/>
						<path
							d="M144 556 A304 304 0 0 1 656 556"
							fill="none"
							stroke={gaugeProgress > 0.83 ? palette.alert : palette.primary}
							strokeWidth="18"
							pathLength={1}
							strokeDasharray={`${gaugeProgress} 1`}
							style={{
								filter: `drop-shadow(0 0 12px ${
									gaugeProgress > 0.83 ? palette.alert : palette.primary
								})`,
							}}
						/>

						<g transform={`rotate(${sweepAngle} 400 380)`}>
							<path
								d="M400 380 L400 122"
								stroke={palette.primary}
								strokeWidth="7"
								strokeLinecap="round"
								opacity="0.88"
								style={{
									filter: `drop-shadow(0 0 13px ${palette.primary})`,
								}}
							/>
							<circle cx="400" cy="120" r="10" fill={palette.alert} />
						</g>

						{/* Four unresolved app signals */}
						{appTargets.map((target, index) => {
							const targetSpring = spring({
								frame: frame - target.delay,
								fps,
								config: {damping: 9, stiffness: 240, mass: 0.5},
							});
							const targetPulse =
								1 + Math.sin(frame * 0.28 + index * 1.3) * 0.12 + heartbeat * 0.2;

							return (
								<g
									key={target.label}
									transform={`translate(${target.x} ${target.y}) scale(${
										targetSpring * targetPulse
									})`}
								>
									<circle
										r="34"
										fill={palette.background}
										stroke={palette.primary}
										strokeWidth="5"
										strokeDasharray="12 8"
										transform={`rotate(${frame * (index % 2 ? -3 : 3)})`}
										style={{
											filter: `drop-shadow(0 0 12px ${palette.primary})`,
										}}
									/>
									<circle r="9" fill={palette.primary} />
									<path
										d="M-48 0H-22 M22 0H48 M0-48V-22 M0 22V48"
										stroke={palette.primary}
										strokeWidth="4"
									/>
									<rect
										x={index % 2 ? -112 : 46}
										y="-17"
										width="106"
										height="34"
										fill={palette.background}
										stroke={palette.muted}
										strokeWidth="2"
									/>
									<text
										x={index % 2 ? -59 : 99}
										y="7"
										textAnchor="middle"
										fill={palette.primary}
										fontSize="18"
										fontWeight="900"
										letterSpacing="2"
									>
										{target.label}
									</text>
								</g>
							);
						})}

						{/* Locking brackets around reactor */}
						<g
							transform={`translate(400 380) scale(${reactorSpring * reactorPulse})`}
						>
							<path
								d="M-104-62V-104H-62 M62-104H104V-62 M104 62V104H62 M-62 104H-104V62"
								fill="none"
								stroke={palette.secondary}
								strokeWidth="7"
								strokeLinecap="square"
								style={{
									filter: `drop-shadow(0 0 14px ${palette.secondary})`,
								}}
							/>

							{/* Smartphone-shaped reactor core */}
							<rect
								x="-58"
								y="-91"
								width="116"
								height="182"
								rx="22"
								fill={palette.background}
								stroke={palette.secondary}
								strokeWidth="7"
								style={{
									filter: `drop-shadow(0 0 ${24 + heartbeat * 24}px ${
										palette.secondary
									})`,
								}}
							/>
							<rect
								x="-43"
								y="-66"
								width="86"
								height="126"
								rx="9"
								fill={palette.muted}
								stroke={palette.primary}
								strokeWidth="3"
							/>
							<circle
								cx="0"
								cy="-2"
								r={28 + heartbeat * 7}
								fill={palette.primary}
								opacity="0.94"
								style={{
									filter: `drop-shadow(0 0 20px ${palette.primary})`,
								}}
							/>
							<path
								d="M-17 0L-4 13L21-19"
								fill="none"
								stroke={palette.background}
								strokeWidth="8"
								strokeLinecap="square"
							/>
							<rect
								x="-20"
								y="-80"
								width="40"
								height="5"
								rx="2"
								fill={palette.secondary}
							/>
							<circle cx="0" cy="75" r="7" fill={palette.secondary} />
						</g>

						<text
							x="400"
							y="702"
							textAnchor="middle"
							fill={palette.secondary}
							fontSize="18"
							fontWeight="900"
							letterSpacing="5"
						>
							APP_01 // REACTOR LOCKED
						</text>
					</svg>
				</div>

				{/* Mechanical condensed-numeric counter */}
				<div
					style={{
						width: '100%',
						height: 310,
						position: 'relative',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						borderTop: `3px solid ${palette.muted}`,
						borderBottom: `3px solid ${palette.muted}`,
						overflow: 'hidden',
						transform: `scale(${interpolate(counterSpring, [0, 1], [0.84, 1], clamp)})`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 18,
							left: 24,
							color: palette.primary,
							fontFamily: '"SFMono-Regular", Consolas, monospace',
							fontSize: 16,
							fontWeight: 800,
							letterSpacing: 4,
						}}
					>
						POTENTIAL OUTPUT / USD
					</div>

					<div
						style={{
							color:
								countRaw >= 475000000 ? palette.alert : palette.primary,
							fontFamily:
								'"Arial Narrow", "Roboto Condensed", "DIN Condensed", monospace',
							fontSize: 118,
							fontWeight: 950,
							lineHeight: 0.9,
							letterSpacing: -6,
							whiteSpace: 'nowrap',
							fontVariantNumeric: 'tabular-nums',
							transform: `scaleX(0.78) translateY(${Math.sin(frame * 2.4) * Math.max(
								0,
								1 - counterProgress,
							) * 8}px)`,
							textShadow: `0 0 28px ${
								countRaw >= 475000000 ? palette.alert : palette.primary
							}`,
						}}
					>
						{countFormatted}
					</div>

					<div
						style={{
							marginTop: 24,
							display: 'flex',
							alignItems: 'center',
							gap: 18,
							color: palette.secondary,
							fontSize: 19,
							fontWeight: 900,
							letterSpacing: 5,
						}}
					>
						<span
							style={{
								width: 13,
								height: 13,
								borderRadius: '50%',
								backgroundColor:
									countRaw === 500000000 ? palette.alert : palette.secondary,
								boxShadow: `0 0 18px ${
									countRaw === 500000000 ? palette.alert : palette.secondary
								}`,
							}}
						/>
						{countRaw === 500000000
							? 'MAXIMUM SIGNAL CONFIRMED'
							: 'MECHANICAL ACCELERATION'}
					</div>
				</div>

				{/* Footer telemetry */}
				<div
					style={{
						width: '100%',
						flex: 1,
						minHeight: 130,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						color: palette.secondary,
						fontFamily: '"SFMono-Regular", Consolas, monospace',
						fontSize: 17,
						fontWeight: 800,
						letterSpacing: 2,
					}}
				>
					<span>ORBITALS: 05</span>
					<span style={{color: palette.primary}}>LOCKED: 01</span>
					<span style={{color: palette.alert}}>UNRESOLVED: 04</span>
				</div>
			</div>

			{/* Emergency broadcast impact slam */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					opacity: impactOpacity,
					pointerEvents: 'none',
				}}
			>
				<div
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						height: 430,
						backgroundColor: palette.alert,
						transform: `scaleY(${interpolate(
							impactSpring,
							[0, 1],
							[0.04, 1],
							clamp,
						)}) skewY(-2deg)`,
						boxShadow: `0 0 80px ${palette.alert}`,
					}}
				/>

				<div
					style={{
						width: '100%',
						textAlign: 'center',
						position: 'relative',
						transform: `scale(${impactScale}) translateX(${
							Math.sin(frame * 5) * Math.max(0, 112 - frame)
						}px)`,
						filter: `blur(${impactBlur}px)`,
					}}
				>
					<div
						style={{
							color: palette.background,
							fontFamily: '"Poppins", "Arial Black", sans-serif',
							fontSize: 41,
							fontWeight: 950,
							letterSpacing: 13,
							lineHeight: 1,
						}}
					>
						EMERGENCY BROADCAST
					</div>
					<div
						style={{
							marginTop: 30,
							color: palette.background,
							fontFamily: '"Poppins", "Arial Black", sans-serif',
							fontSize: 132,
							fontWeight: 950,
							letterSpacing: -8,
							lineHeight: 0.85,
							whiteSpace: 'nowrap',
							transform: 'scaleX(0.76)',
						}}
					>
						500,000,000
					</div>
					<div
						style={{
							marginTop: 38,
							color: palette.background,
							fontFamily: '"SFMono-Regular", Consolas, monospace',
							fontSize: 21,
							fontWeight: 950,
							letterSpacing: 7,
						}}
					>
						ONE CORE LOCKED // FOUR SIGNALS UNKNOWN
					</div>
				</div>
			</div>

			{/* CRT distortion tears */}
			{frame > 101 &&
				[0, 1, 2, 3, 4].map((tear) => (
					<div
						key={tear}
						style={{
							position: 'absolute',
							left: tear % 2 === 0 ? -30 : 80,
							right: tear % 2 === 0 ? 90 : -30,
							top: 290 + tear * 270 + Math.sin(frame * 2 + tear) * 70,
							height: 5 + (tear % 3) * 4,
							backgroundColor:
								tear % 2 === 0 ? palette.secondary : palette.primary,
							opacity: Math.max(0, Math.sin(frame * 1.7 + tear)) * 0.58,
							transform: `translateX(${Math.sin(frame * 4 + tear) * 70}px)`,
							boxShadow: `0 0 15px ${
								tear % 2 === 0 ? palette.secondary : palette.primary
							}`,
						}}
					/>
				))}

			{/* Edge framing */}
			<div
				style={{
					position: 'absolute',
					inset: 22,
					border: `2px solid ${palette.muted}`,
					boxShadow: `inset 0 0 70px ${palette.background}`,
					pointerEvents: 'none',
				}}
			/>
		</AbsoluteFill>
	);
}