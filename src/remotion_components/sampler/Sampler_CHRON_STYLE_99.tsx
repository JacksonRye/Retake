import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_99() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.55},
	});
	const cardEntrance = spring({
		frame: frame,
		fps,
		config: {damping: 13, stiffness: 220, mass: 0.65},
	});
	const takeawayEntrance = spring({
		frame: frame - 5,
		fps,
		config: {damping: 12, stiffness: 210, mass: 0.6},
	});

	// Beat 2: Active metric state roll
	const metricProgress = interpolate(frame, [16, 62], [0, 50], clamp);
	const metricInt = Math.round(metricProgress);
	const metricLabel = `${metricInt}% COMMISSION`;

	// Beat 3: Living hover / shine / background motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-260, 980], clamp);
	const checkerOffset = interpolate(frame, [0, durationInFrames], [0, 96], clamp);
	const sunDrop = interpolate(frame, [8, 46], [-120, 0], clamp);
	const sunGlow = 0.75 + Math.sin(frame * 0.05) * 0.08;

	const sceneOpacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FF93C9',
				fontFamily:
					'"Times New Roman", "Georgia", "Iowan Old Style", serif',
				opacity: sceneOpacity,
				overflow: 'hidden',
			}}
		>
			{/* Vaporwave background grid */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: 0.28,
					backgroundImage: `
            linear-gradient(to right, #3FD2C7 2px, transparent 2px),
            linear-gradient(to bottom, #3FD2C7 2px, transparent 2px)
          `,
					backgroundSize: '96px 96px',
					backgroundPosition: `${checkerOffset}px ${checkerOffset * 0.45}px`,
				}}
			/>

			{/* Horizon fade */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					bottom: 0,
					height: '46%',
					background:
						'linear-gradient(180deg, rgba(255,147,201,0) 0%, rgba(140,122,230,0.22) 44%, rgba(16,16,24,0.14) 100%)',
				}}
			/>

			{/* Sun */}
			<div
				style={{
					position: 'absolute',
					top: 86 + sunDrop,
					left: '50%',
					width: 280,
					height: 280,
					marginLeft: -140,
					borderRadius: '50%',
					background:
						'linear-gradient(180deg, #F4F4F8 0%, #F4F4F8 32%, #3FD2C7 100%)',
					boxShadow: `0 0 60px rgba(244,244,248,${sunGlow})`,
					overflow: 'hidden',
					opacity: 0.92,
				}}
			>
				{[0, 1, 2, 3, 4, 5].map((i) => (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: 0,
							right: 0,
							top: 34 + i * 34,
							height: 10,
							backgroundColor: '#FF93C9',
							opacity: 0.88,
						}}
					/>
				))}
			</div>

			{/* Main vertical layout */}
			<div
				style={{
					position: 'relative',
					zIndex: 5,
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						width: '94%',
						maxWidth: 1180,
						height: '88%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '52px 20px 40px',
						boxSizing: 'border-box',
						transform: `translateY(${exitY}px)`,
					}}
				>
					{/* Tier 1 */}
					<div
						style={{
							transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
							backgroundColor: '#101018',
							border: '3px solid #3FD2C7',
							borderRadius: 18,
							padding: '12px 30px',
							boxShadow: '0 10px 26px rgba(16,16,24,0.3)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								color: '#F4F4F8',
								fontSize: 20,
								fontStyle: 'italic',
								fontWeight: 700,
								letterSpacing: 4,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							ネオ・MALL SIGNAL
						</div>
					</div>

					{/* Tier 2 */}
					<div
						style={{
							width: '100%',
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							position: 'relative',
							margin: '22px 0',
							transform: `scale(${cardEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
						}}
					>
						<div
							style={{
								width: '100%',
								minHeight: 548,
								backgroundColor: '#101018',
								border: '4px solid #8C7AE6',
								borderRadius: 34,
								boxShadow: `0 ${shadowPulse}px 36px rgba(16,16,24,0.42)`,
								padding: '46px 44px',
								boxSizing: 'border-box',
								position: 'relative',
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 26,
							}}
						>
							{/* Subtle checkerboard ribbon */}
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									height: 18,
									backgroundImage:
										'linear-gradient(90deg, #3FD2C7 0 50%, #F4F4F8 50% 100%)',
									backgroundSize: '34px 18px',
									backgroundPosition: `${-checkerOffset * 1.2}px 0px`,
									opacity: 0.95,
								}}
							/>

							{/* Shine */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									width: 150,
									background:
										'linear-gradient(90deg, rgba(244,244,248,0) 0%, rgba(244,244,248,0.18) 50%, rgba(244,244,248,0) 100%)',
									transform: `translateX(${shineOffset}px) skewX(-22deg)`,
									pointerEvents: 'none',
								}}
							/>

							{/* Decorative side statues / pillars kept away from text */}
							<div
								style={{
									position: 'absolute',
									left: 20,
									top: 84,
									bottom: 84,
									width: 58,
									borderRadius: 28,
									border: '2px solid rgba(63,210,199,0.45)',
									background:
										'linear-gradient(180deg, rgba(244,244,248,0.14) 0%, rgba(140,122,230,0.18) 100%)',
									transform: `rotate(${-1.2 + Math.sin(frame * 0.04) * 0.8}deg)`,
									opacity: 0.7,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									right: 20,
									top: 84,
									bottom: 84,
									width: 58,
									borderRadius: 28,
									border: '2px solid rgba(63,210,199,0.45)',
									background:
										'linear-gradient(180deg, rgba(244,244,248,0.14) 0%, rgba(140,122,230,0.18) 100%)',
									transform: `rotate(${1.2 + Math.sin(frame * 0.04 + 1) * 0.8}deg)`,
									opacity: 0.7,
								}}
							/>

							{/* Headline */}
							<div
								style={{
									width: '100%',
									maxWidth: 860,
									textAlign: 'center',
									color: '#3FD2C7',
									fontSize: 74,
									lineHeight: 1.02,
									fontStyle: 'italic',
									fontWeight: 800,
									letterSpacing: 6,
									textTransform: 'uppercase',
									whiteSpace: 'normal',
								}}
							>
								AUTOMATED MARGINS
							</div>

							{/* Metric */}
							<div
								style={{
									background:
										'linear-gradient(180deg, rgba(244,244,248,0.08) 0%, rgba(140,122,230,0.12) 100%)',
									border: '3px solid #F4F4F8',
									borderRadius: 24,
									padding: '20px 34px',
									minWidth: 760,
									maxWidth: 860,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 10px 24px rgba(140,122,230,0.18)',
								}}
							>
								<div
									style={{
										color: '#F4F4F8',
										fontSize: 66,
										lineHeight: 1,
										fontStyle: 'italic',
										fontWeight: 800,
										letterSpacing: 4,
										textTransform: 'uppercase',
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									{metricLabel}
								</div>
							</div>

							{/* Accent line, safely separated from text */}
							<div
								style={{
									width: 220,
									height: 4,
									borderRadius: 999,
									backgroundColor: '#3FD2C7',
									opacity: 0.9,
								}}
							/>

							{/* Bottom in-card accent */}
							<div
								style={{
									backgroundColor: '#3FD2C7',
									color: '#101018',
									borderRadius: 16,
									padding: '10px 24px',
									fontSize: 22,
									fontStyle: 'italic',
									fontWeight: 800,
									letterSpacing: 4,
									textTransform: 'uppercase',
									whiteSpace: 'nowrap',
								}}
							>
								サイバー・REVENUE
							</div>
						</div>
					</div>

					{/* Tier 3 */}
					<div
						style={{
							transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
							backgroundColor: '#8C7AE6',
							border: '3px solid #101018',
							borderRadius: 22,
							padding: '16px 34px',
							boxShadow: '0 10px 26px rgba(16,16,24,0.28)',
							textAlign: 'center',
						}}
					>
						<div
							style={{
								color: '#F4F4F8',
								fontSize: 24,
								lineHeight: 1.1,
								fontStyle: 'italic',
								fontWeight: 800,
								letterSpacing: 4,
								textTransform: 'uppercase',
								whiteSpace: 'nowrap',
							}}
						>
							PURE SOFTWARE LEVERAGE
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}