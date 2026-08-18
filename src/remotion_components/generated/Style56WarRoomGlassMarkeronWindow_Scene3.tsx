import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style56WarRoomGlassMarkeronWindow_Scene3() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// =========================
	// BEAT 1: ENTRANCE
	// =========================
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 260, mass: 0.55},
	});

	const cardIn = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.7},
	});

	const tenIn = spring({
		frame: frame - 1,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.55},
	});

	const twentyIn = spring({
		frame: frame - 7,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.55},
	});

	const fiftyIn = spring({
		frame: frame - 13,
		fps,
		config: {damping: 9, stiffness: 280, mass: 0.52},
	});

	// =========================
	// BEAT 2: ACTIVE MARKER SURGE
	// =========================
	const progress = interpolate(frame, [30, 74], [0, 1], clamp);

	const row1Strike = interpolate(frame, [36, 46], [0, 1], clamp);
	const row2PauseGlow = interpolate(frame, [47, 58], [0, 1], clamp);
	const row3Burst = spring({
		frame: frame - 58,
		fps,
		config: {damping: 9, stiffness: 300, mass: 0.5},
	});

	const impactShake =
		frame >= 60 && frame <= 70 ? Math.sin((frame - 60) * 2.6) * 6 * (1 - (frame - 60) / 10) : 0;

	// Triple circle draws
	const circle1 = interpolate(frame, [60, 68], [0, 1], clamp);
	const circle2 = interpolate(frame, [66, 74], [0, 1], clamp);
	const circle3 = interpolate(frame, [72, 81], [0, 1], clamp);

	// =========================
	// BEAT 3: LIVING LOOP
	// =========================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const tilt = Math.sin(frame * 0.08) * 2.1;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 5;
	const glareX = interpolate((frame + 16) % 70, [0, 70], [-240, 920], clamp);
	const breathe50 = 1 + Math.sin(frame * 0.14) * 0.025;
	const circleWobble = Math.sin(frame * 0.11) * 1.4;
	const focusDrift = 0.35 + 0.65 * (0.5 + Math.sin(frame * 0.05) * 0.5);

	// Marker cursor path
	const markerVisible = frame >= 30 && frame <= 82;
	const markerX = interpolate(frame, [30, 82], [120, 690], clamp);
	const markerY = interpolate(
		frame,
		[30, 40, 50, 60, 70, 82],
		[250, 250, 338, 338, 428, 428],
		clamp
	);
	const markerScale = frame >= 60 && frame <= 70 ? 0.92 : 1;

	// Exit
	const exitUp = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -50], clamp);
	const eraseWipe = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [0, 1], clamp);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 7, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const strokeDash = (p: number, length: number) => `${length * (1 - p)} ${length}`;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1A2026',
				opacity,
				fontFamily: '"Arial Black", "Impact", "Helvetica Neue", sans-serif',
				color: '#F4F4F4',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Soft room haze */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					background:
						'radial-gradient(circle at 50% 30%, rgba(77,208,225,0.08), transparent 34%), radial-gradient(circle at 50% 85%, rgba(255,138,61,0.06), transparent 28%)',
					filter: `blur(${8 + (1 - focusDrift) * 10}px)`,
				}}
			/>

			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '86%',
					padding: '64px 20px',
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					alignItems: 'center',
					transform: `translateY(${exitUp}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${Math.sin(frame * 0.1) * 2}px)`,
						backgroundColor: '#39414B',
						border: '3px solid #4DD0E1',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: 999,
							backgroundColor: '#FF8A3D',
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#F4F4F4',
						}}
					>
						Commission Ladder
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
						position: 'relative',
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY + impactShake}px) rotate(${tilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 530,
							backgroundColor: 'rgba(57, 65, 75, 0.9)',
							border: '4px solid #4DD0E1',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.55)`,
							padding: '42px 42px 34px 42px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 24,
							position: 'relative',
							overflow: 'hidden',
							backdropFilter: 'blur(2px)',
						}}
					>
						{/* Glass glare */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.18), rgba(255,255,255,0.04))',
								transform: `translateX(${glareX}px) skewX(-24deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Room focus layer */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								background:
									'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00) 35%, rgba(77,208,225,0.05) 100%)',
								filter: `blur(${(1 - focusDrift) * 5}px)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Header label */}
						<div
							style={{
								fontSize: 24,
								fontWeight: 900,
								letterSpacing: 4,
								textTransform: 'uppercase',
								color: '#4DD0E1',
								textAlign: 'center',
							}}
						>
							Payout Climb
						</div>

						{/* Sole hero ladder with discrete rows */}
						<div
							style={{
								width: '100%',
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								gap: 26,
								position: 'relative',
							}}
						>
							{/* Row 1 */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									gap: 34,
									position: 'relative',
									minHeight: 96,
								}}
							>
								<div
									style={{
										fontSize: 72,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1,
										color: '#F4F4F4',
										transform: `scale(${0.88 + tenIn * 0.12}) rotate(${-1.2 + Math.sin(frame * 0.07) * 0.3}deg)`,
										textShadow: '0 2px 0 rgba(0,0,0,0.25)',
										position: 'relative',
									}}
								>
									10%
								</div>

								<div
									style={{
										fontSize: 68,
										fontWeight: 1000,
										lineHeight: 1,
										color: '#FF8A3D',
										transform: `scale(${0.8 + Math.min(progress, 0.35) * 0.45})`,
									}}
								>
									→
								</div>

								<div
									style={{
										width: 160,
										height: 24,
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<svg width="160" height="24" viewBox="0 0 160 24">
										<path
											d="M6 12 C40 8, 72 16, 112 12"
											fill="none"
											stroke="#4DD0E1"
											strokeWidth="6"
											strokeLinecap="round"
											strokeDasharray={strokeDash(Math.min(progress * 1.4, 1), 180)}
										/>
										<path
											d="M108 8 L126 12 L108 16"
											fill="none"
											stroke="#4DD0E1"
											strokeWidth="6"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeDasharray={strokeDash(Math.min(progress * 1.4, 1), 60)}
										/>
									</svg>
								</div>

								<div
									style={{
										fontSize: 72,
										fontWeight: 1000,
										lineHeight: 1,
										letterSpacing: 1,
										color: '#F4F4F4',
										transform: `scale(${0.88 + twentyIn * 0.12}) rotate(${0.9 + Math.sin(frame * 0.08) * 0.3}deg)`,
										textShadow: '0 2px 0 rgba(0,0,0,0.25)',
									}}
								>
									20%
								</div>

								{/* clean strike placed below text baseline area, not through letters */}
								<div
									style={{
										position: 'absolute',
										left: '16%',
										top: '76%',
										width: 120,
										height: 20,
										opacity: row1Strike,
										pointerEvents: 'none',
									}}
								>
									<svg width="120" height="20" viewBox="0 0 120 20">
										<path
											d="M6 12 C28 4, 54 18, 114 10"
											fill="none"
											stroke="#FF8A3D"
											strokeWidth="7"
											strokeLinecap="round"
											strokeDasharray={strokeDash(row1Strike, 150)}
										/>
									</svg>
								</div>
							</div>

							{/* Row 2 */}
							<div
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									gap: 34,
									minHeight: 110,
									position: 'relative',
								}}
							>
								<div
									style={{
										fontSize: 70,
										fontWeight: 1000,
										lineHeight: 1,
										color: '#F4F4F4',
										opacity: 0.22,
										transform: 'rotate(-1deg)',
									}}
								>
									10%
								</div>

								<div
									style={{
										fontSize: 76,
										fontWeight: 1000,
										lineHeight: 1,
										color: '#4DD0E1',
										filter: `drop-shadow(0 0 ${10 + row2PauseGlow * 16}px rgba(77,208,225,0.55))`,
										transform: `scale(${1 + row2PauseGlow * 0.06}) rotate(${Math.sin(frame * 0.09) * 0.5}deg)`,
									}}
								>
									20%
								</div>

								<div
									style={{
										fontSize: 68,
										fontWeight: 1000,
										lineHeight: 1,
										color: '#FF8A3D',
										transform: `scale(${0.9 + progress * 0.16})`,
									}}
								>
									→
								</div>

								<div
									style={{
										width: 170,
										height: 24,
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<svg width="170" height="24" viewBox="0 0 170 24">
										<path
											d="M8 12 C44 9, 76 15, 126 12"
											fill="none"
											stroke="#FF8A3D"
											strokeWidth="7"
											strokeLinecap="round"
											strokeDasharray={strokeDash(Math.max((progress - 0.33) * 1.6, 0), 190)}
										/>
										<path
											d="M122 8 L142 12 L122 16"
											fill="none"
											stroke="#FF8A3D"
											strokeWidth="7"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeDasharray={strokeDash(Math.max((progress - 0.33) * 1.6, 0), 62)}
										/>
									</svg>
								</div>

								<div
									style={{
										fontSize: 70,
										fontWeight: 1000,
										lineHeight: 1,
										color: '#F4F4F4',
										opacity: 0.16,
										transform: 'rotate(1deg)',
									}}
								>
									50%
								</div>
							</div>

							{/* Row 3 hero */}
							<div
								style={{
									width: '100%',
									minHeight: 168,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									position: 'relative',
								}}
							>
								<div
									style={{
										position: 'relative',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '22px 42px',
										transform: `scale(${(0.9 + fiftyIn * 0.18 + row3Burst * 0.08) * breathe50}) rotate(${Math.sin(frame * 0.08) * 0.35}deg)`,
									}}
								>
									<div
										style={{
											fontSize: 84,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: 1,
											color: '#FF8A3D',
											textShadow:
												'0 3px 0 rgba(0,0,0,0.28), 0 0 24px rgba(255,138,61,0.18)',
											position: 'relative',
											zIndex: 2,
										}}
									>
										50%
									</div>

									<div
										style={{
											marginTop: 16,
											fontSize: 22,
											fontWeight: 900,
											letterSpacing: 4,
											textTransform: 'uppercase',
											color: '#F4F4F4',
											opacity: 0.95,
											zIndex: 2,
										}}
									>
										Top Commission
									</div>

									{/* Triple circles around container, never touching text */}
									<svg
										width="420"
										height="190"
										viewBox="0 0 420 190"
										style={{
											position: 'absolute',
											inset: '50% auto auto 50%',
											transform: `translate(-50%, -50%) rotate(${circleWobble}deg)`,
											overflow: 'visible',
											pointerEvents: 'none',
											zIndex: 1,
										}}
									>
										<ellipse
											cx="210"
											cy="95"
											rx="128"
											ry="56"
											fill="none"
											stroke="#FF8A3D"
											strokeWidth="7"
											strokeLinecap="round"
											strokeDasharray={strokeDash(circle1, 600)}
											opacity={0.98}
										/>
										<ellipse
											cx="210"
											cy="95"
											rx="145"
											ry="68"
											fill="none"
											stroke="#FF8A3D"
											strokeWidth="5"
											strokeLinecap="round"
											strokeDasharray={strokeDash(circle2, 690)}
											opacity={0.88}
											transform="rotate(-4 210 95)"
										/>
										<ellipse
											cx="210"
											cy="95"
											rx="160"
											ry="79"
											fill="none"
											stroke="#FF8A3D"
											strokeWidth="4"
											strokeLinecap="round"
											strokeDasharray={strokeDash(circle3, 760)}
											opacity={0.8}
											transform="rotate(5 210 95)"
										/>
									</svg>
								</div>
							</div>
						</div>

						{/* Marker cursor */}
						{markerVisible && (
							<div
								style={{
									position: 'absolute',
									left: markerX,
									top: markerY,
									transform: `translate(-50%, -50%) rotate(14deg) scale(${markerScale})`,
									filter: 'drop-shadow(0 8px 10px rgba(0,0,0,0.35))',
									zIndex: 5,
									pointerEvents: 'none',
								}}
							>
								<svg width="88" height="88" viewBox="0 0 88 88">
									<g transform="translate(18 18)">
										<rect
											x="10"
											y="6"
											width="12"
											height="42"
											rx="5"
											fill="#F4F4F4"
											transform="rotate(28 16 27)"
										/>
										<rect
											x="16"
											y="0"
											width="14"
											height="38"
											rx="5"
											fill="#39414B"
											stroke="#F4F4F4"
											strokeWidth="2"
											transform="rotate(28 23 19)"
										/>
										<path
											d="M32 10 L42 16 L29 25 Z"
											fill="#FF8A3D"
											stroke="#F4F4F4"
											strokeWidth="2"
										/>
									</g>
								</svg>
							</div>
						)}

						{/* Erase wipe exit */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								left: `${eraseWipe * 100}%`,
								width: '120%',
								background:
									'linear-gradient(90deg, rgba(244,244,244,0) 0%, rgba(244,244,244,0.08) 18%, rgba(244,244,244,0.92) 44%, rgba(244,244,244,1) 55%, rgba(244,244,244,0.10) 78%, rgba(244,244,244,0) 100%)',
								transform: 'translateX(-100%)',
								pointerEvents: 'none',
								mixBlendMode: 'screen',
							}}
						/>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${cardIn}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FF8A3D',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.36)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#1A2026',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 3,
							textTransform: 'uppercase',
						}}
					>
						Climb to the biggest cut
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}