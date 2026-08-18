import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Sampler_CHRON_STYLE_79() {
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
		config: {
			damping: 12,
			stiffness: 220,
			mass: 0.62,
		},
	});

	const badgeEntrance = spring({
		frame: frame - 4,
		fps,
		config: {
			damping: 11,
			stiffness: 240,
			mass: 0.52,
		},
	});

	const takeawayEntrance = spring({
		frame: frame - 8,
		fps,
		config: {
			damping: 12,
			stiffness: 210,
			mass: 0.6,
		},
	});

	// Beat 2: Active state / rolling reveal
	const commissionNumber = Math.round(interpolate(frame, [14, 58], [12, 50], clamp));
	const metricText = `${commissionNumber}% COMMISSION`;

	const orbitSweep = interpolate(frame, [18, 64], [0, 1], clamp);
	const telescopeScale = interpolate(frame, [24, 42, 52], [0.88, 1.06, 1], clamp);
	const telescopeRingOpacity = interpolate(frame, [20, 34, 52], [0, 0.9, 0.25], clamp);

	// Beat 3: Continuous living motion
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.08) * 2.1;
	const badgeFloat = Math.sin(frame * 0.1) * 3;
	const takeawayFloat = Math.sin(frame * 0.12 + 1.2) * 3;
	const shadowPulse = 18 + Math.sin(frame * 0.18) * 4;
	const skyRotate = Math.sin(frame * 0.02) * 2.2;
	const shineOffset = interpolate((frame + 22) % 70, [0, 70], [-260, 980], clamp);

	// Exit
	const exitSlide = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [0, -60], clamp);
	const opacity = interpolate(
		frame,
		[0, 5, durationInFrames - 10, durationInFrames - 1],
		[0, 1, 1, 0],
		clamp
	);

	// Constellation drawing
	const draw1 = interpolate(frame, [12, 28], [0, 1], clamp);
	const draw2 = interpolate(frame, [22, 40], [0, 1], clamp);
	const draw3 = interpolate(frame, [30, 50], [0, 1], clamp);
	const draw4 = interpolate(frame, [38, 58], [0, 1], clamp);

	const p1 = {x: 130, y: 168};
	const p2 = {x: 258, y: 122};
	const p3 = {x: 430, y: 182};
	const p4 = {x: 596, y: 124};
	const p5 = {x: 756, y: 204};

	const seg12x = p1.x + (p2.x - p1.x) * draw1;
	const seg12y = p1.y + (p2.y - p1.y) * draw1;

	const seg23x = p2.x + (p3.x - p2.x) * draw2;
	const seg23y = p2.y + (p3.y - p2.y) * draw2;

	const seg34x = p3.x + (p4.x - p3.x) * draw3;
	const seg34y = p3.y + (p4.y - p3.y) * draw3;

	const seg45x = p4.x + (p5.x - p4.x) * draw4;
	const seg45y = p4.y + (p5.y - p4.y) * draw4;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0B132B',
				opacity,
				fontFamily:
					'"Georgia", "Times New Roman", serif',
				color: '#F8F9FF',
				overflow: 'hidden',
			}}
		>
			{/* Slow sky rotation layer */}
			<div
				style={{
					position: 'absolute',
					inset: -120,
					transform: `rotate(${skyRotate}deg)`,
					opacity: 0.95,
				}}
			>
				{/* stars */}
				{[
					{left: '8%', top: '10%', size: 3, color: '#F8F9FF', a: 0.7},
					{left: '16%', top: '22%', size: 2, color: '#4FB3D9', a: 0.7},
					{left: '22%', top: '8%', size: 2, color: '#E0B84C', a: 0.8},
					{left: '30%', top: '18%', size: 3, color: '#F8F9FF', a: 0.6},
					{left: '38%', top: '9%', size: 2, color: '#4FB3D9', a: 0.65},
					{left: '46%', top: '14%', size: 2, color: '#F8F9FF', a: 0.75},
					{left: '54%', top: '7%', size: 3, color: '#E0B84C', a: 0.8},
					{left: '63%', top: '19%', size: 2, color: '#F8F9FF', a: 0.65},
					{left: '71%', top: '10%', size: 3, color: '#4FB3D9', a: 0.7},
					{left: '81%', top: '16%', size: 2, color: '#F8F9FF', a: 0.8},
					{left: '88%', top: '8%', size: 2, color: '#E0B84C', a: 0.75},
					{left: '11%', top: '77%', size: 2, color: '#F8F9FF', a: 0.65},
					{left: '20%', top: '86%', size: 3, color: '#4FB3D9', a: 0.7},
					{left: '32%', top: '79%', size: 2, color: '#E0B84C', a: 0.75},
					{left: '44%', top: '88%', size: 2, color: '#F8F9FF', a: 0.75},
					{left: '57%', top: '82%', size: 3, color: '#4FB3D9', a: 0.7},
					{left: '69%', top: '90%', size: 2, color: '#F8F9FF', a: 0.7},
					{left: '83%', top: '84%', size: 2, color: '#E0B84C', a: 0.8},
				].map((star, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: static decorative stars
						key={i}
						style={{
							position: 'absolute',
							left: star.left,
							top: star.top,
							width: star.size,
							height: star.size,
							borderRadius: '50%',
							backgroundColor: star.color,
							opacity: star.a + Math.sin(frame * 0.08 + i) * 0.08,
							boxShadow: `0 0 ${star.size * 5}px ${star.color}`,
						}}
					/>
				))}

				{/* subtle observatory rings */}
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						width: 1180,
						height: 1180,
						transform: 'translate(-50%, -50%)',
						border: '1px solid rgba(79,179,217,0.14)',
						borderRadius: '50%',
					}}
				/>
				<div
					style={{
						position: 'absolute',
						left: '50%',
						top: '50%',
						width: 920,
						height: 920,
						transform: 'translate(-50%, -50%)',
						border: '1px solid rgba(224,184,76,0.12)',
						borderRadius: '50%',
					}}
				/>
			</div>

			<div
				style={{
					width: '94%',
					height: '88%',
					margin: 'auto',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'space-between',
					padding: '58px 18px 36px',
					boxSizing: 'border-box',
					transform: `translateY(${exitSlide}px)`,
					position: 'relative',
				}}
			>
				{/* TIER 1 */}
				<div
					style={{
						transform: `scale(${badgeEntrance}) translateY(${badgeFloat}px)`,
						backgroundColor: 'rgba(107,92,165,0.22)',
						border: '2px solid #4FB3D9',
						borderRadius: 16,
						padding: '12px 28px',
						display: 'flex',
						alignItems: 'center',
						gap: 12,
						boxShadow: '0 10px 24px rgba(0,0,0,0.35)',
						backdropFilter: 'blur(2px)',
					}}
				>
					<div
						style={{
							width: 10,
							height: 10,
							borderRadius: '50%',
							backgroundColor: '#E0B84C',
							boxShadow: '0 0 12px rgba(224,184,76,0.8)',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							color: '#F8F9FF',
							fontSize: 19,
							fontWeight: 800,
							letterSpacing: 3,
							textTransform: 'uppercase',
							fontVariant: 'small-caps',
						}}
					>
						Star Chart
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
						margin: '22px 0',
						transform: `scale(${entrance}) translateY(${hoverY}px) rotate(${hoverTilt}deg)`,
					}}
				>
					<div
						style={{
							width: '95%',
							minHeight: 540,
							background:
								'radial-gradient(circle at 50% 45%, rgba(79,179,217,0.10) 0%, rgba(11,19,43,0.92) 58%), rgba(107,92,165,0.18)',
							border: '3px solid #6B5CA5',
							borderRadius: 34,
							boxShadow: `0 ${shadowPulse}px 36px rgba(0,0,0,0.55)`,
							padding: '42px 38px 38px',
							boxSizing: 'border-box',
							position: 'relative',
							overflow: 'hidden',
							display: 'grid',
							gridTemplateRows: '118px 1fr 132px',
							rowGap: 18,
						}}
					>
						{/* traveling shine */}
						<div
							style={{
								position: 'absolute',
								top: -40,
								bottom: -40,
								width: 120,
								background:
									'linear-gradient(180deg, rgba(248,249,255,0) 0%, rgba(248,249,255,0.12) 50%, rgba(248,249,255,0) 100%)',
								transform: `translateX(${shineOffset}px) skewX(-22deg)`,
								pointerEvents: 'none',
							}}
						/>

						{/* telescope circle */}
						<div
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: 348 * telescopeScale,
								height: 348 * telescopeScale,
								transform: 'translate(-50%, -50%)',
								borderRadius: '50%',
								border: `2px solid rgba(224,184,76,${telescopeRingOpacity})`,
								boxShadow: `0 0 28px rgba(224,184,76,${telescopeRingOpacity * 0.32})`,
								pointerEvents: 'none',
							}}
						/>
						<div
							style={{
								position: 'absolute',
								left: '50%',
								top: '50%',
								width: 422,
								height: 422,
								transform: 'translate(-50%, -50%)',
								borderRadius: '50%',
								border: '1px solid rgba(79,179,217,0.18)',
								pointerEvents: 'none',
							}}
						/>

						{/* top headline zone */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								paddingTop: 8,
							}}
						>
							<div
								style={{
									color: '#F8F9FF',
									fontSize: 68,
									fontWeight: 900,
									lineHeight: 1.02,
									letterSpacing: -1.5,
									textAlign: 'center',
									maxWidth: 760,
									textTransform: 'uppercase',
								}}
							>
								AUTOMATED MARGINS
							</div>
						</div>

						{/* center constellation area - no text collisions */}
						<div
							style={{
								position: 'relative',
								zIndex: 1,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<svg
								width="820"
								height="220"
								viewBox="0 0 820 220"
								style={{
									overflow: 'visible',
								}}
							>
								{/* background guide arc */}
								<circle
									cx="410"
									cy="110"
									r="92"
									fill="none"
									stroke="rgba(79,179,217,0.18)"
									strokeWidth="1.5"
								/>

								{/* animated constellation lines */}
								<line x1={p1.x} y1={p1.y} x2={seg12x} y2={seg12y} stroke="#4FB3D9" strokeWidth="2.5" />
								<line x1={p2.x} y1={p2.y} x2={seg23x} y2={seg23y} stroke="#4FB3D9" strokeWidth="2.5" />
								<line x1={p3.x} y1={p3.y} x2={seg34x} y2={seg34y} stroke="#4FB3D9" strokeWidth="2.5" />
								<line x1={p4.x} y1={p4.y} x2={seg45x} y2={seg45y} stroke="#4FB3D9" strokeWidth="2.5" />

								{/* constellation nodes */}
								{[
									{x: p1.x, y: p1.y, r: 6},
									{x: p2.x, y: p2.y, r: 7},
									{x: p3.x, y: p3.y, r: 6},
									{x: p4.x, y: p4.y, r: 7},
									{x: p5.x, y: p5.y, r: 6},
								].map((dot, i) => (
									<g key={i}>
										<circle
											cx={dot.x}
											cy={dot.y}
											r={dot.r + Math.sin(frame * 0.11 + i) * 0.4}
											fill="#E0B84C"
											opacity={0.95}
										/>
										<circle
											cx={dot.x}
											cy={dot.y}
											r={dot.r + 7}
											fill="none"
											stroke="rgba(224,184,76,0.24)"
											strokeWidth="1.5"
										/>
									</g>
								))}

								{/* orbiting sweep point */}
								<circle
									cx={interpolate(orbitSweep, [0, 0.25, 0.5, 0.75, 1], [p1.x, p2.x, p3.x, p4.x, p5.x])}
									cy={interpolate(orbitSweep, [0, 0.25, 0.5, 0.75, 1], [p1.y, p2.y, p3.y, p4.y, p5.y])}
									r="5"
									fill="#F8F9FF"
									opacity={0.95}
								/>
							</svg>

							{/* side labels, kept fully away from lines */}
							<div
								style={{
									position: 'absolute',
									left: 18,
									top: 18,
									color: '#F8F9FF',
									fontSize: 16,
									letterSpacing: 2.2,
									fontVariant: 'small-caps',
									textTransform: 'uppercase',
									opacity: 0.8,
									fontWeight: 700,
								}}
							>
								Orion Trace
							</div>

							<div
								style={{
									position: 'absolute',
									right: 18,
									bottom: 22,
									color: '#4FB3D9',
									fontSize: 15,
									letterSpacing: 2,
									fontFamily:
										'"SFMono-Regular", "Menlo", "Consolas", monospace',
									opacity: 0.92,
									fontWeight: 700,
								}}
							>
								RA 05:35 · DEC -05°
							</div>
						</div>

						{/* bottom metric zone */}
						<div
							style={{
								position: 'relative',
								zIndex: 2,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								paddingBottom: 6,
							}}
						>
							<div
								style={{
									backgroundColor: 'rgba(11,19,43,0.82)',
									border: '3px solid #E0B84C',
									borderRadius: 24,
									padding: '18px 34px',
									boxShadow: '0 10px 24px rgba(224,184,76,0.18)',
									minWidth: 480,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<div
									style={{
										color: '#E0B84C',
										fontSize: 62,
										fontWeight: 900,
										lineHeight: 1,
										letterSpacing: 1,
										textAlign: 'center',
										whiteSpace: 'nowrap',
										fontFamily:
											'"SFMono-Regular", "Menlo", "Consolas", monospace',
									}}
								>
									{metricText}
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* TIER 3 */}
				<div
					style={{
						transform: `scale(${takeawayEntrance}) translateY(${takeawayFloat}px)`,
						backgroundColor: '#E0B84C',
						borderRadius: 20,
						padding: '16px 34px',
						boxShadow: '0 10px 24px rgba(0,0,0,0.38)',
						textAlign: 'center',
					}}
				>
					<div
						style={{
							color: '#0B132B',
							fontSize: 22,
							fontWeight: 900,
							letterSpacing: 2.2,
							textTransform: 'uppercase',
							fontVariant: 'small-caps',
						}}
					>
						PURE SOFTWARE LEVERAGE
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}