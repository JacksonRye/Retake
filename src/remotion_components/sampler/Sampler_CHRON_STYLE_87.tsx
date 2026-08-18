import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_87() {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Global timing
	const fadeIn = interpolate(frame, [0, 18], [0, 1], clamp);
	const fadeOut = interpolate(
		frame,
		[durationInFrames - 16, durationInFrames - 1],
		[1, 0],
		clamp
	);
	const sceneOpacity = fadeIn * fadeOut;

	// Tier entrances: pure, no bounce
	const badgeOpacity = interpolate(frame, [6, 24], [0, 1], clamp);
	const badgeY = interpolate(frame, [6, 24], [10, 0], clamp);

	const cardOpacity = interpolate(frame, [12, 34], [0, 1], clamp);
	const cardY = interpolate(frame, [12, 34], [26, 0], clamp);
	const cardScale = interpolate(frame, [12, 34], [0.985, 1], clamp);

	const takeawayOpacity = interpolate(frame, [34, 54], [0, 1], clamp);
	const takeawayY = interpolate(frame, [34, 54], [12, 0], clamp);

	// Beat 2: metric state reveal
	const metricOpacity = interpolate(frame, [38, 62], [0, 1], clamp);
	const metricLetterSpace = interpolate(frame, [38, 62], [18, 8], clamp);

	// Beat 3: continuous living motion, restrained
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.1;
	const badgeFloat = Math.sin(frame * 0.09) * 2.5;
	const takeawayFloat = Math.sin(frame * 0.1 + 0.8) * 2.5;

	// Hairline draws
	const topRuleScale = interpolate(frame, [18, 42], [0, 1], clamp);
	const bottomRuleScale = interpolate(frame, [24, 48], [0, 1], clamp);
	const sideRuleOpacity = interpolate(frame, [22, 40], [0, 0.85], clamp);

	// Embossed light pass / traveling shine
	const shineOffset = interpolate((frame + 12) % 95, [0, 95], [-260, 980], clamp);
	const metricShineOffset = interpolate((frame + 36) % 90, [0, 90], [-180, 520], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F6F1E7',
				opacity: sceneOpacity,
				fontFamily:
					'"Baskerville", "Times New Roman", "Georgia", serif',
				color: '#2E2B26',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '34px 32px 30px 32px',
					boxSizing: 'border-box',
				}}
			>
				<div
					style={{
						width: '95%',
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					{/* TIER 1 */}
					<div
						style={{
							opacity: badgeOpacity,
							transform: `translateY(${badgeY + badgeFloat}px)`,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 10,
							minHeight: 64,
							justifyContent: 'center',
						}}
					>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 16,
							}}
						>
							<div
								style={{
									width: 64,
									height: 1,
									backgroundColor: '#B49A5E',
									opacity: 0.9,
								}}
							/>
							<div
								style={{
									fontSize: 18,
									letterSpacing: 6,
									fontVariant: 'small-caps',
									textTransform: 'uppercase',
									color: '#1F3D2B',
									fontWeight: 600,
									whiteSpace: 'nowrap',
								}}
							>
								Quiet Luxury
							</div>
							<div
								style={{
									width: 64,
									height: 1,
									backgroundColor: '#B49A5E',
									opacity: 0.9,
								}}
							/>
						</div>
					</div>

					{/* TIER 2 */}
					<div
						style={{
							width: '100%',
							flex: 1,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							padding: '18px 0 18px 0',
							boxSizing: 'border-box',
						}}
					>
						<div
							style={{
								width: '94%',
								minHeight: 540,
								maxWidth: 1180,
								position: 'relative',
								border: '1.5px solid #B49A5E',
								backgroundColor: 'rgba(180,154,94,0.10)',
								boxSizing: 'border-box',
								borderRadius: 0,
								overflow: 'hidden',
								opacity: cardOpacity,
								transform: `translateY(${cardY + hoverY}px) scale(${cardScale}) rotate(${hoverTilt}deg)`,
								boxShadow:
									'0 18px 40px rgba(46,43,38,0.08), inset 0 1px 0 rgba(255,255,255,0.45)',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							{/* outer hairline frame */}
							<div
								style={{
									position: 'absolute',
									inset: 16,
									border: '1px solid rgba(180,154,94,0.65)',
									pointerEvents: 'none',
								}}
							/>

							{/* vertical inner rules */}
							<div
								style={{
									position: 'absolute',
									left: 36,
									top: 54,
									bottom: 54,
									width: 1,
									backgroundColor: '#B49A5E',
									opacity: sideRuleOpacity,
								}}
							/>
							<div
								style={{
									position: 'absolute',
									right: 36,
									top: 54,
									bottom: 54,
									width: 1,
									backgroundColor: '#B49A5E',
									opacity: sideRuleOpacity,
								}}
							/>

							{/* top rule */}
							<div
								style={{
									position: 'absolute',
									top: 54,
									left: '14%',
									right: '14%',
									height: 1,
									backgroundColor: '#B49A5E',
									transform: `scaleX(${topRuleScale})`,
									transformOrigin: 'center',
									opacity: 0.95,
								}}
							/>

							{/* bottom rule */}
							<div
								style={{
									position: 'absolute',
									bottom: 54,
									left: '14%',
									right: '14%',
									height: 1,
									backgroundColor: '#B49A5E',
									transform: `scaleX(${bottomRuleScale})`,
									transformOrigin: 'center',
									opacity: 0.95,
								}}
							/>

							{/* embossed light pass */}
							<div
								style={{
									position: 'absolute',
									top: -40,
									bottom: -40,
									width: 120,
									background:
										'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0) 100%)',
									transform: `translateX(${shineOffset}px) skewX(-20deg)`,
									pointerEvents: 'none',
									opacity: 0.7,
								}}
							/>

							<div
								style={{
									width: '100%',
									height: '100%',
									padding: '88px 92px',
									boxSizing: 'border-box',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'space-between',
									position: 'relative',
									gap: 32,
								}}
							>
								{/* headline */}
								<div
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										textAlign: 'center',
									}}
								>
									<div
										style={{
											maxWidth: 900,
											fontSize: 76,
											lineHeight: 1.04,
											letterSpacing: 5,
											fontWeight: 700,
											fontVariant: 'small-caps',
											textTransform: 'uppercase',
											color: '#2E2B26',
											textShadow: '0 1px 0 rgba(255,255,255,0.4)',
											whiteSpace: 'nowrap',
										}}
									>
										Automated Margins
									</div>
								</div>

								{/* metric block */}
								<div
									style={{
										position: 'relative',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										padding: '28px 42px',
										minWidth: 700,
										borderTop: '1px solid #B49A5E',
										borderBottom: '1px solid #B49A5E',
										opacity: metricOpacity,
										overflow: 'hidden',
									}}
								>
									<div
										style={{
											position: 'absolute',
											top: 0,
											bottom: 0,
											width: 92,
											background:
												'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.26) 50%, rgba(255,255,255,0) 100%)',
											transform: `translateX(${metricShineOffset}px) skewX(-18deg)`,
											pointerEvents: 'none',
											opacity: 0.8,
										}}
									/>
									<div
										style={{
											fontSize: 60,
											lineHeight: 1.05,
											letterSpacing: metricLetterSpace,
											fontWeight: 700,
											fontVariant: 'small-caps',
											textTransform: 'uppercase',
											color: '#5E2129',
											textAlign: 'center',
											whiteSpace: 'nowrap',
										}}
									>
										50% Commission
									</div>
								</div>

								{/* lower accent crest line */}
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 16,
									}}
								>
									<div
										style={{
											width: 220,
											height: 1,
											backgroundColor: '#1F3D2B',
											opacity: 0.85,
										}}
									/>
									<div
										style={{
											width: 10,
											height: 10,
											borderRadius: '50%',
											backgroundColor: '#1F3D2B',
											opacity: 0.9,
										}}
									/>
								</div>
							</div>
						</div>
					</div>

					{/* TIER 3 */}
					<div
						style={{
							opacity: takeawayOpacity,
							transform: `translateY(${takeawayY + takeawayFloat}px)`,
							minHeight: 78,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							paddingBottom: 6,
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								gap: 12,
							}}
						>
							<div
								style={{
									width: 180,
									height: 1,
									backgroundColor: '#B49A5E',
								}}
							/>
							<div
								style={{
									fontSize: 24,
									letterSpacing: 5,
									fontWeight: 700,
									fontVariant: 'small-caps',
									textTransform: 'uppercase',
									color: '#1F3D2B',
									textAlign: 'center',
									whiteSpace: 'nowrap',
								}}
							>
								Pure Software Leverage
							</div>
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}