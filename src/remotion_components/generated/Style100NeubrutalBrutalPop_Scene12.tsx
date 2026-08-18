import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style100NeubrutalBrutalPop_Scene12() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1 — book slams into frame with a short spring overshoot.
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 11,
			stiffness: 250,
			mass: 0.58,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 10,
			stiffness: 280,
			mass: 0.48,
		},
	});

	const slamY = interpolate(frame, [0, 9, 14, 20], [-720, 24, -9, 0], clamp);
	const slamCompression = interpolate(
		frame,
		[0, 9, 12, 18],
		[0.8, 0.8, 1.07, 1],
		clamp,
	);
	const slamShadow = interpolate(frame, [0, 9, 13, 22], [3, 3, 23, 13], clamp);

	// Beat 2 — one rigid hinge opening and rapidly advancing reading cadence.
	const opening = interpolate(frame, [31, 43], [0, 1], clamp);
	const closing = interpolate(frame, [122, 130], [1, 0], clamp);
	const bookOpen = Math.min(opening, closing);

	const counterStep = Math.max(
		1,
		Math.min(7, Math.floor(interpolate(frame, [43, 64], [1, 8], clamp))),
	);
	const counterLabel = frame >= 64 ? 'EVERY DAY' : `DAY ${counterStep}`;

	const counterPunch = spring({
		frame: frame - 62,
		fps,
		config: {
			damping: 9,
			stiffness: 320,
			mass: 0.42,
		},
	});

	const underlineStamp = interpolate(frame, [64, 69], [0, 1], clamp);
	const underlineImpact = interpolate(
		frame,
		[64, 68, 73],
		[0, 8, 0],
		clamp,
	);

	// Beat 3 — continuously living mechanical motion.
	const hoverY = Math.sin(frame * 0.12) * 6;
	const hoverTilt = Math.sin(frame * 0.08) * 1.35;
	const shadowPulse =
		slamShadow + Math.sin(frame * 0.18) * (frame >= 80 ? 3 : 1);
	const underlinePulse =
		frame >= 80 ? 1 + Math.sin(frame * 0.2) * 0.055 : 1;

	const flutterTick =
		frame >= 80 && frame < 123
			? [0, -3.2, 1.5, -1.2][Math.floor(frame / 4) % 4]
			: 0;

	const pageLift =
		frame >= 80 && frame < 123
			? [0, 5, -2, 3][Math.floor(frame / 5) % 4]
			: 0;

	const shineOffset =
		frame >= 80
			? interpolate((frame - 80) % 48, [0, 48], [-260, 920], clamp)
			: -300;

	const exitY = interpolate(
		frame,
		[durationInFrames - 7, durationInFrames],
		[0, 520],
		clamp,
	);
	const exitRotation = interpolate(
		frame,
		[durationInFrames - 7, durationInFrames],
		[0, 8],
		clamp,
	);
	const opacity = interpolate(
		frame,
		[0, 4, durationInFrames - 3, durationInFrames],
		[0, 1, 1, 0],
		clamp,
	);

	const closedWidthScale = 0.58;
	const bookScaleX =
		closedWidthScale + (1 - closedWidthScale) * bookOpen;

	const coverContentOpacity = interpolate(bookOpen, [0.35, 0.58], [1, 0], clamp);
	const pageContentOpacity = interpolate(bookOpen, [0.52, 0.72], [0, 1], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FFF8E7',
				opacity,
				fontFamily:
					'"Arial Black", "Helvetica Neue", Impact, Arial, sans-serif',
				color: '#000000',
				padding: '80px 20px',
				boxSizing: 'border-box',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 16,
				}}
			>
				{/* Tier 1 — top 15% */}
				<div
					style={{
						flex: '0 0 15%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 12,
							padding: '12px 26px',
							backgroundColor: '#FF90E8',
							border: '4px solid #000000',
							borderRadius: 14,
							boxShadow: '7px 7px 0 #000000',
							transform: `translateY(${
								Math.sin(frame * 0.1) * 3
							}px) scale(${badgeEntrance}) rotate(${
								Math.sin(frame * 0.075) * 0.7
							}deg)`,
							transformOrigin: 'center',
						}}
					>
						<span
							style={{
								width: 12,
								height: 12,
								flex: '0 0 auto',
								borderRadius: '50%',
								backgroundColor: '#000000',
							}}
						/>
						<span
							style={{
								fontSize: 20,
								fontWeight: 950,
								lineHeight: 1,
								letterSpacing: 3.5,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							Daily Ritual
						</span>
					</div>
				</div>

				{/* Tier 2 — center 65%, exactly one hero book */}
				<div
					style={{
						flex: '1 1 65%',
						width: '100%',
						minHeight: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						perspective: 1400,
					}}
				>
					<div
						style={{
							position: 'relative',
							width: '88%',
							maxWidth: 840,
							height: 450,
							transform: `
								translateY(${slamY + hoverY + exitY}px)
								rotate(${hoverTilt + exitRotation}deg)
								scale(${entrance * slamCompression})
							`,
							transformOrigin: 'center',
						}}
					>
						{/* One oversized daily-reading book */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								display: 'flex',
								transform: `scaleX(${bookScaleX})`,
								transformOrigin: 'center',
								backgroundColor: '#F1F333',
								border: '7px solid #000000',
								borderRadius: 24,
								boxShadow: `${shadowPulse}px ${shadowPulse}px 0 #000000`,
								overflow: 'hidden',
							}}
						>
							{/* Closed-cover title */}
							<div
								style={{
									position: 'absolute',
									inset: 0,
									zIndex: 8,
									opacity: coverContentOpacity,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 16,
									backgroundColor: '#F1F333',
								}}
							>
								<div
									style={{
										fontSize: 68,
										fontWeight: 950,
										lineHeight: 0.94,
										letterSpacing: -2,
										textAlign: 'center',
										textTransform: 'uppercase',
									}}
								>
									DAILY
									<br />
									READING
								</div>
								<div
									style={{
										padding: '9px 20px',
										backgroundColor: '#000000',
										color: '#FFF8E7',
										borderRadius: 9,
										fontSize: 18,
										fontWeight: 950,
										letterSpacing: 3,
										textTransform: 'uppercase',
									}}
								>
									OPEN ME
								</div>
							</div>

							{/* Left page */}
							<div
								style={{
									position: 'relative',
									width: '50%',
									height: '100%',
									backgroundColor: '#FFF8E7',
									borderRight: '4px solid #000000',
									boxSizing: 'border-box',
									transform: `translateY(${pageLift}px) skewY(${
										flutterTick * 0.08
									}deg)`,
									transformOrigin: 'right center',
									opacity: pageContentOpacity,
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: '38px 32px',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'space-between',
										gap: 16,
									}}
								>
									<div
										style={{
											fontSize: 21,
											fontWeight: 950,
											letterSpacing: 3,
											textTransform: 'uppercase',
										}}
									>
										SHOW UP
									</div>
									<div
										style={{
											fontSize: 78,
											fontWeight: 950,
											lineHeight: 0.9,
											letterSpacing: -4,
											textTransform: 'uppercase',
										}}
									>
										READ.
										<br />
										REFLECT.
									</div>
									<div
										style={{
											height: 14,
											width: '72%',
											backgroundColor: '#FF90E8',
											border: '3px solid #000000',
											borderRadius: 6,
										}}
									/>
								</div>
							</div>

							{/* Right page and active counter */}
							<div
								style={{
									position: 'relative',
									width: '50%',
									height: '100%',
									backgroundColor: '#FFF8E7',
									boxSizing: 'border-box',
									transform: `translateY(${-pageLift * 0.6}px) skewY(${
										-flutterTick * 0.09
									}deg)`,
									transformOrigin: 'left center',
									opacity: pageContentOpacity,
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: '34px 28px',
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										justifyContent: 'center',
										gap: 16,
									}}
								>
									<div
										style={{
											padding: '8px 16px',
											backgroundColor: '#FF90E8',
											border: '3px solid #000000',
											borderRadius: 10,
											boxShadow: '4px 4px 0 #000000',
											fontSize: 17,
											fontWeight: 950,
											letterSpacing: 2.5,
											textTransform: 'uppercase',
										}}
									>
										KEEP THE RHYTHM
									</div>

									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											alignItems: 'center',
											gap: 16,
											transform: `scale(${
												frame >= 62 ? counterPunch : 1
											})`,
										}}
									>
										<div
											style={{
												fontSize:
													counterLabel === 'EVERY DAY' ? 56 : 72,
												fontWeight: 950,
												lineHeight: 0.92,
												letterSpacing:
													counterLabel === 'EVERY DAY' ? -2 : -4,
												textAlign: 'center',
												whiteSpace: 'nowrap',
												textTransform: 'uppercase',
											}}
										>
											{counterLabel}
										</div>

										<div
											style={{
												width: '100%',
												height: 18,
												backgroundColor: '#23A094',
												border: '3px solid #000000',
												borderRadius: 7,
												transform: `translateY(${underlineImpact}px) scaleX(${
													underlineStamp * underlinePulse
												})`,
												transformOrigin: 'left center',
												boxShadow: '4px 4px 0 #000000',
											}}
										/>
									</div>
								</div>
							</div>

							{/* Pink traveling cover sheen */}
							<div
								style={{
									position: 'absolute',
									zIndex: 20,
									top: -90,
									bottom: -90,
									left: 0,
									width: 105,
									backgroundColor: 'rgba(255, 144, 232, 0.72)',
									borderLeft: '4px solid rgba(0,0,0,0.12)',
									borderRight: '4px solid rgba(0,0,0,0.12)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>
						</div>

						{/* Mechanical page-edge flutter, still part of the single book */}
						<div
							style={{
								position: 'absolute',
								left: '12%',
								right: '12%',
								bottom: -13 + flutterTick,
								height: 14,
								backgroundColor: '#FFF8E7',
								border: '5px solid #000000',
								borderTop: 0,
								borderRadius: '0 0 12px 12px',
								zIndex: -1,
							}}
						/>
					</div>
				</div>

				{/* Tier 3 — bottom 20% */}
				<div
					style={{
						flex: '0 0 20%',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 16,
							padding: '15px 30px',
							backgroundColor: '#000000',
							color: '#FFF8E7',
							border: '4px solid #000000',
							borderRadius: 14,
							boxShadow: `${
								6 + Math.sin(frame * 0.18) * 2
							}px ${6 + Math.sin(frame * 0.18) * 2}px 0 #23A094`,
							transform: `translateY(${
								Math.sin(frame * 0.12 + 1) * 3
							}px) scale(${entrance})`,
						}}
					>
						<span
							style={{
								fontSize: 23,
								fontWeight: 950,
								lineHeight: 1,
								letterSpacing: 2.6,
								textAlign: 'center',
								textDecoration: 'underline',
								textDecorationColor: '#FF90E8',
								textDecorationThickness: 5,
								textUnderlineOffset: 7,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							READ IT. LIVE IT. REPEAT.
						</span>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}