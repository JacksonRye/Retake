import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene19() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// BEAT 1 — violent spring entrance, knob pinned at MAX.
	const heroEntrance = spring({
		frame,
		fps,
		config: {
			damping: 10,
			stiffness: 260,
			mass: 0.58,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.5,
		},
	});

	const entranceX = interpolate(heroEntrance, [0, 1], [900, 0]);
	const entranceScale = interpolate(heroEntrance, [0, 1], [0.78, 1]);
	const entranceShadow = interpolate(heroEntrance, [0, 1], [34, 13]);

	// BEAT 2 — cursor sharply drags MAX down to CONTROLLED.
	const dragProgress = interpolate(frame, [34, 66], [0, 1], clamp);
	const knobStartX = 600;
	const knobEndX = 210;

	// BEAT 3 — tiny stepped mechanical corrections.
	const correctionRaw =
		frame >= 84 ? Math.round(Math.sin(frame * 0.31) * 2) * 1.5 : 0;
	const knobX =
		interpolate(dragProgress, [0, 1], [knobStartX, knobEndX]) + correctionRaw;

	const straightness = interpolate(frame, [38, 66], [0, 1], clamp);
	const jaggedAmplitude = 17 * (1 - straightness);

	const trackPoints = Array.from({length: 15}, (_, index) => {
		const x = 40 + index * 40;
		const alternating = index % 2 === 0 ? -1 : 1;
		const edgeMultiplier = index === 0 || index === 14 ? 0 : 1;
		const y = 70 + alternating * jaggedAmplitude * edgeMultiplier;
		return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
	}).join(' ');

	const transformed = frame >= 62;
	const trackColor = transformed ? '#23A094' : '#000000';
	const cursorVisible = frame >= 24 && frame <= 78;
	const cursorArrivalX = interpolate(frame, [24, 35], [165, 23], clamp);
	const cursorArrivalY = interpolate(frame, [24, 35], [110, 20], clamp);
	const cursorClicking =
		(frame >= 35 && frame <= 39) || (frame >= 63 && frame <= 68);

	const dragThunk = frame >= 63 && frame <= 68 ? 8 : 0;

	// BEAT 3 — continuously alive physical loop.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.25;
	const rhythmicClick = frame >= 84 && frame % 15 < 3;
	const shadowPulse =
		entranceShadow +
		Math.sin(frame * 0.18) * 3 -
		(rhythmicClick ? 7 : 0) -
		(cursorClicking ? 5 : 0);

	const shineOffset = interpolate(
		(frame + 18) % 65,
		[0, 65],
		[-180, 900],
		clamp,
	);

	const selectedFlash =
		frame >= 84 && Math.floor((frame - 84) / 7) % 2 === 0;

	const exitX = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames],
		[0, -100],
		clamp,
	);
	const contentOpacity = interpolate(
		frame,
		[0, 4, durationInFrames - 8, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
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
					opacity: contentOpacity,
					transform: `translateX(${exitX}px)`,
				}}
			>
				{/* TIER 1 — CATEGORY BADGE */}
				<div
					style={{
						flex: '15 1 0',
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
							justifyContent: 'center',
							gap: 16,
							padding: '10px 24px',
							backgroundColor: '#F1F333',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: '7px 7px 0 #000000',
							transform: `scale(${badgeEntrance}) rotate(${
								Math.sin(frame * 0.1) * 0.8
							}deg)`,
						}}
					>
						<span
							style={{
								width: 12,
								height: 12,
								flexShrink: 0,
								backgroundColor: '#23A094',
								border: '3px solid #000000',
								borderRadius: 2,
							}}
						/>
						<span
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
							Intensity control
						</span>
					</div>
				</div>

				{/* TIER 2 — ONE HERO SLIDER */}
				<div
					style={{
						flex: '65 1 0',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: '82%',
							maxWidth: 820,
							minWidth: 680,
							position: 'relative',
							transform: `translateX(${entranceX}px) translateY(${
								hoverY + dragThunk
							}px) rotate(${hoverTilt}deg) scale(${entranceScale})`,
							transformOrigin: 'center',
						}}
					>
						<div
							style={{
								width: '100%',
								padding: '32px 46px 38px',
								boxSizing: 'border-box',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 16,
								position: 'relative',
								overflow: 'hidden',
								backgroundColor: '#FF90E8',
								border: '6px solid #000000',
								borderRadius: 22,
								boxShadow: `${Math.max(4, shadowPulse)}px ${Math.max(
									4,
									shadowPulse,
								)}px 0 #000000`,
							}}
						>
							{/* Traveling shine */}
							<div
								style={{
									position: 'absolute',
									top: -20,
									bottom: -20,
									left: 0,
									width: 95,
									backgroundColor: '#FFF8E7',
									opacity: 0.4,
									transform: `translateX(${shineOffset}px) skewX(-24deg)`,
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									position: 'relative',
									zIndex: 2,
									fontSize: 34,
									fontWeight: 950,
									letterSpacing: 3,
									lineHeight: 1,
									textTransform: 'uppercase',
									textDecoration: 'underline',
									textDecorationThickness: 5,
									textUnderlineOffset: 8,
								}}
							>
								Old habits
							</div>

							<div
								style={{
									width: 640,
									height: 140,
									position: 'relative',
									zIndex: 3,
									flexShrink: 0,
								}}
							>
								<svg
									width="640"
									height="140"
									viewBox="0 0 640 140"
									style={{
										position: 'absolute',
										inset: 0,
										overflow: 'visible',
									}}
								>
									<path
										d={trackPoints}
										fill="none"
										stroke="#000000"
										strokeWidth="22"
										strokeLinecap="square"
										strokeLinejoin="miter"
									/>
									<path
										d={trackPoints}
										fill="none"
										stroke={trackColor}
										strokeWidth="12"
										strokeLinecap="square"
										strokeLinejoin="miter"
									/>
								</svg>

								<div
									style={{
										position: 'absolute',
										left: knobX,
										top: 70,
										width: 58,
										height: 58,
										boxSizing: 'border-box',
										backgroundColor: transformed ? '#23A094' : '#F1F333',
										border: '6px solid #000000',
										borderRadius: 8,
										boxShadow: `${rhythmicClick ? 3 : 8}px ${
											rhythmicClick ? 3 : 8
										}px 0 #000000`,
										transform: `translate(-50%, -50%) rotate(${
											Math.sin(frame * 0.24) * 1.5
										}deg)`,
									}}
								/>

								{cursorVisible ? (
									<div
										style={{
											position: 'absolute',
											left: knobX,
											top: 70,
											zIndex: 20,
											transform: `translate(${cursorArrivalX}px, ${cursorArrivalY}px) scale(${
												cursorClicking ? 0.84 : 1
											})`,
											transformOrigin: 'top left',
											filter: `drop-shadow(${
												cursorClicking ? 3 : 8
											}px ${cursorClicking ? 3 : 8}px 0 #23A094)`,
										}}
									>
										<svg
											width="78"
											height="78"
											viewBox="0 0 24 24"
											fill="#000000"
											stroke="#FFF8E7"
											strokeWidth="1.6"
											strokeLinejoin="miter"
										>
											<path d="M3.5 2.8L20.6 11l-7.3 2.3-3.1 7.1L3.5 2.8z" />
										</svg>
									</div>
								) : null}
							</div>

							<div
								style={{
									position: 'relative',
									zIndex: 3,
									minWidth: 245,
									padding: '11px 26px',
									boxSizing: 'border-box',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									backgroundColor: selectedFlash ? '#F1F333' : '#23A094',
									color: '#000000',
									border: '4px solid #000000',
									borderRadius: 10,
									boxShadow: `${rhythmicClick ? 2 : 6}px ${
										rhythmicClick ? 2 : 6
									}px 0 #000000`,
									fontSize: 23,
									fontWeight: 950,
									letterSpacing: 4,
									lineHeight: 1,
									textTransform: 'uppercase',
									transform: `translateY(${
										rhythmicClick ? 4 : 0
									}px) rotate(${Math.sin(frame * 0.15) * 0.5}deg)`,
								}}
							>
								Controlled
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 — PUNCHLINE */}
				<div
					style={{
						flex: '20 1 0',
						width: '100%',
						display: 'flex',
						alignItems: 'flex-end',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							padding: '14px 30px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 12,
							boxShadow: `${6 + Math.sin(frame * 0.18) * 2}px ${
								6 + Math.sin(frame * 0.18) * 2
							}px 0 #23A094`,
							fontSize: 23,
							fontWeight: 950,
							letterSpacing: 2.5,
							lineHeight: 1,
							textAlign: 'center',
							textTransform: 'uppercase',
							textDecoration: 'underline',
							textDecorationColor: '#FF90E8',
							textDecorationThickness: 4,
							textUnderlineOffset: 6,
							transform: `scale(${heroEntrance}) translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px)`,
						}}
					>
						Change the setting. Keep the control.
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}