import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style90CaliberWatchMacro_Scene3() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ==========================================
	// BEAT 1 (0.0s – 1.0s): SNAPPY ENTRANCE
	// ==========================================
	const entrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const bridgeDrop = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.7},
	});

	const handDrop = spring({
		frame: frame - 5,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.55},
	});

	// ==========================================
	// BEAT 2 (1.0s – 2.8s): HARD TICK + EXPLODED STACK
	// ==========================================
	const tickProgress = spring({
		frame: frame - 30,
		fps,
		config: {damping: 18, stiffness: 320, mass: 0.45},
	});

	const explodedProgress = spring({
		frame: frame - 38,
		fps,
		config: {damping: 14, stiffness: 180, mass: 0.7},
	});

	const arrestedAngle = interpolate(tickProgress, [0, 1], [-86, 0], clamp);

	// ==========================================
	// BEAT 3 (2.8s – 4.5s): MICRO-DRIFT + CLEAN EXIT
	// ==========================================
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.6;
	const opticalSweep = interpolate(Math.sin(frame * 0.09), [-1, 1], [0.15, 0.42]);
	const shadowPulse = interpolate(Math.sin(frame * 0.14), [-1, 1], [18, 30]);

	const exitProgress = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.8},
	});

	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);

	const containerOpacity =
		interpolate(entrance, [0, 0.18], [0, 1], clamp) * exitOpacity;
	const containerScale =
		interpolate(entrance, [0, 1], [0.86, 1], clamp) * exitScale;

	// Precision text / timing
	const serialCount = Math.round(interpolate(frame, [15, 55], [8970, 9000], clamp));
	const timeCode = serialCount.toString().padStart(4, '0');

	// Layer exploded offsets
	const plateTopOffset = interpolate(explodedProgress, [0, 1], [0, -120], clamp);
	const jewelBridgeOffset = interpolate(explodedProgress, [0, 1], [0, -52], clamp);
	const centerWheelOffset = interpolate(explodedProgress, [0, 1], [0, 0], clamp);
	const lowerBridgeOffset = interpolate(explodedProgress, [0, 1], [0, 62], clamp);
	const plateBottomOffset = interpolate(explodedProgress, [0, 1], [0, 128], clamp);

	// Micro drift per layer
	const drift1 = Math.sin(frame * 0.1) * 5;
	const drift2 = Math.sin(frame * 0.12 + 0.8) * 4;
	const drift3 = Math.sin(frame * 0.11 + 1.6) * 6;
	const drift4 = Math.sin(frame * 0.09 + 2.2) * 5;
	const drift5 = Math.sin(frame * 0.13 + 2.9) * 4;

	// Mechanical rotations
	const gearA = frame * 1.6;
	const gearB = -frame * 2.2;
	const gearC = frame * 1.1;
	const balanceWheel = Math.sin(frame * 0.42) * 14;

	// Beat 1 vertical entrance translations
	const bridgeY = interpolate(bridgeDrop, [0, 1], [-180, 0], clamp);
	const handY = interpolate(handDrop, [0, 1], [-240, 0], clamp);

	// Tick thunk
	const hubScale =
		frame >= 30 ? interpolate(frame, [30, 34, 40], [1, 1.12, 1], clamp) : 1;
	const hubShadow =
		frame >= 30 ? interpolate(frame, [30, 34, 40], [10, 4, 10], clamp) : 10;

	const bgRadial = `radial-gradient(circle at 50% 38%, rgba(191,197,206,0.16), rgba(20,21,26,1) 62%)`;

	const engravedStyle: React.CSSProperties = {
		fontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
		fontWeight: 600,
		letterSpacing: '0.22em',
		textTransform: 'uppercase',
		color: '#BFC5CE',
		opacity: 0.92,
	};

	return (
		<AbsoluteFill
			style={{
				background: bgRadial,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
			}}
		>
			<div
				style={{
					width: '92%',
					minHeight: 560,
					opacity: containerOpacity,
					transform: `scale(${containerScale}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					background:
						'linear-gradient(180deg, rgba(191,197,206,0.12) 0%, rgba(20,21,26,0.9) 100%)',
					border: '4px solid #BFC5CE',
					borderRadius: 32,
					boxShadow: `0px ${shadowPulse}px 0px #0A0B0D`,
					padding: '44px 38px',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					position: 'relative',
					overflow: 'hidden',
				}}
			>
				{/* Optical sweep */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: `linear-gradient(110deg, transparent 20%, rgba(184,242,201,${opticalSweep}) 50%, transparent 78%)`,
						transform: `translateX(${interpolate(
							Math.sin(frame * 0.05),
							[-1, 1],
							[-240, 240]
						)}px)`,
						pointerEvents: 'none',
					}}
				/>

				{/* Top precision header */}
				<div
					style={{
						display: 'flex',
						alignItems: 'flex-start',
						justifyContent: 'space-between',
						width: '100%',
						gap: 24,
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
								...engravedStyle,
								fontSize: 18,
								lineHeight: 1.1,
							}}
						>
							chron_style_90
						</div>
						<div
							style={{
								fontSize: 58,
								lineHeight: 0.96,
								fontWeight: 200,
								letterSpacing: '-0.04em',
								color: '#BFC5CE',
							}}
						>
							Dead-Beat Arrest
						</div>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
							gap: 10,
							minWidth: 240,
						}}
					>
						<div
							style={{
								background: '#B76E79',
								border: '3px solid #14151A',
								borderRadius: 999,
								padding: '10px 18px',
								fontSize: 18,
								fontWeight: 700,
								letterSpacing: '0.18em',
								textTransform: 'uppercase',
								color: '#14151A',
								boxShadow: '0px 4px 0px #14151A',
							}}
						>
							Macro Caliber
						</div>
						<div
							style={{
								...engravedStyle,
								fontSize: 16,
								lineHeight: 1.1,
							}}
						>
							serial {timeCode}
						</div>
					</div>
				</div>

				{/* Mechanical hero zone */}
				<div
					style={{
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '28px 0',
						position: 'relative',
						zIndex: 2,
					}}
				>
					<div
						style={{
							width: '100%',
							height: 760,
							position: 'relative',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{/* Exploded stack */}
						<div
							style={{
								position: 'relative',
								width: 620,
								height: 620,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{/* Top plate */}
							<div
								style={{
									position: 'absolute',
									width: 470,
									height: 74,
									borderRadius: 28,
									background:
										'linear-gradient(180deg, #D6DAE0 0%, #BFC5CE 45%, #8E96A1 100%)',
									border: '3px solid #14151A',
									boxShadow: '0px 8px 0px rgba(10,11,13,0.9)',
									transform: `translateY(${plateTopOffset + drift1}px)`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									padding: '0 34px',
								}}
							>
								<div
									style={{
										width: 22,
										height: 22,
										borderRadius: '50%',
										background: '#9B111E',
										border: '2px solid #14151A',
										boxShadow: `0 0 16px rgba(155,17,30,${0.3 + opticalSweep})`,
									}}
								/>
								<div
									style={{
										width: 140,
										height: 8,
										borderRadius: 999,
										background: 'rgba(20,21,26,0.22)',
									}}
								/>
								<div
									style={{
										width: 22,
										height: 22,
										borderRadius: '50%',
										background: '#9B111E',
										border: '2px solid #14151A',
										boxShadow: `0 0 16px rgba(155,17,30,${0.28 + opticalSweep})`,
									}}
								/>
							</div>

							{/* Upper bridge */}
							<div
								style={{
									position: 'absolute',
									width: 400,
									height: 56,
									borderRadius: 24,
									background:
										'linear-gradient(180deg, #CCD1D8 0%, #BFC5CE 50%, #939AA4 100%)',
									border: '3px solid #14151A',
									boxShadow: '0px 7px 0px rgba(10,11,13,0.88)',
									transform: `translateY(${jewelBridgeOffset + drift2}px)`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 44,
								}}
							>
								<div
									style={{
										width: 18,
										height: 18,
										borderRadius: '50%',
										background: '#9B111E',
										border: '2px solid #14151A',
										boxShadow: `0 0 14px rgba(155,17,30,${0.32 + opticalSweep})`,
									}}
								/>
								<div
									style={{
										width: 108,
										height: 6,
										borderRadius: 999,
										background: 'rgba(20,21,26,0.2)',
									}}
								/>
								<div
									style={{
										width: 18,
										height: 18,
										borderRadius: '50%',
										background: '#9B111E',
										border: '2px solid #14151A',
										boxShadow: `0 0 14px rgba(155,17,30,${0.26 + opticalSweep})`,
									}}
								/>
							</div>

							{/* Main movement center */}
							<div
								style={{
									position: 'absolute',
									width: 620,
									height: 620,
									transform: `translateY(${centerWheelOffset + drift3}px)`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								{/* Outer ring */}
								<div
									style={{
										position: 'absolute',
										width: 420,
										height: 420,
										borderRadius: '50%',
										border: '16px solid #BFC5CE',
										boxShadow: 'inset 0 0 0 4px #14151A',
										opacity: 0.9,
									}}
								/>

								{/* Gear A */}
								<div
									style={{
										position: 'absolute',
										left: 130,
										top: 216,
										width: 94,
										height: 94,
										borderRadius: '50%',
										border: '8px solid #BFC5CE',
										background: '#14151A',
										transform: `rotate(${gearA}deg)`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{Array.from({length: 8}).map((_, i) => (
										<div
											key={i}
											style={{
												position: 'absolute',
												width: 12,
												height: 26,
												background: '#BFC5CE',
												borderRadius: 4,
												transform: `rotate(${i * 45}deg) translateY(-54px)`,
											}}
										/>
									))}
									<div
										style={{
											width: 26,
											height: 26,
											borderRadius: '50%',
											background: '#9B111E',
											border: '3px solid #14151A',
										}}
									/>
								</div>

								{/* Gear B */}
								<div
									style={{
										position: 'absolute',
										right: 150,
										top: 180,
										width: 126,
										height: 126,
										borderRadius: '50%',
										border: '9px solid #BFC5CE',
										background: '#14151A',
										transform: `rotate(${gearB}deg)`,
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
												width: 13,
												height: 30,
												background: '#BFC5CE',
												borderRadius: 4,
												transform: `rotate(${i * 36}deg) translateY(-72px)`,
											}}
										/>
									))}
									<div
										style={{
											width: 30,
											height: 30,
											borderRadius: '50%',
											background: '#9B111E',
											border: '3px solid #14151A',
										}}
									/>
								</div>

								{/* Gear C */}
								<div
									style={{
										position: 'absolute',
										right: 180,
										bottom: 150,
										width: 82,
										height: 82,
										borderRadius: '50%',
										border: '8px solid #BFC5CE',
										background: '#14151A',
										transform: `rotate(${gearC}deg)`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{Array.from({length: 8}).map((_, i) => (
										<div
											key={i}
											style={{
												position: 'absolute',
												width: 10,
												height: 24,
												background: '#BFC5CE',
												borderRadius: 4,
												transform: `rotate(${i * 45}deg) translateY(-48px)`,
											}}
										/>
									))}
									<div
										style={{
											width: 22,
											height: 22,
											borderRadius: '50%',
											background: '#9B111E',
											border: '3px solid #14151A',
										}}
									/>
								</div>

								{/* Balance bridge */}
								<div
									style={{
										position: 'absolute',
										width: 310,
										height: 44,
										borderRadius: 22,
										background:
											'linear-gradient(180deg, #D5D9DF 0%, #BFC5CE 50%, #8D95A0 100%)',
										border: '3px solid #14151A',
										boxShadow: '0px 8px 0px rgba(10,11,13,0.88)',
										transform: `translateY(${bridgeY}px)`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										padding: '0 18px',
									}}
								>
									<div
										style={{
											width: 16,
											height: 16,
											borderRadius: '50%',
											background: '#9B111E',
											border: '2px solid #14151A',
										}}
									/>
									<div
										style={{
											width: 110,
											height: 5,
											borderRadius: 999,
											background: 'rgba(20,21,26,0.18)',
										}}
									/>
									<div
										style={{
											width: 16,
											height: 16,
											borderRadius: '50%',
											background: '#9B111E',
											border: '2px solid #14151A',
										}}
									/>
								</div>

								{/* Balance wheel */}
								<div
									style={{
										position: 'absolute',
										bottom: 160,
										left: 214,
										width: 190,
										height: 190,
										borderRadius: '50%',
										border: '10px solid #B76E79',
										boxShadow: 'inset 0 0 0 3px #14151A',
										transform: `rotate(${balanceWheel}deg)`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									{Array.from({length: 6}).map((_, i) => (
										<div
											key={i}
											style={{
												position: 'absolute',
												width: 8,
												height: 74,
												background: '#B76E79',
												borderRadius: 4,
												transform: `rotate(${i * 60}deg)`,
											}}
										/>
									))}
									<div
										style={{
											width: 34,
											height: 34,
											borderRadius: '50%',
											background: '#14151A',
											border: '4px solid #BFC5CE',
										}}
									/>
								</div>

								{/* Central arbor and dead-beat second hand */}
								<div
									style={{
										position: 'absolute',
										width: 88,
										height: 88,
										borderRadius: '50%',
										background: '#14151A',
										border: '6px solid #BFC5CE',
										transform: `scale(${hubScale})`,
										boxShadow: `0px ${hubShadow}px 0px #0A0B0D`,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											width: 30,
											height: 30,
											borderRadius: '50%',
											background: '#9B111E',
											border: '3px solid #14151A',
											boxShadow: `0 0 18px rgba(155,17,30,${0.3 + opticalSweep})`,
										}}
									/>
								</div>

								<div
									style={{
										position: 'absolute',
										width: 14,
										height: 244,
										borderRadius: 999,
										background:
											'linear-gradient(180deg, #EEF1F4 0%, #BFC5CE 38%, #8E96A1 100%)',
										border: '3px solid #14151A',
										transformOrigin: '50% 88%',
										transform: `translateY(${handY}px) rotate(${arrestedAngle}deg)`,
										boxShadow: '0px 8px 0px rgba(10,11,13,0.9)',
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: 10,
											left: '50%',
											transform: 'translateX(-50%)',
											width: 24,
											height: 24,
											borderRadius: '50%',
											background: '#B8F2C9',
											border: '3px solid #14151A',
										}}
									/>
								</div>
							</div>

							{/* Lower bridge */}
							<div
								style={{
									position: 'absolute',
									width: 430,
									height: 58,
									borderRadius: 24,
									background:
										'linear-gradient(180deg, #D5D9DF 0%, #BFC5CE 50%, #939AA4 100%)',
									border: '3px solid #14151A',
									boxShadow: '0px 7px 0px rgba(10,11,13,0.88)',
									transform: `translateY(${lowerBridgeOffset + drift4}px)`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									padding: '0 26px',
								}}
							>
								<div
									style={{
										width: 20,
										height: 20,
										borderRadius: '50%',
										background: '#9B111E',
										border: '2px solid #14151A',
										boxShadow: `0 0 12px rgba(155,17,30,${0.28 + opticalSweep})`,
									}}
								/>
								<div
									style={{
										width: 160,
										height: 7,
										borderRadius: 999,
										background: 'rgba(20,21,26,0.18)',
									}}
								/>
								<div
									style={{
										width: 20,
										height: 20,
										borderRadius: '50%',
										background: '#9B111E',
										border: '2px solid #14151A',
										boxShadow: `0 0 12px rgba(155,17,30,${0.24 + opticalSweep})`,
									}}
								/>
							</div>

							{/* Bottom plate */}
							<div
								style={{
									position: 'absolute',
									width: 500,
									height: 80,
									borderRadius: 30,
									background:
										'linear-gradient(180deg, #D6DAE0 0%, #BFC5CE 45%, #8E96A1 100%)',
									border: '3px solid #14151A',
									boxShadow: '0px 9px 0px rgba(10,11,13,0.92)',
									transform: `translateY(${plateBottomOffset + drift5}px)`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 24,
								}}
							>
								<div
									style={{
										width: 26,
										height: 26,
										borderRadius: '50%',
										background: '#9B111E',
										border: '2px solid #14151A',
									}}
								/>
								<div
									style={{
										width: 170,
										height: 8,
										borderRadius: 999,
										background: 'rgba(20,21,26,0.22)',
									}}
								/>
								<div
									style={{
										width: 26,
										height: 26,
										borderRadius: '50%',
										background: '#9B111E',
										border: '2px solid #14151A',
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom transcript / metric block */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: 16,
						position: 'relative',
						zIndex: 2,
					}}
				>
					<div
						style={{
							...engravedStyle,
							fontSize: 20,
							lineHeight: 1.1,
						}}
					>
						00:00 hard reset
					</div>

					<div
						style={{
							fontSize: 44,
							lineHeight: 1.08,
							fontWeight: 300,
							letterSpacing: '-0.025em',
							color: '#BFC5CE',
							maxWidth: '100%',
						}}
					>
						then the next day, everyone&apos;s gonna move on. Like
						nothing&apos;s gonna happen.
					</div>

					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 24,
							flexWrap: 'wrap',
						}}
					>
						<div
							style={{
								background: '#B8F2C9',
								border: '4px solid #14151A',
								borderRadius: 20,
								padding: '18px 26px',
								boxShadow: '0px 8px 0px #14151A',
								fontSize: 24,
								fontWeight: 800,
								letterSpacing: '0.12em',
								textTransform: 'uppercase',
								color: '#14151A',
							}}
						>
							Arrested at Zero
						</div>

						<div
							style={{
								...engravedStyle,
								fontSize: 18,
								lineHeight: 1.2,
								textAlign: 'right',
								flex: 1,
								minWidth: 260,
							}}
						>
							exploded vertical cross-section · ruby endstones ·
							dead-beat memory
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}