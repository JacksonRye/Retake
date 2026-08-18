import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene4() {
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
		config: {damping: 12, stiffness: 220, mass: 0.62},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.56},
	});

	const textWrite = interpolate(frame, [0, 20], [0, 1], clamp);
	const incomingArrowDraw = interpolate(frame, [6, 28], [0, 1], clamp);

	// ------------------------------------------
	// BEAT 2: Through-arrow + handoff stamp
	// ------------------------------------------
	const outgoingArrowDraw = interpolate(frame, [30, 72], [0, 1], clamp);
	const ringStamp = spring({
		frame: frame - 36,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.5},
	});

	const handoffPulse = interpolate(frame, [34, 42, 52], [0, 1, 0], clamp);

	// ------------------------------------------
	// BEAT 3: Living loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 20 + Math.sin(frame * 0.18) * 5;
	const glareSweep = interpolate((frame + 18) % 70, [0, 70], [-340, 920], clamp);
	const arrowNudge = frame >= 84 ? Math.sin(frame * 0.22) * 8 : 0;
	const inkShimmer = 1 + (frame >= 84 ? Math.sin(frame * 0.25) * 0.035 : 0);
	const smudgeTravel = interpolate(
		frame,
		[84, durationInFrames - 1],
		[0, 240],
		clamp
	);
	const smudgeOpacity = interpolate(
		frame,
		[84, durationInFrames - 8, durationInFrames - 1],
		[0.16, 0.16, 0],
		clamp
	);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -60],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// ------------------------------------------
	// Geometry for relay arrow lane
	// ------------------------------------------
	const nodeCx = 460;
	const nodeCy = 155;
	const nodeR = 94;

	const leftStartX = 70;
	const leftBreakX = nodeCx - nodeR - 36;
	const rightStartX = nodeCx + nodeR + 36;
	const rightEndX = 850 + arrowNudge;

	const incomingCurrentX = interpolate(
		incomingArrowDraw,
		[0, 1],
		[leftStartX, leftBreakX],
		clamp
	);

	const outgoingCurrentX = interpolate(
		outgoingArrowDraw,
		[0, 1],
		[rightStartX, rightEndX],
		clamp
	);

	const incomingHeadVisible = incomingArrowDraw > 0.06;
	const outgoingHeadVisible = outgoingArrowDraw > 0.06;

	const markerText = 'AMAZON';
	const visibleChars = Math.max(
		0,
		Math.min(markerText.length, Math.floor(textWrite * markerText.length + 0.0001))
	);
	const drawnText = markerText.slice(0, visibleChars);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1A2026',
				opacity,
				fontFamily: '"Arial Black", Impact, -apple-system, BlinkMacSystemFont, sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '86%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '68px 20px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#39414B',
						border: '3px solid #4DD0E1',
						boxShadow: '0 8px 24px rgba(0,0,0,0.42)',
						borderRadius: 18,
						padding: '12px 32px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#4DD0E1',
							boxShadow: '0 0 10px rgba(77,208,225,0.6)',
						}}
					/>
					<div
						style={{
							color: '#F4F4F4',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						War Room Transfer
					</div>
				</div>

				{/* TIER 2 */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '24px 0',
						transform: `scale(${entrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 520,
							backgroundColor: '#39414B',
							border: '4px solid #4DD0E1',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.58)`,
							padding: '42px 32px 36px 32px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 24,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* glass glare sweep */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 150,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.11) 45%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.11) 55%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${glareSweep}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Row 1: headline only */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: 88,
								padding: '0 12px',
								textAlign: 'center',
							}}
						>
							<div
								style={{
									color: '#F4F4F4',
									fontSize: 58,
									lineHeight: 1.02,
									fontWeight: 1000,
									letterSpacing: 1,
									textTransform: 'uppercase',
								}}
							>
								Relay Through Platform
							</div>
						</div>

						{/* Row 2: isolated arrow lane + center node */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: 260,
								position: 'relative',
							}}
						>
							<div
								style={{
									width: 900,
									height: 250,
									position: 'relative',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<svg
									width="900"
									height="250"
									viewBox="0 0 900 250"
									style={{
										position: 'absolute',
										inset: 0,
										overflow: 'visible',
									}}
								>
									<defs>
										<filter id="softGlow">
											<feGaussianBlur stdDeviation="2.2" result="blur" />
											<feMerge>
												<feMergeNode in="blur" />
												<feMergeNode in="SourceGraphic" />
											</feMerge>
										</filter>
									</defs>

									{/* incoming segment */}
									<line
										x1={leftStartX}
										y1={nodeCy}
										x2={incomingCurrentX}
										y2={nodeCy}
										stroke="#F4F4F4"
										strokeWidth="16"
										strokeLinecap="round"
										filter="url(#softGlow)"
									/>

									{/* outgoing segment */}
									<line
										x1={rightStartX}
										y1={nodeCy}
										x2={outgoingCurrentX}
										y2={nodeCy}
										stroke="#F4F4F4"
										strokeWidth="16"
										strokeLinecap="round"
										filter="url(#softGlow)"
									/>

									{/* moving highlight along arrow */}
									{frame >= 34 && (
										<rect
											x={interpolate((frame * 8) % 180, [0, 180], [80, 760], clamp)}
											y={nodeCy - 12}
											width="120"
											height="24"
											rx="12"
											fill="rgba(255,138,61,0.34)"
										/>
									)}

									{/* incoming arrow head */}
									{incomingHeadVisible && (
										<polygon
											points={`${incomingCurrentX},${nodeCy} ${incomingCurrentX - 30},${nodeCy - 22} ${incomingCurrentX - 30},${nodeCy + 22}`}
											fill="#F4F4F4"
										/>
									)}

									{/* outgoing arrow head */}
									{outgoingHeadVisible && (
										<polygon
											points={`${outgoingCurrentX},${nodeCy} ${outgoingCurrentX - 30},${nodeCy - 22} ${outgoingCurrentX - 30},${nodeCy + 22}`}
											fill="#F4F4F4"
										/>
									)}

									{/* orange confirmation ring - around node, never over text */}
									<circle
										cx={nodeCx}
										cy={nodeCy}
										r={nodeR + 16 + handoffPulse * 6}
										fill="none"
										stroke="#FF8A3D"
										strokeWidth="10"
										strokeDasharray="520"
										strokeDashoffset={520 * (1 - Math.min(1, ringStamp))}
										opacity={Math.min(1, ringStamp * 1.15)}
										strokeLinecap="round"
									/>

									{/* soft smudge trail exiting right */}
									<ellipse
										cx={760 + smudgeTravel}
										cy={nodeCy + 8}
										rx="86"
										ry="18"
										fill={`rgba(244,244,244,${smudgeOpacity})`}
										transform={`rotate(-7 ${760 + smudgeTravel} ${nodeCy + 8})`}
									/>
								</svg>

								{/* center node container, isolated from arrow path */}
								<div
									style={{
										width: 188,
										height: 188,
										borderRadius: 999,
										backgroundColor: '#1A2026',
										border: '4px solid #FF8A3D',
										boxShadow: `0 0 ${18 + handoffPulse * 10}px rgba(255,138,61,0.35)`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										position: 'relative',
										zIndex: 5,
									}}
								>
									<div
										style={{
											color: '#F4F4F4',
											fontSize: 58,
											fontWeight: 1000,
											letterSpacing: 2,
											lineHeight: 1,
											textTransform: 'uppercase',
											transform: `scale(${inkShimmer})`,
											textShadow: '0 2px 0 rgba(0,0,0,0.28)',
											whiteSpace: 'nowrap',
										}}
									>
										{drawnText}
									</div>
								</div>
							</div>
						</div>

						{/* Row 3: takeaway pill only */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								minHeight: 70,
							}}
						>
							<div
								style={{
									backgroundColor: '#FF8A3D',
									color: '#1A2026',
									borderRadius: 16,
									padding: '12px 28px',
									fontSize: 24,
									fontWeight: 900,
									letterSpacing: 3,
									textTransform: 'uppercase',
									boxShadow: '0 8px 22px rgba(0,0,0,0.34)',
								}}
							>
								Value Passed Cleanly
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#39414B',
						border: '3px solid #FF8A3D',
						borderRadius: 18,
						padding: '16px 32px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.42)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F4F4F4',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2,
							textTransform: 'uppercase',
						}}
					>
						One strategic handoff. Zero clutter.
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}