import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_35() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// Beat 1: Snappy entrance
	// ------------------------------------------
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.5},
	});
	const cardIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});
	const takeawayIn = spring({
		frame: frame - 8,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});

	// ------------------------------------------
	// Beat 2: Active metric / forum state motion
	// ------------------------------------------
	const percentValue = Math.round(interpolate(frame, [16, 62], [12, 50], clamp));
	const metricText = `${percentValue}% COMMISSION`;

	const rowReveal1 = interpolate(frame, [8, 18], [0, 1], clamp);
	const rowReveal2 = interpolate(frame, [14, 24], [0, 1], clamp);
	const rowReveal3 = interpolate(frame, [20, 30], [0, 1], clamp);

	const avatarPixelation = Math.floor(interpolate(frame, [18, 48], [3, 9], clamp));
	const tickerOffset = interpolate(frame, [24, 110], [0, -420], clamp);

	// ------------------------------------------
	// Beat 3: Living hover loop
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 18) % 68, [0, 68], [-220, 980], clamp);
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1) * 3;

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -60],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const rowStyle = (reveal: number) =>
		({
			width: '100%',
			height: 86,
			backgroundColor: '#F4F2EC',
			border: '3px solid #2C3E70',
			boxSizing: 'border-box' as const,
			display: 'grid',
			gridTemplateColumns: '96px 1.2fr 1fr 150px',
			alignItems: 'center',
			padding: '0 18px',
			columnGap: 16,
			transform: `scaleY(${reveal})`,
			transformOrigin: 'top',
			overflow: 'hidden',
		}) satisfies React.CSSProperties;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#2C3E70',
				fontFamily: 'Verdana, Arial, sans-serif',
				justifyContent: 'center',
				alignItems: 'center',
				opacity,
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
					padding: '58px 18px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Category badge */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#F4F2EC',
						border: '3px solid #0000EE',
						borderRadius: 8,
						padding: '10px 22px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 20px rgba(0,0,0,0.28)',
					}}
				>
					<div
						style={{
							width: 18,
							height: 18,
							backgroundColor: '#E25822',
							border: '2px solid #2C3E70',
							boxSizing: 'border-box',
						}}
					/>
					<div
						style={{
							color: '#2C3E70',
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 1.5,
							textTransform: 'uppercase',
						}}
					>
						Message Board Rank
					</div>
					<div
						style={{
							backgroundColor: '#0000EE',
							color: '#F4F2EC',
							fontSize: 14,
							fontWeight: 700,
							padding: '4px 10px',
							border: '2px solid #2C3E70',
							lineHeight: 1,
						}}
					>
						ACTIVATION CODE
					</div>
				</div>

				{/* Tier 2: Massive hero card */}
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
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#F4F2EC',
							border: '4px solid #D6D9DE',
							borderRadius: 18,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.34)`,
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							flexDirection: 'column',
							padding: '30px 28px 26px',
							boxSizing: 'border-box',
							gap: 20,
						}}
					>
						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								backgroundColor: 'rgba(214,217,222,0.18)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top forum nav */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								borderBottom: '3px solid #2C3E70',
								paddingBottom: 12,
								position: 'relative',
								zIndex: 2,
								gap: 16,
							}}
						>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 12,
									minWidth: 0,
								}}
							>
								<div
									style={{
										width: 52,
										height: 52,
										backgroundColor: '#D6D9DE',
										border: '3px solid #2C3E70',
										display: 'grid',
										gridTemplateColumns: `repeat(${avatarPixelation}, 1fr)`,
										gridTemplateRows: `repeat(${avatarPixelation}, 1fr)`,
										overflow: 'hidden',
										flexShrink: 0,
									}}
								>
									{Array.from({length: avatarPixelation * avatarPixelation}).map((_, i) => {
										const pattern =
											i % 2 === 0 || i % avatarPixelation === 0 || i % 5 === 0;
										return (
											<div
												key={i}
												style={{
													backgroundColor: pattern ? '#0000EE' : '#E25822',
												}}
											/>
										);
									})}
								</div>

								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										gap: 4,
										minWidth: 0,
									}}
								>
									<div
										style={{
											color: '#2C3E70',
											fontSize: 16,
											fontWeight: 700,
											lineHeight: 1.1,
										}}
									>
										thread://growth-tools/live
									</div>
									<div
										style={{
											color: '#0000EE',
											fontSize: 15,
											fontWeight: 700,
											textDecoration: 'underline',
											lineHeight: 1.1,
										}}
									>
										view latest replies
									</div>
								</div>
							</div>

							<div
								style={{
									backgroundColor: '#E25822',
									color: '#F4F2EC',
									border: '3px solid #2C3E70',
									padding: '8px 14px',
									fontSize: 14,
									fontWeight: 700,
									lineHeight: 1,
									whiteSpace: 'nowrap',
									flexShrink: 0,
								}}
							>
								STATUS: LIVE
							</div>
						</div>

						{/* giant headline */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 16,
								paddingTop: 6,
							}}
						>
							<div
								style={{
									color: '#2C3E70',
									fontSize: 72,
									fontWeight: 700,
									lineHeight: 0.95,
									textAlign: 'center',
									letterSpacing: -2,
									textTransform: 'uppercase',
									maxWidth: '100%',
								}}
							>
								AUTOMATED
								<br />
								MARGINS
							</div>

							<div
								style={{
									color: '#0000EE',
									fontSize: 22,
									fontWeight: 700,
									textDecoration: 'underline',
									textUnderlineOffset: 4,
									textTransform: 'uppercase',
									letterSpacing: 1.5,
									textAlign: 'center',
								}}
							>
								click to open profit thread
							</div>
						</div>

						{/* metric box */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								justifyContent: 'center',
							}}
						>
							<div
								style={{
									width: '82%',
									minHeight: 112,
									backgroundColor: '#2C3E70',
									border: '4px solid #0000EE',
									boxShadow: 'inset 0 0 0 3px #D6D9DE',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									padding: '16px 24px',
									boxSizing: 'border-box',
								}}
							>
								<div
									style={{
										color: '#F4F2EC',
										fontSize: 58,
										fontWeight: 700,
										lineHeight: 1,
										letterSpacing: -1,
										textAlign: 'center',
										textTransform: 'uppercase',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>
						</div>

						{/* forum rows */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								flexDirection: 'column',
								gap: 0,
								border: '3px solid #2C3E70',
								backgroundColor: '#2C3E70',
								overflow: 'hidden',
							}}
						>
							<div style={rowStyle(rowReveal1)}>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											backgroundColor: '#0000EE',
											color: '#F4F2EC',
											fontSize: 13,
											fontWeight: 700,
											padding: '6px 10px',
											border: '2px solid #2C3E70',
											lineHeight: 1,
										}}
									>
										ADMIN
									</div>
								</div>
								<div
									style={{
										color: '#2C3E70',
										fontSize: 17,
										fontWeight: 700,
										textDecoration: 'underline',
										textUnderlineOffset: 3,
										whiteSpace: 'nowrap',
									}}
								>
									auto-deploy closes more deals
								</div>
								<div
									style={{
										color: '#2C3E70',
										fontSize: 16,
										fontWeight: 700,
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									reply count rollover
								</div>
								<div
									style={{
										color: '#E25822',
										fontSize: 22,
										fontWeight: 700,
										textAlign: 'right',
										whiteSpace: 'nowrap',
									}}
								>
									{Math.round(interpolate(frame, [20, 60], [8, 42], clamp))}
								</div>
							</div>

							<div style={rowStyle(rowReveal2)}>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											backgroundColor: '#E25822',
											color: '#F4F2EC',
											fontSize: 13,
											fontWeight: 700,
											padding: '6px 10px',
											border: '2px solid #2C3E70',
											lineHeight: 1,
										}}
									>
										PRO
									</div>
								</div>
								<div
									style={{
										color: '#2C3E70',
										fontSize: 17,
										fontWeight: 700,
										textDecoration: 'underline',
										textUnderlineOffset: 3,
										whiteSpace: 'nowrap',
									}}
								>
									margins update while you sleep
								</div>
								<div
									style={{
										color: '#2C3E70',
										fontSize: 16,
										fontWeight: 700,
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									commission sync
								</div>
								<div
									style={{
										color: '#0000EE',
										fontSize: 22,
										fontWeight: 700,
										textAlign: 'right',
										whiteSpace: 'nowrap',
									}}
								>
									{Math.round(interpolate(frame, [24, 66], [11, 50], clamp))}%
								</div>
							</div>

							<div style={rowStyle(rowReveal3)}>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											backgroundColor: '#D6D9DE',
											color: '#2C3E70',
											fontSize: 13,
											fontWeight: 700,
											padding: '6px 10px',
											border: '2px solid #2C3E70',
											lineHeight: 1,
										}}
									>
										NEW
									</div>
								</div>
								<div
									style={{
										color: '#2C3E70',
										fontSize: 17,
										fontWeight: 700,
										textDecoration: 'underline',
										textUnderlineOffset: 3,
										whiteSpace: 'nowrap',
									}}
								>
									software leverage compounds fast
								</div>
								<div
									style={{
										color: '#2C3E70',
										fontSize: 16,
										fontWeight: 700,
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									thread velocity
								</div>
								<div
									style={{
										color: '#E25822',
										fontSize: 22,
										fontWeight: 700,
										textAlign: 'right',
										whiteSpace: 'nowrap',
									}}
								>
									x{Math.round(interpolate(frame, [28, 70], [2, 9], clamp))}
								</div>
							</div>
						</div>

						{/* marquee footer inside card */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								height: 34,
								border: '3px solid #2C3E70',
								backgroundColor: '#D6D9DE',
								overflow: 'hidden',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<div
								style={{
									whiteSpace: 'nowrap',
									transform: `translateX(${tickerOffset}px)`,
									color: '#0000EE',
									fontSize: 16,
									fontWeight: 700,
									textDecoration: 'underline',
									textUnderlineOffset: 3,
									paddingLeft: 20,
								}}
							>
								live update • automated margins • 50% commission • pure software leverage • live update • automated margins • 50% commission • pure software leverage
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3: takeaway */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#F4F2EC',
						border: '3px solid #0000EE',
						boxShadow: '0 8px 22px rgba(0,0,0,0.28)',
						padding: '16px 28px',
						textAlign: 'center',
						maxWidth: '90%',
					}}
				>
					<div
						style={{
							color: '#0000EE',
							fontSize: 24,
							fontWeight: 700,
							textTransform: 'uppercase',
							textDecoration: 'underline',
							textUnderlineOffset: 5,
							letterSpacing: 1.2,
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