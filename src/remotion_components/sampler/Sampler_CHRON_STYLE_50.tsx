import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_50() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1: Entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 11, stiffness: 200, mass: 0.7},
	});

	const bottomIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 190, mass: 0.7},
	});

	// ------------------------------------------
	// BEAT 2: Metric/state activity
	// ------------------------------------------
	const percentNumber = Math.round(interpolate(frame, [16, 55], [12, 50], clamp));
	const metricText = `${percentNumber}% COMMISSION`;

	const chalkWrite1 = interpolate(frame, [8, 26], [0, 1], clamp);
	const chalkWrite2 = interpolate(frame, [20, 42], [0, 1], clamp);
	const chalkWrite3 = interpolate(frame, [34, 56], [0, 1], clamp);

	const dust1 = interpolate(frame, [16, 24], [0, 1], clamp) * interpolate(frame, [24, 34], [1, 0], clamp);
	const dust2 = interpolate(frame, [30, 38], [0, 1], clamp) * interpolate(frame, [38, 48], [1, 0], clamp);
	const dust3 = interpolate(frame, [46, 54], [0, 1], clamp) * interpolate(frame, [54, 66], [1, 0], clamp);

	const tap1 = frame >= 50 && frame < 54;
	const tap2 = frame >= 56 && frame < 60;
	const underlineScale1 = tap1 ? 1.06 : 1;
	const underlineScale2 = tap2 ? 1.06 : 1;

	const eraserX = interpolate(frame, [62, 78], [620, 300], clamp);
	const eraserOpacity = interpolate(frame, [62, 66, 78, 82], [0, 1, 1, 0], clamp);
	const smearOpacity = interpolate(frame, [66, 72, 84], [0, 0.18, 0], clamp);

	// ------------------------------------------
	// BEAT 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2;
	const badgeFloat = Math.sin(frame * 0.11) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shineOffset = interpolate((frame + 10) % 70, [0, 70], [-220, 920], clamp);

	// Board slide feel
	const boardSlideX = interpolate(frame, [0, 14], [40, 0], clamp);

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -50], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// Chalk dust particles helper
	const Dust = ({
		left,
		top,
		scale,
		alpha,
	}: {
		left: number;
		top: number;
		scale: number;
		alpha: number;
	}) => (
		<div
			style={{
				position: 'absolute',
				left,
				top,
				width: 56 * scale,
				height: 24 * scale,
				opacity: alpha,
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					position: 'absolute',
					left: 0,
					top: 6,
					width: 14 * scale,
					height: 14 * scale,
					borderRadius: '50%',
					background: 'rgba(242,242,233,0.22)',
					filter: 'blur(2px)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 14 * scale,
					top: 0,
					width: 18 * scale,
					height: 18 * scale,
					borderRadius: '50%',
					background: 'rgba(242,242,233,0.18)',
					filter: 'blur(2px)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 30 * scale,
					top: 8 * scale,
					width: 12 * scale,
					height: 12 * scale,
					borderRadius: '50%',
					background: 'rgba(242,242,233,0.2)',
					filter: 'blur(2px)',
				}}
			/>
			<div
				style={{
					position: 'absolute',
					left: 40 * scale,
					top: 4 * scale,
					width: 10 * scale,
					height: 10 * scale,
					borderRadius: '50%',
					background: 'rgba(244,224,77,0.15)',
					filter: 'blur(2px)',
				}}
			/>
		</div>
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#2A3B33',
				fontFamily: '"Comic Sans MS", "Trebuchet MS", "Arial Black", cursive, sans-serif',
				opacity,
				color: '#F2F2E9',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '100%',
					margin: '0 auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '54px 10px 42px',
					boxSizing: 'border-box',
					transform: `translate(${boardSlideX}px, ${exitY}px)`,
				}}
			>
				{/* Tier 1 Badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px) rotate(-0.8deg)`,
						backgroundColor: '#1A2620',
						border: '3px solid #E8A0BF',
						borderRadius: 18,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 26px rgba(0,0,0,0.28)',
						position: 'relative',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#F4E04D',
							boxShadow: '0 0 0 3px rgba(244,224,77,0.16)',
						}}
					/>
					<div
						style={{
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 3,
							textTransform: 'uppercase',
							color: '#F2F2E9',
						}}
					>
						CHALK THEOREM
					</div>
				</div>

				{/* Tier 2 Hero */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							maxWidth: 1080,
							minHeight: 540,
							backgroundColor: '#1A2620',
							border: '4px solid #F2F2E9',
							borderRadius: 32,
							boxShadow: '0 18px 42px rgba(0,0,0,0.36)',
							position: 'relative',
							overflow: 'hidden',
							padding: '44px 42px 38px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'space-between',
							textAlign: 'center',
							gap: 22,
						}}
					>
						{/* subtle chalk shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(180deg, rgba(242,242,233,0.00), rgba(242,242,233,0.10), rgba(242,242,233,0.00))',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* chalk speckles */}
						<div
							style={{
								position: 'absolute',
								inset: 0,
								pointerEvents: 'none',
								opacity: 0.14,
								backgroundImage:
									'radial-gradient(circle at 12% 18%, #F2F2E9 0 1px, transparent 1.2px), radial-gradient(circle at 76% 24%, #F2F2E9 0 1px, transparent 1.2px), radial-gradient(circle at 18% 72%, #F2F2E9 0 1px, transparent 1.2px), radial-gradient(circle at 82% 66%, #F2F2E9 0 1px, transparent 1.2px), radial-gradient(circle at 48% 12%, #F4E04D 0 1px, transparent 1.2px)',
							}}
						/>

						{/* headline area */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 12,
								position: 'relative',
							}}
						>
							<div
								style={{
									position: 'relative',
									width: 760,
									maxWidth: '100%',
									height: 92,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										opacity: chalkWrite1,
										clipPath: `inset(0 ${100 - chalkWrite1 * 100}% 0 0)`,
									}}
								>
									<div
										style={{
											fontSize: 76,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: 1.5,
											textTransform: 'uppercase',
											color: '#F2F2E9',
											textShadow:
												'0 0 1px #F2F2E9, 0 0 10px rgba(242,242,233,0.06)',
										}}
									>
										AUTOMATED MARGINS
									</div>
								</div>

								<div
									style={{
										position: 'absolute',
										left: 0,
										right: 0,
										bottom: 4,
										height: 2,
										background:
											'linear-gradient(90deg, transparent, rgba(242,242,233,0.28), transparent)',
										opacity: 0.25,
									}}
								/>
							</div>

							<Dust left={210} top={56} scale={1.05} alpha={dust1} />
						</div>

						{/* metric block */}
						<div
							style={{
								width: '78%',
								minWidth: 720,
								maxWidth: 860,
								backgroundColor: '#243229',
								border: '3px solid #F4E04D',
								borderRadius: 26,
								padding: '26px 28px 22px',
								boxSizing: 'border-box',
								position: 'relative',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 14,
								boxShadow: '0 10px 24px rgba(0,0,0,0.22)',
							}}
						>
							<div
								style={{
									position: 'absolute',
									inset: 0,
									borderRadius: 26,
									boxShadow: 'inset 0 0 0 1px rgba(242,242,233,0.06)',
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									position: 'relative',
									width: '100%',
									height: 110,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										opacity: chalkWrite2,
										clipPath: `inset(0 ${100 - chalkWrite2 * 100}% 0 0)`,
									}}
								>
									<div
										style={{
											fontSize: 68,
											fontWeight: 900,
											lineHeight: 1,
											letterSpacing: 1,
											color: '#F4E04D',
											textTransform: 'uppercase',
											fontFamily: '"Georgia", "Times New Roman", serif',
											textShadow:
												'0 0 1px #F4E04D, 0 0 8px rgba(244,224,77,0.08)',
											whiteSpace: 'nowrap',
										}}
									>
										{metricText}
									</div>
								</div>
							</div>

							{/* eraser smear safely below text */}
							<div
								style={{
									position: 'absolute',
									left: 0,
									right: 0,
									bottom: 18,
									height: 18,
									opacity: smearOpacity,
									background:
										'linear-gradient(90deg, transparent 0%, rgba(242,242,233,0.10) 18%, rgba(242,242,233,0.18) 50%, rgba(242,242,233,0.10) 82%, transparent 100%)',
									filter: 'blur(3px)',
									pointerEvents: 'none',
								}}
							/>

							<div
								style={{
									position: 'relative',
									width: 470,
									height: 34,
									marginTop: 2,
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										top: 4,
										width: 470,
										height: 6,
										backgroundColor: '#E8A0BF',
										borderRadius: 999,
										transform: `scaleX(${chalkWrite3}) scale(${underlineScale1})`,
										transformOrigin: 'left center',
										opacity: 0.95,
									}}
								/>
								<div
									style={{
										position: 'absolute',
										left: 18,
										top: 18,
										width: 430,
										height: 5,
										backgroundColor: '#F2F2E9',
										borderRadius: 999,
										transform: `scaleX(${chalkWrite3}) scale(${underlineScale2})`,
										transformOrigin: 'left center',
										opacity: 0.92,
									}}
								/>
							</div>

							<Dust left={130} top={88} scale={0.95} alpha={dust2} />
							<Dust left={585} top={92} scale={0.85} alpha={dust3} />

							{/* eraser */}
							<div
								style={{
									position: 'absolute',
									left: eraserX,
									bottom: 10,
									width: 84,
									height: 28,
									opacity: eraserOpacity,
									borderRadius: 10,
									background:
										'linear-gradient(180deg, #E8A0BF 0%, #d98caf 100%)',
									border: '2px solid rgba(26,38,32,0.55)',
									boxShadow: '0 4px 10px rgba(0,0,0,0.22)',
									transform: 'rotate(-5deg)',
								}}
							/>
						</div>

						{/* supporting chalk note */}
						<div
							style={{
								backgroundColor: '#F2F2E9',
								color: '#1A2620',
								borderRadius: 16,
								padding: '12px 28px',
								fontSize: 22,
								fontWeight: 900,
								letterSpacing: 2.5,
								textTransform: 'uppercase',
								boxShadow: '0 8px 18px rgba(0,0,0,0.18)',
								border: '2px solid rgba(26,38,32,0.08)',
							}}
						>
							BOARDROOM MATH
						</div>
					</div>
				</div>

				{/* Tier 3 Takeaway */}
				<div
					style={{
						transform: `scale(${bottomIn}) translateY(${footerFloat}px) rotate(0.5deg)`,
						backgroundColor: '#F4E04D',
						border: '3px solid #1A2620',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.28)',
						textAlign: 'center',
						maxWidth: 920,
					}}
				>
					<div
						style={{
							color: '#1A2620',
							fontSize: 24,
							fontWeight: 1000,
							letterSpacing: 2.5,
							textTransform: 'uppercase',
							lineHeight: 1.1,
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}