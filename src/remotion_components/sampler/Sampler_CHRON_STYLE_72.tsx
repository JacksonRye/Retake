import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_72() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: snappy pop entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.55},
	});
	const cardIn = spring({
		frame: frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});
	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// Beat 2: active state switch / rolling stat
	const commissionNumber = Math.round(interpolate(frame, [14, 52], [12, 50], clamp));
	const hpWidth = interpolate(frame, [24, 68], [100, 50], clamp);

	const typeCount = Math.floor(interpolate(frame, [10, 34], [0, 17], clamp));
	const typedHeadline = 'AUTOMATED MARGINS'.slice(0, typeCount);

	const flashOpacity = interpolate(frame, [56, 62, 68], [0, 0.9, 0], clamp);
	const flashScale = interpolate(frame, [56, 62, 68], [0.9, 1.08, 1], clamp);

	// Beat 3: living hover + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-220, 900], clamp);

	// Step-like 8-bit micro movement
	const tileStepX = Math.round(Math.sin(frame * 0.18) * 4);
	const tileStepY = Math.round(Math.cos(frame * 0.13) * 3);

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -60], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const PixelPanel = ({
		children,
		style = {},
		borderColor = '#3450A1',
		backgroundColor = '#D7263D',
	}: {
		children: React.ReactNode;
		style?: React.CSSProperties;
		borderColor?: string;
		backgroundColor?: string;
	}) => {
		return (
			<div
				style={{
					position: 'relative',
					backgroundColor,
					border: `6px solid ${borderColor}`,
					boxShadow: `
						0 0 0 6px #1B1D36,
						0 ${shadowPulse}px 0 rgba(0,0,0,0.28)
					`,
					...style,
				}}
			>
				<div
					style={{
						position: 'absolute',
						inset: 0,
						pointerEvents: 'none',
						boxShadow: 'inset 0 0 0 4px rgba(249,194,46,0.65)',
					}}
				/>
				{children}
			</div>
		);
	};

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#1B1D36',
				fontFamily:
					'"Press Start 2P", "VT323", "Courier New", monospace',
				opacity,
				justifyContent: 'center',
				alignItems: 'center',
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
					padding: '44px 14px 28px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<PixelPanel
					borderColor="#F9C22E"
					backgroundColor="#3450A1"
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						padding: '14px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
					}}
				>
					<div
						style={{
							width: 14,
							height: 14,
							backgroundColor: '#58C322',
							boxShadow: '0 0 0 3px #F9C22E',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F9C22E',
							fontSize: 18,
							lineHeight: 1.2,
							letterSpacing: 1,
							textTransform: 'uppercase',
							whiteSpace: 'nowrap',
						}}
					>
						QUEST REWARD
					</div>
				</PixelPanel>

				{/* Tier 2: Massive hero card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '20px 0',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						position: 'relative',
					}}
				>
					<PixelPanel
						borderColor="#3450A1"
						backgroundColor="#D7263D"
						style={{
							width: '100%',
							minHeight: 540,
							padding: '34px 34px 28px',
							boxSizing: 'border-box',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							position: 'relative',
						}}
					>
						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								backgroundColor: 'rgba(249,194,46,0.18)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* level-up flash */}
						<div
							style={{
								position: 'absolute',
								inset: 18,
								backgroundColor: `rgba(249,194,46,${flashOpacity})`,
								mixBlendMode: 'screen',
								transform: `scale(${flashScale})`,
								pointerEvents: 'none',
							}}
						/>

						{/* Top dialogue frame */}
						<div
							style={{
								backgroundColor: '#1B1D36',
								border: '6px solid #F9C22E',
								padding: '20px 24px',
								minHeight: 122,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									color: '#F9C22E',
									fontSize: 58,
									lineHeight: 1.02,
									textAlign: 'center',
									textTransform: 'uppercase',
									letterSpacing: 0,
									maxWidth: '100%',
									wordBreak: 'keep-all',
								}}
							>
								{typedHeadline}
								<span
									style={{
										opacity: frame % 16 < 8 ? 1 : 0,
										color: '#58C322',
									}}
								>
									_
								</span>
							</div>
						</div>

						{/* Middle stat area */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 24,
								padding: '18px 0',
								flex: 1,
							}}
						>
							<div
								style={{
									backgroundColor: '#3450A1',
									border: '6px solid #F9C22E',
									padding: '14px 22px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									minWidth: 420,
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										color: '#F9C22E',
										fontSize: 28,
										lineHeight: 1.1,
										textTransform: 'uppercase',
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									COMMISSION RATE
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: 16,
									width: '100%',
								}}
							>
								<div
									style={{
										color: '#58C322',
										fontSize: 82,
										lineHeight: 0.95,
										textTransform: 'uppercase',
										textAlign: 'center',
										textShadow: '6px 6px 0 #1B1D36',
										whiteSpace: 'nowrap',
									}}
								>
									{commissionNumber}% COMMISSION
								</div>

								<div
									style={{
										width: '82%',
										maxWidth: 650,
										backgroundColor: '#1B1D36',
										border: '6px solid #3450A1',
										padding: 8,
										boxSizing: 'border-box',
									}}
								>
									<div
										style={{
											height: 34,
											width: `${hpWidth}%`,
											backgroundColor: '#58C322',
											boxShadow: 'inset 0 0 0 4px rgba(249,194,46,0.35)',
										}}
									/>
								</div>
							</div>
						</div>

						{/* Bottom stat strip */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 20,
								backgroundColor: '#1B1D36',
								border: '6px solid #3450A1',
								padding: '18px 22px',
								boxSizing: 'border-box',
							}}
						>
							<div
								style={{
									color: '#F9C22E',
									fontSize: 22,
									lineHeight: 1.2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								LVL 50
							</div>

							<div
								style={{
									color: '#3450A1',
									fontSize: 24,
									lineHeight: 1.2,
									textTransform: 'uppercase',
									textAlign: 'center',
									flex: 1,
								}}
							>
								PASSIVE LOOT UNLOCKED
							</div>

							<div
								style={{
									color: '#58C322',
									fontSize: 22,
									lineHeight: 1.2,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
									transform: `translate(${tileStepX}px, ${tileStepY}px)`,
								}}
							>
								HP 50
							</div>
						</div>
					</PixelPanel>
				</div>

				{/* Tier 3: Takeaway punchline */}
				<PixelPanel
					borderColor="#58C322"
					backgroundColor="#F9C22E"
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						padding: '16px 28px',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#1B1D36',
							fontSize: 22,
							lineHeight: 1.25,
							textTransform: 'uppercase',
							letterSpacing: 0.5,
							whiteSpace: 'nowrap',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</PixelPanel>
			</div>
		</AbsoluteFill>
	);
}