import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_77() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// Beat 1: Entrance
	const badgeIn = spring({
		frame: frame - 2,
		fps,
		config: {damping: 12, stiffness: 220, mass: 0.6},
	});
	const cardIn = spring({
		frame: frame - 6,
		fps,
		config: {damping: 11, stiffness: 210, mass: 0.7},
	});
	const takeawayIn = spring({
		frame: frame - 10,
		fps,
		config: {damping: 12, stiffness: 200, mass: 0.7},
	});

	// Beat 2: Active figure / state
	const metricReveal = spring({
		frame: frame - 22,
		fps,
		config: {damping: 14, stiffness: 180, mass: 0.9},
	});

	const lineProgress = interpolate(frame, [18, 52], [0, 1], clamp);
	const errorBarProgress = interpolate(frame, [32, 58], [0, 1], clamp);
	const citationPop = spring({
		frame: frame - 48,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.55},
	});

	const countValue = Math.round(interpolate(frame, [22, 64], [8, 50], clamp));
	const metricText = `${countValue}% COMMISSION`;

	// Beat 3: Living hover + shine
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.0;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.1) * 3;
	const shineOffset = interpolate((frame + 12) % 72, [0, 72], [-260, 980], clamp);
	const findingSweep = interpolate(frame, [66, 98], [0, 1], clamp);

	// Exit
	const exitY = interpolate(
		frame,
		[durationInFrames - 12, durationInFrames - 1],
		[0, -50],
		clamp
	);
	const opacity = interpolate(
		frame,
		[0, 6, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	const chartLeft = 72;
	const chartTop = 92;
	const chartWidth = 740;
	const chartHeight = 188;
	const baseY = chartTop + chartHeight - 24;

	const p1 = {x: chartLeft + 40, y: baseY - 18};
	const p2 = {x: chartLeft + 218, y: baseY - 52};
	const p3 = {x: chartLeft + 420, y: baseY - 96};
	const p4 = {x: chartLeft + 620, y: baseY - 132};

	const drawPoint = (
		a: {x: number; y: number},
		b: {x: number; y: number},
		t: number
	) => ({
		x: a.x + (b.x - a.x) * t,
		y: a.y + (b.y - a.y) * t,
	});

	let current = p1;
	if (lineProgress <= 0.33) {
		current = drawPoint(p1, p2, lineProgress / 0.33);
	} else if (lineProgress <= 0.66) {
		current = drawPoint(p2, p3, (lineProgress - 0.33) / 0.33);
	} else {
		current = drawPoint(p3, p4, (lineProgress - 0.66) / 0.34);
	}

	const pathD = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y}`;
	const pathLength = 760;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#FCFBF8',
				opacity,
				fontFamily:
					'"Georgia", "Times New Roman", "Iowan Old Style", serif',
				color: '#1F2933',
			}}
		>
			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '42px 16px 36px',
					boxSizing: 'border-box',
					transform: `translateY(${exitY}px)`,
				}}
			>
				{/* Tier 1 */}
				<div
					style={{
						transform: `scale(${badgeIn}) translateY(${badgeFloat}px)`,
						backgroundColor: '#FCFBF8',
						border: '2px solid #1F2933',
						borderRadius: 999,
						padding: '10px 24px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 8px 20px rgba(31, 41, 51, 0.10)',
					}}
				>
					<div
						style={{
							width: 12,
							height: 12,
							borderRadius: '50%',
							backgroundColor: '#119DA4',
							border: '2px solid #1F2933',
							boxSizing: 'border-box',
						}}
					/>
					<div
						style={{
							fontSize: 18,
							fontWeight: 700,
							letterSpacing: 2.4,
							fontVariant: 'small-caps',
							textTransform: 'uppercase',
							color: '#1F2933',
						}}
					>
						peer review · lab report
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
						transform: `scale(${cardIn}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '96%',
							minHeight: 548,
							backgroundColor: '#119DA4',
							border: '4px solid #1F2933',
							borderRadius: 34,
							boxShadow: '0 18px 40px rgba(31, 41, 51, 0.16)',
							position: 'relative',
							overflow: 'hidden',
							padding: '34px 36px 32px',
							boxSizing: 'border-box',
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<div
							style={{
								position: 'absolute',
								top: 0,
								bottom: 0,
								width: 120,
								background:
									'linear-gradient(90deg, rgba(252,251,248,0) 0%, rgba(252,251,248,0.26) 50%, rgba(252,251,248,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-20deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* Header band */}
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
								marginBottom: 8,
							}}
						>
							<div
								style={{
									fontSize: 18,
									letterSpacing: 2.2,
									fontVariant: 'small-caps',
									textTransform: 'uppercase',
									fontWeight: 700,
									color: '#FCFBF8',
								}}
							>
								figure 03
							</div>
							<div
								style={{
									fontSize: 16,
									letterSpacing: 1.4,
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									color: '#EAF7F7',
								}}
							>
								p &lt; 0.01
							</div>
						</div>

						{/* Massive Headline */}
						<div
							style={{
								fontSize: 70,
								lineHeight: 1.02,
								fontWeight: 700,
								letterSpacing: -1.4,
								color: '#FCFBF8',
								textAlign: 'center',
								marginTop: 4,
								marginBottom: 6,
								padding: '0 24px',
							}}
						>
							AUTOMATED MARGINS
						</div>

						{/* Figure area */}
						<div
							style={{
								height: 226,
								backgroundColor: 'rgba(252,251,248,0.92)',
								border: '3px solid #1F2933',
								borderRadius: 26,
								position: 'relative',
								overflow: 'hidden',
								margin: '0 8px',
							}}
						>
							{/* Finding sweep highlight behind chart, not touching text */}
							<div
								style={{
									position: 'absolute',
									top: 18,
									left: interpolate(frame, [68, 98], [-220, 770], clamp),
									width: 220,
									height: 162,
									background:
										'linear-gradient(90deg, rgba(48,102,190,0) 0%, rgba(48,102,190,0.18) 50%, rgba(48,102,190,0) 100%)',
									transform: 'skewX(-18deg)',
									opacity: findingSweep,
									pointerEvents: 'none',
								}}
							/>

							<svg
								width="100%"
								height="100%"
								viewBox="0 0 820 226"
								style={{
									position: 'absolute',
									inset: 0,
								}}
							>
								{/* Axes */}
								<line
									x1="68"
									y1="182"
									x2="778"
									y2="182"
									stroke="#1F2933"
									strokeWidth="3"
								/>
								<line
									x1="68"
									y1="28"
									x2="68"
									y2="182"
									stroke="#1F2933"
									strokeWidth="3"
								/>

								{/* Grid */}
								{[52, 88, 124, 160].map((y, i) => (
									<line
										key={i}
										x1="68"
										y1={y}
										x2="778"
										y2={y}
										stroke="rgba(31,41,51,0.14)"
										strokeWidth="2"
									/>
								))}

								{/* Drawn line */}
								<path
									d={pathD}
									fill="none"
									stroke="#3066BE"
									strokeWidth="8"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeDasharray={pathLength}
									strokeDashoffset={pathLength * (1 - lineProgress)}
								/>

								{/* Error bars */}
								{[
									{x: p2.x, y: p2.y, top: p2.y - 18, bottom: p2.y + 18},
									{x: p3.x, y: p3.y, top: p3.y - 20, bottom: p3.y + 20},
									{x: p4.x, y: p4.y, top: p4.y - 22, bottom: p4.y + 22},
								].map((bar, i) => (
									<g
										key={i}
										opacity={errorBarProgress}
										transform={`scale(1 ${errorBarProgress}) translate(0 ${
											(1 - errorBarProgress) * 12
										})`}
										style={{transformOrigin: `${bar.x}px ${bar.y}px`}}
									>
										<line
											x1={bar.x}
											y1={bar.top}
											x2={bar.x}
											y2={bar.bottom}
											stroke="#C44536"
											strokeWidth="4"
										/>
										<line
											x1={bar.x - 12}
											y1={bar.top}
											x2={bar.x + 12}
											y2={bar.top}
											stroke="#C44536"
											strokeWidth="4"
										/>
										<line
											x1={bar.x - 12}
											y1={bar.bottom}
											x2={bar.x + 12}
											y2={bar.bottom}
											stroke="#C44536"
											strokeWidth="4"
										/>
									</g>
								))}

								{/* Data points */}
								{[p1, p2, p3, p4].map((p, i) => {
									const thresholds = [0.06, 0.28, 0.54, 0.82];
									const shown = lineProgress >= thresholds[i];
									return (
										<g key={i} opacity={shown ? 1 : 0}>
											<circle
												cx={p.x}
												cy={p.y}
												r="9"
												fill="#FCFBF8"
												stroke="#1F2933"
												strokeWidth="3"
											/>
											<circle cx={p.x} cy={p.y} r="4" fill="#3066BE" />
										</g>
									);
								})}

								{/* Active end-point pulse */}
								<circle
									cx={current.x}
									cy={current.y}
									r={8 + Math.sin(frame * 0.2) * 1.8}
									fill="#C44536"
									opacity={lineProgress > 0.04 ? 0.95 : 0}
								/>
							</svg>

							{/* Mono labels safely placed below line region */}
							<div
								style={{
									position: 'absolute',
									left: 90,
									bottom: 14,
									display: 'flex',
									gap: 108,
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									fontSize: 14,
									fontWeight: 600,
									color: '#1F2933',
									letterSpacing: 0.6,
								}}
							>
								<span>Q1</span>
								<span>Q2</span>
								<span>Q3</span>
								<span>Q4</span>
							</div>

							<div
								style={{
									position: 'absolute',
									left: 16,
									top: 20,
									display: 'flex',
									flexDirection: 'column',
									gap: 24,
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									fontSize: 13,
									fontWeight: 600,
									color: '#1F2933',
									opacity: 0.78,
								}}
							>
								<span>50</span>
								<span>35</span>
								<span>20</span>
							</div>
						</div>

						{/* Metric + citation row */}
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								gap: 24,
								marginTop: 18,
							}}
						>
							<div
								style={{
									flex: 1,
									backgroundColor: '#FCFBF8',
									border: '3px solid #1F2933',
									borderRadius: 24,
									padding: '18px 24px',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									boxShadow: '0 8px 16px rgba(31, 41, 51, 0.08)',
									transform: `scale(${0.9 + metricReveal * 0.1})`,
								}}
							>
								<div
									style={{
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
										fontSize: 52,
										lineHeight: 1,
										fontWeight: 800,
										color: '#1F2933',
										letterSpacing: -1.2,
										textAlign: 'center',
										whiteSpace: 'nowrap',
									}}
								>
									{metricText}
								</div>
							</div>

							<div
								style={{
									width: 186,
									flexShrink: 0,
									backgroundColor: '#3066BE',
									border: '3px solid #1F2933',
									borderRadius: 20,
									padding: '14px 16px',
									transform: `scale(${citationPop})`,
									boxShadow: '0 8px 16px rgba(31, 41, 51, 0.12)',
								}}
							>
								<div
									style={{
										fontSize: 13,
										letterSpacing: 1.8,
										fontVariant: 'small-caps',
										textTransform: 'uppercase',
										fontWeight: 700,
										color: '#FCFBF8',
										marginBottom: 6,
									}}
								>
									citation
								</div>
								<div
									style={{
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
										fontSize: 16,
										fontWeight: 700,
										color: '#FCFBF8',
										lineHeight: 1.2,
									}}
								>
									[77] replicated
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Tier 3 */}
				<div
					style={{
						transform: `scale(${takeawayIn}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#C44536',
						border: '3px solid #1F2933',
						borderRadius: 22,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(31, 41, 51, 0.12)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#FCFBF8',
							fontSize: 22,
							fontWeight: 700,
							letterSpacing: 2.2,
							fontVariant: 'small-caps',
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