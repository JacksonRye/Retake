import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_36() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const entrance = spring({
		frame,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});
	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {damping: 11, stiffness: 240, mass: 0.5},
	});
	const graphEntrance = spring({
		frame: frame - 8,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	// Beat 2: Active metric transformation
	const percentValue = Math.round(interpolate(frame, [16, 62], [12, 50], clamp));
	const metricText = `${percentValue}%`;

	const clusterShift = interpolate(frame, [34, 72], [0, 1], clamp);
	const pulseA = 1 + Math.sin(frame * 0.18) * 0.08;
	const pulseB = 1 + Math.sin(frame * 0.18 + 1.4) * 0.08;
	const pulseC = 1 + Math.sin(frame * 0.18 + 2.2) * 0.08;
	const pulseD = 1 + Math.sin(frame * 0.18 + 3.1) * 0.08;

	// Beat 3: Continuous living loop
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const shineOffset = interpolate((frame + 20) % 65, [0, 65], [-420, 920], clamp);
	const lightningDraw = interpolate(frame, [22, 58], [0.15, 1], clamp);

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

	// Safe node positions inside the graph panel
	const n1 = {
		x: 130 + clusterShift * 18,
		y: 130 - clusterShift * 12,
		r: 15 * pulseA,
	};
	const n2 = {
		x: 290 + clusterShift * 10,
		y: 95 + clusterShift * 16,
		r: 12 * pulseB,
	};
	const n3 = {
		x: 480 - clusterShift * 14,
		y: 145 - clusterShift * 8,
		r: 16 * pulseC,
	};
	const n4 = {
		x: 210 - clusterShift * 12,
		y: 255 + clusterShift * 6,
		r: 13 * pulseD,
	};
	const n5 = {
		x: 410 + clusterShift * 16,
		y: 275 - clusterShift * 10,
		r: 14 * pulseA,
	};

	const edgeStyle = {
		fill: 'none',
		stroke: '#8B5CF6',
		strokeWidth: 4,
		strokeLinecap: 'round' as const,
		strokeDasharray: 720,
		strokeDashoffset: 720 - 720 * lightningDraw,
		filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.7))',
	};

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#08090D',
				opacity,
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
					padding: '56px 18px 40px 18px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${Math.sin(frame * 0.1) * 3}px)`,
						backgroundColor: 'rgba(226,232,240,0.06)',
						border: '2px solid #22D3EE',
						boxShadow: '0 10px 26px rgba(0,0,0,0.42)',
						borderRadius: 16,
						padding: '10px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#22D3EE',
							boxShadow: '0 0 12px rgba(34,211,238,0.9)',
						}}
					/>
					<div
						style={{
							color: '#E2E8F0',
							fontSize: 18,
							fontWeight: 800,
							letterSpacing: 3,
							textTransform: 'uppercase',
							fontFamily:
								'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
						}}
					>
						Backend View
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
						margin: '22px 0',
						position: 'relative',
						transform: `scale(${entrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '100%',
							minHeight: 540,
							backgroundColor: 'rgba(226,232,240,0.08)',
							border: '3px solid #E2E8F0',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 34px rgba(0,0,0,0.62)`,
							padding: '34px 34px 30px 34px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 150,
								background:
									'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0))',
								transform: `translateX(${shineOffset}px) skewX(-24deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* top labels */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 12,
								gap: 20,
							}}
						>
							<div
								style={{
									color: '#22D3EE',
									fontSize: 17,
									fontWeight: 800,
									letterSpacing: 2.4,
									textTransform: 'uppercase',
									fontFamily:
										'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								}}
							>
								Activation Code
							</div>
							<div
								style={{
									color: '#FBBF24',
									fontSize: 16,
									fontWeight: 800,
									letterSpacing: 2.2,
									textTransform: 'uppercase',
									fontFamily:
										'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								}}
							>
								Node Network Live
							</div>
						</div>

						{/* headline */}
						<div
							style={{
								color: '#E2E8F0',
								fontSize: 68,
								fontWeight: 1000,
								lineHeight: 1.02,
								letterSpacing: -1.8,
								textTransform: 'uppercase',
								textAlign: 'center',
								marginTop: 8,
								marginBottom: 18,
							}}
						>
							AUTOMATED MARGINS
						</div>

						{/* center area: graph + metric, collision-free side-by-side */}
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 28,
								flex: 1,
							}}
						>
							{/* graph panel */}
							<div
								style={{
									flex: 1.15,
									height: 300,
									backgroundColor: 'rgba(8,9,13,0.84)',
									border: '2px solid rgba(34,211,238,0.45)',
									borderRadius: 24,
									position: 'relative',
									overflow: 'hidden',
									transform: `scale(${graphEntrance})`,
								}}
							>
								<div
									style={{
										position: 'absolute',
										inset: 0,
										backgroundImage:
											'linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)',
										backgroundSize: '36px 36px',
										opacity: 0.55,
									}}
								/>
								<svg
									width="100%"
									height="100%"
									viewBox="0 0 560 300"
									style={{position: 'absolute', inset: 0}}
								>
									<path d={`M${n1.x} ${n1.y} L${n2.x} ${n2.y}`} style={edgeStyle} />
									<path d={`M${n2.x} ${n2.y} L${n3.x} ${n3.y}`} style={edgeStyle} />
									<path d={`M${n1.x} ${n1.y} L${n4.x} ${n4.y}`} style={edgeStyle} />
									<path d={`M${n4.x} ${n4.y} L${n5.x} ${n5.y}`} style={edgeStyle} />
									<path d={`M${n5.x} ${n5.y} L${n3.x} ${n3.y}`} style={edgeStyle} />
									<path d={`M${n2.x} ${n2.y} L${n5.x} ${n5.y}`} style={edgeStyle} />

									{[
										{...n1, color: '#22D3EE'},
										{...n2, color: '#FBBF24'},
										{...n3, color: '#22D3EE'},
										{...n4, color: '#8B5CF6'},
										{...n5, color: '#FBBF24'},
									].map((node, i) => (
										<g key={i}>
											<circle
												cx={node.x}
												cy={node.y}
												r={node.r + 10}
												fill={node.color}
												opacity={0.12}
											/>
											<circle
												cx={node.x}
												cy={node.y}
												r={node.r}
												fill={node.color}
												stroke="#E2E8F0"
												strokeWidth={2.5}
											/>
										</g>
									))}
								</svg>

								<div
									style={{
										position: 'absolute',
										left: 18,
										top: 14,
										color: '#E2E8F0',
										fontSize: 13,
										fontWeight: 800,
										letterSpacing: 1.6,
										fontFamily:
											'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
										textTransform: 'uppercase',
									}}
								>
									Cluster Re-Org
								</div>
								<div
									style={{
										position: 'absolute',
										right: 18,
										bottom: 14,
										color: '#22D3EE',
										fontSize: 13,
										fontWeight: 800,
										letterSpacing: 1.6,
										fontFamily:
											'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
										textTransform: 'uppercase',
									}}
								>
									Edge Lightning
								</div>
							</div>

							{/* metric block */}
							<div
								style={{
									width: 270,
									height: 300,
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									backgroundColor: '#08090D',
									border: '3px solid #8B5CF6',
									borderRadius: 26,
									boxShadow: '0 8px 26px rgba(139,92,246,0.24)',
									padding: '24px 18px',
									boxSizing: 'border-box',
									flexShrink: 0,
									textAlign: 'center',
								}}
							>
								<div
									style={{
										color: '#E2E8F0',
										fontSize: 15,
										fontWeight: 800,
										letterSpacing: 2.2,
										textTransform: 'uppercase',
										marginBottom: 16,
										fontFamily:
											'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
									}}
								>
									Weight Counter
								</div>

								<div
									style={{
										color: '#22D3EE',
										fontSize: 82,
										fontWeight: 1000,
										lineHeight: 0.95,
										letterSpacing: -2,
										fontVariantNumeric: 'tabular-nums',
									}}
								>
									{metricText}
								</div>

								<div
									style={{
										color: '#FBBF24',
										fontSize: 28,
										fontWeight: 900,
										lineHeight: 1.05,
										letterSpacing: 1.2,
										textTransform: 'uppercase',
										marginTop: 16,
									}}
								>
									COMMISSION
								</div>

								<div
									style={{
										marginTop: 20,
										padding: '10px 16px',
										borderRadius: 14,
										backgroundColor: 'rgba(34,211,238,0.12)',
										border: '1.5px solid rgba(34,211,238,0.35)',
										color: '#E2E8F0',
										fontSize: 13,
										fontWeight: 800,
										letterSpacing: 1.8,
										textTransform: 'uppercase',
										fontFamily:
											'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
									}}
								>
									algorithm routed
								</div>
							</div>
						</div>

						{/* bottom strip inside card */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								gap: 18,
								marginTop: 20,
							}}
						>
							<div
								style={{
									flex: 1,
									backgroundColor: 'rgba(34,211,238,0.12)',
									border: '1.5px solid rgba(34,211,238,0.34)',
									borderRadius: 16,
									padding: '12px 16px',
									color: '#E2E8F0',
									fontSize: 14,
									fontWeight: 800,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									textAlign: 'center',
									fontFamily:
										'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								}}
							>
								Node Pulses
							</div>
							<div
								style={{
									flex: 1,
									backgroundColor: 'rgba(251,191,36,0.12)',
									border: '1.5px solid rgba(251,191,36,0.34)',
									borderRadius: 16,
									padding: '12px 16px',
									color: '#E2E8F0',
									fontSize: 14,
									fontWeight: 800,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									textAlign: 'center',
									fontFamily:
										'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								}}
							>
								Live Routing
							</div>
							<div
								style={{
									flex: 1,
									backgroundColor: 'rgba(139,92,246,0.12)',
									border: '1.5px solid rgba(139,92,246,0.34)',
									borderRadius: 16,
									padding: '12px 16px',
									color: '#E2E8F0',
									fontSize: 14,
									fontWeight: 800,
									letterSpacing: 1.8,
									textTransform: 'uppercase',
									textAlign: 'center',
									fontFamily:
										'"SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
								}}
							>
								Margin Logic
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${entrance}) translateY(${Math.sin(frame * 0.12 + 1) * 3}px)`,
						backgroundColor: '#FBBF24',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 8px 24px rgba(0,0,0,0.42)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#08090D',
							fontSize: 22,
							fontWeight: 1000,
							letterSpacing: 2,
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