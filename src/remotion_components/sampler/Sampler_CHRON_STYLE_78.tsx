import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_78() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const entrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.62},
	});

	const badgeEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.52},
	});

	const takeawayEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.58},
	});

	// Natural-history drawer pull motion
	const drawerPull = interpolate(frame, [0, 18, 30], [-120, 18, 0], clamp);
	const labelFlip = interpolate(frame, [26, 38], [-90, 0], clamp);

	// Beat 2: active metric reveal / rolling state
	const metricReveal = spring({
		frame: frame - 22,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	const percentRoll = Math.round(interpolate(frame, [20, 58], [12, 50], clamp));
	const metricText = `${percentRoll}% COMMISSION`;

	// Loupe pass
	const loupeVisible = frame >= 34 && frame <= 86;
	const loupeX = interpolate(frame, [34, 86], [-180, 540], clamp);
	const loupeY = interpolate(frame, [34, 86], [70, -30], clamp);
	const loupeScale = interpolate(frame, [34, 48, 86], [0.7, 1, 0.82], clamp);

	// Beat 3: continuous living hover
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 72, [0, 72], [-260, 920], clamp);

	// Pin-drop micro motion
	const pinDrop = interpolate(frame, [10, 18], [-40, 0], clamp);
	const pinBounce = Math.sin(Math.max(0, frame - 18) * 0.35) * Math.exp(-Math.max(0, frame - 18) / 14) * 10;

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);

	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#5B4636',
				opacity,
				fontFamily:
					'"Baskerville", "Garamond", "Times New Roman", Georgia, serif',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					width: '94%',
					maxWidth: 980,
					height: '88%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '54px 18px 44px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: category badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: '#3F3225',
						border: '2px solid #C9A227',
						borderRadius: 14,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow: '0 10px 24px rgba(0,0,0,0.28)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#C9A227',
							transform: `translateY(${pinDrop + pinBounce}px)`,
							boxShadow: '0 2px 0 rgba(63,50,37,0.7)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F3EDDD',
							fontSize: 20,
							fontWeight: 700,
							fontVariant: 'small-caps',
							letterSpacing: 3,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						specimen drawer · cat. no. 078
					</div>
				</div>

				{/* Tier 2: massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
						margin: '20px 0 22px',
						transform: `scale(${entrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 544,
							backgroundColor: '#5C7E9E',
							border: '4px solid #F3EDDD',
							borderRadius: 30,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.38)`,
							padding: '46px 42px 40px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							alignItems: 'center',
							position: 'relative',
							overflow: 'hidden',
							transform: `translateY(${drawerPull}px)`,
						}}
					>
						{/* engraved paper field */}
						<div
							style={{
								position: 'absolute',
								inset: 16,
								border: '1.5px solid rgba(243,237,221,0.5)',
								borderRadius: 22,
								pointerEvents: 'none',
							}}
						/>

						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 130,
								background:
									'linear-gradient(180deg, rgba(243,237,221,0), rgba(243,237,221,0.18), rgba(243,237,221,0))',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top catalog strip */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								padding: '0 6px',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#F3EDDD',
									fontSize: 18,
									fontStyle: 'italic',
									letterSpacing: 1.2,
									opacity: 0.9,
									whiteSpace: 'nowrap',
								}}
							>
								Marginis automata
							</div>
							<div
								style={{
									color: '#3F3225',
									backgroundColor: '#F3EDDD',
									border: '2px solid #3F3225',
									borderRadius: 10,
									padding: '8px 14px',
									fontSize: 16,
									fontWeight: 700,
									fontVariant: 'small-caps',
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
									transform: `rotate(0deg)`,
									transformOrigin: 'top center',
								}}
							>
								plate a-12
							</div>
						</div>

						{/* headline */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '10px 12px 0',
								zIndex: 2,
							}}
						>
							<div
								style={{
									color: '#F3EDDD',
									fontSize: 72,
									lineHeight: 1.02,
									fontWeight: 700,
									textAlign: 'center',
									letterSpacing: -1.4,
									textTransform: 'uppercase',
									maxWidth: 780,
									textShadow: '0 1px 0 rgba(63,50,37,0.25)',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* metric plaque */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								padding: '6px 0',
								zIndex: 3,
							}}
						>
							<div
								style={{
									backgroundColor: '#F3EDDD',
									border: '3px solid #C9A227',
									borderRadius: 24,
									padding: '20px 34px',
									boxShadow: '0 10px 22px rgba(63,50,37,0.18)',
									transform: `scale(${0.85 + metricReveal * 0.15})`,
									maxWidth: 760,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<div
									style={{
										color: '#3F3225',
										fontSize: 64,
										lineHeight: 1,
										fontWeight: 800,
										textAlign: 'center',
										letterSpacing: 1.2,
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>
						</div>

						{/* bottom specimen caption */}
						<div
							style={{
								width: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								zIndex: 2,
							}}
						>
							<div
								style={{
									backgroundColor: '#3F3225',
									border: '2px solid #C9A227',
									borderRadius: 14,
									padding: '12px 24px',
									color: '#F3EDDD',
									fontSize: 22,
									fontStyle: 'italic',
									letterSpacing: 1.1,
									textAlign: 'center',
									maxWidth: 680,
								}}
							>
								Engraved revenue specimen · preserved in software
							</div>
						</div>
					</div>

					{/* Loupe magnify pass - positioned safely away from text baseline */}
					{loupeVisible && (
						<div
							style={{
								position: 'absolute',
								left: '12%',
								top: '55%',
								transform: `translate(${loupeX}px, ${loupeY}px) scale(${loupeScale})`,
								pointerEvents: 'none',
								zIndex: 4,
								opacity: 0.96,
							}}
						>
							<div
								style={{
									position: 'relative',
									width: 132,
									height: 132,
								}}
							>
								<div
									style={{
										width: 104,
										height: 104,
										borderRadius: '50%',
										border: '8px solid #F3EDDD',
										background:
											'radial-gradient(circle at 40% 40%, rgba(243,237,221,0.28), rgba(243,237,221,0.06) 58%, rgba(91,70,54,0.08) 100%)',
										boxShadow: '0 8px 18px rgba(0,0,0,0.22)',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										width: 64,
										height: 14,
										backgroundColor: '#C9A227',
										border: '3px solid #F3EDDD',
										borderRadius: 10,
										right: 0,
										bottom: 10,
										transform: 'rotate(42deg)',
										transformOrigin: 'left center',
									}}
								/>
							</div>
						</div>
					)}
				</div>

				{/* Tier 3: takeaway */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#C9A227',
						border: '2px solid #F3EDDD',
						borderRadius: 18,
						padding: '16px 34px',
						boxShadow: '0 8px 20px rgba(0,0,0,0.28)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#3F3225',
							fontSize: 22,
							fontWeight: 800,
							letterSpacing: 2.4,
							textTransform: 'uppercase',
							fontVariant: 'small-caps',
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