import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene14() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: compressed pressure snap, then overshoot open.
	const entrance = spring({
		frame,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.55},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 280, mass: 0.5},
	});

	const pressureScaleY = interpolate(
		frame,
		[0, 4, 11, 18, 30],
		[0.08, 0.08, 1.15, 0.94, 1],
		clamp,
	);

	const pressureScaleX = interpolate(
		frame,
		[0, 5, 13, 24],
		[0.68, 0.68, 1.04, 1],
		clamp,
	);

	// Beat 2: cursor arrives and physically clicks DOCUMENT.
	const cursorVisible = frame >= 28 && frame <= 70;
	const cursorX = interpolate(frame, [28, 45], [150, 5], clamp);
	const cursorY = interpolate(frame, [28, 45], [110, 4], clamp);
	const isClicking = frame >= 46 && frame <= 52;
	const clickThunk = isClicking ? 8 : 0;
	const buttonScale = isClicking ? 0.89 : 1;

	const straighten = interpolate(frame, [48, 64], [0, 1], clamp);
	const timelineReveal = interpolate(frame, [55, 70], [0, 1], clamp);

	// Beat 3: continuously living physics.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.15;
	const shadowPulse = 11 + Math.sin(frame * 0.18) * 3;

	const beat3 = frame >= 84;
	const borderJolt =
		beat3 && frame % 15 < 2
			? frame % 30 < 15
				? -2
				: 2
			: 0;

	const timelineTick = Math.max(0, Math.floor((frame - 70) / 7));
	const playheadProgress = beat3 ? ((frame - 84) % 34) / 34 : 0;
	const playheadX = 8 + playheadProgress * 84;

	const shineProgress = ((frame + 18) % 62) / 62;
	const shineX = -180 + shineProgress * 1040;

	const exitY = interpolate(
		frame,
		[durationInFrames - 9, durationInFrames],
		[0, -70],
		clamp,
	);
	const exitScaleY = interpolate(
		frame,
		[durationInFrames - 7, durationInFrames],
		[1, 0.12],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 3, durationInFrames - 5, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const waveformX = [5, 12, 19, 26, 33, 40, 47, 54, 61, 68, 75, 82, 89, 95];
	const chaoticY = [50, 22, 74, 15, 82, 31, 68, 19, 77, 28, 65, 18, 72, 50];

	const waveformPoints = waveformX
		.map((x, index) => {
			const straightY = 50;
			const y =
				chaoticY[index] +
				(straightY - chaoticY[index]) * straighten;
			return `${x},${y}`;
		})
		.join(' ');

	const timelineBlocks = [
		{x: 8, width: 11},
		{x: 22, width: 8},
		{x: 33, width: 15},
		{x: 51, width: 9},
		{x: 63, width: 13},
		{x: 79, width: 13},
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, sans-serif',
				color: '#000000',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					padding: '80px 20px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
					transform: `translateY(${exitY}px) scaleY(${exitScaleY})`,
				}}
			>
				{/* Tier 1 — category badge */}
				<div
					style={{
						height: '15%',
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
							padding: '10px 24px',
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: '6px 6px 0 #000000',
							transform: `scale(${badgeEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						<div
							style={{
								width: 11,
								height: 11,
								borderRadius: '50%',
								backgroundColor: '#F1F333',
								border: '3px solid #000000',
							}}
						/>
						<div
							style={{
								fontSize: 20,
								fontWeight: 950,
								letterSpacing: 3,
								lineHeight: 1,
								textTransform: 'uppercase',
								textDecoration: 'underline',
								textDecorationThickness: 3,
								textUnderlineOffset: 5,
								whiteSpace: 'nowrap',
							}}
						>
							Conflict Log
						</div>
					</div>
				</div>

				{/* Tier 2 — single hero card */}
				<div
					style={{
						height: '65%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '88%',
							maxWidth: 840,
							transform: `translateY(${hoverY + clickThunk}px) rotate(${
								hoverTilt + borderJolt
							}deg) scaleX(${pressureScaleX * entrance}) scaleY(${
								pressureScaleY * entrance
							})`,
							transformOrigin: 'center',
							position: 'relative',
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 350,
								padding: '34px 34px 30px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 16,
								position: 'relative',
								overflow: 'hidden',
								backgroundColor: '#23A094',
								border: '6px solid #000000',
								borderRadius: 22,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
							}}
						>
							{/* Continuous traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									left: 0,
									width: 90,
									backgroundColor: 'rgba(255,255,255,0.22)',
									transform: `translateX(${shineX}px) skewX(-22deg)`,
									pointerEvents: 'none',
									zIndex: 0,
								}}
							/>

							<div
								style={{
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 16,
									position: 'relative',
									zIndex: 2,
								}}
							>
								<div
									style={{
										padding: '8px 16px',
										backgroundColor: '#000000',
										color: '#FFF8E7',
										borderRadius: 8,
										fontSize: 24,
										fontWeight: 950,
										letterSpacing: 2,
										lineHeight: 1,
										whiteSpace: 'nowrap',
									}}
								>
									MIND BATTLE
								</div>

								<div
									style={{
										fontSize: 17,
										fontWeight: 950,
										letterSpacing: 2,
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 3,
										textUnderlineOffset: 4,
										whiteSpace: 'nowrap',
									}}
								>
									{straighten < 0.95 ? 'Noise' : 'Long Form'}
								</div>
							</div>

							{/* Waveform transforming into one structured timeline */}
							<div
								style={{
									width: '100%',
									height: 150,
									padding: '12px 16px',
									boxSizing: 'border-box',
									position: 'relative',
									zIndex: 2,
									backgroundColor: '#FFF8E7',
									border: '5px solid #000000',
									borderRadius: 12,
									boxShadow: '6px 6px 0 #000000',
									overflow: 'hidden',
								}}
							>
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 100 100"
									preserveAspectRatio="none"
									style={{display: 'block'}}
								>
									<polyline
										points={waveformPoints}
										fill="none"
										stroke="#000000"
										strokeWidth={5}
										strokeLinejoin="miter"
										strokeLinecap="square"
									/>

									{timelineBlocks.map((block, index) => {
										const visible =
											timelineReveal *
											(index < timelineTick ? 1 : 0.18);

										return (
											<rect
												key={`${block.x}-${block.width}`}
												x={block.x}
												y={41}
												width={block.width * visible}
												height={18}
												fill={
													index % 2 === 0
														? '#FF90E8'
														: '#23A094'
												}
												stroke="#000000"
												strokeWidth={2.5}
											/>
										);
									})}

									{timelineReveal > 0.9 && (
										<line
											x1={playheadX}
											x2={playheadX}
											y1={17}
											y2={83}
											stroke="#F1F333"
											strokeWidth={5}
										/>
									)}
								</svg>

								{timelineReveal > 0.9 && (
									<div
										style={{
											position: 'absolute',
											left: `${playheadX}%`,
											top: 8,
											transform: 'translateX(-50%)',
											width: 16,
											height: 16,
											backgroundColor: '#F1F333',
											border: '3px solid #000000',
											borderRadius: 2,
										}}
									/>
								)}
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									position: 'relative',
									zIndex: 3,
								}}
							>
								<div
									style={{
										padding: '11px 28px',
										backgroundColor:
											straighten > 0.92 ? '#F1F333' : '#FF90E8',
										border: '4px solid #000000',
										borderRadius: 10,
										boxShadow: isClicking
											? '2px 2px 0 #000000'
											: '6px 6px 0 #000000',
										transform: `scale(${buttonScale}) translateY(${
											isClicking ? 4 : 0
										}px)`,
										fontSize: 22,
										fontWeight: 950,
										lineHeight: 1,
										letterSpacing: 3,
										textTransform: 'uppercase',
										textDecoration: 'underline',
										textDecorationThickness: 3,
										textUnderlineOffset: 5,
										whiteSpace: 'nowrap',
									}}
								>
									{straighten > 0.92 ? 'Documented' : 'Document'}
								</div>

								{cursorVisible && (
									<div
										style={{
											position: 'absolute',
											right: -25,
											bottom: -18,
											transform: `translate(${cursorX}px, ${cursorY}px) scale(${
												isClicking ? 0.82 : 1
											})`,
											filter: isClicking
												? 'drop-shadow(2px 2px 0 #FF90E8)'
												: 'drop-shadow(5px 5px 0 #FF90E8)',
										}}
									>
										<svg
											width="48"
											height="48"
											viewBox="0 0 24 24"
											fill="#000000"
											stroke="#FFF8E7"
											strokeWidth="1.4"
											strokeLinejoin="miter"
										>
											<path d="M4 3.5L11.2 21l2.65-7.1L21 11.2z" />
										</svg>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 — punchline */}
				<div
					style={{
						height: '20%',
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
							padding: '14px 30px',
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: `${
								6 + Math.sin(frame * 0.18) * 2
							}px ${6 + Math.sin(frame * 0.18) * 2}px 0 #FF90E8`,
							transform: `scale(${entrance}) translateY(${
								Math.sin(frame * 0.12 + 2) * 3
							}px)`,
							fontSize: 23,
							fontWeight: 950,
							letterSpacing: 2,
							lineHeight: 1.15,
							textAlign: 'center',
							textTransform: 'uppercase',
							textDecoration: 'underline',
							textDecorationColor: '#F1F333',
							textDecorationThickness: 4,
							textUnderlineOffset: 6,
							whiteSpace: 'nowrap',
						}}
					>
						Turn conflict into a clear path
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}