import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene5() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1 — HARD SNAP ENTRANCE
	// ==========================================
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.62,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {
			damping: 11,
			stiffness: 280,
			mass: 0.5,
		},
	});

	const folderRise = interpolate(frame, [0, 9, 16], [420, -38, 0], clamp);
	const folderScale = interpolate(frame, [0, 9, 16], [0.74, 1.08, 1], clamp);
	const slapRotate = interpolate(frame, [0, 10, 16], [0, -2.2, -0.8], clamp);

	// ==========================================
	// BEAT 2 — TABS POP OUT + CURSOR THUNKS
	// ==========================================
	const compliancePop = spring({
		frame: frame - 24,
		fps,
		config: {damping: 14, stiffness: 320, mass: 0.42},
	});
	const legalPop = spring({
		frame: frame - 34,
		fps,
		config: {damping: 14, stiffness: 320, mass: 0.42},
	});
	const bookkeepingPop = spring({
		frame: frame - 44,
		fps,
		config: {damping: 14, stiffness: 320, mass: 0.42},
	});

	const thicknessBase =
		28 + compliancePop * 20 + legalPop * 22 + bookkeepingPop * 24;

	const click1 = frame >= 56 && frame <= 61;
	const click2 = frame >= 66 && frame <= 71;
	const click3 = frame >= 76 && frame <= 81;
	const isClicking = click1 || click2 || click3;

	const cursorVisible = frame >= 48 && frame <= 92;
	const cursorX = interpolate(frame, [48, 58], [220, 34], clamp);
	const cursorY = interpolate(frame, [48, 58], [120, 8], clamp);

	const clickBounce =
		(click1 ? Math.sin((frame - 56) * 1.6) * 10 : 0) +
		(click2 ? Math.sin((frame - 66) * 1.6) * 10 : 0) +
		(click3 ? Math.sin((frame - 76) * 1.6) * 10 : 0);

	const thunkOffset = isClicking ? 14 : 0;

	// ==========================================
	// BEAT 3 — CONTINUOUS LIVING LOOP
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.085) * 1.8;
	const shadowPulse = 16 + Math.sin(frame * 0.18) * 4;

	const resistanceShake =
		frame >= 84
			? Math.sin(frame * 0.92) * 2.2 + Math.sin(frame * 1.77) * 1.1
			: 0;

	const shineOffset = interpolate((frame + 10) % 62, [0, 62], [-260, 920], clamp);
	const shineOpacity = frame >= 82 ? 0.22 : 0.12;

	// ==========================================
	// EXIT
	// ==========================================
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -70],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// Folder layer offsets
	const layer1Y = thicknessBase * 0.42;
	const layer2Y = thicknessBase * 0.78;
	const layer3Y = thicknessBase * 1.1;

	// Tab transforms
	const complianceX = interpolate(compliancePop, [0, 1], [0, 84], clamp);
	const legalX = interpolate(legalPop, [0, 1], [0, 152], clamp);
	const bookkeepingX = interpolate(bookkeepingPop, [0, 1], [0, 228], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				fontFamily:
					'"Arial Black", Impact, "Helvetica Neue", "Inter", sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 960,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '56px 18px 50px 18px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.11) * 2}px)`,
						backgroundColor: '#FF90E8',
						border: '4px solid #000000',
						boxShadow: '10px 10px 0 #000000',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							color: '#000000',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							lineHeight: 1,
						}}
					>
						Backend Burden
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
						margin: '18px 0',
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							position: 'relative',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							transform: `translateY(${folderRise + hoverY + thunkOffset}px) scale(${folderScale}) rotate(${slapRotate + hoverTilt + resistanceShake * 0.18}deg)`,
						}}
					>
						{/* Back layers */}
						<div
							style={{
								position: 'absolute',
								width: '92%',
								height: 470,
								borderRadius: 28,
								backgroundColor: '#23A094',
								border: '4px solid #000000',
								transform: `translate(${34}px, ${layer3Y + shadowPulse + clickBounce * 0.25}px)`,
								boxSizing: 'border-box',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								width: '92%',
								height: 470,
								borderRadius: 28,
								backgroundColor: '#F1F333',
								border: '4px solid #000000',
								transform: `translate(${22}px, ${layer2Y}px)`,
								boxSizing: 'border-box',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								width: '92%',
								height: 470,
								borderRadius: 28,
								backgroundColor: '#FF90E8',
								border: '4px solid #000000',
								transform: `translate(${10}px, ${layer1Y}px)`,
								boxSizing: 'border-box',
							}}
						/>

						{/* Main hero folder card */}
						<div
							style={{
								width: '92%',
								minHeight: 520,
								backgroundColor: '#23A094',
								border: '5px solid #000000',
								boxShadow: `16px ${16 + shadowPulse}px 0 #000000`,
								borderRadius: 32,
								position: 'relative',
								overflow: 'hidden',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								padding: '42px 34px 34px 34px',
								gap: 24,
							}}
						>
							{/* Main folder tab */}
							<div
								style={{
									position: 'absolute',
									top: -4,
									left: 34,
									width: 320,
									height: 82,
									backgroundColor: '#F1F333',
									border: '5px solid #000000',
									borderBottom: '0 solid transparent',
									borderTopLeftRadius: 24,
									borderTopRightRadius: 24,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxSizing: 'border-box',
									zIndex: 5,
								}}
							>
								<div
									style={{
										color: '#000000',
										fontSize: 28,
										fontWeight: 900,
										letterSpacing: 1.5,
										textTransform: 'uppercase',
										lineHeight: 1,
									}}
								>
									PAPERWORK
								</div>
							</div>

							{/* Popping tabs */}
							<div
								style={{
									position: 'absolute',
									top: 82,
									left: 22,
									right: 22,
									height: 64,
									pointerEvents: 'none',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: `${complianceX}px`,
										top: 0,
										backgroundColor: '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 16,
										padding: '10px 18px',
										transform: `scale(${0.85 + compliancePop * 0.15})`,
										boxShadow: `${6 + compliancePop * 8}px ${6 + compliancePop * 8}px 0 #000000`,
									}}
								>
									<div
										style={{
											color: '#000000',
											fontSize: 19,
											fontWeight: 900,
											letterSpacing: 1.2,
											textTransform: 'uppercase',
											lineHeight: 1,
										}}
									>
										Compliance
									</div>
								</div>

								<div
									style={{
										position: 'absolute',
										left: `${legalX}px`,
										top: 0,
										backgroundColor: '#FF90E8',
										border: '4px solid #000000',
										borderRadius: 16,
										padding: '10px 18px',
										transform: `scale(${0.85 + legalPop * 0.15})`,
										boxShadow: `${6 + legalPop * 8}px ${6 + legalPop * 8}px 0 #000000`,
									}}
								>
									<div
										style={{
											color: '#000000',
											fontSize: 19,
											fontWeight: 900,
											letterSpacing: 1.2,
											textTransform: 'uppercase',
											lineHeight: 1,
										}}
									>
										Legal
									</div>
								</div>

								<div
									style={{
										position: 'absolute',
										left: `${bookkeepingX}px`,
										top: 0,
										backgroundColor: '#F1F333',
										border: '4px solid #000000',
										borderRadius: 16,
										padding: '10px 18px',
										transform: `scale(${0.85 + bookkeepingPop * 0.15})`,
										boxShadow: `${6 + bookkeepingPop * 8}px ${6 + bookkeepingPop * 8}px 0 #000000`,
									}}
								>
									<div
										style={{
											color: '#000000',
											fontSize: 19,
											fontWeight: 900,
											letterSpacing: 1.2,
											textTransform: 'uppercase',
											lineHeight: 1,
										}}
									>
										Bookkeeping
									</div>
								</div>
							</div>

							{/* Traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: 96,
									bottom: 26,
									width: 138,
									backgroundColor: `rgba(255,255,255,${shineOpacity})`,
									transform: `translateX(${shineOffset}px) skewX(-24deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Discrete text layout rows — zero collision */}
							<div
								style={{
									marginTop: 84,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 24,
									width: '100%',
									textAlign: 'center',
									zIndex: 3,
								}}
							>
								<div
									style={{
										backgroundColor: '#FFF8E7',
										border: '4px solid #000000',
										borderRadius: 22,
										padding: '16px 26px',
										boxShadow: '10px 10px 0 #000000',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											color: '#000000',
											fontSize: 72,
											fontWeight: 1000,
											letterSpacing: -1.5,
											textTransform: 'uppercase',
											lineHeight: 0.95,
										}}
									>
										Trap
									</div>
								</div>

								<div
									style={{
										backgroundColor: '#F1F333',
										border: '4px solid #000000',
										borderRadius: 20,
										padding: '16px 26px',
										boxShadow: '10px 10px 0 #000000',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 12,
										maxWidth: '92%',
									}}
								>
									<div
										style={{
											color: '#000000',
											fontSize: 28,
											fontWeight: 900,
											letterSpacing: 2.2,
											textTransform: 'uppercase',
											lineHeight: 1,
										}}
									>
										Paperwork Trap
									</div>
									<div
										style={{
											width: '100%',
											height: 5,
											backgroundColor: '#000000',
											borderRadius: 999,
										}}
									/>
								</div>

								<div
									style={{
										backgroundColor: '#FF90E8',
										border: '4px solid #000000',
										borderRadius: 18,
										padding: '14px 22px',
										boxShadow: '10px 10px 0 #000000',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										maxWidth: '94%',
									}}
								>
									<div
										style={{
											color: '#000000',
											fontSize: 26,
											fontWeight: 900,
											letterSpacing: 1.2,
											lineHeight: 1.15,
											textTransform: 'uppercase',
										}}
									>
										More tabs. More friction. Nothing moves.
									</div>
								</div>
							</div>
						</div>

						{/* Cursor */}
						{cursorVisible && (
							<div
								style={{
									position: 'absolute',
									right: '14%',
									top: '18%',
									transform: `translate(${cursorX}px, ${cursorY}px) scale(${isClicking ? 0.84 : 1}) rotate(-8deg)`,
									zIndex: 40,
									pointerEvents: 'none',
									filter: `drop-shadow(${isClicking ? 4 : 8}px ${isClicking ? 4 : 8}px 0px #000000)`,
								}}
							>
								<svg width="76" height="76" viewBox="0 0 24 24" fill="none">
									<path
										d="M4 3.8L11.4 20.6L13.8 13.6L20.8 11.2L4 3.8Z"
										fill="#FFF8E7"
										stroke="#000000"
										strokeWidth="2.3"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						)}
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1.3) * 3}px)`,
						backgroundColor: '#F1F333',
						border: '4px solid #000000',
						boxShadow: '12px 12px 0 #000000',
						borderRadius: 18,
						padding: '14px 28px',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#000000',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 1.8,
							textTransform: 'uppercase',
							lineHeight: 1.05,
						}}
					>
						Wrong work keeps the real work stuck
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}