import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export default function Style25PullRequestTheDiff_Scene5() {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const clamp = {
		extrapolateLeft: 'clamp' as const,
		extrapolateRight: 'clamp' as const,
	};

	// ------------------------------------------
	// BEAT 1 — ENTRANCE
	// ------------------------------------------
	const cardEntrance = spring({
		frame,
		fps,
		config: {damping: 11, stiffness: 220, mass: 0.72},
	});

	const headerEntrance = spring({
		frame: frame - 3,
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.65},
	});

	const bodyEntrance = spring({
		frame: frame - 6,
		fps,
		config: {damping: 13, stiffness: 210, mass: 0.7},
	});

	const cardScale = interpolate(cardEntrance, [0, 1], [0.82, 1], clamp);
	const cardOpacity = interpolate(cardEntrance, [0, 0.18, 1], [0, 1, 1], clamp);
	const cardTranslateY = interpolate(cardEntrance, [0, 1], [140, 0], clamp);
	const cardRotate = interpolate(cardEntrance, [0, 0.7, 1], [2.2, -0.8, 0], clamp);

	// ------------------------------------------
	// BEAT 2 — DIFF TRANSFORMATION + MERGE
	// ------------------------------------------
	const deleteCollapse = spring({
		frame: frame - 28,
		fps,
		config: {damping: 15, stiffness: 200, mass: 0.8},
	});

	const addLine1Reveal = spring({
		frame: frame - 40,
		fps,
		config: {damping: 14, stiffness: 190, mass: 0.75},
	});

	const addLine2Reveal = spring({
		frame: frame - 46,
		fps,
		config: {damping: 14, stiffness: 190, mass: 0.75},
	});

	const mergeStamp = spring({
		frame: frame - 62,
		fps,
		config: {damping: 10, stiffness: 260, mass: 0.58},
	});

	const deletionOpacity = interpolate(deleteCollapse, [0, 0.7, 1], [1, 0.35, 0], clamp);
	const deletionScaleY = interpolate(deleteCollapse, [0, 1], [1, 0.08], clamp);
	const deletionHeight = interpolate(deleteCollapse, [0, 1], [88, 10], clamp);

	const add1Width = interpolate(addLine1Reveal, [0, 1], [0, 1], clamp);
	const add1Opacity = interpolate(addLine1Reveal, [0, 0.15, 1], [0, 1, 1], clamp);

	const add2Width = interpolate(addLine2Reveal, [0, 1], [0, 1], clamp);
	const add2Opacity = interpolate(addLine2Reveal, [0, 0.15, 1], [0, 1, 1], clamp);

	const merged = frame >= 62;
	const mergeScale = interpolate(mergeStamp, [0, 0.72, 1], [0.2, 1.12, 1], clamp);
	const mergeOpacity = interpolate(mergeStamp, [0, 0.15, 1], [0, 1, 1], clamp);
	const mergeShadowY = interpolate(mergeStamp, [0, 0.72, 1], [26, 5, 10], clamp);

	// ------------------------------------------
	// BEAT 3 — LIVING PHYSICS + EXIT
	// ------------------------------------------
	const hoverY = Math.sin(frame * 0.12) * 8;
	const hoverTilt = Math.sin(frame * 0.085) * 1.4;
	const borderPulse = interpolate(Math.sin(frame * 0.08), [-1, 1], [0.92, 1.08]);
	const checkPulse = merged
		? interpolate(Math.sin((frame - 62) * 0.22), [-1, 1], [0.98, 1.04])
		: 1;

	const sweepProgress = interpolate(frame, [82, 112], [-0.35, 1.1], clamp);
	const cursorBlink = Math.floor(frame / 14) % 2 === 0 ? 1 : 0;

	const exitProgress = spring({
		frame: frame - (durationInFrames - 12),
		fps,
		config: {damping: 12, stiffness: 240, mass: 0.7},
	});

	const exitScale = interpolate(exitProgress, [0, 1], [1, 0.9], clamp);
	const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0], clamp);
	const exitTranslateY = interpolate(exitProgress, [0, 1], [0, -40], clamp);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#0D1117',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily:
					'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
			}}
		>
			<div
				style={{
					width: '92%',
					minHeight: 560,
					backgroundColor: '#0D1117',
					border: `4px solid rgba(121, 192, 255, ${borderPulse})`,
					borderRadius: 30,
					boxShadow: `0px 22px 0px rgba(0,0,0,0.45)`,
					overflow: 'hidden',
					position: 'relative',
					opacity: cardOpacity * exitOpacity,
					transform: `translateY(${cardTranslateY + hoverY + exitTranslateY}px) scale(${
						cardScale * exitScale
					}) rotate(${cardRotate + hoverTilt}deg)`,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{/* Sweep */}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: `${sweepProgress * 100}%`,
						width: '34%',
						height: '100%',
						background:
							'linear-gradient(90deg, rgba(46,160,67,0) 0%, rgba(46,160,67,0.08) 50%, rgba(46,160,67,0) 100%)',
						pointerEvents: 'none',
					}}
				/>

				{/* Header */}
				<div
					style={{
						padding: '24px 28px',
						borderBottom: '2px solid rgba(139,148,158,0.28)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 20,
						backgroundColor: 'rgba(255,255,255,0.02)',
						transform: `scale(${interpolate(headerEntrance, [0, 1], [0.92, 1], clamp)})`,
						transformOrigin: 'top center',
					}}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 8,
							minWidth: 0,
							flex: 1,
						}}
					>
						<div
							style={{
								fontSize: 18,
								fontWeight: 800,
								letterSpacing: '0.08em',
								textTransform: 'uppercase',
								color: '#8B949E',
							}}
						>
							#take-action
						</div>

						<div
							style={{
								fontSize: 54,
								fontWeight: 900,
								lineHeight: 0.98,
								letterSpacing: '-0.04em',
								color: '#F0F6FC',
								wordBreak: 'keep-all',
							}}
						>
							Pull Request
						</div>
					</div>

					<div
						style={{
							flexShrink: 0,
							backgroundColor: merged ? '#2EA043' : '#79C0FF',
							color: '#0D1117',
							border: '3px solid #0D1117',
							borderRadius: 999,
							padding: '12px 18px',
							fontSize: 20,
							fontWeight: 900,
							letterSpacing: '0.04em',
							boxShadow: '0px 6px 0px rgba(0,0,0,0.35)',
							textTransform: 'uppercase',
						}}
					>
						{merged ? 'Merged' : 'Open'}
					</div>
				</div>

				{/* Body */}
				<div
					style={{
						padding: '28px',
						display: 'flex',
						flexDirection: 'column',
						gap: 22,
						position: 'relative',
						flex: 1,
						transform: `scale(${interpolate(bodyEntrance, [0, 1], [0.96, 1], clamp)})`,
						transformOrigin: 'center top',
					}}
				>
					{/* Repo chrome */}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							flexWrap: 'wrap',
						}}
					>
						<div
							style={{
								fontFamily:
									'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
								fontSize: 18,
								fontWeight: 700,
								color: '#79C0FF',
								backgroundColor: 'rgba(121,192,255,0.1)',
								border: '2px solid rgba(121,192,255,0.25)',
								borderRadius: 12,
								padding: '8px 12px',
							}}
						>
							@mindset/main.ts
						</div>

						<div
							style={{
								fontSize: 18,
								fontWeight: 800,
								color: '#8B949E',
							}}
						>
							action-reframe.diff
						</div>
					</div>

					{/* Diff block */}
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 14,
							backgroundColor: '#161B22',
							border: '2px solid rgba(139,148,158,0.2)',
							borderRadius: 24,
							padding: '22px 20px',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '72px 1fr',
								alignItems: 'center',
								gap: 14,
							}}
						>
							<div
								style={{
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
									fontSize: 18,
									fontWeight: 700,
									color: '#8B949E',
									textAlign: 'right',
								}}
							>
								12
							</div>

							<div
								style={{
									height: deletionHeight,
									opacity: deletionOpacity,
									transform: `scaleY(${deletionScaleY})`,
									transformOrigin: 'center top',
									backgroundColor: 'rgba(248,81,73,0.12)',
									border: '2px solid rgba(248,81,73,0.28)',
									borderRadius: 18,
									display: 'flex',
									alignItems: 'center',
									padding: '0 18px',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										fontFamily:
											'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
										fontSize: 24,
										fontWeight: 700,
										color: '#F85149',
										whiteSpace: 'nowrap',
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										width: '100%',
									}}
								>
									- waiting for perfect reason
								</div>
							</div>
						</div>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '72px 1fr',
								alignItems: 'center',
								gap: 14,
							}}
						>
							<div
								style={{
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
									fontSize: 18,
									fontWeight: 700,
									color: '#8B949E',
									textAlign: 'right',
								}}
							>
								13
							</div>

							<div
								style={{
									height: 88,
									backgroundColor: 'rgba(46,160,67,0.14)',
									border: '2px solid rgba(46,160,67,0.3)',
									borderRadius: 18,
									display: 'flex',
									alignItems: 'center',
									padding: '0 18px',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										width: `${add1Width * 100}%`,
										opacity: add1Opacity,
										overflow: 'hidden',
										whiteSpace: 'nowrap',
									}}
								>
									<div
										style={{
											fontFamily:
												'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
											fontSize: 28,
											fontWeight: 800,
											color: '#2EA043',
											whiteSpace: 'nowrap',
										}}
									>
										+ take action now
									</div>
								</div>
							</div>
						</div>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '72px 1fr',
								alignItems: 'center',
								gap: 14,
							}}
						>
							<div
								style={{
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
									fontSize: 18,
									fontWeight: 700,
									color: '#8B949E',
									textAlign: 'right',
								}}
							>
								14
							</div>

							<div
								style={{
									height: 72,
									backgroundColor: 'rgba(46,160,67,0.08)',
									border: '2px solid rgba(46,160,67,0.18)',
									borderRadius: 18,
									display: 'flex',
									alignItems: 'center',
									padding: '0 18px',
									overflow: 'hidden',
								}}
							>
								<div
									style={{
										width: `${add2Width * 100}%`,
										opacity: add2Opacity,
										overflow: 'hidden',
										whiteSpace: 'nowrap',
									}}
								>
									<div
										style={{
											fontFamily:
												'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
											fontSize: 24,
											fontWeight: 700,
											color: '#79C0FF',
											whiteSpace: 'nowrap',
										}}
									>
										+ // commit beats hesitation
									</div>
								</div>
							</div>
						</div>

						<div
							style={{
								display: 'grid',
								gridTemplateColumns: '72px 1fr',
								alignItems: 'center',
								gap: 14,
							}}
						>
							<div
								style={{
									fontFamily:
										'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
									fontSize: 18,
									fontWeight: 700,
									color: '#8B949E',
									textAlign: 'right',
								}}
							>
								15
							</div>

							<div
								style={{
									height: 62,
									borderRadius: 18,
									border: '2px dashed rgba(139,148,158,0.24)',
									display: 'flex',
									alignItems: 'center',
									padding: '0 18px',
								}}
							>
								<div
									style={{
										fontFamily:
											'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
										fontSize: 24,
										fontWeight: 700,
										color: 'rgba(240,246,252,0.9)',
										display: 'flex',
										alignItems: 'center',
										gap: 2,
									}}
								>
									<span>{'>'}</span>
									<span
										style={{
											opacity: cursorBlink,
											color: '#2EA043',
										}}
									>
										_
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Merge stamp */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							marginTop: 4,
						}}
					>
						<div
							style={{
								opacity: mergeOpacity,
								transform: `scale(${mergeScale * checkPulse})`,
								backgroundColor: '#2EA043',
								border: '4px solid #0D1117',
								borderRadius: 999,
								padding: '18px 30px',
								boxShadow: `0px ${mergeShadowY}px 0px rgba(0,0,0,0.42)`,
								display: 'flex',
								alignItems: 'center',
								gap: 14,
							}}
						>
							<div
								style={{
									width: 34,
									height: 34,
									borderRadius: '50%',
									backgroundColor: '#0D1117',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									color: '#2EA043',
									fontSize: 24,
									fontWeight: 900,
									lineHeight: 1,
								}}
							>
								✓
							</div>

							<div
								style={{
									fontSize: 34,
									fontWeight: 900,
									letterSpacing: '-0.03em',
									color: '#F0F6FC',
									lineHeight: 1,
									textTransform: 'uppercase',
								}}
							>
								Merged
							</div>
						</div>
					</div>

					{/* Footer note */}
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							gap: 20,
							marginTop: 'auto',
							flexWrap: 'wrap',
						}}
					>
						<div
							style={{
								fontSize: 18,
								fontWeight: 800,
								color: '#8B949E',
								letterSpacing: '0.04em',
								textTransform: 'uppercase',
							}}
						>
							hash-and-handle: @action_only
						</div>

						<div
							style={{
								fontFamily:
									'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
								fontSize: 18,
								fontWeight: 700,
								color: merged ? '#2EA043' : '#79C0FF',
							}}
						>
							{merged ? 'status: resolved' : 'status: pending review'}
						</div>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
}