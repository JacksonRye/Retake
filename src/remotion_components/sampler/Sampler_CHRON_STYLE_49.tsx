import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_49() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: entrance
	const badgeEntrance = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.55},
	});

	const heroEntrance = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});

	const bottomEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.65},
	});

	// Beat 2: metric reveal / stitched fill
	const metricReveal = interpolate(frame, [18, 62], [0, 1], clamp);
	const metricTextOpacity = interpolate(frame, [26, 40], [0, 1], clamp);
	const metricScale = interpolate(frame, [28, 40], [0.94, 1], clamp);

	// Needle / thread action
	const needleVisible = frame >= 16 && frame <= 74;
	const needleX = interpolate(frame, [16, 74], [130, 760], clamp);
	const needleYBase = 262;
	const needleY = needleYBase + Math.sin(frame * 0.65) * 10;
	const needlePoke = frame >= 28 && frame <= 58 ? Math.sin((frame - 28) * 0.9) * 8 : 0;
	const threadPull = interpolate(frame, [22, 60], [0, 1], clamp);

	// Beat 3: living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const bottomFloat = Math.sin(frame * 0.12 + 1) * 3;
	const hoopRotate = Math.sin(frame * 0.09) * 1.8;
	const shineOffset = interpolate((frame + 10) % 65, [0, 65], [-320, 900], clamp);

	// Exit
	const exitSlide = interpolate(
		frame,
		[durationInFrames - 10, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 8, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const stitchedFillWidth = `${metricReveal * 100}%`;

	const PixelText = ({
		children,
		size,
		color,
		letterSpacing = 2,
		lineHeight = 1,
		align = 'center',
		textTransform = 'uppercase' as const,
	}: {
		children: React.ReactNode;
		size: number;
		color: string;
		letterSpacing?: number;
		lineHeight?: number;
		align?: 'left' | 'center' | 'right';
		textTransform?: 'uppercase' | 'none';
	}) => {
		return (
			<div
				style={{
					fontFamily: '"Courier New", "Lucida Console", monospace',
					fontWeight: 900,
					fontSize: size,
					color,
					letterSpacing,
					lineHeight,
					textAlign: align,
					textTransform,
					textShadow: `2px 0 0 ${color}, -2px 0 0 ${color}, 0 2px 0 ${color}, 0 -2px 0 ${color}`,
					WebkitTextStroke: `1px ${color}`,
				}}
			>
				{children}
			</div>
		);
	};

	const StitchDots = ({color}: {color: string}) => {
		return (
			<div
				style={{
					position: 'absolute',
					inset: 14,
					borderRadius: 24,
					pointerEvents: 'none',
					overflow: 'hidden',
				}}
			>
				{[
					{top: 0, left: 24, right: 24, height: 10},
					{bottom: 0, left: 24, right: 24, height: 10},
					{left: 0, top: 24, bottom: 24, width: 10},
					{right: 0, top: 24, bottom: 24, width: 10},
				].map((s, i) => (
					<div
						// eslint-disable-next-line react/no-array-index-key
						key={i}
						style={{
							position: 'absolute',
							...s,
							backgroundImage:
								s.height !== undefined
									? `repeating-linear-gradient(90deg, ${color} 0 10px, transparent 10px 22px)`
									: `repeating-linear-gradient(180deg, ${color} 0 10px, transparent 10px 22px)`,
							opacity: 0.95,
						}}
					/>
				))}
			</div>
		);
	};

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#EFE6D5',
				opacity,
				fontFamily: '"Courier New", "Lucida Console", monospace',
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
					padding: '54px 16px 36px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1: Badge */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: '#EFE6D5',
						border: '4px solid #B23A48',
						borderRadius: 18,
						padding: '12px 28px',
						boxShadow: '0 8px 0 rgba(52,73,94,0.18)',
						position: 'relative',
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
								width: 14,
								height: 14,
								backgroundColor: '#7B9E6B',
								border: '3px solid #34495E',
								boxSizing: 'border-box',
							}}
						/>
						<PixelText size={20} color="#B23A48" letterSpacing={3}>
							SAMPLER STITCH
						</PixelText>
					</div>

					<div
						style={{
							position: 'absolute',
							inset: 6,
							border: '2px dashed #C9A227',
							borderRadius: 12,
							pointerEvents: 'none',
						}}
					/>
				</div>

				{/* Tier 2: Massive Hero Card */}
				<div
					style={{
						width: '100%',
						flex: 1,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						margin: '22px 0',
						position: 'relative',
						transform: `scale(${heroEntrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 548,
							backgroundColor: '#C9A227',
							border: '5px solid #34495E',
							borderRadius: 34,
							boxShadow: '0 18px 0 rgba(52,73,94,0.20)',
							padding: '28px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							transform: `rotate(${hoopRotate}deg)`,
						}}
					>
						{/* hoop rim */}
						<div
							style={{
								position: 'absolute',
								inset: 10,
								borderRadius: 28,
								border: '6px solid rgba(239,230,213,0.85)',
								boxShadow: 'inset 0 0 0 3px #B23A48',
								pointerEvents: 'none',
							}}
						/>
						<StitchDots color="#34495E" />

						{/* moving fabric shine */}
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.22), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						<div
							style={{
								position: 'relative',
								zIndex: 2,
								width: '100%',
								height: '100%',
								minHeight: 486,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 22,
								padding: '34px 26px 26px',
								boxSizing: 'border-box',
							}}
						>
							{/* Headline */}
							<div
								style={{
									width: '100%',
									maxWidth: 760,
									backgroundColor: 'rgba(239,230,213,0.75)',
									border: '4px solid #B23A48',
									borderRadius: 22,
									padding: '22px 24px',
									boxSizing: 'border-box',
								}}
							>
								<PixelText
									size={66}
									color="#B23A48"
									letterSpacing={2}
									lineHeight={1.02}
								>
									AUTOMATED
									<br />
									MARGINS
								</PixelText>
							</div>

							{/* Metric area */}
							<div
								style={{
									width: '100%',
									maxWidth: 760,
									height: 164,
									backgroundColor: '#EFE6D5',
									border: '5px solid #34495E',
									borderRadius: 26,
									position: 'relative',
									overflow: 'hidden',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: 'inset 0 0 0 4px #C9A227',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: 0,
										top: 0,
										bottom: 0,
										width: stitchedFillWidth,
										background:
											'repeating-linear-gradient(45deg, rgba(123,158,107,0.30) 0 14px, rgba(123,158,107,0.18) 14px 28px)',
										borderRight:
											metricReveal < 1 ? '4px dashed #7B9E6B' : 'none',
										transition: 'none',
									}}
								/>

								<div
									style={{
										position: 'absolute',
										inset: 12,
										borderRadius: 16,
										backgroundImage:
											'repeating-linear-gradient(90deg, transparent 0 16px, rgba(52,73,94,0.08) 16px 18px)',
										opacity: 0.4,
										pointerEvents: 'none',
									}}
								/>

								<div
									style={{
										transform: `scale(${metricScale})`,
										opacity: metricTextOpacity,
										textAlign: 'center',
										padding: '0 20px',
									}}
								>
									<PixelText
										size={60}
										color="#34495E"
										letterSpacing={1}
										lineHeight={1.0}
									>
										50% COMMISSION
									</PixelText>
								</div>
							</div>

							{/* Takeaway ribbon inside card */}
							<div
								style={{
									backgroundColor: '#7B9E6B',
									border: '4px solid #34495E',
									borderRadius: 18,
									padding: '14px 24px',
									maxWidth: 760,
									width: 'fit-content',
								}}
							>
								<PixelText size={24} color="#EFE6D5" letterSpacing={2}>
									STITCHED FOR SCALE
								</PixelText>
							</div>
						</div>

						{/* Needle + thread kept away from text collision zones */}
						{needleVisible && (
							<>
								<svg
									width="760"
									height="140"
									viewBox="0 0 760 140"
									style={{
										position: 'absolute',
										left: 102,
										top: 300,
										overflow: 'visible',
										pointerEvents: 'none',
										zIndex: 1,
										opacity: 0.9,
									}}
								>
									<path
										d={`M 10 88 C 110 ${88 - 18 * threadPull}, 210 ${104 -
											16 * threadPull}, 310 88 C 410 ${72 -
											20 * threadPull}, 540 ${100 - 12 * threadPull}, 730 84`}
										fill="none"
										stroke="#B23A48"
										strokeWidth="5"
										strokeDasharray="10 12"
										strokeLinecap="round"
									/>
								</svg>

								<div
									style={{
										position: 'absolute',
										left: needleX,
										top: needleY + needlePoke,
										width: 92,
										height: 18,
										transform: 'rotate(18deg)',
										zIndex: 3,
										pointerEvents: 'none',
									}}
								>
									<div
										style={{
											position: 'absolute',
											left: 0,
											top: 7,
											width: 78,
											height: 4,
											backgroundColor: '#34495E',
											borderRadius: 999,
										}}
									/>
									<div
										style={{
											position: 'absolute',
											right: 4,
											top: 2,
											width: 0,
											height: 0,
											borderTop: '7px solid transparent',
											borderBottom: '7px solid transparent',
											borderLeft: '14px solid #34495E',
										}}
									/>
									<div
										style={{
											position: 'absolute',
											left: 8,
											top: 3,
											width: 12,
											height: 12,
											border: '3px solid #EFE6D5',
											borderRadius: '50%',
											boxSizing: 'border-box',
										}}
									/>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Tier 3: Bottom takeaway */}
				<div
					style={{
						transform: `scale(${bottomEntrance}) translateY(${bottomFloat}px)`,
						backgroundColor: '#B23A48',
						border: '4px solid #34495E',
						borderRadius: 22,
						padding: '16px 28px',
						boxShadow: '0 8px 0 rgba(52,73,94,0.18)',
						textAlign: 'center',
						maxWidth: 900,
					}}
				>
					<PixelText size={24} color="#EFE6D5" letterSpacing={2}>
						PURE SOFTWARE LEVERAGE
					</PixelText>
				</div>
			</div>
		</AbsoluteFill>
	);
}