import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_80() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const cardIn = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});

	const takeawayIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.65},
	});

	// Beat 2: theorem wall build
	const step1 = interpolate(frame, [8, 16], [0, 1], clamp);
	const step2 = interpolate(frame, [20, 30], [0, 1], clamp);
	const step3 = interpolate(frame, [34, 44], [0, 1], clamp);
	const braceDraw = interpolate(frame, [46, 62], [0, 1], clamp);
	const metricBoxIn = interpolate(frame, [54, 66], [0, 1], clamp);

	const commissionValue = Math.round(
		interpolate(frame, [56, 86], [12, 50], clamp)
	);
	const commissionText = `${commissionValue}%`;

	const substitutionGlow = interpolate(frame, [34, 44, 52], [0, 1, 0.45], clamp);
	const metricPop = spring({
		frame: frame - 58,
		fps,
		config: {damping: 10, stiffness: 240, mass: 0.55},
	});

	// Beat 3: living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 1.8;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const footerFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shineOffset = interpolate((frame + 18) % 70, [0, 70], [-260, 980], clamp);

	// QED stamp
	const qedIn = spring({
		frame: frame - 92,
		fps,
		config: {damping: 9, stiffness: 260, mass: 0.5},
	});
	const qedRotate = interpolate(frame, [92, 102], [-8, -2], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -40],
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
				backgroundColor: '#FDFDFB',
				opacity,
				fontFamily:
					'"Times New Roman", "Georgia", "Iowan Old Style", serif',
				color: '#111111',
				justifyContent: 'center',
				alignItems: 'center',
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
					padding: '44px 16px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FDFDFB',
						border: '2px solid #2E5090',
						borderRadius: 999,
						padding: '10px 26px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 20px rgba(17,17,17,0.08)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#A4243B',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							fontSize: 20,
							fontWeight: 700,
							letterSpacing: 3,
							fontVariant: 'small-caps',
							color: '#2E5090',
							whiteSpace: 'nowrap',
						}}
					>
						THEOREM WALL
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
						margin: '22px 0 18px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#FDFDFB',
							border: '4px solid #C9A227',
							borderRadius: 34,
							boxShadow: '0 18px 40px rgba(17,17,17,0.12)',
							padding: '34px 40px 30px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: 'auto auto 1fr auto',
							rowGap: 18,
						}}
					>
						{/* shine */}
						<div
							style={{
								position: 'absolute',
								top: -30,
								bottom: -30,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(253,253,251,0) 0%, rgba(201,162,39,0.13) 50%, rgba(253,253,251,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-18deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* theorem label */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 20,
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									fontSize: 22,
									letterSpacing: 3,
									fontVariant: 'small-caps',
									fontWeight: 700,
									color: '#2E5090',
									whiteSpace: 'nowrap',
								}}
							>
								THEOREM 80
							</div>
							<div
								style={{
									flex: 1,
									height: 2,
									backgroundColor: 'rgba(46,80,144,0.22)',
								}}
							/>
						</div>

						{/* hero headline */}
						<div
							style={{
								textAlign: 'center',
								fontSize: 74,
								lineHeight: 1.02,
								fontWeight: 700,
								letterSpacing: -1.8,
								color: '#111111',
								textTransform: 'uppercase',
								position: 'relative',
								zIndex: 2,
							}}
						>
							AUTOMATED MARGINS
						</div>

						{/* equation wall */}
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '1fr',
								gridTemplateRows: 'repeat(4, auto)',
								rowGap: 18,
								alignContent: 'center',
								padding: '8px 8px 0',
								position: 'relative',
								zIndex: 2,
							}}
						>
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '88px 1fr',
									alignItems: 'center',
									columnGap: 20,
									opacity: step1,
									transform: `translateY(${(1 - step1) * 16}px)`,
								}}
							>
								<div
									style={{
										fontSize: 28,
										color: '#A4243B',
										fontWeight: 700,
										textAlign: 'right',
										whiteSpace: 'nowrap',
									}}
								>
									[1]
								</div>
								<div
									style={{
										fontSize: 40,
										lineHeight: 1.1,
										fontStyle: 'italic',
										color: '#111111',
										whiteSpace: 'nowrap',
									}}
								>
									margin = sale − labor
								</div>
							</div>

							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '88px 1fr',
									alignItems: 'center',
									columnGap: 20,
									opacity: step2,
									transform: `translateY(${(1 - step2) * 16}px)`,
								}}
							>
								<div
									style={{
										fontSize: 28,
										color: '#A4243B',
										fontWeight: 700,
										textAlign: 'right',
										whiteSpace: 'nowrap',
									}}
								>
									[2]
								</div>
								<div
									style={{
										fontSize: 40,
										lineHeight: 1.1,
										fontStyle: 'italic',
										color: '#111111',
										whiteSpace: 'nowrap',
									}}
								>
									labor → software
								</div>
							</div>

							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '88px 1fr',
									alignItems: 'center',
									columnGap: 20,
									opacity: step3,
									transform: `translateY(${(1 - step3) * 16}px)`,
								}}
							>
								<div
									style={{
										fontSize: 28,
										color: '#A4243B',
										fontWeight: 700,
										textAlign: 'right',
										whiteSpace: 'nowrap',
									}}
								>
									[3]
								</div>
								<div
									style={{
										position: 'relative',
										display: 'inline-flex',
										alignItems: 'center',
										width: 'fit-content',
										maxWidth: '100%',
										padding: '4px 12px',
										borderRadius: 14,
										backgroundColor: `rgba(164,36,59,${0.06 + substitutionGlow * 0.12})`,
										boxShadow: `0 0 ${12 * substitutionGlow}px rgba(164,36,59,0.18)`,
									}}
								>
									<div
										style={{
											fontSize: 42,
											lineHeight: 1.1,
											fontStyle: 'italic',
											color: '#111111',
											whiteSpace: 'nowrap',
										}}
									>
										margin → software commission
									</div>
								</div>
							</div>

							{/* underbrace + metric */}
							<div
								style={{
									display: 'grid',
									gridTemplateColumns: '88px 1fr',
									columnGap: 20,
									alignItems: 'start',
									opacity: Math.max(braceDraw, metricBoxIn),
								}}
							>
								<div />
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
										gap: 14,
										width: '100%',
									}}
								>
									<svg
										width="760"
										height="58"
										viewBox="0 0 760 58"
										style={{
											display: 'block',
											overflow: 'visible',
											maxWidth: '100%',
										}}
									>
										<path
											d="M12 16
                       C 70 16, 70 42, 128 42
                       L 632 42
                       C 690 42, 690 16, 748 16"
											fill="none"
											stroke="#2E5090"
											strokeWidth="3.5"
											strokeLinecap="round"
											strokeDasharray="900"
											strokeDashoffset={900 - 900 * braceDraw}
										/>
										<path
											d="M380 42 L380 56"
											fill="none"
											stroke="#2E5090"
											strokeWidth="3.5"
											strokeLinecap="round"
											strokeDasharray="20"
											strokeDashoffset={20 - 20 * braceDraw}
										/>
									</svg>

									<div
										style={{
											transform: `scale(${0.8 + metricPop * 0.2})`,
											backgroundColor: '#111111',
											border: '3px solid #A4243B',
											borderRadius: 24,
											padding: '18px 34px 16px',
											display: 'flex',
											alignItems: 'baseline',
											justifyContent: 'center',
											gap: 16,
											boxShadow: '0 10px 28px rgba(164,36,59,0.18)',
										}}
									>
										<div
											style={{
												fontSize: 82,
												lineHeight: 1,
												fontWeight: 700,
												color: '#FDFDFB',
												letterSpacing: -1.5,
												whiteSpace: 'nowrap',
											}}
										>
											{commissionText}
										</div>
										<div
											style={{
												fontSize: 28,
												lineHeight: 1,
												fontWeight: 700,
												letterSpacing: 2,
												color: '#C9A227',
												textTransform: 'uppercase',
												whiteSpace: 'nowrap',
											}}
										>
											Commission
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* QED stamp */}
						<div
							style={{
								position: 'absolute',
								right: 30,
								bottom: 26,
								transform: `scale(${qedIn}) rotate(${qedRotate}deg)`,
								opacity: qedIn,
								border: '3px solid #A4243B',
								color: '#A4243B',
								borderRadius: 12,
								padding: '8px 14px',
								fontSize: 26,
								fontWeight: 700,
								letterSpacing: 3,
								fontVariant: 'small-caps',
								backgroundColor: 'rgba(253,253,251,0.92)',
								boxShadow: '0 8px 18px rgba(164,36,59,0.12)',
								zIndex: 3,
								whiteSpace: 'nowrap',
							}}
						>
							QED
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${footerFloat}px)`,
						backgroundColor: '#A4243B',
						border: '2px solid #111111',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(17,17,17,0.12)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							fontSize: 24,
							fontWeight: 700,
							letterSpacing: 2.4,
							textTransform: 'uppercase',
							color: '#FDFDFB',
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