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
	amber: '#FFB300',
	cyan: '#22D3EE',
	alert: '#FF3B30',
	muted: '#1F2937',
};

const clamp = {
	extrapolateLeft: 'clamp' as const,
	extrapolateRight: 'clamp' as const,
};

const TerminalLine: React.FC<{
	text: string;
	start: number;
	color: string;
	frame: number;
}> = ({text, start, color, frame}) => {
	const characters = Math.max(
		0,
		Math.min(text.length, Math.floor((frame - start) * 1.25)),
	);
	const typed = text.slice(0, characters);
	const visible = frame >= start;
	const cursorVisible = Math.floor(frame / 4) % 2 === 0;

	return (
		<div
			style={{
				height: 30,
				color,
				fontFamily: '"SFMono-Regular", "Roboto Mono", monospace',
				fontSize: 22,
				fontWeight: 800,
				letterSpacing: 1.4,
				opacity: visible ? 1 : 0,
				whiteSpace: 'nowrap',
			}}
		>
			<span style={{color: palette.muted}}>{'>'} </span>
			{typed}
			<span
				style={{
					display: 'inline-block',
					width: 10,
					height: 21,
					marginLeft: 4,
					verticalAlign: -3,
					backgroundColor: cursorVisible ? color : palette.background,
				}}
			/>
		</div>
	);
};

const SegmentedGauge: React.FC<{
	progress: number;
	active: boolean;
}> = ({progress, active}) => {
	const segments = 10;
	const filled = Math.round(progress * segments);

	return (
		<div
			style={{
				display: 'flex',
				gap: 3,
				width: 125,
				height: 8,
			}}
		>
			{Array.from({length: segments}).map((_, index) => (
				<div
					key={index}
					style={{
						flex: 1,
						backgroundColor:
							index < filled
								? progress >= 1
									? palette.cyan
									: palette.amber
								: palette.muted,
						opacity: index < filled || active ? 1 : 0.45,
						boxShadow:
							index < filled
								? `0 0 10px ${
										progress >= 1 ? palette.cyan : palette.amber
									}`
								: 'none',
					}}
				/>
			))}
		</div>
	);
};

