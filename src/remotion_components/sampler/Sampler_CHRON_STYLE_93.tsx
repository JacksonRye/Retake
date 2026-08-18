import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_93() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Snappy entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 11, stiffness: 250, mass: 0.55},
	});

	const cardIn = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.65},
	});

	const plateIn = spring({
		frame: frame - 5,
		fps,
		config: {damping: 10, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Active state / course progression
	const courseIndex = Math.floor(interpolate(frame, [18, 78], [1, 4.999], clamp));
	const commissionReveal = interpolate(frame, [24, 58], [0, 1], clamp);
	const metricScale = interpolate(frame, [30, 40, 52], [0.92, 1.05, 1], clamp);

	// Beat 3: Continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.11) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 0.8) * 3;
	const plateSpin = interpolate(frame, [0, durationInFrames], [-2, 2], clamp) + Math.sin(frame * 0.06) * 1.2;
	const shineOffset = interpolate((frame + 12) % 70, [0, 70], [-240, 980], clamp);

	// Leader-line draws
	const line1Progress = interpolate(frame, [34, 48], [0, 1], clamp);
	const line2Progress = interpolate(frame, [42, 56], [0, 1], clamp);
	const line3Progress = interpolate(frame, [50, 64], [0, 1], clamp);

	// Steam
	const steam1 = Math.sin(frame * 0.08) * 8;
	const steam2 = Math.sin(frame * 0.09 + 1.4) * 7;
	const steam3 = Math.sin(frame * 0.07 + 2.2) * 9;

	// Exit
	const exitY = interpolate(frame, [durationInFrames - 10, durationInFrames - 1], [0, -50], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const visibleCommissionChars = Math.floor(commissionReveal * '50% COMMISSION'.length);
	const metricText = '50% COMMISSION'.slice(0, visibleCommissionChars);

	const courseActive = (n: number) => n <= courseIndex;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#F8F5EF',
				opacity,
				fontFamily:
					'"Baskerville", "Iowan Old Style", "Palatino Linotype", "Times New Roman", serif',
				color: '#2A2722',
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
					padding: '52px 16px 34px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#F8F5EF',
						border: '2px solid #647D58',
						borderRadius: 999,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 14,
						boxShadow: '0 8px 20px rgba(42,39,34,0.08)',
					}}
				>
					<div
						style={{
							color: '#647D58',
							fontSize: 20,
							fontStyle: 'italic',
							fontWeight: 700,
							letterSpacing: 1.5,
							textTransform: 'uppercase',
						}}
					>
						Tasting Menu
					</div>
					<div
						style={{
							width: 1,
							height: 20,
							backgroundColor: '#D6C18A',
						}}
					/>
					<div
						style={{
							color: '#7C2E41',
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 2,
						}}
					>
						XCIII
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
						position: 'relative',
						margin: '20px 0 18px',
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#D6C18A',
							border: '3px solid #2A2722',
							borderRadius: 34,
							boxShadow: '0 18px 36px rgba(42,39,34,0.14)',
							padding: '36px 34px 28px',
							boxSizing: 'border-box',
							display: 'grid',
							gridTemplateColumns: '1.06fr 0.94fr',
							columnGap: 26,
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						{/* Shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(248,245,239,0.22) 50%, rgba(255,255,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* LEFT COLUMN */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'space-between',
								zIndex: 2,
							}}
						>
							<div>
								<div
									style={{
										color: '#7C2E41',
										fontSize: 18,
										letterSpacing: 3,
										textTransform: 'uppercase',
										fontWeight: 700,
										marginBottom: 14,
									}}
								>
									Course III
								</div>

								<div
									style={{
										color: '#2A2722',
										fontSize: 74,
										fontStyle: 'italic',
										fontWeight: 700,
										lineHeight: 0.95,
										letterSpacing: -1.6,
										maxWidth: 430,
									}}
								>
									AUTOMATED
									<br />
									MARGINS
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: 10,
									marginTop: 20,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										gap: 12,
									}}
								>
									<div
										style={{
											color: '#647D58',
											fontSize: 16,
											letterSpacing: 2.2,
											textTransform: 'uppercase',
											fontWeight: 700,
											minWidth: 118,
										}}
									>
										INGREDIENTS
									</div>
									<div
										style={{
											height: 1,
											flex: 1,
											backgroundColor: '#647D58',
											opacity: 0.7,
										}}
									/>
								</div>

								<div
									style={{
										display: 'flex',
										flexWrap: 'wrap',
										gap: 10,
										maxWidth: 430,
									}}
								>
									{['automation', 'repeatability', 'distribution'].map((item) => (
										<div
											key={item}
											style={{
												backgroundColor: '#F8F5EF',
												border: '1.5px solid #647D58',
												borderRadius: 999,
												padding: '8px 14px',
												color: '#2A2722',
												fontSize: 16,
												fontStyle: 'italic',
												fontWeight: 600,
												lineHeight: 1,
											}}
										>
											{item}
										</div>
									))}
								</div>
							</div>

							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 12,
									marginTop: 18,
								}}
							>
								{['I', 'II', 'III', 'IV'].map((c, i) => {
									const active = courseActive(i + 1);
									return (
										<div
											key={c}
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: 10,
											}}
										>
											<div
												style={{
													width: 44,
													height: 44,
													borderRadius: '50%',
													border: `2px solid ${active ? '#7C2E41' : '#2A2722'}`,
													backgroundColor: active ? '#7C2E41' : '#F8F5EF',
													color: active ? '#F8F5EF' : '#2A2722',
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													fontSize: 19,
													fontWeight: 800,
													fontStyle: 'italic',
													boxShadow: active
														? '0 6px 14px rgba(124,46,65,0.22)'
														: 'none',
												}}
											>
												{c}
											</div>
											{i < 3 ? (
												<div
													style={{
														width: 34,
														height: 2,
														backgroundColor: courseActive(i + 2)
															? '#7C2E41'
															: 'rgba(42,39,34,0.25)',
													}}
												/>
											) : null}
										</div>
									);
								})}
							</div>
						</div>

						{/* RIGHT COLUMN */}
						<div
							style={{
								position: 'relative',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								zIndex: 2,
							}}
						>
							<div
								style={{
									position: 'relative',
									width: '100%',
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								{/* Steam - top safe zone */}
								<div
									style={{
										position: 'absolute',
										top: 4,
										left: '50%',
										transform: 'translateX(-50%)',
										width: 180,
										height: 88,
										pointerEvents: 'none',
									}}
								>
									<svg width="180" height="88" viewBox="0 0 180 88">
										<path
											d={`M52 78 C 42 ${58 + steam1}, 62 ${36 + steam1}, 50 14`}
											fill="none"
											stroke="#647D58"
											strokeOpacity="0.35"
											strokeWidth="3"
											strokeLinecap="round"
										/>
										<path
											d={`M88 84 C 78 ${60 + steam2}, 100 ${40 + steam2}, 88 10`}
											fill="none"
											stroke="#647D58"
											strokeOpacity="0.33"
											strokeWidth="3"
											strokeLinecap="round"
										/>
										<path
											d={`M126 80 C 114 ${58 + steam3}, 138 ${36 + steam3}, 124 16`}
											fill="none"
											stroke="#647D58"
											strokeOpacity="0.3"
											strokeWidth="3"
											strokeLinecap="round"
										/>
									</svg>
								</div>

								{/* Plate */}
								<div
									style={{
										position: 'absolute',
										top: 70,
										left: '50%',
										transform: `translateX(-50%) scale(${plateIn}) rotate(${plateSpin}deg)`,
										width: 320,
										height: 320,
										borderRadius: '50%',
										backgroundColor: '#F8F5EF',
										border: '3px solid #2A2722',
										boxShadow: '0 14px 28px rgba(42,39,34,0.12)',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<div
										style={{
											width: 250,
											height: 250,
											borderRadius: '50%',
											border: '2px solid rgba(42,39,34,0.14)',
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											position: 'relative',
										}}
									>
										<div
											style={{
												backgroundColor: '#2A2722',
												color: '#F8F5EF',
												borderRadius: 24,
												padding: '18px 24px',
												transform: `scale(${metricScale})`,
												boxShadow: '0 10px 24px rgba(42,39,34,0.22)',
												minWidth: 214,
												textAlign: 'center',
											}}
										>
											<div
												style={{
													fontSize: 20,
													fontStyle: 'italic',
													letterSpacing: 1,
													color: '#D6C18A',
													marginBottom: 8,
												}}
											>
												signature yield
											</div>
											<div
												style={{
													fontSize: 48,
													fontWeight: 900,
													letterSpacing: -0.6,
													lineHeight: 1,
													minHeight: 48,
													whiteSpace: 'nowrap',
												}}
											>
												{metricText}
											</div>
										</div>
									</div>
								</div>

								{/* Ingredient micro labels with safe leader lines */}
								<div
									style={{
										position: 'absolute',
										left: 8,
										top: 150,
										width: 120,
										textAlign: 'right',
									}}
								>
									<div
										style={{
											color: '#647D58',
											fontSize: 14,
											fontStyle: 'italic',
											fontWeight: 700,
											letterSpacing: 0.6,
											marginBottom: 6,
										}}
									>
										recurring logic
									</div>
									<svg width="120" height="20" viewBox="0 0 120 20">
										<line
											x1="0"
											y1="10"
											x2={line1Progress * 104}
											y2="10"
											stroke="#647D58"
											strokeWidth="2"
											strokeLinecap="round"
										/>
										<circle
											cx={Math.max(0, line1Progress * 104)}
											cy="10"
											r="3"
											fill="#647D58"
										/>
									</svg>
								</div>

								<div
									style={{
										position: 'absolute',
										right: 6,
										top: 130,
										width: 126,
										textAlign: 'left',
									}}
								>
									<div
										style={{
											color: '#7C2E41',
											fontSize: 14,
											fontStyle: 'italic',
											fontWeight: 700,
											letterSpacing: 0.6,
											marginBottom: 6,
										}}
									>
										distribution edge
									</div>
									<svg width="126" height="24" viewBox="0 0 126 24">
										<line
											x1="126"
											y1="12"
											x2={126 - line2Progress * 108}
											y2="12"
											stroke="#7C2E41"
											strokeWidth="2"
											strokeLinecap="round"
										/>
										<circle
											cx={126 - Math.max(0, line2Progress * 108)}
											cy="12"
											r="3"
											fill="#7C2E41"
										/>
									</svg>
								</div>

								<div
									style={{
										position: 'absolute',
										right: 20,
										bottom: 92,
										width: 124,
										textAlign: 'left',
									}}
								>
									<div
										style={{
											color: '#647D58',
											fontSize: 14,
											fontStyle: 'italic',
											fontWeight: 700,
											letterSpacing: 0.6,
											marginBottom: 6,
										}}
									>
										scalable service
									</div>
									<svg width="124" height="22" viewBox="0 0 124 22">
										<line
											x1="124"
											y1="11"
											x2={124 - line3Progress * 96}
											y2="11"
											stroke="#647D58"
											strokeWidth="2"
											strokeLinecap="round"
										/>
										<circle
											cx={124 - Math.max(0, line3Progress * 96)}
											cy="11"
											r="3"
											fill="#647D58"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${cardIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#2A2722',
						borderRadius: 18,
						padding: '16px 28px',
						boxShadow: '0 10px 24px rgba(42,39,34,0.14)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#F8F5EF',
							fontSize: 23,
							fontWeight: 900,
							letterSpacing: 1.8,
							textTransform: 'uppercase',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}