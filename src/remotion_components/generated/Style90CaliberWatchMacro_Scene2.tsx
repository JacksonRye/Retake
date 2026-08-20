import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style90CaliberWatchMacro_Scene2() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1 — precision entrance
	// ------------------------------------------
	const entrance = spring({
		frame,
		fps,
		config: {
			damping: 12,
			stiffness: 220,
			mass: 0.7,
		},
	});

	const dialScale = interpolate(entrance, [0, 1], [0.82, 1], clamp);
	const dialOpacity = interpolate(entrance, [0, 0.2], [0, 1], clamp);
	const dialTranslateY = interpolate(entrance, [0, 1], [120, 0], clamp);

	const topBadgeIn = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 12,
			stiffness: 250,
			mass: 0.55,
		},
	});

	// ------------------------------------------
	// BEAT 2 — ratcheting counter + gear motion
	// ------------------------------------------
	const countRaw = Math.round(interpolate(frame, [30, 78], [1, 40], clamp));
	const countFormatted = `+${String(countRaw).padStart(2, '0')} TEXTS`;

	const gearProgress = spring({
		frame: frame - 26,
		fps,
		config: {
			damping: 14,
			stiffness: 180,
			mass: 0.8,
		},
	});

	const bigGearRotation =
		interpolate(gearProgress, [0, 1], [0, 240], clamp) +
		Math.max(0, frame - 78) * 0.35;

	const smallGearRotation =
		interpolate(gearProgress, [0, 1], [0, -410], clamp) +
		Math.max(0, frame - 78) * -0.7;

	const ratchetPulse = frame >= 30 && frame <= 78 ? Math.sin(frame * 1.9) : 0;
	const ratchetScale = interpolate(ratchetPulse, [-1, 1], [0.988, 1.018]);

	const mintFlashStrength = interpolate(frame, [52, 56, 62], [0, 1, 0], clamp);
	const mintFlashOpacity = mintFlashStrength * 0.95;

	// ------------------------------------------
	// BEAT 3 — living mechanics + clean exit
	// ------------------------------------------
	const breatheY = Math.sin(frame * 0.12) * 6;
	const breatheTilt = Math.sin(frame * 0.08) * 1.2;
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [16, 28]);

	const hairspringScale = 1 + Math.sin(frame * 0.18) * 0.03;
	const trainCreep = Math.sin(frame * 0.04) * 6;

	const exitProgress = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {
			damping: 12,
			stiffness: 240,
			mass: 0.8,
		},
	});

	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

	const containerOpacity = dialOpacity * exitOpacity;
	const containerScale = dialScale * exitScale;

	const brushedLines = Array.from({length: 18}).map((_, i) => {
		const left = `${i * 6}%`;
		const opacity = i % 2 === 0 ? 0.08 : 0.04;
		return (
			<div
				key={i}
				style={{
					position: 'absolute',
					left,
					top: 0,
					bottom: 0,
					width: 2,
					background:
						'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(20,21,26,0.08), rgba(255,255,255,0.12))',
					opacity,
					pointerEvents: 'none',
				}}
			/>
		);
	});

	const tickMarks = Array.from({length: 12}).map((_, i) => {
		const angle = i * 30;
		const isPrimary = i % 3 === 0;
		return (
			<div
				key={i}
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					width: isPrimary ? 6 : 4,
					height: isPrimary ? 110 : 96,
					marginLeft: isPrimary ? -3 : -2,
					marginTop: isPrimary ? -55 : -48,
					transform: `rotate(${angle}deg) translateY(-168px)`,
					transformOrigin: 'center center',
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'center',
					pointerEvents: 'none',
				}}
			>
				<div
					style={{
						width: '100%',
						height: isPrimary ? 26 : 18,
						borderRadius: 999,
						backgroundColor: '#14151A',
						opacity: isPrimary ? 0.95 : 0.65,
					}}
				/>
			</div>
		);
	});

	const hairspringRings = Array.from({length: 5}).map((_, i) => {
		const size = 88 - i * 14;
		return (
			<div
				key={i}
				style={{
					position: 'absolute',
					width: size,
					height: size,
					borderRadius: '50%',
					border: `2px solid ${
						i === 0 ? '#B76E79' : 'rgba(183,110,121,0.75)'
					}`,
					opacity: 1 - i * 0.12,
				}}
			/>
		);
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#14151A',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily:
					'Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
			}}
		>
			<div
				style={{
					width: '92%',
					minHeight: 560,
					opacity: containerOpacity,
					transform: `scale(${containerScale}) translateY(${dialTranslateY + breatheY}px) rotate(${breatheTilt}deg)`,
					background:
						'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.28), rgba(191,197,206,0.18) 20%, rgba(191,197,206,0.08) 40%, rgba(20,21,26,0.05) 100%), linear-gradient(180deg, #D8DDE4 0%, #BFC5CE 52%, #AAB1BB 100%)',
					border: '4px solid #14151A',
					borderRadius: 36,
					boxShadow: `0px ${shadowPulse}px 0px #14151A`,
					padding: '42px 38px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{brushedLines}

				<div
					style={{
						position: 'absolute',
						inset: 0,
						background:
							'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.18) 42%, transparent 58%)',
						transform: `translateX(${interpolate(
							Math.sin(frame * 0.03),
							[-1, 1],
							[-180, 180]
						)}px)`,
						opacity: 0.45,
						pointerEvents: 'none',
					}}
				/>

				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'space-between',
						gap: 20,
						width: '100%',
						position: 'relative',
						zIndex: 2,
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 10,
							flex: 1,
							minWidth: 0,
						}}
					>
						<div
							style={{
								fontSize: 19,
								fontWeight: 500,
								letterSpacing: '0.22em',
								textTransform: 'uppercase',
								color: '#14151A',
								opacity: 0.88,
							}}
						>
							Chronograph Complication
						</div>

						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								flexWrap: 'wrap',
							}}
						>
							<div
								style={{
									fontSize: 18,
									fontWeight: 500,
									letterSpacing: '0.18em',
									textTransform: 'uppercase',
									color: '#9B111E',
								}}
							>
								Cal. 90
							</div>
							<div
								style={{
									width: 8,
									height: 8,
									borderRadius: '50%',
									backgroundColor: '#14151A',
									opacity: 0.6,
								}}
							/>
							<div
								style={{
									fontSize: 18,
									fontFamily:
										'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
									fontWeight: 500,
									letterSpacing: '0.16em',
									color: '#14151A',
									opacity: 0.75,
								}}
							>
								SN-040
							</div>
						</div>
					</div>

					<div
						style={{
							transform: `scale(${topBadgeIn})`,
							backgroundColor: '#B76E79',
							border: '3px solid #14151A',
							borderRadius: 999,
							padding: '8px 18px',
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: '0.14em',
							textTransform: 'uppercase',
							color: '#14151A',
							boxShadow: '0px 4px 0px #14151A',
							flexShrink: 0,
						}}
					>
						Macro Watch
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 28,
						margin: '28px 0 18px 0',
						width: '100%',
						position: 'relative',
						zIndex: 2,
					}}
				>
					<div
						style={{
							flex: 1.05,
							minWidth: 0,
							display: 'flex',
							flexDirection: 'column',
							gap: 14,
						}}
					>
						<div
							style={{
								fontSize: 76,
								lineHeight: 0.92,
								fontWeight: 300,
								letterSpacing: '-0.055em',
								color: '#14151A',
							}}
						>
							40 texts
						</div>

						<div
							style={{
								fontSize: 28,
								lineHeight: 1.18,
								fontWeight: 400,
								color: '#14151A',
								opacity: 0.84,
								maxWidth: 430,
							}}
						>
							Fleeting hype translated into a sterile engraved counter.
						</div>
					</div>

					<div
						style={{
							width: 400,
							height: 400,
							borderRadius: '50%',
							border: '4px solid #14151A',
							position: 'relative',
							background:
								'radial-gradient(circle at 32% 28%, rgba(255,255,255,0.85), rgba(255,255,255,0.32) 18%, rgba(191,197,206,0.35) 36%, rgba(170,177,187,0.5) 65%, rgba(120,126,136,0.28) 100%)',
							boxShadow:
								'inset 0 0 0 8px rgba(20,21,26,0.07), inset 0 0 0 18px rgba(255,255,255,0.18)',
							flexShrink: 0,
							overflow: 'hidden',
						}}
					>
						{tickMarks}

						<div
							style={{
								position: 'absolute',
								inset: 26,
								borderRadius: '50%',
								border: '2px solid rgba(20,21,26,0.18)',
							}}
						/>

						<div
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: 220,
								height: 220,
								marginLeft: -110,
								marginTop: -110,
								borderRadius: '50%',
								border: '3px solid #14151A',
								background:
									'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.7), rgba(191,197,206,0.24) 42%, rgba(20,21,26,0.02) 100%)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								overflow: 'hidden',
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 12,
									borderRadius: '50%',
									border: '2px solid rgba(20,21,26,0.2)',
								}}
							/>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 8,
									textAlign: 'center',
									padding: '0 20px',
									transform: `scale(${ratchetScale})`,
								}}
							>
								<div
									style={{
										fontSize: 18,
										fontWeight: 500,
										letterSpacing: '0.18em',
										textTransform: 'uppercase',
										color: '#14151A',
										opacity: 0.7,
									}}
								>
									Engraved Counter
								</div>

								<div
									style={{
										fontSize: 42,
										lineHeight: 1,
										fontWeight: 500,
										letterSpacing: '0.11em',
										color: '#14151A',
										fontFamily:
											'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
										whiteSpace: 'nowrap',
									}}
								>
									{countFormatted}
								</div>
							</div>

							<div
								style={{
									position: 'absolute',
									top: 18,
									right: 32,
									width: 12,
									height: 12,
									borderRadius: '50%',
									backgroundColor: '#B8F2C9',
									boxShadow: `0 0 ${8 + mintFlashStrength * 18}px rgba(184,242,201,0.95)`,
									opacity: 0.25 + mintFlashOpacity,
								}}
							/>
						</div>

						<div
							style={{
								position: 'absolute',
								left: 44 + trainCreep,
								top: 88,
								width: 96,
								height: 96,
								borderRadius: '50%',
								border: '4px solid #14151A',
								background:
									'radial-gradient(circle at 35% 35%, #E8EBEF 0%, #C8CED6 58%, #AAB1BB 100%)',
								transform: `rotate(${bigGearRotation}deg)`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{Array.from({length: 12}).map((_, i) => (
								<div
									key={i}
									style={{
										position: 'absolute',
										width: 10,
										height: 22,
										backgroundColor: '#14151A',
										borderRadius: 3,
										transform: `rotate(${i * 30}deg) translateY(-57px)`,
									}}
								/>
							))}
							<div
								style={{
									width: 28,
									height: 28,
									borderRadius: '50%',
									backgroundColor: '#14151A',
								}}
							/>
						</div>

						<div
							style={{
								position: 'absolute',
								right: 52 - trainCreep * 0.6,
								bottom: 82,
								width: 74,
								height: 74,
								borderRadius: '50%',
								border: '4px solid #14151A',
								background:
									'radial-gradient(circle at 35% 35%, #EDEFF2 0%, #CDD3DB 58%, #AAB1BB 100%)',
								transform: `rotate(${smallGearRotation}deg)`,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{Array.from({length: 10}).map((_, i) => (
								<div
									key={i}
									style={{
										position: 'absolute',
										width: 8,
										height: 18,
										backgroundColor: '#14151A',
										borderRadius: 3,
										transform: `rotate(${i * 36}deg) translateY(-43px)`,
									}}
								/>
							))}
							<div
								style={{
									width: 22,
									height: 22,
									borderRadius: '50%',
									backgroundColor: '#9B111E',
								}}
							/>
						</div>

						<div
							style={{
								position: 'absolute',
								left: '50%',
								bottom: 58,
								width: 112,
								height: 112,
								marginLeft: -56,
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								transform: `scale(${hairspringScale}) rotate(${Math.sin(
									frame * 0.16
								) * 8}deg)`,
							}}
						>
							{hairspringRings}
							<div
								style={{
									position: 'absolute',
									width: 18,
									height: 18,
									borderRadius: '50%',
									backgroundColor: '#9B111E',
									border: '2px solid #14151A',
								}}
							/>
						</div>
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'stretch',
						justifyContent: 'space-between',
						gap: 18,
						width: '100%',
						position: 'relative',
						zIndex: 2,
					}}
				>
					<div
						style={{
							flex: 1.2,
							backgroundColor: 'rgba(255,255,255,0.28)',
							border: '3px solid #14151A',
							borderRadius: 22,
							padding: '18px 20px',
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
						}}
					>
						<div
							style={{
								fontSize: 16,
								fontWeight: 600,
								letterSpacing: '0.18em',
								textTransform: 'uppercase',
								color: '#9B111E',
							}}
						>
							Readout
						</div>
						<div
							style={{
								fontSize: 22,
								lineHeight: 1.2,
								fontWeight: 400,
								color: '#14151A',
								opacity: 0.85,
							}}
						>
							&quot;Oh wow, he actually did it&quot; converted into transactional count.
						</div>
					</div>

					<div
						style={{
							width: 280,
							backgroundColor: '#14151A',
							border: '3px solid #14151A',
							borderRadius: 22,
							padding: '18px 20px',
							boxShadow: '0px 8px 0px rgba(20,21,26,0.28)',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							gap: 8,
							flexShrink: 0,
						}}
					>
						<div
							style={{
								fontSize: 15,
								fontWeight: 600,
								letterSpacing: '0.2em',
								textTransform: 'uppercase',
								color: '#B8F2C9',
								opacity: 0.9,
							}}
						>
							Serial Pulse
						</div>
						<div
							style={{
								fontSize: 30,
								lineHeight: 1,
								fontWeight: 500,
								color: '#BFC5CE',
								fontFamily:
									'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", monospace',
								letterSpacing: '0.12em',
								whiteSpace: 'nowrap',
							}}
						>
							30—40 TXT
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}