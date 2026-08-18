import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene6() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	const palette = ['#1A2026', '#F4F4F4', '#FF8A3D', '#4DD0E1', '#39414B'];

	const sceneOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 7, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const paneEntrance = spring({
		frame,
		fps,
		config: {damping: 16, stiffness: 170, mass: 0.85},
	});

	const headerEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 230, mass: 0.65},
	});

	const signalProgress = interpolate(frame, [12, 31], [0, 1], clamp);
	const signalLength = 760;
	const signalDotX = interpolate(signalProgress, [0, 1], [24, 503], clamp);
	const switchImpact = spring({
		frame: frame - 29,
		fps,
		config: {damping: 9, stiffness: 320, mass: 0.42},
	});

	const beaconDraw = interpolate(frame, [23, 43], [0, 1], clamp);
	const beaconSpring = spring({
		frame: frame - 31,
		fps,
		config: {damping: 7, stiffness: 245, mass: 0.52},
	});
	const oscillation =
		frame < 31
			? 0
			: Math.sin((frame - 31) * 0.72) *
				18 *
				Math.exp(-(frame - 31) * 0.035);
	const beaconPulse = 1 + Math.sin(frame * 0.42) * 0.035 * beaconSpring;

	const firstRing = interpolate(frame, [31, 58], [0, 1], clamp);
	const secondRing = interpolate(frame, [39, 69], [0, 1], clamp);
	const thirdRing = interpolate(frame, [48, 82], [0, 1], clamp);

	const alertFlash =
		interpolate(frame, [28, 34], [0, 1], clamp) *
		interpolate(frame, [48, 59], [1, 0], clamp);

	const engineersPivot = spring({
		frame: frame - 42,
		fps,
		config: {damping: 10, stiffness: 135, mass: 0.9},
	});

	const writingProgress = interpolate(frame, [62, 91], [0, 1], clamp);
	const writeWidth = interpolate(writingProgress, [0, 1], [0, 520], clamp);
	const arrowProgress = interpolate(frame, [85, 101], [0, 1], clamp);

	const circleOne = interpolate(frame, [88, 97], [0, 1], clamp);
	const circleTwo = interpolate(frame, [98, 107], [0, 1], clamp);
	const circleThree = interpolate(frame, [108, 117], [0, 1], clamp);

	const handProgress = interpolate(frame, [58, 91, 112, 124], [0, 1, 1, 0], clamp);
	const handX =
		frame < 92
			? interpolate(writingProgress, [0, 1], [246, 737], clamp)
			: 520 +
				Math.cos((frame - 92) * 0.48) *
					(95 - Math.min(72, (frame - 92) * 3));
	const handY =
		frame < 92
			? 1138 + Math.sin(frame * 0.55) * 8
			: 799 +
				Math.sin((frame - 92) * 0.48) *
					(64 - Math.min(48, (frame - 92) * 2));

	const smudgeProgress = interpolate(frame, [104, 119], [0, 1], clamp);
	const glareX = interpolate(frame, [111, 133], [-430, 1280], clamp);
	const finalReveal = interpolate(frame, [116, 130], [0, 1], clamp);
	const focusBlur = interpolate(
		frame,
		[0, 12, 31, 39, 111, 128],
		[8, 0, 0, 3, 3, 0],
		clamp,
	);

	const counter = Math.round(
		interpolate(frame, [30, 53], [0, 1], clamp),
	);
	const statusText = counter === 1 ? 'SIGNAL LOCKED' : 'AWAITING SIGNAL';

	const ring = (
		radius: number,
		progress: number,
		opacity: number,
		key: string,
	) => (
		<circle
			key={key}
			cx="540"
			cy="785"
			r={radius * progress}
			fill="none"
			stroke={palette[3]}
			strokeWidth={Math.max(2, 11 - progress * 7)}
			opacity={opacity * (1 - progress * 0.72)}
			strokeDasharray="24 17"
			transform={`rotate(${frame * 1.8} 540 785)`}
		/>
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: palette[0],
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
				opacity: sceneOpacity,
				fontFamily:
					'"Arial Narrow", "Helvetica Neue", Arial, sans-serif',
			}}
		>
			<div
				style={{
					position: 'relative',
					width: '90%',
					maxWidth: 900,
					height: '92%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					boxSizing: 'border-box',
					overflow: 'hidden',
					transform: `scale(${interpolate(
						paneEntrance,
						[0, 1],
						[0.96, 1],
						clamp,
					)})`,
					filter: `blur(${focusBlur}px)`,
				}}
			>
				<div
					style={{
						width: '100%',
						height: 110,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderBottom: `3px solid ${palette[4]}`,
						boxSizing: 'border-box',
						transform: `translateY(${interpolate(
							headerEntrance,
							[0, 1],
							[-50, 0],
							clamp,
						)}px)`,
						opacity: headerEntrance,
						zIndex: 5,
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 15,
						}}
					>
						<div
							style={{
								width: 17,
								height: 17,
								borderRadius: 99,
								backgroundColor: palette[2],
								transform: `scale(${1 + alertFlash * 0.6})`,
								boxShadow: `0 0 ${18 + alertFlash * 30}px ${palette[2]}`,
							}}
						/>
						<div
							style={{
								color: palette[1],
								fontSize: 25,
								fontWeight: 950,
								letterSpacing: 5,
							}}
						>
							WAR ROOM // 06
						</div>
					</div>

					<div
						style={{
							color: counter ? palette[3] : palette[4],
							fontSize: 18,
							fontWeight: 900,
							letterSpacing: 3,
							border: `2px solid ${counter ? palette[3] : palette[4]}`,
							borderRadius: 999,
							padding: '11px 18px',
							transform: `scale(${1 + switchImpact * 0.05})`,
						}}
					>
						{statusText}
					</div>
				</div>

				<div
					style={{
						position: 'relative',
						width: '100%',
						flex: 1,
						overflow: 'hidden',
						borderLeft: `2px solid ${palette[4]}`,
						borderRight: `2px solid ${palette[4]}`,
						boxSizing: 'border-box',
						backgroundColor: palette[0],
					}}
				>
					{/* Engineers behind the glass */}
					<svg
						viewBox="0 0 900 1530"
						style={{
							position: 'absolute',
							inset: 0,
							width: '100%',
							height: '100%',
						}}
					>
						<defs>
							<filter id="cyanGlow">
								<feGaussianBlur stdDeviation="8" result="blur" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<filter id="orangeGlow">
								<feGaussianBlur stdDeviation="10" result="blur" />
								<feMerge>
									<feMergeNode in="blur" />
									<feMergeNode in="SourceGraphic" />
								</feMerge>
							</filter>
							<clipPath id="writeClip">
								<rect x="165" y="1020" width={writeWidth} height="180" />
							</clipPath>
						</defs>

						{/* Structural window geometry */}
						<path
							d="M40 220 L860 115 M72 1390 L840 1280 M175 0 L110 1530 M790 0 L835 1530"
							stroke={palette[4]}
							strokeWidth="3"
							opacity="0.45"
						/>
						<path
							d="M450 0 L450 1530 M0 760 L900 760"
							stroke={palette[4]}
							strokeWidth="2"
							strokeDasharray="12 22"
							opacity="0.35"
						/>

						{/* Reflected engineers pivoting toward the activation */}
						<g opacity="0.42">
							<g
								transform={`translate(130 935) rotate(${
									-14 + engineersPivot * 16
								} 90 120)`}
							>
								<circle cx="90" cy="60" r="50" fill={palette[4]} />
								<path
									d="M28 278 Q30 130 90 118 Q151 132 165 278 Z"
									fill={palette[4]}
								/>
								<path
									d="M90 122 L150 203 L236 175"
									fill="none"
									stroke={palette[4]}
									strokeWidth="34"
									strokeLinecap="round"
								/>
							</g>
							<g
								transform={`translate(620 985) rotate(${
									15 - engineersPivot * 19
								} 80 110)`}
							>
								<circle cx="80" cy="54" r="46" fill={palette[4]} />
								<path
									d="M18 280 Q21 122 79 112 Q143 126 151 280 Z"
									fill={palette[4]}
								/>
								<path
									d="M75 127 L20 205 L-55 177"
									fill="none"
									stroke={palette[4]}
									strokeWidth="31"
									strokeLinecap="round"
								/>
							</g>
						</g>

						{/* Scratches and fingerprints revealed by alert waves */}
						<g opacity={0.1 + firstRing * 0.42}>
							<path
								d="M126 355 L327 319 M690 388 L817 339 M94 1260 L272 1218 M645 1288 L816 1191"
								stroke={palette[3]}
								strokeWidth="3"
								strokeDasharray="5 14"
							/>
							<g
								fill="none"
								stroke={palette[3]}
								strokeWidth="4"
								opacity="0.55"
							>
								<path d="M735 545 C679 507 660 609 722 631 C785 652 814 557 756 524" />
								<path d="M726 563 C694 545 685 599 721 611 C756 623 775 572 744 550" />
								<path d="M181 875 C126 835 105 940 170 956 C229 972 252 883 199 851" />
								<path d="M174 896 C143 873 131 927 170 937 C207 946 218 900 190 879" />
							</g>
						</g>

						{/* Incoming presenter-side signal */}
						<path
							d="M24 785 C145 785 154 645 275 675 C366 698 385 785 503 785"
							fill="none"
							stroke={palette[1]}
							strokeWidth="10"
							strokeLinecap="round"
							strokeDasharray={signalLength}
							strokeDashoffset={signalLength * (1 - signalProgress)}
							filter="url(#cyanGlow)"
						/>
						<circle
							cx={signalDotX}
							cy={
								signalProgress < 0.55
									? interpolate(signalProgress, [0, 0.55], [785, 675], clamp)
									: interpolate(signalProgress, [0.55, 1], [675, 785], clamp)
							}
							r={9 + alertFlash * 8}
							fill={palette[1]}
						/>

						{/* Concentric full-window alert waves */}
						<g filter="url(#cyanGlow)">
							{ring(760, firstRing, 0.95, 'ring-1')}
							{ring(860, secondRing, 0.78, 'ring-2')}
							{ring(970, thirdRing, 0.58, 'ring-3')}
						</g>

						{/* Hand-drawn activation switch */}
						<g
							transform={`translate(540 785) scale(${
								0.72 + switchImpact * 0.28
							}) translate(-540 -785)`}
						>
							<rect
								x="488"
								y="735"
								width="104"
								height="100"
								rx="18"
								fill={palette[0]}
								stroke={palette[1]}
								strokeWidth="8"
								transform={`rotate(${oscillation * 0.12} 540 785)`}
							/>
							<path
								d="M515 789 L536 810 L573 758"
								fill="none"
								stroke={counter ? palette[3] : palette[4]}
								strokeWidth="12"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="100"
								strokeDashoffset={100 * (1 - switchImpact)}
							/>
							<text
								x="540"
								y="862"
								textAnchor="middle"
								fill={palette[1]}
								fontSize="22"
								fontWeight="900"
								letterSpacing="4"
							>
								ACTIVATE
							</text>
						</g>

						{/* Orange marker alarm beacon */}
						<g
							transform={`translate(540 525) rotate(${oscillation} 0 120) scale(${beaconPulse}) translate(-540 -525)`}
							filter="url(#orangeGlow)"
						>
							<path
								d="M465 610 L486 576 L594 576 L616 610 Z"
								fill="none"
								stroke={palette[2]}
								strokeWidth="13"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="410"
								strokeDashoffset={410 * (1 - beaconDraw)}
							/>
							<path
								d="M492 576 L505 477 Q540 430 575 477 L589 576"
								fill="none"
								stroke={palette[2]}
								strokeWidth="16"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeDasharray="360"
								strokeDashoffset={360 * (1 - beaconDraw)}
							/>
							<path
								d="M524 476 Q540 455 557 477 M521 514 L559 514 M516 545 L566 545"
								fill="none"
								stroke={palette[2]}
								strokeWidth="8"
								strokeLinecap="round"
								strokeDasharray="130"
								strokeDashoffset={130 * (1 - beaconDraw)}
							/>
							<path
								d="M540 399 L540 354 M465 425 L431 391 M615 425 L650 391 M441 500 L394 500 M639 500 L686 500"
								fill="none"
								stroke={palette[2]}
								strokeWidth="11"
								strokeLinecap="round"
								strokeDasharray="65"
								strokeDashoffset={65 * (1 - beaconDraw)}
							/>
						</g>

						{/* Marker-written NEXT DROP */}
						<g clipPath="url(#writeClip)">
							<text
								x="174"
								y="1157"
								fill={palette[2]}
								stroke={palette[2]}
								strokeWidth="2"
								fontSize="105"
								fontWeight="950"
								letterSpacing="7"
								transform="rotate(-3 174 1157)"
							>
								NEXT DROP
							</text>
							<path
								d="M176 1182 C315 1203 511 1188 692 1168"
								fill="none"
								stroke={palette[2]}
								strokeWidth="9"
								strokeLinecap="round"
							/>
						</g>

						{/* Arrow from words to beacon */}
						<path
							d="M685 1112 C775 1010 764 774 635 627"
							fill="none"
							stroke={palette[2]}
							strokeWidth="12"
							strokeLinecap="round"
							strokeDasharray="690"
							strokeDashoffset={690 * (1 - arrowProgress)}
						/>
						<path
							d="M637 627 L646 684 M637 627 L695 641"
							fill="none"
							stroke={palette[2]}
							strokeWidth="12"
							strokeLinecap="round"
							strokeDasharray="120"
							strokeDashoffset={120 * (1 - arrowProgress)}
						/>

						{/* Triple-priority circle around activation */}
						<ellipse
							cx="540"
							cy="790"
							rx="83"
							ry="76"
							fill="none"
							stroke={palette[2]}
							strokeWidth="8"
							strokeDasharray="520"
							strokeDashoffset={520 * (1 - circleOne)}
							transform="rotate(-8 540 790)"
						/>
						<ellipse
							cx="542"
							cy="787"
							rx="101"
							ry="91"
							fill="none"
							stroke={palette[2]}
							strokeWidth="7"
							strokeDasharray="610"
							strokeDashoffset={610 * (1 - circleTwo)}
							transform="rotate(7 542 787)"
						/>
						<ellipse
							cx="537"
							cy="793"
							rx="119"
							ry="107"
							fill="none"
							stroke={palette[2]}
							strokeWidth="6"
							strokeDasharray="720"
							strokeDashoffset={720 * (1 - circleThree)}
							transform="rotate(-4 537 793)"
						/>

						{/* Marker hand */}
						<g
							opacity={handProgress}
							transform={`translate(${handX} ${handY}) rotate(${
								-32 + Math.sin(frame * 0.5) * 4
							})`}
						>
							<path
								d="M0 0 L122 -20 L145 18 L24 43 Z"
								fill={palette[1]}
								stroke={palette[4]}
								strokeWidth="6"
							/>
							<path d="M-26 17 L4 -2 L21 40 L-10 53 Z" fill={palette[2]} />
							<path
								d="M144 -7 Q209 -4 225 50 L154 78 L122 35 Z"
								fill={palette[4]}
							/>
							<path
								d="M158 2 Q195 10 207 45"
								fill="none"
								stroke={palette[1]}
								strokeWidth="8"
								strokeLinecap="round"
								opacity="0.5"
							/>
						</g>

						{/* Smudge erase dragged across old construction marks */}
						<g opacity={smudgeProgress * 0.7}>
							<path
								d={`M${interpolate(
									smudgeProgress,
									[0, 1],
									[20, 780],
									clamp,
								)} 1320 l145 -35`}
								stroke={palette[0]}
								strokeWidth="62"
								strokeLinecap="round"
							/>
							<path
								d={`M${interpolate(
									smudgeProgress,
									[0, 1],
									[10, 760],
									clamp,
								)} 1320 l170 -40`}
								stroke={palette[4]}
								strokeWidth="8"
								strokeLinecap="round"
								opacity="0.65"
							/>
						</g>

						{/* Presenter reflection resolving after glare */}
						<g opacity={finalReveal * 0.28}>
							<circle cx="450" cy="1060" r="108" fill={palette[1]} />
							<path
								d="M250 1530 Q270 1200 450 1192 Q630 1200 650 1530 Z"
								fill={palette[1]}
							/>
							<path
								d="M391 1083 Q450 1125 509 1083"
								fill="none"
								stroke={palette[0]}
								strokeWidth="10"
								strokeLinecap="round"
							/>
						</g>
					</svg>

					{/* Final glass glare sweep */}
					<div
						style={{
							position: 'absolute',
							top: -180,
							left: glareX,
							width: 260,
							height: '125%',
							backgroundColor: palette[1],
							opacity: interpolate(
								frame,
								[110, 115, 126, 133],
								[0, 0.5, 0.34, 0],
								clamp,
							),
							transform: 'rotate(18deg)',
							boxShadow: `0 0 75px ${palette[1]}`,
						}}
					/>

					<div
						style={{
							position: 'absolute',
							left: 28,
							bottom: 26,
							color: palette[3],
							fontSize: 16,
							fontWeight: 900,
							letterSpacing: 4,
							opacity: interpolate(frame, [36, 48], [0, 1], clamp),
						}}
					>
						INCOMING INTELLIGENCE // PRIORITY 01
					</div>
				</div>

				<div
					style={{
						width: '100%',
						height: 92,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderTop: `3px solid ${palette[4]}`,
						boxSizing: 'border-box',
						color: palette[1],
					}}
				>
					<div
						style={{
							fontSize: 20,
							fontWeight: 950,
							letterSpacing: 4,
						}}
					>
						ACTIVATION CODE
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 13,
							color: palette[2],
							fontSize: 21,
							fontWeight: 950,
							letterSpacing: 4,
						}}
					>
						<span
							style={{
								display: 'inline-block',
								transform: `translateX(${Math.sin(frame * 0.38) * 5}px)`,
							}}
						>
							→
						</span>
						NEXT DROP ARMED
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}