export default function Style2MissionControlTheStakesRoom_Scene2() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const contentEntrance = spring({
		frame,
		fps,
		config: {damping: 15, stiffness: 190, mass: 0.8},
	});

	const laptopEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const phoneEntrance = spring({
		frame: frame - 50,
		fps,
		config: {damping: 10, stiffness: 250, mass: 0.62},
	});

	const closeProgress = interpolate(frame, [29, 39], [0, 1], clamp);
	const laptopRetraction = interpolate(frame, [39, 58], [0, 470], clamp);
	const laptopOpacity = interpolate(frame, [49, 60], [1, 0], clamp);
	const decommissionSweep = interpolate(frame, [11, 29], [-250, 260], clamp);
	const redFlash =
		frame >= 25 && frame <= 42
			? 0.6 + Math.sin(frame * 1.8) * 0.35
			: 0;

	const shutterProgress = interpolate(
		frame,
		[43, 51, 58, 68],
		[0, 1, 1, 0],
		clamp,
	);

	const phoneRise = interpolate(phoneEntrance, [0, 1], [420, 0], clamp);
	const phoneScale = interpolate(phoneEntrance, [0, 1], [0.72, 1], clamp);
	const phoneGlow = 0.65 + Math.sin(frame * 0.23) * 0.25;

	const radarRotation = frame * 2.7;
	const scanlineY = ((frame * 13) % 1680) - 80;
	const signalFlicker =
		Math.sin(frame * 1.71) > 0.72 ? 0.64 : 1;

	const installs = [
		{start: 68, x: 286, label: 'NAV', icon: 'N'},
		{start: 80, x: 455, label: 'OPS', icon: 'O'},
		{start: 92, x: 624, label: 'COM', icon: 'C'},
		{start: 104, x: 793, label: 'SYS', icon: 'S'},
	];

	const totalInstallProgress = interpolate(frame, [68, 124], [0, 1], clamp);
	const totalPercent = Math.min(100, Math.round(totalInstallProgress * 100));

	const completePulse = spring({
		frame: frame - 119,
		fps,
		config: {damping: 8, stiffness: 300, mass: 0.45},
	});

	const sceneExit = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[1, 0],
		clamp,
	);
	const exitScale = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[1, 1.045],
		clamp,
	);

	const titleFlicker =
		frame < 10 && frame % 3 === 0 ? 0.35 : 1;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette.background,
				overflow: 'hidden',
				fontFamily: '"Poppins", "Arial Narrow", sans-serif',
			}}
		>
			{/* Structural mission-control grid */}
			<AbsoluteFill
				style={{
					opacity: 0.42,
					backgroundImage: `
						linear-gradient(${palette.muted} 2px, transparent 2px),
						linear-gradient(90deg, ${palette.muted} 2px, transparent 2px)
					`,
					backgroundSize: '90px 90px',
					transform: `perspective(700px) rotateX(61deg) scale(1.5) translateY(510px)`,
					transformOrigin: 'center bottom',
				}}
			/>

			{/* Animated amber scanlines */}
			<AbsoluteFill
				style={{
					opacity: 0.16,
					backgroundImage: `repeating-linear-gradient(
						0deg,
						${palette.amber} 0px,
						${palette.amber} 2px,
						transparent 2px,
						transparent 11px
					)`,
					transform: `translateY(${(frame * 3) % 11}px)`,
					pointerEvents: 'none',
				}}
			/>

			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: scanlineY,
					height: 78,
					backgroundColor: palette.amber,
					opacity: 0.045,
					boxShadow: `0 0 55px ${palette.amber}`,
				}}
			/>

			<div
				style={{
					width: '90%',
					maxWidth: 900,
					height: '94%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					boxSizing: 'border-box',
					padding: '54px 30px 38px',
					opacity: sceneExit,
					transform: `scale(${exitScale})`,
				}}
			>
				{/* Header */}
				<header
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'flex-start',
						transform: `translateY(${interpolate(
							contentEntrance,
							[0, 1],
							[-45, 0],
							clamp,
						)}px)`,
						opacity: contentEntrance,
					}}
				>
					<div>
						<div
							style={{
								color: palette.amber,
								fontFamily: '"Roboto Mono", monospace',
								fontSize: 18,
								fontWeight: 900,
								letterSpacing: 5,
								opacity: signalFlicker,
							}}
						>
							MC-02 // DEVICE HANDOFF
						</div>
						<div
							style={{
								color: palette.cyan,
								fontSize: 47,
								fontWeight: 950,
								lineHeight: 1,
								letterSpacing: -1.8,
								marginTop: 14,
								textTransform: 'uppercase',
								opacity: titleFlicker,
							}}
						>
							Mission Control
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 11,
							border: `2px solid ${palette.alert}`,
							padding: '10px 16px',
							color: palette.alert,
							fontFamily: '"Roboto Mono", monospace',
							fontWeight: 900,
							fontSize: 16,
							letterSpacing: 2,
							boxShadow:
								frame < 58 ? `0 0 24px ${palette.alert}` : 'none',
						}}
					>
						<div
							style={{
								width: 11,
								height: 11,
								borderRadius: '50%',
								backgroundColor: palette.alert,
								opacity: Math.floor(frame / 5) % 2 ? 0.25 : 1,
							}}
						/>
						THREAT LEVEL: {frame < 62 ? 'RED' : 'CLEAR'}
					</div>
				</header>

				{/* Overhead deployment rails */}
				<div
					style={{
						position: 'absolute',
						top: 174,
						left: 45,
						right: 45,
						height: 146,
						borderTop: `5px solid ${palette.muted}`,
						borderBottom: `2px solid ${palette.muted}`,
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 14,
							left: 0,
							right: 0,
							display: 'flex',
							justifyContent: 'space-around',
						}}
					>
						{installs.map((item, index) => (
							<div
								key={item.label}
								style={{
									width: 116,
									height: 20,
									backgroundColor: palette.muted,
									border: `2px solid ${palette.amber}`,
									position: 'relative',
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: 5,
										left: 8 + ((frame * 4 + index * 23) % 86),
										width: 17,
										height: 6,
										backgroundColor: palette.amber,
										boxShadow: `0 0 12px ${palette.amber}`,
									}}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Main launch bay */}
				<div
					style={{
						position: 'relative',
						flex: 1,
						minHeight: 0,
						marginTop: 34,
					}}
				>
					<svg
						viewBox="0 0 840 1200"
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
							overflow: 'visible',
						}}
					>
						<defs>
							<clipPath id="screenClip">
								<rect x="261" y="280" width="318" height="190" rx="8" />
							</clipPath>
							<pattern
								id="hazardPattern"
								width="52"
								height="52"
								patternUnits="userSpaceOnUse"
								patternTransform="rotate(45)"
							>
								<rect width="25" height="52" fill={palette.amber} />
								<rect
									x="25"
									width="27"
									height="52"
									fill={palette.muted}
								/>
							</pattern>
						</defs>

						{/* Radar architecture */}
						<circle
							cx="420"
							cy="642"
							r="310"
							fill="none"
							stroke={palette.muted}
							strokeWidth="3"
							strokeDasharray="12 18"
							transform={`rotate(${radarRotation} 420 642)`}
						/>
						<circle
							cx="420"
							cy="642"
							r="245"
							fill="none"
							stroke={palette.cyan}
							strokeWidth="3"
							strokeDasharray="4 25"
							opacity={0.38}
							transform={`rotate(${-radarRotation * 0.7} 420 642)`}
						/>
						<path
							d="M420 292V992 M70 642H770"
							stroke={palette.muted}
							strokeWidth="3"
							strokeDasharray="13 12"
						/>
						<path
							d="M420 642 L420 360 A282 282 0 0 1 685 548 Z"
							fill={palette.cyan}
							opacity={0.05}
							transform={`rotate(${radarRotation} 420 642)`}
						/>

						{/* Four descending app signals */}
						{installs.map((item, index) => {
							const progress = interpolate(
								frame,
								[item.start, item.start + 16],
								[0, 1],
								clamp,
							);
							const installSpring = spring({
								frame: frame - item.start,
								fps,
								config: {
									damping: 11,
									stiffness: 260,
									mass: 0.52,
								},
							});
							const y = interpolate(progress, [0, 1], [18, 616], clamp);
							const magnetX = interpolate(
								progress,
								[0, 0.62, 1],
								[item.x - 35, item.x - 35, 420],
								clamp,
							);
							const scale = interpolate(
								progress,
								[0, 0.77, 1],
								[0.45, 1, 0.15],
								clamp,
							);
							const opacity = interpolate(
								progress,
								[0, 0.08, 0.86, 1],
								[0, 1, 1, 0],
								clamp,
							);
							const circumference = 220;

							return (
								<g key={item.label}>
									<path
										d={`M${item.x - 35} 0 V430 Q${item.x - 35} 550 420 620`}
										fill="none"
										stroke={palette.amber}
										strokeWidth="3"
										strokeDasharray="10 13"
										strokeDashoffset={-frame * 8}
										opacity={frame >= item.start - 8 ? 0.5 : 0.12}
									/>

									<circle
										cx={item.x - 35}
										cy="432"
										r={44 + Math.sin(frame * 0.25 + index) * 4}
										fill="none"
										stroke={palette.cyan}
										strokeWidth="3"
										strokeDasharray="14 9"
										transform={`rotate(${frame * 5} ${item.x - 35} 432)`}
										opacity={
											frame >= item.start - 4 &&
											frame <= item.start + 14
												? 0.85
												: 0.18
										}
									/>

									<g
										transform={`translate(${magnetX} ${y}) scale(${scale * installSpring})`}
										opacity={opacity}
									>
										<rect
											x="-44"
											y="-44"
											width="88"
											height="88"
											r="20"
											fill={palette.background}
											stroke={palette.amber}
											strokeWidth="7"
										/>
										<rect
											x="-34"
											y="-34"
											width="68"
											height="68"
											r="15"
											fill={palette.amber}
											opacity={0.14}
										/>
										<text
											x="0"
											y="15"
											textAnchor="middle"
											fill={palette.amber}
											fontFamily="Roboto Mono, monospace"
											fontWeight="900"
											fontSize="43"
										>
											{item.icon}
										</text>
									</g>

									<circle
										cx={item.x - 35}
										cy="432"
										r="35"
										fill="none"
										stroke={palette.amber}
										strokeWidth="6"
										strokeDasharray={circumference}
										strokeDashoffset={circumference * (1 - progress)}
										transform={`rotate(-90 ${item.x - 35} 432)`}
										opacity={progress > 0 && progress < 1 ? 1 : 0}
									/>
								</g>
							);
						})}

						{/* Motorized pedestal */}
						<g
							transform={`translate(0 ${Math.min(
								laptopRetraction,
								220,
							)})`}
						>
							<path
								d="M316 762 L524 762 L580 1040 L260 1040 Z"
								fill={palette.muted}
								stroke={palette.cyan}
								strokeWidth="4"
							/>
							<path
								d="M283 955 H557"
								stroke={palette.amber}
								strokeWidth="8"
								strokeDasharray="28 15"
								strokeDashoffset={-frame * 7}
							/>
							<circle
								cx="420"
								cy="860"
								r="42"
								fill={palette.background}
								stroke={palette.cyan}
								strokeWidth="8"
							/>
							<path
								d="M420 832 V888 M392 860 H448"
								stroke={palette.cyan}
								strokeWidth="5"
								transform={`rotate(${frame * 7} 420 860)`}
							/>
						</g>

						{/* Laptop */}
						<g
							opacity={laptopOpacity}
							transform={`translate(0 ${laptopRetraction}) scale(${laptopEntrance})`}
							style={{transformOrigin: '420px 720px'}}
						>
							<g
								transform={`translate(0 ${closeProgress * 180}) scale(1 ${
									1 - closeProgress * 0.88
								})`}
								style={{transformOrigin: '420px 510px'}}
							>
								<path
									d="M238 260 Q238 238 262 238 H578 Q602 238 602 262 V498 H238 Z"
									fill={palette.muted}
									stroke={palette.alert}
									strokeWidth="7"
								/>
								<rect
									x="260"
									y="280"
									width="320"
									height="190"
									r="8"
									fill={palette.background}
									stroke={palette.alert}
									strokeWidth="4"
								/>

								<g clipPath="url(#screenClip)">
									{Array.from({length: 12}).map((_, index) => (
										<line
											key={index}
											x1="270"
											x2={315 + ((index * 41) % 245)}
											y1={296 + index * 14}
											y2={296 + index * 14}
											stroke={
												index % 3 === 0
													? palette.alert
													: palette.amber
											}
											strokeWidth="4"
											opacity={0.45}
										/>
									))}
									<rect
										x={decommissionSweep}
										y="330"
										width="500"
										height="68"
										fill={palette.alert}
										opacity={0.95}
										transform="rotate(-8 420 365)"
									/>
									<text
										x={decommissionSweep + 250}
										y="374"
										textAnchor="middle"
										fill={palette.background}
										fontFamily="Roboto Mono, monospace"
										fontSize="32"
										fontWeight="900"
										letterSpacing="5"
										transform={`rotate(-8 ${
											decommissionSweep + 250
										} 365)`}
									>
										DECOMMISSION
									</text>
								</g>
							</g>

							<path
								d="M204 505 H636 L693 570 Q700 580 681 580 H159 Q140 580 147 570 Z"
								fill={palette.muted}
								stroke={palette.alert}
								strokeWidth="6"
							/>
							<path
								d="M327 533 H513 L533 561 H307 Z"
								fill={palette.background}
								stroke={palette.alert}
								strokeWidth="3"
							/>
						</g>

						{/* Mechanical impact flash */}
						<circle
							cx="420"
							cy="535"
							r={interpolate(frame, [37, 46], [15, 230], clamp)}
							fill="none"
							stroke={palette.alert}
							strokeWidth="10"
							opacity={
								frame >= 37
									? interpolate(frame, [37, 46], [1, 0], clamp)
									: 0
							}
						/>

						{/* Hazard shutters */}
						<g opacity={shutterProgress}>
							<rect
								x={interpolate(shutterProgress, [0, 1], [-450, 0], clamp)}
								y="914"
								width="420"
								height="165"
								fill="url(#hazardPattern)"
								stroke={palette.alert}
								strokeWidth="6"
							/>
							<rect
								x={interpolate(shutterProgress, [0, 1], [870, 420], clamp)}
								y="914"
								width="420"
								height="165"
								fill="url(#hazardPattern)"
								stroke={palette.alert}
								strokeWidth="6"
							/>
						</g>
					</svg>

					{/* Smartphone launch vehicle */}
					<div
						style={{
							position: 'absolute',
							left: '50%',
							top: 500,
							width: 250,
							height: 470,
							marginLeft: -125,
							borderRadius: 48,
							backgroundColor: palette.background,
							border: `8px solid ${palette.cyan}`,
							boxSizing: 'border-box',
							transform: `translateY(${phoneRise}px) scale(${phoneScale})`,
							boxShadow: `0 0 ${35 + phoneGlow * 35}px ${palette.cyan}`,
							opacity: frame < 49 ? 0 : 1,
							overflow: 'hidden',
							zIndex: 6,
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: 13,
								left: '50%',
								width: 76,
								height: 12,
								marginLeft: -38,
								borderRadius: 12,
								backgroundColor: palette.muted,
							}}
						/>

						<div
							style={{
								position: 'absolute',
								top: 58,
								left: 22,
								right: 22,
								color: palette.cyan,
								fontFamily: '"Roboto Mono", monospace',
								fontSize: 13,
								fontWeight: 900,
								letterSpacing: 2,
								textAlign: 'center',
							}}
						>
							PHONE // FLIGHT CORE
						</div>

						<div
							style={{
								position: 'absolute',
								top: 100,
								left: 24,
								right: 24,
								display: 'grid',
								gridTemplateColumns: '1fr 1fr',
								gap: 14,
							}}
						>
							{installs.map((item, index) => {
								const progress = interpolate(
									frame,
									[item.start, item.start + 16],
									[0, 1],
									clamp,
								);
								const installed = progress >= 1;

								return (
									<div
										key={item.label}
										style={{
											height: 88,
											border: `3px solid ${
												installed ? palette.cyan : palette.muted
											}`,
											backgroundColor: palette.background,
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'center',
											alignItems: 'center',
											gap: 9,
											boxShadow: installed
												? `0 0 16px ${palette.cyan}`
												: 'none',
											transform: `scale(${
												installed
													? 1 + Math.sin(frame * 0.15 + index) * 0.025
													: 1
											})`,
										}}
									>
										<div
											style={{
												color: installed
													? palette.cyan
													: palette.amber,
												fontFamily: '"Roboto Mono", monospace',
												fontSize: 17,
												fontWeight: 900,
												letterSpacing: 2,
											}}
										>
											{item.label}
										</div>
										<SegmentedGauge
											progress={progress}
											active={progress > 0 && progress < 1}
										/>
									</div>
								);
							})}
						</div>

						<div
							style={{
								position: 'absolute',
								left: 23,
								right: 23,
								bottom: 47,
							}}
						>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									color:
										totalPercent === 100
											? palette.cyan
											: palette.amber,
									fontFamily: '"Roboto Mono", monospace',
									fontSize: 15,
									fontWeight: 900,
									marginBottom: 9,
								}}
							>
								<span>MISSION LOAD</span>
								<span>{String(totalPercent).padStart(2, '0')}%</span>
							</div>
							<div
								style={{
									height: 13,
									border: `2px solid ${palette.muted}`,
									padding: 2,
								}}
							>
								<div
									style={{
										width: `${totalPercent}%`,
										height: '100%',
										backgroundColor:
											totalPercent === 100
												? palette.cyan
												: palette.amber,
										boxShadow: `0 0 14px ${
											totalPercent === 100
												? palette.cyan
												: palette.amber
										}`,
									}}
								/>
							</div>
						</div>

						<div
							style={{
								position: 'absolute',
								left: 0,
								right: 0,
								top: (frame * 11) % 470,
								height: 3,
								backgroundColor: palette.amber,
								opacity: 0.7,
								boxShadow: `0 0 15px ${palette.amber}`,
							}}
						/>
					</div>

					{/* Installation telemetry labels */}
					<div
						style={{
							position: 'absolute',
							right: 0,
							top: 275,
							width: 192,
							display: 'flex',
							flexDirection: 'column',
							gap: 14,
						}}
					>
						{installs.map((item) => {
							const progress = interpolate(
								frame,
								[item.start, item.start + 16],
								[0, 1],
								clamp,
							);
							const percent = Math.round(progress * 100);

							return (
								<div
									key={item.label}
									style={{
										opacity: frame >= item.start - 5 ? 1 : 0.2,
										borderLeft: `4px solid ${
											percent === 100
												? palette.cyan
												: palette.amber
										}`,
										paddingLeft: 12,
									}}
								>
									<div
										style={{
											color:
												percent === 100
													? palette.cyan
													: palette.amber,
											fontFamily: '"Roboto Mono", monospace',
											fontSize: 15,
											fontWeight: 900,
											letterSpacing: 2,
										}}
									>
										{item.label} {String(percent).padStart(2, '0')}%
									</div>
									<SegmentedGauge
										progress={progress}
										active={progress > 0 && progress < 1}
									/>
								</div>
							);
						})}
					</div>
				</div>

				{/* Terminal and status footer */}
				<footer
					style={{
						minHeight: 166,
						borderTop: `3px solid ${palette.muted}`,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 30,
						paddingTop: 25,
					}}
				>
					<div style={{flex: 1}}>
						<TerminalLine
							text="LAPTOP: OFFLINE"
							start={19}
							color={palette.alert}
							frame={frame}
						/>
						<TerminalLine
							text="PHONE MISSION: ACTIVE"
							start={83}
							color={palette.cyan}
							frame={frame}
						/>
					</div>

					<div
						style={{
							width: 230,
							textAlign: 'right',
							transform: `scale(${Math.max(0, completePulse)})`,
							transformOrigin: 'right center',
							opacity: frame >= 118 ? 1 : 0,
						}}
					>
						<div
							style={{
								color: palette.cyan,
								fontFamily: '"Roboto Mono", monospace',
								fontSize: 14,
								fontWeight: 900,
								letterSpacing: 4,
							}}
						>
							4/4 INSTALLED
						</div>
						<div
							style={{
								color: palette.amber,
								fontSize: 31,
								fontWeight: 950,
								lineHeight: 1,
								marginTop: 8,
								textTransform: 'uppercase',
							}}
						>
							Cleared
							<br />
							For Launch
						</div>
					</div>
				</footer>
			</div>

			{/* Red lockdown flash kept separate from the solid backdrop */}
			<AbsoluteFill
				style={{
					backgroundColor: palette.alert,
					opacity: redFlash * 0.1,
					pointerEvents: 'none',
				}}
			/>

			{/* Frame brackets */}
			<div
				style={{
					position: 'absolute',
					left: 25,
					top: 25,
					width: 90,
					height: 90,
					borderLeft: `5px solid ${palette.amber}`,
					borderTop: `5px solid ${palette.amber}`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					right: 25,
					bottom: 25,
					width: 90,
					height: 90,
					borderRight: `5px solid ${palette.cyan}`,
					borderBottom: `5px solid ${palette.cyan}`,
				}}
			/>
		</AbsoluteFill>
	);
}