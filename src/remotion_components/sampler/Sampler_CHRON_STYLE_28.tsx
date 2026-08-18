import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_28() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});

	const cardIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	// ------------------------------------------
	// Beat 2: Count / Fill
	// ------------------------------------------
	const followerCount = Math.round(
		interpolate(frame, [16, 62], [12, 50], clamp)
	);

	const progress = interpolate(frame, [20, 72], [0.08, 1], clamp);

	// ------------------------------------------
	// Beat 3: Living hover
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 68, [0, 68], [-260, 980], clamp);

	// ------------------------------------------
	// Exit
	// ------------------------------------------
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -55],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// ------------------------------------------
	// Alert slide accents
	// ------------------------------------------
	const alertLeft = interpolate(frame, [3, 18], [-180, 0], clamp);
	const alertRight = interpolate(frame, [6, 22], [180, 0], clamp);

	// ------------------------------------------
	// Emote rain (kept at top region only to avoid text collisions)
	// ------------------------------------------
	const emotes = [
		{emoji: '◆', x: '11%', start: 8, speed: 1.8, size: 22, color: '#9146FF'},
		{emoji: '●', x: '21%', start: 14, speed: 1.5, size: 14, color: '#1FD68A'},
		{emoji: '▲', x: '33%', start: 4, speed: 1.9, size: 18, color: '#FFB626'},
		{emoji: '✦', x: '67%', start: 10, speed: 1.6, size: 18, color: '#9146FF'},
		{emoji: '■', x: '79%', start: 18, speed: 1.7, size: 16, color: '#1FD68A'},
		{emoji: '✦', x: '89%', start: 7, speed: 1.45, size: 20, color: '#FFB626'},
	];

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0E0E10',
				opacity,
				fontFamily:
					'"Arial Black", Impact, Inter, ui-sans-serif, system-ui, sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			{/* Background emote rain */}
			{emotes.map((emote, i) => {
				const localFrame = Math.max(0, frame - emote.start);
				const y = -30 + ((localFrame * emote.speed * 7) % 210);
				const rotate = Math.sin((frame + i * 9) * 0.09) * 10;
				const emoteOpacity = interpolate(frame, [0, 10, 120, 135], [0, 0.9, 0.9, 0], clamp);

				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: emote.x,
							top: 24 + y,
							transform: `translateX(-50%) rotate(${rotate}deg)`,
							fontSize: emote.size,
							fontWeight: 900,
							color: emote.color,
							opacity: emoteOpacity,
							pointerEvents: 'none',
							zIndex: 1,
							textShadow: '0 4px 10px rgba(0,0,0,0.35)',
						}}
					>
						{emote.emoji}
					</div>
				);
			})}

			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '52px 16px 42px 16px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
					position: 'relative',
					zIndex: 2,
				}}
			>
				{/* TIER 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						padding: '12px 24px',
						borderRadius: 18,
						backgroundColor: '#EFEFF1',
						border: '3px solid #9146FF',
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
					}}
				>
					<div
						style={{
							width: 14,
							height: 14,
							borderRadius: 999,
							backgroundColor: '#1FD68A',
							boxShadow: '0 0 0 4px rgba(31,214,138,0.18)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#0E0E10',
							fontSize: 18,
							fontWeight: 1000,
							letterSpacing: 2.6,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						Going Live
					</div>
				</div>

				{/* TIER 2: Massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						position: 'relative',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					{/* floating side alerts, kept outside text safe zone */}
					<div
						style={{
							position: 'absolute',
							left: 0,
							top: 34,
							transform: `translateX(${alertLeft}px)`,
							zIndex: 5,
						}}
					>
						<div
							style={{
								backgroundColor: '#9146FF',
								color: '#EFEFF1',
								padding: '10px 16px',
								borderRadius: 14,
								fontSize: 16,
								fontWeight: 1000,
								letterSpacing: 1.2,
								textTransform: 'uppercase',
								boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
								whiteSpace: 'nowrap',
							}}
						>
							New Sub Alert
						</div>
					</div>

					<div
						style={{
							position: 'absolute',
							right: 0,
							top: 92,
							transform: `translateX(${alertRight}px)`,
							zIndex: 5,
						}}
					>
						<div
							style={{
								backgroundColor: '#1FD68A',
								color: '#0E0E10',
								padding: '10px 16px',
								borderRadius: 14,
								fontSize: 16,
								fontWeight: 1000,
								letterSpacing: 1.2,
								textTransform: 'uppercase',
								boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
								whiteSpace: 'nowrap',
							}}
						>
							Hype Train
						</div>
					</div>

					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: '#EFEFF1',
							border: '4px solid #9146FF',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.42)`,
							padding: '34px 34px 30px 34px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							gap: 22,
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 130,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.38) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top overlay bar */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 20,
								minHeight: 56,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									backgroundColor: '#0E0E10',
									borderRadius: 16,
									padding: '10px 16px',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										width: 12,
										height: 12,
										borderRadius: 999,
										backgroundColor: '#1FD68A',
										flexShrink: 0,
									}}
								/>
								<div
									style={{
										fontSize: 18,
										fontWeight: 1000,
										color: '#EFEFF1',
										letterSpacing: 1.5,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									Live Overlay
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									backgroundColor: '#FFB626',
									borderRadius: 16,
									padding: '10px 16px',
									flexShrink: 0,
								}}
							>
								<div
									style={{
										fontSize: 16,
										fontWeight: 1000,
										color: '#0E0E10',
										letterSpacing: 1.3,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									Followers
								</div>
								<div
									style={{
										fontSize: 24,
										fontWeight: 1000,
										color: '#0E0E10',
										lineHeight: 1,
										minWidth: 38,
										textAlign: 'right',
									}}
								>
									{followerCount}
								</div>
							</div>
						</div>

						{/* Main content */}
						<div
							style={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								textAlign: 'center',
								gap: 28,
								padding: '6px 16px',
							}}
						>
							<div
								style={{
									color: '#0E0E10',
									fontSize: 72,
									fontWeight: 1000,
									lineHeight: 1.02,
									letterSpacing: -1.8,
									textTransform: 'uppercase',
									maxWidth: 760,
								}}
							>
								AUTOMATED MARGINS
							</div>

							<div
								style={{
									width: '100%',
									maxWidth: 700,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 14,
								}}
							>
								<div
									style={{
										backgroundColor: '#0E0E10',
										border: '4px solid #9146FF',
										borderRadius: 26,
										padding: '18px 34px',
										boxShadow: '0 10px 24px rgba(145,70,255,0.18)',
									}}
								>
									<div
										style={{
											color: '#9146FF',
											fontSize: 68,
											fontWeight: 1000,
											lineHeight: 1,
											letterSpacing: -1,
											textTransform: 'uppercase',
											whiteSpace: 'nowrap',
										}}
									>
										50% COMMISSION
									</div>
								</div>

								<div
									style={{
										width: '100%',
										maxWidth: 620,
									}}
								>
									<div
										style={{
											height: 22,
											backgroundColor: 'rgba(14,14,16,0.12)',
											borderRadius: 999,
											overflow: 'hidden',
											border: '2px solid #0E0E10',
										}}
									>
										<div
											style={{
												width: `${progress * 100}%`,
												height: '100%',
												background:
													'linear-gradient(90deg, #1FD68A 0%, #FFB626 100%)',
												borderRadius: 999,
											}}
										/>
									</div>
								</div>

								<div
									style={{
										fontSize: 20,
										fontWeight: 1000,
										color: '#1FD68A',
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									Hype train fully engaged
								</div>
							</div>
						</div>

						{/* Bottom mini chat strip */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								gap: 10,
								alignItems: 'stretch',
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									backgroundColor: 'rgba(14,14,16,0.06)',
									borderRadius: 14,
									padding: '10px 14px',
								}}
							>
								<div
									style={{
										color: '#9146FF',
										fontSize: 16,
										fontWeight: 1000,
										flexShrink: 0,
									}}
								>
									user01
								</div>
								<div
									style={{
										color: '#0E0E10',
										fontSize: 16,
										fontWeight: 700,
										whiteSpace: 'nowrap',
									}}
								>
									this scales fast
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 10,
									backgroundColor: 'rgba(14,14,16,0.06)',
									borderRadius: 14,
									padding: '10px 14px',
								}}
							>
								<div
									style={{
										color: '#1FD68A',
										fontSize: 16,
										fontWeight: 1000,
										flexShrink: 0,
									}}
								>
									user02
								</div>
								<div
									style={{
										color: '#0E0E10',
										fontSize: 16,
										fontWeight: 700,
										whiteSpace: 'nowrap',
									}}
								>
									margin machine unlocked
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3: Takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#9146FF',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#EFEFF1',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}