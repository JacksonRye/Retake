import React from 'react';
import {
	AbsoluteFill,
	Easing,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style90CaliberWatchMacro_Scene4() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: assembly entrance
	// ------------------------------------------
	const masterIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.7},
	});

	const wheelAssemble = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 230, mass: 0.65},
	});

	const forkAssemble = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 250, mass: 0.6},
	});

	const rubyAssemble = spring({
		frame: frame - 1,
		fps,
		config: {damping: 14, stiffness: 260, mass: 0.5},
	});

	// ------------------------------------------
	// BEAT 2: brake lock, metric change, sparks
	// ------------------------------------------
	const clampDrop = spring({
		frame: frame - 31,
		fps,
		config: {damping: 9, stiffness: 260, mass: 0.65},
	});

	const brakeShock = interpolate(
		frame,
		[42, 45, 49, 55],
		[0, 1, 0.35, 0],
		clamp
	);

	const shockScale = interpolate(brakeShock, [0, 1], [0.92, 1.05], clamp);
	const shockOpacity = interpolate(brakeShock, [0, 1], [0, 0.8], clamp);

	const coeffValue = Math.round(
		interpolate(frame, [18, 58], [12, 97], clamp)
	);

	const brakeLocked = frame >= 42;
	const brakeLabel = brakeLocked
		? `SELF_DOUBT_COEFF ${coeffValue}`
		: `SELF_DOUBT_COEFF ${coeffValue}`;

	// ------------------------------------------
	// BEAT 3: living tension + exit
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const causticX = interpolate(
		Math.sin(frame * 0.06),
		[-1, 1],
		[-180, 480]
	);
	const shimmerOpacity = interpolate(
		Math.sin(frame * 0.09),
		[-1, 1],
		[0.12, 0.34]
	);

	const balanceOscillation = Math.sin(frame * 0.32) * 16;
	const springStrain = Math.sin(frame * 0.32) * 9;
	const tensionPulse = interpolate(
		Math.sin(frame * 0.14),
		[-1, 1],
		[14, 26]
	);

	const exit = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.8},
	});

	const exitScale = interpolate(exit, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exit, [0, 1], [1, 0], clamp);

	const containerOpacity =
		interpolate(masterIn, [0, 0.18], [0, 1], clamp) * exitOpacity;
	const containerScale =
		interpolate(masterIn, [0, 1], [0.86, 1], clamp) * exitScale;

	// ------------------------------------------
	// Mechanical geometry
	// ------------------------------------------
	const wheelSpinFree = interpolate(frame, [10, 42], [0, 88], clamp);
	const wheelSpinLocked = interpolate(frame, [42, 70], [88, 101], clamp);
	const wheelRotation = brakeLocked ? wheelSpinLocked : wheelSpinFree;

	const clampY = interpolate(clampDrop, [0, 1], [-120, 0], clamp);
	const clampScale = interpolate(clampDrop, [0, 1], [0.88, 1], clamp);

	const wheelX = interpolate(wheelAssemble, [0, 1], [-120, 0], clamp);
	const wheelY = interpolate(wheelAssemble, [0, 1], [70, 0], clamp);
	const wheelScale = interpolate(wheelAssemble, [0, 1], [0.5, 1], clamp);

	const forkX = interpolate(forkAssemble, [0, 1], [140, 0], clamp);
	const forkY = interpolate(forkAssemble, [0, 1], [-80, 0], clamp);
	const forkRotate = interpolate(forkAssemble, [0, 1], [18, 0], clamp);
	const forkScale = interpolate(forkAssemble, [0, 1], [0.55, 1], clamp);

	const rubyScale = interpolate(rubyAssemble, [0, 1], [0.2, 1], clamp);

	const speechReveal = interpolate(frame, [8, 28], [0, 1], clamp);
	const speechOpacity = interpolate(speechReveal, [0, 1], [0, 1], clamp);

	const sparks = new Array(10).fill(true).map((_, i) => {
		const angle = -70 + i * 14;
		const travel = interpolate(frame, [42, 54], [0, 42 + i * 2], clamp);
		const localOpacity = interpolate(frame, [42, 46, 56], [0, 1, 0], clamp);
		const scale = interpolate(frame, [42, 48, 56], [0.2, 1, 0.5], clamp);
		return {
			x: Math.cos((angle * Math.PI) / 180) * travel,
			y: Math.sin((angle * Math.PI) / 180) * travel,
			opacity: localOpacity,
			scale,
			angle,
		};
	});

	const wheelTeeth = 16;
	const gearNodes = new Array(wheelTeeth).fill(true);

	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#14151A',
				fontFamily:
					'Inter, SF Pro Display, Helvetica Neue, Arial, sans-serif',
			}}
		>
			<div
				style={{
					width: '92%',
					minHeight: 560,
					opacity: containerOpacity,
					transform: `scale(${containerScale}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					background:
						'radial-gradient(circle at 18% 18%, rgba(184,242,201,0.08) 0%, rgba(184,242,201,0.02) 18%, transparent 42%), linear-gradient(180deg, #1A1C22 0%, #14151A 100%)',
					border: '4px solid #BFC5CE',
					borderRadius: 34,
					boxShadow: `0px ${tensionPulse}px 0px rgba(0,0,0,0.65), inset 0 0 0 2px rgba(183,110,121,0.28)`,
					padding: '38px 34px 34px 34px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Caustic sweep */}
				<div
					style={{
						position: 'absolute',
						top: -40,
						left: causticX,
						width: 220,
						height: 760,
						opacity: shimmerOpacity,
						background:
							'linear-gradient(90deg, transparent 0%, rgba(184,242,201,0.02) 18%, rgba(191,197,206,0.20) 50%, rgba(183,110,121,0.18) 72%, transparent 100%)',
						transform: 'rotate(14deg)',
						pointerEvents: 'none',
					}}
				/>

				{/* Top rail */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 20,
						width: '100%',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							flex: 1,
							minWidth: 0,
						}}
					>
						<div
							style={{
								fontSize: 16,
								fontWeight: 500,
								letterSpacing: '0.24em',
								textTransform: 'uppercase',
								color: '#BFC5CE',
							}}
						>
							Chron Caliber Macro
						</div>
						<div
							style={{
								fontSize: 22,
								fontWeight: 300,
								letterSpacing: '0.08em',
								color: '#B8F2C9',
							}}
						>
							Friction Brake Event
						</div>
					</div>

					<div
						style={{
							flexShrink: 0,
							padding: '10px 16px',
							borderRadius: 999,
							border: '2px solid #B76E79',
							backgroundColor: '#14151A',
							boxShadow: '0px 4px 0px rgba(0,0,0,0.45)',
							fontSize: 18,
							fontWeight: 600,
							letterSpacing: '0.14em',
							color: '#B76E79',
							fontFamily:
								'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
						}}
					>
						SCENE_04
					</div>
				</div>

				{/* Main hero band */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 28,
						marginTop: 26,
						marginBottom: 26,
						width: '100%',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 12,
							width: '100%',
						}}
					>
						<div
							style={{
								fontSize: 72,
								lineHeight: 0.95,
								fontWeight: 300,
								letterSpacing: '-0.035em',
								color: '#BFC5CE',
							}}
						>
							SELF DOUBT
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'flex-end',
								justifyContent: 'space-between',
								gap: 24,
								flexWrap: 'nowrap',
								width: '100%',
							}}
						>
							<div
								style={{
									fontSize: 94,
									lineHeight: 0.9,
									fontWeight: 300,
									letterSpacing: '-0.05em',
									color: '#B76E79',
									fontVariantNumeric: 'tabular-nums',
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
									flexShrink: 0,
								}}
							>
								{coeffValue}
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 8,
									alignItems: 'flex-end',
									flex: 1,
									minWidth: 0,
								}}
							>
								<div
									style={{
										fontSize: 20,
										lineHeight: 1.15,
										fontWeight: 500,
										letterSpacing: '0.18em',
										textTransform: 'uppercase',
										color: '#BFC5CE',
										textAlign: 'right',
									}}
								>
									Brake Coefficient
								</div>
								<div
									style={{
										fontSize: 30,
										lineHeight: 1.08,
										fontWeight: 300,
										letterSpacing: '0.01em',
										color: '#B8F2C9',
										textAlign: 'right',
										opacity: speechOpacity,
									}}
								>
									plays you a song for the reason that you&apos;re
									telling yourself that you can&apos;t do it.
								</div>
							</div>
						</div>
					</div>

					{/* Mechanical stage */}
					<div
						style={{
							position: 'relative',
							width: '100%',
							height: 280,
							borderRadius: 28,
							border: '3px solid rgba(191,197,206,0.85)',
							background:
								'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.16) 100%)',
							boxShadow:
								'inset 0 0 0 1px rgba(183,110,121,0.22), inset 0 18px 40px rgba(255,255,255,0.03)',
							overflow: 'hidden',
						}}
					>
						{/* Ruby pins */}
						<div
							style={{
								position: 'absolute',
								left: 240,
								top: 102,
								width: 16,
								height: 16,
								borderRadius: '50%',
								backgroundColor: '#9B111E',
								boxShadow: `0 0 0 3px rgba(155,17,30,0.18), 0 0 18px rgba(184,242,201,0.2)`,
								transform: `scale(${rubyScale})`,
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: 432,
								top: 88,
								width: 16,
								height: 16,
								borderRadius: '50%',
								backgroundColor: '#9B111E',
								boxShadow: `0 0 0 3px rgba(155,17,30,0.18), 0 0 18px rgba(184,242,201,0.2)`,
								transform: `scale(${rubyScale})`,
							}}
						/>

						{/* Balance spring / right-side tension system */}
						<div
							style={{
								position: 'absolute',
								right: 56,
								top: 56,
								width: 200,
								height: 160,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									position: 'absolute',
									width: 128,
									height: 128,
									borderRadius: '50%',
									border: '4px solid #BFC5CE',
									boxShadow:
										'inset 0 0 0 2px rgba(184,242,201,0.08), 0 0 16px rgba(184,242,201,0.08)',
									transform: `translateX(${balanceOscillation}px)`,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									width: 82,
									height: 82,
									borderRadius: '50%',
									border: '3px solid #B76E79',
									transform: `translateX(${balanceOscillation * 0.65}px)`,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									width: 160,
									height: 40,
									borderTop: '3px solid #B8F2C9',
									borderRadius: 999,
									transform: `translateX(${
										springStrain * 0.45
									}px) scaleX(${1 + Math.abs(springStrain) * 0.01})`,
									opacity: 0.92,
								}}
							/>
						</div>

						{/* Escape wheel */}
						<div
							style={{
								position: 'absolute',
								left: 160 + wheelX,
								top: 56 + wheelY,
								width: 180,
								height: 180,
								transform: `scale(${wheelScale}) rotate(${wheelRotation}deg)`,
								transformOrigin: '50% 50%',
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 18,
									borderRadius: '50%',
									border: '8px solid #BFC5CE',
									boxShadow:
										'inset 0 0 0 3px rgba(183,110,121,0.24), 0 0 22px rgba(184,242,201,0.06)',
									background:
										'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 16%, transparent 42%)',
								}}
							/>

							<div
								style={{
									position: 'absolute',
									inset: 52,
									borderRadius: '50%',
									border: '4px solid #B76E79',
								}}
							/>

							<div
								style={{
									position: 'absolute',
									left: 78,
									top: 78,
									width: 24,
									height: 24,
									borderRadius: '50%',
									backgroundColor: '#9B111E',
									boxShadow: '0 0 0 5px rgba(191,197,206,0.15)',
								}}
							/>

							{gearNodes.map((_, i) => {
								const angle = (360 / wheelTeeth) * i;
								return (
									<div
										key={i}
										style={{
											position: 'absolute',
											left: 86,
											top: 0,
											width: 8,
											height: 22,
											backgroundColor: '#BFC5CE',
											borderRadius: 4,
											transform: `rotate(${angle}deg) translateY(-2px)`,
											transformOrigin: '50% 90px',
											boxShadow: '0 0 0 1px rgba(20,21,26,0.2)',
										}}
									/>
								);
							})}
						</div>

						{/* Pallet fork */}
						<div
							style={{
								position: 'absolute',
								left: 330 + forkX,
								top: 92 + forkY,
								width: 142,
								height: 82,
								transform: `scale(${forkScale}) rotate(${forkRotate}deg)`,
								transformOrigin: '20% 50%',
							}}
						>
							<div
								style={{
									position: 'absolute',
									left: 0,
									top: 28,
									width: 90,
									height: 18,
									borderRadius: 999,
									backgroundColor: '#B76E79',
									border: '3px solid #BFC5CE',
									boxShadow: '0 8px 16px rgba(0,0,0,0.22)',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									left: 74,
									top: 18,
									width: 54,
									height: 18,
									borderRadius: 999,
									backgroundColor: '#B76E79',
									border: '3px solid #BFC5CE',
									transform: 'rotate(-24deg)',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									left: 74,
									top: 40,
									width: 54,
									height: 18,
									borderRadius: 999,
									backgroundColor: '#B76E79',
									border: '3px solid #BFC5CE',
									transform: 'rotate(24deg)',
								}}
							/>
						</div>

						{/* Brake clamp */}
						<div
							style={{
								position: 'absolute',
								left: 272,
								top: 20 + clampY,
								width: 220,
								height: 110,
								transform: `scale(${clampScale})`,
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									borderRadius: 24,
									background:
										'linear-gradient(180deg, #BFC5CE 0%, #9097A0 100%)',
									border: '4px solid #14151A',
									boxShadow: `0px ${
										brakeLocked ? 4 : 10
									}px 0px #14151A`,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									left: 18,
									right: 18,
									top: 18,
									height: 30,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									borderRadius: 10,
									backgroundColor: '#14151A',
									color: '#B8F2C9',
									fontSize: 18,
									fontWeight: 600,
									letterSpacing: '0.07em',
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
									textAlign: 'center',
									whiteSpace: 'nowrap',
								}}
							>
								{brakeLabel}
							</div>
							<div
								style={{
									position: 'absolute',
									left: 38,
									right: 38,
									bottom: 16,
									height: 22,
									borderRadius: 999,
									backgroundColor: '#9B111E',
									border: '3px solid #14151A',
								}}
							/>
						</div>

						{/* Shockwave */}
						<div
							style={{
								position: 'absolute',
								left: 298,
								top: 62,
								width: 170,
								height: 170,
								borderRadius: '50%',
								border: '3px solid rgba(184,242,201,0.75)',
								transform: `scale(${shockScale})`,
								opacity: shockOpacity,
							}}
						/>

						<div
							style={{
								position: 'absolute',
								left: 286,
								top: 50,
								width: 194,
								height: 194,
								borderRadius: '50%',
								border: '2px solid rgba(183,110,121,0.45)',
								transform: `scale(${interpolate(
									brakeShock,
									[0, 1],
									[0.8, 1.22],
									clamp
								)})`,
								opacity: shockOpacity * 0.7,
							}}
						/>

						{/* Sparks */}
						{sparks.map((spark, i) => (
							<div
								key={i}
								style={{
									position: 'absolute',
									left: 386 + spark.x,
									top: 118 + spark.y,
									width: i % 2 === 0 ? 10 : 6,
									height: i % 2 === 0 ? 10 : 18,
									borderRadius: 999,
									backgroundColor: i % 2 === 0 ? '#B8F2C9' : '#B76E79',
									opacity: spark.opacity,
									transform: `scale(${spark.scale}) rotate(${spark.angle}deg)`,
									boxShadow: '0 0 12px rgba(184,242,201,0.45)',
								}}
							/>
						))}

						{/* Mechanical guide labels */}
						<div
							style={{
								position: 'absolute',
								left: 20,
								bottom: 18,
								display: 'flex',
								flexDirection: 'column',
								gap: 6,
							}}
						>
							<div
								style={{
									fontSize: 14,
									fontWeight: 500,
									letterSpacing: '0.18em',
									color: '#BFC5CE',
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
								}}
							>
								ESCAPE_WHEEL / PALLET_FORK / BRAKE
							</div>
							<div
								style={{
									fontSize: 12,
									fontWeight: 500,
									letterSpacing: '0.14em',
									color: '#B76E79',
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
								}}
							>
								PSYCHOLOGICAL FRICTION → PHYSICAL LOCK
							</div>
						</div>
					</div>
				</div>

				{/* Bottom rail */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 20,
						width: '100%',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							flex: 1,
							minWidth: 0,
						}}
					>
						<div
							style={{
								fontSize: 18,
								fontWeight: 500,
								letterSpacing: '0.14em',
								textTransform: 'uppercase',
								color: '#BFC5CE',
							}}
						>
							Under sustained tension, the movement stalls.
						</div>
						<div
							style={{
								fontSize: 24,
								fontWeight: 300,
								lineHeight: 1.08,
								color: '#B8F2C9',
							}}
						>
							A flawless engine loses momentum when self-doubt becomes
							brake force.
						</div>
					</div>

					<div
						style={{
							flexShrink: 0,
							padding: '14px 20px',
							borderRadius: 18,
							backgroundColor: brakeLocked ? '#9B111E' : '#B76E79',
							border: '3px solid #14151A',
							boxShadow: `0px ${brakeLocked ? 4 : 8}px 0px #000000`,
							color: '#F7F8FA',
							fontSize: 22,
							fontWeight: 700,
							letterSpacing: '0.08em',
							fontFamily:
								'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
						}}
					>
						{brakeLocked ? 'LOCKED' : 'ENGAGING'}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}